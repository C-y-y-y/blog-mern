import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';

import {registrationValid, loginValid, postCreateValid} from "./validations.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import {update} from "./controllers/PostController.js";

mongoose
    .connect('mongodb+srv://Cyy:Merntest123@cluster0.sqqixkc.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB error', err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())

app.post('/auth/login', loginValid, UserController.login)
app.post('/auth/registration', registrationValid, UserController.registration)
app.post('/auth/profile', checkAuth, UserController.getProfile)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValid, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)


app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server on')
})