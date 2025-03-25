import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { docClient } from "~/server/utils/dynamodb";
import type { ProductInput, Product } from "~/types/Product";

const TABLE_NAME = process.env.DYNAMODB_TABLE || "Products";

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === "GET") {
    // Fetch all products
    try {
      const { Items } = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAME,
        })
      );
      return Items || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to fetch products",
      });
    }
  }

  if (method === "POST") {
    // Create a new product
    try {
      const body = await readBody<ProductInput>(event);
      const newProduct: Product = {
        id: uuidv4(),
        ...body,
        total_amount: body.price * body.quantity,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newProduct,
        })
      );

      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to create product",
      });
    }
  }
});
