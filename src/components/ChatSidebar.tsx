import { MessageSquarePlus, Trash2, LogOut } from "lucide-react";
import type { Conversation } from "@/pages/Index";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export const ChatSidebar = ({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  isOpen,
}: Props) => {
  const { displayName, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar flex flex-col border-r border-sidebar-border h-screen">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-primary">Promi</h1>
        <button
          onClick={onNewChat}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          title="New chat"
        >
          <MessageSquarePlus size={20} />
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm ${
              conv.id === activeId
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <span className="truncate flex-1">{conv.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(conv.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-sidebar-foreground truncate">{displayName || "User"}</span>
          <button
            onClick={signOut}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Developed by C.Rajesha
        </p>
      </div>
    </aside>
  );
};
