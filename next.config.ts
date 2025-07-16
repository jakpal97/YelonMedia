import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},

	// Optymalizacja obrazów
	images: {
		domains: ['yelonmedia.s3.us-east-1.amazonaws.com', 'images.unsplash.com', 'threejs.org'],
		formats: ['image/webp'],
	},

	// Optymalizacja kodu
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb', // Limit rozmiaru akcji serwerowych
		},
	},


}

export default nextConfig
