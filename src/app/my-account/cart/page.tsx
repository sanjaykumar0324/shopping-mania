'use client'
import React from 'react'
import CartItem from './CartItem'
import { RootState, useAppSelector } from '@/redux/store'

const Cart = () => {
  const cart = useAppSelector((state : RootState)=> state.cart.cart)
  console.log(cart)
  return (
    <div>
      <div className='container mx-auto px-32 flex flex-col'>
        <div className='flex justify-between items-center h-16 px-10 rounded-md bg-gray-200'>
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>

        </div>
          {
           cart.map((item)=>(
            <CartItem key={item._id} cart={item}/>
           ))
          }
       

      </div>
    </div>
  )
}

export default Cart