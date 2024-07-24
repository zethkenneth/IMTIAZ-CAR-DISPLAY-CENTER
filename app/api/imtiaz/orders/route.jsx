import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET() {
  try {
    const Orders = await db.query(`SELECT * FROM "Orders"`, {
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
    const {
      customerId,
      paymentCode,
      userId, 
      totalAmount
    } = await req.json();

    await db.query(
      `INSERT INTO "Orders" ("PaymentCode", "CustomerID", "OrderDate", "TotalAmount", "UserID") VALUES( '${paymentCode}',${customerId}, now(),  ${totalAmount}, ${userId} )`,
      {
        type: QueryTypes.INSERT,
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Order has been insert successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to Create Order",
      details: error,
    });
  }
}
