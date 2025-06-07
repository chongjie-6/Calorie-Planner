import { MealProps } from "@/app/types/types";
import IngredientsAccordian from "./ingredientsAccordian";
import InstructionsAccordian from "./instructionsAccordian";

export default function Meals({ meals }: { meals: MealProps[] }) {
  return (
    <div className="allMealCard">
      {meals.map((meal, index) => {
        return (
          <div key={meal.meal_name} className="mealCard">
            <div className="flex flex-row items-center gap-x-5">
              <div className="mealNumberCircle font-bold">{index + 1}</div>
              <div>
                <p className="titleText">{meal.meal_name}</p>
                <p className="textDescription">{meal.calories} calories</p>
              </div>
            </div>
            <div className="mealNutrition">
              <p className="mealDescription">
                {meal.protein}g <span className="font-light">Protein</span>
              </p>
              <p className="mealDescription">
                {meal.carbohydrates}g <span className="font-light">Carbs</span>
              </p>
              <p className="mealDescription">
                {meal.fat}g <span className="font-light">Fat</span>
              </p>
            </div>
            <IngredientsAccordian meal={meal}></IngredientsAccordian>
            <InstructionsAccordian meal={meal}></InstructionsAccordian>
          </div>
        );
      })}
    </div>
  );
}
