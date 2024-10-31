import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {type: String , required : true},
  price: {type: Number , required : true},
  color: {type: String , required : true},
  company: {type: String , required : true},
  categoryId: {type: String , required : true},
  isFavourite: {type: Boolean , required : true},
  isDiscount: {type: Boolean , required : true},
  discountPer: {type: Number , required : true},
  image: {type: String , required : true},
  
});

const productModel = mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;






