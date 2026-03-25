var qh=Object.defineProperty,Yh=(e,t,i)=>t in e?qh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,C=(e,t,i)=>(Yh(e,typeof t!="symbol"?t+"":t,i),i);const qe=Math.min,Xt=Math.max,Vs=Math.round,ce=e=>({x:e,y:e}),Xh={left:"right",right:"left",bottom:"top",top:"bottom"},Gh={start:"end",end:"start"};function dr(e,t,i){return Xt(e,qe(t,i))}function Ki(e,t){return typeof e=="function"?e(t):e}function Gt(e){return e.split("-")[0]}function ln(e){return e.split("-")[1]}function xl(e){return e==="x"?"y":"x"}function _l(e){return e==="y"?"height":"width"}const Zh=new Set(["top","bottom"]);function Vt(e){return Zh.has(Gt(e))?"y":"x"}function wl(e){return xl(Vt(e))}function Kh(e,t,i){i===void 0&&(i=!1);const s=ln(e),n=wl(e),o=_l(n);let r=n==="x"?s===(i?"end":"start")?"right":"left":s==="start"?"bottom":"top";return t.reference[o]>t.floating[o]&&(r=Ws(r)),[r,Ws(r)]}function Jh(e){const t=Ws(e);return[to(e),t,to(t)]}function to(e){return e.replace(/start|end/g,t=>Gh[t])}const ur=["left","right"],fr=["right","left"],Qh=["top","bottom"],td=["bottom","top"];function ed(e,t,i){switch(e){case"top":case"bottom":return i?t?fr:ur:t?ur:fr;case"left":case"right":return t?Qh:td;default:return[]}}function id(e,t,i,s){const n=ln(e);let o=ed(Gt(e),i==="start",s);return n&&(o=o.map(r=>r+"-"+n),t&&(o=o.concat(o.map(to)))),o}function Ws(e){return e.replace(/left|right|bottom|top/g,t=>Xh[t])}function sd(e){return{top:0,right:0,bottom:0,left:0,...e}}function kl(e){return typeof e!="number"?sd(e):{top:e,right:e,bottom:e,left:e}}function Ye(e){const{x:t,y:i,width:s,height:n}=e;return{width:s,height:n,top:i,left:t,right:t+s,bottom:i+n,x:t,y:i}}function pr(e,t,i){let{reference:s,floating:n}=e;const o=Vt(t),r=wl(t),a=_l(r),l=Gt(t),c=o==="y",h=s.x+s.width/2-n.width/2,d=s.y+s.height/2-n.height/2,u=s[a]/2-n[a]/2;let f;switch(l){case"top":f={x:h,y:s.y-n.height};break;case"bottom":f={x:h,y:s.y+s.height};break;case"right":f={x:s.x+s.width,y:d};break;case"left":f={x:s.x-n.width,y:d};break;default:f={x:s.x,y:s.y}}switch(ln(t)){case"start":f[r]-=u*(i&&c?-1:1);break;case"end":f[r]+=u*(i&&c?-1:1);break}return f}const nd=async(e,t,i)=>{const{placement:s="bottom",strategy:n="absolute",middleware:o=[],platform:r}=i,a=o.filter(Boolean),l=await(r.isRTL==null?void 0:r.isRTL(t));let c=await r.getElementRects({reference:e,floating:t,strategy:n}),{x:h,y:d}=pr(c,s,l),u=s,f={},g=0;for(let p=0;p<a.length;p++){const{name:m,fn:b}=a[p],{x:y,y:_,data:x,reset:w}=await b({x:h,y:d,initialPlacement:s,placement:u,strategy:n,middlewareData:f,rects:c,platform:r,elements:{reference:e,floating:t}});h=y??h,d=_??d,f={...f,[m]:{...f[m],...x}},w&&g<=50&&(g++,typeof w=="object"&&(w.placement&&(u=w.placement),w.rects&&(c=w.rects===!0?await r.getElementRects({reference:e,floating:t,strategy:n}):w.rects),{x:h,y:d}=pr(c,u,l)),p=-1)}return{x:h,y:d,placement:u,strategy:n,middlewareData:f}};async function Sl(e,t){var i;t===void 0&&(t={});const{x:s,y:n,platform:o,rects:r,elements:a,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:u=!1,padding:f=0}=Ki(t,e),g=kl(f),p=a[u?d==="floating"?"reference":"floating":d],m=Ye(await o.getClippingRect({element:(i=await(o.isElement==null?void 0:o.isElement(p)))==null||i?p:p.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),b=d==="floating"?{x:s,y:n,width:r.floating.width,height:r.floating.height}:r.reference,y=await(o.getOffsetParent==null?void 0:o.getOffsetParent(a.floating)),_=await(o.isElement==null?void 0:o.isElement(y))?await(o.getScale==null?void 0:o.getScale(y))||{x:1,y:1}:{x:1,y:1},x=Ye(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:b,offsetParent:y,strategy:l}):b);return{top:(m.top-x.top+g.top)/_.y,bottom:(x.bottom-m.bottom+g.bottom)/_.y,left:(m.left-x.left+g.left)/_.x,right:(x.right-m.right+g.right)/_.x}}const od=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var i,s;const{placement:n,middlewareData:o,rects:r,initialPlacement:a,platform:l,elements:c}=t,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:u,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:p=!0,...m}=Ki(e,t);if((i=o.arrow)!=null&&i.alignmentOffset)return{};const b=Gt(n),y=Vt(a),_=Gt(a)===a,x=await(l.isRTL==null?void 0:l.isRTL(c.floating)),w=u||(_||!p?[Ws(a)]:Jh(a)),k=g!=="none";!u&&k&&w.push(...id(a,p,g,x));const M=[a,...w],A=await Sl(t,m),P=[];let E=((s=o.flip)==null?void 0:s.overflows)||[];if(h&&P.push(A[b]),d){const G=Kh(n,r,x);P.push(A[G[0]],A[G[1]])}if(E=[...E,{placement:n,overflows:P}],!P.every(G=>G<=0)){var D,z;const G=(((D=o.flip)==null?void 0:D.index)||0)+1,$=M[G];if($&&(!(d==="alignment"&&y!==Vt($))||E.every(W=>Vt(W.placement)===y?W.overflows[0]>0:!0)))return{data:{index:G,overflows:E},reset:{placement:$}};let I=(z=E.filter(W=>W.overflows[0]<=0).sort((W,K)=>W.overflows[1]-K.overflows[1])[0])==null?void 0:z.placement;if(!I)switch(f){case"bestFit":{var it;const W=(it=E.filter(K=>{if(k){const Z=Vt(K.placement);return Z===y||Z==="y"}return!0}).map(K=>[K.placement,K.overflows.filter(Z=>Z>0).reduce((Z,te)=>Z+te,0)]).sort((K,Z)=>K[1]-Z[1])[0])==null?void 0:it[0];W&&(I=W);break}case"initialPlacement":I=a;break}if(n!==I)return{reset:{placement:I}}}return{}}}};function Ml(e){const t=qe(...e.map(o=>o.left)),i=qe(...e.map(o=>o.top)),s=Xt(...e.map(o=>o.right)),n=Xt(...e.map(o=>o.bottom));return{x:t,y:i,width:s-t,height:n-i}}function rd(e){const t=e.slice().sort((n,o)=>n.y-o.y),i=[];let s=null;for(let n=0;n<t.length;n++){const o=t[n];!s||o.y-s.y>s.height/2?i.push([o]):i[i.length-1].push(o),s=o}return i.map(n=>Ye(Ml(n)))}const ad=function(e){return e===void 0&&(e={}),{name:"inline",options:e,async fn(t){const{placement:i,elements:s,rects:n,platform:o,strategy:r}=t,{padding:a=2,x:l,y:c}=Ki(e,t),h=Array.from(await(o.getClientRects==null?void 0:o.getClientRects(s.reference))||[]),d=rd(h),u=Ye(Ml(h)),f=kl(a);function g(){if(d.length===2&&d[0].left>d[1].right&&l!=null&&c!=null)return d.find(m=>l>m.left-f.left&&l<m.right+f.right&&c>m.top-f.top&&c<m.bottom+f.bottom)||u;if(d.length>=2){if(Vt(i)==="y"){const E=d[0],D=d[d.length-1],z=Gt(i)==="top",it=E.top,G=D.bottom,$=z?E.left:D.left,I=z?E.right:D.right,W=I-$,K=G-it;return{top:it,bottom:G,left:$,right:I,width:W,height:K,x:$,y:it}}const m=Gt(i)==="left",b=Xt(...d.map(E=>E.right)),y=qe(...d.map(E=>E.left)),_=d.filter(E=>m?E.left===y:E.right===b),x=_[0].top,w=_[_.length-1].bottom,k=y,M=b,A=M-k,P=w-x;return{top:x,bottom:w,left:k,right:M,width:A,height:P,x:k,y:x}}return u}const p=await o.getElementRects({reference:{getBoundingClientRect:g},floating:s.floating,strategy:r});return n.reference.x!==p.reference.x||n.reference.y!==p.reference.y||n.reference.width!==p.reference.width||n.reference.height!==p.reference.height?{reset:{rects:p}}:{}}}},ld=new Set(["left","top"]);async function cd(e,t){const{placement:i,platform:s,elements:n}=e,o=await(s.isRTL==null?void 0:s.isRTL(n.floating)),r=Gt(i),a=ln(i),l=Vt(i)==="y",c=ld.has(r)?-1:1,h=o&&l?-1:1,d=Ki(t,e);let{mainAxis:u,crossAxis:f,alignmentAxis:g}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&typeof g=="number"&&(f=a==="end"?g*-1:g),l?{x:f*h,y:u*c}:{x:u*c,y:f*h}}const $o=function(e){return{name:"offset",options:e,async fn(t){var i,s;const{x:n,y:o,placement:r,middlewareData:a}=t,l=await cd(t,e);return r===((i=a.offset)==null?void 0:i.placement)&&(s=a.arrow)!=null&&s.alignmentOffset?{}:{x:n+l.x,y:o+l.y,data:{...l,placement:r}}}}},hd=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:i,y:s,placement:n}=t,{mainAxis:o=!0,crossAxis:r=!1,limiter:a={fn:m=>{let{x:b,y}=m;return{x:b,y}}},...l}=Ki(e,t),c={x:i,y:s},h=await Sl(t,l),d=Vt(Gt(n)),u=xl(d);let f=c[u],g=c[d];if(o){const m=u==="y"?"top":"left",b=u==="y"?"bottom":"right",y=f+h[m],_=f-h[b];f=dr(y,f,_)}if(r){const m=d==="y"?"top":"left",b=d==="y"?"bottom":"right",y=g+h[m],_=g-h[b];g=dr(y,g,_)}const p=a.fn({...t,[u]:f,[d]:g});return{...p,data:{x:p.x-i,y:p.y-s,enabled:{[u]:o,[d]:r}}}}}};function cn(){return typeof window<"u"}function he(e){return Cl(e)?(e.nodeName||"").toLowerCase():"#document"}function vt(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function fe(e){var t;return(t=(Cl(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Cl(e){return cn()?e instanceof Node||e instanceof vt(e).Node:!1}function Lt(e){return cn()?e instanceof Element||e instanceof vt(e).Element:!1}function Rt(e){return cn()?e instanceof HTMLElement||e instanceof vt(e).HTMLElement:!1}function gr(e){return!cn()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof vt(e).ShadowRoot}const dd=new Set(["inline","contents"]);function Ji(e){const{overflow:t,overflowX:i,overflowY:s,display:n}=wt(e);return/auto|scroll|overlay|hidden|clip/.test(t+s+i)&&!dd.has(n)}const ud=new Set(["table","td","th"]);function fd(e){return ud.has(he(e))}const pd=[":popover-open",":modal"];function gd(e){return pd.some(t=>{try{return e.matches(t)}catch{return!1}})}const md=["transform","translate","scale","rotate","perspective"],bd=["transform","translate","scale","rotate","perspective","filter"],yd=["paint","layout","strict","content"];function Oo(e){const t=To(),i=Lt(e)?wt(e):e;return md.some(s=>i[s]?i[s]!=="none":!1)||(i.containerType?i.containerType!=="normal":!1)||!t&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!t&&(i.filter?i.filter!=="none":!1)||bd.some(s=>(i.willChange||"").includes(s))||yd.some(s=>(i.contain||"").includes(s))}function vd(e){let t=Xe(e);for(;Rt(t)&&!hn(t);){if(Oo(t))return t;if(gd(t))return null;t=Xe(t)}return null}function To(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const xd=new Set(["html","body","#document"]);function hn(e){return xd.has(he(e))}function wt(e){return vt(e).getComputedStyle(e)}function dn(e){return Lt(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Xe(e){if(he(e)==="html")return e;const t=e.assignedSlot||e.parentNode||gr(e)&&e.host||fe(e);return gr(t)?t.host:t}function Al(e){const t=Xe(e);return hn(t)?e.ownerDocument?e.ownerDocument.body:e.body:Rt(t)&&Ji(t)?t:Al(t)}function El(e,t,i){var s;t===void 0&&(t=[]);const n=Al(e),o=n===((s=e.ownerDocument)==null?void 0:s.body),r=vt(n);return o?(_d(r),t.concat(r,r.visualViewport||[],Ji(n)?n:[],[])):t.concat(n,El(n,[]))}function _d(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Pl(e){const t=wt(e);let i=parseFloat(t.width)||0,s=parseFloat(t.height)||0;const n=Rt(e),o=n?e.offsetWidth:i,r=n?e.offsetHeight:s,a=Vs(i)!==o||Vs(s)!==r;return a&&(i=o,s=r),{width:i,height:s,$:a}}function $l(e){return Lt(e)?e:e.contextElement}function Ve(e){const t=$l(e);if(!Rt(t))return ce(1);const i=t.getBoundingClientRect(),{width:s,height:n,$:o}=Pl(t);let r=(o?Vs(i.width):i.width)/s,a=(o?Vs(i.height):i.height)/n;return(!r||!Number.isFinite(r))&&(r=1),(!a||!Number.isFinite(a))&&(a=1),{x:r,y:a}}const wd=ce(0);function Ol(e){const t=vt(e);return!To()||!t.visualViewport?wd:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function kd(e,t,i){return t===void 0&&(t=!1),!i||t&&i!==vt(e)?!1:t}function Ii(e,t,i,s){t===void 0&&(t=!1),i===void 0&&(i=!1);const n=e.getBoundingClientRect(),o=$l(e);let r=ce(1);t&&(s?Lt(s)&&(r=Ve(s)):r=Ve(e));const a=kd(o,i,s)?Ol(o):ce(0);let l=(n.left+a.x)/r.x,c=(n.top+a.y)/r.y,h=n.width/r.x,d=n.height/r.y;if(o){const u=vt(o),f=s&&Lt(s)?vt(s):s;let g=u,p=g.frameElement;for(;p&&s&&f!==g;){const m=Ve(p),b=p.getBoundingClientRect(),y=wt(p),_=b.left+(p.clientLeft+parseFloat(y.paddingLeft))*m.x,x=b.top+(p.clientTop+parseFloat(y.paddingTop))*m.y;l*=m.x,c*=m.y,h*=m.x,d*=m.y,l+=_,c+=x,g=vt(p),p=g.frameElement}}return Ye({width:h,height:d,x:l,y:c})}const Sd=[":popover-open",":modal"];function Tl(e){return Sd.some(t=>{try{return e.matches(t)}catch{return!1}})}function Md(e){let{elements:t,rect:i,offsetParent:s,strategy:n}=e;const o=n==="fixed",r=fe(s),a=t?Tl(t.floating):!1;if(s===r||a&&o)return i;let l={scrollLeft:0,scrollTop:0},c=ce(1);const h=ce(0),d=Rt(s);if((d||!d&&!o)&&((he(s)!=="body"||Ji(r))&&(l=dn(s)),Rt(s))){const u=Ii(s);c=Ve(s),h.x=u.x+s.clientLeft,h.y=u.y+s.clientTop}return{width:i.width*c.x,height:i.height*c.y,x:i.x*c.x-l.scrollLeft*c.x+h.x,y:i.y*c.y-l.scrollTop*c.y+h.y}}function Cd(e){return Array.from(e.getClientRects())}function Dl(e){return Ii(fe(e)).left+dn(e).scrollLeft}function Ad(e){const t=fe(e),i=dn(e),s=e.ownerDocument.body,n=Xt(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),o=Xt(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight);let r=-i.scrollLeft+Dl(e);const a=-i.scrollTop;return wt(s).direction==="rtl"&&(r+=Xt(t.clientWidth,s.clientWidth)-n),{width:n,height:o,x:r,y:a}}function Ed(e,t){const i=vt(e),s=fe(e),n=i.visualViewport;let o=s.clientWidth,r=s.clientHeight,a=0,l=0;if(n){o=n.width,r=n.height;const c=To();(!c||c&&t==="fixed")&&(a=n.offsetLeft,l=n.offsetTop)}return{width:o,height:r,x:a,y:l}}function Pd(e,t){const i=Ii(e,!0,t==="fixed"),s=i.top+e.clientTop,n=i.left+e.clientLeft,o=Rt(e)?Ve(e):ce(1),r=e.clientWidth*o.x,a=e.clientHeight*o.y,l=n*o.x,c=s*o.y;return{width:r,height:a,x:l,y:c}}function mr(e,t,i){let s;if(t==="viewport")s=Ed(e,i);else if(t==="document")s=Ad(fe(e));else if(Lt(t))s=Pd(t,i);else{const n=Ol(e);s={...t,x:t.x-n.x,y:t.y-n.y}}return Ye(s)}function zl(e,t){const i=Xe(e);return i===t||!Lt(i)||hn(i)?!1:wt(i).position==="fixed"||zl(i,t)}function $d(e,t){const i=t.get(e);if(i)return i;let s=El(e,[]).filter(a=>Lt(a)&&he(a)!=="body"),n=null;const o=wt(e).position==="fixed";let r=o?Xe(e):e;for(;Lt(r)&&!hn(r);){const a=wt(r),l=Oo(r);!l&&a.position==="fixed"&&(n=null),(o?!l&&!n:!l&&a.position==="static"&&n&&["absolute","fixed"].includes(n.position)||Ji(r)&&!l&&zl(e,r))?s=s.filter(c=>c!==r):n=a,r=Xe(r)}return t.set(e,s),s}function Od(e){let{element:t,boundary:i,rootBoundary:s,strategy:n}=e;const o=[...i==="clippingAncestors"?$d(t,this._c):[].concat(i),s],r=o[0],a=o.reduce((l,c)=>{const h=mr(t,c,n);return l.top=Xt(h.top,l.top),l.right=qe(h.right,l.right),l.bottom=qe(h.bottom,l.bottom),l.left=Xt(h.left,l.left),l},mr(t,r,n));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function Td(e){const{width:t,height:i}=Pl(e);return{width:t,height:i}}function Dd(e,t,i){const s=Rt(t),n=fe(t),o=i==="fixed",r=Ii(e,!0,o,t);let a={scrollLeft:0,scrollTop:0};const l=ce(0);if(s||!s&&!o)if((he(t)!=="body"||Ji(n))&&(a=dn(t)),s){const d=Ii(t,!0,o,t);l.x=d.x+t.clientLeft,l.y=d.y+t.clientTop}else n&&(l.x=Dl(n));const c=r.left+a.scrollLeft-l.x,h=r.top+a.scrollTop-l.y;return{x:c,y:h,width:r.width,height:r.height}}function br(e,t){return!Rt(e)||wt(e).position==="fixed"?null:t?t(e):e.offsetParent}function Ll(e,t){const i=vt(e);if(!Rt(e)||Tl(e))return i;let s=br(e,t);for(;s&&fd(s)&&wt(s).position==="static";)s=br(s,t);return s&&(he(s)==="html"||he(s)==="body"&&wt(s).position==="static"&&!Oo(s))?i:s||vd(e)||i}const zd=async function(e){const t=this.getOffsetParent||Ll,i=this.getDimensions;return{reference:Dd(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,...await i(e.floating)}}};function Ld(e){return wt(e).direction==="rtl"}const Rd={convertOffsetParentRelativeRectToViewportRelativeRect:Md,getDocumentElement:fe,getClippingRect:Od,getOffsetParent:Ll,getElementRects:zd,getClientRects:Cd,getDimensions:Td,getScale:Ve,isElement:Lt,isRTL:Ld},Do=hd,zo=od,Lo=ad,Ro=(e,t,i)=>{const s=new Map,n={platform:Rd,...i},o={...n.platform,_c:s};return nd(e,t,{...n,platform:o})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ds=globalThis,Io=Ds.ShadowRoot&&(Ds.ShadyCSS===void 0||Ds.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fo=Symbol(),yr=new WeakMap;let Rl=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Fo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Io&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=yr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&yr.set(t,e))}return e}toString(){return this.cssText}};const Id=e=>new Rl(typeof e=="string"?e:e+"",void 0,Fo),j=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[o+1],e[0]);return new Rl(i,e,Fo)},Fd=(e,t)=>{if(Io)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const s=document.createElement("style"),n=Ds.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=i.cssText,e.appendChild(s)}},vr=Io?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return Id(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Bd,defineProperty:jd,getOwnPropertyDescriptor:Hd,getOwnPropertyNames:Nd,getOwnPropertySymbols:Vd,getPrototypeOf:Wd}=Object,Ge=globalThis,xr=Ge.trustedTypes,Ud=xr?xr.emptyScript:"",_r=Ge.reactiveElementPolyfillSupport,Mi=(e,t)=>e,Us={toAttribute(e,t){switch(t){case Boolean:e=e?Ud:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},Bo=(e,t)=>!Bd(e,t),wr={attribute:!0,type:String,converter:Us,reflect:!1,useDefault:!1,hasChanged:Bo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ge.litPropertyMetadata??(Ge.litPropertyMetadata=new WeakMap);let He=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=wr){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&jd(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=Hd(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){const r=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??wr}static _$Ei(){if(this.hasOwnProperty(Mi("elementProperties")))return;const e=Wd(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Mi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Mi("properties"))){const t=this.properties,i=[...Nd(t),...Vd(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(vr(s))}else e!==void 0&&t.push(vr(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fd(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var i;const s=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,s);if(n!==void 0&&s.reflect===!0){const o=(((i=s.converter)==null?void 0:i.toAttribute)!==void 0?s.converter:Us).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){var i,s;const n=this.constructor,o=n._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const r=n.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)==null?void 0:i.fromAttribute)!==void 0?r.converter:Us;this._$Em=o;const l=a.fromAttribute(t,r.type);this[o]=l??((s=this._$Ej)==null?void 0:s.get(o))??l,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){var o;if(e!==void 0){const r=this.constructor;if(s===!1&&(n=this[e]),i??(i=r.getPropertyOptions(e)),!((i.hasChanged??Bo)(n,t)||i.useDefault&&i.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:r}=o,a=this[n];r!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$EO)==null||e.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};He.elementStyles=[],He.shadowRootOptions={mode:"open"},He[Mi("elementProperties")]=new Map,He[Mi("finalized")]=new Map,_r==null||_r({ReactiveElement:He}),(Ge.reactiveElementVersions??(Ge.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qs=globalThis,kr=e=>e,Ys=qs.trustedTypes,Sr=Ys?Ys.createPolicy("lit-html",{createHTML:e=>e}):void 0,Il="$lit$",ie=`lit$${Math.random().toFixed(9).slice(2)}$`,Fl="?"+ie,qd=`<${Fl}>`,Oe=document,Fi=()=>Oe.createComment(""),Bi=e=>e===null||typeof e!="object"&&typeof e!="function",jo=Array.isArray,Yd=e=>jo(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Tn=`[ 	
\f\r]`,ui=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mr=/-->/g,Cr=/>/g,ve=RegExp(`>|${Tn}(?:([^\\s"'>=/]+)(${Tn}*=${Tn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ar=/'/g,Er=/"/g,Bl=/^(?:script|style|textarea|title)$/i,Xd=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),S=Xd(1),Te=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),Pr=new WeakMap,Ae=Oe.createTreeWalker(Oe,129);function jl(e,t){if(!jo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Sr!==void 0?Sr.createHTML(t):t}const Gd=(e,t)=>{const i=e.length-1,s=[];let n,o=t===2?"<svg>":t===3?"<math>":"",r=ui;for(let a=0;a<i;a++){const l=e[a];let c,h,d=-1,u=0;for(;u<l.length&&(r.lastIndex=u,h=r.exec(l),h!==null);)u=r.lastIndex,r===ui?h[1]==="!--"?r=Mr:h[1]!==void 0?r=Cr:h[2]!==void 0?(Bl.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=ve):h[3]!==void 0&&(r=ve):r===ve?h[0]===">"?(r=n??ui,d=-1):h[1]===void 0?d=-2:(d=r.lastIndex-h[2].length,c=h[1],r=h[3]===void 0?ve:h[3]==='"'?Er:Ar):r===Er||r===Ar?r=ve:r===Mr||r===Cr?r=ui:(r=ve,n=void 0);const f=r===ve&&e[a+1].startsWith("/>")?" ":"";o+=r===ui?l+qd:d>=0?(s.push(c),l.slice(0,d)+Il+l.slice(d)+ie+f):l+ie+(d===-2?a:f)}return[jl(e,o+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class ji{constructor({strings:t,_$litType$:i},s){let n;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,h]=Gd(t,i);if(this.el=ji.createElement(c,s),Ae.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=Ae.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(const d of n.getAttributeNames())if(d.endsWith(Il)){const u=h[r++],f=n.getAttribute(d).split(ie),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:g[2],strings:f,ctor:g[1]==="."?Kd:g[1]==="?"?Jd:g[1]==="@"?Qd:un}),n.removeAttribute(d)}else d.startsWith(ie)&&(l.push({type:6,index:o}),n.removeAttribute(d));if(Bl.test(n.tagName)){const d=n.textContent.split(ie),u=d.length-1;if(u>0){n.textContent=Ys?Ys.emptyScript:"";for(let f=0;f<u;f++)n.append(d[f],Fi()),Ae.nextNode(),l.push({type:2,index:++o});n.append(d[u],Fi())}}}else if(n.nodeType===8)if(n.data===Fl)l.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf(ie,d+1))!==-1;)l.push({type:7,index:o}),d+=ie.length-1}o++}}static createElement(t,i){const s=Oe.createElement("template");return s.innerHTML=t,s}}function Ze(e,t,i=e,s){var n,o;if(t===Te)return t;let r=s!==void 0?(n=i._$Co)==null?void 0:n[s]:i._$Cl;const a=Bi(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==a&&((o=r==null?void 0:r._$AO)==null||o.call(r,!1),a===void 0?r=void 0:(r=new a(e),r._$AT(e,i,s)),s!==void 0?(i._$Co??(i._$Co=[]))[s]=r:i._$Cl=r),r!==void 0&&(t=Ze(e,r._$AS(e,t.values),r,s)),t}class Zd{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,n=((t==null?void 0:t.creationScope)??Oe).importNode(i,!0);Ae.currentNode=n;let o=Ae.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new Qi(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new tu(o,this,t)),this._$AV.push(c),l=s[++a]}r!==(l==null?void 0:l.index)&&(o=Ae.nextNode(),r++)}return Ae.currentNode=Oe,n}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class Qi{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,i,s,n){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Ze(this,t,i),Bi(t)?t===N||t==null||t===""?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==Te&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Yd(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==N&&Bi(this._$AH)?this._$AA.nextSibling.data=t:this.T(Oe.createTextNode(t)),this._$AH=t}$(t){var i;const{values:s,_$litType$:n}=t,o=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=ji.createElement(jl(n.h,n.h[0]),this.options)),n);if(((i=this._$AH)==null?void 0:i._$AD)===o)this._$AH.p(s);else{const r=new Zd(o,this),a=r.u(this.options);r.p(s),this.T(a),this._$AH=r}}_$AC(t){let i=Pr.get(t.strings);return i===void 0&&Pr.set(t.strings,i=new ji(t)),i}k(t){jo(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const o of t)n===i.length?i.push(s=new Qi(this.O(Fi()),this.O(Fi()),this,this.options)):s=i[n],s._$AI(o),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,i){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,i);t!==this._$AB;){const n=kr(t).nextSibling;kr(t).remove(),t=n}}setConnected(t){var i;this._$AM===void 0&&(this._$Cv=t,(i=this._$AP)==null||i.call(this,t))}}class un{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,n,o){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=i,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=N}_$AI(t,i=this,s,n){const o=this.strings;let r=!1;if(o===void 0)t=Ze(this,t,i,0),r=!Bi(t)||t!==this._$AH&&t!==Te,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=Ze(this,a[s+l],i,l),c===Te&&(c=this._$AH[l]),r||(r=!Bi(c)||c!==this._$AH[l]),c===N?t=N:t!==N&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!n&&this.j(t)}j(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Kd extends un{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===N?void 0:t}}class Jd extends un{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==N)}}class Qd extends un{constructor(t,i,s,n,o){super(t,i,s,n,o),this.type=5}_$AI(t,i=this){if((t=Ze(this,t,i,0)??N)===Te)return;const s=this._$AH,n=t===N&&s!==N||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==N&&(s===N||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,t):this._$AH.handleEvent(t)}}class tu{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Ze(this,t)}}const $r=qs.litHtmlPolyfillSupport;$r==null||$r(ji,Qi),(qs.litHtmlVersions??(qs.litHtmlVersions=[])).push("3.3.2");const eo=(e,t,i)=>{const s=(i==null?void 0:i.renderBefore)??t;let n=s._$litPart$;if(n===void 0){const o=(i==null?void 0:i.renderBefore)??null;s._$litPart$=n=new Qi(t.insertBefore(Fi(),o),o,void 0,i??{})}return n._$AI(e),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hi=globalThis;let F=class extends He{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=eo(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Te}};var Or;F._$litElement$=!0,F.finalized=!0,(Or=Hi.litElementHydrateSupport)==null||Or.call(Hi,{LitElement:F});const Tr=Hi.litElementPolyfillSupport;Tr==null||Tr({LitElement:F});(Hi.litElementVersions??(Hi.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const eu={attribute:!0,type:String,converter:Us,reflect:!1,hasChanged:Bo},iu=(e=eu,t,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),s==="accessor"){const{name:r}=i;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(s==="setter"){const{name:r}=i;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+s)};function v(e){return(t,i)=>typeof i=="object"?iu(e,t,i):((s,n,o)=>{const r=n.hasOwnProperty(o);return n.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(n,o):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Jt(e){return v({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const su=e=>e.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hl={ATTRIBUTE:1,CHILD:2},Nl=e=>(...t)=>({_$litDirective$:e,values:t});let Vl=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ci=(e,t)=>{var i;const s=e._$AN;if(s===void 0)return!1;for(const n of s)(i=n._$AO)==null||i.call(n,t,!1),Ci(n,t);return!0},Xs=e=>{let t,i;do{if((t=e._$AM)===void 0)break;i=t._$AN,i.delete(e),e=t}while((i==null?void 0:i.size)===0)},Wl=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),ru(t)}};function nu(e){this._$AN!==void 0?(Xs(this),this._$AM=e,Wl(this)):this._$AM=e}function ou(e,t=!1,i=0){const s=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(s))for(let o=i;o<s.length;o++)Ci(s[o],!1),Xs(s[o]);else s!=null&&(Ci(s,!1),Xs(s));else Ci(this,e)}const ru=e=>{e.type==Hl.CHILD&&(e._$AP??(e._$AP=ou),e._$AQ??(e._$AQ=nu))};class au extends Vl{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,s){super._$AT(t,i,s),Wl(this),this.isConnected=t._$AU}_$AO(t,i=!0){var s,n;t!==this.isConnected&&(this.isConnected=t,t?(s=this.reconnected)==null||s.call(this):(n=this.disconnected)==null||n.call(this)),i&&(Ci(this,t),Xs(this))}setValue(t){if(su(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke=()=>new lu;class lu{}const Dn=new WeakMap,It=Nl(class extends au{render(e){return N}update(e,[t]){var i;const s=t!==this.G;return s&&this.G!==void 0&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),N}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let i=Dn.get(t);i===void 0&&(i=new WeakMap,Dn.set(t,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Dn.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 3.0.1
*/const Ul=Object.freeze({left:0,top:0,width:16,height:16}),Gs=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),ts=Object.freeze({...Ul,...Gs}),io=Object.freeze({...ts,body:"",hidden:!1}),cu=Object.freeze({width:null,height:null}),ql=Object.freeze({...cu,...Gs});function hu(e,t=0){const i=e.replace(/^-?[0-9.]*/,"");function s(n){for(;n<0;)n+=4;return n%4}if(i===""){const n=parseInt(e);return isNaN(n)?0:s(n)}else if(i!==e){let n=0;switch(i){case"%":n=25;break;case"deg":n=90}if(n){let o=parseFloat(e.slice(0,e.length-i.length));return isNaN(o)?0:(o=o/n,o%1===0?s(o):0)}}return t}const du=/[\s,]+/;function uu(e,t){t.split(du).forEach(i=>{switch(i.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}const Yl={...ql,preserveAspectRatio:""};function Dr(e){const t={...Yl},i=(s,n)=>e.getAttribute(s)||n;return t.width=i("width",null),t.height=i("height",null),t.rotate=hu(i("rotate","")),uu(t,i("flip","")),t.preserveAspectRatio=i("preserveAspectRatio",i("preserveaspectratio","")),t}function fu(e,t){for(const i in Yl)if(e[i]!==t[i])return!0;return!1}const Xl=/^[a-z0-9]+(-[a-z0-9]+)*$/,es=(e,t,i,s="")=>{const n=e.split(":");if(e.slice(0,1)==="@"){if(n.length<2||n.length>3)return null;s=n.shift().slice(1)}if(n.length>3||!n.length)return null;if(n.length>1){const a=n.pop(),l=n.pop(),c={provider:n.length>0?n[0]:s,prefix:l,name:a};return t&&!zs(c)?null:c}const o=n[0],r=o.split("-");if(r.length>1){const a={provider:s,prefix:r.shift(),name:r.join("-")};return t&&!zs(a)?null:a}if(i&&s===""){const a={provider:s,prefix:"",name:o};return t&&!zs(a,i)?null:a}return null},zs=(e,t)=>e?!!((t&&e.prefix===""||e.prefix)&&e.name):!1;function pu(e,t){const i=e.icons,s=e.aliases||Object.create(null),n=Object.create(null);function o(r){if(i[r])return n[r]=[];if(!(r in n)){n[r]=null;const a=s[r]&&s[r].parent,l=a&&o(a);l&&(n[r]=[a].concat(l))}return n[r]}return Object.keys(i).concat(Object.keys(s)).forEach(o),n}function gu(e,t){const i={};!e.hFlip!=!t.hFlip&&(i.hFlip=!0),!e.vFlip!=!t.vFlip&&(i.vFlip=!0);const s=((e.rotate||0)+(t.rotate||0))%4;return s&&(i.rotate=s),i}function zr(e,t){const i=gu(e,t);for(const s in io)s in Gs?s in e&&!(s in i)&&(i[s]=Gs[s]):s in t?i[s]=t[s]:s in e&&(i[s]=e[s]);return i}function mu(e,t,i){const s=e.icons,n=e.aliases||Object.create(null);let o={};function r(a){o=zr(s[a]||n[a],o)}return r(t),i.forEach(r),zr(e,o)}function Gl(e,t){const i=[];if(typeof e!="object"||typeof e.icons!="object")return i;e.not_found instanceof Array&&e.not_found.forEach(n=>{t(n,null),i.push(n)});const s=pu(e);for(const n in s){const o=s[n];o&&(t(n,mu(e,n,o)),i.push(n))}return i}const bu={provider:"",aliases:{},not_found:{},...Ul};function zn(e,t){for(const i in t)if(i in e&&typeof e[i]!=typeof t[i])return!1;return!0}function Zl(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!zn(e,bu))return null;const i=t.icons;for(const n in i){const o=i[n];if(!n||typeof o.body!="string"||!zn(o,io))return null}const s=t.aliases||Object.create(null);for(const n in s){const o=s[n],r=o.parent;if(!n||typeof r!="string"||!i[r]&&!s[r]||!zn(o,io))return null}return t}const Zs=Object.create(null);function yu(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function Zt(e,t){const i=Zs[e]||(Zs[e]=Object.create(null));return i[t]||(i[t]=yu(e,t))}function Kl(e,t){return Zl(t)?Gl(t,(i,s)=>{s?e.icons[i]=s:e.missing.add(i)}):[]}function vu(e,t,i){try{if(typeof i.body=="string")return e.icons[t]={...i},!0}catch{}return!1}function xu(e,t){let i=[];return(typeof e=="string"?[e]:Object.keys(Zs)).forEach(s=>{(typeof s=="string"&&typeof t=="string"?[t]:Object.keys(Zs[s]||{})).forEach(n=>{const o=Zt(s,n);i=i.concat(Object.keys(o.icons).map(r=>(s!==""?"@"+s+":":"")+n+":"+r))})}),i}let Ni=!1;function Jl(e){return typeof e=="boolean"&&(Ni=e),Ni}function Vi(e){const t=typeof e=="string"?es(e,!0,Ni):e;if(t){const i=Zt(t.provider,t.prefix),s=t.name;return i.icons[s]||(i.missing.has(s)?null:void 0)}}function Ql(e,t){const i=es(e,!0,Ni);if(!i)return!1;const s=Zt(i.provider,i.prefix);return t?vu(s,i.name,t):(s.missing.add(i.name),!0)}function Lr(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),Ni&&!t&&!e.prefix){let n=!1;return Zl(e)&&(e.prefix="",Gl(e,(o,r)=>{Ql(o,r)&&(n=!0)})),n}const i=e.prefix;if(!zs({prefix:i,name:"a"}))return!1;const s=Zt(t,i);return!!Kl(s,e)}function _u(e){return!!Vi(e)}function wu(e){const t=Vi(e);return t&&{...ts,...t}}function tc(e,t){e.forEach(i=>{const s=i.loaderCallbacks;s&&(i.loaderCallbacks=s.filter(n=>n.id!==t))})}function ku(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let i=!1;const s=e.provider,n=e.prefix;t.forEach(o=>{const r=o.icons,a=r.pending.length;r.pending=r.pending.filter(l=>{if(l.prefix!==n)return!0;const c=l.name;if(e.icons[c])r.loaded.push({provider:s,prefix:n,name:c});else if(e.missing.has(c))r.missing.push({provider:s,prefix:n,name:c});else return i=!0,!0;return!1}),r.pending.length!==a&&(i||tc([e],o.id),o.callback(r.loaded.slice(0),r.missing.slice(0),r.pending.slice(0),o.abort))})}))}let Su=0;function Mu(e,t,i){const s=Su++,n=tc.bind(null,i,s);if(!t.pending.length)return n;const o={id:s,icons:t,callback:e,abort:n};return i.forEach(r=>{(r.loaderCallbacks||(r.loaderCallbacks=[])).push(o)}),n}function Cu(e){const t={loaded:[],missing:[],pending:[]},i=Object.create(null);e.sort((n,o)=>n.provider!==o.provider?n.provider.localeCompare(o.provider):n.prefix!==o.prefix?n.prefix.localeCompare(o.prefix):n.name.localeCompare(o.name));let s={provider:"",prefix:"",name:""};return e.forEach(n=>{if(s.name===n.name&&s.prefix===n.prefix&&s.provider===n.provider)return;s=n;const o=n.provider,r=n.prefix,a=n.name,l=i[o]||(i[o]=Object.create(null)),c=l[r]||(l[r]=Zt(o,r));let h;a in c.icons?h=t.loaded:r===""||c.missing.has(a)?h=t.missing:h=t.pending;const d={provider:o,prefix:r,name:a};h.push(d)}),t}const so=Object.create(null);function Rr(e,t){so[e]=t}function no(e){return so[e]||so[""]}function Au(e,t=!0,i=!1){const s=[];return e.forEach(n=>{const o=typeof n=="string"?es(n,t,i):n;o&&s.push(o)}),s}function Ho(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const fn=Object.create(null),fs=["https://api.simplesvg.com","https://api.unisvg.com"],oo=[];for(;fs.length>0;)fs.length===1||Math.random()>.5?oo.push(fs.shift()):oo.push(fs.pop());fn[""]=Ho({resources:["https://api.iconify.design"].concat(oo)});function Ir(e,t){const i=Ho(t);return i===null?!1:(fn[e]=i,!0)}function pn(e){return fn[e]}function Eu(){return Object.keys(fn)}const Pu={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function $u(e,t,i,s){const n=e.resources.length,o=e.random?Math.floor(Math.random()*n):e.index;let r;if(e.random){let k=e.resources.slice(0);for(r=[];k.length>1;){const M=Math.floor(Math.random()*k.length);r.push(k[M]),k=k.slice(0,M).concat(k.slice(M+1))}r=r.concat(k)}else r=e.resources.slice(o).concat(e.resources.slice(0,o));const a=Date.now();let l="pending",c=0,h,d=null,u=[],f=[];typeof s=="function"&&f.push(s);function g(){d&&(clearTimeout(d),d=null)}function p(){l==="pending"&&(l="aborted"),g(),u.forEach(k=>{k.status==="pending"&&(k.status="aborted")}),u=[]}function m(k,M){M&&(f=[]),typeof k=="function"&&f.push(k)}function b(){return{startTime:a,payload:t,status:l,queriesSent:c,queriesPending:u.length,subscribe:m,abort:p}}function y(){l="failed",f.forEach(k=>{k(void 0,h)})}function _(){u.forEach(k=>{k.status==="pending"&&(k.status="aborted")}),u=[]}function x(k,M,A){const P=M!=="success";switch(u=u.filter(E=>E!==k),l){case"pending":break;case"failed":if(P||!e.dataAfterTimeout)return;break;default:return}if(M==="abort"){h=A,y();return}if(P){h=A,u.length||(r.length?w():y());return}if(g(),_(),!e.random){const E=e.resources.indexOf(k.resource);E!==-1&&E!==e.index&&(e.index=E)}l="completed",f.forEach(E=>{E(A)})}function w(){if(l!=="pending")return;g();const k=r.shift();if(k===void 0){if(u.length){d=setTimeout(()=>{g(),l==="pending"&&(_(),y())},e.timeout);return}y();return}const M={status:"pending",resource:k,callback:(A,P)=>{x(M,A,P)}};u.push(M),c++,d=setTimeout(w,e.rotate),i(k,t,M.callback)}return setTimeout(w),b}function ec(e){const t={...Pu,...e};let i=[];function s(){i=i.filter(r=>r().status==="pending")}function n(r,a,l){const c=$u(t,r,a,(h,d)=>{s(),l&&l(h,d)});return i.push(c),c}function o(r){return i.find(a=>r(a))||null}return{query:n,find:o,setIndex:r=>{t.index=r},getIndex:()=>t.index,cleanup:s}}function Fr(){}const Ln=Object.create(null);function Ou(e){if(!Ln[e]){const t=pn(e);if(!t)return;const i=ec(t),s={config:t,redundancy:i};Ln[e]=s}return Ln[e]}function ic(e,t,i){let s,n;if(typeof e=="string"){const o=no(e);if(!o)return i(void 0,424),Fr;n=o.send;const r=Ou(e);r&&(s=r.redundancy)}else{const o=Ho(e);if(o){s=ec(o);const r=e.resources?e.resources[0]:"",a=no(r);a&&(n=a.send)}}return!s||!n?(i(void 0,424),Fr):s.query(t,n,i)().abort}function Br(){}function Tu(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,ku(e)}))}function Du(e){const t=[],i=[];return e.forEach(s=>{(s.match(Xl)?t:i).push(s)}),{valid:t,invalid:i}}function fi(e,t,i){function s(){const n=e.pendingIcons;t.forEach(o=>{n&&n.delete(o),e.icons[o]||e.missing.add(o)})}if(i&&typeof i=="object")try{if(!Kl(e,i).length){s();return}}catch(n){console.error(n)}s(),Tu(e)}function jr(e,t){e instanceof Promise?e.then(i=>{t(i)}).catch(()=>{t(null)}):t(e)}function zu(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:i,prefix:s}=e,n=e.iconsToLoad;if(delete e.iconsToLoad,!n||!n.length)return;const o=e.loadIcon;if(e.loadIcons&&(n.length>1||!o)){jr(e.loadIcons(n,s,i),c=>{fi(e,n,c)});return}if(o){n.forEach(c=>{const h=o(c,s,i);jr(h,d=>{const u=d?{prefix:s,icons:{[c]:d}}:null;fi(e,[c],u)})});return}const{valid:r,invalid:a}=Du(n);if(a.length&&fi(e,a,null),!r.length)return;const l=s.match(Xl)?no(i):null;if(!l){fi(e,r,null);return}l.prepare(i,s,r).forEach(c=>{ic(i,c,h=>{fi(e,c.icons,h)})})}))}const No=(e,t)=>{const i=Au(e,!0,Jl()),s=Cu(i);if(!s.pending.length){let l=!0;return t&&setTimeout(()=>{l&&t(s.loaded,s.missing,s.pending,Br)}),()=>{l=!1}}const n=Object.create(null),o=[];let r,a;return s.pending.forEach(l=>{const{provider:c,prefix:h}=l;if(h===a&&c===r)return;r=c,a=h,o.push(Zt(c,h));const d=n[c]||(n[c]=Object.create(null));d[h]||(d[h]=[])}),s.pending.forEach(l=>{const{provider:c,prefix:h,name:d}=l,u=Zt(c,h),f=u.pendingIcons||(u.pendingIcons=new Set);f.has(d)||(f.add(d),n[c][h].push(d))}),o.forEach(l=>{const c=n[l.provider][l.prefix];c.length&&zu(l,c)}),t?Mu(t,s,o):Br},Lu=e=>new Promise((t,i)=>{const s=typeof e=="string"?es(e,!0):e;if(!s){i(e);return}No([s||e],n=>{if(n.length&&s){const o=Vi(s);if(o){t({...ts,...o});return}}i(e)})});function Hr(e){try{const t=typeof e=="string"?JSON.parse(e):e;if(typeof t.body=="string")return{...t}}catch{}}function Ru(e,t){if(typeof e=="object")return{data:Hr(e),value:e};if(typeof e!="string")return{value:e};if(e.includes("{")){const o=Hr(e);if(o)return{data:o,value:e}}const i=es(e,!0,!0);if(!i)return{value:e};const s=Vi(i);if(s!==void 0||!i.prefix)return{value:e,name:i,data:s};const n=No([i],()=>t(e,i,Vi(i)));return{value:e,name:i,loading:n}}let sc=!1;try{sc=navigator.vendor.indexOf("Apple")===0}catch{}function Iu(e,t){switch(t){case"svg":case"bg":case"mask":return t}return t!=="style"&&(sc||e.indexOf("<a")===-1)?"svg":e.indexOf("currentColor")===-1?"bg":"mask"}const Fu=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Bu=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function ro(e,t,i){if(t===1)return e;if(i=i||100,typeof e=="number")return Math.ceil(e*t*i)/i;if(typeof e!="string")return e;const s=e.split(Fu);if(s===null||!s.length)return e;const n=[];let o=s.shift(),r=Bu.test(o);for(;;){if(r){const a=parseFloat(o);isNaN(a)?n.push(o):n.push(Math.ceil(a*t*i)/i)}else n.push(o);if(o=s.shift(),o===void 0)return n.join("");r=!r}}function ju(e,t="defs"){let i="";const s=e.indexOf("<"+t);for(;s>=0;){const n=e.indexOf(">",s),o=e.indexOf("</"+t);if(n===-1||o===-1)break;const r=e.indexOf(">",o);if(r===-1)break;i+=e.slice(n+1,o).trim(),e=e.slice(0,s).trim()+e.slice(r+1)}return{defs:i,content:e}}function Hu(e,t){return e?"<defs>"+e+"</defs>"+t:t}function Nu(e,t,i){const s=ju(e);return Hu(s.defs,t+s.content+i)}const Vu=e=>e==="unset"||e==="undefined"||e==="none";function nc(e,t){const i={...ts,...e},s={...ql,...t},n={left:i.left,top:i.top,width:i.width,height:i.height};let o=i.body;[i,s].forEach(p=>{const m=[],b=p.hFlip,y=p.vFlip;let _=p.rotate;b?y?_+=2:(m.push("translate("+(n.width+n.left).toString()+" "+(0-n.top).toString()+")"),m.push("scale(-1 1)"),n.top=n.left=0):y&&(m.push("translate("+(0-n.left).toString()+" "+(n.height+n.top).toString()+")"),m.push("scale(1 -1)"),n.top=n.left=0);let x;switch(_<0&&(_-=Math.floor(_/4)*4),_=_%4,_){case 1:x=n.height/2+n.top,m.unshift("rotate(90 "+x.toString()+" "+x.toString()+")");break;case 2:m.unshift("rotate(180 "+(n.width/2+n.left).toString()+" "+(n.height/2+n.top).toString()+")");break;case 3:x=n.width/2+n.left,m.unshift("rotate(-90 "+x.toString()+" "+x.toString()+")");break}_%2===1&&(n.left!==n.top&&(x=n.left,n.left=n.top,n.top=x),n.width!==n.height&&(x=n.width,n.width=n.height,n.height=x)),m.length&&(o=Nu(o,'<g transform="'+m.join(" ")+'">',"</g>"))});const r=s.width,a=s.height,l=n.width,c=n.height;let h,d;r===null?(d=a===null?"1em":a==="auto"?c:a,h=ro(d,l/c)):(h=r==="auto"?l:r,d=a===null?ro(h,c/l):a==="auto"?c:a);const u={},f=(p,m)=>{Vu(m)||(u[p]=m.toString())};f("width",h),f("height",d);const g=[n.left,n.top,l,c];return u.viewBox=g.join(" "),{attributes:u,viewBox:g,body:o}}function Vo(e,t){let i=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const s in t)i+=" "+s+'="'+t[s]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+i+">"+e+"</svg>"}function Wu(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Uu(e){return"data:image/svg+xml,"+Wu(e)}function oc(e){return'url("'+Uu(e)+'")'}const qu=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let Ks=qu();function Yu(e){Ks=e}function Xu(){return Ks}function Gu(e,t){const i=pn(e);if(!i)return 0;let s;if(!i.maxURL)s=0;else{let n=0;i.resources.forEach(r=>{n=Math.max(n,r.length)});const o=t+".json?icons=";s=i.maxURL-n-i.path.length-o.length}return s}function Zu(e){return e===404}const Ku=(e,t,i)=>{const s=[],n=Gu(e,t),o="icons";let r={type:o,provider:e,prefix:t,icons:[]},a=0;return i.forEach((l,c)=>{a+=l.length+1,a>=n&&c>0&&(s.push(r),r={type:o,provider:e,prefix:t,icons:[]},a=l.length),r.icons.push(l)}),s.push(r),s};function Ju(e){if(typeof e=="string"){const t=pn(e);if(t)return t.path}return"/"}const Qu=(e,t,i)=>{if(!Ks){i("abort",424);return}let s=Ju(t.provider);switch(t.type){case"icons":{const o=t.prefix,r=t.icons.join(","),a=new URLSearchParams({icons:r});s+=o+".json?"+a.toString();break}case"custom":{const o=t.uri;s+=o.slice(0,1)==="/"?o.slice(1):o;break}default:i("abort",400);return}let n=503;Ks(e+s).then(o=>{const r=o.status;if(r!==200){setTimeout(()=>{i(Zu(r)?"abort":"next",r)});return}return n=501,o.json()}).then(o=>{if(typeof o!="object"||o===null){setTimeout(()=>{o===404?i("abort",o):i("next",n)});return}setTimeout(()=>{i("success",o)})}).catch(()=>{i("next",n)})},tf={prepare:Ku,send:Qu};function ef(e,t,i){Zt(i||"",t).loadIcons=e}function sf(e,t,i){Zt(i||"",t).loadIcon=e}const Rn="data-style";let rc="";function nf(e){rc=e}function Nr(e,t){let i=Array.from(e.childNodes).find(s=>s.hasAttribute&&s.hasAttribute(Rn));i||(i=document.createElement("style"),i.setAttribute(Rn,Rn),e.appendChild(i)),i.textContent=":host{display:inline-block;vertical-align:"+(t?"-0.125em":"0")+"}span,svg{display:block;margin:auto}"+rc}function ac(){Rr("",tf),Jl(!0);let e;try{e=window}catch{}if(e){if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,i="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(s=>{try{(typeof s!="object"||s===null||s instanceof Array||typeof s.icons!="object"||typeof s.prefix!="string"||!Lr(s))&&console.error(i)}catch{console.error(i)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(const i in t){const s="IconifyProviders["+i+"] is invalid.";try{const n=t[i];if(typeof n!="object"||!n||n.resources===void 0)continue;Ir(i,n)||console.error(s)}catch{console.error(s)}}}}return{iconLoaded:_u,getIcon:wu,listIcons:xu,addIcon:Ql,addCollection:Lr,calculateSize:ro,buildIcon:nc,iconToHTML:Vo,svgToURL:oc,loadIcons:No,loadIcon:Lu,addAPIProvider:Ir,setCustomIconLoader:sf,setCustomIconsLoader:ef,appendCustomStyle:nf,_api:{getAPIConfig:pn,setAPIModule:Rr,sendAPIQuery:ic,setFetch:Yu,getFetch:Xu,listAPIProviders:Eu}}}const ao={"background-color":"currentColor"},lc={"background-color":"transparent"},Vr={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},Wr={"-webkit-mask":ao,mask:ao,background:lc};for(const e in Wr){const t=Wr[e];for(const i in Vr)t[e+"-"+i]=Vr[i]}function Ur(e){return e?e+(e.match(/^[-0-9.]+$/)?"px":""):"inherit"}function of(e,t,i){const s=document.createElement("span");let n=e.body;n.indexOf("<a")!==-1&&(n+="<!-- "+Date.now()+" -->");const o=e.attributes,r=Vo(n,{...o,width:t.width+"",height:t.height+""}),a=oc(r),l=s.style,c={"--svg":a,width:Ur(o.width),height:Ur(o.height),...i?ao:lc};for(const h in c)l.setProperty(h,c[h]);return s}let Ai;function rf(){try{Ai=window.trustedTypes.createPolicy("iconify",{createHTML:e=>e})}catch{Ai=null}}function af(e){return Ai===void 0&&rf(),Ai?Ai.createHTML(e):e}function lf(e){const t=document.createElement("span"),i=e.attributes;let s="";i.width||(s="width: inherit;"),i.height||(s+="height: inherit;"),s&&(i.style=s);const n=Vo(e.body,i);return t.innerHTML=af(n),t.firstChild}function lo(e){return Array.from(e.childNodes).find(t=>{const i=t.tagName&&t.tagName.toUpperCase();return i==="SPAN"||i==="SVG"})}function qr(e,t){const i=t.icon.data,s=t.customisations,n=nc(i,s);s.preserveAspectRatio&&(n.attributes.preserveAspectRatio=s.preserveAspectRatio);const o=t.renderedMode;let r;switch(o){case"svg":r=lf(n);break;default:r=of(n,{...ts,...i},o==="mask")}const a=lo(e);a?r.tagName==="SPAN"&&a.tagName===r.tagName?a.setAttribute("style",r.getAttribute("style")):e.replaceChild(r,a):e.appendChild(r)}function Yr(e,t,i){const s=i&&(i.rendered?i:i.lastRender);return{rendered:!1,inline:t,icon:e,lastRender:s}}function cf(e="iconify-icon"){let t,i;try{t=window.customElements,i=window.HTMLElement}catch{return}if(!t||!i)return;const s=t.get(e);if(s)return s;const n=["icon","mode","inline","noobserver","width","height","rotate","flip"],o=class extends i{constructor(){super(),C(this,"_shadowRoot"),C(this,"_initialised",!1),C(this,"_state"),C(this,"_checkQueued",!1),C(this,"_connected",!1),C(this,"_observer",null),C(this,"_visible",!0);const a=this._shadowRoot=this.attachShadow({mode:"open"}),l=this.hasAttribute("inline");Nr(a,l),this._state=Yr({value:""},l),this._queueCheck()}connectedCallback(){this._connected=!0,this.startObserver()}disconnectedCallback(){this._connected=!1,this.stopObserver()}static get observedAttributes(){return n.slice(0)}attributeChangedCallback(a){switch(a){case"inline":{const l=this.hasAttribute("inline"),c=this._state;l!==c.inline&&(c.inline=l,Nr(this._shadowRoot,l));break}case"noobserver":{this.hasAttribute("noobserver")?this.startObserver():this.stopObserver();break}default:this._queueCheck()}}get icon(){const a=this.getAttribute("icon");if(a&&a.slice(0,1)==="{")try{return JSON.parse(a)}catch{}return a}set icon(a){typeof a=="object"&&(a=JSON.stringify(a)),this.setAttribute("icon",a)}get inline(){return this.hasAttribute("inline")}set inline(a){a?this.setAttribute("inline","true"):this.removeAttribute("inline")}get observer(){return this.hasAttribute("observer")}set observer(a){a?this.setAttribute("observer","true"):this.removeAttribute("observer")}restartAnimation(){const a=this._state;if(a.rendered){const l=this._shadowRoot;if(a.renderedMode==="svg")try{l.lastChild.setCurrentTime(0);return}catch{}qr(l,a)}}get status(){const a=this._state;return a.rendered?"rendered":a.icon.data===null?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout(()=>{this._check()}))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const a=this._state,l=this.getAttribute("icon");if(l!==a.icon.value){this._iconChanged(l);return}if(!a.rendered||!this._visible)return;const c=this.getAttribute("mode"),h=Dr(this);(a.attrMode!==c||fu(a.customisations,h)||!lo(this._shadowRoot))&&this._renderIcon(a.icon,h,c)}_iconChanged(a){const l=Ru(a,(c,h,d)=>{const u=this._state;if(u.rendered||this.getAttribute("icon")!==c)return;const f={value:c,name:h,data:d};f.data?this._gotIconData(f):u.icon=f});l.data?this._gotIconData(l):this._state=Yr(l,this._state.inline,this._state)}_forceRender(){if(!this._visible){const a=lo(this._shadowRoot);a&&this._shadowRoot.removeChild(a);return}this._queueCheck()}_gotIconData(a){this._checkQueued=!1,this._renderIcon(a,Dr(this),this.getAttribute("mode"))}_renderIcon(a,l,c){const h=Iu(a.data.body,c),d=this._state.inline;qr(this._shadowRoot,this._state={rendered:!0,icon:a,inline:d,customisations:l,attrMode:c,renderedMode:h})}startObserver(){if(!this._observer&&!this.hasAttribute("noobserver"))try{this._observer=new IntersectionObserver(a=>{const l=a.some(c=>c.isIntersecting);l!==this._visible&&(this._visible=l,this._forceRender())}),this._observer.observe(this)}catch{if(this._observer){try{this._observer.disconnect()}catch{}this._observer=null}}}stopObserver(){this._observer&&(this._observer.disconnect(),this._observer=null,this._visible=!0,this._connected&&this._forceRender())}};n.forEach(a=>{a in o.prototype||Object.defineProperty(o.prototype,a,{get:function(){return this.getAttribute(a)},set:function(l){l!==null?this.setAttribute(a,l):this.removeAttribute(a)}})});const r=ac();for(const a in r)o[a]=o.prototype[a]=r[a];return t.define(e,o),o}const hf=cf()||ac(),{iconLoaded:r0,getIcon:a0,listIcons:l0,addIcon:c0,addCollection:df,calculateSize:h0,buildIcon:d0,iconToHTML:u0,svgToURL:f0,loadIcons:uf,loadIcon:p0,setCustomIconLoader:g0,setCustomIconsLoader:m0,addAPIProvider:b0,_api:y0}=hf,ff=j`
  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
    overflow: hidden;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background-color: var(
      --bim-scrollbar--c,
      color-mix(in lab, var(--bim-ui_main-base), white 15%)
    );
  }

  ::-webkit-scrollbar-track {
    background-color: var(--bim-scrollbar--bgc, var(--bim-ui_bg-base));
  }
`,pf=j`
  :root {
    /* Grayscale Colors */
    --bim-ui_gray-0: hsl(210 10% 5%);
    --bim-ui_gray-1: hsl(210 10% 10%);
    --bim-ui_gray-2: hsl(210 10% 20%);
    --bim-ui_gray-3: hsl(210 10% 30%);
    --bim-ui_gray-4: hsl(210 10% 40%);
    --bim-ui_gray-5: hsl(210 10% 50%);
    --bim-ui_gray-6: hsl(210 10% 60%);
    --bim-ui_gray-7: hsl(210 10% 70%);
    --bim-ui_gray-8: hsl(210 10% 80%);
    --bim-ui_gray-9: hsl(210 10% 90%);
    --bim-ui_gray-10: hsl(210 10% 95%);

    /* Brand Colors */
    --bim-ui_main-base: #6528d7;
    --bim-ui_accent-base: #bcf124;

    /* Brand Colors Contrasts */
    --bim-ui_main-contrast: var(--bim-ui_gray-10);
    --bim-ui_accent-contrast: var(--bim-ui_gray-0);

    /* Sizes */
    --bim-ui_size-4xs: 0.375rem;
    --bim-ui_size-3xs: 0.5rem;
    --bim-ui_size-2xs: 0.625rem;
    --bim-ui_size-xs: 0.75rem;
    --bim-ui_size-sm: 0.875rem;
    --bim-ui_size-base: 1rem;
    --bim-ui_size-lg: 1.125rem;
    --bim-ui_size-xl: 1.25rem;
    --bim-ui_size-2xl: 1.375rem;
    --bim-ui_size-3xl: 1.5rem;
    --bim-ui_size-4xl: 1.625rem;
    --bim-ui_size-5xl: 1.75rem;
    --bim-ui_size-6xl: 1.875rem;
    --bim-ui_size-7xl: 2rem;
    --bim-ui_size-8xl: 2.125rem;
    --bim-ui_size-9xl: 2.25rem;
  }

  /* Background Colors */
  @media (prefers-color-scheme: dark) {
    :root {
      --bim-ui_bg-base: var(--bim-ui_gray-0);
      --bim-ui_bg-contrast-10: var(--bim-ui_gray-1);
      --bim-ui_bg-contrast-20: var(--bim-ui_gray-2);
      --bim-ui_bg-contrast-30: var(--bim-ui_gray-3);
      --bim-ui_bg-contrast-40: var(--bim-ui_gray-4);
      --bim-ui_bg-contrast-60: var(--bim-ui_gray-6);
      --bim-ui_bg-contrast-80: var(--bim-ui_gray-8);
      --bim-ui_bg-contrast-100: var(--bim-ui_gray-10);
    }
  }

  @media (prefers-color-scheme: light) {
    :root {
      --bim-ui_bg-base: var(--bim-ui_gray-10);
      --bim-ui_bg-contrast-10: var(--bim-ui_gray-9);
      --bim-ui_bg-contrast-20: var(--bim-ui_gray-8);
      --bim-ui_bg-contrast-30: var(--bim-ui_gray-7);
      --bim-ui_bg-contrast-40: var(--bim-ui_gray-6);
      --bim-ui_bg-contrast-60: var(--bim-ui_gray-4);
      --bim-ui_bg-contrast-80: var(--bim-ui_gray-2);
      --bim-ui_bg-contrast-100: var(--bim-ui_gray-0);
      --bim-ui_accent-base: #6528d7;
    }
  }

  .theme-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    filter: drop-shadow(0 0 10px var(--bim-ui_bg-base));
    z-index: 9999;
  }

  .theme-transition-overlay > div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bim-ui_bg-base);
  }

  html.bim-ui-dark {
    --bim-ui_bg-base: var(--bim-ui_gray-0);
    --bim-ui_bg-contrast-10: var(--bim-ui_gray-1);
    --bim-ui_bg-contrast-20: var(--bim-ui_gray-2);
    --bim-ui_bg-contrast-30: var(--bim-ui_gray-3);
    --bim-ui_bg-contrast-40: var(--bim-ui_gray-4);
    --bim-ui_bg-contrast-60: var(--bim-ui_gray-6);
    --bim-ui_bg-contrast-80: var(--bim-ui_gray-8);
    --bim-ui_bg-contrast-100: var(--bim-ui_gray-10);
  }

  html.bim-ui-light {
    --bim-ui_bg-base: var(--bim-ui_gray-10);
    --bim-ui_bg-contrast-10: var(--bim-ui_gray-9);
    --bim-ui_bg-contrast-20: var(--bim-ui_gray-8);
    --bim-ui_bg-contrast-30: var(--bim-ui_gray-7);
    --bim-ui_bg-contrast-40: var(--bim-ui_gray-6);
    --bim-ui_bg-contrast-60: var(--bim-ui_gray-4);
    --bim-ui_bg-contrast-80: var(--bim-ui_gray-2);
    --bim-ui_bg-contrast-100: var(--bim-ui_gray-0);
    --bim-ui_accent-base: #6528d7;
  }

  @keyframes toggleOverlay {
    0%,
    99% {
      display: block;
    }

    100% {
      display: none;
    }
  }

  @keyframes toggleThemeAnimation {
    0% {
      clip-path: circle(0% at center top);
    }
    45%,
    55% {
      clip-path: circle(150% at center center);
    }
    100% {
      clip-path: circle(0% at center bottom);
    }
  }

  [data-context-dialog]::backdrop {
    background-color: transparent;
  }
`,pe={scrollbar:ff,globalStyles:pf},cc=class R{static set config(t){this._config={...R._config,...t}}static get config(){return R._config}static addGlobalStyles(){let t=document.querySelector("style[id='bim-ui']");if(t)return;t=document.createElement("style"),t.id="bim-ui",t.textContent=pe.globalStyles.cssText;const i=document.head.firstChild;i?document.head.insertBefore(t,i):document.head.append(t)}static preloadIcons(t,i=!1){uf(t,(s,n,o)=>{i&&(console.log("Icons loaded:",s),n.length&&console.warn("Icons missing:",n),o.length&&console.info("Icons pending:",o))})}static addIconsCollection(t,i){df({prefix:(i==null?void 0:i.prefix)??"bim",icons:t,width:24,height:24})}static defineCustomElement(t,i){customElements.get(t)||customElements.define(t,i)}static registerComponents(){R.init()}static init(t="",i=!0){R.addGlobalStyles(),R.defineCustomElement("bim-button",_f),R.defineCustomElement("bim-checkbox",si),R.defineCustomElement("bim-color-input",ge),R.defineCustomElement("bim-context-menu",Ls),R.defineCustomElement("bim-dropdown",St),R.defineCustomElement("bim-grid",ss),R.defineCustomElement("bim-icon",Bf),R.defineCustomElement("bim-input",ns),R.defineCustomElement("bim-label",ni),R.defineCustomElement("bim-number-input",xt),R.defineCustomElement("bim-option",st),R.defineCustomElement("bim-panel",Re),R.defineCustomElement("bim-panel-section",oi),R.defineCustomElement("bim-selector",ri),R.defineCustomElement("bim-table",qo),R.defineCustomElement("bim-tabs",Kt),R.defineCustomElement("bim-tab",yt),R.defineCustomElement("bim-table-cell",kc),R.defineCustomElement("bim-table-children",sp),R.defineCustomElement("bim-table-group",Cc),R.defineCustomElement("bim-table-row",cs),R.defineCustomElement("bim-text-input",Ct),R.defineCustomElement("bim-toolbar",kn),R.defineCustomElement("bim-toolbar-group",_n),R.defineCustomElement("bim-toolbar-section",li),R.defineCustomElement("bim-viewport",Rc),R.defineCustomElement("bim-chart-legend",Fc),R.defineCustomElement("bim-chart",Q),R.defineCustomElement("bim-tooltip",o0),i&&this.animateOnLoad(t)}static newRandomId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let i="";for(let s=0;s<10;s++){const n=Math.floor(Math.random()*t.length);i+=t.charAt(n)}return i}static animateOnLoad(t=""){const i=`
      bim-input,
      bim-button,
      bim-checkbox,
      bim-selector,
      bim-label,
      bim-table-row,
      bim-panel-section,
      bim-table-children .branch-vertical,
      .switchers
    `,s=[];function n(o,r=document,a=new Set){const l=[];return Array.from(r.querySelectorAll(o)).forEach(c=>{a.has(c)||(a.add(c),l.push(c))}),Array.from(r.querySelectorAll("*")).filter(c=>c.shadowRoot).forEach(c=>{a.has(c)||(a.add(c),l.push(...n(o,c.shadowRoot,a)))}),l}requestAnimationFrame(()=>{n(t||i).forEach(r=>{const a=r;let l="auto";l=window.getComputedStyle(a).getPropertyValue("transition"),a.style.setProperty("opacity","0"),a.style.setProperty("transition","none"),requestAnimationFrame(()=>{a.style.setProperty("transition",l)}),s.push(a)});const o=()=>{s.forEach(r=>{const a=r,l=(a.getBoundingClientRect().x+a.getBoundingClientRect().y)/(window.innerWidth+window.innerHeight),c=window.getComputedStyle(a).getPropertyValue("transform"),h=400,d=200+l*1e3;a.animate([{transform:"translateY(-20px)",opacity:"0"},{transform:"translateY(0)",opacity:"1"}],{duration:h,easing:"ease-in-out",delay:d}),setTimeout(()=>{a.style.removeProperty("opacity"),c!=="none"?a.style.setProperty("transform",c):a.style.removeProperty("transform")},d+h)})};document.readyState==="complete"?o():window.addEventListener("load",o)})}static toggleTheme(t=!0){const i=document.querySelector("html");if(!i)return;const s=()=>{i.classList.contains("bim-ui-dark")?i.classList.replace("bim-ui-dark","bim-ui-light"):i.classList.contains("bim-ui-light")?i.classList.replace("bim-ui-light","bim-ui-dark"):i.classList.add("bim-ui-light")};if(t){const n=document.createElement("div");n.classList.add("theme-transition-overlay");const o=document.createElement("div");n.appendChild(o),o.style.setProperty("transition",`background-color ${1e3/3200}s`),document.body.appendChild(n),n.style.setProperty("animation",`toggleOverlay ${1e3/1e3}s ease-in forwards`),o.style.setProperty("animation",`toggleThemeAnimation ${1e3/1e3}s ease forwards`),setTimeout(()=>{s()},1e3/4),setTimeout(()=>{document.body.querySelectorAll(".theme-transition-overlay").forEach(r=>{document.body.removeChild(r)})},1e3)}else s()}};cc._config={sectionLabelOnVerticalToolbar:!1,internalComponentNameAttribute:"bim-element-name"};let gn=cc;class Je extends F{constructor(){super(...arguments),this._lazyLoadObserver=null,this._visibleElements=[],this.ELEMENTS_BEFORE_OBSERVER=20,this.useObserver=!1,this.elements=new Set,this.observe=t=>{if(!this.useObserver)return;for(const s of t)this.elements.add(s);const i=t.slice(this.ELEMENTS_BEFORE_OBSERVER);for(const s of i)s.remove();this.observeLastElement()}}set visibleElements(t){this._visibleElements=this.useObserver?t:[],this.requestUpdate()}get visibleElements(){return this._visibleElements}getLazyObserver(){if(!this.useObserver)return null;if(this._lazyLoadObserver)return this._lazyLoadObserver;const t=new IntersectionObserver(i=>{const s=i[0];if(!s.isIntersecting)return;const n=s.target;t.unobserve(n);const o=this.ELEMENTS_BEFORE_OBSERVER+this.visibleElements.length,r=[...this.elements][o];r&&(this.visibleElements=[...this.visibleElements,r],t.observe(r))},{threshold:.5});return t}observeLastElement(){const t=this.getLazyObserver();if(!t)return;const i=this.ELEMENTS_BEFORE_OBSERVER+this.visibleElements.length-1,s=[...this.elements][i];s&&t.observe(s)}resetVisibleElements(){const t=this.getLazyObserver();if(t){for(const i of this.elements)t.unobserve(i);this.visibleElements=[],this.observeLastElement()}}static create(t,i){const s=document.createDocumentFragment();if(t.length===0)return eo(t(),s),s.firstElementChild;if(!i)throw new Error("UIComponent: Initial state is required for statefull components.");let n=i;const o=t,r=c=>(n={...n,...c},eo(o(n,r),s),n);r(i);const a=s.firstElementChild,l={getElement:c=>a.querySelector(`[data-${gn.config.internalComponentNameAttribute}="${c}"]`),getCurrentState:()=>n,dispose:()=>{a.remove(),n={},l.updates={}},updates:{}};return[a,r,l]}}const Js=(e,t={},i=!0)=>{let s={};for(const n of e.children){const o=n,r=o.getAttribute("name")||o.getAttribute("label"),a=r?t[r]:void 0;if(r){if("value"in o&&typeof o.value<"u"&&o.value!==null){const l=o.value;if(typeof l=="object"&&!Array.isArray(l)&&Object.keys(l).length===0)continue;s[r]=a?a(o.value):o.value}else if(i){const l=Js(o,t);if(Object.keys(l).length===0)continue;s[r]=a?a(l):l}}else i&&(s={...s,...Js(o,t)})}return s},mn=e=>e==="true"||e==="false"?e==="true":e&&!isNaN(Number(e))&&e.trim()!==""?Number(e):e,gf=[">=","<=","=",">","<","?","/","#"];function Xr(e){const t=gf.find(r=>e.split(r).length===2),i=e.split(t).map(r=>r.trim()),[s,n]=i,o=n.startsWith("'")&&n.endsWith("'")?n.replace(/'/g,""):mn(n);return{key:s,condition:t,value:o}}const co=e=>{try{const t=[],i=e.split(/&(?![^()]*\))/).map(s=>s.trim());for(const s of i){const n=!s.startsWith("(")&&!s.endsWith(")"),o=s.startsWith("(")&&s.endsWith(")");if(n){const r=Xr(s);t.push(r)}if(o){const r={operator:"&",queries:s.replace(/^(\()|(\))$/g,"").split("&").map(a=>a.trim()).map((a,l)=>{const c=Xr(a);return l>0&&(c.operator="&"),c})};t.push(r)}}return t}catch{return null}},Gr=(e,t,i)=>{let s=!1;switch(t){case"=":s=e===i;break;case"?":s=String(e).includes(String(i));break;case"<":(typeof e=="number"||typeof i=="number")&&(s=e<i);break;case"<=":(typeof e=="number"||typeof i=="number")&&(s=e<=i);break;case">":(typeof e=="number"||typeof i=="number")&&(s=e>i);break;case">=":(typeof e=="number"||typeof i=="number")&&(s=e>=i);break;case"/":s=String(e).startsWith(String(i));break}return s};let xe=class{constructor(){this.enabled=!0,this.trigger=e=>{if(!this.enabled)return;const t=this.handlers.slice(0);for(const i of t)i(e)},this.handlers=[]}add(e){this.handlers.push(e)}remove(e){this.handlers=this.handlers.filter(t=>t!==e)}reset(){this.handlers.length=0}};class mf extends Set{constructor(t){super(t),this.onUpdated=new xe,this.onItemAdded=new xe,this.onBeforeDelete=new xe,this.onItemDeleted=new xe,this.onCleared=new xe,this.guard=()=>!0,this.deleteGuard=()=>!0}set eventsEnabled(t){this.onUpdated.enabled=t,this.onItemAdded.enabled=t,this.onItemDeleted.enabled=t,this.onBeforeDelete.enabled=t,this.onCleared.enabled=t}clear(){for(const t of this)this.onBeforeDelete.trigger(t);super.clear(),this.onCleared.trigger(),this.onUpdated.trigger()}add(...t){for(const i of t)this.has(i)||!(this.guard??(()=>!0))(i)||(super.add(i),this.onItemAdded||(this.onItemAdded=new xe),this.onItemAdded.trigger(i));return this.onUpdated||(this.onUpdated=new xe),this.onUpdated.trigger(),this}delete(t){if(!this.has(t)||!this.deleteGuard(t))return!1;this.onBeforeDelete.trigger(t);const i=super.delete(t);return i&&(this.onItemDeleted.trigger(t),this.onUpdated.trigger()),i}deleteIf(t){for(const i of this)t(i)&&this.delete(i)}getIndex(t){let i=0;for(const s of this){if(s===t)return i;i++}return-1}dispose(){this.clear(),this.onItemAdded.reset(),this.onItemDeleted.reset(),this.onCleared.reset(),this.onBeforeDelete.reset(),this.onUpdated.reset()}}var bf=Object.defineProperty,yf=Object.getOwnPropertyDescriptor,hc=(e,t,i,s)=>{for(var n=yf(t,i),o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&bf(t,i,n),n},at;const Wo=(at=class extends F{constructor(){super(...arguments),this._previousContainer=null,this._visible=!1}get placement(){return this._placement}set placement(e){this._placement=e,this.updatePosition()}static removeMenus(){for(const e of[...at.dialog.children])e instanceof at&&(e.remove(),e.visible=!1);setTimeout(()=>{at.dialog.close(),at.dialog.remove()},310)}get visible(){return this._visible}set visible(e){this._visible=e,e?(at.dialog.parentElement||document.body.append(at.dialog),this._previousContainer=this.parentElement,at.dialog.style.top=`${window.scrollY||document.documentElement.scrollTop}px`,this.style.setProperty("display","flex"),at.dialog.append(this),at.dialog.showModal(),this.updatePosition(),this.dispatchEvent(new Event("visible"))):setTimeout(()=>{var t;(t=this._previousContainer)==null||t.append(this),this._previousContainer=null,this.style.setProperty("display","none"),this.dispatchEvent(new Event("hidden"))},310)}async updatePosition(){if(!(this.visible&&this._previousContainer))return;const e=this.placement??"right",t=await Ro(this._previousContainer,this,{placement:e,middleware:[$o(10),Lo(),zo(),Do({padding:5})]}),{x:i,y:s}=t;this.style.left=`${i}px`,this.style.top=`${s}px`}connectedCallback(){super.connectedCallback(),this.visible?(this.style.setProperty("width","auto"),this.style.setProperty("height","auto")):(this.style.setProperty("display","none"),this.style.setProperty("width","0"),this.style.setProperty("height","0"))}render(){return S` <slot></slot> `}},at.styles=[pe.scrollbar,j`
      :host {
        pointer-events: auto;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        overflow: auto;
        max-height: 20rem;
        min-width: 3rem;
        flex-direction: column;
        box-shadow: 1px 2px 8px 2px rgba(0, 0, 0, 0.15);
        padding: 0.5rem;
        border-radius: var(--bim-ui_size-4xs);
        display: flex;
        transform-origin: top left;
        transform: scale(1);
        clip-path: circle(150% at top left);
        background-color: var(--bim-ui_bg-contrast-20);
        transition:
          clip-path 0.2s cubic-bezier(0.72, 0.1, 0.43, 0.93),
          transform 0.3s cubic-bezier(0.72, 0.1, 0.45, 2.35);
      }

      :host(:not([visible])) {
        transform: scale(0.8);
        clip-path: circle(0 at top left);
      }
    `],at.dialog=Je.create(()=>S` <dialog
      @click=${e=>{e.target===at.dialog&&at.removeMenus()}}
      @cancel=${()=>at.removeMenus()}
      data-context-dialog
      style="
      width: 0;
      height: 0;
      position: relative;
      padding: 0;
      border: none;
      outline: none;
      margin: none;
      overflow: visible;
      background-color: transparent;
    "
    ></dialog>`),at);hc([v({type:String,reflect:!0})],Wo.prototype,"placement");hc([v({type:Boolean,reflect:!0})],Wo.prototype,"visible");let Ls=Wo;var vf=Object.defineProperty,xf=Object.getOwnPropertyDescriptor,Pt=(e,t,i,s)=>{for(var n=s>1?void 0:s?xf(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&vf(t,i,n),n},pi;const kt=(pi=class extends F{constructor(){super(),this.labelHidden=!1,this.active=!1,this.disabled=!1,this.vertical=!1,this.tooltipVisible=!1,this._stateBeforeLoading={disabled:!1,icon:""},this._loading=!1,this._parent=Ke(),this._tooltip=Ke(),this._mouseLeave=!1,this.onClick=e=>{e.stopPropagation(),this.disabled||this.dispatchEvent(new Event("click"))},this.showContextMenu=()=>{let e=this._contextMenu;if(this.contextMenuTemplate){const t=this.disabled;this.disabled=!0,e=Je.create(()=>{const i=Je.create(this.contextMenuTemplate);return i instanceof Ls?S`${i}`:S`
          <bim-context-menu>${i}</bim-context-menu>
          `}),this.append(e),e.addEventListener("hidden",()=>{e==null||e.remove()}),this.disabled=t}if(e){const t=this.getAttribute("data-context-group");t&&e.setAttribute("data-context-group",t),this.closeNestedContexts();const i=gn.newRandomId();for(const s of e.children)s instanceof pi&&s.setAttribute("data-context-group",i);e.visible=!0}},this.mouseLeave=!0}set loading(e){if(this._loading=e,e)this._stateBeforeLoading={disabled:this.disabled,icon:this.icon},this.disabled=e,this.icon="eos-icons:loading";else{const{disabled:t,icon:i}=this._stateBeforeLoading;this.disabled=t,this.icon=i}}get loading(){return this._loading}set mouseLeave(e){this._mouseLeave=e,e&&(this.tooltipVisible=!1,clearTimeout(this.timeoutID))}get mouseLeave(){return this._mouseLeave}computeTooltipPosition(){const{value:e}=this._parent,{value:t}=this._tooltip;e&&t&&Ro(e,t,{placement:"bottom",middleware:[$o(10),Lo(),zo(),Do({padding:5})]}).then(i=>{const{x:s,y:n}=i;Object.assign(t.style,{left:`${s}px`,top:`${n}px`})})}onMouseEnter(){if(!(this.tooltipTitle||this.tooltipText))return;this.mouseLeave=!1;const e=this.tooltipTime??700;this.timeoutID=setTimeout(()=>{this.mouseLeave||(this.computeTooltipPosition(),this.tooltipVisible=!0)},e)}closeNestedContexts(){const e=this.getAttribute("data-context-group");if(e)for(const t of Ls.dialog.children){const i=t.getAttribute("data-context-group");if(t instanceof Ls&&i===e){t.visible=!1,t.removeAttribute("data-context-group");for(const s of t.children)s instanceof pi&&(s.closeNestedContexts(),s.removeAttribute("data-context-group"))}}}click(){this.disabled||super.click()}get _contextMenu(){return this.querySelector("bim-context-menu")}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.showContextMenu)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.showContextMenu)}render(){const e=S`
      <div ${It(this._tooltip)} class="tooltip">
        ${this.tooltipTitle?S`<p style="text-wrap: nowrap;">
              <strong>${this.tooltipTitle}</strong>
            </p>`:null}
        ${this.tooltipText?S`<p style="width: 9rem;">${this.tooltipText}</p>`:null}
      </div>
    `;let t=S`${this.label}`;if((this._contextMenu||this.contextMenuTemplate)&&this.label){const i=S`<svg
        xmlns="http://www.w3.org/2000/svg"
        height="1.125rem"
        viewBox="0 0 24 24"
        width="1.125rem"
        style="fill: var(--bim-label--c)"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>`;t=S`
        <div style="display: flex; align-items: center;">
          ${this.label}
          ${i}
        </div>
      `}return S`
      <div ${It(this._parent)} class="parent" @click=${this.onClick}>
        ${this.label||this.icon?S`
              <div
                class="button"
                @mouseenter=${this.onMouseEnter}
                @mouseleave=${()=>this.mouseLeave=!0}
              >
                <bim-label
                  .icon=${this.icon}
                  .vertical=${this.vertical}
                  .labelHidden=${this.labelHidden}
                  >${t}</bim-label
                >
              </div>
            `:null}
        ${this.tooltipTitle||this.tooltipText?e:null}
      </div>
      <slot></slot>
    `}},pi.styles=j`
    :host {
      --bim-label--c: var(--bim-ui_bg-contrast-100, white);
      position: relative;
      display: block;
      flex: 1;
      pointer-events: none;
      background-color: var(--bim-button--bgc, var(--bim-ui_bg-contrast-20));
      border-radius: var(--bim-ui_size-4xs);
      transition: all 0.15s;
    }

    :host(:not([disabled]))::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: var(--bim-ui_main-base);
      clip-path: circle(0 at center center);
      box-sizing: border-box;
      transition:
        clip-path 0.3s cubic-bezier(0.65, 0.05, 0.36, 1),
        transform 0.15s;
    }

    :host(:not([disabled]):hover) {
      cursor: pointer;
    }

    bim-label {
      pointer-events: none;
    }

    .parent {
      --bim-icon--c: var(--bim-label--c);
      position: relative;
      display: flex;
      height: 100%;
      user-select: none;
      row-gap: 0.125rem;
      min-height: var(--bim-ui_size-5xl);
      min-width: var(--bim-ui_size-5xl);
    }

    .button,
    .children {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
    }

    .children {
      padding: 0 0.375rem;
      position: absolute;
      height: 100%;
      right: 0;
    }

    :host(:not([label-hidden])[icon][vertical]) .parent {
      min-height: 2.5rem;
    }

    .button {
      flex-grow: 1;
      transition: transform 0.15s;
    }

    :host(:not([label-hidden])[label]) .button {
      justify-content: var(--bim-button--jc, center);
    }

    :host(:hover)::before {
      clip-path: circle(120% at center center);
    }

    :host(:hover) {
      --bim-label--c: var(--bim-ui_main-contrast);
      z-index: 2;
    }

    :host([active]) {
      background-color: var(--bim-ui_main-base);
    }

    :host(:not([disabled]):active) {
      background: transparent;
    }

    :host(:not([disabled]):active) .button,
    :host(:not([disabled]):active)::before {
      transform: scale(0.98);
    }

    :host(:not([label]):not([icon])) .children {
      flex: 1;
    }

    :host([vertical]) .parent {
      justify-content: center;
    }

    :host(:not([label-hidden])[label]) .button {
      padding: 0 0.5rem;
    }

    :host([disabled]) {
      --bim-label--c: var(--bim-ui_bg-contrast-80) !important;
      background-color: gray !important;
    }

    ::slotted(bim-button) {
      --bim-icon--fz: var(--bim-ui_size-base);
      --bim-button--bdrs: var(--bim-ui_size-4xs);
      --bim-button--olw: 0;
      --bim-button--olc: transparent;
    }

    .tooltip {
      position: absolute;
      padding: 0.75rem;
      z-index: 99;
      display: flex;
      flex-flow: column;
      row-gap: 0.375rem;
      box-shadow: 0 0 10px 3px rgba(0 0 0 / 20%);
      outline: 1px solid var(--bim-ui_bg-contrast-40);
      font-size: var(--bim-ui_size-xs);
      border-radius: var(--bim-ui_size-4xs);
      background-color: var(--bim-ui_bg-contrast-20);
      color: var(--bim-ui_bg-contrast-100);
      animation: openTooltips 0.15s ease-out forwards;
      transition: visibility 0.2s;
    }

    .tooltip p {
      margin: 0;
      padding: 0;
    }

    :host(:not([tooltip-visible])) .tooltip {
      animation: closeTooltips 0.15s ease-in forwards;
      visibility: hidden;
      display: none;
    }

    @keyframes closeTooltips {
      0% {
        display: flex;
        padding: 0.75rem;
        transform: translateY(0);
        opacity: 1;
      }
      90% {
        padding: 0.75rem;
      }
      100% {
        display: none;
        padding: 0;
        transform: translateY(-10px);
        opacity: 0;
      }
    }

    @keyframes openTooltips {
      0% {
        display: flex;
        transform: translateY(-10px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,pi);Pt([v({type:String,reflect:!0})],kt.prototype,"label",2);Pt([v({type:Boolean,attribute:"label-hidden",reflect:!0})],kt.prototype,"labelHidden",2);Pt([v({type:Boolean,reflect:!0})],kt.prototype,"active",2);Pt([v({type:Boolean,reflect:!0,attribute:"disabled"})],kt.prototype,"disabled",2);Pt([v({type:String,reflect:!0})],kt.prototype,"icon",2);Pt([v({type:Boolean,reflect:!0})],kt.prototype,"vertical",2);Pt([v({type:Number,attribute:"tooltip-time",reflect:!0})],kt.prototype,"tooltipTime",2);Pt([v({type:Boolean,attribute:"tooltip-visible",reflect:!0})],kt.prototype,"tooltipVisible",2);Pt([v({type:String,attribute:"tooltip-title",reflect:!0})],kt.prototype,"tooltipTitle",2);Pt([v({type:String,attribute:"tooltip-text",reflect:!0})],kt.prototype,"tooltipText",2);Pt([v({type:Boolean,reflect:!0})],kt.prototype,"loading",1);let _f=kt;var wf=Object.defineProperty,is=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&wf(t,i,n),n};const dc=class extends F{constructor(){super(...arguments),this.checked=!1,this.inverted=!1,this.onValueChange=new Event("change")}get value(){return this.checked}onChange(t){t.stopPropagation(),this.checked=t.target.checked,this.dispatchEvent(this.onValueChange)}render(){const t=S`
      <svg viewBox="0 0 21 21">
        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
      </svg>
    `;return S`
      <div class="parent">
        <label class="parent-label">
          ${this.label?S`<bim-label .icon="${this.icon}">${this.label}</bim-label> `:null}
          <div class="input-container">
            <input
              type="checkbox"
              aria-label=${this.label||this.name||"Checkbox Input"}
              @change="${this.onChange}"
              .checked="${this.checked}"
            />
            ${t}
          </div>
        </label>
      </div>
    `}};dc.styles=j`
    :host {
      display: block;
    }

    .parent-label {
      --background: #fff;
      --border: #dfdfe6;
      --stroke: #fff;
      --border-hover: var(--bim-ui_main-base);
      --border-active: var(--bim-ui_main-base);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      width: 100%;
      height: 1.75rem;
      column-gap: 0.25rem;
      position: relative;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    :host([inverted]) .parent-label {
      flex-direction: row-reverse;
      justify-content: start;
    }

    input,
    svg {
      width: 1rem;
      height: 1rem;
      display: block;
    }

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      outline: none;
      background: var(--background);
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      border-radius: 4px;
      transition: box-shadow 0.3s;
      box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));
    }

    svg {
      pointer-events: none;
      fill: none;
      stroke-width: 2.2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: var(--stroke, var(--border-active));
      transform: translateY(-100%) scale(0);
      position: absolute;
      width: 1rem;
      height: 1rem;
    }

    input:hover {
      --s: 2px;
      --b: var(--border-hover);
    }

    input:checked {
      --b: var(--border-active);
      --s: 11px;
    }

    input:checked + svg {
      -webkit-animation: bounce 0.4s linear forwards 0.2s;
      animation: bounce 0.4s linear forwards 0.2s;
    }

    @keyframes bounce {
      0% {
        transform: translateY(-100%) scale(0);
      }
      50% {
        transform: translateY(-100%) scale(1.2);
      }
      75% {
        transform: translateY(-100%) scale(0.9);
      }
      100% {
        transform: translateY(-100%) scale(1);
      }
    }
  `;let si=dc;is([v({type:String,reflect:!0})],si.prototype,"icon");is([v({type:String,reflect:!0})],si.prototype,"name");is([v({type:String,reflect:!0})],si.prototype,"label");is([v({type:Boolean,reflect:!0})],si.prototype,"checked");is([v({type:Boolean,reflect:!0})],si.prototype,"inverted");var kf=Object.defineProperty,Le=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&kf(t,i,n),n};const uc=class extends F{constructor(){super(...arguments),this.vertical=!1,this.color="#bcf124",this.disabled=!1,this._colorInput=Ke(),this._textInput=Ke(),this.onValueChange=new Event("input"),this.onOpacityInput=t=>{const i=t.target;this.opacity=i.value,this.dispatchEvent(this.onValueChange)}}set value(t){const{color:i,opacity:s}=t;this.color=i,s&&(this.opacity=s)}get value(){const t={color:this.color};return this.opacity&&(t.opacity=this.opacity),t}onColorInput(t){t.stopPropagation();const{value:i}=this._colorInput;i&&(this.color=i.value,this.dispatchEvent(this.onValueChange))}onTextInput(t){t.stopPropagation();const{value:i}=this._textInput;if(!i)return;const{value:s}=i;let n=s.replace(/[^a-fA-F0-9]/g,"");n.startsWith("#")||(n=`#${n}`),i.value=n.slice(0,7),i.value.length===7&&(this.color=i.value,this.dispatchEvent(this.onValueChange))}focus(){const{value:t}=this._colorInput;t&&t.click()}render(){return S`
      <div class="parent">
        <bim-input
          .label=${this.label}
          .icon=${this.icon}
          .vertical="${this.vertical}"
        >
          <div class="color-container">
            <div
              style="display: flex; align-items: center; gap: .375rem; height: 100%; flex: 1; padding: 0 0.5rem;"
            >
              <input
                ${It(this._colorInput)}
                @input="${this.onColorInput}"
                type="color"
                aria-label=${this.label||this.name||"Color Input"}
                value="${this.color}"
                ?disabled=${this.disabled}
              />
              <div
                @click=${this.focus}
                class="sample"
                style="background-color: ${this.color}"
              ></div>
              <input
                ${It(this._textInput)}
                @input="${this.onTextInput}"
                value="${this.color}"
                type="text"
                aria-label=${this.label||this.name||"Text Color Input"}
                ?disabled=${this.disabled}
              />
            </div>
            ${this.opacity!==void 0?S`<bim-number-input
                  @change=${this.onOpacityInput}
                  slider
                  suffix="%"
                  min="0"
                  value=${this.opacity}
                  max="100"
                ></bim-number-input>`:null}
          </div>
        </bim-input>
      </div>
    `}};uc.styles=j`
    :host {
      --bim-input--bgc: var(--bim-ui_bg-contrast-20);
      flex: 1;
      display: block;
    }

    :host(:focus) {
      --bim-input--olw: var(--bim-number-input--olw, 2px);
      --bim-input--olc: var(--bim-ui_accent-base);
    }

    .parent {
      display: flex;
      gap: 0.375rem;
    }

    .color-container {
      position: relative;
      outline: none;
      display: flex;
      height: 100%;
      gap: 0.5rem;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
      border-radius: var(--bim-color-input--bdrs, var(--bim-ui_size-4xs));
    }

    .color-container input[type="color"] {
      position: absolute;
      bottom: -0.25rem;
      visibility: hidden;
      width: 0;
      height: 0;
    }

    .color-container .sample {
      width: 1rem;
      height: 1rem;
      border-radius: 0.125rem;
      background-color: #fff;
    }

    .color-container input[type="text"] {
      height: 100%;
      flex: 1;
      width: 3.25rem;
      text-transform: uppercase;
      font-size: 0.75rem;
      background-color: transparent;
      padding: 0%;
      outline: none;
      border: none;
      color: var(--bim-color-input--c, var(--bim-ui_bg-contrast-100));
    }

    :host([disabled]) .color-container input[type="text"] {
      color: var(--bim-ui_bg-contrast-60);
    }

    bim-number-input {
      flex-grow: 0;
    }
  `;let ge=uc;Le([v({type:String,reflect:!0})],ge.prototype,"name");Le([v({type:String,reflect:!0})],ge.prototype,"label");Le([v({type:String,reflect:!0})],ge.prototype,"icon");Le([v({type:Boolean,reflect:!0})],ge.prototype,"vertical");Le([v({type:Number,reflect:!0})],ge.prototype,"opacity");Le([v({type:String,reflect:!0})],ge.prototype,"color");Le([v({type:Boolean,reflect:!0})],ge.prototype,"disabled");var Sf=Object.defineProperty,Mf=Object.getOwnPropertyDescriptor,me=(e,t,i,s)=>{for(var n=s>1?void 0:s?Mf(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&Sf(t,i,n),n};const fc=class extends F{constructor(){super(...arguments),this.checked=!1,this.checkbox=!1,this.noMark=!1,this.vertical=!1}get value(){return this._value!==void 0?this._value:this.label?mn(this.label):this.label}set value(t){this._value=t}render(){return S`
      <div class="parent" .title=${this.label??""}>
        ${this.img||this.icon||this.label?S` <div style="display: flex; column-gap: 0.375rem">
              ${this.checkbox&&!this.noMark?S`<bim-checkbox
                    style="pointer-events: none"
                    .checked=${this.checked}
                  ></bim-checkbox>`:null}
              <bim-label
                .vertical=${this.vertical}
                .icon=${this.icon}
                .img=${this.img}
                >${this.label}</bim-label
              >
            </div>`:null}
        ${!this.checkbox&&!this.noMark&&this.checked?S`<svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.125rem"
              viewBox="0 0 24 24"
              width="1.125rem"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>`:null}
        <slot></slot>
      </div>
    `}};fc.styles=j`
    :host {
      --bim-label--c: var(--bim-ui_bg-contrast-100);
      display: block;
      box-sizing: border-box;
      flex: 1;
      padding: 0rem 0.5rem;
      border-radius: var(--bim-ui_size-4xs);
      transition: all 0.15s;
    }

    :host(:hover) {
      cursor: pointer;
    }

    :host([checked]) {
      --bim-label--c: color-mix(in lab, var(--bim-ui_main-base), white 30%);
    }

    :host([checked]) svg {
      fill: color-mix(in lab, var(--bim-ui_main-base), white 30%);
    }

    .parent {
      box-sizing: border-box;
      display: flex;
      justify-content: var(--bim-option--jc, space-between);
      column-gap: 0.5rem;
      align-items: center;
      min-height: 1.75rem;
      height: 100%;
    }

    input {
      height: 1rem;
      width: 1rem;
      cursor: pointer;
      border: none;
      outline: none;
      accent-color: var(--bim-checkbox--c, var(--bim-ui_main-base));
    }

    input:focus {
      outline: var(--bim-checkbox--olw, 2px) solid
        var(--bim-checkbox--olc, var(--bim-ui_accent-base));
    }

    bim-label {
      pointer-events: none;
      z-index: 1;
    }
  `;let st=fc;me([v({type:String,reflect:!0})],st.prototype,"img",2);me([v({type:String,reflect:!0})],st.prototype,"label",2);me([v({type:String,reflect:!0})],st.prototype,"icon",2);me([v({type:Boolean,reflect:!0})],st.prototype,"checked",2);me([v({type:Boolean,reflect:!0})],st.prototype,"checkbox",2);me([v({type:Boolean,attribute:"no-mark",reflect:!0})],st.prototype,"noMark",2);me([v({converter:{fromAttribute(e){return e&&mn(e)}}})],st.prototype,"value",1);me([v({type:Boolean,reflect:!0})],st.prototype,"vertical",2);var Cf=Object.defineProperty,Af=Object.getOwnPropertyDescriptor,$t=(e,t,i,s)=>{for(var n=s>1?void 0:s?Af(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&Cf(t,i,n),n};const pc=class extends Je{constructor(){super(),this.multiple=!1,this.required=!1,this.vertical=!1,this._visible=!1,this._value=new Set,this._hasVisibleOptions=!0,this.onValueChange=new Event("change"),this._contextMenu=Ke(),this.onOptionClick=t=>{const i=t.target,s=this._value.has(i);if(!this.multiple&&!this.required&&!s)this._value=new Set([i]);else if(!this.multiple&&!this.required&&s)this._value=new Set([]);else if(!this.multiple&&this.required&&!s)this._value=new Set([i]);else if(this.multiple&&!this.required&&!s)this._value=new Set([...this._value,i]);else if(this.multiple&&!this.required&&s){const n=[...this._value].filter(o=>o!==i);this._value=new Set(n)}else if(this.multiple&&this.required&&!s)this._value=new Set([...this._value,i]);else if(this.multiple&&this.required&&s){const n=[...this._value].filter(r=>r!==i),o=new Set(n);o.size!==0&&(this._value=o)}this.updateOptionsState(),this.dispatchEvent(this.onValueChange)},this.onSearch=({target:t})=>{const i=t.value.toLowerCase();let s=0;for(const n of this._options)n instanceof st&&((n.label||n.value||"").toLowerCase().includes(i)?(n.style.display="",s++):n.style.display="none");this._hasVisibleOptions=s>0},this.useObserver=!0}set visible(t){var i;if(t){const{value:s}=this._contextMenu;if(!s)return;for(const n of this.elements)s.append(n);this._visible=!0}else{for(const n of this.elements)this.append(n);this._visible=!1,this.resetVisibleElements();for(const n of this._options)n instanceof st&&(n.style.display="");const s=(i=this._contextMenu.value)==null?void 0:i.querySelector("bim-text-input");s&&(s.value=""),this._hasVisibleOptions=!0}}get visible(){return this._visible}set value(t){if(this.required&&Object.keys(t).length===0)return;const i=new Set;for(const s of t){const n=this.findOption(s);if(n&&(i.add(n),!this.multiple&&Object.keys(t).length===1))break}this._value=i,this.updateOptionsState(),this.dispatchEvent(this.onValueChange)}get value(){return[...this._value].filter(t=>t instanceof st&&t.checked).map(t=>t.value)}get _options(){const t=new Set([...this.elements]);for(const i of this.children)i instanceof st&&t.add(i);return[...t]}onSlotChange(t){const i=t.target.assignedElements();this.observe(i);const s=new Set;for(const n of this.elements){if(!(n instanceof st)){n.remove();continue}n.checked&&s.add(n),n.removeEventListener("click",this.onOptionClick),n.addEventListener("click",this.onOptionClick)}this._value=s}updateOptionsState(){for(const t of this._options)t instanceof st&&(t.checked=this._value.has(t))}findOption(t){return this._options.find(i=>i instanceof st?i.label===t||i.value===t:!1)}render(){let t,i,s;if(this._value.size===0)t=this.placeholder??"Select an option...";else if(this._value.size===1){const n=[...this._value][0];t=(n==null?void 0:n.label)||(n==null?void 0:n.value),i=n==null?void 0:n.img,s=n==null?void 0:n.icon}else t=`Multiple (${this._value.size})`;return S`
      <bim-input
        title=${this.label??""}
        .label=${this.label}
        .icon=${this.icon}
        .vertical=${this.vertical}
      >
        <div class="input" @click=${()=>this.visible=!this.visible}>
          <bim-label
            .img=${i}
            .icon=${s}
            style="overflow: hidden;"
            >${t}</bim-label
          >
          <svg
            style="flex-shrink: 0; fill: var(--bim-dropdown--c, var(--bim-ui_bg-contrast-100))"
            xmlns="http://www.w3.org/2000/svg"
            height="1.125rem"
            viewBox="0 0 24 24"
            width="1.125rem"
            fill="#9ca3af"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
          <bim-context-menu
            ${It(this._contextMenu)}
            .visible=${this.visible}
            @hidden=${()=>{this.visible&&(this.visible=!1)}}
          >
            ${this.searchBox?S`<bim-text-input @input=${this.onSearch} placeholder="Search..." debounce=200 style="--bim-input--bgc: var(--bim-ui_bg-contrast-30)"></bim-text-input>`:N}
            <slot @slotchange=${this.onSlotChange}></slot>
            ${this._hasVisibleOptions?N:S`<bim-label style="--bim-label--c: var(--bim-ui_bg-contrast-60); padding: 0.5rem;">No options found...</bim-label>`}
          </bim-context-menu>
        </div>
      </bim-input>
    `}};pc.styles=[pe.scrollbar,j`
      :host {
        --bim-input--bgc: var(
          --bim-dropdown--bgc,
          var(--bim-ui_bg-contrast-20)
        );
        --bim-input--olw: 2px;
        --bim-input--olc: transparent;
        --bim-input--bdrs: var(--bim-ui_size-4xs);
        flex: 1;
        display: block;
      }

      :host([visible]) {
        --bim-input--olc: var(--bim-ui_accent-base);
      }

      .input {
        --bim-label--fz: var(--bim-drodown--fz, var(--bim-ui_size-xs));
        --bim-label--c: var(--bim-dropdown--c, var(--bim-ui_bg-contrast-100));
        height: 100%;
        display: flex;
        flex: 1;
        overflow: hidden;
        column-gap: 0.25rem;
        outline: none;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.5rem;
      }

      bim-label {
        pointer-events: none;
      }
    `];let St=pc;$t([v({type:String,reflect:!0})],St.prototype,"name",2);$t([v({type:String,reflect:!0})],St.prototype,"icon",2);$t([v({type:String,reflect:!0})],St.prototype,"label",2);$t([v({type:Boolean,reflect:!0})],St.prototype,"multiple",2);$t([v({type:Boolean,reflect:!0})],St.prototype,"required",2);$t([v({type:Boolean,reflect:!0})],St.prototype,"vertical",2);$t([v({type:String,reflect:!0})],St.prototype,"placeholder",2);$t([v({type:Boolean,reflect:!0,attribute:"search-box"})],St.prototype,"searchBox",2);$t([v({type:Boolean,reflect:!0})],St.prototype,"visible",1);$t([Jt()],St.prototype,"_value",2);$t([Jt()],St.prototype,"_hasVisibleOptions",2);function Ef(e){const t=[],i=/(["'])(.*?)\1/g;let s;for(;(s=i.exec(e))!==null;){const n=s[2].trim();if(n===""){t.push([]);continue}const o=n.split(/\s+/).map(r=>r==="."?null:r);t.push(o)}if(t.length===0){const n=e.split(/\r?\n/).map(o=>o.trim()).filter(Boolean);for(const o of n){const r=o.replace(/^["']|["']$/g,"").trim();r&&t.push(r.split(/\s+/).map(a=>a==="."?null:a))}}return t}function Pf(e){const t=e.split(`
`).map(s=>s.trim()).map(s=>s.split('"')[1]).filter(s=>s!==void 0),i=[];for(const s of t){let n="",o=0;for(let r=0;r<s.length;r++){const a=s[r];a==="["?(o++,n+=a):a==="]"?(o--,n+=a):a===" "&&o===0?n!==""&&(i.push(n),n=""):n+=a}n!==""&&i.push(n)}return[...new Set(i)].filter(s=>s!=="")}function $f(e){var t;const i=[],s=e.length,n=((t=e[0])==null?void 0:t.length)||0;for(let o=0;o<s;o++)for(let r=0;r<n-1;r++){const a=e[o][r],l=e[o][r+1];if(a!==l){const c=i.find(h=>h.type==="vertical"&&h.from[0]===r+1&&h.to[0]===r+1&&h.from[1]<=o&&h.to[1]>=o);c?(c.to[1]=o+1,c.left&&a&&c.left.push(a),c.right&&l&&c.right.push(l)):i.push({type:"vertical",from:[r+1,o],to:[r+1,o+1],left:a?[a]:[],right:l?[l]:[]})}}for(let o=0;o<s-1;o++)for(let r=0;r<n;r++){const a=e[o][r],l=e[o+1][r];if(a!==l){const c=i.find(h=>h.type==="horizontal"&&h.from[1]===o+1&&h.to[1]===o+1&&h.from[0]<=r&&h.to[0]>=r);c?(c.to[0]=r+1,c.above&&a&&c.above.push(a),c.below&&l&&c.below.push(l)):i.push({type:"horizontal",from:[r,o+1],to:[r+1,o+1],above:a?[a]:[],below:l?[l]:[]})}}return Of(i)}function Of(e){for(const t of e)t.left&&(t.left=[...new Set(t.left)]),t.right&&(t.right=[...new Set(t.right)]),t.above&&(t.above=[...new Set(t.above)]),t.below&&(t.below=[...new Set(t.below)]);return e}function Tf(e,t,i,s){const n=(parseFloat(e.colSizesComputed[i-1])||0)+t;let o;return o=(parseFloat(e.colSizesComputed[i])||0)-t,{left:n,right:o}}function Df(e,t,i,s){const n=(parseFloat(e.rowSizesComputed[i-1])||0)+t;let o;return o=(parseFloat(e.rowSizesComputed[i])||0)-t,{top:n,bottom:o}}function zf(e,t,i,s){return!(e<s&&i<0||t<s&&i>0)}function Lf(e,t,i,s){return!(e<s&&i<0||t<s&&i>0)}function Rf(e,t){const[i,s]=e.from,[n,o]=e.to,r=t.gap.split(" "),a=r[1]||r[0]||"0px",l=r[0]||"0px",c=e.type==="horizontal"?"0":`calc(-50% - ${a} / 2)`,h=e.type==="horizontal"?`calc(-50% - ${l} / 2)`:"0",d={"grid-column":`${i+1} / ${n+1}`,"grid-row":`${s+1} / ${o+1}`,transform:`translate(${c}, ${h})`},u=parseFloat(t.fontSize);return e.type==="vertical"?d.width=`${Math.max(parseFloat(a),u)}px`:d.height=`${Math.max(parseFloat(l),u)}px`,d}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gc="important",If=" !"+gc,ho=Nl(class extends Vl{constructor(e){var t;if(super(e),e.type!==Hl.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const s=e[i];return s==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?i.removeProperty(s):i[s]=null);for(const s in t){const n=t[s];if(n!=null){this.ft.add(s);const o=typeof n=="string"&&n.endsWith(If);s.includes("-")||o?i.setProperty(s,o?n.slice(0,-11):n,o?gc:""):i[s]=n}}return Te}});var Ff=Object.defineProperty,bn=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&Ff(t,i,n),n};const mc=class extends F{constructor(){super(...arguments),this.floating=!1,this.resizeableAreas=!1,this.areasResizeExceptions=[],this._layouts={},this._elements={},this._templateIds=new Map,this._updateFunctions={},this._slotNames={notAllowed:"not-allowed",notFound:"not-found",emptyLayout:"empty-layout"},this._colSizesRaw=[],this._rowSizesRaw=[],this._colSizesComputed=[],this._rowSizesComputed=[],this._start=null,this.layoutsResize={},this._onMouseMove=t=>{if(!this._start||!this.layout)return;const i=t.clientX-this._start.x,s=t.clientY-this._start.y,n=this._start.divider,o=getComputedStyle(this),r=parseFloat(o.fontSize)*3;if(n.type==="vertical"){const a=n.from[0],l=this._colSizesRaw.length-1,c=a===l,h=Tf(this._start,i,a);if(!zf(h.left,h.right,i,r))return;const d=Math.max(r,h.left),u=Math.max(r,h.right);this._colSizesRaw[a-1]=`${d}px`,this._colSizesRaw[a]=c?"1fr":`${u}px`,this.style.gridTemplateColumns=this._colSizesRaw.join(" ")}if(n.type==="horizontal"){const a=n.from[1],l=this._rowSizesRaw.length-1,c=a===l,h=Df(this._start,s,a);if(!Lf(h.top,h.bottom,s,r))return;const d=Math.max(r,h.top),u=Math.max(r,h.bottom);this._rowSizesRaw[a-1]=`${d}px`,this._rowSizesRaw[a]=c?"1fr":`${u}px`,this.style.gridTemplateRows=this._rowSizesRaw.join(" ")}this.layoutsResize[this.layout]={cols:this._colSizesRaw,rows:this._rowSizesRaw}},this._onMouseUp=()=>{window.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("mouseup",this._onMouseUp),this._start=null},this.updateComponent={},this.emitLayoutChange=()=>{this.dispatchEvent(new Event("layoutchange"))}}set layouts(t){this._layouts=t,this._templateIds.clear()}get layouts(){return this._layouts}set elements(t){this._elements=t,this.setUpdateFunctions()}get elements(){return this._elements}getLayoutAreas(t){return Pf(t.template)}setUpdateFunctions(){const t={};for(const[i,s]of Object.entries(this.elements))"template"in s&&(t[i]=n=>{var o,r;(r=(o=this._updateFunctions)[i])==null||r.call(o,n)});this.updateComponent=t}disconnectedCallback(){super.disconnectedCallback(),this._templateIds.clear(),this._updateFunctions={},this.updateComponent={}}getTemplateId(t){let i=this._templateIds.get(t);return i||(i=gn.newRandomId(),this._templateIds.set(t,i)),i}isAreaResizeable(t){return this.areasResizeExceptions.includes(t)?!1:this.resizeableAreas}canResizeVerticalDivider(t){const i=t.left||[],s=t.right||[];for(const n of i)if(!this.isAreaResizeable(n))return!1;for(const n of s)if(!this.isAreaResizeable(n))return!1;return!0}canResizeHorizontalDivider(t){const i=t.above||[],s=t.below||[];for(const n of i)if(!this.isAreaResizeable(n))return!1;for(const n of s)if(!this.isAreaResizeable(n))return!1;return!0}computeDividers(){var t;if(!this.layout)return;const i=(t=this.layouts[this.layout])==null?void 0:t.template;if(!i)return;const s=Ef(i),n=$f(s),o=getComputedStyle(this),r=[];for(const a of n){let l=!1;if(a.type==="vertical"?l=this.canResizeVerticalDivider(a):l=this.canResizeHorizontalDivider(a),!l)continue;const c=f=>{this._colSizesRaw=this.style.gridTemplateColumns.split(" "),this._rowSizesRaw=this.style.gridTemplateRows.split(" "),this._rowSizesComputed=o.gridTemplateRows.split(" "),this._colSizesComputed=o.gridTemplateColumns.split(" "),this._start={x:f.clientX,y:f.clientY,divider:a,colSizesRaw:[...this._colSizesRaw],rowSizesRaw:[...this._rowSizesRaw],colSizesComputed:[...this._colSizesComputed],rowSizesComputed:[...this._rowSizesComputed]},window.addEventListener("mousemove",this._onMouseMove),window.addEventListener("mouseup",this._onMouseUp)},h=f=>{f.preventDefault()},d=Rf(a,o),u=S`
        <div @mousedown=${c} @contextmenu=${h} class="grid-divider divider-${a.type}" style=${ho(d)}>
          <div></div>
        </div>
      `;r.push(u)}return r}cleanUpdateFunctions(){if(!this.layout){this._updateFunctions={};return}const t=this.layouts[this.layout],i=this.getLayoutAreas(t).map(s=>{const n=s.match(/\[([^\]]+)\]/);return n?n[1].split(":")[0].split(",").map(o=>o.trim()):[s]}).flat();for(const s in this.elements)i.includes(s)||delete this._updateFunctions[s]}clean(){this.style.gridTemplate="";for(const t of[...this.children])Object.values(this._slotNames).some(i=>t.getAttribute("slot")===i)||t.remove();this.cleanUpdateFunctions()}emitElementCreation(t){this.dispatchEvent(new CustomEvent("elementcreated",{detail:t}))}getSanitizedLayoutTemplate(t){return t.replace(/\b(\w+)\[[^\]]+\]/g,"$1")}createElementFromDefinition(t,i){if(i instanceof HTMLElement)return i;if("template"in i){const{template:r,initialState:a}=i,l=this.getTemplateId(r),c=this.querySelector(`[data-grid-template-id="${l}"]`);if(c){let u=this._updateFunctions[t];if(!u){for(const[,f]of Object.entries(this._updateFunctions))if(this.querySelector(`[data-grid-template-id="${this.getTemplateId(r)}"]`)===c){u=f;break}}return u&&(this._updateFunctions[t]=u),c}const[h,d]=Je.create(r,a);return h.setAttribute("data-grid-template-id",l),this._updateFunctions[t]=d,h}const s=this.getTemplateId(i),n=this.querySelector(`[data-grid-template-id="${s}"]`);if(n)return n;const o=Je.create(i);return o.setAttribute("data-grid-template-id",this.getTemplateId(i)),o}render(){if(this.layout){const t=this.layouts[this.layout];if(t){if(!(t.guard??(()=>!0))())return this.clean(),S`<slot name=${this._slotNames.notAllowed}></slot>`;const i=this.getLayoutAreas(t).map(n=>{var o,r;let a=n,l=[];const c=n.match(/^([^\[]+)\[([^\]]+)\]$/),h=!!c;if(c?(a=c[1],l=c[2].split(",").map(g=>{const p=g.trim(),m=p.indexOf(":");if(m>-1){const b=p.substring(0,m).trim(),y=p.substring(m+1).trim();return{key:b,label:y||void 0}}return{key:p}})):l=[{key:n}],!h){const g=l[0].key,p=((o=t.elements)==null?void 0:o[g])||this.elements[g];if(!p)return null;const m=this.createElementFromDefinition(g,p);return m?(this.emitElementCreation({name:g,element:m}),m.style.gridArea=n,m):null}const d=`tabs-${a}`;let u=this.querySelector(`[data-grid-tabs-id="${d}"]`);u||(u=document.createElement("bim-tabs"),u.setAttribute("data-grid-tabs-id",d),u.setAttribute("switchers-full","")),u.style.gridArea=a;const f=[];for(const g of l){const p=g.key,m=g.label||p,b=((r=t.elements)==null?void 0:r[p])||this.elements[p];if(!b)continue;const y=this.createElementFromDefinition(p,b);if(!y)continue;this.emitElementCreation({name:p,element:y});const _=`tab-${a}-${p}`;let x=u.querySelector(`[data-grid-tab-id="${_}"]`);x||(x=document.createElement("bim-tab"),x.setAttribute("data-grid-tab-id",_),x.name=p),x.label=m,x.innerHTML="",x.appendChild(y),f.push(x)}return u.innerHTML="",u.append(...f),u}).filter(n=>n!==null);this.clean(),this.style.gridTemplate=this.getSanitizedLayoutTemplate(t.template);const s=this.layoutsResize[this.layout];s&&(this.style.gridTemplateColumns=s.cols.join(" "),this.style.gridTemplateRows=s.rows.join(" ")),this.append(...i),this.emitLayoutChange()}else return this.clean(),S`<slot name=${this._slotNames.notFound}></slot>`}else return this.clean(),this.emitLayoutChange(),S`<slot name=${this._slotNames.emptyLayout}></slot>`;return S`
      ${this.resizeableAreas?this.computeDividers():null}
      <slot></slot>
    `}};mc.styles=j`
    :host {
      display: grid;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* :host(:not([layout])) {
      display: none;
    } */

    :host([floating]) {
      --bim-panel--bdrs: var(--bim-ui_size-4xs);
      background-color: transparent;
      padding: 1rem;
      gap: 1rem;
      position: absolute;
      pointer-events: none;
      top: 0px;
      left: 0px;
    }

    :host(:not([floating])) {
      --bim-panel--bdrs: 0;
      background-color: var(--bim-ui_bg-contrast-20);
      gap: 1px;
    }

    .grid-divider {
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      user-select: none;
    }

    .grid-divider > div {
      transition: background-color 150ms ease-in-out;
    }
    
    .grid-divider:hover > div {
      background-color: var(--bim-ui_accent-base);
    }
    
    .divider-horizontal {
      /* background-color: #ff00003d; */
      transform: translateY(-50%);
      cursor: n-resize;
    }
    
    .divider-horizontal > div {
      height: 3px;
      width: 100%;
      /* transform: translateY(-50%); */
    }
    
    .divider-vertical {
      /* background-color: #ff00003d; */
      transform: translateX(-50%);
      cursor: e-resize;
    }
    
    .divider-vertical > div {
      width: 3px;
      height: 100%;
      /* transform: translateX(-50%); */
    }
  `;let ss=mc;bn([v({type:Boolean,reflect:!0})],ss.prototype,"floating");bn([v({type:String,reflect:!0})],ss.prototype,"layout");bn([v({type:Boolean,attribute:"areas-resizeable",reflect:!0})],ss.prototype,"resizeableAreas");bn([v({type:Array,attribute:!1})],ss.prototype,"areasResizeExceptions");const uo=class extends F{render(){return S`
      <iconify-icon .icon=${this.icon} height="none"></iconify-icon>
    `}};uo.styles=j`
    :host {
      height: var(--bim-icon--fz, var(--bim-ui_size-sm));
      width: var(--bim-icon--fz, var(--bim-ui_size-sm));
    }

    iconify-icon {
      height: var(--bim-icon--fz, var(--bim-ui_size-sm));
      width: var(--bim-icon--fz, var(--bim-ui_size-sm));
      color: var(--bim-icon--c);
      transition: all 0.15s;
      display: flex;
    }
  `,uo.properties={icon:{type:String}};let Bf=uo;var jf=Object.defineProperty,yn=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&jf(t,i,n),n};const bc=class extends F{constructor(){super(...arguments),this.vertical=!1,this.onValueChange=new Event("change")}get value(){const t={};for(const i of this.children){const s=i;"value"in s?t[s.name||s.label]=s.value:"checked"in s&&(t[s.name||s.label]=s.checked)}return t}set value(t){const i=[...this.children];for(const s in t){const n=i.find(a=>{const l=a;return l.name===s||l.label===s});if(!n)continue;const o=n,r=t[s];typeof r=="boolean"?o.checked=r:o.value=r}}render(){return S`
      <div class="parent">
        ${this.label||this.icon?S`<bim-label .icon=${this.icon}>${this.label}</bim-label>`:null}
        <div class="input">
          <slot></slot>
        </div>
      </div>
    `}};bc.styles=j`
    :host {
      flex: 1;
      display: block;
    }

    .parent {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1rem;
      row-gap: 0.375rem;
      user-select: none;
      flex: 1;
    }

    :host(:not([vertical])) .parent {
      justify-content: space-between;
    }

    :host([vertical]) .parent {
      flex-direction: column;
    }

    .input {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      min-height: 1.75rem;
      min-width: 3rem;
      gap: var(--bim-input--g, var(--bim-ui_size-4xs));
      padding: var(--bim-input--p, 0);
      background-color: var(--bim-input--bgc, transparent);
      border: var(--bim-input--olw, 2px) solid
        var(--bim-input--olc, transparent);
      border-radius: var(--bim-input--bdrs, var(--bim-ui_size-4xs));
      transition: all 0.15s;
    }

    :host(:not([vertical])) .input {
      flex: 1;
      justify-content: flex-end;
    }

    :host(:not([vertical])[label]) .input {
      max-width: fit-content;
    }
  `;let ns=bc;yn([v({type:String,reflect:!0})],ns.prototype,"name");yn([v({type:String,reflect:!0})],ns.prototype,"label");yn([v({type:String,reflect:!0})],ns.prototype,"icon");yn([v({type:Boolean,reflect:!0})],ns.prototype,"vertical");/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function We(e,t,i){return e?t(e):i==null?void 0:i(e)}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fo=e=>e??N;var Hf=Object.defineProperty,os=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&Hf(t,i,n),n},In;let ni=(In=class extends F{constructor(){super(...arguments),this.labelHidden=!1,this.iconHidden=!1,this.vertical=!1,this._imgTemplate=()=>S`<img src=${fo(this.img)} .alt=${this.textContent||""} />`,this._iconTemplate=()=>S`<bim-icon .icon=${this.icon}></bim-icon>`}get value(){return this.textContent?mn(this.textContent):this.textContent}render(){return S`
      <div class="parent" title=${this.textContent}>
        ${We(this.img,this._imgTemplate,()=>N)}
        ${We(!this.iconHidden&&this.icon,this._iconTemplate,()=>N)}
        <p><slot></slot></p>
      </div>
    `}},In.styles=j`
    :host {
      --bim-icon--c: var(--bim-label--ic);
      overflow: auto;
      color: var(--bim-label--c, var(--bim-ui_bg-contrast-60));
      font-size: var(--bim-label--fz, var(--bim-ui_size-xs));
      display: block;
      white-space: nowrap;
      transition: all 0.15s;
      user-select: none;
    }

    :host([icon]) {
      line-height: 1.1rem;
    }

    .parent {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      row-gap: 0.125rem;
      height: 100%;
    }

    :host([vertical]) .parent {
      flex-direction: column;
    }

    .parent p {
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    :host([label-hidden]) .parent p,
    :host(:empty) .parent p {
      display: none;
    }

    img {
      height: 100%;
      aspect-ratio: 1;
      border-radius: 100%;
      margin-right: 0.125rem;
    }

    :host(:not([vertical])) img {
      max-height: var(
        --bim-label_icon--sz,
        calc(var(--bim-label--fz, var(--bim-ui_size-xs)) * 1.8)
      );
    }

    :host([vertical]) img {
      max-height: var(
        --bim-label_icon--sz,
        calc(var(--bim-label--fz, var(--bim-ui_size-xs)) * 4)
      );
    }
  `,In);os([v({type:String,reflect:!0})],ni.prototype,"img");os([v({type:Boolean,attribute:"label-hidden",reflect:!0})],ni.prototype,"labelHidden");os([v({type:String,reflect:!0})],ni.prototype,"icon");os([v({type:Boolean,attribute:"icon-hidden",reflect:!0})],ni.prototype,"iconHidden");os([v({type:Boolean,reflect:!0})],ni.prototype,"vertical");var Nf=Object.defineProperty,Vf=Object.getOwnPropertyDescriptor,Mt=(e,t,i,s)=>{for(var n=s>1?void 0:s?Vf(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&Nf(t,i,n),n};const yc=class extends F{constructor(){super(...arguments),this._value=0,this.vertical=!1,this.slider=!1,this._input=Ke(),this.onValueChange=new Event("change")}set value(t){this.setValue(t.toString())}get value(){return this._value}onChange(t){t.stopPropagation();const{value:i}=this._input;i&&this.setValue(i.value)}setValue(t){const{value:i}=this._input;let s=t;if(s=s.replace(/[^0-9.-]/g,""),s=s.replace(/(\..*)\./g,"$1"),s.endsWith(".")||(s.lastIndexOf("-")>0&&(s=s[0]+s.substring(1).replace(/-/g,"")),s==="-"||s==="-0"))return;let n=Number(s);Number.isNaN(n)||(n=this.min!==void 0?Math.max(n,this.min):n,n=this.max!==void 0?Math.min(n,this.max):n,this.value!==n&&(this._value=n,i&&(i.value=this.value.toString()),this.requestUpdate(),this.dispatchEvent(this.onValueChange)))}onBlur(){const{value:t}=this._input;t&&Number.isNaN(Number(t.value))&&(t.value=this.value.toString())}onSliderMouseDown(t){document.body.style.cursor="w-resize";const{clientX:i}=t,s=this.value;let n=!1;const o=l=>{var c;n=!0;const{clientX:h}=l,d=this.step??1,u=((c=d.toString().split(".")[1])==null?void 0:c.length)||0,f=1/(this.sensitivity??1),g=(h-i)/f;if(Math.floor(Math.abs(g))!==Math.abs(g))return;const p=s+g*d;this.setValue(p.toFixed(u))},r=()=>{this.slider=!0,this.removeEventListener("blur",r)},a=()=>{document.removeEventListener("mousemove",o),document.body.style.cursor="default",n?n=!1:(this.addEventListener("blur",r),this.slider=!1,requestAnimationFrame(()=>this.focus())),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",a)}onFocus(t){t.stopPropagation();const i=s=>{s.key==="Escape"&&(this.blur(),window.removeEventListener("keydown",i))};window.addEventListener("keydown",i)}connectedCallback(){super.connectedCallback(),this.min&&this.min>this.value&&(this._value=this.min),this.max&&this.max<this.value&&(this._value=this.max)}focus(){const{value:t}=this._input;t&&t.focus()}render(){const t=S`
      ${this.pref||this.icon?S`<bim-label
            style="pointer-events: auto"
            @mousedown=${this.onSliderMouseDown}
            .icon=${this.icon}
            >${this.pref}</bim-label
          >`:null}
      <input
        ${It(this._input)}
        type="text"
        aria-label=${this.label||this.name||"Number Input"}
        size="1"
        @input=${a=>a.stopPropagation()}
        @change=${this.onChange}
        @blur=${this.onBlur}
        @focus=${this.onFocus}
        .value=${this.value.toString()}
      />
      ${this.suffix?S`<bim-label
            style="pointer-events: auto"
            @mousedown=${this.onSliderMouseDown}
            >${this.suffix}</bim-label
          >`:null}
    `,i=this.min??-1/0,s=this.max??1/0,n=100*(this.value-i)/(s-i),o=S`
      <style>
        .slider-indicator {
          width: ${`${n}%`};
        }
      </style>
      <div class="slider" @mousedown=${this.onSliderMouseDown}>
        <div class="slider-indicator"></div>
        ${this.pref||this.icon?S`<bim-label
              style="z-index: 1; margin-right: 0.125rem"
              .icon=${this.icon}
              >${`${this.pref}: `}</bim-label
            >`:null}
        <bim-label style="z-index: 1;">${this.value}</bim-label>
        ${this.suffix?S`<bim-label style="z-index: 1;">${this.suffix}</bim-label>`:null}
      </div>
    `,r=`${this.label||this.name||this.pref?`${this.label||this.name||this.pref}: `:""}${this.value}${this.suffix??""}`;return S`
      <bim-input
        title=${r}
        .label=${this.label}
        .icon=${this.icon}
        .vertical=${this.vertical}
      >
        ${this.slider?o:t}
      </bim-input>
    `}};yc.styles=j`
    :host {
      --bim-input--bgc: var(
        --bim-number-input--bgc,
        var(--bim-ui_bg-contrast-20)
      );
      --bim-input--olw: var(--bim-number-input--olw, 2px);
      --bim-input--olc: var(--bim-number-input--olc, transparent);
      --bim-input--bdrs: var(--bim-number-input--bdrs, var(--bim-ui_size-4xs));
      --bim-input--p: 0 0.375rem;
      flex: 1;
      display: block;
    }

    :host(:focus) {
      --bim-input--olw: var(--bim-number-input--olw, 2px);
      --bim-input--olc: var(
        --bim-number-input¡focus--c,
        var(--bim-ui_accent-base)
      );
    }

    :host(:not([slider])) bim-label {
      --bim-label--c: var(
        --bim-number-input_affixes--c,
        var(--bim-ui_bg-contrast-60)
      );
      --bim-label--fz: var(
        --bim-number-input_affixes--fz,
        var(--bim-ui_size-xs)
      );
    }

    p {
      margin: 0;
      padding: 0;
    }

    input {
      background-color: transparent;
      outline: none;
      border: none;
      padding: 0;
      flex-grow: 1;
      text-align: right;
      font-family: inherit;
      font-feature-settings: inherit;
      font-variation-settings: inherit;
      font-size: var(--bim-number-input--fz, var(--bim-ui_size-xs));
      color: var(--bim-number-input--c, var(--bim-ui_bg-contrast-100));
    }

    :host([suffix]:not([pref])) input {
      text-align: left;
    }

    :host([slider]) {
      --bim-input--p: 0;
    }

    :host([slider]) .slider {
      --bim-label--c: var(--bim-ui_bg-contrast-100);
    }

    .slider {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0 0.5rem;
    }

    .slider-indicator {
      height: 100%;
      background-color: var(--bim-ui_main-base);
      position: absolute;
      top: 0;
      left: 0;
      border-radius: var(--bim-input--bdrs, var(--bim-ui_size-4xs));
    }

    bim-input {
      display: flex;
    }

    bim-label {
      pointer-events: none;
    }
  `;let xt=yc;Mt([v({type:String,reflect:!0})],xt.prototype,"name",2);Mt([v({type:String,reflect:!0})],xt.prototype,"icon",2);Mt([v({type:String,reflect:!0})],xt.prototype,"label",2);Mt([v({type:String,reflect:!0})],xt.prototype,"pref",2);Mt([v({type:Number,reflect:!0})],xt.prototype,"min",2);Mt([v({type:Number,reflect:!0})],xt.prototype,"value",1);Mt([v({type:Number,reflect:!0})],xt.prototype,"step",2);Mt([v({type:Number,reflect:!0})],xt.prototype,"sensitivity",2);Mt([v({type:Number,reflect:!0})],xt.prototype,"max",2);Mt([v({type:String,reflect:!0})],xt.prototype,"suffix",2);Mt([v({type:Boolean,reflect:!0})],xt.prototype,"vertical",2);Mt([v({type:Boolean,reflect:!0})],xt.prototype,"slider",2);var Wf=Object.defineProperty,Uf=Object.getOwnPropertyDescriptor,rs=(e,t,i,s)=>{for(var n=s>1?void 0:s?Uf(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&Wf(t,i,n),n};const vc=class extends F{constructor(){super(...arguments),this.onValueChange=new Event("change"),this._hidden=!1,this.headerHidden=!1,this.valueTransform={},this.activationButton=document.createElement("bim-button")}set hidden(t){this._hidden=t,this.activationButton.active=!t,this.dispatchEvent(new Event("hiddenchange"))}get hidden(){return this._hidden}get value(){return Js(this,this.valueTransform)}set value(t){const i=[...this.children];for(const s in t){const n=i.find(r=>{const a=r;return a.name===s||a.label===s});if(!n)continue;const o=n;o.value=t[s]}}animatePanles(){const t=[{maxHeight:"100vh",maxWidth:"100vw",opacity:1},{maxHeight:"100vh",maxWidth:"100vw",opacity:0},{maxHeight:0,maxWidth:0,opacity:0}];this.animate(t,{duration:300,easing:"cubic-bezier(0.65, 0.05, 0.36, 1)",direction:this.hidden?"normal":"reverse",fill:"forwards"})}connectedCallback(){super.connectedCallback(),this.activationButton.active=!this.hidden,this.activationButton.onclick=()=>{this.hidden=!this.hidden,this.animatePanles()}}disconnectedCallback(){super.disconnectedCallback(),this.activationButton.remove()}collapseSections(){const t=this.querySelectorAll("bim-panel-section");for(const i of t)i.collapsed=!0}expandSections(){const t=this.querySelectorAll("bim-panel-section");for(const i of t)i.collapsed=!1}render(){return this.activationButton.icon=this.icon,this.activationButton.label=this.label||this.name,this.activationButton.tooltipTitle=this.label||this.name,S`
      <div class="parent">
        ${this.label||this.name||this.icon?S`<bim-label .icon=${this.icon}>${this.label}</bim-label>`:null}
        <div class="sections">
          <slot></slot>
        </div>
      </div>
    `}};vc.styles=[pe.scrollbar,j`
      :host {
        display: flex;
        border-radius: var(--bim-ui_size-base);
        background-color: var(--bim-ui_bg-base);
        overflow: auto;
      }

      :host([hidden]) {
        max-height: 0;
        max-width: 0;
        opacity: 0;
      }

      .parent {
        display: flex;
        flex: 1;
        flex-direction: column;
        pointer-events: auto;
        overflow: auto;
      }

      .parent bim-label {
        --bim-label--c: var(--bim-panel--c, var(--bim-ui_bg-contrast-80));
        --bim-label--fz: var(--bim-panel--fz, var(--bim-ui_size-sm));
        font-weight: 600;
        padding: 1rem;
        flex-shrink: 0;
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([header-hidden]) .parent bim-label {
        display: none;
      }

      .sections {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
        flex: 1;
      }

      ::slotted(bim-panel-section:not(:last-child)) {
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }
    `];let Re=vc;rs([v({type:String,reflect:!0})],Re.prototype,"icon",2);rs([v({type:String,reflect:!0})],Re.prototype,"name",2);rs([v({type:String,reflect:!0})],Re.prototype,"label",2);rs([v({type:Boolean,reflect:!0})],Re.prototype,"hidden",1);rs([v({type:Boolean,attribute:"header-hidden",reflect:!0})],Re.prototype,"headerHidden",2);var qf=Object.defineProperty,as=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&qf(t,i,n),n};const xc=class extends F{constructor(){super(...arguments),this.onValueChange=new Event("change"),this.valueTransform={},this.componentHeight=-1}get value(){const t=this.parentElement;let i;return t instanceof Re&&(i=t.valueTransform),Object.values(this.valueTransform).length!==0&&(i=this.valueTransform),Js(this,i)}set value(t){const i=[...this.children];for(const s in t){const n=i.find(r=>{const a=r;return a.name===s||a.label===s});if(!n)continue;const o=n;o.value=t[s]}}setFlexAfterTransition(){var t;const i=(t=this.shadowRoot)==null?void 0:t.querySelector(".components");i&&setTimeout(()=>{this.collapsed?i.style.removeProperty("flex"):i.style.setProperty("flex","1")},150)}animateHeader(){var t;const i=(t=this.shadowRoot)==null?void 0:t.querySelector(".components");this.componentHeight<0&&(this.collapsed?this.componentHeight=i.clientHeight:(i.style.setProperty("transition","none"),i.style.setProperty("height","auto"),i.style.setProperty("padding","0.125rem 1rem 1rem"),this.componentHeight=i.clientHeight,requestAnimationFrame(()=>{i.style.setProperty("height","0px"),i.style.setProperty("padding","0 1rem 0"),i.style.setProperty("transition","height 0.25s cubic-bezier(0.65, 0.05, 0.36, 1), padding 0.25s cubic-bezier(0.65, 0.05, 0.36, 1)")}))),this.collapsed?(i.style.setProperty("height",`${this.componentHeight}px`),requestAnimationFrame(()=>{i.style.setProperty("height","0px"),i.style.setProperty("padding","0 1rem 0")})):(i.style.setProperty("height","0px"),i.style.setProperty("padding","0 1rem 0"),requestAnimationFrame(()=>{i.style.setProperty("height",`${this.componentHeight}px`),i.style.setProperty("padding","0.125rem 1rem 1rem")})),this.setFlexAfterTransition()}onHeaderClick(){this.fixed||(this.collapsed=!this.collapsed,this.animateHeader())}handelSlotChange(t){t.target.assignedElements({flatten:!0}).forEach((i,s)=>{const n=s*.05;i.style.setProperty("transition-delay",`${n}s`)})}handlePointerEnter(){const t=this.renderRoot.querySelector(".expand-icon");this.collapsed?t==null||t.style.setProperty("animation","collapseAnim 0.5s"):t==null||t.style.setProperty("animation","expandAnim 0.5s")}handlePointerLeave(){const t=this.renderRoot.querySelector(".expand-icon");t==null||t.style.setProperty("animation","none")}render(){const t=this.label||this.icon||this.name||this.fixed,i=S`<svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.125rem"
      viewBox="0 0 24 24"
      width="1.125rem"
      class="expand-icon"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
    </svg>`,s=S`
      <div
        class="header"
        title=${this.label??""}
        @pointerenter=${this.handlePointerEnter}
        @pointerleave=${this.handlePointerLeave}
        @click=${this.onHeaderClick}
      >
        ${this.label||this.icon||this.name?S`<bim-label .icon=${this.icon}>${this.label}</bim-label>`:null}
        ${this.fixed?null:i}
      </div>
    `;return S`
      <div class="parent">
        ${t?s:null}
        <div class="components" style="flex: 1;">
          <div>
            <slot @slotchange=${this.handelSlotChange}></slot>
          </div>
        </div>
      </div>
    `}};xc.styles=[pe.scrollbar,j`
      :host {
        display: block;
        pointer-events: auto;
      }

      :host .parent {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      :host(:not([fixed])) .header:hover {
        --bim-label--c: var(--bim-ui_accent-base);
        color: var(--bim-ui_accent-base);
        cursor: pointer;
      }

      :host(:not([fixed])) .header:hover .expand-icon {
        fill: var(--bim-ui_accent-base);
      }

      .header {
        --bim-label--fz: var(--bim-ui_size-sm);
        --bim-label--c: var(
          --bim-panel-section_hc,
          var(--bim-ui_bg-contrast-80)
        );
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        height: 1.5rem;
        padding: 0.75rem 1rem;
      }

      .expand-icon {
        fill: var(--bim-ui_bg-contrast-80);
        transition: transform 0.2s;
      }

      :host([collapsed]) .expand-icon {
        transform: rotateZ(-180deg);
      }

      .title {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
      }

      .title p {
        font-size: var(--bim-ui_size-sm);
      }

      .components {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        row-gap: 0.75rem;
        padding: 0 1rem 1rem;
        box-sizing: border-box;
        transition:
          height 0.25s cubic-bezier(0.65, 0.05, 0.36, 1),
          padding 0.25s cubic-bezier(0.65, 0.05, 0.36, 1);
      }

      .components > div {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        flex: 1;
        overflow: auto;
      }

      :host(:not([icon]):not([label])) .components {
        padding: 1rem;
      }

      :host(:not([fixed])[collapsed]) .components {
        padding: 0 1rem 0;
        height: 0px;
      }

      bim-label {
        pointer-events: none;
      }

      ::slotted(*) {
        transition:
          transform 0.25s cubic-bezier(0.65, 0.05, 0.36, 1),
          opacity 0.25s cubic-bezier(0.65, 0.05, 0.36, 1);
      }

      :host(:not([fixed])[collapsed]) ::slotted(*) {
        transform: translateX(-20%);
        opacity: 0;
      }

      @keyframes expandAnim {
        0%,
        100% {
          transform: translateY(0%);
        }
        25% {
          transform: translateY(-30%);
        }
        50% {
          transform: translateY(10%);
        }
        75% {
          transform: translateY(-30%);
        }
      }

      @keyframes collapseAnim {
        0%,
        100% {
          transform: translateY(0%) rotateZ(-180deg);
        }
        25% {
          transform: translateY(30%) rotateZ(-180deg);
        }
        50% {
          transform: translateY(-10%) rotateZ(-180deg);
        }
        75% {
          transform: translateY(30%) rotateZ(-180deg);
        }
      }
    `];let oi=xc;as([v({type:String,reflect:!0})],oi.prototype,"icon");as([v({type:String,reflect:!0})],oi.prototype,"label");as([v({type:String,reflect:!0})],oi.prototype,"name");as([v({type:Boolean,reflect:!0})],oi.prototype,"fixed");as([v({type:Boolean,reflect:!0})],oi.prototype,"collapsed");var Yf=Object.defineProperty,ls=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&Yf(t,i,n),n};const _c=class extends F{constructor(){super(...arguments),this.vertical=!1,this.onValueChange=new Event("change"),this._canEmitEvents=!1,this._value=document.createElement("bim-option"),this.onOptionClick=t=>{this._value=t.target,this.setAnimatedBackgound(),this.dispatchEvent(this.onValueChange);for(const i of this.children)i instanceof st&&(i.checked=i===t.target)}}get _options(){return[...this.querySelectorAll("bim-option")]}set value(t){const i=this.findOption(t);if(i){for(const s of this._options)s.checked=s===i;this._value=i,this.setAnimatedBackgound(),this._canEmitEvents&&this.dispatchEvent(this.onValueChange)}}get value(){return this._value.value}onSlotChange(t){const i=t.target.assignedElements();for(const s of i)s instanceof st&&(s.noMark=!0,s.removeEventListener("click",this.onOptionClick),s.addEventListener("click",this.onOptionClick))}findOption(t){return this._options.find(i=>i instanceof st?i.label===t||i.value===t:!1)}doubleRequestAnimationFrames(t){requestAnimationFrame(()=>requestAnimationFrame(t))}setAnimatedBackgound(t=!1){const i=this.renderRoot.querySelector(".animated-background"),s=this._value;requestAnimationFrame(()=>{var n,o,r,a;const l=(a=(r=(o=(n=s==null?void 0:s.parentElement)==null?void 0:n.shadowRoot)==null?void 0:o.querySelector("bim-input"))==null?void 0:r.shadowRoot)==null?void 0:a.querySelector(".input"),c={width:s==null?void 0:s.clientWidth,height:s==null?void 0:s.clientHeight,top:((s==null?void 0:s.offsetTop)??0)-((l==null?void 0:l.offsetTop)??0),left:((s==null?void 0:s.offsetLeft)??0)-((l==null?void 0:l.offsetLeft)??0)};i==null||i.style.setProperty("width",`${c.width}px`),i==null||i.style.setProperty("height",`${c.height}px`),i==null||i.style.setProperty("top",`${c.top}px`),i==null||i.style.setProperty("left",`${c.left}px`)}),t&&this.doubleRequestAnimationFrames(()=>{const n="ease";i==null||i.style.setProperty("transition",`width ${.3}s ${n}, height ${.3}s ${n}, top ${.3}s ${n}, left ${.3}s ${n}`)})}firstUpdated(){const t=[...this.children].find(i=>i instanceof st&&i.checked);t&&(this._value=t),window.addEventListener("load",()=>{this.setAnimatedBackgound(!0)}),new ResizeObserver(()=>{this.setAnimatedBackgound()}).observe(this)}render(){return S`
      <bim-input
        .vertical=${this.vertical}
        .label=${this.label}
        .icon=${this.icon}
      >
        <div class="animated-background"></div>
        <slot @slotchange=${this.onSlotChange}></slot>
      </bim-input>
    `}};_c.styles=j`
    :host {
      --bim-input--bgc: var(--bim-ui_bg-contrast-20);
      --bim-input--g: 0;
      --bim-option--jc: center;
      flex: 1;
      display: block;
    }

    ::slotted(bim-option) {
      position: relative;
      border-radius: 0;
      overflow: hidden;
      min-width: min-content;
      min-height: min-content;
      transition: background-color 0.2s;
    }

    .animated-background {
      position: absolute;
      background: var(--bim-ui_main-base);
      width: 0;
      height: 0;
      top: 0;
      left: 0;
    }

    ::slotted(bim-option[checked]) {
      --bim-label--c: var(--bim-ui_main-contrast);
    }

    ::slotted(bim-option:not([checked]):hover) {
      background-color: #0003;
    }
  `;let ri=_c;ls([v({type:String,reflect:!0})],ri.prototype,"name");ls([v({type:String,reflect:!0})],ri.prototype,"icon");ls([v({type:String,reflect:!0})],ri.prototype,"label");ls([v({type:Boolean,reflect:!0})],ri.prototype,"vertical");ls([Jt()],ri.prototype,"_value");function Xf(e,t,i){if(t.length===0||e.length===0)return e;const s=qo.flattenData(e);return Uo(s,t,i)}function Uo(e,t,i){if(t.length===0)return e;const[s,...n]=t,o=i==null?void 0:i[s];return o?Gf(e,s,o,n,i):Kf(e,s,n,i)}function Gf(e,t,i,s,n){const o=new Map;for(const r of e){const a=r.data[t];if(a===void 0)continue;const l=i(a,r.data),c=l.join("|");o.has(c)||o.set(c,{path:l,rows:[]}),o.get(c).rows.push(r)}return Zf(o,t,s,n)}function Zf(e,t,i,s){const n=new Jf;for(const{path:o,rows:r}of e.values())n.addPath(o,r,t);return n.buildResult(i,s)}function Kf(e,t,i,s){const n=new Map;for(const r of e){const a=r.data[t];n.has(a)||n.set(a,[]),n.get(a).push(r)}const o=[];for(const[r,a]of n){const l=i.length>0?Uo(a,i,s):a;o.push({data:{[t]:r},children:l,_isComputedGroup:!0})}return o}class Jf{constructor(){this.tree=new Map}addPath(t,i,s){let n=this.tree;for(let o=0;o<t.length;o++){const r=t[o];n.has(r)||n.set(r,{value:r,column:s,children:new Map,rows:[]});const a=n.get(r);o===t.length-1&&a.rows.push(...i),n=a.children}}buildResult(t,i){return this.convertMapToResult(this.tree,t,i)}convertMapToResult(t,i,s){const n=[];for(const o of t.values()){const r=[];if(o.children.size>0&&r.push(...this.convertMapToResult(o.children,i,s)),o.rows.length>0){const a=i.length>0?Uo(o.rows,i,s):o.rows;r.push(...a)}n.push({data:{[o.column]:o.value},children:r,_isComputedGroup:!0})}return n}}const Qf=()=>S`
    <style>
      div {
        display: flex;
        gap: 0.375rem;
        border-radius: 0.25rem;
        min-height: 1.25rem;
      }

      [data-type="row"] {
        background-color: var(--bim-ui_bg-contrast-10);
        animation: row-loading 1s linear infinite alternate;
        padding: 0.5rem;
      }

      [data-type="cell"] {
        background-color: var(--bim-ui_bg-contrast-20);
        flex: 0.25;
      }

      @keyframes row-loading {
        0% {
          background-color: var(--bim-ui_bg-contrast-10);
        }
        100% {
          background-color: var(--bim-ui_bg-contrast-20);
        }
      }
    </style>
    <div style="display: flex; flex-direction: column;">
      <div data-type="row" style="gap: 2rem">
        <div data-type="cell" style="flex: 1"></div>
        <div data-type="cell" style="flex: 2"></div>
        <div data-type="cell" style="flex: 1"></div>
        <div data-type="cell" style="flex: 0.5"></div>
      </div>
      <div style="display: flex;">
        <div data-type="row" style="flex: 1">
          <div data-type="cell" style="flex: 0.5"></div>
        </div>
        <div data-type="row" style="flex: 2">
          <div data-type="cell" style="flex: 0.75"></div>
        </div>
        <div data-type="row" style="flex: 1">
          <div data-type="cell"></div>
        </div>
        <div data-type="row" style="flex: 0.5">
          <div data-type="cell" style="flex: 0.75"></div>
        </div>
      </div>
      <div style="display: flex;">
        <div data-type="row" style="flex: 1">
          <div data-type="cell" style="flex: 0.75"></div>
        </div>
        <div data-type="row" style="flex: 2">
          <div data-type="cell"></div>
        </div>
        <div data-type="row" style="flex: 1">
          <div data-type="cell" style="flex: 0.5"></div>
        </div>
        <div data-type="row" style="flex: 0.5">
          <div data-type="cell" style="flex: 0.5"></div>
        </div>
      </div>
      <div style="display: flex;">
        <div data-type="row" style="flex: 1">
          <div data-type="cell"></div>
        </div>
        <div data-type="row" style="flex: 2">
          <div data-type="cell" style="flex: 0.5"></div>
        </div>
        <div data-type="row" style="flex: 1">
          <div data-type="cell" style="flex: 0.75"></div>
        </div>
        <div data-type="row" style="flex: 0.5">
          <div data-type="cell" style="flex: 0.7s5"></div>
        </div>
      </div>
    </div>
  `,tp=()=>S`
    <style>
      .loader {
        grid-area: Processing;
        position: relative;
        padding: 0.125rem;
      }
      .loader:before {
        content: "";
        position: absolute;
      }
      .loader .loaderBar {
        position: absolute;
        top: 0;
        right: 100%;
        bottom: 0;
        left: 0;
        background: var(--bim-ui_main-base);
        /* width: 25%; */
        width: 0;
        animation: borealisBar 2s linear infinite;
      }

      @keyframes borealisBar {
        0% {
          left: 0%;
          right: 100%;
          width: 0%;
        }
        10% {
          left: 0%;
          right: 75%;
          width: 25%;
        }
        90% {
          right: 0%;
          left: 75%;
          width: 25%;
        }
        100% {
          left: 100%;
          right: 0%;
          width: 0%;
        }
      }
    </style>
    <div class="loader">
      <div class="loaderBar"></div>
    </div>
  `;var ep=Object.defineProperty,ip=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&ep(t,i,n),n};const wc=class extends F{constructor(){super(...arguments),this.column="",this.columnIndex=0,this.table=null,this.group=null,this.row=null,this.rowData={}}get data(){return this.column?this.rowData[this.column]:null}get dataTransform(){var t,i,s,n;const o=(i=(t=this.row)==null?void 0:t.dataTransform)==null?void 0:i[this.column],r=(s=this.table)==null?void 0:s.dataTransform[this.column],a=(n=this.table)==null?void 0:n.defaultContentTemplate;return o||r||a}get templateValue(){const{data:t,rowData:i,group:s}=this,n=this.dataTransform;if(n&&t!=null&&s){const o=n(t,i,s);return typeof o=="string"||typeof o=="boolean"||typeof o=="number"?S`<bim-label>${o}</bim-label>`:o}return t!=null?S`<bim-label>${t}</bim-label>`:N}connectedCallback(){var t,i;super.connectedCallback(),(t=this.group)!=null&&t.data._isComputedGroup&&(i=this.table)!=null&&i.groupedBy.includes(this.column)?(this.style.gridColumn="1",this.style.gridRow="1"):this.style.gridArea=this.column.toString()}render(){return S`${this.templateValue}`}};wc.styles=j`
    :host {
      padding: 0.375rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host([data-column-index="0"]) {
      justify-content: normal;
    }

    :host([data-column-index="0"]:not([data-cell-header]))
      ::slotted(bim-label) {
      text-align: left;
    }

    ::slotted(*) {
      --bim-input--bgc: transparent;
      --bim-input--olc: var(--bim-ui_bg-contrast-20);
      --bim-input--olw: 1px;
    }

    ::slotted(bim-input) {
      --bim-input--olw: 0;
    }
  `;let kc=wc;ip([v({type:String,reflect:!0})],kc.prototype,"column");const Sc=class extends F{constructor(){super(...arguments),this._groups=[],this.group=this.closest("bim-table-group"),this._data=[],this.table=this.closest("bim-table")}get data(){var t;return((t=this.group)==null?void 0:t.data.children)??this._data}set data(t){this._data=t}clean(){for(const t of this._groups)t.remove();this._groups=[]}render(){return this.clean(),S`
      <slot></slot>
      ${this.data.map(t=>{const i=document.createElement("bim-table-group");return this._groups.push(i),i.table=this.table,i.data=t,i})}
    `}};Sc.styles=j`
    :host {
      --bim-button--bgc: transparent;
      position: relative;
      display: block;
      overflow: hidden;
      grid-area: Children;
    }

    :host([hidden]) {
      height: 0;
      opacity: 0;
    }

    ::slotted(.branch.branch-vertical) {
      top: 0;
      bottom: 1.125rem;
    }
  `;let sp=Sc;var np=Object.defineProperty,op=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&np(t,i,n),n};const Mc=class extends F{constructor(){super(...arguments),this.childrenHidden=!0,this.table=null,this.data={data:{}}}get rowElement(){const t=this.shadowRoot;return t?t.querySelector("bim-table-row"):null}get childrenElement(){const t=this.shadowRoot;return t?t.querySelector("bim-table-children"):null}get _isChildrenEmpty(){return!(this.data.children&&this.data.children.length!==0)}connectedCallback(){super.connectedCallback(),this.table&&this.table.expanded?this.childrenHidden=!1:this.childrenHidden=!0}disconnectedCallback(){super.disconnectedCallback(),this.data={data:{}}}toggleChildren(t){this.childrenHidden=typeof t>"u"?!this.childrenHidden:!t,this.animateTableChildren(!0)}animateTableChildren(t=!0){if(!t){requestAnimationFrame(()=>{var r;const a=this.renderRoot.querySelector(".caret"),l=this.renderRoot.querySelector(".branch-vertical"),c=(r=this.renderRoot.querySelector("bim-table-children"))==null?void 0:r.querySelector(".branch-vertical");a.style.setProperty("transform",`translateY(-50%) rotate(${this.childrenHidden?"0":"90"}deg)`),l.style.setProperty("transform",`scaleY(${this.childrenHidden?"0":"1"})`),c==null||c.style.setProperty("transform",`scaleY(${this.childrenHidden?"0":"1"})`)});return}const i=500,s=0,n=200,o=350;requestAnimationFrame(()=>{var r;const a=this.renderRoot.querySelector("bim-table-children"),l=this.renderRoot.querySelector(".caret"),c=this.renderRoot.querySelector(".branch-vertical"),h=(r=this.renderRoot.querySelector("bim-table-children"))==null?void 0:r.querySelector(".branch-vertical"),d=()=>{var m;const b=(m=a==null?void 0:a.renderRoot)==null?void 0:m.querySelectorAll("bim-table-group");b==null||b.forEach((y,_)=>{y.style.setProperty("opacity","0"),y.style.setProperty("left","-30px");const x=[{opacity:"0",left:"-30px"},{opacity:"1",left:"0"}];y.animate(x,{duration:i/2,delay:50+_*s,easing:"cubic-bezier(0.65, 0.05, 0.36, 1)",fill:"forwards"})})},u=()=>{const m=[{transform:"translateY(-50%) rotate(90deg)"},{transform:"translateY(-50%) rotate(0deg)"}];l==null||l.animate(m,{duration:o,easing:"cubic-bezier(0.68, -0.55, 0.27, 1.55)",fill:"forwards",direction:this.childrenHidden?"normal":"reverse"})},f=()=>{const m=[{transform:"scaleY(1)"},{transform:"scaleY(0)"}];c==null||c.animate(m,{duration:n,easing:"cubic-bezier(0.4, 0, 0.2, 1)",delay:s,fill:"forwards",direction:this.childrenHidden?"normal":"reverse"})},g=()=>{var m;const b=(m=this.renderRoot.querySelector("bim-table-row"))==null?void 0:m.querySelector(".branch-horizontal");if(b){b.style.setProperty("transform-origin","center right");const y=[{transform:"scaleX(0)"},{transform:"scaleX(1)"}];b.animate(y,{duration:n,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"forwards",direction:this.childrenHidden?"normal":"reverse"})}},p=()=>{const m=[{transform:"scaleY(0)"},{transform:"scaleY(1)"}];h==null||h.animate(m,{duration:n*1.2,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"forwards",delay:(s+n)*.7})};d(),u(),f(),g(),p()})}firstUpdated(){this.renderRoot.querySelectorAll(".caret").forEach(t=>{var i,s,n;if(!this.childrenHidden){t.style.setProperty("transform","translateY(-50%) rotate(90deg)");const o=(i=t.parentElement)==null?void 0:i.querySelector(".branch-horizontal");o&&o.style.setProperty("transform","scaleX(0)");const r=(n=(s=t.parentElement)==null?void 0:s.parentElement)==null?void 0:n.querySelectorAll(".branch-vertical");r==null||r.forEach(a=>{a.style.setProperty("transform","scaleY(1)")})}})}render(){if(!this.table)return S`${N}`;const t=this.table.getGroupIndentation(this.data)??0;let i;if(!this.table.noIndentation){const r={left:`${t-1+(this.table.selectableRows?2.05:.5625)}rem`};i=S`<div style=${ho(r)} class="branch branch-horizontal"></div>`}const s=S`
      ${this.table.noIndentation?null:S`
            <style>
              .branch-vertical {
                left: ${t+(this.table.selectableRows?1.9375:.5625)}rem;
              }
            </style>
            <div class="branch branch-vertical"></div>
          `}
    `;let n;if(!this.table.noIndentation){const r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("height","9.9"),r.setAttribute("width","7.5"),r.setAttribute("viewBox","0 0 4.6666672 7.7"),this.table.noCarets){const l=document.createElementNS("http://www.w3.org/2000/svg","circle");l.setAttribute("cx","2.3333336"),l.setAttribute("cy","3.85"),l.setAttribute("r","2.5"),r.append(l)}else{const l=document.createElementNS("http://www.w3.org/2000/svg","path");l.setAttribute("d","m 1.7470835,6.9583848 2.5899999,-2.59 c 0.39,-0.39 0.39,-1.02 0,-1.41 L 1.7470835,0.36838483 c -0.63,-0.62000003 -1.71000005,-0.18 -1.71000005,0.70999997 v 5.17 c 0,0.9 1.08000005,1.34 1.71000005,0.71 z"),r.append(l)}const a={left:`${(this.table.selectableRows?1.5:.125)+t}rem`,cursor:`${this.table.noCarets?"unset":"pointer"}`};n=S`<div @click=${l=>{var c;(c=this.table)!=null&&c.noCarets||(l.stopPropagation(),this.toggleChildren())}} style=${ho(a)} class="caret">${r}</div>`}let o;return!this._isChildrenEmpty&&!this.childrenHidden&&(o=S`
        <bim-table-children ${It(r=>{if(!r)return;const a=r;a.table=this.table,a.group=this})}>${s}</bim-table-children>
      `),S`
      <div class="parent">
        <bim-table-row ${It(r=>{var a;if(!r)return;const l=r;l.table=this.table,l.group=this,(a=this.table)==null||a.dispatchEvent(new CustomEvent("rowcreated",{detail:{row:l}}))})}>
          ${We(!this._isChildrenEmpty,()=>s)}
          ${We(t!==0,()=>i)}
          ${We(!this.table.noIndentation&&!this._isChildrenEmpty,()=>n)}
        </bim-table-row>
        ${o}
      </div>
    `}};Mc.styles=j`
    :host {
      position: relative;
    }

    .parent {
      display: grid;
      grid-template-areas: "Data" "Children";
    }

    .branch {
      position: absolute;
      z-index: 1;
    }

    .branch-vertical {
      border-left: 1px dotted var(--bim-ui_bg-contrast-40);
      transform-origin: top center;
      transform: scaleY(0);
    }

    .branch-horizontal {
      top: 50%;
      width: 1rem;
      border-bottom: 1px dotted var(--bim-ui_bg-contrast-40);
    }

    .branch-horizontal {
      transform-origin: center left;
    }

    .caret {
      position: absolute;
      z-index: 2;
      transform: translateY(-50%) rotate(0deg);
      top: 50%;
      display: flex;
      width: 0.95rem;
      height: 0.95rem;
      justify-content: center;
      align-items: center;
    }

    .caret svg {
      fill: var(--bim-ui_bg-contrast-60);
    }
  `;let Cc=Mc;op([v({type:Boolean,attribute:"children-hidden",reflect:!0})],Cc.prototype,"childrenHidden");var rp=Object.defineProperty,vn=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&rp(t,i,n),n};const Ac=class extends F{constructor(){super(...arguments),this.selected=!1,this.group=null,this._data={},this.isHeader=!1,this.table=null,this.onTableColumnsChange=()=>{this.table&&this.requestUpdate()},this._intersecting=!1,this._timeOutDelay=250,this._observer=new IntersectionObserver(t=>{window.clearTimeout(this._intersectTimeout),this._intersectTimeout=void 0,t[0].isIntersecting?this._intersectTimeout=window.setTimeout(()=>{this._intersecting=!0},this._timeOutDelay):this._intersecting=!1},{rootMargin:"36px"}),this._onDataSelected=()=>{var t;this.toggleAttribute("selected",(t=this.table)==null?void 0:t.selection.has(this.data))},this._onDataDeselected=()=>{var t;(t=this.table)!=null&&t.selection.has(this.data)||this.removeAttribute("selected")},this._onDataSelectionCleared=()=>{this.removeAttribute("selected")},this.dataTransform=null,this._interval=null,this.clearDataTransform=()=>{this.dataTransform=null,this._interval!==null&&(clearInterval(this._interval),this._interval=null)}}get columns(){var t;return((t=this.table)==null?void 0:t.columns)??[]}get hiddenColumns(){var t;return((t=this.table)==null?void 0:t.hiddenColumns)??[]}get groupData(){var t;return(t=this.group)==null?void 0:t.data}get data(){var t;return((t=this.group)==null?void 0:t.data.data)??this._data}set data(t){this._data=t}get _columnNames(){return this.columns.filter(t=>!this.hiddenColumns.includes(t.name)).map(t=>t.name)}get _columnWidths(){return this.columns.filter(t=>!this.hiddenColumns.includes(t.name)).map(t=>t.width)}get _isSelected(){var t;return(t=this.table)==null?void 0:t.selection.has(this.data)}onSelectionChange(t){if(!this.table)return;const i=t.target;if(this.selected=i.value,i.value){let s=[this.data];this.isHeader&&(s=qo.flattenData(this.table.data).map(n=>n.data)),this.table.selection.add(...s),this.isHeader&&this.table.dispatchEvent(new CustomEvent("rowselected",{detail:{data:this.data}}))}else this.isHeader?this.table.selection.clear():(this.table.selection.delete(this.data),this.table.dispatchEvent(new CustomEvent("rowdeselected",{detail:{data:this.data}})))}firstUpdated(t){super.firstUpdated(t),this._observer.observe(this)}connectedCallback(){super.connectedCallback(),this.table&&(this.table.addEventListener("dataselected",this._onDataSelected),this.table.addEventListener("datadeselected",this._onDataDeselected),this.table.addEventListener("dataselectioncleared",this._onDataSelectionCleared),this.toggleAttribute("selected",this._isSelected),this.table.addEventListener("columnschange",this.onTableColumnsChange))}disconnectedCallback(){var t,i,s;super.disconnectedCallback(),this._observer.unobserve(this),(t=this.table)==null||t.removeEventListener("dataselected",this._onDataSelected),(i=this.table)==null||i.removeEventListener("datadeselected",this._onDataDeselected),(s=this.table)==null||s.removeEventListener("dataselectioncleared",this._onDataSelectionCleared),this.data={},this.table=null}applyAdaptativeDataTransform(t){this.addEventListener("pointerenter",()=>{this.dataTransform=t,this._interval=window.setInterval(()=>{this.matches(":hover")||this.clearDataTransform()},50)})}render(){var t,i,s;if(!(this.table&&this._intersecting))return S`${N}`;this.style.gridTemplateAreas=`"${this.table.selectableRows?"Selection":""} ${this._columnNames.join(" ")}"`,this.style.gridTemplateColumns=`${this.table.selectableRows?"1.6rem":""} ${this._columnWidths.join(" ")}`;const n=this.table.getRowIndentation(this.data)??0,o=[];let r=this.data;if((t=this.groupData)!=null&&t._isComputedGroup){const a=this.table.dataKeys.filter(l=>{var c;return!((c=this.table)!=null&&c.hiddenColumns.includes(l))});for(const l of a)this._columnNames.indexOf(l)!==0&&(r[l]="")}for(const a in r){if(!((i=this.groupData)!=null&&i._isComputedGroup)&&this.hiddenColumns.includes(a))continue;const l=document.createElement("bim-table-cell");l.group=this.group,l.table=this.table,l.row=this,l.column=a;const c=(s=this.group)!=null&&s.data._isComputedGroup&&this.table.groupedBy.includes(a)?0:this._columnNames.indexOf(a);c===0&&(l.style.marginLeft=`${this.table.noIndentation?0:n+.75}rem`),l.setAttribute("data-column-index",String(c)),l.toggleAttribute("data-no-indentation",c===0&&this.table.noIndentation),l.toggleAttribute("data-cell-header",this.isHeader),l.rowData=this.data,this.table.dispatchEvent(new CustomEvent("cellcreated",{detail:{cell:l}})),o.push(l)}return this._timeOutDelay=0,S`
      ${this.table.selectableRows?S`<bim-checkbox
            @change=${this.onSelectionChange}
            .checked=${this._isSelected??!1}
            style="align-self: center; justify-self: center"
          ></bim-checkbox>`:null}
      ${o}
      <slot></slot>
    `}};Ac.styles=j`
    :host {
      position: relative;
      grid-area: Data;
      display: grid;
      min-height: 2.25rem;
      transition: all 0.15s;
    }

    ::slotted(.branch.branch-vertical) {
      top: 50%;
      bottom: 0;
    }

    :host([selected]) {
      background-color: color-mix(
        in lab,
        var(--bim-ui_bg-contrast-20) 30%,
        var(--bim-ui_accent-base) 10%
      );
    }
  `;let cs=Ac;vn([v({type:Boolean,reflect:!0})],cs.prototype,"selected");vn([v({type:Boolean,attribute:"is-header",reflect:!0})],cs.prototype,"isHeader");vn([Jt()],cs.prototype,"_intersecting");vn([Jt()],cs.prototype,"dataTransform");var ap=Object.defineProperty,lp=Object.getOwnPropertyDescriptor,ft=(e,t,i,s)=>{for(var n=s>1?void 0:s?lp(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&ap(t,i,n),n},ps;const ut=(ps=class extends F{constructor(){super(),this._value=[],this.headersHidden=!1,this.minColWidth="4rem",this._columns=[],this._textDelimiters={comma:",",tab:"	"},this._queryString=null,this._data=[],this.expanded=!1,this.preserveStructureOnFilter=!1,this.indentationInText=!1,this.dataTransform={},this.groupingTransform={},this.selectableRows=!1,this.selection=new mf,this.noIndentation=!1,this.noCarets=!1,this.loading=!1,this._groupedBy=[],this._errorLoading=!1,this._defaultVisibility=!0,this._visibilityExceptions=[],this.defaultContentTemplate=e=>S`<bim-label style="white-space: normal; user-select: text;"
      >${e}</bim-label
    >`,this._stringFilterFunction=(e,t)=>Object.values(t.data).some(i=>String(i).toLowerCase().includes(e.toLowerCase())),this._queryFilterFunction=(e,t)=>{let i=!1;const s=co(e)??[];for(const n of s){if("queries"in n){i=!1;break}const{condition:o,value:r}=n;let{key:a}=n;if(a.startsWith("[")&&a.endsWith("]")){const l=a.replace("[","").replace("]","");a=l,i=Object.keys(t.data).filter(c=>c.includes(l)).map(c=>Gr(t.data[c],o,r)).some(c=>c)}else i=Gr(t.data[a],o,r);if(!i)break}return i},this.selection.onItemAdded.add(e=>this.emitDataSelected({data:e})),this.selection.onItemDeleted.add(e=>this.emitDataDeselected({data:e})),this.selection.onCleared.add(()=>this.emitDataCleared())}static flattenData(e){const t=[];for(const i of e)t.push({data:i.data}),i.children&&i.children.length>0&&t.push(...ps.flattenData(i.children));return t}set columns(e){const t=[];for(const i of e){const s=typeof i=="string"?{name:i,width:`minmax(${this.minColWidth}, 1fr)`}:i;t.push(s)}this._columns=t,this.computeMissingColumns(this.data),this.dispatchEvent(new Event("columnschange"))}get columns(){return this._columns}get _headerRowData(){const e={};for(const t of this.columns){const{name:i}=t;e[i]=String(i)}return e}get value(){return this._value}set queryString(e){this.toggleAttribute("data-processing",!0),this._queryString=e&&e.trim()!==""?e.trim():null,this.updateValue(),this.toggleAttribute("data-processing",!1)}get queryString(){return this._queryString}set data(e){this._data=e,this.updateValue(),this.computeMissingColumns(e)&&(this.columns=this._columns)}get data(){return this._data}get dataAsync(){return new Promise(e=>{setTimeout(()=>{e(this.data)})})}set groupedBy(e){this._groupedBy=e,this.updateValue()}get groupedBy(){return this._groupedBy}set defaultVisibility(e){this._defaultVisibility=e}get defaultVisibility(){return this._defaultVisibility}set visibilityExceptions(e){this._visibilityExceptions=e}get visibilityExceptions(){return this._visibilityExceptions}set hiddenColumns(e){this.defaultVisibility=!0,this.visibilityExceptions=e}get hiddenColumns(){const e=this.dataKeys,t=[];for(const i of e){const s=this._visibilityExceptions.includes(i);(this._defaultVisibility?s:!s)&&t.push(i)}return t}set visibleColumns(e){this.defaultVisibility=!1,this.visibilityExceptions=e}get visibleColumns(){const e=this.dataKeys,t=[];for(const i of e){const s=this._visibilityExceptions.includes(i);(this._defaultVisibility?!s:s)&&t.push(i)}return t}emitDataSelected(e){this.dispatchEvent(new CustomEvent("dataselected",{detail:e}))}emitDataDeselected(e){this.dispatchEvent(new CustomEvent("datadeselected",{detail:e}))}emitDataCleared(){this.dispatchEvent(new Event("dataselectioncleared"))}filterData(e=this.data){let t=[];if(this.queryString){let i=this.filterFunction;i||(i=co(this.queryString)?this._queryFilterFunction:this._stringFilterFunction),t=this.filter(this.queryString,i,e),this.preserveStructureOnFilter&&(this._expandedBeforeFilter===void 0&&(this._expandedBeforeFilter=this.expanded),this.expanded=!0)}else this.preserveStructureOnFilter&&this._expandedBeforeFilter!==void 0&&(this.expanded=this._expandedBeforeFilter,this._expandedBeforeFilter=void 0),t=e;return t}computeMissingColumns(e){let t=!1;for(const i of e){const{children:s,data:n}=i;for(const o in n)this._columns.map(r=>typeof r=="string"?r:r.name).includes(o)||(this._columns.push({name:o,width:`minmax(${this.minColWidth}, 1fr)`}),t=!0);if(s){const o=this.computeMissingColumns(s);o&&!t&&(t=o)}}return t}generateText(e="comma",t=this.value,i="",s=!0){const n=this._textDelimiters[e];let o="";const r=this.columns.map(a=>a.name);if(s){this.indentationInText&&(o+=`Indentation${n}`);const a=`${r.join(n)}
`;o+=a}for(const[a,l]of t.entries()){const{data:c,children:h}=l,d=this.indentationInText?`${i}${a+1}${n}`:"",u=r.map(g=>c[g]??""),f=`${d}${u.join(n)}
`;o+=f,h&&(o+=this.generateText(e,l.children,`${i}${a+1}.`,!1))}return o}get csv(){return this.generateText("comma")}get tsv(){return this.generateText("tab")}get dataKeys(){const e=new Set,t=i=>{for(const s of i){for(const n in s.data)e.add(n);s.children&&t(s.children)}};return t(this.data),Array.from(e)}applyDataTransform(e){const t={};if(!e)return t;const{data:i}=e.data;for(const n of Object.keys(this.dataTransform)){const o=this.columns.find(r=>r.name===n);o&&o.forceDataTransform&&(n in i||(i[n]=""))}const s=i;for(const n in s){const o=this.dataTransform[n];o?t[n]=o(s[n],i,e):t[n]=i[n]}return t}downloadData(e="BIM Table Data",t="json"){let i=null;if(t==="json"&&(i=new File([JSON.stringify(this.value,void 0,2)],`${e}.json`)),t==="csv"&&(i=new File([this.csv],`${e}.csv`)),t==="tsv"&&(i=new File([this.tsv],`${e}.tsv`)),!i)return;const s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=i.name,s.click(),URL.revokeObjectURL(s.href)}getRowIndentation(e,t=this.value,i=0){for(const s of t){if(s.data===e)return i;if(s.children){const n=this.getRowIndentation(e,s.children,i+1);if(n!==null)return n}}return null}getGroupIndentation(e,t=this.value,i=0){for(const s of t){if(s===e)return i;if(s.children){const n=this.getGroupIndentation(e,s.children,i+1);if(n!==null)return n}}return null}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new Event("connected"))}disconnectedCallback(){super.disconnectedCallback(),this.dispatchEvent(new Event("disconnected"))}async loadData(e=!1){if(this._value.length!==0&&!e||!this.loadFunction)return!1;this.loading=!0;try{const t=await this.loadFunction();return this.data=t,this.loading=!1,this._errorLoading=!1,!0}catch(t){if(this.loading=!1,this._value.length!==0)return!1;const i=this.querySelector("[slot='error-loading']"),s=i==null?void 0:i.querySelector("[data-table-element='error-message']");return t instanceof Error&&s&&t.message.trim()!==""&&(s.textContent=t.message),this._errorLoading=!0,!1}}groupData(e=this.data){return Xf(e,this.groupedBy,this.groupingTransform)}updateValue(){const e=this.filterData(),t=this.groupData(e);this._value=t}filter(e,t=this.filterFunction??this._stringFilterFunction,i=this.data){const s=[];for(const n of i)if(t(e,n)){if(this.preserveStructureOnFilter){const o={data:n.data};if(n.children){const r=this.filter(e,t,n.children);r.length&&(o.children=r)}s.push(o)}else if(s.push({data:n.data}),n.children){const o=this.filter(e,t,n.children);s.push(...o)}}else if(n.children){const o=this.filter(e,t,n.children);this.preserveStructureOnFilter&&o.length?s.push({data:n.data,children:o}):s.push(...o)}return s}get _missingDataElement(){return this.querySelector("[slot='missing-data']")}getGroupingMessageTemplate(){if(this.groupedBy.length===0)return N;const e=this.groupedBy.join(" → ");return S`
      <bim-label
        part="grouping-message"
        style="
        background-color: var(--bim-ui_bg-contrast-10);
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
        padding: 0.5rem 0.75rem;
        font-weight: 500;
        display: block;
      "
      >
        Grouped By: ${e}
      </bim-label>
    `}render(){if(this.loading)return Qf();if(this._errorLoading)return S`<slot name="error-loading"></slot>`;if(this._value.length===0&&this._missingDataElement)return S`<slot name="missing-data"></slot>`;const e=i=>{if(!i)return;const s=i;s.table=this,s.data=this._headerRowData,s.requestUpdate()},t=i=>{if(!i)return;const s=i;s.table=this,s.data=this.value,s.requestUpdate()};return S`
      <div class="parent">
        ${tp()}
        <div
          style="
          grid-area: Header;
          position: sticky;
          top: 0;
          z-index: 5;
        "
        >
          ${We(!this.headersHidden,()=>S`<bim-table-row
                is-header
                style="background-color: var(--bim-ui_bg-contrast-20);"
                ${It(e)}
              ></bim-table-row>`)}
          ${this.getGroupingMessageTemplate()}
        </div>
        <div style="overflow-x: hidden; grid-area: Body">
          <bim-table-children
            ${It(t)}
            style="grid-area: Body; background-color: transparent"
          ></bim-table-children>
        </div>
      </div>
    `}},ps.styles=[pe.scrollbar,j`
      :host {
        position: relative;
        overflow: auto;
        display: block;
        pointer-events: auto;
      }

      :host(:not([data-processing])) .loader {
        display: none;
      }

      .parent {
        display: grid;
        grid-template:
          "Header" auto
          "Processing" auto
          "Body" 1fr
          "Footer" auto;
        overflow: auto;
        height: 100%;
      }

      .parent > bim-table-row[is-header] {
        color: var(--bim-table_header--c, var(--bim-ui_bg-contrast-100));
        background-color: var(
          --bim-table_header--bgc,
          var(--bim-ui_bg-contrast-20)
        );
      }

      .controls {
        display: flex;
        gap: 0.375rem;
        flex-wrap: wrap;
        margin-bottom: 0.5rem;
      }
    `],ps);ft([Jt()],ut.prototype,"_value",2);ft([v({type:Boolean,attribute:"headers-hidden",reflect:!0})],ut.prototype,"headersHidden",2);ft([v({type:String,attribute:"min-col-width",reflect:!0})],ut.prototype,"minColWidth",2);ft([v({type:Array,attribute:!1})],ut.prototype,"columns",1);ft([v({type:Array,attribute:!1})],ut.prototype,"data",1);ft([v({type:Boolean,reflect:!0})],ut.prototype,"expanded",2);ft([v({attribute:!1})],ut.prototype,"groupingTransform",2);ft([v({type:Boolean,reflect:!0,attribute:"selectable-rows"})],ut.prototype,"selectableRows",2);ft([v({type:Boolean,attribute:"no-indentation",reflect:!0})],ut.prototype,"noIndentation",2);ft([v({type:Boolean,attribute:"no-carets",reflect:!0})],ut.prototype,"noCarets",2);ft([v({type:Boolean,reflect:!0})],ut.prototype,"loading",2);ft([v({type:String,attribute:"grouped-by",reflect:!0,converter:{toAttribute:e=>Array.isArray(e)&&e.length>0?e.join(","):null,fromAttribute:e=>e&&e.trim()!==""?e.split(",").map(t=>t.trim()):[]}})],ut.prototype,"groupedBy",1);ft([Jt()],ut.prototype,"_errorLoading",2);ft([v({type:Boolean,attribute:"columns-hidden",reflect:!0,converter:{toAttribute:e=>e?null:"",fromAttribute:e=>e===null}})],ut.prototype,"defaultVisibility",1);ft([v({type:String,attribute:"visibility-exceptions",reflect:!0,converter:{toAttribute:e=>Array.isArray(e)&&e.length>0?e.join(","):null,fromAttribute:e=>e&&e.trim()!==""?e.split(",").map(t=>t.trim()):[]}})],ut.prototype,"visibilityExceptions",1);let qo=ut;var cp=Object.defineProperty,hp=Object.getOwnPropertyDescriptor,ai=(e,t,i,s)=>{for(var n=s>1?void 0:s?hp(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&cp(t,i,n),n};const Ec=class extends F{constructor(){super(...arguments),this._switchers=[],this.bottom=!1,this.switchersHidden=!1,this.floating=!1,this.switchersFull=!1,this.onTabHiddenChange=t=>{const i=t.target;i instanceof yt&&!i.hidden&&(i.removeEventListener("hiddenchange",this.onTabHiddenChange),this.tab=i.name,i.addEventListener("hiddenchange",this.onTabHiddenChange))}}set tab(t){this._tab=t;const i=[...this.children],s=i.find(n=>n instanceof yt&&n.name===t);for(const n of i){if(!(n instanceof yt))continue;n.hidden=s!==n;const o=this.getTabSwitcher(n.name);o&&o.toggleAttribute("data-active",!n.hidden)}s||(this._tab="hidden",this.setAttribute("tab","hidden"))}get tab(){return this._tab}getTabSwitcher(t){return this._switchers.find(i=>i.getAttribute("data-name")===t)}createSwitchers(){this._switchers=[];for(const t of this.children){if(!(t instanceof yt))continue;const i=document.createElement("div");i.addEventListener("click",()=>{this.tab===t.name?this.toggleAttribute("tab",!1):this.tab=t.name,this.setAnimatedBackgound()}),i.setAttribute("data-name",t.name),i.className="switcher";const s=document.createElement("bim-label");s.textContent=t.label??null,s.icon=t.icon,i.append(s),this._switchers.push(i)}}updateSwitchers(){for(const t of this.children){if(!(t instanceof yt))continue;const i=this._switchers.find(n=>n.getAttribute("data-name")===t.name);if(!i)continue;const s=i.querySelector("bim-label");s&&(s.textContent=t.label??null,s.icon=t.icon)}}onSlotChange(t){this.createSwitchers();const i=t.target.assignedElements(),s=i.find(n=>n instanceof yt?this.tab?n.name===this.tab:!n.hidden:!1);s&&s instanceof yt&&(this.tab=s.name);for(const n of i){if(!(n instanceof yt)){n.remove();continue}n.removeEventListener("hiddenchange",this.onTabHiddenChange),s!==n&&(n.hidden=!0),n.addEventListener("hiddenchange",this.onTabHiddenChange)}}doubleRequestAnimationFrames(t){requestAnimationFrame(()=>requestAnimationFrame(t))}setAnimatedBackgound(t=!1){var i;const s=this.renderRoot.querySelector(".animated-background"),n=[...((i=this.renderRoot.querySelector(".switchers"))==null?void 0:i.querySelectorAll(".switcher"))||[]].filter(o=>o.hasAttribute("data-active"))[0];requestAnimationFrame(()=>{var o,r,a,l;const c=(l=(a=(r=(o=n==null?void 0:n.parentElement)==null?void 0:o.shadowRoot)==null?void 0:r.querySelector("bim-input"))==null?void 0:a.shadowRoot)==null?void 0:l.querySelector(".input"),h={width:n==null?void 0:n.clientWidth,height:n==null?void 0:n.clientHeight,top:((n==null?void 0:n.offsetTop)??0)-((c==null?void 0:c.offsetTop)??0),left:((n==null?void 0:n.offsetLeft)??0)-((c==null?void 0:c.offsetLeft)??0)};n?(s==null||s.style.setProperty("width",`${h.width}px`),s==null||s.style.setProperty("height",`${h.height}px`),s==null||s.style.setProperty("left",`${h.left}px`)):s==null||s.style.setProperty("width","0"),this.bottom?(s==null||s.style.setProperty("top","100%"),s==null||s.style.setProperty("transform","translateY(-100%)")):s==null||s.style.setProperty("top",`${h.top}px`)}),t&&this.doubleRequestAnimationFrames(()=>{const o="ease";s==null||s.style.setProperty("transition",`width ${.3}s ${o}, height ${.3}s ${o}, top ${.3}s ${o}, left ${.3}s ${o}`)})}firstUpdated(){requestAnimationFrame(()=>{this.setAnimatedBackgound(!0)}),new ResizeObserver(()=>{this.setAnimatedBackgound()}).observe(this)}render(){return S`
      <div class="parent">
        <div class="switchers">
          <div class="animated-background"></div>
          ${this._switchers}
        </div>
        <div class="content">
          <slot @slotchange=${this.onSlotChange}></slot>
        </div>
      </div>
    `}};Ec.styles=[pe.scrollbar,j`
      * {
        box-sizing: border-box;
      }

      :host {
        background-color: var(--bim-ui_bg-base);
        display: block;
        overflow: auto;
      }

      .parent {
        display: grid;
        overflow: hidden;
        position: relative;
        grid-template: "switchers" auto "content" 1fr;
        height: 100%;
      }

      :host([bottom]) .parent {
        grid-template: "content" 1fr "switchers" auto;
      }

      .switchers {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        min-height: 2.25rem;
        font-weight: 600;
        grid-area: switchers;
      }

      .switcher {
        --bim-label--c: var(--bim-ui_bg-contrast-80);
        background-color: transparent;
        position: relative;
        cursor: pointer;
        pointer-events: auto;
        padding: 0rem 0.75rem;
        display: flex;
        justify-content: center;
        z-index: 2;
        transition: all 0.15s;
        min-height: 2.25rem;
        min-width: 10rem;
      }

      .switcher:not([data-active]):hover {
        filter: brightness(150%);
      }

      :host([switchers-full]) .switcher {
        flex: 1;
      }

      .switcher[data-active] {
        --bim-label--c: var(--bim-ui_main-contrast);
      }

      .switchers bim-label {
        pointer-events: none;
      }

      :host([switchers-hidden]) .switchers {
        display: none;
      }

      .content {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        grid-area: content;
        max-height: 100vh;
        overflow: auto;
        transition: max-height 0.2s;
      }

      :host([tab="hidden"]) .content {
        max-height: 0;
      }

      .animated-background {
        position: absolute;
        background: var(--bim-ui_main-base);
        width: 0;
        height: 0;
        top: 0;
        left: 0;
      }

      :host(:not([bottom])) .content {
        border-top: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([bottom]) .content {
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating]) {
        background-color: transparent;
      }

      :host([floating]) .switchers {
        justify-self: center;
        overflow: hidden;
        background-color: var(--bim-ui_bg-base);
      }

      :host([floating]:not([bottom])) .switchers {
        border-radius: var(--bim-ui_size-2xs) var(--bim-ui_size-2xs) 0 0;
        border-top: 1px solid var(--bim-ui_bg-contrast-20);
        border-left: 1px solid var(--bim-ui_bg-contrast-20);
        border-right: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating][bottom]) .switchers {
        border-radius: 0 0 var(--bim-ui_size-2xs) var(--bim-ui_size-2xs);
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
        border-left: 1px solid var(--bim-ui_bg-contrast-20);
        border-right: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating][tab="hidden"]) .switchers {
        border-radius: var(--bim-ui_size-2xs);
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating][bottom][tab="hidden"]) .switchers {
        border-top: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating]) .content {
        border: 1px solid var(--bim-ui_bg-contrast-20);
        border-radius: var(--bim-ui_size-2xs);
        background-color: var(--bim-ui_bg-base);
      }
    `];let Kt=Ec;ai([Jt()],Kt.prototype,"_switchers",2);ai([v({type:Boolean,reflect:!0})],Kt.prototype,"bottom",2);ai([v({type:Boolean,attribute:"switchers-hidden",reflect:!0})],Kt.prototype,"switchersHidden",2);ai([v({type:Boolean,reflect:!0})],Kt.prototype,"floating",2);ai([v({type:String,reflect:!0})],Kt.prototype,"tab",1);ai([v({type:Boolean,attribute:"switchers-full",reflect:!0})],Kt.prototype,"switchersFull",2);var dp=Object.defineProperty,up=Object.getOwnPropertyDescriptor,xn=(e,t,i,s)=>{for(var n=s>1?void 0:s?up(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&dp(t,i,n),n};const Pc=class extends F{constructor(){super(...arguments),this._defaultName="__unnamed__",this.name=this._defaultName,this._hidden=!1}set label(t){this._label=t;const i=this.parentElement;i instanceof Kt&&i.updateSwitchers()}get label(){return this._label}set icon(t){this._icon=t;const i=this.parentElement;i instanceof Kt&&i.updateSwitchers()}get icon(){return this._icon}set hidden(t){this._hidden=t,this.dispatchEvent(new Event("hiddenchange"))}get hidden(){return this._hidden}connectedCallback(){super.connectedCallback();const{parentElement:t}=this;if(t&&this.name===this._defaultName){const i=[...t.children].indexOf(this);this.name=`${this._defaultName}${i}`}}render(){return S` <slot></slot> `}};Pc.styles=j`
    :host {
      display: block;
      height: 100%;
      grid-row-start: 1;
      grid-column-start: 1;
      animation: openAnim 3s forwards;
      transform: translateY(0);
      max-height: 100vh;
      transition:
        opacity 0.3s ease,
        max-height 0.6s ease,
        transform 0.3s ease;
    }

    :host([hidden]) {
      transform: translateY(-20px);
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      visibility: hidden;
    }
  `;let yt=Pc;xn([v({type:String,reflect:!0})],yt.prototype,"name",2);xn([v({type:String,reflect:!0})],yt.prototype,"label",1);xn([v({type:String,reflect:!0})],yt.prototype,"icon",1);xn([v({type:Boolean,reflect:!0})],yt.prototype,"hidden",1);var fp=Object.defineProperty,pp=Object.getOwnPropertyDescriptor,Ot=(e,t,i,s)=>{for(var n=s>1?void 0:s?pp(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&fp(t,i,n),n};const $c=class extends F{constructor(){super(...arguments),this._inputTypes=["date","datetime-local","email","month","password","search","tel","text","time","url","week","area"],this.value="",this.vertical=!1,this.disabled=!1,this.resize="vertical",this._type="text",this.onValueChange=new Event("input")}set type(t){this._inputTypes.includes(t)&&(this._type=t)}get type(){return this._type}get query(){return co(this.value)}onInputChange(t){t.stopPropagation();const i=t.target;clearTimeout(this._debounceTimeoutID),this._debounceTimeoutID=setTimeout(()=>{this.value=i.value,this.dispatchEvent(this.onValueChange)},this.debounce)}focus(){setTimeout(()=>{var t;const i=(t=this.shadowRoot)==null?void 0:t.querySelector("input");i==null||i.focus()})}render(){return S`
      <bim-input
        .name=${this.name}
        .icon=${this.icon}
        .label=${this.label}
        .vertical=${this.vertical}
      >
        ${this.type==="area"?S` <textarea
              aria-label=${this.label||this.name||"Text Input"}
              .value=${this.value}
              .rows=${this.rows??5}
              ?disabled=${this.disabled}
              placeholder=${fo(this.placeholder)}
              @input=${this.onInputChange}
              style="resize: ${this.resize};"
            ></textarea>`:S` <input
              aria-label=${this.label||this.name||"Text Input"}
              .type=${this.type}
              .value=${this.value}
              ?disabled=${this.disabled}
              placeholder=${fo(this.placeholder)}
              @input=${this.onInputChange}
            />`}
      </bim-input>
    `}};$c.styles=[pe.scrollbar,j`
      :host {
        --bim-input--bgc: var(--bim-ui_bg-contrast-20);
        flex: 1;
        display: block;
      }

      input,
      textarea {
        font-family: inherit;
        background-color: transparent;
        border: none;
        width: 100%;
        padding: var(--bim-ui_size-3xs);
        color: var(--bim-text-input--c, var(--bim-ui_bg-contrast-100));
      }

      input {
        outline: none;
        height: 100%;
        padding: 0 var(--bim-ui_size-3xs); /* Override padding */
        border-radius: var(--bim-text-input--bdrs, var(--bim-ui_size-4xs));
      }

      :host([disabled]) input,
      :host([disabled]) textarea {
        color: var(--bim-ui_bg-contrast-60);
      }

      textarea {
        line-height: 1.1rem;
        outline: none;
      }

      :host(:focus) {
        --bim-input--olc: var(--bim-ui_accent-base);
      }

      /* :host([disabled]) {
      --bim-input--bgc: var(--bim-ui_bg-contrast-20);
    } */
    `];let Ct=$c;Ot([v({type:String,reflect:!0})],Ct.prototype,"icon",2);Ot([v({type:String,reflect:!0})],Ct.prototype,"label",2);Ot([v({type:String,reflect:!0})],Ct.prototype,"name",2);Ot([v({type:String,reflect:!0})],Ct.prototype,"placeholder",2);Ot([v({type:String,reflect:!0})],Ct.prototype,"value",2);Ot([v({type:Boolean,reflect:!0})],Ct.prototype,"vertical",2);Ot([v({type:Number,reflect:!0})],Ct.prototype,"debounce",2);Ot([v({type:Number,reflect:!0})],Ct.prototype,"rows",2);Ot([v({type:Boolean,reflect:!0})],Ct.prototype,"disabled",2);Ot([v({type:String,reflect:!0})],Ct.prototype,"resize",2);Ot([v({type:String,reflect:!0})],Ct.prototype,"type",1);var gp=Object.defineProperty,mp=Object.getOwnPropertyDescriptor,Oc=(e,t,i,s)=>{for(var n=s>1?void 0:s?mp(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&gp(t,i,n),n};const Tc=class extends F{constructor(){super(...arguments),this.rows=2,this._vertical=!1}set vertical(t){this._vertical=t,this.updateChildren()}get vertical(){return this._vertical}updateChildren(){const t=this.children;for(const i of t)this.vertical?i.setAttribute("label-hidden",""):i.removeAttribute("label-hidden")}render(){return S`
      <style>
        .parent {
          grid-auto-flow: ${this.vertical?"row":"column"};
          grid-template-rows: repeat(${this.rows}, 1fr);
        }
      </style>
      <div class="parent">
        <slot @slotchange=${this.updateChildren}></slot>
      </div>
    `}};Tc.styles=j`
    .parent {
      display: grid;
      gap: 0.25rem;
    }

    ::slotted(bim-button[label]:not([vertical])) {
      --bim-button--jc: flex-start;
    }

    ::slotted(bim-button) {
      --bim-label--c: var(--bim-ui_bg-contrast-80);
    }
  `;let _n=Tc;Oc([v({type:Number,reflect:!0})],_n.prototype,"rows",2);Oc([v({type:Boolean,reflect:!0})],_n.prototype,"vertical",1);var bp=Object.defineProperty,yp=Object.getOwnPropertyDescriptor,wn=(e,t,i,s)=>{for(var n=s>1?void 0:s?yp(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&bp(t,i,n),n};const Dc=class extends F{constructor(){super(...arguments),this._vertical=!1,this._labelHidden=!1}set vertical(t){this._vertical=t,this.updateChildren()}get vertical(){return this._vertical}set labelHidden(t){this._labelHidden=t,this.updateChildren()}get labelHidden(){return this._labelHidden}updateChildren(){const t=this.children;for(const i of t)i instanceof _n&&(i.vertical=this.vertical),i.toggleAttribute("label-hidden",this.vertical)}render(){return S`
      <div class="parent">
        <div class="children">
          <slot @slotchange=${this.updateChildren}></slot>
        </div>
        ${!this.labelHidden&&(this.label||this.icon)?S`<bim-label .icon=${this.icon}>${this.label}</bim-label>`:null}
      </div>
    `}};Dc.styles=j`
    :host {
      --bim-label--fz: var(--bim-ui_size-xs);
      --bim-label--c: var(--bim-ui_bg-contrast-60);
      display: block;
      flex: 1;
    }

    :host(:not([vertical])) ::slotted(bim-button[vertical]) {
      --bim-icon--fz: var(--bim-ui_size-5xl);
      min-height: 3.75rem;
    }

    .parent {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      padding: 0.5rem;
      height: 100%;
      box-sizing: border-box;
      justify-content: space-between;
    }

    :host([vertical]) .parent {
      flex-direction: row-reverse;
    }

    :host([vertical]) .parent > bim-label {
      writing-mode: tb;
    }

    .children {
      display: flex;
      gap: 0.25rem;
    }

    :host([vertical]) .children {
      flex-direction: column;
    }
  `;let li=Dc;wn([v({type:String,reflect:!0})],li.prototype,"label",2);wn([v({type:String,reflect:!0})],li.prototype,"icon",2);wn([v({type:Boolean,reflect:!0})],li.prototype,"vertical",1);wn([v({type:Boolean,attribute:"label-hidden",reflect:!0})],li.prototype,"labelHidden",1);var vp=Object.defineProperty,xp=Object.getOwnPropertyDescriptor,Yo=(e,t,i,s)=>{for(var n=s>1?void 0:s?xp(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=(s?r(t,i,n):r(n))||n);return s&&n&&vp(t,i,n),n};const zc=class extends F{constructor(){super(...arguments),this.labelsHidden=!1,this._vertical=!1,this._hidden=!1}set vertical(t){this._vertical=t,this.updateSections()}get vertical(){return this._vertical}set hidden(t){this._hidden=t,this.dispatchEvent(new Event("hiddenchange"))}get hidden(){return this._hidden}updateSections(){const t=this.children;for(const i of t)i instanceof li&&(i.labelHidden=this.vertical&&!gn.config.sectionLabelOnVerticalToolbar,i.vertical=this.vertical)}render(){return S`
      <div class="parent">
        <slot @slotchange=${this.updateSections}></slot>
      </div>
    `}};zc.styles=j`
    :host {
      --bim-button--bgc: transparent;
      background-color: var(--bim-ui_bg-base);
      border-radius: var(--bim-ui_size-2xs);
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .parent {
      display: flex;
      width: max-content;
      pointer-events: auto;
    }

    :host([vertical]) .parent {
      flex-direction: column;
    }

    :host([vertical]) {
      width: min-content;
      border-radius: var(--bim-ui_size-2xs);
      border: 1px solid var(--bim-ui_bg-contrast-20);
    }

    ::slotted(bim-toolbar-section:not(:last-child)) {
      border-right: 1px solid var(--bim-ui_bg-contrast-20);
      border-bottom: none;
    }

    :host([vertical]) ::slotted(bim-toolbar-section:not(:last-child)) {
      border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      border-right: none;
    }
  `;let kn=zc;Yo([v({type:String,reflect:!0})],kn.prototype,"icon",2);Yo([v({type:Boolean,attribute:"labels-hidden",reflect:!0})],kn.prototype,"labelsHidden",2);Yo([v({type:Boolean,reflect:!0})],kn.prototype,"vertical",1);var _p=Object.defineProperty,wp=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&_p(t,i,n),n};const Lc=class extends F{constructor(){super(),this._onResize=new Event("resize"),new ResizeObserver(()=>{setTimeout(()=>{this.dispatchEvent(this._onResize)})}).observe(this)}render(){return S`
      <div class="parent">
        <slot></slot>
      </div>
    `}};Lc.styles=j`
    :host {
      display: grid;
      min-width: 0;
      min-height: 0;
      height: 100%;
    }

    .parent {
      overflow: hidden;
      position: relative;
    }
  `;let Rc=Lc;wp([v({type:String,reflect:!0})],Rc.prototype,"name");var kp=Object.defineProperty,Sp=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&kp(t,i,n),n};const Ic=class extends F{constructor(){super(...arguments),this.charts=[],this._charts=[],this.labels=[]}willUpdate(t){const i=[];this.charts&&i.push(...this.charts),this._charts=[...new Set(i)]}_getLabelColorMap(t){const i={};return t.colors&&this.labels.forEach((s,n)=>{i[s]=t.colors[n%t.colors.length]}),i}_getHideEventData(){var t;const i={};for(const s in this.labels){const n=this.labels[s],o=[];for(const r of Object.values(this._charts[0].inputData.datasets))o.push((t=r[s])==null?void 0:t.data);i[n]=o}return i}render(){if(this._charts.length===0||!this._charts[0].data)return S`<slot name="no-chart"></slot>`;const t=this._charts[0];this.labels=t.inputData.labels;const i=this._getLabelColorMap(t),s=this._getHideEventData();return this.labels.length===0?S`<slot name="missing-data"></slot>`:S`
      <div class="parent">
        ${this.labels.map(n=>S`
            <div style="display: flex; gap: 0.25rem; align-items: center;">
              <span
                style="
                display: inline-block;
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                background: ${i[n]??"gray"};
              "
                aria-hidden="true"
              ></span>
              <bim-label
                @click=${o=>{const r=o.currentTarget,a=r.style.textDecoration==="line-through";r.style.textDecoration=a?"none":"line-through";const l=s[n];this.dispatchEvent(new CustomEvent("label-click",{detail:{label:n,data:l,visibility:a}}));for(const c of this._charts)c.filterByLabel(n)}}
              >
                ${n}
              </bim-label>
            </div>
          `)}
      </div>
    `}};Ic.styles=j`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 0.5rem;
    }

    .parent {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
      /* height: 100%;
      width: 100%; */
    }
  `;let Fc=Ic;Sp([v({type:Array,attribute:!1,hasChanged:()=>!0})],Fc.prototype,"charts");/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function hs(e){return e+.5|0}const se=(e,t,i)=>Math.max(Math.min(e,i),t);function _i(e){return se(hs(e*2.55),0,255)}function le(e){return se(hs(e*255),0,255)}function Nt(e){return se(hs(e/2.55)/100,0,1)}function Zr(e){return se(hs(e*100),0,100)}const _t={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},po=[..."0123456789ABCDEF"],Mp=e=>po[e&15],Cp=e=>po[(e&240)>>4]+po[e&15],gs=e=>(e&240)>>4===(e&15),Ap=e=>gs(e.r)&&gs(e.g)&&gs(e.b)&&gs(e.a);function Ep(e){var t=e.length,i;return e[0]==="#"&&(t===4||t===5?i={r:255&_t[e[1]]*17,g:255&_t[e[2]]*17,b:255&_t[e[3]]*17,a:t===5?_t[e[4]]*17:255}:(t===7||t===9)&&(i={r:_t[e[1]]<<4|_t[e[2]],g:_t[e[3]]<<4|_t[e[4]],b:_t[e[5]]<<4|_t[e[6]],a:t===9?_t[e[7]]<<4|_t[e[8]]:255})),i}const Pp=(e,t)=>e<255?t(e):"";function $p(e){var t=Ap(e)?Mp:Cp;return e?"#"+t(e.r)+t(e.g)+t(e.b)+Pp(e.a,t):void 0}const Op=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Bc(e,t,i){const s=t*Math.min(i,1-i),n=(o,r=(o+e/30)%12)=>i-s*Math.max(Math.min(r-3,9-r,1),-1);return[n(0),n(8),n(4)]}function Tp(e,t,i){const s=(n,o=(n+e/60)%6)=>i-i*t*Math.max(Math.min(o,4-o,1),0);return[s(5),s(3),s(1)]}function Dp(e,t,i){const s=Bc(e,1,.5);let n;for(t+i>1&&(n=1/(t+i),t*=n,i*=n),n=0;n<3;n++)s[n]*=1-t-i,s[n]+=t;return s}function zp(e,t,i,s,n){return e===n?(t-i)/s+(t<i?6:0):t===n?(i-e)/s+2:(e-t)/s+4}function Xo(e){const t=e.r/255,i=e.g/255,s=e.b/255,n=Math.max(t,i,s),o=Math.min(t,i,s),r=(n+o)/2;let a,l,c;return n!==o&&(c=n-o,l=r>.5?c/(2-n-o):c/(n+o),a=zp(t,i,s,c,n),a=a*60+.5),[a|0,l||0,r]}function Go(e,t,i,s){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,i,s)).map(le)}function Zo(e,t,i){return Go(Bc,e,t,i)}function Lp(e,t,i){return Go(Dp,e,t,i)}function Rp(e,t,i){return Go(Tp,e,t,i)}function jc(e){return(e%360+360)%360}function Ip(e){const t=Op.exec(e);let i=255,s;if(!t)return;t[5]!==s&&(i=t[6]?_i(+t[5]):le(+t[5]));const n=jc(+t[2]),o=+t[3]/100,r=+t[4]/100;return t[1]==="hwb"?s=Lp(n,o,r):t[1]==="hsv"?s=Rp(n,o,r):s=Zo(n,o,r),{r:s[0],g:s[1],b:s[2],a:i}}function Fp(e,t){var i=Xo(e);i[0]=jc(i[0]+t),i=Zo(i),e.r=i[0],e.g=i[1],e.b=i[2]}function Bp(e){if(!e)return;const t=Xo(e),i=t[0],s=Zr(t[1]),n=Zr(t[2]);return e.a<255?`hsla(${i}, ${s}%, ${n}%, ${Nt(e.a)})`:`hsl(${i}, ${s}%, ${n}%)`}const Kr={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Jr={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function jp(){const e={},t=Object.keys(Jr),i=Object.keys(Kr);let s,n,o,r,a;for(s=0;s<t.length;s++){for(r=a=t[s],n=0;n<i.length;n++)o=i[n],a=a.replace(o,Kr[o]);o=parseInt(Jr[r],16),e[a]=[o>>16&255,o>>8&255,o&255]}return e}let ms;function Hp(e){ms||(ms=jp(),ms.transparent=[0,0,0,0]);const t=ms[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const Np=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Vp(e){const t=Np.exec(e);let i=255,s,n,o;if(t){if(t[7]!==s){const r=+t[7];i=t[8]?_i(r):se(r*255,0,255)}return s=+t[1],n=+t[3],o=+t[5],s=255&(t[2]?_i(s):se(s,0,255)),n=255&(t[4]?_i(n):se(n,0,255)),o=255&(t[6]?_i(o):se(o,0,255)),{r:s,g:n,b:o,a:i}}}function Wp(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Nt(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const Fn=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Be=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function Up(e,t,i){const s=Be(Nt(e.r)),n=Be(Nt(e.g)),o=Be(Nt(e.b));return{r:le(Fn(s+i*(Be(Nt(t.r))-s))),g:le(Fn(n+i*(Be(Nt(t.g))-n))),b:le(Fn(o+i*(Be(Nt(t.b))-o))),a:e.a+i*(t.a-e.a)}}function bs(e,t,i){if(e){let s=Xo(e);s[t]=Math.max(0,Math.min(s[t]+s[t]*i,t===0?360:1)),s=Zo(s),e.r=s[0],e.g=s[1],e.b=s[2]}}function Hc(e,t){return e&&Object.assign(t||{},e)}function Qr(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=le(e[3]))):(t=Hc(e,{r:0,g:0,b:0,a:1}),t.a=le(t.a)),t}function qp(e){return e.charAt(0)==="r"?Vp(e):Ip(e)}class Qe{constructor(t){if(t instanceof Qe)return t;const i=typeof t;let s;i==="object"?s=Qr(t):i==="string"&&(s=Ep(t)||Hp(t)||qp(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=Hc(this._rgb);return t&&(t.a=Nt(t.a)),t}set rgb(t){this._rgb=Qr(t)}rgbString(){return this._valid?Wp(this._rgb):void 0}hexString(){return this._valid?$p(this._rgb):void 0}hslString(){return this._valid?Bp(this._rgb):void 0}mix(t,i){if(t){const s=this.rgb,n=t.rgb;let o;const r=i===o?.5:i,a=2*r-1,l=s.a-n.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;o=1-c,s.r=255&c*s.r+o*n.r+.5,s.g=255&c*s.g+o*n.g+.5,s.b=255&c*s.b+o*n.b+.5,s.a=r*s.a+(1-r)*n.a,this.rgb=s}return this}interpolate(t,i){return t&&(this._rgb=Up(this._rgb,t._rgb,i)),this}clone(){return new Qe(this.rgb)}alpha(t){return this._rgb.a=le(t),this}clearer(t){const i=this._rgb;return i.a*=1-t,this}greyscale(){const t=this._rgb,i=hs(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=i,this}opaquer(t){const i=this._rgb;return i.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return bs(this._rgb,2,t),this}darken(t){return bs(this._rgb,2,-t),this}saturate(t){return bs(this._rgb,1,t),this}desaturate(t){return bs(this._rgb,1,-t),this}rotate(t){return Fp(this._rgb,t),this}}function Yp(e){return new Qe(e)}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Bt(){}const Xp=(()=>{let e=0;return()=>e++})();function T(e){return e==null}function q(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function L(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function J(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function bt(e,t){return J(e)?e:t}function O(e,t){return typeof e>"u"?t:e}const Gp=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,Nc=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function V(e,t,i){if(e&&typeof e.call=="function")return e.apply(i,t)}function H(e,t,i,s){let n,o,r;if(q(e))for(o=e.length,n=0;n<o;n++)t.call(i,e[n],n);else if(L(e))for(r=Object.keys(e),o=r.length,n=0;n<o;n++)t.call(i,e[r[n]],r[n])}function Qs(e,t){let i,s,n,o;if(!e||!t||e.length!==t.length)return!1;for(i=0,s=e.length;i<s;++i)if(n=e[i],o=t[i],n.datasetIndex!==o.datasetIndex||n.index!==o.index)return!1;return!0}function tn(e){if(q(e))return e.map(tn);if(L(e)){const t=Object.create(null),i=Object.keys(e),s=i.length;let n=0;for(;n<s;++n)t[i[n]]=tn(e[i[n]]);return t}return e}function Vc(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function Zp(e,t,i,s){if(!Vc(e))return;const n=t[e],o=i[e];L(n)&&L(o)?Ft(n,o,s):t[e]=tn(o)}function Ft(e,t,i){const s=q(t)?t:[t],n=s.length;if(!L(e))return e;i=i||{};const o=i.merger||Zp;let r;for(let a=0;a<n;++a){if(r=s[a],!L(r))continue;const l=Object.keys(r);for(let c=0,h=l.length;c<h;++c)o(l[c],e,r,i)}return e}function Ei(e,t){return Ft(e,t,{merger:Kp})}function Kp(e,t,i){if(!Vc(e))return;const s=t[e],n=i[e];L(s)&&L(n)?Ei(s,n):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=tn(n))}const ta={"":e=>e,x:e=>e.x,y:e=>e.y};function Jp(e){const t=e.split("."),i=[];let s="";for(const n of t)s+=n,s.endsWith("\\")?s=s.slice(0,-1)+".":(i.push(s),s="");return i}function Qp(e){const t=Jp(e);return i=>{for(const s of t){if(s==="")break;i=i&&i[s]}return i}}function de(e,t){return(ta[t]||(ta[t]=Qp(t)))(e)}function Ko(e){return e.charAt(0).toUpperCase()+e.slice(1)}const Wi=e=>typeof e<"u",ue=e=>typeof e=="function",ea=(e,t)=>{if(e.size!==t.size)return!1;for(const i of e)if(!t.has(i))return!1;return!0};function tg(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const B=Math.PI,Y=2*B,eg=Y+B,en=Number.POSITIVE_INFINITY,ig=B/180,tt=B/2,_e=B/4,ia=B*2/3,ne=Math.log10,zt=Math.sign;function Pi(e,t,i){return Math.abs(e-t)<i}function sa(e){const t=Math.round(e);e=Pi(e,t,e/1e3)?t:e;const i=Math.pow(10,Math.floor(ne(e))),s=e/i;return(s<=1?1:s<=2?2:s<=5?5:10)*i}function sg(e){const t=[],i=Math.sqrt(e);let s;for(s=1;s<i;s++)e%s===0&&(t.push(s),t.push(e/s));return i===(i|0)&&t.push(i),t.sort((n,o)=>n-o).pop(),t}function ng(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function ti(e){return!ng(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function og(e,t){const i=Math.round(e);return i-t<=e&&i+t>=e}function Wc(e,t,i){let s,n,o;for(s=0,n=e.length;s<n;s++)o=e[s][i],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function At(e){return e*(B/180)}function Jo(e){return e*(180/B)}function na(e){if(!J(e))return;let t=1,i=0;for(;Math.round(e*t)/t!==e;)t*=10,i++;return i}function Uc(e,t){const i=t.x-e.x,s=t.y-e.y,n=Math.sqrt(i*i+s*s);let o=Math.atan2(s,i);return o<-.5*B&&(o+=Y),{angle:o,distance:n}}function go(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function rg(e,t){return(e-t+eg)%Y-B}function ht(e){return(e%Y+Y)%Y}function Ui(e,t,i,s){const n=ht(e),o=ht(t),r=ht(i),a=ht(o-n),l=ht(r-n),c=ht(n-o),h=ht(n-r);return n===o||n===r||s&&o===r||a>l&&c<h}function ot(e,t,i){return Math.max(t,Math.min(i,e))}function ag(e){return ot(e,-32768,32767)}function Wt(e,t,i,s=1e-6){return e>=Math.min(t,i)-s&&e<=Math.max(t,i)+s}function Qo(e,t,i){i=i||(r=>e[r]<t);let s=e.length-1,n=0,o;for(;s-n>1;)o=n+s>>1,i(o)?n=o:s=o;return{lo:n,hi:s}}const Ut=(e,t,i,s)=>Qo(e,i,s?n=>{const o=e[n][t];return o<i||o===i&&e[n+1][t]===i}:n=>e[n][t]<i),lg=(e,t,i)=>Qo(e,i,s=>e[s][t]>=i);function cg(e,t,i){let s=0,n=e.length;for(;s<n&&e[s]<t;)s++;for(;n>s&&e[n-1]>i;)n--;return s>0||n<e.length?e.slice(s,n):e}const qc=["push","pop","shift","splice","unshift"];function hg(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),qc.forEach(i=>{const s="_onData"+Ko(i),n=e[i];Object.defineProperty(e,i,{configurable:!0,enumerable:!1,value(...o){const r=n.apply(this,o);return e._chartjs.listeners.forEach(a=>{typeof a[s]=="function"&&a[s](...o)}),r}})})}function oa(e,t){const i=e._chartjs;if(!i)return;const s=i.listeners,n=s.indexOf(t);n!==-1&&s.splice(n,1),!(s.length>0)&&(qc.forEach(o=>{delete e[o]}),delete e._chartjs)}function Yc(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Xc=function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame}();function Gc(e,t){let i=[],s=!1;return function(...n){i=n,s||(s=!0,Xc.call(window,()=>{s=!1,e.apply(t,i)}))}}function dg(e,t){let i;return function(...s){return t?(clearTimeout(i),i=setTimeout(e,t,s)):e.apply(this,s),t}}const tr=e=>e==="start"?"left":e==="end"?"right":"center",ct=(e,t,i)=>e==="start"?t:e==="end"?i:(t+i)/2,ug=(e,t,i,s)=>e===(s?"left":"right")?i:e==="center"?(t+i)/2:t;function Zc(e,t,i){const s=t.length;let n=0,o=s;if(e._sorted){const{iScale:r,vScale:a,_parsed:l}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,h=r.axis,{min:d,max:u,minDefined:f,maxDefined:g}=r.getUserBounds();if(f){if(n=Math.min(Ut(l,h,d).lo,i?s:Ut(t,h,r.getPixelForValue(d)).lo),c){const p=l.slice(0,n+1).reverse().findIndex(m=>!T(m[a.axis]));n-=Math.max(0,p)}n=ot(n,0,s-1)}if(g){let p=Math.max(Ut(l,r.axis,u,!0).hi+1,i?0:Ut(t,h,r.getPixelForValue(u),!0).hi+1);if(c){const m=l.slice(p-1).findIndex(b=>!T(b[a.axis]));p+=Math.max(0,m)}o=ot(p,n,s)-n}else o=s-n}return{start:n,count:o}}function Kc(e){const{xScale:t,yScale:i,_scaleRanges:s}=e,n={xmin:t.min,xmax:t.max,ymin:i.min,ymax:i.max};if(!s)return e._scaleRanges=n,!0;const o=s.xmin!==t.min||s.xmax!==t.max||s.ymin!==i.min||s.ymax!==i.max;return Object.assign(s,n),o}const ys=e=>e===0||e===1,ra=(e,t,i)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*Y/i)),aa=(e,t,i)=>Math.pow(2,-10*e)*Math.sin((e-t)*Y/i)+1,$i={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*tt)+1,easeOutSine:e=>Math.sin(e*tt),easeInOutSine:e=>-.5*(Math.cos(B*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>ys(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>ys(e)?e:ra(e,.075,.3),easeOutElastic:e=>ys(e)?e:aa(e,.075,.3),easeInOutElastic(e){return ys(e)?e:e<.5?.5*ra(e*2,.1125,.45):.5+.5*aa(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-$i.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?$i.easeInBounce(e*2)*.5:$i.easeOutBounce(e*2-1)*.5+.5};function er(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function la(e){return er(e)?e:new Qe(e)}function Bn(e){return er(e)?e:new Qe(e).saturate(.5).darken(.1).hexString()}const fg=["x","y","borderWidth","radius","tension"],pg=["color","borderColor","backgroundColor"];function gg(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:pg},numbers:{type:"number",properties:fg}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function mg(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const ca=new Map;function bg(e,t){t=t||{};const i=e+JSON.stringify(t);let s=ca.get(i);return s||(s=new Intl.NumberFormat(e,t),ca.set(i,s)),s}function ds(e,t,i){return bg(t,i).format(e)}const Jc={values(e){return q(e)?e:""+e},numeric(e,t,i){if(e===0)return"0";const s=this.chart.options.locale;let n,o=e;if(i.length>1){const c=Math.max(Math.abs(i[0].value),Math.abs(i[i.length-1].value));(c<1e-4||c>1e15)&&(n="scientific"),o=yg(e,i)}const r=ne(Math.abs(o)),a=isNaN(r)?1:Math.max(Math.min(-1*Math.floor(r),20),0),l={notation:n,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),ds(e,s,l)},logarithmic(e,t,i){if(e===0)return"0";const s=i[t].significand||e/Math.pow(10,Math.floor(ne(e)));return[1,2,3,5,10,15].includes(s)||t>.8*i.length?Jc.numeric.call(this,e,t,i):""}};function yg(e,t){let i=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(i)>=1&&e!==Math.floor(e)&&(i=e-Math.floor(e)),i}var Sn={formatters:Jc};function vg(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,i)=>i.lineWidth,tickColor:(t,i)=>i.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Sn.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const De=Object.create(null),mo=Object.create(null);function Oi(e,t){if(!t)return e;const i=t.split(".");for(let s=0,n=i.length;s<n;++s){const o=i[s];e=e[o]||(e[o]=Object.create(null))}return e}function jn(e,t,i){return typeof t=="string"?Ft(Oi(e,t),i):Ft(Oi(e,""),t)}class xg{constructor(t,i){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,n)=>Bn(n.backgroundColor),this.hoverBorderColor=(s,n)=>Bn(n.borderColor),this.hoverColor=(s,n)=>Bn(n.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(i)}set(t,i){return jn(this,t,i)}get(t){return Oi(this,t)}describe(t,i){return jn(mo,t,i)}override(t,i){return jn(De,t,i)}route(t,i,s,n){const o=Oi(this,t),r=Oi(this,s),a="_"+i;Object.defineProperties(o,{[a]:{value:o[i],writable:!0},[i]:{enumerable:!0,get(){const l=this[a],c=r[n];return L(l)?Object.assign({},c,l):O(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(i=>i(this))}}var X=new xg({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[gg,mg,vg]);function _g(e){return!e||T(e.size)||T(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function sn(e,t,i,s,n){let o=t[n];return o||(o=t[n]=e.measureText(n).width,i.push(n)),o>s&&(s=o),s}function wg(e,t,i,s){s=s||{};let n=s.data=s.data||{},o=s.garbageCollect=s.garbageCollect||[];s.font!==t&&(n=s.data={},o=s.garbageCollect=[],s.font=t),e.save(),e.font=t;let r=0;const a=i.length;let l,c,h,d,u;for(l=0;l<a;l++)if(d=i[l],d!=null&&!q(d))r=sn(e,n,o,r,d);else if(q(d))for(c=0,h=d.length;c<h;c++)u=d[c],u!=null&&!q(u)&&(r=sn(e,n,o,r,u));e.restore();const f=o.length/2;if(f>i.length){for(l=0;l<f;l++)delete n[o[l]];o.splice(0,f)}return r}function we(e,t,i){const s=e.currentDevicePixelRatio,n=i!==0?Math.max(i/2,.5):0;return Math.round((t-n)*s)/s+n}function ha(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function bo(e,t,i,s){Qc(e,t,i,s,null)}function Qc(e,t,i,s,n){let o,r,a,l,c,h,d,u;const f=t.pointStyle,g=t.rotation,p=t.radius;let m=(g||0)*ig;if(f&&typeof f=="object"&&(o=f.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){e.save(),e.translate(i,s),e.rotate(m),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(p)||p<=0)){switch(e.beginPath(),f){default:n?e.ellipse(i,s,n/2,p,0,0,Y):e.arc(i,s,p,0,Y),e.closePath();break;case"triangle":h=n?n/2:p,e.moveTo(i+Math.sin(m)*h,s-Math.cos(m)*p),m+=ia,e.lineTo(i+Math.sin(m)*h,s-Math.cos(m)*p),m+=ia,e.lineTo(i+Math.sin(m)*h,s-Math.cos(m)*p),e.closePath();break;case"rectRounded":c=p*.516,l=p-c,r=Math.cos(m+_e)*l,d=Math.cos(m+_e)*(n?n/2-c:l),a=Math.sin(m+_e)*l,u=Math.sin(m+_e)*(n?n/2-c:l),e.arc(i-d,s-a,c,m-B,m-tt),e.arc(i+u,s-r,c,m-tt,m),e.arc(i+d,s+a,c,m,m+tt),e.arc(i-u,s+r,c,m+tt,m+B),e.closePath();break;case"rect":if(!g){l=Math.SQRT1_2*p,h=n?n/2:l,e.rect(i-h,s-l,2*h,2*l);break}m+=_e;case"rectRot":d=Math.cos(m)*(n?n/2:p),r=Math.cos(m)*p,a=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),e.moveTo(i-d,s-a),e.lineTo(i+u,s-r),e.lineTo(i+d,s+a),e.lineTo(i-u,s+r),e.closePath();break;case"crossRot":m+=_e;case"cross":d=Math.cos(m)*(n?n/2:p),r=Math.cos(m)*p,a=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),e.moveTo(i-d,s-a),e.lineTo(i+d,s+a),e.moveTo(i+u,s-r),e.lineTo(i-u,s+r);break;case"star":d=Math.cos(m)*(n?n/2:p),r=Math.cos(m)*p,a=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),e.moveTo(i-d,s-a),e.lineTo(i+d,s+a),e.moveTo(i+u,s-r),e.lineTo(i-u,s+r),m+=_e,d=Math.cos(m)*(n?n/2:p),r=Math.cos(m)*p,a=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),e.moveTo(i-d,s-a),e.lineTo(i+d,s+a),e.moveTo(i+u,s-r),e.lineTo(i-u,s+r);break;case"line":r=n?n/2:Math.cos(m)*p,a=Math.sin(m)*p,e.moveTo(i-r,s-a),e.lineTo(i+r,s+a);break;case"dash":e.moveTo(i,s),e.lineTo(i+Math.cos(m)*(n?n/2:p),s+Math.sin(m)*p);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function qt(e,t,i){return i=i||.5,!t||e&&e.x>t.left-i&&e.x<t.right+i&&e.y>t.top-i&&e.y<t.bottom+i}function Mn(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Cn(e){e.restore()}function kg(e,t,i,s,n){if(!t)return e.lineTo(i.x,i.y);if(n==="middle"){const o=(t.x+i.x)/2;e.lineTo(o,t.y),e.lineTo(o,i.y)}else n==="after"!=!!s?e.lineTo(t.x,i.y):e.lineTo(i.x,t.y);e.lineTo(i.x,i.y)}function Sg(e,t,i,s){if(!t)return e.lineTo(i.x,i.y);e.bezierCurveTo(s?t.cp1x:t.cp2x,s?t.cp1y:t.cp2y,s?i.cp2x:i.cp1x,s?i.cp2y:i.cp1y,i.x,i.y)}function Mg(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),T(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function Cg(e,t,i,s,n){if(n.strikethrough||n.underline){const o=e.measureText(s),r=t-o.actualBoundingBoxLeft,a=t+o.actualBoundingBoxRight,l=i-o.actualBoundingBoxAscent,c=i+o.actualBoundingBoxDescent,h=n.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=n.decorationWidth||2,e.moveTo(r,h),e.lineTo(a,h),e.stroke()}}function Ag(e,t){const i=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=i}function ze(e,t,i,s,n,o={}){const r=q(t)?t:[t],a=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(e.save(),e.font=n.string,Mg(e,o),l=0;l<r.length;++l)c=r[l],o.backdrop&&Ag(e,o.backdrop),a&&(o.strokeColor&&(e.strokeStyle=o.strokeColor),T(o.strokeWidth)||(e.lineWidth=o.strokeWidth),e.strokeText(c,i,s,o.maxWidth)),e.fillText(c,i,s,o.maxWidth),Cg(e,i,s,c,o),s+=Number(n.lineHeight);e.restore()}function qi(e,t){const{x:i,y:s,w:n,h:o,radius:r}=t;e.arc(i+r.topLeft,s+r.topLeft,r.topLeft,1.5*B,B,!0),e.lineTo(i,s+o-r.bottomLeft),e.arc(i+r.bottomLeft,s+o-r.bottomLeft,r.bottomLeft,B,tt,!0),e.lineTo(i+n-r.bottomRight,s+o),e.arc(i+n-r.bottomRight,s+o-r.bottomRight,r.bottomRight,tt,0,!0),e.lineTo(i+n,s+r.topRight),e.arc(i+n-r.topRight,s+r.topRight,r.topRight,0,-tt,!0),e.lineTo(i+r.topLeft,s)}const Eg=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Pg=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function $g(e,t){const i=(""+e).match(Eg);if(!i||i[1]==="normal")return t*1.2;switch(e=+i[2],i[3]){case"px":return e;case"%":e/=100;break}return t*e}const Og=e=>+e||0;function ir(e,t){const i={},s=L(t),n=s?Object.keys(t):t,o=L(e)?s?r=>O(e[r],e[t[r]]):r=>e[r]:()=>e;for(const r of n)i[r]=Og(o(r));return i}function th(e){return ir(e,{top:"y",right:"x",bottom:"y",left:"x"})}function Pe(e){return ir(e,["topLeft","topRight","bottomLeft","bottomRight"])}function rt(e){const t=th(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function nt(e,t){e=e||{},t=t||X.font;let i=O(e.size,t.size);typeof i=="string"&&(i=parseInt(i,10));let s=O(e.style,t.style);s&&!(""+s).match(Pg)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const n={family:O(e.family,t.family),lineHeight:$g(O(e.lineHeight,t.lineHeight),i),size:i,style:s,weight:O(e.weight,t.weight),string:""};return n.string=_g(n),n}function U(e,t,i,s){let n,o,r;for(n=0,o=e.length;n<o;++n)if(r=e[n],r!==void 0&&(t!==void 0&&typeof r=="function"&&(r=r(t)),i!==void 0&&q(r)&&(r=r[i%r.length]),r!==void 0))return r}function Tg(e,t,i){const{min:s,max:n}=e,o=Nc(t,(n-s)/2),r=(a,l)=>i&&a===0?0:a+l;return{min:r(s,-Math.abs(o)),max:r(n,o)}}function be(e,t){return Object.assign(Object.create(e),t)}function sr(e,t=[""],i,s,n=()=>e[0]){const o=i||e;typeof s>"u"&&(s=nh("_fallback",e));const r={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:o,_fallback:s,_getTarget:n,override:a=>sr([a,...e],t,o,s)};return new Proxy(r,{deleteProperty(a,l){return delete a[l],delete a._keys,delete e[0][l],!0},get(a,l){return ih(a,l,()=>jg(l,t,e,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,l){return ua(a).includes(l)},ownKeys(a){return ua(a)},set(a,l,c){const h=a._storage||(a._storage=n());return a[l]=h[l]=c,delete a._keys,!0}})}function ei(e,t,i,s){const n={_cacheable:!1,_proxy:e,_context:t,_subProxy:i,_stack:new Set,_descriptors:eh(e,s),setContext:o=>ei(e,o,i,s),override:o=>ei(e.override(o),t,i,s)};return new Proxy(n,{deleteProperty(o,r){return delete o[r],delete e[r],!0},get(o,r,a){return ih(o,r,()=>zg(o,r,a))},getOwnPropertyDescriptor(o,r){return o._descriptors.allKeys?Reflect.has(e,r)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,r)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(o,r){return Reflect.has(e,r)},ownKeys(){return Reflect.ownKeys(e)},set(o,r,a){return e[r]=a,delete o[r],!0}})}function eh(e,t={scriptable:!0,indexable:!0}){const{_scriptable:i=t.scriptable,_indexable:s=t.indexable,_allKeys:n=t.allKeys}=e;return{allKeys:n,scriptable:i,indexable:s,isScriptable:ue(i)?i:()=>i,isIndexable:ue(s)?s:()=>s}}const Dg=(e,t)=>e?e+Ko(t):t,nr=(e,t)=>L(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function ih(e,t,i){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const s=i();return e[t]=s,s}function zg(e,t,i){const{_proxy:s,_context:n,_subProxy:o,_descriptors:r}=e;let a=s[t];return ue(a)&&r.isScriptable(t)&&(a=Lg(t,a,e,i)),q(a)&&a.length&&(a=Rg(t,a,e,r.isIndexable)),nr(t,a)&&(a=ei(a,n,o&&o[t],r)),a}function Lg(e,t,i,s){const{_proxy:n,_context:o,_subProxy:r,_stack:a}=i;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let l=t(o,r||s);return a.delete(e),nr(e,l)&&(l=or(n._scopes,n,e,l)),l}function Rg(e,t,i,s){const{_proxy:n,_context:o,_subProxy:r,_descriptors:a}=i;if(typeof o.index<"u"&&s(e))return t[o.index%t.length];if(L(t[0])){const l=t,c=n._scopes.filter(h=>h!==l);t=[];for(const h of l){const d=or(c,n,e,h);t.push(ei(d,o,r&&r[e],a))}}return t}function sh(e,t,i){return ue(e)?e(t,i):e}const Ig=(e,t)=>e===!0?t:typeof e=="string"?de(t,e):void 0;function Fg(e,t,i,s,n){for(const o of t){const r=Ig(i,o);if(r){e.add(r);const a=sh(r._fallback,i,n);if(typeof a<"u"&&a!==i&&a!==s)return a}else if(r===!1&&typeof s<"u"&&i!==s)return null}return!1}function or(e,t,i,s){const n=t._rootScopes,o=sh(t._fallback,i,s),r=[...e,...n],a=new Set;a.add(s);let l=da(a,r,i,o||i,s);return l===null||typeof o<"u"&&o!==i&&(l=da(a,r,o,l,s),l===null)?!1:sr(Array.from(a),[""],n,o,()=>Bg(t,i,s))}function da(e,t,i,s,n){for(;i;)i=Fg(e,t,i,s,n);return i}function Bg(e,t,i){const s=e._getTarget();t in s||(s[t]={});const n=s[t];return q(n)&&L(i)?i:n||{}}function jg(e,t,i,s){let n;for(const o of t)if(n=nh(Dg(o,e),i),typeof n<"u")return nr(e,n)?or(i,s,e,n):n}function nh(e,t){for(const i of t){if(!i)continue;const s=i[e];if(typeof s<"u")return s}}function ua(e){let t=e._keys;return t||(t=e._keys=Hg(e._scopes)),t}function Hg(e){const t=new Set;for(const i of e)for(const s of Object.keys(i).filter(n=>!n.startsWith("_")))t.add(s);return Array.from(t)}function oh(e,t,i,s){const{iScale:n}=e,{key:o="r"}=this._parsing,r=new Array(s);let a,l,c,h;for(a=0,l=s;a<l;++a)c=a+i,h=t[c],r[a]={r:n.parse(de(h,o),c)};return r}const Ng=Number.EPSILON||1e-14,ii=(e,t)=>t<e.length&&!e[t].skip&&e[t],rh=e=>e==="x"?"y":"x";function Vg(e,t,i,s){const n=e.skip?t:e,o=t,r=i.skip?t:i,a=go(o,n),l=go(r,o);let c=a/(a+l),h=l/(a+l);c=isNaN(c)?0:c,h=isNaN(h)?0:h;const d=s*c,u=s*h;return{previous:{x:o.x-d*(r.x-n.x),y:o.y-d*(r.y-n.y)},next:{x:o.x+u*(r.x-n.x),y:o.y+u*(r.y-n.y)}}}function Wg(e,t,i){const s=e.length;let n,o,r,a,l,c=ii(e,0);for(let h=0;h<s-1;++h)if(l=c,c=ii(e,h+1),!(!l||!c)){if(Pi(t[h],0,Ng)){i[h]=i[h+1]=0;continue}n=i[h]/t[h],o=i[h+1]/t[h],a=Math.pow(n,2)+Math.pow(o,2),!(a<=9)&&(r=3/Math.sqrt(a),i[h]=n*r*t[h],i[h+1]=o*r*t[h])}}function Ug(e,t,i="x"){const s=rh(i),n=e.length;let o,r,a,l=ii(e,0);for(let c=0;c<n;++c){if(r=a,a=l,l=ii(e,c+1),!a)continue;const h=a[i],d=a[s];r&&(o=(h-r[i])/3,a[`cp1${i}`]=h-o,a[`cp1${s}`]=d-o*t[c]),l&&(o=(l[i]-h)/3,a[`cp2${i}`]=h+o,a[`cp2${s}`]=d+o*t[c])}}function qg(e,t="x"){const i=rh(t),s=e.length,n=Array(s).fill(0),o=Array(s);let r,a,l,c=ii(e,0);for(r=0;r<s;++r)if(a=l,l=c,c=ii(e,r+1),!!l){if(c){const h=c[t]-l[t];n[r]=h!==0?(c[i]-l[i])/h:0}o[r]=a?c?zt(n[r-1])!==zt(n[r])?0:(n[r-1]+n[r])/2:n[r-1]:n[r]}Wg(e,n,o),Ug(e,o,t)}function vs(e,t,i){return Math.max(Math.min(e,i),t)}function Yg(e,t){let i,s,n,o,r,a=qt(e[0],t);for(i=0,s=e.length;i<s;++i)r=o,o=a,a=i<s-1&&qt(e[i+1],t),o&&(n=e[i],r&&(n.cp1x=vs(n.cp1x,t.left,t.right),n.cp1y=vs(n.cp1y,t.top,t.bottom)),a&&(n.cp2x=vs(n.cp2x,t.left,t.right),n.cp2y=vs(n.cp2y,t.top,t.bottom)))}function Xg(e,t,i,s,n){let o,r,a,l;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")qg(e,n);else{let c=s?e[e.length-1]:e[0];for(o=0,r=e.length;o<r;++o)a=e[o],l=Vg(c,a,e[Math.min(o+1,r-(s?0:1))%r],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&Yg(e,i)}function rr(){return typeof window<"u"&&typeof document<"u"}function ar(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function nn(e,t,i){let s;return typeof e=="string"?(s=parseInt(e,10),e.indexOf("%")!==-1&&(s=s/100*t.parentNode[i])):s=e,s}const An=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function Gg(e,t){return An(e).getPropertyValue(t)}const Zg=["top","right","bottom","left"];function $e(e,t,i){const s={};i=i?"-"+i:"";for(let n=0;n<4;n++){const o=Zg[n];s[o]=parseFloat(e[t+"-"+o+i])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const Kg=(e,t,i)=>(e>0||t>0)&&(!i||!i.shadowRoot);function Jg(e,t){const i=e.touches,s=i&&i.length?i[0]:e,{offsetX:n,offsetY:o}=s;let r=!1,a,l;if(Kg(n,o,e.target))a=n,l=o;else{const c=t.getBoundingClientRect();a=s.clientX-c.left,l=s.clientY-c.top,r=!0}return{x:a,y:l,box:r}}function Me(e,t){if("native"in e)return e;const{canvas:i,currentDevicePixelRatio:s}=t,n=An(i),o=n.boxSizing==="border-box",r=$e(n,"padding"),a=$e(n,"border","width"),{x:l,y:c,box:h}=Jg(e,i),d=r.left+(h&&a.left),u=r.top+(h&&a.top);let{width:f,height:g}=t;return o&&(f-=r.width+a.width,g-=r.height+a.height),{x:Math.round((l-d)/f*i.width/s),y:Math.round((c-u)/g*i.height/s)}}function Qg(e,t,i){let s,n;if(t===void 0||i===void 0){const o=e&&ar(e);if(!o)t=e.clientWidth,i=e.clientHeight;else{const r=o.getBoundingClientRect(),a=An(o),l=$e(a,"border","width"),c=$e(a,"padding");t=r.width-c.width-l.width,i=r.height-c.height-l.height,s=nn(a.maxWidth,o,"clientWidth"),n=nn(a.maxHeight,o,"clientHeight")}}return{width:t,height:i,maxWidth:s||en,maxHeight:n||en}}const oe=e=>Math.round(e*10)/10;function tm(e,t,i,s){const n=An(e),o=$e(n,"margin"),r=nn(n.maxWidth,e,"clientWidth")||en,a=nn(n.maxHeight,e,"clientHeight")||en,l=Qg(e,t,i);let{width:c,height:h}=l;if(n.boxSizing==="content-box"){const d=$e(n,"border","width"),u=$e(n,"padding");c-=u.width+d.width,h-=u.height+d.height}return c=Math.max(0,c-o.width),h=Math.max(0,s?c/s:h-o.height),c=oe(Math.min(c,r,l.maxWidth)),h=oe(Math.min(h,a,l.maxHeight)),c&&!h&&(h=oe(c/2)),(t!==void 0||i!==void 0)&&s&&l.height&&h>l.height&&(h=l.height,c=oe(Math.floor(h*s))),{width:c,height:h}}function fa(e,t,i){const s=t||1,n=oe(e.height*s),o=oe(e.width*s);e.height=oe(e.height),e.width=oe(e.width);const r=e.canvas;return r.style&&(i||!r.style.height&&!r.style.width)&&(r.style.height=`${e.height}px`,r.style.width=`${e.width}px`),e.currentDevicePixelRatio!==s||r.height!==n||r.width!==o?(e.currentDevicePixelRatio=s,r.height=n,r.width=o,e.ctx.setTransform(s,0,0,s,0,0),!0):!1}const em=function(){let e=!1;try{const t={get passive(){return e=!0,!1}};rr()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e}();function pa(e,t){const i=Gg(e,t),s=i&&i.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function Ce(e,t,i,s){return{x:e.x+i*(t.x-e.x),y:e.y+i*(t.y-e.y)}}function im(e,t,i,s){return{x:e.x+i*(t.x-e.x),y:s==="middle"?i<.5?e.y:t.y:s==="after"?i<1?e.y:t.y:i>0?t.y:e.y}}function sm(e,t,i,s){const n={x:e.cp2x,y:e.cp2y},o={x:t.cp1x,y:t.cp1y},r=Ce(e,n,i),a=Ce(n,o,i),l=Ce(o,t,i),c=Ce(r,a,i),h=Ce(a,l,i);return Ce(c,h,i)}const nm=function(e,t){return{x(i){return e+e+t-i},setWidth(i){t=i},textAlign(i){return i==="center"?i:i==="right"?"left":"right"},xPlus(i,s){return i-s},leftForLtr(i,s){return i-s}}},om=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Ue(e,t,i){return e?nm(t,i):om()}function ah(e,t){let i,s;(t==="ltr"||t==="rtl")&&(i=e.canvas.style,s=[i.getPropertyValue("direction"),i.getPropertyPriority("direction")],i.setProperty("direction",t,"important"),e.prevTextDirection=s)}function lh(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function ch(e){return e==="angle"?{between:Ui,compare:rg,normalize:ht}:{between:Wt,compare:(t,i)=>t-i,normalize:t=>t}}function ga({start:e,end:t,count:i,loop:s,style:n}){return{start:e%i,end:t%i,loop:s&&(t-e+1)%i===0,style:n}}function rm(e,t,i){const{property:s,start:n,end:o}=i,{between:r,normalize:a}=ch(s),l=t.length;let{start:c,end:h,loop:d}=e,u,f;if(d){for(c+=l,h+=l,u=0,f=l;u<f&&r(a(t[c%l][s]),n,o);++u)c--,h--;c%=l,h%=l}return h<c&&(h+=l),{start:c,end:h,loop:d,style:e.style}}function hh(e,t,i){if(!i)return[e];const{property:s,start:n,end:o}=i,r=t.length,{compare:a,between:l,normalize:c}=ch(s),{start:h,end:d,loop:u,style:f}=rm(e,t,i),g=[];let p=!1,m=null,b,y,_;const x=()=>l(n,_,b)&&a(n,_)!==0,w=()=>a(o,b)===0||l(o,_,b),k=()=>p||x(),M=()=>!p||w();for(let A=h,P=h;A<=d;++A)y=t[A%r],!y.skip&&(b=c(y[s]),b!==_&&(p=l(b,n,o),m===null&&k()&&(m=a(b,n)===0?A:P),m!==null&&M()&&(g.push(ga({start:m,end:A,loop:u,count:r,style:f})),m=null),P=A,_=b));return m!==null&&g.push(ga({start:m,end:d,loop:u,count:r,style:f})),g}function dh(e,t){const i=[],s=e.segments;for(let n=0;n<s.length;n++){const o=hh(s[n],e.points,t);o.length&&i.push(...o)}return i}function am(e,t,i,s){let n=0,o=t-1;if(i&&!s)for(;n<t&&!e[n].skip;)n++;for(;n<t&&e[n].skip;)n++;for(n%=t,i&&(o+=n);o>n&&e[o%t].skip;)o--;return o%=t,{start:n,end:o}}function lm(e,t,i,s){const n=e.length,o=[];let r=t,a=e[t],l;for(l=t+1;l<=i;++l){const c=e[l%n];c.skip||c.stop?a.skip||(s=!1,o.push({start:t%n,end:(l-1)%n,loop:s}),t=r=c.stop?l:null):(r=l,a.skip&&(t=l)),a=c}return r!==null&&o.push({start:t%n,end:r%n,loop:s}),o}function cm(e,t){const i=e.points,s=e.options.spanGaps,n=i.length;if(!n)return[];const o=!!e._loop,{start:r,end:a}=am(i,n,o,s);if(s===!0)return ma(e,[{start:r,end:a,loop:o}],i,t);const l=a<r?a+n:a,c=!!e._fullLoop&&r===0&&a===n-1;return ma(e,lm(i,r,l,c),i,t)}function ma(e,t,i,s){return!s||!s.setContext||!i?t:hm(e,t,i,s)}function hm(e,t,i,s){const n=e._chart.getContext(),o=ba(e.options),{_datasetIndex:r,options:{spanGaps:a}}=e,l=i.length,c=[];let h=o,d=t[0].start,u=d;function f(g,p,m,b){const y=a?-1:1;if(g!==p){for(g+=l;i[g%l].skip;)g-=y;for(;i[p%l].skip;)p+=y;g%l!==p%l&&(c.push({start:g%l,end:p%l,loop:m,style:b}),h=b,d=p%l)}}for(const g of t){d=a?d:g.start;let p=i[d%l],m;for(u=d+1;u<=g.end;u++){const b=i[u%l];m=ba(s.setContext(be(n,{type:"segment",p0:p,p1:b,p0DataIndex:(u-1)%l,p1DataIndex:u%l,datasetIndex:r}))),dm(m,h)&&f(d,u-1,g.loop,h),p=b,h=m}d<u-1&&f(d,u-1,g.loop,h)}return c}function ba(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function dm(e,t){if(!t)return!1;const i=[],s=function(n,o){return er(o)?(i.includes(o)||i.push(o),i.indexOf(o)):o};return JSON.stringify(e,s)!==JSON.stringify(t,s)}function xs(e,t,i){return e.options.clip?e[i]:t[i]}function um(e,t){const{xScale:i,yScale:s}=e;return i&&s?{left:xs(i,t,"left"),right:xs(i,t,"right"),top:xs(s,t,"top"),bottom:xs(s,t,"bottom")}:t}function uh(e,t){const i=t._clip;if(i.disabled)return!1;const s=um(t,e.chartArea);return{left:i.left===!1?0:s.left-(i.left===!0?0:i.left),right:i.right===!1?e.width:s.right+(i.right===!0?0:i.right),top:i.top===!1?0:s.top-(i.top===!0?0:i.top),bottom:i.bottom===!1?e.height:s.bottom+(i.bottom===!0?0:i.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class fm{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,i,s,n){const o=i.listeners[n],r=i.duration;o.forEach(a=>a({chart:t,initial:i.initial,numSteps:r,currentStep:Math.min(s-i.start,r)}))}_refresh(){this._request||(this._running=!0,this._request=Xc.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let i=0;this._charts.forEach((s,n)=>{if(!s.running||!s.items.length)return;const o=s.items;let r=o.length-1,a=!1,l;for(;r>=0;--r)l=o[r],l._active?(l._total>s.duration&&(s.duration=l._total),l.tick(t),a=!0):(o[r]=o[o.length-1],o.pop());a&&(n.draw(),this._notify(n,s,t,"progress")),o.length||(s.running=!1,this._notify(n,s,t,"complete"),s.initial=!1),i+=o.length}),this._lastDate=t,i===0&&(this._running=!1)}_getAnims(t){const i=this._charts;let s=i.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},i.set(t,s)),s}listen(t,i,s){this._getAnims(t).listeners[i].push(s)}add(t,i){!i||!i.length||this._getAnims(t).items.push(...i)}has(t){return this._getAnims(t).items.length>0}start(t){const i=this._charts.get(t);i&&(i.running=!0,i.start=Date.now(),i.duration=i.items.reduce((s,n)=>Math.max(s,n._duration),0),this._refresh())}running(t){if(!this._running)return!1;const i=this._charts.get(t);return!(!i||!i.running||!i.items.length)}stop(t){const i=this._charts.get(t);if(!i||!i.items.length)return;const s=i.items;let n=s.length-1;for(;n>=0;--n)s[n].cancel();i.items=[],this._notify(t,i,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var jt=new fm;const ya="transparent",pm={boolean(e,t,i){return i>.5?t:e},color(e,t,i){const s=la(e||ya),n=s.valid&&la(t||ya);return n&&n.valid?n.mix(s,i).hexString():t},number(e,t,i){return e+(t-e)*i}};class gm{constructor(t,i,s,n){const o=i[s];n=U([t.to,n,o,t.from]);const r=U([t.from,o,n]);this._active=!0,this._fn=t.fn||pm[t.type||typeof r],this._easing=$i[t.easing]||$i.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=i,this._prop=s,this._from=r,this._to=n,this._promises=void 0}active(){return this._active}update(t,i,s){if(this._active){this._notify(!1);const n=this._target[this._prop],o=s-this._start,r=this._duration-o;this._start=s,this._duration=Math.floor(Math.max(r,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=U([t.to,i,n,t.from]),this._from=U([t.from,n,i])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const i=t-this._start,s=this._duration,n=this._prop,o=this._from,r=this._loop,a=this._to;let l;if(this._active=o!==a&&(r||i<s),!this._active){this._target[n]=a,this._notify(!0);return}if(i<0){this._target[n]=o;return}l=i/s%2,l=r&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[n]=this._fn(o,a,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((i,s)=>{t.push({res:i,rej:s})})}_notify(t){const i=t?"res":"rej",s=this._promises||[];for(let n=0;n<s.length;n++)s[n][i]()}}class fh{constructor(t,i){this._chart=t,this._properties=new Map,this.configure(i)}configure(t){if(!L(t))return;const i=Object.keys(X.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(n=>{const o=t[n];if(!L(o))return;const r={};for(const a of i)r[a]=o[a];(q(o.properties)&&o.properties||[n]).forEach(a=>{(a===n||!s.has(a))&&s.set(a,r)})})}_animateOptions(t,i){const s=i.options,n=bm(t,s);if(!n)return[];const o=this._createAnimations(n,s);return s.$shared&&mm(t.options.$animations,s).then(()=>{t.options=s},()=>{}),o}_createAnimations(t,i){const s=this._properties,n=[],o=t.$animations||(t.$animations={}),r=Object.keys(i),a=Date.now();let l;for(l=r.length-1;l>=0;--l){const c=r[l];if(c.charAt(0)==="$")continue;if(c==="options"){n.push(...this._animateOptions(t,i));continue}const h=i[c];let d=o[c];const u=s.get(c);if(d)if(u&&d.active()){d.update(u,h,a);continue}else d.cancel();if(!u||!u.duration){t[c]=h;continue}o[c]=d=new gm(u,t,c,h),n.push(d)}return n}update(t,i){if(this._properties.size===0){Object.assign(t,i);return}const s=this._createAnimations(t,i);if(s.length)return jt.add(this._chart,s),!0}}function mm(e,t){const i=[],s=Object.keys(t);for(let n=0;n<s.length;n++){const o=e[s[n]];o&&o.active()&&i.push(o.wait())}return Promise.all(i)}function bm(e,t){if(!t)return;let i=e.options;if(!i){e.options=t;return}return i.$shared&&(e.options=i=Object.assign({},i,{$shared:!1,$animations:{}})),i}function va(e,t){const i=e&&e.options||{},s=i.reverse,n=i.min===void 0?t:0,o=i.max===void 0?t:0;return{start:s?o:n,end:s?n:o}}function ym(e,t,i){if(i===!1)return!1;const s=va(e,i),n=va(t,i);return{top:n.end,right:s.end,bottom:n.start,left:s.start}}function vm(e){let t,i,s,n;return L(e)?(t=e.top,i=e.right,s=e.bottom,n=e.left):t=i=s=n=e,{top:t,right:i,bottom:s,left:n,disabled:e===!1}}function ph(e,t){const i=[],s=e._getSortedDatasetMetas(t);let n,o;for(n=0,o=s.length;n<o;++n)i.push(s[n].index);return i}function xa(e,t,i,s={}){const n=e.keys,o=s.mode==="single";let r,a,l,c;if(t===null)return;let h=!1;for(r=0,a=n.length;r<a;++r){if(l=+n[r],l===i){if(h=!0,s.all)continue;break}c=e.values[l],J(c)&&(o||t===0||zt(t)===zt(c))&&(t+=c)}return!h&&!s.all?0:t}function xm(e,t){const{iScale:i,vScale:s}=t,n=i.axis==="x"?"x":"y",o=s.axis==="x"?"x":"y",r=Object.keys(e),a=new Array(r.length);let l,c,h;for(l=0,c=r.length;l<c;++l)h=r[l],a[l]={[n]:h,[o]:e[h]};return a}function Hn(e,t){const i=e&&e.options.stacked;return i||i===void 0&&t.stack!==void 0}function _m(e,t,i){return`${e.id}.${t.id}.${i.stack||i.type}`}function wm(e){const{min:t,max:i,minDefined:s,maxDefined:n}=e.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:n?i:Number.POSITIVE_INFINITY}}function km(e,t,i){const s=e[t]||(e[t]={});return s[i]||(s[i]={})}function _a(e,t,i,s){for(const n of t.getMatchingVisibleMetas(s).reverse()){const o=e[n.index];if(i&&o>0||!i&&o<0)return n.index}return null}function wa(e,t){const{chart:i,_cachedMeta:s}=e,n=i._stacks||(i._stacks={}),{iScale:o,vScale:r,index:a}=s,l=o.axis,c=r.axis,h=_m(o,r,s),d=t.length;let u;for(let f=0;f<d;++f){const g=t[f],{[l]:p,[c]:m}=g,b=g._stacks||(g._stacks={});u=b[c]=km(n,h,p),u[a]=m,u._top=_a(u,r,!0,s.type),u._bottom=_a(u,r,!1,s.type);const y=u._visualValues||(u._visualValues={});y[a]=m}}function Nn(e,t){const i=e.scales;return Object.keys(i).filter(s=>i[s].axis===t).shift()}function Sm(e,t){return be(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Mm(e,t,i){return be(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:i,index:t,mode:"default",type:"data"})}function gi(e,t){const i=e.controller.index,s=e.vScale&&e.vScale.axis;if(s){t=t||e._parsed;for(const n of t){const o=n._stacks;if(!o||o[s]===void 0||o[s][i]===void 0)return;delete o[s][i],o[s]._visualValues!==void 0&&o[s]._visualValues[i]!==void 0&&delete o[s]._visualValues[i]}}}const Vn=e=>e==="reset"||e==="none",ka=(e,t)=>t?e:Object.assign({},e),Cm=(e,t,i)=>e&&!t.hidden&&t._stacked&&{keys:ph(i,!0),values:null};class Et{constructor(t,i){this.chart=t,this._ctx=t.ctx,this.index=i,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Hn(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&gi(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,i=this._cachedMeta,s=this.getDataset(),n=(d,u,f,g)=>d==="x"?u:d==="r"?g:f,o=i.xAxisID=O(s.xAxisID,Nn(t,"x")),r=i.yAxisID=O(s.yAxisID,Nn(t,"y")),a=i.rAxisID=O(s.rAxisID,Nn(t,"r")),l=i.indexAxis,c=i.iAxisID=n(l,o,r,a),h=i.vAxisID=n(l,r,o,a);i.xScale=this.getScaleForId(o),i.yScale=this.getScaleForId(r),i.rScale=this.getScaleForId(a),i.iScale=this.getScaleForId(c),i.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const i=this._cachedMeta;return t===i.iScale?i.vScale:i.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&oa(this._data,this),t._stacked&&gi(t)}_dataCheck(){const t=this.getDataset(),i=t.data||(t.data=[]),s=this._data;if(L(i)){const n=this._cachedMeta;this._data=xm(i,n)}else if(s!==i){if(s){oa(s,this);const n=this._cachedMeta;gi(n),n._parsed=[]}i&&Object.isExtensible(i)&&hg(i,this),this._syncList=[],this._data=i}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const i=this._cachedMeta,s=this.getDataset();let n=!1;this._dataCheck();const o=i._stacked;i._stacked=Hn(i.vScale,i),i.stack!==s.stack&&(n=!0,gi(i),i.stack=s.stack),this._resyncElements(t),(n||o!==i._stacked)&&(wa(this,i._parsed),i._stacked=Hn(i.vScale,i))}configure(){const t=this.chart.config,i=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),i,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,i){const{_cachedMeta:s,_data:n}=this,{iScale:o,_stacked:r}=s,a=o.axis;let l=t===0&&i===n.length?!0:s._sorted,c=t>0&&s._parsed[t-1],h,d,u;if(this._parsing===!1)s._parsed=n,s._sorted=!0,u=n;else{q(n[t])?u=this.parseArrayData(s,n,t,i):L(n[t])?u=this.parseObjectData(s,n,t,i):u=this.parsePrimitiveData(s,n,t,i);const f=()=>d[a]===null||c&&d[a]<c[a];for(h=0;h<i;++h)s._parsed[h+t]=d=u[h],l&&(f()&&(l=!1),c=d);s._sorted=l}r&&wa(this,u)}parsePrimitiveData(t,i,s,n){const{iScale:o,vScale:r}=t,a=o.axis,l=r.axis,c=o.getLabels(),h=o===r,d=new Array(n);let u,f,g;for(u=0,f=n;u<f;++u)g=u+s,d[u]={[a]:h||o.parse(c[g],g),[l]:r.parse(i[g],g)};return d}parseArrayData(t,i,s,n){const{xScale:o,yScale:r}=t,a=new Array(n);let l,c,h,d;for(l=0,c=n;l<c;++l)h=l+s,d=i[h],a[l]={x:o.parse(d[0],h),y:r.parse(d[1],h)};return a}parseObjectData(t,i,s,n){const{xScale:o,yScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(n);let h,d,u,f;for(h=0,d=n;h<d;++h)u=h+s,f=i[u],c[h]={x:o.parse(de(f,a),u),y:r.parse(de(f,l),u)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,i,s){const n=this.chart,o=this._cachedMeta,r=i[t.axis],a={keys:ph(n,!0),values:i._stacks[t.axis]._visualValues};return xa(a,r,o.index,{mode:s})}updateRangeFromParsed(t,i,s,n){const o=s[i.axis];let r=o===null?NaN:o;const a=n&&s._stacks[i.axis];n&&a&&(n.values=a,r=xa(n,o,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,i){const s=this._cachedMeta,n=s._parsed,o=s._sorted&&t===s.iScale,r=n.length,a=this._getOtherScale(t),l=Cm(i,s,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:d}=wm(a);let u,f;function g(){f=n[u];const p=f[a.axis];return!J(f[t.axis])||h>p||d<p}for(u=0;u<r&&!(!g()&&(this.updateRangeFromParsed(c,t,f,l),o));++u);if(o){for(u=r-1;u>=0;--u)if(!g()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){const i=this._cachedMeta._parsed,s=[];let n,o,r;for(n=0,o=i.length;n<o;++n)r=i[n][t.axis],J(r)&&s.push(r);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const i=this._cachedMeta,s=i.iScale,n=i.vScale,o=this.getParsed(t);return{label:s?""+s.getLabelForValue(o[s.axis]):"",value:n?""+n.getLabelForValue(o[n.axis]):""}}_update(t){const i=this._cachedMeta;this.update(t||"default"),i._clip=vm(O(this.options.clip,ym(i.xScale,i.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,i=this.chart,s=this._cachedMeta,n=s.data||[],o=i.chartArea,r=[],a=this._drawStart||0,l=this._drawCount||n.length-a,c=this.options.drawActiveElementsOnTop;let h;for(s.dataset&&s.dataset.draw(t,o,a,l),h=a;h<a+l;++h){const d=n[h];d.hidden||(d.active&&c?r.push(d):d.draw(t,o))}for(h=0;h<r.length;++h)r[h].draw(t,o)}getStyle(t,i){const s=i?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,i,s){const n=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const r=this._cachedMeta.data[t];o=r.$context||(r.$context=Mm(this.getContext(),t,r)),o.parsed=this.getParsed(t),o.raw=n.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=Sm(this.chart.getContext(),this.index)),o.dataset=n,o.index=o.datasetIndex=this.index;return o.active=!!i,o.mode=s,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,i){return this._resolveElementOptions(this.dataElementType.id,i,t)}_resolveElementOptions(t,i="default",s){const n=i==="active",o=this._cachedDataOpts,r=t+"-"+i,a=o[r],l=this.enableOptionSharing&&Wi(s);if(a)return ka(a,l);const c=this.chart.config,h=c.datasetElementScopeKeys(this._type,t),d=n?[`${t}Hover`,"hover",t,""]:[t,""],u=c.getOptionScopes(this.getDataset(),h),f=Object.keys(X.elements[t]),g=()=>this.getContext(s,n,i),p=c.resolveNamedOptions(u,f,g,d);return p.$shared&&(p.$shared=l,o[r]=Object.freeze(ka(p,l))),p}_resolveAnimations(t,i,s){const n=this.chart,o=this._cachedDataOpts,r=`animation-${i}`,a=o[r];if(a)return a;let l;if(n.options.animation!==!1){const h=this.chart.config,d=h.datasetAnimationScopeKeys(this._type,i),u=h.getOptionScopes(this.getDataset(),d);l=h.createResolver(u,this.getContext(t,s,i))}const c=new fh(n,l&&l.animations);return l&&l._cacheable&&(o[r]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,i){return!i||Vn(t)||this.chart._animationsDisabled}_getSharedOptions(t,i){const s=this.resolveDataElementOptions(t,i),n=this._sharedOptions,o=this.getSharedOptions(s),r=this.includeOptions(i,o)||o!==n;return this.updateSharedOptions(o,i,s),{sharedOptions:o,includeOptions:r}}updateElement(t,i,s,n){Vn(n)?Object.assign(t,s):this._resolveAnimations(i,n).update(t,s)}updateSharedOptions(t,i,s){t&&!Vn(i)&&this._resolveAnimations(void 0,i).update(t,s)}_setStyle(t,i,s,n){t.active=n;const o=this.getStyle(i,n);this._resolveAnimations(i,s,n).update(t,{options:!n&&this.getSharedOptions(o)||o})}removeHoverStyle(t,i,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,i,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const i=this._data,s=this._cachedMeta.data;for(const[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];const n=s.length,o=i.length,r=Math.min(o,n);r&&this.parse(0,r),o>n?this._insertElements(n,o-n,t):o<n&&this._removeElements(o,n-o)}_insertElements(t,i,s=!0){const n=this._cachedMeta,o=n.data,r=t+i;let a;const l=c=>{for(c.length+=i,a=c.length-1;a>=r;a--)c[a]=c[a-i]};for(l(o),a=t;a<r;++a)o[a]=new this.dataElementType;this._parsing&&l(n._parsed),this.parse(t,i),s&&this.updateElements(o,t,i,"reset")}updateElements(t,i,s,n){}_removeElements(t,i){const s=this._cachedMeta;if(this._parsing){const n=s._parsed.splice(t,i);s._stacked&&gi(s,n)}s.data.splice(t,i)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[i,s,n]=t;this[i](s,n)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,i){i&&this._sync(["_removeElements",t,i]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}C(Et,"defaults",{}),C(Et,"datasetElementType",null),C(Et,"dataElementType",null);function Am(e,t){if(!e._cache.$bar){const i=e.getMatchingVisibleMetas(t);let s=[];for(let n=0,o=i.length;n<o;n++)s=s.concat(i[n].controller.getAllParsedValues(e));e._cache.$bar=Yc(s.sort((n,o)=>n-o))}return e._cache.$bar}function Em(e){const t=e.iScale,i=Am(t,e.type);let s=t._length,n,o,r,a;const l=()=>{r===32767||r===-32768||(Wi(a)&&(s=Math.min(s,Math.abs(r-a)||s)),a=r)};for(n=0,o=i.length;n<o;++n)r=t.getPixelForValue(i[n]),l();for(a=void 0,n=0,o=t.ticks.length;n<o;++n)r=t.getPixelForTick(n),l();return s}function Pm(e,t,i,s){const n=i.barThickness;let o,r;return T(n)?(o=t.min*i.categoryPercentage,r=i.barPercentage):(o=n*s,r=1),{chunk:o/s,ratio:r,start:t.pixels[e]-o/2}}function $m(e,t,i,s){const n=t.pixels,o=n[e];let r=e>0?n[e-1]:null,a=e<n.length-1?n[e+1]:null;const l=i.categoryPercentage;r===null&&(r=o-(a===null?t.end-t.start:a-o)),a===null&&(a=o+o-r);const c=o-(o-Math.min(r,a))/2*l;return{chunk:Math.abs(a-r)/2*l/s,ratio:i.barPercentage,start:c}}function Om(e,t,i,s){const n=i.parse(e[0],s),o=i.parse(e[1],s),r=Math.min(n,o),a=Math.max(n,o);let l=r,c=a;Math.abs(r)>Math.abs(a)&&(l=a,c=r),t[i.axis]=c,t._custom={barStart:l,barEnd:c,start:n,end:o,min:r,max:a}}function gh(e,t,i,s){return q(e)?Om(e,t,i,s):t[i.axis]=i.parse(e,s),t}function Sa(e,t,i,s){const n=e.iScale,o=e.vScale,r=n.getLabels(),a=n===o,l=[];let c,h,d,u;for(c=i,h=i+s;c<h;++c)u=t[c],d={},d[n.axis]=a||n.parse(r[c],c),l.push(gh(u,d,o,c));return l}function Wn(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function Tm(e,t,i){return e!==0?zt(e):(t.isHorizontal()?1:-1)*(t.min>=i?1:-1)}function Dm(e){let t,i,s,n,o;return e.horizontal?(t=e.base>e.x,i="left",s="right"):(t=e.base<e.y,i="bottom",s="top"),t?(n="end",o="start"):(n="start",o="end"),{start:i,end:s,reverse:t,top:n,bottom:o}}function zm(e,t,i,s){let n=t.borderSkipped;const o={};if(!n){e.borderSkipped=o;return}if(n===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:r,end:a,reverse:l,top:c,bottom:h}=Dm(e);n==="middle"&&i&&(e.enableBorderRadius=!0,(i._top||0)===s?n=c:(i._bottom||0)===s?n=h:(o[Ma(h,r,a,l)]=!0,n=c)),o[Ma(n,r,a,l)]=!0,e.borderSkipped=o}function Ma(e,t,i,s){return s?(e=Lm(e,t,i),e=Ca(e,i,t)):e=Ca(e,t,i),e}function Lm(e,t,i){return e===t?i:e===i?t:e}function Ca(e,t,i){return e==="start"?t:e==="end"?i:e}function Rm(e,{inflateAmount:t},i){e.inflateAmount=t==="auto"?i===1?.33:0:t}class Rs extends Et{parsePrimitiveData(t,i,s,n){return Sa(t,i,s,n)}parseArrayData(t,i,s,n){return Sa(t,i,s,n)}parseObjectData(t,i,s,n){const{iScale:o,vScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=o.axis==="x"?a:l,h=r.axis==="x"?a:l,d=[];let u,f,g,p;for(u=s,f=s+n;u<f;++u)p=i[u],g={},g[o.axis]=o.parse(de(p,c),u),d.push(gh(de(p,h),g,r,u));return d}updateRangeFromParsed(t,i,s,n){super.updateRangeFromParsed(t,i,s,n);const o=s._custom;o&&i===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const i=this._cachedMeta,{iScale:s,vScale:n}=i,o=this.getParsed(t),r=o._custom,a=Wn(r)?"["+r.start+", "+r.end+"]":""+n.getLabelForValue(o[n.axis]);return{label:""+s.getLabelForValue(o[s.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const i=this._cachedMeta;this.updateElements(i.data,0,i.data.length,t)}updateElements(t,i,s,n){const o=n==="reset",{index:r,_cachedMeta:{vScale:a}}=this,l=a.getBasePixel(),c=a.isHorizontal(),h=this._getRuler(),{sharedOptions:d,includeOptions:u}=this._getSharedOptions(i,n);for(let f=i;f<i+s;f++){const g=this.getParsed(f),p=o||T(g[a.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),m=this._calculateBarIndexPixels(f,h),b=(g._stacks||{})[a.axis],y={horizontal:c,base:p.base,enableBorderRadius:!b||Wn(g._custom)||r===b._top||r===b._bottom,x:c?p.head:m.center,y:c?m.center:p.head,height:c?m.size:Math.abs(p.size),width:c?Math.abs(p.size):m.size};u&&(y.options=d||this.resolveDataElementOptions(f,t[f].active?"active":n));const _=y.options||t[f].options;zm(y,_,b,r),Rm(y,_,h.ratio),this.updateElement(t[f],f,y,n)}}_getStacks(t,i){const{iScale:s}=this._cachedMeta,n=s.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),o=s.options.stacked,r=[],a=this._cachedMeta.controller.getParsed(i),l=a&&a[s.axis],c=h=>{const d=h._parsed.find(f=>f[s.axis]===l),u=d&&d[h.vScale.axis];if(T(u)||isNaN(u))return!0};for(const h of n)if(!(i!==void 0&&c(h))&&((o===!1||r.indexOf(h.stack)===-1||o===void 0&&h.stack===void 0)&&r.push(h.stack),h.index===t))break;return r.length||r.push(void 0),r}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,i=this.chart.options.indexAxis;return Object.keys(t).filter(s=>t[s].axis===i).shift()}_getAxis(){const t={},i=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)t[O(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,i)]=!0;return Object.keys(t)}_getStackIndex(t,i,s){const n=this._getStacks(t,s),o=i!==void 0?n.indexOf(i):-1;return o===-1?n.length-1:o}_getRuler(){const t=this.options,i=this._cachedMeta,s=i.iScale,n=[];let o,r;for(o=0,r=i.data.length;o<r;++o)n.push(s.getPixelForValue(this.getParsed(o)[s.axis],o));const a=t.barThickness;return{min:a||Em(i),pixels:n,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:i,_stacked:s,index:n},options:{base:o,minBarLength:r}}=this,a=o||0,l=this.getParsed(t),c=l._custom,h=Wn(c);let d=l[i.axis],u=0,f=s?this.applyStack(i,l,s):d,g,p;f!==d&&(u=f-d,f=d),h&&(d=c.barStart,f=c.barEnd-c.barStart,d!==0&&zt(d)!==zt(c.barEnd)&&(u=0),u+=d);const m=!T(o)&&!h?o:u;let b=i.getPixelForValue(m);if(this.chart.getDataVisibility(t)?g=i.getPixelForValue(u+f):g=b,p=g-b,Math.abs(p)<r){p=Tm(p,i,a)*r,d===a&&(b-=p/2);const y=i.getPixelForDecimal(0),_=i.getPixelForDecimal(1),x=Math.min(y,_),w=Math.max(y,_);b=Math.max(Math.min(b,w),x),g=b+p,s&&!h&&(l._stacks[i.axis]._visualValues[n]=i.getValueForPixel(g)-i.getValueForPixel(b))}if(b===i.getPixelForValue(a)){const y=zt(p)*i.getLineWidthForValue(a)/2;b+=y,p-=y}return{size:p,base:b,head:g,center:g+p/2}}_calculateBarIndexPixels(t,i){const s=i.scale,n=this.options,o=n.skipNull,r=O(n.maxBarThickness,1/0);let a,l;const c=this._getAxisCount();if(i.grouped){const h=o?this._getStackCount(t):i.stackCount,d=n.barThickness==="flex"?$m(t,i,n,h*c):Pm(t,i,n,h*c),u=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(O(u,this.getFirstScaleIdForIndexAxis())),g=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0)+f;a=d.start+d.chunk*g+d.chunk/2,l=Math.min(r,d.chunk*d.ratio)}else a=s.getPixelForValue(this.getParsed(t)[s.axis],t),l=Math.min(r,i.min*i.ratio);return{base:a-l/2,head:a+l/2,center:a,size:l}}draw(){const t=this._cachedMeta,i=t.vScale,s=t.data,n=s.length;let o=0;for(;o<n;++o)this.getParsed(o)[i.axis]!==null&&!s[o].hidden&&s[o].draw(this._ctx)}}C(Rs,"id","bar"),C(Rs,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),C(Rs,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class Is extends Et{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,i,s,n){const o=super.parsePrimitiveData(t,i,s,n);for(let r=0;r<o.length;r++)o[r]._custom=this.resolveDataElementOptions(r+s).radius;return o}parseArrayData(t,i,s,n){const o=super.parseArrayData(t,i,s,n);for(let r=0;r<o.length;r++){const a=i[s+r];o[r]._custom=O(a[2],this.resolveDataElementOptions(r+s).radius)}return o}parseObjectData(t,i,s,n){const o=super.parseObjectData(t,i,s,n);for(let r=0;r<o.length;r++){const a=i[s+r];o[r]._custom=O(a&&a.r&&+a.r,this.resolveDataElementOptions(r+s).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let i=0;for(let s=t.length-1;s>=0;--s)i=Math.max(i,t[s].size(this.resolveDataElementOptions(s))/2);return i>0&&i}getLabelAndValue(t){const i=this._cachedMeta,s=this.chart.data.labels||[],{xScale:n,yScale:o}=i,r=this.getParsed(t),a=n.getLabelForValue(r.x),l=o.getLabelForValue(r.y),c=r._custom;return{label:s[t]||"",value:"("+a+", "+l+(c?", "+c:"")+")"}}update(t){const i=this._cachedMeta.data;this.updateElements(i,0,i.length,t)}updateElements(t,i,s,n){const o=n==="reset",{iScale:r,vScale:a}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(i,n),h=r.axis,d=a.axis;for(let u=i;u<i+s;u++){const f=t[u],g=!o&&this.getParsed(u),p={},m=p[h]=o?r.getPixelForDecimal(.5):r.getPixelForValue(g[h]),b=p[d]=o?a.getBasePixel():a.getPixelForValue(g[d]);p.skip=isNaN(m)||isNaN(b),c&&(p.options=l||this.resolveDataElementOptions(u,f.active?"active":n),o&&(p.options.radius=0)),this.updateElement(f,u,p,n)}}resolveDataElementOptions(t,i){const s=this.getParsed(t);let n=super.resolveDataElementOptions(t,i);n.$shared&&(n=Object.assign({},n,{$shared:!1}));const o=n.radius;return i!=="active"&&(n.radius=0),n.radius+=O(s&&s._custom,o),n}}C(Is,"id","bubble"),C(Is,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),C(Is,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function Im(e,t,i){let s=1,n=1,o=0,r=0;if(t<Y){const a=e,l=a+t,c=Math.cos(a),h=Math.sin(a),d=Math.cos(l),u=Math.sin(l),f=(_,x,w)=>Ui(_,a,l,!0)?1:Math.max(x,x*i,w,w*i),g=(_,x,w)=>Ui(_,a,l,!0)?-1:Math.min(x,x*i,w,w*i),p=f(0,c,d),m=f(tt,h,u),b=g(B,c,d),y=g(B+tt,h,u);s=(p-b)/2,n=(m-y)/2,o=-(p+b)/2,r=-(m+y)/2}return{ratioX:s,ratioY:n,offsetX:o,offsetY:r}}class Ee extends Et{constructor(t,i){super(t,i),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,i){const s=this.getDataset().data,n=this._cachedMeta;if(this._parsing===!1)n._parsed=s;else{let o=l=>+s[l];if(L(s[t])){const{key:l="value"}=this._parsing;o=c=>+de(s[c],l)}let r,a;for(r=t,a=t+i;r<a;++r)n._parsed[r]=o(r)}}_getRotation(){return At(this.options.rotation-90)}_getCircumference(){return At(this.options.circumference)}_getRotationExtents(){let t=Y,i=-Y;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const n=this.chart.getDatasetMeta(s).controller,o=n._getRotation(),r=n._getCircumference();t=Math.min(t,o),i=Math.max(i,o+r)}return{rotation:t,circumference:i-t}}update(t){const i=this.chart,{chartArea:s}=i,n=this._cachedMeta,o=n.data,r=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,a=Math.max((Math.min(s.width,s.height)-r)/2,0),l=Math.min(Gp(this.options.cutout,a),1),c=this._getRingWeight(this.index),{circumference:h,rotation:d}=this._getRotationExtents(),{ratioX:u,ratioY:f,offsetX:g,offsetY:p}=Im(d,h,l),m=(s.width-r)/u,b=(s.height-r)/f,y=Math.max(Math.min(m,b)/2,0),_=Nc(this.options.radius,y),x=Math.max(_*l,0),w=(_-x)/this._getVisibleDatasetWeightTotal();this.offsetX=g*_,this.offsetY=p*_,n.total=this.calculateTotal(),this.outerRadius=_-w*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-w*c,0),this.updateElements(o,0,o.length,t)}_circumference(t,i){const s=this.options,n=this._cachedMeta,o=this._getCircumference();return i&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||n._parsed[t]===null||n.data[t].hidden?0:this.calculateCircumference(n._parsed[t]*o/Y)}updateElements(t,i,s,n){const o=n==="reset",r=this.chart,a=r.chartArea,l=r.options.animation,c=(a.left+a.right)/2,h=(a.top+a.bottom)/2,d=o&&l.animateScale,u=d?0:this.innerRadius,f=d?0:this.outerRadius,{sharedOptions:g,includeOptions:p}=this._getSharedOptions(i,n);let m=this._getRotation(),b;for(b=0;b<i;++b)m+=this._circumference(b,o);for(b=i;b<i+s;++b){const y=this._circumference(b,o),_=t[b],x={x:c+this.offsetX,y:h+this.offsetY,startAngle:m,endAngle:m+y,circumference:y,outerRadius:f,innerRadius:u};p&&(x.options=g||this.resolveDataElementOptions(b,_.active?"active":n)),m+=y,this.updateElement(_,b,x,n)}}calculateTotal(){const t=this._cachedMeta,i=t.data;let s=0,n;for(n=0;n<i.length;n++){const o=t._parsed[n];o!==null&&!isNaN(o)&&this.chart.getDataVisibility(n)&&!i[n].hidden&&(s+=Math.abs(o))}return s}calculateCircumference(t){const i=this._cachedMeta.total;return i>0&&!isNaN(t)?Y*(Math.abs(t)/i):0}getLabelAndValue(t){const i=this._cachedMeta,s=this.chart,n=s.data.labels||[],o=ds(i._parsed[t],s.options.locale);return{label:n[t]||"",value:o}}getMaxBorderWidth(t){let i=0;const s=this.chart;let n,o,r,a,l;if(!t){for(n=0,o=s.data.datasets.length;n<o;++n)if(s.isDatasetVisible(n)){r=s.getDatasetMeta(n),t=r.data,a=r.controller;break}}if(!t)return 0;for(n=0,o=t.length;n<o;++n)l=a.resolveDataElementOptions(n),l.borderAlign!=="inner"&&(i=Math.max(i,l.borderWidth||0,l.hoverBorderWidth||0));return i}getMaxOffset(t){let i=0;for(let s=0,n=t.length;s<n;++s){const o=this.resolveDataElementOptions(s);i=Math.max(i,o.offset||0,o.hoverOffset||0)}return i}_getRingWeightOffset(t){let i=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(i+=this._getRingWeight(s));return i}_getRingWeight(t){return Math.max(O(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}C(Ee,"id","doughnut"),C(Ee,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),C(Ee,"descriptors",{_scriptable:e=>e!=="spacing",_indexable:e=>e!=="spacing"&&!e.startsWith("borderDash")&&!e.startsWith("hoverBorderDash")}),C(Ee,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const t=e.data,{labels:{pointStyle:i,textAlign:s,color:n,useBorderRadius:o,borderRadius:r}}=e.legend.options;return t.labels.length&&t.datasets.length?t.labels.map((a,l)=>{const c=e.getDatasetMeta(0).controller.getStyle(l);return{text:a,fillStyle:c.backgroundColor,fontColor:n,hidden:!e.getDataVisibility(l),lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:c.borderWidth,strokeStyle:c.borderColor,textAlign:s,pointStyle:i,borderRadius:o&&(r||c.borderRadius),index:l}}):[]}},onClick(e,t,i){i.chart.toggleDataVisibility(t.index),i.chart.update()}}}});class Fs extends Et{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const i=this._cachedMeta,{dataset:s,data:n=[],_dataset:o}=i,r=this.chart._animationsDisabled;let{start:a,count:l}=Zc(i,n,r);this._drawStart=a,this._drawCount=l,Kc(i)&&(a=0,l=n.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!o._decimated,s.points=n;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(s,void 0,{animated:!r,options:c},t),this.updateElements(n,a,l,t)}updateElements(t,i,s,n){const o=n==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:h,includeOptions:d}=this._getSharedOptions(i,n),u=r.axis,f=a.axis,{spanGaps:g,segment:p}=this.options,m=ti(g)?g:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||o||n==="none",y=i+s,_=t.length;let x=i>0&&this.getParsed(i-1);for(let w=0;w<_;++w){const k=t[w],M=b?k:{};if(w<i||w>=y){M.skip=!0;continue}const A=this.getParsed(w),P=T(A[f]),E=M[u]=r.getPixelForValue(A[u],w),D=M[f]=o||P?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,A,l):A[f],w);M.skip=isNaN(E)||isNaN(D)||P,M.stop=w>0&&Math.abs(A[u]-x[u])>m,p&&(M.parsed=A,M.raw=c.data[w]),d&&(M.options=h||this.resolveDataElementOptions(w,k.active?"active":n)),b||this.updateElement(k,w,M,n),x=A}}getMaxOverflow(){const t=this._cachedMeta,i=t.dataset,s=i.options&&i.options.borderWidth||0,n=t.data||[];if(!n.length)return s;const o=n[0].size(this.resolveDataElementOptions(0)),r=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(s,o,r)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}C(Fs,"id","line"),C(Fs,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),C(Fs,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Ti extends Et{constructor(t,i){super(t,i),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const i=this._cachedMeta,s=this.chart,n=s.data.labels||[],o=ds(i._parsed[t].r,s.options.locale);return{label:n[t]||"",value:o}}parseObjectData(t,i,s,n){return oh.bind(this)(t,i,s,n)}update(t){const i=this._cachedMeta.data;this._updateRadius(),this.updateElements(i,0,i.length,t)}getMinMax(){const t=this._cachedMeta,i={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((s,n)=>{const o=this.getParsed(n).r;!isNaN(o)&&this.chart.getDataVisibility(n)&&(o<i.min&&(i.min=o),o>i.max&&(i.max=o))}),i}_updateRadius(){const t=this.chart,i=t.chartArea,s=t.options,n=Math.min(i.right-i.left,i.bottom-i.top),o=Math.max(n/2,0),r=Math.max(s.cutoutPercentage?o/100*s.cutoutPercentage:1,0),a=(o-r)/t.getVisibleDatasetCount();this.outerRadius=o-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,i,s,n){const o=n==="reset",r=this.chart,a=r.options.animation,l=this._cachedMeta.rScale,c=l.xCenter,h=l.yCenter,d=l.getIndexAngle(0)-.5*B;let u=d,f;const g=360/this.countVisibleElements();for(f=0;f<i;++f)u+=this._computeAngle(f,n,g);for(f=i;f<i+s;f++){const p=t[f];let m=u,b=u+this._computeAngle(f,n,g),y=r.getDataVisibility(f)?l.getDistanceFromCenterForValue(this.getParsed(f).r):0;u=b,o&&(a.animateScale&&(y=0),a.animateRotate&&(m=b=d));const _={x:c,y:h,innerRadius:0,outerRadius:y,startAngle:m,endAngle:b,options:this.resolveDataElementOptions(f,p.active?"active":n)};this.updateElement(p,f,_,n)}}countVisibleElements(){const t=this._cachedMeta;let i=0;return t.data.forEach((s,n)=>{!isNaN(this.getParsed(n).r)&&this.chart.getDataVisibility(n)&&i++}),i}_computeAngle(t,i,s){return this.chart.getDataVisibility(t)?At(this.resolveDataElementOptions(t,i).angle||s):0}}C(Ti,"id","polarArea"),C(Ti,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),C(Ti,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const t=e.data;if(t.labels.length&&t.datasets.length){const{labels:{pointStyle:i,color:s}}=e.legend.options;return t.labels.map((n,o)=>{const r=e.getDatasetMeta(0).controller.getStyle(o);return{text:n,fillStyle:r.backgroundColor,strokeStyle:r.borderColor,fontColor:s,lineWidth:r.borderWidth,pointStyle:i,hidden:!e.getDataVisibility(o),index:o}})}return[]}},onClick(e,t,i){i.chart.toggleDataVisibility(t.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class yo extends Ee{}C(yo,"id","pie"),C(yo,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class Bs extends Et{getLabelAndValue(t){const i=this._cachedMeta.vScale,s=this.getParsed(t);return{label:i.getLabels()[t],value:""+i.getLabelForValue(s[i.axis])}}parseObjectData(t,i,s,n){return oh.bind(this)(t,i,s,n)}update(t){const i=this._cachedMeta,s=i.dataset,n=i.data||[],o=i.iScale.getLabels();if(s.points=n,t!=="resize"){const r=this.resolveDatasetElementOptions(t);this.options.showLine||(r.borderWidth=0);const a={_loop:!0,_fullLoop:o.length===n.length,options:r};this.updateElement(s,void 0,a,t)}this.updateElements(n,0,n.length,t)}updateElements(t,i,s,n){const o=this._cachedMeta.rScale,r=n==="reset";for(let a=i;a<i+s;a++){const l=t[a],c=this.resolveDataElementOptions(a,l.active?"active":n),h=o.getPointPositionForValue(a,this.getParsed(a).r),d=r?o.xCenter:h.x,u=r?o.yCenter:h.y,f={x:d,y:u,angle:h.angle,skip:isNaN(d)||isNaN(u),options:c};this.updateElement(l,a,f,n)}}}C(Bs,"id","radar"),C(Bs,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),C(Bs,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class js extends Et{getLabelAndValue(t){const i=this._cachedMeta,s=this.chart.data.labels||[],{xScale:n,yScale:o}=i,r=this.getParsed(t),a=n.getLabelForValue(r.x),l=o.getLabelForValue(r.y);return{label:s[t]||"",value:"("+a+", "+l+")"}}update(t){const i=this._cachedMeta,{data:s=[]}=i,n=this.chart._animationsDisabled;let{start:o,count:r}=Zc(i,s,n);if(this._drawStart=o,this._drawCount=r,Kc(i)&&(o=0,r=s.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:l}=i;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!l._decimated,a.points=s;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!n,options:c},t)}else this.datasetElementType&&(delete i.dataset,this.datasetElementType=!1);this.updateElements(s,o,r,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,i,s,n){const o=n==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,h=this.resolveDataElementOptions(i,n),d=this.getSharedOptions(h),u=this.includeOptions(n,d),f=r.axis,g=a.axis,{spanGaps:p,segment:m}=this.options,b=ti(p)?p:Number.POSITIVE_INFINITY,y=this.chart._animationsDisabled||o||n==="none";let _=i>0&&this.getParsed(i-1);for(let x=i;x<i+s;++x){const w=t[x],k=this.getParsed(x),M=y?w:{},A=T(k[g]),P=M[f]=r.getPixelForValue(k[f],x),E=M[g]=o||A?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,k,l):k[g],x);M.skip=isNaN(P)||isNaN(E)||A,M.stop=x>0&&Math.abs(k[f]-_[f])>b,m&&(M.parsed=k,M.raw=c.data[x]),u&&(M.options=d||this.resolveDataElementOptions(x,w.active?"active":n)),y||this.updateElement(w,x,M,n),_=k}this.updateSharedOptions(d,n,h)}getMaxOverflow(){const t=this._cachedMeta,i=t.data||[];if(!this.options.showLine){let a=0;for(let l=i.length-1;l>=0;--l)a=Math.max(a,i[l].size(this.resolveDataElementOptions(l))/2);return a>0&&a}const s=t.dataset,n=s.options&&s.options.borderWidth||0;if(!i.length)return n;const o=i[0].size(this.resolveDataElementOptions(0)),r=i[i.length-1].size(this.resolveDataElementOptions(i.length-1));return Math.max(n,o,r)/2}}C(js,"id","scatter"),C(js,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),C(js,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var Fm=Object.freeze({__proto__:null,BarController:Rs,BubbleController:Is,DoughnutController:Ee,LineController:Fs,PieController:yo,PolarAreaController:Ti,RadarController:Bs,ScatterController:js});function ke(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class lr{constructor(t){C(this,"options"),this.options=t||{}}static override(t){Object.assign(lr.prototype,t)}init(){}formats(){return ke()}parse(){return ke()}format(){return ke()}add(){return ke()}diff(){return ke()}startOf(){return ke()}endOf(){return ke()}}var Bm={_date:lr};function jm(e,t,i,s){const{controller:n,data:o,_sorted:r}=e,a=n._cachedMeta.iScale,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&r&&o.length){const c=a._reversePixels?lg:Ut;if(s){if(n._sharedOptions){const h=o[0],d=typeof h.getRange=="function"&&h.getRange(t);if(d){const u=c(o,t,i-d),f=c(o,t,i+d);return{lo:u.lo,hi:f.hi}}}}else{const h=c(o,t,i);if(l){const{vScale:d}=n._cachedMeta,{_parsed:u}=e,f=u.slice(0,h.lo+1).reverse().findIndex(p=>!T(p[d.axis]));h.lo-=Math.max(0,f);const g=u.slice(h.hi).findIndex(p=>!T(p[d.axis]));h.hi+=Math.max(0,g)}return h}}return{lo:0,hi:o.length-1}}function En(e,t,i,s,n){const o=e.getSortedVisibleDatasetMetas(),r=i[t];for(let a=0,l=o.length;a<l;++a){const{index:c,data:h}=o[a],{lo:d,hi:u}=jm(o[a],t,r,n);for(let f=d;f<=u;++f){const g=h[f];g.skip||s(g,c,f)}}}function Hm(e){const t=e.indexOf("x")!==-1,i=e.indexOf("y")!==-1;return function(s,n){const o=t?Math.abs(s.x-n.x):0,r=i?Math.abs(s.y-n.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(r,2))}}function Un(e,t,i,s,n){const o=[];return!n&&!e.isPointInArea(t)||En(e,i,t,function(r,a,l){!n&&!qt(r,e.chartArea,0)||r.inRange(t.x,t.y,s)&&o.push({element:r,datasetIndex:a,index:l})},!0),o}function Nm(e,t,i,s){let n=[];function o(r,a,l){const{startAngle:c,endAngle:h}=r.getProps(["startAngle","endAngle"],s),{angle:d}=Uc(r,{x:t.x,y:t.y});Ui(d,c,h)&&n.push({element:r,datasetIndex:a,index:l})}return En(e,i,t,o),n}function Vm(e,t,i,s,n,o){let r=[];const a=Hm(i);let l=Number.POSITIVE_INFINITY;function c(h,d,u){const f=h.inRange(t.x,t.y,n);if(s&&!f)return;const g=h.getCenterPoint(n);if(!(o||e.isPointInArea(g))&&!f)return;const p=a(t,g);p<l?(r=[{element:h,datasetIndex:d,index:u}],l=p):p===l&&r.push({element:h,datasetIndex:d,index:u})}return En(e,i,t,c),r}function qn(e,t,i,s,n,o){return!o&&!e.isPointInArea(t)?[]:i==="r"&&!s?Nm(e,t,i,n):Vm(e,t,i,s,n,o)}function Aa(e,t,i,s,n){const o=[],r=i==="x"?"inXRange":"inYRange";let a=!1;return En(e,i,t,(l,c,h)=>{l[r]&&l[r](t[i],n)&&(o.push({element:l,datasetIndex:c,index:h}),a=a||l.inRange(t.x,t.y,n))}),s&&!a?[]:o}var Wm={modes:{index(e,t,i,s){const n=Me(t,e),o=i.axis||"x",r=i.includeInvisible||!1,a=i.intersect?Un(e,n,o,s,r):qn(e,n,o,!1,s,r),l=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const h=a[0].index,d=c.data[h];d&&!d.skip&&l.push({element:d,datasetIndex:c.index,index:h})}),l):[]},dataset(e,t,i,s){const n=Me(t,e),o=i.axis||"xy",r=i.includeInvisible||!1;let a=i.intersect?Un(e,n,o,s,r):qn(e,n,o,!1,s,r);if(a.length>0){const l=a[0].datasetIndex,c=e.getDatasetMeta(l).data;a=[];for(let h=0;h<c.length;++h)a.push({element:c[h],datasetIndex:l,index:h})}return a},point(e,t,i,s){const n=Me(t,e),o=i.axis||"xy",r=i.includeInvisible||!1;return Un(e,n,o,s,r)},nearest(e,t,i,s){const n=Me(t,e),o=i.axis||"xy",r=i.includeInvisible||!1;return qn(e,n,o,i.intersect,s,r)},x(e,t,i,s){const n=Me(t,e);return Aa(e,n,"x",i.intersect,s)},y(e,t,i,s){const n=Me(t,e);return Aa(e,n,"y",i.intersect,s)}}};const mh=["left","top","right","bottom"];function mi(e,t){return e.filter(i=>i.pos===t)}function Ea(e,t){return e.filter(i=>mh.indexOf(i.pos)===-1&&i.box.axis===t)}function bi(e,t){return e.sort((i,s)=>{const n=t?s:i,o=t?i:s;return n.weight===o.weight?n.index-o.index:n.weight-o.weight})}function Um(e){const t=[];let i,s,n,o,r,a;for(i=0,s=(e||[]).length;i<s;++i)n=e[i],{position:o,options:{stack:r,stackWeight:a=1}}=n,t.push({index:i,box:n,pos:o,horizontal:n.isHorizontal(),weight:n.weight,stack:r&&o+r,stackWeight:a});return t}function qm(e){const t={};for(const i of e){const{stack:s,pos:n,stackWeight:o}=i;if(!s||!mh.includes(n))continue;const r=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});r.count++,r.weight+=o}return t}function Ym(e,t){const i=qm(e),{vBoxMaxWidth:s,hBoxMaxHeight:n}=t;let o,r,a;for(o=0,r=e.length;o<r;++o){a=e[o];const{fullSize:l}=a.box,c=i[a.stack],h=c&&a.stackWeight/c.weight;a.horizontal?(a.width=h?h*s:l&&t.availableWidth,a.height=n):(a.width=s,a.height=h?h*n:l&&t.availableHeight)}return i}function Xm(e){const t=Um(e),i=bi(t.filter(c=>c.box.fullSize),!0),s=bi(mi(t,"left"),!0),n=bi(mi(t,"right")),o=bi(mi(t,"top"),!0),r=bi(mi(t,"bottom")),a=Ea(t,"x"),l=Ea(t,"y");return{fullSize:i,leftAndTop:s.concat(o),rightAndBottom:n.concat(l).concat(r).concat(a),chartArea:mi(t,"chartArea"),vertical:s.concat(n).concat(l),horizontal:o.concat(r).concat(a)}}function Pa(e,t,i,s){return Math.max(e[i],t[i])+Math.max(e[s],t[s])}function bh(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function Gm(e,t,i,s){const{pos:n,box:o}=i,r=e.maxPadding;if(!L(n)){i.size&&(e[n]-=i.size);const d=s[i.stack]||{size:0,count:1};d.size=Math.max(d.size,i.horizontal?o.height:o.width),i.size=d.size/d.count,e[n]+=i.size}o.getPadding&&bh(r,o.getPadding());const a=Math.max(0,t.outerWidth-Pa(r,e,"left","right")),l=Math.max(0,t.outerHeight-Pa(r,e,"top","bottom")),c=a!==e.w,h=l!==e.h;return e.w=a,e.h=l,i.horizontal?{same:c,other:h}:{same:h,other:c}}function Zm(e){const t=e.maxPadding;function i(s){const n=Math.max(t[s]-e[s],0);return e[s]+=n,n}e.y+=i("top"),e.x+=i("left"),i("right"),i("bottom")}function Km(e,t){const i=t.maxPadding;function s(n){const o={left:0,top:0,right:0,bottom:0};return n.forEach(r=>{o[r]=Math.max(t[r],i[r])}),o}return s(e?["left","right"]:["top","bottom"])}function wi(e,t,i,s){const n=[];let o,r,a,l,c,h;for(o=0,r=e.length,c=0;o<r;++o){a=e[o],l=a.box,l.update(a.width||t.w,a.height||t.h,Km(a.horizontal,t));const{same:d,other:u}=Gm(t,i,a,s);c|=d&&n.length,h=h||u,l.fullSize||n.push(a)}return c&&wi(n,t,i,s)||h}function _s(e,t,i,s,n){e.top=i,e.left=t,e.right=t+s,e.bottom=i+n,e.width=s,e.height=n}function $a(e,t,i,s){const n=i.padding;let{x:o,y:r}=t;for(const a of e){const l=a.box,c=s[a.stack]||{placed:0,weight:1},h=a.stackWeight/c.weight||1;if(a.horizontal){const d=t.w*h,u=c.size||l.height;Wi(c.start)&&(r=c.start),l.fullSize?_s(l,n.left,r,i.outerWidth-n.right-n.left,u):_s(l,t.left+c.placed,r,d,u),c.start=r,c.placed+=d,r=l.bottom}else{const d=t.h*h,u=c.size||l.width;Wi(c.start)&&(o=c.start),l.fullSize?_s(l,o,n.top,u,i.outerHeight-n.bottom-n.top):_s(l,o,t.top+c.placed,u,d),c.start=o,c.placed+=d,o=l.right}}t.x=o,t.y=r}var dt={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(i){t.draw(i)}}]},e.boxes.push(t)},removeBox(e,t){const i=e.boxes?e.boxes.indexOf(t):-1;i!==-1&&e.boxes.splice(i,1)},configure(e,t,i){t.fullSize=i.fullSize,t.position=i.position,t.weight=i.weight},update(e,t,i,s){if(!e)return;const n=rt(e.options.layout.padding),o=Math.max(t-n.width,0),r=Math.max(i-n.height,0),a=Xm(e.boxes),l=a.vertical,c=a.horizontal;H(e.boxes,p=>{typeof p.beforeLayout=="function"&&p.beforeLayout()});const h=l.reduce((p,m)=>m.box.options&&m.box.options.display===!1?p:p+1,0)||1,d=Object.freeze({outerWidth:t,outerHeight:i,padding:n,availableWidth:o,availableHeight:r,vBoxMaxWidth:o/2/h,hBoxMaxHeight:r/2}),u=Object.assign({},n);bh(u,rt(s));const f=Object.assign({maxPadding:u,w:o,h:r,x:n.left,y:n.top},n),g=Ym(l.concat(c),d);wi(a.fullSize,f,d,g),wi(l,f,d,g),wi(c,f,d,g)&&wi(l,f,d,g),Zm(f),$a(a.leftAndTop,f,d,g),f.x+=f.w,f.y+=f.h,$a(a.rightAndBottom,f,d,g),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},H(a.chartArea,p=>{const m=p.box;Object.assign(m,e.chartArea),m.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class yh{acquireContext(t,i){}releaseContext(t){return!1}addEventListener(t,i,s){}removeEventListener(t,i,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,i,s,n){return i=Math.max(0,i||t.width),s=s||t.height,{width:i,height:Math.max(0,n?Math.floor(i/n):s)}}isAttached(t){return!0}updateConfig(t){}}class Jm extends yh{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Hs="$chartjs",Qm={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Oa=e=>e===null||e==="";function tb(e,t){const i=e.style,s=e.getAttribute("height"),n=e.getAttribute("width");if(e[Hs]={initial:{height:s,width:n,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",i.boxSizing=i.boxSizing||"border-box",Oa(n)){const o=pa(e,"width");o!==void 0&&(e.width=o)}if(Oa(s))if(e.style.height==="")e.height=e.width/(t||2);else{const o=pa(e,"height");o!==void 0&&(e.height=o)}return e}const vh=em?{passive:!0}:!1;function eb(e,t,i){e&&e.addEventListener(t,i,vh)}function ib(e,t,i){e&&e.canvas&&e.canvas.removeEventListener(t,i,vh)}function sb(e,t){const i=Qm[e.type]||e.type,{x:s,y:n}=Me(e,t);return{type:i,chart:t,native:e,x:s!==void 0?s:null,y:n!==void 0?n:null}}function on(e,t){for(const i of e)if(i===t||i.contains(t))return!0}function nb(e,t,i){const s=e.canvas,n=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||on(a.addedNodes,s),r=r&&!on(a.removedNodes,s);r&&i()});return n.observe(document,{childList:!0,subtree:!0}),n}function ob(e,t,i){const s=e.canvas,n=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||on(a.removedNodes,s),r=r&&!on(a.addedNodes,s);r&&i()});return n.observe(document,{childList:!0,subtree:!0}),n}const Yi=new Map;let Ta=0;function xh(){const e=window.devicePixelRatio;e!==Ta&&(Ta=e,Yi.forEach((t,i)=>{i.currentDevicePixelRatio!==e&&t()}))}function rb(e,t){Yi.size||window.addEventListener("resize",xh),Yi.set(e,t)}function ab(e){Yi.delete(e),Yi.size||window.removeEventListener("resize",xh)}function lb(e,t,i){const s=e.canvas,n=s&&ar(s);if(!n)return;const o=Gc((a,l)=>{const c=n.clientWidth;i(a,l),c<n.clientWidth&&i()},window),r=new ResizeObserver(a=>{const l=a[0],c=l.contentRect.width,h=l.contentRect.height;c===0&&h===0||o(c,h)});return r.observe(n),rb(e,o),r}function Yn(e,t,i){i&&i.disconnect(),t==="resize"&&ab(e)}function cb(e,t,i){const s=e.canvas,n=Gc(o=>{e.ctx!==null&&i(sb(o,e))},e);return eb(s,t,n),n}class hb extends yh{acquireContext(t,i){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(tb(t,i),s):null}releaseContext(t){const i=t.canvas;if(!i[Hs])return!1;const s=i[Hs].initial;["height","width"].forEach(o=>{const r=s[o];T(r)?i.removeAttribute(o):i.setAttribute(o,r)});const n=s.style||{};return Object.keys(n).forEach(o=>{i.style[o]=n[o]}),i.width=i.width,delete i[Hs],!0}addEventListener(t,i,s){this.removeEventListener(t,i);const n=t.$proxies||(t.$proxies={}),o={attach:nb,detach:ob,resize:lb}[i]||cb;n[i]=o(t,i,s)}removeEventListener(t,i){const s=t.$proxies||(t.$proxies={}),n=s[i];n&&(({attach:Yn,detach:Yn,resize:Yn}[i]||ib)(t,i,n),s[i]=void 0)}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,i,s,n){return tm(t,i,s,n)}isAttached(t){const i=t&&ar(t);return!!(i&&i.isConnected)}}function db(e){return!rr()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?Jm:hb}var ws;let Qt=(ws=class{constructor(){C(this,"x"),C(this,"y"),C(this,"active",!1),C(this,"options"),C(this,"$animations")}tooltipPosition(e){const{x:t,y:i}=this.getProps(["x","y"],e);return{x:t,y:i}}hasValue(){return ti(this.x)&&ti(this.y)}getProps(e,t){const i=this.$animations;if(!t||!i)return this;const s={};return e.forEach(n=>{s[n]=i[n]&&i[n].active()?i[n]._to:this[n]}),s}},C(ws,"defaults",{}),C(ws,"defaultRoutes"),ws);function ub(e,t){const i=e.options.ticks,s=fb(e),n=Math.min(i.maxTicksLimit||s,s),o=i.major.enabled?gb(t):[],r=o.length,a=o[0],l=o[r-1],c=[];if(r>n)return mb(t,c,o,r/n),c;const h=pb(o,t,n);if(r>0){let d,u;const f=r>1?Math.round((l-a)/(r-1)):null;for(ks(t,c,h,T(f)?0:a-f,a),d=0,u=r-1;d<u;d++)ks(t,c,h,o[d],o[d+1]);return ks(t,c,h,l,T(f)?t.length:l+f),c}return ks(t,c,h),c}function fb(e){const t=e.options.offset,i=e._tickSize(),s=e._length/i+(t?0:1),n=e._maxLength/i;return Math.floor(Math.min(s,n))}function pb(e,t,i){const s=bb(e),n=t.length/i;if(!s)return Math.max(n,1);const o=sg(s);for(let r=0,a=o.length-1;r<a;r++){const l=o[r];if(l>n)return l}return Math.max(n,1)}function gb(e){const t=[];let i,s;for(i=0,s=e.length;i<s;i++)e[i].major&&t.push(i);return t}function mb(e,t,i,s){let n=0,o=i[0],r;for(s=Math.ceil(s),r=0;r<e.length;r++)r===o&&(t.push(e[r]),n++,o=i[n*s])}function ks(e,t,i,s,n){const o=O(s,0),r=Math.min(O(n,e.length),e.length);let a=0,l,c,h;for(i=Math.ceil(i),n&&(l=n-s,i=l/Math.floor(l/i)),h=o;h<0;)a++,h=Math.round(o+a*i);for(c=Math.max(o,0);c<r;c++)c===h&&(t.push(e[c]),a++,h=Math.round(o+a*i))}function bb(e){const t=e.length;let i,s;if(t<2)return!1;for(s=e[0],i=1;i<t;++i)if(e[i]-e[i-1]!==s)return!1;return s}const yb=e=>e==="left"?"right":e==="right"?"left":e,Da=(e,t,i)=>t==="top"||t==="left"?e[t]+i:e[t]-i,za=(e,t)=>Math.min(t||e,e);function La(e,t){const i=[],s=e.length/t,n=e.length;let o=0;for(;o<n;o+=s)i.push(e[Math.floor(o)]);return i}function vb(e,t,i){const s=e.ticks.length,n=Math.min(t,s-1),o=e._startPixel,r=e._endPixel,a=1e-6;let l=e.getPixelForTick(n),c;if(!(i&&(s===1?c=Math.max(l-o,r-l):t===0?c=(e.getPixelForTick(1)-l)/2:c=(l-e.getPixelForTick(n-1))/2,l+=n<t?c:-c,l<o-a||l>r+a)))return l}function xb(e,t){H(e,i=>{const s=i.gc,n=s.length/2;let o;if(n>t){for(o=0;o<n;++o)delete i.data[s[o]];s.splice(0,n)}})}function yi(e){return e.drawTicks?e.tickLength:0}function Ra(e,t){if(!e.display)return 0;const i=nt(e.font,t),s=rt(e.padding);return(q(e.text)?e.text.length:1)*i.lineHeight+s.height}function _b(e,t){return be(e,{scale:t,type:"scale"})}function wb(e,t,i){return be(e,{tick:i,index:t,type:"tick"})}function kb(e,t,i){let s=tr(e);return(i&&t!=="right"||!i&&t==="right")&&(s=yb(s)),s}function Sb(e,t,i,s){const{top:n,left:o,bottom:r,right:a,chart:l}=e,{chartArea:c,scales:h}=l;let d=0,u,f,g;const p=r-n,m=a-o;if(e.isHorizontal()){if(f=ct(s,o,a),L(i)){const b=Object.keys(i)[0],y=i[b];g=h[b].getPixelForValue(y)+p-t}else i==="center"?g=(c.bottom+c.top)/2+p-t:g=Da(e,i,t);u=a-o}else{if(L(i)){const b=Object.keys(i)[0],y=i[b];f=h[b].getPixelForValue(y)-m+t}else i==="center"?f=(c.left+c.right)/2-m+t:f=Da(e,i,t);g=ct(s,r,n),d=i==="left"?-tt:tt}return{titleX:f,titleY:g,maxWidth:u,rotation:d}}class Ie extends Qt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,i){return t}getUserBounds(){let{_userMin:t,_userMax:i,_suggestedMin:s,_suggestedMax:n}=this;return t=bt(t,Number.POSITIVE_INFINITY),i=bt(i,Number.NEGATIVE_INFINITY),s=bt(s,Number.POSITIVE_INFINITY),n=bt(n,Number.NEGATIVE_INFINITY),{min:bt(t,s),max:bt(i,n),minDefined:J(t),maxDefined:J(i)}}getMinMax(t){let{min:i,max:s,minDefined:n,maxDefined:o}=this.getUserBounds(),r;if(n&&o)return{min:i,max:s};const a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)r=a[l].controller.getMinMax(this,t),n||(i=Math.min(i,r.min)),o||(s=Math.max(s,r.max));return i=o&&i>s?s:i,s=n&&i>s?i:s,{min:bt(i,bt(s,i)),max:bt(s,bt(i,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){V(this.options.beforeUpdate,[this])}update(t,i,s){const{beginAtZero:n,grace:o,ticks:r}=this.options,a=r.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=i,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Tg(this,o,n),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=a<this.ticks.length;this._convertTicksToLabels(l?La(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),r.display&&(r.autoSkip||r.source==="auto")&&(this.ticks=ub(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,i,s;this.isHorizontal()?(i=this.left,s=this.right):(i=this.top,s=this.bottom,t=!t),this._startPixel=i,this._endPixel=s,this._reversePixels=t,this._length=s-i,this._alignToPixels=this.options.alignToPixels}afterUpdate(){V(this.options.afterUpdate,[this])}beforeSetDimensions(){V(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){V(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),V(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){V(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const i=this.options.ticks;let s,n,o;for(s=0,n=t.length;s<n;s++)o=t[s],o.label=V(i.callback,[o.value,s,t],this)}afterTickToLabelConversion(){V(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){V(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,i=t.ticks,s=za(this.ticks.length,t.ticks.maxTicksLimit),n=i.minRotation||0,o=i.maxRotation;let r=n,a,l,c;if(!this._isVisible()||!i.display||n>=o||s<=1||!this.isHorizontal()){this.labelRotation=n;return}const h=this._getLabelSizes(),d=h.widest.width,u=h.highest.height,f=ot(this.chart.width-d,0,this.maxWidth);a=t.offset?this.maxWidth/s:f/(s-1),d+6>a&&(a=f/(s-(t.offset?.5:1)),l=this.maxHeight-yi(t.grid)-i.padding-Ra(t.title,this.chart.options.font),c=Math.sqrt(d*d+u*u),r=Jo(Math.min(Math.asin(ot((h.highest.height+6)/a,-1,1)),Math.asin(ot(l/c,-1,1))-Math.asin(ot(u/c,-1,1)))),r=Math.max(n,Math.min(o,r))),this.labelRotation=r}afterCalculateLabelRotation(){V(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){V(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:i,options:{ticks:s,title:n,grid:o}}=this,r=this._isVisible(),a=this.isHorizontal();if(r){const l=Ra(n,i.options.font);if(a?(t.width=this.maxWidth,t.height=yi(o)+l):(t.height=this.maxHeight,t.width=yi(o)+l),s.display&&this.ticks.length){const{first:c,last:h,widest:d,highest:u}=this._getLabelSizes(),f=s.padding*2,g=At(this.labelRotation),p=Math.cos(g),m=Math.sin(g);if(a){const b=s.mirror?0:m*d.width+p*u.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=s.mirror?0:p*d.width+m*u.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(c,h,m,p)}}this._handleMargins(),a?(this.width=this._length=i.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=i.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,i,s,n){const{ticks:{align:o,padding:r},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,d=this.right-this.getPixelForTick(this.ticks.length-1);let u=0,f=0;l?c?(u=n*t.width,f=s*i.height):(u=s*t.height,f=n*i.width):o==="start"?f=i.width:o==="end"?u=t.width:o!=="inner"&&(u=t.width/2,f=i.width/2),this.paddingLeft=Math.max((u-h+r)*this.width/(this.width-h),0),this.paddingRight=Math.max((f-d+r)*this.width/(this.width-d),0)}else{let h=i.height/2,d=t.height/2;o==="start"?(h=0,d=t.height):o==="end"&&(h=i.height,d=0),this.paddingTop=h+r,this.paddingBottom=d+r}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){V(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:i}=this.options;return i==="top"||i==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let i,s;for(i=0,s=t.length;i<s;i++)T(t[i].label)&&(t.splice(i,1),s--,i--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const i=this.options.ticks.sampleSize;let s=this.ticks;i<s.length&&(s=La(s,i)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,i,s){const{ctx:n,_longestTextCache:o}=this,r=[],a=[],l=Math.floor(i/za(i,s));let c=0,h=0,d,u,f,g,p,m,b,y,_,x,w;for(d=0;d<i;d+=l){if(g=t[d].label,p=this._resolveTickFontOptions(d),n.font=m=p.string,b=o[m]=o[m]||{data:{},gc:[]},y=p.lineHeight,_=x=0,!T(g)&&!q(g))_=sn(n,b.data,b.gc,_,g),x=y;else if(q(g))for(u=0,f=g.length;u<f;++u)w=g[u],!T(w)&&!q(w)&&(_=sn(n,b.data,b.gc,_,w),x+=y);r.push(_),a.push(x),c=Math.max(_,c),h=Math.max(x,h)}xb(o,i);const k=r.indexOf(c),M=a.indexOf(h),A=P=>({width:r[P]||0,height:a[P]||0});return{first:A(0),last:A(i-1),widest:A(k),highest:A(M),widths:r,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,i){return NaN}getValueForPixel(t){}getPixelForTick(t){const i=this.ticks;return t<0||t>i.length-1?null:this.getPixelForValue(i[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const i=this._startPixel+t*this._length;return ag(this._alignToPixels?we(this.chart,i,0):i)}getDecimalForPixel(t){const i=(t-this._startPixel)/this._length;return this._reversePixels?1-i:i}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:i}=this;return t<0&&i<0?i:t>0&&i>0?t:0}getContext(t){const i=this.ticks||[];if(t>=0&&t<i.length){const s=i[t];return s.$context||(s.$context=wb(this.getContext(),t,s))}return this.$context||(this.$context=_b(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,i=At(this.labelRotation),s=Math.abs(Math.cos(i)),n=Math.abs(Math.sin(i)),o=this._getLabelSizes(),r=t.autoSkipPadding||0,a=o?o.widest.width+r:0,l=o?o.highest.height+r:0;return this.isHorizontal()?l*s>a*n?a/s:l/n:l*n<a*s?l/s:a/n}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const i=this.axis,s=this.chart,n=this.options,{grid:o,position:r,border:a}=n,l=o.offset,c=this.isHorizontal(),h=this.ticks.length+(l?1:0),d=yi(o),u=[],f=a.setContext(this.getContext()),g=f.display?f.width:0,p=g/2,m=function($){return we(s,$,g)};let b,y,_,x,w,k,M,A,P,E,D,z;if(r==="top")b=m(this.bottom),k=this.bottom-d,A=b-p,E=m(t.top)+p,z=t.bottom;else if(r==="bottom")b=m(this.top),E=t.top,z=m(t.bottom)-p,k=b+p,A=this.top+d;else if(r==="left")b=m(this.right),w=this.right-d,M=b-p,P=m(t.left)+p,D=t.right;else if(r==="right")b=m(this.left),P=t.left,D=m(t.right)-p,w=b+p,M=this.left+d;else if(i==="x"){if(r==="center")b=m((t.top+t.bottom)/2+.5);else if(L(r)){const $=Object.keys(r)[0],I=r[$];b=m(this.chart.scales[$].getPixelForValue(I))}E=t.top,z=t.bottom,k=b+p,A=k+d}else if(i==="y"){if(r==="center")b=m((t.left+t.right)/2);else if(L(r)){const $=Object.keys(r)[0],I=r[$];b=m(this.chart.scales[$].getPixelForValue(I))}w=b-p,M=w-d,P=t.left,D=t.right}const it=O(n.ticks.maxTicksLimit,h),G=Math.max(1,Math.ceil(h/it));for(y=0;y<h;y+=G){const $=this.getContext(y),I=o.setContext($),W=a.setContext($),K=I.lineWidth,Z=I.color,te=W.dash||[],us=W.dashOffset,Fe=I.tickWidth,ci=I.tickColor,ye=I.tickBorderDash||[],hi=I.tickBorderDashOffset;_=vb(this,y,l),_!==void 0&&(x=we(s,_,K),c?w=M=P=D=x:k=A=E=z=x,u.push({tx1:w,ty1:k,tx2:M,ty2:A,x1:P,y1:E,x2:D,y2:z,width:K,color:Z,borderDash:te,borderDashOffset:us,tickWidth:Fe,tickColor:ci,tickBorderDash:ye,tickBorderDashOffset:hi}))}return this._ticksLength=h,this._borderValue=b,u}_computeLabelItems(t){const i=this.axis,s=this.options,{position:n,ticks:o}=s,r=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:h,mirror:d}=o,u=yi(s.grid),f=u+h,g=d?-h:f,p=-At(this.labelRotation),m=[];let b,y,_,x,w,k,M,A,P,E,D,z,it="middle";if(n==="top")k=this.bottom-g,M=this._getXAxisLabelAlignment();else if(n==="bottom")k=this.top+g,M=this._getXAxisLabelAlignment();else if(n==="left"){const $=this._getYAxisLabelAlignment(u);M=$.textAlign,w=$.x}else if(n==="right"){const $=this._getYAxisLabelAlignment(u);M=$.textAlign,w=$.x}else if(i==="x"){if(n==="center")k=(t.top+t.bottom)/2+f;else if(L(n)){const $=Object.keys(n)[0],I=n[$];k=this.chart.scales[$].getPixelForValue(I)+f}M=this._getXAxisLabelAlignment()}else if(i==="y"){if(n==="center")w=(t.left+t.right)/2-f;else if(L(n)){const $=Object.keys(n)[0],I=n[$];w=this.chart.scales[$].getPixelForValue(I)}M=this._getYAxisLabelAlignment(u).textAlign}i==="y"&&(l==="start"?it="top":l==="end"&&(it="bottom"));const G=this._getLabelSizes();for(b=0,y=a.length;b<y;++b){_=a[b],x=_.label;const $=o.setContext(this.getContext(b));A=this.getPixelForTick(b)+o.labelOffset,P=this._resolveTickFontOptions(b),E=P.lineHeight,D=q(x)?x.length:1;const I=D/2,W=$.color,K=$.textStrokeColor,Z=$.textStrokeWidth;let te=M;r?(w=A,M==="inner"&&(b===y-1?te=this.options.reverse?"left":"right":b===0?te=this.options.reverse?"right":"left":te="center"),n==="top"?c==="near"||p!==0?z=-D*E+E/2:c==="center"?z=-G.highest.height/2-I*E+E:z=-G.highest.height+E/2:c==="near"||p!==0?z=E/2:c==="center"?z=G.highest.height/2-I*E:z=G.highest.height-D*E,d&&(z*=-1),p!==0&&!$.showLabelBackdrop&&(w+=E/2*Math.sin(p))):(k=A,z=(1-D)*E/2);let us;if($.showLabelBackdrop){const Fe=rt($.backdropPadding),ci=G.heights[b],ye=G.widths[b];let hi=z-Fe.top,di=0-Fe.left;switch(it){case"middle":hi-=ci/2;break;case"bottom":hi-=ci;break}switch(M){case"center":di-=ye/2;break;case"right":di-=ye;break;case"inner":b===y-1?di-=ye:b>0&&(di-=ye/2);break}us={left:di,top:hi,width:ye+Fe.width,height:ci+Fe.height,color:$.backdropColor}}m.push({label:x,font:P,textOffset:z,options:{rotation:p,color:W,strokeColor:K,strokeWidth:Z,textAlign:te,textBaseline:it,translation:[w,k],backdrop:us}})}return m}_getXAxisLabelAlignment(){const{position:t,ticks:i}=this.options;if(-At(this.labelRotation))return t==="top"?"left":"right";let s="center";return i.align==="start"?s="left":i.align==="end"?s="right":i.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:i,ticks:{crossAlign:s,mirror:n,padding:o}}=this.options,r=this._getLabelSizes(),a=t+o,l=r.widest.width;let c,h;return i==="left"?n?(h=this.right+o,s==="near"?c="left":s==="center"?(c="center",h+=l/2):(c="right",h+=l)):(h=this.right-a,s==="near"?c="right":s==="center"?(c="center",h-=l/2):(c="left",h=this.left)):i==="right"?n?(h=this.left+o,s==="near"?c="right":s==="center"?(c="center",h-=l/2):(c="left",h-=l)):(h=this.left+a,s==="near"?c="left":s==="center"?(c="center",h+=l/2):(c="right",h=this.right)):c="right",{textAlign:c,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,i=this.options.position;if(i==="left"||i==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(i==="top"||i==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:i},left:s,top:n,width:o,height:r}=this;i&&(t.save(),t.fillStyle=i,t.fillRect(s,n,o,r),t.restore())}getLineWidthForValue(t){const i=this.options.grid;if(!this._isVisible()||!i.display)return 0;const s=this.ticks.findIndex(n=>n.value===t);return s>=0?i.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const i=this.options.grid,s=this.ctx,n=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,r;const a=(l,c,h)=>{!h.width||!h.color||(s.save(),s.lineWidth=h.width,s.strokeStyle=h.color,s.setLineDash(h.borderDash||[]),s.lineDashOffset=h.borderDashOffset,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(c.x,c.y),s.stroke(),s.restore())};if(i.display)for(o=0,r=n.length;o<r;++o){const l=n[o];i.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),i.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:i,options:{border:s,grid:n}}=this,o=s.setContext(this.getContext()),r=s.display?o.width:0;if(!r)return;const a=n.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,h,d,u;this.isHorizontal()?(c=we(t,this.left,r)-r/2,h=we(t,this.right,a)+a/2,d=u=l):(d=we(t,this.top,r)-r/2,u=we(t,this.bottom,a)+a/2,c=h=l),i.save(),i.lineWidth=o.width,i.strokeStyle=o.color,i.beginPath(),i.moveTo(c,d),i.lineTo(h,u),i.stroke(),i.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Mn(i,s);const n=this.getLabelItems(t);for(const o of n){const r=o.options,a=o.font,l=o.label,c=o.textOffset;ze(i,l,0,c,a,r)}s&&Cn(i)}drawTitle(){const{ctx:t,options:{position:i,title:s,reverse:n}}=this;if(!s.display)return;const o=nt(s.font),r=rt(s.padding),a=s.align;let l=o.lineHeight/2;i==="bottom"||i==="center"||L(i)?(l+=r.bottom,q(s.text)&&(l+=o.lineHeight*(s.text.length-1))):l+=r.top;const{titleX:c,titleY:h,maxWidth:d,rotation:u}=Sb(this,l,i,a);ze(t,s.text,0,0,o,{color:s.color,maxWidth:d,rotation:u,textAlign:kb(a,i,n),textBaseline:"middle",translation:[c,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,i=t.ticks&&t.ticks.z||0,s=O(t.grid&&t.grid.z,-1),n=O(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Ie.prototype.draw?[{z:i,draw:o=>{this.draw(o)}}]:[{z:s,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:n,draw:()=>{this.drawBorder()}},{z:i,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const i=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",n=[];let o,r;for(o=0,r=i.length;o<r;++o){const a=i[o];a[s]===this.id&&(!t||a.type===t)&&n.push(a)}return n}_resolveTickFontOptions(t){const i=this.options.ticks.setContext(this.getContext(t));return nt(i.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Ss{constructor(t,i,s){this.type=t,this.scope=i,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const i=Object.getPrototypeOf(t);let s;Ab(i)&&(s=this.register(i));const n=this.items,o=t.id,r=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in n||(n[o]=t,Mb(t,r,s),this.override&&X.override(t.id,t.overrides)),r}get(t){return this.items[t]}unregister(t){const i=this.items,s=t.id,n=this.scope;s in i&&delete i[s],n&&s in X[n]&&(delete X[n][s],this.override&&delete De[s])}}function Mb(e,t,i){const s=Ft(Object.create(null),[i?X.get(i):{},X.get(t),e.defaults]);X.set(t,s),e.defaultRoutes&&Cb(t,e.defaultRoutes),e.descriptors&&X.describe(t,e.descriptors)}function Cb(e,t){Object.keys(t).forEach(i=>{const s=i.split("."),n=s.pop(),o=[e].concat(s).join("."),r=t[i].split("."),a=r.pop(),l=r.join(".");X.route(o,n,l,a)})}function Ab(e){return"id"in e&&"defaults"in e}class Eb{constructor(){this.controllers=new Ss(Et,"datasets",!0),this.elements=new Ss(Qt,"elements"),this.plugins=new Ss(Object,"plugins"),this.scales=new Ss(Ie,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,i,s){[...i].forEach(n=>{const o=s||this._getRegistryForType(n);s||o.isForType(n)||o===this.plugins&&n.id?this._exec(t,o,n):H(n,r=>{const a=s||this._getRegistryForType(r);this._exec(t,a,r)})})}_exec(t,i,s){const n=Ko(t);V(s["before"+n],[],s),i[t](s),V(s["after"+n],[],s)}_getRegistryForType(t){for(let i=0;i<this._typedRegistries.length;i++){const s=this._typedRegistries[i];if(s.isForType(t))return s}return this.plugins}_get(t,i,s){const n=i.get(t);if(n===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return n}}var Dt=new Eb;class Pb{constructor(){this._init=void 0}notify(t,i,s,n){if(i==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=n?this._descriptors(t).filter(n):this._descriptors(t),r=this._notify(o,t,i,s);return i==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),r}_notify(t,i,s,n){n=n||{};for(const o of t){const r=o.plugin,a=r[s],l=[i,n,o.options];if(V(a,l,r)===!1&&n.cancelable)return!1}return!0}invalidate(){T(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const i=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),i}_createDescriptors(t,i){const s=t&&t.config,n=O(s.options&&s.options.plugins,{}),o=$b(s);return n===!1&&!i?[]:Tb(t,o,n,i)}_notifyStateChanges(t){const i=this._oldCache||[],s=this._cache,n=(o,r)=>o.filter(a=>!r.some(l=>a.plugin.id===l.plugin.id));this._notify(n(i,s),t,"stop"),this._notify(n(s,i),t,"start")}}function $b(e){const t={},i=[],s=Object.keys(Dt.plugins.items);for(let o=0;o<s.length;o++)i.push(Dt.getPlugin(s[o]));const n=e.plugins||[];for(let o=0;o<n.length;o++){const r=n[o];i.indexOf(r)===-1&&(i.push(r),t[r.id]=!0)}return{plugins:i,localIds:t}}function Ob(e,t){return!t&&e===!1?null:e===!0?{}:e}function Tb(e,{plugins:t,localIds:i},s,n){const o=[],r=e.getContext();for(const a of t){const l=a.id,c=Ob(s[l],n);c!==null&&o.push({plugin:a,options:Db(e.config,{plugin:a,local:i[l]},c,r)})}return o}function Db(e,{plugin:t,local:i},s,n){const o=e.pluginScopeKeys(t),r=e.getOptionScopes(s,o);return i&&t.defaults&&r.push(t.defaults),e.createResolver(r,n,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function vo(e,t){const i=X.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||i.indexAxis||"x"}function zb(e,t){let i=e;return e==="_index_"?i=t:e==="_value_"&&(i=t==="x"?"y":"x"),i}function Lb(e,t){return e===t?"_index_":"_value_"}function Ia(e){if(e==="x"||e==="y"||e==="r")return e}function Rb(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function xo(e,...t){if(Ia(e))return e;for(const i of t){const s=i.axis||Rb(i.position)||e.length>1&&Ia(e[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Fa(e,t,i){if(i[t+"AxisID"]===e)return{axis:t}}function Ib(e,t){if(t.data&&t.data.datasets){const i=t.data.datasets.filter(s=>s.xAxisID===e||s.yAxisID===e);if(i.length)return Fa(e,"x",i[0])||Fa(e,"y",i[0])}return{}}function Fb(e,t){const i=De[e.type]||{scales:{}},s=t.scales||{},n=vo(e.type,t),o=Object.create(null);return Object.keys(s).forEach(r=>{const a=s[r];if(!L(a))return console.error(`Invalid scale configuration for scale: ${r}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${r}`);const l=xo(r,a,Ib(r,e),X.scales[a.type]),c=Lb(l,n),h=i.scales||{};o[r]=Ei(Object.create(null),[{axis:l},a,h[l],h[c]])}),e.data.datasets.forEach(r=>{const a=r.type||e.type,l=r.indexAxis||vo(a,t),c=(De[a]||{}).scales||{};Object.keys(c).forEach(h=>{const d=zb(h,l),u=r[d+"AxisID"]||d;o[u]=o[u]||Object.create(null),Ei(o[u],[{axis:d},s[u],c[h]])})}),Object.keys(o).forEach(r=>{const a=o[r];Ei(a,[X.scales[a.type],X.scale])}),o}function _h(e){const t=e.options||(e.options={});t.plugins=O(t.plugins,{}),t.scales=Fb(e,t)}function wh(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function Bb(e){return e=e||{},e.data=wh(e.data),_h(e),e}const Ba=new Map,kh=new Set;function Ms(e,t){let i=Ba.get(e);return i||(i=t(),Ba.set(e,i),kh.add(i)),i}const vi=(e,t,i)=>{const s=de(t,i);s!==void 0&&e.add(s)};class jb{constructor(t){this._config=Bb(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=wh(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),_h(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Ms(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,i){return Ms(`${t}.transition.${i}`,()=>[[`datasets.${t}.transitions.${i}`,`transitions.${i}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,i){return Ms(`${t}-${i}`,()=>[[`datasets.${t}.elements.${i}`,`datasets.${t}`,`elements.${i}`,""]])}pluginScopeKeys(t){const i=t.id,s=this.type;return Ms(`${s}-plugin-${i}`,()=>[[`plugins.${i}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,i){const s=this._scopeCache;let n=s.get(t);return(!n||i)&&(n=new Map,s.set(t,n)),n}getOptionScopes(t,i,s){const{options:n,type:o}=this,r=this._cachedScopes(t,s),a=r.get(i);if(a)return a;const l=new Set;i.forEach(h=>{t&&(l.add(t),h.forEach(d=>vi(l,t,d))),h.forEach(d=>vi(l,n,d)),h.forEach(d=>vi(l,De[o]||{},d)),h.forEach(d=>vi(l,X,d)),h.forEach(d=>vi(l,mo,d))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),kh.has(i)&&r.set(i,c),c}chartOptionScopes(){const{options:t,type:i}=this;return[t,De[i]||{},X.datasets[i]||{},{type:i},X,mo]}resolveNamedOptions(t,i,s,n=[""]){const o={$shared:!0},{resolver:r,subPrefixes:a}=ja(this._resolverCache,t,n);let l=r;if(Nb(r,i)){o.$shared=!1,s=ue(s)?s():s;const c=this.createResolver(t,s,a);l=ei(r,s,c)}for(const c of i)o[c]=l[c];return o}createResolver(t,i,s=[""],n){const{resolver:o}=ja(this._resolverCache,t,s);return L(i)?ei(o,i,void 0,n):o}}function ja(e,t,i){let s=e.get(t);s||(s=new Map,e.set(t,s));const n=i.join();let o=s.get(n);return o||(o={resolver:sr(t,i),subPrefixes:i.filter(r=>!r.toLowerCase().includes("hover"))},s.set(n,o)),o}const Hb=e=>L(e)&&Object.getOwnPropertyNames(e).some(t=>ue(e[t]));function Nb(e,t){const{isScriptable:i,isIndexable:s}=eh(e);for(const n of t){const o=i(n),r=s(n),a=(r||o)&&e[n];if(o&&(ue(a)||Hb(a))||r&&q(a))return!0}return!1}var Vb="4.5.1";const Wb=["top","bottom","left","right","chartArea"];function Ha(e,t){return e==="top"||e==="bottom"||Wb.indexOf(e)===-1&&t==="x"}function Na(e,t){return function(i,s){return i[e]===s[e]?i[t]-s[t]:i[e]-s[e]}}function Va(e){const t=e.chart,i=t.options.animation;t.notifyPlugins("afterRender"),V(i&&i.onComplete,[e],t)}function Ub(e){const t=e.chart,i=t.options.animation;V(i&&i.onProgress,[e],t)}function Sh(e){return rr()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Ns={},Wa=e=>{const t=Sh(e);return Object.values(Ns).filter(i=>i.canvas===t).pop()};function qb(e,t,i){const s=Object.keys(e);for(const n of s){const o=+n;if(o>=t){const r=e[n];delete e[n],(i>0||o>t)&&(e[o+i]=r)}}}function Yb(e,t,i,s){return!i||e.type==="mouseout"?null:s?t:e}var ee;let Xi=(ee=class{static register(...e){Dt.add(...e),Ua()}static unregister(...e){Dt.remove(...e),Ua()}constructor(e,t){const i=this.config=new jb(t),s=Sh(e),n=Wa(s);if(n)throw new Error("Canvas is already in use. Chart with ID '"+n.id+"' must be destroyed before the canvas with ID '"+n.canvas.id+"' can be reused.");const o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||db(s)),this.platform.updateConfig(i);const r=this.platform.acquireContext(s,o.aspectRatio),a=r&&r.canvas,l=a&&a.height,c=a&&a.width;if(this.id=Xp(),this.ctx=r,this.canvas=a,this.width=c,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Pb,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=dg(h=>this.update(h),o.resizeDelay||0),this._dataChanges=[],Ns[this.id]=this,!r||!a){console.error("Failed to create chart: can't acquire context from the given item");return}jt.listen(this,"complete",Va),jt.listen(this,"progress",Ub),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:e,maintainAspectRatio:t},width:i,height:s,_aspectRatio:n}=this;return T(e)?t&&n?n:s?i/s:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return Dt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():fa(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return ha(this.canvas,this.ctx),this}stop(){return jt.stop(this),this}resize(e,t){jt.running(this)?this._resizeBeforeDraw={width:e,height:t}:this._resize(e,t)}_resize(e,t){const i=this.options,s=this.canvas,n=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(s,e,t,n),r=i.devicePixelRatio||this.platform.getDevicePixelRatio(),a=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,fa(this,r,!0)&&(this.notifyPlugins("resize",{size:o}),V(i.onResize,[this,o],this),this.attached&&this._doResize(a)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};H(e,(t,i)=>{t.id=i})}buildOrUpdateScales(){const e=this.options,t=e.scales,i=this.scales,s=Object.keys(i).reduce((o,r)=>(o[r]=!1,o),{});let n=[];t&&(n=n.concat(Object.keys(t).map(o=>{const r=t[o],a=xo(o,r),l=a==="r",c=a==="x";return{options:r,dposition:l?"chartArea":c?"bottom":"left",dtype:l?"radialLinear":c?"category":"linear"}}))),H(n,o=>{const r=o.options,a=r.id,l=xo(a,r),c=O(r.type,o.dtype);(r.position===void 0||Ha(r.position,l)!==Ha(o.dposition))&&(r.position=o.dposition),s[a]=!0;let h=null;if(a in i&&i[a].type===c)h=i[a];else{const d=Dt.getScale(c);h=new d({id:a,type:c,ctx:this.ctx,chart:this}),i[h.id]=h}h.init(r,e)}),H(s,(o,r)=>{o||delete i[r]}),H(i,o=>{dt.configure(this,o,o.options),dt.addBox(this,o)})}_updateMetasets(){const e=this._metasets,t=this.data.datasets.length,i=e.length;if(e.sort((s,n)=>s.index-n.index),i>t){for(let s=t;s<i;++s)this._destroyDatasetMeta(s);e.splice(t,i-t)}this._sortedMetasets=e.slice(0).sort(Na("order","index"))}_removeUnreferencedMetasets(){const{_metasets:e,data:{datasets:t}}=this;e.length>t.length&&delete this._stacks,e.forEach((i,s)=>{t.filter(n=>n===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const e=[],t=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=t.length;i<s;i++){const n=t[i];let o=this.getDatasetMeta(i);const r=n.type||this.config.type;if(o.type&&o.type!==r&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=r,o.indexAxis=n.indexAxis||vo(r,this.options),o.order=n.order||0,o.index=i,o.label=""+n.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const a=Dt.getController(r),{datasetElementType:l,dataElementType:c}=X.datasets[r];Object.assign(a,{dataElementType:Dt.getElement(c),datasetElementType:l&&Dt.getElement(l)}),o.controller=new a(this,i),e.push(o.controller)}}return this._updateMetasets(),e}_resetElements(){H(this.data.datasets,(e,t)=>{this.getDatasetMeta(t).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(e){const t=this.config;t.update();const i=this._options=t.createResolver(t.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:e,cancelable:!0})===!1)return;const n=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,c=this.data.datasets.length;l<c;l++){const{controller:h}=this.getDatasetMeta(l),d=!s&&n.indexOf(h)===-1;h.buildOrUpdateElements(d),o=Math.max(+h.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),s||H(n,l=>{l.reset()}),this._updateDatasets(e),this.notifyPlugins("afterUpdate",{mode:e}),this._layers.sort(Na("z","_idx"));const{_active:r,_lastEvent:a}=this;a?this._eventHandler(a,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){H(this.scales,e=>{dt.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const e=this.options,t=new Set(Object.keys(this._listeners)),i=new Set(e.events);(!ea(t,i)||!!this._responsiveListeners!==e.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:e}=this,t=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:n}of t){const o=i==="_removeElements"?-n:n;qb(e,s,o)}}_getUniformDataChanges(){const e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];const t=this.data.datasets.length,i=n=>new Set(e.filter(o=>o[0]===n).map((o,r)=>r+","+o.splice(1).join(","))),s=i(0);for(let n=1;n<t;n++)if(!ea(s,i(n)))return;return Array.from(s).map(n=>n.split(",")).map(n=>({method:n[1],start:+n[2],count:+n[3]}))}_updateLayout(e){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;dt.update(this,this.width,this.height,e);const t=this.chartArea,i=t.width<=0||t.height<=0;this._layers=[],H(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,n)=>{s._idx=n}),this.notifyPlugins("afterLayout")}_updateDatasets(e){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:e,cancelable:!0})!==!1){for(let t=0,i=this.data.datasets.length;t<i;++t)this.getDatasetMeta(t).controller.configure();for(let t=0,i=this.data.datasets.length;t<i;++t)this._updateDataset(t,ue(e)?e({datasetIndex:t}):e);this.notifyPlugins("afterDatasetsUpdate",{mode:e})}}_updateDataset(e,t){const i=this.getDatasetMeta(e),s={meta:i,index:e,mode:t,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(t),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(jt.has(this)?this.attached&&!jt.running(this)&&jt.start(this):(this.draw(),Va({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const t=this._layers;for(e=0;e<t.length&&t[e].z<=0;++e)t[e].draw(this.chartArea);for(this._drawDatasets();e<t.length;++e)t[e].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(e){const t=this._sortedMetasets,i=[];let s,n;for(s=0,n=t.length;s<n;++s){const o=t[s];(!e||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const e=this.getSortedVisibleDatasetMetas();for(let t=e.length-1;t>=0;--t)this._drawDataset(e[t]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(e){const t=this.ctx,i={meta:e,index:e.index,cancelable:!0},s=uh(this,e);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Mn(t,s),e.controller.draw(),s&&Cn(t),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(e){return qt(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,t,i,s){const n=Wm.modes[t];return typeof n=="function"?n(this,e,i,s):[]}getDatasetMeta(e){const t=this.data.datasets[e],i=this._metasets;let s=i.filter(n=>n&&n._dataset===t).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:t&&t.order||0,index:e,_dataset:t,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=be(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){const t=this.data.datasets[e];if(!t)return!1;const i=this.getDatasetMeta(e);return typeof i.hidden=="boolean"?!i.hidden:!t.hidden}setDatasetVisibility(e,t){const i=this.getDatasetMeta(e);i.hidden=!t}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,t,i){const s=i?"show":"hide",n=this.getDatasetMeta(e),o=n.controller._resolveAnimations(void 0,s);Wi(t)?(n.data[t].hidden=!i,this.update()):(this.setDatasetVisibility(e,i),o.update(n,{visible:i}),this.update(r=>r.datasetIndex===e?s:void 0))}hide(e,t){this._updateVisibility(e,t,!1)}show(e,t){this._updateVisibility(e,t,!0)}_destroyDatasetMeta(e){const t=this._metasets[e];t&&t.controller&&t.controller._destroy(),delete this._metasets[e]}_stop(){let e,t;for(this.stop(),jt.remove(this),e=0,t=this.data.datasets.length;e<t;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:e,ctx:t}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),ha(e,t),this.platform.releaseContext(t),this.canvas=null,this.ctx=null),delete Ns[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const e=this._listeners,t=this.platform,i=(n,o)=>{t.addEventListener(this,n,o),e[n]=o},s=(n,o,r)=>{n.offsetX=o,n.offsetY=r,this._eventHandler(n)};H(this.options.events,n=>i(n,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const e=this._responsiveListeners,t=this.platform,i=(a,l)=>{t.addEventListener(this,a,l),e[a]=l},s=(a,l)=>{e[a]&&(t.removeEventListener(this,a,l),delete e[a])},n=(a,l)=>{this.canvas&&this.resize(a,l)};let o;const r=()=>{s("attach",r),this.attached=!0,this.resize(),i("resize",n),i("detach",o)};o=()=>{this.attached=!1,s("resize",n),this._stop(),this._resize(0,0),i("attach",r)},t.isAttached(this.canvas)?r():o()}unbindEvents(){H(this._listeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._listeners={},H(this._responsiveListeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,t,i){const s=i?"set":"remove";let n,o,r,a;for(t==="dataset"&&(n=this.getDatasetMeta(e[0].datasetIndex),n.controller["_"+s+"DatasetHoverStyle"]()),r=0,a=e.length;r<a;++r){o=e[r];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[s+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){const t=this._active||[],i=e.map(({datasetIndex:s,index:n})=>{const o=this.getDatasetMeta(s);if(!o)throw new Error("No dataset found at index "+s);return{datasetIndex:s,element:o.data[n],index:n}});!Qs(i,t)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,t))}notifyPlugins(e,t,i){return this._plugins.notify(this,e,t,i)}isPluginEnabled(e){return this._plugins._cache.filter(t=>t.plugin.id===e).length===1}_updateHoverStyles(e,t,i){const s=this.options.hover,n=(a,l)=>a.filter(c=>!l.some(h=>c.datasetIndex===h.datasetIndex&&c.index===h.index)),o=n(t,e),r=i?e:n(e,t);o.length&&this.updateHoverStyle(o,s.mode,!1),r.length&&s.mode&&this.updateHoverStyle(r,s.mode,!0)}_eventHandler(e,t){const i={event:e,replay:t,cancelable:!0,inChartArea:this.isPointInArea(e)},s=o=>(o.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const n=this._handleEvent(e,t,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(n||i.changed)&&this.render(),this}_handleEvent(e,t,i){const{_active:s=[],options:n}=this,o=t,r=this._getActiveElements(e,s,i,o),a=tg(e),l=Yb(e,this._lastEvent,i,a);i&&(this._lastEvent=null,V(n.onHover,[e,r,this],this),a&&V(n.onClick,[e,r,this],this));const c=!Qs(r,s);return(c||t)&&(this._active=r,this._updateHoverStyles(r,s,t)),this._lastEvent=l,c}_getActiveElements(e,t,i,s){if(e.type==="mouseout")return[];if(!i)return t;const n=this.options.hover;return this.getElementsAtEventForMode(e,n.mode,n,s)}},C(ee,"defaults",X),C(ee,"instances",Ns),C(ee,"overrides",De),C(ee,"registry",Dt),C(ee,"version",Vb),C(ee,"getChart",Wa),ee);function Ua(){return H(Xi.instances,e=>e._plugins.invalidate())}function Xb(e,t,i){const{startAngle:s,x:n,y:o,outerRadius:r,innerRadius:a,options:l}=t,{borderWidth:c,borderJoinStyle:h}=l,d=Math.min(c/r,ht(s-i));if(e.beginPath(),e.arc(n,o,r-c/2,s+d/2,i-d/2),a>0){const u=Math.min(c/a,ht(s-i));e.arc(n,o,a+c/2,i-u/2,s+u/2,!0)}else{const u=Math.min(c/2,r*ht(s-i));if(h==="round")e.arc(n,o,u,i-B/2,s+B/2,!0);else if(h==="bevel"){const f=2*u*u,g=-f*Math.cos(i+B/2)+n,p=-f*Math.sin(i+B/2)+o,m=f*Math.cos(s+B/2)+n,b=f*Math.sin(s+B/2)+o;e.lineTo(g,p),e.lineTo(m,b)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function Gb(e,t,i){const{startAngle:s,pixelMargin:n,x:o,y:r,outerRadius:a,innerRadius:l}=t;let c=n/a;e.beginPath(),e.arc(o,r,a,s-c,i+c),l>n?(c=n/l,e.arc(o,r,l,i+c,s-c,!0)):e.arc(o,r,n,i+tt,s-tt),e.closePath(),e.clip()}function Zb(e){return ir(e,["outerStart","outerEnd","innerStart","innerEnd"])}function Kb(e,t,i,s){const n=Zb(e.options.borderRadius),o=(i-t)/2,r=Math.min(o,s*t/2),a=l=>{const c=(i-Math.min(o,l))*s/2;return ot(l,0,Math.min(o,c))};return{outerStart:a(n.outerStart),outerEnd:a(n.outerEnd),innerStart:ot(n.innerStart,0,r),innerEnd:ot(n.innerEnd,0,r)}}function je(e,t,i,s){return{x:i+e*Math.cos(t),y:s+e*Math.sin(t)}}function rn(e,t,i,s,n,o){const{x:r,y:a,startAngle:l,pixelMargin:c,innerRadius:h}=t,d=Math.max(t.outerRadius+s+i-c,0),u=h>0?h+s+i+c:0;let f=0;const g=n-l;if(s){const $=h>0?h-s:0,I=d>0?d-s:0,W=($+I)/2,K=W!==0?g*W/(W+s):g;f=(g-K)/2}const p=Math.max(.001,g*d-i/B)/d,m=(g-p)/2,b=l+m+f,y=n-m-f,{outerStart:_,outerEnd:x,innerStart:w,innerEnd:k}=Kb(t,u,d,y-b),M=d-_,A=d-x,P=b+_/M,E=y-x/A,D=u+w,z=u+k,it=b+w/D,G=y-k/z;if(e.beginPath(),o){const $=(P+E)/2;if(e.arc(r,a,d,P,$),e.arc(r,a,d,$,E),x>0){const Z=je(A,E,r,a);e.arc(Z.x,Z.y,x,E,y+tt)}const I=je(z,y,r,a);if(e.lineTo(I.x,I.y),k>0){const Z=je(z,G,r,a);e.arc(Z.x,Z.y,k,y+tt,G+Math.PI)}const W=(y-k/u+(b+w/u))/2;if(e.arc(r,a,u,y-k/u,W,!0),e.arc(r,a,u,W,b+w/u,!0),w>0){const Z=je(D,it,r,a);e.arc(Z.x,Z.y,w,it+Math.PI,b-tt)}const K=je(M,b,r,a);if(e.lineTo(K.x,K.y),_>0){const Z=je(M,P,r,a);e.arc(Z.x,Z.y,_,b-tt,P)}}else{e.moveTo(r,a);const $=Math.cos(P)*d+r,I=Math.sin(P)*d+a;e.lineTo($,I);const W=Math.cos(E)*d+r,K=Math.sin(E)*d+a;e.lineTo(W,K)}e.closePath()}function Jb(e,t,i,s,n){const{fullCircles:o,startAngle:r,circumference:a}=t;let l=t.endAngle;if(o){rn(e,t,i,s,l,n);for(let c=0;c<o;++c)e.fill();isNaN(a)||(l=r+(a%Y||Y))}return rn(e,t,i,s,l,n),e.fill(),l}function Qb(e,t,i,s,n){const{fullCircles:o,startAngle:r,circumference:a,options:l}=t,{borderWidth:c,borderJoinStyle:h,borderDash:d,borderDashOffset:u,borderRadius:f}=l,g=l.borderAlign==="inner";if(!c)return;e.setLineDash(d||[]),e.lineDashOffset=u,g?(e.lineWidth=c*2,e.lineJoin=h||"round"):(e.lineWidth=c,e.lineJoin=h||"bevel");let p=t.endAngle;if(o){rn(e,t,i,s,p,n);for(let m=0;m<o;++m)e.stroke();isNaN(a)||(p=r+(a%Y||Y))}g&&Gb(e,t,p),l.selfJoin&&p-r>=B&&f===0&&h!=="miter"&&Xb(e,t,p),o||(rn(e,t,i,s,p,n),e.stroke())}class Ne extends Qt{constructor(t){super(),C(this,"circumference"),C(this,"endAngle"),C(this,"fullCircles"),C(this,"innerRadius"),C(this,"outerRadius"),C(this,"pixelMargin"),C(this,"startAngle"),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,i,s){const n=this.getProps(["x","y"],s),{angle:o,distance:r}=Uc(n,{x:t,y:i}),{startAngle:a,endAngle:l,innerRadius:c,outerRadius:h,circumference:d}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),u=(this.options.spacing+this.options.borderWidth)/2,f=O(d,l-a),g=Ui(o,a,l)&&a!==l,p=f>=Y||g,m=Wt(r,c+u,h+u);return p&&m}getCenterPoint(t){const{x:i,y:s,startAngle:n,endAngle:o,innerRadius:r,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:l,spacing:c}=this.options,h=(n+o)/2,d=(r+a+c+l)/2;return{x:i+Math.cos(h)*d,y:s+Math.sin(h)*d}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:i,circumference:s}=this,n=(i.offset||0)/4,o=(i.spacing||0)/2,r=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=s>Y?Math.floor(s/Y):0,s===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*n,Math.sin(a)*n);const l=1-Math.sin(Math.min(B,s||0)),c=n*l;t.fillStyle=i.backgroundColor,t.strokeStyle=i.borderColor,Jb(t,this,c,o,r),Qb(t,this,c,o,r),t.restore()}}C(Ne,"id","arc"),C(Ne,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),C(Ne,"defaultRoutes",{backgroundColor:"backgroundColor"}),C(Ne,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function Mh(e,t,i=t){e.lineCap=O(i.borderCapStyle,t.borderCapStyle),e.setLineDash(O(i.borderDash,t.borderDash)),e.lineDashOffset=O(i.borderDashOffset,t.borderDashOffset),e.lineJoin=O(i.borderJoinStyle,t.borderJoinStyle),e.lineWidth=O(i.borderWidth,t.borderWidth),e.strokeStyle=O(i.borderColor,t.borderColor)}function ty(e,t,i){e.lineTo(i.x,i.y)}function ey(e){return e.stepped?kg:e.tension||e.cubicInterpolationMode==="monotone"?Sg:ty}function Ch(e,t,i={}){const s=e.length,{start:n=0,end:o=s-1}=i,{start:r,end:a}=t,l=Math.max(n,r),c=Math.min(o,a),h=n<r&&o<r||n>a&&o>a;return{count:s,start:l,loop:t.loop,ilen:c<l&&!h?s+c-l:c-l}}function iy(e,t,i,s){const{points:n,options:o}=t,{count:r,start:a,loop:l,ilen:c}=Ch(n,i,s),h=ey(o);let{move:d=!0,reverse:u}=s||{},f,g,p;for(f=0;f<=c;++f)g=n[(a+(u?c-f:f))%r],!g.skip&&(d?(e.moveTo(g.x,g.y),d=!1):h(e,p,g,u,o.stepped),p=g);return l&&(g=n[(a+(u?c:0))%r],h(e,p,g,u,o.stepped)),!!l}function sy(e,t,i,s){const n=t.points,{count:o,start:r,ilen:a}=Ch(n,i,s),{move:l=!0,reverse:c}=s||{};let h=0,d=0,u,f,g,p,m,b;const y=x=>(r+(c?a-x:x))%o,_=()=>{p!==m&&(e.lineTo(h,m),e.lineTo(h,p),e.lineTo(h,b))};for(l&&(f=n[y(0)],e.moveTo(f.x,f.y)),u=0;u<=a;++u){if(f=n[y(u)],f.skip)continue;const x=f.x,w=f.y,k=x|0;k===g?(w<p?p=w:w>m&&(m=w),h=(d*h+x)/++d):(_(),e.lineTo(x,w),g=k,d=0,p=m=w),b=w}_()}function _o(e){const t=e.options,i=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!i?sy:iy}function ny(e){return e.stepped?im:e.tension||e.cubicInterpolationMode==="monotone"?sm:Ce}function oy(e,t,i,s){let n=t._path;n||(n=t._path=new Path2D,t.path(n,i,s)&&n.closePath()),Mh(e,t.options),e.stroke(n)}function ry(e,t,i,s){const{segments:n,options:o}=t,r=_o(t);for(const a of n)Mh(e,o,a.style),e.beginPath(),r(e,t,a,{start:i,end:i+s-1})&&e.closePath(),e.stroke()}const ay=typeof Path2D=="function";function ly(e,t,i,s){ay&&!t.options.segment?oy(e,t,i,s):ry(e,t,i,s)}class re extends Qt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,i){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const n=s.spanGaps?this._loop:this._fullLoop;Xg(this._points,s,t,n,i),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=cm(this,this.options.segment))}first(){const t=this.segments,i=this.points;return t.length&&i[t[0].start]}last(){const t=this.segments,i=this.points,s=t.length;return s&&i[t[s-1].end]}interpolate(t,i){const s=this.options,n=t[i],o=this.points,r=dh(this,{property:i,start:n,end:n});if(!r.length)return;const a=[],l=ny(s);let c,h;for(c=0,h=r.length;c<h;++c){const{start:d,end:u}=r[c],f=o[d],g=o[u];if(f===g){a.push(f);continue}const p=Math.abs((n-f[i])/(g[i]-f[i])),m=l(f,g,p,s.stepped);m[i]=t[i],a.push(m)}return a.length===1?a[0]:a}pathSegment(t,i,s){return _o(this)(t,this,i,s)}path(t,i,s){const n=this.segments,o=_o(this);let r=this._loop;i=i||0,s=s||this.points.length-i;for(const a of n)r&=o(t,this,a,{start:i,end:i+s-1});return!!r}draw(t,i,s,n){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),ly(t,this,s,n),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}C(re,"id","line"),C(re,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),C(re,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),C(re,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"&&e!=="fill"});function qa(e,t,i,s){const n=e.options,{[i]:o}=e.getProps([i],s);return Math.abs(t-o)<n.radius+n.hitRadius}class Di extends Qt{constructor(t){super(),C(this,"parsed"),C(this,"skip"),C(this,"stop"),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,i,s){const n=this.options,{x:o,y:r}=this.getProps(["x","y"],s);return Math.pow(t-o,2)+Math.pow(i-r,2)<Math.pow(n.hitRadius+n.radius,2)}inXRange(t,i){return qa(this,t,"x",i)}inYRange(t,i){return qa(this,t,"y",i)}getCenterPoint(t){const{x:i,y:s}=this.getProps(["x","y"],t);return{x:i,y:s}}size(t){t=t||this.options||{};let i=t.radius||0;i=Math.max(i,i&&t.hoverRadius||0);const s=i&&t.borderWidth||0;return(i+s)*2}draw(t,i){const s=this.options;this.skip||s.radius<.1||!qt(this,i,this.size(s)/2)||(t.strokeStyle=s.borderColor,t.lineWidth=s.borderWidth,t.fillStyle=s.backgroundColor,bo(t,s,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}C(Di,"id","point"),C(Di,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),C(Di,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Ah(e,t){const{x:i,y:s,base:n,width:o,height:r}=e.getProps(["x","y","base","width","height"],t);let a,l,c,h,d;return e.horizontal?(d=r/2,a=Math.min(i,n),l=Math.max(i,n),c=s-d,h=s+d):(d=o/2,a=i-d,l=i+d,c=Math.min(s,n),h=Math.max(s,n)),{left:a,top:c,right:l,bottom:h}}function ae(e,t,i,s){return e?0:ot(t,i,s)}function cy(e,t,i){const s=e.options.borderWidth,n=e.borderSkipped,o=th(s);return{t:ae(n.top,o.top,0,i),r:ae(n.right,o.right,0,t),b:ae(n.bottom,o.bottom,0,i),l:ae(n.left,o.left,0,t)}}function hy(e,t,i){const{enableBorderRadius:s}=e.getProps(["enableBorderRadius"]),n=e.options.borderRadius,o=Pe(n),r=Math.min(t,i),a=e.borderSkipped,l=s||L(n);return{topLeft:ae(!l||a.top||a.left,o.topLeft,0,r),topRight:ae(!l||a.top||a.right,o.topRight,0,r),bottomLeft:ae(!l||a.bottom||a.left,o.bottomLeft,0,r),bottomRight:ae(!l||a.bottom||a.right,o.bottomRight,0,r)}}function dy(e){const t=Ah(e),i=t.right-t.left,s=t.bottom-t.top,n=cy(e,i/2,s/2),o=hy(e,i/2,s/2);return{outer:{x:t.left,y:t.top,w:i,h:s,radius:o},inner:{x:t.left+n.l,y:t.top+n.t,w:i-n.l-n.r,h:s-n.t-n.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(n.t,n.l)),topRight:Math.max(0,o.topRight-Math.max(n.t,n.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(n.b,n.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(n.b,n.r))}}}}function Xn(e,t,i,s){const n=t===null,o=i===null,r=e&&!(n&&o)&&Ah(e,s);return r&&(n||Wt(t,r.left,r.right))&&(o||Wt(i,r.top,r.bottom))}function uy(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function fy(e,t){e.rect(t.x,t.y,t.w,t.h)}function Gn(e,t,i={}){const s=e.x!==i.x?-t:0,n=e.y!==i.y?-t:0,o=(e.x+e.w!==i.x+i.w?t:0)-s,r=(e.y+e.h!==i.y+i.h?t:0)-n;return{x:e.x+s,y:e.y+n,w:e.w+o,h:e.h+r,radius:e.radius}}class zi extends Qt{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:i,options:{borderColor:s,backgroundColor:n}}=this,{inner:o,outer:r}=dy(this),a=uy(r.radius)?qi:fy;t.save(),(r.w!==o.w||r.h!==o.h)&&(t.beginPath(),a(t,Gn(r,i,o)),t.clip(),a(t,Gn(o,-i,r)),t.fillStyle=s,t.fill("evenodd")),t.beginPath(),a(t,Gn(o,i)),t.fillStyle=n,t.fill(),t.restore()}inRange(t,i,s){return Xn(this,t,i,s)}inXRange(t,i){return Xn(this,t,null,i)}inYRange(t,i){return Xn(this,null,t,i)}getCenterPoint(t){const{x:i,y:s,base:n,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(i+n)/2:i,y:o?s:(s+n)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}C(zi,"id","bar"),C(zi,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),C(zi,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var py=Object.freeze({__proto__:null,ArcElement:Ne,BarElement:zi,LineElement:re,PointElement:Di});const wo=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Ya=wo.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function Eh(e){return wo[e%wo.length]}function Ph(e){return Ya[e%Ya.length]}function gy(e,t){return e.borderColor=Eh(t),e.backgroundColor=Ph(t),++t}function my(e,t){return e.backgroundColor=e.data.map(()=>Eh(t++)),t}function by(e,t){return e.backgroundColor=e.data.map(()=>Ph(t++)),t}function yy(e){let t=0;return(i,s)=>{const n=e.getDatasetMeta(s).controller;n instanceof Ee?t=my(i,t):n instanceof Ti?t=by(i,t):n&&(t=gy(i,t))}}function Xa(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function vy(e){return e&&(e.borderColor||e.backgroundColor)}function xy(){return X.borderColor!=="rgba(0,0,0,0.1)"||X.backgroundColor!=="rgba(0,0,0,0.1)"}var _y={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,i){if(!i.enabled)return;const{data:{datasets:s},options:n}=e.config,{elements:o}=n,r=Xa(s)||vy(n)||o&&Xa(o)||xy();if(!i.forceOverride&&r)return;const a=yy(e);s.forEach(a)}};function wy(e,t,i,s,n){const o=n.samples||s;if(o>=i)return e.slice(t,t+i);const r=[],a=(i-2)/(o-2);let l=0;const c=t+i-1;let h=t,d,u,f,g,p;for(r[l++]=e[h],d=0;d<o-2;d++){let m=0,b=0,y;const _=Math.floor((d+1)*a)+1+t,x=Math.min(Math.floor((d+2)*a)+1,i)+t,w=x-_;for(y=_;y<x;y++)m+=e[y].x,b+=e[y].y;m/=w,b/=w;const k=Math.floor(d*a)+1+t,M=Math.min(Math.floor((d+1)*a)+1,i)+t,{x:A,y:P}=e[h];for(f=g=-1,y=k;y<M;y++)g=.5*Math.abs((A-m)*(e[y].y-P)-(A-e[y].x)*(b-P)),g>f&&(f=g,u=e[y],p=y);r[l++]=u,h=p}return r[l++]=e[c],r}function ky(e,t,i,s){let n=0,o=0,r,a,l,c,h,d,u,f,g,p;const m=[],b=t+i-1,y=e[t].x,_=e[b].x-y;for(r=t;r<t+i;++r){a=e[r],l=(a.x-y)/_*s,c=a.y;const x=l|0;if(x===h)c<g?(g=c,d=r):c>p&&(p=c,u=r),n=(o*n+a.x)/++o;else{const w=r-1;if(!T(d)&&!T(u)){const k=Math.min(d,u),M=Math.max(d,u);k!==f&&k!==w&&m.push({...e[k],x:n}),M!==f&&M!==w&&m.push({...e[M],x:n})}r>0&&w!==f&&m.push(e[w]),m.push(a),h=x,o=0,g=p=c,d=u=f=r}}return m}function $h(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Ga(e){e.data.datasets.forEach(t=>{$h(t)})}function Sy(e,t){const i=t.length;let s=0,n;const{iScale:o}=e,{min:r,max:a,minDefined:l,maxDefined:c}=o.getUserBounds();return l&&(s=ot(Ut(t,o.axis,r).lo,0,i-1)),c?n=ot(Ut(t,o.axis,a).hi+1,s,i)-s:n=i-s,{start:s,count:n}}var My={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,i)=>{if(!i.enabled){Ga(e);return}const s=e.width;e.data.datasets.forEach((n,o)=>{const{_data:r,indexAxis:a}=n,l=e.getDatasetMeta(o),c=r||n.data;if(U([a,e.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const h=e.scales[l.xAxisID];if(h.type!=="linear"&&h.type!=="time"||e.options.parsing)return;let{start:d,count:u}=Sy(l,c);const f=i.threshold||4*s;if(u<=f){$h(n);return}T(r)&&(n._data=c,delete n.data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(p){this._data=p}}));let g;switch(i.algorithm){case"lttb":g=wy(c,d,u,s,i);break;case"min-max":g=ky(c,d,u,s);break;default:throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`)}n._decimated=g})},destroy(e){Ga(e)}};function Cy(e,t,i){const s=e.segments,n=e.points,o=t.points,r=[];for(const a of s){let{start:l,end:c}=a;c=Pn(l,c,n);const h=ko(i,n[l],n[c],a.loop);if(!t.segments){r.push({source:a,target:h,start:n[l],end:n[c]});continue}const d=dh(t,h);for(const u of d){const f=ko(i,o[u.start],o[u.end],u.loop),g=hh(a,n,f);for(const p of g)r.push({source:p,target:u,start:{[i]:Za(h,f,"start",Math.max)},end:{[i]:Za(h,f,"end",Math.min)}})}}return r}function ko(e,t,i,s){if(s)return;let n=t[e],o=i[e];return e==="angle"&&(n=ht(n),o=ht(o)),{property:e,start:n,end:o}}function Ay(e,t){const{x:i=null,y:s=null}=e||{},n=t.points,o=[];return t.segments.forEach(({start:r,end:a})=>{a=Pn(r,a,n);const l=n[r],c=n[a];s!==null?(o.push({x:l.x,y:s}),o.push({x:c.x,y:s})):i!==null&&(o.push({x:i,y:l.y}),o.push({x:i,y:c.y}))}),o}function Pn(e,t,i){for(;t>e;t--){const s=i[t];if(!isNaN(s.x)&&!isNaN(s.y))break}return t}function Za(e,t,i,s){return e&&t?s(e[i],t[i]):e?e[i]:t?t[i]:0}function Oh(e,t){let i=[],s=!1;return q(e)?(s=!0,i=e):i=Ay(e,t),i.length?new re({points:i,options:{tension:0},_loop:s,_fullLoop:s}):null}function Ka(e){return e&&e.fill!==!1}function Ey(e,t,i){let s=e[t].fill;const n=[t];let o;if(!i)return s;for(;s!==!1&&n.indexOf(s)===-1;){if(!J(s))return s;if(o=e[s],!o)return!1;if(o.visible)return s;n.push(s),s=o.fill}return!1}function Py(e,t,i){const s=Dy(e);if(L(s))return isNaN(s.value)?!1:s;let n=parseFloat(s);return J(n)&&Math.floor(n)===n?$y(s[0],t,n,i):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function $y(e,t,i,s){return(e==="-"||e==="+")&&(i=t+i),i===t||i<0||i>=s?!1:i}function Oy(e,t){let i=null;return e==="start"?i=t.bottom:e==="end"?i=t.top:L(e)?i=t.getPixelForValue(e.value):t.getBasePixel&&(i=t.getBasePixel()),i}function Ty(e,t,i){let s;return e==="start"?s=i:e==="end"?s=t.options.reverse?t.min:t.max:L(e)?s=e.value:s=t.getBaseValue(),s}function Dy(e){const t=e.options,i=t.fill;let s=O(i&&i.target,i);return s===void 0&&(s=!!t.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function zy(e){const{scale:t,index:i,line:s}=e,n=[],o=s.segments,r=s.points,a=Ly(t,i);a.push(Oh({x:null,y:t.bottom},s));for(let l=0;l<o.length;l++){const c=o[l];for(let h=c.start;h<=c.end;h++)Ry(n,r[h],a)}return new re({points:n,options:{}})}function Ly(e,t){const i=[],s=e.getMatchingVisibleMetas("line");for(let n=0;n<s.length;n++){const o=s[n];if(o.index===t)break;o.hidden||i.unshift(o.dataset)}return i}function Ry(e,t,i){const s=[];for(let n=0;n<i.length;n++){const o=i[n],{first:r,last:a,point:l}=Iy(o,t,"x");if(!(!l||r&&a)){if(r)s.unshift(l);else if(e.push(l),!a)break}}e.push(...s)}function Iy(e,t,i){const s=e.interpolate(t,i);if(!s)return{};const n=s[i],o=e.segments,r=e.points;let a=!1,l=!1;for(let c=0;c<o.length;c++){const h=o[c],d=r[h.start][i],u=r[h.end][i];if(Wt(n,d,u)){a=n===d,l=n===u;break}}return{first:a,last:l,point:s}}class Th{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,i,s){const{x:n,y:o,radius:r}=this;return i=i||{start:0,end:Y},t.arc(n,o,r,i.end,i.start,!0),!s.bounds}interpolate(t){const{x:i,y:s,radius:n}=this,o=t.angle;return{x:i+Math.cos(o)*n,y:s+Math.sin(o)*n,angle:o}}}function Fy(e){const{chart:t,fill:i,line:s}=e;if(J(i))return By(t,i);if(i==="stack")return zy(e);if(i==="shape")return!0;const n=jy(e);return n instanceof Th?n:Oh(n,s)}function By(e,t){const i=e.getDatasetMeta(t);return i&&e.isDatasetVisible(t)?i.dataset:null}function jy(e){return(e.scale||{}).getPointPositionForValue?Ny(e):Hy(e)}function Hy(e){const{scale:t={},fill:i}=e,s=Oy(i,t);if(J(s)){const n=t.isHorizontal();return{x:n?s:null,y:n?null:s}}return null}function Ny(e){const{scale:t,fill:i}=e,s=t.options,n=t.getLabels().length,o=s.reverse?t.max:t.min,r=Ty(i,t,o),a=[];if(s.grid.circular){const l=t.getPointPositionForValue(0,o);return new Th({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(r)})}for(let l=0;l<n;++l)a.push(t.getPointPositionForValue(l,r));return a}function Zn(e,t,i){const s=Fy(t),{chart:n,index:o,line:r,scale:a,axis:l}=t,c=r.options,h=c.fill,d=c.backgroundColor,{above:u=d,below:f=d}=h||{},g=n.getDatasetMeta(o),p=uh(n,g);s&&r.points.length&&(Mn(e,i),Vy(e,{line:r,target:s,above:u,below:f,area:i,scale:a,axis:l,clip:p}),Cn(e))}function Vy(e,t){const{line:i,target:s,above:n,below:o,area:r,scale:a,clip:l}=t,c=i._loop?"angle":t.axis;e.save();let h=o;o!==n&&(c==="x"?(Ja(e,s,r.top),Kn(e,{line:i,target:s,color:n,scale:a,property:c,clip:l}),e.restore(),e.save(),Ja(e,s,r.bottom)):c==="y"&&(Qa(e,s,r.left),Kn(e,{line:i,target:s,color:o,scale:a,property:c,clip:l}),e.restore(),e.save(),Qa(e,s,r.right),h=n)),Kn(e,{line:i,target:s,color:h,scale:a,property:c,clip:l}),e.restore()}function Ja(e,t,i){const{segments:s,points:n}=t;let o=!0,r=!1;e.beginPath();for(const a of s){const{start:l,end:c}=a,h=n[l],d=n[Pn(l,c,n)];o?(e.moveTo(h.x,h.y),o=!1):(e.lineTo(h.x,i),e.lineTo(h.x,h.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(d.x,i)}e.lineTo(t.first().x,i),e.closePath(),e.clip()}function Qa(e,t,i){const{segments:s,points:n}=t;let o=!0,r=!1;e.beginPath();for(const a of s){const{start:l,end:c}=a,h=n[l],d=n[Pn(l,c,n)];o?(e.moveTo(h.x,h.y),o=!1):(e.lineTo(i,h.y),e.lineTo(h.x,h.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(i,d.y)}e.lineTo(i,t.first().y),e.closePath(),e.clip()}function Kn(e,t){const{line:i,target:s,property:n,color:o,scale:r,clip:a}=t,l=Cy(i,s,n);for(const{source:c,target:h,start:d,end:u}of l){const{style:{backgroundColor:f=o}={}}=c,g=s!==!0;e.save(),e.fillStyle=f,Wy(e,r,a,g&&ko(n,d,u)),e.beginPath();const p=!!i.pathSegment(e,c);let m;if(g){p?e.closePath():tl(e,s,u,n);const b=!!s.pathSegment(e,h,{move:p,reverse:!0});m=p&&b,m||tl(e,s,d,n)}e.closePath(),e.fill(m?"evenodd":"nonzero"),e.restore()}}function Wy(e,t,i,s){const n=t.chart.chartArea,{property:o,start:r,end:a}=s||{};if(o==="x"||o==="y"){let l,c,h,d;o==="x"?(l=r,c=n.top,h=a,d=n.bottom):(l=n.left,c=r,h=n.right,d=a),e.beginPath(),i&&(l=Math.max(l,i.left),h=Math.min(h,i.right),c=Math.max(c,i.top),d=Math.min(d,i.bottom)),e.rect(l,c,h-l,d-c),e.clip()}}function tl(e,t,i,s){const n=t.interpolate(i,s);n&&e.lineTo(n.x,n.y)}var Uy={id:"filler",afterDatasetsUpdate(e,t,i){const s=(e.data.datasets||[]).length,n=[];let o,r,a,l;for(r=0;r<s;++r)o=e.getDatasetMeta(r),a=o.dataset,l=null,a&&a.options&&a instanceof re&&(l={visible:e.isDatasetVisible(r),index:r,fill:Py(a,r,s),chart:e,axis:o.controller.options.indexAxis,scale:o.vScale,line:a}),o.$filler=l,n.push(l);for(r=0;r<s;++r)l=n[r],!(!l||l.fill===!1)&&(l.fill=Ey(n,r,i.propagate))},beforeDraw(e,t,i){const s=i.drawTime==="beforeDraw",n=e.getSortedVisibleDatasetMetas(),o=e.chartArea;for(let r=n.length-1;r>=0;--r){const a=n[r].$filler;a&&(a.line.updateControlPoints(o,a.axis),s&&a.fill&&Zn(e.ctx,a,o))}},beforeDatasetsDraw(e,t,i){if(i.drawTime!=="beforeDatasetsDraw")return;const s=e.getSortedVisibleDatasetMetas();for(let n=s.length-1;n>=0;--n){const o=s[n].$filler;Ka(o)&&Zn(e.ctx,o,e.chartArea)}},beforeDatasetDraw(e,t,i){const s=t.meta.$filler;!Ka(s)||i.drawTime!=="beforeDatasetDraw"||Zn(e.ctx,s,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const el=(e,t)=>{let{boxHeight:i=t,boxWidth:s=t}=e;return e.usePointStyle&&(i=Math.min(i,t),s=e.pointStyleWidth||Math.min(s,t)),{boxWidth:s,boxHeight:i,itemHeight:Math.max(t,i)}},qy=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class il extends Qt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,i,s){this.maxWidth=t,this.maxHeight=i,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let i=V(t.generateLabels,[this.chart],this)||[];t.filter&&(i=i.filter(s=>t.filter(s,this.chart.data))),t.sort&&(i=i.sort((s,n)=>t.sort(s,n,this.chart.data))),this.options.reverse&&i.reverse(),this.legendItems=i}fit(){const{options:t,ctx:i}=this;if(!t.display){this.width=this.height=0;return}const s=t.labels,n=nt(s.font),o=n.size,r=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=el(s,o);let c,h;i.font=n.string,this.isHorizontal()?(c=this.maxWidth,h=this._fitRows(r,o,a,l)+10):(h=this.maxHeight,c=this._fitCols(r,n,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,i,s,n){const{ctx:o,maxWidth:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],h=n+a;let d=t;o.textAlign="left",o.textBaseline="middle";let u=-1,f=-h;return this.legendItems.forEach((g,p)=>{const m=s+i/2+o.measureText(g.text).width;(p===0||c[c.length-1]+m+2*a>r)&&(d+=h,c[c.length-(p>0?0:1)]=0,f+=h,u++),l[p]={left:0,top:f,row:u,width:m,height:n},c[c.length-1]+=m+a}),d}_fitCols(t,i,s,n){const{ctx:o,maxHeight:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],h=r-t;let d=a,u=0,f=0,g=0,p=0;return this.legendItems.forEach((m,b)=>{const{itemWidth:y,itemHeight:_}=Yy(s,i,o,m,n);b>0&&f+_+2*a>h&&(d+=u+a,c.push({width:u,height:f}),g+=u+a,p++,u=f=0),l[b]={left:g,top:f,col:p,width:y,height:_},u=Math.max(u,y),f+=_+a}),d+=u,c.push({width:u,height:f}),d}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:i,options:{align:s,labels:{padding:n},rtl:o}}=this,r=Ue(o,this.left,this.width);if(this.isHorizontal()){let a=0,l=ct(s,this.left+n,this.right-this.lineWidths[a]);for(const c of i)a!==c.row&&(a=c.row,l=ct(s,this.left+n,this.right-this.lineWidths[a])),c.top+=this.top+t+n,c.left=r.leftForLtr(r.x(l),c.width),l+=c.width+n}else{let a=0,l=ct(s,this.top+t+n,this.bottom-this.columnSizes[a].height);for(const c of i)c.col!==a&&(a=c.col,l=ct(s,this.top+t+n,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+n,c.left=r.leftForLtr(r.x(c.left),c.width),l+=c.height+n}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Mn(t,this),this._draw(),Cn(t)}}_draw(){const{options:t,columnSizes:i,lineWidths:s,ctx:n}=this,{align:o,labels:r}=t,a=X.color,l=Ue(t.rtl,this.left,this.width),c=nt(r.font),{padding:h}=r,d=c.size,u=d/2;let f;this.drawTitle(),n.textAlign=l.textAlign("left"),n.textBaseline="middle",n.lineWidth=.5,n.font=c.string;const{boxWidth:g,boxHeight:p,itemHeight:m}=el(r,d),b=function(k,M,A){if(isNaN(g)||g<=0||isNaN(p)||p<0)return;n.save();const P=O(A.lineWidth,1);if(n.fillStyle=O(A.fillStyle,a),n.lineCap=O(A.lineCap,"butt"),n.lineDashOffset=O(A.lineDashOffset,0),n.lineJoin=O(A.lineJoin,"miter"),n.lineWidth=P,n.strokeStyle=O(A.strokeStyle,a),n.setLineDash(O(A.lineDash,[])),r.usePointStyle){const E={radius:p*Math.SQRT2/2,pointStyle:A.pointStyle,rotation:A.rotation,borderWidth:P},D=l.xPlus(k,g/2),z=M+u;Qc(n,E,D,z,r.pointStyleWidth&&g)}else{const E=M+Math.max((d-p)/2,0),D=l.leftForLtr(k,g),z=Pe(A.borderRadius);n.beginPath(),Object.values(z).some(it=>it!==0)?qi(n,{x:D,y:E,w:g,h:p,radius:z}):n.rect(D,E,g,p),n.fill(),P!==0&&n.stroke()}n.restore()},y=function(k,M,A){ze(n,A.text,k,M+m/2,c,{strikethrough:A.hidden,textAlign:l.textAlign(A.textAlign)})},_=this.isHorizontal(),x=this._computeTitleHeight();_?f={x:ct(o,this.left+h,this.right-s[0]),y:this.top+h+x,line:0}:f={x:this.left+h,y:ct(o,this.top+x+h,this.bottom-i[0].height),line:0},ah(this.ctx,t.textDirection);const w=m+h;this.legendItems.forEach((k,M)=>{n.strokeStyle=k.fontColor,n.fillStyle=k.fontColor;const A=n.measureText(k.text).width,P=l.textAlign(k.textAlign||(k.textAlign=r.textAlign)),E=g+u+A;let D=f.x,z=f.y;l.setWidth(this.width),_?M>0&&D+E+h>this.right&&(z=f.y+=w,f.line++,D=f.x=ct(o,this.left+h,this.right-s[f.line])):M>0&&z+w>this.bottom&&(D=f.x=D+i[f.line].width+h,f.line++,z=f.y=ct(o,this.top+x+h,this.bottom-i[f.line].height));const it=l.x(D);if(b(it,z,k),D=ug(P,D+g+u,_?D+E:this.right,t.rtl),y(l.x(D),z,k),_)f.x+=E+h;else if(typeof k.text!="string"){const G=c.lineHeight;f.y+=Dh(k,G)+h}else f.y+=w}),lh(this.ctx,t.textDirection)}drawTitle(){const t=this.options,i=t.title,s=nt(i.font),n=rt(i.padding);if(!i.display)return;const o=Ue(t.rtl,this.left,this.width),r=this.ctx,a=i.position,l=s.size/2,c=n.top+l;let h,d=this.left,u=this.width;if(this.isHorizontal())u=Math.max(...this.lineWidths),h=this.top+c,d=ct(t.align,d,this.right-u);else{const g=this.columnSizes.reduce((p,m)=>Math.max(p,m.height),0);h=c+ct(t.align,this.top,this.bottom-g-t.labels.padding-this._computeTitleHeight())}const f=ct(a,d,d+u);r.textAlign=o.textAlign(tr(a)),r.textBaseline="middle",r.strokeStyle=i.color,r.fillStyle=i.color,r.font=s.string,ze(r,i.text,f,h,s)}_computeTitleHeight(){const t=this.options.title,i=nt(t.font),s=rt(t.padding);return t.display?i.lineHeight+s.height:0}_getLegendItemAt(t,i){let s,n,o;if(Wt(t,this.left,this.right)&&Wt(i,this.top,this.bottom)){for(o=this.legendHitBoxes,s=0;s<o.length;++s)if(n=o[s],Wt(t,n.left,n.left+n.width)&&Wt(i,n.top,n.top+n.height))return this.legendItems[s]}return null}handleEvent(t){const i=this.options;if(!Zy(t.type,i))return;const s=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const n=this._hoveredItem,o=qy(n,s);n&&!o&&V(i.onLeave,[t,n,this],this),this._hoveredItem=s,s&&!o&&V(i.onHover,[t,s,this],this)}else s&&V(i.onClick,[t,s,this],this)}}function Yy(e,t,i,s,n){const o=Xy(s,e,t,i),r=Gy(n,s,t.lineHeight);return{itemWidth:o,itemHeight:r}}function Xy(e,t,i,s){let n=e.text;return n&&typeof n!="string"&&(n=n.reduce((o,r)=>o.length>r.length?o:r)),t+i.size/2+s.measureText(n).width}function Gy(e,t,i){let s=e;return typeof t.text!="string"&&(s=Dh(t,i)),s}function Dh(e,t){const i=e.text?e.text.length:0;return t*i}function Zy(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var Ky={id:"legend",_element:il,start(e,t,i){const s=e.legend=new il({ctx:e.ctx,options:i,chart:e});dt.configure(e,s,i),dt.addBox(e,s)},stop(e){dt.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,i){const s=e.legend;dt.configure(e,s,i),s.options=i},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,i){const s=t.datasetIndex,n=i.chart;n.isDatasetVisible(s)?(n.hide(s),t.hidden=!0):(n.show(s),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:i,pointStyle:s,textAlign:n,color:o,useBorderRadius:r,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(i?0:void 0),h=rt(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:c.borderColor,pointStyle:s||c.pointStyle,rotation:c.rotation,textAlign:n||c.textAlign,borderRadius:r&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class cr extends Qt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,i){const s=this.options;if(this.left=0,this.top=0,!s.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=i;const n=q(s.text)?s.text.length:1;this._padding=rt(s.padding);const o=n*nt(s.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:i,left:s,bottom:n,right:o,options:r}=this,a=r.align;let l=0,c,h,d;return this.isHorizontal()?(h=ct(a,s,o),d=i+t,c=o-s):(r.position==="left"?(h=s+t,d=ct(a,n,i),l=B*-.5):(h=o-t,d=ct(a,i,n),l=B*.5),c=n-i),{titleX:h,titleY:d,maxWidth:c,rotation:l}}draw(){const t=this.ctx,i=this.options;if(!i.display)return;const s=nt(i.font),n=s.lineHeight/2+this._padding.top,{titleX:o,titleY:r,maxWidth:a,rotation:l}=this._drawArgs(n);ze(t,i.text,0,0,s,{color:i.color,maxWidth:a,rotation:l,textAlign:tr(i.align),textBaseline:"middle",translation:[o,r]})}}function Jy(e,t){const i=new cr({ctx:e.ctx,options:t,chart:e});dt.configure(e,i,t),dt.addBox(e,i),e.titleBlock=i}var Qy={id:"title",_element:cr,start(e,t,i){Jy(e,i)},stop(e){const t=e.titleBlock;dt.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,i){const s=e.titleBlock;dt.configure(e,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Cs=new WeakMap;var tv={id:"subtitle",start(e,t,i){const s=new cr({ctx:e.ctx,options:i,chart:e});dt.configure(e,s,i),dt.addBox(e,s),Cs.set(e,s)},stop(e){dt.removeBox(e,Cs.get(e)),Cs.delete(e)},beforeUpdate(e,t,i){const s=Cs.get(e);dt.configure(e,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ki={average(e){if(!e.length)return!1;let t,i,s=new Set,n=0,o=0;for(t=0,i=e.length;t<i;++t){const r=e[t].element;if(r&&r.hasValue()){const a=r.tooltipPosition();s.add(a.x),n+=a.y,++o}}return o===0||s.size===0?!1:{x:[...s].reduce((r,a)=>r+a)/s.size,y:n/o}},nearest(e,t){if(!e.length)return!1;let i=t.x,s=t.y,n=Number.POSITIVE_INFINITY,o,r,a;for(o=0,r=e.length;o<r;++o){const l=e[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),h=go(t,c);h<n&&(n=h,a=l)}}if(a){const l=a.tooltipPosition();i=l.x,s=l.y}return{x:i,y:s}}};function Tt(e,t){return t&&(q(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Ht(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function ev(e,t){const{element:i,datasetIndex:s,index:n}=t,o=e.getDatasetMeta(s).controller,{label:r,value:a}=o.getLabelAndValue(n);return{chart:e,label:r,parsed:o.getParsed(n),raw:e.data.datasets[s].data[n],formattedValue:a,dataset:o.getDataset(),dataIndex:n,datasetIndex:s,element:i}}function sl(e,t){const i=e.chart.ctx,{body:s,footer:n,title:o}=e,{boxWidth:r,boxHeight:a}=t,l=nt(t.bodyFont),c=nt(t.titleFont),h=nt(t.footerFont),d=o.length,u=n.length,f=s.length,g=rt(t.padding);let p=g.height,m=0,b=s.reduce((x,w)=>x+w.before.length+w.lines.length+w.after.length,0);if(b+=e.beforeBody.length+e.afterBody.length,d&&(p+=d*c.lineHeight+(d-1)*t.titleSpacing+t.titleMarginBottom),b){const x=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;p+=f*x+(b-f)*l.lineHeight+(b-1)*t.bodySpacing}u&&(p+=t.footerMarginTop+u*h.lineHeight+(u-1)*t.footerSpacing);let y=0;const _=function(x){m=Math.max(m,i.measureText(x).width+y)};return i.save(),i.font=c.string,H(e.title,_),i.font=l.string,H(e.beforeBody.concat(e.afterBody),_),y=t.displayColors?r+2+t.boxPadding:0,H(s,x=>{H(x.before,_),H(x.lines,_),H(x.after,_)}),y=0,i.font=h.string,H(e.footer,_),i.restore(),m+=g.width,{width:m,height:p}}function iv(e,t){const{y:i,height:s}=t;return i<s/2?"top":i>e.height-s/2?"bottom":"center"}function sv(e,t,i,s){const{x:n,width:o}=s,r=i.caretSize+i.caretPadding;if(e==="left"&&n+o+r>t.width||e==="right"&&n-o-r<0)return!0}function nv(e,t,i,s){const{x:n,width:o}=i,{width:r,chartArea:{left:a,right:l}}=e;let c="center";return s==="center"?c=n<=(a+l)/2?"left":"right":n<=o/2?c="left":n>=r-o/2&&(c="right"),sv(c,e,t,i)&&(c="center"),c}function nl(e,t,i){const s=i.yAlign||t.yAlign||iv(e,i);return{xAlign:i.xAlign||t.xAlign||nv(e,t,i,s),yAlign:s}}function ov(e,t){let{x:i,width:s}=e;return t==="right"?i-=s:t==="center"&&(i-=s/2),i}function rv(e,t,i){let{y:s,height:n}=e;return t==="top"?s+=i:t==="bottom"?s-=n+i:s-=n/2,s}function ol(e,t,i,s){const{caretSize:n,caretPadding:o,cornerRadius:r}=e,{xAlign:a,yAlign:l}=i,c=n+o,{topLeft:h,topRight:d,bottomLeft:u,bottomRight:f}=Pe(r);let g=ov(t,a);const p=rv(t,l,c);return l==="center"?a==="left"?g+=c:a==="right"&&(g-=c):a==="left"?g-=Math.max(h,u)+n:a==="right"&&(g+=Math.max(d,f)+n),{x:ot(g,0,s.width-t.width),y:ot(p,0,s.height-t.height)}}function As(e,t,i){const s=rt(i.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-s.right:e.x+s.left}function rl(e){return Tt([],Ht(e))}function av(e,t,i){return be(e,{tooltip:t,tooltipItems:i,type:"tooltip"})}function al(e,t){const i=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return i?e.override(i):e}const zh={beforeTitle:Bt,title(e){if(e.length>0){const t=e[0],i=t.chart.data.labels,s=i?i.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return i[t.dataIndex]}return""},afterTitle:Bt,beforeBody:Bt,beforeLabel:Bt,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const i=e.formattedValue;return T(i)||(t+=i),t},labelColor(e){const t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:t.borderColor,backgroundColor:t.backgroundColor,borderWidth:t.borderWidth,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:t.pointStyle,rotation:t.rotation}},afterLabel:Bt,afterBody:Bt,beforeFooter:Bt,footer:Bt,afterFooter:Bt};function pt(e,t,i,s){const n=e[t].call(i,s);return typeof n>"u"?zh[t].call(i,s):n}var Jn;let ll=(Jn=class extends Qt{constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const e=this._cachedAnimations;if(e)return e;const t=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&t.options.animation&&i.animations,n=new fh(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(n)),n}getContext(){return this.$context||(this.$context=av(this.chart.getContext(),this,this._tooltipItems))}getTitle(e,t){const{callbacks:i}=t,s=pt(i,"beforeTitle",this,e),n=pt(i,"title",this,e),o=pt(i,"afterTitle",this,e);let r=[];return r=Tt(r,Ht(s)),r=Tt(r,Ht(n)),r=Tt(r,Ht(o)),r}getBeforeBody(e,t){return rl(pt(t.callbacks,"beforeBody",this,e))}getBody(e,t){const{callbacks:i}=t,s=[];return H(e,n=>{const o={before:[],lines:[],after:[]},r=al(i,n);Tt(o.before,Ht(pt(r,"beforeLabel",this,n))),Tt(o.lines,pt(r,"label",this,n)),Tt(o.after,Ht(pt(r,"afterLabel",this,n))),s.push(o)}),s}getAfterBody(e,t){return rl(pt(t.callbacks,"afterBody",this,e))}getFooter(e,t){const{callbacks:i}=t,s=pt(i,"beforeFooter",this,e),n=pt(i,"footer",this,e),o=pt(i,"afterFooter",this,e);let r=[];return r=Tt(r,Ht(s)),r=Tt(r,Ht(n)),r=Tt(r,Ht(o)),r}_createItems(e){const t=this._active,i=this.chart.data,s=[],n=[],o=[];let r=[],a,l;for(a=0,l=t.length;a<l;++a)r.push(ev(this.chart,t[a]));return e.filter&&(r=r.filter((c,h,d)=>e.filter(c,h,d,i))),e.itemSort&&(r=r.sort((c,h)=>e.itemSort(c,h,i))),H(r,c=>{const h=al(e.callbacks,c);s.push(pt(h,"labelColor",this,c)),n.push(pt(h,"labelPointStyle",this,c)),o.push(pt(h,"labelTextColor",this,c))}),this.labelColors=s,this.labelPointStyles=n,this.labelTextColors=o,this.dataPoints=r,r}update(e,t){const i=this.options.setContext(this.getContext()),s=this._active;let n,o=[];if(!s.length)this.opacity!==0&&(n={opacity:0});else{const r=ki[i.position].call(this,s,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const a=this._size=sl(this,i),l=Object.assign({},r,a),c=nl(this.chart,i,l),h=ol(i,l,c,this.chart);this.xAlign=c.xAlign,this.yAlign=c.yAlign,n={opacity:1,x:h.x,y:h.y,width:a.width,height:a.height,caretX:r.x,caretY:r.y}}this._tooltipItems=o,this.$context=void 0,n&&this._resolveAnimations().update(this,n),e&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:t})}drawCaret(e,t,i,s){const n=this.getCaretPosition(e,i,s);t.lineTo(n.x1,n.y1),t.lineTo(n.x2,n.y2),t.lineTo(n.x3,n.y3)}getCaretPosition(e,t,i){const{xAlign:s,yAlign:n}=this,{caretSize:o,cornerRadius:r}=i,{topLeft:a,topRight:l,bottomLeft:c,bottomRight:h}=Pe(r),{x:d,y:u}=e,{width:f,height:g}=t;let p,m,b,y,_,x;return n==="center"?(_=u+g/2,s==="left"?(p=d,m=p-o,y=_+o,x=_-o):(p=d+f,m=p+o,y=_-o,x=_+o),b=p):(s==="left"?m=d+Math.max(a,c)+o:s==="right"?m=d+f-Math.max(l,h)-o:m=this.caretX,n==="top"?(y=u,_=y-o,p=m-o,b=m+o):(y=u+g,_=y+o,p=m+o,b=m-o),x=y),{x1:p,x2:m,x3:b,y1:y,y2:_,y3:x}}drawTitle(e,t,i){const s=this.title,n=s.length;let o,r,a;if(n){const l=Ue(i.rtl,this.x,this.width);for(e.x=As(this,i.titleAlign,i),t.textAlign=l.textAlign(i.titleAlign),t.textBaseline="middle",o=nt(i.titleFont),r=i.titleSpacing,t.fillStyle=i.titleColor,t.font=o.string,a=0;a<n;++a)t.fillText(s[a],l.x(e.x),e.y+o.lineHeight/2),e.y+=o.lineHeight+r,a+1===n&&(e.y+=i.titleMarginBottom-r)}}_drawColorBox(e,t,i,s,n){const o=this.labelColors[i],r=this.labelPointStyles[i],{boxHeight:a,boxWidth:l}=n,c=nt(n.bodyFont),h=As(this,"left",n),d=s.x(h),u=a<c.lineHeight?(c.lineHeight-a)/2:0,f=t.y+u;if(n.usePointStyle){const g={radius:Math.min(l,a)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},p=s.leftForLtr(d,l)+l/2,m=f+a/2;e.strokeStyle=n.multiKeyBackground,e.fillStyle=n.multiKeyBackground,bo(e,g,p,m),e.strokeStyle=o.borderColor,e.fillStyle=o.backgroundColor,bo(e,g,p,m)}else{e.lineWidth=L(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,e.strokeStyle=o.borderColor,e.setLineDash(o.borderDash||[]),e.lineDashOffset=o.borderDashOffset||0;const g=s.leftForLtr(d,l),p=s.leftForLtr(s.xPlus(d,1),l-2),m=Pe(o.borderRadius);Object.values(m).some(b=>b!==0)?(e.beginPath(),e.fillStyle=n.multiKeyBackground,qi(e,{x:g,y:f,w:l,h:a,radius:m}),e.fill(),e.stroke(),e.fillStyle=o.backgroundColor,e.beginPath(),qi(e,{x:p,y:f+1,w:l-2,h:a-2,radius:m}),e.fill()):(e.fillStyle=n.multiKeyBackground,e.fillRect(g,f,l,a),e.strokeRect(g,f,l,a),e.fillStyle=o.backgroundColor,e.fillRect(p,f+1,l-2,a-2))}e.fillStyle=this.labelTextColors[i]}drawBody(e,t,i){const{body:s}=this,{bodySpacing:n,bodyAlign:o,displayColors:r,boxHeight:a,boxWidth:l,boxPadding:c}=i,h=nt(i.bodyFont);let d=h.lineHeight,u=0;const f=Ue(i.rtl,this.x,this.width),g=function(M){t.fillText(M,f.x(e.x+u),e.y+d/2),e.y+=d+n},p=f.textAlign(o);let m,b,y,_,x,w,k;for(t.textAlign=o,t.textBaseline="middle",t.font=h.string,e.x=As(this,p,i),t.fillStyle=i.bodyColor,H(this.beforeBody,g),u=r&&p!=="right"?o==="center"?l/2+c:l+2+c:0,_=0,w=s.length;_<w;++_){for(m=s[_],b=this.labelTextColors[_],t.fillStyle=b,H(m.before,g),y=m.lines,r&&y.length&&(this._drawColorBox(t,e,_,f,i),d=Math.max(h.lineHeight,a)),x=0,k=y.length;x<k;++x)g(y[x]),d=h.lineHeight;H(m.after,g)}u=0,d=h.lineHeight,H(this.afterBody,g),e.y-=n}drawFooter(e,t,i){const s=this.footer,n=s.length;let o,r;if(n){const a=Ue(i.rtl,this.x,this.width);for(e.x=As(this,i.footerAlign,i),e.y+=i.footerMarginTop,t.textAlign=a.textAlign(i.footerAlign),t.textBaseline="middle",o=nt(i.footerFont),t.fillStyle=i.footerColor,t.font=o.string,r=0;r<n;++r)t.fillText(s[r],a.x(e.x),e.y+o.lineHeight/2),e.y+=o.lineHeight+i.footerSpacing}}drawBackground(e,t,i,s){const{xAlign:n,yAlign:o}=this,{x:r,y:a}=e,{width:l,height:c}=i,{topLeft:h,topRight:d,bottomLeft:u,bottomRight:f}=Pe(s.cornerRadius);t.fillStyle=s.backgroundColor,t.strokeStyle=s.borderColor,t.lineWidth=s.borderWidth,t.beginPath(),t.moveTo(r+h,a),o==="top"&&this.drawCaret(e,t,i,s),t.lineTo(r+l-d,a),t.quadraticCurveTo(r+l,a,r+l,a+d),o==="center"&&n==="right"&&this.drawCaret(e,t,i,s),t.lineTo(r+l,a+c-f),t.quadraticCurveTo(r+l,a+c,r+l-f,a+c),o==="bottom"&&this.drawCaret(e,t,i,s),t.lineTo(r+u,a+c),t.quadraticCurveTo(r,a+c,r,a+c-u),o==="center"&&n==="left"&&this.drawCaret(e,t,i,s),t.lineTo(r,a+h),t.quadraticCurveTo(r,a,r+h,a),t.closePath(),t.fill(),s.borderWidth>0&&t.stroke()}_updateAnimationTarget(e){const t=this.chart,i=this.$animations,s=i&&i.x,n=i&&i.y;if(s||n){const o=ki[e.position].call(this,this._active,this._eventPosition);if(!o)return;const r=this._size=sl(this,e),a=Object.assign({},o,this._size),l=nl(t,e,a),c=ol(e,a,l,t);(s._to!==c.x||n._to!==c.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=r.width,this.height=r.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,c))}}_willRender(){return!!this.opacity}draw(e){const t=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(t);const s={width:this.width,height:this.height},n={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=rt(t.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;t.enabled&&r&&(e.save(),e.globalAlpha=i,this.drawBackground(n,e,s,t),ah(e,t.textDirection),n.y+=o.top,this.drawTitle(n,e,t),this.drawBody(n,e,t),this.drawFooter(n,e,t),lh(e,t.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,t){const i=this._active,s=e.map(({datasetIndex:r,index:a})=>{const l=this.chart.getDatasetMeta(r);if(!l)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:l.data[a],index:a}}),n=!Qs(i,s),o=this._positionChanged(s,t);(n||o)&&(this._active=s,this._eventPosition=t,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,t,i=!0){if(t&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,n=this._active||[],o=this._getActiveElements(e,n,t,i),r=this._positionChanged(o,e),a=t||!Qs(o,n)||r;return a&&(this._active=o,(s.enabled||s.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,t))),a}_getActiveElements(e,t,i,s){const n=this.options;if(e.type==="mouseout")return[];if(!s)return t.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const o=this.chart.getElementsAtEventForMode(e,n.mode,n,i);return n.reverse&&o.reverse(),o}_positionChanged(e,t){const{caretX:i,caretY:s,options:n}=this,o=ki[n.position].call(this,e,t);return o!==!1&&(i!==o.x||s!==o.y)}},C(Jn,"positioners",ki),Jn);var lv={id:"tooltip",_element:ll,positioners:ki,afterInit(e,t,i){i&&(e.tooltip=new ll({chart:e,options:i}))},beforeUpdate(e,t,i){e.tooltip&&e.tooltip.initialize(i)},reset(e,t,i){e.tooltip&&e.tooltip.initialize(i)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const i={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...i,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",i)}},afterEvent(e,t){if(e.tooltip){const i=t.replay;e.tooltip.handleEvent(t.event,i,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:zh},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},cv=Object.freeze({__proto__:null,Colors:_y,Decimation:My,Filler:Uy,Legend:Ky,SubTitle:tv,Title:Qy,Tooltip:lv});const hv=(e,t,i,s)=>(typeof t=="string"?(i=e.push(t)-1,s.unshift({index:i,label:t})):isNaN(t)&&(i=null),i);function dv(e,t,i,s){const n=e.indexOf(t);if(n===-1)return hv(e,t,i,s);const o=e.lastIndexOf(t);return n!==o?i:n}const uv=(e,t)=>e===null?null:ot(Math.round(e),0,t);function Lh(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class So extends Ie{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const i=this._addedLabels;if(i.length){const s=this.getLabels();for(const{index:n,label:o}of i)s[n]===o&&s.splice(n,1);this._addedLabels=[]}super.init(t)}parse(t,i){if(T(t))return null;const s=this.getLabels();return i=isFinite(i)&&s[i]===t?i:dv(s,t,O(i,t),this._addedLabels),uv(i,s.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:i}=this.getUserBounds();let{min:s,max:n}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(s=0),i||(n=this.getLabels().length-1)),this.min=s,this.max=n}buildTicks(){const t=this.min,i=this.max,s=this.options.offset,n=[];let o=this.getLabels();o=t===0&&i===o.length-1?o:o.slice(t,i+1),this._valueRange=Math.max(o.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let r=t;r<=i;r++)n.push({value:r});return n}getLabelForValue(t){return Lh.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const i=this.ticks;return t<0||t>i.length-1?null:this.getPixelForValue(i[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}C(So,"id","category"),C(So,"defaults",{ticks:{callback:Lh}});function fv(e,t){const i=[],{bounds:s,step:n,min:o,max:r,precision:a,count:l,maxTicks:c,maxDigits:h,includeBounds:d}=e,u=n||1,f=c-1,{min:g,max:p}=t,m=!T(o),b=!T(r),y=!T(l),_=(p-g)/(h+1);let x=sa((p-g)/f/u)*u,w,k,M,A;if(x<1e-14&&!m&&!b)return[{value:g},{value:p}];A=Math.ceil(p/x)-Math.floor(g/x),A>f&&(x=sa(A*x/f/u)*u),T(a)||(w=Math.pow(10,a),x=Math.ceil(x*w)/w),s==="ticks"?(k=Math.floor(g/x)*x,M=Math.ceil(p/x)*x):(k=g,M=p),m&&b&&n&&og((r-o)/n,x/1e3)?(A=Math.round(Math.min((r-o)/x,c)),x=(r-o)/A,k=o,M=r):y?(k=m?o:k,M=b?r:M,A=l-1,x=(M-k)/A):(A=(M-k)/x,Pi(A,Math.round(A),x/1e3)?A=Math.round(A):A=Math.ceil(A));const P=Math.max(na(x),na(k));w=Math.pow(10,T(a)?P:a),k=Math.round(k*w)/w,M=Math.round(M*w)/w;let E=0;for(m&&(d&&k!==o?(i.push({value:o}),k<o&&E++,Pi(Math.round((k+E*x)*w)/w,o,cl(o,_,e))&&E++):k<o&&E++);E<A;++E){const D=Math.round((k+E*x)*w)/w;if(b&&D>r)break;i.push({value:D})}return b&&d&&M!==r?i.length&&Pi(i[i.length-1].value,r,cl(r,_,e))?i[i.length-1].value=r:i.push({value:r}):(!b||M===r)&&i.push({value:M}),i}function cl(e,t,{horizontal:i,minRotation:s}){const n=At(s),o=(i?Math.sin(n):Math.cos(n))||.001,r=.75*t*(""+e).length;return Math.min(t/o,r)}class an extends Ie{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,i){return T(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:i,maxDefined:s}=this.getUserBounds();let{min:n,max:o}=this;const r=l=>n=i?n:l,a=l=>o=s?o:l;if(t){const l=zt(n),c=zt(o);l<0&&c<0?a(0):l>0&&c>0&&r(0)}if(n===o){let l=o===0?1:Math.abs(o*.05);a(o+l),t||r(n-l)}this.min=n,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:i,stepSize:s}=t,n;return s?(n=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,n>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`),n=1e3)):(n=this.computeTickLimit(),i=i||11),i&&(n=Math.min(i,n)),n}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,i=t.ticks;let s=this.getTickLimit();s=Math.max(2,s);const n={maxTicks:s,bounds:t.bounds,min:t.min,max:t.max,precision:i.precision,step:i.stepSize,count:i.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:i.minRotation||0,includeBounds:i.includeBounds!==!1},o=this._range||this,r=fv(n,o);return t.bounds==="ticks"&&Wc(r,this,"value"),t.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){const t=this.ticks;let i=this.min,s=this.max;if(super.configure(),this.options.offset&&t.length){const n=(s-i)/Math.max(t.length-1,1)/2;i-=n,s+=n}this._startValue=i,this._endValue=s,this._valueRange=s-i}getLabelForValue(t){return ds(t,this.chart.options.locale,this.options.ticks.format)}}class Mo extends an{determineDataLimits(){const{min:t,max:i}=this.getMinMax(!0);this.min=J(t)?t:0,this.max=J(i)?i:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),i=t?this.width:this.height,s=At(this.options.ticks.minRotation),n=(t?Math.sin(s):Math.cos(s))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(i/Math.min(40,o.lineHeight/n))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}C(Mo,"id","linear"),C(Mo,"defaults",{ticks:{callback:Sn.formatters.numeric}});const Gi=e=>Math.floor(ne(e)),Se=(e,t)=>Math.pow(10,Gi(e)+t);function hl(e){return e/Math.pow(10,Gi(e))===1}function dl(e,t,i){const s=Math.pow(10,i),n=Math.floor(e/s);return Math.ceil(t/s)-n}function pv(e,t){const i=t-e;let s=Gi(i);for(;dl(e,t,s)>10;)s++;for(;dl(e,t,s)<10;)s--;return Math.min(s,Gi(e))}function gv(e,{min:t,max:i}){t=bt(e.min,t);const s=[],n=Gi(t);let o=pv(t,i),r=o<0?Math.pow(10,Math.abs(o)):1;const a=Math.pow(10,o),l=n>o?Math.pow(10,n):0,c=Math.round((t-l)*r)/r,h=Math.floor((t-l)/a/10)*a*10;let d=Math.floor((c-h)/Math.pow(10,o)),u=bt(e.min,Math.round((l+h+d*Math.pow(10,o))*r)/r);for(;u<i;)s.push({value:u,major:hl(u),significand:d}),d>=10?d=d<15?15:20:d++,d>=20&&(o++,d=2,r=o>=0?1:r),u=Math.round((l+h+d*Math.pow(10,o))*r)/r;const f=bt(e.max,u);return s.push({value:f,major:hl(f),significand:d}),s}class Co extends Ie{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,i){const s=an.prototype.parse.apply(this,[t,i]);if(s===0){this._zero=!0;return}return J(s)&&s>0?s:null}determineDataLimits(){const{min:t,max:i}=this.getMinMax(!0);this.min=J(t)?Math.max(0,t):null,this.max=J(i)?Math.max(0,i):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!J(this._userMin)&&(this.min=t===Se(this.min,0)?Se(this.min,-1):Se(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:i}=this.getUserBounds();let s=this.min,n=this.max;const o=a=>s=t?s:a,r=a=>n=i?n:a;s===n&&(s<=0?(o(1),r(10)):(o(Se(s,-1)),r(Se(n,1)))),s<=0&&o(Se(n,-1)),n<=0&&r(Se(s,1)),this.min=s,this.max=n}buildTicks(){const t=this.options,i={min:this._userMin,max:this._userMax},s=gv(i,this);return t.bounds==="ticks"&&Wc(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}getLabelForValue(t){return t===void 0?"0":ds(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=ne(t),this._valueRange=ne(this.max)-ne(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(ne(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const i=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+i*this._valueRange)}}C(Co,"id","logarithmic"),C(Co,"defaults",{ticks:{callback:Sn.formatters.logarithmic,major:{enabled:!0}}});function Ao(e){const t=e.ticks;if(t.display&&e.display){const i=rt(t.backdropPadding);return O(t.font&&t.font.size,X.font.size)+i.height}return 0}function mv(e,t,i){return i=q(i)?i:[i],{w:wg(e,t.string,i),h:i.length*t.lineHeight}}function ul(e,t,i,s,n){return e===s||e===n?{start:t-i/2,end:t+i/2}:e<s||e>n?{start:t-i,end:t}:{start:t,end:t+i}}function bv(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},i=Object.assign({},t),s=[],n=[],o=e._pointLabels.length,r=e.options.pointLabels,a=r.centerPointLabels?B/o:0;for(let l=0;l<o;l++){const c=r.setContext(e.getPointLabelContext(l));n[l]=c.padding;const h=e.getPointPosition(l,e.drawingArea+n[l],a),d=nt(c.font),u=mv(e.ctx,d,e._pointLabels[l]);s[l]=u;const f=ht(e.getIndexAngle(l)+a),g=Math.round(Jo(f)),p=ul(g,h.x,u.w,0,180),m=ul(g,h.y,u.h,90,270);yv(i,t,f,p,m)}e.setCenterPoint(t.l-i.l,i.r-t.r,t.t-i.t,i.b-t.b),e._pointLabelItems=_v(e,s,n)}function yv(e,t,i,s,n){const o=Math.abs(Math.sin(i)),r=Math.abs(Math.cos(i));let a=0,l=0;s.start<t.l?(a=(t.l-s.start)/o,e.l=Math.min(e.l,t.l-a)):s.end>t.r&&(a=(s.end-t.r)/o,e.r=Math.max(e.r,t.r+a)),n.start<t.t?(l=(t.t-n.start)/r,e.t=Math.min(e.t,t.t-l)):n.end>t.b&&(l=(n.end-t.b)/r,e.b=Math.max(e.b,t.b+l))}function vv(e,t,i){const s=e.drawingArea,{extra:n,additionalAngle:o,padding:r,size:a}=i,l=e.getPointPosition(t,s+n+r,o),c=Math.round(Jo(ht(l.angle+tt))),h=Sv(l.y,a.h,c),d=wv(c),u=kv(l.x,a.w,d);return{visible:!0,x:l.x,y:h,textAlign:d,left:u,top:h,right:u+a.w,bottom:h+a.h}}function xv(e,t){if(!t)return!0;const{left:i,top:s,right:n,bottom:o}=e;return!(qt({x:i,y:s},t)||qt({x:i,y:o},t)||qt({x:n,y:s},t)||qt({x:n,y:o},t))}function _v(e,t,i){const s=[],n=e._pointLabels.length,o=e.options,{centerPointLabels:r,display:a}=o.pointLabels,l={extra:Ao(o)/2,additionalAngle:r?B/n:0};let c;for(let h=0;h<n;h++){l.padding=i[h],l.size=t[h];const d=vv(e,h,l);s.push(d),a==="auto"&&(d.visible=xv(d,c),d.visible&&(c=d))}return s}function wv(e){return e===0||e===180?"center":e<180?"left":"right"}function kv(e,t,i){return i==="right"?e-=t:i==="center"&&(e-=t/2),e}function Sv(e,t,i){return i===90||i===270?e-=t/2:(i>270||i<90)&&(e-=t),e}function Mv(e,t,i){const{left:s,top:n,right:o,bottom:r}=i,{backdropColor:a}=t;if(!T(a)){const l=Pe(t.borderRadius),c=rt(t.backdropPadding);e.fillStyle=a;const h=s-c.left,d=n-c.top,u=o-s+c.width,f=r-n+c.height;Object.values(l).some(g=>g!==0)?(e.beginPath(),qi(e,{x:h,y:d,w:u,h:f,radius:l}),e.fill()):e.fillRect(h,d,u,f)}}function Cv(e,t){const{ctx:i,options:{pointLabels:s}}=e;for(let n=t-1;n>=0;n--){const o=e._pointLabelItems[n];if(!o.visible)continue;const r=s.setContext(e.getPointLabelContext(n));Mv(i,r,o);const a=nt(r.font),{x:l,y:c,textAlign:h}=o;ze(i,e._pointLabels[n],l,c+a.lineHeight/2,a,{color:r.color,textAlign:h,textBaseline:"middle"})}}function Rh(e,t,i,s){const{ctx:n}=e;if(i)n.arc(e.xCenter,e.yCenter,t,0,Y);else{let o=e.getPointPosition(0,t);n.moveTo(o.x,o.y);for(let r=1;r<s;r++)o=e.getPointPosition(r,t),n.lineTo(o.x,o.y)}}function Av(e,t,i,s,n){const o=e.ctx,r=t.circular,{color:a,lineWidth:l}=t;!r&&!s||!a||!l||i<0||(o.save(),o.strokeStyle=a,o.lineWidth=l,o.setLineDash(n.dash||[]),o.lineDashOffset=n.dashOffset,o.beginPath(),Rh(e,i,r,s),o.closePath(),o.stroke(),o.restore())}function Ev(e,t,i){return be(e,{label:i,index:t,type:"pointLabel"})}class Si extends an{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=rt(Ao(this.options)/2),i=this.width=this.maxWidth-t.width,s=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+i/2+t.left),this.yCenter=Math.floor(this.top+s/2+t.top),this.drawingArea=Math.floor(Math.min(i,s)/2)}determineDataLimits(){const{min:t,max:i}=this.getMinMax(!1);this.min=J(t)&&!isNaN(t)?t:0,this.max=J(i)&&!isNaN(i)?i:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Ao(this.options))}generateTickLabels(t){an.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((i,s)=>{const n=V(this.options.pointLabels.callback,[i,s],this);return n||n===0?n:""}).filter((i,s)=>this.chart.getDataVisibility(s))}fit(){const t=this.options;t.display&&t.pointLabels.display?bv(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,i,s,n){this.xCenter+=Math.floor((t-i)/2),this.yCenter+=Math.floor((s-n)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,i,s,n))}getIndexAngle(t){const i=Y/(this._pointLabels.length||1),s=this.options.startAngle||0;return ht(t*i+At(s))}getDistanceFromCenterForValue(t){if(T(t))return NaN;const i=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*i:(t-this.min)*i}getValueForDistanceFromCenter(t){if(T(t))return NaN;const i=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-i:this.min+i}getPointLabelContext(t){const i=this._pointLabels||[];if(t>=0&&t<i.length){const s=i[t];return Ev(this.getContext(),t,s)}}getPointPosition(t,i,s=0){const n=this.getIndexAngle(t)-tt+s;return{x:Math.cos(n)*i+this.xCenter,y:Math.sin(n)*i+this.yCenter,angle:n}}getPointPositionForValue(t,i){return this.getPointPosition(t,this.getDistanceFromCenterForValue(i))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:i,top:s,right:n,bottom:o}=this._pointLabelItems[t];return{left:i,top:s,right:n,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:i}}=this.options;if(t){const s=this.ctx;s.save(),s.beginPath(),Rh(this,this.getDistanceFromCenterForValue(this._endValue),i,this._pointLabels.length),s.closePath(),s.fillStyle=t,s.fill(),s.restore()}}drawGrid(){const t=this.ctx,i=this.options,{angleLines:s,grid:n,border:o}=i,r=this._pointLabels.length;let a,l,c;if(i.pointLabels.display&&Cv(this,r),n.display&&this.ticks.forEach((h,d)=>{if(d!==0||d===0&&this.min<0){l=this.getDistanceFromCenterForValue(h.value);const u=this.getContext(d),f=n.setContext(u),g=o.setContext(u);Av(this,f,l,r,g)}}),s.display){for(t.save(),a=r-1;a>=0;a--){const h=s.setContext(this.getPointLabelContext(a)),{color:d,lineWidth:u}=h;!u||!d||(t.lineWidth=u,t.strokeStyle=d,t.setLineDash(h.borderDash),t.lineDashOffset=h.borderDashOffset,l=this.getDistanceFromCenterForValue(i.reverse?this.min:this.max),c=this.getPointPosition(a,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,i=this.options,s=i.ticks;if(!s.display)return;const n=this.getIndexAngle(0);let o,r;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(n),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,l)=>{if(l===0&&this.min>=0&&!i.reverse)return;const c=s.setContext(this.getContext(l)),h=nt(c.font);if(o=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=h.string,r=t.measureText(a.label).width,t.fillStyle=c.backdropColor;const d=rt(c.backdropPadding);t.fillRect(-r/2-d.left,-o-h.size/2-d.top,r+d.width,h.size+d.height)}ze(t,a.label,0,-o,h,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}C(Si,"id","radialLinear"),C(Si,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Sn.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(e){return e},padding:5,centerPointLabels:!1}}),C(Si,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),C(Si,"descriptors",{angleLines:{_fallback:"grid"}});const $n={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},mt=Object.keys($n);function fl(e,t){return e-t}function pl(e,t){if(T(t))return null;const i=e._adapter,{parser:s,round:n,isoWeekday:o}=e._parseOpts;let r=t;return typeof s=="function"&&(r=s(r)),J(r)||(r=typeof s=="string"?i.parse(r,s):i.parse(r)),r===null?null:(n&&(r=n==="week"&&(ti(o)||o===!0)?i.startOf(r,"isoWeek",o):i.startOf(r,n)),+r)}function gl(e,t,i,s){const n=mt.length;for(let o=mt.indexOf(e);o<n-1;++o){const r=$n[mt[o]],a=r.steps?r.steps:Number.MAX_SAFE_INTEGER;if(r.common&&Math.ceil((i-t)/(a*r.size))<=s)return mt[o]}return mt[n-1]}function Pv(e,t,i,s,n){for(let o=mt.length-1;o>=mt.indexOf(i);o--){const r=mt[o];if($n[r].common&&e._adapter.diff(n,s,r)>=t-1)return r}return mt[i?mt.indexOf(i):0]}function $v(e){for(let t=mt.indexOf(e)+1,i=mt.length;t<i;++t)if($n[mt[t]].common)return mt[t]}function ml(e,t,i){if(!i)e[t]=!0;else if(i.length){const{lo:s,hi:n}=Qo(i,t),o=i[s]>=t?i[s]:i[n];e[o]=!0}}function Ov(e,t,i,s){const n=e._adapter,o=+n.startOf(t[0].value,s),r=t[t.length-1].value;let a,l;for(a=o;a<=r;a=+n.add(a,1,s))l=i[a],l>=0&&(t[l].major=!0);return t}function bl(e,t,i){const s=[],n={},o=t.length;let r,a;for(r=0;r<o;++r)a=t[r],n[a]=r,s.push({value:a,major:!1});return o===0||!i?s:Ov(e,s,n,i)}class Zi extends Ie{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,i={}){const s=t.time||(t.time={}),n=this._adapter=new Bm._date(t.adapters.date);n.init(i),Ei(s.displayFormats,n.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(t),this._normalized=i.normalized}parse(t,i){return t===void 0?null:pl(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,i=this._adapter,s=t.time.unit||"day";let{min:n,max:o,minDefined:r,maxDefined:a}=this.getUserBounds();function l(c){!r&&!isNaN(c.min)&&(n=Math.min(n,c.min)),!a&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!r||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),n=J(n)&&!isNaN(n)?n:+i.startOf(Date.now(),s),o=J(o)&&!isNaN(o)?o:+i.endOf(Date.now(),s)+1,this.min=Math.min(n,o-1),this.max=Math.max(n+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let i=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return t.length&&(i=t[0],s=t[t.length-1]),{min:i,max:s}}buildTicks(){const t=this.options,i=t.time,s=t.ticks,n=s.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&n.length&&(this.min=this._userMin||n[0],this.max=this._userMax||n[n.length-1]);const o=this.min,r=this.max,a=cg(n,o,r);return this._unit=i.unit||(s.autoSkip?gl(i.minUnit,this.min,this.max,this._getLabelCapacity(o)):Pv(this,a.length,i.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:$v(this._unit),this.initOffsets(n),t.reverse&&a.reverse(),bl(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let i=0,s=0,n,o;this.options.offset&&t.length&&(n=this.getDecimalForValue(t[0]),t.length===1?i=1-n:i=(this.getDecimalForValue(t[1])-n)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?s=o:s=(o-this.getDecimalForValue(t[t.length-2]))/2);const r=t.length<3?.5:.25;i=ot(i,0,r),s=ot(s,0,r),this._offsets={start:i,end:s,factor:1/(i+1+s)}}_generate(){const t=this._adapter,i=this.min,s=this.max,n=this.options,o=n.time,r=o.unit||gl(o.minUnit,i,s,this._getLabelCapacity(i)),a=O(n.ticks.stepSize,1),l=r==="week"?o.isoWeekday:!1,c=ti(l)||l===!0,h={};let d=i,u,f;if(c&&(d=+t.startOf(d,"isoWeek",l)),d=+t.startOf(d,c?"day":r),t.diff(s,i,r)>1e5*a)throw new Error(i+" and "+s+" are too far apart with stepSize of "+a+" "+r);const g=n.ticks.source==="data"&&this.getDataTimestamps();for(u=d,f=0;u<s;u=+t.add(u,a,r),f++)ml(h,u,g);return(u===s||n.bounds==="ticks"||f===1)&&ml(h,u,g),Object.keys(h).sort(fl).map(p=>+p)}getLabelForValue(t){const i=this._adapter,s=this.options.time;return s.tooltipFormat?i.format(t,s.tooltipFormat):i.format(t,s.displayFormats.datetime)}format(t,i){const s=this.options.time.displayFormats,n=this._unit,o=i||s[n];return this._adapter.format(t,o)}_tickFormatFunction(t,i,s,n){const o=this.options,r=o.ticks.callback;if(r)return V(r,[t,i,s],this);const a=o.time.displayFormats,l=this._unit,c=this._majorUnit,h=l&&a[l],d=c&&a[c],u=s[i],f=c&&d&&u&&u.major;return this._adapter.format(t,n||(f?d:h))}generateTickLabels(t){let i,s,n;for(i=0,s=t.length;i<s;++i)n=t[i],n.label=this._tickFormatFunction(n.value,i,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const i=this._offsets,s=this.getDecimalForValue(t);return this.getPixelForDecimal((i.start+s)*i.factor)}getValueForPixel(t){const i=this._offsets,s=this.getDecimalForPixel(t)/i.factor-i.end;return this.min+s*(this.max-this.min)}_getLabelSize(t){const i=this.options.ticks,s=this.ctx.measureText(t).width,n=At(this.isHorizontal()?i.maxRotation:i.minRotation),o=Math.cos(n),r=Math.sin(n),a=this._resolveTickFontOptions(0).size;return{w:s*o+a*r,h:s*r+a*o}}_getLabelCapacity(t){const i=this.options.time,s=i.displayFormats,n=s[i.unit]||s.millisecond,o=this._tickFormatFunction(t,0,bl(this,[t],this._majorUnit),n),r=this._getLabelSize(o),a=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],i,s;if(t.length)return t;const n=this.getMatchingVisibleMetas();if(this._normalized&&n.length)return this._cache.data=n[0].controller.getAllParsedValues(this);for(i=0,s=n.length;i<s;++i)t=t.concat(n[i].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let i,s;if(t.length)return t;const n=this.getLabels();for(i=0,s=n.length;i<s;++i)t.push(pl(this,n[i]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Yc(t.sort(fl))}}C(Zi,"id","time"),C(Zi,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Es(e,t,i){let s=0,n=e.length-1,o,r,a,l;i?(t>=e[s].pos&&t<=e[n].pos&&({lo:s,hi:n}=Ut(e,"pos",t)),{pos:o,time:a}=e[s],{pos:r,time:l}=e[n]):(t>=e[s].time&&t<=e[n].time&&({lo:s,hi:n}=Ut(e,"time",t)),{time:o,pos:a}=e[s],{time:r,pos:l}=e[n]);const c=r-o;return c?a+(l-a)*(t-o)/c:a}class Eo extends Zi{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),i=this._table=this.buildLookupTable(t);this._minPos=Es(i,this.min),this._tableRange=Es(i,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:i,max:s}=this,n=[],o=[];let r,a,l,c,h;for(r=0,a=t.length;r<a;++r)c=t[r],c>=i&&c<=s&&n.push(c);if(n.length<2)return[{time:i,pos:0},{time:s,pos:1}];for(r=0,a=n.length;r<a;++r)h=n[r+1],l=n[r-1],c=n[r],Math.round((h+l)/2)!==c&&o.push({time:c,pos:r/(a-1)});return o}_generate(){const t=this.min,i=this.max;let s=super.getDataTimestamps();return(!s.includes(t)||!s.length)&&s.splice(0,0,t),(!s.includes(i)||s.length===1)&&s.push(i),s.sort((n,o)=>n-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const i=this.getDataTimestamps(),s=this.getLabelTimestamps();return i.length&&s.length?t=this.normalize(i.concat(s)):t=i.length?i:s,t=this._cache.all=t,t}getDecimalForValue(t){return(Es(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const i=this._offsets,s=this.getDecimalForPixel(t)/i.factor-i.end;return Es(this._table,s*this._tableRange+this._minPos,!0)}}C(Eo,"id","timeseries"),C(Eo,"defaults",Zi.defaults);var Tv=Object.freeze({__proto__:null,CategoryScale:So,LinearScale:Mo,LogarithmicScale:Co,RadialLinearScale:Si,TimeScale:Zi,TimeSeriesScale:Eo});const Dv=[Fm,py,cv,Tv];Xi.register(...Dv);/*!
 * chartjs-plugin-datalabels v2.2.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2022 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */var yl=function(){if(typeof window<"u"){if(window.devicePixelRatio)return window.devicePixelRatio;var e=window.screen;if(e)return(e.deviceXDPI||1)/(e.logicalXDPI||1)}return 1}(),Li={toTextLines:function(e){var t=[],i;for(e=[].concat(e);e.length;)i=e.pop(),typeof i=="string"?t.unshift.apply(t,i.split(`
`)):Array.isArray(i)?e.push.apply(e,i):T(e)||t.unshift(""+i);return t},textSize:function(e,t,i){var s=[].concat(t),n=s.length,o=e.font,r=0,a;for(e.font=i.string,a=0;a<n;++a)r=Math.max(e.measureText(s[a]).width,r);return e.font=o,{height:n*i.lineHeight,width:r}},bound:function(e,t,i){return Math.max(e,Math.min(t,i))},arrayDiff:function(e,t){var i=e.slice(),s=[],n,o,r,a;for(n=0,r=t.length;n<r;++n)a=t[n],o=i.indexOf(a),o===-1?s.push([a,1]):i.splice(o,1);for(n=0,r=i.length;n<r;++n)s.push([i[n],-1]);return s},rasterize:function(e){return Math.round(e*yl)/yl}};function Qn(e,t){var i=t.x,s=t.y;if(i===null)return{x:0,y:-1};if(s===null)return{x:1,y:0};var n=e.x-i,o=e.y-s,r=Math.sqrt(n*n+o*o);return{x:r?n/r:0,y:r?o/r:-1}}function zv(e,t,i,s,n){switch(n){case"center":i=s=0;break;case"bottom":i=0,s=1;break;case"right":i=1,s=0;break;case"left":i=-1,s=0;break;case"top":i=0,s=-1;break;case"start":i=-i,s=-s;break;case"end":break;default:n*=Math.PI/180,i=Math.cos(n),s=Math.sin(n);break}return{x:e,y:t,vx:i,vy:s}}var Lv=0,Ih=1,Fh=2,Bh=4,jh=8;function Ps(e,t,i){var s=Lv;return e<i.left?s|=Ih:e>i.right&&(s|=Fh),t<i.top?s|=jh:t>i.bottom&&(s|=Bh),s}function Rv(e,t){for(var i=e.x0,s=e.y0,n=e.x1,o=e.y1,r=Ps(i,s,t),a=Ps(n,o,t),l,c,h;!(!(r|a)||r&a);)l=r||a,l&jh?(c=i+(n-i)*(t.top-s)/(o-s),h=t.top):l&Bh?(c=i+(n-i)*(t.bottom-s)/(o-s),h=t.bottom):l&Fh?(h=s+(o-s)*(t.right-i)/(n-i),c=t.right):l&Ih&&(h=s+(o-s)*(t.left-i)/(n-i),c=t.left),l===r?(i=c,s=h,r=Ps(i,s,t)):(n=c,o=h,a=Ps(n,o,t));return{x0:i,x1:n,y0:s,y1:o}}function $s(e,t){var i=t.anchor,s=e,n,o;return t.clamp&&(s=Rv(s,t.area)),i==="start"?(n=s.x0,o=s.y0):i==="end"?(n=s.x1,o=s.y1):(n=(s.x0+s.x1)/2,o=(s.y0+s.y1)/2),zv(n,o,e.vx,e.vy,t.align)}var Os={arc:function(e,t){var i=(e.startAngle+e.endAngle)/2,s=Math.cos(i),n=Math.sin(i),o=e.innerRadius,r=e.outerRadius;return $s({x0:e.x+s*o,y0:e.y+n*o,x1:e.x+s*r,y1:e.y+n*r,vx:s,vy:n},t)},point:function(e,t){var i=Qn(e,t.origin),s=i.x*e.options.radius,n=i.y*e.options.radius;return $s({x0:e.x-s,y0:e.y-n,x1:e.x+s,y1:e.y+n,vx:i.x,vy:i.y},t)},bar:function(e,t){var i=Qn(e,t.origin),s=e.x,n=e.y,o=0,r=0;return e.horizontal?(s=Math.min(e.x,e.base),o=Math.abs(e.base-e.x)):(n=Math.min(e.y,e.base),r=Math.abs(e.base-e.y)),$s({x0:s,y0:n+r,x1:s+o,y1:n,vx:i.x,vy:i.y},t)},fallback:function(e,t){var i=Qn(e,t.origin);return $s({x0:e.x,y0:e.y,x1:e.x+(e.width||0),y1:e.y+(e.height||0),vx:i.x,vy:i.y},t)}},Yt=Li.rasterize;function Iv(e){var t=e.borderWidth||0,i=e.padding,s=e.size.height,n=e.size.width,o=-n/2,r=-s/2;return{frame:{x:o-i.left-t,y:r-i.top-t,w:n+i.width+t*2,h:s+i.height+t*2},text:{x:o,y:r,w:n,h:s}}}function Fv(e,t){var i=t.chart.getDatasetMeta(t.datasetIndex).vScale;if(!i)return null;if(i.xCenter!==void 0&&i.yCenter!==void 0)return{x:i.xCenter,y:i.yCenter};var s=i.getBasePixel();return e.horizontal?{x:s,y:null}:{x:null,y:s}}function Bv(e){return e instanceof Ne?Os.arc:e instanceof Di?Os.point:e instanceof zi?Os.bar:Os.fallback}function jv(e,t,i,s,n,o){var r=Math.PI/2;if(o){var a=Math.min(o,n/2,s/2),l=t+a,c=i+a,h=t+s-a,d=i+n-a;e.moveTo(t,c),l<h&&c<d?(e.arc(l,c,a,-Math.PI,-r),e.arc(h,c,a,-r,0),e.arc(h,d,a,0,r),e.arc(l,d,a,r,Math.PI)):l<h?(e.moveTo(l,i),e.arc(h,c,a,-r,r),e.arc(l,c,a,r,Math.PI+r)):c<d?(e.arc(l,c,a,-Math.PI,0),e.arc(l,d,a,0,Math.PI)):e.arc(l,c,a,-Math.PI,Math.PI),e.closePath(),e.moveTo(t,i)}else e.rect(t,i,s,n)}function Hv(e,t,i){var s=i.backgroundColor,n=i.borderColor,o=i.borderWidth;!s&&(!n||!o)||(e.beginPath(),jv(e,Yt(t.x)+o/2,Yt(t.y)+o/2,Yt(t.w)-o,Yt(t.h)-o,i.borderRadius),e.closePath(),s&&(e.fillStyle=s,e.fill()),n&&o&&(e.strokeStyle=n,e.lineWidth=o,e.lineJoin="miter",e.stroke()))}function Nv(e,t,i){var s=i.lineHeight,n=e.w,o=e.x,r=e.y+s/2;return t==="center"?o+=n/2:(t==="end"||t==="right")&&(o+=n),{h:s,w:n,x:o,y:r}}function Vv(e,t,i){var s=e.shadowBlur,n=i.stroked,o=Yt(i.x),r=Yt(i.y),a=Yt(i.w);n&&e.strokeText(t,o,r,a),i.filled&&(s&&n&&(e.shadowBlur=0),e.fillText(t,o,r,a),s&&n&&(e.shadowBlur=s))}function Wv(e,t,i,s){var n=s.textAlign,o=s.color,r=!!o,a=s.font,l=t.length,c=s.textStrokeColor,h=s.textStrokeWidth,d=c&&h,u;if(!(!l||!r&&!d))for(i=Nv(i,n,a),e.font=a.string,e.textAlign=n,e.textBaseline="middle",e.shadowBlur=s.textShadowBlur,e.shadowColor=s.textShadowColor,r&&(e.fillStyle=o),d&&(e.lineJoin="round",e.lineWidth=h,e.strokeStyle=c),u=0,l=t.length;u<l;++u)Vv(e,t[u],{stroked:d,filled:r,w:i.w,x:i.x,y:i.y+i.h*u})}var Hh=function(e,t,i,s){var n=this;n._config=e,n._index=s,n._model=null,n._rects=null,n._ctx=t,n._el=i};Ft(Hh.prototype,{_modelize:function(e,t,i,s){var n=this,o=n._index,r=nt(U([i.font,{}],s,o)),a=U([i.color,X.color],s,o);return{align:U([i.align,"center"],s,o),anchor:U([i.anchor,"center"],s,o),area:s.chart.chartArea,backgroundColor:U([i.backgroundColor,null],s,o),borderColor:U([i.borderColor,null],s,o),borderRadius:U([i.borderRadius,0],s,o),borderWidth:U([i.borderWidth,0],s,o),clamp:U([i.clamp,!1],s,o),clip:U([i.clip,!1],s,o),color:a,display:e,font:r,lines:t,offset:U([i.offset,4],s,o),opacity:U([i.opacity,1],s,o),origin:Fv(n._el,s),padding:rt(U([i.padding,4],s,o)),positioner:Bv(n._el),rotation:U([i.rotation,0],s,o)*(Math.PI/180),size:Li.textSize(n._ctx,t,r),textAlign:U([i.textAlign,"start"],s,o),textShadowBlur:U([i.textShadowBlur,0],s,o),textShadowColor:U([i.textShadowColor,a],s,o),textStrokeColor:U([i.textStrokeColor,a],s,o),textStrokeWidth:U([i.textStrokeWidth,0],s,o)}},update:function(e){var t=this,i=null,s=null,n=t._index,o=t._config,r,a,l,c=U([o.display,!0],e,n);c&&(r=e.dataset.data[n],a=O(V(o.formatter,[r,e]),r),l=T(a)?[]:Li.toTextLines(a),l.length&&(i=t._modelize(c,l,o,e),s=Iv(i))),t._model=i,t._rects=s},geometry:function(){return this._rects?this._rects.frame:{}},rotation:function(){return this._model?this._model.rotation:0},visible:function(){return this._model&&this._model.opacity},model:function(){return this._model},draw:function(e,t){var i=this,s=e.ctx,n=i._model,o=i._rects,r;this.visible()&&(s.save(),n.clip&&(r=n.area,s.beginPath(),s.rect(r.left,r.top,r.right-r.left,r.bottom-r.top),s.clip()),s.globalAlpha=Li.bound(0,n.opacity,1),s.translate(Yt(t.x),Yt(t.y)),s.rotate(n.rotation),Hv(s,o.frame,n),Wv(s,n.lines,o.text,n),s.restore())}});var Uv=Number.MIN_SAFE_INTEGER||-9007199254740991,qv=Number.MAX_SAFE_INTEGER||9007199254740991;function xi(e,t,i){var s=Math.cos(i),n=Math.sin(i),o=t.x,r=t.y;return{x:o+s*(e.x-o)-n*(e.y-r),y:r+n*(e.x-o)+s*(e.y-r)}}function vl(e,t){var i=qv,s=Uv,n=t.origin,o,r,a,l,c;for(o=0;o<e.length;++o)r=e[o],a=r.x-n.x,l=r.y-n.y,c=t.vx*a+t.vy*l,i=Math.min(i,c),s=Math.max(s,c);return{min:i,max:s}}function Ts(e,t){var i=t.x-e.x,s=t.y-e.y,n=Math.sqrt(i*i+s*s);return{vx:(t.x-e.x)/n,vy:(t.y-e.y)/n,origin:e,ln:n}}var Nh=function(){this._rotation=0,this._rect={x:0,y:0,w:0,h:0}};Ft(Nh.prototype,{center:function(){var e=this._rect;return{x:e.x+e.w/2,y:e.y+e.h/2}},update:function(e,t,i){this._rotation=i,this._rect={x:t.x+e.x,y:t.y+e.y,w:t.w,h:t.h}},contains:function(e){var t=this,i=1,s=t._rect;return e=xi(e,t.center(),-t._rotation),!(e.x<s.x-i||e.y<s.y-i||e.x>s.x+s.w+i*2||e.y>s.y+s.h+i*2)},intersects:function(e){var t=this._points(),i=e._points(),s=[Ts(t[0],t[1]),Ts(t[0],t[3])],n,o,r;for(this._rotation!==e._rotation&&s.push(Ts(i[0],i[1]),Ts(i[0],i[3])),n=0;n<s.length;++n)if(o=vl(t,s[n]),r=vl(i,s[n]),o.max<r.min||r.max<o.min)return!1;return!0},_points:function(){var e=this,t=e._rect,i=e._rotation,s=e.center();return[xi({x:t.x,y:t.y},s,i),xi({x:t.x+t.w,y:t.y},s,i),xi({x:t.x+t.w,y:t.y+t.h},s,i),xi({x:t.x,y:t.y+t.h},s,i)]}});function Vh(e,t,i){var s=t.positioner(e,t),n=s.vx,o=s.vy;if(!n&&!o)return{x:s.x,y:s.y};var r=i.w,a=i.h,l=t.rotation,c=Math.abs(r/2*Math.cos(l))+Math.abs(a/2*Math.sin(l)),h=Math.abs(r/2*Math.sin(l))+Math.abs(a/2*Math.cos(l)),d=1/Math.max(Math.abs(n),Math.abs(o));return c*=n*d,h*=o*d,c+=t.offset*n,h+=t.offset*o,{x:s.x+c,y:s.y+h}}function Yv(e,t){var i,s,n,o;for(i=e.length-1;i>=0;--i)for(n=e[i].$layout,s=i-1;s>=0&&n._visible;--s)o=e[s].$layout,o._visible&&n._box.intersects(o._box)&&t(n,o);return e}function Xv(e){var t,i,s,n,o,r,a;for(t=0,i=e.length;t<i;++t)s=e[t],n=s.$layout,n._visible&&(a=new Proxy(s._el,{get:(l,c)=>l.getProps([c],!0)[c]}),o=s.geometry(),r=Vh(a,s.model(),o),n._box.update(r,o,s.rotation()));return Yv(e,function(l,c){var h=l._hidable,d=c._hidable;h&&d||d?c._visible=!1:h&&(l._visible=!1)})}var Ri={prepare:function(e){var t=[],i,s,n,o,r;for(i=0,n=e.length;i<n;++i)for(s=0,o=e[i].length;s<o;++s)r=e[i][s],t.push(r),r.$layout={_box:new Nh,_hidable:!1,_visible:!0,_set:i,_idx:r._index};return t.sort(function(a,l){var c=a.$layout,h=l.$layout;return c._idx===h._idx?h._set-c._set:h._idx-c._idx}),this.update(t),t},update:function(e){var t=!1,i,s,n,o,r;for(i=0,s=e.length;i<s;++i)n=e[i],o=n.model(),r=n.$layout,r._hidable=o&&o.display==="auto",r._visible=n.visible(),t|=r._hidable;t&&Xv(e)},lookup:function(e,t){var i,s;for(i=e.length-1;i>=0;--i)if(s=e[i].$layout,s&&s._visible&&s._box.contains(t))return e[i];return null},draw:function(e,t){var i,s,n,o,r,a;for(i=0,s=t.length;i<s;++i)n=t[i],o=n.$layout,o._visible&&(r=n.geometry(),a=Vh(n._el,n.model(),r),o._box.update(a,r,n.rotation()),n.draw(e,a))}},Gv=function(e){if(T(e))return null;var t=e,i,s,n;if(L(e))if(!T(e.label))t=e.label;else if(!T(e.r))t=e.r;else for(t="",i=Object.keys(e),n=0,s=i.length;n<s;++n)t+=(n!==0?", ":"")+i[n]+": "+e[i[n]];return""+t},Zv={align:"center",anchor:"center",backgroundColor:null,borderColor:null,borderRadius:0,borderWidth:0,clamp:!1,clip:!1,color:void 0,display:!0,font:{family:void 0,lineHeight:1.2,size:void 0,style:void 0,weight:null},formatter:Gv,labels:void 0,listeners:{},offset:4,opacity:1,padding:{top:4,right:4,bottom:4,left:4},rotation:0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,textShadowBlur:0,textShadowColor:void 0},gt="$datalabels",Wh="$default";function Kv(e,t){var i=e.datalabels,s={},n=[],o,r;return i===!1?null:(i===!0&&(i={}),t=Ft({},[t,i]),o=t.labels||{},r=Object.keys(o),delete t.labels,r.length?r.forEach(function(a){o[a]&&n.push(Ft({},[t,o[a],{_key:a}]))}):n.push(t),s=n.reduce(function(a,l){return H(l.listeners||{},function(c,h){a[h]=a[h]||{},a[h][l._key||Wh]=c}),delete l.listeners,a},{}),{labels:n,listeners:s})}function Po(e,t,i,s){if(t){var n=i.$context,o=i.$groups,r;t[o._set]&&(r=t[o._set][o._key],r&&V(r,[n,s])===!0&&(e[gt]._dirty=!0,i.update(n)))}}function Jv(e,t,i,s,n){var o,r;!i&&!s||(i?s?i!==s&&(r=o=!0):r=!0:o=!0,r&&Po(e,t.leave,i,n),o&&Po(e,t.enter,s,n))}function Qv(e,t){var i=e[gt],s=i._listeners,n,o;if(!(!s.enter&&!s.leave)){if(t.type==="mousemove")o=Ri.lookup(i._labels,t);else if(t.type!=="mouseout")return;n=i._hovered,i._hovered=o,Jv(e,s,n,o,t)}}function t0(e,t){var i=e[gt],s=i._listeners.click,n=s&&Ri.lookup(i._labels,t);n&&Po(e,s,n,t)}var e0={id:"datalabels",defaults:Zv,beforeInit:function(e){e[gt]={_actives:[]}},beforeUpdate:function(e){var t=e[gt];t._listened=!1,t._listeners={},t._datasets=[],t._labels=[]},afterDatasetUpdate:function(e,t,i){var s=t.index,n=e[gt],o=n._datasets[s]=[],r=e.isDatasetVisible(s),a=e.data.datasets[s],l=Kv(a,i),c=t.meta.data||[],h=e.ctx,d,u,f,g,p,m,b,y;for(h.save(),d=0,f=c.length;d<f;++d)if(b=c[d],b[gt]=[],r&&b&&e.getDataVisibility(d)&&!b.skip)for(u=0,g=l.labels.length;u<g;++u)p=l.labels[u],m=p._key,y=new Hh(p,h,b,d),y.$groups={_set:s,_key:m||Wh},y.$context={active:!1,chart:e,dataIndex:d,dataset:a,datasetIndex:s},y.update(y.$context),b[gt].push(y),o.push(y);h.restore(),Ft(n._listeners,l.listeners,{merger:function(_,x,w){x[_]=x[_]||{},x[_][t.index]=w[_],n._listened=!0}})},afterUpdate:function(e){e[gt]._labels=Ri.prepare(e[gt]._datasets)},afterDatasetsDraw:function(e){Ri.draw(e,e[gt]._labels)},beforeEvent:function(e,t){if(e[gt]._listened){var i=t.event;switch(i.type){case"mousemove":case"mouseout":Qv(e,i);break;case"click":t0(e,i);break}}},afterEvent:function(e){var t=e[gt],i=t._actives,s=t._actives=e.getActiveElements(),n=Li.arrayDiff(i,s),o,r,a,l,c,h,d;for(o=0,r=n.length;o<r;++o)if(c=n[o],c[1])for(d=c[0].element[gt]||[],a=0,l=d.length;a<l;++a)h=d[a],h.$context.active=c[1]===1,h.update(h.$context);(t._dirty||n.length)&&(Ri.update(t._labels),e.render()),delete t._dirty}};const i0=()=>S`
    <style>
      .chart-skeleton {
        display: flex;
        gap: 1rem;
        height: 100%;
        width: 100%;
      }

      .y-axis {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 2.25rem; /* Space for x-axis labels and gap */
      }

      .y-label {
        height: 1rem;
        border-radius: 0.25rem;
        background-color: var(--bim-ui_bg-contrast-10);
        animation: bar-loading 1s linear infinite alternate;
      }

      .main-chart-area {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .bars-container {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        flex-grow: 1;
        gap: 0.5rem;
        padding: 0 1rem;
        border-left: 2px solid var(--bim-ui_bg-contrast-20);
        border-bottom: 2px solid var(--bim-ui_bg-contrast-20);
        position: relative;
      }

      .grid-lines {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .grid-line {
        width: 100%;
        height: 1px;
        background-color: var(--bim-ui_bg-contrast-10);
        opacity: 0.5;
      }

      .bar {
        flex: 1;
        background-color: var(--bim-ui_bg-contrast-10);
        animation: bar-loading 1s linear infinite alternate;
        z-index: 1; /* To appear above grid lines */
      }

      .x-axis {
        display: flex;
        justify-content: space-around;
        gap: 0.5rem;
        padding: 0 1rem;
        height: 1.25rem;
        margin-top: 1rem;
      }

      .x-label {
        flex: 1;
        height: 100%;
        border-radius: 0.25rem;
        background-color: var(--bim-ui_bg-contrast-10);
        animation: bar-loading 1s linear infinite alternate;
      }

      @keyframes bar-loading {
        0% {
          background-color: var(--bim-ui_bg-contrast-10);
        }
        100% {
          background-color: var(--bim-ui_bg-contrast-20);
        }
      }
    </style>
    <div class="chart-skeleton">
      <div class="y-axis">
        <div class="y-label" style="width: 2.5rem"></div>
        <div class="y-label" style="width: 1.5rem"></div>
        <div class="y-label" style="width: 2rem"></div>
        <div class="y-label" style="width: 1rem"></div>
      </div>
      <div class="main-chart-area">
        <div class="bars-container">
          <div class="grid-lines">
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
          </div>
          <div class="bar" style="height: 60%"></div>
          <div class="bar" style="height: 30%"></div>
          <div class="bar" style="height: 80%"></div>
          <div class="bar" style="height: 50%"></div>
          <div class="bar" style="height: 90%"></div>
        </div>
        <div class="x-axis">
          <div class="x-label"></div>
          <div class="x-label"></div>
          <div class="x-label"></div>
          <div class="x-label"></div>
          <div class="x-label"></div>
        </div>
      </div>
    </div>
  `;var s0=Object.defineProperty,et=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&s0(t,i,n),n};Xi.register(e0);const Uh=class extends F{constructor(){super(...arguments),this.colors=Array.from({length:20},(t,i)=>this.generateColor(i)),this.type=null,this.xBeginAtZero=!0,this.yBeginAtZero=!0,this.indexAxis="x",this.loading=!1,this.hoverBorderColor="#ffffffff",this.linePointStyle="circle",this.pointRadius=10,this.lineFill=!1,this.transparentBackground=!0,this.displayLabels=!0,this.dataLabelsColor="#ffffffff",this.smoothLine=!1,this.borderColor="#000000",this.inputData={labels:[],datasets:{}},this.colorfulBars=!1,this._errorLoading=!1,this._options={responsive:!1,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",display:!1},datalabels:{display:this.displayLabels,color:this.dataLabelsColor,font:{weight:"bold",family:"'Plus Jakarta Sans', sans-serif, 'Fira Code'"}},title:{text:this.label,display:!0}},elements:{line:{tension:this.smoothLine?.4:0}}},this._chartCfg={type:this.type,data:{labels:[],datasets:[]},options:this._options},this._canvas=document.createElement("canvas")}generateColor(t){return`hsl(${t*137.5%360}, 70%, 50%)`}async loadData(t=!1){if(this.inputData.labels.length!==0&&!t||!this.loadFunction)return!1;this.loading=!0;try{const i=await this.loadFunction();return this.inputData=i,this.loading=!1,this._errorLoading=!1,this.dispatchEvent(new Event("data-loaded")),!0}catch(i){if(this.loading=!1,this.inputData.labels.length!==0)return!1;const s=this.querySelector("[slot='error-loading']"),n=s==null?void 0:s.querySelector("[data-chart-element='error-message']");return i instanceof Error&&n&&i.message.trim()!==""&&(n.textContent=i.message),this._errorLoading=!0,!1}}get data(){return this.chart.data}_getDefaultColors(t){const i=Object.keys(t.datasets).length;return Array.from({length:i},(s,n)=>this.generateColor(n))}isScatterData(t){return"x"in t&&"y"in t}parseInputData(t){const{labels:i}=t,s=this.colors.length<Object.keys(t.datasets).length?this._getDefaultColors(t):this.colors,n=Object.entries(t.datasets).map(([o,r],a)=>{const l=s[a%s.length],c=this.type==="scatter"||this.type==="bubble",h=this.type==="bar";let d;return c||h&&!this.colorfulBars?d=this.transparentBackground?this.transparentize(l):l:d=this.transparentBackground?s.map(u=>this.transparentize(u)):s,{label:o,data:Object.values(r).map(u=>{if(c){if(this.isScatterData(u)){const f={x:u.x,y:u.y};return this.type==="bubble"&&u.r!==void 0&&(f.r=u.r),f}return{x:0,y:0}}return this.isScatterData(u)?0:u.value}),backgroundColor:d,borderColor:c?void 0:this.borderColor,pointStyle:c?void 0:this.linePointStyle,pointRadius:c?void 0:this.pointRadius,fill:c?void 0:this.lineFill,hoverBorderColor:c?void 0:this.hoverBorderColor}});return{labels:i,datasets:n}}transparentize(t,i){const s=i===void 0?.5:1-i;return Yp(t).alpha(s).rgbString()}updateFromTable(t){const i=t.data,s=[],n={},o=[];let r=0;const a=`dataset_${r}`;r++;for(const l of i){const{data:c}=l;let h,d;for(const[u,f]of Object.entries(c))u==="name"&&typeof f=="string"?h=f:typeof f=="number"&&(d=f);h&&d!==void 0&&(s.push(h),o.push({value:d}))}n[a]=o,this.inputData={labels:s,datasets:n}}highlight(t){if(!this.chart)return;const i=[],s=Object.values(this.inputData.datasets);for(const n in s){const o=s[n];for(const r in o){const a=o[r];if(!t(a))continue;const l={datasetIndex:Number(n),index:Number(r)};i.push(l)}}this.chart.setActiveElements(i),this.chart.update()}filterByValue(t){if(!this.chart)return;const i=structuredClone(this.inputData);for(const s of Object.values(i.datasets))for(const n in s)t(s[n])||delete s[n];this.chart.data=this.parseInputData(i),this.chart.update()}triggerFilter(t){this.dispatchEvent(new CustomEvent("labelfilter",{detail:t}))}filterByLabel(t){if(!this.chart||!this.chart.data.labels)return;const i=this.chart.data.labels.indexOf(t);if(i===-1)return;this.chart.toggleDataVisibility(i);const s=this.chart.data.labels.filter((o,r)=>this.chart.getDataVisibility(r)),n=this.chart.data.labels.filter((o,r)=>!this.chart.getDataVisibility(r));this.chart.update(),this.triggerFilter({label:t,visible:s,hidden:n})}reset(){this.chart.data=this.parseInputData(this.inputData),this.chart.update()}updated(t){var i,s;if(this.chart){if(t.has("type")||t.has("indexAxis")||t.has("linePointStyle")||t.has("pointRadius")||t.has("lineFill")){this.chart.destroy();const n=structuredClone(this._options);this.label!==void 0&&(n.plugins||(n.plugins={}),n.plugins.title={text:this.label,display:!0}),this.indexAxis!==void 0&&(n.indexAxis=this.indexAxis),this.chart=new Xi(this._canvas,{type:this.type,data:this.parseInputData(this.inputData),options:n})}else for(const n of t.keys())switch(n){case"label":this.chart.options.plugins.title={text:this.label,display:this.label!==void 0};break;case"inputData":this.chart.data=this.parseInputData(this.inputData);break;case"smoothLine":this.chart.options.elements&&this.chart.options.elements.line&&(this.chart.options.elements.line.tension=this.smoothLine?.4:0);break;case"dataLabelsColor":this.chart.options.plugins.datalabels.color=this.dataLabelsColor;break;case"displayLabels":this.chart.options.plugins.datalabels.display=this.displayLabels;break;case"borderColor":this.chart.data.datasets.forEach(o=>{o.borderColor=this.borderColor});break;case"xStacked":this.type==="bar"&&(i=this.chart.options.scales)!=null&&i.x&&Object.assign(this.chart.options.scales.x,{stacked:this.xStacked});break;case"yStacked":this.type==="bar"&&(s=this.chart.options.scales)!=null&&s.y&&Object.assign(this.chart.options.scales.y,{stacked:this.yStacked});break;case"transparentBackground":{const o=this.colors||this._getDefaultColors(this.inputData),r=this.type==="scatter"||this.type==="bubble",a=this.type==="bar";this.chart.data.datasets.forEach((l,c)=>{const h=o[c%o.length];let d;r||a&&!this.colorfulBars?d=this.transparentBackground?this.transparentize(h):h:d=this.transparentBackground?o.map(u=>this.transparentize(u)):o,l.backgroundColor=d});break}case"colors":{const o=this.colors||this._getDefaultColors(this.inputData),r=this.type==="scatter"||this.type==="bubble",a=this.type==="bar";this.chart.data.datasets.forEach((l,c)=>{const h=o[c%o.length];let d;r||a&&!this.colorfulBars?d=this.transparentBackground?this.transparentize(h):h:d=this.transparentBackground?o.map(u=>this.transparentize(u)):o,l.backgroundColor=d});break}}this.chart.update(),this.chart.resize()}}updateChartTitle(){if(this.chart)try{const t=this.chart.options;t&&t.plugins&&t.plugins.title&&(t.plugins.title.text=this.label,this.chart.update())}catch(t){console.warn("Chart: failed to update chart title",t)}}firstUpdated(){this.chart=new Xi(this._canvas,this._chartCfg);const t=this.renderRoot.querySelector(".parent");t&&new ResizeObserver(()=>this.chart.resize()).observe(t),this._canvas.onclick=i=>{if(this.inputData.labels.length===0)return;const s=this.chart.getElementsAtEventForMode(i,"point",{intersect:!0},!1);for(const n of s){const{index:o,datasetIndex:r}=n,a=this.inputData.labels[o],l=[];for(const d of Object.values(this.inputData.datasets))l.push(d[o]);const c={datasetIndex:r,index:o,values:l,label:a,value:{value:0}},h=()=>{var d,u;return(u=(d=Object.values(this.inputData.datasets))==null?void 0:d[r])==null?void 0:u[o]};Object.defineProperty(c,"value",{get:()=>h()}),this.dispatchEvent(new CustomEvent("sectionclick",{detail:c}))}}}render(){if(this.loading)return i0();if(this._errorLoading)return S`<slot name="error-loading"></slot>`;let t;return this.inputData.labels.length===0?(this._canvas.style.display="none",t=S`
        <slot name="missing-data">
          <bim-label>No data to display in this chart.</bim-label>
        </slot>
      `):this._canvas.style.display="block",S`
      <div class="parent">
        ${t} ${this._canvas}
        <slot name="labels"></slot>
      </div>
    `}};Uh.styles=j`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 10rem;
      min-height: 10rem;
      padding: 1rem;
      box-sizing: border-box;
      flex: 1;
    }

    .parent {
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `;let Q=Uh;et([v({type:Array})],Q.prototype,"colors");et([v({type:String,reflect:!0})],Q.prototype,"type");et([v({type:Boolean,reflect:!0,attribute:"x-zero"})],Q.prototype,"xBeginAtZero");et([v({type:Boolean,reflect:!0,attribute:"y-zero"})],Q.prototype,"yBeginAtZero");et([v({type:String,reflect:!0,attribute:"index-axis"})],Q.prototype,"indexAxis");et([v({type:Boolean,reflect:!0,attribute:"x-stacked"})],Q.prototype,"xStacked");et([v({type:Boolean,reflect:!0,attribute:"y-stacked"})],Q.prototype,"yStacked");et([v({type:Boolean,reflect:!0})],Q.prototype,"loading");et([v({type:String,reflect:!1})],Q.prototype,"hoverBorderColor");et([v({type:String,reflect:!0})],Q.prototype,"label");et([v({type:String,reflect:!0,attribute:"point-style"})],Q.prototype,"linePointStyle");et([v({type:Number,reflect:!0})],Q.prototype,"pointRadius");et([v({type:String,reflect:!0})],Q.prototype,"lineFill");et([v({type:Boolean,reflect:!0,attribute:"transparent-background"})],Q.prototype,"transparentBackground");et([v({type:Boolean,reflect:!0})],Q.prototype,"displayLabels");et([v({type:String,reflect:!0,attribute:"data-label-color"})],Q.prototype,"dataLabelsColor");et([v({type:Boolean,reflect:!0})],Q.prototype,"smoothLine");et([v({type:String,reflect:!0})],Q.prototype,"borderColor");et([v({type:Object,attribute:!1})],Q.prototype,"inputData");et([v({type:Boolean,reflect:!0})],Q.prototype,"colorfulBars");et([Jt()],Q.prototype,"_errorLoading");var n0=Object.defineProperty,hr=(e,t,i,s)=>{for(var n=void 0,o=e.length-1,r;o>=0;o--)(r=e[o])&&(n=r(t,i,n)||n);return n&&n0(t,i,n),n},lt;const On=(lt=class extends F{constructor(){super(...arguments),this.visible=!1,this._previousContainer=null,this._showToolTip=async()=>{this.timeoutId=setTimeout(async()=>{if(this.visible=!0,!lt.container.parentElement){const e=document.querySelector("[data-context-dialog]");e?e.append(lt.container):document.body.append(lt.container)}this._previousContainer=this.parentElement,lt.container.style.top=`${window.scrollY||document.documentElement.scrollTop}px`,lt.container.append(this),await this.computePosition()},this.timeout===void 0?800:this.timeout)},this._hideToolTip=()=>{clearTimeout(this.timeoutId),this.visible=!1,this._previousContainer&&(this._previousContainer.append(this),this._previousContainer=null),lt.container.children.length===0&&lt.container.parentElement&&lt.container.remove()}}static get container(){return lt._container||(lt._container=document.createElement("div"),lt._container.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        overflow: visible;
        pointer-events: none;
        z-index: 9999;
      `),lt._container}async computePosition(){const e=this._previousContainer||this.parentElement;if(!e)return;const t=this.style.display;this.style.display="block",this.style.visibility="hidden",await new Promise(requestAnimationFrame);const{x:i,y:s}=await Ro(e,this,{placement:this.placement,middleware:[$o(10),zo(),Do({padding:8}),Lo()]});Object.assign(this.style,{left:`${i}px`,top:`${s}px`,display:t,visibility:""})}connectedCallback(){super.connectedCallback();const e=this.parentElement;e&&(e.addEventListener("mouseenter",this._showToolTip),e.addEventListener("mouseleave",this._hideToolTip))}disconnectedCallback(){super.disconnectedCallback();const e=this.parentElement;e&&(e.removeEventListener("mouseenter",this._showToolTip),e.removeEventListener("mouseleave",this._hideToolTip))}render(){return S`<div><slot></slot></div>`}},lt.styles=j`
    :host {
      position: absolute;
      background: var(--bim-ui_bg-contrast-20, #fff);
      color: var(--bim-ui_bg-contrast-100, #000);
      border-radius: var(--bim-ui_size-4xs, 4px);
      box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
      padding: 0.75rem;
      font-size: var(--bim-ui_size-xs, 0.875rem);
      display: none;
    }
    :host([visible]) {
      display: flex;
    }
  `,lt._container=null,lt);hr([v({type:Boolean,reflect:!0})],On.prototype,"visible");hr([v({type:Number,reflect:!0})],On.prototype,"timeout");hr([v({type:String,reflect:!0})],On.prototype,"placement");let o0=On;export{It as B,S as C,Je as c,gn as l,ho as v};
