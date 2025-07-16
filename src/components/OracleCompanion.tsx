
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Brain, Sparkles, Loader2 } from "lucide-react";
import { aristosAI } from "@/services/aristosAI";

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
      // Check if user just completed first lesson
      const hasCompletedFirstLesson = localStorage.getItem('firstLessonCompleted') === 'true';
      const hasSeenQuestMessage = localStorage.getItem('hasSeenQuestMessage') === 'true';
      
      let greeting = "";
      
      if (hasCompletedFirstLesson && !hasSeenQuestMessage) {
        greeting = `🎉 Parabéns! Com o pergaminho mágico você está pronto para sua primeira quest!\n\n⚔️ Entre na Caverna do Desafio e enfrente seu primeiro inimigo: SLOTH, a sombra da procrastinação.\n\n✨ Agora é a hora da ação! Juntando conhecimento e execução, vamos te ajudar a progredir na direção da pessoa que você quer ser.\n\n🏆 Criei um hábito especial em sua rotina: "Lutar contra a Procrastinação". Toda vez que você fizer uma lição e completar uma batalha na plataforma, esse hábito será marcado automaticamente!\n\nClique no botão "Caverna do Desafio" no dashboard para começar sua primeira quest!`;
        localStorage.setItem('hasSeenQuestMessage', 'true');
      } else if (userProgress === 0) {
        greeting = "Olá, Viajante! 🌟 Vejo que você ainda não começou seus hábitos hoje. Que tal começarmos com algo simples? \n\nBaseado nos princípios dos Tiny Habits de BJ Fogg, qual hábito te parece mais fácil de começar agora? Lembre-se: pequenas ações consistentes criam transformações extraordinárias! ✨";
      } else if (userProgress < 50) {
        greeting = `Ótimo começo! 🎯 Você já completou ${completedHabits} de ${totalHabits} hábitos. Vejo que você está no caminho da transformação!\n\nComo está se sentindo com esse progresso? Sua jornada de crescimento já está reprogramando seu cérebro para o sucesso. Precisa de motivação para continuar ou tem alguma reflexão sobre o processo?`;
      } else if (userProgress < 100) {
        greeting = `Impressionante! 🚀 Você está quase lá - ${userProgress}% concluído! Sinto uma energia muito positiva vindo de você.\n\nIsso é a frequência da transformação que Anna Lembke descreve. Seu equilíbrio dopaminérgico está se restaurando naturalmente. Como posso ajudar a terminar o dia em grande estilo?`;
      } else {
        greeting = `🎉 Parabéns! Você completou todos os seus hábitos hoje! Isso é extraordinário e merece ser celebrado!\n\nVocê está literalmente reprogramando seu cérebro para o sucesso. Como Martin Seligman nos ensina, reconhecer nossas vitórias é fundamental. Como você se sente com essa conquista? Quer refletir sobre o que aprendeu hoje?`;
      }

      setMessages([{
        role: "oracle",
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, userProgress, completedHabits, totalHabits, messages.length]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: userInput,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput("");
    setIsThinking(true);

    try {
      const conversationHistory = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await aristosAI.generateResponse(
        userInput,
        conversationHistory,
        {
          progress: userProgress,
          completedHabits,
          totalHabits,
          userName: "Viajante"
        }
      );

      if (response.success) {
        setMessages(prev => [...prev, {
          role: "oracle",
          content: response.response,
          timestamp: new Date()
        }]);
      } else {
        throw new Error(response.error || "Erro desconhecido");
      }
    } catch (error) {
      console.error('Erro na conversa com Aristos:', error);
      setMessages(prev => [...prev, {
        role: "oracle",
        content: "Desculpe, tive um problema técnico. Mas estou aqui para continuar nossa conversa! Pode repetir sua pergunta?",
        timestamp: new Date()
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Aristos - Seu Oracle Pessoal
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </DialogTitle>
          <div className="text-sm text-muted-foreground bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200 mt-2">
            <p className="mb-2">🏛️ <strong>Caverna da Sabedoria:</strong> Complete lições e ganhe pergaminhos mágicos acertando 80%+ das questões. Prepare-se para seu primeiro quest!</p>
            <p className="text-xs">💡 <strong>Seu Oracle pode:</strong> Ajudar você a estabelecer objetivos, criar um plano de comportamentos e hábitos para alcançá-los, revisar este plano e te guiar em sua execução.</p>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[65vh]">
          <ScrollArea className="flex-1 p-4 border rounded-lg bg-gradient-to-b from-blue-50/30 to-purple-50/30">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "oracle" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg ${
                    message.role === "oracle" 
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-900 border border-blue-200 shadow-sm" 
                      : "bg-primary text-primary-foreground shadow-sm"
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-900 border border-blue-200 max-w-[85%] p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
                      </div>
                      <span className="text-xs">Aristos está refletindo...</span>
                      <Brain className="h-3 w-3 animate-pulse" />
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
              onKeyPress={(e) => e.key === "Enter" && !isThinking && handleSendMessage()}
              placeholder="Compartilhe seus pensamentos com Aristos..."
              disabled={isThinking}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isThinking || !userInput.trim()}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isThinking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground mt-2">
            💡 Aristos combina ciência comportamental com sabedoria prática para te guiar na jornada
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OracleCompanion;
