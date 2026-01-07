import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { CategoryService } from "../services/category.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "../../generated/prisma/client";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver{
    private categoryService = new CategoryService();
    private userService = new UserService();
    private transactionService = new TransactionService();

    @Mutation(() => CategoryModel)
    async createCategory(@Arg("data", () => CreateCategoryInput) data: CreateCategoryInput, @GqlUser() user: User) : Promise<CategoryModel>{
        return this.categoryService.createCategory(data, user.id);
    }

    @Query(() => [CategoryModel])
    async getAllCategory(@GqlUser() user: User) : Promise<CategoryModel[]>{
        return this.categoryService.getAllCategory(user.id);
    }

    @Mutation(() => CategoryModel)
    async updateCategory(@Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
                    @Arg("id", () => String) id: string): Promise<CategoryModel>{
        return this.categoryService.updateCategory(id, data);
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Arg("id", () => String) id: string) : Promise<Boolean>{
        return this.categoryService.deleteCategory(id);
    }

    @FieldResolver(() => UserModel)
    async user(@Root() category: CategoryModel) : Promise<UserModel>{
        return this.userService.findUser(category.userId);
    }

    @FieldResolver(() => Number)
    async countTransactions(@Root() category: CategoryModel) : Promise<Number>{
        return this.transactionService.countTransactionByCategory(category.id);
    }
}