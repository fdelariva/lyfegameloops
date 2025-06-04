import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { CheckCircle, User, Calendar, ShoppingCart, Users, Plus, Check, X, Brain, MessageCircle, Share2, Heart } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import DashboardHabitCard from "@/components/DashboardHabitCard";
import { useNavigate } from "react-router-dom";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import OracleCompanion from "@/components/OracleCompanion";
import SocialFeed from "@/components/SocialFeed";
import FriendsList from "@/components/FriendsList";
import EndOfDayReview from "@/components/EndOfDayReview";
import MorningBrief from "@/components/MorningBrief";

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

const DashboardQ3 = () => {
  const navigate = useNavigate();
  const { playSound } = useSoundEffects();
  
  const [avatar, setAvatar] = useState({
    level: 1,
    archetype: "Guerreiro" as "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido",
    energy: 25,
    connection: 20,
    skill: 15,
  });
  
  const [habits, setHabits] = useState<Habit[]>([]);
  const [customHabit, setCustomHabit] = useState("");
  const [showCustomHabitInput, setShowCustomHabitInput] = useState(false);
  const [completedHabitCount, setCompletedHabitCount] = useState(0);
  const [coins, setCoins] = useState(100);
  const [dayZeroBoost, setDayZeroBoost] = useState(true);
  const [showOracleCompanion, setShowOracleCompanion] = useState(false);
  const [showSocialFeed, setShowSocialFeed] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showEndOfDayReview, setShowEndOfDayReview] = useState(false);
  const [showMorningBrief, setShowMorningBrief] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Show morning brief on first visit
  useEffect(() => {
    const lastVisit = localStorage.getItem('lastDashboardVisit');
    const today = new Date().toDateString();
    
    if (!lastVisit || lastVisit !== today) {
      setShowMorningBrief(true);
      localStorage.setItem('lastDashboardVisit', today);
    }
    
    setIsFirstVisit(!lastVisit);
  }, []);

  // Auto-show end of day review when all habits are completed
  useEffect(() => {
    if (habits.length > 0 && completedHabitCount === habits.length && completedHabitCount > 0) {
      setTimeout(() => {
        setShowEndOfDayReview(true);
      }, 2000);
    }
  }, [completedHabitCount, habits.length]);

  // Oracle nudging system
  useEffect(() => {
    const nudgeTimer = setTimeout(() => {
      if (completedHabitCount < habits.length && habits.length > 0) {
        toast("🔮 Oracle diz:", {
          description: "Que tal completar mais um hábito? Você está indo muito bem!",
          action: {
            label: "Conversar",
            onClick: () => setShowOracleCompanion(true),
          },
        });
      }
    }, 45000); // 45 seconds after entering dashboard
    
    return () => clearTimeout(nudgeTimer);
  }, [completedHabitCount, habits.length]);

  // Load habits from localStorage
  useEffect(() => {
    const defaultHabits = [
      {
        id: "h1",
        title: "Levantar da cama",
        description: "Começar o dia saindo da cama",
        energyBoost: 5,
        skillBoost: 0,
        connectionBoost: 5,
        completed: false,
        info: {
          whyDo: "Acordar cedo regula o ritmo circadiano, melhora a qualidade do sono e aumenta a produtividade ao longo do dia.",
          howDo: "Coloque o despertador longe da cama, abra as cortinas imediatamente ao acordar para exposição à luz natural."
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
          whyDo: "A escovação remove 99% das bactérias da boca, previne cáries, gengivite e doenças cardíacas.",
          howDo: "Escove por 2 minutos com movimentos circulares suaves, use pasta com flúor, escove a língua e troque a escova a cada 3 meses."
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
          whyDo: "Lavar o rosto remove oleosidade, células mortas e resíduos acumulados durante a noite, prevenindo acne e mantendo a pele saudável.",
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
          whyDo: "Ficar sentado por longos períodos reduz o metabolismo em 90%, aumenta o risco de diabetes e problemas cardiovasculares.",
          howDo: "A cada hora, levante-se e faça um alongamento simples como elevar os braços, rotacionar o pescoço ou alongar as pernas."
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
          whyDo: "Atividades prazerosas liberam dopamina e serotonina, neurotransmissores que melhoram o humor, reduzem stress e fortalecem o sistema imunológico.",
          howDo: "Reserve 10-15 minutos para algo que genuinamente te dá prazer: ouvir música, desenhar, conversar com um amigo, ou qualquer hobby."
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
          howDo: "Inspire lentamente pelo nariz por 4 segundos, segure por 4 segundos, expire pela boca por 6 segundos. Repita 3 vezes."
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
          whyDo: "O corpo é 60% água e perde 2-3 litros por dia. Desidratação de apenas 2% reduz performance física e mental, causa fadiga e dores de cabeça.",
          howDo: "Beba um copo de 250ml de água pura, preferencialmente em temperatura ambiente. Mantenha uma garrafa visível como lembrete e distribua a ingestão ao longo do dia."
        }
      }
    ];

    try {
      const savedHabits = localStorage.getItem('selectedHabits');
      const savedCustomHabits = localStorage.getItem('customHabits');
      
      if (savedHabits) {
        const selectedHabitIds = JSON.parse(savedHabits);
        const customHabits = savedCustomHabits ? JSON.parse(savedCustomHabits) : [];
        
        const userHabits = [
          ...defaultHabits.filter(habit => selectedHabitIds.includes(habit.id)),
          ...customHabits.map((customHabit: any, index: number) => ({
            id: `custom-${index}`,
            title: customHabit.name || customHabit,
            description: "Hábito personalizado",
            energyBoost: 5,
            skillBoost: 5,
            connectionBoost: 5,
            completed: false,
            info: {
              whyDo: "Este é um hábito personalizado criado por você.",
              howDo: "Execute este hábito de forma consistente."
            }
          }))
        ];
        
        setHabits(userHabits);
      } else {
        setHabits([]);
      }
    } catch (error) {
      console.log("Error loading saved habits:", error);
      setHabits([]);
    }
  }, []);

  const handleHabitComplete = (habitId: string) => {
    playSound('habit');
    
    const updatedHabits = habits.map(habit => 
      habit.id === habitId ? { ...habit, completed: true } : habit
    );
    setHabits(updatedHabits);
    
    const completedHabit = habits.find(h => h.id === habitId);
    if (!completedHabit) return;
    
    const newCount = completedHabitCount + 1;
    setCompletedHabitCount(newCount);
    
    const multiplier = dayZeroBoost ? 2 : 1;
    
    setAvatar(prev => ({
      ...prev,
      energy: prev.energy + (completedHabit.energyBoost * multiplier),
      skill: prev.skill + (completedHabit.skillBoost * multiplier),
      connection: prev.connection + (completedHabit.connectionBoost * multiplier)
    }));
    
    const coinsEarned = 20 * multiplier;
    setCoins(prev => prev + coinsEarned);

    // Show Oracle celebration
    setTimeout(() => {
      toast("🔮 Oracle celebra:", {
        description: "Excelente progresso! Continue assim e você alcançará seus objetivos!",
      });
    }, 1000);
  };

  const calculateDailyProgress = () => {
    const completed = habits.filter(h => h.completed).length;
    const total = habits.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  if (habits.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-6 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Lyfe Q3 Future</h1>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500">{coins} moedas</Badge>
              <Button size="sm" variant="outline">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Nenhum hábito configurado</h2>
              <p className="text-muted-foreground mb-6">
                Configure seus hábitos para começar sua jornada com Oracle e aliados.
              </p>
              <Button onClick={() => navigate("/onboarding-q3")}>
                Configurar Hábitos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 max-w-4xl">
        {/* Header with Social Actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lyfe Q3 Future</h1>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowSocialFeed(true)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowFriends(true)}
            >
              <Users className="h-4 w-4" />
            </Button>
            <Badge className="bg-amber-500 cursor-pointer" onClick={() => navigate("/shop")}>
              {coins} moedas
            </Badge>
            <Button size="sm" variant="outline">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Oracle Companion Button */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🔮</div>
              <div>
                <h3 className="font-bold">Seu Oracle Pessoal</h3>
                <p className="text-sm text-muted-foreground">Sempre disponível para orientação e motivação</p>
              </div>
            </div>
            <Button onClick={() => setShowOracleCompanion(true)}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Conversar
            </Button>
          </CardContent>
        </Card>

        {/* Progress Section */}
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
              <CardDescription>Acompanhe sua evolução</CardDescription>
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
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-muted-foreground">Aliados</div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {habits.map(habit => (
            <DashboardHabitCard 
              key={habit.id}
              title={habit.title}
              description={habit.description}
              energyBoost={habit.energyBoost}
              connectionBoost={habit.connectionBoost}
              skillBoost={habit.skillBoost}
              completed={habit.completed}
              onComplete={() => handleHabitComplete(habit.id)}
              onDelete={() => {
                const updatedHabits = habits.filter(h => h.id !== habit.id);
                setHabits(updatedHabits);
              }}
              dayZeroBoost={dayZeroBoost}
              habitInfo={habit.info}
            />
          ))}
        </div>

        {/* Social Progress Sharing */}
        {calculateDailyProgress() > 0 && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium">Compartilhe seu progresso!</h3>
                  <p className="text-sm text-muted-foreground">
                    {calculateDailyProgress()}% concluído hoje - inspire seus aliados!
                  </p>
                </div>
              </div>
              <Button size="sm" onClick={() => setShowSocialFeed(true)}>
                Compartilhar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Components */}
        <OracleCompanion 
          isOpen={showOracleCompanion}
          onClose={() => setShowOracleCompanion(false)}
          userProgress={calculateDailyProgress()}
          completedHabits={completedHabitCount}
          totalHabits={habits.length}
        />

        <SocialFeed 
          isOpen={showSocialFeed}
          onClose={() => setShowSocialFeed(false)}
          userProgress={calculateDailyProgress()}
        />

        <FriendsList 
          isOpen={showFriends}
          onClose={() => setShowFriends(false)}
        />

        <EndOfDayReview 
          isOpen={showEndOfDayReview}
          onClose={() => setShowEndOfDayReview(false)}
          completedHabits={completedHabitCount}
          totalHabits={habits.length}
          coinsEarned={completedHabitCount * 20}
        />

        <MorningBrief 
          isOpen={showMorningBrief}
          onClose={() => setShowMorningBrief(false)}
          isFirstVisit={isFirstVisit}
          todayHabits={habits}
        />
      </div>
    </div>
  );
};

export default DashboardQ3;
