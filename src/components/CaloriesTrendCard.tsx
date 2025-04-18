"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NutritionData } from '../types';

interface CaloriesTrendCardProps {
  data: NutritionData[];
}

const CaloriesTrendCard: React.FC<CaloriesTrendCardProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Calories Trend</h2>
        <span className="text-xs text-gray-500">Last 7 days</span>
      </div>
      
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
    </div>
  );
};

export default CaloriesTrendCard;
