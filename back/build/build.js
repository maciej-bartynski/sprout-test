'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mongoose = require('mongoose');
var mongoose__default = _interopDefault(mongoose);
var crypto = _interopDefault(require('crypto'));
var uuid = require('uuid');
var jwt = _interopDefault(require('jsonwebtoken'));
var expressJwt = _interopDefault(require('express-jwt'));
var dotenv = require('dotenv');
var path$1 = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));
var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var cookieParser = _interopDefault(require('cookie-parser'));
var compression = _interopDefault(require('compression'));
var http = _interopDefault(require('http'));
var https = _interopDefault(require('https'));
var ws = require('ws');
require('colors');

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var options = Object.freeze({
  timestamps: true
});

var creator = Object.freeze({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    trim: true,
    "default": 'Another broken soul.'
  },
  salt: String
});

var name = 'User';

var schema = new mongoose.Schema(creator, options);

var setPass = function setPass(password) {
  this._password = password;
  this.salt = uuid.v1();
  this.hashed_password = this.encryptPassword(this._password);
};

var getPass = function getPass() {
  return this._password;
};

schema.virtual('password').set(setPass).get(getPass);
schema.methods = {
  authenticate: function authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function encryptPassword(password) {
    if (!password) return null;

    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (e) {
      return null;
    }
  }
};
var User = defineProperty({}, name, schema); // const user = new Schema(
//     {
//         name: {
//             type: String,
//             trim: true,
//             required: true,
//             maxlength: 32
//         },
//         email: {
//             type: String,
//             trim: true,
//             required: true,
//             unique: true
//         },
//         hashed_password: {
//             type: String,
//             required: true
//         },
//         about: {
//             type: String,
//             trim: true,
//             default: 'Another broken soul.'
//         },
//         salt: String
//     },
//     {
//         timestamps: true
//     }
// );
// const setPass = function (password) {
//     this._password = password;
//     this.salt = uuidv1();
//     this.hashed_password = this.encryptPassword(this._password);
// };
// const getPass = function () {
//     return this._password;
// };
// user.virtual('password').set(setPass).get(getPass);
// user.methods = {
//     authenticate: function (plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },
//     encryptPassword: function (password) {
//         if (!password) return null;
//         try {
//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');
//         } catch (e) {
//             return null;
//         }
//     }
// };
// export default {
//     User: user
// };

var Schema = mongoose__default.Schema;

var test = new Schema({
  counter: {
    type: Number,
    "default": 0
  },
  staticId: {
    type: String,
    "default": 'some-test-string'
  }
});
var Test = {
  Test: test
};

var options$1 = Object.freeze({
  timestamps: true
});

var creator$1 = Object.freeze({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
    unique: true
  },
  description: {
    type: String,
    trim: true,
    required: false,
    maxlength: 1000
  }
});

var name$1 = 'Category';

var schema$1 = new mongoose.Schema(creator$1, options$1);
var Category = defineProperty({}, name$1, schema$1);

var options$2 = Object.freeze({
  timestamps: true
});

var name$2 = 'Tag';

var ObjectId = mongoose.Schema.ObjectId;
var creator$2 = Object.freeze({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
    unique: true
  },
  content: {
    type: String,
    trim: true,
    required: true,
    maxlength: 10000
  },
  category: {
    type: ObjectId,
    ref: name$1,
    required: true
  },
  author: {
    type: ObjectId,
    ref: name,
    required: true
  },
  tags: [{
    type: ObjectId,
    ref: name$2
  }]
});

var name$3 = 'Article';

var schema$2 = new mongoose.Schema(creator$2, options$2);
var Article = defineProperty({}, name$3, schema$2);

var options$3 = Object.freeze({
  timestamps: true
});

var creator$3 = Object.freeze({
  tag: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
    unique: true
  }
});

var schema$3 = new mongoose.Schema(creator$3, options$3);
var Tag = defineProperty({}, name$2, schema$3);

var options$4 = Object.freeze({
  timestamps: true
});

var ObjectId$1 = mongoose.Schema.ObjectId;
var creator$4 = Object.freeze({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
    unique: true
  },
  content: {
    type: String,
    trim: true,
    required: true,
    maxlength: 1000
  },
  article: {
    type: ObjectId$1,
    ref: name$3,
    required: true
  }
});

var name$4 = 'Comment';

var schema$4 = new mongoose.Schema(creator$4, options$4);
var Comment = defineProperty({}, name$4, schema$4);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var schemas = _objectSpread({}, User, {}, Test, {}, Category, {}, Article, {}, Comment, {}, Tag);

var models = {};

for (var key in schemas) {
  models[key] = mongoose.model(key, schemas[key]);
}

var models$1 = _objectSpread({}, models);

var frame = function frame(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cyan';
  var len = message.length + 4;
  var border = '';
  var space = '';

  for (var i = 0; i < len; i++) {
    border += '#';

    if (i === 0 || i === len - 1) {
      space += '#';
    } else {
      space += ' ';
    }
  }

  var toDisplay = ['', "   ".concat(border), "   ".concat(space), "   # ".concat(message, " #"), "   ".concat(space), "   ".concat(border), ''].join('\n')[color];
  console.log(toDisplay);
};

