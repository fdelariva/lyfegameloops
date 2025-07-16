import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Sword, Trophy, Timer, Play, ChevronLeft } from "lucide-react";
import { AthenaImage } from "@/components/AthenaImage";

interface Battle {
  day: number;
  theme: string;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const battles: Battle[] = [
  {
    day: 1,
    theme: "Combatendo a Procrastinação - Batalha 1",
    questions: [
      {
        id: 1,
        question: "Qual é a principal causa da procrastinação?",
        options: ["Preguiça", "Medo do fracasso", "Falta de tempo", "Desorganização"],
        correctAnswer: 1,
        explanation: "O medo do fracasso é uma das principais causas da procrastinação, pois evitamos tarefas que podem nos fazer sentir inadequados."
      },
      {
        id: 2,
        question: "Qual técnica é mais eficaz para vencer a procrastinação?",
        options: ["Esperar motivação", "Técnica Pomodoro", "Fazer tudo de uma vez", "Postergar até amanhã"],
        correctAnswer: 1,
        explanation: "A Técnica Pomodoro divide o trabalho em blocos focados de 25 minutos, tornando tarefas grandes mais gerenciáveis."
      },
      {
        id: 3,
        question: "Como o cérebro reage à procrastinação?",
        options: ["Fica mais produtivo", "Libera dopamina", "Entra em modo de fuga", "Aumenta foco"],
        correctAnswer: 2,
        explanation: "Quando procrastinamos, o cérebro entra em modo de fuga, evitando o desconforto da tarefa difícil."
      },
      {
        id: 4,
        question: "Qual é o primeiro passo para vencer a procrastinação?",
        options: ["Começar pequeno", "Planejar tudo", "Esperar o momento certo", "Fazer lista longa"],
        correctAnswer: 0,
        explanation: "Começar pequeno reduz a resistência mental e cria momentum para continuar com a tarefa."
      }
    ]
  },
  {
    day: 2,
    theme: "Combatendo a Procrastinação - Batalha 2",
    questions: [
      {
        id: 1,
        question: "O que é o 'perfeccionismo paralisante'?",
        options: ["Fazer tudo perfeito", "Não começar por medo de imperfeição", "Ser muito detalhista", "Corrigir erros"],
        correctAnswer: 1,
        explanation: "Perfeccionismo paralisante é quando não começamos uma tarefa por medo de não fazer perfeitamente."
      },
      {
        id: 2,
        question: "Qual hormônio está relacionado à procrastinação?",
        options: ["Serotonina", "Cortisol", "Dopamina", "Melatonina"],
        correctAnswer: 1,
        explanation: "O cortisol (hormônio do stress) aumenta quando procrastinamos, criando um ciclo vicioso de ansiedade."
      },
      {
        id: 3,
        question: "Como quebrar uma tarefa grande?",
        options: ["Fazer de uma vez", "Dividir em micro-tarefas", "Adiar para depois", "Pedir ajuda"],
        correctAnswer: 1,
        explanation: "Dividir em micro-tarefas torna o trabalho menos intimidante e mais gerenciável."
      },
      {
        id: 4,
        question: "Qual ambiente favorece o foco?",
        options: ["Cheio de distrações", "Silencioso e organizado", "Com TV ligada", "Com notificações"],
        correctAnswer: 1,
        explanation: "Um ambiente silencioso e organizado reduz distrações e facilita a concentração."
      }
    ]
  },
  {
    day: 3,
    theme: "Combatendo a Procrastinação - Batalha 3",
    questions: [
      {
        id: 1,
        question: "O que é a 'regra dos 2 minutos'?",
        options: ["Descansar 2 minutos", "Se leva menos de 2 min, faça agora", "Trabalhar só 2 minutos", "Pensar por 2 minutos"],
        correctAnswer: 1,
        explanation: "Se uma tarefa leva menos de 2 minutos para ser concluída, faça imediatamente em vez de adiar."
      },
      {
        id: 2,
        question: "Como lidar com tarefas desagradáveis?",
        options: ["Evitar sempre", "Fazer primeiro", "Deixar para depois", "Delegar sempre"],
        correctAnswer: 1,
        explanation: "Fazer tarefas desagradáveis primeiro ('eat the frog') libera energia mental para o resto do dia."
      },
      {
        id: 3,
        question: "O que é autodisciplina?",
        options: ["Força de vontade", "Hábito consistente", "Punição", "Rigidez extrema"],
        correctAnswer: 1,
        explanation: "Autodisciplina é mais sobre criar hábitos consistentes do que depender apenas da força de vontade."
      },
      {
        id: 4,
        question: "Como usar recompensas efetivamente?",
        options: ["Recompensar sempre", "Só após conclusão", "Antes de começar", "Nunca recompensar"],
        correctAnswer: 1,
        explanation: "Recompensas devem vir após a conclusão da tarefa para reforçar o comportamento desejado."
      }
    ]
  },
  {
    day: 4,
    theme: "Combatendo a Procrastinação - Batalha 4",
    questions: [
      {
        id: 1,
        question: "Qual o maior inimigo da produtividade?",
        options: ["Cansaço", "Distrações", "Falta de tempo", "Falta de recursos"],
        correctAnswer: 1,
        explanation: "Distrações fragmentam nossa atenção e destroem o foco profundo necessário para trabalho significativo."
      },
      {
        id: 2,
        question: "Como manter foco por mais tempo?",
        options: ["Café", "Multitarefa", "Blocos de tempo", "Música alta"],
        correctAnswer: 2,
        explanation: "Trabalhar em blocos de tempo dedicados (time blocking) mantém foco e evita mudança constante de contexto."
      },
      {
        id: 3,
        question: "O que é 'flow state'?",
        options: ["Cansaço", "Foco total absorvente", "Pressa", "Ansiedade"],
        correctAnswer: 1,
        explanation: "Flow é estado de concentração total onde perdemos noção do tempo e somos altamente produtivos."
      },
      {
        id: 4,
        question: "Melhor estratégia para grandes projetos?",
        options: ["Fazer tudo junto", "Dividir em partes", "Esperar inspiração", "Trabalhar sem parar"],
        correctAnswer: 1,
        explanation: "Dividir grandes projetos em partes menores torna o progresso visível e reduz sobrecarga mental."
      }
    ]
  },
  {
    day: 5,
    theme: "Combatendo a Procrastinação - Batalha 5",
    questions: [
      {
        id: 1,
        question: "O que é 'análise-paralisia'?",
        options: ["Não conseguir se mover", "Pensar demais sem agir", "Fazer muito rápido", "Não pensar"],
        correctAnswer: 1,
        explanation: "Análise-paralisia é quando ficamos presos pensando em todas as possibilidades sem tomar ação."
      },
      {
        id: 2,
        question: "Como vencer a overthinking?",
        options: ["Pensar mais", "Definir deadline", "Evitar decisões", "Perguntar para todos"],
        correctAnswer: 1,
        explanation: "Definir prazos claros força decisões e impede que fiquemos presos em loops de pensamento."
      },
      {
        id: 3,
        question: "Qual o papel da energia pessoal?",
        options: ["Não importa", "Fundamental para foco", "Só para exercício", "Overrated"],
        correctAnswer: 1,
        explanation: "Energia pessoal é combustível para concentração. Sem energia, mesmo tarefas fáceis se tornam difíceis."
      },
      {
        id: 4,
        question: "Como restaurar energia mental?",
        options: ["Café", "Descansos estratégicos", "Trabalhar mais", "Ignorar"],
        correctAnswer: 1,
        explanation: "Descansos estratégicos, especialmente na natureza, restauram nossa capacidade de foco e atenção."
      }
    ]
  },
  {
    day: 6,
    theme: "Combatendo a Procrastinação - Batalha 6",
    questions: [
      {
        id: 1,
        question: "O que são 'quick wins'?",
        options: ["Vitórias fáceis", "Tarefas simples que geram momentum", "Ganhar dinheiro", "Sorte"],
        correctAnswer: 1,
        explanation: "Quick wins são tarefas pequenas que podemos completar rapidamente para gerar momentum e confiança."
      },
      {
        id: 2,
        question: "Como lidar com sobrecarga mental?",
        options: ["Fazer mais", "Brain dump em papel", "Ignorar", "Beber mais café"],
        correctAnswer: 1,
        explanation: "Fazer um 'brain dump' tirando tudo da cabeça para o papel libera espaço mental para foco."
      },
      {
        id: 3,
        question: "Qual o papel do ambiente?",
        options: ["Irrelevante", "Influencia comportamento", "Só estética", "Não importa"],
        correctAnswer: 1,
        explanation: "Nosso ambiente físico influencia profundamente nosso comportamento e capacidade de foco."
      },
      {
        id: 4,
        question: "Como usar accountability?",
        options: ["Trabalhar sozinho", "Contar para alguém", "Esconder objetivos", "Não se comprometer"],
        correctAnswer: 1,
        explanation: "Compartilhar objetivos com outros cria accountability social que nos motiva a cumprir compromissos."
      }
    ]
  },
  {
    day: 7,
    theme: "Combatendo a Procrastinação - Batalha Final",
    questions: [
      {
        id: 1,
        question: "Qual o segredo da consistência?",
        options: ["Força de vontade", "Sistemas, não objetivos", "Motivação", "Sorte"],
        correctAnswer: 1,
        explanation: "Sistemas e processos consistentes são mais poderosos que força de vontade para mudança duradoura."
      },
      {
        id: 2,
        question: "Como manter progresso a longo prazo?",
        options: ["Motivação constante", "Pequenos passos diários", "Grandes esforços", "Esperar resultados"],
        correctAnswer: 1,
        explanation: "Pequenos passos diários consistentes criam mudanças compostas maiores que esforços esporádicos."
      },
      {
        id: 3,
        question: "O que fazer quando falhar?",
        options: ["Desistir", "Recomeçar rapidamente", "Se punir", "Esperar próxima segunda"],
        correctAnswer: 1,
        explanation: "Falhas são normais. O importante é recomeçar rapidamente sem julgamento ou punição."
      },
      {
        id: 4,
        question: "Maior lição sobre procrastinação?",
        options: ["É impossível vencer", "Ação imperfeita > inação perfeita", "Precisa motivação", "É genético"],
        correctAnswer: 1,
        explanation: "Ação imperfeita sempre supera inação perfeita. Começar mal é melhor que não começar."
      }
    ]
  }
];

const CavernaDoDesafio: React.FC = () => {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(1);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'action' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [actionTimer, setActionTimer] = useState(10);
  const [collectedCards, setCollectedCards] = useState<Set<number>>(new Set());
  const [battleResults, setBattleResults] = useState<Record<number, boolean>>({});

  const currentBattle = battles.find(b => b.day === currentDay);
  const currentQuestion = currentBattle?.questions[currentQuestionIndex];

  const startBattle = () => {
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
      if (currentQuestionIndex < 3) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Fim das perguntas, ir para ação
        setGameState('action');
        setActionTimer(10);
      }
    }, 2000);
  };

  const startFocusAction = () => {
    const timer = setInterval(() => {
      setActionTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          completeBattle();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeBattle = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === currentBattle?.questions[index].correctAnswer
    ).length;
    const score = (correctAnswers / 4) * 100;
    
    if (score >= 80) {
      setCollectedCards(prev => new Set([...prev, currentDay]));
      setBattleResults(prev => ({ ...prev, [currentDay]: true }));
      
      // Criar ou atualizar hábito de combate à procrastinação
      const habitData = {
        id: 'combat-procrastination',
        name: 'Lutar contra a Procrastinação',
        icon: '⚔️',
        color: 'bg-red-500',
        autoTrack: true,
        completed: true,
        completedAt: new Date().toISOString()
      };
      
      // Salvar no localStorage
      const existingHabits = JSON.parse(localStorage.getItem('userHabits') || '[]');
      const habitIndex = existingHabits.findIndex((h: any) => h.id === 'combat-procrastination');
      
      if (habitIndex >= 0) {
        existingHabits[habitIndex] = { ...existingHabits[habitIndex], ...habitData };
      } else {
        existingHabits.push(habitData);
      }
      
      localStorage.setItem('userHabits', JSON.stringify(existingHabits));
      localStorage.setItem('questHabitCompleted', 'true');
    }
    
    setGameState('result');
  };

  const calculateScore = () => {
    if (!currentBattle) return 0;
    const correctAnswers = answers.filter((answer, index) => 
      answer === currentBattle.questions[index].correctAnswer
    ).length;
    return (correctAnswers / 4) * 100;
  };

  const isAnswerCorrect = () => {
    if (!currentQuestion || selectedAnswer === null) return false;
    return selectedAnswer === currentQuestion.correctAnswer;
  };

  useEffect(() => {
    if (gameState === 'result') {
      const timer = setTimeout(() => {
        setGameState('intro');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-destructive/5 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard-q3')}
              className="mb-4"
            >
              ← Voltar ao Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              ⚔️ Caverna do Desafio
            </h1>
            <p className="text-muted-foreground text-lg">
              Enfrente SLOTH, a sombra da procrastinação, em 7 batalhas épicas
            </p>
          </div>

          <Card className="mb-8 border-destructive/20">
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-6xl">
                  🦥
                </div>
              </div>
              <CardTitle className="text-2xl">⚔️ Desafio de SLOTH</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Bem-vindo à <strong>Caverna do Desafio</strong>! 
              </p>
              <p className="text-muted-foreground">
                SLOTH, a sombra da procrastinação, te desafia para 7 batalhas. 
                Cada batalha contém 4 perguntas + uma ação de foco de 10 minutos.
              </p>
              <p className="text-muted-foreground">
                Vença acertando 80%+ das questões e completando a ação para coletar uma carta de vitória!
              </p>
              <div className="bg-destructive/5 p-4 rounded-lg">
                <p className="font-semibold text-destructive">
                  Está pronto para sua primeira batalha contra SLOTH?
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sword className="w-5 h-5 text-destructive" />
                Batalha {currentDay}: {currentBattle?.theme}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Batalha de hoje:</p>
                  <p className="font-semibold text-primary">{currentBattle?.theme}</p>
                </div>
                <Badge variant="outline" className="text-destructive border-destructive">
                  4 Perguntas + Ação
                </Badge>
              </div>
              
              <Button 
                onClick={startBattle}
                className="w-full bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70"
                size="lg"
              >
                <Sword className="w-5 h-5 mr-2" />
                Iniciar Batalha {currentDay}
              </Button>
            </CardContent>
          </Card>

          {/* Cartas Coletadas */}
          {collectedCards.size > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Cartas de Vitória Coletadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }, (_, i) => i + 1).map(day => (
                    <div 
                      key={day} 
                      className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-bold ${
                        collectedCards.has(day) 
                          ? 'bg-yellow-100 border-yellow-400 text-yellow-800' 
                          : 'bg-gray-100 border-gray-300 text-gray-500'
                      }`}
                    >
                      <div className="text-lg">🦥</div>
                      <div>{day}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {collectedCards.size}/7 batalhas vencidas
                  </p>
                  {collectedCards.size === 7 && (
                    <p className="text-sm font-bold text-green-600 mt-2">
                      🎉 Parabéns! Você venceu SLOTH completamente!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-destructive/5 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={() => setGameState('intro')}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Badge variant="outline">
                Pergunta {currentQuestionIndex + 1} de 4
              </Badge>
            </div>
            <Progress 
              value={((currentQuestionIndex + 1) / 4) * 100} 
              className="h-2"
            />
          </div>

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
                    <span className="font-medium mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>

              {showFeedback && currentQuestion && (
                <div className={`mt-4 p-4 rounded-lg border ${
                  isAnswerCorrect() 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-start gap-2">
                    {isAnswerCorrect() ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold mb-1">
                        {isAnswerCorrect() ? "Correto!" : "Incorreto"}
                      </p>
                      <p className="text-sm">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={submitAnswer}
                disabled={selectedAnswer === null || showFeedback}
                className="w-full mt-6"
              >
                {currentQuestionIndex < 3 ? "Próxima Pergunta" : "Ir para Ação"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'action') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">⚔️ Ação de Batalha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Agora é hora da ação! Trabalhe focado por 10 minutos para vencer SLOTH.
              </p>
              
              <div className="text-6xl font-bold text-primary mb-4">
                {actionTimer}s
              </div>
              
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-primary border-r-transparent animate-spin"
                  style={{ animationDuration: '1s' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Timer className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Concentre-se em uma tarefa importante. SLOTH está observando...
              </p>
              
              <Button 
                onClick={startFocusAction}
                className="bg-gradient-to-r from-primary to-primary/80"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Começar Foco
              </Button>
            </CardContent>
          </Card>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                {won ? "🏆 Vitória!" : "💪 Continue Lutando!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl mb-4">
                {won ? "🦥⚔️" : "🦥"}
              </div>
              
              <div>
                <p className="text-2xl font-bold text-primary mb-2">
                  {score.toFixed(0)}%
                </p>
                <p className="text-muted-foreground">
                  {won 
                    ? `Parabéns! Você venceu a Batalha ${currentDay} contra SLOTH!`
                    : `Você não venceu desta vez. Tente novamente!`
                  }
                </p>
              </div>

              {won && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 font-semibold">
                    🃏 Carta de Vitória #{currentDay} coletada!
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Hábito "Lutar contra a Procrastinação" foi marcado automaticamente.
                  </p>
                </div>
              )}
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Voltando ao dashboard em alguns segundos...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default CavernaDoDesafio;