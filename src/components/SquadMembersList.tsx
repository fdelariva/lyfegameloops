import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";
import { Check, Clock, Mail, RefreshCw } from "lucide-react";

interface SquadMembersListProps {
  isOpen: boolean;
  onClose: () => void;
}

const SquadMembersList = ({ isOpen, onClose }: SquadMembersListProps) => {
  const [isResending, setIsResending] = useState<string | null>(null);

  // Mock data para os membros do squad
  const squadMembers = [
    {
      id: "1",
      name: "João (Você)",
      status: "accepted",
      points: 150,
      avatar: "🤴",
      isCurrentUser: true
    },
    {
      id: "2", 
      name: "Maria Silva",
      status: "accepted",
      points: 145,
      avatar: "👩‍💼",
      isCurrentUser: false
    },
    {
      id: "3",
      name: "Pedro Henrique", 
      status: "accepted",
      points: 130,
      avatar: "👨‍💻",
      isCurrentUser: false
    },
    {
      id: "4",
      name: "Ana Costa",
      status: "pending",
      points: 0,
      avatar: "👩‍🎓",
      isCurrentUser: false,
      email: "ana.costa@email.com"
    },
    {
      id: "5",
      name: "Carlos Santos",
      status: "pending", 
      points: 0,
      avatar: "👨‍🔬",
      isCurrentUser: false,
      email: "carlos.santos@email.com"
    }
  ];

  const handleResendInvite = async (memberId: string, email: string) => {
    setIsResending(memberId);
    
    // Simular envio do convite
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`Convite reenviado para ${email}`);
    setIsResending(null);
  };

  const getStatusBadge = (status: string, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return <Badge className="bg-purple-100 text-purple-800">Você</Badge>;
    }
    
    if (status === "accepted") {
      return (
        <Badge className="bg-green-100 text-green-800">
          <Check className="h-3 w-3 mr-1" />
          Aceito
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="text-orange-600 border-orange-300">
        <Clock className="h-3 w-3 mr-1" />
        Pendente
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-lg">👥</span>
            Guerreiros Alpha
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {squadMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-lg">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      {member.status === "accepted" && (
                        <p className="text-xs text-muted-foreground">
                          {member.points} pontos
                        </p>
                      )}
                      {member.status === "pending" && member.email && (
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(member.status, member.isCurrentUser)}
                    
                    {member.status === "pending" && !member.isCurrentUser && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResendInvite(member.id, member.email!)}
                        disabled={isResending === member.id}
                        className="h-8 px-2"
                      >
                        {isResending === member.id ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <>
                            <Mail className="h-3 w-3 mr-1" />
                            Reenviar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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

export default SquadMembersList;