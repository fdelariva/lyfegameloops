
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Trophy, Users, Share2, Award, Calendar, Flag, Star, 
  MessageSquare, ThumbsUp, Bell, ArrowRight, Copy, Crown,
  Medal, Sword, Target, Heart, Network, Brain, Shield,
  Zap
} from "lucide-react";
import LuckyCards from "@/components/LuckyCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const OnboardingCompetitive = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [showLuckyCards, setShowLuckyCards] = useState(false);
  const [showInviteFriends, setShowInviteFriends] = useState(false);
  const [inviteLink, setInviteLink] = useState("https://lyfe.app/join/abc123");
  
  // Desafios Squad Competitivos e Cooperativos
  const challenges = [
    {
      id: "warriors",
      name: "Guerreiros da Disciplina",
      description: "Exercícios, alimentação e sono",
      icon: <Sword className="h-6 w-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      habits: ["Exercitar-se 30min", "Alimentação saudável", "Dormir 8h", "Beber 2L água"],
      goal: "Completar 80% dos hábitos coletivamente",
      squadMeta: "Squad com maior % de completude diária"
    },
    {
      id: "productivity",
      name: "Mestres da Produtividade",
      description: "Foco no trabalho, organização e aprendizado",
      icon: <Target className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      habits: ["Deep Work 2h", "Organizar workspace", "Aprender algo novo", "Planejar o dia"],
      goal: "Acumular mais pontos de produtividade",
      squadMeta: "Squad com maior eficiência coletiva"
    },
    {
      id: "wellbeing",
      name: "Guardiões do Bem-Estar",
      description: "Meditação, journaling e gratidão",
      icon: <Heart className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      habits: ["Meditar 15min", "Journaling", "Gratidão diária", "Respiração consciente"],
      goal: "Maior nível de paz interior do grupo",
      squadMeta: "Squad com melhor pontuação de bem-estar"
    },
    {
      id: "social",
      name: "Conquistadores Sociais",
      description: "Networking, família e amizades",
      icon: <Network className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      habits: ["Conectar com família", "Networking", "Ajudar alguém", "Socializar"],
      goal: "Fortalecer conexões internas e externas",
      squadMeta: "Squad com mais interações sociais"
    },
    {
      id: "complete",
      name: "Lendas Completas",
      description: "Mix de todas as categorias",
      icon: <Star className="h-6 w-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      habits: ["Exercício", "Produtividade", "Bem-estar", "Social", "Aprendizado", "Criatividade"],
      goal: "Versatilidade total em todas as áreas",
      squadMeta: "Squad mais equilibrado"
    }
  ];
  
  // Rankings simulados
  const globalRanking = [
    { position: 1, name: "Carlos A.", points: 320, avatar: "👨‍💼" },
    { position: 2, name: "Maria S.", points: 305, avatar: "👩‍🔬" },
    { position: 3, name: "João P.", points: 290, avatar: "👨‍🚀" },
    { position: 4, name: "Ana L.", points: 275, avatar: "👩‍⚕️" },
    { position: 5, name: "Você", points: 150, avatar: "😎", isYou: true }
  ];
  
  const friendsRanking = [
    { position: 1, name: "Lucas F.", points: 210, avatar: "👨‍🎓", friend: true },
    { position: 2, name: "Você", points: 150, avatar: "😎", isYou: true },
    { position: 3, name: "Julia M.", points: 145, avatar: "👩‍💻", friend: true },
    { position: 4, name: "Pedro H.", points: 130, avatar: "👨‍🍳", friend: true },
  ];
  
  // Sistema de pontuação
  const scoreSystem = [
    { action: "Hábito completado", points: 10, icon: "✅" },
    { action: "Dia completo (todos hábitos)", points: 50, icon: "🔥" },
    { action: "Streak consecutivo", points: "Multiplicador", icon: "⚡" },
    { action: "Primeiro do dia", points: 25, icon: "🥇" },
    { action: "Bônus Madrugador (antes das 10h)", points: 15, icon: "🌅" },
    { action: "Power Hour (aleatório)", points: "2x", icon: "⚡" },
    { action: "Reação de amigo", points: 2, icon: "👍" }
  ];

  // Badges que podem ser conquistadas
  const badges = [
    { name: "Imbatível", description: "Líder por 3 dias consecutivos", icon: "👑" },
    { name: "Comeback Kid", description: "Saiu do último para o top 10", icon: "🚀" },
    { name: "Motivador", description: "Mais reações dadas", icon: "💪" },
    { name: "Consistente", description: "Completou todos os dias", icon: "⚡" },
    { name: "Rival", description: "Ultrapassou o mesmo amigo 3x", icon: "🥊" }
  ];

  const handleSelectChallenge = (challengeId: string) => {
    setSelectedChallenge(challengeId);
    setStep(3);
  };

  const handleFirstHabitComplete = () => {
    toast("Primeiro hábito completado!", {
      description: "Você está na posição #5 de 47 participantes!",
    });
    
    // Mostrar cartas da sorte após primeiro hábito
    setShowLuckyCards(true);
  };
  
  const handleSecondHabitComplete = () => {
    toast.success("Segundo hábito completado!");
    toast("Ranking de Amigos desbloqueado!", {
      description: "Você está em #2 entre seus amigos!",
    });
    
    // Após pequeno delay, mostrar notificação de competição
    setTimeout(() => {
      toast("Atenção!", {
        description: "Julia está apenas 5 pontos atrás de você! Mantenha a liderança!",
      });
    }, 3000);
  };

  const handleCompleteDay = () => {
    toast.success("Dia 0 Completo!");
    toast("Projeção de Ranking", {
      description: "Se completar tudo amanhã, você pode chegar à posição #3!",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };
  
  const handleInviteFriends = () => {
    setShowInviteFriends(true);
  };
  
  const handleShareLink = (platform: string) => {
    toast.success(`Link compartilhado via ${platform}!`);
    setTimeout(() => {
      setShowInviteFriends(false);
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Transforme sua jornada em uma aventura épica!
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Escolha seu desafio e forme um squad com seus amigos. 70% cooperação + 30% competição saudável.
            </p>
            
            <Card className="w-full max-w-md mb-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Sistema de Squad (3-5 pessoas)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Cooperação Interna</h3>
                    <p className="text-sm text-muted-foreground">
                      Ajudem-se mutuamente a completar hábitos
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Trophy className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Competição Externa</h3>
                    <p className="text-sm text-muted-foreground">
                      Squad vs outros squads no ranking global
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Multiplicadores</h3>
                    <p className="text-sm text-muted-foreground">
                      Atividades simultâneas dobram pontos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button size="lg" onClick={() => setStep(2)} className="mb-3">
              <Trophy className="mr-2 h-4 w-4" />
              Escolher Desafio
            </Button>
            
            <Button variant="outline" onClick={() => navigate("/")}>
              Voltar para opções
            </Button>
          </div>
        );
        
      case 2:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Escolha seu Campo de Batalha</h2>
            <p className="text-muted-foreground text-center mb-6">
              Selecione um desafio de 7 dias que combina com seus objetivos
            </p>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-xl mb-6">
              {challenges.map((challenge) => (
                <Card 
                  key={challenge.id}
                  className={`cursor-pointer transition hover:border-primary ${
                    selectedChallenge === challenge.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleSelectChallenge(challenge.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-xl">{challenge.icon}</span>
                        {challenge.name}
                      </CardTitle>
                      <Badge variant="secondary" className="ml-auto">7 dias</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3">
                      {challenge.description}
                    </CardDescription>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Hábitos incluídos:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {challenge.habits.map((habit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span>•</span> {habit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium">Meta do Squad:</p>
                      <p className="text-xs text-muted-foreground">{challenge.goal}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card 
                className="cursor-pointer transition hover:border-primary border-dashed border-2"
                onClick={() => navigate("/onboarding-challenges")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-purple-600">Desafio Customizado</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Crie seu próprio desafio personalizado
                  </p>
                  <Badge variant="outline">Personalizável</Badge>
                </CardContent>
              </Card>
            </div>
            
            <Button variant="outline" onClick={() => setStep(1)}>
              Voltar
            </Button>
          </div>
        );
        
      case 3:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Sistema de Pontuação</h2>
            <p className="text-muted-foreground text-center mb-6">
              Entenda como ganhar pontos e superar seus amigos
            </p>
            
            <Card className="w-full max-w-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5" />
                  Como Pontuar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scoreSystem.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.action}</span>
                      </div>
                      <Badge variant="secondary">
                        {typeof item.points === "number" ? `+${item.points}` : item.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-muted-foreground">
                Mantenha streaks para aumentar seu multiplicador!
              </CardFooter>
            </Card>
            
            <Card className="w-full max-w-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges Desbloqueáveis
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <div key={index} className="border rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="font-medium text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">{badge.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <div className="flex gap-3">
              <Button onClick={() => setStep(4)} size="lg">
                <Users className="mr-2 h-4 w-4" />
                Convidar Amigos
              </Button>
              <Button variant="outline" onClick={() => setStep(2)}>
                Voltar
              </Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Convide seus amigos!</h2>
            <p className="text-muted-foreground text-center mb-6">
              Forme seu squad de 3-5 pessoas para começar a aventura
            </p>
            
            <Tabs defaultValue="create" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="create">Criar Squad</TabsTrigger>
                <TabsTrigger value="join">Entrar Squad</TabsTrigger>
                <TabsTrigger value="solo">Começar Solo</TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Novo Squad</CardTitle>
                    <CardDescription>Nomeie seu grupo e convide amigos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="squadName">Nome do Squad</Label>
                      <Input id="squadName" placeholder="Ex: Guerreiros Invencíveis" />
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium mb-2">Código do Squad: ABC123</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Compartilhe este código com seus amigos
                      </p>
                      
                      <div className="flex gap-2 mb-3">
                        <Input 
                          value="https://app.exemplo.com/join-squad/ABC123" 
                          readOnly 
                          className="flex-1"
                        />
                        <Button 
                          size="icon"
                          onClick={() => {
                            navigator.clipboard.writeText("https://app.exemplo.com/join-squad/ABC123");
                            toast.success("Link copiado!");
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleShareLink('WhatsApp')}>
                          <Share2 className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleShareLink('Instagram')}>
                          <Share2 className="h-4 w-4 mr-1" />
                          Instagram
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="join" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Entrar em Squad</CardTitle>
                    <CardDescription>Use o código enviado por seus amigos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="squadCode">Código do Squad</Label>
                      <Input id="squadCode" placeholder="Ex: ABC123" />
                    </div>
                    <Button onClick={() => setStep(5)} className="w-full">
                      Entrar no Squad
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solo" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Começar Solo</CardTitle>
                    <CardDescription>Você pode entrar em um squad depois</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => setStep(5)} variant="outline" className="w-full">
                      Continuar Sozinho
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 mt-6">
              <Button onClick={() => navigate("/dashboard-q3")} size="lg">
                <ArrowRight className="mr-2 h-4 w-4" />
                Ir para Dashboard
              </Button>
              <Button variant="outline" onClick={() => setStep(3)}>
                Voltar
              </Button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Dia 0: Inicie Sua Jornada</h2>
            <p className="text-muted-foreground text-center mb-6">
              Complete seus primeiros hábitos para subir no ranking
            </p>
            
            <Card className="w-full max-w-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Ranking Global Inicial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {globalRanking.map((user) => (
                  <div 
                    key={user.position} 
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      user.isYou ? 'bg-primary/10 font-semibold' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 text-center font-bold">#{user.position}</div>
                      <div className="text-xl">{user.avatar}</div>
                      <div>{user.name}</div>
                    </div>
                    <Badge variant="secondary">{user.points} pts</Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center text-sm text-muted-foreground">
                Complete hábitos para subir no ranking!
              </CardFooter>
            </Card>
            
            <Tabs defaultValue="habits" className="w-full max-w-md mb-6">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="habits">
                  <Flag className="mr-2 h-4 w-4" />
                  Hábitos do Dia
                </TabsTrigger>
                <TabsTrigger value="social">
                  <Users className="mr-2 h-4 w-4" />
                  Social
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="habits">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Hábitos para Hoje</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Primeiro hábito do dia</p>
                          <p className="text-sm text-muted-foreground">Completo para ganhar +10 pontos</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={handleFirstHabitComplete}>Completar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Segundo hábito do dia</p>
                          <p className="text-sm text-muted-foreground">Complete para desbloquear ranking de amigos</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={handleSecondHabitComplete}>Completar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Flag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Terceiro hábito do dia</p>
                          <p className="text-sm text-muted-foreground">Complete para finalizar o dia</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={handleCompleteDay}>Completar</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="social">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Ranking de Amigos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {friendsRanking.map((user) => (
                      <div 
                        key={user.position} 
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          user.isYou ? 'bg-primary/10 font-semibold' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 text-center font-bold">#{user.position}</div>
                          <div className="text-xl">{user.avatar}</div>
                          <div>{user.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{user.points} pts</Badge>
                          {!user.isYou && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => toast.success("Reação enviada!")}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button 
                      variant="outline" 
                      className="text-sm" 
                      onClick={handleInviteFriends}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Convidar mais amigos
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-3xl">
        {renderStep()}
      </div>
      
      <LuckyCards 
        isOpen={showLuckyCards}
        onClose={() => setShowLuckyCards(false)}
        guaranteedReward={true}
      />
      
      <Dialog open={showInviteFriends} onOpenChange={setShowInviteFriends}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Convide seus amigos</DialogTitle>
            <DialogDescription>
              Compartilhe este link com seus amigos para participarem do desafio
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-2 mb-4">
            <Input value={inviteLink} readOnly className="bg-muted/50" />
            <Button 
              variant="secondary" 
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
                toast.success("Link copiado!");
              }}
            >
              Copiar
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => handleShareLink("WhatsApp")} className="flex gap-2">
              <span className="text-lg">📱</span>
              WhatsApp
            </Button>
            <Button variant="outline" onClick={() => handleShareLink("Instagram")} className="flex gap-2">
              <span className="text-lg">📸</span>
              Instagram
            </Button>
            <Button variant="outline" onClick={() => handleShareLink("Email")} className="flex gap-2">
              <span className="text-lg">📧</span>
              Email
            </Button>
            <Button variant="outline" onClick={() => handleShareLink("SMS")} className="flex gap-2">
              <span className="text-lg">💬</span>
              SMS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingCompetitive;
