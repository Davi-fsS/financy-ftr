import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UpdateUser($updateUserId: String!, $data: UpdateUserInput!) {
        updateUser(id: $updateUserId, data: $data) {
            createdAt
            email
            id
            name
            password
            updatedAt
        }
    }
`;