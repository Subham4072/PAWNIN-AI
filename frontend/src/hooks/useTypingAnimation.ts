import { useState, useEffect } from 'react';

export const useTypingAnimation = (text: string, speed: number = 200) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(!!text);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    let currentIndex = 0;
    let animationTimeout: NodeJS.Timeout;

    const animate = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        animationTimeout = setTimeout(animate, speed);
      } else {
        setIsAnimating(false);
      }
    };

    animate();

    return () => {
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, [text, speed]);

  return { displayedText, isAnimating };
};
