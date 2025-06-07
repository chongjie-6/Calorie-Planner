import { auth0 } from "@/lib/auth0";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export default async function fetchMealPlan(){
      const client = new DynamoDBClient({});
      const docClient = DynamoDBDocumentClient.from(client);

      const session = await auth0.getSession()
      const user = session?.user.sub

      const command = new GetCommand({
        TableName: "CalorieTable",
        Key: {
          'user_id': user,
        },
      });
    
      const response = await docClient.send(command);
      return response
}