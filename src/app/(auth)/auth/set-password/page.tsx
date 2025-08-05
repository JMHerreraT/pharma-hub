import SetPasswordForm from '@/components/organisms/SetPasswordForm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SetPasswordPage(props: any) {
  const email = props?.searchParams?.email;

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
          <p className="text-muted-foreground">Email no proporcionado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/10 p-4">
      <SetPasswordForm email={email} />
    </div>
  );
}
