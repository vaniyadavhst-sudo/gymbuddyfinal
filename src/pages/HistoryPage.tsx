import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Dumbbell, Trash2 } from "lucide-react";

interface WorkoutLog {
  id: string;
  date: string;
  exercises: { name: string; sets: number; reps: string }[];
}

const HistoryPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [filter, setFilter] = useState<"all" | "week" | "month">("all");

  useEffect(() => {
    if (user) {
      const stored = JSON.parse(localStorage.getItem(`history_${user.id}`) || "[]");
      if (stored.length === 0) {
        // Seed sample data
        const sample: WorkoutLog[] = [];
        for (let i = 0; i < 10; i++) {
          const d = new Date();
          d.setDate(d.getDate() - i * 2);
          sample.push({
            id: crypto.randomUUID(),
            date: d.toISOString().split("T")[0],
            exercises: [
              { name: "Bench Press", sets: 3, reps: "10" },
              { name: "Squats", sets: 4, reps: "8" },
              { name: "Pull-ups", sets: 3, reps: "10" },
            ],
          });
        }
        localStorage.setItem(`history_${user.id}`, JSON.stringify(sample));
        setLogs(sample);
      } else {
        setLogs(stored);
      }
    }
  }, [user]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const now = new Date();
  const filtered = logs.filter(l => {
    if (filter === "all") return true;
    const d = new Date(l.date);
    const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return filter === "week" ? diffDays <= 7 : diffDays <= 30;
  });

  const deleteLog = (id: string) => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    localStorage.setItem(`history_${user!.id}`, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Workout History 📜</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} workouts found</p>
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "week", "month"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "gradient-primary text-primary-foreground" : "bg-card text-muted-foreground border hover:bg-accent"}`}>
              {f === "all" ? "All Time" : f === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((log, i) => (
            <div key={log.id} className="bg-card rounded-2xl shadow-card p-5 animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{new Date(log.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
                </div>
                <button onClick={() => deleteLog(log.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1.5">
                {log.exercises.map((ex, j) => (
                  <div key={j} className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg hover:bg-accent/50 transition-all">
                    <span className="flex items-center gap-2 text-foreground"><Dumbbell className="h-3 w-3 text-primary" />{ex.name}</span>
                    <span className="text-muted-foreground">{ex.sets}×{ex.reps}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No workouts found for this period.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
