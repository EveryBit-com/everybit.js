!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Bitcoin=e()}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(_dereq_,module,exports){var util=_dereq_("util/");var pSlice=Array.prototype.slice;var hasOwn=Object.prototype.hasOwnProperty;var assert=module.exports=ok;assert.AssertionError=function AssertionError(options){this.name="AssertionError";this.actual=options.actual;this.expected=options.expected;this.operator=options.operator;if(options.message){this.message=options.message;this.generatedMessage=false}else{this.message=getMessage(this);this.generatedMessage=true}var stackStartFunction=options.stackStartFunction||fail;if(Error.captureStackTrace){Error.captureStackTrace(this,stackStartFunction)}else{var err=new Error;if(err.stack){var out=err.stack;var fn_name=stackStartFunction.name;var idx=out.indexOf("\n"+fn_name);if(idx>=0){var next_line=out.indexOf("\n",idx+1);out=out.substring(next_line+1)}this.stack=out}}};util.inherits(assert.AssertionError,Error);function replacer(key,value){if(util.isUndefined(value)){return""+value}if(util.isNumber(value)&&(isNaN(value)||!isFinite(value))){return value.toString()}if(util.isFunction(value)||util.isRegExp(value)){return value.toString()}return value}function truncate(s,n){if(util.isString(s)){return s.length<n?s:s.slice(0,n)}else{return s}}function getMessage(self){return truncate(JSON.stringify(self.actual,replacer),128)+" "+self.operator+" "+truncate(JSON.stringify(self.expected,replacer),128)}function fail(actual,expected,message,operator,stackStartFunction){throw new assert.AssertionError({message:message,actual:actual,expected:expected,operator:operator,stackStartFunction:stackStartFunction})}assert.fail=fail;function ok(value,message){if(!value)fail(value,true,message,"==",assert.ok)}assert.ok=ok;assert.equal=function equal(actual,expected,message){if(actual!=expected)fail(actual,expected,message,"==",assert.equal)};assert.notEqual=function notEqual(actual,expected,message){if(actual==expected){fail(actual,expected,message,"!=",assert.notEqual)}};assert.deepEqual=function deepEqual(actual,expected,message){if(!_deepEqual(actual,expected)){fail(actual,expected,message,"deepEqual",assert.deepEqual)}};function _deepEqual(actual,expected){if(actual===expected){return true}else if(util.isBuffer(actual)&&util.isBuffer(expected)){if(actual.length!=expected.length)return false;for(var i=0;i<actual.length;i++){if(actual[i]!==expected[i])return false}return true}else if(util.isDate(actual)&&util.isDate(expected)){return actual.getTime()===expected.getTime()}else if(util.isRegExp(actual)&&util.isRegExp(expected)){return actual.source===expected.source&&actual.global===expected.global&&actual.multiline===expected.multiline&&actual.lastIndex===expected.lastIndex&&actual.ignoreCase===expected.ignoreCase}else if(!util.isObject(actual)&&!util.isObject(expected)){return actual==expected}else{return objEquiv(actual,expected)}}function isArguments(object){return Object.prototype.toString.call(object)=="[object Arguments]"}function objEquiv(a,b){if(util.isNullOrUndefined(a)||util.isNullOrUndefined(b))return false;if(a.prototype!==b.prototype)return false;if(isArguments(a)){if(!isArguments(b)){return false}a=pSlice.call(a);b=pSlice.call(b);return _deepEqual(a,b)}try{var ka=objectKeys(a),kb=objectKeys(b),key,i}catch(e){return false}if(ka.length!=kb.length)return false;ka.sort();kb.sort();for(i=ka.length-1;i>=0;i--){if(ka[i]!=kb[i])return false}for(i=ka.length-1;i>=0;i--){key=ka[i];if(!_deepEqual(a[key],b[key]))return false}return true}assert.notDeepEqual=function notDeepEqual(actual,expected,message){if(_deepEqual(actual,expected)){fail(actual,expected,message,"notDeepEqual",assert.notDeepEqual)}};assert.strictEqual=function strictEqual(actual,expected,message){if(actual!==expected){fail(actual,expected,message,"===",assert.strictEqual)}};assert.notStrictEqual=function notStrictEqual(actual,expected,message){if(actual===expected){fail(actual,expected,message,"!==",assert.notStrictEqual)}};function expectedException(actual,expected){if(!actual||!expected){return false}if(Object.prototype.toString.call(expected)=="[object RegExp]"){return expected.test(actual)}else if(actual instanceof expected){return true}else if(expected.call({},actual)===true){return true}return false}function _throws(shouldThrow,block,expected,message){var actual;if(util.isString(expected)){message=expected;expected=null}try{block()}catch(e){actual=e}message=(expected&&expected.name?" ("+expected.name+").":".")+(message?" "+message:".");if(shouldThrow&&!actual){fail(actual,expected,"Missing expected exception"+message)}if(!shouldThrow&&expectedException(actual,expected)){fail(actual,expected,"Got unwanted exception"+message)}if(shouldThrow&&actual&&expected&&!expectedException(actual,expected)||!shouldThrow&&actual){throw actual}}assert.throws=function(block,error,message){_throws.apply(this,[true].concat(pSlice.call(arguments)))};assert.doesNotThrow=function(block,message){_throws.apply(this,[false].concat(pSlice.call(arguments)))};assert.ifError=function(err){if(err){throw err}};var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){if(hasOwn.call(obj,key))keys.push(key)}return keys}},{"util/":3}],2:[function(_dereq_,module,exports){module.exports=function isBuffer(arg){return arg&&typeof arg==="object"&&typeof arg.copy==="function"&&typeof arg.fill==="function"&&typeof arg.readUInt8==="function"}},{}],3:[function(_dereq_,module,exports){(function(process,global){var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){var objects=[];for(var i=0;i<arguments.length;i++){objects.push(inspect(arguments[i]))}return objects.join(" ")}var i=1;var args=arguments;var len=args.length;var str=String(f).replace(formatRegExp,function(x){if(x==="%%")return"%";if(i>=len)return x;switch(x){case"%s":return String(args[i++]);case"%d":return Number(args[i++]);case"%j":try{return JSON.stringify(args[i++])}catch(_){return"[Circular]"}default:return x}});for(var x=args[i];i<len;x=args[++i]){if(isNull(x)||!isObject(x)){str+=" "+x}else{str+=" "+inspect(x)}}return str};exports.deprecate=function(fn,msg){if(isUndefined(global.process)){return function(){return exports.deprecate(fn,msg).apply(this,arguments)}}if(process.noDeprecation===true){return fn}var warned=false;function deprecated(){if(!warned){if(process.throwDeprecation){throw new Error(msg)}else if(process.traceDeprecation){console.trace(msg)}else{console.error(msg)}warned=true}return fn.apply(this,arguments)}return deprecated};var debugs={};var debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron))debugEnviron=process.env.NODE_DEBUG||"";set=set.toUpperCase();if(!debugs[set]){if(new RegExp("\\b"+set+"\\b","i").test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error("%s %d: %s",set,pid,msg)}}else{debugs[set]=function(){}}}return debugs[set]};function inspect(obj,opts){var ctx={seen:[],stylize:stylizeNoColor};if(arguments.length>=3)ctx.depth=arguments[2];if(arguments.length>=4)ctx.colors=arguments[3];if(isBoolean(opts)){ctx.showHidden=opts}else if(opts){exports._extend(ctx,opts)}if(isUndefined(ctx.showHidden))ctx.showHidden=false;if(isUndefined(ctx.depth))ctx.depth=2;if(isUndefined(ctx.colors))ctx.colors=false;if(isUndefined(ctx.customInspect))ctx.customInspect=true;if(ctx.colors)ctx.stylize=stylizeWithColor;return formatValue(ctx,obj,ctx.depth)}exports.inspect=inspect;inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]};inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"};function stylizeWithColor(str,styleType){var style=inspect.styles[styleType];if(style){return"["+inspect.colors[style][0]+"m"+str+"["+inspect.colors[style][1]+"m"}else{return str}}function stylizeNoColor(str,styleType){return str}function arrayToHash(array){var hash={};array.forEach(function(val,idx){hash[val]=true});return hash}function formatValue(ctx,value,recurseTimes){if(ctx.customInspect&&value&&isFunction(value.inspect)&&value.inspect!==exports.inspect&&!(value.constructor&&value.constructor.prototype===value)){var ret=value.inspect(recurseTimes,ctx);if(!isString(ret)){ret=formatValue(ctx,ret,recurseTimes)}return ret}var primitive=formatPrimitive(ctx,value);if(primitive){return primitive}var keys=Object.keys(value);var visibleKeys=arrayToHash(keys);if(ctx.showHidden){keys=Object.getOwnPropertyNames(value)}if(isError(value)&&(keys.indexOf("message")>=0||keys.indexOf("description")>=0)){return formatError(value)}if(keys.length===0){if(isFunction(value)){var name=value.name?": "+value.name:"";return ctx.stylize("[Function"+name+"]","special")}if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}if(isDate(value)){return ctx.stylize(Date.prototype.toString.call(value),"date")}if(isError(value)){return formatError(value)}}var base="",array=false,braces=["{","}"];if(isArray(value)){array=true;braces=["[","]"]}if(isFunction(value)){var n=value.name?": "+value.name:"";base=" [Function"+n+"]"}if(isRegExp(value)){base=" "+RegExp.prototype.toString.call(value)}if(isDate(value)){base=" "+Date.prototype.toUTCString.call(value)}if(isError(value)){base=" "+formatError(value)}if(keys.length===0&&(!array||value.length==0)){return braces[0]+base+braces[1]}if(recurseTimes<0){if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}else{return ctx.stylize("[Object]","special")}}ctx.seen.push(value);var output;if(array){output=formatArray(ctx,value,recurseTimes,visibleKeys,keys)}else{output=keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array)})}ctx.seen.pop();return reduceToSingleString(output,base,braces)}function formatPrimitive(ctx,value){if(isUndefined(value))return ctx.stylize("undefined","undefined");if(isString(value)){var simple="'"+JSON.stringify(value).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return ctx.stylize(simple,"string")}if(isNumber(value))return ctx.stylize(""+value,"number");if(isBoolean(value))return ctx.stylize(""+value,"boolean");if(isNull(value))return ctx.stylize("null","null")}function formatError(value){return"["+Error.prototype.toString.call(value)+"]"}function formatArray(ctx,value,recurseTimes,visibleKeys,keys){var output=[];for(var i=0,l=value.length;i<l;++i){if(hasOwnProperty(value,String(i))){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,String(i),true))}else{output.push("")}}keys.forEach(function(key){if(!key.match(/^\d+$/)){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,true))}});return output}function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){var name,str,desc;desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};if(desc.get){if(desc.set){str=ctx.stylize("[Getter/Setter]","special")}else{str=ctx.stylize("[Getter]","special")}}else{if(desc.set){str=ctx.stylize("[Setter]","special")}}if(!hasOwnProperty(visibleKeys,key)){name="["+key+"]"}if(!str){if(ctx.seen.indexOf(desc.value)<0){if(isNull(recurseTimes)){str=formatValue(ctx,desc.value,null)}else{str=formatValue(ctx,desc.value,recurseTimes-1)}if(str.indexOf("\n")>-1){if(array){str=str.split("\n").map(function(line){return"  "+line}).join("\n").substr(2)}else{str="\n"+str.split("\n").map(function(line){return"   "+line}).join("\n")}}}else{str=ctx.stylize("[Circular]","special")}}if(isUndefined(name)){if(array&&key.match(/^\d+$/)){return str}name=JSON.stringify(""+key);if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){name=name.substr(1,name.length-2);name=ctx.stylize(name,"name")}else{name=name.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");name=ctx.stylize(name,"string")}}return name+": "+str}function reduceToSingleString(output,base,braces){var numLinesEst=0;var length=output.reduce(function(prev,cur){numLinesEst++;if(cur.indexOf("\n")>=0)numLinesEst++;return prev+cur.replace(/\u001b\[\d\d?m/g,"").length+1},0);if(length>60){return braces[0]+(base===""?"":base+"\n ")+" "+output.join(",\n  ")+" "+braces[1]}return braces[0]+base+" "+output.join(", ")+" "+braces[1]}function isArray(ar){return Array.isArray(ar)}exports.isArray=isArray;function isBoolean(arg){return typeof arg==="boolean"}exports.isBoolean=isBoolean;function isNull(arg){return arg===null}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==="number"}exports.isNumber=isNumber;function isString(arg){return typeof arg==="string"}exports.isString=isString;function isSymbol(arg){return typeof arg==="symbol"}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}exports.isUndefined=isUndefined;function isRegExp(re){return isObject(re)&&objectToString(re)==="[object RegExp]"}exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==="object"&&arg!==null}exports.isObject=isObject;function isDate(d){return isObject(d)&&objectToString(d)==="[object Date]"}exports.isDate=isDate;function isError(e){return isObject(e)&&(objectToString(e)==="[object Error]"||e instanceof Error)}exports.isError=isError;function isFunction(arg){return typeof arg==="function"}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==="boolean"||typeof arg==="number"||typeof arg==="string"||typeof arg==="symbol"||typeof arg==="undefined"}exports.isPrimitive=isPrimitive;exports.isBuffer=_dereq_("./support/isBuffer");function objectToString(o){return Object.prototype.toString.call(o)}function pad(n){return n<10?"0"+n.toString(10):n.toString(10)}var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function timestamp(){var d=new Date;var time=[pad(d.getHours()),pad(d.getMinutes()),pad(d.getSeconds())].join(":");return[d.getDate(),months[d.getMonth()],time].join(" ")}exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))};exports.inherits=_dereq_("inherits");exports._extend=function(origin,add){if(!add||!isObject(add))return origin;var keys=Object.keys(add);var i=keys.length;while(i--){origin[keys[i]]=add[keys[i]]}return origin};function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}}).call(this,_dereq_("FWaASH"),typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./support/isBuffer":2,FWaASH:15,inherits:14}],4:[function(_dereq_,module,exports){},{}],5:[function(_dereq_,module,exports){var base64=_dereq_("base64-js");var ieee754=_dereq_("ieee754");exports.Buffer=Buffer;exports.SlowBuffer=Buffer;exports.INSPECT_MAX_BYTES=50;Buffer.poolSize=8192;Buffer._useTypedArrays=function(){try{var buf=new ArrayBuffer(0);var arr=new Uint8Array(buf);arr.foo=function(){return 42};return 42===arr.foo()&&typeof arr.subarray==="function"}catch(e){return false}}();function Buffer(subject,encoding,noZero){if(!(this instanceof Buffer))return new Buffer(subject,encoding,noZero);var type=typeof subject;if(encoding==="base64"&&type==="string"){subject=stringtrim(subject);while(subject.length%4!==0){subject=subject+"="}}var length;if(type==="number")length=coerce(subject);else if(type==="string")length=Buffer.byteLength(subject,encoding);else if(type==="object")length=coerce(subject.length);else throw new Error("First argument needs to be a number, array or string.");var buf;if(Buffer._useTypedArrays){buf=Buffer._augment(new Uint8Array(length))}else{buf=this;buf.length=length;buf._isBuffer=true}var i;if(Buffer._useTypedArrays&&typeof subject.byteLength==="number"){buf._set(subject)}else if(isArrayish(subject)){if(Buffer.isBuffer(subject)){for(i=0;i<length;i++)buf[i]=subject.readUInt8(i)}else{for(i=0;i<length;i++)buf[i]=(subject[i]%256+256)%256}}else if(type==="string"){buf.write(subject,0,encoding)}else if(type==="number"&&!Buffer._useTypedArrays&&!noZero){for(i=0;i<length;i++){buf[i]=0}}return buf}Buffer.isEncoding=function(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};Buffer.isBuffer=function(b){return!!(b!==null&&b!==undefined&&b._isBuffer)};Buffer.byteLength=function(str,encoding){var ret;str=str.toString();switch(encoding||"utf8"){case"hex":ret=str.length/2;break;case"utf8":case"utf-8":ret=utf8ToBytes(str).length;break;case"ascii":case"binary":case"raw":ret=str.length;break;case"base64":ret=base64ToBytes(str).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":ret=str.length*2;break;default:throw new Error("Unknown encoding")}return ret};Buffer.concat=function(list,totalLength){assert(isArray(list),"Usage: Buffer.concat(list[, length])");if(list.length===0){return new Buffer(0)}else if(list.length===1){return list[0]}var i;if(totalLength===undefined){totalLength=0;for(i=0;i<list.length;i++){totalLength+=list[i].length}}var buf=new Buffer(totalLength);var pos=0;for(i=0;i<list.length;i++){var item=list[i];item.copy(buf,pos);pos+=item.length}return buf};Buffer.compare=function(a,b){assert(Buffer.isBuffer(a)&&Buffer.isBuffer(b),"Arguments must be Buffers");var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len&&a[i]===b[i];i++){}if(i!==len){x=a[i];y=b[i]}if(x<y){return-1}if(y<x){return 1}return 0};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining}else{length=Number(length);if(length>remaining){length=remaining}}var strLen=string.length;assert(strLen%2===0,"Invalid hex string");if(length>strLen/2){length=strLen/2}for(var i=0;i<length;i++){var byte=parseInt(string.substr(i*2,2),16);assert(!isNaN(byte),"Invalid hex string");buf[offset+i]=byte}return i}function utf8Write(buf,string,offset,length){var charsWritten=blitBuffer(utf8ToBytes(string),buf,offset,length);return charsWritten}function asciiWrite(buf,string,offset,length){var charsWritten=blitBuffer(asciiToBytes(string),buf,offset,length);return charsWritten}function binaryWrite(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){var charsWritten=blitBuffer(base64ToBytes(string),buf,offset,length);return charsWritten}function utf16leWrite(buf,string,offset,length){var charsWritten=blitBuffer(utf16leToBytes(string),buf,offset,length);return charsWritten}Buffer.prototype.write=function(string,offset,length,encoding){if(isFinite(offset)){if(!isFinite(length)){encoding=length;length=undefined}}else{var swap=encoding;encoding=offset;offset=length;length=swap}offset=Number(offset)||0;var remaining=this.length-offset;if(!length){length=remaining}else{length=Number(length);if(length>remaining){length=remaining}}encoding=String(encoding||"utf8").toLowerCase();var ret;switch(encoding){case"hex":ret=hexWrite(this,string,offset,length);break;case"utf8":case"utf-8":ret=utf8Write(this,string,offset,length);break;case"ascii":ret=asciiWrite(this,string,offset,length);break;case"binary":ret=binaryWrite(this,string,offset,length);break;case"base64":ret=base64Write(this,string,offset,length);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":ret=utf16leWrite(this,string,offset,length);break;default:throw new Error("Unknown encoding")}return ret};Buffer.prototype.toString=function(encoding,start,end){var self=this;encoding=String(encoding||"utf8").toLowerCase();start=Number(start)||0;end=end===undefined?self.length:Number(end);if(end===start)return"";var ret;switch(encoding){case"hex":ret=hexSlice(self,start,end);break;case"utf8":case"utf-8":ret=utf8Slice(self,start,end);break;case"ascii":ret=asciiSlice(self,start,end);break;case"binary":ret=binarySlice(self,start,end);break;case"base64":ret=base64Slice(self,start,end);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":ret=utf16leSlice(self,start,end);break;default:throw new Error("Unknown encoding")}return ret};Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};Buffer.prototype.equals=function(b){assert(Buffer.isBuffer(b),"Argument must be a Buffer");return Buffer.compare(this,b)===0};Buffer.prototype.compare=function(b){assert(Buffer.isBuffer(b),"Argument must be a Buffer");return Buffer.compare(this,b)};Buffer.prototype.copy=function(target,target_start,start,end){var source=this;if(!start)start=0;if(!end&&end!==0)end=this.length;if(!target_start)target_start=0;if(end===start)return;if(target.length===0||source.length===0)return;assert(end>=start,"sourceEnd < sourceStart");assert(target_start>=0&&target_start<target.length,"targetStart out of bounds");assert(start>=0&&start<source.length,"sourceStart out of bounds");assert(end>=0&&end<=source.length,"sourceEnd out of bounds");if(end>this.length)end=this.length;if(target.length-target_start<end-start)end=target.length-target_start+start;var len=end-start;if(len<100||!Buffer._useTypedArrays){for(var i=0;i<len;i++){target[i+target_start]=this[i+start]}}else{target._set(this.subarray(start,start+len),target_start)}};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else{return base64.fromByteArray(buf.slice(start,end))}}function utf8Slice(buf,start,end){var res="";var tmp="";end=Math.min(buf.length,end);for(var i=start;i<end;i++){if(buf[i]<=127){res+=decodeUtf8Char(tmp)+String.fromCharCode(buf[i]);tmp=""}else{tmp+="%"+buf[i].toString(16)}}return res+decodeUtf8Char(tmp)}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;i++){ret+=String.fromCharCode(buf[i])}return ret}function binarySlice(buf,start,end){return asciiSlice(buf,start,end)}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out="";for(var i=start;i<end;i++){out+=toHex(buf[i])}return out}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res="";for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256)}return res}Buffer.prototype.slice=function(start,end){var len=this.length;start=clamp(start,len,0);end=clamp(end,len,len);if(Buffer._useTypedArrays){return Buffer._augment(this.subarray(start,end))}else{var sliceLen=end-start;var newBuf=new Buffer(sliceLen,undefined,true);for(var i=0;i<sliceLen;i++){newBuf[i]=this[i+start]}return newBuf}};Buffer.prototype.get=function(offset){console.log(".get() is deprecated. Access using array indexes instead.");return this.readUInt8(offset)};Buffer.prototype.set=function(v,offset){console.log(".set() is deprecated. Access using array indexes instead.");return this.writeUInt8(v,offset)};Buffer.prototype.readUInt8=function(offset,noAssert){if(!noAssert){assert(offset!==undefined&&offset!==null,"missing offset");assert(offset<this.length,"Trying to read beyond buffer length")}if(offset>=this.length)return;return this[offset]};function readUInt16(buf,offset,littleEndian,noAssert){if(!noAssert){assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+1<buf.length,"Trying to read beyond buffer length")}var len=buf.length;if(offset>=len)return;var val;if(littleEndian){val=buf[offset];if(offset+1<len)val|=buf[offset+1]<<8}else{val=buf[offset]<<8;if(offset+1<len)val|=buf[offset+1]}return val}Buffer.prototype.readUInt16LE=function(offset,noAssert){return readUInt16(this,offset,true,noAssert)};Buffer.prototype.readUInt16BE=function(offset,noAssert){return readUInt16(this,offset,false,noAssert)};function readUInt32(buf,offset,littleEndian,noAssert){if(!noAssert){assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+3<buf.length,"Trying to read beyond buffer length")}var len=buf.length;if(offset>=len)return;var val;if(littleEndian){if(offset+2<len)val=buf[offset+2]<<16;if(offset+1<len)val|=buf[offset+1]<<8;val|=buf[offset];if(offset+3<len)val=val+(buf[offset+3]<<24>>>0)}else{if(offset+1<len)val=buf[offset+1]<<16;if(offset+2<len)val|=buf[offset+2]<<8;if(offset+3<len)val|=buf[offset+3];val=val+(buf[offset]<<24>>>0)}return val}Buffer.prototype.readUInt32LE=function(offset,noAssert){return readUInt32(this,offset,true,noAssert)};Buffer.prototype.readUInt32BE=function(offset,noAssert){return readUInt32(this,offset,false,noAssert)};Buffer.prototype.readInt8=function(offset,noAssert){if(!noAssert){assert(offset!==undefined&&offset!==null,"missing offset");assert(offset<this.length,"Trying to read beyond buffer length")}if(offset>=this.length)return;var neg=this[offset]&128;if(neg)return(255-this[offset]+1)*-1;else return this[offset]};function readInt16(buf,offset,littleEndian,noAssert){if(!noAssert){assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+1<buf.length,"Trying to read beyond buffer length")}var len=buf.length;if(offset>=len)return;var val=readUInt16(buf,offset,littleEndian,true);var neg=val&32768;if(neg)return(65535-val+1)*-1;else return val}Buffer.prototype.readInt16LE=function(offset,noAssert){return readInt16(this,offset,true,noAssert)};Buffer.prototype.readInt16BE=function(offset,noAssert){return readInt16(this,offset,false,noAssert)};function readInt32(buf,offset,littleEndian,noAssert){if(!noAssert){assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+3<buf.length,"Trying to read beyond buffer length")}var len=buf.length;if(offset>=len)return;var val=readUInt32(buf,offset,littleEndian,true);var neg=val&2147483648;if(neg)return(4294967295-val+1)*-1;else return val}Buffer.prototype.readInt32LE=function(offset,noAssert){return readInt32(this,offset,true,noAssert)};Buffer.prototype.readInt32BE=function(offset,noAssert){return readInt32(this,offset,false,noAssert)};function readFloat(buf,offset,littleEndian,noAssert){if(!noAssert){assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset+3<buf.length,"Trying to read beyond buffer length")}return ieee754.read(buf,offset,littleEndian,23,4)}Buffer.prototype.readFloatLE=function(offset,noAssert){return readFloat(this,offset,true,noAssert)};Buffer.prototype.readFloatBE=function(offset,noAssert){return readFloat(this,offset,false,noAssert)};function readDouble(buf,offset,littleEndian,noAssert){if(!noAssert){assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset+7<buf.length,"Trying to read beyond buffer length")}return ieee754.read(buf,offset,littleEndian,52,8)}Buffer.prototype.readDoubleLE=function(offset,noAssert){return readDouble(this,offset,true,noAssert)};Buffer.prototype.readDoubleBE=function(offset,noAssert){return readDouble(this,offset,false,noAssert)};Buffer.prototype.writeUInt8=function(value,offset,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset<this.length,"trying to write beyond buffer length");verifuint(value,255)}if(offset>=this.length)return;this[offset]=value;return offset+1};function writeUInt16(buf,value,offset,littleEndian,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+1<buf.length,"trying to write beyond buffer length");verifuint(value,65535)}var len=buf.length;if(offset>=len)return;for(var i=0,j=Math.min(len-offset,2);i<j;i++){buf[offset+i]=(value&255<<8*(littleEndian?i:1-i))>>>(littleEndian?i:1-i)*8}return offset+2}Buffer.prototype.writeUInt16LE=function(value,offset,noAssert){return writeUInt16(this,value,offset,true,noAssert)};Buffer.prototype.writeUInt16BE=function(value,offset,noAssert){return writeUInt16(this,value,offset,false,noAssert)};function writeUInt32(buf,value,offset,littleEndian,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+3<buf.length,"trying to write beyond buffer length");verifuint(value,4294967295)}var len=buf.length;if(offset>=len)return;for(var i=0,j=Math.min(len-offset,4);i<j;i++){buf[offset+i]=value>>>(littleEndian?i:3-i)*8&255}return offset+4}Buffer.prototype.writeUInt32LE=function(value,offset,noAssert){return writeUInt32(this,value,offset,true,noAssert)};Buffer.prototype.writeUInt32BE=function(value,offset,noAssert){return writeUInt32(this,value,offset,false,noAssert)};Buffer.prototype.writeInt8=function(value,offset,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset<this.length,"Trying to write beyond buffer length");verifsint(value,127,-128)}if(offset>=this.length)return;if(value>=0)this.writeUInt8(value,offset,noAssert);else this.writeUInt8(255+value+1,offset,noAssert);return offset+1};function writeInt16(buf,value,offset,littleEndian,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+1<buf.length,"Trying to write beyond buffer length");verifsint(value,32767,-32768)}var len=buf.length;if(offset>=len)return;if(value>=0)writeUInt16(buf,value,offset,littleEndian,noAssert);else writeUInt16(buf,65535+value+1,offset,littleEndian,noAssert);return offset+2}Buffer.prototype.writeInt16LE=function(value,offset,noAssert){return writeInt16(this,value,offset,true,noAssert)};Buffer.prototype.writeInt16BE=function(value,offset,noAssert){return writeInt16(this,value,offset,false,noAssert)};function writeInt32(buf,value,offset,littleEndian,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+3<buf.length,"Trying to write beyond buffer length");verifsint(value,2147483647,-2147483648)}var len=buf.length;if(offset>=len)return;if(value>=0)writeUInt32(buf,value,offset,littleEndian,noAssert);else writeUInt32(buf,4294967295+value+1,offset,littleEndian,noAssert);return offset+4}Buffer.prototype.writeInt32LE=function(value,offset,noAssert){return writeInt32(this,value,offset,true,noAssert)};Buffer.prototype.writeInt32BE=function(value,offset,noAssert){return writeInt32(this,value,offset,false,noAssert)};function writeFloat(buf,value,offset,littleEndian,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+3<buf.length,"Trying to write beyond buffer length");verifIEEE754(value,3.4028234663852886e38,-3.4028234663852886e38)}var len=buf.length;if(offset>=len)return;ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4
}Buffer.prototype.writeFloatLE=function(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert)};Buffer.prototype.writeFloatBE=function(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert)};function writeDouble(buf,value,offset,littleEndian,noAssert){if(!noAssert){assert(value!==undefined&&value!==null,"missing value");assert(typeof littleEndian==="boolean","missing or invalid endian");assert(offset!==undefined&&offset!==null,"missing offset");assert(offset+7<buf.length,"Trying to write beyond buffer length");verifIEEE754(value,1.7976931348623157e308,-1.7976931348623157e308)}var len=buf.length;if(offset>=len)return;ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8}Buffer.prototype.writeDoubleLE=function(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert)};Buffer.prototype.writeDoubleBE=function(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert)};Buffer.prototype.fill=function(value,start,end){if(!value)value=0;if(!start)start=0;if(!end)end=this.length;assert(end>=start,"end < start");if(end===start)return;if(this.length===0)return;assert(start>=0&&start<this.length,"start out of bounds");assert(end>=0&&end<=this.length,"end out of bounds");var i;if(typeof value==="number"){for(i=start;i<end;i++){this[i]=value}}else{var bytes=utf8ToBytes(value.toString());var len=bytes.length;for(i=start;i<end;i++){this[i]=bytes[i%len]}}return this};Buffer.prototype.inspect=function(){var out=[];var len=this.length;for(var i=0;i<len;i++){out[i]=toHex(this[i]);if(i===exports.INSPECT_MAX_BYTES){out[i+1]="...";break}}return"<Buffer "+out.join(" ")+">"};Buffer.prototype.toArrayBuffer=function(){if(typeof Uint8Array!=="undefined"){if(Buffer._useTypedArrays){return new Buffer(this).buffer}else{var buf=new Uint8Array(this.length);for(var i=0,len=buf.length;i<len;i+=1){buf[i]=this[i]}return buf.buffer}}else{throw new Error("Buffer.toArrayBuffer not supported in this browser")}};var BP=Buffer.prototype;Buffer._augment=function(arr){arr._isBuffer=true;arr._get=arr.get;arr._set=arr.set;arr.get=BP.get;arr.set=BP.set;arr.write=BP.write;arr.toString=BP.toString;arr.toLocaleString=BP.toString;arr.toJSON=BP.toJSON;arr.equals=BP.equals;arr.compare=BP.compare;arr.copy=BP.copy;arr.slice=BP.slice;arr.readUInt8=BP.readUInt8;arr.readUInt16LE=BP.readUInt16LE;arr.readUInt16BE=BP.readUInt16BE;arr.readUInt32LE=BP.readUInt32LE;arr.readUInt32BE=BP.readUInt32BE;arr.readInt8=BP.readInt8;arr.readInt16LE=BP.readInt16LE;arr.readInt16BE=BP.readInt16BE;arr.readInt32LE=BP.readInt32LE;arr.readInt32BE=BP.readInt32BE;arr.readFloatLE=BP.readFloatLE;arr.readFloatBE=BP.readFloatBE;arr.readDoubleLE=BP.readDoubleLE;arr.readDoubleBE=BP.readDoubleBE;arr.writeUInt8=BP.writeUInt8;arr.writeUInt16LE=BP.writeUInt16LE;arr.writeUInt16BE=BP.writeUInt16BE;arr.writeUInt32LE=BP.writeUInt32LE;arr.writeUInt32BE=BP.writeUInt32BE;arr.writeInt8=BP.writeInt8;arr.writeInt16LE=BP.writeInt16LE;arr.writeInt16BE=BP.writeInt16BE;arr.writeInt32LE=BP.writeInt32LE;arr.writeInt32BE=BP.writeInt32BE;arr.writeFloatLE=BP.writeFloatLE;arr.writeFloatBE=BP.writeFloatBE;arr.writeDoubleLE=BP.writeDoubleLE;arr.writeDoubleBE=BP.writeDoubleBE;arr.fill=BP.fill;arr.inspect=BP.inspect;arr.toArrayBuffer=BP.toArrayBuffer;return arr};function stringtrim(str){if(str.trim)return str.trim();return str.replace(/^\s+|\s+$/g,"")}function clamp(index,len,defaultValue){if(typeof index!=="number")return defaultValue;index=~~index;if(index>=len)return len;if(index>=0)return index;index+=len;if(index>=0)return index;return 0}function coerce(length){length=~~Math.ceil(+length);return length<0?0:length}function isArray(subject){return(Array.isArray||function(subject){return Object.prototype.toString.call(subject)==="[object Array]"})(subject)}function isArrayish(subject){return isArray(subject)||Buffer.isBuffer(subject)||subject&&typeof subject==="object"&&typeof subject.length==="number"}function toHex(n){if(n<16)return"0"+n.toString(16);return n.toString(16)}function utf8ToBytes(str){var byteArray=[];for(var i=0;i<str.length;i++){var b=str.charCodeAt(i);if(b<=127){byteArray.push(b)}else{var start=i;if(b>=55296&&b<=57343)i++;var h=encodeURIComponent(str.slice(start,i+1)).substr(1).split("%");for(var j=0;j<h.length;j++){byteArray.push(parseInt(h[j],16))}}}return byteArray}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;i++){byteArray.push(str.charCodeAt(i)&255)}return byteArray}function utf16leToBytes(str){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;i++){c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi)}return byteArray}function base64ToBytes(str){return base64.toByteArray(str)}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;i++){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i]}return i}function decodeUtf8Char(str){try{return decodeURIComponent(str)}catch(err){return String.fromCharCode(65533)}}function verifuint(value,max){assert(typeof value==="number","cannot write a non-number as a number");assert(value>=0,"specified a negative value for writing an unsigned value");assert(value<=max,"value is larger than maximum value for type");assert(Math.floor(value)===value,"value has a fractional component")}function verifsint(value,max,min){assert(typeof value==="number","cannot write a non-number as a number");assert(value<=max,"value larger than maximum allowed value");assert(value>=min,"value smaller than minimum allowed value");assert(Math.floor(value)===value,"value has a fractional component")}function verifIEEE754(value,max,min){assert(typeof value==="number","cannot write a non-number as a number");assert(value<=max,"value larger than maximum allowed value");assert(value>=min,"value smaller than minimum allowed value")}function assert(test,message){if(!test)throw new Error(message||"Failed assertion")}},{"base64-js":6,ieee754:7}],6:[function(_dereq_,module,exports){var lookup="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";(function(exports){"use strict";var Arr=typeof Uint8Array!=="undefined"?Uint8Array:Array;var ZERO="0".charCodeAt(0);var PLUS="+".charCodeAt(0);var SLASH="/".charCodeAt(0);var NUMBER="0".charCodeAt(0);var LOWER="a".charCodeAt(0);var UPPER="A".charCodeAt(0);function decode(elt){var code=elt.charCodeAt(0);if(code===PLUS)return 62;if(code===SLASH)return 63;if(code<NUMBER)return-1;if(code<NUMBER+10)return code-NUMBER+26+26;if(code<UPPER+26)return code-UPPER;if(code<LOWER+26)return code-LOWER+26}function b64ToByteArray(b64){var i,j,l,tmp,placeHolders,arr;if(b64.length%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}var len=b64.length;placeHolders="="===b64.charAt(len-2)?2:"="===b64.charAt(len-1)?1:0;arr=new Arr(b64.length*3/4-placeHolders);l=placeHolders>0?b64.length-4:b64.length;var L=0;function push(v){arr[L++]=v}for(i=0,j=0;i<l;i+=4,j+=3){tmp=decode(b64.charAt(i))<<18|decode(b64.charAt(i+1))<<12|decode(b64.charAt(i+2))<<6|decode(b64.charAt(i+3));push((tmp&16711680)>>16);push((tmp&65280)>>8);push(tmp&255)}if(placeHolders===2){tmp=decode(b64.charAt(i))<<2|decode(b64.charAt(i+1))>>4;push(tmp&255)}else if(placeHolders===1){tmp=decode(b64.charAt(i))<<10|decode(b64.charAt(i+1))<<4|decode(b64.charAt(i+2))>>2;push(tmp>>8&255);push(tmp&255)}return arr}function uint8ToBase64(uint8){var i,extraBytes=uint8.length%3,output="",temp,length;function encode(num){return lookup.charAt(num)}function tripletToBase64(num){return encode(num>>18&63)+encode(num>>12&63)+encode(num>>6&63)+encode(num&63)}for(i=0,length=uint8.length-extraBytes;i<length;i+=3){temp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output+=tripletToBase64(temp)}switch(extraBytes){case 1:temp=uint8[uint8.length-1];output+=encode(temp>>2);output+=encode(temp<<4&63);output+="==";break;case 2:temp=(uint8[uint8.length-2]<<8)+uint8[uint8.length-1];output+=encode(temp>>10);output+=encode(temp>>4&63);output+=encode(temp<<2&63);output+="=";break}return output}module.exports.toByteArray=b64ToByteArray;module.exports.fromByteArray=uint8ToBase64})()},{}],7:[function(_dereq_,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m,eLen=nBytes*8-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,nBits=-7,i=isLE?nBytes-1:0,d=isLE?-1:1,s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8);m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8);if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity}else{m=m+Math.pow(2,mLen);e=e-eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c,eLen=nBytes*8-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0,i=isLE?0:nBytes-1,d=isLE?1:-1,s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2}if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}if(value*c>=2){e++;c/=2}if(e+eBias>=eMax){m=0;e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0}}for(;mLen>=8;buffer[offset+i]=m&255,i+=d,m/=256,mLen-=8);e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&255,i+=d,e/=256,eLen-=8);buffer[offset+i-d]|=s*128}},{}],8:[function(_dereq_,module,exports){var Buffer=_dereq_("buffer").Buffer;var intSize=4;var zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var chrsz=8;function toArray(buf,bigEndian){if(buf.length%intSize!==0){var len=buf.length+(intSize-buf.length%intSize);buf=Buffer.concat([buf,zeroBuffer],len)}var arr=[];var fn=bigEndian?buf.readInt32BE:buf.readInt32LE;for(var i=0;i<buf.length;i+=intSize){arr.push(fn.call(buf,i))}return arr}function toBuffer(arr,size,bigEndian){var buf=new Buffer(size);var fn=bigEndian?buf.writeInt32BE:buf.writeInt32LE;for(var i=0;i<arr.length;i++){fn.call(buf,arr[i],i*4,true)}return buf}function hash(buf,fn,hashSize,bigEndian){if(!Buffer.isBuffer(buf))buf=new Buffer(buf);var arr=fn(toArray(buf,bigEndian),buf.length*chrsz);return toBuffer(arr,hashSize,bigEndian)}module.exports={hash:hash}},{buffer:5}],9:[function(_dereq_,module,exports){var Buffer=_dereq_("buffer").Buffer;var sha=_dereq_("./sha");var sha256=_dereq_("./sha256");var rng=_dereq_("./rng");var md5=_dereq_("./md5");var algorithms={sha1:sha,sha256:sha256,md5:md5};var blocksize=64;var zeroBuffer=new Buffer(blocksize);zeroBuffer.fill(0);function hmac(fn,key,data){if(!Buffer.isBuffer(key))key=new Buffer(key);if(!Buffer.isBuffer(data))data=new Buffer(data);if(key.length>blocksize){key=fn(key)}else if(key.length<blocksize){key=Buffer.concat([key,zeroBuffer],blocksize)}var ipad=new Buffer(blocksize),opad=new Buffer(blocksize);for(var i=0;i<blocksize;i++){ipad[i]=key[i]^54;opad[i]=key[i]^92}var hash=fn(Buffer.concat([ipad,data]));return fn(Buffer.concat([opad,hash]))}function hash(alg,key){alg=alg||"sha1";var fn=algorithms[alg];var bufs=[];var length=0;if(!fn)error("algorithm:",alg,"is not yet supported");return{update:function(data){if(!Buffer.isBuffer(data))data=new Buffer(data);bufs.push(data);length+=data.length;return this},digest:function(enc){var buf=Buffer.concat(bufs);var r=key?hmac(fn,key,buf):fn(buf);bufs=null;return enc?r.toString(enc):r}}}function error(){var m=[].slice.call(arguments).join(" ");throw new Error([m,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}exports.createHash=function(alg){return hash(alg)};exports.createHmac=function(alg,key){return hash(alg,key)};exports.randomBytes=function(size,callback){if(callback&&callback.call){try{callback.call(this,undefined,new Buffer(rng(size)))}catch(err){callback(err)}}else{return new Buffer(rng(size))}};function each(a,f){for(var i in a)f(a[i],i)}each(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(name){exports[name]=function(){error("sorry,",name,"is not implemented yet")}})},{"./md5":10,"./rng":11,"./sha":12,"./sha256":13,buffer:5}],10:[function(_dereq_,module,exports){var helpers=_dereq_("./helpers");function md5_vm_test(){return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72"}function core_md5(x,len){x[len>>5]|=128<<len%32;x[(len+64>>>9<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn(b&c|~b&d,a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn(b&d|c&~d,a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|~d),a,b,x,s,t)}function safe_add(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}function bit_rol(num,cnt){return num<<cnt|num>>>32-cnt}module.exports=function md5(buf){return helpers.hash(buf,core_md5,16)}},{"./helpers":8}],11:[function(_dereq_,module,exports){(function(){var _global=this;var mathRNG,whatwgRNG;mathRNG=function(size){var bytes=new Array(size);var r;for(var i=0,r;i<size;i++){if((i&3)==0)r=Math.random()*4294967296;bytes[i]=r>>>((i&3)<<3)&255}return bytes};if(_global.crypto&&crypto.getRandomValues){whatwgRNG=function(size){var bytes=new Uint8Array(size);crypto.getRandomValues(bytes);return bytes}}module.exports=whatwgRNG||mathRNG})()},{}],12:[function(_dereq_,module,exports){var helpers=_dereq_("./helpers");function core_sha1(x,len){x[len>>5]|=128<<24-len%32;x[(len+64>>9<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t}a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde)}return Array(a,b,c,d,e)}function sha1_ft(t,b,c,d){if(t<20)return b&c|~b&d;if(t<40)return b^c^d;if(t<60)return b&c|b&d|c&d;return b^c^d}function sha1_kt(t){return t<20?1518500249:t<40?1859775393:t<60?-1894007588:-899497514}function safe_add(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}function rol(num,cnt){return num<<cnt|num>>>32-cnt}module.exports=function sha1(buf){return helpers.hash(buf,core_sha1,20,true)}},{"./helpers":8}],13:[function(_dereq_,module,exports){var helpers=_dereq_("./helpers");var safe_add=function(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535};var S=function(X,n){return X>>>n|X<<32-n};var R=function(X,n){return X>>>n};var Ch=function(x,y,z){return x&y^~x&z};var Maj=function(x,y,z){return x&y^x&z^y&z};var Sigma0256=function(x){return S(x,2)^S(x,13)^S(x,22)};var Sigma1256=function(x){return S(x,6)^S(x,11)^S(x,25)};var Gamma0256=function(x){return S(x,7)^S(x,18)^R(x,3)};var Gamma1256=function(x){return S(x,17)^S(x,19)^R(x,10)};var core_sha256=function(m,l){var K=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298);var HASH=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225);var W=new Array(64);var a,b,c,d,e,f,g,h,i,j;var T1,T2;m[l>>5]|=128<<24-l%32;m[(l+64>>9<<4)+15]=l;for(var i=0;i<m.length;i+=16){a=HASH[0];b=HASH[1];c=HASH[2];d=HASH[3];e=HASH[4];f=HASH[5];g=HASH[6];h=HASH[7];for(var j=0;j<64;j++){if(j<16){W[j]=m[j+i]}else{W[j]=safe_add(safe_add(safe_add(Gamma1256(W[j-2]),W[j-7]),Gamma0256(W[j-15])),W[j-16])}T1=safe_add(safe_add(safe_add(safe_add(h,Sigma1256(e)),Ch(e,f,g)),K[j]),W[j]);T2=safe_add(Sigma0256(a),Maj(a,b,c));h=g;g=f;f=e;e=safe_add(d,T1);d=c;c=b;b=a;a=safe_add(T1,T2)}HASH[0]=safe_add(a,HASH[0]);HASH[1]=safe_add(b,HASH[1]);HASH[2]=safe_add(c,HASH[2]);HASH[3]=safe_add(d,HASH[3]);HASH[4]=safe_add(e,HASH[4]);HASH[5]=safe_add(f,HASH[5]);HASH[6]=safe_add(g,HASH[6]);HASH[7]=safe_add(h,HASH[7])}return HASH};module.exports=function sha256(buf){return helpers.hash(buf,core_sha256,32,true)}},{"./helpers":8}],14:[function(_dereq_,module,exports){if(typeof Object.create==="function"){module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}})}}else{module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor;ctor.prototype.constructor=ctor}}},{}],15:[function(_dereq_,module,exports){var process=module.exports={};process.nextTick=function(){var canSetImmediate=typeof window!=="undefined"&&window.setImmediate;var canPost=typeof window!=="undefined"&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f)}}if(canPost){var queue=[];window.addEventListener("message",function(ev){var source=ev.source;if((source===window||source===null)&&ev.data==="process-tick"){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn()}}},true);return function nextTick(fn){queue.push(fn);window.postMessage("process-tick","*")}}return function nextTick(fn){setTimeout(fn,0)}}();process.title="browser";process.browser=true;process.env={};process.argv=[];function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")}},{}],16:[function(_dereq_,module,exports){module.exports=_dereq_(2)},{}],17:[function(_dereq_,module,exports){module.exports=_dereq_(3)},{"./support/isBuffer":16,FWaASH:15,inherits:14}],18:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./enc-base64"),_dereq_("./md5"),_dereq_("./evpkdf"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var BlockCipher=C_lib.BlockCipher;var C_algo=C.algo;var SBOX=[];var INV_SBOX=[];var SUB_MIX_0=[];var SUB_MIX_1=[];var SUB_MIX_2=[];var SUB_MIX_3=[];var INV_SUB_MIX_0=[];var INV_SUB_MIX_1=[];var INV_SUB_MIX_2=[];var INV_SUB_MIX_3=[];(function(){var d=[];for(var i=0;i<256;i++){if(i<128){d[i]=i<<1}else{d[i]=i<<1^283}}var x=0;var xi=0;for(var i=0;i<256;i++){var sx=xi^xi<<1^xi<<2^xi<<3^xi<<4;sx=sx>>>8^sx&255^99;SBOX[x]=sx;INV_SBOX[sx]=x;var x2=d[x];var x4=d[x2];var x8=d[x4];var t=d[sx]*257^sx*16843008;SUB_MIX_0[x]=t<<24|t>>>8;SUB_MIX_1[x]=t<<16|t>>>16;SUB_MIX_2[x]=t<<8|t>>>24;SUB_MIX_3[x]=t;var t=x8*16843009^x4*65537^x2*257^x*16843008;INV_SUB_MIX_0[sx]=t<<24|t>>>8;INV_SUB_MIX_1[sx]=t<<16|t>>>16;INV_SUB_MIX_2[sx]=t<<8|t>>>24;INV_SUB_MIX_3[sx]=t;if(!x){x=xi=1}else{x=x2^d[d[d[x8^x2]]];xi^=d[d[xi]]}}})();var RCON=[0,1,2,4,8,16,32,64,128,27,54];var AES=C_algo.AES=BlockCipher.extend({_doReset:function(){var key=this._key;var keyWords=key.words;var keySize=key.sigBytes/4;var nRounds=this._nRounds=keySize+6;var ksRows=(nRounds+1)*4;var keySchedule=this._keySchedule=[];for(var ksRow=0;ksRow<ksRows;ksRow++){if(ksRow<keySize){keySchedule[ksRow]=keyWords[ksRow]}else{var t=keySchedule[ksRow-1];if(!(ksRow%keySize)){t=t<<8|t>>>24;t=SBOX[t>>>24]<<24|SBOX[t>>>16&255]<<16|SBOX[t>>>8&255]<<8|SBOX[t&255];t^=RCON[ksRow/keySize|0]<<24}else if(keySize>6&&ksRow%keySize==4){t=SBOX[t>>>24]<<24|SBOX[t>>>16&255]<<16|SBOX[t>>>8&255]<<8|SBOX[t&255]}keySchedule[ksRow]=keySchedule[ksRow-keySize]^t}}var invKeySchedule=this._invKeySchedule=[];for(var invKsRow=0;invKsRow<ksRows;invKsRow++){var ksRow=ksRows-invKsRow;if(invKsRow%4){var t=keySchedule[ksRow]}else{var t=keySchedule[ksRow-4]}if(invKsRow<4||ksRow<=4){invKeySchedule[invKsRow]=t}else{invKeySchedule[invKsRow]=INV_SUB_MIX_0[SBOX[t>>>24]]^INV_SUB_MIX_1[SBOX[t>>>16&255]]^INV_SUB_MIX_2[SBOX[t>>>8&255]]^INV_SUB_MIX_3[SBOX[t&255]]}}},encryptBlock:function(M,offset){this._doCryptBlock(M,offset,this._keySchedule,SUB_MIX_0,SUB_MIX_1,SUB_MIX_2,SUB_MIX_3,SBOX)},decryptBlock:function(M,offset){var t=M[offset+1];M[offset+1]=M[offset+3];M[offset+3]=t;this._doCryptBlock(M,offset,this._invKeySchedule,INV_SUB_MIX_0,INV_SUB_MIX_1,INV_SUB_MIX_2,INV_SUB_MIX_3,INV_SBOX);var t=M[offset+1];M[offset+1]=M[offset+3];M[offset+3]=t},_doCryptBlock:function(M,offset,keySchedule,SUB_MIX_0,SUB_MIX_1,SUB_MIX_2,SUB_MIX_3,SBOX){var nRounds=this._nRounds;var s0=M[offset]^keySchedule[0];var s1=M[offset+1]^keySchedule[1];var s2=M[offset+2]^keySchedule[2];var s3=M[offset+3]^keySchedule[3];var ksRow=4;for(var round=1;round<nRounds;round++){var t0=SUB_MIX_0[s0>>>24]^SUB_MIX_1[s1>>>16&255]^SUB_MIX_2[s2>>>8&255]^SUB_MIX_3[s3&255]^keySchedule[ksRow++];var t1=SUB_MIX_0[s1>>>24]^SUB_MIX_1[s2>>>16&255]^SUB_MIX_2[s3>>>8&255]^SUB_MIX_3[s0&255]^keySchedule[ksRow++];var t2=SUB_MIX_0[s2>>>24]^SUB_MIX_1[s3>>>16&255]^SUB_MIX_2[s0>>>8&255]^SUB_MIX_3[s1&255]^keySchedule[ksRow++];var t3=SUB_MIX_0[s3>>>24]^SUB_MIX_1[s0>>>16&255]^SUB_MIX_2[s1>>>8&255]^SUB_MIX_3[s2&255]^keySchedule[ksRow++];s0=t0;s1=t1;s2=t2;s3=t3}var t0=(SBOX[s0>>>24]<<24|SBOX[s1>>>16&255]<<16|SBOX[s2>>>8&255]<<8|SBOX[s3&255])^keySchedule[ksRow++];var t1=(SBOX[s1>>>24]<<24|SBOX[s2>>>16&255]<<16|SBOX[s3>>>8&255]<<8|SBOX[s0&255])^keySchedule[ksRow++];var t2=(SBOX[s2>>>24]<<24|SBOX[s3>>>16&255]<<16|SBOX[s0>>>8&255]<<8|SBOX[s1&255])^keySchedule[ksRow++];var t3=(SBOX[s3>>>24]<<24|SBOX[s0>>>16&255]<<16|SBOX[s1>>>8&255]<<8|SBOX[s2&255])^keySchedule[ksRow++];M[offset]=t0;M[offset+1]=t1;M[offset+2]=t2;M[offset+3]=t3},keySize:256/32});C.AES=BlockCipher._createHelper(AES)})();return CryptoJS.AES})},{"./cipher-core":19,"./core":20,"./enc-base64":21,"./evpkdf":23,"./md5":29}],19:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.lib.Cipher||function(undefined){var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var WordArray=C_lib.WordArray;var BufferedBlockAlgorithm=C_lib.BufferedBlockAlgorithm;var C_enc=C.enc;var Utf8=C_enc.Utf8;var Base64=C_enc.Base64;var C_algo=C.algo;var EvpKDF=C_algo.EvpKDF;var Cipher=C_lib.Cipher=BufferedBlockAlgorithm.extend({cfg:Base.extend(),createEncryptor:function(key,cfg){return this.create(this._ENC_XFORM_MODE,key,cfg)},createDecryptor:function(key,cfg){return this.create(this._DEC_XFORM_MODE,key,cfg)},init:function(xformMode,key,cfg){this.cfg=this.cfg.extend(cfg);this._xformMode=xformMode;this._key=key;this.reset()},reset:function(){BufferedBlockAlgorithm.reset.call(this);this._doReset()},process:function(dataUpdate){this._append(dataUpdate);return this._process()},finalize:function(dataUpdate){if(dataUpdate){this._append(dataUpdate)}var finalProcessedData=this._doFinalize();return finalProcessedData},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function selectCipherStrategy(key){if(typeof key=="string"){return PasswordBasedCipher}else{return SerializableCipher}}return function(cipher){return{encrypt:function(message,key,cfg){return selectCipherStrategy(key).encrypt(cipher,message,key,cfg)},decrypt:function(ciphertext,key,cfg){return selectCipherStrategy(key).decrypt(cipher,ciphertext,key,cfg)}}}}()});var StreamCipher=C_lib.StreamCipher=Cipher.extend({_doFinalize:function(){var finalProcessedBlocks=this._process(!!"flush");return finalProcessedBlocks},blockSize:1});var C_mode=C.mode={};var BlockCipherMode=C_lib.BlockCipherMode=Base.extend({createEncryptor:function(cipher,iv){return this.Encryptor.create(cipher,iv)},createDecryptor:function(cipher,iv){return this.Decryptor.create(cipher,iv)},init:function(cipher,iv){this._cipher=cipher;this._iv=iv}});var CBC=C_mode.CBC=function(){var CBC=BlockCipherMode.extend();CBC.Encryptor=CBC.extend({processBlock:function(words,offset){var cipher=this._cipher;var blockSize=cipher.blockSize;xorBlock.call(this,words,offset,blockSize);cipher.encryptBlock(words,offset);this._prevBlock=words.slice(offset,offset+blockSize)}});CBC.Decryptor=CBC.extend({processBlock:function(words,offset){var cipher=this._cipher;var blockSize=cipher.blockSize;var thisBlock=words.slice(offset,offset+blockSize);cipher.decryptBlock(words,offset);xorBlock.call(this,words,offset,blockSize);this._prevBlock=thisBlock}});function xorBlock(words,offset,blockSize){var iv=this._iv;if(iv){var block=iv;this._iv=undefined}else{var block=this._prevBlock}for(var i=0;i<blockSize;i++){words[offset+i]^=block[i]}}return CBC}();var C_pad=C.pad={};var Pkcs7=C_pad.Pkcs7={pad:function(data,blockSize){var blockSizeBytes=blockSize*4;var nPaddingBytes=blockSizeBytes-data.sigBytes%blockSizeBytes;var paddingWord=nPaddingBytes<<24|nPaddingBytes<<16|nPaddingBytes<<8|nPaddingBytes;var paddingWords=[];for(var i=0;i<nPaddingBytes;i+=4){paddingWords.push(paddingWord)}var padding=WordArray.create(paddingWords,nPaddingBytes);data.concat(padding)},unpad:function(data){var nPaddingBytes=data.words[data.sigBytes-1>>>2]&255;data.sigBytes-=nPaddingBytes}};var BlockCipher=C_lib.BlockCipher=Cipher.extend({cfg:Cipher.cfg.extend({mode:CBC,padding:Pkcs7}),reset:function(){Cipher.reset.call(this);var cfg=this.cfg;var iv=cfg.iv;var mode=cfg.mode;if(this._xformMode==this._ENC_XFORM_MODE){var modeCreator=mode.createEncryptor}else{var modeCreator=mode.createDecryptor;this._minBufferSize=1}this._mode=modeCreator.call(mode,this,iv&&iv.words)},_doProcessBlock:function(words,offset){this._mode.processBlock(words,offset)},_doFinalize:function(){var padding=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){padding.pad(this._data,this.blockSize);var finalProcessedBlocks=this._process(!!"flush")}else{var finalProcessedBlocks=this._process(!!"flush");padding.unpad(finalProcessedBlocks)}return finalProcessedBlocks},blockSize:128/32});var CipherParams=C_lib.CipherParams=Base.extend({init:function(cipherParams){this.mixIn(cipherParams)},toString:function(formatter){return(formatter||this.formatter).stringify(this)}});var C_format=C.format={};var OpenSSLFormatter=C_format.OpenSSL={stringify:function(cipherParams){var ciphertext=cipherParams.ciphertext;var salt=cipherParams.salt;if(salt){var wordArray=WordArray.create([1398893684,1701076831]).concat(salt).concat(ciphertext)}else{var wordArray=ciphertext}return wordArray.toString(Base64)},parse:function(openSSLStr){var ciphertext=Base64.parse(openSSLStr);var ciphertextWords=ciphertext.words;if(ciphertextWords[0]==1398893684&&ciphertextWords[1]==1701076831){var salt=WordArray.create(ciphertextWords.slice(2,4));ciphertextWords.splice(0,4);ciphertext.sigBytes-=16}return CipherParams.create({ciphertext:ciphertext,salt:salt})}};var SerializableCipher=C_lib.SerializableCipher=Base.extend({cfg:Base.extend({format:OpenSSLFormatter}),encrypt:function(cipher,message,key,cfg){cfg=this.cfg.extend(cfg);var encryptor=cipher.createEncryptor(key,cfg);var ciphertext=encryptor.finalize(message);var cipherCfg=encryptor.cfg;return CipherParams.create({ciphertext:ciphertext,key:key,iv:cipherCfg.iv,algorithm:cipher,mode:cipherCfg.mode,padding:cipherCfg.padding,blockSize:cipher.blockSize,formatter:cfg.format})},decrypt:function(cipher,ciphertext,key,cfg){cfg=this.cfg.extend(cfg);ciphertext=this._parse(ciphertext,cfg.format);var plaintext=cipher.createDecryptor(key,cfg).finalize(ciphertext.ciphertext);return plaintext},_parse:function(ciphertext,format){if(typeof ciphertext=="string"){return format.parse(ciphertext,this)}else{return ciphertext}}});var C_kdf=C.kdf={};var OpenSSLKdf=C_kdf.OpenSSL={execute:function(password,keySize,ivSize,salt){if(!salt){salt=WordArray.random(64/8)}var key=EvpKDF.create({keySize:keySize+ivSize}).compute(password,salt);var iv=WordArray.create(key.words.slice(keySize),ivSize*4);key.sigBytes=keySize*4;return CipherParams.create({key:key,iv:iv,salt:salt})}};var PasswordBasedCipher=C_lib.PasswordBasedCipher=SerializableCipher.extend({cfg:SerializableCipher.cfg.extend({kdf:OpenSSLKdf}),encrypt:function(cipher,message,password,cfg){cfg=this.cfg.extend(cfg);var derivedParams=cfg.kdf.execute(password,cipher.keySize,cipher.ivSize);cfg.iv=derivedParams.iv;var ciphertext=SerializableCipher.encrypt.call(this,cipher,message,derivedParams.key,cfg);
ciphertext.mixIn(derivedParams);return ciphertext},decrypt:function(cipher,ciphertext,password,cfg){cfg=this.cfg.extend(cfg);ciphertext=this._parse(ciphertext,cfg.format);var derivedParams=cfg.kdf.execute(password,cipher.keySize,cipher.ivSize,ciphertext.salt);cfg.iv=derivedParams.iv;var plaintext=SerializableCipher.decrypt.call(this,cipher,ciphertext,derivedParams.key,cfg);return plaintext}})}()})},{"./core":20}],20:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory()}else if(typeof define==="function"&&define.amd){define([],factory)}else{root.CryptoJS=factory()}})(this,function(){var CryptoJS=CryptoJS||function(Math,undefined){var C={};var C_lib=C.lib={};var Base=C_lib.Base=function(){function F(){}return{extend:function(overrides){F.prototype=this;var subtype=new F;if(overrides){subtype.mixIn(overrides)}if(!subtype.hasOwnProperty("init")){subtype.init=function(){subtype.$super.init.apply(this,arguments)}}subtype.init.prototype=subtype;subtype.$super=this;return subtype},create:function(){var instance=this.extend();instance.init.apply(instance,arguments);return instance},init:function(){},mixIn:function(properties){for(var propertyName in properties){if(properties.hasOwnProperty(propertyName)){this[propertyName]=properties[propertyName]}}if(properties.hasOwnProperty("toString")){this.toString=properties.toString}},clone:function(){return this.init.prototype.extend(this)}}}();var WordArray=C_lib.WordArray=Base.extend({init:function(words,sigBytes){words=this.words=words||[];if(sigBytes!=undefined){this.sigBytes=sigBytes}else{this.sigBytes=words.length*4}},toString:function(encoder){return(encoder||Hex).stringify(this)},concat:function(wordArray){var thisWords=this.words;var thatWords=wordArray.words;var thisSigBytes=this.sigBytes;var thatSigBytes=wordArray.sigBytes;this.clamp();if(thisSigBytes%4){for(var i=0;i<thatSigBytes;i++){var thatByte=thatWords[i>>>2]>>>24-i%4*8&255;thisWords[thisSigBytes+i>>>2]|=thatByte<<24-(thisSigBytes+i)%4*8}}else if(thatWords.length>256){for(var i=0;i<thatSigBytes;i+=4){thisWords[thisSigBytes+i>>>2]=thatWords[i>>>2]}}else{thisWords.push.apply(thisWords,thatWords)}this.sigBytes+=thatSigBytes;return this},clamp:function(){var words=this.words;var sigBytes=this.sigBytes;words[sigBytes>>>2]&=4294967295<<32-sigBytes%4*8;words.length=Math.ceil(sigBytes/4)},clone:function(){var clone=Base.clone.call(this);clone.words=this.words.slice(0);return clone},random:function(nBytes){var words=[];for(var i=0;i<nBytes;i+=4){words.push(Math.random()*4294967296|0)}return new WordArray.init(words,nBytes)}});var C_enc=C.enc={};var Hex=C_enc.Hex={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var hexChars=[];for(var i=0;i<sigBytes;i++){var bite=words[i>>>2]>>>24-i%4*8&255;hexChars.push((bite>>>4).toString(16));hexChars.push((bite&15).toString(16))}return hexChars.join("")},parse:function(hexStr){var hexStrLength=hexStr.length;var words=[];for(var i=0;i<hexStrLength;i+=2){words[i>>>3]|=parseInt(hexStr.substr(i,2),16)<<24-i%8*4}return new WordArray.init(words,hexStrLength/2)}};var Latin1=C_enc.Latin1={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var latin1Chars=[];for(var i=0;i<sigBytes;i++){var bite=words[i>>>2]>>>24-i%4*8&255;latin1Chars.push(String.fromCharCode(bite))}return latin1Chars.join("")},parse:function(latin1Str){var latin1StrLength=latin1Str.length;var words=[];for(var i=0;i<latin1StrLength;i++){words[i>>>2]|=(latin1Str.charCodeAt(i)&255)<<24-i%4*8}return new WordArray.init(words,latin1StrLength)}};var Utf8=C_enc.Utf8={stringify:function(wordArray){try{return decodeURIComponent(escape(Latin1.stringify(wordArray)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(utf8Str){return Latin1.parse(unescape(encodeURIComponent(utf8Str)))}};var BufferedBlockAlgorithm=C_lib.BufferedBlockAlgorithm=Base.extend({reset:function(){this._data=new WordArray.init;this._nDataBytes=0},_append:function(data){if(typeof data=="string"){data=Utf8.parse(data)}this._data.concat(data);this._nDataBytes+=data.sigBytes},_process:function(doFlush){var data=this._data;var dataWords=data.words;var dataSigBytes=data.sigBytes;var blockSize=this.blockSize;var blockSizeBytes=blockSize*4;var nBlocksReady=dataSigBytes/blockSizeBytes;if(doFlush){nBlocksReady=Math.ceil(nBlocksReady)}else{nBlocksReady=Math.max((nBlocksReady|0)-this._minBufferSize,0)}var nWordsReady=nBlocksReady*blockSize;var nBytesReady=Math.min(nWordsReady*4,dataSigBytes);if(nWordsReady){for(var offset=0;offset<nWordsReady;offset+=blockSize){this._doProcessBlock(dataWords,offset)}var processedWords=dataWords.splice(0,nWordsReady);data.sigBytes-=nBytesReady}return new WordArray.init(processedWords,nBytesReady)},clone:function(){var clone=Base.clone.call(this);clone._data=this._data.clone();return clone},_minBufferSize:0});var Hasher=C_lib.Hasher=BufferedBlockAlgorithm.extend({cfg:Base.extend(),init:function(cfg){this.cfg=this.cfg.extend(cfg);this.reset()},reset:function(){BufferedBlockAlgorithm.reset.call(this);this._doReset()},update:function(messageUpdate){this._append(messageUpdate);this._process();return this},finalize:function(messageUpdate){if(messageUpdate){this._append(messageUpdate)}var hash=this._doFinalize();return hash},blockSize:512/32,_createHelper:function(hasher){return function(message,cfg){return new hasher.init(cfg).finalize(message)}},_createHmacHelper:function(hasher){return function(message,key){return new C_algo.HMAC.init(hasher,key).finalize(message)}}});var C_algo=C.algo={};return C}(Math);return CryptoJS})},{}],21:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var C_enc=C.enc;var Base64=C_enc.Base64={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var map=this._map;wordArray.clamp();var base64Chars=[];for(var i=0;i<sigBytes;i+=3){var byte1=words[i>>>2]>>>24-i%4*8&255;var byte2=words[i+1>>>2]>>>24-(i+1)%4*8&255;var byte3=words[i+2>>>2]>>>24-(i+2)%4*8&255;var triplet=byte1<<16|byte2<<8|byte3;for(var j=0;j<4&&i+j*.75<sigBytes;j++){base64Chars.push(map.charAt(triplet>>>6*(3-j)&63))}}var paddingChar=map.charAt(64);if(paddingChar){while(base64Chars.length%4){base64Chars.push(paddingChar)}}return base64Chars.join("")},parse:function(base64Str){var base64StrLength=base64Str.length;var map=this._map;var paddingChar=map.charAt(64);if(paddingChar){var paddingIndex=base64Str.indexOf(paddingChar);if(paddingIndex!=-1){base64StrLength=paddingIndex}}var words=[];var nBytes=0;for(var i=0;i<base64StrLength;i++){if(i%4){var bits1=map.indexOf(base64Str.charAt(i-1))<<i%4*2;var bits2=map.indexOf(base64Str.charAt(i))>>>6-i%4*2;words[nBytes>>>2]|=(bits1|bits2)<<24-nBytes%4*8;nBytes++}}return WordArray.create(words,nBytes)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();return CryptoJS.enc.Base64})},{"./core":20}],22:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var C_enc=C.enc;var Utf16BE=C_enc.Utf16=C_enc.Utf16BE={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var utf16Chars=[];for(var i=0;i<sigBytes;i+=2){var codePoint=words[i>>>2]>>>16-i%4*8&65535;utf16Chars.push(String.fromCharCode(codePoint))}return utf16Chars.join("")},parse:function(utf16Str){var utf16StrLength=utf16Str.length;var words=[];for(var i=0;i<utf16StrLength;i++){words[i>>>1]|=utf16Str.charCodeAt(i)<<16-i%2*16}return WordArray.create(words,utf16StrLength*2)}};C_enc.Utf16LE={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var utf16Chars=[];for(var i=0;i<sigBytes;i+=2){var codePoint=swapEndian(words[i>>>2]>>>16-i%4*8&65535);utf16Chars.push(String.fromCharCode(codePoint))}return utf16Chars.join("")},parse:function(utf16Str){var utf16StrLength=utf16Str.length;var words=[];for(var i=0;i<utf16StrLength;i++){words[i>>>1]|=swapEndian(utf16Str.charCodeAt(i)<<16-i%2*16)}return WordArray.create(words,utf16StrLength*2)}};function swapEndian(word){return word<<8&4278255360|word>>>8&16711935}})();return CryptoJS.enc.Utf16})},{"./core":20}],23:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./sha1"),_dereq_("./hmac"))}else if(typeof define==="function"&&define.amd){define(["./core","./sha1","./hmac"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var WordArray=C_lib.WordArray;var C_algo=C.algo;var MD5=C_algo.MD5;var EvpKDF=C_algo.EvpKDF=Base.extend({cfg:Base.extend({keySize:128/32,hasher:MD5,iterations:1}),init:function(cfg){this.cfg=this.cfg.extend(cfg)},compute:function(password,salt){var cfg=this.cfg;var hasher=cfg.hasher.create();var derivedKey=WordArray.create();var derivedKeyWords=derivedKey.words;var keySize=cfg.keySize;var iterations=cfg.iterations;while(derivedKeyWords.length<keySize){if(block){hasher.update(block)}var block=hasher.update(password).finalize(salt);hasher.reset();for(var i=1;i<iterations;i++){block=hasher.finalize(block);hasher.reset()}derivedKey.concat(block)}derivedKey.sigBytes=keySize*4;return derivedKey}});C.EvpKDF=function(password,salt,cfg){return EvpKDF.create(cfg).compute(password,salt)}})();return CryptoJS.EvpKDF})},{"./core":20,"./hmac":26,"./sha1":45}],24:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(undefined){var C=CryptoJS;var C_lib=C.lib;var CipherParams=C_lib.CipherParams;var C_enc=C.enc;var Hex=C_enc.Hex;var C_format=C.format;var HexFormatter=C_format.Hex={stringify:function(cipherParams){return cipherParams.ciphertext.toString(Hex)},parse:function(input){var ciphertext=Hex.parse(input);return CipherParams.create({ciphertext:ciphertext})}}})();return CryptoJS.format.Hex})},{"./cipher-core":19,"./core":20}],25:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./sha256"),_dereq_("./hmac"))}else if(typeof define==="function"&&define.amd){define(["./core","./sha256","./hmac"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){return CryptoJS.HmacSHA256})},{"./core":20,"./hmac":26,"./sha256":47}],26:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var C_enc=C.enc;var Utf8=C_enc.Utf8;var C_algo=C.algo;var HMAC=C_algo.HMAC=Base.extend({init:function(hasher,key){hasher=this._hasher=new hasher.init;if(typeof key=="string"){key=Utf8.parse(key)}var hasherBlockSize=hasher.blockSize;var hasherBlockSizeBytes=hasherBlockSize*4;if(key.sigBytes>hasherBlockSizeBytes){key=hasher.finalize(key)}key.clamp();var oKey=this._oKey=key.clone();var iKey=this._iKey=key.clone();var oKeyWords=oKey.words;var iKeyWords=iKey.words;for(var i=0;i<hasherBlockSize;i++){oKeyWords[i]^=1549556828;iKeyWords[i]^=909522486}oKey.sigBytes=iKey.sigBytes=hasherBlockSizeBytes;this.reset()},reset:function(){var hasher=this._hasher;hasher.reset();hasher.update(this._iKey)},update:function(messageUpdate){this._hasher.update(messageUpdate);return this},finalize:function(messageUpdate){var hasher=this._hasher;var innerHash=hasher.finalize(messageUpdate);hasher.reset();var hmac=hasher.finalize(this._oKey.clone().concat(innerHash));return hmac}})})()})},{"./core":20}],27:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./x64-core"),_dereq_("./lib-typedarrays"),_dereq_("./enc-utf16"),_dereq_("./enc-base64"),_dereq_("./md5"),_dereq_("./sha1"),_dereq_("./sha256"),_dereq_("./sha224"),_dereq_("./sha512"),_dereq_("./sha384"),_dereq_("./sha3"),_dereq_("./ripemd160"),_dereq_("./hmac"),_dereq_("./pbkdf2"),_dereq_("./evpkdf"),_dereq_("./cipher-core"),_dereq_("./mode-cfb"),_dereq_("./mode-ctr"),_dereq_("./mode-ctr-gladman"),_dereq_("./mode-ofb"),_dereq_("./mode-ecb"),_dereq_("./pad-ansix923"),_dereq_("./pad-iso10126"),_dereq_("./pad-iso97971"),_dereq_("./pad-zeropadding"),_dereq_("./pad-nopadding"),_dereq_("./format-hex"),_dereq_("./aes"),_dereq_("./tripledes"),_dereq_("./rc4"),_dereq_("./rabbit"),_dereq_("./rabbit-legacy"))}else if(typeof define==="function"&&define.amd){define(["./core","./x64-core","./lib-typedarrays","./enc-utf16","./enc-base64","./md5","./sha1","./sha256","./sha224","./sha512","./sha384","./sha3","./ripemd160","./hmac","./pbkdf2","./evpkdf","./cipher-core","./mode-cfb","./mode-ctr","./mode-ctr-gladman","./mode-ofb","./mode-ecb","./pad-ansix923","./pad-iso10126","./pad-iso97971","./pad-zeropadding","./pad-nopadding","./format-hex","./aes","./tripledes","./rc4","./rabbit","./rabbit-legacy"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){return CryptoJS})},{"./aes":18,"./cipher-core":19,"./core":20,"./enc-base64":21,"./enc-utf16":22,"./evpkdf":23,"./format-hex":24,"./hmac":26,"./lib-typedarrays":28,"./md5":29,"./mode-cfb":30,"./mode-ctr":32,"./mode-ctr-gladman":31,"./mode-ecb":33,"./mode-ofb":34,"./pad-ansix923":35,"./pad-iso10126":36,"./pad-iso97971":37,"./pad-nopadding":38,"./pad-zeropadding":39,"./pbkdf2":40,"./rabbit":42,"./rabbit-legacy":41,"./rc4":43,"./ripemd160":44,"./sha1":45,"./sha224":46,"./sha256":47,"./sha3":48,"./sha384":49,"./sha512":50,"./tripledes":51,"./x64-core":52}],28:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){if(typeof ArrayBuffer!="function"){return}var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var superInit=WordArray.init;var subInit=WordArray.init=function(typedArray){if(typedArray instanceof ArrayBuffer){typedArray=new Uint8Array(typedArray)}if(typedArray instanceof Int8Array||typedArray instanceof Uint8ClampedArray||typedArray instanceof Int16Array||typedArray instanceof Uint16Array||typedArray instanceof Int32Array||typedArray instanceof Uint32Array||typedArray instanceof Float32Array||typedArray instanceof Float64Array){typedArray=new Uint8Array(typedArray.buffer,typedArray.byteOffset,typedArray.byteLength)}if(typedArray instanceof Uint8Array){var typedArrayByteLength=typedArray.byteLength;var words=[];for(var i=0;i<typedArrayByteLength;i++){words[i>>>2]|=typedArray[i]<<24-i%4*8}superInit.call(this,words,typedArrayByteLength)}else{superInit.apply(this,arguments)}};subInit.prototype=WordArray})();return CryptoJS.lib.WordArray})},{"./core":20}],29:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var T=[];(function(){for(var i=0;i<64;i++){T[i]=Math.abs(Math.sin(i+1))*4294967296|0}})();var MD5=C_algo.MD5=Hasher.extend({_doReset:function(){this._hash=new WordArray.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(M,offset){for(var i=0;i<16;i++){var offset_i=offset+i;var M_offset_i=M[offset_i];M[offset_i]=(M_offset_i<<8|M_offset_i>>>24)&16711935|(M_offset_i<<24|M_offset_i>>>8)&4278255360}var H=this._hash.words;var M_offset_0=M[offset+0];var M_offset_1=M[offset+1];var M_offset_2=M[offset+2];var M_offset_3=M[offset+3];var M_offset_4=M[offset+4];var M_offset_5=M[offset+5];var M_offset_6=M[offset+6];var M_offset_7=M[offset+7];var M_offset_8=M[offset+8];var M_offset_9=M[offset+9];var M_offset_10=M[offset+10];var M_offset_11=M[offset+11];var M_offset_12=M[offset+12];var M_offset_13=M[offset+13];var M_offset_14=M[offset+14];var M_offset_15=M[offset+15];var a=H[0];var b=H[1];var c=H[2];var d=H[3];a=FF(a,b,c,d,M_offset_0,7,T[0]);d=FF(d,a,b,c,M_offset_1,12,T[1]);c=FF(c,d,a,b,M_offset_2,17,T[2]);b=FF(b,c,d,a,M_offset_3,22,T[3]);a=FF(a,b,c,d,M_offset_4,7,T[4]);d=FF(d,a,b,c,M_offset_5,12,T[5]);c=FF(c,d,a,b,M_offset_6,17,T[6]);b=FF(b,c,d,a,M_offset_7,22,T[7]);a=FF(a,b,c,d,M_offset_8,7,T[8]);d=FF(d,a,b,c,M_offset_9,12,T[9]);c=FF(c,d,a,b,M_offset_10,17,T[10]);b=FF(b,c,d,a,M_offset_11,22,T[11]);a=FF(a,b,c,d,M_offset_12,7,T[12]);d=FF(d,a,b,c,M_offset_13,12,T[13]);c=FF(c,d,a,b,M_offset_14,17,T[14]);b=FF(b,c,d,a,M_offset_15,22,T[15]);a=GG(a,b,c,d,M_offset_1,5,T[16]);d=GG(d,a,b,c,M_offset_6,9,T[17]);c=GG(c,d,a,b,M_offset_11,14,T[18]);b=GG(b,c,d,a,M_offset_0,20,T[19]);a=GG(a,b,c,d,M_offset_5,5,T[20]);d=GG(d,a,b,c,M_offset_10,9,T[21]);c=GG(c,d,a,b,M_offset_15,14,T[22]);b=GG(b,c,d,a,M_offset_4,20,T[23]);a=GG(a,b,c,d,M_offset_9,5,T[24]);d=GG(d,a,b,c,M_offset_14,9,T[25]);c=GG(c,d,a,b,M_offset_3,14,T[26]);b=GG(b,c,d,a,M_offset_8,20,T[27]);a=GG(a,b,c,d,M_offset_13,5,T[28]);d=GG(d,a,b,c,M_offset_2,9,T[29]);c=GG(c,d,a,b,M_offset_7,14,T[30]);b=GG(b,c,d,a,M_offset_12,20,T[31]);a=HH(a,b,c,d,M_offset_5,4,T[32]);d=HH(d,a,b,c,M_offset_8,11,T[33]);c=HH(c,d,a,b,M_offset_11,16,T[34]);b=HH(b,c,d,a,M_offset_14,23,T[35]);a=HH(a,b,c,d,M_offset_1,4,T[36]);d=HH(d,a,b,c,M_offset_4,11,T[37]);c=HH(c,d,a,b,M_offset_7,16,T[38]);b=HH(b,c,d,a,M_offset_10,23,T[39]);a=HH(a,b,c,d,M_offset_13,4,T[40]);d=HH(d,a,b,c,M_offset_0,11,T[41]);c=HH(c,d,a,b,M_offset_3,16,T[42]);b=HH(b,c,d,a,M_offset_6,23,T[43]);a=HH(a,b,c,d,M_offset_9,4,T[44]);d=HH(d,a,b,c,M_offset_12,11,T[45]);c=HH(c,d,a,b,M_offset_15,16,T[46]);b=HH(b,c,d,a,M_offset_2,23,T[47]);a=II(a,b,c,d,M_offset_0,6,T[48]);d=II(d,a,b,c,M_offset_7,10,T[49]);c=II(c,d,a,b,M_offset_14,15,T[50]);b=II(b,c,d,a,M_offset_5,21,T[51]);a=II(a,b,c,d,M_offset_12,6,T[52]);d=II(d,a,b,c,M_offset_3,10,T[53]);c=II(c,d,a,b,M_offset_10,15,T[54]);b=II(b,c,d,a,M_offset_1,21,T[55]);a=II(a,b,c,d,M_offset_8,6,T[56]);d=II(d,a,b,c,M_offset_15,10,T[57]);c=II(c,d,a,b,M_offset_6,15,T[58]);b=II(b,c,d,a,M_offset_13,21,T[59]);a=II(a,b,c,d,M_offset_4,6,T[60]);d=II(d,a,b,c,M_offset_11,10,T[61]);c=II(c,d,a,b,M_offset_2,15,T[62]);b=II(b,c,d,a,M_offset_9,21,T[63]);H[0]=H[0]+a|0;H[1]=H[1]+b|0;H[2]=H[2]+c|0;H[3]=H[3]+d|0},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=128<<24-nBitsLeft%32;var nBitsTotalH=Math.floor(nBitsTotal/4294967296);var nBitsTotalL=nBitsTotal;dataWords[(nBitsLeft+64>>>9<<4)+15]=(nBitsTotalH<<8|nBitsTotalH>>>24)&16711935|(nBitsTotalH<<24|nBitsTotalH>>>8)&4278255360;dataWords[(nBitsLeft+64>>>9<<4)+14]=(nBitsTotalL<<8|nBitsTotalL>>>24)&16711935|(nBitsTotalL<<24|nBitsTotalL>>>8)&4278255360;data.sigBytes=(dataWords.length+1)*4;this._process();var hash=this._hash;var H=hash.words;for(var i=0;i<4;i++){var H_i=H[i];H[i]=(H_i<<8|H_i>>>24)&16711935|(H_i<<24|H_i>>>8)&4278255360}return hash},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone}});function FF(a,b,c,d,x,s,t){var n=a+(b&c|~b&d)+x+t;return(n<<s|n>>>32-s)+b}function GG(a,b,c,d,x,s,t){var n=a+(b&d|c&~d)+x+t;return(n<<s|n>>>32-s)+b}function HH(a,b,c,d,x,s,t){var n=a+(b^c^d)+x+t;return(n<<s|n>>>32-s)+b}function II(a,b,c,d,x,s,t){var n=a+(c^(b|~d))+x+t;return(n<<s|n>>>32-s)+b}C.MD5=Hasher._createHelper(MD5);C.HmacMD5=Hasher._createHmacHelper(MD5)})(Math);return CryptoJS.MD5})},{"./core":20}],30:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.mode.CFB=function(){var CFB=CryptoJS.lib.BlockCipherMode.extend();CFB.Encryptor=CFB.extend({processBlock:function(words,offset){var cipher=this._cipher;var blockSize=cipher.blockSize;generateKeystreamAndEncrypt.call(this,words,offset,blockSize,cipher);this._prevBlock=words.slice(offset,offset+blockSize)}});CFB.Decryptor=CFB.extend({processBlock:function(words,offset){var cipher=this._cipher;var blockSize=cipher.blockSize;var thisBlock=words.slice(offset,offset+blockSize);generateKeystreamAndEncrypt.call(this,words,offset,blockSize,cipher);this._prevBlock=thisBlock}});function generateKeystreamAndEncrypt(words,offset,blockSize,cipher){var iv=this._iv;if(iv){var keystream=iv.slice(0);this._iv=undefined}else{var keystream=this._prevBlock}cipher.encryptBlock(keystream,0);for(var i=0;i<blockSize;i++){words[offset+i]^=keystream[i]}}return CFB}();return CryptoJS.mode.CFB})},{"./cipher-core":19,"./core":20}],31:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.mode.CTRGladman=function(){var CTRGladman=CryptoJS.lib.BlockCipherMode.extend();function incWord(word){if((word>>24&255)===255){var b1=word>>16&255;var b2=word>>8&255;var b3=word&255;if(b1===255){b1=0;if(b2===255){b2=0;if(b3===255){b3=0}else{++b3}}else{++b2}}else{++b1}word=0;word+=b1<<16;word+=b2<<8;word+=b3}else{word+=1<<24}return word}function incCounter(counter){if((counter[0]=incWord(counter[0]))===0){counter[1]=incWord(counter[1])}return counter}var Encryptor=CTRGladman.Encryptor=CTRGladman.extend({processBlock:function(words,offset){var cipher=this._cipher;var blockSize=cipher.blockSize;var iv=this._iv;var counter=this._counter;if(iv){counter=this._counter=iv.slice(0);this._iv=undefined}incCounter(counter);var keystream=counter.slice(0);cipher.encryptBlock(keystream,0);for(var i=0;i<blockSize;i++){words[offset+i]^=keystream[i]}}});CTRGladman.Decryptor=Encryptor;return CTRGladman}();return CryptoJS.mode.CTRGladman})},{"./cipher-core":19,"./core":20}],32:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.mode.CTR=function(){var CTR=CryptoJS.lib.BlockCipherMode.extend();var Encryptor=CTR.Encryptor=CTR.extend({processBlock:function(words,offset){var cipher=this._cipher;var blockSize=cipher.blockSize;var iv=this._iv;var counter=this._counter;if(iv){counter=this._counter=iv.slice(0);this._iv=undefined}var keystream=counter.slice(0);cipher.encryptBlock(keystream,0);counter[blockSize-1]=counter[blockSize-1]+1|0;for(var i=0;i<blockSize;i++){words[offset+i]^=keystream[i]}}});CTR.Decryptor=Encryptor;return CTR}();return CryptoJS.mode.CTR})},{"./cipher-core":19,"./core":20}],33:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.mode.ECB=function(){var ECB=CryptoJS.lib.BlockCipherMode.extend();ECB.Encryptor=ECB.extend({processBlock:function(words,offset){this._cipher.encryptBlock(words,offset)}});ECB.Decryptor=ECB.extend({processBlock:function(words,offset){this._cipher.decryptBlock(words,offset)}});return ECB}();return CryptoJS.mode.ECB})},{"./cipher-core":19,"./core":20}],34:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.mode.OFB=function(){var OFB=CryptoJS.lib.BlockCipherMode.extend();var Encryptor=OFB.Encryptor=OFB.extend({processBlock:function(words,offset){var cipher=this._cipher;var blockSize=cipher.blockSize;var iv=this._iv;var keystream=this._keystream;if(iv){keystream=this._keystream=iv.slice(0);this._iv=undefined}cipher.encryptBlock(keystream,0);for(var i=0;i<blockSize;i++){words[offset+i]^=keystream[i]}}});OFB.Decryptor=Encryptor;return OFB}();return CryptoJS.mode.OFB})},{"./cipher-core":19,"./core":20}],35:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.pad.AnsiX923={pad:function(data,blockSize){var dataSigBytes=data.sigBytes;var blockSizeBytes=blockSize*4;var nPaddingBytes=blockSizeBytes-dataSigBytes%blockSizeBytes;var lastBytePos=dataSigBytes+nPaddingBytes-1;data.clamp();data.words[lastBytePos>>>2]|=nPaddingBytes<<24-lastBytePos%4*8;data.sigBytes+=nPaddingBytes},unpad:function(data){var nPaddingBytes=data.words[data.sigBytes-1>>>2]&255;data.sigBytes-=nPaddingBytes}};return CryptoJS.pad.Ansix923})},{"./cipher-core":19,"./core":20}],36:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.pad.Iso10126={pad:function(data,blockSize){var blockSizeBytes=blockSize*4;var nPaddingBytes=blockSizeBytes-data.sigBytes%blockSizeBytes;data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes-1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes<<24],1))},unpad:function(data){var nPaddingBytes=data.words[data.sigBytes-1>>>2]&255;data.sigBytes-=nPaddingBytes}};return CryptoJS.pad.Iso10126})},{"./cipher-core":19,"./core":20}],37:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.pad.Iso97971={pad:function(data,blockSize){data.concat(CryptoJS.lib.WordArray.create([2147483648],1));CryptoJS.pad.ZeroPadding.pad(data,blockSize)},unpad:function(data){CryptoJS.pad.ZeroPadding.unpad(data);data.sigBytes--}};return CryptoJS.pad.Iso97971})},{"./cipher-core":19,"./core":20}],38:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.pad.NoPadding={pad:function(){},unpad:function(){}};return CryptoJS.pad.NoPadding})},{"./cipher-core":19,"./core":20}],39:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){CryptoJS.pad.ZeroPadding={pad:function(data,blockSize){var blockSizeBytes=blockSize*4;data.clamp();data.sigBytes+=blockSizeBytes-(data.sigBytes%blockSizeBytes||blockSizeBytes)},unpad:function(data){var dataWords=data.words;var i=data.sigBytes-1;while(!(dataWords[i>>>2]>>>24-i%4*8&255)){i--}data.sigBytes=i+1}};return CryptoJS.pad.ZeroPadding})},{"./cipher-core":19,"./core":20}],40:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./sha1"),_dereq_("./hmac"))}else if(typeof define==="function"&&define.amd){define(["./core","./sha1","./hmac"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var WordArray=C_lib.WordArray;var C_algo=C.algo;var SHA1=C_algo.SHA1;var HMAC=C_algo.HMAC;var PBKDF2=C_algo.PBKDF2=Base.extend({cfg:Base.extend({keySize:128/32,hasher:SHA1,iterations:1}),init:function(cfg){this.cfg=this.cfg.extend(cfg)},compute:function(password,salt){var cfg=this.cfg;var hmac=HMAC.create(cfg.hasher,password);var derivedKey=WordArray.create();var blockIndex=WordArray.create([1]);var derivedKeyWords=derivedKey.words;var blockIndexWords=blockIndex.words;var keySize=cfg.keySize;var iterations=cfg.iterations;while(derivedKeyWords.length<keySize){var block=hmac.update(salt).finalize(blockIndex);hmac.reset();var blockWords=block.words;var blockWordsLength=blockWords.length;var intermediate=block;for(var i=1;i<iterations;i++){intermediate=hmac.finalize(intermediate);hmac.reset();var intermediateWords=intermediate.words;for(var j=0;j<blockWordsLength;j++){blockWords[j]^=intermediateWords[j]}}derivedKey.concat(block);blockIndexWords[0]++}derivedKey.sigBytes=keySize*4;return derivedKey}});C.PBKDF2=function(password,salt,cfg){return PBKDF2.create(cfg).compute(password,salt)}})();return CryptoJS.PBKDF2})},{"./core":20,"./hmac":26,"./sha1":45}],41:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./enc-base64"),_dereq_("./md5"),_dereq_("./evpkdf"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var StreamCipher=C_lib.StreamCipher;var C_algo=C.algo;var S=[];var C_=[];var G=[];var RabbitLegacy=C_algo.RabbitLegacy=StreamCipher.extend({_doReset:function(){var K=this._key.words;var iv=this.cfg.iv;var X=this._X=[K[0],K[3]<<16|K[2]>>>16,K[1],K[0]<<16|K[3]>>>16,K[2],K[1]<<16|K[0]>>>16,K[3],K[2]<<16|K[1]>>>16];var C=this._C=[K[2]<<16|K[2]>>>16,K[0]&4294901760|K[1]&65535,K[3]<<16|K[3]>>>16,K[1]&4294901760|K[2]&65535,K[0]<<16|K[0]>>>16,K[2]&4294901760|K[3]&65535,K[1]<<16|K[1]>>>16,K[3]&4294901760|K[0]&65535];this._b=0;for(var i=0;i<4;i++){nextState.call(this)}for(var i=0;i<8;i++){C[i]^=X[i+4&7]}if(iv){var IV=iv.words;var IV_0=IV[0];var IV_1=IV[1];var i0=(IV_0<<8|IV_0>>>24)&16711935|(IV_0<<24|IV_0>>>8)&4278255360;var i2=(IV_1<<8|IV_1>>>24)&16711935|(IV_1<<24|IV_1>>>8)&4278255360;var i1=i0>>>16|i2&4294901760;var i3=i2<<16|i0&65535;C[0]^=i0;C[1]^=i1;C[2]^=i2;C[3]^=i3;C[4]^=i0;C[5]^=i1;C[6]^=i2;C[7]^=i3;for(var i=0;i<4;i++){nextState.call(this)}}},_doProcessBlock:function(M,offset){var X=this._X;nextState.call(this);S[0]=X[0]^X[5]>>>16^X[3]<<16;S[1]=X[2]^X[7]>>>16^X[5]<<16;S[2]=X[4]^X[1]>>>16^X[7]<<16;S[3]=X[6]^X[3]>>>16^X[1]<<16;for(var i=0;i<4;i++){S[i]=(S[i]<<8|S[i]>>>24)&16711935|(S[i]<<24|S[i]>>>8)&4278255360;M[offset+i]^=S[i]}},blockSize:128/32,ivSize:64/32});
function nextState(){var X=this._X;var C=this._C;for(var i=0;i<8;i++){C_[i]=C[i]}C[0]=C[0]+1295307597+this._b|0;C[1]=C[1]+3545052371+(C[0]>>>0<C_[0]>>>0?1:0)|0;C[2]=C[2]+886263092+(C[1]>>>0<C_[1]>>>0?1:0)|0;C[3]=C[3]+1295307597+(C[2]>>>0<C_[2]>>>0?1:0)|0;C[4]=C[4]+3545052371+(C[3]>>>0<C_[3]>>>0?1:0)|0;C[5]=C[5]+886263092+(C[4]>>>0<C_[4]>>>0?1:0)|0;C[6]=C[6]+1295307597+(C[5]>>>0<C_[5]>>>0?1:0)|0;C[7]=C[7]+3545052371+(C[6]>>>0<C_[6]>>>0?1:0)|0;this._b=C[7]>>>0<C_[7]>>>0?1:0;for(var i=0;i<8;i++){var gx=X[i]+C[i];var ga=gx&65535;var gb=gx>>>16;var gh=((ga*ga>>>17)+ga*gb>>>15)+gb*gb;var gl=((gx&4294901760)*gx|0)+((gx&65535)*gx|0);G[i]=gh^gl}X[0]=G[0]+(G[7]<<16|G[7]>>>16)+(G[6]<<16|G[6]>>>16)|0;X[1]=G[1]+(G[0]<<8|G[0]>>>24)+G[7]|0;X[2]=G[2]+(G[1]<<16|G[1]>>>16)+(G[0]<<16|G[0]>>>16)|0;X[3]=G[3]+(G[2]<<8|G[2]>>>24)+G[1]|0;X[4]=G[4]+(G[3]<<16|G[3]>>>16)+(G[2]<<16|G[2]>>>16)|0;X[5]=G[5]+(G[4]<<8|G[4]>>>24)+G[3]|0;X[6]=G[6]+(G[5]<<16|G[5]>>>16)+(G[4]<<16|G[4]>>>16)|0;X[7]=G[7]+(G[6]<<8|G[6]>>>24)+G[5]|0}C.RabbitLegacy=StreamCipher._createHelper(RabbitLegacy)})();return CryptoJS.RabbitLegacy})},{"./cipher-core":19,"./core":20,"./enc-base64":21,"./evpkdf":23,"./md5":29}],42:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./enc-base64"),_dereq_("./md5"),_dereq_("./evpkdf"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var StreamCipher=C_lib.StreamCipher;var C_algo=C.algo;var S=[];var C_=[];var G=[];var Rabbit=C_algo.Rabbit=StreamCipher.extend({_doReset:function(){var K=this._key.words;var iv=this.cfg.iv;for(var i=0;i<4;i++){K[i]=(K[i]<<8|K[i]>>>24)&16711935|(K[i]<<24|K[i]>>>8)&4278255360}var X=this._X=[K[0],K[3]<<16|K[2]>>>16,K[1],K[0]<<16|K[3]>>>16,K[2],K[1]<<16|K[0]>>>16,K[3],K[2]<<16|K[1]>>>16];var C=this._C=[K[2]<<16|K[2]>>>16,K[0]&4294901760|K[1]&65535,K[3]<<16|K[3]>>>16,K[1]&4294901760|K[2]&65535,K[0]<<16|K[0]>>>16,K[2]&4294901760|K[3]&65535,K[1]<<16|K[1]>>>16,K[3]&4294901760|K[0]&65535];this._b=0;for(var i=0;i<4;i++){nextState.call(this)}for(var i=0;i<8;i++){C[i]^=X[i+4&7]}if(iv){var IV=iv.words;var IV_0=IV[0];var IV_1=IV[1];var i0=(IV_0<<8|IV_0>>>24)&16711935|(IV_0<<24|IV_0>>>8)&4278255360;var i2=(IV_1<<8|IV_1>>>24)&16711935|(IV_1<<24|IV_1>>>8)&4278255360;var i1=i0>>>16|i2&4294901760;var i3=i2<<16|i0&65535;C[0]^=i0;C[1]^=i1;C[2]^=i2;C[3]^=i3;C[4]^=i0;C[5]^=i1;C[6]^=i2;C[7]^=i3;for(var i=0;i<4;i++){nextState.call(this)}}},_doProcessBlock:function(M,offset){var X=this._X;nextState.call(this);S[0]=X[0]^X[5]>>>16^X[3]<<16;S[1]=X[2]^X[7]>>>16^X[5]<<16;S[2]=X[4]^X[1]>>>16^X[7]<<16;S[3]=X[6]^X[3]>>>16^X[1]<<16;for(var i=0;i<4;i++){S[i]=(S[i]<<8|S[i]>>>24)&16711935|(S[i]<<24|S[i]>>>8)&4278255360;M[offset+i]^=S[i]}},blockSize:128/32,ivSize:64/32});function nextState(){var X=this._X;var C=this._C;for(var i=0;i<8;i++){C_[i]=C[i]}C[0]=C[0]+1295307597+this._b|0;C[1]=C[1]+3545052371+(C[0]>>>0<C_[0]>>>0?1:0)|0;C[2]=C[2]+886263092+(C[1]>>>0<C_[1]>>>0?1:0)|0;C[3]=C[3]+1295307597+(C[2]>>>0<C_[2]>>>0?1:0)|0;C[4]=C[4]+3545052371+(C[3]>>>0<C_[3]>>>0?1:0)|0;C[5]=C[5]+886263092+(C[4]>>>0<C_[4]>>>0?1:0)|0;C[6]=C[6]+1295307597+(C[5]>>>0<C_[5]>>>0?1:0)|0;C[7]=C[7]+3545052371+(C[6]>>>0<C_[6]>>>0?1:0)|0;this._b=C[7]>>>0<C_[7]>>>0?1:0;for(var i=0;i<8;i++){var gx=X[i]+C[i];var ga=gx&65535;var gb=gx>>>16;var gh=((ga*ga>>>17)+ga*gb>>>15)+gb*gb;var gl=((gx&4294901760)*gx|0)+((gx&65535)*gx|0);G[i]=gh^gl}X[0]=G[0]+(G[7]<<16|G[7]>>>16)+(G[6]<<16|G[6]>>>16)|0;X[1]=G[1]+(G[0]<<8|G[0]>>>24)+G[7]|0;X[2]=G[2]+(G[1]<<16|G[1]>>>16)+(G[0]<<16|G[0]>>>16)|0;X[3]=G[3]+(G[2]<<8|G[2]>>>24)+G[1]|0;X[4]=G[4]+(G[3]<<16|G[3]>>>16)+(G[2]<<16|G[2]>>>16)|0;X[5]=G[5]+(G[4]<<8|G[4]>>>24)+G[3]|0;X[6]=G[6]+(G[5]<<16|G[5]>>>16)+(G[4]<<16|G[4]>>>16)|0;X[7]=G[7]+(G[6]<<8|G[6]>>>24)+G[5]|0}C.Rabbit=StreamCipher._createHelper(Rabbit)})();return CryptoJS.Rabbit})},{"./cipher-core":19,"./core":20,"./enc-base64":21,"./evpkdf":23,"./md5":29}],43:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./enc-base64"),_dereq_("./md5"),_dereq_("./evpkdf"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var StreamCipher=C_lib.StreamCipher;var C_algo=C.algo;var RC4=C_algo.RC4=StreamCipher.extend({_doReset:function(){var key=this._key;var keyWords=key.words;var keySigBytes=key.sigBytes;var S=this._S=[];for(var i=0;i<256;i++){S[i]=i}for(var i=0,j=0;i<256;i++){var keyByteIndex=i%keySigBytes;var keyByte=keyWords[keyByteIndex>>>2]>>>24-keyByteIndex%4*8&255;j=(j+S[i]+keyByte)%256;var t=S[i];S[i]=S[j];S[j]=t}this._i=this._j=0},_doProcessBlock:function(M,offset){M[offset]^=generateKeystreamWord.call(this)},keySize:256/32,ivSize:0});function generateKeystreamWord(){var S=this._S;var i=this._i;var j=this._j;var keystreamWord=0;for(var n=0;n<4;n++){i=(i+1)%256;j=(j+S[i])%256;var t=S[i];S[i]=S[j];S[j]=t;keystreamWord|=S[(S[i]+S[j])%256]<<24-n*8}this._i=i;this._j=j;return keystreamWord}C.RC4=StreamCipher._createHelper(RC4);var RC4Drop=C_algo.RC4Drop=RC4.extend({cfg:RC4.cfg.extend({drop:192}),_doReset:function(){RC4._doReset.call(this);for(var i=this.cfg.drop;i>0;i--){generateKeystreamWord.call(this)}}});C.RC4Drop=StreamCipher._createHelper(RC4Drop)})();return CryptoJS.RC4})},{"./cipher-core":19,"./core":20,"./enc-base64":21,"./evpkdf":23,"./md5":29}],44:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var _zl=WordArray.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]);var _zr=WordArray.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]);var _sl=WordArray.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]);var _sr=WordArray.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]);var _hl=WordArray.create([0,1518500249,1859775393,2400959708,2840853838]);var _hr=WordArray.create([1352829926,1548603684,1836072691,2053994217,0]);var RIPEMD160=C_algo.RIPEMD160=Hasher.extend({_doReset:function(){this._hash=WordArray.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(M,offset){for(var i=0;i<16;i++){var offset_i=offset+i;var M_offset_i=M[offset_i];M[offset_i]=(M_offset_i<<8|M_offset_i>>>24)&16711935|(M_offset_i<<24|M_offset_i>>>8)&4278255360}var H=this._hash.words;var hl=_hl.words;var hr=_hr.words;var zl=_zl.words;var zr=_zr.words;var sl=_sl.words;var sr=_sr.words;var al,bl,cl,dl,el;var ar,br,cr,dr,er;ar=al=H[0];br=bl=H[1];cr=cl=H[2];dr=dl=H[3];er=el=H[4];var t;for(var i=0;i<80;i+=1){t=al+M[offset+zl[i]]|0;if(i<16){t+=f1(bl,cl,dl)+hl[0]}else if(i<32){t+=f2(bl,cl,dl)+hl[1]}else if(i<48){t+=f3(bl,cl,dl)+hl[2]}else if(i<64){t+=f4(bl,cl,dl)+hl[3]}else{t+=f5(bl,cl,dl)+hl[4]}t=t|0;t=rotl(t,sl[i]);t=t+el|0;al=el;el=dl;dl=rotl(cl,10);cl=bl;bl=t;t=ar+M[offset+zr[i]]|0;if(i<16){t+=f5(br,cr,dr)+hr[0]}else if(i<32){t+=f4(br,cr,dr)+hr[1]}else if(i<48){t+=f3(br,cr,dr)+hr[2]}else if(i<64){t+=f2(br,cr,dr)+hr[3]}else{t+=f1(br,cr,dr)+hr[4]}t=t|0;t=rotl(t,sr[i]);t=t+er|0;ar=er;er=dr;dr=rotl(cr,10);cr=br;br=t}t=H[1]+cl+dr|0;H[1]=H[2]+dl+er|0;H[2]=H[3]+el+ar|0;H[3]=H[4]+al+br|0;H[4]=H[0]+bl+cr|0;H[0]=t},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=128<<24-nBitsLeft%32;dataWords[(nBitsLeft+64>>>9<<4)+14]=(nBitsTotal<<8|nBitsTotal>>>24)&16711935|(nBitsTotal<<24|nBitsTotal>>>8)&4278255360;data.sigBytes=(dataWords.length+1)*4;this._process();var hash=this._hash;var H=hash.words;for(var i=0;i<5;i++){var H_i=H[i];H[i]=(H_i<<8|H_i>>>24)&16711935|(H_i<<24|H_i>>>8)&4278255360}return hash},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone}});function f1(x,y,z){return x^y^z}function f2(x,y,z){return x&y|~x&z}function f3(x,y,z){return(x|~y)^z}function f4(x,y,z){return x&z|y&~z}function f5(x,y,z){return x^(y|~z)}function rotl(x,n){return x<<n|x>>>32-n}C.RIPEMD160=Hasher._createHelper(RIPEMD160);C.HmacRIPEMD160=Hasher._createHmacHelper(RIPEMD160)})(Math);return CryptoJS.RIPEMD160})},{"./core":20}],45:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var W=[];var SHA1=C_algo.SHA1=Hasher.extend({_doReset:function(){this._hash=new WordArray.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(M,offset){var H=this._hash.words;var a=H[0];var b=H[1];var c=H[2];var d=H[3];var e=H[4];for(var i=0;i<80;i++){if(i<16){W[i]=M[offset+i]|0}else{var n=W[i-3]^W[i-8]^W[i-14]^W[i-16];W[i]=n<<1|n>>>31}var t=(a<<5|a>>>27)+e+W[i];if(i<20){t+=(b&c|~b&d)+1518500249}else if(i<40){t+=(b^c^d)+1859775393}else if(i<60){t+=(b&c|b&d|c&d)-1894007588}else{t+=(b^c^d)-899497514}e=d;d=c;c=b<<30|b>>>2;b=a;a=t}H[0]=H[0]+a|0;H[1]=H[1]+b|0;H[2]=H[2]+c|0;H[3]=H[3]+d|0;H[4]=H[4]+e|0},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=128<<24-nBitsLeft%32;dataWords[(nBitsLeft+64>>>9<<4)+14]=Math.floor(nBitsTotal/4294967296);dataWords[(nBitsLeft+64>>>9<<4)+15]=nBitsTotal;data.sigBytes=dataWords.length*4;this._process();return this._hash},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone}});C.SHA1=Hasher._createHelper(SHA1);C.HmacSHA1=Hasher._createHmacHelper(SHA1)})();return CryptoJS.SHA1})},{"./core":20}],46:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./sha256"))}else if(typeof define==="function"&&define.amd){define(["./core","./sha256"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var C_algo=C.algo;var SHA256=C_algo.SHA256;var SHA224=C_algo.SHA224=SHA256.extend({_doReset:function(){this._hash=new WordArray.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var hash=SHA256._doFinalize.call(this);hash.sigBytes-=4;return hash}});C.SHA224=SHA256._createHelper(SHA224);C.HmacSHA224=SHA256._createHmacHelper(SHA224)})();return CryptoJS.SHA224})},{"./core":20,"./sha256":47}],47:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var H=[];var K=[];(function(){function isPrime(n){var sqrtN=Math.sqrt(n);for(var factor=2;factor<=sqrtN;factor++){if(!(n%factor)){return false}}return true}function getFractionalBits(n){return(n-(n|0))*4294967296|0}var n=2;var nPrime=0;while(nPrime<64){if(isPrime(n)){if(nPrime<8){H[nPrime]=getFractionalBits(Math.pow(n,1/2))}K[nPrime]=getFractionalBits(Math.pow(n,1/3));nPrime++}n++}})();var W=[];var SHA256=C_algo.SHA256=Hasher.extend({_doReset:function(){this._hash=new WordArray.init(H.slice(0))},_doProcessBlock:function(M,offset){var H=this._hash.words;var a=H[0];var b=H[1];var c=H[2];var d=H[3];var e=H[4];var f=H[5];var g=H[6];var h=H[7];for(var i=0;i<64;i++){if(i<16){W[i]=M[offset+i]|0}else{var gamma0x=W[i-15];var gamma0=(gamma0x<<25|gamma0x>>>7)^(gamma0x<<14|gamma0x>>>18)^gamma0x>>>3;var gamma1x=W[i-2];var gamma1=(gamma1x<<15|gamma1x>>>17)^(gamma1x<<13|gamma1x>>>19)^gamma1x>>>10;W[i]=gamma0+W[i-7]+gamma1+W[i-16]}var ch=e&f^~e&g;var maj=a&b^a&c^b&c;var sigma0=(a<<30|a>>>2)^(a<<19|a>>>13)^(a<<10|a>>>22);var sigma1=(e<<26|e>>>6)^(e<<21|e>>>11)^(e<<7|e>>>25);var t1=h+sigma1+ch+K[i]+W[i];var t2=sigma0+maj;h=g;g=f;f=e;e=d+t1|0;d=c;c=b;b=a;a=t1+t2|0}H[0]=H[0]+a|0;H[1]=H[1]+b|0;H[2]=H[2]+c|0;H[3]=H[3]+d|0;H[4]=H[4]+e|0;H[5]=H[5]+f|0;H[6]=H[6]+g|0;H[7]=H[7]+h|0},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=128<<24-nBitsLeft%32;dataWords[(nBitsLeft+64>>>9<<4)+14]=Math.floor(nBitsTotal/4294967296);dataWords[(nBitsLeft+64>>>9<<4)+15]=nBitsTotal;data.sigBytes=dataWords.length*4;this._process();return this._hash},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone}});C.SHA256=Hasher._createHelper(SHA256);C.HmacSHA256=Hasher._createHmacHelper(SHA256)})(Math);return CryptoJS.SHA256})},{"./core":20}],48:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./x64-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./x64-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_x64=C.x64;var X64Word=C_x64.Word;var C_algo=C.algo;var RHO_OFFSETS=[];var PI_INDEXES=[];var ROUND_CONSTANTS=[];(function(){var x=1,y=0;for(var t=0;t<24;t++){RHO_OFFSETS[x+5*y]=(t+1)*(t+2)/2%64;var newX=y%5;var newY=(2*x+3*y)%5;x=newX;y=newY}for(var x=0;x<5;x++){for(var y=0;y<5;y++){PI_INDEXES[x+5*y]=y+(2*x+3*y)%5*5}}var LFSR=1;for(var i=0;i<24;i++){var roundConstantMsw=0;var roundConstantLsw=0;for(var j=0;j<7;j++){if(LFSR&1){var bitPosition=(1<<j)-1;if(bitPosition<32){roundConstantLsw^=1<<bitPosition}else{roundConstantMsw^=1<<bitPosition-32}}if(LFSR&128){LFSR=LFSR<<1^113}else{LFSR<<=1}}ROUND_CONSTANTS[i]=X64Word.create(roundConstantMsw,roundConstantLsw)}})();var T=[];(function(){for(var i=0;i<25;i++){T[i]=X64Word.create()}})();var SHA3=C_algo.SHA3=Hasher.extend({cfg:Hasher.cfg.extend({outputLength:512}),_doReset:function(){var state=this._state=[];for(var i=0;i<25;i++){state[i]=new X64Word.init}this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(M,offset){var state=this._state;var nBlockSizeLanes=this.blockSize/2;for(var i=0;i<nBlockSizeLanes;i++){var M2i=M[offset+2*i];var M2i1=M[offset+2*i+1];M2i=(M2i<<8|M2i>>>24)&16711935|(M2i<<24|M2i>>>8)&4278255360;M2i1=(M2i1<<8|M2i1>>>24)&16711935|(M2i1<<24|M2i1>>>8)&4278255360;var lane=state[i];lane.high^=M2i1;lane.low^=M2i}for(var round=0;round<24;round++){for(var x=0;x<5;x++){var tMsw=0,tLsw=0;for(var y=0;y<5;y++){var lane=state[x+5*y];tMsw^=lane.high;tLsw^=lane.low}var Tx=T[x];Tx.high=tMsw;Tx.low=tLsw}for(var x=0;x<5;x++){var Tx4=T[(x+4)%5];var Tx1=T[(x+1)%5];var Tx1Msw=Tx1.high;var Tx1Lsw=Tx1.low;var tMsw=Tx4.high^(Tx1Msw<<1|Tx1Lsw>>>31);var tLsw=Tx4.low^(Tx1Lsw<<1|Tx1Msw>>>31);for(var y=0;y<5;y++){var lane=state[x+5*y];lane.high^=tMsw;lane.low^=tLsw}}for(var laneIndex=1;laneIndex<25;laneIndex++){var lane=state[laneIndex];var laneMsw=lane.high;var laneLsw=lane.low;var rhoOffset=RHO_OFFSETS[laneIndex];if(rhoOffset<32){var tMsw=laneMsw<<rhoOffset|laneLsw>>>32-rhoOffset;var tLsw=laneLsw<<rhoOffset|laneMsw>>>32-rhoOffset}else{var tMsw=laneLsw<<rhoOffset-32|laneMsw>>>64-rhoOffset;var tLsw=laneMsw<<rhoOffset-32|laneLsw>>>64-rhoOffset}var TPiLane=T[PI_INDEXES[laneIndex]];TPiLane.high=tMsw;TPiLane.low=tLsw}var T0=T[0];var state0=state[0];T0.high=state0.high;T0.low=state0.low;for(var x=0;x<5;x++){for(var y=0;y<5;y++){var laneIndex=x+5*y;var lane=state[laneIndex];var TLane=T[laneIndex];var Tx1Lane=T[(x+1)%5+5*y];var Tx2Lane=T[(x+2)%5+5*y];lane.high=TLane.high^~Tx1Lane.high&Tx2Lane.high;lane.low=TLane.low^~Tx1Lane.low&Tx2Lane.low}}var lane=state[0];var roundConstant=ROUND_CONSTANTS[round];lane.high^=roundConstant.high;lane.low^=roundConstant.low}},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;var blockSizeBits=this.blockSize*32;dataWords[nBitsLeft>>>5]|=1<<24-nBitsLeft%32;dataWords[(Math.ceil((nBitsLeft+1)/blockSizeBits)*blockSizeBits>>>5)-1]|=128;data.sigBytes=dataWords.length*4;this._process();var state=this._state;var outputLengthBytes=this.cfg.outputLength/8;var outputLengthLanes=outputLengthBytes/8;var hashWords=[];for(var i=0;i<outputLengthLanes;i++){var lane=state[i];var laneMsw=lane.high;var laneLsw=lane.low;laneMsw=(laneMsw<<8|laneMsw>>>24)&16711935|(laneMsw<<24|laneMsw>>>8)&4278255360;laneLsw=(laneLsw<<8|laneLsw>>>24)&16711935|(laneLsw<<24|laneLsw>>>8)&4278255360;hashWords.push(laneLsw);hashWords.push(laneMsw)}return new WordArray.init(hashWords,outputLengthBytes)},clone:function(){var clone=Hasher.clone.call(this);var state=clone._state=this._state.slice(0);for(var i=0;i<25;i++){state[i]=state[i].clone()}return clone}});C.SHA3=Hasher._createHelper(SHA3);C.HmacSHA3=Hasher._createHmacHelper(SHA3)})(Math);return CryptoJS.SHA3})},{"./core":20,"./x64-core":52}],49:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./x64-core"),_dereq_("./sha512"))}else if(typeof define==="function"&&define.amd){define(["./core","./x64-core","./sha512"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_x64=C.x64;var X64Word=C_x64.Word;var X64WordArray=C_x64.WordArray;var C_algo=C.algo;var SHA512=C_algo.SHA512;var SHA384=C_algo.SHA384=SHA512.extend({_doReset:function(){this._hash=new X64WordArray.init([new X64Word.init(3418070365,3238371032),new X64Word.init(1654270250,914150663),new X64Word.init(2438529370,812702999),new X64Word.init(355462360,4144912697),new X64Word.init(1731405415,4290775857),new X64Word.init(2394180231,1750603025),new X64Word.init(3675008525,1694076839),new X64Word.init(1203062813,3204075428)])},_doFinalize:function(){var hash=SHA512._doFinalize.call(this);hash.sigBytes-=16;return hash}});C.SHA384=SHA512._createHelper(SHA384);C.HmacSHA384=SHA512._createHmacHelper(SHA384)})();return CryptoJS.SHA384})},{"./core":20,"./sha512":50,"./x64-core":52}],50:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./x64-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./x64-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var Hasher=C_lib.Hasher;var C_x64=C.x64;var X64Word=C_x64.Word;var X64WordArray=C_x64.WordArray;var C_algo=C.algo;function X64Word_create(){return X64Word.create.apply(X64Word,arguments)}var K=[X64Word_create(1116352408,3609767458),X64Word_create(1899447441,602891725),X64Word_create(3049323471,3964484399),X64Word_create(3921009573,2173295548),X64Word_create(961987163,4081628472),X64Word_create(1508970993,3053834265),X64Word_create(2453635748,2937671579),X64Word_create(2870763221,3664609560),X64Word_create(3624381080,2734883394),X64Word_create(310598401,1164996542),X64Word_create(607225278,1323610764),X64Word_create(1426881987,3590304994),X64Word_create(1925078388,4068182383),X64Word_create(2162078206,991336113),X64Word_create(2614888103,633803317),X64Word_create(3248222580,3479774868),X64Word_create(3835390401,2666613458),X64Word_create(4022224774,944711139),X64Word_create(264347078,2341262773),X64Word_create(604807628,2007800933),X64Word_create(770255983,1495990901),X64Word_create(1249150122,1856431235),X64Word_create(1555081692,3175218132),X64Word_create(1996064986,2198950837),X64Word_create(2554220882,3999719339),X64Word_create(2821834349,766784016),X64Word_create(2952996808,2566594879),X64Word_create(3210313671,3203337956),X64Word_create(3336571891,1034457026),X64Word_create(3584528711,2466948901),X64Word_create(113926993,3758326383),X64Word_create(338241895,168717936),X64Word_create(666307205,1188179964),X64Word_create(773529912,1546045734),X64Word_create(1294757372,1522805485),X64Word_create(1396182291,2643833823),X64Word_create(1695183700,2343527390),X64Word_create(1986661051,1014477480),X64Word_create(2177026350,1206759142),X64Word_create(2456956037,344077627),X64Word_create(2730485921,1290863460),X64Word_create(2820302411,3158454273),X64Word_create(3259730800,3505952657),X64Word_create(3345764771,106217008),X64Word_create(3516065817,3606008344),X64Word_create(3600352804,1432725776),X64Word_create(4094571909,1467031594),X64Word_create(275423344,851169720),X64Word_create(430227734,3100823752),X64Word_create(506948616,1363258195),X64Word_create(659060556,3750685593),X64Word_create(883997877,3785050280),X64Word_create(958139571,3318307427),X64Word_create(1322822218,3812723403),X64Word_create(1537002063,2003034995),X64Word_create(1747873779,3602036899),X64Word_create(1955562222,1575990012),X64Word_create(2024104815,1125592928),X64Word_create(2227730452,2716904306),X64Word_create(2361852424,442776044),X64Word_create(2428436474,593698344),X64Word_create(2756734187,3733110249),X64Word_create(3204031479,2999351573),X64Word_create(3329325298,3815920427),X64Word_create(3391569614,3928383900),X64Word_create(3515267271,566280711),X64Word_create(3940187606,3454069534),X64Word_create(4118630271,4000239992),X64Word_create(116418474,1914138554),X64Word_create(174292421,2731055270),X64Word_create(289380356,3203993006),X64Word_create(460393269,320620315),X64Word_create(685471733,587496836),X64Word_create(852142971,1086792851),X64Word_create(1017036298,365543100),X64Word_create(1126000580,2618297676),X64Word_create(1288033470,3409855158),X64Word_create(1501505948,4234509866),X64Word_create(1607167915,987167468),X64Word_create(1816402316,1246189591)];var W=[];(function(){for(var i=0;i<80;i++){W[i]=X64Word_create()}})();var SHA512=C_algo.SHA512=Hasher.extend({_doReset:function(){this._hash=new X64WordArray.init([new X64Word.init(1779033703,4089235720),new X64Word.init(3144134277,2227873595),new X64Word.init(1013904242,4271175723),new X64Word.init(2773480762,1595750129),new X64Word.init(1359893119,2917565137),new X64Word.init(2600822924,725511199),new X64Word.init(528734635,4215389547),new X64Word.init(1541459225,327033209)])},_doProcessBlock:function(M,offset){var H=this._hash.words;var H0=H[0];var H1=H[1];var H2=H[2];var H3=H[3];var H4=H[4];var H5=H[5];var H6=H[6];var H7=H[7];var H0h=H0.high;var H0l=H0.low;var H1h=H1.high;var H1l=H1.low;var H2h=H2.high;var H2l=H2.low;var H3h=H3.high;var H3l=H3.low;var H4h=H4.high;var H4l=H4.low;var H5h=H5.high;var H5l=H5.low;var H6h=H6.high;var H6l=H6.low;var H7h=H7.high;var H7l=H7.low;var ah=H0h;var al=H0l;var bh=H1h;var bl=H1l;var ch=H2h;var cl=H2l;var dh=H3h;var dl=H3l;var eh=H4h;var el=H4l;var fh=H5h;var fl=H5l;var gh=H6h;var gl=H6l;var hh=H7h;var hl=H7l;for(var i=0;i<80;i++){var Wi=W[i];if(i<16){var Wih=Wi.high=M[offset+i*2]|0;var Wil=Wi.low=M[offset+i*2+1]|0}else{var gamma0x=W[i-15];var gamma0xh=gamma0x.high;var gamma0xl=gamma0x.low;var gamma0h=(gamma0xh>>>1|gamma0xl<<31)^(gamma0xh>>>8|gamma0xl<<24)^gamma0xh>>>7;var gamma0l=(gamma0xl>>>1|gamma0xh<<31)^(gamma0xl>>>8|gamma0xh<<24)^(gamma0xl>>>7|gamma0xh<<25);var gamma1x=W[i-2];var gamma1xh=gamma1x.high;var gamma1xl=gamma1x.low;var gamma1h=(gamma1xh>>>19|gamma1xl<<13)^(gamma1xh<<3|gamma1xl>>>29)^gamma1xh>>>6;var gamma1l=(gamma1xl>>>19|gamma1xh<<13)^(gamma1xl<<3|gamma1xh>>>29)^(gamma1xl>>>6|gamma1xh<<26);var Wi7=W[i-7];var Wi7h=Wi7.high;var Wi7l=Wi7.low;var Wi16=W[i-16];var Wi16h=Wi16.high;var Wi16l=Wi16.low;var Wil=gamma0l+Wi7l;var Wih=gamma0h+Wi7h+(Wil>>>0<gamma0l>>>0?1:0);var Wil=Wil+gamma1l;var Wih=Wih+gamma1h+(Wil>>>0<gamma1l>>>0?1:0);var Wil=Wil+Wi16l;var Wih=Wih+Wi16h+(Wil>>>0<Wi16l>>>0?1:0);Wi.high=Wih;Wi.low=Wil}var chh=eh&fh^~eh&gh;var chl=el&fl^~el&gl;var majh=ah&bh^ah&ch^bh&ch;var majl=al&bl^al&cl^bl&cl;var sigma0h=(ah>>>28|al<<4)^(ah<<30|al>>>2)^(ah<<25|al>>>7);var sigma0l=(al>>>28|ah<<4)^(al<<30|ah>>>2)^(al<<25|ah>>>7);var sigma1h=(eh>>>14|el<<18)^(eh>>>18|el<<14)^(eh<<23|el>>>9);var sigma1l=(el>>>14|eh<<18)^(el>>>18|eh<<14)^(el<<23|eh>>>9);var Ki=K[i];var Kih=Ki.high;var Kil=Ki.low;var t1l=hl+sigma1l;var t1h=hh+sigma1h+(t1l>>>0<hl>>>0?1:0);var t1l=t1l+chl;var t1h=t1h+chh+(t1l>>>0<chl>>>0?1:0);var t1l=t1l+Kil;var t1h=t1h+Kih+(t1l>>>0<Kil>>>0?1:0);var t1l=t1l+Wil;var t1h=t1h+Wih+(t1l>>>0<Wil>>>0?1:0);var t2l=sigma0l+majl;var t2h=sigma0h+majh+(t2l>>>0<sigma0l>>>0?1:0);hh=gh;hl=gl;gh=fh;gl=fl;fh=eh;fl=el;el=dl+t1l|0;eh=dh+t1h+(el>>>0<dl>>>0?1:0)|0;dh=ch;dl=cl;ch=bh;cl=bl;bh=ah;bl=al;al=t1l+t2l|0;ah=t1h+t2h+(al>>>0<t1l>>>0?1:0)|0}H0l=H0.low=H0l+al;H0.high=H0h+ah+(H0l>>>0<al>>>0?1:0);H1l=H1.low=H1l+bl;H1.high=H1h+bh+(H1l>>>0<bl>>>0?1:0);H2l=H2.low=H2l+cl;H2.high=H2h+ch+(H2l>>>0<cl>>>0?1:0);H3l=H3.low=H3l+dl;H3.high=H3h+dh+(H3l>>>0<dl>>>0?1:0);H4l=H4.low=H4l+el;H4.high=H4h+eh+(H4l>>>0<el>>>0?1:0);H5l=H5.low=H5l+fl;H5.high=H5h+fh+(H5l>>>0<fl>>>0?1:0);H6l=H6.low=H6l+gl;H6.high=H6h+gh+(H6l>>>0<gl>>>0?1:0);H7l=H7.low=H7l+hl;H7.high=H7h+hh+(H7l>>>0<hl>>>0?1:0)},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=128<<24-nBitsLeft%32;dataWords[(nBitsLeft+128>>>10<<5)+30]=Math.floor(nBitsTotal/4294967296);dataWords[(nBitsLeft+128>>>10<<5)+31]=nBitsTotal;data.sigBytes=dataWords.length*4;this._process();var hash=this._hash.toX32();return hash},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone},blockSize:1024/32});C.SHA512=Hasher._createHelper(SHA512);C.HmacSHA512=Hasher._createHmacHelper(SHA512)})();return CryptoJS.SHA512})},{"./core":20,"./x64-core":52}],51:[function(_dereq_,module,exports){(function(root,factory,undef){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"),_dereq_("./enc-base64"),_dereq_("./md5"),_dereq_("./evpkdf"),_dereq_("./cipher-core"))}else if(typeof define==="function"&&define.amd){define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var BlockCipher=C_lib.BlockCipher;var C_algo=C.algo;var PC1=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4];var PC2=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32];var BIT_SHIFTS=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28];var SBOX_P=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}];
var SBOX_MASK=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679];var DES=C_algo.DES=BlockCipher.extend({_doReset:function(){var key=this._key;var keyWords=key.words;var keyBits=[];for(var i=0;i<56;i++){var keyBitPos=PC1[i]-1;keyBits[i]=keyWords[keyBitPos>>>5]>>>31-keyBitPos%32&1}var subKeys=this._subKeys=[];for(var nSubKey=0;nSubKey<16;nSubKey++){var subKey=subKeys[nSubKey]=[];var bitShift=BIT_SHIFTS[nSubKey];for(var i=0;i<24;i++){subKey[i/6|0]|=keyBits[(PC2[i]-1+bitShift)%28]<<31-i%6;subKey[4+(i/6|0)]|=keyBits[28+(PC2[i+24]-1+bitShift)%28]<<31-i%6}subKey[0]=subKey[0]<<1|subKey[0]>>>31;for(var i=1;i<7;i++){subKey[i]=subKey[i]>>>(i-1)*4+3}subKey[7]=subKey[7]<<5|subKey[7]>>>27}var invSubKeys=this._invSubKeys=[];for(var i=0;i<16;i++){invSubKeys[i]=subKeys[15-i]}},encryptBlock:function(M,offset){this._doCryptBlock(M,offset,this._subKeys)},decryptBlock:function(M,offset){this._doCryptBlock(M,offset,this._invSubKeys)},_doCryptBlock:function(M,offset,subKeys){this._lBlock=M[offset];this._rBlock=M[offset+1];exchangeLR.call(this,4,252645135);exchangeLR.call(this,16,65535);exchangeRL.call(this,2,858993459);exchangeRL.call(this,8,16711935);exchangeLR.call(this,1,1431655765);for(var round=0;round<16;round++){var subKey=subKeys[round];var lBlock=this._lBlock;var rBlock=this._rBlock;var f=0;for(var i=0;i<8;i++){f|=SBOX_P[i][((rBlock^subKey[i])&SBOX_MASK[i])>>>0]}this._lBlock=rBlock;this._rBlock=lBlock^f}var t=this._lBlock;this._lBlock=this._rBlock;this._rBlock=t;exchangeLR.call(this,1,1431655765);exchangeRL.call(this,8,16711935);exchangeRL.call(this,2,858993459);exchangeLR.call(this,16,65535);exchangeLR.call(this,4,252645135);M[offset]=this._lBlock;M[offset+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function exchangeLR(offset,mask){var t=(this._lBlock>>>offset^this._rBlock)&mask;this._rBlock^=t;this._lBlock^=t<<offset}function exchangeRL(offset,mask){var t=(this._rBlock>>>offset^this._lBlock)&mask;this._lBlock^=t;this._rBlock^=t<<offset}C.DES=BlockCipher._createHelper(DES);var TripleDES=C_algo.TripleDES=BlockCipher.extend({_doReset:function(){var key=this._key;var keyWords=key.words;this._des1=DES.createEncryptor(WordArray.create(keyWords.slice(0,2)));this._des2=DES.createEncryptor(WordArray.create(keyWords.slice(2,4)));this._des3=DES.createEncryptor(WordArray.create(keyWords.slice(4,6)))},encryptBlock:function(M,offset){this._des1.encryptBlock(M,offset);this._des2.decryptBlock(M,offset);this._des3.encryptBlock(M,offset)},decryptBlock:function(M,offset){this._des3.decryptBlock(M,offset);this._des2.encryptBlock(M,offset);this._des1.decryptBlock(M,offset)},keySize:192/32,ivSize:64/32,blockSize:64/32});C.TripleDES=BlockCipher._createHelper(TripleDES)})();return CryptoJS.TripleDES})},{"./cipher-core":19,"./core":20,"./enc-base64":21,"./evpkdf":23,"./md5":29}],52:[function(_dereq_,module,exports){(function(root,factory){if(typeof exports==="object"){module.exports=exports=factory(_dereq_("./core"))}else if(typeof define==="function"&&define.amd){define(["./core"],factory)}else{factory(root.CryptoJS)}})(this,function(CryptoJS){(function(undefined){var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var X32WordArray=C_lib.WordArray;var C_x64=C.x64={};var X64Word=C_x64.Word=Base.extend({init:function(high,low){this.high=high;this.low=low}});var X64WordArray=C_x64.WordArray=Base.extend({init:function(words,sigBytes){words=this.words=words||[];if(sigBytes!=undefined){this.sigBytes=sigBytes}else{this.sigBytes=words.length*8}},toX32:function(){var x64Words=this.words;var x64WordsLength=x64Words.length;var x32Words=[];for(var i=0;i<x64WordsLength;i++){var x64Word=x64Words[i];x32Words.push(x64Word.high);x32Words.push(x64Word.low)}return X32WordArray.create(x32Words,this.sigBytes)},clone:function(){var clone=Base.clone.call(this);var words=clone.words=this.words.slice(0);var wordsLength=words.length;for(var i=0;i<wordsLength;i++){words[i]=words[i].clone()}return clone}})})();return CryptoJS})},{"./core":20}],53:[function(_dereq_,module,exports){(function(process){!function(globals){"use strict";if(typeof define!=="undefined"&&define.amd){define([],function(){return secureRandom})}else if(typeof module!=="undefined"&&module.exports){module.exports=secureRandom}else{globals.secureRandom=secureRandom}function secureRandom(count,options){options=options||{};if(typeof process!="undefined"&&typeof process.pid=="number"){return nodeRandom(count,options)}else{if(!window.crypto)throw new Error("Your browser does not support window.crypto.");return browserRandom(count,options)}}function nodeRandom(count,options){var crypto=_dereq_("crypto");var buf=crypto.randomBytes(count);if(options.array)var ret=[];else var ret=new Uint8Array(count);for(var i=0;i<count;++i){ret[i]=buf.readUInt8(i)}return ret}function browserRandom(count,options){var nativeArr=new Uint8Array(count);window.crypto.getRandomValues(nativeArr);if(options.array){var ret=[];for(var i=0;i<nativeArr.length;++i){ret[i]=nativeArr[i]}}else{ret=nativeArr}return ret}}(this)}).call(this,_dereq_("FWaASH"))},{FWaASH:15,crypto:4}],54:[function(_dereq_,module,exports){var base58=_dereq_("./base58");var base58check=_dereq_("./base58check");var convert=_dereq_("./convert");var error=_dereq_("./util").error;var mainnet=_dereq_("./network").mainnet.addressVersion;function Address(bytes,version){if(!(this instanceof Address)){return new Address(bytes,version)}if(bytes instanceof Address){this.hash=bytes.hash;this.version=bytes.version}else if(typeof bytes==="string"){if(bytes.length<=35){var decode=base58check.decode(bytes);this.hash=decode.payload;this.version=decode.version}else if(bytes.length<=40){this.hash=convert.hexToBytes(bytes);this.version=version||mainnet}else{error("invalid or unrecognized input")}}else{this.hash=bytes;this.version=version||mainnet}}Address.prototype.toString=function(){return base58check.encode(this.hash.slice(0),this.version)};Address.getVersion=function(address){return base58.decode(address)[0]};Address.validate=function(address){try{base58check.decode(address);return true}catch(e){return false}};module.exports=Address},{"./base58":55,"./base58check":56,"./convert":57,"./network":66,"./util":70}],55:[function(_dereq_,module,exports){(function(Buffer){var BigInteger=_dereq_("./jsbn/jsbn");var alphabet="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";var base=BigInteger.valueOf(58);var alphabetMap={};for(var i=0;i<alphabet.length;++i){var chr=alphabet[i];alphabetMap[chr]=BigInteger.valueOf(i)}function encode(buffer){var bi=BigInteger.fromByteArrayUnsigned(buffer);var chars=[];while(bi.compareTo(base)>=0){var mod=bi.mod(base);bi=bi.subtract(mod).divide(base);chars.push(alphabet[mod.intValue()])}chars.push(alphabet[bi.intValue()]);for(var i=0;i<buffer.length;i++){if(buffer[i]!==0)break;chars.push(alphabet[0])}return chars.reverse().join("")}function decode(str){var num=BigInteger.valueOf(0);var leading_zero=0;var seen_other=false;for(var i=0;i<str.length;++i){var chr=str[i];var bi=alphabetMap[chr];if(bi===undefined){throw new Error("invalid base58 string: "+str)}num=num.multiply(base).add(bi);if(chr==="1"&&!seen_other){++leading_zero}else{seen_other=true}}var bytes=num.toByteArrayUnsigned();while(leading_zero-->0){bytes.unshift(0)}return new Buffer(bytes)}module.exports={encode:encode,decode:decode}}).call(this,_dereq_("buffer").Buffer)},{"./jsbn/jsbn":63,buffer:5}],56:[function(_dereq_,module,exports){(function(Buffer){var assert=_dereq_("assert");var base58=_dereq_("./base58");var crypto=_dereq_("crypto");function sha256(buf){var hash=crypto.createHash("sha256");hash.update(buf);return hash.digest()}function encode(buffer,version){version=version||0;var version=new Buffer([version]);var payload=new Buffer(buffer);var message=Buffer.concat([version,payload]);var checksum=sha256(sha256(message)).slice(0,4);return base58.encode(Buffer.concat([message,checksum]))}function decode(string){var buffer=base58.decode(string);var message=buffer.slice(0,-4);var checksum=buffer.slice(-4);var newChecksum=sha256(sha256(message)).slice(0,4);assert.deepEqual(newChecksum,checksum);var version=message.readUInt8(0);var payload=message.slice(1);return{version:version,payload:payload,checksum:checksum}}module.exports={encode:encode,decode:decode}}).call(this,_dereq_("buffer").Buffer)},{"./base58":55,assert:1,buffer:5,crypto:9}],57:[function(_dereq_,module,exports){(function(Buffer){var Crypto=_dereq_("crypto-js");var WordArray=Crypto.lib.WordArray;var base64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function lpad(str,padString,length){while(str.length<length)str=padString+str;return str}function bytesToHex(bytes){if(Buffer.isBuffer(bytes)){return bytes.toString("hex")}return bytes.map(function(x){return lpad(x.toString(16),"0",2)}).join("")}function hexToBytes(hex){return hex.match(/../g).map(function(x){return parseInt(x,16)})}function bytesToBase64(bytes){var base64=[];for(var i=0;i<bytes.length;i+=3){var triplet=bytes[i]<<16|bytes[i+1]<<8|bytes[i+2];for(var j=0;j<4;j++){if(i*8+j*6<=bytes.length*8){base64.push(base64map.charAt(triplet>>>6*(3-j)&63))}else{base64.push("=")}}}return base64.join("")}function base64ToBytes(base64){base64=base64.replace(/[^A-Z0-9+\/]/gi,"");var bytes=[];var imod4=0;for(var i=0;i<base64.length;imod4=++i%4){if(!imod4)continue;bytes.push((base64map.indexOf(base64.charAt(i-1))&Math.pow(2,-2*imod4+8)-1)<<imod4*2|base64map.indexOf(base64.charAt(i))>>>6-imod4*2)}return bytes}function coerceToBytes(input){if(typeof input!="string")return input;return hexToBytes(input)}function binToBytes(bin){return bin.match(/......../g).map(function(x){return parseInt(x,2)})}function bytesToBin(bytes){return bytes.map(function(x){return lpad(x.toString(2),"0",8)}).join("")}function bytesToString(bytes){return bytes.map(function(x){return String.fromCharCode(x)}).join("")}function stringToBytes(string){return string.split("").map(function(x){return x.charCodeAt(0)})}function numToBytes(num,bytes){if(bytes===undefined)bytes=8;if(bytes===0)return[];return[num%256].concat(numToBytes(Math.floor(num/256),bytes-1))}function bytesToNum(bytes){if(bytes.length===0)return 0;return bytes[0]+256*bytesToNum(bytes.slice(1))}function numToVarInt(num){if(num<253)return[num];if(num<65536)return[253].concat(numToBytes(num,2));if(num<4294967296)return[254].concat(numToBytes(num,4));return[255].concat(numToBytes(num,8))}function varIntToNum(bytes){var prefix=bytes[0];var viBytes=prefix<253?bytes.slice(0,1):prefix===253?bytes.slice(1,3):prefix===254?bytes.slice(1,5):bytes.slice(1,9);return{bytes:prefix<253?viBytes:bytes.slice(0,viBytes.length+1),number:bytesToNum(viBytes)}}function bytesToWords(bytes){var words=[];for(var i=0,b=0;i<bytes.length;i++,b+=8){words[b>>>5]|=bytes[i]<<24-b%32}return words}function wordsToBytes(words){var bytes=[];for(var b=0;b<words.length*32;b+=8){bytes.push(words[b>>>5]>>>24-b%32&255)}return bytes}function bytesToWordArray(bytes){return new WordArray.init(bytesToWords(bytes),bytes.length)}function wordArrayToBytes(wordArray){return wordsToBytes(wordArray.words)}function reverseEndian(hex){return bytesToHex(hexToBytes(hex).reverse())}module.exports={lpad:lpad,bytesToHex:bytesToHex,hexToBytes:hexToBytes,bytesToBase64:bytesToBase64,base64ToBytes:base64ToBytes,coerceToBytes:coerceToBytes,binToBytes:binToBytes,bytesToBin:bytesToBin,bytesToString:bytesToString,stringToBytes:stringToBytes,numToBytes:numToBytes,bytesToNum:bytesToNum,numToVarInt:numToVarInt,varIntToNum:varIntToNum,bytesToWords:bytesToWords,wordsToBytes:wordsToBytes,bytesToWordArray:bytesToWordArray,wordArrayToBytes:wordArrayToBytes,reverseEndian:reverseEndian}}).call(this,_dereq_("buffer").Buffer)},{buffer:5,"crypto-js":27}],58:[function(_dereq_,module,exports){var sec=_dereq_("./jsbn/sec");var rng=_dereq_("secure-random");var BigInteger=_dereq_("./jsbn/jsbn");var convert=_dereq_("./convert");var HmacSHA256=_dereq_("crypto-js/hmac-sha256");var ECPointFp=_dereq_("./jsbn/ec").ECPointFp;var ecparams=sec("secp256k1");var P_OVER_FOUR=null;function implShamirsTrick(P,k,Q,l){var m=Math.max(k.bitLength(),l.bitLength());var Z=P.add2D(Q);var R=P.curve.getInfinity();for(var i=m-1;i>=0;--i){R=R.twice2D();R.z=BigInteger.ONE;if(k.testBit(i)){if(l.testBit(i)){R=R.add2D(Z)}else{R=R.add2D(P)}}else{if(l.testBit(i)){R=R.add2D(Q)}}}return R}function deterministicGenerateK(hash,key){var vArr=[];var kArr=[];for(var i=0;i<32;i++)vArr.push(1);for(var i=0;i<32;i++)kArr.push(0);var v=convert.bytesToWordArray(vArr);var k=convert.bytesToWordArray(kArr);k=HmacSHA256(convert.bytesToWordArray(vArr.concat([0]).concat(key).concat(hash)),k);v=HmacSHA256(v,k);vArr=convert.wordArrayToBytes(v);k=HmacSHA256(convert.bytesToWordArray(vArr.concat([1]).concat(key).concat(hash)),k);v=HmacSHA256(v,k);v=HmacSHA256(v,k);vArr=convert.wordArrayToBytes(v);return BigInteger.fromByteArrayUnsigned(vArr)}var ECDSA={getBigRandom:function(limit){return new BigInteger(limit.bitLength(),rng).mod(limit.subtract(BigInteger.ONE)).add(BigInteger.ONE)},sign:function(hash,priv){var d=priv;var n=ecparams.getN();var e=BigInteger.fromByteArrayUnsigned(hash);var k=deterministicGenerateK(hash,priv.toByteArrayUnsigned());var G=ecparams.getG();var Q=G.multiply(k);var r=Q.getX().toBigInteger().mod(n);var s=k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n);return ECDSA.serializeSig(r,s)},verify:function(hash,sig,pubkey){var r,s;if(Array.isArray(sig)){var obj=ECDSA.parseSig(sig);r=obj.r;s=obj.s}else if("object"===typeof sig&&sig.r&&sig.s){r=sig.r;s=sig.s}else{throw new Error("Invalid value for signature")}var Q;if(pubkey instanceof ECPointFp){Q=pubkey}else if(Array.isArray(pubkey)){Q=ECPointFp.decodeFrom(ecparams.getCurve(),pubkey)}else{throw new Error("Invalid format for pubkey value, must be byte array or ECPointFp")}var e=BigInteger.fromByteArrayUnsigned(hash);return ECDSA.verifyRaw(e,r,s,Q)},verifyRaw:function(e,r,s,Q){var n=ecparams.getN();var G=ecparams.getG();if(r.compareTo(BigInteger.ONE)<0||r.compareTo(n)>=0){return false}if(s.compareTo(BigInteger.ONE)<0||s.compareTo(n)>=0){return false}var c=s.modInverse(n);var u1=e.multiply(c).mod(n);var u2=r.multiply(c).mod(n);var point=G.multiply(u1).add(Q.multiply(u2));var v=point.getX().toBigInteger().mod(n);return v.equals(r)},serializeSig:function(r,s){var rBa=r.toByteArraySigned();var sBa=s.toByteArraySigned();var sequence=[];sequence.push(2);sequence.push(rBa.length);sequence=sequence.concat(rBa);sequence.push(2);sequence.push(sBa.length);sequence=sequence.concat(sBa);sequence.unshift(sequence.length);sequence.unshift(48);return sequence},parseSig:function(sig){var cursor;if(sig[0]!=48){throw new Error("Signature not a valid DERSequence")}cursor=2;if(sig[cursor]!=2){throw new Error("First element in signature must be a DERInteger")}var rBa=sig.slice(cursor+2,cursor+2+sig[cursor+1]);cursor+=2+sig[cursor+1];if(sig[cursor]!=2){throw new Error("Second element in signature must be a DERInteger")}var sBa=sig.slice(cursor+2,cursor+2+sig[cursor+1]);cursor+=2+sig[cursor+1];var r=BigInteger.fromByteArrayUnsigned(rBa);var s=BigInteger.fromByteArrayUnsigned(sBa);return{r:r,s:s}},parseSigCompact:function(sig){if(sig.length!==65){throw new Error("Signature has the wrong length")}var i=sig[0]-27;if(i<0||i>7){throw new Error("Invalid signature type")}var n=ecparams.getN();var r=BigInteger.fromByteArrayUnsigned(sig.slice(1,33)).mod(n);var s=BigInteger.fromByteArrayUnsigned(sig.slice(33,65)).mod(n);return{r:r,s:s,i:i}},recoverPubKey:function(r,s,hash,i){i=i&3;var isYEven=i&1;var isSecondKey=i>>1;var n=ecparams.getN();var G=ecparams.getG();var curve=ecparams.getCurve();var p=curve.getQ();var a=curve.getA().toBigInteger();var b=curve.getB().toBigInteger();if(!P_OVER_FOUR){P_OVER_FOUR=p.add(BigInteger.ONE).divide(BigInteger.valueOf(4))}var x=isSecondKey?r.add(n):r;var alpha=x.multiply(x).multiply(x).add(a.multiply(x)).add(b).mod(p);var beta=alpha.modPow(P_OVER_FOUR,p);var y=(beta.isEven()?!isYEven:isYEven)?beta:p.subtract(beta);var R=new ECPointFp(curve,curve.fromBigInteger(x),curve.fromBigInteger(y));R.validate();var e=BigInteger.fromByteArrayUnsigned(hash);var eNeg=BigInteger.ZERO.subtract(e).mod(n);var rInv=r.modInverse(n);var Q=implShamirsTrick(R,s,G,eNeg).multiply(rInv);Q.validate();if(!ECDSA.verifyRaw(e,r,s,Q)){throw new Error("Pubkey recovery unsuccessful")}return Q},calcPubKeyRecoveryParam:function(origPubKey,r,s,hash){for(var i=0;i<4;i++){var pubKey=ECDSA.recoverPubKey(r,s,hash,i);if(pubKey.equals(origPubKey)){return i}}throw new Error("Unable to find valid recovery factor")}};module.exports=ECDSA},{"./convert":57,"./jsbn/ec":62,"./jsbn/jsbn":63,"./jsbn/sec":64,"crypto-js/hmac-sha256":25,"secure-random":53}],59:[function(_dereq_,module,exports){var Address=_dereq_("./address");var assert=_dereq_("assert");var convert=_dereq_("./convert");var base58check=_dereq_("./base58check");var BigInteger=_dereq_("./jsbn/jsbn");var ecdsa=_dereq_("./ecdsa");var ECPointFp=_dereq_("./jsbn/ec").ECPointFp;var sec=_dereq_("./jsbn/sec");var Network=_dereq_("./network");var util=_dereq_("./util");var ecparams=sec("secp256k1");var ECKey=function(input,compressed){if(!(this instanceof ECKey)){return new ECKey(input,compressed)}if(!input){var n=ecparams.getN();this.priv=ecdsa.getBigRandom(n);this.compressed=compressed||false}else this.import(input,compressed)};ECKey.prototype.import=function(input,compressed){function has(li,v){return li.indexOf(v)>=0}function fromBin(x){return BigInteger.fromByteArrayUnsigned(x)}this.priv=input instanceof ECKey?input.priv:input instanceof BigInteger?input.mod(ecparams.getN()):Array.isArray(input)?fromBin(input.slice(0,32)):typeof input!="string"?null:input.length==44?fromBin(convert.base64ToBytes(input)):input.length==51&&input[0]=="5"?fromBin(base58check.decode(input).payload):input.length==51&&input[0]=="9"?fromBin(base58check.decode(input).payload):input.length==52&&has("LK",input[0])?fromBin(base58check.decode(input).payload.slice(0,32)):input.length==52&&input[0]=="c"?fromBin(base58check.decode(input).payload.slice(0,32)):has([64,65],input.length)?fromBin(convert.hexToBytes(input.slice(0,64))):null;assert(this.priv!==null);this.compressed=compressed!==undefined?compressed:input instanceof ECKey?input.compressed:input instanceof BigInteger?false:Array.isArray(input)?false:typeof input!="string"?null:input.length==44?false:input.length==51&&input[0]=="5"?false:input.length==51&&input[0]=="9"?false:input.length==52&&has("LK",input[0])?true:input.length==52&&input[0]=="c"?true:input.length==64?false:input.length==65?true:null;assert(this.compressed!==null)};ECKey.prototype.getPub=function(compressed){if(compressed===undefined)compressed=this.compressed;return ECPubKey(ecparams.getG().multiply(this.priv),compressed)};ECKey.prototype.toBin=function(){return convert.bytesToString(this.toBytes())};ECKey.version_bytes={0:128,111:239};ECKey.prototype.toWif=function(version){version=version||Network.mainnet.addressVersion;return base58check.encode(this.toBytes(),ECKey.version_bytes[version])};ECKey.prototype.toHex=function(){return convert.bytesToHex(this.toBytes())};ECKey.prototype.toBytes=function(){var bytes=this.priv.toByteArrayUnsigned();if(this.compressed)bytes.push(1);return bytes};ECKey.prototype.toBase64=function(){return convert.bytesToBase64(this.toBytes())};ECKey.prototype.toString=ECKey.prototype.toHex;ECKey.prototype.getAddress=function(version){return this.getPub().getAddress(version)};ECKey.prototype.add=function(key){return ECKey(this.priv.add(ECKey(key).priv),this.compressed)};ECKey.prototype.multiply=function(key){return ECKey(this.priv.multiply(ECKey(key).priv),this.compressed)};ECKey.prototype.sign=function(hash){return ecdsa.sign(hash,this.priv)};ECKey.prototype.verify=function(hash,sig){return this.getPub().verify(hash,sig)};var ECPubKey=function(input,compressed){if(!(this instanceof ECPubKey)){return new ECPubKey(input,compressed)}this.import(input,compressed)};ECPubKey.prototype.import=function(input,compressed){var decode=function(x){return ECPointFp.decodeFrom(ecparams.getCurve(),x)};this.pub=input instanceof ECPointFp?input:input instanceof ECKey?ecparams.getG().multiply(input.priv):input instanceof ECPubKey?input.pub:typeof input=="string"?decode(convert.hexToBytes(input)):Array.isArray(input)?decode(input):null;assert(this.pub!==null);this.compressed=compressed?compressed:input instanceof ECPointFp?input.compressed:input instanceof ECPubKey?input.compressed:this.pub[0]<4};ECPubKey.prototype.add=function(key){return ECPubKey(this.pub.add(ECPubKey(key).pub),this.compressed)};ECPubKey.prototype.multiply=function(key){return ECPubKey(this.pub.multiply(ECKey(key).priv),this.compressed)};ECPubKey.prototype.toBytes=function(compressed){if(compressed===undefined)compressed=this.compressed;return this.pub.getEncoded(compressed)};ECPubKey.prototype.toHex=function(compressed){return convert.bytesToHex(this.toBytes(compressed))};ECPubKey.prototype.toBin=function(compressed){return convert.bytesToString(this.toBytes(compressed))};ECPubKey.prototype.toWif=function(version){version=version||Network.mainnet.addressVersion;return base58check.encode(this.toBytes(),version)};ECPubKey.prototype.toString=ECPubKey.prototype.toHex;ECPubKey.prototype.getAddress=function(version){version=version||Network.mainnet.addressVersion;return new Address(util.sha256ripe160(this.toBytes()),version)};ECPubKey.prototype.verify=function(hash,sig){return ecdsa.verify(hash,sig,this.toBytes())};module.exports={ECKey:ECKey,ECPubKey:ECPubKey}},{"./address":54,"./base58check":56,"./convert":57,"./ecdsa":58,"./jsbn/ec":62,"./jsbn/jsbn":63,"./jsbn/sec":64,"./network":66,"./util":70,assert:1}],60:[function(_dereq_,module,exports){(function(Buffer){var convert=_dereq_("./convert.js");var base58=_dereq_("./base58.js");var assert=_dereq_("assert");var format=_dereq_("util").format;var util=_dereq_("./util.js");var Crypto=_dereq_("crypto-js");var HmacSHA512=Crypto.HmacSHA512;var HMAC=Crypto.algo.HMAC;var ECKey=_dereq_("./eckey.js").ECKey;var ECPubKey=_dereq_("./eckey.js").ECPubKey;var Address=_dereq_("./address.js");var Network=_dereq_("./network");var crypto=_dereq_("crypto");function sha256(buf){var hash=crypto.createHash("sha256");hash.update(buf);return hash.digest()}function HDWallet(seed,network){if(seed===undefined)return;var seedWords=convert.bytesToWordArray(seed);var I=convert.wordArrayToBytes(HmacSHA512(seedWords,"Bitcoin seed"));this.chaincode=I.slice(32);this.network=network||"mainnet";if(!Network.hasOwnProperty(this.network)){throw new Error("Unknown network: "+this.network)}this.priv=new ECKey(I.slice(0,32).concat([1]),true);this.pub=this.priv.getPub();this.index=0;this.depth=0}HDWallet.HIGHEST_BIT=2147483648;HDWallet.LENGTH=78;function arrayEqual(a,b){return!(a<b||a>b)}HDWallet.fromSeedHex=function(hex,network){return new HDWallet(convert.hexToBytes(hex),network)};HDWallet.fromSeedString=function(string,network){return new HDWallet(convert.stringToBytes(string),network)};HDWallet.fromBase58=function(string){var buffer=base58.decode(string);var payload=buffer.slice(0,-4);var checksum=buffer.slice(-4);var newChecksum=sha256(sha256(payload)).slice(0,4);assert.deepEqual(newChecksum,checksum);assert.equal(payload.length,HDWallet.LENGTH);return HDWallet.fromBytes(payload)};HDWallet.fromHex=function(input){return HDWallet.fromBytes(convert.hexToBytes(input))};HDWallet.fromBytes=function(input){if(input.length!=HDWallet.LENGTH){throw new Error(format("Invalid input length, %s. Expected %s.",input.length,HDWallet.LENGTH))}if(Buffer.isBuffer(input)){input=Array.prototype.map.bind(input,function(x){return x})()}var hd=new HDWallet;var versionBytes=input.slice(0,4);var versionWord=convert.bytesToWords(versionBytes)[0];var type;for(var name in Network){var network=Network[name];for(var t in network.hdVersions){if(versionWord!=network.hdVersions[t])continue;type=t;hd.network=name}}if(!hd.network){throw new Error(format("Could not find version %s",convert.bytesToHex(versionBytes)))}hd.depth=input[4];hd.parentFingerprint=input.slice(5,9);assert(hd.depth===0==arrayEqual(hd.parentFingerprint,[0,0,0,0]));hd.index=convert.bytesToNum(input.slice(9,13).reverse());assert(hd.depth>0||hd.index===0);hd.chaincode=input.slice(13,45);if(type=="priv"){hd.priv=new ECKey(input.slice(46,78).concat([1]),true);hd.pub=hd.priv.getPub()}else{hd.pub=new ECPubKey(input.slice(45,78),true)}return hd};HDWallet.prototype.getIdentifier=function(){return util.sha256ripe160(this.pub.toBytes())};HDWallet.prototype.getFingerprint=function(){return this.getIdentifier().slice(0,4)};HDWallet.prototype.getAddress=function(){return new Address(util.sha256ripe160(this.pub.toBytes()),this.getKeyVersion())};HDWallet.prototype.toBytes=function(priv){var buffer=[];var version=Network[this.network].hdVersions[priv?"priv":"pub"];var vBytes=convert.wordsToBytes([version]);buffer=buffer.concat(vBytes);assert.equal(buffer.length,4);buffer.push(this.depth);assert.equal(buffer.length,4+1);buffer=buffer.concat(this.depth?this.parentFingerprint:[0,0,0,0]);assert.equal(buffer.length,4+1+4);buffer=buffer.concat(convert.numToBytes(this.index,4).reverse());assert.equal(buffer.length,4+1+4+4);buffer=buffer.concat(this.chaincode);assert.equal(buffer.length,4+1+4+4+32);if(priv){assert(this.priv,"Cannot serialize to private without private key");buffer.push(0);buffer=buffer.concat(this.priv.toBytes().slice(0,32))}else{buffer=buffer.concat(this.pub.toBytes(true))}return buffer};HDWallet.prototype.toHex=function(priv){var bytes=this.toBytes(priv);return convert.bytesToHex(bytes)};HDWallet.prototype.toBase58=function(priv){var buffer=new Buffer(this.toBytes(priv));var checksum=sha256(sha256(buffer)).slice(0,4);return base58.encode(Buffer.concat([buffer,checksum]))};HDWallet.prototype.derive=function(i){var I,iBytes=convert.numToBytes(i,4).reverse(),cPar=this.chaincode,usePriv=i>=HDWallet.HIGHEST_BIT,SHA512=Crypto.algo.SHA512;if(usePriv){assert(this.priv,"Private derive on public key");var kPar=this.priv.toBytes().slice(0,32);I=HmacFromBytesToBytes(SHA512,[0].concat(kPar,iBytes),cPar)}else{var KPar=this.pub.toBytes(true);I=HmacFromBytesToBytes(SHA512,KPar.concat(iBytes),cPar)}var IL=I.slice(0,32),IR=I.slice(32);var hd=new HDWallet;hd.network=this.network;if(this.priv){hd.priv=this.priv.add(new ECKey(IL.concat([1])));hd.priv.compressed=true;hd.priv.version=this.getKeyVersion();hd.pub=hd.priv.getPub()}else{hd.pub=this.pub.add(new ECKey(IL.concat([1]),true).getPub())}hd.chaincode=IR;hd.parentFingerprint=this.getFingerprint();hd.depth=this.depth+1;hd.index=i;hd.pub.compressed=true;return hd};HDWallet.prototype.derivePrivate=function(index){return this.derive(index+HDWallet.HIGHEST_BIT)};HDWallet.prototype.getKeyVersion=function(){return Network[this.network].addressVersion};HDWallet.prototype.toString=HDWallet.prototype.toBase58;function HmacFromBytesToBytes(hasher,message,key){var hmac=HMAC.create(hasher,convert.bytesToWordArray(key));hmac.update(convert.bytesToWordArray(message));return convert.wordArrayToBytes(hmac.finalize())}module.exports=HDWallet}).call(this,_dereq_("buffer").Buffer)},{"./address.js":54,"./base58.js":55,"./convert.js":57,"./eckey.js":59,"./network":66,"./util.js":70,assert:1,buffer:5,crypto:9,"crypto-js":27,util:17}],61:[function(_dereq_,module,exports){var Key=_dereq_("./eckey");var T=_dereq_("./transaction");module.exports={Address:_dereq_("./address"),Key:Key.ECKey,ECKey:Key.ECKey,ECPubKey:Key.ECPubKey,Message:_dereq_("./message"),BigInteger:_dereq_("./jsbn/jsbn"),Crypto:_dereq_("crypto-js"),Script:_dereq_("./script"),Opcode:_dereq_("./opcode"),Transaction:T.Transaction,Util:_dereq_("./util"),TransactionIn:T.TransactionIn,TransactionOut:T.TransactionOut,ECPointFp:_dereq_("./jsbn/ec").ECPointFp,Wallet:_dereq_("./wallet"),network:_dereq_("./network"),ecdsa:_dereq_("./ecdsa"),HDWallet:_dereq_("./hdwallet.js"),base58:_dereq_("./base58"),base58check:_dereq_("./base58check"),convert:_dereq_("./convert")}},{"./address":54,"./base58":55,"./base58check":56,"./convert":57,"./ecdsa":58,"./eckey":59,"./hdwallet.js":60,"./jsbn/ec":62,"./jsbn/jsbn":63,"./message":65,"./network":66,"./opcode":67,"./script":68,"./transaction":69,"./util":70,"./wallet":71,"crypto-js":27}],62:[function(_dereq_,module,exports){var BigInteger=_dereq_("./jsbn"),sec=_dereq_("./sec");function ECFieldElementFp(q,x){this.x=x;this.q=q}function feFpEquals(other){if(other==this)return true;return this.q.equals(other.q)&&this.x.equals(other.x)}function feFpToBigInteger(){return this.x}function feFpNegate(){return new ECFieldElementFp(this.q,this.x.negate().mod(this.q))}function feFpAdd(b){return new ECFieldElementFp(this.q,this.x.add(b.toBigInteger()).mod(this.q))}function feFpSubtract(b){return new ECFieldElementFp(this.q,this.x.subtract(b.toBigInteger()).mod(this.q))}function feFpMultiply(b){return new ECFieldElementFp(this.q,this.x.multiply(b.toBigInteger()).mod(this.q))}function feFpSquare(){return new ECFieldElementFp(this.q,this.x.square().mod(this.q))}function feFpDivide(b){return new ECFieldElementFp(this.q,this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q))}ECFieldElementFp.prototype.equals=feFpEquals;ECFieldElementFp.prototype.toBigInteger=feFpToBigInteger;ECFieldElementFp.prototype.negate=feFpNegate;ECFieldElementFp.prototype.add=feFpAdd;ECFieldElementFp.prototype.subtract=feFpSubtract;ECFieldElementFp.prototype.multiply=feFpMultiply;ECFieldElementFp.prototype.square=feFpSquare;ECFieldElementFp.prototype.divide=feFpDivide;function ECPointFp(curve,x,y,z){this.curve=curve;this.x=x;this.y=y;if(z==null){this.z=BigInteger.ONE}else{this.z=z}this.zinv=null}function pointFpGetX(){if(this.zinv==null){this.zinv=this.z.modInverse(this.curve.q)}return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))}function pointFpGetY(){if(this.zinv==null){this.zinv=this.z.modInverse(this.curve.q)}return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))}function pointFpEquals(other){if(other==this)return true;if(this.isInfinity())return other.isInfinity();if(other.isInfinity())return this.isInfinity();var u,v;u=other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q);if(!u.equals(BigInteger.ZERO))return false;v=other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q);return v.equals(BigInteger.ZERO)}function pointFpIsInfinity(){if(this.x==null&&this.y==null)return true;return this.z.equals(BigInteger.ZERO)&&!this.y.toBigInteger().equals(BigInteger.ZERO)}function pointFpNegate(){return new ECPointFp(this.curve,this.x,this.y.negate(),this.z)}function pointFpAdd(b){if(this.isInfinity())return b;if(b.isInfinity())return this;var u=b.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(b.z)).mod(this.curve.q);var v=b.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(b.z)).mod(this.curve.q);if(BigInteger.ZERO.equals(v)){if(BigInteger.ZERO.equals(u)){return this.twice()}return this.curve.getInfinity()}var THREE=new BigInteger("3");var x1=this.x.toBigInteger();var y1=this.y.toBigInteger();var x2=b.x.toBigInteger();var y2=b.y.toBigInteger();var v2=v.square();var v3=v2.multiply(v);var x1v2=x1.multiply(v2);var zu2=u.square().multiply(this.z);var x3=zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.q);var y3=x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.q);var z3=v3.multiply(this.z).multiply(b.z).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(x3),this.curve.fromBigInteger(y3),z3)}function pointFpTwice(){if(this.isInfinity())return this;if(this.y.toBigInteger().signum()==0)return this.curve.getInfinity();var THREE=new BigInteger("3");var x1=this.x.toBigInteger();var y1=this.y.toBigInteger();var y1z1=y1.multiply(this.z);var y1sqz1=y1z1.multiply(y1).mod(this.curve.q);var a=this.curve.a.toBigInteger();
var w=x1.square().multiply(THREE);if(!BigInteger.ZERO.equals(a)){w=w.add(this.z.square().multiply(a))}w=w.mod(this.curve.q);var x3=w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.q);var y3=w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.square().multiply(w)).mod(this.curve.q);var z3=y1z1.square().multiply(y1z1).shiftLeft(3).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(x3),this.curve.fromBigInteger(y3),z3)}function pointFpMultiply(k){if(this.isInfinity())return this;if(k.signum()==0)return this.curve.getInfinity();var e=k;var h=e.multiply(new BigInteger("3"));var neg=this.negate();var R=this;var i;for(i=h.bitLength()-2;i>0;--i){R=R.twice();var hBit=h.testBit(i);var eBit=e.testBit(i);if(hBit!=eBit){R=R.add(hBit?this:neg)}}return R}function pointFpMultiplyTwo(j,x,k){var i;if(j.bitLength()>k.bitLength())i=j.bitLength()-1;else i=k.bitLength()-1;var R=this.curve.getInfinity();var both=this.add(x);while(i>=0){R=R.twice();if(j.testBit(i)){if(k.testBit(i)){R=R.add(both)}else{R=R.add(this)}}else{if(k.testBit(i)){R=R.add(x)}}--i}return R}ECPointFp.prototype.getX=pointFpGetX;ECPointFp.prototype.getY=pointFpGetY;ECPointFp.prototype.equals=pointFpEquals;ECPointFp.prototype.isInfinity=pointFpIsInfinity;ECPointFp.prototype.negate=pointFpNegate;ECPointFp.prototype.add=pointFpAdd;ECPointFp.prototype.twice=pointFpTwice;ECPointFp.prototype.multiply=pointFpMultiply;ECPointFp.prototype.multiplyTwo=pointFpMultiplyTwo;function ECCurveFp(q,a,b){this.q=q;this.a=this.fromBigInteger(a);this.b=this.fromBigInteger(b);this.infinity=new ECPointFp(this,null,null)}function curveFpGetQ(){return this.q}function curveFpGetA(){return this.a}function curveFpGetB(){return this.b}function curveFpEquals(other){if(other==this)return true;return this.q.equals(other.q)&&this.a.equals(other.a)&&this.b.equals(other.b)}function curveFpGetInfinity(){return this.infinity}function curveFpFromBigInteger(x){return new ECFieldElementFp(this.q,x)}function curveFpDecodePointHex(s){switch(parseInt(s.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var len=(s.length-2)/2;var xHex=s.substr(2,len);var yHex=s.substr(len+2,len);return new ECPointFp(this,this.fromBigInteger(new BigInteger(xHex,16)),this.fromBigInteger(new BigInteger(yHex,16)));default:return null}}ECCurveFp.prototype.getQ=curveFpGetQ;ECCurveFp.prototype.getA=curveFpGetA;ECCurveFp.prototype.getB=curveFpGetB;ECCurveFp.prototype.equals=curveFpEquals;ECCurveFp.prototype.getInfinity=curveFpGetInfinity;ECCurveFp.prototype.fromBigInteger=curveFpFromBigInteger;ECCurveFp.prototype.decodePointHex=curveFpDecodePointHex;function integerToBytes(i,len){var bytes=i.toByteArrayUnsigned();if(len<bytes.length){bytes=bytes.slice(bytes.length-len)}else while(len>bytes.length){bytes.unshift(0)}return bytes}ECFieldElementFp.prototype.getByteLength=function(){return Math.floor((this.toBigInteger().bitLength()+7)/8)};ECPointFp.prototype.getEncoded=function(compressed){var x=this.getX().toBigInteger();var y=this.getY().toBigInteger();var enc=integerToBytes(x,32);if(compressed){if(y.isEven()){enc.unshift(2)}else{enc.unshift(3)}}else{enc.unshift(4);enc=enc.concat(integerToBytes(y,32))}return enc};ECPointFp.decodeFrom=function(ecparams,enc){var type=enc[0];var dataLen=enc.length-1;if(type==4){var xBa=enc.slice(1,1+dataLen/2),yBa=enc.slice(1+dataLen/2,1+dataLen),x=BigInteger.fromByteArrayUnsigned(xBa),y=BigInteger.fromByteArrayUnsigned(yBa)}else{var xBa=enc.slice(1),x=BigInteger.fromByteArrayUnsigned(xBa),p=ecparams.getQ(),xCubedPlus7=x.multiply(x).multiply(x).add(new BigInteger("7")).mod(p),pPlus1Over4=p.add(new BigInteger("1")).divide(new BigInteger("4")),y=xCubedPlus7.modPow(pPlus1Over4,p);if(y.mod(new BigInteger("2")).toString()!=""+type%2){y=p.subtract(y)}}return new ECPointFp(ecparams,ecparams.fromBigInteger(x),ecparams.fromBigInteger(y))};ECPointFp.prototype.add2D=function(b){if(this.isInfinity())return b;if(b.isInfinity())return this;if(this.x.equals(b.x)){if(this.y.equals(b.y)){return this.twice()}return this.curve.getInfinity()}var x_x=b.x.subtract(this.x);var y_y=b.y.subtract(this.y);var gamma=y_y.divide(x_x);var x3=gamma.square().subtract(this.x).subtract(b.x);var y3=gamma.multiply(this.x.subtract(x3)).subtract(this.y);return new ECPointFp(this.curve,x3,y3)};ECPointFp.prototype.twice2D=function(){if(this.isInfinity())return this;if(this.y.toBigInteger().signum()==0){return this.curve.getInfinity()}var TWO=this.curve.fromBigInteger(BigInteger.valueOf(2));var THREE=this.curve.fromBigInteger(BigInteger.valueOf(3));var gamma=this.x.square().multiply(THREE).add(this.curve.a).divide(this.y.multiply(TWO));var x3=gamma.square().subtract(this.x.multiply(TWO));var y3=gamma.multiply(this.x.subtract(x3)).subtract(this.y);return new ECPointFp(this.curve,x3,y3)};ECPointFp.prototype.multiply2D=function(k){if(this.isInfinity())return this;if(k.signum()==0)return this.curve.getInfinity();var e=k;var h=e.multiply(new BigInteger("3"));var neg=this.negate();var R=this;var i;for(i=h.bitLength()-2;i>0;--i){R=R.twice();var hBit=h.testBit(i);var eBit=e.testBit(i);if(hBit!=eBit){R=R.add2D(hBit?this:neg)}}return R};ECPointFp.prototype.isOnCurve=function(){var x=this.getX().toBigInteger();var y=this.getY().toBigInteger();var a=this.curve.getA().toBigInteger();var b=this.curve.getB().toBigInteger();var n=this.curve.getQ();var lhs=y.multiply(y).mod(n);var rhs=x.multiply(x).multiply(x).add(a.multiply(x)).add(b).mod(n);return lhs.equals(rhs)};ECPointFp.prototype.toString=function(){return"("+this.getX().toBigInteger().toString()+","+this.getY().toBigInteger().toString()+")"};ECPointFp.prototype.validate=function(){var n=this.curve.getQ();if(this.isInfinity()){throw new Error("Point is at infinity.")}var x=this.getX().toBigInteger();var y=this.getY().toBigInteger();if(x.compareTo(BigInteger.ONE)<0||x.compareTo(n.subtract(BigInteger.ONE))>0){throw new Error("x coordinate out of bounds")}if(y.compareTo(BigInteger.ONE)<0||y.compareTo(n.subtract(BigInteger.ONE))>0){throw new Error("y coordinate out of bounds")}if(!this.isOnCurve()){throw new Error("Point is not on the curve.")}if(this.multiply(n).isInfinity()){throw new Error("Point is not a scalar multiple of G.")}return true};module.exports=ECCurveFp;module.exports.ECPointFp=ECPointFp},{"./jsbn":63,"./sec":64}],63:[function(_dereq_,module,exports){(function(Buffer){var dbits;var canary=0xdeadbeefcafe;var j_lm=(canary&16777215)==15715070;function BigInteger(a,b,c){if(!(this instanceof BigInteger)){return new BigInteger(a,b,c)}if(a!=null){if("number"==typeof a)this.fromNumber(a,b,c);else if(b==null&&"string"!=typeof a)this.fromString(a,256);else this.fromString(a,b)}}var proto=BigInteger.prototype;function nbi(){return new BigInteger(null)}function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;c=Math.floor(v/67108864);w[j++]=v&67108863}return c}function am2(i,x,w,j,c,n){var xl=x&32767,xh=x>>15;while(--n>=0){var l=this[i]&32767;var h=this[i++]>>15;var m=xh*l+h*xl;l=xl*l+((m&32767)<<15)+w[j]+(c&1073741823);c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);w[j++]=l&1073741823}return c}function am3(i,x,w,j,c,n){var xl=x&16383,xh=x>>14;while(--n>=0){var l=this[i]&16383;var h=this[i++]>>14;var m=xh*l+h*xl;l=xl*l+((m&16383)<<14)+w[j]+c;c=(l>>28)+(m>>14)+xh*h;w[j++]=l&268435455}return c}BigInteger.prototype.am=am1;dbits=26;BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=(1<<dbits)-1;var DV=BigInteger.prototype.DV=1<<dbits;var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array;var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n)}function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return c==null?-1:c}function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t;r.s=this.s}function bnpFromInt(x){this.t=1;this.s=x<0?-1:0;if(x>0)this[0]=x;else if(x<-1)this[0]=x+DV;else this.t=0}function nbv(i){var r=nbi();r.fromInt(i);return r}function bnpFromString(s,b){var self=this;var k;if(b==16)k=4;else if(b==8)k=3;else if(b==256)k=8;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else{self.fromRadix(s,b);return}self.t=0;self.s=0;var i=s.length,mi=false,sh=0;while(--i>=0){var x=k==8?s[i]&255:intAt(s,i);if(x<0){if(s.charAt(i)=="-")mi=true;continue}mi=false;if(sh==0)self[self.t++]=x;else if(sh+k>self.DB){self[self.t-1]|=(x&(1<<self.DB-sh)-1)<<sh;self[self.t++]=x>>self.DB-sh}else self[self.t-1]|=x<<sh;sh+=k;if(sh>=self.DB)sh-=self.DB}if(k==8&&(s[0]&128)!=0){self.s=-1;if(sh>0)self[self.t-1]|=(1<<self.DB-sh)-1<<sh}self.clamp();if(mi)BigInteger.ZERO.subTo(self,self)}function bnpClamp(){var c=this.s&this.DM;while(this.t>0&&this[this.t-1]==c)--this.t}function bnToString(b){var self=this;if(self.s<0)return"-"+self.negate().toString(b);var k;if(b==16)k=4;else if(b==8)k=3;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else return self.toRadix(b);var km=(1<<k)-1,d,m=false,r="",i=self.t;var p=self.DB-i*self.DB%k;if(i-->0){if(p<self.DB&&(d=self[i]>>p)>0){m=true;r=int2char(d)}while(i>=0){if(p<k){d=(self[i]&(1<<p)-1)<<k-p;d|=self[--i]>>(p+=self.DB-k)}else{d=self[i]>>(p-=k)&km;if(p<=0){p+=self.DB;--i}}if(d>0)m=true;if(m)r+=int2char(d)}}return m?r:"0"}function bnNegate(){var r=nbi();BigInteger.ZERO.subTo(this,r);return r}function bnAbs(){return this.s<0?this.negate():this}function bnCompareTo(a){var r=this.s-a.s;if(r!=0)return r;var i=this.t;r=i-a.t;if(r!=0)return this.s<0?-r:r;while(--i>=0)if((r=this[i]-a[i])!=0)return r;return 0}function nbits(x){var r=1,t;if((t=x>>>16)!=0){x=t;r+=16}if((t=x>>8)!=0){x=t;r+=8}if((t=x>>4)!=0){x=t;r+=4}if((t=x>>2)!=0){x=t;r+=2}if((t=x>>1)!=0){x=t;r+=1}return r}function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnpDLShiftTo(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n;r.s=this.s}function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0);r.s=this.s}function bnpLShiftTo(n,r){var self=this;var bs=n%self.DB;var cbs=self.DB-bs;var bm=(1<<cbs)-1;var ds=Math.floor(n/self.DB),c=self.s<<bs&self.DM,i;for(i=self.t-1;i>=0;--i){r[i+ds+1]=self[i]>>cbs|c;c=(self[i]&bm)<<bs}for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c;r.t=self.t+ds+1;r.s=self.s;r.clamp()}function bnpRShiftTo(n,r){var self=this;r.s=self.s;var ds=Math.floor(n/self.DB);if(ds>=self.t){r.t=0;return}var bs=n%self.DB;var cbs=self.DB-bs;var bm=(1<<bs)-1;r[0]=self[ds]>>bs;for(var i=ds+1;i<self.t;++i){r[i-ds-1]|=(self[i]&bm)<<cbs;r[i-ds]=self[i]>>bs}if(bs>0)r[self.t-ds-1]|=(self.s&bm)<<cbs;r.t=self.t-ds;r.clamp()}function bnpSubTo(a,r){var self=this;var i=0,c=0,m=Math.min(a.t,self.t);while(i<m){c+=self[i]-a[i];r[i++]=c&self.DM;c>>=self.DB}if(a.t<self.t){c-=a.s;while(i<self.t){c+=self[i];r[i++]=c&self.DM;c>>=self.DB}c+=self.s}else{c+=self.s;while(i<a.t){c-=a[i];r[i++]=c&self.DM;c>>=self.DB}c-=a.s}r.s=c<0?-1:0;if(c<-1)r[i++]=self.DV+c;else if(c>0)r[i++]=c;r.t=i;r.clamp()}function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();var i=x.t;r.t=i+y.t;while(--i>=0)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0;r.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(r,r)}function bnpSquareTo(r){var x=this.abs();var i=r.t=2*x.t;while(--i>=0)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;r[i+x.t+1]=1}}if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);r.s=0;r.clamp()}function bnpDivRemTo(m,q,r){var self=this;var pm=m.abs();if(pm.t<=0)return;var pt=self.abs();if(pt.t<pm.t){if(q!=null)q.fromInt(0);if(r!=null)self.copyTo(r);return}if(r==null)r=nbi();var y=nbi(),ts=self.s,ms=m.s;var nsh=self.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y);pt.lShiftTo(nsh,r)}else{pm.copyTo(y);pt.copyTo(r)}var ys=y.t;var y0=y[ys-1];if(y0==0)return;var yt=y0*(1<<self.F1)+(ys>1?y[ys-2]>>self.F2:0);var d1=self.FV/yt,d2=(1<<self.F1)/yt,e=1<<self.F2;var i=r.t,j=i-ys,t=q==null?nbi():q;y.dlShiftTo(j,t);if(r.compareTo(t)>=0){r[r.t++]=1;r.subTo(t,r)}BigInteger.ONE.dlShiftTo(ys,t);t.subTo(y,y);while(y.t<ys)y[y.t++]=0;while(--j>=0){var qd=r[--i]==y0?self.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);r.subTo(t,r);while(r[i]<--qd)r.subTo(t,r)}}if(q!=null){r.drShiftTo(ys,q);if(ts!=ms)BigInteger.ZERO.subTo(q,q)}r.t=ys;r.clamp();if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r)}function bnMod(a){var r=nbi();this.abs().divRemTo(a,null,r);if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r);return r}function Classic(m){this.m=m}function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m);else return x}function cRevert(x){return x}function cReduce(x){x.divRemTo(this.m,null,x)}function cMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}function cSqrTo(x,r){x.squareTo(r);this.reduce(r)}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var x=this[0];if((x&1)==0)return 0;var y=x&3;y=y*(2-(x&15)*y)&15;y=y*(2-(x&255)*y)&255;y=y*(2-((x&65535)*y&65535))&65535;y=y*(2-x*y%this.DV)%this.DV;return y>0?this.DV-y:-y}function Montgomery(m){this.m=m;this.mp=m.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<m.DB-15)-1;this.mt2=2*m.t}function montConvert(x){var r=nbi();x.abs().dlShiftTo(this.m.t,r);r.divRemTo(this.m,null,r);if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r);return r}function montRevert(x){var r=nbi();x.copyTo(r);this.reduce(r);return r}function montReduce(x){while(x.t<=this.mt2)x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=x[i]&32767;var u0=j*this.mpl+((j*this.mph+(x[i]>>15)*this.mpl&this.um)<<15)&x.DM;j=i+this.m.t;x[j]+=this.m.am(0,u0,x,i,0,this.m.t);while(x[j]>=x.DV){x[j]-=x.DV;x[++j]++}}x.clamp();x.drShiftTo(this.m.t,x);if(x.compareTo(this.m)>=0)x.subTo(this.m,x)}function montSqrTo(x,r){x.squareTo(r);this.reduce(r)}function montMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return(this.t>0?this[0]&1:this.s)==0}function bnpExp(e,z){if(e>4294967295||e<1)return BigInteger.ONE;var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;g.copyTo(r);while(--i>=0){z.sqrTo(r,r2);if((e&1<<i)>0)z.mulTo(r2,g,r);else{var t=r;r=r2;r2=t}}return z.revert(r)}function bnModPowInt(e,m){var z;if(e<256||m.isEven())z=new Classic(m);else z=new Montgomery(m);return this.exp(e,z)}proto.copyTo=bnpCopyTo;proto.fromInt=bnpFromInt;proto.fromString=bnpFromString;proto.clamp=bnpClamp;proto.dlShiftTo=bnpDLShiftTo;proto.drShiftTo=bnpDRShiftTo;proto.lShiftTo=bnpLShiftTo;proto.rShiftTo=bnpRShiftTo;proto.subTo=bnpSubTo;proto.multiplyTo=bnpMultiplyTo;proto.squareTo=bnpSquareTo;proto.divRemTo=bnpDivRemTo;proto.invDigit=bnpInvDigit;proto.isEven=bnpIsEven;proto.exp=bnpExp;proto.toString=bnToString;proto.negate=bnNegate;proto.abs=bnAbs;proto.compareTo=bnCompareTo;proto.bitLength=bnBitLength;proto.mod=bnMod;proto.modPowInt=bnModPowInt;function nbi(){return new BigInteger(null)}function bnClone(){var r=nbi();this.copyTo(r);return r}function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;else if(this.t==0)return-1}else if(this.t==1)return this[0];else if(this.t==0)return 0;return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function bnByteValue(){return this.t==0?this.s:this[0]<<24>>24}function bnShortValue(){return this.t==0?this.s:this[0]<<16>>16}function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r))}function bnSigNum(){if(this.s<0)return-1;else if(this.t<=0||this.t==1&&this[0]<=0)return 0;else return 1}function bnpToRadix(b){if(b==null)b=10;if(this.signum()==0||b<2||b>36)return"0";var cs=this.chunkSize(b);var a=Math.pow(b,cs);var d=nbv(a),y=nbi(),z=nbi(),r="";this.divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y.divRemTo(d,y,z)}return z.intValue().toString(b)+r}function bnpFromRadix(s,b){var self=this;self.fromInt(0);if(b==null)b=10;var cs=self.chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&self.signum()==0)mi=true;continue}w=b*w+x;if(++j>=cs){self.dMultiply(d);self.dAddOffset(w,0);j=0;w=0}}if(j>0){self.dMultiply(Math.pow(b,j));self.dAddOffset(w,0)}if(mi)BigInteger.ZERO.subTo(self,self)}function bnpFromNumber(a,b,c){var self=this;if("number"==typeof b){if(a<2)self.fromInt(1);else{self.fromNumber(a,c);if(!self.testBit(a-1))self.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,self);if(self.isEven())self.dAddOffset(1,0);while(!self.isProbablePrime(b)){self.dAddOffset(2,0);if(self.bitLength()>a)self.subTo(BigInteger.ONE.shiftLeft(a-1),self)}}}else{var t=a&7;var length=(a>>3)+1;var x=b(length,{array:true});if(t>0)x[0]&=(1<<t)-1;else x[0]=0;self.fromString(x,256)}}function bnToByteArray(){var self=this;var i=self.t,r=new Array;r[0]=self.s;var p=self.DB-i*self.DB%8,d,k=0;if(i-->0){if(p<self.DB&&(d=self[i]>>p)!=(self.s&self.DM)>>p)r[k++]=d|self.s<<self.DB-p;while(i>=0){if(p<8){d=(self[i]&(1<<p)-1)<<8-p;d|=self[--i]>>(p+=self.DB-8)}else{d=self[i]>>(p-=8)&255;if(p<=0){p+=self.DB;--i}}if((d&128)!=0)d|=-256;if(k===0&&(self.s&128)!=(d&128))++k;if(k>0||d!=self.s)r[k++]=d}}return r}function bnEquals(a){return this.compareTo(a)==0}function bnMin(a){return this.compareTo(a)<0?this:a}function bnMax(a){return this.compareTo(a)>0?this:a}function bnpBitwiseTo(a,op,r){var self=this;var i,f,m=Math.min(a.t,self.t);for(i=0;i<m;++i)r[i]=op(self[i],a[i]);if(a.t<self.t){f=a.s&self.DM;for(i=m;i<self.t;++i)r[i]=op(self[i],f);r.t=self.t}else{f=self.s&self.DM;for(i=m;i<a.t;++i)r[i]=op(f,a[i]);r.t=a.t}r.s=op(self.s,a.s);r.clamp()}function op_and(x,y){return x&y}function bnAnd(a){var r=nbi();this.bitwiseTo(a,op_and,r);return r}function op_or(x,y){return x|y}function bnOr(a){var r=nbi();this.bitwiseTo(a,op_or,r);return r}function op_xor(x,y){return x^y}function bnXor(a){var r=nbi();this.bitwiseTo(a,op_xor,r);return r}function op_andnot(x,y){return x&~y}function bnAndNot(a){var r=nbi();this.bitwiseTo(a,op_andnot,r);return r}function bnNot(){var r=nbi();for(var i=0;i<this.t;++i)r[i]=this.DM&~this[i];r.t=this.t;r.s=~this.s;return r}function bnShiftLeft(n){var r=nbi();if(n<0)this.rShiftTo(-n,r);else this.lShiftTo(n,r);return r}function bnShiftRight(n){var r=nbi();if(n<0)this.lShiftTo(-n,r);else this.rShiftTo(n,r);return r}function lbit(x){if(x==0)return-1;var r=0;if((x&65535)==0){x>>=16;r+=16}if((x&255)==0){x>>=8;r+=8}if((x&15)==0){x>>=4;r+=4}if((x&3)==0){x>>=2;r+=2}if((x&1)==0)++r;return r}function bnGetLowestSetBit(){for(var i=0;i<this.t;++i)if(this[i]!=0)return i*this.DB+lbit(this[i]);if(this.s<0)return this.t*this.DB;return-1}function cbit(x){var r=0;while(x!=0){x&=x-1;++r}return r}function bnBitCount(){var r=0,x=this.s&this.DM;for(var i=0;i<this.t;++i)r+=cbit(this[i]^x);return r}function bnTestBit(n){var j=Math.floor(n/this.DB);if(j>=this.t)return this.s!=0;return(this[j]&1<<n%this.DB)!=0}function bnpChangeBit(n,op){var r=BigInteger.ONE.shiftLeft(n);this.bitwiseTo(r,op,r);return r}function bnSetBit(n){return this.changeBit(n,op_or)}function bnClearBit(n){return this.changeBit(n,op_andnot)}function bnFlipBit(n){return this.changeBit(n,op_xor)}function bnpAddTo(a,r){var self=this;var i=0,c=0,m=Math.min(a.t,self.t);while(i<m){c+=self[i]+a[i];r[i++]=c&self.DM;c>>=self.DB}if(a.t<self.t){c+=a.s;while(i<self.t){c+=self[i];r[i++]=c&self.DM;c>>=self.DB}c+=self.s}else{c+=self.s;while(i<a.t){c+=a[i];r[i++]=c&self.DM;c>>=self.DB}c+=a.s}r.s=c<0?-1:0;if(c>0)r[i++]=c;else if(c<-1)r[i++]=self.DV+c;r.t=i;r.clamp()}function bnAdd(a){var r=nbi();this.addTo(a,r);return r}function bnSubtract(a){var r=nbi();this.subTo(a,r);return r}function bnMultiply(a){var r=nbi();this.multiplyTo(a,r);return r}function bnSquare(){var r=nbi();this.squareTo(r);return r}function bnDivide(a){var r=nbi();this.divRemTo(a,r,null);return r}function bnRemainder(a){var r=nbi();this.divRemTo(a,null,r);return r}function bnDivideAndRemainder(a){var q=nbi(),r=nbi();this.divRemTo(a,q,r);return new Array(q,r)}function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp()}function bnpDAddOffset(n,w){if(n==0)return;while(this.t<=w)this[this.t++]=0;this[w]+=n;while(this[w]>=this.DV){this[w]-=this.DV;if(++w>=this.t)this[this.t++]=0;++this[w]}}function NullExp(){}function nNop(x){return x}function nMulTo(x,y,r){x.multiplyTo(y,r)}function nSqrTo(x,r){x.squareTo(r)}NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(e){return this.exp(e,new NullExp)}function bnpMultiplyLowerTo(a,n,r){var i=Math.min(this.t+a.t,n);r.s=0;r.t=i;while(i>0)r[--i]=0;var j;for(j=r.t-this.t;i<j;++i)r[i+this.t]=this.am(0,a[i],r,i,0,this.t);for(j=Math.min(a.t,n);i<j;++i)this.am(0,a[i],r,i,0,n-i);r.clamp()}function bnpMultiplyUpperTo(a,n,r){--n;var i=r.t=this.t+a.t-n;r.s=0;while(--i>=0)r[i]=0;for(i=Math.max(n-this.t,0);i<a.t;++i)r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n);r.clamp();r.drShiftTo(1,r)}function Barrett(m){this.r2=nbi();this.q3=nbi();BigInteger.ONE.dlShiftTo(2*m.t,this.r2);this.mu=this.r2.divide(m);this.m=m}function barrettConvert(x){if(x.s<0||x.t>2*this.m.t)return x.mod(this.m);else if(x.compareTo(this.m)<0)return x;else{var r=nbi();x.copyTo(r);this.reduce(r);return r}}function barrettRevert(x){return x}function barrettReduce(x){var self=this;x.drShiftTo(self.m.t-1,self.r2);if(x.t>self.m.t+1){x.t=self.m.t+1;x.clamp()}self.mu.multiplyUpperTo(self.r2,self.m.t+1,self.q3);self.m.multiplyLowerTo(self.q3,self.m.t+1,self.r2);while(x.compareTo(self.r2)<0)x.dAddOffset(1,self.m.t+1);x.subTo(self.r2,x);while(x.compareTo(self.m)>=0)x.subTo(self.m,x)}function barrettSqrTo(x,r){x.squareTo(r);this.reduce(r)}function barrettMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}Barrett.prototype.convert=barrettConvert;Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;function bnModPow(e,m){var i=e.bitLength(),k,r=nbv(1),z;if(i<=0)return r;else if(i<18)k=1;else if(i<48)k=3;else if(i<144)k=4;else if(i<768)k=5;else k=6;if(i<8)z=new Classic(m);else if(m.isEven())z=new Barrett(m);else z=new Montgomery(m);var g=new Array,n=3,k1=k-1,km=(1<<k)-1;g[1]=z.convert(this);if(k>1){var g2=nbi();z.sqrTo(g[1],g2);while(n<=km){g[n]=nbi();z.mulTo(g2,g[n-2],g[n]);n+=2}}var j=e.t-1,w,is1=true,r2=nbi(),t;i=nbits(e[j])-1;while(j>=0){if(i>=k1)w=e[j]>>i-k1&km;else{w=(e[j]&(1<<i+1)-1)<<k1-i;if(j>0)w|=e[j-1]>>this.DB+i-k1}n=k;while((w&1)==0){w>>=1;--n}if((i-=n)<0){i+=this.DB;--j}if(is1){g[w].copyTo(r);is1=false}else{while(n>1){z.sqrTo(r,r2);z.sqrTo(r2,r);n-=2}if(n>0)z.sqrTo(r,r2);else{t=r;r=r2;r2=t}z.mulTo(r2,g[w],r)}while(j>=0&&(e[j]&1<<i)==0){z.sqrTo(r,r2);t=r;r=r2;r2=t;if(--i<0){i=this.DB-1;--j}}}return z.revert(r)}function bnGCD(a){var x=this.s<0?this.negate():this.clone();var y=a.s<0?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y;y=t}var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0)return x;if(i<g)g=i;if(g>0){x.rShiftTo(g,x);y.rShiftTo(g,y)}while(x.signum()>0){if((i=x.getLowestSetBit())>0)x.rShiftTo(i,x);if((i=y.getLowestSetBit())>0)y.rShiftTo(i,y);if(x.compareTo(y)>=0){x.subTo(y,x);x.rShiftTo(1,x)}else{y.subTo(x,y);y.rShiftTo(1,y)}}if(g>0)y.lShiftTo(g,y);return y}function bnpModInt(n){if(n<=0)return 0;var d=this.DV%n,r=this.s<0?n-1:0;if(this.t>0)if(d==0)r=this[0]%n;else for(var i=this.t-1;i>=0;--i)r=(d*r+this[i])%n;return r}function bnModInverse(m){var ac=m.isEven();if(this.isEven()&&ac||m.signum()==0)return BigInteger.ZERO;var u=m.clone(),v=this.clone();var a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1);while(u.signum()!=0){while(u.isEven()){u.rShiftTo(1,u);if(ac){if(!a.isEven()||!b.isEven()){a.addTo(this,a);b.subTo(m,b)}a.rShiftTo(1,a)}else if(!b.isEven())b.subTo(m,b);b.rShiftTo(1,b)}while(v.isEven()){v.rShiftTo(1,v);if(ac){if(!c.isEven()||!d.isEven()){c.addTo(this,c);d.subTo(m,d)}c.rShiftTo(1,c)}else if(!d.isEven())d.subTo(m,d);d.rShiftTo(1,d)}if(u.compareTo(v)>=0){u.subTo(v,u);if(ac)a.subTo(c,a);b.subTo(d,b)}else{v.subTo(u,v);if(ac)c.subTo(a,c);d.subTo(b,d)}}if(v.compareTo(BigInteger.ONE)!=0)return BigInteger.ZERO;if(d.compareTo(m)>=0)return d.subtract(m);if(d.signum()<0)d.addTo(m,d);else return d;if(d.signum()<0)return d.add(m);else return d}proto.chunkSize=bnpChunkSize;proto.toRadix=bnpToRadix;proto.fromRadix=bnpFromRadix;proto.fromNumber=bnpFromNumber;proto.bitwiseTo=bnpBitwiseTo;proto.changeBit=bnpChangeBit;proto.addTo=bnpAddTo;proto.dMultiply=bnpDMultiply;proto.dAddOffset=bnpDAddOffset;proto.multiplyLowerTo=bnpMultiplyLowerTo;proto.multiplyUpperTo=bnpMultiplyUpperTo;proto.modInt=bnpModInt;proto.clone=bnClone;proto.intValue=bnIntValue;proto.byteValue=bnByteValue;proto.shortValue=bnShortValue;proto.signum=bnSigNum;proto.toByteArray=bnToByteArray;proto.equals=bnEquals;proto.min=bnMin;proto.max=bnMax;proto.and=bnAnd;proto.or=bnOr;proto.xor=bnXor;proto.andNot=bnAndNot;proto.not=bnNot;proto.shiftLeft=bnShiftLeft;proto.shiftRight=bnShiftRight;proto.getLowestSetBit=bnGetLowestSetBit;proto.bitCount=bnBitCount;proto.testBit=bnTestBit;proto.setBit=bnSetBit;proto.clearBit=bnClearBit;proto.flipBit=bnFlipBit;proto.add=bnAdd;proto.subtract=bnSubtract;proto.multiply=bnMultiply;proto.divide=bnDivide;proto.remainder=bnRemainder;proto.divideAndRemainder=bnDivideAndRemainder;proto.modPow=bnModPow;proto.modInverse=bnModInverse;proto.pow=bnPow;proto.gcd=bnGCD;proto.square=bnSquare;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);BigInteger.valueOf=nbv;BigInteger.fromByteArrayUnsigned=function(ba){if(Buffer.isBuffer(ba)){ba=Array.prototype.map.bind(ba,function(x){return x})()}if(!ba.length){return new BigInteger.valueOf(0)}else if(ba[0]&128){return new BigInteger([0].concat(ba))}else{return new BigInteger(ba)}};BigInteger.fromByteArraySigned=function(ba){if(ba[0]&128){ba[0]&=127;return BigInteger.fromByteArrayUnsigned(ba).negate()}else{return BigInteger.fromByteArrayUnsigned(ba)}};BigInteger.prototype.toByteArrayUnsigned=function(){var ba=this.abs().toByteArray();if(!ba.length){return ba}if(ba[0]===0){ba=ba.slice(1)}for(var i=0;i<ba.length;++i){ba[i]=ba[i]<0?ba[i]+256:ba[i]}return ba};BigInteger.prototype.toByteArraySigned=function(){var val=this.toByteArrayUnsigned();var neg=this.s<0;if(val[0]&128){val.unshift(neg?128:0)}else if(neg){val[0]|=128}return val};module.exports=BigInteger}).call(this,_dereq_("buffer").Buffer)},{buffer:5}],64:[function(_dereq_,module,exports){var ECCurveFp=_dereq_("./ec");var BigInteger=_dereq_("./jsbn");function X9ECParameters(curve,g,n,h){this.curve=curve;this.g=g;this.n=n;this.h=h}function x9getCurve(){return this.curve}function x9getG(){return this.g}function x9getN(){return this.n}function x9getH(){return this.h}X9ECParameters.prototype.getCurve=x9getCurve;X9ECParameters.prototype.getG=x9getG;X9ECParameters.prototype.getN=x9getN;X9ECParameters.prototype.getH=x9getH;function fromHex(s){return new BigInteger(s,16)}function secp128r1(){var p=fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF");var a=fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC");var b=fromHex("E87579C11079F43DD824993C2CEE5ED3");var n=fromHex("FFFFFFFE0000000075A30D1B9038A115");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"161FF7528B899B2D0C28607CA52C5B86"+"CF5AC8395BAFEB13C02DA292DDED7A83");return new X9ECParameters(curve,G,n,h)}function secp160k1(){var p=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73");var a=BigInteger.ZERO;var b=fromHex("7");var n=fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"3B4C382CE37AA192A4019E763036F4F5DD4D7EBB"+"938CF935318FDCED6BC28286531733C3F03C4FEE");return new X9ECParameters(curve,G,n,h)}function secp160r1(){var p=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF");var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC");var b=fromHex("1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45");var n=fromHex("0100000000000000000001F4C8F927AED3CA752257");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"4A96B5688EF573284664698968C38BB913CBFC82"+"23A628553168947D59DCC912042351377AC5FB32");return new X9ECParameters(curve,G,n,h)}function secp192k1(){var p=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37");var a=BigInteger.ZERO;var b=fromHex("3");var n=fromHex("FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D"+"9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D");return new X9ECParameters(curve,G,n,h)}function secp192r1(){var p=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF");var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC");var b=fromHex("64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1");var n=fromHex("FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012"+"07192B95FFC8DA78631011ED6B24CDD573F977A11E794811");return new X9ECParameters(curve,G,n,h)}function secp224r1(){var p=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001");var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE");var b=fromHex("B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4");var n=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21"+"BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34");return new X9ECParameters(curve,G,n,h)}function secp256k1(){var p=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");var a=BigInteger.ZERO;var b=fromHex("7");var n=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798"+"483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");return new X9ECParameters(curve,G,n,h)}function secp256r1(){var p=fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF");var a=fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC");var b=fromHex("5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B");var n=fromHex("FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551");var h=BigInteger.ONE;var curve=new ECCurveFp(p,a,b);var G=curve.decodePointHex("04"+"6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296"+"4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5");return new X9ECParameters(curve,G,n,h)}function getSECCurveByName(name){if(name=="secp128r1")return secp128r1();if(name=="secp160k1")return secp160k1();if(name=="secp160r1")return secp160r1();if(name=="secp192k1")return secp192k1();if(name=="secp192r1")return secp192r1();if(name=="secp224r1")return secp224r1();if(name=="secp256k1")return secp256k1();if(name=="secp256r1")return secp256r1();return null}module.exports=getSECCurveByName},{"./ec":62,"./jsbn":63}],65:[function(_dereq_,module,exports){var Address=_dereq_("./address");var convert=_dereq_("./convert");var ecdsa=_dereq_("./ecdsa");var ECPubKey=_dereq_("./eckey").ECPubKey;var SHA256=_dereq_("crypto-js/sha256");var magicBytes=convert.stringToBytes("Bitcoin Signed Message:\n");function magicHash(message){var messageBytes=convert.stringToBytes(message);var buffer=[].concat(convert.numToVarInt(magicBytes.length),magicBytes,convert.numToVarInt(messageBytes.length),messageBytes);
return convert.wordArrayToBytes(SHA256(SHA256(convert.bytesToWordArray(buffer))))}function sign(key,message){var hash=magicHash(message);var sig=key.sign(hash);var obj=ecdsa.parseSig(sig);var i=ecdsa.calcPubKeyRecoveryParam(key.getPub().pub,obj.r,obj.s,hash);i+=27;if(key.compressed){i+=4}var rBa=obj.r.toByteArrayUnsigned();var sBa=obj.s.toByteArrayUnsigned();while(rBa.length<32)rBa.unshift(0);while(sBa.length<32)sBa.unshift(0);sig=[i].concat(rBa,sBa);return sig}function verify(address,sig,message){sig=ecdsa.parseSigCompact(sig);var pubKey=new ECPubKey(ecdsa.recoverPubKey(sig.r,sig.s,magicHash(message),sig.i));var isCompressed=!!(sig.i&4);pubKey.compressed=isCompressed;address=new Address(address);return pubKey.getAddress(address.version).toString()===address.toString()}module.exports={magicHash:magicHash,sign:sign,verify:verify}},{"./address":54,"./convert":57,"./ecdsa":58,"./eckey":59,"crypto-js/sha256":47}],66:[function(_dereq_,module,exports){module.exports={mainnet:{addressVersion:0,p2shVersion:5,hdVersions:{pub:76067358,priv:76066276}},testnet:{addressVersion:111,p2shVersion:196,hdVersions:{pub:70617039,priv:70615956}}}},{}],67:[function(_dereq_,module,exports){var Opcode={map:{OP_0:0,OP_FALSE:0,OP_PUSHDATA1:76,OP_PUSHDATA2:77,OP_PUSHDATA4:78,OP_1NEGATE:79,OP_RESERVED:80,OP_1:81,OP_TRUE:81,OP_2:82,OP_3:83,OP_4:84,OP_5:85,OP_6:86,OP_7:87,OP_8:88,OP_9:89,OP_10:90,OP_11:91,OP_12:92,OP_13:93,OP_14:94,OP_15:95,OP_16:96,OP_NOP:97,OP_VER:98,OP_IF:99,OP_NOTIF:100,OP_VERIF:101,OP_VERNOTIF:102,OP_ELSE:103,OP_ENDIF:104,OP_VERIFY:105,OP_RETURN:106,OP_TOALTSTACK:107,OP_FROMALTSTACK:108,OP_2DROP:109,OP_2DUP:110,OP_3DUP:111,OP_2OVER:112,OP_2ROT:113,OP_2SWAP:114,OP_IFDUP:115,OP_DEPTH:116,OP_DROP:117,OP_DUP:118,OP_NIP:119,OP_OVER:120,OP_PICK:121,OP_ROLL:122,OP_ROT:123,OP_SWAP:124,OP_TUCK:125,OP_CAT:126,OP_SUBSTR:127,OP_LEFT:128,OP_RIGHT:129,OP_SIZE:130,OP_INVERT:131,OP_AND:132,OP_OR:133,OP_XOR:134,OP_EQUAL:135,OP_EQUALVERIFY:136,OP_RESERVED1:137,OP_RESERVED2:138,OP_1ADD:139,OP_1SUB:140,OP_2MUL:141,OP_2DIV:142,OP_NEGATE:143,OP_ABS:144,OP_NOT:145,OP_0NOTEQUAL:146,OP_ADD:147,OP_SUB:148,OP_MUL:149,OP_DIV:150,OP_MOD:151,OP_LSHIFT:152,OP_RSHIFT:153,OP_BOOLAND:154,OP_BOOLOR:155,OP_NUMEQUAL:156,OP_NUMEQUALVERIFY:157,OP_NUMNOTEQUAL:158,OP_LESSTHAN:159,OP_GREATERTHAN:160,OP_LESSTHANOREQUAL:161,OP_GREATERTHANOREQUAL:162,OP_MIN:163,OP_MAX:164,OP_WITHIN:165,OP_RIPEMD160:166,OP_SHA1:167,OP_SHA256:168,OP_HASH160:169,OP_HASH256:170,OP_CODESEPARATOR:171,OP_CHECKSIG:172,OP_CHECKSIGVERIFY:173,OP_CHECKMULTISIG:174,OP_CHECKMULTISIGVERIFY:175,OP_NOP1:176,OP_NOP2:177,OP_NOP3:178,OP_NOP4:179,OP_NOP5:180,OP_NOP6:181,OP_NOP7:182,OP_NOP8:183,OP_NOP9:184,OP_NOP10:185,OP_PUBKEYHASH:253,OP_PUBKEY:254,OP_INVALIDOPCODE:255},reverseMap:[]};for(var i in Opcode.map){Opcode.reverseMap[Opcode.map[i]]=i}module.exports=Opcode},{}],68:[function(_dereq_,module,exports){(function(Buffer){var Opcode=_dereq_("./opcode");var util=_dereq_("./util");var convert=_dereq_("./convert");var Address=_dereq_("./address");var network=_dereq_("./network");var Script=function(data){this.buffer=data||[];if(!Array.isArray(this.buffer)){throw new Error("expect Script to be initialized with Array, but got "+data)}this.parse()};Script.fromHex=function(data){return new Script(convert.hexToBytes(data))};Script.fromPubKey=function(str){var script=new Script;var s=str.split(" ");for(var i in s){if(Opcode.map.hasOwnProperty(s[i])){script.writeOp(Opcode.map[s[i]])}else{script.writeBytes(convert.hexToBytes(s[i]))}}return script};Script.fromScriptSig=function(str){var script=new Script;var s=str.split(" ");for(var i in s){if(Opcode.map.hasOwnProperty(s[i])){script.writeOp(Opcode.map[s[i]])}else{script.writeBytes(convert.hexToBytes(s[i]))}}return script};Script.prototype.parse=function(){var self=this;this.chunks=[];var i=0;function readChunk(n){self.chunks.push(self.buffer.slice(i,i+n));i+=n}while(i<this.buffer.length){var opcode=this.buffer[i++];if(opcode>=240){opcode=opcode<<8|this.buffer[i++]}var len;if(opcode>0&&opcode<Opcode.map.OP_PUSHDATA1){readChunk(opcode)}else if(opcode==Opcode.map.OP_PUSHDATA1){len=this.buffer[i++];readChunk(len)}else if(opcode==Opcode.map.OP_PUSHDATA2){len=this.buffer[i++]<<8|this.buffer[i++];readChunk(len)}else if(opcode==Opcode.map.OP_PUSHDATA4){len=this.buffer[i++]<<24|this.buffer[i++]<<16|this.buffer[i++]<<8|this.buffer[i++];readChunk(len)}else{this.chunks.push(opcode)}}};Script.prototype.getOutType=function(){if(this.chunks[this.chunks.length-1]==Opcode.map.OP_EQUAL&&this.chunks[0]==Opcode.map.OP_HASH160&&this.chunks.length==3){return"P2SH"}else if(this.chunks.length==5&&this.chunks[0]==Opcode.map.OP_DUP&&this.chunks[1]==Opcode.map.OP_HASH160&&this.chunks[3]==Opcode.map.OP_EQUALVERIFY&&this.chunks[4]==Opcode.map.OP_CHECKSIG){return"Pubkey"}else{return"Strange"}};Script.prototype.toScriptHash=function(){var outType=this.getOutType();if(outType=="Pubkey"){return this.chunks[2]}if(outType=="P2SH"){return util.sha256ripe160(this.buffer)}return util.sha256ripe160(this.buffer)};Script.prototype.getToAddress=function(){var outType=this.getOutType();if(outType=="Pubkey"){return new Address(this.chunks[2])}if(outType=="P2SH"){return new Address(this.chunks[1],5)}return new Address(this.chunks[1],5)};Script.prototype.getFromAddress=function(){return new Address(this.simpleInHash())};Script.prototype.getInType=function(){if(this.chunks.length==1&&Array.isArray(this.chunks[0])){return"Pubkey"}else if(this.chunks.length==2&&Array.isArray(this.chunks[0])&&Array.isArray(this.chunks[1])){return"Address"}else if(this.chunks[0]==Opcode.map.OP_0&&this.chunks.slice(1).reduce(function(t,chunk,i){return t&&Array.isArray(chunk)&&(chunk[0]==48||i==this.chunks.length-1)},true)){return"Multisig"}else{return"Strange"}};Script.prototype.simpleInPubKey=function(){switch(this.getInType()){case"Address":return this.chunks[1];case"Pubkey":throw new Error("Script does not contain pubkey");default:throw new Error("Encountered non-standard scriptSig")}};Script.prototype.simpleInHash=function(){return util.sha256ripe160(this.simpleInPubKey())};Script.prototype.simpleInPubKeyHash=Script.prototype.simpleInHash;Script.prototype.writeOp=function(opcode){this.buffer.push(opcode);this.chunks.push(opcode)};Script.prototype.writeBytes=function(data){if(Buffer.isBuffer(data)){data=Array.prototype.map.bind(data,function(x){return x})()}if(data.length<Opcode.map.OP_PUSHDATA1){this.buffer.push(data.length)}else if(data.length<=255){this.buffer.push(Opcode.map.OP_PUSHDATA1);this.buffer.push(data.length)}else if(data.length<=65535){this.buffer.push(Opcode.map.OP_PUSHDATA2);this.buffer.push(data.length&255);this.buffer.push(data.length>>>8&255)}else{this.buffer.push(Opcode.map.OP_PUSHDATA4);this.buffer.push(data.length&255);this.buffer.push(data.length>>>8&255);this.buffer.push(data.length>>>16&255);this.buffer.push(data.length>>>24&255)}this.buffer=this.buffer.concat(data);this.chunks.push(data)};Script.createOutputScript=function(address){var script=new Script;address=new Address(address);if(address.version==network.mainnet.p2shVersion||address.version==network.testnet.p2shVersion){script.writeOp(Opcode.map.OP_HASH160);script.writeBytes(address.hash);script.writeOp(Opcode.map.OP_EQUAL)}else{script.writeOp(Opcode.map.OP_DUP);script.writeOp(Opcode.map.OP_HASH160);script.writeBytes(address.hash);script.writeOp(Opcode.map.OP_EQUALVERIFY);script.writeOp(Opcode.map.OP_CHECKSIG)}return script};Script.prototype.extractPubkeys=function(){return this.chunks.filter(function(chunk){return chunk[0]==4&&chunk.length==65||chunk[0]<4&&chunk.length==33})};Script.createMultiSigOutputScript=function(m,pubkeys){var script=new Script;pubkeys=pubkeys.sort();script.writeOp(Opcode.map.OP_1+m-1);for(var i=0;i<pubkeys.length;++i){script.writeBytes(pubkeys[i])}script.writeOp(Opcode.map.OP_1+pubkeys.length-1);script.writeOp(Opcode.map.OP_CHECKMULTISIG);return script};Script.createInputScript=function(signature,pubKey){var script=new Script;script.writeBytes(signature);script.writeBytes(pubKey);return script};Script.createMultiSigInputScript=function(signatures,script){script=new Script(script);var k=script.chunks[0][0];if(signatures.length<k)return false;var inScript=new Script;inScript.writeOp(Opcode.map.OP_0);signatures.map(function(sig){inScript.writeBytes(sig)});inScript.writeBytes(script.buffer);return inScript};Script.prototype.clone=function(){return new Script(this.buffer)};module.exports=Script}).call(this,_dereq_("buffer").Buffer)},{"./address":54,"./convert":57,"./network":66,"./opcode":67,"./util":70,buffer:5}],69:[function(_dereq_,module,exports){var BigInteger=_dereq_("./jsbn/jsbn");var Script=_dereq_("./script");var util=_dereq_("./util");var convert=_dereq_("./convert");var ECKey=_dereq_("./eckey").ECKey;var ECDSA=_dereq_("./ecdsa");var Address=_dereq_("./address");var SHA256=_dereq_("crypto-js/sha256");var Transaction=function(doc){if(!(this instanceof Transaction)){return new Transaction(doc)}this.version=1;this.locktime=0;this.ins=[];this.outs=[];this.defaultSequence=[255,255,255,255];if(doc){if(typeof doc=="string"||Array.isArray(doc)){doc=Transaction.deserialize(doc)}if(doc.hash)this.hash=doc.hash;if(doc.version)this.version=doc.version;if(doc.locktime)this.locktime=doc.locktime;if(doc.ins&&doc.ins.length){doc.ins.forEach(function(input){this.addInput(new TransactionIn(input))},this)}if(doc.outs&&doc.outs.length){doc.outs.forEach(function(output){this.addOutput(new TransactionOut(output))},this)}this.hash=this.hash||this.getHash()}};Transaction.prototype.addInput=function(tx,outIndex){if(arguments[0]instanceof TransactionIn){this.ins.push(arguments[0])}else if(arguments[0].length>65){var args=arguments[0].split(":");return this.addInput(args[0],args[1])}else{var hash=typeof tx==="string"?tx:tx.hash;hash=Array.isArray(hash)?convert.bytesToHex(hash):hash;this.ins.push(new TransactionIn({outpoint:{hash:hash,index:outIndex},script:new Script,sequence:this.defaultSequence}))}};Transaction.prototype.addOutput=function(address,value){if(arguments[0]instanceof TransactionOut){this.outs.push(arguments[0]);return}if(arguments[0].indexOf(":")>=0){var args=arguments[0].split(":");address=args[0];value=parseInt(args[1])}this.outs.push(new TransactionOut({value:value,script:Script.createOutputScript(address)}))};Transaction.prototype.serialize=function(){var buffer=[];buffer=buffer.concat(convert.numToBytes(parseInt(this.version),4));buffer=buffer.concat(convert.numToVarInt(this.ins.length));this.ins.forEach(function(txin){buffer=buffer.concat(convert.hexToBytes(txin.outpoint.hash).reverse());buffer=buffer.concat(convert.numToBytes(parseInt(txin.outpoint.index),4));var scriptBytes=txin.script.buffer;buffer=buffer.concat(convert.numToVarInt(scriptBytes.length));buffer=buffer.concat(scriptBytes);buffer=buffer.concat(txin.sequence)});buffer=buffer.concat(convert.numToVarInt(this.outs.length));this.outs.forEach(function(txout){buffer=buffer.concat(convert.numToBytes(txout.value,8));var scriptBytes=txout.script.buffer;buffer=buffer.concat(convert.numToVarInt(scriptBytes.length));buffer=buffer.concat(scriptBytes)});buffer=buffer.concat(convert.numToBytes(parseInt(this.locktime),4));return buffer};Transaction.prototype.serializeHex=function(){return convert.bytesToHex(this.serialize())};var SIGHASH_ALL=1;var SIGHASH_NONE=2;var SIGHASH_SINGLE=3;var SIGHASH_ANYONECANPAY=80;Transaction.prototype.hashTransactionForSignature=function(connectedScript,inIndex,hashType){var txTmp=this.clone();txTmp.ins.forEach(function(txin){txin.script=new Script});txTmp.ins[inIndex].script=connectedScript;if((hashType&31)==SIGHASH_NONE){txTmp.outs=[];txTmp.ins.forEach(function(txin,i){if(i!=inIndex){txTmp.ins[i].sequence=0}})}else if((hashType&31)==SIGHASH_SINGLE){}if(hashType&SIGHASH_ANYONECANPAY){txTmp.ins=[txTmp.ins[inIndex]]}var buffer=txTmp.serialize();buffer=buffer.concat(convert.numToBytes(parseInt(hashType),4));buffer=convert.bytesToWordArray(buffer);return convert.wordArrayToBytes(SHA256(SHA256(buffer)))};Transaction.prototype.getHash=function(){var buffer=convert.bytesToWordArray(this.serialize());return convert.wordArrayToBytes(SHA256(SHA256(buffer))).reverse()};Transaction.prototype.clone=function(){var newTx=new Transaction;newTx.version=this.version;newTx.locktime=this.locktime;this.ins.forEach(function(txin){newTx.addInput(txin.clone())});this.outs.forEach(function(txout){newTx.addOutput(txout.clone())});return newTx};Transaction.deserialize=function(buffer){if(typeof buffer=="string"){buffer=convert.hexToBytes(buffer)}var pos=0;var readAsInt=function(bytes){if(bytes===0)return 0;pos++;return buffer[pos-1]+readAsInt(bytes-1)*256};var readVarInt=function(){var bytes=buffer.slice(pos,pos+9);var result=convert.varIntToNum(bytes);pos+=result.bytes.length;return result.number};var readBytes=function(bytes){pos+=bytes;return buffer.slice(pos-bytes,pos)};var readVarString=function(){var size=readVarInt();return readBytes(size)};var obj={ins:[],outs:[]};obj.version=readAsInt(4);var ins=readVarInt();var i;for(i=0;i<ins;i++){obj.ins.push({outpoint:{hash:convert.bytesToHex(readBytes(32).reverse()),index:readAsInt(4)},script:new Script(readVarString()),sequence:readBytes(4)})}var outs=readVarInt();for(i=0;i<outs;i++){obj.outs.push({value:convert.bytesToNum(readBytes(8)),script:new Script(readVarString())})}obj.locktime=readAsInt(4);return new Transaction(obj)};Transaction.prototype.sign=function(index,key,type){type=type||SIGHASH_ALL;key=new ECKey(key);var pub=key.getPub().toBytes(),hash160=util.sha256ripe160(pub),script=Script.createOutputScript(new Address(hash160)),hash=this.hashTransactionForSignature(script,index,type),sig=key.sign(hash).concat([type]);this.ins[index].script=Script.createInputScript(sig,pub)};Transaction.prototype.signWithKeys=function(keys,outputs,type){type=type||SIGHASH_ALL;var addrdata=keys.map(function(key){key=new ECKey(key);return{key:key,address:key.getAddress().toString()}});var hmap={};outputs.forEach(function(o){hmap[o.output]=o});for(var i=0;i<this.ins.length;i++){var outpoint=this.ins[i].outpoint.hash+":"+this.ins[i].outpoint.index;var histItem=hmap[outpoint];if(!histItem)continue;var thisInputAddrdata=addrdata.filter(function(a){return a.address==histItem.address});if(thisInputAddrdata.length===0)continue;this.sign(i,thisInputAddrdata[0].key)}};Transaction.prototype.p2shsign=function(index,script,key,type){script=new Script(script);key=new ECKey(key);type=type||SIGHASH_ALL;var hash=this.hashTransactionForSignature(script,index,type),sig=key.sign(hash).concat([type]);return sig};Transaction.prototype.multisign=Transaction.prototype.p2shsign;Transaction.prototype.applyMultisigs=function(index,script,sigs){this.ins[index].script=Script.createMultiSigInputScript(sigs,script)};Transaction.prototype.validateSig=function(index,script,sig,pub){script=new Script(script);var hash=this.hashTransactionForSignature(script,index,1);return ECDSA.verify(hash,convert.coerceToBytes(sig),convert.coerceToBytes(pub))};Transaction.feePerKb=2e4;Transaction.prototype.estimateFee=function(feePerKb){var uncompressedInSize=180;var outSize=34;var fixedPadding=34;if(feePerKb==undefined)feePerKb=Transaction.feePerKb;var size=this.ins.length*uncompressedInSize+this.outs.length*outSize+fixedPadding;return feePerKb*Math.ceil(size/1e3)};var TransactionIn=function(data){if(typeof data=="string"){this.outpoint={hash:data.split(":")[0],index:data.split(":")[1]}}else if(data.outpoint){this.outpoint=data.outpoint}else{this.outpoint={hash:data.hash,index:data.index}}if(data.scriptSig){this.script=Script.fromScriptSig(data.scriptSig)}else if(data.script){this.script=data.script}else{this.script=new Script(data.script)}this.sequence=data.sequence||this.defaultSequence};TransactionIn.prototype.clone=function(){return new TransactionIn({outpoint:{hash:this.outpoint.hash,index:this.outpoint.index},script:this.script.clone(),sequence:this.sequence})};var TransactionOut=function(data){this.script=data.script instanceof Script?data.script.clone():Array.isArray(data.script)?new Script(data.script):typeof data.script=="string"?new Script(convert.hexToBytes(data.script)):data.scriptPubKey?Script.fromScriptSig(data.scriptPubKey):data.address?Script.createOutputScript(data.address):new Script;if(this.script.buffer.length>0)this.address=this.script.getToAddress();this.value=Array.isArray(data.value)?convert.bytesToNum(data.value):"string"==typeof data.value?parseInt(data.value):data.value instanceof BigInteger?parseInt(data.value.toString()):data.value};TransactionOut.prototype.clone=function(){var newTxout=new TransactionOut({script:this.script.clone(),value:this.value});return newTxout};TransactionOut.prototype.scriptPubKey=function(){return convert.bytesToHex(this.script.buffer)};module.exports={Transaction:Transaction,TransactionIn:TransactionIn,TransactionOut:TransactionOut}},{"./address":54,"./convert":57,"./ecdsa":58,"./eckey":59,"./jsbn/jsbn":63,"./script":68,"./util":70,"crypto-js/sha256":47}],70:[function(_dereq_,module,exports){var convert=_dereq_("./convert.js");var Crypto=_dereq_("crypto-js");var RIPEMD160=Crypto.RIPEMD160;var SHA256=Crypto.SHA256;exports.sha256ripe160=function(data){var wordArray=RIPEMD160(SHA256(convert.bytesToWordArray(data)));return convert.wordArrayToBytes(wordArray)};exports.error=function(msg){throw new Error(msg)}},{"./convert.js":57,"crypto-js":27}],71:[function(_dereq_,module,exports){(function(process){var convert=_dereq_("./convert");var Transaction=_dereq_("./transaction").Transaction;var HDNode=_dereq_("./hdwallet.js");var rng=_dereq_("secure-random");function Wallet(seed,options){if(!(this instanceof Wallet)){return new Wallet(seed,options)}var options=options||{};var network=options.network||"mainnet";var masterkey=null;var me=this;var accountZero=null;var internalAccount=null;var externalAccount=null;this.addresses=[];this.changeAddresses=[];this.outputs={};this.newMasterKey=function(seed,network){if(!seed)seed=rng(32,{array:true});masterkey=new HDNode(seed,network);accountZero=masterkey.derivePrivate(0);externalAccount=accountZero.derive(0);internalAccount=accountZero.derive(1);me.addresses=[];me.changeAddresses=[];me.outputs={}};this.newMasterKey(seed,network);this.generateAddress=function(){var key=externalAccount.derive(this.addresses.length);this.addresses.push(key.getAddress().toString());return this.addresses[this.addresses.length-1]};this.generateChangeAddress=function(){var key=internalAccount.derive(this.changeAddresses.length);this.changeAddresses.push(key.getAddress().toString());return this.changeAddresses[this.changeAddresses.length-1]};this.getBalance=function(){return this.getUnspentOutputs().reduce(function(memo,output){return memo+output.value},0)};this.getUnspentOutputs=function(){var utxo=[];for(var key in this.outputs){var output=this.outputs[key];if(!output.spend)utxo.push(outputToUnspentOutput(output))}return utxo};this.setUnspentOutputs=function(utxo){var outputs={};utxo.forEach(function(uo){validateUnspentOutput(uo);var o=unspentOutputToOutput(uo);outputs[o.receive]=o});this.outputs=outputs};this.setUnspentOutputsAsync=function(utxo,callback){var error=null;try{this.setUnspentOutputs(utxo)}catch(err){error=err}finally{process.nextTick(function(){callback(error)})}};function outputToUnspentOutput(output){var hashAndIndex=output.receive.split(":");return{hash:hashAndIndex[0],hashLittleEndian:convert.reverseEndian(hashAndIndex[0]),outputIndex:parseInt(hashAndIndex[1]),address:output.address,value:output.value}}function unspentOutputToOutput(o){var hash=o.hash||convert.reverseEndian(o.hashLittleEndian);var key=hash+":"+o.outputIndex;return{receive:key,address:o.address,value:o.value}}function validateUnspentOutput(uo){var missingField;if(isNullOrUndefined(uo.hash)&&isNullOrUndefined(uo.hashLittleEndian)){missingField="hash(or hashLittleEndian)"}var requiredKeys=["outputIndex","address","value"];requiredKeys.forEach(function(key){if(isNullOrUndefined(uo[key])){missingField=key}});if(missingField){var message=["Invalid unspent output: key",missingField,"is missing.","A valid unspent output must contain"];message.push(requiredKeys.join(", "));message.push("and hash(or hashLittleEndian)");throw new Error(message.join(" "))}}function isNullOrUndefined(value){return value==undefined}this.processTx=function(tx){var txhash=convert.bytesToHex(tx.getHash());tx.outs.forEach(function(txOut,i){var address=txOut.address.toString();if(isMyAddress(address)){var output=txhash+":"+i;me.outputs[output]={receive:output,value:txOut.value,address:address}}});tx.ins.forEach(function(txIn,i){var op=txIn.outpoint;var o=me.outputs[op.hash+":"+op.index];if(o){o.spend=txhash+":"+i}})};this.createTx=function(to,value,fixedFee){checkDust(value);var tx=new Transaction;tx.addOutput(to,value);var utxo=getCandidateOutputs(value);var totalInValue=0;for(var i=0;i<utxo.length;i++){var output=utxo[i];tx.addInput(output.receive);totalInValue+=output.value;if(totalInValue<value)continue;var fee=fixedFee==undefined?estimateFeePadChangeOutput(tx):fixedFee;if(totalInValue<value+fee)continue;var change=totalInValue-value-fee;if(change>0&&!isDust(change)){tx.addOutput(getChangeAddress(),change)}break}checkInsufficientFund(totalInValue,value,fee);this.sign(tx);return tx};this.createTxAsync=function(to,value,fixedFee,callback){if(fixedFee instanceof Function){callback=fixedFee;fixedFee=undefined}var tx=null;var error=null;try{tx=this.createTx(to,value,fixedFee)}catch(err){error=err}finally{process.nextTick(function(){callback(error,tx)})}};this.dustThreshold=5430;function isDust(amount){return amount<=me.dustThreshold}function checkDust(value){if(isNullOrUndefined(value)||isDust(value)){throw new Error("Value must be above dust threshold")}}function getCandidateOutputs(value){var unspent=[];for(var key in me.outputs){var output=me.outputs[key];if(!output.spend)unspent.push(output)}var sortByValueDesc=unspent.sort(function(o1,o2){return o2.value-o1.value});return sortByValueDesc}function estimateFeePadChangeOutput(tx){var tmpTx=tx.clone();tmpTx.addOutput(getChangeAddress(),0);return tmpTx.estimateFee()}function getChangeAddress(){if(me.changeAddresses.length===0)me.generateChangeAddress();return me.changeAddresses[me.changeAddresses.length-1]}function checkInsufficientFund(totalInValue,value,fee){if(totalInValue<value+fee){throw new Error("Not enough money to send funds including transaction fee. Have: "+totalInValue+", needed: "+(value+fee))}}this.sign=function(tx){tx.ins.forEach(function(inp,i){var output=me.outputs[inp.outpoint.hash+":"+inp.outpoint.index];if(output){tx.sign(i,me.getPrivateKeyForAddress(output.address))}});return tx};this.getMasterKey=function(){return masterkey};this.getAccountZero=function(){return accountZero};this.getInternalAccount=function(){return internalAccount};this.getExternalAccount=function(){return externalAccount};this.getPrivateKey=function(index){return externalAccount.derive(index).priv};this.getInternalPrivateKey=function(index){return internalAccount.derive(index).priv};this.getPrivateKeyForAddress=function(address){var index;if((index=this.addresses.indexOf(address))>-1){return this.getPrivateKey(index)}else if((index=this.changeAddresses.indexOf(address))>-1){return this.getInternalPrivateKey(index)}else{throw new Error("Unknown address. Make sure the address is from the keychain and has been generated.")}};function isReceiveAddress(address){return me.addresses.indexOf(address)>-1}function isChangeAddress(address){return me.changeAddresses.indexOf(address)>-1}function isMyAddress(address){return isReceiveAddress(address)||isChangeAddress(address)}}module.exports=Wallet}).call(this,_dereq_("FWaASH"))},{"./convert":57,"./hdwallet.js":60,"./transaction":69,FWaASH:15,"secure-random":53}]},{},[61])(61)});
/*! peerjs build:0.3.13, development. Copyright(c) 2013 Michelle Bu <michelle@michellebu.com> */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports.RTCSessionDescription = window.RTCSessionDescription ||
	window.mozRTCSessionDescription;
module.exports.RTCPeerConnection = window.RTCPeerConnection ||
	window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
module.exports.RTCIceCandidate = window.RTCIceCandidate ||
	window.mozRTCIceCandidate;

},{}],2:[function(require,module,exports){
var util = require('./util');
var EventEmitter = require('eventemitter3');
var Negotiator = require('./negotiator');
var Reliable = require('reliable');

/**
 * Wraps a DataChannel between two Peers.
 */
function DataConnection(peer, provider, options) {
  if (!(this instanceof DataConnection)) return new DataConnection(peer, provider, options);
  EventEmitter.call(this);

  this.options = util.extend({
    serialization: 'binary',
    reliable: false
  }, options);

  // Connection is not open yet.
  this.open = false;
  this.type = 'data';
  this.peer = peer;
  this.provider = provider;

  this.id = this.options.connectionId || DataConnection._idPrefix + util.randomToken();

  this.label = this.options.label || this.id;
  this.metadata = this.options.metadata;
  this.serialization = this.options.serialization;
  this.reliable = this.options.reliable;

  // Data channel buffering.
  this._buffer = [];
  this._buffering = false;
  this.bufferSize = 0;

  // For storing large data.
  this._chunkedData = {};

  if (this.options._payload) {
    this._peerBrowser = this.options._payload.browser;
  }

  Negotiator.startConnection(
    this,
    this.options._payload || {
      originator: true
    }
  );
}

util.inherits(DataConnection, EventEmitter);

DataConnection._idPrefix = 'dc_';

/** Called by the Negotiator when the DataChannel is ready. */
DataConnection.prototype.initialize = function(dc) {
  this._dc = this.dataChannel = dc;
  this._configureDataChannel();
}

DataConnection.prototype._configureDataChannel = function() {
  var self = this;
  if (util.supports.sctp) {
    this._dc.binaryType = 'arraybuffer';
  }
  this._dc.onopen = function() {
    util.log('Data channel connection success');
    self.open = true;
    self.emit('open');
  }

  // Use the Reliable shim for non Firefox browsers
  if (!util.supports.sctp && this.reliable) {
    this._reliable = new Reliable(this._dc, util.debug);
  }

  if (this._reliable) {
    this._reliable.onmessage = function(msg) {
      self.emit('data', msg);
    };
  } else {
    this._dc.onmessage = function(e) {
      self._handleDataMessage(e);
    };
  }
  this._dc.onclose = function(e) {
    util.log('DataChannel closed for:', self.peer);
    self.close();
  };
}

// Handles a DataChannel message.
DataConnection.prototype._handleDataMessage = function(e) {
  var self = this;
  var data = e.data;
  var datatype = data.constructor;
  if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
    if (datatype === Blob) {
      // Datatype should never be blob
      util.blobToArrayBuffer(data, function(ab) {
        data = util.unpack(ab);
        self.emit('data', data);
      });
      return;
    } else if (datatype === ArrayBuffer) {
      data = util.unpack(data);
    } else if (datatype === String) {
      // String fallback for binary data for browsers that don't support binary yet
      var ab = util.binaryStringToArrayBuffer(data);
      data = util.unpack(ab);
    }
  } else if (this.serialization === 'json') {
    data = JSON.parse(data);
  }

  // Check if we've chunked--if so, piece things back together.
  // We're guaranteed that this isn't 0.
  if (data.__peerData) {
    var id = data.__peerData;
    var chunkInfo = this._chunkedData[id] || {data: [], count: 0, total: data.total};

    chunkInfo.data[data.n] = data.data;
    chunkInfo.count += 1;

    if (chunkInfo.total === chunkInfo.count) {
      // Clean up before making the recursive call to `_handleDataMessage`.
      delete this._chunkedData[id];

      // We've received all the chunks--time to construct the complete data.
      data = new Blob(chunkInfo.data);
      this._handleDataMessage({data: data});
    }

    this._chunkedData[id] = chunkInfo;
    return;
  }

  this.emit('data', data);
}

/**
 * Exposed functionality for users.
 */

/** Allows user to close connection. */
DataConnection.prototype.close = function() {
  if (!this.open) {
    return;
  }
  this.open = false;
  Negotiator.cleanup(this);
  this.emit('close');
}

/** Allows user to send data. */
DataConnection.prototype.send = function(data, chunked) {
  if (!this.open) {
    this.emit('error', new Error('Connection is not open. You should listen for the `open` event before sending messages.'));
    return;
  }
  if (this._reliable) {
    // Note: reliable shim sending will make it so that you cannot customize
    // serialization.
    this._reliable.send(data);
    return;
  }
  var self = this;
  if (this.serialization === 'json') {
    this._bufferedSend(JSON.stringify(data));
  } else if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
    var blob = util.pack(data);

    // For Chrome-Firefox interoperability, we need to make Firefox "chunk"
    // the data it sends out.
    var needsChunking = util.chunkedBrowsers[this._peerBrowser] || util.chunkedBrowsers[util.browser];
    if (needsChunking && !chunked && blob.size > util.chunkedMTU) {
      this._sendChunks(blob);
      return;
    }

    // DataChannel currently only supports strings.
    if (!util.supports.sctp) {
      util.blobToBinaryString(blob, function(str) {
        self._bufferedSend(str);
      });
    } else if (!util.supports.binaryBlob) {
      // We only do this if we really need to (e.g. blobs are not supported),
      // because this conversion is costly.
      util.blobToArrayBuffer(blob, function(ab) {
        self._bufferedSend(ab);
      });
    } else {
      this._bufferedSend(blob);
    }
  } else {
    this._bufferedSend(data);
  }
}

DataConnection.prototype._bufferedSend = function(msg) {
  if (this._buffering || !this._trySend(msg)) {
    this._buffer.push(msg);
    this.bufferSize = this._buffer.length;
  }
}

// Returns true if the send succeeds.
DataConnection.prototype._trySend = function(msg) {
  try {
    this._dc.send(msg);
  } catch (e) {
    this._buffering = true;

    var self = this;
    setTimeout(function() {
      // Try again.
      self._buffering = false;
      self._tryBuffer();
    }, 100);
    return false;
  }
  return true;
}

// Try to send the first message in the buffer.
DataConnection.prototype._tryBuffer = function() {
  if (this._buffer.length === 0) {
    return;
  }

  var msg = this._buffer[0];

  if (this._trySend(msg)) {
    this._buffer.shift();
    this.bufferSize = this._buffer.length;
    this._tryBuffer();
  }
}

DataConnection.prototype._sendChunks = function(blob) {
  var blobs = util.chunk(blob);
  for (var i = 0, ii = blobs.length; i < ii; i += 1) {
    var blob = blobs[i];
    this.send(blob, true);
  }
}

DataConnection.prototype.handleMessage = function(message) {
  var payload = message.payload;

  switch (message.type) {
    case 'ANSWER':
      this._peerBrowser = payload.browser;

      // Forward to negotiator
      Negotiator.handleSDP(message.type, this, payload.sdp);
      break;
    case 'CANDIDATE':
      Negotiator.handleCandidate(this, payload.candidate);
      break;
    default:
      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
      break;
  }
}

module.exports = DataConnection;

},{"./negotiator":5,"./util":8,"eventemitter3":9,"reliable":12}],3:[function(require,module,exports){
  if(typeof window == 'undefined') return false;
window.Socket = require('./socket');
window.MediaConnection = require('./mediaconnection');
window.DataConnection = require('./dataconnection');
window.Peer = require('./peer');
window.RTCPeerConnection = require('./adapter').RTCPeerConnection;
window.RTCSessionDescription = require('./adapter').RTCSessionDescription;
window.RTCIceCandidate = require('./adapter').RTCIceCandidate;
window.Negotiator = require('./negotiator');
window.util = require('./util');
window.BinaryPack = require('js-binarypack');

},{"./adapter":1,"./dataconnection":2,"./mediaconnection":4,"./negotiator":5,"./peer":6,"./socket":7,"./util":8,"js-binarypack":10}],4:[function(require,module,exports){
var util = require('./util');
var EventEmitter = require('eventemitter3');
var Negotiator = require('./negotiator');

/**
 * Wraps the streaming interface between two Peers.
 */
function MediaConnection(peer, provider, options) {
  if (!(this instanceof MediaConnection)) return new MediaConnection(peer, provider, options);
  EventEmitter.call(this);

  this.options = util.extend({}, options);

  this.open = false;
  this.type = 'media';
  this.peer = peer;
  this.provider = provider;
  this.metadata = this.options.metadata;
  this.localStream = this.options._stream;

  this.id = this.options.connectionId || MediaConnection._idPrefix + util.randomToken();
  if (this.localStream) {
    Negotiator.startConnection(
      this,
      {_stream: this.localStream, originator: true}
    );
  }
};

util.inherits(MediaConnection, EventEmitter);

MediaConnection._idPrefix = 'mc_';

MediaConnection.prototype.addStream = function(remoteStream) {
  util.log('Receiving stream', remoteStream);

  this.remoteStream = remoteStream;
  this.emit('stream', remoteStream); // Should we call this `open`?

};

MediaConnection.prototype.handleMessage = function(message) {
  var payload = message.payload;

  switch (message.type) {
    case 'ANSWER':
      // Forward to negotiator
      Negotiator.handleSDP(message.type, this, payload.sdp);
      this.open = true;
      break;
    case 'CANDIDATE':
      Negotiator.handleCandidate(this, payload.candidate);
      break;
    default:
      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
      break;
  }
}

MediaConnection.prototype.answer = function(stream) {
  if (this.localStream) {
    util.warn('Local stream already exists on this MediaConnection. Are you answering a call twice?');
    return;
  }

  this.options._payload._stream = stream;

  this.localStream = stream;
  Negotiator.startConnection(
    this,
    this.options._payload
  )
  // Retrieve lost messages stored because PeerConnection not set up.
  var messages = this.provider._getMessages(this.id);
  for (var i = 0, ii = messages.length; i < ii; i += 1) {
    this.handleMessage(messages[i]);
  }
  this.open = true;
};

/**
 * Exposed functionality for users.
 */

/** Allows user to close connection. */
MediaConnection.prototype.close = function() {
  if (!this.open) {
    return;
  }
  this.open = false;
  Negotiator.cleanup(this);
  this.emit('close')
};

module.exports = MediaConnection;

},{"./negotiator":5,"./util":8,"eventemitter3":9}],5:[function(require,module,exports){
var util = require('./util');
var RTCPeerConnection = require('./adapter').RTCPeerConnection;
var RTCSessionDescription = require('./adapter').RTCSessionDescription;
var RTCIceCandidate = require('./adapter').RTCIceCandidate;

/**
 * Manages all negotiations between Peers.
 */
var Negotiator = {
  pcs: {
    data: {},
    media: {}
  }, // type => {peerId: {pc_id: pc}}.
  //providers: {}, // provider's id => providers (there may be multiple providers/client.
  queue: [] // connections that are delayed due to a PC being in use.
}

Negotiator._idPrefix = 'pc_';

/** Returns a PeerConnection object set up correctly (for data, media). */
Negotiator.startConnection = function(connection, options) {
  var pc = Negotiator._getPeerConnection(connection, options);

  if (connection.type === 'media' && options._stream) {
    // Add the stream.
    pc.addStream(options._stream);
  }

  // Set the connection's PC.
  connection.pc = connection.peerConnection = pc;
  // What do we need to do now?
  if (options.originator) {
    if (connection.type === 'data') {
      // Create the datachannel.
      var config = {};
      // Dropping reliable:false support, since it seems to be crashing
      // Chrome.
      /*if (util.supports.sctp && !options.reliable) {
        // If we have canonical reliable support...
        config = {maxRetransmits: 0};
      }*/
      // Fallback to ensure older browsers don't crash.
      if (!util.supports.sctp) {
        config = {reliable: options.reliable};
      }
      var dc = pc.createDataChannel(connection.label, config);
      connection.initialize(dc);
    }

    if (!util.supports.onnegotiationneeded) {
      Negotiator._makeOffer(connection);
    }
  } else {
    Negotiator.handleSDP('OFFER', connection, options.sdp);
  }
}

Negotiator._getPeerConnection = function(connection, options) {
  if (!Negotiator.pcs[connection.type]) {
    util.error(connection.type + ' is not a valid connection type. Maybe you overrode the `type` property somewhere.');
  }

  if (!Negotiator.pcs[connection.type][connection.peer]) {
    Negotiator.pcs[connection.type][connection.peer] = {};
  }
  var peerConnections = Negotiator.pcs[connection.type][connection.peer];

  var pc;
  // Not multiplexing while FF and Chrome have not-great support for it.
  /*if (options.multiplex) {
    ids = Object.keys(peerConnections);
    for (var i = 0, ii = ids.length; i < ii; i += 1) {
      pc = peerConnections[ids[i]];
      if (pc.signalingState === 'stable') {
        break; // We can go ahead and use this PC.
      }
    }
  } else */
  if (options.pc) { // Simplest case: PC id already provided for us.
    pc = Negotiator.pcs[connection.type][connection.peer][options.pc];
  }

  if (!pc || pc.signalingState !== 'stable') {
    pc = Negotiator._startPeerConnection(connection);
  }
  return pc;
}

/*
Negotiator._addProvider = function(provider) {
  if ((!provider.id && !provider.disconnected) || !provider.socket.open) {
    // Wait for provider to obtain an ID.
    provider.on('open', function(id) {
      Negotiator._addProvider(provider);
    });
  } else {
    Negotiator.providers[provider.id] = provider;
  }
}*/


/** Start a PC. */
Negotiator._startPeerConnection = function(connection) {
  util.log('Creating RTCPeerConnection.');

  var id = Negotiator._idPrefix + util.randomToken();
  var optional = {};

  if (connection.type === 'data' && !util.supports.sctp) {
    optional = {optional: [{RtpDataChannels: true}]};
  } else if (connection.type === 'media') {
    // Interop req for chrome.
    optional = {optional: [{DtlsSrtpKeyAgreement: true}]};
  }

  var pc = new RTCPeerConnection(connection.provider.options.config, optional);
  Negotiator.pcs[connection.type][connection.peer][id] = pc;

  Negotiator._setupListeners(connection, pc, id);

  return pc;
}

/** Set up various WebRTC listeners. */
Negotiator._setupListeners = function(connection, pc, pc_id) {
  var peerId = connection.peer;
  var connectionId = connection.id;
  var provider = connection.provider;

  // ICE CANDIDATES.
  util.log('Listening for ICE candidates.');
  pc.onicecandidate = function(evt) {
    if (evt.candidate) {
      util.log('Received ICE candidates for:', connection.peer);
      provider.socket.send({
        type: 'CANDIDATE',
        payload: {
          candidate: evt.candidate,
          type: connection.type,
          connectionId: connection.id
        },
        dst: peerId
      });
    }
  };

  pc.oniceconnectionstatechange = function() {
    switch (pc.iceConnectionState) {
      case 'disconnected':
      case 'failed':
        util.log('iceConnectionState is disconnected, closing connections to ' + peerId);
        connection.close();
        break;
      case 'completed':
        pc.onicecandidate = util.noop;
        break;
    }
  };

  // Fallback for older Chrome impls.
  pc.onicechange = pc.oniceconnectionstatechange;

  // ONNEGOTIATIONNEEDED (Chrome)
  util.log('Listening for `negotiationneeded`');
  pc.onnegotiationneeded = function() {
    util.log('`negotiationneeded` triggered');
    if (pc.signalingState == 'stable') {
      Negotiator._makeOffer(connection);
    } else {
      util.log('onnegotiationneeded triggered when not stable. Is another connection being established?');
    }
  };

  // DATACONNECTION.
  util.log('Listening for data channel');
  // Fired between offer and answer, so options should already be saved
  // in the options hash.
  pc.ondatachannel = function(evt) {
    util.log('Received data channel');
    var dc = evt.channel;
    var connection = provider.getConnection(peerId, connectionId);
    connection.initialize(dc);
  };

  // MEDIACONNECTION.
  util.log('Listening for remote stream');
  pc.onaddstream = function(evt) {
    util.log('Received remote stream');
    var stream = evt.stream;
    var connection = provider.getConnection(peerId, connectionId);
    // 10/10/2014: looks like in Chrome 38, onaddstream is triggered after
    // setting the remote description. Our connection object in these cases
    // is actually a DATA connection, so addStream fails.
    // TODO: This is hopefully just a temporary fix. We should try to
    // understand why this is happening.
    if (connection.type === 'media') {
      connection.addStream(stream);
    }
  };
}

Negotiator.cleanup = function(connection) {
  util.log('Cleaning up PeerConnection to ' + connection.peer);

  var pc = connection.pc;

  if (!!pc && (pc.readyState !== 'closed' || pc.signalingState !== 'closed')) {
    pc.close();
    connection.pc = null;
  }
}

Negotiator._makeOffer = function(connection) {
  var pc = connection.pc;
  pc.createOffer(function(offer) {
    util.log('Created offer.');

    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
      offer.sdp = Reliable.higherBandwidthSDP(offer.sdp);
    }

    pc.setLocalDescription(offer, function() {
      util.log('Set localDescription: offer', 'for:', connection.peer);
      connection.provider.socket.send({
        type: 'OFFER',
        payload: {
          sdp: offer,
          type: connection.type,
          label: connection.label,
          connectionId: connection.id,
          reliable: connection.reliable,
          serialization: connection.serialization,
          metadata: connection.metadata,
          browser: util.browser
        },
        dst: connection.peer
      });
    }, function(err) {
      connection.provider.emitError('webrtc', err);
      util.log('Failed to setLocalDescription, ', err);
    });
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to createOffer, ', err);
  }, connection.options.constraints);
}

Negotiator._makeAnswer = function(connection) {
  var pc = connection.pc;

  pc.createAnswer(function(answer) {
    util.log('Created answer.');

    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
      answer.sdp = Reliable.higherBandwidthSDP(answer.sdp);
    }

    pc.setLocalDescription(answer, function() {
      util.log('Set localDescription: answer', 'for:', connection.peer);
      connection.provider.socket.send({
        type: 'ANSWER',
        payload: {
          sdp: answer,
          type: connection.type,
          connectionId: connection.id,
          browser: util.browser
        },
        dst: connection.peer
      });
    }, function(err) {
      connection.provider.emitError('webrtc', err);
      util.log('Failed to setLocalDescription, ', err);
    });
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to create answer, ', err);
  });
}

/** Handle an SDP. */
Negotiator.handleSDP = function(type, connection, sdp) {
  sdp = new RTCSessionDescription(sdp);
  var pc = connection.pc;

  util.log('Setting remote description', sdp);
  pc.setRemoteDescription(sdp, function() {
    util.log('Set remoteDescription:', type, 'for:', connection.peer);

    if (type === 'OFFER') {
      Negotiator._makeAnswer(connection);
    }
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to setRemoteDescription, ', err);
  });
}

/** Handle a candidate. */
Negotiator.handleCandidate = function(connection, ice) {
  var candidate = ice.candidate;
  var sdpMLineIndex = ice.sdpMLineIndex;
  connection.pc.addIceCandidate(new RTCIceCandidate({
    sdpMLineIndex: sdpMLineIndex,
    candidate: candidate
  }));
  util.log('Added ICE candidate for:', connection.peer);
}

module.exports = Negotiator;

},{"./adapter":1,"./util":8}],6:[function(require,module,exports){
var util = require('./util');
var EventEmitter = require('eventemitter3');
var Socket = require('./socket');
var MediaConnection = require('./mediaconnection');
var DataConnection = require('./dataconnection');

/**
 * A peer who can initiate connections with other peers.
 */
function Peer(id, options) {
  if (!(this instanceof Peer)) return new Peer(id, options);
  EventEmitter.call(this);

  // Deal with overloading
  if (id && id.constructor == Object) {
    options = id;
    id = undefined;
  } else if (id) {
    // Ensure id is a string
    id = id.toString();
  }
  //

  // Configurize options
  options = util.extend({
    debug: 0, // 1: Errors, 2: Warnings, 3: All logs
    host: util.CLOUD_HOST,
    port: util.CLOUD_PORT,
    key: 'peerjs',
    path: '/',
    token: util.randomToken(),
    config: util.defaultConfig
  }, options);
  this.options = options;
  // Detect relative URL host.
  if (options.host === '/') {
    options.host = window.location.hostname;
  }
  // Set path correctly.
  if (options.path[0] !== '/') {
    options.path = '/' + options.path;
  }
  if (options.path[options.path.length - 1] !== '/') {
    options.path += '/';
  }

  // Set whether we use SSL to same as current host
  if (options.secure === undefined && options.host !== util.CLOUD_HOST) {
    options.secure = util.isSecure();
  }
  // Set a custom log function if present
  if (options.logFunction) {
    util.setLogFunction(options.logFunction);
  }
  util.setLogLevel(options.debug);
  //

  // Sanity checks
  // Ensure WebRTC supported
  if (!util.supports.audioVideo && !util.supports.data ) {
    this._delayedAbort('browser-incompatible', 'The current browser does not support WebRTC');
    return;
  }
  // Ensure alphanumeric id
  if (!util.validateId(id)) {
    this._delayedAbort('invalid-id', 'ID "' + id + '" is invalid');
    return;
  }
  // Ensure valid key
  if (!util.validateKey(options.key)) {
    this._delayedAbort('invalid-key', 'API KEY "' + options.key + '" is invalid');
    return;
  }
  // Ensure not using unsecure cloud server on SSL page
  if (options.secure && options.host === '0.peerjs.com') {
    this._delayedAbort('ssl-unavailable',
      'The cloud server currently does not support HTTPS. Please run your own PeerServer to use HTTPS.');
    return;
  }
  //

  // States.
  this.destroyed = false; // Connections have been killed
  this.disconnected = false; // Connection to PeerServer killed but P2P connections still active
  this.open = false; // Sockets and such are not yet open.
  //

  // References
  this.connections = {}; // DataConnections for this peer.
  this._lostMessages = {}; // src => [list of messages]
  //

  // Start the server connection
  this._initializeServerConnection();
  if (id) {
    this._initialize(id);
  } else {
    this._retrieveId();
  }
  //
}

util.inherits(Peer, EventEmitter);

// Initialize the 'socket' (which is actually a mix of XHR streaming and
// websockets.)
Peer.prototype._initializeServerConnection = function() {
  var self = this;
  this.socket = new Socket(this.options.secure, this.options.host, this.options.port, this.options.path, this.options.key);
  this.socket.on('message', function(data) {
    self._handleMessage(data);
  });
  this.socket.on('error', function(error) {
    self._abort('socket-error', error);
  });
  this.socket.on('disconnected', function() {
    // If we haven't explicitly disconnected, emit error and disconnect.
    if (!self.disconnected) {
      self.emitError('network', 'Lost connection to server.');
      self.disconnect();
    }
  });
  this.socket.on('close', function() {
    // If we haven't explicitly disconnected, emit error.
    if (!self.disconnected) {
      self._abort('socket-closed', 'Underlying socket is already closed.');
    }
  });
};

/** Get a unique ID from the server via XHR. */
Peer.prototype._retrieveId = function(cb) {
  var self = this;
  var http = new XMLHttpRequest();
  var protocol = this.options.secure ? 'https://' : 'http://';
  var url = protocol + this.options.host + ':' + this.options.port +
    this.options.path + this.options.key + '/id';
  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
  url += queryString;

  // If there's no ID we need to wait for one before trying to init socket.
  http.open('get', url, true);
  http.onerror = function(e) {
    util.error('Error retrieving ID', e);
    var pathError = '';
    if (self.options.path === '/' && self.options.host !== util.CLOUD_HOST) {
      pathError = ' If you passed in a `path` to your self-hosted PeerServer, ' +
        'you\'ll also need to pass in that same path when creating a new ' +
        'Peer.';
    }
    self._abort('server-error', 'Could not get an ID from the server.' + pathError);
  };
  http.onreadystatechange = function() {
    if (http.readyState !== 4) {
      return;
    }
    if (http.status !== 200) {
      http.onerror();
      return;
    }
    self._initialize(http.responseText);
  };
  http.send(null);
};

/** Initialize a connection with the server. */
Peer.prototype._initialize = function(id) {
  this.id = id;
  this.socket.start(this.id, this.options.token);
};

/** Handles messages from the server. */
Peer.prototype._handleMessage = function(message) {
  var type = message.type;
  var payload = message.payload;
  var peer = message.src;
  var connection;

  switch (type) {
    case 'OPEN': // The connection to the server is open.
      this.emit('open', this.id);
      this.open = true;
      break;
    case 'ERROR': // Server error.
      this._abort('server-error', payload.msg);
      break;
    case 'ID-TAKEN': // The selected ID is taken.
      this._abort('unavailable-id', 'ID `' + this.id + '` is taken');
      break;
    case 'INVALID-KEY': // The given API key cannot be found.
      this._abort('invalid-key', 'API KEY "' + this.options.key + '" is invalid');
      break;

    //
    case 'LEAVE': // Another peer has closed its connection to this peer.
      util.log('Received leave message from', peer);
      this._cleanupPeer(peer);
      break;

    case 'EXPIRE': // The offer sent to a peer has expired without response.
      this.emitError('peer-unavailable', 'Could not connect to peer ' + peer);
      break;
    case 'OFFER': // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
      var connectionId = payload.connectionId;
      connection = this.getConnection(peer, connectionId);

      if (connection) {
        util.warn('Offer received for existing Connection ID:', connectionId);
        //connection.handleMessage(message);
      } else {
        // Create a new connection.
        if (payload.type === 'media') {
          connection = new MediaConnection(peer, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata
          });
          this._addConnection(peer, connection);
          this.emit('call', connection);
        } else if (payload.type === 'data') {
          connection = new DataConnection(peer, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata,
            label: payload.label,
            serialization: payload.serialization,
            reliable: payload.reliable
          });
          this._addConnection(peer, connection);
          this.emit('connection', connection);
        } else {
          util.warn('Received malformed connection type:', payload.type);
          return;
        }
        // Find messages.
        var messages = this._getMessages(connectionId);
        for (var i = 0, ii = messages.length; i < ii; i += 1) {
          connection.handleMessage(messages[i]);
        }
      }
      break;
    default:
      if (!payload) {
        util.warn('You received a malformed message from ' + peer + ' of type ' + type);
        return;
      }

      var id = payload.connectionId;
      connection = this.getConnection(peer, id);

      if (connection && connection.pc) {
        // Pass it on.
        connection.handleMessage(message);
      } else if (id) {
        // Store for possible later use
        this._storeMessage(id, message);
      } else {
        util.warn('You received an unrecognized message:', message);
      }
      break;
  }
};

/** Stores messages without a set up connection, to be claimed later. */
Peer.prototype._storeMessage = function(connectionId, message) {
  if (!this._lostMessages[connectionId]) {
    this._lostMessages[connectionId] = [];
  }
  this._lostMessages[connectionId].push(message);
};

/** Retrieve messages from lost message store */
Peer.prototype._getMessages = function(connectionId) {
  var messages = this._lostMessages[connectionId];
  if (messages) {
    delete this._lostMessages[connectionId];
    return messages;
  } else {
    return [];
  }
};

/**
 * Returns a DataConnection to the specified peer. See documentation for a
 * complete list of options.
 */
Peer.prototype.connect = function(peer, options) {
  if (this.disconnected) {
    util.warn('You cannot connect to a new Peer because you called ' +
      '.disconnect() on this Peer and ended your connection with the ' +
      'server. You can create a new Peer to reconnect, or call reconnect ' +
      'on this peer if you believe its ID to still be available.');
    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
    return;
  }
  var connection = new DataConnection(peer, this, options);
  this._addConnection(peer, connection);
  return connection;
};

/**
 * Returns a MediaConnection to the specified peer. See documentation for a
 * complete list of options.
 */
Peer.prototype.call = function(peer, stream, options) {
  if (this.disconnected) {
    util.warn('You cannot connect to a new Peer because you called ' +
      '.disconnect() on this Peer and ended your connection with the ' +
      'server. You can create a new Peer to reconnect.');
    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
    return;
  }
  if (!stream) {
    util.error('To call a peer, you must provide a stream from your browser\'s `getUserMedia`.');
    return;
  }
  options = options || {};
  options._stream = stream;
  var call = new MediaConnection(peer, this, options);
  this._addConnection(peer, call);
  return call;
};

/** Add a data/media connection to this peer. */
Peer.prototype._addConnection = function(peer, connection) {
  if (!this.connections[peer]) {
    this.connections[peer] = [];
  }
  this.connections[peer].push(connection);
};

/** Retrieve a data/media connection for this peer. */
Peer.prototype.getConnection = function(peer, id) {
  var connections = this.connections[peer];
  if (!connections) {
    return null;
  }
  for (var i = 0, ii = connections.length; i < ii; i++) {
    if (connections[i].id === id) {
      return connections[i];
    }
  }
  return null;
};

Peer.prototype._delayedAbort = function(type, message) {
  var self = this;
  util.setZeroTimeout(function(){
    self._abort(type, message);
  });
};

/**
 * Destroys the Peer and emits an error message.
 * The Peer is not destroyed if it's in a disconnected state, in which case
 * it retains its disconnected state and its existing connections.
 */
Peer.prototype._abort = function(type, message) {
  util.error('Aborting!');
  if (!this._lastServerId) {
    this.destroy();
  } else {
    this.disconnect();
  }
  this.emitError(type, message);
};

/** Emits a typed error message. */
Peer.prototype.emitError = function(type, err) {
  util.error('Error:', err);
  if (typeof err === 'string') {
    err = new Error(err);
  }
  err.type = type;
  this.emit('error', err);
};

/**
 * Destroys the Peer: closes all active connections as well as the connection
 *  to the server.
 * Warning: The peer can no longer create or accept connections after being
 *  destroyed.
 */
Peer.prototype.destroy = function() {
  if (!this.destroyed) {
    this._cleanup();
    this.disconnect();
    this.destroyed = true;
  }
};


/** Disconnects every connection on this peer. */
Peer.prototype._cleanup = function() {
  if (this.connections) {
    var peers = Object.keys(this.connections);
    for (var i = 0, ii = peers.length; i < ii; i++) {
      this._cleanupPeer(peers[i]);
    }
  }
  this.emit('close');
};

/** Closes all connections to this peer. */
Peer.prototype._cleanupPeer = function(peer) {
  var connections = this.connections[peer];
  for (var j = 0, jj = connections.length; j < jj; j += 1) {
    connections[j].close();
  }
};

/**
 * Disconnects the Peer's connection to the PeerServer. Does not close any
 *  active connections.
 * Warning: The peer can no longer create or accept connections after being
 *  disconnected. It also cannot reconnect to the server.
 */
Peer.prototype.disconnect = function() {
  var self = this;
  util.setZeroTimeout(function(){
    if (!self.disconnected) {
      self.disconnected = true;
      self.open = false;
      if (self.socket) {
        self.socket.close();
      }
      self.emit('disconnected', self.id);
      self._lastServerId = self.id;
      self.id = null;
    }
  });
};

/** Attempts to reconnect with the same ID. */
Peer.prototype.reconnect = function() {
  if (this.disconnected && !this.destroyed) {
    util.log('Attempting reconnection to server with ID ' + this._lastServerId);
    this.disconnected = false;
    this._initializeServerConnection();
    this._initialize(this._lastServerId);
  } else if (this.destroyed) {
    throw new Error('This peer cannot reconnect to the server. It has already been destroyed.');
  } else if (!this.disconnected && !this.open) {
    // Do nothing. We're still connecting the first time.
    util.error('In a hurry? We\'re still trying to make the initial connection!');
  } else {
    throw new Error('Peer ' + this.id + ' cannot reconnect because it is not disconnected from the server!');
  }
};

/**
 * Get a list of available peer IDs. If you're running your own server, you'll
 * want to set allow_discovery: true in the PeerServer options. If you're using
 * the cloud server, email team@peerjs.com to get the functionality enabled for
 * your key.
 */
Peer.prototype.listAllPeers = function(cb) {
  cb = cb || function() {};
  var self = this;
  var http = new XMLHttpRequest();
  var protocol = this.options.secure ? 'https://' : 'http://';
  var url = protocol + this.options.host + ':' + this.options.port +
    this.options.path + this.options.key + '/peers';
  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
  url += queryString;

  // If there's no ID we need to wait for one before trying to init socket.
  http.open('get', url, true);
  http.onerror = function(e) {
    self._abort('server-error', 'Could not get peers from the server.');
    cb([]);
  };
  http.onreadystatechange = function() {
    if (http.readyState !== 4) {
      return;
    }
    if (http.status === 401) {
      var helpfulError = '';
      if (self.options.host !== util.CLOUD_HOST) {
        helpfulError = 'It looks like you\'re using the cloud server. You can email ' +
          'team@peerjs.com to enable peer listing for your API key.';
      } else {
        helpfulError = 'You need to enable `allow_discovery` on your self-hosted ' +
          'PeerServer to use this feature.';
      }
      cb([]);
      throw new Error('It doesn\'t look like you have permission to list peers IDs. ' + helpfulError);
    } else if (http.status !== 200) {
      cb([]);
    } else {
      cb(JSON.parse(http.responseText));
    }
  };
  http.send(null);
};

module.exports = Peer;

},{"./dataconnection":2,"./mediaconnection":4,"./socket":7,"./util":8,"eventemitter3":9}],7:[function(require,module,exports){
var util = require('./util');
var EventEmitter = require('eventemitter3');

/**
 * An abstraction on top of WebSockets and XHR streaming to provide fastest
 * possible connection for peers.
 */
function Socket(secure, host, port, path, key) {
  if (!(this instanceof Socket)) return new Socket(secure, host, port, path, key);

  EventEmitter.call(this);

  // Disconnected manually.
  this.disconnected = false;
  this._queue = [];

  var httpProtocol = secure ? 'https://' : 'http://';
  var wsProtocol = secure ? 'wss://' : 'ws://';
  this._httpUrl = httpProtocol + host + ':' + port + path + key;
  this._wsUrl = wsProtocol + host + ':' + port + path + 'peerjs?key=' + key;
}

util.inherits(Socket, EventEmitter);


/** Check in with ID or get one from server. */
Socket.prototype.start = function(id, token) {
  this.id = id;

  this._httpUrl += '/' + id + '/' + token;
  this._wsUrl += '&id=' + id + '&token=' + token;

  this._startXhrStream();
  this._startWebSocket();
}


/** Start up websocket communications. */
Socket.prototype._startWebSocket = function(id) {
  var self = this;

  if (this._socket) {
    return;
  }

  this._socket = new WebSocket(this._wsUrl);

  this._socket.onmessage = function(event) {
    try {
      var data = JSON.parse(event.data);
    } catch(e) {
      util.log('Invalid server message', event.data);
      return;
    }
    self.emit('message', data);
  };

  this._socket.onclose = function(event) {
    util.log('Socket closed.');
    self.disconnected = true;
    self.emit('disconnected');
  };

  // Take care of the queue of connections if necessary and make sure Peer knows
  // socket is open.
  this._socket.onopen = function() {
    if (self._timeout) {
      clearTimeout(self._timeout);
      setTimeout(function(){
        self._http.abort();
        self._http = null;
      }, 5000);
    }
    self._sendQueuedMessages();
    util.log('Socket open');
  };
}

/** Start XHR streaming. */
Socket.prototype._startXhrStream = function(n) {
  try {
    var self = this;
    this._http = new XMLHttpRequest();
    this._http._index = 1;
    this._http._streamIndex = n || 0;
    this._http.open('post', this._httpUrl + '/id?i=' + this._http._streamIndex, true);
    this._http.onerror = function() {
      // If we get an error, likely something went wrong.
      // Stop streaming.
      clearTimeout(self._timeout);
      self.emit('disconnected');
    }
    this._http.onreadystatechange = function() {
      if (this.readyState == 2 && this.old) {
        this.old.abort();
        delete this.old;
      } else if (this.readyState > 2 && this.status === 200 && this.responseText) {
        self._handleStream(this);
      }
    };
    this._http.send(null);
    this._setHTTPTimeout();
  } catch(e) {
    util.log('XMLHttpRequest not available; defaulting to WebSockets');
  }
}


/** Handles onreadystatechange response as a stream. */
Socket.prototype._handleStream = function(http) {
  // 3 and 4 are loading/done state. All others are not relevant.
  var messages = http.responseText.split('\n');

  // Check to see if anything needs to be processed on buffer.
  if (http._buffer) {
    while (http._buffer.length > 0) {
      var index = http._buffer.shift();
      var bufferedMessage = messages[index];
      try {
        bufferedMessage = JSON.parse(bufferedMessage);
      } catch(e) {
        http._buffer.shift(index);
        break;
      }
      this.emit('message', bufferedMessage);
    }
  }

  var message = messages[http._index];
  if (message) {
    http._index += 1;
    // Buffering--this message is incomplete and we'll get to it next time.
    // This checks if the httpResponse ended in a `\n`, in which case the last
    // element of messages should be the empty string.
    if (http._index === messages.length) {
      if (!http._buffer) {
        http._buffer = [];
      }
      http._buffer.push(http._index - 1);
    } else {
      try {
        message = JSON.parse(message);
      } catch(e) {
        util.log('Invalid server message', message);
        return;
      }
      this.emit('message', message);
    }
  }
}

Socket.prototype._setHTTPTimeout = function() {
  var self = this;
  this._timeout = setTimeout(function() {
    var old = self._http;
    if (!self._wsOpen()) {
      self._startXhrStream(old._streamIndex + 1);
      self._http.old = old;
    } else {
      old.abort();
    }
  }, 25000);
}

/** Is the websocket currently open? */
Socket.prototype._wsOpen = function() {
  return this._socket && this._socket.readyState == 1;
}

/** Send queued messages. */
Socket.prototype._sendQueuedMessages = function() {
  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
    this.send(this._queue[i]);
  }
}

/** Exposed send for DC & Peer. */
Socket.prototype.send = function(data) {
  if (this.disconnected) {
    return;
  }

  // If we didn't get an ID yet, we can't yet send anything so we should queue
  // up these messages.
  if (!this.id) {
    this._queue.push(data);
    return;
  }

  if (!data.type) {
    this.emit('error', 'Invalid message');
    return;
  }

  var message = JSON.stringify(data);
  if (this._wsOpen()) {
    this._socket.send(message);
  } else {
    var http = new XMLHttpRequest();
    var url = this._httpUrl + '/' + data.type.toLowerCase();
    http.open('post', url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(message);
  }
}

Socket.prototype.close = function() {
  if (!this.disconnected && this._wsOpen()) {
    this._socket.close();
    this.disconnected = true;
  }
}

module.exports = Socket;

},{"./util":8,"eventemitter3":9}],8:[function(require,module,exports){
var defaultConfig = {'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};
var dataCount = 1;

var BinaryPack = require('js-binarypack');
var RTCPeerConnection = require('./adapter').RTCPeerConnection;

var util = {
  noop: function() {},

  CLOUD_HOST: '0.peerjs.com',
  CLOUD_PORT: 9000,

  // Browsers that need chunking:
  chunkedBrowsers: {'Chrome': 1},
  chunkedMTU: 16300, // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.

  // Logging logic
  logLevel: 0,
  setLogLevel: function(level) {
    var debugLevel = parseInt(level, 10);
    if (!isNaN(parseInt(level, 10))) {
      util.logLevel = debugLevel;
    } else {
      // If they are using truthy/falsy values for debug
      util.logLevel = level ? 3 : 0;
    }
    util.log = util.warn = util.error = util.noop;
    if (util.logLevel > 0) {
      util.error = util._printWith('ERROR');
    }
    if (util.logLevel > 1) {
      util.warn = util._printWith('WARNING');
    }
    if (util.logLevel > 2) {
      util.log = util._print;
    }
  },
  setLogFunction: function(fn) {
    if (fn.constructor !== Function) {
      util.warn('The log function you passed in is not a function. Defaulting to regular logs.');
    } else {
      util._print = fn;
    }
  },

  _printWith: function(prefix) {
    return function() {
      var copy = Array.prototype.slice.call(arguments);
      copy.unshift(prefix);
      util._print.apply(util, copy);
    };
  },
  _print: function () {
    var err = false;
    var copy = Array.prototype.slice.call(arguments);
    copy.unshift('PeerJS: ');
    for (var i = 0, l = copy.length; i < l; i++){
      if (copy[i] instanceof Error) {
        copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
        err = true;
      }
    }
    err ? console.error.apply(console, copy) : console.log.apply(console, copy);
  },
  //

  // Returns browser-agnostic default config
  defaultConfig: defaultConfig,
  //

  // Returns the current browser.
  browser: (function() {
    if (window.mozRTCPeerConnection) {
      return 'Firefox';
    } else if (window.webkitRTCPeerConnection) {
      return 'Chrome';
    } else if (window.RTCPeerConnection) {
      return 'Supported';
    } else {
      return 'Unsupported';
    }
  })(),
  //

  // Lists which features are supported
  supports: (function() {
    if (typeof RTCPeerConnection === 'undefined') {
      return {};
    }

    var data = true;
    var audioVideo = true;

    var binaryBlob = false;
    var sctp = false;
    var onnegotiationneeded = !!window.webkitRTCPeerConnection;

    var pc, dc;
    try {
      pc = new RTCPeerConnection(defaultConfig, {optional: [{RtpDataChannels: true}]});
    } catch (e) {
      data = false;
      audioVideo = false;
    }

    if (data) {
      try {
        dc = pc.createDataChannel('_PEERJSTEST');
      } catch (e) {
        data = false;
      }
    }

    if (data) {
      // Binary test
      try {
        dc.binaryType = 'blob';
        binaryBlob = true;
      } catch (e) {
      }

      // Reliable test.
      // Unfortunately Chrome is a bit unreliable about whether or not they
      // support reliable.
      var reliablePC = new RTCPeerConnection(defaultConfig, {});
      try {
        var reliableDC = reliablePC.createDataChannel('_PEERJSRELIABLETEST', {});
        sctp = reliableDC.reliable;
      } catch (e) {
      }
      reliablePC.close();
    }

    // FIXME: not really the best check...
    if (audioVideo) {
      audioVideo = !!pc.addStream;
    }

    // FIXME: this is not great because in theory it doesn't work for
    // av-only browsers (?).
    if (!onnegotiationneeded && data) {
      // sync default check.
      var negotiationPC = new RTCPeerConnection(defaultConfig, {optional: [{RtpDataChannels: true}]});
      negotiationPC.onnegotiationneeded = function() {
        onnegotiationneeded = true;
        // async check.
        if (util && util.supports) {
          util.supports.onnegotiationneeded = true;
        }
      };
      negotiationPC.createDataChannel('_PEERJSNEGOTIATIONTEST');

      setTimeout(function() {
        negotiationPC.close();
      }, 1000);
    }

    if (pc) {
      pc.close();
    }

    return {
      audioVideo: audioVideo,
      data: data,
      binaryBlob: binaryBlob,
      binary: sctp, // deprecated; sctp implies binary support.
      reliable: sctp, // deprecated; sctp implies reliable data.
      sctp: sctp,
      onnegotiationneeded: onnegotiationneeded
    };
  }()),
  //

  // Ensure alphanumeric ids
  validateId: function(id) {
    // Allow empty ids
    return !id || /^[A-Za-z0-9_-]+(?:[ _-][A-Za-z0-9]+)*$/.exec(id);
  },

  validateKey: function(key) {
    // Allow empty keys
    return !key || /^[A-Za-z0-9_-]+(?:[ _-][A-Za-z0-9]+)*$/.exec(key);
  },


  debug: false,

  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,

  log: function () {
    if (util.debug) {
      var err = false;
      var copy = Array.prototype.slice.call(arguments);
      copy.unshift('PeerJS: ');
      for (var i = 0, l = copy.length; i < l; i++){
        if (copy[i] instanceof Error) {
          copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
          err = true;
        }
      }
      err ? console.error.apply(console, copy) : console.log.apply(console, copy);
    }
  },

  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // Like setTimeout, but only takes a function argument.	 There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }

    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(window)),

  // Binary stuff

  // chunks a blob.
  chunk: function(bl) {
    var chunks = [];
    var size = bl.size;
    var start = index = 0;
    var total = Math.ceil(size / util.chunkedMTU);
    while (start < size) {
      var end = Math.min(size, start + util.chunkedMTU);
      var b = bl.slice(start, end);

      var chunk = {
        __peerData: dataCount,
        n: index,
        data: b,
        total: total
      };

      chunks.push(chunk);

      start = end;
      index += 1;
    }
    dataCount += 1;
    return chunks;
  },

  blobToArrayBuffer: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
  },
  blobToBinaryString: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsBinaryString(blob);
  },
  binaryStringToArrayBuffer: function(binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 0xff;
    }
    return byteArray.buffer;
  },
  randomToken: function () {
    return Math.random().toString(36).substr(2);
  },
  //

  isSecure: function() {
    return location.protocol === 'https:';
  }
};

module.exports = util;

},{"./adapter":1,"js-binarypack":10}],9:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];

  for (var i = 0, l = this._events[event].length, ee = []; i < l; i++) {
    ee.push(this._events[event][i].fn);
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , length = listeners.length
    , len = arguments.length
    , ee = listeners[0]
    , args
    , i, j;

  if (1 === length) {
    if (ee.once) this.removeListener(event, ee.fn, true);

    switch (len) {
      case 1: return ee.fn.call(ee.context), true;
      case 2: return ee.fn.call(ee.context, a1), true;
      case 3: return ee.fn.call(ee.context, a1, a2), true;
      case 4: return ee.fn.call(ee.context, a1, a2, a3), true;
      case 5: return ee.fn.call(ee.context, a1, a2, a3, a4), true;
      case 6: return ee.fn.call(ee.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    ee.fn.apply(ee.context, args);
  } else {
    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = [];
  this._events[event].push(new EE( fn, context || this ));

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = [];
  this._events[event].push(new EE(fn, context || this, true ));

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) for (var i = 0, length = listeners.length; i < length; i++) {
    if (listeners[i].fn !== fn && listeners[i].once !== once) {
      events.push(listeners[i]);
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) this._events[event] = events;
  else this._events[event] = null;

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) this._events[event] = null;
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

if ('object' === typeof module && module.exports) {
  module.exports = EventEmitter;
}

},{}],10:[function(require,module,exports){
var BufferBuilder = require('./bufferbuilder').BufferBuilder;
var binaryFeatures = require('./bufferbuilder').binaryFeatures;

var BinaryPack = {
  unpack: function(data){
    var unpacker = new Unpacker(data);
    return unpacker.unpack();
  },
  pack: function(data){
    var packer = new Packer();
    packer.pack(data);
    var buffer = packer.getBuffer();
    return buffer;
  }
};

module.exports = BinaryPack;

function Unpacker (data){
  // Data is ArrayBuffer
  this.index = 0;
  this.dataBuffer = data;
  this.dataView = new Uint8Array(this.dataBuffer);
  this.length = this.dataBuffer.byteLength;
}

Unpacker.prototype.unpack = function(){
  var type = this.unpack_uint8();
  if (type < 0x80){
    var positive_fixnum = type;
    return positive_fixnum;
  } else if ((type ^ 0xe0) < 0x20){
    var negative_fixnum = (type ^ 0xe0) - 0x20;
    return negative_fixnum;
  }
  var size;
  if ((size = type ^ 0xa0) <= 0x0f){
    return this.unpack_raw(size);
  } else if ((size = type ^ 0xb0) <= 0x0f){
    return this.unpack_string(size);
  } else if ((size = type ^ 0x90) <= 0x0f){
    return this.unpack_array(size);
  } else if ((size = type ^ 0x80) <= 0x0f){
    return this.unpack_map(size);
  }
  switch(type){
    case 0xc0:
      return null;
    case 0xc1:
      return undefined;
    case 0xc2:
      return false;
    case 0xc3:
      return true;
    case 0xca:
      return this.unpack_float();
    case 0xcb:
      return this.unpack_double();
    case 0xcc:
      return this.unpack_uint8();
    case 0xcd:
      return this.unpack_uint16();
    case 0xce:
      return this.unpack_uint32();
    case 0xcf:
      return this.unpack_uint64();
    case 0xd0:
      return this.unpack_int8();
    case 0xd1:
      return this.unpack_int16();
    case 0xd2:
      return this.unpack_int32();
    case 0xd3:
      return this.unpack_int64();
    case 0xd4:
      return undefined;
    case 0xd5:
      return undefined;
    case 0xd6:
      return undefined;
    case 0xd7:
      return undefined;
    case 0xd8:
      size = this.unpack_uint16();
      return this.unpack_string(size);
    case 0xd9:
      size = this.unpack_uint32();
      return this.unpack_string(size);
    case 0xda:
      size = this.unpack_uint16();
      return this.unpack_raw(size);
    case 0xdb:
      size = this.unpack_uint32();
      return this.unpack_raw(size);
    case 0xdc:
      size = this.unpack_uint16();
      return this.unpack_array(size);
    case 0xdd:
      size = this.unpack_uint32();
      return this.unpack_array(size);
    case 0xde:
      size = this.unpack_uint16();
      return this.unpack_map(size);
    case 0xdf:
      size = this.unpack_uint32();
      return this.unpack_map(size);
  }
}

Unpacker.prototype.unpack_uint8 = function(){
  var byte = this.dataView[this.index] & 0xff;
  this.index++;
  return byte;
};

Unpacker.prototype.unpack_uint16 = function(){
  var bytes = this.read(2);
  var uint16 =
    ((bytes[0] & 0xff) * 256) + (bytes[1] & 0xff);
  this.index += 2;
  return uint16;
}

Unpacker.prototype.unpack_uint32 = function(){
  var bytes = this.read(4);
  var uint32 =
     ((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3];
  this.index += 4;
  return uint32;
}

Unpacker.prototype.unpack_uint64 = function(){
  var bytes = this.read(8);
  var uint64 =
   ((((((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3]) * 256 +
       bytes[4]) * 256 +
       bytes[5]) * 256 +
       bytes[6]) * 256 +
       bytes[7];
  this.index += 8;
  return uint64;
}


Unpacker.prototype.unpack_int8 = function(){
  var uint8 = this.unpack_uint8();
  return (uint8 < 0x80 ) ? uint8 : uint8 - (1 << 8);
};

Unpacker.prototype.unpack_int16 = function(){
  var uint16 = this.unpack_uint16();
  return (uint16 < 0x8000 ) ? uint16 : uint16 - (1 << 16);
}

Unpacker.prototype.unpack_int32 = function(){
  var uint32 = this.unpack_uint32();
  return (uint32 < Math.pow(2, 31) ) ? uint32 :
    uint32 - Math.pow(2, 32);
}

Unpacker.prototype.unpack_int64 = function(){
  var uint64 = this.unpack_uint64();
  return (uint64 < Math.pow(2, 63) ) ? uint64 :
    uint64 - Math.pow(2, 64);
}

Unpacker.prototype.unpack_raw = function(size){
  if ( this.length < this.index + size){
    throw new Error('BinaryPackFailure: index is out of range'
      + ' ' + this.index + ' ' + size + ' ' + this.length);
  }
  var buf = this.dataBuffer.slice(this.index, this.index + size);
  this.index += size;

    //buf = util.bufferToString(buf);

  return buf;
}

Unpacker.prototype.unpack_string = function(size){
  var bytes = this.read(size);
  var i = 0, str = '', c, code;
  while(i < size){
    c = bytes[i];
    if ( c < 128){
      str += String.fromCharCode(c);
      i++;
    } else if ((c ^ 0xc0) < 32){
      code = ((c ^ 0xc0) << 6) | (bytes[i+1] & 63);
      str += String.fromCharCode(code);
      i += 2;
    } else {
      code = ((c & 15) << 12) | ((bytes[i+1] & 63) << 6) |
        (bytes[i+2] & 63);
      str += String.fromCharCode(code);
      i += 3;
    }
  }
  this.index += size;
  return str;
}

Unpacker.prototype.unpack_array = function(size){
  var objects = new Array(size);
  for(var i = 0; i < size ; i++){
    objects[i] = this.unpack();
  }
  return objects;
}

Unpacker.prototype.unpack_map = function(size){
  var map = {};
  for(var i = 0; i < size ; i++){
    var key  = this.unpack();
    var value = this.unpack();
    map[key] = value;
  }
  return map;
}

Unpacker.prototype.unpack_float = function(){
  var uint32 = this.unpack_uint32();
  var sign = uint32 >> 31;
  var exp  = ((uint32 >> 23) & 0xff) - 127;
  var fraction = ( uint32 & 0x7fffff ) | 0x800000;
  return (sign == 0 ? 1 : -1) *
    fraction * Math.pow(2, exp - 23);
}

Unpacker.prototype.unpack_double = function(){
  var h32 = this.unpack_uint32();
  var l32 = this.unpack_uint32();
  var sign = h32 >> 31;
  var exp  = ((h32 >> 20) & 0x7ff) - 1023;
  var hfrac = ( h32 & 0xfffff ) | 0x100000;
  var frac = hfrac * Math.pow(2, exp - 20) +
    l32   * Math.pow(2, exp - 52);
  return (sign == 0 ? 1 : -1) * frac;
}

Unpacker.prototype.read = function(length){
  var j = this.index;
  if (j + length <= this.length) {
    return this.dataView.subarray(j, j + length);
  } else {
    throw new Error('BinaryPackFailure: read index out of range');
  }
}

function Packer(){
  this.bufferBuilder = new BufferBuilder();
}

Packer.prototype.getBuffer = function(){
  return this.bufferBuilder.getBuffer();
}

Packer.prototype.pack = function(value){
  var type = typeof(value);
  if (type == 'string'){
    this.pack_string(value);
  } else if (type == 'number'){
    if (Math.floor(value) === value){
      this.pack_integer(value);
    } else{
      this.pack_double(value);
    }
  } else if (type == 'boolean'){
    if (value === true){
      this.bufferBuilder.append(0xc3);
    } else if (value === false){
      this.bufferBuilder.append(0xc2);
    }
  } else if (type == 'undefined'){
    this.bufferBuilder.append(0xc0);
  } else if (type == 'object'){
    if (value === null){
      this.bufferBuilder.append(0xc0);
    } else {
      var constructor = value.constructor;
      if (constructor == Array){
        this.pack_array(value);
      } else if (constructor == Blob || constructor == File) {
        this.pack_bin(value);
      } else if (constructor == ArrayBuffer) {
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value));
        } else {
          this.pack_bin(value);
        }
      } else if ('BYTES_PER_ELEMENT' in value){
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value.buffer));
        } else {
          this.pack_bin(value.buffer);
        }
      } else if (constructor == Object){
        this.pack_object(value);
      } else if (constructor == Date){
        this.pack_string(value.toString());
      } else if (typeof value.toBinaryPack == 'function'){
        this.bufferBuilder.append(value.toBinaryPack());
      } else {
        throw new Error('Type "' + constructor.toString() + '" not yet supported');
      }
    }
  } else {
    throw new Error('Type "' + type + '" not yet supported');
  }
  this.bufferBuilder.flush();
}


Packer.prototype.pack_bin = function(blob){
  var length = blob.length || blob.byteLength || blob.size;
  if (length <= 0x0f){
    this.pack_uint8(0xa0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xda) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdb);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(blob);
}

Packer.prototype.pack_string = function(str){
  var length = utf8Length(str);

  if (length <= 0x0f){
    this.pack_uint8(0xb0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xd8) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xd9);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(str);
}

Packer.prototype.pack_array = function(ary){
  var length = ary.length;
  if (length <= 0x0f){
    this.pack_uint8(0x90 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xdc)
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdd);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var i = 0; i < length ; i++){
    this.pack(ary[i]);
  }
}

Packer.prototype.pack_integer = function(num){
  if ( -0x20 <= num && num <= 0x7f){
    this.bufferBuilder.append(num & 0xff);
  } else if (0x00 <= num && num <= 0xff){
    this.bufferBuilder.append(0xcc);
    this.pack_uint8(num);
  } else if (-0x80 <= num && num <= 0x7f){
    this.bufferBuilder.append(0xd0);
    this.pack_int8(num);
  } else if ( 0x0000 <= num && num <= 0xffff){
    this.bufferBuilder.append(0xcd);
    this.pack_uint16(num);
  } else if (-0x8000 <= num && num <= 0x7fff){
    this.bufferBuilder.append(0xd1);
    this.pack_int16(num);
  } else if ( 0x00000000 <= num && num <= 0xffffffff){
    this.bufferBuilder.append(0xce);
    this.pack_uint32(num);
  } else if (-0x80000000 <= num && num <= 0x7fffffff){
    this.bufferBuilder.append(0xd2);
    this.pack_int32(num);
  } else if (-0x8000000000000000 <= num && num <= 0x7FFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xd3);
    this.pack_int64(num);
  } else if (0x0000000000000000 <= num && num <= 0xFFFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xcf);
    this.pack_uint64(num);
  } else{
    throw new Error('Invalid integer');
  }
}

Packer.prototype.pack_double = function(num){
  var sign = 0;
  if (num < 0){
    sign = 1;
    num = -num;
  }
  var exp  = Math.floor(Math.log(num) / Math.LN2);
  var frac0 = num / Math.pow(2, exp) - 1;
  var frac1 = Math.floor(frac0 * Math.pow(2, 52));
  var b32   = Math.pow(2, 32);
  var h32 = (sign << 31) | ((exp+1023) << 20) |
      (frac1 / b32) & 0x0fffff;
  var l32 = frac1 % b32;
  this.bufferBuilder.append(0xcb);
  this.pack_int32(h32);
  this.pack_int32(l32);
}

Packer.prototype.pack_object = function(obj){
  var keys = Object.keys(obj);
  var length = keys.length;
  if (length <= 0x0f){
    this.pack_uint8(0x80 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xde);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdf);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)){
      this.pack(prop);
      this.pack(obj[prop]);
    }
  }
}

Packer.prototype.pack_uint8 = function(num){
  this.bufferBuilder.append(num);
}

Packer.prototype.pack_uint16 = function(num){
  this.bufferBuilder.append(num >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_uint32 = function(num){
  var n = num & 0xffffffff;
  this.bufferBuilder.append((n & 0xff000000) >>> 24);
  this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((n & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((n & 0x000000ff));
}

Packer.prototype.pack_uint64 = function(num){
  var high = num / Math.pow(2, 32);
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

Packer.prototype.pack_int8 = function(num){
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int16 = function(num){
  this.bufferBuilder.append((num & 0xff00) >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int32 = function(num){
  this.bufferBuilder.append((num >>> 24) & 0xff);
  this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
  this.bufferBuilder.append((num & 0x000000ff));
}

Packer.prototype.pack_int64 = function(num){
  var high = Math.floor(num / Math.pow(2, 32));
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

function _utf8Replace(m){
  var code = m.charCodeAt(0);

  if(code <= 0x7ff) return '00';
  if(code <= 0xffff) return '000';
  if(code <= 0x1fffff) return '0000';
  if(code <= 0x3ffffff) return '00000';
  return '000000';
}

function utf8Length(str){
  if (str.length > 600) {
    // Blob method faster for large strings
    return (new Blob([str])).size;
  } else {
    return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
  }
}

},{"./bufferbuilder":11}],11:[function(require,module,exports){
var binaryFeatures = {};
binaryFeatures.useBlobBuilder = (function(){
  try {
    new Blob([]);
    return false;
  } catch (e) {
    return true;
  }
})();

binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && (function(){
  try {
    return (new Blob([new Uint8Array([])])).size === 0;
  } catch (e) {
    return true;
  }
})();

module.exports.binaryFeatures = binaryFeatures;
var BlobBuilder = module.exports.BlobBuilder;
if (typeof window != 'undefined') {
  BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder ||
    window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
}

function BufferBuilder(){
  this._pieces = [];
  this._parts = [];
}

BufferBuilder.prototype.append = function(data) {
  if(typeof data === 'number') {
    this._pieces.push(data);
  } else {
    this.flush();
    this._parts.push(data);
  }
};

BufferBuilder.prototype.flush = function() {
  if (this._pieces.length > 0) {
    var buf = new Uint8Array(this._pieces);
    if(!binaryFeatures.useArrayBufferView) {
      buf = buf.buffer;
    }
    this._parts.push(buf);
    this._pieces = [];
  }
};

BufferBuilder.prototype.getBuffer = function() {
  this.flush();
  if(binaryFeatures.useBlobBuilder) {
    var builder = new BlobBuilder();
    for(var i = 0, ii = this._parts.length; i < ii; i++) {
      builder.append(this._parts[i]);
    }
    return builder.getBlob();
  } else {
    return new Blob(this._parts);
  }
};

module.exports.BufferBuilder = BufferBuilder;

},{}],12:[function(require,module,exports){
var util = require('./util');

/**
 * Reliable transfer for Chrome Canary DataChannel impl.
 * Author: @michellebu
 */
function Reliable(dc, debug) {
  if (!(this instanceof Reliable)) return new Reliable(dc);
  this._dc = dc;

  util.debug = debug;

  // Messages sent/received so far.
  // id: { ack: n, chunks: [...] }
  this._outgoing = {};
  // id: { ack: ['ack', id, n], chunks: [...] }
  this._incoming = {};
  this._received = {};

  // Window size.
  this._window = 1000;
  // MTU.
  this._mtu = 500;
  // Interval for setInterval. In ms.
  this._interval = 0;

  // Messages sent.
  this._count = 0;

  // Outgoing message queue.
  this._queue = [];

  this._setupDC();
};

// Send a message reliably.
Reliable.prototype.send = function(msg) {
  // Determine if chunking is necessary.
  var bl = util.pack(msg);
  if (bl.size < this._mtu) {
    this._handleSend(['no', bl]);
    return;
  }

  this._outgoing[this._count] = {
    ack: 0,
    chunks: this._chunk(bl)
  };

  if (util.debug) {
    this._outgoing[this._count].timer = new Date();
  }

  // Send prelim window.
  this._sendWindowedChunks(this._count);
  this._count += 1;
};

// Set up interval for processing queue.
Reliable.prototype._setupInterval = function() {
  // TODO: fail gracefully.

  var self = this;
  this._timeout = setInterval(function() {
    // FIXME: String stuff makes things terribly async.
    var msg = self._queue.shift();
    if (msg._multiple) {
      for (var i = 0, ii = msg.length; i < ii; i += 1) {
        self._intervalSend(msg[i]);
      }
    } else {
      self._intervalSend(msg);
    }
  }, this._interval);
};

Reliable.prototype._intervalSend = function(msg) {
  var self = this;
  msg = util.pack(msg);
  util.blobToBinaryString(msg, function(str) {
    self._dc.send(str);
  });
  if (self._queue.length === 0) {
    clearTimeout(self._timeout);
    self._timeout = null;
    //self._processAcks();
  }
};

// Go through ACKs to send missing pieces.
Reliable.prototype._processAcks = function() {
  for (var id in this._outgoing) {
    if (this._outgoing.hasOwnProperty(id)) {
      this._sendWindowedChunks(id);
    }
  }
};

// Handle sending a message.
// FIXME: Don't wait for interval time for all messages...
Reliable.prototype._handleSend = function(msg) {
  var push = true;
  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
    var item = this._queue[i];
    if (item === msg) {
      push = false;
    } else if (item._multiple && item.indexOf(msg) !== -1) {
      push = false;
    }
  }
  if (push) {
    this._queue.push(msg);
    if (!this._timeout) {
      this._setupInterval();
    }
  }
};

// Set up DataChannel handlers.
Reliable.prototype._setupDC = function() {
  // Handle various message types.
  var self = this;
  this._dc.onmessage = function(e) {
    var msg = e.data;
    var datatype = msg.constructor;
    // FIXME: msg is String until binary is supported.
    // Once that happens, this will have to be smarter.
    if (datatype === String) {
      var ab = util.binaryStringToArrayBuffer(msg);
      msg = util.unpack(ab);
      self._handleMessage(msg);
    }
  };
};

// Handles an incoming message.
Reliable.prototype._handleMessage = function(msg) {
  var id = msg[1];
  var idata = this._incoming[id];
  var odata = this._outgoing[id];
  var data;
  switch (msg[0]) {
    // No chunking was done.
    case 'no':
      var message = id;
      if (!!message) {
        this.onmessage(util.unpack(message));
      }
      break;
    // Reached the end of the message.
    case 'end':
      data = idata;

      // In case end comes first.
      this._received[id] = msg[2];

      if (!data) {
        break;
      }

      this._ack(id);
      break;
    case 'ack':
      data = odata;
      if (!!data) {
        var ack = msg[2];
        // Take the larger ACK, for out of order messages.
        data.ack = Math.max(ack, data.ack);

        // Clean up when all chunks are ACKed.
        if (data.ack >= data.chunks.length) {
          util.log('Time: ', new Date() - data.timer);
          delete this._outgoing[id];
        } else {
          this._processAcks();
        }
      }
      // If !data, just ignore.
      break;
    // Received a chunk of data.
    case 'chunk':
      // Create a new entry if none exists.
      data = idata;
      if (!data) {
        var end = this._received[id];
        if (end === true) {
          break;
        }
        data = {
          ack: ['ack', id, 0],
          chunks: []
        };
        this._incoming[id] = data;
      }

      var n = msg[2];
      var chunk = msg[3];
      data.chunks[n] = new Uint8Array(chunk);

      // If we get the chunk we're looking for, ACK for next missing.
      // Otherwise, ACK the same N again.
      if (n === data.ack[2]) {
        this._calculateNextAck(id);
      }
      this._ack(id);
      break;
    default:
      // Shouldn't happen, but would make sense for message to just go
      // through as is.
      this._handleSend(msg);
      break;
  }
};

// Chunks BL into smaller messages.
Reliable.prototype._chunk = function(bl) {
  var chunks = [];
  var size = bl.size;
  var start = 0;
  while (start < size) {
    var end = Math.min(size, start + this._mtu);
    var b = bl.slice(start, end);
    var chunk = {
      payload: b
    }
    chunks.push(chunk);
    start = end;
  }
  util.log('Created', chunks.length, 'chunks.');
  return chunks;
};

// Sends ACK N, expecting Nth blob chunk for message ID.
Reliable.prototype._ack = function(id) {
  var ack = this._incoming[id].ack;

  // if ack is the end value, then call _complete.
  if (this._received[id] === ack[2]) {
    this._complete(id);
    this._received[id] = true;
  }

  this._handleSend(ack);
};

// Calculates the next ACK number, given chunks.
Reliable.prototype._calculateNextAck = function(id) {
  var data = this._incoming[id];
  var chunks = data.chunks;
  for (var i = 0, ii = chunks.length; i < ii; i += 1) {
    // This chunk is missing!!! Better ACK for it.
    if (chunks[i] === undefined) {
      data.ack[2] = i;
      return;
    }
  }
  data.ack[2] = chunks.length;
};

// Sends the next window of chunks.
Reliable.prototype._sendWindowedChunks = function(id) {
  util.log('sendWindowedChunks for: ', id);
  var data = this._outgoing[id];
  var ch = data.chunks;
  var chunks = [];
  var limit = Math.min(data.ack + this._window, ch.length);
  for (var i = data.ack; i < limit; i += 1) {
    if (!ch[i].sent || i === data.ack) {
      ch[i].sent = true;
      chunks.push(['chunk', id, i, ch[i].payload]);
    }
  }
  if (data.ack + this._window >= ch.length) {
    chunks.push(['end', id, ch.length])
  }
  chunks._multiple = true;
  this._handleSend(chunks);
};

// Puts together a message from chunks.
Reliable.prototype._complete = function(id) {
  util.log('Completed called for', id);
  var self = this;
  var chunks = this._incoming[id].chunks;
  var bl = new Blob(chunks);
  util.blobToArrayBuffer(bl, function(ab) {
    self.onmessage(util.unpack(ab));
  });
  delete this._incoming[id];
};

// Ups bandwidth limit on SDP. Meant to be called during offer/answer.
Reliable.higherBandwidthSDP = function(sdp) {
  // AS stands for Application-Specific Maximum.
  // Bandwidth number is in kilobits / sec.
  // See RFC for more info: http://www.ietf.org/rfc/rfc2327.txt

  // Chrome 31+ doesn't want us munging the SDP, so we'll let them have their
  // way.
  var version = navigator.appVersion.match(/Chrome\/(.*?) /);
  if (version) {
    version = parseInt(version[1].split('.').shift());
    if (version < 31) {
      var parts = sdp.split('b=AS:30');
      var replace = 'b=AS:102400'; // 100 Mbps
      if (parts.length > 1) {
        return parts[0] + replace + parts[1];
      }
    }
  }

  return sdp;
};

// Overwritten, typically.
Reliable.prototype.onmessage = function(msg) {};

module.exports.Reliable = Reliable;

},{"./util":13}],13:[function(require,module,exports){
var BinaryPack = require('js-binarypack');

var util = {
  debug: false,
  
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,
  
  log: function () {
    if (util.debug) {
      var copy = [];
      for (var i = 0; i < arguments.length; i++) {
        copy[i] = arguments[i];
      }
      copy.unshift('Reliable: ');
      console.log.apply(console, copy);
    }
  },

  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // Like setTimeout, but only takes a function argument.	 There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }		

    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(this)),
  
  blobToArrayBuffer: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
  },
  blobToBinaryString: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsBinaryString(blob);
  },
  binaryStringToArrayBuffer: function(binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 0xff;
    }
    return byteArray.buffer;
  },
  randomToken: function () {
    return Math.random().toString(36).substr(2);
  }
};

module.exports = util;

},{"js-binarypack":10}]},{},[3]);
/* https://github.com/jakearchibald/es6-promise */
!function(){var a,b,c,d;!function(){var e={},f={};a=function(a,b,c){e[a]={deps:b,callback:c}},d=c=b=function(a){function c(b){if("."!==b.charAt(0))return b;for(var c=b.split("/"),d=a.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(d._eak_seen=e,f[a])return f[a];if(f[a]={},!e[a])throw new Error("Could not find module "+a);for(var g,h=e[a],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)"exports"===i[l]?k.push(g={}):k.push(b(c(i[l])));var n=j.apply(this,k);return f[a]=g||n}}(),a("promise/all",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to all.");return new b(function(b,c){function d(a){return function(b){f(a,b)}}function f(a,c){h[a]=c,0===--i&&b(h)}var g,h=[],i=a.length;0===i&&b([]);for(var j=0;j<a.length;j++)g=a[j],g&&e(g.then)?g.then(d(j),c):f(j,g)})}var d=a.isArray,e=a.isFunction;b.all=c}),a("promise/asap",["exports"],function(a){"use strict";function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new i(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){j.setTimeout(e,1)}}function e(){for(var a=0;a<k.length;a++){var b=k[a],c=b[0],d=b[1];c(d)}k=[]}function f(a,b){var c=k.push([a,b]);1===c&&g()}var g,h="undefined"!=typeof window?window:{},i=h.MutationObserver||h.WebKitMutationObserver,j="undefined"!=typeof global?global:void 0===this?window:this,k=[];g="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():i?c():d(),a.asap=f}),a("promise/config",["exports"],function(a){"use strict";function b(a,b){return 2!==arguments.length?c[a]:(c[a]=b,void 0)}var c={instrument:!1};a.config=c,a.configure=b}),a("promise/polyfill",["./promise","./utils","exports"],function(a,b,c){"use strict";function d(){var a;a="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;var b="Promise"in a&&"resolve"in a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;return new a.Promise(function(a){b=a}),f(b)}();b||(a.Promise=e)}var e=a.Promise,f=b.isFunction;c.polyfill=d}),a("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){if(!v(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof i))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],j(a,this)}function j(a,b){function c(a){o(b,a)}function d(a){q(b,a)}try{a(c,d)}catch(e){d(e)}}function k(a,b,c,d){var e,f,g,h,i=v(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;n(b,e)||(i&&g?o(b,e):h?q(b,f):a===D?o(b,e):a===E&&q(b,e))}function l(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+D]=c,e[f+E]=d}function m(a,b){for(var c,d,e=a._subscribers,f=a._detail,g=0;g<e.length;g+=3)c=e[g],d=e[g+b],k(b,c,d,f);a._subscribers=null}function n(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(u(b)&&(d=b.then,v(d)))return d.call(b,function(d){return c?!0:(c=!0,b!==d?o(a,d):p(a,d),void 0)},function(b){return c?!0:(c=!0,q(a,b),void 0)}),!0}catch(e){return c?!0:(q(a,e),!0)}return!1}function o(a,b){a===b?p(a,b):n(a,b)||p(a,b)}function p(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(r,a))}function q(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(s,a))}function r(a){m(a,a._state=D)}function s(a){m(a,a._state=E)}var t=a.config,u=(a.configure,b.objectOrFunction),v=b.isFunction,w=(b.now,c.all),x=d.race,y=e.resolve,z=f.reject,A=g.asap;t.async=A;var B=void 0,C=0,D=1,E=2;i.prototype={constructor:i,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(a,b){var c=this,d=new this.constructor(function(){});if(this._state){var e=arguments;t.async(function(){k(c._state,d,e[c._state-1],c._detail)})}else l(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}},i.all=w,i.race=x,i.resolve=y,i.reject=z,h.Promise=i}),a("promise/race",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to race.");return new b(function(b,c){for(var d,e=0;e<a.length;e++)d=a[e],d&&"function"==typeof d.then?d.then(b,c):b(d)})}var d=a.isArray;b.race=c}),a("promise/reject",["exports"],function(a){"use strict";function b(a){var b=this;return new b(function(b,c){c(a)})}a.reject=b}),a("promise/resolve",["exports"],function(a){"use strict";function b(a){if(a&&"object"==typeof a&&a.constructor===this)return a;var b=this;return new b(function(b){b(a)})}a.resolve=b}),a("promise/utils",["exports"],function(a){"use strict";function b(a){return c(a)||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return"[object Array]"===Object.prototype.toString.call(a)}var e=Date.now||function(){return(new Date).getTime()};a.objectOrFunction=b,a.isFunction=c,a.isArray=d,a.now=e}),b("promise/polyfill").polyfill()}();
/*
Copyright (C) 2011 Patrick Gillespie, http://patorjk.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
    Extendible BBCode Parser v1.0.0
    By Patrick Gillespie (patorjk@gmail.com)
    Website: http://patorjk.com/

    This module allows you to parse BBCode and to extend to the mark-up language
    to add in your own tags.
*/

"use strict";

var XBBCODE = (function() {

    // -----------------------------------------------------------------------------
    // Set up private variables
    // -----------------------------------------------------------------------------

    var me = {},
        urlPattern = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:@#%&()~_?\+=\/\\\.]*$/,
        colorNamePattern = /^(?:red|green|blue|orange|yellow|black|white|brown|gray|silver|purple|maroon|fushsia|lime|olive|navy|teal|aqua)$/,
        colorCodePattern = /^#?[a-fA-F0-9]{6}$/,
        tags,
        tagList,
        tagsNoParseList = [],
        bbRegExp,
        pbbRegExp,
        pbbRegExp2,
        openTags,
        closeTags;
        
    /* -----------------------------------------------------------------------------
     * tags
     * This object contains a list of tags that your code will be able to understand.
     * Each tag object has the following properties:
     *
     *   openTag - A function that takes in the tag's parameters (if any) and its
     *             contents, and returns what its HTML open tag should be. 
     *             Example: [color=red]test[/color] would take in "=red" as a
     *             parameter input, and "test" as a content input.
     *             It should be noted that any BBCode inside of "content" will have 
     *             been processed by the time it enter the openTag function.
     *
     *   closeTag - A function that takes in the tag's parameters (if any) and its
     *              contents, and returns what its HTML close tag should be.
     *
     *   displayContent - Defaults to true. If false, the content for the tag will
     *                    not be displayed. This is useful for tags like IMG where
     *                    its contents are actually a parameter input.
     *
     *   restrictChildrenTo - A list of BBCode tags which are allowed to be nested
     *                        within this BBCode tag. If this property is omitted,
     *                        any BBCode tag may be nested within the tag.
     *
     *   restrictParentsTo - A list of BBCode tags which are allowed to be parents of
     *                       this BBCode tag. If this property is omitted, any BBCode 
     *                       tag may be a parent of the tag.
     *
     *   noParse - true or false. If true, none of the content WITHIN this tag will be
     *             parsed by the XBBCode parser.
     *       
     *
     *
     * LIMITIONS on adding NEW TAGS:
     *  - Tag names should be alphanumeric (including underscores) and all tags should have an opening tag
     *    and a closing tag. 
     *    The [*] tag is an exception because it was already a standard
     *    bbcode tag. Technecially tags don't *have* to be alphanumeric, but since 
     *    regular expressions are used to parse the text, if you use a non-alphanumeric 
     *    tag names, just make sure the tag name gets escaped properly (if needed).
     * --------------------------------------------------------------------------- */
        
    tags = {
        "b": {
            openTag: function(params,content) {
                return '<span class="xbbcode-b">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        /*
            This tag does nothing and is here mostly to be used as a classification for
            the bbcode input when evaluating parent-child tag relationships
        */
        "bbcode": {
            openTag: function(params,content) {
                return '';
            },
            closeTag: function(params,content) {
                return '';
            }
        },
        "code": {
            openTag: function(params,content) {
                return '<span class="xbbcode-code">';
            },
            closeTag: function(params,content) {
                return '</span>';
            },
            noParse: true
        },
        "color": {
            openTag: function(params,content) {
            
                var colorCode = params.substr(1) || "black";
                colorNamePattern.lastIndex = 0;
                colorCodePattern.lastIndex = 0;
                if ( !colorNamePattern.test( colorCode ) ) {
                    if ( !colorCodePattern.test( colorCode ) ) {
                        colorCode = "black";
                    } else {
                        if (colorCode.substr(0,1) !== "#") {
                            colorCode = "#" + colorCode;
                        }
                    }
                }
            
                return '<span style="color:' + colorCode + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "i": {
            openTag: function(params,content) {
                return '<span class="xbbcode-i">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "img": {
            openTag: function(params,content) {
            
                var myUrl = content;
                
                urlPattern.lastIndex = 0;
                if ( !urlPattern.test( myUrl ) ) {
                    myUrl = "";
                }
            
                return '<img src="' + myUrl + '" />';
            },
            closeTag: function(params,content) {
                return '';
            },
            displayContent: false
        },
        "list": {
            openTag: function(params,content) {
                return '<ul>';
            },
            closeTag: function(params,content) {
                return '</ul>';
            },
            restrictChildrenTo: ["*", "li"]
        },
        "noparse": {
            openTag: function(params,content) {
                return '';
            },
            closeTag: function(params,content) {
                return '';
            },
            noParse: true
        },
        "php": {
            openTag: function(params,content) {
                return '<span class="xbbcode-code">';
            },
            closeTag: function(params,content) {
                return '</span>';
            },
            noParse: true
        },
        "quote": {
            openTag: function(params,content) {
                return '<blockquote class="xbbcode-blockquote">';
            },
            closeTag: function(params,content) {
                return '</blockquote>';
            }
        },
        "s": {
            openTag: function(params,content) {
                return '<span class="xbbcode-s">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "size": {
            openTag: function(params,content) {
            
                var mySize = parseInt(params.substr(1),10) || 0;
                if (mySize < 4 || mySize > 40) {
                    mySize = 14;
                }
            
                return '<span class="xbbcode-size-' + mySize + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "table": {
            openTag: function(params,content) {
                return '<table class="xbbcode-table">';
            },
            closeTag: function(params,content) {
                return '</table>';
            },
            restrictChildrenTo: ["tbody","thead", "tfoot", "tr"]
        },
        "tbody": {
            openTag: function(params,content) {
                return '<tbody>';
            },
            closeTag: function(params,content) {
                return '</tbody>';
            },
            restrictChildrenTo: ["tr"],
            restrictParentsTo: ["table"]
        },
        "tfoot": {
            openTag: function(params,content) {
                return '<tfoot>';
            },
            closeTag: function(params,content) {
                return '</tfoot>';
            },
            restrictChildrenTo: ["tr"],
            restrictParentsTo: ["table"]
        },
        "thead": {
            openTag: function(params,content) {
                return '<thead class="xbbcode-thead">';
            },
            closeTag: function(params,content) {
                return '</thead>';
            },
            restrictChildrenTo: ["tr"],
            restrictParentsTo: ["table"]
        },
        "td": {
            openTag: function(params,content) {
                return '<td class="xbbcode-td">';
            },
            closeTag: function(params,content) {
                return '</td>';
            },
            restrictParentsTo: ["tr"]
        },
        "th": {
            openTag: function(params,content) {
                return '<td class="xbbcode-th">';
            },
            closeTag: function(params,content) {
                return '</td>';
            },
            restrictParentsTo: ["tr"]
        },
        "tr": {
            openTag: function(params,content) {
                return '<tr class="xbbcode-tr">';
            },
            closeTag: function(params,content) {
                return '</tr>';
            },
            restrictChildrenTo: ["td","th"],
            restrictParentsTo: ["table","tbody","tfoot","thead"]
        },
        "u": {
            openTag: function(params,content) {
                return '<span class="xbbcode-u">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "url": {
            openTag: function(params,content) {
            
                var myUrl;
            
                if (!params) {
                    myUrl = content.replace(/<.*?>/g,"");
                } else {
                    myUrl = params.substr(1);
                }
                
                urlPattern.lastIndex = 0;
                if ( !urlPattern.test( myUrl ) ) {
                    myUrl = "#";
                }
            
                return '<a href="' + myUrl + '">';
            },
            closeTag: function(params,content) {
                return '</a>';
            }
        },
        /*
            The [*] tag is special since the user does not define a closing [/*] tag when writing their bbcode.
            Instead this module parses the code and adds the closing [/*] tag in for them. None of the tags you
            add will act like this and this tag is an exception to the others.
        */
        "*": {
            openTag: function(params,content) {
                return "<li>";
            },
            closeTag: function(params,content) {
                return "</li>";
            },
            restrictParentsTo: ["list"]
        }
    };
    
    // create tag list and lookup fields
    tagList = [];
    (function() {
        var prop,
            ii,
            len;
        for (prop in tags) {
            if (tags.hasOwnProperty(prop)) {
                if (prop === "*") {
                    tagList.push("\\" + prop);
                } else {
                    tagList.push(prop);
                    if ( tags[prop].noParse ) {
                        tagsNoParseList.push(prop);
                    }
                }
                
                tags[prop].validChildLookup = {};
                tags[prop].validParentLookup = {};
                tags[prop].restrictParentsTo = tags[prop].restrictParentsTo || [];
                tags[prop].restrictChildrenTo = tags[prop].restrictChildrenTo || [];
                
                len = tags[prop].restrictChildrenTo.length;
                for (ii = 0; ii < len; ii++) {
                    tags[prop].validChildLookup[ tags[prop].restrictChildrenTo[ii] ] = true;
                }
                len = tags[prop].restrictParentsTo.length;
                for (ii = 0; ii < len; ii++) {
                    tags[prop].validParentLookup[ tags[prop].restrictParentsTo[ii] ] = true;
                }
            }
        }
    })();
    
    bbRegExp = new RegExp("<bbcl=([0-9]+) (" + tagList.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi"); 
    pbbRegExp = new RegExp("\\[(" + tagList.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi"); 
    pbbRegExp2 = new RegExp("\\[(" + tagsNoParseList.join("|") + ")([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]", "gi");    

    // create the regex for escaping ['s that aren't apart of tags
    (function() {
        var closeTagList = [];
        for (var ii = 0; ii < tagList.length; ii++) {
            if ( tagList[ii] !== "\\*" ) { // the * tag doesn't have an offical closing tag
                closeTagList.push ( "/" + tagList[ii] );
            }
        }

        openTags = new RegExp("(\\[)((?:" + tagList.join("|") + ")(?:[ =][^\\]]*?)?)(\\])", "gi"); 
        closeTags = new RegExp("(\\[)(" + closeTagList.join("|") + ")(\\])", "gi"); 
    })();
    
    // -----------------------------------------------------------------------------
    // private functions
    // -----------------------------------------------------------------------------
    
    function checkParentChildRestrictions(parentTag, bbcode, bbcodeLevel, tagName, tagParams, tagContents, errQueue) {
        
        errQueue = errQueue || [];
        bbcodeLevel++;
        
        // get a list of all of the child tags to this tag
        var reTagNames = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","gi"),
            reTagNamesParts = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","i"),
            matchingTags = tagContents.match(reTagNames) || [],
            cInfo,
            errStr,
            ii,
            childTag,
            pInfo = tags[parentTag] || {};
        
        reTagNames.lastIndex = 0;
        
        if (!matchingTags) {
            tagContents = "";
        }
        
        for (ii = 0; ii < matchingTags.length; ii++) {
            reTagNamesParts.lastIndex = 0;
            childTag = (matchingTags[ii].match(reTagNamesParts))[2].toLowerCase();
            
            if ( pInfo.restrictChildrenTo.length > 0 ) {
                if ( !pInfo.validChildLookup[childTag] ) {
                    errStr = "The tag \"" + childTag + "\" is not allowed as a child of the tag \"" + parentTag + "\".";
                    errQueue.push(errStr);
                }
            }
            cInfo = tags[childTag] || {};
            if ( cInfo.restrictParentsTo.length > 0 ) {
                if ( !cInfo.validParentLookup[parentTag] ) {
                    errStr = "The tag \"" + parentTag + "\" is not allowed as a parent of the tag \"" + childTag + "\".";
                    errQueue.push(errStr);
                }
            }
            
        }
        
        tagContents = tagContents.replace(bbRegExp, function(matchStr, bbcodeLevel, tagName, tagParams, tagContents ) {
            errQueue = checkParentChildRestrictions(tagName, matchStr, bbcodeLevel, tagName, tagParams, tagContents, errQueue);
            return matchStr;
        });
        return errQueue;
    }
    
    /*
        This function updates or adds a piece of metadata to each tag called "bbcl" which 
        indicates how deeply nested a particular tag was in the bbcode. This property is removed
        from the HTML code tags at the end of the processing.
    */
    function updateTagDepths(tagContents) {
        tagContents = tagContents.replace(/\<([^\>][^\>]*?)\>/gi, function(matchStr, subMatchStr) {
            var bbCodeLevel = subMatchStr.match(/^bbcl=([0-9]+) /);
            if (bbCodeLevel === null) {
                return "<bbcl=0 " + subMatchStr + ">";
            } else {
                return "<" + subMatchStr.replace(/^(bbcl=)([0-9]+)/, function(matchStr, m1, m2) {
                    return m1 + (parseInt(m2, 10) + 1);
                }) + ">";
            }
        });
        return tagContents;
    }
    
    /*
        This function removes the metadata added by the updateTagDepths function
    */
    function unprocess(tagContent) {
        return tagContent.replace(/<bbcl=[0-9]+ \/\*>/gi,"").replace(/<bbcl=[0-9]+ /gi,"&#91;").replace(/>/gi,"&#93;");
    }
    
    var replaceFunct = function(matchStr, bbcodeLevel, tagName, tagParams, tagContents) {
    
        tagName = tagName.toLowerCase();

        var processedContent = tags[tagName].noParse ? unprocess(tagContents) : tagContents.replace(bbRegExp, replaceFunct),
            openTag = tags[tagName].openTag(tagParams,processedContent),
            closeTag = tags[tagName].closeTag(tagParams,processedContent);
            
        if ( tags[tagName].displayContent === false) {
            processedContent = "";
        }
        
        return openTag + processedContent + closeTag;
    };

    function parse(config) {
        var output = config.text;
        output = output.replace(bbRegExp, replaceFunct);
        return output;
    }
    
    /*
        The star tag [*] is special in that it does not use a closing tag. Since this parser requires that tags to have a closing
        tag, we must pre-process the input and add in closing tags [/*] for the star tag.
        We have a little levaridge in that we know the text we're processing wont contain the <> characters (they have been
        changed into their HTML entity form to prevent XSS and code injection), so we can use those characters as markers to
        help us define boundaries and figure out where to place the [/*] tags.
    */
    function fixStarTag(text) {
        text = text.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/ig, "<");
        text = text.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/ig, ">");

        while (text !== (text = text.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function(matchStr,contents,endTag) {
            
            var innerListTxt = matchStr;
            while (innerListTxt !== (innerListTxt = innerListTxt.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function(matchStr,contents,endTag) {
                if (endTag === ">/list]") {
                    endTag = "</*]</list]";
                } else {
                    endTag = "</*][*]";
                }
                var tmp = "<*]" + contents + endTag;
                return tmp;
            })));
            
            innerListTxt = innerListTxt.replace(/>/g, "<");            
            return innerListTxt;
        })));
        
        // add ['s for our tags back in
        text = text.replace(/</g, "[");
        return text;
    };
    
    function addBbcodeLevels(text) {
        while ( text !== (text = text.replace(pbbRegExp, function(matchStr, tagName, tagParams, tagContents) {
            matchStr = matchStr.replace(/\[/g, "<");
            matchStr = matchStr.replace(/\]/g, ">");
            return updateTagDepths(matchStr);
        })) );
        return text;
    }
    
    // -----------------------------------------------------------------------------
    // public functions
    // -----------------------------------------------------------------------------
    
    me.process = function(config) {
    
        var ret = {html: "", error: false},
            errQueue = [];

        config.text = config.text.replace(/</g, "&lt;"); // escape HTML tag brackets
        config.text = config.text.replace(/>/g, "&gt;"); // escape HTML tag brackets
        
        config.text = config.text.replace(openTags, function(matchStr, openB, contents, closeB) {
            return "<" + contents + ">";
        });
        config.text = config.text.replace(closeTags, function(matchStr, openB, contents, closeB) {
            return "<" + contents + ">";
        });
        
        config.text = config.text.replace(/\[/g, "&#91;"); // escape ['s that aren't apart of tags
        config.text = config.text.replace(/\]/g, "&#93;"); // escape ['s that aren't apart of tags
        config.text = config.text.replace(/</g, "["); // escape ['s that aren't apart of tags
        config.text = config.text.replace(/>/g, "]"); // escape ['s that aren't apart of tags

        // process tags that don't have their content parsed
        while ( config.text !== (config.text = config.text.replace(pbbRegExp2, function(matchStr, tagName, tagParams, tagContents) {
            tagContents = tagContents.replace(/\[/g, "&#91;");
            tagContents = tagContents.replace(/\]/g, "&#93;");
            tagParams = tagParams || "";
            tagContents = tagContents || "";
            return "[" + tagName + tagParams + "]" + tagContents + "[/" + tagName + "]";
        })) );

        config.text = fixStarTag(config.text); // add in closing tags for the [*] tag
        config.text = addBbcodeLevels(config.text); // add in level metadata

        errQueue = checkParentChildRestrictions("bbcode", config.text, -1, "", "", config.text);
        
        ret.html = parse(config);

        if ( ret.html.indexOf("[") !== -1 || ret.html.indexOf("]") !== -1) {
            errQueue.push("Some tags appear to be misaligned.");
        }
    
        if (config.removeMisalignedTags) {
            ret.html = ret.html.replace(/\[.*?\]/g,"");
        }
        if (config.addInLineBreaks) {
            ret.html = ret.html.replace(/\r\n/g, "\n");
            ret.html = ret.html.replace(/(\r|\n)/g, "$1<br/>");
        }
    
        ret.html = ret.html.replace("&#91;", "["); // put ['s back in
        ret.html = ret.html.replace("&#93;", "]"); // put ['s back in
        
        ret.error = (errQueue.length === 0) ? false : true;
        ret.errorQueue = errQueue;
        
        return ret;
    }
    
    return me;
})();
/*
    boron: some utilities for immutability
*/


Boron = {}

Boron.persistent_merge = function(props, data) {
    /// merges a 'flattened' data array into props in a persistent fashion
    /// the new object reuses old data where possible, so requires ~log N additional space
    
    /// given props {fun: {yay:123, ok:123}, cat:{dog:123}}    
    ///   and  data {'fun.yay':0, 'cat.ant.bear':0}}          
    ///     returns {fun: {yay:0, ok:123}, cat:{ant:{bear:0}}}
    
    data = data || []
    
    if(Array.isArray(data) || Array.isArray(data)) {
        // THINK: what do we do with arrays?
        if(Array.isArray(data) !== Array.isArray(props)) {
            // THINK: how to deal with array / object mismatch?
        }
    }
    
    // THINK: what about when data is {cat:{'ant.bear':0}} ?
    
    return Object.keys(data).reduce(function(props, key) {              // OPT: combine these instead of doing them separately
        return Boron.set_deep_value(props, key, data[key])
    }, props)
}

Boron.set_deep_value = function(props, path, value) {
    /// set a value from a flattened path
    
    /// given props {fun: {yay:123, ok:123}, cat:{dog:123}}
    ///   and  path 'fun.ok' 
    ///   and value 456
    ///     returns {fun: {yay:123, ok:456}, cat:{dog:123}}
    
    // var segs = path.split('.')
    // THINK: this is vaguely awful, but without lookbehind it's hard to say "only split on dots that aren't slashed"
    // var segs = path.split('').reverse().join('')
    //                .split(/\.(?!\\)/).reverse()
    //                .map(function(chunk) {return chunk.split('').reverse().join('')})
    //                .map(function(chunk) {return chunk.replace(/[\\]$/, '')})
    
    // THINK: this is vaguely awfuller, but works and is fairly fast and readable. 
    var magic = "___MAGIC___"
    var magic_regex = new RegExp(magic, 'g');
    var path = path.replace(/\\\./g, magic)
    var segs = path.split('.').map(function(chunk) {return chunk.replace(magic_regex, '.')})
    
    var last = segs.pop()
    var next
    var final = next = Boron.shallow_copy(props)

    segs.forEach(function(seg) {
        next[seg] = Boron.shallow_copy(next[seg])
        next = next[seg]
    })

    next[last] = value
    return final
}

Boron.shallow_copy = function(obj) {
    if(Array.isArray(obj)) return obj.slice()
    return Object.keys(obj || {}).reduce(function(acc, key) {acc[key] = obj[key]; return acc}, {})
}

Boron.shallow_diff = function(oldObj, newObj) {                         // results come from newObj
    return Object.keys(oldObj).reduce(function(acc, key) {
        if(JSON.stringify(oldObj[key]) != JSON.stringify(newObj[key]))
            acc[key] = newObj[key]                                      // this pointer copies deep data
        return acc
    }, oldObj.constructor())
}

Boron.deep_diff = function(oldObj, newObj) {                            // results come from newObj
    return Object.keys(newObj).reduce(function(acc, key) {
        var oldtype = typeof oldObj[key]
        var newtype = typeof newObj[key]
        
        if(oldtype != newtype) {
            acc[key] = newObj[key]                                      // this pointer copies deep data
            return acc
        }
        
        if(oldtype == 'object') {
            var diff = Boron.deep_diff(oldObj[key], newObj[key])
            if(Object.keys(diff).length)
                acc[key] = diff
            return acc
        }
        
        if(oldObj[key] !== newObj[key])
            acc[key] = newObj[key]
        return acc
    }, newObj.constructor())
}

Boron.flatten = function(obj, prefix) {
    /// convert {fun: {yay: 123}} into {'fun.yay': 123}
    
    if(!Boron.proper_object(obj)) return {}
    
    var newobj = {}
    prefix = prefix ? prefix + '.' : ''
    
    for(var key in obj) {
        if(!Boron.proper_object(obj[key])) {
            newobj[prefix+key] = obj[key]
        } else {
            newobj = Boron.extend(newobj, Boron.flatten(obj[key], prefix+key)) // OPT: lotsa GC here
        }
    }
    
    return newobj
}

Boron.unflatten = function(obj) {
    /// convert {'fun.yay': 123} into {fun: {yay: 123}}
    
    return Boron.persistent_merge({}, obj) // OPT: GC
    // return Object.keys(obj||{}).reduce(function(acc, key) {return Boron.set_deep_value(acc, key, obj[key])}, {}) // OPT: GC
}

Boron.proper_object = function(obj) { return typeof obj == 'object' && !Array.isArray(obj) && !!obj} 

Boron.extend = function() {
    /// given ({fun:123, yay:123}, {yay:456, ok:789}) as args, returns a new object {fun:123, yay:456, ok:789}
    
    var newobj = {}
    Array.prototype.slice.call(arguments).forEach(function(arg) {
        for(var prop in arg) {
            newobj[prop] = arg[prop] } })
    return newobj
}


Boron.memoize = function(f) {
    var table = {}
    f = typeof f == 'function' ? f : function() {}
    return function() {
        var args = Array.prototype.slice.call(arguments)
        var key = args.toString()
        return table[key] ? table[key] : (table[key] = f.apply(null, args))
    } 
}

/*
     ____  _____ _____ _____ _____ _____ 
    |    \|  _  |   __|     | __  |  _  |
    |  |  |     |  |  |  |  | __ -|     |
    |____/|__|__|_____|_____|_____|__|__|
    
    dagoba: a tiny in-memory graph database

    ex: 
    V = [ {name: 'alice'}                                         // alice gets auto-_id (prolly 1)
        , {_id: 10, name: 'bob', hobbies: ['asdf', {x:3}]}] 
    E = [ {_out: 1, _in: 10, _label: 'knows'} ]
    g = Dagoba.graph(V, E)
    
    g.addVertex({name: 'charlie', _id: 'charlie'})                // string ids are fine
    g.addVertex({name: 'delta', _id: '30'})                       // actually they're all strings

    g.addEdge({_out: 10, _in: 30, _label: 'parent'})
    g.addEdge({_out: 10, _in: 'charlie', _label: 'knows'})

    g.v(1).out('knows').out().run()                               // returns [charlie, delta]
    
    q = g.v(1).out('knows').out().take(1)
    q.run()                                                       // returns [charlie]
    q.run()                                                       // returns [delta]    (but don't rely on result order!)
    q.run()                                                       // returns []
*/


Dagoba = {}                                                       // the namespace

Dagoba.G = {}                                                     // the prototype

Dagoba.graph = function(V, E) {                                   // the factory
  var graph = Object.create( Dagoba.G )
  graph.vertices = []                                             // fresh copies so they're not shared
  graph.edges = []
  graph.vertexIndex = {}
  if(V && Array.isArray(V)) graph.addVertices(V)                  // arrays only, because you wouldn't
  if(E && Array.isArray(E)) graph.addEdges(E)                     // call this with singular V and E
  return graph
}

Dagoba.G.v = function() {                                         // a query initializer: g.v() -> query
  var query = Dagoba.query(this)
  query.add(['vertex'].concat( [].slice.call(arguments) ))
  return query
}

Dagoba.G.addVertex = function(vertex) {
  if(!vertex._id) 
    vertex._id = this.vertices.length+1
  // TODO: ensure unique _id
  this.vertices.push(vertex) // THINK: the user may retain a pointer to vertex, which they might mutate later >.<
  // can take away user's ability to set _id and lose the index cache hash, because building it causes big rebalancing slowdowns and runs the GC hard. (or does it?) [this was with a million items, indexed by consecutive ints. generally we need settable _id because we need to grab vertices quickly by external key]
  this.vertexIndex[vertex._id] = vertex
  vertex._out = []; vertex._in = []
}

Dagoba.G.addEdge = function(edge) {
  if(!edge._label) return false
  edge._in  = this.findVertexById(edge._in)
  edge._out = this.findVertexById(edge._out)
  if(!(edge._in && edge._out)) return false
  edge._out._out.push(edge)
  edge._in._in.push(edge)
  this.edges.push(edge)
}

Dagoba.G.addVertices = function(vertices) { vertices.forEach(this.addVertex.bind(this)) }
Dagoba.G.addEdges    = function(edges)    { edges   .forEach(this.addEdge  .bind(this)) }

Dagoba.G.findVertexById = function(vertex_id) {
  return this.vertexIndex[vertex_id] }

Dagoba.G.findVerticesByIds = function(ids) {
  return ids.length == 1 ? [].concat( this.findVertexById(ids[0]) || [] )
       : ids.map( this.findVertexById.bind(this) ).filter(Boolean) }

Dagoba.G.findVertices = function(ids) {
  return typeof ids[0] == 'object' ? this.searchVertices(ids[0])
       : ids.length == 0 ? this.vertices.slice()                  // OPT: do we need the slice?
       : this.findVerticesByIds(ids) }

Dagoba.G.searchVertices = function(obj) {
  return this.vertices.filter(
    function(vertex) {
      return Object.keys(obj).reduce(
        function(acc, key) {
          return acc && obj[key] == vertex[key] }, true ) } ) }

Dagoba.G.findEdgeById = function(edge_id) {
  return Dagoba.find(this.edges, function(edge) {return edge._id == edge_id} ) }

Dagoba.G.findOutEdges = function(vertex) { return vertex._out; }
Dagoba.G.findInEdges  = function(vertex) { return vertex._in;  }

Dagoba.G.toString = function() {                                  // kids, don't hand code JSON
  return '{"V":' + JSON.stringify(this.vertices, Dagoba.cleanvertex)
       + ',"E":' + JSON.stringify(this.edges,    Dagoba.cleanedge) 
       + '}' }

Dagoba.fromString = function(str) {                               // another graph constructor
  var obj = JSON.parse(str)
  return Dagoba.graph(obj.V, obj.E) 
}



Dagoba.Q = {}                                                     // prototype

Dagoba.query = function(graph) {                                  // factory (only called by a graph's query initializers)
  var query = Object.create( Dagoba.Q )
  
  query.   graph = graph                                          // the graph itself
  query.   state = []                                             // state for each step
  query. program = []                                             // list of steps to take  
  query.gremlins = []                                             // gremlins for each step
  
  return query
}

Dagoba.Q.run = function() {                                       // the magic lives here
  
  var graph = this.graph                                          // these are closed over in the helpers
  var state = this.state                                          // so we give them a spot in the frame
  var program  = this.program
  var gremlins = this.gremlins

  var max = program.length-1                                      // work backwards
  var pc = max                                                    // program counter
  var done = -1                                                   // behindwhich things have finished
  var results = []                                                // results for this run
  var maybe_gremlin = false                                       // a mythical beast

  if(!program.length) return []                                   // don't bother
  
  
  // driver loop
  while(done < max) {
    maybe_gremlin = try_step(pc, maybe_gremlin)                   // maybe_gremlin is a gremlin or (string | false)
    
    if(maybe_gremlin == 'pull') {
      maybe_gremlin = false
      if(pc-1 > done) {
        pc--
        continue
      } else {
        done = pc
      }
    }
    
    if(maybe_gremlin == 'done') {
      done = pc
      maybe_gremlin = false
    }
    
    pc++
    
    if(pc > max) {                                                // a gremlin is popping out of the pipeline. catch it!
      if(maybe_gremlin)
        results.push(maybe_gremlin)
      maybe_gremlin = false
      pc--
    }
  }

  // TODO: deal with gremlin paths / history and gremlin "collisions"
  
  results = results.map(function(gremlin) {                       // make this a query component (or posthook)
    return gremlin.result ? gremlin.result : gremlin.vertex } )

  results = Dagoba.firehooks('postquery', this, results)[0] 
  
  return results
  
  // NAMED HELPERS
  
  function try_step(pc, maybe_gremlin) {
    var step = program[pc]
    var my_state = (state[pc] = state[pc] || {})
    if(!Dagoba.QFuns[step[0]]) return Dagoba.onError('Unrecognized function call: ' + step[0]) || maybe_gremlin || 'pull'
    return Dagoba.QFuns[step[0]](graph, step.slice(1) || {}, maybe_gremlin, my_state)
  }
    
  function gremlin_boxer(step_index) { return function(gremlin) { return [step_index, gremlin] } }
  
  function stepper(step_index, gremlin) {
    var step = program[step_index]
    if(!Dagoba.QFuns[step[0]]) return Dagoba.onError('Unrecognized function call: ' + step[0]) || {}
    return Dagoba.QFuns[step[0]](graph, step.slice(1) || {}, gremlin || {}, state[step_index] || {})
  }
  
  function eat_gremlins(gremlins, step_index, result) {
    return gremlins.concat( (result.stay || []).map(gremlin_boxer(step_index))   )
                   .concat( (result.go   || []).map(gremlin_boxer(step_index+1)) ) }
  
  function setbang_gremlins(step_index, result) {gremlins = eat_gremlins(gremlins, step_index, result)}
}


Dagoba.Q.add = function(list) {                                  // add a new traversal to the query
  this.program.push(list)
  return this
}

Dagoba.addQFun = function(name, fun) {                            // add a new traversal type
  Dagoba.QFuns[name] = fun
  Dagoba.Q[name] = function() { return this.add([name].concat([].slice.apply(arguments))) } 
  // TODO: accept string fun and allow extra params, for building quick aliases like
  //       Dagoba.addQFun('children', 'out') <-- if all out edges are kids
  //       Dagoba.addQFun('nthGGP', 'inN', 'parent')
  // var methods = ['out', 'in', 'take', 'property', 'outAllN', 'inAllN', 'unique', 'filter', 'outV', 'outE', 'inV', 'inE', 'both', 'bothV', 'bothE']
}


Dagoba.QFuns = {}                                                 // all traversal types

Dagoba.addQFun('vertex', function(graph, args, gremlin, state) {
  if(!state.vertices) state.vertices = graph.findVertices(args)
  if(!state.vertices.length) return 'done'
  var vertex = state.vertices.pop() 
  return Dagoba.make_gremlin(vertex)
})
  
Dagoba.addQFun('out', function(graph, args, gremlin, state) {
  if(!gremlin && (!state.edges || !state.edges.length)) return 'pull'
  if(!state.edges || !state.edges.length) 
    state.edges = graph.findOutEdges(gremlin.vertex).filter(Dagoba.filterThings(args[0]))
  if(!state.edges.length) return 'pull'
  var vertex = state.edges.pop()._in // what?
  var clone = Dagoba.make_gremlin(vertex) // we lose history here: use clone_gremlin(gremlin).goto(vertex) instead
  return clone
})

Dagoba.addQFun('outAllN', function(graph, args, gremlin, state) {
  var filter = args[0]
  var limit = args[1]-1
  
  if(!state.edgeList) { // initialize
    if(!gremlin) return 'pull'
    state.edgeList = []
    state.current = 0
    state.edgeList[0] = graph.findOutEdges(gremlin.vertex).filter(Dagoba.filterThings(filter))
  }
  
  if(!state.edgeList[state.current].length) { // finished this round
    if(state.current >= limit || !state.edgeList[state.current+1]   // totally done, or the next round has no items
                              || !state.edgeList[state.current+1].length) {
      state.edgeList = false
      return 'pull'
    }
    state.current++ // go to next round
    state.edgeList[state.current+1] = [] 
  }
  
  var vertex = state.edgeList[state.current].pop()._in
  
  if(state.current < limit) { // add all our matching edges to the next level
    if(!state.edgeList[state.current+1]) state.edgeList[state.current+1] = []
    state.edgeList[state.current+1] = state.edgeList[state.current+1].concat(
      graph.findOutEdges(vertex).filter(Dagoba.filterThings(filter))
    )
  }
  
  var clone = Dagoba.make_gremlin(vertex) // we lose history here: use clone_gremlin(gremlin).goto(vertex) instead
  return clone
})
  
Dagoba.addQFun('inAllN', function(graph, args, gremlin, state) {
  var filter = args[0]
  var limit = args[1]-1
  
  if(!state.edgeList) {                                           // initialize
    if(!gremlin) return 'pull'
    state.edgeList = []
    state.current = 0
    state.edgeList[0] = graph.findInEdges(gremlin.vertex).filter(Dagoba.filterThings(filter))
  }
  
  if(!state.edgeList[state.current].length) {                     // finished this round
    if(state.current >= limit || !state.edgeList[state.current+1] // totally done, or the next round has no items
                              || !state.edgeList[state.current+1].length) {
      state.edgeList = false
      return 'pull'
    }
    state.current++                                               // go to next round
    state.edgeList[state.current+1] = [] 
  }
  
  var vertex = state.edgeList[state.current].pop()._out
  
  if(state.current < limit) {                                     // add all our matching edges to the next level
    if(!state.edgeList[state.current+1]) state.edgeList[state.current+1] = []
    state.edgeList[state.current+1] = state.edgeList[state.current+1].concat(
      graph.findInEdges(vertex).filter(Dagoba.filterThings(filter))
    )
  }
  
  var clone = Dagoba.make_gremlin(vertex) // we lose history here: use clone_gremlin(gremlin).goto(vertex) instead
  return clone
})
  
Dagoba.addQFun('in', function(graph, args, gremlin, state) {
  if(!gremlin && (!state.edges || !state.edges.length)) return 'pull'
  if(!state.edges || !state.edges.length) 
    state.edges = graph.findInEdges(gremlin.vertex).filter(Dagoba.filterThings(args[0]))
  if(!state.edges.length) return 'pull'
  var vertex = state.edges.pop()._out // what? // also, abstract this...
  var clone = Dagoba.make_gremlin(vertex) // we lose history here: use clone_gremlin(gremlin).goto(vertex) instead
  return clone
})
  
Dagoba.addQFun('property', function(graph, args, gremlin, state) {
  if(!gremlin) return 'pull'
  gremlin.result = gremlin.vertex[args[0]]
  return gremlin
})
  
Dagoba.addQFun('unique', function(graph, args, gremlin, state) {
  if(!gremlin) return 'pull'
  if(state[gremlin.vertex._id]) return 'pull'                     // we've seen this gremlin, so get another instead
  state[gremlin.vertex._id] = true
  return gremlin
})
  
Dagoba.addQFun('filter', function(graph, args, gremlin, state) {
  if(!gremlin) return 'pull'
  if(typeof args[0] != 'function') return Dagoba.onError('Filter arg is not a function: ' + args[0]) || gremlin
  if(!args[0](gremlin.vertex)) return 'pull'                      // gremlin fails filter function 
  // THINK: would we ever want to filter by other parts of the gremlin?
  return gremlin
})
  
Dagoba.addQFun('take', function(graph, args, gremlin, state) {
  state.taken = state.taken ? state.taken : 0
  if(state.taken == args[0]) {
    state.taken = 0
    return 'done'
  }
  if(!gremlin) return 'pull'
  state.taken++ // THINK: mutating state
  return gremlin
})



// hi! 
// - tune gremlins (collisions, history, etc)
// - interface: show query pieces and params,
// - interface: resumable queries
// - generational queries
// - intersections
// - adverbs
// - you are great!



Dagoba.hooks = {}

Dagoba.addhook = function(type, callback) {
  if(!Dagoba.hooks[type]) Dagoba.hooks[type] = []
  Dagoba.hooks[type].push(callback)
}

Dagoba.firehooks = function(type, query) {
  var args = [].slice.call(arguments, 2)
  return ((Dagoba.hooks || {})[type] || []).reduce(function(acc, callback) {return callback.apply(query, acc)}, args)
}

Dagoba.make_gremlin = function(vertex, state) { return {vertex: vertex, state: state} }

Dagoba.filterThings = function(arg) {
  return function(thing) {
    return !arg ? true                                                                           // nothing is true
         : arg+'' === arg ? thing._label == arg                                                  // check the label
         : Array.isArray(arg) ? !!~arg.indexOf(thing._label) : Dagoba.objFilter(thing, arg) } }  // or a list of labels

Dagoba.objFilter = function(thing, obj) {
  for(var key in obj)
    if(thing[key] != obj[key])
      return false; return true }

Dagoba.find = function(arr, fun) {
  for (var i = 0, len = arr.length; i < len; i++)
    if(fun(arr[i], i, arr))
      return arr[i] }

Dagoba.cleanvertex = function(key, value) {return (key == '_in' || key == '_out') ? undefined : value} // for JSON.stringify
Dagoba.cleanedge   = function(key, value) {return key == '_in' ? value._id : key == '_out' ? value._id : value}

Dagoba.uniqueify = function (results) { // OPT: do this in the query via gremlin collision counting
  return [results.filter(function(item, index, array) {return array.indexOf(item) == index})]}

Dagoba.cleanclone = function (results) { // remove all _-prefixed properties
 return [results.map(function(item) {return JSON.parse(JSON.stringify(item, function(key, value) {return key[0]=='_' ? undefined : value}))})]}

// NOTE: add these hooks if you need them. (our vertex payloads are immutable, and we uniqueify prior to taking.)

// Dagoba.addhook('postquery', Dagoba.uniqueify)
// Dagoba.addhook('postquery', Dagoba.cleanclone)

// THINK: the uniquify hook happens after the take component so it smushes results down, possibly returning fewer than you wanted...
  
Dagoba.onError = function(msg) {
  console.log(msg)
  return false 
}
/*
    events: a pub/sub system with wildcard paths
*/


Events = {}
Events.subs = {}

Events.pub = function(path, data) {
    return setImmediate(function() {Events.start_pub(path, data)})              // do it next tick
}

Events.sub = function(path, handler) {
    path = Events.scrub_path(path).join('/')
    if(!Events.subs[path]) Events.subs[path] = []
    Events.subs[path].push(handler)
}

Events.unsub = function(path, handler) {
    path = Events.scrub_path(path).join('/')

    var subs = Events.subs[path]
    if(!subs) return false

    var index = subs.indexOf(handler)
    if(index == -1) return false

    subs.splice(index, 1)
}

Events.start_pub = function(path, data) {
    //// pub to * at each level and then to path itself
    var pathlist = Events.scrub_path(path)
    var realpath = pathlist.join('/')

    Events.try_pub('*', data, realpath)                                         // global catchall

    pathlist.reduce(function(acc, seg) {                                        // channel catchalls
        var newacc = acc + seg + '/'
        Events.try_pub(newacc + '*', data, realpath)
        return newacc
    }, '')

    Events.try_pub(realpath, data, realpath)                                    // actual channel
}

Events.try_pub = function(path, data, realpath) {
    var handlers = Events.subs[path]
    if(!handlers || !handlers.length) return false
    handlers.forEach(function(handler) {handler(data, realpath)})
    // THINK: use setImmediate here?
}


Events.scrub_path = function(path) {
    return path.replace(/^[^\w*-]+/, '')                                        // trim leading slashes etc
        .replace(/[^\w*-]+$/, '')                                               // trim trailing gunk
        .split('/')                                                             // break out the path segments
        .map(function(item) {return item.replace(/[^\w*-]/g, '')})              // scrub each segment
}


// maybe later
// eventlog = []
// Events.sub('*', function(data, path) {
//     eventlog.push([path, data])
// })


FileFile = {}

FileFile.oldFile = null

FileFile.prepBlob = function(str, type) {
    if (typeof str != 'string')
        str = JSON.stringify(str)

    var blob

    if (type == 'file')
        blob = FileFile.dataURItoBlob(str)
    else
        blob = new Blob([str], {type: 'text/plain'})

    if (navigator.appVersion.toString().indexOf('.NET') > 0)            // IE needs to directly save the blob object
        return blob

    if(FileFile.oldFile)                                                // prevents old blobs from causing mem leaks
       window.URL.revokeObjectURL(FileFile.oldFile)

    FileFile.oldFile = window.URL.createObjectURL(blob)

    return FileFile.oldFile
}

FileFile.openPuffFile = function(element) {                
    return FileFile.handleFileOpen(element)
}

FileFile.openTextFile = function(element) {                
    return FileFile.handleFileOpen(element)
}

FileFile.openBinaryFile = function(element) {                
    return FileFile.handleFileOpen(element, 'asDataURI')
}

FileFile.handleFileOpen = function(element, asDataURI) {                
    return new Promise(function(resolve, reject) {
        var reader = new FileReader()

        reader.onload = function(event) {
            // console.log(reader)
            var dataURIContent = event.target.result
            // var blob = FileFile.dataURItoBlob(dataURIContent)
            resolve(dataURIContent)
        }
        
        if(!element.files[0]) // THINK: is false the right response?
            return reject('No file selected')
            
        if(asDataURI)
            reader.readAsDataURL(element.files[0])
        else
            reader.readAsText(element.files[0])
    })
}

FileFile.dataURItoBlob = function(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a Blob
    // via http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    var byteString
    
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1])
    else
        byteString = unescape(dataURI.split(',')[1])

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length)
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], {type:mimeString})
}

/*
    gridbox: a simple system for putting things in places
*/

Gridbox = {}

Gridbox.getGridCoordBox = function(rows, cols, outerwidth, outerheight, verticalPadding) {
    var min = function(a, b) {return Math.min(a, b)}
    var max = function(a, b) {return Math.max(a, b)}
    var gridwidth  = outerwidth  / cols
    var gridheight = outerheight / rows
    var eq = function(a, b) {return a == b}
    var grid = Array.apply(0, Array(rows))
        .map(function() {return Array.apply(0, Array(cols))
            .map(function() {return 0})}) // build 2D array

    return { get: function() {return grid}
        , set_eq: function(new_eq) {eq = new_eq}
        , add: function(width, height, miny, minx, maxy, maxx, pointer) {
            maxy = min(maxy||rows-height, rows-height), maxx = min(maxx||cols-width, cols-width)
            miny = min(miny||0, maxy), minx = min(minx||0, maxx)
            if(maxx<0 || maxy<0) return EB.onError('Block is too big for the grid')

            top: for(var y = miny; y <= maxy; y++) {
                bot: for(var x = minx; x <= maxx;  x++) {
                    for(var dy = 0; dy < height; dy++) {
                        for(var dx = 0; dx < width; dx++) {
                            if(grid[y+dy][x+dx]) continue bot }}
                    break top }}
            if(x == maxx+1 && y == maxy+1) return EB.onError('No room in the grid')
            if(x == null || y == null) return EB.onError('Block too big for the grid')
            for(var dy = 0; dy < height; dy++) {
                for(var dx = 0; dx < width; dx++) {
                    grid[y+dy][x+dx] = pointer || 1 } }
            return {width: width*gridwidth, height: height*gridheight, x: x*gridwidth, y: y*gridheight+(verticalPadding/1.5)} // THINK: generalize verticalPadding 
        }
    }
}

Gridbox.findNeighbor = function(grid, pointer, dir) {
    var boxCoords = Gridbox.findBoxInGrid(grid, pointer)
    if(!boxCoords) return false

    // TODO: need to indicate if dirBox is outside of grid, versus pointer not found

    var dirBox = Gridbox.makeDirBox(boxCoords, dir)
    if(!dirBox) return false

    return Gridbox.firstThingInBox(grid, dirBox[0], dirBox[1])
}

Gridbox.findBoxInGrid = function(grid, target, eq) {
    /// find something in a grid box and return coords
    /// NOTE: this assumes rectilinear shapes
    eq = eq || function(a, b) {return a === b}
    eq = function(a, b) {return a.sig === b.sig} // TODO: encapsulate eq in gridBox // OPT: don't look inside

    top: for(var y = 0, ly = grid.length; y < ly; y++)
        for(var x = 0, lx = grid[y].length; x < lx; x++)
            if(eq(grid[y][x], target)) break top                        // find top and left coords

    if(y == grid.length && x == grid[0].length) return false            // target not in box

    for(var dy = 0, ly = grid.length-y; dy < ly; dy++)
        if(!eq(grid[y+dy][x], target)) break                            // find bottom coord

    for(var dx = 0, lx = grid[y].length-x; dx < lx; dx++)
        if(!eq(grid[y][x+dx], target)) break                            // find right coord

    return [[x, y], [x+dx-1, y+dy-1]]                                   // minus one because deltas always overshoot
}

Gridbox.firstThingInBox = function(grid, topleft, botright) {
    for(var y = Math.max(topleft[1], 0), ly = Math.min(botright[1], grid.length-1); y <= ly; y++)
        for(var x = Math.max(topleft[0], 0), lx = Math.min(botright[0], grid[0].length-1); x <= lx; x++)
            if(grid[y][x]) return grid[y][x]                            // lteq because our boxes are inclusive;
}                                                                       // boundaries are built in.

Gridbox.makeDirBox = function(boxCoords, dir) {
    var top   = boxCoords[0][1]
    var left  = boxCoords[0][0]
    var bot   = boxCoords[1][1]
    var right = boxCoords[1][0]

    if(dir == 'up')    return [[left, top-1],  [right, top-1]]
    if(dir == 'down')  return [[left, bot+1],  [right, bot+1]]
    if(dir == 'left')  return [[left-1, top],  [left-1, bot]]
    if(dir == 'right') return [[right+1, top], [right+1, bot]]
}

/*
    Timing is everything
*/

~function() {
    var setImmediate, handleMessage
    
    ~function() {
        //// postpone until next tick
        // inspired by http://dbaron.org/log/20100309-faster-timeouts
        var later = []
        var messageName = 12345
        var gimme_a_tick = true

        setImmediate = function(fun) {
            later.push(fun)

            if(gimme_a_tick) {
                gimme_a_tick = false
                window.postMessage(messageName, "*")
            }
        
            return false
        }

        handleMessage = function(event) {
            if(event.data != messageName) return false

            event.stopPropagation()
            gimme_a_tick = true

            var now = later
            later = []

            for(var i=0, l=now.length; i < l; i++)
                now[i]()
        }
    }()

    function queuer() {
        //// do something after some other things
        var queue = []

        var nexttime = function(invoker) {
            invoker(function() {
                if(!queue.length) return false
                queue.shift()()
                nexttime(invoker)
            })
        }

        var queuer = function(invoker, fun) {
            queue.push(fun)
            if(queue.length > 1) return false // THINK: possible race condition
            nexttime(invoker) 
        }

        return queuer
    }

    function once() {
        //// do something later, but only once
        var later = []

        var step = function() {
            var now = later
            later = []
            for(var i=0, l=now.length; i < l; i++)
                now[i]()
        }

        var once = function(invoker, fun) {
            if(~later.indexOf(fun)) return false
            later.push(fun)
            if(later.length > 1) return false // THINK: possible race condition
            invoker(step) 
        }

        return once
    }

    if(typeof window != 'undefined') {
        window.addEventListener('message', handleMessage, true)
        window.setImmediate = setImmediate
        
        window.queueImmediate = queuer().bind(null, setImmediate)
        window.onceImmediate  = once().bind(null, setImmediate)
        window.queueRAF = queuer().bind(null, requestAnimationFrame)
        window.onceRAF  = once().bind(null, requestAnimationFrame)
    
        var timefunbind = {}
        window.onceInAwhile = function(fun, time) {
            //// NOTE: don't use the same fun with different times
            if(timefunbind[fun]) return false
            timefunbind[fun] = setTimeout(function() {fun(); timefunbind[fun] = false}, time)
        }
    }
}()

/*
     ______     __   __   ______     ______     __  __     ______     __     ______  
    /\  ___\   /\ \ / /  /\  ___\   /\  == \   /\ \_\ \   /\  == \   /\ \   /\__  _\ 
    \ \  __\   \ \ \'/   \ \  __\   \ \  __<   \ \____ \  \ \  __<   \ \ \  \/_/\ \/ 
     \ \_____\  \ \__|    \ \_____\  \ \_\ \_\  \/\_____\  \ \_____\  \ \_\    \ \_\ 
      \/_____/   \/_/      \/_____/   \/_/ /_/   \/_____/   \/_____/   \/_/     \/_/ 

    The main interface for the EveryBit platform.

    Most calls to the platform should go through here,
    rather than accessing core systems like EB.Data and EB.Crypto directly.

    In addition to the public-facing API some general helper functions
    are established here for use by the deeper layers.

    Copyright 2014-2015 EveryBit. See README for license information.

*/

if(typeof EB === 'undefined') EB = {}                   // we might load config.js first
if(!EB.CONFIG) EB.CONFIG = {}                           // or we might not

EB.Modules = {}                                         // supplementary extensions live here
EB.M = EB.Modules

EB.version = '0.8.0'


////////////// STANDARD API FUNCTIONS //////////////////

// Note that almost all of the EB.* API functions return a promise, with the exception of EB.formatIdentityFile and EB.loginWithIdentityFile. (The fire-and-forget interface housed in this file is also non-promise-based.)


//// THE FIRE AND FORGET INTERFACE FOR RECEIVING MESSAGES

// The fire-and-forget style interface, where we ask for a puff and either
// - receive it directly if it's in the cache, or
// - receive false, but meanwhile a request is sent
// This can be easier than dealing with promises when e.g. showing cat photos:
// start by showing whichever cats you have in the cache at that moment. 
// When more cats arrive a refresh is triggered and those additional cats are shown too.
// If you return a promise then you'd have to wait for 'all available cats' before resolving it,
// but there's no way to know when the last cat has arrived -- halting problem.


EB.FAF = {}

/**
 * Try to get a puff by its sig from the local cache, or ask the network and return false
 * @param {string}  sig
 * @return {(puff|false)}
 */
EB.FAF.getPuffBySig = function(sig) {
    return EB.Data.getPuffOrNot(sig)
}


/**
 * Get a list of the current identity's currently cached puffs, and ask the network for more
 * @return {[puffs]}
 */
EB.FAF.getMyMessages = function() {
    // get current username
    // ask the network for anything new from or for me
    // return things from caches
}




//// RECEIVE MESSAGES


/**
 * Try to get a particular puff by its signature
 * @param {string}  The signature of a puff
 * @return {promise}
 */
EB.getPuffBySig = function(sig) {
    return EB.Data.getPuffBySig(sig)                    // get a promise for the puff from cache or network
}


//// SEND MESSAGES


/**
 * Send a public message
 * @param {string}    A message string
 * @param {string}    Optional, defaults to 'text'
 * @return {promise}
 */
EB.postPublicMessage = function(content, type) {
    type = type || 'text'
    
    var myUsername = EB.getCurrentUsername()
    if(!myUsername)
        return EB.emptyPromise('You must have a current identity to post a public message')
    
    var puff = EB.Puff.simpleBuild(type, content)
    return Promise.resolve(EB.Data.addPuffToSystem(puff))
}


/**
 * Send a private message
 * @param {string}    A message string
 * @param {array}     A list of usernames
 * @param {string}    Optional, defaults to 'text'
 * @return {promise}
 */
EB.postPrivateMessage = function(content, usernames, type) {
    type = type || 'text'

    var myUsername = EB.getCurrentUsername()
    if(!myUsername)
        return EB.emptyPromise('You must have a current identity to post a private message')
    
    usernames = usernames || []
    if(!Array.isArray(usernames))
        usernames = [usernames]
    
    usernames.push(myUsername)
    usernames = EB.uniquify(usernames)
    var prom = EB.Users.usernamesToUserRecordsPromise(usernames)
    
    return prom.then(function(userRecords) {        
        var puff = EB.Puff.simpleBuild(type, content, null, usernames, userRecords)
        return EB.Data.addPuffToSystem(puff)
    })
    
    return prom
}


/**
 * Send an anonymous private message
 * @param {string}    A message string
 * @param {array}     A list of usernames
 * @param {string}    Optional, defaults to 'text'
 * @return {promise}
 */
EB.postAnonymousPrivateMessage = function(content, usernames, type) {
    return EB.Data.sendAnonModePuff(content, usernames, type, 'anon')
}


/**
 * Send a traceless private message
 * @param {string}    A message string
 * @param {array}     A list of usernames
 * @param {string}    Optional, defaults to 'text'
 * @return {promise}
 */
EB.postTracelessPrivateMessage = function(content, usernames, type) {
    return EB.Data.sendAnonModePuff(content, usernames, type, 'doublyanon')
}


//// IDENTITY AND USER MANAGEMENT


/**
 * Create a new identity
 * @param {string}    new username
 * @param {string}    a string passphrase
 * @return {promise}  userRecord for the newly created user
 */
EB.createIdentity = function(username, passphrase) {
    // TODO: validations and error handling (lots of it)
    
    var prependedPassphrase = username + passphrase
        var privateKey = EB.Crypto.passphraseToPrivateKeyWif(prependedPassphrase)
    
    var prom = EB.registerTopLevelUser(username, privateKey, privateKey, privateKey)
    
    prom.then(function(userRecord) {
        var capa = 1 // THINK: does capa always start at 1? where should that knowledge live?
        EB.addAlias(username, username, capa, privateKey, privateKey, privateKey, {passphrase: passphrase})
        EB.switchIdentityTo(username)
    })
    
    // TODO: on switchIdentityTo false change undefined to ''
    
    return prom
}


/**
 * Register a new top-level user
 * @param {string}     new username
 * @param {string}     new private root key
 * @param {string}     new private admin key
 * @param {string}     new private default key
 * @return {promise}   userRecord for the newly created user
 */
EB.registerTopLevelUser = function(username, privateRootKey, privateAdminKey, privateDefaultKey) {
    // OPT: privateToPublic is expensive -- we could reduce the number of calls if the private keys are identical
    var rootKey    = EB.Crypto.privateToPublic(privateRootKey)
    var adminKey   = EB.Crypto.privateToPublic(privateAdminKey)
    var defaultKey = EB.Crypto.privateToPublic(privateDefaultKey)

    var puff = EB.Puff.buildUserRegistration(username, privateAdminKey, username, rootKey, adminKey, defaultKey)
    var prom = EB.Net.updateUserRecord(puff)
    
    return prom
}


/**
 * Register a subuser for the currently active identity
 * @param  {string}    desired new subuser name
 * @param  {string}    public root key for the new subuser
 * @param  {string}    public admin key for the new subuser
 * @param  {string}    public default key for the new subuser
 * @return {promise}   userRecord for the newly created subuser
 */
EB.registerSubuser = function(newUsername, rootKey, adminKey, defaultKey) {
    var signingUsername = EB.getCurrentUsername()
    var prom
    
    EB.useSecureInfo(function(_, _, _, privateAdminKey, _) {
        prom = EB.Users.registerSubuserForUser(signingUsername, privateAdminKey, newUsername, rootKey, adminKey, defaultKey)
    })
    
    return prom
}


/**
 * Attempts to update a private key for the current user
 * If successful it adds the new alias to the current identity.
 * @param {string}     'defaultKey', 'adminKey', or 'rootKey'
 * @param {string}     the new private key
 * @param {string}     secret information to include in the userRecord
 * @return {promise}   the new userRecord
 */
EB.updatePrivateKey = function(keyToModify, newPrivateKey, secrets) {    
    var username = EB.getCurrentUsername()
    var newPublicKey = EB.Crypto.privateToPublic(newPrivateKey)

    if(['defaultKey', 'adminKey', 'rootKey'].indexOf(keyToModify) == -1)
        return EB.emptyPromise('That is not a valid key to modify')

    var payload = {}
    var routes  = []
    var content = 'modifyUserKey'
    var type    = 'updateUserRecord'

    payload.keyToModify = keyToModify
    payload.newKey = newPublicKey
    payload.time = Date.now()

    var prom = new Promise(function(resolve, reject) {
        var puff                                        // we use this var to return publicly accessible data 

        EB.useSecureInfo(function(_, _, privateRootKey, privateAdminKey, privateDefaultKey) {
            var signingUserKey = 'privateRootKey'       // changing admin or root keys requires root privileges
            var privateKey = privateRootKey

            if (keyToModify == 'defaultKey') { 
                signingUserKey = 'privateAdminKey'      // changing the default key only requires admin privileges
                privateKey = privateAdminKey
            }

            if(!privateKey) {
                return reject(EB.makeError("You need the " + signingUserKey + " to change the " + keyToModify + " key."))
            } else {
                puff = EB.Puff.build(username, privateKey, routes, type, content, payload)
            }
        })

        var userRecordPromise = EB.Net.updateUserRecord(puff)

        userRecordPromise.then(function(userRecord) {
            if(keyToModify == 'defaultKey') {
                EB.useSecureInfo(function(_, username, privateRootKey, privateAdminKey, _) {
                    EB.addAlias(username, username, userRecord.capa, privateRootKey, privateAdminKey, newPrivateKey, secrets)
                })
            }

            if(keyToModify == 'adminKey') {
                EB.useSecureInfo(function(_, username, privateRootKey, _, privateDefaultKey) {
                    EB.addAlias(username, username, userRecord.capa, privateRootKey, newPrivateKey, privateDefaultKey, secrets)
                })
            }

            if(keyToModify == 'rootKey') {
                EB.useSecureInfo(function(_, username, _, privateAdminKey, privateDefaultKey) {
                    EB.addAlias(username, username, userRecord.capa, newPrivateKey, privateAdminKey,  privateDefaultKey, secrets)
                })
            }

            return resolve(userRecord)
        })
        .catch(function(err) {
            return reject(EB.makeError(err))
        })
    })

    return prom
}


/**
 * Try to get a user's profile puff
 * @param {string}  The username
 * @return {promise}
 */
EB.getProfilePuff = function(username) {
    var cached_profile = EB.Data.profiles[username]
    
    if(cached_profile)
        return Promise.resolve(cached_profile)

    var prom = EB.Net.getProfilePuff(username)

    prom = prom.then(function(puffs) {
        var puff = puffs[0]
    
        // NOTE: Setting this prevents us from re-trying to collect profiles from users who don't have them.
        //       This is good, because it prevents network noise, but requires a refresh to see new profile info.
        if(!puff)
            puff = {payload:{}} // TODO: get a proper empty puff from somewhere
        
        EB.Data.profiles[EB.Users.justUsername(puff.username || username)] = puff
    
        return puff
    })

    return prom
}


//// LOGIN & ID FILE MANAGEMENT


/**
 * Make an identity the current one
 * @param {string}   main username for the identity
 * @param {string}   the key for the user's identity file
 * @return {promise}
 */
EB.login = function(username, privateKey) {
    // TODO: handle offline case...
    // TODO: encrypted localStorage identity files
    // TODO: cache encrypted puffs in localStorage
    // TODO: grab the user record from EB.loginWithPassphrase
    
    userprom = EB.Users.getUserRecordNoCache(username)
    
    return userprom.then(function(userRecord) {
        if(!userRecord)
            return EB.onError('Could not access user record')
        
        var identitySig = userRecord.identity
        
        if(identitySig) {
            var decryptprom = EB.Users.getIdentityPuff(userRecord, privateKey)
            
            return decryptprom.then(function(letter) {
                if(letter && letter.payload && letter.payload.content)
                    return EB.loginWithIdentityFile(letter.payload.content)
                else
                    return EB.throwError('Invalid password') // THINK: this could happen for other reasons
            }, function(err) {
                return EB.catchError('Could not access identity file')
            })
        }
        
        // no identity puff, so try it the old fashioned way
        // TODO: move this into a helper function
        var publicKey = EB.Crypto.privateToPublic(privateKey)
        
        if( (userRecord.defaultKey != publicKey) 
         && (userRecord.adminKey   != publicKey) 
         && (userRecord.rootKey    != publicKey) )
            return EB.onError('That user record has no identity file, and the public key provided does not match')
    
        var secrets = {} // {passphrase: passphrase} // THINK: maybe move this up a level to loginWithPassphrase
        EB.addAlias(username, username, userRecord.capa, privateKey, privateKey, privateKey, secrets)

        EB.switchIdentityTo(username)
        
        EB.storeIdentityFileInCloud()
        
        return true
    })
}


/**
 * Takes a canonical identity file object, adds it to the wardrobe, and signs you in
 * @param {object} Identity file
 * @return 
 */
EB.loginWithIdentityFile = function(object) {
    var username = object.username
    var aliases  = object.aliases
    var preferences = object.preferences
    
    if(!username || !aliases || !preferences)
        return EB.onError('That is not a valid identity object')
    
    EB.currentIdentityHash = EB.Crypto.createMessageHash(JSON.stringify(object))
    
    EB.addIdentity(username, aliases, preferences)
    
    return EB.switchIdentityTo(username)
}


/**
 * Try to access the system with a username/passphrase combo
 * @param {string}   Identity's primary username
 * @param {string}   Passphrase to unlock the identity file
 * @param {string}   Used internally
 * @return {promise}
 */
EB.loginWithPassphrase = function(username, passphrase, legacy) {
    // First attempt to prepend username to passphrase
    // If that fails then try just using the passphrase
    var pass = legacy ? passphrase : username + passphrase

    var privateKey = EB.Crypto.passphraseToPrivateKeyWif(pass)
    var publicKey = EB.Crypto.privateToPublic(privateKey)

    var userprom = EB.Users.getUserRecordNoCache(username)

    return userprom.then(function(userRecord) {
        if(!userRecord)
            return EB.onError('Could not access user record')
        
        if( (userRecord.defaultKey != publicKey) 
         && (userRecord.adminKey   != publicKey) 
         && (userRecord.rootKey    != publicKey) )
            return (legacy) ? false : EB.loginWithPassphrase(username, passphrase, true)

        return EB.login(username, privateKey)
    })
}


/**
 * Store the current identity's identity file in the cloud
 * @return {promise}
 */
EB.storeIdentityFileInCloud = function() {
    if(!EB.currentIdentityHash) {
        // THINK: user did not log in with identity file... so what should we do here?
    }

    // get identity file
    var content = EB.formatIdentityFile()
    if(!content) return false
    
    // check against latest
    var newIdentityHash = EB.Crypto.createMessageHash(JSON.stringify(content))
    if(EB.currentIdentityHash == newIdentityHash) return false
    EB.currentIdentityHash = newIdentityHash
    
    // package as encrypted puff
    var payload = {}
    var routes  = []
    var type    = 'identity'
        
    var userRecord = EB.getCurrentUserRecord()
    var userRecordsForWhomToEncrypt = [userRecord]

    if(!userRecord) return false

    // THINK: using simpleBuildPuff puts a timestamp in the identity file...
    var puff = EB.Puff.simpleBuild(type, content, payload, routes, userRecordsForWhomToEncrypt)
    
    if(!puff) return false
        
    // if(puff.sig == userRecord.identity) return false // always false, because of the timestamp -- if you remove it, add this back
    
    EB.Net.distributePuff(puff)                         // send it to the server
    
    // update user record
    var payload = {}                                    // NOTE: the double "var"s don't hurt, and help keep us focused
    var routes  = []
    var type    = 'updateUserRecord'
    var content = 'setIdentity'
    var update_puff

    payload.identity = puff.sig

    EB.useSecureInfo(function(_, currentUsername, _, privateAdminKey, _) {
        if(!privateAdminKey)
            return EB.onError('You must have an administrative key to upload your identity file')
        
        update_puff = EB.Puff.build(currentUsername, privateAdminKey, routes, type, content, payload)
    })
    
    if(!update_puff)
        return false
    
    var update_prom = EB.Net.updateUserRecord(update_puff)
        
    return update_prom
}


/**
 * Try to get an identity file and format it correctly
 * @param {string} Identity's primary username
 * @return {(object|false)}
 */
EB.formatIdentityFile = function(username) {
    // THINK: consider passphrase protecting the identity file by default
    // TODO: add authFromIdFile -- need consistency both ways
    
    username = username || EB.getCurrentUsername()
    
    if(!username) return false

    var idFile = {}

    EB.useSecureInfo(function(identities, currentUsername, privateRootKey, privateAdminKey, privateDefaultKey) {
        // this leaks all of the identity information back to the caller
        // if we passphrase protect the file, do it here to prevent that leakage

        var identity = identities[username]

        // assemble idFile manually to keep everything in the right order
        // idFile.comment = "This file contains your private passphrase. The information here can be used to login to websites on the EveryBit platform. Keep this file safe and secure!"

        idFile.username = username
        // idFile.primary  = identity.primary // NOTE: primary is automatically gathered from aliases
        idFile.aliases  = identity.aliases
        idFile.preferences = identity.preferences
        idFile.version  = "1.1"
    })

    return idFile
}

//// END STANDARD API ////





//// SECURE INFORMATION INTERFACE

EB.implementSecureInterface = function(useSecureInfo, addIdentity, addAlias, setPrimaryAlias, setPreference, switchIdentityTo, removeIdentity) {
    // API cheatsheet:
    // useSecureInfo    = function( function(identities, username, privateRootKey, privateAdminKey, privateDefaultKey) )
    // addIdentity      = function(username, aliases, preferences)
    // addAlias         = function(identityUsername, aliasUsername, capa, privateRootKey, privateAdminKey, privateDefaultKey, secrets)
    // setPrimaryAlias  = function(identityUsername, aliasUsername)
    // removeIdentity   = function(username)
    // setPreference    = function(key, value) // for current identity
    // switchIdentityTo = function(username)

    // THINK: consider ensuring all functions are present first, so it's harder to mix and match wardrobe implementations
    
    if(typeof useSecureInfo == 'function') {
        EB.useSecureInfo = function(callback) {
            // NOTE: useSecureInfo returns true if there is a current identity, and false otherwise
            return useSecureInfo( function(identities, username, privateRootKey, privateAdminKey, privateDefaultKey) {
                var clonedIdentities = JSON.parse(JSON.stringify(identities)) // prevent accidental mutation
                callback(clonedIdentities, username, privateRootKey, privateAdminKey, privateDefaultKey)
            })
        }
    }
    
    if(typeof addIdentity == 'function')
        EB.addIdentity = addIdentity
        
    if(typeof addAlias == 'function')
        EB.addAlias = addAlias
        
    if(typeof setPrimaryAlias == 'function')
        EB.setPrimaryAlias = setPrimaryAlias
        
    if(typeof setPreference == 'function')
        EB.setPreference = setPreference
        
    if(typeof switchIdentityTo == 'function')
        EB.switchIdentityTo = function(username) {
            EB.runHandlers('beforeSwitchIdentity', username)
            var output = switchIdentityTo(username)
            EB.runHandlers('afterSwitchIdentity', username)
            return output
        }
        
    if(typeof removeIdentity == 'function')
        EB.removeIdentity = removeIdentity
        
    EB.getCurrentUsername = function() {
        // NOTE: we're using the output var to leak information out of useSecureInfo. be careful with this technique.
        var output
        EB.useSecureInfo(function(identities, username) { output = username })
        return output
    }
    
    EB.getCurrentCapa = function() {
        var output
        EB.useSecureInfo(function(identities, username) { output = ((identities[username]||{}).primary||{}).capa||0 })
        return output
    }
    
    EB.getCurrentVersionedUsername = function() {
        var username = EB.getCurrentUsername()
        if(!username)
            return EB.onError('No current user in wardrobe')
        
        return EB.Users.makeVersioned(username, EB.getCurrentCapa())
    }
    
    EB.getCurrentUserRecord = function() {
        var versionedUsername = EB.getCurrentVersionedUsername()
        if(!versionedUsername)
            return false
        
        // THINK: it's weird to hit the cache directly from here, but if we don't then we always get a promise,
        //        even if we hit the cache, and this should return a proper userRecord, not a promise, 
        //        since after all we have stored the userRecord in our wardrobe, haven't we?
    
        var userRecord = EB.Users.records[versionedUsername]
        if(!userRecord)
            return EB.onError('That user does not exist in our records')
    
        return userRecord
    }

    EB.getAllIdentityUsernames = function() {
        var output
        EB.useSecureInfo(function(identities, username) { output = Object.keys(identities) })
        return output
    }
    
}


//// INITIALIZATION

EB.init = function(options) {
    //// initializes all available modules and the platform subsystems.
    //// options is an object of configuration options that is passed to each module and subsystem.
    
    // BEGIN CONFIG AND OPTIONS //
    
    options = options || {}
    
    setDefault('zone', '')
    setDefault('puffApi', 'https://i.cx/api/puffs/api.php')
    setDefault('userApi', 'https://i.cx/api/users/api.php')
    setDefault('eventsApi', 'https://i.cx/api/puffs/api.php')
    setDefault('enableP2P', false)
    setDefault('pageBatchSize', 10)
    setDefault('initLoadGiveup', 200)
    setDefault('networkTimeout', 20000)         // twenty second timeout
    setDefault('noLocalStorage', false)
    setDefault('netblockSuffix', 'local')
    setDefault('cryptoworkerURL', '')           // point to cryptoworker.js to enable worker thread
    setDefault('ephemeralKeychain', false)      // prevents keychain from being saved to localStorage
    setDefault('initLoadBatchSize', 20)
    setDefault('inMemoryShellLimit', 10000)     // shells are removed to compensate
    setDefault('globalBigBatchLimit', 2000)     // maximum number of shells to receive at once // TODO: align with API
    setDefault('inMemoryMemoryLimit', 300E6)    // ~300MB
    setDefault('anonPrivateAdminKey', '5KdVjQwjhMchrZudFVfeRiiPMdrN6rc4CouNh7KPZmh8iHEiWMx') // for registering anon users
    setDefault('disableSendToServer', false)    // so you can work locally
    setDefault('disableReceivePublic', false)   // no public puffs except profiles
    setDefault('disableCloudIdentity', false)   // don't store encrypted identity in the cloud
    setDefault('supportedContentTypes', false)  // whitelist of context types; false loads all
    setDefault('shellContentThreshold', 1000)   // size of uncompacted content
    setDefault('localStorageShellLimit', 1000)  // maximum number of shells
    setDefault('localStorageMemoryLimit', 3E6)  // ~3MB
    
    function setDefault(key, val) {
        EB.CONFIG[key] = options[key] || EB.CONFIG[key] || val
    }
    
    // END CONFIG AND OPTIONS //
        
    EB.Users.init(options)                              // initialize the user record subsystem
    EB.Data.init(options)                               // initialize the data subsystem
    EB.Net.init(options)                                // initialize the network subsystem
    
    var moduleKeys = Object.keys(EB.M)
    moduleKeys.forEach(function(key) {                  // call all module initializers
        if(EB.M[key].init) 
            EB.M[key].init(options)
    })
    
    popMods()                                           // deflate any machine prefs
    function popMods() {                                // THINK: maybe move this to EB.Persist.init
        var mods = EB.Persist.get('CONFIG')
        if(!mods) return false
    
        EB.CONFIG.mods = mods
        Object.keys(EB.CONFIG.mods).forEach(function(key) { EB.CONFIG[key] = mods[key] })
    }
    
    EB.buildCryptoworker(options)
}


////////////// END STANDARD API //////////////////



////////////// HANDLER HANDLERS //////////////////

EB.handlers = {}

EB.addHandler = function(type, callback) {
  if(!EB.handlers[type]) EB.handlers[type] = []
  EB.handlers[type].push(callback)
}

EB.runHandlers = function(type) {
  var args = [].slice.call(arguments, 1)
  return (EB.handlers[type] || []).reduce(
      function(acc, callback) {
          return callback.apply(null, acc == null ? args : Array.isArray(acc) ? acc : [acc])}, args)
}

EB.makeHandlerHandler = function(type) {
    return function(callback) {return EB.addHandler(type, callback)}
}

// USEFUL HANDLERS:

EB.addErrorHandler           = EB.makeHandlerHandler('error')           // receives all error messages

EB.addNewPuffHandler         = EB.makeHandlerHandler('newPuffs')        // called when new puffs are available

EB.addDHTErrorHandler        = EB.makeHandlerHandler('DHTError')        // receives DHT error messages

EB.addRelationshipHandler    = EB.makeHandlerHandler('relationship')    // manage relationships between puffs

EB.addTimeoutErrorHandler    = EB.makeHandlerHandler('timeoutError')    // receives timeout error messages

EB.addNetworkErrorHandler    = EB.makeHandlerHandler('networkError')    // receives network error messages

EB.addNewPuffReportHandler   = EB.makeHandlerHandler('newPuffReport')   // handles reports on incoming puffs

EB.addIdentityUpdateHandler  = EB.makeHandlerHandler('identityUpdate')  // general GUI update trigger

EB.addNetworkResponseHandler = EB.makeHandlerHandler('networkresponse') // receives all network response

EB.addPayloadModifierHandler = EB.makeHandlerHandler('payloadModifier') // decorate puff payloads 

// EB.addClearPuffCacheHandler = EB.makeHandlerHandler('clearpuffcache')

// beforeSwitchIdentity is called prior to switchIdentity and removeIdentity, while the old identity is active
// afterSwitchIdentity  is called after switchIdentity, once the new identity is active
EB.addBeforeSwitchIdentityHandler = EB.makeHandlerHandler('beforeSwitchIdentity')
EB.addAfterSwitchIdentityHandler  = EB.makeHandlerHandler('afterSwitchIdentity')

////////////// END HANDLER HANDLERS //////////////




//// PUFF HELPERS ////

EB.decryptPuffForReals = function(envelope, yourPublicWif, myVersionedUsername, myPrivateWif) {
    //// interface with EB.Crypto for decrypting a message
    // TODO: this should be in EB.Data, but is in EB for cryptoworker's sake
    if(!envelope.keys) return false
    var keyForMe = envelope.keys[myVersionedUsername]
    var puffkey  = EB.Crypto.decryptPrivateMessage(keyForMe, yourPublicWif, myPrivateWif)
    var letterCipher = envelope.payload.content
    var letterString = EB.Crypto.decryptWithAES(letterCipher, puffkey)
    var betterString = EB.tryDecodeURIComponent(escape(letterString))   // try decoding
    return EB.parseJSON(betterString)                                   // try parsing
}

//// END PUFF HELPERS ////






//// BUILD CRYPTO WORKER ////

EB.buildCryptoworker = function(options) {
    var cryptoworkerURL = options.cryptoworkerURL || EB.CONFIG.cryptoworkerURL // || 'cryptoworker.js'
    
    if(!cryptoworkerURL) return false
    
    EB.cryptoworker = new Worker(cryptoworkerURL)
    EB.cryptoworker.addEventListener("message", EB.workerreceive)
}

EB.workerqueue = []
EB.workerautoid = 0

EB.workerreceive = function(msg) {
    var id = msg.data.id
    if(!id) return false // TODO: add onError here

    var fun = EB.workerqueue[id]
    if(!fun) return false // TODO: add onError here

    fun(msg.data.evaluated)

    delete EB.workerqueue[id] // THINK: this leaves a sparse array, but is probably faster than splicing
}

EB.workersend = function(funstr, args, resolve, reject) {
    EB.workerautoid += 1
    EB.workerqueue[EB.workerautoid] = resolve
    if(!Array.isArray(args))
        args = [args]
    EB.cryptoworker.postMessage({fun: funstr, args: args, id: EB.workerautoid})
}

//// END BUILD CRYPTO WORKER ////




//// ERROR HELPERS

// TODO: build a more general error handling system for GUI integration

EB.onError = function(msg, obj, trigger) {
    //// override this for custom error behavior
    
    var composite = {msg: msg, obj: obj}

    EB.runHandlers('error', composite)
    
    if(trigger)
        EB.runHandlers(trigger, composite)
        
    // for debugging help, run this in the console:
    // EB.addErrorHandler(function(composite) {console.log(composite)})

    return false
}

EB.catchError = function(msg) {
    //// ex: prom.catch( EB.catchError('invalid foo') ).then(function(foo) {...})
    return function(err) {
        EB.onError(msg, err)
        throw err
    }
}

EB.throwError = function(msg, errmsg) {
    //// ex: prom.then(function(foo) {if(!foo) EB.throwError('no foo'); ...})
    var err = errmsg ? Error(errmsg) : ''
    throw EB.makeError(msg, err)
}

EB.makeError = function(msg, err, trigger) {
    //// ex: new Promise(function(resolve, reject) { if(!foo) reject( EB.makeError('no foo') ) ... })
    EB.onError(msg, err, trigger)
    return Error(msg)
}

EB.emptyPromise = function(msg) {
    //// ex: function(foo) { if(!foo) return EB.emptyPromise('no foo'); return getFooPromise(foo) }
    if(msg) EB.onError(msg)
    return Promise.reject(msg)
}

EB.throwNetError = function(msg, errmsg) {
    //// like throw error but triggers the networkError handler
    var trigger = 'networkError'
    var err = errmsg ? Error(errmsg) : ''
    throw EB.makeError(msg, err, trigger)
}

EB.throwDHTError = function(msg, errmsg) {
    //// like throw error but triggers the DHTError handler
    var trigger = 'DHTError'
    var err = errmsg ? Error(errmsg) : ''
    throw EB.makeError(msg, err, trigger)
}


//// Exceptional API wrappers

EB.parseJSON = function(str) {
    //// JSON.parse throws, so we catch it. throw/catch borks the JS VM optimizer, so we box it.
    try {
        return JSON.parse(str)
    } catch(err) {
        return EB.onError('Invalid JSON string', err)
    }
}

EB.stringifyJSON = function(obj) {
    //// JSON.stringify throws on dumb DOM objects, so we catch it. throw/catch borks the JS VM optimizer, so we box it.
    try {
        return JSON.stringify(obj)
    } catch(err) {
        return EB.onError('Invalid object', err)
    }
}

EB.tryDecodeURIComponent = function(str) {
    //// decodeURIComponent throws, so we wrap it. try/catch kills the optimizer, so we isolate it.
    try {
        return decodeURIComponent(str)
    } catch(err) {
        return EB.onError('Invalid URI string', err)
    }
}


//// something different

EB.promisesPending = {}

// Major jujitsu here
EB.promiseMemoize = function(fun, ohboy) {
    if(!ohboy) ohboy = EB.removePromisePending
    
    return function() {
        var key = JSON.stringify([fun.toString(),arguments])
        
        if(EB.promisesPending[key])
            return EB.promisesPending[key]
        
        var prom = fun.apply(fun, arguments)
        prom = prom.then(function(value) {
            ohboy(key, value)
            return value                                        // deliver successes
        }, function(value) {
            ohboy(key, value)
            throw value                                         // propagate failures
        })
        
        EB.promisesPending[key] = prom
        return prom
    }
}

EB.removePromisePending = function(key) {
    delete EB.promisesPending[key]
}


////////////// A few small helpers for building functional pipelines ///////////////

EB.prop = function(p, obj) { // THINK: consider importing all of Rambda.js
    return arguments.length < 2 ? function (obj) { return obj[p]; } : obj[p]
}

EB.uniquify = function(list) {
    return list.filter(EB.unique)
}

EB.unique = function(item, index, array) {return array.indexOf(item) == index}

/*

    Cryptographic management for the EveryBit platform.

    Contains various functions that rely on bitcoin-lib.js for their cryptographic functionality,
    an ECDH implementation, a random number shim for older browsers, and random helper functions.

    Copyright 2014-2015 EveryBit. See README for license information.

*/

EB.Crypto = {};

/**
 * Generate private key
 * @return {string} 
 */
EB.Crypto.generatePrivateKey = function() {
    // OPT: remove this test once Bitcoin.ECKey no longer generates invalid keys (about 1 in 1,000 right now)
    var prikey = new Bitcoin.ECKey().toWif()
    if(EB.Crypto.wifToPriKey(prikey))
        return prikey
    else
        return EB.Crypto.generatePrivateKey()  // THINK: this could generate an eternal error explosion
}


/**
 * Convert public key from private key
 * @param  {string} privateKeyWIF
 * @return {string}
 */
EB.Crypto.privateToPublic = function(privateKeyWIF) {
    // TODO: This should return false if string is empty
    if(!privateKeyWIF)
        return EB.onError('That private key contained no data')
        
    try {
        return EB.Crypto.wifToPriKey(privateKeyWIF).getPub(true).toWif()
    } catch(err) {
        return EB.onError('Invalid private key: could not convert to public key', [privateKeyWIF, err])
    }
}


/**
 * Sign the hash of some data with a private key and return the sig in base 58
 * @param  {object} unsignedPuff
 * @param  {string} privateKeyWIF
 * @return {(boolean|error)}
 */
EB.Crypto.signPuff = function(unsignedPuff, privateKeyWIF) {
    //// sign the hash of some data with a private key and return the sig in base 58

    var prikey = EB.Crypto.wifToPriKey(privateKeyWIF)
    var message = EB.Crypto.puffToSiglessString(unsignedPuff)
    var messageHash = EB.Crypto.createMessageHash(message)
    
    try {
        return Bitcoin.base58.encode(prikey.sign(messageHash))
    } catch(err) {
        return EB.onError('Could not properly encode signature', [prikey, messageHash, err])
    }
}


/**
 * to verify puff sig
 * @param  {object} puff
 * @param  {string} defaultKey
 * @return {boolean}
 */
EB.Crypto.verifyPuffSig = function(puff, defaultKey) {
    var puffString = EB.Crypto.puffToSiglessString(puff);
    return EB.Crypto.verifyMessage(puffString, puff.sig, defaultKey);
}


/**
 * accept a base 58 sig, a message (must be a string) and a base 58 public key. returns true if they match, false otherwise
 * @param  {string} message
 * @param  {string} sig
 * @param  {string} publicKeyWIF
 * @return {boolean}
 */
EB.Crypto.verifyMessage = function(message, sig, publicKeyWIF) {
    //// accept a base 58 sig, a message (must be a string) and a base 58 public key. returns true if they match, false otherwise
  
    try {
        var pubkey = EB.Crypto.wifToPubKey(publicKeyWIF)
        
        var sigBytes = Bitcoin.base58.decode(sig).toJSON()
        sigBytes = sigBytes.data || sigBytes
        
        var messageHash = EB.Crypto.createMessageHash(message)
        
        return pubkey.verify(messageHash, sigBytes)
    } catch(err) {
        return EB.onError('Invalid key or sig: could not verify message', [messageHash, sig, publicKeyWIF, err])
    }
}


/**
 * to create message hash
 * @param  {string} message
 * @return {string}
 */
EB.Crypto.createMessageHash = function(message) {
    return Bitcoin.Crypto.SHA256(message).toString()
}


/**
 * crypt wif to private key
 * @param  {string} privateKeyWIF
 * @return {boolean}
 */
EB.Crypto.wifToPriKey = function(privateKeyWIF) {
    if(!privateKeyWIF)
        return EB.onError('That private key wif contains no data')

    try {
        return new Bitcoin.ECKey(privateKeyWIF, true)
    } catch(err) {
        return EB.onError('Invalid private key: are you sure it is properly WIFfed?', [privateKeyWIF, err])
    }
}

/**
 * crypt wif to public try
 * @param  {string} publicKeyWIF
 * @return {boolean}
 */
EB.Crypto.wifToPubKey = function(publicKeyWIF) {
    if(!publicKeyWIF)
        return EB.onError('That public key wif contains no data')

    try {
        var pubkeyBytes = Bitcoin.base58check.decode(publicKeyWIF).payload.toJSON()
        pubkeyBytes = pubkeyBytes.data || pubkeyBytes
        return new Bitcoin.ECPubKey(pubkeyBytes, true)
    } catch(err) {
        return EB.onError('Invalid public key: are you sure it is properly WIFfed?', [publicKeyWIF, err])
    }
}


/**
 * crypt puff to string without sig
 * @param  {object} puff
 * @return {string}
 */
EB.Crypto.puffToSiglessString = function(puff) {
    return JSON.stringify(puff, function(key, value) {if(key == 'sig') return undefined; return value})
}


/**
 * Convert a passphrase to a private key
 * @param  {string} passphrase
 * @return {string} private key WIF
 */
EB.Crypto.passphraseToPrivateKeyWif = function(passphrase) {
    var hashStr = Bitcoin.Crypto.SHA256(passphrase).toString()
    var hash = Bitcoin.convert.hexToBytes(hashStr)
    return Bitcoin.ECKey(hash).toWif()
}


/**
 * Encrypt a string with AES
 * @param  {string} message
 * @param  {string} key
 * @return {string}
 */
EB.Crypto.encryptWithAES = function(message, key) {
    if(typeof message != 'string')
        return EB.onError('The message to encryptWithAES must be a string')
    if(typeof key != 'string')
        return EB.onError('The key to encryptWithAES must be a string')
        
    var enc = Bitcoin.Crypto.AES.encrypt(message, key)
    return Bitcoin.Crypto.format.OpenSSL.stringify(enc)
}


/**
 * Decrypt a string with AES
 * @param  {string} ciphertext
 * @param  {string} key
 * @return {string}
 */
EB.Crypto.decryptWithAES = function(ciphertext, key) {
    if(!key || !ciphertext) return false

    if(typeof ciphertext != 'string')
        return EB.onError('The ciphertext to decryptWithAES must be a string')
    if(typeof key != 'string')
        return EB.onError('The key to decryptWithAES must be a string')

    var message = Bitcoin.Crypto.format.OpenSSL.parse(ciphertext)
    var words = Bitcoin.Crypto.AES.decrypt(message, key)
    var bytes = Bitcoin.convert.wordsToBytes(words.words) 
    // var uglyRegex = /[\u0002\u0004\u0007\u000e]+$/g
    var uglyRegex = /[\u0000-\u0010]+$/g // TODO: contain AES padding
    return bytes.map(function(x) {return String.fromCharCode(x)}).join('').replace(uglyRegex, '')
}


/**
 * Get the shared secret of two users
 * @param  {string} yourPublicWif
 * @param  {string} myPrivateWif
 * @return {string}
 */
EB.Crypto.getOurSharedSecret = function(yourPublicWif, myPrivateWif) {
    // TODO: unit testing for ECDH maths
    var pubkey = EB.Crypto.wifToPubKey(yourPublicWif)
    var prikey = EB.Crypto.wifToPriKey(myPrivateWif)
    if(!pubkey || !prikey) return false  
    var secret = pubkey.multiply(prikey).toWif()
    var key = Bitcoin.Crypto.SHA256(secret).toString()
    
    return key
}


/**
 * Encrypt a private message
 * @param  {string} plaintext
 * @param  {string} yourPublicWif
 * @param  {string} myPrivateWif
 * @return {string}
 */
EB.Crypto.encryptPrivateMessage = function(plaintext, yourPublicWif, myPrivateWif) {
    var key = EB.Crypto.getOurSharedSecret(yourPublicWif, myPrivateWif)
    if(!key) return false
    var ciphertext = EB.Crypto.encryptWithAES(plaintext, key)
    return ciphertext
}


/**
 * Decrypt a private message
 * @param  {string} plaintext
 * @param  {string} yourPublicWif
 * @param  {string} myPrivateWif
 * @return {string}
 */
EB.Crypto.decryptPrivateMessage = function(ciphertext, yourPublicWif, myPrivateWif) {
    var key = EB.Crypto.getOurSharedSecret(yourPublicWif, myPrivateWif)
    if(!key || !ciphertext) return false
    var plaintext = EB.Crypto.decryptWithAES(ciphertext, key)
    return plaintext // .replace(/\n+$/g, '')
}


/**
 * Get the 'keys' object for a private puff
 * @param  {string} puffkey
 * @param  {string} myPrivateWif
 * @param  {object} userRecords
 * @return {object}
 */
EB.Crypto.createKeyPairs = function(puffkey, myPrivateWif, userRecords) {
    if(!Array.isArray(userRecords))
        return EB.throwError('Invalid userRecords')
    
    return userRecords.reduce(function(acc, userRecord) {
        var versionedUsername = EB.Users.userRecordToVersionedUsername(userRecord)
        acc[versionedUsername] = EB.Crypto.encryptPrivateMessage(puffkey, userRecord.defaultKey, myPrivateWif)
        return acc
    }, {})
}


// EB.Crypto.verifyBlock = function(block, publicKeyBase58) {
//     return EB.Crypto.verifyMessage(block.blockPayload, block.blockSig.replace(/\*/g, ""), publicKeyBase58);
// }

// EB.Crypto.signBlock = function(blockPayload, privateKeyWIF) {
//     return EB.Crypto.signPayload(blockPayload, privateKeyWIF);
// }



//// Randomness enhancements



/**
 * Get a random number between 0 and 1
 * @return {number}
 */
EB.Crypto.random = function() { 
    // just like Math.random, but better
    // via http://stackoverflow.com/questions/13694626/generating-random-numbers-0-to-1-with-crypto-generatevalues

    var list = EB.Crypto.getRandomValues(2, 32)

    // keep all 32 bits of the the first, top 20 of the second for 52 random bits
    var mantissa = (list[0] * Math.pow(2,20)) + (list[1] >> 12)

    // shift all 52 bits to the right of the decimal point
    var result = mantissa * Math.pow(2,-52)
    
    return result
    
    // var log2 = Math.log(max) / Math.LN2
    // var size = Math.ceil(log2) + 1 // NOTE: this is about 8 times higher than necessary
}


/**
 * Get a random integer
 * @param  {number} Maximum integer. Defaults to 2^31 - 1, the largest bitop safe integer.
 * @param  {number} Minimum integer. Defaults to 0.
 * @return {number}
 */
EB.Crypto.getRandomInteger = function(max, min) { 
    // NOTE: min is inclusive, max is exclusive
    // TODO: error if max and min are not proper (non-NaN) numbers
    min = Math.floor(min || 0)
    max = Math.floor(max || 0x7fffffff) // 0x7fffffff == Math.pow(2, 31) - 1, the largest bitop safe int
    var range = max - min
    var randFloat = EB.Crypto.random()
    return Math.floor(randFloat*range + min)
}


/**
 * Get a random item from a list
 * @param  {(array|string)} An array or string from which to choose an element
 * @return {any} 
 */
EB.Crypto.getRandomItem = function(list) {
    // TODO: error if list is not an array or string
    var index = EB.Crypto.getRandomInteger(list.length)
    return list[index]
}


/**
 * Get a new AES key
 * @param  {number} len Length in bytes (defaults to 256 bits)
 * @return {string} AES key
 */
EB.Crypto.getRandomKey = function(len) {
    len = len || 256/8                                      // AES key size is 256 bits
    var bytes = EB.Crypto.getRandomValues(len, 8)
    // var bytes = new Uint8Array(size)
    // crypto.getRandomValues(bytes)
    return Bitcoin.convert.bytesToBase64(bytes)
}


/**
 * A wrapper for crypto.getRandomValues
 * @param  {number} Number of samples 
 * @param  {number} Size of samples in bits (32 or 8, defaults to 8)
 * @return {array}
 */
EB.Crypto.getRandomValues = function(number, size) {
    if(window.crypto && window.crypto.getRandomValues) {
        var bytes
        if(size == 32)
            bytes = new Uint32Array(number)
        else
            bytes = new Uint8Array(number)
    
        return window.crypto.getRandomValues(bytes)
    }

    return EB.Crypto.getRandomValuesShim(number, size)
}


/**
 * A shim for crypto.getRandomValues
 * @param  {number} Number of samples 
 * @param  {number} Size of samples in bits (32 or 8, defaults to 8)
 * @return {array}
 */
EB.Crypto.getRandomValuesShim = function(number, size) {
    // via https://github.com/evanvosberg/crypto-js/issues/7
    // fallback for old browsers that don't support crypto.getRandomValues
    // better than plain Math.random(), worse than crypto.getRandomValues()
    var words = [];

    var r = (function (m_w) {
        var m_w = m_w;
        var m_z = 0x3ade68b1;
        var mask = 0xffffffff;

        return function () {
            m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
            m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
            var result = ((m_z << 0x10) + m_w) & mask;
            result /= 0x100000000;
            result += 0.5;
            return result * (Math.random() > .5 ? 1 : -1);
        }
    });

    for (var i = 0, rcache; i < number; i += 4) {
        var _r = r((rcache || Math.random()) * 0x100000000);

        rcache = _r() * 0x3ade67b7;

        if(size == 32) {
            words.push(Math.abs( (_r() * 0x100000000) | 0 ));
        } else {
            // in case we want bytes instead of 32-bit chunks
            var int32 = (_r() * 0x100000000) | 0;
            words.push(Math.abs(int32 & 0xFF000000) >> 24);
            words.push(Math.abs(int32 & 0x00FF0000) >> 16);
            words.push(Math.abs(int32 & 0x0000FF00) >> 8);
            words.push(Math.abs(int32 & 0x000000FF));
        }
    }

    return words;
}
/*

    Data management for the EveryBit platform.
    
    All puff-related data flows through here:
    caching, persistence, optimizations and network access are managed through this module.

    Copyright 2014-2015 EveryBit. See README for license information.

 */

EB.Data = {}
EB.Data.bonii = {}
EB.Data.shells = []
EB.Data.shellSort = {}
EB.Data.pendingPuffPromises = {}

EB.Data.profiles = {}

EB.Data.init = function(options) {
    // THINK: disabling preloading may affect older EB example code
    // if(!options.disablePublicPuffs)
    //     EB.Data.importShells()                                       // preload relevant shells
    EB.addBeforeSwitchIdentityHandler(EB.Data.removeAllPrivateShells)   // clear private caches on id change
}


///////////////// new graph stuff ////////////////////

EB.Data.addSigAsVertex = function(sig) {
    var matches = EB.Data.graph.v(sig).run()
    
    if(matches.length) return false         // returns false if nothing happens
    
    return EB.Data.graph.addVertex({_id: sig, name: sig, type: 'shell'}) || true
}

EB.Data.addShellAsVertex = function(shell) {
    var matches = EB.Data.graph.v(shell.sig).run()
    
    if(!matches.length)
        return EB.Data.graph.addVertex({ _id: shell.sig, name: shell.sig, shell: shell, type: 'shell' }) || true
    
    var vertex = matches[0]
    if(vertex.shell) return false           // NOTE: returns false if it does nothing
    
    return vertex.shell = shell             // NOTE: mutation & pointer setting
}

EB.Data.addShellUsernameAsVertex = function(shell) {
    //// add shell.username to graph and connect them up
    
    var username = shell.username
    var matches = EB.Data.graph.v(username).run()
    var vertex = matches[0]
    
    if(!vertex)                             // THINK: make usernames unique like USERNAME::<username> or something
        vertex = EB.Data.graph.addVertex({ _id: username, name: username, type: 'username' })
    else
        if(EB.Data.graph.v(shell.sig).out('author').property('name').run()[0] == username)
            return false
        
    // TODO: add easy filtering by vertex type for both 'v' and also outV etc
    EB.Data.graph.addEdge({ _out: shell.sig, _in: shell.username, _label: 'author'})
}

EB.Data.graph = Dagoba.graph()

EB.Data.addToGraph = function(shells) {
    shells.forEach(EB.Data.addShellAsVertex)
    shells.forEach(EB.Data.addShellUsernameAsVertex)
    EB.runHandlers('relationship', shells)
}

// TODO: alias children() as .in('parent') and parents() as .out('parent') and use those instead (halves # of edges)

///////////////// end new graph stuff ////////////////////


//// CONTENT TYPES ////

EB.Data.contentTypes = {}

// TODO: this might get big, need some GC here
EB.Data.puffContentStash = {}

EB.Data.clearPuffContentStash = function() {
    EB.Data.puffContentStash = {}
}


/**
 * to process the content
 * @param  {string} type
 * @param  {string} content
 * @param  {puff} puff
 * @return {string}
 */
EB.Data.processContent = function(type, content, puff) {
    var typeObj = EB.Data.contentTypes[type]
    
    if(!typeObj)
        typeObj = EB.Data.contentTypes['text']

    return typeObj.toHtml(content, puff)
}


/**
 * Get the content of a puff
 * @param  {puff} puff
 * @return {string}
 */
EB.Data.getProcessedPuffContent = function(puff) {
    // THINK: we've already ensured these are proper puffs, so we don't have to check for payload... right?
    if(EB.Data.puffContentStash[puff.sig])
        return EB.Data.puffContentStash[puff.sig]
    
    var content = EB.Data.processContent(puff.payload.type, puff.payload.content, puff)
    EB.Data.puffContentStash[puff.sig] = content
    
    return content
}

/**
 * Add support for types of content to the system
 * @param {string} name
 * @param {string} type
 */
EB.Data.addContentType = function(name, type) {
    // THINK: move this down into EB?
    
    if(!name) 
        return EB.onError('Invalid content type name')
    if(EB.CONFIG.supportedContentTypes && EB.CONFIG.supportedContentTypes.indexOf(name) == -1)
        return EB.onError('Unsupported content type: ' + name)
    if(!type.toHtml) 
        return EB.onError('Invalid content type: object is missing toHtml method', name)
    
    EB.Data.contentTypes[name] = type
}

//// END CONTENT TYPES ////




EB.Data.getAllMyShells = function() {
    var publicShells = EB.Data.getPublicShells()
    var privateShells = EB.Data.getCurrentDecryptedLetters()
    return publicShells.concat(privateShells)
}


/**
 * get all currently known shells
 * @return {Shell[]}
 */
EB.Data.getShells = function() {
    //// Get all currently known shells
    // NOTE: always use this accessor instead of referencing EB.Data.shells directly, as what this function does will change.
    return EB.Data.shells
}

/**
 * get all public shells
 * @returns {Shell[]}
 */
EB.Data.getPublicShells = function() {
    //// Get all public shells
    var shells = EB.Data.getShells()
    return shells.filter(function(shell) {return !shell.keys})
}

/**
 * Get cached shells by sig
 * @param {string} sig
 * @returns {shell[]}
 */
EB.Data.getCachedShellBySig = function(sig) {
    return EB.Data.shellSort[sig]
    // return EB.Data.getShells().filter(function(shell) { return sig === shell.sig })[0]
}

/**
 * adds bonus
 * @param {object} puff
 * @param {string} key
 * @param {string} value
 */
EB.Data.addBonus = function(puff, key, value) {
    //// this simulates a WeakMap
    // THINK: we'll need to provide some GC here
    var id = puff.sig
    
    if(!EB.Data.bonii[id])
        EB.Data.bonii[id] = {}
    
    EB.Data.bonii[id][key] = value
}

/**
 * gets bonus
 * @param puff
 * @param key
 * @returns {object}
 */
EB.Data.getBonus = function(puff, key) {
    //// pull from our FauxWeakMap
    var id = puff.sig
    var puffBonii = EB.Data.bonii[id]
    return puffBonii && puffBonii[key]
}








EB.Data.addStar = function(sig, username, starsig) {
    // TODO: consider moving this to a module
    
    var fauxshell = {sig: sig} // THINK: can we formalize this?
    var starStats = EB.Data.getBonus(fauxshell, 'starStats') || {score: 0, from: {}}
    
    starStats.from[username] = starsig                                  // admittedly strange, but helpful when unstarring
    starStats.score = EB.Data.scoreStars(Object.keys(starStats.from))  // OPT: O(n^2) in stars-per-puff
    
    EB.Data.addBonus(fauxshell, 'starStats', starStats)
}

EB.Data.removeStar = function(sig, username) {
    // TODO: consider moving this to a module
    
    var fauxshell = {sig: sig} // THINK: ye gads is this ugly
    var starStats = EB.Data.getBonus(fauxshell, 'starStats') || {score: 0, from: {}}
    
    delete starStats.from[username]
    
    starStats.score = EB.Data.scoreStars(Object.keys(starStats.from))  // OPT: O(n^2) in stars-per-puff
    
    EB.Data.addBonus(fauxshell, 'starStats', starStats)
}

EB.Data.scoreStars = function(usernames) {
    
    return 0
    
    // TODO: move this into a module
    /*
    var tluScore = 0;
    var suScore = 0;
    var scorePref = Boron.shallow_copy(puffworldprops.view.score);
    for (var k in scorePref) {
        if (scorePref[k]) {
            var s = parseFloat(scorePref[k]);
            if (isNaN(s))
                s = parseFloat(puffworlddefaults.view.score[k]);
            scorePref[k] = s;
        }
    }
    
    usernames.forEach(function(username) {
        if (username.indexOf('.') == -1) {
            tluScore += scorePref.tluValue;
        } else {
            suScore += scorePref.suValue;
        }
    })
    
    var score = tluScore + Math.min(scorePref.maxSuValue, suScore);
    score = score.toFixed(1);
    if (score == parseInt(score)) score = parseInt(score);
    return score
    */
}


/**
 * handle a newly created puff: add to our local cache and fire new content callbacks
 * @param {object} puff
 */
EB.Data.addPuffToSystem = function(puff) {
    if(EB.Data.getCachedShellBySig(puff.sig)) return false
    
    EB.Data.addShellsThenMakeAvailable(puff)

    EB.Net.distributePuff(puff)
    
    return puff
}








/*
    Some new shell handling equipment. Need to integrate this more deeply and clean and test.
*/

EB.Data.addShellsThenMakeAvailable = function(shells) {
    //// adds shells to the system, then returns a report on its progress
    
    // report.delivered: 10
    // report.valid: 8
    // report.new_shells: 7
    // report.new_puffs: 5
    // report.GC: 0
    
    // report.public: 2
    // report.stars: 0
    
    // report.private_promise: {sigs:[], failed: }
    
    // report.public_puff_sigs: []
    
    function not(fun) {return function(x) {return !fun(x)}}
    
    var report = {counts: {}}
    
    shells = Array.isArray(shells) ? shells : [shells]
    report.counts.delivered = shells.length
    
    shells = shells.filter(EB.Spec.isValidShell)
    report.counts.valid = shells.length
    
    report.meta = EB.Data.handleMetaPuffs(shells)
    
    shells = shells.filter(not(EB.Data.isMetaPuff))
    report.counts.nonmeta = shells.length
    
    report.private_promise = EB.Data.handlePrivatePuffs(shells)
    
    shells = shells.filter(not(EB.Puff.isPrivate))
    report.counts.public = shells.length
    
    shells = EB.Data.handleAndFilterExistingShells(shells)
    report.counts.new_public = report.counts.public - shells.length
    
    EB.Data.handleNewPublicShells(shells)
    
    shells = EB.Data.handleAndFilterByGC(shells)
    report.counts.gc = report.counts.new_public - shells.length

    report.public_puff_sigs = shells.map(EB.prop('sig'))
    
    EB.runHandlers('newPuffs', shells)
    EB.runHandlers('newPuffReport', report)
    
    return report
}


EB.Data.handleMetaPuffs = function(shells) {
    // TODO: move this to a module
    var metapuffs = shells.filter(EB.Data.isMetaPuff)
    
    metapuffs.forEach(function(shell) {
        var sig = shell.payload.content
        EB.Data.addStar(sig, shell.username, shell.sig)
    })
    
    return {stars: metapuffs.length}
}

EB.Data.isMetaPuff = function(shell) {
    // TODO: move this to a module
    return shell.payload.type == 'star'    
}


EB.Data.handlePrivatePuffs = function(shells) {
    var privatepuffs = shells.filter(EB.Puff.isPrivate)    
    return EB.Data.ingestEncryptedShells(privatepuffs)          // TODO: this returns our promise report
}


EB.Data.handleAndFilterExistingShells = function(shells) {
    // THINK: this can't answer the question of "did we updated an existing shell with content"?
    return shells.filter(function(shell) {                      // returns all new (and newly full) puffs
        var existing = EB.Data.getCachedShellBySig(shell.sig)

        if(!existing) return true                               // it's new
        if(EB.Puff.isFull(existing)) return false               // it's known
        if(EB.Puff.isEmpty(shell)) return false                 // it's an empty shell

        existing.payload.content = shell.payload.content        // add the missing content
        return true                                             // true because we changed it
    })
}


EB.Data.handleNewPublicShells = function(shells) {
    shells.forEach(function(shell) {
        EB.Data.shells.push(shell)
        EB.Data.shellSort[shell.sig] = shell
    })

    EB.Data.addToGraph(shells)
    EB.Data.rateSomePuffs(shells)
    EB.Data.persistShells()                                     // drop new stuff into localStorage
}


EB.Data.handleAndFilterByGC = function(shells) {
    var compacted = EB.Data.garbageCompactor()                  // OPT: call this earlier
    if(!compacted) return shells
    
    return shells.map(EB.prop('sig'))                            // if GC eats puffs this spits them out
                 .map(EB.Data.getCachedShellBySig)
                 .filter(Boolean)
}


/**
 * to persist shells
 * @param {Shell[]}
 * @returns {(boolean|*)}
 */
EB.Data.persistShells = function(shells) {
    if(EB.CONFIG.noLocalStorage) return false                      // THINK: this is only for debugging and development
    
    // THINK: when we receive shells directly we should compact them too
    if(!shells) 
        shells = function() {return EB.Data.getShellsForLocalStorage()} // thunked for perf
    
    // when you save shells, GC older "uninteresting" shells and just save the latest ones
    // THINK: is this my puff? then save it. otherwise, if the content is >1k strip it down.
    // THINK: we need knowledge of our user records here... how do we get that? 
    // EB.Data.interesting_usernames?
    
    // shells = shells.filter(function(shell) { return !shell.payload.content || (shell.payload.content.length < 1000) })
    
    EB.Persist.save('shells', shells)
}



EB.Data.getConversationPuffs = function(convoId, offset, batchsize) {
    offset = offset || 0
    batchsize = batchsize || EB.CONFIG.pageBatchSize || 10
    
    var prom
    prom = EB.Net.getConversationPuffs(convoId, batchsize, offset)
    prom = prom.then(EB.Data.addShellsThenMakeAvailable)
    return prom
}

EB.Data.getConversationPuffs = EB.promiseMemoize(EB.Data.getConversationPuffs, function(key, report) {
    report.private_promise.then(function() {
        EB.removePromisePending(key)
    })
})


/**
 * to import shells from local and remote sources
 */
EB.Data.importShells = function() {
    //// fetch shells from local and remote sources
    
    // THINK: this should take a set of routes so we can pass them to importRemoteShells
    
    // grab the local shells and add them to the system
    // then grab some remote shells (latest 100) and compare them
    // go back until we fill in the gaps, or hit the threshold (500?)
    
    // when you want to look at shells that don't exist, like when scrolling, grab them as a batch
    
    EB.Data.importLocalShells()
    // EB.Data.getMoreShells()
    EB.Data.importRemoteShells()
    // EB.Data.importAllStars()
}

/**
 * to import local shells
 */
EB.Data.importLocalShells = function() {   // callback) {
    // EB.Data.shells = EB.Persist.get('shells') || []
    var localShells = EB.Persist.get('shells') || []
    
    EB.Data.addShellsThenMakeAvailable(localShells)
}


EB.Data.importAllStars = function() {
    // TODO: consider moving this to a module
    var prom = EB.Net.getStarShells()
    prom.then(EB.Data.addShellsThenMakeAvailable)
}


EB.Data.horridStash = {}

EB.Data.isBadEnvelope = function(sig) {
    return EB.Data.horridStash[sig]
}

EB.Data.addBadEnvelope = function(sig) {
    EB.Data.horridStash[sig] = true
}


EB.Data.currentDecryptedLetters = []
EB.Data.currentDecryptedLetterMap = {}

EB.Data.getCurrentDecryptedLetters = function() {
    //// NOTE: always use this instead of hitting currentDecryptedLetters directly, as this function may change
    return EB.Data.currentDecryptedLetters
}

EB.Data.getDecryptedLetterBySig = function(sig) {
    if(EB.Data.currentDecryptedLetterMap[sig])
        return EB.Data.currentDecryptedLetterMap[sig]
}


EB.Data.addDecryptedLetter = function(letter, envelope) {
    // THINK: how can we avoid doing this 'existing letter' check twice?
    var maybeLetter = EB.Data.getDecryptedLetterBySig(envelope.sig)
    if(maybeLetter) return false
    
    if(letter.payload.type == 'identity') return false             // THINK: where should this live?
    
    EB.Data.currentDecryptedLetters.push(letter)
    
    EB.Data.currentDecryptedLetterMap[envelope.sig] = letter       // letter is a puff too
    EB.Data.currentDecryptedLetterMap[letter.sig] = letter         // stash it both ways
    EB.Data.addBonus(letter, 'envelope', envelope)                 // mark it for later
    
    EB.Data.addToGraph([letter])

    return true
}

EB.Data.removeAllPrivateShells = function() {
    EB.Data.currentDecryptedLetters.forEach(function(shell) {
        EB.Data.removeShellFromCache(shell.sig)
    })
    
    EB.Data.currentDecryptedLetterMap = {}
    EB.Data.currentDecryptedLetters = [] 
    EB.Data.clearPuffContentStash()
}






EB.Data.getMorePrivatePuffs = function(username, offset, batchsize) {
    // THINK: race condition while toggling identities? username isn't used below.
    if(!username) username = EB.getCurrentUsername()
    
    offset = offset || 0
    // offset = offset || EB.CONFIG.initLoadBatchSize || 20
    batchsize = batchsize || EB.CONFIG.pageBatchSize || 10
    
    var prom
    prom = EB.Net.getMyPrivatePuffs(EB.getCurrentUsername(), batchsize, offset) // THINK: why switched param order?
    prom = prom.then(EB.Data.addShellsThenMakeAvailable)
    return prom
}


EB.Data.updatePrivateShells = function(offset) {
    var username = EB.getCurrentUsername()
    var batchsize = 1
    var fullOrShell = 'full' // OPT: just gather the shell (or sig) here when checking latest
    offset = offset || 0     //      actually... we need a list of all sigs we've encountered (not just good ones)
                             //      otherwise bad envelopes (etc) could block prior good content.

    EB.Net.getMyPrivatePuffs(username, batchsize, offset, fullOrShell)
          .then(function(shells) {
              var shell = shells[0]
              if(!shell) return false
              
              var prom = EB.Data.ingestAnEncryptedShell(shell) // manual because we need the decryption promise
              
              prom.then(function(fresh) {
                  if(fresh)
                      EB.Data.updatePrivateShells(1+offset)
              })
          })
}


EB.Data.ingestEncryptedShells = function(shells) {
    var proms = shells.map(EB.Data.ingestAnEncryptedShell)
    
    // NOTE: Promise.all rejects immediately upon any rejection, so we have to do this manually
    
    return new Promise(function(resolve, reject) {
        var remaining = proms.length
        var report = {good: 0, bad: 0, goodsigs: []}
        
        // TODO: add more information about what went wrong to the report
        
        function unhappy_path() {
            report.bad++
            if(!--remaining) resolve(report)
        }
        
        proms.forEach(function(prom) {
            prom.then(function(letter) {
                if(!letter) return unhappy_path()                       // catches old or weird puffs 
                report.good++                                           // TODO: differentiate above cases
                report.goodsigs.push(letter.sig)
                if(!--remaining) resolve(report)
            }, unhappy_path )                                           // catches decryption errors
        })
    })
}


EB.Data.ingestAnEncryptedShell = function(envelope) {
    var prom = EB.Puff.promiseLetter(envelope)

    prom = prom.then(function(letter) {
        if(!letter) return false
        
        var fresh = EB.Data.addDecryptedLetter(letter, envelope)        // add the letter to our system
        if(!fresh) return false
        
        EB.runHandlers('newPuffs', [letter])                            // always receives an array of puffs
        return letter
    })
    
    return prom
    
    // NOTE: this doesn't appear to do much, mostly because extractLetterFromEnvelope is quite effectful.
    //       it calls EB.Data.addDecryptedLetter as part of its processing, which does all the real work.
    
    // THINK: consider adding this back in, though remember that each decryption pushes its own errors...
    // if (letters.length != privateShells.length) {
    //     Events.pub('track/decrypt/some-decrypt-fails',
    //                 {letters: letters.map(function(p){return p.sig}),
    //                  privateShells: privateShells.map(function(p){return p.sig})})
    // }
}




// the slot locker contains information on queries made to fill slots. 
// in particular it holds the offset, which will be -1 when [] is returned.
// it keeps queries from re-requesting the same shells over and over, 
// and provides some concurrency / flow control by allowing a query
// to set it to -1 when it is running and then replace it when done.
EB.Data.slotLocker = {}

// THINK: we're calling this from the 'refresh' button now...


EB.Data.importRemoteShells = function() {
    //// only called during initial application bootup. handles both cold loads and hot loads.
    
    var offset = 0
    var giveup = EB.CONFIG.initLoadGiveup
    var limit  = EB.CONFIG.initLoadBatchSize
    var new_shells = []
    var keep_going = true
    
    var key = '[{"sort":"DESC"},{"tags":[],"types":[],"users":[],"routes":[]}]' // TODO: upgrade this default query
    EB.Data.slotLocker[key] = -1
    
    // TODO: index by username
    // TODO: if duplicate check update times for latest
    // TODO: persist to LS (maybe only sometimes? onunload? probabilistic?)
         
    function getMeSomeShells(puffs) {
        if(puffs) {
            var delta = EB.Data.addShellsThenMakeAvailable(puffs)
            // new_shells = new_shells.concat(my_new_shells)
            // var delta = my_new_shells.length
            
            if(delta != limit)                                          // some shells were already in our cache
                keep_going = false
        }
        
        if(offset > giveup)
            keep_going = false

        if(!keep_going) {
            EB.Data.slotLocker[key] = 1
            // EB.Data.stupidHorribleGlobalThing = true
            // EB.Data.makeShellsAvailable(new_shells)
            return false
        }
        
        var prom = EB.Net.getSomeShells({}, {}, limit, offset)
        prom.then(getMeSomeShells)

        offset += limit
    }
    
    getMeSomeShells()
}



/*
    End shell collection intake equipment
*/


/**
 * Send a private puff using a new anonymous user as the sender and possibly another as reply-to
 * @param {string} Either 'anon' or 'doublyanon'
 * @returns {promise}
 */
EB.Data.sendAnonModePuff = function(content, usernames, type, mode, payload, routes) {
    if(!EB.getCurrentUsername())
        return EB.emptyPromise('You must have a current identity to send messages')
        
    payload = payload || {}
    if(!Array.isArray(usernames))
        usernames = usernames ? [usernames] : []
    
    var privateEnvelopeAlias                                            // escapes the private keys of new anon user
    var prom = Promise.resolve()                                        // a promise we use to string everything along 

    prom = prom.then(function() {                                       // we'd like to be anonymous, so make a new user
        return EB.Users.addAnonymousUser().then(function(userRecord) {
            EB.useSecureInfo(function(identities, currentUsername) {
                var identity = identities[currentUsername]
                var aliases = identity.aliases
                privateEnvelopeAlias = aliases[aliases.length-1]        // our new anon aliases should be the last one
                usernames.push(userRecord.username)                     // add new anon username to the list of recipients
            })
        })
    })

    if(mode == 'doublyanon') {                                          // are we doubly anonymous? make another new user
        prom = prom.then(function() {
            return EB.Users.addAnonymousUser().then(function(userRecord) {
                payload.replyTo = userRecord.username
            })
        })
    }

    prom = prom.then(function() {                                       // once the users are made, send off the puff
        var userprom = EB.Users.usernamesToUserRecordsPromise(usernames)
        
        return userprom.then(function(userRecords) {        
            var puff = EB.Puff.simpleBuild(type, content, payload, routes, userRecords, privateEnvelopeAlias)
            return EB.Data.addPuffToSystem(puff)
        })
    }).catch(function(err) {
        EB.catchError(err)
    })
    
    return prom
}


/**
 * get a puff by its sig
 * @param {string} sig
 * @returns {promise}
 */
EB.Data.getPuffBySig = function(sig) {
    var shell = EB.Data.getCachedShellBySig(sig)                    // check in public cache
    
    if(!shell)
        shell = EB.Data.getDecryptedLetterBySig(sig)                // check in private cache
    
    if(EB.Puff.isFull(shell))
        return Promise.resolve(shell)                               // it has content
    
    if(EB.Data.pendingPuffPromises[sig])                            // establish a foothold
        return EB.Data.pendingPuffPromises[sig]
    
    return EB.Data.getPuffBySigFromElsewhere(sig)                   // gather a promise
}

EB.Data.getPuffOrNot = function(sig) {
    // Supports the fire-and-forget style -- see note in EB.js
   
    var shell = EB.Data.getCachedShellBySig(sig)                    // check in public cache
    
    if(!shell)
        shell = EB.Data.getDecryptedLetterBySig(sig)                // check in private cache

    if(EB.Puff.isFull(shell))
        return shell                                                // it has content
        
    EB.Data.getPuffBySigFromElsewhere(sig)                          // get the puff from the network
        
    return false                                                    // but return false for easy filtering
}


/**
 * get a puff by its sig from elsewhere
 * @param {string} sig
 * @returns {promise}
 */
EB.Data.getPuffBySigFromElsewhere = function(sig) {
    EB.Data.pendingPuffPromises[sig] = EB.Net.getPuffBySig(sig)
    var output = EB.Data.pendingPuffPromises[sig].then(badShellClearCache)

    output.then(EB.Data.addShellsThenMakeAvailable)
          .then(function() {                                        // delay GC to stop runaway network requests
                    setTimeout(function() { delete EB.Data.pendingPuffPromises[sig] }, 10000) })
    
    return output
        
    // locally cached shells that are missing content on the network prevent slotfills from resolving,
    // so we clear it from our cache if we can't find it.
    function badShellClearCache(shells) {
        if(!shells.length) {
            var fauxshell = {sig: sig}
            if(!EB.Data.getBonus(fauxshell, 'envelope')) {
                EB.Data.removeShellFromCache(sig)
                return EB.onError("Content can not be found for shell '" + sig + "'") // THINK: why was this throwError?
                // THINK: unlock EB.Data.pendingPuffPromises[sig]? probably not, but it might re-appear later...
            }
        }
        return shells
    }
}

EB.Data.removeShellFromCache = function(sig) {
    var shell = EB.Data.getCachedShellBySig(sig)                    // remove from EB.Data.shells
    EB.Data.shells.splice( EB.Data.shells.indexOf(shell), 1 )
    
    delete EB.Data.shellSort[sig]                                   // remove from EB.Data.shellSort
    
    delete EB.Data.bonii[sig]                                       // remove shell's bonii
    
    EB.Data.purgeShellFromGraph(sig)                                // remove from graph
    
    EB.Data.removeCachedPuffScore(shell)                            // remove allocator score
}

EB.Data.purgeShellFromGraph = function(sig) {
    // change graph vertex to 'pseudo-shell' type (or 'purged' type?)
    //   and remove the content of the 'shell' property
    // TODO: this is icky make it better
    var vertex = EB.Data.graph.v(sig).run()[0]
    if(vertex) {
        vertex.type = 'purged'
        vertex.shell = undefined
    }
}


/**
 * to get my puff chain
 * @param  {string} username 
 * @return {object}
 */
EB.Data.getMyPuffChain = function(username) {
    // CURRENTLY UNUSED
    // TODO: this should grab my puffs from a file or localStorage or wherever my identity's puffs get stored
    // TODO: that collection should be updated automatically with new puffs created through other devices
    // TODO: the puffchain should also be sorted in chain order, not general collection order
    
    var shells = EB.Data.getShells()
    
    return shells.filter(function(puff) { return puff && puff.username == username }) // TODO: use the graph
    // return EB.M.Forum.getByUser(username) // TODO: test this 
}



///////////////////////////////////////////
//                                       //
//       Garbage Collector Thing         //
//                                       //
///////////////////////////////////////////



EB.Data.runningSizeTally = 0
EB.Data.scoreSort = {}

EB.Data.heuristics = []
EB.Data.addHeuristics = function(fun) {
    EB.Data.heuristics.push(fun)
}

EB.Data.addHeuristics(function(shell) {
    return parseFloat( (EB.Data.getBonus(shell, 'starStats') || {}).score || 0 ) * 100
})

// TODO: add heuristics for: my puffs (which go elsewhere, ultimately), replies to my puffs, my puff's parents, 
//       friend's puffs (whatever that means), puff freshness, last seen, etc


EB.Data.rateMyPuff = function(puff) {
    var scores = EB.Data.heuristics.map(function(h) {return h(puff)})           // apply heuristics
    var total  = scores.reduce(function(acc, score) {return acc+(score||0)}, 0) // get total // TODO: improve algo
    return total
}

EB.Data.rateSomePuffs = function(puffs) {
    puffs.forEach(function(puff) {                                              // rate each puff
        var score = EB.Data.rateMyPuff(puff)
        EB.Data.doStuffWithScore(puff, score)
        EB.Data.doStuffWithPuff (puff)
    })
    // THINK: some heuristics rely on scores of related puffs... possible feedback loop? topological ordering?
    //        a toposort is easy-ish w/ graph db...
}

// TODO: when you switch identities, rescore the puffs


EB.Data.doStuffWithScore = function(puff, score) {
    EB.Data.removeCachedPuffScore(puff)                                         // NOTE: has to come before bonii
    EB.Data.addBonus(puff, 'rating', score)                                     // add rating to bonii
    EB.Data.cachePuffScore(puff, score)    
    // OPT: cache sorted version
    // maybe bins[score.floor].push(puff) or something...
}

EB.Data.doStuffWithPuff = function(puff) {
    var puffsize = JSON.stringify(puff).length
    EB.Data.addBonus(puff, 'size', puffsize)
    EB.Data.runningSizeTally += puffsize || 0                                  // block NaNs
}

EB.Data.cachePuffScore = function(puff, score) {
    var key = EB.Data.convertScoreToKey(score)
    EB.Data.scoreSort[key] = EB.Data.scoreSort[key] || []
    EB.Data.scoreSort[key].push(puff)
}

EB.Data.removeCachedPuffScore = function(puff) {
    if(!puff) return false
    
    var score = EB.Data.getBonus(puff, 'score')
    var key = EB.Data.convertScoreToKey(score)
    var bin = EB.Data.scoreSort[key]
    if(!bin) return false
    if(!bin.length) return false
    
    for(var i = bin.length - 1; i >= 0; i--) {
        if(bin[i].sig == puff.sig) {
            bin.splice(i, 1)
            var puffsize = EB.Data.getBonus(puff, 'size')
            EB.Data.runningSizeTally -= puffsize || 0                          // block NaNs
            return false
        }
    }
}

EB.Data.getCachedPuffs = function(limit, bottom) {
    var seen = 0
    var result = []
    var keys = Object.keys(EB.Data.scoreSort).map(parseFloat).sort()
    
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var puffs = EB.Data.scoreSort[key] // OPT: short-circuit on !bottom
        
        puffs.reduce(function(seen, puff) {
            if(seen > limit == !!bottom) result.push(puff)
            return seen+1
        }, 0)
    }
    
    return result
}

EB.Data.convertScoreToKey = function(score) {
    return Math.floor(score / 10) || 0 // TODO: make this smarter
}


EB.Data.getTopPuffs = function(limit) {
    return EB.Data.getCachedPuffs(limit)
}

EB.Data.getNotTopPuffs = function(limit) {
    // grab the puffs below the limit threshold (w/ 300 puffs and limit=100 this returns the 200 worst puffs)
    return EB.Data.getCachedPuffs(limit, 'bottom')
}

// EB.Data.getTopPuffs = function(options) {
//     var numberLimit =  options.number || 0
//     var sizeLimit   =    options.size || 0
//     var compact     = options.compact || false  // whether to allow compaction of returned puffs
//     var reverse     = options.reverse || false  // return bottom puffs instead of top puffs
// }

EB.Data.garbageCompactor = function() {
    // are we over the limits?
    var limit     = EB.CONFIG.inMemoryShellLimit
    var memlimit  = EB.CONFIG.inMemoryMemoryLimit
    var sizelimit = EB.CONFIG.shellContentThreshold
    var didStuff  = false

    if(EB.Data.shells.length > limit) {
        didStuff = true
        EB.Data.shells.slice(limit).map(EB.prop('sig')).forEach(EB.Data.removeShellFromCache)
    }
    
    if(EB.Data.runningSizeTally > memlimit) {
        didStuff = true
        for (var i = EB.Data.shells.length - 1; i >= 0; i--) {
            var shell = EB.Data.shells[i]
            var content_size = (shell.payload.content||"").toString().length // THINK: non-flat content borks this
            if (content_size > sizelimit) {
                delete shell.payload.content // THINK: this is hardcore
                total -= content_size + 13 // NOTE: magic number == '"content":"",'.length
                if(total <= memlimit) break
            }
        }
    }
    
    return didStuff
}


EB.Data.getShellsForLocalStorage = function() {
    var limit     = EB.CONFIG.localStorageShellLimit
    var memlimit  = EB.CONFIG.localStorageMemoryLimit
    var sizelimit = EB.CONFIG.shellContentThreshold
    
    var shells = EB.Data.getTopPuffs(limit)
    var total = shells.reduce(function(size, shell) {
        return size + (EB.Data.getBonus(shell, 'size') || 0)
    }, 0)
    
    if (total <= memlimit) return shells
    
    // compact the puffs
    for (var i = shells.length - 1; i >= 0; i--) {
        var shell = shells[i]
        var content_size = (shell.payload.content||"").toString().length // THINK: non-flat content borks this
        if (content_size > sizelimit) {
            var new_shell = EB.Puff.compactPuff(shell)
            shells[i] = new_shell
            total -= content_size + 13 // NOTE: magic number == '"content":"",'.length
            if(total <= memlimit) break
        }
    }
    
    if (total <= memlimit) return shells
    
    // remove shells until under memlimit
    for (var i = shells.length - 1; i >= 0; i--) {
        var content_size = JSON.stringify(shell).length
        total -= content_size
        if(total <= memlimit) break
    }
    
    shells = shells.slice(0, Math.max(i, 1)) // prevent -1 
    
    return shells
}






// /**
//  * to fill some slots
//  * @param {number} need
//  * @param {number} have
//  * @param {string} query
//  * @param {string} filters
//  * @returns {boolean}
//  */
// EB.Data.fillSomeSlotsPlease = function(need, have, query, filters) {
//     //// we have empty slots on screen. fill them with puffs.
//
//     if(have >= need) return false
//
//     // -- redraw screen on new puffs being ingested (w/o looping)
//     // -- cycle all new puffs through graph stuff
//     // -- call fillSomeSlotsPlease every time we have slots to fill
//     // -- get focused puff immediately
//
//     // - perform GC on in-memory puffs (can remove content also)
//     // - use GC funs for persisting shells
//     // - store size of each shell/puff for GC
//     // - manage empty vertices better (different type?)
//
//     var args = [query, filters]
//     // var args = [query, filters, need]
//     // if(!query.mode) args.push(have) // hack for alternate query modes
//
//     var key = JSON.stringify(args)
//     var my_offset = EB.Data.slotLocker[key] || 0
//
//     if(my_offset < 0)
//         return false // slot is locked, go elsewhere
//
//     EB.Data.slotLocker[key] = -1 // prevent concurrent versions of the same request
//
//     //////
//
//     // var limit = need - have + 3 // 3 for luck
//
//     var limit = need // so... if we only do this once, and we have half the puffs already, we might only grab that half again. this is true even if we send an offset of 'have' to the server, because what we have might map to that slice (or to anything else -- our offsets are totally different than the servers). so we have to grab enough to cover the difference, which means grabbing the same shells multiple times... (but only empty shells, fortunately. but still.)
//
//     // var received_shells = 0
//
//     var prom = EB.Net.getSomeShells(query, filters, limit, query.offset)
//     // prom.then(function(shells) {received_shells = shells.length; return shells})
//     prom.then(EB.Data.addShellsThenMakeAvailable)
//         .then(function(delta) {
//             EB.Data.slotLocker[key] = delta ? 1 : -1})
//             // if the request is fruitful, unlock it (but be careful of offsets here).
//             // also, this locks when we received data but chose not to keep it (either dups or GC),
//             // so we could have an issue with locked queries that would be fruitful w/ different offset / limits...
//
//
//     // TODO: the slotLocker really should keep track of what 'slices' of the server you've seen, so we know not to re-request those over and over. this is... complicated.
//     //       so send query.offset+have to getSomeShells, and store that same offset as part of the slotLocker.
//     //       then you can track how much of some type of stuff is on the server... except that doesn't work for the P2P network.
//
//     return true
//
//     //////
//
//
//     // OLD STUFF SAVE FOR REFERENCE
//
//     // var batchSize = EB.CONFIG.fillSlotsBatchSize
//     // var giveup = EB.CONFIG.fillSlotsGiveup
//     // var new_shells = []
//     //
//     // giveup = giveup + my_offset
//     //
//     // function getMeSomeShells(puffs) {
//     //     if(puffs) {
//     //         var my_new_shells = EB.Data.hereHaveSomeNewShells(puffs)
//     //         new_shells = new_shells.concat(my_new_shells)
//     //         var delta = my_new_shells.length
//     //         // THINK: but do they pass the filter?
//     //         // TODO: can we make available here now that we're locking?
//     //         have += delta || 0
//     //     }
//     //
//     //     if(have >= need || my_offset > giveup || (query.mode && (my_offset - giveup < 0))) {
//     //         EB.Data.makeShellsAvailable(new_shells)
//     //         EB.Data.slotLocker[key] = my_offset-limit
//     //         return false
//     //     }
//     //
//     //     var limit = need - have
//     //     // if(!query.mode) limit += 50 // grab a few extras to help work through bare patches
//     //
//     //     var prom = EB.Net.getSomeShells(query, filters, limit, my_offset)
//     //     prom.then(getMeSomeShells)
//     //
//     //     my_offset += limit
//     // }
//     //
//     // getMeSomeShells()
// }


/*

    Network library for the EveryBit platform.

    Contains a peer.js-based p2p layer, a promise-based XHR implementation, 
    helper functions for accessing various server-based APIs, 
    and helper functions for handling puff distribution and acquisition.

    Copyright 2014-2015 EveryBit. See README for license information.

 */

EB.Net = {}

/**
 * Fire up networks (currently just the peer connections)
 */
EB.Net.init = function() {
    EB.Net.P2P.init()
}

/**
 * Given a signature, return puff with that signature
 * @param  {string} sig signature of a puff
 * @return {object}     puff corresponds to the specified signature
 */
EB.Net.getPuffBySig = function(sig) {
    var url  = EB.CONFIG.puffApi
    var data = {type: 'getPuffBySig', sig: sig}
    
    return EB.Net.EBgetJSON(url, data)
}

EB.Net.getKidSigs = function(sig) {
    var url  = EB.CONFIG.puffApi
    var data = {type: 'getChildrenBySig', sig: sig}
    
    return EB.Net.EBgetJSON(url, data)
}

EB.Net.getKidSigs = Boron.memoize(EB.Net.getKidSigs) // THINK: this assumes we'll get all new things over the P2P network, which won't always be true.



EB.Net.getStarShells = function() {
    var url  = EB.CONFIG.puffApi
    var data = {type: 'getPuffs', contentType: 'star', numb: EB.CONFIG.globalBigBatchLimit}
    
    return EB.Net.EBgetJSON(url, data)
}

EB.Net.getConversationPuffs = function(convoId, batchsize, offset, fullOrShell) {
    convoId  = convoId.replace('&',',')

    var url  = EB.CONFIG.puffApi
    var data = { type: 'getPuffs', contentType: 'encryptedpuff'
               , conversationPartners: convoId
               , numb: batchsize
               , offset: offset
               }
    
    return EB.Net.EBgetJSON(url, data)
}

EB.Net.getMyPrivatePuffs = function(username, batchsize, offset, fullOrShell) {
    if(!username) return EB.emptyPromise()
    batchsize = batchsize || EB.CONFIG.globalBigBatchLimit
    
    var url  = EB.CONFIG.puffApi
    var data = { route: username, username: username, fromAndTo: 1
               , type: 'getPuffs', contentType: 'encryptedpuff'
               , fullOrShell: fullOrShell || 'full'
               , numb: batchsize
               , offset: offset
               }
    
    return EB.Net.EBgetJSON(url, data)
    
/*

    So something like:

    EB.getSomePuffs(query, limit, etc)

    helper.js:
    tryGettingMorePuffs(visibleLimit) {
        // figure out how many we've requested already (EB.currentOffset)
        // figure out how many we actually have (EB.Data.getDecryptedPuffs)
        var delta = visibleLimit - EB.Data.getDecryptedPuffs().length
        EB.currentOffset += delta
        return EB.getSomePuffs(query, EB.currentOffset)
    }


*/ 

    // TODO: chain this in to the table view
    
}


EB.Net.getProfilePuff = function(username) {
    var url  = EB.CONFIG.puffApi
    var data = { username: username
               , fullOrShell: 'full'
               , contentType: 'profile'
               , type: 'getPuffs'
               , sort: 'DESC'
               , numb: 1
               }
    
    return EB.Net.EBgetJSON(url, data)
}

EB.Net.getProfilePuff = EB.promiseMemoize(EB.Net.getProfilePuff)


/**
 * to get some shells
 * @param {string} query
 * @param {string} filters
 * @param {number} limit
 * @param {number} offset
 * @returns {Shell[]}
 */
EB.Net.getSomeShells = function(query, filters, limit, offset) {
    // TODO: switching by query 'mode' will need to be changed when the network api matches our local api (i.e. once we use browser p2p & headless clients to service requests)
    
    var mode = query.mode
    // if(mode == 'ancestors')   return EB.Net.getAncestors  ([query.focus], limit)
    // if(mode == 'descendants') return EB.Net.getDescendants([query.focus], limit)
    // if(mode == 'siblings')    return EB.Net.getSiblings   ([query.focus], limit)

    // "normal" mode (just ask for shells from lists or something)
    var url  = EB.CONFIG.puffApi

    //  if(filters.types)   data.type       = filters.types      // filter by types

    var data = {type: 'getPuffs', contentType: 'plain'}
    // var data = {type: 'getPuffs', contentType: '["image"]'}


    if(limit)  data.numb    = limit                         // defaults to 20 on the server
    if(offset) data.offset  = offset                        // defaults to 0, which is latest
    
    if(query.sort)      data.sort        = query.sort       // ASC or DESC
    if(filters.users)   data.username    = filters.users    // filter by username
    if(filters.routes)  data.route       = filters.routes   // filter by route
    if(filters.tags)    data.tags        = filters.tags     // filter by tags
    if(filters.types)   data.contentType = filters.types    // filter by types
    if(query.ancestors) data.maxParents  = query.ancestors  // defaults to all shells 
                                                            // 0 is roots, 1 is single parent, etc
    // data.flagged = false
    
    // data.focus
    // data.ancestors
    // data.descendants
    
    var filterstring = JSON.stringify(filters.types)
    var profile_request = (filterstring == '["profile"]')
    
    if(EB.CONFIG.disableReceivePublic && !profile_request)
        return EB.emptyPromise()
                 .then(function() {return []})
    
    return EB.Net.EBgetJSON(url, data)                      // always returns a valid array
                 .then(function(x) {return x || []}, function() {return []})
}


/**
 * add puff to the server and broadcast to peers
 * @param  {object} puff the puff to be added to the server
 */
EB.Net.distributePuff = function(puff) {
    //// distribute a puff to the network

    if(EB.CONFIG.disableSendToServer) return false          // so you can work locally

    if(EB.CONFIG.netblockSuffix) {                          // block distribution of local puffs
        var usernames = [puff.username]
        if(puff.keys)
            usernames = usernames.concat(Object.keys(puff.keys))

        usernames = usernames.map(EB.Users.justUsername)
        var suffixes = usernames.map(function(username) {
            var chunks = username.split('.')
            return chunks[chunks.length-1]
        })
        
        if(suffixes.indexOf(EB.CONFIG.netblockSuffix) > -1)
            return false
    }

    EB.Net.sendPuffToServer(puff)                           // add it to the server's pufflist

    EB.Net.P2P.sendPuffToPeers(puff)                        // broadcast it to peers
}

/**
 * add a puff to the server's pufflist
 * @param  {object} puff
 * @return {object}
 */
EB.Net.sendPuffToServer = function(puff) {
    // THINK: this is fire-and-forget, but we should do something smart if the network is offline or it otherwise fails. 
    //        on the other hand, we'll probably want to do this with sockets instead of ajax ultimately...
    //        or manage it entirely with routing, even for server-sent puffs?
    
    var data = { type: 'addPuff'
               , puff: JSON.stringify(puff) }
               
    return EB.Net.EBpost(EB.CONFIG.puffApi, data)
                 .catch(EB.catchError('Could not send puff to server'))
}

/**
 * fetch a particular userRecord
 * @param  {string}  username 
 * @param  {string}  capa 
 * @return {promise} on fulfilled passes the user record as object, otherwise re-throw error
 */
EB.Net.getUserRecord = function(username, capa) {
    var url   = EB.CONFIG.userApi
    
    var versionedUsername = EB.Users.makeVersioned(username, capa)
    username = EB.Users.justUsername(versionedUsername)
    
    if(capa !== 0) // 0 signals that we need to fetch the latest userRecord
        capa = EB.Users.justCapa(versionedUsername)
    
    var data  = { type: 'getUser'
                , username: username
                }

    if(capa)
        data.capa = capa

    return EB.Net.EBgetJSON(url, data)
}


/**
 * modify a user record
 * @param  {puff}   puff a signed puff containing information of modified user record
 * @return {object} promise for new userRecord or error when the update fails
 */
EB.Net.updateUserRecord = function(puff) {
    var data = { type: 'updateUsingPuff'
               , puff: puff
               }

    var prom = EB.Net.EBpost(EB.CONFIG.userApi, data)
    
    return prom.catch(EB.catchError('Sending user record modification puff failed'))
               .then(JSON.parse) // THINK: this throws on invalid JSON
               .then(function(userRecord) {
                   return EB.Users.process(userRecord)
                       || EB.throwError('Invalid user record', JSON.stringify(userRecord))
               })
}



/**
 * EB.Net promise-based XHR layer
 * 
 * We use promises as our default concurrency construct, 
 * because ultimately this platform is composed of a 
 * huge set of interdependent async calls which mostly 
 * each resolve to a single immutable entity 
 * -- aka the promise sweet spot.
 * 
 * @param  {string} url     requested url
 * @param  {object} options 
 * @param  {object} data    
 * @return {object}
 */
EB.Net.xhr = function(url, options, data) {
    //// very simple promise-based XHR implementation
    
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest()
        req.open(options.method || 'GET', url)
        
        Object.keys(options.headers || {}).forEach(function (key) {
            req.setRequestHeader(key, options.headers[key])
        })
        
        var formdata = new FormData()
        Object.keys(data || {}).forEach(function (key) {
            var datum = typeof data[key] == 'object' ? EB.stringifyJSON(data[key]) : data[key]
            formdata.append(key, datum)
        })
        
        if(options && options.type)
            req.responseType = options.type
                
        req.onload = function() {
            if(req.status != 200) // silly safari
                return reject(EB.makeError(req.statusText))
            
            if(req.responseType == 'json' && req.response === null) // NOTE: traps JSONified 'null' responses also: use empty string or [] to indicate an empty result
                return reject(EB.makeError("Invalid JSON in response", req.response))
            
            resolve( (req.responseType != options.type) // manually convert json for old browsers
                  && options.type == 'json' ? EB.parseJSON(req.response) : req.response)
        }

        req.onerror = function(event) {
            reject(EB.makeError("Network Error", event, 'networkError'))
        }
        
        req.ontimeout = function(event) {
            reject(EB.makeError("Timeout Error", event, 'timeoutError'))
        }
        
        req.timeout = EB.CONFIG.networkTimeout

        req.send(formdata)
    })
}

/**
 * request an url, get result in JSON
 * @param  {string} url    
 * @param  {object} params 
 * @return {object}
 */
EB.Net.getJSON = function(url, params) {
    var options = { headers: { 'Accept': 'application/json' }
                  ,  method: 'GET'
                  ,    type: 'json'
                  }

    var params = params || {}
    var enc = function(param) {return !param && param!==0 ? '' : encodeURIComponent(param)}
    var qstring = Object.keys(params).reduce(function(acc, key) {return acc + enc(key) +'='+ enc(params[key]) +'&'}, '?')

    return EB.Net.xhr(url + qstring, options) 
}


/**
 * send a post request
 * @param  {string} url  requested url
 * @param  {object} data 
 * @return {object}
 */
EB.Net.post = function(url, data) {
    var options = { headers: {   
//         'Content-type': 'application/x-www-form-urlencoded' 
//                           , 'Content-length': params.length
//                           ,     'Connection': 'close'  
                             }
                  ,  method: 'POST'
                  }

    return EB.Net.xhr(url, options, data)
}



/**
 * A customized wrapper for the EveryBit server over the base XHR promise wrapper
 * @param  {string} url    
 * @param  {object} params 
 * @return {object}
 */
EB.Net.EBxhr = function(url, options, data) {
    var prom = EB.Net.xhr(url, options, data)
        
    return prom.then(function(response) {
        if(response.FAIL)
            return EB.throwDHTError(response.FAIL)

        if(typeof response == 'string' && response.slice(0,6) == '{"FAIL')
            return EB.throwDHTError((EB.parseJSON(response)||{}).FAIL)

        EB.runHandlers('networkresponse', response)
        
        return response
    })
}

EB.Net.EBpost = function(url, data) {
    //// This is the EveryBit server version of EB.Net.getJSON -- use that function if you're not accessing the EveryBit server
    // THINK: should we parametrize over the dispatch function?
    var options = { headers: {}
                  ,  method: 'POST'
                  }
                  
    return EB.Net.EBxhr(url, options, data)
}

EB.Net.EBgetJSON = function(url, params) {
    //// This is the EveryBit server version of EB.Net.getJSON -- use that function if you're not accessing the EveryBit server
    // THINK: should we parametrize over the dispatch function?
    var options = { headers: { 'Accept': 'application/json' }
                  ,  method: 'GET'
                  ,    type: 'json'
                  }

    var params = params || {}
    var enc = function(param) {return !param && param!==0 ? '' : encodeURIComponent(param)}
    var qstring = Object.keys(params).reduce(function(acc, key) {return acc + enc(key) +'='+ enc(params[key]) +'&'}, '?')

    return EB.Net.EBxhr(url + qstring, options) 
}








/*

    EB.Net Peer-to-Peer layer

    We're currently using peer.js to negotiate the WebRTC connection. There's a lot of work left to be done here.

*/


EB.Net.P2P = {}
EB.Net.P2P.peers = {}

/**
 * initialize the peer-to-peer layer
 */
EB.Net.P2P.init = function() {
    // NOTE: you have to manually enable the P2P layer via config or init options
    // e.g. EB.init({enableP2P: true})
    // or   EB.CONFIG.enableP2P = true
    if(!EB.CONFIG.enableP2P) return false
    
    EB.Net.P2P.Peer = new Peer({ host:  '162.219.162.56'
                               , port:  9000
                               , path:  '/'
                               , debug: 1
                               })
    
    EB.Net.P2P.Peer.on('open', EB.Net.P2P.openPeerConnection)
    EB.Net.P2P.Peer.on('connection', EB.Net.P2P.connection)
}

/**
 * to reload peers
 * @return {object} 
 */
EB.Net.P2P.reloadPeers = function() {
    return EB.Net.P2P.Peer.listAllPeers(EB.Net.P2P.handlePeers)
}

/**
 * open peer connection
 * @param  {string} id 
 * @return {object[]}
 */
EB.Net.P2P.openPeerConnection = function(id) {
    // OPT: do we really need this? 
    // THINK: why not just call EB.Net.P2P.reloadPeers?
    return EB.Net.P2P.Peer.listAllPeers(EB.Net.P2P.handlePeers)
}

/**
 * connection
 * @param connection
 * @returns {*}
 */
EB.Net.P2P.connection = function(connection) {
    EB.Net.P2P.reloadPeers() // OPT: do we really need this? 

    return connection.on('data', function(data) {
        EB.Data.addShellsThenMakeAvailable(data) // TODO: pass a callback in to EB.Net instead of calling this directly
    })
}

/**
 * to handle peers
 * @param  {object} peers 
 * @return {boolean}   
 */
EB.Net.P2P.handlePeers = function(peers) {
    peers.forEach(function(peer) {
        if(EB.Net.P2P.peers[peer]) 
            return false
        EB.Net.P2P.peers[peer] = EB.Net.P2P.Peer.connect(peer)
    })
}

/**
 * to send puff to peers
 * @param  {object} puff
 */
EB.Net.P2P.sendPuffToPeers = function(puff) {
    for(var peer in EB.Net.P2P.peers) {
        EB.Net.P2P.peers[peer].send(puff)
    }
}











// EB.Net.getAncestors = function(start, limit) {
//     getEm(start, [], limit)
//     return EB.emptyPromise()
//
//     function getEm(todo, done, remaining) {
//         if(!todo.length) return false                       // all done
//         if(!remaining) return false                         // all done
//
//         var sig = todo[0]
//
//         if(~done.indexOf(sig)) {
//             return getEm(todo.slice(1), done, remaining)    // we've already done this one
//         }
//
//         // TODO: set a callback in EB.Net instead of calling EB.Data directly
//         var puff = EB.Data.getPuffBySig(sig)                // effectful
//
//         if(puff)
//             return getEm(todo.slice(1).concat(puff.payload.parents), done.concat(sig), remaining)
//
//         // no puff? that's ok. attach a then clause to its pending promise.
//         // TODO: find better method to do this
//         remaining-- // because we're adding a new puff, or at least new content
//         var prom = EB.Data.pendingPuffPromises[sig]
//         prom.then(function(puffs) {
//             getEm(todo.slice(1).concat(((puffs[0]||{}).payload||{}).parents), done.concat(sig), remaining)
//         })
//     }
//
//     //
//     // if(!todo.length)
//     //     return Promise.resolve(results)             // all done
//     // if(results.length >= limit)
//     //     return Promise.resolve(results)             // all done
//     //
//     // var sig = todo[0]
//     // var shell = EB.Data.getCachedShellBySig(sig)   // TODO: set a callback in EB.Net instead of calling this directly
//     //          || results.filter(function(result) {return result.sig == sig})[0]
//     //
//     // // if we already have a puff for sig, then we just need to put its parents on the todo stack
//     // if(shell) {
//     //     todo.shift() // take off the shell we just worked on
//     //     return EB.Net.getAncestors(todo.concat(shell.payload.parents), limit, results)
//     // }
//     //
//     // // otherwise, get a promise for the shell, then add it to results
//     // var prom = EB.Net.getPuffBySig(sig)
//     // return prom.then(function(puffs) {
//     //     return EB.Net.getAncestors(todo, limit, results.concat(puffs))
//     // })
// }

// EB.Net.getDescendants = function(start, limit) {
//     getEm(start, [], limit)
//     return EB.emptyPromise()
//
//     function getEm(todo, done, remaining) {
//         if(!todo.length) return false                       // all done
//         if(!remaining) return false                         // all done
//
//         var sig = todo[0]
//
//         if(~done.indexOf(sig)) {
//             return getEm(todo.slice(1), done, remaining)    // we've already done this one
//         }
//
//         // TODO: set a callback in EB.Net instead of calling EB.Data directly
//         var haveShell = EB.Data.getCachedShellBySig(sig)
//
//         if(!haveShell) {                                    // we don't have the shell yet, so go get it
//             // TODO: use above callback to EB.Data
//             EB.Data.getPuffBySig(sig)                       // effectful
//             remaining--
//         }
//
//         var kidsigprom = EB.Net.getKidSigs(sig)             // get all its children
//         return kidsigprom.then(function(kidsigs) {
//             getEm(todo.slice(1).concat(kidsigs), done.concat(sig), remaining)
//         })
//     }
// }

// EB.Net.getSiblings = function() {
//     // this case is ugly, so we're leaving it until the client api can answer questions for us
//     return EB.emptyPromise()
// }

/*

    Persistence layer for the EveryBit platform.

    It's like a network on your hard drive... which means this could be part of EB.Net.

    Copyright 2014-2015 EveryBit. See README for license information.

 */

EB.Persist = {};
EB.Persist.todo = {}
EB.Persist.todoflag = false

/**
 * to save key/value
 * @param  {string} key
 * @param  {string} value
 */
EB.Persist.save = function(key, value) {
    if(value == null)
        value = false
    EB.Persist.todo[key] = value
    if(!EB.Persist.todoflag) {
        onceInAwhile(function() {
            for(var key in EB.Persist.todo) {
                var realkey = 'PUFF::' + key;                           // prepend PUFF:: so we're good neighbors
                var value = EB.Persist.todo[key];
                if(typeof value == 'function')                          // in case we're passed a thunk
                    value = value();
                var str = JSON.stringify(value);                
                localStorage.setItem(realkey, str);
            }
            EB.Persist.todo = {};
            EB.Persist.todoflag = false;
        }, 100);                                                        // call at most every 100ms
    }
    EB.Persist.todoflag = true
}

/**
 * get the parsed JSON info from the given key
 * @param  {string} key
 * @return {anything}
 */
EB.Persist.get = function(key) {
    // TODO: return empty string instead of false

    var realkey = 'PUFF::' + key;
    var str = localStorage.getItem(realkey);
    if(!str) return false;
    return EB.parseJSON(str);
}

/**
 * to remove the item according to the given key
 * @param  {string} key
 */
EB.Persist.remove = function(key) {
    var realkey = 'PUFF::' + key;
    localStorage.removeItem(realkey);
}

/*

    Puffs are the lifeblood of EveryBit. This file contains relatively pure functions for working with them.

    Copyright 2015 EveryBit. See README for license information.

*/

EB.Puff = {}


//// Building puffs

EB.Puff.createPrivate = function(content, type) {
    var payload = {}
    
    var type   = type || 'file'
    var routes = ['local']

    var userRecord = EB.getCurrentUserRecord()
    var userRecordsForWhomToEncrypt = [userRecord]
    var previous, puff
    
    puff = EB.Puff.simpleBuild(type, content, payload, routes, userRecordsForWhomToEncrypt)
    
    return puff
}


EB.Puff.simpleBuild = function(type, content, payload, routes, userRecordsForWhomToEncrypt, privateEnvelopeAlias) {
    //// build a puff for the 'current user', as determined by the key manager (by default EB.M.Wardrobe)
    var puff 

    payload = EB.runHandlers('payloadModifier', payload)

    EB.useSecureInfo(function(identities, currentUsername, privateRootKey, privateAdminKey, privateDefaultKey) {
        // THINK: should we confirm that our local capa matches the DHT's latest capa for the current user here? it turns the output into a promise...
        var previous = false // TODO: get the sig of this user's latest puff
        var versionedUsername = EB.getCurrentVersionedUsername()
        
        puff = EB.Puff.build(versionedUsername, privateDefaultKey, routes, type, content, payload, previous, userRecordsForWhomToEncrypt, privateEnvelopeAlias)
    })
    
    return puff
}


/**
 * build a new puff object based on the parameters  
 * does not hit the network, hence does no real verification whatsoever
 * @param  {string} username                    user who sign the puff
 * @param  {string} privateKey                  private default key for the user
 * @param  {string} routes                      routes of the puff
 * @param  {string} type                        type of the puff
 * @param  {string} content                     content of the puff
 * @param  {object} payload                     other payload information for the puff
 * @param  {string} previous                    most recently published content by the user
 * @param  {object} userRecordsForWhomToEncrypt
 * @param  {object} privateEnvelopeAlias
 * @return {object}                             the new puff object
 */
EB.Puff.build = function(versionedUsername, privateKey, routes, type, content, payload, previous, userRecordsForWhomToEncrypt, privateEnvelopeAlias) {
    var puff = EB.Puff.packageStructure(versionedUsername, routes, type, content, payload, previous)

    puff.sig = EB.Crypto.signPuff(puff, privateKey)
    
    if(userRecordsForWhomToEncrypt) {
        puff = EB.Puff.encrypt(puff, privateKey, userRecordsForWhomToEncrypt, privateEnvelopeAlias)
    }
    
    return puff
}


EB.Puff.packageStructure = function(versionedUsername, routes, type, content, payload, previous) {
    //// pack all the parameters into an object with puff structure (without signature)
    
    payload = payload || {}                     // TODO: check all of these values more carefully
    payload.content = content
    payload.type = type

    routes = routes || []
    previous = previous || false                // false for DHT requests and beginning of blockchain, else valid sig

    var puff = { username: versionedUsername
               ,   routes: routes
               , previous: previous
               ,  version: '0.4.0'              // version accounts for crypto type and puff shape
               ,  payload: payload              // early versions will be aggressively deprecated and unsupported
               }
    
    return puff
}


/**
 * Build user registration puff
 * @param  {string}  username of existing user
 * @param  {string}  private admin key for existing user
 * @param  {string}  desired new user name
 * @param  {string}  public root key for the new user
 * @param  {string}  public admin key for the new user
 * @param  {string}  public default key for the new user
 * @return {object}  puff to register the user
 */
EB.Puff.buildUserRegistration = function(signingUsername, privateAdminKey, newUsername, rootKey, adminKey, defaultKey) {

    // the DHT update puff payload
    var payload = { requestedUsername: newUsername
                  ,        defaultKey: defaultKey
                  ,          adminKey: adminKey
                  ,           rootKey: rootKey
                  ,              time: Date.now()
                  }

    // build the DHT update puff
    var routing = [] // THINK: DHT?
    var content = 'requestUsername'
    var type    = 'updateUserRecord'

    // NOTE: we're skipping previous, because requestUsername-style puffs don't use it.
    var puff = EB.Puff.build(signingUsername, privateAdminKey, routing, type, content, payload)

    return puff
}





//// Encryption and decryption


EB.Puff.isPrivate = function(shell) {
    return shell.payload.type == 'encryptedpuff'
}


EB.Puff.encrypt = function(letter, myPrivateWif, userRecords, privateEnvelopeAlias) {
    //// stick a letter in an envelope. userRecords must be fully instantiated.
    var puffkey = EB.Crypto.getRandomKey()                                        // get a new random key
    
    var letterCipher = EB.Crypto.encryptWithAES(JSON.stringify(letter), puffkey)  // encrypt the letter
    var versionedUsername = letter.username
    
    if(privateEnvelopeAlias) {
        myPrivateWif = privateEnvelopeAlias.privateDefaultKey
        versionedUsername = EB.Users.makeVersioned(privateEnvelopeAlias.username, privateEnvelopeAlias.capa)
    }
    
    var envelope = EB.Puff.packageStructure(versionedUsername, letter.routes      // envelope is also a puff
                           , 'encryptedpuff', letterCipher, {}, letter.previous)  // it includes the letter
    
    envelope.keys = EB.Crypto.createKeyPairs(puffkey, myPrivateWif, userRecords)  // add decryption keys
    envelope.sig = EB.Crypto.signPuff(envelope, myPrivateWif)                     // sign the envelope
    
    return envelope
}

EB.Puff.promiseLetter = function(envelope) {                            // the envelope is a puff
    if(EB.Data.isBadEnvelope(envelope.sig)) 
        return Promise.reject('Bad envelope')                           // flagged as invalid envelope

    var maybeLetter = EB.Data.getDecryptedLetterBySig(envelope.sig)     // have we already opened it?
    
    if(maybeLetter)
        return Promise.resolve(maybeLetter)                             // resolve to existing letter
    
    var prom = EB.Puff.promiseDecryptedLetter(envelope)                 // do the decryption
    
    return prom.catch(function(err) { return false })
               .then(function(letter) {
                   if(!letter) {
                       EB.Data.addBadEnvelope(envelope.sig)             // decryption failed: flag envelope
                       return EB.throwError('Invalid envelope')         // then bail out
                   }

                   return letter
               })
    
}

EB.Puff.promiseDecryptedLetter = function(envelope) {
    //// pull a letter out of the envelope -- returns a promise!

    if(!envelope || !envelope.keys) 
        return EB.emptyPromise('Envelope does not contain an encrypted letter')
    
    var senderVersionedUsername = envelope.username
    var userProm = EB.Users.getUserRecordPromise(senderVersionedUsername)
    
    var puffprom = userProm
    .catch(EB.catchError('User record acquisition failed'))
    .then(function(senderVersionedUserRecord) {
        var prom // used for leaking secure promise

        EB.useSecureInfo(function(identities, currentUsername) {
            // NOTE: leaks a promise which resolves to unencrypted puff
        
            var identity = identities[currentUsername]
            var aliases  = identity.aliases
            var matchingUsername = ''
                
            top: for(var keykey in envelope.keys) {             // match our aliases against all recipients
                for (var i = 0; i < aliases.length; i++) {
                    var alias = aliases[i]
                    
                    if(alias.username == keykey) {              // only for old, unversioned usernames
                        matchingUsername = alias.username
                        break top
                    }
                    
                    var versionUsername = EB.Users.makeVersioned(alias.username, alias.capa)
                    if(versionUsername == keykey) {
                        matchingUsername = versionUsername
                        break top
                    }
                }
            }

            if(!matchingUsername)
                return EB.throwError('No key found for current user')

            var recipientPrivateKey = alias.privateDefaultKey
            var senderPublicKey = senderVersionedUserRecord.defaultKey
            
            prom = EB.Puff.promiseToDecryptForReals(envelope, senderPublicKey, matchingUsername, recipientPrivateKey)
        })

        return prom
    })
    
    return puffprom
}

EB.Puff.promiseToDecryptForReals = function(envelope, senderPublicKey, recipientUsername, recipientPrivateKey) {
    return new Promise(function(resolve, reject) {
        return EB.cryptoworker
             ? EB.workersend( 'decryptPuffForReals'
                            , [ envelope
                              , senderPublicKey
                              , recipientUsername
                              , recipientPrivateKey ]
                            , resolve, reject )
             : resolve( EB.decryptPuffForReals( envelope
                                              , senderPublicKey
                                              , recipientUsername
                                              , recipientPrivateKey ) )
    })
}


//// Shells and puffs


EB.Puff.isFull = function(shell) {
    // A puff has payload.content -- a shell does not
    return ((shell||{}).payload||{}).content !== undefined
}

EB.Puff.isEmpty = function(shell) {
    return !EB.Puff.isFull(shell)
}

EB.Puff.compactPuff = function(puff) {
    // THINK: instead of rebuilding the puff, use a JSON.stringify reducer that strips out the content
    var new_shell = Boron.extend(puff)
    var new_payload = {}
    for(var prop in puff.payload)
        if(prop != 'content')
            new_payload[prop] = puff.payload[prop] 

    new_shell.payload = new_payload
    return new_shell
}


/*

    Comprehensive (in progress!), canonical set of functions defining and validating a puff.

    All of these are STRICTLY FORMAL validations: they don't depend on the state of the universe.

    Copyright 2014-2015 EveryBit. See README for license information.

 */


EB.Spec = {}


/**
 * Validate the username
 * @param  {string} username
 */
EB.Spec.isValidUsername = function(username) {
    /*
    RULES:
    - Minimum length is 1
    - Maximum length of full username (including subusers and .) is 255 characters
    - Only alphanumeric
    - Only lowercase
    - Cannot begin or end with a .
     */

    EB.Spec.isValidUsername.rulesStatement = 'Usernames can only contain lowercase letters, numbers, and periods. They cannot ' +
        'be longer than 255 characters, or begin or end with a period.'

    if(!username)
        return false

    if(username.length > 255)
        return false

    if(!username.match(/^[a-z0-9.]+$/))
        return false

    if(username.slice(0, 1) == '.')
        return false

    if(username.slice(-1) == '.')
        return false

    return true
}


/**
 * Does everything possible to make a username valid
 * Note: This may have unintended consequences for the user
 */
EB.Spec.sanitizeUsername = function(username) {
    /*
     TRANSFORMATIONS:
     - Remove leading and trailing space
     - Convert to lowercase
     - Remove all illegal characters, including leading and trailing .
     */
    username = username.trim()

    username = username.toLowerCase()

    if(username.slice(0, 1) == '.')
        username = username.slice(1)

    if(username.slice(-1) == '.')
        username = username.slice(0,-1)

    username = username.replace(/[^a-z0-9.]+/g, '')

    return username
}


/**
 * check if it is a valid public key
 * @param {string} publicKey
 * @returns {boolean}
 */
EB.Spec.isValidPublicKey = function(publicKey) {
    // TODO: do "checksum" validation

    if(!isset(publicKey)) {
        return false;
    } else {
        return true;
    }

}

/**
 * check if it is a valid private key
 * @param {string} privateKey
 * @returns {boolean}
 */
EB.Spec.isValidPrivateKey = function(privateKey) {
    // TODO: Validate by testing if can be converted to public key

    if(!isset(privateKey)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Check if this is a valid capa
 * @param capa
 * @returns {boolean}
 */
EB.Spec.isValidCapa = function(capa) {

    /*
     RULES:
     - Must be a natural number (1 or greater)
     */

    EB.Spec.isValidCapa.rulesStatement = 'capa must be a natural number.';


    capa = capa.toString(); // Convert to string
    var n1 = Math.abs(n);
    var n2 = parseInt(n, 10);

    if(n2 < 1)
        return false

    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}



/**
 * check if a username is valid
 *     a username must be shorter than 256 characters, all lowercase and contains only alphanumeric and . sign
 * @param  {string} username the string to be check
 * @return {boolean}          return true if  the parameter string is a valid username, otherwise throw error
 */
EB.Spec.validateUsername = function(username) {
    if(!username) 
        return EB.onError('Username is required', username)

    if(username.length > 256) 
        return EB.onError('Usernames must be shorter than 256 characters', username)

    if(username != username.toLowerCase()) 
        return EB.onError('Usernames must be lowercase', username)
    
    if(!/^[0-9a-z.]+$/.test(username))
        return EB.onError('Usernames must be alphanumeric', username)
    
    return true
}


/**
 * determine if it is a good shell, checks for the existence of required fields
 * @param {Shell[]}
 * @returns {boolean}
 */
EB.Spec.isValidShell = function(shell) {
    //// this just checks for the existence of required fields
    if(!shell.sig) return false
    if(!shell.routes) return false
    if(!shell.username) return false
    if(typeof shell.payload != 'object') return false
    if(!shell.payload.type) return false
        
    return true
}

/**
 * to verify a puff
 * @param  {object} puff
 * @return {(string|boolean)}
 */
EB.Spec.isGoodPuff = function(puff) {
    // CURRENTLY UNUSED
    // TODO: check previous sig, maybe
    // TODO: check for well-formed-ness
    // TODO: use this to verify incoming puffs
    // TODO: if prom doesn't match, try again with getUserRecordNoCache
    
    // TODO: rewrite this function to give a consistent return value
    
    if (!EB.Data.contentTypes[shell.payload.type]) {
        // TODO: this needs to include 'encryptedpuff' as a valid type
        Events.pub('track/unsupported-content-type', {type: shell.payload.type, sig: shell.sig})
        return false
    }
    
    var prom = EB.Users.getUserRecordPromise(puff.username) // NOTE: versionedUsername
    
    return prom.then(function(user) {
        return EB.Crypto.verifyPuffSig(puff, user.defaultKey)
    })
}

/*

    User management for the EveryBit platform.

    Most functions related to userRecords live here.
    Note that userRecords are entirely public;
    private key identities are handled elsewhere.

    Copyright 2014-2015 EveryBit. See README for license information.

 */

EB.Users = {}

EB.Users.records  = {}                              // maps versioned username to an array of DHT userRecords
EB.Users.promises = {}                              // pending userRecord requests


EB.Users.init = function(options) {
    EB.Users.depersist()                            // pop userRecords out of localStorage
}


EB.Users.process = function(userRecord) {
    //// Processes all incoming userRecords
    
    userRecord = EB.Users.build( userRecord.username, userRecord.defaultKey, userRecord.adminKey
                               , userRecord.rootKey,  userRecord.latest,     userRecord.created
                               , userRecord.updated,  userRecord.profile,    userRecord.identity
                               , userRecord.capa )
    
    if(!userRecord)
        return EB.onError('That is not an acceptable user record', userRecord)
    
    EB.Users.cache(userRecord)
    
    return userRecord
}


EB.Users.getCachedUserRecord = function(username) {
    if(EB.Users.makeVersioned(username) == username)    // username is versioned
        return EB.Users.records[username]
    
    return EB.Users.findFreshest(username)              // username isn't versioned
}


/**
 * Checks the cache, and always returns a promise
 * @param {string} username
 * @param {int} capa is the version of the username keys
 * @returns {object} Promise for a user record
 * Looks first in the cache, then grabs from the network
 */
EB.Users.getUserRecordPromise = function(username, capa) {
    //// This always checks the cache, and always returns a promise
    
    var versionedUsername = EB.Users.makeVersioned(username, capa)
    
    var userRecord = EB.Users.getCachedUserRecord(versionedUsername)
    
    if(userRecord)
        return Promise.resolve(userRecord)
    
    var userPromise = EB.Users.promises[versionedUsername]
    
    if(userPromise)
        return userPromise
    
    return EB.Users.getUserRecordNoCache(versionedUsername)
}


/**
 * Forces a request to the network, ignores cached
 * @param {string} username
 * @param {int} capa is the version of the username keys
 * @returns {object} Promise for a user record
 */
EB.Users.getUserRecordNoCache = function(username, capa) {
    //// This never checks the cache
    
    capa = capa || 0 // 0 signals EB.Net.getUserRecord to get the latest userRecord
    
    var prom = EB.Net.getUserRecord(username, capa) 
    
    prom = prom.then(
                function(userRecord) {
                    var userRecord = EB.Users.process(userRecord)
                    if(!userRecord)  EB.throwError('Invalid user record returned')
                    return userRecord
                }
                , EB.catchError('Unable to access user information from the DHT'))
    
    var versionedUsername = EB.Users.makeVersioned(username, capa)
    EB.Users.promises[versionedUsername] = prom
    
    return prom
}

EB.Users.doesUserExist = function(username) {
    return EB.Net.getUserRecord(username).then(
                function(userRecord) {
                    if(!userRecord || userRecord.FAIL) 
                        throw 'User does not exist'
                    return true
                }
                , EB.catchError('Unable to access user information from the DHT'))
}


//
// USERNAME HELPERS
//

EB.Users.userRecordToVersionedUsername = function(userRecord) {
    return EB.Users.makeVersioned(userRecord.username, userRecord.capa)
}

EB.Users.justUsername = function(versionedUsername) {
    var uc = EB.Users.breakVersionedUsername(versionedUsername)
    return uc.username
}

EB.Users.justCapa = function(versionedUsername) {
    var uc = EB.Users.breakVersionedUsername(versionedUsername)
    return uc.capa
}

EB.Users.makeVersioned = function(username, capa) {
    if(!username || !username.indexOf)
        return ''
    
    if(capa)
        return actuallyVersionThisUsernameOkay(username, capa)
    
    if(username.indexOf(':') > 0)
        return username
    
    return actuallyVersionThisUsernameOkay(username)
    
    function actuallyVersionThisUsernameOkay(username, capa) {
        capa = capa || 1 // NOTE: default capa
        return username + ':' + capa
    }
}

EB.Users.breakVersionedUsername = function(versionedUsername) {
    var list = (versionedUsername||'').split(':')

    return { username: list[0]
           , capa:     list[1] || 1 // NOTE: default capa
           }
}


//
// GENERAL HELPERS
//


EB.Users.build = function(username, defaultKey, adminKey, rootKey, latest, created, updated, profile, identity, capa) {
    //// returns a canonical user object: use this everywhere user objects are needed (DHT, identities, etc)

    latest   = latest   || ""                       // signature of the most recent puff published by the user
    updated  = updated  || ""                       // date of the most recent update to the username
    profile  = profile  || ""                       // profile puff signature
    identity = identity || ""                       // identity puff signature
    capa     = capa     || 1                        // version of the username
    
    // THINK: should we check for valid keys? valid timestamp for updated? what if you want a partially invalid user like anon?
    
    // THINK: split username and capa if it's a versionedUsername?

    if(!EB.Spec.validateUsername(username))
        return false                                // error is logged inside EB.Spec.validateUsername
    
    return {   username: username                   // unversioned username
           ,       capa: capa
           ,    rootKey: rootKey                    // public root key
           ,   adminKey: adminKey                   // public admin key
           , defaultKey: defaultKey                 // public default key
           ,    created: created                    // Date the record was created
           ,     latest: latest
           ,    updated: updated
           ,    profile: profile
           ,   identity: identity
           }
}


EB.Users.usernamesToUserRecordsPromise = function(usernames) {
    //// returns a promise of userRecords. thanks to capa we usually don't need the latest and can use cached versions.
    if(!usernames || !usernames.length)
        return Promise.resolve([])
    
    if(!Array.isArray(usernames))
        usernames = [usernames]
        
    var userRecords = usernames.map(EB.Users.getCachedUserRecord).filter(Boolean)
    
    if (userRecords.length == usernames.length)
        return Promise.resolve(userRecords) // got 'em all!
    
    var prom = Promise.resolve() // a promise we use to string everything along

    var userRecordUsernames = userRecords.map(function (userRecord) {
        return userRecord.username
    })
    
    usernames.forEach(function (username) {
        if (!~userRecordUsernames.indexOf(username)) { // we need this one
            prom = prom.then(function() {
                return EB.Users.getUserRecordNoCache(username).then(function (userRecord) {
                    userRecords.push(userRecord)
                })
            })
        }
    })
    
    return prom.then(function() { return userRecords }) // when it's all done, give back the userRecords
}

EB.Users.cache = function(userRecord) {
    //// This caches with no validation: use EB.Users.process instead
    
    var versionedUsername = EB.Users.userRecordToVersionedUsername(userRecord)
    
    EB.Users.records[versionedUsername] = userRecord
    
    delete EB.Users.promises[versionedUsername]
    
    EB.Persist.save('userRecords', EB.Users.records)
    
    return userRecord
}

EB.Users.depersist = function() {
    //// grab userRecords from local storage. this smashes the current userRecords in memory, so don't call it after init!
    EB.Users.records = EB.Persist.get('userRecords') || {}
}


EB.Users.findFreshest = function(username) {
    username = EB.Users.justUsername(username)
    
    var keys = Object.keys(EB.Users.records)
    var capa = 0
    
    keys.filter(function(versionedUsername) {
        return EB.Users.justUsername(versionedUsername) == username
    }).forEach( function(versionedUsername) {
        var this_capa = +EB.Users.justCapa(versionedUsername)
        if(this_capa > capa)
            capa = this_capa
    })
    
    var versionedUsername = EB.Users.makeVersioned(username, capa)
    return EB.Users.records[versionedUsername]
}


EB.Users.getIdentityPuff = function(userRecord, privateKey) {
    //// userRecord is the user's canonical user record
    //// privateKey is the user's private default key
    
    if(!userRecord || !userRecord.defaultKey || !userRecord.username)
        return EB.emptyPromise('Invalid user record')
    
    if(!userRecord.identity)
        return EB.emptyPromise('User record has no identity')
    
    puffprom = EB.Net.getPuffBySig(userRecord.identity)

    return puffprom.then(function(puffs) {
        var envelope = puffs[0]
        if(!envelope || !envelope.sig)
            return EB.throwError('Invalid identity puff')
        
        var senderPublicKey = userRecord.defaultKey
        var recipientUsername = EB.Users.makeVersioned(userRecord.username, userRecord.capa)
        var recipientPrivateKey = privateKey

        return EB.Puff.promiseToDecryptForReals(envelope, senderPublicKey, recipientUsername, recipientPrivateKey)
    })        
}


/**
 * register a subuser
 * @param  {string} signingUsername username of existed user
 * @param  {string} privateAdminKey private admin key for existed user
 * @param  {string} newUsername     desired new subuser name
 * @param  {string} rootKey         public root key for the new subuser
 * @param  {string} adminKey        public admin key for the new subuser
 * @param  {string} defaultKey      public default key for the new subuser
 * @return {object}                user record for the newly created subuser
 */
EB.Users.registerSubuserForUser = function(signingUsername, privateAdminKey, newUsername, rootKey, adminKey, defaultKey) {
    var puff = EB.Puff.buildUserRegistration(signingUsername, privateAdminKey, newUsername, rootKey, adminKey, defaultKey)
    return EB.Net.updateUserRecord(puff)
}



//// ANONYMOUS USERS


/**
 * Add a new user and attach it to the current identity as an alias
 * This is by the most common use case, since most anon users are created to send/receive messages
 * @param {string} Optional private default key
 * @param {string} Optional private admin key
 * @param {string} Optional private root key
 * @returns {promise} Resolves to the user record or fails
 */
EB.Users.addAnonymousUser = function(privateDefaultKey, privateAdminKey, privateRootKey) {
    var currentUsername = EB.getCurrentUsername()
    return EB.Users.addAnonymousUserToIdentity(currentUsername, privateDefaultKey, privateAdminKey, privateRootKey)
}


/**
 * Add a new user and attach to an identity as an alias
 * @param {string} The username of the identity to which to attach
 * @param {string} Optional private default key
 * @param {string} Optional private admin key
 * @param {string} Optional private root key
 * @returns {promise} Resolves to the user record or fails
 */
EB.Users.addAnonymousUserToIdentity = function(username, privateDefaultKey, privateAdminKey, privateRootKey) {
    var callback = function(userRecord, privateDefaultKey, privateAdminKey, privateRootKey) {
        EB.addAlias(username, userRecord.username, null, privateRootKey, privateAdminKey, privateDefaultKey)
        return userRecord
    }
    
    return EB.Users.addAnonymousUserToDHT(callback, privateDefaultKey, privateAdminKey, privateRootKey)
}


/**
 * Register a new anonymous user
 * @param {string} This callback takes userRecord, privateDefaultKey, privateAdminKey, and privateRootKey as args
 * @param {string} Optional private default key
 * @param {string} Optional private admin key
 * @param {string} Optional private root key
 * @returns {promise} Resolves to the user record or fails
 */
EB.Users.addAnonymousUserToDHT = function(callback, privateDefaultKey, privateAdminKey, privateRootKey) {
    // get username
    var newUsername = 'anon.' + EB.Users.generateRandomUsername(12)
    
    // generate private keys
    privateDefaultKey = privateDefaultKey || EB.Crypto.generatePrivateKey()
    privateAdminKey   = privateAdminKey   || EB.Crypto.generatePrivateKey()
    privateRootKey    = privateRootKey    || EB.Crypto.generatePrivateKey()
    
    // generate public keys
    var defaultKey = EB.Crypto.privateToPublic(privateDefaultKey)
    var adminKey   = EB.Crypto.privateToPublic(privateAdminKey)
    var rootKey    = EB.Crypto.privateToPublic(privateRootKey)
    
    var puff = EB.Puff.buildUserRegistration('anon', EB.CONFIG.anonPrivateAdminKey, newUsername, rootKey, adminKey, defaultKey)
    
    // send DHT update puff
    return EB.Net.updateUserRecord(puff).then(function(userRecord) {
        if(callback)
            return callback(userRecord, privateDefaultKey, privateAdminKey, privateRootKey)
        return userRecord
    })
}


/**
 * Generate a random username
 * @param {number} length of username
 * @return {string}
 */
EB.Users.generateRandomUsername = function(size) {
    size = +size|0||0

    var generatedName = ''
    var alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for(var i=0; i<size; i++) {
        generatedName += EB.Crypto.getRandomItem(alphabet)
    }
    return generatedName
}



EB.Users.createAnonUserAndMakeCurrent = function() {
    // TODO: convert this to use EB.Users.addAnonymousUserToDHT
    
    var newUsername = 'anon.' + EB.Users.generateRandomUsername(12)
    var passphrase = EB.Crypto.generatePrivateKey().slice(-12)
    var prependedPassphrase = newUsername + passphrase
    var privateKey = EB.Crypto.passphraseToPrivateKeyWif(prependedPassphrase)
    var publicKey = EB.Crypto.privateToPublic(privateKey)

    // Build puff to register this user
    var puff = EB.Puff.buildUserRegistration('anon', EB.CONFIG.anonPrivateAdminKey, newUsername, publicKey, publicKey, publicKey)

    var prom = EB.Net.updateUserRecord(puff)

    // Works?
    return prom.then(function(userRecord) {
        // Switch to this user
        EB.addAlias(userRecord.username, userRecord.username, 1, privateKey, privateKey, privateKey, {passphrase: passphrase})

        EB.switchIdentityTo(userRecord.username)

        return userRecord
    })
}

/* 
     _  _  ____  ____  ____   __    ___  ____  ____ 
    ( \/ )(  __)/ ___)/ ___) / _\  / __)(  __)/ ___)
    / \/ \ ) _) \___ \\___ \/    \( (_ \ ) _) \___ \
    \_)(_/(____)(____/(____/\_/\_/ \___/(____)(____/  
  
  When included this module adds two passive enhancements:
  - all puffs receive a payload.time field containing the current time in milliseconds
  - any puff containing an array of signatures in the payload.parents field will have have those parents lifted in to the graph

*/

EB.M.Messages = {}

EB.M.Messages.init = function() {
    EB.addRelationshipHandler(EB.M.Messages.addFamilialEdges)              // manages parent-child relationships
    EB.addPayloadModifierHandler(EB.M.Messages.addTimestamp)               // add timestamp to all new puffs
}


EB.M.Messages.addTimestamp = function(payload) {
    payload = payload || {}
    payload.time = payload.time || Date.now()
    return payload
}


EB.M.Messages.addFamilialEdges = function(shells) {
    shells.forEach(EB.M.Messages.addFamilialEdgesForShell)
}

EB.M.Messages.addFamilialEdgesForShell = function(child) {
    var addParentEdges = EB.M.Messages.addFamilialEdgesForParent(child);
    (child.payload.parents||[]).forEach(addParentEdges);
}

EB.M.Messages.addFamilialEdgesForParent = function(child) {
    var existingParents = EB.Data.graph.v(child.sig).out('parent').property('shell').run().map(EB.prop('sig'))
    
    return function(parentSig) {
        if(~existingParents.indexOf(parentSig)) return false                       // done?
        EB.Data.addSigAsVertex(parentSig)                                          // idempotent
        EB.Data.graph.addEdge({_label: 'parent', _in: parentSig, _out: child.sig}) // not idempotent
        EB.Data.graph.addEdge({_label: 'child', _out: parentSig,  _in: child.sig})
    }
}





///////////////////////////////////////////////////////////////////////////////////







EB.M.Messages.flagPuff = function (sig) {
    // TODO: move this out of the Message module and rewrite it

    var payload = {};
    var routes = [];
    var type = 'flagPuff';
    var content = sig;
    var puff; // variable for leaking the signed puff out of the secure zone
    
    payload.time = Date.now();

    EB.useSecureInfo(function(identities, currentUsername, privateRootKey, privateAdminKey, privateDefaultKey) {    

        if(!currentUsername) {
            alert("You must first set your username before you can flag content");
            return false;
        }
        /*if(!currentUsername == EB.getPuffBySig(sig).username) {
            alert("You must set your identity to the author of the puff you want to flag");
        }*/
        if(!privateAdminKey) {
            alert("You must first set your private admin key before you can flag content");
            return false;
        }
    
        puff = EB.Puff.build(currentUsername, privateAdminKey, routes, type, content, payload);
    })

    var data = { type: 'flagPuff'
               , puff: puff
               };

    var prom = EB.Net.EBpost(EB.CONFIG.puffApi, data);
    
    prom = prom.then(function(result){
        // var storedShells = EB.Persist.get('shells');
        // var filteredShells = storedShells.filter(function(s){return s.sig != content && s.content != content});
        var flaggedSig = EB.Persist.get('flagged') || [];
        flaggedSig.push(content);

        // EB.Persist.save('shells', filteredShells);
        EB.Persist.save('flagged', flaggedSig);
        // reload?
        // document.location.reload();
        Events.pub('ui/flag', {});
        return result;
    })
    return prom;
}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

// DETRITUS TO BE DEALT WITH
    
   
// /**
//  * Filter puffs according to criteria
//  * @param  {string} query
//  * @param  {string} filters
//  * @param  {number} limit
//  * @return {array} An array of puffs
//  */
// EB.M.Forum.getPuffList = function(query, filters, limit) {
//     //// returns a list of puffs
//
//     // THINK: the graph can help us here, but only if we're more clever about forming relationships and using those in our filters.
//
//     limit = limit || Infinity
//     var offset = +query.offset||0
//
//     // var shells = EB.M.Forum.getShells(query, filters)
//     var shells = EB.Data.getAllMyShells()
//
//     var filtered_shells = shells.filter(EB.M.Forum.filterByFilters(Boron.extend({}, query, filters)))
//                                 .sort(EB.M.Forum.sortByPayload) // TODO: sort by query
//
//     var sliced_shells = filtered_shells.slice(offset, offset+limit)
//
//     var puffs = sliced_shells.map(EB.Data.getPuffFromShell)
//                              .filter(Boolean)
//
//     var have = sliced_shells.length
//     // var have = puffs.length
//     if(have >= limit)
//         return puffs  // as long as we have enough filtered shells the puffs will eventually fill in empty spots
//
//     EB.Data.fillSomeSlotsPlease(limit, have, query, filters)
//
//     return puffs;
// }
//

// /**
//  * Filter puffs by prop filters
//  * @param  {string} filters
//  * @return {boolean}
//  */
// EB.M.Forum.filterByFilters = function(filters) {
//
//     if(!filters) return function() {return true}
//
//     //// get a filtering function
//     return function(shell) {
//
//         // ROUTES
//         if (filters.routes && filters.routes.length > 0) {
//             var routeMatch = false;
//             for (var i = 0; i < filters.routes.length; i++) {
//                 if (shell.routes.indexOf(filters.routes[i]) > -1) routeMatch = true;
//             }
//             if (!routeMatch) return false;
//         }
//
//         // TAGS
//         if (filters.tags && filters.tags.length > 0) {
//             if (!shell.payload.tags || !shell.payload.tags.length) {
//                 return false;
//             }
//             var tagMatch = false;
//             for (var i = 0; i < filters.tags.length; i++) {
//                 if (shell.payload.tags.indexOf(filters.tags[i]) > -1) tagMatch = true;
//             }
//             if (!tagMatch) return false;
//         }
//
//         // TYPES
//         if (filters.types && filters.types.length > 0) {
//             if (!~filters.types.indexOf(shell.payload.type)) {
//                 // console.log(shell.type)
//                 return false
//             }
//         }
//
//         // USERS
//         if(filters.users && filters.users.length > 0)
//             if(!~filters.users.indexOf(EB.Users.justUsername(shell.username))) return false
//
//
//         if(filters.roots)
//             if((shell.payload.parents||[]).length) return false
//
//         if(filters.ancestors && filters.focus) {
//             var focus = EB.getPuffBySig(filters.focus) // TODO: find better way to do this
//             if(focus.payload && !~focus.payload.parents.indexOf(shell.sig)) return false
//         }
//
//         if(filters.descendants && filters.focus)
//             if(!~shell.payload.parents.indexOf(filters.focus)) return false
//
//         // TODO: deprecate this, as it's handled above:
//         if (filters.type && filters.type.length)
//             if (!~filters.type.indexOf(shell.payload.type)) return false
//
//         return true
//     }
// }


// /**
//  * Helper for sorting by payload.time
//  * @param  {Object} a
//  * @param  {object} b
//  * @return {number} based on desired sorting order
//  */
// EB.M.Forum.sortByPayload = function(a,b) {
//     //// helper for sorting by payload.time
//     if(puffworldprops.view.query.sort == 'DESC')
//         return b.payload.time - a.payload.time;
//     else
//         return a.payload.time - b.payload.time;
// }



// /**
//  * Get the current puff's parents
//  * @param  {Object} puff
//  * @param  {Object} props
//  * @return {number} The number of parents
//  */
// EB.M.Forum.getParentCount = function(puff, props) {
//     if(!puff) return 0
//
//     var sig = puff.sig || puff
//
//     return EB.Data.graph.v(sig).out('parent').run().length
// }


// /**
//  * Get a count of the current puff's children
//  * @param  {Object} puff
//  * @return {number} The number of children
//  */
// EB.M.Forum.getChildCount = function(puff) {
//     if(!puff) return 0
//
//     var sig = puff.sig || puff
//
//     return EB.Data.graph.v(sig).out('child').run().length
// }


// // Adding default metafields to included in a puff
// EB.M.Forum.metaFields = []
// EB.M.Forum.context = {};
// EB.M.Forum.addMetaFields = function(fieldInfo, context, excludeContext) {
//     // NOTE: this isn't used outside of publishEmbed.js, but it might provide a good basis for generic/required metadata
//
//     if (!fieldInfo.name) return console.log('Invalid meta field name.');
//
//     // supported type: text, textarea, pulldown, array
//     if (!fieldInfo.type) return console.log('Invalid meta field type.');
//
//     if (!fieldInfo.validator || typeof fieldInfo.validator != 'function') {
//         fieldInfo.validator = false;
//     }
//
//     context = context || Object.keys(EB.Data.contentTypes);
//     if (typeof context == 'string') {
//         context = [context];
//     } else if (!Array.isArray(context)) {
//         return EB.onError('Invalid context.')
//     }
//
//     excludeContext = excludeContext || [];
//     if (typeof excludeContext == 'string') {
//         excludeContext = [excludeContext];
//     }else if (!Array.isArray(excludeContext)) {
//         return EB.onError('Invalid context.')
//     }
//
//     EB.M.Forum.metaFields.push(fieldInfo);
//     for (var i=0; i<context.length; i++) {
//         if (excludeContext.indexOf(context[i]) != -1)
//             continue;
//         var contextFields = EB.M.Forum.context[context[i]] || [];
//         contextFields.push(fieldInfo.name);
//         EB.M.Forum.context[context[i]] = contextFields;
//     }
// }
//
// EB.M.Forum.addMetaFields(
//     {name: 'reply privacy',
//      type: 'pulldown',
//      enum: ['', 'public', 'private', 'anonymous', 'invisible'],
//      defaultValue: ''});
//
// EB.M.Forum.addMetaFields(
//     {name: 'content license',
//      type: 'pulldown',
//      enum: ['', 'CreativeCommonsAttribution', 'GNUPublicLicense', 'Publicdomain', 'Rights-managed', 'Royalty-free'],
//      defaultValue: ''});
//
// EB.M.Forum.addMetaFields(
//     {name: 'tags',
//      type: 'array',
//      validator: function(v){return /^[a-z0-9]+$/i.test(v)}
//      },
//     false, 'profile');
//
// EB.M.Forum.addMetaFields(
//     {name: 'language',
//      type: 'text',
//      defaultValue: function(){return puffworldprops.view.language}});
//
// EB.M.Forum.addMetaFields(
//     {name: 'name',
//      type: 'text'},
//     'profile');


// /**
//  * Takes a string of content, create a puff and push it into the system
//  * @param {string} type
//  * @param {string} content
//  * @param {array} parents
//  * @param {Object} metadata
//  * @param {string[]} userRecordsForWhomToEncrypt
//  * @param {string[]} privateEnvelopeAlias
//  * @returns {promise}
//  */
// EB.M.Forum.addPost = function(type, content, parents, metadata, userRecordsForWhomToEncrypt, privateEnvelopeAlias) {
//     //// Given a string of content, create a puff and push it into the system
//
//     // ensure parents is an array
//     if(!parents) parents = []
//     if(!Array.isArray(parents)) parents = [parents]
//
//     // ensure parents contains only puff ids
//     if(parents.map(EB.getPuffBySig).filter(function(x) { return x != null }).length != parents.length)
//         return EB.emptyPromise('Those are not good parents')
//
//     // ensure parents are unique
//     parents = EB.uniquify(parents)
//
//     // find the routes using parents
//     var routes = parents.map(function(id) {
//         return EB.getPuffBySig(id).username
//     });
//     if (metadata.routes) {
//         routes = metadata.routes // THINK: this should probably merge with above instead of replacing it...
//         delete metadata['routes']
//     }
//
//     // ensure all routes are unique
//     routes = EB.uniquify(routes)
//
//     var takeUserMakePuff = EB.M.Forum.partiallyApplyPuffMaker(type, content, parents, metadata, routes, userRecordsForWhomToEncrypt, privateEnvelopeAlias)
//
//     // get a user promise
//     var userprom = EB.Users.getUpToDateUserAtAnyCost()
//
//     var prom = userprom.catch(EB.catchError('Failed to add post: could not access or create a valid user'))
//                        .then(takeUserMakePuff)
//                        .catch(EB.catchError('Posting failed'))
//
//     return prom
//
//     // NOTE: any puff that has 'time' and 'parents' fields fulfills the forum interface
//     // TODO: make an official interface fulfillment thing
// }
//
//
// /**
//  * Make a puff... except the parts that require a user
//  * @param {string} type
//  * @param {string} content
//  * @param {array} parents
//  * @param {object} metadata
//  * @param {array} routes
//  * @param {array} userRecordsForWhomToEncrypt
//  * @param {array} privateEnvelopeAlias
//  * @returns {Function}
//  */
// EB.M.Forum.partiallyApplyPuffMaker = function(type, content, parents, metadata, routes, userRecordsForWhomToEncrypt, privateEnvelopeAlias) {
//     //// Make a puff... except the parts that require a user
//
//     // THINK: if you use the same metadata object for multiple puffs your cached version of the older puffs will get messed up
//
//     var payload = metadata || {}                            // metadata becomes the basis of payload
//     payload.parents = payload.parents || parents            // ids of the parent puffs
//     payload.time = metadata.time || Date.now()              // time is always a unix timestamp
//     payload.tags = metadata.tags || []                      // an array of tags // TODO: make these work
//
//     var type  = type || 'text'
//     var routes = routes ? routes : [];
//     routes = routes.concat(EB.CONFIG.zone);
//
//     return function(userRecord) {
//         // userRecord is always an up-to-date record from the DHT, so we can use its 'latest' value here
//
//         var previous = userRecord.latest
//         var puff = EB.Puff.simpleBuild(type, content, payload, routes, userRecordsForWhomToEncrypt, privateEnvelopeAlias)
//
//         return EB.Data.addPuffToSystem(puff) // THINK: this fails silently if the sig exists already
//     }
// }

/* 
                   _____  _____                          .___            ___.           
    ______  __ ___/ ____\/ ____\_  _  _______ _______  __| _/______  ____\_ |__   ____  
    \____ \|  |  \   __\\   __\\ \/ \/ /\__  \\_  __ \/ __ |\_  __ \/  _ \| __ \_/ __ \ 
    |  |_> >  |  /|  |   |  |   \     /  / __ \|  | \/ /_/ | |  | \(  <_> ) \_\ \  ___/ 
    |   __/|____/ |__|   |__|    \/\_/  (____  /__|  \____ | |__|   \____/|___  /\___  >
    |__|                                     \/           \/                  \/     \/ 
  
  An EveryBit module for managing identities and private data locally.
  ==================================================

  The Wardrobe manages identities, aliases, and private data.

  An identity is a username and a list of all known aliases. The identity also lists the last known primary alias, if there is one, and the identity's private preferences. 

  An alias is a username, a 'capa', and a set of private keys. Additional private information (like a passphrase) may be stored in the alias's 'secrets' field.

  Aliases generally correspond either to previous versions of the identity's username (previous primaries), or to anonymous usernames created for one-time encrypted transfer. 

  Username and capa define a unique alias. The capa field references a specific moment in the username's lifecycle, and correlates to the userRecord with the same username and capa whose public keys match the alias's private keys. In other words, capa == version.

  Currently capa counts by consecutive integers. This may change in the future. Any set deriving Eq and Ord will work.

  An identity file can be exported to the local filesystem and imported back in to the system.

  Private data is a black box for 

  Usage examples:
      EB.switchIdentityTo(username)

*/

/*
  THINK:
    - register callback handlers for user record creation and modification
    - EB.M.Wardrobe.init registers those with EB.onUserCreation and EB.onUserModification
    - identity file encryption using a passphrase
*/


EB.M.Wardrobe = {}

~function() { // begin the closure

    var identities = {}
    var aliases = {}
    // {asdf: { username: 'asdf', primary: asdf-12, aliases: [asdf-11, asdf-10], preferences: {} } }

    // an alias: { username: 'asdf', capa: 12, privateRootKey: '123', privateAdminKey: '333', privateDefaultKey: '444', secrets: {} }

    var currentUsername = false


    // TODO: integrate capa with userRecords and puffs everywhere
    // TODO: use capa returned from server on update passphrase
    // TODO: get anon creation working


    EB.M.Wardrobe.init = init
    
    function init() {
        EB.implementSecureInterface(useSecureInfo, addIdentity, addAlias, setPrimaryAlias, setPreference, switchIdentityTo, removeIdentity)
        
        EB.addIdentityUpdateHandler(function() { // THINK: where should this live?
            if(!EB.CONFIG.disableCloudIdentity)
                EB.storeIdentityFileInCloud()
        })
        
        // TODO: find a better way to do this
        var oldConfigValue = EB.CONFIG.disableCloudIdentity
        EB.CONFIG.disableCloudIdentity = true
        
        var storedIdentities = EB.Persist.get('identities') || {}
    
        Object.keys(storedIdentities).forEach(function(username) {
            var identity = storedIdentities[username]
            addIdentity(username, identity.aliases, identity.preferences, true)
        })
        
        EB.CONFIG.disableCloudIdentity = oldConfigValue
        
        var lastUsername = EB.Persist.get('currentUsername')
        
        if (lastUsername)
            EB.switchIdentityTo(lastUsername) // NOTE: call wrapped version to get handlers
    }
    
    
    //// exported via implementSecureInterface

    var useSecureInfo = function(callback) {
        var identity = getCurrentIdentity() || {}
        var primary = identity.primary || {}

        // we have to return all the identities because the user might be trying to list them
        callback(identities, currentUsername, primary.privateRootKey, primary.privateAdminKey, primary.privateDefaultKey)
        
        return true
    }

    var addIdentity = function(username, aliases, preferences, nosave) { // TODO: check if nosave is needed
        // TODO: validation on all available values
        // TODO: check for existing identity
        // TODO: add any unknown aliases
        // THINK: what about aliases that belong to other identities?
        // THINK: ensure primary alias exists?
        // TODO: remove primary (use username+maxcapa instead)

        var identity = { username: username
                       , primary: {}
                       , aliases: []
                       , preferences: preferences || {}
                       }

        identities[username] = identity
        
        if(!Array.isArray(aliases))
            aliases = aliases ? [aliases] : []
        
        aliases.forEach(
            function(alias) {
                addAlias(username, alias.username, alias.capa, alias.privateRootKey, alias.privateAdminKey, alias.privateDefaultKey, alias.secrets)})
        
        // TODO: handle prefs
        
        if(!nosave) // TODO: change processUpdates so it only saves if we're not busy opening all identities? or just let the 100ms throttle handle it...
            processUpdates()
            
        return true
    }

    var addAlias = function(identityUsername, aliasUsername, capa, privateRootKey, privateAdminKey, privateDefaultKey, secrets) {
        // TODO: validation on all available values
        // TODO: check for existing username/capa
        // THINK: hit network for confirmation?
        // THINK: maybe only include viable values?

        var alias = { username: aliasUsername
                    , capa: capa || 1 // NOTE: default capa
                    , privateRootKey: privateRootKey || false
                    , privateAdminKey: privateAdminKey || false
                    , privateDefaultKey: privateDefaultKey || false
                    , secrets: secrets || {}
                    }

        var identity = getIdentity(identityUsername)
        
        if(!identity) {
            addIdentity(identityUsername)                   // creates an empty identity
            identity = getIdentity(identityUsername)
        }
        
        // merge alias
        var old_alias = getOldAlias(identity, alias)
        if(old_alias) {
            alias.secrets = Boron.extend(old_alias.secrets, alias.secrets)
            for(var key in alias) 
                if(alias[key])
                    old_alias[key] = alias[key]
        } else {
            identity.aliases.push(alias)
        }
        
        if(aliasUsername == identityUsername && alias.capa >= (identity.capa||0)) {
            identity.primary = alias                        // set primary for identity (which may have been empty)
        }
        
        aliases[aliasUsername] = identity                   // add this to the alias-identity mapping

        processUpdates()

        return true
    }

    var setPrimaryAlias = function(identityUsername, aliasUsername) {
        var identity = getIdentity(identityUsername)
        
        if(!identity)
            return EB.onError('Primary alias can only be set for known identities')
            
        var alias = getLatestAlias(identity, aliasUsername)
        
        if(!alias)
            return EB.onError('That alias is not associated with that identity')
    
        // all clear!
        
        identity.username = aliasUsername
        identity.primary = alias

        delete identities[identityUsername]
        identities[aliasUsername] = identity
        
        if(identityUsername == currentUsername)
            switchIdentityTo(aliasUsername)
        
        return true
    }
     
    var setPreference = function(key, value) {
        // NOTE: this only works for the current identity
        var identity = getCurrentIdentity()
    
        if(!identity)
            return EB.onError('Preferences can only be set for an active identity')
    
        identity.preferences[key] = value

        processUpdates()
    }
    
    var switchIdentityTo = function(username) {
        if(username) {
            var identity = getIdentity(username)

            if(!identity)
                return EB.onError('No identity found with username "' + username + '"')
        }
        
        currentUsername = username || false

        if(!EB.currentIdentityHash) // THINK: what are the cases?
            EB.currentIdentityHash = EB.Crypto.createMessageHash(JSON.stringify(EB.formatIdentityFile()))
        
        processUpdates()
        
        if(username && identity && identity.primary)
            EB.Users.getUserRecordPromise(username, identity.primary.capa) // fetch our userRecord 

        return true
    }
    
    var removeIdentity = function(username) {
        var identity = getIdentity(username)

        if(!identity)
            return EB.onError('Could not find that identity for removal')

        delete identities[username]

        if(currentUsername == username)
            currentUsername = false

        processUpdates()
    }

    ////
    //// internal helper functions. not exported.
    ////

    function getLatestAlias(identity, aliasUsername) {
        var maxcapa = 0
        var alias = false
        
        for(var i=0, l=identity.aliases.length; i<l; i++) {
            var test = identity.aliases[i]
            if(test.username == aliasUsername && test.capa > maxcapa) {
                alias = test
                maxcapa = test.capa
            }
        }
        
        return alias
    }

    function getOldAlias(identity, alias) {
        for(var i=0, l=identity.aliases.length; i<l; i++) {
            var test = identity.aliases[i]
            if(alias.username == test.username && alias.capa == test.capa)
                return test
        }
    }

    function validatePrivateKeys(username, capa, privateRootKey, privateAdminKey, privateDefaultKey) {
        // CURRENTLY UNUSED
        //// Ensure keys match the userRecord
    
        var prom = EB.Users.getUserRecordPromise(username, capa)
    
        return prom
            .then(function(userRecord) {
                // validate any provided private keys against the userRecord's public keys
                if(   privateRootKey && EB.Crypto.privateToPublic(privateRootKey) != userRecord.rootKey)
                    EB.throwError('That private root key does not match the public root key on record')
                if(  privateAdminKey && EB.Crypto.privateToPublic(privateAdminKey) != userRecord.adminKey)
                    EB.throwError('That private admin key does not match the public admin key on record')
                if(privateDefaultKey && EB.Crypto.privateToPublic(privateDefaultKey) != userRecord.defaultKey)
                    EB.throwError('That private default key does not match the public default key on record')
        
                return userRecord
            }
            , EB.catchError('Could not store private keys due to faulty user record'))
    }

    function processUpdates() {
        if(!EB.CONFIG.ephemeralKeychain)
            EB.Persist.save('identities', identities)

        // THINK: consider zipping identities in localStorage to prevent shoulder-surfing and save space (same for puffs)
        // THINK: consider passphrase protecting identities and private puffs in localStorage
        // TODO: don't persist primary -- regenerate it at load time, so we don't duplicate the alias
        EB.Persist.save('currentUsername', currentUsername)

        EB.runHandlers('identityUpdate')
    }

    function getCurrentIdentity() {
        return getIdentity(currentUsername)
    }

    function getIdentity(username) {
        if(!username) 
            return false

        var identity = identities[username]

        // THINK: we could check the aliases map here in case the username isn't primary

        if(!identity) 
            return false

        return identity
    }

}() // end the closure
EB.Data.addContentType('bbcode', {
    toHtml: function(content) {
        var bbcodeParse = XBBCODE.process({ text: content });
        var parsedText  = bbcodeParse.html.replace(/\n/g, '<br />'); 
        return parsedText;
    }
})

EB.Data.addContentType('file', {
    toHtml: function(content, puff) {
        return puff.payload.filename
    }
})

EB.Data.addContentType('identity', {
    toHtml: function() {
        return ''
    }
})

EB.Data.addContentType('image', {
    toHtml: function(content) {
        if(puffworldprops.view.mode == "tableView")
            return '<img src=' + content + ' />';
        else
            return '<img class="imgInBox" src=' + content + ' />';
    }
})

// TODO: Add support for LaTex
/*EB.Data.addContentType('LaTex', {
    toHtml: function(content) {
        var safe_content = XBBCODE.process({ text: content }) 
        return '<p>' + safe_content.html + '</p>'
    }
}) */

EB.Data.addContentType('markdown', {
    toHtml: function(content) {
        var converter = new Markdown.Converter();
        return '<span>'+converter.makeHtml(content)+'</span>';
    }
})

// Used to display chess boards
EB.Data.addContentType('PGN', {
    toHtml: function(content) {
        return chessBoard(content);
    }
})

EB.Data.addContentType('profile', {
    toHtml: function(content, puff) {
        if(puffworldprops.view.mode == "tableView")
            return '<img src=' + content + ' />';
        else
            return '<img class="imgInBox" src=' + content + ' />';
        /*var keysNotShow = ['content', 'type'];
        for (var key in puff.payload) {
            var value = puff.payload[key];
            if (keysNotShow.indexOf(key)==-1 && value && value.length) {
                toRet += '<div><span class="profileKey">' + key + ': </span><span class="profileValue">' + value + '</span></div>';
            }
        }*/
    }
})

EB.Data.addContentType('text', {
    toHtml: function(content) {
        var safe_content = XBBCODE.process({ text: content })   // not ideal, but it does seem to strip out raw html
        safe_content.html = safe_content.html.replace(/\n/g, '</br>');  // Set line breaks
        return '<span>' + safe_content.html + '</span>'
    }
})
