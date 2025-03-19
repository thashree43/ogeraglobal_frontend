import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/Ogera_Logo.png';
import BackgroundImage from '../../assets/Ogera Logo-color-1.png';
import {useVerifyotpMutation,useResendotpMutation} from "../../api/Adminapi"
import { useLocation } from 'react-router-dom';


const Otp = () => {
    const location = useLocation();
  const email = location.state?.email; // Retrieve email from the state

  const [otp, setOtp] = useState({ otp1: '', otp2: '', otp3: '', otp4: '' });
  useEffect(() => {
    console.log(email, "otp email");
  }, [email]);
  const [otpErrors, setOtpErrors] = useState({});
  const [counter, setCounter] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [verifyOtp] = useVerifyotpMutation()
  const [resendOtp] = useResendotpMutation()
  const navigate = useNavigate();

  useEffect(() => {
    const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setIsResendDisabled(false);
      setIsOtpExpired(true);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d?$/.test(value)) {
      setOtp((prev) => ({ ...prev, [name]: value }));
      setOtpErrors((prev) => ({ ...prev, [name]: '' }));
      
      if (value) {
        const nextInput = document.getElementById(`otp${parseInt(name.slice(-1)) + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    const { name, value } = e.target;
    if (e.key === 'Backspace' && !value) {
      const prevInput = document.getElementById(`otp${parseInt(name.slice(-1)) - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isOtpExpired) {
      toast.error('OTP has expired. Please resend OTP.');
      return;
    }
    const errors = {};
    Object.keys(otp).forEach((key) => {
      if (!otp[key]) errors[key] = 'Required';
    });
    if (Object.keys(errors).length > 0) {
      setOtpErrors(errors);
      return;
    }
    try {
        console.log(email,"otp emnail");
        
        const response = await verifyOtp({
            email,
            otp1: otp.otp1,
            otp2: otp.otp2,
            otp3: otp.otp3,
            otp4: otp.otp4,
          }).unwrap();
          console.log(response.message);
          
      toast.success('OTP Verified Successfully');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Verification failed');
    }
  };

  const handleResend = async () => {
    if (!isOtpExpired) {
      toast.warning('Wait until OTP expires.');
      return;
    }
    try {
        const response = await resendOtp({ email }).unwrap();
console.log("resend otp :response",response);

      setCounter(60);
      setIsResendDisabled(true);
      setIsOtpExpired(false);
      setOtp({ otp1: '', otp2: '', otp3: '', otp4: '' });
      toast.success('New OTP sent to your email.');
      setOtpErrors({});
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div
      className="relative flex min-h-screen justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 bg-white bg-opacity-80 p-8 shadow-2xl rounded-3xl max-w-md w-full">
        <div className="flex flex-col items-center space-y-4">
          <img src={Logo} alt="Logo" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
          <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>
          <p className="text-gray-600 text-sm text-center">
            We sent a code to <span className="font-semibold">{email}</span>
          </p>
          {isOtpExpired && <p className="text-red-500 text-sm">OTP expired. Please resend.</p>}
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex justify-center space-x-4">
            {['otp1', 'otp2', 'otp3', 'otp4'].map((field, index) => (
              <input
                key={index}
                id={`otp${index + 1}`}
                type="text"
                name={field}
                value={otp[field]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                maxLength={1}
                className="w-12 h-12 text-xl text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all mt-4"
          >
            Verify OTP
          </button>
          <div className="flex justify-center mt-4 text-sm">
            <button
              type="button"
              disabled={isResendDisabled}
              onClick={handleResend}
              className={`text-blue-600 hover:text-blue-700 ${isResendDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {isResendDisabled ? `Resend in ${counter}s` : 'Resend OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
