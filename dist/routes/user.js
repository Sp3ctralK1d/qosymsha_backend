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
const auth_1 = __importDefault(require("../services/auth"));
exports.default = (app) => {
    app.post('/user/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.body.user.email;
        const password = req.body.user.password;
        try {
            const authServiceInstance = new auth_1.default();
            const { user, token } = yield authServiceInstance.Login(email, password);
            return res.status(200).json({ user, token }).end();
        }
        catch (err) {
            return res.status(500).json(err).end();
        }
    }));
    app.post('/user/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, name, password } = req.body.user;
            const authServiceInstance = new auth_1.default();
            const { user, token } = yield authServiceInstance.SignUp(email, password, name);
            return res.status(200).json({ user, token }).end();
        }
        catch (err) {
            return res.status(500).json(err).end();
        }
    }));
};
