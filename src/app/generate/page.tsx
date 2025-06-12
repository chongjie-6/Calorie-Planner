"use client";
import GenerateButton from "@/components/ui/generateButton";
import { useUser } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import generateMealPlan from "../actions/generateMealPlan";
import AddMealPlan from "../actions/addMealPlan";
import MealPlan from "@/components/ui/mealPlan";
import { MealPlanProps } from "../types/types";
import RadioBox from "@/components/ui/radioBox";

export default function Generate() {
  // Check if user is logged in
  const { user, isLoading } = useUser();
  const [mealPlan, setMealPlan] = useState<MealPlanProps | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [experimental, setExperimental] = useState(true);
  const [error, setError] = useState("");

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
        nutrition_info: {
          calories,
          carbs,
          fats,
          meals,
          protein,
        },
        model: experimental
          ? "gemini-2.5-flash-preview-05-20"
          : "gemini-2.0-flash",
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
      setIsGenerating(false);
      setError(String(e));
    }
  };

  return (
    <div className="page space-y-2">
      <GenerateButton onClick={() => generatePlan()}></GenerateButton>
      {!mealPlan && !isGenerating && (
        <RadioBox setExperimental={setExperimental}></RadioBox>
      )}
      {isGenerating && (
        <div className="flex flex-col justify-center items-center p-4 space-x-5">
          <p>Generating your meal...</p>
          <p>Grab a coffee and come back!</p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && !isGenerating && !mealPlan && (
        <p className="text-red-500">{error}</p>
      )}
      <MealPlan mealPlan={mealPlan}></MealPlan>
    </div>
  );
}
