
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Brain, Sparkles } from "lucide-react";

interface Message {
  role: "oracle" | "user";
  content: string;
  timestamp: Date;
}

interface OracleCompanionProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: number;
  completedHabits: number;
  totalHabits: number;
}

const OracleCompanion = ({ isOpen, onClose, userProgress, completedHabits, totalHabits }: OracleCompanionProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with greeting based on user progress
      let greeting = "";
      if (userProgress === 0) {
        greeting = "Olá! Vejo que você ainda não começou seus hábitos hoje. Que tal começarmos com algo simples? Qual hábito te parece mais fácil de começar agora?";
      } else if (userProgress < 50) {
        greeting = `Ótimo começo! Você já completou ${completedHabits} de ${totalHabits} hábitos. Como está se sentindo? Precisa de motivação para continuar?`;
      } else if (userProgress < 100) {
        greeting = `Impressionante! Você está quase lá - ${userProgress}% concluído! Sinto uma energia muito positiva vindo de você. Como posso ajudar a terminar o dia em grande estilo?`;
      } else {
        greeting = `🎉 Parabéns! Você completou todos os seus hábitos hoje! Isso é extraordinário. Como você se sente com essa conquista? Quer refletir sobre o que aprendeu hoje?`;
      }

      setMessages([{
        role: "oracle",
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, userProgress, completedHabits, totalHabits, messages.length]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsThinking(true);

    // Simulate Oracle thinking and response
    setTimeout(() => {
      const oracleResponse = generateOracleResponse(userInput, userProgress, completedHabits, totalHabits);
      
      setMessages(prev => [...prev, {
        role: "oracle",
        content: oracleResponse,
        timestamp: new Date()
      }]);
      setIsThinking(false);
    }, 1500);
  };

  const generateOracleResponse = (input: string, progress: number, completed: number, total: number): string => {
    const lowerInput = input.toLowerCase();

    // Motivational responses
    if (lowerInput.includes("cansado") || lowerInput.includes("difícil") || lowerInput.includes("desistir")) {
      return "Entendo que às vezes o caminho parece difícil. Mas olhe o que você já conquistou! Cada pequeno passo conta. Que tal tentarmos quebrar o próximo hábito em uma ação ainda menor? Às vezes, fazer apenas 1% já é o suficiente para manter o momentum.";
    }

    if (lowerInput.includes("motivação") || lowerInput.includes("inspiração")) {
      return "A verdadeira motivação vem de dentro, mas posso te lembrar do seu 'porquê'. Você começou essa jornada por uma razão especial. Feche os olhos por um momento e se conecte com essa pessoa que você quer se tornar. Ela já está dentro de você, apenas esperando para emergir.";
    }

    if (lowerInput.includes("bem") || lowerInput.includes("ótimo") || lowerInput.includes("feliz")) {
      return "Que maravilha sentir essa energia positiva! Essa é a frequência da transformação. Quando nos sentimos bem, naturalmente atraímos mais experiências positivas. Continue nutrindo esse estado - ele é seu superpoder.";
    }

    if (lowerInput.includes("hábito") || lowerInput.includes("próximo")) {
      if (progress < 100) {
        return `Perfeito! Vejo que você ainda tem ${total - completed} hábito(s) para hoje. Escolha aquele que mais ressoa com você neste momento. Confie na sua intuição - ela sabe o que você precisa agora.`;
      } else {
        return "Você já completou todos os hábitos de hoje! Que tal usar este momento para refletir sobre suas conquistas ou talvez adicionar um pequeno ritual de gratidão?";
      }
    }

    // Default responses with wisdom
    const wisdomResponses = [
      "Interessante perspectiva. A jornada de autodesenvolvimento é única para cada pessoa. O que mais importa é que você está aqui, presente e comprometido com seu crescimento.",
      "Vejo sabedoria em suas palavras. Lembre-se: o progresso não é sempre linear, mas cada momento de consciência é um passo em direção à sua melhor versão.",
      "Você fala com o coração. Essa autenticidade é seu maior trunfo. Continue sendo fiel a si mesmo nesta jornada.",
      "Percebo uma evolução em você, mesmo nas pequenas coisas. Essa consciência que você demonstra já é um grande progresso."
    ];

    return wisdomResponses[Math.floor(Math.random() * wisdomResponses.length)];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Oracle Pessoal
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[60vh]">
          <ScrollArea className="flex-1 p-4 border rounded-lg">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "oracle" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "oracle" 
                      ? "bg-blue-50 text-blue-900 border border-blue-200" 
                      : "bg-primary text-primary-foreground"
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-blue-50 text-blue-900 border border-blue-200 max-w-[80%] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
                      </div>
                      <span className="text-xs">Oracle refletindo...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2 mt-4">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Compartilhe seus pensamentos..."
              disabled={isThinking}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isThinking || !userInput.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OracleCompanion;
