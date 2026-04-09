import { shaderMaterial } from '@react-three/drei';

const vertexShader = `

    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;

    attribute float aScale;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin(uTime + modelPosition.x * 10.0) * aScale * 0.2;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;

        gl_Position = projectionPosition;

        gl_PointSize = uSize * aScale * uPixelRatio;
        gl_PointSize *= (1.0 / - viewPosition.z);
    }
`

const fragmentShader = `
    void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.05 / distanceToCenter - 0.05 * 2.0;

        gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
    }
`

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