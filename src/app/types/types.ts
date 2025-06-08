export type MealPlanProps = {
  date_time: string;
  total_calories: number;
  total_protein: number;
  total_carbohydrates: number;
  total_fat: number;
  number_of_meals: number;
  meals: Array<MealProps>
};

export type MealProps = {
  meal_name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  ingredients: Array<IngredientProps>;
  instructions: Array<string>;
};

export type IngredientProps = {
   item: string; 
   quantity: number; 
   unit: string 
}
