"use strict";(self.webpackChunkmx_ink_webxr_babylonjs=self.webpackChunkmx_ink_webxr_babylonjs||[]).push([[500],{64500:(t,e,s)=>{s.r(e),s.d(e,{ARScene:()=>n,default:()=>a});var o=s(11623);class i{constructor(t){this.scene=t,this.BUFFER_SIZE=3e6,this.size=1,this.count=0,this.sides=5,this.vector1=new o.Vector3,this.vector2=new o.Vector3,this.vector3=new o.Vector3,this.vector4=new o.Vector3,this.color=new o.Color3(1,1,1),this.point1=new o.Vector3,this.point2=new o.Vector3,this.matrix1=o.Matrix.Identity(),this.matrix2=o.Matrix.Identity(),this.positions=new Float32Array(this.BUFFER_SIZE),this.normals=new Float32Array(this.BUFFER_SIZE),this.mesh=new o.Mesh("TubePainterMesh",this.scene),this.mesh.setVerticesData(o.VertexBuffer.PositionKind,this.positions,!0),this.mesh.setVerticesData(o.VertexBuffer.NormalKind,this.normals,!0);const e=new o.StandardMaterial("TubePainterMaterial",this.scene);e.emissiveColor=new o.Color3(1,0,0),e.disableLighting=!0,e.backFaceCulling=!0,e.forceDepthWrite=!0,this.mesh.alwaysSelectAsActiveMesh=!0,this.mesh.material=e}reset(){this.count=0,this.mesh.updateVerticesData(o.VertexBuffer.PositionKind,[],!1),this.mesh.updateVerticesData(o.VertexBuffer.NormalKind,[],!1),this.mesh.setIndices([])}paintCircle(t,e,s=36){console.log("paintCircle",t,e,s);const i=2*Math.PI/s;this.moveTo(new o.Vector3(t.x+e,t.y,t.z));for(let r=1;r<=s;r++){const s=i*r,n=t.x+Math.cos(s)*e,a=t.y+Math.sin(s)*e;this.lineTo(new o.Vector3(n,a,t.z))}this.update()}getPoints(t){const e=2*Math.PI,s=[],i=.01*t;for(let t=0;t<this.sides;t++){const r=t/this.sides*e;s.push(new o.Vector3(Math.sin(r)*i,Math.cos(r)*i,0))}return s}stroke(t,e,s,i){if(0===o.Vector3.DistanceSquared(t,e))return;let r=this.count;const n=this.getPoints(this.size);for(let a=0,h=n.length;a<h;a++){const c=n[a],l=n[(a+1)%h];this.vector1=o.Vector3.TransformCoordinates(c,i).add(e),this.vector2=o.Vector3.TransformCoordinates(l,i).add(e),this.vector3=o.Vector3.TransformCoordinates(l,s).add(t),this.vector4=o.Vector3.TransformCoordinates(c,s).add(t),this.positions.set(this.vector1.asArray(),3*(r+0)),this.positions.set(this.vector2.asArray(),3*(r+1)),this.positions.set(this.vector4.asArray(),3*(r+2)),this.positions.set(this.vector2.asArray(),3*(r+3)),this.positions.set(this.vector3.asArray(),3*(r+4)),this.positions.set(this.vector4.asArray(),3*(r+5)),this.vector1=o.Vector3.TransformNormal(c,i).normalize(),this.vector2=o.Vector3.TransformNormal(l,i).normalize(),this.vector3=o.Vector3.TransformNormal(l,s).normalize(),this.vector4=o.Vector3.TransformNormal(c,s).normalize(),this.normals.set(this.vector1.asArray(),3*(r+0)),this.normals.set(this.vector2.asArray(),3*(r+1)),this.normals.set(this.vector4.asArray(),3*(r+2)),this.normals.set(this.vector2.asArray(),3*(r+3)),this.normals.set(this.vector3.asArray(),3*(r+4)),this.normals.set(this.vector4.asArray(),3*(r+5)),r+=6}this.count=r}moveTo(t){this.point1.copyFrom(t),this.point2.copyFrom(t),this.matrix1=o.Matrix.Identity(),this.matrix2=o.Matrix.Identity()}lineTo(t){this.point1.copyFrom(t);const e=this.point1.subtract(this.point2).normalize();let s=o.Vector3.Up();Math.abs(o.Vector3.Dot(e,s))>.999&&(s=o.Vector3.Right());const i=o.Vector3.Cross(s,e).normalize();s=o.Vector3.Cross(e,i).normalize(),o.Matrix.FromXYZAxesToRef(i,s,e,this.matrix1),this.stroke(this.point1,this.point2,this.matrix1,this.matrix2),this.point2.copyFrom(this.point1),this.matrix2.copyFrom(this.matrix1)}setSize(t){this.size=t}update(){if(0===this.count)return;const t=this.positions.subarray(0,3*this.count),e=this.normals.subarray(0,3*this.count);this.mesh.updateVerticesData(o.VertexBuffer.PositionKind,t,!1),this.mesh.updateVerticesData(o.VertexBuffer.NormalKind,e,!1);const s=[];for(let t=0;t<this.count;t++)s.push(t);this.mesh.setIndices(s)}getMesh(){return this.mesh}}var r=s(58786);s(76215),s(53596);class n{constructor(){this.debugLayerEnabled=!1,this.isDrawing=!1,this.prevIsDrawing=!1,this.cursor=new o.Vector3,this.setupXR=async t=>{const e=await t.createDefaultXRExperienceAsync({uiOptions:{sessionMode:"immersive-ar",referenceSpaceType:"local-floor"},optionalFeatures:!0});this.setupXRFeatures(e),this.setupDrawing(e)}}async createScene(t,e,s=!1){const n=new o.Scene(t);this.scene=n,new o.HemisphericLight("light",new o.Vector3(0,1,0),n).intensity=.7;var a=new r.GUI3DManager;a.useRealisticScaling=!0;const h=new r.TouchHolographicButton("resetButton");if(h.text="RESET",h.scaling=new o.Vector3(4,4,4),h.onPointerUpObservable.add((()=>{this.painter.reset()})),a.addControl(h),null!=h.node){const t=new o.FollowBehavior;t.maximumDistance=1,t.attach(h.node)}this.debugLayerEnabled&&n.debugLayer.show({handleResize:!0,overlay:!1,globalRoot:document.getElementById("#root")||void 0,embedMode:!0}),this.painter=new i(this.scene);const c=this.painter.getMesh();return this.meshRoot=new o.Mesh("meshRoot",n),c.setParent(this.meshRoot,!1,!1),c.position=new o.Vector3(0,0,0),c.rotationQuaternion=o.Quaternion.Identity(),c.scaling=new o.Vector3(1,1,1),await o.WebXRSessionManager.IsSessionSupportedAsync("immersive-ar")?(this.setupXR(n),n):(console.warn("AR is not available on this device"),n)}setupXRFeatures(t){t.pointerSelection.detach(),t.input.onControllerAddedObservable.add((t=>{console.log("controller added with handedness: "+t.inputSource.handedness),t.onMotionControllerInitObservable.add((e=>{e.onModelLoadedObservable.add((()=>{(t.inputSource.profiles.includes("stylus")||t.inputSource.profiles.includes("logitech-mx-ink"))&&console.log("Stylus detected")}))}))}))}setupDrawing(t){console.log("Setting up drawing"),t.input.onControllerAddedObservable.add((t=>{console.log("controller.inputSource.profiles",t.inputSource.profiles),t.onMotionControllerInitObservable.add((()=>{if(console.log("Motion controller init"),"right"===t.motionController?.handness){const e=t.motionController.getComponentIds();let s;e.forEach((t=>{console.log("id",t)})),(t.inputSource.profiles.includes("stylus")||t.inputSource.profiles.includes("logitech-mx-ink"))&&(console.log("Stylus controller found"),s=t.motionController.getComponent(e[3]));const i=t.motionController.getComponent(e[0]),r=()=>{this.prevIsDrawing=this.isDrawing,this.isDrawing=i.pressed||null!=s&&s.touched;const e=t.pointer.position.clone();if(this.isDrawing&&!this.prevIsDrawing){const t=o.Vector3.TransformCoordinates(e,o.Matrix.Invert(this.meshRoot.getWorldMatrix()));this.painter.moveTo(t)}this.handleDrawing(e)};this.scene.onBeforeRenderObservable.add(r),t.onDisposeObservable.add((()=>{this.scene.unregisterBeforeRender(r),this.isDrawing=!1,this.prevIsDrawing=!1,this.cursor=new o.Vector3}))}}))}))}handleDrawing(t){this.cursor.set(t.x,t.y,t.z);const e=o.Vector3.TransformCoordinates(this.cursor,o.Matrix.Invert(this.meshRoot.getWorldMatrix()));if(this.isDrawing){const t=.1/this.meshRoot.scaling.length();this.painter.setSize(t),this.painter.lineTo(e),this.painter.update()}}}const a=new n}}]);