import { NextResponse } from "next/server";
import Products from "@models/products";
import { upload, runMiddleware, processFiles } from "@utils/upload";
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
    const data = await req.formData();
    
    const product = await Products.findByPk(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Parse description2
    let description2 = data.get('description2');
    try {
      description2 = JSON.parse(description2);
    } catch (e) {
      console.error('Error parsing description2:', e);
      description2 = {};
    }

    // Get existing images
    let existingImages = [];
    try {
      existingImages = JSON.parse(data.get('existingImages') || '[]');
    } catch (e) {
      console.error('Error parsing existing images:', e);
    }

    // Process new files
    const attachments = data.getAll('attachments[]');
    let newImageUrls = [];
    if (attachments.length > 0) {
      newImageUrls = await processFiles(attachments);
    }

    // Combine existing and new images
    const combinedImageUrls = [...existingImages, ...newImageUrls];

    // Update product with all fields
    const updatedProduct = await product.update({
      productName: data.get('productName'),
      description: data.get('description'),
      description2: description2,
      model: data.get('model'),
      year: data.get('year'),
      brand: data.get('brand'),
      type: data.get('type'),
      category: data.get('category'),
      price: data.get('price'),
      quantityOnHand: data.get('quantityOnHand'),
      reorderLevel: data.get('reorderLevel'),
      imageUrl: combinedImageUrls,
    });

    return NextResponse.json({
      message: "Product updated successfully",
      updatedProduct: {
        ...updatedProduct.toJSON(),
        description2: description2
      }
    });
  } catch (error) {
    console.error("Error in PUT /api/imtiaz/products/[productId]:", error);
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