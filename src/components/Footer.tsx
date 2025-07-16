'use client'

import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub, FaYoutube } from 'react-icons/fa6'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="w-full pt-20 pb-8 flex flex-col items-center justify-center gap-6">
			{/* Linki */}
			<nav className="flex flex-wrap justify-center gap-8 text-base font-medium text-[#222] font-courier-prime">
				<a href="#" className="hover:text-blue-400 transition-colors">
					About
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors">
					Blog
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors">
					Jobs
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors">
					Press
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors">
					Accessibility
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors">
					Partners
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
				<a href="#" className="hover:text-blue-400 transition-colors" aria-label="X">
					<FaXTwitter />
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors" aria-label="GitHub">
					<FaGithub />
				</a>
				<a href="#" className="hover:text-blue-400 transition-colors" aria-label="YouTube">
					<FaYoutube />
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