var section = function section(title, message) {
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'blue';
  var msg = message ? ": ".concat(message, ".") : '';
  var toDisplay = "\n## ".concat(title.toUpperCase()).concat(msg, " ##")[color];
  console.log(toDisplay);
};

var endsec = function endsec() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#';
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#';
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'blue';
  var msg = message ? ": ".concat(message, ".") : '';
  var startmsg = "## ".concat(title.toUpperCase()).concat(msg, " ##");
  var toDisplay = '';

  for (var i = 0; i <= startmsg.length; i++) {
    toDisplay += '#';
  }

  console.log("".concat(toDisplay[color], "\n"));
};

var info = function info(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'white';
  console.log(message[color]);
};

var warn = function warn(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yellow';
  console.log("".concat('[warn]'[color], " ").concat(message));
};

var fail = function fail(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'red';
  console.log("".concat('[fail]'[color], " ").concat(message));
};

var ok = function ok(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'green';
  console.log("".concat('[ok]'[color], " ").concat(message));
};

var strong = function strong(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'magenta';
  var len = message.length + 4;
  var border = '';

  for (var i = 0; i < len; i++) {
    border += '#';
  }

  var toDisplay = ['', "   ".concat(border), "   # ".concat(message, " #"), "   ".concat(border), ''].join('\n')[color];
  console.log(toDisplay);
};

var messages = {
  frame: frame,
  section: section,
  endsec: endsec,
  info: info,
  warn: warn,
  fail: fail,
  ok: ok,
  strong: strong
};

var disabledLog = {};

for (var key$1 in messages) {
  disabledLog[key$1] = function () {};
}

var log = process.env.IS_PRODUCTION === 'true' ? disabledLog : messages;

dotenv.config();
var constants = Object.freeze({
  authcookie: 'sprout[t]',
  decodedProperty: 'user_auth'
});
var checkRequestAuthcookie = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: constants.decodedProperty,
  getToken: function getToken(req) {
    var cookie = req.cookies && req.cookies[constants.authcookie] || null;
    return cookie;
  }
});
var isUserAuthorised = function isUserAuthorised(req, res, next) {
  var decodedUserId = req[constants.decodedProperty]._id;
  var UserModel = models$1[name];
  UserModel.findById(decodedUserId).exec(function (e, record) {
    if (e) log.fail("[routes/auth/util] ".concat(e));
    if (!record) log.fail("[routes/auth/util] Data not found.");
    if (record) req.cookieOwner = record;
    next();
  });
};

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function Found(data, required) {
  this.data = data;
  this.missing = [];
  this.success = true;
  this.required = toConsumableArray(required);
  this.errorMsg = null;
}

Found.prototype.checkFields = function () {
  var _this = this;

  this.required.forEach(function (name) {
    if (_this.data[name] !== undefined) return;
    _this.success = false;

    _this.missing.push(name);
  });
};

Found.prototype.setErrorMsg = function () {
  if (!this.success) this.errorMsg = "Missing fields: ".concat(this.missing.join(', '), ".");
};

Found.prototype.handleMissingData = function (res) {
  var self = this;
  return res.status(400).json({
    success: false,
    msg: self.errorMsg
  });
};

var resolveFields = function resolveFields(req, res, required, callback) {
  var found = new Found(req.body, required);
  found.checkFields();
  found.setErrorMsg();
  if (callback) return callback(found);
  if (!found.success) found.handleMissingData(res);else return found.data;
};

var responseWithRecordError = function responseWithRecordError(e, res) {
  var data = {
    success: false,
    msg: 'Record not received from db.'
  };
  if (!e) log.fail('[routes/util/responseWithError] Db callback run, but data not found.');

  if (e) {
    log.fail("[routes/util/responseWithError] ".concat(e));
    data.error = e;
  }

  return res.status(400).json(data);
};

