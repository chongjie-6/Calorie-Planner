export type MealPlanProps = {
  total_calories: number;
  total_protein: number;
  total_carbohydrates: number;
  total_fat: number;
  number_of_meals: number;
  meals: [
    {
      meal_name: string;
      calories: number;
      protein: number;
      carbohydrates: number;
      fat: number;
      ingredients: Array<{ item: string; quantity: number; unit: string }>;
      instructions: Array<string>;
    }
  ];
};