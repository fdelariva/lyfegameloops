
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import UserAvatar from "@/components/Avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, MapPin, Star, Gift } from "lucide-react";

const OnboardingFinch = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [petType, setPetType] = useState<"Pássaro" | "Gato" | "Dragão" | "Coelho" | "Indefinido">("Indefinido");
  const [petName, setPetName] = useState("");
  const [energy, setEnergy] = useState(100);
  const [mood, setMood] = useState("Feliz");
  const [mapProgress, setMapProgress] = useState(0);

  const pets = [
    {
      name: "Pássaro",
      emoji: "🐦",
      description: "Companheiro alegre que adora viajar e explorar novos lugares contigo.",
      traits: "Curioso / Aventureiro / Otimista",
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Gato",
      emoji: "🐱",
      description: "Amigo tranquilo que valoriza momentos de paz e autocuidado.",
      traits: "Calmo / Observador / Sábio",
      color: "bg-purple-50 border-purple-200"
    },
    {
      name: "Dragão",
      emoji: "🐲",
      description: "Guardião poderoso que te encoraja a superar qualquer desafio.",
      traits: "Corajoso / Motivador / Protetor",
      color: "bg-red-50 border-red-200"
    },
    {
      name: "Coelho",
      emoji: "🐰",
      description: "Companheiro gentil que celebra cada pequena vitória contigo.",
      traits: "Gentil / Encorajador / Empático",
      color: "bg-green-50 border-green-200"
    }
  ];

  const handleSelectPet = (selected: "Pássaro" | "Gato" | "Dragão" | "Coelho") => {
    setPetType(selected);
    setStep(3);
  };

  const handleNamePet = (name: string) => {
    setPetName(name);
    setStep(4);
  };

  const handleFirstActivity = () => {
    setEnergy(120);
    setMapProgress(10);
    toast.success("Primeira conexão!", {
      description: `${petName} se sente mais próximo de você! (+20 energia)`,
    });
    toast("Progresso no Mapa!", {
      description: "Vocês descobriram um novo local para explorar!",
    });
  };

  const handleSecondActivity = () => {
    setEnergy(150);
    setMapProgress(25);
    setMood("Radiante");
    toast.success("Vínculo Fortalecido!", {
      description: `${petName} está radiante de felicidade!`,
    });
    toast("Novo Desbloqueável!", {
      description: "🎁 Acessório especial desbloqueado para seu pet!",
    });
  };

  const handleCompleteOnboarding = () => {
    toast.success("Jornada Iniciada!", {
      description: `Você e ${petName} são agora companheiros inseparáveis!`,
    });
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Introdução ao mundo afetivo
        return (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6">🌸 Encontre seu Companheiro</h1>
            <p className="text-muted-foreground mb-8">
              Inicie uma jornada de autocuidado ao lado de um amigo especial que crescerá com você.
            </p>
            
            <div className="w-full max-w-xs mb-8">
              <div className="relative h-32 flex items-center justify-center">
                <div className="absolute transform animate-fade-in animate-bounce">
                  <div className="text-6xl">💖</div>
                  <div className="absolute -top-4 -right-4 bg-pink-500 text-white text-xs rounded-full px-2 py-1">
                    Amor
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Cultive afeto, não disciplina. Seu bem-estar importa.
              </p>
            </div>
            
            <Card className="mb-6 bg-pink-50 border-pink-200 w-full max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  Autocuidado Afetivo
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">🌱</div>
                  <div className="text-xs">Crescimento Suave</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">🤗</div>
                  <div className="text-xs">Vínculo Afetivo</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">✨</div>
                  <div className="text-xs">Micro Momentos</div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-center text-muted-foreground">
                Seu progresso interno reflete no crescimento do seu pet
              </CardFooter>
            </Card>
            
            <Button size="lg" onClick={() => setStep(2)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Conhecer meu Companheiro
            </Button>
          </div>
        );
      
      case 2: // Escolha do pet/companheiro
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">💫 Escolha seu Companheiro de Jornada</h2>
            <p className="text-muted-foreground text-center mb-6">
              Cada companheiro tem uma personalidade única e crescerá refletindo seu autocuidado.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {pets.map((pet) => (
                <Card 
                  key={pet.name}
                  className={`cursor-pointer transition hover:border-pink-300 ${pet.color} ${
                    petType === pet.name ? 'border-pink-400 bg-pink-50' : ''
                  }`}
                  onClick={() => handleSelectPet(pet.name as any)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-3xl">{pet.emoji}</span>
                      {pet.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">
                      {pet.description}
                    </CardDescription>
                    <div className="text-xs text-pink-600 font-medium">
                      {pet.traits}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3: // Nomear o pet
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">💝 Dê um Nome ao seu Companheiro</h2>
            <p className="text-muted-foreground text-center mb-6">
              Seu {petType.toLowerCase()} está ansioso para conhecer o nome que você escolheu!
            </p>
            
            <div className="bg-card border rounded-lg p-6 w-full max-w-sm mb-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">
                  {pets.find(p => p.name === petType)?.emoji}
                </div>
                <div className="text-sm text-muted-foreground">
                  Seu novo companheiro {petType}
                </div>
              </div>
              
              <div className="mt-4">
                <input 
                  type="text" 
                  placeholder="Digite um nome..."
                  className="w-full p-3 border rounded-lg text-center text-lg"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  maxLength={15}
                />
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="mb-4"
              onClick={() => handleNamePet(petName)}
              disabled={!petName.trim()}
            >
              Confirmar Nome
            </Button>
          </div>
        );

      case 4: // Primeira micro atividade
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">🌸 Primeira Conexão com {petName}</h2>
            <p className="text-muted-foreground text-center mb-6">
              Vamos começar com duas atividades simples para fortalecer seu vínculo com {petName}.
            </p>
            
            <div className="bg-card border rounded-lg p-6 w-full max-w-sm mb-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">
                  {pets.find(p => p.name === petType)?.emoji}
                </div>
                <div className="font-semibold">{petName}</div>
                <div className="text-sm text-muted-foreground mb-3">Humor: {mood}</div>
                
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-pink-500" />
                    Energia
                  </span>
                  <span className="text-pink-600 font-bold">{energy}/200</span>
                </div>
                <Progress value={(energy/200) * 100} className="h-2 mb-3" />
                
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    Exploração
                  </span>
                  <span className="text-blue-600 font-bold">{mapProgress}%</span>
                </div>
                <Progress value={mapProgress} className="h-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-6">
              <Card className="border-pink-200 bg-pink-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">🌬️ Respiração Consciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    Respire fundo com {petName} e sintam a calma juntos.
                  </CardDescription>
                  <div className="flex gap-2">
                    <Badge className="bg-pink-100 text-pink-700">+20 Energia</Badge>
                    <Badge className="bg-blue-100 text-blue-700">Exploração</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleFirstActivity}
                    className="w-full"
                    disabled={energy > 100}
                  >
                    {energy > 100 ? "✅ Conexão Feita" : "Respirar Juntos"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-pink-200 bg-pink-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">💭 Momento de Gratidão</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    Compartilhe um pensamento de gratidão com {petName}.
                  </CardDescription>
                  <div className="flex gap-2">
                    <Badge className="bg-pink-100 text-pink-700">+30 Energia</Badge>
                    <Badge className="bg-yellow-100 text-yellow-700">🎁 Desbloqueável</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSecondActivity}
                    className="w-full"
                    disabled={energy < 120 || mood === "Radiante"}
                  >
                    {mood === "Radiante" ? "✅ Gratidão Compartilhada" : energy >= 120 ? "Agradecer Juntos" : "Bloqueado"}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {mood === "Radiante" && (
              <Button 
                size="lg" 
                onClick={handleCompleteOnboarding}
                className="bg-gradient-to-r from-pink-500 to-purple-500"
              >
                <Gift className="mr-2 h-4 w-4" />
                Iniciar Jornada de Autocuidado
              </Button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-pink-50">
      <div className="w-full max-w-3xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingFinch;
