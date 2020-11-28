import { body as validatorBody } from 'express-validator'

export const commentValidation = [
  validatorBody('body', 'Введите коментарий')
    .isLength({ max: 1000 })
    .withMessage('Комментарий может содержать не более 1000 символов'),
]
