import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET() {
  try {
    const Products = await db.query(`SELECT * FROM "Products"`, {
      type: QueryTypes.SELECT,
    });

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
    const {
      productname,
      description,
      brand,
      price,
      cost,
      quantityonhand,
      reorderlevel,
    } = await req.json();

    await db.query(
      `INSERT INTO "Products" ("ProductName", "Description", "Brand", "Price", "Cost", "QuantityOnHand", "ReorderLevel") VALUES ('${productname}', '${description}', '${brand}',  '${price}', '${cost}', '${quantityonhand}', '${reorderlevel}')`,
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
