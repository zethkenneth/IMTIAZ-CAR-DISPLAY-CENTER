import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function POST(req) {
  try {
    const { paymentCode, cashReceived, change } = await req.json();

    // Get the order details first
    const order = await db.query(
      `SELECT "orderID" FROM "Orders" WHERE "paymentCode" = :paymentCode`,
      {
        replacements: { paymentCode },
        type: QueryTypes.SELECT,
      }
    );

    if (!order || order.length === 0) {
      throw new Error('Order not found');
    }

    const orderID = order[0].orderID;

    // Get the products in this order
    const orderProducts = await db.query(
      `SELECT "productID" FROM "OrderDetails" WHERE "orderID" = :orderID`,
      {
        replacements: { orderID },
        type: QueryTypes.SELECT,
      }
    );

    // Start a transaction
    const transaction = await db.transaction();

    try {
      // Update order status
      await db.query(
        `UPDATE "Orders"
         SET "paymentStatus" = 'Completed',
             "paymentMethod" = 'CASH'
         WHERE "paymentCode" = :paymentCode`,
        {
          replacements: { paymentCode },
          type: QueryTypes.UPDATE,
          transaction
        }
      );

      // Update product status to 'Sold'
      for (const product of orderProducts) {
        await db.query(
          `UPDATE "Products"
           SET status = 'Sold'
           WHERE "productID" = :productID
           AND status = 'Reserved'`,
          {
            replacements: { productID: product.productID },
            type: QueryTypes.UPDATE,
            transaction
          }
        );
      }

      // Commit the transaction
      await transaction.commit();

      return NextResponse.json({
        status: 200,
        message: "Cash payment processed successfully"
      });
    } catch (error) {
      // Rollback in case of error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error processing cash payment:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to process cash payment",
      details: error.message
    });
  }
}
