/**
 * ChatInput Component
 * 
 * This component renders the fixed bottom input bar for sending messages.
 * It includes attachment options (image, file, video, link), a multiline
 * text input, microphone button for voice input, and send button.
 * The input bar has a glassmorphism design and glows on focus.
 * 
 * UI Effect: Primary interaction point for user message input
 */

import { useState, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image, FileText, Video, Link2, Mic, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";


// interface ChatInputProps {
//   onSendMessage: (message: string) => void;
//   disabled?: boolean;
// }
interface ChatInputProps {
  onSendMessage: (data: {
    text: string;
    file?: File;
  }) => void;
  disabled?: boolean;
}


const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  // const [isListening, setisListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const textareaRef = useRef<HTMLTextAreaElement>(null);
  //========================================
    const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const { startListening, stopListening, isListening } = useSpeechRecognition();


  // const handleSend = () => {
  //   if (message.trim() && !disabled) {
  //     onSendMessage(message.trim());
  //     setMessage('');
  //     if (textareaRef.current) {
  //       textareaRef.current.style.height = 'auto';
  //     }
  //   }
  // };
  const handleSend = () => {
  if ((!message.trim() && !selectedFile) || disabled) return;

       onSendMessage({
          text: message.trim(),
          file: selectedFile, 
           });

  setMessage('');
  setSelectedFile(null);

  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
  } 
};


  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const toggleRecording = () => {
  if (isListening) {
    stopListening();
  } else {
    startListening((text) => {
      setMessage(text);
    });
  }
};


  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  };

  // const attachmentOptions = [
  //   { icon: Image, label: 'Image', color: 'text-green-400' },
  //   { icon: FileText, label: 'File', color: 'text-blue-400' },
  //   { icon: Video, label: 'Video', color: 'text-purple-400' },
  //   { icon: Link2, label: 'Link', color: 'text-orange-400' },
  // ];
  const attachmentOptions = [
  {
    icon: Image,
    label: 'Image',
    color: 'text-green-400',
    onClick: () => imageInputRef.current?.click(),
  },
  {
    icon: FileText,
    label: 'File',
    color: 'text-blue-400',
    onClick: () => fileInputRef.current?.click(),
  },
  {
    icon: Video,
    label: 'Video',
    color: 'text-purple-400',
    onClick: () => videoInputRef.current?.click(),
  },
  {
    icon: Link2,
    label: 'Link',
    color: 'text-orange-400',
    onClick: () => console.log('Link clicked'),
  },
];


  return (
    <div className="relative z-20 p-4 pb-6 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-background dark:via-background/95 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Attachment options popup */}
        <AnimatePresence>
          {showAttachments && (
            <motion.div
              className="absolute bottom-full left-4 mb-2 flex gap-2 p-2 bg-white border border-gray-200 dark:glass-card dark:border-none rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {attachmentOptions.map((option) => (
                <Tooltip key={option.label}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`hover:bg-muted/50 ${option.color}`}
                      onClick={() => {
                         option.onClick();
                          setShowAttachments(false);
                           }}

                    >
                      <option.icon className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Upload {option.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main input container */}
        <div className="flex items-end gap-2 bg-white border border-gray-200 dark:glass-card dark:border-none p-2 input-glow transition-all duration-300 shadow-sm dark:shadow-none rounded-xl">
          {/* Attachment button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAttachments(!showAttachments)}
                className={`flex-shrink-0 hover:bg-muted/50 transition-all duration-300 ${
                  showAttachments ? 'text-primary rotate-45' : 'text-muted-foreground'
                }`}
              >
                {showAttachments ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{showAttachments ? 'Close' : 'Add attachment'}</p>
            </TooltipContent>
          </Tooltip>
          
          {selectedFile && (
              <div className="flex items-center gap-2 px-3 py-2 mb-2 text-sm bg-muted/40 rounded-lg">
          <span className="truncate">
          📎 {selectedFile.name}
           </span>
         <button
         onClick={() => setSelectedFile(null)}
           className="text-red-500 hover:text-red-600"
             >
      ✕
    </button>
  </div>
)}


          {/* Text input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask PAWNIN anything..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-gray-900 dark:text-foreground placeholder:text-gray-400 dark:placeholder:text-muted-foreground py-2 px-2 max-h-36 custom-scrollbar"
            style={{ height: 'auto' }}
          />

          {/* Voice input button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => {
                //    toggleRecording
                //   setisListening(!isRecording)
                 
                // }}
                 onClick={toggleRecording}

                className={`flex-shrink-0 transition-all duration-300 ${
                  isListening
                     ? 'text-green-500 bg-green-500/20 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Mic className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{isListening ? 'Stop recording' : 'Voice input'}</p>
            </TooltipContent>
          </Tooltip>

          {/* Send button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleSend}
                disabled={!message.trim() || disabled}
                className="flex-shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                size="icon"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Helper text */}
        <p className="text-xs text-muted-foreground text-center mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
      {/* Hidden file inputs */}
<input
  type="file"
  accept="image/*"
  ref={imageInputRef}
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Image selected:", file);
    }
  }}
/>

<input
  type="file"
  accept="video/*"
  ref={videoInputRef}
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Video selected:", file);
    }
  }}
/>

<input
  type="file"
  ref={fileInputRef}
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
     setSelectedFile(file);

    }
  }}
/>


    </div>
  );
};

export default ChatInput;
