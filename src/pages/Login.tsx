
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only redirect after the auth state has been checked
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-karate-red"></div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Erro",
        description: "Por favor, informe usuário e senha",
        variant: "destructive",
      });
      return;
    }

    setIsLoggingIn(true);
    try {
      const success = await login(username, password);
      if (success) {
        toast({
          title: "Bem-vindo!",
          description: "Login realizado com sucesso",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Usuário ou senha inválidos",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Background with karate theme and logo/tagline */}
      <div 
        className="hidden lg:flex lg:w-3/5 bg-karate-dark-gray text-white flex-col justify-center items-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-md text-center p-12 relative z-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">Karate Master</h1>
          <p className="text-xl mb-10 opacity-90">
            Empower your dojo with our modern tournament management system designed for martial arts excellence
          </p>
          <div className="flex justify-center space-x-3 mt-8">
            <div className="w-20 h-1 bg-karate-red rounded"></div>
            <div className="w-10 h-1 bg-karate-red opacity-70 rounded"></div>
            <div className="w-6 h-1 bg-karate-red opacity-40 rounded"></div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-karate-red to-karate-red/80 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                MeuDojo
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-karate-dark-gray">Welcome Back</h2>
            <p className="text-karate-gray mt-2">Enter your credentials to access your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-karate-dark-gray">
                Username
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-karate-gray" />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 border-karate-gray/30 focus-visible:ring-karate-red rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-karate-dark-gray">
                  Password
                </Label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-karate-gray" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-karate-gray/30 focus-visible:ring-karate-red rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-karate-red hover:from-orange-600 hover:to-karate-red/90 text-white font-medium py-3 h-12 rounded-full transition-all"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm text-karate-gray mt-4">
              <p>Demo credentials: admin / karate2024</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
