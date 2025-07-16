'use client'

// Statyczne dane dla sekcji Contact/CTA
const contactData = {
	title: 'Rozpocznij swoją fotograficzną przygodę już dziś',
	subtitle: 'Umów się na bezpłatną konsultację i przekonaj się, jak profesjonalne zdjęcia mogą zmienić Twój wizerunek',
	buttons: {
		primary: { text: 'Umów bezpłatną konsultację', href: '/contact' },
		secondary: { text: 'Zobacz więcej prac', href: '/portfolio' },
	},
}

const ContactSection = () => {
	return (
		<section className="py-24 relative overflow-hidden">
			{/* Lekkie animowane tło CSS */}
			<div className="absolute inset-0 z-0 bg-gradient-to-br from-stone-900 via-stone-800 to-black">
				{/* Subtelna animowana tekstura */}
				<div className="absolute inset-0 opacity-30">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_50%)] animate-pulse"></div>
					<div
						className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)] animate-pulse"
						style={{ animationDelay: '1s' }}></div>
					<div
						className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,119,198,0.08),transparent_50%)] animate-pulse"
						style={{ animationDelay: '2s' }}></div>
				</div>
			</div>

			{/* Nakładka dla lepszej czytelności tekstu */}
			<div className="absolute inset-0 bg-black/40 z-10"></div>

			{/* Dekoracyjne elementy geometryczne w kolorach strony */}
			<div className="absolute inset-0 overflow-hidden z-20">
				{/* Lewy górny element */}
				<div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-300/10 rounded-full blur-xl"></div>
				<div className="absolute top-20 left-10 w-32 h-32 bg-stone-600/20 rounded-full"></div>

				{/* Prawy dolny element */}
				<div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-300/5 rounded-full blur-2xl"></div>
				<div className="absolute bottom-16 right-8 w-40 h-40 bg-stone-700/20 rounded-full"></div>

				{/* Środkowe dekoracyjne linie */}
				<div className="absolute top-1/4 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent rotate-45"></div>
				<div className="absolute bottom-1/3 right-1/4 w-72 h-1 bg-gradient-to-r from-transparent via-stone-500/30 to-transparent -rotate-45"></div>
			</div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
				{/* Ciemna karta w stylu strony */}
				<div className="bg-stone-800/80 backdrop-blur-sm border border-stone-700 rounded-3xl shadow-2xl p-12 md:p-16 text-center relative overflow-hidden">
					{/* Subtelne dekoracyjne elementy wewnątrz karty */}
					<div className="absolute top-0 left-0 w-24 h-24 bg-blue-300/10 rounded-full -translate-x-12 -translate-y-12"></div>
					<div className="absolute bottom-0 right-0 w-32 h-32 bg-stone-600/20 rounded-full translate-x-16 translate-y-16"></div>

					{/* Zawartość karty */}
					<div className="relative z-10">
						<h2 className="section-title text-4xl md:text-5xl font-bold mb-6 leading-tight">{contactData.title}</h2>
						<p className="section-subtitle text-xl mb-10 max-w-3xl mx-auto leading-relaxed">{contactData.subtitle}</p>

						{/* Buttony w stylu strony */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href={contactData.buttons.primary.href} className="btn btn-primary text-lg px-8 py-4">
								{contactData.buttons.primary.text}
							</a>
							<a href={contactData.buttons.secondary.href} className="btn btn-secondary text-lg px-8 py-4">
								{contactData.buttons.secondary.text}
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactSection
