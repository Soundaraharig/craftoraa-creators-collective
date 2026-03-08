import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import categoryResin from "@/assets/category-resin.jpg";
import categoryHomeDecor from "@/assets/category-homedecor.jpg";
import categoryTextile from "@/assets/category-textile.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

const categories = [
  {
    title: "Resin Products",
    desc: "Keychains, jewelry & decorative pieces",
    image: categoryResin,
    path: "/customer/resin",
  },
  {
    title: "Home Decor",
    desc: "Wall art, lamps & interior crafts",
    image: categoryHomeDecor,
    path: "/customer/homedecor",
  },
  {
    title: "Textile",
    desc: "Clothing, embroidery & fabrics",
    image: categoryTextile,
    path: "/customer/textile",
  },
  {
    title: "Gift Products",
    desc: "Customized gifts for special occasions",
    image: categoryGifts,
    path: "/customer/gifts",
  },
];

const CustomerBrowse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            Browse Crafts
          </h1>
          <p className="text-xs text-muted-foreground font-body">
            Discover unique handmade products
          </p>
        </div>
      </header>

      {/* Search */}
      <section className="px-4 pb-4">
        <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search crafts, sellers, or categories..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-body"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-8">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">
          Categories
        </h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => navigate(cat.path)}
              className="craft-card w-full flex overflow-hidden cursor-pointer border-0"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-28 h-28 object-cover shrink-0"
              />
              <div className="p-4 flex flex-col justify-center text-left">
                <h4 className="font-display font-semibold text-foreground text-base">
                  {cat.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 font-body leading-relaxed">
                  {cat.desc}
                </p>
                <span className="text-xs text-primary font-semibold mt-2 font-body">
                  Browse →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerBrowse;
