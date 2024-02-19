import express from 'express';
import authController from '../controllers/auth.js';

const router = express.Router();

router.get('/signup', authController.getSignup)
router.get('/customer/confirm_page', authController.getSignupSuccess)
router.post('/signup', authController.postSignup)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

export default router;