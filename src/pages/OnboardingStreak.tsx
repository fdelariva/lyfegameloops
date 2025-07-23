import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle, Calendar, Plus, Check, X } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import { Input } from "@/components/ui/input";

const OnboardingStreak = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [streakDays, setStreakDays] = useState(0);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [customHabit, setCustomHabit] = useState("");
  const [showCustomHabitInput, setShowCustomHabitInput] = useState(false);
  const [habits, setHabits] = useState([
    { id: "h1", name: "Arrumar sua cama", icon: "🛏️", description: "Organizar e arrumar a cama ao acordar", category: "Manhã" },
    { id: "h2", name: "Escovar os dentes", icon: "🦷", description: "Cuidar da higiene bucal", category: "Higiene" },
    { id: "h3", name: "Lavar meu rosto pela manhã", icon: "💧", description: "Refrescar o rosto ao acordar", category: "Higiene" },
    { id: "h4", name: "Levantar da cadeira e fazer 1 alongamento", icon: "🤸‍♂️", description: "Movimentar o corpo durante o dia", category: "Movimento" },
    { id: "h5", name: "Fazer algo que me faz feliz", icon: "😊", description: "Dedicar tempo para atividades prazerosas", category: "Bem-estar" },
    { id: "h6", name: "Fazer 3 respirações profundas", icon: "🌬️", description: "Relaxar com exercícios de respiração", category: "Mindfulness" },
    { id: "h7", name: "Beber 1 copo de água", icon: "💧", description: "Manter-se hidratado", category: "Saúde" }
  ]);

  // Recompensas pelo streak
  const streakRewards = [
    { days: 3, reward: "+50 moedas", icon: "🪙" },
    { days: 7, reward: "+100 moedas", icon: "💰" },
    { days: 14, reward: "Acessório exclusivo", icon: "👑" },
    { days: 30, reward: "Item raro", icon: "🏆" },
    { days: 60, reward: "Peça de avatar lendária", icon: "✨" }
  ];

  const handleHabitToggle = (habitId: string) => {
    if (selectedHabits.includes(habitId)) {
      setSelectedHabits(selectedHabits.filter(id => id !== habitId));
    } else {
      setSelectedHabits([...selectedHabits, habitId]);
    }
  };

  const handleAddCustomHabit = () => {
    if (customHabit.trim()) {
      const newHabit = {
        id: `custom-${Date.now()}`,
        name: customHabit.trim(),
        icon: "✨",
        description: "Hábito personalizado",
        category: "Personalizado"
      };
      setHabits([...habits, newHabit]);
      setSelectedHabits([...selectedHabits, newHabit.id]);
      setCustomHabit("");
      setShowCustomHabitInput(false);
      toast.success("Hábito customizado adicionado!");
    }
  };

  const handleSimulateStreak = () => {
    const interval = setInterval(() => {
      setStreakDays(prev => {
        const newValue = prev + 1;
        if (newValue >= 7) {
          clearInterval(interval);
        }
        return newValue;
      });
    }, 500);
  };

  const handleCompleteOnboarding = () => {
    if (selectedHabits.length === 0) {
      toast.error("Selecione pelo menos um hábito para continuar!");
      return;
    }
    toast.success("Onboarding completo!");
    toast("Seu streak inicial!", {
      description: "+3 dias de streak adicionados para começar!",
    });
    navigate("/dashboard");
  };

  // Renderiza os passos do onboarding
  const renderStep = () => {
    switch (step) {
      case 1: // Introdução ao conceito de streak
        return (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6">Streak Acelerado 🔥</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Mantenha seu streak para crescer mais rápido! Complete hábitos diariamente e desbloqueie recompensas especiais.
            </p>
            
            <div className="w-full max-w-sm mb-8">
              <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-300">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="text-6xl mb-4">🔥</div>
                  <h3 className="text-xl font-bold mb-2">Poder do Streak</h3>
                  <p className="text-sm text-center mb-4">
                    A cada dia consecutivo de hábitos completados, seu streak aumenta, multiplicando suas recompensas!
                  </p>
                  <Badge className="bg-orange-500">+100% de bônus por dia</Badge>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500"
              onClick={() => setStep(2)}
            >
              Entender o Streak
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      
      case 2: // Demonstração do streak
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Como Funciona o Streak</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
              Veja como seu streak cresce e multiplica suas recompensas ao longo do tempo.
            </p>
            
            <Card className="w-full max-w-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">🔥</span> 
                  Seu Streak: {streakDays} dias
                </CardTitle>
                <CardDescription>
                  Cada dia adiciona multiplicadores às suas recompensas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Progresso para próxima recompensa</span>
                    <span>{streakDays}/7 dias</span>
                  </div>
                  <Progress value={(streakDays / 7) * 100} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  {streakRewards.map((reward) => (
                    <div 
                      key={reward.days} 
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        streakDays >= reward.days 
                          ? "bg-orange-100 border-orange-300" 
                          : "bg-muted border-transparent"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="text-xl mr-3">{reward.icon}</div>
                        <div>
                          <div className="font-medium">{reward.days} dias</div>
                          <div className="text-sm text-muted-foreground">{reward.reward}</div>
                        </div>
                      </div>
                      {streakDays >= reward.days && (
                        <CheckCircle className="h-5 w-5 text-orange-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                {streakDays === 0 && (
                  <Button 
                    onClick={handleSimulateStreak} 
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500"
                  >
                    Simular Streak
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <Button 
              size="lg"
              onClick={() => setStep(3)}
              className={streakDays > 0 ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
              disabled={streakDays === 0}
            >
              Continuar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 3: // Escolha de hábitos iniciais
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Escolha Seus Hábitos</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
              Selecione os hábitos que você quer fazer para construir seu streak diário.
            </p>
            
            <div className="w-full max-w-2xl mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-sm">
                  {selectedHabits.length} hábitos selecionados
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomHabitInput(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Hábito Customizado
                </Button>
              </div>

              {showCustomHabitInput && (
                <Card className="mb-4 border-orange-400 bg-orange-50">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {habits.map((habit) => (
                  <Card 
                    key={habit.id}
                    className={`cursor-pointer transition border-2 ${
                      selectedHabits.includes(habit.id) 
                        ? 'border-orange-400 bg-orange-100' 
                        : 'border-transparent hover:border-orange-400'
                    }`}
                    onClick={() => handleHabitToggle(habit.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{habit.icon}</span>
                          <CardTitle className="text-base">{habit.name}</CardTitle>
                        </div>
                        {selectedHabits.includes(habit.id) && (
                          <Check className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-2">
                        {habit.description}
                      </CardDescription>
                      <Badge variant="outline" className="text-xs">
                        {habit.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                Dica: Comece com hábitos simples e rápidos para manter seu streak!
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500"
              onClick={() => setStep(4)}
              disabled={selectedHabits.length === 0}
            >
              Confirmar Seleção ({selectedHabits.length} hábitos)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 4: // Visualização do avatar e finalização
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Pronto Para Começar!</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
              Seu avatar evoluirá mais rápido quanto maior for seu streak.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Seu Avatar</CardTitle>
                  <CardDescription>
                    Ele evolui com seu streak!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <UserAvatar 
                    level={1}
                    archetype="Guerreiro"
                    energy={25}
                    connection={20}
                    skill={15}
                    showPreview={true}
                    previewLevel={3}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" /> 
                    Calendário de Streak
                  </CardTitle>
                  <CardDescription>
                    Mantenha seu progresso diário
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 14 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square flex items-center justify-center text-sm rounded-md ${
                          i < 3 
                            ? "bg-orange-100 text-orange-800" 
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i < 3 ? (
                          <div className="text-xs">🔥</div>
                        ) : (
                          <div className="text-xs">{i + 1}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Hoje</span>
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        +100% bônus
                      </Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500"
              onClick={handleCompleteOnboarding}
            >
              Começar Minha Jornada
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-orange-50">
      <div className="w-full max-w-4xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingStreak;
