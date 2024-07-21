import express from 'express'
import { authUser } from '../middlewares/authMiddleware.js'
import { getUser, loginUser, logoutUser, signupUser, verifyEmail } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/sign-up').post(signupUser)
userRouter.route('/login').post(loginUser)

userRouter.route('/user').get(authUser, getUser)
userRouter.route('/verify-email').put(verifyEmail)
// userRouter.route('/reset-password').get()

userRouter.route('/logout').delete(authUser, logoutUser)

export { userRouter }
