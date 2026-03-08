import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";

const SellerFeedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [type, setType] = useState("suggestion");

  const handleSubmit = () => {
    toast.success("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">Feedback</h1>
      </header>

      <section className="px-4 pb-8 space-y-5">
        <div>
          <label className="text-sm font-body font-semibold text-foreground mb-2 block">Rate your experience</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)}>
                <Star className={`w-7 h-7 ${s <= rating ? "text-accent fill-accent" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-body font-semibold text-foreground mb-2 block">Feedback type</label>
          <div className="flex gap-2">
            {["suggestion", "bug", "other"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold capitalize ${type === t ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-body font-semibold text-foreground mb-2 block">Your feedback</label>
          <textarea rows={4} placeholder="Tell us how we can improve..." className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none" />
        </div>

        <button onClick={handleSubmit} className="w-full gradient-warm text-primary-foreground font-body font-semibold text-sm py-3 rounded-xl">
          Submit Feedback
        </button>
      </section>
    </div>
  );
};

export default SellerFeedback;
