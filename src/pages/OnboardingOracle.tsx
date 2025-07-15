
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, MessageCircle } from "lucide-react";
import UserAvatar from "@/components/Avatar";


const OnboardingOracle = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [archetype, setArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido">("Indefinido");
  const [chatHistory, setChatHistory] = useState<{role: "oracle" | "user", message: string}[]>([
    {role: "oracle", message: "Olá! Sou o Oráculo do Lyfe. Estou aqui para ajudar você a descobrir seu verdadeiro potencial. Como está se sentindo hoje?"}
  ]);
  const [userInput, setUserInput] = useState("");
  const [oracleThinking, setOracleThinking] = useState(false);
  const [suggestedArchetype, setSuggestedArchetype] = useState<"Mestre" | "Guardião" | "Guerreiro" | "Sábio" | null>(null);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

  // Simples definições de arquétipos para mostrar no onboarding
  const archetypes = [
    { 
      name: "Guerreiro", 
      description: "Focado em disciplina e energia física. Ideal para quem busca força e determinação.",
      strengths: "Energia +++ / Habilidade ++ / Conexão +",
    },
    { 
      name: "Mestre", 
      description: "Equilibrado em todas as áreas. Excelente para quem busca desenvolvimento completo.",
      strengths: "Energia ++ / Habilidade +++ / Conexão ++",
    },
    { 
      name: "Sábio", 
      description: "Especialista em conhecimento e habilidades. Perfeito para quem busca aprendizado e sabedoria.",
      strengths: "Energia + / Habilidade +++ / Conexão ++",
    },
    { 
      name: "Guardião", 
      description: "Excelente em conexões e relacionamentos. Ideal para quem valoriza vínculos e empatia.",
      strengths: "Energia ++ / Habilidade + / Conexão +++",
    },
    { 
      name: "Indefinido", 
      description: "Crie seu próprio caminho! Você define suas prioridades durante a jornada.",
      strengths: "Energia ++ / Habilidade ++ / Conexão ++",
    }
  ];

  // Hábitos sugeridos pelo Oráculo
  const suggestedHabits = [
    {
      id: "1",
      title: "Beber água regularmente",
      description: "Beba pelo menos 2 litros de água por dia para melhorar sua energia.",
      points: { energy: 10, skill: 5, connection: 0 },
      category: "Corpo"
    },
    {
      id: "2",
      title: "Meditar por 5 minutos",
      description: "Uma meditação curta para acalmar a mente e melhorar o foco.",
      points: { energy: 5, skill: 7, connection: 8 },
      category: "Mente" 
    },
    {
      id: "3",
      title: "Escrever 3 gratidões",
      description: "Anote três coisas pelas quais você é grato hoje.",
      points: { energy: 3, skill: 5, connection: 12 },
      category: "Conexão"
    },
    {
      id: "4",
      title: "Alongamento matinal",
      description: "5 minutos de alongamento ao acordar para energizar seu corpo.",
      points: { energy: 15, skill: 3, connection: 0 },
      category: "Corpo"
    }
  ];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, {role: "user", message: userInput}]);
    setUserInput("");
    setOracleThinking(true);
    
    // Simulate oracle thinking
    setTimeout(() => {
      let oracleResponse = "";
      let recommendedArchetype: "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | null = null;
      
      // Simple keyword-based "AI" for the oracle
      const input = userInput.toLowerCase();
      if (input.includes("bem") || input.includes("ótimo") || input.includes("feliz")) {
        oracleResponse = "Que bom que está se sentindo bem! Pessoas com essa energia positiva geralmente se identificam com o arquétipo Guardião. Você gosta de se conectar com os outros?";
        recommendedArchetype = "Guardião";
      } else if (input.includes("cansado") || input.includes("exausto") || input.includes("estresse")) {
        oracleResponse = "Entendo que está se sentindo cansado. O arquétipo do Guerreiro pode ajudar a recuperar sua energia vital. O que acha de desenvolver sua força interior?";
        recommendedArchetype = "Guerreiro";
      } else if (input.includes("confuso") || input.includes("pensando") || input.includes("analisando")) {
        oracleResponse = "Hmm, percebo que você é alguém que gosta de refletir. O arquétipo do Sábio pode ser perfeito para você, ajudando a desenvolver sua sabedoria interna.";
        recommendedArchetype = "Sábio";
      } else if (input.includes("aprender") || input.includes("crescer") || input.includes("desenvolver")) {
        oracleResponse = "Vejo que você busca desenvolvimento pessoal completo! O arquétipo do Mestre seria ideal para você, equilibrando todas as áreas da vida.";
        recommendedArchetype = "Mestre";
      } else {
        oracleResponse = "Interessante... Baseado no que compartilhou, vejo potencial para o arquétipo do Mestre, que oferece um desenvolvimento equilibrado. O que acha?";
        recommendedArchetype = "Mestre";
      }
      
      // Update chat with oracle response
      setChatHistory(prev => [...prev, {role: "oracle", message: oracleResponse}]);
      setSuggestedArchetype(recommendedArchetype);
      setOracleThinking(false);
      
      // After 2 exchanges, suggest moving to archetype selection
      if (chatHistory.length >= 3) {
        setTimeout(() => {
          setChatHistory(prev => [...prev, {
            role: "oracle", 
            message: "Baseado em nossa conversa, acredito que o arquétipo ideal para você é o " + recommendedArchetype + ". Vamos explorar essa opção?"
          }]);
          
          // Automatically move to archetype selection after oracle suggestion
          setTimeout(() => setStep(3), 2000);
        }, 2000);
      }
    }, 1500);
  };

  const handleSelectArchetype = (selected: "Mestre" | "Guardião" | "Guerreiro" | "Sábio" | "Indefinido") => {
    setArchetype(selected);
    setStep(4);
  };

  const handleHabitSelection = (habitId: string) => {
    if (selectedHabits.includes(habitId)) {
      setSelectedHabits(selectedHabits.filter(id => id !== habitId));
    } else {
      // Limitar a 2 hábitos
      if (selectedHabits.length < 2) {
        setSelectedHabits([...selectedHabits, habitId]);
      } else {
        toast.info("O Oráculo recomenda começar com apenas 2 hábitos!");
      }
    }
  };

  const handleCompleteOnboarding = () => {
    toast.success("Onboarding completo!");
    toast("Bônus de boas-vindas!", {
      description: "+ 100 moedas adicionadas à sua conta!",
    });
    navigate("/dashboard");
  };

  // Renderiza os passos do onboarding
  const renderStep = () => {
    switch (step) {
      case 1: // Tela de boas-vindas
        return (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Lyfe!</h1>
            <p className="text-muted-foreground mb-8">
              Inicie sua jornada de desenvolvimento pessoal guiado pelo Oráculo, que irá descobrir seu potencial único.
            </p>
            <div className="w-full max-w-xs mb-8">
              <div className="relative h-32 flex items-center justify-center">
                <div className="absolute transform animate-fade-in animate-pulse">
                  <div className="text-6xl">🔮</div>
                  <div className="absolute -top-4 -right-4 bg-primary text-white text-xs rounded-full px-2 py-1">
                    +100
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Ganhe 100 moedas para começar sua jornada com o Oráculo!
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600"
              onClick={() => setStep(2)}
            >
              Consultar o Oráculo
            </Button>
          </div>
        );
      
      case 2: // Conversa com o Oráculo
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">O Oráculo Pessoal</h2>
            <p className="text-muted-foreground text-center mb-6">
              Converse com o Oráculo para que ele descubra o melhor caminho para você.
            </p>
            
            <Card className="w-full max-w-md mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4 max-h-80 overflow-y-auto py-2">
                  {chatHistory.map((chat, index) => (
                    <div 
                      key={index} 
                      className={`flex ${chat.role === "oracle" ? "justify-start" : "justify-end"}`}
                    >
                      <div 
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          chat.role === "oracle" 
                            ? "bg-primary/10 text-foreground" 
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {chat.message}
                      </div>
                    </div>
                  ))}
                  {oracleThinking && (
                    <div className="flex justify-start">
                      <div className="bg-primary/10 text-foreground max-w-[80%] px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-input rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    className="rounded-l-none"
                    disabled={oracleThinking || !userInput.trim()}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {suggestedArchetype && (
              <div className="text-center mb-4">
                <p className="text-sm text-primary font-medium">
                  O Oráculo está sugerindo o arquétipo: {suggestedArchetype}
                </p>
              </div>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => setStep(3)}
            >
              Continuar para Seleção de Arquétipo
            </Button>
          </div>
        );

      case 3: // Seleção de arquétipo
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">O Oráculo Revela Seu Caminho</h2>
            <p className="text-muted-foreground text-center mb-6">
              O Oráculo analisou sua essência e sugere estas opções para você. 
              {suggestedArchetype && (
                <span className="text-primary font-medium"> O arquétipo {suggestedArchetype} parece mais alinhado com seu ser.</span>
              )}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {archetypes.map((type) => (
                <Card 
                  key={type.name}
                  className={`cursor-pointer transition hover:border-primary ${
                    archetype === type.name ? 'border-primary bg-primary/5' : ''
                  } ${type.name === suggestedArchetype ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handleSelectArchetype(type.name as any)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle>
                      {type.name}
                      {type.name === suggestedArchetype && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Recomendado
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">
                      {type.description}
                    </CardDescription>
                    <div className="text-xs text-primary font-medium">
                      {type.strengths}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4: // Hábitos pelo Oráculo
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Hábitos Prescritos pelo Oráculo</h2>
            <p className="text-muted-foreground text-center mb-6">
              O Oráculo analisou seu arquétipo {archetype} e selecionou estes hábitos para iniciar sua transformação.
              Escolha até 2 para começar sua jornada.
            </p>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-6">
              {suggestedHabits.map((habit) => (
                <Card 
                  key={habit.id}
                  className={`cursor-pointer transition ${
                    selectedHabits.includes(habit.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleHabitSelection(habit.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{habit.title}</CardTitle>
                      <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {habit.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">
                      {habit.description}
                    </CardDescription>
                    <div className="flex gap-2">
                      {habit.points.energy > 0 && (
                        <div className="text-xs bg-orange-50 px-2 py-1 rounded-full">
                          +{habit.points.energy} Energia
                        </div>
                      )}
                      {habit.points.skill > 0 && (
                        <div className="text-xs bg-green-50 px-2 py-1 rounded-full">
                          +{habit.points.skill} Habilidade
                        </div>
                      )}
                      {habit.points.connection > 0 && (
                        <div className="text-xs bg-blue-50 px-2 py-1 rounded-full">
                          +{habit.points.connection} Conexão
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="w-full max-w-md">
              <div className="bg-blue-50 rounded-lg p-4 mb-4 text-center">
                <div className="text-sm font-medium mb-1">Visão do Oráculo</div>
                <p className="text-xs text-muted-foreground">
                  "Mantenha estes hábitos por 7 dias e voltarei com uma nova visão do seu futuro!"
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                onClick={handleCompleteOnboarding}
                disabled={selectedHabits.length === 0}
              >
                Começar Minha Jornada Oracular
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      {step > 1 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-4 left-4"
          onClick={() => step > 1 && setStep(step - 1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      )}
      
      <div className="w-full max-w-3xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingOracle;
