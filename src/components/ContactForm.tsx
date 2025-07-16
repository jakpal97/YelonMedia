'use client'

import { useState } from 'react'

interface FormData {
	name: string
	email: string
	phone: string
	subject: string
	message: string
}

const ContactForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			// Tu byłaby integracja z backend'em lub serwisem email
			await new Promise(resolve => setTimeout(resolve, 2000)) // Symulacja wysyłania
			setSubmitStatus('success')
			setFormData({
				name: '',
				email: '',
				phone: '',
				subject: '',
				message: '',
			})
		} catch {
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section id="contact" className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Główna karta formularz z efektem szkła */}
				<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
					<div className="grid lg:grid-cols-2 gap-0">
						{/* Lewa strona - Informacje kontaktowe */}
						<div className="p-8 lg:p-12 bg-gradient-to-br from-stone-900/40 to-black/60 backdrop-blur-lg">
							<div className="h-full flex flex-col justify-center">
								<h2 className="text-3xl lg:text-4xl font-bold text-stone-100 mb-4 leading-tight">
									Omów swoje <br />
									<span className="text-blue-300">fotograficzne</span> <br />
									potrzeby
								</h2>

								<p className="text-base text-stone-300 mb-8 leading-relaxed">
									Skontaktuj się ze mną aby omówić szczegóły Twojej sesji. Odpowiem na wszystkie pytania i pomogę wybrać
									najlepsze rozwiązania.
								</p>

								{/* Dane kontaktowe */}
								<div className="space-y-4">
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-blue-300/20 rounded-full flex items-center justify-center">
											<svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 4.5a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<div>
											<p className="text-stone-400 text-sm">Email</p>
											<p className="text-stone-200 font-medium">kontakt@photographer.com</p>
										</div>
									</div>

									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-blue-300/20 rounded-full flex items-center justify-center">
											<svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
												/>
											</svg>
										</div>
										<div>
											<p className="text-stone-400 text-sm">Telefon</p>
											<p className="text-stone-200 font-medium">+48 123 456 789</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Prawa strona - Formularz */}
						<div className="p-8 lg:p-12 bg-stone-50">
							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Name */}
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
										Imię i nazwisko
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										value={formData.name}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
										placeholder="Twoje imię i nazwisko"
									/>
								</div>

								{/* Email */}
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
										placeholder="twoj@email.com"
									/>
								</div>

								{/* Phone */}
								<div>
									<label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
										Telefon
									</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
										placeholder="+48 123 456 789"
									/>
								</div>

								{/* Subject */}
								<div>
									<label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
										Temat
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										required
										value={formData.subject}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
										placeholder="Rodzaj sesji lub inne"
									/>
								</div>

								{/* Message */}
								<div>
									<label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
										Wiadomość
									</label>
									<textarea
										id="message"
										name="message"
										required
										rows={3}
										value={formData.message}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all resize-none"
										placeholder="Opowiedz mi o swojej wizji sesji..."
									/>
								</div>

								{/* Submit Button */}
								<div className="pt-2">
									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full bg-blue-300 hover:bg-blue-400 text-stone-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
										{isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
									</button>
								</div>

								{/* Status Messages */}
								{submitStatus === 'success' && (
									<div className="text-center p-4 bg-green-100 border border-green-300 rounded-lg">
										<p className="text-green-700">Dziękuję za wiadomość! Odezwę się do Ciebie wkrótce.</p>
									</div>
								)}

								{submitStatus === 'error' && (
									<div className="text-center p-4 bg-red-100 border border-red-300 rounded-lg">
										<p className="text-red-700">
											Ups! Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się bezpośrednio.
										</p>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactForm
