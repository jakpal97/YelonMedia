'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

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
				description: 'Sesja wizerunkowa dla salonu fryzjerskiego',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/DSC06714.jpg',
				title: 'Usługi fryzjerskie',
				alt: 'Zdjęcie usług fryzjerskich',
				description: 'Prezentacja usług fryzjerskich',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Tatua%C5%BC/DSC05571.jpg',
				title: 'Studio tatuażu',
				alt: 'Profesjonalne zdjęcie studia tatuażu',
				description: 'Sesja wizerunkowa dla studia tatuażu',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Tatua%C5%BC/DSC05573.jpg',
				title: 'Proces tatuowania',
				alt: 'Zdjęcie procesu tatuowania',
				description: 'Dokumentacja procesu tatuowania',
			},
			{
				id: 5,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Tatua%C5%BC/DSC05576.jpg',
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
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/_DSC3096.jpg',
				title: 'Koncert na żywo',
				alt: 'Zdjęcie z koncertu',
				description: 'Energetyczny koncert rockowy',
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09262.jpg',
				title: 'Impreza firmowa',
				alt: 'Zdjęcie z imprezy firmowej',
				description: 'Elegancka impreza integracyjna',
			},
			{
				id: 3,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09463.jpg',
				title: 'Festiwal muzyczny',
				alt: 'Zdjęcie z festiwalu',
				description: 'Letni festiwal muzyczny',
			},
			{
				id: 4,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09529.jpg',
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
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC1960.jpg',
				title: 'Signature dish',
				alt: 'Zdjęcie autorskiego dania',
				description: 'Autorskie danie szefa kuchni',
				
			},
			{
				id: 2,
				src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2607.jpg',
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

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
	const [currentCategory, setCurrentCategory] = useState<CategoryData | null>(null)
	const [loading, setLoading] = useState(true)
	const [category, setCategory] = useState<string | null>(null)

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
			<div
				className="relative h-[70vh] overflow-hidden"
				style={{
					backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${currentCategory.heroImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}>
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
						{displayedImages.map((image: ImageData) => (
							<div
								key={image.id}
								className="relative overflow-hidden rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300"
								style={{ borderColor: 'transparent', borderWidth: '2px' }}>
								<div className="aspect-w-3 aspect-h-2 relative h-[250px]">
									<Image
										src={image.src}
										alt={image.alt}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
										<h3 className="text-xl font-bold">{image.title}</h3>
										<p className="text-gray-300">{image.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Opinia klienta */}
			<div className="bg-gray-900 py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-xl italic mb-4">&ldquo;{currentCategory.testimonial.text}&rdquo;</p>
						<p className="font-bold">{currentCategory.testimonial.author}</p>
						<p className="text-gray-400">{currentCategory.testimonial.position}</p>
					</div>
				</div>
			</div>

			{/* Sekcja CTA */}
			<div className="bg-gradient-to-b from-gray-900 to-black py-16">
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
		</main>
	)
}
