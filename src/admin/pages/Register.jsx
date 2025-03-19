import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirect
import Logo from '../../assets/Ogera_Logo.png';
import BackgroundImage from '../../assets/Ogera Logo-color-1.png';
import PasswordStrengthField from '../../Reusable/Passwordfield';
import { useAdminregisterMutation } from '../../api/Adminapi';

export const RegistrationForm = () => {
    const [userEmail, setUserEmail] = useState('');
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [register, { isLoading }] = useAdminregisterMutation();
    const [isRegistered, setIsRegistered] = useState(false); // State to track registration success
    const navigate = useNavigate(); // Hook for navigation after registration

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters').required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must include uppercase, lowercase, number, and special character')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: { username: '', email: '', mobile: '', password: '' },

        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log('the values after submitting the register form ', values);
            try {
                const admindatas = {
                    username: values.username,
                    email: values.email,
                    mobile: values.mobile,
                    password: values.password,
                };
                const response = await register(admindatas).unwrap();
                console.log(response, 'the datas has been sent to the backend');

                setUserEmail(values.email);
                setIsRegistered(true); // Set registration success flag to true

                // After successful registration
                navigate('/admin/Otp', { state: { email: values.email } }); // Pass email as part of state

                resetForm();
                setShowPasswordField(false);
            } catch (error) {
                toast.error(error?.data?.message || 'Registration Failed');
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
                        <h2 className="text-4xl font-bold mb-4 text-white">Welcome!</h2>
                        <p className="text-lg text-gray-200">Join us and start your journey with our platform.</p>
                    </div>
                </div>
                <div className="flex-1 p-8 sm:p-12 bg-white bg-opacity-60 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 mb-6 relative">
                            <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
                        <p className="text-sm text-gray-600 mb-8">Enter your details to create your account</p>
                        {!isRegistered ? (
                            <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-6">
                                {/* Username Field */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter your name"
                                        {...formik.getFieldProps('username')}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {formik.touched.username && formik.errors.username && (
                                        <div className="text-red-500 text-sm absolute bottom-0 left-0">{formik.errors.username}</div>
                                    )}
                                </div>

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

                                {/* Mobile Field */}
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter your phone"
                                        {...formik.getFieldProps('mobile')}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {formik.touched.mobile && formik.errors.mobile && (
                                        <div className="text-red-500 text-sm absolute bottom-0 left-0">{formik.errors.mobile}</div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="relative">
                                    {showPasswordField ? (
                                        <PasswordStrengthField
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={formik.touched.password && formik.errors.password}
                                        />
                                    ) : (
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            onFocus={() => setShowPasswordField(true)}
                                            {...formik.getFieldProps('password')}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    )}
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-red-500 text-sm absolute bottom-0 left-0">{formik.errors.password}</div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all mt-4"
                                >
                                    Sign Up
                                </button>
                            </form>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-800">Please verify your email by entering the OTP sent to {userEmail}</p>
                            </div>
                        )}

                        {/* Link to Login */}
                        {!isRegistered && (
                            <p className="mt-4 text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/admin/login" className="text-blue-600 hover:text-blue-700">
                                    Login here
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
