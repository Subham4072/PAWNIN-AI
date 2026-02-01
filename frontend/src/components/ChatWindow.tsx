/**
 * ChatWindow Component
 * 
 * This is the main chat display area where all messages are shown.
 * It includes the Earth background animation and handles scrolling
 * to new messages. Messages are displayed in chronological order
 * with user messages on the right and AI responses on the left.
 * 
 * UI Effect: The primary content area for conversation display
 */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatBubble from './ChatBubble';
import EarthBackground from './EarthBackground';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isAnimating?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatWindow = ({ messages, isTyping, onSuggestionClick }: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Earth background */}
      <EarthBackground />

      {/* Messages container */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto custom-scrollbar z-10 p-4 md:p-6"
      >
        {messages.length === 0 ? (
          // Empty state
          <motion.div
            className="flex flex-col items-center justify-center h-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Central Rotating Earth Animation */}
            <div className="relative mb-8">
              {/* Shooting Stars */}
              <div className="absolute inset-[-100%] pointer-events-none z-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className="absolute h-0.5 w-24 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-0"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      rotate: '45deg',
                    }}
                    animate={{
                      x: [-100, 200],
                      y: [-100, 200],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 2 + 1,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                      repeatDelay: Math.random() * 3 + 2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="absolute inset-0 rounded-full blur-2xl bg-blue-500/20"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              {/* Earth Container (Static Shadow/Lighting) */}
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.6)] border border-white/10 bg-[#001e4d]">
                
                {/* Rotating Surface */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                >
                    {/* Ocean Base */}
                    <div className="absolute inset-0 bg-[#004875]" />
                    
                    {/* Continents */}
                    <div 
                        className="absolute inset-0 opacity-90"
                        style={{
                            background: `
                                radial-gradient(circle at 30% 30%, #2e7d32 0%, transparent 20%),
                                radial-gradient(circle at 70% 60%, #1b5e20 0%, transparent 25%),
                                radial-gradient(circle at 20% 80%, #388e3c 0%, transparent 15%),
                                radial-gradient(circle at 85% 25%, #4caf50 0%, transparent 20%),
                                radial-gradient(circle at 55% 45%, #1b5e20 0%, transparent 10%),
                                radial-gradient(circle at 60% 80%, #8d6e63 0%, transparent 15%)
                            `,
                            filter: 'blur(3px) contrast(1.2)'
                        }}
                    />
                </motion.div>

                {/* Clouds - Rotating at different speed for parallax */}
                <motion.div
                  className="absolute inset-0 z-10 opacity-60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white rounded-full blur-md"
                      style={{
                        width: `${Math.random() * 30 + 10}%`,
                        height: `${Math.random() * 10 + 5}%`,
                        left: `${Math.random() * 120 - 10}%`,
                        top: `${Math.random() * 120 - 10}%`,
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                    />
                  ))}
                </motion.div>

                {/* Static Lighting Overlay (Atmosphere & Shadow) */}
                <div 
                    className="absolute inset-0 z-20 pointer-events-none rounded-full"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)',
                        boxShadow: 'inset -15px -15px 40px rgba(0,0,0,0.8), inset 5px 5px 15px rgba(255,255,255,0.2)'
                    }}
                />
              </div>

              {/* Satellite Orbit */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 z-20 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative flex items-center justify-center">
                      <div className="w-8 h-1 bg-blue-400/60 rounded-full" />
                      <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                   </div>
                </div>
              </motion.div>
            </div>

            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
              <span className="text-primary glow-text">Hello!</span> I'm PAWNIN
            </h2>
            <p className="text-muted-foreground max-w-md">
              Your AI-powered assistant. Ask me anything and I'll do my best to help you.
            </p>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center max-w-lg">
              {[
                'Tell me a fun fact',
                'Help me write code',
                'Explain something complex',
                'Creative writing ideas',
              ].map((suggestion, i) => (
                <motion.button
                  key={suggestion}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 dark:glass-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-sm dark:shadow-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          // Messages list
          <div className="max-w-4xl mx-auto pt-4 pb-24">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
                isAnimating={message.isAnimating}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <ChatBubble
                message=""
                isUser={false}
                isTyping={true}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
