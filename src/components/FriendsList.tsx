
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, Crown, Zap, Target, MessageCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface FriendsListProps {
  isOpen: boolean;
  onClose: () => void;
}

const FriendsList = ({ isOpen, onClose }: FriendsListProps) => {
  const [inviteCode, setInviteCode] = useState("");

  const mockFriends = [
    {
      id: "1",
      name: "Ana Silva",
      avatar: "🌟",
      status: "online",
      level: 8,
      streak: 15,
      todayProgress: 100,
      archetype: "Sábia"
    },
    {
      id: "2", 
      name: "Carlos Santos",
      avatar: "⚡",
      status: "away",
      level: 12,
      streak: 22,
      todayProgress: 75,
      archetype: "Guerreiro"
    },
    {
      id: "3",
      name: "Maria Costa", 
      avatar: "🔥",
      status: "online",
      level: 6,
      streak: 8,
      todayProgress: 50,
      archetype: "Guardiã"
    }
  ];

  const handleInviteFriend = () => {
    if (inviteCode.trim()) {
      toast.success("Convite enviado!");
      setInviteCode("");
    }
  };

  const handleSendMessage = (friendName: string) => {
    toast.info(`Mensagem enviada para ${friendName}!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  const getArchetypeIcon = (archetype: string) => {
    switch (archetype) {
      case "Guerreiro": return "⚔️";
      case "Sábia": case "Sábio": return "📚";
      case "Guardiã": case "Guardião": return "🛡️";
      case "Mestre": return "🎯";
      default: return "👤";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Seus Aliados ({mockFriends.length})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Invite Friend Section */}
          <Card className="border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <UserPlus className="h-5 w-5" />
                <h3 className="font-semibold">Convide um Aliado</h3>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código do amigo..."
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleInviteFriend()}
                />
                <Button onClick={handleInviteFriend} disabled={!inviteCode.trim()}>
                  Convidar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Seu código: <span className="font-mono bg-muted px-1 rounded">USER2024</span>
              </p>
            </CardContent>
          </Card>

          {/* Friends List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {mockFriends.map((friend) => (
              <Card key={friend.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="text-2xl">{friend.avatar}</div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{friend.name}</h4>
                        <span className="text-sm">{getArchetypeIcon(friend.archetype)}</span>
                        {friend.level >= 10 && <Crown className="h-4 w-4 text-yellow-500" />}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          Nível {friend.level}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {friend.streak} dias
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progresso hoje</span>
                          <span className="text-xs font-medium">{friend.todayProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full transition-all duration-300" 
                            style={{ width: `${friend.todayProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSendMessage(friend.name)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Summary */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Estatísticas dos Aliados</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold">98%</div>
                  <div className="text-xs text-muted-foreground">Taxa de conclusão média</div>
                </div>
                <div>
                  <div className="text-lg font-bold">15</div>
                  <div className="text-xs text-muted-foreground">Streak médio</div>
                </div>
                <div>
                  <div className="text-lg font-bold">8.7</div>
                  <div className="text-xs text-muted-foreground">Nível médio</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FriendsList;
