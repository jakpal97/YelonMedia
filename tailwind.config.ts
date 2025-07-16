import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['var(--font-poppins)', 'sans-serif'],
				savate: ['var(--font-savate)', 'sans-serif'],
			},
			colors: {
				primary: {
					bg: '#2a2a2a',
					text: '#f1e7e7',
				},
				accent: {
					DEFAULT: '#7dd3fc',
					hover: '#93c5fd',
				},
				secondary: {
					bg: '#3a3a3a',
				},
				card: {
					bg: '#353535',
				},
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.8s ease-out',
				'fade-in-left': 'fadeInLeft 0.8s ease-out',
				'fade-in-right': 'fadeInRight 0.8s ease-out',
			},
			keyframes: {
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				fadeInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(50px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
			},
		},
	},
	plugins: [],
}

export default config
