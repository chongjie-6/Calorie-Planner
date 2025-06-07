import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import fetchMealPlan from "../actions/fetchMealPlan";

export default async function CurrentMealPlan() {
  // Check if user is logged in
  const user = await auth0.getSession();

  if (!user) {
    redirect("/auth/login");
  }

  const response = await fetchMealPlan();
  console.log(response);

  return <div>Current Meal Plan</div>;
}
