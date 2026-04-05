import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { User, Target, Weight, TrendingDown, TrendingUp, Save } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [weight, setWeight] = useState(user?.weight || 70);
  const [goal, setGoal] = useState<"weight_loss" | "muscle_gain" | "maintain">(user?.goal || "maintain");

  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  const handleSave = () => {
    const newHistory = [...user.weightHistory];
    if (weight !== user.weight) {
      newHistory.push({ date: new Date().toISOString().split("T")[0], weight });
    }
    updateProfile({ name, weight, goal: goal as any, weightHistory: newHistory });
    toast.success("Profile updated! 🎉");
  };

  const weightChange = user.weightHistory.length >= 2
    ? user.weightHistory[user.weightHistory.length - 1].weight - user.weightHistory[0].weight
    : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-lg animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Profile 👤</h1>
          <p className="text-muted-foreground mt-1">Manage your fitness profile</p>
        </div>

        {/* Avatar */}
        <div className="bg-card rounded-2xl shadow-card p-8 text-center mb-6">
          <div className="gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>

        {/* Edit form */}
        <div className="bg-card rounded-2xl shadow-card p-6 space-y-4 mb-6">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value as "weight_loss" | "muscle_gain" | "maintain")} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all">
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintain">Maintain</option>
            </select>
          </div>
          <button onClick={handleSave} className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>

        {/* Weight tracking */}
        <div className="bg-card rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Weight className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Weight Progress</h3>
          </div>
          {weightChange !== 0 && (
            <div className="flex items-center gap-2 mb-3">
              {weightChange < 0 ? <TrendingDown className="h-4 w-4 text-primary" /> : <TrendingUp className="h-4 w-4 text-primary" />}
              <span className="text-sm text-muted-foreground">{Math.abs(weightChange).toFixed(1)}kg {weightChange < 0 ? "lost" : "gained"} since start</span>
            </div>
          )}
          <div className="space-y-2">
            {user.weightHistory.slice(-5).reverse().map((entry, i) => (
              <div key={i} className="flex justify-between text-sm py-2 px-3 rounded-lg bg-accent/50">
                <span className="text-muted-foreground">{entry.date}</span>
                <span className="font-medium text-foreground">{entry.weight} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
