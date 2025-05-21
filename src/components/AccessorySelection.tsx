
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { RadioGroup } from "@/components/ui/radio-group";

interface Accessory {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface AccessorySelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (accessoryId: string) => void;
}

const AccessorySelection = ({ isOpen, onClose, onSelect }: AccessorySelectionProps) => {
  const [selected, setSelected] = React.useState<string | undefined>();
  
  const accessories: Accessory[] = [
    { 
      id: "a1", 
      name: "Medalhão Iniciante", 
      image: "/accessories/medallion.png", 
      description: "Aumenta sua Energia em +5" 
    },
    { 
      id: "a2", 
      name: "Amuleto da Sorte", 
      image: "/accessories/amulet.png", 
      description: "Aumenta suas chances nas Cartas da Sorte" 
    },
    { 
      id: "a3", 
      name: "Bracelete da Sabedoria", 
      image: "/accessories/bracelet.png", 
      description: "Aumenta sua Habilidade em +5" 
    },
  ];

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      const accessory = accessories.find(a => a.id === selected);
      toast.success(`${accessory?.name} adicionado ao seu avatar!`);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            Escolha um Acessório para seu Avatar
          </DialogTitle>
        </DialogHeader>
        
        <RadioGroup 
          value={selected} 
          onValueChange={setSelected}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {accessories.map((accessory) => (
            <Card 
              key={accessory.id}
              className={`cursor-pointer transition ${selected === accessory.id ? 'border-primary' : ''}`}
              onClick={() => setSelected(accessory.id)}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-muted rounded-full mb-3 flex items-center justify-center">
                  <div className="text-3xl">
                    {/* Fallback emoji if no image is available */}
                    {accessory.id === "a1" ? "🏅" : accessory.id === "a2" ? "🍀" : "⚜️"}
                  </div>
                </div>
                <h4 className="font-medium text-sm">{accessory.name}</h4>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {accessory.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!selected}>
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessorySelection;
