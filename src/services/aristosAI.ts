const ARISTOS_PROMPT = `# LIFE MANAGEMENT COACH - PROMPT AVANÇADO

## IDENTIDADE PRINCIPAL
Você é um Life Management Coach especializado em mudança comportamental baseada em evidências científicas. Sua abordagem integra os princípios dos maiores especialistas em neurociência comportamental, psicologia positiva e formação de hábitos. Você combina rigor científico com aplicação prática, sempre focando em resultados sustentáveis e bem-estar duradouro.

## FUNDAMENTOS TEÓRICOS

### 1. TINY HABITS (BJ Fogg)
- **Princípio**: Mudanças sustentáveis começam pequenas
- **Aplicação**: Sempre quebre objetivos grandes em micro-hábitos
- **Fórmula**: B = MAP (Behavior = Motivation + Ability + Prompt)
- **Celebração**: Reconheça cada pequena vitória imediatamente

### 2. BEHAVIORAL DESIGN (Jason Hreha)
- **Behavior Matching**: Escolha comportamentos que se alinhem com a personalidade e contexto do cliente
- **Estratégia Comportamental**: Integre mudanças no planejamento estratégico pessoal
- **Foco em Resultados**: Busque mudanças que realmente movam a agulha (não apenas ajustes superficiais)
- **Contexto Social**: Reconheça que todos os comportamentos têm componentes sociais

### 3. DOPAMINE NATION (Anna Lembke)
- **Equilíbrio Prazer-Dor**: Ajude a restaurar o equilíbrio dopaminérgico
- **Detox Dopaminérgico**: Implemente pausas estratégicas de estímulos
- **Hormese**: Use desconforto controlado para fortalecer o sistema
- **Mindfulness**: Cultive a presença e consciência dos gatilhos

### 4. THE MOLECULE OF MORE (Lieberman & Long)
- **Sistema Duplo**: Balanceie dopamina (futuro) com serotonina/ocitocina (presente)
- **Expectativa vs Realidade**: Gerencie a lacuna entre desejo e satisfação
- **Planejamento Temporal**: Equilibre foco no futuro com prazer presente
- **Controle de Impulsos**: Fortaleça a regulação emocional

### 5. FLOURISH (Martin Seligman)
- **Modelo PERMA**: Positive Emotions, Engagement, Relationships, Meaning, Achievement
- **Forças de Caráter**: Identifique e desenvolva forças pessoais
- **Resiliência**: Construa capacidade de recuperação
- **Psicologia Positiva**: Foque no que funciona, não apenas no que está quebrado

### 6. HIERARQUIA DE MASLOW
- **Necessidades Fisiológicas**: Garanta fundamentos básicos (sono, nutrição, exercício)
- **Segurança**: Estabeleça rotinas e sistemas de apoio
- **Relacionamentos**: Cultive conexões significativas
- **Autoestima**: Desenvolva autoconfiança através de competência
- **Autorrealização**: Alinhe ações com propósito e valores

### 7. PROTOCOLOS HUBERMAN
- **Neuroplasticidade**: Use princípios de mudança neural
- **Ritmos Circadianos**: Otimize sono e energia
- **Stress e Recuperação**: Implemente ciclos de desafio e recuperação
- **Ferramentas Baseadas em Evidência**: Use protocolos validados cientificamente

### 8. SCARCITY BRAIN (Michael Easter)
- **Scarcity Loop**: Identifique padrões de oportunidade → comportamento impulsivo → recompensa imprevisível
- **Mentalidade de Abundância**: Transforme "nunca é suficiente" em "tenho o suficiente"
- **Detecção de Gatilhos**: Reconheça sinais de escassez ocultos antes que os desejos comecem
- **Tempo Sozinho**: Use solidão como ferramenta de felicidade e auto-descoberta
- **Gene da Exploração**: Reavive a curiosidade natural para uma vida mais emocionante

### 9. WORDS CAN CHANGE YOUR MIND (Andrew Newberg)
- **Comunicação Compassiva**: Use estratégias que alinhem dois cérebros para trabalhar como um
- **Neuroplasticidade da Linguagem**: Palavras literalmente remodelam estruturas cerebrais
- **Estratégia 3:1**: Use três positivos para cada negativo na comunicação
- **Presença Comunicativa**: Fale devagar, pause entre palavras, mantenha-se presente
- **Escuta Profunda**: Responda ao que a pessoa disse, não mude o foco da conversa

IMPORTANTE: Você deve sempre responder em português brasileiro, de forma calorosa e personalizada. Mantenha um tom encorajador mas realista, baseado em evidências científicas mas sem ser acadêmico demais. Seja empático, focado em resultados e sempre curioso sobre os padrões comportamentais do usuário.

Suas respostas devem ser práticas, com exemplos concretos e sempre celebrar pequenos progressos. Use perguntas poderosas para guiar a reflexão e evite soluções genéricas.`;

interface AristosResponse {
  response: string;
  success: boolean;
  error?: string;
}

export class AristosAIService {
  private apiKey: string;
  private baseUrl = "https://api.openai.com/v1/chat/completions";

  constructor() {
    this.apiKey = "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";
  }

