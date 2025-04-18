"use client";


import AuthGuard from "@/components/AuthGuard";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChevronRight, Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthGuard>
      <QueryClientProvider client={queryClient}>
        <div className="p-4">
            <header className="bg-white shadow rounded-lg p-4 mb-6 flex justify-between items-center ">
                <div className="flex items-center space-x-2">
                  <Menu className="text-gray-600" />
                  <h1 className="text-xl font-bold text-gray-800">NutriTrack</h1>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                  Profile <ChevronRight size={16} className="ml-1" />
                </button>
            </header> 
        </div>
        <div className="min-h-screen bg-gray-100">
          {children}
        </div>
      </QueryClientProvider>

    </AuthGuard>
  );
}
