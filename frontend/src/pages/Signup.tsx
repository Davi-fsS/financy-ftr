import { useState } from "react";
import logo from "@/assets/logo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signup = useAuthStore((state) => state.signup);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try{
            const signupMutate = await signup({
                name,
                email,
                password
            });

            if(signupMutate){
                toast.success("Cadastro realizado com sucesso!");
            }
        }
        catch(error){
            toast.error("Erro ao realizar o cadastro");
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    return <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
        <img src={logo} className="w-64 h-22"/>

        <Card className="w-full max-w-md rounded-xl p-2">
            <CardHeader className="flex items-center">
                <CardTitle className="text-2xl font-bold">
                    Criar conta
                </CardTitle>
                <CardDescription>
                    Comece a controlar suas finanças ainda hoje
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input 
                            className="py-6" 
                            id="name" 
                            type="text" 
                            placeholder="Seu nome completo" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input 
                            className="py-6" 
                            id="email" 
                            type="email" 
                            placeholder="mail@exemplo.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input 
                            className="py-6" 
                            id="password" 
                            type="password" 
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        <Label>A senha deve ter no mínimo 8 caracteres</Label>  
                    </div>

                    <Button type="submit" className="w-full py-6" disabled={loading}>
                        Cadastrar
                    </Button>
                </form>
            </CardContent>

            <CardContent className="flex justify-center">
                <p>ou</p>
            </CardContent>
            
            <CardContent className="w-full flex flex-col items-center justify-center gap-3">
                <Label>Já tem uma conta?</Label>
                <Button className="w-full py-6" type="button" variant="outline">
                    <LogIn/>
                    <Link to="/">Fazer login</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
}