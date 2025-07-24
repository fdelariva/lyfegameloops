import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, UserPlus, Zap, Users, Brain, Trophy, Skull, Scroll } from "lucide-react";

interface CompetitorProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  competitor: {
    id: string;
    name: string;
    archetype: string;
    points: number;
    avatar: string;
    level: number;
    energy: number;
    connection: number;
    skill: number;
    challengesCompleted: number;
    shadowsCollected: number;
    scrollsCollected: number;
  } | null;
}

const CompetitorProfile = ({ isOpen, onClose, onBack, competitor }: CompetitorProfileProps) => {
  const [isInviting, setIsInviting] = useState(false);

  if (!competitor) return null;

  const handleInviteFriend = async () => {
    setIsInviting(true);
    
    // Simular envio do convite
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`Convite de amizade enviado para ${competitor.name}!`);
    setIsInviting(false);
  };

  const getArchetypeEmoji = (archetype: string) => {
    switch (archetype) {
      case "Guerreiro": return "⚔️";
      case "Mestre": return "🧙‍♂️";
      case "Sábio": return "📚";
      case "Guardião": return "🛡️";
      default: return "🎭";
    }
  };

  const totalAttributes = competitor.energy + competitor.connection + competitor.skill;
  const maxAttribute = Math.max(competitor.energy, competitor.connection, competitor.skill);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-1 h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            Perfil do Competidor
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Header do Perfil */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="text-3xl">
                  {competitor.avatar}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="text-xl font-bold mb-2">{competitor.name}</h3>
              
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge className="flex items-center gap-1">
                  {getArchetypeEmoji(competitor.archetype)}
                  {competitor.archetype}
                </Badge>
                <Badge variant="outline">
                  Nível {competitor.level}
                </Badge>
              </div>
              
              <div className="text-2xl font-bold text-primary mb-4">
                {competitor.points} pontos
              </div>
              
              <Button 
                onClick={handleInviteFriend}
                disabled={isInviting}
                className="w-full"
              >
                {isInviting ? (
                  "Enviando convite..."
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar como Amigo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Atributos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Atributos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Energia</span>
                  </div>
                  <span className="text-sm font-bold">{competitor.energy}</span>
                </div>
                <Progress value={(competitor.energy / maxAttribute) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Conexão</span>
                  </div>
                  <span className="text-sm font-bold">{competitor.connection}</span>
                </div>
                <Progress value={(competitor.connection / maxAttribute) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Habilidade</span>
                  </div>
                  <span className="text-sm font-bold">{competitor.skill}</span>
                </div>
                <Progress value={(competitor.skill / maxAttribute) * 100} className="h-2" />
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-bold text-primary">{totalAttributes}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conquistas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {competitor.challengesCompleted}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Desafios Completados
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Skull className="h-4 w-4 text-red-600" />
                    <span className="text-2xl font-bold text-red-600">
                      {competitor.shadowsCollected}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Sombras Coletadas
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Scroll className="h-4 w-4 text-amber-600" />
                    <span className="text-2xl font-bold text-amber-600">
                      {competitor.scrollsCollected}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Pergaminhos Mágicos
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitorProfile;