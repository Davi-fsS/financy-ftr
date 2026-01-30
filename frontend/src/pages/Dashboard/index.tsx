import { Page } from "@/components/Page";
import { CardResume } from "./components/CardResume";
import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { CardRecentTransactions } from "./components/CardRecentTransactions";
import type { Category, Transaction } from "@/types";
import { CardCategories } from "./components/CardCategories";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_TRANSACTION } from "@/lib/graphql/queries/Transaction";
import moment from "moment";
import { formatCurrency } from "@/lib/utils";
import { GET_ALL_CATEGORY } from "@/lib/graphql/queries/Category";
import { DialogTransaction } from "../Transaction/components/DialogTransaction";

export function DashboardPage(){
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { data : transaction } = useQuery<{ getAllTransaction: Transaction[] }>(GET_ALL_TRANSACTION);

    const transactions : Transaction[] = useMemo(() => 
        transaction?.getAllTransaction?.map(item => ({...item, date: moment(item.date).format("DD/MM/YYYY")})) || [], 
        [transaction]
    );

    const { data : category } = useQuery<{ getAllCategory : Category[] }>(GET_ALL_CATEGORY);

    const categories = category?.getAllCategory || [];

    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [monthBalance, setMonthBalance] = useState<{ expenses: number, revenues: number}>({ expenses: 0, revenues: 0 });

    useEffect(() => {
        if(transactions.length > 0){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTotalBalance(transactions[0].totalBalance!);
            setMonthBalance(transactions[0].monthBalance!);
        }
    }, [transactions]);

    return <Page>
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-6">
                <CardResume
                    icon={Wallet}
                    iconColor="text-purple-base"
                    content={formatCurrency(totalBalance!)}
                    title="SALDO TOTAL"
                />

                <CardResume
                    icon={CircleArrowUp}
                    iconColor="text-green-base"
                    content={formatCurrency(monthBalance?.revenues ?? 0)}
                    title="RECEITA DO MÊS"
                />

                <CardResume
                    icon={CircleArrowDown}
                    iconColor="text-red-base"
                    content={formatCurrency(monthBalance?.expenses ?? 0)}
                    title="DESPESA DO MÊS"
                />
            </div>
        
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">                    
                    <CardRecentTransactions
                        list={transactions}
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