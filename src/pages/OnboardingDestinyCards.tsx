
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import AccessorySelection from "@/components/AccessorySelection";
import LuckyCards from "@/components/LuckyCards";

const OnboardingDestinyCards = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido">("Indefinido");
  const [showAccessorySelection, setShowAccessorySelection] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState("");
  const [showWelcomeCards, setShowWelcomeCards] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

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

  // Hábitos sugeridos baseados nas cartas do destino
  const suggestedHabits = [
    {
      id: "1",
      title: "Beber água regularmente",
      description: "Beba pelo menos 2 litros de água por dia para melhorar sua energia.",
      points: { energy: 10, skill: 5, connection: 0 },
      category: "Corpo"
    },
    {
      id: "2",
      title: "Meditar por 5 minutos",
      description: "Uma meditação curta para acalmar a mente e melhorar o foco.",
      points: { energy: 5, skill: 7, connection: 8 },
      category: "Mente" 
    },
    {
      id: "3",
      title: "Escrever 3 gratidões",
      description: "Anote três coisas pelas quais você é grato hoje.",
      points: { energy: 3, skill: 5, connection: 12 },
      category: "Conexão"
    },
    {
      id: "4",
      title: "Alongamento matinal",
      description: "5 minutos de alongamento ao acordar para energizar seu corpo.",
      points: { energy: 15, skill: 3, connection: 0 },
      category: "Corpo"
    }
  ];

  const handleSelectArchetype = (selected: "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido") => {
    setArchetype(selected);
    setStep(4); // Modificado para avançar para a etapa 4 (seleção de hábitos)
  };

  const handleAccessorySelect = (accessoryId: string) => {
    setSelectedAccessory(accessoryId);
  };

  const handleHabitSelection = (habitId: string) => {
    if (selectedHabits.includes(habitId)) {
      setSelectedHabits(selectedHabits.filter(id => id !== habitId));
    } else {
      // Limitar a 2 hábitos
      if (selectedHabits.length < 2) {
        setSelectedHabits([...selectedHabits, habitId]);
      } else {
        toast.info("Recomendamos começar com apenas 2 hábitos!");
      }
    }
  };

  const handleCompleteOnboarding = () => {
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
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-purple-500"
              onClick={() => setStep(2)}
            >
              Revelar Meu Destino
            </Button>
          </div>
        );
      
      case 2: // Introdução às Cartas do Destino
        return (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-6">As Cartas do Destino</h2>
            <p className="text-muted-foreground mb-6">
              As cartas do destino revelarão seu caminho único nesta jornada.
              Elas guiarão sua evolução e trarão recompensas especiais.
            </p>
            
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-lg mb-6">
              <Card className="w-full max-w-sm bg-card/95">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center gap-3 mb-4">
                    <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="text-white text-2xl">❓</div>
                    </div>
                    <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="text-white text-2xl">❓</div>
                    </div>
                    <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="text-white text-2xl">❓</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-1">Cartas de Boas-Vindas</h3>
                  <p className="text-sm text-muted-foreground">
                    As cartas mágicas podem revelar recompensas especiais e caminhos únicos para você.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col space-y-3 w-full max-w-sm">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-purple-500"
                onClick={() => {
                  setShowWelcomeCards(true);
                }}
              >
                Revelar Cartas de Boas-Vindas
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setStep(3)}
              >
                Pular Esta Etapa
              </Button>
            </div>
            
            <LuckyCards 
              isOpen={showWelcomeCards}
              onClose={() => {
                setShowWelcomeCards(false);
                setStep(3);
              }}
              guaranteedReward={true}
            />
          </div>
        );

      case 3: // Seleção de arquétipo
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Seu Caminho nas Cartas</h2>
            <p className="text-muted-foreground text-center mb-6">
              As cartas revelaram os caminhos possíveis para você. Escolha o arquétipo que ressoa com seu destino.
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

      case 4: // Cartas revelaram hábitos
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Hábitos Revelados</h2>
            <p className="text-muted-foreground text-center mb-6">
              As cartas do destino escolheram estes hábitos para sua jornada como {archetype}.
              Escolha até 2 para começar sua transformação.
            </p>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-6">
              {suggestedHabits.map((habit) => (
                <Card 
                  key={habit.id}
                  className={`cursor-pointer transition ${
                    selectedHabits.includes(habit.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleHabitSelection(habit.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{habit.title}</CardTitle>
                      <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {habit.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">
                      {habit.description}
                    </CardDescription>
                    <div className="flex gap-2">
                      {habit.points.energy > 0 && (
                        <div className="text-xs bg-orange-50 px-2 py-1 rounded-full">
                          +{habit.points.energy} Energia
                        </div>
                      )}
                      {habit.points.skill > 0 && (
                        <div className="text-xs bg-green-50 px-2 py-1 rounded-full">
                          +{habit.points.skill} Habilidade
                        </div>
                      )}
                      {habit.points.connection > 0 && (
                        <div className="text-xs bg-blue-50 px-2 py-1 rounded-full">
                          +{habit.points.connection} Conexão
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="w-full max-w-md">
              <div className="bg-primary/5 rounded-lg p-4 mb-4 text-center">
                <div className="text-sm font-medium mb-1">Carta Dourada</div>
                <p className="text-xs text-muted-foreground">
                  Uma carta dourada especial aparecerá amanhã se você completar seus hábitos hoje!
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500"
                onClick={handleCompleteOnboarding}
                disabled={selectedHabits.length === 0}
              >
                Começar Minha Jornada
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
      {step > 1 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-4 left-4"
          onClick={() => step > 1 && setStep(step - 1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      )}
      
      <div className="w-full max-w-3xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingDestinyCards;
