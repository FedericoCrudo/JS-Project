var e,t,r,n,i,o,a,s,c,u,l,f,h,p,d,v,g,m,y="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function _(e){return e&&e.__esModule?e.default:e}var b={},w={},k=y.parcelRequire3a11;null==k&&((k=function(e){if(e in b)return b[e].exports;if(e in w){var t=w[e];delete w[e];var r={id:e,exports:{}};return b[e]=r,t.call(r.exports,r,r.exports),r.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){w[e]=t},y.parcelRequire3a11=k);var E={},S={},F=function(e){return e&&e.Math==Math&&e};S=F("object"==typeof globalThis&&globalThis)||F("object"==typeof window&&window)||F("object"==typeof self&&self)||F("object"==typeof y&&y)||function(){return this}()||S||Function("return this")();var L={},M={};L=!(M=function(e){try{return!!e()}catch(e){return!0}})(function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]});var O={},j={};j=!M(function(){var e=(function(){}).bind();return"function"!=typeof e||e.hasOwnProperty("prototype")});"use strict";var P=Function.prototype.call;O=j?P.bind(P):function(){return P.apply(P,arguments)};var $={}.propertyIsEnumerable,T=Object.getOwnPropertyDescriptor;t=T&&!$.call({1:2},1)?function(e){var t=T(this,e);return!!t&&t.enumerable}:$;var x={};x=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}};var I={},q={},N={},C=Function.prototype,D=C.call,A=j&&C.bind.bind(D,D),B={},R=(N=j?A:function(e){return function(){return D.apply(e,arguments)}})({}.toString),z=N("".slice);B=function(e){return z(R(e),8,-1)};var H=Object,W=N("".split);q=M(function(){return!H("z").propertyIsEnumerable(0)})?function(e){return"String"==B(e)?W(e,""):H(e)}:H;var G={},U={};U=function(e){return null==e};var J=TypeError;G=function(e){if(U(e))throw J("Can't call method on "+e);return e},I=function(e){return q(G(e))};var Y={},Q={},V={},K={},X={},Z="object"==typeof document&&document.all,ee=(X={all:Z,IS_HTMLDDA:void 0===Z&&void 0!==Z}).all;K=X.IS_HTMLDDA?function(e){return"function"==typeof e||e===ee}:function(e){return"function"==typeof e};var et=X.all;V=X.IS_HTMLDDA?function(e){return"object"==typeof e?null!==e:K(e)||e===et}:function(e){return"object"==typeof e?null!==e:K(e)};var er={},en={};en=function(e,t){var r;return arguments.length<2?K(r=S[e])?r:void 0:S[e]&&S[e][t]};var ei={};ei=N({}.isPrototypeOf);var eo={},ea={},es={},ec={};ec="undefined"!=typeof navigator&&String(navigator.userAgent)||"";var eu=S.process,el=S.Deno,ef=eu&&eu.versions||el&&el.version,eh=ef&&ef.v8;eh&&(n=(r=eh.split("."))[0]>0&&r[0]<4?1:+(r[0]+r[1])),!n&&ec&&(!(r=ec.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=ec.match(/Chrome\/(\d+)/))&&(n=+r[1]),es=n;var ep=S.String;eo=(ea=!!Object.getOwnPropertySymbols&&!M(function(){var e=Symbol();return!ep(e)||!(Object(e) instanceof Symbol)||!Symbol.sham&&es&&es<41}))&&!Symbol.sham&&"symbol"==typeof Symbol.iterator;var ed=Object;er=eo?function(e){return"symbol"==typeof e}:function(e){var t=en("Symbol");return K(t)&&ei(t.prototype,ed(e))};var ev={},eg={},em={},ey=String;em=function(e){try{return ey(e)}catch(e){return"Object"}};var e_=TypeError;eg=function(e){if(K(e))return e;throw e_(em(e)+" is not a function")},ev=function(e,t){var r=e[t];return U(r)?void 0:eg(r)};var eb={},ew=TypeError;eb=function(e,t){var r,n;if("string"===t&&K(r=e.toString)&&!V(n=O(r,e))||K(r=e.valueOf)&&!V(n=O(r,e))||"string"!==t&&K(r=e.toString)&&!V(n=O(r,e)))return n;throw ew("Can't convert object to primitive value")};var ek={},eE={};eE=!1;var eS={},eF={},eL=Object.defineProperty;eF=function(e,t){try{eL(S,e,{value:t,configurable:!0,writable:!0})}catch(r){S[e]=t}return t};var eM="__core-js_shared__";eS=S[eM]||eF(eM,{}),(ek=function(e,t){return eS[e]||(eS[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.31.1",mode:eE?"pure":"global",copyright:"\xa9 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.31.1/LICENSE",source:"https://github.com/zloirock/core-js"});var eO={},ej={},eP=Object;ej=function(e){return eP(G(e))};var e$=N({}.hasOwnProperty);eO=Object.hasOwn||function(e,t){return e$(ej(e),t)};var eT={},ex=0,eI=Math.random(),eq=N(1..toString);eT=function(e){return"Symbol("+(void 0===e?"":e)+")_"+eq(++ex+eI,36)};var eN=S.Symbol,eC=ek("wks"),eD=eo?eN.for||eN:eN&&eN.withoutSetter||eT,eA=TypeError,eB=function(e){return eO(eC,e)||(eC[e]=ea&&eO(eN,e)?eN[e]:eD("Symbol."+e)),eC[e]}("toPrimitive");Q=function(e,t){if(!V(e)||er(e))return e;var r,n=ev(e,eB);if(n){if(void 0===t&&(t="default"),!V(r=O(n,e,t))||er(r))return r;throw eA("Can't convert object to primitive value")}return void 0===t&&(t="number"),eb(e,t)},Y=function(e){var t=Q(e,"string");return er(t)?t:t+""};var eR={},ez={},eH=S.document,eW=V(eH)&&V(eH.createElement);ez=function(e){return eW?eH.createElement(e):{}},eR=!L&&!M(function(){return 7!=Object.defineProperty(ez("div"),"a",{get:function(){return 7}}).a});var eG=Object.getOwnPropertyDescriptor;e=L?eG:function(e,r){if(e=I(e),r=Y(r),eR)try{return eG(e,r)}catch(e){}if(eO(e,r))return x(!O(t,e,r),e[r])};var eU={},eJ={};eJ=L&&M(function(){return 42!=Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype});var eY={},eQ=String,eV=TypeError;eY=function(e){if(V(e))return e;throw eV(eQ(e)+" is not an object")};var eK=TypeError,eX=Object.defineProperty,eZ=Object.getOwnPropertyDescriptor,e0="enumerable",e1="configurable",e2="writable";i=L?eJ?function(e,t,r){if(eY(e),t=Y(t),eY(r),"function"==typeof e&&"prototype"===t&&"value"in r&&e2 in r&&!r[e2]){var n=eZ(e,t);n&&n[e2]&&(e[t]=r.value,r={configurable:e1 in r?r[e1]:n[e1],enumerable:e0 in r?r[e0]:n[e0],writable:!1})}return eX(e,t,r)}:eX:function(e,t,r){if(eY(e),t=Y(t),eY(r),eR)try{return eX(e,t,r)}catch(e){}if("get"in r||"set"in r)throw eK("Accessors not supported");return"value"in r&&(e[t]=r.value),e},eU=L?function(e,t,r){return i(e,t,x(1,r))}:function(e,t,r){return e[t]=r,e};var e3={},e4={},e7=Function.prototype,e9=L&&Object.getOwnPropertyDescriptor,e8=eO(e7,"name")&&(!L||L&&e9(e7,"name").configurable),e6={},e5=N(Function.toString);K(eS.inspectSource)||(eS.inspectSource=function(e){return e5(e)}),e6=eS.inspectSource;var te={},tt={},tr=S.WeakMap;tt=K(tr)&&/native code/.test(String(tr));var tn={},ti=ek("keys");tn=function(e){return ti[e]||(ti[e]=eT(e))};var to={};to={};var ta="Object already initialized",ts=S.TypeError,tc=S.WeakMap;if(tt||eS.state){var tu=eS.state||(eS.state=new tc);tu.get=tu.get,tu.has=tu.has,tu.set=tu.set,o=function(e,t){if(tu.has(e))throw ts(ta);return t.facade=e,tu.set(e,t),t},a=function(e){return tu.get(e)||{}},s=function(e){return tu.has(e)}}else{var tl=tn("state");to[tl]=!0,o=function(e,t){if(eO(e,tl))throw ts(ta);return t.facade=e,eU(e,tl,t),t},a=function(e){return eO(e,tl)?e[tl]:{}},s=function(e){return eO(e,tl)}}var tf=(te={set:o,get:a,has:s,enforce:function(e){return s(e)?a(e):o(e,{})},getterFor:function(e){return function(t){var r;if(!V(t)||(r=a(t)).type!==e)throw ts("Incompatible receiver, "+e+" required");return r}}}).enforce,th=te.get,tp=String,tv=Object.defineProperty,tg=N("".slice),tm=N("".replace),ty=N([].join),t_=L&&!M(function(){return 8!==tv(function(){},"length",{value:8}).length}),tb=String(String).split("String"),tw=e4=function(e,t,r){"Symbol("===tg(tp(t),0,7)&&(t="["+tm(tp(t),/^Symbol\(([^)]*)\)/,"$1")+"]"),r&&r.getter&&(t="get "+t),r&&r.setter&&(t="set "+t),(!eO(e,"name")||e8&&e.name!==t)&&(L?tv(e,"name",{value:t,configurable:!0}):e.name=t),t_&&r&&eO(r,"arity")&&e.length!==r.arity&&tv(e,"length",{value:r.arity});try{r&&eO(r,"constructor")&&r.constructor?L&&tv(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(e){}var n=tf(e);return eO(n,"source")||(n.source=ty(tb,"string"==typeof t?t:"")),e};Function.prototype.toString=tw(function(){return K(this)&&th(this).source||e6(this)},"toString"),e3=function(e,t,r,n){n||(n={});var o=n.enumerable,a=void 0!==n.name?n.name:t;if(K(r)&&e4(r,a,n),n.global)o?e[t]=r:eF(t,r);else{try{n.unsafe?e[t]&&(o=!0):delete e[t]}catch(e){}o?e[t]=r:i(e,t,{value:r,enumerable:!1,configurable:!n.nonConfigurable,writable:!n.nonWritable})}return e};var tk={},tE={},tS={},tF={},tL={},tM={},tO=Math.ceil,tj=Math.floor;tM=Math.trunc||function(e){var t=+e;return(t>0?tj:tO)(t)},tL=function(e){var t=+e;return t!=t||0===t?0:tM(t)};var tP=Math.max,t$=Math.min;tF=function(e,t){var r=tL(e);return r<0?tP(r+t,0):t$(r,t)};var tT={},tx={},tI=Math.min;tx=function(e){return e>0?tI(tL(e),9007199254740991):0},tT=function(e){return tx(e.length)};var tq=function(e){return function(t,r,n){var i,o=I(t),a=tT(o),s=tF(n,a);if(e&&r!=r){for(;a>s;)if((i=o[s++])!=i)return!0}else for(;a>s;s++)if((e||s in o)&&o[s]===r)return e||s||0;return!e&&-1}},tN={includes:tq(!0),indexOf:tq(!1)}.indexOf,tC=N([].push);tS=function(e,t){var r,n=I(e),i=0,o=[];for(r in n)!eO(to,r)&&eO(n,r)&&tC(o,r);for(;t.length>i;)eO(n,r=t[i++])&&(~tN(o,r)||tC(o,r));return o};var tD=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype");c=Object.getOwnPropertyNames||function(e){return tS(e,tD)},u=Object.getOwnPropertySymbols;var tA=N([].concat);tE=en("Reflect","ownKeys")||function(e){var t=c(eY(e));return u?tA(t,u(e)):t},tk=function(t,r,n){for(var o=tE(r),a=0;a<o.length;a++){var s=o[a];eO(t,s)||n&&eO(n,s)||i(t,s,e(r,s))}};var tB={},tR=/#|\.prototype\./,tz=function(e,t){var r=tW[tH(e)];return r==tU||r!=tG&&(K(t)?M(t):!!t)},tH=tz.normalize=function(e){return String(e).replace(tR,".").toLowerCase()},tW=tz.data={},tG=tz.NATIVE="N",tU=tz.POLYFILL="P";tB=tz,E=function(t,r){var n,i,o,a,s,c=t.target,u=t.global,l=t.stat;if(n=u?S:l?S[c]||eF(c,{}):(S[c]||{}).prototype)for(i in r){if(a=r[i],o=t.dontCallGetSet?(s=e(n,i))&&s.value:n[i],!tB(u?i:c+(l?".":"#")+i,t.forced)&&void 0!==o){if(typeof a==typeof o)continue;tk(a,o)}(t.sham||o&&o.sham)&&eU(a,"sham",!0),e3(n,i,a,t)}};var tJ={},tY={},tQ=Function.prototype,tV=tQ.apply,tK=tQ.call;tY="object"==typeof Reflect&&Reflect.apply||(j?tK.bind(tV):function(){return tK.apply(tV,arguments)});var tX={},tZ={},t0=(tZ=function(e){if("Function"===B(e))return N(e)})(tZ.bind);tX=function(e,t){return eg(e),void 0===t?e:j?t0(e,t):function(){return e.apply(t,arguments)}};var t1={};t1=en("document","documentElement");var t2={};t2=N([].slice);var t3={},t4=TypeError;t3=function(e,t){if(e<t)throw t4("Not enough arguments");return e};var t7={};t7=/(?:ipad|iphone|ipod).*applewebkit/i.test(ec);var t9={},t8={},t6=t8={};function t5(){throw Error("setTimeout has not been defined")}function re(){throw Error("clearTimeout has not been defined")}function rt(e){if(l===setTimeout)return setTimeout(e,0);if((l===t5||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}!function(){try{l="function"==typeof setTimeout?setTimeout:t5}catch(e){l=t5}try{f="function"==typeof clearTimeout?clearTimeout:re}catch(e){f=re}}();var rr=[],rn=!1,ri=-1;function ro(){rn&&h&&(rn=!1,h.length?rr=h.concat(rr):ri=-1,rr.length&&ra())}function ra(){if(!rn){var e=rt(ro);rn=!0;for(var t=rr.length;t;){for(h=rr,rr=[];++ri<t;)h&&h[ri].run();ri=-1,t=rr.length}h=null,rn=!1,function(e){if(f===clearTimeout)return clearTimeout(e);if((f===re||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}(e)}}function rs(e,t){this.fun=e,this.array=t}function rc(){}t6.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];rr.push(new rs(e,t)),1!==rr.length||rn||rt(ra)},rs.prototype.run=function(){this.fun.apply(null,this.array)},t6.title="browser",t6.browser=!0,t6.env={},t6.argv=[],t6.version="",t6.versions={},t6.on=rc,t6.addListener=rc,t6.once=rc,t6.off=rc,t6.removeListener=rc,t6.removeAllListeners=rc,t6.emit=rc,t6.prependListener=rc,t6.prependOnceListener=rc,t6.listeners=function(e){return[]},t6.binding=function(e){throw Error("process.binding is not supported")},t6.cwd=function(){return"/"},t6.chdir=function(e){throw Error("process.chdir is not supported")},t6.umask=function(){return 0},t9=void 0!==t8&&"process"==B(t8);var ru=S.setImmediate,rl=S.clearImmediate,rf=S.process,rh=S.Dispatch,rp=S.Function,rd=S.MessageChannel,rv=S.String,rg=0,rm={},ry="onreadystatechange";M(function(){p=S.location});var r_=function(e){if(eO(rm,e)){var t=rm[e];delete rm[e],t()}},rb=function(e){return function(){r_(e)}},rw=function(e){r_(e.data)},rk=function(e){S.postMessage(rv(e),p.protocol+"//"+p.host)};ru&&rl||(ru=function(e){t3(arguments.length,1);var t=K(e)?e:rp(e),r=t2(arguments,1);return rm[++rg]=function(){tY(t,void 0,r)},d(rg),rg},rl=function(e){delete rm[e]},t9?d=function(e){rf.nextTick(rb(e))}:rh&&rh.now?d=function(e){rh.now(rb(e))}:rd&&!t7?(g=(v=new rd).port2,v.port1.onmessage=rw,d=tX(g.postMessage,g)):S.addEventListener&&K(S.postMessage)&&!S.importScripts&&p&&"file:"!==p.protocol&&!M(rk)?(d=rk,S.addEventListener("message",rw,!1)):d=ry in ez("script")?function(e){t1.appendChild(ez("script"))[ry]=function(){t1.removeChild(this),r_(e)}}:function(e){setTimeout(rb(e),0)});var rE=(tJ={set:ru,clear:rl}).clear;E({global:!0,bind:!0,enumerable:!0,forced:S.clearImmediate!==rE},{clearImmediate:rE});"use strict";var rS=tJ.set,rF={},rL={};rL="function"==typeof Bun&&Bun&&"string"==typeof Bun.version;var rM=S.Function,rO=/MSIE .\./.test(ec)||rL&&function(){var e=S.Bun.version.split(".");return e.length<3||0==e[0]&&(e[1]<3||3==e[1]&&0==e[2])}();rF=function(e,t){var r=t?2:1;return rO?function(n,i){var o=t3(arguments.length,1)>r,a=K(n)?n:rM(n),s=o?t2(arguments,r):[],c=o?function(){tY(a,this,s)}:a;return t?e(c,i):e(c)}:e};var rj=S.setImmediate?rF(rS,!1):rS;E({global:!0,bind:!0,enumerable:!0,forced:S.setImmediate!==rj},{setImmediate:rj});var rP=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,i=Object.defineProperty||function(e,t,r){e[t]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,r){return e[t]=r}}function l(e,r,n,o){var a,s,c=Object.create((r&&r.prototype instanceof g?r:g).prototype);return i(c,"_invoke",{value:(a=new M(o||[]),s=h,function(r,i){if(s===p)throw Error("Generator is already running");if(s===d){if("throw"===r)throw i;return j()}for(a.method=r,a.arg=i;;){var o=a.delegate;if(o){var c=function e(r,n){var i=n.method,o=r.iterator[i];if(o===t)return n.delegate=null,"throw"===i&&r.iterator.return&&(n.method="return",n.arg=t,e(r,n),"throw"===n.method)||"return"!==i&&(n.method="throw",n.arg=TypeError("The iterator does not provide a '"+i+"' method")),v;var a=f(o,r.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,v;var s=a.arg;return s?s.done?(n[r.resultName]=s.value,n.next=r.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,v):s:(n.method="throw",n.arg=TypeError("iterator result is not an object"),n.delegate=null,v)}(o,a);if(c){if(c===v)continue;return c}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(s===h)throw s=d,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);s=p;var u=f(e,n,a);if("normal"===u.type){if(s=a.done?d:"suspendedYield",u.arg===v)continue;return{value:u.arg,done:a.done}}"throw"===u.type&&(s=d,a.method="throw",a.arg=u.arg)}})}),c}function f(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var h="suspendedStart",p="executing",d="completed",v={};function g(){}function m(){}function y(){}var _={};u(_,a,function(){return this});var b=Object.getPrototypeOf,w=b&&b(b(O([])));w&&w!==r&&n.call(w,a)&&(_=w);var k=y.prototype=g.prototype=Object.create(_);function E(e){["next","throw","return"].forEach(function(t){u(e,t,function(e){return this._invoke(t,e)})})}function S(e,t){var r;i(this,"_invoke",{value:function(i,o){function a(){return new t(function(r,a){!function r(i,o,a,s){var c=f(e[i],e,o);if("throw"===c.type)s(c.arg);else{var u=c.arg,l=u.value;return l&&"object"==typeof l&&n.call(l,"__await")?t.resolve(l.__await).then(function(e){r("next",e,a,s)},function(e){r("throw",e,a,s)}):t.resolve(l).then(function(e){u.value=e,a(u)},function(e){return r("throw",e,a,s)})}}(i,o,r,a)})}return r=r?r.then(a,a):a()}})}function F(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function M(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(F,this),this.reset(!0)}function O(e){if(e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,o=function r(){for(;++i<e.length;)if(n.call(e,i))return r.value=e[i],r.done=!1,r;return r.value=t,r.done=!0,r};return o.next=o}}return{next:j}}function j(){return{value:t,done:!0}}return m.prototype=y,i(k,"constructor",{value:y,configurable:!0}),i(y,"constructor",{value:m,configurable:!0}),m.displayName=u(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,u(e,c,"GeneratorFunction")),e.prototype=Object.create(k),e},e.awrap=function(e){return{__await:e}},E(S.prototype),u(S.prototype,s,function(){return this}),e.AsyncIterator=S,e.async=function(t,r,n,i,o){void 0===o&&(o=Promise);var a=new S(l(t,r,n,i),o);return e.isGeneratorFunction(r)?a:a.next().then(function(e){return e.done?e.value:a.next()})},E(k),u(k,c,"Generator"),u(k,a,function(){return this}),u(k,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=O,M.prototype={constructor:M,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(L),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function i(n,i){return s.type="throw",s.arg=e,r.next=n,i&&(r.method="next",r.arg=t),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else if(u){if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else throw Error("try statement without catch or finally")}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return(a.type=e,a.arg=t,o)?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),L(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var i=n.arg;L(r)}return i}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:O(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}({});try{regeneratorRuntime=rP}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=rP:Function("r","regeneratorRuntime = r")(rP)}const r$="https://forkify-api.herokuapp.com/api/v2/recipes",rT="6965f43d-0da2-4bfd-afea-78dae92376f9",rx=async function(e,t){try{let r=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),n=await Promise.race([r,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]);if(t=await n.json(),!n.ok)throw Error(`${t.message} (${n.status})`);return t}catch(e){throw e}},rI={recipe:{},search:{query:"",result:[],resultForPage:12,currentPage:1},bookMarks:JSON.parse(localStorage.getItem("Bookmarks"))?[...JSON.parse(localStorage.getItem("Bookmarks"))]:[],currBookMark:0},rq=function(e){return{cookingtime:e.cooking_time,id:e.id,imageurl:e.image_url,ingredients:e.ingredients,publisher:e.publisher,servings:e.servings,sourceurl:e.source_url,title:e.title,...e.key&&{key:e.key}}},rN=async function(e){try{let t=await rx(`${r$}/${e}?key=${rT}`),{recipe:r}=t.data;rI.recipe=rq(r),rI.bookMarks.some(t=>t.id===e)?rI.recipe.bookmarked=!0:rI.recipe.bookmarked=!1}catch(e){throw e}},rC=async function(e){try{rI.search.query=e,rI.search.currentPage=1;let t=await rx(`${r$}/?search=${e}&key=${rT}`);rI.search.result=t.data.recipes.map(e=>({id:e.id,imageurl:e.image_url,publisher:e.publisher,title:e.title,...e.key&&{key:e.key}})),rI.recipe=rq(t.data.recipes[0])}catch(e){throw e}},rD=function(e=rI.search.currentPage){rI.search.currentPage=e;let t=(e-1)*rI.search.resultForPage,r=e*rI.search.resultForPage;return rI.search.result.slice(t,r)},rA=function(e){rI.recipe.ingredients.forEach(t=>{t.quantity=t.quantity/rI.recipe.servings*e}),rI.recipe.servings=e},rB=function(){let e=rI.bookMarks.findIndex(e=>e.id==rI.recipe.id);e?(rI.recipe.bookmarked=!0,rI.bookMarks.push(rI.recipe)):(rI.recipe.bookmarked=!1,rI.bookMarks.splice(e,1)),localStorage.setItem("Bookmarks",JSON.stringify(rI.bookMarks))},rR=async function(e){try{let t=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=e[1].split(",").map(e=>e.trim());if(3!==t.length)throw Error("Wrong Ingredient");let[r,n,i]=t;return{quantity:r||null,unit:n||null,description:i}}),r={cooking_time:+e.cookingTime,image_url:e.image,ingredients:t,publisher:e.publisher,servings:e.servings,source_url:e.sourceUrl,title:e.title},n=await rx(`${r$}?key=${rT}`,r);rI.recipe=rq(n.data.re),rB()}catch(e){throw e}};var rz={};rz=new URL(k("27Lyk").resolve("eyyUD"),import.meta.url).toString();class rH{_data;render(e){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let t=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}update(e){this._data=e;let t=this._generateMarkup(),r=document.createRange().createContextualFragment(t),n=[...r.querySelectorAll("*")],i=[...this._parentElement.querySelectorAll("*")];n.forEach((e,t)=>{let r=i[t];e.isEqualNode(r)||e.firstChild?.nodeValue.trim()==""||(r.textContent=e.textContent),e.isEqualNode(r)||[...e.attributes].forEach(e=>{r.setAttribute(e.name,e.value)})})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
    <svg>
      <use href="${_(rz)}#icon-loader"></use>
    </svg>
  </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("beforeend",e)}renderError(e=this._genericError){let t=`<div class="error">
    <div>
      <svg>
        <use href="${_(rz)}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${e}</p>
  </div>`;this._clear(),this._parentElement.insertAdjacentHTML("beforeend",t)}renderMessage(e=this._genericSuccess){let t=`<div class="message">
    <div>
      <svg>
        <use href="${_(rz)}#icon-smile"></use>
      </svg>
    </div>
    <p>${e}</p>
  </div>`;this._clear(),this._parentElement.insertAdjacentHTML("beforeend",t)}}(Fraction=function(e,t){if(void 0!==e&&t)"number"==typeof e&&"number"==typeof t?(this.numerator=e,this.denominator=t):"string"==typeof e&&"string"==typeof t&&(this.numerator=parseInt(e),this.denominator=parseInt(t));else if(void 0===t){if("number"==typeof(num=e))this.numerator=num,this.denominator=1;else if("string"==typeof num){var r,n,i=num.split(" ");if(i[0]&&(r=i[0]),i[1]&&(n=i[1]),r%1==0&&n&&n.match("/"))return new Fraction(r).add(new Fraction(n));if(!r||n)return;if("string"==typeof r&&r.match("/")){var o=r.split("/");this.numerator=o[0],this.denominator=o[1]}else{if("string"==typeof r&&r.match("."))return new Fraction(parseFloat(r));this.numerator=parseInt(r),this.denominator=1}}}this.normalize()}).prototype.clone=function(){return new Fraction(this.numerator,this.denominator)},Fraction.prototype.toString=function(){if("NaN"===this.denominator)return"NaN";var e=this.numerator/this.denominator>0?Math.floor(this.numerator/this.denominator):Math.ceil(this.numerator/this.denominator),t=this.numerator%this.denominator,r=this.denominator,n=[];return 0!=e&&n.push(e),0!=t&&n.push((0===e?t:Math.abs(t))+"/"+r),n.length>0?n.join(" "):0},Fraction.prototype.rescale=function(e){return this.numerator*=e,this.denominator*=e,this},Fraction.prototype.add=function(e){var t=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=t.denominator,t.rescale(e.denominator),e.rescale(td),t.numerator+=e.numerator,t.normalize()},Fraction.prototype.subtract=function(e){var t=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=t.denominator,t.rescale(e.denominator),e.rescale(td),t.numerator-=e.numerator,t.normalize()},Fraction.prototype.multiply=function(e){var t=this.clone();if(e instanceof Fraction)t.numerator*=e.numerator,t.denominator*=e.denominator;else{if("number"!=typeof e)return t.multiply(new Fraction(e));t.numerator*=e}return t.normalize()},Fraction.prototype.divide=function(e){var t=this.clone();if(e instanceof Fraction)t.numerator*=e.denominator,t.denominator*=e.numerator;else{if("number"!=typeof e)return t.divide(new Fraction(e));t.denominator*=e}return t.normalize()},Fraction.prototype.equals=function(e){e instanceof Fraction||(e=new Fraction(e));var t=this.clone().normalize(),e=e.clone().normalize();return t.numerator===e.numerator&&t.denominator===e.denominator},Fraction.prototype.normalize=function(){var e=function(e){return"number"==typeof e&&(e>0&&e%1>0&&e%1<1||e<0&&e%-1<0&&e%-1>-1)},t=function(e,t){if(!t)return Math.round(e);var r=Math.pow(10,t);return Math.round(e*r)/r};return function(){if(e(this.denominator)){var r=t(this.denominator,9),n=Math.pow(10,r.toString().split(".")[1].length);this.denominator=Math.round(this.denominator*n),this.numerator*=n}if(e(this.numerator)){var r=t(this.numerator,9),n=Math.pow(10,r.toString().split(".")[1].length);this.numerator=Math.round(this.numerator*n),this.denominator*=n}var i=Fraction.gcf(this.numerator,this.denominator);return this.numerator/=i,this.denominator/=i,(this.numerator<0&&this.denominator<0||this.numerator>0&&this.denominator<0)&&(this.numerator*=-1,this.denominator*=-1),this}}(),Fraction.gcf=function(e,t){var r=[],n=Fraction.primeFactors(e),i=Fraction.primeFactors(t);return(n.forEach(function(e){var t=i.indexOf(e);t>=0&&(r.push(e),i.splice(t,1))}),0===r.length)?1:function(){var e,t=r[0];for(e=1;e<r.length;e++)t*=r[e];return t}()},Fraction.primeFactors=function(e){for(var t=Math.abs(e),r=[],n=2;n*n<=t;)t%n==0?(r.push(n),t/=n):n++;return 1!=t&&r.push(t),r},m=Fraction;class rW extends rH{_parentElement=document.querySelector(".recipe");_genericError="We Couldn not find that recipe";_genericSuccess="";_recipeBtn=document.querySelector(".recipe__info-buttons");addHandlerRender(e){["hashchange","load"].forEach(t=>{window.addEventListener(t,e)})}_generateMarkup(){return`<figure class="recipe__fig">
        <img src="${this._data.imageurl}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${_(rz)}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingtime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${_(rz)}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings minus">
              <svg>
                <use href="${_(rz)}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings plus">
              <svg>
                <use href="${_(rz)}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
          <svg class="">
            <use href="${_(rz)}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${_(rz)}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateIngredients).join("")}  
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.source_url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${_(rz)}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`}_generateIngredients(e){return`<li class="recipe__ingredient">
                      <svg class="recipe__icon">
                        <use href="${_(rz)}#icon-check"></use>
                      </svg>
                      <div class="recipe__quantity">${new m(e.quantity)}</div>
                      <div class="recipe__description">
                        <span class="recipe__unit">${e.description}</span>
                        pasta
                      </div>
                    </li>`}handlerServings(e){this._parentElement.addEventListener("click",t=>{let r=t.target.closest(".btn--tiny"),n=this._data.servings;r&&(r.classList.contains("plus")?n++:r.classList.contains("minus")&&n--,n<1||e(n))})}handlerBookMarke(e){this._parentElement.addEventListener("click",t=>{let r=t.target.closest(".btn--bookmark");r&&e()})}}var rG=new rW;class rU{_parentEl=document.querySelector(".search");_searchBtnElement=document.querySelector(".search__btn");_searchInput=this._parentEl.querySelector(".search__field");getQuery(){return this._searchInput.value}clear(){this._searchInput.value=""}searchHandler(e){this._searchBtnElement.addEventListener("click",t=>{t.preventDefault(),e(),this.clear()})}}var rJ=new rU;class rY extends rH{_genericError="No recipes Found";_parentElement=document.querySelector(".results");_generateMarkup(){return this._data.map(this._generateMarkupPreview).join("")}_generateMarkupPreview(e){let t=window.location.hash.slice(1);return` <li class="preview">
    <a class="preview__link  ${e.id===t?"preview__link--active":""} " href="#${e.id}">
      <figure class="preview__fig">
        <img src="${e.imageurl}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${e.title}</h4>
        <p class="preview__publisher">${e.publisher}</p>
        <div class="preview__user-generated ${e.key?"":"hidden"}">
        <svg class="">
          <use href="${_(rz)}#icon-user"></use>
        </svg>
      </div>
      </div>
    </a>
  </li>`}}var rQ=new rY;class rV extends rH{_genericError="No recipes Found";_parentElement=document.querySelector(".pagination");__curPag=0;_generateMarkup(){let e=Math.ceil(this._data.result.length/this._data.resultForPage);if(this._clear(),this.__curPag=this._data.currentPage,1===e)return"";if(1===this.__curPag){let e=`
       <button class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${_(rz)}#icon-arrow-right"></use>
      </svg>
      <span>Page ${++this.__curPag}</span>
      </button>`;return e}if(this.__curPag===e){let e=`
       <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${_(rz)}#icon-arrow-left"></use>
      </svg>
      <span>Page ${--this.__curPag}</span>
      </button>`;return e}let t=`<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${_(rz)}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this.__curPag-1}</span>
    </button>
    <button class="btn--inline pagination__btn--next">
    <svg class="search__icon">
      <use href="${_(rz)}#icon-arrow-right"></use>
    </svg>
    <span>Page ${this.__curPag+1}</span>
    </button>`;return t}handlerBtn(e){this._parentElement.addEventListener("click",t=>{let r=t.target.closest(".btn--inline");r&&(r.classList.contains("pagination__btn--prev")?this._data.currentPage--:this._data.currentPage++,console.dir(e),e.call(this))})}}var rK=new rV;class rX extends rH{_parentElement=document.querySelector(".bookmarks__list");_genericError="No bookmarks yet. Find a nice recipe and bookmark it :)";_generateMarkup(){return this._data.map(this._generateMarkupPreview).join("")}_generateMarkupPreview(e){let t=window.location.hash.slice(1);return`<li class="preview">
    <a class="preview__link  ${e.id===t?"preview__link--active":""}       " href="#${e.id}">
      <figure class="preview__fig">
        <img src="${e.imageurl}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">
          ${e.title}
        </h4>
        <p class="preview__publisher">${e.publisher}</p>
        <div class="preview__user-generated ${e.key?"":"hidden"}">
          <svg class="">
            <use href="${_(rz)}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`}}var rZ=new rX;class r0 extends rH{_parentElement=document.querySelector(".upload");_form=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btn=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");_genericError="No bookmarks yet. Find a nice recipe and bookmark it ";_genericSuccess="Recipe was successfully uploaded";constructor(){super(),this.handlerForm(),this.handlerCloseForm()}handlerForm(){this._btn.addEventListener("click",e=>{let t=e.target.closest(".nav__btn--add-recipe");t&&this.toggleWindow()})}handlerCloseForm(){[this._btnClose,this._overlay].forEach(e=>{e.addEventListener("click",this.toggleWindow.bind(this))})}handlerUpload(e){this._parentElement.addEventListener("submit",t=>{t.preventDefault();let r=Object.fromEntries([...new FormData(t.currentTarget)]);e(r)})}toggleWindow(){this._form.classList.toggle("hidden"),this._overlay.classList.toggle("hidden")}}var r1=new r0;async function r2(){try{let e=window.location.hash.slice(1);if(!e)return;rG.renderSpinner(),rQ.update(rD()),await rN(e),rG.render(rI.recipe),rI.bookMarks&&rZ.update(rI.bookMarks)}catch(e){rG.renderError()}}async function r3(){try{let e=rJ.getQuery();if(!e)return;rQ.renderSpinner(),await rC(e),window.location.hash=rI.recipe.id,rQ.render(rD()),rK.render(rI.search)}catch(e){console.error(e),rQ.renderError(e)}}async function r4(e){try{r1.renderSpinner(),await rR(e),rG.render(rI.recipe),r1.renderMessage(),console.log(rI.recipe),window.history.pushState(null,"",`#${rI.recipe.id}`),rZ.render(rI.bookMarks),setTimeout(r1.toggleWindow(),3500)}catch(e){console.log(e),r1.renderError(e)}}rG.addHandlerRender(r2),rG.handlerServings(function(e){rA(e),rG.update(rI.recipe)}),rG.handlerBookMarke(function(){rB(),rG.update(rI.recipe),rZ.render(rI.bookMarks)}),rJ.searchHandler(r3),rK.handlerBtn(function(){rQ.render(rD(this._data.currentPage)),rK.render(rI.search)}),rZ.render(rI.bookMarks),r1.handlerUpload(r4);
//# sourceMappingURL=index.48ac3c36.js.map