import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface CardResumeProps {
    icon: LucideIcon
    iconColor: string
    content: number | string
    title: string
}

export function CardResume({ icon: Icon, iconColor, content, title } : CardResumeProps){
    return <Card className="w-full flex p-6 gap-4 h-[106px]">        
        <CardContent className="mt-1.5 p-0 flex-shrink-0">
            <Icon className={`w-6 h-6 text-gray-800 ${iconColor}`} />
        </CardContent>
        
        <CardContent className="p-0 flex flex-col flex-1 gap-1">
            <CardTitle className="text-gray-800 font-bold text-3xl">
                {content}
            </CardTitle>
            <CardDescription className="text-gray-600 font-light text-sm tracking-wide">
                {title.toUpperCase()}
            </CardDescription>
        </CardContent>
    </Card>
};