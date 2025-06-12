"use server"
import { auth0 } from "@/lib/auth0";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { unstable_cache } from "next/cache";

export default async function fetchMealPlan() {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const session = await auth0.getSession()
  const user = session?.user.sub

  const getPreviousMeal = async () => {
    const command = new QueryCommand({
      TableName: "NutritionTable",
      KeyConditionExpression: "user_id = :userId",
      ExpressionAttributeValues: {
        ":userId": user,
      },
      ScanIndexForward: false,
      Limit: 1,
    });
    const response = await docClient.send(command);
    return response
  }
  const data = unstable_cache(getPreviousMeal, [], { tags: ["previousMeal", "meal"], revalidate: 3600})
  return data()
}