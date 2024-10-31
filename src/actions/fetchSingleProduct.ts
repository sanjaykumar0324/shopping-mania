export async function fetchSingleProduct(productTitle : string, productId : string){
    const apiUrl = `http://localhost:3000/api/products/${productTitle}/${productId}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data)
      return data.product
    } catch (error) {
      console.log(error)
    }
  }
  