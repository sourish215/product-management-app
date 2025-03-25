import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const config = useRuntimeConfig();

// Configure AWS credentials and region
const client = new DynamoDBClient({
  region: config.AWS_REGION || "local",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

export const docClient = DynamoDBDocumentClient.from(client);
