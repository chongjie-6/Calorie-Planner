import { MealProps } from "@/app/types/types";
import IngredientsAccordian from "./ingredientsAccordian";
import InstructionsAccordian from "./instructionsAccordian";

export default function Meals({ meals }: { meals: MealProps[] }) {
  return (
    <ul className="allMealCard">
      {meals &&
        meals.map((meal, index) => {
          return (
            <li key={meal.meal_name} className="mealCard">
              <div className="flex flex-row items-center gap-x-5">
                <div className="mealNumberCircle font-bold">{index + 1}</div>
                <div>
                  <p className="titleText">{meal.meal_name}</p>
                  <p className="textDescription">{meal.calories} calories</p>
                </div>
              </div>
              <ul className="mealNutrition">
                <li className="mealDescription">
                  {meal.protein}g <span className="font-light">Protein</span>
                </li>
                <li className="mealDescription">
                  {meal.carbohydrates}g{" "}
                  <span className="font-light">Carbs</span>
                </li>
                <li className="mealDescription">
                  {meal.fat}g <span className="font-light">Fat</span>
                </li>
              </ul>
              <IngredientsAccordian meal={meal}></IngredientsAccordian>
              <InstructionsAccordian meal={meal}></InstructionsAccordian>
            </li>
          );
        })}
    </ul>
  );
}
