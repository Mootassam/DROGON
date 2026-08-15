import{v as j,at as Se,u as ie,aw as ae,j as N,a3 as Me,a9 as Re,a6 as Ae,ax as je,ay as ke,n as r,H as Ie,T as Pe}from"./index-cf6de494.js";import{u as De,y as ze,F as Fe}from"./FormErrors-43984b86.js";import{F as le}from"./FieldFormItem-44811064.js";import{u as Le}from"./useDispatch-c3ca2985.js";var Te=Object.defineProperty,J=Object.getOwnPropertySymbols,fe=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable,ce=(l,a,n)=>a in l?Te(l,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[a]=n,se=(l,a)=>{for(var n in a||(a={}))fe.call(a,n)&&ce(l,n,a[n]);if(J)for(var n of J(a))he.call(a,n)&&ce(l,n,a[n]);return l},ne=(l,a)=>{var n={};for(var u in l)fe.call(l,u)&&a.indexOf(u)<0&&(n[u]=l[u]);if(l!=null&&J)for(var u of J(l))a.indexOf(u)<0&&he.call(l,u)&&(n[u]=l[u]);return n};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var _;(l=>{const a=class b{constructor(e,s,t,o){if(this.version=e,this.errorCorrectionLevel=s,this.modules=[],this.isFunction=[],e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version value out of range");if(o<-1||o>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let i=[];for(let c=0;c<this.size;c++)i.push(!1);for(let c=0;c<this.size;c++)this.modules.push(i.slice()),this.isFunction.push(i.slice());this.drawFunctionPatterns();const d=this.addEccAndInterleave(t);if(this.drawCodewords(d),o==-1){let c=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const h=this.getPenaltyScore();h<c&&(o=g,c=h),this.applyMask(g)}}x(0<=o&&o<=7),this.mask=o,this.applyMask(o),this.drawFormatBits(o),this.isFunction=[]}static encodeText(e,s){const t=l.QrSegment.makeSegments(e);return b.encodeSegments(t,s)}static encodeBinary(e,s){const t=l.QrSegment.makeBytes(e);return b.encodeSegments([t],s)}static encodeSegments(e,s,t=1,o=40,i=-1,d=!0){if(!(b.MIN_VERSION<=t&&t<=o&&o<=b.MAX_VERSION)||i<-1||i>7)throw new RangeError("Invalid value");let c,g;for(c=t;;c++){const p=b.getNumDataCodewords(c,s)*8,M=v.getTotalBits(e,c);if(M<=p){g=M;break}if(c>=o)throw new RangeError("Data too long")}for(const p of[b.Ecc.MEDIUM,b.Ecc.QUARTILE,b.Ecc.HIGH])d&&g<=b.getNumDataCodewords(c,p)*8&&(s=p);let h=[];for(const p of e){n(p.mode.modeBits,4,h),n(p.numChars,p.mode.numCharCountBits(c),h);for(const M of p.getData())h.push(M)}x(h.length==g);const S=b.getNumDataCodewords(c,s)*8;x(h.length<=S),n(0,Math.min(4,S-h.length),h),n(0,(8-h.length%8)%8,h),x(h.length%8==0);for(let p=236;h.length<S;p^=253)n(p,8,h);let E=[];for(;E.length*8<h.length;)E.push(0);return h.forEach((p,M)=>E[M>>>3]|=p<<7-(M&7)),new b(c,s,E,i)}getModule(e,s){return 0<=e&&e<this.size&&0<=s&&s<this.size&&this.modules[s][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),s=e.length;for(let t=0;t<s;t++)for(let o=0;o<s;o++)t==0&&o==0||t==0&&o==s-1||t==s-1&&o==0||this.drawAlignmentPattern(e[t],e[o]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const s=this.errorCorrectionLevel.formatBits<<3|e;let t=s;for(let i=0;i<10;i++)t=t<<1^(t>>>9)*1335;const o=(s<<10|t)^21522;x(o>>>15==0);for(let i=0;i<=5;i++)this.setFunctionModule(8,i,u(o,i));this.setFunctionModule(8,7,u(o,6)),this.setFunctionModule(8,8,u(o,7)),this.setFunctionModule(7,8,u(o,8));for(let i=9;i<15;i++)this.setFunctionModule(14-i,8,u(o,i));for(let i=0;i<8;i++)this.setFunctionModule(this.size-1-i,8,u(o,i));for(let i=8;i<15;i++)this.setFunctionModule(8,this.size-15+i,u(o,i));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const s=this.version<<12|e;x(s>>>18==0);for(let t=0;t<18;t++){const o=u(s,t),i=this.size-11+t%3,d=Math.floor(t/3);this.setFunctionModule(i,d,o),this.setFunctionModule(d,i,o)}}drawFinderPattern(e,s){for(let t=-4;t<=4;t++)for(let o=-4;o<=4;o++){const i=Math.max(Math.abs(o),Math.abs(t)),d=e+o,c=s+t;0<=d&&d<this.size&&0<=c&&c<this.size&&this.setFunctionModule(d,c,i!=2&&i!=4)}}drawAlignmentPattern(e,s){for(let t=-2;t<=2;t++)for(let o=-2;o<=2;o++)this.setFunctionModule(e+o,s+t,Math.max(Math.abs(o),Math.abs(t))!=1)}setFunctionModule(e,s,t){this.modules[s][e]=t,this.isFunction[s][e]=!0}addEccAndInterleave(e){const s=this.version,t=this.errorCorrectionLevel;if(e.length!=b.getNumDataCodewords(s,t))throw new RangeError("Invalid argument");const o=b.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][s],i=b.ECC_CODEWORDS_PER_BLOCK[t.ordinal][s],d=Math.floor(b.getNumRawDataModules(s)/8),c=o-d%o,g=Math.floor(d/o);let h=[];const S=b.reedSolomonComputeDivisor(i);for(let p=0,M=0;p<o;p++){let A=e.slice(M,M+g-i+(p<c?0:1));M+=A.length;const O=b.reedSolomonComputeRemainder(A,S);p<c&&A.push(0),h.push(A.concat(O))}let E=[];for(let p=0;p<h[0].length;p++)h.forEach((M,A)=>{(p!=g-i||A>=c)&&E.push(M[p])});return x(E.length==d),E}drawCodewords(e){if(e.length!=Math.floor(b.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let s=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let o=0;o<this.size;o++)for(let i=0;i<2;i++){const d=t-i,g=(t+1&2)==0?this.size-1-o:o;!this.isFunction[g][d]&&s<e.length*8&&(this.modules[g][d]=u(e[s>>>3],7-(s&7)),s++)}}x(s==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let s=0;s<this.size;s++)for(let t=0;t<this.size;t++){let o;switch(e){case 0:o=(t+s)%2==0;break;case 1:o=s%2==0;break;case 2:o=t%3==0;break;case 3:o=(t+s)%3==0;break;case 4:o=(Math.floor(t/3)+Math.floor(s/2))%2==0;break;case 5:o=t*s%2+t*s%3==0;break;case 6:o=(t*s%2+t*s%3)%2==0;break;case 7:o=((t+s)%2+t*s%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[s][t]&&o&&(this.modules[s][t]=!this.modules[s][t])}}getPenaltyScore(){let e=0;for(let i=0;i<this.size;i++){let d=!1,c=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[i][h]==d?(c++,c==5?e+=b.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,g),d||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),d=this.modules[i][h],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,g)*b.PENALTY_N3}for(let i=0;i<this.size;i++){let d=!1,c=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][i]==d?(c++,c==5?e+=b.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,g),d||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),d=this.modules[h][i],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,g)*b.PENALTY_N3}for(let i=0;i<this.size-1;i++)for(let d=0;d<this.size-1;d++){const c=this.modules[i][d];c==this.modules[i][d+1]&&c==this.modules[i+1][d]&&c==this.modules[i+1][d+1]&&(e+=b.PENALTY_N2)}let s=0;for(const i of this.modules)s=i.reduce((d,c)=>d+(c?1:0),s);const t=this.size*this.size,o=Math.ceil(Math.abs(s*20-t*10)/t)-1;return x(0<=o&&o<=9),e+=o*b.PENALTY_N4,x(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,s=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let o=this.size-7;t.length<e;o-=s)t.splice(1,0,o);return t}}static getNumRawDataModules(e){if(e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version number out of range");let s=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;s-=(25*t-10)*t-55,e>=7&&(s-=36)}return x(208<=s&&s<=29648),s}static getNumDataCodewords(e,s){return Math.floor(b.getNumRawDataModules(e)/8)-b.ECC_CODEWORDS_PER_BLOCK[s.ordinal][e]*b.NUM_ERROR_CORRECTION_BLOCKS[s.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let s=[];for(let o=0;o<e-1;o++)s.push(0);s.push(1);let t=1;for(let o=0;o<e;o++){for(let i=0;i<s.length;i++)s[i]=b.reedSolomonMultiply(s[i],t),i+1<s.length&&(s[i]^=s[i+1]);t=b.reedSolomonMultiply(t,2)}return s}static reedSolomonComputeRemainder(e,s){let t=s.map(o=>0);for(const o of e){const i=o^t.shift();t.push(0),s.forEach((d,c)=>t[c]^=b.reedSolomonMultiply(d,i))}return t}static reedSolomonMultiply(e,s){if(e>>>8||s>>>8)throw new RangeError("Byte out of range");let t=0;for(let o=7;o>=0;o--)t=t<<1^(t>>>7)*285,t^=(s>>>o&1)*e;return x(t>>>8==0),t}finderPenaltyCountPatterns(e){const s=e[1];x(s<=this.size*3);const t=s>0&&e[2]==s&&e[3]==s*3&&e[4]==s&&e[5]==s;return(t&&e[0]>=s*4&&e[6]>=s?1:0)+(t&&e[6]>=s*4&&e[0]>=s?1:0)}finderPenaltyTerminateAndCount(e,s,t){return e&&(this.finderPenaltyAddHistory(s,t),s=0),s+=this.size,this.finderPenaltyAddHistory(s,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,s){s[0]==0&&(e+=this.size),s.pop(),s.unshift(e)}};a.MIN_VERSION=1,a.MAX_VERSION=40,a.PENALTY_N1=3,a.PENALTY_N2=3,a.PENALTY_N3=40,a.PENALTY_N4=10,a.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],a.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=a;function n(C,e,s){if(e<0||e>31||C>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)s.push(C>>>t&1)}function u(C,e){return(C>>>e&1)!=0}function x(C){if(!C)throw new Error("Assertion error")}const m=class R{constructor(e,s,t){if(this.mode=e,this.numChars=s,this.bitData=t,s<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let s=[];for(const t of e)n(t,8,s);return new R(R.Mode.BYTE,e.length,s)}static makeNumeric(e){if(!R.isNumeric(e))throw new RangeError("String contains non-numeric characters");let s=[];for(let t=0;t<e.length;){const o=Math.min(e.length-t,3);n(parseInt(e.substring(t,t+o),10),o*3+1,s),t+=o}return new R(R.Mode.NUMERIC,e.length,s)}static makeAlphanumeric(e){if(!R.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let s=[],t;for(t=0;t+2<=e.length;t+=2){let o=R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;o+=R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),n(o,11,s)}return t<e.length&&n(R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,s),new R(R.Mode.ALPHANUMERIC,e.length,s)}static makeSegments(e){return e==""?[]:R.isNumeric(e)?[R.makeNumeric(e)]:R.isAlphanumeric(e)?[R.makeAlphanumeric(e)]:[R.makeBytes(R.toUtf8ByteArray(e))]}static makeEci(e){let s=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)n(e,8,s);else if(e<16384)n(2,2,s),n(e,14,s);else if(e<1e6)n(6,3,s),n(e,21,s);else throw new RangeError("ECI assignment value out of range");return new R(R.Mode.ECI,0,s)}static isNumeric(e){return R.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return R.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,s){let t=0;for(const o of e){const i=o.mode.numCharCountBits(s);if(o.numChars>=1<<i)return 1/0;t+=4+i+o.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let s=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?s.push(e.charCodeAt(t)):(s.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return s}};m.NUMERIC_REGEX=/^[0-9]*$/,m.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,m.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let v=m;l.QrSegment=m})(_||(_={}));(l=>{(a=>{const n=class{constructor(x,m){this.ordinal=x,this.formatBits=m}};n.LOW=new n(0,1),n.MEDIUM=new n(1,0),n.QUARTILE=new n(2,3),n.HIGH=new n(3,2),a.Ecc=n})(l.QrCode||(l.QrCode={}))})(_||(_={}));(l=>{(a=>{const n=class{constructor(x,m){this.modeBits=x,this.numBitsCharCount=m}numCharCountBits(x){return this.numBitsCharCount[Math.floor((x+7)/17)]}};n.NUMERIC=new n(1,[10,12,14]),n.ALPHANUMERIC=new n(2,[9,11,13]),n.BYTE=new n(4,[8,16,16]),n.KANJI=new n(8,[8,10,12]),n.ECI=new n(7,[0,0,0]),a.Mode=n})(l.QrSegment||(l.QrSegment={}))})(_||(_={}));var $=_;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Ue={L:$.QrCode.Ecc.LOW,M:$.QrCode.Ecc.MEDIUM,Q:$.QrCode.Ecc.QUARTILE,H:$.QrCode.Ecc.HIGH},me=128,pe="L",ge="#FFFFFF",xe="#000000",be=!1,we=1,Oe=4,Be=0,_e=.1;function ye(l,a=0){const n=[];return l.forEach(function(u,x){let m=null;u.forEach(function(v,C){if(!v&&m!==null){n.push(`M${m+a} ${x+a}h${C-m}v1H${m+a}z`),m=null;return}if(C===u.length-1){if(!v)return;m===null?n.push(`M${C+a},${x+a} h1v1H${C+a}z`):n.push(`M${m+a},${x+a} h${C+1-m}v1H${m+a}z`);return}v&&m===null&&(m=C)})}),n.join("")}function ve(l,a){return l.slice().map((n,u)=>u<a.y||u>=a.y+a.h?n:n.map((x,m)=>m<a.x||m>=a.x+a.w?x:!1))}function $e(l,a,n,u){if(u==null)return null;const x=l.length+n*2,m=Math.floor(a*_e),v=x/a,C=(u.width||m)*v,e=(u.height||m)*v,s=u.x==null?l.length/2-C/2:u.x*v,t=u.y==null?l.length/2-e/2:u.y*v,o=u.opacity==null?1:u.opacity;let i=null;if(u.excavate){let c=Math.floor(s),g=Math.floor(t),h=Math.ceil(C+s-c),S=Math.ceil(e+t-g);i={x:c,y:g,w:h,h:S}}const d=u.crossOrigin;return{x:s,y:t,h:e,w:C,excavation:i,opacity:o,crossOrigin:d}}function Qe(l,a){return a!=null?Math.max(Math.floor(a),0):l?Oe:Be}function Ne({value:l,level:a,minVersion:n,includeMargin:u,marginSize:x,imageSettings:m,size:v,boostLevel:C}){let e=j.useMemo(()=>{const c=(Array.isArray(l)?l:[l]).reduce((g,h)=>(g.push(...$.QrSegment.makeSegments(h)),g),[]);return $.QrCode.encodeSegments(c,Ue[a],n,void 0,void 0,C)},[l,a,n,C]);const{cells:s,margin:t,numCells:o,calculatedImageSettings:i}=j.useMemo(()=>{let d=e.getModules();const c=Qe(u,x),g=d.length+c*2,h=$e(d,v,c,m);return{cells:d,margin:c,numCells:g,calculatedImageSettings:h}},[e,v,m,u,x]);return{qrcode:e,margin:t,cells:s,numCells:o,calculatedImageSettings:i}}var He=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Ce=j.forwardRef(function(a,n){const u=a,{value:x,size:m=me,level:v=pe,bgColor:C=ge,fgColor:e=xe,includeMargin:s=be,minVersion:t=we,boostLevel:o,marginSize:i,imageSettings:d}=u,g=ne(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:h}=g,S=ne(g,["style"]),E=d==null?void 0:d.src,p=j.useRef(null),M=j.useRef(null),A=j.useCallback(P=>{p.current=P,typeof n=="function"?n(P):n&&(n.current=P)},[n]),[O,I]=j.useState(!1),{margin:F,cells:Y,numCells:Q,calculatedImageSettings:D}=Ne({value:x,level:v,minVersion:t,boostLevel:o,includeMargin:s,marginSize:i,imageSettings:d,size:m});j.useEffect(()=>{if(p.current!=null){const P=p.current,L=P.getContext("2d");if(!L)return;let z=Y;const U=M.current,V=D!=null&&U!==null&&U.complete&&U.naturalHeight!==0&&U.naturalWidth!==0;V&&D.excavation!=null&&(z=ve(Y,D.excavation));const X=window.devicePixelRatio||1;P.height=P.width=m*X;const q=m/Q*X;L.scale(q,q),L.fillStyle=C,L.fillRect(0,0,Q,Q),L.fillStyle=e,He?L.fill(new Path2D(ye(z,F))):Y.forEach(function(ee,W){ee.forEach(function(te,H){te&&L.fillRect(H+F,W+F,1,1)})}),D&&(L.globalAlpha=D.opacity),V&&L.drawImage(U,D.x+F,D.y+F,D.w,D.h)}}),j.useEffect(()=>{I(!1)},[E]);const G=se({height:m,width:m},h);let T=null;return E!=null&&(T=j.createElement("img",{src:E,key:E,style:{display:"none"},onLoad:()=>{I(!0)},ref:M,crossOrigin:D==null?void 0:D.crossOrigin})),j.createElement(j.Fragment,null,j.createElement("canvas",se({style:G,height:m,width:m,ref:A,role:"img"},S)),T)});Ce.displayName="QRCodeCanvas";var Ye=j.forwardRef(function(a,n){const u=a,{value:x,size:m=me,level:v=pe,bgColor:C=ge,fgColor:e=xe,includeMargin:s=be,minVersion:t=we,boostLevel:o,title:i,marginSize:d,imageSettings:c}=u,g=ne(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:h,cells:S,numCells:E,calculatedImageSettings:p}=Ne({value:x,level:v,minVersion:t,boostLevel:o,includeMargin:s,marginSize:d,imageSettings:c,size:m});let M=S,A=null;c!=null&&p!=null&&(p.excavation!=null&&(M=ve(S,p.excavation)),A=j.createElement("image",{href:c.src,height:p.h,width:p.w,x:p.x+h,y:p.y+h,preserveAspectRatio:"none",opacity:p.opacity,crossOrigin:p.crossOrigin}));const O=ye(M,h);return j.createElement("svg",se({height:m,width:m,viewBox:`0 0 ${E} ${E}`,ref:n,role:"img"},g),!!i&&j.createElement("title",null,i),j.createElement("path",{fill:C,d:`M0,0 h${E}v${E}H0z`,shapeRendering:"crispEdges"}),j.createElement("path",{fill:e,d:O,shapeRendering:"crispEdges"}),A)});Ye.displayName="QRCodeSVG";const de=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],Z=200,Ge={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},ue=(l,a,n)=>{if(typeof l!="number"||!isFinite(l)||l===0)return"0";const u=n!==void 0?n:Ge[a==null?void 0:a.toUpperCase()]||2;return l>0&&l<1e-6?l.toFixed(u>8?u:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:u}).format(l)},Ve=l=>typeof l!="number"||!isFinite(l)||l===0?"$0.00":l>0&&l<.01?`$${l.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(l);function tt(){var re;const l=Le(),a=Se(),n=((a==null?void 0:a.id)||"").toString(),u=ie(ae.selectRows),x=ie(ae.selectLoading),[m,v]=N.useState(!1),[C,e]=N.useState("Address copied"),[s,t]=N.useState(!1),[o,i]=N.useState(!1),[d,c]=N.useState({}),[g,h]=N.useState(!1),[S,E]=N.useState(""),[p,M]=N.useState(null),[A,O]=N.useState([]),[I,F]=N.useState(null),[Y,Q]=N.useState(0),[D,G]=N.useState("");N.useEffect(()=>{const f=async()=>{try{h(!0);const y=await Pe.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:de.join(","),tsyms:"USD"}});if(y.data&&y.data.Response!=="Error"){const k={};de.forEach(B=>{var K;(K=y.data[B])!=null&&K.USD&&(k[B]=y.data[B].USD)}),c(k)}}catch(y){console.error("Failed to fetch exchange rates:",y)}finally{h(!1)}};f();const w=setInterval(f,5*60*1e3);return()=>clearInterval(w)},[]);const T=N.useMemo(()=>{if(!n||!d[n.toUpperCase()])return 0;const f=d[n.toUpperCase()];return Z/f},[n,d]),P=N.useMemo(()=>T===0?"0":ue(T,n),[T,n]),L=N.useMemo(()=>Me().shape({amount:Re().typeError("Amount must be a number").positive("Amount must be positive").required("Amount is required").min(T||0,`Minimum deposit is ${P} ${n}`),txid:Ae().required("Transaction ID is required")}),[T,P,n]),z=De({resolver:ze.yupResolver(L),mode:"onChange",defaultValues:{amount:"",txid:""}});N.useCallback((f,w)=>ue(f,n,w),[n]);const U=N.useCallback(f=>Ve(f),[]);N.useEffect(()=>{l(je.doFetch())},[l]),N.useEffect(()=>{if(!u||!n)return;const f=u.find(w=>!w||!w.symbol?!1:w.symbol.toString().toLowerCase()===n.toString().toLowerCase());if(!f){M(null),O([]),F(null),E("");return}if(M(f),Q(T),Array.isArray(f.network)&&f.network.length>0){const w=f.network.map((k,B)=>({_id:k._id??`${f._id??n}-network-${B}`,name:k.name??k.network??`${f.name??n} Network`,wallet:k.wallet??k.address??k.depositAddress??"",raw:k}));O(w);const y=w.find(k=>k._id===I)||w[0];F(y._id),E(y.wallet||"")}else if(f.address){const w={_id:f._id??`${n}-single`,name:`${f.name??n} Network`,wallet:f.address,raw:null};O([w]),F(w._id),E(w.wallet||"")}else O([]),F(null),E("")},[u,n,T]),N.useEffect(()=>{if(!I)return;const f=A.find(w=>w._id===I);f&&E(f.wallet||"")},[I,A]);const V=N.useCallback(async()=>{if(!S){console.error("No address to copy");return}try{await navigator.clipboard.writeText(S),e("Address copied"),v(!0),setTimeout(()=>v(!1),3e3)}catch(f){console.error("Failed to copy address: ",f),e("Failed to copy address"),v(!0),setTimeout(()=>v(!1),3e3)}},[S]),X=N.useCallback(()=>{var w;const f=document.querySelector(".qr-box canvas");if(!(f instanceof HTMLCanvasElement)){console.error("QR canvas not found"),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3);return}try{const y=document.createElement("a"),k=(((w=A.find(B=>B._id===I))==null?void 0:w.name)||"deposit").replace(/\s+/g,"-");y.download=`${n}-${k}-address.png`,y.href=f.toDataURL("image/png"),y.click(),e("QR code saved"),v(!0),setTimeout(()=>v(!1),3e3)}catch(y){console.error("Failed to save QR code",y),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3)}},[A,I,n]),q=N.useCallback(f=>{const w=f.target.value;F(w),z.setValue("amount",""),z.clearErrors("amount")},[z]),ee=N.useCallback(async f=>{if(!I||!p||!S){console.error("Missing required information");return}t(!0);try{const w=new Date,y=w.getFullYear(),k=String(w.getMonth()+1).padStart(2,"0"),B=String(w.getDate()).padStart(2,"0"),K=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),Ee={orderno:`RE${y}${k}${B}${K}`,amount:f.amount,txid:f.txid,rechargechannel:n,status:"pending",network:I,rechargetime:w.toISOString()};G(f.amount),await l(ke.doCreate(Ee)),i(!0),z.reset()}catch(w){console.error("Deposit submission error:",w)}finally{t(!1)}},[I,p,S,n,l,z]),W=N.useCallback(()=>{i(!1),G("")},[]),te=N.useCallback(f=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${f?f.toUpperCase():""}.png`,[]),H=z.watch("amount"),oe=N.useMemo(()=>{if(!H||!d[n==null?void 0:n.toUpperCase()])return 0;const f=Number(H);return isNaN(f)||!isFinite(f)?0:f*d[n.toUpperCase()]},[H,n,d]);return r.jsxs("div",{className:"deposit-container",children:[r.jsx("div",{className:"header",children:r.jsxs("div",{className:"nav-bar",children:[r.jsx(Ie,{to:"/deposit",className:"back-arrow","aria-label":"Back to deposits",children:r.jsx("i",{className:"fas fa-arrow-left"})}),r.jsxs("div",{className:"page-title",children:["Deposit ",n||"..."]})]})}),r.jsx("div",{className:"content-card",children:r.jsxs("div",{className:"deposit-content",children:[n&&d[n.toUpperCase()]&&r.jsxs("div",{className:"info-box",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:"Minimum deposit:"}),r.jsxs("span",{className:"info-value",children:[P," ",n," (",U(Z),")"]})]}),g&&r.jsxs("div",{className:"rate-loading",children:[r.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]})]}),r.jsxs("div",{className:"section",children:[r.jsx("div",{className:"section-label",children:"Deposit currency"}),r.jsxs("div",{className:"currency-display",children:[r.jsx("div",{className:"currency-icon","aria-hidden":!0,children:r.jsx("img",{src:te(n),alt:n,onError:f=>{const w=f.target;w.onerror=null,w.style.display="none";const y=w.parentElement;y&&(y.textContent=n&&n.charAt(0)||"C",y.style.background="#f0f0f0",y.style.color="#333",y.style.fontSize="12px",y.style.fontWeight="bold",y.style.display="inline-flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.width="36px",y.style.height="36px",y.style.borderRadius="6px")}})}),r.jsxs("div",{className:"currency-details",children:[r.jsx("div",{className:"currency-name",children:(p==null?void 0:p.name)||n}),d[n==null?void 0:n.toUpperCase()]&&r.jsxs("div",{className:"currency-rate",children:["1 ",n," ≈ ",U(d[n.toUpperCase()])]})]})]}),r.jsx("div",{className:"section-note",children:"Fixed currency - cannot be changed"})]}),A.length>0&&r.jsxs("div",{className:"section",children:[r.jsx("div",{className:"section-label",children:"Deposit network"}),r.jsxs("div",{className:"network-select-wrapper",children:[r.jsx("select",{className:"network-select",value:I||"",onChange:q,"aria-label":"Select deposit network",children:A.map(f=>r.jsx("option",{value:f._id,children:f.name},f._id))}),r.jsx("div",{className:"select-arrow",children:r.jsx("i",{className:"fas fa-chevron-down"})})]})]}),S&&r.jsxs("div",{className:"qr-section",children:[r.jsx("div",{className:"section-label",children:"Save QR code"}),r.jsxs("div",{className:"qr-container",children:[r.jsx("div",{className:"qr-box","aria-hidden":!0,children:r.jsx(Ce,{value:S,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),r.jsxs("div",{className:"address-section",children:[r.jsx("div",{className:"address-label",children:"Wallet Address"}),r.jsx("div",{className:"address-text",id:"walletAddress",children:S}),r.jsxs("div",{className:"address-actions",children:[r.jsxs("button",{type:"button",className:"action-btn copy-btn",onClick:V,"aria-label":"Copy address",children:[r.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),r.jsxs("button",{type:"button",className:"action-btn save-btn",onClick:X,"aria-label":"Save QR code",children:[r.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),S&&r.jsx(Fe,{...z,children:r.jsxs("form",{onSubmit:z.handleSubmit(ee),className:"deposit-form",children:[r.jsx("div",{className:"section",children:r.jsxs("div",{className:"form-group",children:[r.jsxs("div",{className:"input-with-usd",children:[r.jsx(le,{name:"amount",label:`Amount (${n})`,placeholder:`Minimum: ${P} ${n}`,className:"form-input"}),oe>0&&r.jsxs("div",{className:"usd-value-display",children:["≈ ",U(oe)]})]}),r.jsxs("div",{className:"min-amount-note",children:["Minimum deposit: ",P," ",n," (",U(Z),")"]})]})}),r.jsx("div",{className:"section",children:r.jsx("div",{className:"form-group",children:r.jsx(le,{name:"txid",label:"Transaction ID",placeholder:"Enter your transaction ID",className:"form-input"})})}),r.jsx("div",{className:"form-actions",children:r.jsx("button",{type:"submit",className:"submit-btn",disabled:!z.formState.isValid||s||g,"aria-disabled":!z.formState.isValid||s||g,children:s?r.jsxs(r.Fragment,{children:[r.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):g?r.jsxs(r.Fragment,{children:[r.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]}):"Confirm Deposit"})})]})}),x&&r.jsxs("div",{className:"loading-section",role:"status","aria-live":"polite",children:[r.jsx("div",{className:"spinner"}),r.jsx("div",{children:"Loading deposit information..."})]}),!x&&!S&&n&&r.jsxs("div",{className:"error-section",role:"alert",children:[r.jsx("i",{className:"fas fa-exclamation-triangle"}),r.jsxs("div",{children:["No deposit address found for ",n]}),r.jsx("div",{className:"error-note",children:"Please contact support or try another currency."})]}),r.jsxs("div",{className:"hint-section",children:[r.jsx("div",{className:"hint-title",children:"Important Notes"}),r.jsxs("div",{className:"hint-content",children:[r.jsxs("div",{className:"hint-item",children:["1. Send only ",n," to this deposit address. Sending other currencies may result in permanent loss."]}),r.jsxs("div",{className:"hint-item",children:["2. Ensure you are using the correct network (",(re=A.find(f=>f._id===I))==null?void 0:re.name,")."]}),r.jsxs("div",{className:"hint-item",children:["3. Minimum deposit amount: ",P," ",n," ($",Z," USD equivalent)"]}),r.jsx("div",{className:"hint-item",children:"4. Transactions typically require 1-3 network confirmations before being credited to your account."}),r.jsx("div",{className:"hint-item",children:"5. Always double-check the address before sending funds."})]})]})]})}),r.jsxs("div",{className:`toast ${m?"visible":""}`,role:"status","aria-live":"polite",children:[r.jsx("i",{className:"fas fa-check-circle toast-icon"}),C]}),o&&r.jsx("div",{className:"modal-overlay",role:"dialog","aria-modal":"true",children:r.jsxs("div",{className:"modal-content",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{children:"Deposit Submitted Successfully"}),r.jsx("button",{className:"modal-close",onClick:W,"aria-label":"Close",children:r.jsx("i",{className:"fas fa-times"})})]}),r.jsxs("div",{className:"modal-body",children:[r.jsx("div",{className:"success-icon",children:r.jsx("i",{className:"fas fa-check-circle"})}),r.jsxs("div",{className:"success-message",children:["Your deposit of ",D," ",n," has been submitted for processing."]}),r.jsxs("div",{className:"success-details",children:[r.jsx("p",{children:"Please wait for network confirmations. This usually takes 5-30 minutes."}),r.jsx("p",{children:"You can track the status in your transaction history."})]})]}),r.jsx("div",{className:"modal-footer",children:r.jsx("button",{className:"modal-btn",onClick:W,children:"OK"})})]})}),r.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .deposit-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .deposit-content {
          width: 100%;
        }

        /* Info Box */
        .info-box {
          background: #e8f4ff;
          border: 1px solid #b6d9ff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .info-label {
          font-size: 12px;
          color: #106cf5;
          font-weight: 500;
        }

        .info-value {
          font-size: 12px;
          font-weight: 600;
          color: #222;
        }

        .rate-loading {
          font-size: 11px;
          color: #666;
          text-align: center;
          margin-top: 4px;
        }

        .rate-loading .fa-spin {
          margin-right: 6px;
        }

        .section {
          margin-bottom: 14px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        .currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          margin-bottom: 8px;
        }

        .currency-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          overflow: hidden;
          flex-shrink: 0;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-details {
          flex: 1;
        }

        .currency-name {
          font-size: 13px;
          font-weight: 600;
          color: #222;
          margin-bottom: 2px;
        }

        .currency-rate {
          font-size: 11px;
          color: #666;
        }

        .section-note {
          font-size: 12px;
          color: #666;
          font-style: italic;
        }

        .network-select-wrapper {
          position: relative;
        }

        .network-select {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .network-select:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }

        .qr-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .qr-box {
          display: flex;
          justify-content: center;
          padding: 10px;
          background: white;
          border-radius: 8px;
        }

        .qr-box canvas {
          border-radius: 8px;
        }

        .address-section {
          text-align: center;
        }

        .address-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin-bottom: 12px;
        }

        .address-text {
          font-size: 13px;
          color: #333;
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          word-break: break-all;
          font-family: monospace;
          line-height: 1.4;
        }

        .address-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .action-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .copy-btn {
          background: #106cf5;
          color: white;
        }

        .copy-btn:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .save-btn {
          background: white;
          color: #106cf5;
          border: 1px solid #106cf5;
        }

        .save-btn:hover {
          background: #f0f7ff;
          transform: translateY(-2px);
        }

        .deposit-form {
          margin-top: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .input-with-usd {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .usd-value-display {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #666;
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .error-message {
          color: #ff4757;
          font-size: 12px;
          margin-top: 4px;
        }

        .min-amount-note {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
          font-style: italic;
        }

        .form-actions {
          margin-top: 24px;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .fa-spin {
          animation: fa-spin 1s infinite linear;
        }

        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 90%;
          
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #222;
        }

        .modal-close {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #ff4757;
        }

        .modal-body {
          padding: 30px 20px;
          text-align: center;
        }

        .success-icon {
          font-size: 60px;
          color: #4CAF50;
          margin-bottom: 20px;
        }

        .success-message {
          font-size: 16px;
          color: #222;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .success-details {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .success-details p {
          margin: 10px 0;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .modal-btn {
          width: 100%;
          padding: 14px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .modal-btn:hover {
          background: #0a4fc4;
        }

        .loading-section {
          text-align: center;
          padding: 40px 0;
          color: #666;
        }

        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #106cf5;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-section {
          text-align: center;
          padding: 40px 20px;
          color: #ff4757;
        }

        .error-section i {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .error-note {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }

        .hint-section {
          margin-top: 24px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .hint-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .hint-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hint-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
          position: relative;
          padding-left: 12px;
        }

        .hint-item::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #106cf5;
          font-weight: bold;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
          z-index: 1000;
        }

        .toast.visible {
          transform: translateX(-50%) translateY(0);
        }

        .toast-icon {
          color: #4CAF50;
        }

        @media (max-width: 380px) {
          .deposit-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .currency-display {
            padding: 12px;
          }

          .currency-icon {
            width: 36px;
            height: 36px;
          }

          .currency-name {
            font-size: 15px;
          }

          .network-select {
            padding: 12px 14px;
            font-size: 14px;
          }

          .qr-container {
            padding: 20px;
          }

          .qr-box canvas {
            width: 160px;
            height: 160px;
          }

          .address-text {
            font-size: 12px;
            padding: 10px;
          }

          .address-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .form-input {
            padding: 12px 14px;
            font-size: 14px;
          }

          .submit-btn {
            padding: 14px;
            font-size: 15px;
          }

          .hint-section {
            padding: 16px;
          }

          .hint-title {
            font-size: 13px;
          }

          .hint-item {
            font-size: 9px;
          }

          .modal-content {
            width: 95%;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .deposit-content {
            max-width: 500px;
            margin: 0 auto;
          }

          .address-actions {
            flex-direction: row;
          }
        }
      `})]})}export{tt as default};
