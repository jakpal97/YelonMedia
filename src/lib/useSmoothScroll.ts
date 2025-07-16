import { useEffect } from 'react'

interface SmoothScrollOptions {
	duration?: number
	easing?: (t: number) => number
	offset?: number
}

const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
	const {
		duration = 1000, // Zwiększony czas dla większej płynności
		easing = (t: number) => 1 - Math.pow(1 - t, 4), // ease-out-quart
		offset = 80,
	} = options

	useEffect(() => {
		// Intercept all internal anchor links
		const handleClick = (e: Event) => {
			const target = e.target as HTMLAnchorElement
			if (target.tagName === 'A' && target.hash) {
				const element = document.querySelector(target.hash)
				if (element) {
					e.preventDefault()
					smoothScrollTo(element as HTMLElement, duration, easing, offset)
				}
			}
		}

		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [duration, easing, offset])

	const smoothScrollTo = (element: HTMLElement, duration: number, easing: (t: number) => number, offset: number) => {
		const targetPosition = element.offsetTop - offset
		const startPosition = window.pageYOffset
		const distance = targetPosition - startPosition
		let start: number | null = null

		const animation = (currentTime: number) => {
			if (start === null) start = currentTime
			const timeElapsed = currentTime - start
			const progress = Math.min(timeElapsed / duration, 1)

			const easedProgress = easing(progress)
			window.scrollTo(0, startPosition + distance * easedProgress)

			if (progress < 1) {
				requestAnimationFrame(animation)
			}
		}

		requestAnimationFrame(animation)
	}

	return { smoothScrollTo }
}

export default useSmoothScroll
