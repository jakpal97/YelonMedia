'use client'

import Stack from './Stack'
import { Facebook, Instagram, ArrowRight } from 'lucide-react'

// Statyczne dane dla sekcji About
const aboutData = {
	title: 'O Mnie',
	subtitle: 'Jestem Tomek, fotografia jest pasją, która pozwala mi uwieczniać najważniejsze momenty życia.',
	description1: 'Od ponad 3 lat zajmuję się tworzeniem materiałów reklamowych w postaci zdjęć i filmów.',
	description2:
		'W fotografii ograniczyć nas może tylko wyobraźnia, dlatego jeśli chcesz stworzyć razem ze mną coś wyjątkowego, zapraszam do kontaktu.',
	stats: {
		clients: { number: '100', label: 'Zadowolonych Klientów' },
		experience: { number: '3', label: 'Lat Doświadczenia' },
		weddings: { number: '100+', label: 'Sesji' },
	},
	photos: [
		'https://yelonmedia.s3.us-east-1.amazonaws.com/Studia+Tattoo/6.jpg',
		'https://yelonmedia.s3.us-east-1.amazonaws.com/Eventy/5.jpg',
		'https://yelonmedia.s3.us-east-1.amazonaws.com/Gastro/2.jpg',
		'https://yelonmedia.s3.us-east-1.amazonaws.com/Modowe/3.jpg',
		'https://yelonmedia.s3.us-east-1.amazonaws.com/Motoryzacja/DSC03747.jpg',
		'/IMG_7002.JPG',
	],
}

const AboutSection = () => {
	// Przygotuj zdjęcia dla komponentu Stack
	const stackPhotos = aboutData.photos.map((photo, index) => ({
		id: index + 1,
		img: photo,
	}))

	return (
		<section id="about" className="py-20 relative">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center">
					<h2 className="font-courier-prime text-3xl md:text-6xl font-extrabold mb-4">{aboutData.title}</h2>
					<p className="font-courier-prime text-xl md:text-2xl font-semibold text-stone-200 mb-10">
						{aboutData.subtitle}
					</p>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6 text-left">
							<p className="font-courier-prime text-lg md:text-xl text-stone-300 leading-relaxed">
								{aboutData.description1}
							</p>
							<p className="font-courier-prime text-lg md:text-xl text-stone-300 leading-relaxed">
								{aboutData.description2}
							</p>

							<div className="grid grid-cols-3 gap-6 mt-8">
								<a
									href="https://www.facebook.com/profile.php?id=61579655309808"
									target="_blank"
									rel="noopener noreferrer"
									className="group text-center p-4 bg-card rounded-xl border border-stone-700 hover:border-stone-500 transition-colors">
									<div className="mx-auto w-12 h-12 rounded-full bg-blue-300/15 text-blue-300 flex items-center justify-center group-hover:bg-blue-300/25 transition-colors">
										<Facebook className="w-7 h-7" />
									</div>
									<div className="text-sm font-semibold text-stone-300 mt-3">Facebook</div>
								</a>

								<a
									href="https://www.instagram.com/yelon.media/"
									target="_blank"
									rel="noopener noreferrer"
									className="group text-center p-4 bg-card rounded-xl border border-stone-700 hover:border-stone-500 transition-colors">
									<div className="mx-auto w-12 h-12 rounded-full bg-pink-300/15 text-pink-300 flex items-center justify-center group-hover:bg-pink-300/25 transition-colors">
										<Instagram className="w-7 h-7" />
									</div>
									<div className="text-sm font-semibold text-stone-300 mt-3">Instagram</div>
								</a>

								<div className="text-center p-4 bg-card rounded-xl border border-stone-700">
									<div className="mx-auto w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center animate-pulse">
										<ArrowRight className="w-7 h-7" />
									</div>
									<div className="text-sm font-extrabold text-stone-100 mt-3 uppercase tracking-wider">Try me</div>
								</div>
							</div>
						</div>

						<div className="relative justify-center items-center min-h-[600px] hidden lg:flex">
							<Stack
								randomRotation={true}
								sensitivity={180}
								sendToBackOnClick={true}
								cardDimensions={{ width: 380, height: 480 }}
								cardsData={stackPhotos}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutSection
