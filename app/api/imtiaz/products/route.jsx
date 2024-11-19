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
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

async function runMiddleware(req, fn) {
  return new Promise((resolve, reject) => {
    fn(req, {}, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

// GET Handler
export async function GET() {
  try {
    const products = await Products.findAll();
    return NextResponse.json({
      status: 200,
      data: products,
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch Products",
      details: error.message || error,
    });
  }
}

// POST Handler
export async function POST(req) {
  try {
    const uploadMiddleware = upload.any();
    await runMiddleware(req, uploadMiddleware);

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

    // Check for uploaded files
    if (!req.files || req.files.length === 0) {
      throw new Error("No files were uploaded.");
    }

    // Collect paths of uploaded files
    const attachments = req.files.map((file) =>
      path.join("/uploads/products", file.filename)
    );

    // Create new product entry
    const newProduct = await Products.create({
      productName: productname,
      description,
      description2,
      model,
      year,
      brand,
      type,
      category,
      price,
      quantityOnHand: quantityonhand,
      reorderLevel: reorderlevel,
      imageUrl: attachments,
    });

    return NextResponse.json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create product",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}
