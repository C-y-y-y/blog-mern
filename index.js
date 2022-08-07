import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import { validationResult } from 'express-validator'
import { authValidation } from "./validations/auth.js";
import UserModel from './models/User.js'

mongoose
    .connect('mongodb+srv://Cyy:Merntest123@cluster0.sqqixkc.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB error', err))
const app = express();

app.use(express.json())

app.post('/auth/register', authValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id
            },
            'merntest',
            {
                expiresIn: '30d'
            },
        )

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'register failed'
        })
    }
})

app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server on')
})