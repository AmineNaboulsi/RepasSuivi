"use client";

import React from 'react';
import { Utensils, Activity, Droplet, TriangleAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ExerciseWeek } from '@/types';

interface SummaryCardProps {
  caloriesConsumed: number;
  caloriesGoal: number;
  exerciseMinutes: number;
  exerciseGoal: number;
  waterIntake: number;
  waterGoal: number;
  ExercisesAvalibale:ExerciseWeek[];
  setWaterIntake: (value: number) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  caloriesConsumed,
  caloriesGoal,
  exerciseMinutes,
  exerciseGoal,
  waterIntake,
  waterGoal,
  ExercisesAvalibale,
  setWaterIntake
}) => {
  return (
      <div className="bg-white p-6 rounded-xl shadow-sm pb-11">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Today&apos;s Summary</h2>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">On Track</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <Utensils size={20} className={`${caloriesConsumed ==null ? 'text-red-600':'text-indigo-600' }`} />
              </div>
              <div>
                <p className={`text-sm ${caloriesConsumed ==null?'text-red-600' : 'text-gray-600'}`}>Calories</p>
                {caloriesConsumed !=null ?
                  <p className="font-semibold">{caloriesConsumed ?? 0} / {caloriesGoal}</p>
                  :
                  <p className="font-semibold text-red-800">-- mins / -- mins</p>
                }
              </div>
            </div>
            <div className="w-16 h-16">
              <ResponsiveContainer  width="100%" height="100%">
                <PieChart className='-z-0'>
                  <Pie
                    data={[
                      { name: 'Consumed', value: caloriesConsumed },
                      { name: 'Remaining', value: Math.max(0, caloriesGoal - caloriesConsumed) }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={18}
                    outerRadius={25}
                    fill="#8884d8"
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#8884d8" />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Activity size={20} className={`${ExercisesAvalibale==null ? 'text-red-600':'text-blue-600' }`} />
              </div>
              <div>
                <p className={`text-sm ${ExercisesAvalibale ==null ? 'text-red-600':'text-gray-600' }`}>Exercise</p>
                {ExercisesAvalibale !=null ?
                  <p className="font-semibold">{exerciseMinutes} mins / {exerciseGoal} mins</p>
                  :
                  <p className="font-semibold text-red-800">-- mins / -- mins</p>
                }
              </div>
            </div>
            <div className="relative w-16 h-2 bg-gray-200 rounded-full">
              {ExercisesAvalibale==null ? 
              (
                <>
                  <TriangleAlert size={20} className="absolute right-0 -top-1 text-red-800" />
                  <div className="h-2 bg-red-200 rounded-full transition-all duration-1500" ></div>
                </>
              ):
              <div className="h-2 bg-blue-600 rounded-full transition-all duration-1500" style={{ width: `${Math.min(100, (exerciseMinutes / exerciseGoal) * 100)}%` }}></div>
              }
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 bg-cyan-100 rounded-lg mr-3">
                <Droplet size={20} className="text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Water</p>
                <p className="font-semibold">{waterIntake} / {waterGoal} glasses</p>
              </div>
            </div>
            <div className="flex">
              {[...Array(waterGoal)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-4 h-6 mx-0.5 rounded-sm ${i < waterIntake ? 'bg-cyan-500' : 'bg-gray-200'}`}
                  onClick={() => setWaterIntake(i + 1)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default SummaryCard;