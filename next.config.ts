import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},

	// Podstawowa optymalizacja obrazów
	images: {
		domains: ['yelonmedia.s3.us-east-1.amazonaws.com', 'images.unsplash.com'],
	},
}

export default nextConfig
