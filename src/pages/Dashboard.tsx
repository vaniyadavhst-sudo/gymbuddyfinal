import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Flame, Dumbbell, TrendingUp, Droplets, Footprints, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [water, setWater] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (user) {
      setWater(+(localStorage.getItem(`water_${user.id}_${new Date().toDateString()}`) || "0"));
      setSteps(+(localStorage.getItem(`steps_${user.id}_${new Date().toDateString()}`) || "0"));
    }
  }, [user]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const workoutsThisWeek = +(localStorage.getItem(`workouts_week_${user!.id}`) || "0");
  const totalSets = workoutsThisWeek * 15;
  const totalReps = totalSets * 10;
  const caloriesBurned = workoutsThisWeek * 350;
  const streak = +(localStorage.getItem(`streak_${user!.id}`) || "0");

  const addWater = () => {
    const newVal = water + 1;
    setWater(newVal);
    localStorage.setItem(`water_${user!.id}_${new Date().toDateString()}`, String(newVal));
  };

  const addSteps = () => {
    const val = prompt("Enter steps:");
    if (val && !isNaN(+val)) {
      const newVal = steps + +val;
      setSteps(newVal);
      localStorage.setItem(`steps_${user!.id}_${new Date().toDateString()}`, String(newVal));
    }
  };

  const logWorkout = () => {
    const newCount = workoutsThisWeek + 1;
    localStorage.setItem(`workouts_week_${user!.id}`, String(newCount));
    const newStreak = streak + 1;
    localStorage.setItem(`streak_${user!.id}`, String(newStreak));
    window.location.reload();
  };

  const goalLabel = user!.goal === "weight_loss" ? "Weight Loss" : user!.goal === "muscle_gain" ? "Muscle Gain" : "Maintain";
  const needsRest = workoutsThisWeek >= user!.workoutDays;

  const stats = [
    { icon: Dumbbell, label: "Workouts This Week", value: workoutsThisWeek, color: "text-primary" },
    { icon: TrendingUp, label: "Total Sets", value: totalSets, color: "text-primary" },
    { icon: Flame, label: "Calories Burned", value: `${caloriesBurned} kcal`, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user!.name.split(" ")[0]}! 💪</h1>
          <p className="text-muted-foreground mt-1">Goal: {goalLabel} • {user!.weight}kg • {user!.age} years</p>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="gradient-primary text-primary-foreground rounded-2xl p-6 mb-6 flex items-center gap-4">
            <Flame className="h-10 w-10" />
            <div>
              <p className="text-2xl font-bold">{streak}-day consistency 🔥</p>
              <p className="text-primary-foreground/80 text-sm">Keep it going!</p>
            </div>
          </div>
        )}

        {/* Rest day suggestion */}
        {needsRest && (
          <div className="bg-accent border border-primary/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <p className="text-accent-foreground text-sm font-medium">You've hit your workout goal this week! Consider a rest day for recovery. 🧘</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Progress + Reps */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-2">Weekly Progress</p>
            <div className="w-full bg-muted rounded-full h-4">
              <div className="gradient-primary h-4 rounded-full transition-all duration-500" style={{ width: `${Math.min((workoutsThisWeek / user!.workoutDays) * 100, 100)}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{workoutsThisWeek}/{user!.workoutDays} workouts</p>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-2">Total Reps</p>
            <p className="text-4xl font-bold text-foreground">{totalReps}</p>
            <p className="text-xs text-muted-foreground mt-1">estimated this week</p>
          </div>
        </div>

        {/* Water & Steps */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Water Intake</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{water} <span className="text-lg font-normal text-muted-foreground">glasses</span></p>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div className="gradient-primary h-2 rounded-full transition-all" style={{ width: `${Math.min((water / 8) * 100, 100)}%` }} />
            </div>
            <button onClick={addWater} className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Add Glass 💧</button>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <Footprints className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Steps Today</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{steps.toLocaleString()}</p>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div className="gradient-primary h-2 rounded-full transition-all" style={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }} />
            </div>
            <button onClick={addSteps} className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Log Steps 👟</button>
          </div>
        </div>

        {/* Log workout */}
        <button onClick={logWorkout} className="w-full gradient-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all">
          ✅ Log Today's Workout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
