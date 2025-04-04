export interface Meal {
    id: number;
    type: string;
    time: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    image_url:string,
    items: string[];
  }
  export interface MealDataCalender {
    [date: string]: Meal[];
  }


  export interface DayType {
    day: number;
    date: string;
    mealCount: number;
    totalCalories: number;
    weight?: number;
    isToday: boolean;
  }
  
  export interface UserData {
    name: string;
    dailyCalorieGoal: number;
    weightGoal: number;
    currentWeight: number;
    weightHistory: {
      date: string;
      weight: number;
    }[];
  }
  
  export interface NutritionData {
    day: string;
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  }
  
  export interface ActivityData {
    day: string;
    minutes: number;
    calories: number;
  }
  
  export interface MacroData {
    name: string;
    value: number;
    color: string;
    goal: number;
  }

  export interface FoodItem {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  glucides: number;
  lipides: number;
  category?: string;
  quantity?: number;
  image_url?: string;
}

export interface MealData {
  id: number;
  name: string;
  calories: number;
  meal_type: string;
  created_at: string;
}

export interface ApiResponse {
  data: FoodItem[];
  message?: string;
}
  