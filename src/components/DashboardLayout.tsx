
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, ClipboardList, Trophy, BarChart3, Settings,
  LogOut, Menu, X, Home, Calendar
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, label, path, isActive, onClick 
}) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-karate-red text-white" 
          : "text-karate-dark-gray hover:bg-karate-light-gray"
      )}
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Athletes", path: "/athletes" },
    { icon: ClipboardList, label: "Categories", path: "/categories" },
    { icon: Calendar, label: "Tournament", path: "/tournament" },
    { icon: BarChart3, label: "Scoring", path: "/scoring" },
    { icon: Trophy, label: "Results", path: "/results" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-karate-light-gray flex">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white p-4 shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu size={24} />
        </Button>
        <div className="font-bold text-lg text-karate-black">Karate Manager</div>
        <Avatar>
          <AvatarFallback className="bg-karate-red text-white">
            {user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg transition-transform lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <div className="font-bold text-xl text-karate-black">Karate Manager</div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X size={20} />
            </Button>
          </div>
          
          <Separator />
          
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={location.pathname === item.path}
                  onClick={() => setIsSidebarOpen(false)}
                />
              ))}
            </div>
          </nav>
          
          <div className="p-4 mt-auto border-t">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback className="bg-karate-red text-white">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user?.username}</div>
                <div className="text-sm text-karate-gray">Administrator</div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 text-karate-gray"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all pt-[73px] lg:pt-0",
        "min-h-screen overflow-auto"
      )}>
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
