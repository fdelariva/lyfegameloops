
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Plus, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import HabitInfoPopover from "./HabitInfoPopover";

interface SwipeableHabitCardProps {
  habit: {
    id: string;
    name: string;
    icon: string;
    description: string;
    category: string;
  };
  isSelected: boolean;
  onToggle: (habitId: string) => void;
  onDelete?: (habitId: string) => void;
  showRepeatOptions?: boolean;
  onRepeatChange?: (habitId: string, days: number[]) => void;
  repeatDays?: number[];
  habitInfo: {
    whyDo: string;
    howDo: string;
  };
}

const SwipeableHabitCard = ({
  habit,
  isSelected,
  onToggle,
  onDelete,
  showRepeatOptions = false,
  onRepeatChange,
  repeatDays = [],
  habitInfo
}: SwipeableHabitCardProps) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showRepeatSelection, setShowRepeatSelection] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const dayLabels = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const SWIPE_THRESHOLD = 80;

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setCurrentX(0);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    setCurrentX(Math.max(-150, Math.min(150, diff)));
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // If swiped far enough, trigger the action
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
      if (currentX > 0 && showRepeatOptions) {
        // Right swipe - show repeat options
        setShowRepeatSelection(!showRepeatSelection);
      } else if (currentX < 0 && onDelete) {
        // Left swipe - delete
        handleDelete();
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

  const handleDayToggle = (dayIndex: number) => {
    if (!onRepeatChange) return;
    
    const newDays = repeatDays.includes(dayIndex)
      ? repeatDays.filter(d => d !== dayIndex)
      : [...repeatDays, dayIndex];
    
    onRepeatChange(habit.id, newDays);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(habit.id);
    }
  };

  const handleCardClick = () => {
    if (!isDragging && Math.abs(currentX) < 10) {
      onToggle(habit.id);
    }
  };

  return (
    <div className="relative">
      <Card 
        ref={cardRef}
        className={cn(
          "cursor-pointer transition-all border-2 relative overflow-hidden select-none",
          isSelected 
            ? 'border-primary bg-primary/10' 
            : 'border-transparent hover:border-primary/50',
          isDragging && "transition-none"
        )}
        style={{
          transform: `translateX(${currentX}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Left Action - Delete */}
        {swipeDirection === 'left' && onDelete && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-destructive text-destructive-foreground rounded-full p-2">
              <X className="h-4 w-4" />
            </div>
          </div>
        )}
        
        {/* Right Action - Repeat Options */}
        {swipeDirection === 'right' && showRepeatOptions && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-primary text-primary-foreground rounded-full p-2">
              <Plus className="h-4 w-4" />
            </div>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{habit.icon}</span>
              <CardTitle className="text-base">{habit.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <HabitInfoPopover habitName={habit.name} habitInfo={habitInfo}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-1 h-6 w-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Brain className="h-3 w-3" />
                </Button>
              </HabitInfoPopover>
              {isSelected && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm mb-2">
            {habit.description}
          </CardDescription>
          <Badge variant="outline" className="text-xs mb-3">
            {habit.category}
          </Badge>
          
          {/* Repeat Days Selection */}
          {showRepeatOptions && showRepeatSelection && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-xs font-medium mb-2">Repetir nos dias:</p>
              <div className="flex gap-1 justify-between">
                {dayLabels.map((day, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-6 h-6 rounded-full text-xs font-medium transition-colors",
                      repeatDays.includes(index)
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-muted"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDayToggle(index);
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {repeatDays.length === 0 
                  ? "Nenhum dia selecionado" 
                  : `${repeatDays.length} dia${repeatDays.length > 1 ? 's' : ''} selecionado${repeatDays.length > 1 ? 's' : ''}`
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SwipeableHabitCard;
