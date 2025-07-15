
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Moon, Star, Trophy, Share2, Heart, Brain } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface EndOfDayReviewProps {
  isOpen: boolean;
  onClose: () => void;
  completedHabits: number;
  totalHabits: number;
}

const EndOfDayReview = ({ isOpen, onClose, completedHabits, totalHabits }: EndOfDayReviewProps) => {
  const [reflection, setReflection] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [tomorrowFocus, setTomorrowFocus] = useState("");
  const [hasShared, setHasShared] = useState(false);

  const completionRate = Math.round((completedHabits / totalHabits) * 100);

  const getPerformanceMessage = () => {
    if (completionRate === 100) {
      return {
        title: "Dia Perfeito! 🌟",
        message: "Você completou todos os seus hábitos hoje. Isso é extraordinário!",
        color: "text-green-600"
      };
    } else if (completionRate >= 80) {
      return {
        title: "Excelente Progresso! 🚀",
        message: "Você teve um dia muito produtivo. Continue assim!",
        color: "text-blue-600"
      };
    } else if (completionRate >= 50) {
      return {
        title: "Bom Trabalho! 💪",
        message: "Você fez progresso significativo hoje. Cada passo conta!",
        color: "text-orange-600"
      };
    } else {
      return {
        title: "Todo Progresso Vale! 🌱",
        message: "Mesmo pequenos passos são vitórias. Amanhã é uma nova oportunidade!",
        color: "text-purple-600"
      };
    }
  };

  const handleShare = () => {
    setHasShared(true);
    toast.success("Progresso compartilhado com seus aliados!");
  };

  const handleSaveReflection = () => {
    // Save reflection data (could be to localStorage or backend)
    localStorage.setItem('dailyReflection', JSON.stringify({
      date: new Date().toDateString(),
      reflection,
      gratitude,
      tomorrowFocus,
      completionRate,
      completedHabits,
      totalHabits
    }));
    
    toast.success("Reflexão salva!");
    onClose();
  };

  const performance = getPerformanceMessage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Revisão do Dia
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Performance Summary */}
          <Card className="border-primary bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">
                {completionRate === 100 ? "🏆" : completionRate >= 80 ? "🌟" : completionRate >= 50 ? "💪" : "🌱"}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${performance.color}`}>
                {performance.title}
              </h3>
              <p className="text-muted-foreground mb-4">{performance.message}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-2xl font-bold">{completedHabits}/{totalHabits}</div>
                  <div className="text-xs text-muted-foreground">Hábitos</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <div className="text-xs text-muted-foreground">Conclusão</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oracle Wisdom */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Sabedoria do Oracle</h3>
              </div>
              <p className="text-sm text-blue-700">
                {completionRate === 100 
                  ? "Hoje você demonstrou que é capaz de transformar intenções em ações. Esse é o poder da disciplina consciente. Leve essa energia para amanhã!"
                  : completionRate >= 50
                  ? "Vejo crescimento em você. Cada hábito completado é uma declaração de que você escolhe ser melhor. Continue nutrindo essa versão sua."
                  : "Lembre-se: a jornada de mil milhas começa com um único passo. Você já deu vários passos hoje. Isso é coragem."
                }
              </p>
            </CardContent>
          </Card>

          {/* Reflection Questions */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Star className="h-4 w-4" />
                Como você se sente sobre o dia de hoje?
              </label>
              <Textarea
                placeholder="Compartilhe suas reflexões sobre o dia..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Heart className="h-4 w-4" />
                Pelo que você é grato hoje?
              </label>
              <Textarea
                placeholder="Liste 3 coisas pelas quais você é grato..."
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Trophy className="h-4 w-4" />
                Em que você quer focar amanhã?
              </label>
              <Textarea
                placeholder="Defina sua intenção para amanhã..."
                value={tomorrowFocus}
                onChange={(e) => setTomorrowFocus(e.target.value)}
                className="min-h-20"
              />
            </div>
          </div>

          {/* Social Sharing */}
          <Card className={`border-green-200 ${hasShared ? 'bg-green-50' : 'bg-green-25'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800">Inspire seus aliados</h3>
                  <p className="text-sm text-green-600">
                    Compartilhe seu progresso e motive sua rede
                  </p>
                </div>
                <Button 
                  onClick={handleShare} 
                  disabled={hasShared}
                  variant={hasShared ? "outline" : "default"}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  {hasShared ? "Compartilhado!" : "Compartilhar"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Pular
            </Button>
            <Button onClick={handleSaveReflection} className="flex-1">
              Salvar Reflexão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndOfDayReview;
