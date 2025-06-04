
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, Trophy, Users, Brain } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import ArchetypeStep from "@/components/onboarding/ArchetypeStep";
import HabitSelectionStep from "@/components/onboarding/HabitSelectionStep";
import AvatarPreviewStep from "@/components/onboarding/AvatarPreviewStep";
import { defaultHabits } from "@/data/defaultHabits";

const OnboardingQ3Future = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido">("Indefinido");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [customHabits, setCustomHabits] = useState<string[]>([]);
  const [showAccessorySelection, setShowAccessorySelection] = useState(false);

  const handleCompleteOnboarding = () => {
    // Save selected data to localStorage
    localStorage.setItem('userArchetype', archetype);
    localStorage.setItem('selectedHabits', JSON.stringify(selectedHabits));
    localStorage.setItem('customHabits', JSON.stringify(customHabits));
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('gameMode', 'q3-future');
    
    toast.success("Onboarding completo!");
    toast("Bônus de boas-vindas!", {
      description: "+ 100 moedas adicionadas à sua conta!",
    });
    navigate("/dashboard-q3");
  };

  const handleHabitToggle = (habitId: string) => {
    setSelectedHabits(prev => 
      prev.includes(habitId) 
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleHabitDelete = (habitId: string) => {
    // Remove from selected habits and custom habits
    setSelectedHabits(prev => prev.filter(id => id !== habitId));
    setCustomHabits(prev => prev.filter(habit => habit !== habitId));
  };

  const handleAddCustomHabit = (habitName: string) => {
    const customId = `custom-${Date.now()}`;
    setCustomHabits(prev => [...prev, habitName]);
    setSelectedHabits(prev => [...prev, customId]);
  };

  const handleAccessorySelect = (accessoryId: string) => {
    localStorage.setItem('selectedAccessory', accessoryId);
    setShowAccessorySelection(false);
  };

  // Create habits array combining default and custom habits
  const allHabits = [
    ...defaultHabits,
    ...customHabits.map((habit, index) => ({
      id: `custom-${index}`,
      name: habit,
      icon: "🎯",
      description: "Hábito personalizado",
      category: "Personalizado",
      info: {
        whyDo: "Este é um hábito que você criou para atender suas necessidades específicas.",
        howDo: "Execute este hábito da forma que faz mais sentido para você."
      }
    }))
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6">Main Bet: Q3 Future Scenario</h1>
            <p className="text-muted-foreground mb-8">
              Desenvolva hábitos com Oracle personalizado e conexões sociais
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Oracle Pessoal</h3>
                  <p className="text-sm text-muted-foreground">Orientação diária inteligente</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Aliados</h3>
                  <p className="text-sm text-muted-foreground">Conecte-se com amigos</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Progressão</h3>
                  <p className="text-sm text-muted-foreground">Evolua seu avatar</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" onClick={() => setStep(2)}>
              Iniciar Jornada
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <ArchetypeStep
              selectedArchetype={archetype}
              onSelectArchetype={setArchetype}
            />
            <Button 
              size="lg" 
              className="mt-6"
              onClick={() => setStep(3)}
              disabled={archetype === "Indefinido"}
            >
              Continuar
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <HabitSelectionStep
              habits={allHabits}
              selectedHabits={selectedHabits}
              onHabitToggle={handleHabitToggle}
              onHabitDelete={handleHabitDelete}
              onAddCustomHabit={handleAddCustomHabit}
              onComplete={() => setStep(4)}
            />
          </div>
        );
      case 4:
        return (
          <AvatarPreviewStep
            archetype={archetype}
            showAccessorySelection={showAccessorySelection}
            onShowAccessorySelection={setShowAccessorySelection}
            onAccessorySelect={handleAccessorySelect}
            onNext={handleCompleteOnboarding}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {step > 1 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-4 left-4"
          onClick={() => setStep(step - 1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      )}
      
      <div className="w-full max-w-2xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingQ3Future;
