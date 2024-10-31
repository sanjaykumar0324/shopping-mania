import mongoose from "mongoose";
const menuItemSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
});
const categorySchema =  new mongoose.Schema({
    name : {type :String, required: true},
    menu : [menuItemSchema]

})

const categoryModel = mongoose.models.categories ||mongoose.model("categories", categorySchema);

export default categoryModel;