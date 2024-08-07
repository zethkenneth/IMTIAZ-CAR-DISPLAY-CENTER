import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET(req) {

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("data");

  let sqlQuery = ""

  try {
     switch (query) {
       case "data1":
        //total transactions per Month
         sqlQuery = `SELECT COUNT(*) 
          FROM "Orders" 
          WHERE EXTRACT(YEAR from "Orders"."orderDate" ) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM "Orders"."orderDate" ) = EXTRACT(MONTH FROM CURRENT_DATE)`;
         break;

       case "data2":
         //Total Day Sales
         sqlQuery = `SELECT SUM("totalAmount") AS today_sales FROM "Orders" WHERE EXTRACT(DAY FROM "orderDate") = EXTRACT(DAY FROM CURRENT_DATE)`;
         break;

       case "data3":
         // Pending Order
         sqlQuery = `SELECT count(*) FROM "Orders" where "paymentStatus" = 'Pending'`;
         break;

       default:
         console.log("Unknown chart type selected");
         // Code to handle unknown chart types or errors goes here
         break;
     }



         const resultdata = await db.query(sqlQuery,
           {
             type: QueryTypes.SELECT,
           }
         );


    return NextResponse.json({
      status: 200,
      data: resultdata,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch customers",
      details: error,
    });
  }
}