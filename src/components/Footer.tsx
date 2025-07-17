'use client'

import { FaFacebookF, FaInstagram } from 'react-icons/fa6'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="w-full pt-20 pb-8 flex flex-col items-center justify-center gap-6">
			{/* Linki */}
			<nav className="flex flex-wrap justify-center gap-8 text-base font-medium text-[#222] font-courier-prime">
				<a href="#" className="hover:text-blue-400 transition-colors">
					Start
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors">
				 O Mnie
				</a>
				<a href="yelonmedia.pl/portfolio" className="hover:text-blue-400 transition-colors">
					Portfolio
				</a>
				<a href="yelonmedia.pl/kontakt" className="hover:text-blue-400 transition-colors">
					Kontakt
				</a>
				
			</nav>
			{/* Social media */}
			<div className="flex justify-center gap-8 text-2xl text-[#222] mt-2">
				<a href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
					<FaFacebookF />
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
					<FaInstagram />
				</a>
				
			</div>
			{/* Copyright */}
			<div className="text-[#222] text-sm mt-2 font-courier-prime text-center">
				© {currentYear} Made by AppLike. All rights reserved.
			</div>
		</footer>
	)
}

export default Footer
