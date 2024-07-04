"use server"


import { prisma } from "@/lib/db"


export const getAllProducts = async () =>{
    const data = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
      }
    });
    return data
  }
  
 export const getCheckoutProducts = async (data: { title: string }) => {
    const products = await prisma.products.findMany({
      where: {
        title: data.title, // Filter by the provided ID
      },
    });
    return products;
  };

  export const decrementProductStock = async (productId: string) => {
    try {
      await prisma.products.update({
        where: { id: productId },
        data: {
          stock: {
            decrement: 1, // Decrement stock by 1 unit
          },
        },
      });
      console.log("Stock decremented for product:", productId);
    } catch (error) {
      console.error("Error decrementing product stock:", error);
    }
  };