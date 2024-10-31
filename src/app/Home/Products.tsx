
import { Product_type } from "@/utils/types";
import ProductCard from "./ProductCard";

export interface ProductProps {
  products: Product_type[] | null;
}

export function Products({ products }: ProductProps) {
    
  return (
    <>
      {products ? (
        products.map((product)=>(
            <ProductCard key={product._id} {...product}/>
        ))
      ) : (
        <div className="text-xl font-bold">No products available !! </div>
      )}
    </>
  );
}