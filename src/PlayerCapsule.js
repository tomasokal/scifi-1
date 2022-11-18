import { Trail, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function PlayerCapsule()
{

    // Set up for player capsule
    const capsule = useRef()

    // Set up for physics
    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

    // Camera references
    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

    // Set up for keyboard controls
    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    // Control functions
    const jump = () =>
    {

        // const origin = body.current.translation()
        // origin.y -= 0.31
        // const direction = { x: 0, y: -1, z: 0 }
        // const ray = new rapier.Ray(origin, direction)
        // const hit = rapierWorld.castRay(ray, 10, true)
        
        // if(hit.toi < 0.15)
        //     body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })

    }

    // useEffect for jump and unsubscribe from keys
    useEffect(() =>
    {

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) =>
            {
                if(value)
                {
                    jump()
                }
            }
        )

        // const unsubscribeAny = subscribeKeys(
        //     () =>
        //     {
        //         start()
        //     }
        // )

        return () =>
        {
            unsubscribeJump()
            // unsubscribeAny()
        }
    })

    // Player capsule frame update
    useFrame((state, delta) =>
    {
        
        const { forward, backward, leftward, rightward } = getKeys()

        const t = state.clock.getElapsedTime() * 6
        // console.log(state.clock)

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 100 * delta
        const torqueStrength = 50 * delta

        const capsuleDirection = new THREE.Vector3( 0, 0, 1 )
        capsuleDirection.applyQuaternion( capsule.current.rotation() )

        const impulseCartesian = { x: 0, y: 0, z: 0 }

        if(forward)
        {
            impulseCartesian.z -= capsuleDirection.x * impulseStrength
            impulseCartesian.x += capsuleDirection.z * impulseStrength
        }

        if(leftward)
        {
            torque.y += torqueStrength
        }

        if(rightward)
        {
            torque.y -= torqueStrength
        }

        capsule.current.applyImpulse(impulseCartesian)
        capsule.current.applyTorqueImpulse(torque)

        // Set camera to follow capsule
        const capsulePosition = capsule.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(capsulePosition)
        cameraPosition.z += 25
        cameraPosition.y += 15

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(capsulePosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

    })

    return <>
        <Trail
            width={2}
            length={12}
            color={'#F8D628'}
            attenuation={(t) => {
                return t * t
            }}
        >
            <RigidBody 
                ref={ capsule } 
                colliders= { false }
                mass={ 2 }
                gravityScale={ 0 }
                restitution={ 0.2 } 
                friction={ 1 } 
                linearDamping={ 0.5 }
                angularDamping={ 0.75 }
                position={ [ 0, 2, 0 ] }
                rotation={ [ 0, 0, Math.PI / 2 ] }
                // enabledRotations={ false }
            >
                <mesh castShadow >
                    <capsuleGeometry args={ [ 1, 2, 32, 64 ] } />
                    <meshStandardMaterial 
                        color={ '#244554'} 
                        roughness={0} 
                        metalness={0.1} 
                    />
                </mesh>
                {/* <mesh position={ [-1, 0, 0 ]} castShadow >
                    <sphereGeometry/>
                    <meshStandardMaterial 
                        color={ '#244554'} 
                        roughness={0} 
                        metalness={0.1} 
                    />
                </mesh> */}
                <CapsuleCollider 
                    args={ [ 1.3, 1.3, 1.3 ] } 
                />
            </RigidBody>
        </Trail>
    </>

}