import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Dumbbell, Zap, Brain, Apple, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import gymHero from "@/assets/gym-hero.jpg";

const quotes = [
  "No excuses, just results. 🔥",
  "You're stronger than yesterday. 💪",
  "The only bad workout is the one that didn't happen.",
  "Push yourself, because no one else is going to do it for you.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Sweat is just fat crying. 😤",
];

const features = [
  { icon: Brain, title: "AI Workout Plans", desc: "Personalized routines based on your goals" },
  { icon: Apple, title: "Smart Nutrition", desc: "Diet plans tailored to your body" },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Track every rep, set, and milestone" },
  { icon: Zap, title: "Smart Reminders", desc: "Never miss a workout again" },
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setQuoteIdx(p => (p + 1) % quotes.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={gymHero} alt="Gym interior" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        </div>
        <div className="container text-center animate-fade-in relative z-10">
          <div className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Dumbbell className="h-4 w-4" /> Your Smart Fitness Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
            Your Smart Fitness<br />Partner 💪
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-4 min-h-[2rem] transition-all">
            {quotes[quoteIdx]}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            {isAuthenticated ? (
              <Link to="/dashboard" className="gradient-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition-all">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="gradient-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition-all">
                  Start Now
                </Link>
                <Link to="/login" className="border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold text-lg hover:bg-primary/5 transition-all">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Gym Buddy?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
