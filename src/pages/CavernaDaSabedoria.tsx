import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Skull, Trophy, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Challenge {
  day: number;
  theme: string;
  shadow: string;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const challenges: Challenge[] = [
  {
    day: 1,
    theme: "Sono",
    shadow: "Ruminação",
    questions: [
      {
        id: 1,
        question: "Quantas horas de sono um adulto precisa em média?",
        options: ["5-6 horas", "7-9 horas", "10-12 horas", "4-5 horas"],
        correctAnswer: 1,
        explanation: "Adultos precisam de 7-9 horas de sono para funcionamento ideal do corpo e mente."
      },
      {
        id: 2,
        question: "Qual hormônio é responsável pela regulação do sono?",
        options: ["Cortisol", "Insulina", "Melatonina", "Dopamina"],
        correctAnswer: 2,
        explanation: "A melatonina é produzida pela glândula pineal e regula nosso ciclo circadiano."
      },
      {
        id: 3,
        question: "O que mais prejudica a qualidade do sono?",
        options: ["Exercício matinal", "Luz azul antes de dormir", "Leitura", "Música calma"],
        correctAnswer: 1,
        explanation: "A luz azul das telas suprime a produção de melatonina, dificultando o adormecer."
      },
      {
        id: 4,
        question: "Qual a temperatura ideal do quarto para dormir?",
        options: ["25-27°C", "15-17°C", "18-21°C", "22-25°C"],
        correctAnswer: 2,
        explanation: "Temperatura entre 18-21°C ajuda o corpo a baixar sua temperatura interna para o sono."
      },
      {
        id: 5,
        question: "Quanto tempo antes de dormir devemos parar de comer?",
        options: ["30 minutos", "1 hora", "2-3 horas", "5 horas"],
        correctAnswer: 2,
        explanation: "Parar de comer 2-3 horas antes permite digestão adequada sem interferir no sono."
      }
    ]
  },
  {
    day: 2,
    theme: "Alimentação",
    shadow: "Alimentos Processados",
    questions: [
      // Questions will be added later
    ]
  },
  {
    day: 3,
    theme: "Exercício",
    shadow: "Preguiça",
    questions: [
      // Questions will be added later
    ]
  },
  {
    day: 4,
    theme: "Meditação",
    shadow: "Ansiedade",
    questions: [
      // Questions will be added later
    ]
  },
  {
    day: 5,
    theme: "Gratidão",
    shadow: "Insasciedade",
    questions: [
      // Questions will be added later
    ]
  },
  {
    day: 6,
    theme: "Relacionamentos",
    shadow: "Solidão",
    questions: [
      // Questions will be added later
    ]
  },
  {
    day: 7,
    theme: "Concienciosidade",
    shadow: "Apatia",
    questions: [
      // Questions will be added later
    ]
  }
];

const CavernaDaSabedoria: React.FC = () => {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(1);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result' | 'feedback'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentChallenge = challenges.find(c => c.day === currentDay);
  const currentQuestion = currentChallenge?.questions[currentQuestionIndex];

  const startChallenge = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < 4) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Fim do desafio
        setGameState('result');
      }
    }, 3000);
  };

  const calculateScore = () => {
    if (!currentChallenge) return 0;
    const correctAnswers = answers.filter((answer, index) => 
      answer === currentChallenge.questions[index].correctAnswer
    ).length;
    return (correctAnswers / 5) * 100;
  };

  const isAnswerCorrect = () => {
    if (!currentQuestion || selectedAnswer === null) return false;
    return selectedAnswer === currentQuestion.correctAnswer;
  };

  const resetChallenge = () => {
    setGameState('intro');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard-q3')}
              className="mb-4"
            >
              ← Voltar ao Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              🕳️ Caverna da Sabedoria
            </h1>
            <p className="text-muted-foreground text-lg">
              Jornada de 7 dias para dominar seus hábitos
            </p>
          </div>

          {/* Oracle Introduction */}
          <Card className="mb-8 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">🔮 Mensagem do Oráculo</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Bem-vindo à <strong>Jornada da Sabedoria</strong>! 
              </p>
              <p className="text-muted-foreground">
                Durante os próximos 7 dias, você enfrentará desafios únicos. 
                Cada dia traz 5 perguntas sobre temas essenciais para transformação pessoal.
              </p>
              <p className="text-muted-foreground">
                Acerte mais de 80% das questões e vencerá a <strong>Sombra</strong> do dia - 
                forças internas que bloqueiam seu crescimento.
              </p>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="font-semibold text-primary">
                  Está pronto para enfrentar suas sombras internas?
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skull className="w-5 h-5 text-destructive" />
                Dia {currentDay}: {currentChallenge?.theme}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sombra a vencer:</p>
                  <p className="font-semibold text-destructive">{currentChallenge?.shadow}</p>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  5 Perguntas
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Responda 5 perguntas sobre {currentChallenge?.theme.toLowerCase()}. 
                Acerte mais de 80% para vencer a {currentChallenge?.shadow}.
              </p>
              <Button onClick={startChallenge} className="w-full" size="lg">
                Iniciar Desafio do Dia {currentDay}
              </Button>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso da Jornada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const challenge = challenges.find(c => c.day === day);
                  return (
                    <div key={day} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                        day < currentDay ? 'bg-primary text-primary-foreground border-primary' :
                        day === currentDay ? 'border-primary text-primary' :
                        'border-muted text-muted-foreground'
                      }`}>
                        {day < currentDay ? <CheckCircle className="w-4 h-4" /> : day}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Dia {day}: {challenge?.theme || 'Em breve'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {challenge ? `vs ${challenge.shadow}` : 'Aguarde...'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {day < currentDay ? 'Concluído' : 
                           day === currentDay ? 'Atual' : 'Bloqueado'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Pergunta {currentQuestionIndex + 1} de 5
              </span>
              <span className="text-sm text-muted-foreground">
                Dia {currentDay}: {currentChallenge?.theme}
              </span>
            </div>
            <Progress value={(currentQuestionIndex + 1) * 20} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQuestion?.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion?.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                  >
                    <span className="mr-3 font-semibold">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
              
              {!showFeedback && (
                <Button 
                  onClick={submitAnswer} 
                  disabled={selectedAnswer === null}
                  className="w-full mt-6"
                  size="lg"
                >
                  Confirmar Resposta
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Feedback */}
          {showFeedback && (
            <Card className={`border-2 ${isAnswerCorrect() ? 'border-green-500' : 'border-red-500'}`}>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  {isAnswerCorrect() ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                  )}
                  
                  <h3 className={`text-xl font-semibold ${
                    isAnswerCorrect() ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isAnswerCorrect() ? 'Correto!' : 'Incorreto!'}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {currentQuestion?.explanation}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const score = calculateScore();
    const won = score >= 80;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className={`border-2 ${won ? 'border-green-500' : 'border-red-500'}`}>
            <CardContent className="pt-8 pb-8">
              <div className="space-y-6">
                {won ? (
                  <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
                ) : (
                  <Skull className="w-20 h-20 text-red-500 mx-auto" />
                )}
                
                <div>
                  <h2 className={`text-3xl font-bold ${won ? 'text-green-600' : 'text-red-600'}`}>
                    {won ? 'Vitória!' : 'Derrota!'}
                  </h2>
                  <p className="text-xl text-muted-foreground mt-2">
                    Você acertou {Math.round(score)}% das perguntas
                  </p>
                </div>

                <div className="bg-background/50 p-4 rounded-lg">
                  <p className="font-semibold">
                    {won 
                      ? `Parabéns! Você venceu a ${currentChallenge?.shadow}!` 
                      : `A ${currentChallenge?.shadow} prevaleceu desta vez.`
                    }
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {won 
                      ? 'Você está mais forte e pode avançar para o próximo dia.'
                      : 'Não desista! Tente novamente quando estiver pronto.'
                    }
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/dashboard-q3')} 
                    className="w-full"
                    size="lg"
                  >
                    Voltar ao Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetChallenge}
                    className="w-full"
                  >
                    Tentar Novamente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default CavernaDaSabedoria;