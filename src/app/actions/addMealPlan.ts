"use server"
import { auth0 } from "@/lib/auth0";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { redirect } from "next/navigation";
export default async function AddMealPlan(data: string){
    try{
        // Get user from auth0
        const user = await auth0.getSession();
        
        if (!user) {
            redirect("/auth/login");
        }

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
            TableName: "NutritionTable",
            Item: {
                user_id: user?.user.sub,
                date_time: new Date().toISOString(),
                meal: data,
            },
        });

        const res = await docClient.send(command);
        console.log(res)
    }
    catch(e){
        console.log(e)
    }
}