import { useState, useRef, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { ShaderMaterial, AdditiveBlending } from 'three';
import gui from '../../lib/gui';
import FireflyMaterial from './FireflyMaterial';

type FireflyMaterialType = ShaderMaterial & { uSize: number };

extend({ FireflyMaterial });

function Fireflies() {

    const materialRef = useRef<FireflyMaterialType>(null!);
    const firefliesCount = 30;

    useFrame(({clock}) => {
        if (materialRef.current) materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    });

    const [positions] = useState(() => {
        const array = new Float32Array(firefliesCount * 3)

        for (let i = 0; i < firefliesCount; i++) {
            array[i * 3 + 0] = (Math.random() - 0.5) * 4
            array[i * 3 + 1] = Math.random() * 1.5
            array[i * 3 + 2] = (Math.random() - 0.5) * 4
        }

        return array
    });

    const [scales] = useState(() => {
        const array = new Float32Array(firefliesCount)

        for (let i = 0; i < firefliesCount; i++) {
            array[i] = Math.random()
        }

        return array
    })

    useEffect(() => {
        if (!gui || !materialRef.current) return;

        const folder = gui.addFolder('Fireflies');

        folder
            .add(materialRef.current, 'uSize')
            .min(0)
            .max(500)
            .step(1)
            .name('firefliesSize');

        return () => folder.destroy();
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    args={[scales, 1]}
                />
            </bufferGeometry>

            <fireflyMaterial
                ref={materialRef}
                uPixelRatio={Math.min(window.devicePixelRatio, 2)}
                transparent={true}
                blending={AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

export default Fireflies