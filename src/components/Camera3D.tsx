'use client'

import { useEffect, useRef, useState } from 'react'
// Selektywny import Three.js
import { Scene, PerspectiveCamera, WebGLRenderer, Object3D } from 'three'
import * as THREE from 'three' // Dodaję pełny import dla THREE.Mesh
// Usuwam własny interfejs GLTF i użyję any, a następnie GLTFLoader zaimportuję dynamicznie

interface SmilePopupProps {
	x: number
	y: number
	visible: boolean
	tailDirection: 'top' | 'bottom'
}

const Camera3D = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [smilePopup, setSmilePopup] = useState<SmilePopupProps>({
		x: 0,
		y: 0,
		visible: false,
		tailDirection: 'bottom',
	})
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true
		let animationFrameId: number
		let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, model: Object3D
		let targetRotationY = 0,
			targetRotationX = 0
		let currentRotationY = 0,
			currentRotationX = 0
		let flashInterval: ReturnType<typeof setInterval>

		// Funkcja czyszcząca zasoby - przeniesiona na poziom useEffect
		const cleanup = () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}

			if (flashInterval) {
				clearInterval(flashInterval)
			}

			// Usuń event listenery
			const heroSection = document.querySelector('#home') as HTMLElement
			if (heroSection) {
				heroSection.removeEventListener('mousemove', handleMouseMove)
			}

			if (containerRef.current) {
				containerRef.current.removeEventListener('mousemove', handleMouseMove)
			}

			if (renderer) {
				renderer.dispose()
			}

			if (scene) {
				// Czyszczenie sceny
				while (scene.children && scene.children.length > 0) {
					const object = scene.children[0]

					// Sprawdzamy czy obiekt jest typu Mesh przed dostępem do geometry
					if (object instanceof THREE.Mesh && object.geometry) {
						object.geometry.dispose()
					}

					// Sprawdzamy czy obiekt ma właściwość material
					if ('material' in object) {
						const objWithMaterial = object as THREE.Mesh
						if (objWithMaterial.material) {
							if (Array.isArray(objWithMaterial.material)) {
								objWithMaterial.material.forEach(material => material.dispose())
							} else {
								objWithMaterial.material.dispose()
							}
						}
					}

					scene.remove(object)
				}
			}
		}

		// Ograniczenie zakresu obrotu
		const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

		// Śledzenie myszy na całej sekcji hero
		const handleMouseMove = (event: MouseEvent) => {
			// Znajdź sekcję hero
			const heroSection = document.querySelector('#home') as HTMLElement
			if (!heroSection) return

			const rect = heroSection.getBoundingClientRect()
			const mouseNormX = ((event.clientX - rect.left) / rect.width) * 2 - 1
			const mouseNormY = -((event.clientY - rect.top) / rect.height) * 2 + 1

			// Odwróć kierunki żeby mysz szła w prawidłowym kierunku
			targetRotationY = clamp(mouseNormX * 0.6, -Math.PI / 3, Math.PI / 3) // Normalny kierunek X
			targetRotationX = clamp(-mouseNormY * 0.4, -Math.PI / 4, Math.PI / 4) // Odwrócony Y
		}

		const initCamera = async () => {
			if (!containerRef.current || !mounted) return

			const container = containerRef.current
			const width = container.clientWidth
			const height = container.clientHeight

			if (width === 0 || height === 0) {
				console.warn('Container has zero dimensions, retrying...')
				setTimeout(initCamera, 100)
				return
			}

			try {
				// Selektywny import tylko potrzebnych modułów z Three.js
				const {
					Scene,
					PerspectiveCamera,
					WebGLRenderer,
					AmbientLight,
					DirectionalLight,
					PointLight,
					SRGBColorSpace,
					Box3,
					Vector3,
					ACESFilmicToneMapping,
					PCFSoftShadowMap,
					MeshStandardMaterial,
				} = await import('three')
				const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

				if (!mounted || !containerRef.current) return

				// Clear any existing content
				container.innerHTML = ''

				scene = new Scene()

				// Camera
				camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
				camera.position.set(0, 0, 5)
				camera.lookAt(0, 0, 0)

				// Renderer with transparent background - dodana obsługa błędów WebGL
				try {
					renderer = new WebGLRenderer({
						antialias: true,
						alpha: true,
						premultipliedAlpha: false,
						preserveDrawingBuffer: true,
						powerPreference: 'default',
						failIfMajorPerformanceCaveat: false,
					})
				} catch (webglError) {
					console.error('WebGL initialization failed:', webglError)
					// Fallback - pokaż komunikat zamiast modelu 3D
					container.innerHTML = `
						<div style="
							display: flex;
							align-items: center;
							justify-content: center;
							height: 100%;
							color: #6da5c0;
							font-size: 18px;
							text-align: center;
							padding: 20px;
							background: rgba(0,0,0,0.1);
							border-radius: 12px;
							border: 1px solid rgba(109, 165, 192, 0.2);
						">
							<div>
								<div style="font-size: 48px; margin-bottom: 16px;">📷</div>
								<div>Model 3D aparatu</div>
								<div style="font-size: 14px; opacity: 0.7; margin-top: 8px;">
									WebGL niedostępny w tej przeglądarce
								</div>
							</div>
						</div>
					`
					return
				}

				// Sprawdź czy renderer został utworzony poprawnie
				if (!renderer || !renderer.getContext()) {
					throw new Error('WebGL context could not be created')
				}

				renderer.setSize(width, height)
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
				renderer.setClearColor(0x000000, 0)
				renderer.shadowMap.enabled = true
				renderer.shadowMap.type = PCFSoftShadowMap
				renderer.outputColorSpace = SRGBColorSpace
				renderer.toneMapping = ACESFilmicToneMapping
				renderer.toneMappingExposure = 1.2

				// Sprawdź czy kontener nadal istnieje przed dodaniem canvas
				if (!container.parentNode) {
					renderer.dispose()
					return
				}

				container.appendChild(renderer.domElement)

				// Obsługa utraty kontekstu WebGL
				renderer.domElement.addEventListener('webglcontextlost', (event: Event) => {
					console.warn('WebGL context lost')
					event.preventDefault()
					setError('WebGL context lost - odśwież stronę')
				})

				renderer.domElement.addEventListener('webglcontextrestored', () => {
					console.log('WebGL context restored')
					setError(null)
					// Ponownie zainicjalizuj scenę
					setTimeout(initCamera, 100)
				})

				// Jasne oświetlenie - rozświetlenie modelu
				const ambientLight = new AmbientLight(0xffffff, 1.5)
				scene.add(ambientLight)

				// Główne światło z przodu
				const directionalLight1 = new DirectionalLight(0xffffff, 2.0)
				directionalLight1.position.set(0, 5, 8)
				directionalLight1.castShadow = true
				scene.add(directionalLight1)

				// Światło z lewej strony
				const directionalLight2 = new DirectionalLight(0xffffff, 1.5)
				directionalLight2.position.set(-8, 3, 3)
				scene.add(directionalLight2)

				// Światło z prawej strony
				const directionalLight3 = new DirectionalLight(0xffffff, 1.5)
				directionalLight3.position.set(8, 3, 3)
				scene.add(directionalLight3)

				// Światło z góry
				const directionalLight4 = new DirectionalLight(0xffffff, 1.2)
				directionalLight4.position.set(0, 10, 0)
				scene.add(directionalLight4)

				// Delikatne światło z tyłu żeby rozjaśnić cienie
				const directionalLight5 = new DirectionalLight(0xffffff, 0.8)
				directionalLight5.position.set(0, -3, -5)
				scene.add(directionalLight5)

				// Point light blisko kamery dla dodatkowego blasku
				const pointLight = new PointLight(0xffffff, 2.0, 10)
				pointLight.position.set(0, 2, 6)
				scene.add(pointLight)

				// Dodaj event listener do całej sekcji hero
				const heroSection = document.querySelector('#home') as HTMLElement
				if (heroSection) {
					heroSection.addEventListener('mousemove', handleMouseMove)
					console.log('🎯 Event listener dodany do sekcji hero')
				} else {
					// Fallback - jeśli nie ma sekcji hero, użyj kontenera
					container.addEventListener('mousemove', handleMouseMove)
					console.log('⚠️ Fallback: event listener na kontenerze aparatu')
				}

				// Animation loop - prosta animacja za myszką
				const animate = () => {
					if (!mounted) return
					animationFrameId = requestAnimationFrame(animate)

					// Płynne przejście do target rotacji
					currentRotationX += (targetRotationX - currentRotationX) * 0.15
					currentRotationY += (targetRotationY - currentRotationY) * 0.15

					// ZAWSZE obracaj cały model kamery
					if (model) {
						model.rotation.x = currentRotationX
						model.rotation.y = currentRotationY
					}

					renderer.render(scene, camera)
				}

				// Load model - nowy model aparatu
				const loader = new GLTFLoader()
				console.log('🚀 Loading new camera model: /models/scene.gltf')
				loader.load(
					'/models/scene.gltf',
					gltf => {
						if (!mounted) return

						model = gltf.scene

						// PROSTE pozycjonowanie - bez żadnych obrotów
						model.position.set(0, 0, 0)
						model.rotation.set(0, 0, 0) // ZEROWE obroty - naturalna orientacja
						model.scale.set(1, 1, 1)

						// Znajdź bounding box modelu
						const box = new Box3().setFromObject(model)
						const size = box.getSize(new Vector3())

						// Skaluj model żeby był większy i lepiej widoczny
						const maxSize = Math.max(size.x, size.y, size.z)

						if (maxSize > 0) {
							const scale = 5 / maxSize // Zwiększona skala z 2 na 5
							model.scale.setScalar(scale)
						} else {
							model.scale.setScalar(0.3) // Zwiększona skala fallback z 0.1 na 0.3
						}

						// Wycentruj model po skalowaniu
						const scaledBox = new Box3().setFromObject(model)
						const scaledCenter = scaledBox.getCenter(new Vector3())
						model.position.copy(scaledCenter).multiplyScalar(-1)

						// Popraw materiały - jaśniejsze i bardziej refleksyjne
						model.traverse((child: Object3D) => {
							if ('isMesh' in child && child.isMesh) {
								const mesh = child as THREE.Mesh
								mesh.castShadow = true
								mesh.receiveShadow = true

								if (mesh.material) {
									if (Array.isArray(mesh.material)) {
										mesh.material.forEach(mat => {
											if (mat instanceof MeshStandardMaterial) {
												mat.metalness = 0.6 // Zwiększone z 0.3 - bardziej metaliczny
												mat.roughness = 0.4 // Zmniejszone z 0.7 - bardziej gładki/refleksyjny
												mat.envMapIntensity = 1.5 // Więcej refleksji środowiska
												mat.needsUpdate = true
											}
										})
									} else if (mesh.material instanceof MeshStandardMaterial) {
										mesh.material.metalness = 0.6
										mesh.material.roughness = 0.4
										mesh.material.envMapIntensity = 1.5
										mesh.material.needsUpdate = true
									}
								}
							}
						})

						scene.add(model)
						animate()
						setIsLoading(false)
						startFlashEffect()
					},
					progress => {
						console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%')
					},
					error => {
						console.error('Error loading model:', error)
						setError('Błąd ładowania modelu 3D')
					}
				)

				// Flash effect function
				const startFlashEffect = () => {
					flashInterval = setInterval(() => {
						showSmilePopupBeforeFlash()
						setTimeout(() => {
							triggerFlash()
						}, 1500)
					}, 6500)
				}

				const showSmilePopupBeforeFlash = () => {
					if (!mounted) return

					const rect = container.getBoundingClientRect()
					const randomX = Math.random() * (rect.width - 150) + 75
					const randomY = Math.random() * (rect.height - 100) + 50

					setSmilePopup({
						x: randomX,
						y: randomY,
						visible: true,
						tailDirection: Math.random() > 0.5 ? 'bottom' : 'top',
					})

					setTimeout(() => {
						setSmilePopup(prev => ({ ...prev, visible: false }))
					}, 1200)
				}

				const triggerFlash = () => {
					const heroSection = document.querySelector('#home') as HTMLElement
					if (!heroSection) return

					const rect = heroSection.getBoundingClientRect()
					const isHeroVisible = rect.bottom > 0 && rect.top < window.innerHeight

					if (isHeroVisible) {
						const flash = document.createElement('div')
						flash.className = 'absolute inset-0 bg-white pointer-events-none z-50'
						flash.style.animation = 'flash 0.15s ease-out'
						flash.style.position = 'absolute'
						flash.style.top = '0'
						flash.style.left = '0'
						flash.style.right = '0'
						flash.style.bottom = '0'

						heroSection.style.position = 'relative'
						heroSection.appendChild(flash)

						setTimeout(() => {
							if (flash.parentNode) {
								flash.remove()
							}
						}, 200)
					}
				}

				setIsLoading(false)
			} catch (error) {
				console.error('Error initializing 3D camera:', error)
				setError('Błąd ładowania modelu 3D')
				setIsLoading(false)
			}
		}

		initCamera()

		return () => {
			mounted = false
			cleanup()
		}
	}, [])

	if (error) {
		return (
			<div className="w-full h-[500px] rounded-2xl overflow-hidden flex items-center justify-center bg-stone-800/50">
				<div className="text-center text-white p-8">
					<div className="text-6xl mb-4">📷</div>
					<div className="text-xl font-medium mb-2">Model 3D aparatu</div>
					<div className="text-sm opacity-70">{error}</div>
				</div>
			</div>
		)
	}

	return (
		<div className="relative w-full h-[500px]">
			<div
				ref={containerRef}
				className="w-full h-full cursor-grab active:cursor-grabbing"
				style={{ background: 'transparent' }}
			/>

			{/* Loading indicator */}
			{isLoading && (
				<div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-stone-800/50 rounded-2xl">
					<div className="text-lg font-medium mb-2">Ładowanie modelu 3D...</div>
					<div className="text-sm opacity-80 mb-4">Aparat będzie robić zdjęcia co 6,5 sekund!</div>
					<div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
				</div>
			)}

			{/* Smile popup */}
			{smilePopup.visible && (
				<div
					className="absolute pointer-events-none z-10 transition-all duration-300"
					style={{
						left: `${smilePopup.x}px`,
						top: `${smilePopup.y}px`,
						transform: 'translate(-50%, -50%)',
					}}>
					<div className="bg-white text-stone-800 px-4 py-2 rounded-xl font-bold text-sm shadow-lg border-2 border-stone-200 relative animate-bounce">
						Uśmiech! 📸
						<div
							className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 ${
								smilePopup.tailDirection === 'bottom'
									? 'bottom-[-6px] border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white'
									: 'top-[-6px] border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white'
							}`}
						/>
					</div>
				</div>
			)}

			<style jsx>{`
				@keyframes flash {
					0% {
						opacity: 0;
					}
					50% {
						opacity: 0.8;
					}
					100% {
						opacity: 0;
					}
				}
			`}</style>
		</div>
	)
}

export default Camera3D
