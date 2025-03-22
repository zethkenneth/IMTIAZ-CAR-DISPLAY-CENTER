import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');

    if (!firstName || !lastName) {
      return NextResponse.json({
        status: 400,
        error: "First name and last name are required"
      });
    }

    const customer = await db.query(
      `SELECT "customerID" 
       FROM "Customers" 
       WHERE LOWER("firstName") = LOWER(:firstName) 
       AND LOWER("lastName") = LOWER(:lastName)
       LIMIT 1`,
      {
        replacements: { 
          firstName, 
          lastName 
        },
        type: QueryTypes.SELECT,
      }
    );

    if (customer && customer.length > 0) {
      return NextResponse.json({
        status: 200,
        customerId: customer[0].customerID,
        message: "Customer found"
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Customer not found"
    });

  } catch (error) {
    console.error("Error checking customer:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to check customer",
      details: error.message
    });
  }
} 