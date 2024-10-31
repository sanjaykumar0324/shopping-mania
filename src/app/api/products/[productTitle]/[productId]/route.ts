import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import productModel from "../../../models/productModel";

// Define a type for the params
interface Params {
  productTitle: string;
  productId: string;
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_URL!);
  }
};

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  try {
    await connectToDatabase();

    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required", success: false }, { status: 400 });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ product, success: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage, success: false }, { status: 500 });
  }
};
