import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"
import { GET_ALL_CATEGORY } from "@/lib/graphql/queries/Category"
import { GET_ALL_TRANSACTION } from "@/lib/graphql/queries/Transaction"
import type { Category } from "@/types"
import { useMutation, useQuery } from "@apollo/client/react"
import { CircleArrowDown, CircleArrowUp, X } from "lucide-react"
import moment from "moment"
import { useState } from "react"
import { toast } from "sonner"

interface DialogTransactionProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DialogTransaction({ open, onOpenChange } : DialogTransactionProps){
    const [isReceita, setIsReceita] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [value, setValue] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<string>("");

    const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
        refetchQueries: [{ query: GET_ALL_TRANSACTION }],
        awaitRefetchQueries: true,
        onCompleted(){
            toast.success("Transação cadastrada com sucesso");
            onOpenChange(false);
        },
        onError(){
            toast.error("Falha ao criar a transação")
        }
    });

    const { data } = useQuery<{ getAllCategory : Category[] }>(GET_ALL_CATEGORY);
    
    const categories = data?.getAllCategory.map(item => ({
        id: item.id,
        name: item.name
    })) || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try{
            createTransaction({
                variables: {
                    data: {
                        description,
                        date: moment(date).toISOString(),
                        categoryId,
                        value,
                        type: isReceita ? "Entrada" : "Saida"
                    }
                }
            })
        }
        catch(e){
            console.log(e)
        }
    };

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-2 border-solid p-6 border-gray-200 flex flex-col gap-6">
            <button
                disabled={loading}
                onClick={() => onOpenChange(false)}
                className="border-2 border-solid border-gray-300 rounded-lg text-gray-700 absolute right-2.5 top-2.5 p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>

            <DialogHeader>
                <DialogTitle className="text-gray-800 font-semibold text-base">Nova transação</DialogTitle>
                <DialogDescription className="text-gray-600 text-sm">Registre sua despesa ou receita</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6">
                <div className="flex gap-3 border-2 border-gray-200 p-2 rounded-lg">
                    <Button variant="outline" className={`shadow-none flex-1 ${isReceita ? "border-none" : "border-2 border-red-base"}`} onClick={() => setIsReceita(false)}>
                        <CircleArrowDown className={`w-4 h-4 ${isReceita ? "text-gray-400" : "text-red-base"}`}/>
                        <span className={`${isReceita ? "text-gray-600" : "text-gray-800 font-medium"}`}>Despesa</span>
                    </Button>

                    <Button variant="outline" className={`shadow-none flex-1 ${isReceita ? "border-2 border-green-base" : "border-none"}`} onClick={() => setIsReceita(true)}>
                        <CircleArrowUp className={`w-4 h-4 ${isReceita ? "text-green-base" : "text-gray-400"}`}/>
                        <span className={`${isReceita ? "text-gray-800 font-medium" : "text-gray-600"}`}>Receita</span>
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="description" className="text-gray-700 font-medium text-sm">Descrição</Label>
                    <Input onChange={e => setDescription(e.target.value)} value={description} id="description" className="border-b-gray-300 py-6" placeholder="Ex. Almoço no restaurante"/>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Label htmlFor="date" className="text-gray-700 font-medium text-sm">Data</Label>
                        <Input onChange={e => setDate(e.target.value)} value={date} id="date" type="date" className="border-b-gray-300 py-6" placeholder="Selecione"/>                        
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="value" className="text-gray-700 font-medium text-sm">Valor</Label>
                        <Input onChange={e => setValue(e.target.valueAsNumber)} value={value} id="value" type="number" className="border-b-gray-300 py-6"/>                        
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="category" className="text-gray-700 font-medium text-sm">Categoria</Label>
                    <Select onValueChange={setCategoryId} value={categoryId}>
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecione"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map(item => {
                                    return <SelectItem value={item.id}>{item.name}</SelectItem>
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <DialogFooter className="w-full">
                <Button disabled={loading} onClick={handleSubmit} className="w-full py-6">Salvar</Button>
            </DialogFooter>

        </DialogContent>
    </Dialog>   
}