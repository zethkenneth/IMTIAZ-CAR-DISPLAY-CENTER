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

    // Payment status analytics query
    const paymentStatusAnalyticsQuery = `
      SELECT 
        COUNT(CASE WHEN "paymentStatus" = 'Completed' THEN 1 END) as "paid",
        COUNT(CASE WHEN "paymentStatus" = 'Pending' THEN 1 END) as "pending",
        COUNT(CASE WHEN "paymentStatus" IS NULL OR "paymentStatus" NOT IN ('Completed', 'Pending') THEN 1 END) as "other"
      FROM "Orders" o
      WHERE ${dateFilter.substring(4)}
    `;

    // Updated order trends query to respect report type
    const orderTrendsQuery = `
      SELECT 
        DATE(o."orderDate") as "date",
        COUNT(*) as "totalOrders",
        SUM(CASE WHEN "paymentStatus" = 'Completed' THEN 1 ELSE 0 END) as "paidOrders",
        SUM("totalAmount") as "totalAmount"
      FROM "Orders" o
      WHERE o."orderDate" >= CASE 
        WHEN '${type}' = 'daily' THEN CURRENT_DATE - INTERVAL '7 days'
        WHEN '${type}' = 'weekly' THEN CURRENT_DATE - INTERVAL '4 weeks'
        WHEN '${type}' = 'monthly' THEN CURRENT_DATE - INTERVAL '12 months'
        ELSE CURRENT_DATE - INTERVAL '7 days'
      END
      GROUP BY DATE(o."orderDate")
      ORDER BY "date" DESC
      LIMIT CASE 
        WHEN '${type}' = 'daily' THEN 7
        WHEN '${type}' = 'weekly' THEN 28
        WHEN '${type}' = 'monthly' THEN 365
        ELSE 7
      END
    `;

    const [orders, salesSummary, topProducts, paymentStatusAnalytics, orderTrends] = await Promise.all([
      db.query(ordersQuery, { type: QueryTypes.SELECT }),
      db.query(salesSummaryQuery, { type: QueryTypes.SELECT }),
      db.query(topProductsQuery, { type: QueryTypes.SELECT }),
      db.query(paymentStatusAnalyticsQuery, { type: QueryTypes.SELECT }),
      db.query(orderTrendsQuery, { type: QueryTypes.SELECT })
    ]);

    return NextResponse.json({
      status: 200,
      data: {
        orders,
        salesSummary: salesSummary[0],
        topProducts,
        paymentStatusAnalytics: paymentStatusAnalytics[0],
        orderTrends,
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