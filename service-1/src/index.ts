import express from "express"
import dotenv from "dotenv";
import session from 'express-session';
import router from "./routes";
import { Application as Pwoli } from 'pwoli';
import isAuthorized from "./middlewares/auth";
dotenv.config({ path: '.env' });
const app = express();
app.use(express.json())
// app.use(isAuthorized);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use((req, res, next) => {
    Pwoli.request = req;
    next();
});
app.use('/', router)

const port = process.env.port || 80;

app.listen(port, () => console.log(`App listening on port ${port}`))
