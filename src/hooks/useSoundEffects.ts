
import { useCallback } from "react";

export const useSoundEffects = () => {
  const playSound = useCallback((type: 'habit' | 'levelup') => {
    try {
      // Create audio context for better browser compatibility
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (type === 'habit') {
        // Simple success sound - ascending notes
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1); // C#5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } else if (type === 'levelup') {
        // More elaborate level up sound - victory fanfare
        const playNote = (frequency: number, startTime: number, duration: number) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + startTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);
          
          oscillator.start(audioContext.currentTime + startTime);
          oscillator.stop(audioContext.currentTime + startTime + duration);
        };
        
        // Victory fanfare notes
        playNote(523.25, 0, 0.2);    // C5
        playNote(659.25, 0.2, 0.2);  // E5
        playNote(783.99, 0.4, 0.2);  // G5
        playNote(1046.5, 0.6, 0.4);  // C6
      }
    } catch (error) {
      console.log('Sound not supported in this browser');
    }
  }, []);

  return { playSound };
};
