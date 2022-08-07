import { body } from 'express-validator'

export const authValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
]