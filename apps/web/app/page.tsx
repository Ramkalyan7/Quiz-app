import { redirect } from "next/navigation";
import { isAuthenticated } from "../lib/session";

export default async function HomePage() {
  const isUserLoggedIn = await isAuthenticated();

  if (isUserLoggedIn) {
    redirect("/quizzes");
  }

  return <div>home page</div>;
}
