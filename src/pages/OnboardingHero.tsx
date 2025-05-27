
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import UserAvatar from "@/components/Avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sword, Wand2, Heart, Zap, Users, Trophy, Coins } from "lucide-react";

const OnboardingHero = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [heroClass, setHeroClass] = useState<"Guerreiro" | "Mago" | "Curandeiro" | "Ladino" | "Mestre">("Mestre");
  const [hp, setHP] = useState(50);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [hasEgg, setHasEgg] = useState(false);

  const classes = [
    { 
      name: "Guerreiro", 
      icon: <Sword className="h-8 w-8 text-red-500" />,
      description: "Especialista em hábitos físicos e disciplina. Ganha força através do treino.",
      abilities: "Força +++ / Resistência ++ / Fúria Motivacional",
      color: "bg-red-50 border-red-200"
    },
    { 
      name: "Mago", 
      icon: <Wand2 className="h-8 w-8 text-purple-500" />,
      description: "Mestre do aprendizado e criatividade. Expande a mente através do conhecimento.",
      abilities: "Inteligência +++ / Criatividade ++ / Visão do Futuro",
      color: "bg-purple-50 border-purple-200"
    },
    { 
      name: "Curandeiro", 
      icon: <Heart className="h-8 w-8 text-green-500" />,
      description: "Guardião da saúde mental e bem-estar. Cura a si mesmo e aos aliados.",
      abilities: "Constituição +++ / Empatia ++ / Benção Curativa",
      color: "bg-green-50 border-green-200"
    },
    { 
      name: "Ladino", 
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      description: "Especialista em habilidades sociais e networking. Ágil e versátil.",
      abilities: "Destreza +++ / Carisma ++ / Golpe da Sorte",
      color: "bg-yellow-50 border-yellow-200"
    }
  ];

  const handleSelectClass = (selected: "Guerreiro" | "Mago" | "Curandeiro" | "Ladino") => {
    setHeroClass(selected);
    setStep(3);
  };

  const handleCompleteFirstHabit = () => {
    setXP(50);
    toast.success("Quest Progresso!", {
      description: "+50 XP! Seu herói se sente mais forte!",
    });
    toast("Item Encontrado!", {
      description: "Você ganhou uma Poção de Experiência! (+10 XP extra)",
    });
  };

  const handleCompleteSecondHabit = () => {
    setXP(100);
    setLevel(2);
    setHasEgg(true);
    toast.success("Level Up!", {
      description: "Parabéns! Você alcançou o nível 2!",
    });
    toast("Recompensa Épica!", {
      description: "🥚 Ovo de Pet Misterioso obtido! Choca em 3 dias de consistência!",
    });
  };

  const handleCompleteOnboarding = () => {
    toast.success("Quest Completa!", {
      description: "Tutorial do Herói concluído! +100 Gold adicionado!",
    });
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Tela de boas-vindas RPG
        return (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6">🏰 Bem-vindo à sua Aventura!</h1>
            <p className="text-muted-foreground mb-8">
              Transforme sua vida numa jornada épica! Complete quests, evolua seu herói e desbloqueie recompensas incríveis.
            </p>
            
            <div className="w-full max-w-xs mb-8">
              <div className="relative h-32 flex items-center justify-center">
                <div className="absolute transform animate-fade-in animate-bounce">
                  <div className="text-6xl">⚔️</div>
                  <div className="absolute -top-4 -right-4 bg-primary text-white text-xs rounded-full px-2 py-1">
                    Quest
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Inicie sua primeira quest e ganhe 100 Gold!
              </p>
            </div>
            
            <Card className="mb-6 bg-primary/5 w-full max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Sistema de Recompensas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">🐉</div>
                  <div className="text-xs">Pets Épicos</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">⚔️</div>
                  <div className="text-xs">Equipamentos</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">🏆</div>
                  <div className="text-xs">Conquistas</div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-center text-muted-foreground">
                Complete quests para desbloquear recompensas!
              </CardFooter>
            </Card>
            
            <Button size="lg" onClick={() => setStep(2)}>
              <Sword className="mr-2 h-4 w-4" />
              Começar Aventura
            </Button>
          </div>
        );
      
      case 2: // Escolha da classe
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">⚔️ Escolha sua Classe de Herói</h2>
            <p className="text-muted-foreground text-center mb-6">
              Sua classe determina suas habilidades especiais e como você evolui durante a jornada.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {classes.map((cls) => (
                <Card 
                  key={cls.name}
                  className={`cursor-pointer transition hover:border-primary ${cls.color} ${
                    heroClass === cls.name ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleSelectClass(cls.name as any)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      {cls.icon}
                      {cls.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">
                      {cls.description}
                    </CardDescription>
                    <div className="text-xs text-primary font-medium">
                      {cls.abilities}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3: // Sistema de HP e preview do herói
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">🛡️ Seu Herói está Pronto!</h2>
            <p className="text-muted-foreground text-center mb-6">
              Como {heroClass}, você possui habilidades únicas. Mantenha seu HP alto completando hábitos!
            </p>
            
            <div className="bg-card border rounded-lg p-6 w-full max-w-sm mb-6">
              <UserAvatar 
                level={level} 
                archetype={heroClass}
                energy={25}
                connection={20}
                skill={15}
                showPreview={false}
              />
              
              {/* Sistema de HP */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    HP (Pontos de Vida)
                  </span>
                  <span className="text-red-600 font-bold">{hp}/50</span>
                </div>
                <Progress value={(hp/50) * 100} className="h-3 mb-2" />
                <p className="text-xs text-muted-foreground">
                  ⚠️ Falhar em hábitos reduz seu HP. HP = 0 significa perder Gold!
                </p>
              </div>

              {/* Sistema de XP */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-blue-500" />
                    XP (Experiência)
                  </span>
                  <span className="text-blue-600 font-bold">Nível {level}</span>
                </div>
                <Progress value={(xp/100) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  ✨ Complete hábitos para ganhar XP e subir de nível!
                </p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="mb-4"
              onClick={() => setStep(4)}
            >
              Iniciar Tutorial do Herói
            </Button>
          </div>
        );

      case 4: // Primeira Quest - Tutorial do Herói
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">🎯 Quest: Tutorial do Herói</h2>
            <p className="text-muted-foreground text-center mb-6">
              Complete seus primeiros 2 hábitos em 24h para provar que você é um verdadeiro herói!
            </p>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-6">
              <Card className="border-primary bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">💧 Beber água regularmente</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    Derrote o Monstro da Desidratação bebendo 2 litros de água.
                  </CardDescription>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-50 text-blue-700">+50 XP</Badge>
                    <Badge className="bg-orange-50 text-orange-700">70% Poção</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleCompleteFirstHabit}
                    className="w-full"
                    disabled={xp > 0}
                  >
                    {xp > 0 ? "✅ Completado" : "Derrotar Monstro"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">🧘 Meditar por 5 minutos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    Enfrente o Boss da Ansiedade com 5 minutos de meditação.
                  </CardDescription>
                  <div className="flex gap-2">
                    <Badge className="bg-purple-50 text-purple-700">+50 XP</Badge>
                    <Badge className="bg-yellow-50 text-yellow-700">🥚 Ovo Pet</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleCompleteSecondHabit}
                    className="w-full"
                    disabled={xp < 50 || level > 1}
                  >
                    {level > 1 ? "✅ Boss Derrotado" : xp >= 50 ? "Enfrentar Boss Final" : "Bloqueado"}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Progress da Quest */}
            <div className="w-full max-w-md mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso da Quest</span>
                <span>{level > 1 ? "100%" : xp >= 50 ? "50%" : "0%"}</span>
              </div>
              <Progress value={level > 1 ? 100 : xp >= 50 ? 50 : 0} className="h-3" />
            </div>

            {/* Party System Opcional */}
            {level > 1 && (
              <Card className="mb-4 bg-blue-50 border-blue-200 w-full max-w-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5" />
                    Sistema de Party
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Junte-se a outros heróis para completar quests épicas em grupo!
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Criar Party
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Entrar Party
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {level > 1 && (
              <Button 
                size="lg" 
                onClick={handleCompleteOnboarding}
              >
                <Coins className="mr-2 h-4 w-4" />
                Receber Recompensas (+100 Gold)
              </Button>
            )}
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

export default OnboardingHero;
