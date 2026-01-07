import { prisma } from "../../prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {
    async createCategory(data: CreateCategoryInput, userId: string){
        return prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
                icon: data.icon,
                color: data.color,
                userId: userId
            }
        })
    }
    
    async getAllCategory(userId: string){
        return prisma.category.findMany({
            where: {
                userId: userId
            }
        })
    }
    
    async findCategory(id: string){
        return prisma.category.findUnique({
            where: {
                id
            }
        })
    }
    
    async countCategory(id: string){
        return prisma.category.count({
            where: {
                id
            }
        })
    }
    
    async updateCategory(id: string, data: UpdateCategoryInput){
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        });

        if(!category) throw new Error("Categoria não encontrada");

        return prisma.category.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                color: data.color,
                icon: data.icon
            }
        })
    }

    async deleteCategory(id: string){
        try{
            const category = await prisma.category.findUnique({
                where: {
                    id
                }
            });
    
            if(!category) throw new Error("Categoria não encontrada");
    
            await prisma.category.delete({
                where: { id }
            });

            return true;
        }
        catch{
            return false;
        }
    }
}