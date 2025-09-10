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
  Brain,
  User,
  BookOpen,
  Calendar as CalendarIcon
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
import HabitSelectionStep from "@/components/onboarding/HabitSelectionStep";
import { defaultHabits } from "@/data/defaultHabits";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  
  // Routine builder state
  const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);
  const [routineHabits, setRoutineHabits] = useState(defaultHabits.slice(0, 6));
  const [routineSelectedHabits, setRoutineSelectedHabits] = useState<string[]>([]);
  const [routineCustomHabits, setRoutineCustomHabits] = useState<Array<{ id: string; name: string; icon?: string; description?: string; info?: any; category?: string }>>([]);
  
  // Journal dialog state
  const [showJournalDialog, setShowJournalDialog] = useState(false);
  const [currentJournalHabit, setCurrentJournalHabit] = useState<any>(null);
  const [journalEntry, setJournalEntry] = useState("");
  
  // Journal calendar state
  const [showJournalCalendar, setShowJournalCalendar] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>();
  const [journalEntries, setJournalEntries] = useState<any>({});
  
  // Caverna-specific habits
  const [habits, setHabits] = useState(() => {
    const hasChallengeCompleted = localStorage.getItem('cavernaChallengeCompleted') === 'true';
    const today = new Date().toISOString().slice(0,10);
    
    // Base Caverna habit
    const baseHabit = {
      id: 'caverna-procrastinacao',
      name: "Lutar contra a procrastinação",
      icon: "⚔️",
      description: "Enfrente suas sombras internas",
      category: "Caverna",
      energyBoost: 5,
      connectionBoost: 3,
      skillBoost: 4,
      completed: hasChallengeCompleted, // Auto-complete if challenge was completed
      streak: hasChallengeCompleted ? 1 : 0,
      info: {
        whyDo: "A procrastinação é uma das maiores sombras que nos impedem de crescer. Enfrentá-la fortalece nossa disciplina e autocontrole.",
        howDo: "Identifique uma tarefa que você está adiando há mais de 24 horas e a execute imediatamente, mesmo que seja apenas o primeiro passo."
      }
    };

    // Load daily habits created in the routine builder
    let stored: any[] = [];
    try {
      stored = JSON.parse(localStorage.getItem('dailyHabits') || '[]');
    } catch {
      stored = [];
    }

    // Reset completion if date changed
    if (stored.length && stored[0]?.date !== today) {
      stored = stored.map(h => ({ ...h, completed: false, date: today }));
      localStorage.setItem('dailyHabits', JSON.stringify(stored));
    }

    const todayHabits = stored
      .filter(h => h.date === today)
      .map(h => ({
        id: h.id,
        name: h.name,
        icon: h.icon || '⚔️',
        description: h.description || 'Desafio do dia',
        category: 'Caverna',
        energyBoost: h.energyBoost ?? 3,
        connectionBoost: h.connectionBoost ?? 2,
        skillBoost: h.skillBoost ?? 2,
        completed: !!h.completed,
        streak: h.streak ?? 0,
        info: h.info || {
          whyDo: 'Hábito selecionado no montador de rotina.',
          howDo: 'Execute-o da melhor forma que fizer sentido para você hoje.'
        }
      }));

    return [baseHabit, ...todayHabits];
  });

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
    
    // Load journal entries
    const savedJournalEntries = localStorage.getItem('journalEntries');
    if (savedJournalEntries) {
      try {
        setJournalEntries(JSON.parse(savedJournalEntries));
      } catch {}
    }
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
    // Check if it's a journal habit
    const habit = habits.find(h => h.id === habitId);
    if (habit && (habit.category === "Journaling" || habit.name.toLowerCase().includes("escreva") || habit.name.toLowerCase().includes("diário"))) {
      setCurrentJournalHabit(habit);
      setJournalEntry("");
      setShowJournalDialog(true);
      return;
    }

    // Check if user has completed the caverna challenge
    const hasChallengeCompleted = localStorage.getItem('cavernaChallengeCompleted') === 'true';
    
    // If it's the caverna habit and user hasn't completed the challenge, redirect to challenge
    if (habitId === 'caverna-procrastinacao' && !hasChallengeCompleted) {
      navigate('/caverna-do-desafio');
      return;
    }

    completeHabitAction(habitId);
  };

  const completeHabitAction = (habitId: string) => {
    // Apply pending shadow life (from successful battle) when any daily habit is marked
    const pendingRaw = localStorage.getItem('pendingShadowLife');
    if (pendingRaw) {
      try {
        const pending = JSON.parse(pendingRaw) as { shadowId: string; lives: number };
        const progress = JSON.parse(localStorage.getItem('shadowProgress') || '{}');
        const current = progress[pending.shadowId] || 0;
        const newVal = current + (pending.lives || 0);
        progress[pending.shadowId] = newVal;
        localStorage.setItem('shadowProgress', JSON.stringify(progress));

        const captured = new Set<string>(JSON.parse(localStorage.getItem('capturedShadows') || '[]'));
        if (newVal >= 7) captured.add(pending.shadowId);
        localStorage.setItem('capturedShadows', JSON.stringify(Array.from(captured)));

        if ((pending.lives || 0) > 0) {
          toast.success(`Batalha da sombra cumprida! ${pending.lives > 1 ? `${pending.lives} vidas` : '1 vida'} perdid${pending.lives > 1 ? 'as' : 'a'}.`);
        } else {
          toast("Atenção", { description: "O veneno anulou a vitória. Nenhuma vida foi perdida." });
        }
      } catch {}
      localStorage.removeItem('pendingShadowLife');
    }
    
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
        
        return { ...habit, completed: true, streak: newStreak };
      }
      return habit;
    }));

    // Persist completion in dailyHabits storage
    try {
      const dailyRaw = localStorage.getItem('dailyHabits');
      if (dailyRaw) {
        const today = new Date().toISOString().slice(0,10);
        const list = JSON.parse(dailyRaw);
        const updated = list.map((h: any) => h.id === habitId ? { ...h, completed: true, date: today } : h);
        localStorage.setItem('dailyHabits', JSON.stringify(updated));
      }
    } catch {}
  };

  const handleJournalSave = () => {
    if (!journalEntry.trim()) {
      toast.error("Por favor, escreva algo antes de salvar.");
      return;
    }

    // Save journal entry to localStorage
    const today = new Date().toISOString().slice(0,10);
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '{}');
    
    if (!journalEntries[today]) {
      journalEntries[today] = [];
    }
    
    journalEntries[today].push({
      habitId: currentJournalHabit.id,
      habitName: currentJournalHabit.name,
      entry: journalEntry,
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    
    // Update local state
    setJournalEntries(journalEntries);
    
    // Complete the habit
    completeHabitAction(currentJournalHabit.id);
    
    // Close dialog
    setShowJournalDialog(false);
    setCurrentJournalHabit(null);
    setJournalEntry("");
    
    toast.success("Reflexão salva com sucesso!");
  };

  const getJournalInstructions = (habitName: string) => {
    if (habitName.includes("objetivos")) {
      return "Liste 2-3 objetivos específicos que deseja alcançar hoje. Seja claro sobre o que constitui sucesso para cada um.";
    }
    if (habitName.includes("grato")) {
      return "Escreva 3 coisas específicas pelas quais você é grato hoje. Podem ser pequenas ou grandes - o importante é sentir genuinamente a gratidão.";
    }
    if (habitName.includes("sono")) {
      return "Descreva como foi sua noite de sono: horário que dormiu, quantas vezes acordou, como se sente agora (1-10), e o que pode ter afetado seu descanso.";
    }
    if (habitName.includes("despesas")) {
      return "Liste os gastos do dia, categorizando-os. Reflita: foram necessários? Trouxeram valor? Estão alinhados com seus objetivos financeiros?";
    }
    return "Use este espaço para refletir sobre este hábito e como ele se relaciona com seus objetivos pessoais.";
  };

  const getJournalEntriesForDate = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return journalEntries[dateStr] || [];
  };

  const hasJournalEntriesForDate = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return journalEntries[dateStr] && journalEntries[dateStr].length > 0;
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

  // Routine builder handlers
  const handleRoutineHabitToggle = (habitId: string) => {
    setRoutineSelectedHabits(prev => 
      prev.includes(habitId) 
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleRoutineHabitDelete = (habitId: string) => {
    setRoutineHabits(prev => prev.filter(h => h.id !== habitId));
    setRoutineSelectedHabits(prev => prev.filter(id => id !== habitId));
    setRoutineCustomHabits(prev => prev.filter(h => h.id !== habitId));
  };

  const handleRoutineAddCustomHabit = (habitName: string) => {
    const customHabit = {
      id: `custom-${Date.now()}`,
      name: habitName,
      icon: "✨",
      description: "Hábito personalizado",
      category: "Personalizado",
      info: {
        whyDo: "Este é um hábito personalizado criado por você. Desenvolva sua própria motivação e descubra os benefícios únicos que ele pode trazer para sua vida.",
        howDo: "Como este é seu hábito personalizado, você é quem melhor sabe como executá-lo. Defina os passos específicos e mantenha consistência na execução."
      }
    };
    
    setRoutineCustomHabits(prev => [...prev, customHabit]);
    setRoutineHabits(prev => [...prev, customHabit]);
    setRoutineSelectedHabits(prev => [...prev, customHabit.id]);
  };

  const handleRoutineComplete = () => {
    const today = new Date().toISOString().slice(0,10);
    const allHabits = [...routineHabits, ...routineCustomHabits];
    const selectedHabitsData = allHabits.filter(h => routineSelectedHabits.includes(h.id));
    
    const daily = selectedHabitsData.map(habit => ({
      id: habit.id,
      name: habit.name,
      icon: habit.icon || '⚔️',
      description: habit.description || 'Desafio do dia',
      category: 'Caverna',
      energyBoost: 3,
      connectionBoost: 2,
      skillBoost: 2,
      completed: false,
      date: today,
      info: habit.info || {
        whyDo: 'Hábito selecionado no montador de rotina.',
        howDo: 'Execute-o da melhor forma que fizer sentido para você hoje.'
      }
    }));
    
    localStorage.setItem('dailyHabits', JSON.stringify(daily));
    setShowRoutineBuilder(false);
    
    // Reload habits
    window.location.reload();
    
    toast.success("Rotina atualizada com sucesso!");
  };

  const openRoutineBuilder = () => {
    // Reset state
    setRoutineHabits(defaultHabits.slice(0, 6));
    setRoutineSelectedHabits([]);
    setRoutineCustomHabits([]);
    
    // Load current selected habits from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('dailyHabits') || '[]');
      const today = new Date().toISOString().slice(0,10);
      const todayHabits = stored.filter((h: any) => h.date === today);
      const selectedIds = todayHabits.map((h: any) => h.id);
      setRoutineSelectedHabits(selectedIds);
    } catch {}
    
    setShowRoutineBuilder(true);
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
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => setShowJournalCalendar(true)}
                >
                  <BookOpen className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
                </Button>
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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

          <Card 
            className="bg-blue-500/10 border-blue-500/20 cursor-pointer hover:bg-blue-500/20 transition-colors"
            onClick={() => setShowJournalCalendar(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Diário</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-500">
                  {Object.keys(journalEntries).length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Dias registrados</div>
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
                onClick={openRoutineBuilder}
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

        {/* Archetype Selection Prompt */}
        {shadowsDefeated >= 1 && (
          <Card className="bg-gradient-to-r from-purple-500/10 to-primary/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold text-purple-500">Mensagem do Oráculo</h3>
                    <p className="text-sm text-muted-foreground">
                      "Agora que você venceu sua primeira sombra, você pode escolher seu arquétipo e começar a se tornar a pessoa que você quer ser:"
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/onboarding')}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Escolher Arquétipo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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

      {/* Journal Calendar Dialog */}
      <Dialog open={showJournalCalendar} onOpenChange={(open) => { if (!open) setShowJournalCalendar(false); }}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Histórico do Diário
            </DialogTitle>
            <DialogDescription>
              Clique em uma data para ver suas reflexões do dia. Dias com entradas aparecerão destacados.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedCalendarDate}
                onSelect={setSelectedCalendarDate}
                locale={ptBR}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasEntries: (date) => hasJournalEntriesForDate(date)
                }}
                modifiersStyles={{
                  hasEntries: { 
                    backgroundColor: 'hsl(var(--primary))', 
                    color: 'hsl(var(--primary-foreground))',
                    fontWeight: 'bold'
                  }
                }}
              />
            </div>
            <div className="space-y-4">
              {selectedCalendarDate ? (
                <>
                  <h3 className="text-lg font-semibold">
                    Reflexões de {format(selectedCalendarDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </h3>
                  {getJournalEntriesForDate(selectedCalendarDate).length > 0 ? (
                    <div className="space-y-4">
                      {getJournalEntriesForDate(selectedCalendarDate).map((entry: any, index: number) => (
                        <Card key={index} className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <h4 className="font-medium">{entry.habitName}</h4>
                              <span className="text-xs text-muted-foreground ml-auto">
                                {format(new Date(entry.timestamp), "HH:mm")}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {entry.entry}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhuma reflexão encontrada para este dia.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Selecione uma data para ver suas reflexões.</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Journal Dialog */}
      <Dialog open={showJournalDialog} onOpenChange={(open) => { if (!open) setShowJournalDialog(false); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {currentJournalHabit?.name}
            </DialogTitle>
            <DialogDescription>
              {currentJournalHabit && getJournalInstructions(currentJournalHabit.name)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="journal-entry">Sua reflexão:</Label>
              <Textarea
                id="journal-entry"
                placeholder="Escreva sua reflexão aqui..."
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="mt-2 min-h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJournalDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleJournalSave}>
              Salvar e Completar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Routine builder dialog */}
      <Dialog open={showRoutineBuilder} onOpenChange={(open) => { if (!open) setShowRoutineBuilder(false); }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar seus desafios diários</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <HabitSelectionStep
              habits={routineHabits}
              selectedHabits={routineSelectedHabits}
              onHabitToggle={handleRoutineHabitToggle}
              onHabitDelete={handleRoutineHabitDelete}
              onAddCustomHabit={handleRoutineAddCustomHabit}
              onComplete={handleRoutineComplete}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CavernaDashboard;