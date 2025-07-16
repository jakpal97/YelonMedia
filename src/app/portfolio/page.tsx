import Navigation from '@/components/Navigation'
import ChromaGrid from '@/components/ChromaGrid'
import Link from 'next/link'
import { Metadata } from 'next'

// Metadane dla SEO
export const metadata: Metadata = {
	title: 'Portfolio Fotograficzne | Yelon Media - Fotograf',
	description: 'Odkryj portfolio fotograficzne Yelon Media. Sesje ślubne, portretowe, eventowe i wiele innych.',
	keywords: ['portfolio fotograficzne', 'fotografia ślubna', 'fotografia portretowa', 'sesje zdjęciowe'],
}

// Ustawienie generowania statycznego
export const dynamic = 'force-static'
export const revalidate = 86400 // Odświeżanie co 24h (w sekundach)

// Funkcja pobierająca dane do SSG
async function getPortfolioItems() {
	// W prawdziwej aplikacji dane mogłyby pochodzić z API lub CMS
	// Tutaj używamy danych statycznych
	return [
		{
			image: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Salony+Fryzjerskie/DSC06617.jpg',
			title: 'Usługi',
			subtitle: 'Profesjonalne sesje usługowe',
			handle: '@uslugi',
			borderColor: '#4F46E5',
			gradient: 'linear-gradient(145deg,#4F46E5,#000)',
			url: '/portfolio/uslugi',
		},
		{
			image: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/DSC09463.jpg',
			title: 'Eventy',
			subtitle: 'Fotografia wydarzeń i imprez',
			handle: '@eventy',
			borderColor: '#10B981',
			gradient: 'linear-gradient(210deg,#10B981,#000)',
			url: '/portfolio/eventy',
		},
		{
			image: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/_DSC2877.jpg',
			title: 'Gastro',
			subtitle: 'Fotografia kulinarna i restauracyjna',
			handle: '@gastro',
			borderColor: '#F59E0B',
			gradient: 'linear-gradient(165deg,#F59E0B,#000)',
			url: '/portfolio/gastro',
		},
		{
			image: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC01517.jpg',
			title: 'Motoryzacja',
			subtitle: 'Sesje samochodowe i motoryzacyjne',
			handle: '@motoryzacja',
			borderColor: '#EF4444',
			gradient: 'linear-gradient(195deg,#EF4444,#000)',
			url: '/portfolio/motoryzacja',
		},
		{
			image: 'https://yelonmedia.s3.us-east-1.amazonaws.com/Wesela/DSC00913.jpg',
			title: 'Wesela',
			subtitle: 'Magiczne chwile z najważniejszego dnia',
			handle: '@wesela',
			borderColor: '#EC4899',
			gradient: 'linear-gradient(225deg,#EC4899,#000)',
			url: '/portfolio/wesela',
		},
		{
			image: '/IMG_7002.JPG',
			title: 'Studia',
			subtitle: 'Profesjonalne sesje studyjne',
			handle: '@studia',
			borderColor: '#8B5CF6',
			gradient: 'linear-gradient(135deg,#8B5CF6,#000)',
			url: '/portfolio/studia',
		},
	]
}

export default async function Portfolio() {
	// Pobierz dane podczas generowania strony
	const portfolioItems = await getPortfolioItems()

	return (
		<main className="min-h-screen relative z-10">
			{/* Dodanie takiego samego tła jak na stronie głównej - pełnoekranowe */}
			<div
				className="fixed inset-0 -z-20"
				style={{
					background: 'linear-gradient(325deg, #60a5fa -10%, #111 40%, #000 100%)',
					pointerEvents: 'none',
				}}></div>

			{/* Dodatkowy gradient overlay dla większej widoczności */}
			<div
				className="fixed inset-0 -z-10 pointer-events-none"
				style={{
					background: 'linear-gradient(45deg, rgba(175, 146, 132, 0.03) 0%, transparent 100%)',
				}}></div>

			<Navigation />

			{/* Hero Section */}
			<section className="pt-32 pb-4 font-[Courier_Prime]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1
						className="text-5xl md:text-6xl lg:text-7xl font-bold pb-10 tracking-wide"
						style={{
							background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							textShadow: '0 4px 30px rgba(0,0,0,0.5)',
						}}>
						Moje Portfolio
					</h1>
					<p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed font-bold">
						Odkryj różnorodność moich usług fotograficznych. Każda kategoria reprezentuje unikalne podejście do
						fotografii.
					</p>
				</div>
			</section>

			{/* Portfolio Grid */}
			<section className="pt-8 pb-20">
				<div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
					<div style={{ height: '700px', position: 'relative' }}>
						<ChromaGrid
							items={portfolioItems}
							radius={500}
							damping={0.25}
							fadeOut={0.5}
							ease="power2.out"
							className="gap-3" // Zmniejszenie odstępu między kafelkami
						/>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-6">Zainteresowała Cię któraś kategoria?</h2>
					<p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto leading-relaxed">
						Skontaktuj się ze mną, aby omówić szczegóły współpracy w wybranej kategorii
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/contact" className="btn btn-primary text-lg px-8 py-4">
							Umów konsultację
						</Link>
						<Link href="/#about" className="btn btn-secondary text-lg px-8 py-4">
							Poznaj mnie bliżej
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
