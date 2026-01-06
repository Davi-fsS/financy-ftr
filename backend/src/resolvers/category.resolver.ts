import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { CreateCategoryInput } from "../dtos/input/category.input";
import { CategoryService } from "../services/category.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "../../generated/prisma/client";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver{
    private categoryService = new CategoryService();
    private userService = new UserService();

    @Mutation(() => CategoryModel)
    async createCategory(@Arg("data", () => CreateCategoryInput) data: CreateCategoryInput, @GqlUser() user: User) : Promise<CategoryModel>{
        return this.categoryService.createCategory(data, user.id);
    }

    @FieldResolver(() => UserModel)
    async user(@Root() category: CategoryModel) : Promise<UserModel>{
        return this.userService.findUser(category.userId);
    }
}