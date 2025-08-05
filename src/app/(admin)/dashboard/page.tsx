import HomePage from "@/components/pages/HomePage";
import { ProtectedRoute } from "@/components/guards/AuthGuard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="w-full h-full">
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              ¡Bienvenido de nuevo! ✋
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Aquí tienes un resumen de las ventas de tu farmacia.
            </p>
          </div>

          {/* Dashboard content */}
          <div className="w-full">
            <HomePage />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
