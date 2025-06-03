
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ThumbsUp, ThumbsDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AskTheOracleProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habitName: string) => void;
}

const oracleSuggestions = [
  {
    name: "Meditar por 5 minutos",
    icon: "🧘",
    description: "Prática de mindfulness para clareza mental",
    category: "Mindfulness",
    info: {
      whyDo: "A meditação reduz o cortisol, melhora a concentração e desenvolve a autoconsciência. Apenas 5 minutos diários podem reduzir a ansiedade em 30%.",
      howDo: "Sente-se confortavelmente, feche os olhos e foque na respiração. Quando a mente divagar, gentilmente retorne a atenção para a respiração."
    }
  },
  {
    name: "Fazer uma caminhada de 10 minutos",
    icon: "🚶",
    description: "Movimento suave para ativar o corpo",
    category: "Exercício",
    info: {
      whyDo: "Caminhadas melhoram a circulação, reduzem o stress e aumentam a criatividade em 60%. É o exercício mais natural para o corpo humano.",
      howDo: "Caminhe em ritmo confortável, preferencialmente ao ar livre. Mantenha postura ereta e respire naturalmente."
    }
  },
  {
    name: "Escrever 3 gratidões",
    icon: "📝",
    description: "Anotar coisas pelas quais você é grato",
    category: "Mindfulness",
    info: {
      whyDo: "A gratidão aumenta os níveis de serotonina, melhora o sono e fortalece relacionamentos. Pessoas gratas são 25% mais felizes.",
      howDo: "Anote 3 coisas específicas pelas quais você é grato hoje. Seja específico e sinta genuinamente a gratidão ao escrever."
    }
  },
  {
    name: "Ler 10 páginas de um livro",
    icon: "📚",
    description: "Alimentar a mente com conhecimento",
    category: "Aprendizado",
    info: {
      whyDo: "A leitura melhora o vocabulário, reduz o declínio cognitivo e diminui o stress em 68%. É ginástica para o cérebro.",
      howDo: "Escolha um local silencioso, elimine distrações e leia com atenção plena. Faça pausas para refletir sobre o conteúdo."
    }
  },
  {
    name: "Organizar uma gaveta ou mesa",
    icon: "🗂️",
    description: "Criar ordem no ambiente",
    category: "Organização",
    info: {
      whyDo: "Ambientes organizados reduzem o cortisol, melhoram o foco e aumentam a produtividade. A ordem externa reflete ordem mental.",
      howDo: "Escolha um espaço pequeno, remova tudo, limpe e recoloque apenas o necessário. Dê um lugar específico para cada item."
    }
  }
];

const AskTheOracle = ({ isOpen, onClose, onAddHabit }: AskTheOracleProps) => {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const SWIPE_THRESHOLD = 80;
  const currentSuggestion = oracleSuggestions[currentSuggestionIndex];

  console.log("AskTheOracle render:", { isOpen, currentSuggestionIndex, currentSuggestion });

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setCurrentX(0);
    setIsDragging(true);
    setSwipeDirection(null);
    console.log("Touch start:", touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    const diffX = touch.clientX - startX;
    
    setCurrentX(Math.max(-150, Math.min(150, diffX)));
    
    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      setSwipeDirection(diffX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
    
    console.log("Touch move:", { diffX, currentX, swipeDirection });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    console.log("Touch end:", { currentX, swipeDirection });
    setIsDragging(false);
    
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
      if (currentX > 0) {
        handleAccept();
      } else {
        handleReject();
      }
    }
    
    // Reset position
    setCurrentX(0);
    setSwipeDirection(null);
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setCurrentX(0);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diffX = e.clientX - startX;
    setCurrentX(Math.max(-150, Math.min(150, diffX)));
    
    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      setSwipeDirection(diffX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
      if (currentX > 0) {
        handleAccept();
      } else {
        handleReject();
      }
    }
    
    // Reset position
    setCurrentX(0);
    setSwipeDirection(null);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setCurrentX(0);
      setSwipeDirection(null);
    }
  };

  const handleAccept = () => {
    console.log("Accepting habit:", currentSuggestion.name);
    onAddHabit(currentSuggestion.name);
    nextSuggestion();
  };

  const handleReject = () => {
    console.log("Rejecting habit:", currentSuggestion.name);
    nextSuggestion();
  };

  const nextSuggestion = () => {
    if (currentSuggestionIndex < oracleSuggestions.length - 1) {
      setCurrentSuggestionIndex(currentSuggestionIndex + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    console.log("Closing Oracle");
    setCurrentSuggestionIndex(0);
    setCurrentX(0);
    setSwipeDirection(null);
    setIsDragging(false);
    onClose();
  };

  if (!isOpen || !currentSuggestion) {
    console.log("Not rendering Oracle:", { isOpen, currentSuggestion });
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Users className="h-6 w-6" />
            Oráculo dos Hábitos
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Deslize para a direita para aceitar ou esquerda para rejeitar
          </p>
          <Badge variant="outline" className="mt-2">
            {currentSuggestionIndex + 1} de {oracleSuggestions.length}
          </Badge>
        </div>

        <div className="relative overflow-hidden">
          <Card 
            className={cn(
              "cursor-grab active:cursor-grabbing transition-transform select-none",
              isDragging && "transition-none"
            )}
            style={{
              transform: `translateX(${currentX}px)`,
              touchAction: 'pan-y pinch-zoom'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {swipeDirection === 'right' && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <ThumbsUp className="h-4 w-4" />
                </div>
              </div>
            )}
            
            {swipeDirection === 'left' && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                <div className="bg-red-500 text-white rounded-full p-2">
                  <ThumbsDown className="h-4 w-4" />
                </div>
              </div>
            )}

            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentSuggestion.icon}</span>
                <CardTitle className="text-lg">{currentSuggestion.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-2">
                {currentSuggestion.description}
              </CardDescription>
              <Badge variant="outline" className="text-xs">
                {currentSuggestion.category}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleReject}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Rejeitar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
            onClick={handleAccept}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Aceitar
          </Button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button variant="ghost" onClick={handleClose}>
            <X className="h-4 w-4 mr-2" />
            Chega
          </Button>
          <p className="text-xs text-muted-foreground">
            Toque fora para fechar
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskTheOracle;
