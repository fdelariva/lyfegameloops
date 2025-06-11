
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Sparkles, Target, Heart } from "lucide-react";

interface AristosWelcomeMessagesProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const AristosWelcomeMessages = ({ isOpen, onClose, userName = "Viajante" }: AristosWelcomeMessagesProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Responsabilidade e Propósito",
      content: `Olá, ${userName}! Como seu parceiro de responsabilidade, venho lembrá-lo da importância dos hábitos que você escolheu. Cada ação que você toma hoje é um investimento na pessoa extraordinária que você está se tornando. Seus hábitos não são apenas tarefas - eles são as ferramentas que esculpem sua melhor versão. Lembre-se: pequenas ações consistentes criam transformações extraordinárias.`,
      emoji: "🎯"
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      title: "A Ciência dos Hábitos",
      content: "Você sabia que leva em média 66 dias para formar um novo hábito? Mas aqui está o segredo: os primeiros 21 dias são os mais cruciais. Durante esse período, seu cérebro está literalmente criando novas conexões neurais. Cada vez que você completa um hábito, você fortalece essas conexões. É como construir uma estrada - quanto mais você a usa, mais sólida ela se torna. Você está literalmente reprogramando seu cérebro para o sucesso!",
      emoji: "🧠"
    },
    {
      icon: <Heart className="h-6 w-6 text-green-600" />,
      title: "Sua Força Interior",
      content: "Eu vejo algo especial em você - uma chama interior que brilha mais forte a cada dia. Você já provou para si mesmo que é capaz de mudança ao escolher estar aqui. Cada hábito que você completa é uma declaração ao universo: 'Eu sou alguém que cumpre seus compromissos comigo mesmo.' Confie no seu poder. Você tem tudo o que precisa dentro de si. Hoje é mais um dia para mostrar do que você é capaz!",
      emoji: "💫"
    }
  ];

  const handleNext = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentMessage > 0) {
      setCurrentMessage(currentMessage - 1);
    }
  };

  const currentMsg = messages[currentMessage];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Brain className="h-5 w-5 text-blue-600" />
            Mensagem de Aristos
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Aristos Image */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/e996b149-56f1-4403-8afb-293b881a648b.png" 
              alt="Aristos - Seu guia no Lyfe" 
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Message Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{currentMsg.emoji}</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {currentMsg.icon}
                  <h3 className="font-semibold text-lg">{currentMsg.title}</h3>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed text-justify">
                {currentMsg.content}
              </p>
            </CardContent>
          </Card>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentMessage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentMessage === 0}
              className="opacity-50 disabled:opacity-25"
            >
              Anterior
            </Button>
            
            <span className="text-xs text-gray-500">
              {currentMessage + 1} de {messages.length}
            </span>
            
            <Button
              size="sm"
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentMessage < messages.length - 1 ? (
                <>
                  Próxima
                  <ArrowRight className="ml-1 h-3 w-3" />
                </>
              ) : (
                'Começar'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AristosWelcomeMessages;
