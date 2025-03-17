"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from "react-google-recaptcha";
import { stringify } from 'querystring';

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
  
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: undefined }));
    }
  };

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
    
    if (!captchaToken) {
      newErrors.captcha = 'Please complete the reCAPTCHA';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(formData)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>RepasSuivi - Créer un compte</title>
        <meta name="description" content="Rejoignez RepasSuivi - Votre solution de suivi nutritionnel personnalisé" />
      </Head>
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="w-24 h-24 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#3B82F6" />
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {message && (
          <div className="text-red-500 bg-red-50 border border-red-200 rounded-md p-3 text-center">
            {message}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                value={formData.name}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} 
                placeholder="Full name" 
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} 
                placeholder="Email address" 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} 
                placeholder="Password" 
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
             
            </div>
          </div>
          {formData.password && formData.password.length > 0 && formData.password.length < 8 && (
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${formData.password.length < 4 ? 'bg-red-500' : formData.password.length < 8 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                      style={{ width: `${Math.min(100, (formData.password.length / 12) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {formData.password.length < 4 ? 'Weak' : formData.password.length < 8 ? 'Medium' : 'Strong'}
                  </span>
                </div>
              )}
          <div className="flex items-center">
            <input 
              id="terms" 
              name="terms" 
              type="checkbox" 
              checked={formData.terms}
              onChange={handleChange}
              className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${errors.terms ? 'border-red-300' : ''}`} 
            />
            <label htmlFor="terms" className={`ml-2 block text-sm text-gray-900 ${errors.terms ? 'text-red-500' : ''}`}>
              I agree to the <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
          
          <div className="flex justify-center my-4">
           <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            onChange={handleCaptchaChange}
            ref={recaptchaRef}
          />
          </div>
          {errors.captcha && <p className="text-red-500 text-xs text-center">{errors.captcha}</p>}
          
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;