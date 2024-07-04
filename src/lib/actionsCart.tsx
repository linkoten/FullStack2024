"use server"
import { Products } from '@prisma/client';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { getUser } from './actionsUsers';
import { getAllProducts } from './actionsProducts';
import { revalidatePath } from 'next/cache';



export async function deleteFromCard(formData: FormData) {
  const cartId = formData.get("cartId")
  const productId = formData.get("productId")
  console.log("Petit texte", cartId, productId)

  try{
  const productDelete = await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cartId as string, // Remplacez par l'ID de la carte
        productId: productId as string // Remplacez par l'ID du produit
      }
    }
  })
  return productDelete
 }
 catch (error) {
  console.error('Error fetching cart:', error);
  throw new Error('Could not fetch cart');
}
finally {
  redirect('/dashboard/products')
}
  
}

export async function getCart(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Could not fetch cart');
  }
}


export const updateCart = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const quantity = formData.get('quantity') as number | null;

        if (id !== null) {
            await prisma.cartItem.update({
                where: { id },
                data: { quantity: quantity as number | 1 },
            });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
    } finally {
        redirect('/');
    }
};

interface DeleteFromCartProps {
  userId: string;
  productId: string;
}

export async function deleteProductFromCart({ userId, productId }: DeleteFromCartProps) {
  console.log('deleteProductFromCart function called'); // Initial log to check function execution
  console.log('deleteProductFromCart called with:', { userId, productId });

  try {
    // Find the user's cart
    console.log('Finding cart for userId:', userId);
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
    });
    console.log('Cart found:', cart);

    if (!cart) {
      console.error('Cart not found for the user');
      throw new Error("Cart not found for the user");
    }

    // Delete the product from the cart
    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        cartItems: {
          delete: {
            cartId_productId: { cartId: cart.id, productId },
          },
        },
      },
      include: { cartItems: true },
    });

    console.log('Product deleted from cart:', updatedCart);
    return updatedCart;
  } catch (error) {
    console.error('Failed to delete product from cart:', error);
    throw new Error('Failed to delete product from cart');
  }
}







interface AddToCartProps {
  productId: string;
  quantity: number;
}

export async function addToCart(formData: FormData) {
  console.log('addToCart function called'); // Initial log to check function execution
  const userId = formData.get("userId") as string
  const productId = formData.get("productId") as string
  const quantity = Number(formData.get("quantity"));

  try {
    // Find the user's cart
    console.log('Finding cart for userId:', userId);
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
    });
    console.log('Cart found:', cart);

    if (!cart) {
      console.error('Cart not found for the user');
      throw new Error("Cart not found for the user");
    }

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        cartItems: {
          upsert: {
            where: { cartId_productId: { cartId: cart.id, productId } },
            update: { quantity: { increment: quantity } },
            create: { productId, quantity },
            
          },
        },
      },

      include: { cartItems: true },
      
    });


    console.log('Cart updated:', updatedCart);
    return updatedCart;

    
    
    
  } catch (error) {
    console.error('Failed to update cart:', error);
    throw new Error('Failed to update cart');
  }
  finally {
    redirect('/dashboard/products');
}

}

