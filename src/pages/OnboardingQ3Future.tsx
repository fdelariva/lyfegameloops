
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, Trophy, Brain, Calendar, Skull } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import ArchetypeStep from "@/components/onboarding/ArchetypeStep";
import HabitSelectionStep from "@/components/onboarding/HabitSelectionStep";
import CavernaChallengeStep from "@/components/onboarding/CavernaChallengeStep";
import CavernaDesafioStep from "@/components/onboarding/CavernaDesafioStep";

import { defaultHabits } from "@/data/defaultHabits";

const OnboardingQ3Future = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Always start with Caverna do Desafio (step 1)
    if (location.state?.skipWelcome) {
      setStep(1);
    }
  }, [location.state]);
  const [archetype, setArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido">("Indefinido");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [customHabits, setCustomHabits] = useState<string[]>([]);
  

  const handleCompleteOnboarding = () => {
    // Save selected data to localStorage
    localStorage.setItem('userArchetype', archetype);
    localStorage.setItem('selectedHabits', JSON.stringify(selectedHabits));
    localStorage.setItem('customHabits', JSON.stringify(customHabits));
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('gameMode', 'q3-future');
    localStorage.setItem('userLevel', '1');
    localStorage.setItem('userEnergy', '25');
    localStorage.setItem('userConnection', '20');
    localStorage.setItem('userSkill', '15');
    localStorage.setItem('userCoins', '200'); // Bonus coins for Q3 future
    localStorage.setItem('isDayZero', 'true');
    
    toast.success("Onboarding completo!");
    toast("Bônus de boas-vindas Q3 Future!", {
      description: "+ 200 moedas e Oracle pessoal ativado!",
    });
    navigate("/dashboard-q3");
  };

  const handleCavernaAccept = () => {
    // Add "Aprender sobre desenvolvimento pessoal" habit
    const cavernaHabit = "Aprender sobre desenvolvimento pessoal";
    const cavernaHabitId = `caverna-aprendizado`;
    
    setCustomHabits(prev => [...prev, cavernaHabit]);
    setSelectedHabits(prev => [...prev, cavernaHabitId]);
    
    // Save caverna challenge acceptance and habit data
    localStorage.setItem('cavernaChallengeAccepted', 'true');
    localStorage.setItem('cavernaHabitId', cavernaHabitId);
    localStorage.setItem('cavernaHabitName', cavernaHabit);
    
    // Save user data to localStorage first
    localStorage.setItem('userArchetype', archetype);
    localStorage.setItem('selectedHabits', JSON.stringify([...selectedHabits, cavernaHabitId]));
    localStorage.setItem('customHabits', JSON.stringify([...customHabits, cavernaHabit]));
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('gameMode', 'q3-future');
    localStorage.setItem('userLevel', '1');
    localStorage.setItem('userEnergy', '25');
    localStorage.setItem('userConnection', '20');
    localStorage.setItem('userSkill', '15');
    localStorage.setItem('userCoins', '200');
    localStorage.setItem('isDayZero', 'true');
    
    toast.success("Desafio aceito! Hábito adicionado.");
    
    // Go to next step to show Caverna do Desafio info
    setStep(5);
  };

  const handleCavernaDecline = () => {
    handleCompleteOnboarding();
  };

  const handleHabitToggle = (habitId: string) => {
    setSelectedHabits(prev => 
      prev.includes(habitId) 
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleHabitDelete = (habitId: string) => {
    setSelectedHabits(prev => prev.filter(id => id !== habitId));
    setCustomHabits(prev => prev.filter(habit => habit !== habitId));
  };

  const handleAddCustomHabit = (habitName: string) => {
    const customId = `custom-${Date.now()}`;
    setCustomHabits(prev => [...prev, habitName]);
    setSelectedHabits(prev => [...prev, customId]);
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
          <div className="flex flex-col items-center">
            <CavernaDesafioStep
              onContinue={() => setStep(3)}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <ArchetypeStep
              selectedArchetype={archetype}
              onSelectArchetype={setArchetype}
            />
            <Button 
              size="lg" 
              className="mt-6"
              onClick={() => setStep(4)}
              disabled={archetype === "Indefinido"}
            >
              Continuar
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center">
            <HabitSelectionStep
              habits={allHabits}
              selectedHabits={selectedHabits}
              onHabitToggle={handleHabitToggle}
              onHabitDelete={handleHabitDelete}
              onAddCustomHabit={handleAddCustomHabit}
              onComplete={handleCompleteOnboarding}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {step > 1 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-4 left-4"
          onClick={() => setStep(step === 4 ? 3 : step === 3 ? 1 : step - 1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      )}
      
      {/* Progress indicator */}
      <div className="absolute top-4 right-4 flex gap-2">
        {[1, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-2 h-2 rounded-full transition-colors ${
              step >= stepNumber ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      
      <div className="w-full max-w-4xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingQ3Future;