var parseRequest = function parseRequest(req, res, fieldNames) {
  return {
    fields: resolveFields(req, res, fieldNames),
    findByFields: function findByFields(Model, params, callback) {
      var _this = this;

      var fields = {};

      if (this.fields) {
        params.forEach(function (param) {
          return fields[param] = _this.fields[param];
        });
        return Model.findOne(fields, function (e, record) {
          if (e || !record) return responseWithRecordError(e, res);
          callback(record);
        });
      }
    }
  };
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var authcookie = constants.authcookie;
var User$1 = models$1.User;

var responseWithUserSignedIn = function responseWithUserSignedIn(user, res) {
  var _id = user._id,
      name = user.name,
      email = user.email,
      about = user.about;
  var filteredUser = {
    _id: _id,
    name: name,
    email: email,
    about: about
  };
  var token = jwt.sign({
    _id: user._id
  }, process.env.JWT_SECRET);
  res.cookie(authcookie, token);
  return res.status(200).json({
    success: true,
    msg: 'User signed in.',
    user: _objectSpread$1({}, filteredUser)
  });
};

var responseWithMismatch = function responseWithMismatch(user, res) {
  return res.status(200).json({
    success: false,
    msg: 'Email and password missmatch.',
    data: user.email
  });
};

var signin = (function (req, res) {
  parseRequest(req, res, ['email', 'password']).findByFields(User$1, ['email'], function (user) {
    if (user.authenticate(req.body.password)) return responseWithUserSignedIn(user, res);else return responseWithMismatch(user, res);
  });
});

var authcookie$1 = constants.authcookie;
var signout = (function (_, res) {
  res.clearCookie(authcookie$1);
  return res.status(200).json({
    success: true,
    msg: 'User signed out'
  });
});

var parseRequest$1 = function parseRequest(req, res, fieldNames) {
  return {
    fields: resolveFields(req, res, fieldNames),
    createQuery: function createQuery(Creator) {
      if (this.fields) return new Creator(this.fields);else return {
        save: function save() {}
      };
    }
  };
};

var responseWithRecordSuccess = function responseWithRecordSuccess(receivdRecord, res) {
  return res.status(200).json({
    success: true,
    msg: 'Record received from db.',
    data: receivdRecord
  });
};

var responseWithRecord = function responseWithRecord(res) {
  return function (e, receivdRecord) {
    if (e) return responseWithRecordError(e, res);
    if (!receivdRecord) return responseWithRecordError(false, res);
    return responseWithRecordSuccess(receivdRecord, res);
  };
};

var User$2 = models$1.User;
var signup = (function (req, res) {
  parseRequest$1(req, res, ['name', 'email', 'password', 'about']).createQuery(User$2).save(function (e) {
    var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    user.salt = undefined;
    user.hashed_password = undefined;
    responseWithRecord(res)(e, user);
  });
});

var auth = {
  signin: signin,
  signout: signout,
  signup: signup,
  checkRequestAuthcookie: checkRequestAuthcookie,
  isUserAuthorised: isUserAuthorised
};

var path = '/test';

var test$1 = (function (_, res) {
  return res.status(200).json({
    success: true,
    msg: 'This is test route',
    data: 'Receiving this is proof of successfully unmounted testing router'
  });
});

var test$2 = {
  test: test$1,
  path: path
};

var Category$1 = models$1.Category;
var categoryCreate = (function (req, res) {
  parseRequest$1(req, res, ['name', 'description']).createQuery(Category$1).save(responseWithRecord(res));
});

var iterationCallback = function iterationCallback(self) {
  return function (name) {
    if (self.fields[name] !== undefined) self.record[name] = self.fields[name];
  };
};

var parseRequest$2 = function parseRequest(req, name, fieldNames) {
  return {
    fields: req.body,
    record: req[name],
    updateFields: function updateFields() {
      fieldNames.forEach(iterationCallback(this));
      return this.record;
    },
    responseIfNoRecord: function responseIfNoRecord(res) {
      return {
        save: responseWithRecord(res)
      };
    },
    updateRecord: function updateRecord(res) {
      if (this.record) return this.updateFields();else return this.responseIfNoRecord(res);
    }
  };
};

var categoryUpdate = (function (req, res) {
  parseRequest$2(req, name$1, ['name', 'description']).updateRecord(res).save(responseWithRecord(res));
});

var categoryRead = (function (req, res) {
  responseWithRecord(res)(null, req.Category);
});

var findAllRecords = function findAllRecords(modelName, res) {
  models$1[modelName].find().exec(responseWithRecord(res));
};

var categoryReadAll = (function (_, res) {
  findAllRecords(name$1, res);
});

var deleteRecordAndReturnDeleted = function deleteRecordAndReturnDeleted(name) {
  return function (req, res) {
    req[name].remove(responseWithRecord(res));
  };
};

var categoryDelete = deleteRecordAndReturnDeleted(name$1);

var getRecordByRouteParamId = function getRecordByRouteParamId(modelName) {
  return function (req, _, next, routeParam) {
    var Model = models$1[modelName];
    Model.findById(routeParam).exec(function (e, record) {
      if (e) log.fail("[routes/utils/getRecordByRouteParamId] ".concat(e));
      if (!record) log.fail("[routes/utils/getRecordByRouteParamId] Data not found.");
      if (record) req[modelName] = record;
      next();
    });
  };
};

var getCategory = getRecordByRouteParamId(name$1);

var category = {
  categoryCreate: categoryCreate,
  categoryDelete: categoryDelete,
  categoryRead: categoryRead,
  categoryReadAll: categoryReadAll,
  categoryUpdate: categoryUpdate,
  getCategory: getCategory
};

var Article$1 = models$1.Article;
var articleCreate = (function (req, res) {
  parseRequest$1(req, res, ['title', 'content', 'category', 'author']).createQuery(Article$1).save(responseWithRecord(res));
});

var articleUpdate = (function (req, res) {
  parseRequest$2(req, name$3, ['title', 'content', 'category', 'author', 'tags']).updateRecord(res).save(responseWithRecord(res));
});

var articleRead = (function (req, res) {
  responseWithRecord(res)(null, req.Article);
});

var articleDelete = deleteRecordAndReturnDeleted(name$3);

var getArticle = getRecordByRouteParamId(name$3);

var article = {
  articleCreate: articleCreate,
  articleDelete: articleDelete,
  articleRead: articleRead,
  articleUpdate: articleUpdate,
  getArticle: getArticle
};

var Tag$1 = models$1.Tag;
var tagCreate = (function (req, res) {
  parseRequest$1(req, res, ['tag']).createQuery(Tag$1).save(responseWithRecord(res));
});

var tagUpdate = (function (req, res) {
  parseRequest$2(req, name$2, ['tag']).updateRecord(res).save(responseWithRecord(res));
});

var tagRead = (function (req, res) {
  responseWithRecord(res)(null, req.Tag);
});

var tagDelete = deleteRecordAndReturnDeleted(name$2);

var getTag = getRecordByRouteParamId(name$2);

var tag = {
  tagCreate: tagCreate,
  tagDelete: tagDelete,
  tagRead: tagRead,
  tagUpdate: tagUpdate,
  getTag: getTag
};

var Article$2 = models$1.Article;
var commentCreate = (function (req, res) {
  parseRequest$1(req, res, ['title', 'content', 'article']).createQuery(Article$2).save(responseWithRecord(res));
});

var commentUpdate = (function (req, res) {
  parseRequest$2(req, name$4, ['title', 'content']).updateRecord(res).save(responseWithRecord(res));
});

var commentRead = (function (req, res) {
  responseWithRecord(res)(null, req.Comment);
});

var commentDelete = deleteRecordAndReturnDeleted(name$4);

var getComment = getRecordByRouteParamId(name$4);

var comment = {
  commentCreate: commentCreate,
  commentDelete: commentDelete,
  commentRead: commentRead,
  commentUpdate: commentUpdate,
  getComment: getComment
};

var userUpdate = (function (req, res) {
  var isAuthorized = req.cookieOwner._id = req.User._id;
  if (!isAuthorized) responseWithRecord(res)('User not authorized');else parseRequest$2(req, name, ['name', 'email', 'about']).updateRecord(res).save(responseWithRecord(res));
});

var userRead = (function (req, res) {
  responseWithRecord(res)(null, req.Category);
});

var userReadAll = (function (_, res) {
  findAllRecords(name$1, res);
});

var getUser = getRecordByRouteParamId(name);

var user = {
  userRead: userRead,
  userReadAll: userReadAll,
  userUpdate: userUpdate,
  getUser: getUser
};

var signup$1 = auth.signup,
    signin$1 = auth.signin,
    signout$1 = auth.signout,
    checkRequestAuthcookie$1 = auth.checkRequestAuthcookie,
    isUserAuthorised$1 = auth.isUserAuthorised;
var categoryCreate$1 = category.categoryCreate,
    categoryUpdate$1 = category.categoryUpdate,
    categoryRead$1 = category.categoryRead,
    categoryReadAll$1 = category.categoryReadAll,
    categoryDelete$1 = category.categoryDelete,
    getCategory$1 = category.getCategory;
var articleCreate$1 = article.articleCreate,
    articleUpdate$1 = article.articleUpdate,
    articleRead$1 = article.articleRead,
    articleDelete$1 = article.articleDelete,
    getArticle$1 = article.getArticle;
var tagCreate$1 = tag.tagCreate,
    tagUpdate$1 = tag.tagUpdate,
    tagRead$1 = tag.tagRead,
    tagDelete$1 = tag.tagDelete,
    getTag$1 = tag.getTag;
var commentCreate$1 = comment.commentCreate,
    commentUpdate$1 = comment.commentUpdate,
    commentRead$1 = comment.commentRead,
    commentDelete$1 = comment.commentDelete,
    getComment$1 = comment.getComment;
var userUpdate$1 = user.userUpdate,
    userRead$1 = user.userRead,
    userReadAll$1 = user.userReadAll,
    getUser$1 = user.getUser;
var test_controller = test$2.test,
    test_path = test$2.path;

var routes = function routes(router) {
  if (process.env.IS_PRODUCTION === 'false') router.get(test_path, test_controller);
  router.post('/api/signup', signup$1);
  router.post('/api/signin', signin$1);
  router.get('/api/signout', signout$1);
  router.get('/api/user/read/:userId', userRead$1);
  router.get('/api/user/read-all', userReadAll$1);
  router.put('/api/user/update/:userId', checkRequestAuthcookie$1, isUserAuthorised$1, userUpdate$1);
  router.param('userId', getUser$1);
  router.post('/api/category/create', checkRequestAuthcookie$1, categoryCreate$1);
  router.get('/api/category/read/:categoryId', categoryRead$1);
  router.get('/api/category/read-all', categoryReadAll$1);
  router.put('/api/category/update/:categoryId', checkRequestAuthcookie$1, categoryUpdate$1);
  router["delete"]('/api/category/delete/:categoryId', checkRequestAuthcookie$1, categoryDelete$1);
  router.param('categoryId', getCategory$1);
  router.post('/api/article/create', checkRequestAuthcookie$1, articleCreate$1);
  router.get('/api/article/read/:articleId', articleRead$1);
  router.put('/api/article/update/:articleId', checkRequestAuthcookie$1, articleUpdate$1);
  router["delete"]('/api/article/delete/:articleId', checkRequestAuthcookie$1, articleDelete$1);
  router.param('articleId', getArticle$1);
  router.post('/api/tag/create', checkRequestAuthcookie$1, tagCreate$1);
  router.get('/api/tag/read/:tagId', tagRead$1);
  router.put('/api/tag/update/:tagId', checkRequestAuthcookie$1, tagUpdate$1);
  router["delete"]('/api/tag/delete/:tagId', checkRequestAuthcookie$1, tagDelete$1);
  router.param('tagId', getTag$1);
  router.post('/api/comment/create', checkRequestAuthcookie$1, commentCreate$1);
  router.get('/api/comment/read/:commentId', commentRead$1);
  router.put('/api/comment/update/:commentId', checkRequestAuthcookie$1, commentUpdate$1);
  router["delete"]('/api/comment/delete/:commentId', checkRequestAuthcookie$1, commentDelete$1);
  router.param('commentId', getComment$1);
};

dotenv.config();
var database = (function () {
  var seedOptionalCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  mongoose__default.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function (data) {
    console.log("MONGODB. Database connected. ".concat(data));
    seedOptionalCallback();
  });
});

