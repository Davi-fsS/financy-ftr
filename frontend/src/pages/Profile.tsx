import { Page } from "@/components/Page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UPDATE_USER } from "@/lib/graphql/mutations/User";
import { getAvatarFallback } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@apollo/client/react";
import { Label } from "@radix-ui/react-label";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ProfilePage(){

    const { user } = useAuthStore();

    const [name, setName] = useState(user?.name);

    const logout = useAuthStore((state) => state.logout);
    const update = useAuthStore((state) => state.update);

    const [updateUser, { loading }] = useMutation(UPDATE_USER, {
        onCompleted(){
            toast.success("Usuário editada com sucesso");
        },
        onError(){
            toast.error("Falha ao editar o usuário");
        }
    });

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        updateUser({
            variables: {
                updateUserId: user?.id,
                data: {
                    name: name
                }
            }
        })

        update(user!, name!);
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

                <Separator className="my-5 w-[90%] mx-auto"/>

                <CardContent className="my-4">
                    <form className="space-y-4">
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
                    <Button onClick={handleSubmit} className="w-full py-6" disabled={loading}>
                        Salvar alterações
                    </Button>
                    <Button onClick={async() => await logout()} variant="outline" className="w-full py-6" disabled={loading}>
                        <LogOut className="text-red-600"/>
                        Sair da conta
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </Page>
};