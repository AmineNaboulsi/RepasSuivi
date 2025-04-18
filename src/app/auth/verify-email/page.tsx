"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type SendResponse  = {
  status: boolean | null,
  message: string,
  isVerified?: boolean
}
const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<SendResponse>({
    status: null,
    message: '',
    isVerified: false
  });
  


  useEffect(() => {

    const handleVerify = async (token:string) => {
      setIsVerifying(true);
      console.log(token)
      try {
        setVerificationStatus((prev)=>({
          ...prev,
          status: true
        }));
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
        
      } catch {
        setVerificationStatus((prev)=>({
          ...prev,
          status: false
        }));
      } finally {
        setIsVerifying(false);
      }
    };

    const token = searchParams?.get('token');
    if (token) {
      handleVerify(token);
    }
  }, [searchParams, isVerifying,router]);
  

  
  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await fetch(`${process.env.NEXT_PUBLIC_URLAPI_GETWAY}/sent-verify-link?email=${encodeURIComponent(email)}`,{
        method : 'POST'
      });
      if(!res.ok){
        setVerificationStatus((prev)=>({
          ...prev,
          status: false,
          message: "Sorry we can send you any verifyes link today, please try later."
        }));
      }
      const data = await res.json();
      setVerificationStatus((prev)=>({
        ...prev,
        status : res.status == 200 ? true : false ,
        message: data?.message || 'We face a trouble whell sending teh email verification, try again',
        isVerified: data?.isVerified || false
      }));
      if(data?.isVerified){
        setTimeout(() => {
          router.push('/auth/login');
        }, 1000);
      }
      return ;
    }catch {
      setVerificationStatus((prev)=>({
        ...prev,
        status : false,
        mesage: 'We face a trouble whell sending teh email verification, try again'
      }));
    } finally {
        setIsResending(false);
    }
  };

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
            {verificationStatus.status}
              {
                verificationStatus.status != null ?
                (
                  <>
                  {!verificationStatus.status ? (
                    <div className="mt-4 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">
                            {verificationStatus.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ):(<div className="mt-4 rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          {verificationStatus.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                  </>
                ):<></>
              }
              
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