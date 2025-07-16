import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skull, Zap, Smartphone } from "lucide-react";

interface CavernaDesafioStepProps {
  onContinue: () => void;
}

const CavernaDesafioStep = ({ onContinue }: CavernaDesafioStepProps) => {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center">
          <Skull className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
          Caverna do Desafio
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Agora que você compreende a sabedoria, é hora de enfrentar as sombras que impedem seu crescimento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-orange-600/10 border-orange-600/20">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-600/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">😴</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-orange-600">Sloth</h3>
            <p className="text-sm text-muted-foreground">
              A sombra da procrastinação que impede você de agir
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-600/10 border-blue-600/20">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-blue-600">Swache</h3>
            <p className="text-sm text-muted-foreground">
              A sombra da falta de energia que drena sua vitalidade
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-600/10 border-purple-600/20">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-purple-600">Vertigo</h3>
            <p className="text-sm text-muted-foreground">
              A sombra da distração e uso excessivo de dispositivos
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">📜</span>
            </div>
            <h3 className="font-bold text-lg">Pergaminhos Mágicos Necessários</h3>
          </div>
          <p className="text-muted-foreground">
            Para acessar a Caverna do Desafio, você precisa colecionar pergaminhos mágicos 
            completando lições na Caverna da Sabedoria. Cada pergaminho representa conhecimento 
            que você conquistou e te prepara para enfrentar essas sombras internas.
          </p>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-red-500/10 to-purple-600/10 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-4">🗡️ Como Funciona</h3>
        <ul className="text-left text-muted-foreground space-y-2">
          <li>• Cada sombra possui 7 batalhas intensas</li>
          <li>• Responda 4 perguntas sobre os desafios que ela representa</li>
          <li>• Execute uma ação prática para vencer a batalha</li>
          <li>• Colete cartas de vitória ao derrotar cada batalha</li>
          <li>• Derrote todas as 7 batalhas para vencer a sombra definitivamente</li>
        </ul>
      </div>

      <Button 
        size="lg" 
        onClick={onContinue}
        className="gradient-primary text-lg px-8 py-4"
      >
        Continuar Jornada
      </Button>
    </div>
  );
};

export default CavernaDesafioStep;