"use strict";(self.webpackChunkmx_ink_webxr_babylonjs=self.webpackChunkmx_ink_webxr_babylonjs||[]).push([[123],{51123:(e,a,i)=>{i.r(a),i.d(a,{_DDSTextureLoader:()=>o});var s=i(93375),t=i(45125);class o{constructor(){this.supportCascades=!0}loadCubeData(e,a,i,o){const n=a.getEngine();let p,r=!1,l=1e3;if(Array.isArray(e))for(let i=0;i<e.length;i++){const s=e[i];p=t.DDSTools.GetDDSInfo(s),a.width=p.width,a.height=p.height,r=(p.isRGB||p.isLuminance||p.mipmapCount>1)&&a.generateMipMaps,n._unpackFlipY(p.isCompressed),t.DDSTools.UploadDDSLevels(n,a,s,p,r,6,-1,i),p.isFourCC||1!==p.mipmapCount?l=p.mipmapCount-1:n.generateMipMapsForCubemap(a)}else{const o=e;p=t.DDSTools.GetDDSInfo(o),a.width=p.width,a.height=p.height,i&&(p.sphericalPolynomial=new s.i),r=(p.isRGB||p.isLuminance||p.mipmapCount>1)&&a.generateMipMaps,n._unpackFlipY(p.isCompressed),t.DDSTools.UploadDDSLevels(n,a,o,p,r,6),p.isFourCC||1!==p.mipmapCount?l=p.mipmapCount-1:n.generateMipMapsForCubemap(a,!1)}n._setCubeMapTextureParams(a,r,l),a.isReady=!0,a.onLoadedObservable.notifyObservers(a),a.onLoadedObservable.clear(),o&&o({isDDS:!0,width:a.width,info:p,data:e,texture:a})}loadData(e,a,i){const s=t.DDSTools.GetDDSInfo(e),o=(s.isRGB||s.isLuminance||s.mipmapCount>1)&&a.generateMipMaps&&Math.max(s.width,s.height)>>s.mipmapCount-1==1;i(s.width,s.height,o,s.isFourCC,(()=>{t.DDSTools.UploadDDSLevels(a.getEngine(),a,e,s,o,1)}))}}}}]);