"use client";

import React from 'react';
import { Clock } from 'lucide-react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow border-l-4 border-indigo-500">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg capitalize">{meal.name ? `${meal.type}-${meal.name}` :  meal.type}</h3>
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
        <div>{meal.items.join(', ')}</div>
      </div>
    </div>
  );
};

export default MealCard;