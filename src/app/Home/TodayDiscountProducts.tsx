'use client'
import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { LEFT_ARROW_ICON, RIGHT_ARROW_ICON } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { Product_type } from "@/utils/types";



interface Props {
  discountedProducts: Product_type[];
  error?: string;
}

const TodayDiscountProducts: React.FC<Props> = ({
  discountedProducts,
  error,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setScrollPosition(scrollRef.current.scrollLeft - 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setScrollPosition(scrollRef.current.scrollLeft + 300);
    }
  };

  const isAtStart = scrollPosition === 0;
  const isAtEnd = scrollRef.current 
    ? scrollPosition + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth 
    : false;

  if (error) {
    return <div>{error}</div>;
  }



  return (
    <div className="flex flex-col gap-4">
      <div className="container mx-auto border border-l-8 border-[#DB4444] border-r-0 border-b-0 border-t-0 p-2">
        <h3 className="text-lg">Today</h3>
      </div>
      <div className="flex flex-col gap-10">
        <div className="container mx-auto flex justify-between">
          <div>
            <h1 className="text-4xl font-bold font-serif">Flash Sales</h1>
          </div>
          <div className="flex gap-10">
            <button
              className={`text-4xl bg-gray-100 rounded-full p-1 ${isAtStart ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={scrollLeft} 
              disabled={isAtStart}
            >
              <LEFT_ARROW_ICON />
            </button>
            <button
              className={`text-4xl bg-gray-100 rounded-full p-1 ${isAtEnd ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={scrollRight} 
              disabled={isAtEnd}
            >
              <RIGHT_ARROW_ICON />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar" ref={scrollRef}>
          <div className="flex container mx-auto gap-4">
            {discountedProducts.slice(0, 10).map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
        <div className="flex justify-center ">
          <button className="text-white text-sm bg-[#DB4444] hover:bg-red-300 py-3 px-16" onClick={() => router.push('/discount')}>
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodayDiscountProducts;
