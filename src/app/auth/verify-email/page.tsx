"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  


  useEffect(() => {

    const handleVerify = async (token:string) => {
      setIsVerifying(true);
      try {
         console.log(token)     
        setVerificationStatus('success');
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
        
      } catch {
        setVerificationStatus('error');
      } finally {
        setIsVerifying(false);
      }
    };

    const token = searchParams?.get('token');
    console.log(isVerifying)
    if (token) {
      handleVerify(token);
    }
  }, [searchParams, isVerifying,router]);
  

  
  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await fetch(`${process.env.NEXT_PUBLIC_URLAPI_GETWAY}/api/auth/verify-email?email=${encodeURIComponent(email)}`,{
        method : 'POST'
      });
      if(res.status == 404){
        setVerificationStatus('resend-error');
        return ;
      }
      const data = await res.json();
      console.log(data)
      setVerificationStatus('resent');
      
    }catch {
        setVerificationStatus('resend-error');
    } finally {
        setIsResending(false);
    }
  };
  
  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Email verified successfully!</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your account is now active. You will be redirected to the login page in a few seconds.
          </p>
          <div className="mt-4">
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Click here if you&apos;re not redirected
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
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
            
            <path d="M170 200 L190 220 L230 180" stroke="#4ADE80" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="125" y="140" width="150" height="100" rx="8" ry="8" fill="none" stroke="white" strokeWidth="8" />
            <path d="M125 160 L200 210 L275 160" stroke="white" strokeWidth="8" fill="none" />
          </svg>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your email
        </h2>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Verification email sent</h3>
              <div className="mt-3">
                <p className="text-sm text-gray-500">
                  We&apos;ve sent a verification email to <span className="font-medium text-gray-900">{email}</span>.
                  <br />Click on the link in the email to verify your account.
                </p>
              </div>
              
              {verificationStatus === 'error' && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        The verification link is invalid or has expired.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {verificationStatus === 'resent' && (
                <div className="mt-4 rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        A new verification email has been sent.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {verificationStatus === 'resend-error' && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        Could not resend verification email. Please try again later.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resending...
                    </>
                  ) : 'Resend verification email'}
                </button>
                
                <div className="mt-4">
                  <Link href="/auth/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Return to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;