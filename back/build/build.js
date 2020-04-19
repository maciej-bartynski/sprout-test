"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var mongoose=require("mongoose"),mongoose__default=_interopDefault(mongoose),crypto=_interopDefault(require("crypto")),uuid=require("uuid"),jwt=_interopDefault(require("jsonwebtoken")),path$1=_interopDefault(require("path")),fs=_interopDefault(require("fs")),express=_interopDefault(require("express")),bodyParser=_interopDefault(require("body-parser")),cookieParser=_interopDefault(require("cookie-parser")),compression=_interopDefault(require("compression")),http=_interopDefault(require("http")),https=_interopDefault(require("https")),ws=require("ws");function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var runtime_1=createCommonjsModule(function(e){var t=function(i){var c,e=Object.prototype,l=e.hasOwnProperty,t="function"==typeof Symbol?Symbol:{},n=t.iterator||"@@iterator",r=t.asyncIterator||"@@asyncIterator",o=t.toStringTag||"@@toStringTag";function a(e,t,r,o){var s,i,a,c,n=t&&t.prototype instanceof y?t:y,u=Object.create(n.prototype),l=new k(o||[]);return u._invoke=(s=e,i=r,a=l,c=h,function(e,t){if(c===d)throw new Error("Generator is already running");if(c===g){if("throw"===e)throw t;return j()}for(a.method=e,a.arg=t;;){var r=a.delegate;if(r){var o=E(r,a);if(o){if(o===v)continue;return o}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(c===h)throw c=g,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);c=d;var n=p(s,i,a);if("normal"===n.type){if(c=a.done?g:f,n.arg===v)continue;return{value:n.arg,done:a.done}}"throw"===n.type&&(c=g,a.method="throw",a.arg=n.arg)}}),u}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}i.wrap=a;var h="suspendedStart",f="suspendedYield",d="executing",g="completed",v={};function y(){}function s(){}function u(){}var _={};_[n]=function(){return this};var m=Object.getPrototypeOf,b=m&&m(m(P([])));b&&b!==e&&l.call(b,n)&&(_=b);var w=u.prototype=y.prototype=Object.create(_);function S(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function O(c,u){var t;this._invoke=function(r,o){function e(){return new u(function(e,t){!function t(e,r,o,n){var s=p(c[e],c,r);if("throw"!==s.type){var i=s.arg,a=i.value;return a&&"object"==typeof a&&l.call(a,"__await")?u.resolve(a.__await).then(function(e){t("next",e,o,n)},function(e){t("throw",e,o,n)}):u.resolve(a).then(function(e){i.value=e,o(i)},function(e){return t("throw",e,o,n)})}n(s.arg)}(r,o,e,t)})}return t=t?t.then(e,e):e()}}function E(e,t){var r=e.iterator[t.method];if(r===c){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=c,E(e,t),"throw"===t.method))return v;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=p(r,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,v;var n=o.arg;return n?n.done?(t[e.resultName]=n.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=c),t.delegate=null,v):n:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v)}function T(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function x(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function k(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(T,this),this.reset(!0)}function P(t){if(t){var e=t[n];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(l.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=c,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:c,done:!0}}return s.prototype=w.constructor=u,u.constructor=s,u[o]=s.displayName="GeneratorFunction",i.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===s||"GeneratorFunction"===(t.displayName||t.name))},i.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,u):(e.__proto__=u,o in e||(e[o]="GeneratorFunction")),e.prototype=Object.create(w),e},i.awrap=function(e){return{__await:e}},S(O.prototype),O.prototype[r]=function(){return this},i.AsyncIterator=O,i.async=function(e,t,r,o,n){void 0===n&&(n=Promise);var s=new O(a(e,t,r,o),n);return i.isGeneratorFunction(t)?s:s.next().then(function(e){return e.done?e.value:s.next()})},S(w),w[o]="Generator",w[n]=function(){return this},w.toString=function(){return"[object Generator]"},i.keys=function(r){var o=[];for(var e in r)o.push(e);return o.reverse(),function e(){for(;o.length;){var t=o.pop();if(t in r)return e.value=t,e.done=!1,e}return e.done=!0,e}},i.values=P,k.prototype={constructor:k,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=c,this.done=!1,this.delegate=null,this.method="next",this.arg=c,this.tryEntries.forEach(x),!e)for(var t in this)"t"===t.charAt(0)&&l.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=c)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var o=this;function e(e,t){return s.type="throw",s.arg=r,o.next=e,t&&(o.method="next",o.arg=c),!!t}for(var t=this.tryEntries.length-1;0<=t;--t){var n=this.tryEntries[t],s=n.completion;if("root"===n.tryLoc)return e("end");if(n.tryLoc<=this.prev){var i=l.call(n,"catchLoc"),a=l.call(n,"finallyLoc");if(i&&a){if(this.prev<n.catchLoc)return e(n.catchLoc,!0);if(this.prev<n.finallyLoc)return e(n.finallyLoc)}else if(i){if(this.prev<n.catchLoc)return e(n.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<n.finallyLoc)return e(n.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;0<=r;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&l.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}}n&&("break"===e||"continue"===e)&&n.tryLoc<=t&&t<=n.finallyLoc&&(n=null);var s=n?n.completion:{};return s.type=e,s.arg=t,n?(this.method="next",this.next=n.finallyLoc,v):this.complete(s)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),x(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var o=r.completion;if("throw"===o.type){var n=o.arg;x(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:P(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=c),v}},i}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}}),regenerator=runtime_1;function asyncGeneratorStep(e,t,r,o,n,s,i){try{var a=e[s](i),c=a.value}catch(e){return void r(e)}a.done?t(c):Promise.resolve(c).then(o,n)}function _asyncToGenerator(a){return function(){var e=this,i=arguments;return new Promise(function(t,r){var o=a.apply(e,i);function n(e){asyncGeneratorStep(o,t,r,n,s,"next",e)}function s(e){asyncGeneratorStep(o,t,r,n,s,"throw",e)}n(void 0)})}}var asyncToGenerator=_asyncToGenerator;function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var defineProperty=_defineProperty,user=new mongoose.Schema({name:{type:String,trim:!0,required:!0,maxlength:32},email:{type:String,trim:!0,required:!0,unique:!0},hashed_password:{type:String,required:!0},about:{type:String,trim:!0,default:"Another broken soul."},salt:String},{timestamps:!0}),setPass=function(e){this._password=e,this.salt=uuid.v1(),this.hashed_password=this.encryptPassword(this._password)},getPass=function(){return this._password};user.virtual("password").set(setPass).get(getPass),user.methods={authenticate:function(e){return this.encryptPassword(e)===this.hashed_password},encryptPassword:function(e){if(!e)return null;try{return crypto.createHmac("sha1",this.salt).update(e).digest("hex")}catch(e){return null}}};var User={User:user},Schema=mongoose__default.Schema,test=new Schema({counter:{type:Number,default:0},staticId:{type:String,default:"some-test-string"}}),Test={Test:test};function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,o)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var schemas=_objectSpread({},User,{},Test),models={};for(var key in schemas)models[key]=mongoose.model(key,schemas[key]);var models$1=_objectSpread({},models),frame=function(e,t){for(var r=1<arguments.length&&void 0!==t?t:"cyan",o=e.length+4,n="",s="",i=0;i<o;i++)n+="#",s+=0===i||i===o-1?"#":" ";var a=["","   ".concat(n),"   ".concat(s),"   # ".concat(e," #"),"   ".concat(s),"   ".concat(n),""].join("\n")[r];console.log(a)},section=function(e,t,r){var o=2<arguments.length&&void 0!==r?r:"blue",n=t?": ".concat(t,"."):"",s="\n## ".concat(e.toUpperCase()).concat(n," ##")[o];console.log(s)},endsec=function(e,t,r){for(var o=0<arguments.length&&void 0!==e?e:"#",n=1<arguments.length&&void 0!==t?t:"#",s=2<arguments.length&&void 0!==r?r:"blue",i=n?": ".concat(n,"."):"",a="## ".concat(o.toUpperCase()).concat(i," ##"),c="",u=0;u<=a.length;u++)c+="#";console.log("".concat(c[s],"\n"))},info=function(e,t){var r=1<arguments.length&&void 0!==t?t:"white";console.log(e[r])},warn=function(e,t){var r=1<arguments.length&&void 0!==t?t:"yellow";console.log("".concat("[warn]"[r]," ").concat(e))},fail=function(e,t){var r=1<arguments.length&&void 0!==t?t:"red";console.log("".concat("[fail]"[r]," ").concat(e))},ok=function(e,t){var r=1<arguments.length&&void 0!==t?t:"green";console.log("".concat("[ok]"[r]," ").concat(e))},strong=function(e,t){for(var r=1<arguments.length&&void 0!==t?t:"magenta",o=e.length+4,n="",s=0;s<o;s++)n+="#";var i=["","   ".concat(n),"   # ".concat(e," #"),"   ".concat(n),""].join("\n")[r];console.log(i)},messages={frame:frame,section:section,endsec:endsec,info:info,warn:warn,fail:fail,ok:ok,strong:strong},disabledLog={};for(var key$1 in messages)disabledLog[key$1]=function(){};var log=process.env.DISABLE_LOGS?disabledLog:messages,constants=Object.freeze({authcookie:"sprout[t]"});function ownKeys$1(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,o)}return r}function _objectSpread$1(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys$1(Object(r),!0).forEach(function(e){defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys$1(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var authcookie=constants.authcookie,User$1=models$1.User,getUserData=function(e){var t=e.body,r=["email","password"],o={};return Object.keys(t).forEach(function(e){r.includes(e)&&(o[e]=t[e])}),o},handleError=function(e,t){var r={success:!1,msg:"User not found."};return e||log.fail("[routes/auth/signin] Error during signin. Callback run, but data not found."),e&&(log.fail("[routes/auth/signin] Error during signin. ".concat(e)),r.error=e),t.status(400).json(r)},handleSuccess=function(e,t){var r={_id:e._id,name:e.name,email:e.email,about:e.about},o=jwt.sign({_id:e._id},process.env.JWT_SECRET);return t.cookie(authcookie,o),t.status(200).json({success:!0,msg:"User signed in.",user:_objectSpread$1({},r)})},signin=function(e,r){var t=getUserData(e),o=t.email,n=t.password;User$1.findOne({email:o},function(e,t){return e?handleError(e,r):t&&t.authenticate(n)?handleSuccess(t,r):handleError(!1,r)})},authcookie$1=constants.authcookie,signout=function(e,t){return t.clearCookie(authcookie$1),t.status(200).json({success:!0,msg:"User signed out"})},User$2=models$1.User,getNewUserData=function(e){var t=e.body,r=["name","email","password","about"],o={};return Object.keys(t).forEach(function(e){r.includes(e)&&(o[e]=t[e])}),o},handleError$1=function(e,t){var r={success:!1,msg:"User not signed up."};return e||log.fail("[routes/auth/signup] Error during saving user. Callback run, but data not found."),e&&(log.fail("[routes/auth/signup] Error during saving user. ".concat(e)),r.error=e),t.status(400).json(r)},handleSuccess$1=function(e,t){return e.salt=void 0,e.hashed_password=void 0,t.status(200).json({success:!0,msg:"User signed up.",user:e})},signup=function(e,r){var t=getNewUserData(e);new User$2(t).save(function(e,t){return e?handleError$1(e,r):t?handleSuccess$1(t,r):handleError$1(!1,r)})},auth={signin:signin,signout:signout,signup:signup},path="/test",test$1=function(e,t){return t.status(200).json({success:!0,msg:"This is test route",data:"Receiving this is proof of successfully unmounted testing router"})},test$2={test:test$1,path:path},signup$1=auth.signup,signin$1=auth.signin,signout$1=auth.signout,test_controller=test$2.test,test_path=test$2.path,routes=function(e){"false"===process.env.IS_PRODUCTION&&e.get(test_path,test_controller),e.post("/api/signup",signup$1),e.post("/api/signin",signin$1),e.get("/api/signout",signout$1)},Test$1=models$1.Test,populate=function(){Test$1.findOne({staticId:"some-test-string"},function(e,t){e?console.log("MONGODB. Test model searching error."):t?console.log("MONGODB. Test populated. ".concat(t.counter)):new Test$1({counter:0}).save(function(e){e?console.log("MONGODB. Test model population error."):console.log("MONGODB. Test model populated.")})})},dbConfig=function(){mongoose__default.connect(process.env.DATABASE,{useNewUrlParser:!0,useUnifiedTopology:!0}).then(function(e){console.log("MONGODB. Database connected. ".concat(e)),populate()})};function Module(){}Module.prototype={setState:function(e){Object.assign(this.state,e)},setRequired:function(e){Object.assign(this.required,e)},setExpose:function(e){Object.assign(this.expose,e)}},Module.prototype.super=function(e){this.__name__=e,this.state={},this.required={},this.expose={},this.setState=this.setState.bind(this),this.setExpose=this.setExpose.bind(this),this.setRequired=this.setRequired.bind(this)},Module.prototype.binder=function(e){for(var t in e)"function"==typeof e[t]&&(e[t]=e[t].bind(e))},Module.prototype.__use=function(){for(var r=this.required,e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];t.forEach(function(t){Object.keys(r).forEach(function(e){"function"!=typeof r[e]&&(r[e]=t.get()[e])})})},Module.prototype.__requiredCheck=function(){var t=this.required;Object.keys(t).forEach(function(e){if("function"!=typeof t[e])throw new Error("Missing required module field: ".concat(e))})},Module.prototype.__finalLogger=function(){var t=[];Object.keys(this.get()).forEach(function(e){t.push(e)});var e="".concat(this.__name__,". Exposed fields: ").concat(t.join(", "),".");log.info(e)},Module.prototype.get=function(){function e(e){r[e]=function(){return t[e]}}var t=this.expose,r={};for(var o in t)e(o);return r},Module.prototype.logger=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"msg",r="".concat(this.__name__||"(ANONYMOUS)",". ").concat(e);"warn"===t&&log.warn(r),"fail"===t&&log.fail(r),"ok"===t&&log.ok(r),"msg"===t&&log.info(r),"spec"===t&&log.strong(r)},Module.prototype.create=asyncToGenerator(regenerator.mark(function e(){var t,r=arguments;return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=[this.__name__,"start"],log.section.apply(log,t),this.__use.apply(this,r),this.__requiredCheck(),e.next=6,this.__createModule();case 6:this.__finalLogger(),log.endsec.apply(log,t);case 8:case"end":return e.stop()}},e,this)}));var DetermineProtocol=function(e){this.super(e),this.__whenForceHttp=function(){this.setState({protocol:"http",cert:null,key:null}),this.logger("Protocol is forced to be set to http.","warn","info")},this.__whenCertificationFound=function(e,t){this.setState({protocol:"https",cert:e,key:t}),this.logger("Files considered as certification found. Protocol is set to https.","ok","info")},this.__whenCertificationNotFound=function(){this.setState({protocol:"http",cert:null,key:null,forceHttp:!0}),this.logger("Files considered as certification not found. Protocol is set to http.")},this.__setProtocol=function(){var e=this.state;if((0,this.setState)({cert:null,key:null,forceHttp:1<=e.attempts}),e.forceHttp)this.__whenForceHttp();else{var t,r=process.env,o=r.CERTIFICATE_FILE,n=r.PRIVATE_KEY_FILE,s=null;try{t=fs.readFileSync(path$1.join(__dirname,"../cert",n),"utf8"),s=fs.readFileSync(path$1.join(__dirname,"../cert",o),"utf8")}catch(e){this.logger("Cannot read certification files: ".concat(e),"warn","info")}t&&s?this.__whenCertificationFound(s,t):this.__whenCertificationNotFound()}},this.__setAttempts=function(){(0,this.setState)({attempts:this.state.attempts+1})},this.__setExposedValues=function(){var e=this.setExpose,t=this.state;e({protocol:t.protocol,cert:t.cert,key:t.key})},this.__createModule=function(){this.__setProtocol(),this.__setAttempts(),this.__setExposedValues()}};DetermineProtocol.prototype=Object.create(Module.prototype);var determineProtocol=new DetermineProtocol("[protocol]");determineProtocol.setState({protocol:"",cert:null,key:null,forceHttp:!1,attempts:0});var DeterminePort=function(e){this.super(e),this.__setPort=function(){var e=process.env.PORT||5e3;this.setState({port:e}),this.logger("Port determined: ".concat(this.state.port))},this.__setExposedValues=function(){var e=this.state;(0,this.setExpose)({port:e.port})},this.__createModule=function(){this.__setPort(),this.__setExposedValues()}};DeterminePort.prototype=Object.create(Module.prototype);var determinePort=new DeterminePort("[port]"),DetermineDomain=function(e){this.super(e),this.__setDomain=function(){var e=this.required,t=this.setState,r=this.state,o=process.env.DOMAIN,n="localhost:".concat(e.port());t({domain:o||n}),this.logger("Domain is set: ".concat(r.domain,"."))},this.__setExposedValues=function(){(0,this.setExpose)({domain:this.state.domain})},this.__createModule=function(){this.__setDomain(),this.__setExposedValues()}};DetermineDomain.prototype=Object.create(Module.prototype);var determineDomain=new DetermineDomain("[domain]");determineDomain.setState({domain:null}),determineDomain.setRequired({port:void 0}),determineDomain.setExpose({});var DetermineWebaddress=function(e){this.super(e),this.__createModule=function(){var e=this.required,t=this.setExpose,r="".concat(e.protocol(),"://").concat(e.domain());t({webaddress:r}),this.logger("Web address set to ".concat(r))}};DetermineWebaddress.prototype=Object.create(Module.prototype);var determineWebaddress=new DetermineWebaddress("[webaddress]");determineWebaddress.setRequired({domain:void 0,protocol:void 0});var ExpressApp=function(e){this.super(e),this.state={attempts:0},this.__setApp=function(){this.setState({app:express()}),this.logger("App is set.")},this.__setRouter=function(){this.setState({router:express.Router(),attempts:this.state.attempts+1}),this.__setExposedValues(),this.logger("Router is set.")},this.__useMiddlewares=function(){var e=this.state;e.app.use(bodyParser.json()),e.app.use(cookieParser()),e.app.use(compression()),this.logger("Middlewares used.")},this.__useRouting=function(){var o=this.state;o.app.use("/",function(e,t,r){o.router(e,t,r)}),this.logger('Routing is set for "/" path.')},this.__setExposedValues=function(){var e=this.setExpose,t=this.state;e({app:t.app,router:t.router,setRouterAgain:this.__setRouter.bind(this),attempts:t.attempts})},this.__createModule=function(){this.__setApp(),this.__setRouter(),this.__useMiddlewares(),this.__useRouting(),this.__setExposedValues()}};ExpressApp.prototype=Object.create(Module.prototype);var expressApp=new ExpressApp("[express-app]");function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}var arrayLikeToArray=_arrayLikeToArray;function _arrayWithoutHoles(e){if(Array.isArray(e))return arrayLikeToArray(e)}var arrayWithoutHoles=_arrayWithoutHoles;function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}var iterableToArray=_iterableToArray;function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?arrayLikeToArray(e,t):void 0}}var unsupportedIterableToArray=_unsupportedIterableToArray;function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var nonIterableSpread=_nonIterableSpread;function _toConsumableArray(e){return arrayWithoutHoles(e)||iterableToArray(e)||unsupportedIterableToArray(e)||nonIterableSpread()}var toConsumableArray=_toConsumableArray,NodeServer=function(e){this.super(e),this.required={app:void 0,port:void 0,protocol:void 0,key:void 0,cert:void 0},this.__createServerParams=function(){var e=this.required,t=this.setState,r=e.cert()&&e.key()?{cert:e.cert(),key:e.key()}:null,o=r?[r,e.app()]:[e.app()];t({useParams:o}),this.logger("Server params created to use. Params length: ".concat(o.length,"."))},this.__createServer=function(){var e,t=this.required,r=this.state,o=this.setState,n=t.protocol()?t.protocol():null;o({server:(e={http:http,https:https}[n]).createServer.apply(e,toConsumableArray(r.useParams)),usePackage:n}),this.logger('Server created with "'.concat(n,'" package.'))},this.__runServer=function(){var t=this,r=this.required,o=this.state;this.logger("Server run attempt.");var n=null;return new Promise(function(e){n=setTimeout(function(){t.logger("Failure: binding port timeout. This is unhandled scenario!","fail","info"),e(!1)},3e4),o.server.listen(r.port(),function(){clearTimeout(n),t.logger("Server is listening on port: ".concat(r.port(),"."),"ok","info"),e(!0)})})},this.__setExposedValues=function(){var e=this.state;(0,this.setExpose)({server:e.server,usePackage:e.usePackage})},this.__createModule=asyncToGenerator(regenerator.mark(function e(){return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.__createServerParams(),this.__createServer(),e.next=4,this.__runServer();case 4:this.__setExposedValues();case 5:case"end":return e.stop()}},e,this)}))};NodeServer.prototype=Object.create(Module.prototype);var nodeServer=new NodeServer("[node-server]"),TestServer=function(e){this.super(e),this.__sendTestRequest=function(){var o=this,e=this.state,t=this.required,n=t.usePackage,s=t.webaddress()+e.path;this.logger('Server test attempt on "'.concat(s,'" path.'));var i=null;return new Promise(function(r){i=setTimeout(function(){o.logger('Test at "'.concat(s,'" failed - connection timeout.'),"fail","info"),r(!1)},3e4);try{var t={http:http,https:https}[n()];t.get(s,function(e){o.logger('Incoming request (GET) to "'.concat(s,'".'));var t="";e.on("data",function(e){t+=e}),e.on("end",function(){clearTimeout(i),o.logger('Response from "'.concat(s,'" received: ').concat(t),"ok","info"),r(!0)})}).on("error",function(e){clearTimeout(i),t.close(),o.logger("Connection test failure. ".concat(e,"."),"fail","info"),r(!1)})}catch(e){clearTimeout(i),o.logger("Connection attemp failed: ".concat(e,"."),"fail","info"),r(!1)}})},this.__setTestRouting=function(){var e=this.required,t=this.setState,r=this.state,o=e.router;t({path:"/test"}),o().get(r.path,function(e,t){t.status(200).json({Message:"If you see this message, connection to server is good.",Success:!0})}),this.logger('Test router is set on path "'.concat(r.path,'". Test msg will be served.'))},this.__testServer=asyncToGenerator(regenerator.mark(function e(){var t,r;return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.__sendTestRequest();case 2:if(!(t=e.sent)){this.logger("Test failed. Server will be closed.","fail","info"),r=this.required.server;try{r().close(),this.logger("Server closed.")}catch(e){this.logger("Server closing failure: ".concat(e,"."),"fail","info")}}this.setExpose({serverTestSuccess:t}),this.logger("Test success: ".concat(this.expose.serverTestSuccess,"."),"ok","info");case 6:case"end":return e.stop()}},e,this)})),this.__createModule=asyncToGenerator(regenerator.mark(function e(){return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.__setTestRouting();case 2:return e.next=4,this.__testServer();case 4:case"end":return e.stop()}},e,this)}))};TestServer.prototype=Object.create(Module.prototype);var testServer=new TestServer("[test-server]");function createServerREST(){return _createServerREST.apply(this,arguments)}function _createServerREST(){return(_createServerREST=asyncToGenerator(regenerator.mark(function e(){return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e){function s(){return t.apply(this,arguments)}function t(){return(t=asyncToGenerator(regenerator.mark(function e(){var t,r,o,n=arguments;return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(2<=(t=0<n.length&&void 0!==n[0]?n[0]:0))return e.abrupt("return",!1);e.next=3;break;case 3:return log.strong("[server-rest] Server creation attempt: ".concat(t+1,".")),e.prev=4,e.next=7,determineProtocol.create();case 7:return e.next=9,determinePort.create();case 9:return e.next=11,determineDomain.create(determinePort);case 11:return e.next=13,determineWebaddress.create(determineDomain,determineProtocol);case 13:return e.next=15,expressApp.create();case 15:return e.next=17,nodeServer.create(determineProtocol,determinePort,expressApp);case 17:return e.next=19,testServer.create(nodeServer,expressApp,determineProtocol,determineWebaddress);case 19:e.next=25;break;case 21:return e.prev=21,e.t0=e.catch(4),log.fail("[server-rest] ".concat(e.t0,".")),e.abrupt("return",s(t+1));case 25:return r=testServer.get(),o=r.serverTestSuccess,expressApp.expose.setRouterAgain(),e.abrupt("return",o()?expressApp.get().router():s(t+1));case 28:case"end":return e.stop()}},e,null,[[4,21]])}))).apply(this,arguments)}e(s())}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}testServer.setRequired({server:void 0,router:void 0,webaddress:void 0,usePackage:void 0});var classCallCheck=_classCallCheck;function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}var createClass=_createClass,Schema$1=mongoose__default.Schema,test$3=new Schema$1({counter:{type:Number,default:0},staticId:{type:String,default:"some-test-string"}}),Test$2={Test:test$3},ServerWs=function(){function e(){classCallCheck(this,e),this.__PORT=process.env.SOCKET||8e3,this.__CONNECTIONS={},this.__setServer(),this.__configServer()}return createClass(e,[{key:"__manageCounter",value:function(r){var o=this;Test$2.findOne({staticId:"some-test-string"},function(e,t){e?console.log("MONGODB. Test model searching error."):t?(t.counter="add"===r?t.counter+1:"remove"===r?t.counter-1:t.counter,t.save(function(e,r){!e&&r||Object.keys(o.__CONNECTIONS).forEach(function(e){var t=o.__CONNECTIONS[e]||{};t.connection&&t.connection.send(JSON.stringify({counter:"Something went wrong on server side."}))}),Object.keys(o.__CONNECTIONS).forEach(function(e){var t=o.__CONNECTIONS[e]||{};t.connection&&t.connection.send(JSON.stringify(r))})})):new Test$2({counter:0}).save(function(e){e?console.log("MONGODB. Test model population error."):console.log("MONGODB. Test model populated.")})})}},{key:"__configServer",value:function(){var r=this;this.__SERVER.on("connection",function(e){var t={connection:e,id:(new Date).getTime()};r.__CONNECTIONS[t.id]=t,e.on("message",function(e){r.__manageCounter(e)}),e.on("close",function(){delete r.__CONNECTIONS[t.id]})})}},{key:"__setServer",value:function(){this.__SERVER=new ws.Server({port:this.__PORT}),console.log("WEBSOCKET. Server is listening on port ".concat(this.__PORT))}},{key:"getWsServer",get:function(){return this.__SERVER}},{key:"getWsConnections",get:function(){return this.__CONNECTIONS}}]),e}();function Application(){return _Application.apply(this,arguments)}function _Application(){return(_Application=asyncToGenerator(regenerator.mark(function e(){var t;return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,createServerREST();case 2:if(t=e.sent){e.next=7;break}throw new Error("APPLICATION. Failure: there is no router.");case 7:log.frame("Server REST available at: ".concat(determineWebaddress.get().webaddress()),"blue");case 8:return new ServerWs,routes(t),dbConfig(),e.abrupt("return",t);case 12:case"end":return e.stop()}},e)}))).apply(this,arguments)}module.exports=Application;
