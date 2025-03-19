import { NextResponse } from "next/server";
import Products from "@models/products";
import { upload, runMiddleware } from "@utils/upload";
import path from "path";

export async function GET() {
  try {
    const products = await Products.findAll();
    
    const productsArray = products.map(product => {
      const productJSON = product.toJSON();
      // Parse description2 if it's a string
      if (typeof productJSON.description2 === 'string') {
        try {
          productJSON.description2 = JSON.parse(productJSON.description2);
        } catch (e) {
          console.error('Error parsing description2:', e);
          productJSON.description2 = {};
        }
      }
      return productJSON;
    });
    
    return NextResponse.json(productsArray);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const uploadMiddleware = upload.any();
    await runMiddleware(req, uploadMiddleware);

    const formData = await req.formData();
    const description2 = formData.get('description2');

    // Create new product entry
    const newProduct = await Products.create({
      productName: formData.get('productName'),
      description: formData.get('description'),
      description2: description2,
      model: formData.get('model'),
      year: formData.get('year'),
      type: formData.get('type'),
      price: formData.get('price'),
      quantityOnHand: formData.get('quantityOnHand'),
      imageUrl: req.files ? req.files.map(file => path.join("/uploads/products", file.filename)) : [],
    });

    return NextResponse.json({
      message: "Product created successfully",
      newProduct
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create product",
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const productId = params.productId;
    const product = await Products.findByPk(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await product.destroy();
    return NextResponse.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete product",
        details: error.message
      },
      { status: 500 }
    );
  }
}
