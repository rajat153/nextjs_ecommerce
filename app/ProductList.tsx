'use client'
import  {Product} from './product-data';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductsList({products, initialCartProducts}: {products: Product[], initialCartProducts: Product[]}) {
    const [cartProducts, setCartProduct] =  useState(initialCartProducts)
    async function addToCart(productId:string){
        const response = await fetch('http://localhost:3000' + '/api/users/2/cart',
            {method : 'POST', 
            body : JSON.stringify({productId}),
            headers: {'Content_Type': 'application/json'}})
        const updatedCartProducts = await response.json();
        setCartProduct(updatedCartProducts.data)
    }
    async function removeFromCart(productId:string){
        const response = await fetch('http://localhost:3000' + '/api/users/2/cart',
            {method : 'DELETE', 
            body : JSON.stringify({productId}),
            headers: {'Content_Type': 'application/json'}})
        const updatedCartProducts = await response.json();
        setCartProduct(updatedCartProducts.data)
    }
    function itemsInCart(productId:string){
        return cartProducts.some(cp=> cp.id === productId)
    }
    return (
        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300" href={"/products/" + product.id } key={product.id}>
                        <div className="flex justify-center mb-4 h-48 relative">
                        <Image className="object-cover rounded-md" fill src={'/' + product.imageUrl} alt={product.name}  />
                        </div>
                        <h2 className="text-xl text-black font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600">${product.price}</p>
                        {
                            itemsInCart(product.id) ? (<button                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
 onClick={(e)=>{
                            e.preventDefault();
                            removeFromCart(product.id)}}>Remove to Cart</button>) :
                            (<button                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
 onClick={(e)=>{
                            e.preventDefault();
                            addToCart(product.id)}}>Add to Cart</button>)
                        }
                    </Link>
                ))}
        </div>
    );
}