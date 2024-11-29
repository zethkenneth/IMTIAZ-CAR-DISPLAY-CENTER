import { NextResponse } from "next/server";
import Order from "@models/order.js";
import axios from "axios";

export async function GET() {
    try {
      // Fetch all pending orders
      const pendingOrders = await Order.findAll({
        where: {
          paymentStatus: "Pending",
        },
      });
  
      // Base URL and headers for PayMongo API requests
      const baseURL = "https://api.paymongo.com/v1/links";
      const headers = {
        accept: "application/json",
        authorization: "Basic c2tfdGVzdF9qdGNMOFFoanVHcGZ4RXJGZlNGR2RpVEo6",
        "content-type": "application/json",
      };
  
      // Initialize an array to store the updated order statuses
      const updatedOrders = await Promise.all(
        pendingOrders.map(async (order) => {
          const referenceNumber = order.referenceNumber; // Assuming `referenceNumber` exists in your order model
  
          // Make the API request to get the payment status
          const config = {
            method: "GET",
            url: `${baseURL}?reference_number=${referenceNumber}`,
            headers,
          };
  
          try {
            const response = await axios(config);
            const data = response.data.data;
  
            console.log("Result of fetch payment: ", data);
            // Check if the payment is successful by validating the `payments` array
            const paymentStatus = data.attributes.payments.length > 0 ? "Complete" : "Pending";
  
            // Update the order's payment status in the database
            await Order.update(
              { paymentStatus },
              { where: { orderID: order.orderID } } // Assuming `orderID` is the primary key
            );
  
            // Return the updated order data with payment details
            return {
              orderID: order.orderID,
              ...data.attributes,
            };
          } catch (error) {
            console.error(`Error fetching payment status for order ${order.orderID}:`, error);
            // If the API call fails, include the original order data
            return {
              orderID: order.orderID,
              error: "Failed to fetch payment status",
            };
          }
        })
      );
  
      // Return the final response
      return NextResponse.json({
        status: 200,
        data: updatedOrders,
      });
    } catch (error) {
      console.error("Error fetching orders: ", error);
      return NextResponse.json({
        status: 500,
        error: "Failed to fetch orders",
        details: error.message,
      });
    }
}