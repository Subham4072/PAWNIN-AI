/**
 * Index Page - Main PAWNIN Application
 * 
 * This is the main orchestrator page for the PAWNIN AI chat platform.
 * It manages the overall application state including:
 * - Loading screen display
 * - Sidebar visibility
 * - Chat history and active conversation
 * - Message sending and mock AI responses
 * - User settings (animations, font size)
 * 
 * The page coordinates all major components: LoadingScreen, Sidebar,
 * Header, ChatWindow, and ChatInput to create a cohesive chat experience.
 * 
 * Loading management: Controlled by the isLoading state, the LoadingScreen
 * component is rendered initially and transitions out via the onComplete callback.
 */

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChatWindow, { Message } from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import { useChat } from '@/hooks/useChat';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

const Index = () => {
  // API hook
  const { sendMessage: sendChatMessage, loading: apiLoading, error: apiError } = useChat();

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Chat state
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Settings state
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('pawnin_animations');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('pawnin_fontsize');
    return saved !== null ? parseInt(saved) : 14;
  });

  // Show API errors as toasts
  useEffect(() => {
    if (apiError) {
      console.error('API Error:', apiError);
    }
  }, [apiError]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('pawnin_animations', JSON.stringify(animationsEnabled));
  }, [animationsEnabled]);

  useEffect(() => {
    localStorage.setItem('pawnin_fontsize', fontSize.toString());
  }, [fontSize]);

  // Get current chat messages
  const activeChat = chatHistory.find((chat) => chat.id === activeChatId);

  // Handle loading complete
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Create new chat
  const handleNewChat = useCallback(() => {
    const newChatId = Date.now().toString();
    setActiveChatId(newChatId);
    setMessages([]);
    setIsSidebarOpen(false);
  }, []);

  // Select existing chat
  const handleSelectChat = useCallback((id: string) => {
    const chat = chatHistory.find((c) => c.id === id);
    if (chat) {
      setActiveChatId(id);
      setMessages(chat.messages);
    }
    setIsSidebarOpen(false);
  }, [chatHistory]);

  // Delete chat
  const handleDeleteChat = useCallback((id: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
      setMessages([]);
    }
  }, [activeChatId]);

  // Clear all chats
  const handleClearChats = useCallback(() => {
    setChatHistory([]);
    setActiveChatId(null);
    setMessages([]);
  }, []);

  // Send message and get AI response from backend
  const handleSendMessage = useCallback(
  ({ text, file }: { text: string; file?: File }) => {
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      isUser: true,
      timestamp: new Date(),
    };

    // Add to messages
    setMessages((prev) => [...prev, userMessage]);

    // If no active chat, create one
    if (!activeChatId) {
      const newChatId = Date.now().toString();
      setActiveChatId(newChatId);
      setChatHistory((prev) => [
        {
          id: newChatId,
          title: text.slice(0, 30) + (text.length > 30 ? '...' : ''),
          timestamp: new Date(),
          messages: [userMessage],
        },
        ...prev,
      ]);
    } else {
      // Update existing chat
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat
        )
      );
    }

    // Show typing indicator
    setIsTyping(true);

    // Send to backend API
    sendChatMessage(text).then((aiReply) => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiReply || "Sorry, I couldn't process your message. Please try again.",
        isUser: false,
        timestamp: new Date(),
        isAnimating: true, // Enable typing animation
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);

      // Update chat history with AI response
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === (activeChatId || Date.now().toString())
            ? { ...chat, messages: [...chat.messages, aiResponse] }
            : chat
        )
      );

      // Disable animation after message finishes typing (duration based on text length)
      const animationDuration = (aiReply?.length || 0) * 30 + 500;
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiResponse.id ? { ...msg, isAnimating: false } : msg
          )
        );
      }, animationDuration);
    });
  }, [activeChatId, sendChatMessage]);

  return (
    <div 
      className="min-h-screen flex flex-col bg-gray-50 dark:gradient-bg transition-colors duration-300"
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main app content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              chatHistory={chatHistory}
              activeChatId={activeChatId}
              onNewChat={handleNewChat}
              onSelectChat={handleSelectChat}
              onDeleteChat={handleDeleteChat}
            />

            {/* Header */}
            <Header
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              onClearChats={handleClearChats}
              animationsEnabled={animationsEnabled}
              onToggleAnimations={setAnimationsEnabled}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
            />

            {/* Chat window */}
            <ChatWindow 
              messages={messages} 
              isTyping={isTyping} 
              onSuggestionClick={(text) => handleSendMessage({ text })}
            />

            {/* Chat input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
