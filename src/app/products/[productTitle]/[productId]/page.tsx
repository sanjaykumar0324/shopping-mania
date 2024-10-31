"use client";
import { fetchSingleProduct } from "@/actions/fetchSingleProduct";
import { addProducts } from "@/redux/slices/productSlice";
import { RootState, useAppSelector, useAppDispatch } from "@/redux/store";
import { Product_type } from "@/utils/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  
  const products = useAppSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product_type | null>(null);

  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
  const productTitle = Array.isArray(params.productTitle) ? params.productTitle[0] : params.productTitle;

  const searchProduct: Product_type | undefined = products.products?.find(
    (product: Product_type) => product._id === productId
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct: Product_type | null = await fetchSingleProduct(productTitle, productId);
        
        if (fetchedProduct) {
          dispatch(addProducts([fetchedProduct])); 
          setProduct(fetchedProduct); 
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (searchProduct) {
      setProduct(searchProduct);
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [productTitle, productId, searchProduct, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  return (
    <div className="mt-20">
      <div className="container mx-auto grid grid-cols-2 ">
         <div className="bg-red-400 grid grid-cols-[35%_65%]">
          <div className="flex flex-col">

          </div>
          <div className="bg-[#F5F5F5] h-[60vh] flex items-center justify-center ">

            <img src={product?.image} className="h-[45vh] object-cover"/>
          </div>

         </div>
         <div className="bg-green-400">hello</div>
      </div>
     
    </div>
  );
};

export default ProductDetails;
