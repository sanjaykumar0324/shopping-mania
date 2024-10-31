export async function fetchProducts(page: number) {
    const perPage = 8;
    const apiUrl = `http://localhost:3000/api/products?page=${page}&per_page=${perPage}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return Array.isArray(data.products) ? data.products : [];
    } catch (error) {
      console.log(error)
    }
  }
  