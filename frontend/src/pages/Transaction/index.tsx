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
import moment from "moment";

moment.locale("pt-BR")

export function TransactionPage(){
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { data, loading } = useQuery<{ getAllTransaction: Transaction[] }>(GET_ALL_TRANSACTION);

    const transactions = data?.getAllTransaction || [];

    const [filters, setFilters] = useState({
        description: "",
        type: null,
        categoryId: null, 
        date: ""
    });

    const filteredTransactions = transactions.filter(transaction => {
        if (filters.description && !transaction.description.toLowerCase().includes(filters.description.toLowerCase())) {
            return false;
        }
        
        if (filters.type && transaction.type !== filters.type) {
            return false;
        }
        
        if (filters.categoryId && transaction.category.id !== filters.categoryId) {
            return false;
        }
        
        if (filters.date && moment(transaction.date).format("MMMM / YYYY") !== filters.date) {
            return false;
        }
        
        return true;
    });

    const dataOptions = new Set(transactions.map(item => moment(item.date).format("MMMM / YYYY")))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFilter = (filterData : any) => {
        setFilters(filterData)
    };

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

            <CardFilter dataOptions={dataOptions} filters={filters} onChange={handleFilter}/>

            <Datagrid columns={columns} data={filteredTransactions}/>
        </div>

        <DialogTransaction open={openModal} onOpenChange={setOpenModal}/>
    </Page>
};