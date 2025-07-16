
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, Trophy, Users, Brain, Target, Calendar, Skull } from "lucide-react";
import UserAvatar from "@/components/Avatar";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import ArchetypeStep from "@/components/onboarding/ArchetypeStep";
import HabitSelectionStep from "@/components/onboarding/HabitSelectionStep";
import CavernaChallengeStep from "@/components/onboarding/CavernaChallengeStep";

import { defaultHabits } from "@/data/defaultHabits";

const OnboardingQ3Future = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Skip the welcome step if coming from Index page
    if (location.state?.skipWelcome) {
      setStep(2);
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
    
    // Navigate to Caverna da Sabedoria
    navigate("/caverna-da-sabedoria");
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
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
              Main Bet: Q3 Future Scenario
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Desenvolva hábitos com Oracle personalizado, conexões sociais e sistema de progressão avançado
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Oracle Pessoal</h3>
                  <p className="text-sm text-muted-foreground">Orientação diária inteligente</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <h3 className="font-semibold">Aliados & Social</h3>
                  <p className="text-sm text-muted-foreground">Conecte-se com amigos</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-medium/10 border-orange-medium/20">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-orange-medium" />
                  <h3 className="font-semibold">Progressão Avançada</h3>
                  <p className="text-sm text-muted-foreground">Sistema completo de evolução</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-medium/10 border-purple-medium/20">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-medium" />
                  <h3 className="font-semibold">Baú Diário</h3>
                  <p className="text-sm text-muted-foreground">Desafios e recompensas</p>
                </CardContent>
              </Card>
              <Card className="bg-teal-medium/10 border-teal-medium/20">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-teal-medium" />
                  <h3 className="font-semibold">Séries & Streaks</h3>
                  <p className="text-sm text-muted-foreground">Mantenha a consistência</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-600/10 border-purple-600/20">
                <CardContent className="p-4 text-center">
                  <Skull className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">Caverna da Sabedoria</h3>
                  <p className="text-sm text-muted-foreground">Ganhe pergaminhos mágicos acertando 80%+ das lições</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg mb-8 max-w-2xl">
              <h3 className="font-bold text-lg mb-2">🚀 Recursos Exclusivos Q3 Future</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Oracle com IA personalizada para orientação diária</li>
                <li>• Sistema social com aliados e feed de atividades</li>
                <li>• Baú do tesouro com desafios de conhecimento</li>
                <li>• Evolução de avatar com sistema de características</li>
                <li>• Séries e streaks para manter consistência</li>
                <li>• Caverna da Sabedoria: complete lições e ganhe pergaminhos mágicos para se preparar para seu primeiro quest</li>
              </ul>
            </div>
            
            <Button size="lg" onClick={() => setStep(2)} className="gradient-primary">
              Iniciar Jornada Q3 Future
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
          <div className="flex flex-col items-center">
            <CavernaChallengeStep
              onAccept={handleCavernaAccept}
              onDecline={handleCavernaDecline}
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
          onClick={() => setStep(step - 1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      )}
      
      {/* Progress indicator */}
      <div className="absolute top-4 right-4 flex gap-2">
        {[1, 2, 3, 4].map((stepNumber) => (
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
