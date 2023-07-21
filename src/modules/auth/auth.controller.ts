import * as express from 'express'

import * as authService from './auth.service';

const authController = express.Router();

authController.post('/sign-up', async function(req, res, next) {
    return await authService.signUp(req, res, next);
});

authController.post('/login', async function(req, res, next) {
    return await authService.logIn(req, res, next)
});

authController.patch('/refresh-token', async function(req, res) {
    res.json({});
});

export default authController;
