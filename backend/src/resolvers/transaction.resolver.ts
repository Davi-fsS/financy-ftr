import { Arg, Field, FieldResolver, Float, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionService } from "../services/transaction.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "../../generated/prisma/client";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";

@ObjectType()
export class MonthBalanceModel {
    @Field(() => Float)
    revenues!: number;

    @Field(() => Float)
    expenses!: number;
}

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver{

    private transactionService = new TransactionService();
    private userService = new UserService();
    private categoryService = new CategoryService();

    @Mutation(() => TransactionModel)
    async createTransaction(@Arg("data", () => CreateTransactionInput) data: CreateTransactionInput, @GqlUser() user: User) : Promise<TransactionModel>{
        return this.transactionService.createTransaction(data, user.id);
    }

    @Query(() => [TransactionModel])
    async getAllTransaction(@GqlUser() user: User): Promise<TransactionModel[]>{
        return this.transactionService.getAllTransaction(user.id);
    }

    @Mutation(() => TransactionModel)
    async updateTransaction(@Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput, @GqlUser() user: User, @Arg("id", () => String) id: string) : Promise<TransactionModel>{
        return this.transactionService.updateTransaction(id, data, user.id);
    }

    @Mutation(() => Boolean)
    async deleteTransaction(@Arg("id", () => String) id: string, @GqlUser() user: User) : Promise<Boolean>{
        return this.transactionService.deleteTransaction(id, user.id);
    }

    @FieldResolver(() => UserModel)
    async user(@Root() transaction: TransactionModel) : Promise<UserModel>{
        return this.userService.findUser(transaction.userId);
    }
    
    @FieldResolver(() => CategoryModel)
    async category(@Root() transaction: TransactionModel) : Promise<CategoryModel | null>{
        return this.categoryService.findCategory(transaction.categoryId);
    }

    @FieldResolver(() => Number)
    async totalBalance(@GqlUser() user: User) : Promise<Number>{
        return this.transactionService.getTotalBalance(user.id);
    }
    
    @FieldResolver(() => MonthBalanceModel)
    async monthBalance(@GqlUser() user: User) : Promise<MonthBalanceModel>{
        return this.transactionService.getMonthBalance(user.id);
    }
}