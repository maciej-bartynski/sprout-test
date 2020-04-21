'use strict';

function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var mongoose = require('mongoose');
var mongoose__default = _interopDefault(mongoose);
var crypto = _interopDefault(require('crypto'));
var uuid = require('uuid');
var dotenv = require('dotenv');
require('colors');

function createCommonjsModule(fn, module) {
    return (
        (module = { exports: {} }), fn(module, module.exports), module.exports
    );
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
        var $Symbol = typeof Symbol === 'function' ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || '@@iterator';
        var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
        var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

        function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator =
                outerFn && outerFn.prototype instanceof Generator
                    ? outerFn
                    : Generator;
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
                return { type: 'normal', arg: fn.call(obj, arg) };
            } catch (err) {
                return { type: 'throw', arg: err };
            }
        }

        var GenStateSuspendedStart = 'suspendedStart';
        var GenStateSuspendedYield = 'suspendedYield';
        var GenStateExecuting = 'executing';
        var GenStateCompleted = 'completed';

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
        var NativeIteratorPrototype =
            getProto && getProto(getProto(values([])));
        if (
            NativeIteratorPrototype &&
            NativeIteratorPrototype !== Op &&
            hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
        ) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype;
        }

        var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
            IteratorPrototype
        ));
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunctionPrototype[
            toStringTagSymbol
        ] = GeneratorFunction.displayName = 'GeneratorFunction';

        // Helper for defining the .next, .throw, and .return methods of the
        // Iterator interface in terms of a single ._invoke method.
        function defineIteratorMethods(prototype) {
            ['next', 'throw', 'return'].forEach(function (method) {
                prototype[method] = function (arg) {
                    return this._invoke(method, arg);
                };
            });
        }

        exports.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === 'function' && genFun.constructor;
            return ctor
                ? ctor === GeneratorFunction ||
                      // For the native GeneratorFunction constructor, the best we can
                      // do is to check its .name property.
                      (ctor.displayName || ctor.name) === 'GeneratorFunction'
                : false;
        };

        exports.mark = function (genFun) {
            if (Object.setPrototypeOf) {
                Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
                genFun.__proto__ = GeneratorFunctionPrototype;
                if (!(toStringTagSymbol in genFun)) {
                    genFun[toStringTagSymbol] = 'GeneratorFunction';
                }
            }
            genFun.prototype = Object.create(Gp);
            return genFun;
        };

        // Within the body of any async function, `await x` is transformed to
        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
        // `hasOwn.call(value, "__await")` to determine if the yielded value is
        // meant to be awaited.
        exports.awrap = function (arg) {
            return { __await: arg };
        };

        function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
                var record = tryCatch(generator[method], generator, arg);
                if (record.type === 'throw') {
                    reject(record.arg);
                } else {
                    var result = record.arg;
                    var value = result.value;
                    if (
                        value &&
                        typeof value === 'object' &&
                        hasOwn.call(value, '__await')
                    ) {
                        return PromiseImpl.resolve(value.__await).then(
                            function (value) {
                                invoke('next', value, resolve, reject);
                            },
                            function (err) {
                                invoke('throw', err, resolve, reject);
                            }
                        );
                    }

                    return PromiseImpl.resolve(value).then(
                        function (unwrapped) {
                            // When a yielded Promise is resolved, its final value becomes
                            // the .value of the Promise<{value,done}> result for the
                            // current iteration.
                            result.value = unwrapped;
                            resolve(result);
                        },
                        function (error) {
                            // If a rejected Promise was yielded, throw the rejection back
                            // into the async generator function so it can be handled there.
                            return invoke('throw', error, resolve, reject);
                        }
                    );
                }
            }

            var previousPromise;

            function enqueue(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function (resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }

                return (previousPromise =
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
                    previousPromise
                        ? previousPromise.then(
                              callInvokeWithMethodAndArg,
                              // Avoid propagating failures to Promises returned by later
                              // invocations of the iterator.
                              callInvokeWithMethodAndArg
                          )
                        : callInvokeWithMethodAndArg());
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
        exports.async = function (
            innerFn,
            outerFn,
            self,
            tryLocsList,
            PromiseImpl
        ) {
            if (PromiseImpl === void 0) PromiseImpl = Promise;

            var iter = new AsyncIterator(
                wrap(innerFn, outerFn, self, tryLocsList),
                PromiseImpl
            );

            return exports.isGeneratorFunction(outerFn)
                ? iter // If outerFn is a generator, return the full iterator.
                : iter.next().then(function (result) {
                      return result.done ? result.value : iter.next();
                  });
        };

        function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;

            return function invoke(method, arg) {
                if (state === GenStateExecuting) {
                    throw new Error('Generator is already running');
                }

                if (state === GenStateCompleted) {
                    if (method === 'throw') {
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
                        var delegateResult = maybeInvokeDelegate(
                            delegate,
                            context
                        );
                        if (delegateResult) {
                            if (delegateResult === ContinueSentinel) continue;
                            return delegateResult;
                        }
                    }

                    if (context.method === 'next') {
                        // Setting context._sent for legacy support of Babel's
                        // function.sent implementation.
                        context.sent = context._sent = context.arg;
                    } else if (context.method === 'throw') {
                        if (state === GenStateSuspendedStart) {
                            state = GenStateCompleted;
                            throw context.arg;
                        }

                        context.dispatchException(context.arg);
                    } else if (context.method === 'return') {
                        context.abrupt('return', context.arg);
                    }

                    state = GenStateExecuting;

                    var record = tryCatch(innerFn, self, context);
                    if (record.type === 'normal') {
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
                    } else if (record.type === 'throw') {
                        state = GenStateCompleted;
                        // Dispatch the exception by looping back around to the
                        // context.dispatchException(context.arg) call above.
                        context.method = 'throw';
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

                if (context.method === 'throw') {
                    // Note: ["return"] must be used for ES3 parsing compatibility.
                    if (delegate.iterator['return']) {
                        // If the delegate iterator has a return method, give it a
                        // chance to clean up.
                        context.method = 'return';
                        context.arg = undefined$1;
                        maybeInvokeDelegate(delegate, context);

                        if (context.method === 'throw') {
                            // If maybeInvokeDelegate(context) changed context.method from
                            // "return" to "throw", let that override the TypeError below.
                            return ContinueSentinel;
                        }
                    }

                    context.method = 'throw';
                    context.arg = new TypeError(
                        "The iterator does not provide a 'throw' method"
                    );
                }

                return ContinueSentinel;
            }

            var record = tryCatch(method, delegate.iterator, context.arg);

            if (record.type === 'throw') {
                context.method = 'throw';
                context.arg = record.arg;
                context.delegate = null;
                return ContinueSentinel;
            }

            var info = record.arg;

            if (!info) {
                context.method = 'throw';
                context.arg = new TypeError('iterator result is not an object');
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
                if (context.method !== 'return') {
                    context.method = 'next';
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

        Gp[toStringTagSymbol] = 'Generator';

        // A Generator should always return itself as the iterator object when the
        // @@iterator function is called on it. Some browsers' implementations of the
        // iterator prototype chain incorrectly implement this, causing the Generator
        // object to not be returned from this call. This ensures that doesn't happen.
        // See https://github.com/facebook/regenerator/issues/274 for more details.
        Gp[iteratorSymbol] = function () {
            return this;
        };

        Gp.toString = function () {
            return '[object Generator]';
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
            record.type = 'normal';
            delete record.arg;
            entry.completion = record;
        }

        function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{ tryLoc: 'root' }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
        }

        exports.keys = function (object) {
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

                if (typeof iterable.next === 'function') {
                    return iterable;
                }

                if (!isNaN(iterable.length)) {
                    var i = -1,
                        next = function next() {
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

                    return (next.next = next);
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

            reset: function (skipTempReset) {
                this.prev = 0;
                this.next = 0;
                // Resetting context._sent for legacy support of Babel's
                // function.sent implementation.
                this.sent = this._sent = undefined$1;
                this.done = false;
                this.delegate = null;

                this.method = 'next';
                this.arg = undefined$1;

                this.tryEntries.forEach(resetTryEntry);

                if (!skipTempReset) {
                    for (var name in this) {
                        // Not sure about the optimal order of these conditions:
                        if (
                            name.charAt(0) === 't' &&
                            hasOwn.call(this, name) &&
                            !isNaN(+name.slice(1))
                        ) {
                            this[name] = undefined$1;
                        }
                    }
                }
            },

            stop: function () {
                this.done = true;

                var rootEntry = this.tryEntries[0];
                var rootRecord = rootEntry.completion;
                if (rootRecord.type === 'throw') {
                    throw rootRecord.arg;
                }

                return this.rval;
            },

            dispatchException: function (exception) {
                if (this.done) {
                    throw exception;
                }

                var context = this;
                function handle(loc, caught) {
                    record.type = 'throw';
                    record.arg = exception;
                    context.next = loc;

                    if (caught) {
                        // If the dispatched exception was caught by a catch block,
                        // then let that catch block handle the exception normally.
                        context.method = 'next';
                        context.arg = undefined$1;
                    }

                    return !!caught;
                }

                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    var record = entry.completion;

                    if (entry.tryLoc === 'root') {
                        // Exception thrown outside of any try block that could handle
                        // it, so set the completion value of the entire function to
                        // throw the exception.
                        return handle('end');
                    }

                    if (entry.tryLoc <= this.prev) {
                        var hasCatch = hasOwn.call(entry, 'catchLoc');
                        var hasFinally = hasOwn.call(entry, 'finallyLoc');

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
                            throw new Error(
                                'try statement without catch or finally'
                            );
                        }
                    }
                }
            },

            abrupt: function (type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (
                        entry.tryLoc <= this.prev &&
                        hasOwn.call(entry, 'finallyLoc') &&
                        this.prev < entry.finallyLoc
                    ) {
                        var finallyEntry = entry;
                        break;
                    }
                }

                if (
                    finallyEntry &&
                    (type === 'break' || type === 'continue') &&
                    finallyEntry.tryLoc <= arg &&
                    arg <= finallyEntry.finallyLoc
                ) {
                    // Ignore the finally entry if control is not jumping to a
                    // location outside the try/catch block.
                    finallyEntry = null;
                }

                var record = finallyEntry ? finallyEntry.completion : {};
                record.type = type;
                record.arg = arg;

                if (finallyEntry) {
                    this.method = 'next';
                    this.next = finallyEntry.finallyLoc;
                    return ContinueSentinel;
                }

                return this.complete(record);
            },

            complete: function (record, afterLoc) {
                if (record.type === 'throw') {
                    throw record.arg;
                }

                if (record.type === 'break' || record.type === 'continue') {
                    this.next = record.arg;
                } else if (record.type === 'return') {
                    this.rval = this.arg = record.arg;
                    this.method = 'return';
                    this.next = 'end';
                } else if (record.type === 'normal' && afterLoc) {
                    this.next = afterLoc;
                }

                return ContinueSentinel;
            },

            finish: function (finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.finallyLoc === finallyLoc) {
                        this.complete(entry.completion, entry.afterLoc);
                        resetTryEntry(entry);
                        return ContinueSentinel;
                    }
                }
            },

            catch: function (tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.tryLoc === tryLoc) {
                        var record = entry.completion;
                        if (record.type === 'throw') {
                            var thrown = record.arg;
                            resetTryEntry(entry);
                        }
                        return thrown;
                    }
                }

                // The context.catch method must only be called with a location
                // argument that corresponds to a known catch block.
                throw new Error('illegal catch attempt');
            },

            delegateYield: function (iterable, resultName, nextLoc) {
                this.delegate = {
                    iterator: values(iterable),
                    resultName: resultName,
                    nextLoc: nextLoc
                };

                if (this.method === 'next') {
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
    })(
        // If this script is executing as a CommonJS module, use module.exports
        // as the regeneratorRuntime namespace. Otherwise create a new empty
        // object. Either way, the resulting object will be used to initialize
        // the regeneratorRuntime variable at the top of this file.
        module.exports
    );

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
        Function('r', 'regeneratorRuntime = r')(runtime);
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
                asyncGeneratorStep(
                    gen,
                    resolve,
                    reject,
                    _next,
                    _throw,
                    'next',
                    value
                );
            }

            function _throw(err) {
                asyncGeneratorStep(
                    gen,
                    resolve,
                    reject,
                    _next,
                    _throw,
                    'throw',
                    err
                );
            }

            _next(undefined);
        });
    };
}