function Module() {}

Module.prototype = {
  setState: function setState(obj) {
    Object.assign(this.state, obj);
  },
  setRequired: function setRequired(obj) {
    Object.assign(this.required, obj);
  },
  setExpose: function setExpose(obj) {
    Object.assign(this.expose, obj);
  }
};

Module.prototype["super"] = function (name) {
  this.__name__ = name;
  this.state = {};
  this.required = {};
  this.expose = {};
  this.setState = this.setState.bind(this);
  this.setExpose = this.setExpose.bind(this);
  this.setRequired = this.setRequired.bind(this);
};

Module.prototype.binder = function (self) {
  for (var key in self) {
    if (typeof self[key] === 'function') {
      self[key] = self[key].bind(self);
    }
  }
};

Module.prototype.__use = function () {
  var required = this.required;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (arg) {
    Object.keys(required).forEach(function (requiredField) {
      if (typeof required[requiredField] === 'function') return;
      required[requiredField] = arg.get()[requiredField];
    });
  });
};

Module.prototype.__requiredCheck = function () {
  var required = this.required;
  Object.keys(required).forEach(function (requiredField) {
    if (typeof required[requiredField] !== 'function') throw new Error("Missing required module field: ".concat(requiredField));
  });
};

Module.prototype.__finalLogger = function () {
  var exposedFields = [];
  Object.keys(this.get()).forEach(function (field) {
    exposedFields.push(field);
  });
  var msg = "".concat(this.__name__, ". Exposed fields: ").concat(exposedFields.join(', '), ".");
  log.info(msg);
};

