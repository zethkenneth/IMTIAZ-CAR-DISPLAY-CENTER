import { NextResponse } from "next/server";
import Customer from "../../../../models/customer";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received customer data:", body); // Debug log
    
    const customer = await Customer.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone // Make sure this matches the frontend field name
    });

    return NextResponse.json({
      status: 200,
      message: "Customer created successfully",
      id: customer.customerID
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
    const url = new URL(req.url);
    const firstName = url.searchParams.get('firstName');
    const lastName = url.searchParams.get('lastName');

    const customer = await Customer.findOne({
      where: {
        firstName,
        lastName
      }
    });

    if (!customer) {
      return NextResponse.json({
        status: 404,
        message: "Customer not found"
      });
    }

    return NextResponse.json({
      status: 200,
      id: customer.customerID,
      customer
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