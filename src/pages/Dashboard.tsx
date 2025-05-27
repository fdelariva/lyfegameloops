import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { CheckCircle, User, Calendar, ShoppingCart } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import HabitCard from "@/components/HabitCard";
import LuckyCards from "@/components/LuckyCards";
import AvatarPreview from "@/components/AvatarPreview";
import LevelUpAnimation from "@/components/LevelUpAnimation";
import { useNavigate } from "react-router-dom";
import { useSoundEffects } from "@/hooks/useSoundEffects";

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
  
  const [habits, setHabits] = useState([
    {
      id: "h1",
      title: "Beber água regularmente",
      description: "Beba pelo menos 2 litros de água por dia para melhorar sua energia.",
      energyBoost: 10,
      skillBoost: 5,
      connectionBoost: 0,
      completed: false,
    },
    {
      id: "h2",
      title: "Meditar por 5 minutos",
      description: "Uma meditação curta para acalmar a mente e melhorar o foco.",
      energyBoost: 0,
      skillBoost: 7,
      connectionBoost: 8,
      completed: false,
    }
  ]);
  
  const [showLuckyCards, setShowLuckyCards] = useState(false);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [completedHabitCount, setCompletedHabitCount] = useState(0);
  const [coins, setCoins] = useState(100); // Começar com 100 moedas do onboarding
  const [dayZeroBoost, setDayZeroBoost] = useState(true); // Boost do Dia 0

  // Simula o efeito de uma notificação agendada
  useEffect(() => {
    const timer = setTimeout(() => {
      toast("Seu avatar precisa de você!", {
        description: "Complete seu próximo hábito para continuar evoluindo!",
      });
    }, 30000); // 30 segundos após entrar no dashboard
    
    return () => clearTimeout(timer);
  }, []);

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
    
    // Adiciona moedas
    const coinsEarned = 20 * multiplier;
    setCoins(prev => prev + coinsEarned);
    
    // Check for level up
    const totalPoints = avatar.energy + avatar.skill + avatar.connection + 
                        (completedHabit.energyBoost + completedHabit.skillBoost + completedHabit.connectionBoost) * multiplier;
    
    if (totalPoints >= 75 && avatar.level === 1) {
      setTimeout(() => {
        playSound('levelup');
        setShowLevelUpAnimation(true);
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

  // Calcula o progresso diário
  const calculateDailyProgress = () => {
    const completed = habits.filter(h => h.completed).length;
    const total = habits.length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lyfe</h1>
          <div className="flex items-center gap-2">
            <Badge 
              className="bg-amber-500 cursor-pointer hover:bg-amber-600 transition-colors"
              onClick={() => navigate("/shop")}
            >
              {coins} moedas
            </Badge>
            <Button size="sm" variant="outline">
              <User className="h-4 w-4" />
            </Button>
          </div>
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
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/shop")}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Loja de Itens
              </Button>
            </CardFooter>
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
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Calendário Semanal
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Habits Section */}
        <h2 className="text-xl font-bold mb-4 flex items-center">
          Hábitos de Hoje <Badge className="ml-2 bg-primary/30">{habits.length}</Badge>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {habits.map(habit => (
            <HabitCard 
              key={habit.id}
              title={habit.title}
              description={habit.description}
              energyBoost={habit.energyBoost}
              connectionBoost={habit.connectionBoost}
              skillBoost={habit.skillBoost}
              completed={habit.completed}
              onComplete={() => handleHabitComplete(habit.id)}
              dayZeroBoost={dayZeroBoost}
            />
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
                <p className="text-sm text-muted-foreground">Complete seus 2 hábitos iniciais</p>
              </div>
              <Badge variant="outline" className="bg-primary/10">
                {completedHabitCount}/2 Completados
              </Badge>
            </div>
            <Progress value={(completedHabitCount / 2) * 100} className="h-2" />
          </CardContent>
          <CardFooter className="pt-4">
            <div className="w-full flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Recompensa: <span className="font-medium text-foreground">+50 moedas</span>
              </div>
              <Button 
                size="sm" 
                disabled={completedHabitCount < 2}
                onClick={() => {
                  toast.success("Desafio concluído!");
                  toast("Recompensa recebida!", { description: "+50 moedas" });
                  setCoins(prev => prev + 50);
                }}
              >
                {completedHabitCount >= 2 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" /> Coletar
                  </>
                ) : "Coletar"}
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Dialogs */}
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
      </div>
    </div>
  );
};

export default Dashboard;
