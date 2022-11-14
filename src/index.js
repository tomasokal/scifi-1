import './style.css'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'

import Experience from './Experience.js'
import Interface from './Interface.js'

const root = createRoot(document.querySelector('#root'))

root.render(

    <KeyboardControls
        map={ [
            { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
            { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
            { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
            { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
            { name: 'jump', keys: [ 'Space' ] }
        ] }
    >

        <Canvas
            shadows
        >
            <Experience />      
        </Canvas>

        <Interface />

    </KeyboardControls>


)