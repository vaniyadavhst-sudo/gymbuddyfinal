import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Heart, Moon, Sun, Leaf } from "lucide-react";

const lightWorkouts = [
  "Gentle yoga flow (20 min)",
  "Light walking (15 min)",
  "Stretching routine",
  "Foam rolling (10 min)",
  "Deep breathing exercises",
  "Pilates (light intensity)",
];

const tips = [
  { title: "Nutrition", items: ["Increase iron-rich foods (spinach, lentils)", "Stay hydrated – aim for 8+ glasses", "Magnesium-rich foods help with cramps", "Dark chocolate (in moderation) boosts mood", "Avoid excess caffeine and salt"] },
  { title: "Recovery", items: ["Prioritize sleep – aim for 8 hours", "Use heat packs for cramp relief", "Gentle movement is better than being sedentary", "Listen to your body – skip intense workouts", "Track your cycle for better planning"] },
];

const WomensHealth = () => {
  const { isAuthenticated } = useAuth();
  const [periodMode, setPeriodMode] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen py-8">
      <div className="container animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Women's Health 🩸</h1>
          <p className="text-muted-foreground mt-1">Tailored care for your cycle</p>
        </div>

        {/* Period Mode Toggle */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Period Mode</p>
                <p className="text-sm text-muted-foreground">Get adjusted workout & nutrition suggestions</p>
              </div>
            </div>
            <button onClick={() => setPeriodMode(!periodMode)} className={`relative w-14 h-7 rounded-full transition-all ${periodMode ? "gradient-primary" : "bg-muted"}`}>
              <span className={`absolute top-0.5 w-6 h-6 bg-card rounded-full shadow transition-all ${periodMode ? "left-7" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        {periodMode && (
          <div className="space-y-6 animate-slide-up">
            {/* Light Workouts */}
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-foreground text-lg">Recommended Light Workouts</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {lightWorkouts.map((w, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-accent/50 rounded-xl">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{w}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {tips.map(({ title, items }, i) => (
              <div key={i} className="bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="h-5 w-5 text-primary" />
                  <h2 className="font-bold text-foreground text-lg">{title} Tips</h2>
                </div>
                <ul className="space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full gradient-primary inline-block" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!periodMode && (
          <div className="bg-card rounded-2xl shadow-card p-10 text-center animate-fade-in">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Toggle Period Mode to see personalized suggestions for your cycle.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomensHealth;
