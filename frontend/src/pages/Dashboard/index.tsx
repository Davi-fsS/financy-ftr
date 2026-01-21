import { Page } from "@/components/Page";
import { CardResume } from "./components/CardResume";
import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { CardRecentTransactions } from "./components/CardRecentTransactions";
import type { Category, Transaction } from "@/types";
import moment from "moment";
import { CardCategories } from "./components/CardCategories";
import { useState } from "react";
import { DialogTransaction } from "./components/DialogTransaction";

export function DashboardPage(){
    const [openModal, setOpenModal] = useState<boolean>(false);

    const list : Transaction[] = [
        {
            id: "1",
            description: "Pagamento de Salário",
            date: moment().format("DD/MM/YY"),
            categoryId: "1",
            value: 42500,
            type: "Entrada"
        },
        {
            id: "1",
            description: "Comida",
            date: moment().format("DD/MM/YY"),
            categoryId: "1",
            value: 200,
            type: "Saída"
        },
    ]

    const categories : Category[] = [
        {
            id: "1",
            name: "Alimentação",
            description: "aaaa",
            icon: "aaa",
            color: "blue"
        },
        {
            id: "1",
            name: "Transporte",
            description: "aaaa",
            icon: "aaa",
            color: "blue"
        },
    ] 

    return <Page>
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-6">
                <CardResume
                    icon={Wallet}
                    iconColor="text-purple-base"
                    content={"R$ 12.847,32"}
                    title="SALDO TOTAL"
                />

                <CardResume
                    icon={CircleArrowUp}
                    iconColor="text-brand-base"
                    content={"R$ 12.847,32"}
                    title="RECEITA DO MÊS"
                />

                <CardResume
                    icon={CircleArrowDown}
                    iconColor="text-red-base"
                    content={"R$ 2.180,45"}
                    title="DESPESA DO MÊS"
                />
            </div>
        
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">                    
                    <CardRecentTransactions
                        list={list}
                        onOpenModal={setOpenModal}
                    />
                </div>

                <div className="col-span-1">
                    <CardCategories
                        list={categories}
                    />
                </div>
            </div>
        </div>

        <DialogTransaction open={openModal} onOpenChange={setOpenModal}/>
    </Page>
};