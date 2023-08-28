"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
// Products
router.get('/products', isLoggedIn_1.isLoggedIn, ProductController_1.default.index)
    .get('/products/:id', isLoggedIn_1.isLoggedIn, ProductController_1.default.view)
    .post('/products', isLoggedIn_1.isLoggedIn, ProductController_1.default.create)
    .post('/products/:id', isLoggedIn_1.isLoggedIn, ProductController_1.default.update)
    .delete('/products', isLoggedIn_1.isLoggedIn, ProductController_1.default.delete);
// Orders
router.get('/orders', isLoggedIn_1.isLoggedIn, OrderController_1.default.index)
    .get('/orders/:id', isLoggedIn_1.isLoggedIn, OrderController_1.default.view)
    .post('/orders', isLoggedIn_1.isLoggedIn, OrderController_1.default.create)
    .post('/orders/:id', isLoggedIn_1.isLoggedIn, OrderController_1.default.update)
    .delete('/orders', isLoggedIn_1.isLoggedIn, OrderController_1.default.delete);
// Auth
router.post('/signup', AuthController_1.default.signup)
    .post('/login', AuthController_1.default.login)
    .post('/forgot-password', AuthController_1.default.forgotPassword)
    .post('/password-reset', AuthController_1.default.passwordReset)
    .get('/logout', AuthController_1.default.logout)
    .get('/auth', AuthController_1.default.auth);
const options = { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD };
exports.default = router;
