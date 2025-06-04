
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

const OnboardingQ3Future = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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
    
    toast.success("Onboarding completo!");
    toast("Bônus de boas-vindas!", {
      description: "+ 100 moedas adicionadas à sua conta!",
    });
    navigate("/dashboard-q3");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <WelcomeStep
            title="Main Bet: Q3 Future Scenario"
            subtitle="Desenvolva hábitos com Oracle personalizado e conexões sociais"
            features={[
              { icon: <Brain className="h-6 w-6" />, title: "Oracle Pessoal", description: "Orientação diária inteligente" },
              { icon: <Users className="h-6 w-6" />, title: "Aliados", description: "Conecte-se com amigos" },
              { icon: <Trophy className="h-6 w-6" />, title: "Progressão", description: "Evolua seu avatar" }
            ]}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <ArchetypeStep
            selectedArchetype={archetype}
            onSelectArchetype={setArchetype}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <HabitSelectionStep
            selectedHabits={selectedHabits}
            customHabits={customHabits}
            onHabitsChange={setSelectedHabits}
            onCustomHabitsChange={setCustomHabits}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <AvatarPreviewStep
            archetype={archetype}
            selectedHabits={selectedHabits}
            customHabits={customHabits}
            onComplete={handleCompleteOnboarding}
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
