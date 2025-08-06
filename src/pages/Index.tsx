
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sword, ArrowRight, Shield, Target, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleBattleShadows = () => {
    navigate("/caverna-do-desafio");
  };

  const handleStartJourney = () => {
    navigate("/onboarding-q3", { state: { skipWelcome: true } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="text-center max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
          Habit Quest
        </h1>
        
        {/* Aristos Introduction */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 border-blue-200 max-w-3xl mx-auto">
            <CardContent className="p-8">
              {/* Aristos Image */}
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/d43b4096-ba1e-404a-9b10-1e22c3ac310a.png" 
                  alt="Aristos - Seu guia no Lyfe" 
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Welcome Message */}
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
                  <Brain className="h-6 w-6" />
                  Bem-vindo, Herói da Sua Própria Jornada
                </h2>
                
                <p className="text-lg leading-relaxed">
                  Você não é preguiçoso. Seu cérebro está reagindo ao ambiente, mas <strong>você pode entender quem comanda isso dentro de você</strong>.
                </p>
                
                <p className="leading-relaxed">
                  A dopamina te guia sem que você perceba, muitas vezes para o lugar errado. Seu cérebro ainda age como se você estivesse na selva, buscando segurança mesmo que te afaste do que importa. Hoje, dopamina é liberada sem esforço, te drenando. <strong>Uma indústria inteira se aproveita disso</strong> - seu tempo, foco e atenção viraram moeda.
                </p>
                
                <p className="leading-relaxed">
                  Seu cérebro quer te poupar, não te sabotar. Mas isso te prende no ciclo confortável. <strong>É hora de quebrar esse ciclo</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Journey Explanation */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Sua Jornada de Transformação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sword className="h-5 w-5 text-red-600" />
                    1. Enfrente Suas Sombras
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Batalhe contra a preguiça, procrastinação, uso excessivo de telas e ansiedade.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    2. Escolha Seu Arquétipo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Defina quem você quer se tornar e receba orientação personalizada.
                  </p>
                </div>
                
                <div className="space-y-3 md:col-span-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    3. Desenvolva Hábitos Transformadores
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Com Aristos como seu guia, encontre hábitos e rotinas que, feitos consistentemente, vão mudar sua vida e te ajudar a se tornar a pessoa que você quer ser.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <Card className="flex-1 bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <Sword className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-bold text-lg mb-2">Batalhar com as Sombras</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enfrente suas sombras internas agora e prove seu valor como herói
              </p>
              <Button 
                onClick={handleBattleShadows}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                <Sword className="mr-2 h-4 w-4" />
                Entrar na Caverna
              </Button>
            </CardContent>
          </Card>

          <Card className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Estou Pronto para a Mudança</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comece sua transformação, as sombras aparecerão quando necessário
              </p>
              <Button 
                onClick={handleStartJourney}
                className="w-full gradient-primary"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Começar Jornada
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            "O herói não nasce herói. Ele se torna herói enfrentando seus medos e escolhendo crescer a cada dia."
          </p>
          <p className="text-xs text-muted-foreground mt-2">— Aristos, seu Oracle Pessoal</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
