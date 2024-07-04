import { decrementProductStock } from '@/lib/actionsProducts';

import { getUser } from '@/lib/actionsUsers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET as string);

interface Data {
    title: string;
    price: number;
    image: string;
    description: string;
    stock: number;
    id: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const data: Data = await request.json();

        console.log('Data received:', data);

        const user = await getUser();

        const customer = await stripe.customers.create({
            email: user?.email as string,
        });
        console.log('Customer created:', customer);

        // Conversion du prix en centimes (Stripe fonctionne avec des centimes)
        const amountInCents = Math.round(data.price * 100); // Convertir en centimes
        if (amountInCents < 50) {
            // Vérification que le montant est au moins de 50 centimes
            throw new Error(
                'The price is too low, must be at least 0.50 in your currency.'
            );
        }

        const checkOutSession = await stripe.checkout.sessions.create(
            {
                payment_method_types: ['card'], // Méthodes de paiement acceptées
                customer: customer.id,
                mode: 'payment', // Mode de paiement unique
                billing_address_collection: 'required',
                customer_update: {
                    address: 'auto',
                    name: 'auto',
                },
                payment_intent_data: {
                    shipping: {
                        name: 'required',
                        address: {
                            line1: 'required',
                            line2: 'Adress Line 2',
                            city: 'City',
                            country: 'Country',
                            postal_code: 'string',
                        },
                    },
                },
                success_url:
                    'http://localhost:3000/dashboard/payment/success', // URL de succès
                cancel_url:
                    'http://localhost:3000/dashboard/payment/cancel', // URL d'annulation
                line_items: [
                    {
                        quantity: 1,
                        price_data: {
                            product_data: {
                                name: data.title, // Nom du produit
                                description: data.description,
                                images: [data.image], // Use 'images' property for the product image URL
                            },
                            currency: 'EUR', // Devise utilisée
                            unit_amount: amountInCents, // Montant en centimes
                        },
                    },
                ],
            }
        );
        console.log('Checkout session created:', checkOutSession.url);

        await decrementProductStock(data.id); // Use data.id from the request body
        console.log('Stock decremented for product:', data.id);

        // Retourner une réponse JSON avec l'URL de la session de paiement
        return NextResponse.json(
            { msg: checkOutSession, url: checkOutSession.url },
            { status: 200 }
        );
    } catch (error: any) {
        // Gestion des erreurs et retour d'une réponse JSON avec le message d'erreur
        console.error('Error occurred:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
};
