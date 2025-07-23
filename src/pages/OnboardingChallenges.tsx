
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, Flag, TrendingUp, Plus, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const CHALLENGES = [
  { id: 1, title: "Arrumar sua cama", description: "Organizar e arrumar a cama ao acordar", xp: 20, icon: "🛏️", difficulty: "Fácil" },
  { id: 2, title: "Escovar os dentes", description: "Cuidar da higiene bucal", xp: 25, icon: "🦷", difficulty: "Fácil" },
  { id: 3, title: "Lavar meu rosto pela manhã", description: "Refrescar o rosto ao acordar", xp: 30, icon: "💧", difficulty: "Fácil" },
  { id: 4, title: "Levantar da cadeira e fazer 1 alongamento", description: "Movimentar o corpo durante o dia", xp: 40, icon: "🤸‍♂️", difficulty: "Médio" },
  { id: 5, title: "Fazer algo que me faz feliz", description: "Dedicar tempo para atividades prazerosas", xp: 35, icon: "😊", difficulty: "Médio" },
  { id: 6, title: "Fazer 3 respirações profundas", description: "Relaxar com exercícios de respiração", xp: 30, icon: "🌬️", difficulty: "Fácil" },
  { id: 7, title: "Beber 1 copo de água", description: "Manter-se hidratado", xp: 25, icon: "💧", difficulty: "Fácil" }
];

const OnboardingChallenges = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedChallenges, setSelectedChallenges] = useState<number[]>([]);
  const [customChallenge, setCustomChallenge] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [challenges, setChallenges] = useState(CHALLENGES);

  const handleChallengeSelection = (id: number) => {
    setSelectedChallenges(prev => {
      if (prev.includes(id)) {
        return prev.filter(challengeId => challengeId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAddCustomChallenge = () => {
    if (customChallenge.trim()) {
      const newChallenge = {
        id: Date.now(),
        title: customChallenge.trim(),
        description: "Desafio personalizado",
        xp: 35,
        icon: "✨",
        difficulty: "Personalizado"
      };
      setChallenges([...challenges, newChallenge]);
      setSelectedChallenges([...selectedChallenges, newChallenge.id]);
      setCustomChallenge("");
      setShowCustomInput(false);
      toast({
        title: "Desafio customizado adicionado!",
        description: "Seu desafio personalizado foi criado com sucesso.",
      });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && selectedChallenges.length === 0) {
      toast({
        title: "Nenhum desafio selecionado",
        description: "Por favor, selecione pelo menos um desafio para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const getTotalXP = () => {
    return selectedChallenges.reduce((total, id) => {
      const challenge = challenges.find(c => c.id === id);
      return total + (challenge?.xp || 0);
    }, 0);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Desafios Diários</h2>
              <p className="text-muted-foreground">
                Escolha os desafios que você quer fazer e adicione desafios personalizados se desejar
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-sm">
                  {selectedChallenges.length} desafios selecionados
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomInput(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Desafio Personalizado
                </Button>
              </div>

              {showCustomInput && (
                <Card className="mb-4 border-primary bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite seu desafio personalizado..."
                        value={customChallenge}
                        onChange={(e) => setCustomChallenge(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomChallenge()}
                      />
                      <Button
                        size="sm"
                        onClick={handleAddCustomChallenge}
                        disabled={!customChallenge.trim()}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setShowCustomInput(false);
                          setCustomChallenge("");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((challenge) => (
                  <Card 
                    key={challenge.id}
                    className={`cursor-pointer transition-all border-2 ${
                      selectedChallenges.includes(challenge.id) 
                        ? "border-primary bg-primary/10" 
                        : "border-transparent hover:border-primary/50"
                    }`}
                    onClick={() => handleChallengeSelection(challenge.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="text-3xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge>{`+${challenge.xp} XP`}</Badge>
                            {selectedChallenges.includes(challenge.id) && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{challenge.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">{challenge.difficulty}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      case 2: // ... keep existing code (rewards system)
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Sistema de Recompensas</h2>
              <p className="text-muted-foreground mb-6">
                Veja como funciona nosso sistema de recompensas por desafios
              </p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Conquistas Diárias</h3>
                      <p className="text-sm text-muted-foreground">Complete desafios para ganhar XP</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <div className="grid grid-cols-1 gap-2">
                      {selectedChallenges.map(id => {
                        const challenge = challenges.find(c => c.id === id);
                        return challenge ? (
                          <div key={challenge.id} className="flex items-center justify-between p-2 rounded-md bg-accent/50">
                            <div className="flex items-center gap-2">
                              <span>{challenge.icon}</span>
                              <span>{challenge.title}</span>
                            </div>
                            <Badge>{`+${challenge.xp} XP`}</Badge>
                          </div>
                        ) : null;
                      })}
                      <div className="flex items-center justify-between p-2 font-medium mt-2">
                        <span>Total diário:</span>
                        <Badge variant="secondary">{`${getTotalXP()} XP / dia`}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Nível de Progresso</h3>
                      <p className="text-sm text-muted-foreground">Evolua seu nível e desbloqueie recursos</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Nível 1</span>
                        <span>Nível 2</span>
                      </div>
                      <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "15%" }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getTotalXP()} / 500 XP para o próximo nível
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Flag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Marcos e Recompensas</h3>
                      <p className="text-sm text-muted-foreground">Alcance marcos para receber recompensas especiais</p>
                    </div>
                  </div>
                  <div className="pl-16 space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-md bg-accent/50">
                      <span>7 dias consecutivos</span>
                      <span className="text-amber-500">🏆 Troféu de Bronze</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-accent/50">
                      <span>30 dias consecutivos</span>
                      <span className="text-slate-300">🏆 Troféu de Prata</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-accent/50">
                      <span>100 dias consecutivos</span>
                      <span className="text-yellow-500">🏆 Troféu de Ouro</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 3: // ... keep existing code (final screen)
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Pronto para Começar!</h2>
              <p className="text-muted-foreground mb-6">
                Seus desafios diários foram configurados
              </p>
            </div>

            <Card className="border-green-500/30">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Desafios Selecionados</h3>
                  <p className="text-muted-foreground">
                    Você selecionou {selectedChallenges.length} desafios para começar sua jornada
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedChallenges.map(id => {
                    const challenge = challenges.find(c => c.id === id);
                    return challenge ? (
                      <div key={challenge.id} className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                        <div className="text-2xl">{challenge.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{challenge.title}</h4>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                        <Badge>{`+${challenge.xp} XP`}</Badge>
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">XP diário total:</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-600">
                      {getTotalXP()} XP
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-muted-foreground">
              <p>Seus desafios estarão disponíveis no seu dashboard todos os dias</p>
              <p>Complete-os diariamente para evoluir e ganhar recompensas!</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-background to-primary/5">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stepNumber === step
                        ? "bg-primary text-primary-foreground"
                        : stepNumber < step
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-16 h-1 ${
                        stepNumber < step ? "bg-primary" : "bg-secondary"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (step > 1) {
                  setStep(step - 1);
                } else {
                  navigate("/");
                }
              }}
            >
              {step > 1 ? "Anterior" : "Voltar"}
            </Button>
            <Button onClick={handleNextStep}>
              {step < 3 ? "Próximo" : "Começar Jornada"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingChallenges;
