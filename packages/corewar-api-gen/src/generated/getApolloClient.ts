import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'

export const getApolloClient = (serviceName: string): ApolloClient<NormalizedCacheObject> => {
    const cache = new InMemoryCache()
    const link = createHttpLink({
        uri: `http://corewar-${serviceName}-service.azurewebsites.net/graphql`,
        fetch
    })
    return new ApolloClient({
        cache,
        link
    })
}
