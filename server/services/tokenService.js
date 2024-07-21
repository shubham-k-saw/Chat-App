import jwt from 'jsonwebtoken'
import { RefreshToken } from '../models/refreshTokenModel.js'
import { durationToUnixTimeStamp } from '../utils/timeUtils.js'

const generateTokens = async (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  })
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  })

  // save refresh token to database
  const expiresAt = await durationToUnixTimeStamp(process.env.REFRESH_TOKEN_EXPIRY)
  await RefreshToken.create({ userId, token: refreshToken, expiresAt })

  return { accessToken, refreshToken }
}

const generateAccessTokenFromRefreshToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken
    if (!incomingRefreshToken) {
      return res.status(403).send({ error: 'Refresh Token not found' })
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const userId = decodedToken.userId

    // fetch refresh token from database
    const storedRefreshToken = await RefreshToken.findOne({
      userId,
      token: incomingRefreshToken,
    })
    if (!storedRefreshToken) {
      return res.status(403).send({ error: 'Refresh Token not found' })
    }

    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    })

    // update new refresh token in database
    const expiresAt = await durationToUnixTimeStamp(process.env.REFRESH_TOKEN_EXPIRY)
    await RefreshToken.findOneAndUpdate(
      { userId, token: incomingRefreshToken },
      { token: refreshToken, expiresAt },
      { new: true },
    )

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    }

    return res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .cookie('refreshToken', refreshToken, cookieOptions)
      .send({ accessToken, refreshToken })
  } catch (error) {
    console.log(error)
    return res.status(403).send(error)
  }
}

export { generateTokens, generateAccessTokenFromRefreshToken }
