import { useEffect } from "react";
import confetti from 'canvas-confetti';

const GoalCompletionToast = (message :string) => {
  useEffect(() => {
    const confettiOptions = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899']
    };
    
    confetti(confettiOptions);
  }, []);

  return (
    <div className="flex items-center px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
      <div className="mr-3 bg-white rounded-full p-2">
        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-white font-medium">{message}</div>
    </div>
  );
};

export default GoalCompletionToast;