"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Mic } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AIPrediction } from "@/components/dashboard/AIPrediction";
import { chatSuggestions, predictions } from "@/data/mock";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

const aiResponses: Record<string, string> = {
  "ipl": "Today's IPL matches:\n\n🏏 MI vs CSK — Wankhede Stadium, 7:30 PM\n🏏 RCB vs KKR — Chinnaswamy Stadium, 7:30 PM\n\nMI are favorites at 58% win probability. Rohit Sharma to score 45+ runs at 62% confidence.",
  "messi": "Messi vs Ronaldo comparison:\n\n🇦🇷 Messi: 8 Ballon d'Ors, 850+ goals, 1 World Cup, 4 Champions Leagues. Playmaking genius — 1.1 key passes/game.\n\n🇵🇹 Ronaldo: 5 Ballon d'Ors, 890+ goals, 5 Champions Leagues. Record international scorer — 128 goals.\n\nVerdict: Messi edges it on overall playmaking and trophies; Ronaldo ahead on raw goal volume and longevity.",
  "century": "Fastest century in international cricket: AB de Villiers — 31 balls vs West Indies (2015).\n\nIn T20 World Cup history: Chris Gayle — 47 balls vs South Africa (2016).\n\nIn IPL: Chris Gayle — 30 balls vs Pune Warriors (2013).",
  "nba": "Tonight's NBA playoff games:\n\n🏀 Celtics vs Heat — Game 5, 8:00 PM ET\n🏀 Lakers vs Warriors — Game 6, 10:30 PM ET\n\nLakers are 3-2 up in the series and close out at Crypto.com Arena tonight at 64% probability.",
  "el clasico": "El Clásico prediction (AI):\n\n⚪ Real Madrid win: 45%\n🤝 Draw: 26%\n🔵 Barcelona win: 29%\n\nKey factor: Barcelona's home form (14W-2D-1L) vs Madrid's counter-attacking threat with Vinícius Jr. Expected goals: Barça 1.4, Madrid 1.6. Prediction: 2-1 Real Madrid.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lower.includes(key)) return response;
  }
  return `I can help you with sports scores, player comparisons, predictions, and more. Try asking:\n\n• "Show today's IPL matches"\n• "Compare Messi and Ronaldo"\n• "Who scored the fastest century?"\n• "Which NBA games start tonight?"\n• "AI prediction for El Clásico"`;
}

export default function AIInsightsPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      text: "👋 Hi! I'm SportSphere AI. I can answer questions about live matches, player stats, predictions, and more. What would you like to know?",
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || typing) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: `u-${crypto.randomUUID()}`,
      role: "user",
      text: content,
      time: "now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${crypto.randomUUID()}`,
          role: "ai",
          text: getAIResponse(content),
          time: "now",
        },
      ]);
      setTyping(false);
    }, 800);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Sparkles className="h-5 w-5" />}
          title="AI Insights"
          subtitle="Match predictions, tactical analysis, and an AI assistant that knows everything about sports"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {predictions.map((p) => (
            <AIPrediction key={p.id} prediction={p} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SectionHeader title="AI Assistant" />
<div className="arena-card flex flex-col h-[520px]">
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="w-8 h-8  bg-secondary/10 text-secondary flex items-center justify-center rounded-md">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">SportSphere Assistant</p>                  <p className="text-xs text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-secondary  animate-live-pulse rounded-full" /> Online
                  </p>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
                  >
                    <div
                      className={cn(
                        "w-8 h-8  flex items-center justify-center shrink-0 rounded-full",
                        msg.role === "ai" ? "bg-secondary/10 text-secondary" : "bg-muted/20 text-muted"
                      )}
                    >
                      {msg.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div
                      className={cn(
                        "max-w-[80%]  px-4 py-3 text-sm leading-relaxed whitespace-pre-line rounded-lg",
                        msg.role === "ai"                          ? "bg-muted/10"
                          : "bg-primary text-navy"
                      )}
                    >
                      {msg.text}                      <p className={cn("text-[10px] mt-1.5", msg.role === "ai" ? "text-muted" : "text-berry/60")}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8  bg-secondary/10 text-secondary flex items-center justify-center shrink-0 rounded-full">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted/10 px-4 py-3 rounded-lg">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-2 h-2 bg-muted  animate-bounce rounded-full"
                            style={{ animationDelay: `${i * 150}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-border space-y-2">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {chatSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5  bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors whitespace-nowrap shrink-0 rounded-full"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2.5  border border-border text-muted hover:text-secondary transition-colors rounded-md"
                    aria-label="Voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask anything about sports..."
                    className="flex-1 px-4 py-2.5  border border-border bg-background text-sm outline-none focus:border-secondary/50 focus:ring-2 focus:ring-secondary/10 transition-all rounded-md"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || typing}
className="p-2.5  bg-primary text-navy hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
<div className="arena-card p-4">
              <h3 className="heading text-sm text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" /> AI Capabilities
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  "🤖 Match predictions with confidence scores",
                  "📊 Tactical and formation analysis",
                  "🔄 Player and team comparisons",
                  "💡 Fantasy team and captain suggestions",
                  "📰 AI-powered news summaries",
                  "🔮 Career and market value projections",
                ].map((c) => (
                  <li key={c} className="bg-muted/10  px-3 py-2 rounded-md">{c}</li>
                ))}
              </ul>
            </div>

<div className="arena-card p-4">
              <h3 className="heading text-sm text-foreground mb-3">Natural Language Search</h3>
              <p className="text-xs text-muted leading-relaxed">
                Ask in plain English and SportSphere AI will find the answer. Try voice search
                using the microphone button for hands-free queries.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
