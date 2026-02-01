/**
 * LoadingScreen Component
 * 
 * This is the initial fullscreen loading animation displayed when the app starts.
 * It shows an animated ninja penguin logo with the PAWNIN brand name.
 * The component manages its own visibility and triggers a fade-out transition
 * before unmounting, controlled by the parent component via the onComplete callback.
 * 
 * UI Effect: Creates an immersive first impression with smooth animations
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-bg"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background stars/particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Ninja Penguin Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(187 100% 50% / 0.3) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Penguin container */}
          {/* Penguin container */}
<div className="relative w-32 h-32 md:w-40 md:h-40">
  <img
    src="NINja.PNG"
    alt="PAWNIN Logo"
    className="w-full h-full object-contain"
  />
</div>

        </motion.div>

        {/* Brand name */}
        <motion.h1
          className="mt-8 text-4xl md:text-5xl font-display font-bold tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-primary glow-text">PAWN</span>
          <span className="text-foreground">IN</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-2 text-muted-foreground text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Your AI-Powered Assistant
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="mt-8 w-48 md:w-64 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="mt-4 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Initializing neural networks...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
