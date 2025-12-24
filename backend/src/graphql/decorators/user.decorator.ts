import { createParameterDecorator, ResolverData } from "type-graphql"
import { GraphqlContext } from "../context"
import { prisma } from "../../../prisma/prisma"
import { User } from "../../../generated/prisma/browser"

export const GqlUser = () => {
    return createParameterDecorator(async({ context } : ResolverData<GraphqlContext>) : Promise<User | null> => {
        if(!context || !context.user) return null

        try{
            const user = await prisma.user.findUnique({
                where: {
                    id: context.user
                }
            })

            if(!user) throw new Error("Usuário não encontrado")

            return user
        }
        catch(error){
            console.log("erro ao instancia gql user", error)
            return null
        }
    })
}