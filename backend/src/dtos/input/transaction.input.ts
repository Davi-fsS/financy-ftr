import { Field, GraphQLISODateTime, InputType } from "type-graphql"

@InputType()
export class CreateTransactionInput {
    @Field(() => String)
    description!: string

    @Field(() => GraphQLISODateTime)
    date!: Date
    
    @Field(() => String)
    categoryId!: string
    
    @Field(() => Number)
    value!: number
}

@InputType()
export class UpdateTransactionInput {
    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => GraphQLISODateTime, { nullable: true })
    date?: Date
    
    @Field(() => String, { nullable: true })
    categoryId?: string
    
    @Field(() => Number, { nullable: true })
    value?: number
}