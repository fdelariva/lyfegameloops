import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { 
  Skull, 
  Sword, 
  Shield,
  Flame,
  Target,
  Star,
  TrendingUp,
  Settings,
  Bell,
  Brain
} from "lucide-react";
import UserAvatar from "@/components/Avatar";
import DashboardHabitCard from "@/components/DashboardHabitCard";
import OracleCompanion from "@/components/OracleCompanion";
import FriendsList from "@/components/FriendsList";
import MorningBrief from "@/components/MorningBrief";
import EndOfDayReview from "@/components/EndOfDayReview";
import EvolutionAnimation from "@/components/EvolutionAnimation";
import LevelUpAnimation from "@/components/LevelUpAnimation";
import { useNavigate } from "react-router-dom";
import AristosWelcomeMessages from "@/components/AristosWelcomeMessages";
import OracleMessageCarousel from "@/components/OracleMessageCarousel";
import AddHabitModal from "@/components/AddHabitModal";
import { AthenaImage } from "@/components/AthenaImage";

const CavernaDashboard = () => {
  const navigate = useNavigate();
  
  // User state
  const [level, setLevel] = useState(1);
  const [energy, setEnergy] = useState(25);
  const [connection, setConnection] = useState(20);
  const [skill, setSkill] = useState(15);
  const [streak, setStreak] = useState(0);
  const [totalHabitsCompleted, setTotalHabitsCompleted] = useState(0);
  const [shadowsDefeated, setShadowsDefeated] = useState(0);
  
  // UI state
  const [showOracle, setShowOracle] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showMorningBrief, setShowMorningBrief] = useState(false);
  const [showEndOfDay, setShowEndOfDay] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAristosWelcome, setShowAristosWelcome] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [isDayZero, setIsDayZero] = useState(true);
  const [previousLevel, setPreviousLevel] = useState(1);
  
  // Caverna-specific habits
  const [habits, setHabits] = useState([
    {
      id: 'caverna-procrastinacao',
      name: "Lutar contra a procrastinação",
      icon: "⚔️",
      description: "Enfrente suas sombras internas",
      category: "Caverna",
      energyBoost: 5,
      connectionBoost: 3,
      skillBoost: 4,
      completed: false,
      streak: 0,
      info: {
        whyDo: "A procrastinação é uma das maiores sombras que nos impedem de crescer. Enfrentá-la fortalece nossa disciplina e autocontrole.",
        howDo: "Identifique uma tarefa que você está adiando há mais de 24 horas e a execute imediatamente, mesmo que seja apenas o primeiro passo."
      }
    }
  ]);

  // Load user data on mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel');
    const savedEnergy = localStorage.getItem('userEnergy');
    const savedConnection = localStorage.getItem('userConnection');
    const savedSkill = localStorage.getItem('userSkill');
    const savedStreak = localStorage.getItem('userStreak');
    const savedCompleted = localStorage.getItem('totalHabitsCompleted');
    const savedShadows = localStorage.getItem('shadowsDefeated');
    const savedDayZero = localStorage.getItem('isDayZero');
    
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedEnergy) setEnergy(parseInt(savedEnergy));
    if (savedConnection) setConnection(parseInt(savedConnection));
    if (savedSkill) setSkill(parseInt(savedSkill));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedCompleted) setTotalHabitsCompleted(parseInt(savedCompleted));
    if (savedShadows) setShadowsDefeated(parseInt(savedShadows));
    if (savedDayZero) setIsDayZero(savedDayZero === 'true');
  }, []);

  // Save progress data whenever it changes
  useEffect(() => {
    localStorage.setItem('userLevel', level.toString());
    localStorage.setItem('userEnergy', energy.toString());
    localStorage.setItem('userConnection', connection.toString());
    localStorage.setItem('userSkill', skill.toString());
    localStorage.setItem('userStreak', streak.toString());
    localStorage.setItem('totalHabitsCompleted', totalHabitsCompleted.toString());
    localStorage.setItem('shadowsDefeated', shadowsDefeated.toString());
    localStorage.setItem('isDayZero', isDayZero.toString());
  }, [level, energy, connection, skill, streak, totalHabitsCompleted, shadowsDefeated, isDayZero]);

  const handleCompleteHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId && !habit.completed) {
        const newStreak = habit.streak + 1;
        
        // Update user stats
        setEnergy(e => Math.min(100, e + habit.energyBoost));
        setConnection(c => Math.min(100, c + habit.connectionBoost));
        setSkill(s => Math.min(100, s + habit.skillBoost));
        setTotalHabitsCompleted(t => t + 1);
        setShadowsDefeated(s => s + 1);
        
        // Check for level up
        const newTotal = totalHabitsCompleted + 1;
        if (newTotal % 5 === 0) {
          const newLevel = Math.floor(newTotal / 5) + 1;
          if (newLevel > level) {
            setPreviousLevel(level);
            setLevel(newLevel);
            setShowLevelUp(true);
            toast.success(`Nível ${newLevel} alcançado! 🌟`);
          }
        }
        
        toast.success(`Sombra derrotada! +${habit.energyBoost} energia`);
        
        return { ...habit, completed: true, streak: newStreak };
      }
      return habit;
    }));
  };

  const handleAddHabit = (habitData: any) => {
    const newHabit = {
      id: `custom-${Date.now()}`,
      name: habitData.name,
      icon: habitData.icon || "⚔️",
      description: habitData.description || "Desafio personalizado",
      category: "Caverna",
      energyBoost: 3,
      connectionBoost: 2,
      skillBoost: 2,
      completed: false,
      streak: 0,
      info: {
        whyDo: "Um desafio personalizado para enfrentar suas sombras específicas.",
        howDo: "Execute este desafio da forma que faz mais sentido para você."
      }
    };
    
    setHabits(prev => [...prev, newHabit]);
    toast.success("Novo desafio adicionado à caverna!");
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalToday = habits.length;
  const progressPercentage = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-destructive/10">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar 
              level={level}
              archetype="Guerreiro"
              energy={energy}
              connection={connection}
              skill={skill}
            />
            <div>
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Caverna das Sombras
              </h1>
              <p className="text-muted-foreground">
                Enfrente suas sombras internas • Nível {level}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowOracle(true)}>
              <Brain className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Day Zero Banner */}
        {isDayZero && (
          <Card className="bg-gradient-to-r from-destructive/10 to-orange-500/10 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Skull className="h-6 w-6 text-destructive" />
                <div>
                  <h3 className="font-semibold text-destructive">Dia Zero - Primeira Batalha</h3>
                  <p className="text-sm text-muted-foreground">
                    Bem-vindo à Caverna das Sombras. Hoje você inicia sua jornada de autodescoberta.
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setIsDayZero(false)}
                  className="ml-auto"
                >
                  Entendi
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Sword className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Energia</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-destructive">{energy}</div>
                <Progress value={energy} className="mt-1 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Resistência</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-orange-500">{connection}</div>
                <Progress value={connection} className="mt-1 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Foco</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-purple-500">{skill}</div>
                <Progress value={skill} className="mt-1 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Skull className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Sombras Derrotadas</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-yellow-500">{shadowsDefeated}</div>
                <div className="text-xs text-muted-foreground mt-1">Total vencidas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progresso de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Desafios Completados</span>
                <span className="font-semibold">{completedToday}/{totalToday}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  <span>Sequência: {streak} dias</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Nível {level}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habits Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sword className="h-5 w-5" />
                Seus Desafios de Hoje
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddHabit(true)}
              >
                Adicionar Desafio
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {habits.map((habit) => (
                <DashboardHabitCard
                  key={habit.id}
                  title={habit.name}
                  description={habit.description}
                  habitId={habit.id}
                  energyBoost={habit.energyBoost}
                  connectionBoost={habit.connectionBoost}
                  skillBoost={habit.skillBoost}
                  completed={habit.completed}
                  onComplete={() => handleCompleteHabit(habit.id)}
                  habitInfo={habit.info}
                />
              ))}
              
              {habits.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Skull className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum desafio encontrado.</p>
                  <p className="text-sm">Adicione desafios para começar sua jornada na caverna.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* End of Day Review Prompt */}
        {completedToday === totalToday && totalToday > 0 && (
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Todas as sombras foram derrotadas hoje! 🎉</h3>
                  <p className="text-sm text-muted-foreground">
                    Que tal fazer uma reflexão sobre sua jornada?
                  </p>
                </div>
                <Button onClick={() => setShowEndOfDay(true)}>
                  Reflexão do Dia
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      {showOracle && (
        <OracleCompanion 
          isOpen={showOracle} 
          onClose={() => setShowOracle(false)}
          userProgress={progressPercentage}
          completedHabits={completedToday}
          totalHabits={totalToday}
        />
      )}

      {showAddHabit && (
        <AddHabitModal
          isOpen={showAddHabit}
          onClose={() => setShowAddHabit(false)}
          onAddHabit={handleAddHabit}
        />
      )}

      {showEndOfDay && (
        <EndOfDayReview
          isOpen={showEndOfDay}
          onClose={() => setShowEndOfDay(false)}
          completedHabits={completedToday}
          totalHabits={totalToday}
        />
      )}

      {showLevelUp && (
        <LevelUpAnimation
          isOpen={showLevelUp}
          onClose={() => setShowLevelUp(false)}
          newLevel={level}
        />
      )}
    </div>
  );
};

export default CavernaDashboard;