import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Optymalizacja kompilera
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},

	// Agresywna optymalizacja obrazów
	images: {
		domains: ['yelonmedia.s3.us-east-1.amazonaws.com', 'images.unsplash.com'],
		formats: ['image/webp'],
		deviceSizes: [640, 828, 1200],
		imageSizes: [32, 64, 128],
		minimumCacheTTL: 86400,
	},

	// Tymczasowe wyłączenie cache (usuń po naprawie)
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-cache, no-store, must-revalidate',
					},
				],
			},
		]
	},

	// Optymalizacja bundle
	experimental: {
		optimizePackageImports: ['three', 'lucide-react'],
	},

	// Webpack optymalizacje
	webpack: (config, { isServer }) => {
		// Usuwam problematyczne config.optimization.usedExports - powoduje konflikt z Next.js 15.3.3
		// Next.js sam zarządza tree shaking

		// Code splitting - tylko jeśli nie jest serverem
		if (!isServer) {
			config.optimization.splitChunks = {
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
					three: {
						test: /[\\/]node_modules[\\/]three[\\/]/,
						name: 'three',
						chunks: 'async',
					},
				},
			}
		}

		return config
	},

	generateEtags: false,
	poweredByHeader: false,
}

export default nextConfig
