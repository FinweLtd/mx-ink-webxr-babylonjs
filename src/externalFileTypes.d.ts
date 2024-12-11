// Images
declare module '*.jpg';
declare module '*.png';
declare module '*.env';
declare module '*.dds';

// 3D types
declare module '*.glb';
declare module '*.gltf';
declare module '*.stl';
declare module '*.babylon';
declare module '*.manifest';
declare module '*.ply';
declare module '*.splat';

// UI
declare module "*.json" {
    const value: any;
    export default value;
}

// Audio
declare module "*.wav";
declare module "*.mp3";

// Other
declare module '*.glsl';
declare module '*.js';
declare module "*.txt" {
    const content: string;
    export = content;
}