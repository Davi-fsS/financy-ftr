import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($data: CreateTransactionInput!) {
        createTransaction(data: $data) {
            id,
            description,
            date,
            value,
            user {
                name
            },
            category {
                name,
                description
            }
        }
    }
`;

export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($deleteTransactionId: String!){
       deleteTransaction(id: $deleteTransactionId)
    }
`;

export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($updateTransactionId: String!, $data: UpdateTransactionInput!){
        updateTransaction(id: $updateTransactionId, data: $data) {
            id,
            description,
            date,
            value,
            category {
                id,
                name,
                description
            },
            user {
                name
            },
            createdAt,
            updatedAt
        }
    }
`;