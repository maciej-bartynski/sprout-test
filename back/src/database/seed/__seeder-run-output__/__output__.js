'use strict';
function _interopDefault(e) {
    return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var mongoose = require('mongoose'),
    mongoose__default = _interopDefault(mongoose),
    crypto = _interopDefault(require('crypto')),
    uuid = require('uuid'),
    dotenv = require('dotenv');
function createCommonjsModule(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports;
}
require('colors');
var runtime_1 = createCommonjsModule(function (e) {
        var t = (function (i) {
            var c,
                e = Object.prototype,
                l = e.hasOwnProperty,
                t = 'function' == typeof Symbol ? Symbol : {},
                o = t.iterator || '@@iterator',
                r = t.asyncIterator || '@@asyncIterator',
                n = t.toStringTag || '@@toStringTag';
            function s(e, t, r, n) {
                var a,
                    i,
                    s,
                    c,
                    o = t && t.prototype instanceof y ? t : y,
                    u = Object.create(o.prototype),
                    l = new A(n || []);
                return (
                    (u._invoke =
                        ((a = e),
                        (i = r),
                        (s = l),
                        (c = d),
                        function (e, t) {
                            if (c === f)
                                throw new Error('Generator is already running');
                            if (c === h) {
                                if ('throw' === e) throw t;
                                return q();
                            }
                            for (s.method = e, s.arg = t; ; ) {
                                var r = s.delegate;
                                if (r) {
                                    var n = E(r, s);
                                    if (n) {
                                        if (n === g) continue;
                                        return n;
                                    }
                                }
                                if ('next' === s.method)
                                    s.sent = s._sent = s.arg;
                                else if ('throw' === s.method) {
                                    if (c === d) throw ((c = h), s.arg);
                                    s.dispatchException(s.arg);
                                } else
                                    'return' === s.method &&
                                        s.abrupt('return', s.arg);
                                c = f;
                                var o = m(a, i, s);
                                if ('normal' === o.type) {
                                    if (((c = s.done ? h : p), o.arg === g))
                                        continue;
                                    return { value: o.arg, done: s.done };
                                }
                                'throw' === o.type &&
                                    ((c = h),
                                    (s.method = 'throw'),
                                    (s.arg = o.arg));
                            }
                        })),
                    u
                );
            }
            function m(e, t, r) {
                try {
                    return { type: 'normal', arg: e.call(t, r) };
                } catch (e) {
                    return { type: 'throw', arg: e };
                }
            }
            i.wrap = s;
            var d = 'suspendedStart',
                p = 'suspendedYield',
                f = 'executing',
                h = 'completed',
                g = {};
            function y() {}
            function a() {}
            function u() {}
            var v = {};
            v[o] = function () {
                return this;
            };
            var w = Object.getPrototypeOf,
                b = w && w(w(j([])));
            b && b !== e && l.call(b, o) && (v = b);
            var S = (u.prototype = y.prototype = Object.create(v));
            function x(e) {
                ['next', 'throw', 'return'].forEach(function (t) {
                    e[t] = function (e) {
                        return this._invoke(t, e);
                    };
                });
            }
            function $(c, u) {
                var t;
                this._invoke = function (r, n) {
                    function e() {
                        return new u(function (e, t) {
                            !(function t(e, r, n, o) {
                                var a = m(c[e], c, r);
                                if ('throw' !== a.type) {
                                    var i = a.arg,
                                        s = i.value;
                                    return s &&
                                        'object' == typeof s &&
                                        l.call(s, '__await')
                                        ? u.resolve(s.__await).then(
                                              function (e) {
                                                  t('next', e, n, o);
                                              },
                                              function (e) {
                                                  t('throw', e, n, o);
                                              }
                                          )
                                        : u.resolve(s).then(
                                              function (e) {
                                                  (i.value = e), n(i);
                                              },
                                              function (e) {
                                                  return t('throw', e, n, o);
                                              }
                                          );
                                }
                                o(a.arg);
                            })(r, n, e, t);
                        });
                    }
                    return (t = t ? t.then(e, e) : e());
                };
            }
            function E(e, t) {
                var r = e.iterator[t.method];
                if (r === c) {
                    if (((t.delegate = null), 'throw' === t.method)) {
                        if (
                            e.iterator.return &&
                            ((t.method = 'return'),
                            (t.arg = c),
                            E(e, t),
                            'throw' === t.method)
                        )
                            return g;
                        (t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a 'throw' method"
                            ));
                    }
                    return g;
                }
                var n = m(r, e.iterator, t.arg);
                if ('throw' === n.type)
                    return (
                        (t.method = 'throw'),
                        (t.arg = n.arg),
                        (t.delegate = null),
                        g
                    );
                var o = n.arg;
                return o
                    ? o.done
                        ? ((t[e.resultName] = o.value),
                          (t.next = e.nextLoc),
                          'return' !== t.method &&
                              ((t.method = 'next'), (t.arg = c)),
                          (t.delegate = null),
                          g)
                        : o
                    : ((t.method = 'throw'),
                      (t.arg = new TypeError(
                          'iterator result is not an object'
                      )),
                      (t.delegate = null),
                      g);
            }
            function O(e) {
                var t = { tryLoc: e[0] };
                1 in e && (t.catchLoc = e[1]),
                    2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                    this.tryEntries.push(t);
            }
            function _(e) {
                var t = e.completion || {};
                (t.type = 'normal'), delete t.arg, (e.completion = t);
            }
            function A(e) {
                (this.tryEntries = [{ tryLoc: 'root' }]),
                    e.forEach(O, this),
                    this.reset(!0);
            }
            function j(t) {
                if (t) {
                    var e = t[o];
                    if (e) return e.call(t);
                    if ('function' == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var r = -1,
                            n = function e() {
                                for (; ++r < t.length; )
                                    if (l.call(t, r))
                                        return (
                                            (e.value = t[r]), (e.done = !1), e
                                        );
                                return (e.value = c), (e.done = !0), e;
                            };
                        return (n.next = n);
                    }
                }
                return { next: q };
            }
            function q() {
                return { value: c, done: !0 };
            }
            return (
                (a.prototype = S.constructor = u),
                (u.constructor = a),
                (u[n] = a.displayName = 'GeneratorFunction'),
                (i.isGeneratorFunction = function (e) {
                    var t = 'function' == typeof e && e.constructor;
                    return (
                        !!t &&
                        (t === a ||
                            'GeneratorFunction' === (t.displayName || t.name))
                    );
                }),
                (i.mark = function (e) {
                    return (
                        Object.setPrototypeOf
                            ? Object.setPrototypeOf(e, u)
                            : ((e.__proto__ = u),
                              n in e || (e[n] = 'GeneratorFunction')),
                        (e.prototype = Object.create(S)),
                        e
                    );
                }),
                (i.awrap = function (e) {
                    return { __await: e };
                }),
                x($.prototype),
                ($.prototype[r] = function () {
                    return this;
                }),
                (i.AsyncIterator = $),
                (i.async = function (e, t, r, n, o) {
                    void 0 === o && (o = Promise);
                    var a = new $(s(e, t, r, n), o);
                    return i.isGeneratorFunction(t)
                        ? a
                        : a.next().then(function (e) {
                              return e.done ? e.value : a.next();
                          });
                }),
                x(S),
                (S[n] = 'Generator'),
                (S[o] = function () {
                    return this;
                }),
                (S.toString = function () {
                    return '[object Generator]';
                }),
                (i.keys = function (r) {
                    var n = [];
                    for (var e in r) n.push(e);
                    return (
                        n.reverse(),
                        function e() {
                            for (; n.length; ) {
                                var t = n.pop();
                                if (t in r)
                                    return (e.value = t), (e.done = !1), e;
                            }
                            return (e.done = !0), e;
                        }
                    );
                }),
                (i.values = j),
                (A.prototype = {
                    constructor: A,
                    reset: function (e) {
                        if (
                            ((this.prev = 0),
                            (this.next = 0),
                            (this.sent = this._sent = c),
                            (this.done = !1),
                            (this.delegate = null),
                            (this.method = 'next'),
                            (this.arg = c),
                            this.tryEntries.forEach(_),
                            !e)
                        )
                            for (var t in this)
                                't' === t.charAt(0) &&
                                    l.call(this, t) &&
                                    !isNaN(+t.slice(1)) &&
                                    (this[t] = c);
                    },
                    stop: function () {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ('throw' === e.type) throw e.arg;
                        return this.rval;
                    },
                    dispatchException: function (r) {
                        if (this.done) throw r;
                        var n = this;
                        function e(e, t) {
                            return (
                                (a.type = 'throw'),
                                (a.arg = r),
                                (n.next = e),
                                t && ((n.method = 'next'), (n.arg = c)),
                                !!t
                            );
                        }
                        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                            var o = this.tryEntries[t],
                                a = o.completion;
                            if ('root' === o.tryLoc) return e('end');
                            if (o.tryLoc <= this.prev) {
                                var i = l.call(o, 'catchLoc'),
                                    s = l.call(o, 'finallyLoc');
                                if (i && s) {
                                    if (this.prev < o.catchLoc)
                                        return e(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc)
                                        return e(o.finallyLoc);
                                } else if (i) {
                                    if (this.prev < o.catchLoc)
                                        return e(o.catchLoc, !0);
                                } else {
                                    if (!s)
                                        throw new Error(
                                            'try statement without catch or finally'
                                        );
                                    if (this.prev < o.finallyLoc)
                                        return e(o.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function (e, t) {
                        for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
                            var n = this.tryEntries[r];
                            if (
                                n.tryLoc <= this.prev &&
                                l.call(n, 'finallyLoc') &&
                                this.prev < n.finallyLoc
                            ) {
                                var o = n;
                                break;
                            }
                        }
                        o &&
                            ('break' === e || 'continue' === e) &&
                            o.tryLoc <= t &&
                            t <= o.finallyLoc &&
                            (o = null);
                        var a = o ? o.completion : {};
                        return (
                            (a.type = e),
                            (a.arg = t),
                            o
                                ? ((this.method = 'next'),
                                  (this.next = o.finallyLoc),
                                  g)
                                : this.complete(a)
                        );
                    },
                    complete: function (e, t) {
                        if ('throw' === e.type) throw e.arg;
                        return (
                            'break' === e.type || 'continue' === e.type
                                ? (this.next = e.arg)
                                : 'return' === e.type
                                ? ((this.rval = this.arg = e.arg),
                                  (this.method = 'return'),
                                  (this.next = 'end'))
                                : 'normal' === e.type && t && (this.next = t),
                            g
                        );
                    },
                    finish: function (e) {
                        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e)
                                return (
                                    this.complete(r.completion, r.afterLoc),
                                    _(r),
                                    g
                                );
                        }
                    },
                    catch: function (e) {
                        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ('throw' === n.type) {
                                    var o = n.arg;
                                    _(r);
                                }
                                return o;
                            }
                        }
                        throw new Error('illegal catch attempt');
                    },
                    delegateYield: function (e, t, r) {
                        return (
                            (this.delegate = {
                                iterator: j(e),
                                resultName: t,
                                nextLoc: r
                            }),
                            'next' === this.method && (this.arg = c),
                            g
                        );
                    }
                }),
                i
            );
        })(e.exports);
        try {
            regeneratorRuntime = t;
        } catch (e) {
            Function('r', 'regeneratorRuntime = r')(t);
        }
    }),
    regenerator = runtime_1;
