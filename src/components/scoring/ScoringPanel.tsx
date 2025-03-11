
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";

interface Competitor {
  name: string;
  score: number;
  penalties: number;
}

interface ScoringPanelProps {
  matchId: string;
  onScoreUpdate?: (matchId: string, scores: { competitor1: Competitor; competitor2: Competitor }) => void;
}

const ScoringPanel: React.FC<ScoringPanelProps> = ({ matchId, onScoreUpdate }) => {
  const [competitor1, setCompetitor1] = useState<Competitor>({
    name: "Competitor 1",
    score: 0,
    penalties: 0
  });
  
  const [competitor2, setCompetitor2] = useState<Competitor>({
    name: "Competitor 2",
    score: 0,
    penalties: 0
  });

  const updateScore = (competitor: 'competitor1' | 'competitor2', type: 'score' | 'penalties', value: number) => {
    const setCompetitor = competitor === 'competitor1' ? setCompetitor1 : setCompetitor2;
    
    setCompetitor(prev => {
      const updated = {
        ...prev,
        [type]: Math.max(0, prev[type] + value)
      };
      
      if (onScoreUpdate) {
        onScoreUpdate(matchId, {
          competitor1,
          competitor2
        });
      }
      
      return updated;
    });
  };

  const competitors = [
    { data: competitor1, id: 'competitor1' as const },
    { data: competitor2, id: 'competitor2' as const }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {competitors.map((competitor, index) => (
        <Card key={index} className="karate-card">
          <CardHeader>
            <CardTitle className="text-lg">{competitor.data.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{competitor.data.score}</span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateScore(competitor.id, 'score', 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateScore(competitor.id, 'score', -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Penalties: {competitor.data.penalties}</span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateScore(competitor.id, 'penalties', 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateScore(competitor.id, 'penalties', -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScoringPanel;
