import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

const authUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken
    if (!accessToken) {
      return res.status(401).send({ error: 'No access token found' })
    }

    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedAccessToken.userId)
    if (!user) {
      return res.status(401).send({ error: 'Invalid Access Token' })
    }

    if (!user.isEmailVerified) {
      return res.status(411).send({ error: 'Email not verified' })
    }

    req.user = {
      userId: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    }

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ error: 'Access token expired' })
    }
    console.log(error)
    return res.status(401).send(error)
  }
}

export { authUser }
