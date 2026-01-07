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
                type: data.type,
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

    async getTotalBalance(userId: string){
        const revenues = await prisma.transaction.aggregate({
            where: {
                userId, 
                type: "Entrada"
            },
            _sum: {
                value: true
            }
        });
    
        const expenses = await prisma.transaction.aggregate({
            where: {
                userId, 
                type: "Saida"
            },
            _sum: {
                value: true
            }
        });
    
        return (revenues._sum.value || 0) - (expenses._sum.value || 0);
    }
    
    async getMonthBalance(userId: string){
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const revenuesOfMonth = await prisma.transaction.aggregate({
            where: {
                userId, 
                type: "Entrada",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            _sum: {
                value: true
            }
        });
    
        const expensesOfMonth = await prisma.transaction.aggregate({
            where: {
                userId, 
                type: "Saida",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            _sum: {
                value: true
            }
        });
    
        return {
            revenues: revenuesOfMonth._sum.value || 0,
            expenses: expensesOfMonth._sum.value || 0,
        };
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
                type: data.type,
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