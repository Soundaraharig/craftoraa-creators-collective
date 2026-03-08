import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Image as ImageIcon } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

const mockProducts: Product[] = [
  { id: "1", name: "Resin Flower Keychain", price: 299, category: "Resin", description: "Handmade resin keychain with dried flowers" },
  { id: "2", name: "Macrame Wall Hanging", price: 799, category: "Home Decor", description: "Cotton macrame with wooden beads" },
];

const SellerProducts = () => {
  const navigate = useNavigate();
  const [products] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground flex-1">My Products</h1>
        <button onClick={() => setShowForm(!showForm)} className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center">
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </header>

      {showForm && (
        <section className="px-4 pb-4 animate-fade-up">
          <div className="craft-card p-4 space-y-3">
            <h3 className="font-display font-semibold text-foreground text-sm">Add New Product</h3>
            <input placeholder="Product name" className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none" />
            <input placeholder="Price (₹)" type="number" className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none" />
            <select className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm font-body text-foreground outline-none">
              <option>Resin</option>
              <option>Home Decor</option>
              <option>Textile</option>
              <option>Gifts</option>
            </select>
            <textarea placeholder="Description" rows={2} className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none" />
            <div className="flex items-center gap-2 p-3 border border-dashed border-border rounded-lg text-muted-foreground">
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs font-body">Upload product images</span>
            </div>
            <button className="w-full gradient-warm text-primary-foreground font-body font-semibold text-sm py-2.5 rounded-lg">
              Add Product
            </button>
          </div>
        </section>
      )}

      <section className="px-4 pb-8 space-y-3">
        {products.map((p) => (
          <div key={p.id} className="craft-card p-4 flex gap-3">
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-semibold text-foreground text-sm truncate">{p.name}</h4>
              <p className="text-xs text-muted-foreground font-body">{p.category}</p>
              <p className="text-sm font-semibold text-primary font-body mt-1">₹{p.price}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SellerProducts;
