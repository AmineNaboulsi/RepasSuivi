'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import Cookies from 'js-cookie';
import { FoodItem, MealDataCalender } from '../types';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface TypePanelMeal {
  currentDate: Date;
  setShowForm: (value: boolean) => void;
  UpdatealenderAfterSubmit: () => void;
}

const fetchFoodSearch = async (searchTerm: string): Promise<FoodItem[]> => {
  const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
  const token = Cookies.get('auth-token');
  const res = await fetch(`${url}/api/foods/${encodeURIComponent(searchTerm)}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();
  return data.data || [];
};

const PanelAddMeal = ({ currentDate, setShowForm, UpdatealenderAfterSubmit }: TypePanelMeal) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [mealName, setMealName] = useState('');
  const [isLoadingDataSubmit, setIsLoadingDataSubmit] = useState(false);

  const { data: searchResults = [], isLoading, refetch } = useQuery({
    queryKey: ['searchFoods', searchTerm],
    queryFn: () => fetchFoodSearch(searchTerm),
    enabled: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2) {
        refetch();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, refetch]);

  const addFoodToMeal = (food: FoodItem) => {
    let exists = selectedFoods.some(item => item.id === food.id) 
    !exists && setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }]);
    setSearchTerm('');
  };

  const removeFoodFromMeal = (foodId: number) => {
    setSelectedFoods(selectedFoods.filter(food => food.id !== foodId));
  };

  const updateFoodQuantity = (foodId: number, quantity: number) => {
    setSelectedFoods(selectedFoods.map(food =>
      food.id === foodId ? { ...food, quantity: Math.max(1, quantity) } : food
    ));
  };

  const calculateMealTotals = () => {
    return selectedFoods.reduce((totals, food) => {
      const quantity = food.quantity || 1;
      return {
        calories: totals.calories + (food.calories * quantity),
        proteins: totals.proteins + (food.proteins * quantity),
        carbs: totals.carbs + (food.glucides * quantity),
        fats: totals.fats + (food.lipides * quantity)
      };
    }, { calories: 0, proteins: 0, carbs: 0, fats: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFoods.length === 0) {
      alert("Please add at least one food item to your meal");
      return;
    }

    try {
      setIsLoadingDataSubmit(true);
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      const res = await fetch(`${url}/api/meals/addmeal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
        body: JSON.stringify({
          meal: {
            name: mealName || '',
            meal_type: mealType,
            date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
          },
          meal_items: selectedFoods.map(food => ({
            id: food.id,
            quantity: food.quantity
          }))
        })
      });

      const data = await res.json();
      if (res.status === 201) {
        setShowForm(false);
        UpdatealenderAfterSubmit();
        return;
      } else if (res.status === 422) {
        alert(data.message);
        return;
      }
      alert("Failed to save meal. Please try again.");
    } catch (error) {
      console.error("Error saving meal:", error);
      alert("An error occurred while saving the meal.");
    } finally {
      setIsLoadingDataSubmit(false);
    }
  };

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'snack', name: 'Snack' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
      </div>

      <div>
        <label className="block mb-1 font-medium">Meal Name (optional)</label>
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="e.g. Pasta Dinner"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Meal Type</label>
        <div className="grid grid-cols-4 gap-2">
          {mealTypes.map(type => (
            <button
              type="button"
              key={type.id}
              className={`px-4 py-2 rounded text-sm ${
                mealType === type.id
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
              onClick={() => setMealType(type.id)}
            >
              <Clock size={14} className="inline-block mr-1" />
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Search Food</label>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Type food name..."
        />
        {isLoading && <p className="text-sm text-gray-500 mt-1">Searching...</p>}
        {searchResults.length > 0 && (
          <div className="border mt-2 rounded shadow max-h-60 overflow-y-auto">
            {searchResults.map(food => (
              <div
                key={food.id}
                className="p-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                onClick={() => addFoodToMeal(food)}
              >
                <div className="flex items-center gap-2">
                  <Image src={food.image_url || "/images/placeholder.png"} alt={food.name} width={40} height={40} />
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-gray-500">{food.calories} kcal</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedFoods.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Selected Foods</h4>

          {selectedFoods.map((food:FoodItem) => (
                        <div key={food.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div className="flex-1">
                          
                        <div className="font-medium flex items-center space-x-2">
                            <Image 
                                src={food.image_url || "/images/placeholder.png"} 
                                alt={food.name || "Food image"} 
                                width={50} 
                                height={50} 
                                className="rounded-md mb-1"
                              />
                            <span>{food.name}</span>
                        </div>
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
                            </button>
                            <button type="button" onClick={() => removeFoodFromMeal(food.id)} className="text-red-500">Remove</button>
                          </div>
                        </div>
                      ))}

        </div>
      )}

                <motion.button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 relative overflow-hidden"
                      disabled={selectedFoods.length === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      >
                      {isLoadingDataSubmit ? (
                        <>
                        <span className="opacity-0">Save Meal</span>
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                        </>
                      ) : (
                        "Save Meal"
                      )}
                    </motion.button>
    </form>
  );
};

export default PanelAddMeal;
