import ShoppingCart from './ShoppingCartList'
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default async function CartPage() { 
   const response = await fetch(`${baseUrl}/api/users/2/cart`, {cache:'no-cache'});
   const cartProducts = await response.json();
   return (
    <ShoppingCart intialcartProducts={cartProducts}/>
   )
   
}