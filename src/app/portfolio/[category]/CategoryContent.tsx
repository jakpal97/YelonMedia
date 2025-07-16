'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageData {
	id: number
	src: string
	title: string
	alt: string
	description?: string
}

interface CategoryContentProps {
	images: ImageData[]
}

export default function CategoryContent({ images }: CategoryContentProps) {
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

	// Funkcja do otwierania powiększonego zdjęcia
	const openLightbox = (image: ImageData) => {
		setSelectedImage(image)
		document.body.style.overflow = 'hidden'
	}

	// Funkcja do zamykania lightboxa
	const closeLightbox = () => {
		setSelectedImage(null)
		document.body.style.overflow = 'unset'
	}

	return (
		<>
			{/* Grid zdjęć */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{images.map((image, index) => (
					<div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-900">
						<div className="cursor-pointer h-full" onClick={() => openLightbox(image)}>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-110"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
								priority={index < 4}
							/>

							{/* Gradient na dole zdjęcia - widoczny tylko po najechaniu */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
									<h3 className="text-3xl font-bold mb-1">{image.title}</h3>
									<p className="text-gray-400 text-sm">{image.description}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Lightbox do powiększania zdjęć */}
			{selectedImage && (
				<div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
					<button
						className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors"
						onClick={e => {
							e.stopPropagation()
							closeLightbox()
						}}>
						<X size={32} />
					</button>
					<div className="relative max-w-5xl max-h-[80vh] w-full h-full" onClick={e => e.stopPropagation()}>
						<Image
							src={selectedImage.src}
							alt={selectedImage.alt}
							fill
							className="object-contain"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
						/>
						<div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
							<h3 className="text-2xl font-bold">{selectedImage.title}</h3>
							<p className="text-gray-300">{selectedImage.description}</p>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
