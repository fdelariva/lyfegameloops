import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, Zap, BookOpen, Calendar, CheckCircle } from "lucide-react";

interface CavernaChallengeStepProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CavernaChallengeStep = ({ onAccept, onDecline }: CavernaChallengeStepProps) => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
      {/* Oracle Image */}
      <div className="mb-8">
        <img 
          src="/lovable-uploads/d43b4096-ba1e-404a-9b10-1e22c3ac310a.png" 
          alt="Oráculo Aristos" 
          className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
        />
      </div>

      {/* Oracle Message */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl mb-8">
        <h2 className="text-3xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
          Oráculo Aristos
        </h2>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Parabéns por escolher seus hábitos iniciais! Agora, eu tenho uma proposta especial para você.
        </p>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Na primeira semana, junto com os hábitos que você escolheu, você pode ter acesso à 
          <span className="font-bold text-primary"> Caverna da Sabedoria</span>, onde receberá 
          lições sobre as três dimensões do desenvolvimento pessoal:
        </p>
      </div>

      {/* Three Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <Card className="bg-orange-medium/10 border-orange-medium/20">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-orange-medium" />
            <h3 className="font-bold text-lg mb-2">Habilidade</h3>
            <p className="text-sm text-muted-foreground">Trabalho</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-medium/10 border-purple-medium/20">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-purple-medium" />
            <h3 className="font-bold text-lg mb-2">Conexão</h3>
            <p className="text-sm text-muted-foreground">Relacionamentos</p>
          </CardContent>
        </Card>
        
        <Card className="bg-teal-medium/10 border-teal-medium/20">
          <CardContent className="p-6 text-center">
            <Zap className="h-12 w-12 mx-auto mb-4 text-teal-medium" />
            <h3 className="font-bold text-lg mb-2">Energia</h3>
            <p className="text-sm text-muted-foreground">Física, Mental e Espiritual</p>
          </CardContent>
        </Card>
      </div>

      {/* Challenge Description */}
      <Card className="bg-gradient-to-r from-purple-600/10 to-primary/10 border-purple-600/20 mb-8 w-full">
        <CardContent className="p-8 text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-purple-600" />
          <h3 className="text-2xl font-bold mb-4">Desafio de 7 Dias</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Se você aceitar esse desafio, durante <span className="font-bold">sete dias</span> você 
            receberá lições diárias que lhe ajudarão a ter sucesso em adotar novos hábitos e 
            começar a mudar de vida.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>7 dias de conteúdo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Lições práticas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={onDecline}
          className="px-8"
        >
          Talvez depois
        </Button>
        <Button 
          onClick={onAccept}
          className="px-8 gradient-primary"
          size="lg"
        >
          Aceito o desafio!
        </Button>
      </div>
    </div>
  );
};

export default CavernaChallengeStep;