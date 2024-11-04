import { Cart_type } from '@/utils/types'
import React from 'react'

interface CartProps {
    cart : Cart_type;
}
const CartItem :React.FC<CartProps>= ({cart}) => {
  return (
    <div className='flex justify-between items-center bg-slate-200 px-10'>
        <div>
            <img src={cart.image} className='h-16'/>
            <h2>{cart.title}</h2>

        </div>
        <div>
            <p>{cart.price}</p>
        </div>
        <div>
            hello
        </div>
        <div>
            subtotal
        </div>

    </div>
  )
}

export default CartItem