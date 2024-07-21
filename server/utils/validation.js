const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/
const usernameRegex = /^[a-z_][a-z0-9_]{5,}$/

const signupValidation = (data) => {
  const { username, email, password } = data
  const errors = []

  if (!username || !username.match(usernameRegex)) {
    errors.push('Invalid Username')
  }

  if (!email || !email.match(emailRegex)) {
    errors.push('Invalid Email')
  }

  if (!password || !password.match(passwordRegex)) {
    errors.push('Invalid Password')
  }

  return {
    error: Object.keys(errors).length > 0 ? errors : null,
  }
}

export { signupValidation }
