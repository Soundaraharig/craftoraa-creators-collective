import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, Lock, Palette, Store, Sparkles, Building, Phone, MapPin, Globe, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Template {
  id: string;
  name: string;
  desc: string;
  requiredPlan: "Starter" | "Pro" | "Luxurious Elegance";
  bgClass: string;
  accentColor: string;
  textColor: string;
}

const templates: Template[] = [
  {
    id: "minimalist",
    name: "Modern Minimalist",
    desc: "Sleek, light design focusing on clean layouts, fine lines, and high-contrast visuals.",
    requiredPlan: "Starter",
    bgClass: "bg-white border border-border text-foreground shadow-sm",
    accentColor: "bg-primary",
    textColor: "text-foreground",
  },
  {
    id: "artisan",
    name: "Vibrant Artisan",
    desc: "Warm color gradients, creative layout, and hand-crafted feel perfect for traditional crafts.",
    requiredPlan: "Pro",
    bgClass: "gradient-warm text-primary-foreground shadow-md",
    accentColor: "bg-secondary",
    textColor: "text-primary-foreground",
  },
  {
    id: "luxury",
    name: "Royal Craft Luxury",
    desc: "Sophisticated dark mode with gold accents, classic serif typography, and premium headers.",
    requiredPlan: "Luxurious Elegance",
    bgClass: "bg-[#1A1F2C] border border-amber-500/20 text-[#F1F1F1] shadow-xl",
    accentColor: "bg-amber-500",
    textColor: "text-amber-400",
  },
];

const SellerProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<any>(null);
  const [activeTemplate, setActiveTemplate] = useState("minimalist");
  const [currentPlan, setCurrentPlan] = useState("Starter");

  useEffect(() => {
    const fetchSellerData = async () => {
      const savedSellerId = localStorage.getItem("craftora_registered_seller_id");
      if (!savedSellerId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("sellers")
          .select("*")
          .eq("id", savedSellerId)
          .single();

        if (data) {
          setSeller(data);
          setCurrentPlan(data.plan || "Starter");
          
          // Load selected template from localStorage or fallback
          const savedTemplate = localStorage.getItem(`craftora_seller_template_${savedSellerId}`) || "minimalist";
          setActiveTemplate(savedTemplate);
        }
      } catch (err) {
        console.error("Error fetching seller profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const getPlanTier = (planName: string) => {
    if (planName === "Luxurious Elegance") return 3;
    if (planName === "Pro") return 2;
    return 1; // Starter / Free
  };

  const getTemplateTier = (planName: string) => {
    if (planName === "Luxurious Elegance") return 3;
    if (planName === "Pro") return 2;
    return 1;
  };

  const userTier = getPlanTier(currentPlan);

  // Remaining templates logic
  // Starter (Tier 1) can access Tier 1 templates. 2 remain locked.
  // Pro (Tier 2) can access Tier 1 & 2 templates. 1 remains locked.
  // Luxurious Elegance (Tier 3) can access all 3 templates. 0 remain locked.
  const unlockedCount = templates.filter(t => getTemplateTier(t.requiredPlan) <= userTier).length;
  const lockedCount = templates.length - unlockedCount;

  const handleSelectTemplate = async (template: Template) => {
    const templateTier = getTemplateTier(template.requiredPlan);
    
    if (templateTier > userTier) {
      toast({
        title: "Premium Template Locked 🔒",
        description: `This template requires the ${template.requiredPlan} plan. Redirecting to subscription page...`,
        variant: "destructive",
      });
      setTimeout(() => {
        navigate("/seller/subscription");
      }, 1500);
      return;
    }

    setActiveTemplate(template.id);
    if (seller?.id) {
      localStorage.setItem(`craftora_seller_template_${seller.id}`, template.id);
    }
    toast({
      title: "Template Updated! 🎨",
      description: `Your storefront is now using the "${template.name}" template.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <header className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground">Seller Profile</h1>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Store className="w-10 h-10" />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="text-xl font-display font-bold text-foreground">Seller Profile Not Found</h2>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              You haven't registered your seller profile in the Craftora Collective yet. 
              Register now to setup your storefront and choose templates!
            </p>
          </div>
          <button
            onClick={() => navigate("/seller/subscription")}
            className="gradient-warm text-primary-foreground font-body font-semibold px-6 py-3 rounded-lg text-sm shadow-md transition-transform hover:scale-[1.02]"
          >
            Go Register & Subscribe
          </button>
        </main>
      </div>
    );
  }

  const activeTemplateObj = templates.find(t => t.id === activeTemplate) || templates[0];

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <Palette className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-display font-bold text-foreground">Seller Profile & Templates</h1>
      </header>

      <main className="px-4 space-y-6">
        {/* Profile Card */}
        <section className="craft-card p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Seller Account</span>
              <h2 className="text-2xl font-display font-bold text-foreground mt-0.5">{seller.name}</h2>
              <p className="text-sm text-primary font-body font-semibold mt-0.5">{seller.craft_type} Artisan</p>
            </div>
            <div className="px-3 py-1.5 rounded-full gradient-warm text-primary-foreground font-body font-bold text-xs flex items-center gap-1.5 shadow-sm">
              <Crown className="w-3.5 h-3.5" />
              {currentPlan}
            </div>
          </div>

          <hr className="border-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground font-body">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-primary shrink-0" />
              <span><strong>Business:</strong> {seller.business_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span><strong>Location:</strong> {seller.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span><strong>Contact:</strong> {seller.contact}</span>
            </div>
            {seller.social_media && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <span><strong>Socials:</strong> {seller.social_media}</span>
              </div>
            )}
          </div>
        </section>

        {/* Live Storefront Preview */}
        <section className="space-y-3">
          <h3 className="text-sm font-display font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-secondary" /> Storefront Preview
          </h3>
          
          <div className={`rounded-2xl p-5 transition-all duration-300 ${activeTemplateObj.bgClass}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTemplateObj.accentColor} text-white font-bold text-sm`}>
                  {seller.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display leading-none">{seller.business_name}</h4>
                  <span className="text-[9px] opacity-75 font-body">{seller.location}</span>
                </div>
              </div>
              <span className={`text-[9px] font-bold font-body px-2 py-0.5 rounded-full ${activeTemplateObj.accentColor} text-white`}>
                Open Shop
              </span>
            </div>

            <div className="p-3 bg-black/5 rounded-xl border border-black/5 dark:bg-white/5 dark:border-white/5 space-y-2">
              <p className="text-[11px] font-semibold">Featured Craft</p>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 shrink-0 flex items-center justify-center">
                  ✨
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold truncate">Premium Handcrafted {seller.craft_type}</p>
                  <p className="text-[9px] opacity-85 leading-tight font-body mt-0.5">Custom designs tailored to order</p>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] opacity-70 text-right mt-3 font-body italic">
              Theme template active: {activeTemplateObj.name}
            </p>
          </div>
        </section>

        {/* Template Selection Grid */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-display font-semibold text-foreground">Select Storefront Template</h3>
              <p className="text-xs text-muted-foreground font-body">Tap to switch your live storefront layout</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-body font-bold text-primary block">
                {unlockedCount} / {templates.length} Unlocked
              </span>
              {lockedCount > 0 && (
                <span className="text-[10px] text-muted-foreground font-body block">
                  ({lockedCount} remaining locked)
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates
              .filter((template) => getTemplateTier(template.requiredPlan) <= userTier)
              .map((template) => {
                const isLocked = getTemplateTier(template.requiredPlan) > userTier;
                const isActive = activeTemplate === template.id;

                return (
                  <button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    className={`craft-card p-4 text-left transition-all border relative flex flex-col justify-between h-40 ${
                      isActive
                        ? "ring-2 ring-primary bg-primary/5 border-primary/20"
                        : isLocked
                        ? "opacity-75 border-border bg-muted/40 cursor-pointer"
                        : "border-border hover:border-primary/50 cursor-pointer"
                    }`}
                  >
                    {isLocked && (
                      <span className="absolute top-3 right-3 bg-destructive/15 text-destructive p-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute top-3 right-3 bg-secondary/15 text-secondary p-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}

                    <div>
                      <h4 className="font-display font-semibold text-foreground text-sm flex items-center gap-1.5">
                        {template.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-body mt-1 leading-normal">
                        {template.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] font-body font-bold text-muted-foreground uppercase">
                        Requires: {template.requiredPlan}
                      </span>
                      {isLocked ? (
                        <span className="text-[10px] font-body font-semibold text-primary underline">
                          Upgrade
                        </span>
                      ) : isActive ? (
                        <span className="text-[10px] font-body font-bold text-secondary">
                          Active Theme
                        </span>
                      ) : (
                        <span className="text-[10px] font-body font-semibold text-foreground opacity-60">
                          Use Template
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerProfile;
