import { NextResponse } from "next/server";
import  Customers  from "../../../../models"
import db from "../../../../utils/sequelize.js"
import { QueryTypes } from "sequelize"


export async function GET() {
  try {
    const customers = await db.query(`SELECT * FROM "Customers"`, {
      type: QueryTypes.SELECT,
    });

    return NextResponse.json({
      status: 200,
      data: customers
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ 
      status: 500,
      error: "Failed to fetch customers",
      details: error
     });
  }
}

export async function POST(req) {
  try {
   const { firstname, lastname, email, phone } = await req.json();

   await db.query(
     `INSERT INTO "Customers" ("FirstName", "LastName", "Email", "Phone") VALUES ('${firstname}','${lastname}','${email}','${phone}')`,
     {
       type: QueryTypes.INSERT,
     }  
   );

    return NextResponse.json({
      status: 200,
      message: "Customer has been insert successfully",
    });

  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to Create Customer",
      details: error,
    });
  }
}