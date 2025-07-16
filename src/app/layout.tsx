import type { Metadata } from 'next'
import { Poppins, Playfair_Display, Courier_Prime } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-poppins',
	display: 'swap',
	preload: true,
	fallback: ['system-ui', 'sans-serif'],
})

const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-playfair',
	display: 'swap',
	preload: true,
	fallback: ['Georgia', 'serif'],
})

const courierPrime = Courier_Prime({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-courier-prime',
	display: 'swap',
	preload: true,
	fallback: ['monospace'],
})

// Ustaw Playfair Display jako główny font elegancki
const mainFont = {
	variable: '--font-main',
	className: 'font-main',
}

// Import krytycznego CSS
import './critical.css'

export const metadata: Metadata = {
	title: 'Yelon Media - Fotograf | Fotografia Portretowa, Ślubna i Eventowa',
	description:
		'Profesjonalna fotografia portretowa, ślubna i eventowa. Uwieczniam najpiękniejsze chwile w życiu. Portfolio, cennik i kontakt.',
	keywords: [
		'fotograf',
		'fotografia ślubna',
		'fotografia portretowa',
		'fotografia eventowa',
		'Yelon Media',
		'sesje zdjęciowe',
	],
	authors: [{ name: 'Yelon Media ' }],
	openGraph: {
		title: 'Yelon Media - Fotograf',
		description: 'Profesjonalna fotografia portretowa, ślubna i eventowa',
		type: 'website',
		locale: 'pl_PL',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="pl"
			className={`${poppins.variable} ${playfairDisplay.variable} ${mainFont.variable} ${courierPrime.variable}`}>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

				{/* Krytyczny CSS już zaimportowany jako moduł */}

				{/* Font display swap dla lepszego CLS */}
				<style
					dangerouslySetInnerHTML={{
						__html: `
					@font-face {
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 400;
						font-display: swap;
					}
					@font-face {
						font-family: 'Playfair Display';
						font-style: normal;
						font-weight: 400;
						font-display: swap;
					}
				`,
					}}
				/>

				{/* Preload kluczowych zasobów */}
				<link rel="preload" href="/favicon.ico" as="image" />
			</head>
			<body
				className={`${playfairDisplay.className} bg-stone-900 text-stone-100 overflow-x-hidden`}
				style={{ fontFamily: 'Courier Prime, monospace', fontWeight: 400, fontStyle: 'normal' }}>
				{children}

				{/* Service Worker Registration */}
				<Script id="register-sw" strategy="afterInteractive">
					{`
						if ('serviceWorker' in navigator) {
							window.addEventListener('load', function() {
								navigator.serviceWorker.register('/service-worker.js').then(
									function(registration) {
										console.log('Service Worker registration successful with scope: ', registration.scope);
									},
									function(err) {
										console.log('Service Worker registration failed: ', err);
									}
								);
							});
						}
					`}
				</Script>
			</body>
		</html>
	)
}
