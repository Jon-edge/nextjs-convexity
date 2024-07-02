import Image from 'next/image'
import React from 'react'

type NFTCardProps = {
  nft: {
    id: string
    name: string
    image: string
  }
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  return (
    <div className="nft-card">
      <Image src={nft.image} alt={nft.name} />
      <p>{nft.name}</p>
    </div>
  )
}

export { NFTCard }
