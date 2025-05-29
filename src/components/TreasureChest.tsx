
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Package } from "lucide-react";

interface TreasureChestProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Reward {
  type: "coins" | "skill" | "energy" | "connection" | "item";
  amount?: number;
  itemName?: string;
  icon: string;
}

const TreasureChest = ({ isOpen, onClose }: TreasureChestProps) => {
  const [chestOpened, setChestOpened] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([
    { type: "coins", amount: 75, icon: "💰" },
    { type: "skill", amount: 25, icon: "🧠" },
    { type: "item", itemName: "Coroa Dourada", icon: "👑" },
  ]);

  const handleChestClick = () => {
    if (!chestOpened) {
      setChestOpened(true);
      toast("O baú está se abrindo!", {
        description: "Escolha suas cartas surpresa!",
      });
    }
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.includes(index)) return;
    
    setFlippedCards([...flippedCards, index]);
    
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
      } else if (reward.type === "connection") {
        message = `+${reward.amount} Conexão!`;
      } else if (reward.type === "item") {
        message = `Novo item: ${reward.itemName}!`;
      }
      
      toast("Recompensa especial!", {
        description: message,
      });
    }
    
    // Close dialog after all cards are flipped
    if (flippedCards.length === 2) {
      setTimeout(() => {
        onClose();
        setChestOpened(false);
        setFlippedCards([]);
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
    setChestOpened(false);
    setFlippedCards([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            🏆 Baú do Desafio Diário 🏆
          </DialogTitle>
        </DialogHeader>
        
        {!chestOpened ? (
          <div className="flex flex-col items-center py-8">
            <div 
              className="cursor-pointer transform transition-all duration-300 hover:scale-110"
              onClick={handleChestClick}
            >
              <div className="relative">
                <Package 
                  size={120} 
                  className="text-amber-600 drop-shadow-lg animate-pulse"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Clique no baú para abrir e revelar suas recompensas especiais!
            </p>
          </div>
        ) : (
          <div className="py-6">
            {/* Chest opening animation */}
            <div className="flex justify-center mb-6">
              <div className="relative animate-bounce">
                <Package 
                  size={80} 
                  className="text-amber-600"
                />
                <div className="absolute -top-2 -right-2 animate-spin">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="absolute -bottom-2 -left-2 animate-ping">
                  <span className="text-xl">💫</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg">Escolha suas cartas!</h3>
              <p className="text-sm text-muted-foreground">
                Cada carta contém uma recompensa especial
              </p>
            </div>
            
            {/* Cards */}
            <div className="flex justify-center gap-4">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer transform transition-all duration-500 ${
                    flippedCards.includes(index) ? "rotate-y-180 scale-105" : "hover:scale-105"
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  {flippedCards.includes(index) ? (
                    <Card className="w-20 h-28 flex items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg">
                      <CardContent className="p-2 text-center">
                        <div className="text-2xl mb-1">{rewards[index]?.icon}</div>
                        {rewards[index]?.type !== "item" ? (
                          <>
                            <div className="text-sm font-bold">{`+${rewards[index]?.amount}`}</div>
                            <div className="text-xs">
                              {rewards[index]?.type === "coins" && "moedas"}
                              {rewards[index]?.type === "skill" && "skill"}
                              {rewards[index]?.type === "energy" && "energia"}
                              {rewards[index]?.type === "connection" && "conexão"}
                            </div>
                          </>
                        ) : (
                          <div className="text-xs font-bold">{rewards[index]?.itemName}</div>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="w-20 h-28 flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 shadow-lg animate-pulse">
                      <CardContent className="p-2 flex items-center justify-center">
                        <div className="text-white text-3xl">❓</div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TreasureChest;
