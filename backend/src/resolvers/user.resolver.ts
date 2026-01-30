import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { UpdateUserInput } from "../dtos/input/user.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "../../generated/prisma/client";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
    private userService = new UserService();

    @Query(() => UserModel)
    async getUser(
        @Arg("id", () => String) id: string
    ) : Promise<UserModel>{
        return this.userService.findUser(id);
    }

    @Mutation(() => UserModel)
    async updateUser(@Arg("data", () => UpdateUserInput) data: UpdateUserInput,
                    @Arg("id", () => String) id: string, @GqlUser() user: User): Promise<UserModel>{
        return this.userService.updateUser(id, data, user);
    }
}