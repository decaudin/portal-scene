import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

function SceneControls() {

    const { gl } = useThree();
    const debugObject = useRef({ clearColor: '#201919' });

    useEffect(() => {
        if (!import.meta.env.VITE_ENABLE_GUI) return;

        import('dat.gui').then((dat) => {
            const gui = new dat.GUI();
            gui.addColor(debugObject.current, 'clearColor').onChange(() => {
                gl.setClearColor(debugObject.current.clearColor);
            });
        });
    }, [gl]);

    return null;
}

export default SceneControls;