import { gql } from "@apollo/client";

export const GET_ALL_CATEGORY = gql`
    query GetAllCategory {
        getAllCategory {
            id,
            name,
            color,
            icon,
            description,
            countTransactions,
            valueTransactions
        }
    }
`;