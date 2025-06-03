
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
  const cardRef = useRef<HTMLDivElement>(null);

  const dayLabels = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    setCurrentX(diff);
    
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentX(0);
    setSwipeDirection(null);
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

  return (
    <div className="relative">
      <Card 
        ref={cardRef}
        className={cn(
          "cursor-pointer transition-all border-2 relative overflow-hidden",
          isSelected 
            ? 'border-primary bg-primary/10' 
            : 'border-transparent hover:border-primary/50',
          isDragging && "select-none"
        )}
        style={{
          transform: `translateX(${currentX}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => !isDragging && onToggle(habit.id)}
      >
        {/* Swipe Actions */}
        {swipeDirection === 'left' && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              size="sm"
              variant="destructive"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {swipeDirection === 'right' && showRepeatOptions && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
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
          {showRepeatOptions && swipeDirection === 'right' && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-xs font-medium mb-2">Repetir nos dias:</p>
              <div className="flex gap-1 justify-between">
                {dayLabels.map((day, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-6 h-6 rounded-full text-xs font-medium transition-colors",
                      repeatDays.includes(index)
                        ? "bg-primary text-white"
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SwipeableHabitCard;
