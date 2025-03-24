import { NextResponse } from "next/server";
import Products from "@models/products";
import { upload, runMiddleware, ensureUploadDirectory, saveUploadedFiles, processFiles } from "@utils/upload";
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
    const data = await req.formData();
    
    // Extract all product information
    const productData = {
      productName: data.get('productName'),
      description: data.get('description'),
      model: data.get('model'),
      year: data.get('year'),
      brand: data.get('brand'),
      type: data.get('type'),
      category: data.get('category'),
      price: parseFloat(data.get('price')),
      quantityOnHand: parseInt(data.get('quantityOnHand')),
      reorderLevel: parseInt(data.get('reorderLevel')) || 0,
    };

    // Parse description2
    let description2 = data.get('description2');
    try {
      description2 = JSON.parse(description2);
    } catch (e) {
      console.error('Error parsing description2:', e);
      description2 = {};
    }
    productData.description2 = description2;

    // Handle file uploads using Dropbox
    const attachments = data.getAll('attachments[]');
    if (attachments.length > 0) {
      try {
        const imageUrls = await processFiles(attachments);
        productData.imageUrl = imageUrls;
        console.log('Processed Dropbox image URLs:', imageUrls);
      } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
      }
    }

    // Create new product
    const newProduct = await Products.create(productData);

    return NextResponse.json({
      message: "Product created successfully",
      newProduct
    });
  } catch (error) {
    console.error("Error in POST /api/imtiaz/products:", error);
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
