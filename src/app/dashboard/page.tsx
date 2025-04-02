"use client";

import React, { useEffect, useState } from 'react';
import { User, Calendar, BarChart3, Award, Plus } from 'lucide-react';
import Link from 'next/link';
import { DayType, UserData, NutritionData, ActivityData, MacroData ,MealDataCalender } from '../../types';
import CalendarView from '../../components/CalendarView';
import MealCard from '../../components/MealCard';
import SummaryCard from '../../components/SummaryCard';
import MacronutrientsCard from '../../components/MacronutrientsCard';
import CaloriesTrendCard from '../../components/CaloriesTrendCard';
import ActivityCard from '../../components/ActivityCard';
import Cookies from 'js-cookie'

const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealData, setmealData] = useState<MealDataCalender>({});
  const [currentView, setCurrentView] = useState('overview');
  const [waterIntake, setWaterIntake] = useState(5);
  const waterGoal = 8;
  
  useEffect(()=>{
    const fetchMealData = async ()=>{
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      const res = await fetch(`${url}/api/meals`,{
        headers: {
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const data = await  res.json();
      setmealData(data);
    }
    fetchMealData()
  },[])
  const userData: UserData = {
    name: "Sophie Martin",
    dailyCalorieGoal: 2100,
    weightGoal: 68,
    currentWeight: 72.3,
    weightHistory: [
      { date: '2025-03-10', weight: 73.1 },
      { date: '2025-03-11', weight: 73.0 },
      { date: '2025-03-12', weight: 72.8 },
      { date: '2025-03-13', weight: 72.6 },
      { date: '2025-03-14', weight: 72.4 },
      { date: '2025-03-15', weight: 72.5 },
      { date: '2025-03-16', weight: 72.3 }
    ],
    achievements: [
      { id: 1, name: "Eat 5 vegetables", completed: true, date: '2025-03-16' },
      { id: 2, name: "Stay under calorie goal for 7 days", completed: false, progress: 5 },
      { id: 3, name: "Try 3 new recipes", completed: true, date: '2025-03-12' }
    ]
  };
  
  const nutritionData: NutritionData[] = [
    { day: 'Mon', protein: 65, carbs: 120, fat: 45, calories: 1850 },
    { day: 'Tue', protein: 70, carbs: 110, fat: 40, calories: 1780 },
    { day: 'Wed', protein: 60, carbs: 130, fat: 38, calories: 1720 },
    { day: 'Thu', protein: 72, carbs: 105, fat: 42, calories: 1805 },
    { day: 'Fri', protein: 68, carbs: 112, fat: 44, calories: 1900 },
    { day: 'Sat', protein: 55, carbs: 140, fat: 50, calories: 2100 },
    { day: 'Sun', protein: 62, carbs: 125, fat: 48, calories: 1950 },
  ];

  const activityData: ActivityData[] = [
    { day: 'Mon', minutes: 45, calories: 320 },
    { day: 'Tue', minutes: 30, calories: 210 },
    { day: 'Wed', minutes: 60, calories: 450 },
    { day: 'Thu', minutes: 0, calories: 0 },
    { day: 'Fri', minutes: 45, calories: 340 },
    { day: 'Sat', minutes: 90, calories: 680 },
    { day: 'Sun', minutes: 30, calories: 220 },
  ];

  const currentMacros: MacroData[] = [
    { name: 'Protein', value: 93, color: '#8884d8', goal: 120 },
    { name: 'Carbs', value: 112, color: '#82ca9d', goal: 130 },
    { name: 'Fat', value: 44, color: '#ffc658', goal: 50 },
  ];
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const getMealsForSelectedDate = () => {
    const formattedDate = formatDate(currentDate);
    return mealData[formattedDate] || [];
  };
  
  const calculateTotalCalories = (date: string) => {
    const formattedDate = typeof date === 'string' ? date : formatDate(date as Date);
    const meals = mealData[formattedDate] || [];
    return meals.reduce((total: number, meal) => total + meal.calories, 0);
  };
  
  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const selectDate = (day: DayType) => {
    if (day) {
      const newDate = new Date(day.date);
      setCurrentDate(newDate);
    }
  };

  
  const calculateDayProgress = () => {
    const todayMeals = getMealsForSelectedDate();
    const totalCalories = todayMeals.reduce((sum: number, meal) => sum + meal.calories, 0);
    const percentOfGoal = Math.min(Math.round((totalCalories / userData.dailyCalorieGoal) * 100), 100);
    return {
      total: totalCalories,
      percent: percentOfGoal,
      remaining: userData.dailyCalorieGoal - totalCalories
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">RepasSuivi</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 ml-4">
                <span>{userData.name}</span>
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto mt-6 px-4">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex justify-center">
            <button 
              className={`py-3 px-6 flex items-center justify-center ${currentView === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setCurrentView('overview')}
            >
              <Calendar size={20} className="mr-2" />
              <span>Overview</span>
            </button>
            <button 
              className={`py-3 px-6 flex items-center justify-center ${currentView === 'nutrition' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setCurrentView('nutrition')}
            >
              <BarChart3 size={20} className="mr-2" />
              <span>Nutrition</span>
            </button>
            <button 
              className={`py-3 px-6 flex items-center justify-center ${currentView === 'achievements' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setCurrentView('achievements')}
            >
              <Award size={20} className="mr-2" />
              <span>Achievements</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <div className="lg:col-span-1 space-y-6 relative">
            <CalendarView 
              currentDate={currentDate}
              userData={userData}
              mealData={mealData}
              formatDate={formatDate}
              calculateTotalCalories={calculateTotalCalories}
              navigateMonth={navigateMonth}
              selectDate={selectDate}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            
             
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SummaryCard 
                caloriesConsumed={calculateDayProgress().total}
                caloriesGoal={userData.dailyCalorieGoal}
                exerciseMinutes={45}
                exerciseGoal={60}
                waterIntake={waterIntake}
                waterGoal={waterGoal}
                setWaterIntake={setWaterIntake}
              />
              
              <MacronutrientsCard macros={currentMacros} />
              
              <CaloriesTrendCard data={nutritionData} />
              
              <ActivityCard data={activityData} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Meals for {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <Link href='/dashboard/add-meal' className="bg-indigo-600 text-white px-3 py-2 rounded-lg flex items-center text-sm">
                  <Plus size={16} className="mr-1" />
                  Add Meal
                </Link>
              </div>
              
             
              
              <div className="mt-4">
                {getMealsForSelectedDate().length > 0 ? (
                  getMealsForSelectedDate().map(meal => (
                    <MealCard key={meal.id} meal={meal} />
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Select a date with meals to view details
                  </div>
                )}
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;