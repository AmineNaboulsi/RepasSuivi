"use client";

import React, { useState , useEffect} from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface typeAddWeightProps {
  datePicked : Date;
  changeDate: (newDate: Date) => void;
}

const AddWeight = ({datePicked , changeDate  }: typeAddWeightProps) => {
  const [weight, setWeight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [previousWeight, setPreviousWeight] = useState<number | null>(null);

  const fetchPreviousWeight = async (date:Date) => {
    try {
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      const token = Cookies.get('auth-token');
      setLoading(true);
      const formattedDate = date.toISOString().split('T')[0];
      const res = await fetch(`${url}/api/weight-records?date=${formattedDate}&f=true`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      if (data && data.length > 0) {
        setPreviousWeight(data[0].weight);
      } else {
        setPreviousWeight(null);
      }
      setNotes(data[0]?.note ?? '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching previous weight:', error);
    }
  };
  
  useEffect(() => {
    fetchPreviousWeight(datePicked);
  }, [changeDate ,datePicked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight) {
      setError('Please enter your weight');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      const token = Cookies.get('auth-token');
      
      const weightData = {
        weight: parseFloat(weight),
        date:datePicked,
        note : notes
      };
      
      const res = await fetch(`${url}/api/weight-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(weightData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setWeight('');
        setNotes('');
        setTimeout(() => {
          setSuccess(false);

        },200)
        setPreviousWeight(parseFloat(weight));
        
      } else {
        setError(data.message || 'Failed to save weight entry');
      }
    } catch (error) {
      setError('An error occurred while saving your weight entry');
      console.error('Error saving weight entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDifference = () => {
    if (previousWeight && weight) {
      return parseFloat(weight) - previousWeight;
    }
    return null;
  };

  const weightDifference = calculateDifference();

  return (
    <div className="p-6 relative bg-white rounded-xl shadow-sm ">
      <div className="flex items-center mb-6">
        <h1 className="text-xl font-semibold">Log New Weight</h1>
      </div>
      <>
      <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Weight (kg)
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`${loading && 'animate-pulse' } w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder={`${loading ? '' : 'Enter your weight'}`}
                  min="20"
                  max="300"
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500">kg</span>
                </div>
              </div>
              
              {(previousWeight !== null && !loading) && (
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-gray-500 mr-2">Previous:</span>
                  <span className="font-medium">{previousWeight} kg</span>
                  
                  {weightDifference !== null && (
                    <div className={`ml-3 flex items-center ${
                      weightDifference > 0 
                        ? 'text-red-500' 
                        : weightDifference < 0 
                          ? 'text-green-500' 
                          : 'text-gray-500'
                    }`}>
                      {weightDifference > 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : weightDifference < 0 ? (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      ) : (
                        <Minus className="h-4 w-4 mr-1" />
                      )}
                      <span>{Math.abs(weightDifference).toFixed(1)} kg</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={`${loading && 'animate-pulse' } w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder={`${loading ? '' : 'Add any notes about your weight'}`}
              disabled={loading}

            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link
              href="/dashboard/"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            {/* <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Weight Entry'}
            </button> */}
            <motion.button
                  type="submit"
                  disabled={isSubmitting || success}
                  className={`px-4 py-2 text-white rounded-md ${
                    success 
                      ? 'bg-green-500' 
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } ${
                    (isSubmitting || success) ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  animate={{
                    scale: success ? 1.05 : 1,
                    backgroundColor: success ? '#10b981' : '#4f46e5'
                  }}
                  transition={{
                    duration: 0.5,
                    scale: {
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Saving...' : success ? '✓ Saved!' : 'Save Weight Entry'}
                </motion.button>
          </div>
        </form>
          </>
      
    </div>
  );
};

export default AddWeight;