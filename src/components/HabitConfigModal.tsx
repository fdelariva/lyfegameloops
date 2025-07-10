import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Clock, Calendar, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

interface HabitConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitName: string;
  habitId: string;
  onSave?: (config: HabitConfig) => void;
}

interface HabitConfig {
  days: number[];
  time: string;
  reminder: boolean;
}

const HabitConfigModal = ({ isOpen, onClose, habitName, habitId, onSave }: HabitConfigModalProps) => {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState("08:00");
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleDayToggle = (dayIndex: number) => {
    setSelectedDays(prev => 
      prev.includes(dayIndex)
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex].sort()
    );
  };

  const handleSave = () => {
    if (selectedDays.length === 0) {
      toast.error("Selecione pelo menos um dia da semana");
      return;
    }

    const config: HabitConfig = {
      days: selectedDays,
      time: selectedTime,
      reminder: reminderEnabled
    };

    onSave?.(config);
    
    toast.success("Configuração do hábito salva!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Configurar Hábito
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Habit Name */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <h3 className="font-semibold text-sm text-blue-800">{habitName}</h3>
            </CardContent>
          </Card>

          {/* Days Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4" />
              Dias da Semana
            </Label>
            <div className="grid grid-cols-7 gap-1">
              {dayLabels.map((day, index) => (
                <button
                  key={index}
                  className={cn(
                    "p-2 text-xs font-medium rounded-md transition-colors",
                    selectedDays.includes(index)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 border border-border"
                  )}
                  onClick={() => handleDayToggle(index)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              Horário de Lembrete
            </Label>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Reminder Toggle */}
          <div className="flex items-center justify-between">
            <Label className="font-medium">Lembrete ativo</Label>
            <Button
              variant={reminderEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setReminderEnabled(!reminderEnabled)}
            >
              {reminderEnabled ? "Ativado" : "Desativado"}
            </Button>
          </div>

          {/* Summary */}
          {selectedDays.length > 0 && (
            <Card className="bg-muted/50">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">
                  <strong>Resumo:</strong> {selectedDays.length === 7 ? "Todos os dias" : 
                  selectedDays.length === 1 ? `${dayLabels[selectedDays[0]]}` :
                  `${selectedDays.length} dias por semana`} às {selectedTime}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HabitConfigModal;