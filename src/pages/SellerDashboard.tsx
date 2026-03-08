import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Users,
  Bot,
  Crown,
  HeadphonesIcon,
  MessageSquare,
} from "lucide-react";

const sellerFeatures = [
  {
    icon: Package,
    title: "Products",
    desc: "Upload, edit & manage your crafts",
    path: "/seller/products",
    gradient: "gradient-warm",
  },
  {
    icon: Users,
    title: "Connections",
    desc: "Network with creators & designers",
    path: "/seller/connections",
    gradient: "gradient-sage",
  },
  {
    icon: Bot,
    title: "Problem Solver",
    desc: "AI chatbot for business help",
    path: "/seller/chatbot",
    gradient: "gradient-warm",
  },
  {
    icon: Crown,
    title: "Subscription",
    desc: "Unlock premium seller features",
    path: "/seller/subscription",
    gradient: "gradient-sage",
  },
  {
    icon: HeadphonesIcon,
    title: "Support",
    desc: "Help center & issue resolution",
    path: "/seller/support",
    gradient: "gradient-warm",
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    desc: "Share suggestions & report issues",
    path: "/seller/feedback",
    gradient: "gradient-sage",
  },
];

const SellerDashboard = () => {
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
            Seller Dashboard
          </h1>
          <p className="text-xs text-muted-foreground font-body">
            Manage your craft business
          </p>
        </div>
      </header>

      {/* Features Grid */}
      <section className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {sellerFeatures.map((feature) => (
            <button
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="craft-card p-4 flex flex-col items-start gap-3 text-left cursor-pointer border-0"
            >
              <div
                className={`w-11 h-11 rounded-xl ${feature.gradient} flex items-center justify-center`}
              >
                <feature.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground text-sm">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 font-body leading-tight">
                  {feature.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;
