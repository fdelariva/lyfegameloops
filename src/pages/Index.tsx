
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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

          <Button 
            size="lg" 
            className="w-full" 
            onClick={() => navigate("/onboarding")}
          >
            Começar Minha Jornada
          </Button>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Protótipo do novo onboarding com foco na Jornada do Avatar Acelerada
      </p>
    </div>
  );
};

export default Index;
