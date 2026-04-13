import GUI from 'lil-gui';

const gui = import.meta.env.VITE_ENABLE_GUI ? new GUI() : null;

export default gui;