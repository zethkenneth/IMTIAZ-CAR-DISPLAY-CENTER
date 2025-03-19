import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const baseURL = "/api/imtiaz";

// Define category priority order
const categoryOrder = {
  'SUV': 1,
  'Car': 2,
  'Electric': 3,
  'Sedan': 4,
  // All other categories will have higher numbers (lower priority)
};

const useInventorHooks = create((set) => ({
  products: [],
  getInventory: async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      const products = response.data;
      
      set(() => ({ 
        products: Array.isArray(products) ? 
          products.sort((a, b) => {
            // First sort by category priority
            const categoryA = categoryOrder[a.category?.toUpperCase()] || 999;
            const categoryB = categoryOrder[b.category?.toUpperCase()] || 999;
            
            if (categoryA !== categoryB) {
              return categoryA - categoryB;
            }
            
            // If categories are the same, sort by productID
            return a.productID - b.productID;
          }) : 
          [] 
      }));
      return { status: 200, message: "Products retrieved successfully" };
    } catch (err) {
      console.error("Error fetching inventory:", err);
      set(() => ({ products: [] }));
      return { status: 500, message: err.message };
    }
  },
  getProduct: async (productID) => {
    try {
      const response = await axios.get(`${baseURL}/products/${productID}`);
      const validatedResponse = validateStatusOk(response);
      const { data } = validatedResponse;
      set(() => ({ products: data }));
      return { status: 200, message: "Product retrieved successfully" };
    } catch (err) {
      console.error("Error fetching product:", err);
      return { status: 500, message: err.message };
    }
  },
  storeProduct: async (form) => {
    try {
      const response = await axios.post(`${baseURL}/products`, form);
      const newProduct = response.data.newProduct;
      set((state) => ({ products: [...state.products, newProduct] }));
      return { status: 200, message: "Product stored successfully" };
    } catch (err) {
      console.error("Error storing product:", err);
      return { status: 500, message: err.message };
    }
  },
  updateProduct: async (productId, form) => {
    try {
      console.log('Updating product:', productId);
      const response = await axios.put(`${baseURL}/products/${productId}`, form);
      console.log('Update response:', response);
      const updatedProduct = response.data.updatedProduct;
      set((state) => ({
        products: state.products.map(product => 
          (product.id === productId || product.productID === productId) 
            ? updatedProduct 
            : product
        )
      }));
      return { status: 200, message: "Product updated successfully" };
    } catch (err) {
      console.error("Error updating product:", err);
      return { status: 500, message: err.message };
    }
  },
  deleteProduct: async (productID) => {
    try {
      await axios.delete(`${baseURL}/products/${productID}`);
      set((state) => ({
        products: state.products.filter(
          (product) => product.id !== productID
        ),
      }));
      return { status: 200, message: "Product deleted successfully" };
    } catch (err) {
      console.error("Error deleting product:", err);
      return { status: 500, message: err.message };
    }
  },
}));

export default useInventorHooks;
