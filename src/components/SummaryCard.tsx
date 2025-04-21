"use client";

import React from 'react';
import { Utensils, Activity, Droplet, TriangleAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ExerciseWeek } from '@/types';
import { BlurFade } from "@/components/magicui/blur-fade";

interface SummaryCardProps {
  caloriesConsumed: number;
  caloriesGoal: number;
  exerciseMinutes: number;
  exerciseGoal: number;
  waterIntake: number;
  waterGoal: number;
  LodingStatistics: boolean;
  ExercisesAvalibale:ExerciseWeek[] | null;
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
  LodingStatistics,
  setWaterIntake
}) => {
  return (
    <>
    {LodingStatistics ? 
        (
          <div className="bg-white p-6 rounded-xl shadow-sm pb-11 animate-pulse flex justify-center items-center">
             <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          </div>
        )
    :
      (
        <BlurFade delay={0.05} inView>
            <div className={`bg-white p-6 rounded-xl shadow-sm pb-11`}>
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
        </BlurFade>
      )
    }
    </>

      
  );
};

export default SummaryCard;