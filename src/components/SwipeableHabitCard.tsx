import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setCurrentX(0);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const diffX = touch.clientX - startX;
    
    setCurrentX(Math.max(-150, Math.min(150, diffX)));
    
    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      setSwipeDirection(diffX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
      if (currentX > 0 && showRepeatOptions) {
        setShowRepeatSelection(!showRepeatSelection);
      } else if (currentX < 0 && onDelete) {
        handleDelete();
      }
    }
    
    setCurrentX(0);
    setSwipeDirection(null);
  };

  // Mouse event handlers for desktop
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
    
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
      if (currentX > 0 && showRepeatOptions) {
        setShowRepeatSelection(!showRepeatSelection);
      } else if (currentX < 0 && onDelete) {
        handleDelete();
      }
    }
    
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
          "cursor-pointer transition-all border-2 relative overflow-hidden select-none h-20",
          isSelected 
            ? 'border-primary bg-primary/10' 
            : 'border-transparent hover:border-primary/50',
          isDragging && "transition-none"
        )}
        style={{
          transform: `translateX(${currentX}px)`,
          touchAction: 'pan-y pinch-zoom'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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

        <CardContent className="p-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-lg flex-shrink-0">{habit.icon}</span>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm truncate">{habit.name}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                {habit.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
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
        </CardContent>

        {/* Repeat Days Selection - Compact version */}
        {showRepeatOptions && showRepeatSelection && (
          <div className="absolute bottom-0 left-0 right-0 bg-muted p-2 border-t">
            <div className="flex gap-1 justify-center">
              {dayLabels.map((day, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-5 h-5 rounded-full text-xs font-medium transition-colors",
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
          </div>
        )}
      </Card>
    </div>
  );
};

export default SwipeableHabitCard;
