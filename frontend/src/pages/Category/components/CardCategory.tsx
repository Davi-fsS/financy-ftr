import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { SquarePen, Trash, type LucideIcon } from "lucide-react"

interface CardCategoryProps {
    icon: LucideIcon
    iconColor: string
    title: string
    description: string
    categoryName: string
    quantity: number
}

export function CardCategory({ icon: Icon, iconColor, title, description, categoryName, quantity } : CardCategoryProps){    
    return <Card className="flex flex-col justify-between p-6 h-[226px]">
        <CardContent className="p-0 flex flex-col justify-between gap-5">
            <div className="flex justify-between items-center">
                <div className={`w-10 h-10 flex items-center justify-center rounded-md bg-${iconColor}-light`}>
                    <Icon className={`w-5 h-5 text-gray-800 text-${iconColor}-base`}/>
                </div>

                <div className="flex gap-2.5">
                    <Button variant="outline" className="w-9">
                        <Trash className="text-feedback-danger"/>
                    </Button>

                    <Button variant="outline" className="w-9">
                        <SquarePen className="text-gray-700"/>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <CardTitle className="text-gray-800 text-md font-semibold">{title}</CardTitle>
                <CardDescription className="text-gray-600 text-sm font-normal">{description}</CardDescription>
            </div>
        </CardContent>
        
        <CardContent className="p-0 flex justify-between items-center">
            <CardDescription className={`text-${iconColor}-dark font-medium bg-${iconColor}-light rounded-full px-3 py-1`}>{categoryName}</CardDescription>
            <CardDescription className="text-gray-600">{quantity} itens</CardDescription>
        </CardContent>
    </Card>
};