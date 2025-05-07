"use client";

import React, { useState } from 'react';
import { Clock, Trash2, AlertCircle } from 'lucide-react';
import { Meal } from '../types';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';

interface MealCardProps {
  meal: Meal;
  onDelete: (mealId: number) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDragEnd = (info: PanInfo) => {
    if (info.offset.x < -100) {
      setShowConfirmation(true);
    }
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      const token = Cookies.get('auth-token');

      const response = await fetch(`${url}/api/meals/${meal.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (response.status >= 200 && response.status < 300) {
        if (typeof onDelete === 'function') {
          const mealId = typeof meal.id === 'string' ? parseInt(meal.id, 10) : meal.id;
          onDelete(mealId);
        } else {
          console.error('onDelete is not a function');
        }
        setShowConfirmation(false);
        return;
      }
      throw new Error('Failed to delete meal');
    } catch (error) {
      console.error('Error deleting meal:', error);
      alert('Failed to delete meal. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div 
        className="relative overflow-hidden rounded-lg mb-4"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => handleDragEnd(info)}
      >
        <div className="absolute inset-0 flex items-center justify-end bg-red-500 px-4">
          <Trash2 className="text-white" />
        </div>
        
        <motion.div className="relative bg-white rounded-lg p-4 shadow border-l-4 border-indigo-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg capitalize">{meal.name ? `${meal.type}-${meal.name}` : meal.type}</h3>
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
        </motion.div>
      </motion.div>

      {showConfirmation && (
        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-30 flex items-center justify-center z-50">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
              className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="text-red-500" />
                <h3 className="text-lg font-semibold">Delete Meal</h3>
              </div>
              <p className="mb-6">Are you sure you want to delete this meal? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowConfirmation(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors disabled:bg-red-300"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default MealCard;