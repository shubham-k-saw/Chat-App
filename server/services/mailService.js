import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { verifyEmailTemplate, successfullyVerifiedTemplate } from '../utils/emailTemplate.js'
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const sendEmail = async (type, user, data) => {
  try {
    let mailOptions
    switch (type) {
      case 'verifyEmail':
        mailOptions = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Please Verify Your Email',
          html: verifyEmailTemplate(user, data),
        }
        break
      case 'successfullyVerified':
        mailOptions = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Email Verified Successfully',
          html: successfullyVerifiedTemplate(user),
        }
        break
      default:
        throw new Error('Invalid email type')
    }

    const response = await transporter.sendMail(mailOptions)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { sendEmail }
