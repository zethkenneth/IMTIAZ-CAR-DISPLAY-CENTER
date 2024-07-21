import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET() {
  try {
    const Users = await db.query(`SELECT * FROM "Users"`, {
      type: QueryTypes.SELECT,
    });

    return NextResponse.json({
      status: 200,
      data: Users,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch users",
      details: error,
    });
  }
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    await db.query(
      `INSERT INTO "Users" ("Username", "Password") VALUES ('${username}', '${password}')`,
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
