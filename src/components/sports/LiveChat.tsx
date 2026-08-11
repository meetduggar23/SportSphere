"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, Heart } from "lucide-react";
import { matchComments } from "@/data/mock";
import { cn } from "@/lib/utils";

export function LiveChat() {
  const [messages, setMessages] = useState(matchComments);
  const [input, setInput] = useState("");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        user: "You",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=YOU",
        text: input.trim(),
        time: "now",
        likes: 0,
      },
    ]);
    setInput("");
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
        {messages.map((msg) => {
          const isLiked = liked.has(msg.id);
          return (
            <div key={msg.id} className="flex gap-3">
              <Image
                src={msg.avatar}
                alt={msg.user}
                width={32}
                height={32}
                className="w-8 h-8  shrink-0 bg-muted/20 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{msg.user}</span>
                  <span className="text-[10px] text-muted">{msg.time}</span>
                </div>
                <p className="text-sm mt-0.5">{msg.text}</p>
                <button
                  onClick={() => toggleLike(msg.id)}
                  className={cn(
                    "flex items-center gap-1 text-xs mt-1 transition-colors",
                    isLiked ? "text-secondary" : "text-muted hover:text-secondary"
                  )}
                >
                  <Heart className={cn("h-3 w-3", isLiked && "fill-current")} />
                  {msg.likes + (isLiked ? 1 : 0)}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Join the conversation..."
            className="flex-1 px-3 py-2  border border-border bg-background text-sm outline-none focus:border-secondary/50 focus:ring-2 focus:ring-secondary/10 transition-all rounded-md"
          />
          <button
            onClick={send}            className="p-2.5  bg-primary text-navy hover:bg-primary-hover transition-colors rounded-md"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
