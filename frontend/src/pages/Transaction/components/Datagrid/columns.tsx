"use client"
 
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Category } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import * as LucideIcons from "lucide-react"
import { CircleArrowDown, CircleArrowUp, Trash, SquarePen } from "lucide-react";

export type Transaction = {
    id: string
    description: string
    date: string
    category: Category
    type: string
    value: number
};

const colorMap: Record<string, { bg: string; text: string; }> = {
    pink: { bg: "bg-pink-light", text: "text-pink-base" },
    blue: { bg: "bg-blue-light", text: "text-blue-base" },
    green: { bg: "bg-green-light", text: "text-green-base" },
    purple: { bg: "bg-purple-light", text: "text-purple-base" },
    yellow: { bg: "bg-yellow-light", text: "text-yellow-base" },
    orange: { bg: "bg-orange-light", text: "text-orange-base" },
    red: { bg: "bg-red-light", text: "text-red-base" },
}

export const columns : ColumnDef<Transaction>[] = [
    {
        accessorKey: "description",
        header: "DESCRIÇÃO",
        cell: ({ row }) => {
            const transaction = row.original;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[transaction.category.icon] || LucideIcons.HelpCircle
            const colors = colorMap[transaction.category.color];
            
            return <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-md ${colors.bg} ${colors.text}`}>
                    <IconComponent className={`w-5 h-5 ${colors.text}`}/>
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
            const transaction = row.original;
            const category = transaction.category.name as string;
            const colors = colorMap[transaction.category.color];
            
            return <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
                {category}
            </div>
        }
    },
    {
        accessorKey: "type",
        header: "TIPO",
        cell: ({ row }) => {
            if(row.getValue("type") === "Saida"){
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
                <span className="mr-1">{row.getValue("type") === "Saida" ? "-" : "+"}</span>
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