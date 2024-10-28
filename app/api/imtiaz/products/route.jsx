import { NextResponse } from "next/server";
import db from "../../../../utils/sequelize.js";
import { QueryTypes } from "sequelize";
import Products from "../../../../models/products.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public/uploads/products");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing to handle multipart data
  },
};

export async function GET() {
  try {
    const products = await Products.findAll();
    return NextResponse.json({
      status: 200,
      data: products,
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

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

export async function POST(req, res) {
  try {
    // Run multer as middleware
    await runMiddleware(req, res, upload.any());

    const {
      productname,
      description,
      description2,
      model,
      year,
      brand,
      type,
      category,
      price,
      quantityonhand,
      reorderlevel,
    } = req.body;

    // Ensure req.files is defined before using it
    if (!req.files || req.files.length === 0) {
      throw new Error("No files were uploaded.");
    }

    // Collect paths of all uploaded files
    const attachments = req.files.map((file) =>
      path.join("/uploads/products", file.filename)
    );

    // Insert product data along with file paths in the database
    const newProduct = await Products.create({
      productName: productname,
      description: description,
      description2: description2,
      model: model,
      year: year,
      brand: brand,
      type: type,
      category: category,
      price: price,
      quantityOnHand: quantityonhand,
      reorderLevel: reorderlevel,
      imageUrl: attachments, // Store file paths as an array
    });

    return new NextResponse(
      JSON.stringify({
        message: "Product created successfully",
        data: newProduct,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to create product",
        details: error.message || error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