function asyncGeneratorStep(e, t, r, n, o, a, i) {
    try {
        var s = e[a](i),
            c = s.value;
    } catch (e) {
        return void r(e);
    }
    s.done ? t(c) : Promise.resolve(c).then(n, o);
}
function _asyncToGenerator(s) {
    return function () {
        var e = this,
            i = arguments;
        return new Promise(function (t, r) {
            var n = s.apply(e, i);
            function o(e) {
                asyncGeneratorStep(n, t, r, o, a, 'next', e);
            }
            function a(e) {
                asyncGeneratorStep(n, t, r, o, a, 'throw', e);
            }
            o(void 0);
        });
    };
}
var asyncToGenerator = _asyncToGenerator,
    names = ['Johny', 'Addam', 'Natri', 'Cathy'],
    passwords = ['johny1', 'addam1', 'natri1', 'cathy1'],
    abouts = [
        'Typin... typin...',
        "Hi, it's me. I'm no one.",
        '',
        'Very funny person with very funny face.'
    ],
    emails = ['johny@qw.ert', 'addam@qw.ert', 'natri@qw.ert', 'cathy@qw.ert'];
function _defineProperty(e, t, r) {
    return (
        t in e
            ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              })
            : (e[t] = r),
        e
    );
}
var defineProperty = _defineProperty,
    options = Object.freeze({ timestamps: !0 }),
    creator = Object.freeze({
        name: { type: String, trim: !0, required: !0, maxlength: 32 },
        email: { type: String, trim: !0, required: !0, unique: !0 },
        hashed_password: { type: String, required: !0 },
        about: { type: String, trim: !0, default: 'Another broken soul.' },
        salt: String
    }),
    name = 'User',
    schema = new mongoose.Schema(creator, options),
    setPass = function (e) {
        (this._password = e),
            (this.salt = uuid.v1()),
            (this.hashed_password = this.encryptPassword(this._password));
    },
    getPass = function () {
        return this._password;
    };
schema.virtual('password').set(setPass).get(getPass),
    (schema.methods = {
        authenticate: function (e) {
            return this.encryptPassword(e) === this.hashed_password;
        },
        encryptPassword: function (e) {
            if (!e) return null;
            try {
                return crypto
                    .createHmac('sha1', this.salt)
                    .update(e)
                    .digest('hex');
            } catch (e) {
                return null;
            }
        }
    });
var User = defineProperty({}, name, schema),
    Schema = mongoose__default.Schema,
    test = new Schema({
        counter: { type: Number, default: 0 },
        staticId: { type: String, default: 'some-test-string' }
    }),
    Test = { Test: test },
    options$1 = Object.freeze({ timestamps: !0 }),
    creator$1 = Object.freeze({
        name: {
            type: String,
            trim: !0,
            required: !0,
            maxlength: 50,
            unique: !0
        },
        description: { type: String, trim: !0, required: !1, maxlength: 1e3 }
    }),
    name$1 = 'Category',
    schema$1 = new mongoose.Schema(creator$1, options$1),
    Category = defineProperty({}, name$1, schema$1),
    options$2 = Object.freeze({ timestamps: !0 }),
    name$2 = 'Tag',
    ObjectId = mongoose.Schema.ObjectId,
    creator$2 = Object.freeze({
        title: {
            type: String,
            trim: !0,
            required: !0,
            maxlength: 50,
            unique: !0
        },
        content: { type: String, trim: !0, required: !0, maxlength: 1e4 },
        category: { type: ObjectId, ref: name$1, required: !0 },
        author: { type: ObjectId, ref: name, required: !0 },
        tags: [{ type: ObjectId, ref: name$2 }]
    }),
    name$3 = 'Article',
    schema$2 = new mongoose.Schema(creator$2, options$2),
    Article = defineProperty({}, name$3, schema$2),
    options$3 = Object.freeze({ timestamps: !0 }),
    creator$3 = Object.freeze({
        tag: { type: String, trim: !0, required: !0, maxlength: 50, unique: !0 }
    }),
    schema$3 = new mongoose.Schema(creator$3, options$3),
    Tag = defineProperty({}, name$2, schema$3),
    options$4 = Object.freeze({ timestamps: !0 }),
    ObjectId$1 = mongoose.Schema.ObjectId,
    creator$4 = Object.freeze({
        title: {
            type: String,
            trim: !0,
            required: !0,
            maxlength: 50,
            unique: !0
        },
        content: { type: String, trim: !0, required: !0, maxlength: 1e3 },
        article: { type: ObjectId$1, ref: name$3, required: !0 }
    }),
    name$4 = 'Comment',
    schema$4 = new mongoose.Schema(creator$4, options$4),
    Comment = defineProperty({}, name$4, schema$4);
