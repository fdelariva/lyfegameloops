
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { 
  Trophy, 
  Coins, 
  ShoppingCart, 
  Calendar, 
  Users, 
  Brain,
  Zap,
  Target,
  Star,
  Gift,
  Flame,
  TrendingUp,
  MessageCircle,
  Settings
} from "lucide-react";
import UserAvatar from "@/components/Avatar";
import DashboardHabitCard from "@/components/DashboardHabitCard";
import TreasureChest from "@/components/TreasureChest";
import OracleCompanion from "@/components/OracleCompanion";
import SocialFeed from "@/components/SocialFeed";
import FriendsList from "@/components/FriendsList";
import MorningBrief from "@/components/MorningBrief";
import EndOfDayReview from "@/components/EndOfDayReview";
import EvolutionAnimation from "@/components/EvolutionAnimation";
import LevelUpAnimation from "@/components/LevelUpAnimation";
import { defaultHabits } from "@/data/defaultHabits";
import { useNavigate } from "react-router-dom";

const DashboardQ3 = () => {
  const navigate = useNavigate();
  
  // User state
  const [level, setLevel] = useState(1);
  const [energy, setEnergy] = useState(25);
  const [connection, setConnection] = useState(20);
  const [skill, setSkill] = useState(15);
  const [coins, setCoins] = useState(200);
  const [archetype, setArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio">("Guerreiro");
  const [streak, setStreak] = useState(0);
  const [totalHabitsCompleted, setTotalHabitsCompleted] = useState(0);
  
  // UI state
  const [showTreasureChest, setShowTreasureChest] = useState(false);
  const [showOracle, setShowOracle] = useState(false);
  const [showSocialFeed, setShowSocialFeed] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showMorningBrief, setShowMorningBrief] = useState(false);
  const [showEndOfDay, setShowEndOfDay] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isDayZero, setIsDayZero] = useState(true);
  
  // Habits state
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('selectedHabits');
    const customHabits = localStorage.getItem('customHabits');
    
    if (savedHabits) {
      const selectedIds = JSON.parse(savedHabits);
      const customs = customHabits ? JSON.parse(customHabits) : [];
      
      const selectedDefaultHabits = defaultHabits.filter(habit => 
        selectedIds.includes(habit.id)
      );
      
      const selectedCustomHabits = customs.map((habit: string, index: number) => ({
        id: `custom-${index}`,
        name: habit,
        icon: "🎯",
        description: "Hábito personalizado",
        category: "Personalizado",
        energyBoost: 3,
        connectionBoost: 2,
        skillBoost: 2,
        info: {
          whyDo: "Este é um hábito que você criou para atender suas necessidades específicas.",
          howDo: "Execute este hábito da forma que faz mais sentido para você."
        }
      }));
      
      return [...selectedDefaultHabits, ...selectedCustomHabits].map(habit => ({
        ...habit,
        completed: false,
        streak: 0
      }));
    }
    
    return defaultHabits.slice(0, 3).map(habit => ({
      ...habit,
      completed: false,
      streak: 0
    }));
  });

  // Load saved data
  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel');
    const savedEnergy = localStorage.getItem('userEnergy');
    const savedConnection = localStorage.getItem('userConnection');
    const savedSkill = localStorage.getItem('userSkill');
    const savedCoins = localStorage.getItem('userCoins');
    const savedArchetype = localStorage.getItem('userArchetype');
    const savedStreak = localStorage.getItem('userStreak');
    const savedTotal = localStorage.getItem('totalHabitsCompleted');
    const savedDayZero = localStorage.getItem('isDayZero');
    
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedEnergy) setEnergy(parseInt(savedEnergy));
    if (savedConnection) setConnection(parseInt(savedConnection));
    if (savedSkill) setSkill(parseInt(savedSkill));
    if (savedCoins) setCoins(parseInt(savedCoins));
    if (savedArchetype) setArchetype(savedArchetype as any);
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedTotal) setTotalHabitsCompleted(parseInt(savedTotal));
    if (savedDayZero) setIsDayZero(savedDayZero === 'true');
    
    // Show morning brief on first visit
    const hasSeenMorning = localStorage.getItem('hasSeenMorningBrief');
    if (!hasSeenMorning) {
      setTimeout(() => setShowMorningBrief(true), 1000);
      localStorage.setItem('hasSeenMorningBrief', 'true');
    }
  }, []);

  // Save data when state changes
  useEffect(() => {
    localStorage.setItem('userLevel', level.toString());
    localStorage.setItem('userEnergy', energy.toString());
    localStorage.setItem('userConnection', connection.toString());
    localStorage.setItem('userSkill', skill.toString());
    localStorage.setItem('userCoins', coins.toString());
    localStorage.setItem('userStreak', streak.toString());
    localStorage.setItem('totalHabitsCompleted', totalHabitsCompleted.toString());
    localStorage.setItem('isDayZero', isDayZero.toString());
  }, [level, energy, connection, skill, coins, streak, totalHabitsCompleted, isDayZero]);

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  
  // Calculate next level progress
  const expForCurrentLevel = level * 100;
  const currentExp = energy + connection + skill;
  const expForNextLevel = (level + 1) * 100;
  const progressToNextLevel = Math.min(100, ((currentExp - expForCurrentLevel) / (expForNextLevel - expForCurrentLevel)) * 100);

  const handleCompleteHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit || habit.completed) return;

    setHabits(prev => prev.map(h => 
      h.id === habitId ? { ...h, completed: true, streak: h.streak + 1 } : h
    ));

    // Calculate attribute gains
    let energyGain = habit.energyBoost || 0;
    let connectionGain = habit.connectionBoost || 0;
    let skillGain = habit.skillBoost || 0;
    let coinGain = 10;

    // Day zero bonus
    if (isDayZero) {
      energyGain *= 3;
      connectionGain *= 3;
      skillGain *= 3;
      coinGain *= 2;
    }

    setEnergy(prev => prev + energyGain);
    setConnection(prev => prev + connectionGain);
    setSkill(prev => prev + skillGain);
    setCoins(prev => prev + coinGain);
    setTotalHabitsCompleted(prev => prev + 1);

    // Check for level up
    const newTotal = energy + energyGain + connection + connectionGain + skill + skillGain;
    const newLevel = Math.floor(newTotal / 100) + 1;
    
    if (newLevel > level) {
      setLevel(newLevel);
      setShowLevelUp(true);
      setCoins(prev => prev + 50); // Level up bonus
    }

    // Check if all habits completed
    const newCompletedCount = habits.filter(h => h.completed).length + 1;
    if (newCompletedCount === totalHabits) {
      setStreak(prev => prev + 1);
      setShowEvolution(true);
      setIsDayZero(false);
      localStorage.setItem('isDayZero', 'false');
    }
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
  };

  const handleShopClick = () => {
    navigate("/shop");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Q3 Future Dashboard
            </h1>
            <p className="text-muted-foreground">
              Desenvolva hábitos com Oracle e conexões sociais
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFriends(true)}
              className="hidden sm:flex"
            >
              <Users className="h-4 w-4 mr-2" />
              Aliados
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOracle(true)}
            >
              <Brain className="h-4 w-4 mr-2" />
              Oracle
            </Button>
            <Button onClick={handleShopClick} size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Loja
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Avatar & Level */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <UserAvatar 
                  level={level} 
                  archetype={archetype}
                  energy={energy}
                  connection={connection}
                  skill={skill}
                />
                <div className="mt-3 w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Nível {level}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(progressToNextLevel)}%
                    </span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attributes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Zap className="h-4 w-4 mr-1 text-orange-medium" />
                Atributos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Energia</span>
                <Badge variant="outline" className="bg-orange-50">
                  {energy}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Conexão</span>
                <Badge variant="outline" className="bg-blue-50">
                  {connection}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Habilidade</span>
                <Badge variant="outline" className="bg-green-50">
                  {skill}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Target className="h-4 w-4 mr-1 text-primary" />
                Progresso Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Completos</span>
                  <span className="text-xs font-medium">{completedToday}/{totalHabits}</span>
                </div>
                <Progress value={completionRate} className="h-2" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Flame className="h-3 w-3 text-orange-500" />
                  <span>Série: {streak} dias</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coins & Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Coins className="h-4 w-4 mr-1 text-orange-medium" />
                Moedas & Ações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{coins} moedas</span>
                <Button size="sm" variant="outline" onClick={handleShopClick}>
                  <ShoppingCart className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowTreasureChest(true)}
                  className="text-xs"
                >
                  <Gift className="h-3 w-3 mr-1" />
                  Baú
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSocialFeed(true)}
                  className="text-xs"
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Social
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Day Zero Banner */}
        {isDayZero && (
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-primary animate-pulse" />
                <div className="text-center">
                  <p className="font-semibold text-primary">🎉 Dia 0 - Bônus Especial Ativo!</p>
                  <p className="text-sm text-muted-foreground">
                    Todos os hábitos geram +200% de atributos hoje!
                  </p>
                </div>
                <Star className="h-5 w-5 text-primary animate-pulse" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Completos</p>
                <p className="text-lg font-bold">{totalHabitsCompleted}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Série Atual</p>
                <p className="text-lg font-bold">{streak}</p>
              </div>
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Nível</p>
                <p className="text-lg font-bold">{level}</p>
              </div>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Taxa Hoje</p>
                <p className="text-lg font-bold">{completionRate}%</p>
              </div>
              <Target className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </div>

        {/* Habits Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Seus Hábitos Hoje</span>
              <Badge variant="secondary">
                {completedToday}/{totalHabits}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {habits.map((habit) => (
              <DashboardHabitCard
                key={habit.id}
                title={habit.name}
                description={habit.description}
                energyBoost={habit.energyBoost}
                connectionBoost={habit.connectionBoost}
                skillBoost={habit.skillBoost}
                completed={habit.completed}
                onComplete={() => handleCompleteHabit(habit.id)}
                onDelete={() => handleDeleteHabit(habit.id)}
                dayZeroBoost={isDayZero}
                habitInfo={habit.info}
              />
            ))}
          </CardContent>
        </Card>

        {/* End of day button */}
        {completedToday === totalHabits && totalHabits > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-green-700 mb-2">
                🎉 Parabéns! Você completou todos os hábitos hoje!
              </p>
              <Button 
                onClick={() => setShowEndOfDay(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Ver Resumo do Dia
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals and Dialogs */}
      <TreasureChest 
        isOpen={showTreasureChest} 
        onClose={() => setShowTreasureChest(false)} 
      />
      
      <OracleCompanion 
        isOpen={showOracle} 
        onClose={() => setShowOracle(false)} 
      />
      
      <SocialFeed 
        isOpen={showSocialFeed} 
        onClose={() => setShowSocialFeed(false)} 
      />
      
      <FriendsList 
        isOpen={showFriends} 
        onClose={() => setShowFriends(false)} 
      />
      
      <MorningBrief 
        isOpen={showMorningBrief} 
        onClose={() => setShowMorningBrief(false)} 
      />
      
      <EndOfDayReview 
        isOpen={showEndOfDay} 
        onClose={() => setShowEndOfDay(false)}
        completedHabits={habits.filter(h => h.completed)}
        totalGains={{
          energy: habits.filter(h => h.completed).reduce((sum, h) => sum + (h.energyBoost || 0), 0),
          connection: habits.filter(h => h.completed).reduce((sum, h) => sum + (h.connectionBoost || 0), 0),
          skill: habits.filter(h => h.completed).reduce((sum, h) => sum + (h.skillBoost || 0), 0)
        }}
      />
      
      <EvolutionAnimation 
        isOpen={showEvolution} 
        onClose={() => setShowEvolution(false)} 
      />
      
      <LevelUpAnimation 
        isOpen={showLevelUp} 
        onClose={() => setShowLevelUp(false)}
        newLevel={level}
      />
    </div>
  );
};

export default DashboardQ3;
