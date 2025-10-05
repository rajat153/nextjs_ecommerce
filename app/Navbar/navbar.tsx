import React from 'react'
import Link from 'next/link';
const navbar = () => {
  return (
    <nav className='p-4 bg-gray-700'>
        <ul className='flex gap-4'>
            <Link href={'/products'}>Products</Link>
            <Link href={'/cart'}>Cart</Link>
            <Link href={'/checkout'}>Checkout</Link>
        </ul>
    </nav>
  )
}

export default navbar