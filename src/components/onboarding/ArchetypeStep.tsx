
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { archetypes, ArchetypeType } from "@/data/archetypes";

interface ArchetypeStepProps {
  selectedArchetype: ArchetypeType;
  onSelectArchetype: (archetype: ArchetypeType) => void;
}

const ArchetypeStep = ({ selectedArchetype, onSelectArchetype }: ArchetypeStepProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Escolha seu Arquétipo</h2>
      <p className="text-muted-foreground text-center mb-6">
        Seu arquétipo influencia como seu avatar evolui e quais características serão destacadas.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {archetypes.map((type) => (
          <Card 
            key={type.name}
            className={`cursor-pointer transition hover:border-primary ${
              selectedArchetype === type.name ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => onSelectArchetype(type.name)}
          >
            <CardHeader className="pb-2">
              <CardTitle>{type.name}</CardTitle>
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
};

export default ArchetypeStep;
