import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import type { Category } from "@/types"
import { SquarePen, Trash } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface CardCategoryProps extends Category {
    icon: string
    name: string
    description: string
    countTransactions?: number
}

const colorMap: Record<string, { bg: string; text: string; dark: string }> = {
    pink: { bg: "bg-pink-light", text: "text-pink-base", dark: "text-pink-dark" },
    blue: { bg: "bg-blue-light", text: "text-blue-base", dark: "text-blue-dark" },
    green: { bg: "bg-green-light", text: "text-green-base", dark: "text-green-dark" },
    purple: { bg: "bg-purple-light", text: "text-purple-base", dark: "text-purple-dark" },
    yellow: { bg: "bg-yellow-light", text: "text-yellow-base", dark: "text-yellow-dark" },
    orange: { bg: "bg-orange-light", text: "text-orange-base", dark: "text-orange-dark" },
    red: { bg: "bg-red-light", text: "text-red-base", dark: "text-red-dark" },
}

export function CardCategory({ icon, color, name, description, countTransactions } : CardCategoryProps){    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[icon] || LucideIcons.HelpCircle
    const colors = colorMap[color] || colorMap.pink // fallback
    
    return <Card className="flex flex-col justify-between p-6 h-[226px]">
        <CardContent className="p-0 flex flex-col justify-between gap-5">
            <div className="flex justify-between items-center">
                <div className={`w-10 h-10 flex items-center justify-center rounded-md ${colors.bg}`}>
                    <IconComponent className={`w-5 h-5 text-gray-800 ${colors.text}`}/>
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
                <CardTitle className="text-gray-800 text-md font-semibold">{name}</CardTitle>
                <CardDescription className="text-gray-600 text-sm font-normal">{description}</CardDescription>
            </div>
        </CardContent>
        
        <CardContent className="p-0 flex justify-between items-center">
            <CardDescription className={`${colors.dark} font-medium ${colors.bg} rounded-full px-3 py-1`}>{name}</CardDescription>
            <CardDescription className="text-gray-600">{countTransactions} itens</CardDescription>
        </CardContent>
    </Card>
};