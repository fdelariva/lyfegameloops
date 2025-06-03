
export const archetypes = [
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
] as const;

export type ArchetypeType = typeof archetypes[number]["name"];