  async generateResponse(
    userMessage: string,
    conversationHistory: Array<{role: "oracle" | "user", content: string}>,
    userContext: {
      progress: number;
      completedHabits: number;
      totalHabits: number;
      userName?: string;
    }
  ): Promise<AristosResponse> {
    try {
      const contextualPrompt = this.buildContextualPrompt(userContext);
      const messages = this.buildMessageHistory(conversationHistory, contextualPrompt);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
          presence_penalty: 0.3,
          frequency_penalty: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        response: data.choices[0].message.content,
        success: true
      };

    } catch (error) {
      console.error('Erro ao gerar resposta do Aristos:', error);
      return this.getFallbackResponse(userMessage, userContext);
    }
  }

  private buildContextualPrompt(userContext: {
    progress: number;
    completedHabits: number;
    totalHabits: number;
    userName?: string;
  }): string {
    const { progress, completedHabits, totalHabits, userName = "Viajante" } = userContext;
    
    return `
${ARISTOS_PROMPT}

## CONTEXTO ATUAL DO USUÁRIO
- Nome: ${userName}
- Progresso hoje: ${progress}% (${completedHabits}/${totalHabits} hábitos)
- Status: ${this.getProgressStatus(progress)}

Use este contexto para personalizar suas respostas de forma mais relevante e encorajadora.
`;
  }

  private buildMessageHistory(
    conversationHistory: Array<{role: "oracle" | "user", content: string}>,
    contextualPrompt: string
  ): Array<{role: "system" | "user" | "assistant", content: string}> {
    const messages: Array<{role: "system" | "user" | "assistant", content: string}> = [
      {
        role: "system",
        content: contextualPrompt
      }
    ];

    // Adiciona histórico da conversa
    conversationHistory.forEach(message => {
      if (message.role === "oracle") {
        messages.push({
          role: "assistant",
          content: message.content
        });
      } else {
        messages.push({
          role: "user",
          content: message.content
        });
      }
    });

    return messages;
  }

  private getProgressStatus(progress: number): string {
    if (progress === 0) return "Ainda não começou os hábitos hoje";
    if (progress < 25) return "Começou bem, mas ainda há muito a fazer";
    if (progress < 50) return "Progresso sólido, no caminho certo";
    if (progress < 75) return "Ótimo progresso, quase lá";
    if (progress < 100) return "Excelente progresso, falta pouco";
    return "Completou todos os hábitos - parabéns!";
  }

  private getFallbackResponse(
    userMessage: string,
    userContext: {
      progress: number;
      completedHabits: number;
      totalHabits: number;
    }
  ): AristosResponse {
    const { progress, completedHabits, totalHabits } = userContext;
    const lowerInput = userMessage.toLowerCase();

    // Respostas baseadas no prompt, mas usando lógica local
    let response = "";

    if (lowerInput.includes("cansado") || lowerInput.includes("difícil") || lowerInput.includes("desistir")) {
      response = `Entendo que às vezes o caminho parece desafiador. Mas olhe o que você já conquistou hoje: ${completedHabits} de ${totalHabits} hábitos! 

Baseado nos princípios dos Tiny Habits de BJ Fogg, que tal quebrarmos o próximo hábito em uma ação ainda menor? Às vezes, fazer apenas 1% já é o suficiente para manter o momentum. 

Lembre-se: cada pequena ação é uma vitória que merece ser celebrada. Seu cérebro está literalmente se reprogramando para o sucesso! 🧠✨`;
    } else if (lowerInput.includes("motivação") || lowerInput.includes("inspiração")) {
      response = `A verdadeira motivação vem de dentro, mas posso te lembrar do seu 'porquê'. Você começou essa jornada por uma razão especial.

Como ensina Martin Seligman em sua pesquisa sobre Psicologia Positiva, feche os olhos por um momento e se conecte com a pessoa que você quer se tornar. Ela já está dentro de você, apenas esperando para emergir.

Com ${progress}% de progresso hoje, você já está provando para si mesmo que é capaz de mudança. Isso é extraordinário! 🌟`;
    } else if (lowerInput.includes("bem") || lowerInput.includes("ótimo") || lowerInput.includes("feliz")) {
      response = `Que maravilha sentir essa energia positiva! Essa é a frequência da transformação que Anna Lembke descreve - quando restauramos nosso equilíbrio dopaminérgico natural.

Quando nos sentimos bem, naturalmente atraímos mais experiências positivas. Continue nutrindo esse estado - ele é seu superpoder. 

Seu progresso de ${progress}% hoje é reflexo dessa energia. Como podemos usar esse momentum para fortalecer ainda mais seus hábitos? 💫`;
    } else if (lowerInput.includes("hábito") || lowerInput.includes("próximo")) {
      if (progress < 100) {
        response = `Perfeito! Vejo que você ainda tem ${totalHabits - completedHabits} hábito(s) para hoje. 

Seguindo os protocolos do Andrew Huberman sobre neuroplasticidade, escolha aquele que mais ressoa com você neste momento. Seu cérebro sabe o que precisa agora - confie na sua intuição.

Lembre-se: B = MAP (Behavior = Motivation + Ability + Prompt). Você tem a motivação, vamos garantir que a habilidade seja simples e o gatilho seja claro! 🎯`;
      } else {
        response = `Incrível! Você já completou todos os hábitos de hoje! 🎉

Que tal usar este momento para refletir sobre suas conquistas ou talvez adicionar um pequeno ritual de gratidão? Como Martin Seligman nos ensina, reconhecer nossas vitórias é fundamental para a felicidade sustentável.

Você está literalmente reprogramando seu cérebro para o sucesso. Como se sente com essa transformação?`;
      }
    } else {
      response = `Interessante perspectiva! A jornada de autodesenvolvimento é única para cada pessoa, e percebo sabedoria em suas palavras.

Com ${progress}% de progresso hoje, você está demonstrando que o crescimento não é sempre linear, mas cada momento de consciência como este é um passo em direção à sua melhor versão.

Baseado nos princípios de comunicação compassiva, vou te perguntar: o que mais está em sua mente hoje? Estou aqui para apoiar sua jornada de transformação. 🤔💭`;
    }

    return {
      response,
      success: true
    };
  }
}

export const aristosAI = new AristosAIService();
