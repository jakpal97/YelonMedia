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

	// Optymalizacja bundlowania
	webpack: (config, { isServer }) => {
		// Optymalizacja dla Three.js
		config.module.rules.push({
			test: /three\/examples\/js/,
			use: 'null-loader',
		})

		// Konfiguracja splitowania kodu
		config.optimization.splitChunks = {
			chunks: 'all',
			cacheGroups: {
				// Grupowanie modułów Three.js
				three: {
					test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
					name: 'three-vendors',
					priority: 10,
				},
				// Grupowanie komponentów UI
				ui: {
					test: /[\\/]src[\\/]components[\\/]/,
					name: 'ui',
					priority: 5,
				},
				// Domyślne grupowanie
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					priority: 1,
				},
			},
		}

		return config
	},
}

export default nextConfig
