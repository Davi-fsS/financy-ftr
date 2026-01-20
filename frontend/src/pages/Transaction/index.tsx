import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CardFilter } from "./components/CardFilter";
import { Datagrid } from "./components/Datagrid";
import { columns, type Transaction } from "./components/Datagrid/columns";

export function TransactionPage(){
    const transactions : Transaction[] = [
        {
            id: "1",
            description: "Jantar no Restaurante",
            date: "2025-11-30",
            categoryName: "Alimentação",
            type: "Saída",
            value: 89.50
        },
        {
            id: "2",
            description: "Venda no Ibira",
            date: "2026-01-15",
            categoryName: "Alimentação",
            type: "Entrada",
            value: 30
        },
    ];

    return <Page>
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Label className="text-gray-800 text-2xl font-bold">Transações</Label>
                    <Label className="text-gray-600 text-base font-thin">Gerencie todas as suas transações financeiras</Label>
                </div>

                <Button variant="default" className="font-normal">
                    <Plus className="text-white"/>
                    Nova transação
                </Button>
            </div>

            <div>
                <CardFilter/>
            </div>

            <div>
                <Datagrid columns={columns} data={transactions}/>
            </div>
        </div>
    </Page>
};