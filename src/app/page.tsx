import { Suspense, lazy } from 'react'
import Navigation from '@/components/Navigation'

// Lazy loading komponentów
const HeroSection = lazy(() => import('@/components/HeroSection'))
const AboutSection = lazy(() => import('@/components/AboutSection'))
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'))
const ContactForm = lazy(() => import('@/components/ContactForm'))
const Footer = lazy(() => import('@/components/Footer'))

// Komponenty zastępcze podczas ładowania
const LoadingSection = ({ height = 'min-h-[50vh]', text = 'Ładowanie...' }) => (
	<div className={`${height} flex items-center justify-center`}>
		<div className="text-center">
			<div className="w-8 h-8 border-2 border-blue-300 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
			<p className="text-stone-300">{text}</p>
		</div>
	</div>
)

// Konfiguracja generowania statycznego
export const dynamic = 'force-static'
export const revalidate = 86400 // Odświeżanie co 24h (w sekundach)

export default function Home() {
	return (
		<main className="min-h-screen">
			<Navigation />
			<Suspense fallback={<LoadingSection height="min-h-[80vh]" text="Ładowanie sekcji głównej..." />}>
				<HeroSection />
			</Suspense>
			<Suspense fallback={<LoadingSection text="Ładowanie sekcji o mnie..." />}>
				<AboutSection />
			</Suspense>
			<Suspense fallback={<LoadingSection text="Ładowanie portfolio..." />}>
				<PortfolioSection />
			</Suspense>
			<Suspense fallback={<LoadingSection text="Ładowanie formularza kontaktowego..." />}>
				<ContactForm />
			</Suspense>
			<Suspense fallback={<LoadingSection text="Ładowanie stopki..." />}>
				<Footer />
			</Suspense>
		</main>
	)
}
