import crypto from 'crypto'
import { OTP } from '../models/otpModel.js'
import { durationToUnixTimeStamp } from '../utils/timeUtils.js'

const generateOTP = async (userId) => {
  try {
    const digits = '0123456789'
    let otp = ''
    for (let i = 0; i < process.env.OTP_LENGTH; i++) {
      otp += digits[crypto.randomInt(0, digits.length)]
    }

    const expiresAt = await durationToUnixTimeStamp(process.env.OTP_EXPIRY)
    const genOTP = await OTP.create({ userId, otp, expiresAt })

    return genOTP
  } catch (error) {
    console.log(error)
    return error
  }
}

const verifyOTP = async (userId, otp) => {
  const otpFound = OTP.findOne({ userId, otp })
  if (otpFound) return true
  return false
}

export { generateOTP, verifyOTP }
