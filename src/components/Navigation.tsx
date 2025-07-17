'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import GooeyNav from './GooeyNav'

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const pathname = usePathname()

	// Określam aktywny indeks na podstawie ścieżki
	const getActiveIndex = () => {
		if (pathname === '/') return 0
		if (pathname === '/portfolio') return 2
		if (pathname === '/blog') return 3
		if (pathname === '/contact') return 4
		return 0 // domyślnie Start
	}

	useEffect(() => {
		const handleScroll = () => {
			const scrolled = window.scrollY > 50
			setIsScrolled(scrolled)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	const navItems = [
		{ href: '/', label: 'Start' },
		{ href: '/#about', label: 'O Mnie' },
		{ href: '/portfolio', label: 'Portfolio' },
		{ href: '/contact', label: 'Kontakt' },
	]

	return (
		<nav
			className={`fixed  top-0 w-full z-50 transition-all duration-300 ${
				isScrolled ? 'backdrop-blur-md shadow-lg' : 'backdrop-blur-sm'
			}`}
			style={{
				background: isScrolled
					? 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.95) 50%, rgba(0,0,0,0.95) 100%)'
					: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,26,26,0.9) 50%, rgba(0,0,0,0.9) 100%)',
			}}>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
						<Image src="/logoyelon.png" alt="YELON MEDIA" width={120} height={64} className="h-16 w-auto" priority />
					</Link>

					{/* Desktop Menu - GooeyNav */}
					<div className="hidden md:block">
						<GooeyNav
							items={navItems}
							particleCount={12}
							particleDistances={[80, 8]}
							particleR={80}
							initialActiveIndex={getActiveIndex()}
							animationTime={500}
							timeVariance={200}
							colors={[1, 2, 3, 1, 2, 3, 1, 4]}
						/>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMenu}
						className="md:hidden text-stone-100 hover:text-blue-300 transition-colors duration-300"
						aria-label="Toggle menu">
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden transition-all duration-300 ease-in-out ${
						isMenuOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
					}`}>
					<div className="flex flex-col space-y-2 pt-2">
						{navItems.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className="text-stone-100 hover:text-blue-300 font-medium py-2 px-2 rounded transition-all duration-300 hover:bg-stone-700/50"
								onClick={closeMenu}>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navigation
