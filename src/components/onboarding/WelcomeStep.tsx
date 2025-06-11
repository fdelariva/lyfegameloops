
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Brain } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
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
      
      <Card className="mb-6 bg-purple-50 border-purple-200 w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Conheça Aristos, seu Guia
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/6ac0332f-f7f4-4925-b805-30e165e8a7a4.png" 
              alt="Aristos - Seu guia no Lyfe" 
              className="w-32 h-32 object-contain"
            />
          </div>
          
          <div className="text-sm text-purple-800 space-y-3">
            <p className="font-semibold">
              "Olá, viajante. Meu nome é Aristos."
            </p>
            <p>
              Serei seu guia neste jogo. Você já sentiu que há um potencial dentro de você, mas algo te impede? Distração, procrastinação, falta de disciplina...
            </p>
            <p>
              Vamos identificar essas barreiras e criar sua trilha rumo ao seu verdadeiro potencial.
            </p>
          </div>
          
          <div className="text-xs text-purple-600 bg-purple-100 p-3 rounded-lg">
            <h4 className="font-semibold mb-2">Como será nossa jornada juntos?</h4>
            <div className="text-left space-y-2">
              <p>1. Vou entender seus objetivos e barreiras. Com isso, definiremos juntos desafios para que você alcance seus objetivos.</p>
              <p>2. Criaremos comportamentos que desenvolverão sua energia, habilidade e conexão. Executar esses comportamentos fará seu personagem progredir de nível no jogo.</p>
              <p>3. Ao evoluir no jogo, você caminhará para alcançar sua melhor versão na vida real.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button size="lg" onClick={onNext}>
        <Coins className="mr-2 h-4 w-4" />
        Começar
      </Button>
    </div>
  );
};

export default WelcomeStep;
