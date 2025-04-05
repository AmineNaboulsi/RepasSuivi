"use client";


import AuthGuard from "@/components/AuthGuard";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

        <div className="min-h-screen bg-gray-100">
          {/* Add Sidebar / Header if needed */}
          {children}
        </div>
      </QueryClientProvider>

    </AuthGuard>
  );
}
