import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaggageClaim, BookOpen, BriefcaseBusiness, CarFront, Dumbbell, Gift, HeartPulse, House, Mailbox, PawPrint, PiggyBank, ReceiptText, ShoppingCart, Ticket, ToolCase, Utensils, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { toast } from "sonner"
import { GET_ALL_CATEGORY } from "@/lib/graphql/queries/Category"
import type { Category } from "@/types"

interface DialogCategoryProps {
    data?: Category 
    open: boolean
    onOpenChange: (open: boolean) => void
}

const icons : LucideIcon[] = [
    BriefcaseBusiness,
    CarFront,
    HeartPulse,
    PiggyBank,
    ShoppingCart,
    Ticket,
    ToolCase,
    Utensils,
    PawPrint,
    House,
    Gift,
    Dumbbell,
    BookOpen,
    BaggageClaim,
    Mailbox,
    ReceiptText
];

const colors = [
    "bg-green-base",
    "bg-blue-base",
    "bg-purple-base",
    "bg-pink-base",
    "bg-red-base",
    "bg-orange-base",
    "bg-yellow-base"
];

export function DialogCategory({ data, open, onOpenChange } : DialogCategoryProps){
    const handleIconFilled = () => {
        if(!data) return 0;

        return icons.findIndex(item => item.displayName === data.icon);
    };

    const handleColorFilled = () => {
        if(!data) return 0;

        const colorsFormatted = colors.map(item => item.replace("bg-", "").replace("-base", ""))

        return colorsFormatted.findIndex(item => item === data.color)
    };
    
    const [selectedIcon, setSelectedIcon] = useState<number | null>(0)
    const [selectedColor, setSelectedColor] = useState<number | null>(0)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(data){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitle(data?.name);
            setDescription(data?.description);
            setSelectedColor(handleColorFilled());
            setSelectedIcon(handleIconFilled())
        }
    }, [data]);

    const [createIdea, { loading }] = useMutation(CREATE_CATEGORY, {
        refetchQueries: [{ query: GET_ALL_CATEGORY }],
        awaitRefetchQueries: true,
        onCompleted(){
            toast.success("Categoria criada com sucesso");
            onOpenChange(false);
        },
        onError(){
            toast.error("Falha ao criar a categoria");
        }
    });
    
    const [updateCategory, { loading : loadingCategory }] = useMutation(UPDATE_CATEGORY, {
        refetchQueries: [{ query: GET_ALL_CATEGORY }],
        awaitRefetchQueries: true,
        onCompleted(){
            toast.success("Categoria editada com sucesso");
            onOpenChange(false);
        },
        onError(){
            toast.error("Falha ao editar a categoria");
        }
    });

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            if(data){
                updateCategory({
                    variables: {
                        updateCategoryId: data?.id,
                        data: {
                            name: title,
                            description: description,
                            color: colors[selectedColor!].replace("bg-", "").replace("-base", ""),
                            icon: icons[selectedIcon!].displayName
                        }
                    }
                })
            }
            else{
                createIdea({
                    variables: {
                        data: {
                            name: title,
                            description,
                            color: colors[selectedColor!].replace("bg-", "").replace("-base", ""),
                            icon: icons[selectedIcon!].displayName
                        }
                    }
                })
            }
        }
        catch(e){
            console.log(e)
        }
    };

    const handleCloseModal = () => {
        setSelectedIcon(0);
        setSelectedColor(0);
        setTitle("");
        setDescription("");

        onOpenChange(false);
    };

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-2 border-solid p-6 border-b-gray-200 flex flex-col gap-6">
            <button
                onClick={handleCloseModal}
                className="border-2 border-solid border-b-gray-300 rounded-lg text-gray-700 absolute right-2.5 top-2.5 p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>

            <DialogHeader>
                <DialogTitle className="text-gray-800 font-semibold text-base">Nova categoria</DialogTitle>
                <DialogDescription className="text-gray-600 text-sm">Organize suas transações com categorias</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title" className="text-gray-700 font-medium text-sm">Título</Label>
                    <Input onChange={(e) => setTitle(e.target.value)} value={title} disabled={loading || loadingCategory} id="title" className="border-b-gray-300 py-6" placeholder="Ex. Alimentação"/>
                </div>
                
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description" className="text-gray-700 font-medium text-sm">Descrição</Label>
                    <Input onChange={(e) => setDescription(e.target.value)} value={description} disabled={loading || loadingCategory} id="description" className="border-b-gray-300 py-6" placeholder="Descrição da categoria"/>
                    <DialogDescription className="text-xs text-gray-500">Opcional</DialogDescription>
                </div>

                <div className="flex flex-col gap-3">
                    <Label className="text-gray-700 font-medium text-sm">Ícone</Label>
                    <div className="w-full grid grid-cols-8 gap-3">
                        {icons.map((Icon, index) => {
                            const isSelected = selectedIcon === index
                            return <button
                                disabled={loading || loadingCategory}
                                key={index}
                                onClick={() => setSelectedIcon(index)}
                                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                                    isSelected
                                        ? "border-brand-dark bg-brand-base/5"
                                        : "border-gray-300 bg-white hover:border-gray-400"
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isSelected ? "text-brand-base" : "text-gray-600"}`}/>
                            </button>
                        })}
                    </div>
                </div>
                
                <div className="flex flex-col gap-3">
                    <Label className="text-gray-700 font-medium text-sm">Cor</Label>
                    <div className="flex gap-3 flex-wrap w-ful h-8">
                        {colors.map((color, index) => {
                            const isSelected = selectedColor === index
                            return <button
                                disabled={loading || loadingCategory}
                                key={index}
                                onClick={() => setSelectedColor(index)}
                                className={`flex-1 rounded-lg border-2 p-1 transition-all ${
                                    isSelected
                                        ? "border-brand-dark bg-brand-base/5"
                                        : "border-gray-300 bg-white hover:border-gray-400"
                                }`}
                            >
                                <div className={`w-full h-[100%] rounded-md ${color}`}/>
                            </button>
                        })}
                    </div>
                </div>
            </div>

            <DialogFooter className="w-full">
                <Button disabled={loading || loadingCategory} onClick={handleSubmit} className="w-full py-6">Salvar</Button>
            </DialogFooter>

        </DialogContent>
    </Dialog>   
}