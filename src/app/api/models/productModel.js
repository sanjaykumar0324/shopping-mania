import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  color: String,
  company: String,
  category: String,
});

const productModel = mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
