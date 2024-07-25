import { NextResponse } from "next/server";
import db from "../../../../../../utils/sequelize";
import { QueryTypes } from "sequelize";

export async function GET( req, { params } ) {
  try {
    const { id } = params;

    const Orders = await db.query(
      `SELECT * FROM "OrderDetails" WHERE "OrderID" = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
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

export async function POST(req) {
  try {
    const { firstname, lastname, email, phone } = await req.json();

    await db.query(
      `INSERT INTO "Orders" ("FirstName", "LastName", "Email", "Phone") VALUES ('${firstname}','${lastname}','${email}','${phone}')`,
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
