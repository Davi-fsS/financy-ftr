import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAvatarFallback } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function ProfilePage(){

    const { user } = useAuthStore();

    const [name, setName] = useState(user?.name);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
 
    return <Page> 
        <div className="flex flex-col min-h-[calc(100vh-5rem)] items-center justify-center gap-6">
            <Card className="w-full max-w-md rounded-xl p-2">
                <CardHeader className="flex items-center">
                    <Avatar className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
                        <AvatarFallback className="text-gray-800 text-3xl font-medium">{getAvatarFallback(user?.name)}</AvatarFallback>
                    </Avatar>

                    <CardTitle className="text-2xl font-bold">
                        { user?.name }
                    </CardTitle>
                    <CardDescription>
                        {user?.email}
                    </CardDescription>
                </CardHeader>

                <Separator className="my-4"/>

                <CardContent className="my-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input 
                                className="py-6" 
                                id="name" 
                                type="text" 
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
                                value={user?.email}
                                disabled
                                />
                            <CardDescription className="text-sm">O e-mail não pode ser alterado</CardDescription>
                                
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full py-6" disabled={loading}>
                        Salvar alterações
                    </Button>
                    <Button variant="outline" className="w-full py-6" disabled={loading}>
                        <LogOut className="text-red-600"/>
                        Sair da conta
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </Page>
};