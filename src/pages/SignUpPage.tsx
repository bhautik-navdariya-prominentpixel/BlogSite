import { Link, useNavigate } from "react-router-dom";
import { SignUpModel, SignUpModelValidation } from "../models/SignUpModel";
import { signUpUser } from "../helpers/AuthHelper";
import { setSiteTitle } from "../utils/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";

const SignUpPage = () => {
  const navigate = useNavigate();
  setSiteTitle("Sign Up");

  function onFormSubmit(value: SignUpModel): void {
    if (signUpUser(value)) {
      navigate("/");
      return;
    }
  }

  return (
    <Formik<SignUpModel> initialValues={new SignUpModel()} onSubmit={onFormSubmit} validationSchema={SignUpModelValidation}>
      {() => (
        <Form className='space-y-6 border border-gray-700 p-8 py-5 rounded-xl'>
          <div className='mb-6 text-center'>
            <h2 className='text-3xl font-bold'>Sign Up</h2>
            <p className='mt-2 text-sm text-gray-400'>Create an account to get started with MyBlog.</p>
          </div>

          {/* First & Last Name */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='firstName' className='block text-sm font-medium mb-2'>
                First Name
              </label>
              <Field
                type='text'
                name='firstName'
                placeholder="Enter First Name"
                className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
              <ErrorMessage name='firstName' component='div' className='text-red-600' />
            </div>
            <div>
              <label htmlFor='firstName' className='block text-sm font-medium mb-2'>
                Last Name
              </label>
              <Field
                type='text'
                name='lastName'
                placeholder="Enter Last Name"
                className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
              <ErrorMessage name='lastName' component='div' className='text-red-600' />
            </div>
          </div>

          {/* Email & Username */}
          {/* <div className='grid grid-cols-2 gap-4'> */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email
            </label>
            <Field
              type='text'
              name='email'
              placeholder="Enter Email"
              className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
            />
            <ErrorMessage name='email' component='div' className='text-red-600' />
          </div>
          <div>
            <label htmlFor='username' className='block text-sm font-medium mb-2'>
              Username
            </label>
            <Field
              type='text'
              name='username'
              placeholder="Enter Username"
              className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
            />
            <ErrorMessage name='username' component='div' className='text-red-600' />
          </div>
          {/* </div> */}

          {/* Password & Confirm Password */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='password' className='block text-sm font-medium mb-2'>
                Password
              </label>
              <Field
                type='password'
                name='password'
                placeholder="Enter Password"
                className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
              <ErrorMessage name='password' component='div' className='text-red-600  w-[200px]' />
            </div>
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium mb-2'>
                Confirm Password
              </label>
              <Field
                type='password'
                name='confirmPassword'
                placeholder="Enter Confirm Password"
                className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
              <ErrorMessage name='confirmPassword' component='div' className='text-red-600  w-[200px]' />
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-white text-black font-semibold py-2 rounded-md border border-gray-700 hover:bg-gray-200 transition'
          >
            Sign Up
          </button>

          {/* Extra Links */}
          <p className='text-center text-sm text-gray-400'>
            Already have an account?{" "}
            <Link to='/' className='underline hover:text-white'>
              Login
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpPage;
