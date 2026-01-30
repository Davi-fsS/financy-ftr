import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import type { Transaction } from "@/types";
import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react"

interface CardRecentTransactionsProps {
    list: Transaction[] | null
    onOpenModal: (open: boolean) => void
}

export function CardRecentTransactions({ list, onOpenModal } : CardRecentTransactionsProps){
    const handleTypeFormat = (type: string, value: number) => {
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)

        if(type === "Saida"){
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

    const navigate = useNavigate();

    const colorMap: Record<string, { bg: string; text: string; }> = {
        pink: { bg: "bg-pink-light", text: "text-pink-base" },
        blue: { bg: "bg-blue-light", text: "text-blue-base" },
        green: { bg: "bg-green-light", text: "text-green-base" },
        purple: { bg: "bg-purple-light", text: "text-purple-base" },
        yellow: { bg: "bg-yellow-light", text: "text-yellow-base" },
        orange: { bg: "bg-orange-light", text: "text-orange-base" },
        red: { bg: "bg-red-light", text: "text-red-base" },
    }
    
    return <Card>
        <CardHeader className="py-5 px-4 flex flex-row justify-between items-center border-b border-gray-100">
            <CardDescription>TRANSAÇÕES RECENTES</CardDescription>
            <Button onClick={() => navigate("/transactions")} variant="link">Ver todas <ChevronRight/></Button>
        </CardHeader>

        <CardContent className="p-0">
            {list?.map((item, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const IconComponent = (LucideIcons as any)[item.category?.icon ?? ""] || LucideIcons.HelpCircle
                const colors = colorMap[item.category?.color ?? "blue"];

                return <div key={index} className="flex px-4 py-4 items-center gap-4 border-b border-gray-100">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${colors.bg}`}>
                        <IconComponent className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    
                    <div className="flex-[2] min-w-0">
                        <p className="font-medium text-gray-800 text-md truncate">{item.description}</p>
                        <p className="text-gray-600 text-xs">{item.date}</p>
                    </div>

                    <div className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} whitespace-nowrap`}>
                        {item.category?.name}
                    </div>

                    <div className="flex flex-1 items-center justify-end">
                        {handleTypeFormat(item.type, item.value)}
                    </div>
                </div>
            })}
        </CardContent>
        
        <CardFooter className="py-4 px-5 flex flex-row justify-center items-center">
            <Button variant="link" onClick={() => onOpenModal(true)}>
                <Plus className="text-brand-base"/>
                Nova transação
            </Button>
        </CardFooter>
    </Card>
}