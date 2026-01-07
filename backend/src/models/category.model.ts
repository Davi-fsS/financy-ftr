import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { TransactionModel } from "./transaction.model";

@ObjectType()
export class CategoryModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    description!: string

    @Field(() => String)
    icon!: string
    
    @Field(() => String)
    color!: string
    
    @Field(() => String)
    userId!: string
    
    @Field(() => UserModel, { nullable: true })
    user?: UserModel

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}