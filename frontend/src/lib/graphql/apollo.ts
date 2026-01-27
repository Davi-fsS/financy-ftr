import { useAuthStore } from "@/stores/auth";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
});

const authLink = new SetContextLink((prevContext) => {
    const token = useAuthStore.getState().token;

    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4N2UxYTFkLWFlNGUtNDBkZi1iNTQyLWQzYjIxNTY4ZTA0YyIsImVtYWlsIjoiZGF2aWZzc29hcmVzMjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3Njk0Nzk3ODksImV4cCI6MTc2OTQ4MDY4OX0.jxaFb2aqcJgbHfe6nlyvLt-2Re7HKlY3IR7tolJuqpA` : ""
        }
    }
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache()
});