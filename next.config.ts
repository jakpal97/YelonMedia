import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},

	// Podstawowa optymalizacja obrazów
	images: {
		domains: ['yelonmedia.s3.us-east-1.amazonaws.com', 'images.unsplash.com'],
	},

	// Wymuś odświeżenie cache
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-cache, no-store, must-revalidate',
					},
					{
						key: 'Pragma',
						value: 'no-cache',
					},
					{
						key: 'Expires',
						value: '0',
					},
				],
			},
		]
	},

	// Dodatkowe ustawienia dla wymuszenia rebuildu
	generateEtags: false,
	poweredByHeader: false,
}

export default nextConfig
