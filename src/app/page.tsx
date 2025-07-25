import { getProducts } from "@/lib/getProducts";
import { ProductCard } from "@/components/ui/ProductCard";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}
