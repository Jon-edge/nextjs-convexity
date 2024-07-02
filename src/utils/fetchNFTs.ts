import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const GET_NFTS_FOR_ADDRESS = gql`
  query Tokens($owner: String!, $limit: Int, $offset: Int) {
    tokens(owner: $owner, limit: $limit, offset: $offset) {
      pageInfo {
        total
        limit
        offset
      }
      tokens {
        id
        name
        description
        media {
          url
        }
        owner {
          address
        }
        collection {
          tokenCounts {
            total
          }
          name
          contractAddress
        }
        tokenId
        tokenUri
      }
    }
  }
`

export const fetchNFTs = async (owner: string) => {
  const client = new ApolloClient({
    uri: 'https://graphql.mainnet.stargaze-apis.com/graphql',
    cache: new InMemoryCache()
  })

  try {
    const { data } = await client.query({
      query: GET_NFTS_FOR_ADDRESS,
      variables: { owner, limit: 30, offset: 0 }
    })
    console.log(JSON.stringify(data.tokens))
    return data.tokens
  } catch (error) {
    console.log('Failed to fetch NFTs:', JSON.stringify(error))
    return []
  }
}
