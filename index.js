import express from 'express';
import mongoose from "mongoose";

import { registrationValid, loginValid } from "./validations.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose
    .connect('mongodb+srv://Cyy:Merntest123@cluster0.sqqixkc.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB error', err))
const app = express();

app.use(express.json())

app.post('/auth/login', loginValid, UserController.login)
app.post('/auth/profile', checkAuth, UserController.getProfile)
app.post('/auth/registration', registrationValid, UserController.registration)

// app.get('/posts', PostController.getAll)
// app.get('/posts/:id', PostController.getOne)
app.post('/posts', PostController.create)
// app.delete('/posts', PostController.remove)
// app.patch('/posts', PostController.update)


app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server on')
})