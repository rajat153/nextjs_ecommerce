
import ProductsList from "../ProductList";
export const dynamic = 'force-dynamic';
export default async function ProductsPage() { 
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
    const products = await response.json();
    const response2 = await fetch(`${baseUrl}/api/users/2/cart`, { cache: 'no-store' });
   const cartProducts = await response2.json();


    return (
    <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-8">Products Page</h1>
    <ProductsList products={products} initialCartProducts = {cartProducts}/>
    </div>
    );
}