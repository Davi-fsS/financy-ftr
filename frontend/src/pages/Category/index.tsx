import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, Plus, Tag, Utensils } from "lucide-react";
import { CardResume } from "./components/CardResume";
import { CardCategory } from "./components/CardCategory";
import { DialogCategory } from "./components/DialogCategory";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_CATEGORY } from "@/lib/graphql/queries/Category";
import type { Category } from "@/types";

export function CategoryPage(){

    const [openModal, setOpenModal] = useState<boolean>(false);

    const { data, loading } = useQuery<{ getAllCategory : Category[] }>(GET_ALL_CATEGORY);

    const categories = data?.getAllCategory || [];

    return <Page>
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Label className="text-gray-800 text-2xl font-bold">Categorias</Label>
                    <Label className="text-gray-600 text-base font-thin">Organize suas transações por categorias</Label>
                </div>

                <Button disabled={loading} variant="default" className="font-normal" onClick={() => setOpenModal(true)}>
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
                    categories?.map((item : Category, index : number) => {
                        return <CardCategory 
                            item={item}
                            key={`category-${item.id}-index-${index}`}
                        />
                    })
                }
            </div>
        </div>

        <DialogCategory open={openModal} onOpenChange={setOpenModal}/>
    </Page>
};