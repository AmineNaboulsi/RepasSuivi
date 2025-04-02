import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Add Sidebar / Header if needed */}
        {children}
      </div>
    </AuthGuard>
  );
}
