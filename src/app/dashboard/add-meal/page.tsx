"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Plus, X, BarChart3, Clock } from 'lucide-react';
import CalendarView from '../../../components/CalendarView';
import Cookies from 'js-cookie';
import { DayType , FoodItem , Meal , MealDataCalender } from '../../../types';

const AddMealPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mealData, setMealData] = useState<MealDataCalender>({});
  const [mealName, setMealName] = useState('');
  
  const userData = {
    name: "Sophie Martin",
    dailyCalorieGoal: 2100,
    weightGoal: 68,
    currentWeight: 72.3,
    weightHistory: [
      { date: '2025-03-10', weight: 73.1 },
      { date: '2025-03-16', weight: 72.3 }
    ],
    achievements: []
  };
  
  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
        const token = Cookies.get('auth-token');

        const res = await fetch(`${url}/api/meals`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        setMealData(data);
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    };
    
    fetchMealData();
  }, []);
  
  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0];
  };
  
  const calculateTotalCalories = (date: Date | string): number => {
    const formattedDate = typeof date === 'string' ? date : formatDate(date);
    const meals = mealData[formattedDate] || [];
    return meals?.reduce((total: number, meal: Meal) => total + meal.calories, 0);
  };
  
  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const selectDate = (day: DayType): void => {
    if (day) {
      const newDate = new Date(day.date);
      setCurrentDate(newDate);
    }
  };
  
  const handleSearchFood = useCallback(async () => {
    if (searchTerm.length < 2) return;
    
    setIsLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      const token = Cookies.get('auth-token');
      const res = await fetch(`${url}/api/foods/${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Error searching for food:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.length >= 2) {
        handleSearchFood();
      } else {
        setSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, handleSearchFood]);
  
  const addFoodToMeal = (food: FoodItem): void => {
    setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }]);
    setSearchTerm('');
    setSearchResults([]);
  };
  
  const removeFoodFromMeal = (foodId: number): void => {
    setSelectedFoods(selectedFoods.filter(food => food.id !== foodId));
  };
  
  const updateFoodQuantity = (foodId: number, quantity: number): void => {
    setSelectedFoods(selectedFoods.map(food => 
      food.id === foodId ? { ...food, quantity: Math.max(1, quantity) } : food
    ));
  };
  
  const calculateMealTotals = () => {
    return selectedFoods.reduce((totals, food:FoodItem) => {
      const quantity = food.quantity || 1;
      return {
        calories: totals.calories + (food.calories * quantity),
        proteins: totals.proteins + (food.proteins * quantity),
        carbs: totals.carbs + (food.glucides * quantity),
        fats: totals.fats + (food.lipides * quantity)
      };
    }, { calories: 0, proteins: 0, carbs: 0, fats: 0 });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFoods.length === 0) {
      alert("Please add at least one food item to your meal");
      return;
    }
    
    try {
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      const mealData = {
        meal: {
          name: mealName || `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} for ${formatDate(currentDate)}`,
          meal_type: mealType,
        },
        meal_items: selectedFoods.map(food => ({
          id: food.id,
          quantity: food.quantity
        }))
      };
      
      const res = await fetch(`${url}/api/meals/addmeal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
        body: JSON.stringify(mealData)
      });
      const data = await res.json();
      if (res.status === 201) {
        window.location.href = '/dashboard';
        return;
      } else if (res.status === 422) {
        alert(data.message);
        return;
      }
      alert("Failed to save meal. Please try again.");
    } catch (error) {
      console.error("Error saving meal:", error);
      alert("An error occurred while saving the meal.");
    }
  };
  
  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: <Clock size={18} /> },
    { id: 'lunch', name: 'Lunch', icon: <Clock size={18} /> },
    { id: 'dinner', name: 'Dinner', icon: <Clock size={18} /> },
    { id: 'snack', name: 'Snack', icon: <Clock size={18} /> }
  ];
  
  const mealTotals = calculateMealTotals();
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">RepasSuivi</h1>
            <div className="flex items-center space-x-4">
              <a 
                href="/dashboard" 
                className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Meal</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="text-lg font-semibold text-indigo-600">
                    {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Select a different date on the calendar</p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meal Name (Optional)</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="E.g., Evening Pasta, Morning Breakfast"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                  <div className="grid grid-cols-4 gap-2">
                    {mealTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        className={`flex items-center justify-center px-4 py-2 rounded-md ${
                          mealType === type.id 
                            ? 'bg-indigo-100 text-indigo-700 border-indigo-300 border' 
                            : 'bg-gray-100 text-gray-700 border-gray-200 border hover:bg-gray-200'
                        }`}
                        onClick={() => setMealType(type.id)}
                      >
                        {type.icon}
                        <span className="ml-2">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Food Items</label>
                  <div className="relative">
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Search for food items..."
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
                          onFocus={() => {
                            if (searchTerm.length >= 2) {
                              handleSearchFood();
                            }
                          }}
                        />
                        {isLoading && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {searchResults && searchResults.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {searchResults.map(food => (
                          <div 
                            key={food.id} 
                            className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                            onClick={() => addFoodToMeal(food)}
                          >
                            <div>
                              <div className="font-medium">{food.name}</div>
                              <div className="text-sm text-gray-500">
                                {food.calories} cal | {food.proteins}g protein | {food.glucides}g carbs | {food.lipides}g fat
                              </div>
                            </div>
                            <button 
                              type="button"
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              <Plus size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedFoods.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Selected Foods</h3>
                    <div className="bg-gray-50 rounded-md p-4">
                      {selectedFoods.map((food:FoodItem) => (
                        <div key={food.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div className="flex-1">
                            <div className="font-medium">{food.name}</div>
                            <div className="text-sm text-gray-500">
                              {(food.calories * (food.quantity || 1)).toFixed(1)} cal | {(food.proteins * (food.quantity || 1)).toFixed(1)}g protein
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border rounded-md">
                              <button
                                type="button"
                                className="px-2 py-1 text-gray-700 hover:bg-gray-200"
                                onClick={() => updateFoodQuantity(food.id, (food.quantity || 1) - 1)}
                              >
                                -
                              </button>
                              <span className="px-3">{food.quantity}</span>
                              <button
                                type="button"
                                className="px-2 py-1 text-gray-700 hover:bg-gray-200"
                                onClick={() => updateFoodQuantity(food.id, (food.quantity || 1) + 1)}
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFoodFromMeal(food.id)}
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-4 pt-3 border-t flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold">Meal Totals</div>
                          <div className="text-sm text-gray-600">
                            {mealTotals.calories.toFixed(1)} calories | {mealTotals.proteins.toFixed(1)}g protein | {mealTotals.carbs.toFixed(1)}g carbs | {mealTotals.fats.toFixed(1)}g fat
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <BarChart3 size={18} className="text-indigo-500 mr-1" />
                            <span className="text-sm font-medium">
                              {((mealTotals.calories / userData.dailyCalorieGoal) * 100).toFixed(1)}% of daily goal
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <a 
                    href="/dashboard" 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    disabled={selectedFoods.length === 0}
                  >
                    Save Meal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMealPage;