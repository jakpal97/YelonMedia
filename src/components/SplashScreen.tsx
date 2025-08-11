'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

interface SplashScreenProps {
	durationMs?: number
}

export default function SplashScreen({ durationMs = 3000 }: SplashScreenProps) {
	const [visible, setVisible] = useState(true)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const id = window.setTimeout(() => setVisible(false), durationMs)
		return () => window.clearTimeout(id)
	}, [durationMs])

	const stickers = useMemo(
		() => [
			// Sekwencja pojawiania (co ~180ms)
			{ src: '/IMG_1454.JPG', className: 'top-[10%] left-[8%] rotate-[-8deg]', w: 160, h: 120, delay: 0 },
			{ src: '/IMG_0315.JPG', className: 'top-[18%] right-[12%] rotate-[6deg]', w: 150, h: 110, delay: 180 },
			{ src: '/DSC09334.JPG', className: 'bottom-[12%] left-[15%] rotate-[4deg]', w: 170, h: 130, delay: 360 },
			{ src: '/IMG_7002.JPG', className: 'bottom-[18%] right-[18%] rotate-[-5deg]', w: 140, h: 105, delay: 540 },
			{ src: '/ISIMG-826079.JPG', className: 'top-[30%] left-[30%] rotate-[2deg]', w: 140, h: 105, delay: 720 },
			{ src: '/IMG_1454.JPG', className: 'bottom-[30%] right-[30%] rotate-[8deg]', w: 130, h: 98, delay: 900 },
			// Dwie nowe wlepki
			{ src: '/IMG_0315.JPG', className: 'top-[35%] right-[40%] rotate-[3deg]', w: 150, h: 110, delay: 1080 },
			{ src: '/DSC09334.JPG', className: 'bottom-[28%] left-[42%] rotate-[-7deg]', w: 160, h: 120, delay: 1260 },
		],
		[]
	)

	return (
		<div
			className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${
				visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
			}`}
			aria-hidden={!visible}>
			<div className="relative w-full h-full overflow-hidden">
				{/* Top logo */}
				<div
					className={`absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 ${
						mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
					} transition-all duration-700`}>
					<Image src="/logoyelon.png" alt="logo" width={48} height={48} className="w-10 h-10 object-contain" />
					<span className="text-white font-semibold tracking-wide">YELON MEDIA</span>
				</div>

				{/* Floating stickers/images with fade-in */}
				<div className="absolute inset-0 pointer-events-none select-none">
					{stickers.map((s, idx) => (
						<Image
							key={`${s.src}-${idx}`}
							src={s.src}
							alt={`sticker-${idx + 1}`}
							width={s.w}
							height={s.h}
							className={`absolute ${s.className} opacity-0 rounded-lg`}
							style={{
								opacity: mounted ? 0.6 : 0,
								transform: mounted ? undefined : 'scale(0.95)',
								transition: `opacity 800ms ease ${s.delay}ms, transform 800ms ease ${s.delay}ms`,
							}}
						/>
					))}
				</div>

				{/* Center text */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div
						className={`text-center px-6 transform transition-all duration-700 ${
							mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
						}`}>
						<h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-white mb-3">
							Witaj w świecie mojej fotografii
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}
