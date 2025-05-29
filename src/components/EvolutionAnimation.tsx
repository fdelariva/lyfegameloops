
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAvatar from "./Avatar";

interface EvolutionAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  archetype: "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido";
  fromLevel: number;
  toLevel: number;
}

const EvolutionAnimation = ({ 
  isOpen, 
  onClose, 
  archetype, 
  fromLevel, 
  toLevel 
}: EvolutionAnimationProps) => {
  const [showLight, setShowLight] = useState(true);
  const [showNewAvatar, setShowNewAvatar] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowLight(true);
      setShowNewAvatar(false);
      
      // Mostra a luz brilhante por 3 segundos
      const lightTimer = setTimeout(() => {
        setShowLight(false);
        setShowNewAvatar(true);
      }, 3000);

      return () => clearTimeout(lightTimer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowLight(true);
    setShowNewAvatar(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <div className="flex flex-col items-center py-8">
          {showLight && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-8 text-center">
                🌟 Evolução em Progresso! 🌟
              </h2>
              
              {/* Animação de luz brilhante */}
              <div className="relative w-40 h-40 mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 rounded-full animate-pulse shadow-2xl opacity-90"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 rounded-full animate-ping"></div>
                <div className="absolute inset-4 bg-white rounded-full animate-bounce shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl animate-spin">✨</div>
                </div>
                
                {/* Partículas de luz */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`
                    }}
                  />
                ))}
              </div>
              
              <p className="text-center text-muted-foreground">
                Seu {archetype} está evoluindo para o nível {toLevel}...
              </p>
            </div>
          )}

          {showNewAvatar && (
            <div className="flex flex-col items-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                🎉 EVOLUÇÃO COMPLETA! 🎉
              </h2>
              
              <div className="mb-6 transform animate-scale-in">
                <UserAvatar 
                  level={toLevel} 
                  archetype={archetype}
                  energy={50}
                  connection={50}
                  skill={50}
                />
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">
                  {archetype} Nível {toLevel}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Seu avatar evoluiu e ganhou novas habilidades!
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <span className="text-green-700 font-medium">✨ Novas habilidades desbloqueadas</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <span className="text-blue-700 font-medium">🎯 Bônus de atributos aumentado</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <span className="text-purple-700 font-medium">🛡️ Resistência aprimorada</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleClose} size="lg" className="animate-pulse">
                Continuar Jornada! 🚀
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EvolutionAnimation;
