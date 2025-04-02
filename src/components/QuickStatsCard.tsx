"use client";

import React from 'react';
import { UserData } from '../types';

interface QuickStatsCardProps {
  userData: UserData;
  dayProgress: {
    total: number;
    percent: number;
    remaining: number;
  };
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ userData, dayProgress }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-semibold mb-3">Quick Stats</h2>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Current Weight</span>
          <span className="font-medium">{userData.currentWeight} kg</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Goal Weight</span>
          <span className="font-medium">{userData.weightGoal} kg</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>To Go</span>
          <span className="font-medium">{(userData.currentWeight - userData.weightGoal).toFixed(1)} kg</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Daily Calorie Goal</span>
          <span className="font-medium">{userData.dailyCalorieGoal}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full w-full">
          <div 
            className="h-2 bg-indigo-500 rounded-full" 
            style={{ width: `${dayProgress.percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Today: {dayProgress.total} cal</span>
          <span>Remaining: {dayProgress.remaining} cal</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCard;