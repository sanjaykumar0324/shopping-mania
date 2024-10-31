import mongoose from "mongoose";
import productModel from "../models/productModel";
import { NextRequest, NextResponse } from "next/server";

// Define a TypeScript interface for the product data
interface ProductData {
  title: string;
  price: number;
  color: string;
  company: string;
  categoryId: string;
  isFavourite: boolean;
  isDiscount: boolean;
  discountPer?: number;
  image?: string;
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_URL!);
  }
};

export const POST = async (request: NextRequest) => {
  await connectToDatabase();

  try {
    const productData: ProductData = await request.json();

    const product = new productModel(productData);
    const result = await product.save();

    return NextResponse.json({ result, success: true }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage, success: false }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);

  try {
    const products = await productModel.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalProducts = await productModel.countDocuments();

    return NextResponse.json({
      products,
      success: true,
      totalProducts,
      totalPages: Math.ceil(totalProducts / perPage),
      currentPage: page
    }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage, success: false }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  await connectToDatabase();

  try {
    const { id, ...updateData } = await request.json();

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ updatedProduct, success: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage, success: false }, { status: 500 });
  }
};
