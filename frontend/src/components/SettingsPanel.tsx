/**
 * SettingsPanel Component
 * 
 * This component renders the settings dropdown/modal accessible from the top-right.
 * It includes options for theme switching, font size control, animation toggle,
 * clearing chat history, and an about section for PAWNIN.
 * 
 * UI Effect: Provides user customization options for the app experience
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Moon, Sun, Type, Sparkles, Trash2, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface SettingsPanelProps {
  onClearChats: () => void;
  animationsEnabled: boolean;
  onToggleAnimations: (enabled: boolean) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const SettingsPanel = ({
  onClearChats,
  animationsEnabled,
  onToggleAnimations,
  fontSize,
  onFontSizeChange,
}: SettingsPanelProps) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pawnin_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pawnin_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pawnin_theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Settings className="w-5 h-5" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-72 p-4 bg-white border border-gray-200 dark:glass-card dark:border-border/50 shadow-xl"
        >
          <h3 className="font-display font-semibold text-lg mb-4 text-gray-900 dark:text-foreground">Settings</h3>

          {/* Theme toggle */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="w-4 h-4 text-primary" />
              ) : (
                <Sun className="w-4 h-4 text-primary" />
              )}
              <span className="text-sm text-gray-700 dark:text-foreground">Dark Mode</span>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-border/50" />

          {/* Font size control */}
          <div className="py-3">
            <div className="flex items-center gap-3 mb-3">
              <Type className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-700 dark:text-foreground">Font Size</span>
              <span className="ml-auto text-xs text-muted-foreground">{fontSize}px</span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={(value) => onFontSizeChange(value[0])}
              min={12}
              max={20}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-border/50" />

          {/* Animations toggle */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-700 dark:text-foreground">Animations</span>
            </div>
            <Switch
              checked={animationsEnabled}
              onCheckedChange={onToggleAnimations}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-border/50" />

          {/* Clear chats */}
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center gap-3 py-3 text-sm text-destructive hover:bg-destructive/10 rounded-lg px-2 -mx-2 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Chats
          </button>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-border/50" />

          {/* About */}
          <button
            onClick={() => setShowAbout(true)}
            className="w-full flex items-center gap-3 py-3 text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-foreground hover:bg-gray-100 dark:hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors duration-200"
          >
            <Info className="w-4 h-4" />
            About PAWNIN
          </button>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Chat Confirmation Dialog */}
      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogContent className="bg-white border border-gray-200 dark:glass-card dark:border-border/50 max-w-sm shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-foreground">Clear all chats?</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This action cannot be undone. This will permanently delete your chat history.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setShowClearConfirm(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onClearChats();
                setShowClearConfirm(false);
              }}
            >
              Clear All
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* About dialog */}
      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="bg-white border border-gray-200 dark:glass-card dark:border-border/50 max-w-md shadow-xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {/* Mini logo */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center pulse-glow">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <circle cx="50" cy="30" r="18" fill="currentColor" className="text-primary" />
                  <ellipse cx="50" cy="60" rx="24" ry="28" fill="currentColor" className="text-primary/80" />
                  <rect x="32" y="26" width="36" height="8" fill="currentColor" className="text-white dark:text-background" rx="2" />
                </svg>
              </div>
              <div>
                <DialogTitle className="font-display text-xl">
                  <span className="text-primary">PAWN</span>
                  <span className="text-gray-900 dark:text-foreground">IN</span>
                </DialogTitle>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="text-muted-foreground space-y-3">
            <p>
              PAWNIN is a futuristic AI-powered assistant designed to help you with
              a wide range of tasks. From answering questions to creative writing,
              code assistance, and more.
            </p>
            <p>
              Built with modern web technologies and a focus on user experience,
              PAWNIN delivers a seamless and immersive chat interface.
            </p>
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs">
                © 2024 PAWNIN. All rights reserved.
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsPanel;
