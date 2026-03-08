import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: ["List up to 5 products", "Basic profile", "Community access"],
    current: true,
  },
  {
    name: "Pro",
    price: "₹499/mo",
    features: ["Unlimited products", "Priority visibility", "Analytics dashboard", "Promotional tools"],
    current: false,
    popular: true,
  },
  {
    name: "Premium",
    price: "₹999/mo",
    features: ["Everything in Pro", "Featured seller badge", "Custom storefront", "Dedicated support"],
    current: false,
  },
];

const SellerSubscription = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <Crown className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-display font-bold text-foreground">Subscription</h1>
      </header>

      <section className="px-4 pb-8 space-y-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`craft-card p-5 relative ${plan.popular ? "ring-2 ring-primary" : ""}`}>
            {plan.popular && (
              <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 gradient-warm text-primary-foreground text-xs font-body font-semibold rounded-full">
                Popular
              </span>
            )}
            <div className="flex items-baseline justify-between mb-3">
              <h4 className="font-display font-bold text-foreground text-lg">{plan.name}</h4>
              <span className="font-body font-bold text-primary text-lg">{plan.price}</span>
            </div>
            <ul className="space-y-2 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground">
                  <Check className="w-4 h-4 text-secondary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-lg text-sm font-body font-semibold ${plan.current ? "bg-muted text-muted-foreground" : "gradient-warm text-primary-foreground"}`}>
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SellerSubscription;
