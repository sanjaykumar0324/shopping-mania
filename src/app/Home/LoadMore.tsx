'use client'
import { fetchProducts } from "@/actions/fetchProducts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Products } from "./Products";
import { Spinner } from "@/components/Spinner";
import { RootState } from "@/redux/store";
import { addProducts } from "@/redux/slices/productSlice";

export function LoadMore() {
  const dispatch = useDispatch();
  const products = useSelector((state :RootState) => state.products.products); 
  const [page, setPage] = useState(0);
  

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreProducts = async () => {
    await delay(3000);
    const nextPage = (page % 7) + 1;
    const newProducts = await fetchProducts(nextPage);
    if (newProducts) {
      dispatch(addProducts(newProducts)); 
    }
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <>
      <Products products={products} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
}
