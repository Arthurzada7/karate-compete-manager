
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TournamentBracket from "@/components/tournament/TournamentBracket";

const Tournament = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-karate-black mb-1">Tournament</h1>
        <p className="text-karate-gray">Tournament bracket and match scheduling</p>
      </div>

      <Card className="karate-card">
        <CardHeader>
          <CardTitle>Tournament Brackets</CardTitle>
          <CardDescription>
            View and manage the tournament brackets and matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TournamentBracket />
        </CardContent>
      </Card>
    </div>
  );
};

export default Tournament;
