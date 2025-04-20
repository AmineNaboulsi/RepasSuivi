"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, BarChart3, Award } from 'lucide-react';
import CalendarView from '@/components/CalendarView';
import SummaryCard from '@/components/SummaryCard';
import MacronutrientsCard from '@/components/MacronutrientsCard';
import CaloriesTrendCard from '@/components/CaloriesTrendCard';
import ActivityCard from '@/components/ActivityCard';
import Cookies from 'js-cookie'
import AddWeight from '@/components/AddWeight'
import MealPanel from '@/components/MealPanel';
import { BlurFade } from "@/components/magicui/blur-fade";
import { ExericiseDataType , ExerciseData , DayType, UserData, NutritionData ,MealDataCalender} from '@/types/index';


type ExerciseWeek = {
  "day": string,
  "minutes": number,
  "calories": number
}
const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoadingCalender, setLoadingCalender] = useState<boolean>(true);
  const [mealData, setmealData] = useState<MealDataCalender>({});
  const [currentView, setCurrentView] = useState('overview');
  const [waterIntake, setWaterIntake] = useState(5);
  const [nutritionData , setnutritionData] = useState<NutritionData[]>([]);
  const [activityData , setactivityData] = useState<ExerciseWeek[]>([]);
  const [activityDataMounth , setactivityDataMounth] = useState<ExericiseDataType[]>([]);
  const [currentMacros, setcurrentMacros] = useState([
    { name: 'Protein', color: '#8884d8', goal: 120 },
    { name: 'Carbs', color: '#82ca9d', goal: 130 },
    { name: 'Fat', color: '#ffc658', goal: 50 },
  ]);
  // const [ResetCalenderAction, setResetCalenderAction] = useState<boolean>(false);
  const [userData, setuserData] = useState<UserData>({
      name: "UserGuest65249",
      dailyCalorieGoal: 2100,
      weightHistory: [],
  });
  const waterGoal = 8;

  const fetMeals = async (date:Date)=>{

    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const FDate = date.toISOString().split("T")[0]; 
    setLoadingCalender(true)
    try{
      const res = await fetch(`${url}/api/meals?date=${FDate}`,{
        method: "GET" ,
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const data = await res.json();
      setmealData(data);

    }catch{
      setLoadingCalender(false)
    }
  };

  const fetMealsTrends = async (date:Date)=>{

    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const FDate = date.toISOString().split("T")[0]; 
    setLoadingCalender(true)
    try{
      const res = await fetch(`${url}/api/getcaloroystrend?date=${FDate}`,{
        method: "GET" ,
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const data = await res.json();
      setnutritionData(data);

    }catch{
      setLoadingCalender(false)
    }
  };

  const fetWeightRecords = async ( date:Date) => {
    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const FDate = date.toISOString().split("T")[0]; 
    try{
      const ressponse = await fetch(`${url}/api/weight-records?date=${FDate}`,{
        method: "GET" ,
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const weightHistorys = await ressponse.json();
      setuserData((prev)=>({
          ...prev ,
          weightHistory : weightHistorys
        }
      ))
      setLoadingCalender(false)

    }catch{
      setLoadingCalender(false)
    }

  };

  const fetExercisesTrends = async(date , forweek:boolean) => {
    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const FDate = date.toISOString().split("T")[0]; 
    try{
      const ressponse = await fetch(`${url}/api/exercises?${forweek ? 'f=week&':''}date=${FDate}`,{
        method: "GET" ,
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const Exercises = await ressponse.json();
      forweek ? setactivityData(Exercises) : setactivityDataMounth(Exercises);
    }catch{
      //
    }
  }

  const fetchCalenderData = React.useCallback(async (date:Date)=>{
    setLoadingCalender(true)

    await fetMeals(date)
    await fetWeightRecords(date)
    await fetMealsTrends(date)
    await fetExercisesTrends(date , true)
    await fetExercisesTrends(date , false)

    setLoadingCalender(false)
  }, [/*fetMeals, fetWeightRecords*/])

  useEffect(()=>{
    fetchCalenderData(new Date())
  },[fetchCalenderData])
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const getMealsForSelectedDate = () => {
    const formattedDate = formatDate(currentDate);
    return mealData[formattedDate] || [];
  };
  const getExerciseForSelectedDate = () => {
    const formattedDate = formatDate(currentDate);
    return activityDataMounth[formattedDate] || [];
  };
  
  const calculateTotalCalories = (date: string) => {
    const formattedDate = typeof date === 'string' ? date : formatDate(date as Date);
    const meals = mealData[formattedDate] || [];
    return meals.reduce((total: number, meal) => total + meal.calories, 0);
  };

  useEffect(() => {
    const fetchNutritionGoals = async () => {
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
      try {
        const token = Cookies.get('auth-token');
        const res = await fetch(`${url}/api/nutritiongoeals?date=${formatDate(new Date())}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("Fetched nutrition goals:", data);
        setcurrentMacros(()=>{
          return [
            { name: 'Protein' , color: '#8884d8', goal: data.proteinTarget },
            { name: 'Carbs', color: '#82ca9d', goal: data.carbTarget },
            { name: 'Fat', color: '#ffc658', goal: data.fatTarget },
          ]
        })
      } catch (err) {
        console.error("Error fetching nutrition goals:", err);
      }
    };
    fetchNutritionGoals();
  },[])
  const navigateMonth = (direction: number) => {
    UpdateCalenderData(direction);
  };

  const UpdateCalenderData = (direction:number)=>{
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    fetchCalenderData(newDate)
  }

  const selectDate = (day: DayType) => {
    if (day) {
      const newDate = new Date(day.date);
      setCurrentDate(newDate);
      ChangeDateAction(newDate);
    }
  };
  const ChangeDateAction = (newDate: Date) => {
    console.log("Date Changed:", newDate);

  };
  const UpdatealenderAfterSubmit = () =>{
    UpdateCalenderData(0)
  }
  const calculateDayProgressCalories = () => {
    const todayMeals = getMealsForSelectedDate();
    const totalCalories = todayMeals.reduce((sum: number, meal) => sum + meal.calories, 0);
    const percentOfGoal = Math.min(Math.round((totalCalories / userData.dailyCalorieGoal) * 100), 100);
    return {
      total: totalCalories,
      percent: percentOfGoal,
      remaining: userData.dailyCalorieGoal - totalCalories
    };
  };
  const calculateDayProgressExercices = () => {
    const todayMeals = getExerciseForSelectedDate();
    const totalMuniteExercices = todayMeals.reduce((sum: number, exercise:ExerciseData) => sum + exercise.minutes, 0);
    return totalMuniteExercices;
  };
  const calculateDayMacro = () => {
    const meals = mealData[formatDate(currentDate)] || [];
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    
    meals.forEach((meal) => {
      totalProtein += meal.protein || 0;
      totalCarbs += meal.carbs || 0;
      totalFat += meal.fat || 0;
    });
    
    return {
      Protein: totalProtein,
      Carbs: totalCarbs,
      Fat: totalFat
    };
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
                  className={`py-3 px-6 flex items-center justify-center ${currentView === 'meals' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                  onClick={() => setCurrentView('meals')}
                >
                  <BarChart3 size={20} className="mr-2" />
                  <span>Meals</span>
                </button>
                <button 
                  className={`py-3 px-6 flex items-center justify-center ${currentView === 'weightTracking' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                  onClick={() => setCurrentView('weightTracking')}
                >
                  <Award size={20} className="mr-2" />
                  <span>Log Weight</span>
                </button>
              </div>  
            </div>
              {
                currentView === 'overview' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <BlurFade delay={0.05} inView>
                          <SummaryCard
                            caloriesConsumed={calculateDayProgressCalories().total}
                            caloriesGoal={userData.dailyCalorieGoal}
                            exerciseMinutes={calculateDayProgressExercices()}
                            exerciseGoal={60}
                            waterIntake={waterIntake}
                            waterGoal={waterGoal}
                            setWaterIntake={setWaterIntake}
                          />
                      </BlurFade>

                      <BlurFade delay={0.15} inView>
                        <MacronutrientsCard alldaysMelas={calculateDayMacro()} macros={currentMacros} />
                      </BlurFade>

                      <BlurFade delay={0.25} inView>
                        <CaloriesTrendCard data={nutritionData} />
                      </BlurFade>

                      <BlurFade delay={0.35} inView>
                          <ActivityCard data={activityData} />
                      </BlurFade>

                  </div>
                ) : 
                currentView === 'meals' ? (
                  <MealPanel
                  currentDate={currentDate}
                  getMealsForSelectedDate={getMealsForSelectedDate} 
                  UpdatealenderAfterSubmit={UpdatealenderAfterSubmit}
                  />
              
                ) : (
                  <AddWeight 
                    datePicked={currentDate}
                    changeDate={ChangeDateAction}
                    />
                )
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;