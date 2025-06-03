
import React from "react";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/Avatar";
import AccessorySelection from "@/components/AccessorySelection";
import { ArchetypeType } from "@/data/archetypes";

interface AvatarPreviewStepProps {
  archetype: ArchetypeType;
  showAccessorySelection: boolean;
  onShowAccessorySelection: (show: boolean) => void;
  onAccessorySelect: (accessoryId: string) => void;
  onNext: () => void;
}

const AvatarPreviewStep = ({ 
  archetype, 
  showAccessorySelection, 
  onShowAccessorySelection, 
  onAccessorySelect, 
  onNext 
}: AvatarPreviewStepProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Desbloqueie seu Potencial</h2>
      <p className="text-muted-foreground text-center mb-6">
        Como {archetype}, você tem um potencial único. Veja como pode ser sua evolução!
      </p>
      
      <div className="bg-card border rounded-lg p-6 w-full max-w-sm mb-6">
        <UserAvatar 
          level={1} 
          archetype={archetype}
          energy={25}
          connection={20}
          skill={15}
          showPreview={true}
          previewLevel={5}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm font-medium">
            Complete os desafios diários para evoluir seu avatar!
          </p>
          <p className="text-sm text-primary font-medium mt-2">
            Hoje você pode chegar ao nível 2!
          </p>
        </div>
      </div>
      
      <Button 
        size="lg" 
        className="mb-4"
        onClick={() => onShowAccessorySelection(true)}
      >
        Escolher Acessório Inicial
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onNext}
      >
        Pular Personalização
      </Button>
      
      <AccessorySelection 
        isOpen={showAccessorySelection}
        onClose={() => onShowAccessorySelection(false)}
        onSelect={(accessoryId) => {
          onAccessorySelect(accessoryId);
          onNext();
        }}
      />
    </div>
  );
};

export default AvatarPreviewStep;
