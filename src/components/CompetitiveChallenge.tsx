
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Users, 
  Share2, 
  Copy, 
  Crown, 
  Flame,
  Target,
  Calendar,
  Medal,
  Star
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface CompetitiveChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  userHabits: Array<{
    id: string;
    name: string;
    description: string;
    energyBoost?: number;
    connectionBoost?: number;
    skillBoost?: number;
  }>;
  userProgress: number;
  userName?: string;
}

const CompetitiveChallenge = ({ 
  isOpen, 
  onClose, 
  userHabits, 
  userProgress,
  userName = "Você" 
}: CompetitiveChallengeProps) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [challengeCreated, setChallengeCreated] = useState(false);
  
  // Squad members data (cooperative + competitive)
  const [squadMembers] = useState([
    { 
      name: userName, 
      progress: userProgress, 
      streak: 5, 
      points: userProgress * 15,
      isUser: true,
      avatar: "😎",
      habits: userHabits.length,
      role: "Você"
    },
    { 
      name: "Ana Silva", 
      progress: 85, 
      streak: 7, 
      points: 1275,
      isUser: false,
      avatar: "👩‍💻",
      habits: 4,
      role: "Motivadora"
    },
    { 
      name: "Pedro Costa", 
      progress: 78, 
      streak: 3, 
      points: 1170,
      isUser: false,
      avatar: "👨‍🎨",
      habits: 5,
      role: "Organizador"
    }
  ].sort((a, b) => b.points - a.points));

  // Global squads ranking
  const [globalSquads] = useState([
    { name: "Guerreiros Alpha", points: 4520, members: 5, league: "Platinum" },
    { name: "Team Phoenix", points: 4350, members: 4, league: "Platinum" },
    { name: "Zen Masters", points: 4180, members: 5, league: "Gold" },
    { name: "Seu Squad", points: 3750, members: 3, league: "Silver", isUserSquad: true }
  ]);

  const [participants] = useState([
    {
      id: "1",
      name: userName,
      avatar: "🏆",
      progress: userProgress,
      streak: 7,
      points: 850,
      position: 1,
      isCurrentUser: true
    },
    {
      id: "2", 
      name: "Ana Silva",
      avatar: "⚡",
      progress: 95,
      streak: 6,
      points: 720,
      position: 2,
      isCurrentUser: false
    },
    {
      id: "3",
      name: "Carlos Santos", 
      avatar: "🔥",
      progress: 90,
      streak: 5,
      points: 680,
      position: 3,
      isCurrentUser: false
    },
    {
      id: "4",
      name: "Maria Costa",
      avatar: "⭐",
      progress: 85,
      streak: 4,
      points: 620,
      position: 4,
      isCurrentUser: false
    },
    {
      id: "5",
      name: "João Oliveira",
      avatar: "💪",
      progress: 75,
      streak: 3,
      points: 580,
      position: 5,
      isCurrentUser: false
    }
  ]);

  const challengeLink = `https://lyfe.app/challenge/abc123?habits=${userHabits.map(h => h.id).join(',')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(challengeLink);
    toast.success("Link do desafio copiado!");
  };

  const handleSendInvite = () => {
    if (!inviteEmail) {
      toast.error("Digite um email válido");
      return;
    }
    
    // Simulate sending invite
    toast.success(`Convite enviado para ${inviteEmail}!`);
    setInviteEmail("");
    setChallengeCreated(true);
  };

  const handleShareChallenge = () => {
    if (navigator.share) {
      navigator.share({
        title: "Desafio de Hábitos - Lyfe",
        text: `Aceite meu desafio de hábitos no Lyfe! Vamos ver quem consegue manter a consistência.`,
        url: challengeLink
      });
    } else {
      handleCopyLink();
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Desafio Competitivo
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Criar Desafio</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Seus Hábitos do Desafio
                </h3>
                <div className="space-y-2 mb-4">
                  {userHabits.map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <span className="text-sm font-medium">{habit.name}</span>
                      <Badge variant="outline" className="text-xs">
                        +{(habit.energyBoost || 0) + (habit.connectionBoost || 0) + (habit.skillBoost || 0)} pts
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Convidar por email:</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="email"
                        placeholder="email@exemplo.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                      <Button onClick={handleSendInvite}>
                        Enviar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleCopyLink}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Link
                    </Button>
                    <Button 
                      onClick={handleShareChallenge}
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>

                {challengeCreated && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm font-medium">
                      🎉 Desafio criado! Seus amigos podem se juntar usando o link compartilhado.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Como funciona o desafio:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Todos os participantes fazem os mesmos hábitos que você
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Ganhe pontos completando hábitos e mantendo sequências
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Acompanhe o progresso de todos no ranking
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    O líder ganha destaque especial no ranking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ranking" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Ranking do Desafio</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {participants.length} participantes
                  </Badge>
                </div>

                <div className="space-y-3">
                  {participants.map((participant) => (
                    <Card key={participant.id} className={participant.isCurrentUser ? "border-primary bg-primary/5" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getRankIcon(participant.position)}
                            <span className="font-bold text-lg">#{participant.position}</span>
                          </div>
                          
                          <div className="text-2xl">{participant.avatar}</div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{participant.name}</h4>
                              {participant.isCurrentUser && (
                                <Badge variant="secondary" className="text-xs">Você</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {participant.progress}% hoje
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="h-3 w-3" />
                                {participant.streak} dias
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {participant.points} pts
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-lg">{participant.points}</div>
                            <div className="text-xs text-muted-foreground">pontos</div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Progress value={participant.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Ranking atualizado diariamente às 23:59
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitiveChallenge;
