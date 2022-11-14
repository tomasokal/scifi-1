import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function PlayerCapsule()
{
    
    // Set up for player capsule
    const capsule = useRef()

    // Set up for physics
    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

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

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 100 * delta
        const torqueStrength = 100 * delta

        if(forward)
        {
            impulse.x += impulseStrength
        }

        if(backward)
        {
            impulse.x -= impulseStrength
        }

        if(leftward)
        {
            torque.y += torqueStrength
        }

        if(rightward)
        {
            torque.y -= torqueStrength
        }

        capsule.current.applyImpulse(impulse)
        capsule.current.applyTorqueImpulse(torque)

        console.log(capsule.current.rotation().y)

    })

    return <>
        <RigidBody 
            ref={ capsule } 
            restitution={ 0.2 } 
            friction={ 1 } 
            linearDamping={ 0.5 }
            angularDamping={ 0.5 }
            position={ [ 0, 2, 0 ] }
            gravityScale={ 0 }
        >
            <mesh 
                castShadow 
                rotation-z={ [ Math.PI / 2 ] } 
            >
                <capsuleGeometry args={ [ 1, 2, 32, 64 ] } />
                <meshStandardMaterial 
                    color={ '#244554'} 
                    roughness={0} 
                    metalness={0.1} 
                />
            </mesh>
        </RigidBody>
    </>

}