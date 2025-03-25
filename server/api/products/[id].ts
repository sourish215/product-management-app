import {
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "~/server/utils/dynamodb";
import type { ProductInput, Product } from "~/types/Product";

const TABLE_NAME = process.env.DYNAMODB_TABLE || "Products";

export default defineEventHandler(async (event) => {
  const method = event.method;
  const id = getRouterParam(event, "id");

  if (method === "GET") {
    // Fetch a specific product by ID
    try {
      const { Item } = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { id },
        })
      );

      if (!Item) {
        throw createError({
          statusCode: 404,
          message: "Product not found",
        });
      }

      return Item;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to fetch product",
      });
    }
  }

  if (method === "PUT") {
    // Update an existing product
    try {
      const body = await readBody<ProductInput>(event);

      const updatedProduct: Product = {
        id,
        ...body,
        total_amount: body.price * body.quantity,
        updated_at: new Date().toISOString(),
      };

      await docClient.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { id },
          UpdateExpression:
            "SET #name = :name, price = :price, quantity = :quantity, total_amount = :total_amount, updated_at = :updated_at",
          ExpressionAttributeNames: {
            "#name": "name",
          },
          ExpressionAttributeValues: {
            ":name": updatedProduct.name,
            ":price": updatedProduct.price,
            ":quantity": updatedProduct.quantity,
            ":total_amount": updatedProduct.total_amount,
            ":updated_at": updatedProduct.updated_at,
          },
        })
      );

      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to update product",
      });
    }
  }

  if (method === "DELETE") {
    // Delete a product
    try {
      await docClient.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { id },
        })
      );

      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to delete product",
      });
    }
  }
});
