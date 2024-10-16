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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const AuthController_1 = __importDefault(require("./AuthController"));
const api_1 = __importDefault(require("./api"));
const app = (0, express_1.default)();
const port = process.argv[3];
app.use(body_parser_1.default.json());
app.use('/api', AuthController_1.default);
app.use('/api', api_1.default);
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.setup_db)();
    console.log(`App running at: http://localhost:${port}`);
}));
