export default function MealPlanNutrition({
  protein,
  calories,
  carbs,
  fats,
}: {
  protein: number;
  calories: number;
  carbs: number;
  fats: number;
}) {
  return (
    <div className="cardPage">
      <h1 className="titleText">Total Nutritional Information</h1>
      <ul className="grid grid-cols-2 cardText gap-2">
        <li className="card">
          <p>{calories}</p>
          <p className="cardDescription">Calories kcal</p>
        </li>
        <li className="card">
          <p>{protein}</p>
          <p className="cardDescription">Protein g</p>
        </li>
        <li className="card">
          <p>{carbs}</p>
          <p className="cardDescription">Carbohydrates g</p>
        </li>
        <li className="card">
          <p>{fats}</p>
          <p className="cardDescription">Fats g</p>
        </li>
      </ul>
    </div>
  );
}
