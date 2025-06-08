import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { MealPlanProps } from "../types/types";
import { fetchAllMealPlan } from "../actions/fetchAllMealPlans";
import AllMealsCards from "@/components/ui/allMealsCard";

export default async function PreviousMealPlan() {
  // Check if user is logged in
  const user = await auth0.getSession();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch all meal plans from Dynamodb
  const response = await fetchAllMealPlan();

  // Parse as JSON
  const allMealPlans = response.Items?.map((plan) => {
    return {
      date_time: plan.date_time,
      meal: JSON.parse(plan.meal),
    };
  });

  return (
    <div className="page">
      {allMealPlans?.map((plan, index) => (
        <AllMealsCards
          key={index}
          mealPlan={plan.meal as MealPlanProps}
          date_time={new Date(plan.date_time).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      ))}
    </div>
  );
}
