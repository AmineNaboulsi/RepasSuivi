"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import ReCAPTCHA from "react-google-recaptcha";
import { Eye, EyeOff, Mail, User, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie'

interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

interface FormErrors {
  captcha?: string;
  email?: string;
  name?: string;
  password?: string;
  terms?: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    terms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // const handleCaptchaChange = (token: string | null) => {
  //   // setCaptchaToken(token);
  //   if (errors.captcha) {
  //     setErrors(prev => ({ ...prev, captcha: undefined }));
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the Terms and Conditions';
    }
    
    // if (!captchaToken) {
    //   newErrors.captcha = 'Please complete the reCAPTCHA';
    // }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await fetch(`${process.env.NEXT_PUBLIC_URLAPI_GETWAY}/api/auth/register`,{
        method : 'POST' , 
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          name : formData.name,
          email : formData.email,
          password : formData.password
        })
      });
      const data = await res.json();
      if(res.status == 201){
        Cookies.set('auth-token', data.token, { expires: 7 });
        router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`);
      }else{
        const errorMessage = data.message.email && Array.isArray(data.message.email) 
          ? data.message.email[0] 
          : 'Registration failed. Please try again.';
        setMessage(errorMessage);
      }
      
    } catch {
      setMessage('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left section (illustration) for larger screens */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-300 to-purple-600 p-12 justify-center items-center">
        <div className="max-w-md text-white">
          <div className="w-32 h-32 mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F3F4F6" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9FAFB" />
                  <stop offset="100%" stopColor="#F3F4F6" />
                </linearGradient>
              </defs>
              
              <circle cx="200" cy="200" r="190" fill="url(#bgGradient)" />
              
              <circle cx="200" cy="200" r="150" fill="url(#plateGradient)" stroke="#E5E7EB" strokeWidth="2" />
              
              <path d="M140 190 Q170 170, 200 190 Q230 210, 260 190" stroke="#4ADE80" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M150 180 Q185 160, 220 180 Q245 195, 270 180" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" fill="none" />
              <rect x="170" y="200" width="60" height="35" rx="5" ry="5" fill="#FB923C" />
              <circle cx="260" cy="230" r="25" fill="#FBBF24" />
              
              <path d="M100 280 L140 260 L180 270 L220 240 L260 250 L300 230" 
                    stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              
              <circle cx="200" cy="200" r="165" stroke="#8B5CF6" strokeWidth="6" strokeDasharray="650 1036" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-6">Welcome to RepasSuivi </h1>
          <p className="text-xl mb-8">Your personal nutrition and meal planning assistant.</p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-300 mt-0.5 flex-shrink-0" />
              <p>Track your daily nutrition with a beautiful, intuitive dashboard</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-300 mt-0.5 flex-shrink-0" />
              <p>Get AI-powered insights and recommendations tailored to your goals</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-300 mt-0.5 flex-shrink-0" />
              <p>Create meal plans and track your progress over time</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right section (form) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 text-indigo-600">
                <path fill="currentColor" d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.673 4.116-1.818 5.733L12 10h8a8 8 0 1 0-7.557 10.565z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-gray-600">
              Or{" "}
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                sign in to your existing account
              </Link>
            </p>
          </div>
          
          {message && (
            <div className="mb-6 flex items-center p-4 border-l-4 border-red-500 bg-red-50 rounded-md text-red-800">
              <AlertCircle className="h-5 w-5 mr-3 text-red-500" />
              <p>{message}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`} 
                    placeholder="John Doe" 
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`} 
                    placeholder="you@example.com" 
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`} 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    }
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox" 
                    checked={formData.terms}
                    onChange={handleChange}
                    className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${errors.terms ? 'border-red-300' : ''}`} 
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className={`font-medium ${errors.terms ? 'text-red-700' : 'text-gray-700'}`}>
                    I agree to the <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                  </label>
                </div>
              </div>
              {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
            </div>
            
            { /*<div className="flex justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleCaptchaChange}
                ref={recaptchaRef}
                />
            </div> */ }
            {errors.captcha && <p className="mt-1 text-sm text-center text-red-600">{errors.captcha}</p>}
            
            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;