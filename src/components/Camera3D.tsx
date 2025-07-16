'use client'

import { useEffect, useRef, useState } from 'react'
import { Scene, PerspectiveCamera, WebGLRenderer, Object3D } from 'three'
import * as THREE from 'three'

// Cache dla modelu GLTF
let cachedModel: Object3D | null = null

const Camera3D = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true
		let animationFrameId: number
		let scene: Scene
		let camera: PerspectiveCamera
		let renderer: WebGLRenderer
		let model: Object3D
		let currentRotationX = 0
		let currentRotationY = 0
		let targetRotationX = 0
		let targetRotationY = 0

		const cleanup = () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}

			if (containerRef.current) {
				containerRef.current.removeEventListener('mousemove', handleMouseMove)
			}

			if (renderer) {
				renderer.dispose()
			}

			if (scene) {
				while (scene.children && scene.children.length > 0) {
					const object = scene.children[0]
					if (object instanceof THREE.Mesh && object.geometry) {
						object.geometry.dispose()
					}
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

		const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

		const handleMouseMove = (event: MouseEvent) => {
			const heroSection = document.querySelector('#home') as HTMLElement
			if (!heroSection) return

			const rect = heroSection.getBoundingClientRect()
			const mouseNormX = ((event.clientX - rect.left) / rect.width) * 2 - 1
			const mouseNormY = -((event.clientY - rect.top) / rect.height) * 2 + 1

			targetRotationY = clamp(mouseNormX * 0.6, -Math.PI / 3, Math.PI / 3)
			targetRotationX = clamp(-mouseNormY * 0.4, -Math.PI / 4, Math.PI / 4)
		}

		const showModelFallback = () => {
			if (!containerRef.current?.parentNode) return
			containerRef.current.innerHTML = `
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
							Niedostępny w tej przeglądarce
						</div>
					</div>
				</div>
			`
			setIsLoading(false)
		}

		const loadModel = async (): Promise<Object3D | null> => {
			// Używaj cache jeśli dostępny
			if (cachedModel) {
				console.log('📦 Używam cache modelu')
				return cachedModel.clone()
			}

			try {
				const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
				const loader = new GLTFLoader()

				console.log('🚀 Ładowanie modelu aparatu')

				const gltf = await new Promise<{ scene: Object3D }>((resolve, reject) => {
					const timeout = setTimeout(() => reject(new Error('Timeout')), 8000)

					loader.load(
						'https://yelonmedia.s3.us-east-1.amazonaws.com/Model3D/scene.gltf',
						result => {
							clearTimeout(timeout)
							resolve(result)
						},
						undefined,
						error => {
							clearTimeout(timeout)
							reject(error)
						}
					)
				})

				cachedModel = gltf.scene
				console.log("✅ Model załadowany i cache'owany")
				return gltf.scene.clone()
			} catch (error) {
				console.error('❌ Błąd ładowania modelu:', error)
				return null
			}
		}

		const initCamera = async () => {
			if (!containerRef.current || !mounted) return

			const container = containerRef.current
			const width = container.clientWidth
			const height = container.clientHeight

			if (width === 0 || height === 0) {
				setTimeout(initCamera, 100)
				return
			}

			try {
				const {
					Scene,
					PerspectiveCamera,
					WebGLRenderer,
					AmbientLight,
					DirectionalLight,
					SRGBColorSpace,
					Box3,
					Vector3,
				} = await import('three')

				if (!mounted || !containerRef.current) return

				container.innerHTML = ''
				scene = new Scene()

				camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
				camera.position.set(0, 0, 5)
				camera.lookAt(0, 0, 0)

				// Uproszczony renderer
				try {
					renderer = new WebGLRenderer({
						antialias: false, // Wyłączone dla wydajności
						alpha: true,
						powerPreference: 'default',
					})
				} catch (webglError) {
					console.error('WebGL error:', webglError)
					showModelFallback()
					return
				}

				renderer.setSize(width, height)
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
				renderer.setClearColor(0x000000, 0)
				renderer.outputColorSpace = SRGBColorSpace

				container.appendChild(renderer.domElement)

				// Uproszczone oświetlenie - tylko 2 światła
				const ambientLight = new AmbientLight(0xffffff, 1.2)
				scene.add(ambientLight)

				const directionalLight = new DirectionalLight(0xffffff, 1.5)
				directionalLight.position.set(2, 5, 5)
				scene.add(directionalLight)

				// Event listener
				const heroSection = document.querySelector('#home') as HTMLElement
				if (heroSection) {
					heroSection.addEventListener('mousemove', handleMouseMove)
				} else {
					container.addEventListener('mousemove', handleMouseMove)
				}

				// Animacja ograniczona do 30 FPS
				let lastTime = 0
				const animate = (currentTime: number) => {
					if (!mounted) return
					animationFrameId = requestAnimationFrame(animate)

					if (currentTime - lastTime < 33) return // 30 FPS
					lastTime = currentTime

					currentRotationX += (targetRotationX - currentRotationX) * 0.15
					currentRotationY += (targetRotationY - currentRotationY) * 0.15

					if (model) {
						model.rotation.x = currentRotationX
						model.rotation.y = currentRotationY
					}

					renderer.render(scene, camera)
				}

				// Załaduj model
				try {
					const loadedModel = await loadModel()

					if (!mounted || !loadedModel) {
						showModelFallback()
						return
					}

					model = loadedModel

					// Pozycjonowanie
					model.position.set(0, 0, 0)
					model.rotation.set(0, 0, 0)
					model.scale.set(1, 1, 1)

					// Skalowanie
					const box = new Box3().setFromObject(model)
					const size = box.getSize(new Vector3())
					const maxSize = Math.max(size.x, size.y, size.z)

					if (maxSize > 0) {
						const scale = 5 / maxSize
						model.scale.setScalar(scale)
					} else {
						model.scale.setScalar(0.3)
					}

					// Wycentruj
					const scaledBox = new Box3().setFromObject(model)
					const center = scaledBox.getCenter(new Vector3())
					model.position.sub(center)

					scene.add(model)
					animate(0)
					setIsLoading(false)
					console.log('✅ Model 3D gotowy')
				} catch (modelError) {
					console.error('❌ Błąd modelu:', modelError)
					showModelFallback()
				}
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
				className={`w-full h-full rounded-2xl overflow-hidden bg-transparent camera-container ${
					isLoading ? 'camera-loading' : ''
				}`}
				style={{
					background: 'transparent',
				}}
			/>

			{/* Loading overlay */}
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-stone-900/50 rounded-2xl">
					<div className="text-center text-white">
						<div className="w-8 h-8 border-2 border-blue-300 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
						<div className="text-sm">Ładowanie modelu 3D...</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Camera3D
