/**
 * skylark-etpl - A version of etpl.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-etpl/
 * @license MIT
 */
!function(t,e){var n=e.define,require=e.require,r="function"==typeof n&&n.amd,i=!r&&"undefined"!=typeof exports;if(!r&&!n){var o={};n=e.define=function(t,e,n){"function"==typeof n?(o[t]={factory:n,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var n=e.split("/"),r=t.split("/");n.pop();for(var i=0;i<r.length;i++)"."!=r[i]&&(".."==r[i]?n.pop():n.push(r[i]));return n.join("/")}(e,t)}),resolved:!1,exports:null},require(t)):o[t]={factory:null,resolved:!0,exports:n}},require=e.require=function(t){if(!o.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=o[t];if(!module.resolved){var n=[];module.deps.forEach(function(t){n.push(require(t))}),module.exports=module.factory.apply(e,n)||null,module.resolved=!0}return module.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-etpl/main",["skylark-langx/skylark"],function(t){function e(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function n(){this.raw=[],this.length=0}n.prototype={push:function(t){this.raw[this.length++]=t},pop:function(){if(this.length>0){var t=this.raw[--this.length];return this.raw.length=this.length,t}},top:function(){return this.raw[this.length-1]},bottom:function(){return this.raw[0]},find:function(t){for(var e=this.length;e--;){var n=this.raw[e];if(t(n))return n}}};var r=178245;function i(){return"___"+r++}function o(t,n){var r=t.prototype,i=new Function;i.prototype=n.prototype,t.prototype=new i,t.prototype.constructor=t,e(t.prototype,r)}var s={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function a(t){return s[t]}var p={html:function(t){return t.replace(/[&<>"']/g,a)},url:encodeURIComponent,raw:function(t){return t}};function h(t){return'"'+t.replace(/\x5C/g,"\\\\").replace(/"/g,'\\"').replace(/\x0A/g,"\\n").replace(/\x09/g,"\\t").replace(/\x0D/g,"\\r")+'"'}function l(t){return t.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g,function(t){return"\\"+t})}function c(t){var e=arguments;return t.replace(/\{([0-9]+)\}/g,function(t,n){return e[n-0+1]})}var u='var r="";',f="r+=",d=";",y="return r;",g="undefined"!=typeof navigator&&navigator.userAgent.match(/msie\s*([0-9]+)/i);function v(t,e,n,r,i,o){for(var s=n.length,a=t.split(e),p=0,h=[],l=0,c=a.length;l<c;l++){var u=a[l];if(l){var f=1;for(p++;;){var d=u.indexOf(n);if(d<0){h.push(p>1&&f?e:"",u);break}if(p=r?p-1:0,h.push(p>0&&f?e:"",u.slice(0,d),p>0?n:""),u=u.slice(d+s),f=0,0===p)break}0===p&&(i(h.join("")),o(u),h=[])}else u&&o(u)}p>0&&h.length>0&&(o(e),o(h.join("")))}function m(t,e,n){var r,i=[],o=e.options,s="",a="",p="",l="";return n&&(s="ts(",a=")",p=f,l=d,r=o.defaultFilter),v(t,o.variableOpen,o.variableClose,1,function(t){n&&t.indexOf("|")<0&&r&&(t+="|"+r);var o,u=t.indexOf("|"),f=(u>0?t.slice(0,u):t).replace(/^\s+/,"").replace(/\s+$/,""),d=u>0?t.slice(u+1):"",y=0===f.indexOf("*"),g=[y?"":s,(o=f,c('gv({0},["{1}"])',h(o=o.replace(/^\s*\*/,"")),o.replace(/\[['"]?([^'"]+)['"]?\]/g,function(t,e){return"."+e}).split(".").join('","'))),y?"":a];if(d)for(var v=(d=m(d,e)).split("|"),w=0,k=v.length;w<k;w++){var x=v[w],E=x.match(/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i);E&&(g.unshift('fs["'+E[1]+'"]('),E[3]&&g.push(",",E[3]),g.push(")"))}i.push(p,g.join(""),l)},function(t){i.push(p,n?h(t):t,l)}),i.join("")}function w(t,e){this.value=t,this.engine=e}function k(t,e){this.value=t,this.engine=e,this.children=[],this.cloneProps=[]}function x(t,e){var n=t.stack,r=e?n.find(function(t){return t instanceof e}):n.bottom();if(r){for(var i;(i=n.top())!==r;){if(!i.autoClose)throw new Error(i.type+" must be closed manually: "+i.value);i.autoClose(t)}r.close(t)}return r}g&&g[1]-0<8&&(u="var r=[],ri=0;",f="r[ri++]=",y='return r.join("");'),w.prototype={getRendererBody:function(){var t=this.value,e=this.engine.options;return!t||e.strip&&/^\s*$/.test(t)?"":m(t,this.engine,1)},clone:function(){return this}},k.prototype={addChild:function(t){this.children.push(t)},open:function(t){var e=t.stack.top();e&&e.addChild(this),t.stack.push(this)},close:function(t){t.stack.top()===this&&t.stack.pop()},getRendererBody:function(){for(var t=[],e=this.children,n=0;n<e.length;n++)t.push(e[n].getRendererBody());return t.join("")},clone:function(){for(var t=this.constructor,e=new t(this.value,this.engine),n=0,r=this.children.length;n<r;n++)e.addChild(this.children[n].clone());for(var n=0,r=this.cloneProps.length;n<r;n++){var i=this.cloneProps[n];e[i]=this[i]}return e}};var E='data=data||{};var v={},fs=engine.filters,hg=typeof data.get=="function",gv=function(n,ps){var p=ps[0],d=v[p];if(d==null){if(hg){return data.get(n);}d=data[p];}for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];return d;},ts=function(s){if(typeof s==="string"){return s;}if(s==null){s="";}return ""+s;};';function R(t,e){var n=t.match(/^\s*([a-z0-9\/\._-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/\._-]+)\s*\))?\s*/i);if(!n)throw new Error("Invalid "+this.type+" syntax: "+t);this.master=n[3],this.name=n[1],k.call(this,t,e),this.blocks={}}function b(t,e){var n=t.match(/^\s*([a-z0-9\/\._-]+)\s*$/i);if(!n)throw new Error("Invalid "+this.type+" syntax: "+t);this.name=n[1],k.call(this,t,e),this.cloneProps=["name"]}function A(t,e){var n=t.match(/^\s*([a-z0-9\/\._-]+)\s*$/i);if(!n)throw new Error("Invalid "+this.type+" syntax: "+t);this.name=n[1],k.call(this,t,e),this.cloneProps=["name","state","blocks","target"],this.blocks={}}function P(t,e){var n=t.match(/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i);if(!n)throw new Error("Invalid "+this.type+" syntax: "+t);this.name=n[1],this.expr=n[2],k.call(this,t,e),this.cloneProps=["name","expr"]}function C(t,e){var n=t.match(/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i);if(!n)throw new Error("Invalid "+this.type+" syntax: "+t);this.name=n[1],this.args=n[3],k.call(this,t,e),this.cloneProps=["name","args"]}function _(t,e){var n=t.match(/^\s*([a-z0-9\/\._-]+)\s*(\(([\s\S]*)\))?\s*$/i);if(!n)throw new Error("Invalid "+this.type+" syntax: "+t);this.name=n[1],this.args=n[3],k.call(this,t,e),this.cloneProps=["name","args"]}function I(t,e){var n=new RegExp(c("^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$",l(e.options.variableOpen),l(e.options.variableClose)),"i"),r=t.match(n);if(!r)throw new Error("Invalid "+this.type+" syntax: "+t);this.list=r[1],this.item=r[2],this.index=r[4],k.call(this,t,e),this.cloneProps=["list","item","index"]}function D(t,e){k.call(this,t,e)}function B(t,e){D.call(this,t,e)}function T(t,e){k.call(this,t,e)}o(R,k),o(b,k),o(A,k),o(P,k),o(C,k),o(_,k),o(I,k),o(D,k),o(B,D),o(T,D),R.prototype.init=function(t){this.master&&(t.deps[this.master]=!0)},_.prototype.init=A.prototype.init=function(t){t.deps[this.name]=!0};var O={READING:1,READED:2,APPLIED:3,READY:4};function S(t,e,n){t.commandTypes[e]=n,n.prototype.type=e}function j(t){this.options={commandOpen:"\x3c!--",commandClose:"--\x3e",commandSyntax:/^\s*(\/)?([a-z]*)\s*(?::([\s\S]*))?$/,variableOpen:"${",variableClose:"}",defaultFilter:"html"},this.commandTypes={},S(this,"target",R),S(this,"block",b),S(this,"import",A),S(this,"use",_),S(this,"var",P),S(this,"for",I),S(this,"if",D),S(this,"elif",B),S(this,"else",T),S(this,"filter",C),this.config(t),this.targets={},this.filters=e({},p)}function z(t,e){var r,i=e.options.commandOpen,o=e.options.commandClose,s=e.options.commandSyntax,a=new n,p={engine:e,targets:[],stack:a,target:null,deps:{}},h=[];function l(){var t;if(h.length>0&&(t=h.join(""))){var n=new w(t,e);n.beforeAdd(p),a.top().addChild(n),h=[],e.options.strip&&p.current instanceof k&&(n.value=t.replace(/^[\x20\t\r]*\n/,"")),p.current=n}}v(t,i,o,0,function(t){var n,a=s.exec(t);if(a&&(n=a[2]||"target")&&(r=e.commandTypes[n.toLowerCase()])&&"function"==typeof r){l();var c=p.current;e.options.strip&&c instanceof w&&(c.value=c.value.replace(/\r?\n[\x20\t]*$/,"\n")),a[1]?c=x(p,r):("function"==typeof(c=new r(a[3],e)).init&&c.init(p),c.beforeOpen(p),c.open(p)),p.current=c}else/^\s*\/\//.test(t)||h.push(i,t,o);r=null},function(t){h.push(t)}),l(),x(p);var c=[];for(var u in p.deps)c.push(u);return{targets:p.targets,deps:c}}A.prototype.applyMaster=R.prototype.applyMaster=function(t){if(this.state>=O.APPLIED)return 1;var e=this.blocks;var n=this.engine.targets[t];if(n){if(n.applyMaster(n.master))return this.children=n.clone().children,function t(n){var r=n.children;if(r instanceof Array)for(var i=0,o=r.length;i<o;i++){var s=r[i];s instanceof b&&e[s.name]&&(s=r[i]=e[s.name]),t(s)}}(this),this.state=O.APPLIED,1}else if("error"===this.engine.options.missTarget)throw new Error("[ETPL_MISS_TARGET]"+t+", when extended by "+(this.target?this.target.name:this.name))},R.prototype.isReady=function(){if(this.state>=O.READY)return 1;var t=this.engine,e=this.name,n=1;return this.applyMaster(this.master)?(function r(i){for(var o=0,s=i.children.length;o<s;o++){var a=i.children[o];if(a instanceof A){var p=t.targets[a.name];if(!p&&"error"===t.options.missTarget)throw new Error("[ETPL_MISS_TARGET]"+a.name+", when imported by "+e);n=n&&p&&p.isReady(t)}else a instanceof k&&r(a)}}(this),n&&(this.state=O.READY),n):void 0},R.prototype.getRenderer=function(){if(this.renderer)return this.renderer;if(this.isReady()){var t=new Function("data","engine",[E,u,this.getRendererBody(),y].join("\n")),e=this.engine;return this.renderer=function(n){return t(n,e)},this.renderer}return null},R.prototype.open=function(t){x(t),k.prototype.open.call(this,t),this.state=O.READING,function(t,e){e.target=t;var n=e.engine,r=t.name;if(n.targets[r])switch(n.options.namingConflict){case"override":n.targets[r]=t,e.targets.push(r);case"ignore":break;default:throw new Error("[ETPL_TARGET_EXISTS]"+r)}else n.targets[r]=t,e.targets.push(r)}(this,t)},P.prototype.open=_.prototype.open=function(t){t.stack.top().addChild(this)},b.prototype.open=function(t){k.prototype.open.call(this,t),t.stack.find(function(t){return t.blocks}).blocks[this.name]=this},B.prototype.open=function(t){var e=new T;e.open(t);var n=x(t,D);n.addChild(this),t.stack.push(this)},T.prototype.open=function(t){var e=x(t,D);e.addChild(this),t.stack.push(this)},A.prototype.open=function(t){this.parent=t.stack.top(),this.target=t.target,k.prototype.open.call(this,t),this.state=O.READING},_.prototype.close=P.prototype.close=function(){},A.prototype.close=function(t){k.prototype.close.call(this,t),this.state=O.READED},R.prototype.close=function(t){k.prototype.close.call(this,t),this.state=this.master?O.READED:O.APPLIED,t.target=null},A.prototype.autoClose=function(t){var e=this.parent.children;for(var n in e.push.apply(e,this.children),this.children.length=0,this.blocks)this.target.blocks[n]=this.blocks[n];this.blocks={},this.close(t)},k.prototype.beforeOpen=w.prototype.beforeAdd=function(t){if(!t.stack.bottom()){var e=new R(i(),t.engine);e.open(t)}},R.prototype.beforeOpen=function(){},A.prototype.getRendererBody=function(){return this.applyMaster(this.name),k.prototype.getRendererBody.call(this)},_.prototype.getRendererBody=function(){return c("{0}engine.render({2},{{3}}){1}",f,d,h(this.name),m(this.args,this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/gi,function(t,e,n){return(e||"")+h(n)+":"}))},P.prototype.getRendererBody=function(){return this.expr?c("v[{0}]={1};",h(this.name),m(this.expr,this.engine)):""},D.prototype.getRendererBody=function(){return c("if({0}){{1}}",m(this.value,this.engine),k.prototype.getRendererBody.call(this))},T.prototype.getRendererBody=function(){return c("}else{{0}",k.prototype.getRendererBody.call(this))},I.prototype.getRendererBody=function(){return c('var {0}={1};if({0} instanceof Array)for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}else if(typeof {0}==="object")for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}',i(),m(this.list,this.engine),h(this.index||i()),h(this.item),i(),i(),k.prototype.getRendererBody.call(this))},C.prototype.getRendererBody=function(){var t=this.args;return c("{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}",u,y,f,d,k.prototype.getRendererBody.call(this),h(this.name),t?","+m(t,this.engine):"")},j.prototype.config=function(t){e(this.options,t)},j.prototype.compile=j.prototype.parse=function(t){var e=new Function('return ""');if(t){var n=z(t,this),r=n.targets;r.length&&(e=this.targets[r[0]].getRenderer())}return e},j.prototype.getRenderer=function(t){var e=this.targets[t];if(e)return e.getRenderer()},j.prototype.render=function(t,e){var n=this.getRenderer(t);return n?n(e):""},j.prototype.addCommand=function(t,e){var n=e;"function"!=typeof n&&((n=function(t,e){k.call(this,t,e)}).prototype=e),o(n,k),S(this,t,n)},j.prototype.addFilter=function(t,e){"function"==typeof e&&(this.filters[t]=e)};var $=new j;return $.Engine=j,$.version="3.2.0",$.Command=k,$.util={inherits:o,stringFormat:c,stringLiteralize:h,compileVariable:m,parseSource:z},t.attach("intg.templating.etpl",$)}),t("skylark-etpl",["skylark-etpl/main"],function(t){return t})}(n),!r){var s=require("skylark-langx-ns");i?module.exports=s:e.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-etpl.js.map