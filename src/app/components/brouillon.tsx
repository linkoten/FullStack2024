/*


/*

const Checkout = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                '/api/webhook/stripe/payment',
                {
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    description: item.description,
                    stock: item.stock,
                    id: item.id,
                }
            );
            const ResponseData = await response.data;
            console.log('Response data:', ResponseData);
            window.location.href = ResponseData.url;
        } catch (error: any) {
            console.log(`Message: ${error}`);
        } finally {
            setLoading(false);
        }
    };


ProductsCard fonctionnel : 

"use client";
import { getAllProducts } from "@/lib/actionsProducts";
import { useState } from "react";
import axios from "axios";


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
}

export default function Card({ item }: CardProps) {
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

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden relative border">
      <img
        src={item.image}
        alt={`Image of ${item.title}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 ">{item.title}</h3>
        <p className="text-white bg-red-500 hover:bg-red-600 rounded-md p-2 absolute top-2 right-2 mb-2">
          {item.price}€ / la place
        </p>
        <p className="text-gray-400 mb-4">{item.description}</p>
        <p className="text-gray-400 mb-4">
  {item.stock > 0 ? (
    <span className="text-green-500 font-bold">Stock : {item.stock}</span>
  ) : (
    <span className="text-red-500 font-bold">out of stock</span>
  )}
</p>
<button
  onClick={Checkout}
  disabled={loading || item.stock === 0}
  className={`
    bg-green-500 hover:bg-green-600 p-2 rounded-md text-white
    ${loading || item.stock === 0 ? 'disabled-button bg-red-500 hover:bg-red-600 line-through	' : ''}
  `}
>
  {loading ? "Chargement..." : "Acheter"}
</button>
      </div>
    </div>
  );
}


*/





