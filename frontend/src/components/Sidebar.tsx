/**
 * Sidebar Component
 * 
 * This component renders the navigation sidebar/menubar of the PAWNIN app.
 * It contains the app logo, new chat button, and scrollable chat history list.
 * The sidebar is toggleable and behaves differently on mobile (full-screen overlay)
 * versus desktop (slide-in panel).
 * 
 * UI Effect: Provides navigation and chat organization capabilities
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatHistoryItem[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
}

const Sidebar = ({
  isOpen,
  onClose,
  chatHistory,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay for mobile */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.aside
            className="fixed left-0 top-0 h-full w-72 md:w-80 bg-white dark:bg-sidebar border-r border-gray-200 dark:border-sidebar-border z-50 flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header with logo and close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-sidebar-border">
              <div className="flex items-center gap-3">
                {/* Mini logo */}
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-5 h-5">
                    <circle cx="50" cy="30" r="18" fill="currentColor" className="text-primary" />
                    <ellipse cx="50" cy="60" rx="24" ry="28" fill="currentColor" className="text-primary/80" />
                    <rect x="32" y="26" width="36" height="8" fill="currentColor" className="text-white dark:text-sidebar" rx="2" />
                  </svg>
                </div>
                <h1 className="font-display font-bold text-lg">
                  <span className="text-primary">PAWN</span>
                  <span className="text-gray-900 dark:text-sidebar-foreground">IN</span>
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden text-gray-500 dark:text-sidebar-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-sidebar-accent"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* New Chat button */}
            <div className="p-4">
              <Button
                onClick={onNewChat}
                className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 gap-2 transition-all duration-300 hover:glow-cyan"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>

            {/* Chat history list */}
            <ScrollArea className="flex-1 px-2 custom-scrollbar">
              <div className="space-y-1 pb-4">
                {chatHistory.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm py-8">
                    No chat history yet
                  </p>
                ) : (
                  chatHistory.map((chat) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group relative"
                    >
                      <button
                        onClick={() => onSelectChat(chat.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                          activeChatId === chat.id
                            ? 'bg-gray-100 dark:bg-sidebar-accent text-primary'
                            : 'text-gray-700 dark:text-sidebar-foreground hover:bg-gray-100 dark:hover:bg-sidebar-accent/50'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium">
                            {chat.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {chat.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                      </button>
                      
                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all duration-200"
                        aria-label="Delete chat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-sidebar-border">
              <p className="text-xs text-muted-foreground text-center">
                Powered by PAWNIN AI
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
