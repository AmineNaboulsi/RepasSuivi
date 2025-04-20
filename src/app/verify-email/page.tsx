'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function EmailVerificationContent() {
    const [verificationStatus, setVerificationStatus] = useState<{
        status?: number;
        message?: string;
    }>({});
    const [loading, setLoading] = useState(true);
    
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = searchParams.get('_token');
                
                if (!token) {
                    setVerificationStatus({ 
                        status: 400, 
                        message: 'No verification token found' 
                    });
                    setLoading(false);
                    return;
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_URLAPI_GETWAY}/verifyemail?_token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response)
                const data = await response.json();
                setVerificationStatus({ 
                    status: response.status, 
                    message: data.message
                });
                setVerificationStatus(data);
            } catch (error) {
                console.error(error)
                setVerificationStatus({ 
                    status: 400, 
                    message: 'Failed to verify email' 
                });
            } finally {
                setLoading(false);
            }
        };
        
        verifyEmail();
    }, [searchParams]);
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg">
                {loading ? (
                    <p>Verifying your email...</p>
                ) : (
                    <>
{/*                     
                        <h1 className="text-2xl font-bold mb-4">
                            
                            {verificationStatus.status == 200
                                ? 'Email Verified!' 
                                : 'Verification Failed'}
                        </h1> */}
                        <p>{verificationStatus.message}</p>
                    </>
                )}
            </div>
        </div>
    );
}

function VerifyEmail() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg">
                <p>Loading...</p>
            </div>
        </div>}>
            <EmailVerificationContent />
        </Suspense>
    );
}

export default VerifyEmail;