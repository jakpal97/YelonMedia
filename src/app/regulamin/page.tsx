'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function RegulaminPage() {
	return (
		<div className="min-h-screen flex flex-col text-stone-100">
			<Navigation />
			<main className="flex-1">
				<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
					<h1 className="text-3xl md:text-5xl font-extrabold mb-6">Regulamin Serwisu</h1>
					<p className="text-stone-300 mb-2">Data wejścia w życie: 23 września 2025</p>

					<div className="space-y-6 leading-8 text-stone-200">
						<h2 className="text-2xl font-bold mt-8">1. Postanowienia ogólne</h2>
						<p>
							Niniejszy Regulamin określa zasady korzystania ze strony internetowej yelonmedia.pl oraz usług
							świadczonych przez Yelon Media.
						</p>
						<p>
							Administratorem serwisu jest Tomasz [Nazwisko] prowadzący działalność gospodarczą pod nazwą Yelon Media.
						</p>
						<p>Korzystanie z serwisu oznacza akceptację postanowień niniejszego Regulaminu.</p>

						<h3 className="text-xl font-semibold mt-6">Dane kontaktowe:</h3>
						<ul className="list-disc list-inside space-y-1">
							<li>Email: yelon.media@icloud.com</li>
							<li>Telefon: +48 794 081 262</li>
							<li>Strona: yelonmedia.pl</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">2. Definicje</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Serwis - strona internetowa yelonmedia.pl</li>
							<li>Administrator - Yelon Media</li>
							<li>Użytkownik - osoba korzystająca z serwisu</li>
							<li>Usługi - usługi fotograficzne i filmowe świadczone przez Administratora</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">3. Warunki korzystania z serwisu</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Serwis jest dostępny bezpłatnie 24 godziny na dobę, 7 dni w tygodniu.</li>
							<li>Dostęp do niektórych funkcji może wymagać rejestracji lub kontaktu z Administratorem.</li>
							<li>Użytkownik zobowiązuje się do korzystania z serwisu zgodnie z prawem.</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">4. Zasady korzystania</h2>
						<p>Użytkownik zobowiązuje się do:</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Podawania prawdziwych danych kontaktowych</li>
							<li>Niepublikowania treści obraźliwych lub nielegalnych</li>
							<li>Niedziałania na szkodę innych użytkowników lub Administratora</li>
							<li>Przestrzegania praw autorskich</li>
						</ul>
						<p>Zabrania się m.in. rozpowszechniania materiałów bez zgody Administratora, prób włamań i spamu.</p>

						<h2 className="text-2xl font-bold mt-8">5. Prawa autorskie i własność intelektualna</h2>
						<p>
							Wszystkie materiały w serwisie są chronione prawem autorskim. Kopiowanie lub wykorzystywanie bez zgody
							jest zabronione.
						</p>

						<h2 className="text-2xl font-bold mt-8">6. Usługi fotograficzne</h2>
						<p>Szczegóły usług, ceny i terminy są ustalane indywidualnie i regulowane odrębnymi umowami.</p>

						<h2 className="text-2xl font-bold mt-8">7. Polityka prywatności</h2>
						<p>Ochronę danych osobowych reguluje Polityka Prywatności dostępna na oddzielnej stronie.</p>

						<h2 className="text-2xl font-bold mt-8">8. Odpowiedzialność</h2>
						<p>
							Administrator nie ponosi odpowiedzialności za przerwy techniczne, błędy niezależne od niego ani szkody
							wynikłe z niewłaściwego korzystania z serwisu.
						</p>

						<h2 className="text-2xl font-bold mt-8">9. Reklamacje</h2>
						<p>
							Reklamacje należy kierować na adres email: yelon.media@icloud.com. Rozpatrzenie nastąpi do 14 dni
							roboczych.
						</p>

						<h2 className="text-2xl font-bold mt-8">10. Postanowienia końcowe</h2>
						<p>
							Administrator zastrzega sobie prawo do zmian Regulaminu. Zmiany wchodzą w życie po 14 dniach od publikacji
							i podlegają prawu polskiemu.
						</p>

						<h2 className="text-2xl font-bold mt-8">11. Kontakt</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Email: yelon.media@icloud.com</li>
							<li>Telefon: +48 794 081 262</li>
						</ul>

						<p className="text-stone-400 mt-6">Data ostatniej aktualizacji: 23 września 2025</p>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}
