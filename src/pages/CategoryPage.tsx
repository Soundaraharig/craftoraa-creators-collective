import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Heart } from "lucide-react";
import categoryResin from "@/assets/category-resin.jpg";
import categoryHomeDecor from "@/assets/category-homedecor.jpg";
import categoryTextile from "@/assets/category-textile.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

const categoryData: Record<string, { title: string; image: string; products: { name: string; price: number; seller: string; rating: number }[] }> = {
  resin: {
    title: "Resin Products",
    image: categoryResin,
    products: [
      { name: "Ocean Wave Keychain", price: 249, seller: "Priya Crafts", rating: 4.8 },
      { name: "Dried Flower Pendant", price: 399, seller: "ArtByMeera", rating: 4.6 },
      { name: "Resin Coaster Set (4)", price: 699, seller: "CraftNest", rating: 4.9 },
      { name: "Galaxy Ring", price: 349, seller: "StarResin", rating: 4.5 },
    ],
  },
  homedecor: {
    title: "Home Decor",
    image: categoryHomeDecor,
    products: [
      { name: "Macrame Wall Hanging", price: 899, seller: "KnottyVibes", rating: 4.7 },
      { name: "Ceramic Planter", price: 549, seller: "EarthTones", rating: 4.8 },
      { name: "Woven Basket Set", price: 1199, seller: "WeaveArt", rating: 4.6 },
      { name: "Handpainted Lamp", price: 1499, seller: "LightCraft", rating: 4.9 },
    ],
  },
  textile: {
    title: "Textile",
    image: categoryTextile,
    products: [
      { name: "Embroidered Scarf", price: 599, seller: "ThreadWorks", rating: 4.7 },
      { name: "Block Print Tote", price: 449, seller: "PrintCraft", rating: 4.5 },
      { name: "Handwoven Stole", price: 999, seller: "LoomArt", rating: 4.8 },
      { name: "Crochet Top", price: 799, seller: "HookStyle", rating: 4.6 },
    ],
  },
  gifts: {
    title: "Gift Products",
    image: categoryGifts,
    products: [
      { name: "Custom Gift Box", price: 499, seller: "WrapJoy", rating: 4.9 },
      { name: "Personalized Mug", price: 349, seller: "PrintHouse", rating: 4.5 },
      { name: "Memory Scrapbook", price: 899, seller: "PaperLove", rating: 4.8 },
      { name: "Candle Gift Set", price: 649, seller: "WaxCraft", rating: 4.7 },
    ],
  },
};

const CategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const data = categoryData[category || "resin"];

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/customer")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{data.title}</h1>
      </header>

      {/* Banner */}
      <div className="px-4 pb-4">
        <img src={data.image} alt={data.title} className="w-full h-36 object-cover rounded-xl" />
      </div>

      {/* Products Grid */}
      <section className="px-4 pb-8 grid grid-cols-2 gap-3">
        {data.products.map((p, i) => (
          <div key={i} className="craft-card overflow-hidden">
            <div className="h-28 bg-muted relative">
              <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center">
                <Heart className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-3">
              <h4 className="font-body font-semibold text-foreground text-xs truncate">{p.name}</h4>
              <p className="text-[10px] text-muted-foreground font-body">{p.seller}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-sm font-bold text-primary font-body">₹{p.price}</span>
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground font-body">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  {p.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
