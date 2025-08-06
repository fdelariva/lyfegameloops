import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultHabits } from "@/data/defaultHabits";
import { ArchetypeType } from "@/data/archetypes";
import { saveOnboardingData, createCustomHabit } from "@/utils/onboardingUtils";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import ArchetypeStep from "@/components/onboarding/ArchetypeStep";
import HabitSelectionStep from "@/components/onboarding/HabitSelectionStep";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<ArchetypeType>("Indefinido");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [customHabits, setCustomHabits] = useState<Array<{id: string, name: string}>>([]);
  const [habits, setHabits] = useState(defaultHabits);

  const handleSelectArchetype = (selected: ArchetypeType) => {
    setArchetype(selected);
    setStep(4);
  };

  const handleHabitToggle = (habitId: string) => {
    if (selectedHabits.includes(habitId)) {
      setSelectedHabits(selectedHabits.filter(id => id !== habitId));
    } else {
      setSelectedHabits([...selectedHabits, habitId]);
    }
  };

  const handleHabitDelete = (habitId: string) => {
    setHabits(habits.filter(h => h.id !== habitId));
    setSelectedHabits(selectedHabits.filter(id => id !== habitId));
  };

  const handleAddCustomHabit = (habitName: string) => {
    const newHabit = createCustomHabit(habitName);
    setHabits([...habits, newHabit]);
    setCustomHabits([...customHabits, { id: newHabit.id, name: newHabit.name }]);
    setSelectedHabits([...selectedHabits, newHabit.id]);
  };

  const handleCompleteOnboarding = () => {
    if (selectedHabits.length === 0) {
      return;
    }

    saveOnboardingData(selectedHabits, customHabits, archetype);
    navigate("/dashboard-q3");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep onNext={() => setStep(2)} />;
      
      case 2:
        return (
          <ArchetypeStep 
            selectedArchetype={archetype}
            onSelectArchetype={handleSelectArchetype}
          />
        );

      case 4:
        return (
          <HabitSelectionStep
            habits={habits}
            selectedHabits={selectedHabits}
            onHabitToggle={handleHabitToggle}
            onHabitDelete={handleHabitDelete}
            onAddCustomHabit={handleAddCustomHabit}
            onComplete={handleCompleteOnboarding}
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

export default Onboarding;
