
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScoringPanel from "@/components/scoring/ScoringPanel";

const Scoring = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-karate-black mb-1">Scoring</h1>
        <p className="text-karate-gray">Real-time match scoring system</p>
      </div>

      <Card className="karate-card">
        <CardHeader>
          <CardTitle>Match Scoring</CardTitle>
          <CardDescription>
            Record points and penalties during live matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScoringPanel matchId="current-match" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Scoring;
