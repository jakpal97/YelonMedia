// Nazwa cache'u
const CACHE_NAME = 'photographer-cache-v1'

// Lista zasobów do zapisania w cache
const urlsToCache = ['/', '/portfolio', '/contact', '/favicon.ico']

// Instalacja service workera
self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				console.log('Cache otwarty')
				return cache.addAll(urlsToCache)
			})
			.catch(error => {
				console.error('Błąd podczas cachowania zasobów:', error)
			})
	)
})

// Aktywacja service workera
self.addEventListener('activate', event => {
	const cacheWhitelist = [CACHE_NAME]
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						// Usuń stare cache
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})

// Strategia cache-first dla statycznych zasobów, network-first dla API
self.addEventListener('fetch', event => {
	const request = event.request
	const url = new URL(request.url)

	// Sprawdź czy to żądanie do tej samej domeny
	const isSameOrigin = url.origin === self.location.origin

	// Sprawdź czy to żądanie API
	const isApiRequest = url.pathname.startsWith('/api/')

	// Sprawdź czy to żądanie obrazu z Unsplash
	const isUnsplashImage = url.hostname === 'images.unsplash.com'

	// Dla obrazów z Unsplash - cache-first
	if (isUnsplashImage) {
		event.respondWith(
			caches.match(request).then(cachedResponse => {
				if (cachedResponse) {
					// Zwróć z cache, ale odśwież cache w tle
					const fetchPromise = fetch(request)
						.then(networkResponse => {
							// Aktualizuj cache
							const responseToCache = networkResponse.clone()
							caches.open(CACHE_NAME).then(cache => {
								cache.put(request, responseToCache)
							})
							return networkResponse
						})
						.catch(() => {
							// Jeśli nie można pobrać z sieci, zwróć z cache
							return cachedResponse
						})

					return cachedResponse
				}

				// Jeśli nie ma w cache, pobierz z sieci i zapisz w cache
				return fetch(request).then(response => {
					// Sprawdź czy odpowiedź jest poprawna
					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response
					}

					// Sklonuj odpowiedź - jedna do cache, druga do przeglądarki
					const responseToCache = response.clone()

					caches.open(CACHE_NAME).then(cache => {
						cache.put(request, responseToCache)
					})

					return response
				})
			})
		)
		return
	}

	// Dla API - zawsze network-first
	if (isApiRequest) {
		event.respondWith(
			fetch(request).catch(() => {
				return caches.match(request)
			})
		)
		return
	}

	// Dla statycznych zasobów z tej samej domeny - cache-first
	if (isSameOrigin) {
		event.respondWith(
			caches.match(request).then(response => {
				// Zwróć z cache, jeśli istnieje
				if (response) {
					return response
				}

				// W przeciwnym razie pobierz z sieci
				return fetch(request).then(networkResponse => {
					// Sprawdź czy odpowiedź jest poprawna
					if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
						return networkResponse
					}

					// Sklonuj odpowiedź - jedna do cache, druga do przeglądarki
					const responseToCache = networkResponse.clone()

					caches.open(CACHE_NAME).then(cache => {
						cache.put(request, responseToCache)
					})

					return networkResponse
				})
			})
		)
		return
	}

	// Dla pozostałych zasobów - network-first
	event.respondWith(
		fetch(request).catch(() => {
			return caches.match(request)
		})
	)
})
