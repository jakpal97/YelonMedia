'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface CardData {
	id: number
	img: string
}

interface CardRotateProps {
	children: React.ReactNode
	onSendToBack: () => void
	sensitivity: number
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const rotateX = useTransform(y, [-100, 100], [60, -60])
	const rotateY = useTransform(x, [-100, 100], [-60, 60])

	function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
		if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
			onSendToBack()
		} else {
			x.set(0)
			y.set(0)
		}
	}

	return (
		<motion.div
			className="absolute cursor-grab"
			style={{ x, y, rotateX, rotateY }}
			drag
			dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
			dragElastic={0.6}
			whileTap={{ cursor: 'grabbing' }}
			onDragEnd={handleDragEnd}>
			{children}
		</motion.div>
	)
}

interface StackProps {
	randomRotation?: boolean
	sensitivity?: number
	cardDimensions?: { width: number; height: number }
	cardsData?: CardData[]
	animationConfig?: { stiffness: number; damping: number }
	sendToBackOnClick?: boolean
}

export default function Stack({
	randomRotation = false,
	sensitivity = 200,
	cardDimensions = { width: 208, height: 208 },
	cardsData = [],
	animationConfig = { stiffness: 260, damping: 20 },
	sendToBackOnClick = false,
}: StackProps) {
	const [cards, setCards] = useState<CardData[]>(
		cardsData.length
			? cardsData
			: [
					{ id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
					{ id: 2, img: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Modowe/DSC07926.jpg' },
					{ id: 3, img: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01517.jpg' },
					{ id: 4, img: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01517.jpg' },
			  ]
	)

	const [randomRotations, setRandomRotations] = useState<number[]>([])
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
		if (randomRotation) {
			setRandomRotations(cards.map(() => Math.random() * 10 - 5))
		}
	}, [randomRotation, cards])

	const sendToBack = (id: number) => {
		setCards(prev => {
			const newCards = [...prev]
			const index = newCards.findIndex(card => card.id === id)
			const [card] = newCards.splice(index, 1)
			newCards.unshift(card)
			return newCards
		})

		// Aktualizuj randomRotations po zmianie kolejności
		if (randomRotation && randomRotations.length > 0) {
			setRandomRotations(prev => {
				const newRotations = [...prev]
				const cardIndex = cards.findIndex(card => card.id === id)
				if (cardIndex !== -1) {
					const [rotation] = newRotations.splice(cardIndex, 1)
					newRotations.unshift(rotation)
				}
				return newRotations
			})
		}
	}

	return (
		<div
			className="relative"
			style={{
				width: cardDimensions.width,
				height: cardDimensions.height,
				perspective: 600,
			}}>
			{cards.map((card, index) => {
				const randomRotate =
					randomRotation && isClient && randomRotations[index] !== undefined ? randomRotations[index] : 0

				return (
					<CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
						<motion.div
							className="rounded-2xl overflow-hidden bg-white shadow-xl"
							onClick={() => sendToBackOnClick && sendToBack(card.id)}
							animate={{
								rotateZ: (cards.length - index - 1) * 4 + randomRotate,
								scale: 1 + index * 0.06 - cards.length * 0.06,
								transformOrigin: '90% 90%',
							}}
							initial={false}
							transition={{
								type: 'spring',
								stiffness: animationConfig.stiffness,
								damping: animationConfig.damping,
							}}
							style={{
								width: cardDimensions.width,
								height: cardDimensions.height + 60, // Dodajemy 60px na biały pasek
							}}>
							{/* Zdjęcie z białą ramką */}
							<div className="w-full bg-white p-3" style={{ height: cardDimensions.height }}>
								<div className="w-full h-full overflow-hidden relative">
									<Image
										src={card.img}
										alt={`card-${card.id}`}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
										className="object-cover pointer-events-none"
									/>
								</div>
							</div>
							{/* Biały pasek na dole jak w Polaroid/Instax */}
							<div className="w-full h-[60px] bg-white flex items-center justify-center">
								<div className="w-4/5 h-px bg-gray-100"></div>
							</div>
						</motion.div>
					</CardRotate>
				)
			})}
		</div>
	)
}
