import { NextResponse } from "next/server";
import db from "../../../../../../utils/sequelize";
import { QueryTypes } from "sequelize";
import Product from "@models/products";

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    // First, get the order details to know which products to restore
    const orderDetails = await db.query(
      `SELECT od."productID", od."quantity"
       FROM "OrderDetails" od
       WHERE od."orderID" = :orderID`,
      {
        replacements: { orderID: id },
        type: QueryTypes.SELECT,
      }
    );

    // Update the order status
    const updatedOrder = await db.query(
      `UPDATE "Orders" 
       SET "paymentStatus" = 'Cancelled'
       WHERE "orderID" = :orderID
       AND "paymentStatus" NOT IN ('Completed', 'Cancelled')
       RETURNING *`,
      {
        replacements: { orderID: id },
        type: QueryTypes.UPDATE,
      }
    );

    if (!updatedOrder || updatedOrder.length === 0) {
      return NextResponse.json({
        status: 400,
        error: "Order cannot be cancelled",
      });
    }

    // Restore product quantities
    for (const detail of orderDetails) {
      await db.query(
        `UPDATE "Products"
         SET "quantityOnHand" = "quantityOnHand" + :quantity
         WHERE "productID" = :productID`,
        {
          replacements: { 
            productID: detail.productID,
            quantity: detail.quantity
          },
          type: QueryTypes.UPDATE,
        }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Order cancelled successfully and product quantities restored",
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to cancel order",
      details: error,
    });
  }
} 