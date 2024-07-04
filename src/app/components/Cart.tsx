'use server';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { deleteFromCard } from '@/lib/actionsCart';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default async function Cart(user: any) {
    console.log(user);

    const cartId = user.cart.id; // Remplacez par l'ID de la carte

    return (
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        Find your products in Card{' '}
                    </SheetDescription>
                    <div className='mt-8'>
                        <div className='flow-root'>
                            <ul
                                role='list'
                                className='divide-gray-200 -my-6 divide-y'
                            >
                                {user.cart?.cartItems.map(
                                    (item: any) => (
                                        <li
                                            key={item.id}
                                            className='flex py-6'
                                        >
                                            {item.product &&
                                                item.product
                                                    .image && (
                                                    <div className='border-gray-200 relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border'>
                                                        <Image
                                                            src={
                                                                item
                                                                    .product
                                                                    .image
                                                            }
                                                            alt={
                                                                item
                                                                    .product
                                                                    .title as string
                                                            }
                                                            fill
                                                            className='h-full w-full object-cover object-center fill '
                                                        />
                                                    </div>
                                                )}

                                            <div className='ml-4 flex flex-1 flex-col'>
                                                <div>
                                                    <div className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-gray-900 flex justify-between text-base hover:bg-base-200 text-xs font-bold  '>
                                                        <h3>
                                                            {item.product &&
                                                                item
                                                                    .product
                                                                    .id &&
                                                                item
                                                                    .product
                                                                    .title && (
                                                                    <a
                                                                        href={`/products/${item.product.id}`}
                                                                    >
                                                                        {
                                                                            item
                                                                                .product
                                                                                .title
                                                                        }
                                                                    </a>
                                                                )}
                                                        </h3>
                                                        <div className='ml-4'>
                                                            {item
                                                                .product
                                                                .price *
                                                                item.quantity}{' '}
                                                            €
                                                        </div>
                                                    </div>
                                                    <div className='text-gray-500 mt-1 text-xs'>
                                                        {item.product &&
                                                            item
                                                                .product
                                                                .title}
                                                    </div>
                                                </div>
                                                <div className='flex flex-1 items-end justify-between text-sm'>
                                                    <div className='text-gray-500'>
                                                        Qty{' '}
                                                        {
                                                            item.quantity
                                                        }
                                                    </div>
                                                    <form
                                                        action={
                                                            deleteFromCard
                                                        }
                                                    >
                                                        <input
                                                            type='text'
                                                            name='cartId'
                                                            defaultValue={
                                                                cartId
                                                            }
                                                            className='  hidden'
                                                        />
                                                        <input
                                                            type='text'
                                                            name='productId'
                                                            defaultValue={
                                                                item
                                                                    .product
                                                                    .id
                                                            }
                                                            className='  hidden'
                                                        />
                                                        <Button variant={"outline"} type='submit'>
                                                            Delete
                                                        </Button>
                                                    </form>

                                                    <div className='flex'></div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
/*


const user = await getUser();
    const cart = await getCart(user?.id as string)

    console.log(user)
    console.log(cart)


 const handleClick = (itemProductId: any):any => {
        "use server"
        
        const productId = itemProductId
        console.log("Salut je suis la console",cartId, productId)
        deleteFromCard(cartId, productId);
        redirect('/dashboard/products')

      };

                                                <form action={handleClick(item.productId)}>
                                                                        </form>


*/
