/**
 * ChatBubble Component
 * 
 * This component renders individual chat messages (both user and AI).
 * User messages appear on the right with primary color styling.
 * AI messages appear on the left with a glass-like appearance.
 * AI messages include a copy button for easy content copying.
 * 
 * UI Effect: Displays conversation messages with appropriate styling and interactions
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, User, Bot, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
  timestamp?: Date;
  isAnimating?: boolean;
}

const ChatBubble = ({ message, isUser, isTyping = false, timestamp, isAnimating = false }: ChatBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const { displayedText } = useTypingAnimation(isAnimating ? message : '', 30);
  const { speak } = useTextToSpeech();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <motion.div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary/30 text-secondary border border-secondary/50'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message bubble */}
      <div className={`relative max-w-[80%] md:max-w-[70%] group ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 ${
            isUser
              ? 'chat-bubble-user'
              : 'bg-white border border-gray-200 text-gray-800 dark:chat-bubble-ai dark:border-none'
          } ${!isUser ? 'rounded-2xl rounded-tl-none shadow-sm dark:shadow-none' : 'rounded-2xl rounded-tr-none'}`}
        >
        {isTyping ? (
            <div className="flex gap-1 py-1">
              <motion.span
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
              />
              <motion.span
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          ) : isAnimating ? (
            <p className="leading-relaxed whitespace-pre-wrap">
              {displayedText}
              <motion.span
                className="inline-block w-1 h-5 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            </p>
          ) : (
            <p className="leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && !isTyping && (
          <p className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}

        {/* Actions for AI messages (Copy + Speak) */}
{!isUser && !isTyping && (
  <motion.div
    className="absolute -bottom-1 left-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    initial={false}
  >
    {/* Copy button */}
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-primary hover:bg-muted/50"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{copied ? 'Copied to clipboard!' : 'Copy response'}</p>
      </TooltipContent>
    </Tooltip>

    {/* Speaker button (BESIDE copy) */}
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => speak(message)}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-primary hover:bg-muted/50"
        >
          <Volume2 className="w-3 h-3 mr-1" />
          Speak
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Speak response</p>
      </TooltipContent>
    </Tooltip>
  </motion.div>
)}
      </div>
    </motion.div>
  );
}


export default ChatBubble;
