"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const images = express_1.default.Router();
const router = express_1.default.Router();
images.use('/images', router);
router.get('/:name', (req, res) => {
    // TODO
    res.sendFile(path_1.default.join(__dirname, "../images/", req.params.name));
});
router.post('/', body_parser_1.default.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }), (req, res) => {
    // TODO
    fs_1.default.writeFileSync(path_1.default.join("./images/", "1234.jpg"), req.body);
    res.sendStatus(200);
});
exports.default = images;
