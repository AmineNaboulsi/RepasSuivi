"use client";

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MacroData } from '../types';

interface MacronutrientsCardProps {
  macros: MacroData[];
}

const MacronutrientsCard: React.FC<MacronutrientsCardProps> = ({ macros }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Macronutrients</h2>
        <div className="p-1.5 bg-indigo-100 rounded-lg">
          <TrendingUp size={18} className="text-indigo-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        {macros.map((macro) => (
          <div key={macro.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{macro.name}</span>
              <span className="text-gray-500">{macro.value}g / {macro.goal}g</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${(macro.value / macro.goal) * 100}%`,
                  backgroundColor: macro.color 
                }}
              ></div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 mt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <p className="font-medium">Current Split</p>
              <p className="text-gray-500">Based on today &apos;s intake</p>
            </div>  
            <div className="w-16 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macros}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={30}
                    dataKey="value"
                  >
                    {macros.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacronutrientsCard;