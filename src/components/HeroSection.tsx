'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import dla Camera3D z wyłączonym SSR
const Camera3D = dynamic(() => import('./Camera3D'), {
	ssr: false,
	loading: () => (
		<div className="w-full h-[500px] bg-stone-800 rounded-2xl flex items-center justify-center shadow-2xl">
			<div className="text-center text-white">
				<div className="text-xl font-semibold  mb-2">Ładowanie aparatu 3D...</div>
				<div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
			</div>
		</div>
	),
})

// Dynamic import dla Beams z wyłączonym SSR

interface HeroContent {
	title: string[]
	description: string
	buttons: {
		primary: { text: string; href: string }
		secondary: { text: string; href: string }
	}
}

const HeroSection = () => {
	const [heroContent] = useState<HeroContent>({
		title: ['Uwieczniam', 'Najważniejsze', 'Chwile'],
		description: 'Kreatywna fotografia i film. Pomogę Ci poprawić wizerunek Twojej firmy w social mediach.',
		buttons: {
			primary: { text: 'Zobacz Portfolio', href: '/portfolio' },
			secondary: { text: 'Skontaktuj się', href: '/contact' },
		},
	})

	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	const scrollToAbout = () => {
		const aboutSection = document.querySelector('#about')
		if (aboutSection) {
			const offsetTop = aboutSection.getBoundingClientRect().top + window.pageYOffset - 70
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth',
			})
		}
	}

	return (
		<section id="home" className="min-h-screen relative overflow-hidden pt-16">
			{/* Social Media Icons - Prawy górny róg */}
			<div className="absolute top-24 right-6 z-20 hidden md:flex space-x-3">
				<a
					href="https://facebook.com/yelonmedia"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 border border-white/20">
					<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
					</svg>
				</a>
				<a
					href="https://instagram.com/yelonmedia"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 border border-white/20">
					<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
					</svg>
				</a>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
					{/* Left Column - Text Content */}
					<div className="space-y-8 text-center lg:text-left">
						<div className="space-y-2">
							{heroContent.title.map((line, index) => (
								<div
									key={index}
									className={`text-4xl md:text-5xl lg:text-6xl font-savate font-bold leading-tight block transition-all duration-1000 ${
										isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
									} ${index === 2 ? 'text-accent' : 'text-stone-100'}`}
									style={{ transitionDelay: `${index * 200}ms`, fontWeight: 700 }}>
									{line}
								</div>
							))}
						</div>

						<p
							className={`text-lg md:text-xl text-stone-300 max-w-lg mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 ${
								isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
							}`}
							style={{ transitionDelay: '800ms', fontWeight: 700 }}>
							{heroContent.description}
						</p>

						<div
							className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 ${
								isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
							}`}
							style={{ transitionDelay: '1000ms', fontWeight: 700 }}>
							<Link href={heroContent.buttons.primary.href} className="btn btn-primary text-lg px-8 py-4">
								{heroContent.buttons.primary.text}
							</Link>
							<Link href={heroContent.buttons.secondary.href} className="btn btn-secondary text-lg px-8 py-4">
								{heroContent.buttons.secondary.text}
							</Link>
						</div>
					</div>

					{/* Right Column - 3D Camera */}
					<div
						className={`flex justify-center lg:justify-end transition-all duration-1000 ${
							isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'
						}`}
						style={{ transitionDelay: '1200ms' }}>
						<div className="w-full max-w-lg">
							<Camera3D />
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div
				className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group transition-all duration-1000 ${
					isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'
				}`}
				style={{ transitionDelay: '1500ms' }}
				onClick={scrollToAbout}>
				<div className="flex flex-col items-center space-y-2 text-stone-300 hover:text-blue-300 transition-colors duration-300">
					<span className="text-base font-semibold hidden sm:block">Przewiń w dół</span>
					<div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
						<div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
					</div>
					<ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform duration-300" />
				</div>
			</div>
		</section>
	)
}

export default HeroSection
