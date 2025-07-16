import type { Metadata } from 'next'
import { Poppins, Playfair_Display, Courier_Prime } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-poppins',
})

const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-playfair',
})

const courierPrime = Courier_Prime({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-courier-prime',
})

// Ustaw Playfair Display jako główny font elegancki
const mainFont = {
	variable: '--font-main',
	className: 'font-main',
}

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
			</head>
			<body
				className={`${playfairDisplay.className} bg-stone-900 text-stone-100 overflow-x-hidden`}
				style={{ fontFamily: 'Courier Prime, monospace', fontWeight: 400, fontStyle: 'normal' }}>
				{children}

				{/* Tymczasowy skrypt do czyszczenia cache */}
				<Script src="/sw-clear.js" strategy="afterInteractive" />
			</body>
		</html>
	)
}
