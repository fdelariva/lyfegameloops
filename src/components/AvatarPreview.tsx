
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserAvatar from "./Avatar";
import { Button } from "@/components/ui/button";

interface AvatarPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  archetype: "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido";
}

const AvatarPreview = ({ isOpen, onClose, archetype }: AvatarPreviewProps) => {
  // Level 5 stats depending on archetype
  const getLevel5Stats = () => {
    switch (archetype) {
      case "Guerreiro":
        return { energy: 70, connection: 30, skill: 50 };
      case "Mestre":
        return { energy: 40, connection: 60, skill: 70 };
      case "Sábio":
        return { energy: 30, connection: 45, skill: 85 };
      case "Guardião":
        return { energy: 60, connection: 75, skill: 40 };
      default:
        return { energy: 50, connection: 50, skill: 50 };
    }
  };

  const stats = getLevel5Stats();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Sua Evolução no Nível 5
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 flex flex-col items-center">
          <div className="animate-fade-in text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Continue sua jornada e evolua seu avatar
            </p>
            <h3 className="font-bold text-xl mb-4">{archetype}</h3>
          </div>
          
          <div className="mb-4">
            <UserAvatar 
              level={1} 
              archetype={archetype}
              energy={25}
              connection={20}
              skill={15}
              showPreview={true}
              previewLevel={5}
            />
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm font-semibold text-primary">
              No nível 5 você terá:
            </p>
            <ul className="text-sm mt-2">
              <li>+{stats.energy - 25} pontos de Energia</li>
              <li>+{stats.connection - 20} pontos de Conexão</li>
              <li>+{stats.skill - 15} pontos de Habilidade</li>
              <li>Acesso a acessórios exclusivos</li>
            </ul>
          </div>
        </div>
        
        <Button onClick={onClose} className="w-full">
          Continuar Minha Jornada
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarPreview;
