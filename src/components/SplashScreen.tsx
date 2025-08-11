'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

interface SplashScreenProps {
	durationMs?: number
}

export default function SplashScreen({ durationMs = 3000 }: SplashScreenProps) {
	const [visible, setVisible] = useState(true)
	const [mounted, setMounted] = useState(false)
	const [logoAnimated, setLogoAnimated] = useState(false)

	useEffect(() => {
		setMounted(true)
		
		// Animacja logo z opóźnieniem
		const logoTimer = setTimeout(() => setLogoAnimated(true), 300)
		
		const id = window.setTimeout(() => setVisible(false), durationMs)
		
		return () => {
			window.clearTimeout(id)
			clearTimeout(logoTimer)
		}
	}, [durationMs])

	const stickers = useMemo(
		() => [
			// Sekwencja pojawiania (co ~200ms) - znacznie powiększone zdjęcia
			{ src: '/IMG_1454.JPG', className: 'top-[5%] left-[3%] rotate-[-8deg] hover:rotate-[-5deg] hover:scale-110', w: 260, h: 195, delay: 0 },
			{ src: '/IMG_0315.JPG', className: 'top-[12%] right-[5%] rotate-[6deg] hover:rotate-[9deg] hover:scale-110', w: 250, h: 185, delay: 200 },
			{ src: '/DSC09334.JPG', className: 'bottom-[8%] left-[6%] rotate-[4deg] hover:rotate-[7deg] hover:scale-110', w: 280, h: 210, delay: 400 },
			{ src: '/IMG_7002.JPG', className: 'bottom-[12%] right-[8%] rotate-[-5deg] hover:rotate-[-2deg] hover:scale-110', w: 240, h: 180, delay: 600 },
			{ src: '/ISIMG-826079.JPG', className: 'top-[22%] left-[20%] rotate-[2deg] hover:rotate-[5deg] hover:scale-110', w: 240, h: 180, delay: 800 },
			{ src: '/IMG_1454.JPG', className: 'bottom-[22%] right-[20%] rotate-[8deg] hover:rotate-[11deg] hover:scale-110', w: 230, h: 175, delay: 1000 },
			{ src: '/IMG_0315.JPG', className: 'top-[28%] right-[30%] rotate-[3deg] hover:rotate-[6deg] hover:scale-110', w: 250, h: 185, delay: 1200 },
			{ src: '/DSC09334.JPG', className: 'bottom-[18%] left-[30%] rotate-[-7deg] hover:rotate-[-4deg] hover:scale-110', w: 260, h: 195, delay: 1400 },
		],
		[]
	)

	return (
		<div
			className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 transition-all duration-1000 ${
				visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-110'
			}`}
			aria-hidden={!visible}>
			
			{/* Animowane tło z delikatnym wzorem */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse"></div>
			</div>

			<div className="relative w-full h-full overflow-hidden">
				{/* Logo z zaawansowaną animacją */}
				<div
					className={`absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 transform transition-all duration-1000 ease-out ${
						logoAnimated 
							? 'opacity-100 translate-y-0 scale-100' 
							: 'opacity-0 -translate-y-8 scale-90'
					}`}>
					<div className="relative">
						<Image 
							src="/logoyelon.png" 
							alt="logo" 
							width={48} 
							height={48} 
							className={`w-12 h-12 object-contain transition-transform duration-300 ${
								logoAnimated ? 'animate-pulse' : ''
							}`}
							priority
						/>
						<div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 opacity-40 animate-ping"></div>
					</div>
					<span className={`text-white font-bold tracking-widest text-lg transition-all duration-700 ${
						logoAnimated ? 'translate-x-0' : 'translate-x-4'
					}`}>
						YELON MEDIA
					</span>
				</div>

				{/* Floating stickers z ulepszonymi animacjami */}
				<div className="absolute inset-0 pointer-events-none select-none">
					{stickers.map((s, idx) => (
						<div
							key={`${s.src}-${idx}`}
							className={`absolute ${s.className.split(' ').slice(0, -2).join(' ')} transition-all duration-500 ease-out`}
							style={{
								opacity: mounted ? 1 : 0,
								transform: mounted 
									? `${s.className.includes('rotate') ? s.className.match(/rotate-\[([^\]]+)\]/)?.[0] || '' : ''} scale(1)` 
									: 'scale(0.8) translateY(20px)',
								transitionDelay: `${s.delay}ms`,
								filter: 'brightness(1.1) contrast(1.2) saturate(1.1)',
							}}>
							<Image
								src={s.src}
								alt={`memory-${idx + 1}`}
								width={s.w}
								height={s.h}
								className="rounded-xl shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-white/20 hover:border-white/40"
								style={{
									objectFit: 'cover',
									imageRendering: 'auto',
								}}
								priority={idx < 4}
								quality={95}
							/>
							{/* Dodatkowy efekt świetlny */}
							<div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
						</div>
					))}
				</div>

				{/* Główny tekst z efektami - przesunięty w dół */}
				<div className="absolute inset-0 flex items-center justify-center translate-y-8">
					<div
						className={`text-center px-6 transform transition-all duration-1200 ease-out ${
							mounted 
								? 'opacity-100 translate-y-0 scale-100' 
								: 'opacity-0 translate-y-6 scale-95'
						}`}
						style={{ transitionDelay: '600ms' }}>
						<h1 className="relative text-4xl md:text-6xl font-black tracking-wide text-white mb-4">
							<span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
								Witaj w świecie
							</span>
							<br />
							<span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
								mojej fotografii
							</span>
							
							{/* Efekt podświetlenia */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-2xl animate-pulse"></div>
						</h1>
						
						{/* Subtext z opóźnieniem */}
						<p 
							className={`text-gray-300 text-lg md:text-xl font-light tracking-wider transition-all duration-800 ${
								mounted ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
							}`}
							style={{ transitionDelay: '1000ms' }}>
							Chwile zamknięte w kadrze
						</p>
					</div>
				</div>

				{/* Dodatkowe efekty wizualne */}
				<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
				<div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent"></div>
			</div>
		</div>
	)
}