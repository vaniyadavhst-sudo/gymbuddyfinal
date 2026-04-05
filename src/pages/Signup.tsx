import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Dumbbell } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", weight: 70, age: 25, goal: "maintain" as const, workoutDays: 4, gender: "male" as const });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup({ ...form, password: form.password })) {
      toast.success("Account created! Let's get started 💪");
      navigate("/dashboard");
    } else {
      toast.error("Email already exists");
    }
  };

  const update = (key: string, value: any) => setForm(p => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-card rounded-2xl shadow-card p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="gradient-primary p-3 rounded-xl mb-4">
              <Dumbbell className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Join Gym Buddy</h1>
            <p className="text-muted-foreground text-sm mt-1">Create your fitness profile</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input placeholder="Full Name" value={form.name} onChange={e => update("name", e.target.value)} required className="w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
            <input type="email" placeholder="Email" value={form.email} onChange={e => update("email", e.target.value)} required className="w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
            <input type="password" placeholder="Password" value={form.password} onChange={e => update("password", e.target.value)} required minLength={6} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Age" value={form.age} onChange={e => update("age", +e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
              <input type="number" placeholder="Weight (kg)" value={form.weight} onChange={e => update("weight", +e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
            </div>
            <select value={form.goal} onChange={e => update("goal", e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all">
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintain">Maintain Fitness</option>
            </select>
            <select value={form.gender} onChange={e => update("gender", e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Workout Days/Week: {form.workoutDays}</label>
              <input type="range" min={1} max={7} value={form.workoutDays} onChange={e => update("workoutDays", +e.target.value)} className="w-full accent-primary" />
            </div>
            <button type="submit" className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-all">Create Account</button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
