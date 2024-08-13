import { NextResponse } from "next/server";
import db from "../../../../../../utils/sequelize";
import { QueryTypes } from "sequelize";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const Orders = await db.query(
      `SELECT * FROM "OrderDetails" WHERE "orderID" = ${id}`,
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