Module.prototype.get = function () {
  var expose = this.expose;
  var toReturn = {};

  var _loop = function _loop(key) {
    toReturn[key] = function () {
      return expose[key];
    };
  };

  for (var key in expose) {
    _loop(key);
  }

  return toReturn;
};

Module.prototype.logger = function (info) {
  var stat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'msg';
  var message = "".concat(this.__name__ || '(ANONYMOUS)', ". ").concat(info);
  if (stat === 'warn') log.warn(message);
  if (stat === 'fail') log.fail(message);
  if (stat === 'ok') log.ok(message);
  if (stat === 'msg') log.info(message);
  if (stat === 'spec') log.strong(message);
};

Module.prototype.create = /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
  var sectionMessage,
      _args = arguments;
  return regenerator.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sectionMessage = [this.__name__, 'start'];
          log.section.apply(log, sectionMessage);

          this.__use.apply(this, _args);

          this.__requiredCheck();

          _context.next = 6;
          return this.__createModule();

        case 6:
          this.__finalLogger();

          log.endsec.apply(log, sectionMessage);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));
 ///module.exports = Module;

var DetermineProtocol = function DetermineProtocol(name) {
  this["super"](name);

  this.__whenForceHttp = function () {
    this.setState({
      protocol: 'http',
      cert: null,
      key: null
    });
    this.logger('Protocol is forced to be set to http.', 'warn', 'info');
  };

  this.__whenCertificationFound = function (cert, key) {
    this.setState({
      protocol: 'https',
      cert: cert,
      key: key
    });
    this.logger('Files considered as certification found. Protocol is set to https.', 'ok', 'info');
  };

  this.__whenCertificationNotFound = function () {
    this.setState({
      protocol: 'http',
      cert: null,
      key: null,
      forceHttp: true
    });
    this.logger('Files considered as certification not found. Protocol is set to http.');
  };

  this.__setProtocol = function () {
    var state = this.state,
        setState = this.setState;
    setState({
      cert: null,
      key: null,
      forceHttp: state.attempts >= 1
    });

    if (state.forceHttp) {
      this.__whenForceHttp();

      return;
    }

    var _process$env = process.env,
        CERTIFICATE_FILE = _process$env.CERTIFICATE_FILE,
        PRIVATE_KEY_FILE = _process$env.PRIVATE_KEY_FILE;
    var key,
        cert = null;

    try {
      key = fs.readFileSync(path$1.join(__dirname, '../cert', PRIVATE_KEY_FILE), 'utf8');
      cert = fs.readFileSync(path$1.join(__dirname, '../cert', CERTIFICATE_FILE), 'utf8');
    } catch (e) {
      this.logger("Cannot read certification files: ".concat(e), 'warn', 'info');
    }

    if (key && cert) this.__whenCertificationFound(cert, key);else this.__whenCertificationNotFound();
  };

  this.__setAttempts = function () {
    var setState = this.setState,
        state = this.state;
    setState({
      attempts: state.attempts + 1
    });
  };

  this.__setExposedValues = function () {
    var setExpose = this.setExpose,
        state = this.state;
    setExpose({
      protocol: state.protocol,
      cert: state.cert,
      key: state.key
    });
  };

  this.__createModule = function () {
    this.__setProtocol();

    this.__setAttempts();

    this.__setExposedValues();
  };
};

