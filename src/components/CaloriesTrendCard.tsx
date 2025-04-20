"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NutritionData } from '../types';
import { TriangleAlert } from 'lucide-react';

interface CaloriesTrendCardProps {
  data: NutritionData[];
}

const CaloriesTrendCard: React.FC<CaloriesTrendCardProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
          <div className='flex items-center gap-1 justify-center'>
            {data == null && <TriangleAlert size={20} className="text-red-800" />  }
            <h2 className={`text-lg font-semibold ${data == null ? 'text-red-800' : 'text-gray-800' }`}>Calories Trend</h2>
          </div>
          {data != null && <span className="text-xs text-gray-500">Last 7 days</span>} 
      </div>
      {data == null ? 
          (
            <div className="h-56 flex items-center justify-center">
              <div className="text-center">
            <p className="text-red-500 font-medium mb-2">Error fetching data</p>
            <button 
              className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
              </div>
            </div>
          )
      : 
      <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart  data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis axisLine={false} tickLine={false} width={30} />
          <Tooltip />
          <Line type="monotone" dataKey="calories" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    }

    </div>
  );
};

export default CaloriesTrendCard;
