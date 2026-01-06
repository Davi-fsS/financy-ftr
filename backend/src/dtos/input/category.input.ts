import { Field, InputType } from "type-graphql"

@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    name!: string

    @Field(() => String)
    description!: string
    
    @Field(() => String)
    icon!: string
    
    @Field(() => String)
    color!: string
}