"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cars = express_1.default.Router();
const router = express_1.default.Router();
cars.use('/cars', router);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { brand, model, year } = req.query;
        let limit = Number(req.query.limit);
        if (limit < 1 || isNaN(limit))
            limit = 5;
        if (limit > 10)
            limit = 10;
        let page = Number(req.query.page);
        if (page < 1 || isNaN(page))
            page = 1;
        // Query for getting how many cars are in the db according to request
        let query_select = "SELECT COUNT(*) AS count FROM cars WHERE id > 0 ";
        let data_select = [];
        // Add to query only params that are not undefined
        if (brand !== undefined) {
            query_select += "AND brand LIKE (?) ";
            data_select.push("%" + brand + "%");
        }
        if (model !== undefined) {
            query_select += "AND model LIKE (?) ";
            data_select.push("%" + model + "%");
        }
        if (year !== undefined) {
            query_select += "AND year >= (?) ";
            data_select.push(year);
        }
        const count = (yield db_1.pool.query(query_select, data_select))[0][0].count;
        const pages = Math.ceil(count / limit);
        if (count === 0) {
            res.status(204).json();
            return;
        }
        // Change query to return first (limit) cars with offset according to page requested
        query_select = query_select.replace("SELECT COUNT(*) AS count", "SELECT *");
        query_select += "LIMIT ? OFFSET ?";
        data_select.push(limit, (page - 1) * limit);
        const data = (yield db_1.pool.query(query_select, data_select))[0];
        const data_with_items = yield Promise.all(data.map((car) => __awaiter(void 0, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, car), { items: yield db_1.Cars.get_items(car.id) });
        })));
        res.json({
            count,
            pages,
            data: data_with_items
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, brand, model, year, items } = req.body;
        // Check that all required items are present in the request
        if (!brand) {
            res.status(400).json({ error: "brand is required" });
            return;
        }
        if (!model) {
            res.status(400).json({ error: "model is required" });
            return;
        }
        if (!year) {
            res.status(400).json({ error: "year is required" });
            return;
        }
        if (!items) {
            res.status(400).json({ error: "items are required" });
            return;
        }
        if (year < 1886 || year > 2025) {
            res.status(400).json({ error: "year should be between 1886 and 2025" });
            return;
        }
        if (yield db_1.Cars.is_in_database(brand, model, year)) {
            res.status(409).json({ error: "there is already a car with this data" });
            return;
        }
        const id = yield db_1.Cars.add(user_id, brand, model, year);
        // Register car's items in the database
        db_1.Cars.add_items(id, items);
        res.status(201).json({ id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const car = yield db_1.Cars.get(id);
        if (car === undefined) {
            res.status(404).json({ error: "car not found" });
            return;
        }
        const items = yield db_1.Cars.get_items(car.id);
        res.json(Object.assign(Object.assign({}, car), { items }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        let { brand, model, year, items } = req.body;
        if (year < 1886 || year > 2025) {
            res.status(400).json({ error: "year should be between 1886 and 2025" });
            return;
        }
        const car = yield db_1.Cars.get(id);
        if (car === undefined) {
            res.status(404).json({ error: "car not found" });
            return;
        }
        // Filter undefined fields
        if (!brand)
            brand = car.brand;
        if (!model)
            model = car.model;
        if (!year)
            year = car.year;
        if (yield db_1.Cars.is_in_database(brand, model, year, id)) {
            res.status(409).json({ error: "there is alredy a car with this data" });
            return;
        }
        // Update cars table
        const query = "UPDATE cars SET brand = (?), model = (?), year = (?) WHERE id = (?)";
        yield db_1.pool.query(query, [brand, model, year, id]);
        // Update items table
        if (items !== undefined && items.length > 0) {
            // Remove previous items
            yield db_1.Cars.delete_items(id);
            // Add new items
            db_1.Cars.add_items(id, items);
        }
        res.status(204).json();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const car = yield db_1.Cars.get(id);
        if (car === undefined) {
            res.status(404).json({ error: "car not found" });
            return;
        }
        yield db_1.Cars.delete(id);
        res.status(204).json();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" });
    }
}));
exports.default = cars;
