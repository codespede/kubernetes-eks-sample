import express from 'express';
import ProductController from '../controllers/ProductController';
import OrderController from '../controllers/OrderController';
import AuthController from '../controllers/AuthController';
import { isAuthorized } from '../middlewares/auth';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const router = express.Router();
// Products
router.get('/products', ProductController.index)
.get('/products/:id', isLoggedIn, ProductController.view)
.post('/products', isLoggedIn, ProductController.create)
.post('/products/:id', isLoggedIn, ProductController.update)
.delete('/products', isLoggedIn, ProductController.delete);
// Orders
router.get('/orders', isLoggedIn, OrderController.index)
.get('/orders/:id', isLoggedIn, OrderController.view)
.post('/orders', isLoggedIn, OrderController.create)
.post('/orders/:id', isLoggedIn, OrderController.update)
.delete('/orders', isLoggedIn, OrderController.delete);
// Auth
router.post('/signup', AuthController.signup)
.post('/login', AuthController.login)
.post('/forgot-password', AuthController.forgotPassword)
.post('/password-reset', AuthController.passwordReset)
.get('/logout', AuthController.logout)
.get('/auth', AuthController.auth)
.get('/test*', (req, res) => res.status(200).send('Test success'))
.get('/path1', (req, res) => res.status(200).send('Path1 of Test success'))
const options = { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD };

export default router;

