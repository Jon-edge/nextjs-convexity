import React, { useRef } from 'react'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { NFT } from '@/utils/fetchNFTs'

interface DragItem {
  id: string
  index: number
}

interface NFTCardProps {
  nft: NFT
  index: number
  isHidden?: boolean

  onToggleHide?: () => void
  onMoveCard?: (dragIndex: number, hoverIndex: number) => void
}

export const NFTCard = ({
  nft,
  index,
  isHidden = false,
  onMoveCard: moveCard = () => {},
  onToggleHide: toggleHide = () => {}
}: NFTCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLImageElement>(null)

  const [, drop] = useDrop<DragItem, void, void>({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()

      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (
          (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) ||
          (dragIndex > hoverIndex && hoverClientY < hoverMiddleY)
        ) {
          moveCard(dragIndex, hoverIndex)
          item.index = hoverIndex
        }
      }
    }
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'card',
    item: { id: nft.id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  React.useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current)
    }
  }, [drag])

  // Ensure the first drag attaches the right preview to the cursor
  React.useEffect(() => {
    if (ref.current) {
      preview(ref.current)
    }
  }, [preview])

  return (
    <div
      ref={isHidden ? undefined : ref}
      style={{
        ...containerStyle,
        opacity: isDragging ? 0.5 : isHidden ? 0.65 : 1
      }}
    >
      <img
        src="/reorder-icon.svg"
        alt="reorder"
        className="dark:invert"
        ref={isHidden ? undefined : dragRef}
        style={{
          ...iconStyle,
          opacity: isHidden ? 0 : 1,
          cursor: isHidden ? undefined : 'move'
        }}
      />
      <img
        src={nft.media.url}
        alt={nft.name}
        style={{ width: '100px', height: '100px', margin: '10px' }}
      />
      <div style={{ flexGrow: 1, margin: '10px' }}>
        <h2 style={titleStyle}>{nft.name}</h2>
        <p style={descriptionStyle}>{nft.description}</p>
        <p style={metaStyle}>
          <b>Collection:</b> {nft.collection.name}
        </p>
        <p style={metaStyle}>
          <b>Token ID:</b> {nft.tokenId}
        </p>
        <p style={metaStyle}>
          <b>Last Sale Price:</b>{' '}
          {nft.lastSalePrice?.amountUsd == null
            ? 'N/A'
            : `$${nft.lastSalePrice.amountUsd}`}
        </p>
      </div>
      <img
        src={isHidden ? '/show-icon.svg' : '/close-icon.svg'}
        alt={isHidden ? 'show' : 'hide'}
        className="dark:invert"
        style={iconStyle}
        onClick={toggleHide}
      />
    </div>
  )
}

const containerStyle = {
  backgroundColor: '#252525',
  borderRadius: '20px',
  padding: '10px',
  margin: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
}

const titleStyle = {
  textShadow: '2px 2px 2px rgba(0, 40, 219, 0.932)',
  fontWeight: 'bold',
  marginBottom: '5px'
}

const descriptionStyle = { fontStyle: 'italic', marginBottom: '10px' }

const metaStyle = { fontSize: '12px', opacity: 0.5 }

const iconStyle = {
  width: '24px',
  height: '24px',
  margin: '10px'
}
