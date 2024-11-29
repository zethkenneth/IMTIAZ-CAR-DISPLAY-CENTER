import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET() {
  try {
    // Fetch orders with associated order details and product details as a subquery
    const Orders = await db.query(
      `SELECT o.*, 
              CONCAT(c."firstName", ' ', c."lastName") AS "customerName",
              CASE 
                WHEN o."paymentStatus" = 'Completed' THEN 'Paid'
                ELSE o."paymentStatus"
              END AS "status",
              (
                SELECT json_agg(od)
                FROM (
                  SELECT od."productID", 
                         p."productName", 
                         p."description", 
                         p."description2", 
                         p."model", 
                         p."year", 
                         p."brand", 
                         p."type", 
                         p."category", 
                         p."price", 
                         p."quantityOnHand", 
                         p."reorderLevel", 
                         p."imageUrl", 
                         od."quantity", 
                         od."unitPrice", 
                         od."totalPrice"
                  FROM "OrderDetails" od
                  JOIN "Products" p ON od."productID" = p."productID"
                  WHERE od."orderID" = o."orderID"
                ) AS od
              ) AS "orderDetails"
       FROM "Orders" o
       JOIN "Customers" c ON o."customerID" = c."customerID"
       WHERE o."paymentStatus" = 'Completed'
       `,
      { type: QueryTypes.SELECT }
    );

    return NextResponse.json({
      status: 200,
      data: Orders,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Orders",
      details: error,
    });
  }
}