DetermineProtocol.prototype = Object.create(Module.prototype);
var determineProtocol = new DetermineProtocol('[protocol]');
determineProtocol.setState({
  protocol: '',
  cert: null,
  key: null,
  forceHttp: false,
  attempts: 0
});

var DeterminePort = function DeterminePort(name) {
  this["super"](name);

  this.__setPort = function () {
    var PORT = process.env.PORT;
    var port = PORT || 5000;
    this.setState({
      port: port
    });
    this.logger("Port determined: ".concat(this.state.port));
  };

  this.__setExposedValues = function () {
    var state = this.state,
        setExpose = this.setExpose;
    setExpose({
      port: state.port
    });
  };

  this.__createModule = function () {
    this.__setPort();

    this.__setExposedValues();
  };
};

DeterminePort.prototype = Object.create(Module.prototype);
var determinePort = new DeterminePort('[port]');

var DetermineDomain = function DetermineDomain(name) {
  this["super"](name);

  this.__setDomain = function () {
    var required = this.required,
        setState = this.setState,
        state = this.state;
    var DOMAIN = process.env.DOMAIN;
    var localDomain = "localhost:".concat(required.port());
    var domain = DOMAIN ? DOMAIN : localDomain;
    setState({
      domain: domain
    });
    this.logger("Domain is set: ".concat(state.domain, "."));
  };

  this.__setExposedValues = function () {
    var setExpose = this.setExpose,
        state = this.state;
    setExpose({
      domain: state.domain
    });
  };

  this.__createModule = function () {
    this.__setDomain();

    this.__setExposedValues();
  };
};

DetermineDomain.prototype = Object.create(Module.prototype);
var determineDomain = new DetermineDomain('[domain]');
determineDomain.setState({
  domain: null
});
determineDomain.setRequired({
  port: undefined
});
determineDomain.setExpose({});

var DetermineWebaddress = function DetermineWebaddress(name) {
  this["super"](name);

  this.__createModule = function () {
    var required = this.required,
        setExpose = this.setExpose;
    var webaddress = "".concat(required.protocol(), "://").concat(required.domain());
    setExpose({
      webaddress: webaddress
    });
    this.logger("Web address set to ".concat(webaddress));
  };
};

DetermineWebaddress.prototype = Object.create(Module.prototype);
var determineWebaddress = new DetermineWebaddress('[webaddress]');
determineWebaddress.setRequired({
  domain: undefined,
  protocol: undefined
});

var ExpressApp = function ExpressApp(name) {
  this["super"](name);
  this.state = {
    attempts: 0
  };

  this.__setApp = function () {
    this.setState({
      app: express()
    });
    this.logger('App is set.');
  };

  this.__setRouter = function () {
    this.setState({
      router: express.Router(),
      attempts: this.state.attempts + 1
    });

    this.__setExposedValues();

    this.logger('Router is set.');
  };

  this.__useMiddlewares = function () {
    var state = this.state;
    state.app.use(bodyParser.json());
    state.app.use(cookieParser());
    state.app.use(compression());
    this.logger('Middlewares used.');
  };

  this.__useRouting = function () {
    var state = this.state;
    state.app.use('/', function (req, res, next) {
      state.router(req, res, next);
    });
    this.logger('Routing is set for "/" path.');
  };

  this.__setExposedValues = function () {
    var setExpose = this.setExpose,
        state = this.state;
    setExpose({
      app: state.app,
      router: state.router,
      setRouterAgain: this.__setRouter.bind(this),
      attempts: state.attempts
    });
  };

  this.__createModule = function () {
    this.__setApp();

    this.__setRouter();

    this.__useMiddlewares();

    this.__useRouting();

    this.__setExposedValues();
  };
};

ExpressApp.prototype = Object.create(Module.prototype);
var expressApp = new ExpressApp('[express-app]');

