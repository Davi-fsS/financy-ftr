import { gql } from "@apollo/client";

export const GET_ALL_TRANSACTION = gql`
    query GetAllTransactions{
        getAllTransaction {
            id,
            description,
            category {
                id,
                name,
                icon,
                description,
                color,
                countTransactions
            },
            value,
            date,
            type,
            user {
                id,
                name
            },
            createdAt,
            totalBalance,
            monthBalance{
            expenses,
            revenues
            }
        }
    }
`;