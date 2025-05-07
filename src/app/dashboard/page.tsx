"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, BarChart3, Award } from 'lucide-react';
import CalendarView from '@/components/CalendarView';
import SummaryCard from '@/components/SummaryCard';
import MacronutrientsCard from '@/components/MacronutrientsCard';
import CaloriesTrendCard from '@/components/CaloriesTrendCard';
import ActivityCard from '@/components/ActivityCard';
import Cookies from 'js-cookie'
import AddWeight from '@/components/AddWeight'
import MealPanel from '@/components/MealPanel';
import { toast } from "sonner"

import { 
  ExericiseDataType , 
  DayType, 
  UserData, 
  NutritionData ,
  MealDataCalender , 
  ExerciseWeek,
  Macro,
  ExerciseData
} from '@/types/index';

import confetti from 'canvas-confetti';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoadingCalender, setLoadingCalender] = useState(true);
  const [mealData, setMealData] = useState<MealDataCalender>({});
  const [currentView, setCurrentView] = useState('overview');
  const [nutritionData, setNutritionData] = useState<NutritionData[] | null>([]);
  const [activityData, setActivityData] = useState<ExerciseWeek[] | null>([]);
  const [activityDataMonth, setActivityDataMonth] = useState<ExericiseDataType | null>({});
  const [waterIntake, setWaterIntake] = useState(5);
  const [LodingStatistics, setLodingStatistics] = useState(true);
  const [LodingNewWeekExercices, setLodingNewWeekExercices] = useState(false);
  const [LodingNewCaloroysTrend, setLodingNewCaloroysTrend] = useState(false);
  const [currentMacros, setCurrentMacros] = useState<Macro[]>([
    { name: 'Protein', color: '#8884d8', goal: 120 },
    { name: 'Carbs', color: '#82ca9d', goal: 130 },
    { name: 'Fat', color: '#ffc658', goal: 50 },
  ]);
  const [userData, setUserData] = useState<UserData>({
    name: 'UserGuest65249',
    dailyCalorieGoal: 2100,
    weightHistory: [],
  });
  
  const triggerLeftParticles = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { x: 0.1, y: 0.5 }, 
      angle: 60,
      colors: ['#22c55e', '#3b82f6', '#f59e0b']
    });
  };

  const triggerRightParticles = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { x: 0.9, y: 0.5 },
      angle: 120,
      colors: ['#ec4899', '#8b5cf6', '#06b6d4']
    });
  };


  useEffect(() => {
    const celebrateGoalCompletion = () => {
      triggerLeftParticles();
      triggerRightParticles();
      
      setTimeout(() => {
        triggerLeftParticles();
        triggerRightParticles();
      }, 700);

      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.5, y: 0.7 },
          colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6']
        });
      }, 1400);
    };
    
    const url = process.env.NEXT_PUBLIC_URLNotiFICATION_SERVER;
    const ws = new WebSocket(`${url}`);
    
    ws.onopen = () => {
      console.log('Connected to notification server');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      celebrateGoalCompletion();
      if (data?.message) {
        toast.custom(() => (
          <div className="flex items-center px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
            <div className="mr-3 bg-white rounded-full p-2">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-white font-medium">{data?.message}</div>
          </div>
        ));
      } else {
        toast(data?.message);
      }
    };
    
    
    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('Disconnected from notification server');
    };
    
    return () => {
      ws.close();
    };
  }, []);

  const fetchStatistics = async (date: Date) => {
    setLodingStatistics(true);
    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const formattedDate = date.toISOString().split('T')[0];
    try {
      const response = await fetch(`${url}/api/statistics?date=${formattedDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`,
        },
      });
      const services = await response.json();
      services.forEach((service: {
        name: string;
        data:
          | ExericiseDataType
          | ExerciseWeek[]
          | NutritionData[]
          | MealDataCalender
          | Record<string, ExericiseDataType>
          | unknown;
      }) => {
          switch (service.name) {
            case 'exercises':
              if (typeof service.data === 'object' && !Array.isArray(service.data)) {
                setActivityDataMonth(service.data as ExericiseDataType);
              }else setActivityDataMonth(null);
              
              break;
            case 'exercises-week':
              if (Array.isArray(service.data)) {
                setActivityData(service.data as ExerciseWeek[]);
              }else setActivityData(null);
              console.log("Activity data exercises-week : ", service.data);
              break;
            case 'caloroystrend':
              if (Array.isArray(service.data)) {
                setNutritionData(service.data as NutritionData[] | null);
              }else setNutritionData(null);
              break;
            case 'nutritiongoeals':
              const nutritionGoals = service.data as {
                dailyCalorieTarget: number;
                proteinTarget: number;
                carbTarget: number;
                fatTarget: number;
              };
              setUserData(prev => (
                { ...prev, dailyCalorieGoal: nutritionGoals.dailyCalorieTarget, } 
              ));
              if (nutritionGoals?.proteinTarget !== undefined) {
                setCurrentMacros([
                  { name: 'Protein', color: '#8884d8', goal: nutritionGoals.proteinTarget },
                  { name: 'Carbs', color: '#82ca9d', goal: nutritionGoals.carbTarget },
                  { name: 'Fat', color: '#ffc658', goal: nutritionGoals.fatTarget },
                ]);
              }
              break;
            case 'weight-records':
              if (Array.isArray(service.data)) {
                setUserData(prev => (
                  { ...prev, weightHistory: service.data as { date: string; weight: number; }[] } 
                ));
              }
              else {
                setUserData(prev => (
                  { ...prev, weightHistory: null } 
                ));
              }
              break;
            case 'meals':
              setMealData(service.data as MealDataCalender);
              break;  
            default:
              break;
          }
      });
      setLodingStatistics(false);
    } catch (error) {
      setLodingStatistics(false);
      console.error('Failed to fetch statistics:', error);
    }
  };

  const ChangeDateAction = (newDate: Date) => {
    console.log("Date Changed:", newDate);
  };
  
  const fetchCalendarData = useCallback(async (date: Date) => {
    setLoadingCalender(true);
    await fetchStatistics(date);
    setLoadingCalender(false);
  }, []);

  useEffect(() => {
    fetchCalendarData(new Date());
  }, [fetchCalendarData]);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const getMealsForSelectedDate = () => mealData?.[formatDate(currentDate)] ?? [];

  const getExerciseForSelectedDate = () => activityDataMonth?.[formatDate(currentDate)] ?? [];

  const calculateTotalCalories = (date: string | Date) => {
    const formattedDate = typeof date === 'string' ? date : formatDate(date);
    const meals = mealData?.[formattedDate] ?? [];
    return meals.reduce((total: number, meal) => total + (meal?.calories ?? 0), 0);
  };
  

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    fetchCalendarData(newDate);
  };

  const selectDate = (day: DayType) => {
    if (day) {
      const newDate = new Date(day.date);
      setCurrentDate(newDate);
      FetchNewExerceisWekk(newDate);
      FetchNewCaloroysTrend(newDate);
    }
  };

  const FetchNewExerceisWekk = async ( date:Date) => {
    setLodingNewWeekExercices(true);
    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const FDate = date.toISOString().split("T")[0]; 
    try{
      const response = await fetch(`${url}/api/exercises?f=week&date=${FDate}`,{
        method: "GET" ,
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const data = await response.json();
      console.log({
        exercise :  data
      })
      setActivityData(data);
      setLodingNewWeekExercices(false)
    }catch{
      setLodingNewWeekExercices(false)
    }

  };

  const FetchNewCaloroysTrend = async ( date:Date) => {
    setLodingNewCaloroysTrend(true);
    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const FDate = date.toISOString().split("T")[0]; 
    try{
      const response = await fetch(`${url}/api/getcaloroystrend?date=${FDate}`,{
        method: "GET" ,
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const data = await response.json();
      console.log({
        exercise :  data
      })
      setNutritionData(data);
      setLodingNewCaloroysTrend(false)
    }catch{
      setLodingNewWeekExercices(false)
    }

  };

  const updateCalendarAfterSubmit = () => {
    fetchCalendarData(currentDate);
  };

  const calculateDayProgressCalories = () => {
    const meals = getMealsForSelectedDate();
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const percent = Math.min(Math.round((totalCalories / userData.dailyCalorieGoal) * 100), 100);
    return {
      total: totalCalories,
      percent,
      remaining: userData.dailyCalorieGoal - totalCalories,
    };
  };

  const calculateDayProgressExercises = () => {
    const exercises = getExerciseForSelectedDate();
    return Array.isArray(exercises) ? exercises.reduce((sum: number, ex: ExerciseData) => sum + (Number(ex?.minutes) || 0), 0) : 0;
  };

  const calculateDayMacro = () => {
    const meals = mealData ? mealData[formatDate(currentDate)] || [] : null;
    if(!meals) return currentMacros;
    return meals ? meals?.reduce(
      (totals, meal) => {
        totals.Protein += meal.protein || 0;
        totals.Carbs += meal.carbs || 0;
        totals.Fat += meal.fat || 0;
        return totals;
      },
      { Protein: 0, Carbs: 0, Fat: 0 }
    ) : { Protein: 0, Carbs: 0, Fat: 0 };
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
        <div className="container mx-auto px-4">
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
                isLoading={isLoadingCalender}
              />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
            <div className={`bg-white rounded-lg shadow mb-6 ${ LodingStatistics && 'animate-pulse'}`}>
                {!LodingStatistics &&
                (
                  <div className="flex justify-center">
                    <button 
                      className={`py-3 px-6 flex items-center justify-center ${currentView === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                      onClick={() => setCurrentView('overview')}
                    >
                      <Calendar size={20} className="mr-2" />
                      
                      <span>Overview</span>
                    </button>
                    <button 
                      className={`py-3 px-6 flex items-center justify-center ${currentView === 'meals' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                      onClick={() => {
                        if(mealData != null) setCurrentView('meals')
                      }}
                    >
                      <BarChart3 size={20} className={`mr-2 ${ mealData == null && 'text-red-800' }`} />
                      {mealData == null ? (
                        <span className="text-red-800 cursor-no-drop relative group">
                          <span>Meals</span>
                          <span className="absolute invisible group-hover:visible bg-red-700 text-white text-xs py-1 px-2 rounded top-9 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          Meals data is not available
                          </span>
                        </span>
                      ) : (
                        <span>Meals</span>
                      )}
                    </button>
                    <button 
                      className={`py-3 px-6 flex items-center justify-center ${currentView === 'weightTracking' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                      onClick={() => {
                        if (userData.weightHistory != null) {
                          setCurrentView('weightTracking');
                        }
                      }}
                    >
                      <Award size={20} className={`mr-2 ${ userData.weightHistory == null && 'text-red-800' }`} />
                      {userData.weightHistory == null ? (
                        <span className="text-red-800 cursor-no-drop relative group">
                          <span>Log Weight</span>
                          <span className="absolute invisible group-hover:visible bg-red-700 text-white text-xs py-1 px-2 rounded top-9 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          Weight data is not available
                          </span>
                        </span>
                      ) : (
                        <span>Log Weight</span>
                      )}
                    </button>
                  </div>  
                )
                }
            </div>
              {
                currentView === 'overview' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-screen">
                          <SummaryCard
                            caloriesConsumed={calculateDayProgressCalories()?.total}
                            caloriesGoal={userData.dailyCalorieGoal}
                            ExercisesAvalibale={activityData}
                            exerciseMinutes={calculateDayProgressExercises()}
                            exerciseGoal={60}
                            waterIntake={waterIntake}
                            waterGoal={8}
                            setWaterIntake={setWaterIntake}
                            LodingStatistics={LodingStatistics}
                          />

                        <MacronutrientsCard 
                            LodingStatistics={LodingStatistics}
                            alldaysMelas={calculateDayMacro() as {
                              Protein: number,
                              Carbs: number,
                              Fat: number
                          }} 
                            macros={currentMacros} />

                        <CaloriesTrendCard 
                        LodingNewCaloroysTrend={LodingNewCaloroysTrend}
                        LodingStatistics={LodingStatistics} data={nutritionData} />

                        <ActivityCard LodingNewWeekExercices={LodingNewWeekExercices} currentDate={currentDate} LodingStatistics={LodingStatistics} data={activityData} />

                  </div>
                ) : 
                currentView === 'meals' ? (
                  <MealPanel
                  currentDate={currentDate}
                  getMealsForSelectedDate={getMealsForSelectedDate} 
                  UpdatealenderAfterSubmit={updateCalendarAfterSubmit}
                  />
              
                ) : (
                  <>
                    <AddWeight 
                    datePicked={currentDate}
                    changeDate={ChangeDateAction}
                    />
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;