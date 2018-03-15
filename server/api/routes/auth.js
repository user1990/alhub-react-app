import express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();

router.post('/', AuthController.auth);
router.post('/confirmation', AuthController.confirm);
router.post('/reset_password_request', AuthController.passwordReset);
router.post('/validate_token', AuthController.validateToken);
router.post('/reset_password', AuthController.resetPassword);

module.exports = router;
