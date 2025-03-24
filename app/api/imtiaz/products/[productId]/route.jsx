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
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Handle new file uploads
    const attachments = data.getAll('attachments[]');
    let newImageUrls = [];
    
    if (attachments.length > 0) {
      try {
        newImageUrls = await processFiles(attachments);
      } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
      }
    }

    // Get existing images
    let existingImages = [];
    try {
      existingImages = JSON.parse(data.get('existingImages') || '[]');
    } catch (e) {
      console.error('Error parsing existing images:', e);
    }

    // Combine existing and new image URLs
    const imageUrl = [...existingImages, ...newImageUrls];

    // Update product with new data including images
    const updateData = {
      productName: data.get('productName'),
      description: data.get('description'),
      description2: data.get('description2'),
      model: data.get('model'),
      year: data.get('year'),
      brand: data.get('brand'),
      type: data.get('type'),
      category: data.get('category'),
      price: data.get('price'),
      quantityOnHand: data.get('quantityOnHand'),
      reorderLevel: data.get('reorderLevel'),
      imageUrl
    };

    const updatedProduct = await product.update(updateData);

    return NextResponse.json({
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error);
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