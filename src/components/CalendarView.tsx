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
  isLoading: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  currentDate,
  userData,
  mealData,
  formatDate,
  calculateTotalCalories,
  navigateMonth,
  selectDate ,
  isLoading
}) => {
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate() + 1;
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (DayType | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const formattedDate = formatDate(date);
        const dateExists = days.some((item:DayType) => item?.date === formattedDate);
        
        if (!dateExists) {

          const meals = mealData ? mealData[formattedDate] || [] : null;

          const totalCalories = calculateTotalCalories(formattedDate);
          const weightEntry = userData.weightHistory ? userData.weightHistory.find(entry => entry.date === formattedDate) : null;
  
            days.push({
                day: i ,
                date: formattedDate,
                mealCount:  meals ?  meals.length : 0,
                totalCalories,
                weight: weightEntry?.weight,
                isToday: formattedDate === formatDate(new Date())
            });
        }
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
      
      <div className={`relative grid grid-cols-7 gap-1 ${isLoading && 'animate-pulse'}`}>
      {isLoading && 
      (
      <div className="absolute flex h-full w-full justify-center items-center">
          <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-200 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      )}
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`min-h-16 p-1 border rounded ${day?.isToday ? 'bg-indigo-50 border-indigo-200' : 'bg-white'} 
            ${day?.date === formatDate(currentDate) ? 'ring-2 ring-indigo-500' : ''} 
            ${day ? 'cursor-pointer hover:bg-gray-50' : ''}`}
            onClick={() => day && selectDate(day)}
          >
            {day ? (
              <>
              
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${day.isToday ? 'text-indigo-600' : ''}`}>{new Date(day.date).getDate()}</span>
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
            ):(<></>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;