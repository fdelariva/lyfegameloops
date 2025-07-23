import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { CheckCircle, User, Plus, Check, X } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import HabitCard from "@/components/HabitCard";
import LuckyCards from "@/components/LuckyCards";
import AvatarPreview from "@/components/AvatarPreview";
import LevelUpAnimation from "@/components/LevelUpAnimation";

import EvolutionAnimation from "@/components/EvolutionAnimation";
import AskTheOracle from "@/components/AskTheOracle";
import { useNavigate } from "react-router-dom";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import DashboardHabitCard from "@/components/DashboardHabitCard";

interface Habit {
  id: string;
  title: string;
  description: string;
  energyBoost: number;
  skillBoost: number;
  connectionBoost: number;
  completed: boolean;
  info?: {
    whyDo: string;
    howDo: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { playSound } = useSoundEffects();
  
  const [avatar, setAvatar] = useState({
    level: 1,
    archetype: "Guerreiro" as "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido",
    energy: 25,
    connection: 20,
    skill: 15,
  });
  
  // Load habits from onboarding or use defaults
  const [habits, setHabits] = useState<Habit[]>([]);
  const [customHabit, setCustomHabit] = useState("");
  const [showCustomHabitInput, setShowCustomHabitInput] = useState(false);
  
  const [showLuckyCards, setShowLuckyCards] = useState(false);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [completedHabitCount, setCompletedHabitCount] = useState(0);
  const [dayZeroBoost, setDayZeroBoost] = useState(true);
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);
  const [showEvolutionAnimation, setShowEvolutionAnimation] = useState(false);
  const [evolutionFromLevel, setEvolutionFromLevel] = useState(1);
  const [evolutionToLevel, setEvolutionToLevel] = useState(2);
  const [showOracle, setShowOracle] = useState(false);

