
import React from "react";
import Hero from "./Home/Hero";
import TodayDiscountProducts from "./Home/TodayDiscountProducts";

import { LoadMore } from "./Home/LoadMore";
import { Product_type } from "@/utils/types";

async function fetchDiscountedProducts() {
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error("Failed to load products");
  }

  const products = data.products || [];
  return products.filter((item: Product_type) => item.isDiscount);
}

const Home = async () => {
  let discountedProducts: Product_type[]; 
  let error: string | null = null;

  try {
    discountedProducts = await fetchDiscountedProducts();
  } catch (err) {
    if (err instanceof Error) {
        error = err.message;
    } else {
       error = 'An unexpected error occurred';
    }
    discountedProducts = [];
  }
  
 console.log(error)

  return (
    <div>
      <div className="container mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-[15%_85%]">
        <div>
          <Hero />
        </div>
        <div>
          hello
        </div>
      </div>
      <TodayDiscountProducts discountedProducts={discountedProducts}  />

      <div className="container mx-auto  grid grid-cols-4  ">
      <LoadMore />
      </div>
    </div>
  );
};

export default Home;
