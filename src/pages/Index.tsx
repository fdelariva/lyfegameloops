
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trophy, Users, Sword, Heart, ExternalLink } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/5 p-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">Lyfe</h1>
        <p className="text-xl text-muted-foreground">
          Transforme hábitos em evolução pessoal
        </p>
      </div>

      <Card className="w-full max-w-md mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-semibold">Desenvolva Hábitos</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">⬆️</div>
              <div className="font-semibold">Evolua seu Avatar</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🎲</div>
              <div className="font-semibold">Ganhe Recompensas</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🤝</div>
              <div className="font-semibold">Conecte-se</div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium mb-3 text-center">Escolha uma versão</h3>
            
            <Button 
              size="lg" 
              className="w-full mb-3 bg-gradient-to-r from-blue-500 to-purple-600" 
              onClick={() => navigate("/onboarding-oracle")}
            >
              <span className="mr-2">🔮</span>
              Jornada do Oráculo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              className="w-full mb-3 bg-gradient-to-r from-orange-500 to-red-500" 
              onClick={() => navigate("/onboarding-streak")}
            >
              <span className="mr-2">🔥</span>
              Streak Acelerado
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              className="w-full mb-3 bg-gradient-to-r from-red-500 to-amber-500" 
              onClick={() => navigate("/onboarding-competitive")}
            >
              <span className="mr-2">🏆</span>
              Desafio Competitivo
              <Users className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              className="w-full mb-3 bg-gradient-to-r from-purple-600 to-pink-600" 
              onClick={() => navigate("/onboarding-hero")}
            >
              <span className="mr-2">⚔️</span>
              Jornada do Herói
              <Sword className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              className="w-full mb-3 bg-gradient-to-r from-pink-500 to-rose-500" 
              onClick={() => navigate("/onboarding-finch")}
            >
              <span className="mr-2">💖</span>
              Companheiro de Autocuidado
              <Heart className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              className="w-full mb-3 bg-gradient-to-r from-cyan-500 to-blue-600" 
              onClick={() => navigate("/onboarding-q3")}
            >
              <span className="mr-2">🚀</span>
              Main Bet: Q3 Future Scenario
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              className="w-full" 
              variant="outline"
              onClick={() => navigate("/onboarding")}
            >
              <span className="mr-2">👤</span>
              Main bet: Progress & Achievement
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3 text-center">
        <p className="text-sm text-muted-foreground">
          Protótipo do novo onboarding com múltiplas versões de game loop para testes
        </p>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => window.open('https://github.com/fdelariva/lyfegameloops/wiki', '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Documentação do Projeto
        </Button>
      </div>
    </div>
  );
};

export default Index;
