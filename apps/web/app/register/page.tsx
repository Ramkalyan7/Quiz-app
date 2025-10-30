import { redirect } from "next/navigation";
import { isAuthenticated } from "../../lib/session";
import RegisterForm from "../../components/auth/RegisterForm";

export default async function RegisterPage() {
    const isUserLoggedIn = await isAuthenticated();

    if(isUserLoggedIn){
        redirect("/quizzes");
    }

    return <RegisterForm/>
}