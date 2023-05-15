import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024} 
      />
      <primitive 
        object={computer.scene} 
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -3, -1.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  // change the isMobile variable
  useEffect(() => {

    // add event listener that changes to the screen size
   const mediaQuery = window.matchMedia('(max-width: 500px)');

  //  set initial value of 'isMobile' state variable
   setIsMobile(mediaQuery.matches)

  //  Define a callback function to handle changes to the media query
   const handleMediaQueryChange = (event) => {
    setIsMobile(event.matches)
   }
  //  Add callback as a listener for the changes to the media query
   mediaQuery.addEventListener('change',handleMediaQueryChange)

  //  Remove the listener when component is unmounted
   return () => {
    mediaQuery.removeEventListener('change', handleMediaQueryChange)
   }
  }, [])
  

  return (
    <Canvas
      frameloop="demand"
      shadows
      // fov = field of view
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}>

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          // allows rotation only along a specific axis instead of all over. pi/2 = 90.
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas