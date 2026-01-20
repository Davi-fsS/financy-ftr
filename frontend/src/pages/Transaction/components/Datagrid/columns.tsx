"use client"
 
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ColumnDef } from "@tanstack/react-table";
import { Briefcase, CircleArrowDown, CircleArrowUp, Film, Fuel, Home, ShoppingCart, SquarePen, Trash, TrendingUp, Utensils } from "lucide-react";
import moment from "moment";

export type Transaction = {
    id: string
    description: string
    date: string
    categoryName: string
    type: string
    value: number
};

const categoryIcons: Record<string, React.ReactNode> = {
    "Alimentação": <Utensils className="w-4 h-4" />,
    "Transporte": <Fuel className="w-4 h-4" />,
    "Mercado": <ShoppingCart className="w-4 h-4" />,
    "Investimento": <TrendingUp className="w-4 h-4" />,
    "Utilidades": <Home className="w-4 h-4" />,
    "Salário": <Briefcase className="w-4 h-4" />,
    "Entretenimento": <Film className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
    "Alimentação": "bg-blue-100 text-blue-700",
    "Transporte": "bg-purple-100 text-purple-700",
    "Mercado": "bg-orange-100 text-orange-700",
    "Investimento": "bg-green-100 text-green-700",
    "Utilidades": "bg-yellow-100 text-yellow-700",
    "Salário": "bg-green-100 text-green-700",
    "Entretenimento": "bg-pink-100 text-pink-700",
};

export const columns : ColumnDef<Transaction>[] = [
    {
        accessorKey: "description",
        header: "DESCRIÇÃO",
        cell: ({ row }) => {
            const category = row.getValue("categoryName") as string;
            const icon = categoryIcons[category];
            const colors = categoryColors[category];
            
            return <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-md ${colors}`}>
                    {icon}
                </div>
                <Label className="font-medium text-gray-900">{row.getValue("description")}</Label>
            </div>
        }
    },
    {
        accessorKey: "date",
        header: "DATA",
        cell: ({ row }) => {
            return <div className="font-light text-gray-600">{moment(row.getValue("date")).format("DD/MM/YY")}</div>
        },
    },
    {
        accessorKey: "categoryName",
        header: "CATEGORIA",
        cell: ({ row }) => {
            const category = row.getValue("categoryName") as string;
            const colors = categoryColors[category];
            
            return <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors}`}>
                {category}
            </div>
        }
    },
    {
        accessorKey: "type",
        header: "TIPO",
        cell: ({ row }) => {
            if(row.getValue("type") === "Saída"){
                return <div className="flex items-center gap-2">
                    <CircleArrowDown className="text-red-base w-4 h-4"/>
                    <Label className="text-red-dark">{row.getValue("type")}</Label>
                </div>
            }
            
            return <div className="flex items-center gap-2">
                <CircleArrowUp className="text-green-base w-4 h-4"/>
                <Label className="text-green-dark">{row.getValue("type")}</Label>
            </div>
        }
    },
    {
        accessorKey: "value",
        header: () => <div className="text-right">VALOR</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("value"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)
    
            return <div className="text-right font-semibold">
                <span className="mr-1">{row.getValue("type") === "Saída" ? "-" : "+"}</span>
                <span>{formatted}</span>
            </div>
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right">AÇÕES</div>,
        cell: () => {
            return <div className="flex justify-end gap-3">
                <Button variant="outline" className="w-10 h-10">
                    <Trash className="text-feedback-danger w-4 h-4"/>
                </Button>

                <Button variant="outline" className="w-10 h-10">
                    <SquarePen className="text-gray-700 w-4 h-4"/>
                </Button>
            </div>
        }
    }
];