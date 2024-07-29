import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET( req, { params } ) {
  try {
    const { id } = params;

    const customers = await db.query(
      `SELECT * FROM "Customers" WHERE "customerID" = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return NextResponse.json({
      status: 200,
      data: customers,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch customers",
      details: error,
    });
  }
}