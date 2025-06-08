import { MealPlanProps } from "@/app/types/types";
import MealPlanNutrition from "./mealPlanNutrition";
import Meals from "./meals";

export default function MealPlan({
  mealPlan,
}: {
  mealPlan: MealPlanProps | undefined;
}) {
  return (
    <>
      {mealPlan ? (
        <div className="cardPage">
          <MealPlanNutrition
            protein={mealPlan.total_protein}
            calories={mealPlan.total_calories}
            carbs={mealPlan.total_carbohydrates}
            fats={mealPlan.total_fat}
          />
          <h2 className="titleText">Meals ({mealPlan.number_of_meals})</h2>
          <Meals meals={mealPlan.meals}/>
        </div>
      ) : (
        <p>You have no current meal plan.</p>
      )}
    </>
  );
}
