import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import type { Transaction } from "@/types";
import { Briefcase, ChevronRight, CircleArrowDown, CircleArrowUp, Film, Fuel, Home, Plus, ShoppingCart, TrendingUp, Utensils } from "lucide-react";

interface CardRecentTransactionsProps {
    list: Transaction[] | null
}

const categoryIcons: Record<string, React.ReactNode> = {
    "Alimentação": <Utensils className="w-4 h-4" />,
    "Transporte": <Fuel className="w-4 h-4" />,
    "Mercado": <ShoppingCart className="w-4 h-4" />,
    "Investimento": <TrendingUp className="w-4 h-4" />,
    "Utilidades": <Home className="w-4 h-4" />,
    "Salário": <Briefcase className="w-4 h-4" />,
    "Receita": <Briefcase className="w-4 h-4" />,
    "Entretenimento": <Film className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
    "Alimentação": "bg-blue-100 text-blue-700",
    "Transporte": "bg-purple-100 text-purple-700",
    "Mercado": "bg-orange-100 text-orange-700",
    "Investimento": "bg-green-100 text-green-700",
    "Utilidades": "bg-yellow-100 text-yellow-700",
    "Salário": "bg-green-100 text-green-700",
    "Receita": "bg-green-100 text-green-700",
    "Entretenimento": "bg-pink-100 text-pink-700",
};

export function CardRecentTransactions({ list } : CardRecentTransactionsProps){

    const handleTypeFormat = (type: string, value: number) => {
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)

        if(type === "Saída"){
            return <div className="flex gap-2 items-center justify-center font-semibold">
                <span>- {formatted}</span>
                <CircleArrowDown className="w-4 h-4 text-red-base"/>
            </div>
        }
        return <div className="flex gap-2 items-center justify-center font-semibold">
            <span>+ {formatted}</span>
            <CircleArrowUp className="w-4 h-4 text-green-base"/>
        </div>
    };
    
    return <Card>
        <CardHeader className="py-5 px-4 flex flex-row justify-between items-center border-b border-gray-100">
            <CardDescription>TRANSAÇÕES RECENTES</CardDescription>
            <Button variant="link">Ver todas <ChevronRight/></Button>
        </CardHeader>

        <CardContent className="p-0">
            {list?.map((item, index) => {
                const category = "Alimentação";
                const icon = categoryIcons[category];
                const colors = categoryColors[category];

                return <div key={index} className="flex px-4 py-4 items-center gap-4 border-b border-gray-100">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${colors}`}>
                        {icon}
                    </div>
                    
                    <div className="flex-[2] min-w-0">
                        <p className="font-medium text-gray-800 text-md truncate">{item.description}</p>
                        <p className="text-gray-600 text-xs">{item.date}</p>
                    </div>

                    <div className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${colors} whitespace-nowrap`}>
                        {category}
                    </div>

                    <div className="flex flex-1 items-center justify-end">
                        {handleTypeFormat(item.type, item.value)}
                    </div>
                </div>
            })}
        </CardContent>
        
        <CardFooter className="py-4 px-5 flex flex-row justify-center items-center">
            <Button variant="link">
                <Plus className="text-brand-base"/>
                Nova transação
            </Button>
        </CardFooter>
    </Card>
}