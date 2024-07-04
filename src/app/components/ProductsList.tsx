
import { Session, User } from '@prisma/client';
import Card from './ProductsCard';
import { useState } from 'react';

interface Products {
    id: string;
    title: string | null; // Allow title to be null
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    price: number;
    stock: number;
    image: string;
  }

  interface ListCardsProps {
    products: Products[];
    user: User

  }


function ListCards({ products,  user }: ListCardsProps ) {


  return (
    <section className="p-3">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
      {products.map((item, index) => (
        <Card key={index} item={item}  user={user}  />
      ))}
    </div>
    </section>
  );
}

export default ListCards;