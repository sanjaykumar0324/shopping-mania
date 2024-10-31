import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import categoryModel from "../models/categoryModel";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_URL!);
  }
};

// Generic error handling function
const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "An unknown error occurred";
};

export const POST = async (request: NextRequest) => {
  await connectToDatabase();
  try {
    const { name, menu } = await request.json();
    const category = new categoryModel({
      name,
      menu,
    });
    const categories = await category.save();
    return NextResponse.json(
      {
        categories,
        success: true,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(
      {
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  await connectToDatabase();
  try {
    const categories = await categoryModel.find({});
    return NextResponse.json({ categories, success: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
};
