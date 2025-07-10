import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Target, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface OracleMessage {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
  emoji: string;
  type: 'motivation' | 'accountability' | 'science';
}

interface OracleMessageCarouselProps {
  className?: string;
}

const OracleMessageCarousel = ({ className }: OracleMessageCarouselProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages: OracleMessage[] = [
    {
      id: "motivation",
      icon: <Heart className="h-4 w-4 text-green-600" />,
      title: "Motivação e Apoio",
      content: "Acredito em você! Cada pequeno passo que você dá hoje é uma vitória. Você já provou que tem força interior ao escolher crescer. Continue brilhando! ✨",
      emoji: "💪",
      type: "motivation"
    },
    {
      id: "accountability", 
      icon: <Target className="h-4 w-4 text-blue-600" />,
      title: "Parceiro de Responsabilidade",
      content: "Como seu parceiro de responsabilidade, lembro você dos seus compromissos. Seus hábitos são investimentos na sua melhor versão. Mantenha-se firme! 🎯",
      emoji: "🤝",
      type: "accountability"
    },
    {
      id: "science",
      icon: <BookOpen className="h-4 w-4 text-purple-600" />,
      title: "Ciência dos Hábitos",
      content: "Sabia que leva 66 dias para formar um hábito? Cada repetição fortalece conexões neurais. Você está literalmente reprogramando seu cérebro para o sucesso! 🧠",
      emoji: "🔬",
      type: "science"
    }
  ];

  // Auto-advance messages every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const currentMsg = messages[currentMessage];

  const handleIndicatorClick = (index: number) => {
    setCurrentMessage(index);
  };

  return (
    <Card className={cn("bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-sm">Oracle</h3>
        </div>

        {/* Message Content */}
        <div className="bg-white/80 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{currentMsg.emoji}</span>
            <div className="flex items-center gap-1">
              {currentMsg.icon}
              <span className="font-medium text-xs">{currentMsg.title}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-700 leading-relaxed">
            {currentMsg.content}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {messages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentMessage ? 'bg-blue-600' : 'bg-gray-300'
              )}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OracleMessageCarousel;