"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ActivityData } from '../types';

interface ActivityCardProps {
  data: ActivityData[];
}

const ActivityCard: React.FC<ActivityCardProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Weekly Activity</h2>
        <button className="text-xs text-indigo-600 font-medium">View All</button>
      </div>
      
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis axisLine={false} tickLine={false} width={30} />
            <Tooltip />
            <Bar dataKey="calories" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityCard;