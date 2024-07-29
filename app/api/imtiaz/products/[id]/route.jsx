import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET( req, { params } ) {
  try {
    const { id } = params;

    const Products = await db.query(
      `SELECT * FROM "Products" WHERE "productID" = ${id}`,
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
      error: "Failed to fetch Product",
      details: error,
    });
  }
}