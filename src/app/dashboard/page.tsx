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

  const fetchstatistics = async(date) => {
    const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
    const FDate = date.toISOString().split("T")[0]; 
    try{
      const ressponse = await fetch(`${url}/api/statistics?date=${FDate}`,{
        method: "GET" ,
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${Cookies.get('auth-token')}`
        },
      });
      const Exercises = await ressponse.json();
      Exercises.forEach((Servicedata : {name : string , data : any})=>{
          Servicedata.name == "exercises" ? 
          setactivityDataMounth(Servicedata.data) : 
          Servicedata.name == "exercises-week" ? 
          setactivityData(Servicedata.data) : 
          Servicedata.name == "caloroystrend" ? 
          setnutritionData(Servicedata.data) : 
          Servicedata.name == "nutritiongoeals" ? 
          setcurrentMacros(()=>{
            return [
              { name: 'Protein' , color: '#8884d8', goal: Servicedata.data?.proteinTarget },
              { name: 'Carbs', color: '#82ca9d', goal: Servicedata.data?.carbTarget },
              { name: 'Fat', color: '#ffc658', goal: Servicedata.data?.fatTarget },
            ]
          }) : 
          Servicedata.name == "weight-records" ? 
            setuserData((prev)=>({
              ...prev ,
              weightHistory : Servicedata.data
            }
            )): 
          Servicedata.name == "meals" &&
          setmealData(Servicedata.data);
      })
    }catch{
      //
    }
  }
  const fetchCalenderData = React.useCallback(async (date:Date)=>{
    setLoadingCalender(true)
    await fetchstatistics(date)
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
    return mealData ? mealData[formattedDate] || [] : null;
  };
  const getExerciseForSelectedDate = () => {
    const formattedDate = formatDate(currentDate);
    return activityDataMounth ? (activityDataMounth[formattedDate] || []) : null;
  };  
  
  const calculateTotalCalories = (date: string) => {
    const formattedDate = typeof date === 'string' ? date : formatDate(date as Date);
    const meals = mealData ? mealData[formattedDate] || [] : null;
    return meals ? meals.reduce((total: number, meal) => total + meal.calories, 0) : 0;
  };
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
    if(todayMeals == null) return null;

    const totalCalories = todayMeals.reduce((sum: number, meal) => sum + meal.calories, 0);
    const percentOfGoal = Math.min(Math.round((totalCalories / userData.dailyCalorieGoal) * 100), 100);
    return {
      total: totalCalories,
      percent: percentOfGoal,
      remaining: userData.dailyCalorieGoal - totalCalories
    };
  };
  const calculateDayProgressExercices = () => {
    const todayExercices = getExerciseForSelectedDate();
    if(todayExercices == null) return 0;
    const totalMuniteExercices = todayExercices.reduce((sum: number, exercise:ExerciseData) => sum + exercise.minutes, 0);
    return totalMuniteExercices;
  };
  const calculateDayMacro = () => {
    const meals = mealData ?  mealData[formatDate(currentDate)] || [] : null;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    if(!meals){
      return {
        Protein: 0,
        Carbs: 0,
        Fat: 0
      };
    }
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
                  onClick={() => {
                    mealData != null && setCurrentView('meals')
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
                    userData.weightHistory != null && setCurrentView('weightTracking')
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
            </div>
              {
                currentView === 'overview' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <BlurFade delay={0.05} inView>
                          <SummaryCard
                            caloriesConsumed={calculateDayProgressCalories()?.total}
                            caloriesGoal={userData.dailyCalorieGoal}
                            ExercisesAvalibale={activityData}
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