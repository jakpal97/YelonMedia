'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageData {
	id: number
	src: string
	title: string
	alt: string
	description?: string
	tags?: string[]
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
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/3.jpg',
		stats: { totalPhotos: 150, totalViews: '25k', avgRating: 4.9, completedProjects: 45 } as CategoryStats,
		testimonial: {
			text: 'Anna świetnie uchwycila charakter naszej firmy. Zdjęcia są profesjonalne i autentyczne.',
			author: 'Marcin Kowalski',
			position: 'CEO, TechStart',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/1.jpg',
				title: 'Salon fryzjerski',
				alt: 'Profesjonalne zdjęcie salonu fryzjerskiego',
				description: 'Sesja wizerunkowa dla salonu fryzjerskiego',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/2.jpg',
				title: 'Usługi fryzjerskie',
				alt: 'Zdjęcie usług fryzjerskich',
				description: 'Prezentacja usług fryzjerskich',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/1.jpg',
				title: 'Studio tatuażu',
				alt: 'Profesjonalne zdjęcie studia tatuażu',
				description: 'Sesja wizerunkowa dla studia tatuażu',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/2.jpg',
				title: 'Proces tatuowania',
				alt: 'Zdjęcie procesu tatuowania',
				description: 'Dokumentacja procesu tatuowania',
			},
			{
				id: 5,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/3.jpg',
				title: 'Sztuka tatuażu',
				alt: 'Zdjęcie sztuki tatuażu',
				description: 'Artystyczne ujęcie tatuażu',
			},
			{
				id: 6,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/4.jpg',
				title: 'Sztuka tatuażu',
				alt: 'Zdjęcie sztuki tatuażu',
				description: 'Artystyczne ujęcie tatuażu',
			},
			{
				id: 7,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/5.jpg',
				title: 'Sztuka tatuażu',
				alt: 'Zdjęcie sztuki tatuażu',
				description: 'Artystyczne ujęcie tatuażu',
			},
			{
				id: 8,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/6.jpg',
				title: 'Sztuka tatuażu',
				alt: 'Zdjęcie sztuki tatuażu',
				description: 'Artystyczne ujęcie tatuażu',
			},
			{
				id: 9,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/7.jpg',
				title: 'Sztuka tatuażu',
				alt: 'Zdjęcie sztuki tatuażu',
				description: 'Artystyczne ujęcie tatuażu',
			},
			{
				id: 10,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/8.jpg',
				title: 'Sztuka tatuażu',
				alt: 'Zdjęcie sztuki tatuażu',
				description: 'Artystyczne ujęcie tatuażu',
			},
		] as ImageData[],
		color: '#4F46E5',
		accent: '#818CF8',
	},
	eventy: {
		title: 'Eventy',
		description: 'Fotografia wydarzeń i imprez',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09463.jpg',
		stats: { totalPhotos: 120, totalViews: '30k', avgRating: 4.8, completedProjects: 35 } as CategoryStats,
		testimonial: {
			text: 'Zdjęcia Anny perfekcyjnie oddają atmosferę naszego wydarzenia. Polecam!',
			author: 'Katarzyna Nowak',
			position: 'Event Manager, EventPro',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/2.jpg',
				title: 'Koncert na żywo',
				alt: 'Zdjęcie z koncertu',
				description: 'Energetyczny koncert rockowy',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/1.jpg',
				title: 'Impreza firmowa',
				alt: 'Zdjęcie z imprezy firmowej',
				description: 'Elegancka impreza integracyjna',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/3.jpg',
				title: 'Festiwal muzyczny',
				alt: 'Zdjęcie z festiwalu',
				description: 'Letni festiwal muzyczny',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/4.jpg',
				title: 'Konferencja branżowa',
				alt: 'Zdjęcie z konferencji',
				description: 'Międzynarodowa konferencja biznesowa',
			},
			{
				id: 5,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/5.jpg',
				title: 'Konferencja branżowa',
				alt: 'Zdjęcie z konferencji',
				description: 'Międzynarodowa konferencja biznesowa',
			},
			{
				id: 6,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/6.jpg',
				title: 'Konferencja branżowa',
				alt: 'Zdjęcie z konferencji',
				description: 'Międzynarodowa konferencja biznesowa',
			},
			{
				id: 7,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/7.jpg',
				title: 'Konferencja branżowa',
				alt: 'Zdjęcie z konferencji',
				description: 'Międzynarodowa konferencja biznesowa',
			},
		] as ImageData[],
		color: '#10B981',
		accent: '#34D399',
	},
	gastro: {
		title: 'Gastro',
		description: 'Fotografia kulinarna i restauracyjna',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2877.jpg',
		stats: { totalPhotos: 180, totalViews: '35k', avgRating: 4.9, completedProjects: 38 } as CategoryStats,
		testimonial: {
			text: 'Zdjęcia Anny sprawiają, że nasze dania wyglądają jeszcze bardziej apetycznie!',
			author: 'Chef Marco Rossi',
			position: 'Szef kuchni, Bella Vista',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/1.jpg',
				title: 'Signature dish',
				alt: 'Zdjęcie autorskiego dania',
				description: 'Autorskie danie szefa kuchni',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/2.jpg',
				title: 'Deser artystyczny',
				alt: 'Zdjęcie deseru',
				description: 'Artystycznie podany deser',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2855.jpg',
				title: 'Śniadanie premium',
				alt: 'Zdjęcie śniadania',
				description: 'Luksusowe śniadanie dla dwojga',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2877.jpg',
				title: 'Koktajle sezonowe',
				alt: 'Zdjęcie koktajli',
				description: 'Sezonowe koktajle barowe',
			},
			{
				id: 5,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2917.jpg',
				title: 'Dania główne',
				alt: 'Zdjęcie dania głównego',
				description: 'Wykwintne danie główne',
			},
			{
				id: 6,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2918.jpg',
				title: 'Menu degustacyjne',
				alt: 'Zdjęcie menu degustacyjnego',
				description: 'Ekskluzywne menu degustacyjne',
			},
			{
				id: 7,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC8547.jpg',
				title: 'Bufet restauracyjny',
				alt: 'Zdjęcie bufetu',
				description: 'Bogaty bufet restauracyjny',
			},
		] as ImageData[],
		color: '#F59E0B',
		accent: '#FBBF24',
	},
	motoryzacja: {
		title: 'Motoryzacja',
		description: 'Sesje samochodowe i motoryzacyjne',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/11.jpg',
		stats: { totalPhotos: 140, totalViews: '32k', avgRating: 4.8, completedProjects: 28 } as CategoryStats,
		testimonial: {
			text: 'Anna potrafi uchwycić dynamikę i elegancję samochodu w każdym ujęciu.',
			author: 'Piotr Kowalczyk',
			position: 'Dyrektor, AutoPremium',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/1.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/2.jpg',
				title: 'SUV terenowy',
				alt: 'Zdjęcie SUVa terenowego',
				description: 'Wytrzymały SUV terenowy',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/3.jpg',
				title: 'Kabriolet',
				alt: 'Zdjęcie kabrioletu',
				description: 'Elegancki kabriolet',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/4.jpg',
				title: 'Samochód sportowy',
				alt: 'Zdjęcie samochodu sportowego',
				description: 'Ekskluzywny samochód sportowy',
			},
			{
				id: 5,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/5.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 6,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/7.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 7,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/8.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 8,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/9.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 9,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/10.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 10,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/11.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
			{
				id: 11,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01808.jpg',
				title: 'Sportowy sedan',
				alt: 'Zdjęcie sportowego sedana',
				description: 'Luksusowy sportowy sedan',
			},
		] as ImageData[],
		color: '#EF4444',
		accent: '#F87171',
	},
	moda: {
		title: 'Moda',
		description: 'Profesjonalne sesje modowe',
		heroImage: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Modowe/DSC08100.jpg',
		stats: { totalPhotos: 200, totalViews: '40k', avgRating: 4.9, completedProjects: 50 } as CategoryStats,
		testimonial: {
			text: 'Anna ma niezwykły talent do uchwycenia osobowości w każdym portrecie.',
			author: 'Magdalena Wiśniewska',
			position: 'Modelka',
		},
		images: [
			{
				id: 1,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Modowe/1.jpg',
				title: 'Portret klasyczny',
				alt: 'Portret klasyczny w studio',
				description: 'Profesjonalny portret w studio',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Modowe/2.jpg',
				title: 'Fashion Editorial',
				alt: 'Zdjęcie fashion editorial',
				description: 'Kreatywna sesja fashion',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Modowe/3.jpg',
				title: 'Beauty Shot',
				alt: 'Beauty shot w studio',
				description: 'Profesjonalne zdjęcie beauty',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Modowe/4.jpg',
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
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/1.jpg',
				title: 'Pierwszy taniec',
				alt: 'Pierwszy taniec pary młodej',
				description: 'Romantyczny pierwszy taniec',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/2.jpg',
				title: 'Ceremonia ślubna',
				alt: 'Ceremonia ślubna',
				description: 'Wzruszający moment przysięgi',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/3.jpg',
				title: 'Sesja plenerowa',
				alt: 'Sesja plenerowa pary młodej',
				description: 'Romantyczna sesja w plenerze',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/4.jpg',
				title: 'Detale ślubne',
				alt: 'Detale ślubne',
				description: 'Piękne detale ślubne',
			},
		] as ImageData[],
		color: '#EC4899',
		accent: '#F472B6',
	},
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
	const [currentCategory, setCurrentCategory] = useState<CategoryData | null>(null)
	const [loading, setLoading] = useState(true)
	const [category, setCategory] = useState<string | null>(null)
	// Stany do zarządzania lightbox
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [imageLoading, setImageLoading] = useState(false)

	// Obsługa asynchronicznych params w komponencie klientowym
	useEffect(() => {
		const resolveParams = async () => {
			const resolvedParams = await params
			setCategory(resolvedParams.category)
		}
		resolveParams()
	}, [params])

	// Używamy useEffect, aby uniknąć błędów hydratacji
	useEffect(() => {
		if (category) {
			const categoryDataMap = categoryData as Record<string, CategoryData>
			setCurrentCategory(categoryDataMap[category])
			setLoading(false)
		}
	}, [category])

	// Funkcje obsługi lightbox
	const openLightbox = (index: number) => {
		setCurrentImageIndex(index)
		setImageLoading(true)
		setLightboxOpen(true)
	}

	const closeLightbox = () => {
		setLightboxOpen(false)
		setImageLoading(false)
	}

	const nextImage = () => {
		if (currentCategory) {
			setImageLoading(true)
			setCurrentImageIndex(prev => (prev + 1) % currentCategory.images.length)
		}
	}

	const previousImage = () => {
		if (currentCategory) {
			setImageLoading(true)
			setCurrentImageIndex(prev => (prev - 1 + currentCategory.images.length) % currentCategory.images.length)
		}
	}

	// Obsługa klawiatury - zoptymalizowana
	useEffect(() => {
		if (!lightboxOpen) return

		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'Escape':
					closeLightbox()
					break
				case 'ArrowRight':
					nextImage()
					break
				case 'ArrowLeft':
					previousImage()
					break
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [lightboxOpen, currentCategory])

	// Blokowanie scrollowania gdy lightbox jest otwarty
	useEffect(() => {
		if (lightboxOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [lightboxOpen])

	// Preload sąsiednich obrazów dla szybszej nawigacji
	useEffect(() => {
		if (!lightboxOpen || !currentCategory) return

		const preloadImage = (src: string) => {
			const img = document.createElement('img')
			img.src = src
		}

		// Preload poprzednie i następne zdjęcie
		const images = currentCategory.images
		const nextIndex = (currentImageIndex + 1) % images.length
		const prevIndex = (currentImageIndex - 1 + images.length) % images.length

		preloadImage(images[nextIndex].src)
		preloadImage(images[prevIndex].src)
	}, [lightboxOpen, currentImageIndex, currentCategory])

	// Pokazujemy loader podczas ładowania
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-black text-white">
				<div className="text-center">
					<p className="text-xl">Ładowanie...</p>
				</div>
			</div>
		)
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

	// Usuwam filtrowanie - pokazujemy wszystkie obrazy
	const displayedImages = currentCategory.images

	return (
		<main className="min-h-screen bg-black text-white ">
			<Navigation />

			{/* Hero section z przyciskiem powrotu */}
			<div className="relative h-[70vh] overflow-hidden">
				{/* Optimized hero image */}
				<Image
					src={currentCategory.heroImage}
					alt={`Hero image - ${currentCategory.title}`}
					fill
					priority
					fetchPriority="high"
					sizes="100vw"
					className="object-cover"
				/>
				{/* Gradient overlay */}
				<div
					className="absolute inset-0"
					style={{
						background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
					}}
				/>
				{/* Przycisk powrotu do portfolio */}
				<Link
					href="/portfolio"
					className="absolute top-6 left-6 z-40 text-white p-3 rounded-full flex items-center hover:text-accent transition-colors">
					<ArrowLeft size={20} className="mr-2" />
					<span>Powrót do Portfolio</span>
				</Link>

				<div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
					<h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: currentCategory.accent }}>
						{currentCategory.title}
					</h1>
					<p className="text-lg md:text-2xl max-w-2xl">{currentCategory.description}</p>
				</div>
			</div>

			{/* Galeria zdjęć */}
			<div className="bg-black py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{displayedImages.map((image: ImageData, index: number) => (
							<div
								key={image.id}
								className="relative overflow-hidden rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300 cursor-pointer"
								style={{ borderColor: 'transparent', borderWidth: '2px' }}
								onClick={() => openLightbox(index)}>
								<div className="aspect-w-3 aspect-h-2 relative h-[250px]">
									<Image
										src={image.src}
										alt={image.alt}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 500px"
										loading="lazy"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Lightbox Modal */}
			{lightboxOpen && currentCategory && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
					{/* Przycisk zamknięcia */}
					<button
						onClick={closeLightbox}
						className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors">
						<X size={32} />
					</button>

					{/* Przycisk poprzednie zdjęcie */}
					<button
						onClick={previousImage}
						className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors">
						<ChevronLeft size={48} />
					</button>

					{/* Przycisk następne zdjęcie */}
					<button
						onClick={nextImage}
						className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors">
						<ChevronRight size={48} />
					</button>

					{/* Główne zdjęcie */}
					<div className="relative max-w-7xl max-h-[90vh] mx-4">
						{imageLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-black/50">
								<div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							</div>
						)}
						<Image
							src={currentCategory.images[currentImageIndex].src}
							alt={currentCategory.images[currentImageIndex].alt}
							width={1200}
							height={800}
							className="object-contain max-h-[80vh] w-auto"
							sizes="(max-width: 768px) 95vw, (max-width: 1200px) 90vw, 1200px"
							priority
							onLoad={() => setImageLoading(false)}
							onLoadStart={() => setImageLoading(true)}
						/>
					</div>

					{/* Overlay do zamykania */}
					<div className="absolute inset-0 -z-10" onClick={closeLightbox}></div>
				</div>
			)}

			{/* Wspólne tło dla opinii i CTA */}
			<div
				style={{
					background: 'linear-gradient(325deg, #60a5fa -10%, #111 40%, #000 100%)',
				}}>
				{/* Opinia klienta
				<div className="py-12">
					<div className="container mx-auto px-4">
						<div className="max-w-3xl mx-auto text-center">
							<p className="text-xl italic mb-4">&ldquo;{currentCategory.testimonial.text}&rdquo;</p>
							<p className="font-bold">{currentCategory.testimonial.author}</p>
							<p className="text-gray-400">{currentCategory.testimonial.position}</p>
						</div>
					</div>
				</div> */}

				{/* Sekcja CTA */}
				<div className="py-16">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Zainteresowała Cię ta kategoria?</h2>
						<p className="text-lg text-gray-300 mb-8">
							Skontaktuj się ze mną, aby omówić szczegóły Twojego projektu w kategorii{' '}
							{currentCategory.title.toLowerCase()}
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link
								href="/contact"
								className="px-6 py-3 text-black font-bold rounded-lg hover:bg-opacity-80 transition-all"
								style={{ backgroundColor: currentCategory.accent }}>
								Umów konsultację
							</Link>
							<Link
								href="/portfolio"
								className="px-6 py-3 bg-transparent border border-white text-white rounded-lg hover:bg-white/10 transition-all">
								Inne kategorie
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
