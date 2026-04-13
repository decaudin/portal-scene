import { shaderMaterial } from '@react-three/drei';
import vertexShader from '../../shaders/firefly/vertex';
import fragmentShader from '../../shaders/firefly/fragment';

const FireflyMaterial = shaderMaterial(
    {
        uTime: 0,
        uPixelRatio: Math.min(window.devicePixelRatio, 2),
        uSize: 100
    },
    vertexShader,
    fragmentShader
)

export default FireflyMaterial