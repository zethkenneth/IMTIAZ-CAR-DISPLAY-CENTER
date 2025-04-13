import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone } = await req.json();

    // Create new customer
    const result = await db.query(
      `INSERT INTO "Customers" ("firstName", "lastName", "email", "phone")
       VALUES (:firstName, :lastName, :email, :phone)
       RETURNING "customerID"`,
      {
        replacements: { 
          firstName, 
          lastName, 
          email, 
          phone
        },
        type: QueryTypes.INSERT,
      }
    );

    const customerId = result[0][0].customerID;

    return NextResponse.json({
      status: 200,
      customerId: customerId,
      message: "Customer created successfully"
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create customer",
      details: error.message
    });
  }
}

export async function GET() {
  try {
    const customers = await db.query(`
      WITH CustomerOrders AS (
        SELECT 
          c."customerID",
          c."firstName",
          c."lastName",
          c."email",
          c."phone",
          COUNT(DISTINCT o."orderID") as total_orders,
          COALESCE(SUM(CASE WHEN o."paymentStatus" = 'Completed' THEN o."totalAmount" ELSE 0 END), 0) as total_amount,
          json_agg(
            json_build_object(
              'orderID', o."orderID",
              'orderDate', o."orderDate",
              'paymentStatus', o."paymentStatus",
              'totalAmount', o."totalAmount",
              'productName', (
                SELECT p."productName"
                FROM "OrderDetails" od
                JOIN "Products" p ON p."productID" = od."productID"
                WHERE od."orderID" = o."orderID"
                LIMIT 1
              ),
              'chasis', (
                SELECT p."chasis"
                FROM "OrderDetails" od
                JOIN "Products" p ON p."productID" = od."productID"
                WHERE od."orderID" = o."orderID"
                LIMIT 1
              ),
              'engineNumber', (
                SELECT p."engineNumber"
                FROM "OrderDetails" od
                JOIN "Products" p ON p."productID" = od."productID"
                WHERE od."orderID" = o."orderID"
                LIMIT 1
              )
            )
          ) FILTER (WHERE o."orderID" IS NOT NULL) as orders
        FROM "Customers" c
        LEFT JOIN "Orders" o ON c."customerID" = o."customerID"
        GROUP BY c."customerID", c."firstName", c."lastName", c."email", c."phone"
      )
      SELECT 
        "customerID",
        "firstName",
        "lastName",
        "email",
        "phone",
        COALESCE(total_orders, 0) as "totalOrders",
        COALESCE(total_amount, 0) as "totalAmount",
        COALESCE(orders, '[]'::json) as orders
      FROM CustomerOrders
      ORDER BY total_orders DESC;
    `, {
      type: QueryTypes.SELECT
    });

    return NextResponse.json({
      status: 200,
      data: customers
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch customers",
      details: error.message
    });
  }
}