function ownKeys(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e &&
            (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, n);
    }
    return r;
}
function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = null != arguments[e] ? arguments[e] : {};
        e % 2
            ? ownKeys(Object(r), !0).forEach(function (e) {
                  defineProperty(t, e, r[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
            : ownKeys(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e)
                  );
              });
    }
    return t;
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
    ),
    models = {};
for (var key in schemas) models[key] = mongoose.model(key, schemas[key]);
var models$1 = _objectSpread({}, models);
function seedUsers() {
    return _seedUsers.apply(this, arguments);
}
function _seedUsers() {
    return (_seedUsers = asyncToGenerator(
        regenerator.mark(function e() {
            var t, r;
            return regenerator.wrap(function (e) {
                for (;;)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return (
                                (t = models$1[name]),
                                (r = names.map(function (e, t) {
                                    return {
                                        name: names[t],
                                        email: emails[t],
                                        password: passwords[t],
                                        about: abouts[t]
                                    };
                                })),
                                (e.next = 4),
                                t.create(r)
                            );
                        case 4:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })
    )).apply(this, arguments);
}
var titles = [
        'outdated news',
        'ancient histories',
        'sad songs',
        'boring texts',
        'whatever content'
    ],
    descriptions = [
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
    return (_seedArticles = asyncToGenerator(
        regenerator.mark(function e() {
            var t, r;
            return regenerator.wrap(function (e) {
                for (;;)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return (
                                (t = models$1[name$1]),
                                (r = titles.map(function (e, t) {
                                    return {
                                        name: titles[t],
                                        description: descriptions[t]
                                    };
                                })),
                                (e.next = 4),
                                t.create(r)
                            );
                        case 4:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })
    )).apply(this, arguments);
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
    ],
    contents = [
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
    return (_seedArticles$1 = asyncToGenerator(
        regenerator.mark(function e() {
            var t, r, n, o, s, c, u, l, m, a;
            return regenerator.wrap(function (e) {
                for (;;)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return (
                                (t = models$1[name]),
                                (r = models$1[name$1]),
                                (n = models$1[name$2]),
                                (o = models$1[name$3]),
                                (e.next = 6),
                                t.find({}).exec()
                            );
                        case 6:
                            return (
                                (s = e.sent), (e.next = 9), r.find({}).exec()
                            );
                        case 9:
                            return (
                                (c = e.sent), (e.next = 12), n.find({}).exec()
                            );
                        case 12:
                            return (
                                (u = e.sent),
                                (l = function (e, t) {
                                    for (
                                        var r = 0,
                                            n = t.length ? t.length - 1 : 0,
                                            o = 0;
                                        o <= e;
                                        o++
                                    )
                                        r = r === n ? 0 : r + 1;
                                    return t[r];
                                }),
                                (m = 0),
                                (a = titles$1.map(function (e, t) {
                                    var r = l(t, s)._id,
                                        n = l(t, c)._id,
                                        o = l(m, u)._id,
                                        a = l(m + 1, u)._id,
                                        i = l(m + 2, u)._id;
                                    return (
                                        (m += 3),
                                        {
                                            title: titles$1[t],
                                            content: contents[t],
                                            author: r,
                                            tags: [o, a, i],
                                            category: n
                                        }
                                    );
                                })),
                                (e.next = 18),
                                o.create(a)
                            );
                        case 18:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })
    )).apply(this, arguments);
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
    ],
    contents$1 = [
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
    return (_seedComments = asyncToGenerator(
        regenerator.mark(function e() {
            var t, r, n, o, a;
            return regenerator.wrap(function (e) {
                for (;;)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return (
                                (t = models$1[name$3]),
                                (r = models$1[name$4]),
                                (e.next = 4),
                                t.find({}).exec()
                            );
                        case 4:
                            return (
                                (n = e.sent),
                                (o = function (e, t) {
                                    for (
                                        var r = 0, n = t.length - 1, o = 0;
                                        o <= e;
                                        o++
                                    )
                                        r = r === n ? 0 : r + 1;
                                    return t[r];
                                }),
                                (a = titles$2.map(function (e, t) {
                                    var r = o(t, n)._id;
                                    return {
                                        title: titles$2[t],
                                        content: contents$1[t],
                                        article: r
                                    };
                                })),
                                (e.next = 9),
                                r.create(a)
                            );
                        case 9:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })
    )).apply(this, arguments);
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
    return (_seedTags = asyncToGenerator(
        regenerator.mark(function e() {
            var t, r;
            return regenerator.wrap(function (e) {
                for (;;)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return (
                                (t = models$1[name$2]),
                                (r = titles$3.map(function (e) {
                                    return { tag: e };
                                })),
                                (e.next = 4),
                                t.create(r)
                            );
                        case 4:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })
    )).apply(this, arguments);
}
dotenv.config();
var runDatabase = function () {
        var t =
            0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : function () {};
        mongoose__default
            .connect(process.env.DATABASE, {
                useNewUrlParser: !0,
                useUnifiedTopology: !0
            })
            .then(function (e) {
                console.log('MONGODB. Database connected. '.concat(e)), t();
            });
    },
    frame = function (e, t) {
        for (
            var r = 1 < arguments.length && void 0 !== t ? t : 'cyan',
                n = e.length + 4,
                o = '',
                a = '',
                i = 0;
            i < n;
            i++
        )
            (o += '#'), (a += 0 === i || i === n - 1 ? '#' : ' ');
        var s = [
            '',
            '   '.concat(o),
            '   '.concat(a),
            '   # '.concat(e, ' #'),
            '   '.concat(a),
            '   '.concat(o),
            ''
        ].join('\n')[r];
        console.log(s);
    },
    section = function (e, t, r) {
        var n = 2 < arguments.length && void 0 !== r ? r : 'blue',
            o = t ? ': '.concat(t, '.') : '',
            a = '\n## '.concat(e.toUpperCase()).concat(o, ' ##')[n];
        console.log(a);
    },
    endsec = function (e, t, r) {
        for (
            var n = 0 < arguments.length && void 0 !== e ? e : '#',
                o = 1 < arguments.length && void 0 !== t ? t : '#',
                a = 2 < arguments.length && void 0 !== r ? r : 'blue',
                i = o ? ': '.concat(o, '.') : '',
                s = '## '.concat(n.toUpperCase()).concat(i, ' ##'),
                c = '',
                u = 0;
            u <= s.length;
            u++
        )
            c += '#';
        console.log(''.concat(c[a], '\n'));
    },
    info = function (e, t) {
        var r = 1 < arguments.length && void 0 !== t ? t : 'white';
        console.log(e[r]);
    },
    warn = function (e, t) {
        var r = 1 < arguments.length && void 0 !== t ? t : 'yellow';
        console.log(''.concat('[warn]'[r], ' ').concat(e));
    },
    fail = function (e, t) {
        var r = 1 < arguments.length && void 0 !== t ? t : 'red';
        console.log(''.concat('[fail]'[r], ' ').concat(e));
    },
    ok = function (e, t) {
        var r = 1 < arguments.length && void 0 !== t ? t : 'green';
        console.log(''.concat('[ok]'[r], ' ').concat(e));
    },
    strong = function (e, t) {
        for (
            var r = 1 < arguments.length && void 0 !== t ? t : 'magenta',
                n = e.length + 4,
                o = '',
                a = 0;
            a < n;
            a++
        )
            o += '#';
        var i = [
            '',
            '   '.concat(o),
            '   # '.concat(e, ' #'),
            '   '.concat(o),
            ''
        ].join('\n')[r];
        console.log(i);
    },
    messages = {
        frame: frame,
        section: section,
        endsec: endsec,
        info: info,
        warn: warn,
        fail: fail,
        ok: ok,
        strong: strong
    },
    disabledLog = {};
for (var key$1 in messages) disabledLog[key$1] = function () {};
var log = 'true' === process.env.IS_PRODUCTION ? disabledLog : messages;
function runSeeder() {
    function e() {
        return (e = asyncToGenerator(
            regenerator.mark(function e() {
                return regenerator.wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        log.ok(
                                            '[SEED-DATABASE] Seeding callback run.'
                                        ),
                                        (e.prev = 1),
                                        (e.next = 4),
                                        mongoose__default.connection.db.dropDatabase()
                                    );
                                case 4:
                                    return (
                                        log.strong(
                                            '[SEED-DATABASE] Db successfully dropped.',
                                            'green'
                                        ),
                                        (e.next = 7),
                                        seedUsers()
                                    );
                                case 7:
                                    return (
                                        log.ok('[SEED-DATABASE] Users sed.'),
                                        (e.next = 10),
                                        seedArticles()
                                    );
                                case 10:
                                    return (
                                        log.ok(
                                            '[SEED-DATABASE] Categories sed.'
                                        ),
                                        (e.next = 13),
                                        seedTags()
                                    );
                                case 13:
                                    return (
                                        log.ok('[SEED-DATABASE] Tags sed.'),
                                        (e.next = 16),
                                        seedArticles$1()
                                    );
                                case 16:
                                    return (
                                        log.ok('[SEED-DATABASE] Articles sed.'),
                                        (e.next = 19),
                                        seedComments()
                                    );
                                case 19:
                                    log.ok('[SEED-DATABASE] Comments sed.'),
                                        log.frame(
                                            '[SEED-DATABASE] Seeder ended its task. You can abort CLI.'
                                        ),
                                        (e.next = 26);
                                    break;
                                case 23:
                                    (e.prev = 23),
                                        (e.t0 = e.catch(1)),
                                        log.fail(
                                            '[SEED-DATABASE] '.concat(e.t0)
                                        );
                                case 26:
                                    return e.abrupt('return');
                                case 27:
                                case 'end':
                                    return e.stop();
                            }
                    },
                    e,
                    null,
                    [[1, 23]]
                );
            })
        )).apply(this, arguments);
    }
    log.frame('[SEED-DATABASE] Seeding application start.'),
        runDatabase(function () {
            return e.apply(this, arguments);
        });
}
runSeeder();
