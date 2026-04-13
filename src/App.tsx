import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import SceneControls from './components/SceneControls';
import PortalScene from './components/PortalScene';

function App() {
    return (
        <Canvas>
            <SceneControls />
            <OrbitControls 
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2 + 0.15}
            />
            <Center>
                <PortalScene />
            </Center>
        </Canvas>
    )
}

export default App