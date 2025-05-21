
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import UserAvatar from "@/components/Avatar";
import AccessorySelection from "@/components/AccessorySelection";
import { Coins, Gift, ShoppingCart } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido">("Indefinido");
  const [showAccessorySelection, setShowAccessorySelection] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState("");

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
              Recomendamos começar com apenas 2 hábitos para simplificar sua jornada inicial.
            </p>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-6">
              <Card className="border-primary bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Beber água regularmente</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    Beba pelo menos 2 litros de água por dia para melhorar sua energia.
                  </CardDescription>
                  <div className="flex gap-2">
                    <div className="text-xs bg-orange-50 px-2 py-1 rounded-full">
                      +10 Energia
                    </div>
                    <div className="text-xs bg-green-50 px-2 py-1 rounded-full">
                      +5 Habilidade
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Meditar por 5 minutos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    Uma meditação curta para acalmar a mente e melhorar o foco.
                  </CardDescription>
                  <div className="flex gap-2">
                    <div className="text-xs bg-blue-50 px-2 py-1 rounded-full">
                      +8 Conexão
                    </div>
                    <div className="text-xs bg-green-50 px-2 py-1 rounded-full">
                      +7 Habilidade
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              size="lg" 
              className="mb-4"
              onClick={handleCompleteOnboarding}
            >
              Começar Minha Jornada
            </Button>
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
