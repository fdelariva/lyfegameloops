
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight } from "lucide-react";
import ArchetypeStep from "@/components/onboarding/ArchetypeStep";
import HabitSelectionStep from "@/components/onboarding/HabitSelectionStep";
import { ArchetypeType } from "@/data/archetypes";
import { defaultHabits } from "@/data/defaultHabits";
import { saveOnboardingData, createCustomHabit } from "@/utils/onboardingUtils";

const OnboardingQ3Future = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<ArchetypeType>("Indefinido");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [customHabits, setCustomHabits] = useState<Array<{id: string, name: string}>>([]);
  const [habits, setHabits] = useState(defaultHabits);
  // Check if we should skip to archetype selection
  useEffect(() => {
    if (location.state?.skipToArchetype) {
      setStep(2);
    }
  }, [location.state]);

  const handleSelectArchetype = (selected: ArchetypeType) => {
    setArchetype(selected);
    setStep(3);
  };
  const handleHabitToggle = (habitId: string) => {
    setSelectedHabits(prev =>
      prev.includes(habitId) ? prev.filter(id => id !== habitId) : [...prev, habitId]
    );
  };

  const handleHabitDelete = (habitId: string) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    setSelectedHabits(prev => prev.filter(id => id !== habitId));
  };

  const handleAddCustomHabit = (habitName: string) => {
    const newHabit = createCustomHabit(habitName);
    setHabits(prev => [...prev, newHabit]);
    setCustomHabits(prev => [...prev, { id: newHabit.id, name: newHabit.name }]);
    setSelectedHabits(prev => [...prev, newHabit.id]);
  };

  const handleComplete = () => {
    if (selectedHabits.length === 0) return;
    saveOnboardingData(selectedHabits, customHabits, archetype);

    // Build today's daily habits from the selected items
    const today = new Date().toISOString().slice(0,10);
    const chosen = habits.filter(h => selectedHabits.includes(h.id));
    const daily = chosen.map(h => ({
      id: h.id,
      name: h.name,
      icon: h.icon,
      description: h.description,
      info: h.info,
      energyBoost: 3,
      connectionBoost: 2,
      skillBoost: 2,
      completed: false,
      streak: 0,
      date: today
    }));
    localStorage.setItem('dailyHabits', JSON.stringify(daily));

    navigate("/caverna-dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Lyfe!</h1>
            <p className="text-muted-foreground mb-8">
              Inicie sua jornada de desenvolvimento pessoal e veja seu avatar evoluir a cada hábito conquistado.
            </p>
            
            <Card className="mb-6 bg-purple-50 border-purple-200 w-full max-w-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Conheça Aristos, seu Guia
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/lovable-uploads/d43b4096-ba1e-404a-9b10-1e22c3ac310a.png" 
                    alt="Aristos - Seu guia no Lyfe" 
                    className="w-32 h-32 object-contain"
                  />
                </div>
                
                <div className="text-sm text-purple-800 space-y-3">
                  <p className="font-semibold">
                    "Olá, viajante. Meu nome é Aristos."
                  </p>
                  <p>
                    Serei seu guia neste jogo. Você já sentiu que há um potencial dentro de você, mas algo te impede? Distração, procrastinação, falta de disciplina...
                  </p>
                  <p>
                    Vamos identificar essas barreiras e criar sua trilha rumo ao seu verdadeiro potencial.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Button size="lg" onClick={() => setStep(2)}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Continuar
            </Button>
          </div>
        );

      case 2:
        return (
          <ArchetypeStep 
            selectedArchetype={archetype}
            onSelectArchetype={handleSelectArchetype}
          />
        );
      case 3:
        return (
          <HabitSelectionStep
            habits={habits}
            selectedHabits={selectedHabits}
            onHabitToggle={handleHabitToggle}
            onHabitDelete={handleHabitDelete}
            onAddCustomHabit={handleAddCustomHabit}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-3xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingQ3Future;
