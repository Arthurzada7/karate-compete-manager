
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-karate-light-gray to-white flex flex-col lg:flex-row">
      {/* Left side - Background and brand message */}
      <div className="w-full lg:w-2/3 bg-karate-black relative hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80')",
            opacity: 0.7,
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Karate Competition Manager</h1>
          <p className="text-xl opacity-90 text-center max-w-2xl">
            Sistema profissional de gerenciamento de torneios para o dojo moderno
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48 mb-4 flex items-center justify-center">
              {/* This is where you'll place your MeuDojo logo */}
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-karate-red to-karate-red/70 flex items-center justify-center text-white font-bold text-3xl p-4 shadow-lg">
                MeuDojo
              </div>
            </div>
            <h2 className="text-2xl font-bold text-karate-dark-gray">Acesse sua conta</h2>
            <p className="text-karate-gray text-sm mt-1">Entre com suas credenciais para continuar</p>
          </div>

          {/* Login Form */}
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-karate-dark-gray">
                    Usuário
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-karate-gray/30 focus-visible:ring-karate-red"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-karate-dark-gray">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-karate-gray/30 focus-visible:ring-karate-red"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-karate-red hover:bg-karate-red/90 text-white font-medium py-2 transition-all"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center text-sm text-karate-gray mt-4">
                  <p>Credenciais de demonstração: admin / karate2024</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
