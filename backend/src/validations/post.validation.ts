import { body } from 'express-validator'

export const postValidation = [
  body('description')
    .isLength({ max: 1000 })
    .withMessage('Описание может содержать не более 1000 символов'),
]
