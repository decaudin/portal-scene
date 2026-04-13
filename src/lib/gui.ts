import GUI from 'lil-gui';

const gui = import.meta.env.VITE_ENABLE_GUI === 'true' ? new GUI() : null;

export default gui;