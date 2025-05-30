"use client";
import { useState } from "react";
import generateMealPlan from "../actions/generateMealPlan";

export default function Generate() {
  const [response, setResponse] = useState<string | undefined>("");
  const onClick = async () => {
    try {
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
      
      setResponse(response ? JSON.parse(response) : "");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="page">
      <button
        className="generate_btn primary_btn hover:bg-red-500"
        onClick={() => onClick()}
      >
        Generate
      </button>
    </div>
  );
}
