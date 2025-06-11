
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Brain, CheckCircle, XCircle } from "lucide-react";

interface TreasureChestProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  habitRelated: string;
}

const TreasureChest = ({ isOpen, onClose }: TreasureChestProps) => {
  const [chestOpened, setChestOpened] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Quiz questions related to habit benefits
  const quizQuestions: QuizQuestion[] = [
    {
      question: "Qual é o principal benefício científico de beber água regularmente?",
      options: [
        "Melhora apenas o sabor da comida",
        "Aumenta a performance física e mental em até 15%",
        "Só ajuda na digestão",
        "Apenas hidrata a pele",
        "Não tem benefícios comprovados"
      ],
      correctAnswer: 1,
      explanation: "Estudos mostram que a hidratação adequada pode melhorar a performance física em até 15% e a performance mental significativamente. O cérebro é 75% água, e mesmo uma desidratação leve de 2% pode causar fadiga, dificuldade de concentração e dores de cabeça.",
      habitRelated: "Beber água"
    },
    {
      question: "Por que a respiração profunda é eficaz para reduzir o stress?",
      options: [
        "Apenas relaxa os músculos",
        "Ativa o sistema nervoso parassimpático, reduzindo cortisol em até 25%",
        "Só funciona se feita por horas",
        "É apenas um efeito psicológico",
        "Não tem base científica"
      ],
      correctAnswer: 1,
      explanation: "A respiração profunda ativa diretamente o sistema nervoso parassimpático, conhecido como 'modo de descanso e digestão'. Isso reduz a produção de cortisol (hormônio do stress) em até 25%, diminui a pressão arterial e a frequência cardíaca, promovendo um estado de calma real e mensurável.",
      habitRelated: "Respiração profunda"
    },
    {
      question: "Qual é o impacto de ficar sentado por longos períodos?",
      options: [
        "Não há problemas comprovados",
        "Apenas causa dor nas costas",
        "Reduz o metabolismo em 90% e aumenta risco de diabetes",
        "Só afeta a postura",
        "É benéfico para a concentração"
      ],
      correctAnswer: 2,
      explanation: "Ficar sentado por mais de 30 minutos reduz drasticamente o metabolismo em até 90%, aumenta o risco de diabetes tipo 2, doenças cardiovasculares e até mesmo alguns tipos de câncer. Levantar e se mover a cada hora pode reverter esses efeitos negativos.",
      habitRelated: "Alongamento e movimento"
    }
  ];

  const [currentQuestion] = useState(() => 
    quizQuestions[Math.floor(Math.random() * quizQuestions.length)]
  );

  const handleChestClick = () => {
    if (!chestOpened) {
      setChestOpened(true);
      setTimeout(() => {
        setShowQuiz(true);
      }, 1000);
      toast("O baú está se abrindo!", {
        description: "Prepare-se para o desafio do conhecimento!",
      });
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setQuizCompleted(true);

    if (correct) {
      toast.success("Resposta correta!", {
        description: "Você ganhou uma carta Fast Track!",
      });
    } else {
      toast.error("Resposta incorreta", {
        description: "Volte amanhã para uma nova chance!",
      });
    }
  };

  const handleClose = () => {
    onClose();
    setChestOpened(false);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setIsCorrect(false);
  };

  // Custom treasure chest component inspired by the image
  const TreasureChestSVG = ({ isOpen = false, className = "" }) => (
    <div className={`relative ${className}`}>
      <svg width="120" height="100" viewBox="0 0 120 100" className="drop-shadow-lg">
        {/* Chest base */}
        <rect
          x="10"
          y="45"
          width="100"
          height="45"
          rx="8"
          className="fill-purple-medium stroke-purple-dark"
          strokeWidth="3"
        />
        
        {/* Chest lid */}
        <path
          d={isOpen ? "M 10 45 Q 60 15 110 45" : "M 10 45 Q 60 25 110 45"}
          className="fill-purple-dark stroke-purple-dark"
          strokeWidth="3"
        />
        
        {/* Chest bands */}
        <rect x="5" y="55" width="110" height="4" className="fill-purple-dark" />
        <rect x="5" y="75" width="110" height="4" className="fill-purple-dark" />
        
        {/* Lock */}
        {!isOpen && (
          <circle cx="60" cy="65" r="8" className="fill-orange-medium stroke-orange-dark" strokeWidth="2" />
        )}
        
        {/* Sparkles when open */}
        {isOpen && (
          <>
            <circle cx="40" cy="30" r="2" className="fill-yellow-400 animate-pulse" />
            <circle cx="80" cy="25" r="2" className="fill-yellow-400 animate-pulse" />
            <circle cx="60" cy="20" r="3" className="fill-yellow-300 animate-bounce" />
            <circle cx="30" cy="35" r="1.5" className="fill-yellow-400 animate-pulse" />
            <circle cx="90" cy="30" r="1.5" className="fill-yellow-400 animate-pulse" />
          </>
        )}
      </svg>
      
      {/* Floating light effect */}
      {isOpen && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-200/30 to-yellow-100/50 rounded-lg animate-pulse" />
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
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
              <TreasureChestSVG isOpen={false} className="animate-pulse" />
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Clique no baú para abrir e enfrentar o desafio do conhecimento!
            </p>
          </div>
        ) : !showQuiz ? (
          <div className="flex flex-col items-center py-8">
            <div className="relative animate-bounce mb-4">
              <TreasureChestSVG isOpen={true} />
            </div>
            <p className="text-center text-lg font-medium">
              Preparando seu desafio...
            </p>
          </div>
        ) : !quizCompleted ? (
          <div className="py-6">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Brain size={40} className="text-primary" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="font-bold text-lg mb-2">Desafio do Conhecimento</h3>
              <p className="text-sm text-muted-foreground">
                Responda corretamente para ganhar uma recompensa especial!
              </p>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <h4 className="font-medium text-lg mb-4">{currentQuestion.question}</h4>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAnswer === index
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedAnswer === index
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`} />
                        <span className="text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-8"
              >
                Confirmar Resposta
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                {isCorrect ? (
                  <CheckCircle size={60} className="text-green-600" />
                ) : (
                  <XCircle size={60} className="text-red-600" />
                )}
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className={`font-bold text-xl mb-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                {isCorrect ? "Parabéns! Resposta Correta!" : "Resposta Incorreta"}
              </h3>
              {isCorrect && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg mb-4">
                  <div className="text-lg font-bold">🎫 Carta Fast Track Desbloqueada!</div>
                  <div className="text-sm">Amanhã seus hábitos gerarão +50% de atributos!</div>
                </div>
              )}
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium text-lg mb-3">
                  {isCorrect ? "Por que essa resposta está correta:" : "A resposta correta era:"}
                </h4>
                {!isCorrect && (
                  <p className="text-primary font-medium mb-2">
                    "{currentQuestion.options[currentQuestion.correctAnswer]}"
                  </p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <p className="text-xs text-primary font-medium">
                    💡 Relacionado ao hábito: {currentQuestion.habitRelated}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {!isCorrect && (
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Volte amanhã para uma nova chance de abrir o baú do tesouro!
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleClose}>
            {quizCompleted ? "Finalizar" : "Fechar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TreasureChest;
