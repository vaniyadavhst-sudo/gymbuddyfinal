import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { getDietPlan } from "@/lib/dietData";
import { Flame, Beef, Wheat, Droplets } from "lucide-react";

const Diet = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const plan = getDietPlan(user!.weight, user!.goal);
  const goalLabel = user!.goal === "weight_loss" ? "Weight Loss" : user!.goal === "muscle_gain" ? "Muscle Gain" : "Maintain";

  return (
    <div className="min-h-screen py-8">
      <div className="container animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Diet & Nutrition 🥗</h1>
          <p className="text-muted-foreground mt-1">AI-powered diet plan for {user!.name} • {goalLabel}</p>
        </div>

        {/* Macros overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Flame, label: "Calories", value: `${plan.totalCalories}`, unit: "kcal" },
            { icon: Beef, label: "Protein", value: `${plan.totalProtein}`, unit: "g" },
            { icon: Wheat, label: "Carbs", value: `${plan.totalCarbs}`, unit: "g" },
            { icon: Droplets, label: "Fats", value: `${plan.totalFats}`, unit: "g" },
          ].map(({ icon: Icon, label, value, unit }) => (
            <div key={label} className="bg-card rounded-2xl p-5 shadow-card text-center">
              <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{value}<span className="text-sm font-normal text-muted-foreground">{unit}</span></p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Meals */}
        <div className="space-y-4">
          {plan.meals.map(({ label, meal }, i) => (
            <div key={i} className="bg-card rounded-2xl shadow-card p-6 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase">{label}</span>
                  <h3 className="font-bold text-foreground text-lg">{meal.name}</h3>
                </div>
                <span className="text-sm text-muted-foreground">{meal.calories} kcal</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {meal.items.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full gradient-primary inline-block" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>P: {meal.protein}g</span>
                <span>C: {meal.carbs}g</span>
                <span>F: {meal.fats}g</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diet;
