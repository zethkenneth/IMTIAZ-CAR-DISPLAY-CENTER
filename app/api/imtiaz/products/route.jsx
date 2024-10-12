import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";
import Products from "../../../../models/products.js";

export async function GET() {
  try {
    const P = await Products.findAll();

    return NextResponse.json({
      status: 200,
      data: P,
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
      description2,
      model,
      year,
      brand,
      type,
      category,
      price,
      quantityonhand,
      reorderlevel,
      imageUrl,
    } = await req.json();

    const result = await Products.create({
      productName: productname,
      description: description,
      description2: description2,
      model: model,
      year: year,
      brand: brand,
      type: type,
      category: category,
      price: price,
      quantityOnHand: quantityonhand,
      reorderLevel: reorderlevel,
      imageUrl: imageUrl,
    })
      .then(() => {
        console.log("Product created successfully");
      })
      .catch((err) => {
        console.error("Error creating product:", err);
      });

    return NextResponse.json({
      status: 200,
      message: "Product has been insert successfully",
      data: result,
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
