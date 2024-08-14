import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize";
import { QueryTypes } from "sequelize";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("code");

  let qs = "";

  if (query) {
    qs = `SELECT * FROM "Orders" INNER JOIN "OrderDetails" ON "Orders"."orderID" = "OrderDetails"."orderID" WHERE "paymentCode" = '${query}'`;
  } else {
    qs = `select * from "OrderDetails"`;
  }

  try {
    const Orders = await db.query(qs, {
      type: QueryTypes.SELECT,
    });

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

export async function POST(req) {
  try {
    const { orderID, productID, quantity, unitPrice, totalPrice } =
      await req.json();

    console.log("asdasd", {
      orderID,
      productID,
      quantity,
      unitPrice,
      totalPrice,
    });

    await db.query(
      `INSERT INTO "OrderDetails" ("orderID", "productID", "quantity", "unitPrice", "totalPrice") VALUES (${orderID}, ${productID}, ${quantity}, ${unitPrice}, ${totalPrice});`,
      {
        type: QueryTypes.INSERT,
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Order Details has been insert successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to Create Order Details",
      details: error,
    });
  }
}
