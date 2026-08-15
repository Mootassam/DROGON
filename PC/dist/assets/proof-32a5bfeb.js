import{g as Ze,o as b,aC as Ke,F as Je,T as Qe,v as oe,aD as Be,aE as et,j as P,aa as A,n as s,aF as tt,u as rt,i as ot,H as nt,aG as je,a3 as at,aH as it}from"./index-de0c4ae3.js";import{a as st,b as lt,u as ct,y as dt,F as ut}from"./FormErrors-cb282015.js";import{y as R}from"./yupFormSchemas-d29632a9.js";import{I as se}from"./InputFormItem-d631a07c.js";import{v as pt}from"./v4-4a60fe23.js";import{m as ft,s as mt,u as ht}from"./memoize.browser.esm-012df344.js";import{u as gt}from"./useDispatch-39c1e2e9.js";var _e={exports:{}};(function(e,o){(function(t){var r=/^(b|B)$/,n={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},i={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function a(c){var u,l,x,y,S,h,d,m,p,k,g,N,C,j,T,w=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},f=[],I=0,v=void 0,E=void 0;if(isNaN(c))throw new TypeError("Invalid number");return l=w.bits===!0,g=w.unix===!0,u=w.base||2,k=w.round!==void 0?w.round:g?1:2,h=w.locale!==void 0?w.locale:"",d=w.localeOptions||{},N=w.separator!==void 0?w.separator:"",C=w.spacer!==void 0?w.spacer:g?"":" ",T=w.symbols||{},j=u===2&&w.standard||"jedec",p=w.output||"string",y=w.fullform===!0,S=w.fullforms instanceof Array?w.fullforms:[],v=w.exponent!==void 0?w.exponent:-1,x=2<u?1e3:1024,(m=(E=Number(c))<0)&&(E=-E),(v===-1||isNaN(v))&&(v=Math.floor(Math.log(E)/Math.log(x)))<0&&(v=0),8<v&&(v=8),p==="exponent"?v:(E===0?(f[0]=0,f[1]=g?"":n[j][l?"bits":"bytes"][v]):(I=E/(u===2?Math.pow(2,10*v):Math.pow(1e3,v)),l&&x<=(I*=8)&&v<8&&(I/=x,v++),f[0]=Number(I.toFixed(0<v?k:0)),f[0]===x&&v<8&&w.exponent===void 0&&(f[0]=1,v++),f[1]=u===10&&v===1?l?"kb":"kB":n[j][l?"bits":"bytes"][v],g&&(f[1]=j==="jedec"?f[1].charAt(0):0<v?f[1].replace(/B$/,""):f[1],r.test(f[1])&&(f[0]=Math.floor(f[0]),f[1]=""))),m&&(f[0]=-f[0]),f[1]=T[f[1]]||f[1],h===!0?f[0]=f[0].toLocaleString():0<h.length?f[0]=f[0].toLocaleString(h,d):0<N.length&&(f[0]=f[0].toString().replace(".",N)),p==="array"?f:(y&&(f[1]=S[v]?S[v]:i[j][v]+(l?"bit":"byte")+(f[0]===1?"":"s")),p==="object"?{value:f[0],symbol:f[1],exponent:v}:f.join(C)))}a.partial=function(c){return function(u){return a(u,c)}},e.exports=a})()})(_e);var xt=_e.exports;const bt=Ze(xt);class Ce{static validate(o,t){if(!t)return;if(t.image&&!o.type.startsWith("image"))throw new Error(b("fileUploader.image"));if(t.storage.maxSizeInBytes&&o.size>t.storage.maxSizeInBytes)throw new Error(b("fileUploader.size",bt(t.storage.maxSizeInBytes)));const r=Ne(o.name);if(t.formats&&!t.formats.includes(r))throw new Error(b("fileUploader.formats",t.formats.join(", ")))}static async upload(o,t){try{this.validate(o,t)}catch(l){return Promise.reject(l)}const r=Ne(o.name),n=pt(),i=`${n}.${r}`,{uploadCredentials:a,downloadUrl:c,privateUrl:u}=await this.fetchFileCredentials(i,t);return await this.uploadToServer(o,a),{id:n,name:o.name,sizeInBytes:o.size,publicUrl:a&&a.publicUrl?a.publicUrl:null,privateUrl:u,downloadUrl:c,new:!0}}static async fetchFileCredentials(o,t){const r=Ke.get(),{data:n}=await Je.get(`/tenant/${r}/file/credentials`,{params:{filename:o,storageId:t.storage.id}});return n}static async uploadToServer(o,t){try{const r=t.url,n=new FormData;for(const[i,a]of Object.entries(t.fields||{}))n.append(i,a);return n.append("file",o),Qe.post(r,n,{headers:{"Content-Type":"multipart/form-data"}})}catch(r){throw console.error(r),r}}}function Ne(e){if(!e)return null;const t=/(?:\.([^.]+))?$/.exec(e);return t?t[1]:null}var yt=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Ae=ft(function(e){return yt.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function B(){return(B=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var Ie=function(e,o){for(var t=[e[0]],r=0,n=o.length;r<n;r+=1)t.push(o[r],e[r+1]);return t},ue=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!Be.typeOf(e)},ee=Object.freeze([]),M=Object.freeze({});function H(e){return typeof e=="function"}function Ee(e){return e.displayName||e.name||"Component"}function ge(e){return e&&typeof e.styledComponentId=="string"}var Y=typeof process<"u"&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",xe=typeof window<"u"&&"HTMLElement"in window,vt=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY);function $(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var wt=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var o=e.prototype;return o.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},o.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,i=n.length,a=i;t>=a;)(a<<=1)<0&&$(16,""+t);this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var c=i;c<a;c++)this.groupSizes[c]=0}for(var u=this.indexOfGroup(t+1),l=0,x=r.length;l<x;l++)this.tag.insertRule(u,r[l])&&(this.groupSizes[t]++,u++)},o.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),i=n+r;this.groupSizes[t]=0;for(var a=n;a<i;a++)this.tag.deleteRule(n)}},o.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],i=this.indexOfGroup(t),a=i+n,c=i;c<a;c++)r+=this.tag.getRule(c)+`/*!sc*/
`;return r},e}(),Q=new Map,te=new Map,le=1,K=function(e){if(Q.has(e))return Q.get(e);for(;te.has(le);)le++;var o=le++;return Q.set(e,o),te.set(o,e),o},St=function(e){return te.get(e)},kt=function(e,o){Q.set(e,o),te.set(o,e)},jt="style["+Y+'][data-styled-version="5.2.1"]',Ct=new RegExp("^"+Y+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),Nt=function(e,o,t){for(var r,n=t.split(","),i=0,a=n.length;i<a;i++)(r=n[i])&&e.registerName(o,r)},At=function(e,o){for(var t=o.innerHTML.split(`/*!sc*/
`),r=[],n=0,i=t.length;n<i;n++){var a=t[n].trim();if(a){var c=a.match(Ct);if(c){var u=0|parseInt(c[1],10),l=c[2];u!==0&&(kt(l,u),Nt(e,l,c[3]),e.getTag().insertRules(u,r)),r.length=0}else r.push(a)}}},It=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},Me=function(e){var o=document.head,t=e||o,r=document.createElement("style"),n=function(c){for(var u=c.childNodes,l=u.length;l>=0;l--){var x=u[l];if(x&&x.nodeType===1&&x.hasAttribute(Y))return x}}(t),i=n!==void 0?n.nextSibling:null;r.setAttribute(Y,"active"),r.setAttribute("data-styled-version","5.2.1");var a=It();return a&&r.setAttribute("nonce",a),t.insertBefore(r,i),r},Et=function(){function e(t){var r=this.element=Me(t);r.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var i=document.styleSheets,a=0,c=i.length;a<c;a++){var u=i[a];if(u.ownerNode===n)return u}$(17)}(r),this.length=0}var o=e.prototype;return o.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},o.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},o.getRule=function(t){var r=this.sheet.cssRules[t];return r!==void 0&&typeof r.cssText=="string"?r.cssText:""},e}(),Pt=function(){function e(t){var r=this.element=Me(t);this.nodes=r.childNodes,this.length=0}var o=e.prototype;return o.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r),i=this.nodes[t];return this.element.insertBefore(n,i||null),this.length++,!0}return!1},o.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},o.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Tt=function(){function e(t){this.rules=[],this.length=0}var o=e.prototype;return o.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},o.deleteRule=function(t){this.rules.splice(t,1),this.length--},o.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Pe=xe,zt={isServer:!xe,useCSSOMInjection:!vt},Fe=function(){function e(t,r,n){t===void 0&&(t=M),r===void 0&&(r={}),this.options=B({},zt,{},t),this.gs=r,this.names=new Map(n),!this.options.isServer&&xe&&Pe&&(Pe=!1,function(i){for(var a=document.querySelectorAll(jt),c=0,u=a.length;c<u;c++){var l=a[c];l&&l.getAttribute(Y)!=="active"&&(At(i,l),l.parentNode&&l.parentNode.removeChild(l))}}(this))}e.registerId=function(t){return K(t)};var o=e.prototype;return o.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(B({},this.options,{},t),this.gs,r&&this.names||void 0)},o.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},o.getTag=function(){return this.tag||(this.tag=(n=(r=this.options).isServer,i=r.useCSSOMInjection,a=r.target,t=n?new Tt(a):i?new Et(a):new Pt(a),new wt(t)));var t,r,n,i,a},o.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},o.registerName=function(t,r){if(K(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},o.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(K(t),n)},o.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},o.clearRules=function(t){this.getTag().clearGroup(K(t)),this.clearNames(t)},o.clearTag=function(){this.tag=void 0},o.toString=function(){return function(t){for(var r=t.getTag(),n=r.length,i="",a=0;a<n;a++){var c=St(a);if(c!==void 0){var u=t.names.get(c),l=r.getGroup(a);if(u!==void 0&&l.length!==0){var x=Y+".g"+a+'[id="'+c+'"]',y="";u!==void 0&&u.forEach(function(S){S.length>0&&(y+=S+",")}),i+=""+l+x+'{content:"'+y+`"}/*!sc*/
`}}}return i}(this)},e}(),Rt=/(a)(d)/gi,Te=function(e){return String.fromCharCode(e+(e>25?39:97))};function pe(e){var o,t="";for(o=Math.abs(e);o>52;o=o/52|0)t=Te(o%52)+t;return(Te(o%52)+t).replace(Rt,"$1-$2")}var q=function(e,o){for(var t=o.length;t;)e=33*e^o.charCodeAt(--t);return e},De=function(e){return q(5381,e)};function Bt(e){for(var o=0;o<e.length;o+=1){var t=e[o];if(H(t)&&!ge(t))return!1}return!0}var _t=De("5.2.1"),Mt=function(){function e(o,t,r){this.rules=o,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Bt(o),this.componentId=t,this.baseHash=q(_t,t),this.baseStyle=r,Fe.registerId(t)}return e.prototype.generateAndInjectStyles=function(o,t,r){var n=this.componentId,i=[];if(this.baseStyle&&i.push(this.baseStyle.generateAndInjectStyles(o,t,r)),this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(n,this.staticRulesId))i.push(this.staticRulesId);else{var a=G(this.rules,o,t,r).join(""),c=pe(q(this.baseHash,a.length)>>>0);if(!t.hasNameForId(n,c)){var u=r(a,"."+c,void 0,n);t.insertRules(n,c,u)}i.push(c),this.staticRulesId=c}else{for(var l=this.rules.length,x=q(this.baseHash,r.hash),y="",S=0;S<l;S++){var h=this.rules[S];if(typeof h=="string")y+=h;else if(h){var d=G(h,o,t,r),m=Array.isArray(d)?d.join(""):d;x=q(x,m+S),y+=m}}if(y){var p=pe(x>>>0);if(!t.hasNameForId(n,p)){var k=r(y,"."+p,void 0,n);t.insertRules(n,p,k)}i.push(p)}}return i.join(" ")},e}(),Ft=/^\s*\/\/.*$/gm,Dt=[":","[",".","#"];function Ot(e){var o,t,r,n,i=e===void 0?M:e,a=i.options,c=a===void 0?M:a,u=i.plugins,l=u===void 0?ee:u,x=new mt(c),y=[],S=function(m){function p(k){if(k)try{m(k+"}")}catch{}}return function(k,g,N,C,j,T,w,f,I,v){switch(k){case 1:if(I===0&&g.charCodeAt(0)===64)return m(g+";"),"";break;case 2:if(f===0)return g+"/*|*/";break;case 3:switch(f){case 102:case 112:return m(N[0]+g),"";default:return g+(v===0?"/*|*/":"")}case-2:g.split("/*|*/}").forEach(p)}}}(function(m){y.push(m)}),h=function(m,p,k){return p===0&&Dt.includes(k[t.length])||k.match(n)?m:"."+o};function d(m,p,k,g){g===void 0&&(g="&");var N=m.replace(Ft,""),C=p&&k?k+" "+p+" { "+N+" }":N;return o=g,t=p,r=new RegExp("\\"+t+"\\b","g"),n=new RegExp("(\\"+t+"\\b){2,}"),x(k||!p?"":p,C)}return x.use([].concat(l,[function(m,p,k){m===2&&k.length&&k[0].lastIndexOf(t)>0&&(k[0]=k[0].replace(r,h))},S,function(m){if(m===-2){var p=y;return y=[],p}}])),d.hash=l.length?l.reduce(function(m,p){return p.name||$(15),q(m,p.name)},5381).toString():"",d}var Oe=oe.createContext();Oe.Consumer;var Le=oe.createContext(),Lt=(Le.Consumer,new Fe),fe=Ot();function Ut(){return P.useContext(Oe)||Lt}function qt(){return P.useContext(Le)||fe}var Yt=function(){function e(o,t){var r=this;this.inject=function(n,i){i===void 0&&(i=fe);var a=r.name+i.hash;n.hasNameForId(r.id,a)||n.insertRules(r.id,a,i(r.rules,a,"@keyframes"))},this.toString=function(){return $(12,String(r.name))},this.name=o,this.id="sc-keyframes-"+o,this.rules=t}return e.prototype.getName=function(o){return o===void 0&&(o=fe),this.name+o.hash},e}(),Gt=/([A-Z])/,Ht=/([A-Z])/g,$t=/^ms-/,Vt=function(e){return"-"+e.toLowerCase()};function ze(e){return Gt.test(e)?e.replace(Ht,Vt).replace($t,"-ms-"):e}var Re=function(e){return e==null||e===!1||e===""};function G(e,o,t,r){if(Array.isArray(e)){for(var n,i=[],a=0,c=e.length;a<c;a+=1)(n=G(e[a],o,t,r))!==""&&(Array.isArray(n)?i.push.apply(i,n):i.push(n));return i}if(Re(e))return"";if(ge(e))return"."+e.styledComponentId;if(H(e)){if(typeof(l=e)!="function"||l.prototype&&l.prototype.isReactComponent||!o)return e;var u=e(o);return G(u,o,t,r)}var l;return e instanceof Yt?t?(e.inject(t,r),e.getName(r)):e:ue(e)?function x(y,S){var h,d,m=[];for(var p in y)y.hasOwnProperty(p)&&!Re(y[p])&&(ue(y[p])?m.push.apply(m,x(y[p],p)):H(y[p])?m.push(ze(p)+":",y[p],";"):m.push(ze(p)+": "+(h=p,(d=y[p])==null||typeof d=="boolean"||d===""?"":typeof d!="number"||d===0||h in ht?String(d).trim():d+"px")+";"));return S?[S+" {"].concat(m,["}"]):m}(e):e.toString()}function Wt(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];return H(e)||ue(e)?G(Ie(ee,[e].concat(t))):t.length===0&&e.length===1&&typeof e[0]=="string"?e:G(Ie(e,t))}var Xt=function(e,o,t){return t===void 0&&(t=M),e.theme!==t.theme&&e.theme||o||t.theme},Zt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Kt=/(^-|-$)/g;function ce(e){return e.replace(Zt,"-").replace(Kt,"")}var Jt=function(e){return pe(De(e)>>>0)};function J(e){return typeof e=="string"&&!0}var me=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},Qt=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"};function er(e,o,t){var r=e[t];me(o)&&me(r)?Ue(r,o):e[t]=o}function Ue(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];for(var n=0,i=t;n<i.length;n++){var a=i[n];if(me(a))for(var c in a)Qt(c)&&er(e,a[c],c)}return e}var qe=oe.createContext();qe.Consumer;var de={};function Ye(e,o,t){var r=ge(e),n=!J(e),i=o.attrs,a=i===void 0?ee:i,c=o.componentId,u=c===void 0?function(g,N){var C=typeof g!="string"?"sc":ce(g);de[C]=(de[C]||0)+1;var j=C+"-"+Jt("5.2.1"+C+de[C]);return N?N+"-"+j:j}(o.displayName,o.parentComponentId):c,l=o.displayName,x=l===void 0?function(g){return J(g)?"styled."+g:"Styled("+Ee(g)+")"}(e):l,y=o.displayName&&o.componentId?ce(o.displayName)+"-"+o.componentId:o.componentId||u,S=r&&e.attrs?Array.prototype.concat(e.attrs,a).filter(Boolean):a,h=o.shouldForwardProp;r&&e.shouldForwardProp&&(h=o.shouldForwardProp?function(g,N){return e.shouldForwardProp(g,N)&&o.shouldForwardProp(g,N)}:e.shouldForwardProp);var d,m=new Mt(t,y,r?e.componentStyle:void 0),p=m.isStatic&&a.length===0,k=function(g,N){return function(C,j,T,w){var f=C.attrs,I=C.componentStyle,v=C.defaultProps,E=C.foldedComponentIds,ye=C.shouldForwardProp,ve=C.styledComponentId,$e=C.target,we=function(O,ae,ie){O===void 0&&(O=M);var V=B({},ae,{theme:O}),L={};return ie.forEach(function(W){var z,X,Z,U=W;for(z in H(U)&&(U=U(V)),U)V[z]=L[z]=z==="className"?(X=L[z],Z=U[z],X&&Z?X+" "+Z:X||Z):U[z]}),[V,L]}(Xt(j,P.useContext(qe),v)||M,j,f),Ve=we[0],F=we[1],Se=function(O,ae,ie,V){var L=Ut(),W=qt(),z=ae?O.generateAndInjectStyles(M,L,W):O.generateAndInjectStyles(ie,L,W);return z}(I,w,Ve),We=T,ke=F.$as||j.$as||F.as||j.as||$e,Xe=J(ke),ne=F!==j?B({},j,{},F):j,D={};for(var _ in ne)_[0]!=="$"&&_!=="as"&&(_==="forwardedAs"?D.as=ne[_]:(ye?ye(_,Ae):!Xe||Ae(_))&&(D[_]=ne[_]));return j.style&&F.style!==j.style&&(D.style=B({},j.style,{},F.style)),D.className=Array.prototype.concat(E,ve,Se!==ve?Se:null,j.className,F.className).filter(Boolean).join(" "),D.ref=We,P.createElement(ke,D)}(d,g,N,p)};return k.displayName=x,(d=oe.forwardRef(k)).attrs=S,d.componentStyle=m,d.displayName=x,d.shouldForwardProp=h,d.foldedComponentIds=r?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):ee,d.styledComponentId=y,d.target=r?e.target:e,d.withComponent=function(g){var N=o.componentId,C=function(T,w){if(T==null)return{};var f,I,v={},E=Object.keys(T);for(I=0;I<E.length;I++)f=E[I],w.indexOf(f)>=0||(v[f]=T[f]);return v}(o,["componentId"]),j=N&&N+"-"+(J(g)?g:ce(Ee(g)));return Ye(g,B({},C,{attrs:S,componentId:j}),t)},Object.defineProperty(d,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(g){this._foldedDefaultProps=r?Ue({},e.defaultProps,g):g}}),d.toString=function(){return"."+d.styledComponentId},n&&et(d,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),d}var he=function(e){return function o(t,r,n){if(n===void 0&&(n=M),!Be.isValidElementType(r))return $(1,String(r));var i=function(){return t(r,n,Wt.apply(void 0,arguments))};return i.withConfig=function(a){return o(t,r,B({},n,{},a))},i.attrs=function(a){return o(t,r,B({},n,{attrs:Array.prototype.concat(n.attrs,a).filter(Boolean)}))},i}(Ye,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){he[e]=he(e)});const Ge=he,tr=Ge.div`
/* ImagesUploader.css or add to your style tag */
.images-uploader-wrapper {
  width: 100%;
  margin-bottom: 16px;
}

.upload-area {
  border: 2px dashed #e7eaee;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8f9fa;
  position: relative;
}

.upload-area:hover {
  border-color: #106cf5;
  background: #f0f7ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.upload-area:active {
  transform: translateY(0);
}

.upload-icon {
  font-size: 48px;
  color: #106cf5;
  margin-bottom: 16px;
  opacity: 0.8;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.upload-subtext {
  font-size: 12px;
  color: #888f99;
  font-weight: 400;
}

/* Upload card for showing uploaded image */
.upload-card {
  border: 1px solid #e7eaee;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
  transition: all 0.3s ease;
}

.upload-card:hover {
  border-color: #106cf5;
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.uploaded-box {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.uploaded-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

/* Image buttons */
.img-buttons {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 10px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.img-buttons button {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.img-buttons button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.img-buttons button:active {
  transform: scale(0.95);
}

/* Loading state */
.upload-area.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.upload-area.loading .upload-icon {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 380px) {
  .upload-area {
    padding: 30px 16px;
  }
  
  .upload-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
  
  .upload-text {
    font-size: 14px;
  }
  
  .upload-subtext {
    font-size: 11px;
  }
  
  .uploaded-box {
    height: 160px;
  }
  
  .upload-card {
    padding: 12px;
  }
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Progress indicator for upload */
.upload-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e7eaee;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.upload-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #106cf5 0%, #0a4fc4 100%);
  transition: width 0.3s ease;
}

/* Error state */
.upload-area.error {
  border-color: #f44336;
  background: #fff5f5;
}

.upload-area.error .upload-icon {
  color: #f44336;
}

.upload-area.error .upload-text {
  color: #f44336;
}

/* Success state */
.upload-area.success {
  border-color: #37b66a;
  background: #f7fdf9;
}

.upload-area.success .upload-icon {
  color: #37b66a;
}

.upload-area.success .upload-text {
  color: #37b66a;
}

`,rr=Ge.div`
  /* The Modal (background) */
  .modal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(
      0,
      0,
      0,
      0.9
    ); /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-content,
  #caption {
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px) {
    .modal-content {
      width: 100%;
    }
  }
`;function He(e){return s.jsx(rr,{children:s.jsxs("div",{className:"modal",children:[s.jsx("span",{className:"close",onClick:e.onClose,children:"×"}),s.jsx("img",{className:"modal-content",src:e.src,alt:e.alt})]})})}He.propTypes={src:A.string.isRequired,alt:A.string.isRequired,onClose:A.func.isRequired};function be(e){const[o,t]=P.useState(!1),[r,n]=P.useState(null),i=P.useRef(),a=()=>{const{value:h}=e;return h?Array.isArray(h)?h:[h]:[]},c=h=>{const d=a().filter(m=>m.id!==h);e.onChange(d)},u=async h=>{try{const d=h.target.files;if(!d||!d.length)return;let m=d[0];Ce.validate(m,{storage:e.storage,image:!0}),t(!0),m=await Ce.upload(m,{storage:e.storage,image:!0}),i!=null&&i.current&&(i.current.value=null),t(!1),e.onChange([m])}catch(d){i!=null&&i.current&&(i.current.value=null),console.error(d),t(!1),tt.showMessage(d)}},l=h=>{n({src:h.downloadUrl,alt:h.name})},x=()=>{n(null)},{readonly:y}=e,S=s.jsx("label",{children:s.jsxs("div",{className:"upload-area",children:[s.jsx("div",{className:"upload-icon",children:s.jsx("i",{className:"fas fa-cloud-upload-alt"})}),s.jsx("div",{className:"upload-text",children:e.text}),s.jsx("div",{className:"upload-subtext",children:"JPG, PNG or PDF, max 5MB"}),s.jsx("input",{style:{display:"none"},disabled:o||y,accept:"image/*",type:"file",onChange:u,ref:i})]})});return s.jsxs(tr,{children:[y||a().length>0?null:S,a().length>0&&s.jsx("div",{className:"upload-card",children:a().length===0?S:a().map(h=>s.jsxs("div",{className:"uploaded-box",children:[s.jsx("img",{alt:h.name,src:h.downloadUrl,className:"uploaded-img"}),s.jsxs("div",{className:"img-buttons",children:[s.jsx("button",{type:"button",className:"btn btn-link",onClick:()=>l(h),children:s.jsx("i",{className:"fas fa-search"})}),!y&&s.jsx("button",{type:"button",className:"btn btn-link ml-2",onClick:()=>c(h.id),children:s.jsx("i",{className:"fas fa-times"})})]})]},h.id||h.name))}),r&&s.jsx(He,{src:r.src,alt:r.alt,onClose:x})]})}be.propTypes={readonly:A.bool,storage:A.object,value:A.any,onChange:A.func,text:A.string};be.defaultProps={text:"Upload"};function re(e){const{label:o,name:t,text:r,hint:n,storage:i,max:a,required:c,externalErrorMessage:u}=e,{errors:l,formState:{touched:x,isSubmitted:y},setValue:S,watch:h,register:d}=st();P.useEffect(()=>{d({name:t})},[d,t]);const m=lt.errorMessage(t,l,x,y,u);return s.jsxs("div",{className:"file-upload",children:[!!o&&s.jsx("label",{className:`input-label ${c?"required":null}`,htmlFor:t,children:o}),s.jsx(be,{storage:i,value:h(t),onChange:p=>{S(t,p,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(p)},text:r,max:a}),s.jsx("div",{className:"invalid-feedback",children:m}),!!n&&s.jsx("small",{className:"form-text text-muted",children:n})]})}re.defaultProps={max:void 0,required:!1};re.propTypes={storage:A.object.isRequired,max:A.number,required:A.bool,name:A.string.isRequired,label:A.string,hint:A.string,formItemProps:A.object,text:A.string};const or={status:["pending","canceled","success"],type:["withdraw","deposit"]},nr=e=>at().shape({user:R.relationToOne(b("entities.vip.fields.title"),{}),Documenttype:R.string(b("pages.proof.fields.documentType")),realname:R.string(b("pages.proof.fields.fullName"),{required:!0}),idnumer:R.string(b("pages.proof.fields.documentNumber"),{required:!0}),address:R.string(b("pages.proof.fields.address"),{required:!0}),front:R.images(b("pages.proof.fields.frontSide"),{required:!0}),back:e==="passport"?R.images(b("pages.proof.fields.backSide")):R.images(b("pages.proof.fields.backSide"),{required:!0}),status:R.enumerator(b("entities.transaction.fields.status"),{options:or.status})});function pr(){const[e,o]=P.useState("passport"),t=rt(ot.selectCurrentUser),r=gt(),n=P.useMemo(()=>nr(e),[e]),i=ct({resolver:dt.yupResolver(n),mode:"all",defaultValues:{user:t||[],Documenttype:e,realname:"",idnumer:"",address:"",front:[],back:[],status:"pending"}}),a=l=>{const x={...l,user:t,Documenttype:e};e==="passport"&&(x.back=[]),r(it.doCreate(x))},c=l=>{o(l),l==="passport"&&i.setValue("back",[])},u=[{value:"passport",label:b("pages.proof.documentTypes.passport"),icon:"fas fa-passport"},{value:"idCard",label:b("pages.proof.documentTypes.idCard"),icon:"fas fa-id-card"},{value:"driversLicense",label:b("pages.proof.documentTypes.driversLicense"),icon:"fas fa-id-card-alt"}];return s.jsxs("div",{className:"proof-container",children:[s.jsx("div",{className:"header",children:s.jsxs("div",{className:"nav-bar",children:[s.jsx(nt,{to:"/profile",className:"back-arrow",children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("div",{className:"page-title",children:b("pages.proof.title")})]})}),s.jsxs("div",{className:"content-card",children:[s.jsxs("div",{className:"instructions",children:[s.jsx("i",{className:"fas fa-info-circle"}),b("pages.proof.instructions")]}),s.jsx(ut,{...i,children:s.jsxs("form",{onSubmit:i.handleSubmit(a),children:[s.jsxs("div",{className:"form-section",children:[s.jsx("div",{className:"section-title",children:b("pages.proof.sections.documentInfo")}),s.jsxs("div",{className:"document-type-section",children:[s.jsxs("div",{className:"input-label",children:[b("pages.proof.fields.documentType")," ",s.jsx("span",{className:"required",children:"*"})]}),s.jsx("div",{className:"document-type-options",children:u.map(l=>s.jsxs("div",{className:`document-option ${l.value===e?"selected":""}`,onClick:()=>c(l.value),children:[s.jsx("i",{className:`${l.icon} document-icon`}),s.jsx("span",{className:"document-text",children:l.label})]},l.value))})]}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"realname",label:b("pages.proof.fields.fullName"),placeholder:b("pages.proof.placeholders.fullName")})}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"idnumer",label:b("pages.proof.fields.documentNumber"),placeholder:b("pages.proof.placeholders.documentNumber")})}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"address",label:b("pages.proof.fields.address"),placeholder:b("pages.proof.placeholders.address")})})]}),s.jsxs("div",{className:"form-section",children:[s.jsx("div",{className:"section-title",children:b("pages.proof.sections.documentUpload")}),s.jsx("div",{className:"upload-section",children:s.jsx(re,{name:"front",label:b("pages.proof.fields.frontSide"),storage:je.values.categoryPhoto,text:b("pages.proof.uploadTexts.frontSide"),max:2})}),e!=="passport"&&s.jsx("div",{className:"upload-section",children:s.jsx(re,{name:"back",label:b("pages.proof.fields.backSide"),storage:je.values.categoryPhoto,text:b("pages.proof.uploadTexts.backSide"),max:2})})]}),s.jsxs("div",{className:"security-note",children:[s.jsxs("div",{className:"security-header",children:[s.jsx("i",{className:"fas fa-shield-alt"})," ",b("pages.proof.security.title")]}),s.jsx("div",{className:"security-text",children:b("pages.proof.security.text")})]}),s.jsx("button",{type:"submit",className:"submit-button",children:b("pages.proof.buttons.validateDocuments")})]})})]}),s.jsx("style",{children:`
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

        .proof-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
          min-height: 60px;
          position: relative;
          padding: 20px;
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

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .instructions {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: #106cf5;
          margin-bottom: 25px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }

        .instructions i {
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .form-section {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e7eaee;
        }

        .document-type-section {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .required {
          color: #f44336;
        }

        .document-type-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .document-option {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .document-option:hover {
          border-color: #106cf5;
          background: #f0f7ff;
        }

        .document-option.selected {
          border-color: #106cf5;
          background: #e6f0ff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .document-icon {
          font-size: 18px;
          color: #666;
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }

        .document-option.selected .document-icon {
          color: #106cf5;
        }

        .document-text {
          font-size: 12px;
          font-weight: 500;
          color: #222;
        }

        .document-option.selected .document-text {
          color: #106cf5;
          font-weight: 600;
        }

        .input-group {
          margin-bottom: 12px;
        }

        /* Input styling */
        .text-input {
          width: 100%;
        }

        .text-input input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          color: #333;
        }

        .text-input input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .text-input input::placeholder {
          color: #aaa;
          font-size: 14px;
        }

        .text-input label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 6px;
          font-weight: 500;
        }

        /* Upload section styling */
        .upload-section {
          margin-bottom: 20px;
        }

        /* Security Note */
        .security-note {
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 25px;
        }

        .security-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #ff7a00;
          margin-bottom: 8px;
        }

        .security-header i {
          font-size: 18px;
        }

        .security-text {
          font-size: 13px;
          color: #ff7a00;
          line-height: 1.5;
          opacity: 0.9;
        }

        /* Submit Button */
        .submit-button {
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
          gap: 10px;
        }

        .submit-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        /* Image upload component styling override */
        .ant-upload.ant-upload-select {
          width: 100% !important;
        }

        .ant-upload-list-item {
          margin-top: 8px !important;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .proof-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }

          .instructions {
            font-size: 13px;
            padding: 14px;
          }

          .section-title {
            font-size: 15px;
          }

          .document-option {
            padding: 12px 14px;
          }

          .document-text {
            font-size: 13px;
          }

          .text-input input {
            padding: 10px 14px;
            font-size: 13px;
          }

          .submit-button {
            padding: 12px;
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }

          .document-type-options {
            flex-direction: row;
            gap: 12px;
          }

          .document-option {
            flex: 1;
            flex-direction: column;
            text-align: center;
            padding: 16px 10px;
          }

          .document-icon {
            margin-right: 0;
            margin-bottom: 8px;
          }
        }
      `})]})}export{pr as default};
