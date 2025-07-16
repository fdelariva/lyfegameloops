import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle, XCircle, Skull, Trophy, Brain, Heart, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { AthenaImage } from "@/components/AthenaImage";

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

interface AthenaHelp {
  title: string;
  content: string;
  tip: string;
}

const athenaHelp: Record<string, AthenaHelp[]> = {
  "Sono": [
    {
      title: "O Poder do Sono Reparador",
      content: "O sono é quando seu corpo e mente se regeneram. Durante o sono profundo, seu cérebro consolida memórias e remove toxinas. A falta de sono afeta hormônios, humor e capacidade de decisão.",
      tip: "Mantenha uma rotina: durma e acorde sempre no mesmo horário, mesmo nos fins de semana."
    },
    {
      title: "Criando o Ambiente Ideal",
      content: "Seu quarto deve ser um santuário para o descanso. Temperatura entre 18-21°C, escuridão total e silêncio são essenciais. A luz azul de dispositivos eletrônicos suprime a melatonina.",
      tip: "Use cortinas blackout e desligue eletrônicos 1 hora antes de dormir."
    },
    {
      title: "Vencendo a Ruminação",
      content: "Pensamentos repetitivos antes de dormir são o maior inimigo do sono. Pratique técnicas de relaxamento como respiração profunda ou meditação para acalmar a mente.",
      tip: "Mantenha um diário ao lado da cama para anotar preocupações e liberar a mente."
    }
  ],
  "Alimentação": [
    {
      title: "Nutrição Consciente",
      content: "Alimentos integrais fornecem energia sustentável e nutrientes essenciais. Evite processados que causam picos de açúcar e inflamação no corpo.",
      tip: "Regra 80/20: 80% alimentos naturais, 20% pode ser flexível."
    },
    {
      title: "Hidratação Inteligente",
      content: "Água é vida! Seu corpo é 60% água e cada célula precisa dela para funcionar. Desidratação causa fadiga, dores de cabeça e baixa concentração.",
      tip: "Beba 1 copo de água ao acordar e mantenha uma garrafa sempre por perto."
    },
    {
      title: "Resistindo aos Processados",
      content: "Alimentos ultraprocessados viciam seu cérebro com açúcar, sal e gordura. Eles não saciam e levam ao ganho de peso e problemas de saúde.",
      tip: "Leia rótulos: se tem mais de 5 ingredientes ou nomes que não reconhece, evite."
    }
  ],
  "Exercício": [
    {
      title: "Movimento é Medicina",
      content: "Exercício libera endorfinas, melhora humor, fortalece músculos e ossos, e protege contra doenças. Apenas 30 minutos por dia fazem diferença.",
      tip: "Comece pequeno: 10 minutos de caminhada já é um victory!"
    },
    {
      title: "Força e Resistência",
      content: "Exercícios de força preservam massa muscular e aceleram metabolismo. Cardio fortalece coração e pulmões. Combine ambos para resultados máximos.",
      tip: "Use escadas em vez de elevador e estacione mais longe - cada movimento conta."
    },
    {
      title: "Vencendo a Preguiça",
      content: "Preguiça é resistência mental, não física. Crie rituais que tornem o exercício automático e encontre atividades que você genuinamente goste.",
      tip: "Prepare roupas de treino na noite anterior - diminui a fricção para começar."
    }
  ],
  "Meditação": [
    {
      title: "Mente Calma, Vida Tranquila",
      content: "Meditação é treino para a mente. Melhora foco, reduz stress e aumenta autoconsciência. É como academia para o cérebro.",
      tip: "Comece com 5 minutos diários - consistência é mais importante que duração."
    },
    {
      title: "Técnicas Simples",
      content: "Respiração consciente é a base. Conte respirações de 1 a 10 e recomece. Quando a mente vagar (e vai vagar), gentilmente volte ao foco.",
      tip: "Use apps como Headspace ou Calm, ou apenas observe sua respiração natural."
    },
    {
      title: "Controlando a Ansiedade",
      content: "Ansiedade é medo do futuro. Meditação traz você para o presente, onde ansiedade não pode existir. Pratique aceitação sem julgamento.",
      tip: "Técnica 5-4-3-2-1: veja 5 coisas, ouça 4, toque 3, cheire 2, prove 1."
    }
  ],
  "Gratidão": [
    {
      title: "O Poder da Gratidão",
      content: "Gratidão rewira seu cérebro para focar no positivo. Melhora humor, relacionamentos e até sistema imunológico. É antídoto natural para depressão.",
      tip: "Anote 3 coisas pelas quais é grato todo dia - mesmo pequenas contam."
    },
    {
      title: "Abundância vs Escassez",
      content: "Mente de abundância vê oportunidades everywhere. Mente de escassez só vê limitações. Gratidão cultiva abundância e atrai mais coisas boas.",
      tip: "Em vez de 'por que eu?', pergunte 'para que isso serve em minha jornada?'"
    },
    {
      title: "Vencendo a Insaciedade",
      content: "Insaciedade é ilusão de que felicidade está sempre 'no próximo' conquista. Gratidão encontra alegria no que você já tem, aqui e agora.",
      tip: "Celebre pequenas vitórias diárias - elas se acumulam em grandes transformações."
    }
  ],
  "Relacionamentos": [
    {
      title: "Conexões Autênticas",
      content: "Relacionamentos saudáveis são base do bem-estar. Humanos são seres sociais - isolamento causa depressão e problemas de saúde física.",
      tip: "Escute mais do que fala. Presença genuína é o maior presente que pode dar."
    },
    {
      title: "Comunicação Efetiva",
      content: "Comunique sentimentos sem culpar. Use 'eu sinto' em vez de 'você sempre'. Conflitos são oportunidades de crescimento quando bem manejados.",
      tip: "Regra dos 24 segundos: pause antes de reagir emocionalmente em conflitos."
    },
    {
      title: "Superando a Solidão",
      content: "Solidão não é estar só, é sentir-se desconectado. Invista em relacionamentos de qualidade. Uma amizade profunda vale mais que 100 conhecidos superficiais.",
      tip: "Seja vulnerável primeiro - compartilhe algo pessoal para aprofundar conexões."
    }
  ],
  "Concienciosidade": [
    {
      title: "Disciplina é Liberdade",
      content: "Pessoas conscientes fazem o que precisa ser feito, mesmo quando não sentem vontade. Disciplina cria sistemas que geram resultados automáticos.",
      tip: "Comece com 1% melhor todo dia - pequenas melhorias compostas geram grandes resultados."
    },
    {
      title: "Organização Mental",
      content: "Mente organizada toma melhores decisões. Use listas, calendários e sistemas para não sobrecarregar memória com tarefas simples.",
      tip: "Método GTD: capture tudo em um lugar confiável para liberar mente para criatividade."
    },
    {
      title: "Combatendo a Apatia",
      content: "Apatia é ausência de propósito. Reconecte-se com seus valores profundos e por que faz o que faz. Sentido transforma tarefas em missões.",
      tip: "Pergunte-se: 'Como isso que estou fazendo serve algo maior que eu?'"
    }
  ]
};

