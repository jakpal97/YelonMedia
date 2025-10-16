'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, Camera } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function NotFound() {
	const router = useRouter()

	return (
		<div className="min-h-screen flex flex-col text-stone-100">
			<Navigation />
			<main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto text-center">
					{/* Ikona aparatu z animacją */}
					<div className="mb-8">
						<div className="relative inline-block">
							<Camera className="w-24 h-24 text-blue-300 mx-auto mb-4 animate-pulse" />
							<div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
								<span className="text-white text-xs font-bold">404</span>
							</div>
						</div>
					</div>

					{/* Główny tytuł */}
					<h1 className="text-6xl md:text-8xl font-extrabold text-stone-100 mb-4">404</h1>

					{/* Podtytuł */}
					<h2 className="text-2xl md:text-3xl font-bold text-stone-200 mb-6">Strona nie została znaleziona</h2>

					{/* Opis */}
					<p className="text-lg text-stone-300 mb-8 leading-relaxed">
						Wygląda na to, że ta strona została przeniesiona lub nie istnieje. Może chcesz zobaczyć moje portfolio lub
						skontaktować się ze mną?
					</p>

					{/* Przyciski akcji */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link
							href="/"
							className="btn btn-primary text-lg px-8 py-4 flex items-center gap-2 hover:scale-105 transition-transform duration-300">
							<Home className="w-5 h-5" />
							Strona główna
						</Link>

						<button
							onClick={() => router.back()}
							className="btn btn-secondary text-lg px-8 py-4 flex items-center gap-2 hover:scale-105 transition-transform duration-300">
							<ArrowLeft className="w-5 h-5" />
							Wróć
						</button>
					</div>

					{/* Dodatkowe linki */}
					<div className="mt-12 pt-8 border-t border-stone-700">
						<p className="text-stone-400 mb-4">Możesz też sprawdzić:</p>
						<div className="flex flex-wrap justify-center gap-4 text-sm">
							<Link
								href="/portfolio"
								className="text-blue-300 hover:text-blue-200 transition-colors duration-300 hover:underline">
								Portfolio
							</Link>
							<Link
								href="/contact"
								className="text-blue-300 hover:text-blue-200 transition-colors duration-300 hover:underline">
								Kontakt
							</Link>
							<Link
								href="/portfolio/eventy"
								className="text-blue-300 hover:text-blue-200 transition-colors duration-300 hover:underline">
								Eventy
							</Link>
							<Link
								href="/portfolio/wesela"
								className="text-blue-300 hover:text-blue-200 transition-colors duration-300 hover:underline">
								Wesela
							</Link>
						</div>
					</div>

					{/* Dekoracyjny element */}
					<div className="mt-12 flex justify-center">
						<div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
