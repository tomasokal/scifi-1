import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Debug, Physics, RigidBody } from '@react-three/rapier'

import Lights from './Lights.js'
import PlayerCapsule from './PlayerCapsule.js'

export default function Experience()
{

    return <>   

        <color args={ [ '#f20f16' ] } attach="background" />  

        <OrbitControls />
        <Lights />

        <Physics>

            {/* <Debug /> */}

            <group>

                {/* <RigidBody ref={ref} type="kinematicPosition">
                    <mesh 
                        position-y={ [2] } 
                        rotation-z={ [ Math.PI / 2 ] } 
                        castShadow
                    >
                        <capsuleGeometry args={ [ 1, 2, 32, 64 ] } />
                        <meshStandardMaterial 
                            color={ '#244554'} 
                            roughness={0} 
                            metalness={0.1} 
                        />
                    </mesh>
                </RigidBody> */}

                <PlayerCapsule />
                

                <mesh 
                    position={ [ 0, -0.1, 0 ] }
                    scale={ [ 100, 0.2, 100 ] } 
                    receiveShadow 
                >
                    <boxGeometry />
                    <meshStandardMaterial 
                        color={ '#f2daac' }
                    />
                </mesh> 

            </group>

        </Physics>

    </>

}