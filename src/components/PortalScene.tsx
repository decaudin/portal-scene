import { useEffect, useMemo, useRef } from 'react';
import { MeshBasicMaterial, ShaderMaterial, Mesh, SRGBColorSpace, DoubleSide } from 'three';
import { extend, useLoader, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { PORTAL_COLORS } from '../constants/portalColors';
import gui from '../lib/gui';
import PortalLightMaterial from './PortalLightMaterial';
import Fireflies from './Fireflies/Fireflies';

extend({ PortalLightMaterial });

function PortalScene() {

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltf = useLoader(GLTFLoader, '/portal.glb', loader =>
        loader.setDRACOLoader(dracoLoader)
    );

    const bakedTexture = useTexture('/baked.jpg', tex => {
        tex.flipY = false;
        tex.colorSpace = SRGBColorSpace;
    });

    const bakedMaterial = useMemo(
        () => new MeshBasicMaterial({ map: bakedTexture }),
        [bakedTexture]
    );

    const poleLightMaterial = useMemo(
        () => new MeshBasicMaterial({ color: 0xffffe5 }),
        []
    );

    const portalLightMaterial = useMemo(
        () => new PortalLightMaterial({ side: DoubleSide }), 
        []
    );

    const portalMaterialRef = useRef<ShaderMaterial>(null!);

    useEffect(() => {
        const poleLightA = gltf.scene.getObjectByName('poleLightA') as Mesh;
        const poleLightB = gltf.scene.getObjectByName('poleLightB') as Mesh;
        const portalLight = gltf.scene.getObjectByName('portalLight') as Mesh;
        const baked = gltf.scene.getObjectByName('baked') as Mesh;

        if (poleLightA) poleLightA.material = poleLightMaterial;
        if (poleLightB) poleLightB.material = poleLightMaterial;
        if (baked) baked.material = bakedMaterial;

        if (portalLight) {
            portalLight.material = portalLightMaterial;
            portalMaterialRef.current = portalLight.material as ShaderMaterial;
        }

    }, [gltf, bakedMaterial, poleLightMaterial, portalLightMaterial]);

    useFrame(({ clock }) => {
        if (portalMaterialRef.current) portalMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    });

    const debugObject = useRef({
        portalColorStart: PORTAL_COLORS.start,
        portalColorEnd: PORTAL_COLORS.end
    });

    useEffect(() => {
        if (!gui) return;

        const folder = gui.addFolder('Portal');

        folder
            .addColor(debugObject.current, 'portalColorStart')
            .onChange(() => {
                portalLightMaterial.uniforms.uColorStart.value.set(
                    debugObject.current.portalColorStart
                );
            });

        folder
            .addColor(debugObject.current, 'portalColorEnd')
            .onChange(() => {
                portalLightMaterial.uniforms.uColorEnd.value.set(
                    debugObject.current.portalColorEnd
                );
            });

        return () => folder.destroy();
    }, [portalLightMaterial]);

    return (
        <>
            <Fireflies />
            <primitive object={gltf.scene} />
        </>
    )
}

export default PortalScene