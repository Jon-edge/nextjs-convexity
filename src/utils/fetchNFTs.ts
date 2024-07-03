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
        lastSalePrice {
          amount
          amountUsd
        }
        tokenId
        tokenUri
      }
    }
  }
`

export interface NFT {
  id: string
  name: string
  description: string
  media: {
    url: string
  }
  owner: {
    address: string
  }
  collection: {
    name: string
    contractAddress: string
    tokenCounts: {
      total: number
    }
  }
  tokenId: string
  lastSalePrice?: {
    amount: number
    amountUsd: number
  }
}

export const fetchNFTs = async (
  owner: string,
  numNfts: number
): Promise<NFT[]> => {
  const client = new ApolloClient({
    uri: 'https://graphql.mainnet.stargaze-apis.com/graphql',
    cache: new InMemoryCache()
  })

  try {
    const { data } = await client.query({
      query: GET_NFTS_FOR_ADDRESS,
      variables: { owner, limit: numNfts, offset: 0 }
    })

    const nfts: NFT[] = [...data.tokens.tokens]
    console.log('Fetched NFTs:', JSON.stringify(nfts, null, 2))

    // Sort NFTs by lastSalePrice.amountUsd if it exists
    const sortedNFTs = nfts.sort((a, b) => {
      const aValue = a.lastSalePrice?.amountUsd ?? 0
      const bValue = b.lastSalePrice?.amountUsd ?? 0
      return bValue - aValue
    })

    return sortedNFTs
  } catch (error: any) {
    console.log('Failed to fetch NFTs:', error.message, JSON.stringify(error))
    return []
  }
}
