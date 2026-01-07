import { Field, Float, GraphQLISODateTime, InputType } from "type-graphql"

@InputType()
export class CreateTransactionInput {
    @Field(() => String)
    description!: string

    @Field(() => GraphQLISODateTime)
    date!: Date

    @Field(() => String)
    type!: string
    
    @Field(() => String)
    categoryId!: string
    
    @Field(() => Float)
    value!: number
}

@InputType()
export class UpdateTransactionInput {
    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => GraphQLISODateTime, { nullable: true })
    date?: Date

    @Field(() => String)
    type?: string
    
    @Field(() => String, { nullable: true })
    categoryId?: string
    
    @Field(() => Float, { nullable: true })
    value?: number
}