var asyncToGenerator = _asyncToGenerator;

var names = ['Johny', 'Addam', 'Natri', 'Cathy'];

var passwords = ['johny1', 'addam1', 'natri1', 'cathy1'];

var abouts = [
    'Typin... typin...',
    "Hi, it's me. I'm no one.",
    '',
    'Very funny person with very funny face.'
];

var emails = ['johny@qw.ert', 'addam@qw.ert', 'natri@qw.ert', 'cathy@qw.ert'];

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
        default: 'Another broken soul.'
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
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
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
        default: 0
    },
    staticId: {
        type: String,
        default: 'some-test-string'
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
    tags: [
        {
            type: ObjectId,
            ref: name$2
        }
    ]
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

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
                defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(
                target,
                Object.getOwnPropertyDescriptors(source)
            );
        } else {
            ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key)
                );
            });
        }
    }
    return target;
}

var schemas = _objectSpread(
    {},
    User,
    {},
    Test,
    {},
    Category,
    {},
    Article,
    {},
    Comment,
    {},
    Tag
);

var models = {};

for (var key in schemas) {
    models[key] = mongoose.model(key, schemas[key]);
}

var models$1 = _objectSpread({}, models);

function seedUsers() {
    return _seedUsers.apply(this, arguments);
}

function _seedUsers() {
    _seedUsers = asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee() {
            var UserModel, data;
            return regenerator.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            UserModel = models$1[name];
                            data = names.map(function (_, idx) {
                                return {
                                    name: names[idx],
                                    email: emails[idx],
                                    password: passwords[idx],
                                    about: abouts[idx]
                                };
                            });
                            _context.next = 4;
                            return UserModel.create(data);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _seedUsers.apply(this, arguments);
}

var titles = [
    'outdated news',
    'ancient histories',
    'sad songs',
    'boring texts',
    'whatever content'
];

var descriptions = [
    'Some category description',
    'Some other category textual description.',
    'In this category you can find anything.',
    'WHO - why, how, other. ',
    'About constructors in ES6.'
];

function seedArticles() {
    return _seedArticles.apply(this, arguments);
}

function _seedArticles() {
    _seedArticles = asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee() {
            var CategoryModel, data;
            return regenerator.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            CategoryModel = models$1[name$1];
                            data = titles.map(function (_, idx) {
                                return {
                                    name: titles[idx],
                                    description: descriptions[idx]
                                };
                            });
                            _context.next = 4;
                            return CategoryModel.create(data);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _seedArticles.apply(this, arguments);
}

var titles$1 = [
    'How it was',
    'Story about dog',
    'When I was young',
    'A designers tale',
    'Screenshots from past',
    'Back to the future',
    'Forward to the past',
    'No one knows!',
    'So many orcs',
    'Huge dogs amount at the same time'
];

var contents = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ' Risus nec feugiat in fermentum posuere urna nec tincidunt.',
    'Id interdum velit laoreet id.',
    'Suscipit tellus mauris a diam maecenas. Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo. Varius duis at consectetur lorem donec massa sapien.',
    'Id cursus metus aliquam eleifend mi in nulla. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Sit amet nulla facilisi morbi tempus.',
    'Eu augue ut lectus arcu bibendum at varius. Ut aliquam purus sit amet luctus venenatis lectus. ',
    'Cras semper auctor neque vitae tempus quam. Est ultricies integer quis auctor elit sed vulputate mi.'
];

function seedArticles$1() {
    return _seedArticles$1.apply(this, arguments);
}

function _seedArticles$1() {
    _seedArticles$1 = asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee() {
            var User,
                Category,
                Tag,
                Article,
                usrs,
                cats,
                tags,
                iterateOverShorterArr,
                tagArrayIdx,
                data;
            return regenerator.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            User = models$1[name];
                            Category = models$1[name$1];
                            Tag = models$1[name$2];
                            Article = models$1[name$3];
                            _context.next = 6;
                            return User.find({}).exec();

                        case 6:
                            usrs = _context.sent;
                            _context.next = 9;
                            return Category.find({}).exec();

                        case 9:
                            cats = _context.sent;
                            _context.next = 12;
                            return Tag.find({}).exec();

                        case 12:
                            tags = _context.sent;

                            iterateOverShorterArr = function iterateOverShorterArr(
                                demandedIdx,
                                arr
                            ) {
                                var shorterArrIdx = 0;
                                var max = arr.length ? arr.length - 1 : 0;

                                for (var i = 0; i <= demandedIdx; i++) {
                                    shorterArrIdx =
                                        shorterArrIdx === max
                                            ? 0
                                            : shorterArrIdx + 1;
                                }

                                return arr[shorterArrIdx];
                            };

                            tagArrayIdx = 0;
                            data = titles$1.map(function (_, idx) {
                                var autIdx = iterateOverShorterArr(idx, usrs)
                                    ._id;

                                var catIdx = iterateOverShorterArr(idx, cats)
                                    ._id;

                                var tagId1 = iterateOverShorterArr(
                                    tagArrayIdx,
                                    tags
                                )._id;

                                var tagId2 = iterateOverShorterArr(
                                    tagArrayIdx + 1,
                                    tags
                                )._id;

                                var tagId3 = iterateOverShorterArr(
                                    tagArrayIdx + 2,
                                    tags
                                )._id;

                                tagArrayIdx += 3;
                                return {
                                    title: titles$1[idx],
                                    content: contents[idx],
                                    author: autIdx,
                                    tags: [tagId1, tagId2, tagId3],
                                    category: catIdx
                                };
                            });
                            _context.next = 18;
                            return Article.create(data);

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _seedArticles$1.apply(this, arguments);
}

var titles$2 = [
    'asdfa',
    'Hehe comment!1!!!1!',
    'Me rollin...',
    'So I comment.',
    'Screenshots',
    'What da fuc*!',
    'Bro don do it',
    'ANYONE!',
    'LOLOLOLL',
    'Some drugs?',
    'How it was!!!!',
    'That was NOT story about dog!',
    'Oh common...',
    'Quite a tale.',
    'Stop it, you...',
    'Now listen to me very carefoully.',
    'Enjoyed?',
    'ARE YOU PROUD?',
    'So many irrelevance...',
    'YOUR dog is SO huge!'
];

var contents$1 = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris!!!',
    'ASD! fASD! nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse DDfas',
    'ME IS ANALFABETETETE!!! cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qu.',
    'i officia deserunt mollit anim id est laborum.',
    'D Risus nec feugiat in fermentum posuere urna nec tincidunt.',
    'Id interdum velit laoreet id.',
    'Suscipit tellus mauris a diam maecenas.',
    'Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo.',
    'Varius duis at consectetur lorem donec massa sapien.',
    'Id cursus metus aliquam eleifend mi in nulla.',
    'Tempor nec feugiat nisl pretium fusce id velit ut tortor...',
    'Sit amet nulla facilisi morbi tempus.',
    'Eu augue ut lectus arcu bibendum at varius.',
    'Ut aliquam purus sit amet luctus venenatis lectus.',
    'Cras semper auctor neque vitae tempus quam. Est ultricies',
    'Cinteger quis auctor elit sed vulputate mi.'
];

function seedComments() {
    return _seedComments.apply(this, arguments);
}

function _seedComments() {
    _seedComments = asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee() {
            var ArticleModel,
                CommentModel,
                articles,
                iterateOverShorterArr,
                data;
            return regenerator.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            ArticleModel = models$1[name$3];
                            CommentModel = models$1[name$4];
                            _context.next = 4;
                            return ArticleModel.find({}).exec();

                        case 4:
                            articles = _context.sent;

                            iterateOverShorterArr = function iterateOverShorterArr(
                                demandedIdx,
                                arr
                            ) {
                                var shorterArrIdx = 0;
                                var max = arr.length - 1;

                                for (var i = 0; i <= demandedIdx; i++) {
                                    shorterArrIdx =
                                        shorterArrIdx === max
                                            ? 0
                                            : shorterArrIdx + 1;
                                }

                                return arr[shorterArrIdx];
                            };

                            data = titles$2.map(function (_, idx) {
                                var artIdx = iterateOverShorterArr(
                                    idx,
                                    articles
                                )._id;

                                return {
                                    title: titles$2[idx],
                                    content: contents$1[idx],
                                    article: artIdx
                                };
                            });
                            _context.next = 9;
                            return CommentModel.create(data);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _seedComments.apply(this, arguments);
}

var titles$3 = [
    'date',
    'LOL',
    'notsad',
    'exmachina',
    'war',
    'infor',
    'gat',
    'astrid',
    'ceep',
    'sprout'
];

function seedTags() {
    return _seedTags.apply(this, arguments);
}

function _seedTags() {
    _seedTags = asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee() {
            var TagModel, data;
            return regenerator.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            TagModel = models$1[name$2];
                            data = titles$3.map(function (tagname) {
                                return {
                                    tag: tagname
                                };
                            });
                            _context.next = 4;
                            return TagModel.create(data);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _seedTags.apply(this, arguments);
}

dotenv.config();
var runDatabase = function () {
    var seedOptionalCallback =
        arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : function () {};
    mongoose__default
        .connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(function (data) {
            console.log('MONGODB. Database connected. '.concat(data));
            seedOptionalCallback();
        });
};

var frame = function frame(message) {
    var color =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : 'cyan';
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

    var toDisplay = [
        '',
        '   '.concat(border),
        '   '.concat(space),
        '   # '.concat(message, ' #'),
        '   '.concat(space),
        '   '.concat(border),
        ''
    ].join('\n')[color];
    console.log(toDisplay);
};

var section = function section(title, message) {
    var color =
        arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : 'blue';
    var msg = message ? ': '.concat(message, '.') : '';
    var toDisplay = '\n## '.concat(title.toUpperCase()).concat(msg, ' ##')[
        color
    ];
    console.log(toDisplay);
};

var endsec = function endsec() {
    var title =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#';
    var message =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#';
    var color =
        arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : 'blue';
    var msg = message ? ': '.concat(message, '.') : '';
    var startmsg = '## '.concat(title.toUpperCase()).concat(msg, ' ##');
    var toDisplay = '';

    for (var i = 0; i <= startmsg.length; i++) {
        toDisplay += '#';
    }

    console.log(''.concat(toDisplay[color], '\n'));
};

var info = function info(message) {
    var color =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : 'white';
    console.log(message[color]);
};

var warn = function warn(message) {
    var color =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : 'yellow';
    console.log(''.concat('[warn]'[color], ' ').concat(message));
};

var fail = function fail(message) {
    var color =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : 'red';
    console.log(''.concat('[fail]'[color], ' ').concat(message));
};

var ok = function ok(message) {
    var color =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : 'green';
    console.log(''.concat('[ok]'[color], ' ').concat(message));
};

var strong = function strong(message) {
    var color =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : 'magenta';
    var len = message.length + 4;
    var border = '';

    for (var i = 0; i < len; i++) {
        border += '#';
    }

    var toDisplay = [
        '',
        '   '.concat(border),
        '   # '.concat(message, ' #'),
        '   '.concat(border),
        ''
    ].join('\n')[color];
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

function runSeeder() {
    log.frame('[SEED-DATABASE] Seeding application start.');

    function seedDb() {
        return _seedDb.apply(this, arguments);
    }

    function _seedDb() {
        _seedDb = asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee() {
                return regenerator.wrap(
                    function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    log.ok(
                                        '[SEED-DATABASE] Seeding callback run.'
                                    );
                                    _context.prev = 1;
                                    _context.next = 4;
                                    return mongoose__default.connection.db.dropDatabase();

                                case 4:
                                    log.strong(
                                        '[SEED-DATABASE] Db successfully dropped.',
                                        'green'
                                    );
                                    _context.next = 7;
                                    return seedUsers();

                                case 7:
                                    log.ok('[SEED-DATABASE] Users sed.');
                                    _context.next = 10;
                                    return seedArticles();

                                case 10:
                                    log.ok('[SEED-DATABASE] Categories sed.');
                                    _context.next = 13;
                                    return seedTags();

                                case 13:
                                    log.ok('[SEED-DATABASE] Tags sed.');
                                    _context.next = 16;
                                    return seedArticles$1();

                                case 16:
                                    log.ok('[SEED-DATABASE] Articles sed.');
                                    _context.next = 19;
                                    return seedComments();

                                case 19:
                                    log.ok('[SEED-DATABASE] Comments sed.');
                                    log.frame(
                                        '[SEED-DATABASE] Seeder ended its task. You can abort CLI.'
                                    );
                                    _context.next = 26;
                                    break;

                                case 23:
                                    _context.prev = 23;
                                    _context.t0 = _context['catch'](1);
                                    log.fail(
                                        '[SEED-DATABASE] '.concat(_context.t0)
                                    );

                                case 26:
                                    return _context.abrupt('return');

                                case 27:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    },
                    _callee,
                    null,
                    [[1, 23]]
                );
            })
        );
        return _seedDb.apply(this, arguments);
    }

    runDatabase(seedDb);
}
//runSeeder();

module.exports = runSeeder;
