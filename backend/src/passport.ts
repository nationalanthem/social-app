import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt'
import User, { UserSchema } from './models/User.model'

passport.use(
  new LocalStrategy(
    async (username, password, done): Promise<void> => {
      try {
        const user = await User.findOne({ username })

        if (!user) {
          return done(null, false, { message: 'Пользователь не найден' })
        }

        const validate = await user.validPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Введены неверные данные' })
        }

        return done(null, user, { message: 'Выполнен вход в систему' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY || 'secret_key',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      try {
        return done(null, payload.user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.serializeUser((user: UserSchema, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

export { passport }
