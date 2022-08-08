import { body } from 'express-validator'

export const registrationValid = [
    body('email', 'Wrong email').isEmail(),
    body('password', 'Password must be longer').isLength({ min: 5 }),
    body('fullName', 'Set name').isLength({ min: 3 }),
    body('avatarUrl', 'Wrong url').optional().isURL(),
]

export const loginValid = [
    body('email', 'Wrong email').isEmail(),
    body('password', 'Password must be longer').isLength({ min: 5 }),
]

export const postCreateValid = [
    body('title', 'Set article title').isLength({ min: 3}).isString(),
    body('text', 'Set article text').isLength({ min: 3 }).isString(),
    body('tags', 'Wrong tags').optional().isArray(),
    body('imageUrl', 'Wrong url').optional().isString(),
]