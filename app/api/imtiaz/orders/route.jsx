import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";
import OrderDetail from "@models/orderdetails.js";
import Order from "@models/order.js";
import Product from '@models/products.js';

export async function GET(req) {
  try {
    // Fetch orders with associated order details and product details as a subquery
    const Orders = await db.query(
      `SELECT o.*, 
              CONCAT(c."firstName", ' ', c."lastName") AS "customerName",
              CASE 
                WHEN o."paymentStatus" = 'Completed' THEN 'Paid'
                ELSE o."paymentStatus"
              END AS "status",
              (
                SELECT json_agg(od)
                FROM (
                  SELECT od."productID", 
                         p."productName", 
                         p."description", 
                         p."description2", 
                         p."model", 
                         p."year", 
                         p."brand", 
                         p."type", 
                         p."category", 
                         p."price", 
                         p."quantityOnHand", 
                         p."reorderLevel", 
                         p."imageUrl", 
                         od."quantity", 
                         od."unitPrice", 
                         od."totalPrice"
                  FROM "OrderDetails" od
                  JOIN "Products" p ON od."productID" = p."productID"
                  WHERE od."orderID" = o."orderID"
                ) AS od
              ) AS "orderDetails"
       FROM "Orders" o
       JOIN "Customers" c ON o."customerID" = c."customerID"
       ORDER BY o."orderID" DESC`,
      { type: QueryTypes.SELECT }
    );

    return NextResponse.json({
      status: 200,
      data: Orders,
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

/**
 * EXPECTED JSON BODY 
 * 
 * {
      "customerId": "1",
      "userId": "2",
      "paymentCode": "t9NDbqj",
      "totalAmount": "4000000"
      "products": [
        {
          "orderID": "1",
          "productID": "2",
          "quantity": "4",
          "unitPrice": "50000",
          "totalPrice": "200000"
        }
      ]
  }
 * 
 * @param {HTTP REQUEST} req 
 * @returns 
 */

async function registerOrderDetails(orderID, orderProducts) {
  try {

    const orderDetails = orderProducts.map((product) => ({
      orderID, // Use the provided orderID for all products
      productID: product.productID,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      totalPrice: product.quantity * product.unitPrice, // Calculate total price
    }));

    // Use bulkCreate for optimized batch insertion
    const registeredOrderDetails = await OrderDetail.bulkCreate(orderDetails);

    return registeredOrderDetails;
  } catch (error) {
    console.error("Error registering order details:", error);
    throw error;
  }
}

async function updateProductStocks(products) {
  try {
    // Extract all product IDs from the input array
    const productIDs = products.map((product) => product.productID);

    // Retrieve all products related to the IDs
    const existingProducts = await Product.findAll({
      where: {
        productID: productIDs,
      },
    });

    if (!existingProducts || existingProducts.length === 0) {
      throw new Error("No products found for the provided IDs");
    }

    // Create an update promise for each product
    const updatePromises = existingProducts.map((existingProduct) => {
      const matchingProduct = products.find(
        (p) => p.productID === existingProduct.productID
      );

      if (!matchingProduct) {
        throw new Error(`Product with ID ${existingProduct.productID} not found in the input data`);
      }

      // Update the stock (subtract the quantity)
      const updatedQuantity = existingProduct.quantityOnHand - matchingProduct.quantity;

      if (updatedQuantity < 0) {
        throw new Error(`Insufficient stock for product ID ${existingProduct.productID}`);
      }

      // Update the product in the database
      return existingProduct.update({ quantityOnHand: updatedQuantity });
    });

    // Await all updates
    await Promise.all(updatePromises);

    console.log("Product stocks updated successfully");
  } catch (error) {
    console.error("Error updating product stocks: ", error);
    throw error;
  }
}
  
export async function POST(req) {
  try {
    const { customerId, userId, paymentCode, totalAmount, products } = await req.json();

    if (!customerId) {
      return NextResponse.json({
        status: 400,
        error: "Customer ID is required"
      });
    }

    // Create the order with proper customer ID
    const order = await Order.create({
      paymentCode: paymentCode,
      customerID: customerId,
      orderDate: new Date(),
      totalAmount: totalAmount,
      userID: userId,
      paymentStatus: "Pending",
    });

    const orderDetails = await registerOrderDetails(order.orderID, products);
    await updateProductStocks(products);

    return NextResponse.json({
      status: 200,
      message: "Order has been inserted successfully",
      order: order,
      orderDetails: orderDetails
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to Create Order",
      details: error.message
    });
  }
}

