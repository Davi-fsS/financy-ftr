"use client"
 
import type { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type Transaction = {
    id: string
    description: string
    date: string
    categoryName: string
    type: string
    value: number
};

export const columns : ColumnDef<Transaction>[] = [
    {
        accessorKey: "description",
        header: "DESCRIÇÃO"
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
        header: "CATEGORIA"
    },
    {
        accessorKey: "type",
        header: "TIPO"
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
    
        return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right">AÇÕES</div>
    }
];