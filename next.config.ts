import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},

	// Optymalizacja obrazów
	images: {
		domains: ['yelonmedia.s3.us-east-1.amazonaws.com', 'images.unsplash.com', 'threejs.org'],
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
	},

	// Optymalizacja kodu
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb', // Limit rozmiaru akcji serwerowych
		},
		optimizePackageImports: ['three'],
	},

	// Kompresja
	compress: true,

	// Webpack optymalizacje
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Optymalizacja Three.js
		config.resolve.alias = {
			...config.resolve.alias,
			'three/examples/jsm': 'three/examples/jsm',
		}

		// Optymalizacja bundle size
		if (!dev && !isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					...config.optimization.splitChunks,
					cacheGroups: {
						...config.optimization.splitChunks.cacheGroups,
						three: {
							test: /[\\/]node_modules[\\/](three)[\\/]/,
							name: 'three',
							chunks: 'all',
						},
					},
				},
			}
		}

		return config
	},


}

export default nextConfig
