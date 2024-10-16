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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf, password } = req.body;
    const user = yield db_1.Users.get(cpf);
    if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
        res.status(409).json({ error: "CPF ou Senha invalida." });
        return;
    }
    // TODO: save session and redirect to inicial page
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf, name, email, password, phone_number } = req.body;
    if (yield db_1.Users.get(cpf)) {
        res.status(409).json({ error: "there is already a user with this cpf" });
        return;
    }
    // Hash password
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    const id = yield db_1.Users.add(cpf, name, email, hash, phone_number);
    // TODO: save session and redirect to inicial page
}));
exports.default = router;
