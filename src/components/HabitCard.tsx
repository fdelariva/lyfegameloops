
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Brain } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import HabitInfoPopover from "./HabitInfoPopover";

interface HabitCardProps {
  title: string;
  description: string;
  energyBoost?: number;
  connectionBoost?: number;
  skillBoost?: number;
  completed?: boolean;
  onComplete?: () => void;
  dayZeroBoost?: boolean;
  habitInfo?: {
    whyDo: string;
    howDo: string;
  };
}

const HabitCard = ({ 
  title, 
  description, 
  energyBoost = 0, 
  connectionBoost = 0, 
  skillBoost = 0,
  completed = false,
  onComplete,
  dayZeroBoost = false,
  habitInfo = {
    whyDo: "Informações científicas sobre os benefícios deste hábito.",
    howDo: "Instruções detalhadas sobre como realizar este hábito."
  }
}: HabitCardProps) => {
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
      
      // Show toast with appropriate message
      if (dayZeroBoost) {
        toast("Hábito completado!", {
          description: "Bônus Dia 0: +200% em todas as características!",
          duration: 3000,
        });
      } else {
        toast("Hábito completado!", {
          description: "Seu avatar está evoluindo!",
          duration: 2000,
        });
      }
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all ${completed ? 'bg-primary/5 border-primary/30' : ''}`}>
      {dayZeroBoost && (
        <div className="absolute right-0 top-0 bg-primary text-white text-xs py-1 px-2 rounded-bl">
          +200% hoje!
        </div>
      )}
      
      <CardContent className="pt-6 pb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2">
            <HabitInfoPopover habitName={title} habitInfo={habitInfo}>
              <Button
                size="sm"
                variant="ghost"
                className="p-1 h-6 w-6"
              >
                <Brain className="h-3 w-3" />
              </Button>
            </HabitInfoPopover>
            {completed ? (
              <CheckCircle className="text-primary h-6 w-6" />
            ) : (
              <Circle className="text-muted-foreground h-6 w-6" />
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex gap-2 flex-wrap">
          {energyBoost > 0 && (
            <Badge variant="outline" className="bg-orange-50">
              +{dayZeroBoost ? energyBoost * 2 : energyBoost} Energia
            </Badge>
          )}
          {connectionBoost > 0 && (
            <Badge variant="outline" className="bg-blue-50">
              +{dayZeroBoost ? connectionBoost * 2 : connectionBoost} Conexão
            </Badge>
          )}
          {skillBoost > 0 && (
            <Badge variant="outline" className="bg-green-50">
              +{dayZeroBoost ? skillBoost * 2 : skillBoost} Habilidade
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pb-4 pt-2">
        {!completed ? (
          <Button onClick={handleComplete} className="w-full">
            Completar Hábito
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full opacity-70">
            Completado
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
