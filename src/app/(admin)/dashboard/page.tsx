import HomePage from "@/components/pages/HomePage";

export default function DashboardPage() {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Bienvenido de nuevo! ✋ </h2>
        <p className="text-muted-foreground">Here&apos;s a summary of your pharmacy sales.</p>

        {/* Aquí puedes insertar tus métricas y gráficas */}
        <HomePage />
      </div>
    );
  }
