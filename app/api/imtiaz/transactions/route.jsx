import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

// Add this export to mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Add connection verification
    await db.authenticate();
    console.log('Database connection has been established successfully.');

    // Add logging for query execution
    console.log('Executing transaction query...');
    
    const Orders = await db.query(
      `SELECT o.*, 
              o."paymentMethod",
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
                         p."chasis", 
                         p."engineNumber", 
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
       ORDER BY o."orderID" DESC, o."orderDate" DESC
       `,
      { 
        type: QueryTypes.SELECT,
        logging: console.log // Enable query logging
      }
    );

    // Add logging for results
    console.log('Query executed successfully');
    console.log('Number of orders found:', Orders.length);

    return new NextResponse(JSON.stringify({
      status: 200,
      data: Orders,
      timestamp: new Date().getTime(),
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, private, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'ETag': null
      }
    });
  } catch (error) {
    console.error("Detailed Error: ", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });
    
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Orders",
      message: error.message,
      timestamp: new Date().getTime()
    }, { status: 500 });
  }
}