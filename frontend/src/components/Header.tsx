/**
 * Header Component
 * 
 * This component renders the top navigation bar with the menu toggle button,
 * app title, and settings button. It provides access to the sidebar and
 * settings panel from any screen size.
 * 
 * UI Effect: Persistent navigation element at the top of the viewport
 */

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsPanel from './SettingsPanel';

interface HeaderProps {
  onToggleSidebar: () => void;
  onClearChats: () => void;
  animationsEnabled: boolean;
  onToggleAnimations: (enabled: boolean) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const Header = ({
  onToggleSidebar,
  onClearChats,
  animationsEnabled,
  onToggleAnimations,
  fontSize,
  onFontSizeChange,
}: HeaderProps) => {
  return (
    <motion.header
      className="relative z-30 flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-border/30 bg-white/80 dark:bg-background/80 backdrop-blur-xl transition-colors duration-300"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side - Menu toggle and title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Logo and title for mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            {/* <svg viewBox="0 0 100 100" className="w-4 h-4">
              <circle cx="50" cy="30" r="18" fill="currentColor" className="text-primary" />
              <ellipse cx="50" cy="60" rx="24" ry="28" fill="currentColor" className="text-primary/80" />
              <rect x="32" y="26" width="36" height="8" fill="currentColor" className="text-background" rx="2" />
            </svg> */}
            <img
                src="/NINja.PNG"
                alt="PAWNIN Logo"
                  className="w-7 h-7 object-contain"
                 />

          </div>
          <h1 className="font-display font-bold text-sm">
            <span className="text-primary">PAWN</span>
            <span className="text-gray-900 dark:text-foreground">IN</span>
          </h1>
        </div>
      </div>

      {/* Center - Title for desktop */}
      <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <img
                src="/NINja.PNG"
                alt="PAWNIN Logo"
                  className="w-7 h-7 object-contain"
                 />
        </div>
        <h1 className="font-display font-bold">
          <span className="text-primary glow-text">PAWN</span>
          <span className="text-gray-900 dark:text-foreground">IN</span>
        </h1>
      </div>

      {/* Right side - Settings */}
      <div>
        <SettingsPanel
          onClearChats={onClearChats}
          animationsEnabled={animationsEnabled}
          onToggleAnimations={onToggleAnimations}
          fontSize={fontSize}
          onFontSizeChange={onFontSizeChange}
        />
      </div>
    </motion.header>
  );
};

export default Header;
