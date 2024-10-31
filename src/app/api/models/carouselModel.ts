import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
    productName: {type : String, required :  true},
    productDesc : {type : String, required :  true},
    productId: {type : String, required :  true},
    categoryId : {type : String, required :  true},
    image : {type : String, required :  true},
})

const carouselModel = mongoose.models.carousels || mongoose.model("carousels",carouselSchema);
export default carouselModel