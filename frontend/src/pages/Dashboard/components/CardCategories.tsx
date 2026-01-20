import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import type { Category } from "@/types";
import { ChevronRight } from "lucide-react";

interface CardCategoriesProps {
    list: Category[] | null
}

const categoryColors: Record<string, string> = {
    "Alimentação": "bg-blue-100 text-blue-700",
    "Transporte": "bg-purple-100 text-purple-700",
    "Mercado": "bg-orange-100 text-orange-700",
    "Investimento": "bg-green-100 text-green-700",
    "Utilidades": "bg-yellow-100 text-yellow-700",
    "Salário": "bg-green-100 text-green-700",
    "Receita": "bg-green-100 text-green-700",
    "Entretenimento": "bg-pink-100 text-pink-700",
};

export function CardCategories({ list } : CardCategoriesProps){
    return <Card>
        <CardHeader className="py-5 px-4 flex flex-row justify-between items-center border-b border-gray-100">
            <CardDescription>CATEGORIAS</CardDescription>
            <Button variant="link">Gerenciar <ChevronRight/></Button>
        </CardHeader>

        <CardContent className="p-0">
            {list?.map((item, index) => {
                const colors = categoryColors[item.name]

                return <div key={index} className="flex justify-between px-6 py-5">
                    <div className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${colors} whitespace-nowrap`}>
                        {item.name}
                    </div>

                    <div className="flex gap-8">
                        <p className="text-gray-600">12 itens</p>

                        <p className="text-gray-800 font-semibold">R$ 542,30</p>
                    </div>
                </div>
            })}
        </CardContent>
    </Card>
}