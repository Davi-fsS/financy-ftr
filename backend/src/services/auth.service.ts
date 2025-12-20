import { User } from "../../generated/prisma/client";
import { prisma } from "../../prisma/prisma";
import { RegisterInput } from "../dtos/input/auth.input";
import { hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export class AuthService {
    async register(data: RegisterInput){
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if(existingUser) throw new Error("E-mail já cadastrado!");

        const hash = await hashPassword(data.password);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash
            }
        });

        return this.generateToken(user);
    }

    generateToken(user: User){
        const token = signJwt({ id: user.id, email: user.email }, "15m");
        const refreshToken = signJwt({ id: user.id, email: user.email }, "1d");

        return { token, refreshToken, user };
    }
}