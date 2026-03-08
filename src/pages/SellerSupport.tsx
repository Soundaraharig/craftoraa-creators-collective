import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, Mail, FileText, MessageCircle } from "lucide-react";

const supportOptions = [
  { icon: HelpCircle, title: "FAQs", desc: "Common questions & answers" },
  { icon: FileText, title: "Seller Guide", desc: "Step-by-step tutorials" },
  { icon: MessageCircle, title: "Live Chat", desc: "Talk to our support team" },
  { icon: Mail, title: "Email Support", desc: "support@craftoraa.com" },
];

const SellerSupport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">Support</h1>
      </header>

      <section className="px-4 pb-8 space-y-3">
        {supportOptions.map((opt, i) => (
          <button key={i} className="craft-card w-full p-4 flex items-center gap-3 text-left cursor-pointer border-0">
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <opt.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground text-sm">{opt.title}</h4>
              <p className="text-xs text-muted-foreground font-body">{opt.desc}</p>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
};

export default SellerSupport;
