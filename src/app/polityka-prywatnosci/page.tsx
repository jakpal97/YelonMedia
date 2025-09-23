'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PolitykaPrywatnosciPage() {
	return (
		<div className="min-h-screen flex flex-col text-stone-100">
			<Navigation />
			<main className="flex-1">
				<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
					<h1 className="text-3xl md:text-5xl font-extrabold mb-6">Polityka Prywatności</h1>
					<p className="text-stone-300 mb-2">Data wejścia w życie: 23 września 2025</p>

					<div className="space-y-6 leading-8 text-stone-200">
						<h2 className="text-2xl font-bold mt-8">1. Informacje ogólne</h2>
						<p>
							Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez
							Użytkowników w związku z korzystaniem z usług świadczonych przez Yelon Media Tomasz [Nazwisko], zwanych
							dalej „Usługodawcą".
						</p>
						<h3 className="text-xl font-semibold mt-6">Dane kontaktowe Administratora:</h3>
						<ul className="list-disc list-inside space-y-1">
							<li>Nazwa: Yelon Media</li>
							<li>Email: yelon.media@icloud.com</li>
							<li>Telefon: +48 794 081 262</li>
							<li>Strona internetowa: yelonmedia.pl</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">2. Podstawa prawna przetwarzania danych</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Art. 6 ust. 1 lit. a RODO (zgoda)</li>
							<li>Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
							<li>Art. 6 ust. 1 lit. f RODO (uzasadniony interes prawny)</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">3. Kategorie przetwarzanych danych</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Dane identyfikacyjne: imię, nazwisko, nazwa firmy</li>
							<li>Dane kontaktowe: email, telefon, adres</li>
							<li>Dane techniczne: IP, przeglądarka, system</li>
							<li>Dane o preferencjach: preferowane usługi</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">4. Cele przetwarzania danych</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Świadczenie usług fotograficznych i filmowych</li>
							<li>Komunikacja i obsługa zamówień</li>
							<li>Marketing i promocja usług (za zgodą)</li>
							<li>Analiza ruchu na stronie</li>
							<li>Prowadzenie księgowości</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">5. Odbiorcy danych</h2>
						<p>
							Dane mogą być przekazywane dostawcom usług technicznych, płatniczych, księgowych i organom publicznym.
						</p>

						<h2 className="text-2xl font-bold mt-8">6. Okres przechowywania danych</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Klienci: czas trwania umowy + 3 lata</li>
							<li>Potencjalni klienci: do odwołania zgody, maks. 3 lata</li>
							<li>Dane księgowe: 5 lat</li>
							<li>Dane techniczne: maks. 12 miesięcy</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">7. Prawa Użytkowników</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Dostęp, sprostowanie, usunięcie</li>
							<li>Ograniczenie, przenoszenie, sprzeciw</li>
							<li>Cofnięcie zgody w dowolnym momencie</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">8. Pliki cookies</h2>
						<p>Wykorzystujemy cookies funkcjonalne, analityczne (np. Google Analytics) oraz marketingowe.</p>
						<p>Użytkownik może zarządzać cookies w ustawieniach przeglądarki.</p>

						<h2 className="text-2xl font-bold mt-8">9. Bezpieczeństwo danych</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Szyfrowanie SSL</li>
							<li>Kopie zapasowe</li>
							<li>Ograniczenia dostępu</li>
							<li>Monitorowanie bezpieczeństwa</li>
						</ul>

						<h2 className="text-2xl font-bold mt-8">10. Zmiany w Polityce Prywatności</h2>
						<p>Zmiany ogłaszane będą na stronie internetowej.</p>

						<h2 className="text-2xl font-bold mt-8">11. Kontakt</h2>
						<ul className="list-disc list-inside space-y-1">
							<li>Email: yelon.media@icloud.com</li>
							<li>Telefon: +48 794 081 262</li>
						</ul>

						<p className="text-stone-400 mt-6">
							Użytkownik ma prawo złożyć skargę do Prezesa UODO w przypadku naruszenia przepisów o ochronie danych
							osobowych.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}
