'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

// FAQ data
const faqData = [
	{
		question: 'Jak wygląda proces rezerwacji sesji?',
		answer:
			'Proces jest bardzo prosty: skontaktuj się ze mną przez formularz lub telefon, omówimy szczegóły Twojej sesji, ustalimy datę i miejsce, a następnie podpiszemy umowę. Wymagam zaliczki 50% w celu potwierdzenia terminu.',
	},
	{
		question: 'Ile kosztuje sesja fotograficzna?',
		answer:
			'Ceny są indywidualnie ustalane w zależności od rodzaju sesji, lokalizacji i czasu trwania. Sesje portretowe od 500 zł, ślubne od 2500 zł, biznesowe od 800 zł. Skontaktuj się po szczegółową wycenę.',
	},
	{
		question: 'Jak długo trwa sesja?',
		answer:
			'Sesja portretowa trwa około 1-2 godzin, sesja ślubna 8-12 godzin, a sesja biznesowa 2-4 godziny. Czas można dostosować do Twoich potrzeb.',
	},
	{
		question: 'Kiedy otrzymam gotowe zdjęcia?',
		answer:
			'Zdjęcia z sesji portretowej dostarczam w ciągu 1-2 tygodni, ze ślubu w ciągu 4-6 tygodni. Kilka zdjęć preview otrzymasz już następnego dnia po sesji.',
	},
	{
		question: 'W jakim formacie otrzymam zdjęcia?',
		answer:
			'Zdjęcia dostarczam w wysokiej rozdzielczości w formacie JPEG, gotowe do druku i udostępniania. Możliwe jest również dostarczenie plików RAW za dodatkową opłatą.',
	},
	{
		question: 'Czy mogę prosić o poprawki w zdjęciach?',
		answer:
			'Tak, każda sesja zawiera podstawową obróbkę wszystkich zdjęć. Większe retusz jest możliwy za dodatkową opłatą. Omówimy wszystkie szczegóły przed sesją.',
	},
	{
		question: 'Co jeśli pogoda będzie niesprzyjająca?',
		answer:
			'W przypadku sesji plenerowych mamy plan B - możemy przełożyć sesję na inny termin lub przenieść ją do studia/wnętrza. Twoja satysfakcja jest najważniejsza.',
	},
	{
		question: 'Czy podróżujesz poza miasto?',
		answer:
			'Tak, chętnie podróżuję na sesje. Dla lokalizacji do 50km od miasta nie liczę dodatkowych kosztów dojazdu. Dla dalszych lokalizacji ustalamy indywidualnie.',
	},
]

// FAQ Component z lepszymi animacjami
const FAQ = () => {
	const [openItems, setOpenItems] = useState<number[]>([])

	const toggleItem = (index: number) => {
		setOpenItems(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))
	}

	return (
		<section className="py-20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="section-title">Często zadawane pytania</h2>
					<p className="section-subtitle">
						Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące moich usług fotograficznych
					</p>
				</div>

				<div className="space-y-4">
					{faqData.map((faq, index) => {
						const isOpen = openItems.includes(index)
						return (
							<div
								key={index}
								className="bg-stone-800/50 border border-stone-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-stone-600 hover:bg-stone-800/60">
								<button
									onClick={() => toggleItem(index)}
									className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset">
									<div className="flex items-center justify-between">
										<h3 className="text-lg font-semibold text-stone-100 pr-4">{faq.question}</h3>
										<div className="flex-shrink-0">
											<svg
												className={`w-6 h-6 text-blue-300 transform transition-transform duration-300 ${
													isOpen ? 'rotate-180' : 'rotate-0'
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</div>
									</div>
								</button>
								<div
									className={`transition-all duration-500 ease-in-out overflow-hidden ${
										isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
									}`}>
									<div className="px-6 pb-6 pt-2 border-t border-stone-600">
										<p className="text-stone-300 leading-relaxed">{faq.answer}</p>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default function ContactPage() {
	return (
		<main className="min-h-screen">
			<Navigation />

			{/* Contact Form */}
			<ContactForm  />

			{/* FAQ */}
			<FAQ />

			{/* Footer */}
			<Footer />
		</main>
	)
}
