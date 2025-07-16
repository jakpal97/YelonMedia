export const getOptimizedImageUrl = (url: string, width: number = 800, quality: number = 75) => {
	// Dla obrazów z AWS S3, dodajemy parametry optymalizacji
	if (url.includes('yelonmedia.s3.us-east-1.amazonaws.com')) {
		return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`
	}

	// Dla lokalnych obrazów, Next.js automatycznie optymalizuje
	return url
}

export const getImageSizes = (
	breakpoints: string[] = ['(max-width: 640px) 100vw', '(max-width: 1024px) 50vw', '25vw']
) => {
	return breakpoints.join(', ')
}

export const getDeviceSizes = () => [640, 750, 828, 1080, 1200, 1920]
