import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET( req, { params } ) {
  try {
    const { id } = params;

    const Users = await db.query(
      `SELECT * FROM "Users" WHERE "UserID" = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return NextResponse.json({
      status: 200,
      data: Users,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Users",
      details: error,
    });
  }
}

export async function POST(req) {
  try {
    const { firstname, lastname, email, phone } = await req.json();

    await db.query(
      `INSERT INTO "Users" ("FirstName", "LastName", "Email", "Phone") VALUES ('${firstname}','${lastname}','${email}','${phone}')`,
      {
        type: QueryTypes.INSERT,
      }
    );

    return NextResponse.json({
      status: 200,
      message: "User has been insert successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to Create User",
      details: error,
    });
  }
}
