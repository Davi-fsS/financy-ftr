import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Category } from "@/types";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardCategoriesProps {
    list: Category[] | null
}

const colorMap: Record<string, { bg: string; text: string; }> = {
    pink: { bg: "bg-pink-light", text: "text-pink-base" },
    blue: { bg: "bg-blue-light", text: "text-blue-base" },
    green: { bg: "bg-green-light", text: "text-green-base" },
    purple: { bg: "bg-purple-light", text: "text-purple-base" },
    yellow: { bg: "bg-yellow-light", text: "text-yellow-base" },
    orange: { bg: "bg-orange-light", text: "text-orange-base" },
    red: { bg: "bg-red-light", text: "text-red-base" },
}

export function CardCategories({ list } : CardCategoriesProps){
    const navigate = useNavigate();

    return <Card>
        <CardHeader className="py-5 px-4 flex flex-row justify-between items-center border-b border-gray-100">
            <CardDescription>CATEGORIAS</CardDescription>
            <Button onClick={() => navigate("categories")} variant="link">Gerenciar <ChevronRight/></Button>
        </CardHeader>

        <CardContent className="p-0">
            {list?.map((item, index) => {
                const color = colorMap[item.color]

                return <div key={index} className="flex justify-between px-6 py-5">
                    <div className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${color.bg} ${color.text} whitespace-nowrap`}>
                        {item.name}
                    </div>

                    <div className="flex gap-8">
                        <p className="text-gray-600">{item.countTransactions} itens</p>

                        <p className="text-gray-800 font-semibold">{formatCurrency(item.valueTransactions!)}</p>
                    </div>
                </div>
            })}
        </CardContent>
    </Card>
}