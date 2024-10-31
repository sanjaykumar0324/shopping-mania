'use client'
import { EYE_ICON, FILL_FAV_ICON } from "@/utils/constants";
import { Product_type } from "@/utils/types";
import { useRouter } from "next/navigation";
import React from "react";



const ProductCard: React.FC<Product_type> = ({
  _id,
  title,
  price,
  isFavourite,
  isDiscount,
  discountPer,
  image,
 

}) => {
  const router  =  useRouter();
  const handleProductCLick = ()=>{
     router.push(`/products/${title}/${_id}`)
  }
  return (
    <div className="cursor-pointer " onClick={handleProductCLick}>
      <div className="relative w-[300px] h-[220px] bg-[#F5F5F5] flex flex-col items-center rounded-md">
        <div className="h-[220px] relative flex justify-center items-center">
          <img
            src={image}
            alt={title}
            className="h-[150px] relative"
          />
        </div>
        {isDiscount && (
          <span className="bg-[#DB4444] absolute left-1 text-sm top-2 px-2 py-1 rounded-md text-white">
            -{discountPer}%
          </span>
        )}
        <FILL_FAV_ICON className={`absolute top-4 right-4 text-xl ${isFavourite ? "text-red-500" : "text-gray-400"}`} />
        <EYE_ICON className="absolute top-12 right-4 text-xl" />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div>
          <h2 className="text-[16px]">{title}</h2>
          <p className="text-[#DB4444] text-sm">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
