import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type") || "daily";

  let dateFilter;
  switch (type) {
    case "weekly":
      dateFilter = "AND o.\"orderDate\" >= CURRENT_DATE - INTERVAL '7 days'";
      break;
    case "monthly":
      dateFilter = "AND EXTRACT(MONTH FROM o.\"orderDate\") = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM o.\"orderDate\") = EXTRACT(YEAR FROM CURRENT_DATE)";
      break;
    default: // daily
      dateFilter = "AND DATE(o.\"orderDate\") = CURRENT_DATE";
  }

  try {
    // Orders query based on transactions structure
    const ordersQuery = `
      SELECT o.*, 
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
      ${dateFilter}
      ORDER BY o."orderDate" DESC
    `;

    // Sales summary based on completed transactions
    const salesSummaryQuery = `
      SELECT 
        COUNT(DISTINCT o."orderID") as "totalOrders",
        COUNT(DISTINCT o."customerID") as "uniqueCustomers",
        SUM(o."totalAmount") as "totalSales",
        AVG(o."totalAmount") as "averageOrderValue",
        MAX(o."totalAmount") as "highestOrder",
        MIN(o."totalAmount") as "lowestOrder"
      FROM "Orders" o
      WHERE o."paymentStatus" = 'Completed'
      ${dateFilter}
    `;

    // Top products from completed transactions
    const topProductsQuery = `
      SELECT 
        p."productID",
        p."productName",
        p."category",
        p."brand",
        p."type",
        SUM(od."quantity") as "totalQuantity",
        SUM(od."totalPrice") as "totalRevenue",
        COUNT(DISTINCT o."orderID") as "orderCount"
      FROM "OrderDetails" od
      JOIN "Orders" o ON od."orderID" = o."orderID"
      JOIN "Products" p ON od."productID" = p."productID"
      WHERE o."paymentStatus" = 'Completed'
      ${dateFilter}
      GROUP BY p."productID", p."productName", p."category", p."brand", p."type"
      ORDER BY "totalRevenue" DESC
      LIMIT 10
    `;

    // Payment analytics from completed transactions
    const paymentAnalyticsQuery = `
      SELECT 
        o."paymentCode",
        COUNT(DISTINCT o."orderID") as "count",
        SUM(o."totalAmount") as "totalAmount",
        AVG(o."totalAmount") as "averageAmount",
        COUNT(*) * 100.0 / (
          SELECT COUNT(*) 
          FROM "Orders" o2 
          WHERE o2."paymentStatus" = 'Completed' 
          ${dateFilter.replace(/o\./g, 'o2.')}
        ) as "percentage"
      FROM "Orders" o
      WHERE o."paymentStatus" = 'Completed'
      ${dateFilter}
      GROUP BY o."paymentCode"
    `;

    const [orders, salesSummary, topProducts, paymentAnalytics] = await Promise.all([
      db.query(ordersQuery, { type: QueryTypes.SELECT }),
      db.query(salesSummaryQuery, { type: QueryTypes.SELECT }),
      db.query(topProductsQuery, { type: QueryTypes.SELECT }),
      db.query(paymentAnalyticsQuery, { type: QueryTypes.SELECT })
    ]);

    return NextResponse.json({
      status: 200,
      data: {
        orders,
        salesSummary: salesSummary[0],
        topProducts,
        paymentAnalytics,
        reportType: type
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch report data",
      details: error,
    });
  }
} 