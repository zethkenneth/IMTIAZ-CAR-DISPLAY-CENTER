import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function POST(req) {
  try {
    const { paymentCode, cashReceived, change } = await req.json();

    const updatedRows = await db.query(
      `UPDATE "Orders"
       SET "paymentStatus" = 'Completed',
           "paymentMethod" = 'CASH'
       WHERE "paymentCode" = :paymentCode`,
      {
        replacements: { paymentCode },
        type: QueryTypes.UPDATE,
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Cash payment processed successfully"
    });
  } catch (error) {
    console.error("Error processing cash payment:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to process cash payment",
      details: error.message
    });
  }
}
