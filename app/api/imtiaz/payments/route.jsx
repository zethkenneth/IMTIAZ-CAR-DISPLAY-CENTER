import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    const {
        amount,
        description
    } = await req.json();

    const data = {
      data: {
        attributes: {
          amount: amount,
          description: description,
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


  try {
     const result =  await axios(config)
      .then(function (response) {
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return NextResponse.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to Create Product",
      details: error,
    });
  }
}


export async function GET(req) {

  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response(JSON.stringify({ error: "Code is required" }), {
      status: 400,
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

     const result = await axios(config)
       .then(function (response) {
         return response.data.data;
       })
       .catch(function (error) {
         console.log(error);
       });

    return NextResponse.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Products",
      details: error,
    });
  }
}