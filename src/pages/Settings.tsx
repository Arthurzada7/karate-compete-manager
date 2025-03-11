
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-karate-black mb-1">Settings</h1>
        <p className="text-karate-gray">Configure tournament settings</p>
      </div>

      <Card className="karate-card">
        <CardHeader>
          <CardTitle>Tournament Settings</CardTitle>
          <CardDescription>
            Configure global tournament settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
            <p className="text-karate-gray max-w-md">
              The settings management is under development. Check back soon for updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
