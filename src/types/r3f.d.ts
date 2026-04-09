import { ReactThreeFiber } from '@react-three/fiber'
import FireflyMaterial from '../components/Fireflies/FireflyMaterial'

declare module '@react-three/fiber' {
    interface ThreeElements {
        fireflyMaterial: ReactThreeFiber.MaterialNode<typeof FireflyMaterial, typeof FireflyMaterial>
    }
}

export {}