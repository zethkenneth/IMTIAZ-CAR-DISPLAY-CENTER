import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { amount, description } = await req.json();
        
        if (!amount || isNaN(amount)) {
            throw new Error('Invalid amount provided');
        }

        // Convert to number and ensure it's a valid amount
        const paymentAmount = Math.round(parseFloat(amount) * 100);
        
        if (paymentAmount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        const data = {
            data: {
                attributes: {
                    amount: paymentAmount,
                    description: description,
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
        console.error("Error: ", error);
        console.error("Amount processing error:", {
            originalAmount: amount,
            attemptedAmount: paymentAmount
        });
        return NextResponse.json({
            status: 500,
            error: "Failed to Create Payment",
            details: error,
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