  // Load user's selected habits from onboarding
  useEffect(() => {
    // Default habits available for selection with detailed info
    const defaultHabits = [
      {
        id: "h1",
        title: "Arrumar sua cama",
        description: "Organizar e arrumar a cama ao acordar",
        energyBoost: 5,
        skillBoost: 0,
        connectionBoost: 5,
        completed: false,
        info: {
          whyDo: "Acordar cedo regula o ritmo circadiano, melhora a qualidade do sono e aumenta a produtividade ao longo do dia. Estudos mostram que pessoas matutinas têm menos stress e melhor humor.",
          howDo: "Coloque o despertador longe da cama, abra as cortinas imediatamente ao acordar para exposição à luz natural, e evite o botão soneca. Mantenha um horário consistente mesmo nos fins de semana."
        }
      },
      {
        id: "h2",
        title: "Escovar os dentes",
        description: "Cuidar da higiene bucal",
        energyBoost: 0,
        skillBoost: 5,
        connectionBoost: 0,
        completed: false,
        info: {
          whyDo: "A escovação remove 99% das bactérias da boca, previne cáries, gengivite e doenças cardíacas. Bactérias orais podem entrar na corrente sanguínea e afetar o coração.",
          howDo: "Escove por 2 minutos com movimentos circulares suaves, use pasta com flúor, escove a língua e troque a escova a cada 3 meses. Escove 30-60 minutos após as refeições."
        }
      },
      {
        id: "h3",
        title: "Lavar meu rosto pela manhã",
        description: "Refrescar o rosto ao acordar",
        energyBoost: 5,
        skillBoost: 0,
        connectionBoost: 0,
        completed: false,
        info: {
          whyDo: "Lavar o rosto remove oleosidade, células mortas e resíduos acumulados durante a noite, prevenindo acne e mantendo a pele saudável. Também ativa a circulação e desperta o corpo.",
          howDo: "Use água morna, aplique um sabonete neutro ou específico para seu tipo de pele, massageie suavemente em movimentos circulares por 30 segundos e enxágue bem."
        }
      },
      {
        id: "h4",
        title: "Levantar da cadeira e fazer 1 alongamento",
        description: "Movimentar o corpo durante o dia",
        energyBoost: 8,
        skillBoost: 2,
        connectionBoost: 0,
        completed: false,
        info: {
          whyDo: "Ficar sentado por longos períodos reduz o metabolismo em 90%, aumenta o risco de diabetes e problemas cardiovasculares. Alongar melhora a circulação e previne dores musculares.",
          howDo: "A cada hora, levante-se e faça um alongamento simples como elevar os braços, rotacionar o pescoço ou alongar as pernas. Mantenha por 15-30 segundos respirando profundamente."
        }
      },
      {
        id: "h5",
        title: "Fazer algo que me faz feliz",
        description: "Dedicar tempo para atividades prazerosas",
        energyBoost: 0,
        skillBoost: 0,
        connectionBoost: 10,
        completed: false,
        info: {
          whyDo: "Atividades prazerosas liberam dopamina e serotonina, neurotransmissores que melhoram o humor, reduzem stress e fortalecem o sistema imunológico. É essencial para a saúde mental.",
          howDo: "Reserve 10-15 minutos para algo que genuinamente te dá prazer: ouvir música, desenhar, conversar com um amigo, ou qualquer hobby. O importante é estar presente no momento."
        }
      },
      {
        id: "h6",
        title: "Fazer 3 respirações profundas",
        description: "Relaxar com exercícios de respiração",
        energyBoost: 0,
        skillBoost: 5,
        connectionBoost: 5,
        completed: false,
        info: {
          whyDo: "A respiração profunda ativa o sistema nervoso parassimpático, reduzindo cortisol (hormônio do stress) em até 25% e diminuindo a pressão arterial e frequência cardíaca.",
          howDo: "Inspire lentamente pelo nariz por 4 segundos, segure por 4 segundos, expire pela boca por 6 segundos. Repita 3 vezes. Foque apenas na respiração durante o exercício."
        }
      },
      {
        id: "h7",
        title: "Beber 1 copo de água",
        description: "Manter-se hidratado",
        energyBoost: 5,
        skillBoost: 0,
        connectionBoost: 0,
        completed: false,
        info: {
          whyDo: "O corpo é 60% água e perde 2-3 litros por dia. Desidratação de apenas 2% reduz performance física e mental, causa fadiga e dores de cabeça. Água melhora concentração e humor.",
          howDo: "Beba um copo de 250ml de água pura, preferencialmente em temperatura ambiente. Mantenha uma garrafa visível como lembrete e distribua a ingestão ao longo do dia."
        }
      }
    ];

    // Try to get selected habits from localStorage (set during onboarding)
    try {
      const savedHabits = localStorage.getItem('selectedHabits');
      const savedCustomHabits = localStorage.getItem('customHabits');
      
      if (savedHabits) {
        const selectedHabitIds = JSON.parse(savedHabits);
        const customHabits = savedCustomHabits ? JSON.parse(savedCustomHabits) : [];
        
        console.log('Dashboard: Loading habits with custom habits:', customHabits);
        
        // Filter default habits based on selection and add custom habits
        const userHabits = [
          ...defaultHabits.filter(habit => selectedHabitIds.includes(habit.id)),
          ...customHabits.map((customHabit: any, index: number) => {
            const isCavernaHabit = (customHabit.name || customHabit) === "Aprender sobre desenvolvimento pessoal";
            // Check if caverna habit was completed this session
            const cavernaCompleted = localStorage.getItem('cavernaHabitCompleted') === 'true';
            
            console.log('Processing habit:', customHabit, 'isCavernaHabit:', isCavernaHabit, 'cavernaCompleted:', cavernaCompleted);
            
            return {
              id: isCavernaHabit ? 'caverna-aprendizado' : `custom-${index}`,
              title: customHabit.name || customHabit,
              description: isCavernaHabit ? "Hábito auto-tracked" : "Hábito personalizado",
              energyBoost: 5,
              skillBoost: 5,
              connectionBoost: 5,
              completed: isCavernaHabit ? cavernaCompleted : false,
              isAutoTracked: isCavernaHabit,
              info: {
                whyDo: isCavernaHabit ? 
                  "Este hábito é completado automaticamente quando você finaliza uma lição na Caverna da Sabedoria. Acompanhe sua jornada de 7 dias de desenvolvimento pessoal." : 
                  "Este é um hábito personalizado criado por você. Hábitos consistentes são a base para mudanças duradouras e desenvolvimento pessoal.",
                howDo: isCavernaHabit ? 
                  "Vá até a Caverna da Sabedoria e complete o desafio do dia. Este hábito será marcado automaticamente quando você terminar a lição." : 
                  "Execute este hábito de forma consistente, prestando atenção aos benefícios que ele traz para sua vida. A regularidade é mais importante que a perfeição."
              }
            };
          })
        ];
        
        // Clear the caverna completion flag after processing
        const cavernaCompletedFlag = localStorage.getItem('cavernaHabitCompleted') === 'true';
        console.log('Dashboard: Caverna completion flag before clear:', cavernaCompletedFlag);
        if (cavernaCompletedFlag) {
          localStorage.removeItem('cavernaHabitCompleted');
          console.log('Dashboard: Cleared caverna completion flag');
        }
        
        setHabits(userHabits);
      } else {
        // If no saved habits, show empty state - user needs to go through onboarding
        setHabits([]);
      }
    } catch (error) {
      console.log("Error loading saved habits:", error);
      // Show empty state on error
      setHabits([]);
    }
  }, []);

