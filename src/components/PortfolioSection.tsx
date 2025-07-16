'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import TrueFocus from '@/components/TrueFocus'

const portfolioImages = [
	// Kategoria Eventy
	{
		id: 'event-1',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/_DSC3096.jpg',
		title: 'Event Photography',
		category: 'Eventy',
	},
	{
		id: 'event-2',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09262.jpg',
		title: 'Fotografia Eventowa',
		category: 'Eventy',
	},
	{
		id: 'event-3',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09463.jpg',
		title: 'Wydarzenia Specjalne',
		category: 'Eventy',
	},
	{
		id: 'event-4',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09529.jpg',
		title: 'Imprezy Firmowe',
		category: 'Eventy',
	},
	// Kategoria Gastro
	{
		id: 'gastro-1',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC1960.jpg',
		title: 'Fotografia Kulinarna',
		category: 'Gastro',
	},
	{
		id: 'gastro-2',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2607.jpg',
		title: 'Dania Główne',
		category: 'Gastro',
	},
	{
		id: 'gastro-3',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2855.jpg',
		title: 'Desery',
		category: 'Gastro',
	},
	{
		id: 'gastro-4',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2877.jpg',
		title: 'Kompozycje Kulinarne',
		category: 'Gastro',
	},
	{
		id: 'gastro-5',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2917.jpg',
		title: 'Menu Restauracyjne',
		category: 'Gastro',
	},
	{
		id: 'gastro-6',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2918.jpg',
		title: 'Stylizacja Potraw',
		category: 'Gastro',
	},
	{
		id: 'gastro-7',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC8547.jpg',
		title: 'Fotografia Restauracyjna',
		category: 'Gastro',
	},
	// Kategoria Motoryzacja
	{
		id: 'moto-1',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01517.jpg',
		title: 'Detale Samochodowe',
		category: 'Motoryzacja',
	},
	{
		id: 'moto-2',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01521.jpg',
		title: 'Wnętrze Samochodu',
		category: 'Motoryzacja',
	},
	{
		id: 'moto-3',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC04920.jpg',
		title: 'Dynamiczne Ujęcia',
		category: 'Motoryzacja',
	},
	{
		id: 'moto-4',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC05284.jpg',
		title: 'Klasyczne Auta',
		category: 'Motoryzacja',
	},
	{
		id: 'moto-5',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC05339.jpg',
		title: 'Nocne Sesje',
		category: 'Motoryzacja',
	},
	{
		id: 'moto-6',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/przod.jpg',
		title: 'Przód Samochodu',
		category: 'Motoryzacja',
	},
	// Kategoria Wesela
	{
		id: 'wesele-1',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/_DSC3843.jpg',
		title: 'Ceremonia Ślubna',
		category: 'Wesela',
	},
	{
		id: 'wesele-2',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00913.jpg',
		title: 'Momenty Szczęścia',
		category: 'Wesela',
	},
	{
		id: 'wesele-3',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00928-2.jpg',
		title: 'Pierwszy Taniec',
		category: 'Wesela',
	},
	{
		id: 'wesele-4',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC01395.jpg',
		title: 'Przyjęcie Weselne',
		category: 'Wesela',
	},
	// Kategoria Usługi
	{
		id: 'uslugi-1',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/DSC06617.jpg',
		title: 'Salon Fryzjerski',
		category: 'Usługi',
	},
	{
		id: 'uslugi-2',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/DSC06714.jpg',
		title: 'Usługi Fryzjerskie',
		category: 'Usługi',
	},
	{
		id: 'uslugi-3',
		src: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Tatua%C5%BC/DSC05571.jpg',
		title: 'Studio Tatuażu',
		category: 'Usługi',
	},
	// Kategoria Studia
	{
		id: 'studio-1',
		src: '/IMG_7002.JPG',
		title: 'Portret Klasyczny',
		category: 'Studia',
	},
	{
		id: 'studio-2',
		src: '/ISIMG-826079.JPG',
		title: 'Fashion Editorial',
		category: 'Studia',
	},
	{
		id: 'studio-3',
		src: '/IMG_1454.JPG',
		title: 'Beauty Shot',
		category: 'Studia',
	},
	{
		id: 'studio-4',
		src: '/DSC09334.JPG',
		title: 'Dramatyczne Światło',
		category: 'Studia',
	},
]

