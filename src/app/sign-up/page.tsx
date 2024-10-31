'use client'

import React from 'react'
import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
const SignUp :React.FC= () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });


  return (
    <div className='mt-10'>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2'>
        <div className='bg-red-400'>home</div>
        <div className='bg-green-500'>
        <form onSubmit={onSubmit}>
      <div>
        <label>First Name</label>
        <input
          {...register("firstName", { required: "First name is required" })}
        />
        {touchedFields.firstName && errors.firstName && (
          <p>{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label>Last Name</label>
        <input
          {...register("lastName", { required: "Last name is required" })}
        />
        {touchedFields.lastName && errors.lastName && (
          <p>{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {touchedFields.email && errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {touchedFields.password && errors.password && (
          <p>{errors.password.message}</p>
        )}
      </div>

      <button type="submit">Create Account</button>
    </form>
        </div>
              
      </div>
      
    </div>
  )
}

export default SignUp