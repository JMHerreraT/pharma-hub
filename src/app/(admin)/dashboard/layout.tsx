import DashboardLayout from "@/components/templates/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  );
}
