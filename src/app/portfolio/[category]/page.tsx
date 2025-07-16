'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, X } from 'lucide-react'

interface ImageData {
	id: number
	src: string
	title: string
	alt: string
	description?: string
}

interface CategoryStats {
	totalPhotos: number
	totalViews: string
	avgRating: number
	completedProjects: number
}

interface CategoryData {
	title: string
	description: string
	heroImage: string
	stats: CategoryStats
	testimonial: {
		text: string
		author: string
		position: string
	}
	images: ImageData[]
	color: string
	accent: string
}

// Definicja kategorii i ich zdjęć z rozszerzonymi danymi
const categoryData = {
	uslugi: {
		title: 'Usługi',
		description: 'Profesjonalne sesje usługowe dla firm i przedsiębiorców',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/DSC06617.jpg',
		stats: { totalPhotos: 150, totalViews: '25k', avgRating: 4.9, completedProjects: 45 } as CategoryStats,
		testimonial: {
			text: 'Anna świetnie uchwycila charakter naszej firmy. Zdjęcia są profesjonalne i autentyczne.',
			author: 'Marcin Kowalski',
			position: 'CEO, TechStart',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/DSC06617.jpg',
				title: 'Salon fryzjerski',
				alt: 'Profesjonalne zdjęcie salonu fryzjerskiego',
				description: 'Wnętrze salonu fryzjerskiego',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/DSC06617.jpg',
				title: 'Zakład usługowy',
				alt: 'Zdjęcie zakładu usługowego',
				description: 'Profesjonalne podejście do usług',
			},
		] as ImageData[],
		color: '#3B82F6',
		accent: '#60A5FA',
	},
	eventy: {
		title: 'Eventy',
		description: 'Niezapomniane chwile z wydarzeń korporacyjnych i prywatnych',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC03139.jpg',
		stats: { totalPhotos: 180, totalViews: '35k', avgRating: 4.8, completedProjects: 32 } as CategoryStats,
		testimonial: {
			text: 'Anna doskonale uchwycila atmosferę naszego eventu. Każde zdjęcie opowiada historię.',
			author: 'Katarzyna Nowak',
			position: 'Event Manager, EventPro',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC03139.jpg',
				title: 'Konferencja biznesowa',
				alt: 'Zdjęcie konferencji biznesowej',
				description: 'Profesjonalna konferencja korporacyjna',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC03141.jpg',
				title: 'Wydarzenie firmowe',
				alt: 'Zdjęcie wydarzenia firmowego',
				description: 'Integracja zespołu podczas eventu',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC03142.jpg',
				title: 'Prezentacja produktu',
				alt: 'Zdjęcie prezentacji produktu',
				description: 'Prezentacja nowego produktu',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC03143.jpg',
				title: 'Networking',
				alt: 'Zdjęcie networkingu',
				description: 'Networking podczas wydarzenia',
			},
		] as ImageData[],
		color: '#10B981',
		accent: '#34D399',
	},
	motoryzacja: {
		title: 'Motoryzacja',
		description: 'Sesje samochodowe i motoryzacyjne',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01517.jpg',
		stats: { totalPhotos: 140, totalViews: '32k', avgRating: 4.8, completedProjects: 28 } as CategoryStats,
		testimonial: {
			text: 'Anna potrafi uchwycić dynamikę i elegancję samochodu w każdym ujęciu.',
			author: 'Piotr Kowalczyk',
			position: 'Dyrektor, AutoPremium',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01517.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01553.jpg',
				title: 'SUV terenowy',
				alt: 'Zdjęcie SUVa terenowego',
				description: 'Wytrzymały SUV terenowy',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01566.jpg',
				title: 'Kabriolet',
				alt: 'Zdjęcie kabrioletu',
				description: 'Elegancki kabriolet',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01571.jpg',
				title: 'Samochód sportowy',
				alt: 'Zdjęcie samochodu sportowego',
				description: 'Ekskluzywny samochód sportowy',
			},
		] as ImageData[],
		color: '#EF4444',
		accent: '#F87171',
	},
	studia: {
		title: 'Studia',
		description: 'Profesjonalne sesje studyjne',
		heroImage: '/IMG_7002.JPG',
		stats: { totalPhotos: 200, totalViews: '40k', avgRating: 4.9, completedProjects: 50 } as CategoryStats,
		testimonial: {
			text: 'Anna ma niezwykły talent do uchwycenia osobowości w każdym portrecie.',
			author: 'Magdalena Wiśniewska',
			position: 'Modelka',
		},
		images: [
			{
				id: 1,
				src: '/IMG_7002.JPG',
				title: 'Portret klasyczny',
				alt: 'Portret klasyczny w studio',
				description: 'Profesjonalny portret w studio',
			},
			{
				id: 2,
				src: '/ISIMG-826079.JPG',
				title: 'Fashion Editorial',
				alt: 'Zdjęcie fashion editorial',
				description: 'Kreatywna sesja fashion',
			},
			{
				id: 3,
				src: '/IMG_1454.JPG',
				title: 'Beauty Shot',
				alt: 'Beauty shot w studio',
				description: 'Profesjonalne zdjęcie beauty',
			},
			{
				id: 4,
				src: '/DSC09334.JPG',
				title: 'Dramatyczne światło',
				alt: 'Portret z dramatycznym światłem',
				description: 'Portret z wykorzystaniem dramatycznego światła',
			},
		] as ImageData[],
		color: '#8B5CF6',
		accent: '#A78BFA',
	},
	wesela: {
		title: 'Wesela',
		description: 'Magiczne chwile z najważniejszego dnia',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00913.jpg',
		stats: { totalPhotos: 220, totalViews: '45k', avgRating: 5.0, completedProjects: 42 } as CategoryStats,
		testimonial: {
			text: 'Anna uchwyciła najpiękniejsze momenty naszego ślubu. Zdjęcia są niesamowite!',
			author: 'Karolina i Michał',
			position: 'Szczęśliwa Para Młoda',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00913.jpg',
				title: 'Pierwszy taniec',
				alt: 'Pierwszy taniec pary młodej',
				description: 'Romantyczny pierwszy taniec',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00913.jpg',
				title: 'Ceremonia ślubna',
				alt: 'Ceremonia ślubna',
				description: 'Wzruszający moment przysięgi',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00913.jpg',
				title: 'Sesja plenerowa',
				alt: 'Sesja plenerowa pary młodej',
				description: 'Romantyczna sesja w plenerze',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00913.jpg',
				title: 'Detale ślubne',
				alt: 'Detale ślubne',
				description: 'Piękne detale ślubne',
			},
		] as ImageData[],
		color: '#EC4899',
		accent: '#F472B6',
	},
}

