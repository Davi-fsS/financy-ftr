import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaggageClaim, BookOpen, BriefcaseBusiness, CarFront, Dumbbell, Gift, HeartPulse, House, Mailbox, PawPrint, PiggyBank, ReceiptText, ShoppingCart, Ticket, ToolCase, Utensils, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface DialogCategoryProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DialogCategory({ open, onOpenChange } : DialogCategoryProps){
    const [selectedIcon, setSelectedIcon] = useState<number | null>(0)
    const [selectedColor, setSelectedColor] = useState<number | null>(0)

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
    ]

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-2 border-solid p-6 border-b-gray-200 flex flex-col gap-6">
            <button
                onClick={() => onOpenChange(false)}
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
                    <Input id="title" className="border-b-gray-300 py-6" placeholder="Ex. Alimentação"/>
                </div>
                
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description" className="text-gray-700 font-medium text-sm">Descrição</Label>
                    <Input id="description" className="border-b-gray-300 py-6" placeholder="Descrição da categoria"/>
                    <DialogDescription className="text-xs text-gray-500">Opcional</DialogDescription>
                </div>

                <div className="flex flex-col gap-3">
                    <Label className="text-gray-700 font-medium text-sm">Ícone</Label>
                    <div className="w-full grid grid-cols-8 gap-3">
                        {icons.map((Icon, index) => {
                            const isSelected = selectedIcon === index
                            return <button
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
                <Button className="w-full">Salvar</Button>
            </DialogFooter>

        </DialogContent>
    </Dialog>   
}