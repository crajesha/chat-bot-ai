import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

export type Message = {
  role: "user" | "assistant";
  content: string;
};

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeConversation = conversations.find((c) => c.id === activeId) || null;

  const createNewChat = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: "New chat",
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
  };

  const updateConversation = (id: string, messages: Message[], title?: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, messages, title: title || c.title }
          : c
      )
    );
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={createNewChat}
        onDelete={deleteConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <ChatArea
        conversation={activeConversation}
        onUpdateConversation={updateConversation}
        onNewChat={createNewChat}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
};

export default Index;
