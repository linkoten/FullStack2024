'use server';

import { Session, User } from '@prisma/client';
import { addToCart, getCart } from '@/lib/actionsCart';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface CardProps {
    item: {
        title: string | null; // Allow title to be null
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        image: string;
        id: string;
    };
    user: User;
}

export default async function Card({ item, user }: CardProps) {
    const productId = item.id;
    const userId = user.id;
    let quantity = 1; // Convert to number

    console.log(item.stock);

    const stockOptions = [];
    for (let i = 1; i <= item.stock; i++) {
        stockOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }

    return (
        <div className='bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden relative border'>
            <img
                src={item.image}
                alt={`Image of ${item.title}`}
                className='w-full h-64 object-cover'
            />
            <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2 '>
                    {item.title}
                </h3>
                <p className='text-white bg-red-500 hover:bg-red-600 rounded-md p-2 absolute top-2 right-2 mb-2'>
                    {item.price}€ / la place
                </p>
                <p className='text-gray-400 mb-4'>
                    {item.description}
                </p>
                <p className='text-gray-400 mb-4'>
                    {item.stock > 0 ? (
                        <span className='text-green-500 font-bold'>
                            Stock : {item.stock}
                        </span>
                    ) : (
                        <span className='text-red-500 font-bold'>
                            out of stock
                        </span>
                    )}
                </p>
                {item.stock > 0 && <div className='flex mb-2'></div>}
                {item.stock > 0 ? (
                    <form action={addToCart}>
                        <input
                            type='text'
                            name='userId'
                            defaultValue={userId}
                            className='  hidden'
                        />{' '}
                        <input
                            type='text'
                            name='productId'
                            defaultValue={productId}
                            className='  hidden'
                        />{' '}
                        <label htmlFor='quantity'>Quantity:</label>
                        <Select
                            name='quantity'
                        >
                            <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder='Select a fruit' />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={stockOptions}>
                                    {stockOptions}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            type='submit'
                            className=' bg-green-500 hover:bg-green-600'
                        >
                            {' '}
                            Add To Cart
                        </Button>
                    </form>
                ) : (
                    <Button className=' bg-red-500 hover:bg-red-600 line-through cursor-not-allowed '>
                        {' '}
                        Add To Cart
                    </Button>
                )}
            </div>
        </div>
    );
}

/*

import { getAllProducts } from "@/lib/actionsProducts";
import { useState } from "react";
import axios from "axios";
import { addProductToCart } from "@/lib/actionsCart";
  const [loading, setLoading] = useState(false);


const Checkout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/webhook/stripe/payment", {
        title: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
        stock: item.stock,
        id: item.id,
      });
      const ResponseData = await response.data;
      console.log("Response data:", ResponseData);
      window.location.href = ResponseData.url;
    } catch (error: any) {
      console.log(`Message: ${error}`);
    } finally {
      setLoading(false);
    }
  };


*/
