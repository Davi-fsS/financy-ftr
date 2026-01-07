import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { CategoryModel } from "./category.model";

@ObjectType()
export class TransactionModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    description!: string

    @Field(() => GraphQLISODateTime)
    date!: Date

    @Field(() => String)
    categoryId!: string

    @Field(() => CategoryModel)
    category?: CategoryModel

    @Field(() => Number)
    value!: number
    
    @Field(() => String)
    type!: string

    @Field(() => String)
    userId!: string
    
    @Field(() => UserModel, { nullable: true })
    user?: UserModel

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}