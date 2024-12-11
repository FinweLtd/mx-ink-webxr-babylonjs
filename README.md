# mx-ink-webxr-babylonjs
A WebXR painting application using Babylon.js, allowing users to paint in 3D space with various input devices.

<p align="center">
  <img src="https://github.com/user-attachments/assets/e2acb441-62ce-4aa7-a44c-b34efcccccd2" alt="Screenshot 2024-12-11 161513" width="300">
  <img src="https://github.com/user-attachments/assets/5477be19-e1d4-48ae-914e-0a75f4150509" alt="Screenshot 2024-12-11 162343" width="300">
  <img src="https://github.com/user-attachments/assets/0aa5ee0d-02d8-40eb-8e9c-d02a93d374d4" alt="Screenshot 2024-12-11 162024" width="300">
</p>

## Acknowledgements 

The project is setup on this sample project https://github.com/RaananW/babylonjs-webpack-es6

The project is a Babylon.js port of this Three.js project https://github.com/fcor/mx-ink-webxr

TubePainter class is ported from this Three.js example https://github.com/mrdoob/three.js/blob/3716f3ea7ce57c191d42769936da3355ae2c6908/examples/jsm/misc/TubePainter.js

## Demo
https://finweltd.github.io/mx-ink-webxr-babylonjs/

Features
- WebXR mode only.
- Paint with Logitech MX Ink, Quest 3 controller, or with hand tracking.
- Delete current paintings by clicking the floating reset button.

## Getting started
1. Clone or download this repository.
2. To start in HTTPS mode, add your certificates to /certs folder (certs/certificate.key & certs/certificate.cert)
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start`.
5. A new window should open in your default browser. If it doesn't, open `https://localhost:8085`.

Running `npm start` will start the webpack dev server with hot-reloading turned on.

The entry point for the entire TypeScript application is `./src/index.ts`. Any other file imported in this file will be included in the build.

To debug, open the browser's dev tool. Source maps are ready to be used. If you are using VSCode, simply run the default debugger task (`Launch Chrome against localhost`) while making sure `npm start` is still running. This will allow you to debug your application straight in your editor.

## WebGPU (Optional and Experimental)
WebXR is not currently supported when using WebGPU.

Open the URL in a WebGPU-enabled browser and add "?engine=webgpu" to the URL. If you want to add a different scene, add it as a query parameter: `https://localhost:8085/?engine=webgpu`.

## What Else Can I Do?
To lint your source code, run `npm run lint`.

To build the bundle in order to host it, run `npm run build`. This will bundle your code in production mode, meaning it will minify the code.

Building will take some time. If you want to speed up the process, define the scene you want to render in `createScene.ts` (you can see the comment there).

## License
This project is licensed under the [MIT License](LICENSE).
