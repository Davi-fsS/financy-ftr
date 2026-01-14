import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, Plus, Tag, Ticket, Utensils } from "lucide-react";
import { CardResume } from "./components/CardResume";
import { CardCategory } from "./components/CardCategory";

export function CategoryPage(){

    const categories = [
        {
            id: 1,
            iconName: Utensils,
            iconColor: "blue",
            title: "Alimentação",
            description: "Restaurantes, delivery e refeições",
            categoryName: "Alimentação",
            quantity: 12
        },
        {
            id: 2,
            iconName: Ticket,
            iconColor: "pink",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            categoryName: "Entretenimento",
            quantity: 2
        },
        {
            id: 1,
            iconName: Utensils,
            iconColor: "blue",
            title: "Alimentação",
            description: "Restaurantes, delivery e refeições",
            categoryName: "Alimentação",
            quantity: 12
        },
        {
            id: 2,
            iconName: Ticket,
            iconColor: "pink",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            categoryName: "Entretenimento",
            quantity: 2
        },
        {
            id: 1,
            iconName: Utensils,
            iconColor: "blue",
            title: "Alimentação",
            description: "Restaurantes, delivery e refeições",
            categoryName: "Alimentação",
            quantity: 12
        },
        {
            id: 2,
            iconName: Ticket,
            iconColor: "pink",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            categoryName: "Entretenimento",
            quantity: 2
        },
        {
            id: 1,
            iconName: Utensils,
            iconColor: "blue",
            title: "Alimentação",
            description: "Restaurantes, delivery e refeições",
            categoryName: "Alimentação",
            quantity: 12
        },
        {
            id: 2,
            iconName: Ticket,
            iconColor: "pink",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            categoryName: "Entretenimento",
            quantity: 2
        },
        {
            id: 1,
            iconName: Utensils,
            iconColor: "blue",
            title: "Alimentação",
            description: "Restaurantes, delivery e refeições",
            categoryName: "Alimentação",
            quantity: 12
        },
        {
            id: 2,
            iconName: Ticket,
            iconColor: "pink",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            categoryName: "Entretenimento",
            quantity: 2
        },
    ]

    return <Page>
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Label className="text-gray-800 text-2xl font-bold">Categorias</Label>
                    <Label className="text-gray-600 text-base font-thin">Organize suas transações por categorias</Label>
                </div>

                <Button variant="default" className="font-normal">
                    <Plus className="text-white"/>
                    Nova categoria
                </Button>
            </div>

            <div className="w-full flex gap-6">
                <CardResume icon={Tag} iconColor="text-gray-700" content={8} title="total de categorias"/>
                <CardResume icon={ArrowUpDown} iconColor="text-purple-base" content={27} title="total de transações"/>
                <CardResume icon={Utensils} iconColor="text-blue-base" content={"Alimentação"} title="categoria mais utilizada"/>
            </div>

            <div className="w-full grid grid-cols-4 gap-4 flex-wrap">
                {
                    categories.map((item, index) => {
                        return <CardCategory 
                            key={`category-${item.id}-index-${index}`}
                            icon={item.iconName} 
                            iconColor={item.iconColor}
                            title={item.title}
                            description={item.description}
                            categoryName={item.categoryName}
                            quantity={item.quantity}
                        />
                    })
                }
            </div>
        </div>

    </Page>
};