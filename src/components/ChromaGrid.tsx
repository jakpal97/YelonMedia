'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface ChromaGridItem {
	image: string
	title: string
	subtitle: string
	handle?: string
	location?: string
	borderColor?: string
	gradient: string
	url?: string
}

interface ChromaGridProps {
	items?: ChromaGridItem[]
	className?: string
	radius?: number
	damping?: number
	fadeOut?: number
	ease?: string
}

const ChromaGrid = ({
	items,
	className = '',
	radius = 300,
	damping = 0.45,
	fadeOut = 0.6,
	ease = 'power3.out',
}: ChromaGridProps) => {
	const rootRef = useRef<HTMLDivElement>(null)
	const fadeRef = useRef<HTMLDivElement>(null)
	const setX = useRef<((value: number) => void) | null>(null)
	const setY = useRef<((value: number) => void) | null>(null)
	const pos = useRef({ x: 0, y: 0 })

	const demo: ChromaGridItem[] = [
		{
			image: '/ISIMG-826079.JPG',
			title: 'Sesja Portretowa',
			subtitle: 'Naturalne portrety w plenerze',
			handle: '@portrait',
			borderColor: '#4F46E5',
			gradient: 'linear-gradient(145deg,#4F46E5,#000)',
			url: '#',
		},
		{
			image: '/IMG_0315.JPG',
			title: 'Fotografia Ślubna',
			subtitle: 'Magiczne momenty z ceremonii',
			handle: '@wedding',
			borderColor: '#10B981',
			gradient: 'linear-gradient(210deg,#10B981,#000)',
			url: '#',
		},
		{
			image: '/IMG_1454.JPG',
			title: 'Sesja Rodzinna',
			subtitle: 'Ciepłe chwile z bliskimi',
			handle: '@family',
			borderColor: '#F59E0B',
			gradient: 'linear-gradient(165deg,#F59E0B,#000)',
			url: '#',
		},
		{
			image: '/DSC09334.JPG',
			title: 'Fotografia Eventowa',
			subtitle: 'Ważne wydarzenia w życiu',
			handle: '@events',
			borderColor: '#EF4444',
			gradient: 'linear-gradient(195deg,#EF4444,#000)',
			url: '#',
		},
		{
			image: '/IMG_7002.JPG',
			title: 'Sesja Biznesowa',
			subtitle: 'Profesjonalne portrety korporacyjne',
			handle: '@business',
			borderColor: '#8B5CF6',
			gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
			url: '#',
		},
		{
			image:
				'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			title: 'Fotografia Produktowa',
			subtitle: 'Stylizowane zdjęcia produktów',
			handle: '@product',
			borderColor: '#06B6D4',
			gradient: 'linear-gradient(135deg,#06B6D4,#000)',
			url: '#',
		},
		{
			image:
				'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			title: 'Sesja Modowa',
			subtitle: 'Stylizowane sesje fashion',
			handle: '@fashion',
			borderColor: '#EC4899',
			gradient: 'linear-gradient(255deg,#EC4899,#000)',
			url: '#',
		},
		{
			image:
				'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			title: 'Fotografia Artystyczna',
			subtitle: 'Kreatywne i konceptualne ujęcia',
			handle: '@art',
			borderColor: '#F97316',
			gradient: 'linear-gradient(285deg,#F97316,#000)',
			url: '#',
		},
		{
			image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			title: 'Sesja Lifestyle',
			subtitle: 'Naturalne ujęcia w codziennym życiu',
			handle: '@lifestyle',
			borderColor: '#14B8A6',
			gradient: 'linear-gradient(315deg,#14B8A6,#000)',
			url: '#',
		},
	]

	const data = items?.length ? items : demo

	useEffect(() => {
		const el = rootRef.current
		if (!el) return
		setX.current = gsap.quickSetter(el, '--x', 'px') as (value: number) => void
		setY.current = gsap.quickSetter(el, '--y', 'px') as (value: number) => void
		const { width, height } = el.getBoundingClientRect()
		pos.current = { x: width / 2, y: height / 2 }
		if (setX.current) setX.current(pos.current.x)
		if (setY.current) setY.current(pos.current.y)
	}, [])

	const moveTo = (x: number, y: number) => {
		gsap.to(pos.current, {
			x,
			y,
			duration: damping,
			ease,
			onUpdate: () => {
				setX.current?.(pos.current.x)
				setY.current?.(pos.current.y)
			},
			overwrite: true,
		})
	}

	const handleMove = (e: React.PointerEvent) => {
		if (!rootRef.current) return
		const r = rootRef.current.getBoundingClientRect()
		moveTo(e.clientX - r.left, e.clientY - r.top)
		gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
	}

	const handleLeave = () => {
		gsap.to(fadeRef.current, {
			opacity: 1,
			duration: fadeOut,
			overwrite: true,
		})
	}

	const router = useRouter()

	const handleCardClick = (url?: string) => {
		if (url && url !== '#') {
			router.push(url)
		}
	}

	const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
		const c = e.currentTarget as HTMLElement
		const rect = c.getBoundingClientRect()
		c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
		c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
	}

	return (
		<div
			ref={rootRef}
			onPointerMove={handleMove}
			onPointerLeave={handleLeave}
			className={`relative w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}
			style={
				{
					'--r': `${radius}px`,
					'--x': '50%',
					'--y': '50%',
				} as React.CSSProperties
			}>
			{data.map((c, i) => (
				<article
					key={i}
					onMouseMove={handleCardMove}
					onClick={() => handleCardClick(c.url)}
					className="group relative grid grid-rows-[1fr_auto] w-full h-[350px] rounded-[20px] overflow-hidden border border-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-lg"
					style={
						{
							'--card-border': c.borderColor || 'transparent',
							boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)`,
							'--spotlight-color': 'rgba(255,255,255,0.3)',
							background: `linear-gradient(to bottom, rgba(255,255,255,0.05), ${c.borderColor}20)`,
						} as React.CSSProperties
					}>
					<div
						className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
						style={{
							background:
								'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
						}}
					/>
					<div className="relative z-10 p-[10px] box-border min-h-0">
						<Image
							src={c.image}
							alt={c.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="w-full h-full object-cover rounded-[10px]"
							priority={i < 4} // Priorytetowe ładowanie pierwszych 4 obrazów
						/>
					</div>
					<footer className="relative z-50 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 bg-black/20 backdrop-blur-md min-h-[80px] border-t border-white/10">
						<h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
						<span className="text-[0.95rem] opacity-80 text-right">{c.handle || ''}</span>
						<p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
						{c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}
					</footer>
				</article>
			))}
			<div
				className="absolute inset-0 pointer-events-none z-30"
				style={{
					backdropFilter: 'grayscale(0.7) brightness(0.9)',
					WebkitBackdropFilter: 'grayscale(0.7) brightness(0.9)',
					background: 'rgba(0,0,0,0.001)',
					maskImage:
						'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.08) 30%,rgba(0,0,0,0.18)45%,rgba(0,0,0,0.28)60%,rgba(0,0,0,0.40)75%,rgba(0,0,0,0.55)88%,black 100%)',
					WebkitMaskImage:
						'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.08) 30%,rgba(0,0,0,0.18)45%,rgba(0,0,0,0.28)60%,rgba(0,0,0,0.40)75%,rgba(0,0,0,0.55)88%,black 100%)',
				}}
			/>
			<div
				ref={fadeRef}
				className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
				style={{
					backdropFilter: 'grayscale(0.7) brightness(0.9)',
					WebkitBackdropFilter: 'grayscale(0.7) brightness(0.9)',
					background: 'rgba(0,0,0,0.001)',
					maskImage:
						'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.85)30%,rgba(255,255,255,0.70)45%,rgba(255,255,255,0.55)60%,rgba(255,255,255,0.40)75%,rgba(255,255,255,0.25)88%,transparent 100%)',
					WebkitMaskImage:
						'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.85)30%,rgba(255,255,255,0.70)45%,rgba(255,255,255,0.55)60%,rgba(255,255,255,0.40)75%,rgba(255,255,255,0.25)88%,transparent 100%)',
					opacity: 1,
				}}
			/>
		</div>
	)
}

export default ChromaGrid
