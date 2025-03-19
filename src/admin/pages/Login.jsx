import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Logo from '../../assets/Ogera_Logo.png';
import BackgroundImage from '../../assets/Ogera Logo-color-1.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { useAdminloginMutation } from "../../api/Adminapi";
import { setAdminInfo, setAdminToken } from "../../api/adminslice";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();  // Add dispatch hook
  const navigate = useNavigate();  // Add useNavigate hook
  const [login] = useAdminloginMutation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        console.log('Logging in with', values);
        const admindata = { email: values.email, password: values.password };
        const response = await login(admindata).unwrap();
        console.log(response, "admin successfully");

        if (response) {
          toast.success('Admin Logged in successfully!');
          console.log("admin logged successfully");
          
          localStorage.setItem('adminInfo', JSON.stringify(response));
          dispatch(setAdminInfo(response.admin)); 
          dispatch(setAdminToken(response.token)); 
          navigate('/admin/home');  // Redirect to the home page after login
        }

        setIsLoading(false);
      } catch (error) {
        toast.error('Login failed. Please try again.');
        setIsLoading(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:flex flex-1 p-12 items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Welcome Back!</h2>
            <p className="text-lg text-gray-200">Please sign in to continue.</p>
          </div>
        </div>
        <div className="flex-1 p-8 sm:p-12 bg-white bg-opacity-60 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-6 relative">
              <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
            <p className="text-sm text-gray-600 mb-8">Enter your email and password to continue</p>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-6">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  {...formik.getFieldProps('email')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm absolute bottom-0 left-0">{formik.errors.email}</div>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                  name="password"
                  placeholder="Enter your password"
                  {...formik.getFieldProps('password')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {/* Eye Icon for toggling password visibility */}
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} className="text-gray-500" />
                  ) : (
                    <FaEye size={20} className="text-gray-500" />
                  )}
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm absolute bottom-0 left-0">{formik.errors.password}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all mt-4"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Forgot Password and Sign Up Links */}
            <div className="mt-6 text-center">
              <Link
                to="/admin/forgot-password" // Adjust the route as per your routing setup
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Forgot Password?
              </Link>
              <p className="mt-2">
                Don't have an account?{' '}
                <Link
                  to="/admin/signup" // Adjust the route as per your routing setup
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
