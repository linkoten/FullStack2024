'use server'

import { getUser } from '@/lib/actionsUsers'; // Assuming these functions exist

import React from 'react'
import Cart from './Cart';
import { getCart } from '@/lib/actionsCart';



export default async function GetCart() {
    const user = await getUser(); // Await to get user data
  const userId = user?.id; // Extract user ID from object (if present)

  if (!user || !userId) {
    // Handle cases where user data is unavailable (e.g., redirect to login)
    return <div>You need to be logged in to view your cart.</div>;
  }
  const cart = await getCart(userId);

  return (
    <Cart user={user} cart={cart}/>
  )
}



