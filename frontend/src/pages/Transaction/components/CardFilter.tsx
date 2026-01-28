import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GET_ALL_CATEGORY } from "@/lib/graphql/queries/Category";
import type { Category } from "@/types";
import { useQuery } from "@apollo/client/react";

interface FilterProps {
    description: string
    type: string | null
    categoryId: string | null
    date: string
}

interface CardFilterProps {
    dataOptions: Set<string>,
    filters: FilterProps,
    onChange: (data : FilterProps) => void
}

export function CardFilter({ dataOptions, filters, onChange } : CardFilterProps){
    const { data } = useQuery<{ getAllCategory : Category[] }>(GET_ALL_CATEGORY);

    const categories = data?.getAllCategory.map(item => ({
        id: item.id,
        name: item.name
    })) || [];
    
    return <Card className="pt-5 px-6 pb-6 w-full flex items-center justify-center gap-4">
        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Buscar</Label>
            <Input 
                type="search"
                className="h-11 text-gray-800"
                placeholder="Buscar por descrição"
                value={filters.description}
                onChange={e => onChange({...filters, description: e.target.value})}
            />
        </CardContent>

        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Tipo</Label>
            <Select value={filters.type ?? ""} onValueChange={e => onChange({...filters, type: e === "clear" ? null : e})}>
                <SelectTrigger className="h-11">
                    <SelectValue placeholder="Todos"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="clear">Limpar</SelectItem>
                        <SelectItem value="Saida">Saída</SelectItem>
                        <SelectItem value="Entrada">Entrada</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CardContent>

        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Categoria</Label>
            <Select value={filters.categoryId ?? ""} onValueChange={e => onChange({...filters, categoryId: e === "clear" ? null : e})}>
                <SelectTrigger className="h-11">
                    <SelectValue placeholder="Todas"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="clear">Limpar</SelectItem>
                        {categories.map(item => {
                            return <SelectItem value={item.id}>{item.name}</SelectItem>
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CardContent>

        <CardContent className="p-0 flex flex-col flex-1 gap-2">
            <Label>Período</Label>
            <Select value={filters.date} onValueChange={e => onChange({...filters, date: e === "clear" ? "" : e})}>
                <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione um período"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="clear">Limpar</SelectItem>
                        {
                            Array.from(dataOptions).map(item => {
                                return <SelectItem key={item} value={item}>{item}</SelectItem>
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CardContent>
    </Card>
}