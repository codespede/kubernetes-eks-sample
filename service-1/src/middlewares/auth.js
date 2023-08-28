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
exports.isAuthorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const isAuthorized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authRequiredEndpoints = ['/cart', '/checkout', '/orders'];
    if (req.url === '/auth')
        return next();
    if (!req.get('Authorization'))
        res.status(403).send('Not authorized');
    try {
        const token = jsonwebtoken_1.default.verify(req.get('Authorization').split('Bearer ')[1], process.env.JWT_TOKEN_KEY);
        if (token.user_id !== undefined)
            req.user = yield User_1.default.findOne({ where: { _id: token.user_id } });
        return next();
    }
    catch (e) {
        if (!authRequiredEndpoints.includes(req.url))
            return next();
        res.status(403).send('Not authorized');
    }
    // try {
    //     const user = jwt.verify(req.get('Authorization').split('Bearer ')[1], process.env.JWT_TOKEN_KEY);
    //     console.log('decoded-jwt', user)
    //     req.user = await User.findByPk(user.user_id);
    //     next()
    // } catch (e) {
    //     if (!authRequiredEndpoints.includes(req.url))
    //         return next();
    //     res.status(403).send('Not authorized');
    // }
    // const tokenString = Buffer.from(req.get('Authorization').split('Basic ')[1], 'base64').toString('utf-8').split(':')[0];
    // const token = await AuthToken.findOne({ where: { token: tokenString }, order: [['id', 'desc']] });
    // if (user)
    //     return next();
    // else
    //     res.status(403).send('Not authorized');
});
exports.isAuthorized = isAuthorized;
exports.default = exports.isAuthorized;
