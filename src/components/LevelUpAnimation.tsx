
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
      <DialogContent className="sm:max-w-md relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
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

        <div className="flex flex-col items-center text-center py-6 relative z-10">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Star className="w-8 h-8 text-yellow-400 fill-current" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            LEVEL UP!
          </h2>
          
          <p className="text-lg mb-4">
            Parabéns! Você alcançou o <Badge className="bg-primary text-lg px-3 py-1">Nível {newLevel}</Badge>
          </p>
          
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Você desbloqueou novos recursos!
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="bg-green-50">+5 Energia Base</Badge>
              <Badge variant="outline" className="bg-blue-50">+5 Conexão Base</Badge>
              <Badge variant="outline" className="bg-purple-50">+5 Habilidade Base</Badge>
            </div>
          </div>

          <Button onClick={onClose} size="lg" className="animate-pulse">
            Continuar Jornada! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelUpAnimation;
