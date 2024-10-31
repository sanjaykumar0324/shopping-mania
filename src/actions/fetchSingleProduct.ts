import { BASE_URL } from "@/redux/store";

export async function fetchSingleProduct(productTitle : string, productId : string){
    const apiUrl = `${BASE_URL}/api/products/${productTitle}/${productId}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data)
      return data.product
    } catch (error) {
      console.log(error)
    }
  }
  