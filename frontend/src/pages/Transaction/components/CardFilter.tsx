import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CardFilter(){
    return <Card className="pt-5 px-6 pb-6 w-full flex items-center justify-center gap-4">
        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Buscar</Label>
            <Input 
                type="search"
                className="h-11 text-gray-800"
                placeholder="Buscar por descrição"
            />
        </CardContent>

        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Tipo</Label>
            <Select>
                <SelectTrigger className="h-11">
                    <SelectValue placeholder="Todos"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipo</SelectLabel>
                        <SelectItem value="saida">Saída</SelectItem>
                        <SelectItem value="entrada">Entrada</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CardContent>

        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Categoria</Label>
            <Select>
                <SelectTrigger className="h-11">
                    <SelectValue placeholder="Todas"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categoria</SelectLabel>
                        <SelectItem value="1">Alimentação</SelectItem>
                        <SelectItem value="2">Transporte</SelectItem>
                        <SelectItem value="3">Mercado</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CardContent>

        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Período</Label>
            <Select>
                <SelectTrigger className="h-11">
                    <SelectValue placeholder="Dezembro / 2025"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Período</SelectLabel>
                        <SelectItem value="2025-12">Dezembro / 2025</SelectItem>
                        <SelectItem value="2025-11">Novembro / 2025</SelectItem>
                        <SelectItem value="2025-10">Outubro / 2025</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CardContent>
    </Card>
}