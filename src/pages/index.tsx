import React, { useState } from 'react'
import NFTDisplay from '../components/NFTDisplay'

const Home: React.FC = () => {
  const [ownerAddress, setOwnerAddress] = useState<string>(
    'stars1a605a9879cafvsql5l3r734kl6flak866gfppe'
  )

  return (
    <div>
      <h1>Stargaze NFT Display</h1>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={ownerAddress}
        onChange={e => setOwnerAddress(e.target.value)}
        style={{ color: 'black' }}
      />
      <button onClick={() => setOwnerAddress(ownerAddress)}>Fetch NFTs</button>
      <NFTDisplay ownerAddress={ownerAddress} />
    </div>
  )
}

export default Home
