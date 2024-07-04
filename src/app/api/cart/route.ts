// pages/api/cart.ts
import { prisma } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.body;

    try {
      // Trouver le panier de l'utilisateur
      const cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found for the user' });
      }

      const updatedCart = await prisma.cart.update({
        where: { userId },
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

      return res.status(200).json(updatedCart);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return res.status(500).json({ error: 'Failed to add to cart' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}