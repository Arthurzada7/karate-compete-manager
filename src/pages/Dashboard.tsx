
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, Calendar, Medal, Clock, Activity, 
  UserPlus, TrendingUp, ChevronRight, Dumbbell, Award, Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for dashboard stats
  const stats = [
    { label: "Total Athletes", value: 124, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Ongoing Events", value: 3, icon: Activity, color: "bg-green-100 text-green-600" },
    { label: "Categories", value: 15, icon: Dumbbell, color: "bg-amber-100 text-amber-600" },
    { label: "Completed Matches", value: 48, icon: Medal, color: "bg-purple-100 text-purple-600" },
  ];

  // Mock data for upcoming matches
  const upcomingMatches = [
    { time: "10:30 AM", category: "Male Kumite -75kg", location: "Mat 1", athletes: "John D. vs Mike S." },
    { time: "11:15 AM", category: "Female Kata", location: "Mat 2", athletes: "Anna K. vs Sarah L." },
    { time: "12:00 PM", category: "Junior Kumite", location: "Mat 3", athletes: "David R. vs Alex M." },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-karate-black mb-1">Dashboard</h1>
          <p className="text-karate-gray">Welcome to your karate tournament management center</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button 
            className="bg-karate-red hover:bg-karate-red/90 flex items-center gap-2"
            onClick={() => navigate("/tournament")}
          >
            <Calendar size={16} />
            <span>Tournament</span>
          </Button>
          <Button 
            variant="outline"
            className="border-karate-red text-karate-red hover:bg-karate-red/10 flex items-center gap-2"
            onClick={() => navigate("/athletes")}
          >
            <UserPlus size={16} />
            <span>New Athlete</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="karate-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-karate-gray mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 karate-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Upcoming matches and events</CardDescription>
            </div>
            <Button variant="ghost" className="text-karate-red" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMatches.map((match, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-karate-red/10 text-karate-red p-3 rounded-lg mr-4">
                    <Clock size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{match.category}</p>
                    <div className="flex items-center text-karate-gray text-sm mt-1">
                      <span>{match.time}</span>
                      <span className="mx-2">•</span>
                      <span>{match.location}</span>
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium">{match.athletes}</p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto mt-1">
                      <span className="text-karate-red text-xs flex items-center">
                        Details <ChevronRight size={14} />
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="karate-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left font-normal h-auto py-3"
              onClick={() => navigate("/scoring")}
            >
              <div className="bg-green-100 text-green-600 p-2 rounded mr-2">
                <TrendingUp size={18} />
              </div>
              <div>
                <p className="font-medium">Start Scoring</p>
                <p className="text-sm text-karate-gray">Record points for matches</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left font-normal h-auto py-3"
              onClick={() => navigate("/categories")}
            >
              <div className="bg-amber-100 text-amber-600 p-2 rounded mr-2">
                <Flag size={18} />
              </div>
              <div>
                <p className="font-medium">Manage Categories</p>
                <p className="text-sm text-karate-gray">Edit weight and age divisions</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left font-normal h-auto py-3"
              onClick={() => navigate("/results")}
            >
              <div className="bg-purple-100 text-purple-600 p-2 rounded mr-2">
                <Award size={18} />
              </div>
              <div>
                <p className="font-medium">View Results</p>
                <p className="text-sm text-karate-gray">See tournament standings</p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
