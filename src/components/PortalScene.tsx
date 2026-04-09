import { useEffect, useMemo } from 'react';
import { MeshBasicMaterial, Mesh, SRGBColorSpace, DoubleSide } from 'three';
import { useLoader } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import Fireflies from './Fireflies/Fireflies';

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
        () => new MeshBasicMaterial({ color: 0xffecec, side: DoubleSide }),
        []
    );

    useEffect(() => {
        const poleLightA = gltf.scene.getObjectByName('poleLightA') as Mesh
        const poleLightB = gltf.scene.getObjectByName('poleLightB') as Mesh
        const portalLight = gltf.scene.getObjectByName('portalLight') as Mesh
        const baked = gltf.scene.getObjectByName('baked') as Mesh

        if (poleLightA) poleLightA.material = poleLightMaterial
        if (poleLightB) poleLightB.material = poleLightMaterial
        if (portalLight) portalLight.material = portalLightMaterial
        if (baked) baked.material = bakedMaterial

    }, [gltf, bakedMaterial, poleLightMaterial, portalLightMaterial])

    return (
        <>
            <Fireflies />
            <primitive object={gltf.scene} />
        </>
    )
}

export default PortalScene;