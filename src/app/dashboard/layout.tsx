"use client";

import AuthGuard from "@/components/AuthGuard";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChevronRight, Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  return (
    <AuthGuard>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-100  p-4">
          <header className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Menu className="text-gray-600" />
              <h1 className="text-xl font-bold text-gray-800">RepasSuivi</h1>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                Profile <ChevronRight size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </button>
                  <button 
                    onClick={() => {/* Add logout function here */}}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>
        </div>
        <div className="bg-gray-100">
          {children}
        </div>
        <div className="bg-gray-100 p-4">
          <Footer />
        </div>
      </QueryClientProvider>
    </AuthGuard>
  );
}
