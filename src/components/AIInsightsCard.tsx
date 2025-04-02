"use client";

import React from 'react';
import { Award } from 'lucide-react';

const AIInsightsCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-6 rounded-xl shadow-sm text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">AI Insights</h2>
        <Award size={20} />
      </div>
      
      <p className="text-indigo-100 mb-4">Based on your recent activity and nutrition patterns:</p>
      
      <ul className="space-y-2">
        <li className="flex items-start">
          <div className="bg-white bg-opacity-20 p-1 rounded-full mr-2 mt-0.5">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <p className="text-sm">Your protein intake has been consistent and meeting your goals. Great job!</p>
        </li>
        <li className="flex items-start">
          <div className="bg-white bg-opacity-20 p-1 rounded-full mr-2 mt-0.5">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <p className="text-sm">Consider increasing water intake by 2 glasses to reach optimal hydration.</p>
        </li>
        <li className="flex items-start">
          <div className="bg-white bg-opacity-20 p-1 rounded-full mr-2 mt-0.5">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <p className="text-sm">Your weekend calorie intake is higher than weekdays. Consider balancing for better results.</p>
        </li>
      </ul>
      
      <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium">View Detailed Report</button>
    </div>
  );
};

export default AIInsightsCard;
