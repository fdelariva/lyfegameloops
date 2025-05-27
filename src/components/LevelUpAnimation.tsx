
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star } from "lucide-react";

interface LevelUpAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
}

const LevelUpAnimation = ({ isOpen, onClose, newLevel }: LevelUpAnimationProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Remove confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md relative overflow-hidden fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={`absolute animate-bounce text-2xl`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                {['🎉', '✨', '🎊', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center text-center py-8 relative z-10">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-3 -right-3 animate-bounce">
              <Star className="w-10 h-10 text-yellow-400 fill-current" />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
            LEVEL UP!
          </h2>
          
          <p className="text-xl mb-6">
            Parabéns! Você alcançou o <Badge className="bg-primary text-xl px-4 py-2 ml-2">Nível {newLevel}</Badge>
          </p>
          
          <div className="mb-8 text-center">
            <p className="text-base text-muted-foreground mb-4">
              Você desbloqueou novos recursos!
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="outline" className="bg-green-50 text-sm px-3 py-2">+5 Energia Base</Badge>
              <Badge variant="outline" className="bg-blue-50 text-sm px-3 py-2">+5 Conexão Base</Badge>
              <Badge variant="outline" className="bg-purple-50 text-sm px-3 py-2">+5 Habilidade Base</Badge>
            </div>
          </div>

          <Button onClick={onClose} size="lg" className="animate-pulse text-lg px-8 py-3">
            Continuar Jornada! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelUpAnimation;
