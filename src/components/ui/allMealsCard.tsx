import { MealPlanProps } from "@/app/types/types";

export default function AllMealsCards({
  mealPlan,
  date_time,
}: {
  mealPlan: MealPlanProps | undefined;
  date_time: string | undefined;
}) {
  return (
    <div className="flex flex-col max-w-3xl w-full mt-2">
      <div className="accordianTitle bg-cyan-700 rounded-b-none border-none">
        <h2 className="titleText px-2">{date_time}</h2>
        <p>{mealPlan?.total_calories} kcal</p>
      </div>
      {mealPlan?.meals.map((meal, index) => (
        <p
          className="px-3 text-sm text-gray-900 bg-zinc-600 last:rounded-b-md last:pb-2"
          key={index}
        >
          {meal.meal_name}
        </p>
      ))}
    </div>
  );
}
