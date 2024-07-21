import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET( req, { params } ) {
  try {
    const { id } = params;

    const Products = await db.query(
      `SELECT * FROM "Products" WHERE "ProductID" = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return NextResponse.json({
      status: 200,
      data: Products,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Products",
      details: error,
    });
  }
}

export async function POST(req) {
  try {
    const { firstname, lastname, email, phone } = await req.json();

    await db.query(
      `INSERT INTO "Products" ("FirstName", "LastName", "Email", "Phone") VALUES ('${firstname}','${lastname}','${email}','${phone}')`,
      {
        type: QueryTypes.INSERT,
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Product has been insert successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to Create Product",
      details: error,
    });
  }
}
