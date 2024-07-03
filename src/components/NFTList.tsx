import React, { useEffect, useState, useCallback } from 'react'
import { fetchNFTs, NFT } from '../utils/fetchNFTs'
import { NFTCard } from './NFTCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const NFTList: React.FC<{ ownerAddress: string; numNfts: number }> = ({
  ownerAddress,
  numNfts
}) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [hiddenNfts, setHiddenNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndSetNFTs = async () => {
      setLoading(true)
      try {
        const fetchedNFTs = await fetchNFTs(ownerAddress, numNfts)
        setNfts(fetchedNFTs)
      } catch (err) {
        setError('Failed to fetch NFTs')
      } finally {
        setLoading(false)
      }
    }
    fetchAndSetNFTs()
  }, [ownerAddress])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setNfts(currentNfts => {
      const newNFTs = [...currentNfts]
      const [draggedItem] = newNFTs.splice(dragIndex, 1)
      newNFTs.splice(hoverIndex, 0, draggedItem)
      return newNFTs
    })
  }, [])

  const toggleHideCard = useCallback(
    (nft: NFT) => {
      if (hiddenNfts.includes(nft)) {
        setHiddenNfts(currentHidden =>
          currentHidden.filter(item => item !== nft)
        )
        setNfts(currentVisible => [...currentVisible, nft])
      } else {
        setHiddenNfts(currentHidden => [...currentHidden, nft])
        setNfts(currentVisible => currentVisible.filter(item => item !== nft))
      }
    },
    [hiddenNfts]
  )

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {nfts.map((nft, index) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            index={index}
            onMoveCard={moveCard}
            onToggleHide={() => toggleHideCard(nft)}
          />
        ))}
        {hiddenNfts.length > 0 && (
          <h1
            style={{
              margin: '40px',
              padding: '10px',
              fontSize: '24px',
              color: '#dfdfdf',
              textShadow: '1px 1px 1px rgba(138, 138, 138, 0.932)',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Hidden NFTs
          </h1>
        )}
        {hiddenNfts.map((nft, index) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            index={index}
            onToggleHide={() => toggleHideCard(nft)}
            isHidden
          />
        ))}
      </div>
    </DndProvider>
  )
}
