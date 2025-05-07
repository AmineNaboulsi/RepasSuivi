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
  export type MealDataCalender = Record<string, Meal[]>;

  export type ExericiseDataType = Record<string, ExerciseData[]>;
  
  
  export interface ExerciseData {
    exerciseType: string;
    minutes: string;
    calories: string;
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
    weightHistory: {
      date: string;
      weight: number;
    }[] | null;
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
  
  export type Macro = {
    name: string;
    color: string;
    goal: number;
  };

  export interface FoodItem {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  glucides: number;
  lipides: number;
  category?: string;
  quantity?: number;
  unite?: string;
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
  
export interface TypeSubmitionDataGoals {
  setSubmitGolas : (value:boolean) => void
}

export interface  TypeNutritionGoal {
  dailyCalorieTarget: number;
  proteinTarget: number
  carbTarget: number;
  fatTarget: number;
  startDate: string;
  endDate: string;
};

export interface ExerciseWeek {
  "day": string,
  "minutes": number,
  "calories": number
}

export interface ActivityCardProps {
  data: ActivityData[];
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { calories: number; minutes: number } }>;
  label?: string;
}