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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const crypto_1 = require("crypto");
const User_1 = __importDefault(require("../models/User"));
const jwt = __importStar(require("jsonwebtoken"));
class AuthService {
    constructor() { }
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield User_1.default.findOne({ email });
            if (!userRecord) {
                throw new Error('not found');
            }
            else {
                const correctAnswer = yield argon2_1.default.verify(userRecord.password, password);
                if (!correctAnswer) {
                    throw new Error('Incorrect password');
                }
            }
            return {
                user: {
                    email: userRecord.email,
                    name: userRecord.name
                },
                token: this.generateJWT(userRecord)
            };
        });
    }
    LoginAs(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield User_1.default.findOne({ email });
            console.log('Fetching user from DB...');
            if (!userRecord) {
                throw new Error('User not found...');
            }
            return {
                user: {
                    email: userRecord.email,
                    name: userRecord.name
                },
                token: this.generateJWT(userRecord)
            };
        });
    }
    SignUp(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = crypto_1.randomBytes(32);
            const passwordHashed = yield argon2_1.default.hash(password, { salt });
            const userRecord = yield User_1.default.create({
                password: passwordHashed,
                email,
                salt: salt.toString('hex'),
                name
            });
            const token = this.generateJWT(userRecord);
            return {
                user: {
                    email: userRecord.email,
                    name: userRecord.name
                },
                token
            };
        });
    }
    generateJWT(user) {
        return jwt.sign({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        }, 'secret', { expiresIn: '6h' });
    }
}
exports.default = AuthService;
