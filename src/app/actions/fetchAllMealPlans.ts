import { auth0 } from "@/lib/auth0";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { unstable_cache } from "next/cache";

export const fetchAllMealPlan = async () => {
  const session = await auth0.getSession();
  const user = session?.user.sub;

  const getAllData = async () => {
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const command = new QueryCommand({
      TableName: "NutritionTable",
      KeyConditionExpression: "user_id = :userId",
      ExpressionAttributeValues: {
        ":userId": user,
      },
      ScanIndexForward: false,
    });

    const response = await docClient.send(command);
    return response;
  }
  const data = unstable_cache(getAllData, [], {tags:["allMeals", "meal"], revalidate: 3600})
  return data ()
}



