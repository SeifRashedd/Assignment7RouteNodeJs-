import { Router } from 'express';
import { response } from '../../common/index.js';
import * as us from './user_service.js';

export let userRouter = Router();


userRouter.post('/signup', async (req, res, next) => {
    let user = await us.signup(req.body);
    response({ res, data: user, status: 201, message: 'User added successfully' });
});


userRouter.post('/signin', async (req, res, next) => {
    let user = await us.signin(req.body);
    response({ res, data: user, status: 200, message: 'User signed in successfully' });
});



userRouter.get('/all', async (req, res, next) => {
    let users = await us.findUsers(req.query);
    response({ res, data: users, status: 200, message: 'Users fetched successfully' });
});



userRouter.get('/', async (req, res, next) => {
    let user = await us.findUser(req.query.id);
    response({ res, data: user, status: 200, message: 'User fetched successfully' });
});


userRouter.patch('/:userId', async (req, res, next) => {
    await us.updateUser(req.params.userId, req.body);
    response({ res, status: 200, message: 'user updated' });
});


userRouter.delete('/', async (req, res, next) => {
    await us.deleteUser(req.query.id);
    response({ res, status: 200, message: 'user deleted' });
});
