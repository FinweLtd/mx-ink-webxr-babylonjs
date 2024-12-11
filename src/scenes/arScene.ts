import { Engine, Scene, HemisphericLight, Vector3, Mesh, WebXRSessionManager, Quaternion, WebXRDefaultExperience, Matrix, WebXRControllerComponent, WebGPUEngine, WebXREnterExitUIOptions, FollowBehavior } from "@babylonjs/core";
import { TubePainter } from "../TubePainter";
import { CreateSceneClass } from "../createScene";
import { GUI3DManager, TouchHolographicButton } from "@babylonjs/gui";
// glTF loader for hand meshes
import '@babylonjs/loaders/glTF';
// BabylonJS inspector
import '@babylonjs/inspector';

export class ARScene implements CreateSceneClass {
    scene!: Scene;
    debugLayerEnabled = false;

    // TubePainter
    public painter!: TubePainter;
    private isDrawing = false;
    private prevIsDrawing = false;
    private cursor = new Vector3();
    private meshRoot!: Mesh;

    async createScene(engine: Engine | WebGPUEngine, canvas: HTMLCanvasElement, enableSSAO = false): Promise<Scene> {        
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        this.scene = scene;

        // Basic lighting
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Add TouchHolographicButton with text "Reset"
        var manager = new GUI3DManager();
        manager.useRealisticScaling = true;
        const resetButton = new TouchHolographicButton("resetButton");
        resetButton.text = "RESET";
        resetButton.scaling = new Vector3(4, 4, 4);
        resetButton.onPointerUpObservable.add(() => {
            this.painter.reset();
        });
        manager.addControl(resetButton);
        // Add FollowBehavior to the button
        if (resetButton.node != null) {
            const followBehavior = new FollowBehavior();
            followBehavior.maximumDistance = 1;
            followBehavior.attach(resetButton.node);
        }

        // Inspector
        if (this.debugLayerEnabled) {
            scene.debugLayer.show({
                handleResize: true,
                overlay: false,
                globalRoot: document.getElementById("#root") || undefined,
                embedMode: true,
            });
        }

        // TubePainter instance
        this.painter = new TubePainter(this.scene);
        const painterMesh = this.painter.getMesh();
        this.meshRoot = new Mesh("meshRoot", scene);
        painterMesh.setParent(this.meshRoot, false, false);
        painterMesh.position = new Vector3(0, 0, 0);
        painterMesh.rotationQuaternion = Quaternion.Identity();
        painterMesh.scaling = new Vector3(1, 1, 1);
        
        // Check AR availability and setup XR
        const arAvailable = await WebXRSessionManager.IsSessionSupportedAsync('immersive-ar');
        if (!arAvailable) {
            console.warn("AR is not available on this device");
            return scene;
        }

        this.setupXR(scene);

        return scene;
    }

    private setupXR = async (scene: Scene) => {
        // Create XR experience
        const sessionMode: XRSessionMode | undefined = "immersive-ar";
        const referenceSpaceType: XRReferenceSpaceType = "local-floor";
        const uiOptions: Partial<WebXREnterExitUIOptions> = {
            sessionMode: sessionMode,
            referenceSpaceType: referenceSpaceType,
        };

        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: uiOptions,
            optionalFeatures: true
        });

        this.setupXRFeatures(xr);
        this.setupDrawing(xr);
    };

    protected setupXRFeatures(xr: WebXRDefaultExperience) {
        // Disable pointer selection
        xr.pointerSelection.detach();

        xr.input.onControllerAddedObservable.add((controller) => {
            console.log("controller added with handedness: " + controller.inputSource.handedness);

            // // Log the profiles to see what identifiers are available
            // controller.inputSource.profiles.forEach((profile) => {
            //     console.log("Controller profile: " + profile);
            // });

            controller.onMotionControllerInitObservable.add((motionController) => {
                motionController.onModelLoadedObservable.add(() => {
                    // Check if the controller is a stylus
                    if (controller.inputSource.profiles.includes('stylus') || controller.inputSource.profiles.includes('logitech-mx-ink')) {
                        console.log("Stylus detected");
                    }
                });
            });
        });
    }

    // Ported from the three.js mx ink example: https://github.com/fcor/mx-ink-webxr/blob/master/src/script.js
    private setupDrawing(xr: WebXRDefaultExperience) {
        console.log("Setting up drawing");
        const xrInput = xr.input;
        xrInput.onControllerAddedObservable.add((controller) => {
            // log profiles
            console.log("controller.inputSource.profiles", controller.inputSource.profiles);

            controller.onMotionControllerInitObservable.add(() => {
                console.log("Motion controller init");
                if (controller.motionController?.handness === 'right') {
                    const xr_ids = controller.motionController.getComponentIds();
                    // log all ids
                    xr_ids.forEach((id) => {
                        console.log("id", id);
                    });

                    let tipComponent: WebXRControllerComponent | undefined = undefined;

                    // Check if the controller is a stylus
                    if (controller.inputSource.profiles.includes('stylus') || controller.inputSource.profiles.includes('logitech-mx-ink')) {
                        console.log("Stylus controller found");
                        tipComponent = controller.motionController.getComponent(xr_ids[3]);
                    }

                    const triggerComponent = controller.motionController.getComponent(xr_ids[0]);//xr-standard-trigger

                    const beforeRenderFunctionRef = () => {
                        this.prevIsDrawing = this.isDrawing;
                        this.isDrawing = triggerComponent.pressed || (tipComponent != undefined && tipComponent.touched);

                        const position = controller.pointer.position.clone();

                        // Handle drawing start
                        if (this.isDrawing && !this.prevIsDrawing) {
                            const localPosition = Vector3.TransformCoordinates(position, Matrix.Invert(this.meshRoot.getWorldMatrix()));
                            this.painter.moveTo(localPosition);
                        }

                        // Handle drawing
                        this.handleDrawing(position);
                    };
                    this.scene.onBeforeRenderObservable.add(beforeRenderFunctionRef);
                    controller.onDisposeObservable.add(() => {
                        this.scene.unregisterBeforeRender(beforeRenderFunctionRef);
                        
                        this.isDrawing = false;
                        this.prevIsDrawing = false;
                        this.cursor = new Vector3();
                    });
                }
            });
        });
    }

    private handleDrawing(worldPosition: Vector3) {
        this.cursor.set(worldPosition.x, worldPosition.y, worldPosition.z);
        const localPosition = Vector3.TransformCoordinates(this.cursor, Matrix.Invert(this.meshRoot.getWorldMatrix()));

        if (this.isDrawing) {
            // 0.1 global size to meshRoot localSize
            const localSize = 0.1 / this.meshRoot.scaling.length();
            this.painter.setSize(localSize);

            this.painter.lineTo(localPosition);
            this.painter.update();
        }
    }
}

export default new ARScene();