// Agrupamento por temas
const themeGroups = {
  "Energia": ["Sono", "Alimentação", "Exercício", "Meditação"],
  "Habilidade": ["Concienciosidade"],
  "Conexão": ["Gratidão", "Relacionamentos"]
};

const challenges: Challenge[] = [
  // ENERGIA
  {
    day: 1,
    theme: "Sono",
    shadow: "Exaustão",
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
    shadow: "Gula",
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
  // HABILIDADE
  {
    day: 5,
    theme: "Concienciosidade",
    shadow: "Apatia",
    questions: [
      // Questions will be added later
    ]
  },
  // CONEXÃO
  {
    day: 6,
    theme: "Gratidão",
    shadow: "Insasciedade",
    questions: [
      // Questions will be added later
    ]
  },
  {
    day: 7,
    theme: "Relacionamentos",
    shadow: "Solidão",
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
  const [showAthenaModal, setShowAthenaModal] = useState(false);
  const [athenaUsedToday, setAthenaUsedToday] = useState<Record<number, boolean>>({});
  const [collectedCards, setCollectedCards] = useState<Set<number>>(new Set());

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
        
        // Verificar se venceu a sombra (score > 80%) e coletar carta
        setTimeout(() => {
          const correctAnswers = newAnswers.filter((answer, index) => 
            answer === currentChallenge?.questions[index].correctAnswer
          ).length;
          const score = (correctAnswers / 5) * 100;
          
          if (score >= 80) {
            setCollectedCards(prev => new Set([...prev, currentDay]));
          }
        }, 100);
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

  const handleAthenaHelp = () => {
    setShowAthenaModal(true);
    setAthenaUsedToday(prev => ({ ...prev, [currentDay]: true }));
  };

  const isAthenaAvailable = () => {
    return !athenaUsedToday[currentDay];
  };

  // Redirecionar automaticamente após mostrar o resultado
  useEffect(() => {
    if (gameState === 'result') {
      const timer = setTimeout(() => {
        setGameState('intro');
      }, 4000); // 4 segundos para mostrar o resultado
      
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => {
                // Mark the learning habit as completed when returning from lesson
                console.log('Caverna: Setting cavernaHabitCompleted to true');
                localStorage.setItem('cavernaHabitCompleted', 'true');
                navigate('/dashboard-q3');
              }}
              className="mb-4"
            >
              ← Voltar ao Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              🕳️ Caverna da Sabedoria
            </h1>
            <p className="text-muted-foreground text-lg">
              Sua jornada de 7 dias para ganhar pergaminhos mágicos e se preparar para seu primeiro quest
            </p>
          </div>

          {/* Oracle Introduction */}
          <Card className="mb-8 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <AthenaImage 
                  className="w-full h-full object-contain"
                  alt="Athena - Deusa da Sabedoria"
                />
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
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Athena, Agente do Bem
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  Em cada dia da jornada, Athena pode te ajudar uma vez com conselhos sábios sobre o tema. 
                  Use sua ajuda com cuidado - ela só estará disponível novamente no próximo dia!
                </p>
              </div>
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

          {/* Progress Overview Grouped by Themes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Jornada dos 7 Dias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(themeGroups).map(([groupName, themes]) => (
                  <div key={groupName} className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        groupName === 'Energia' ? 'bg-blue-100 text-blue-600' :
                        groupName === 'Habilidade' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {groupName === 'Energia' ? '⚡' : groupName === 'Habilidade' ? '🧠' : '❤️'}
                      </div>
                      <h3 className="font-semibold text-lg">{groupName}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        groupName === 'Energia' ? 'bg-blue-50 text-blue-600' :
                        groupName === 'Habilidade' ? 'bg-purple-50 text-purple-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {themes.length} {themes.length === 1 ? 'desafio' : 'desafios'}
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      {themes.map((theme) => {
                        const challenge = challenges.find(c => c.theme === theme);
                        const day = challenge?.day || 0;
                        return (
                          <div key={theme} className={`flex items-center gap-3 p-3 rounded-lg border ${
                            day < currentDay ? 'border-primary/20 bg-primary/5' :
                            day === currentDay ? 'border-primary bg-primary/10' :
                            'border-muted bg-muted/30'
                          }`}>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                              day < currentDay ? 'bg-primary text-primary-foreground border-primary' :
                              day === currentDay ? 'border-primary text-primary' :
                              'border-muted text-muted-foreground'
                            }`}>
                              {day < currentDay ? <CheckCircle className="w-4 h-4" /> : day}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">
                                Dia {day}: {theme}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                vs {challenge?.shadow || 'Aguarde...'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {day < currentDay ? 'Concluído' : 
                                 day === currentDay ? 'Atual' : 'Bloqueado'}
                              </p>
                            </div>
                            {day === currentDay && (
                              <Button 
                                onClick={startChallenge}
                                size="sm"
                                className="ml-auto"
                              >
                                Iniciar
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Coleção de Cartas das Sombras Vencidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const challenge = challenges.find(c => c.day === day);
                  const hasCard = collectedCards.has(day);
                  
                  return (
                    <div 
                      key={day} 
                      className={`relative aspect-[3/4] rounded-lg border-2 transition-all duration-300 ${
                        hasCard 
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 shadow-md hover:shadow-lg' 
                          : 'border-dashed border-muted bg-muted/20'
                      }`}
                    >
                      {hasCard ? (
                        <div className="p-2 h-full flex flex-col items-center justify-center text-center">
                          <Trophy className="w-6 h-6 text-yellow-600 mb-1" />
                          <p className="text-xs font-bold text-yellow-700 dark:text-yellow-300">
                            {challenge?.theme}
                          </p>
                          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                            vs {challenge?.shadow}
                          </p>
                          <Sparkles className="w-3 h-3 text-yellow-500 mt-1" />
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                          <div className="w-6 h-6 border-2 border-dashed border-muted-foreground rounded mb-1" />
                          <p className="text-xs text-muted-foreground">
                            Dia {day}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {challenge?.theme || '?'}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <strong>{collectedCards.size}/7</strong> sombras vencidas
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Vença uma sombra acertando mais de 80% das perguntas para coletar sua carta!
                </p>
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
              
              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={handleAthenaHelp}
                  disabled={!isAthenaAvailable() || showFeedback}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {isAthenaAvailable() ? "Peça Ajuda à Athena" : "Athena Usada Hoje"}
                </Button>
                
                {!showFeedback && (
                  <Button 
                    onClick={submitAnswer} 
                    disabled={selectedAnswer === null}
                    className="flex-1"
                    size="lg"
                  >
                    Confirmar Resposta
                  </Button>
                )}
              </div>
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

          {/* Athena Help Modal */}
          <Dialog open={showAthenaModal} onOpenChange={setShowAthenaModal}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Heart className="w-6 h-6 text-pink-500" />
                  Athena, Agente do Bem
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                  <p className="text-sm text-pink-800 dark:text-pink-200">
                    <strong>💡 Sabedoria sobre {currentChallenge?.theme}:</strong> Aqui estão insights valiosos 
                    para te ajudar a responder as perguntas e vencer a {currentChallenge?.shadow}.
                  </p>
                </div>

                <Carousel className="w-full">
                  <CarouselContent>
                    {athenaHelp[currentChallenge?.theme || ""]?.map((help, index) => (
                      <CarouselItem key={index}>
                        <Card className="h-full">
                          <CardHeader>
                            <CardTitle className="text-lg text-primary flex items-center gap-2">
                              <Brain className="w-5 h-5" />
                              {help.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {help.content}
                            </p>
                            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                              <p className="text-sm font-semibold text-primary">
                                💡 Dica Prática:
                              </p>
                              <p className="text-sm text-primary/80 mt-1">
                                {help.tip}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <div className="text-center pt-4">
                  <Button onClick={() => setShowAthenaModal(false)} variant="outline">
                    Obrigado, Athena! 
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const score = calculateScore();
    const shadowDefeated = score >= 80;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center animate-scale-in">
          <CardContent className="pt-8 pb-6">
            <div className="space-y-6">
              {shadowDefeated ? (
                <>
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img 
                      src="/lovable-uploads/5fe94979-7376-401f-96e1-6d02bfd376ab.png" 
                      alt="Carta da Exaustão Vencida"
                      className="w-full h-full object-contain animate-fade-in"
                    />
                  </div>
                  <div className="space-y-2">
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
                    <h2 className="text-2xl font-bold text-green-600">
                      Sombra Vencida! 🎉
                    </h2>
                    <p className="text-muted-foreground">
                      Você derrotou a <strong>{currentChallenge?.shadow}</strong>
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-200">
                        <strong>Pontuação: {score.toFixed(0)}%</strong>
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                        Carta coletada! Você ganhou a carta da {currentChallenge?.shadow}.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Skull className="w-16 h-16 text-red-500 mx-auto" />
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-red-600">
                      Sombra Resistiu
                    </h2>
                    <p className="text-muted-foreground">
                      A <strong>{currentChallenge?.shadow}</strong> ainda está forte
                    </p>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        <strong>Pontuação: {score.toFixed(0)}%</strong>
                      </p>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                        Precisa de 80% ou mais para vencer a sombra.
                      </p>
                    </div>
                  </div>
                </>
              )}
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Retornando à Caverna da Sabedoria...
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-3000 animate-[width_3s_ease-in-out]"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default CavernaDaSabedoria;