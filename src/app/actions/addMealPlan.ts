"use server"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
export default async function AddMealPlan(){
    try{
        // Create client and push data into dynamodb
        const client = new DynamoDBClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new PutCommand({
            TableName: "CalorieTable",
            Item: {
                user_id: "USER#1234",
                name: "Alice",
                age: "29",
            },
        });

        const res = await docClient.send(command);
        console.log(res)
    }
    catch(e){
        console.log(e)
    }
}