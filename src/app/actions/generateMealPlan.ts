"use server";
import { GoogleGenAI } from "@google/genai";

type GenerateMealPlanProps = {
    calories: number | null;
    carbs: number | null;
    fats: number | null;
    meals: number | null;
    protein: number | null;
};

export default async function generateMealPlan(
    nutrition_info: GenerateMealPlanProps
): Promise<string | undefined> {
    const PROMPT = `You are a chef creating single-day meal plans based on nutritional inputs: Calories, Protein, Carbohydrates, Fat, and Number of Meals. 
    If a value is 0, you may choose it freely. Create a meal plan that meets the specified requirements, with detailed cooking instructions for each meal.
    Use the following input values:${nutrition_info.calories} ${nutrition_info.protein} ${nutrition_info.carbs} ${nutrition_info.fats} ${nutrition_info.meals}
    Respond in this JSON format:
    {
    "total_calories",
    "total_protein",
    "total_carbohydrates",
    "total_fat",
    "number_of_meals",
    "meals": [
        {
        "meal_name",
        "calories",
        "protein",
        "carbohydrates",
        "fat",
        "ingredients": [
            { "item", "quantity", "unit" }
        ],
        "instructions": []
        }
    ]
    } please use units of kcal for calories and g for everything else`;

    // Create Gemini Client
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API });

    try {
        // Generate response based on prompt
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: PROMPT,
        });

        const formattedResponse = response.text
            ?.replace("json", "")
            .replace("```", "")
            .replace("```", "");

        return formattedResponse;

    } catch (e) {
        console.log(e);
    }
}
