"use client";

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Macro } from '../types';
import { TriangleAlert } from 'lucide-react';
import { BlurFade } from "@/components/magicui/blur-fade";

interface MacronutrientsCardProps {
  macros: Macro[];
  alldaysMelas : {
      Protein: number,
      Carbs: number,
      Fat: number
  }
  LodingStatistics: boolean;
}

const MacronutrientsCard: React.FC<MacronutrientsCardProps> = ({ alldaysMelas , macros ,LodingStatistics}) => {
  return (
    <>
    {LodingStatistics ? 
      (
        <div className="bg-white p-6 rounded-xl shadow-sm pb-11 animate-pulse flex justify-center items-center">
           <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        </div>
      )
      : 
      (
    <BlurFade delay={0.15} inView>
      <div className="bg-white p-6 rounded-xl shadow-sm ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Macronutrients</h2>
          <div className="p-1.5 bg-indigo-100 rounded-lg">
            <TrendingUp size={18} className="text-indigo-600" />
          </div>
        </div>
        <div className="space-y-4">
          {macros.map((macro) => (
            <div key={macro.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{macro.name}</span>
                <span className="text-gray-500">
                  {macro.name=="Protein" ? alldaysMelas.Protein : macro.name=="Carbs" ? alldaysMelas.Carbs : alldaysMelas.Fat}g / 
                  {macro.goal ?? (
                    macro.name=="Protein" ? 120 : macro.name=="Carbs" ? 130 : 50
                  )}g</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                  className="h-2 rounded-full transition-all duration-1500 ease-in-out" 
                  style={{ 
                    width: `${Math.min(((macro.name=="Protein" ? alldaysMelas.Protein : macro.name=="Carbs" ? alldaysMelas.Carbs : alldaysMelas.Fat) / 
                    (macro.goal ?? macro.name=="Protein" ? 120 : macro.name=="Carbs" ? 130 : 50)) * 100, 100)}%`,
                    backgroundColor: macro.color 
                  }}
                  ></div>
              </div>
            </div>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {!macros && (
                  <TriangleAlert size={20} className="text-red-800" />
                )  }
              {!macros ? (
                <>
                  <p className="font-medium text-red-800">Failed to to you golas statistics, so we replace is with a highet norm data </p>
                </>
              ) :
              (
                <>
                  <p className="font-medium">Current Split</p>
                  <p className="text-gray-500">Based on today &apos;s intake</p>
                </>
              ) }
              </div>  

            </div>
          </div>
        </div>
      </div>
    </BlurFade>
      )}
    </>
  );
};

export default MacronutrientsCard;