import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";

const creators = [
  { name: "Priya Sharma", craft: "Resin Art", connected: true },
  { name: "Ankit Verma", craft: "Macrame & Decor", connected: false },
  { name: "Meera Patel", craft: "Textile Design", connected: true },
  { name: "Rohit Kumar", craft: "Gift Crafting", connected: false },
];

const SellerConnections = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">Connections</h1>
      </header>

      <section className="px-4 pb-8 space-y-3">
        {creators.map((c, i) => (
          <div key={i} className="craft-card p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center shrink-0 font-display font-bold text-primary text-sm">
              {c.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-semibold text-foreground text-sm">{c.name}</h4>
              <p className="text-xs text-muted-foreground font-body">{c.craft}</p>
            </div>
            <button className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold ${c.connected ? "bg-secondary text-secondary-foreground" : "gradient-warm text-primary-foreground"}`}>
              {c.connected ? "Connected" : "Connect"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SellerConnections;
