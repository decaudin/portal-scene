import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import PortalScene from './components/PortalScene';

function App() {
    return (
        <Canvas>
            <OrbitControls />
            <Center>
                <PortalScene />
            </Center>
        </Canvas>
    )
}

export default App