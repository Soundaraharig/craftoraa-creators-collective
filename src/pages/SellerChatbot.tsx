import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const quickQuestions = [
  "How to price my products?",
  "Packaging tips for shipping",
  "Marketing on social media",
  "Product photography ideas",
];

const SellerChatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm your Craftoraa business assistant. Ask me anything about pricing, packaging, shipping, marketing, or product ideas! 🎨" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "bot", content: "Thanks for your question! This feature will be powered by AI soon. For now, check out our seller resources for helpful tips." },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/seller")} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <Bot className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-display font-bold text-foreground">Problem Solver</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body ${m.role === "user" ? "gradient-warm text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {quickQuestions.map((q) => (
            <button key={q} onClick={() => sendMessage(q)} className="px-3 py-1.5 rounded-full bg-card text-xs font-body text-foreground border border-border">
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask a question..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-body"
          />
          <button onClick={() => sendMessage(input)} className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center shrink-0">
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerChatbot;
