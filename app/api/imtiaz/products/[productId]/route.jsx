import { NextResponse } from "next/server";
import Products from "@models/products";
import { upload, runMiddleware } from "@utils/upload";
import path from "path";

export async function GET(req, { params }) {
  try {
    const { productId } = params;
    const product = await Products.findByPk(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

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

    return NextResponse.json(productJSON);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { productId } = params;
    const uploadMiddleware = upload.any();
    await runMiddleware(req, uploadMiddleware);

    const formData = await req.formData();
    const description2 = formData.get('description2');
    const existingImages = JSON.parse(formData.get('existingImages') || '[]');

    const product = await Products.findByPk(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Parse description2
    let parsedDescription2;
    try {
      parsedDescription2 = JSON.parse(description2);
    } catch (e) {
      console.error('Error parsing description2:', e);
      parsedDescription2 = {};
    }

    // Combine existing images with new uploaded files
    const newImageUrls = req.files ? 
      req.files.map(file => path.join("/uploads/products", file.filename)) : 
      [];
    
    const combinedImageUrls = [...existingImages, ...newImageUrls];

    // Update product
    const updatedProduct = await product.update({
      productName: formData.get('productName'),
      description: formData.get('description'),
      description2: parsedDescription2,
      model: formData.get('model'),
      year: formData.get('year'),
      type: formData.get('type'),
      price: formData.get('price'),
      quantityOnHand: formData.get('quantityOnHand'),
      imageUrl: combinedImageUrls,
    });

    const formattedProduct = {
      ...updatedProduct.toJSON(),
      description2: parsedDescription2
    };

    return NextResponse.json({
      message: "Product updated successfully",
      updatedProduct: formattedProduct
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Failed to update product",
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { productId } = params;
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