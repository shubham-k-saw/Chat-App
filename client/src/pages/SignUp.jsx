import React, { useState, useEffect } from 'react'
import { CircleArrowLeft as BackIcon } from 'lucide-react'

const SignUp = () => {
  const [page, setPage] = useState(1)
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const savedFormValues = JSON.parse(localStorage.getItem('signUpFormValues'))
    if (savedFormValues) {
      setFormValues(savedFormValues)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('signUpFormValues', JSON.stringify(formValues))
  }, [formValues])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value.trim(),
    })
  }

  const validateFormPage1 = (values) => {
    const errors = {}
    // Add your validation logic for page 1 fields here
    if (!values.firstName) errors.firstName = 'First name is required'
    if (!values.lastName) errors.lastName = 'Last name is required'
    if (!values.email) errors.email = 'Email is required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address'
    if (!values.password) errors.password = 'Password is required'
    else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters'
    else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password))
      errors.password = 'Password must contain at least one alphabet and one numeric character'
    if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match'
    return errors
  }

  const handleSubmitPage1 = (e) => {
    e.preventDefault()
    const validationErrors = validateFormPage1(formValues)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setPage(2)
    }
  }

  const handleSubmitPage2 = (e) => {
    e.preventDefault()
    const validationErrors = {}
    // Add your validation logic for page 2 fields here
    if (!formValues.username) validationErrors.username = 'Username is required'
    else if (formValues.username.length < 6) validationErrors.username = 'Username must be at least 6 characters'
    else if (!/^[a-zA-Z_][a-zA-Z0-9_]{5,}$/.test(username)) validationErrors.username = 'Invalid username'

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      // Handle successful validation (e.g., send data to the server)
      console.log('Form submitted successfully:', formValues)
      localStorage.removeItem('signUpFormValues')
    }
  }

  return (
    <div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-8 lg:px-8 lg:py-8'>
      <div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
        <h2 className='text-center text-2xl font-bold leading-tight text-black'>Sign up to Chat-App</h2>
        <p className='mt-2 text-center text-base text-gray-600'>
          Already have an account?{' '}
          <a href='#' title='' className='font-medium text-black transition-all duration-200 hover:underline'>
            Sign In
          </a>
        </p>
        {page === 1 && (
          <form onSubmit={handleSubmitPage1} className='mt-8'>
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='firstName'
                  className='flex items-center justify-between text-base font-medium text-gray-900'
                >
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type='text'
                    placeholder='First Name'
                    id='firstName'
                    name='firstName'
                    autoComplete='given-name'
                    value={formValues.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor='lastName'
                  className='flex items-center justify-between text-base font-medium text-gray-900'
                >
                  Last Name
                </label>
                <div className='mt-2'>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type='text'
                    placeholder='Last Name'
                    id='lastName'
                    name='lastName'
                    autoComplete='family-name'
                    value={formValues.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='flex items-center justify-between text-base font-medium text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type='email'
                    placeholder='yourname@example.com'
                    id='email'
                    name='email'
                    autoComplete='email'
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='flex items-center justify-between text-base font-medium text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type='password'
                    placeholder='********'
                    id='password'
                    name='password'
                    autoComplete='new-password'
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor='confirmPassword'
                  className='flex items-center justify-between text-base font-medium text-gray-900'
                >
                  Confirm Password
                </label>
                <div className='mt-2'>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type='password'
                    placeholder='********'
                    id='confirmPassword'
                    name='confirmPassword'
                    autoComplete='new-password'
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword}</p>}
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        )}
        {page === 2 && (
          <form onSubmit={handleSubmitPage2} className='mt-8'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-2 mb-4'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center rounded-md px-3 py-2.5 font-semibold leading-7 text-black hover:bg-gray-200'
                  onClick={() => setPage(1)}
                >
                  <BackIcon className='mr-2 h-5 w-5' />
                </button>
              </div>
              <div>
                <label
                  htmlFor='username'
                  className='flex items-center justify-between text-base font-medium text-gray-900'
                >
                  Username
                </label>
                <div className='mt-2'>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type='text'
                    placeholder='Username'
                    id='username'
                    name='username'
                    autoComplete='username'
                    value={formValues.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username}</p>}
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export { SignUp }
