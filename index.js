import express from 'express';
import mongoose from "mongoose";

import { authValidation } from "./validations/auth.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'

mongoose
    .connect('mongodb+srv://Cyy:Merntest123@cluster0.sqqixkc.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB error', err))
const app = express();

app.use(express.json())

app.post('/auth/login', UserController.login)

app.post('/auth/profile', checkAuth, UserController.getProfile)

app.post('/auth/registration', authValidation, UserController.registration)


app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server on')
})