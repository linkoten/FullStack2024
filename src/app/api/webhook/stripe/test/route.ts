import { prisma } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.body;

    try {
      console.log('Received request to add product to cart:', { userId, productId, quantity });

      // Vérifier si le panier de l'utilisateur existe
      let cart = await prisma.cart.findUnique({
        where: {
          userId: userId,
        },
      });

      console.log('Cart found:', cart);

      // Si le panier n'existe pas, le créer
      if (!cart) {
        console.log('Cart not found, creating a new cart for user:', userId);

        cart = await prisma.cart.create({
          data: {
            userId: userId,
            items: {
              create: [],
            },
          },
        });
      }

      console.log('New cart created:', cart);


      // Vérifier si le produit est déjà dans le panier
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      });

      console.log('Existing cart item found:', existingCartItem);

      if (existingCartItem) {
        console.log('Product already in cart, updating quantity');

        // Si le produit est déjà dans le panier, mettre à jour la quantité
        await prisma.cartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity + quantity,
          },
        });
        console.log('Quantity updated for cart item:', existingCartItem.id);

      } else {
        console.log('Product not in cart, adding new cart item');

        // Si le produit n'est pas dans le panier, l'ajouter
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            userId: userId,
          },
        });
        console.log('New cart item added');

      }

      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ error: 'Could not add product to cart' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}