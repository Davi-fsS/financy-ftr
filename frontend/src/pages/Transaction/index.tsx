import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CardFilter } from "./components/CardFilter";
import { Datagrid } from "./components/Datagrid";
import { columns, type Transaction } from "./components/Datagrid/columns";
import { useState } from "react";
import { DialogTransaction } from "./components/DialogTransaction";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_TRANSACTION } from "@/lib/graphql/queries/Transaction";

export function TransactionPage(){
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { data, loading } = useQuery<{ getAllTransaction: Transaction[] }>(GET_ALL_TRANSACTION);

    const transactions = data?.getAllTransaction || [];

    console.log(transactions)

    return <Page>
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Label className="text-gray-800 text-2xl font-bold">Transações</Label>
                    <Label className="text-gray-600 text-base font-thin">Gerencie todas as suas transações financeiras</Label>
                </div>

                <Button disabled={loading} variant="default" className="font-normal" onClick={() => setOpenModal(true)}>
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

        <DialogTransaction open={openModal} onOpenChange={setOpenModal}/>
    </Page>
};