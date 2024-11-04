"use client";
import { fetchSingleProduct } from "@/actions/fetchSingleProduct";
import { AddToCart } from "@/redux/slices/cartSlice";
import { addProducts } from "@/redux/slices/productSlice";
import { RootState, useAppSelector, useAppDispatch } from "@/redux/store";
import { Cart_type, Product_type } from "@/utils/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const products = useAppSelector((state: RootState) => state.products);
  const cartItems = useAppSelector((state : RootState)=>state.cart.cart)||[];

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product_type | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;
  const productTitle = Array.isArray(params.productTitle)
    ? params.productTitle[0]
    : params.productTitle;

  const searchProduct: Product_type | undefined = products.products?.find(
    (product: Product_type) => product._id === productId
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct: Product_type | null = await fetchSingleProduct(
          productTitle,
          productId
        );

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

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const price = product?.price || 0; 
  const image = product?.image || ""; 

  const handleAddToCart = () => {
    if (product) {
      const cartProduct: Cart_type = {
        _id: productId,
        title: product.title,
        quantity: quantity,
        price: price,
        image: image,
      };
      console.log(cartProduct)
      dispatch(AddToCart(cartProduct)); 
    }

  };
 console.log("cart",cartItems)

  return (
    <div className="mt-20 flex flex-col gap-10">
      <div className="container mx-auto px-32">
        <h3 className="text-lg">
          <span className="text-gray-400">Home / </span>
          {product?.title}
        </h3>
      </div>
      <div className="container mx-auto grid grid-cols-2 px-20">
        <div className="grid grid-cols-[35%_65%]">
          <div className="flex flex-col items-center justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-[#F5F5F5] h-[12vh] w-[14vh] rounded-md flex justify-center items-center">
                <img src={image} className="h-[8vh]" alt={`Product Image ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="bg-[#F5F5F5] h-[60vh] flex items-center justify-center">
            <img src={image} className="h-[45vh] object-cover" alt="Main Product" />
          </div>
        </div>
        <div className="flex flex-col pl-14 gap-4">
          <div>
            <h1 className="text-2xl">{product?.title}</h1>
            <h2 className="text-2xl font-thin">{price}$</h2>
          </div>
          <div>
            <p>
              Advanced dual- or triple-camera setup with improved low-light
              performance, Night mode, and enhanced computational photography
              capabilities, allowing for stunning photos and videos.
            </p>
          </div>
          <hr className="border border-gray-300" />
          <div>
            <div className="flex items-center gap-10">
              <div className="flex items-center">
                <button
                  className="p-2 text-lg hover:bg-[#DB4444] px-4 border border-gray-400"
                  onClick={handleMinus}
                >
                  -
                </button>
                <input
                  className="p-2 text-lg w-20 border border-gray-400 text-center"
                  value={quantity}
                  readOnly
                />
                <button
                  className="p-2 text-lg hover:bg-[#DB4444] px-4 border border-gray-400"
                  onClick={handlePlus}
                >
                  +
                </button>
              </div>
              <button
                className="p-2 px-6 bg-[#DB4444] text-white hover:bg-red-300 rounded-md"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
