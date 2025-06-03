
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Coins, ShoppingCart } from "lucide-react";

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
      
      <Button size="lg" onClick={onNext}>
        <Coins className="mr-2 h-4 w-4" />
        Iniciar Jornada
      </Button>
    </div>
  );
};

export default WelcomeStep;
