import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import carouselModel from "../models/carouselModel";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_URL!);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectToDatabase();
    
    const { productName, productDesc, productId, categoryId, image } = await request.json();

    const carousel = new carouselModel({
      productName,
      productDesc,
      productId,
      categoryId,
      image,
    });

    const result = await carousel.save();
    return NextResponse.json({ result, success: true }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
};
