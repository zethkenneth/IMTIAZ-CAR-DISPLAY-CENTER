import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET( req ) {
  try {
    const url = new URL(req.url); // Create a URL object from the request
    const code = url.searchParams.get('code');

    const Orders = await db.query(
      `SELECT * FROM "Orders" WHERE "paymentCode" = :code`,
      {
        replacements: { code }, // Safely inject the 'code' into the query
        type: QueryTypes.SELECT,
      }
    );

    const orderID = Orders[0].orderID;
    
    const orderDetails = await db.query(
      `
        SELECT 
          p."productID",
          p."productName",
          p."description",
          p."description2",
          p."model",
          p."year",
          p."brand",
          p."type",
          p."category",
          p."price",
          p."imageUrl",
          o."quantity",
          o."unitPrice",
          o."totalPrice"
        FROM 
          "OrderDetails" AS o
        JOIN 
          "Products" AS p
        ON 
          o."productID" = p."productID"
        WHERE 
          o."orderID" = :orderID
      `,
      {
        replacements: { orderID }, // Safely inject the 'orderID' value into the query
        type: QueryTypes.SELECT,
      }
    );

    const order = {
      ...Orders[0],
      "orderDetails": orderDetails
    };


    return NextResponse.json({
      status: 200,
      orderDetails: order,
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
