import React, { useEffect, useState } from 'react'
import { fetchNFTs } from '../utils/fetchNFTs'

interface NFT {
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
}

const NFTDisplay: React.FC<{ ownerAddress: string }> = ({ ownerAddress }) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndSetNFTs = async () => {
      setLoading(true)
      try {
        const fetchedNFTs = await fetchNFTs(ownerAddress)
        setNfts(fetchedNFTs.tokens)
      } catch (err) {
        setError('Failed to fetch NFTs')
      }
      setLoading(false)
    }
    fetchAndSetNFTs()
  }, [ownerAddress])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      {nfts.map(nft => (
        <div
          key={nft.id}
          style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
        >
          <img
            src={nft.media.url}
            alt={nft.name}
            style={{ width: '100px', height: '100px' }}
          />
          <h2>{nft.name}</h2>
          <p>{nft.description}</p>
          <p>Collection: {nft.collection.name}</p>
          <p>Token ID: {nft.tokenId}</p>
          <p>Owner: {nft.owner.address}</p>
        </div>
      ))}
    </div>
  )
}

export default NFTDisplay