export default function CategoryPage({ params }: { params: { category: string } }) {
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
	const categoryDataMap = categoryData as Record<string, CategoryData>
	const currentCategory = categoryDataMap[params.category]

	// Funkcja do otwierania lightboxa
	const openLightbox = (image: ImageData) => {
		setSelectedImage(image)
		document.body.style.overflow = 'hidden'
	}

	// Funkcja do zamykania lightboxa
	const closeLightbox = () => {
		setSelectedImage(null)
		document.body.style.overflow = 'unset'
	}

	// Sprawdzenie czy kategoria istnieje
	if (!currentCategory) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-black text-white">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Kategoria nie istnieje</h1>
					<Link href="/portfolio" className="text-blue-400 hover:underline">
						Powrót do portfolio
					</Link>
				</div>
			</div>
		)
	}

	return (
		<main
			className="min-h-screen text-white relative overflow-hidden"
			style={{
				background: 'linear-gradient(325deg, #60a5fa -10%, #111 40%, #000 100%)',
			}}>
			<Navigation />

			{/* Hero section z breadcrumbs */}
			<div className="relative pt-20 pb-32">
				<div className="container mx-auto px-4 relative z-10">
					{/* Breadcrumbs */}
					<div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
						<Link href="/" className="hover:text-white transition-colors">
							Strona główna
						</Link>
						<span>/</span>
						<Link href="/portfolio" className="hover:text-white transition-colors">
							Portfolio
						</Link>
						<span>/</span>
						<span className="text-white">{currentCategory.title}</span>
					</div>

					{/* Przycisk powrotu */}
					<Link
						href="/portfolio"
						className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8">
						<ArrowLeft size={20} />
						Powrót do portfolio
					</Link>

					{/* Tytuł kategorii */}
					<div className="max-w-4xl">
						<h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							{currentCategory.title}
						</h1>
						<p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">{currentCategory.description}</p>

						{/* Statystyki */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							<div className="text-center">
								<div className="text-3xl font-bold" style={{ color: currentCategory.color }}>
									{currentCategory.stats.totalPhotos}
								</div>
								<div className="text-sm text-gray-400">Zdjęć</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold" style={{ color: currentCategory.color }}>
									{currentCategory.stats.totalViews}
								</div>
								<div className="text-sm text-gray-400">Wyświetleń</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold" style={{ color: currentCategory.color }}>
									{currentCategory.stats.avgRating}
								</div>
								<div className="text-sm text-gray-400">Ocena</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold" style={{ color: currentCategory.color }}>
									{currentCategory.stats.completedProjects}
								</div>
								<div className="text-sm text-gray-400">Projektów</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Sekcja portfolio */}
			<div className="py-20">
				<div className="container mx-auto px-4">
					{/* Grid zdjęć */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{currentCategory.images.map((image, index) => (
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
						<div
							className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
							onClick={closeLightbox}>
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
				</div>
			</div>

			{/* Opinia klienta */}
			<div className="py-20 relative">
				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<p className="text-2xl md:text-3xl italic mb-8 text-stone-100">{currentCategory.testimonial.text}</p>
						<p className="font-bold text-xl">{currentCategory.testimonial.author}</p>
						<p className="text-gray-300">{currentCategory.testimonial.position}</p>
					</div>
				</div>
			</div>

			{/* Sekcja CTA */}
			<div className="py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">Zainteresowany współpracą?</h2>
					<p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
						Skontaktuj się ze mną, aby omówić szczegóły Twojego wydarzenia
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						<Link
							href="/contact"
							className="px-8 py-4 btn-primary text-lg font-medium rounded-lg hover:bg-blue-500 transition-all">
							Umów konsultację
						</Link>
						<Link
							href="/portfolio"
							className="px-8 py-4 bg-transparent border border-white text-white text-lg rounded-lg hover:bg-white/10 transition-all">
							Wróć do portfolio
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
