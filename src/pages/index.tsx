import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <main className="h-screen flex-center px-2">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Login to your account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
