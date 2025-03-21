import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone } = await req.json();

    // Create new customer
    const result = await db.query(
      `INSERT INTO "Customers" ("firstName", "lastName", "email", "phone")
       VALUES (:firstName, :lastName, :email, :phone)
       RETURNING "customerID"`,
      {
        replacements: { 
          firstName, 
          lastName, 
          email, 
          phone
        },
        type: QueryTypes.INSERT,
      }
    );

    const customerId = result[0][0].customerID;

    return NextResponse.json({
      status: 200,
      customerId: customerId,
      message: "Customer created successfully"
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create customer",
      details: error.message
    });
  }
}

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