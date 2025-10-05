'use client'

import { useState } from "react"
import Link from 'next/link'
import {Product} from '../product-data'
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ShoppingCartList({intialcartProducts}:{intialcartProducts:Product[]}){
    const [cartProducts, setCartProduct] = useState(intialcartProducts)

    async function removeFromCart(productId:string){
        const response = await fetch(`${baseUrl}/api/users/2/cart`,
            {method : 'DELETE', 
            body : JSON.stringify({productId}),
            headers: {'Content_Type': 'application/json'}})
        const updatedCartProducts = await response.json();
        setCartProduct(updatedCartProducts.data)
    }
    return (
        <>
        {
            cartProducts.length === 0 ? <h1>Your Cart is Empty</h1> : (
                <div className="containter mx-auto p-8">
                    <h1 className="text-4xl font-bold">Your Cart</h1>
                    <ul className="space-y-4"> 
                    {cartProducts.map(product => (
                        <li className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300" key={product.id}>
                            <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600">${product.price}</p>
                            <div className="flex justify-end">
                                <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={(e) => {
                                e.preventDefault();
                                removeFromCart(product.id);
                                }}>Remove from Cart</button>
                            </div>
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>
            )   
        }
        </>
    )
}