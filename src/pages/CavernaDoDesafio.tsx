import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Sword, Trophy, Timer, Play, ChevronLeft, Lock, Gift } from "lucide-react";
import { AthenaImage } from "@/components/AthenaImage";
import HabitSelectionStep from "@/components/onboarding/HabitSelectionStep";
import { defaultHabits } from "@/data/defaultHabits";
import { createCustomHabit } from "@/utils/onboardingUtils";

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

interface Shadow {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
  battles: Battle[];
}

const slothBattles: Battle[] = [
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

const vertigoBattles: Battle[] = [
  {
    day: 1,
    theme: "Combatendo Vertigo - Batalha 1: Estimulação Excessiva",
    questions: [
      {
        id: 1,
        question: "O que é o 'hijack de dopamina' das redes sociais?",
        options: ["Perder senha", "Algoritmos que viciam", "Curtir posts", "Fazer amigos"],
        correctAnswer: 1,
        explanation: "Algoritmos são projetados para liberar dopamina e manter você viciado, sequestrando seu sistema de recompensas natural."
      },
      {
        id: 2,
        question: "Por que é difícil parar de usar o celular?",
        options: ["É útil", "Reforço intermitente", "É barato", "É moderno"],
        correctAnswer: 1,
        explanation: "O reforço intermitente (como likes e notificações) é a forma mais viciante de condicionamento, usado também em jogos de azar."
      },
      {
        id: 3,
        question: "Qual o principal problema dos feeds infinitos?",
        options: ["Gastam bateria", "Nunca acabam", "São pagos", "São lentos"],
        correctAnswer: 1,
        explanation: "Feeds infinitos eliminam pontos naturais de parada, mantendo você rolando indefinidamente sem perceber o tempo passar."
      },
      {
        id: 4,
        question: "Como as notificações afetam o cérebro?",
        options: ["Melhoram foco", "Fragmentam atenção", "Aumentam memória", "Reduzem stress"],
        correctAnswer: 1,
        explanation: "Notificações fragmentam nossa atenção e destroem a capacidade de foco profundo, mesmo quando silenciadas."
      }
    ]
  },
  {
    day: 2,
    theme: "Combatendo Vertigo - Batalha 2: Apostas e Jogos",
    questions: [
      {
        id: 1,
        question: "Por que jogos mobile são tão viciantes?",
        options: ["São grátis", "Loops de dopamina", "São fáceis", "Têm gráficos"],
        correctAnswer: 1,
        explanation: "Jogos mobile usam loops de dopamina calculados para manter você jogando, similar a máquinas caça-níqueis."
      },
      {
        id: 2,
        question: "O que são 'microtransações predatórias'?",
        options: ["Compras baratas", "Táticas psicológicas para gastar", "Promoções", "Descontos"],
        correctAnswer: 1,
        explanation: "Microtransações usam pressão temporal, FOMO e outras táticas psicológicas para induzir gastos impulsivos."
      },
      {
        id: 3,
        question: "Como apostas online exploram vulnerabilidades?",
        options: ["Oferecem bônus", "Simulam vitórias fáceis", "São convenientes", "Têm apps"],
        correctAnswer: 1,
        explanation: "Apostas online usam 'quase-vitórias' e vitórias iniciais para criar falsa sensação de controle e induzir mais apostas."
      },
      {
        id: 4,
        question: "Qual o perigo dos jogos 'free-to-play'?",
        options: ["São ruins", "Monetização agressiva", "Ocupam espaço", "São lentos"],
        correctAnswer: 1,
        explanation: "Jogos 'gratuitos' usam monetização agressiva, criando dependência emocional antes de extrair dinheiro."
      }
    ]
  },
  {
    day: 3,
    theme: "Combatendo Vertigo - Batalha 3: Fragmentação da Atenção",
    questions: [
      {
        id: 1,
        question: "O que é 'task switching'?",
        options: ["Mudar de app", "Alternar entre tarefas", "Usar dois celulares", "Trocar de celular"],
        correctAnswer: 1,
        explanation: "Task switching é alternar constantemente entre tarefas, causando fadiga mental e reduzindo produtividade drasticamente."
      },
      {
        id: 2,
        question: "Quanto tempo leva para recuperar foco após distração?",
        options: ["5 segundos", "23 minutos", "1 minuto", "10 segundos"],
        correctAnswer: 1,
        explanation: "Pesquisas mostram que leva em média 23 minutos para recuperar foco total após uma interrupção ou distração."
      },
      {
        id: 3,
        question: "O que é 'attention residue'?",
        options: ["Memória", "Parte da atenção fica na tarefa anterior", "Cansaço", "Concentração"],
        correctAnswer: 1,
        explanation: "Attention residue é quando parte da nossa atenção permanece 'grudada' na tarefa anterior, reduzindo performance."
      },
      {
        id: 4,
        question: "Como multitasking afeta o cérebro?",
        options: ["Melhora", "Diminui QI temporariamente", "Não afeta", "Aumenta velocidade"],
        correctAnswer: 1,
        explanation: "Multitasking pode diminuir temporariamente o QI mais do que fumar maconha, segundo estudos científicos."
      }
    ]
  },
  {
    day: 4,
    theme: "Combatendo Vertigo - Batalha 4: Vício Digital",
    questions: [
      {
        id: 1,
        question: "Qual neurotransmissor está envolvido no vício digital?",
        options: ["Serotonina", "Dopamina", "GABA", "Acetilcolina"],
        correctAnswer: 1,
        explanation: "Dopamina é o neurotransmissor central no vício digital, criando ciclos de busca e recompensa que mantêm o comportamento."
      },
      {
        id: 2,
        question: "O que é 'nomofobia'?",
        options: ["Medo de números", "Medo de ficar sem celular", "Medo de wifi", "Medo de apps"],
        correctAnswer: 1,
        explanation: "Nomofobia é o medo irracional de ficar sem celular ou desconectado, um sinal claro de dependência digital."
      },
      {
        id: 3,
        question: "Como o vício digital afeta o sono?",
        options: ["Melhora", "Luz azul suprime melatonina", "Não afeta", "Induz sono"],
        correctAnswer: 1,
        explanation: "Luz azul das telas suprime produção de melatonina, atrasando o sono e reduzindo sua qualidade."
      },
      {
        id: 4,
        question: "Qual o impacto no relacionamentos?",
        options: ["Melhora comunicação", "Reduz conexão face-a-face", "Aumenta intimidade", "Não afeta"],
        correctAnswer: 1,
        explanation: "Uso excessivo de dispositivos reduz qualidade das interações face-a-face e conexão emocional real."
      }
    ]
  },
  {
    day: 5,
    theme: "Combatendo Vertigo - Batalha 5: Distração e Produtividade",
    questions: [
      {
        id: 1,
        question: "O que é 'deep work'?",
        options: ["Trabalhar muito", "Foco profundo sem distração", "Trabalhar de madrugada", "Trabalhar sozinho"],
        correctAnswer: 1,
        explanation: "Deep work é a capacidade de focar sem distração em tarefas cognitivamente exigentes - habilidade cada vez mais rara."
      },
      {
        id: 2,
        question: "Como dispositivos afetam capacidade de concentração?",
        options: ["Melhoram", "Reduzem span de atenção", "Não afetam", "Aumentam foco"],
        correctAnswer: 1,
        explanation: "Uso excessivo de dispositivos está reduzindo nossa capacidade natural de atenção sustentada e foco profundo."
      },
      {
        id: 3,
        question: "O que é 'context switching cost'?",
        options: ["Preço de apps", "Energia gasta mudando foco", "Custo de internet", "Tempo de carregamento"],
        correctAnswer: 1,
        explanation: "Context switching cost é a energia mental perdida toda vez que mudamos foco entre diferentes tarefas ou apps."
      },
      {
        id: 4,
        question: "Qual estratégia é mais eficaz contra distração digital?",
        options: ["Força de vontade", "Design do ambiente", "Trabalhar mais rápido", "Ignorar distrações"],
        correctAnswer: 1,
        explanation: "Modificar o ambiente (remover distrações físicas) é mais eficaz que depender apenas da força de vontade."
      }
    ]
  },
  {
    day: 6,
    theme: "Combatendo Vertigo - Batalha 6: Detox Digital",
    questions: [
      {
        id: 1,
        question: "O que é um 'digital detox'?",
        options: ["Limpar o celular", "Período sem dispositivos", "Atualizar apps", "Trocar de celular"],
        correctAnswer: 1,
        explanation: "Digital detox é um período deliberado sem usar dispositivos digitais para restaurar saúde mental e foco."
      },
      {
        id: 2,
        question: "Qual o primeiro passo para reduzir uso?",
        options: ["Jogar o celular fora", "Medir tempo atual de uso", "Comprar outro celular", "Usar mais"],
        correctAnswer: 1,
        explanation: "Antes de reduzir, é essencial medir seu uso atual - a maioria subestima drasticamente seu tempo de tela."
      },
      {
        id: 3,
        question: "Como criar 'friction' saudável?",
        options: ["Quebrar o celular", "Remover apps da tela inicial", "Usar celular quebrado", "Não carregar"],
        correctAnswer: 1,
        explanation: "Criar friction (atrito) removendo apps da tela inicial ou usando senhas complexas reduz uso impulsivo."
      },
      {
        id: 4,
        question: "Qual substituto saudável para scrolling?",
        options: ["Assistir TV", "Leitura ou caminhada", "Jogos no PC", "Comer"],
        correctAnswer: 1,
        explanation: "Atividades offline como leitura, caminhada ou hobbies manuais são substitutos saudáveis para scrolling compulsivo."
      }
    ]
  },
  {
    day: 7,
    theme: "Combatendo Vertigo - Batalha Final: Uso Intencional",
    questions: [
      {
        id: 1,
        question: "O que é 'uso intencional' de tecnologia?",
        options: ["Usar menos", "Usar com propósito específico", "Usar o melhor app", "Usar rápido"],
        correctAnswer: 1,
        explanation: "Uso intencional significa usar tecnologia com propósito específico e consciência, não por impulso ou tédio."
      },
      {
        id: 2,
        question: "Como implementar 'time boxing' digital?",
        options: ["Comprar cronômetro", "Definir horários específicos", "Usar timer de cozinha", "Trabalhar em caixas"],
        correctAnswer: 1,
        explanation: "Time boxing define janelas específicas para uso digital, criando boundaries claros entre trabalho focado e consumo."
      },
      {
        id: 3,
        question: "Qual o papel do 'mono-tasking'?",
        options: ["Fazer uma coisa", "Fazer uma tarefa por vez completamente", "Usar um app", "Trabalhar sozinho"],
        correctAnswer: 1,
        explanation: "Mono-tasking é fazer uma tarefa por vez com atenção completa, oposto do multitasking fragmentado."
      },
      {
        id: 4,
        question: "Como manter mudanças a longo prazo?",
        options: ["Força de vontade", "Sistemas e hábitos consistentes", "Motivação constante", "Pressão social"],
        correctAnswer: 1,
        explanation: "Mudanças duradouras vêm de sistemas e hábitos consistentes, não de motivação temporária ou força de vontade."
      }
    ]
  }
];

const shadows: Shadow[] = [
  {
    id: 'sloth',
    name: 'SLOTH',
    description: 'Procrastinação',
    icon: '🦥',
    color: 'orange',
    enabled: true,
    battles: slothBattles
  },
  {
    id: 'vertigo',
    name: 'VERTIGO',
    description: 'Vício em tecnologia/Doom scrolling',
    icon: '📱',
    color: 'purple',
    enabled: true,
    battles: vertigoBattles
  },
  {
    id: 'direction',
    name: 'DIRECTION',
    description: 'Falta de Direção',
    icon: '🧭',
    color: 'blue',
    enabled: false,
    battles: []
  },
  {
    id: 'distraction',
    name: 'DISTRACTION',
    description: 'Distração',
    icon: '💭',
    color: 'yellow',
    enabled: false,
    battles: []
  },
  {
    id: 'discipline',
    name: 'DISCIPLINE',
    description: 'Falta de Disciplina',
    icon: '⚖️',
    color: 'red',
    enabled: false,
    battles: []
  },
  {
    id: 'motivation',
    name: 'MOTIVATION',
    description: 'Falta de Motivação',
    icon: '🔥',
    color: 'pink',
    enabled: false,
    battles: []
  },
  {
    id: 'organization',
    name: 'ORGANIZATION',
    description: 'Falta de Organização',
    icon: '📋',
    color: 'green',
    enabled: false,
    battles: []
  },
  {
    id: 'confidence',
    name: 'CONFIDENCE',
    description: 'Falta de Autoconfiança/Autoeficácia',
    icon: '💪',
    color: 'indigo',
    enabled: false,
    battles: []
  }
];

const CavernaDoDesafio: React.FC = () => {
  const navigate = useNavigate();
  const [selectedShadow, setSelectedShadow] = useState<Shadow | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'action' | 'treasure' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [actionTimer, setActionTimer] = useState(10);
  const [shadowProgress, setShadowProgress] = useState<Record<string, number>>({});
  const [capturedShadows, setCapturedShadows] = useState<Set<string>>(new Set());
  const [treasureResult, setTreasureResult] = useState<'potion' | 'poison' | null>(null);
  const [livesGained, setLivesGained] = useState(1);

  const currentBattle = selectedShadow?.battles.find(b => b.day === currentDay);
  const currentQuestion = currentBattle?.questions[currentQuestionIndex];

  useEffect(() => {
    const savedProgress = localStorage.getItem('shadowProgress');
    const savedCaptured = localStorage.getItem('capturedShadows');
    
    if (savedProgress) {
      setShadowProgress(JSON.parse(savedProgress));
    }
    if (savedCaptured) {
      setCapturedShadows(new Set(JSON.parse(savedCaptured)));
    }
  }, []);

  const saveProgress = (progress: Record<string, number>, captured: Set<string>) => {
    localStorage.setItem('shadowProgress', JSON.stringify(progress));
    localStorage.setItem('capturedShadows', JSON.stringify(Array.from(captured)));
  };

  const startBattle = (shadow: Shadow, day: number) => {
    setSelectedShadow(shadow);
    setCurrentDay(day);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTreasureResult(null);
    setLivesGained(1);
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
          
          const correctAnswers = answers.filter((answer, index) => 
            answer === currentBattle?.questions[index].correctAnswer
          ).length;
          const score = (correctAnswers / 4) * 100;
          
          if (score >= 80) {
            setGameState('treasure');
            openTreasureChest();
          } else {
            setGameState('result');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const openTreasureChest = () => {
    const isPotion = Math.random() < 0.5;
    setTreasureResult(isPotion ? 'potion' : 'poison');
    setLivesGained(isPotion ? 2 : 0);
    
    setTimeout(() => {
      completeBattle();
    }, 3000);
  };

  const completeBattle = () => {
    if (!selectedShadow) return;
    
    const correctAnswers = answers.filter((answer, index) => 
      answer === currentBattle?.questions[index].correctAnswer
    ).length;
    const score = (correctAnswers / 4) * 100;
    
    if (score >= 80) {
      const newProgress = { ...shadowProgress };
      const shadowId = selectedShadow.id;
      
      if (treasureResult === 'potion') {
        newProgress[shadowId] = (newProgress[shadowId] || 0) + 2;
      } else if (treasureResult === 'poison') {
        newProgress[shadowId] = newProgress[shadowId] || 0;
      } else {
        newProgress[shadowId] = (newProgress[shadowId] || 0) + 1;
      }
      
      const newCaptured = new Set(capturedShadows);
      if (newProgress[shadowId] >= 7) {
        newCaptured.add(shadowId);
      }
      
      setShadowProgress(newProgress);
      setCapturedShadows(newCaptured);
      saveProgress(newProgress, newCaptured);
      
      const habitData = {
        id: 'combat-shadows',
        name: 'Combater as Sombras',
        icon: '⚔️',
        color: 'bg-red-500',
        autoTrack: true,
        completed: true,
        completedAt: new Date().toISOString()
      };
      
      const existingHabits = JSON.parse(localStorage.getItem('userHabits') || '[]');
      const habitIndex = existingHabits.findIndex((h: any) => h.id === 'combat-shadows');
      
      if (habitIndex >= 0) {
        existingHabits[habitIndex] = { ...existingHabits[habitIndex], ...habitData };
      } else {
        existingHabits.push(habitData);
      }
      
      localStorage.setItem('userHabits', JSON.stringify(existingHabits));
      localStorage.setItem('questHabitCompleted', 'true');
      localStorage.setItem('cavernaChallengeCompleted', 'true');
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

  const isBattleEnabled = (shadow: Shadow, day: number) => {
    if (!shadow.enabled) return false;
    if (day === 1) return true;
    const progress = shadowProgress[shadow.id] || 0;
    return progress >= day - 1;
  };

  const getShadowColorClasses = (color: string, enabled: boolean, captured: boolean) => {
    if (captured) return `bg-green-500/20 border-green-500 text-green-700`;
    if (!enabled) return `bg-gray-500/10 border-gray-300 text-gray-500`;
    
    const colorMap: Record<string, string> = {
      orange: 'bg-orange-500/20 border-orange-500 text-orange-700',
      purple: 'bg-purple-500/20 border-purple-500 text-purple-700',
      blue: 'bg-blue-500/20 border-blue-500 text-blue-700',
      yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-700',
      red: 'bg-red-500/20 border-red-500 text-red-700',
      pink: 'bg-pink-500/20 border-pink-500 text-pink-700',
      green: 'bg-green-500/20 border-green-500 text-green-700',
      indigo: 'bg-indigo-500/20 border-indigo-500 text-indigo-700'
    };
    return colorMap[color] || 'bg-gray-500/20 border-gray-500 text-gray-700';
  };

  useEffect(() => {
    if (gameState === 'result') {
      const timer = setTimeout(() => {
        setGameState('intro');
        setSelectedShadow(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

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
                {selectedShadow?.id === 'sloth' 
                  ? 'Agora é hora da ação! Trabalhe focado por 10 minutos para vencer SLOTH.'
                  : 'Agora é hora da ação! Fique sem usar o celular por 10 minutos para vencer VERTIGO.'
                }
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
                {selectedShadow?.id === 'sloth' 
                  ? 'Concentre-se em uma tarefa importante. SLOTH está observando...'
                  : 'Mantenha o celular longe e resista à tentação. VERTIGO está testando você...'
                }
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

  if (gameState === 'treasure') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-yellow-500/10 p-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-yellow-400 bg-yellow-50/50">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <Gift className="w-8 h-8 text-yellow-600" />
                Baú do Tesouro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-8xl animate-bounce">
                📦
              </div>
              
              <p className="text-lg text-muted-foreground">
                Você venceu a batalha! Um baú misterioso apareceu...
              </p>
              
              {treasureResult && (
                <div className="space-y-4">
                  <div className="text-6xl">
                    {treasureResult === 'potion' ? '🧪' : '☠️'}
                  </div>
                  
                  <div className={`p-6 rounded-lg border-2 ${
                    treasureResult === 'potion' 
                      ? 'bg-green-50 border-green-300 text-green-800' 
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}>
                    <h3 className="text-2xl font-bold mb-2">
                      {treasureResult === 'potion' ? '🎉 Poção da Vitória!' : '💀 Veneno Sombrio!'}
                    </h3>
                    <p className="text-lg">
                      {treasureResult === 'potion' 
                        ? `Incrível! A poção dobrou sua recompensa - você ganhou ${livesGained} vidas!`
                        : 'Oh não! O veneno anulou sua vitória - a sombra recuperou sua vida perdida!'
                      }
                    </p>
                  </div>
                </div>
              )}
              
              <div className="text-sm text-muted-foreground">
                Processando resultado...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const score = calculateScore();
    const won = score >= 80;
    const livesDefeated = shadowProgress[selectedShadow?.id || ''] || 0;
    const shadowCaptured = capturedShadows.has(selectedShadow?.id || '');
    
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
                {selectedShadow?.icon}
                {won ? '⚔️' : ''}
              </div>
              
              <div>
                <p className="text-2xl font-bold text-primary mb-2">
                  {score.toFixed(0)}%
                </p>
                <p className="text-muted-foreground mb-4">
                  {won 
                    ? treasureResult === 'poison' 
                      ? 'O veneno anulou sua vitória! A sombra mantém sua vida...'
                      : treasureResult === 'potion'
                        ? 'A poção dobrou sua recompensa! Você ganhou 2 vidas da sombra!'
                        : 'Você derrotou uma vida de ' + selectedShadow?.name + '!'
                    : `Você não venceu desta vez. Tente novamente!`
                  }
                </p>
                
                {won && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      treasureResult === 'poison' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <p className={`font-semibold ${
                        treasureResult === 'poison' ? 'text-red-800' : 'text-green-800'
                      }`}>
                        {treasureResult === 'poison' 
                          ? '☠️ Veneno detectado! A sombra se regenera!' 
                          : treasureResult === 'potion'
                            ? `🧪 Poção mágica! 2 vidas derrotadas (${livesDefeated}/7)`
                            : `💚 1 vida derrotada (${livesDefeated}/7)`
                        }
                      </p>
                      {treasureResult === 'poison' ? (
                        <p className="text-red-700 text-sm mt-1">
                          ⚔️ A vida da sombra continua ativa. Você precisará lutar novamente!
                        </p>
                      ) : (
                        <>
                          {shadowCaptured ? (
                            <p className="text-green-700 text-sm mt-1">
                              🎉 {selectedShadow?.name} foi completamente capturada!
                            </p>
                          ) : (
                            <p className="text-green-700 text-sm mt-1">
                              Ainda restam {7 - livesDefeated} vidas para capturar {selectedShadow?.name}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-blue-800 font-semibold">
                        ⚔️ Hábito "Combater as Sombras" marcado automaticamente
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Voltando ao menu principal em alguns segundos...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-destructive/5 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/caverna-dashboard')}
            className="mb-4"
          >
            ← Voltar ao Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            ⚔️ Caverna das Sombras
          </h1>
          <p className="text-muted-foreground text-lg">
            Enfrente as 8 sombras que impedem seu crescimento
          </p>
        </div>

        {/* Grid de Sombras */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {shadows.map((shadow) => {
            const progress = shadowProgress[shadow.id] || 0;
            const captured = capturedShadows.has(shadow.id);
            
            return (
              <Card 
                key={shadow.id}
                className={`relative transition-all ${getShadowColorClasses(shadow.color, shadow.enabled, captured)} ${
                  shadow.enabled ? 'cursor-pointer hover:scale-105' : ''
                }`}
                onClick={() => shadow.enabled && setSelectedShadow(shadow)}
              >
                <CardContent className="p-4 text-center">
                  {!shadow.enabled && (
                    <div className="absolute inset-0 bg-gray-500/20 rounded-lg flex items-center justify-center">
                      <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="text-3xl mb-2 relative">
                    {shadow.icon}
                    {captured && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-sm mb-1">{shadow.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{shadow.description}</p>
                  
                  {shadow.enabled && (
                    <div className="space-y-1">
                      <div className="flex justify-center">
                        <Badge variant="outline" className="text-xs">
                          {progress}/7 vidas
                        </Badge>
                      </div>
                      {progress > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-current rounded-full h-1 transition-all"
                            style={{ width: `${(progress / 7) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Coleção de Sombras Capturadas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Coleção de Sombras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {shadows.map((shadow) => {
                const captured = capturedShadows.has(shadow.id);
                
                return (
                  <div 
                    key={shadow.id}
                    className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-bold transition-all ${
                      captured 
                        ? 'bg-green-100 border-green-400 text-green-800 shadow-md' 
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                  >
                    <div className="text-lg mb-1">{shadow.icon}</div>
                    <div className="text-center leading-tight">
                      {captured ? (
                        <>
                          <div className="text-green-600 font-bold">✓</div>
                          <div>Capturada</div>
                        </>
                      ) : (
                        <div>Solta</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {capturedShadows.size}/8 sombras capturadas
              </p>
              {capturedShadows.size === 8 && (
                <p className="text-sm font-bold text-green-600 mt-2">
                  🎉 Parabéns! Você dominou todas as suas sombras!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detalhes da Sombra Selecionada */}
        {selectedShadow && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="text-3xl">{selectedShadow.icon}</div>
                <div>
                  <h2 className="text-2xl">{selectedShadow.name}</h2>
                  <p className="text-muted-foreground text-base">{selectedShadow.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Progresso:</span>
                  <Badge variant="outline">
                    {shadowProgress[selectedShadow.id] || 0}/7 vidas derrotadas
                  </Badge>
                </div>
                <Progress 
                  value={((shadowProgress[selectedShadow.id] || 0) / 7) * 100} 
                  className="h-3"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {Array.from({ length: 7 }, (_, i) => i + 1).map(day => {
                  const enabled = isBattleEnabled(selectedShadow, day);
                  const completed = (shadowProgress[selectedShadow.id] || 0) >= day;
                  
                  return (
                    <Card 
                      key={day}
                      className={`relative transition-all ${
                        completed 
                          ? 'bg-green-100 border-green-400' 
                          : enabled 
                            ? `${getShadowColorClasses(selectedShadow.color, true, false)} cursor-pointer hover:scale-105`
                            : 'bg-gray-100 border-gray-300'
                      }`}
                      onClick={() => enabled && !completed && startBattle(selectedShadow, day)}
                    >
                      <CardContent className="p-3 text-center">
                        {!enabled && !completed && (
                          <div className="absolute inset-0 bg-gray-500/50 rounded-lg flex items-center justify-center">
                            <Lock className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        
                        <div className="font-bold text-lg mb-1">
                          {completed ? '✓' : day}
                        </div>
                        <div className="text-xs">
                          Batalha {day}
                        </div>
                        
                        {enabled && !completed && (
                          <Button 
                            size="sm" 
                            className="mt-2 text-xs px-2 py-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              startBattle(selectedShadow, day);
                            }}
                          >
                            <Sword className="w-3 h-3 mr-1" />
                            Lutar
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="mt-6 bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Como funciona:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cada sombra possui 7 vidas (batalhas)</li>
                  <li>• Responda 4 perguntas e complete uma ação prática</li>
                  <li>• Obtenha 80%+ de acertos para derrotar uma vida</li>
                  <li>• Derrote todas as 7 vidas para capturar a sombra</li>
                  <li>• As batalhas se desbloqueiam conforme você progride</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CavernaDoDesafio;
