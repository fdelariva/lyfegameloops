import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import UserAvatar from "@/components/Avatar";
import AccessorySelection from "@/components/AccessorySelection";
import { Coins, Gift, ShoppingCart, Plus, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido">("Indefinido");
  const [showAccessorySelection, setShowAccessorySelection] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState("");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [customHabit, setCustomHabit] = useState("");
  const [showCustomHabitInput, setShowCustomHabitInput] = useState(false);
  const [habits, setHabits] = useState([
    { id: "h1", name: "Levantar da cama", icon: "🛏️", description: "Começar o dia saindo da cama", category: "Manhã" },
    { id: "h2", name: "Escovar os dentes", icon: "🦷", description: "Cuidar da higiene bucal", category: "Higiene" },
    { id: "h3", name: "Lavar meu rosto pela manhã", icon: "💧", description: "Refrescar o rosto ao acordar", category: "Higiene" },
    { id: "h4", name: "Levantar da cadeira e fazer 1 alongamento", icon: "🤸‍♂️", description: "Movimentar o corpo durante o dia", category: "Movimento" },
    { id: "h5", name: "Fazer algo que me faz feliz", icon: "😊", description: "Dedicar tempo para atividades prazerosas", category: "Bem-estar" },
    { id: "h6", name: "Fazer 3 respirações profundas", icon: "🌬️", description: "Relaxar com exercícios de respiração", category: "Mindfulness" },
    { id: "h7", name: "Beber 1 copo de água", icon: "💧", description: "Manter-se hidratado", category: "Saúde" }
  ]);

  // Simples definições de arquétipos para mostrar no onboarding
  const archetypes = [
    { 
      name: "Guerreiro", 
      description: "Focado em disciplina e energia física. Ideal para quem busca força e determinação.",
      strengths: "Energia +++ / Habilidade ++ / Conexão +",
    },
    { 
      name: "Mestre", 
      description: "Equilibrado em todas as áreas. Excelente para quem busca desenvolvimento completo.",
      strengths: "Energia ++ / Habilidade +++ / Conexão ++",
    },
    { 
      name: "Sábio", 
      description: "Especialista em conhecimento e habilidades. Perfeito para quem busca aprendizado e sabedoria.",
      strengths: "Energia + / Habilidade +++ / Conexão ++",
    },
    { 
      name: "Guardião", 
      description: "Excelente em conexões e relacionamentos. Ideal para quem valoriza vínculos e empatia.",
      strengths: "Energia ++ / Habilidade + / Conexão +++",
    },
    { 
      name: "Indefinido", 
      description: "Crie seu próprio caminho! Você define suas prioridades durante a jornada.",
      strengths: "Energia ++ / Habilidade ++ / Conexão ++",
    }
  ];

  const handleSelectArchetype = (selected: "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido") => {
    setArchetype(selected);
    setStep(3);
  };

  const handleAccessorySelect = (accessoryId: string) => {
    setSelectedAccessory(accessoryId);
  };

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

  const handleCompleteOnboarding = () => {
    if (selectedHabits.length === 0) {
      toast.error("Selecione pelo menos um hábito para continuar!");
      return;
    }
    toast.success("Onboarding completo!");
    toast("Bônus de boas-vindas!", {
      description: "+ 100 moedas adicionadas à sua conta!",
    });
    navigate("/dashboard");
  };

  // Renderiza os passos do onboarding
  const renderStep = () => {
    switch (step) {
      case 1: // Tela de boas-vindas
        return (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Lyfe!</h1>
            <p className="text-muted-foreground mb-8">
              Inicie sua jornada de desenvolvimento pessoal e veja seu avatar evoluir a cada hábito conquistado.
            </p>
            <div className="w-full max-w-xs mb-8">
              <div className="relative h-32 flex items-center justify-center">
                <div className="absolute transform animate-fade-in animate-bounce">
                  <div className="text-6xl">🎁</div>
                  <div className="absolute -top-4 -right-4 bg-primary text-white text-xs rounded-full px-2 py-1">
                    +100
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Ganhe 100 moedas para começar sua jornada!
              </p>
            </div>
            
            <Card className="mb-6 bg-primary/5 w-full max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Loja de Recompensas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">🎩</div>
                  <div className="text-xs">Itens para Avatar</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">🏋️</div>
                  <div className="text-xs">Cupons de Desconto</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">⚡</div>
                  <div className="text-xs">Boosts Especiais</div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-center text-muted-foreground">
                Troque suas moedas por recompensas exclusivas!
              </CardFooter>
            </Card>
            
            <Button size="lg" onClick={() => setStep(2)}>
              <Coins className="mr-2 h-4 w-4" />
              Iniciar Jornada
            </Button>
          </div>
        );
      
      case 2: // Seleção de arquétipo
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Escolha seu Arquétipo</h2>
            <p className="text-muted-foreground text-center mb-6">
              Seu arquétipo influencia como seu avatar evolui e quais características serão destacadas.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {archetypes.map((type) => (
                <Card 
                  key={type.name}
                  className={`cursor-pointer transition hover:border-primary ${
                    archetype === type.name ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleSelectArchetype(type.name as any)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle>{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">
                      {type.description}
                    </CardDescription>
                    <div className="text-xs text-primary font-medium">
                      {type.strengths}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3: // Previsão do avatar
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Desbloqueie seu Potencial</h2>
            <p className="text-muted-foreground text-center mb-6">
              Como {archetype}, você tem um potencial único. Veja como pode ser sua evolução!
            </p>
            
            <div className="bg-card border rounded-lg p-6 w-full max-w-sm mb-6">
              <UserAvatar 
                level={1} 
                archetype={archetype}
                energy={25}
                connection={20}
                skill={15}
                showPreview={true}
                previewLevel={5}
              />
              
              <div className="mt-6 text-center">
                <p className="text-sm font-medium">
                  Complete os desafios diários para evoluir seu avatar!
                </p>
                <p className="text-sm text-primary font-medium mt-2">
                  Hoje você pode chegar ao nível 2!
                </p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="mb-4"
              onClick={() => setShowAccessorySelection(true)}
            >
              Escolher Acessório Inicial
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setStep(4)}
            >
              Pular Personalização
            </Button>
            
            <AccessorySelection 
              isOpen={showAccessorySelection}
              onClose={() => setShowAccessorySelection(false)}
              onSelect={(accessoryId) => {
                handleAccessorySelect(accessoryId);
                setStep(4);
              }}
            />
          </div>
        );

      case 4: // Seleção de hábitos iniciais
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Escolha seus Hábitos Iniciais</h2>
            <p className="text-muted-foreground text-center mb-6">
              Selecione os hábitos que você quer fazer e remova os que não quer. Você pode adicionar hábitos personalizados também!
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
                <Card className="mb-4 border-primary bg-primary/5">
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
                        ? 'border-primary bg-primary/10' 
                        : 'border-transparent hover:border-primary/50'
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
                          <Check className="h-5 w-5 text-primary" />
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
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Dica: Você pode alterar seus hábitos a qualquer momento no dashboard!
              </p>
              <Button 
                size="lg" 
                onClick={handleCompleteOnboarding}
                disabled={selectedHabits.length === 0}
              >
                Começar Minha Jornada ({selectedHabits.length} hábitos)
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-3xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