var NodeServer = function NodeServer(name) {
  this["super"](name);
  this.required = {
    app: undefined,
    port: undefined,
    protocol: undefined,
    key: undefined,
    cert: undefined
  };

  this.__createServerParams = function () {
    var required = this.required,
        setState = this.setState;
    var useCertification = required.cert() && required.key() ? {
      cert: required.cert(),
      key: required.key()
    } : null;
    var useParams = useCertification ? [useCertification, required.app()] : [required.app()];
    setState({
      useParams: useParams
    });
    this.logger("Server params created to use. Params length: ".concat(useParams.length, "."));
  };

  this.__createServer = function () {
    var _serverPackages$usePa;

    var required = this.required,
        state = this.state,
        setState = this.setState;
    var usePackage = required.protocol() ? required.protocol() : null;
    var serverPackages = {
      http: http,
      https: https
    };
    setState({
      server: (_serverPackages$usePa = serverPackages[usePackage]).createServer.apply(_serverPackages$usePa, toConsumableArray(state.useParams)),
      usePackage: usePackage
    });
    this.logger("Server created with \"".concat(usePackage, "\" package."));
  };

  this.__runServer = function () {
    var _this = this;

    var required = this.required,
        state = this.state;
    this.logger('Server run attempt.');
    var portingTimeout = null;
    return new Promise(function (res) {
      portingTimeout = setTimeout(function () {
        _this.logger('Failure: binding port timeout. This is unhandled scenario!', 'fail', 'info');

        res(false);
      }, 30000);
      state.server.listen(required.port(), function () {
        clearTimeout(portingTimeout);

        _this.logger("Server is listening on port: ".concat(required.port(), "."), 'ok', 'info');

        res(true);
      });
    });
  };

  this.__setExposedValues = function () {
    var state = this.state,
        setExpose = this.setExpose;
    setExpose({
      server: state.server,
      usePackage: state.usePackage
    });
  };

  this.__createModule = /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.__createServerParams();

            this.__createServer();

            _context.next = 4;
            return this.__runServer();

          case 4:
            this.__setExposedValues();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};

NodeServer.prototype = Object.create(Module.prototype);
var nodeServer = new NodeServer('[node-server]');

var TestServer = function TestServer(name) {
  this["super"](name);

  this.__sendTestRequest = function () {
    var _this = this;

    var state = this.state,
        required = this.required;
    var usePackage = required.usePackage;
    var testAddress = required.webaddress() + state.path;
    this.logger("Server test attempt on \"".concat(testAddress, "\" path."));
    var connectionTimeout = null;
    return new Promise(function (res) {
      connectionTimeout = setTimeout(function () {
        _this.logger("Test at \"".concat(testAddress, "\" failed - connection timeout."), 'fail', 'info');

        res(false);
      }, 30000);

      try {
        var serverPackages = {
          http: http,
          https: https
        };
        var _testServer = serverPackages[usePackage()];

        _testServer.get(testAddress, function (response) {
          _this.logger("Incoming request (GET) to \"".concat(testAddress, "\"."));

          var data = '';
          response.on('data', function (chunk) {
            data += chunk;
          });
          response.on('end', function () {
            clearTimeout(connectionTimeout);

            _this.logger("Response from \"".concat(testAddress, "\" received: ").concat(data), 'ok', 'info');

            res(true);
          });
        }).on('error', function (e) {
          clearTimeout(connectionTimeout);

          _testServer.close();

          _this.logger("Connection test failure. ".concat(e, "."), 'fail', 'info');

          res(false);
        });
      } catch (e) {
        clearTimeout(connectionTimeout);

        _this.logger("Connection attemp failed: ".concat(e, "."), 'fail', 'info');

        res(false);
      }
    });
  };

  this.__setTestRouting = function () {
    var required = this.required,
        setState = this.setState,
        state = this.state;
    var router = required.router;
    setState({
      path: '/test'
    });
    router().get(state.path, function (req, res) {
      res.status(200).json({
        Message: 'If you see this message, connection to server is good.',
        Success: true
      });
    });
    this.logger("Test router is set on path \"".concat(state.path, "\". Test msg will be served."));
  };

  this.__testServer = /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var success, server;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.__sendTestRequest();

          case 2:
            success = _context.sent;

            if (!success) {
              this.logger('Test failed. Server will be closed.', 'fail', 'info');
              server = this.required.server;

              try {
                server().close();
                this.logger('Server closed.');
              } catch (e) {
                this.logger("Server closing failure: ".concat(e, "."), 'fail', 'info');
              }
            }

            this.setExpose({
              serverTestSuccess: success
            });
            this.logger("Test success: ".concat(this.expose.serverTestSuccess, "."), 'ok', 'info');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  this.__createModule = /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.__setTestRouting();

          case 2:
            _context2.next = 4;
            return this.__testServer();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
};

TestServer.prototype = Object.create(Module.prototype);
var testServer = new TestServer('[test-server]');
testServer.setRequired({
  server: undefined,
  router: undefined,
  webaddress: undefined,
  usePackage: undefined
});

function createServerREST() {
  return _createServerREST.apply(this, arguments);
}

