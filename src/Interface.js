import { useKeyboardControls } from '@react-three/drei'

export default function Interface()
{

    const forward = useKeyboardControls((state) => state.forward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const jump = useKeyboardControls((state) => state.jump)

    return <div className="interface">

        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={ `key ${forward ? 'active' : '' }` }>W</div>
            </div>
            <div className="raw">
                <div className={ `key ${leftward ? 'active' : '' }` }>A</div>
                <div className={ `key ${backward ? 'active' : '' }` }>S</div>
                <div className={ `key ${rightward ? 'active' : '' }` }>D</div>
            </div>
            <div className="raw">
                <div className={ `key large ${jump ? 'active' : '' }` }>SPACE</div>
            </div>
        </div>

    </div>
}