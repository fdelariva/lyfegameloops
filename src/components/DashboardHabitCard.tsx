
import React, { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Brain, X, Settings } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import HabitInfoPopover from "./HabitInfoPopover";

interface DashboardHabitCardProps {
  title: string;
  description: string;
  energyBoost?: number;
  connectionBoost?: number;
  skillBoost?: number;
  completed?: boolean;
  onComplete?: () => void;
  onDelete?: () => void;
  dayZeroBoost?: boolean;
  habitInfo?: {
    whyDo: string;
    howDo: string;
  };
}

const DashboardHabitCard = ({ 
  title, 
  description, 
  energyBoost = 0, 
  connectionBoost = 0, 
  skillBoost = 0,
  completed = false,
  onComplete,
  onDelete,
  dayZeroBoost = false,
  habitInfo = {
    whyDo: "Informações científicas sobre os benefícios deste hábito.",
    howDo: "Instruções detalhadas sobre como realizar este hábito."
  }
}: DashboardHabitCardProps) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 80;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (completed) return; // Don't allow swipe on completed habits
    setStartX(e.clientX);
    setCurrentX(0);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || completed) return;
    
    const diff = e.clientX - startX;
    setCurrentX(Math.max(-150, Math.min(150, diff)));
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || completed) return;
    
    setIsDragging(false);
    
    // If swiped far enough, trigger the action
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
      if (currentX < 0 && onDelete) {
        // Left swipe - delete
        handleDelete();
      } else if (currentX > 0) {
        // Right swipe - show settings/config (future feature)
        toast("Configurações do hábito em breve!");
      }
    }
    
    // Reset position
    setCurrentX(0);
    setSwipeDirection(null);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setCurrentX(0);
      setSwipeDirection(null);
    }
  };
  
  const handleComplete = () => {
    if (onComplete && !completed) {
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

  const handleDelete = () => {
    if (onDelete && !completed) {
      onDelete();
      toast.success("Hábito removido!");
    }
  };

  return (
    <div className="relative">
      <Card 
        ref={cardRef}
        className={cn(
          "relative overflow-hidden transition-all select-none",
          completed ? 'bg-primary/5 border-primary/30' : '',
          !completed && isDragging && "transition-none"
        )}
        style={{
          transform: !completed ? `translateX(${currentX}px)` : 'translateX(0px)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Day Zero Boost Badge */}
        {dayZeroBoost && (
          <div className="absolute right-0 top-0 bg-primary text-white text-xs py-1 px-2 rounded-bl">
            +200% hoje!
          </div>
        )}

        {/* Left Action - Delete */}
        {swipeDirection === 'left' && onDelete && !completed && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-destructive text-destructive-foreground rounded-full p-2">
              <X className="h-4 w-4" />
            </div>
          </div>
        )}
        
        {/* Right Action - Settings */}
        {swipeDirection === 'right' && !completed && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-muted text-muted-foreground rounded-full p-2">
              <Settings className="h-4 w-4" />
            </div>
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
    </div>
  );
};

export default DashboardHabitCard;
