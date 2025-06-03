
import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, X, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Habit {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  info: {
    whyDo: string;
    howDo: string;
  };
}

interface AskTheOracleProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habitName: string) => void;
}

const oracleSuggestions: Omit<Habit, 'id'>[] = [
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
    name: "Ler 10 páginas de um livro",
    icon: "📚",
    description: "Expandir conhecimento através da leitura",
    category: "Educação",
    info: {
      whyDo: "A leitura melhora vocabulário, concentração e empatia. Estimula neuroplasticidade e reduz o declínio cognitivo em 32%.",
      howDo: "Escolha um horário fixo, elimine distrações, tenha um marcador e faça pequenas anotações sobre pontos interessantes."
    }
  },
  {
    name: "Fazer uma caminhada de 15 minutos",
    icon: "🚶",
    description: "Exercício leve para energia e bem-estar",
    category: "Movimento",
    info: {
      whyDo: "Caminhadas liberam endorfinas, melhoram circulação e reduzem risco de doenças cardíacas. 15 minutos aumentam criatividade em 60%.",
      howDo: "Mantenha ritmo confortável, balance os braços naturalmente, observe o ambiente ao redor e respire profundamente."
    }
  },
  {
    name: "Escrever 3 coisas pelas quais sou grato",
    icon: "📝",
    description: "Prática de gratidão para bem-estar mental",
    category: "Bem-estar",
    info: {
      whyDo: "Gratidão aumenta felicidade em 25%, melhora relacionamentos e reduz depressão. Reconecta com aspectos positivos da vida.",
      howDo: "Escreva 3 itens específicos diariamente, seja detalhado sobre o porquê, inclua pessoas e experiências pequenas mas significativas."
    }
  },
  {
    name: "Organizar um espaço da casa",
    icon: "🏠",
    description: "Manter ambiente organizado e harmonioso",
    category: "Organização",
    info: {
      whyDo: "Ambientes organizados reduzem cortisol em 20%, melhoram foco e produtividade. Ordem externa reflete ordem mental.",
      howDo: "Escolha um espaço pequeno, remova tudo, limpe, organize por categoria e devolva apenas o necessário."
    }
  }
];

const AskTheOracle = ({ isOpen, onClose, onAddHabit }: AskTheOracleProps) => {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 100;
  const currentSuggestion = oracleSuggestions[currentSuggestionIndex];

  console.log("AskTheOracle render:", { isOpen, currentSuggestionIndex, currentSuggestion });

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setCurrentX(0);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    setCurrentX(Math.max(-200, Math.min(200, diff)));
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
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
        
        <div className="text-center text-sm text-muted-foreground mb-4">
          Deslize para a direita para aceitar ou para a esquerda para rejeitar
        </div>

        <div className="relative overflow-hidden">
          <Card 
            ref={cardRef}
            className={cn(
              "cursor-grab transition-all select-none relative",
              isDragging && "cursor-grabbing transition-none",
              swipeDirection === 'right' && "border-green-500 bg-green-50",
              swipeDirection === 'left' && "border-red-500 bg-red-50"
            )}
            style={{
              transform: `translateX(${currentX}px)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {swipeDirection === 'right' && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
            )}
            
            {swipeDirection === 'left' && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                <div className="bg-red-500 text-white rounded-full p-2">
                  <X className="h-5 w-5" />
                </div>
              </div>
            )}

            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{currentSuggestion.icon}</div>
              <CardTitle className="text-lg">{currentSuggestion.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                {currentSuggestion.description}
              </p>
              <Badge variant="outline" className="mb-4">
                {currentSuggestion.category}
              </Badge>
              
              <div className="text-xs text-muted-foreground">
                {currentSuggestionIndex + 1} de {oracleSuggestions.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Rejeitar
          </Button>
          
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex items-center gap-1"
          >
            <ArrowRight className="h-4 w-4" />
            Aceitar
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="w-full mt-2"
        >
          Chega por Hoje
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AskTheOracle;
