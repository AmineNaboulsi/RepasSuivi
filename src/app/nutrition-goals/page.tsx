'use client';

import NutritionPanelGoals from '@/components/NutritionPanelGoals';
import { useRouter } from 'next/navigation';
export default function NutritionGoalsPage() {

  const router = useRouter();
  const setSubmitGolas = () => {
    router.push('/dashboard');
  }

  return (
    <div>
      <NutritionPanelGoals setSubmitGolas={setSubmitGolas} />
    </div>
  );
}
