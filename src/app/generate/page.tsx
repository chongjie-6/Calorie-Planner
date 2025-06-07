"use client";
const MEALS: MealPlanProps = {
  total_calories: 3000,
  total_protein: 200,
  total_carbohydrates: 340,
  total_fat: 88,
  number_of_meals: 3,
  meals: [
    {
      meal_name: "Breakfast: High-Protein Oatmeal with Berries and Nuts",
      calories: 700,
      protein: 50,
      carbohydrates: 90,
      fat: 20,
      ingredients: [
        { item: "Rolled Oats", quantity: 1, unit: "cup" },
        { item: "Protein Powder (Whey/Casein)", quantity: 2, unit: "scoops" },
        { item: "Almond Milk", quantity: 1.5, unit: "cups" },
        { item: "Mixed Berries", quantity: 1, unit: "cup" },
        { item: "Almonds", quantity: 0.25, unit: "cup" },
        { item: "Chia Seeds", quantity: 1, unit: "tablespoon" },
        { item: "Honey", quantity: 1, unit: "tablespoon" },
      ],
      instructions: [
        "Combine rolled oats and almond milk in a saucepan.",
        "Bring to a simmer over medium heat, stirring occasionally.",
        "Cook for 5-7 minutes, or until the oats are tender.",
        "Remove from heat and stir in protein powder until dissolved.",
        "Top with mixed berries, almonds, chia seeds, and honey.",
        "Enjoy immediately.",
      ],
    },
    {
      meal_name: "Lunch: Grilled Chicken Salad with Quinoa and Vegetables",
      calories: 1000,
      protein: 80,
      carbohydrates: 150,
      fat: 20,
      ingredients: [
        { item: "Chicken Breast", quantity: 8, unit: "oz" },
        { item: "Quinoa", quantity: 1, unit: "cup" },
        { item: "Broccoli Florets", quantity: 1, unit: "cup" },
        { item: "Bell Pepper (chopped)", quantity: 0.5, unit: "cup" },
        { item: "Cucumber (chopped)", quantity: 0.5, unit: "cup" },
        { item: "Cherry Tomatoes (halved)", quantity: 0.5, unit: "cup" },
        { item: "Olive Oil", quantity: 2, unit: "tablespoons" },
        { item: "Lemon Juice", quantity: 1, unit: "tablespoon" },
        { item: "Salt", quantity: 0.25, unit: "teaspoon" },
        { item: "Black Pepper", quantity: 0.25, unit: "teaspoon" },
      ],
      instructions: [
        "Cook quinoa according to package directions.",
        "Season chicken breast with salt and pepper.",
        "Grill chicken breast until cooked through (about 6-8 minutes per side).",
        "Let chicken cool slightly and then slice or dice.",
        "Steam or lightly boil broccoli florets until tender-crisp.",
        "In a large bowl, combine cooked quinoa, grilled chicken, broccoli, bell pepper, cucumber, and cherry tomatoes.",
        "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper.",
        "Pour dressing over the salad and toss to combine.",
        "Serve immediately or chill for later.",
      ],
    },
    {
      meal_name: "Dinner: Lean Beef Stir-Fry with Brown Rice",
      calories: 1300,
      protein: 70,
      carbohydrates: 100,
      fat: 48,
      ingredients: [
        { item: "Lean Ground Beef (90/10)", quantity: 10, unit: "oz" },
        { item: "Brown Rice", quantity: 1, unit: "cup" },
        { item: "Broccoli Florets", quantity: 1, unit: "cup" },
        { item: "Carrots (sliced)", quantity: 0.5, unit: "cup" },
        { item: "Snap Peas", quantity: 0.5, unit: "cup" },
        { item: "Soy Sauce (low sodium)", quantity: 2, unit: "tablespoons" },
        { item: "Sesame Oil", quantity: 1, unit: "tablespoon" },
        { item: "Ginger (minced)", quantity: 1, unit: "teaspoon" },
        { item: "Garlic (minced)", quantity: 2, unit: "cloves" },
        { item: "Sesame Seeds", quantity: 1, unit: "teaspoon" },
      ],
      instructions: [
        "Cook brown rice according to package directions.",
        "In a large skillet or wok, heat sesame oil over medium-high heat.",
        "Add ground beef and cook until browned, breaking it up with a spoon.",
        "Drain any excess fat.",
        "Add minced ginger and garlic to the skillet and cook for 1 minute, until fragrant.",
        "Add broccoli, carrots, and snap peas to the skillet and stir-fry for 5-7 minutes, or until the vegetables are tender-crisp.",
        "Pour in soy sauce and stir to combine.",
        "Simmer for a few minutes to allow the sauce to thicken slightly.",
        "Serve the stir-fry over cooked brown rice.",
        "Sprinkle with sesame seeds.",
        "Enjoy immediately.",
      ],
    },
  ],
};

import GenerateButton from "@/components/ui/generateButton";
import { useUser } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import generateMealPlan from "../actions/generateMealPlan";
import AddMealPlan from "../actions/addMealPlan";
import MealPlan from "@/components/ui/mealPlan";
import { MealPlanProps } from "../types/types";

export default function Generate() {
  // Check if user is logged in
  const { user, isLoading } = useUser();
  const [mealPlan, setMealPlan] = useState<MealPlanProps | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      redirect("/auth/login");
    }
  }, [isLoading, user]);

  // Generate a plan and add to database
  const generatePlan = async () => {
    try {
      setIsGenerating(true);
      // Get from Local Storage.
      const calories = Number(localStorage.getItem("calories"));
      const carbs = Number(localStorage.getItem("carbs"));
      const fats = Number(localStorage.getItem("fats"));
      const meals = Number(localStorage.getItem("meals"));
      const protein = Number(localStorage.getItem("protein"));

      // Server Action to generate meal plan and return in JSON and update in database.
      const response = await generateMealPlan({
        calories,
        carbs,
        fats,
        meals,
        protein,
      });

      if (!response) {
        throw new Error(
          "There was an error generating your meal plan. Please try again"
        );
      }
      setMealPlan(JSON.parse(response));
      AddMealPlan(response);
      setIsGenerating(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="page">
      <GenerateButton onClick={() => generatePlan()}></GenerateButton>
      {isGenerating && <p>Generating...</p>}
      <MealPlan mealPlan={mealPlan}></MealPlan>
    </div>
  );
}