function _createServerREST() {
  _createServerREST = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolveRouter) {
              function recursivelyCreateAndTest() {
                return _recursivelyCreateAndTest.apply(this, arguments);
              }

              function _recursivelyCreateAndTest() {
                _recursivelyCreateAndTest = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
                  var attempts,
                      _testServer$get,
                      serverTestSuccess,
                      _args = arguments;

                  return regenerator.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          attempts = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;

                          if (!(attempts >= 2)) {
                            _context.next = 3;
                            break;
                          }

                          return _context.abrupt("return", false);

                        case 3:
                          log.strong("[server-rest] Server creation attempt: ".concat(attempts + 1, "."));
                          _context.prev = 4;
                          _context.next = 7;
                          return determineProtocol.create();

                        case 7:
                          _context.next = 9;
                          return determinePort.create();

                        case 9:
                          _context.next = 11;
                          return determineDomain.create(determinePort);

                        case 11:
                          _context.next = 13;
                          return determineWebaddress.create(determineDomain, determineProtocol);

                        case 13:
                          _context.next = 15;
                          return expressApp.create();

                        case 15:
                          _context.next = 17;
                          return nodeServer.create(determineProtocol, determinePort, expressApp);

                        case 17:
                          _context.next = 19;
                          return testServer.create(nodeServer, expressApp, determineProtocol, determineWebaddress);

                        case 19:
                          _context.next = 25;
                          break;

                        case 21:
                          _context.prev = 21;
                          _context.t0 = _context["catch"](4);
                          log.fail("[server-rest] ".concat(_context.t0, "."));
                          return _context.abrupt("return", recursivelyCreateAndTest(attempts + 1));

                        case 25:
                          _testServer$get = testServer.get(), serverTestSuccess = _testServer$get.serverTestSuccess;
                          expressApp.expose.setRouterAgain();
                          return _context.abrupt("return", serverTestSuccess() ? expressApp.get().router() : recursivelyCreateAndTest(attempts + 1));

                        case 28:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[4, 21]]);
                }));
                return _recursivelyCreateAndTest.apply(this, arguments);
              }

              resolveRouter(recursivelyCreateAndTest());
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createServerREST.apply(this, arguments);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var Schema$1 = mongoose__default.Schema;

var test$3 = new Schema$1({
  counter: {
    type: Number,
    "default": 0
  },
  staticId: {
    type: String,
    "default": 'some-test-string'
  }
});
var Test$1 = {
  Test: test$3
};

var ServerWs = /*#__PURE__*/function () {
  function ServerWs() {
    classCallCheck(this, ServerWs);

    this.__PORT = process.env.SOCKET || 8000;
    this.__CONNECTIONS = {};

    this.__setServer();

    this.__configServer();
  }

  createClass(ServerWs, [{
    key: "__manageCounter",
    value: function __manageCounter(counter) {
      var _this = this;

      Test$1.findOne({
        staticId: 'some-test-string'
      }, function (err, test) {
        if (err) {
          console.log('MONGODB. Test model searching error.');
          return;
        }

        if (!test) {
          var _test = new Test$1({
            counter: 0
          });

          _test.save(function (err) {
            if (err) {
              console.log('MONGODB. Test model population error.');
              return;
            }

            console.log('MONGODB. Test model populated.');
          });

          return;
        }

        test.counter = counter === 'add' ? test.counter + 1 : counter === 'remove' ? test.counter - 1 : test.counter;
        test.save(function (err, test) {
          if (err || !test) {
            Object.keys(_this.__CONNECTIONS).forEach(function (key) {
              var connectionObj = _this.__CONNECTIONS[key] || {};
              connectionObj.connection ? connectionObj.connection.send(JSON.stringify({
                counter: 'Something went wrong on server side.'
              })) : null;
            });
          }

          Object.keys(_this.__CONNECTIONS).forEach(function (key) {
            var connectionObj = _this.__CONNECTIONS[key] || {};
            connectionObj.connection ? connectionObj.connection.send(JSON.stringify(test)) : null;
          });
        });
      });
    }
  }, {
    key: "__configServer",
    value: function __configServer() {
      var _this2 = this;

      this.__SERVER.on('connection', function (connection) {
        var connectionObj = {
          connection: connection,
          id: new Date().getTime()
        };
        _this2.__CONNECTIONS[connectionObj.id] = connectionObj;
        connection.on('message', function (incoming) {
          _this2.__manageCounter(incoming);
        });
        connection.on('close', function () {
          delete _this2.__CONNECTIONS[connectionObj.id];
        });
      });
    }
  }, {
    key: "__setServer",
    value: function __setServer() {
      this.__SERVER = new ws.Server({
        port: this.__PORT
      });
      console.log("WEBSOCKET. Server is listening on port ".concat(this.__PORT));
    }
  }, {
    key: "getWsServer",
    get: function get() {
      return this.__SERVER;
    }
  }, {
    key: "getWsConnections",
    get: function get() {
      return this.__CONNECTIONS;
    }
  }]);

  return ServerWs;
}();

dotenv.config();

function Application() {
  return _Application.apply(this, arguments);
}

function _Application() {
  _Application = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var router;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createServerREST();

          case 2:
            router = _context.sent;

            if (router) {
              _context.next = 7;
              break;
            }

            throw new Error('APPLICATION. Failure: there is no router.');

          case 7:
            log.frame("Server REST available at: ".concat(determineWebaddress.get().webaddress()), 'blue');

          case 8:
            new ServerWs();
            routes(router);
            database();
            return _context.abrupt("return", router);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Application.apply(this, arguments);
}

module.exports = Application;
