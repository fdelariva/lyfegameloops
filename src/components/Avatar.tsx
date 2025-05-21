
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
  // Determine which avatar image to use based on archetype and level
  const getAvatarImage = () => {
    const baseImage = `/avatars/${archetype.toLowerCase()}-${level}.png`;
    // This is a fallback if images aren't available
    return baseImage;
  };

  const getPreviewImage = () => {
    const previewImage = `/avatars/${archetype.toLowerCase()}-${previewLevel}.png`;
    return previewImage;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-primary">
          <AvatarImage src={getAvatarImage()} />
          <AvatarFallback className="bg-primary/20 text-primary font-bold">
            {archetype[0]}
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
            <AvatarImage src={getPreviewImage()} />
            <AvatarFallback className="bg-primary/10 text-primary/50 font-bold">
              {previewLevel}
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
