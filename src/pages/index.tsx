import React, { useState } from 'react'
import { NFTList } from '../components/NFTList'

const Home: React.FC = () => {
  const [ownerAddress, setOwnerAddress] = useState<string>(
    'stars1a605a9879cafvsql5l3r734kl6flak866gfppe'
  )
  const [numNfts, setNumNfts] = useState<number>(50)

  return (
    <div style={{ color: '#fff', padding: '20px', backgroundColor: '#121212' }}>
      <h1
        style={{
          textAlign: 'center',
          margin: '20px 0',
          fontSize: '2rem',
          textShadow: '2px 2px 2px rgba(131, 131, 131, 0.932)'
        }}
      >
        Stargaze NFT Display
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
          alignItems: 'center'
        }}
      >
        <div style={{ fontSize: '1.25rem', marginRight: '5px' }}>Address:</div>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={ownerAddress}
          onChange={e => setOwnerAddress(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '2px solid #ccc',
            width: '380px',
            color: '#333',
            backgroundColor: '#fff'
          }}
        />
        <div style={{ fontSize: '1.25rem', marginRight: '5px' }}>Num NFTs:</div>
        <input
          type="text"
          placeholder="50"
          value={numNfts}
          onChange={e => setNumNfts(parseInt(e.target.value))}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '2px solid #ccc',
            width: '50px',
            color: '#333',
            backgroundColor: '#fff'
          }}
        />
        <button
          onClick={() => setOwnerAddress(ownerAddress)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4a5568',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            marginLeft: '10px'
          }}
        >
          Fetch NFTs
        </button>
      </div>
      <NFTList ownerAddress={ownerAddress} numNfts={numNfts} />
    </div>
  )
}

export default Home
