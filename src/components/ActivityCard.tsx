"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ActivityData } from '../types';
import { TriangleAlert } from 'lucide-react';

interface ActivityCardProps {
  data: ActivityData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { calories, minutes } = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p>🔥 Calories: {calories}</p>
        <p>🕒 Minutes: {minutes}</p>
      </div>
    );
  }
  return null;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
          <div className='flex items-center gap-1 justify-center'>
            {data == null && <TriangleAlert size={20} className="text-red-800" />  }
            <h2 className={`text-lg font-semibold ${data == null ? 'text-red-800' : 'text-gray-800' }`}>Weekly Activity</h2>
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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis axisLine={false} tickLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="calories" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

      </div>}
    </div>
  );
};

export default ActivityCard;