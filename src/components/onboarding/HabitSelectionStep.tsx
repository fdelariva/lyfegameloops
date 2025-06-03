import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Check, X, Users } from "lucide-react";
import SwipeableHabitCard from "@/components/SwipeableHabitCard";
import AskTheOracle from "@/components/AskTheOracle";
import { toast } from "@/components/ui/sonner";

interface Habit {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  info: {
    whyDo: string;
    howDo: string;
  };
}

interface HabitSelectionStepProps {
  habits: Habit[];
  selectedHabits: string[];
  onHabitToggle: (habitId: string) => void;
  onHabitDelete: (habitId: string) => void;
  onAddCustomHabit: (habitName: string) => void;
  onComplete: () => void;
}

const HabitSelectionStep = ({
  habits,
  selectedHabits,
  onHabitToggle,
  onHabitDelete,
  onAddCustomHabit,
  onComplete
}: HabitSelectionStepProps) => {
  const [customHabit, setCustomHabit] = useState("");
  const [showCustomHabitInput, setShowCustomHabitInput] = useState(false);
  const [habitRepeatDays, setHabitRepeatDays] = useState<Record<string, number[]>>({});
  const [showOracle, setShowOracle] = useState(false);

  const handleAddCustomHabit = () => {
    if (customHabit.trim()) {
      onAddCustomHabit(customHabit.trim());
      setCustomHabit("");
      setShowCustomHabitInput(false);
      toast.success("Hábito customizado adicionado!");
    }
  };

  const handleRepeatChange = (habitId: string, days: number[]) => {
    setHabitRepeatDays(prev => ({
      ...prev,
      [habitId]: days
    }));
  };

  const handleHabitDelete = (habitId: string) => {
    // Remove from repeat days when deleted
    setHabitRepeatDays(prev => {
      const newRepeatDays = { ...prev };
      delete newRepeatDays[habitId];
      return newRepeatDays;
    });
    onHabitDelete(habitId);
    toast.success("Hábito removido!");
  };

  const handleOracleAddHabit = (habitName: string) => {
    onAddCustomHabit(habitName);
    toast.success("Sugestão do Oráculo adicionada!");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Escolha seus Hábitos Iniciais</h2>
      <p className="text-muted-foreground text-center mb-6">
        Selecione os hábitos que você quer fazer. Deslize para a esquerda para deletar ou para a direita para configurar repetição.
      </p>
      
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-sm">
            {selectedHabits.length} hábitos selecionados
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOracle(true)}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Perguntar ao Oráculo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomHabitInput(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Hábito Customizado
            </Button>
          </div>
        </div>

        {showCustomHabitInput && (
          <Card className="mb-4 border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite seu hábito personalizado..."
                  value={customHabit}
                  onChange={(e) => setCustomHabit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomHabit()}
                />
                <Button
                  size="sm"
                  onClick={handleAddCustomHabit}
                  disabled={!customHabit.trim()}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowCustomHabitInput(false);
                    setCustomHabit("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {habits.map((habit) => (
            <SwipeableHabitCard
              key={habit.id}
              habit={habit}
              isSelected={selectedHabits.includes(habit.id)}
              onToggle={onHabitToggle}
              onDelete={handleHabitDelete}
              showRepeatOptions={true}
              onRepeatChange={handleRepeatChange}
              repeatDays={habitRepeatDays[habit.id] || []}
              habitInfo={habit.info}
            />
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Dica: Você pode alterar seus hábitos a qualquer momento no dashboard!
        </p>
        <Button 
          size="lg" 
          onClick={onComplete}
          disabled={selectedHabits.length === 0}
        >
          Começar Minha Jornada ({selectedHabits.length} hábitos)
        </Button>
      </div>
    </div>
  );
};

export default HabitSelectionStep;
