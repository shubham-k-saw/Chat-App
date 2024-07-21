import { User } from '../models/userModel.js'
import { RefreshToken } from '../models/refreshTokenModel.js'
import { signupValidation } from '../utils/validation.js'
import { generateTokens } from '../services/tokenService.js'
import { sendEmail } from '../services/mailService.js'
import { generateOTP, verifyOTP } from '../services/otpService.js'

const signupUser = async (req, res) => {
  try {
    const { error } = signupValidation(req.body)
    if (error) {
      return res.status(400).send({ error: error[0] })
    }

    const { username, firstName, lastName, email, password } = req.body

    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' })
    }

    const user = await User.create({ username, firstName, lastName, email, password })
    if (!user) {
      return res.status(400).send({ error: 'User not created' })
    }

    const otp = await generateOTP(user._id)
    const verification = sendEmail('verifyEmail', user, otp)
    if (!verification) {
      return res
        .status(400)
        .send({ error: 'Something went wrong while sending verfication email, Login to verify email' })
    }

    return res.status(201).send({ message: 'Signup Successful & Verification Email sent' })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username && !email) {
      return res.status(400).send({ error: 'Username or email is required' })
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    })

    if (!user) {
      return res.status(400).send({ error: 'Invalid username or email' })
    }

    const validPassword = await user.comparePassword(password)

    if (!validPassword) {
      return res.status(400).send({ error: 'Invalid password' })
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    }

    return res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .cookie('refreshToken', refreshToken, cookieOptions)
      .send({ message: 'Login successful' })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

const getUser = async (req, res) => {
  try {
    return res.status(200).send(req.user)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken
    if (!refreshToken) {
      return res.status(401).send({ error: 'No refresh token found' })
    }

    await RefreshToken.deleteOne({ userId: req.user.userId, token: refreshToken })

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    }

    return res
      .status(200)
      .clearCookie('accessToken', cookieOptions)
      .clearCookie('refreshToken', cookieOptions)
      .send({ message: 'logged out successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body
    if (!userId || !otp) {
      return res.status(405).send({ error: 'Invalid Request' })
    }
    const verified = await verifyOTP(userId, otp)
    if (!verified) {
      return res.status(405).send({ error: 'Invalid Token' })
    }
    const userVerified = await User.findByIdAndUpdate(userId, { isEmailVerified: true }, { new: true })
    if (!userVerified) {
      return res.status(405).send({ error: 'Email not Verified' })
    }

    const verification = sendEmail('successfullyVerified', userVerified)
    if (!verification) {
      return res.status(405).send({ error: 'Something went wrong while sending confirmation email' })
    }

    return res.status(200).send({ message: 'Email Verified' })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export { signupUser, loginUser, getUser, logoutUser, verifyEmail }
