import { Link } from "react-router-dom";
import { loginUser } from "../helpers/AuthHelper";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { setSiteTitle } from "../utils/utils";
import { LoginModel, LoginModelValidation } from "../models/LoginModel";
import { ErrorMessage, Field, Form, Formik } from "formik";

const LoginPage = () => {
  // const [formData, setFormData] = useState<LoginModel>({
  //   username: "",
  //   // email: "",
  //   password: "",
  // });
  const dispatch = useDispatch();
  // const [, setUpdate] = useState<boolean>(false);
  // const validator = useRef(new SimpleReactValidator());

  // function onInputChange(e: ChangeEvent) {
  //   const target = e.target as HTMLInputElement;
  //   setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  // }

  function onFormSubmit(formData: LoginModel) {
    // e.preventDefault();
    // if (!validator.current.allValid()) {
    //   validator.current.showMessages();
    //   setUpdate((prev) => !prev);
    //   return;
    // }
    const [isLogin, userData] = loginUser(formData);
    if (isLogin) {
      dispatch(authActions.loginUser(userData));
    }
  }
  setSiteTitle("Login");
  return (
    <>
      <Formik<LoginModel> initialValues={new LoginModel()} validationSchema={LoginModelValidation} onSubmit={onFormSubmit}>
        <Form className='space-y-6 border border-gray-700 p-10 rounded-xl w-md'>
          <div className='mb-6 text-center'>
            <h2 className='text-3xl font-bold'>Login</h2>
            <p className='mt-2 text-sm text-gray-400'>Welcome back! Please enter your details to continue.</p>
          </div>
          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Username / Email
            </label>
            <Field
              type='text'
              name='username'
              placeholder="Enter Username Or Email"
              className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
            />
            <ErrorMessage name='username' component='div' className='text-red-600  w-[200px]' />
          </div>

          {/* Password */}
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

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-white text-black font-semibold py-2 rounded-md border border-gray-700 hover:bg-gray-200 transition'
          >
            Login
          </button>

          {/* Extra Links */}
          <p className='text-center text-sm text-gray-400 mt-4'>
            Don't have an account?{" "}
            <Link to='/signup' className='underline hover:text-white'>
              Sign up
            </Link>
          </p>
        </Form>

      </Formik>
    </>
  );
};

export default LoginPage;
