"use strict";(self.webpackChunkmx_ink_webxr_babylonjs=self.webpackChunkmx_ink_webxr_babylonjs||[]).push([[125,156],{94971:(e,t,r)=>{var a=r(1801),n=r(59288),o=r(4107),l=r(41762),s=r(52518),i=r(41589);s.a.prototype._partialLoadFile=function(e,t,r,a,n=null){this._loadFile(e,(e=>{r[t]=e,r._internalCount++,6===r._internalCount&&a(r)}),void 0,void 0,!0,((e,t)=>{n&&e&&n(e.status+" "+e.statusText,t)}))},s.a.prototype._cascadeLoadFiles=function(e,t,r,a=null){const n=[];n._internalCount=0;for(let e=0;e<6;e++)this._partialLoadFile(r[e],e,n,t,a)},s.a.prototype._cascadeLoadImgs=function(e,t,r,a,n=null,o){const l=[];l._internalCount=0;for(let s=0;s<6;s++)this._partialLoadImg(a[s],s,l,e,t,r,n,o)},s.a.prototype._partialLoadImg=function(e,t,r,a,n,s,i=null,f){const u=(0,l.f)();(0,o.r6)(e,(e=>{r[t]=e,r._internalCount++,a&&a.removePendingData(u),6===r._internalCount&&s&&s(n,r)}),((e,t)=>{a&&a.removePendingData(u),i&&i(e,t)}),a?a.offlineProvider:null,f),a&&a.addPendingData(u)},s.a.prototype.createCubeTextureBase=function(e,t,r,o,l=null,s=null,f,u=null,c=!1,d=0,A=0,p=null,y=null,h=null,m=!1,_=null){const w=p||new a.l7(this,7);w.isCube=!0,w.url=e,w.generateMipMaps=!o,w._lodGenerationScale=d,w._lodGenerationOffset=A,w._useSRGBBuffer=!!m&&this._caps.supportSRGBBuffers&&(this.version>1||this.isWebGPU||!!o),w!==p&&(w.label=e.substring(0,60)),this._doNotHandleContextLost||(w._extension=u,w._files=r,w._buffer=_);const C=e;this._transformTextureUrl&&!p&&(e=this._transformTextureUrl(e));const b=e.split("?")[0],F=b.lastIndexOf("."),B=u||(F>-1?b.substring(F).toLowerCase():""),x=(0,i.qr)(B),G=(a,i)=>{e===C?s&&a&&s(a.status+" "+a.statusText,i):(n.Y.Warn(`Failed to load ${e}, falling back to the ${C}`),this.createCubeTextureBase(C,t,r,!!o,l,s,f,u,c,d,A,w,y,h,m,_))};if(x)x.then((a=>{const o=e=>{y&&y(w,e),a.loadCubeData(e,w,c,l,s)};_?o(_):r&&6===r.length?a.supportCascades?this._cascadeLoadFiles(t,(e=>o(e.map((e=>new Uint8Array(e))))),r,s):s?s("Textures type does not support cascades."):n.Y.Warn("Texture loader does not support cascades."):this._loadFile(e,(e=>o(new Uint8Array(e))),void 0,void 0,!0,G)}));else{if(!r||0===r.length)throw new Error("Cannot load cubemap because files were not defined, or the correct loader was not found.");this._cascadeLoadImgs(t,w,((e,t)=>{h&&h(e,t)}),r,s)}return this._internalTexturesCache.push(w),w}},49156:(e,t,r)=>{r.d(t,{$:()=>f});var a=r(90972),n=r(69891),o=r(93375),l=r(7786),s=r(89859);class i{constructor(e,t,r,a){this.name=e,this.worldAxisForNormal=t,this.worldAxisForFileX=r,this.worldAxisForFileY=a}}class f{static ConvertCubeMapTextureToSphericalPolynomial(e){if(!e.isCube)return null;e.getScene()?.getEngine().flushFramebuffer();const t=e.getSize().width,r=e.readPixels(0,void 0,void 0,!1),a=e.readPixels(1,void 0,void 0,!1);let n,o;e.isRenderTarget?(n=e.readPixels(3,void 0,void 0,!1),o=e.readPixels(2,void 0,void 0,!1)):(n=e.readPixels(2,void 0,void 0,!1),o=e.readPixels(3,void 0,void 0,!1));const l=e.readPixels(4,void 0,void 0,!1),s=e.readPixels(5,void 0,void 0,!1),i=e.gammaSpace;let f=0;return 1!=e.textureType&&2!=e.textureType||(f=1),new Promise((e=>{Promise.all([a,r,n,o,l,s]).then((([r,a,n,o,l,s])=>{const u={size:t,right:a,left:r,up:n,down:o,front:l,back:s,format:5,type:f,gammaSpace:i};e(this.ConvertCubeMapToSphericalPolynomial(u))}))}))}static _AreaElement(e,t){return Math.atan2(e*t,Math.sqrt(e*e+t*t+1))}static ConvertCubeMapToSphericalPolynomial(e){const t=new o._;let r=0;const a=2/e.size,i=a,f=.5*a,u=f-1;for(let o=0;o<6;o++){const c=this._FileFaces[o],d=e[c.name];let A=u;const p=5===e.format?4:3;for(let o=0;o<e.size;o++){let y=u;for(let i=0;i<e.size;i++){const u=c.worldAxisForFileX.scale(y).add(c.worldAxisForFileY.scale(A)).add(c.worldAxisForNormal);u.normalize();const h=this._AreaElement(y-f,A-f)-this._AreaElement(y-f,A+f)-this._AreaElement(y+f,A-f)+this._AreaElement(y+f,A+f);let m=d[o*e.size*p+i*p+0],_=d[o*e.size*p+i*p+1],w=d[o*e.size*p+i*p+2];isNaN(m)&&(m=0),isNaN(_)&&(_=0),isNaN(w)&&(w=0),0===e.type&&(m/=255,_/=255,w/=255),e.gammaSpace&&(m=Math.pow((0,n.Clamp)(m),l.Nn),_=Math.pow((0,n.Clamp)(_),l.Nn),w=Math.pow((0,n.Clamp)(w),l.Nn));const C=this.MAX_HDRI_VALUE;if(this.PRESERVE_CLAMPED_COLORS){const e=Math.max(m,_,w);if(e>C){const t=C/e;m*=t,_*=t,w*=t}}else m=(0,n.Clamp)(m,0,C),_=(0,n.Clamp)(_,0,C),w=(0,n.Clamp)(w,0,C);const b=new s.Wo(m,_,w);t.addLight(u,b,h),r+=h,y+=a}A+=i}}const c=4*Math.PI*6/6/r;return t.scaleInPlace(c),t.convertIncidentRadianceToIrradiance(),t.convertIrradianceToLambertianRadiance(),o.i.FromHarmonics(t)}}f._FileFaces=[new i("right",new a.P(1,0,0),new a.P(0,0,-1),new a.P(0,-1,0)),new i("left",new a.P(-1,0,0),new a.P(0,0,1),new a.P(0,-1,0)),new i("up",new a.P(0,1,0),new a.P(1,0,0),new a.P(0,0,1)),new i("down",new a.P(0,-1,0),new a.P(1,0,0),new a.P(0,0,-1)),new i("front",new a.P(0,0,1),new a.P(1,0,0),new a.P(0,-1,0)),new i("back",new a.P(0,0,-1),new a.P(-1,0,0),new a.P(0,-1,0))],f.MAX_HDRI_VALUE=4096,f.PRESERVE_CLAMPED_COLORS=!1},45125:(e,t,r)=>{r.r(t),r.d(t,{DDSTools:()=>p});var a=r(69891),n=r(59288),o=r(49156),l=r(14873);r(94971);const s=131072,i=131072;function f(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const u=f("DXT1"),c=f("DXT3"),d=f("DXT5"),A=f("DX10");class p{static GetDDSInfo(e){const t=new Int32Array(e.buffer,e.byteOffset,31),r=new Int32Array(e.buffer,e.byteOffset,35);let a=1;t[2]&s&&(a=Math.max(1,t[7]));const n=t[21],o=n===A?r[32]:0;let l=0;switch(n){case 113:l=2;break;case 116:l=1;break;case A:if(10===o){l=2;break}if(2===o){l=1;break}}return{width:t[4],height:t[3],mipmapCount:a,isFourCC:4==(4&t[20]),isRGB:64==(64&t[20]),isLuminance:(t[20]&i)===i,isCube:512==(512&t[28]),isCompressed:n===u||n===c||n===d,dxgiFormat:o,textureType:l}}static _GetHalfFloatAsFloatRGBAArrayBuffer(e,t,r,a,n,o){const s=new Float32Array(a),i=new Uint16Array(n,r);let f=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);s[f]=(0,l.qZ)(i[a]),s[f+1]=(0,l.qZ)(i[a+1]),s[f+2]=(0,l.qZ)(i[a+2]),p.StoreLODInAlphaChannel?s[f+3]=o:s[f+3]=(0,l.qZ)(i[a+3]),f+=4}return s}static _GetHalfFloatRGBAArrayBuffer(e,t,r,a,n,o){if(p.StoreLODInAlphaChannel){const s=new Uint16Array(a),i=new Uint16Array(n,r);let f=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);s[f]=i[a],s[f+1]=i[a+1],s[f+2]=i[a+2],s[f+3]=(0,l.ay)(o),f+=4}return s}return new Uint16Array(n,r,a)}static _GetFloatRGBAArrayBuffer(e,t,r,a,n,o){if(p.StoreLODInAlphaChannel){const l=new Float32Array(a),s=new Float32Array(n,r);let i=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);l[i]=s[a],l[i+1]=s[a+1],l[i+2]=s[a+2],l[i+3]=o,i+=4}return l}return new Float32Array(n,r,a)}static _GetFloatAsHalfFloatRGBAArrayBuffer(e,t,r,a,n,o){const s=new Uint16Array(a),i=new Float32Array(n,r);let f=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++)s[f]=(0,l.ay)(i[f]),s[f+1]=(0,l.ay)(i[f+1]),s[f+2]=(0,l.ay)(i[f+2]),p.StoreLODInAlphaChannel?s[f+3]=(0,l.ay)(o):s[f+3]=(0,l.ay)(i[f+3]),f+=4;return s}static _GetFloatAsUIntRGBAArrayBuffer(e,t,r,n,o,l){const s=new Uint8Array(n),i=new Float32Array(o,r);let f=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const n=4*(t+r*e);s[f]=255*(0,a.Clamp)(i[n]),s[f+1]=255*(0,a.Clamp)(i[n+1]),s[f+2]=255*(0,a.Clamp)(i[n+2]),p.StoreLODInAlphaChannel?s[f+3]=l:s[f+3]=255*(0,a.Clamp)(i[n+3]),f+=4}return s}static _GetHalfFloatAsUIntRGBAArrayBuffer(e,t,r,n,o,s){const i=new Uint8Array(n),f=new Uint16Array(o,r);let u=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const n=4*(t+r*e);i[u]=255*(0,a.Clamp)((0,l.qZ)(f[n])),i[u+1]=255*(0,a.Clamp)((0,l.qZ)(f[n+1])),i[u+2]=255*(0,a.Clamp)((0,l.qZ)(f[n+2])),p.StoreLODInAlphaChannel?i[u+3]=s:i[u+3]=255*(0,a.Clamp)((0,l.qZ)(f[n+3])),u+=4}return i}static _GetRGBAArrayBuffer(e,t,r,a,n,o,l,s,i){const f=new Uint8Array(a),u=new Uint8Array(n,r);let c=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);f[c]=u[a+o],f[c+1]=u[a+l],f[c+2]=u[a+s],f[c+3]=u[a+i],c+=4}return f}static _ExtractLongWordOrder(e){return 0===e||255===e||-16777216===e?0:1+p._ExtractLongWordOrder(e>>8)}static _GetRGBArrayBuffer(e,t,r,a,n,o,l,s){const i=new Uint8Array(a),f=new Uint8Array(n,r);let u=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=3*(t+r*e);i[u]=f[a+o],i[u+1]=f[a+l],i[u+2]=f[a+s],u+=3}return i}static _GetLuminanceArrayBuffer(e,t,r,a,n){const o=new Uint8Array(a),l=new Uint8Array(n,r);let s=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=t+r*e;o[s]=l[a],s++}return o}static UploadDDSLevels(e,t,r,a,l,i,f=-1,y,h=!0){let m=null;a.sphericalPolynomial&&(m=[]);const _=!!e.getCaps().s3tc;t.generateMipMaps=l;const w=new Int32Array(r.buffer,r.byteOffset,31);let C,b,F,B,x,G,g,P=0,R=0,v=1;if(542327876!==w[0])return void n.Y.Error("Invalid magic number in DDS header");if(!a.isFourCC&&!a.isRGB&&!a.isLuminance)return void n.Y.Error("Unsupported format, must contain a FourCC, RGB or LUMINANCE code");if(a.isCompressed&&!_)return void n.Y.Error("Compressed textures are not supported on this platform.");let L=w[22];B=w[1]+4;let D=!1;if(a.isFourCC)switch(C=w[21],C){case u:v=8,R=33777;break;case c:v=16,R=33778;break;case d:v=16,R=33779;break;case 113:D=!0,L=64;break;case 116:D=!0,L=128;break;case A:{B+=20;let e=!1;switch(a.dxgiFormat){case 10:D=!0,L=64,e=!0;break;case 2:D=!0,L=128,e=!0;break;case 88:a.isRGB=!0,a.isFourCC=!1,L=32,e=!0}if(e)break}default:return void n.Y.Error(["Unsupported FourCC code:",(T=C,String.fromCharCode(255&T,T>>8&255,T>>16&255,T>>24&255))])}var T;const O=p._ExtractLongWordOrder(w[23]),U=p._ExtractLongWordOrder(w[24]),I=p._ExtractLongWordOrder(w[25]),S=p._ExtractLongWordOrder(w[26]);D&&(R=e._getRGBABufferInternalSizedFormat(a.textureType)),G=1,w[2]&s&&!1!==l&&(G=Math.max(1,w[7]));const k=y||0,E=e.getCaps();for(let n=k;n<i;n++){for(b=w[4],F=w[3],g=0;g<G;++g){if(-1===f||f===g){const o=-1===f?g:0;if(!a.isCompressed&&a.isFourCC){t.format=5,P=b*F*4;let a=null;if(e._badOS||e._badDesktopOS||!E.textureHalfFloat&&!E.textureFloat)128===L?(a=p._GetFloatAsUIntRGBAArrayBuffer(b,F,r.byteOffset+B,P,r.buffer,o),m&&0==o&&m.push(p._GetFloatRGBAArrayBuffer(b,F,r.byteOffset+B,P,r.buffer,o))):64===L&&(a=p._GetHalfFloatAsUIntRGBAArrayBuffer(b,F,r.byteOffset+B,P,r.buffer,o),m&&0==o&&m.push(p._GetHalfFloatAsFloatRGBAArrayBuffer(b,F,r.byteOffset+B,P,r.buffer,o))),t.type=0;else{const e=E.textureFloat&&(h&&E.textureFloatLinearFiltering||!h),n=E.textureHalfFloat&&(h&&E.textureHalfFloatLinearFiltering||!h),l=(128===L||64===L&&!n)&&e?1:(64===L||128===L&&!e)&&n?2:0;let s,i=null;if(128===L)switch(l){case 1:s=p._GetFloatRGBAArrayBuffer,i=null;break;case 2:s=p._GetFloatAsHalfFloatRGBAArrayBuffer,i=p._GetFloatRGBAArrayBuffer;break;case 0:s=p._GetFloatAsUIntRGBAArrayBuffer,i=p._GetFloatRGBAArrayBuffer}else switch(l){case 1:s=p._GetHalfFloatAsFloatRGBAArrayBuffer,i=null;break;case 2:s=p._GetHalfFloatRGBAArrayBuffer,i=p._GetHalfFloatAsFloatRGBAArrayBuffer;break;case 0:s=p._GetHalfFloatAsUIntRGBAArrayBuffer,i=p._GetHalfFloatAsFloatRGBAArrayBuffer}t.type=l,a=s(b,F,r.byteOffset+B,P,r.buffer,o),m&&0==o&&m.push(i?i(b,F,r.byteOffset+B,P,r.buffer,o):a)}a&&e._uploadDataToTextureDirectly(t,a,n,o)}else if(a.isRGB)t.type=0,24===L?(t.format=4,P=b*F*3,x=p._GetRGBArrayBuffer(b,F,r.byteOffset+B,P,r.buffer,O,U,I),e._uploadDataToTextureDirectly(t,x,n,o)):(t.format=5,P=b*F*4,x=p._GetRGBAArrayBuffer(b,F,r.byteOffset+B,P,r.buffer,O,U,I,S),e._uploadDataToTextureDirectly(t,x,n,o));else if(a.isLuminance){const a=e._getUnpackAlignement(),l=b;P=Math.floor((b+a-1)/a)*a*(F-1)+l,x=p._GetLuminanceArrayBuffer(b,F,r.byteOffset+B,P,r.buffer),t.format=1,t.type=0,e._uploadDataToTextureDirectly(t,x,n,o)}else P=Math.max(4,b)/4*Math.max(4,F)/4*v,x=new Uint8Array(r.buffer,r.byteOffset+B,P),t.type=0,e._uploadCompressedDataToTextureDirectly(t,R,b,F,x,n,o)}B+=L?b*F*(L/8):P,b*=.5,F*=.5,b=Math.max(1,b),F=Math.max(1,F)}if(void 0!==y)break}m&&m.length>0?a.sphericalPolynomial=o.$.ConvertCubeMapToSphericalPolynomial({size:w[4],right:m[0],left:m[1],up:m[2],down:m[3],front:m[4],back:m[5],format:5,type:1,gammaSpace:!1}):a.sphericalPolynomial=void 0}}p.StoreLODInAlphaChannel=!1}}]);