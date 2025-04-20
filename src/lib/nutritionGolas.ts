export async function verifyNutritionGoals(token: string): Promise<'dashboard' | 'nutrition-goals' | null> {
    if (!token) return null;
  
    try {
      const url = process.env.NEXT_PUBLIC_URLAPI_GETWAY;
  
      const res = await fetch(`${url}/api/nutritiongoeals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) return 'nutrition-goals';
      if (res.ok) return 'dashboard';
  
      return null;
    } catch{
      return null;
    }
  }
  