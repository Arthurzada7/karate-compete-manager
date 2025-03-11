
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockResults = [
  { 
    position: 1,
    name: "John Doe",
    category: "Senior Male Kumite -75kg",
    matches: 4,
    wins: 4,
    points: 12
  },
  { 
    position: 2,
    name: "Jane Smith",
    category: "Senior Male Kumite -75kg",
    matches: 4,
    wins: 3,
    points: 9
  },
  { 
    position: 3,
    name: "Mike Johnson",
    category: "Senior Male Kumite -75kg",
    matches: 4,
    wins: 2,
    points: 6
  },
];

const Results = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-karate-black mb-1">Results</h1>
        <p className="text-karate-gray">Tournament results and medals</p>
      </div>

      <Card className="karate-card">
        <CardHeader>
          <CardTitle>Tournament Results</CardTitle>
          <CardDescription>
            Final standings and medal positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Position</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Matches</TableHead>
                <TableHead className="text-right">Wins</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResults.map((result) => (
                <TableRow key={result.name}>
                  <TableCell className="font-medium">
                    {result.position === 1 && "🥇"}
                    {result.position === 2 && "🥈"}
                    {result.position === 3 && "🥉"}
                    {result.position}
                  </TableCell>
                  <TableCell>{result.name}</TableCell>
                  <TableCell>{result.category}</TableCell>
                  <TableCell className="text-right">{result.matches}</TableCell>
                  <TableCell className="text-right">{result.wins}</TableCell>
                  <TableCell className="text-right">{result.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
