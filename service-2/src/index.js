"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const routes_1 = __importDefault(require("./routes"));
const pwoli_1 = require("pwoli");
const auth_1 = __importDefault(require("./middlewares/auth"));
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(auth_1.default);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use((req, res, next) => {
    pwoli_1.Application.request = req;
    next();
});
app.use('/', routes_1.default);
const port = process.env.port || 4000;
app.listen(port, () => console.log(`App listening on port ${port}`));
