import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { amount, description } = await req.json();
        
        // Validate amount
        if (!amount || isNaN(amount)) {
            return NextResponse.json({
                status: 400,
                error: "Invalid amount provided",
                details: { receivedAmount: amount }
            });
        }

        // Convert to number and ensure it's a valid amount
        // First, convert to float and limit to 2 decimal places
        const cleanAmount = parseFloat(parseFloat(amount).toFixed(2));
        const paymentAmount = Math.round(cleanAmount * 100);
        
        // Add validation for maximum amount (e.g., 10,000,000 PHP)
        if (paymentAmount <= 0 || paymentAmount > 1000000000) {
            return NextResponse.json({
                status: 400,
                error: "Amount must be between 0 and 10,000,000 PHP",
                details: { 
                    originalAmount: amount,
                    convertedAmount: paymentAmount 
                }
            });
        }

        const data = {
            data: {
                attributes: {
                    amount: paymentAmount,
                    description: description || "Payment for order",
                    currency: "PHP"
                },
            },
        };

        const config = {
            method: "post",
            url: "https://api.paymongo.com/v1/links",
            headers: {
                accept: "application/json",
                authorization: "Basic c2tfdGVzdF9qdGNMOFFoanVHcGZ4RXJGZlNGR2RpVEo6",
                "content-type": "application/json",
            },
            data: data,
        };

        const result = await axios(config);
        return NextResponse.json({
            status: 200,
            data: result.data.data,
        });
    } catch (error) {
        console.error("Payment Creation Error:", {
            message: error.message,
            response: error.response?.data,
            originalAmount: amount,
            convertedAmount: paymentAmount,
            description: description
        });

        return NextResponse.json({
            status: error.response?.status || 500,
            error: "Failed to Create Payment",
            details: error.response?.data || error.message
        });
    }
}


export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ 
      status: 400,
      error: "Code is required" 
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

  try {
    const result = await axios(config);
    return NextResponse.json({
      status: 200,
      data: result.data.data,
      checkoutURL: result.data.data[0]?.attributes?.checkout_url
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch payment details",
      details: error.message
    });
  }
}