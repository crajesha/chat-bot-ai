import { useState, useRef, useEffect } from "react";
import { Send, Menu, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Conversation, Message } from "@/pages/Index";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  conversation: Conversation | null;
  onUpdateConversation: (id: string, messages: Message[], title?: string) => void;
  onNewChat: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

const userName = "Rajesha";

export const ChatArea = ({
  conversation,
  onUpdateConversation,
  onNewChat,
  sidebarOpen,
  onToggleSidebar,
}: Props) => {
  const { displayName } = useAuth();
  const userName = displayName || "User";
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    let conv = conversation;
    if (!conv) {
      onNewChat();
      // We need to wait for the new chat - use a workaround
      return;
    }

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...conv.messages, userMsg];
    const isFirst = conv.messages.length === 0;
    const title = isFirst ? input.trim().slice(0, 40) : undefined;

    onUpdateConversation(conv.id, newMessages, title);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMessages },
      });

      if (error) throw error;

      const assistantMsg: Message = {
        role: "assistant",
        content: data?.response || "Sorry, I couldn't generate a response.",
      };

      onUpdateConversation(conv.id, [...newMessages, assistantMsg], title);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: Message = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };
      onUpdateConversation(conv.id, [...newMessages, errorMsg], title);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Welcome screen
  if (!conversation || conversation.messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-screen">
        {/* Top bar */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          {!sidebarOpen && (
            <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Menu size={20} />
            </button>
          )}
          <span className="font-display text-lg font-semibold text-primary">Promi</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="text-primary" size={32} />
            </div>
            <h2 className="font-display text-3xl font-bold mb-2">
              Hi {userName} 👋
            </h2>
            <p className="text-muted-foreground text-lg">
              How can I help you today?
            </p>
          </div>

          {/* Quick prompts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full mb-8">
            {[
              "Explain quantum computing simply",
              "Write a Python function to sort a list",
              "Give me ideas for a birthday gift",
              "Summarize the theory of relativity",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  if (!conversation) onNewChat();
                  setInput(prompt);
                }}
                className="p-4 rounded-xl bg-card border border-border text-left text-sm text-foreground hover:bg-secondary transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-border">
          <div className="max-w-3xl mx-auto flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Promi..."
              rows={1}
              className="flex-1 resize-none rounded-xl bg-chat-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Promi can make mistakes. Developed by C.Rajesha
          </p>
        </div>
      </div>
    );
  }

  // Chat view
  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Top bar */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        {!sidebarOpen && (
          <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Menu size={20} />
          </button>
        )}
        <span className="font-display text-lg font-semibold text-primary">Promi</span>
        <span className="text-sm text-muted-foreground truncate">{conversation.title}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {conversation.messages.map((msg, i) => (
          <div
            key={i}
            className={`py-6 px-4 ${
              msg.role === "user" ? "bg-chat-user" : "bg-chat-assistant"
            }`}
          >
            <div className="max-w-3xl mx-auto flex gap-4">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                {msg.role === "user" ? userName[0] : "P"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {msg.role === "user" ? userName : "Promi"}
                </p>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="py-6 px-4 bg-chat-assistant">
            <div className="max-w-3xl mx-auto flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                P
              </div>
              <div className="flex items-center gap-1 pt-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Promi..."
            rows={1}
            className="flex-1 resize-none rounded-xl bg-chat-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Promi can make mistakes. Developed by C.Rajesha
        </p>
      </div>
    </div>
  );
};
