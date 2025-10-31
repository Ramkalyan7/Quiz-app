import { redirect } from "next/navigation";
import AILearningSection from "../components/landing/AILearningSection";
import CTASection from "../components/landing/CTASection";
import FeaturesSection from "../components/landing/FeaturesSection";
import Footer from "../components/landing/Footer";
import HeroSection from "../components/landing/HeroSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import LiveDemoSection from "../components/landing/LiveDemoSection";
import { isAuthenticated } from "../lib/session";

export default async function LandingPage() {

    const isUserLoggedIn = await isAuthenticated();

  if (isUserLoggedIn) {
    redirect("/quizzes");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AILearningSection />
      <LiveDemoSection />
      <CTASection />
      <Footer />
    </div>
  );
}
