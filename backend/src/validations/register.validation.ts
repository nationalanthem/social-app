import { body } from 'express-validator'

export const registerValidation = [
  body('username', 'Введите имя пользователя')
    .isLength({ min: 5, max: 20 })
    .withMessage('Имя пользователя может содержать от 5 до 20 символов'),
  body('password', 'Введите пароль')
    .isLength({ min: 6, max: 16 })
    .withMessage('Пароль может содержать от 6 до 16 символов'),
]
