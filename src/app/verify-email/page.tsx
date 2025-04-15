'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function VerifyEmail() {
    const [verificationStatus, setVerificationStatus] = useState<{
        status?: string;
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
                        status: 'error', 
                        message: 'No verification token found' 
                    });
                    setLoading(false);
                    return;
                }
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_URLAPI_GETWAY}/verify-email`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
                
                const data = await response.json();
                setVerificationStatus(data);
            } catch (error) {
                setVerificationStatus({ 
                    status: 'error', 
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
                        <h1 className="text-2xl font-bold mb-4">
                            {verificationStatus.status === 'success' 
                                ? 'Email Verified!' 
                                : 'Verification Failed'}
                        </h1>
                        <p>{verificationStatus.message}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;