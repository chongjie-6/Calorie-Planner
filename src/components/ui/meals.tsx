import { MealProps } from "@/app/types/types";

export default function Meals({ meals }: { meals: MealProps[] }) {
  return (
    <div className="allMealCard">
      {meals.map((meal, index) => {
        return (
          <div key={meal.meal_name} className="mealCard">
            <div className="flex flex-row items-center gap-x-5">
              <div className="flex items-center justify-center rounded-full p-5 bg-cyan-500 text-white w-10 h-10">
                {index + 1}
              </div>
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
          </div>
        );
      })}
    </div>
  );
}