  // Simula o efeito de uma notificação agendada
  useEffect(() => {
    const timer = setTimeout(() => {
      toast("Seu avatar precisa de você!", {
        description: "Complete seu próximo hábito para continuar evoluindo!",
      });
    }, 30000); // 30 segundos após entrar no dashboard
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddCustomHabit = () => {
    if (customHabit.trim()) {
      const newHabit = {
        id: `custom-${Date.now()}`,
        title: customHabit.trim(),
        description: "Hábito personalizado",
        energyBoost: 5,
        skillBoost: 5,
        connectionBoost: 5,
        completed: false,
        info: {
          whyDo: "Este é um hábito personalizado criado por você. Hábitos consistentes são a base para mudanças duradouras e desenvolvimento pessoal.",
          howDo: "Execute este hábito de forma consistente, prestando atenção aos benefícios que ele traz para sua vida. A regularidade é mais importante que a perfeição."
        }
      };
      setHabits([...habits, newHabit]);
      setCustomHabit("");
      setShowCustomHabitInput(false);
      toast.success("Hábito customizado adicionado!");
    }
  };

  const handleHabitComplete = (habitId: string) => {
    // Play habit completion sound
    playSound('habit');
    
    // Atualiza o estado dos hábitos
    const updatedHabits = habits.map(habit => 
      habit.id === habitId ? { ...habit, completed: true } : habit
    );
    setHabits(updatedHabits);
    
    // Encontra o hábito que foi completado
    const completedHabit = habits.find(h => h.id === habitId);
    if (!completedHabit) return;
    
    // Atualiza o contador de hábitos completados
    const newCount = completedHabitCount + 1;
    setCompletedHabitCount(newCount);
    
    // Aplica o boost do Dia 0 se estiver ativado
    const multiplier = dayZeroBoost ? 2 : 1;
    
    // Atualiza as características do avatar
    setAvatar(prev => ({
      ...prev,
      energy: prev.energy + (completedHabit.energyBoost * multiplier),
      skill: prev.skill + (completedHabit.skillBoost * multiplier),
      connection: prev.connection + (completedHabit.connectionBoost * multiplier)
    }));
    
    // Check for level up
    const totalPoints = avatar.energy + avatar.skill + avatar.connection + 
                        (completedHabit.energyBoost + completedHabit.skillBoost + completedHabit.connectionBoost) * multiplier;
    
    if (totalPoints >= 75 && avatar.level === 1) {
      setTimeout(() => {
        playSound('levelup');
        setEvolutionFromLevel(1);
        setEvolutionToLevel(2);
        setShowEvolutionAnimation(true);
        setAvatar(prev => ({ ...prev, level: 2 }));
      }, 1500);
    } else {
      // Show lucky cards and avatar preview only if no level up
      if (newCount === 1) {
        setTimeout(() => {
          setShowLuckyCards(true);
        }, 1000);
      }
      
      if (newCount === 2) {
        setTimeout(() => {
          setShowAvatarPreview(true);
        }, 1000);
      }
    }
  };

  const handleEvolutionClose = () => {
    setShowEvolutionAnimation(false);
    
    // Show lucky cards and avatar preview after evolution animation closes
    const newCount = completedHabitCount;
    if (newCount >= 1 && !showLuckyCards) {
      setTimeout(() => {
        setShowLuckyCards(true);
      }, 500);
    }
  };

  const handleLevelUpClose = () => {
    setShowLevelUpAnimation(false);
    
    // Show lucky cards and avatar preview after level up animation closes
    const newCount = completedHabitCount;
    if (newCount >= 1 && !showLuckyCards) {
      setTimeout(() => {
        setShowLuckyCards(true);
      }, 500);
    }
  };

  const handleDailyChallengeComplete = () => {
    if (dailyChallengeCompleted) return;
    
    setDailyChallengeCompleted(true);
    toast.success("Desafio concluído!");
  };

  // Calcula o progresso diário
  const calculateDailyProgress = () => {
    const completed = habits.filter(h => h.completed).length;
    const total = habits.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // Show message if no habits are configured
  if (habits.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-6 max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Lyfe</h1>
            <Button size="sm" variant="outline">
              <User className="h-4 w-4" />
            </Button>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Nenhum hábito configurado</h2>
              <p className="text-muted-foreground mb-6">
                Você precisa configurar seus hábitos primeiro para começar sua jornada.
              </p>
              <Button onClick={() => navigate("/onboarding")}>
                Configurar Hábitos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleOracleAddHabit = (habitName: string) => {
    console.log("Oracle adding habit:", habitName);
    const newHabit = {
      id: `oracle-${Date.now()}`,
      title: habitName,
      description: "Sugestão do Oráculo dos Hábitos",
      energyBoost: 5,
      skillBoost: 5,
      connectionBoost: 5,
      completed: false,
      info: {
        whyDo: "Este é um hábito sugerido pelo Oráculo dos Hábitos. Hábitos consistentes são a base para mudanças duradouras e desenvolvimento pessoal.",
        howDo: "Execute este hábito de forma consistente, prestando atenção aos benefícios que ele traz para sua vida. A regularidade é mais importante que a perfeição."
      }
    };
    setHabits([...habits, newHabit]);
    toast.success("Sugestão do Oráculo adicionada!");
  };

  const handleOracleOpen = () => {
    console.log("Opening Oracle");
    setShowOracle(true);
  };

  const handleOracleClose = () => {
    console.log("Closing Oracle");
    setShowOracle(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lyfe</h1>
          <Button size="sm" variant="outline">
            <User className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Boost do Dia 0 Alert */}
        {dayZeroBoost && (
          <Card className="bg-primary text-primary-foreground mb-6">
            <CardContent className="py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">BÔNUS DO DIA 0!</h3>
                <p className="text-sm">+200% em todas as recompensas hoje!</p>
              </div>
              <Badge className="bg-white text-primary animate-pulse">
                Ativo
              </Badge>
            </CardContent>
          </Card>
        )}
        
        {/* Avatar & Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Seu Avatar</CardTitle>
            </CardHeader>
            <CardContent>
              <UserAvatar 
                level={avatar.level} 
                archetype={avatar.archetype}
                energy={avatar.energy}
                connection={avatar.connection}
                skill={avatar.skill}
              />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Progresso Diário</CardTitle>
              <CardDescription>
                Acompanhe sua evolução
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso de Hoje</span>
                    <span>{calculateDailyProgress()}%</span>
                  </div>
                  <Progress value={calculateDailyProgress()} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{avatar.level}</div>
                    <div className="text-xs text-muted-foreground">Nível</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-xs text-muted-foreground">Dia</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{completedHabitCount}</div>
                    <div className="text-xs text-muted-foreground">Hábitos</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-xs text-muted-foreground">Streak</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Habits Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            Hábitos de Hoje <Badge className="ml-2 bg-primary/30">{habits.length}</Badge>
          </h2>
        </div>

        {/* Add Habit Section */}
        <div className="mb-6">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomHabitInput(true)}
              className="flex items-center gap-2 w-full"
            >
              <Plus className="h-4 w-4" />
              Adicionar Hábito Customizado
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOracleOpen}
              className="flex items-center gap-2 w-full"
            >
              <div className="w-4 h-4">
                <img 
                  src="/lovable-uploads/d43b4096-ba1e-404a-9b10-1e22c3ac310a.png" 
                  alt="Oráculo Aristos"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              Perguntar ao Oráculo Aristos
            </Button>
          </div>

          {showCustomHabitInput && (
            <Card className="mt-4 border-primary bg-primary/5">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite seu hábito personalizado..."
                    value={customHabit}
                    onChange={(e) => setCustomHabit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomHabit()}
                  />
                  <Button
                    size="sm"
                    onClick={handleAddCustomHabit}
                    disabled={!customHabit.trim()}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowCustomHabitInput(false);
                      setCustomHabit("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {habits.map(habit => (
            <div key={habit.id}>
              {(habit as any).isAutoTracked && (
                <div className="text-xs text-muted-foreground mb-1 pl-1">
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                    auto track
                  </Badge>
                </div>
              )}
              <DashboardHabitCard 
                habitId={habit.id}
                title={habit.title}
                description={habit.description}
                energyBoost={habit.energyBoost}
                connectionBoost={habit.connectionBoost}
                skillBoost={habit.skillBoost}
                completed={habit.completed}
                onComplete={() => {
                  if (!(habit as any).isAutoTracked) {
                    handleHabitComplete(habit.id);
                  }
                }}
                onDelete={!(habit as any).isAutoTracked ? () => {
                  const updatedHabits = habits.filter(h => h.id !== habit.id);
                  setHabits(updatedHabits);
                } : undefined}
                dayZeroBoost={dayZeroBoost}
                habitInfo={habit.info}
              />
            </div>
          ))}
        </div>
        
        {/* Daily Challenge */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Desafio do Dia</CardTitle>
            <CardDescription>
              Complete para ganhar recompensas especiais
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Iniciando sua Jornada</h3>
                <p className="text-sm text-muted-foreground">Complete seus {habits.length} hábitos iniciais</p>
              </div>
              <Badge variant="outline" className="bg-primary/10">
                {completedHabitCount}/{habits.length} Completados
              </Badge>
            </div>
            <Progress value={(completedHabitCount / habits.length) * 100} className="h-2" />
          </CardContent>
          <CardFooter className="pt-4">
            <div className="w-full flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Recompensa: <span className="font-medium text-foreground">Experiência Bônus</span>
              </div>
              <Button 
                size="sm" 
                disabled={completedHabitCount < habits.length || dailyChallengeCompleted}
                onClick={handleDailyChallengeComplete}
              >
                {dailyChallengeCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" /> Coletado
                  </>
                ) : completedHabitCount >= habits.length ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" /> Coletar
                  </>
                ) : "Coletar"}
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Dialogs */}
        <EvolutionAnimation 
          isOpen={showEvolutionAnimation} 
          onClose={handleEvolutionClose}
          archetype={avatar.archetype}
          fromLevel={evolutionFromLevel}
          toLevel={evolutionToLevel}
        />
        
        <LevelUpAnimation 
          isOpen={showLevelUpAnimation} 
          onClose={handleLevelUpClose}
          newLevel={avatar.level}
        />
        
        <LuckyCards 
          isOpen={showLuckyCards} 
          onClose={() => setShowLuckyCards(false)} 
          guaranteedReward={true}
        />
        
        <AvatarPreview 
          isOpen={showAvatarPreview} 
          onClose={() => setShowAvatarPreview(false)} 
          archetype={avatar.archetype}
        />
        
        <AskTheOracle
          isOpen={showOracle}
          onClose={handleOracleClose}
          onAddHabit={handleOracleAddHabit}
        />
      </div>
    </div>
  );
};

export default Dashboard;