const PortfolioSection = () => {
	const [currentCategory, setCurrentCategory] = useState('Wszystkie')
	const [autoPlaySpeed, setAutoPlaySpeed] = useState(3000)
	const [currentPage, setCurrentPage] = useState(0)
	const imagesPerPage = 12

	// Kategorie do filtrowania
	const categories = ['Wszystkie', 'Usługi', 'Eventy', 'Gastro', 'Motoryzacja', 'Wesela', 'Studia']

	// Filtrowanie zdjęć według kategorii
	const filteredImages =
		currentCategory === 'Wszystkie' ? portfolioImages : portfolioImages.filter(img => img.category === currentCategory)

	// Paginacja zdjęć
	const paginatedImages = filteredImages.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage)

	// Resetuj stronę przy zmianie kategorii
	useEffect(() => {
		setCurrentPage(0)
	}, [currentCategory])

	return (
		<section className="pt-24 pb-16 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center mb-16">
					<TrueFocus
						sentence="Moje Portfolio"
						manualMode={false}
						blurAmount={5}
						borderColor="#60a5fa"
						animationDuration={2}
						pauseBetweenAnimations={1}
					/>
					<p
						className="section-subtitle text-xl md:text-2xl max-w-4xl mx-auto font-bold mt-10"
						style={{ fontFamily: 'Courier Prime, monospace' }}>
						Poniżej znajdziesz moje prace - każda z nich opowiada unikalną historię
					</p>

					{/* Filtry kategorii */}
					<div className="flex flex-wrap justify-center gap-3 mt-12 mb-8">
						{categories.map(category => (
							<button
								key={category}
								onClick={() => setCurrentCategory(category)}
								className={`px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
									currentCategory === category
										? 'bg-accent text-black shadow-lg transform scale-105'
										: 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
								}`}>
								{category}
							</button>
						))}
					</div>

					{/* Kontrolki prędkości */}
					<div className="flex justify-center gap-4 mb-8">
						<span className="text-stone-400 text-base font-medium">Prędkość przewijania:</span>
						{[
							{ speed: 5000, label: 'Wolno' },
							{ speed: 3000, label: 'Normalnie' },
							{ speed: 1500, label: 'Szybko' },
						].map(({ speed, label }) => (
							<button
								key={speed}
								onClick={() => setAutoPlaySpeed(speed)}
								className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
									autoPlaySpeed === speed
										? 'bg-accent/20 text-accent border border-accent/30'
										: 'bg-stone-800 text-stone-400 hover:bg-stone-700'
								}`}>
								{label}
							</button>
						))}
					</div>
				</div>

				{/* Wskaźnik aktualnej kategorii i liczby zdjęć */}
				<div className="text-center mb-6">
					<span className="inline-block px-4 py-2 bg-stone-800/50 rounded-full text-stone-300 text-sm">
						{currentCategory} • {filteredImages.length}{' '}
						{filteredImages.length === 1 ? 'zdjęcie' : filteredImages.length < 5 ? 'zdjęcia' : 'zdjęć'}
					</span>
				</div>

				{/* Siatka zdjęć */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{paginatedImages.length > 0 ? (
						paginatedImages.map(image => (
							<div
								key={image.id}
								className="group relative overflow-hidden rounded-2xl bg-stone-800 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer h-[300px]">
								<div className="relative h-full">
									{image.src.includes('yelonmedia.s3') ? (
										<Image
											src={image.src}
											alt={image.title}
											fill
											className="object-cover transition-all duration-700 group-hover:scale-110"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									) : (
										<Image
											src={image.src}
											alt={image.title}
											fill
											className="object-cover transition-all duration-700 group-hover:scale-110"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									)}
								</div>

								{/* Gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
									<div className="absolute bottom-6 left-6 text-white">
										<h3 className="text-xl font-bold mb-1">{image.title}</h3>
										<span className="text-sm font-medium opacity-80">{image.category}</span>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-full text-center py-20">
							<p className="text-stone-400 text-lg">Brak zdjęć w tej kategorii</p>
						</div>
					)}
				</div>

				{/* Paginacja */}
				{filteredImages.length > imagesPerPage && (
					<div className="flex justify-center mt-12 space-x-3">
						{Array.from({ length: Math.ceil(filteredImages.length / imagesPerPage) }).map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentPage(index)}
								className={`relative transition-all duration-300 ${
									index === currentPage
										? 'w-12 h-4 bg-accent shadow-lg shadow-accent/25 scale-110'
										: 'w-4 h-4 bg-stone-600 hover:bg-stone-500 hover:scale-105'
								} rounded-full`}></button>
						))}
					</div>
				)}
			</div>
		</section>
	)
}

export default PortfolioSection
