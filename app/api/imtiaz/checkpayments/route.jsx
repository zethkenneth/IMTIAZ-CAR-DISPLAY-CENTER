import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";
import axios from "axios";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
      const code = request.nextUrl.searchParams.get('code');
      if (!code) {
        return NextResponse.json({
          status: 400,
          error: "Payment code is required"
        });
      }
      
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

      // If payment is completed, update product status to 'Sold'
      if (paymentStatus === "Completed") {
        // Get the order details first
        const order = await db.query(
          `SELECT "orderID" FROM "Orders" WHERE "paymentCode" = :code`,
          {
            replacements: { code },
            type: QueryTypes.SELECT,
          }
        );

        if (!order || order.length === 0) {
          throw new Error('Order not found');
        }

        const orderID = order[0].orderID;

        // Get the products in this order
        const orderProducts = await db.query(
          `SELECT "productID" FROM "OrderDetails" WHERE "orderID" = :orderID`,
          {
            replacements: { orderID },
            type: QueryTypes.SELECT,
          }
        );

        // Start a transaction
        const transaction = await db.transaction();

        try {
          // Update order status
          await db.query(
            `UPDATE "Orders"
             SET "paymentStatus" = :paymentStatus,
                 "paymentMethod" = 'ONLINE'
             WHERE "paymentCode" = :code`,
            {
              replacements: { 
                paymentStatus, 
                code 
              },
              type: QueryTypes.UPDATE,
              transaction
            }
          );

          // Update product status to 'Sold'
          for (const product of orderProducts) {
            await db.query(
              `UPDATE "Products"
               SET status = 'Sold'
               WHERE "productID" = :productID
               AND status = 'Reserved'`,
              {
                replacements: { productID: product.productID },
                type: QueryTypes.UPDATE,
                transaction
              }
            );
          }

          // Commit the transaction
          await transaction.commit();
        } catch (error) {
          // Rollback in case of error
          await transaction.rollback();
          throw error;
        }
      } else {
        // If payment is still pending, just update the order status
        await db.query(
          `UPDATE "Orders"
           SET "paymentStatus" = :paymentStatus,
               "paymentMethod" = 'ONLINE'
           WHERE "paymentCode" = :code`,
          {
            replacements: { 
              paymentStatus, 
              code 
            },
            type: QueryTypes.UPDATE,
          }
        );
      }

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