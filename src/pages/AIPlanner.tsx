import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { getWorkoutPlan, getTodayPlan } from "@/lib/workoutData";
import { useState } from "react";
import { Calendar, Clock, Dumbbell } from "lucide-react";

const AIPlanner = () => {
  const { user, isAuthenticated } = useAuth();
  const [view, setView] = useState<"today" | "weekly">("today");

  if (!isAuthenticated) return <Navigate to="/login" />;

  const todayPlan = getTodayPlan(user!.goal);
  const weeklyPlan = getWorkoutPlan(user!.goal);
  const goalLabel = user!.goal === "weight_loss" ? "Weight Loss" : user!.goal === "muscle_gain" ? "Muscle Gain" : "Maintain";

  return (
    <div className="min-h-screen py-8">
      <div className="container animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">AI Workout Planner 🤖</h1>
          <p className="text-muted-foreground mt-1">Personalized for {user!.name} • {goalLabel} • {user!.workoutDays} days/week</p>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 mb-6">
          {(["today", "weekly"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${view === v ? "gradient-primary text-primary-foreground" : "bg-card text-muted-foreground border hover:bg-accent"}`}>
              {v === "today" ? "Today's Plan" : "Weekly Plan"}
            </button>
          ))}
        </div>

        {view === "today" ? (
          <div className="bg-card rounded-2xl shadow-card p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="gradient-primary p-2.5 rounded-xl"><Calendar className="h-5 w-5 text-primary-foreground" /></div>
              <div>
                <h2 className="font-bold text-foreground text-lg">{todayPlan.day}</h2>
                <p className="text-muted-foreground text-sm">{todayPlan.focus}</p>
              </div>
            </div>
            <div className="space-y-3">
              {todayPlan.exercises.map((ex, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-accent/50 rounded-xl hover:bg-accent transition-all">
                  <div className="flex items-center gap-3">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{ex.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {ex.sets > 0 && <span>{ex.sets} sets × {ex.reps}</span>}
                    {ex.rest !== "-" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ex.rest}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {weeklyPlan.map((day, i) => (
              <div key={i} className="bg-card rounded-2xl shadow-card p-6 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="gradient-primary w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">{day.day.slice(0, 2)}</div>
                  <div>
                    <h3 className="font-bold text-foreground">{day.day}</h3>
                    <p className="text-muted-foreground text-sm">{day.focus}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {day.exercises.map((ex, j) => (
                    <div key={j} className="flex justify-between text-sm py-2 px-3 rounded-lg hover:bg-accent/50 transition-all">
                      <span className="text-foreground">{ex.name}</span>
                      <span className="text-muted-foreground">{ex.sets > 0 ? `${ex.sets}×${ex.reps}` : ex.reps}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
