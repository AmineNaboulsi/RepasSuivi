"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayType, UserData ,MealDataCalender} from '../types';

interface CalendarViewProps {
  currentDate: Date;
  userData: UserData;
  mealData: MealDataCalender;
  formatDate: (date: Date) => string;
  calculateTotalCalories: (date: string) => number;
  navigateMonth: (direction: number) => void;
  selectDate: (day: DayType) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  currentDate,
  userData,
  mealData,
  formatDate,
  calculateTotalCalories,
  navigateMonth,
  selectDate
}) => {
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (DayType | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const formattedDate = formatDate(date);
      const meals = mealData[formattedDate] || [];
      const totalCalories = calculateTotalCalories(formattedDate);
      const weightEntry = userData.weightHistory.find(entry => entry.date === formattedDate);
      
      days.push({
        day: i,
        date: formattedDate,
        mealCount: meals.length,
        totalCalories,
        weight: weightEntry?.weight,
        isToday: formattedDate === formatDate(new Date())
      });
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4  sticky top-10">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigateMonth(-1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">{monthName}</h2>
        <button 
          onClick={() => navigateMonth(1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 p-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`min-h-16 p-1 border rounded ${day?.isToday ? 'bg-indigo-50 border-indigo-200' : 'bg-white'} 
            ${day?.date === formatDate(currentDate) ? 'ring-2 ring-indigo-500' : ''} 
            ${day ? 'cursor-pointer hover:bg-gray-50' : ''}`}
            onClick={() => day && selectDate(day)}
          >
            {day && (
              <>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${day.isToday ? 'text-indigo-600' : ''}`}>{day.day}</span>
                  {day.mealCount > 0 && (
                    <span className="text-xs bg-green-100 text-green-800 px-1 rounded-full">
                      {day.mealCount}
                    </span>
                  )}
                </div>
                
                {day.totalCalories > 0 && (
                  <div className="mt-1">
                    <div className="h-1 bg-gray-200 rounded-full w-full">
                      <div 
                        className="h-1 bg-indigo-500 rounded-full" 
                        style={{ width: `${Math.min(day.totalCalories / userData.dailyCalorieGoal * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">{day.totalCalories} cal</div>
                  </div>
                )}
                
                {day.weight && (
                  <div className="mt-1 text-xs text-gray-500">
                    {day.weight} kg
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;