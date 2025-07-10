
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, Trophy, Target, Calendar, Star, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Removed automatic redirect to dashboard - users should always go through onboarding

  const handleStart = () => {
    navigate("/onboarding-q3");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
          Habit Quest
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Desenvolva hábitos com Oracle personalizado, conexões sociais e sistema de progressão avançado
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Oracle Pessoal</h3>
              <p className="text-sm text-muted-foreground">
                Orientação diária inteligente baseada em ciência comportamental
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/5 border-accent/20 hover:bg-accent/10 transition-colors">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="font-bold text-lg mb-2">Conexões Sociais</h3>
              <p className="text-sm text-muted-foreground">
                Conecte-se com aliados e compartilhe sua jornada
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-medium/10 border-orange-medium/20 hover:bg-orange-medium/15 transition-colors">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-orange-medium" />
              <h3 className="font-bold text-lg mb-2">Progressão Avançada</h3>
              <p className="text-sm text-muted-foreground">
                Sistema completo de evolução com níveis e recompensas
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-medium/10 border-purple-medium/20 hover:bg-purple-medium/15 transition-colors">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-purple-medium" />
              <h3 className="font-bold text-lg mb-2">Baú do Tesouro</h3>
              <p className="text-sm text-muted-foreground">
                Desafios diários de conhecimento e recompensas especiais
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-teal-medium/10 border-teal-medium/20 hover:bg-teal-medium/15 transition-colors">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-teal-medium" />
              <h3 className="font-bold text-lg mb-2">Séries & Streaks</h3>
              <p className="text-sm text-muted-foreground">
                Mantenha a consistência e desenvolva momentum
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/10 border-secondary/20 hover:bg-secondary/15 transition-colors">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 mx-auto mb-4 text-secondary-foreground" />
              <h3 className="font-bold text-lg mb-2">Loja Premium</h3>
              <p className="text-sm text-muted-foreground">
                Recompensas exclusivas e itens de personalização
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl mb-8 max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl mb-4">🚀 Recursos Exclusivos</h2>
          <ul className="text-left text-muted-foreground space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Oracle com IA personalizada para orientação diária
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Sistema social com aliados e feed de atividades
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Baú do tesouro com desafios de conhecimento
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Evolução de avatar com sistema de características
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Séries e streaks para manter consistência
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Loja com recompensas reais e virtuais
            </li>
          </ul>
        </div>
        
        <Button 
          size="lg" 
          onClick={handleStart}
          className="text-lg px-8 py-4 gradient-primary"
        >
          Iniciar Minha Jornada
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
