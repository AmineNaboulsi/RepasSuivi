import { useState } from "react";
import { AlertCircle, CalendarIcon, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {motion } from 'framer-motion'
import Cookies from 'js-cookie';

export default function NutritionPanelGoals() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isloading, loading] = useState(false);
  const [nutritionGoal, setNutritionGoal] = useState({});
  const [nutritionGoalStatus, setnutritionGoalStatus] = useState({
    status: true,
    message: "vdsvdsvdsvsd",
  });

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  
  const handleFormSubmit = async (data) => {
    console.log("Submitting nutrition goals to backend:", data);
    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    try{
      loading(true);
      const token = Cookies.get('auth-token');
      const res = await fetch(`${url}/api/nutritiongoeals`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const dt = await res.json();
      console.log("Response from backend:", dt);
      if(res.status !== 201){
        setnutritionGoalStatus({
          status: false,
          message: dt.error,
        });
        loading(false);
        return ;
      }
      handleCloseForm();
      setnutritionGoalStatus({
        status: true,
        message: "",
      });
    }catch(err){
      setnutritionGoalStatus({
        status: false,
        message: "Error submitting nutrition goals:", err,
      });
      loading(false);
    }
  };
    
    return (
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-4/5 overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 h-64 md:h-full order-1 md:order-2 relative overflow-hidden">
                <img 
                  src="./images/nutrionsimg.jpg" 
                  alt="Nutrition" 
                  className="w-full h-full object-cover" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Fuel Your Body Right</h2>
                  <p className="text-lg">Setting proper nutrition goals is the foundation of a healthy lifestyle.</p>
                </div>
                
                <button 
                  className="absolute top-4 right-4 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition-colors"
                  onClick={handleCloseForm}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="w-full md:w-1/2 order-2 md:order-1 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Set Your Nutrition Goals</h2>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  
                  const formData = {
                    dailyCalorieTarget: Number(e.target.dailyCalorieTarget.value),
                    proteinTarget: Number(e.target.proteinTarget.value),
                    carbTarget: Number(e.target.carbTarget.value),
                    fatTarget: Number(e.target.fatTarget.value),
                    startDate: e.target.startDate.value,
                    endDate: e.target.endDate.value,
                  };
                  
                  handleFormSubmit(formData);
                }}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dailyCalorieTarget">
                        Daily Calorie Target
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="dailyCalorieTarget"
                          name="dailyCalorieTarget"
                          defaultValue={nutritionGoal?.dailyCalorieTarget || 2000}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                        <div className="absolute right-3 top-3 text-gray-500">kcal</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="proteinTarget">
                          Protein
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="proteinTarget"
                            name="proteinTarget"
                            defaultValue={nutritionGoal?.proteinTarget || 150}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                          />
                          <div className="absolute right-3 top-3 text-gray-500">g</div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="carbTarget">
                          Carbs
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="carbTarget"
                            name="carbTarget"
                            defaultValue={nutritionGoal?.carbTarget || 200}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                          />
                          <div className="absolute right-3 top-3 text-gray-500">g</div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fatTarget">
                          Fat
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="fatTarget"
                            name="fatTarget"
                            defaultValue={nutritionGoal?.fatTarget || 70}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                          />
                          <div className="absolute right-3 top-3 text-gray-500">g</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">
                          Start Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            defaultValue={nutritionGoal?.startDate || new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <CalendarIcon className="absolute right-3 top-3 text-gray-500" size={20} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endDate">
                          End Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            defaultValue={nutritionGoal?.endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <CalendarIcon className="absolute right-3 top-3 text-gray-500" size={20} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Nutrition Breakdown</h3>
                      <p className="text-sm text-gray-700">Your macronutrient targets (protein, carbs, fat) should add up to your daily calorie goal. Protein and carbs provide 4 calories per gram, while fat provides 9 calories per gram.</p>
                    </div>
                  </div>
                  {!nutritionGoalStatus.status && 
                  (
                    <div className="mt-4 flex items-center p-4 bg-red-100 text-red-700 rounded-lg" role="alert">
                      <AlertCircle size={20} className="mr-2" />
                      <span>{nutritionGoalStatus.message}</span>
                    </div>
                  )}
                  <div className="mt-8 flex gap-4">
                    <button 
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex-1"
                      disabled={isloading}
                    >
                      {isloading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"></svg>
                          Saving...
                        </div>
                      ) : (
                        "Save Goals"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }