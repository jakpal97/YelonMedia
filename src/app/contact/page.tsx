'use client'

import Navigation from '@/components/Navigation'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function ContactPage() {
	return (
		<main className="min-h-screen">
			<Navigation />

			{/* Contact Form */}
			<ContactForm />

			{/* Footer */}
			<Footer />
		</main>
	)
}
