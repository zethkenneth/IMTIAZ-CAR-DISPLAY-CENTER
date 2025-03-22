import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";
import axios from "axios";

export async function GET(req) {
    try {
      const url = new URL(req.url); // Create a URL object from the request
      const code = url.searchParams.get('code');
      
    
      const config = {
        method: "GET",
        url: `https://api.paymongo.com/v1/links?reference_number=${code}`,
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
          throw error;
        });

      const paymentStatusResult = paymentResult[0].attributes.status;
      const paymentStatus = paymentStatusResult === "unpaid" ? "Pending" : "Completed";

      await db.query(
        `UPDATE "Orders"
        SET "paymentStatus" = :paymentStatus,
            "paymentMethod" = 'ONLINE'
        WHERE "paymentCode" = :paymentCode`,
        {
          replacements: { 
            paymentStatus: paymentStatus, 
            paymentCode: code 
          },
          type: QueryTypes.UPDATE,
        }
      );

      return NextResponse.json({
        status: 200,
        message: "Payment status updated",
        paymentStatus: paymentStatus
      });
    } catch (error) {
      console.error("Error updating payment status: ", error);
      return NextResponse.json({
        status: 500,
        error: "Failed to update payment status",
        details: error.message,
      });
    }
}