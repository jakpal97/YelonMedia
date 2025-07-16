'use client'

import Stack from './Stack'

// Statyczne dane dla sekcji About
const aboutData = {
	title: 'O Mnie',
	subtitle: 'Jestem Tomek, fotografia jest pasją, która pozwala mi uwieczniać najważniejsze momenty życia.',
	description1: 'Od ponad 3 lat zajmuje się tworzeniem materiałów reklamowych w postaci zdjęć i filmów.',
	description2:
		'W fotografii ograniczyć nas może tylko wyobraźnia, dla tego jeśli chcesz stworzyć razem ze mną coś wyjątkowego, zapraszam do kontaktu.',
	stats: {
		clients: { number: '100', label: 'Zadowolonych Klientów' },
		experience: { number: '3', label: 'Lat Doświadczenia' },
		weddings: { number: '100+', label: 'Sesji' },
	},
	photos: ['/ISIMG-826079.JPG', '/IMG_0315.JPG', '/IMG_1454.JPG', '/DSC09334.JPG', '/IMG_7002.JPG'],
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
								<div className="text-center p-4 bg-card rounded-xl">
									<div className="text-3xl font-bold text-accent">{aboutData.stats.clients.number}</div>
									<div className="text-base font-semibold text-stone-400 mt-1">{aboutData.stats.clients.label}</div>
								</div>
								<div className="text-center p-4 bg-card rounded-xl">
									<div className="text-3xl font-bold text-accent">{aboutData.stats.experience.number}</div>
									<div className="text-base font-semibold text-stone-400 mt-1">{aboutData.stats.experience.label}</div>
								</div>
								<div className="text-center p-4 bg-card rounded-xl">
									<div className="text-3xl font-bold text-accent">{aboutData.stats.weddings.number}</div>
									<div className="text-base font-semibold text-stone-400 mt-1">{aboutData.stats.weddings.label}</div>
								</div>
							</div>
						</div>

						<div className="relative flex justify-center items-center min-h-[600px]">
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
