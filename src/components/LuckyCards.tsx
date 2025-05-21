
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface LuckyCardsProps {
  isOpen: boolean;
  onClose: () => void;
  guaranteedReward?: boolean;
}

const LuckyCards = ({ isOpen, onClose, guaranteedReward = false }: LuckyCardsProps) => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [rewards, setRewards] = useState<{ type: "coins" | "skill" | "energy" | "connection"; amount: number }[]>([
    { type: "coins", amount: guaranteedReward ? 50 : 30 },
    { type: "skill", amount: guaranteedReward ? 15 : 10 },
    { type: "energy", amount: guaranteedReward ? 20 : 5 },
  ]);

  const handleCardClick = (index: number) => {
    if (flipped.includes(index)) return;
    
    setFlipped([...flipped, index]);
    
    // Show reward toast
    const reward = rewards[index];
    if (reward) {
      let message = "";
      if (reward.type === "coins") {
        message = `+${reward.amount} moedas!`;
      } else if (reward.type === "skill") {
        message = `+${reward.amount} Habilidade!`;
      } else if (reward.type === "energy") {
        message = `+${reward.amount} Energia!`;
      } else {
        message = `+${reward.amount} Conexão!`;
      }
      
      toast("Recompensa!", {
        description: message,
      });
    }
    
    // Close dialog after all cards are flipped or after delay
    if (flipped.length === 2) {
      setTimeout(() => {
        onClose();
        setFlipped([]);
      }, 1500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {guaranteedReward ? "Cartas da Sorte Especiais!" : "Cartas da Sorte"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center gap-4 py-6">
          {[0, 1, 2].map((index) => (
            <div 
              key={index} 
              className={`cursor-pointer transform transition-all duration-300 ${
                flipped.includes(index) ? "rotate-y-180" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {flipped.includes(index) ? (
                <Card className="w-24 h-36 flex items-center justify-center bg-primary text-white">
                  <CardContent className="p-3 text-center">
                    {rewards[index]?.type === "coins" && (
                      <>
                        <div className="text-2xl font-bold">💰</div>
                        <div className="text-lg font-semibold">{`+${rewards[index].amount}`}</div>
                        <div className="text-xs">moedas</div>
                      </>
                    )}
                    
                    {rewards[index]?.type === "skill" && (
                      <>
                        <div className="text-2xl font-bold">🧠</div>
                        <div className="text-lg font-semibold">{`+${rewards[index].amount}`}</div>
                        <div className="text-xs">habilidade</div>
                      </>
                    )}
                    
                    {rewards[index]?.type === "energy" && (
                      <>
                        <div className="text-2xl font-bold">⚡</div>
                        <div className="text-lg font-semibold">{`+${rewards[index].amount}`}</div>
                        <div className="text-xs">energia</div>
                      </>
                    )}
                    
                    {rewards[index]?.type === "connection" && (
                      <>
                        <div className="text-2xl font-bold">🤝</div>
                        <div className="text-lg font-semibold">{`+${rewards[index].amount}`}</div>
                        <div className="text-xs">conexão</div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="w-24 h-36 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                  <CardContent className="p-3 flex items-center justify-center">
                    <div className="text-white text-4xl">❓</div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          {guaranteedReward 
            ? "Escolha uma carta para receber sua recompensa especial do Dia 0!" 
            : "Escolha uma carta para testar sua sorte!"}
        </div>
        
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LuckyCards;
