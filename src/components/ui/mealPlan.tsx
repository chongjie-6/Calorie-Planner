import { MealPlanProps } from "@/app/types/types";

export default function MealPlan({
  mealPlan,
}: {
  mealPlan: MealPlanProps | undefined;
}) {
  return <div>{mealPlan ? <div>Meal Plan</div> : "palceholder"}</div>;
}
