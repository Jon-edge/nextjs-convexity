import React from 'react'
import { NFTCard } from '@/components/NFTCard'

type NFTGridProps = {
  nfts: {
    id: string
    name: string
    image: string
  }[]
}

const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => {
  return (
    // <div className="grid">
    //   {nfts.map((nft) => (
    //     <NFTCard key={nft.id} nft={nft} />
    //   ))}
    // </div>
    <></>
  )
}

export { NFTGrid }
