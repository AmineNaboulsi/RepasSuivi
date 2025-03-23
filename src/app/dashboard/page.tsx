"use client"

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, User, BarChart3, Award, Utensils, Plus, Clock } from 'lucide-react';

interface Meal { 
  id: number, 
  type: string, 
  time: string,
  name: string, 
  calories: number,
  protein: number,
  carbs: number,
  fat: number,
  items: string[]
}
interface dayType {
  day: number,
  date: string,
  mealCount: number,
  totalCalories: number,
  weight?: number,
  isToday: boolean
}

const RepasFollowupDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('calendar'); 
  
  const userData = {
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
  
  const mealData = {
    '2025-03-15': [
      { 
        id: 1, 
        type: 'breakfast', 
        time: '08:30',
        name: 'Avocado Toast with Eggs', 
        calories: 450,
        protein: 22,
        carbs: 30,
        fat: 28,
        items: ['Whole grain bread', 'Avocado', 'Eggs', 'Olive oil', 'Salt and pepper']
      },
      { 
        id: 2, 
        type: 'lunch', 
        time: '12:45',
        name: 'Quinoa Salad with Grilled Chicken', 
        calories: 520,
        protein: 35,
        carbs: 42,
        fat: 18,
        items: ['Quinoa', 'Grilled chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil dressing']
      },
      { 
        id: 3, 
        type: 'snack', 
        time: '16:00',
        name: 'Greek Yogurt with Berries', 
        calories: 180,
        protein: 15,
        carbs: 20,
        fat: 2,
        items: ['Greek yogurt', 'Mixed berries', 'Honey']
      },
      { 
        id: 4, 
        type: 'dinner', 
        time: '19:30',
        name: 'Baked Salmon with Vegetables', 
        calories: 650,
        protein: 42,
        carbs: 25,
        fat: 38,
        items: ['Salmon fillet', 'Asparagus', 'Sweet potato', 'Olive oil', 'Lemon', 'Herbs']
      }
    ],
    '2025-03-16': [
      { 
        id: 5, 
        type: 'breakfast', 
        time: '09:00',
        name: 'Protein Smoothie Bowl', 
        calories: 380,
        protein: 24,
        carbs: 45,
        fat: 12,
        items: ['Banana', 'Protein powder', 'Almond milk', 'Berries', 'Granola']
      },
      { 
        id: 6, 
        type: 'lunch', 
        time: '13:15',
        name: 'Mediterranean Wrap', 
        calories: 490,
        protein: 28,
        carbs: 48,
        fat: 22,
        items: ['Whole grain wrap', 'Hummus', 'Falafel', 'Tomatoes', 'Cucumber', 'Red onion', 'Tzatziki sauce']
      },
      { 
        id: 7, 
        type: 'dinner', 
        time: '20:00',
        name: 'Vegetable Stir Fry with Tofu', 
        calories: 520,
        protein: 25,
        carbs: 38,
        fat: 28,
        items: ['Tofu', 'Broccoli', 'Bell peppers', 'Carrots', 'Brown rice', 'Soy sauce', 'Ginger']
      }
    ],
    '2025-03-17': [
      { 
        id: 8, 
        type: 'breakfast', 
        time: '08:45',
        name: 'Oatmeal with Fruits and Nuts', 
        calories: 420,
        protein: 15,
        carbs: 52,
        fat: 18,
        items: ['Rolled oats', 'Banana', 'Almonds', 'Walnuts', 'Chia seeds', 'Honey']
      }
    ]
  };
  
  const formatDate = (date:Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const getMealsForSelectedDate = () => {
    const formattedDate = formatDate(currentDate);
    return mealData[formattedDate as keyof typeof mealData] || [];
  };
  
  const calculateTotalCalories = (date: string) => {
    const formattedDate = typeof date === 'string' ? date : formatDate(date);
    const meals = mealData[formattedDate as keyof typeof mealData] || [];
    return meals.reduce((total:number, meal) => total + meal.calories, 0);
  };
  
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (dayType | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const formattedDate = formatDate(date);
      const meals = mealData[formattedDate as keyof typeof mealData] || [];
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
  
  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const selectDate = (day: dayType) => {
    if (day) {
      const newDate = new Date(day.date);
      setCurrentDate(newDate);
    }
  };
  
  const renderMealCard = (meal:Meal) => {
    return (
      <div key={meal.id} className="bg-white rounded-lg p-4 mb-4 shadow border-l-4 border-indigo-500">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg capitalize">{meal.name}</h3>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span className="text-sm text-gray-600">{meal.time}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2 capitalize">{meal.type}</div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-gray-100 p-2 rounded text-center">
            <div className="text-xs text-gray-500">Calories</div>
            <div className="font-semibold">{meal.calories}</div>
          </div>
          <div className="bg-gray-100 p-2 rounded text-center">
            <div className="text-xs text-gray-500">Protein</div>
            <div className="font-semibold">{meal.protein}g</div>
          </div>
          <div className="bg-gray-100 p-2 rounded text-center">
            <div className="text-xs text-gray-500">Carbs</div>
            <div className="font-semibold">{meal.carbs}g</div>
          </div>
        </div>
        
        <div className="text-xs text-gray-600">
          <div className="font-medium mb-1">Ingredients:</div>
          {/* <div>{meal.items.join(', ')}</div> */}
        </div>
      </div>
    );
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
  
  const renderCalendarView = () => {
    const days = generateCalendarDays();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    return (
      <div className="bg-white rounded-lg shadow p-4">
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
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Repas Suivi</h1>
            <div className="flex items-center space-x-2">
              <span>{userData.name}</span>
              <User size={20} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="grid grid-cols-3">
                <button 
                  className={`py-3 flex flex-col items-center justify-center ${currentView === 'calendar' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                  onClick={() => setCurrentView('calendar')}
                >
                  <Calendar size={20} />
                  <span className="text-sm mt-1">Calendar</span>
                </button>
                <button 
                  className={`py-3 flex flex-col items-center justify-center ${currentView === 'stats' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                  onClick={() => setCurrentView('stats')}
                >
                  <BarChart3 size={20} />
                  <span className="text-sm mt-1">Stats</span>
                </button>
                <button 
                  className={`py-3 flex flex-col items-center justify-center ${currentView === 'achievements' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                  onClick={() => setCurrentView('achievements')}
                >
                  <Award size={20} />
                  <span className="text-sm mt-1">Achievements</span>
                </button>
              </div>
            </div>
            
            {renderCalendarView()}
            
            <div className="bg-white rounded-lg shadow mt-6 p-4">
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
                    style={{ width: `${calculateDayProgress().percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Today: {calculateDayProgress().total} cal</span>
                  <span>Remaining: {calculateDayProgress().remaining} cal</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Meals for {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg flex items-center text-sm">
                  <Plus size={16} className="mr-1" />
                  Add Meal
                </button>
              </div>
              
              <div className="mb-4">
                {calculateDayProgress().total > 0 ? (
                  <div className="bg-indigo-50 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-medium">Daily Progress</div>
                      <div className="text-sm text-gray-600">
                        {calculateDayProgress().total} / {userData.dailyCalorieGoal} calories ({calculateDayProgress().percent}%)
                      </div>
                    </div>
                    <div className="w-24 h-24 relative">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E0E0E0"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="3"
                          strokeDasharray={`${calculateDayProgress().percent}, 100`}
                        />
                        <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#4F46E5" fontWeight="bold">
                          {calculateDayProgress().percent}%
                        </text>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Utensils size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">No meals recorded for this day yet.</p>
                    <button className="mt-2 text-indigo-600 text-sm font-medium">+ Add your first meal</button>
                  </div>
                )}
              </div>
              
              <div>
                {getMealsForSelectedDate().length > 0 ? (
                  getMealsForSelectedDate().map(meal => renderMealCard(meal))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Select a date with meals to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RepasFollowupDashboard;