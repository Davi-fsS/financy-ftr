import { useAuthStore } from "@/stores/auth";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { toast } from "sonner";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
});

const authLink = new SetContextLink((prevContext) => {
    const token = useAuthStore.getState().token;

    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
});

const errorLink = new ErrorLink(({ result }) => {
    if(result?.errors){
        toast.error(result.errors[0].message);
        useAuthStore.getState().logout();
    }
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
});