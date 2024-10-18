import mongoose from "mongoose";
import productModel from "../models/productModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_URL!); 
  }
};

export const POST = async (request: NextRequest) => {
  await connectToDatabase();
  
  try {
    const { name, price, color, company, category }: { name: string; price: number; color: string; company: string; category: string; } = await request.json();
    
    const product = new productModel({
      name,
      price,
      color,
      company,
      category  
    });
    
    const result = await product.save();
    return NextResponse.json({ result, success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export const GET = async () => {
  await connectToDatabase();
  
  try {
    const products = await productModel.find({});
    return NextResponse.json({ products, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
