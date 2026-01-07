import { prisma } from "../../prisma/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
    async createTransaction(data: CreateTransactionInput, userId: string){
        const category = prisma.category.findUnique({
            where: {
                id: data.categoryId
            }
        });

        if(!category) throw new Error("Categoria não encontrada");

        return prisma.transaction.create({
            data: {
                description: data.description,
                date: data.date,
                categoryId: data.categoryId,
                value: data.value,
                userId: userId
            }
        })
    }
    
    async getAllTransaction(userId: string){
        return prisma.transaction.findMany({
            where: {
                userId: userId
            }
        })
    }

    async countTransactionByCategory(categoryId: string){
        return prisma.transaction.count({
            where: {
                categoryId
            }
        })
    }
    
    async sumValueTransactionByCategory(categoryId: string){
        return (await prisma.transaction.aggregate({
            where: {
                categoryId
            },
            _sum: {
                value: true
            }
        }))._sum.value || 0;
    }
    
    async updateTransaction(id: string, data: UpdateTransactionInput, userId: string){
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });

        if(!transaction) throw new Error("Transação não encontrada");

        if(transaction.userId !== userId) throw new Error("Transação não encontrada");

        if(data.categoryId){
            const category = prisma.category.findUnique({
                where: {
                    id: data.categoryId
                }
            });
    
            if(!category) throw new Error("Categoria não encontrada"); 
        }

        return prisma.transaction.update({
            where: { id },
            data: {
                description: data.description,
                date: data.date,
                categoryId: data.categoryId,
                value: data.value
            }
        })
    }

    async deleteTransaction(id: string, userId: string){
        try{
            const transaction = await prisma.transaction.findUnique({
                where: {
                    id
                }
            });
    
            if(!transaction) throw new Error("Transação não encontrada");

            if(transaction.userId !== userId) throw new Error("Transação não encontrada");
    
            await prisma.transaction.delete({
                where: { id }
            });

            return true;
        }
        catch{
            return false;
        }
    }
}