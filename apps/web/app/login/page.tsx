import { redirect } from "next/navigation";
import LoginForm from "../../components/auth/LoginForm";
import { isAuthenticated } from "../../lib/session";

export default async function LoginPage() {
  const isUserLoggedIn = await isAuthenticated();

  if (isUserLoggedIn) {
    redirect("/quizzes");
  }
  return <LoginForm />;
}
