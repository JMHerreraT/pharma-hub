import { ProtectedRoute } from "@/components/guards/AuthGuard";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
