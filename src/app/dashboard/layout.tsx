
import ButtonSignOut from "@/app/components/ButtonSignOut";
import DashboardNav from "@/app/components/DashboardNav";
import {getUser } from "@/lib/actionsUsers";
import {stripe} from "@/lib/stripe"
import { prisma } from "@/lib/db";
import Cart from "../components/Cart";
import { getCart } from "@/lib/actionsCart";

export default async function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const cart = await getCart(user?.id as string)



  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <div>Please sign in</div>;
  }


  
  if (!user?.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: user?.email as string,
    });

    await prisma.user.update({
      where: {
        id: user?.id as string,
      },
      data: {
        stripeCustomerId: stripeCustomer.id as string,
      }
    });
  }
  
  return (
    <section className="max-w-[1200px] mx-auto md:flex items-center gap-4 h-screen w-full mt-2 p-2">
      <DashboardNav />
      <div className="w-full h-full ">
        <div className="flex items-center justify-end mb-2 mt-3 lg:mt-0 p-3 space-x-2">

        <ButtonSignOut />
        <Cart user={user} cart={cart}/>

        </div>

        
        {children}
      </div>
    </section>
  );
}