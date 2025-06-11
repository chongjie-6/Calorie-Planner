import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import fetchMealPlan from "../actions/fetchPreviousMealPlan";
import MealPlan from "@/components/ui/mealPlan";

export default async function CurrentMealPlan() {
  // Check if user is logged in
  const user = await auth0.getSession();

  if (!user) {
    redirect("/auth/login");
  }

  const response = await fetchMealPlan();
  const latestMealPlan = response.Items?.[0];

  return (
    <div className="page space-y-10 mt-10">
      <h1 className="text-2xl font-bold">Current Meal Plan</h1>
      <MealPlan
        mealPlan={latestMealPlan ? JSON.parse(latestMealPlan?.meal) : ""}
      ></MealPlan>
    </div>
  );
}
