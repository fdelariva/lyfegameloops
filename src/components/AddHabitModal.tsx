import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Brain, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habit: NewHabit) => void;
}

interface NewHabit {
  name: string;
  description: string;
  category: string;
  energyBoost: number;
  connectionBoost: number;
  skillBoost: number;
  icon: string;
  isCustom: boolean;
}

const AddHabitModal = ({ isOpen, onClose, onAddHabit }: AddHabitModalProps) => {
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

  const handleAddCustomHabit = () => {
    if (!habitName.trim()) {
      toast.error("Digite o nome do hábito");
      return;
    }

    const newHabit: NewHabit = {
      name: habitName.trim(),
      description: habitDescription.trim() || "Hábito personalizado",
      category: "Personalizado",
      energyBoost: 3,
      connectionBoost: 2,
      skillBoost: 2,
      icon: "🎯",
      isCustom: true
    };

    onAddHabit(newHabit);
    resetForm();
    onClose();
    toast.success("Hábito adicionado com sucesso!");
  };

  const handleGetOracleSuggestion = async () => {
    if (!habitName.trim()) {
      toast.error("Digite uma ideia de hábito primeiro");
      return;
    }

    setIsLoadingSuggestion(true);
    
    try {
      // Simular sugestão do Oracle (aqui você integraria com a API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const suggestions = [
        {
          name: `${habitName} - Versão Otimizada`,
          description: `Uma versão melhorada do seu hábito "${habitName}" com base na ciência de mudança de comportamento. Inclui técnicas de microhábitos e recompensas progressivas.`,
          tips: "💡 Dica do Oracle: Comece com apenas 2 minutos por dia para criar consistência."
        },
        {
          name: `Preparação para ${habitName}`,
          description: `Um hábito preparatório que aumenta suas chances de sucesso com "${habitName}". Inclui ritual de preparação mental e física.`,
          tips: "💡 Dica do Oracle: A preparação é 80% do sucesso de qualquer hábito."
        }
      ];

      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      
      setHabitName(randomSuggestion.name);
      setHabitDescription(randomSuggestion.description);
      
      toast.success(randomSuggestion.tips);
      
    } catch (error) {
      toast.error("Erro ao obter sugestão do Oracle");
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const resetForm = () => {
    setHabitName("");
    setHabitDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Adicionar Novo Hábito
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Oracle Suggestion Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">Sugestão do Oracle</span>
                <Sparkles className="h-3 w-3 text-yellow-500" />
              </div>
              <p className="text-xs text-gray-600 mb-2">
                Digite uma ideia de hábito e peça uma sugestão otimizada baseada na ciência
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleGetOracleSuggestion}
                disabled={isLoadingSuggestion || !habitName.trim()}
                className="w-full"
              >
                {isLoadingSuggestion ? (
                  <>
                    <Brain className="h-3 w-3 mr-2 animate-pulse" />
                    Oracle pensando...
                  </>
                ) : (
                  <>
                    <Brain className="h-3 w-3 mr-2" />
                    Pedir Sugestão do Oracle
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="habitName">Nome do Hábito</Label>
              <Input
                id="habitName"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Ex: Meditar 5 minutos"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="habitDescription">Descrição (opcional)</Label>
              <Textarea
                id="habitDescription"
                value={habitDescription}
                onChange={(e) => setHabitDescription(e.target.value)}
                placeholder="Descreva como você pretende realizar este hábito..."
                className="mt-1 min-h-[60px]"
                rows={3}
              />
            </div>
          </div>

          {/* Benefits Preview */}
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">
                <strong>Benefícios:</strong> +3 Energia, +2 Conexão, +2 Habilidade por conclusão
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleAddCustomHabit} 
              className="flex-1"
              disabled={!habitName.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitModal;