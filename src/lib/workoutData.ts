export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface DayPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
}

const muscleGainPlans: DayPlan[] = [
  { day: "Monday", focus: "Chest & Triceps", exercises: [
    { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
    { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Cable Flyes", sets: 3, reps: "12-15", rest: "60s" },
    { name: "Tricep Dips", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Skull Crushers", sets: 3, reps: "10-12", rest: "60s" },
  ]},
  { day: "Tuesday", focus: "Back & Biceps", exercises: [
    { name: "Deadlift", sets: 4, reps: "6-8", rest: "120s" },
    { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90s" },
    { name: "Barbell Row", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Hammer Curl", sets: 3, reps: "12-15", rest: "60s" },
  ]},
  { day: "Wednesday", focus: "Rest / Active Recovery", exercises: [
    { name: "Light Walk", sets: 1, reps: "20 min", rest: "-" },
    { name: "Foam Rolling", sets: 1, reps: "15 min", rest: "-" },
    { name: "Stretching", sets: 1, reps: "15 min", rest: "-" },
  ]},
  { day: "Thursday", focus: "Shoulders & Abs", exercises: [
    { name: "Overhead Press", sets: 4, reps: "8-10", rest: "90s" },
    { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "60s" },
    { name: "Face Pulls", sets: 3, reps: "12-15", rest: "60s" },
    { name: "Plank", sets: 3, reps: "60s hold", rest: "30s" },
    { name: "Cable Crunches", sets: 3, reps: "15-20", rest: "45s" },
  ]},
  { day: "Friday", focus: "Legs", exercises: [
    { name: "Squats", sets: 4, reps: "8-10", rest: "120s" },
    { name: "Leg Press", sets: 3, reps: "10-12", rest: "90s" },
    { name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Leg Curl", sets: 3, reps: "12-15", rest: "60s" },
    { name: "Calf Raises", sets: 4, reps: "15-20", rest: "45s" },
  ]},
  { day: "Saturday", focus: "Full Body / Weak Points", exercises: [
    { name: "Dumbbell Press", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Lunges", sets: 3, reps: "12 each", rest: "60s" },
    { name: "Bicep Curl", sets: 2, reps: "12-15", rest: "45s" },
  ]},
  { day: "Sunday", focus: "Rest", exercises: [
    { name: "Rest Day – Recover & Hydrate", sets: 0, reps: "-", rest: "-" },
  ]},
];

const weightLossPlans: DayPlan[] = [
  { day: "Monday", focus: "HIIT Cardio + Core", exercises: [
    { name: "Burpees", sets: 4, reps: "15", rest: "30s" },
    { name: "Mountain Climbers", sets: 4, reps: "20", rest: "30s" },
    { name: "Jump Squats", sets: 3, reps: "15", rest: "30s" },
    { name: "Plank", sets: 3, reps: "45s hold", rest: "15s" },
    { name: "Bicycle Crunches", sets: 3, reps: "20", rest: "15s" },
  ]},
  { day: "Tuesday", focus: "Upper Body Circuit", exercises: [
    { name: "Push-ups", sets: 4, reps: "15", rest: "30s" },
    { name: "Dumbbell Rows", sets: 3, reps: "12", rest: "30s" },
    { name: "Shoulder Press", sets: 3, reps: "12", rest: "30s" },
    { name: "Tricep Kickbacks", sets: 3, reps: "15", rest: "30s" },
  ]},
  { day: "Wednesday", focus: "Active Recovery", exercises: [
    { name: "Brisk Walk", sets: 1, reps: "30 min", rest: "-" },
    { name: "Yoga Flow", sets: 1, reps: "20 min", rest: "-" },
  ]},
  { day: "Thursday", focus: "Lower Body Burn", exercises: [
    { name: "Jump Lunges", sets: 4, reps: "12 each", rest: "30s" },
    { name: "Goblet Squats", sets: 3, reps: "15", rest: "30s" },
    { name: "Glute Bridges", sets: 3, reps: "15", rest: "30s" },
    { name: "Wall Sit", sets: 3, reps: "45s hold", rest: "30s" },
  ]},
  { day: "Friday", focus: "Full Body HIIT", exercises: [
    { name: "Kettlebell Swings", sets: 4, reps: "15", rest: "30s" },
    { name: "Box Jumps", sets: 3, reps: "12", rest: "30s" },
    { name: "Battle Ropes", sets: 3, reps: "30s", rest: "15s" },
    { name: "Plank to Push-up", sets: 3, reps: "10", rest: "30s" },
  ]},
  { day: "Saturday", focus: "Cardio", exercises: [
    { name: "Running / Cycling", sets: 1, reps: "40 min", rest: "-" },
    { name: "Cool Down Stretch", sets: 1, reps: "10 min", rest: "-" },
  ]},
  { day: "Sunday", focus: "Rest", exercises: [
    { name: "Rest Day – Recover & Hydrate", sets: 0, reps: "-", rest: "-" },
  ]},
];

const maintainPlans: DayPlan[] = [
  { day: "Monday", focus: "Push Day", exercises: [
    { name: "Bench Press", sets: 3, reps: "10", rest: "60s" },
    { name: "Overhead Press", sets: 3, reps: "10", rest: "60s" },
    { name: "Tricep Pushdown", sets: 3, reps: "12", rest: "45s" },
  ]},
  { day: "Tuesday", focus: "Pull Day", exercises: [
    { name: "Pull-ups", sets: 3, reps: "8-10", rest: "60s" },
    { name: "Seated Cable Row", sets: 3, reps: "10", rest: "60s" },
    { name: "Bicep Curl", sets: 3, reps: "12", rest: "45s" },
  ]},
  { day: "Wednesday", focus: "Cardio + Core", exercises: [
    { name: "Running", sets: 1, reps: "25 min", rest: "-" },
    { name: "Plank", sets: 3, reps: "60s", rest: "30s" },
    { name: "Leg Raises", sets: 3, reps: "15", rest: "30s" },
  ]},
  { day: "Thursday", focus: "Legs", exercises: [
    { name: "Squats", sets: 3, reps: "10", rest: "90s" },
    { name: "Leg Press", sets: 3, reps: "12", rest: "60s" },
    { name: "Calf Raises", sets: 3, reps: "15", rest: "45s" },
  ]},
  { day: "Friday", focus: "Full Body", exercises: [
    { name: "Dumbbell Press", sets: 3, reps: "10", rest: "60s" },
    { name: "Barbell Row", sets: 3, reps: "10", rest: "60s" },
    { name: "Lunges", sets: 3, reps: "12 each", rest: "60s" },
  ]},
  { day: "Saturday", focus: "Active Recovery", exercises: [
    { name: "Swimming / Walk", sets: 1, reps: "30 min", rest: "-" },
    { name: "Stretching", sets: 1, reps: "15 min", rest: "-" },
  ]},
  { day: "Sunday", focus: "Rest", exercises: [
    { name: "Rest Day", sets: 0, reps: "-", rest: "-" },
  ]},
];

export const getWorkoutPlan = (goal: string): DayPlan[] => {
  switch (goal) {
    case "muscle_gain": return muscleGainPlans;
    case "weight_loss": return weightLossPlans;
    default: return maintainPlans;
  }
};

export const getTodayPlan = (goal: string): DayPlan => {
  const plans = getWorkoutPlan(goal);
  const dayIdx = new Date().getDay();
  const mapped = [6, 0, 1, 2, 3, 4, 5]; // Sun=6, Mon=0...
  return plans[mapped[dayIdx]];
};
