import type { Metadata } from 'next'
import { Poppins, Playfair_Display, Courier_Prime } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-poppins',
	display: 'swap',
	preload: true,
})

const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '600'],
	variable: '--font-playfair',
	display: 'swap',
	preload: true,
})

const courierPrime = Courier_Prime({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-courier-prime',
	display: 'swap',
	preload: true,
})

const mainFont = {
	variable: '--font-main',
	className: 'font-main',
}

export const metadata: Metadata = {
	title: 'Fotograf Tarnowskie Góry - Yelon Media | Śluby, Portrety, Eventy',
	description:
		'Profesjonalny fotograf w Tarnowskich Górach i na Śląsku. Sesje ślubne, portretowe i eventowe. ⭐ Zobacz portfolio i umów się na darmową konsultację.',
	keywords: [
		'fotograf śląsk',
		'fotograf ślubny śląsk',
		'fotografia ślubna śląsk',
		'sesje ślubne śląsk',
		'fotograf Tarnowskie Góry',
		'fotograf katowice',
		'fotograf Gliwice',
		'fotograf Bytom',
		'fotograf Zabrze',
		'fotografia portretowa śląsk',
		'fotografia eventowa śląsk',
		'sesje narzeczeńskie śląsk',
		'fotograf z dojazdem śląsk',
		'Yelon Media',
		'sesje zdjęciowe śląsk',
		'fotograf na wesele śląsk',
		'zdjęcia ślubne śląsk',
	],
	authors: [{ name: 'Yelon Media' }],
	creator: 'Yelon Media',
	publisher: 'Yelon Media',
	openGraph: {
		title: 'Yelon Media - Fotograf Śląsk | Profesjonalne Sesje Ślubne i Portretowe',
		description: 'Profesjonalny fotograf na Śląsku. Fotografia ślubna, portretowa i eventowa z dojazdem do klienta. Zobacz portfolio i umów się na sesję.',
		type: 'website',
		locale: 'pl_PL',
		url: 'https://yelonmedia.pl',
		siteName: 'Yelon Media',
		images: [
			{
				url: '/logoyelon.png', 
				width: 1200,
				height: 630,
				alt: 'Yelon Media - Fotograf Śląsk',
			},
		],
	},
}

const schemaData = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"@id": "https://yelonmedia.pl",
	"name": "Yelon Media - Fotograf Tarnowskie Góry",
	"image": "https://yelonmedia.pl/logoyelon.png",
	"description": "Profesjonalna fotografia ślubna, portretowa i eventowa w Tarnowskich Górach i na Śląsku",
	"address": {
		"@type": "PostalAddress",
		"addressLocality": "Tarnowskie Góry",
		"addressRegion": "Śląskie",
		"addressCountry": "PL"
	},
	"geo": {
		"@type": "GeoCoordinates",
		"latitude": "50.4457",
		"longitude": "18.8575"
	},
	"url": "https://yelonmedia.pl",
	"telephone": "+48794081262",
	"email": "yelon.media@icloud.com",
	"priceRange": "$$",
	"areaServed": [
		{
			"@type": "City",
			"name": "Tarnowskie Góry"
		},
		{
			"@type": "City", 
			"name": "Katowice"
		},
		{
			"@type": "City", 
			"name": "Gliwice"
		},
		{
			"@type": "City", 
			"name": "Bytom"
		},
		{
			"@type": "City", 
			"name": "Zabrze"
		}
	],
	"openingHoursSpecification": [
		{
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			"opens": "09:00",
			"closes": "18:00"
		}
	]
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

				{/* Preload krytycznych zasobów */}
				<link rel="preload" href="/logoyelon.png" as="image" type="image/png" />

				{/* DNS prefetch dla zewnętrznych domen */}
				<link rel="dns-prefetch" href="https://yelonmedia.s3.us-east-1.amazonaws.com" />
				{/* Preconnect do S3 dla szybszego ładowania obrazów */}
				<link rel="preconnect" href="https://yelonmedia.s3.us-east-1.amazonaws.com" crossOrigin="anonymous" />
				
				{/* JSON-LD Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
				/>
			</head>
			<body
				className={`${playfairDisplay.className} bg-stone-900 text-stone-100 overflow-x-hidden`}
				style={{ fontFamily: 'Courier Prime, monospace', fontWeight: 400, fontStyle: 'normal' }}>
				{children}
			</body>
		</html>
	)
}