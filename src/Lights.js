import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper } from 'three'

export default function Lights()
{

    const ref = useRef()
    // useHelper(ref, DirectionalLightHelper, 5)C

    return <>

        <ambientLight intensity={0.25} />
        <directionalLight
            ref={ref}
            intensity={0.5}
            position={ [0, 10, 10] }
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
        />

    </>

}