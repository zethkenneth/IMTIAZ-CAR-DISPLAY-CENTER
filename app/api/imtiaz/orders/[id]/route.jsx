import { NextResponse } from "next/server";
import db from "../../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";

export async function GET( req, { params } ) {
  try {
    const { id } = params;
    const url = new URL(req.url); // Create a URL object from the request
    const code = url.searchParams.get('code');

    const Orders = await db.query(
      `SELECT * FROM "Orders" WHERE "orderID" = ${code}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return NextResponse.json({
      status: 200,
      orderDetails: Orders,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Orders",
      details: error,
    });
  }
}

export async function POST( req, { params } ) {
  try {
    const { id } = params;
    const {
        code
    } = await req.json();
    
    const config = {
      method: "GET",
      url: `https://api.paymongo.com/v1/links?reference_number=${query}`,
      headers: {
        accept: "application/json",
        authorization: "Basic c2tfdGVzdF9qdGNMOFFoanVHcGZ4RXJGZlNGR2RpVEo6",
        "content-type": "application/json",
      },
    };

    const paymentResult = await axios(config)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log(paymentResult)
    const paymentStatusResult = paymentResult.data.data.attributes.status;

    const paymentStatus = paymentStatusResult === 'unpaid'? "Pending": "Completed";


    const updatedRows = await db.query(
      `UPDATE "Orders"
       SET "paymentStatus" = :paymentStatus
       WHERE "orderID" = :orderID`,
      {
        replacements: { paymentStatus: paymentStatus, orderID: code },
        type: QueryTypes.UPDATE,
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Checkout Successful",
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Orders",
      details: error,
    });
  }
}
