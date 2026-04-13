import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gui from '../lib/gui';

function SceneControls() {

    const { gl } = useThree();
    const debugObject = useRef({ clearColor: '#201919' });

    useEffect(() => {
        if (!gui) return;

        const folder = gui.addFolder('Scene');

        folder
            .addColor(debugObject.current, 'clearColor')
            .onChange(() => gl.setClearColor(debugObject.current.clearColor));

        return () => folder.destroy();
    }, [gl]);

    return null
}

export default SceneControls