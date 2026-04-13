import { Color } from 'three';
import { shaderMaterial } from '@react-three/drei';
import { PORTAL_COLORS } from '../constants/portalColors';
import vertexShader from '../shaders/portalLight/vertex';
import fragmentShader from '../shaders/portalLight/fragment';

const PortalLightMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new Color(PORTAL_COLORS.start),
        uColorEnd: new Color(PORTAL_COLORS.end),
    },
    vertexShader,
    fragmentShader
)

export default PortalLightMaterial