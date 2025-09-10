
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AvatarProps {
  level: number;
  archetype: "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido";
  energy: number;
  connection: number;
  skill: number;
  showPreview?: boolean;
  previewLevel?: number;
}

const UserAvatar = ({ 
  level, 
  archetype, 
  energy, 
  connection, 
  skill,
  showPreview = false,
  previewLevel = 5
}: AvatarProps) => {
  // Get avatar emoji based on archetype and level
  const getAvatarEmoji = (type: string, avatarLevel: number) => {
    const avatars = {
      guerreiro: {
        1: "🧍", // Standing person - basic human figure
        2: "🚶", // Walking person - advancing human
        5: "🏃"  // Running person - master human
      },
      mestre: {
        1: "🧍", // Standing person
        2: "🚶", // Walking person
        5: "🏃"  // Running person
      },
      sábio: {
        1: "🧍", // Standing person
        2: "🚶", // Walking person
        5: "🏃"  // Running person
      },
      guardião: {
        1: "🧍", // Standing person
        2: "🚶", // Walking person
        5: "🏃"  // Running person
      },
      indefinido: {
        1: "🧍",
        2: "🚶",
        5: "🏃"
      }
    };

    return avatars[type.toLowerCase() as keyof typeof avatars]?.[avatarLevel as keyof typeof avatars.guerreiro] || "🧍";
  };

  const getPreviewImage = () => {
    return getAvatarEmoji(archetype, previewLevel);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-primary">
          <AvatarFallback className="bg-primary/20 text-primary font-bold text-3xl">
            {getAvatarEmoji(archetype, level)}
          </AvatarFallback>
        </Avatar>
        <Badge className="absolute -top-2 -right-2 bg-primary">{`Nível ${level}`}</Badge>
      </div>

      {showPreview && (
        <div className="relative mt-2 opacity-70">
          <div className="absolute -top-3 left-0 right-0 text-center text-xs text-muted-foreground">
            Prévia Nível {previewLevel}
          </div>
          <Avatar className="w-20 h-20 border-2 border-dashed border-primary/50">
            <AvatarFallback className="bg-primary/10 text-primary/50 font-bold text-2xl">
              {getPreviewImage()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-3 left-0 right-0 text-center text-xs font-semibold text-primary animate-pulse">
            Desbloqueie Hoje!
          </div>
        </div>
      )}

      <div className="w-full space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Energia</span>
            <span>{energy}%</span>
          </div>
          <Progress value={energy} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Conexão</span>
            <span>{connection}%</span>
          </div>
          <Progress value={connection} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Habilidade</span>
            <span>{skill}%</span>
          </div>
          <Progress value={skill} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
