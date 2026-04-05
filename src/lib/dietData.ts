export interface Meal {
  name: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietPlan {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  meals: { label: string; meal: Meal }[];
}

export const getDietPlan = (weight: number, goal: string): DietPlan => {
  const baseCalories = weight * 30;
  const calories = goal === "weight_loss" ? baseCalories - 400 : goal === "muscle_gain" ? baseCalories + 400 : baseCalories;
  const protein = goal === "muscle_gain" ? weight * 2 : weight * 1.5;
  const fats = calories * 0.25 / 9;
  const carbs = (calories - protein * 4 - fats * 9) / 4;

  const plans: Record<string, { label: string; meal: Meal }[]> = {
    weight_loss: [
      { label: "Breakfast", meal: { name: "Oats & Egg Whites", items: ["Oatmeal with berries", "3 egg whites", "Green tea", "1 banana"], calories: Math.round(calories * 0.25), protein: Math.round(protein * 0.25), carbs: Math.round(carbs * 0.3), fats: Math.round(fats * 0.2) } },
      { label: "Lunch", meal: { name: "Grilled Chicken Salad", items: ["Grilled chicken breast", "Mixed greens salad", "Brown rice (½ cup)", "Lemon dressing", "Dal (1 bowl) – Indian option"], calories: Math.round(calories * 0.35), protein: Math.round(protein * 0.35), carbs: Math.round(carbs * 0.35), fats: Math.round(fats * 0.3) } },
      { label: "Snack", meal: { name: "Protein Shake", items: ["Whey protein shake", "Almonds (10)", "Roasted chana – Indian option"], calories: Math.round(calories * 0.15), protein: Math.round(protein * 0.2), carbs: Math.round(carbs * 0.1), fats: Math.round(fats * 0.2) } },
      { label: "Dinner", meal: { name: "Fish & Veggies", items: ["Grilled fish / Paneer tikka", "Steamed vegetables", "Multigrain roti (1)", "Raita"], calories: Math.round(calories * 0.25), protein: Math.round(protein * 0.2), carbs: Math.round(carbs * 0.25), fats: Math.round(fats * 0.3) } },
    ],
    muscle_gain: [
      { label: "Breakfast", meal: { name: "Power Breakfast", items: ["4 whole eggs scrambled", "2 toast with peanut butter", "Banana smoothie", "Poha with peanuts – Indian option"], calories: Math.round(calories * 0.25), protein: Math.round(protein * 0.25), carbs: Math.round(carbs * 0.3), fats: Math.round(fats * 0.3) } },
      { label: "Lunch", meal: { name: "Chicken & Rice", items: ["Chicken breast (200g)", "White rice (1.5 cups)", "Veggies", "Rajma Chawal – Indian option"], calories: Math.round(calories * 0.3), protein: Math.round(protein * 0.3), carbs: Math.round(carbs * 0.35), fats: Math.round(fats * 0.2) } },
      { label: "Snack", meal: { name: "Mass Gainer Shake", items: ["Whey protein + banana + oats shake", "Peanut butter sandwich", "Sattu drink – Indian option"], calories: Math.round(calories * 0.2), protein: Math.round(protein * 0.2), carbs: Math.round(carbs * 0.2), fats: Math.round(fats * 0.2) } },
      { label: "Dinner", meal: { name: "Steak & Potatoes", items: ["Lean steak / Paneer bhurji", "Sweet potato", "Salad", "Curd rice – Indian option"], calories: Math.round(calories * 0.25), protein: Math.round(protein * 0.25), carbs: Math.round(carbs * 0.15), fats: Math.round(fats * 0.3) } },
    ],
    maintain: [
      { label: "Breakfast", meal: { name: "Balanced Start", items: ["2 eggs + toast", "Fruit bowl", "Coffee", "Upma – Indian option"], calories: Math.round(calories * 0.25), protein: Math.round(protein * 0.25), carbs: Math.round(carbs * 0.3), fats: Math.round(fats * 0.25) } },
      { label: "Lunch", meal: { name: "Balanced Plate", items: ["Grilled chicken / Paneer", "Rice or roti (2)", "Vegetables", "Dal fry – Indian option"], calories: Math.round(calories * 0.35), protein: Math.round(protein * 0.35), carbs: Math.round(carbs * 0.35), fats: Math.round(fats * 0.3) } },
      { label: "Snack", meal: { name: "Light Snack", items: ["Greek yogurt", "Mixed nuts", "Sprouts chaat – Indian option"], calories: Math.round(calories * 0.15), protein: Math.round(protein * 0.15), carbs: Math.round(carbs * 0.1), fats: Math.round(fats * 0.2) } },
      { label: "Dinner", meal: { name: "Light Dinner", items: ["Fish / Egg curry", "Quinoa / Chapati", "Salad", "Khichdi – Indian option"], calories: Math.round(calories * 0.25), protein: Math.round(protein * 0.25), carbs: Math.round(carbs * 0.25), fats: Math.round(fats * 0.25) } },
    ],
  };

  const meals = plans[goal] || plans.maintain;
  return {
    totalCalories: Math.round(calories),
    totalProtein: Math.round(protein),
    totalCarbs: Math.round(carbs),
    totalFats: Math.round(fats),
    meals,
  };
};
