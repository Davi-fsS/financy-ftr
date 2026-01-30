import { User } from "../../generated/prisma/client";
import { prisma } from "../../prisma/prisma";
import { UpdateUserInput } from "../dtos/input/user.input";

export class UserService {
    async findUser(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) throw new Error("Usuário não existe");

        return user;
    }

    async updateUser(id: string, userEdit: UpdateUserInput, user: User){
        const userResponsible = await this.findUser(user.id);

        if(!userResponsible || userResponsible.id !== id) throw new Error("Houveu um erro ao atualizar");

        const userToUpdate = await this.findUser(id);

        if(!user) throw new Error("Usuário não existe");

        return prisma.user.update({
            where: { id: userToUpdate.id },
            data: {
                name: userEdit.name
            }
        })
    }
}