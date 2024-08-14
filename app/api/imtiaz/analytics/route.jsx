import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET(req) {
  let totalOrdersPerMonthQuery = `SELECT COUNT(*) AS totalOrdersPerMonth
  FROM "Orders" 
  WHERE EXTRACT(YEAR FROM "orderDate") = EXTRACT(YEAR FROM CURRENT_DATE)
    AND EXTRACT(MONTH FROM "orderDate") = EXTRACT(MONTH FROM CURRENT_DATE)`;

  let totalSalesTodayQuery = `SELECT SUM("totalAmount") AS totalSalesToday
FROM "Orders"
WHERE EXTRACT(DAY FROM "orderDate") = EXTRACT(DAY FROM CURRENT_DATE)`;

  let pendingOrdersCountQuery = `SELECT COUNT(*) AS pendingOrdersCount
 FROM "Orders"
 WHERE "paymentStatus" = 'Pending'`;

  let lowStockProductsQuery = `SELECT "productID", "productName", "quantityOnHand", "reorderLevel"
FROM "Products"
WHERE "quantityOnHand" < "reorderLevel"`;

  // Query for total sales per month for the whole year
  let yearAnalytic = `
SELECT TO_CHAR(months.month, 'Month') AS month,
COALESCE(SUM(o."totalAmount"), 0) AS totalSales
FROM (
SELECT to_date(month::text, 'MM') AS month
FROM generate_series(1, 12) AS month
) AS months
LEFT JOIN "Orders" o ON EXTRACT(MONTH FROM o."orderDate") = EXTRACT(MONTH FROM months.month)
AND EXTRACT(YEAR FROM o."orderDate") = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY months.month
ORDER BY months.month;
`;

  try {
    // Execute all queries in parallel
    const [
      totalOrdersPerMonthResult,
      totalSalesTodayResult,
      pendingOrdersCountResult,
      lowStockProductsResult,
      yearSales,
    ] = await Promise.all([
      db.query(totalOrdersPerMonthQuery, { type: QueryTypes.SELECT }),
      db.query(totalSalesTodayQuery, { type: QueryTypes.SELECT }),
      db.query(pendingOrdersCountQuery, { type: QueryTypes.SELECT }),
      db.query(lowStockProductsQuery, { type: QueryTypes.SELECT }),
      db.query(yearAnalytic, { type: QueryTypes.SELECT }),
    ]);

    // Format response
    return NextResponse.json({
      status: 200,
      data: {
        totalOrdersPerMonth: totalOrdersPerMonthResult[0].totalorderspermonth,
        totalSalesToday: totalSalesTodayResult[0].totalsalestoday,
        pendingOrdersCount: pendingOrdersCountResult[0].pendingorderscount,
        lowStockProducts: lowStockProductsResult,
        yearSales: yearSales.map((row) => ({
          name: row.month.trim(), // Remove any extra spaces from month names
          value: parseFloat(row.totalsales) || 0, // Convert to number and ensure 0 for null values
        })),
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch data",
      details: error,
    });
  }
}
