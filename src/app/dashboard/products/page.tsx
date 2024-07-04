
import { getAllProducts } from "@/lib/actionsProducts";
import ListCards from "../../components/ProductsList";
import { getUser } from "@/lib/actionsUsers";




export default async function Home() {
    const products = await getAllProducts()
    const user = await getUser();

    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return <div>Please sign in</div>;
    }

  return (
    <div>
     

      <ListCards products={products} user={user} />

    </div>
  );
}