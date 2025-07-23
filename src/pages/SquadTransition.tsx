import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SquadTransition = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">👥</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Transformar em Squad
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Como você quer prosseguir com seu squad?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className="cursor-pointer transition hover:border-purple-500 hover:shadow-lg"
            onClick={() => navigate("/onboarding-competitive?mode=current")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-600/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-xl mb-4 text-green-600">Manter Desafio Atual</h3>
              <p className="text-muted-foreground mb-6">
                Continue com os hábitos e arquétipo que você já escolheu, 
                mas agora em modo colaborativo com seu squad.
              </p>
              <div className="space-y-2 mb-6">
                <Badge variant="outline" className="mr-2">Seus Hábitos</Badge>
                <Badge variant="outline" className="mr-2">Seu Arquétipo</Badge>
                <Badge variant="outline">Modo Squad</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                ✅ Mantém sua progressão atual<br/>
                ✅ Convida amigos para o mesmo desafio
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition hover:border-blue-500 hover:shadow-lg"
            onClick={() => navigate("/onboarding-competitive")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-600/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">⚔️</span>
              </div>
              <h3 className="font-bold text-xl mb-4 text-blue-600">Escolher Novo Desafio</h3>
              <p className="text-muted-foreground mb-6">
                Explore os desafios épicos pré-definidos e forme um squad 
                para uma aventura completamente nova.
              </p>
              <div className="space-y-2 mb-6">
                <Badge variant="outline" className="mr-2">Desafios Épicos</Badge>
                <Badge variant="outline" className="mr-2">Novos Objetivos</Badge>
                <Badge variant="outline">Competição</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                ⚡ Desafios especializados<br/>
                🏆 Rankings competitivos
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          variant="outline" 
          onClick={() => navigate("/caverna-do-desafio")}
          className="text-lg px-8 py-4"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default SquadTransition;