"use client";

import { Plus, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import {  Meal } from '@/types';
import MealCard from './MealCard';
import { motion, AnimatePresence } from 'framer-motion';
import PanelAddMeal from '../components/PanelAddMeal'

type MealDataCalender = {
  currentDate: Date;
  getMealsForSelectedDate: () => Meal[];
  UpdatealenderAfterSubmit : () => void
};

const MealPanel = ({ currentDate, getMealsForSelectedDate ,UpdatealenderAfterSubmit }: MealDataCalender) => {
  const [showForm, setShowForm] = useState(false);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const handleDeleteMeal = (mealId:number) => {
    console.log('Deleting meal with ID:', mealId);
    UpdatealenderAfterSubmit();
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {showForm ? 'Add Meal Form' : `Meals for ${formattedDate}`}
        </h2>
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-indigo-600 text-white px-3 py-2 rounded-lg flex items-center text-sm"
        >
          {showForm ? <ArrowLeft size={16} className="mr-1" /> : <Plus size={16} className="mr-1" />}
          {showForm ? 'Back to Meals' : 'Add Meal'}
        </button>
      </div>

      <div className="relative min-h-[150px]">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="meal-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {getMealsForSelectedDate()?.length > 0 ? (
                getMealsForSelectedDate().map(meal => (
                  <MealCard key={meal.id} meal={meal} onDelete={handleDeleteMeal} />
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Select a date with meals to view details
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="meal-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PanelAddMeal 
                    currentDate={currentDate}
                    setShowForm={setShowForm}
                    UpdatealenderAfterSubmit={UpdatealenderAfterSubmit}
                    />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MealPanel;
