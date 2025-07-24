import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface CompetitorSquadListProps {
  isOpen: boolean;
  onClose: () => void;
  squadName: string;
  onViewProfile: (competitor: any) => void;
}

const CompetitorSquadList = ({ isOpen, onClose, squadName, onViewProfile }: CompetitorSquadListProps) => {
  // Mock data para membros do squad competidor
  const competitorMembers = [
    {
      id: "c1",
      name: "Rafael Phoenix",
      archetype: "Mestre",
      points: 165,
      avatar: "🔥",
      level: 3,
      energy: 45,
      connection: 38,
      skill: 42,
      challengesCompleted: 12,
      shadowsCollected: 3,
      scrollsCollected: 2
    },
    {
      id: "c2", 
      name: "Luna Fire",
      archetype: "Sábio",
      points: 142,
      avatar: "🌙",
      level: 2,
      energy: 35,
      connection: 40,
      skill: 47,
      challengesCompleted: 8,
      shadowsCollected: 2,
      scrollsCollected: 4
    },
    {
      id: "c3",
      name: "Thor Lightning",
      archetype: "Guerreiro", 
      points: 138,
      avatar: "⚡",
      level: 2,
      energy: 48,
      connection: 32,
      skill: 35,
      challengesCompleted: 10,
      shadowsCollected: 1,
      scrollsCollected: 1
    },
    {
      id: "c4",
      name: "Sophia Flame",
      archetype: "Guardião",
      points: 125,
      avatar: "🦋",
      level: 2,
      energy: 30,
      connection: 45,
      skill: 38,
      challengesCompleted: 7,
      shadowsCollected: 2,
      scrollsCollected: 3
    }
  ];

  const getRankEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";  
    if (index === 2) return "🥉";
    return `${index + 1}º`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="p-1 h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg">🔥</span>
            {squadName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {competitorMembers.map((member, index) => (
            <Card 
              key={member.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onViewProfile(member)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-lg">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium mt-1">
                        {getRankEmoji(index)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {member.archetype}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Nível {member.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-sm">{member.points} pts</p>
                    <p className="text-xs text-muted-foreground">
                      {member.challengesCompleted} desafios
                    </p>
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

export default CompetitorSquadList;