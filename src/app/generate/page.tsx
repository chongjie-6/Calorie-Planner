"use client";
import { useState } from "react";
import generateMealPlan from "../actions/generateMealPlan";

export default function Generate() {
  const [response, setResponse] = useState<string | undefined>("");
  const onClick = async () => {
    // When we click generate we need to retrieve from local storage
    try {
      const calories = Number(localStorage.getItem("calories"));
      const carbs = Number(localStorage.getItem("carbs"));
      const fats = Number(localStorage.getItem("fats"));
      const meals = Number(localStorage.getItem("meals"));
      const protein = Number(localStorage.getItem("protein"));

      const response = await generateMealPlan({
        calories,
        carbs,
        fats,
        meals,
        protein,
      });
      setResponse(response ? JSON.parse(response) : "");
      console.log(response);
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
