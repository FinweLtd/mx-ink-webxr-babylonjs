import { WebGPUEngine } from "@babylonjs/core";

type Engine = import("@babylonjs/core/Engines/engine").Engine;
type Scene = import("@babylonjs/core/scene").Scene;

export interface CreateSceneClass {
    createScene: (engine: Engine | WebGPUEngine, canvas: HTMLCanvasElement) => Promise<Scene>;
    preTasks?: Promise<unknown>[];
}

export interface CreateSceneModule {
    default: CreateSceneClass;
}

export const getSceneModuleWithName = (
    name = 'arScene'
): Promise<CreateSceneClass> => {
    return import('./scenes/' + name).then((module: CreateSceneModule)=> {
        return module.default;
    });
};

