/**
 * EarthBackground Component
 * 
 * This component renders an animated rotating Earth in the background
 * of the chat area. It creates an immersive space-themed atmosphere
 * with floating stars and a glowing planet effect.
 * 
 * UI Effect: Provides visual depth and futuristic ambiance to the chat interface
 */

import { motion } from 'framer-motion';

const EarthBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Animated stars layer */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground/30 twinkle"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
            }}
          />
        ))}
      </div>

      {/* Earth container - positioned bottom right */}
      <motion.div
        className="absolute -bottom-32 -right-32 md:-bottom-48 md:-right-48 lg:-bottom-64 lg:-right-64"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Earth glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(217 91% 60% / 0.2) 0%, transparent 60%)',
            transform: 'scale(1.3)',
          }}
        />

        {/* Earth sphere */}
        <motion.div
          className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{
            background: `
              radial-gradient(circle at 30% 30%, hsl(217 91% 60% / 0.8) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, hsl(187 100% 50% / 0.6) 0%, transparent 40%),
              radial-gradient(circle at 40% 70%, hsl(142 76% 36% / 0.5) 0%, transparent 35%),
              radial-gradient(circle at 60% 30%, hsl(217 91% 60% / 0.4) 0%, transparent 45%),
              linear-gradient(135deg, hsl(217 91% 25%) 0%, hsl(187 100% 20%) 50%, hsl(142 76% 20%) 100%)
            `,
          }}
        >
          {/* Continental shapes simulation */}
          <div className="absolute inset-0">
            {/* Clouds layer */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-foreground/10 rounded-full blur-sm"
                  style={{
                    width: Math.random() * 60 + 30 + 'px',
                    height: Math.random() * 20 + 10 + 'px',
                    left: Math.random() * 80 + 10 + '%',
                    top: Math.random() * 80 + 10 + '%',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Atmosphere glow */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, transparent 40%, hsl(187 100% 50% / 0.1) 60%, hsl(187 100% 50% / 0.2) 100%)',
            }}
          />
        </motion.div>

        {/* Atmospheric halo */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 45%, hsl(187 100% 50% / 0.05) 50%, transparent 55%)',
            transform: 'scale(1.15)',
          }}
        />
      </motion.div>

      {/* Subtle grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 100% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 100% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(222 47% 6% / 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default EarthBackground;
