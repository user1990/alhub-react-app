import express from 'express';
import UsersController from '../controllers/users';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/', UsersController.signup);

router.get('/current_user', authenticate, UsersController.currentUser);

module.exports = router;
