
import { toast } from "@/components/ui/sonner";

export const saveOnboardingData = (
  selectedHabits: string[],
  customHabits: Array<{id: string, name: string}>,
  archetype: string
) => {
  console.log("Saving selected habits:", selectedHabits);
  console.log("Saving custom habits:", customHabits);
  
  localStorage.setItem('selectedHabits', JSON.stringify(selectedHabits));
  localStorage.setItem('customHabits', JSON.stringify(customHabits));
  localStorage.setItem('userArchetype', archetype);
  localStorage.setItem('onboardingCompleted', 'true');
  localStorage.setItem('gameMode', 'regular');
  localStorage.setItem('userLevel', '1');
  localStorage.setItem('userEnergy', '25');
  localStorage.setItem('userConnection', '20');
  localStorage.setItem('userSkill', '15');
  localStorage.setItem('userCoins', '100');
  localStorage.setItem('isDayZero', 'true');
  
  toast.success("Onboarding completo!");
  toast("Bônus de boas-vindas!", {
    description: "+ 100 moedas adicionadas à sua conta!",
  });
};

export const createCustomHabit = (habitName: string) => {
  return {
    id: `custom-${Date.now()}`,
    name: habitName,
    icon: "✨",
    description: "Hábito personalizado",
    category: "Personalizado",
    info: {
      whyDo: "Este é um hábito personalizado criado por você. Desenvolva sua própria motivação e descubra os benefícios únicos que ele pode trazer para sua vida.",
      howDo: "Como este é seu hábito personalizado, você é quem melhor sabe como executá-lo. Defina os passos específicos e mantenha consistência na execução."
    }
  };
};
