
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Brain, Target, Calendar, Sparkles, Coffee } from "lucide-react";

interface Habit {
  id: string;
  title: string;
  description: string;
  energyBoost: number;
  skillBoost: number;
  connectionBoost: number;
  completed: boolean;
}

interface MorningBriefProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstVisit: boolean;
  todayHabits: Habit[];
}

const MorningBrief = ({ isOpen, onClose, isFirstVisit, todayHabits }: MorningBriefProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getMotivationalMessage = () => {
    const messages = [
      "Hoje é uma nova oportunidade de ser a melhor versão de si mesmo.",
      "Cada pequeno passo que você dá hoje te aproxima dos seus sonhos.",
      "Você tem o poder de transformar este dia em algo extraordinário.",
      "Lembre-se: consistência pequena supera esforços esporádicos grandiosos."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getWeatherWisdom = () => {
    const wisdoms = [
      "Como o sol nasce todo dia, você também pode recomeçar a cada momento.",
      "Assim como as plantas crescem em direção à luz, permita-se crescer em direção aos seus objetivos.",
      "A natureza nos ensina sobre paciência e persistência. Aplique isso aos seus hábitos.",
      "Cada manhã é um presente - por isso se chama presente."
    ];
    return wisdoms[Math.floor(Math.random() * wisdoms.length)];
  };

  const priorityHabits = todayHabits.slice(0, 3);

  const slides = [
    // Welcome Slide
    {
      title: isFirstVisit ? "Bem-vindo ao seu novo dia!" : "Bom dia!",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">
            {isFirstVisit ? "🌅" : "☀️"}
          </div>
          <p className="text-muted-foreground">
            {isFirstVisit 
              ? "Hoje marca o início da sua jornada de transformação. O Oracle está aqui para guiá-lo."
              : "Mais um dia para evoluir e crescer. Que energia você quer cultivar hoje?"
            }
          </p>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Sabedoria Matinal</h3>
              </div>
              <p className="text-sm text-blue-700">
                {getMotivationalMessage()}
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    // Today's Focus Slide
    {
      title: "Foco do Dia",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Seus Hábitos Prioritários</h3>
            <p className="text-sm text-muted-foreground mb-4">
              O Oracle selecionou os hábitos mais importantes para hoje
            </p>
          </div>
          
          <div className="space-y-3">
            {priorityHabits.map((habit, index) => (
              <Card key={habit.id} className="border-primary/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{habit.title}</h4>
                      <p className="text-xs text-muted-foreground">{habit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3">
              <p className="text-sm text-green-700 text-center">
                <Target className="h-4 w-4 inline mr-1" />
                Concentre-se nesses hábitos para maximizar seu progresso hoje
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    // Oracle Guidance Slide
    {
      title: "Orientação do Oracle",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-lg font-semibold mb-2">Orientações Personalizadas</h3>
          </div>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Energia do Dia</h3>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                {getWeatherWisdom()}
              </p>
              <div className="text-xs text-purple-600 bg-purple-100 rounded p-2">
                💡 Dica: Comece pelo hábito que mais te energiza. Isso criará momentum para os demais.
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-amber-800">Lembrete Importante</h3>
              </div>
              <p className="text-sm text-amber-700">
                Eu estarei aqui durante todo o dia para oferecer suporte e orientação. 
                Não hesite em conversar comigo quando precisar de motivação!
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            {slides[currentSlide].title}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {slides[currentSlide].content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            Anterior
          </Button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <Button onClick={nextSlide}>
            {currentSlide === slides.length - 1 ? 'Começar o Dia' : 'Próximo'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MorningBrief;
