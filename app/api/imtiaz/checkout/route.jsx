import { NextResponse } from "next/server";
import Order from "../../../../models/order";
import OrderDetail from "../../../../models/orderdetails";

export async function POST(req) {
  try {
    const body = await req.json();

    const { products, totalPrice } = body;

    // Create the order first without the orderCode
    const order = await Order.create({
      customerID: 1,
      totalAmount: totalPrice,
      orderDate: new Date(),
      paymentStatus: "Pending",
      userID: 1,
    });

    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomString = crypto.randomBytes(3).toString("hex").toUpperCase();
    const orderCode = `ORD-${date}-${String(order.orderID).padStart(4, "0")}`;
    const paymentCode = `PAY-${date}-ORD${String(order.orderID).padStart(
      4,
      "0"
    )}-${randomString}`;

    order.orderCode = orderCode;
    order.paymentCode = paymentCode;
    await order.save();

    productDetails = products.map((product) => JSON.parse(product));

    const orderDetails = await Promise.all(
      productDetails.map(async (productDetail) => {
        const orderDetail = await registerProductDetails(
          order.orderID,
          productDetail
        );

        return orderDetail;
      })
    );

    const orderResult = {
      ...order,
      orderDetails: orderDetails,
    };

    return NextResponse.json(
      { order: orderResult, message: "Successfully place order." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error processing request:", err);
    const errorMessage = err.errors
      ? err.errors.map((e) => e.message).join(", ")
      : err.message;

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

async function registerProductDetails(orderID, productDetails) {
  const orderDetails = await OrderDetail.create({
    orderID: orderID,
    ...productDetails,
  });

  return orderDetails;
}

// Optional: You can also handle other methods (like GET) if needed
export async function GET() {
  return NextResponse.json(
    { message: "This endpoint supports POST only" },
    { status: 400 }
  );
}
