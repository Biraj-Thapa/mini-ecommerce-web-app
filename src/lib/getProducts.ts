import axios from "axios";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
};

export async function getProducts() {
  try {
    const res = await axios.get(
      "https://api.freeapi.app/api/v1/public/randomproducts"
    );
    return res.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
