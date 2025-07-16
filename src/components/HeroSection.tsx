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
		description:
			'Kreatywna fotografia i film. Pomogę Ci poprawić wizerunek Twojej firmy w social mediach.',
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
