function bh(t, e) {
  const r = Object.create(null),
    n = t.split(",");
  for (let i = 0; i < n.length; i++) r[n[i]] = !0;
  return e ? i => !!r[i.toLowerCase()] : i => !!r[i]
}
const rb = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  nb = bh(rb);

function Om(t) {
  return !!t || t === ""
}

function xh(t) {
  if (ot(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++) {
      const n = t[r],
        i = qt(n) ? ob(n) : xh(n);
      if (i)
        for (const a in i) e[a] = i[a]
    }
    return e
  } else {
    if (qt(t)) return t;
    if (Wt(t)) return t
  }
}
const ib = /;(?![^(]*\))/g,
  ab = /:(.+)/;

function ob(t) {
  const e = {};
  return t.split(ib).forEach(r => {
    if (r) {
      const n = r.split(ab);
      n.length > 1 && (e[n[0].trim()] = n[1].trim())
    }
  }), e
}

function Ch(t) {
  let e = "";
  if (qt(t)) e = t;
  else if (ot(t))
    for (let r = 0; r < t.length; r++) {
      const n = Ch(t[r]);
      n && (e += n + " ")
    } else if (Wt(t))
      for (const r in t) t[r] && (e += r + " ");
  return e.trim()
}

function sb(t, e) {
  if (t.length !== e.length) return !1;
  let r = !0;
  for (let n = 0; r && n < t.length; n++) r = oi(t[n], e[n]);
  return r
}

function oi(t, e) {
  if (t === e) return !0;
  let r = ud(t),
    n = ud(e);
  if (r || n) return r && n ? t.getTime() === e.getTime() : !1;
  if (r = ot(t), n = ot(e), r || n) return r && n ? sb(t, e) : !1;
  if (r = Wt(t), n = Wt(e), r || n) {
    if (!r || !n) return !1;
    const i = Object.keys(t).length,
      a = Object.keys(e).length;
    if (i !== a) return !1;
    for (const o in t) {
      const s = t.hasOwnProperty(o),
        l = e.hasOwnProperty(o);
      if (s && !l || !s && l || !oi(t[o], e[o])) return !1
    }
  }
  return String(t) === String(e)
}

function Th(t, e) {
  return t.findIndex(r => oi(r, e))
}
const KB = t => qt(t) ? t : t == null ? "" : ot(t) || Wt(t) && (t.toString === Bm || !ht(t.toString)) ? JSON.stringify(t, km, 2) : String(t),
  km = (t, e) => e && e.__v_isRef ? km(t, e.value) : Xi(e) ? {
    [`Map(${e.size})`]: [...e.entries()].reduce((r, [n, i]) => (r[`${n} =>`] = i, r), {})
  } : fa(e) ? {
    [`Set(${e.size})`]: [...e.values()]
  } : Wt(e) && !ot(e) && !Nm(e) ? String(e) : e,
  Rt = {},
  Yi = [],
  rr = () => {},
  lb = () => !1,
  ub = /^on[^a-z]/,
  $l = t => ub.test(t),
  Mh = t => t.startsWith("onUpdate:"),
  Jt = Object.assign,
  Dh = (t, e) => {
    const r = t.indexOf(e);
    r > -1 && t.splice(r, 1)
  },
  fb = Object.prototype.hasOwnProperty,
  bt = (t, e) => fb.call(t, e),
  ot = Array.isArray,
  Xi = t => Gl(t) === "[object Map]",
  fa = t => Gl(t) === "[object Set]",
  ud = t => t instanceof Date,
  ht = t => typeof t == "function",
  qt = t => typeof t == "string",
  Ah = t => typeof t == "symbol",
  Wt = t => t !== null && typeof t == "object",
  Ph = t => Wt(t) && ht(t.then) && ht(t.catch),
  Bm = Object.prototype.toString,
  Gl = t => Bm.call(t),
  cb = t => Gl(t).slice(8, -1),
  Nm = t => Gl(t) === "[object Object]",
  Ih = t => qt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
  Us = bh(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  Wl = t => {
    const e = Object.create(null);
    return r => e[r] || (e[r] = t(r))
  },
  hb = /-(\w)/g,
  gr = Wl(t => t.replace(hb, (e, r) => r ? r.toUpperCase() : "")),
  vb = /\B([A-Z])/g,
  ca = Wl(t => t.replace(vb, "-$1").toLowerCase()),
  Ul = Wl(t => t.charAt(0).toUpperCase() + t.slice(1)),
  Mu = Wl(t => t ? `on${Ul(t)}` : ""),
  So = (t, e) => !Object.is(t, e),
  Ys = (t, e) => {
    for (let r = 0; r < t.length; r++) t[r](e)
  },
  cl = (t, e, r) => {
    Object.defineProperty(t, e, {
      configurable: !0,
      enumerable: !1,
      value: r
    })
  },
  ta = t => {
    const e = parseFloat(t);
    return isNaN(e) ? t : e
  };
let fd;
const db = () => fd || (fd = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
let xr;
class Fm {
  constructor(e = !1) {
    this.active = !0, this.effects = [], this.cleanups = [], !e && xr && (this.parent = xr, this.index = (xr.scopes || (xr.scopes = [])).push(this) - 1)
  }
  run(e) {
    if (this.active) try {
      return xr = this, e()
    } finally {
      xr = this.parent
    }
  }
  on() {
    xr = this
  }
  off() {
    xr = this.parent
  }
  stop(e) {
    if (this.active) {
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop();
      for (r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]();
      if (this.scopes)
        for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(!0);
      if (this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index)
      }
      this.active = !1
    }
  }
}

function zm(t) {
  return new Fm(t)
}

function pb(t, e = xr) {
  e && e.active && e.effects.push(t)
}
const Eh = t => {
    const e = new Set(t);
    return e.w = 0, e.n = 0, e
  },
  Hm = t => (t.w & yn) > 0,
  Vm = t => (t.n & yn) > 0,
  gb = ({
    deps: t
  }) => {
    if (t.length)
      for (let e = 0; e < t.length; e++) t[e].w |= yn
  },
  yb = t => {
    const {
      deps: e
    } = t;
    if (e.length) {
      let r = 0;
      for (let n = 0; n < e.length; n++) {
        const i = e[n];
        Hm(i) && !Vm(i) ? i.delete(t) : e[r++] = i, i.w &= ~yn, i.n &= ~yn
      }
      e.length = r
    }
  },
  Zf = new WeakMap;
let Ua = 0,
  yn = 1;
const jf = 30;
let hr;
const ei = Symbol(""),
  Qf = Symbol("");
class Lh {
  constructor(e, r = null, n) {
    this.fn = e, this.scheduler = r, this.active = !0, this.deps = [], this.parent = void 0, pb(this, n)
  }
  run() {
    if (!this.active) return this.fn();
    let e = hr,
      r = ln;
    for (; e;) {
      if (e === this) return;
      e = e.parent
    }
    try {
      return this.parent = hr, hr = this, ln = !0, yn = 1 << ++Ua, Ua <= jf ? gb(this) : cd(this), this.fn()
    } finally {
      Ua <= jf && yb(this), yn = 1 << --Ua, hr = this.parent, ln = r, this.parent = void 0
    }
  }
  stop() {
    this.active && (cd(this), this.onStop && this.onStop(), this.active = !1)
  }
}

function cd(t) {
  const {
    deps: e
  } = t;
  if (e.length) {
    for (let r = 0; r < e.length; r++) e[r].delete(t);
    e.length = 0
  }
}
let ln = !0;
const $m = [];

function ha() {
  $m.push(ln), ln = !1
}

function va() {
  const t = $m.pop();
  ln = t === void 0 ? !0 : t
}

function Ae(t, e, r) {
  if (ln && hr) {
    let n = Zf.get(t);
    n || Zf.set(t, n = new Map);
    let i = n.get(r);
    i || n.set(r, i = Eh()), Gm(i)
  }
}

function Gm(t, e) {
  let r = !1;
  Ua <= jf ? Vm(t) || (t.n |= yn, r = !Hm(t)) : r = !t.has(hr), r && (t.add(hr), hr.deps.push(t))
}

function Rr(t, e, r, n, i, a) {
  const o = Zf.get(t);
  if (!o) return;
  let s = [];
  if (e === "clear") s = [...o.values()];
  else if (r === "length" && ot(t)) o.forEach((l, u) => {
    (u === "length" || u >= n) && s.push(l)
  });
  else switch (r !== void 0 && s.push(o.get(r)), e) {
    case "add":
      ot(t) ? Ih(r) && s.push(o.get("length")) : (s.push(o.get(ei)), Xi(t) && s.push(o.get(Qf)));
      break;
    case "delete":
      ot(t) || (s.push(o.get(ei)), Xi(t) && s.push(o.get(Qf)));
      break;
    case "set":
      Xi(t) && s.push(o.get(ei));
      break
  }
  if (s.length === 1) s[0] && Jf(s[0]);
  else {
    const l = [];
    for (const u of s) u && l.push(...u);
    Jf(Eh(l))
  }
}

function Jf(t, e) {
  for (const r of ot(t) ? t : [...t])(r !== hr || r.allowRecurse) && (r.scheduler ? r.scheduler() : r.run())
}
const mb = bh("__proto__,__v_isRef,__isVue"),
  Wm = new Set(Object.getOwnPropertyNames(Symbol).map(t => Symbol[t]).filter(Ah)),
  _b = Rh(),
  wb = Rh(!1, !0),
  Sb = Rh(!0),
  hd = bb();

function bb() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(e => {
    t[e] = function (...r) {
      const n = xt(this);
      for (let a = 0, o = this.length; a < o; a++) Ae(n, "get", a + "");
      const i = n[e](...r);
      return i === -1 || i === !1 ? n[e](...r.map(xt)) : i
    }
  }), ["push", "pop", "shift", "unshift", "splice"].forEach(e => {
    t[e] = function (...r) {
      ha();
      const n = xt(this)[e].apply(this, r);
      return va(), n
    }
  }), t
}

function Rh(t = !1, e = !1) {
  return function (n, i, a) {
    if (i === "__v_isReactive") return !t;
    if (i === "__v_isReadonly") return t;
    if (i === "__v_isShallow") return e;
    if (i === "__v_raw" && a === (t ? e ? Fb : Km : e ? qm : Xm).get(n)) return n;
    const o = ot(n);
    if (!t && o && bt(hd, i)) return Reflect.get(hd, i, a);
    const s = Reflect.get(n, i, a);
    return (Ah(i) ? Wm.has(i) : mb(i)) || (t || Ae(n, "get", i), e) ? s : Gt(s) ? !o || !Ih(i) ? s.value : s : Wt(s) ? t ? Zm(s) : da(s) : s
  }
}
const xb = Um(),
  Cb = Um(!0);

function Um(t = !1) {
  return function (r, n, i, a) {
    let o = r[n];
    if (bo(o) && Gt(o) && !Gt(i)) return !1;
    if (!t && !bo(i) && (jm(i) || (i = xt(i), o = xt(o)), !ot(r) && Gt(o) && !Gt(i))) return o.value = i, !0;
    const s = ot(r) && Ih(n) ? Number(n) < r.length : bt(r, n),
      l = Reflect.set(r, n, i, a);
    return r === xt(a) && (s ? So(i, o) && Rr(r, "set", n, i) : Rr(r, "add", n, i)), l
  }
}

function Tb(t, e) {
  const r = bt(t, e);
  t[e];
  const n = Reflect.deleteProperty(t, e);
  return n && r && Rr(t, "delete", e, void 0), n
}

function Mb(t, e) {
  const r = Reflect.has(t, e);
  return (!Ah(e) || !Wm.has(e)) && Ae(t, "has", e), r
}

function Db(t) {
  return Ae(t, "iterate", ot(t) ? "length" : ei), Reflect.ownKeys(t)
}
const Ym = {
    get: _b,
    set: xb,
    deleteProperty: Tb,
    has: Mb,
    ownKeys: Db
  },
  Ab = {
    get: Sb,
    set(t, e) {
      return !0
    },
    deleteProperty(t, e) {
      return !0
    }
  },
  Pb = Jt({}, Ym, {
    get: wb,
    set: Cb
  }),
  Oh = t => t,
  Yl = t => Reflect.getPrototypeOf(t);

function rs(t, e, r = !1, n = !1) {
  t = t.__v_raw;
  const i = xt(t),
    a = xt(e);
  e !== a && !r && Ae(i, "get", e), !r && Ae(i, "get", a);
  const {
    has: o
  } = Yl(i), s = n ? Oh : r ? Nh : xo;
  if (o.call(i, e)) return s(t.get(e));
  if (o.call(i, a)) return s(t.get(a));
  t !== i && t.get(e)
}

function ns(t, e = !1) {
  const r = this.__v_raw,
    n = xt(r),
    i = xt(t);
  return t !== i && !e && Ae(n, "has", t), !e && Ae(n, "has", i), t === i ? r.has(t) : r.has(t) || r.has(i)
}

function is(t, e = !1) {
  return t = t.__v_raw, !e && Ae(xt(t), "iterate", ei), Reflect.get(t, "size", t)
}

function vd(t) {
  t = xt(t);
  const e = xt(this);
  return Yl(e).has.call(e, t) || (e.add(t), Rr(e, "add", t, t)), this
}

function dd(t, e) {
  e = xt(e);
  const r = xt(this),
    {
      has: n,
      get: i
    } = Yl(r);
  let a = n.call(r, t);
  a || (t = xt(t), a = n.call(r, t));
  const o = i.call(r, t);
  return r.set(t, e), a ? So(e, o) && Rr(r, "set", t, e) : Rr(r, "add", t, e), this
}

function pd(t) {
  const e = xt(this),
    {
      has: r,
      get: n
    } = Yl(e);
  let i = r.call(e, t);
  i || (t = xt(t), i = r.call(e, t)), n && n.call(e, t);
  const a = e.delete(t);
  return i && Rr(e, "delete", t, void 0), a
}

function gd() {
  const t = xt(this),
    e = t.size !== 0,
    r = t.clear();
  return e && Rr(t, "clear", void 0, void 0), r
}

function as(t, e) {
  return function (n, i) {
    const a = this,
      o = a.__v_raw,
      s = xt(o),
      l = e ? Oh : t ? Nh : xo;
    return !t && Ae(s, "iterate", ei), o.forEach((u, f) => n.call(i, l(u), l(f), a))
  }
}

function os(t, e, r) {
  return function (...n) {
    const i = this.__v_raw,
      a = xt(i),
      o = Xi(a),
      s = t === "entries" || t === Symbol.iterator && o,
      l = t === "keys" && o,
      u = i[t](...n),
      f = r ? Oh : e ? Nh : xo;
    return !e && Ae(a, "iterate", l ? Qf : ei), {
      next() {
        const {
          value: c,
          done: h
        } = u.next();
        return h ? {
          value: c,
          done: h
        } : {
          value: s ? [f(c[0]), f(c[1])] : f(c),
          done: h
        }
      },
      [Symbol.iterator]() {
        return this
      }
    }
  }
}

function Vr(t) {
  return function (...e) {
    return t === "delete" ? !1 : this
  }
}

function Ib() {
  const t = {
      get(a) {
        return rs(this, a)
      },
      get size() {
        return is(this)
      },
      has: ns,
      add: vd,
      set: dd,
      delete: pd,
      clear: gd,
      forEach: as(!1, !1)
    },
    e = {
      get(a) {
        return rs(this, a, !1, !0)
      },
      get size() {
        return is(this)
      },
      has: ns,
      add: vd,
      set: dd,
      delete: pd,
      clear: gd,
      forEach: as(!1, !0)
    },
    r = {
      get(a) {
        return rs(this, a, !0)
      },
      get size() {
        return is(this, !0)
      },
      has(a) {
        return ns.call(this, a, !0)
      },
      add: Vr("add"),
      set: Vr("set"),
      delete: Vr("delete"),
      clear: Vr("clear"),
      forEach: as(!0, !1)
    },
    n = {
      get(a) {
        return rs(this, a, !0, !0)
      },
      get size() {
        return is(this, !0)
      },
      has(a) {
        return ns.call(this, a, !0)
      },
      add: Vr("add"),
      set: Vr("set"),
      delete: Vr("delete"),
      clear: Vr("clear"),
      forEach: as(!0, !0)
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach(a => {
    t[a] = os(a, !1, !1), r[a] = os(a, !0, !1), e[a] = os(a, !1, !0), n[a] = os(a, !0, !0)
  }), [t, r, e, n]
}
const [Eb, Lb, Rb, Ob] = Ib();

function kh(t, e) {
  const r = e ? t ? Ob : Rb : t ? Lb : Eb;
  return (n, i, a) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? n : Reflect.get(bt(r, i) && i in n ? r : n, i, a)
}
const kb = {
    get: kh(!1, !1)
  },
  Bb = {
    get: kh(!1, !0)
  },
  Nb = {
    get: kh(!0, !1)
  },
  Xm = new WeakMap,
  qm = new WeakMap,
  Km = new WeakMap,
  Fb = new WeakMap;

function zb(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0
  }
}

function Hb(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : zb(cb(t))
}

function da(t) {
  return bo(t) ? t : Bh(t, !1, Ym, kb, Xm)
}

function Vb(t) {
  return Bh(t, !1, Pb, Bb, qm)
}

function Zm(t) {
  return Bh(t, !0, Ab, Nb, Km)
}

function Bh(t, e, r, n, i) {
  if (!Wt(t) || t.__v_raw && !(e && t.__v_isReactive)) return t;
  const a = i.get(t);
  if (a) return a;
  const o = Hb(t);
  if (o === 0) return t;
  const s = new Proxy(t, o === 2 ? n : r);
  return i.set(t, s), s
}

function un(t) {
  return bo(t) ? un(t.__v_raw) : !!(t && t.__v_isReactive)
}

function bo(t) {
  return !!(t && t.__v_isReadonly)
}

function jm(t) {
  return !!(t && t.__v_isShallow)
}

function Qm(t) {
  return un(t) || bo(t)
}

function xt(t) {
  const e = t && t.__v_raw;
  return e ? xt(e) : t
}

function ea(t) {
  return cl(t, "__v_skip", !0), t
}
const xo = t => Wt(t) ? da(t) : t,
  Nh = t => Wt(t) ? Zm(t) : t;

function Jm(t) {
  ln && hr && (t = xt(t), Gm(t.dep || (t.dep = Eh())))
}

function t0(t, e) {
  t = xt(t), t.dep && Jf(t.dep)
}

function Gt(t) {
  return !!(t && t.__v_isRef === !0)
}

function Fh(t) {
  return e0(t, !1)
}

function $b(t) {
  return e0(t, !0)
}

function e0(t, e) {
  return Gt(t) ? t : new Gb(t, e)
}
class Gb {
  constructor(e, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? e : xt(e), this._value = r ? e : xo(e)
  }
  get value() {
    return Jm(this), this._value
  }
  set value(e) {
    e = this.__v_isShallow ? e : xt(e), So(e, this._rawValue) && (this._rawValue = e, this._value = this.__v_isShallow ? e : xo(e), t0(this))
  }
}

function to(t) {
  return Gt(t) ? t.value : t
}
const Wb = {
  get: (t, e, r) => to(Reflect.get(t, e, r)),
  set: (t, e, r, n) => {
    const i = t[e];
    return Gt(i) && !Gt(r) ? (i.value = r, !0) : Reflect.set(t, e, r, n)
  }
};

function r0(t) {
  return un(t) ? t : new Proxy(t, Wb)
}

function Ub(t) {
  const e = ot(t) ? new Array(t.length) : {};
  for (const r in t) e[r] = Xb(t, r);
  return e
}
class Yb {
  constructor(e, r, n) {
    this._object = e, this._key = r, this._defaultValue = n, this.__v_isRef = !0
  }
  get value() {
    const e = this._object[this._key];
    return e === void 0 ? this._defaultValue : e
  }
  set value(e) {
    this._object[this._key] = e
  }
}

function Xb(t, e, r) {
  const n = t[e];
  return Gt(n) ? n : new Yb(t, e, r)
}
class qb {
  constructor(e, r, n, i) {
    this._setter = r, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new Lh(e, () => {
      this._dirty || (this._dirty = !0, t0(this))
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = n
  }
  get value() {
    const e = xt(this);
    return Jm(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value
  }
  set value(e) {
    this._setter(e)
  }
}

function Kb(t, e, r = !1) {
  let n, i;
  const a = ht(t);
  return a ? (n = t, i = rr) : (n = t.get, i = t.set), new qb(n, i, a || !i, r)
}
Promise.resolve();

function fn(t, e, r, n) {
  let i;
  try {
    i = n ? t(...n) : t()
  } catch (a) {
    Xo(a, e, r)
  }
  return i
}

function Ue(t, e, r, n) {
  if (ht(t)) {
    const a = fn(t, e, r, n);
    return a && Ph(a) && a.catch(o => {
      Xo(o, e, r)
    }), a
  }
  const i = [];
  for (let a = 0; a < t.length; a++) i.push(Ue(t[a], e, r, n));
  return i
}

function Xo(t, e, r, n = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let a = e.parent;
    const o = e.proxy,
      s = r;
    for (; a;) {
      const u = a.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](t, o, s) === !1) return
      }
      a = a.parent
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      fn(l, null, 10, [t, o, s]);
      return
    }
  }
  Zb(t, r, i, n)
}

function Zb(t, e, r, n = !0) {
  console.error(t)
}
let hl = !1,
  tc = !1;
const Ce = [];
let Mr = 0;
const eo = [];
let Ya = null,
  Bi = 0;
const ro = [];
let tn = null,
  Ni = 0;
const n0 = Promise.resolve();
let zh = null,
  ec = null;

function Hh(t) {
  const e = zh || n0;
  return t ? e.then(this ? t.bind(this) : t) : e
}

function jb(t) {
  let e = Mr + 1,
    r = Ce.length;
  for (; e < r;) {
    const n = e + r >>> 1;
    Co(Ce[n]) < t ? e = n + 1 : r = n
  }
  return e
}

function i0(t) {
  (!Ce.length || !Ce.includes(t, hl && t.allowRecurse ? Mr + 1 : Mr)) && t !== ec && (t.id == null ? Ce.push(t) : Ce.splice(jb(t.id), 0, t), a0())
}

function a0() {
  !hl && !tc && (tc = !0, zh = n0.then(u0))
}

function Qb(t) {
  const e = Ce.indexOf(t);
  e > Mr && Ce.splice(e, 1)
}

function o0(t, e, r, n) {
  ot(t) ? r.push(...t) : (!e || !e.includes(t, t.allowRecurse ? n + 1 : n)) && r.push(t), a0()
}

function Jb(t) {
  o0(t, Ya, eo, Bi)
}

function s0(t) {
  o0(t, tn, ro, Ni)
}

function Vh(t, e = null) {
  if (eo.length) {
    for (ec = e, Ya = [...new Set(eo)], eo.length = 0, Bi = 0; Bi < Ya.length; Bi++) Ya[Bi]();
    Ya = null, Bi = 0, ec = null, Vh(t, e)
  }
}

function l0(t) {
  if (ro.length) {
    const e = [...new Set(ro)];
    if (ro.length = 0, tn) {
      tn.push(...e);
      return
    }
    for (tn = e, tn.sort((r, n) => Co(r) - Co(n)), Ni = 0; Ni < tn.length; Ni++) tn[Ni]();
    tn = null, Ni = 0
  }
}
const Co = t => t.id == null ? 1 / 0 : t.id;

function u0(t) {
  tc = !1, hl = !0, Vh(t), Ce.sort((r, n) => Co(r) - Co(n));
  const e = rr;
  try {
    for (Mr = 0; Mr < Ce.length; Mr++) {
      const r = Ce[Mr];
      r && r.active !== !1 && fn(r, null, 14)
    }
  } finally {
    Mr = 0, Ce.length = 0, l0(), hl = !1, zh = null, (Ce.length || eo.length || ro.length) && u0(t)
  }
}

function tx(t, e, ...r) {
  const n = t.vnode.props || Rt;
  let i = r;
  const a = e.startsWith("update:"),
    o = a && e.slice(7);
  if (o && o in n) {
    const f = `${o==="modelValue"?"model":o}Modifiers`,
      {
        number: c,
        trim: h
      } = n[f] || Rt;
    h ? i = r.map(v => v.trim()) : c && (i = r.map(ta))
  }
  let s, l = n[s = Mu(e)] || n[s = Mu(gr(e))];
  !l && a && (l = n[s = Mu(ca(e))]), l && Ue(l, t, 6, i);
  const u = n[s + "Once"];
  if (u) {
    if (!t.emitted) t.emitted = {};
    else if (t.emitted[s]) return;
    t.emitted[s] = !0, Ue(u, t, 6, i)
  }
}

function f0(t, e, r = !1) {
  const n = e.emitsCache,
    i = n.get(t);
  if (i !== void 0) return i;
  const a = t.emits;
  let o = {},
    s = !1;
  if (!ht(t)) {
    const l = u => {
      const f = f0(u, e, !0);
      f && (s = !0, Jt(o, f))
    };
    !r && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l)
  }
  return !a && !s ? (n.set(t, null), null) : (ot(a) ? a.forEach(l => o[l] = null) : Jt(o, a), n.set(t, o), o)
}

function $h(t, e) {
  return !t || !$l(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), bt(t, e[0].toLowerCase() + e.slice(1)) || bt(t, ca(e)) || bt(t, e))
}
let Me = null,
  Xl = null;

function vl(t) {
  const e = Me;
  return Me = t, Xl = t && t.type.__scopeId || null, e
}

function ZB(t) {
  Xl = t
}

function jB() {
  Xl = null
}

function ex(t, e = Me, r) {
  if (!e || t._n) return t;
  const n = (...i) => {
    n._d && Ad(-1);
    const a = vl(e),
      o = t(...i);
    return vl(a), n._d && Ad(1), o
  };
  return n._n = !0, n._c = !0, n._d = !0, n
}

function Du(t) {
  const {
    type: e,
    vnode: r,
    proxy: n,
    withProxy: i,
    props: a,
    propsOptions: [o],
    slots: s,
    attrs: l,
    emit: u,
    render: f,
    renderCache: c,
    data: h,
    setupState: v,
    ctx: d,
    inheritAttrs: y
  } = t;
  let g, p;
  const m = vl(t);
  try {
    if (r.shapeFlag & 4) {
      const w = i || n;
      g = Je(f.call(w, w, c, a, v, h, d)), p = l
    } else {
      const w = e;
      g = Je(w.length > 1 ? w(a, {
        attrs: l,
        slots: s,
        emit: u
      }) : w(a, null)), p = e.props ? l : nx(l)
    }
  } catch (w) {
    io.length = 0, Xo(w, t, 1), g = ie(Pe)
  }
  let _ = g;
  if (p && y !== !1) {
    const w = Object.keys(p),
      {
        shapeFlag: b
      } = _;
    w.length && b & 7 && (o && w.some(Mh) && (p = ix(p, o)), _ = ra(_, p))
  }
  return r.dirs && (_.dirs = _.dirs ? _.dirs.concat(r.dirs) : r.dirs), r.transition && (_.transition = r.transition), g = _, vl(m), g
}

function rx(t) {
  let e;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (Do(n)) {
      if (n.type !== Pe || n.children === "v-if") {
        if (e) return;
        e = n
      }
    } else return
  }
  return e
}
const nx = t => {
    let e;
    for (const r in t)(r === "class" || r === "style" || $l(r)) && ((e || (e = {}))[r] = t[r]);
    return e
  },
  ix = (t, e) => {
    const r = {};
    for (const n in t)(!Mh(n) || !(n.slice(9) in e)) && (r[n] = t[n]);
    return r
  };

function ax(t, e, r) {
  const {
    props: n,
    children: i,
    component: a
  } = t, {
    props: o,
    children: s,
    patchFlag: l
  } = e, u = a.emitsOptions;
  if (e.dirs || e.transition) return !0;
  if (r && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return n ? yd(n, o, u) : !!o;
    if (l & 8) {
      const f = e.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        const h = f[c];
        if (o[h] !== n[h] && !$h(u, h)) return !0
      }
    }
  } else return (i || s) && (!s || !s.$stable) ? !0 : n === o ? !1 : n ? o ? yd(n, o, u) : !0 : !!o;
  return !1
}

function yd(t, e, r) {
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (e[a] !== t[a] && !$h(r, a)) return !0
  }
  return !1
}

function Gh({
  vnode: t,
  parent: e
}, r) {
  for (; e && e.subTree === t;)(t = e.vnode).el = r, e = e.parent
}
const ox = t => t.__isSuspense,
  sx = {
    name: "Suspense",
    __isSuspense: !0,
    process(t, e, r, n, i, a, o, s, l, u) {
      t == null ? lx(e, r, n, i, a, o, s, l, u) : ux(t, e, r, n, i, o, s, l, u)
    },
    hydrate: fx,
    create: Wh,
    normalize: cx
  },
  QB = sx;

function To(t, e) {
  const r = t.props && t.props[e];
  ht(r) && r()
}

function lx(t, e, r, n, i, a, o, s, l) {
  const {
    p: u,
    o: {
      createElement: f
    }
  } = l, c = f("div"), h = t.suspense = Wh(t, i, n, e, c, r, a, o, s, l);
  u(null, h.pendingBranch = t.ssContent, c, null, n, h, a, o), h.deps > 0 ? (To(t, "onPending"), To(t, "onFallback"), u(null, t.ssFallback, e, r, n, null, a, o), qi(h, t.ssFallback)) : h.resolve()
}

function ux(t, e, r, n, i, a, o, s, {
  p: l,
  um: u,
  o: {
    createElement: f
  }
}) {
  const c = e.suspense = t.suspense;
  c.vnode = e, e.el = t.el;
  const h = e.ssContent,
    v = e.ssFallback,
    {
      activeBranch: d,
      pendingBranch: y,
      isInFallback: g,
      isHydrating: p
    } = c;
  if (y) c.pendingBranch = h, fr(h, y) ? (l(y, h, c.hiddenContainer, null, i, c, a, o, s), c.deps <= 0 ? c.resolve() : g && (l(d, v, r, n, i, null, a, o, s), qi(c, v))) : (c.pendingId++, p ? (c.isHydrating = !1, c.activeBranch = y) : u(y, i, c), c.deps = 0, c.effects.length = 0, c.hiddenContainer = f("div"), g ? (l(null, h, c.hiddenContainer, null, i, c, a, o, s), c.deps <= 0 ? c.resolve() : (l(d, v, r, n, i, null, a, o, s), qi(c, v))) : d && fr(h, d) ? (l(d, h, r, n, i, c, a, o, s), c.resolve(!0)) : (l(null, h, c.hiddenContainer, null, i, c, a, o, s), c.deps <= 0 && c.resolve()));
  else if (d && fr(h, d)) l(d, h, r, n, i, c, a, o, s), qi(c, h);
  else if (To(e, "onPending"), c.pendingBranch = h, c.pendingId++, l(null, h, c.hiddenContainer, null, i, c, a, o, s), c.deps <= 0) c.resolve();
  else {
    const {
      timeout: m,
      pendingId: _
    } = c;
    m > 0 ? setTimeout(() => {
      c.pendingId === _ && c.fallback(v)
    }, m) : m === 0 && c.fallback(v)
  }
}

function Wh(t, e, r, n, i, a, o, s, l, u, f = !1) {
  const {
    p: c,
    m: h,
    um: v,
    n: d,
    o: {
      parentNode: y,
      remove: g
    }
  } = u, p = ta(t.props && t.props.timeout), m = {
    vnode: t,
    parent: e,
    parentComponent: r,
    isSVG: o,
    container: n,
    hiddenContainer: i,
    anchor: a,
    deps: 0,
    pendingId: 0,
    timeout: typeof p == "number" ? p : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !0,
    isHydrating: f,
    isUnmounted: !1,
    effects: [],
    resolve(_ = !1) {
      const {
        vnode: w,
        activeBranch: b,
        pendingBranch: S,
        pendingId: x,
        effects: T,
        parentComponent: M,
        container: D
      } = m;
      if (m.isHydrating) m.isHydrating = !1;
      else if (!_) {
        const L = b && S.transition && S.transition.mode === "out-in";
        L && (b.transition.afterLeave = () => {
          x === m.pendingId && h(S, D, O, 0)
        });
        let {
          anchor: O
        } = m;
        b && (O = d(b), v(b, M, m, !0)), L || h(S, D, O, 0)
      }
      qi(m, S), m.pendingBranch = null, m.isInFallback = !1;
      let I = m.parent,
        A = !1;
      for (; I;) {
        if (I.pendingBranch) {
          I.effects.push(...T), A = !0;
          break
        }
        I = I.parent
      }
      A || s0(T), m.effects = [], To(w, "onResolve")
    },
    fallback(_) {
      if (!m.pendingBranch) return;
      const {
        vnode: w,
        activeBranch: b,
        parentComponent: S,
        container: x,
        isSVG: T
      } = m;
      To(w, "onFallback");
      const M = d(b),
        D = () => {
          !m.isInFallback || (c(null, _, x, M, S, null, T, s, l), qi(m, _))
        },
        I = _.transition && _.transition.mode === "out-in";
      I && (b.transition.afterLeave = D), m.isInFallback = !0, v(b, S, null, !0), I || D()
    },
    move(_, w, b) {
      m.activeBranch && h(m.activeBranch, _, w, b), m.container = _
    },
    next() {
      return m.activeBranch && d(m.activeBranch)
    },
    registerDep(_, w) {
      const b = !!m.pendingBranch;
      b && m.deps++;
      const S = _.vnode.el;
      _.asyncDep.catch(x => {
        Xo(x, _, 0)
      }).then(x => {
        if (_.isUnmounted || m.isUnmounted || m.pendingId !== _.suspenseId) return;
        _.asyncResolved = !0;
        const {
          vnode: T
        } = _;
        fc(_, x, !1), S && (T.el = S);
        const M = !S && _.subTree.el;
        w(_, T, y(S || _.subTree.el), S ? null : d(_.subTree), m, o, l), M && g(M), Gh(_, T.el), b && --m.deps === 0 && m.resolve()
      })
    },
    unmount(_, w) {
      m.isUnmounted = !0, m.activeBranch && v(m.activeBranch, r, _, w), m.pendingBranch && v(m.pendingBranch, r, _, w)
    }
  };
  return m
}

function fx(t, e, r, n, i, a, o, s, l) {
  const u = e.suspense = Wh(e, n, r, t.parentNode, document.createElement("div"), null, i, a, o, s, !0),
    f = l(t, u.pendingBranch = e.ssContent, r, u, a, o);
  return u.deps === 0 && u.resolve(), f
}

function cx(t) {
  const {
    shapeFlag: e,
    children: r
  } = t, n = e & 32;
  t.ssContent = md(n ? r.default : r), t.ssFallback = n ? md(r.fallback) : ie(Pe)
}

function md(t) {
  let e;
  if (ht(t)) {
    const r = Mo && t._c;
    r && (t._d = !1, Kh()), t = t(), r && (t._d = !0, e = cn, E0())
  }
  return ot(t) && (t = rx(t)), t = Je(t), e && !t.dynamicChildren && (t.dynamicChildren = e.filter(r => r !== t)), t
}

function hx(t, e) {
  e && e.pendingBranch ? ot(t) ? e.effects.push(...t) : e.effects.push(t) : s0(t)
}

function qi(t, e) {
  t.activeBranch = e;
  const {
    vnode: r,
    parentComponent: n
  } = t, i = r.el = e.el;
  n && n.subTree === r && (n.vnode.el = i, Gh(n, i))
}

function Xs(t, e) {
  if (Zt) {
    let r = Zt.provides;
    const n = Zt.parent && Zt.parent.provides;
    n === r && (r = Zt.provides = Object.create(n)), r[t] = e
  }
}

function Ir(t, e, r = !1) {
  const n = Zt || Me;
  if (n) {
    const i = n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return r && ht(e) ? e.call(n.proxy) : e
  }
}
const _d = {};

function no(t, e, r) {
  return c0(t, e, r)
}

function c0(t, e, {
  immediate: r,
  deep: n,
  flush: i,
  onTrack: a,
  onTrigger: o
} = Rt) {
  const s = Zt;
  let l, u = !1,
    f = !1;
  if (Gt(t) ? (l = () => t.value, u = jm(t)) : un(t) ? (l = () => t, n = !0) : ot(t) ? (f = !0, u = t.some(un), l = () => t.map(p => {
      if (Gt(p)) return p.value;
      if (un(p)) return Qn(p);
      if (ht(p)) return fn(p, s, 2)
    })) : ht(t) ? e ? l = () => fn(t, s, 2) : l = () => {
      if (!(s && s.isUnmounted)) return c && c(), Ue(t, s, 3, [h])
    } : l = rr, e && n) {
    const p = l;
    l = () => Qn(p())
  }
  let c, h = p => {
    c = g.onStop = () => {
      fn(p, s, 4)
    }
  };
  if (Ao) return h = rr, e ? r && Ue(e, s, 3, [l(), f ? [] : void 0, h]) : l(), rr;
  let v = f ? [] : _d;
  const d = () => {
    if (!!g.active)
      if (e) {
        const p = g.run();
        (n || u || (f ? p.some((m, _) => So(m, v[_])) : So(p, v))) && (c && c(), Ue(e, s, 3, [p, v === _d ? void 0 : v, h]), v = p)
      } else g.run()
  };
  d.allowRecurse = !!e;
  let y;
  i === "sync" ? y = d : i === "post" ? y = () => pe(d, s && s.suspense) : y = () => {
    !s || s.isMounted ? Jb(d) : d()
  };
  const g = new Lh(l, y);
  return e ? r ? d() : v = g.run() : i === "post" ? pe(g.run.bind(g), s && s.suspense) : g.run(), () => {
    g.stop(), s && s.scope && Dh(s.scope.effects, g)
  }
}

function vx(t, e, r) {
  const n = this.proxy,
    i = qt(t) ? t.includes(".") ? h0(n, t) : () => n[t] : t.bind(n, n);
  let a;
  ht(e) ? a = e : (a = e.handler, r = e);
  const o = Zt;
  mn(this);
  const s = c0(i, a.bind(n), r);
  return o ? mn(o) : hn(), s
}

function h0(t, e) {
  const r = e.split(".");
  return () => {
    let n = t;
    for (let i = 0; i < r.length && n; i++) n = n[r[i]];
    return n
  }
}

function Qn(t, e) {
  if (!Wt(t) || t.__v_skip || (e = e || new Set, e.has(t))) return t;
  if (e.add(t), Gt(t)) Qn(t.value, e);
  else if (ot(t))
    for (let r = 0; r < t.length; r++) Qn(t[r], e);
  else if (fa(t) || Xi(t)) t.forEach(r => {
    Qn(r, e)
  });
  else if (Nm(t))
    for (const r in t) Qn(t[r], e);
  return t
}

function dx() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map
  };
  return m0(() => {
    t.isMounted = !0
  }), _0(() => {
    t.isUnmounting = !0
  }), t
}
const Ee = [Function, Array],
  px = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ee,
      onEnter: Ee,
      onAfterEnter: Ee,
      onEnterCancelled: Ee,
      onBeforeLeave: Ee,
      onLeave: Ee,
      onAfterLeave: Ee,
      onLeaveCancelled: Ee,
      onBeforeAppear: Ee,
      onAppear: Ee,
      onAfterAppear: Ee,
      onAppearCancelled: Ee
    },
    setup(t, {
      slots: e
    }) {
      const r = jl(),
        n = dx();
      let i;
      return () => {
        const a = e.default && p0(e.default(), !0);
        if (!a || !a.length) return;
        const o = xt(t),
          {
            mode: s
          } = o,
          l = a[0];
        if (n.isLeaving) return Au(l);
        const u = wd(l);
        if (!u) return Au(l);
        const f = rc(u, o, n, r);
        nc(u, f);
        const c = r.subTree,
          h = c && wd(c);
        let v = !1;
        const {
          getTransitionKey: d
        } = u.type;
        if (d) {
          const y = d();
          i === void 0 ? i = y : y !== i && (i = y, v = !0)
        }
        if (h && h.type !== Pe && (!fr(u, h) || v)) {
          const y = rc(h, o, n, r);
          if (nc(h, y), s === "out-in") return n.isLeaving = !0, y.afterLeave = () => {
            n.isLeaving = !1, r.update()
          }, Au(l);
          s === "in-out" && u.type !== Pe && (y.delayLeave = (g, p, m) => {
            const _ = d0(n, h);
            _[String(h.key)] = h, g._leaveCb = () => {
              p(), g._leaveCb = void 0, delete f.delayedLeave
            }, f.delayedLeave = m
          })
        }
        return l
      }
    }
  },
  v0 = px;

function d0(t, e) {
  const {
    leavingVNodes: r
  } = t;
  let n = r.get(e.type);
  return n || (n = Object.create(null), r.set(e.type, n)), n
}

function rc(t, e, r, n) {
  const {
    appear: i,
    mode: a,
    persisted: o = !1,
    onBeforeEnter: s,
    onEnter: l,
    onAfterEnter: u,
    onEnterCancelled: f,
    onBeforeLeave: c,
    onLeave: h,
    onAfterLeave: v,
    onLeaveCancelled: d,
    onBeforeAppear: y,
    onAppear: g,
    onAfterAppear: p,
    onAppearCancelled: m
  } = e, _ = String(t.key), w = d0(r, t), b = (x, T) => {
    x && Ue(x, n, 9, T)
  }, S = {
    mode: a,
    persisted: o,
    beforeEnter(x) {
      let T = s;
      if (!r.isMounted)
        if (i) T = y || s;
        else return;
      x._leaveCb && x._leaveCb(!0);
      const M = w[_];
      M && fr(t, M) && M.el._leaveCb && M.el._leaveCb(), b(T, [x])
    },
    enter(x) {
      let T = l,
        M = u,
        D = f;
      if (!r.isMounted)
        if (i) T = g || l, M = p || u, D = m || f;
        else return;
      let I = !1;
      const A = x._enterCb = L => {
        I || (I = !0, L ? b(D, [x]) : b(M, [x]), S.delayedLeave && S.delayedLeave(), x._enterCb = void 0)
      };
      T ? (T(x, A), T.length <= 1 && A()) : A()
    },
    leave(x, T) {
      const M = String(t.key);
      if (x._enterCb && x._enterCb(!0), r.isUnmounting) return T();
      b(c, [x]);
      let D = !1;
      const I = x._leaveCb = A => {
        D || (D = !0, T(), A ? b(d, [x]) : b(v, [x]), x._leaveCb = void 0, w[M] === t && delete w[M])
      };
      w[M] = t, h ? (h(x, I), h.length <= 1 && I()) : I()
    },
    clone(x) {
      return rc(x, e, r, n)
    }
  };
  return S
}

function Au(t) {
  if (ql(t)) return t = ra(t), t.children = null, t
}

function wd(t) {
  return ql(t) ? t.children ? t.children[0] : void 0 : t
}

function nc(t, e) {
  t.shapeFlag & 6 && t.component ? nc(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e
}

function p0(t, e = !1) {
  let r = [],
    n = 0;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    a.type === ze ? (a.patchFlag & 128 && n++, r = r.concat(p0(a.children, e))) : (e || a.type !== Pe) && r.push(a)
  }
  if (n > 1)
    for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r
}

function g0(t) {
  return ht(t) ? {
    setup: t,
    name: t.name
  } : t
}
const ic = t => !!t.type.__asyncLoader,
  ql = t => t.type.__isKeepAlive;

function gx(t, e) {
  y0(t, "a", e)
}

function yx(t, e) {
  y0(t, "da", e)
}

function y0(t, e, r = Zt) {
  const n = t.__wdc || (t.__wdc = () => {
    let i = r;
    for (; i;) {
      if (i.isDeactivated) return;
      i = i.parent
    }
    return t()
  });
  if (Kl(e, n, r), r) {
    let i = r.parent;
    for (; i && i.parent;) ql(i.parent.vnode) && mx(n, e, r, i), i = i.parent
  }
}

function mx(t, e, r, n) {
  const i = Kl(e, t, n, !0);
  Uh(() => {
    Dh(n[e], i)
  }, r)
}

function Kl(t, e, r = Zt, n = !1) {
  if (r) {
    const i = r[t] || (r[t] = []),
      a = e.__weh || (e.__weh = (...o) => {
        if (r.isUnmounted) return;
        ha(), mn(r);
        const s = Ue(e, r, t, o);
        return hn(), va(), s
      });
    return n ? i.unshift(a) : i.push(a), a
  }
}
const Nr = t => (e, r = Zt) => (!Ao || t === "sp") && Kl(t, e, r),
  _x = Nr("bm"),
  m0 = Nr("m"),
  Sx = Nr("bu"),
  bx = Nr("u"),
  _0 = Nr("bum"),
  Uh = Nr("um"),
  xx = Nr("sp"),
  Cx = Nr("rtg"),
  Tx = Nr("rtc");

function Mx(t, e = Zt) {
  Kl("ec", t, e)
}
let ac = !0;

function Dx(t) {
  const e = S0(t),
    r = t.proxy,
    n = t.ctx;
  ac = !1, e.beforeCreate && Sd(e.beforeCreate, t, "bc");
  const {
    data: i,
    computed: a,
    methods: o,
    watch: s,
    provide: l,
    inject: u,
    created: f,
    beforeMount: c,
    mounted: h,
    beforeUpdate: v,
    updated: d,
    activated: y,
    deactivated: g,
    beforeDestroy: p,
    beforeUnmount: m,
    destroyed: _,
    unmounted: w,
    render: b,
    renderTracked: S,
    renderTriggered: x,
    errorCaptured: T,
    serverPrefetch: M,
    expose: D,
    inheritAttrs: I,
    components: A,
    directives: L,
    filters: O
  } = e;
  if (u && Ax(u, n, null, t.appContext.config.unwrapInjectedRef), o)
    for (const Q in o) {
      const G = o[Q];
      ht(G) && (n[Q] = G.bind(r))
    }
  if (i) {
    const Q = i.call(r, r);
    Wt(Q) && (t.data = da(Q))
  }
  if (ac = !0, a)
    for (const Q in a) {
      const G = a[Q],
        Z = ht(G) ? G.bind(r, r) : ht(G.get) ? G.get.bind(r, r) : rr,
        lt = !ht(G) && ht(G.set) ? G.set.bind(r) : rr,
        _t = tr({
          get: Z,
          set: lt
        });
      Object.defineProperty(n, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => _t.value,
        set: yt => _t.value = yt
      })
    }
  if (s)
    for (const Q in s) w0(s[Q], n, r, Q);
  if (l) {
    const Q = ht(l) ? l.call(r) : l;
    Reflect.ownKeys(Q).forEach(G => {
      Xs(G, Q[G])
    })
  }
  f && Sd(f, t, "c");

  function B(Q, G) {
    ot(G) ? G.forEach(Z => Q(Z.bind(r))) : G && Q(G.bind(r))
  }
  if (B(_x, c), B(m0, h), B(Sx, v), B(bx, d), B(gx, y), B(yx, g), B(Mx, T), B(Tx, S), B(Cx, x), B(_0, m), B(Uh, w), B(xx, M), ot(D))
    if (D.length) {
      const Q = t.exposed || (t.exposed = {});
      D.forEach(G => {
        Object.defineProperty(Q, G, {
          get: () => r[G],
          set: Z => r[G] = Z
        })
      })
    } else t.exposed || (t.exposed = {});
  b && t.render === rr && (t.render = b), I != null && (t.inheritAttrs = I), A && (t.components = A), L && (t.directives = L)
}

function Ax(t, e, r = rr, n = !1) {
  ot(t) && (t = oc(t));
  for (const i in t) {
    const a = t[i];
    let o;
    Wt(a) ? "default" in a ? o = Ir(a.from || i, a.default, !0) : o = Ir(a.from || i) : o = Ir(a), Gt(o) && n ? Object.defineProperty(e, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: s => o.value = s
    }) : e[i] = o
  }
}

function Sd(t, e, r) {
  Ue(ot(t) ? t.map(n => n.bind(e.proxy)) : t.bind(e.proxy), e, r)
}

function w0(t, e, r, n) {
  const i = n.includes(".") ? h0(r, n) : () => r[n];
  if (qt(t)) {
    const a = e[t];
    ht(a) && no(i, a)
  } else if (ht(t)) no(i, t.bind(r));
  else if (Wt(t))
    if (ot(t)) t.forEach(a => w0(a, e, r, n));
    else {
      const a = ht(t.handler) ? t.handler.bind(r) : e[t.handler];
      ht(a) && no(i, a, t)
    }
}

function S0(t) {
  const e = t.type,
    {
      mixins: r,
      extends: n
    } = e,
    {
      mixins: i,
      optionsCache: a,
      config: {
        optionMergeStrategies: o
      }
    } = t.appContext,
    s = a.get(e);
  let l;
  return s ? l = s : !i.length && !r && !n ? l = e : (l = {}, i.length && i.forEach(u => dl(l, u, o, !0)), dl(l, e, o)), a.set(e, l), l
}

function dl(t, e, r, n = !1) {
  const {
    mixins: i,
    extends: a
  } = e;
  a && dl(t, a, r, !0), i && i.forEach(o => dl(t, o, r, !0));
  for (const o in e)
    if (!(n && o === "expose")) {
      const s = Px[o] || r && r[o];
      t[o] = s ? s(t[o], e[o]) : e[o]
    } return t
}
const Px = {
  data: bd,
  props: qn,
  emits: qn,
  methods: qn,
  computed: qn,
  beforeCreate: oe,
  created: oe,
  beforeMount: oe,
  mounted: oe,
  beforeUpdate: oe,
  updated: oe,
  beforeDestroy: oe,
  beforeUnmount: oe,
  destroyed: oe,
  unmounted: oe,
  activated: oe,
  deactivated: oe,
  errorCaptured: oe,
  serverPrefetch: oe,
  components: qn,
  directives: qn,
  watch: Ex,
  provide: bd,
  inject: Ix
};

function bd(t, e) {
  return e ? t ? function () {
    return Jt(ht(t) ? t.call(this, this) : t, ht(e) ? e.call(this, this) : e)
  } : e : t
}

function Ix(t, e) {
  return qn(oc(t), oc(e))
}

function oc(t) {
  if (ot(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++) e[t[r]] = t[r];
    return e
  }
  return t
}

function oe(t, e) {
  return t ? [...new Set([].concat(t, e))] : e
}

function qn(t, e) {
  return t ? Jt(Jt(Object.create(null), t), e) : e
}

function Ex(t, e) {
  if (!t) return e;
  if (!e) return t;
  const r = Jt(Object.create(null), t);
  for (const n in e) r[n] = oe(t[n], e[n]);
  return r
}

function Lx(t, e, r, n = !1) {
  const i = {},
    a = {};
  cl(a, Zl, 1), t.propsDefaults = Object.create(null), b0(t, e, i, a);
  for (const o in t.propsOptions[0]) o in i || (i[o] = void 0);
  r ? t.props = n ? i : Vb(i) : t.type.props ? t.props = i : t.props = a, t.attrs = a
}

function Rx(t, e, r, n) {
  const {
    props: i,
    attrs: a,
    vnode: {
      patchFlag: o
    }
  } = t, s = xt(i), [l] = t.propsOptions;
  let u = !1;
  if ((n || o > 0) && !(o & 16)) {
    if (o & 8) {
      const f = t.vnode.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        let h = f[c];
        const v = e[h];
        if (l)
          if (bt(a, h)) v !== a[h] && (a[h] = v, u = !0);
          else {
            const d = gr(h);
            i[d] = sc(l, s, d, v, t, !1)
          }
        else v !== a[h] && (a[h] = v, u = !0)
      }
    }
  } else {
    b0(t, e, i, a) && (u = !0);
    let f;
    for (const c in s)(!e || !bt(e, c) && ((f = ca(c)) === c || !bt(e, f))) && (l ? r && (r[c] !== void 0 || r[f] !== void 0) && (i[c] = sc(l, s, c, void 0, t, !0)) : delete i[c]);
    if (a !== s)
      for (const c in a)(!e || !bt(e, c) && !0) && (delete a[c], u = !0)
  }
  u && Rr(t, "set", "$attrs")
}

function b0(t, e, r, n) {
  const [i, a] = t.propsOptions;
  let o = !1,
    s;
  if (e)
    for (let l in e) {
      if (Us(l)) continue;
      const u = e[l];
      let f;
      i && bt(i, f = gr(l)) ? !a || !a.includes(f) ? r[f] = u : (s || (s = {}))[f] = u : $h(t.emitsOptions, l) || (!(l in n) || u !== n[l]) && (n[l] = u, o = !0)
    }
  if (a) {
    const l = xt(r),
      u = s || Rt;
    for (let f = 0; f < a.length; f++) {
      const c = a[f];
      r[c] = sc(i, l, c, u[c], t, !bt(u, c))
    }
  }
  return o
}

function sc(t, e, r, n, i, a) {
  const o = t[r];
  if (o != null) {
    const s = bt(o, "default");
    if (s && n === void 0) {
      const l = o.default;
      if (o.type !== Function && ht(l)) {
        const {
          propsDefaults: u
        } = i;
        r in u ? n = u[r] : (mn(i), n = u[r] = l.call(null, e), hn())
      } else n = l
    }
    o[0] && (a && !s ? n = !1 : o[1] && (n === "" || n === ca(r)) && (n = !0))
  }
  return n
}

function x0(t, e, r = !1) {
  const n = e.propsCache,
    i = n.get(t);
  if (i) return i;
  const a = t.props,
    o = {},
    s = [];
  let l = !1;
  if (!ht(t)) {
    const f = c => {
      l = !0;
      const [h, v] = x0(c, e, !0);
      Jt(o, h), v && s.push(...v)
    };
    !r && e.mixins.length && e.mixins.forEach(f), t.extends && f(t.extends), t.mixins && t.mixins.forEach(f)
  }
  if (!a && !l) return n.set(t, Yi), Yi;
  if (ot(a))
    for (let f = 0; f < a.length; f++) {
      const c = gr(a[f]);
      xd(c) && (o[c] = Rt)
    } else if (a)
      for (const f in a) {
        const c = gr(f);
        if (xd(c)) {
          const h = a[f],
            v = o[c] = ot(h) || ht(h) ? {
              type: h
            } : h;
          if (v) {
            const d = Md(Boolean, v.type),
              y = Md(String, v.type);
            v[0] = d > -1, v[1] = y < 0 || d < y, (d > -1 || bt(v, "default")) && s.push(c)
          }
        }
      }
  const u = [o, s];
  return n.set(t, u), u
}

function xd(t) {
  return t[0] !== "$"
}

function Cd(t) {
  const e = t && t.toString().match(/^\s*function (\w+)/);
  return e ? e[1] : t === null ? "null" : ""
}

function Td(t, e) {
  return Cd(t) === Cd(e)
}

function Md(t, e) {
  return ot(e) ? e.findIndex(r => Td(r, t)) : ht(e) && Td(e, t) ? 0 : -1
}
const C0 = t => t[0] === "_" || t === "$stable",
  Yh = t => ot(t) ? t.map(Je) : [Je(t)],
  Ox = (t, e, r) => {
    const n = ex((...i) => Yh(e(...i)), r);
    return n._c = !1, n
  },
  T0 = (t, e, r) => {
    const n = t._ctx;
    for (const i in t) {
      if (C0(i)) continue;
      const a = t[i];
      if (ht(a)) e[i] = Ox(i, a, n);
      else if (a != null) {
        const o = Yh(a);
        e[i] = () => o
      }
    }
  },
  M0 = (t, e) => {
    const r = Yh(e);
    t.slots.default = () => r
  },
  kx = (t, e) => {
    if (t.vnode.shapeFlag & 32) {
      const r = e._;
      r ? (t.slots = xt(e), cl(e, "_", r)) : T0(e, t.slots = {})
    } else t.slots = {}, e && M0(t, e);
    cl(t.slots, Zl, 1)
  },
  Bx = (t, e, r) => {
    const {
      vnode: n,
      slots: i
    } = t;
    let a = !0,
      o = Rt;
    if (n.shapeFlag & 32) {
      const s = e._;
      s ? r && s === 1 ? a = !1 : (Jt(i, e), !r && s === 1 && delete i._) : (a = !e.$stable, T0(e, i)), o = e
    } else e && (M0(t, e), o = {
      default: 1
    });
    if (a)
      for (const s in i) !C0(s) && !(s in o) && delete i[s]
  };

function JB(t, e) {
  const r = Me;
  if (r === null) return t;
  const n = r.proxy,
    i = t.dirs || (t.dirs = []);
  for (let a = 0; a < e.length; a++) {
    let [o, s, l, u = Rt] = e[a];
    ht(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Qn(s), i.push({
      dir: o,
      instance: n,
      value: s,
      oldValue: void 0,
      arg: l,
      modifiers: u
    })
  }
  return t
}

function bn(t, e, r, n) {
  const i = t.dirs,
    a = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const s = i[o];
    a && (s.oldValue = a[o].value);
    let l = s.dir[n];
    l && (ha(), Ue(l, r, 8, [t.el, s, t, e]), va())
  }
}

function D0() {
  return {
    app: null,
    config: {
      isNativeTag: lb,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}
let Nx = 0;

function Fx(t, e) {
  return function (n, i = null) {
    i != null && !Wt(i) && (i = null);
    const a = D0(),
      o = new Set;
    let s = !1;
    const l = a.app = {
      _uid: Nx++,
      _component: n,
      _props: i,
      _container: null,
      _context: a,
      _instance: null,
      version: nC,
      get config() {
        return a.config
      },
      set config(u) {},
      use(u, ...f) {
        return o.has(u) || (u && ht(u.install) ? (o.add(u), u.install(l, ...f)) : ht(u) && (o.add(u), u(l, ...f))), l
      },
      mixin(u) {
        return a.mixins.includes(u) || a.mixins.push(u), l
      },
      component(u, f) {
        return f ? (a.components[u] = f, l) : a.components[u]
      },
      directive(u, f) {
        return f ? (a.directives[u] = f, l) : a.directives[u]
      },
      mount(u, f, c) {
        if (!s) {
          const h = ie(n, i);
          return h.appContext = a, f && e ? e(h, u) : t(h, u, c), s = !0, l._container = u, u.__vue_app__ = l, jh(h.component) || h.component.proxy
        }
      },
      unmount() {
        s && (t(null, l._container), delete l._container.__vue_app__)
      },
      provide(u, f) {
        return a.provides[u] = f, l
      }
    };
    return l
  }
}

function lc(t, e, r, n, i = !1) {
  if (ot(t)) {
    t.forEach((h, v) => lc(h, e && (ot(e) ? e[v] : e), r, n, i));
    return
  }
  if (ic(n) && !i) return;
  const a = n.shapeFlag & 4 ? jh(n.component) || n.component.proxy : n.el,
    o = i ? null : a,
    {
      i: s,
      r: l
    } = t,
    u = e && e.r,
    f = s.refs === Rt ? s.refs = {} : s.refs,
    c = s.setupState;
  if (u != null && u !== l && (qt(u) ? (f[u] = null, bt(c, u) && (c[u] = null)) : Gt(u) && (u.value = null)), ht(l)) fn(l, s, 12, [o, f]);
  else {
    const h = qt(l),
      v = Gt(l);
    if (h || v) {
      const d = () => {
        if (t.f) {
          const y = h ? f[l] : l.value;
          i ? ot(y) && Dh(y, a) : ot(y) ? y.includes(a) || y.push(a) : h ? f[l] = [a] : (l.value = [a], t.k && (f[t.k] = l.value))
        } else h ? (f[l] = o, bt(c, l) && (c[l] = o)) : Gt(l) && (l.value = o, t.k && (f[t.k] = o))
      };
      o ? (d.id = -1, pe(d, r)) : d()
    }
  }
}
const pe = hx;

function zx(t) {
  return Hx(t)
}

function Hx(t, e) {
  const r = db();
  r.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: a,
    createElement: o,
    createText: s,
    createComment: l,
    setText: u,
    setElementText: f,
    parentNode: c,
    nextSibling: h,
    setScopeId: v = rr,
    cloneNode: d,
    insertStaticContent: y
  } = t, g = (C, E, R, N = null, F = null, U = null, j = !1, $ = null, X = !!E.dynamicChildren) => {
    if (C === E) return;
    C && !fr(C, E) && (N = tt(C), pt(C, F, U, !0), C = null), E.patchFlag === -2 && (X = !1, E.dynamicChildren = null);
    const {
      type: z,
      ref: it,
      shapeFlag: rt
    } = E;
    switch (z) {
      case qh:
        p(C, E, R, N);
        break;
      case Pe:
        m(C, E, R, N);
        break;
      case qs:
        C == null && _(E, R, N, j);
        break;
      case ze:
        L(C, E, R, N, F, U, j, $, X);
        break;
      default:
        rt & 1 ? S(C, E, R, N, F, U, j, $, X) : rt & 6 ? O(C, E, R, N, F, U, j, $, X) : (rt & 64 || rt & 128) && z.process(C, E, R, N, F, U, j, $, X, ut)
    }
    it != null && F && lc(it, C && C.ref, U, E || C, !E)
  }, p = (C, E, R, N) => {
    if (C == null) n(E.el = s(E.children), R, N);
    else {
      const F = E.el = C.el;
      E.children !== C.children && u(F, E.children)
    }
  }, m = (C, E, R, N) => {
    C == null ? n(E.el = l(E.children || ""), R, N) : E.el = C.el
  }, _ = (C, E, R, N) => {
    [C.el, C.anchor] = y(C.children, E, R, N, C.el, C.anchor)
  }, w = ({
    el: C,
    anchor: E
  }, R, N) => {
    let F;
    for (; C && C !== E;) F = h(C), n(C, R, N), C = F;
    n(E, R, N)
  }, b = ({
    el: C,
    anchor: E
  }) => {
    let R;
    for (; C && C !== E;) R = h(C), i(C), C = R;
    i(E)
  }, S = (C, E, R, N, F, U, j, $, X) => {
    j = j || E.type === "svg", C == null ? x(E, R, N, F, U, j, $, X) : D(C, E, F, U, j, $, X)
  }, x = (C, E, R, N, F, U, j, $) => {
    let X, z;
    const {
      type: it,
      props: rt,
      shapeFlag: at,
      transition: ft,
      patchFlag: wt,
      dirs: Ft
    } = C;
    if (C.el && d !== void 0 && wt === -1) X = C.el = d(C.el);
    else {
      if (X = C.el = o(C.type, U, rt && rt.is, rt), at & 8 ? f(X, C.children) : at & 16 && M(C.children, X, null, N, F, U && it !== "foreignObject", j, $), Ft && bn(C, null, N, "created"), rt) {
        for (const Nt in rt) Nt !== "value" && !Us(Nt) && a(X, Nt, null, rt[Nt], U, C.children, N, F, V);
        "value" in rt && a(X, "value", null, rt.value), (z = rt.onVnodeBeforeMount) && ar(z, N, C)
      }
      T(X, C, C.scopeId, j, N)
    }
    Ft && bn(C, null, N, "beforeMount");
    const It = (!F || F && !F.pendingBranch) && ft && !ft.persisted;
    It && ft.beforeEnter(X), n(X, E, R), ((z = rt && rt.onVnodeMounted) || It || Ft) && pe(() => {
      z && ar(z, N, C), It && ft.enter(X), Ft && bn(C, null, N, "mounted")
    }, F)
  }, T = (C, E, R, N, F) => {
    if (R && v(C, R), N)
      for (let U = 0; U < N.length; U++) v(C, N[U]);
    if (F) {
      let U = F.subTree;
      if (E === U) {
        const j = F.vnode;
        T(C, j, j.scopeId, j.slotScopeIds, F.parent)
      }
    }
  }, M = (C, E, R, N, F, U, j, $, X = 0) => {
    for (let z = X; z < C.length; z++) {
      const it = C[z] = $ ? nn(C[z]) : Je(C[z]);
      g(null, it, E, R, N, F, U, j, $)
    }
  }, D = (C, E, R, N, F, U, j) => {
    const $ = E.el = C.el;
    let {
      patchFlag: X,
      dynamicChildren: z,
      dirs: it
    } = E;
    X |= C.patchFlag & 16;
    const rt = C.props || Rt,
      at = E.props || Rt;
    let ft;
    R && xn(R, !1), (ft = at.onVnodeBeforeUpdate) && ar(ft, R, E, C), it && bn(E, C, R, "beforeUpdate"), R && xn(R, !0);
    const wt = F && E.type !== "foreignObject";
    if (z ? I(C.dynamicChildren, z, $, R, N, wt, U) : j || Z(C, E, $, null, R, N, wt, U, !1), X > 0) {
      if (X & 16) A($, E, rt, at, R, N, F);
      else if (X & 2 && rt.class !== at.class && a($, "class", null, at.class, F), X & 4 && a($, "style", rt.style, at.style, F), X & 8) {
        const Ft = E.dynamicProps;
        for (let It = 0; It < Ft.length; It++) {
          const Nt = Ft[It],
            qe = rt[Nt],
            mi = at[Nt];
          (mi !== qe || Nt === "value") && a($, Nt, qe, mi, F, C.children, R, N, V)
        }
      }
      X & 1 && C.children !== E.children && f($, E.children)
    } else !j && z == null && A($, E, rt, at, R, N, F);
    ((ft = at.onVnodeUpdated) || it) && pe(() => {
      ft && ar(ft, R, E, C), it && bn(E, C, R, "updated")
    }, N)
  }, I = (C, E, R, N, F, U, j) => {
    for (let $ = 0; $ < E.length; $++) {
      const X = C[$],
        z = E[$],
        it = X.el && (X.type === ze || !fr(X, z) || X.shapeFlag & 70) ? c(X.el) : R;
      g(X, z, it, null, N, F, U, j, !0)
    }
  }, A = (C, E, R, N, F, U, j) => {
    if (R !== N) {
      for (const $ in N) {
        if (Us($)) continue;
        const X = N[$],
          z = R[$];
        X !== z && $ !== "value" && a(C, $, z, X, j, E.children, F, U, V)
      }
      if (R !== Rt)
        for (const $ in R) !Us($) && !($ in N) && a(C, $, R[$], null, j, E.children, F, U, V);
      "value" in N && a(C, "value", R.value, N.value)
    }
  }, L = (C, E, R, N, F, U, j, $, X) => {
    const z = E.el = C ? C.el : s(""),
      it = E.anchor = C ? C.anchor : s("");
    let {
      patchFlag: rt,
      dynamicChildren: at,
      slotScopeIds: ft
    } = E;
    ft && ($ = $ ? $.concat(ft) : ft), C == null ? (n(z, R, N), n(it, R, N), M(E.children, R, it, F, U, j, $, X)) : rt > 0 && rt & 64 && at && C.dynamicChildren ? (I(C.dynamicChildren, at, R, F, U, j, $), (E.key != null || F && E === F.subTree) && A0(C, E, !0)) : Z(C, E, R, it, F, U, j, $, X)
  }, O = (C, E, R, N, F, U, j, $, X) => {
    E.slotScopeIds = $, C == null ? E.shapeFlag & 512 ? F.ctx.activate(E, R, N, j, X) : H(E, R, N, F, U, j, X) : B(C, E, X)
  }, H = (C, E, R, N, F, U, j) => {
    const $ = C.component = Zx(C, N, F);
    if (ql(C) && ($.ctx.renderer = ut), jx($), $.asyncDep) {
      if (F && F.registerDep($, Q), !C.el) {
        const X = $.subTree = ie(Pe);
        m(null, X, E, R)
      }
      return
    }
    Q($, C, E, R, F, U, j)
  }, B = (C, E, R) => {
    const N = E.component = C.component;
    if (ax(C, E, R))
      if (N.asyncDep && !N.asyncResolved) {
        G(N, E, R);
        return
      } else N.next = E, Qb(N.update), N.update();
    else E.component = C.component, E.el = C.el, N.vnode = E
  }, Q = (C, E, R, N, F, U, j) => {
    const $ = () => {
        if (C.isMounted) {
          let {
            next: it,
            bu: rt,
            u: at,
            parent: ft,
            vnode: wt
          } = C, Ft = it, It;
          xn(C, !1), it ? (it.el = wt.el, G(C, it, j)) : it = wt, rt && Ys(rt), (It = it.props && it.props.onVnodeBeforeUpdate) && ar(It, ft, it, wt), xn(C, !0);
          const Nt = Du(C),
            qe = C.subTree;
          C.subTree = Nt, g(qe, Nt, c(qe.el), tt(qe), C, F, U), it.el = Nt.el, Ft === null && Gh(C, Nt.el), at && pe(at, F), (It = it.props && it.props.onVnodeUpdated) && pe(() => ar(It, ft, it, wt), F)
        } else {
          let it;
          const {
            el: rt,
            props: at
          } = E, {
            bm: ft,
            m: wt,
            parent: Ft
          } = C, It = ic(E);
          if (xn(C, !1), ft && Ys(ft), !It && (it = at && at.onVnodeBeforeMount) && ar(it, Ft, E), xn(C, !0), rt && K) {
            const Nt = () => {
              C.subTree = Du(C), K(rt, C.subTree, C, F, null)
            };
            It ? E.type.__asyncLoader().then(() => !C.isUnmounted && Nt()) : Nt()
          } else {
            const Nt = C.subTree = Du(C);
            g(null, Nt, R, N, C, F, U), E.el = Nt.el
          }
          if (wt && pe(wt, F), !It && (it = at && at.onVnodeMounted)) {
            const Nt = E;
            pe(() => ar(it, Ft, Nt), F)
          }
          E.shapeFlag & 256 && C.a && pe(C.a, F), C.isMounted = !0, E = R = N = null
        }
      },
      X = C.effect = new Lh($, () => i0(C.update), C.scope),
      z = C.update = X.run.bind(X);
    z.id = C.uid, xn(C, !0), z()
  }, G = (C, E, R) => {
    E.component = C;
    const N = C.vnode.props;
    C.vnode = E, C.next = null, Rx(C, E.props, N, R), Bx(C, E.children, R), ha(), Vh(void 0, C.update), va()
  }, Z = (C, E, R, N, F, U, j, $, X = !1) => {
    const z = C && C.children,
      it = C ? C.shapeFlag : 0,
      rt = E.children,
      {
        patchFlag: at,
        shapeFlag: ft
      } = E;
    if (at > 0) {
      if (at & 128) {
        _t(z, rt, R, N, F, U, j, $, X);
        return
      } else if (at & 256) {
        lt(z, rt, R, N, F, U, j, $, X);
        return
      }
    }
    ft & 8 ? (it & 16 && V(z, F, U), rt !== z && f(R, rt)) : it & 16 ? ft & 16 ? _t(z, rt, R, N, F, U, j, $, X) : V(z, F, U, !0) : (it & 8 && f(R, ""), ft & 16 && M(rt, R, N, F, U, j, $, X))
  }, lt = (C, E, R, N, F, U, j, $, X) => {
    C = C || Yi, E = E || Yi;
    const z = C.length,
      it = E.length,
      rt = Math.min(z, it);
    let at;
    for (at = 0; at < rt; at++) {
      const ft = E[at] = X ? nn(E[at]) : Je(E[at]);
      g(C[at], ft, R, null, F, U, j, $, X)
    }
    z > it ? V(C, F, U, !0, !1, rt) : M(E, R, N, F, U, j, $, X, rt)
  }, _t = (C, E, R, N, F, U, j, $, X) => {
    let z = 0;
    const it = E.length;
    let rt = C.length - 1,
      at = it - 1;
    for (; z <= rt && z <= at;) {
      const ft = C[z],
        wt = E[z] = X ? nn(E[z]) : Je(E[z]);
      if (fr(ft, wt)) g(ft, wt, R, null, F, U, j, $, X);
      else break;
      z++
    }
    for (; z <= rt && z <= at;) {
      const ft = C[rt],
        wt = E[at] = X ? nn(E[at]) : Je(E[at]);
      if (fr(ft, wt)) g(ft, wt, R, null, F, U, j, $, X);
      else break;
      rt--, at--
    }
    if (z > rt) {
      if (z <= at) {
        const ft = at + 1,
          wt = ft < it ? E[ft].el : N;
        for (; z <= at;) g(null, E[z] = X ? nn(E[z]) : Je(E[z]), R, wt, F, U, j, $, X), z++
      }
    } else if (z > at)
      for (; z <= rt;) pt(C[z], F, U, !0), z++;
    else {
      const ft = z,
        wt = z,
        Ft = new Map;
      for (z = wt; z <= at; z++) {
        const be = E[z] = X ? nn(E[z]) : Je(E[z]);
        be.key != null && Ft.set(be.key, z)
      }
      let It, Nt = 0;
      const qe = at - wt + 1;
      let mi = !1,
        od = 0;
      const Sa = new Array(qe);
      for (z = 0; z < qe; z++) Sa[z] = 0;
      for (z = ft; z <= rt; z++) {
        const be = C[z];
        if (Nt >= qe) {
          pt(be, F, U, !0);
          continue
        }
        let ir;
        if (be.key != null) ir = Ft.get(be.key);
        else
          for (It = wt; It <= at; It++)
            if (Sa[It - wt] === 0 && fr(be, E[It])) {
              ir = It;
              break
            } ir === void 0 ? pt(be, F, U, !0) : (Sa[ir - wt] = z + 1, ir >= od ? od = ir : mi = !0, g(be, E[ir], R, null, F, U, j, $, X), Nt++)
      }
      const sd = mi ? Vx(Sa) : Yi;
      for (It = sd.length - 1, z = qe - 1; z >= 0; z--) {
        const be = wt + z,
          ir = E[be],
          ld = be + 1 < it ? E[be + 1].el : N;
        Sa[z] === 0 ? g(null, ir, R, ld, F, U, j, $, X) : mi && (It < 0 || z !== sd[It] ? yt(ir, R, ld, 2) : It--)
      }
    }
  }, yt = (C, E, R, N, F = null) => {
    const {
      el: U,
      type: j,
      transition: $,
      children: X,
      shapeFlag: z
    } = C;
    if (z & 6) {
      yt(C.component.subTree, E, R, N);
      return
    }
    if (z & 128) {
      C.suspense.move(E, R, N);
      return
    }
    if (z & 64) {
      j.move(C, E, R, ut);
      return
    }
    if (j === ze) {
      n(U, E, R);
      for (let rt = 0; rt < X.length; rt++) yt(X[rt], E, R, N);
      n(C.anchor, E, R);
      return
    }
    if (j === qs) {
      w(C, E, R);
      return
    }
    if (N !== 2 && z & 1 && $)
      if (N === 0) $.beforeEnter(U), n(U, E, R), pe(() => $.enter(U), F);
      else {
        const {
          leave: rt,
          delayLeave: at,
          afterLeave: ft
        } = $, wt = () => n(U, E, R), Ft = () => {
          rt(U, () => {
            wt(), ft && ft()
          })
        };
        at ? at(U, wt, Ft) : Ft()
      }
    else n(U, E, R)
  }, pt = (C, E, R, N = !1, F = !1) => {
    const {
      type: U,
      props: j,
      ref: $,
      children: X,
      dynamicChildren: z,
      shapeFlag: it,
      patchFlag: rt,
      dirs: at
    } = C;
    if ($ != null && lc($, null, R, C, !0), it & 256) {
      E.ctx.deactivate(C);
      return
    }
    const ft = it & 1 && at,
      wt = !ic(C);
    let Ft;
    if (wt && (Ft = j && j.onVnodeBeforeUnmount) && ar(Ft, E, C), it & 6) W(C.component, R, N);
    else {
      if (it & 128) {
        C.suspense.unmount(R, N);
        return
      }
      ft && bn(C, null, E, "beforeUnmount"), it & 64 ? C.type.remove(C, E, R, F, ut, N) : z && (U !== ze || rt > 0 && rt & 64) ? V(z, E, R, !1, !0) : (U === ze && rt & 384 || !F && it & 16) && V(X, E, R), N && At(C)
    }(wt && (Ft = j && j.onVnodeUnmounted) || ft) && pe(() => {
      Ft && ar(Ft, E, C), ft && bn(C, null, E, "unmounted")
    }, R)
  }, At = C => {
    const {
      type: E,
      el: R,
      anchor: N,
      transition: F
    } = C;
    if (E === ze) {
      k(R, N);
      return
    }
    if (E === qs) {
      b(C);
      return
    }
    const U = () => {
      i(R), F && !F.persisted && F.afterLeave && F.afterLeave()
    };
    if (C.shapeFlag & 1 && F && !F.persisted) {
      const {
        leave: j,
        delayLeave: $
      } = F, X = () => j(R, U);
      $ ? $(C.el, U, X) : X()
    } else U()
  }, k = (C, E) => {
    let R;
    for (; C !== E;) R = h(C), i(C), C = R;
    i(E)
  }, W = (C, E, R) => {
    const {
      bum: N,
      scope: F,
      update: U,
      subTree: j,
      um: $
    } = C;
    N && Ys(N), F.stop(), U && (U.active = !1, pt(j, C, E, R)), $ && pe($, E), pe(() => {
      C.isUnmounted = !0
    }, E), E && E.pendingBranch && !E.isUnmounted && C.asyncDep && !C.asyncResolved && C.suspenseId === E.pendingId && (E.deps--, E.deps === 0 && E.resolve())
  }, V = (C, E, R, N = !1, F = !1, U = 0) => {
    for (let j = U; j < C.length; j++) pt(C[j], E, R, N, F)
  }, tt = C => C.shapeFlag & 6 ? tt(C.component.subTree) : C.shapeFlag & 128 ? C.suspense.next() : h(C.anchor || C.el), vt = (C, E, R) => {
    C == null ? E._vnode && pt(E._vnode, null, null, !0) : g(E._vnode || null, C, E, null, null, null, R), l0(), E._vnode = C
  }, ut = {
    p: g,
    um: pt,
    m: yt,
    r: At,
    mt: H,
    mc: M,
    pc: Z,
    pbc: I,
    n: tt,
    o: t
  };
  let Y, K;
  return e && ([Y, K] = e(ut)), {
    render: vt,
    hydrate: Y,
    createApp: Fx(vt, Y)
  }
}

function xn({
  effect: t,
  update: e
}, r) {
  t.allowRecurse = e.allowRecurse = r
}

function A0(t, e, r = !1) {
  const n = t.children,
    i = e.children;
  if (ot(n) && ot(i))
    for (let a = 0; a < n.length; a++) {
      const o = n[a];
      let s = i[a];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = i[a] = nn(i[a]), s.el = o.el), r || A0(o, s))
    }
}

function Vx(t) {
  const e = t.slice(),
    r = [0];
  let n, i, a, o, s;
  const l = t.length;
  for (n = 0; n < l; n++) {
    const u = t[n];
    if (u !== 0) {
      if (i = r[r.length - 1], t[i] < u) {
        e[n] = i, r.push(n);
        continue
      }
      for (a = 0, o = r.length - 1; a < o;) s = a + o >> 1, t[r[s]] < u ? a = s + 1 : o = s;
      u < t[r[a]] && (a > 0 && (e[n] = r[a - 1]), r[a] = n)
    }
  }
  for (a = r.length, o = r[a - 1]; a-- > 0;) r[a] = o, o = e[o];
  return r
}
const $x = t => t.__isTeleport,
  Xh = "components";

function tN(t, e) {
  return I0(Xh, t, !0, e) || t
}
const P0 = Symbol();

function eN(t) {
  return qt(t) ? I0(Xh, t, !1) || t : t || P0
}

function I0(t, e, r = !0, n = !1) {
  const i = Me || Zt;
  if (i) {
    const a = i.type;
    if (t === Xh) {
      const s = eC(a);
      if (s && (s === e || s === gr(e) || s === Ul(gr(e)))) return a
    }
    const o = Dd(i[t] || a[t], e) || Dd(i.appContext[t], e);
    return !o && n ? a : o
  }
}

function Dd(t, e) {
  return t && (t[e] || t[gr(e)] || t[Ul(gr(e))])
}
const ze = Symbol(void 0),
  qh = Symbol(void 0),
  Pe = Symbol(void 0),
  qs = Symbol(void 0),
  io = [];
let cn = null;

function Kh(t = !1) {
  io.push(cn = t ? null : [])
}

function E0() {
  io.pop(), cn = io[io.length - 1] || null
}
let Mo = 1;

function Ad(t) {
  Mo += t
}

function L0(t) {
  return t.dynamicChildren = Mo > 0 ? cn || Yi : null, E0(), Mo > 0 && cn && cn.push(t), t
}

function rN(t, e, r, n, i, a) {
  return L0(k0(t, e, r, n, i, a, !0))
}

function R0(t, e, r, n, i) {
  return L0(ie(t, e, r, n, i, !0))
}

function Do(t) {
  return t ? t.__v_isVNode === !0 : !1
}

function fr(t, e) {
  return t.type === e.type && t.key === e.key
}
const Zl = "__vInternal",
  O0 = ({
    key: t
  }) => t != null ? t : null,
  Ks = ({
    ref: t,
    ref_key: e,
    ref_for: r
  }) => t != null ? qt(t) || Gt(t) || ht(t) ? {
    i: Me,
    r: t,
    k: e,
    f: !!r
  } : t : null;

function k0(t, e = null, r = null, n = 0, i = null, a = t === ze ? 0 : 1, o = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && O0(e),
    ref: e && Ks(e),
    scopeId: Xl,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null
  };
  return s ? (Zh(l, r), a & 128 && t.normalize(l)) : r && (l.shapeFlag |= qt(r) ? 8 : 16), Mo > 0 && !o && cn && (l.patchFlag > 0 || a & 6) && l.patchFlag !== 32 && cn.push(l), l
}
const ie = Gx;

function Gx(t, e = null, r = null, n = 0, i = null, a = !1) {
  if ((!t || t === P0) && (t = Pe), Do(t)) {
    const s = ra(t, e, !0);
    return r && Zh(s, r), s
  }
  if (rC(t) && (t = t.__vccOpts), e) {
    e = Wx(e);
    let {
      class: s,
      style: l
    } = e;
    s && !qt(s) && (e.class = Ch(s)), Wt(l) && (Qm(l) && !ot(l) && (l = Jt({}, l)), e.style = xh(l))
  }
  const o = qt(t) ? 1 : ox(t) ? 128 : $x(t) ? 64 : Wt(t) ? 4 : ht(t) ? 2 : 0;
  return k0(t, e, r, n, i, o, a, !0)
}

function Wx(t) {
  return t ? Qm(t) || Zl in t ? Jt({}, t) : t : null
}

function ra(t, e, r = !1) {
  const {
    props: n,
    ref: i,
    patchFlag: a,
    children: o
  } = t, s = e ? Yx(n || {}, e) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: s,
    key: s && O0(s),
    ref: e && e.ref ? r && i ? ot(i) ? i.concat(Ks(e)) : [i, Ks(e)] : Ks(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== ze ? a === -1 ? 16 : a | 16 : a,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && ra(t.ssContent),
    ssFallback: t.ssFallback && ra(t.ssFallback),
    el: t.el,
    anchor: t.anchor
  }
}

function Ux(t = " ", e = 0) {
  return ie(qh, null, t, e)
}

function nN(t, e) {
  const r = ie(qs, null, t);
  return r.staticCount = e, r
}

function iN(t = "", e = !1) {
  return e ? (Kh(), R0(Pe, null, t)) : ie(Pe, null, t)
}

function Je(t) {
  return t == null || typeof t == "boolean" ? ie(Pe) : ot(t) ? ie(ze, null, t.slice()) : typeof t == "object" ? nn(t) : ie(qh, null, String(t))
}

function nn(t) {
  return t.el === null || t.memo ? t : ra(t)
}

function Zh(t, e) {
  let r = 0;
  const {
    shapeFlag: n
  } = t;
  if (e == null) e = null;
  else if (ot(e)) r = 16;
  else if (typeof e == "object")
    if (n & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Zh(t, i()), i._c && (i._d = !0));
      return
    } else {
      r = 32;
      const i = e._;
      !i && !(Zl in e) ? e._ctx = Me : i === 3 && Me && (Me.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024))
    }
  else ht(e) ? (e = {
    default: e,
    _ctx: Me
  }, r = 32) : (e = String(e), n & 64 ? (r = 16, e = [Ux(e)]) : r = 8);
  t.children = e, t.shapeFlag |= r
}

function Yx(...t) {
  const e = {};
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    for (const i in n)
      if (i === "class") e.class !== n.class && (e.class = Ch([e.class, n.class]));
      else if (i === "style") e.style = xh([e.style, n.style]);
    else if ($l(i)) {
      const a = e[i],
        o = n[i];
      o && a !== o && !(ot(a) && a.includes(o)) && (e[i] = a ? [].concat(a, o) : o)
    } else i !== "" && (e[i] = n[i])
  }
  return e
}

function ar(t, e, r, n = null) {
  Ue(t, e, 7, [r, n])
}

function aN(t, e, r, n) {
  let i;
  const a = r && r[n];
  if (ot(t) || qt(t)) {
    i = new Array(t.length);
    for (let o = 0, s = t.length; o < s; o++) i[o] = e(t[o], o, void 0, a && a[o])
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let o = 0; o < t; o++) i[o] = e(o + 1, o, void 0, a && a[o])
  } else if (Wt(t))
    if (t[Symbol.iterator]) i = Array.from(t, (o, s) => e(o, s, void 0, a && a[s]));
    else {
      const o = Object.keys(t);
      i = new Array(o.length);
      for (let s = 0, l = o.length; s < l; s++) {
        const u = o[s];
        i[s] = e(t[u], u, s, a && a[s])
      }
    }
  else i = [];
  return r && (r[n] = i), i
}

function oN(t, e, r = {}, n, i) {
  if (Me.isCE) return ie("slot", e === "default" ? null : {
    name: e
  }, n && n());
  let a = t[e];
  a && a._c && (a._d = !1), Kh();
  const o = a && B0(a(r)),
    s = R0(ze, {
      key: r.key || `_${e}`
    }, o || (n ? n() : []), o && t._ === 1 ? 64 : -2);
  return !i && s.scopeId && (s.slotScopeIds = [s.scopeId + "-s"]), a && a._c && (a._d = !0), s
}

function B0(t) {
  return t.some(e => Do(e) ? !(e.type === Pe || e.type === ze && !B0(e.children)) : !0) ? t : null
}
const uc = t => t ? N0(t) ? jh(t) || t.proxy : uc(t.parent) : null,
  pl = Jt(Object.create(null), {
    $: t => t,
    $el: t => t.vnode.el,
    $data: t => t.data,
    $props: t => t.props,
    $attrs: t => t.attrs,
    $slots: t => t.slots,
    $refs: t => t.refs,
    $parent: t => uc(t.parent),
    $root: t => uc(t.root),
    $emit: t => t.emit,
    $options: t => S0(t),
    $forceUpdate: t => () => i0(t.update),
    $nextTick: t => Hh.bind(t.proxy),
    $watch: t => vx.bind(t)
  }),
  Xx = {
    get({
      _: t
    }, e) {
      const {
        ctx: r,
        setupState: n,
        data: i,
        props: a,
        accessCache: o,
        type: s,
        appContext: l
      } = t;
      let u;
      if (e[0] !== "$") {
        const v = o[e];
        if (v !== void 0) switch (v) {
          case 1:
            return n[e];
          case 2:
            return i[e];
          case 4:
            return r[e];
          case 3:
            return a[e]
        } else {
          if (n !== Rt && bt(n, e)) return o[e] = 1, n[e];
          if (i !== Rt && bt(i, e)) return o[e] = 2, i[e];
          if ((u = t.propsOptions[0]) && bt(u, e)) return o[e] = 3, a[e];
          if (r !== Rt && bt(r, e)) return o[e] = 4, r[e];
          ac && (o[e] = 0)
        }
      }
      const f = pl[e];
      let c, h;
      if (f) return e === "$attrs" && Ae(t, "get", e), f(t);
      if ((c = s.__cssModules) && (c = c[e])) return c;
      if (r !== Rt && bt(r, e)) return o[e] = 4, r[e];
      if (h = l.config.globalProperties, bt(h, e)) return h[e]
    },
    set({
      _: t
    }, e, r) {
      const {
        data: n,
        setupState: i,
        ctx: a
      } = t;
      return i !== Rt && bt(i, e) ? (i[e] = r, !0) : n !== Rt && bt(n, e) ? (n[e] = r, !0) : bt(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (a[e] = r, !0)
    },
    has({
      _: {
        data: t,
        setupState: e,
        accessCache: r,
        ctx: n,
        appContext: i,
        propsOptions: a
      }
    }, o) {
      let s;
      return !!r[o] || t !== Rt && bt(t, o) || e !== Rt && bt(e, o) || (s = a[0]) && bt(s, o) || bt(n, o) || bt(pl, o) || bt(i.config.globalProperties, o)
    },
    defineProperty(t, e, r) {
      return r.get != null ? this.set(t, e, r.get(), null) : r.value != null && this.set(t, e, r.value, null), Reflect.defineProperty(t, e, r)
    }
  },
  qx = D0();
let Kx = 0;

function Zx(t, e, r) {
  const n = t.type,
    i = (e ? e.appContext : t.appContext) || qx,
    a = {
      uid: Kx++,
      vnode: t,
      type: n,
      parent: e,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Fm(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: x0(n, i),
      emitsOptions: f0(n, i),
      emit: null,
      emitted: null,
      propsDefaults: Rt,
      inheritAttrs: n.inheritAttrs,
      ctx: Rt,
      data: Rt,
      props: Rt,
      attrs: Rt,
      slots: Rt,
      refs: Rt,
      setupState: Rt,
      setupContext: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return a.ctx = {
    _: a
  }, a.root = e ? e.root : a, a.emit = tx.bind(null, a), t.ce && t.ce(a), a
}
let Zt = null;
const jl = () => Zt || Me,
  mn = t => {
    Zt = t, t.scope.on()
  },
  hn = () => {
    Zt && Zt.scope.off(), Zt = null
  };

function N0(t) {
  return t.vnode.shapeFlag & 4
}
let Ao = !1;

function jx(t, e = !1) {
  Ao = e;
  const {
    props: r,
    children: n
  } = t.vnode, i = N0(t);
  Lx(t, r, i, e), kx(t, n);
  const a = i ? Qx(t, e) : void 0;
  return Ao = !1, a
}

function Qx(t, e) {
  const r = t.type;
  t.accessCache = Object.create(null), t.proxy = ea(new Proxy(t.ctx, Xx));
  const {
    setup: n
  } = r;
  if (n) {
    const i = t.setupContext = n.length > 1 ? tC(t) : null;
    mn(t), ha();
    const a = fn(n, t, 0, [t.props, i]);
    if (va(), hn(), Ph(a)) {
      if (a.then(hn, hn), e) return a.then(o => {
        fc(t, o, e)
      }).catch(o => {
        Xo(o, t, 0)
      });
      t.asyncDep = a
    } else fc(t, a, e)
  } else F0(t, e)
}

function fc(t, e, r) {
  ht(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Wt(e) && (t.setupState = r0(e)), F0(t, r)
}
let Pd;

function F0(t, e, r) {
  const n = t.type;
  if (!t.render) {
    if (!e && Pd && !n.render) {
      const i = n.template;
      if (i) {
        const {
          isCustomElement: a,
          compilerOptions: o
        } = t.appContext.config, {
          delimiters: s,
          compilerOptions: l
        } = n, u = Jt(Jt({
          isCustomElement: a,
          delimiters: s
        }, o), l);
        n.render = Pd(i, u)
      }
    }
    t.render = n.render || rr
  }
  mn(t), ha(), Dx(t), va(), hn()
}

function Jx(t) {
  return new Proxy(t.attrs, {
    get(e, r) {
      return Ae(t, "get", "$attrs"), e[r]
    }
  })
}

function tC(t) {
  const e = n => {
    t.exposed = n || {}
  };
  let r;
  return {
    get attrs() {
      return r || (r = Jx(t))
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  }
}

function jh(t) {
  if (t.exposed) return t.exposeProxy || (t.exposeProxy = new Proxy(r0(ea(t.exposed)), {
    get(e, r) {
      if (r in e) return e[r];
      if (r in pl) return pl[r](t)
    }
  }))
}

function eC(t) {
  return ht(t) && t.displayName || t.name
}

function rC(t) {
  return ht(t) && "__vccOpts" in t
}
const tr = (t, e) => Kb(t, e, Ao);

function sN(t) {
  const e = jl();
  let r = t();
  return hn(), Ph(r) && (r = r.catch(n => {
    throw mn(e), n
  })), [r, () => mn(e)]
}

function Qh(t, e, r) {
  const n = arguments.length;
  return n === 2 ? Wt(e) && !ot(e) ? Do(e) ? ie(t, null, [e]) : ie(t, e) : ie(t, null, e) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && Do(r) && (r = [r]), ie(t, e, r))
}
const nC = "3.2.31",
  iC = "http://www.w3.org/2000/svg",
  Zn = typeof document != "undefined" ? document : null,
  Id = Zn && Zn.createElement("template"),
  aC = {
    insert: (t, e, r) => {
      e.insertBefore(t, r || null)
    },
    remove: t => {
      const e = t.parentNode;
      e && e.removeChild(t)
    },
    createElement: (t, e, r, n) => {
      const i = e ? Zn.createElementNS(iC, t) : Zn.createElement(t, r ? {
        is: r
      } : void 0);
      return t === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i
    },
    createText: t => Zn.createTextNode(t),
    createComment: t => Zn.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e
    },
    setElementText: (t, e) => {
      t.textContent = e
    },
    parentNode: t => t.parentNode,
    nextSibling: t => t.nextSibling,
    querySelector: t => Zn.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, "")
    },
    cloneNode(t) {
      const e = t.cloneNode(!0);
      return "_value" in t && (e._value = t._value), e
    },
    insertStaticContent(t, e, r, n, i, a) {
      const o = r ? r.previousSibling : e.lastChild;
      if (i && (i === a || i.nextSibling))
        for (; e.insertBefore(i.cloneNode(!0), r), !(i === a || !(i = i.nextSibling)););
      else {
        Id.innerHTML = n ? `<svg>${t}</svg>` : t;
        const s = Id.content;
        if (n) {
          const l = s.firstChild;
          for (; l.firstChild;) s.appendChild(l.firstChild);
          s.removeChild(l)
        }
        e.insertBefore(s, r)
      }
      return [o ? o.nextSibling : e.firstChild, r ? r.previousSibling : e.lastChild]
    }
  };

function oC(t, e, r) {
  const n = t._vtc;
  n && (e = (e ? [e, ...n] : [...n]).join(" ")), e == null ? t.removeAttribute("class") : r ? t.setAttribute("class", e) : t.className = e
}

function sC(t, e, r) {
  const n = t.style,
    i = qt(r);
  if (r && !i) {
    for (const a in r) cc(n, a, r[a]);
    if (e && !qt(e))
      for (const a in e) r[a] == null && cc(n, a, "")
  } else {
    const a = n.display;
    i ? e !== r && (n.cssText = r) : e && t.removeAttribute("style"), "_vod" in t && (n.display = a)
  }
}
const Ed = /\s*!important$/;

function cc(t, e, r) {
  if (ot(r)) r.forEach(n => cc(t, e, n));
  else if (e.startsWith("--")) t.setProperty(e, r);
  else {
    const n = lC(t, e);
    Ed.test(r) ? t.setProperty(ca(n), r.replace(Ed, ""), "important") : t[n] = r
  }
}
const Ld = ["Webkit", "Moz", "ms"],
  Pu = {};

function lC(t, e) {
  const r = Pu[e];
  if (r) return r;
  let n = gr(e);
  if (n !== "filter" && n in t) return Pu[e] = n;
  n = Ul(n);
  for (let i = 0; i < Ld.length; i++) {
    const a = Ld[i] + n;
    if (a in t) return Pu[e] = a
  }
  return e
}
const Rd = "http://www.w3.org/1999/xlink";

function uC(t, e, r, n, i) {
  if (n && e.startsWith("xlink:")) r == null ? t.removeAttributeNS(Rd, e.slice(6, e.length)) : t.setAttributeNS(Rd, e, r);
  else {
    const a = nb(e);
    r == null || a && !Om(r) ? t.removeAttribute(e) : t.setAttribute(e, a ? "" : r)
  }
}

function fC(t, e, r, n, i, a, o) {
  if (e === "innerHTML" || e === "textContent") {
    n && o(n, i, a), t[e] = r == null ? "" : r;
    return
  }
  if (e === "value" && t.tagName !== "PROGRESS" && !t.tagName.includes("-")) {
    t._value = r;
    const s = r == null ? "" : r;
    (t.value !== s || t.tagName === "OPTION") && (t.value = s), r == null && t.removeAttribute(e);
    return
  }
  if (r === "" || r == null) {
    const s = typeof t[e];
    if (s === "boolean") {
      t[e] = Om(r);
      return
    } else if (r == null && s === "string") {
      t[e] = "", t.removeAttribute(e);
      return
    } else if (s === "number") {
      try {
        t[e] = 0
      } catch (l) {}
      t.removeAttribute(e);
      return
    }
  }
  try {
    t[e] = r
  } catch (s) {}
}
let gl = Date.now,
  z0 = !1;
if (typeof window != "undefined") {
  gl() > document.createEvent("Event").timeStamp && (gl = () => performance.now());
  const t = navigator.userAgent.match(/firefox\/(\d+)/i);
  z0 = !!(t && Number(t[1]) <= 53)
}
let hc = 0;
const cC = Promise.resolve(),
  hC = () => {
    hc = 0
  },
  vC = () => hc || (cC.then(hC), hc = gl());

function Dr(t, e, r, n) {
  t.addEventListener(e, r, n)
}

function dC(t, e, r, n) {
  t.removeEventListener(e, r, n)
}

function pC(t, e, r, n, i = null) {
  const a = t._vei || (t._vei = {}),
    o = a[e];
  if (n && o) o.value = n;
  else {
    const [s, l] = gC(e);
    if (n) {
      const u = a[e] = yC(n, i);
      Dr(t, s, u, l)
    } else o && (dC(t, s, o, l), a[e] = void 0)
  }
}
const Od = /(?:Once|Passive|Capture)$/;

function gC(t) {
  let e;
  if (Od.test(t)) {
    e = {};
    let r;
    for (; r = t.match(Od);) t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0
  }
  return [ca(t.slice(2)), e]
}

function yC(t, e) {
  const r = n => {
    const i = n.timeStamp || gl();
    (z0 || i >= r.attached - 1) && Ue(mC(n, r.value), e, 5, [n])
  };
  return r.value = t, r.attached = vC(), r
}

function mC(t, e) {
  if (ot(e)) {
    const r = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      r.call(t), t._stopped = !0
    }, e.map(n => i => !i._stopped && n && n(i))
  } else return e
}
const kd = /^on[a-z]/,
  _C = (t, e, r, n, i = !1, a, o, s, l) => {
    e === "class" ? oC(t, n, i) : e === "style" ? sC(t, r, n) : $l(e) ? Mh(e) || pC(t, e, r, n, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : wC(t, e, n, i)) ? fC(t, e, n, a, o, s, l) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), uC(t, e, n, i))
  };

function wC(t, e, r, n) {
  return n ? !!(e === "innerHTML" || e === "textContent" || e in t && kd.test(e) && ht(r)) : e === "spellcheck" || e === "draggable" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA" || kd.test(e) && qt(r) ? !1 : e in t
}
const $r = "transition",
  ba = "animation",
  H0 = (t, {
    slots: e
  }) => Qh(v0, SC(t), e);
H0.displayName = "Transition";
const V0 = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
H0.props = Jt({}, v0.props, V0);
const Cn = (t, e = []) => {
    ot(t) ? t.forEach(r => r(...e)) : t && t(...e)
  },
  Bd = t => t ? ot(t) ? t.some(e => e.length > 1) : t.length > 1 : !1;

function SC(t) {
  const e = {};
  for (const A in t) A in V0 || (e[A] = t[A]);
  if (t.css === !1) return e;
  const {
    name: r = "v",
    type: n,
    duration: i,
    enterFromClass: a = `${r}-enter-from`,
    enterActiveClass: o = `${r}-enter-active`,
    enterToClass: s = `${r}-enter-to`,
    appearFromClass: l = a,
    appearActiveClass: u = o,
    appearToClass: f = s,
    leaveFromClass: c = `${r}-leave-from`,
    leaveActiveClass: h = `${r}-leave-active`,
    leaveToClass: v = `${r}-leave-to`
  } = t, d = bC(i), y = d && d[0], g = d && d[1], {
    onBeforeEnter: p,
    onEnter: m,
    onEnterCancelled: _,
    onLeave: w,
    onLeaveCancelled: b,
    onBeforeAppear: S = p,
    onAppear: x = m,
    onAppearCancelled: T = _
  } = e, M = (A, L, O) => {
    _i(A, L ? f : s), _i(A, L ? u : o), O && O()
  }, D = (A, L) => {
    _i(A, v), _i(A, h), L && L()
  }, I = A => (L, O) => {
    const H = A ? x : m,
      B = () => M(L, A, O);
    Cn(H, [L, B]), Nd(() => {
      _i(L, A ? l : a), Gr(L, A ? f : s), Bd(H) || Fd(L, n, y, B)
    })
  };
  return Jt(e, {
    onBeforeEnter(A) {
      Cn(p, [A]), Gr(A, a), Gr(A, o)
    },
    onBeforeAppear(A) {
      Cn(S, [A]), Gr(A, l), Gr(A, u)
    },
    onEnter: I(!1),
    onAppear: I(!0),
    onLeave(A, L) {
      const O = () => D(A, L);
      Gr(A, c), TC(), Gr(A, h), Nd(() => {
        _i(A, c), Gr(A, v), Bd(w) || Fd(A, n, g, O)
      }), Cn(w, [A, O])
    },
    onEnterCancelled(A) {
      M(A, !1), Cn(_, [A])
    },
    onAppearCancelled(A) {
      M(A, !0), Cn(T, [A])
    },
    onLeaveCancelled(A) {
      D(A), Cn(b, [A])
    }
  })
}

function bC(t) {
  if (t == null) return null;
  if (Wt(t)) return [Iu(t.enter), Iu(t.leave)]; {
    const e = Iu(t);
    return [e, e]
  }
}

function Iu(t) {
  return ta(t)
}

function Gr(t, e) {
  e.split(/\s+/).forEach(r => r && t.classList.add(r)), (t._vtc || (t._vtc = new Set)).add(e)
}

function _i(t, e) {
  e.split(/\s+/).forEach(n => n && t.classList.remove(n));
  const {
    _vtc: r
  } = t;
  r && (r.delete(e), r.size || (t._vtc = void 0))
}

function Nd(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t)
  })
}
let xC = 0;

function Fd(t, e, r, n) {
  const i = t._endId = ++xC,
    a = () => {
      i === t._endId && n()
    };
  if (r) return setTimeout(a, r);
  const {
    type: o,
    timeout: s,
    propCount: l
  } = CC(t, e);
  if (!o) return n();
  const u = o + "end";
  let f = 0;
  const c = () => {
      t.removeEventListener(u, h), a()
    },
    h = v => {
      v.target === t && ++f >= l && c()
    };
  setTimeout(() => {
    f < l && c()
  }, s + 1), t.addEventListener(u, h)
}

function CC(t, e) {
  const r = window.getComputedStyle(t),
    n = d => (r[d] || "").split(", "),
    i = n($r + "Delay"),
    a = n($r + "Duration"),
    o = zd(i, a),
    s = n(ba + "Delay"),
    l = n(ba + "Duration"),
    u = zd(s, l);
  let f = null,
    c = 0,
    h = 0;
  e === $r ? o > 0 && (f = $r, c = o, h = a.length) : e === ba ? u > 0 && (f = ba, c = u, h = l.length) : (c = Math.max(o, u), f = c > 0 ? o > u ? $r : ba : null, h = f ? f === $r ? a.length : l.length : 0);
  const v = f === $r && /\b(transform|all)(,|$)/.test(r[$r + "Property"]);
  return {
    type: f,
    timeout: c,
    propCount: h,
    hasTransform: v
  }
}

function zd(t, e) {
  for (; t.length < e.length;) t = t.concat(t);
  return Math.max(...e.map((r, n) => Hd(r) + Hd(t[n])))
}

function Hd(t) {
  return Number(t.slice(0, -1).replace(",", ".")) * 1e3
}

function TC() {
  return document.body.offsetHeight
}
const _n = t => {
  const e = t.props["onUpdate:modelValue"];
  return ot(e) ? r => Ys(e, r) : e
};

function MC(t) {
  t.target.composing = !0
}

function Vd(t) {
  const e = t.target;
  e.composing && (e.composing = !1, DC(e, "input"))
}

function DC(t, e) {
  const r = document.createEvent("HTMLEvents");
  r.initEvent(e, !0, !0), t.dispatchEvent(r)
}
const lN = {
    created(t, {
      modifiers: {
        lazy: e,
        trim: r,
        number: n
      }
    }, i) {
      t._assign = _n(i);
      const a = n || i.props && i.props.type === "number";
      Dr(t, e ? "change" : "input", o => {
        if (o.target.composing) return;
        let s = t.value;
        r ? s = s.trim() : a && (s = ta(s)), t._assign(s)
      }), r && Dr(t, "change", () => {
        t.value = t.value.trim()
      }), e || (Dr(t, "compositionstart", MC), Dr(t, "compositionend", Vd), Dr(t, "change", Vd))
    },
    mounted(t, {
      value: e
    }) {
      t.value = e == null ? "" : e
    },
    beforeUpdate(t, {
      value: e,
      modifiers: {
        lazy: r,
        trim: n,
        number: i
      }
    }, a) {
      if (t._assign = _n(a), t.composing || document.activeElement === t && (r || n && t.value.trim() === e || (i || t.type === "number") && ta(t.value) === e)) return;
      const o = e == null ? "" : e;
      t.value !== o && (t.value = o)
    }
  },
  uN = {
    deep: !0,
    created(t, e, r) {
      t._assign = _n(r), Dr(t, "change", () => {
        const n = t._modelValue,
          i = na(t),
          a = t.checked,
          o = t._assign;
        if (ot(n)) {
          const s = Th(n, i),
            l = s !== -1;
          if (a && !l) o(n.concat(i));
          else if (!a && l) {
            const u = [...n];
            u.splice(s, 1), o(u)
          }
        } else if (fa(n)) {
          const s = new Set(n);
          a ? s.add(i) : s.delete(i), o(s)
        } else o($0(t, a))
      })
    },
    mounted: $d,
    beforeUpdate(t, e, r) {
      t._assign = _n(r), $d(t, e, r)
    }
  };

function $d(t, {
  value: e,
  oldValue: r
}, n) {
  t._modelValue = e, ot(e) ? t.checked = Th(e, n.props.value) > -1 : fa(e) ? t.checked = e.has(n.props.value) : e !== r && (t.checked = oi(e, $0(t, !0)))
}
const fN = {
    created(t, {
      value: e
    }, r) {
      t.checked = oi(e, r.props.value), t._assign = _n(r), Dr(t, "change", () => {
        t._assign(na(t))
      })
    },
    beforeUpdate(t, {
      value: e,
      oldValue: r
    }, n) {
      t._assign = _n(n), e !== r && (t.checked = oi(e, n.props.value))
    }
  },
  cN = {
    deep: !0,
    created(t, {
      value: e,
      modifiers: {
        number: r
      }
    }, n) {
      const i = fa(e);
      Dr(t, "change", () => {
        const a = Array.prototype.filter.call(t.options, o => o.selected).map(o => r ? ta(na(o)) : na(o));
        t._assign(t.multiple ? i ? new Set(a) : a : a[0])
      }), t._assign = _n(n)
    },
    mounted(t, {
      value: e
    }) {
      Gd(t, e)
    },
    beforeUpdate(t, e, r) {
      t._assign = _n(r)
    },
    updated(t, {
      value: e
    }) {
      Gd(t, e)
    }
  };

function Gd(t, e) {
  const r = t.multiple;
  if (!(r && !ot(e) && !fa(e))) {
    for (let n = 0, i = t.options.length; n < i; n++) {
      const a = t.options[n],
        o = na(a);
      if (r) ot(e) ? a.selected = Th(e, o) > -1 : a.selected = e.has(o);
      else if (oi(na(a), e)) {
        t.selectedIndex !== n && (t.selectedIndex = n);
        return
      }
    }!r && t.selectedIndex !== -1 && (t.selectedIndex = -1)
  }
}

function na(t) {
  return "_value" in t ? t._value : t.value
}

function $0(t, e) {
  const r = e ? "_trueValue" : "_falseValue";
  return r in t ? t[r] : e
}
const AC = ["ctrl", "shift", "alt", "meta"],
  PC = {
    stop: t => t.stopPropagation(),
    prevent: t => t.preventDefault(),
    self: t => t.target !== t.currentTarget,
    ctrl: t => !t.ctrlKey,
    shift: t => !t.shiftKey,
    alt: t => !t.altKey,
    meta: t => !t.metaKey,
    left: t => "button" in t && t.button !== 0,
    middle: t => "button" in t && t.button !== 1,
    right: t => "button" in t && t.button !== 2,
    exact: (t, e) => AC.some(r => t[`${r}Key`] && !e.includes(r))
  },
  hN = (t, e) => (r, ...n) => {
    for (let i = 0; i < e.length; i++) {
      const a = PC[e[i]];
      if (a && a(r, e)) return
    }
    return t(r, ...n)
  },
  vN = {
    beforeMount(t, {
      value: e
    }, {
      transition: r
    }) {
      t._vod = t.style.display === "none" ? "" : t.style.display, r && e ? r.beforeEnter(t) : xa(t, e)
    },
    mounted(t, {
      value: e
    }, {
      transition: r
    }) {
      r && e && r.enter(t)
    },
    updated(t, {
      value: e,
      oldValue: r
    }, {
      transition: n
    }) {
      !e != !r && (n ? e ? (n.beforeEnter(t), xa(t, !0), n.enter(t)) : n.leave(t, () => {
        xa(t, !1)
      }) : xa(t, e))
    },
    beforeUnmount(t, {
      value: e
    }) {
      xa(t, e)
    }
  };

function xa(t, e) {
  t.style.display = e ? t._vod : "none"
}
const IC = Jt({
  patchProp: _C
}, aC);
let Wd;

function G0() {
  return Wd || (Wd = zx(IC))
}
const dN = (...t) => {
    G0().render(...t)
  },
  pN = (...t) => {
    const e = G0().createApp(...t),
      {
        mount: r
      } = e;
    return e.mount = n => {
      const i = EC(n);
      if (!i) return;
      const a = e._component;
      !ht(a) && !a.render && !a.template && (a.template = i.innerHTML), i.innerHTML = "";
      const o = r(i, !1, i instanceof SVGElement);
      return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o
    }, e
  };

function EC(t) {
  return qt(t) ? document.querySelector(t) : t
}
var LC = !1;
/*!
 * pinia v2.0.12
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */
let W0;
const Ql = t => W0 = t,
  U0 = Symbol();

function vc(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function"
}
var ao;
(function (t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function"
})(ao || (ao = {}));

function gN() {
  const t = zm(!0),
    e = t.run(() => Fh({}));
  let r = [],
    n = [];
  const i = ea({
    install(a) {
      Ql(i), i._a = a, a.provide(U0, i), a.config.globalProperties.$pinia = i, n.forEach(o => r.push(o)), n = []
    },
    use(a) {
      return !this._a && !LC ? n.push(a) : r.push(a), this
    },
    _p: r,
    _a: null,
    _e: t,
    _s: new Map,
    state: e
  });
  return i
}
const Y0 = () => {};

function Ud(t, e, r, n = Y0) {
  t.push(e);
  const i = () => {
    const a = t.indexOf(e);
    a > -1 && (t.splice(a, 1), n())
  };
  return !r && jl() && Uh(i), i
}

function wi(t, ...e) {
  t.slice().forEach(r => {
    r(...e)
  })
}

function dc(t, e) {
  for (const r in e) {
    const n = e[r],
      i = t[r];
    vc(i) && vc(n) && !Gt(n) && !un(n) ? t[r] = dc(i, n) : t[r] = n
  }
  return t
}
const RC = Symbol();

function OC(t) {
  return !vc(t) || !t.hasOwnProperty(RC)
}
const {
  assign: Cr
} = Object;

function kC(t) {
  return !!(Gt(t) && t.effect)
}

function BC(t, e, r, n) {
  const {
    state: i,
    actions: a,
    getters: o
  } = e, s = r.state.value[t];
  let l;

  function u() {
    s || (r.state.value[t] = i ? i() : {});
    const f = Ub(r.state.value[t]);
    return Cr(f, a, Object.keys(o || {}).reduce((c, h) => (c[h] = ea(tr(() => {
      Ql(r);
      const v = r._s.get(t);
      return o[h].call(v, v)
    })), c), {}))
  }
  return l = X0(t, u, e, r), l.$reset = function () {
    const c = i ? i() : {};
    this.$patch(h => {
      Cr(h, c)
    })
  }, l
}

function X0(t, e, r = {}, n, i) {
  let a;
  const o = r.state,
    s = Cr({
      actions: {}
    }, r),
    l = {
      deep: !0
    };
  let u, f, c = ea([]),
    h = ea([]),
    v;
  const d = n.state.value[t];
  !o && !d && (n.state.value[t] = {}), Fh({});

  function y(S) {
    let x;
    u = f = !1, typeof S == "function" ? (S(n.state.value[t]), x = {
      type: ao.patchFunction,
      storeId: t,
      events: v
    }) : (dc(n.state.value[t], S), x = {
      type: ao.patchObject,
      payload: S,
      storeId: t,
      events: v
    }), Hh().then(() => {
      u = !0
    }), f = !0, wi(c, x, n.state.value[t])
  }
  const g = Y0;

  function p() {
    a.stop(), c = [], h = [], n._s.delete(t)
  }

  function m(S, x) {
    return function () {
      Ql(n);
      const T = Array.from(arguments),
        M = [],
        D = [];

      function I(O) {
        M.push(O)
      }

      function A(O) {
        D.push(O)
      }
      wi(h, {
        args: T,
        name: S,
        store: w,
        after: I,
        onError: A
      });
      let L;
      try {
        L = x.apply(this && this.$id === t ? this : w, T)
      } catch (O) {
        throw wi(D, O), O
      }
      return L instanceof Promise ? L.then(O => (wi(M, O), O)).catch(O => (wi(D, O), Promise.reject(O))) : (wi(M, L), L)
    }
  }
  const _ = {
      _p: n,
      $id: t,
      $onAction: Ud.bind(null, h),
      $patch: y,
      $reset: g,
      $subscribe(S, x = {}) {
        const T = Ud(c, S, x.detached, () => M()),
          M = a.run(() => no(() => n.state.value[t], D => {
            (x.flush === "sync" ? f : u) && S({
              storeId: t,
              type: ao.direct,
              events: v
            }, D)
          }, Cr({}, l, x)));
        return T
      },
      $dispose: p
    },
    w = da(Cr({}, _));
  n._s.set(t, w);
  const b = n._e.run(() => (a = zm(), a.run(() => e())));
  for (const S in b) {
    const x = b[S];
    if (Gt(x) && !kC(x) || un(x)) o || (d && OC(x) && (Gt(x) ? x.value = d[S] : dc(x, d[S])), n.state.value[t][S] = x);
    else if (typeof x == "function") {
      const T = m(S, x);
      b[S] = T, s.actions[S] = x
    }
  }
  return Cr(w, b), Cr(xt(w), b), Object.defineProperty(w, "$state", {
    get: () => n.state.value[t],
    set: S => {
      y(x => {
        Cr(x, S)
      })
    }
  }), n._p.forEach(S => {
    Cr(w, a.run(() => S({
      store: w,
      app: n._a,
      pinia: n,
      options: s
    })))
  }), d && o && r.hydrate && r.hydrate(w.$state, d), u = !0, f = !0, w
}

function yN(t, e, r) {
  let n, i;
  const a = typeof e == "function";
  typeof t == "string" ? (n = t, i = a ? r : e) : (i = t, n = t.id);

  function o(s, l) {
    const u = jl();
    return s = s || u && Ir(U0), s && Ql(s), s = W0, s._s.has(n) || (a ? X0(n, e, i, s) : BC(n, i, s)), s._s.get(n)
  }
  return o.$id = n, o
}
/*!
 * vue-router v4.0.14
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */
const q0 = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  pa = t => q0 ? Symbol(t) : "_vr_" + t,
  NC = pa("rvlm"),
  Yd = pa("rvd"),
  Jh = pa("r"),
  K0 = pa("rl"),
  pc = pa("rvl"),
  Fi = typeof window != "undefined";

function FC(t) {
  return t.__esModule || q0 && t[Symbol.toStringTag] === "Module"
}
const Et = Object.assign;

function Eu(t, e) {
  const r = {};
  for (const n in e) {
    const i = e[n];
    r[n] = Array.isArray(i) ? i.map(t) : t(i)
  }
  return r
}
const oo = () => {},
  zC = /\/$/,
  HC = t => t.replace(zC, "");

function Lu(t, e, r = "/") {
  let n, i = {},
    a = "",
    o = "";
  const s = e.indexOf("?"),
    l = e.indexOf("#", s > -1 ? s : 0);
  return s > -1 && (n = e.slice(0, s), a = e.slice(s + 1, l > -1 ? l : e.length), i = t(a)), l > -1 && (n = n || e.slice(0, l), o = e.slice(l, e.length)), n = WC(n != null ? n : e, r), {
    fullPath: n + (a && "?") + a + o,
    path: n,
    query: i,
    hash: o
  }
}

function VC(t, e) {
  const r = e.query ? t(e.query) : "";
  return e.path + (r && "?") + r + (e.hash || "")
}

function Xd(t, e) {
  return !e || !t.toLowerCase().startsWith(e.toLowerCase()) ? t : t.slice(e.length) || "/"
}

function $C(t, e, r) {
  const n = e.matched.length - 1,
    i = r.matched.length - 1;
  return n > -1 && n === i && ia(e.matched[n], r.matched[i]) && Z0(e.params, r.params) && t(e.query) === t(r.query) && e.hash === r.hash
}

function ia(t, e) {
  return (t.aliasOf || t) === (e.aliasOf || e)
}

function Z0(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const r in t)
    if (!GC(t[r], e[r])) return !1;
  return !0
}

function GC(t, e) {
  return Array.isArray(t) ? qd(t, e) : Array.isArray(e) ? qd(e, t) : t === e
}

function qd(t, e) {
  return Array.isArray(e) ? t.length === e.length && t.every((r, n) => r === e[n]) : t.length === 1 && t[0] === e
}

function WC(t, e) {
  if (t.startsWith("/")) return t;
  if (!t) return e;
  const r = e.split("/"),
    n = t.split("/");
  let i = r.length - 1,
    a, o;
  for (a = 0; a < n.length; a++)
    if (o = n[a], !(i === 1 || o === "."))
      if (o === "..") i--;
      else break;
  return r.slice(0, i).join("/") + "/" + n.slice(a - (a === n.length ? 1 : 0)).join("/")
}
var Po;
(function (t) {
  t.pop = "pop", t.push = "push"
})(Po || (Po = {}));
var so;
(function (t) {
  t.back = "back", t.forward = "forward", t.unknown = ""
})(so || (so = {}));

function UC(t) {
  if (!t)
    if (Fi) {
      const e = document.querySelector("base");
      t = e && e.getAttribute("href") || "/", t = t.replace(/^\w+:\/\/[^\/]+/, "")
    } else t = "/";
  return t[0] !== "/" && t[0] !== "#" && (t = "/" + t), HC(t)
}
const YC = /^[^#]+#/;

function XC(t, e) {
  return t.replace(YC, "#") + e
}

function qC(t, e) {
  const r = document.documentElement.getBoundingClientRect(),
    n = t.getBoundingClientRect();
  return {
    behavior: e.behavior,
    left: n.left - r.left - (e.left || 0),
    top: n.top - r.top - (e.top || 0)
  }
}
const Jl = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});

function KC(t) {
  let e;
  if ("el" in t) {
    const r = t.el,
      n = typeof r == "string" && r.startsWith("#"),
      i = typeof r == "string" ? n ? document.getElementById(r.slice(1)) : document.querySelector(r) : r;
    if (!i) return;
    e = qC(i, t)
  } else e = t;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(e) : window.scrollTo(e.left != null ? e.left : window.pageXOffset, e.top != null ? e.top : window.pageYOffset)
}

function Kd(t, e) {
  return (history.state ? history.state.position - e : -1) + t
}
const gc = new Map;

function ZC(t, e) {
  gc.set(t, e)
}

function jC(t) {
  const e = gc.get(t);
  return gc.delete(t), e
}
let QC = () => location.protocol + "//" + location.host;

function j0(t, e) {
  const {
    pathname: r,
    search: n,
    hash: i
  } = e, a = t.indexOf("#");
  if (a > -1) {
    let s = i.includes(t.slice(a)) ? t.slice(a).length : 1,
      l = i.slice(s);
    return l[0] !== "/" && (l = "/" + l), Xd(l, "")
  }
  return Xd(r, t) + n + i
}

function JC(t, e, r, n) {
  let i = [],
    a = [],
    o = null;
  const s = ({
    state: h
  }) => {
    const v = j0(t, location),
      d = r.value,
      y = e.value;
    let g = 0;
    if (h) {
      if (r.value = v, e.value = h, o && o === d) {
        o = null;
        return
      }
      g = y ? h.position - y.position : 0
    } else n(v);
    i.forEach(p => {
      p(r.value, d, {
        delta: g,
        type: Po.pop,
        direction: g ? g > 0 ? so.forward : so.back : so.unknown
      })
    })
  };

  function l() {
    o = r.value
  }

  function u(h) {
    i.push(h);
    const v = () => {
      const d = i.indexOf(h);
      d > -1 && i.splice(d, 1)
    };
    return a.push(v), v
  }

  function f() {
    const {
      history: h
    } = window;
    !h.state || h.replaceState(Et({}, h.state, {
      scroll: Jl()
    }), "")
  }

  function c() {
    for (const h of a) h();
    a = [], window.removeEventListener("popstate", s), window.removeEventListener("beforeunload", f)
  }
  return window.addEventListener("popstate", s), window.addEventListener("beforeunload", f), {
    pauseListeners: l,
    listen: u,
    destroy: c
  }
}

function Zd(t, e, r, n = !1, i = !1) {
  return {
    back: t,
    current: e,
    forward: r,
    replaced: n,
    position: window.history.length,
    scroll: i ? Jl() : null
  }
}

function tT(t) {
  const {
    history: e,
    location: r
  } = window, n = {
    value: j0(t, r)
  }, i = {
    value: e.state
  };
  i.value || a(n.value, {
    back: null,
    current: n.value,
    forward: null,
    position: e.length - 1,
    replaced: !0,
    scroll: null
  }, !0);

  function a(l, u, f) {
    const c = t.indexOf("#"),
      h = c > -1 ? (r.host && document.querySelector("base") ? t : t.slice(c)) + l : QC() + t + l;
    try {
      e[f ? "replaceState" : "pushState"](u, "", h), i.value = u
    } catch (v) {
      console.error(v), r[f ? "replace" : "assign"](h)
    }
  }

  function o(l, u) {
    const f = Et({}, e.state, Zd(i.value.back, l, i.value.forward, !0), u, {
      position: i.value.position
    });
    a(l, f, !0), n.value = l
  }

  function s(l, u) {
    const f = Et({}, i.value, e.state, {
      forward: l,
      scroll: Jl()
    });
    a(f.current, f, !0);
    const c = Et({}, Zd(n.value, l, null), {
      position: f.position + 1
    }, u);
    a(l, c, !1), n.value = l
  }
  return {
    location: n,
    state: i,
    push: s,
    replace: o
  }
}

function mN(t) {
  t = UC(t);
  const e = tT(t),
    r = JC(t, e.state, e.location, e.replace);

  function n(a, o = !0) {
    o || r.pauseListeners(), history.go(a)
  }
  const i = Et({
    location: "",
    base: t,
    go: n,
    createHref: XC.bind(null, t)
  }, e, r);
  return Object.defineProperty(i, "location", {
    enumerable: !0,
    get: () => e.location.value
  }), Object.defineProperty(i, "state", {
    enumerable: !0,
    get: () => e.state.value
  }), i
}

function eT(t) {
  return typeof t == "string" || t && typeof t == "object"
}

function Q0(t) {
  return typeof t == "string" || typeof t == "symbol"
}
const Wr = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  J0 = pa("nf");
var jd;
(function (t) {
  t[t.aborted = 4] = "aborted", t[t.cancelled = 8] = "cancelled", t[t.duplicated = 16] = "duplicated"
})(jd || (jd = {}));

function aa(t, e) {
  return Et(new Error, {
    type: t,
    [J0]: !0
  }, e)
}

function Ur(t, e) {
  return t instanceof Error && J0 in t && (e == null || !!(t.type & e))
}
const Qd = "[^/]+?",
  rT = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
  },
  nT = /[.+*?^${}()[\]/\\]/g;

function iT(t, e) {
  const r = Et({}, rT, e),
    n = [];
  let i = r.start ? "^" : "";
  const a = [];
  for (const u of t) {
    const f = u.length ? [] : [90];
    r.strict && !u.length && (i += "/");
    for (let c = 0; c < u.length; c++) {
      const h = u[c];
      let v = 40 + (r.sensitive ? .25 : 0);
      if (h.type === 0) c || (i += "/"), i += h.value.replace(nT, "\\$&"), v += 40;
      else if (h.type === 1) {
        const {
          value: d,
          repeatable: y,
          optional: g,
          regexp: p
        } = h;
        a.push({
          name: d,
          repeatable: y,
          optional: g
        });
        const m = p || Qd;
        if (m !== Qd) {
          v += 10;
          try {
            new RegExp(`(${m})`)
          } catch (w) {
            throw new Error(`Invalid custom RegExp for param "${d}" (${m}): ` + w.message)
          }
        }
        let _ = y ? `((?:${m})(?:/(?:${m}))*)` : `(${m})`;
        c || (_ = g && u.length < 2 ? `(?:/${_})` : "/" + _), g && (_ += "?"), i += _, v += 20, g && (v += -8), y && (v += -20), m === ".*" && (v += -50)
      }
      f.push(v)
    }
    n.push(f)
  }
  if (r.strict && r.end) {
    const u = n.length - 1;
    n[u][n[u].length - 1] += .7000000000000001
  }
  r.strict || (i += "/?"), r.end ? i += "$" : r.strict && (i += "(?:/|$)");
  const o = new RegExp(i, r.sensitive ? "" : "i");

  function s(u) {
    const f = u.match(o),
      c = {};
    if (!f) return null;
    for (let h = 1; h < f.length; h++) {
      const v = f[h] || "",
        d = a[h - 1];
      c[d.name] = v && d.repeatable ? v.split("/") : v
    }
    return c
  }

  function l(u) {
    let f = "",
      c = !1;
    for (const h of t) {
      (!c || !f.endsWith("/")) && (f += "/"), c = !1;
      for (const v of h)
        if (v.type === 0) f += v.value;
        else if (v.type === 1) {
        const {
          value: d,
          repeatable: y,
          optional: g
        } = v, p = d in u ? u[d] : "";
        if (Array.isArray(p) && !y) throw new Error(`Provided param "${d}" is an array but it is not repeatable (* or + modifiers)`);
        const m = Array.isArray(p) ? p.join("/") : p;
        if (!m)
          if (g) h.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : c = !0);
          else throw new Error(`Missing required param "${d}"`);
        f += m
      }
    }
    return f
  }
  return {
    re: o,
    score: n,
    keys: a,
    parse: s,
    stringify: l
  }
}

function aT(t, e) {
  let r = 0;
  for (; r < t.length && r < e.length;) {
    const n = e[r] - t[r];
    if (n) return n;
    r++
  }
  return t.length < e.length ? t.length === 1 && t[0] === 40 + 40 ? -1 : 1 : t.length > e.length ? e.length === 1 && e[0] === 40 + 40 ? 1 : -1 : 0
}

function oT(t, e) {
  let r = 0;
  const n = t.score,
    i = e.score;
  for (; r < n.length && r < i.length;) {
    const a = aT(n[r], i[r]);
    if (a) return a;
    r++
  }
  return i.length - n.length
}
const sT = {
    type: 0,
    value: ""
  },
  lT = /[a-zA-Z0-9_]/;

function uT(t) {
  if (!t) return [
    []
  ];
  if (t === "/") return [
    [sT]
  ];
  if (!t.startsWith("/")) throw new Error(`Invalid path "${t}"`);

  function e(v) {
    throw new Error(`ERR (${r})/"${u}": ${v}`)
  }
  let r = 0,
    n = r;
  const i = [];
  let a;

  function o() {
    a && i.push(a), a = []
  }
  let s = 0,
    l, u = "",
    f = "";

  function c() {
    !u || (r === 0 ? a.push({
      type: 0,
      value: u
    }) : r === 1 || r === 2 || r === 3 ? (a.length > 1 && (l === "*" || l === "+") && e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), a.push({
      type: 1,
      value: u,
      regexp: f,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : e("Invalid state to consume buffer"), u = "")
  }

  function h() {
    u += l
  }
  for (; s < t.length;) {
    if (l = t[s++], l === "\\" && r !== 2) {
      n = r, r = 4;
      continue
    }
    switch (r) {
      case 0:
        l === "/" ? (u && c(), o()) : l === ":" ? (c(), r = 1) : h();
        break;
      case 4:
        h(), r = n;
        break;
      case 1:
        l === "(" ? r = 2 : lT.test(l) ? h() : (c(), r = 0, l !== "*" && l !== "?" && l !== "+" && s--);
        break;
      case 2:
        l === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + l : r = 3 : f += l;
        break;
      case 3:
        c(), r = 0, l !== "*" && l !== "?" && l !== "+" && s--, f = "";
        break;
      default:
        e("Unknown state");
        break
    }
  }
  return r === 2 && e(`Unfinished custom RegExp for param "${u}"`), c(), o(), i
}

function fT(t, e, r) {
  const n = iT(uT(t.path), r),
    i = Et(n, {
      record: t,
      parent: e,
      children: [],
      alias: []
    });
  return e && !i.record.aliasOf == !e.record.aliasOf && e.children.push(i), i
}

function cT(t, e) {
  const r = [],
    n = new Map;
  e = tp({
    strict: !1,
    end: !0,
    sensitive: !1
  }, e);

  function i(f) {
    return n.get(f)
  }

  function a(f, c, h) {
    const v = !h,
      d = vT(f);
    d.aliasOf = h && h.record;
    const y = tp(e, f),
      g = [d];
    if ("alias" in f) {
      const _ = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const w of _) g.push(Et({}, d, {
        components: h ? h.record.components : d.components,
        path: w,
        aliasOf: h ? h.record : d
      }))
    }
    let p, m;
    for (const _ of g) {
      const {
        path: w
      } = _;
      if (c && w[0] !== "/") {
        const b = c.record.path,
          S = b[b.length - 1] === "/" ? "" : "/";
        _.path = c.record.path + (w && S + w)
      }
      if (p = fT(_, c, y), h ? h.alias.push(p) : (m = m || p, m !== p && m.alias.push(p), v && f.name && !Jd(p) && o(f.name)), "children" in d) {
        const b = d.children;
        for (let S = 0; S < b.length; S++) a(b[S], p, h && h.children[S])
      }
      h = h || p, l(p)
    }
    return m ? () => {
      o(m)
    } : oo
  }

  function o(f) {
    if (Q0(f)) {
      const c = n.get(f);
      c && (n.delete(f), r.splice(r.indexOf(c), 1), c.children.forEach(o), c.alias.forEach(o))
    } else {
      const c = r.indexOf(f);
      c > -1 && (r.splice(c, 1), f.record.name && n.delete(f.record.name), f.children.forEach(o), f.alias.forEach(o))
    }
  }

  function s() {
    return r
  }

  function l(f) {
    let c = 0;
    for (; c < r.length && oT(f, r[c]) >= 0 && (f.record.path !== r[c].record.path || !t_(f, r[c]));) c++;
    r.splice(c, 0, f), f.record.name && !Jd(f) && n.set(f.record.name, f)
  }

  function u(f, c) {
    let h, v = {},
      d, y;
    if ("name" in f && f.name) {
      if (h = n.get(f.name), !h) throw aa(1, {
        location: f
      });
      y = h.record.name, v = Et(hT(c.params, h.keys.filter(m => !m.optional).map(m => m.name)), f.params), d = h.stringify(v)
    } else if ("path" in f) d = f.path, h = r.find(m => m.re.test(d)), h && (v = h.parse(d), y = h.record.name);
    else {
      if (h = c.name ? n.get(c.name) : r.find(m => m.re.test(c.path)), !h) throw aa(1, {
        location: f,
        currentLocation: c
      });
      y = h.record.name, v = Et({}, c.params, f.params), d = h.stringify(v)
    }
    const g = [];
    let p = h;
    for (; p;) g.unshift(p.record), p = p.parent;
    return {
      name: y,
      path: d,
      params: v,
      matched: g,
      meta: pT(g)
    }
  }
  return t.forEach(f => a(f)), {
    addRoute: a,
    resolve: u,
    removeRoute: o,
    getRoutes: s,
    getRecordMatcher: i
  }
}

function hT(t, e) {
  const r = {};
  for (const n of e) n in t && (r[n] = t[n]);
  return r
}

function vT(t) {
  return {
    path: t.path,
    redirect: t.redirect,
    name: t.name,
    meta: t.meta || {},
    aliasOf: void 0,
    beforeEnter: t.beforeEnter,
    props: dT(t),
    children: t.children || [],
    instances: {},
    leaveGuards: new Set,
    updateGuards: new Set,
    enterCallbacks: {},
    components: "components" in t ? t.components || {} : {
      default: t.component
    }
  }
}

function dT(t) {
  const e = {},
    r = t.props || !1;
  if ("component" in t) e.default = r;
  else
    for (const n in t.components) e[n] = typeof r == "boolean" ? r : r[n];
  return e
}

function Jd(t) {
  for (; t;) {
    if (t.record.aliasOf) return !0;
    t = t.parent
  }
  return !1
}

function pT(t) {
  return t.reduce((e, r) => Et(e, r.meta), {})
}

function tp(t, e) {
  const r = {};
  for (const n in t) r[n] = n in e ? e[n] : t[n];
  return r
}

function t_(t, e) {
  return e.children.some(r => r === t || t_(t, r))
}
const e_ = /#/g,
  gT = /&/g,
  yT = /\//g,
  mT = /=/g,
  _T = /\?/g,
  r_ = /\+/g,
  wT = /%5B/g,
  ST = /%5D/g,
  n_ = /%5E/g,
  bT = /%60/g,
  i_ = /%7B/g,
  xT = /%7C/g,
  a_ = /%7D/g,
  CT = /%20/g;

function tv(t) {
  return encodeURI("" + t).replace(xT, "|").replace(wT, "[").replace(ST, "]")
}

function TT(t) {
  return tv(t).replace(i_, "{").replace(a_, "}").replace(n_, "^")
}

function yc(t) {
  return tv(t).replace(r_, "%2B").replace(CT, "+").replace(e_, "%23").replace(gT, "%26").replace(bT, "`").replace(i_, "{").replace(a_, "}").replace(n_, "^")
}

function MT(t) {
  return yc(t).replace(mT, "%3D")
}

function DT(t) {
  return tv(t).replace(e_, "%23").replace(_T, "%3F")
}

function AT(t) {
  return t == null ? "" : DT(t).replace(yT, "%2F")
}

function yl(t) {
  try {
    return decodeURIComponent("" + t)
  } catch (e) {}
  return "" + t
}

function PT(t) {
  const e = {};
  if (t === "" || t === "?") return e;
  const n = (t[0] === "?" ? t.slice(1) : t).split("&");
  for (let i = 0; i < n.length; ++i) {
    const a = n[i].replace(r_, " "),
      o = a.indexOf("="),
      s = yl(o < 0 ? a : a.slice(0, o)),
      l = o < 0 ? null : yl(a.slice(o + 1));
    if (s in e) {
      let u = e[s];
      Array.isArray(u) || (u = e[s] = [u]), u.push(l)
    } else e[s] = l
  }
  return e
}

function ep(t) {
  let e = "";
  for (let r in t) {
    const n = t[r];
    if (r = MT(r), n == null) {
      n !== void 0 && (e += (e.length ? "&" : "") + r);
      continue
    }(Array.isArray(n) ? n.map(a => a && yc(a)) : [n && yc(n)]).forEach(a => {
      a !== void 0 && (e += (e.length ? "&" : "") + r, a != null && (e += "=" + a))
    })
  }
  return e
}

function IT(t) {
  const e = {};
  for (const r in t) {
    const n = t[r];
    n !== void 0 && (e[r] = Array.isArray(n) ? n.map(i => i == null ? null : "" + i) : n == null ? n : "" + n)
  }
  return e
}

function Ca() {
  let t = [];

  function e(n) {
    return t.push(n), () => {
      const i = t.indexOf(n);
      i > -1 && t.splice(i, 1)
    }
  }

  function r() {
    t = []
  }
  return {
    add: e,
    list: () => t,
    reset: r
  }
}

function an(t, e, r, n, i) {
  const a = n && (n.enterCallbacks[i] = n.enterCallbacks[i] || []);
  return () => new Promise((o, s) => {
    const l = c => {
        c === !1 ? s(aa(4, {
          from: r,
          to: e
        })) : c instanceof Error ? s(c) : eT(c) ? s(aa(2, {
          from: e,
          to: c
        })) : (a && n.enterCallbacks[i] === a && typeof c == "function" && a.push(c), o())
      },
      u = t.call(n && n.instances[i], e, r, l);
    let f = Promise.resolve(u);
    t.length < 3 && (f = f.then(l)), f.catch(c => s(c))
  })
}

function Ru(t, e, r, n) {
  const i = [];
  for (const a of t)
    for (const o in a.components) {
      let s = a.components[o];
      if (!(e !== "beforeRouteEnter" && !a.instances[o]))
        if (ET(s)) {
          const u = (s.__vccOpts || s)[e];
          u && i.push(an(u, r, n, a, o))
        } else {
          let l = s();
          i.push(() => l.then(u => {
            if (!u) return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${a.path}"`));
            const f = FC(u) ? u.default : u;
            a.components[o] = f;
            const h = (f.__vccOpts || f)[e];
            return h && an(h, r, n, a, o)()
          }))
        }
    }
  return i
}

function ET(t) {
  return typeof t == "object" || "displayName" in t || "props" in t || "__vccOpts" in t
}

function rp(t) {
  const e = Ir(Jh),
    r = Ir(K0),
    n = tr(() => e.resolve(to(t.to))),
    i = tr(() => {
      const {
        matched: l
      } = n.value, {
        length: u
      } = l, f = l[u - 1], c = r.matched;
      if (!f || !c.length) return -1;
      const h = c.findIndex(ia.bind(null, f));
      if (h > -1) return h;
      const v = np(l[u - 2]);
      return u > 1 && np(f) === v && c[c.length - 1].path !== v ? c.findIndex(ia.bind(null, l[u - 2])) : h
    }),
    a = tr(() => i.value > -1 && kT(r.params, n.value.params)),
    o = tr(() => i.value > -1 && i.value === r.matched.length - 1 && Z0(r.params, n.value.params));

  function s(l = {}) {
    return OT(l) ? e[to(t.replace) ? "replace" : "push"](to(t.to)).catch(oo) : Promise.resolve()
  }
  return {
    route: n,
    href: tr(() => n.value.href),
    isActive: a,
    isExactActive: o,
    navigate: s
  }
}
const LT = g0({
    name: "RouterLink",
    props: {
      to: {
        type: [String, Object],
        required: !0
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink: rp,
    setup(t, {
      slots: e
    }) {
      const r = da(rp(t)),
        {
          options: n
        } = Ir(Jh),
        i = tr(() => ({
          [ip(t.activeClass, n.linkActiveClass, "router-link-active")]: r.isActive,
          [ip(t.exactActiveClass, n.linkExactActiveClass, "router-link-exact-active")]: r.isExactActive
        }));
      return () => {
        const a = e.default && e.default(r);
        return t.custom ? a : Qh("a", {
          "aria-current": r.isExactActive ? t.ariaCurrentValue : null,
          href: r.href,
          onClick: r.navigate,
          class: i.value
        }, a)
      }
    }
  }),
  RT = LT;

function OT(t) {
  if (!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey) && !t.defaultPrevented && !(t.button !== void 0 && t.button !== 0)) {
    if (t.currentTarget && t.currentTarget.getAttribute) {
      const e = t.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(e)) return
    }
    return t.preventDefault && t.preventDefault(), !0
  }
}

function kT(t, e) {
  for (const r in e) {
    const n = e[r],
      i = t[r];
    if (typeof n == "string") {
      if (n !== i) return !1
    } else if (!Array.isArray(i) || i.length !== n.length || n.some((a, o) => a !== i[o])) return !1
  }
  return !0
}

function np(t) {
  return t ? t.aliasOf ? t.aliasOf.path : t.path : ""
}
const ip = (t, e, r) => t != null ? t : e != null ? e : r,
  BT = g0({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    setup(t, {
      attrs: e,
      slots: r
    }) {
      const n = Ir(pc),
        i = tr(() => t.route || n.value),
        a = Ir(Yd, 0),
        o = tr(() => i.value.matched[a]);
      Xs(Yd, a + 1), Xs(NC, o), Xs(pc, i);
      const s = Fh();
      return no(() => [s.value, o.value, t.name], ([l, u, f], [c, h, v]) => {
        u && (u.instances[f] = l, h && h !== u && l && l === c && (u.leaveGuards.size || (u.leaveGuards = h.leaveGuards), u.updateGuards.size || (u.updateGuards = h.updateGuards))), l && u && (!h || !ia(u, h) || !c) && (u.enterCallbacks[f] || []).forEach(d => d(l))
      }, {
        flush: "post"
      }), () => {
        const l = i.value,
          u = o.value,
          f = u && u.components[t.name],
          c = t.name;
        if (!f) return ap(r.default, {
          Component: f,
          route: l
        });
        const h = u.props[t.name],
          v = h ? h === !0 ? l.params : typeof h == "function" ? h(l) : h : null,
          y = Qh(f, Et({}, v, e, {
            onVnodeUnmounted: g => {
              g.component.isUnmounted && (u.instances[c] = null)
            },
            ref: s
          }));
        return ap(r.default, {
          Component: y,
          route: l
        }) || y
      }
    }
  });

function ap(t, e) {
  if (!t) return null;
  const r = t(e);
  return r.length === 1 ? r[0] : r
}
const NT = BT;

function _N(t) {
  const e = cT(t.routes, t),
    r = t.parseQuery || PT,
    n = t.stringifyQuery || ep,
    i = t.history,
    a = Ca(),
    o = Ca(),
    s = Ca(),
    l = $b(Wr);
  let u = Wr;
  Fi && t.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = Eu.bind(null, k => "" + k),
    c = Eu.bind(null, AT),
    h = Eu.bind(null, yl);

  function v(k, W) {
    let V, tt;
    return Q0(k) ? (V = e.getRecordMatcher(k), tt = W) : tt = k, e.addRoute(tt, V)
  }

  function d(k) {
    const W = e.getRecordMatcher(k);
    W && e.removeRoute(W)
  }

  function y() {
    return e.getRoutes().map(k => k.record)
  }

  function g(k) {
    return !!e.getRecordMatcher(k)
  }

  function p(k, W) {
    if (W = Et({}, W || l.value), typeof k == "string") {
      const K = Lu(r, k, W.path),
        C = e.resolve({
          path: K.path
        }, W),
        E = i.createHref(K.fullPath);
      return Et(K, C, {
        params: h(C.params),
        hash: yl(K.hash),
        redirectedFrom: void 0,
        href: E
      })
    }
    let V;
    if ("path" in k) V = Et({}, k, {
      path: Lu(r, k.path, W.path).path
    });
    else {
      const K = Et({}, k.params);
      for (const C in K) K[C] == null && delete K[C];
      V = Et({}, k, {
        params: c(k.params)
      }), W.params = c(W.params)
    }
    const tt = e.resolve(V, W),
      vt = k.hash || "";
    tt.params = f(h(tt.params));
    const ut = VC(n, Et({}, k, {
        hash: TT(vt),
        path: tt.path
      })),
      Y = i.createHref(ut);
    return Et({
      fullPath: ut,
      hash: vt,
      query: n === ep ? IT(k.query) : k.query || {}
    }, tt, {
      redirectedFrom: void 0,
      href: Y
    })
  }

  function m(k) {
    return typeof k == "string" ? Lu(r, k, l.value.path) : Et({}, k)
  }

  function _(k, W) {
    if (u !== k) return aa(8, {
      from: W,
      to: k
    })
  }

  function w(k) {
    return x(k)
  }

  function b(k) {
    return w(Et(m(k), {
      replace: !0
    }))
  }

  function S(k) {
    const W = k.matched[k.matched.length - 1];
    if (W && W.redirect) {
      const {
        redirect: V
      } = W;
      let tt = typeof V == "function" ? V(k) : V;
      return typeof tt == "string" && (tt = tt.includes("?") || tt.includes("#") ? tt = m(tt) : {
        path: tt
      }, tt.params = {}), Et({
        query: k.query,
        hash: k.hash,
        params: k.params
      }, tt)
    }
  }

  function x(k, W) {
    const V = u = p(k),
      tt = l.value,
      vt = k.state,
      ut = k.force,
      Y = k.replace === !0,
      K = S(V);
    if (K) return x(Et(m(K), {
      state: vt,
      force: ut,
      replace: Y
    }), W || V);
    const C = V;
    C.redirectedFrom = W;
    let E;
    return !ut && $C(n, tt, V) && (E = aa(16, {
      to: C,
      from: tt
    }), lt(tt, tt, !0, !1)), (E ? Promise.resolve(E) : M(C, tt)).catch(R => Ur(R) ? Ur(R, 2) ? R : Z(R) : Q(R, C, tt)).then(R => {
      if (R) {
        if (Ur(R, 2)) return x(Et(m(R.to), {
          state: vt,
          force: ut,
          replace: Y
        }), W || C)
      } else R = I(C, tt, !0, Y, vt);
      return D(C, tt, R), R
    })
  }

  function T(k, W) {
    const V = _(k, W);
    return V ? Promise.reject(V) : Promise.resolve()
  }

  function M(k, W) {
    let V;
    const [tt, vt, ut] = FT(k, W);
    V = Ru(tt.reverse(), "beforeRouteLeave", k, W);
    for (const K of tt) K.leaveGuards.forEach(C => {
      V.push(an(C, k, W))
    });
    const Y = T.bind(null, k, W);
    return V.push(Y), Si(V).then(() => {
      V = [];
      for (const K of a.list()) V.push(an(K, k, W));
      return V.push(Y), Si(V)
    }).then(() => {
      V = Ru(vt, "beforeRouteUpdate", k, W);
      for (const K of vt) K.updateGuards.forEach(C => {
        V.push(an(C, k, W))
      });
      return V.push(Y), Si(V)
    }).then(() => {
      V = [];
      for (const K of k.matched)
        if (K.beforeEnter && !W.matched.includes(K))
          if (Array.isArray(K.beforeEnter))
            for (const C of K.beforeEnter) V.push(an(C, k, W));
          else V.push(an(K.beforeEnter, k, W));
      return V.push(Y), Si(V)
    }).then(() => (k.matched.forEach(K => K.enterCallbacks = {}), V = Ru(ut, "beforeRouteEnter", k, W), V.push(Y), Si(V))).then(() => {
      V = [];
      for (const K of o.list()) V.push(an(K, k, W));
      return V.push(Y), Si(V)
    }).catch(K => Ur(K, 8) ? K : Promise.reject(K))
  }

  function D(k, W, V) {
    for (const tt of s.list()) tt(k, W, V)
  }

  function I(k, W, V, tt, vt) {
    const ut = _(k, W);
    if (ut) return ut;
    const Y = W === Wr,
      K = Fi ? history.state : {};
    V && (tt || Y ? i.replace(k.fullPath, Et({
      scroll: Y && K && K.scroll
    }, vt)) : i.push(k.fullPath, vt)), l.value = k, lt(k, W, V, Y), Z()
  }
  let A;

  function L() {
    A = i.listen((k, W, V) => {
      const tt = p(k),
        vt = S(tt);
      if (vt) {
        x(Et(vt, {
          replace: !0
        }), tt).catch(oo);
        return
      }
      u = tt;
      const ut = l.value;
      Fi && ZC(Kd(ut.fullPath, V.delta), Jl()), M(tt, ut).catch(Y => Ur(Y, 12) ? Y : Ur(Y, 2) ? (x(Y.to, tt).then(K => {
        Ur(K, 20) && !V.delta && V.type === Po.pop && i.go(-1, !1)
      }).catch(oo), Promise.reject()) : (V.delta && i.go(-V.delta, !1), Q(Y, tt, ut))).then(Y => {
        Y = Y || I(tt, ut, !1), Y && (V.delta ? i.go(-V.delta, !1) : V.type === Po.pop && Ur(Y, 20) && i.go(-1, !1)), D(tt, ut, Y)
      }).catch(oo)
    })
  }
  let O = Ca(),
    H = Ca(),
    B;

  function Q(k, W, V) {
    Z(k);
    const tt = H.list();
    return tt.length ? tt.forEach(vt => vt(k, W, V)) : console.error(k), Promise.reject(k)
  }

  function G() {
    return B && l.value !== Wr ? Promise.resolve() : new Promise((k, W) => {
      O.add([k, W])
    })
  }

  function Z(k) {
    return B || (B = !k, L(), O.list().forEach(([W, V]) => k ? V(k) : W()), O.reset()), k
  }

  function lt(k, W, V, tt) {
    const {
      scrollBehavior: vt
    } = t;
    if (!Fi || !vt) return Promise.resolve();
    const ut = !V && jC(Kd(k.fullPath, 0)) || (tt || !V) && history.state && history.state.scroll || null;
    return Hh().then(() => vt(k, W, ut)).then(Y => Y && KC(Y)).catch(Y => Q(Y, k, W))
  }
  const _t = k => i.go(k);
  let yt;
  const pt = new Set;
  return {
    currentRoute: l,
    addRoute: v,
    removeRoute: d,
    hasRoute: g,
    getRoutes: y,
    resolve: p,
    options: t,
    push: w,
    replace: b,
    go: _t,
    back: () => _t(-1),
    forward: () => _t(1),
    beforeEach: a.add,
    beforeResolve: o.add,
    afterEach: s.add,
    onError: H.add,
    isReady: G,
    install(k) {
      const W = this;
      k.component("RouterLink", RT), k.component("RouterView", NT), k.config.globalProperties.$router = W, Object.defineProperty(k.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => to(l)
      }), Fi && !yt && l.value === Wr && (yt = !0, w(i.location).catch(vt => {}));
      const V = {};
      for (const vt in Wr) V[vt] = tr(() => l.value[vt]);
      k.provide(Jh, W), k.provide(K0, da(V)), k.provide(pc, l);
      const tt = k.unmount;
      pt.add(k), k.unmount = function () {
        pt.delete(k), pt.size < 1 && (u = Wr, A && A(), l.value = Wr, yt = !1, B = !1), tt()
      }
    }
  }
}

function Si(t) {
  return t.reduce((e, r) => e.then(() => r()), Promise.resolve())
}

function FT(t, e) {
  const r = [],
    n = [],
    i = [],
    a = Math.max(e.matched.length, t.matched.length);
  for (let o = 0; o < a; o++) {
    const s = e.matched[o];
    s && (t.matched.find(u => ia(u, s)) ? n.push(s) : r.push(s));
    const l = t.matched[o];
    l && (e.matched.find(u => ia(u, l)) || i.push(l))
  }
  return [r, n, i]
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var mc = function (t, e) {
  return mc = Object.setPrototypeOf || {
    __proto__: []
  }
  instanceof Array && function (r, n) {
    r.__proto__ = n
  } || function (r, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i])
  }, mc(t, e)
};

function J(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  mc(t, e);

  function r() {
    this.constructor = t
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r)
}
var zT = function () {
    function t() {
      this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1
    }
    return t
  }(),
  HT = function () {
    function t() {
      this.browser = new zT, this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window != "undefined"
    }
    return t
  }(),
  Kn = new HT;
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (Kn.wxa = !0, Kn.touchEventsSupported = !0) : typeof document == "undefined" && typeof self != "undefined" ? Kn.worker = !0 : typeof navigator == "undefined" ? (Kn.node = !0, Kn.svgSupported = !0) : VT(navigator.userAgent, Kn);

function VT(t, e) {
  var r = e.browser,
    n = t.match(/Firefox\/([\d.]+)/),
    i = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
    a = t.match(/Edge?\/([\d.]+)/),
    o = /micromessenger/i.test(t);
  n && (r.firefox = !0, r.version = n[1]), i && (r.ie = !0, r.version = i[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), e.svgSupported = typeof SVGRect != "undefined", e.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, e.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11), e.domSupported = typeof document != "undefined";
  var s = document.documentElement.style;
  e.transform3dSupported = (r.ie && "transition" in s || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix || "MozPerspective" in s) && !("OTransition" in s), e.transformSupported = e.transform3dSupported || r.ie && +r.version >= 9
}
var mt = Kn,
  ev = 12,
  $T = "sans-serif",
  si = ev + "px " + $T,
  GT = 20,
  WT = 100,
  UT = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";

function YT(t) {
  var e = {};
  if (typeof JSON == "undefined") return e;
  for (var r = 0; r < t.length; r++) {
    var n = String.fromCharCode(r + 32),
      i = (t.charCodeAt(r) - GT) / WT;
    e[n] = i
  }
  return e
}
var XT = YT(UT),
  di = {
    createCanvas: function () {
      return typeof document != "undefined" && document.createElement("canvas")
    },
    measureText: function () {
      var t, e;
      return function (r, n) {
        if (!t) {
          var i = di.createCanvas();
          t = i && i.getContext("2d")
        }
        if (t) return e !== n && (e = t.font = n || si), t.measureText(r);
        r = r || "", n = n || si;
        var a = /^([0-9]*?)px$/.exec(n),
          o = +(a && a[1]) || ev,
          s = 0;
        if (n.indexOf("mono") >= 0) s = o * r.length;
        else
          for (var l = 0; l < r.length; l++) {
            var u = XT[r[l]];
            s += u == null ? o : u * o
          }
        return {
          width: s
        }
      }
    }(),
    loadImage: function (t, e, r) {
      var n = new Image;
      return n.onload = e, n.onerror = r, n.src = t, n
    }
  },
  o_ = ga(["Function", "RegExp", "Date", "Error", "CanvasGradient", "CanvasPattern", "Image", "Canvas"], function (t, e) {
    return t["[object " + e + "]"] = !0, t
  }, {}),
  s_ = ga(["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64"], function (t, e) {
    return t["[object " + e + "Array]"] = !0, t
  }, {}),
  qo = Object.prototype.toString,
  tu = Array.prototype,
  qT = tu.forEach,
  KT = tu.filter,
  rv = tu.slice,
  ZT = tu.map,
  op = function () {}.constructor,
  ss = op ? op.prototype : null,
  nv = "__proto__",
  jT = 2311;

function l_() {
  return jT++
}

function iv() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  typeof console != "undefined" && console.error.apply(console, t)
}

function St(t) {
  if (t == null || typeof t != "object") return t;
  var e = t,
    r = qo.call(t);
  if (r === "[object Array]") {
    if (!lo(t)) {
      e = [];
      for (var n = 0, i = t.length; n < i; n++) e[n] = St(t[n])
    }
  } else if (s_[r]) {
    if (!lo(t)) {
      var a = t.constructor;
      if (a.from) e = a.from(t);
      else {
        e = new a(t.length);
        for (var n = 0, i = t.length; n < i; n++) e[n] = t[n]
      }
    }
  } else if (!o_[r] && !lo(t) && !ml(t)) {
    e = {};
    for (var o in t) t.hasOwnProperty(o) && o !== nv && (e[o] = St(t[o]))
  }
  return e
}

function Tt(t, e, r) {
  if (!st(e) || !st(t)) return r ? St(e) : t;
  for (var n in e)
    if (e.hasOwnProperty(n) && n !== nv) {
      var i = t[n],
        a = e[n];
      st(a) && st(i) && !et(a) && !et(i) && !ml(a) && !ml(i) && !sp(a) && !sp(i) && !lo(a) && !lo(i) ? Tt(i, a, r) : (r || !(n in t)) && (t[n] = St(e[n]))
    } return t
}

function q(t, e) {
  if (Object.assign) Object.assign(t, e);
  else
    for (var r in e) e.hasOwnProperty(r) && r !== nv && (t[r] = e[r]);
  return t
}

function Dt(t, e, r) {
  for (var n = Vt(e), i = 0; i < n.length; i++) {
    var a = n[i];
    (r ? e[a] != null : t[a] == null) && (t[a] = e[a])
  }
  return t
}
di.createCanvas;

function Pt(t, e) {
  if (t) {
    if (t.indexOf) return t.indexOf(e);
    for (var r = 0, n = t.length; r < n; r++)
      if (t[r] === e) return r
  }
  return -1
}

function QT(t, e) {
  var r = t.prototype;

  function n() {}
  n.prototype = e.prototype, t.prototype = new n;
  for (var i in r) r.hasOwnProperty(i) && (t.prototype[i] = r[i]);
  t.prototype.constructor = t, t.superClass = e
}

function mr(t, e, r) {
  if (t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, Object.getOwnPropertyNames)
    for (var n = Object.getOwnPropertyNames(e), i = 0; i < n.length; i++) {
      var a = n[i];
      a !== "constructor" && (r ? e[a] != null : t[a] == null) && (t[a] = e[a])
    } else Dt(t, e, r)
}

function we(t) {
  return !t || typeof t == "string" ? !1 : typeof t.length == "number"
}

function P(t, e, r) {
  if (!!(t && e))
    if (t.forEach && t.forEach === qT) t.forEach(e, r);
    else if (t.length === +t.length)
    for (var n = 0, i = t.length; n < i; n++) e.call(r, t[n], n, t);
  else
    for (var a in t) t.hasOwnProperty(a) && e.call(r, t[a], a, t)
}

function ct(t, e, r) {
  if (!t) return [];
  if (!e) return av(t);
  if (t.map && t.map === ZT) return t.map(e, r);
  for (var n = [], i = 0, a = t.length; i < a; i++) n.push(e.call(r, t[i], i, t));
  return n
}

function ga(t, e, r, n) {
  if (!!(t && e)) {
    for (var i = 0, a = t.length; i < a; i++) r = e.call(n, r, t[i], i, t);
    return r
  }
}

function ge(t, e, r) {
  if (!t) return [];
  if (!e) return av(t);
  if (t.filter && t.filter === KT) return t.filter(e, r);
  for (var n = [], i = 0, a = t.length; i < a; i++) e.call(r, t[i], i, t) && n.push(t[i]);
  return n
}

function Vt(t) {
  if (!t) return [];
  if (Object.keys) return Object.keys(t);
  var e = [];
  for (var r in t) t.hasOwnProperty(r) && e.push(r);
  return e
}

function JT(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
  return function () {
    return t.apply(e, r.concat(rv.call(arguments)))
  }
}
var Ht = ss && dt(ss.bind) ? ss.call.bind(ss.bind) : JT;

function jt(t) {
  for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
  return function () {
    return t.apply(this, e.concat(rv.call(arguments)))
  }
}

function et(t) {
  return Array.isArray ? Array.isArray(t) : qo.call(t) === "[object Array]"
}

function dt(t) {
  return typeof t == "function"
}

function nt(t) {
  return typeof t == "string"
}

function _c(t) {
  return qo.call(t) === "[object String]"
}

function $t(t) {
  return typeof t == "number"
}

function st(t) {
  var e = typeof t;
  return e === "function" || !!t && e === "object"
}

function sp(t) {
  return !!o_[qo.call(t)]
}

function Ie(t) {
  return !!s_[qo.call(t)]
}

function ml(t) {
  return typeof t == "object" && typeof t.nodeType == "number" && typeof t.ownerDocument == "object"
}

function eu(t) {
  return t.colorStops != null
}

function tM(t) {
  return t.image != null
}

function _l(t) {
  return t !== t
}

function Io() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] != null) return t[r]
}

function Mt(t, e) {
  return t != null ? t : e
}

function Zs(t, e, r) {
  return t != null ? t : e != null ? e : r
}

function av(t) {
  for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
  return rv.apply(t, e)
}

function u_(t) {
  if (typeof t == "number") return [t, t, t, t];
  var e = t.length;
  return e === 2 ? [t[0], t[1], t[0], t[1]] : e === 3 ? [t[0], t[1], t[2], t[1]] : t
}

function Or(t, e) {
  if (!t) throw new Error(e)
}

function vr(t) {
  return t == null ? null : typeof t.trim == "function" ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}
var f_ = "__ec_primitive__";

function wc(t) {
  t[f_] = !0
}

function lo(t) {
  return t[f_]
}
var eM = function () {
  function t(e) {
    this.data = {};
    var r = et(e);
    this.data = {};
    var n = this;
    e instanceof t ? e.each(i) : e && P(e, i);

    function i(a, o) {
      r ? n.set(a, o) : n.set(o, a)
    }
  }
  return t.prototype.get = function (e) {
    return this.data.hasOwnProperty(e) ? this.data[e] : null
  }, t.prototype.set = function (e, r) {
    return this.data[e] = r
  }, t.prototype.each = function (e, r) {
    for (var n in this.data) this.data.hasOwnProperty(n) && e.call(r, this.data[n], n)
  }, t.prototype.keys = function () {
    return Vt(this.data)
  }, t.prototype.removeKey = function (e) {
    delete this.data[e]
  }, t
}();

function gt(t) {
  return new eM(t)
}

function rM(t, e) {
  for (var r = new t.constructor(t.length + e.length), n = 0; n < t.length; n++) r[n] = t[n];
  for (var i = t.length, n = 0; n < e.length; n++) r[n + i] = e[n];
  return r
}

function ru(t, e) {
  var r;
  if (Object.create) r = Object.create(t);
  else {
    var n = function () {};
    n.prototype = t, r = new n
  }
  return e && q(r, e), r
}

function c_(t) {
  var e = t.style;
  e.webkitUserSelect = "none", e.userSelect = "none", e.webkitTapHighlightColor = "rgba(0,0,0,0)", e["-webkit-touch-callout"] = "none"
}

function oa(t, e) {
  return t.hasOwnProperty(e)
}

function _e() {}
var nM = 180 / Math.PI;

function ya(t, e) {
  return t == null && (t = 0), e == null && (e = 0), [t, e]
}

function iM(t) {
  return [t[0], t[1]]
}

function lp(t, e, r) {
  return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t
}

function aM(t, e, r) {
  return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t
}

function oM(t) {
  return Math.sqrt(sM(t))
}

function sM(t) {
  return t[0] * t[0] + t[1] * t[1]
}

function Ou(t, e, r) {
  return t[0] = e[0] * r, t[1] = e[1] * r, t
}

function lM(t, e) {
  var r = oM(e);
  return r === 0 ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / r, t[1] = e[1] / r), t
}

function Sc(t, e) {
  return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
}
var uM = Sc;

function fM(t, e) {
  return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
}
var Ki = fM;

function Ye(t, e, r) {
  var n = e[0],
    i = e[1];
  return t[0] = r[0] * n + r[2] * i + r[4], t[1] = r[1] * n + r[3] * i + r[5], t
}

function Vi(t, e, r) {
  return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t
}

function $i(t, e, r) {
  return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t
}
var bi = function () {
    function t(e, r) {
      this.target = e, this.topTarget = r && r.topTarget
    }
    return t
  }(),
  cM = function () {
    function t(e) {
      this.handler = e, e.on("mousedown", this._dragStart, this), e.on("mousemove", this._drag, this), e.on("mouseup", this._dragEnd, this)
    }
    return t.prototype._dragStart = function (e) {
      for (var r = e.target; r && !r.draggable;) r = r.parent || r.__hostTarget;
      r && (this._draggingTarget = r, r.dragging = !0, this._x = e.offsetX, this._y = e.offsetY, this.handler.dispatchToElement(new bi(r, e), "dragstart", e.event))
    }, t.prototype._drag = function (e) {
      var r = this._draggingTarget;
      if (r) {
        var n = e.offsetX,
          i = e.offsetY,
          a = n - this._x,
          o = i - this._y;
        this._x = n, this._y = i, r.drift(a, o, e), this.handler.dispatchToElement(new bi(r, e), "drag", e.event);
        var s = this.handler.findHover(n, i, r).target,
          l = this._dropTarget;
        this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new bi(l, e), "dragleave", e.event), s && s !== l && this.handler.dispatchToElement(new bi(s, e), "dragenter", e.event))
      }
    }, t.prototype._dragEnd = function (e) {
      var r = this._draggingTarget;
      r && (r.dragging = !1), this.handler.dispatchToElement(new bi(r, e), "dragend", e.event), this._dropTarget && this.handler.dispatchToElement(new bi(this._dropTarget, e), "drop", e.event), this._draggingTarget = null, this._dropTarget = null
    }, t
  }(),
  hM = cM,
  vM = function () {
    function t(e) {
      e && (this._$eventProcessor = e)
    }
    return t.prototype.on = function (e, r, n, i) {
      this._$handlers || (this._$handlers = {});
      var a = this._$handlers;
      if (typeof r == "function" && (i = n, n = r, r = null), !n || !e) return this;
      var o = this._$eventProcessor;
      r != null && o && o.normalizeQuery && (r = o.normalizeQuery(r)), a[e] || (a[e] = []);
      for (var s = 0; s < a[e].length; s++)
        if (a[e][s].h === n) return this;
      var l = {
          h: n,
          query: r,
          ctx: i || this,
          callAtLast: n.zrEventfulCallAtLast
        },
        u = a[e].length - 1,
        f = a[e][u];
      return f && f.callAtLast ? a[e].splice(u, 0, l) : a[e].push(l), this
    }, t.prototype.isSilent = function (e) {
      var r = this._$handlers;
      return !r || !r[e] || !r[e].length
    }, t.prototype.off = function (e, r) {
      var n = this._$handlers;
      if (!n) return this;
      if (!e) return this._$handlers = {}, this;
      if (r) {
        if (n[e]) {
          for (var i = [], a = 0, o = n[e].length; a < o; a++) n[e][a].h !== r && i.push(n[e][a]);
          n[e] = i
        }
        n[e] && n[e].length === 0 && delete n[e]
      } else delete n[e];
      return this
    }, t.prototype.trigger = function (e) {
      for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
      if (!this._$handlers) return this;
      var i = this._$handlers[e],
        a = this._$eventProcessor;
      if (i)
        for (var o = r.length, s = i.length, l = 0; l < s; l++) {
          var u = i[l];
          if (!(a && a.filter && u.query != null && !a.filter(e, u.query))) switch (o) {
            case 0:
              u.h.call(u.ctx);
              break;
            case 1:
              u.h.call(u.ctx, r[0]);
              break;
            case 2:
              u.h.call(u.ctx, r[0], r[1]);
              break;
            default:
              u.h.apply(u.ctx, r);
              break
          }
        }
      return a && a.afterTrigger && a.afterTrigger(e), this
    }, t.prototype.triggerWithContext = function (e) {
      for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
      if (!this._$handlers) return this;
      var i = this._$handlers[e],
        a = this._$eventProcessor;
      if (i)
        for (var o = r.length, s = r[o - 1], l = i.length, u = 0; u < l; u++) {
          var f = i[u];
          if (!(a && a.filter && f.query != null && !a.filter(e, f.query))) switch (o) {
            case 0:
              f.h.call(s);
              break;
            case 1:
              f.h.call(s, r[0]);
              break;
            case 2:
              f.h.call(s, r[0], r[1]);
              break;
            default:
              f.h.apply(s, r.slice(1, o - 1));
              break
          }
        }
      return a && a.afterTrigger && a.afterTrigger(e), this
    }, t
  }(),
  _r = vM,
  dM = Math.log(2);

function bc(t, e, r, n, i, a) {
  var o = n + "-" + i,
    s = t.length;
  if (a.hasOwnProperty(o)) return a[o];
  if (e === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~i) / dM);
    return t[r][l]
  }
  for (var u = n | 1 << r, f = r + 1; n & 1 << f;) f++;
  for (var c = 0, h = 0, v = 0; h < s; h++) {
    var d = 1 << h;
    d & i || (c += (v % 2 ? -1 : 1) * t[r][h] * bc(t, e - 1, f, u, i | d, a), v++)
  }
  return a[o] = c, c
}

function up(t, e) {
  var r = [
      [t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
      [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
      [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
      [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
      [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
      [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
      [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
      [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]
    ],
    n = {},
    i = bc(r, 8, 0, 0, 0, n);
  if (i !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++) a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * bc(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, n) / i * e[o];
    return function (l, u, f) {
      var c = u * a[6] + f * a[7] + 1;
      l[0] = (u * a[0] + f * a[1] + a[2]) / c, l[1] = (u * a[3] + f * a[4] + a[5]) / c
    }
  }
}
var fp = "___zrEVENTSAVED",
  ku = [];

function pM(t, e, r, n, i) {
  return xc(ku, e, n, i, !0) && xc(t, r, ku[0], ku[1])
}

function xc(t, e, r, n, i) {
  if (e.getBoundingClientRect && mt.domSupported && !h_(e)) {
    var a = e[fp] || (e[fp] = {}),
      o = gM(e, a),
      s = yM(o, a, i);
    if (s) return s(t, r, n), !0
  }
  return !1
}

function gM(t, e) {
  var r = e.markers;
  if (r) return r;
  r = e.markers = [];
  for (var n = ["left", "right"], i = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"),
      s = o.style,
      l = a % 2,
      u = (a >> 1) % 2;
    s.cssText = ["position: absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "user-select: none", "width:0", "height:0", n[l] + ":0", i[u] + ":0", n[1 - l] + ":auto", i[1 - u] + ":auto", ""].join("!important;"), t.appendChild(o), r.push(o)
  }
  return r
}

function yM(t, e, r) {
  for (var n = r ? "invTrans" : "trans", i = e[n], a = e.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var f = t[u].getBoundingClientRect(),
      c = 2 * u,
      h = f.left,
      v = f.top;
    o.push(h, v), l = l && a && h === a[c] && v === a[c + 1], s.push(t[u].offsetLeft, t[u].offsetTop)
  }
  return l && i ? i : (e.srcCoords = o, e[n] = r ? up(s, o) : up(o, s))
}

function h_(t) {
  return t.nodeName.toUpperCase() === "CANVAS"
}
var mM = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
  Bu = [],
  _M = mt.browser.firefox && +mt.browser.version.split(".")[0] < 39;

function Cc(t, e, r, n) {
  return r = r || {}, n ? cp(t, e, r) : _M && e.layerX != null && e.layerX !== e.offsetX ? (r.zrX = e.layerX, r.zrY = e.layerY) : e.offsetX != null ? (r.zrX = e.offsetX, r.zrY = e.offsetY) : cp(t, e, r), r
}

function cp(t, e, r) {
  if (mt.domSupported && t.getBoundingClientRect) {
    var n = e.clientX,
      i = e.clientY;
    if (h_(t)) {
      var a = t.getBoundingClientRect();
      r.zrX = n - a.left, r.zrY = i - a.top;
      return
    } else if (xc(Bu, t, n, i)) {
      r.zrX = Bu[0], r.zrY = Bu[1];
      return
    }
  }
  r.zrX = r.zrY = 0
}

function ov(t) {
  return t || window.event
}

function Be(t, e, r) {
  if (e = ov(e), e.zrX != null) return e;
  var n = e.type,
    i = n && n.indexOf("touch") >= 0;
  if (i) {
    var o = n !== "touchend" ? e.targetTouches[0] : e.changedTouches[0];
    o && Cc(t, o, e, r)
  } else {
    Cc(t, e, e, r);
    var a = wM(e);
    e.zrDelta = a ? a / 120 : -(e.detail || 0) / 3
  }
  var s = e.button;
  return e.which == null && s !== void 0 && mM.test(e.type) && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
}

function wM(t) {
  var e = t.wheelDelta;
  if (e) return e;
  var r = t.deltaX,
    n = t.deltaY;
  if (r == null || n == null) return e;
  var i = Math.abs(n !== 0 ? n : r),
    a = n > 0 ? -1 : n < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * i * a
}

function SM(t, e, r, n) {
  t.addEventListener(e, r, n)
}

function bM(t, e, r, n) {
  t.removeEventListener(e, r, n)
}
var v_ = function (t) {
    t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
  },
  xM = function () {
    function t() {
      this._track = []
    }
    return t.prototype.recognize = function (e, r, n) {
      return this._doTrack(e, r, n), this._recognize(e)
    }, t.prototype.clear = function () {
      return this._track.length = 0, this
    }, t.prototype._doTrack = function (e, r, n) {
      var i = e.touches;
      if (!!i) {
        for (var a = {
            points: [],
            touches: [],
            target: r,
            event: e
          }, o = 0, s = i.length; o < s; o++) {
          var l = i[o],
            u = Cc(n, l, {});
          a.points.push([u.zrX, u.zrY]), a.touches.push(l)
        }
        this._track.push(a)
      }
    }, t.prototype._recognize = function (e) {
      for (var r in Nu)
        if (Nu.hasOwnProperty(r)) {
          var n = Nu[r](this._track, e);
          if (n) return n
        }
    }, t
  }();

function hp(t) {
  var e = t[1][0] - t[0][0],
    r = t[1][1] - t[0][1];
  return Math.sqrt(e * e + r * r)
}

function CM(t) {
  return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
}
var Nu = {
    pinch: function (t, e) {
      var r = t.length;
      if (!!r) {
        var n = (t[r - 1] || {}).points,
          i = (t[r - 2] || {}).points || n;
        if (i && i.length > 1 && n && n.length > 1) {
          var a = hp(n) / hp(i);
          !isFinite(a) && (a = 1), e.pinchScale = a;
          var o = CM(n);
          return e.pinchX = o[0], e.pinchY = o[1], {
            type: "pinch",
            target: t[0].target,
            event: e
          }
        }
      }
    }
  },
  d_ = "silent";

function TM(t, e, r) {
  return {
    type: t,
    event: r,
    target: e.target,
    topTarget: e.topTarget,
    cancelBubble: !1,
    offsetX: r.zrX,
    offsetY: r.zrY,
    gestureEvent: r.gestureEvent,
    pinchX: r.pinchX,
    pinchY: r.pinchY,
    pinchScale: r.pinchScale,
    wheelDelta: r.zrDelta,
    zrByTouch: r.zrByTouch,
    which: r.which,
    stop: MM
  }
}

function MM() {
  v_(this.event)
}
var DM = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.handler = null, r
    }
    return e.prototype.dispose = function () {}, e.prototype.setCursor = function () {}, e
  }(_r),
  Ta = function () {
    function t(e, r) {
      this.x = e, this.y = r
    }
    return t
  }(),
  AM = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
  p_ = function (t) {
    J(e, t);

    function e(r, n, i, a) {
      var o = t.call(this) || this;
      return o._hovered = new Ta(0, 0), o.storage = r, o.painter = n, o.painterRoot = a, i = i || new DM, o.proxy = null, o.setHandlerProxy(i), o._draggingMgr = new hM(o), o
    }
    return e.prototype.setHandlerProxy = function (r) {
      this.proxy && this.proxy.dispose(), r && (P(AM, function (n) {
        r.on && r.on(n, this[n], this)
      }, this), r.handler = this), this.proxy = r
    }, e.prototype.mousemove = function (r) {
      var n = r.zrX,
        i = r.zrY,
        a = g_(this, n, i),
        o = this._hovered,
        s = o.target;
      s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
      var l = this._hovered = a ? new Ta(n, i) : this.findHover(n, i),
        u = l.target,
        f = this.proxy;
      f.setCursor && f.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r)
    }, e.prototype.mouseout = function (r) {
      var n = r.zrEventControl;
      n !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), n !== "no_globalout" && this.trigger("globalout", {
        type: "globalout",
        event: r
      })
    }, e.prototype.resize = function () {
      this._hovered = new Ta(0, 0)
    }, e.prototype.dispatch = function (r, n) {
      var i = this[r];
      i && i.call(this, n)
    }, e.prototype.dispose = function () {
      this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null
    }, e.prototype.setCursorStyle = function (r) {
      var n = this.proxy;
      n.setCursor && n.setCursor(r)
    }, e.prototype.dispatchToElement = function (r, n, i) {
      r = r || {};
      var a = r.target;
      if (!(a && a.silent)) {
        for (var o = "on" + n, s = TM(n, r, i); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(n, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble););
        s.cancelBubble || (this.trigger(n, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function (l) {
          typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(n, s)
        }))
      }
    }, e.prototype.findHover = function (r, n, i) {
      for (var a = this.storage.getDisplayList(), o = new Ta(r, n), s = a.length - 1; s >= 0; s--) {
        var l = void 0;
        if (a[s] !== i && !a[s].ignore && (l = PM(a[s], r, n)) && (!o.topTarget && (o.topTarget = a[s]), l !== d_)) {
          o.target = a[s];
          break
        }
      }
      return o
    }, e.prototype.processGesture = function (r, n) {
      this._gestureMgr || (this._gestureMgr = new xM);
      var i = this._gestureMgr;
      n === "start" && i.clear();
      var a = i.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
      if (n === "end" && i.clear(), a) {
        var o = a.type;
        r.gestureEvent = o;
        var s = new Ta;
        s.target = a.target, this.dispatchToElement(s, o, a.event)
      }
    }, e
  }(_r);
P(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
  p_.prototype[t] = function (e) {
    var r = e.zrX,
      n = e.zrY,
      i = g_(this, r, n),
      a, o;
    if ((t !== "mouseup" || !i) && (a = this.findHover(r, n), o = a.target), t === "mousedown") this._downEl = o, this._downPoint = [e.zrX, e.zrY], this._upEl = o;
    else if (t === "mouseup") this._upEl = o;
    else if (t === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || uM(this._downPoint, [e.zrX, e.zrY]) > 4) return;
      this._downPoint = null
    }
    this.dispatchToElement(a, t, e)
  }
});

function PM(t, e, r) {
  if (t[t.rectHover ? "rectContain" : "contain"](e, r)) {
    for (var n = t, i = void 0, a = !1; n;) {
      if (n.ignoreClip && (a = !0), !a) {
        var o = n.getClipPath();
        if (o && !o.contain(e, r)) return !1;
        n.silent && (i = !0)
      }
      var s = n.__hostTarget;
      n = s || n.parent
    }
    return i ? d_ : !0
  }
  return !1
}

function g_(t, e, r) {
  var n = t.painter;
  return e < 0 || e > n.getWidth() || r < 0 || r > n.getHeight()
}
var IM = p_,
  y_ = 32,
  Ma = 7;

function EM(t) {
  for (var e = 0; t >= y_;) e |= t & 1, t >>= 1;
  return t + e
}

function vp(t, e, r, n) {
  var i = e + 1;
  if (i === r) return 1;
  if (n(t[i++], t[e]) < 0) {
    for (; i < r && n(t[i], t[i - 1]) < 0;) i++;
    LM(t, e, i)
  } else
    for (; i < r && n(t[i], t[i - 1]) >= 0;) i++;
  return i - e
}

function LM(t, e, r) {
  for (r--; e < r;) {
    var n = t[e];
    t[e++] = t[r], t[r--] = n
  }
}

function dp(t, e, r, n, i) {
  for (n === e && n++; n < r; n++) {
    for (var a = t[n], o = e, s = n, l; o < s;) l = o + s >>> 1, i(a, t[l]) < 0 ? s = l : o = l + 1;
    var u = n - o;
    switch (u) {
      case 3:
        t[o + 3] = t[o + 2];
      case 2:
        t[o + 2] = t[o + 1];
      case 1:
        t[o + 1] = t[o];
        break;
      default:
        for (; u > 0;) t[o + u] = t[o + u - 1], u--
    }
    t[o] = a
  }
}

function Fu(t, e, r, n, i, a) {
  var o = 0,
    s = 0,
    l = 1;
  if (a(t, e[r + i]) > 0) {
    for (s = n - i; l < s && a(t, e[r + i + l]) > 0;) o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += i, l += i
  } else {
    for (s = i + 1; l < s && a(t, e[r + i - l]) <= 0;) o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = i - l, l = i - u
  }
  for (o++; o < l;) {
    var f = o + (l - o >>> 1);
    a(t, e[r + f]) > 0 ? o = f + 1 : l = f
  }
  return l
}

function zu(t, e, r, n, i, a) {
  var o = 0,
    s = 0,
    l = 1;
  if (a(t, e[r + i]) < 0) {
    for (s = i + 1; l < s && a(t, e[r + i - l]) < 0;) o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = i - l, l = i - u
  } else {
    for (s = n - i; l < s && a(t, e[r + i + l]) >= 0;) o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += i, l += i
  }
  for (o++; o < l;) {
    var f = o + (l - o >>> 1);
    a(t, e[r + f]) < 0 ? l = f : o = f + 1
  }
  return l
}

function RM(t, e) {
  var r = Ma,
    n, i, a = 0,
    o = [];
  n = [], i = [];

  function s(v, d) {
    n[a] = v, i[a] = d, a += 1
  }

  function l() {
    for (; a > 1;) {
      var v = a - 2;
      if (v >= 1 && i[v - 1] <= i[v] + i[v + 1] || v >= 2 && i[v - 2] <= i[v] + i[v - 1]) i[v - 1] < i[v + 1] && v--;
      else if (i[v] > i[v + 1]) break;
      f(v)
    }
  }

  function u() {
    for (; a > 1;) {
      var v = a - 2;
      v > 0 && i[v - 1] < i[v + 1] && v--, f(v)
    }
  }

  function f(v) {
    var d = n[v],
      y = i[v],
      g = n[v + 1],
      p = i[v + 1];
    i[v] = y + p, v === a - 3 && (n[v + 1] = n[v + 2], i[v + 1] = i[v + 2]), a--;
    var m = zu(t[g], t, d, y, 0, e);
    d += m, y -= m, y !== 0 && (p = Fu(t[d + y - 1], t, g, p, p - 1, e), p !== 0 && (y <= p ? c(d, y, g, p) : h(d, y, g, p)))
  }

  function c(v, d, y, g) {
    var p = 0;
    for (p = 0; p < d; p++) o[p] = t[v + p];
    var m = 0,
      _ = y,
      w = v;
    if (t[w++] = t[_++], --g === 0) {
      for (p = 0; p < d; p++) t[w + p] = o[m + p];
      return
    }
    if (d === 1) {
      for (p = 0; p < g; p++) t[w + p] = t[_ + p];
      t[w + g] = o[m];
      return
    }
    for (var b = r, S, x, T;;) {
      S = 0, x = 0, T = !1;
      do
        if (e(t[_], o[m]) < 0) {
          if (t[w++] = t[_++], x++, S = 0, --g === 0) {
            T = !0;
            break
          }
        } else if (t[w++] = o[m++], S++, x = 0, --d === 1) {
        T = !0;
        break
      } while ((S | x) < b);
      if (T) break;
      do {
        if (S = zu(t[_], o, m, d, 0, e), S !== 0) {
          for (p = 0; p < S; p++) t[w + p] = o[m + p];
          if (w += S, m += S, d -= S, d <= 1) {
            T = !0;
            break
          }
        }
        if (t[w++] = t[_++], --g === 0) {
          T = !0;
          break
        }
        if (x = Fu(o[m], t, _, g, 0, e), x !== 0) {
          for (p = 0; p < x; p++) t[w + p] = t[_ + p];
          if (w += x, _ += x, g -= x, g === 0) {
            T = !0;
            break
          }
        }
        if (t[w++] = o[m++], --d === 1) {
          T = !0;
          break
        }
        b--
      } while (S >= Ma || x >= Ma);
      if (T) break;
      b < 0 && (b = 0), b += 2
    }
    if (r = b, r < 1 && (r = 1), d === 1) {
      for (p = 0; p < g; p++) t[w + p] = t[_ + p];
      t[w + g] = o[m]
    } else {
      if (d === 0) throw new Error;
      for (p = 0; p < d; p++) t[w + p] = o[m + p]
    }
  }

  function h(v, d, y, g) {
    var p = 0;
    for (p = 0; p < g; p++) o[p] = t[y + p];
    var m = v + d - 1,
      _ = g - 1,
      w = y + g - 1,
      b = 0,
      S = 0;
    if (t[w--] = t[m--], --d === 0) {
      for (b = w - (g - 1), p = 0; p < g; p++) t[b + p] = o[p];
      return
    }
    if (g === 1) {
      for (w -= d, m -= d, S = w + 1, b = m + 1, p = d - 1; p >= 0; p--) t[S + p] = t[b + p];
      t[w] = o[_];
      return
    }
    for (var x = r;;) {
      var T = 0,
        M = 0,
        D = !1;
      do
        if (e(o[_], t[m]) < 0) {
          if (t[w--] = t[m--], T++, M = 0, --d === 0) {
            D = !0;
            break
          }
        } else if (t[w--] = o[_--], M++, T = 0, --g === 1) {
        D = !0;
        break
      } while ((T | M) < x);
      if (D) break;
      do {
        if (T = d - zu(o[_], t, v, d, d - 1, e), T !== 0) {
          for (w -= T, m -= T, d -= T, S = w + 1, b = m + 1, p = T - 1; p >= 0; p--) t[S + p] = t[b + p];
          if (d === 0) {
            D = !0;
            break
          }
        }
        if (t[w--] = o[_--], --g === 1) {
          D = !0;
          break
        }
        if (M = g - Fu(t[m], o, 0, g, g - 1, e), M !== 0) {
          for (w -= M, _ -= M, g -= M, S = w + 1, b = _ + 1, p = 0; p < M; p++) t[S + p] = o[b + p];
          if (g <= 1) {
            D = !0;
            break
          }
        }
        if (t[w--] = t[m--], --d === 0) {
          D = !0;
          break
        }
        x--
      } while (T >= Ma || M >= Ma);
      if (D) break;
      x < 0 && (x = 0), x += 2
    }
    if (r = x, r < 1 && (r = 1), g === 1) {
      for (w -= d, m -= d, S = w + 1, b = m + 1, p = d - 1; p >= 0; p--) t[S + p] = t[b + p];
      t[w] = o[_]
    } else {
      if (g === 0) throw new Error;
      for (b = w - (g - 1), p = 0; p < g; p++) t[b + p] = o[p]
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  }
}

function js(t, e, r, n) {
  r || (r = 0), n || (n = t.length);
  var i = n - r;
  if (!(i < 2)) {
    var a = 0;
    if (i < y_) {
      a = vp(t, r, n, e), dp(t, r, n, r + a, e);
      return
    }
    var o = RM(t, e),
      s = EM(i);
    do {
      if (a = vp(t, r, n, e), a < s) {
        var l = i;
        l > s && (l = s), dp(t, r, r + l, r + a, e), a = l
      }
      o.pushRun(r, a), o.mergeRuns(), i -= a, r += a
    } while (i !== 0);
    o.forceMergeRuns()
  }
}
var Te = 1,
  Xa = 2,
  zi = 4,
  pp = !1;

function Hu() {
  pp || (pp = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"))
}

function gp(t, e) {
  return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
}
var OM = function () {
    function t() {
      this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = gp
    }
    return t.prototype.traverse = function (e, r) {
      for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(e, r)
    }, t.prototype.getDisplayList = function (e, r) {
      r = r || !1;
      var n = this._displayList;
      return (e || !n.length) && this.updateDisplayList(r), n
    }, t.prototype.updateDisplayList = function (e) {
      this._displayListLen = 0;
      for (var r = this._roots, n = this._displayList, i = 0, a = r.length; i < a; i++) this._updateAndAddDisplayable(r[i], null, e);
      n.length = this._displayListLen, js(n, gp)
    }, t.prototype._updateAndAddDisplayable = function (e, r, n) {
      if (!(e.ignore && !n)) {
        e.beforeUpdate(), e.update(), e.afterUpdate();
        var i = e.getClipPath();
        if (e.ignoreClip) r = null;
        else if (i) {
          r ? r = r.slice() : r = [];
          for (var a = i, o = e; a;) a.parent = o, a.updateTransform(), r.push(a), o = a, a = a.getClipPath()
        }
        if (e.childrenRef) {
          for (var s = e.childrenRef(), l = 0; l < s.length; l++) {
            var u = s[l];
            e.__dirty && (u.__dirty |= Te), this._updateAndAddDisplayable(u, r, n)
          }
          e.__dirty = 0
        } else {
          var f = e;
          r && r.length ? f.__clipPaths = r : f.__clipPaths && f.__clipPaths.length > 0 && (f.__clipPaths = []), isNaN(f.z) && (Hu(), f.z = 0), isNaN(f.z2) && (Hu(), f.z2 = 0), isNaN(f.zlevel) && (Hu(), f.zlevel = 0), this._displayList[this._displayListLen++] = f
        }
        var c = e.getDecalElement && e.getDecalElement();
        c && this._updateAndAddDisplayable(c, r, n);
        var h = e.getTextGuideLine();
        h && this._updateAndAddDisplayable(h, r, n);
        var v = e.getTextContent();
        v && this._updateAndAddDisplayable(v, r, n)
      }
    }, t.prototype.addRoot = function (e) {
      e.__zr && e.__zr.storage === this || this._roots.push(e)
    }, t.prototype.delRoot = function (e) {
      if (e instanceof Array) {
        for (var r = 0, n = e.length; r < n; r++) this.delRoot(e[r]);
        return
      }
      var i = Pt(this._roots, e);
      i >= 0 && this._roots.splice(i, 1)
    }, t.prototype.delAllRoots = function () {
      this._roots = [], this._displayList = [], this._displayListLen = 0
    }, t.prototype.getRoots = function () {
      return this._roots
    }, t.prototype.dispose = function () {
      this._displayList = null, this._roots = null
    }, t
  }(),
  kM = OM,
  m_;
m_ = mt.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {
  return setTimeout(t, 16)
};
var Tc = m_,
  Qs = {
    linear: function (t) {
      return t
    },
    quadraticIn: function (t) {
      return t * t
    },
    quadraticOut: function (t) {
      return t * (2 - t)
    },
    quadraticInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
    },
    cubicIn: function (t) {
      return t * t * t
    },
    cubicOut: function (t) {
      return --t * t * t + 1
    },
    cubicInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
    },
    quarticIn: function (t) {
      return t * t * t * t
    },
    quarticOut: function (t) {
      return 1 - --t * t * t * t
    },
    quarticInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
    },
    quinticIn: function (t) {
      return t * t * t * t * t
    },
    quinticOut: function (t) {
      return --t * t * t * t * t + 1
    },
    quinticInOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
    },
    sinusoidalIn: function (t) {
      return 1 - Math.cos(t * Math.PI / 2)
    },
    sinusoidalOut: function (t) {
      return Math.sin(t * Math.PI / 2)
    },
    sinusoidalInOut: function (t) {
      return .5 * (1 - Math.cos(Math.PI * t))
    },
    exponentialIn: function (t) {
      return t === 0 ? 0 : Math.pow(1024, t - 1)
    },
    exponentialOut: function (t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    },
    exponentialInOut: function (t) {
      return t === 0 ? 0 : t === 1 ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
    },
    circularIn: function (t) {
      return 1 - Math.sqrt(1 - t * t)
    },
    circularOut: function (t) {
      return Math.sqrt(1 - --t * t)
    },
    circularInOut: function (t) {
      return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    },
    elasticIn: function (t) {
      var e, r = .1,
        n = .4;
      return t === 0 ? 0 : t === 1 ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)))
    },
    elasticOut: function (t) {
      var e, r = .1,
        n = .4;
      return t === 0 ? 0 : t === 1 ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / n) + 1)
    },
    elasticInOut: function (t) {
      var e, r = .1,
        n = .4;
      return t === 0 ? 0 : t === 1 ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * (r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)) : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * .5 + 1)
    },
    backIn: function (t) {
      var e = 1.70158;
      return t * t * ((e + 1) * t - e)
    },
    backOut: function (t) {
      var e = 1.70158;
      return --t * t * ((e + 1) * t + e) + 1
    },
    backInOut: function (t) {
      var e = 2.5949095;
      return (t *= 2) < 1 ? .5 * (t * t * ((e + 1) * t - e)) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
    },
    bounceIn: function (t) {
      return 1 - Qs.bounceOut(1 - t)
    },
    bounceOut: function (t) {
      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    },
    bounceInOut: function (t) {
      return t < .5 ? Qs.bounceIn(t * 2) * .5 : Qs.bounceOut(t * 2 - 1) * .5 + .5
    }
  },
  __ = Qs,
  ls = Math.pow,
  vn = Math.sqrt,
  wl = 1e-8,
  w_ = 1e-4,
  yp = vn(3),
  us = 1 / 3,
  cr = ya(),
  He = ya(),
  Zi = ya();

function on(t) {
  return t > -wl && t < wl
}

function S_(t) {
  return t > wl || t < -wl
}

function Xt(t, e, r, n, i) {
  var a = 1 - i;
  return a * a * (a * t + 3 * i * e) + i * i * (i * n + 3 * a * r)
}

function mp(t, e, r, n, i) {
  var a = 1 - i;
  return 3 * (((e - t) * a + 2 * (r - e) * i) * a + (n - r) * i * i)
}

function Sl(t, e, r, n, i, a) {
  var o = n + 3 * (e - r) - t,
    s = 3 * (r - e * 2 + t),
    l = 3 * (e - t),
    u = t - i,
    f = s * s - 3 * o * l,
    c = s * l - 9 * o * u,
    h = l * l - 3 * s * u,
    v = 0;
  if (on(f) && on(c))
    if (on(s)) a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[v++] = d)
    }
  else {
    var y = c * c - 4 * f * h;
    if (on(y)) {
      var g = c / f,
        d = -s / o + g,
        p = -g / 2;
      d >= 0 && d <= 1 && (a[v++] = d), p >= 0 && p <= 1 && (a[v++] = p)
    } else if (y > 0) {
      var m = vn(y),
        _ = f * s + 1.5 * o * (-c + m),
        w = f * s + 1.5 * o * (-c - m);
      _ < 0 ? _ = -ls(-_, us) : _ = ls(_, us), w < 0 ? w = -ls(-w, us) : w = ls(w, us);
      var d = (-s - (_ + w)) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d)
    } else {
      var b = (2 * f * s - 3 * o * c) / (2 * vn(f * f * f)),
        S = Math.acos(b) / 3,
        x = vn(f),
        T = Math.cos(S),
        d = (-s - 2 * x * T) / (3 * o),
        p = (-s + x * (T + yp * Math.sin(S))) / (3 * o),
        M = (-s + x * (T - yp * Math.sin(S))) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d), p >= 0 && p <= 1 && (a[v++] = p), M >= 0 && M <= 1 && (a[v++] = M)
    }
  }
  return v
}

function b_(t, e, r, n, i) {
  var a = 6 * r - 12 * e + 6 * t,
    o = 9 * e + 3 * n - 3 * t - 9 * r,
    s = 3 * e - 3 * t,
    l = 0;
  if (on(o)) {
    if (S_(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (i[l++] = u)
    }
  } else {
    var f = a * a - 4 * o * s;
    if (on(f)) i[0] = -a / (2 * o);
    else if (f > 0) {
      var c = vn(f),
        u = (-a + c) / (2 * o),
        h = (-a - c) / (2 * o);
      u >= 0 && u <= 1 && (i[l++] = u), h >= 0 && h <= 1 && (i[l++] = h)
    }
  }
  return l
}

function bl(t, e, r, n, i, a) {
  var o = (e - t) * i + t,
    s = (r - e) * i + e,
    l = (n - r) * i + r,
    u = (s - o) * i + o,
    f = (l - s) * i + s,
    c = (f - u) * i + u;
  a[0] = t, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = f, a[6] = l, a[7] = n
}

function BM(t, e, r, n, i, a, o, s, l, u, f) {
  var c, h = .005,
    v = 1 / 0,
    d, y, g, p;
  cr[0] = l, cr[1] = u;
  for (var m = 0; m < 1; m += .05) He[0] = Xt(t, r, i, o, m), He[1] = Xt(e, n, a, s, m), g = Ki(cr, He), g < v && (c = m, v = g);
  v = 1 / 0;
  for (var _ = 0; _ < 32 && !(h < w_); _++) d = c - h, y = c + h, He[0] = Xt(t, r, i, o, d), He[1] = Xt(e, n, a, s, d), g = Ki(He, cr), d >= 0 && g < v ? (c = d, v = g) : (Zi[0] = Xt(t, r, i, o, y), Zi[1] = Xt(e, n, a, s, y), p = Ki(Zi, cr), y <= 1 && p < v ? (c = y, v = p) : h *= .5);
  return f && (f[0] = Xt(t, r, i, o, c), f[1] = Xt(e, n, a, s, c)), vn(v)
}

function NM(t, e, r, n, i, a, o, s, l) {
  for (var u = t, f = e, c = 0, h = 1 / l, v = 1; v <= l; v++) {
    var d = v * h,
      y = Xt(t, r, i, o, d),
      g = Xt(e, n, a, s, d),
      p = y - u,
      m = g - f;
    c += Math.sqrt(p * p + m * m), u = y, f = g
  }
  return c
}

function re(t, e, r, n) {
  var i = 1 - n;
  return i * (i * t + 2 * n * e) + n * n * r
}

function _p(t, e, r, n) {
  return 2 * ((1 - n) * (e - t) + n * (r - e))
}

function FM(t, e, r, n, i) {
  var a = t - 2 * e + r,
    o = 2 * (e - t),
    s = t - n,
    l = 0;
  if (on(a)) {
    if (S_(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (i[l++] = u)
    }
  } else {
    var f = o * o - 4 * a * s;
    if (on(f)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (i[l++] = u)
    } else if (f > 0) {
      var c = vn(f),
        u = (-o + c) / (2 * a),
        h = (-o - c) / (2 * a);
      u >= 0 && u <= 1 && (i[l++] = u), h >= 0 && h <= 1 && (i[l++] = h)
    }
  }
  return l
}

function x_(t, e, r) {
  var n = t + r - 2 * e;
  return n === 0 ? .5 : (t - e) / n
}

function xl(t, e, r, n, i) {
  var a = (e - t) * n + t,
    o = (r - e) * n + e,
    s = (o - a) * n + a;
  i[0] = t, i[1] = a, i[2] = s, i[3] = s, i[4] = o, i[5] = r
}

function zM(t, e, r, n, i, a, o, s, l) {
  var u, f = .005,
    c = 1 / 0;
  cr[0] = o, cr[1] = s;
  for (var h = 0; h < 1; h += .05) {
    He[0] = re(t, r, i, h), He[1] = re(e, n, a, h);
    var v = Ki(cr, He);
    v < c && (u = h, c = v)
  }
  c = 1 / 0;
  for (var d = 0; d < 32 && !(f < w_); d++) {
    var y = u - f,
      g = u + f;
    He[0] = re(t, r, i, y), He[1] = re(e, n, a, y);
    var v = Ki(He, cr);
    if (y >= 0 && v < c) u = y, c = v;
    else {
      Zi[0] = re(t, r, i, g), Zi[1] = re(e, n, a, g);
      var p = Ki(Zi, cr);
      g <= 1 && p < c ? (u = g, c = p) : f *= .5
    }
  }
  return l && (l[0] = re(t, r, i, u), l[1] = re(e, n, a, u)), vn(c)
}

function HM(t, e, r, n, i, a, o) {
  for (var s = t, l = e, u = 0, f = 1 / o, c = 1; c <= o; c++) {
    var h = c * f,
      v = re(t, r, i, h),
      d = re(e, n, a, h),
      y = v - s,
      g = d - l;
    u += Math.sqrt(y * y + g * g), s = v, l = d
  }
  return u
}
var VM = /cubic-bezier\(([0-9,\.e ]+)\)/;

function C_(t) {
  var e = t && VM.exec(t);
  if (e) {
    var r = e[1].split(","),
      n = +vr(r[0]),
      i = +vr(r[1]),
      a = +vr(r[2]),
      o = +vr(r[3]);
    if (isNaN(n + i + a + o)) return;
    var s = [];
    return function (l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Sl(0, n, a, 1, l, s) && Xt(0, i, o, 1, s[0])
    }
  }
}
var $M = function () {
    function t(e) {
      this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = e.life || 1e3, this._delay = e.delay || 0, this.loop = e.loop || !1, this.onframe = e.onframe || _e, this.ondestroy = e.ondestroy || _e, this.onrestart = e.onrestart || _e, e.easing && this.setEasing(e.easing)
    }
    return t.prototype.step = function (e, r) {
      if (this._inited || (this._startTime = e + this._delay, this._inited = !0), this._paused) {
        this._pausedTime += r;
        return
      }
      var n = this._life,
        i = e - this._startTime - this._pausedTime,
        a = i / n;
      a < 0 && (a = 0), a = Math.min(a, 1);
      var o = this.easingFunc,
        s = o ? o(a) : a;
      if (this.onframe(s), a === 1)
        if (this.loop) {
          var l = i % n;
          this._startTime = e - l, this._pausedTime = 0, this.onrestart()
        } else return !0;
      return !1
    }, t.prototype.pause = function () {
      this._paused = !0
    }, t.prototype.resume = function () {
      this._paused = !1
    }, t.prototype.setEasing = function (e) {
      this.easing = e, this.easingFunc = dt(e) ? e : __[e] || C_(e)
    }, t
  }(),
  GM = $M,
  T_ = function () {
    function t(e) {
      this.value = e
    }
    return t
  }(),
  WM = function () {
    function t() {
      this._len = 0
    }
    return t.prototype.insert = function (e) {
      var r = new T_(e);
      return this.insertEntry(r), r
    }, t.prototype.insertEntry = function (e) {
      this.head ? (this.tail.next = e, e.prev = this.tail, e.next = null, this.tail = e) : this.head = this.tail = e, this._len++
    }, t.prototype.remove = function (e) {
      var r = e.prev,
        n = e.next;
      r ? r.next = n : this.head = n, n ? n.prev = r : this.tail = r, e.next = e.prev = null, this._len--
    }, t.prototype.len = function () {
      return this._len
    }, t.prototype.clear = function () {
      this.head = this.tail = null, this._len = 0
    }, t
  }(),
  UM = function () {
    function t(e) {
      this._list = new WM, this._maxSize = 10, this._map = {}, this._maxSize = e
    }
    return t.prototype.put = function (e, r) {
      var n = this._list,
        i = this._map,
        a = null;
      if (i[e] == null) {
        var o = n.len(),
          s = this._lastRemovedEntry;
        if (o >= this._maxSize && o > 0) {
          var l = n.head;
          n.remove(l), delete i[l.key], a = l.value, this._lastRemovedEntry = l
        }
        s ? s.value = r : s = new T_(r), s.key = e, n.insertEntry(s), i[e] = s
      }
      return a
    }, t.prototype.get = function (e) {
      var r = this._map[e],
        n = this._list;
      if (r != null) return r !== n.tail && (n.remove(r), n.insertEntry(r)), r.value
    }, t.prototype.clear = function () {
      this._list.clear(), this._map = {}
    }, t.prototype.len = function () {
      return this._list.len()
    }, t
  }(),
  Ko = UM,
  wp = {
    transparent: [0, 0, 0, 0],
    aliceblue: [240, 248, 255, 1],
    antiquewhite: [250, 235, 215, 1],
    aqua: [0, 255, 255, 1],
    aquamarine: [127, 255, 212, 1],
    azure: [240, 255, 255, 1],
    beige: [245, 245, 220, 1],
    bisque: [255, 228, 196, 1],
    black: [0, 0, 0, 1],
    blanchedalmond: [255, 235, 205, 1],
    blue: [0, 0, 255, 1],
    blueviolet: [138, 43, 226, 1],
    brown: [165, 42, 42, 1],
    burlywood: [222, 184, 135, 1],
    cadetblue: [95, 158, 160, 1],
    chartreuse: [127, 255, 0, 1],
    chocolate: [210, 105, 30, 1],
    coral: [255, 127, 80, 1],
    cornflowerblue: [100, 149, 237, 1],
    cornsilk: [255, 248, 220, 1],
    crimson: [220, 20, 60, 1],
    cyan: [0, 255, 255, 1],
    darkblue: [0, 0, 139, 1],
    darkcyan: [0, 139, 139, 1],
    darkgoldenrod: [184, 134, 11, 1],
    darkgray: [169, 169, 169, 1],
    darkgreen: [0, 100, 0, 1],
    darkgrey: [169, 169, 169, 1],
    darkkhaki: [189, 183, 107, 1],
    darkmagenta: [139, 0, 139, 1],
    darkolivegreen: [85, 107, 47, 1],
    darkorange: [255, 140, 0, 1],
    darkorchid: [153, 50, 204, 1],
    darkred: [139, 0, 0, 1],
    darksalmon: [233, 150, 122, 1],
    darkseagreen: [143, 188, 143, 1],
    darkslateblue: [72, 61, 139, 1],
    darkslategray: [47, 79, 79, 1],
    darkslategrey: [47, 79, 79, 1],
    darkturquoise: [0, 206, 209, 1],
    darkviolet: [148, 0, 211, 1],
    deeppink: [255, 20, 147, 1],
    deepskyblue: [0, 191, 255, 1],
    dimgray: [105, 105, 105, 1],
    dimgrey: [105, 105, 105, 1],
    dodgerblue: [30, 144, 255, 1],
    firebrick: [178, 34, 34, 1],
    floralwhite: [255, 250, 240, 1],
    forestgreen: [34, 139, 34, 1],
    fuchsia: [255, 0, 255, 1],
    gainsboro: [220, 220, 220, 1],
    ghostwhite: [248, 248, 255, 1],
    gold: [255, 215, 0, 1],
    goldenrod: [218, 165, 32, 1],
    gray: [128, 128, 128, 1],
    green: [0, 128, 0, 1],
    greenyellow: [173, 255, 47, 1],
    grey: [128, 128, 128, 1],
    honeydew: [240, 255, 240, 1],
    hotpink: [255, 105, 180, 1],
    indianred: [205, 92, 92, 1],
    indigo: [75, 0, 130, 1],
    ivory: [255, 255, 240, 1],
    khaki: [240, 230, 140, 1],
    lavender: [230, 230, 250, 1],
    lavenderblush: [255, 240, 245, 1],
    lawngreen: [124, 252, 0, 1],
    lemonchiffon: [255, 250, 205, 1],
    lightblue: [173, 216, 230, 1],
    lightcoral: [240, 128, 128, 1],
    lightcyan: [224, 255, 255, 1],
    lightgoldenrodyellow: [250, 250, 210, 1],
    lightgray: [211, 211, 211, 1],
    lightgreen: [144, 238, 144, 1],
    lightgrey: [211, 211, 211, 1],
    lightpink: [255, 182, 193, 1],
    lightsalmon: [255, 160, 122, 1],
    lightseagreen: [32, 178, 170, 1],
    lightskyblue: [135, 206, 250, 1],
    lightslategray: [119, 136, 153, 1],
    lightslategrey: [119, 136, 153, 1],
    lightsteelblue: [176, 196, 222, 1],
    lightyellow: [255, 255, 224, 1],
    lime: [0, 255, 0, 1],
    limegreen: [50, 205, 50, 1],
    linen: [250, 240, 230, 1],
    magenta: [255, 0, 255, 1],
    maroon: [128, 0, 0, 1],
    mediumaquamarine: [102, 205, 170, 1],
    mediumblue: [0, 0, 205, 1],
    mediumorchid: [186, 85, 211, 1],
    mediumpurple: [147, 112, 219, 1],
    mediumseagreen: [60, 179, 113, 1],
    mediumslateblue: [123, 104, 238, 1],
    mediumspringgreen: [0, 250, 154, 1],
    mediumturquoise: [72, 209, 204, 1],
    mediumvioletred: [199, 21, 133, 1],
    midnightblue: [25, 25, 112, 1],
    mintcream: [245, 255, 250, 1],
    mistyrose: [255, 228, 225, 1],
    moccasin: [255, 228, 181, 1],
    navajowhite: [255, 222, 173, 1],
    navy: [0, 0, 128, 1],
    oldlace: [253, 245, 230, 1],
    olive: [128, 128, 0, 1],
    olivedrab: [107, 142, 35, 1],
    orange: [255, 165, 0, 1],
    orangered: [255, 69, 0, 1],
    orchid: [218, 112, 214, 1],
    palegoldenrod: [238, 232, 170, 1],
    palegreen: [152, 251, 152, 1],
    paleturquoise: [175, 238, 238, 1],
    palevioletred: [219, 112, 147, 1],
    papayawhip: [255, 239, 213, 1],
    peachpuff: [255, 218, 185, 1],
    peru: [205, 133, 63, 1],
    pink: [255, 192, 203, 1],
    plum: [221, 160, 221, 1],
    powderblue: [176, 224, 230, 1],
    purple: [128, 0, 128, 1],
    red: [255, 0, 0, 1],
    rosybrown: [188, 143, 143, 1],
    royalblue: [65, 105, 225, 1],
    saddlebrown: [139, 69, 19, 1],
    salmon: [250, 128, 114, 1],
    sandybrown: [244, 164, 96, 1],
    seagreen: [46, 139, 87, 1],
    seashell: [255, 245, 238, 1],
    sienna: [160, 82, 45, 1],
    silver: [192, 192, 192, 1],
    skyblue: [135, 206, 235, 1],
    slateblue: [106, 90, 205, 1],
    slategray: [112, 128, 144, 1],
    slategrey: [112, 128, 144, 1],
    snow: [255, 250, 250, 1],
    springgreen: [0, 255, 127, 1],
    steelblue: [70, 130, 180, 1],
    tan: [210, 180, 140, 1],
    teal: [0, 128, 128, 1],
    thistle: [216, 191, 216, 1],
    tomato: [255, 99, 71, 1],
    turquoise: [64, 224, 208, 1],
    violet: [238, 130, 238, 1],
    wheat: [245, 222, 179, 1],
    white: [255, 255, 255, 1],
    whitesmoke: [245, 245, 245, 1],
    yellow: [255, 255, 0, 1],
    yellowgreen: [154, 205, 50, 1]
  };

function dn(t) {
  return t = Math.round(t), t < 0 ? 0 : t > 255 ? 255 : t
}

function Mc(t) {
  return t < 0 ? 0 : t > 1 ? 1 : t
}

function Vu(t) {
  var e = t;
  return e.length && e.charAt(e.length - 1) === "%" ? dn(parseFloat(e) / 100 * 255) : dn(parseInt(e, 10))
}

function Cl(t) {
  var e = t;
  return e.length && e.charAt(e.length - 1) === "%" ? Mc(parseFloat(e) / 100) : Mc(parseFloat(e))
}

function $u(t, e, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? t + (e - t) * r * 6 : r * 2 < 1 ? e : r * 3 < 2 ? t + (e - t) * (2 / 3 - r) * 6 : t
}

function fs(t, e, r) {
  return t + (e - t) * r
}

function ke(t, e, r, n, i) {
  return t[0] = e, t[1] = r, t[2] = n, t[3] = i, t
}

function Dc(t, e) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
}
var M_ = new Ko(20),
  cs = null;

function xi(t, e) {
  cs && Dc(cs, e), cs = M_.put(t, cs || e.slice())
}

function Er(t, e) {
  if (!!t) {
    e = e || [];
    var r = M_.get(t);
    if (r) return Dc(e, r);
    t = t + "";
    var n = t.replace(/ /g, "").toLowerCase();
    if (n in wp) return Dc(e, wp[n]), xi(t, e), e;
    var i = n.length;
    if (n.charAt(0) === "#") {
      if (i === 4 || i === 5) {
        var a = parseInt(n.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          ke(e, 0, 0, 0, 1);
          return
        }
        return ke(e, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, i === 5 ? parseInt(n.slice(4), 16) / 15 : 1), xi(t, e), e
      } else if (i === 7 || i === 9) {
        var a = parseInt(n.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          ke(e, 0, 0, 0, 1);
          return
        }
        return ke(e, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, i === 9 ? parseInt(n.slice(7), 16) / 255 : 1), xi(t, e), e
      }
      return
    }
    var o = n.indexOf("("),
      s = n.indexOf(")");
    if (o !== -1 && s + 1 === i) {
      var l = n.substr(0, o),
        u = n.substr(o + 1, s - (o + 1)).split(","),
        f = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4) return u.length === 3 ? ke(e, +u[0], +u[1], +u[2], 1) : ke(e, 0, 0, 0, 1);
          f = Cl(u.pop());
        case "rgb":
          if (u.length !== 3) {
            ke(e, 0, 0, 0, 1);
            return
          }
          return ke(e, Vu(u[0]), Vu(u[1]), Vu(u[2]), f), xi(t, e), e;
        case "hsla":
          if (u.length !== 4) {
            ke(e, 0, 0, 0, 1);
            return
          }
          return u[3] = Cl(u[3]), Sp(u, e), xi(t, e), e;
        case "hsl":
          if (u.length !== 3) {
            ke(e, 0, 0, 0, 1);
            return
          }
          return Sp(u, e), xi(t, e), e;
        default:
          return
      }
    }
    ke(e, 0, 0, 0, 1)
  }
}

function Sp(t, e) {
  var r = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
    n = Cl(t[1]),
    i = Cl(t[2]),
    a = i <= .5 ? i * (n + 1) : i + n - i * n,
    o = i * 2 - a;
  return e = e || [], ke(e, dn($u(o, a, r + 1 / 3) * 255), dn($u(o, a, r) * 255), dn($u(o, a, r - 1 / 3) * 255), 1), t.length === 4 && (e[3] = t[3]), e
}

function bp(t, e) {
  var r = Er(t);
  if (r) {
    for (var n = 0; n < 3; n++) e < 0 ? r[n] = r[n] * (1 - e) | 0 : r[n] = (255 - r[n]) * e + r[n] | 0, r[n] > 255 ? r[n] = 255 : r[n] < 0 && (r[n] = 0);
    return nu(r, r.length === 4 ? "rgba" : "rgb")
  }
}

function YM(t, e, r) {
  if (!(!(e && e.length) || !(t >= 0 && t <= 1))) {
    var n = t * (e.length - 1),
      i = Math.floor(n),
      a = Math.ceil(n),
      o = Er(e[i]),
      s = Er(e[a]),
      l = n - i,
      u = nu([dn(fs(o[0], s[0], l)), dn(fs(o[1], s[1], l)), dn(fs(o[2], s[2], l)), Mc(fs(o[3], s[3], l))], "rgba");
    return r ? {
      color: u,
      leftIndex: i,
      rightIndex: a,
      value: n
    } : u
  }
}

function nu(t, e) {
  if (!(!t || !t.length)) {
    var r = t[0] + "," + t[1] + "," + t[2];
    return (e === "rgba" || e === "hsva" || e === "hsla") && (r += "," + t[3]), e + "(" + r + ")"
  }
}

function Tl(t, e) {
  var r = Er(t);
  return r ? (.299 * r[0] + .587 * r[1] + .114 * r[2]) * r[3] / 255 + (1 - r[3]) * e : 0
}

function XM(t) {
  return t.type === "linear"
}

function qM(t) {
  return t.type === "radial"
}(function () {
  return mt.hasGlobalWindow && dt(window.btoa) ? function (t) {
    return window.btoa(unescape(t))
  } : typeof Buffer != "undefined" ? function (t) {
    return Buffer.from(t).toString("base64")
  } : function (t) {
    return null
  }
})();
var Ac = Array.prototype.slice;

function Tr(t, e, r) {
  return (e - t) * r + t
}

function Gu(t, e, r, n) {
  for (var i = e.length, a = 0; a < i; a++) t[a] = Tr(e[a], r[a], n);
  return t
}

function KM(t, e, r, n) {
  for (var i = e.length, a = i && e[0].length, o = 0; o < i; o++) {
    t[o] || (t[o] = []);
    for (var s = 0; s < a; s++) t[o][s] = Tr(e[o][s], r[o][s], n)
  }
  return t
}

function hs(t, e, r, n) {
  for (var i = e.length, a = 0; a < i; a++) t[a] = e[a] + r[a] * n;
  return t
}

function xp(t, e, r, n) {
  for (var i = e.length, a = i && e[0].length, o = 0; o < i; o++) {
    t[o] || (t[o] = []);
    for (var s = 0; s < a; s++) t[o][s] = e[o][s] + r[o][s] * n
  }
  return t
}

function ZM(t, e) {
  for (var r = t.length, n = e.length, i = r > n ? e : t, a = Math.min(r, n), o = i[a - 1] || {
      color: [0, 0, 0, 0],
      offset: 0
    }, s = a; s < Math.max(r, n); s++) i.push({
    offset: o.offset,
    color: o.color.slice()
  })
}

function jM(t, e, r) {
  var n = t,
    i = e;
  if (!(!n.push || !i.push)) {
    var a = n.length,
      o = i.length;
    if (a !== o) {
      var s = a > o;
      if (s) n.length = o;
      else
        for (var l = a; l < o; l++) n.push(r === 1 ? i[l] : Ac.call(i[l]))
    }
    for (var u = n[0] && n[0].length, l = 0; l < n.length; l++)
      if (r === 1) isNaN(n[l]) && (n[l] = i[l]);
      else
        for (var f = 0; f < u; f++) isNaN(n[l][f]) && (n[l][f] = i[l][f])
  }
}

function Js(t) {
  if (we(t)) {
    var e = t.length;
    if (we(t[0])) {
      for (var r = [], n = 0; n < e; n++) r.push(Ac.call(t[n]));
      return r
    }
    return Ac.call(t)
  }
  return t
}

function tl(t) {
  return t[0] = Math.floor(t[0]) || 0, t[1] = Math.floor(t[1]) || 0, t[2] = Math.floor(t[2]) || 0, t[3] = t[3] == null ? 1 : t[3], "rgba(" + t.join(",") + ")"
}

function QM(t) {
  return we(t && t[0]) ? 2 : 1
}
var vs = 0,
  el = 1,
  D_ = 2,
  qa = 3,
  Pc = 4,
  Ic = 5,
  Cp = 6;

function Tp(t) {
  return t === Pc || t === Ic
}

function ds(t) {
  return t === el || t === D_
}
var Da = [0, 0, 0, 0],
  JM = function () {
    function t(e) {
      this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = e
    }
    return t.prototype.isFinished = function () {
      return this._finished
    }, t.prototype.setFinished = function () {
      this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished()
    }, t.prototype.needsAnimate = function () {
      return this.keyframes.length >= 1
    }, t.prototype.getAdditiveTrack = function () {
      return this._additiveTrack
    }, t.prototype.addKeyframe = function (e, r, n) {
      this._needsSort = !0;
      var i = this.keyframes,
        a = i.length,
        o = !1,
        s = Cp,
        l = r;
      if (we(r)) {
        var u = QM(r);
        s = u, (u === 1 && !$t(r[0]) || u === 2 && !$t(r[0][0])) && (o = !0)
      } else if ($t(r) && !_l(r)) s = vs;
      else if (nt(r))
        if (!isNaN(+r)) s = vs;
        else {
          var f = Er(r);
          f && (l = f, s = qa)
        }
      else if (eu(r)) {
        var c = q({}, l);
        c.colorStops = ct(r.colorStops, function (v) {
          return {
            offset: v.offset,
            color: Er(v.color)
          }
        }), XM(r) ? s = Pc : qM(r) && (s = Ic), l = c
      }
      a === 0 ? this.valType = s : (s !== this.valType || s === Cp) && (o = !0), this.discrete = this.discrete || o;
      var h = {
        time: e,
        value: l,
        rawValue: r,
        percent: 0
      };
      return n && (h.easing = n, h.easingFunc = dt(n) ? n : __[n] || C_(n)), i.push(h), h
    }, t.prototype.prepare = function (e, r) {
      var n = this.keyframes;
      this._needsSort && n.sort(function (y, g) {
        return y.time - g.time
      });
      for (var i = this.valType, a = n.length, o = n[a - 1], s = this.discrete, l = ds(i), u = Tp(i), f = 0; f < a; f++) {
        var c = n[f],
          h = c.value,
          v = o.value;
        c.percent = c.time / e, s || (l && f !== a - 1 ? jM(h, v, i) : u && ZM(h.colorStops, v.colorStops))
      }
      if (!s && i !== Ic && r && this.needsAnimate() && r.needsAnimate() && i === r.valType && !r._finished) {
        this._additiveTrack = r;
        for (var d = n[0].value, f = 0; f < a; f++) i === vs ? n[f].additiveValue = n[f].value - d : i === qa ? n[f].additiveValue = hs([], n[f].value, d, -1) : ds(i) && (n[f].additiveValue = i === el ? hs([], n[f].value, d, -1) : xp([], n[f].value, d, -1))
      }
    }, t.prototype.step = function (e, r) {
      if (!this._finished) {
        this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
        var n = this._additiveTrack != null,
          i = n ? "additiveValue" : "value",
          a = this.valType,
          o = this.keyframes,
          s = o.length,
          l = this.propName,
          u = a === qa,
          f, c = this._lastFr,
          h = Math.min,
          v, d;
        if (s === 1) v = d = o[0];
        else {
          if (r < 0) f = 0;
          else if (r < this._lastFrP) {
            var y = h(c + 1, s - 1);
            for (f = y; f >= 0 && !(o[f].percent <= r); f--);
            f = h(f, s - 2)
          } else {
            for (f = c; f < s && !(o[f].percent > r); f++);
            f = h(f - 1, s - 2)
          }
          d = o[f + 1], v = o[f]
        }
        if (!!(v && d)) {
          this._lastFr = f, this._lastFrP = r;
          var g = d.percent - v.percent,
            p = g === 0 ? 1 : h((r - v.percent) / g, 1);
          d.easingFunc && (p = d.easingFunc(p));
          var m = n ? this._additiveValue : u ? Da : e[l];
          if ((ds(a) || u) && !m && (m = this._additiveValue = []), this.discrete) e[l] = p < 1 ? v.rawValue : d.rawValue;
          else if (ds(a)) a === el ? Gu(m, v[i], d[i], p) : KM(m, v[i], d[i], p);
          else if (Tp(a)) {
            var _ = v[i],
              w = d[i],
              b = a === Pc;
            e[l] = {
              type: b ? "linear" : "radial",
              x: Tr(_.x, w.x, p),
              y: Tr(_.y, w.y, p),
              colorStops: ct(_.colorStops, function (x, T) {
                var M = w.colorStops[T];
                return {
                  offset: Tr(x.offset, M.offset, p),
                  color: tl(Gu([], x.color, M.color, p))
                }
              }),
              global: w.global
            }, b ? (e[l].x2 = Tr(_.x2, w.x2, p), e[l].y2 = Tr(_.y2, w.y2, p)) : e[l].r = Tr(_.r, w.r, p)
          } else if (u) Gu(m, v[i], d[i], p), n || (e[l] = tl(m));
          else {
            var S = Tr(v[i], d[i], p);
            n ? this._additiveValue = S : e[l] = S
          }
          n && this._addToTarget(e)
        }
      }
    }, t.prototype._addToTarget = function (e) {
      var r = this.valType,
        n = this.propName,
        i = this._additiveValue;
      r === vs ? e[n] = e[n] + i : r === qa ? (Er(e[n], Da), hs(Da, Da, i, 1), e[n] = tl(Da)) : r === el ? hs(e[n], e[n], i, 1) : r === D_ && xp(e[n], e[n], i, 1)
    }, t
  }(),
  tD = function () {
    function t(e, r, n, i) {
      if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = e, this._loop = r, r && i) {
        iv("Can' use additive animation on looped animation.");
        return
      }
      this._additiveAnimators = i, this._allowDiscrete = n
    }
    return t.prototype.getMaxTime = function () {
      return this._maxTime
    }, t.prototype.getDelay = function () {
      return this._delay
    }, t.prototype.getLoop = function () {
      return this._loop
    }, t.prototype.getTarget = function () {
      return this._target
    }, t.prototype.changeTarget = function (e) {
      this._target = e
    }, t.prototype.when = function (e, r, n) {
      return this.whenWithKeys(e, r, Vt(r), n)
    }, t.prototype.whenWithKeys = function (e, r, n, i) {
      for (var a = this._tracks, o = 0; o < n.length; o++) {
        var s = n[o],
          l = a[s];
        if (!l) {
          l = a[s] = new JM(s);
          var u = void 0,
            f = this._getAdditiveTrack(s);
          if (f) {
            var c = f.keyframes,
              h = c[c.length - 1];
            u = h && h.value, f.valType === qa && u && (u = tl(u))
          } else u = this._target[s];
          if (u == null) continue;
          e > 0 && l.addKeyframe(0, Js(u), i), this._trackKeys.push(s)
        }
        l.addKeyframe(e, Js(r[s]), i)
      }
      return this._maxTime = Math.max(this._maxTime, e), this
    }, t.prototype.pause = function () {
      this._clip.pause(), this._paused = !0
    }, t.prototype.resume = function () {
      this._clip.resume(), this._paused = !1
    }, t.prototype.isPaused = function () {
      return !!this._paused
    }, t.prototype.duration = function (e) {
      return this._maxTime = e, this._force = !0, this
    }, t.prototype._doneCallback = function () {
      this._setTracksFinished(), this._clip = null;
      var e = this._doneCbs;
      if (e)
        for (var r = e.length, n = 0; n < r; n++) e[n].call(this)
    }, t.prototype._abortedCallback = function () {
      this._setTracksFinished();
      var e = this.animation,
        r = this._abortedCbs;
      if (e && e.removeClip(this._clip), this._clip = null, r)
        for (var n = 0; n < r.length; n++) r[n].call(this)
    }, t.prototype._setTracksFinished = function () {
      for (var e = this._tracks, r = this._trackKeys, n = 0; n < r.length; n++) e[r[n]].setFinished()
    }, t.prototype._getAdditiveTrack = function (e) {
      var r, n = this._additiveAnimators;
      if (n)
        for (var i = 0; i < n.length; i++) {
          var a = n[i].getTrack(e);
          a && (r = a)
        }
      return r
    }, t.prototype.start = function (e) {
      if (!(this._started > 0)) {
        this._started = 1;
        for (var r = this, n = [], i = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
          var o = this._trackKeys[a],
            s = this._tracks[o],
            l = this._getAdditiveTrack(o),
            u = s.keyframes,
            f = u.length;
          if (s.prepare(i, l), s.needsAnimate())
            if (!this._allowDiscrete && s.discrete) {
              var c = u[f - 1];
              c && (r._target[s.propName] = c.rawValue), s.setFinished()
            } else n.push(s)
        }
        if (n.length || this._force) {
          var h = new GM({
            life: i,
            loop: this._loop,
            delay: this._delay || 0,
            onframe: function (v) {
              r._started = 2;
              var d = r._additiveAnimators;
              if (d) {
                for (var y = !1, g = 0; g < d.length; g++)
                  if (d[g]._clip) {
                    y = !0;
                    break
                  } y || (r._additiveAnimators = null)
              }
              for (var g = 0; g < n.length; g++) n[g].step(r._target, v);
              var p = r._onframeCbs;
              if (p)
                for (var g = 0; g < p.length; g++) p[g](r._target, v)
            },
            ondestroy: function () {
              r._doneCallback()
            }
          });
          this._clip = h, this.animation && this.animation.addClip(h), e && h.setEasing(e)
        } else this._doneCallback();
        return this
      }
    }, t.prototype.stop = function (e) {
      if (!!this._clip) {
        var r = this._clip;
        e && r.onframe(1), this._abortedCallback()
      }
    }, t.prototype.delay = function (e) {
      return this._delay = e, this
    }, t.prototype.during = function (e) {
      return e && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(e)), this
    }, t.prototype.done = function (e) {
      return e && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(e)), this
    }, t.prototype.aborted = function (e) {
      return e && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(e)), this
    }, t.prototype.getClip = function () {
      return this._clip
    }, t.prototype.getTrack = function (e) {
      return this._tracks[e]
    }, t.prototype.getTracks = function () {
      var e = this;
      return ct(this._trackKeys, function (r) {
        return e._tracks[r]
      })
    }, t.prototype.stopTracks = function (e, r) {
      if (!e.length || !this._clip) return !0;
      for (var n = this._tracks, i = this._trackKeys, a = 0; a < e.length; a++) {
        var o = n[e[a]];
        o && !o.isFinished() && (r ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished())
      }
      for (var s = !0, a = 0; a < i.length; a++)
        if (!n[i[a]].isFinished()) {
          s = !1;
          break
        } return s && this._abortedCallback(), s
    }, t.prototype.saveTo = function (e, r, n) {
      if (!!e) {
        r = r || this._trackKeys;
        for (var i = 0; i < r.length; i++) {
          var a = r[i],
            o = this._tracks[a];
          if (!(!o || o.isFinished())) {
            var s = o.keyframes,
              l = s[n ? 0 : s.length - 1];
            l && (e[a] = Js(l.rawValue))
          }
        }
      }
    }, t.prototype.__changeFinalValue = function (e, r) {
      r = r || Vt(e);
      for (var n = 0; n < r.length; n++) {
        var i = r[n],
          a = this._tracks[i];
        if (!!a) {
          var o = a.keyframes;
          if (o.length > 1) {
            var s = o.pop();
            a.addKeyframe(s.time, e[i]), a.prepare(this._maxTime, a.getAdditiveTrack())
          }
        }
      }
    }, t
  }(),
  sv = tD;

function Gi() {
  return new Date().getTime()
}
var eD = function (t) {
    J(e, t);

    function e(r) {
      var n = t.call(this) || this;
      return n._running = !1, n._time = 0, n._pausedTime = 0, n._pauseStart = 0, n._paused = !1, r = r || {}, n.stage = r.stage || {}, n
    }
    return e.prototype.addClip = function (r) {
      r.animation && this.removeClip(r), this._head ? (this._tail.next = r, r.prev = this._tail, r.next = null, this._tail = r) : this._head = this._tail = r, r.animation = this
    }, e.prototype.addAnimator = function (r) {
      r.animation = this;
      var n = r.getClip();
      n && this.addClip(n)
    }, e.prototype.removeClip = function (r) {
      if (!!r.animation) {
        var n = r.prev,
          i = r.next;
        n ? n.next = i : this._head = i, i ? i.prev = n : this._tail = n, r.next = r.prev = r.animation = null
      }
    }, e.prototype.removeAnimator = function (r) {
      var n = r.getClip();
      n && this.removeClip(n), r.animation = null
    }, e.prototype.update = function (r) {
      for (var n = Gi() - this._pausedTime, i = n - this._time, a = this._head; a;) {
        var o = a.next,
          s = a.step(n, i);
        s && (a.ondestroy(), this.removeClip(a)), a = o
      }
      this._time = n, r || (this.trigger("frame", i), this.stage.update && this.stage.update())
    }, e.prototype._startLoop = function () {
      var r = this;
      this._running = !0;

      function n() {
        r._running && (Tc(n), !r._paused && r.update())
      }
      Tc(n)
    }, e.prototype.start = function () {
      this._running || (this._time = Gi(), this._pausedTime = 0, this._startLoop())
    }, e.prototype.stop = function () {
      this._running = !1
    }, e.prototype.pause = function () {
      this._paused || (this._pauseStart = Gi(), this._paused = !0)
    }, e.prototype.resume = function () {
      this._paused && (this._pausedTime += Gi() - this._pauseStart, this._paused = !1)
    }, e.prototype.clear = function () {
      for (var r = this._head; r;) {
        var n = r.next;
        r.prev = r.next = r.animation = null, r = n
      }
      this._head = this._tail = null
    }, e.prototype.isFinished = function () {
      return this._head == null
    }, e.prototype.animate = function (r, n) {
      n = n || {}, this.start();
      var i = new sv(r, n.loop);
      return this.addAnimator(i), i
    }, e
  }(_r),
  rD = eD,
  nD = 300,
  Wu = mt.domSupported,
  Uu = function () {
    var t = ["click", "dblclick", "mousewheel", "wheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
      e = ["touchstart", "touchend", "touchmove"],
      r = {
        pointerdown: 1,
        pointerup: 1,
        pointermove: 1,
        pointerout: 1
      },
      n = ct(t, function (i) {
        var a = i.replace("mouse", "pointer");
        return r.hasOwnProperty(a) ? a : i
      });
    return {
      mouse: t,
      touch: e,
      pointer: n
    }
  }(),
  Mp = {
    mouse: ["mousemove", "mouseup"],
    pointer: ["pointermove", "pointerup"]
  },
  Dp = !1;

function Ec(t) {
  var e = t.pointerType;
  return e === "pen" || e === "touch"
}

function iD(t) {
  t.touching = !0, t.touchTimer != null && (clearTimeout(t.touchTimer), t.touchTimer = null), t.touchTimer = setTimeout(function () {
    t.touching = !1, t.touchTimer = null
  }, 700)
}

function Yu(t) {
  t && (t.zrByTouch = !0)
}

function aD(t, e) {
  return Be(t.dom, new oD(t, e), !0)
}

function A_(t, e) {
  for (var r = e, n = !1; r && r.nodeType !== 9 && !(n = r.domBelongToZr || r !== e && r === t.painterRoot);) r = r.parentNode;
  return n
}
var oD = function () {
    function t(e, r) {
      this.stopPropagation = _e, this.stopImmediatePropagation = _e, this.preventDefault = _e, this.type = r.type, this.target = this.currentTarget = e.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY
    }
    return t
  }(),
  je = {
    mousedown: function (t) {
      t = Be(this.dom, t), this.__mayPointerCapture = [t.zrX, t.zrY], this.trigger("mousedown", t)
    },
    mousemove: function (t) {
      t = Be(this.dom, t);
      var e = this.__mayPointerCapture;
      e && (t.zrX !== e[0] || t.zrY !== e[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", t)
    },
    mouseup: function (t) {
      t = Be(this.dom, t), this.__togglePointerCapture(!1), this.trigger("mouseup", t)
    },
    mouseout: function (t) {
      t = Be(this.dom, t);
      var e = t.toElement || t.relatedTarget;
      A_(this, e) || (this.__pointerCapturing && (t.zrEventControl = "no_globalout"), this.trigger("mouseout", t))
    },
    wheel: function (t) {
      Dp = !0, t = Be(this.dom, t), this.trigger("mousewheel", t)
    },
    mousewheel: function (t) {
      Dp || (t = Be(this.dom, t), this.trigger("mousewheel", t))
    },
    touchstart: function (t) {
      t = Be(this.dom, t), Yu(t), this.__lastTouchMoment = new Date, this.handler.processGesture(t, "start"), je.mousemove.call(this, t), je.mousedown.call(this, t)
    },
    touchmove: function (t) {
      t = Be(this.dom, t), Yu(t), this.handler.processGesture(t, "change"), je.mousemove.call(this, t)
    },
    touchend: function (t) {
      t = Be(this.dom, t), Yu(t), this.handler.processGesture(t, "end"), je.mouseup.call(this, t), +new Date - +this.__lastTouchMoment < nD && je.click.call(this, t)
    },
    pointerdown: function (t) {
      je.mousedown.call(this, t)
    },
    pointermove: function (t) {
      Ec(t) || je.mousemove.call(this, t)
    },
    pointerup: function (t) {
      je.mouseup.call(this, t)
    },
    pointerout: function (t) {
      Ec(t) || je.mouseout.call(this, t)
    }
  };
P(["click", "dblclick", "contextmenu"], function (t) {
  je[t] = function (e) {
    e = Be(this.dom, e), this.trigger(t, e)
  }
});
var Lc = {
  pointermove: function (t) {
    Ec(t) || Lc.mousemove.call(this, t)
  },
  pointerup: function (t) {
    Lc.mouseup.call(this, t)
  },
  mousemove: function (t) {
    this.trigger("mousemove", t)
  },
  mouseup: function (t) {
    var e = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", t), e && (t.zrEventControl = "only_globalout", this.trigger("mouseout", t))
  }
};

function sD(t, e) {
  var r = e.domHandlers;
  mt.pointerEventsSupported ? P(Uu.pointer, function (n) {
    rl(e, n, function (i) {
      r[n].call(t, i)
    })
  }) : (mt.touchEventsSupported && P(Uu.touch, function (n) {
    rl(e, n, function (i) {
      r[n].call(t, i), iD(e)
    })
  }), P(Uu.mouse, function (n) {
    rl(e, n, function (i) {
      i = ov(i), e.touching || r[n].call(t, i)
    })
  }))
}

function lD(t, e) {
  mt.pointerEventsSupported ? P(Mp.pointer, r) : mt.touchEventsSupported || P(Mp.mouse, r);

  function r(n) {
    function i(a) {
      a = ov(a), A_(t, a.target) || (a = aD(t, a), e.domHandlers[n].call(t, a))
    }
    rl(e, n, i, {
      capture: !0
    })
  }
}

function rl(t, e, r, n) {
  t.mounted[e] = r, t.listenerOpts[e] = n, SM(t.domTarget, e, r, n)
}

function Xu(t) {
  var e = t.mounted;
  for (var r in e) e.hasOwnProperty(r) && bM(t.domTarget, r, e[r], t.listenerOpts[r]);
  t.mounted = {}
}
var Ap = function () {
    function t(e, r) {
      this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = e, this.domHandlers = r
    }
    return t
  }(),
  uD = function (t) {
    J(e, t);

    function e(r, n) {
      var i = t.call(this) || this;
      return i.__pointerCapturing = !1, i.dom = r, i.painterRoot = n, i._localHandlerScope = new Ap(r, je), Wu && (i._globalHandlerScope = new Ap(document, Lc)), sD(i, i._localHandlerScope), i
    }
    return e.prototype.dispose = function () {
      Xu(this._localHandlerScope), Wu && Xu(this._globalHandlerScope)
    }, e.prototype.setCursor = function (r) {
      this.dom.style && (this.dom.style.cursor = r || "default")
    }, e.prototype.__togglePointerCapture = function (r) {
      if (this.__mayPointerCapture = null, Wu && +this.__pointerCapturing ^ +r) {
        this.__pointerCapturing = r;
        var n = this._globalHandlerScope;
        r ? lD(this, n) : Xu(n)
      }
    }, e
  }(_r),
  fD = uD,
  P_ = 1;
mt.hasGlobalWindow && (P_ = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Ml = P_,
  Rc = .4,
  Oc = "#333",
  kc = "#ccc",
  cD = "#eee";

function Eo() {
  return [1, 0, 0, 1, 0, 0]
}

function lv(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
}

function hD(t, e) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
}

function ji(t, e, r) {
  var n = e[0] * r[0] + e[2] * r[1],
    i = e[1] * r[0] + e[3] * r[1],
    a = e[0] * r[2] + e[2] * r[3],
    o = e[1] * r[2] + e[3] * r[3],
    s = e[0] * r[4] + e[2] * r[5] + e[4],
    l = e[1] * r[4] + e[3] * r[5] + e[5];
  return t[0] = n, t[1] = i, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
}

function Bc(t, e, r) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + r[0], t[5] = e[5] + r[1], t
}

function uv(t, e, r) {
  var n = e[0],
    i = e[2],
    a = e[4],
    o = e[1],
    s = e[3],
    l = e[5],
    u = Math.sin(r),
    f = Math.cos(r);
  return t[0] = n * f + o * u, t[1] = -n * u + o * f, t[2] = i * f + s * u, t[3] = -i * u + f * s, t[4] = f * a + u * l, t[5] = f * l - u * a, t
}

function vD(t, e, r) {
  var n = r[0],
    i = r[1];
  return t[0] = e[0] * n, t[1] = e[1] * i, t[2] = e[2] * n, t[3] = e[3] * i, t[4] = e[4] * n, t[5] = e[5] * i, t
}

function fv(t, e) {
  var r = e[0],
    n = e[2],
    i = e[4],
    a = e[1],
    o = e[3],
    s = e[5],
    l = r * o - a * n;
  return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -n * l, t[3] = r * l, t[4] = (n * s - o * i) * l, t[5] = (a * i - r * s) * l, t) : null
}
var Pp = lv,
  Ip = 5e-5;

function Tn(t) {
  return t > Ip || t < -Ip
}
var Mn = [],
  Ci = [],
  qu = Eo(),
  Ku = Math.abs,
  cv = function () {
    function t() {}
    return t.prototype.getLocalTransform = function (e) {
      return t.getLocalTransform(this, e)
    }, t.prototype.setPosition = function (e) {
      this.x = e[0], this.y = e[1]
    }, t.prototype.setScale = function (e) {
      this.scaleX = e[0], this.scaleY = e[1]
    }, t.prototype.setSkew = function (e) {
      this.skewX = e[0], this.skewY = e[1]
    }, t.prototype.setOrigin = function (e) {
      this.originX = e[0], this.originY = e[1]
    }, t.prototype.needLocalTransform = function () {
      return Tn(this.rotation) || Tn(this.x) || Tn(this.y) || Tn(this.scaleX - 1) || Tn(this.scaleY - 1) || Tn(this.skewX) || Tn(this.skewY)
    }, t.prototype.updateTransform = function () {
      var e = this.parent && this.parent.transform,
        r = this.needLocalTransform(),
        n = this.transform;
      if (!(r || e)) {
        n && Pp(n);
        return
      }
      n = n || Eo(), r ? this.getLocalTransform(n) : Pp(n), e && (r ? ji(n, e, n) : hD(n, e)), this.transform = n, this._resolveGlobalScaleRatio(n)
    }, t.prototype._resolveGlobalScaleRatio = function (e) {
      var r = this.globalScaleRatio;
      if (r != null && r !== 1) {
        this.getGlobalScale(Mn);
        var n = Mn[0] < 0 ? -1 : 1,
          i = Mn[1] < 0 ? -1 : 1,
          a = ((Mn[0] - n) * r + n) / Mn[0] || 0,
          o = ((Mn[1] - i) * r + i) / Mn[1] || 0;
        e[0] *= a, e[1] *= a, e[2] *= o, e[3] *= o
      }
      this.invTransform = this.invTransform || Eo(), fv(this.invTransform, e)
    }, t.prototype.getComputedTransform = function () {
      for (var e = this, r = []; e;) r.push(e), e = e.parent;
      for (; e = r.pop();) e.updateTransform();
      return this.transform
    }, t.prototype.setLocalTransform = function (e) {
      if (!!e) {
        var r = e[0] * e[0] + e[1] * e[1],
          n = e[2] * e[2] + e[3] * e[3],
          i = Math.atan2(e[1], e[0]),
          a = Math.PI / 2 + i - Math.atan2(e[3], e[2]);
        n = Math.sqrt(n) * Math.cos(a), r = Math.sqrt(r), this.skewX = a, this.skewY = 0, this.rotation = -i, this.x = +e[4], this.y = +e[5], this.scaleX = r, this.scaleY = n, this.originX = 0, this.originY = 0
      }
    }, t.prototype.decomposeTransform = function () {
      if (!!this.transform) {
        var e = this.parent,
          r = this.transform;
        e && e.transform && (ji(Ci, e.invTransform, r), r = Ci);
        var n = this.originX,
          i = this.originY;
        (n || i) && (qu[4] = n, qu[5] = i, ji(Ci, r, qu), Ci[4] -= n, Ci[5] -= i, r = Ci), this.setLocalTransform(r)
      }
    }, t.prototype.getGlobalScale = function (e) {
      var r = this.transform;
      return e = e || [], r ? (e[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), e[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3]), r[0] < 0 && (e[0] = -e[0]), r[3] < 0 && (e[1] = -e[1]), e) : (e[0] = 1, e[1] = 1, e)
    }, t.prototype.transformCoordToLocal = function (e, r) {
      var n = [e, r],
        i = this.invTransform;
      return i && Ye(n, n, i), n
    }, t.prototype.transformCoordToGlobal = function (e, r) {
      var n = [e, r],
        i = this.transform;
      return i && Ye(n, n, i), n
    }, t.prototype.getLineScale = function () {
      var e = this.transform;
      return e && Ku(e[0] - 1) > 1e-10 && Ku(e[3] - 1) > 1e-10 ? Math.sqrt(Ku(e[0] * e[3] - e[2] * e[1])) : 1
    }, t.prototype.copyTransform = function (e) {
      dD(this, e)
    }, t.getLocalTransform = function (e, r) {
      r = r || [];
      var n = e.originX || 0,
        i = e.originY || 0,
        a = e.scaleX,
        o = e.scaleY,
        s = e.anchorX,
        l = e.anchorY,
        u = e.rotation || 0,
        f = e.x,
        c = e.y,
        h = e.skewX ? Math.tan(e.skewX) : 0,
        v = e.skewY ? Math.tan(-e.skewY) : 0;
      if (n || i || s || l) {
        var d = n + s,
          y = i + l;
        r[4] = -d * a - h * y * o, r[5] = -y * o - v * d * a
      } else r[4] = r[5] = 0;
      return r[0] = a, r[3] = o, r[1] = v * a, r[2] = h * o, u && uv(r, r, u), r[4] += n + f, r[5] += i + c, r
    }, t.initDefaultProps = function () {
      var e = t.prototype;
      e.scaleX = e.scaleY = e.globalScaleRatio = 1, e.x = e.y = e.originX = e.originY = e.skewX = e.skewY = e.rotation = e.anchorX = e.anchorY = 0
    }(), t
  }(),
  Lo = ["x", "y", "originX", "originY", "anchorX", "anchorY", "rotation", "scaleX", "scaleY", "skewX", "skewY"];

function dD(t, e) {
  for (var r = 0; r < Lo.length; r++) {
    var n = Lo[r];
    t[n] = e[n]
  }
}
var pD = function () {
    function t(e, r) {
      this.x = e || 0, this.y = r || 0
    }
    return t.prototype.copy = function (e) {
      return this.x = e.x, this.y = e.y, this
    }, t.prototype.clone = function () {
      return new t(this.x, this.y)
    }, t.prototype.set = function (e, r) {
      return this.x = e, this.y = r, this
    }, t.prototype.equal = function (e) {
      return e.x === this.x && e.y === this.y
    }, t.prototype.add = function (e) {
      return this.x += e.x, this.y += e.y, this
    }, t.prototype.scale = function (e) {
      this.x *= e, this.y *= e
    }, t.prototype.scaleAndAdd = function (e, r) {
      this.x += e.x * r, this.y += e.y * r
    }, t.prototype.sub = function (e) {
      return this.x -= e.x, this.y -= e.y, this
    }, t.prototype.dot = function (e) {
      return this.x * e.x + this.y * e.y
    }, t.prototype.len = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }, t.prototype.lenSquare = function () {
      return this.x * this.x + this.y * this.y
    }, t.prototype.normalize = function () {
      var e = this.len();
      return this.x /= e, this.y /= e, this
    }, t.prototype.distance = function (e) {
      var r = this.x - e.x,
        n = this.y - e.y;
      return Math.sqrt(r * r + n * n)
    }, t.prototype.distanceSquare = function (e) {
      var r = this.x - e.x,
        n = this.y - e.y;
      return r * r + n * n
    }, t.prototype.negate = function () {
      return this.x = -this.x, this.y = -this.y, this
    }, t.prototype.transform = function (e) {
      if (!!e) {
        var r = this.x,
          n = this.y;
        return this.x = e[0] * r + e[2] * n + e[4], this.y = e[1] * r + e[3] * n + e[5], this
      }
    }, t.prototype.toArray = function (e) {
      return e[0] = this.x, e[1] = this.y, e
    }, t.prototype.fromArray = function (e) {
      this.x = e[0], this.y = e[1]
    }, t.set = function (e, r, n) {
      e.x = r, e.y = n
    }, t.copy = function (e, r) {
      e.x = r.x, e.y = r.y
    }, t.len = function (e) {
      return Math.sqrt(e.x * e.x + e.y * e.y)
    }, t.lenSquare = function (e) {
      return e.x * e.x + e.y * e.y
    }, t.dot = function (e, r) {
      return e.x * r.x + e.y * r.y
    }, t.add = function (e, r, n) {
      e.x = r.x + n.x, e.y = r.y + n.y
    }, t.sub = function (e, r, n) {
      e.x = r.x - n.x, e.y = r.y - n.y
    }, t.scale = function (e, r, n) {
      e.x = r.x * n, e.y = r.y * n
    }, t.scaleAndAdd = function (e, r, n, i) {
      e.x = r.x + n.x * i, e.y = r.y + n.y * i
    }, t.lerp = function (e, r, n, i) {
      var a = 1 - i;
      e.x = a * r.x + i * n.x, e.y = a * r.y + i * n.y
    }, t
  }(),
  Lt = pD,
  ps = Math.min,
  gs = Math.max,
  Dn = new Lt,
  An = new Lt,
  Pn = new Lt,
  In = new Lt,
  Aa = new Lt,
  Pa = new Lt,
  gD = function () {
    function t(e, r, n, i) {
      n < 0 && (e = e + n, n = -n), i < 0 && (r = r + i, i = -i), this.x = e, this.y = r, this.width = n, this.height = i
    }
    return t.prototype.union = function (e) {
      var r = ps(e.x, this.x),
        n = ps(e.y, this.y);
      isFinite(this.x) && isFinite(this.width) ? this.width = gs(e.x + e.width, this.x + this.width) - r : this.width = e.width, isFinite(this.y) && isFinite(this.height) ? this.height = gs(e.y + e.height, this.y + this.height) - n : this.height = e.height, this.x = r, this.y = n
    }, t.prototype.applyTransform = function (e) {
      t.applyTransform(this, this, e)
    }, t.prototype.calculateTransform = function (e) {
      var r = this,
        n = e.width / r.width,
        i = e.height / r.height,
        a = Eo();
      return Bc(a, a, [-r.x, -r.y]), vD(a, a, [n, i]), Bc(a, a, [e.x, e.y]), a
    }, t.prototype.intersect = function (e, r) {
      if (!e) return !1;
      e instanceof t || (e = t.create(e));
      var n = this,
        i = n.x,
        a = n.x + n.width,
        o = n.y,
        s = n.y + n.height,
        l = e.x,
        u = e.x + e.width,
        f = e.y,
        c = e.y + e.height,
        h = !(a < l || u < i || s < f || c < o);
      if (r) {
        var v = 1 / 0,
          d = 0,
          y = Math.abs(a - l),
          g = Math.abs(u - i),
          p = Math.abs(s - f),
          m = Math.abs(c - o),
          _ = Math.min(y, g),
          w = Math.min(p, m);
        a < l || u < i ? _ > d && (d = _, y < g ? Lt.set(Pa, -y, 0) : Lt.set(Pa, g, 0)) : _ < v && (v = _, y < g ? Lt.set(Aa, y, 0) : Lt.set(Aa, -g, 0)), s < f || c < o ? w > d && (d = w, p < m ? Lt.set(Pa, 0, -p) : Lt.set(Pa, 0, m)) : _ < v && (v = _, p < m ? Lt.set(Aa, 0, p) : Lt.set(Aa, 0, -m))
      }
      return r && Lt.copy(r, h ? Aa : Pa), h
    }, t.prototype.contain = function (e, r) {
      var n = this;
      return e >= n.x && e <= n.x + n.width && r >= n.y && r <= n.y + n.height
    }, t.prototype.clone = function () {
      return new t(this.x, this.y, this.width, this.height)
    }, t.prototype.copy = function (e) {
      t.copy(this, e)
    }, t.prototype.plain = function () {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      }
    }, t.prototype.isFinite = function () {
      return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height)
    }, t.prototype.isZero = function () {
      return this.width === 0 || this.height === 0
    }, t.create = function (e) {
      return new t(e.x, e.y, e.width, e.height)
    }, t.copy = function (e, r) {
      e.x = r.x, e.y = r.y, e.width = r.width, e.height = r.height
    }, t.applyTransform = function (e, r, n) {
      if (!n) {
        e !== r && t.copy(e, r);
        return
      }
      if (n[1] < 1e-5 && n[1] > -1e-5 && n[2] < 1e-5 && n[2] > -1e-5) {
        var i = n[0],
          a = n[3],
          o = n[4],
          s = n[5];
        e.x = r.x * i + o, e.y = r.y * a + s, e.width = r.width * i, e.height = r.height * a, e.width < 0 && (e.x += e.width, e.width = -e.width), e.height < 0 && (e.y += e.height, e.height = -e.height);
        return
      }
      Dn.x = Pn.x = r.x, Dn.y = In.y = r.y, An.x = In.x = r.x + r.width, An.y = Pn.y = r.y + r.height, Dn.transform(n), In.transform(n), An.transform(n), Pn.transform(n), e.x = ps(Dn.x, An.x, Pn.x, In.x), e.y = ps(Dn.y, An.y, Pn.y, In.y);
      var l = gs(Dn.x, An.x, Pn.x, In.x),
        u = gs(Dn.y, An.y, Pn.y, In.y);
      e.width = l - e.x, e.height = u - e.y
    }, t
  }(),
  Ot = gD,
  Ep = {};

function De(t, e) {
  e = e || si;
  var r = Ep[e];
  r || (r = Ep[e] = new Ko(500));
  var n = r.get(t);
  return n == null && (n = di.measureText(t, e).width, r.put(t, n)), n
}

function Lp(t, e, r, n) {
  var i = De(t, e),
    a = vv(e),
    o = Ka(0, i, r),
    s = Hi(0, a, n),
    l = new Ot(o, s, i, a);
  return l
}

function hv(t, e, r, n) {
  var i = ((t || "") + "").split(`
`),
    a = i.length;
  if (a === 1) return Lp(i[0], e, r, n);
  for (var o = new Ot(0, 0, 0, 0), s = 0; s < i.length; s++) {
    var l = Lp(i[s], e, r, n);
    s === 0 ? o.copy(l) : o.union(l)
  }
  return o
}

function Ka(t, e, r) {
  return r === "right" ? t -= e : r === "center" && (t -= e / 2), t
}

function Hi(t, e, r) {
  return r === "middle" ? t -= e / 2 : r === "bottom" && (t -= e), t
}

function vv(t) {
  return De("\u56FD", t)
}

function li(t, e) {
  return typeof t == "string" ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
}

function I_(t, e, r) {
  var n = e.position || "inside",
    i = e.distance != null ? e.distance : 5,
    a = r.height,
    o = r.width,
    s = a / 2,
    l = r.x,
    u = r.y,
    f = "left",
    c = "top";
  if (n instanceof Array) l += li(n[0], r.width), u += li(n[1], r.height), f = null, c = null;
  else switch (n) {
    case "left":
      l -= i, u += s, f = "right", c = "middle";
      break;
    case "right":
      l += i + o, u += s, c = "middle";
      break;
    case "top":
      l += o / 2, u -= i, f = "center", c = "bottom";
      break;
    case "bottom":
      l += o / 2, u += a + i, f = "center";
      break;
    case "inside":
      l += o / 2, u += s, f = "center", c = "middle";
      break;
    case "insideLeft":
      l += i, u += s, c = "middle";
      break;
    case "insideRight":
      l += o - i, u += s, f = "right", c = "middle";
      break;
    case "insideTop":
      l += o / 2, u += i, f = "center";
      break;
    case "insideBottom":
      l += o / 2, u += a - i, f = "center", c = "bottom";
      break;
    case "insideTopLeft":
      l += i, u += i;
      break;
    case "insideTopRight":
      l += o - i, u += i, f = "right";
      break;
    case "insideBottomLeft":
      l += i, u += a - i, c = "bottom";
      break;
    case "insideBottomRight":
      l += o - i, u += a - i, f = "right", c = "bottom";
      break
  }
  return t = t || {}, t.x = l, t.y = u, t.align = f, t.verticalAlign = c, t
}
var Zu = "__zr_normal__",
  ju = Lo.concat(["ignore"]),
  yD = ga(Lo, function (t, e) {
    return t[e] = !0, t
  }, {
    ignore: !1
  }),
  Ti = {},
  mD = new Ot(0, 0, 0, 0),
  dv = function () {
    function t(e) {
      this.id = l_(), this.animators = [], this.currentStates = [], this.states = {}, this._init(e)
    }
    return t.prototype._init = function (e) {
      this.attr(e)
    }, t.prototype.drift = function (e, r, n) {
      switch (this.draggable) {
        case "horizontal":
          r = 0;
          break;
        case "vertical":
          e = 0;
          break
      }
      var i = this.transform;
      i || (i = this.transform = [1, 0, 0, 1, 0, 0]), i[4] += e, i[5] += r, this.decomposeTransform(), this.markRedraw()
    }, t.prototype.beforeUpdate = function () {}, t.prototype.afterUpdate = function () {}, t.prototype.update = function () {
      this.updateTransform(), this.__dirty && this.updateInnerText()
    }, t.prototype.updateInnerText = function (e) {
      var r = this._textContent;
      if (r && (!r.ignore || e)) {
        this.textConfig || (this.textConfig = {});
        var n = this.textConfig,
          i = n.local,
          a = r.innerTransformable,
          o = void 0,
          s = void 0,
          l = !1;
        a.parent = i ? this : null;
        var u = !1;
        if (a.copyTransform(r), n.position != null) {
          var f = mD;
          n.layoutRect ? f.copy(n.layoutRect) : f.copy(this.getBoundingRect()), i || f.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(Ti, n, f) : I_(Ti, n, f), a.x = Ti.x, a.y = Ti.y, o = Ti.align, s = Ti.verticalAlign;
          var c = n.origin;
          if (c && n.rotation != null) {
            var h = void 0,
              v = void 0;
            c === "center" ? (h = f.width * .5, v = f.height * .5) : (h = li(c[0], f.width), v = li(c[1], f.height)), u = !0, a.originX = -a.x + h + (i ? 0 : f.x), a.originY = -a.y + v + (i ? 0 : f.y)
          }
        }
        n.rotation != null && (a.rotation = n.rotation);
        var d = n.offset;
        d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
        var y = n.inside == null ? typeof n.position == "string" && n.position.indexOf("inside") >= 0 : n.inside,
          g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}),
          p = void 0,
          m = void 0,
          _ = void 0;
        y && this.canBeInsideText() ? (p = n.insideFill, m = n.insideStroke, (p == null || p === "auto") && (p = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(p), _ = !0)) : (p = n.outsideFill, m = n.outsideStroke, (p == null || p === "auto") && (p = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(p), _ = !0)), p = p || "#000", (p !== g.fill || m !== g.stroke || _ !== g.autoStroke || o !== g.align || s !== g.verticalAlign) && (l = !0, g.fill = p, g.stroke = m, g.autoStroke = _, g.align = o, g.verticalAlign = s, r.setDefaultTextStyle(g)), r.__dirty |= Te, l && r.dirtyStyle(!0)
      }
    }, t.prototype.canBeInsideText = function () {
      return !0
    }, t.prototype.getInsideTextFill = function () {
      return "#fff"
    }, t.prototype.getInsideTextStroke = function (e) {
      return "#000"
    }, t.prototype.getOutsideFill = function () {
      return this.__zr && this.__zr.isDarkMode() ? kc : Oc
    }, t.prototype.getOutsideStroke = function (e) {
      var r = this.__zr && this.__zr.getBackgroundColor(),
        n = typeof r == "string" && Er(r);
      n || (n = [255, 255, 255, 1]);
      for (var i = n[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++) n[o] = n[o] * i + (a ? 0 : 255) * (1 - i);
      return n[3] = 1, nu(n, "rgba")
    }, t.prototype.traverse = function (e, r) {}, t.prototype.attrKV = function (e, r) {
      e === "textConfig" ? this.setTextConfig(r) : e === "textContent" ? this.setTextContent(r) : e === "clipPath" ? this.setClipPath(r) : e === "extra" ? (this.extra = this.extra || {}, q(this.extra, r)) : this[e] = r
    }, t.prototype.hide = function () {
      this.ignore = !0, this.markRedraw()
    }, t.prototype.show = function () {
      this.ignore = !1, this.markRedraw()
    }, t.prototype.attr = function (e, r) {
      if (typeof e == "string") this.attrKV(e, r);
      else if (st(e))
        for (var n = e, i = Vt(n), a = 0; a < i.length; a++) {
          var o = i[a];
          this.attrKV(o, e[o])
        }
      return this.markRedraw(), this
    }, t.prototype.saveCurrentToNormalState = function (e) {
      this._innerSaveToNormal(e);
      for (var r = this._normalState, n = 0; n < this.animators.length; n++) {
        var i = this.animators[n],
          a = i.__fromStateTransition;
        if (!(i.getLoop() || a && a !== Zu)) {
          var o = i.targetName,
            s = o ? r[o] : r;
          i.saveTo(s)
        }
      }
    }, t.prototype._innerSaveToNormal = function (e) {
      var r = this._normalState;
      r || (r = this._normalState = {}), e.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(e, r, ju)
    }, t.prototype._savePrimaryToNormal = function (e, r, n) {
      for (var i = 0; i < n.length; i++) {
        var a = n[i];
        e[a] != null && !(a in r) && (r[a] = this[a])
      }
    }, t.prototype.hasState = function () {
      return this.currentStates.length > 0
    }, t.prototype.getState = function (e) {
      return this.states[e]
    }, t.prototype.ensureState = function (e) {
      var r = this.states;
      return r[e] || (r[e] = {}), r[e]
    }, t.prototype.clearStates = function (e) {
      this.useState(Zu, !1, e)
    }, t.prototype.useState = function (e, r, n, i) {
      var a = e === Zu,
        o = this.hasState();
      if (!(!o && a)) {
        var s = this.currentStates,
          l = this.stateTransition;
        if (!(Pt(s, e) >= 0 && (r || s.length === 1))) {
          var u;
          if (this.stateProxy && !a && (u = this.stateProxy(e)), u || (u = this.states && this.states[e]), !u && !a) {
            iv("State " + e + " not exists.");
            return
          }
          a || this.saveCurrentToNormalState(u);
          var f = !!(u && u.hoverLayer || i);
          f && this._toggleHoverLayerFlag(!0), this._applyStateObj(e, u, this._normalState, r, !n && !this.__inHover && l && l.duration > 0, l);
          var c = this._textContent,
            h = this._textGuide;
          return c && c.useState(e, r, n, f), h && h.useState(e, r, n, f), a ? (this.currentStates = [], this._normalState = {}) : r ? this.currentStates.push(e) : this.currentStates = [e], this._updateAnimationTargets(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Te), u
        }
      }
    }, t.prototype.useStates = function (e, r, n) {
      if (!e.length) this.clearStates();
      else {
        var i = [],
          a = this.currentStates,
          o = e.length,
          s = o === a.length;
        if (s) {
          for (var l = 0; l < o; l++)
            if (e[l] !== a[l]) {
              s = !1;
              break
            }
        }
        if (s) return;
        for (var l = 0; l < o; l++) {
          var u = e[l],
            f = void 0;
          this.stateProxy && (f = this.stateProxy(u, e)), f || (f = this.states[u]), f && i.push(f)
        }
        var c = i[o - 1],
          h = !!(c && c.hoverLayer || n);
        h && this._toggleHoverLayerFlag(!0);
        var v = this._mergeStates(i),
          d = this.stateTransition;
        this.saveCurrentToNormalState(v), this._applyStateObj(e.join(","), v, this._normalState, !1, !r && !this.__inHover && d && d.duration > 0, d);
        var y = this._textContent,
          g = this._textGuide;
        y && y.useStates(e, r, h), g && g.useStates(e, r, h), this._updateAnimationTargets(), this.currentStates = e.slice(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Te)
      }
    }, t.prototype._updateAnimationTargets = function () {
      for (var e = 0; e < this.animators.length; e++) {
        var r = this.animators[e];
        r.targetName && r.changeTarget(this[r.targetName])
      }
    }, t.prototype.removeState = function (e) {
      var r = Pt(this.currentStates, e);
      if (r >= 0) {
        var n = this.currentStates.slice();
        n.splice(r, 1), this.useStates(n)
      }
    }, t.prototype.replaceState = function (e, r, n) {
      var i = this.currentStates.slice(),
        a = Pt(i, e),
        o = Pt(i, r) >= 0;
      a >= 0 ? o ? i.splice(a, 1) : i[a] = r : n && !o && i.push(r), this.useStates(i)
    }, t.prototype.toggleState = function (e, r) {
      r ? this.useState(e, !0) : this.removeState(e)
    }, t.prototype._mergeStates = function (e) {
      for (var r = {}, n, i = 0; i < e.length; i++) {
        var a = e[i];
        q(r, a), a.textConfig && (n = n || {}, q(n, a.textConfig))
      }
      return n && (r.textConfig = n), r
    }, t.prototype._applyStateObj = function (e, r, n, i, a, o) {
      var s = !(r && i);
      r && r.textConfig ? (this.textConfig = q({}, i ? this.textConfig : n.textConfig), q(this.textConfig, r.textConfig)) : s && n.textConfig && (this.textConfig = n.textConfig);
      for (var l = {}, u = !1, f = 0; f < ju.length; f++) {
        var c = ju[f],
          h = a && yD[c];
        r && r[c] != null ? h ? (u = !0, l[c] = r[c]) : this[c] = r[c] : s && n[c] != null && (h ? (u = !0, l[c] = n[c]) : this[c] = n[c])
      }
      if (!a)
        for (var f = 0; f < this.animators.length; f++) {
          var v = this.animators[f],
            d = v.targetName;
          v.getLoop() || v.__changeFinalValue(d ? (r || n)[d] : r || n)
        }
      u && this._transitionState(e, l, o)
    }, t.prototype._attachComponent = function (e) {
      if (!(e.__zr && !e.__hostTarget) && e !== this) {
        var r = this.__zr;
        r && e.addSelfToZr(r), e.__zr = r, e.__hostTarget = this
      }
    }, t.prototype._detachComponent = function (e) {
      e.__zr && e.removeSelfFromZr(e.__zr), e.__zr = null, e.__hostTarget = null
    }, t.prototype.getClipPath = function () {
      return this._clipPath
    }, t.prototype.setClipPath = function (e) {
      this._clipPath && this._clipPath !== e && this.removeClipPath(), this._attachComponent(e), this._clipPath = e, this.markRedraw()
    }, t.prototype.removeClipPath = function () {
      var e = this._clipPath;
      e && (this._detachComponent(e), this._clipPath = null, this.markRedraw())
    }, t.prototype.getTextContent = function () {
      return this._textContent
    }, t.prototype.setTextContent = function (e) {
      var r = this._textContent;
      r !== e && (r && r !== e && this.removeTextContent(), e.innerTransformable = new cv, this._attachComponent(e), this._textContent = e, this.markRedraw())
    }, t.prototype.setTextConfig = function (e) {
      this.textConfig || (this.textConfig = {}), q(this.textConfig, e), this.markRedraw()
    }, t.prototype.removeTextConfig = function () {
      this.textConfig = null, this.markRedraw()
    }, t.prototype.removeTextContent = function () {
      var e = this._textContent;
      e && (e.innerTransformable = null, this._detachComponent(e), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw())
    }, t.prototype.getTextGuideLine = function () {
      return this._textGuide
    }, t.prototype.setTextGuideLine = function (e) {
      this._textGuide && this._textGuide !== e && this.removeTextGuideLine(), this._attachComponent(e), this._textGuide = e, this.markRedraw()
    }, t.prototype.removeTextGuideLine = function () {
      var e = this._textGuide;
      e && (this._detachComponent(e), this._textGuide = null, this.markRedraw())
    }, t.prototype.markRedraw = function () {
      this.__dirty |= Te;
      var e = this.__zr;
      e && (this.__inHover ? e.refreshHover() : e.refresh()), this.__hostTarget && this.__hostTarget.markRedraw()
    }, t.prototype.dirty = function () {
      this.markRedraw()
    }, t.prototype._toggleHoverLayerFlag = function (e) {
      this.__inHover = e;
      var r = this._textContent,
        n = this._textGuide;
      r && (r.__inHover = e), n && (n.__inHover = e)
    }, t.prototype.addSelfToZr = function (e) {
      if (this.__zr !== e) {
        this.__zr = e;
        var r = this.animators;
        if (r)
          for (var n = 0; n < r.length; n++) e.animation.addAnimator(r[n]);
        this._clipPath && this._clipPath.addSelfToZr(e), this._textContent && this._textContent.addSelfToZr(e), this._textGuide && this._textGuide.addSelfToZr(e)
      }
    }, t.prototype.removeSelfFromZr = function (e) {
      if (!!this.__zr) {
        this.__zr = null;
        var r = this.animators;
        if (r)
          for (var n = 0; n < r.length; n++) e.animation.removeAnimator(r[n]);
        this._clipPath && this._clipPath.removeSelfFromZr(e), this._textContent && this._textContent.removeSelfFromZr(e), this._textGuide && this._textGuide.removeSelfFromZr(e)
      }
    }, t.prototype.animate = function (e, r, n) {
      var i = e ? this[e] : this,
        a = new sv(i, r, n);
      return e && (a.targetName = e), this.addAnimator(a, e), a
    }, t.prototype.addAnimator = function (e, r) {
      var n = this.__zr,
        i = this;
      e.during(function () {
        i.updateDuringAnimation(r)
      }).done(function () {
        var a = i.animators,
          o = Pt(a, e);
        o >= 0 && a.splice(o, 1)
      }), this.animators.push(e), n && n.animation.addAnimator(e), n && n.wakeUp()
    }, t.prototype.updateDuringAnimation = function (e) {
      this.markRedraw()
    }, t.prototype.stopAnimation = function (e, r) {
      for (var n = this.animators, i = n.length, a = [], o = 0; o < i; o++) {
        var s = n[o];
        !e || e === s.scope ? s.stop(r) : a.push(s)
      }
      return this.animators = a, this
    }, t.prototype.animateTo = function (e, r, n) {
      Qu(this, e, r, n)
    }, t.prototype.animateFrom = function (e, r, n) {
      Qu(this, e, r, n, !0)
    }, t.prototype._transitionState = function (e, r, n, i) {
      for (var a = Qu(this, r, n, i), o = 0; o < a.length; o++) a[o].__fromStateTransition = e
    }, t.prototype.getBoundingRect = function () {
      return null
    }, t.prototype.getPaintRect = function () {
      return null
    }, t.initDefaultProps = function () {
      var e = t.prototype;
      e.type = "element", e.name = "", e.ignore = e.silent = e.isGroup = e.draggable = e.dragging = e.ignoreClip = e.__inHover = !1, e.__dirty = Te;

      function r(n, i, a, o) {
        Object.defineProperty(e, n, {
          get: function () {
            if (!this[i]) {
              var l = this[i] = [];
              s(this, l)
            }
            return this[i]
          },
          set: function (l) {
            this[a] = l[0], this[o] = l[1], this[i] = l, s(this, l)
          }
        });

        function s(l, u) {
          Object.defineProperty(u, 0, {
            get: function () {
              return l[a]
            },
            set: function (f) {
              l[a] = f
            }
          }), Object.defineProperty(u, 1, {
            get: function () {
              return l[o]
            },
            set: function (f) {
              l[o] = f
            }
          })
        }
      }
      Object.defineProperty && (r("position", "_legacyPos", "x", "y"), r("scale", "_legacyScale", "scaleX", "scaleY"), r("origin", "_legacyOrigin", "originX", "originY"))
    }(), t
  }();
mr(dv, _r);
mr(dv, cv);

function Qu(t, e, r, n, i) {
  r = r || {};
  var a = [];
  E_(t, "", t, e, r, n, a, i);
  var o = a.length,
    s = !1,
    l = r.done,
    u = r.aborted,
    f = function () {
      s = !0, o--, o <= 0 && (s ? l && l() : u && u())
    },
    c = function () {
      o--, o <= 0 && (s ? l && l() : u && u())
    };
  o || l && l(), a.length > 0 && r.during && a[0].during(function (d, y) {
    r.during(y)
  });
  for (var h = 0; h < a.length; h++) {
    var v = a[h];
    f && v.done(f), c && v.aborted(c), r.force && v.duration(r.duration), v.start(r.easing)
  }
  return a
}

function Ju(t, e, r) {
  for (var n = 0; n < r; n++) t[n] = e[n]
}

function _D(t) {
  return we(t[0])
}

function wD(t, e, r) {
  if (we(e[r]))
    if (we(t[r]) || (t[r] = []), Ie(e[r])) {
      var n = e[r].length;
      t[r].length !== n && (t[r] = new e[r].constructor(n), Ju(t[r], e[r], n))
    } else {
      var i = e[r],
        a = t[r],
        o = i.length;
      if (_D(i))
        for (var s = i[0].length, l = 0; l < o; l++) a[l] ? Ju(a[l], i[l], s) : a[l] = Array.prototype.slice.call(i[l]);
      else Ju(a, i, o);
      a.length = i.length
    }
  else t[r] = e[r]
}

function SD(t, e) {
  return t === e || we(t) && we(e) && bD(t, e)
}

function bD(t, e) {
  var r = t.length;
  if (r !== e.length) return !1;
  for (var n = 0; n < r; n++)
    if (t[n] !== e[n]) return !1;
  return !0
}

function E_(t, e, r, n, i, a, o, s) {
  for (var l = Vt(n), u = i.duration, f = i.delay, c = i.additive, h = i.setToFinal, v = !st(a), d = t.animators, y = [], g = 0; g < l.length; g++) {
    var p = l[g],
      m = n[p];
    if (m != null && r[p] != null && (v || a[p]))
      if (st(m) && !we(m) && !eu(m)) {
        if (e) {
          s || (r[p] = m, t.updateDuringAnimation(e));
          continue
        }
        E_(t, p, r[p], m, i, a && a[p], o, s)
      } else y.push(p);
    else s || (r[p] = m, t.updateDuringAnimation(e), y.push(p))
  }
  var _ = y.length;
  if (!c && _)
    for (var w = 0; w < d.length; w++) {
      var b = d[w];
      if (b.targetName === e) {
        var S = b.stopTracks(y);
        if (S) {
          var x = Pt(d, b);
          d.splice(x, 1)
        }
      }
    }
  if (i.force || (y = ge(y, function (I) {
      return !SD(n[I], r[I])
    }), _ = y.length), _ > 0 || i.force && !o.length) {
    var T = void 0,
      M = void 0,
      D = void 0;
    if (s) {
      M = {}, h && (T = {});
      for (var w = 0; w < _; w++) {
        var p = y[w];
        M[p] = r[p], h ? T[p] = n[p] : r[p] = n[p]
      }
    } else if (h) {
      D = {};
      for (var w = 0; w < _; w++) {
        var p = y[w];
        D[p] = Js(r[p]), wD(r, n, p)
      }
    }
    var b = new sv(r, !1, !1, c ? ge(d, function (A) {
      return A.targetName === e
    }) : null);
    b.targetName = e, i.scope && (b.scope = i.scope), h && T && b.whenWithKeys(0, T, y), D && b.whenWithKeys(0, D, y), b.whenWithKeys(u == null ? 500 : u, s ? M : n, y).delay(f || 0), t.addAnimator(b, e), o.push(b)
  }
}
var L_ = dv,
  R_ = function (t) {
    J(e, t);

    function e(r) {
      var n = t.call(this) || this;
      return n.isGroup = !0, n._children = [], n.attr(r), n
    }
    return e.prototype.childrenRef = function () {
      return this._children
    }, e.prototype.children = function () {
      return this._children.slice()
    }, e.prototype.childAt = function (r) {
      return this._children[r]
    }, e.prototype.childOfName = function (r) {
      for (var n = this._children, i = 0; i < n.length; i++)
        if (n[i].name === r) return n[i]
    }, e.prototype.childCount = function () {
      return this._children.length
    }, e.prototype.add = function (r) {
      return r && r !== this && r.parent !== this && (this._children.push(r), this._doAdd(r)), this
    }, e.prototype.addBefore = function (r, n) {
      if (r && r !== this && r.parent !== this && n && n.parent === this) {
        var i = this._children,
          a = i.indexOf(n);
        a >= 0 && (i.splice(a, 0, r), this._doAdd(r))
      }
      return this
    }, e.prototype.replace = function (r, n) {
      var i = Pt(this._children, r);
      return i >= 0 && this.replaceAt(n, i), this
    }, e.prototype.replaceAt = function (r, n) {
      var i = this._children,
        a = i[n];
      if (r && r !== this && r.parent !== this && r !== a) {
        i[n] = r, a.parent = null;
        var o = this.__zr;
        o && a.removeSelfFromZr(o), this._doAdd(r)
      }
      return this
    }, e.prototype._doAdd = function (r) {
      r.parent && r.parent.remove(r), r.parent = this;
      var n = this.__zr;
      n && n !== r.__zr && r.addSelfToZr(n), n && n.refresh()
    }, e.prototype.remove = function (r) {
      var n = this.__zr,
        i = this._children,
        a = Pt(i, r);
      return a < 0 ? this : (i.splice(a, 1), r.parent = null, n && r.removeSelfFromZr(n), n && n.refresh(), this)
    }, e.prototype.removeAll = function () {
      for (var r = this._children, n = this.__zr, i = 0; i < r.length; i++) {
        var a = r[i];
        n && a.removeSelfFromZr(n), a.parent = null
      }
      return r.length = 0, this
    }, e.prototype.eachChild = function (r, n) {
      for (var i = this._children, a = 0; a < i.length; a++) {
        var o = i[a];
        r.call(n, o, a)
      }
      return this
    }, e.prototype.traverse = function (r, n) {
      for (var i = 0; i < this._children.length; i++) {
        var a = this._children[i],
          o = r.call(n, a);
        a.isGroup && !o && a.traverse(r, n)
      }
      return this
    }, e.prototype.addSelfToZr = function (r) {
      t.prototype.addSelfToZr.call(this, r);
      for (var n = 0; n < this._children.length; n++) {
        var i = this._children[n];
        i.addSelfToZr(r)
      }
    }, e.prototype.removeSelfFromZr = function (r) {
      t.prototype.removeSelfFromZr.call(this, r);
      for (var n = 0; n < this._children.length; n++) {
        var i = this._children[n];
        i.removeSelfFromZr(r)
      }
    }, e.prototype.getBoundingRect = function (r) {
      for (var n = new Ot(0, 0, 0, 0), i = r || this._children, a = [], o = null, s = 0; s < i.length; s++) {
        var l = i[s];
        if (!(l.ignore || l.invisible)) {
          var u = l.getBoundingRect(),
            f = l.getLocalTransform(a);
          f ? (Ot.applyTransform(n, u, f), o = o || n.clone(), o.union(n)) : (o = o || u.clone(), o.union(u))
        }
      }
      return o || n
    }, e
  }(L_);
R_.prototype.type = "group";
var ce = R_;
/*!
 * ZRender, a high performance 2d drawing library.
 *
 * Copyright (c) 2013, Baidu Inc.
 * All rights reserved.
 *
 * LICENSE
 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
 */
var nl = {},
  O_ = {};

function xD(t) {
  delete O_[t]
}

function CD(t) {
  if (!t) return !1;
  if (typeof t == "string") return Tl(t, 1) < Rc;
  if (t.colorStops) {
    for (var e = t.colorStops, r = 0, n = e.length, i = 0; i < n; i++) r += Tl(e[i].color, 1);
    return r /= n, r < Rc
  }
  return !1
}
var TD = function () {
  function t(e, r, n) {
    var i = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, n = n || {}, this.dom = r, this.id = e;
    var a = new kM,
      o = n.renderer || "canvas";
    nl[o] || (o = Vt(nl)[0]), n.useDirtyRect = n.useDirtyRect == null ? !1 : n.useDirtyRect;
    var s = new nl[o](r, a, n, e),
      l = n.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !mt.node && !mt.worker && !l ? new fD(s.getViewportRoot(), s.root) : null;
    this.handler = new IM(a, s, u, s.root), this.animation = new rD({
      stage: {
        update: l ? null : function () {
          return i._flush(!0)
        }
      }
    }), l || this.animation.start()
  }
  return t.prototype.add = function (e) {
    !e || (this.storage.addRoot(e), e.addSelfToZr(this), this.refresh())
  }, t.prototype.remove = function (e) {
    !e || (this.storage.delRoot(e), e.removeSelfFromZr(this), this.refresh())
  }, t.prototype.configLayer = function (e, r) {
    this.painter.configLayer && this.painter.configLayer(e, r), this.refresh()
  }, t.prototype.setBackgroundColor = function (e) {
    this.painter.setBackgroundColor && this.painter.setBackgroundColor(e), this.refresh(), this._backgroundColor = e, this._darkMode = CD(e)
  }, t.prototype.getBackgroundColor = function () {
    return this._backgroundColor
  }, t.prototype.setDarkMode = function (e) {
    this._darkMode = e
  }, t.prototype.isDarkMode = function () {
    return this._darkMode
  }, t.prototype.refreshImmediately = function (e) {
    e || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1
  }, t.prototype.refresh = function () {
    this._needsRefresh = !0, this.animation.start()
  }, t.prototype.flush = function () {
    this._flush(!1)
  }, t.prototype._flush = function (e) {
    var r, n = Gi();
    this._needsRefresh && (r = !0, this.refreshImmediately(e)), this._needsRefreshHover && (r = !0, this.refreshHoverImmediately());
    var i = Gi();
    r ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: i - n
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop())
  }, t.prototype.setSleepAfterStill = function (e) {
    this._sleepAfterStill = e
  }, t.prototype.wakeUp = function () {
    this.animation.start(), this._stillFrameAccum = 0
  }, t.prototype.refreshHover = function () {
    this._needsRefreshHover = !0
  }, t.prototype.refreshHoverImmediately = function () {
    this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.getType() === "canvas" && this.painter.refreshHover()
  }, t.prototype.resize = function (e) {
    e = e || {}, this.painter.resize(e.width, e.height), this.handler.resize()
  }, t.prototype.clearAnimation = function () {
    this.animation.clear()
  }, t.prototype.getWidth = function () {
    return this.painter.getWidth()
  }, t.prototype.getHeight = function () {
    return this.painter.getHeight()
  }, t.prototype.setCursorStyle = function (e) {
    this.handler.setCursorStyle(e)
  }, t.prototype.findHover = function (e, r) {
    return this.handler.findHover(e, r)
  }, t.prototype.on = function (e, r, n) {
    return this.handler.on(e, r, n), this
  }, t.prototype.off = function (e, r) {
    this.handler.off(e, r)
  }, t.prototype.trigger = function (e, r) {
    this.handler.trigger(e, r)
  }, t.prototype.clear = function () {
    for (var e = this.storage.getRoots(), r = 0; r < e.length; r++) e[r] instanceof ce && e[r].removeSelfFromZr(this);
    this.storage.delAllRoots(), this.painter.clear()
  }, t.prototype.dispose = function () {
    this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, xD(this.id)
  }, t
}();

function Rp(t, e) {
  var r = new TD(l_(), t, e);
  return O_[r.id] = r, r
}

function MD(t, e) {
  nl[t] = e
}
var Op = 1e-4,
  k_ = 20;

function DD(t) {
  return t.replace(/^\s+|\s+$/g, "")
}

function kp(t, e, r, n) {
  var i = e[0],
    a = e[1],
    o = r[0],
    s = r[1],
    l = a - i,
    u = s - o;
  if (l === 0) return u === 0 ? o : (o + s) / 2;
  if (n)
    if (l > 0) {
      if (t <= i) return o;
      if (t >= a) return s
    } else {
      if (t >= i) return o;
      if (t <= a) return s
    }
  else {
    if (t === i) return o;
    if (t === a) return s
  }
  return (t - i) / l * u + o
}

function ue(t, e) {
  switch (t) {
    case "center":
    case "middle":
      t = "50%";
      break;
    case "left":
    case "top":
      t = "0%";
      break;
    case "right":
    case "bottom":
      t = "100%";
      break
  }
  return nt(t) ? DD(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : t == null ? NaN : +t
}

function Yt(t, e, r) {
  return e == null && (e = 10), e = Math.min(Math.max(0, e), k_), t = (+t).toFixed(e), r ? t : +t
}

function Ar(t) {
  if (t = +t, isNaN(t)) return 0;
  if (t > 1e-14) {
    for (var e = 1, r = 0; r < 15; r++, e *= 10)
      if (Math.round(t * e) / e === t) return r
  }
  return AD(t)
}

function AD(t) {
  var e = t.toString().toLowerCase(),
    r = e.indexOf("e"),
    n = r > 0 ? +e.slice(r + 1) : 0,
    i = r > 0 ? r : e.length,
    a = e.indexOf("."),
    o = a < 0 ? 0 : i - 1 - a;
  return Math.max(0, o - n)
}

function PD(t, e) {
  var r = Math.log,
    n = Math.LN10,
    i = Math.floor(r(t[1] - t[0]) / n),
    a = Math.round(r(Math.abs(e[1] - e[0])) / n),
    o = Math.min(Math.max(-i + a, 0), 20);
  return isFinite(o) ? o : 20
}

function ID(t, e) {
  var r = Math.max(Ar(t), Ar(e)),
    n = t + e;
  return r > k_ ? n : Yt(n, r)
}

function B_(t) {
  var e = Math.PI * 2;
  return (t % e + e) % e
}

function Dl(t) {
  return t > -Op && t < Op
}
var ED = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;

function kr(t) {
  if (t instanceof Date) return t;
  if (nt(t)) {
    var e = ED.exec(t);
    if (!e) return new Date(NaN);
    if (e[8]) {
      var r = +e[4] || 0;
      return e[8].toUpperCase() !== "Z" && (r -= +e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, r, +(e[5] || 0), +e[6] || 0, e[7] ? +e[7].substring(0, 3) : 0))
    } else return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, e[7] ? +e[7].substring(0, 3) : 0)
  } else if (t == null) return new Date(NaN);
  return new Date(Math.round(t))
}

function LD(t) {
  return Math.pow(10, pv(t))
}

function pv(t) {
  if (t === 0) return 0;
  var e = Math.floor(Math.log(t) / Math.LN10);
  return t / Math.pow(10, e) >= 10 && e++, e
}

function N_(t, e) {
  var r = pv(t),
    n = Math.pow(10, r),
    i = t / n,
    a;
  return e ? i < 1.5 ? a = 1 : i < 2.5 ? a = 2 : i < 4 ? a = 3 : i < 7 ? a = 5 : a = 10 : i < 1 ? a = 1 : i < 2 ? a = 2 : i < 3 ? a = 3 : i < 5 ? a = 5 : a = 10, t = a * n, r >= -20 ? +t.toFixed(r < 0 ? -r : 0) : t
}

function Al(t) {
  var e = parseFloat(t);
  return e == t && (e !== 0 || !nt(t) || t.indexOf("x") <= 0) ? e : NaN
}

function RD(t) {
  return !isNaN(Al(t))
}

function F_() {
  return Math.round(Math.random() * 9)
}

function z_(t, e) {
  return e === 0 ? t : z_(e, t % e)
}

function Bp(t, e) {
  return t == null ? e : e == null ? t : t * e / z_(t, e)
}

function ye(t) {
  throw new Error(t)
}

function Np(t, e, r) {
  return (e - t) * r + t
}
var H_ = "series\0",
  OD = "\0_ec_\0";

function fe(t) {
  return t instanceof Array ? t : t == null ? [] : [t]
}

function Fp(t, e, r) {
  if (t) {
    t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
    for (var n = 0, i = r.length; n < i; n++) {
      var a = r[n];
      !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a])
    }
  }
}
var zp = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];

function Zo(t) {
  return st(t) && !et(t) && !(t instanceof Date) ? t.value : t
}

function kD(t) {
  return st(t) && !(t instanceof Array)
}

function BD(t, e, r) {
  var n = r === "normalMerge",
    i = r === "replaceMerge",
    a = r === "replaceAll";
  t = t || [], e = (e || []).slice();
  var o = gt();
  P(e, function (l, u) {
    if (!st(l)) {
      e[u] = null;
      return
    }
  });
  var s = ND(t, o, r);
  return (n || i) && FD(s, t, o, e), n && zD(s, e), n || i ? HD(s, e, i) : a && VD(s, e), $D(s), s
}

function ND(t, e, r) {
  var n = [];
  if (r === "replaceAll") return n;
  for (var i = 0; i < t.length; i++) {
    var a = t[i];
    a && a.id != null && e.set(a.id, i), n.push({
      existing: r === "replaceMerge" || Ro(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    })
  }
  return n
}

function FD(t, e, r, n) {
  P(n, function (i, a) {
    if (!(!i || i.id == null)) {
      var o = uo(i.id),
        s = r.get(o);
      if (s != null) {
        var l = t[s];
        Or(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = i, l.existing = e[s], n[a] = null
      }
    }
  })
}

function zD(t, e) {
  P(e, function (r, n) {
    if (!(!r || r.name == null))
      for (var i = 0; i < t.length; i++) {
        var a = t[i].existing;
        if (!t[i].newOption && a && (a.id == null || r.id == null) && !Ro(r) && !Ro(a) && V_("name", a, r)) {
          t[i].newOption = r, e[n] = null;
          return
        }
      }
  })
}

function HD(t, e, r) {
  P(e, function (n) {
    if (!!n) {
      for (var i, a = 0;
        (i = t[a]) && (i.newOption || Ro(i.existing) || i.existing && n.id != null && !V_("id", n, i.existing));) a++;
      i ? (i.newOption = n, i.brandNew = r) : t.push({
        newOption: n,
        brandNew: r,
        existing: null,
        keyInfo: null
      }), a++
    }
  })
}

function VD(t, e) {
  P(e, function (r) {
    t.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    })
  })
}

function $D(t) {
  var e = gt();
  P(t, function (r) {
    var n = r.existing;
    n && e.set(n.id, r)
  }), P(t, function (r) {
    var n = r.newOption;
    Or(!n || n.id == null || !e.get(n.id) || e.get(n.id) === r, "id duplicates: " + (n && n.id)), n && n.id != null && e.set(n.id, r), !r.keyInfo && (r.keyInfo = {})
  }), P(t, function (r, n) {
    var i = r.existing,
      a = r.newOption,
      o = r.keyInfo;
    if (!!st(a)) {
      if (o.name = a.name != null ? uo(a.name) : i ? i.name : H_ + n, i) o.id = uo(i.id);
      else if (a.id != null) o.id = uo(a.id);
      else {
        var s = 0;
        do o.id = "\0" + o.name + "\0" + s++; while (e.get(o.id))
      }
      e.set(o.id, r)
    }
  })
}

function V_(t, e, r) {
  var n = pr(e[t], null),
    i = pr(r[t], null);
  return n != null && i != null && n === i
}

function uo(t) {
  return pr(t, "")
}

function pr(t, e) {
  return t == null ? e : nt(t) ? t : $t(t) || _c(t) ? t + "" : e
}

function gv(t) {
  var e = t.name;
  return !!(e && e.indexOf(H_))
}

function Ro(t) {
  return t && t.id != null && uo(t.id).indexOf(OD) === 0
}

function GD(t, e, r) {
  P(t, function (n) {
    var i = n.newOption;
    st(i) && (n.keyInfo.mainType = e, n.keyInfo.subType = WD(e, i, n.existing, r))
  })
}

function WD(t, e, r, n) {
  var i = e.type ? e.type : r ? r.subType : n.determineSubType(t, e);
  return i
}

function ui(t, e) {
  if (e.dataIndexInside != null) return e.dataIndexInside;
  if (e.dataIndex != null) return et(e.dataIndex) ? ct(e.dataIndex, function (r) {
    return t.indexOfRawIndex(r)
  }) : t.indexOfRawIndex(e.dataIndex);
  if (e.name != null) return et(e.name) ? ct(e.name, function (r) {
    return t.indexOfName(r)
  }) : t.indexOfName(e.name)
}

function Kt() {
  var t = "__ec_inner_" + UD++;
  return function (e) {
    return e[t] || (e[t] = {})
  }
}
var UD = F_();

function tf(t, e, r) {
  var n = yv(e, r),
    i = n.mainTypeSpecified,
    a = n.queryOptionMap,
    o = n.others,
    s = o,
    l = r ? r.defaultMainType : null;
  return !i && l && a.set(l, {}), a.each(function (u, f) {
    var c = jo(t, f, u, {
      useDefault: l === f,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[f + "Models"] = c.models, s[f + "Model"] = c.models[0]
  }), s
}

function yv(t, e) {
  var r;
  if (nt(t)) {
    var n = {};
    n[t + "Index"] = 0, r = n
  } else r = t;
  var i = gt(),
    a = {},
    o = !1;
  return P(r, function (s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [],
      f = u[1],
      c = (u[2] || "").toLowerCase();
    if (!(!f || !c || e && e.includeMainTypes && Pt(e.includeMainTypes, f) < 0)) {
      o = o || !!f;
      var h = i.get(f) || i.set(f, {});
      h[c] = s
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: i,
    others: a
  }
}
var er = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};

function jo(t, e, r, n) {
  n = n || er;
  var i = r.index,
    a = r.id,
    o = r.name,
    s = {
      models: null,
      specified: i != null || a != null || o != null
    };
  if (!s.specified) {
    var l = void 0;
    return s.models = n.useDefault && (l = t.getComponent(e)) ? [l] : [], s
  }
  return i === "none" || i === !1 ? (Or(n.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (i === "all" && (Or(n.enableAll, '`"all"` is not a valid value on index option.'), i = a = o = null), s.models = t.queryComponents({
    mainType: e,
    index: i,
    id: a,
    name: o
  }), s)
}

function $_(t, e, r) {
  t.setAttribute ? t.setAttribute(e, r) : t[e] = r
}

function YD(t, e) {
  return t.getAttribute ? t.getAttribute(e) : t[e]
}

function XD(t) {
  return t === "auto" ? mt.domSupported ? "html" : "richText" : t || "html"
}

function qD(t, e, r, n, i) {
  var a = e == null || e === "auto";
  if (n == null) return n;
  if ($t(n)) {
    var o = Np(r || 0, n, i);
    return Yt(o, a ? Math.max(Ar(r || 0), Ar(n)) : e)
  } else {
    if (nt(n)) return i < 1 ? r : n;
    for (var s = [], l = r, u = n, f = Math.max(l ? l.length : 0, u.length), c = 0; c < f; ++c) {
      var h = t.getDimensionInfo(c);
      if (h && h.type === "ordinal") s[c] = (i < 1 && l ? l : u)[c];
      else {
        var v = l && l[c] ? l[c] : 0,
          d = u[c],
          o = Np(v, d, i);
        s[c] = Yt(o, a ? Math.max(Ar(v), Ar(d)) : e)
      }
    }
    return s
  }
}
var KD = ".",
  En = "___EC__COMPONENT__CONTAINER___",
  G_ = "___EC__EXTENDED_CLASS___";

function dr(t) {
  var e = {
    main: "",
    sub: ""
  };
  if (t) {
    var r = t.split(KD);
    e.main = r[0] || "", e.sub = r[1] || ""
  }
  return e
}

function ZD(t) {
  Or(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal')
}

function jD(t) {
  return !!(t && t[G_])
}

function mv(t, e) {
  t.$constructor = t, t.extend = function (r) {
    var n = this,
      i;
    return QD(n) ? i = function (a) {
      J(o, a);

      function o() {
        return a.apply(this, arguments) || this
      }
      return o
    }(n) : (i = function () {
      (r.$constructor || n).apply(this, arguments)
    }, QT(i, this)), q(i.prototype, r), i[G_] = !0, i.extend = this.extend, i.superCall = eA, i.superApply = rA, i.superClass = n, i
  }
}

function QD(t) {
  return dt(t) && /^class\s/.test(Function.prototype.toString.call(t))
}

function W_(t, e) {
  t.extend = e.extend
}
var JD = Math.round(Math.random() * 10);

function tA(t) {
  var e = ["__\0is_clz", JD++].join("_");
  t.prototype[e] = !0, t.isInstance = function (r) {
    return !!(r && r[e])
  }
}

function eA(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
  return this.superClass.prototype[e].apply(t, r)
}

function rA(t, e, r) {
  return this.superClass.prototype[e].apply(t, r)
}

function iu(t) {
  var e = {};
  t.registerClass = function (n) {
    var i = n.type || n.prototype.type;
    if (i) {
      ZD(i), n.prototype.type = i;
      var a = dr(i);
      if (!a.sub) e[a.main] = n;
      else if (a.sub !== En) {
        var o = r(a);
        o[a.sub] = n
      }
    }
    return n
  }, t.getClass = function (n, i, a) {
    var o = e[n];
    if (o && o[En] && (o = i ? o[i] : null), a && !o) throw new Error(i ? "Component " + n + "." + (i || "") + " is used but not imported." : n + ".type should be specified.");
    return o
  }, t.getClassesByMainType = function (n) {
    var i = dr(n),
      a = [],
      o = e[i.main];
    return o && o[En] ? P(o, function (s, l) {
      l !== En && a.push(s)
    }) : a.push(o), a
  }, t.hasClass = function (n) {
    var i = dr(n);
    return !!e[i.main]
  }, t.getAllClassMainTypes = function () {
    var n = [];
    return P(e, function (i, a) {
      n.push(a)
    }), n
  }, t.hasSubTypes = function (n) {
    var i = dr(n),
      a = e[i.main];
    return a && a[En]
  };

  function r(n) {
    var i = e[n.main];
    return (!i || !i[En]) && (i = e[n.main] = {}, i[En] = !0), i
  }
}

function Oo(t, e) {
  for (var r = 0; r < t.length; r++) t[r][1] || (t[r][1] = t[r][0]);
  return e = e || !1,
    function (n, i, a) {
      for (var o = {}, s = 0; s < t.length; s++) {
        var l = t[s][1];
        if (!(i && Pt(i, l) >= 0 || a && Pt(a, l) < 0)) {
          var u = n.getShallow(l, e);
          u != null && (o[t[s][0]] = u)
        }
      }
      return o
    }
}
var nA = [
    ["fill", "color"],
    ["shadowBlur"],
    ["shadowOffsetX"],
    ["shadowOffsetY"],
    ["opacity"],
    ["shadowColor"]
  ],
  iA = Oo(nA),
  aA = function () {
    function t() {}
    return t.prototype.getAreaStyle = function (e, r) {
      return iA(this, e, r)
    }, t
  }(),
  Nc = new Ko(50);

function oA(t) {
  if (typeof t == "string") {
    var e = Nc.get(t);
    return e && e.image
  } else return t
}

function U_(t, e, r, n, i) {
  if (t)
    if (typeof t == "string") {
      if (e && e.__zrImageSrc === t || !r) return e;
      var a = Nc.get(t),
        o = {
          hostEl: r,
          cb: n,
          cbPayload: i
        };
      if (a) e = a.image, !au(e) && a.pending.push(o);
      else {
        var s = di.loadImage(t, Hp, Hp);
        s.__zrImageSrc = t, Nc.put(t, s.__cachedImgObj = {
          image: s,
          pending: [o]
        })
      }
      return e
    } else return t;
  else return e
}

function Hp() {
  var t = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var e = 0; e < t.pending.length; e++) {
    var r = t.pending[e],
      n = r.cb;
    n && n(this, r.cbPayload), r.hostEl.dirty()
  }
  t.pending.length = 0
}

function au(t) {
  return t && t.width && t.height
}
var ef = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;

function sA(t, e, r, n, i) {
  if (!e) return "";
  var a = (t + "").split(`
`);
  i = Y_(e, r, n, i);
  for (var o = 0, s = a.length; o < s; o++) a[o] = X_(a[o], i);
  return a.join(`
`)
}

function Y_(t, e, r, n) {
  n = n || {};
  var i = q({}, n);
  i.font = e, r = Mt(r, "..."), i.maxIterations = Mt(n.maxIterations, 2);
  var a = i.minChar = Mt(n.minChar, 0);
  i.cnCharWidth = De("\u56FD", e);
  var o = i.ascCharWidth = De("a", e);
  i.placeholder = Mt(n.placeholder, "");
  for (var s = t = Math.max(0, t - 1), l = 0; l < a && s >= o; l++) s -= o;
  var u = De(r, e);
  return u > s && (r = "", u = 0), s = t - u, i.ellipsis = r, i.ellipsisWidth = u, i.contentWidth = s, i.containerWidth = t, i
}

function X_(t, e) {
  var r = e.containerWidth,
    n = e.font,
    i = e.contentWidth;
  if (!r) return "";
  var a = De(t, n);
  if (a <= r) return t;
  for (var o = 0;; o++) {
    if (a <= i || o >= e.maxIterations) {
      t += e.ellipsis;
      break
    }
    var s = o === 0 ? lA(t, i, e.ascCharWidth, e.cnCharWidth) : a > 0 ? Math.floor(t.length * i / a) : 0;
    t = t.substr(0, s), a = De(t, n)
  }
  return t === "" && (t = e.placeholder), t
}

function lA(t, e, r, n) {
  for (var i = 0, a = 0, o = t.length; a < o && i < e; a++) {
    var s = t.charCodeAt(a);
    i += 0 <= s && s <= 127 ? r : n
  }
  return a
}

function uA(t, e) {
  t != null && (t += "");
  var r = e.overflow,
    n = e.padding,
    i = e.font,
    a = r === "truncate",
    o = vv(i),
    s = Mt(e.lineHeight, o),
    l = !!e.backgroundColor,
    u = e.lineOverflow === "truncate",
    f = e.width,
    c;
  f != null && (r === "break" || r === "breakAll") ? c = t ? q_(t, e.font, f, r === "breakAll", 0).lines : [] : c = t ? t.split(`
`) : [];
  var h = c.length * s,
    v = Mt(e.height, h);
  if (h > v && u) {
    var d = Math.floor(v / s);
    c = c.slice(0, d)
  }
  if (t && a && f != null)
    for (var y = Y_(f, i, e.ellipsis, {
        minChar: e.truncateMinChar,
        placeholder: e.placeholder
      }), g = 0; g < c.length; g++) c[g] = X_(c[g], y);
  for (var p = v, m = 0, g = 0; g < c.length; g++) m = Math.max(De(c[g], i), m);
  f == null && (f = m);
  var _ = m;
  return n && (p += n[0] + n[2], _ += n[1] + n[3], f += n[1] + n[3]), l && (_ = f), {
    lines: c,
    height: v,
    outerWidth: _,
    outerHeight: p,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: m,
    contentHeight: h,
    width: f
  }
}
var fA = function () {
    function t() {}
    return t
  }(),
  Vp = function () {
    function t(e) {
      this.tokens = [], e && (this.tokens = e)
    }
    return t
  }(),
  cA = function () {
    function t() {
      this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = []
    }
    return t
  }();

function hA(t, e) {
  var r = new cA;
  if (t != null && (t += ""), !t) return r;
  for (var n = e.width, i = e.height, a = e.overflow, o = (a === "break" || a === "breakAll") && n != null ? {
      width: n,
      accumWidth: 0,
      breakAll: a === "breakAll"
    } : null, s = ef.lastIndex = 0, l;
    (l = ef.exec(t)) != null;) {
    var u = l.index;
    u > s && rf(r, t.substring(s, u), e, o), rf(r, l[2], e, o, l[1]), s = ef.lastIndex
  }
  s < t.length && rf(r, t.substring(s, t.length), e, o);
  var f = [],
    c = 0,
    h = 0,
    v = e.padding,
    d = a === "truncate",
    y = e.lineOverflow === "truncate";

  function g(G, Z, lt) {
    G.width = Z, G.lineHeight = lt, c += lt, h = Math.max(h, Z)
  }
  t: for (var p = 0; p < r.lines.length; p++) {
    for (var m = r.lines[p], _ = 0, w = 0, b = 0; b < m.tokens.length; b++) {
      var S = m.tokens[b],
        x = S.styleName && e.rich[S.styleName] || {},
        T = S.textPadding = x.padding,
        M = T ? T[1] + T[3] : 0,
        D = S.font = x.font || e.font;
      S.contentHeight = vv(D);
      var I = Mt(x.height, S.contentHeight);
      if (S.innerHeight = I, T && (I += T[0] + T[2]), S.height = I, S.lineHeight = Zs(x.lineHeight, e.lineHeight, I), S.align = x && x.align || e.align, S.verticalAlign = x && x.verticalAlign || "middle", y && i != null && c + S.lineHeight > i) {
        b > 0 ? (m.tokens = m.tokens.slice(0, b), g(m, w, _), r.lines = r.lines.slice(0, p + 1)) : r.lines = r.lines.slice(0, p);
        break t
      }
      var A = x.width,
        L = A == null || A === "auto";
      if (typeof A == "string" && A.charAt(A.length - 1) === "%") S.percentWidth = A, f.push(S), S.contentWidth = De(S.text, D);
      else {
        if (L) {
          var O = x.backgroundColor,
            H = O && O.image;
          H && (H = oA(H), au(H) && (S.width = Math.max(S.width, H.width * I / H.height)))
        }
        var B = d && n != null ? n - w : null;
        B != null && B < S.width ? !L || B < M ? (S.text = "", S.width = S.contentWidth = 0) : (S.text = sA(S.text, B - M, D, e.ellipsis, {
          minChar: e.truncateMinChar
        }), S.width = S.contentWidth = De(S.text, D)) : S.contentWidth = De(S.text, D)
      }
      S.width += M, w += S.width, x && (_ = Math.max(_, S.lineHeight))
    }
    g(m, w, _)
  }
  r.outerWidth = r.width = Mt(n, h), r.outerHeight = r.height = Mt(i, c), r.contentHeight = c, r.contentWidth = h, v && (r.outerWidth += v[1] + v[3], r.outerHeight += v[0] + v[2]);
  for (var p = 0; p < f.length; p++) {
    var S = f[p],
      Q = S.percentWidth;
    S.width = parseInt(Q, 10) / 100 * r.width
  }
  return r
}

function rf(t, e, r, n, i) {
  var a = e === "",
    o = i && r.rich[i] || {},
    s = t.lines,
    l = o.font || r.font,
    u = !1,
    f, c;
  if (n) {
    var h = o.padding,
      v = h ? h[1] + h[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = li(o.width, n.width) + v;
      s.length > 0 && d + n.accumWidth > n.width && (f = e.split(`
`), u = !0), n.accumWidth = d
    } else {
      var y = q_(e, l, n.width, n.breakAll, n.accumWidth);
      n.accumWidth = y.accumWidth + v, c = y.linesWidths, f = y.lines
    }
  } else f = e.split(`
`);
  for (var g = 0; g < f.length; g++) {
    var p = f[g],
      m = new fA;
    if (m.styleName = i, m.text = p, m.isLineHolder = !p && !a, typeof o.width == "number" ? m.width = o.width : m.width = c ? c[g] : De(p, l), !g && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Vp)).tokens,
        w = _.length;
      w === 1 && _[0].isLineHolder ? _[0] = m : (p || !w || a) && _.push(m)
    } else s.push(new Vp([m]))
  }
}

function vA(t) {
  var e = t.charCodeAt(0);
  return e >= 33 && e <= 383
}
var dA = ga(",&?/;] ".split(""), function (t, e) {
  return t[e] = !0, t
}, {});

function pA(t) {
  return vA(t) ? !!dA[t] : !0
}

function q_(t, e, r, n, i) {
  for (var a = [], o = [], s = "", l = "", u = 0, f = 0, c = 0; c < t.length; c++) {
    var h = t.charAt(c);
    if (h === `
`) {
      l && (s += l, f += u), a.push(s), o.push(f), s = "", l = "", u = 0, f = 0;
      continue
    }
    var v = De(h, e),
      d = n ? !1 : !pA(h);
    if (a.length ? f + v > r : i + f + v > r) {
      f ? (s || l) && (d ? (s || (s = l, l = "", u = 0, f = u), a.push(s), o.push(f - u), l += h, u += v, s = "", f = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(f), s = h, f = v)) : d ? (a.push(l), o.push(u), l = h, u = v) : (a.push(h), o.push(v));
      continue
    }
    f += v, d ? (l += h, u += v) : (l && (s += l, l = "", u = 0), s += h)
  }
  return !a.length && !s && (s = t, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(f)), a.length === 1 && (f += i), {
    accumWidth: f,
    lines: a,
    linesWidths: o
  }
}
var Fc = "__zr_style_" + Math.round(Math.random() * 10),
  ri = {
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "#000",
    opacity: 1,
    blend: "source-over"
  },
  ou = {
    style: {
      shadowBlur: !0,
      shadowOffsetX: !0,
      shadowOffsetY: !0,
      shadowColor: !0,
      opacity: !0
    }
  };
ri[Fc] = !0;
var $p = ["z", "z2", "invisible"],
  gA = ["invisible"],
  yA = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype._init = function (r) {
      for (var n = Vt(r), i = 0; i < n.length; i++) {
        var a = n[i];
        a === "style" ? this.useStyle(r[a]) : t.prototype.attrKV.call(this, a, r[a])
      }
      this.style || this.useStyle({})
    }, e.prototype.beforeBrush = function () {}, e.prototype.afterBrush = function () {}, e.prototype.innerBeforeBrush = function () {}, e.prototype.innerAfterBrush = function () {}, e.prototype.shouldBePainted = function (r, n, i, a) {
      var o = this.transform;
      if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && mA(this, r, n) || o && !o[0] && !o[3]) return !1;
      if (i && this.__clipPaths) {
        for (var s = 0; s < this.__clipPaths.length; ++s)
          if (this.__clipPaths[s].isZeroArea()) return !1
      }
      if (a && this.parent)
        for (var l = this.parent; l;) {
          if (l.ignore) return !1;
          l = l.parent
        }
      return !0
    }, e.prototype.contain = function (r, n) {
      return this.rectContain(r, n)
    }, e.prototype.traverse = function (r, n) {
      r.call(n, this)
    }, e.prototype.rectContain = function (r, n) {
      var i = this.transformCoordToLocal(r, n),
        a = this.getBoundingRect();
      return a.contain(i[0], i[1])
    }, e.prototype.getPaintRect = function () {
      var r = this._paintRect;
      if (!this._paintRect || this.__dirty) {
        var n = this.transform,
          i = this.getBoundingRect(),
          a = this.style,
          o = a.shadowBlur || 0,
          s = a.shadowOffsetX || 0,
          l = a.shadowOffsetY || 0;
        r = this._paintRect || (this._paintRect = new Ot(0, 0, 0, 0)), n ? Ot.applyTransform(r, i, n) : r.copy(i), (o || s || l) && (r.width += o * 2 + Math.abs(s), r.height += o * 2 + Math.abs(l), r.x = Math.min(r.x, r.x + s - o), r.y = Math.min(r.y, r.y + l - o));
        var u = this.dirtyRectTolerance;
        r.isZero() || (r.x = Math.floor(r.x - u), r.y = Math.floor(r.y - u), r.width = Math.ceil(r.width + 1 + u * 2), r.height = Math.ceil(r.height + 1 + u * 2))
      }
      return r
    }, e.prototype.setPrevPaintRect = function (r) {
      r ? (this._prevPaintRect = this._prevPaintRect || new Ot(0, 0, 0, 0), this._prevPaintRect.copy(r)) : this._prevPaintRect = null
    }, e.prototype.getPrevPaintRect = function () {
      return this._prevPaintRect
    }, e.prototype.animateStyle = function (r) {
      return this.animate("style", r)
    }, e.prototype.updateDuringAnimation = function (r) {
      r === "style" ? this.dirtyStyle() : this.markRedraw()
    }, e.prototype.attrKV = function (r, n) {
      r !== "style" ? t.prototype.attrKV.call(this, r, n) : this.style ? this.setStyle(n) : this.useStyle(n)
    }, e.prototype.setStyle = function (r, n) {
      return typeof r == "string" ? this.style[r] = n : q(this.style, r), this.dirtyStyle(), this
    }, e.prototype.dirtyStyle = function (r) {
      r || this.markRedraw(), this.__dirty |= Xa, this._rect && (this._rect = null)
    }, e.prototype.dirty = function () {
      this.dirtyStyle()
    }, e.prototype.styleChanged = function () {
      return !!(this.__dirty & Xa)
    }, e.prototype.styleUpdated = function () {
      this.__dirty &= ~Xa
    }, e.prototype.createStyle = function (r) {
      return ru(ri, r)
    }, e.prototype.useStyle = function (r) {
      r[Fc] || (r = this.createStyle(r)), this.__inHover ? this.__hoverStyle = r : this.style = r, this.dirtyStyle()
    }, e.prototype.isStyleObject = function (r) {
      return r[Fc]
    }, e.prototype._innerSaveToNormal = function (r) {
      t.prototype._innerSaveToNormal.call(this, r);
      var n = this._normalState;
      r.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, n, $p)
    }, e.prototype._applyStateObj = function (r, n, i, a, o, s) {
      t.prototype._applyStateObj.call(this, r, n, i, a, o, s);
      var l = !(n && a),
        u;
      if (n && n.style ? o ? a ? u = n.style : (u = this._mergeStyle(this.createStyle(), i.style), this._mergeStyle(u, n.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : i.style), this._mergeStyle(u, n.style)) : l && (u = i.style), u)
        if (o) {
          var f = this.style;
          if (this.style = this.createStyle(l ? {} : f), l)
            for (var c = Vt(f), h = 0; h < c.length; h++) {
              var v = c[h];
              v in u && (u[v] = u[v], this.style[v] = f[v])
            }
          for (var d = Vt(u), h = 0; h < d.length; h++) {
            var v = d[h];
            this.style[v] = this.style[v]
          }
          this._transitionState(r, {
            style: u
          }, s, this.getAnimationStyleProps())
        } else this.useStyle(u);
      for (var y = this.__inHover ? gA : $p, h = 0; h < y.length; h++) {
        var v = y[h];
        n && n[v] != null ? this[v] = n[v] : l && i[v] != null && (this[v] = i[v])
      }
    }, e.prototype._mergeStates = function (r) {
      for (var n = t.prototype._mergeStates.call(this, r), i, a = 0; a < r.length; a++) {
        var o = r[a];
        o.style && (i = i || {}, this._mergeStyle(i, o.style))
      }
      return i && (n.style = i), n
    }, e.prototype._mergeStyle = function (r, n) {
      return q(r, n), r
    }, e.prototype.getAnimationStyleProps = function () {
      return ou
    }, e.initDefaultProps = function () {
      var r = e.prototype;
      r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = !1, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = Te | Xa
    }(), e
  }(L_),
  nf = new Ot(0, 0, 0, 0),
  af = new Ot(0, 0, 0, 0);

function mA(t, e, r) {
  return nf.copy(t.getBoundingRect()), t.transform && nf.applyTransform(t.transform), af.width = e, af.height = r, !nf.intersect(af)
}
var Qo = yA,
  Ve = Math.min,
  $e = Math.max,
  of = Math.sin,
  sf = Math.cos,
  Ln = Math.PI * 2,
  ys = ya(),
  ms = ya(),
  _s = ya();

function Gp(t, e, r, n, i, a) {
  i[0] = Ve(t, r), i[1] = Ve(e, n), a[0] = $e(t, r), a[1] = $e(e, n)
}
var Wp = [],
  Up = [];

function _A(t, e, r, n, i, a, o, s, l, u) {
  var f = b_,
    c = Xt,
    h = f(t, r, i, o, Wp);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var v = 0; v < h; v++) {
    var d = c(t, r, i, o, Wp[v]);
    l[0] = Ve(d, l[0]), u[0] = $e(d, u[0])
  }
  h = f(e, n, a, s, Up);
  for (var v = 0; v < h; v++) {
    var y = c(e, n, a, s, Up[v]);
    l[1] = Ve(y, l[1]), u[1] = $e(y, u[1])
  }
  l[0] = Ve(t, l[0]), u[0] = $e(t, u[0]), l[0] = Ve(o, l[0]), u[0] = $e(o, u[0]), l[1] = Ve(e, l[1]), u[1] = $e(e, u[1]), l[1] = Ve(s, l[1]), u[1] = $e(s, u[1])
}

function wA(t, e, r, n, i, a, o, s) {
  var l = x_,
    u = re,
    f = $e(Ve(l(t, r, i), 1), 0),
    c = $e(Ve(l(e, n, a), 1), 0),
    h = u(t, r, i, f),
    v = u(e, n, a, c);
  o[0] = Ve(t, i, h), o[1] = Ve(e, a, v), s[0] = $e(t, i, h), s[1] = $e(e, a, v)
}

function SA(t, e, r, n, i, a, o, s, l) {
  var u = Vi,
    f = $i,
    c = Math.abs(i - a);
  if (c % Ln < 1e-4 && c > 1e-4) {
    s[0] = t - r, s[1] = e - n, l[0] = t + r, l[1] = e + n;
    return
  }
  if (ys[0] = sf(i) * r + t, ys[1] = of (i) * n + e, ms[0] = sf(a) * r + t, ms[1] = of (a) * n + e, u(s, ys, ms), f(l, ys, ms), i = i % Ln, i < 0 && (i = i + Ln), a = a % Ln, a < 0 && (a = a + Ln), i > a && !o ? a += Ln : i < a && o && (i += Ln), o) {
    var h = a;
    a = i, i = h
  }
  for (var v = 0; v < a; v += Math.PI / 2) v > i && (_s[0] = sf(v) * r + t, _s[1] = of (v) * n + e, u(s, _s, s), f(l, _s, l))
}
var Ct = {
    M: 1,
    L: 2,
    C: 3,
    Q: 4,
    A: 5,
    Z: 6,
    R: 7
  },
  Rn = [],
  On = [],
  or = [],
  Yr = [],
  sr = [],
  lr = [],
  lf = Math.min,
  uf = Math.max,
  kn = Math.cos,
  Bn = Math.sin,
  Sr = Math.abs,
  zc = Math.PI,
  en = zc * 2,
  ff = typeof Float32Array != "undefined",
  Ia = [];

function cf(t) {
  var e = Math.round(t / zc * 1e8) / 1e8;
  return e % 2 * zc
}

function bA(t, e) {
  var r = cf(t[0]);
  r < 0 && (r += en);
  var n = r - t[0],
    i = t[1];
  i += n, !e && i - r >= en ? i = r + en : e && r - i >= en ? i = r - en : !e && r > i ? i = r + (en - cf(r - i)) : e && r < i && (i = r - (en - cf(i - r))), t[0] = r, t[1] = i
}
var xA = function () {
    function t(e) {
      this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, e && (this._saveData = !1), this._saveData && (this.data = [])
    }
    return t.prototype.increaseVersion = function () {
      this._version++
    }, t.prototype.getVersion = function () {
      return this._version
    }, t.prototype.setScale = function (e, r, n) {
      n = n || 0, n > 0 && (this._ux = Sr(n / Ml / e) || 0, this._uy = Sr(n / Ml / r) || 0)
    }, t.prototype.setDPR = function (e) {
      this.dpr = e
    }, t.prototype.setContext = function (e) {
      this._ctx = e
    }, t.prototype.getContext = function () {
      return this._ctx
    }, t.prototype.beginPath = function () {
      return this._ctx && this._ctx.beginPath(), this.reset(), this
    }, t.prototype.reset = function () {
      this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++
    }, t.prototype.moveTo = function (e, r) {
      return this._drawPendingPt(), this.addData(Ct.M, e, r), this._ctx && this._ctx.moveTo(e, r), this._x0 = e, this._y0 = r, this._xi = e, this._yi = r, this
    }, t.prototype.lineTo = function (e, r) {
      var n = Sr(e - this._xi),
        i = Sr(r - this._yi),
        a = n > this._ux || i > this._uy;
      if (this.addData(Ct.L, e, r), this._ctx && a && this._ctx.lineTo(e, r), a) this._xi = e, this._yi = r, this._pendingPtDist = 0;
      else {
        var o = n * n + i * i;
        o > this._pendingPtDist && (this._pendingPtX = e, this._pendingPtY = r, this._pendingPtDist = o)
      }
      return this
    }, t.prototype.bezierCurveTo = function (e, r, n, i, a, o) {
      return this._drawPendingPt(), this.addData(Ct.C, e, r, n, i, a, o), this._ctx && this._ctx.bezierCurveTo(e, r, n, i, a, o), this._xi = a, this._yi = o, this
    }, t.prototype.quadraticCurveTo = function (e, r, n, i) {
      return this._drawPendingPt(), this.addData(Ct.Q, e, r, n, i), this._ctx && this._ctx.quadraticCurveTo(e, r, n, i), this._xi = n, this._yi = i, this
    }, t.prototype.arc = function (e, r, n, i, a, o) {
      this._drawPendingPt(), Ia[0] = i, Ia[1] = a, bA(Ia, o), i = Ia[0], a = Ia[1];
      var s = a - i;
      return this.addData(Ct.A, e, r, n, n, i, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(e, r, n, i, a, o), this._xi = kn(a) * n + e, this._yi = Bn(a) * n + r, this
    }, t.prototype.arcTo = function (e, r, n, i, a) {
      return this._drawPendingPt(), this._ctx && this._ctx.arcTo(e, r, n, i, a), this
    }, t.prototype.rect = function (e, r, n, i) {
      return this._drawPendingPt(), this._ctx && this._ctx.rect(e, r, n, i), this.addData(Ct.R, e, r, n, i), this
    }, t.prototype.closePath = function () {
      this._drawPendingPt(), this.addData(Ct.Z);
      var e = this._ctx,
        r = this._x0,
        n = this._y0;
      return e && e.closePath(), this._xi = r, this._yi = n, this
    }, t.prototype.fill = function (e) {
      e && e.fill(), this.toStatic()
    }, t.prototype.stroke = function (e) {
      e && e.stroke(), this.toStatic()
    }, t.prototype.len = function () {
      return this._len
    }, t.prototype.setData = function (e) {
      var r = e.length;
      !(this.data && this.data.length === r) && ff && (this.data = new Float32Array(r));
      for (var n = 0; n < r; n++) this.data[n] = e[n];
      this._len = r
    }, t.prototype.appendPath = function (e) {
      e instanceof Array || (e = [e]);
      for (var r = e.length, n = 0, i = this._len, a = 0; a < r; a++) n += e[a].len();
      ff && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
      for (var a = 0; a < r; a++)
        for (var o = e[a].data, s = 0; s < o.length; s++) this.data[i++] = o[s];
      this._len = i
    }, t.prototype.addData = function (e, r, n, i, a, o, s, l, u) {
      if (!!this._saveData) {
        var f = this.data;
        this._len + arguments.length > f.length && (this._expandData(), f = this.data);
        for (var c = 0; c < arguments.length; c++) f[this._len++] = arguments[c]
      }
    }, t.prototype._drawPendingPt = function () {
      this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0)
    }, t.prototype._expandData = function () {
      if (!(this.data instanceof Array)) {
        for (var e = [], r = 0; r < this._len; r++) e[r] = this.data[r];
        this.data = e
      }
    }, t.prototype.toStatic = function () {
      if (!!this._saveData) {
        this._drawPendingPt();
        var e = this.data;
        e instanceof Array && (e.length = this._len, ff && this._len > 11 && (this.data = new Float32Array(e)))
      }
    }, t.prototype.getBoundingRect = function () {
      or[0] = or[1] = sr[0] = sr[1] = Number.MAX_VALUE, Yr[0] = Yr[1] = lr[0] = lr[1] = -Number.MAX_VALUE;
      var e = this.data,
        r = 0,
        n = 0,
        i = 0,
        a = 0,
        o;
      for (o = 0; o < this._len;) {
        var s = e[o++],
          l = o === 1;
        switch (l && (r = e[o], n = e[o + 1], i = r, a = n), s) {
          case Ct.M:
            r = i = e[o++], n = a = e[o++], sr[0] = i, sr[1] = a, lr[0] = i, lr[1] = a;
            break;
          case Ct.L:
            Gp(r, n, e[o], e[o + 1], sr, lr), r = e[o++], n = e[o++];
            break;
          case Ct.C:
            _A(r, n, e[o++], e[o++], e[o++], e[o++], e[o], e[o + 1], sr, lr), r = e[o++], n = e[o++];
            break;
          case Ct.Q:
            wA(r, n, e[o++], e[o++], e[o], e[o + 1], sr, lr), r = e[o++], n = e[o++];
            break;
          case Ct.A:
            var u = e[o++],
              f = e[o++],
              c = e[o++],
              h = e[o++],
              v = e[o++],
              d = e[o++] + v;
            o += 1;
            var y = !e[o++];
            l && (i = kn(v) * c + u, a = Bn(v) * h + f), SA(u, f, c, h, v, d, y, sr, lr), r = kn(d) * c + u, n = Bn(d) * h + f;
            break;
          case Ct.R:
            i = r = e[o++], a = n = e[o++];
            var g = e[o++],
              p = e[o++];
            Gp(i, a, i + g, a + p, sr, lr);
            break;
          case Ct.Z:
            r = i, n = a;
            break
        }
        Vi(or, or, sr), $i(Yr, Yr, lr)
      }
      return o === 0 && (or[0] = or[1] = Yr[0] = Yr[1] = 0), new Ot(or[0], or[1], Yr[0] - or[0], Yr[1] - or[1])
    }, t.prototype._calculateLength = function () {
      var e = this.data,
        r = this._len,
        n = this._ux,
        i = this._uy,
        a = 0,
        o = 0,
        s = 0,
        l = 0;
      this._pathSegLen || (this._pathSegLen = []);
      for (var u = this._pathSegLen, f = 0, c = 0, h = 0; h < r;) {
        var v = e[h++],
          d = h === 1;
        d && (a = e[h], o = e[h + 1], s = a, l = o);
        var y = -1;
        switch (v) {
          case Ct.M:
            a = s = e[h++], o = l = e[h++];
            break;
          case Ct.L: {
            var g = e[h++],
              p = e[h++],
              m = g - a,
              _ = p - o;
            (Sr(m) > n || Sr(_) > i || h === r - 1) && (y = Math.sqrt(m * m + _ * _), a = g, o = p);
            break
          }
          case Ct.C: {
            var w = e[h++],
              b = e[h++],
              g = e[h++],
              p = e[h++],
              S = e[h++],
              x = e[h++];
            y = NM(a, o, w, b, g, p, S, x, 10), a = S, o = x;
            break
          }
          case Ct.Q: {
            var w = e[h++],
              b = e[h++],
              g = e[h++],
              p = e[h++];
            y = HM(a, o, w, b, g, p, 10), a = g, o = p;
            break
          }
          case Ct.A:
            var T = e[h++],
              M = e[h++],
              D = e[h++],
              I = e[h++],
              A = e[h++],
              L = e[h++],
              O = L + A;
            h += 1, e[h++], d && (s = kn(A) * D + T, l = Bn(A) * I + M), y = uf(D, I) * lf(en, Math.abs(L)), a = kn(O) * D + T, o = Bn(O) * I + M;
            break;
          case Ct.R: {
            s = a = e[h++], l = o = e[h++];
            var H = e[h++],
              B = e[h++];
            y = H * 2 + B * 2;
            break
          }
          case Ct.Z: {
            var m = s - a,
              _ = l - o;
            y = Math.sqrt(m * m + _ * _), a = s, o = l;
            break
          }
        }
        y >= 0 && (u[c++] = y, f += y)
      }
      return this._pathLen = f, f
    }, t.prototype.rebuildPath = function (e, r) {
      var n = this.data,
        i = this._ux,
        a = this._uy,
        o = this._len,
        s, l, u, f, c, h, v = r < 1,
        d, y, g = 0,
        p = 0,
        m, _ = 0,
        w, b;
      if (v && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, y = this._pathLen, m = r * y, !m)) return;
      t: for (var S = 0; S < o;) {
        var x = n[S++],
          T = S === 1;
        switch (T && (u = n[S], f = n[S + 1], s = u, l = f), x !== Ct.L && _ > 0 && (e.lineTo(w, b), _ = 0), x) {
          case Ct.M:
            s = u = n[S++], l = f = n[S++], e.moveTo(u, f);
            break;
          case Ct.L: {
            c = n[S++], h = n[S++];
            var M = Sr(c - u),
              D = Sr(h - f);
            if (M > i || D > a) {
              if (v) {
                var I = d[p++];
                if (g + I > m) {
                  var A = (m - g) / I;
                  e.lineTo(u * (1 - A) + c * A, f * (1 - A) + h * A);
                  break t
                }
                g += I
              }
              e.lineTo(c, h), u = c, f = h, _ = 0
            } else {
              var L = M * M + D * D;
              L > _ && (w = c, b = h, _ = L)
            }
            break
          }
          case Ct.C: {
            var O = n[S++],
              H = n[S++],
              B = n[S++],
              Q = n[S++],
              G = n[S++],
              Z = n[S++];
            if (v) {
              var I = d[p++];
              if (g + I > m) {
                var A = (m - g) / I;
                bl(u, O, B, G, A, Rn), bl(f, H, Q, Z, A, On), e.bezierCurveTo(Rn[1], On[1], Rn[2], On[2], Rn[3], On[3]);
                break t
              }
              g += I
            }
            e.bezierCurveTo(O, H, B, Q, G, Z), u = G, f = Z;
            break
          }
          case Ct.Q: {
            var O = n[S++],
              H = n[S++],
              B = n[S++],
              Q = n[S++];
            if (v) {
              var I = d[p++];
              if (g + I > m) {
                var A = (m - g) / I;
                xl(u, O, B, A, Rn), xl(f, H, Q, A, On), e.quadraticCurveTo(Rn[1], On[1], Rn[2], On[2]);
                break t
              }
              g += I
            }
            e.quadraticCurveTo(O, H, B, Q), u = B, f = Q;
            break
          }
          case Ct.A:
            var lt = n[S++],
              _t = n[S++],
              yt = n[S++],
              pt = n[S++],
              At = n[S++],
              k = n[S++],
              W = n[S++],
              V = !n[S++],
              tt = yt > pt ? yt : pt,
              vt = Sr(yt - pt) > .001,
              ut = At + k,
              Y = !1;
            if (v) {
              var I = d[p++];
              g + I > m && (ut = At + k * (m - g) / I, Y = !0), g += I
            }
            if (vt && e.ellipse ? e.ellipse(lt, _t, yt, pt, W, At, ut, V) : e.arc(lt, _t, tt, At, ut, V), Y) break t;
            T && (s = kn(At) * yt + lt, l = Bn(At) * pt + _t), u = kn(ut) * yt + lt, f = Bn(ut) * pt + _t;
            break;
          case Ct.R:
            s = u = n[S], l = f = n[S + 1], c = n[S++], h = n[S++];
            var K = n[S++],
              C = n[S++];
            if (v) {
              var I = d[p++];
              if (g + I > m) {
                var E = m - g;
                e.moveTo(c, h), e.lineTo(c + lf(E, K), h), E -= K, E > 0 && e.lineTo(c + K, h + lf(E, C)), E -= C, E > 0 && e.lineTo(c + uf(K - E, 0), h + C), E -= K, E > 0 && e.lineTo(c, h + uf(C - E, 0));
                break t
              }
              g += I
            }
            e.rect(c, h, K, C);
            break;
          case Ct.Z:
            if (v) {
              var I = d[p++];
              if (g + I > m) {
                var A = (m - g) / I;
                e.lineTo(u * (1 - A) + s * A, f * (1 - A) + l * A);
                break t
              }
              g += I
            }
            e.closePath(), u = s, f = l
        }
      }
    }, t.prototype.clone = function () {
      var e = new t,
        r = this.data;
      return e.data = r.slice ? r.slice() : Array.prototype.slice.call(r), e._len = this._len, e
    }, t.CMD = Ct, t.initDefaultProps = function () {
      var e = t.prototype;
      e._saveData = !0, e._ux = 0, e._uy = 0, e._pendingPtDist = 0, e._version = 0
    }(), t
  }(),
  fi = xA;

function Mi(t, e, r, n, i, a, o) {
  if (i === 0) return !1;
  var s = i,
    l = 0,
    u = t;
  if (o > e + s && o > n + s || o < e - s && o < n - s || a > t + s && a > r + s || a < t - s && a < r - s) return !1;
  if (t !== r) l = (e - n) / (t - r), u = (t * n - r * e) / (t - r);
  else return Math.abs(a - t) <= s / 2;
  var f = l * a - o + u,
    c = f * f / (l * l + 1);
  return c <= s / 2 * s / 2
}

function CA(t, e, r, n, i, a, o, s, l, u, f) {
  if (l === 0) return !1;
  var c = l;
  if (f > e + c && f > n + c && f > a + c && f > s + c || f < e - c && f < n - c && f < a - c && f < s - c || u > t + c && u > r + c && u > i + c && u > o + c || u < t - c && u < r - c && u < i - c && u < o - c) return !1;
  var h = BM(t, e, r, n, i, a, o, s, u, f, null);
  return h <= c / 2
}

function TA(t, e, r, n, i, a, o, s, l) {
  if (o === 0) return !1;
  var u = o;
  if (l > e + u && l > n + u && l > a + u || l < e - u && l < n - u && l < a - u || s > t + u && s > r + u && s > i + u || s < t - u && s < r - u && s < i - u) return !1;
  var f = zM(t, e, r, n, i, a, s, l, null);
  return f <= u / 2
}
var Yp = Math.PI * 2;

function ws(t) {
  return t %= Yp, t < 0 && (t += Yp), t
}
var Ea = Math.PI * 2;

function MA(t, e, r, n, i, a, o, s, l) {
  if (o === 0) return !1;
  var u = o;
  s -= t, l -= e;
  var f = Math.sqrt(s * s + l * l);
  if (f - u > r || f + u < r) return !1;
  if (Math.abs(n - i) % Ea < 1e-4) return !0;
  if (a) {
    var c = n;
    n = ws(i), i = ws(c)
  } else n = ws(n), i = ws(i);
  n > i && (i += Ea);
  var h = Math.atan2(l, s);
  return h < 0 && (h += Ea), h >= n && h <= i || h + Ea >= n && h + Ea <= i
}

function Nn(t, e, r, n, i, a) {
  if (a > e && a > n || a < e && a < n || n === e) return 0;
  var o = (a - e) / (n - e),
    s = n < e ? 1 : -1;
  (o === 1 || o === 0) && (s = n < e ? .5 : -.5);
  var l = o * (r - t) + t;
  return l === i ? 1 / 0 : l > i ? s : 0
}
var Xr = fi.CMD,
  Fn = Math.PI * 2,
  DA = 1e-4;

function AA(t, e) {
  return Math.abs(t - e) < DA
}
var le = [-1, -1, -1],
  Fe = [-1, -1];

function PA() {
  var t = Fe[0];
  Fe[0] = Fe[1], Fe[1] = t
}

function IA(t, e, r, n, i, a, o, s, l, u) {
  if (u > e && u > n && u > a && u > s || u < e && u < n && u < a && u < s) return 0;
  var f = Sl(e, n, a, s, u, le);
  if (f === 0) return 0;
  for (var c = 0, h = -1, v = void 0, d = void 0, y = 0; y < f; y++) {
    var g = le[y],
      p = g === 0 || g === 1 ? .5 : 1,
      m = Xt(t, r, i, o, g);
    m < l || (h < 0 && (h = b_(e, n, a, s, Fe), Fe[1] < Fe[0] && h > 1 && PA(), v = Xt(e, n, a, s, Fe[0]), h > 1 && (d = Xt(e, n, a, s, Fe[1]))), h === 2 ? g < Fe[0] ? c += v < e ? p : -p : g < Fe[1] ? c += d < v ? p : -p : c += s < d ? p : -p : g < Fe[0] ? c += v < e ? p : -p : c += s < v ? p : -p)
  }
  return c
}

function EA(t, e, r, n, i, a, o, s) {
  if (s > e && s > n && s > a || s < e && s < n && s < a) return 0;
  var l = FM(e, n, a, s, le);
  if (l === 0) return 0;
  var u = x_(e, n, a);
  if (u >= 0 && u <= 1) {
    for (var f = 0, c = re(e, n, a, u), h = 0; h < l; h++) {
      var v = le[h] === 0 || le[h] === 1 ? .5 : 1,
        d = re(t, r, i, le[h]);
      d < o || (le[h] < u ? f += c < e ? v : -v : f += a < c ? v : -v)
    }
    return f
  } else {
    var v = le[0] === 0 || le[0] === 1 ? .5 : 1,
      d = re(t, r, i, le[0]);
    return d < o ? 0 : a < e ? v : -v
  }
}

function LA(t, e, r, n, i, a, o, s) {
  if (s -= e, s > r || s < -r) return 0;
  var l = Math.sqrt(r * r - s * s);
  le[0] = -l, le[1] = l;
  var u = Math.abs(n - i);
  if (u < 1e-4) return 0;
  if (u >= Fn - 1e-4) {
    n = 0, i = Fn;
    var f = a ? 1 : -1;
    return o >= le[0] + t && o <= le[1] + t ? f : 0
  }
  if (n > i) {
    var c = n;
    n = i, i = c
  }
  n < 0 && (n += Fn, i += Fn);
  for (var h = 0, v = 0; v < 2; v++) {
    var d = le[v];
    if (d + t > o) {
      var y = Math.atan2(s, d),
        f = a ? 1 : -1;
      y < 0 && (y = Fn + y), (y >= n && y <= i || y + Fn >= n && y + Fn <= i) && (y > Math.PI / 2 && y < Math.PI * 1.5 && (f = -f), h += f)
    }
  }
  return h
}

function K_(t, e, r, n, i) {
  for (var a = t.data, o = t.len(), s = 0, l = 0, u = 0, f = 0, c = 0, h, v, d = 0; d < o;) {
    var y = a[d++],
      g = d === 1;
    switch (y === Xr.M && d > 1 && (r || (s += Nn(l, u, f, c, n, i))), g && (l = a[d], u = a[d + 1], f = l, c = u), y) {
      case Xr.M:
        f = a[d++], c = a[d++], l = f, u = c;
        break;
      case Xr.L:
        if (r) {
          if (Mi(l, u, a[d], a[d + 1], e, n, i)) return !0
        } else s += Nn(l, u, a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Xr.C:
        if (r) {
          if (CA(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], e, n, i)) return !0
        } else s += IA(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Xr.Q:
        if (r) {
          if (TA(l, u, a[d++], a[d++], a[d], a[d + 1], e, n, i)) return !0
        } else s += EA(l, u, a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Xr.A:
        var p = a[d++],
          m = a[d++],
          _ = a[d++],
          w = a[d++],
          b = a[d++],
          S = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        h = Math.cos(b) * _ + p, v = Math.sin(b) * w + m, g ? (f = h, c = v) : s += Nn(l, u, h, v, n, i);
        var T = (n - p) * w / _ + p;
        if (r) {
          if (MA(p, m, w, b, b + S, x, e, T, i)) return !0
        } else s += LA(p, m, w, b, b + S, x, T, i);
        l = Math.cos(b + S) * _ + p, u = Math.sin(b + S) * w + m;
        break;
      case Xr.R:
        f = l = a[d++], c = u = a[d++];
        var M = a[d++],
          D = a[d++];
        if (h = f + M, v = c + D, r) {
          if (Mi(f, c, h, c, e, n, i) || Mi(h, c, h, v, e, n, i) || Mi(h, v, f, v, e, n, i) || Mi(f, v, f, c, e, n, i)) return !0
        } else s += Nn(h, c, h, v, n, i), s += Nn(f, v, f, c, n, i);
        break;
      case Xr.Z:
        if (r) {
          if (Mi(l, u, f, c, e, n, i)) return !0
        } else s += Nn(l, u, f, c, n, i);
        l = f, u = c;
        break
    }
  }
  return !r && !AA(u, c) && (s += Nn(l, u, f, c, n, i) || 0), s !== 0
}

function RA(t, e, r) {
  return K_(t, 0, !1, e, r)
}

function OA(t, e, r, n) {
  return K_(t, e, !0, r, n)
}
var Z_ = Dt({
    fill: "#000",
    stroke: null,
    strokePercent: 1,
    fillOpacity: 1,
    strokeOpacity: 1,
    lineDashOffset: 0,
    lineWidth: 1,
    lineCap: "butt",
    miterLimit: 10,
    strokeNoScale: !1,
    strokeFirst: !1
  }, ri),
  kA = {
    style: Dt({
      fill: !0,
      stroke: !0,
      strokePercent: !0,
      fillOpacity: !0,
      strokeOpacity: !0,
      lineDashOffset: !0,
      lineWidth: !0,
      miterLimit: !0
    }, ou.style)
  },
  hf = Lo.concat(["invisible", "culling", "z", "z2", "zlevel", "parent"]),
  BA = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.update = function () {
      var r = this;
      t.prototype.update.call(this);
      var n = this.style;
      if (n.decal) {
        var i = this._decalEl = this._decalEl || new e;
        i.buildPath === e.prototype.buildPath && (i.buildPath = function (l) {
          r.buildPath(l, r.shape)
        }), i.silent = !0;
        var a = i.style;
        for (var o in n) a[o] !== n[o] && (a[o] = n[o]);
        a.fill = n.fill ? n.decal : null, a.decal = null, a.shadowColor = null, n.strokeFirst && (a.stroke = null);
        for (var s = 0; s < hf.length; ++s) i[hf[s]] = this[hf[s]];
        i.__dirty |= Te
      } else this._decalEl && (this._decalEl = null)
    }, e.prototype.getDecalElement = function () {
      return this._decalEl
    }, e.prototype._init = function (r) {
      var n = Vt(r);
      this.shape = this.getDefaultShape();
      var i = this.getDefaultStyle();
      i && this.useStyle(i);
      for (var a = 0; a < n.length; a++) {
        var o = n[a],
          s = r[o];
        o === "style" ? this.style ? q(this.style, s) : this.useStyle(s) : o === "shape" ? q(this.shape, s) : t.prototype.attrKV.call(this, o, s)
      }
      this.style || this.useStyle({})
    }, e.prototype.getDefaultStyle = function () {
      return null
    }, e.prototype.getDefaultShape = function () {
      return {}
    }, e.prototype.canBeInsideText = function () {
      return this.hasFill()
    }, e.prototype.getInsideTextFill = function () {
      var r = this.style.fill;
      if (r !== "none") {
        if (nt(r)) {
          var n = Tl(r, 0);
          return n > .5 ? Oc : n > .2 ? cD : kc
        } else if (r) return kc
      }
      return Oc
    }, e.prototype.getInsideTextStroke = function (r) {
      var n = this.style.fill;
      if (nt(n)) {
        var i = this.__zr,
          a = !!(i && i.isDarkMode()),
          o = Tl(r, 0) < Rc;
        if (a === o) return n
      }
    }, e.prototype.buildPath = function (r, n, i) {}, e.prototype.pathUpdated = function () {
      this.__dirty &= ~zi
    }, e.prototype.getUpdatedPathProxy = function (r) {
      return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path
    }, e.prototype.createPathProxy = function () {
      this.path = new fi(!1)
    }, e.prototype.hasStroke = function () {
      var r = this.style,
        n = r.stroke;
      return !(n == null || n === "none" || !(r.lineWidth > 0))
    }, e.prototype.hasFill = function () {
      var r = this.style,
        n = r.fill;
      return n != null && n !== "none"
    }, e.prototype.getBoundingRect = function () {
      var r = this._rect,
        n = this.style,
        i = !r;
      if (i) {
        var a = !1;
        this.path || (a = !0, this.createPathProxy());
        var o = this.path;
        (a || this.__dirty & zi) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), r = o.getBoundingRect()
      }
      if (this._rect = r, this.hasStroke() && this.path && this.path.len() > 0) {
        var s = this._rectStroke || (this._rectStroke = r.clone());
        if (this.__dirty || i) {
          s.copy(r);
          var l = n.strokeNoScale ? this.getLineScale() : 1,
            u = n.lineWidth;
          if (!this.hasFill()) {
            var f = this.strokeContainThreshold;
            u = Math.max(u, f == null ? 4 : f)
          }
          l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2)
        }
        return s
      }
      return r
    }, e.prototype.contain = function (r, n) {
      var i = this.transformCoordToLocal(r, n),
        a = this.getBoundingRect(),
        o = this.style;
      if (r = i[0], n = i[1], a.contain(r, n)) {
        var s = this.path;
        if (this.hasStroke()) {
          var l = o.lineWidth,
            u = o.strokeNoScale ? this.getLineScale() : 1;
          if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), OA(s, l / u, r, n))) return !0
        }
        if (this.hasFill()) return RA(s, r, n)
      }
      return !1
    }, e.prototype.dirtyShape = function () {
      this.__dirty |= zi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw()
    }, e.prototype.dirty = function () {
      this.dirtyStyle(), this.dirtyShape()
    }, e.prototype.animateShape = function (r) {
      return this.animate("shape", r)
    }, e.prototype.updateDuringAnimation = function (r) {
      r === "style" ? this.dirtyStyle() : r === "shape" ? this.dirtyShape() : this.markRedraw()
    }, e.prototype.attrKV = function (r, n) {
      r === "shape" ? this.setShape(n) : t.prototype.attrKV.call(this, r, n)
    }, e.prototype.setShape = function (r, n) {
      var i = this.shape;
      return i || (i = this.shape = {}), typeof r == "string" ? i[r] = n : q(i, r), this.dirtyShape(), this
    }, e.prototype.shapeChanged = function () {
      return !!(this.__dirty & zi)
    }, e.prototype.createStyle = function (r) {
      return ru(Z_, r)
    }, e.prototype._innerSaveToNormal = function (r) {
      t.prototype._innerSaveToNormal.call(this, r);
      var n = this._normalState;
      r.shape && !n.shape && (n.shape = q({}, this.shape))
    }, e.prototype._applyStateObj = function (r, n, i, a, o, s) {
      t.prototype._applyStateObj.call(this, r, n, i, a, o, s);
      var l = !(n && a),
        u;
      if (n && n.shape ? o ? a ? u = n.shape : (u = q({}, i.shape), q(u, n.shape)) : (u = q({}, a ? this.shape : i.shape), q(u, n.shape)) : l && (u = i.shape), u)
        if (o) {
          this.shape = q({}, this.shape);
          for (var f = {}, c = Vt(u), h = 0; h < c.length; h++) {
            var v = c[h];
            typeof u[v] == "object" ? this.shape[v] = u[v] : f[v] = u[v]
          }
          this._transitionState(r, {
            shape: f
          }, s)
        } else this.shape = u, this.dirtyShape()
    }, e.prototype._mergeStates = function (r) {
      for (var n = t.prototype._mergeStates.call(this, r), i, a = 0; a < r.length; a++) {
        var o = r[a];
        o.shape && (i = i || {}, this._mergeStyle(i, o.shape))
      }
      return i && (n.shape = i), n
    }, e.prototype.getAnimationStyleProps = function () {
      return kA
    }, e.prototype.isZeroArea = function () {
      return !1
    }, e.extend = function (r) {
      var n = function (a) {
        J(o, a);

        function o(s) {
          var l = a.call(this, s) || this;
          return r.init && r.init.call(l, s), l
        }
        return o.prototype.getDefaultStyle = function () {
          return St(r.style)
        }, o.prototype.getDefaultShape = function () {
          return St(r.shape)
        }, o
      }(e);
      for (var i in r) typeof r[i] == "function" && (n.prototype[i] = r[i]);
      return n
    }, e.initDefaultProps = function () {
      var r = e.prototype;
      r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = Te | Xa | zi
    }(), e
  }(Qo),
  kt = BA,
  NA = Dt({
    strokeFirst: !0,
    font: si,
    x: 0,
    y: 0,
    textAlign: "left",
    textBaseline: "top",
    miterLimit: 2
  }, Z_),
  j_ = function (t) {
    J(e, t);

    function e() {
      return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.hasStroke = function () {
      var r = this.style,
        n = r.stroke;
      return n != null && n !== "none" && r.lineWidth > 0
    }, e.prototype.hasFill = function () {
      var r = this.style,
        n = r.fill;
      return n != null && n !== "none"
    }, e.prototype.createStyle = function (r) {
      return ru(NA, r)
    }, e.prototype.setBoundingRect = function (r) {
      this._rect = r
    }, e.prototype.getBoundingRect = function () {
      var r = this.style;
      if (!this._rect) {
        var n = r.text;
        n != null ? n += "" : n = "";
        var i = hv(n, r.font, r.textAlign, r.textBaseline);
        if (i.x += r.x || 0, i.y += r.y || 0, this.hasStroke()) {
          var a = r.lineWidth;
          i.x -= a / 2, i.y -= a / 2, i.width += a, i.height += a
        }
        this._rect = i
      }
      return this._rect
    }, e.initDefaultProps = function () {
      var r = e.prototype;
      r.dirtyRectTolerance = 10
    }(), e
  }(Qo);
j_.prototype.type = "tspan";
var Hc = j_,
  FA = Dt({
    x: 0,
    y: 0
  }, ri),
  zA = {
    style: Dt({
      x: !0,
      y: !0,
      width: !0,
      height: !0,
      sx: !0,
      sy: !0,
      sWidth: !0,
      sHeight: !0
    }, ou.style)
  };

function HA(t) {
  return !!(t && typeof t != "string" && t.width && t.height)
}
var Q_ = function (t) {
  J(e, t);

  function e() {
    return t !== null && t.apply(this, arguments) || this
  }
  return e.prototype.createStyle = function (r) {
    return ru(FA, r)
  }, e.prototype._getSize = function (r) {
    var n = this.style,
      i = n[r];
    if (i != null) return i;
    var a = HA(n.image) ? n.image : this.__image;
    if (!a) return 0;
    var o = r === "width" ? "height" : "width",
      s = n[o];
    return s == null ? a[r] : a[r] / a[o] * s
  }, e.prototype.getWidth = function () {
    return this._getSize("width")
  }, e.prototype.getHeight = function () {
    return this._getSize("height")
  }, e.prototype.getAnimationStyleProps = function () {
    return zA
  }, e.prototype.getBoundingRect = function () {
    var r = this.style;
    return this._rect || (this._rect = new Ot(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect
  }, e
}(Qo);
Q_.prototype.type = "image";
var pi = Q_;

function VA(t, e) {
  var r = e.x,
    n = e.y,
    i = e.width,
    a = e.height,
    o = e.r,
    s, l, u, f;
  i < 0 && (r = r + i, i = -i), a < 0 && (n = n + a, a = -a), typeof o == "number" ? s = l = u = f = o : o instanceof Array ? o.length === 1 ? s = l = u = f = o[0] : o.length === 2 ? (s = u = o[0], l = f = o[1]) : o.length === 3 ? (s = o[0], l = f = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], f = o[3]) : s = l = u = f = 0;
  var c;
  s + l > i && (c = s + l, s *= i / c, l *= i / c), u + f > i && (c = u + f, u *= i / c, f *= i / c), l + u > a && (c = l + u, l *= a / c, u *= a / c), s + f > a && (c = s + f, s *= a / c, f *= a / c), t.moveTo(r + s, n), t.lineTo(r + i - l, n), l !== 0 && t.arc(r + i - l, n + l, l, -Math.PI / 2, 0), t.lineTo(r + i, n + a - u), u !== 0 && t.arc(r + i - u, n + a - u, u, 0, Math.PI / 2), t.lineTo(r + f, n + a), f !== 0 && t.arc(r + f, n + a - f, f, Math.PI / 2, Math.PI), t.lineTo(r, n + s), s !== 0 && t.arc(r + s, n + s, s, Math.PI, Math.PI * 1.5)
}
var Wi = Math.round;

function J_(t, e, r) {
  if (!!e) {
    var n = e.x1,
      i = e.x2,
      a = e.y1,
      o = e.y2;
    t.x1 = n, t.x2 = i, t.y1 = a, t.y2 = o;
    var s = r && r.lineWidth;
    return s && (Wi(n * 2) === Wi(i * 2) && (t.x1 = t.x2 = Jn(n, s, !0)), Wi(a * 2) === Wi(o * 2) && (t.y1 = t.y2 = Jn(a, s, !0))), t
  }
}

function t1(t, e, r) {
  if (!!e) {
    var n = e.x,
      i = e.y,
      a = e.width,
      o = e.height;
    t.x = n, t.y = i, t.width = a, t.height = o;
    var s = r && r.lineWidth;
    return s && (t.x = Jn(n, s, !0), t.y = Jn(i, s, !0), t.width = Math.max(Jn(n + a, s, !1) - t.x, a === 0 ? 0 : 1), t.height = Math.max(Jn(i + o, s, !1) - t.y, o === 0 ? 0 : 1)), t
  }
}

function Jn(t, e, r) {
  if (!e) return t;
  var n = Wi(t * 2);
  return (n + Wi(e)) % 2 === 0 ? n / 2 : (n + (r ? 1 : -1)) / 2
}
var $A = function () {
    function t() {
      this.x = 0, this.y = 0, this.width = 0, this.height = 0
    }
    return t
  }(),
  GA = {},
  e1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultShape = function () {
      return new $A
    }, e.prototype.buildPath = function (r, n) {
      var i, a, o, s;
      if (this.subPixelOptimize) {
        var l = t1(GA, n, this.style);
        i = l.x, a = l.y, o = l.width, s = l.height, l.r = n.r, n = l
      } else i = n.x, a = n.y, o = n.width, s = n.height;
      n.r ? VA(r, n) : r.rect(i, a, o, s)
    }, e.prototype.isZeroArea = function () {
      return !this.shape.width || !this.shape.height
    }, e
  }(kt);
e1.prototype.type = "rect";
var Qt = e1,
  Xp = {
    fill: "#000"
  },
  qp = 2,
  WA = {
    style: Dt({
      fill: !0,
      stroke: !0,
      fillOpacity: !0,
      strokeOpacity: !0,
      lineWidth: !0,
      fontSize: !0,
      lineHeight: !0,
      width: !0,
      height: !0,
      textShadowColor: !0,
      textShadowBlur: !0,
      textShadowOffsetX: !0,
      textShadowOffsetY: !0,
      backgroundColor: !0,
      padding: !0,
      borderColor: !0,
      borderWidth: !0,
      borderRadius: !0
    }, ou.style)
  },
  r1 = function (t) {
    J(e, t);

    function e(r) {
      var n = t.call(this) || this;
      return n.type = "text", n._children = [], n._defaultStyle = Xp, n.attr(r), n
    }
    return e.prototype.childrenRef = function () {
      return this._children
    }, e.prototype.update = function () {
      t.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
      for (var r = 0; r < this._children.length; r++) {
        var n = this._children[r];
        n.zlevel = this.zlevel, n.z = this.z, n.z2 = this.z2, n.culling = this.culling, n.cursor = this.cursor, n.invisible = this.invisible
      }
    }, e.prototype.updateTransform = function () {
      var r = this.innerTransformable;
      r ? (r.updateTransform(), r.transform && (this.transform = r.transform)) : t.prototype.updateTransform.call(this)
    }, e.prototype.getLocalTransform = function (r) {
      var n = this.innerTransformable;
      return n ? n.getLocalTransform(r) : t.prototype.getLocalTransform.call(this, r)
    }, e.prototype.getComputedTransform = function () {
      return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), t.prototype.getComputedTransform.call(this)
    }, e.prototype._updateSubTexts = function () {
      this._childCursor = 0, KA(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated()
    }, e.prototype.addSelfToZr = function (r) {
      t.prototype.addSelfToZr.call(this, r);
      for (var n = 0; n < this._children.length; n++) this._children[n].__zr = r
    }, e.prototype.removeSelfFromZr = function (r) {
      t.prototype.removeSelfFromZr.call(this, r);
      for (var n = 0; n < this._children.length; n++) this._children[n].__zr = null
    }, e.prototype.getBoundingRect = function () {
      if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
        for (var r = new Ot(0, 0, 0, 0), n = this._children, i = [], a = null, o = 0; o < n.length; o++) {
          var s = n[o],
            l = s.getBoundingRect(),
            u = s.getLocalTransform(i);
          u ? (r.copy(l), r.applyTransform(u), a = a || r.clone(), a.union(r)) : (a = a || l.clone(), a.union(l))
        }
        this._rect = a || r
      }
      return this._rect
    }, e.prototype.setDefaultTextStyle = function (r) {
      this._defaultStyle = r || Xp
    }, e.prototype.setTextContent = function (r) {}, e.prototype._mergeStyle = function (r, n) {
      if (!n) return r;
      var i = n.rich,
        a = r.rich || i && {};
      return q(r, n), i && a ? (this._mergeRich(a, i), r.rich = a) : a && (r.rich = a), r
    }, e.prototype._mergeRich = function (r, n) {
      for (var i = Vt(n), a = 0; a < i.length; a++) {
        var o = i[a];
        r[o] = r[o] || {}, q(r[o], n[o])
      }
    }, e.prototype.getAnimationStyleProps = function () {
      return WA
    }, e.prototype._getOrCreateChild = function (r) {
      var n = this._children[this._childCursor];
      return (!n || !(n instanceof r)) && (n = new r), this._children[this._childCursor++] = n, n.__zr = this.__zr, n.parent = this, n
    }, e.prototype._updatePlainTexts = function () {
      var r = this.style,
        n = r.font || si,
        i = r.padding,
        a = eg(r),
        o = uA(a, r),
        s = vf(r),
        l = !!r.backgroundColor,
        u = o.outerHeight,
        f = o.outerWidth,
        c = o.contentWidth,
        h = o.lines,
        v = o.lineHeight,
        d = this._defaultStyle,
        y = r.x || 0,
        g = r.y || 0,
        p = r.align || d.align || "left",
        m = r.verticalAlign || d.verticalAlign || "top",
        _ = y,
        w = Hi(g, o.contentHeight, m);
      if (s || i) {
        var b = Ka(y, f, p),
          S = Hi(g, u, m);
        s && this._renderBackground(r, r, b, S, f, u)
      }
      w += v / 2, i && (_ = tg(y, p, i), m === "top" ? w += i[0] : m === "bottom" && (w -= i[2]));
      for (var x = 0, T = !1, M = Jp("fill" in r ? r.fill : (T = !0, d.fill)), D = Qp("stroke" in r ? r.stroke : !l && (!d.autoStroke || T) ? (x = qp, d.stroke) : null), I = r.textShadowBlur > 0, A = r.width != null && (r.overflow === "truncate" || r.overflow === "break" || r.overflow === "breakAll"), L = o.calculatedLineHeight, O = 0; O < h.length; O++) {
        var H = this._getOrCreateChild(Hc),
          B = H.createStyle();
        H.useStyle(B), B.text = h[O], B.x = _, B.y = w, p && (B.textAlign = p), B.textBaseline = "middle", B.opacity = r.opacity, B.strokeFirst = !0, I && (B.shadowBlur = r.textShadowBlur || 0, B.shadowColor = r.textShadowColor || "transparent", B.shadowOffsetX = r.textShadowOffsetX || 0, B.shadowOffsetY = r.textShadowOffsetY || 0), B.stroke = D, B.fill = M, D && (B.lineWidth = r.lineWidth || x, B.lineDash = r.lineDash, B.lineDashOffset = r.lineDashOffset || 0), B.font = n, Zp(B, r), w += v, A && H.setBoundingRect(new Ot(Ka(B.x, r.width, B.textAlign), Hi(B.y, L, B.textBaseline), c, L))
      }
    }, e.prototype._updateRichTexts = function () {
      var r = this.style,
        n = eg(r),
        i = hA(n, r),
        a = i.width,
        o = i.outerWidth,
        s = i.outerHeight,
        l = r.padding,
        u = r.x || 0,
        f = r.y || 0,
        c = this._defaultStyle,
        h = r.align || c.align,
        v = r.verticalAlign || c.verticalAlign,
        d = Ka(u, o, h),
        y = Hi(f, s, v),
        g = d,
        p = y;
      l && (g += l[3], p += l[0]);
      var m = g + a;
      vf(r) && this._renderBackground(r, r, d, y, o, s);
      for (var _ = !!r.backgroundColor, w = 0; w < i.lines.length; w++) {
        for (var b = i.lines[w], S = b.tokens, x = S.length, T = b.lineHeight, M = b.width, D = 0, I = g, A = m, L = x - 1, O = void 0; D < x && (O = S[D], !O.align || O.align === "left");) this._placeToken(O, r, T, p, I, "left", _), M -= O.width, I += O.width, D++;
        for (; L >= 0 && (O = S[L], O.align === "right");) this._placeToken(O, r, T, p, A, "right", _), M -= O.width, A -= O.width, L--;
        for (I += (a - (I - g) - (m - A) - M) / 2; D <= L;) O = S[D], this._placeToken(O, r, T, p, I + O.width / 2, "center", _), I += O.width, D++;
        p += T
      }
    }, e.prototype._placeToken = function (r, n, i, a, o, s, l) {
      var u = n.rich[r.styleName] || {};
      u.text = r.text;
      var f = r.verticalAlign,
        c = a + i / 2;
      f === "top" ? c = a + r.height / 2 : f === "bottom" && (c = a + i - r.height / 2);
      var h = !r.isLineHolder && vf(u);
      h && this._renderBackground(u, n, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, c - r.height / 2, r.width, r.height);
      var v = !!u.backgroundColor,
        d = r.textPadding;
      d && (o = tg(o, s, d), c -= r.height / 2 - d[0] - r.innerHeight / 2);
      var y = this._getOrCreateChild(Hc),
        g = y.createStyle();
      y.useStyle(g);
      var p = this._defaultStyle,
        m = !1,
        _ = 0,
        w = Jp("fill" in u ? u.fill : "fill" in n ? n.fill : (m = !0, p.fill)),
        b = Qp("stroke" in u ? u.stroke : "stroke" in n ? n.stroke : !v && !l && (!p.autoStroke || m) ? (_ = qp, p.stroke) : null),
        S = u.textShadowBlur > 0 || n.textShadowBlur > 0;
      g.text = r.text, g.x = o, g.y = c, S && (g.shadowBlur = u.textShadowBlur || n.textShadowBlur || 0, g.shadowColor = u.textShadowColor || n.textShadowColor || "transparent", g.shadowOffsetX = u.textShadowOffsetX || n.textShadowOffsetX || 0, g.shadowOffsetY = u.textShadowOffsetY || n.textShadowOffsetY || 0), g.textAlign = s, g.textBaseline = "middle", g.font = r.font || si, g.opacity = Zs(u.opacity, n.opacity, 1), Zp(g, u), b && (g.lineWidth = Zs(u.lineWidth, n.lineWidth, _), g.lineDash = Mt(u.lineDash, n.lineDash), g.lineDashOffset = n.lineDashOffset || 0, g.stroke = b), w && (g.fill = w);
      var x = r.contentWidth,
        T = r.contentHeight;
      y.setBoundingRect(new Ot(Ka(g.x, x, g.textAlign), Hi(g.y, T, g.textBaseline), x, T))
    }, e.prototype._renderBackground = function (r, n, i, a, o, s) {
      var l = r.backgroundColor,
        u = r.borderWidth,
        f = r.borderColor,
        c = l && l.image,
        h = l && !c,
        v = r.borderRadius,
        d = this,
        y, g;
      if (h || r.lineHeight || u && f) {
        y = this._getOrCreateChild(Qt), y.useStyle(y.createStyle()), y.style.fill = null;
        var p = y.shape;
        p.x = i, p.y = a, p.width = o, p.height = s, p.r = v, y.dirtyShape()
      }
      if (h) {
        var m = y.style;
        m.fill = l || null, m.fillOpacity = Mt(r.fillOpacity, 1)
      } else if (c) {
        g = this._getOrCreateChild(pi), g.onload = function () {
          d.dirtyStyle()
        };
        var _ = g.style;
        _.image = l.image, _.x = i, _.y = a, _.width = o, _.height = s
      }
      if (u && f) {
        var m = y.style;
        m.lineWidth = u, m.stroke = f, m.strokeOpacity = Mt(r.strokeOpacity, 1), m.lineDash = r.borderDash, m.lineDashOffset = r.borderDashOffset || 0, y.strokeContainThreshold = 0, y.hasFill() && y.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2)
      }
      var w = (y || g).style;
      w.shadowBlur = r.shadowBlur || 0, w.shadowColor = r.shadowColor || "transparent", w.shadowOffsetX = r.shadowOffsetX || 0, w.shadowOffsetY = r.shadowOffsetY || 0, w.opacity = Zs(r.opacity, n.opacity, 1)
    }, e.makeFont = function (r) {
      var n = "";
      return qA(r) && (n = [r.fontStyle, r.fontWeight, XA(r.fontSize), r.fontFamily || "sans-serif"].join(" ")), n && vr(n) || r.textFont || r.font
    }, e
  }(Qo),
  UA = {
    left: !0,
    right: 1,
    center: 1
  },
  YA = {
    top: 1,
    bottom: 1,
    middle: 1
  },
  Kp = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];

function XA(t) {
  return typeof t == "string" && (t.indexOf("px") !== -1 || t.indexOf("rem") !== -1 || t.indexOf("em") !== -1) ? t : isNaN(+t) ? ev + "px" : t + "px"
}

function Zp(t, e) {
  for (var r = 0; r < Kp.length; r++) {
    var n = Kp[r],
      i = e[n];
    i != null && (t[n] = i)
  }
}

function qA(t) {
  return t.fontSize != null || t.fontFamily || t.fontWeight
}

function KA(t) {
  return jp(t), P(t.rich, jp), t
}

function jp(t) {
  if (t) {
    t.font = r1.makeFont(t);
    var e = t.align;
    e === "middle" && (e = "center"), t.align = e == null || UA[e] ? e : "left";
    var r = t.verticalAlign;
    r === "center" && (r = "middle"), t.verticalAlign = r == null || YA[r] ? r : "top";
    var n = t.padding;
    n && (t.padding = u_(t.padding))
  }
}

function Qp(t, e) {
  return t == null || e <= 0 || t === "transparent" || t === "none" ? null : t.image || t.colorStops ? "#000" : t
}

function Jp(t) {
  return t == null || t === "none" ? null : t.image || t.colorStops ? "#000" : t
}

function tg(t, e, r) {
  return e === "right" ? t - r[1] : e === "center" ? t + r[3] / 2 - r[1] / 2 : t + r[3]
}

function eg(t) {
  var e = t.text;
  return e != null && (e += ""), e
}

function vf(t) {
  return !!(t.backgroundColor || t.lineHeight || t.borderWidth && t.borderColor)
}
var he = r1,
  Bt = Kt(),
  ZA = function (t, e, r, n) {
    if (n) {
      var i = Bt(n);
      i.dataIndex = r, i.dataType = e, i.seriesIndex = t, n.type === "group" && n.traverse(function (a) {
        var o = Bt(a);
        o.seriesIndex = t, o.dataIndex = r, o.dataType = e
      })
    }
  },
  rg = 1,
  ng = {},
  n1 = Kt(),
  _v = Kt(),
  wv = 0,
  su = 1,
  lu = 2,
  yr = ["emphasis", "blur", "select"],
  ig = ["normal", "emphasis", "blur", "select"],
  jA = 10,
  QA = 9,
  ni = "highlight",
  il = "downplay",
  fo = "select",
  al = "unselect",
  co = "toggleSelect";

function Di(t) {
  return t != null && t !== "none"
}
var ag = new Ko(100);

function og(t) {
  if (nt(t)) {
    var e = ag.get(t);
    return e || (e = bp(t, -.1), ag.put(t, e)), e
  } else if (eu(t)) {
    var r = q({}, t);
    return r.colorStops = ct(t.colorStops, function (n) {
      return {
        offset: n.offset,
        color: bp(n.color, -.1)
      }
    }), r
  }
  return t
}

function uu(t, e, r) {
  t.onHoverStateChange && (t.hoverState || 0) !== r && t.onHoverStateChange(e), t.hoverState = r
}

function i1(t) {
  uu(t, "emphasis", lu)
}

function a1(t) {
  t.hoverState === lu && uu(t, "normal", wv)
}

function Sv(t) {
  uu(t, "blur", su)
}

function o1(t) {
  t.hoverState === su && uu(t, "normal", wv)
}

function JA(t) {
  t.selected = !0
}

function tP(t) {
  t.selected = !1
}

function sg(t, e, r) {
  e(t, r)
}

function Fr(t, e, r) {
  sg(t, e, r), t.isGroup && t.traverse(function (n) {
    sg(n, e, r)
  })
}

function lg(t, e) {
  switch (e) {
    case "emphasis":
      t.hoverState = lu;
      break;
    case "normal":
      t.hoverState = wv;
      break;
    case "blur":
      t.hoverState = su;
      break;
    case "select":
      t.selected = !0
  }
}

function eP(t, e, r, n) {
  for (var i = t.style, a = {}, o = 0; o < e.length; o++) {
    var s = e[o],
      l = i[s];
    a[s] = l == null ? n && n[s] : l
  }
  for (var o = 0; o < t.animators.length; o++) {
    var u = t.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(r) < 0 && u.targetName === "style" && u.saveTo(a, e)
  }
  return a
}

function rP(t, e, r, n) {
  var i = r && Pt(r, "select") >= 0,
    a = !1;
  if (t instanceof kt) {
    var o = n1(t),
      s = i && o.selectFill || o.normalFill,
      l = i && o.selectStroke || o.normalStroke;
    if (Di(s) || Di(l)) {
      n = n || {};
      var u = n.style || {};
      u.fill === "inherit" ? (a = !0, n = q({}, n), u = q({}, u), u.fill = s) : !Di(u.fill) && Di(s) ? (a = !0, n = q({}, n), u = q({}, u), u.fill = og(s)) : !Di(u.stroke) && Di(l) && (a || (n = q({}, n), u = q({}, u)), u.stroke = og(l)), n.style = u
    }
  }
  if (n && n.z2 == null) {
    a || (n = q({}, n));
    var f = t.z2EmphasisLift;
    n.z2 = t.z2 + (f != null ? f : jA)
  }
  return n
}

function nP(t, e, r) {
  if (r && r.z2 == null) {
    r = q({}, r);
    var n = t.z2SelectLift;
    r.z2 = t.z2 + (n != null ? n : QA)
  }
  return r
}

function iP(t, e, r) {
  var n = Pt(t.currentStates, e) >= 0,
    i = t.style.opacity,
    a = n ? null : eP(t, ["opacity"], e, {
      opacity: 1
    });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = q({}, r), o = q({
    opacity: n ? i : a.opacity * .1
  }, o), r.style = o), r
}

function df(t, e) {
  var r = this.states[t];
  if (this.style) {
    if (t === "emphasis") return rP(this, t, e, r);
    if (t === "blur") return iP(this, t, r);
    if (t === "select") return nP(this, t, r)
  }
  return r
}

function aP(t) {
  t.stateProxy = df;
  var e = t.getTextContent(),
    r = t.getTextGuideLine();
  e && (e.stateProxy = df), r && (r.stateProxy = df)
}

function ug(t, e) {
  !f1(t, e) && !t.__highByOuter && Fr(t, i1)
}

function fg(t, e) {
  !f1(t, e) && !t.__highByOuter && Fr(t, a1)
}

function Pl(t, e) {
  t.__highByOuter |= 1 << (e || 0), Fr(t, i1)
}

function Il(t, e) {
  !(t.__highByOuter &= ~(1 << (e || 0))) && Fr(t, a1)
}

function oP(t) {
  Fr(t, Sv)
}

function s1(t) {
  Fr(t, o1)
}

function l1(t) {
  Fr(t, JA)
}

function u1(t) {
  Fr(t, tP)
}

function f1(t, e) {
  return t.__highDownSilentOnTouch && e.zrByTouch
}

function c1(t) {
  var e = t.getModel();
  e.eachComponent(function (r, n) {
    var i = _v(n);
    if (i.isBlured) {
      var a = r === "series" ? t.getViewOfSeriesModel(n) : t.getViewOfComponentModel(n);
      a.group.traverse(function (o) {
        o1(o)
      })
    }
    i.isBlured = !1
  })
}

function Vc(t, e, r, n) {
  var i = n.getModel();
  r = r || "coordinateSystem";

  function a(u, f) {
    for (var c = 0; c < f.length; c++) {
      var h = u.getItemGraphicEl(f[c]);
      h && s1(h)
    }
  }
  if (t != null && !(!e || e === "none")) {
    var o = i.getSeriesByIndex(t),
      s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    i.eachSeries(function (u) {
      var f = o === u,
        c = u.coordinateSystem;
      c && c.master && (c = c.master);
      var h = c && s ? c === s : f;
      if (!(r === "series" && !f || r === "coordinateSystem" && !h || e === "series" && f)) {
        var v = n.getViewOfSeriesModel(u);
        if (v.group.traverse(function (g) {
            Sv(g)
          }), we(e)) a(u.getData(), e);
        else if (st(e))
          for (var d = Vt(e), y = 0; y < d.length; y++) a(u.getData(d[y]), e[d[y]]);
        l.push(u), _v(u).isBlured = !0
      }
    }), i.eachComponent(function (u, f) {
      if (u !== "series") {
        var c = n.getViewOfComponentModel(f);
        c && c.blurSeries && c.blurSeries(l, i)
      }
    })
  }
}

function $c(t, e, r) {
  if (!(t == null || e == null)) {
    var n = r.getModel().getComponent(t, e);
    if (!!n) {
      _v(n).isBlured = !0;
      var i = r.getViewOfComponentModel(n);
      !i || !i.focusBlurEnabled || i.group.traverse(function (a) {
        Sv(a)
      })
    }
  }
}

function sP(t, e, r) {
  var n = t.seriesIndex,
    i = t.getData(e.dataType);
  if (!!i) {
    var a = ui(i, e);
    a = (et(a) ? a[0] : a) || 0;
    var o = i.getItemGraphicEl(a);
    if (!o)
      for (var s = i.count(), l = 0; !o && l < s;) o = i.getItemGraphicEl(l++);
    if (o) {
      var u = Bt(o);
      Vc(n, u.focus, u.blurScope, r)
    } else {
      var f = t.get(["emphasis", "focus"]),
        c = t.get(["emphasis", "blurScope"]);
      f != null && Vc(n, f, c, r)
    }
  }
}

function bv(t, e, r, n) {
  var i = {
    focusSelf: !1,
    dispatchers: null
  };
  if (t == null || t === "series" || e == null || r == null) return i;
  var a = n.getModel().getComponent(t, e);
  if (!a) return i;
  var o = n.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers) return i;
  for (var s = o.findHighDownDispatchers(r), l, u = 0; u < s.length; u++)
    if (Bt(s[u]).focus === "self") {
      l = !0;
      break
    } return {
    focusSelf: l,
    dispatchers: s
  }
}

function lP(t, e, r) {
  var n = Bt(t),
    i = bv(n.componentMainType, n.componentIndex, n.componentHighDownName, r),
    a = i.dispatchers,
    o = i.focusSelf;
  a ? (o && $c(n.componentMainType, n.componentIndex, r), P(a, function (s) {
    return ug(s, e)
  })) : (Vc(n.seriesIndex, n.focus, n.blurScope, r), n.focus === "self" && $c(n.componentMainType, n.componentIndex, r), ug(t, e))
}

function uP(t, e, r) {
  c1(r);
  var n = Bt(t),
    i = bv(n.componentMainType, n.componentIndex, n.componentHighDownName, r).dispatchers;
  i ? P(i, function (a) {
    return fg(a, e)
  }) : fg(t, e)
}

function fP(t, e, r) {
  if (!!Yc(e)) {
    var n = e.dataType,
      i = t.getData(n),
      a = ui(i, e);
    et(a) || (a = [a]), t[e.type === co ? "toggleSelect" : e.type === fo ? "select" : "unselect"](a, n)
  }
}

function cg(t) {
  var e = t.getAllData();
  P(e, function (r) {
    var n = r.data,
      i = r.type;
    n.eachItemGraphicEl(function (a, o) {
      t.isSelected(o, i) ? l1(a) : u1(a)
    })
  })
}

function cP(t) {
  var e = [];
  return t.eachSeries(function (r) {
    var n = r.getAllData();
    P(n, function (i) {
      i.data;
      var a = i.type,
        o = r.getSelectedDataIndices();
      if (o.length > 0) {
        var s = {
          dataIndex: o,
          seriesIndex: r.seriesIndex
        };
        a != null && (s.dataType = a), e.push(s)
      }
    })
  }), e
}

function Gc(t, e, r) {
  h1(t, !0), Fr(t, aP), vP(t, e, r)
}

function hP(t) {
  h1(t, !1)
}

function Wc(t, e, r, n) {
  n ? hP(t) : Gc(t, e, r)
}

function vP(t, e, r) {
  var n = Bt(t);
  e != null ? (n.focus = e, n.blurScope = r) : n.focus && (n.focus = null)
}
var hg = ["emphasis", "blur", "select"],
  dP = {
    itemStyle: "getItemStyle",
    lineStyle: "getLineStyle",
    areaStyle: "getAreaStyle"
  };

function vg(t, e, r, n) {
  r = r || "itemStyle";
  for (var i = 0; i < hg.length; i++) {
    var a = hg[i],
      o = e.getModel([a, r]),
      s = t.ensureState(a);
    s.style = n ? n(o) : o[dP[r]]()
  }
}

function h1(t, e) {
  var r = e === !1,
    n = t;
  t.highDownSilentOnTouch && (n.__highDownSilentOnTouch = t.highDownSilentOnTouch), (!r || n.__highDownDispatcher) && (n.__highByOuter = n.__highByOuter || 0, n.__highDownDispatcher = !r)
}

function Uc(t) {
  return !!(t && t.__highDownDispatcher)
}

function pP(t) {
  var e = ng[t];
  return e == null && rg <= 32 && (e = ng[t] = rg++), e
}

function Yc(t) {
  var e = t.type;
  return e === fo || e === al || e === co
}

function dg(t) {
  var e = t.type;
  return e === ni || e === il
}

function gP(t) {
  var e = n1(t);
  e.normalFill = t.style.fill, e.normalStroke = t.style.stroke;
  var r = t.states.select || {};
  e.selectFill = r.style && r.style.fill || null, e.selectStroke = r.style && r.style.stroke || null
}
var Ai = fi.CMD,
  yP = [
    [],
    [],
    []
  ],
  pg = Math.sqrt,
  mP = Math.atan2;

function _P(t, e) {
  if (!!e) {
    var r = t.data,
      n = t.len(),
      i, a, o, s, l, u, f = Ai.M,
      c = Ai.C,
      h = Ai.L,
      v = Ai.R,
      d = Ai.A,
      y = Ai.Q;
    for (o = 0, s = 0; o < n;) {
      switch (i = r[o++], s = o, a = 0, i) {
        case f:
          a = 1;
          break;
        case h:
          a = 1;
          break;
        case c:
          a = 3;
          break;
        case y:
          a = 2;
          break;
        case d:
          var g = e[4],
            p = e[5],
            m = pg(e[0] * e[0] + e[1] * e[1]),
            _ = pg(e[2] * e[2] + e[3] * e[3]),
            w = mP(-e[1] / _, e[0] / m);
          r[o] *= m, r[o++] += g, r[o] *= _, r[o++] += p, r[o++] *= m, r[o++] *= _, r[o++] += w, r[o++] += w, o += 2, s = o;
          break;
        case v:
          u[0] = r[o++], u[1] = r[o++], Ye(u, u, e), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], Ye(u, u, e), r[s++] = u[0], r[s++] = u[1]
      }
      for (l = 0; l < a; l++) {
        var b = yP[l];
        b[0] = r[o++], b[1] = r[o++], Ye(b, b, e), r[s++] = b[0], r[s++] = b[1]
      }
    }
    t.increaseVersion()
  }
}
var pf = Math.sqrt,
  Ss = Math.sin,
  bs = Math.cos,
  La = Math.PI;

function gg(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1])
}

function Xc(t, e) {
  return (t[0] * e[0] + t[1] * e[1]) / (gg(t) * gg(e))
}

function yg(t, e) {
  return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(Xc(t, e))
}

function mg(t, e, r, n, i, a, o, s, l, u, f) {
  var c = l * (La / 180),
    h = bs(c) * (t - r) / 2 + Ss(c) * (e - n) / 2,
    v = -1 * Ss(c) * (t - r) / 2 + bs(c) * (e - n) / 2,
    d = h * h / (o * o) + v * v / (s * s);
  d > 1 && (o *= pf(d), s *= pf(d));
  var y = (i === a ? -1 : 1) * pf((o * o * (s * s) - o * o * (v * v) - s * s * (h * h)) / (o * o * (v * v) + s * s * (h * h))) || 0,
    g = y * o * v / s,
    p = y * -s * h / o,
    m = (t + r) / 2 + bs(c) * g - Ss(c) * p,
    _ = (e + n) / 2 + Ss(c) * g + bs(c) * p,
    w = yg([1, 0], [(h - g) / o, (v - p) / s]),
    b = [(h - g) / o, (v - p) / s],
    S = [(-1 * h - g) / o, (-1 * v - p) / s],
    x = yg(b, S);
  if (Xc(b, S) <= -1 && (x = La), Xc(b, S) >= 1 && (x = 0), x < 0) {
    var T = Math.round(x / La * 1e6) / 1e6;
    x = La * 2 + T % 2 * La
  }
  f.addData(u, m, _, o, s, w, x, c, a)
}
var wP = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig,
  SP = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;

function bP(t) {
  var e = new fi;
  if (!t) return e;
  var r = 0,
    n = 0,
    i = r,
    a = n,
    o, s = fi.CMD,
    l = t.match(wP);
  if (!l) return e;
  for (var u = 0; u < l.length; u++) {
    for (var f = l[u], c = f.charAt(0), h = void 0, v = f.match(SP) || [], d = v.length, y = 0; y < d; y++) v[y] = parseFloat(v[y]);
    for (var g = 0; g < d;) {
      var p = void 0,
        m = void 0,
        _ = void 0,
        w = void 0,
        b = void 0,
        S = void 0,
        x = void 0,
        T = r,
        M = n,
        D = void 0,
        I = void 0;
      switch (c) {
        case "l":
          r += v[g++], n += v[g++], h = s.L, e.addData(h, r, n);
          break;
        case "L":
          r = v[g++], n = v[g++], h = s.L, e.addData(h, r, n);
          break;
        case "m":
          r += v[g++], n += v[g++], h = s.M, e.addData(h, r, n), i = r, a = n, c = "l";
          break;
        case "M":
          r = v[g++], n = v[g++], h = s.M, e.addData(h, r, n), i = r, a = n, c = "L";
          break;
        case "h":
          r += v[g++], h = s.L, e.addData(h, r, n);
          break;
        case "H":
          r = v[g++], h = s.L, e.addData(h, r, n);
          break;
        case "v":
          n += v[g++], h = s.L, e.addData(h, r, n);
          break;
        case "V":
          n = v[g++], h = s.L, e.addData(h, r, n);
          break;
        case "C":
          h = s.C, e.addData(h, v[g++], v[g++], v[g++], v[g++], v[g++], v[g++]), r = v[g - 2], n = v[g - 1];
          break;
        case "c":
          h = s.C, e.addData(h, v[g++] + r, v[g++] + n, v[g++] + r, v[g++] + n, v[g++] + r, v[g++] + n), r += v[g - 2], n += v[g - 1];
          break;
        case "S":
          p = r, m = n, D = e.len(), I = e.data, o === s.C && (p += r - I[D - 4], m += n - I[D - 3]), h = s.C, T = v[g++], M = v[g++], r = v[g++], n = v[g++], e.addData(h, p, m, T, M, r, n);
          break;
        case "s":
          p = r, m = n, D = e.len(), I = e.data, o === s.C && (p += r - I[D - 4], m += n - I[D - 3]), h = s.C, T = r + v[g++], M = n + v[g++], r += v[g++], n += v[g++], e.addData(h, p, m, T, M, r, n);
          break;
        case "Q":
          T = v[g++], M = v[g++], r = v[g++], n = v[g++], h = s.Q, e.addData(h, T, M, r, n);
          break;
        case "q":
          T = v[g++] + r, M = v[g++] + n, r += v[g++], n += v[g++], h = s.Q, e.addData(h, T, M, r, n);
          break;
        case "T":
          p = r, m = n, D = e.len(), I = e.data, o === s.Q && (p += r - I[D - 4], m += n - I[D - 3]), r = v[g++], n = v[g++], h = s.Q, e.addData(h, p, m, r, n);
          break;
        case "t":
          p = r, m = n, D = e.len(), I = e.data, o === s.Q && (p += r - I[D - 4], m += n - I[D - 3]), r += v[g++], n += v[g++], h = s.Q, e.addData(h, p, m, r, n);
          break;
        case "A":
          _ = v[g++], w = v[g++], b = v[g++], S = v[g++], x = v[g++], T = r, M = n, r = v[g++], n = v[g++], h = s.A, mg(T, M, r, n, S, x, _, w, b, h, e);
          break;
        case "a":
          _ = v[g++], w = v[g++], b = v[g++], S = v[g++], x = v[g++], T = r, M = n, r += v[g++], n += v[g++], h = s.A, mg(T, M, r, n, S, x, _, w, b, h, e);
          break
      }
    }(c === "z" || c === "Z") && (h = s.Z, e.addData(h), r = i, n = a), o = h
  }
  return e.toStatic(), e
}
var v1 = function (t) {
  J(e, t);

  function e() {
    return t !== null && t.apply(this, arguments) || this
  }
  return e.prototype.applyTransform = function (r) {}, e
}(kt);

function d1(t) {
  return t.setData != null
}

function p1(t, e) {
  var r = bP(t),
    n = q({}, e);
  return n.buildPath = function (i) {
    if (d1(i)) {
      i.setData(r.data);
      var a = i.getContext();
      a && i.rebuildPath(a, 1)
    } else {
      var a = i;
      r.rebuildPath(a, 1)
    }
  }, n.applyTransform = function (i) {
    _P(r, i), this.dirtyShape()
  }, n
}

function xP(t, e) {
  return new v1(p1(t, e))
}

function CP(t, e) {
  var r = p1(t, e),
    n = function (i) {
      J(a, i);

      function a(o) {
        var s = i.call(this, o) || this;
        return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s
      }
      return a
    }(v1);
  return n
}

function TP(t, e) {
  for (var r = [], n = t.length, i = 0; i < n; i++) {
    var a = t[i];
    r.push(a.getUpdatedPathProxy(!0))
  }
  var o = new kt(e);
  return o.createPathProxy(), o.buildPath = function (s) {
    if (d1(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1)
    }
  }, o
}
var MP = function () {
    function t() {
      this.cx = 0, this.cy = 0, this.r = 0
    }
    return t
  }(),
  g1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultShape = function () {
      return new MP
    }, e.prototype.buildPath = function (r, n) {
      r.moveTo(n.cx + n.r, n.cy), r.arc(n.cx, n.cy, n.r, 0, Math.PI * 2)
    }, e
  }(kt);
g1.prototype.type = "circle";
var xv = g1,
  DP = function () {
    function t() {
      this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0
    }
    return t
  }(),
  y1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultShape = function () {
      return new DP
    }, e.prototype.buildPath = function (r, n) {
      var i = .5522848,
        a = n.cx,
        o = n.cy,
        s = n.rx,
        l = n.ry,
        u = s * i,
        f = l * i;
      r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - f, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - f, a + s, o), r.bezierCurveTo(a + s, o + f, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + f, a - s, o), r.closePath()
    }, e
  }(kt);
y1.prototype.type = "ellipse";
var m1 = y1,
  _1 = Math.PI,
  gf = _1 * 2,
  zn = Math.sin,
  Pi = Math.cos,
  AP = Math.acos,
  te = Math.atan2,
  _g = Math.abs,
  ho = Math.sqrt,
  Za = Math.max,
  ur = Math.min,
  Ze = 1e-4;

function PP(t, e, r, n, i, a, o, s) {
  var l = r - t,
    u = n - e,
    f = o - i,
    c = s - a,
    h = c * l - f * u;
  if (!(h * h < Ze)) return h = (f * (e - a) - c * (t - i)) / h, [t + h * l, e + h * u]
}

function xs(t, e, r, n, i, a, o) {
  var s = t - r,
    l = e - n,
    u = (o ? a : -a) / ho(s * s + l * l),
    f = u * l,
    c = -u * s,
    h = t + f,
    v = e + c,
    d = r + f,
    y = n + c,
    g = (h + d) / 2,
    p = (v + y) / 2,
    m = d - h,
    _ = y - v,
    w = m * m + _ * _,
    b = i - a,
    S = h * y - d * v,
    x = (_ < 0 ? -1 : 1) * ho(Za(0, b * b * w - S * S)),
    T = (S * _ - m * x) / w,
    M = (-S * m - _ * x) / w,
    D = (S * _ + m * x) / w,
    I = (-S * m + _ * x) / w,
    A = T - g,
    L = M - p,
    O = D - g,
    H = I - p;
  return A * A + L * L > O * O + H * H && (T = D, M = I), {
    cx: T,
    cy: M,
    x0: -f,
    y0: -c,
    x1: T * (i / b - 1),
    y1: M * (i / b - 1)
  }
}

function IP(t) {
  var e;
  if (et(t)) {
    var r = t.length;
    if (!r) return t;
    r === 1 ? e = [t[0], t[0], 0, 0] : r === 2 ? e = [t[0], t[0], t[1], t[1]] : r === 3 ? e = t.concat(t[2]) : e = t
  } else e = [t, t, t, t];
  return e
}

function EP(t, e) {
  var r, n = Za(e.r, 0),
    i = Za(e.r0 || 0, 0),
    a = n > 0,
    o = i > 0;
  if (!(!a && !o)) {
    if (a || (n = i, i = 0), i > n) {
      var s = n;
      n = i, i = s
    }
    var l = e.startAngle,
      u = e.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var f = e.cx,
        c = e.cy,
        h = !!e.clockwise,
        v = _g(u - l),
        d = v > gf && v % gf;
      if (d > Ze && (v = d), !(n > Ze)) t.moveTo(f, c);
      else if (v > gf - Ze) t.moveTo(f + n * Pi(l), c + n * zn(l)), t.arc(f, c, n, l, u, !h), i > Ze && (t.moveTo(f + i * Pi(u), c + i * zn(u)), t.arc(f, c, i, u, l, h));
      else {
        var y = void 0,
          g = void 0,
          p = void 0,
          m = void 0,
          _ = void 0,
          w = void 0,
          b = void 0,
          S = void 0,
          x = void 0,
          T = void 0,
          M = void 0,
          D = void 0,
          I = void 0,
          A = void 0,
          L = void 0,
          O = void 0,
          H = n * Pi(l),
          B = n * zn(l),
          Q = i * Pi(u),
          G = i * zn(u),
          Z = v > Ze;
        if (Z) {
          var lt = e.cornerRadius;
          lt && (r = IP(lt), y = r[0], g = r[1], p = r[2], m = r[3]);
          var _t = _g(n - i) / 2;
          if (_ = ur(_t, p), w = ur(_t, m), b = ur(_t, y), S = ur(_t, g), M = x = Za(_, w), D = T = Za(b, S), (x > Ze || T > Ze) && (I = n * Pi(u), A = n * zn(u), L = i * Pi(l), O = i * zn(l), v < _1)) {
            var yt = PP(H, B, L, O, I, A, Q, G);
            if (yt) {
              var pt = H - yt[0],
                At = B - yt[1],
                k = I - yt[0],
                W = A - yt[1],
                V = 1 / zn(AP((pt * k + At * W) / (ho(pt * pt + At * At) * ho(k * k + W * W))) / 2),
                tt = ho(yt[0] * yt[0] + yt[1] * yt[1]);
              M = ur(x, (n - tt) / (V + 1)), D = ur(T, (i - tt) / (V - 1))
            }
          }
        }
        if (!Z) t.moveTo(f + H, c + B);
        else if (M > Ze) {
          var vt = ur(p, M),
            ut = ur(m, M),
            Y = xs(L, O, H, B, n, vt, h),
            K = xs(I, A, Q, G, n, ut, h);
          t.moveTo(f + Y.cx + Y.x0, c + Y.cy + Y.y0), M < x && vt === ut ? t.arc(f + Y.cx, c + Y.cy, M, te(Y.y0, Y.x0), te(K.y0, K.x0), !h) : (vt > 0 && t.arc(f + Y.cx, c + Y.cy, vt, te(Y.y0, Y.x0), te(Y.y1, Y.x1), !h), t.arc(f, c, n, te(Y.cy + Y.y1, Y.cx + Y.x1), te(K.cy + K.y1, K.cx + K.x1), !h), ut > 0 && t.arc(f + K.cx, c + K.cy, ut, te(K.y1, K.x1), te(K.y0, K.x0), !h))
        } else t.moveTo(f + H, c + B), t.arc(f, c, n, l, u, !h);
        if (!(i > Ze) || !Z) t.lineTo(f + Q, c + G);
        else if (D > Ze) {
          var vt = ur(y, D),
            ut = ur(g, D),
            Y = xs(Q, G, I, A, i, -ut, h),
            K = xs(H, B, L, O, i, -vt, h);
          t.lineTo(f + Y.cx + Y.x0, c + Y.cy + Y.y0), D < T && vt === ut ? t.arc(f + Y.cx, c + Y.cy, D, te(Y.y0, Y.x0), te(K.y0, K.x0), !h) : (ut > 0 && t.arc(f + Y.cx, c + Y.cy, ut, te(Y.y0, Y.x0), te(Y.y1, Y.x1), !h), t.arc(f, c, i, te(Y.cy + Y.y1, Y.cx + Y.x1), te(K.cy + K.y1, K.cx + K.x1), h), vt > 0 && t.arc(f + K.cx, c + K.cy, vt, te(K.y1, K.x1), te(K.y0, K.x0), !h))
        } else t.lineTo(f + Q, c + G), t.arc(f, c, i, u, l, h)
      }
      t.closePath()
    }
  }
}
var LP = function () {
    function t() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0
    }
    return t
  }(),
  w1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultShape = function () {
      return new LP
    }, e.prototype.buildPath = function (r, n) {
      EP(r, n)
    }, e.prototype.isZeroArea = function () {
      return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0
    }, e
  }(kt);
w1.prototype.type = "sector";
var Cv = w1,
  RP = function () {
    function t() {
      this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0
    }
    return t
  }(),
  S1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultShape = function () {
      return new RP
    }, e.prototype.buildPath = function (r, n) {
      var i = n.cx,
        a = n.cy,
        o = Math.PI * 2;
      r.moveTo(i + n.r, a), r.arc(i, a, n.r, 0, o, !1), r.moveTo(i + n.r0, a), r.arc(i, a, n.r0, 0, o, !0)
    }, e
  }(kt);
S1.prototype.type = "ring";
var b1 = S1;

function OP(t, e, r, n) {
  var i = [],
    a = [],
    o = [],
    s = [],
    l, u, f, c;
  if (n) {
    f = [1 / 0, 1 / 0], c = [-1 / 0, -1 / 0];
    for (var h = 0, v = t.length; h < v; h++) Vi(f, f, t[h]), $i(c, c, t[h]);
    Vi(f, f, n[0]), $i(c, c, n[1])
  }
  for (var h = 0, v = t.length; h < v; h++) {
    var d = t[h];
    if (r) l = t[h ? h - 1 : v - 1], u = t[(h + 1) % v];
    else if (h === 0 || h === v - 1) {
      i.push(iM(t[h]));
      continue
    } else l = t[h - 1], u = t[h + 1];
    aM(a, u, l), Ou(a, a, e);
    var y = Sc(d, l),
      g = Sc(d, u),
      p = y + g;
    p !== 0 && (y /= p, g /= p), Ou(o, a, -y), Ou(s, a, g);
    var m = lp([], d, o),
      _ = lp([], d, s);
    n && ($i(m, m, f), Vi(m, m, c), $i(_, _, f), Vi(_, _, c)), i.push(m), i.push(_)
  }
  return r && i.push(i.shift()), i
}

function x1(t, e, r) {
  var n = e.smooth,
    i = e.points;
  if (i && i.length >= 2) {
    if (n) {
      var a = OP(i, n, r, e.smoothConstraint);
      t.moveTo(i[0][0], i[0][1]);
      for (var o = i.length, s = 0; s < (r ? o : o - 1); s++) {
        var l = a[s * 2],
          u = a[s * 2 + 1],
          f = i[(s + 1) % o];
        t.bezierCurveTo(l[0], l[1], u[0], u[1], f[0], f[1])
      }
    } else {
      t.moveTo(i[0][0], i[0][1]);
      for (var s = 1, c = i.length; s < c; s++) t.lineTo(i[s][0], i[s][1])
    }
    r && t.closePath()
  }
}
var kP = function () {
    function t() {
      this.points = null, this.smooth = 0, this.smoothConstraint = null
    }
    return t
  }(),
  C1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultShape = function () {
      return new kP
    }, e.prototype.buildPath = function (r, n) {
      x1(r, n, !0)
    }, e
  }(kt);
C1.prototype.type = "polygon";
var T1 = C1,
  BP = function () {
    function t() {
      this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null
    }
    return t
  }(),
  M1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      }
    }, e.prototype.getDefaultShape = function () {
      return new BP
    }, e.prototype.buildPath = function (r, n) {
      x1(r, n, !1)
    }, e
  }(kt);
M1.prototype.type = "polyline";
var D1 = M1,
  NP = {},
  FP = function () {
    function t() {
      this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1
    }
    return t
  }(),
  A1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      }
    }, e.prototype.getDefaultShape = function () {
      return new FP
    }, e.prototype.buildPath = function (r, n) {
      var i, a, o, s;
      if (this.subPixelOptimize) {
        var l = J_(NP, n, this.style);
        i = l.x1, a = l.y1, o = l.x2, s = l.y2
      } else i = n.x1, a = n.y1, o = n.x2, s = n.y2;
      var u = n.percent;
      u !== 0 && (r.moveTo(i, a), u < 1 && (o = i * (1 - u) + o * u, s = a * (1 - u) + s * u), r.lineTo(o, s))
    }, e.prototype.pointAt = function (r) {
      var n = this.shape;
      return [n.x1 * (1 - r) + n.x2 * r, n.y1 * (1 - r) + n.y2 * r]
    }, e
  }(kt);
A1.prototype.type = "line";
var ci = A1,
  ve = [],
  zP = function () {
    function t() {
      this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1
    }
    return t
  }();

function wg(t, e, r) {
  var n = t.cpx2,
    i = t.cpy2;
  return n != null || i != null ? [(r ? mp : Xt)(t.x1, t.cpx1, t.cpx2, t.x2, e), (r ? mp : Xt)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(r ? _p : re)(t.x1, t.cpx1, t.x2, e), (r ? _p : re)(t.y1, t.cpy1, t.y2, e)]
}
var P1 = function (t) {
  J(e, t);

  function e(r) {
    return t.call(this, r) || this
  }
  return e.prototype.getDefaultStyle = function () {
    return {
      stroke: "#000",
      fill: null
    }
  }, e.prototype.getDefaultShape = function () {
    return new zP
  }, e.prototype.buildPath = function (r, n) {
    var i = n.x1,
      a = n.y1,
      o = n.x2,
      s = n.y2,
      l = n.cpx1,
      u = n.cpy1,
      f = n.cpx2,
      c = n.cpy2,
      h = n.percent;
    h !== 0 && (r.moveTo(i, a), f == null || c == null ? (h < 1 && (xl(i, l, o, h, ve), l = ve[1], o = ve[2], xl(a, u, s, h, ve), u = ve[1], s = ve[2]), r.quadraticCurveTo(l, u, o, s)) : (h < 1 && (bl(i, l, f, o, h, ve), l = ve[1], f = ve[2], o = ve[3], bl(a, u, c, s, h, ve), u = ve[1], c = ve[2], s = ve[3]), r.bezierCurveTo(l, u, f, c, o, s)))
  }, e.prototype.pointAt = function (r) {
    return wg(this.shape, r, !1)
  }, e.prototype.tangentAt = function (r) {
    var n = wg(this.shape, r, !0);
    return lM(n, n)
  }, e
}(kt);
P1.prototype.type = "bezier-curve";
var I1 = P1,
  HP = function () {
    function t() {
      this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0
    }
    return t
  }(),
  E1 = function (t) {
    J(e, t);

    function e(r) {
      return t.call(this, r) || this
    }
    return e.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      }
    }, e.prototype.getDefaultShape = function () {
      return new HP
    }, e.prototype.buildPath = function (r, n) {
      var i = n.cx,
        a = n.cy,
        o = Math.max(n.r, 0),
        s = n.startAngle,
        l = n.endAngle,
        u = n.clockwise,
        f = Math.cos(s),
        c = Math.sin(s);
      r.moveTo(f * o + i, c * o + a), r.arc(i, a, o, s, l, !u)
    }, e
  }(kt);
E1.prototype.type = "arc";
var Tv = E1,
  VP = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = "compound", r
    }
    return e.prototype._updatePathDirty = function () {
      for (var r = this.shape.paths, n = this.shapeChanged(), i = 0; i < r.length; i++) n = n || r[i].shapeChanged();
      n && this.dirtyShape()
    }, e.prototype.beforeBrush = function () {
      this._updatePathDirty();
      for (var r = this.shape.paths || [], n = this.getGlobalScale(), i = 0; i < r.length; i++) r[i].path || r[i].createPathProxy(), r[i].path.setScale(n[0], n[1], r[i].segmentIgnoreThreshold)
    }, e.prototype.buildPath = function (r, n) {
      for (var i = n.paths || [], a = 0; a < i.length; a++) i[a].buildPath(r, i[a].shape, !0)
    }, e.prototype.afterBrush = function () {
      for (var r = this.shape.paths || [], n = 0; n < r.length; n++) r[n].pathUpdated()
    }, e.prototype.getBoundingRect = function () {
      return this._updatePathDirty.call(this), kt.prototype.getBoundingRect.call(this)
    }, e
  }(kt),
  $P = VP,
  GP = function () {
    function t(e) {
      this.colorStops = e || []
    }
    return t.prototype.addColorStop = function (e, r) {
      this.colorStops.push({
        offset: e,
        color: r
      })
    }, t
  }(),
  L1 = GP,
  WP = function (t) {
    J(e, t);

    function e(r, n, i, a, o, s) {
      var l = t.call(this, o) || this;
      return l.x = r == null ? 0 : r, l.y = n == null ? 0 : n, l.x2 = i == null ? 1 : i, l.y2 = a == null ? 0 : a, l.type = "linear", l.global = s || !1, l
    }
    return e
  }(L1),
  R1 = WP,
  UP = function (t) {
    J(e, t);

    function e(r, n, i, a, o) {
      var s = t.call(this, a) || this;
      return s.x = r == null ? .5 : r, s.y = n == null ? .5 : n, s.r = i == null ? .5 : i, s.type = "radial", s.global = o || !1, s
    }
    return e
  }(L1),
  YP = UP,
  Hn = [0, 0],
  Vn = [0, 0],
  Cs = new Lt,
  Ts = new Lt,
  XP = function () {
    function t(e, r) {
      this._corners = [], this._axes = [], this._origin = [0, 0];
      for (var n = 0; n < 4; n++) this._corners[n] = new Lt;
      for (var n = 0; n < 2; n++) this._axes[n] = new Lt;
      e && this.fromBoundingRect(e, r)
    }
    return t.prototype.fromBoundingRect = function (e, r) {
      var n = this._corners,
        i = this._axes,
        a = e.x,
        o = e.y,
        s = a + e.width,
        l = o + e.height;
      if (n[0].set(a, o), n[1].set(s, o), n[2].set(s, l), n[3].set(a, l), r)
        for (var u = 0; u < 4; u++) n[u].transform(r);
      Lt.sub(i[0], n[1], n[0]), Lt.sub(i[1], n[3], n[0]), i[0].normalize(), i[1].normalize();
      for (var u = 0; u < 2; u++) this._origin[u] = i[u].dot(n[0])
    }, t.prototype.intersect = function (e, r) {
      var n = !0,
        i = !r;
      return Cs.set(1 / 0, 1 / 0), Ts.set(0, 0), !this._intersectCheckOneSide(this, e, Cs, Ts, i, 1) && (n = !1, i) || !this._intersectCheckOneSide(e, this, Cs, Ts, i, -1) && (n = !1, i) || i || Lt.copy(r, n ? Cs : Ts), n
    }, t.prototype._intersectCheckOneSide = function (e, r, n, i, a, o) {
      for (var s = !0, l = 0; l < 2; l++) {
        var u = this._axes[l];
        if (this._getProjMinMaxOnAxis(l, e._corners, Hn), this._getProjMinMaxOnAxis(l, r._corners, Vn), Hn[1] < Vn[0] || Hn[0] > Vn[1]) {
          if (s = !1, a) return s;
          var f = Math.abs(Vn[0] - Hn[1]),
            c = Math.abs(Hn[0] - Vn[1]);
          Math.min(f, c) > i.len() && (f < c ? Lt.scale(i, u, -f * o) : Lt.scale(i, u, c * o))
        } else if (n) {
          var f = Math.abs(Vn[0] - Hn[1]),
            c = Math.abs(Hn[0] - Vn[1]);
          Math.min(f, c) < n.len() && (f < c ? Lt.scale(n, u, f * o) : Lt.scale(n, u, -c * o))
        }
      }
      return s
    }, t.prototype._getProjMinMaxOnAxis = function (e, r, n) {
      for (var i = this._axes[e], a = this._origin, o = r[0].dot(i) + a[e], s = o, l = o, u = 1; u < r.length; u++) {
        var f = r[u].dot(i) + a[e];
        s = Math.min(f, s), l = Math.max(f, l)
      }
      n[0] = s, n[1] = l
    }, t
  }(),
  El = XP,
  qP = [],
  KP = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.notClear = !0, r.incremental = !0, r._displayables = [], r._temporaryDisplayables = [], r._cursor = 0, r
    }
    return e.prototype.traverse = function (r, n) {
      r.call(n, this)
    }, e.prototype.useStyle = function () {
      this.style = {}
    }, e.prototype.getCursor = function () {
      return this._cursor
    }, e.prototype.innerAfterBrush = function () {
      this._cursor = this._displayables.length
    }, e.prototype.clearDisplaybles = function () {
      this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1
    }, e.prototype.clearTemporalDisplayables = function () {
      this._temporaryDisplayables = []
    }, e.prototype.addDisplayable = function (r, n) {
      n ? this._temporaryDisplayables.push(r) : this._displayables.push(r), this.markRedraw()
    }, e.prototype.addDisplayables = function (r, n) {
      n = n || !1;
      for (var i = 0; i < r.length; i++) this.addDisplayable(r[i], n)
    }, e.prototype.getDisplayables = function () {
      return this._displayables
    }, e.prototype.getTemporalDisplayables = function () {
      return this._temporaryDisplayables
    }, e.prototype.eachPendingDisplayable = function (r) {
      for (var n = this._cursor; n < this._displayables.length; n++) r && r(this._displayables[n]);
      for (var n = 0; n < this._temporaryDisplayables.length; n++) r && r(this._temporaryDisplayables[n])
    }, e.prototype.update = function () {
      this.updateTransform();
      for (var r = this._cursor; r < this._displayables.length; r++) {
        var n = this._displayables[r];
        n.parent = this, n.update(), n.parent = null
      }
      for (var r = 0; r < this._temporaryDisplayables.length; r++) {
        var n = this._temporaryDisplayables[r];
        n.parent = this, n.update(), n.parent = null
      }
    }, e.prototype.getBoundingRect = function () {
      if (!this._rect) {
        for (var r = new Ot(1 / 0, 1 / 0, -1 / 0, -1 / 0), n = 0; n < this._displayables.length; n++) {
          var i = this._displayables[n],
            a = i.getBoundingRect().clone();
          i.needLocalTransform() && a.applyTransform(i.getLocalTransform(qP)), r.union(a)
        }
        this._rect = r
      }
      return this._rect
    }, e.prototype.contain = function (r, n) {
      var i = this.transformCoordToLocal(r, n),
        a = this.getBoundingRect();
      if (a.contain(i[0], i[1]))
        for (var o = 0; o < this._displayables.length; o++) {
          var s = this._displayables[o];
          if (s.contain(r, n)) return !0
        }
      return !1
    }, e
  }(Qo),
  ZP = KP,
  jP = Kt();

function QP(t, e, r, n, i) {
  var a;
  if (e && e.ecModel) {
    var o = e.ecModel.getUpdatePayload();
    a = o && o.animation
  }
  var s = e && e.isAnimationEnabled(),
    l = t === "update";
  if (s) {
    var u = void 0,
      f = void 0,
      c = void 0;
    n ? (u = Mt(n.duration, 200), f = Mt(n.easing, "cubicOut"), c = 0) : (u = e.getShallow(l ? "animationDurationUpdate" : "animationDuration"), f = e.getShallow(l ? "animationEasingUpdate" : "animationEasing"), c = e.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (f = a.easing), a.delay != null && (c = a.delay)), dt(c) && (c = c(r, i)), dt(u) && (u = u(r));
    var h = {
      duration: u || 0,
      delay: c,
      easing: f
    };
    return h
  } else return null
}

function Mv(t, e, r, n, i, a, o) {
  var s = !1,
    l;
  dt(i) ? (o = a, a = i, i = null) : st(i) && (a = i.cb, o = i.during, s = i.isFrom, l = i.removeOpt, i = i.dataIndex);
  var u = t === "leave";
  u || e.stopAnimation("leave");
  var f = QP(t, n, i, u ? l || {} : null, n && n.getAnimationDelayParams ? n.getAnimationDelayParams(e, i) : null);
  if (f && f.duration > 0) {
    var c = f.duration,
      h = f.delay,
      v = f.easing,
      d = {
        duration: c,
        delay: h || 0,
        easing: v,
        done: a,
        force: !!a || !!o,
        setToFinal: !u,
        scope: t,
        during: o
      };
    s ? e.animateFrom(r, d) : e.animateTo(r, d)
  } else e.stopAnimation(), !s && e.attr(r), o && o(1), a && a()
}

function wn(t, e, r, n, i, a) {
  Mv("update", t, e, r, n, i, a)
}

function Jo(t, e, r, n, i, a) {
  Mv("enter", t, e, r, n, i, a)
}

function vo(t) {
  if (!t.__zr) return !0;
  for (var e = 0; e < t.animators.length; e++) {
    var r = t.animators[e];
    if (r.scope === "leave") return !0
  }
  return !1
}

function Ll(t, e, r, n, i, a) {
  vo(t) || Mv("leave", t, e, r, n, i, a)
}

function Sg(t, e, r, n) {
  t.removeTextContent(), t.removeTextGuideLine(), Ll(t, {
    style: {
      opacity: 0
    }
  }, e, r, n)
}

function JP(t, e, r) {
  function n() {
    t.parent && t.parent.remove(t)
  }
  t.isGroup ? t.traverse(function (i) {
    i.isGroup || Sg(i, e, r, n)
  }) : Sg(t, e, r, n)
}

function tI(t) {
  jP(t).oldStyle = t.style
}
var Rl = Math.max,
  Ol = Math.min,
  qc = {};

function eI(t) {
  return kt.extend(t)
}
var rI = CP;

function nI(t, e) {
  return rI(t, e)
}

function nr(t, e) {
  qc[t] = e
}

function iI(t) {
  if (qc.hasOwnProperty(t)) return qc[t]
}

function Dv(t, e, r, n) {
  var i = xP(t, e);
  return r && (n === "center" && (r = k1(r, i.getBoundingRect())), B1(i, r)), i
}

function O1(t, e, r) {
  var n = new pi({
    style: {
      image: t,
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height
    },
    onload: function (i) {
      if (r === "center") {
        var a = {
          width: i.width,
          height: i.height
        };
        n.setStyle(k1(e, a))
      }
    }
  });
  return n
}

function k1(t, e) {
  var r = e.width / e.height,
    n = t.height * r,
    i;
  n <= t.width ? i = t.height : (n = t.width, i = n / r);
  var a = t.x + t.width / 2,
    o = t.y + t.height / 2;
  return {
    x: a - n / 2,
    y: o - i / 2,
    width: n,
    height: i
  }
}
var aI = TP;

function B1(t, e) {
  if (!!t.applyTransform) {
    var r = t.getBoundingRect(),
      n = r.calculateTransform(e);
    t.applyTransform(n)
  }
}

function oI(t) {
  return J_(t.shape, t.shape, t.style), t
}

function sI(t) {
  return t1(t.shape, t.shape, t.style), t
}
var lI = Jn;

function uI(t, e) {
  for (var r = lv([]); t && t !== e;) ji(r, t.getLocalTransform(), r), t = t.parent;
  return r
}

function Av(t, e, r) {
  return e && !we(e) && (e = cv.getLocalTransform(e)), r && (e = fv([], e)), Ye([], t, e)
}

function fI(t, e, r) {
  var n = e[4] === 0 || e[5] === 0 || e[0] === 0 ? 1 : Math.abs(2 * e[4] / e[0]),
    i = e[4] === 0 || e[5] === 0 || e[2] === 0 ? 1 : Math.abs(2 * e[4] / e[2]),
    a = [t === "left" ? -n : t === "right" ? n : 0, t === "top" ? -i : t === "bottom" ? i : 0];
  return a = Av(a, e, r), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top"
}

function bg(t) {
  return !t.isGroup
}

function cI(t) {
  return t.shape != null
}

function N1(t, e, r) {
  if (!t || !e) return;

  function n(o) {
    var s = {};
    return o.traverse(function (l) {
      bg(l) && l.anid && (s[l.anid] = l)
    }), s
  }

  function i(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return cI(o) && (s.shape = q({}, o.shape)), s
  }
  var a = n(t);
  e.traverse(function (o) {
    if (bg(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = i(o);
        o.attr(i(s)), wn(o, l, r, Bt(o).dataIndex)
      }
    }
  })
}

function hI(t, e) {
  return ct(t, function (r) {
    var n = r[0];
    n = Rl(n, e.x), n = Ol(n, e.x + e.width);
    var i = r[1];
    return i = Rl(i, e.y), i = Ol(i, e.y + e.height), [n, i]
  })
}

function vI(t, e) {
  var r = Rl(t.x, e.x),
    n = Ol(t.x + t.width, e.x + e.width),
    i = Rl(t.y, e.y),
    a = Ol(t.y + t.height, e.y + e.height);
  if (n >= r && a >= i) return {
    x: r,
    y: i,
    width: n - r,
    height: a - i
  }
}

function Pv(t, e, r) {
  var n = q({
      rectHover: !0
    }, e),
    i = n.style = {
      strokeNoScale: !0
    };
  if (r = r || {
      x: -1,
      y: -1,
      width: 2,
      height: 2
    }, t) return t.indexOf("image://") === 0 ? (i.image = t.slice(8), Dt(i, r), new pi(n)) : Dv(t.replace("path://", ""), n, r, "center")
}

function dI(t, e, r, n, i) {
  for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
    var s = i[a];
    if (F1(t, e, r, n, s[0], s[1], o[0], o[1])) return !0;
    o = s
  }
}

function F1(t, e, r, n, i, a, o, s) {
  var l = r - t,
    u = n - e,
    f = o - i,
    c = s - a,
    h = yf(f, c, l, u);
  if (pI(h)) return !1;
  var v = t - i,
    d = e - a,
    y = yf(v, d, l, u) / h;
  if (y < 0 || y > 1) return !1;
  var g = yf(v, d, f, c) / h;
  return !(g < 0 || g > 1)
}

function yf(t, e, r, n) {
  return t * n - r * e
}

function pI(t) {
  return t <= 1e-6 && t >= -1e-6
}

function Iv(t) {
  var e = t.itemTooltipOption,
    r = t.componentModel,
    n = t.itemName,
    i = nt(e) ? {
      formatter: e
    } : e,
    a = r.mainType,
    o = r.componentIndex,
    s = {
      componentType: a,
      name: n,
      $vars: ["name"]
    };
  s[a + "Index"] = o;
  var l = t.formatterParamsExtra;
  l && P(Vt(l), function (f) {
    oa(s, f) || (s[f] = l[f], s.$vars.push(f))
  });
  var u = Bt(t.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: n,
    option: Dt({
      content: n,
      formatterParams: s
    }, i)
  }
}

function xg(t, e) {
  var r;
  t.isGroup && (r = e(t)), r || t.traverse(e)
}

function Ev(t, e) {
  if (t)
    if (et(t))
      for (var r = 0; r < t.length; r++) xg(t[r], e);
    else xg(t, e)
}
nr("circle", xv);
nr("ellipse", m1);
nr("sector", Cv);
nr("ring", b1);
nr("polygon", T1);
nr("polyline", D1);
nr("rect", Qt);
nr("line", ci);
nr("bezierCurve", I1);
nr("arc", Tv);
var gI = Object.freeze(Object.defineProperty({
    __proto__: null,
    updateProps: wn,
    initProps: Jo,
    removeElement: Ll,
    removeElementWithFadeOut: JP,
    isElementRemoved: vo,
    extendShape: eI,
    extendPath: nI,
    registerShape: nr,
    getShapeClass: iI,
    makePath: Dv,
    makeImage: O1,
    mergePath: aI,
    resizePath: B1,
    subPixelOptimizeLine: oI,
    subPixelOptimizeRect: sI,
    subPixelOptimize: lI,
    getTransform: uI,
    applyTransform: Av,
    transformDirection: fI,
    groupTransition: N1,
    clipPointsByRect: hI,
    clipRectByRect: vI,
    createIcon: Pv,
    linePolygonIntersect: dI,
    lineLineIntersect: F1,
    setTooltipConfig: Iv,
    traverseElements: Ev,
    Group: ce,
    Image: pi,
    Text: he,
    Circle: xv,
    Ellipse: m1,
    Sector: Cv,
    Ring: b1,
    Polygon: T1,
    Polyline: D1,
    Rect: Qt,
    Line: ci,
    BezierCurve: I1,
    Arc: Tv,
    IncrementalDisplayable: ZP,
    CompoundPath: $P,
    LinearGradient: R1,
    RadialGradient: YP,
    BoundingRect: Ot,
    OrientedBoundingRect: El,
    Point: Lt,
    Path: kt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  fu = {};

function yI(t, e) {
  for (var r = 0; r < yr.length; r++) {
    var n = yr[r],
      i = e[n],
      a = t.ensureState(n);
    a.style = a.style || {}, a.style.text = i
  }
  var o = t.currentStates.slice();
  t.clearStates(!0), t.setStyle({
    text: e.normal
  }), t.useStates(o, !0)
}

function Cg(t, e, r) {
  var n = t.labelFetcher,
    i = t.labelDataIndex,
    a = t.labelDimIndex,
    o = e.normal,
    s;
  n && (s = n.getFormattedLabel(i, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = dt(t.defaultText) ? t.defaultText(i, t, r) : t.defaultText);
  for (var l = {
      normal: s
    }, u = 0; u < yr.length; u++) {
    var f = yr[u],
      c = e[f];
    l[f] = Mt(n ? n.getFormattedLabel(i, f, null, a, c && c.get("formatter")) : null, s)
  }
  return l
}

function Lv(t, e, r, n) {
  r = r || fu;
  for (var i = t instanceof he, a = !1, o = 0; o < ig.length; o++) {
    var s = e[ig[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break
    }
  }
  var l = i ? t : t.getTextContent();
  if (a) {
    i || (l || (l = new he, t.setTextContent(l)), t.stateProxy && (l.stateProxy = t.stateProxy));
    var u = Cg(r, e),
      f = e.normal,
      c = !!f.getShallow("show"),
      h = Sn(f, n && n.normal, r, !1, !i);
    h.text = u.normal, i || t.setTextConfig(Tg(f, r, !1));
    for (var o = 0; o < yr.length; o++) {
      var v = yr[o],
        s = e[v];
      if (s) {
        var d = l.ensureState(v),
          y = !!Mt(s.getShallow("show"), c);
        if (y !== c && (d.ignore = !y), d.style = Sn(s, n && n[v], r, !0, !i), d.style.text = u[v], !i) {
          var g = t.ensureState(v);
          g.textConfig = Tg(s, r, !0)
        }
      }
    }
    l.silent = !!f.getShallow("silent"), l.style.x != null && (h.x = l.style.x), l.style.y != null && (h.y = l.style.y), l.ignore = !c, l.useStyle(h), l.dirty(), r.enableTextSetter && (z1(l).setLabelText = function (p) {
      var m = Cg(r, e, p);
      yI(l, m)
    })
  } else l && (l.ignore = !0);
  t.dirty()
}

function Rv(t, e) {
  e = e || "label";
  for (var r = {
      normal: t.getModel(e)
    }, n = 0; n < yr.length; n++) {
    var i = yr[n];
    r[i] = t.getModel([i, e])
  }
  return r
}

function Sn(t, e, r, n, i) {
  var a = {};
  return mI(a, t, r, n, i), e && q(a, e), a
}

function Tg(t, e, r) {
  e = e || {};
  var n = {},
    i, a = t.getShallow("rotate"),
    o = Mt(t.getShallow("distance"), r ? null : 5),
    s = t.getShallow("offset");
  return i = t.getShallow("position") || (r ? null : "inside"), i === "outside" && (i = e.defaultOutsidePosition || "top"), i != null && (n.position = i), s != null && (n.offset = s), a != null && (a *= Math.PI / 180, n.rotation = a), o != null && (n.distance = o), n.outsideFill = t.get("color") === "inherit" ? e.inheritColor || null : "auto", n
}

function mI(t, e, r, n, i) {
  r = r || fu;
  var a = e.ecModel,
    o = a && a.option.textStyle,
    s = _I(e),
    l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var f = e.getModel(["rich", u]);
        Pg(l[u] = {}, f, o, r, n, i, !1, !0)
      }
  }
  l && (t.rich = l);
  var c = e.get("overflow");
  c && (t.overflow = c);
  var h = e.get("minMargin");
  h != null && (t.margin = h), Pg(t, e, o, r, n, i, !0, !1)
}

function _I(t) {
  for (var e; t && t !== t.ecModel;) {
    var r = (t.option || fu).rich;
    if (r) {
      e = e || {};
      for (var n = Vt(r), i = 0; i < n.length; i++) {
        var a = n[i];
        e[a] = 1
      }
    }
    t = t.parentModel
  }
  return e
}
var Mg = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"],
  Dg = ["align", "lineHeight", "width", "height", "tag", "verticalAlign"],
  Ag = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];

function Pg(t, e, r, n, i, a, o, s) {
  r = !i && r || fu;
  var l = n && n.inheritColor,
    u = e.getShallow("color"),
    f = e.getShallow("textBorderColor"),
    c = Mt(e.getShallow("opacity"), r.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (f === "inherit" || f === "auto") && (l ? f = l : f = null), a || (u = u || r.color, f = f || r.textBorderColor), u != null && (t.fill = u), f != null && (t.stroke = f);
  var h = Mt(e.getShallow("textBorderWidth"), r.textBorderWidth);
  h != null && (t.lineWidth = h);
  var v = Mt(e.getShallow("textBorderType"), r.textBorderType);
  v != null && (t.lineDash = v);
  var d = Mt(e.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  d != null && (t.lineDashOffset = d), !i && c == null && !s && (c = n && n.defaultOpacity), c != null && (t.opacity = c), !i && !a && t.fill == null && n.inheritColor && (t.fill = n.inheritColor);
  for (var y = 0; y < Mg.length; y++) {
    var g = Mg[y],
      p = Mt(e.getShallow(g), r[g]);
    p != null && (t[g] = p)
  }
  for (var y = 0; y < Dg.length; y++) {
    var g = Dg[y],
      p = e.getShallow(g);
    p != null && (t[g] = p)
  }
  if (t.verticalAlign == null) {
    var m = e.getShallow("baseline");
    m != null && (t.verticalAlign = m)
  }
  if (!o || !n.disableBox) {
    for (var y = 0; y < Ag.length; y++) {
      var g = Ag[y],
        p = e.getShallow(g);
      p != null && (t[g] = p)
    }
    var _ = e.getShallow("borderType");
    _ != null && (t.borderDash = _), (t.backgroundColor === "auto" || t.backgroundColor === "inherit") && l && (t.backgroundColor = l), (t.borderColor === "auto" || t.borderColor === "inherit") && l && (t.borderColor = l)
  }
}

function wI(t, e) {
  var r = e && e.getModel("textStyle");
  return vr([t.fontStyle || r && r.getShallow("fontStyle") || "", t.fontWeight || r && r.getShallow("fontWeight") || "", (t.fontSize || r && r.getShallow("fontSize") || 12) + "px", t.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"].join(" "))
}
var z1 = Kt(),
  SI = ["textStyle", "color"],
  mf = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"],
  _f = new he,
  bI = function () {
    function t() {}
    return t.prototype.getTextColor = function (e) {
      var r = this.ecModel;
      return this.getShallow("color") || (!e && r ? r.get(SI) : null)
    }, t.prototype.getFont = function () {
      return wI({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel)
    }, t.prototype.getTextRect = function (e) {
      for (var r = {
          text: e,
          verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
        }, n = 0; n < mf.length; n++) r[mf[n]] = this.getShallow(mf[n]);
      return _f.useStyle(r), _f.update(), _f.getBoundingRect()
    }, t
  }(),
  xI = bI,
  H1 = [
    ["lineWidth", "width"],
    ["stroke", "color"],
    ["opacity"],
    ["shadowBlur"],
    ["shadowOffsetX"],
    ["shadowOffsetY"],
    ["shadowColor"],
    ["lineDash", "type"],
    ["lineDashOffset", "dashOffset"],
    ["lineCap", "cap"],
    ["lineJoin", "join"],
    ["miterLimit"]
  ],
  CI = Oo(H1),
  TI = function () {
    function t() {}
    return t.prototype.getLineStyle = function (e) {
      return CI(this, e)
    }, t
  }(),
  V1 = [
    ["fill", "color"],
    ["stroke", "borderColor"],
    ["lineWidth", "borderWidth"],
    ["opacity"],
    ["shadowBlur"],
    ["shadowOffsetX"],
    ["shadowOffsetY"],
    ["shadowColor"],
    ["lineDash", "borderType"],
    ["lineDashOffset", "borderDashOffset"],
    ["lineCap", "borderCap"],
    ["lineJoin", "borderJoin"],
    ["miterLimit", "borderMiterLimit"]
  ],
  MI = Oo(V1),
  DI = function () {
    function t() {}
    return t.prototype.getItemStyle = function (e, r) {
      return MI(this, e, r)
    }, t
  }(),
  gi = function () {
    function t(e, r, n) {
      this.parentModel = r, this.ecModel = n, this.option = e
    }
    return t.prototype.init = function (e, r, n) {
      for (var i = [], a = 3; a < arguments.length; a++) i[a - 3] = arguments[a]
    }, t.prototype.mergeOption = function (e, r) {
      Tt(this.option, e, !0)
    }, t.prototype.get = function (e, r) {
      return e == null ? this.option : this._doGet(this.parsePath(e), !r && this.parentModel)
    }, t.prototype.getShallow = function (e, r) {
      var n = this.option,
        i = n == null ? n : n[e];
      if (i == null && !r) {
        var a = this.parentModel;
        a && (i = a.getShallow(e))
      }
      return i
    }, t.prototype.getModel = function (e, r) {
      var n = e != null,
        i = n ? this.parsePath(e) : null,
        a = n ? this._doGet(i) : this.option;
      return r = r || this.parentModel && this.parentModel.getModel(this.resolveParentPath(i)), new t(a, r, this.ecModel)
    }, t.prototype.isEmpty = function () {
      return this.option == null
    }, t.prototype.restoreData = function () {}, t.prototype.clone = function () {
      var e = this.constructor;
      return new e(St(this.option))
    }, t.prototype.parsePath = function (e) {
      return typeof e == "string" ? e.split(".") : e
    }, t.prototype.resolveParentPath = function (e) {
      return e
    }, t.prototype.isAnimationEnabled = function () {
      if (!mt.node && this.option) {
        if (this.option.animation != null) return !!this.option.animation;
        if (this.parentModel) return this.parentModel.isAnimationEnabled()
      }
    }, t.prototype._doGet = function (e, r) {
      var n = this.option;
      if (!e) return n;
      for (var i = 0; i < e.length && !(!!e[i] && (n = n && typeof n == "object" ? n[e[i]] : null, n == null)); i++);
      return n == null && r && (n = r._doGet(this.resolveParentPath(e), r.parentModel)), n
    }, t
  }();
mv(gi);
tA(gi);
mr(gi, TI);
mr(gi, DI);
mr(gi, aA);
mr(gi, xI);
var ae = gi,
  AI = Math.round(Math.random() * 10);

function cu(t) {
  return [t || "", AI++].join("_")
}

function PI(t) {
  var e = {};
  t.registerSubTypeDefaulter = function (r, n) {
    var i = dr(r);
    e[i.main] = n
  }, t.determineSubType = function (r, n) {
    var i = n.type;
    if (!i) {
      var a = dr(r).main;
      t.hasSubTypes(r) && e[a] && (i = e[a](n))
    }
    return i
  }
}

function II(t, e) {
  t.topologicalTravel = function (a, o, s, l) {
    if (!a.length) return;
    var u = r(o),
      f = u.graph,
      c = u.noEntryList,
      h = {};
    for (P(a, function (m) {
        h[m] = !0
      }); c.length;) {
      var v = c.pop(),
        d = f[v],
        y = !!h[v];
      y && (s.call(l, v, d.originalDeps.slice()), delete h[v]), P(d.successor, y ? p : g)
    }
    P(h, function () {
      var m = "";
      throw new Error(m)
    });

    function g(m) {
      f[m].entryCount--, f[m].entryCount === 0 && c.push(m)
    }

    function p(m) {
      h[m] = !0, g(m)
    }
  };

  function r(a) {
    var o = {},
      s = [];
    return P(a, function (l) {
      var u = n(o, l),
        f = u.originalDeps = e(l),
        c = i(f, a);
      u.entryCount = c.length, u.entryCount === 0 && s.push(l), P(c, function (h) {
        Pt(u.predecessor, h) < 0 && u.predecessor.push(h);
        var v = n(o, h);
        Pt(v.successor, h) < 0 && v.successor.push(l)
      })
    }), {
      graph: o,
      noEntryList: s
    }
  }

  function n(a, o) {
    return a[o] || (a[o] = {
      predecessor: [],
      successor: []
    }), a[o]
  }

  function i(a, o) {
    var s = [];
    return P(a, function (l) {
      Pt(o, l) >= 0 && s.push(l)
    }), s
  }
}

function EI(t, e) {
  return Tt(Tt({}, t, !0), e, !0)
}
var LI = {
    time: {
      month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    legend: {
      selector: {
        all: "All",
        inverse: "Inv"
      }
    },
    toolbox: {
      brush: {
        title: {
          rect: "Box Select",
          polygon: "Lasso Select",
          lineX: "Horizontally Select",
          lineY: "Vertically Select",
          keep: "Keep Selections",
          clear: "Clear Selections"
        }
      },
      dataView: {
        title: "Data View",
        lang: ["Data View", "Close", "Refresh"]
      },
      dataZoom: {
        title: {
          zoom: "Zoom",
          back: "Zoom Reset"
        }
      },
      magicType: {
        title: {
          line: "Switch to Line Chart",
          bar: "Switch to Bar Chart",
          stack: "Stack",
          tiled: "Tile"
        }
      },
      restore: {
        title: "Restore"
      },
      saveAsImage: {
        title: "Save as Image",
        lang: ["Right Click to Save Image"]
      }
    },
    series: {
      typeNames: {
        pie: "Pie chart",
        bar: "Bar chart",
        line: "Line chart",
        scatter: "Scatter plot",
        effectScatter: "Ripple scatter plot",
        radar: "Radar chart",
        tree: "Tree",
        treemap: "Treemap",
        boxplot: "Boxplot",
        candlestick: "Candlestick",
        k: "K line chart",
        heatmap: "Heat map",
        map: "Map",
        parallel: "Parallel coordinate map",
        lines: "Line graph",
        graph: "Relationship graph",
        sankey: "Sankey diagram",
        funnel: "Funnel chart",
        gauge: "Gauge",
        pictorialBar: "Pictorial bar",
        themeRiver: "Theme River Map",
        sunburst: "Sunburst"
      }
    },
    aria: {
      general: {
        withTitle: 'This is a chart about "{title}"',
        withoutTitle: "This is a chart"
      },
      series: {
        single: {
          prefix: "",
          withName: " with type {seriesType} named {seriesName}.",
          withoutName: " with type {seriesType}."
        },
        multiple: {
          prefix: ". It consists of {seriesCount} series count.",
          withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
          withoutName: " The {seriesId} series is a {seriesType}.",
          separator: {
            middle: "",
            end: ""
          }
        }
      },
      data: {
        allData: "The data is as follows: ",
        partialData: "The first {displayCnt} items are: ",
        withName: "the data for {name} is {value}",
        withoutName: "{value}",
        separator: {
          middle: ", ",
          end: ". "
        }
      }
    }
  },
  RI = {
    time: {
      month: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
      monthAbbr: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
      dayOfWeek: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"],
      dayOfWeekAbbr: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"]
    },
    legend: {
      selector: {
        all: "\u5168\u9009",
        inverse: "\u53CD\u9009"
      }
    },
    toolbox: {
      brush: {
        title: {
          rect: "\u77E9\u5F62\u9009\u62E9",
          polygon: "\u5708\u9009",
          lineX: "\u6A2A\u5411\u9009\u62E9",
          lineY: "\u7EB5\u5411\u9009\u62E9",
          keep: "\u4FDD\u6301\u9009\u62E9",
          clear: "\u6E05\u9664\u9009\u62E9"
        }
      },
      dataView: {
        title: "\u6570\u636E\u89C6\u56FE",
        lang: ["\u6570\u636E\u89C6\u56FE", "\u5173\u95ED", "\u5237\u65B0"]
      },
      dataZoom: {
        title: {
          zoom: "\u533A\u57DF\u7F29\u653E",
          back: "\u533A\u57DF\u7F29\u653E\u8FD8\u539F"
        }
      },
      magicType: {
        title: {
          line: "\u5207\u6362\u4E3A\u6298\u7EBF\u56FE",
          bar: "\u5207\u6362\u4E3A\u67F1\u72B6\u56FE",
          stack: "\u5207\u6362\u4E3A\u5806\u53E0",
          tiled: "\u5207\u6362\u4E3A\u5E73\u94FA"
        }
      },
      restore: {
        title: "\u8FD8\u539F"
      },
      saveAsImage: {
        title: "\u4FDD\u5B58\u4E3A\u56FE\u7247",
        lang: ["\u53F3\u952E\u53E6\u5B58\u4E3A\u56FE\u7247"]
      }
    },
    series: {
      typeNames: {
        pie: "\u997C\u56FE",
        bar: "\u67F1\u72B6\u56FE",
        line: "\u6298\u7EBF\u56FE",
        scatter: "\u6563\u70B9\u56FE",
        effectScatter: "\u6D9F\u6F2A\u6563\u70B9\u56FE",
        radar: "\u96F7\u8FBE\u56FE",
        tree: "\u6811\u56FE",
        treemap: "\u77E9\u5F62\u6811\u56FE",
        boxplot: "\u7BB1\u578B\u56FE",
        candlestick: "K\u7EBF\u56FE",
        k: "K\u7EBF\u56FE",
        heatmap: "\u70ED\u529B\u56FE",
        map: "\u5730\u56FE",
        parallel: "\u5E73\u884C\u5750\u6807\u56FE",
        lines: "\u7EBF\u56FE",
        graph: "\u5173\u7CFB\u56FE",
        sankey: "\u6851\u57FA\u56FE",
        funnel: "\u6F0F\u6597\u56FE",
        gauge: "\u4EEA\u8868\u76D8\u56FE",
        pictorialBar: "\u8C61\u5F62\u67F1\u56FE",
        themeRiver: "\u4E3B\u9898\u6CB3\u6D41\u56FE",
        sunburst: "\u65ED\u65E5\u56FE"
      }
    },
    aria: {
      general: {
        withTitle: "\u8FD9\u662F\u4E00\u4E2A\u5173\u4E8E\u201C{title}\u201D\u7684\u56FE\u8868\u3002",
        withoutTitle: "\u8FD9\u662F\u4E00\u4E2A\u56FE\u8868\uFF0C"
      },
      series: {
        single: {
          prefix: "",
          withName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\uFF0C\u8868\u793A{seriesName}\u3002",
          withoutName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\u3002"
        },
        multiple: {
          prefix: "\u5B83\u7531{seriesCount}\u4E2A\u56FE\u8868\u7CFB\u5217\u7EC4\u6210\u3002",
          withName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A\u8868\u793A{seriesName}\u7684{seriesType}\uFF0C",
          withoutName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A{seriesType}\uFF0C",
          separator: {
            middle: "\uFF1B",
            end: "\u3002"
          }
        }
      },
      data: {
        allData: "\u5176\u6570\u636E\u662F\u2014\u2014",
        partialData: "\u5176\u4E2D\uFF0C\u524D{displayCnt}\u9879\u662F\u2014\u2014",
        withName: "{name}\u7684\u6570\u636E\u662F{value}",
        withoutName: "{value}",
        separator: {
          middle: "\uFF0C",
          end: ""
        }
      }
    }
  },
  kl = "ZH",
  Ov = "EN",
  ko = Ov,
  ol = {},
  kv = {},
  $1 = mt.domSupported ? function () {
    var t = (document.documentElement.lang || navigator.language || navigator.browserLanguage).toUpperCase();
    return t.indexOf(kl) > -1 ? kl : ko
  }() : ko;

function G1(t, e) {
  t = t.toUpperCase(), kv[t] = new ae(e), ol[t] = e
}

function OI(t) {
  if (nt(t)) {
    var e = ol[t.toUpperCase()] || {};
    return t === kl || t === Ov ? St(e) : Tt(St(e), St(ol[ko]), !1)
  } else return Tt(St(t), St(ol[ko]), !1)
}

function kI(t) {
  return kv[t]
}

function BI() {
  return kv[ko]
}
G1(Ov, LI);
G1(kl, RI);
var Bv = 1e3,
  Nv = Bv * 60,
  po = Nv * 60,
  We = po * 24,
  Ig = We * 365,
  ja = {
    year: "{yyyy}",
    month: "{MMM}",
    day: "{d}",
    hour: "{HH}:{mm}",
    minute: "{HH}:{mm}",
    second: "{HH}:{mm}:{ss}",
    millisecond: "{HH}:{mm}:{ss} {SSS}",
    none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
  },
  Ms = "{yyyy}-{MM}-{dd}",
  Eg = {
    year: "{yyyy}",
    month: "{yyyy}-{MM}",
    day: Ms,
    hour: Ms + " " + ja.hour,
    minute: Ms + " " + ja.minute,
    second: Ms + " " + ja.second,
    millisecond: ja.none
  },
  wf = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  W1 = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];

function $n(t, e) {
  return t += "", "0000".substr(0, e - t.length) + t
}

function Qi(t) {
  switch (t) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return t
  }
}

function NI(t) {
  return t === Qi(t)
}

function FI(t) {
  switch (t) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second"
  }
}

function hu(t, e, r, n) {
  var i = kr(t),
    a = i[Fv(r)](),
    o = i[Ji(r)]() + 1,
    s = Math.floor((o - 1) / 4) + 1,
    l = i[vu(r)](),
    u = i["get" + (r ? "UTC" : "") + "Day"](),
    f = i[Bo(r)](),
    c = (f - 1) % 12 + 1,
    h = i[du(r)](),
    v = i[pu(r)](),
    d = i[gu(r)](),
    y = n instanceof ae ? n : kI(n || $1) || BI(),
    g = y.getModel("time"),
    p = g.get("month"),
    m = g.get("monthAbbr"),
    _ = g.get("dayOfWeek"),
    w = g.get("dayOfWeekAbbr");
  return (e || "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, a % 100 + "").replace(/{Q}/g, s + "").replace(/{MMMM}/g, p[o - 1]).replace(/{MMM}/g, m[o - 1]).replace(/{MM}/g, $n(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, $n(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, _[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, $n(f, 2)).replace(/{H}/g, f + "").replace(/{hh}/g, $n(c + "", 2)).replace(/{h}/g, c + "").replace(/{mm}/g, $n(h, 2)).replace(/{m}/g, h + "").replace(/{ss}/g, $n(v, 2)).replace(/{s}/g, v + "").replace(/{SSS}/g, $n(d, 3)).replace(/{S}/g, d + "")
}

function zI(t, e, r, n, i) {
  var a = null;
  if (nt(r)) a = r;
  else if (dt(r)) a = r(t.value, e, {
    level: t.level
  });
  else {
    var o = q({}, ja);
    if (t.level > 0)
      for (var s = 0; s < wf.length; ++s) o[wf[s]] = "{primary|" + o[wf[s]] + "}";
    var l = r ? r.inherit === !1 ? r : Dt(r, o) : o,
      u = U1(t.value, i);
    if (l[u]) a = l[u];
    else if (l.inherit) {
      for (var f = W1.indexOf(u), s = f - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break
        } a = a || o.none
    }
    if (et(a)) {
      var c = t.level == null ? 0 : t.level >= 0 ? t.level : a.length + t.level;
      c = Math.min(c, a.length - 1), a = a[c]
    }
  }
  return hu(new Date(t.value), a, i, n)
}

function U1(t, e) {
  var r = kr(t),
    n = r[Ji(e)]() + 1,
    i = r[vu(e)](),
    a = r[Bo(e)](),
    o = r[du(e)](),
    s = r[pu(e)](),
    l = r[gu(e)](),
    u = l === 0,
    f = u && s === 0,
    c = f && o === 0,
    h = c && a === 0,
    v = h && i === 1,
    d = v && n === 1;
  return d ? "year" : v ? "month" : h ? "day" : c ? "hour" : f ? "minute" : u ? "second" : "millisecond"
}

function Lg(t, e, r) {
  var n = $t(t) ? kr(t) : t;
  switch (e = e || U1(t, r), e) {
    case "year":
      return n[Fv(r)]();
    case "half-year":
      return n[Ji(r)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((n[Ji(r)]() + 1) / 4);
    case "month":
      return n[Ji(r)]();
    case "day":
      return n[vu(r)]();
    case "half-day":
      return n[Bo(r)]() / 24;
    case "hour":
      return n[Bo(r)]();
    case "minute":
      return n[du(r)]();
    case "second":
      return n[pu(r)]();
    case "millisecond":
      return n[gu(r)]()
  }
}

function Fv(t) {
  return t ? "getUTCFullYear" : "getFullYear"
}

function Ji(t) {
  return t ? "getUTCMonth" : "getMonth"
}

function vu(t) {
  return t ? "getUTCDate" : "getDate"
}

function Bo(t) {
  return t ? "getUTCHours" : "getHours"
}

function du(t) {
  return t ? "getUTCMinutes" : "getMinutes"
}

function pu(t) {
  return t ? "getUTCSeconds" : "getSeconds"
}

function gu(t) {
  return t ? "getUTCMilliseconds" : "getMilliseconds"
}

function HI(t) {
  return t ? "setUTCFullYear" : "setFullYear"
}

function Y1(t) {
  return t ? "setUTCMonth" : "setMonth"
}

function X1(t) {
  return t ? "setUTCDate" : "setDate"
}

function q1(t) {
  return t ? "setUTCHours" : "setHours"
}

function K1(t) {
  return t ? "setUTCMinutes" : "setMinutes"
}

function Z1(t) {
  return t ? "setUTCSeconds" : "setSeconds"
}

function j1(t) {
  return t ? "setUTCMilliseconds" : "setMilliseconds"
}

function Q1(t) {
  if (!RD(t)) return nt(t) ? t : "-";
  var e = (t + "").split(".");
  return e[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (e.length > 1 ? "." + e[1] : "")
}

function J1(t, e) {
  return t = (t || "").toLowerCase().replace(/-(.)/g, function (r, n) {
    return n.toUpperCase()
  }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t
}
var yu = u_,
  VI = /([&<>"'])/g,
  $I = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

function Ge(t) {
  return t == null ? "" : (t + "").replace(VI, function (e, r) {
    return $I[r]
  })
}

function Kc(t, e, r) {
  var n = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";

  function i(f) {
    return f && vr(f) ? f : "-"
  }

  function a(f) {
    return !!(f != null && !isNaN(f) && isFinite(f))
  }
  var o = e === "time",
    s = t instanceof Date;
  if (o || s) {
    var l = o ? kr(t) : t;
    if (isNaN(+l)) {
      if (s) return "-"
    } else return hu(l, n, r)
  }
  if (e === "ordinal") return _c(t) ? i(t) : $t(t) && a(t) ? t + "" : "-";
  var u = Al(t);
  return a(u) ? Q1(u) : _c(t) ? i(t) : typeof t == "boolean" ? t + "" : "-"
}
var Rg = ["a", "b", "c", "d", "e", "f", "g"],
  Sf = function (t, e) {
    return "{" + t + (e == null ? "" : e) + "}"
  };

function tw(t, e, r) {
  et(e) || (e = [e]);
  var n = e.length;
  if (!n) return "";
  for (var i = e[0].$vars || [], a = 0; a < i.length; a++) {
    var o = Rg[a];
    t = t.replace(Sf(o), Sf(o, 0))
  }
  for (var s = 0; s < n; s++)
    for (var l = 0; l < i.length; l++) {
      var u = e[s][i[l]];
      t = t.replace(Sf(Rg[l], s), r ? Ge(u) : u)
    }
  return t
}

function GI(t, e) {
  var r = nt(t) ? {
      color: t,
      extraCssText: e
    } : t || {},
    n = r.color,
    i = r.type;
  e = r.extraCssText;
  var a = r.renderMode || "html";
  if (!n) return "";
  if (a === "html") return i === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Ge(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Ge(n) + ";" + (e || "") + '"></span>';
  var o = r.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style: i === "subItem" ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: n
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: n
    }
  }
}

function hi(t, e) {
  return e = e || "transparent", nt(t) ? t : st(t) && t.colorStops && (t.colorStops[0] || {}).color || e
}

function Og(t, e) {
  if (e === "_blank" || e === "blank") {
    var r = window.open();
    r.opener = null, r.location.href = t
  } else window.open(t, e)
}
var sl = P,
  WI = ["left", "right", "top", "bottom", "width", "height"],
  Ds = [
    ["width", "left", "right"],
    ["height", "top", "bottom"]
  ];

function zv(t, e, r, n, i) {
  var a = 0,
    o = 0;
  n == null && (n = 1 / 0), i == null && (i = 1 / 0);
  var s = 0;
  e.eachChild(function (l, u) {
    var f = l.getBoundingRect(),
      c = e.childAt(u + 1),
      h = c && c.getBoundingRect(),
      v, d;
    if (t === "horizontal") {
      var y = f.width + (h ? -h.x + f.x : 0);
      v = a + y, v > n || l.newline ? (a = 0, v = y, o += s + r, s = f.height) : s = Math.max(s, f.height)
    } else {
      var g = f.height + (h ? -h.y + f.y : 0);
      d = o + g, d > i || l.newline ? (a += s + r, o = 0, d = g, s = f.width) : s = Math.max(s, f.width)
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), t === "horizontal" ? a = v + r : o = d + r)
  })
}
var go = zv;
jt(zv, "vertical");
jt(zv, "horizontal");

function No(t, e, r) {
  r = yu(r || 0);
  var n = e.width,
    i = e.height,
    a = ue(t.left, n),
    o = ue(t.top, i),
    s = ue(t.right, n),
    l = ue(t.bottom, i),
    u = ue(t.width, n),
    f = ue(t.height, i),
    c = r[2] + r[0],
    h = r[1] + r[3],
    v = t.aspect;
  switch (isNaN(u) && (u = n - s - h - a), isNaN(f) && (f = i - l - c - o), v != null && (isNaN(u) && isNaN(f) && (v > n / i ? u = n * .8 : f = i * .8), isNaN(u) && (u = v * f), isNaN(f) && (f = u / v)), isNaN(a) && (a = n - s - u - h), isNaN(o) && (o = i - l - f - c), t.left || t.right) {
    case "center":
      a = n / 2 - u / 2 - r[3];
      break;
    case "right":
      a = n - u - h;
      break
  }
  switch (t.top || t.bottom) {
    case "middle":
    case "center":
      o = i / 2 - f / 2 - r[0];
      break;
    case "bottom":
      o = i - f - c;
      break
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = n - h - a - (s || 0)), isNaN(f) && (f = i - c - o - (l || 0));
  var d = new Ot(a + r[3], o + r[0], u, f);
  return d.margin = r, d
}

function Fo(t) {
  var e = t.layoutMode || t.constructor.layoutMode;
  return st(e) ? e : e ? {
    type: e
  } : null
}

function sa(t, e, r) {
  var n = r && r.ignoreSize;
  !et(n) && (n = [n, n]);
  var i = o(Ds[0], 0),
    a = o(Ds[1], 1);
  u(Ds[0], t, i), u(Ds[1], t, a);

  function o(f, c) {
    var h = {},
      v = 0,
      d = {},
      y = 0,
      g = 2;
    if (sl(f, function (_) {
        d[_] = t[_]
      }), sl(f, function (_) {
        s(e, _) && (h[_] = d[_] = e[_]), l(h, _) && v++, l(d, _) && y++
      }), n[c]) return l(e, f[1]) ? d[f[2]] = null : l(e, f[2]) && (d[f[1]] = null), d;
    if (y === g || !v) return d;
    if (v >= g) return h;
    for (var p = 0; p < f.length; p++) {
      var m = f[p];
      if (!s(h, m) && s(t, m)) {
        h[m] = t[m];
        break
      }
    }
    return h
  }

  function s(f, c) {
    return f.hasOwnProperty(c)
  }

  function l(f, c) {
    return f[c] != null && f[c] !== "auto"
  }

  function u(f, c, h) {
    sl(f, function (v) {
      c[v] = h[v]
    })
  }
}

function mu(t) {
  return UI({}, t)
}

function UI(t, e) {
  return e && t && sl(WI, function (r) {
    e.hasOwnProperty(r) && (t[r] = e[r])
  }), t
}
var YI = Kt(),
  ma = function (t) {
    J(e, t);

    function e(r, n, i) {
      var a = t.call(this, r, n, i) || this;
      return a.uid = cu("ec_cpt_model"), a
    }
    return e.prototype.init = function (r, n, i) {
      this.mergeDefaultAndTheme(r, i)
    }, e.prototype.mergeDefaultAndTheme = function (r, n) {
      var i = Fo(this),
        a = i ? mu(r) : {},
        o = n.getTheme();
      Tt(r, o.get(this.mainType)), Tt(r, this.getDefaultOption()), i && sa(r, a, i)
    }, e.prototype.mergeOption = function (r, n) {
      Tt(this.option, r, !0);
      var i = Fo(this);
      i && sa(this.option, r, i)
    }, e.prototype.optionUpdated = function (r, n) {}, e.prototype.getDefaultOption = function () {
      var r = this.constructor;
      if (!jD(r)) return r.defaultOption;
      var n = YI(this);
      if (!n.defaultOption) {
        for (var i = [], a = r; a;) {
          var o = a.prototype.defaultOption;
          o && i.push(o), a = a.superClass
        }
        for (var s = {}, l = i.length - 1; l >= 0; l--) s = Tt(s, i[l], !0);
        n.defaultOption = s
      }
      return n.defaultOption
    }, e.prototype.getReferringComponents = function (r, n) {
      var i = r + "Index",
        a = r + "Id";
      return jo(this.ecModel, r, {
        index: this.get(i, !0),
        id: this.get(a, !0)
      }, n)
    }, e.prototype.getBoxLayoutParams = function () {
      var r = this;
      return {
        left: r.get("left"),
        top: r.get("top"),
        right: r.get("right"),
        bottom: r.get("bottom"),
        width: r.get("width"),
        height: r.get("height")
      }
    }, e.prototype.getZLevelKey = function () {
      return ""
    }, e.prototype.setZLevel = function (r) {
      this.option.zlevel = r
    }, e.protoInitialize = function () {
      var r = e.prototype;
      r.type = "component", r.id = "", r.name = "", r.mainType = "", r.subType = "", r.componentIndex = 0
    }(), e
  }(ae);
W_(ma, ae);
iu(ma);
PI(ma);
II(ma, XI);

function XI(t) {
  var e = [];
  return P(ma.getClassesByMainType(t), function (r) {
    e = e.concat(r.dependencies || r.prototype.dependencies || [])
  }), e = ct(e, function (r) {
    return dr(r).main
  }), t !== "dataset" && Pt(e, "dataset") <= 0 && e.unshift("dataset"), e
}
var zt = ma,
  ew = "";
typeof navigator != "undefined" && (ew = navigator.platform || "");
var Ii = "rgba(0, 0, 0, 0.2)",
  qI = {
    darkMode: "auto",
    colorBy: "series",
    color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
    gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
    aria: {
      decal: {
        decals: [{
          color: Ii,
          dashArrayX: [1, 0],
          dashArrayY: [2, 5],
          symbolSize: 1,
          rotation: Math.PI / 6
        }, {
          color: Ii,
          symbol: "circle",
          dashArrayX: [
            [8, 8],
            [0, 8, 8, 0]
          ],
          dashArrayY: [6, 0],
          symbolSize: .8
        }, {
          color: Ii,
          dashArrayX: [1, 0],
          dashArrayY: [4, 3],
          rotation: -Math.PI / 4
        }, {
          color: Ii,
          dashArrayX: [
            [6, 6],
            [0, 6, 6, 0]
          ],
          dashArrayY: [6, 0]
        }, {
          color: Ii,
          dashArrayX: [
            [1, 0],
            [1, 6]
          ],
          dashArrayY: [1, 0, 6, 0],
          rotation: Math.PI / 4
        }, {
          color: Ii,
          symbol: "triangle",
          dashArrayX: [
            [9, 9],
            [0, 9, 9, 0]
          ],
          dashArrayY: [7, 2],
          symbolSize: .75
        }]
      }
    },
    textStyle: {
      fontFamily: ew.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "normal"
    },
    blendMode: null,
    stateAnimation: {
      duration: 300,
      easing: "cubicOut"
    },
    animation: "auto",
    animationDuration: 1e3,
    animationDurationUpdate: 500,
    animationEasing: "cubicInOut",
    animationEasingUpdate: "cubicInOut",
    animationThreshold: 2e3,
    progressiveThreshold: 3e3,
    progressive: 400,
    hoverLayerThreshold: 3e3,
    useUTC: !1
  },
  rw = gt(["tooltip", "label", "itemName", "itemId", "itemGroupId", "seriesName"]),
  Xe = "original",
  Se = "arrayRows",
  wr = "objectRows",
  zr = "keyedColumns",
  pn = "typedArray",
  nw = "unknown",
  Lr = "column",
  _a = "row",
  xe = {
    Must: 1,
    Might: 2,
    Not: 3
  },
  iw = Kt();

function KI(t) {
  iw(t).datasetMap = gt()
}

function ZI(t, e, r) {
  var n = {},
    i = aw(e);
  if (!i || !t) return n;
  var a = [],
    o = [],
    s = e.ecModel,
    l = iw(s).datasetMap,
    u = i.uid + "_" + r.seriesLayoutBy,
    f, c;
  t = t.slice(), P(t, function (y, g) {
    var p = st(y) ? y : t[g] = {
      name: y
    };
    p.type === "ordinal" && f == null && (f = g, c = d(p)), n[p.name] = []
  });
  var h = l.get(u) || l.set(u, {
    categoryWayDim: c,
    valueWayDim: 0
  });
  P(t, function (y, g) {
    var p = y.name,
      m = d(y);
    if (f == null) {
      var _ = h.valueWayDim;
      v(n[p], _, m), v(o, _, m), h.valueWayDim += m
    } else if (f === g) v(n[p], 0, m), v(a, 0, m);
    else {
      var _ = h.categoryWayDim;
      v(n[p], _, m), v(o, _, m), h.categoryWayDim += m
    }
  });

  function v(y, g, p) {
    for (var m = 0; m < p; m++) y.push(g + m)
  }

  function d(y) {
    var g = y.dimsDef;
    return g ? g.length : 1
  }
  return a.length && (n.itemName = a), o.length && (n.seriesName = o), n
}

function aw(t) {
  var e = t.get("data", !0);
  if (!e) return jo(t.ecModel, "dataset", {
    index: t.get("datasetIndex", !0),
    id: t.get("datasetId", !0)
  }, er).models[0]
}

function jI(t) {
  return !t.get("transform", !0) && !t.get("fromTransformResult", !0) ? [] : jo(t.ecModel, "dataset", {
    index: t.get("fromDatasetIndex", !0),
    id: t.get("fromDatasetId", !0)
  }, er).models
}

function ow(t, e) {
  return QI(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e)
}

function QI(t, e, r, n, i, a) {
  var o, s = 5;
  if (Ie(t)) return xe.Not;
  var l, u;
  if (n) {
    var f = n[a];
    st(f) ? (l = f.name, u = f.type) : nt(f) && (l = f)
  }
  if (u != null) return u === "ordinal" ? xe.Must : xe.Not;
  if (e === Se) {
    var c = t;
    if (r === _a) {
      for (var h = c[a], v = 0; v < (h || []).length && v < s; v++)
        if ((o = w(h[i + v])) != null) return o
    } else
      for (var v = 0; v < c.length && v < s; v++) {
        var d = c[i + v];
        if (d && (o = w(d[a])) != null) return o
      }
  } else if (e === wr) {
    var y = t;
    if (!l) return xe.Not;
    for (var v = 0; v < y.length && v < s; v++) {
      var g = y[v];
      if (g && (o = w(g[l])) != null) return o
    }
  } else if (e === zr) {
    var p = t;
    if (!l) return xe.Not;
    var h = p[l];
    if (!h || Ie(h)) return xe.Not;
    for (var v = 0; v < h.length && v < s; v++)
      if ((o = w(h[v])) != null) return o
  } else if (e === Xe)
    for (var m = t, v = 0; v < m.length && v < s; v++) {
      var g = m[v],
        _ = Zo(g);
      if (!et(_)) return xe.Not;
      if ((o = w(_[a])) != null) return o
    }

  function w(b) {
    var S = nt(b);
    if (b != null && isFinite(b) && b !== "") return S ? xe.Might : xe.Not;
    if (S && b !== "-") return xe.Must
  }
  return xe.Not
}
var JI = gt();

function tE(t, e, r) {
  var n = JI.get(e);
  if (!n) return r;
  var i = n(t);
  return i ? r.concat(i) : r
}
var kg = Kt();
Kt();
var Hv = function () {
  function t() {}
  return t.prototype.getColorFromPalette = function (e, r, n) {
    var i = fe(this.get("color", !0)),
      a = this.get("colorLayer", !0);
    return rE(this, kg, i, a, e, r, n)
  }, t.prototype.clearColorPalette = function () {
    nE(this, kg)
  }, t
}();

function eE(t, e) {
  for (var r = t.length, n = 0; n < r; n++)
    if (t[n].length > e) return t[n];
  return t[r - 1]
}

function rE(t, e, r, n, i, a, o) {
  a = a || t;
  var s = e(a),
    l = s.paletteIdx || 0,
    u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(i)) return u[i];
  var f = o == null || !n ? r : eE(n, o);
  if (f = f || r, !(!f || !f.length)) {
    var c = f[l];
    return i && (u[i] = c), s.paletteIdx = (l + 1) % f.length, c
  }
}

function nE(t, e) {
  e(t).paletteIdx = 0, e(t).paletteNameMap = {}
}
var As, Ra, Bg, Ng = "\0_ec_inner",
  iE = 1,
  sw = function (t) {
    J(e, t);

    function e() {
      return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.init = function (r, n, i, a, o, s) {
      a = a || {}, this.option = null, this._theme = new ae(a), this._locale = new ae(o), this._optionManager = s
    }, e.prototype.setOption = function (r, n, i) {
      var a = Hg(n);
      this._optionManager.setOption(r, i, a), this._resetOption(null, a)
    }, e.prototype.resetOption = function (r, n) {
      return this._resetOption(r, Hg(n))
    }, e.prototype._resetOption = function (r, n) {
      var i = !1,
        a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? Bg(this, o) : (this.restoreData(), this._mergeOption(o, n)), i = !0
      }
      if ((r === "timeline" || r === "media") && this.restoreData(), !r || r === "recreate" || r === "timeline") {
        var s = a.getTimelineOption(this);
        s && (i = !0, this._mergeOption(s, n))
      }
      if (!r || r === "recreate" || r === "media") {
        var l = a.getMediaOption(this);
        l.length && P(l, function (u) {
          i = !0, this._mergeOption(u, n)
        }, this)
      }
      return i
    }, e.prototype.mergeOption = function (r) {
      this._mergeOption(r, null)
    }, e.prototype._mergeOption = function (r, n) {
      var i = this.option,
        a = this._componentsMap,
        o = this._componentsCount,
        s = [],
        l = gt(),
        u = n && n.replaceMergeMainTypeMap;
      KI(this), P(r, function (c, h) {
        c != null && (zt.hasClass(h) ? h && (s.push(h), l.set(h, !0)) : i[h] = i[h] == null ? St(c) : Tt(i[h], c, !0))
      }), u && u.each(function (c, h) {
        zt.hasClass(h) && !l.get(h) && (s.push(h), l.set(h, !0))
      }), zt.topologicalTravel(s, zt.getAllClassMainTypes(), f, this);

      function f(c) {
        var h = tE(this, c, fe(r[c])),
          v = a.get(c),
          d = v ? u && u.get(c) ? "replaceMerge" : "normalMerge" : "replaceAll",
          y = BD(v, h, d);
        GD(y, c, zt), i[c] = null, a.set(c, null), o.set(c, 0);
        var g = [],
          p = [],
          m = 0,
          _;
        P(y, function (w, b) {
          var S = w.existing,
            x = w.newOption;
          if (!x) S && (S.mergeOption({}, this), S.optionUpdated({}, !1));
          else {
            var T = c === "series",
              M = zt.getClass(c, w.keyInfo.subType, !T);
            if (!M) return;
            if (c === "tooltip") {
              if (_) return;
              _ = !0
            }
            if (S && S.constructor === M) S.name = w.keyInfo.name, S.mergeOption(x, this), S.optionUpdated(x, !1);
            else {
              var D = q({
                componentIndex: b
              }, w.keyInfo);
              S = new M(x, this, this, D), q(S, D), w.brandNew && (S.__requireNewView = !0), S.init(x, this, this), S.optionUpdated(null, !0)
            }
          }
          S ? (g.push(S.option), p.push(S), m++) : (g.push(void 0), p.push(void 0))
        }, this), i[c] = g, a.set(c, p), o.set(c, m), c === "series" && As(this)
      }
      this._seriesIndices || As(this)
    }, e.prototype.getOption = function () {
      var r = St(this.option);
      return P(r, function (n, i) {
        if (zt.hasClass(i)) {
          for (var a = fe(n), o = a.length, s = !1, l = o - 1; l >= 0; l--) a[l] && !Ro(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[i] = a
        }
      }), delete r[Ng], r
    }, e.prototype.getTheme = function () {
      return this._theme
    }, e.prototype.getLocaleModel = function () {
      return this._locale
    }, e.prototype.setUpdatePayload = function (r) {
      this._payload = r
    }, e.prototype.getUpdatePayload = function () {
      return this._payload
    }, e.prototype.getComponent = function (r, n) {
      var i = this._componentsMap.get(r);
      if (i) {
        var a = i[n || 0];
        if (a) return a;
        if (n == null) {
          for (var o = 0; o < i.length; o++)
            if (i[o]) return i[o]
        }
      }
    }, e.prototype.queryComponents = function (r) {
      var n = r.mainType;
      if (!n) return [];
      var i = r.index,
        a = r.id,
        o = r.name,
        s = this._componentsMap.get(n);
      if (!s || !s.length) return [];
      var l;
      return i != null ? (l = [], P(fe(i), function (u) {
        s[u] && l.push(s[u])
      })) : a != null ? l = Fg("id", a, s) : o != null ? l = Fg("name", o, s) : l = ge(s, function (u) {
        return !!u
      }), zg(l, r)
    }, e.prototype.findComponents = function (r) {
      var n = r.query,
        i = r.mainType,
        a = s(n),
        o = a ? this.queryComponents(a) : ge(this._componentsMap.get(i), function (u) {
          return !!u
        });
      return l(zg(o, r));

      function s(u) {
        var f = i + "Index",
          c = i + "Id",
          h = i + "Name";
        return u && (u[f] != null || u[c] != null || u[h] != null) ? {
          mainType: i,
          index: u[f],
          id: u[c],
          name: u[h]
        } : null
      }

      function l(u) {
        return r.filter ? ge(u, r.filter) : u
      }
    }, e.prototype.eachComponent = function (r, n, i) {
      var a = this._componentsMap;
      if (dt(r)) {
        var o = n,
          s = r;
        a.each(function (c, h) {
          for (var v = 0; c && v < c.length; v++) {
            var d = c[v];
            d && s.call(o, h, d, d.componentIndex)
          }
        })
      } else
        for (var l = nt(r) ? a.get(r) : st(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var f = l[u];
          f && n.call(i, f, f.componentIndex)
        }
    }, e.prototype.getSeriesByName = function (r) {
      var n = pr(r, null);
      return ge(this._componentsMap.get("series"), function (i) {
        return !!i && n != null && i.name === n
      })
    }, e.prototype.getSeriesByIndex = function (r) {
      return this._componentsMap.get("series")[r]
    }, e.prototype.getSeriesByType = function (r) {
      return ge(this._componentsMap.get("series"), function (n) {
        return !!n && n.subType === r
      })
    }, e.prototype.getSeries = function () {
      return ge(this._componentsMap.get("series"), function (r) {
        return !!r
      })
    }, e.prototype.getSeriesCount = function () {
      return this._componentsCount.get("series")
    }, e.prototype.eachSeries = function (r, n) {
      Ra(this), P(this._seriesIndices, function (i) {
        var a = this._componentsMap.get("series")[i];
        r.call(n, a, i)
      }, this)
    }, e.prototype.eachRawSeries = function (r, n) {
      P(this._componentsMap.get("series"), function (i) {
        i && r.call(n, i, i.componentIndex)
      })
    }, e.prototype.eachSeriesByType = function (r, n, i) {
      Ra(this), P(this._seriesIndices, function (a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && n.call(i, o, a)
      }, this)
    }, e.prototype.eachRawSeriesByType = function (r, n, i) {
      return P(this.getSeriesByType(r), n, i)
    }, e.prototype.isSeriesFiltered = function (r) {
      return Ra(this), this._seriesIndicesMap.get(r.componentIndex) == null
    }, e.prototype.getCurrentSeriesIndices = function () {
      return (this._seriesIndices || []).slice()
    }, e.prototype.filterSeries = function (r, n) {
      Ra(this);
      var i = [];
      P(this._seriesIndices, function (a) {
        var o = this._componentsMap.get("series")[a];
        r.call(n, o, a) && i.push(a)
      }, this), this._seriesIndices = i, this._seriesIndicesMap = gt(i)
    }, e.prototype.restoreData = function (r) {
      As(this);
      var n = this._componentsMap,
        i = [];
      n.each(function (a, o) {
        zt.hasClass(o) && i.push(o)
      }), zt.topologicalTravel(i, zt.getAllClassMainTypes(), function (a) {
        P(n.get(a), function (o) {
          o && (a !== "series" || !aE(o, r)) && o.restoreData()
        })
      })
    }, e.internalField = function () {
      As = function (r) {
        var n = r._seriesIndices = [];
        P(r._componentsMap.get("series"), function (i) {
          i && n.push(i.componentIndex)
        }), r._seriesIndicesMap = gt(n)
      }, Ra = function (r) {}, Bg = function (r, n) {
        r.option = {}, r.option[Ng] = iE, r._componentsMap = gt({
          series: []
        }), r._componentsCount = gt();
        var i = n.aria;
        st(i) && i.enabled == null && (i.enabled = !0), oE(n, r._theme.option), Tt(n, qI, !1), r._mergeOption(n, null)
      }
    }(), e
  }(ae);

function aE(t, e) {
  if (e) {
    var r = e.seriesIndex,
      n = e.seriesId,
      i = e.seriesName;
    return r != null && t.componentIndex !== r || n != null && t.id !== n || i != null && t.name !== i
  }
}

function oE(t, e) {
  var r = t.color && !t.colorLayer;
  P(e, function (n, i) {
    i === "colorLayer" && r || zt.hasClass(i) || (typeof n == "object" ? t[i] = t[i] ? Tt(t[i], n, !1) : St(n) : t[i] == null && (t[i] = n))
  })
}

function Fg(t, e, r) {
  if (et(e)) {
    var n = gt();
    return P(e, function (a) {
      if (a != null) {
        var o = pr(a, null);
        o != null && n.set(a, !0)
      }
    }), ge(r, function (a) {
      return a && n.get(a[t])
    })
  } else {
    var i = pr(e, null);
    return ge(r, function (a) {
      return a && i != null && a[t] === i
    })
  }
}

function zg(t, e) {
  return e.hasOwnProperty("subType") ? ge(t, function (r) {
    return r && r.subType === e.subType
  }) : t
}

function Hg(t) {
  var e = gt();
  return t && P(fe(t.replaceMerge), function (r) {
    e.set(r, !0)
  }), {
    replaceMergeMainTypeMap: e
  }
}
mr(sw, Hv);
var lw = sw,
  sE = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isSSR", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getOption", "getId", "updateLabelLayout"],
  lE = function () {
    function t(e) {
      P(sE, function (r) {
        this[r] = Ht(e[r], e)
      }, this)
    }
    return t
  }(),
  uw = lE,
  bf = {},
  uE = function () {
    function t() {
      this._coordinateSystems = []
    }
    return t.prototype.create = function (e, r) {
      var n = [];
      P(bf, function (i, a) {
        var o = i.create(e, r);
        n = n.concat(o || [])
      }), this._coordinateSystems = n
    }, t.prototype.update = function (e, r) {
      P(this._coordinateSystems, function (n) {
        n.update && n.update(e, r)
      })
    }, t.prototype.getCoordinateSystems = function () {
      return this._coordinateSystems.slice()
    }, t.register = function (e, r) {
      bf[e] = r
    }, t.get = function (e) {
      return bf[e]
    }, t
  }(),
  Vv = uE,
  fE = /^(min|max)?(.+)$/,
  cE = function () {
    function t(e) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = e
    }
    return t.prototype.setOption = function (e, r, n) {
      e && (P(fe(e.series), function (o) {
        o && o.data && Ie(o.data) && wc(o.data)
      }), P(fe(e.dataset), function (o) {
        o && o.source && Ie(o.source) && wc(o.source)
      })), e = St(e);
      var i = this._optionBackup,
        a = hE(e, r, !i);
      this._newBaseOption = a.baseOption, i ? (a.timelineOptions.length && (i.timelineOptions = a.timelineOptions), a.mediaList.length && (i.mediaList = a.mediaList), a.mediaDefault && (i.mediaDefault = a.mediaDefault)) : this._optionBackup = a
    }, t.prototype.mountOption = function (e) {
      var r = this._optionBackup;
      return this._timelineOptions = r.timelineOptions, this._mediaList = r.mediaList, this._mediaDefault = r.mediaDefault, this._currentMediaIndices = [], St(e ? r.baseOption : this._newBaseOption)
    }, t.prototype.getTimelineOption = function (e) {
      var r, n = this._timelineOptions;
      if (n.length) {
        var i = e.getComponent("timeline");
        i && (r = St(n[i.getCurrentIndex()]))
      }
      return r
    }, t.prototype.getMediaOption = function (e) {
      var r = this._api.getWidth(),
        n = this._api.getHeight(),
        i = this._mediaList,
        a = this._mediaDefault,
        o = [],
        s = [];
      if (!i.length && !a) return s;
      for (var l = 0, u = i.length; l < u; l++) vE(i[l].query, r, n) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !pE(o, this._currentMediaIndices) && (s = ct(o, function (f) {
        return St(f === -1 ? a.option : i[f].option)
      })), this._currentMediaIndices = o, s
    }, t
  }();

function hE(t, e, r) {
  var n = [],
    i, a, o = t.baseOption,
    s = t.timeline,
    l = t.options,
    u = t.media,
    f = !!t.media,
    c = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((c || f) && (t.options = t.media = null), a = t), f && et(u) && P(u, function (v) {
    v && v.option && (v.query ? n.push(v) : i || (i = v))
  }), h(a), P(l, function (v) {
    return h(v)
  }), P(n, function (v) {
    return h(v.option)
  });

  function h(v) {
    P(e, function (d) {
      d(v, r)
    })
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: i,
    mediaList: n
  }
}

function vE(t, e, r) {
  var n = {
      width: e,
      height: r,
      aspectratio: e / r
    },
    i = !0;
  return P(t, function (a, o) {
    var s = o.match(fE);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1],
        u = s[2].toLowerCase();
      dE(n[u], a, l) || (i = !1)
    }
  }), i
}

function dE(t, e, r) {
  return r === "min" ? t >= e : r === "max" ? t <= e : t === e
}

function pE(t, e) {
  return t.join(",") === e.join(",")
}
var gE = cE,
  Ke = P,
  zo = st,
  Vg = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];

function xf(t) {
  var e = t && t.itemStyle;
  if (!!e)
    for (var r = 0, n = Vg.length; r < n; r++) {
      var i = Vg[r],
        a = e.normal,
        o = e.emphasis;
      a && a[i] && (t[i] = t[i] || {}, t[i].normal ? Tt(t[i].normal, a[i]) : t[i].normal = a[i], a[i] = null), o && o[i] && (t[i] = t[i] || {}, t[i].emphasis ? Tt(t[i].emphasis, o[i]) : t[i].emphasis = o[i], o[i] = null)
    }
}

function ne(t, e, r) {
  if (t && t[e] && (t[e].normal || t[e].emphasis)) {
    var n = t[e].normal,
      i = t[e].emphasis;
    n && (r ? (t[e].normal = t[e].emphasis = null, Dt(t[e], n)) : t[e] = n), i && (t.emphasis = t.emphasis || {}, t.emphasis[e] = i, i.focus && (t.emphasis.focus = i.focus), i.blurScope && (t.emphasis.blurScope = i.blurScope))
  }
}

function Qa(t) {
  ne(t, "itemStyle"), ne(t, "lineStyle"), ne(t, "areaStyle"), ne(t, "label"), ne(t, "labelLine"), ne(t, "upperLabel"), ne(t, "edgeLabel")
}

function Ut(t, e) {
  var r = zo(t) && t[e],
    n = zo(r) && r.textStyle;
  if (n)
    for (var i = 0, a = zp.length; i < a; i++) {
      var o = zp[i];
      n.hasOwnProperty(o) && (r[o] = n[o])
    }
}

function Ne(t) {
  t && (Qa(t), Ut(t, "label"), t.emphasis && Ut(t.emphasis, "label"))
}

function yE(t) {
  if (!!zo(t)) {
    xf(t), Qa(t), Ut(t, "label"), Ut(t, "upperLabel"), Ut(t, "edgeLabel"), t.emphasis && (Ut(t.emphasis, "label"), Ut(t.emphasis, "upperLabel"), Ut(t.emphasis, "edgeLabel"));
    var e = t.markPoint;
    e && (xf(e), Ne(e));
    var r = t.markLine;
    r && (xf(r), Ne(r));
    var n = t.markArea;
    n && Ne(n);
    var i = t.data;
    if (t.type === "graph") {
      i = i || t.nodes;
      var a = t.links || t.edges;
      if (a && !Ie(a))
        for (var o = 0; o < a.length; o++) Ne(a[o]);
      P(t.categories, function (u) {
        Qa(u)
      })
    }
    if (i && !Ie(i))
      for (var o = 0; o < i.length; o++) Ne(i[o]);
    if (e = t.markPoint, e && e.data)
      for (var s = e.data, o = 0; o < s.length; o++) Ne(s[o]);
    if (r = t.markLine, r && r.data)
      for (var l = r.data, o = 0; o < l.length; o++) et(l[o]) ? (Ne(l[o][0]), Ne(l[o][1])) : Ne(l[o]);
    t.type === "gauge" ? (Ut(t, "axisLabel"), Ut(t, "title"), Ut(t, "detail")) : t.type === "treemap" ? (ne(t.breadcrumb, "itemStyle"), P(t.levels, function (u) {
      Qa(u)
    })) : t.type === "tree" && Qa(t.leaves)
  }
}

function br(t) {
  return et(t) ? t : t ? [t] : []
}

function $g(t) {
  return (et(t) ? t[0] : t) || {}
}

function mE(t, e) {
  Ke(br(t.series), function (n) {
    zo(n) && yE(n)
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  e && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Ke(r, function (n) {
    Ke(br(t[n]), function (i) {
      i && (Ut(i, "axisLabel"), Ut(i.axisPointer, "label"))
    })
  }), Ke(br(t.parallel), function (n) {
    var i = n && n.parallelAxisDefault;
    Ut(i, "axisLabel"), Ut(i && i.axisPointer, "label")
  }), Ke(br(t.calendar), function (n) {
    ne(n, "itemStyle"), Ut(n, "dayLabel"), Ut(n, "monthLabel"), Ut(n, "yearLabel")
  }), Ke(br(t.radar), function (n) {
    Ut(n, "name"), n.name && n.axisName == null && (n.axisName = n.name, delete n.name), n.nameGap != null && n.axisNameGap == null && (n.axisNameGap = n.nameGap, delete n.nameGap)
  }), Ke(br(t.geo), function (n) {
    zo(n) && (Ne(n), Ke(br(n.regions), function (i) {
      Ne(i)
    }))
  }), Ke(br(t.timeline), function (n) {
    Ne(n), ne(n, "label"), ne(n, "itemStyle"), ne(n, "controlStyle", !0);
    var i = n.data;
    et(i) && P(i, function (a) {
      st(a) && (ne(a, "label"), ne(a, "itemStyle"))
    })
  }), Ke(br(t.toolbox), function (n) {
    ne(n, "iconStyle"), Ke(n.feature, function (i) {
      ne(i, "iconStyle")
    })
  }), Ut($g(t.axisPointer), "label"), Ut($g(t.tooltip).axisPointer, "label")
}

function _E(t, e) {
  for (var r = e.split(","), n = t, i = 0; i < r.length && (n = n && n[r[i]], n != null); i++);
  return n
}

function wE(t, e, r, n) {
  for (var i = e.split(","), a = t, o, s = 0; s < i.length - 1; s++) o = i[s], a[o] == null && (a[o] = {}), a = a[o];
  (n || a[i[s]] == null) && (a[i[s]] = r)
}

function Gg(t) {
  t && P(SE, function (e) {
    e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]])
  })
}
var SE = [
    ["x", "left"],
    ["y", "top"],
    ["x2", "right"],
    ["y2", "bottom"]
  ],
  bE = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
  Cf = [
    ["borderRadius", "barBorderRadius"],
    ["borderColor", "barBorderColor"],
    ["borderWidth", "barBorderWidth"]
  ];

function Oa(t) {
  var e = t && t.itemStyle;
  if (e)
    for (var r = 0; r < Cf.length; r++) {
      var n = Cf[r][1],
        i = Cf[r][0];
      e[n] != null && (e[i] = e[n])
    }
}

function Wg(t) {
  !t || t.alignTo === "edge" && t.margin != null && t.edgeDistance == null && (t.edgeDistance = t.margin)
}

function Ug(t) {
  !t || t.downplay && !t.blur && (t.blur = t.downplay)
}

function xE(t) {
  !t || t.focusNodeAdjacency != null && (t.emphasis = t.emphasis || {}, t.emphasis.focus == null && (t.emphasis.focus = "adjacency"))
}

function fw(t, e) {
  if (t)
    for (var r = 0; r < t.length; r++) e(t[r]), t[r] && fw(t[r].children, e)
}

function cw(t, e) {
  mE(t, e), t.series = fe(t.series), P(t.series, function (r) {
    if (!!st(r)) {
      var n = r.type;
      if (n === "line") r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (n === "pie" || n === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), Wg(r.label);
        var i = r.data;
        if (i && !Ie(i))
          for (var a = 0; a < i.length; a++) Wg(i[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset))
      } else if (n === "gauge") {
        var o = _E(r, "pointer.color");
        o != null && wE(r, "itemStyle.color", o)
      } else if (n === "bar") {
        Oa(r), Oa(r.backgroundStyle), Oa(r.emphasis);
        var i = r.data;
        if (i && !Ie(i))
          for (var a = 0; a < i.length; a++) typeof i[a] == "object" && (Oa(i[a]), Oa(i[a] && i[a].emphasis))
      } else if (n === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), Ug(r), fw(r.data, Ug)
      } else n === "graph" || n === "sankey" ? xE(r) : n === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && Dt(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), Gg(r)
    }
  }), t.dataRange && (t.visualMap = t.dataRange), P(bE, function (r) {
    var n = t[r];
    n && (et(n) || (n = [n]), P(n, function (i) {
      Gg(i)
    }))
  })
}

function CE(t) {
  var e = gt();
  t.eachSeries(function (r) {
    var n = r.get("stack");
    if (n) {
      var i = e.get(n) || e.set(n, []),
        a = r.getData(),
        o = {
          stackResultDimension: a.getCalculationInfo("stackResultDimension"),
          stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
          stackedDimension: a.getCalculationInfo("stackedDimension"),
          stackedByDimension: a.getCalculationInfo("stackedByDimension"),
          isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
          data: a,
          seriesModel: r
        };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension)) return;
      i.length && a.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(o)
    }
  }), e.each(TE)
}

function TE(t) {
  P(t, function (e, r) {
    var n = [],
      i = [NaN, NaN],
      a = [e.stackResultDimension, e.stackedOverDimension],
      o = e.data,
      s = e.isStackedByIndex;
    o.modify(a, function (l, u, f) {
      var c = o.get(e.stackedDimension, f);
      if (isNaN(c)) return i;
      var h, v;
      s ? v = o.getRawIndex(f) : h = o.get(e.stackedByDimension, f);
      for (var d = NaN, y = r - 1; y >= 0; y--) {
        var g = t[y];
        if (s || (v = g.data.rawIndexOf(g.stackedByDimension, h)), v >= 0) {
          var p = g.data.getByRawIndex(g.stackResultDimension, v);
          if (c >= 0 && p > 0 || c <= 0 && p < 0) {
            c = ID(c, p), d = p;
            break
          }
        }
      }
      return n[0] = c, n[1] = d, n
    })
  })
}
var _u = function () {
  function t(e) {
    this.data = e.data || (e.sourceFormat === zr ? {} : []), this.sourceFormat = e.sourceFormat || nw, this.seriesLayoutBy = e.seriesLayoutBy || Lr, this.startIndex = e.startIndex || 0, this.dimensionsDetectedCount = e.dimensionsDetectedCount, this.metaRawOption = e.metaRawOption;
    var r = this.dimensionsDefine = e.dimensionsDefine;
    if (r)
      for (var n = 0; n < r.length; n++) {
        var i = r[n];
        i.type == null && ow(this, n) === xe.Must && (i.type = "ordinal")
      }
  }
  return t
}();

function $v(t) {
  return t instanceof _u
}

function Zc(t, e, r) {
  r = r || hw(t);
  var n = e.seriesLayoutBy,
    i = DE(t, r, n, e.sourceHeader, e.dimensions),
    a = new _u({
      data: t,
      sourceFormat: r,
      seriesLayoutBy: n,
      dimensionsDefine: i.dimensionsDefine,
      startIndex: i.startIndex,
      dimensionsDetectedCount: i.dimensionsDetectedCount,
      metaRawOption: St(e)
    });
  return a
}

function Gv(t) {
  return new _u({
    data: t,
    sourceFormat: Ie(t) ? pn : Xe
  })
}

function ME(t) {
  return new _u({
    data: t.data,
    sourceFormat: t.sourceFormat,
    seriesLayoutBy: t.seriesLayoutBy,
    dimensionsDefine: St(t.dimensionsDefine),
    startIndex: t.startIndex,
    dimensionsDetectedCount: t.dimensionsDetectedCount
  })
}

function hw(t) {
  var e = nw;
  if (Ie(t)) e = pn;
  else if (et(t)) {
    t.length === 0 && (e = Se);
    for (var r = 0, n = t.length; r < n; r++) {
      var i = t[r];
      if (i != null) {
        if (et(i)) {
          e = Se;
          break
        } else if (st(i)) {
          e = wr;
          break
        }
      }
    }
  } else if (st(t)) {
    for (var a in t)
      if (oa(t, a) && we(t[a])) {
        e = zr;
        break
      }
  }
  return e
}

function DE(t, e, r, n, i) {
  var a, o;
  if (!t) return {
    dimensionsDefine: Yg(i),
    startIndex: o,
    dimensionsDetectedCount: a
  };
  if (e === Se) {
    var s = t;
    n === "auto" || n == null ? Xg(function (u) {
      u != null && u !== "-" && (nt(u) ? o == null && (o = 1) : o = 0)
    }, r, s, 10) : o = $t(n) ? n : n ? 1 : 0, !i && o === 1 && (i = [], Xg(function (u, f) {
      i[f] = u != null ? u + "" : ""
    }, r, s, 1 / 0)), a = i ? i.length : r === _a ? s.length : s[0] ? s[0].length : null
  } else if (e === wr) i || (i = AE(t));
  else if (e === zr) i || (i = [], P(t, function (u, f) {
    i.push(f)
  }));
  else if (e === Xe) {
    var l = Zo(t[0]);
    a = et(l) && l.length || 1
  }
  return {
    startIndex: o,
    dimensionsDefine: Yg(i),
    dimensionsDetectedCount: a
  }
}

function AE(t) {
  for (var e = 0, r; e < t.length && !(r = t[e++]););
  if (r) {
    var n = [];
    return P(r, function (i, a) {
      n.push(a)
    }), n
  }
}

function Yg(t) {
  if (!!t) {
    var e = gt();
    return ct(t, function (r, n) {
      r = st(r) ? r : {
        name: r
      };
      var i = {
        name: r.name,
        displayName: r.displayName,
        type: r.type
      };
      if (i.name == null) return i;
      i.name += "", i.displayName == null && (i.displayName = i.name);
      var a = e.get(i.name);
      return a ? i.name += "-" + a.count++ : e.set(i.name, {
        count: 1
      }), i
    })
  }
}

function Xg(t, e, r, n) {
  if (e === _a)
    for (var i = 0; i < r.length && i < n; i++) t(r[i] ? r[i][0] : null, i);
  else
    for (var a = r[0] || [], i = 0; i < a.length && i < n; i++) t(a[i], i)
}

function vw(t) {
  var e = t.sourceFormat;
  return e === wr || e === zr
}
var Gn, Wn, Un, qg, Kg, dw = function () {
    function t(e, r) {
      var n = $v(e) ? e : Gv(e);
      this._source = n;
      var i = this._data = n.data;
      n.sourceFormat === pn && (this._offset = 0, this._dimSize = r, this._data = i), Kg(this, i, n)
    }
    return t.prototype.getSource = function () {
      return this._source
    }, t.prototype.count = function () {
      return 0
    }, t.prototype.getItem = function (e, r) {}, t.prototype.appendData = function (e) {}, t.prototype.clean = function () {}, t.protoInitialize = function () {
      var e = t.prototype;
      e.pure = !1, e.persistent = !0
    }(), t.internalField = function () {
      var e;
      Kg = function (o, s, l) {
        var u = l.sourceFormat,
          f = l.seriesLayoutBy,
          c = l.startIndex,
          h = l.dimensionsDefine,
          v = qg[Wv(u, f)];
        if (q(o, v), u === pn) o.getItem = r, o.count = i, o.fillStorage = n;
        else {
          var d = pw(u, f);
          o.getItem = Ht(d, null, s, c, h);
          var y = gw(u, f);
          o.count = Ht(y, null, s, c, h)
        }
      };
      var r = function (o, s) {
          o = o - this._offset, s = s || [];
          for (var l = this._data, u = this._dimSize, f = u * o, c = 0; c < u; c++) s[c] = l[f + c];
          return s
        },
        n = function (o, s, l, u) {
          for (var f = this._data, c = this._dimSize, h = 0; h < c; h++) {
            for (var v = u[h], d = v[0] == null ? 1 / 0 : v[0], y = v[1] == null ? -1 / 0 : v[1], g = s - o, p = l[h], m = 0; m < g; m++) {
              var _ = f[m * c + h];
              p[o + m] = _, _ < d && (d = _), _ > y && (y = _)
            }
            v[0] = d, v[1] = y
          }
        },
        i = function () {
          return this._data ? this._data.length / this._dimSize : 0
        };
      qg = (e = {}, e[Se + "_" + Lr] = {
        pure: !0,
        appendData: a
      }, e[Se + "_" + _a] = {
        pure: !0,
        appendData: function () {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".')
        }
      }, e[wr] = {
        pure: !0,
        appendData: a
      }, e[zr] = {
        pure: !0,
        appendData: function (o) {
          var s = this._data;
          P(o, function (l, u) {
            for (var f = s[u] || (s[u] = []), c = 0; c < (l || []).length; c++) f.push(l[c])
          })
        }
      }, e[Xe] = {
        appendData: a
      }, e[pn] = {
        persistent: !1,
        pure: !0,
        appendData: function (o) {
          this._data = o
        },
        clean: function () {
          this._offset += this.count(), this._data = null
        }
      }, e);

      function a(o) {
        for (var s = 0; s < o.length; s++) this._data.push(o[s])
      }
    }(), t
  }(),
  Zg = function (t, e, r, n) {
    return t[n]
  },
  PE = (Gn = {}, Gn[Se + "_" + Lr] = function (t, e, r, n) {
    return t[n + e]
  }, Gn[Se + "_" + _a] = function (t, e, r, n, i) {
    n += e;
    for (var a = i || [], o = t, s = 0; s < o.length; s++) {
      var l = o[s];
      a[s] = l ? l[n] : null
    }
    return a
  }, Gn[wr] = Zg, Gn[zr] = function (t, e, r, n, i) {
    for (var a = i || [], o = 0; o < r.length; o++) {
      var s = r[o].name,
        l = t[s];
      a[o] = l ? l[n] : null
    }
    return a
  }, Gn[Xe] = Zg, Gn);

function pw(t, e) {
  var r = PE[Wv(t, e)];
  return r
}
var jg = function (t, e, r) {
    return t.length
  },
  IE = (Wn = {}, Wn[Se + "_" + Lr] = function (t, e, r) {
    return Math.max(0, t.length - e)
  }, Wn[Se + "_" + _a] = function (t, e, r) {
    var n = t[0];
    return n ? Math.max(0, n.length - e) : 0
  }, Wn[wr] = jg, Wn[zr] = function (t, e, r) {
    var n = r[0].name,
      i = t[n];
    return i ? i.length : 0
  }, Wn[Xe] = jg, Wn);

function gw(t, e) {
  var r = IE[Wv(t, e)];
  return r
}
var Tf = function (t, e, r) {
    return t[e]
  },
  EE = (Un = {}, Un[Se] = Tf, Un[wr] = function (t, e, r) {
    return t[r]
  }, Un[zr] = Tf, Un[Xe] = function (t, e, r) {
    var n = Zo(t);
    return n instanceof Array ? n[e] : n
  }, Un[pn] = Tf, Un);

function yw(t) {
  var e = EE[t];
  return e
}

function Wv(t, e) {
  return t === Se ? t + "_" + e : t
}

function la(t, e, r) {
  if (!!t) {
    var n = t.getRawDataItem(e);
    if (n != null) {
      var i = t.getStore(),
        a = i.getSource().sourceFormat;
      if (r != null) {
        var o = t.getDimensionIndex(r),
          s = i.getDimensionProperty(o);
        return yw(a)(n, o, s)
      } else {
        var l = n;
        return a === Xe && (l = Zo(n)), l
      }
    }
  }
}
var LE = /\{@(.+?)\}/g,
  RE = function () {
    function t() {}
    return t.prototype.getDataParams = function (e, r) {
      var n = this.getData(r),
        i = this.getRawValue(e, r),
        a = n.getRawIndex(e),
        o = n.getName(e),
        s = n.getRawDataItem(e),
        l = n.getItemVisual(e, "style"),
        u = l && l[n.getItemVisual(e, "drawType") || "fill"],
        f = l && l.stroke,
        c = this.mainType,
        h = c === "series",
        v = n.userOutput && n.userOutput.get();
      return {
        componentType: c,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: h ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: h ? this.id : null,
        seriesName: h ? this.name : null,
        name: o,
        dataIndex: a,
        data: s,
        dataType: r,
        value: i,
        color: u,
        borderColor: f,
        dimensionNames: v ? v.fullDimensions : null,
        encode: v ? v.encode : null,
        $vars: ["seriesName", "name", "value"]
      }
    }, t.prototype.getFormattedLabel = function (e, r, n, i, a, o) {
      r = r || "normal";
      var s = this.getData(n),
        l = this.getDataParams(e, n);
      if (o && (l.value = o.interpolatedValue), i != null && et(l.value) && (l.value = l.value[i]), !a) {
        var u = s.getItemModel(e);
        a = u.get(r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"])
      }
      if (dt(a)) return l.status = r, l.dimensionIndex = i, a(l);
      if (nt(a)) {
        var f = tw(a, l);
        return f.replace(LE, function (c, h) {
          var v = h.length,
            d = h;
          d.charAt(0) === "[" && d.charAt(v - 1) === "]" && (d = +d.slice(1, v - 1));
          var y = la(s, e, d);
          if (o && et(o.interpolatedValue)) {
            var g = s.getDimensionIndex(d);
            g >= 0 && (y = o.interpolatedValue[g])
          }
          return y != null ? y + "" : ""
        })
      }
    }, t.prototype.getRawValue = function (e, r) {
      return la(this.getData(r), e)
    }, t.prototype.formatTooltip = function (e, r, n) {}, t
  }();

function Qg(t) {
  var e, r;
  return st(t) ? t.type && (r = t) : e = t, {
    text: e,
    frag: r
  }
}

function yo(t) {
  return new OE(t)
}
var OE = function () {
    function t(e) {
      e = e || {}, this._reset = e.reset, this._plan = e.plan, this._count = e.count, this._onDirty = e.onDirty, this._dirty = !0
    }
    return t.prototype.perform = function (e) {
      var r = this._upstream,
        n = e && e.skip;
      if (this._dirty && r) {
        var i = this.context;
        i.data = i.outputData = r.context.outputData
      }
      this.__pipeline && (this.__pipeline.currentTask = this);
      var a;
      this._plan && !n && (a = this._plan(this.context));
      var o = f(this._modBy),
        s = this._modDataCount || 0,
        l = f(e && e.modBy),
        u = e && e.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");

      function f(m) {
        return !(m >= 1) && (m = 1), m
      }
      var c;
      (this._dirty || a === "reset") && (this._dirty = !1, c = this._doReset(n)), this._modBy = l, this._modDataCount = u;
      var h = e && e.step;
      if (r ? this._dueEnd = r._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var v = this._dueIndex,
          d = Math.min(h != null ? this._dueIndex + h : 1 / 0, this._dueEnd);
        if (!n && (c || v < d)) {
          var y = this._progress;
          if (et(y))
            for (var g = 0; g < y.length; g++) this._doProgress(y[g], v, d, l, u);
          else this._doProgress(y, v, d, l, u)
        }
        this._dueIndex = d;
        var p = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        this._outputDueEnd = p
      } else this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished()
    }, t.prototype.dirty = function () {
      this._dirty = !0, this._onDirty && this._onDirty(this.context)
    }, t.prototype._doProgress = function (e, r, n, i, a) {
      Jg.reset(r, n, i, a), this._callingProgress = e, this._callingProgress({
        start: r,
        end: n,
        count: n - r,
        next: Jg.next
      }, this.context)
    }, t.prototype._doReset = function (e) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var r, n;
      !e && this._reset && (r = this._reset(this.context), r && r.progress && (n = r.forceFirstProgress, r = r.progress), et(r) && !r.length && (r = null)), this._progress = r, this._modBy = this._modDataCount = null;
      var i = this._downstream;
      return i && i.dirty(), n
    }, t.prototype.unfinished = function () {
      return this._progress && this._dueIndex < this._dueEnd
    }, t.prototype.pipe = function (e) {
      (this._downstream !== e || this._dirty) && (this._downstream = e, e._upstream = this, e.dirty())
    }, t.prototype.dispose = function () {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0)
    }, t.prototype.getUpstream = function () {
      return this._upstream
    }, t.prototype.getDownstream = function () {
      return this._downstream
    }, t.prototype.setOutputEnd = function (e) {
      this._outputDueEnd = this._settedOutputEnd = e
    }, t
  }(),
  Jg = function () {
    var t, e, r, n, i, a = {
      reset: function (l, u, f, c) {
        e = l, t = u, r = f, n = c, i = Math.ceil(n / r), a.next = r > 1 && n > 0 ? s : o
      }
    };
    return a;

    function o() {
      return e < t ? e++ : null
    }

    function s() {
      var l = e % i * r + Math.ceil(e / i),
        u = e >= t ? null : l < n ? l : e;
      return e++, u
    }
  }();

function ll(t, e) {
  var r = e && e.type;
  return r === "ordinal" ? t : (r === "time" && !$t(t) && t != null && t !== "-" && (t = +kr(t)), t == null || t === "" ? NaN : +t)
}
gt({
  number: function (t) {
    return parseFloat(t)
  },
  time: function (t) {
    return +kr(t)
  },
  trim: function (t) {
    return nt(t) ? vr(t) : t
  }
});
var kE = function () {
    function t(e, r) {
      var n = e === "desc";
      this._resultLT = n ? 1 : -1, r == null && (r = n ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0
    }
    return t.prototype.evaluate = function (e, r) {
      var n = $t(e) ? e : Al(e),
        i = $t(r) ? r : Al(r),
        a = isNaN(n),
        o = isNaN(i);
      if (a && (n = this._incomparable), o && (i = this._incomparable), a && o) {
        var s = nt(e),
          l = nt(r);
        s && (n = l ? e : 0), l && (i = s ? r : 0)
      }
      return n < i ? this._resultLT : n > i ? -this._resultLT : 0
    }, t
  }(),
  BE = function () {
    function t() {}
    return t.prototype.getRawData = function () {
      throw new Error("not supported")
    }, t.prototype.getRawDataItem = function (e) {
      throw new Error("not supported")
    }, t.prototype.cloneRawData = function () {}, t.prototype.getDimensionInfo = function (e) {}, t.prototype.cloneAllDimensionInfo = function () {}, t.prototype.count = function () {}, t.prototype.retrieveValue = function (e, r) {}, t.prototype.retrieveValueFromItem = function (e, r) {}, t.prototype.convertValue = function (e, r) {
      return ll(e, r)
    }, t
  }();

function NE(t, e) {
  var r = new BE,
    n = t.data,
    i = r.sourceFormat = t.sourceFormat,
    a = t.startIndex,
    o = "";
  t.seriesLayoutBy !== Lr && ye(o);
  var s = [],
    l = {},
    u = t.dimensionsDefine;
  if (u) P(u, function (y, g) {
    var p = y.name,
      m = {
        index: g,
        name: p,
        displayName: y.displayName
      };
    if (s.push(m), p != null) {
      var _ = "";
      oa(l, p) && ye(_), l[p] = m
    }
  });
  else
    for (var f = 0; f < t.dimensionsDetectedCount; f++) s.push({
      index: f
    });
  var c = pw(i, Lr);
  e.__isBuiltIn && (r.getRawDataItem = function (y) {
    return c(n, a, s, y)
  }, r.getRawData = Ht(FE, null, t)), r.cloneRawData = Ht(zE, null, t);
  var h = gw(i, Lr);
  r.count = Ht(h, null, n, a, s);
  var v = yw(i);
  r.retrieveValue = function (y, g) {
    var p = c(n, a, s, y);
    return d(p, g)
  };
  var d = r.retrieveValueFromItem = function (y, g) {
    if (y != null) {
      var p = s[g];
      if (p) return v(y, g, p.name)
    }
  };
  return r.getDimensionInfo = Ht(HE, null, s, l), r.cloneAllDimensionInfo = Ht(VE, null, s), r
}

function FE(t) {
  var e = t.sourceFormat;
  if (!Uv(e)) {
    var r = "";
    ye(r)
  }
  return t.data
}

function zE(t) {
  var e = t.sourceFormat,
    r = t.data;
  if (!Uv(e)) {
    var n = "";
    ye(n)
  }
  if (e === Se) {
    for (var i = [], a = 0, o = r.length; a < o; a++) i.push(r[a].slice());
    return i
  } else if (e === wr) {
    for (var i = [], a = 0, o = r.length; a < o; a++) i.push(q({}, r[a]));
    return i
  }
}

function HE(t, e, r) {
  if (r != null) {
    if ($t(r) || !isNaN(r) && !oa(e, r)) return t[r];
    if (oa(e, r)) return e[r]
  }
}

function VE(t) {
  return St(t)
}
var mw = gt();

function $E(t) {
  t = St(t);
  var e = t.type,
    r = "";
  e || ye(r);
  var n = e.split(":");
  n.length !== 2 && ye(r);
  var i = !1;
  n[0] === "echarts" && (e = n[1], i = !0), t.__isBuiltIn = i, mw.set(e, t)
}

function GE(t, e, r) {
  var n = fe(t),
    i = n.length,
    a = "";
  i || ye(a);
  for (var o = 0, s = i; o < s; o++) {
    var l = n[o];
    e = WE(l, e), o !== s - 1 && (e.length = Math.max(e.length, 1))
  }
  return e
}

function WE(t, e, r, n) {
  var i = "";
  e.length || ye(i), st(t) || ye(i);
  var a = t.type,
    o = mw.get(a);
  o || ye(i);
  var s = ct(e, function (u) {
      return NE(u, o)
    }),
    l = fe(o.transform({
      upstream: s[0],
      upstreamList: s,
      config: St(t.config)
    }));
  return ct(l, function (u, f) {
    var c = "";
    st(u) || ye(c), u.data || ye(c);
    var h = hw(u.data);
    Uv(h) || ye(c);
    var v, d = e[0];
    if (d && f === 0 && !u.dimensions) {
      var y = d.startIndex;
      y && (u.data = d.data.slice(0, y).concat(u.data)), v = {
        seriesLayoutBy: Lr,
        sourceHeader: y,
        dimensions: d.metaRawOption.dimensions
      }
    } else v = {
      seriesLayoutBy: Lr,
      sourceHeader: 0,
      dimensions: u.dimensions
    };
    return Zc(u.data, v, null)
  })
}

function Uv(t) {
  return t === Se || t === wr
}
var wu = "undefined",
  UE = typeof Uint32Array === wu ? Array : Uint32Array,
  YE = typeof Uint16Array === wu ? Array : Uint16Array,
  _w = typeof Int32Array === wu ? Array : Int32Array,
  ty = typeof Float64Array === wu ? Array : Float64Array,
  ww = {
    float: ty,
    int: _w,
    ordinal: Array,
    number: Array,
    time: ty
  },
  Mf;

function ka(t) {
  return t > 65535 ? UE : YE
}

function Ei() {
  return [1 / 0, -1 / 0]
}

function XE(t) {
  var e = t.constructor;
  return e === Array ? t.slice() : new e(t)
}

function ey(t, e, r, n, i) {
  var a = ww[r || "float"];
  if (i) {
    var o = t[e],
      s = o && o.length;
    if (s !== n) {
      for (var l = new a(n), u = 0; u < s; u++) l[u] = o[u];
      t[e] = l
    }
  } else t[e] = new a(n)
}
var jc = function () {
    function t() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = gt()
    }
    return t.prototype.initData = function (e, r, n) {
      this._provider = e, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var i = e.getSource(),
        a = this.defaultDimValueGetter = Mf[i.sourceFormat];
      this._dimValueGetter = n || a, this._rawExtent = [], vw(i), this._dimensions = ct(r, function (o) {
        return {
          type: o.type,
          property: o.property
        }
      }), this._initDataFromProvider(0, e.count())
    }, t.prototype.getProvider = function () {
      return this._provider
    }, t.prototype.getSource = function () {
      return this._provider.getSource()
    }, t.prototype.ensureCalculationDimension = function (e, r) {
      var n = this._calcDimNameToIdx,
        i = this._dimensions,
        a = n.get(e);
      if (a != null) {
        if (i[a].type === r) return a
      } else a = i.length;
      return i[a] = {
        type: r
      }, n.set(e, a), this._chunks[a] = new ww[r || "float"](this._rawCount), this._rawExtent[a] = Ei(), a
    }, t.prototype.collectOrdinalMeta = function (e, r) {
      var n = this._chunks[e],
        i = this._dimensions[e],
        a = this._rawExtent,
        o = i.ordinalOffset || 0,
        s = n.length;
      o === 0 && (a[e] = Ei());
      for (var l = a[e], u = o; u < s; u++) {
        var f = n[u] = r.parseAndCollect(n[u]);
        l[0] = Math.min(f, l[0]), l[1] = Math.max(f, l[1])
      }
      i.ordinalMeta = r, i.ordinalOffset = s, i.type = "ordinal"
    }, t.prototype.getOrdinalMeta = function (e) {
      var r = this._dimensions[e],
        n = r.ordinalMeta;
      return n
    }, t.prototype.getDimensionProperty = function (e) {
      var r = this._dimensions[e];
      return r && r.property
    }, t.prototype.appendData = function (e) {
      var r = this._provider,
        n = this.count();
      r.appendData(e);
      var i = r.count();
      return r.persistent || (i += n), n < i && this._initDataFromProvider(n, i, !0), [n, i]
    }, t.prototype.appendValues = function (e, r) {
      for (var n = this._chunks, i = this._dimensions, a = i.length, o = this._rawExtent, s = this.count(), l = s + Math.max(e.length, r || 0), u = 0; u < a; u++) {
        var f = i[u];
        ey(n, u, f.type, l, !0)
      }
      for (var c = [], h = s; h < l; h++)
        for (var v = h - s, d = 0; d < a; d++) {
          var f = i[d],
            y = Mf.arrayRows.call(this, e[v] || c, f.property, v, d);
          n[d][h] = y;
          var g = o[d];
          y < g[0] && (g[0] = y), y > g[1] && (g[1] = y)
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      }
    }, t.prototype._initDataFromProvider = function (e, r, n) {
      for (var i = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = ct(o, function (m) {
          return m.property
        }), f = 0; f < s; f++) {
        var c = o[f];
        l[f] || (l[f] = Ei()), ey(a, f, c.type, r, n)
      }
      if (i.fillStorage) i.fillStorage(e, r, a, l);
      else
        for (var h = [], v = e; v < r; v++) {
          h = i.getItem(v, h);
          for (var d = 0; d < s; d++) {
            var y = a[d],
              g = this._dimValueGetter(h, u[d], v, d);
            y[v] = g;
            var p = l[d];
            g < p[0] && (p[0] = g), g > p[1] && (p[1] = g)
          }
        }!i.persistent && i.clean && i.clean(), this._rawCount = this._count = r, this._extent = []
    }, t.prototype.count = function () {
      return this._count
    }, t.prototype.get = function (e, r) {
      if (!(r >= 0 && r < this._count)) return NaN;
      var n = this._chunks[e];
      return n ? n[this.getRawIndex(r)] : NaN
    }, t.prototype.getValues = function (e, r) {
      var n = [],
        i = [];
      if (r == null) {
        r = e, e = [];
        for (var a = 0; a < this._dimensions.length; a++) i.push(a)
      } else i = e;
      for (var a = 0, o = i.length; a < o; a++) n.push(this.get(i[a], r));
      return n
    }, t.prototype.getByRawIndex = function (e, r) {
      if (!(r >= 0 && r < this._rawCount)) return NaN;
      var n = this._chunks[e];
      return n ? n[r] : NaN
    }, t.prototype.getSum = function (e) {
      var r = this._chunks[e],
        n = 0;
      if (r)
        for (var i = 0, a = this.count(); i < a; i++) {
          var o = this.get(e, i);
          isNaN(o) || (n += o)
        }
      return n
    }, t.prototype.getMedian = function (e) {
      var r = [];
      this.each([e], function (a) {
        isNaN(a) || r.push(a)
      });
      var n = r.sort(function (a, o) {
          return a - o
        }),
        i = this.count();
      return i === 0 ? 0 : i % 2 === 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2
    }, t.prototype.indexOfRawIndex = function (e) {
      if (e >= this._rawCount || e < 0) return -1;
      if (!this._indices) return e;
      var r = this._indices,
        n = r[e];
      if (n != null && n < this._count && n === e) return e;
      for (var i = 0, a = this._count - 1; i <= a;) {
        var o = (i + a) / 2 | 0;
        if (r[o] < e) i = o + 1;
        else if (r[o] > e) a = o - 1;
        else return o
      }
      return -1
    }, t.prototype.indicesOfNearest = function (e, r, n) {
      var i = this._chunks,
        a = i[e],
        o = [];
      if (!a) return o;
      n == null && (n = 1 / 0);
      for (var s = 1 / 0, l = -1, u = 0, f = 0, c = this.count(); f < c; f++) {
        var h = this.getRawIndex(f),
          v = r - a[h],
          d = Math.abs(v);
        d <= n && ((d < s || d === s && v >= 0 && l < 0) && (s = d, l = v, u = 0), v === l && (o[u++] = f))
      }
      return o.length = u, o
    }, t.prototype.getIndices = function () {
      var e, r = this._indices;
      if (r) {
        var n = r.constructor,
          i = this._count;
        if (n === Array) {
          e = new n(i);
          for (var a = 0; a < i; a++) e[a] = r[a]
        } else e = new n(r.buffer, 0, i)
      } else {
        var n = ka(this._rawCount);
        e = new n(this.count());
        for (var a = 0; a < e.length; a++) e[a] = a
      }
      return e
    }, t.prototype.filter = function (e, r) {
      if (!this._count) return this;
      for (var n = this.clone(), i = n.count(), a = ka(n._rawCount), o = new a(i), s = [], l = e.length, u = 0, f = e[0], c = n._chunks, h = 0; h < i; h++) {
        var v = void 0,
          d = n.getRawIndex(h);
        if (l === 0) v = r(h);
        else if (l === 1) {
          var y = c[f][d];
          v = r(y, h)
        } else {
          for (var g = 0; g < l; g++) s[g] = c[e[g]][d];
          s[g] = h, v = r.apply(null, s)
        }
        v && (o[u++] = d)
      }
      return u < i && (n._indices = o), n._count = u, n._extent = [], n._updateGetRawIdx(), n
    }, t.prototype.selectRange = function (e) {
      var r = this.clone(),
        n = r._count;
      if (!n) return this;
      var i = Vt(e),
        a = i.length;
      if (!a) return this;
      var o = r.count(),
        s = ka(r._rawCount),
        l = new s(o),
        u = 0,
        f = i[0],
        c = e[f][0],
        h = e[f][1],
        v = r._chunks,
        d = !1;
      if (!r._indices) {
        var y = 0;
        if (a === 1) {
          for (var g = v[i[0]], p = 0; p < n; p++) {
            var m = g[p];
            (m >= c && m <= h || isNaN(m)) && (l[u++] = y), y++
          }
          d = !0
        } else if (a === 2) {
          for (var g = v[i[0]], _ = v[i[1]], w = e[i[1]][0], b = e[i[1]][1], p = 0; p < n; p++) {
            var m = g[p],
              S = _[p];
            (m >= c && m <= h || isNaN(m)) && (S >= w && S <= b || isNaN(S)) && (l[u++] = y), y++
          }
          d = !0
        }
      }
      if (!d)
        if (a === 1)
          for (var p = 0; p < o; p++) {
            var x = r.getRawIndex(p),
              m = v[i[0]][x];
            (m >= c && m <= h || isNaN(m)) && (l[u++] = x)
          } else
            for (var p = 0; p < o; p++) {
              for (var T = !0, x = r.getRawIndex(p), M = 0; M < a; M++) {
                var D = i[M],
                  m = v[D][x];
                (m < e[D][0] || m > e[D][1]) && (T = !1)
              }
              T && (l[u++] = r.getRawIndex(p))
            }
      return u < o && (r._indices = l), r._count = u, r._extent = [], r._updateGetRawIdx(), r
    }, t.prototype.map = function (e, r) {
      var n = this.clone(e);
      return this._updateDims(n, e, r), n
    }, t.prototype.modify = function (e, r) {
      this._updateDims(this, e, r)
    }, t.prototype._updateDims = function (e, r, n) {
      for (var i = e._chunks, a = [], o = r.length, s = e.count(), l = [], u = e._rawExtent, f = 0; f < r.length; f++) u[r[f]] = Ei();
      for (var c = 0; c < s; c++) {
        for (var h = e.getRawIndex(c), v = 0; v < o; v++) l[v] = i[r[v]][h];
        l[o] = c;
        var d = n && n.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var f = 0; f < d.length; f++) {
            var y = r[f],
              g = d[f],
              p = u[y],
              m = i[y];
            m && (m[h] = g), g < p[0] && (p[0] = g), g > p[1] && (p[1] = g)
          }
        }
      }
    }, t.prototype.lttbDownSample = function (e, r) {
      var n = this.clone([e], !0),
        i = n._chunks,
        a = i[e],
        o = this.count(),
        s = 0,
        l = Math.floor(1 / r),
        u = this.getRawIndex(0),
        f, c, h, v = new(ka(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      v[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var y = Math.min(d + l, o - 1), g = Math.min(d + l * 2, o), p = (g + y) / 2, m = 0, _ = y; _ < g; _++) {
          var w = this.getRawIndex(_),
            b = a[w];
          isNaN(b) || (m += b)
        }
        m /= g - y;
        var S = d,
          x = Math.min(d + l, o),
          T = d - 1,
          M = a[u];
        f = -1, h = S;
        for (var D = -1, I = 0, _ = S; _ < x; _++) {
          var w = this.getRawIndex(_),
            b = a[w];
          if (isNaN(b)) {
            I++, D < 0 && (D = w);
            continue
          }
          c = Math.abs((T - p) * (b - M) - (T - _) * (m - M)), c > f && (f = c, h = w)
        }
        I > 0 && I < x - S && (v[s++] = Math.min(D, h), h = Math.max(D, h)), v[s++] = h, u = h
      }
      return v[s++] = this.getRawIndex(o - 1), n._count = s, n._indices = v, n.getRawIndex = this._getRawIdx, n
    }, t.prototype.downSample = function (e, r, n, i) {
      for (var a = this.clone([e], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[e], f = this.count(), c = a._rawExtent[e] = Ei(), h = new(ka(this._rawCount))(Math.ceil(f / l)), v = 0, d = 0; d < f; d += l) {
        l > f - d && (l = f - d, s.length = l);
        for (var y = 0; y < l; y++) {
          var g = this.getRawIndex(d + y);
          s[y] = u[g]
        }
        var p = n(s),
          m = this.getRawIndex(Math.min(d + i(s, p) || 0, f - 1));
        u[m] = p, p < c[0] && (c[0] = p), p > c[1] && (c[1] = p), h[v++] = m
      }
      return a._count = v, a._indices = h, a._updateGetRawIdx(), a
    }, t.prototype.each = function (e, r) {
      if (!!this._count)
        for (var n = e.length, i = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (n) {
            case 0:
              r(a);
              break;
            case 1:
              r(i[e[0]][s], a);
              break;
            case 2:
              r(i[e[0]][s], i[e[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < n; l++) u[l] = i[e[l]][s];
              u[l] = a, r.apply(null, u)
          }
        }
    }, t.prototype.getDataExtent = function (e) {
      var r = this._chunks[e],
        n = Ei();
      if (!r) return n;
      var i = this.count(),
        a = !this._indices,
        o;
      if (a) return this._rawExtent[e].slice();
      if (o = this._extent[e], o) return o.slice();
      o = n;
      for (var s = o[0], l = o[1], u = 0; u < i; u++) {
        var f = this.getRawIndex(u),
          c = r[f];
        c < s && (s = c), c > l && (l = c)
      }
      return o = [s, l], this._extent[e] = o, o
    }, t.prototype.getRawDataItem = function (e) {
      var r = this.getRawIndex(e);
      if (this._provider.persistent) return this._provider.getItem(r);
      for (var n = [], i = this._chunks, a = 0; a < i.length; a++) n.push(i[a][r]);
      return n
    }, t.prototype.clone = function (e, r) {
      var n = new t,
        i = this._chunks,
        a = e && ga(e, function (s, l) {
          return s[l] = !0, s
        }, {});
      if (a)
        for (var o = 0; o < i.length; o++) n._chunks[o] = a[o] ? XE(i[o]) : i[o];
      else n._chunks = i;
      return this._copyCommonProps(n), r || (n._indices = this._cloneIndices()), n._updateGetRawIdx(), n
    }, t.prototype._copyCommonProps = function (e) {
      e._count = this._count, e._rawCount = this._rawCount, e._provider = this._provider, e._dimensions = this._dimensions, e._extent = St(this._extent), e._rawExtent = St(this._rawExtent)
    }, t.prototype._cloneIndices = function () {
      if (this._indices) {
        var e = this._indices.constructor,
          r = void 0;
        if (e === Array) {
          var n = this._indices.length;
          r = new e(n);
          for (var i = 0; i < n; i++) r[i] = this._indices[i]
        } else r = new e(this._indices);
        return r
      }
      return null
    }, t.prototype._getRawIdxIdentity = function (e) {
      return e
    }, t.prototype._getRawIdx = function (e) {
      return e < this._count && e >= 0 ? this._indices[e] : -1
    }, t.prototype._updateGetRawIdx = function () {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity
    }, t.internalField = function () {
      function e(r, n, i, a) {
        return ll(r[a], this._dimensions[a])
      }
      Mf = {
        arrayRows: e,
        objectRows: function (r, n, i, a) {
          return ll(r[n], this._dimensions[a])
        },
        keyedColumns: e,
        original: function (r, n, i, a) {
          var o = r && (r.value == null ? r : r.value);
          return ll(o instanceof Array ? o[a] : o, this._dimensions[a])
        },
        typedArray: function (r, n, i, a) {
          return r[a]
        }
      }
    }(), t
  }(),
  qE = function () {
    function t(e) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = e
    }
    return t.prototype.dirty = function () {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0
    }, t.prototype._setLocalSource = function (e, r) {
      this._sourceList = e, this._upstreamSignList = r, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0)
    }, t.prototype._getVersionSign = function () {
      return this._sourceHost.uid + "_" + this._versionSignBase
    }, t.prototype.prepareSource = function () {
      this._isDirty() && (this._createSource(), this._dirty = !1)
    }, t.prototype._createSource = function () {
      this._setLocalSource([], []);
      var e = this._sourceHost,
        r = this._getUpstreamSourceManagers(),
        n = !!r.length,
        i, a;
      if (Ps(e)) {
        var o = e,
          s = void 0,
          l = void 0,
          u = void 0;
        if (n) {
          var f = r[0];
          f.prepareSource(), u = f.getSource(), s = u.data, l = u.sourceFormat, a = [f._getVersionSign()]
        } else s = o.get("data", !0), l = Ie(s) ? pn : Xe, a = [];
        var c = this._getSourceMetaRawOption() || {},
          h = u && u.metaRawOption || {},
          v = Mt(c.seriesLayoutBy, h.seriesLayoutBy) || null,
          d = Mt(c.sourceHeader, h.sourceHeader),
          y = Mt(c.dimensions, h.dimensions),
          g = v !== h.seriesLayoutBy || !!d != !!h.sourceHeader || y;
        i = g ? [Zc(s, {
          seriesLayoutBy: v,
          sourceHeader: d,
          dimensions: y
        }, l)] : []
      } else {
        var p = e;
        if (n) {
          var m = this._applyTransform(r);
          i = m.sourceList, a = m.upstreamSignList
        } else {
          var _ = p.get("source", !0);
          i = [Zc(_, this._getSourceMetaRawOption(), null)], a = []
        }
      }
      this._setLocalSource(i, a)
    }, t.prototype._applyTransform = function (e) {
      var r = this._sourceHost,
        n = r.get("transform", !0),
        i = r.get("fromTransformResult", !0);
      if (i != null) {
        var a = "";
        e.length !== 1 && ry(a)
      }
      var o, s = [],
        l = [];
      return P(e, function (u) {
        u.prepareSource();
        var f = u.getSource(i || 0),
          c = "";
        i != null && !f && ry(c), s.push(f), l.push(u._getVersionSign())
      }), n ? o = GE(n, s, {
        datasetIndex: r.componentIndex
      }) : i != null && (o = [ME(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      }
    }, t.prototype._isDirty = function () {
      if (this._dirty) return !0;
      for (var e = this._getUpstreamSourceManagers(), r = 0; r < e.length; r++) {
        var n = e[r];
        if (n._isDirty() || this._upstreamSignList[r] !== n._getVersionSign()) return !0
      }
    }, t.prototype.getSource = function (e) {
      e = e || 0;
      var r = this._sourceList[e];
      if (!r) {
        var n = this._getUpstreamSourceManagers();
        return n[0] && n[0].getSource(e)
      }
      return r
    }, t.prototype.getSharedDataStore = function (e) {
      var r = e.makeStoreSchema();
      return this._innerGetDataStore(r.dimensions, e.source, r.hash)
    }, t.prototype._innerGetDataStore = function (e, r, n) {
      var i = 0,
        a = this._storeList,
        o = a[i];
      o || (o = a[i] = {});
      var s = o[n];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        Ps(this._sourceHost) && l ? s = l._innerGetDataStore(e, r, n) : (s = new jc, s.initData(new dw(r, e.length), e)), o[n] = s
      }
      return s
    }, t.prototype._getUpstreamSourceManagers = function () {
      var e = this._sourceHost;
      if (Ps(e)) {
        var r = aw(e);
        return r ? [r.getSourceManager()] : []
      } else return ct(jI(e), function (n) {
        return n.getSourceManager()
      })
    }, t.prototype._getSourceMetaRawOption = function () {
      var e = this._sourceHost,
        r, n, i;
      if (Ps(e)) r = e.get("seriesLayoutBy", !0), n = e.get("sourceHeader", !0), i = e.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = e;
        r = a.get("seriesLayoutBy", !0), n = a.get("sourceHeader", !0), i = a.get("dimensions", !0)
      }
      return {
        seriesLayoutBy: r,
        sourceHeader: n,
        dimensions: i
      }
    }, t
  }();

function Ps(t) {
  return t.mainType === "series"
}

function ry(t) {
  throw new Error(t)
}
var Sw = "line-height:1";

function bw(t, e) {
  var r = t.color || "#6e7079",
    n = t.fontSize || 12,
    i = t.fontWeight || "400",
    a = t.color || "#464646",
    o = t.fontSize || 14,
    s = t.fontWeight || "900";
  return e === "html" ? {
    nameStyle: "font-size:" + Ge(n + "") + "px;color:" + Ge(r) + ";font-weight:" + Ge(i + ""),
    valueStyle: "font-size:" + Ge(o + "") + "px;color:" + Ge(a) + ";font-weight:" + Ge(s + "")
  } : {
    nameStyle: {
      fontSize: n,
      fill: r,
      fontWeight: i
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  }
}
var KE = [0, 10, 20, 30],
  ZE = ["", `
`, `

`, `


`];

function Ho(t, e) {
  return e.type = t, e
}

function Qc(t) {
  return t.type === "section"
}

function xw(t) {
  return Qc(t) ? jE : QE
}

function Cw(t) {
  if (Qc(t)) {
    var e = 0,
      r = t.blocks.length,
      n = r > 1 || r > 0 && !t.noHeader;
    return P(t.blocks, function (i) {
      var a = Cw(i);
      a >= e && (e = a + +(n && (!a || Qc(i) && !i.noHeader)))
    }), e
  }
  return 0
}

function jE(t, e, r, n) {
  var i = e.noHeader,
    a = JE(Cw(e)),
    o = [],
    s = e.blocks || [];
  Or(!s || et(s)), s = s || [];
  var l = t.orderMode;
  if (e.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (oa(u, l)) {
      var f = new kE(u[l], null);
      s.sort(function (d, y) {
        return f.evaluate(d.sortParam, y.sortParam)
      })
    } else l === "seriesDesc" && s.reverse()
  }
  P(s, function (d, y) {
    var g = e.valueFormatter,
      p = xw(d)(g ? q(q({}, t), {
        valueFormatter: g
      }) : t, d, y > 0 ? a.html : 0, n);
    p != null && o.push(p)
  });
  var c = t.renderMode === "richText" ? o.join(a.richText) : Jc(o.join(""), i ? r : a.html);
  if (i) return c;
  var h = Kc(e.header, "ordinal", t.useUTC),
    v = bw(n, t.renderMode).nameStyle;
  return t.renderMode === "richText" ? Tw(t, h, v) + a.richText + c : Jc('<div style="' + v + ";" + Sw + ';">' + Ge(h) + "</div>" + c, r)
}

function QE(t, e, r, n) {
  var i = t.renderMode,
    a = e.noName,
    o = e.noValue,
    s = !e.markerType,
    l = e.name,
    u = t.useUTC,
    f = e.valueFormatter || t.valueFormatter || function (w) {
      return w = et(w) ? w : [w], ct(w, function (b, S) {
        return Kc(b, et(v) ? v[S] : v, u)
      })
    };
  if (!(a && o)) {
    var c = s ? "" : t.markupStyleCreator.makeTooltipMarker(e.markerType, e.markerColor || "#333", i),
      h = a ? "" : Kc(l, "ordinal", u),
      v = e.valueType,
      d = o ? [] : f(e.value),
      y = !s || !a,
      g = !s && a,
      p = bw(n, i),
      m = p.nameStyle,
      _ = p.valueStyle;
    return i === "richText" ? (s ? "" : c) + (a ? "" : Tw(t, h, m)) + (o ? "" : rL(t, d, y, g, _)) : Jc((s ? "" : c) + (a ? "" : tL(h, !s, m)) + (o ? "" : eL(d, y, g, _)), r)
  }
}

function ny(t, e, r, n, i, a) {
  if (!!t) {
    var o = xw(t),
      s = {
        useUTC: i,
        renderMode: r,
        orderMode: n,
        markupStyleCreator: e,
        valueFormatter: t.valueFormatter
      };
    return o(s, t, 0, a)
  }
}

function JE(t) {
  return {
    html: KE[t],
    richText: ZE[t]
  }
}

function Jc(t, e) {
  var r = '<div style="clear:both"></div>',
    n = "margin: " + e + "px 0 0";
  return '<div style="' + n + ";" + Sw + ';">' + t + r + "</div>"
}

function tL(t, e, r) {
  var n = e ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + n + '">' + Ge(t) + "</span>"
}

function eL(t, e, r, n) {
  var i = r ? "10px" : "20px",
    a = e ? "float:right;margin-left:" + i : "";
  return t = et(t) ? t : [t], '<span style="' + a + ";" + n + '">' + ct(t, function (o) {
    return Ge(o)
  }).join("&nbsp;&nbsp;") + "</span>"
}

function Tw(t, e, r) {
  return t.markupStyleCreator.wrapRichTextStyle(e, r)
}

function rL(t, e, r, n, i) {
  var a = [i],
    o = n ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), t.markupStyleCreator.wrapRichTextStyle(et(e) ? e.join("  ") : e, a)
}

function nL(t, e) {
  var r = t.getData().getItemVisual(e, "style"),
    n = r[t.visualDrawType];
  return hi(n)
}

function Mw(t, e) {
  var r = t.get("padding");
  return r != null ? r : e === "richText" ? [8, 10] : 10
}
var Df = function () {
  function t() {
    this.richTextStyles = {}, this._nextStyleNameId = F_()
  }
  return t.prototype._generateStyleName = function () {
    return "__EC_aUTo_" + this._nextStyleNameId++
  }, t.prototype.makeTooltipMarker = function (e, r, n) {
    var i = n === "richText" ? this._generateStyleName() : null,
      a = GI({
        color: r,
        type: e,
        renderMode: n,
        markerId: i
      });
    return nt(a) ? a : (this.richTextStyles[i] = a.style, a.content)
  }, t.prototype.wrapRichTextStyle = function (e, r) {
    var n = {};
    et(r) ? P(r, function (a) {
      return q(n, a)
    }) : q(n, r);
    var i = this._generateStyleName();
    return this.richTextStyles[i] = n, "{" + i + "|" + e + "}"
  }, t
}();

function iL(t) {
  var e = t.series,
    r = t.dataIndex,
    n = t.multipleSeries,
    i = e.getData(),
    a = i.mapDimensionsAll("defaultedTooltip"),
    o = a.length,
    s = e.getRawValue(r),
    l = et(s),
    u = nL(e, r),
    f, c, h, v;
  if (o > 1 || l && !o) {
    var d = aL(s, e, r, a, u);
    f = d.inlineValues, c = d.inlineValueTypes, h = d.blocks, v = d.inlineValues[0]
  } else if (o) {
    var y = i.getDimensionInfo(a[0]);
    v = f = la(i, r, a[0]), c = y.type
  } else v = f = l ? s[0] : s;
  var g = gv(e),
    p = g && e.name || "",
    m = i.getName(r),
    _ = n ? p : m;
  return Ho("section", {
    header: p,
    noHeader: n || !g,
    sortParam: v,
    blocks: [Ho("nameValue", {
      markerType: "item",
      markerColor: u,
      name: _,
      noName: !vr(_),
      value: f,
      valueType: c
    })].concat(h || [])
  })
}

function aL(t, e, r, n, i) {
  var a = e.getData(),
    o = ga(t, function (c, h, v) {
      var d = a.getDimensionInfo(v);
      return c = c || d && d.tooltip !== !1 && d.displayName != null
    }, !1),
    s = [],
    l = [],
    u = [];
  n.length ? P(n, function (c) {
    f(la(a, r, c), c)
  }) : P(t, f);

  function f(c, h) {
    var v = a.getDimensionInfo(h);
    !v || v.otherDims.tooltip === !1 || (o ? u.push(Ho("nameValue", {
      markerType: "subItem",
      markerColor: i,
      name: v.displayName,
      value: c,
      valueType: v.type
    })) : (s.push(c), l.push(v.type)))
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  }
}
var qr = Kt();

function Is(t, e) {
  return t.getName(e) || t.getId(e)
}
var oL = "__universalTransitionEnabled",
  Su = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r
    }
    return e.prototype.init = function (r, n, i) {
      this.seriesIndex = this.componentIndex, this.dataTask = yo({
        count: lL,
        reset: uL
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, i);
      var a = qr(this).sourceManager = new qE(this);
      a.prepareSource();
      var o = this.getInitialData(r, i);
      ay(o, this), this.dataTask.context.data = o, qr(this).dataBeforeProcessed = o, iy(this), this._initSelectedMapFromData(o)
    }, e.prototype.mergeDefaultAndTheme = function (r, n) {
      var i = Fo(this),
        a = i ? mu(r) : {},
        o = this.subType;
      zt.hasClass(o) && (o += "Series"), Tt(r, n.getTheme().get(this.subType)), Tt(r, this.getDefaultOption()), Fp(r, "label", ["show"]), this.fillDataTextStyle(r.data), i && sa(r, a, i)
    }, e.prototype.mergeOption = function (r, n) {
      r = Tt(this.option, r, !0), this.fillDataTextStyle(r.data);
      var i = Fo(this);
      i && sa(this.option, r, i);
      var a = qr(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, n);
      ay(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, qr(this).dataBeforeProcessed = o, iy(this), this._initSelectedMapFromData(o)
    }, e.prototype.fillDataTextStyle = function (r) {
      if (r && !Ie(r))
        for (var n = ["show"], i = 0; i < r.length; i++) r[i] && r[i].label && Fp(r[i], "label", n)
    }, e.prototype.getInitialData = function (r, n) {}, e.prototype.appendData = function (r) {
      var n = this.getRawData();
      n.appendData(r.data)
    }, e.prototype.getData = function (r) {
      var n = th(this);
      if (n) {
        var i = n.context.data;
        return r == null ? i : i.getLinkedData(r)
      } else return qr(this).data
    }, e.prototype.getAllData = function () {
      var r = this.getData();
      return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{
        data: r
      }]
    }, e.prototype.setData = function (r) {
      var n = th(this);
      if (n) {
        var i = n.context;
        i.outputData = r, n !== this.dataTask && (i.data = r)
      }
      qr(this).data = r
    }, e.prototype.getEncode = function () {
      var r = this.get("encode", !0);
      if (r) return gt(r)
    }, e.prototype.getSourceManager = function () {
      return qr(this).sourceManager
    }, e.prototype.getSource = function () {
      return this.getSourceManager().getSource()
    }, e.prototype.getRawData = function () {
      return qr(this).dataBeforeProcessed
    }, e.prototype.getColorBy = function () {
      var r = this.get("colorBy");
      return r || "series"
    }, e.prototype.isColorBySeries = function () {
      return this.getColorBy() === "series"
    }, e.prototype.getBaseAxis = function () {
      var r = this.coordinateSystem;
      return r && r.getBaseAxis && r.getBaseAxis()
    }, e.prototype.formatTooltip = function (r, n, i) {
      return iL({
        series: this,
        dataIndex: r,
        multipleSeries: n
      })
    }, e.prototype.isAnimationEnabled = function () {
      var r = this.ecModel;
      if (mt.node && !(r && r.ssr)) return !1;
      var n = this.getShallow("animation");
      return n && this.getData().count() > this.getShallow("animationThreshold") && (n = !1), !!n
    }, e.prototype.restoreData = function () {
      this.dataTask.dirty()
    }, e.prototype.getColorFromPalette = function (r, n, i) {
      var a = this.ecModel,
        o = Hv.prototype.getColorFromPalette.call(this, r, n, i);
      return o || (o = a.getColorFromPalette(r, n, i)), o
    }, e.prototype.coordDimToDataDim = function (r) {
      return this.getRawData().mapDimensionsAll(r)
    }, e.prototype.getProgressive = function () {
      return this.get("progressive")
    }, e.prototype.getProgressiveThreshold = function () {
      return this.get("progressiveThreshold")
    }, e.prototype.select = function (r, n) {
      this._innerSelect(this.getData(n), r)
    }, e.prototype.unselect = function (r, n) {
      var i = this.option.selectedMap;
      if (!!i) {
        var a = this.option.selectedMode,
          o = this.getData(n);
        if (a === "series" || i === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return
        }
        for (var s = 0; s < r.length; s++) {
          var l = r[s],
            u = Is(o, l);
          i[u] = !1, this._selectedDataIndicesMap[u] = -1
        }
      }
    }, e.prototype.toggleSelect = function (r, n) {
      for (var i = [], a = 0; a < r.length; a++) i[0] = r[a], this.isSelected(r[a], n) ? this.unselect(i, n) : this.select(i, n)
    }, e.prototype.getSelectedDataIndices = function () {
      if (this.option.selectedMap === "all") return [].slice.call(this.getData().getIndices());
      for (var r = this._selectedDataIndicesMap, n = Vt(r), i = [], a = 0; a < n.length; a++) {
        var o = r[n[a]];
        o >= 0 && i.push(o)
      }
      return i
    }, e.prototype.isSelected = function (r, n) {
      var i = this.option.selectedMap;
      if (!i) return !1;
      var a = this.getData(n);
      return (i === "all" || i[Is(a, r)]) && !a.getItemModel(r).get(["select", "disabled"])
    }, e.prototype.isUniversalTransitionEnabled = function () {
      if (this[oL]) return !0;
      var r = this.option.universalTransition;
      return r ? r === !0 ? !0 : r && r.enabled : !1
    }, e.prototype._innerSelect = function (r, n) {
      var i, a, o = this.option,
        s = o.selectedMode,
        l = n.length;
      if (!(!s || !l)) {
        if (s === "series") o.selectedMap = "all";
        else if (s === "multiple") {
          st(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, f = 0; f < l; f++) {
            var c = n[f],
              h = Is(r, c);
            u[h] = !0, this._selectedDataIndicesMap[h] = r.getRawIndex(c)
          }
        } else if (s === "single" || s === !0) {
          var v = n[l - 1],
            h = Is(r, v);
          o.selectedMap = (i = {}, i[h] = !0, i), this._selectedDataIndicesMap = (a = {}, a[h] = r.getRawIndex(v), a)
        }
      }
    }, e.prototype._initSelectedMapFromData = function (r) {
      if (!this.option.selectedMap) {
        var n = [];
        r.hasItemOption && r.each(function (i) {
          var a = r.getRawDataItem(i);
          a && a.selected && n.push(i)
        }), n.length > 0 && this._innerSelect(r, n)
      }
    }, e.registerClass = function (r) {
      return zt.registerClass(r)
    }, e.protoInitialize = function () {
      var r = e.prototype;
      r.type = "series.__base__", r.seriesIndex = 0, r.ignoreStyleOnData = !1, r.hasSymbolVisual = !1, r.defaultSymbol = "circle", r.visualStyleAccessPath = "itemStyle", r.visualDrawType = "fill"
    }(), e
  }(zt);
mr(Su, RE);
mr(Su, Hv);
W_(Su, zt);

function iy(t) {
  var e = t.name;
  gv(t) || (t.name = sL(t) || e)
}

function sL(t) {
  var e = t.getRawData(),
    r = e.mapDimensionsAll("seriesName"),
    n = [];
  return P(r, function (i) {
    var a = e.getDimensionInfo(i);
    a.displayName && n.push(a.displayName)
  }), n.join(" ")
}

function lL(t) {
  return t.model.getRawData().count()
}

function uL(t) {
  var e = t.model;
  return e.setData(e.getRawData().cloneShallow()), fL
}

function fL(t, e) {
  e.outputData && t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData)
}

function ay(t, e) {
  P(rM(t.CHANGABLE_METHODS, t.DOWNSAMPLE_METHODS), function (r) {
    t.wrapMethod(r, jt(cL, e))
  })
}

function cL(t, e) {
  var r = th(t);
  return r && r.setOutputEnd((e || this).count()), e
}

function th(t) {
  var e = (t.ecModel || {}).scheduler,
    r = e && e.getPipeline(t.uid);
  if (r) {
    var n = r.currentTask;
    if (n) {
      var i = n.agentStubMap;
      i && (n = i.get(t.uid))
    }
    return n
  }
}
var Vo = Su,
  Yv = function () {
    function t() {
      this.group = new ce, this.uid = cu("viewComponent")
    }
    return t.prototype.init = function (e, r) {}, t.prototype.render = function (e, r, n, i) {}, t.prototype.dispose = function (e, r) {}, t.prototype.updateView = function (e, r, n, i) {}, t.prototype.updateLayout = function (e, r, n, i) {}, t.prototype.updateVisual = function (e, r, n, i) {}, t.prototype.blurSeries = function (e, r) {}, t.prototype.eachRendered = function (e) {
      var r = this.group;
      r && r.traverse(e)
    }, t
  }();
mv(Yv);
iu(Yv);
var Br = Yv;

function Dw() {
  var t = Kt();
  return function (e) {
    var r = t(e),
      n = e.pipelineContext,
      i = !!r.large,
      a = !!r.progressiveRender,
      o = r.large = !!(n && n.large),
      s = r.progressiveRender = !!(n && n.progressiveRender);
    return (i !== o || a !== s) && "reset"
  }
}
var Aw = Kt(),
  hL = Dw(),
  Xv = function () {
    function t() {
      this.group = new ce, this.uid = cu("viewChart"), this.renderTask = yo({
        plan: vL,
        reset: dL
      }), this.renderTask.context = {
        view: this
      }
    }
    return t.prototype.init = function (e, r) {}, t.prototype.render = function (e, r, n, i) {}, t.prototype.highlight = function (e, r, n, i) {
      var a = e.getData(i && i.dataType);
      !a || sy(a, i, "emphasis")
    }, t.prototype.downplay = function (e, r, n, i) {
      var a = e.getData(i && i.dataType);
      !a || sy(a, i, "normal")
    }, t.prototype.remove = function (e, r) {
      this.group.removeAll()
    }, t.prototype.dispose = function (e, r) {}, t.prototype.updateView = function (e, r, n, i) {
      this.render(e, r, n, i)
    }, t.prototype.updateLayout = function (e, r, n, i) {
      this.render(e, r, n, i)
    }, t.prototype.updateVisual = function (e, r, n, i) {
      this.render(e, r, n, i)
    }, t.prototype.eachRendered = function (e) {
      Ev(this.group, e)
    }, t.markUpdateMethod = function (e, r) {
      Aw(e).updateMethod = r
    }, t.protoInitialize = function () {
      var e = t.prototype;
      e.type = "chart"
    }(), t
  }();

function oy(t, e, r) {
  t && Uc(t) && (e === "emphasis" ? Pl : Il)(t, r)
}

function sy(t, e, r) {
  var n = ui(t, e),
    i = e && e.highlightKey != null ? pP(e.highlightKey) : null;
  n != null ? P(fe(n), function (a) {
    oy(t.getItemGraphicEl(a), r, i)
  }) : t.eachItemGraphicEl(function (a) {
    oy(a, r, i)
  })
}
mv(Xv);
iu(Xv);

function vL(t) {
  return hL(t.model)
}

function dL(t) {
  var e = t.model,
    r = t.ecModel,
    n = t.api,
    i = t.payload,
    a = e.pipelineContext.progressiveRender,
    o = t.view,
    s = i && Aw(i).updateMethod,
    l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](e, r, n, i), pL[l]
}
var pL = {
    incrementalPrepareRender: {
      progress: function (t, e) {
        e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload)
      }
    },
    render: {
      forceFirstProgress: !0,
      progress: function (t, e) {
        e.view.render(e.model, e.ecModel, e.api, e.payload)
      }
    }
  },
  gn = Xv,
  Bl = "\0__throttleOriginMethod",
  ly = "\0__throttleRate",
  uy = "\0__throttleType";

function Pw(t, e, r) {
  var n, i = 0,
    a = 0,
    o = null,
    s, l, u, f;
  e = e || 0;

  function c() {
    a = new Date().getTime(), o = null, t.apply(l, u || [])
  }
  var h = function () {
    for (var v = [], d = 0; d < arguments.length; d++) v[d] = arguments[d];
    n = new Date().getTime(), l = this, u = v;
    var y = f || e,
      g = f || r;
    f = null, s = n - (g ? i : a) - y, clearTimeout(o), g ? o = setTimeout(c, y) : s >= 0 ? c() : o = setTimeout(c, -s), i = n
  };
  return h.clear = function () {
    o && (clearTimeout(o), o = null)
  }, h.debounceNextCall = function (v) {
    f = v
  }, h
}

function Iw(t, e, r, n) {
  var i = t[e];
  if (!!i) {
    var a = i[Bl] || i,
      o = i[uy],
      s = i[ly];
    if (s !== r || o !== n) {
      if (r == null || !n) return t[e] = a;
      i = t[e] = Pw(a, r, n === "debounce"), i[Bl] = a, i[uy] = n, i[ly] = r
    }
    return i
  }
}

function eh(t, e) {
  var r = t[e];
  r && r[Bl] && (r.clear && r.clear(), t[e] = r[Bl])
}
var fy = Kt(),
  cy = {
    itemStyle: Oo(V1, !0),
    lineStyle: Oo(H1, !0)
  },
  gL = {
    lineStyle: "stroke",
    itemStyle: "fill"
  };

function Ew(t, e) {
  var r = t.visualStyleMapper || cy[e];
  return r || (console.warn("Unkown style type '" + e + "'."), cy.itemStyle)
}

function Lw(t, e) {
  var r = t.visualDrawType || gL[e];
  return r || (console.warn("Unkown style type '" + e + "'."), "fill")
}
var yL = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (t, e) {
      var r = t.getData(),
        n = t.visualStyleAccessPath || "itemStyle",
        i = t.getModel(n),
        a = Ew(t, n),
        o = a(i),
        s = i.getShallow("decal");
      s && (r.setVisual("decal", s), s.dirty = !0);
      var l = Lw(t, n),
        u = o[l],
        f = dt(u) ? u : null,
        c = o.fill === "auto" || o.stroke === "auto";
      if (!o[l] || f || c) {
        var h = t.getColorFromPalette(t.name, null, e.getSeriesCount());
        o[l] || (o[l] = h, r.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || dt(o.fill) ? h : o.fill, o.stroke = o.stroke === "auto" || dt(o.stroke) ? h : o.stroke
      }
      if (r.setVisual("style", o), r.setVisual("drawType", l), !e.isSeriesFiltered(t) && f) return r.setVisual("colorFromPalette", !1), {
        dataEach: function (v, d) {
          var y = t.getDataParams(d),
            g = q({}, o);
          g[l] = f(y), v.setItemVisual(d, "style", g)
        }
      }
    }
  },
  Ba = new ae,
  mL = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (t, e) {
      if (!(t.ignoreStyleOnData || e.isSeriesFiltered(t))) {
        var r = t.getData(),
          n = t.visualStyleAccessPath || "itemStyle",
          i = Ew(t, n),
          a = r.getVisual("drawType");
        return {
          dataEach: r.hasItemOption ? function (o, s) {
            var l = o.getRawDataItem(s);
            if (l && l[n]) {
              Ba.option = l[n];
              var u = i(Ba),
                f = o.ensureUniqueItemVisual(s, "style");
              q(f, u), Ba.option.decal && (o.setItemVisual(s, "decal", Ba.option.decal), Ba.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1)
            }
          } : null
        }
      }
    }
  },
  _L = {
    performRawSeries: !0,
    overallReset: function (t) {
      var e = gt();
      t.eachSeries(function (r) {
        var n = r.getColorBy();
        if (!r.isColorBySeries()) {
          var i = r.type + "-" + n,
            a = e.get(i);
          a || (a = {}, e.set(i, a)), fy(r).scope = a
        }
      }), t.eachSeries(function (r) {
        if (!(r.isColorBySeries() || t.isSeriesFiltered(r))) {
          var n = r.getRawData(),
            i = {},
            a = r.getData(),
            o = fy(r).scope,
            s = r.visualStyleAccessPath || "itemStyle",
            l = Lw(r, s);
          a.each(function (u) {
            var f = a.getRawIndex(u);
            i[f] = u
          }), n.each(function (u) {
            var f = i[u],
              c = a.getItemVisual(f, "colorFromPalette");
            if (c) {
              var h = a.ensureUniqueItemVisual(f, "style"),
                v = n.getName(u) || u + "",
                d = n.count();
              h[l] = r.getColorFromPalette(v, o, d)
            }
          })
        }
      })
    }
  },
  Es = Math.PI;

function wL(t, e) {
  e = e || {}, Dt(e, {
    text: "loading",
    textColor: "#000",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255, 255, 255, 0.8)",
    showSpinner: !0,
    color: "#5470c6",
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var r = new ce,
    n = new Qt({
      style: {
        fill: e.maskColor
      },
      zlevel: e.zlevel,
      z: 1e4
    });
  r.add(n);
  var i = new he({
      style: {
        text: e.text,
        fill: e.textColor,
        fontSize: e.fontSize,
        fontWeight: e.fontWeight,
        fontStyle: e.fontStyle,
        fontFamily: e.fontFamily
      },
      zlevel: e.zlevel,
      z: 10001
    }),
    a = new Qt({
      style: {
        fill: "none"
      },
      textContent: i,
      textConfig: {
        position: "right",
        distance: 10
      },
      zlevel: e.zlevel,
      z: 10001
    });
  r.add(a);
  var o;
  return e.showSpinner && (o = new Tv({
    shape: {
      startAngle: -Es / 2,
      endAngle: -Es / 2 + .1,
      r: e.spinnerRadius
    },
    style: {
      stroke: e.color,
      lineCap: "round",
      lineWidth: e.lineWidth
    },
    zlevel: e.zlevel,
    z: 10001
  }), o.animateShape(!0).when(1e3, {
    endAngle: Es * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Es * 3 / 2
  }).delay(300).start("circularInOut"), r.add(o)), r.resize = function () {
    var s = i.getBoundingRect().width,
      l = e.showSpinner ? e.spinnerRadius : 0,
      u = (t.getWidth() - l * 2 - (e.showSpinner && s ? 10 : 0) - s) / 2 - (e.showSpinner && s ? 0 : 5 + s / 2) + (e.showSpinner ? 0 : s / 2) + (s ? 0 : l),
      f = t.getHeight() / 2;
    e.showSpinner && o.setShape({
      cx: u,
      cy: f
    }), a.setShape({
      x: u - l,
      y: f - l,
      width: l * 2,
      height: l * 2
    }), n.setShape({
      x: 0,
      y: 0,
      width: t.getWidth(),
      height: t.getHeight()
    })
  }, r.resize(), r
}
var SL = function () {
  function t(e, r, n, i) {
    this._stageTaskMap = gt(), this.ecInstance = e, this.api = r, n = this._dataProcessorHandlers = n.slice(), i = this._visualHandlers = i.slice(), this._allHandlers = n.concat(i)
  }
  return t.prototype.restoreData = function (e, r) {
    e.restoreData(r), this._stageTaskMap.each(function (n) {
      var i = n.overallTask;
      i && i.dirty()
    })
  }, t.prototype.getPerformArgs = function (e, r) {
    if (!!e.__pipeline) {
      var n = this._pipelineMap.get(e.__pipeline.id),
        i = n.context,
        a = !r && n.progressiveEnabled && (!i || i.progressiveRender) && e.__idxInPipeline > n.blockIndex,
        o = a ? n.step : null,
        s = i && i.modDataCount,
        l = s != null ? Math.ceil(s / o) : null;
      return {
        step: o,
        modBy: l,
        modDataCount: s
      }
    }
  }, t.prototype.getPipeline = function (e) {
    return this._pipelineMap.get(e)
  }, t.prototype.updateStreamModes = function (e, r) {
    var n = this._pipelineMap.get(e.uid),
      i = e.getData(),
      a = i.count(),
      o = n.progressiveEnabled && r.incrementalPrepareRender && a >= n.threshold,
      s = e.get("large") && a >= e.get("largeThreshold"),
      l = e.get("progressiveChunkMode") === "mod" ? a : null;
    e.pipelineContext = n.context = {
      progressiveRender: o,
      modDataCount: l,
      large: s
    }
  }, t.prototype.restorePipelines = function (e) {
    var r = this,
      n = r._pipelineMap = gt();
    e.eachSeries(function (i) {
      var a = i.getProgressive(),
        o = i.uid;
      n.set(o, {
        id: o,
        head: null,
        tail: null,
        threshold: i.getProgressiveThreshold(),
        progressiveEnabled: a && !(i.preventIncremental && i.preventIncremental()),
        blockIndex: -1,
        step: Math.round(a || 700),
        count: 0
      }), r._pipe(i, i.dataTask)
    })
  }, t.prototype.prepareStageTasks = function () {
    var e = this._stageTaskMap,
      r = this.api.getModel(),
      n = this.api;
    P(this._allHandlers, function (i) {
      var a = e.get(i.uid) || e.set(i.uid, {}),
        o = "";
      Or(!(i.reset && i.overallReset), o), i.reset && this._createSeriesStageTask(i, a, r, n), i.overallReset && this._createOverallStageTask(i, a, r, n)
    }, this)
  }, t.prototype.prepareView = function (e, r, n, i) {
    var a = e.renderTask,
      o = a.context;
    o.model = r, o.ecModel = n, o.api = i, a.__block = !e.incrementalPrepareRender, this._pipe(r, a)
  }, t.prototype.performDataProcessorTasks = function (e, r) {
    this._performStageTasks(this._dataProcessorHandlers, e, r, {
      block: !0
    })
  }, t.prototype.performVisualTasks = function (e, r, n) {
    this._performStageTasks(this._visualHandlers, e, r, n)
  }, t.prototype._performStageTasks = function (e, r, n, i) {
    i = i || {};
    var a = !1,
      o = this;
    P(e, function (l, u) {
      if (!(i.visualType && i.visualType !== l.visualType)) {
        var f = o._stageTaskMap.get(l.uid),
          c = f.seriesTaskMap,
          h = f.overallTask;
        if (h) {
          var v, d = h.agentStubMap;
          d.each(function (g) {
            s(i, g) && (g.dirty(), v = !0)
          }), v && h.dirty(), o.updatePayload(h, n);
          var y = o.getPerformArgs(h, i.block);
          d.each(function (g) {
            g.perform(y)
          }), h.perform(y) && (a = !0)
        } else c && c.each(function (g, p) {
          s(i, g) && g.dirty();
          var m = o.getPerformArgs(g, i.block);
          m.skip = !l.performRawSeries && r.isSeriesFiltered(g.context.model), o.updatePayload(g, n), g.perform(m) && (a = !0)
        })
      }
    });

    function s(l, u) {
      return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id))
    }
    this.unfinished = a || this.unfinished
  }, t.prototype.performSeriesTasks = function (e) {
    var r;
    e.eachSeries(function (n) {
      r = n.dataTask.perform() || r
    }), this.unfinished = r || this.unfinished
  }, t.prototype.plan = function () {
    this._pipelineMap.each(function (e) {
      var r = e.tail;
      do {
        if (r.__block) {
          e.blockIndex = r.__idxInPipeline;
          break
        }
        r = r.getUpstream()
      } while (r)
    })
  }, t.prototype.updatePayload = function (e, r) {
    r !== "remain" && (e.context.payload = r)
  }, t.prototype._createSeriesStageTask = function (e, r, n, i) {
    var a = this,
      o = r.seriesTaskMap,
      s = r.seriesTaskMap = gt(),
      l = e.seriesType,
      u = e.getTargetSeries;
    e.createOnAllSeries ? n.eachRawSeries(f) : l ? n.eachRawSeriesByType(l, f) : u && u(n, i).each(f);

    function f(c) {
      var h = c.uid,
        v = s.set(h, o && o.get(h) || yo({
          plan: ML,
          reset: DL,
          count: PL
        }));
      v.context = {
        model: c,
        ecModel: n,
        api: i,
        useClearVisual: e.isVisual && !e.isLayout,
        plan: e.plan,
        reset: e.reset,
        scheduler: a
      }, a._pipe(c, v)
    }
  }, t.prototype._createOverallStageTask = function (e, r, n, i) {
    var a = this,
      o = r.overallTask = r.overallTask || yo({
        reset: bL
      });
    o.context = {
      ecModel: n,
      api: i,
      overallReset: e.overallReset,
      scheduler: a
    };
    var s = o.agentStubMap,
      l = o.agentStubMap = gt(),
      u = e.seriesType,
      f = e.getTargetSeries,
      c = !0,
      h = !1,
      v = "";
    Or(!e.createOnAllSeries, v), u ? n.eachRawSeriesByType(u, d) : f ? f(n, i).each(d) : (c = !1, P(n.getSeries(), d));

    function d(y) {
      var g = y.uid,
        p = l.set(g, s && s.get(g) || (h = !0, yo({
          reset: xL,
          onDirty: TL
        })));
      p.context = {
        model: y,
        overallProgress: c
      }, p.agent = o, p.__block = c, a._pipe(y, p)
    }
    h && o.dirty()
  }, t.prototype._pipe = function (e, r) {
    var n = e.uid,
      i = this._pipelineMap.get(n);
    !i.head && (i.head = r), i.tail && i.tail.pipe(r), i.tail = r, r.__idxInPipeline = i.count++, r.__pipeline = i
  }, t.wrapStageHandler = function (e, r) {
    return dt(e) && (e = {
      overallReset: e,
      seriesType: IL(e)
    }), e.uid = cu("stageHandler"), r && (e.visualType = r), e
  }, t
}();

function bL(t) {
  t.overallReset(t.ecModel, t.api, t.payload)
}

function xL(t) {
  return t.overallProgress && CL
}

function CL() {
  this.agent.dirty(), this.getDownstream().dirty()
}

function TL() {
  this.agent && this.agent.dirty()
}

function ML(t) {
  return t.plan ? t.plan(t.model, t.ecModel, t.api, t.payload) : null
}

function DL(t) {
  t.useClearVisual && t.data.clearAllVisual();
  var e = t.resetDefines = fe(t.reset(t.model, t.ecModel, t.api, t.payload));
  return e.length > 1 ? ct(e, function (r, n) {
    return Rw(n)
  }) : AL
}
var AL = Rw(0);

function Rw(t) {
  return function (e, r) {
    var n = r.data,
      i = r.resetDefines[t];
    if (i && i.dataEach)
      for (var a = e.start; a < e.end; a++) i.dataEach(n, a);
    else i && i.progress && i.progress(e, n)
  }
}

function PL(t) {
  return t.data.count()
}

function IL(t) {
  Nl = null;
  try {
    t($o, Ow)
  } catch (e) {}
  return Nl
}
var $o = {},
  Ow = {},
  Nl;
kw($o, lw);
kw(Ow, uw);
$o.eachSeriesByType = $o.eachRawSeriesByType = function (t) {
  Nl = t
};
$o.eachComponent = function (t) {
  t.mainType === "series" && t.subType && (Nl = t.subType)
};

function kw(t, e) {
  for (var r in e.prototype) t[r] = _e
}
var Bw = SL,
  hy = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
  EL = {
    color: hy,
    colorLayer: [
      ["#37A2DA", "#ffd85c", "#fd7b5f"],
      ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"],
      ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], hy
    ]
  },
  se = "#B9B8CE",
  vy = "#100C2A",
  Ls = function () {
    return {
      axisLine: {
        lineStyle: {
          color: se
        }
      },
      splitLine: {
        lineStyle: {
          color: "#484753"
        }
      },
      splitArea: {
        areaStyle: {
          color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]
        }
      },
      minorSplitLine: {
        lineStyle: {
          color: "#20203B"
        }
      }
    }
  },
  dy = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"],
  Nw = {
    darkMode: !0,
    color: dy,
    backgroundColor: vy,
    axisPointer: {
      lineStyle: {
        color: "#817f91"
      },
      crossStyle: {
        color: "#817f91"
      },
      label: {
        color: "#fff"
      }
    },
    legend: {
      textStyle: {
        color: se
      }
    },
    textStyle: {
      color: se
    },
    title: {
      textStyle: {
        color: "#EEF1FA"
      },
      subtextStyle: {
        color: "#B9B8CE"
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: se
      }
    },
    dataZoom: {
      borderColor: "#71708A",
      textStyle: {
        color: se
      },
      brushStyle: {
        color: "rgba(135,163,206,0.3)"
      },
      handleStyle: {
        color: "#353450",
        borderColor: "#C5CBE3"
      },
      moveHandleStyle: {
        color: "#B0B6C3",
        opacity: .3
      },
      fillerColor: "rgba(135,163,206,0.2)",
      emphasis: {
        handleStyle: {
          borderColor: "#91B7F2",
          color: "#4D587D"
        },
        moveHandleStyle: {
          color: "#636D9A",
          opacity: .7
        }
      },
      dataBackground: {
        lineStyle: {
          color: "#71708A",
          width: 1
        },
        areaStyle: {
          color: "#71708A"
        }
      },
      selectedDataBackground: {
        lineStyle: {
          color: "#87A3CE"
        },
        areaStyle: {
          color: "#87A3CE"
        }
      }
    },
    visualMap: {
      textStyle: {
        color: se
      }
    },
    timeline: {
      lineStyle: {
        color: se
      },
      label: {
        color: se
      },
      controlStyle: {
        color: se,
        borderColor: se
      }
    },
    calendar: {
      itemStyle: {
        color: vy
      },
      dayLabel: {
        color: se
      },
      monthLabel: {
        color: se
      },
      yearLabel: {
        color: se
      }
    },
    timeAxis: Ls(),
    logAxis: Ls(),
    valueAxis: Ls(),
    categoryAxis: Ls(),
    line: {
      symbol: "circle"
    },
    graph: {
      color: dy
    },
    gauge: {
      title: {
        color: se
      },
      axisLine: {
        lineStyle: {
          color: [
            [1, "rgba(207,212,219,0.2)"]
          ]
        }
      },
      axisLabel: {
        color: se
      },
      detail: {
        color: "#EEF1FA"
      }
    },
    candlestick: {
      itemStyle: {
        color: "#f64e56",
        color0: "#54ea92",
        borderColor: "#f64e56",
        borderColor0: "#54ea92"
      }
    }
  };
Nw.categoryAxis.splitLine.show = !1;
var LL = Nw,
  RL = function () {
    function t() {}
    return t.prototype.normalizeQuery = function (e) {
      var r = {},
        n = {},
        i = {};
      if (nt(e)) {
        var a = dr(e);
        r.mainType = a.main || null, r.subType = a.sub || null
      } else {
        var o = ["Index", "Name", "Id"],
          s = {
            name: 1,
            dataIndex: 1,
            dataType: 1
          };
        P(e, function (l, u) {
          for (var f = !1, c = 0; c < o.length; c++) {
            var h = o[c],
              v = u.lastIndexOf(h);
            if (v > 0 && v === u.length - h.length) {
              var d = u.slice(0, v);
              d !== "data" && (r.mainType = d, r[h.toLowerCase()] = l, f = !0)
            }
          }
          s.hasOwnProperty(u) && (n[u] = l, f = !0), f || (i[u] = l)
        })
      }
      return {
        cptQuery: r,
        dataQuery: n,
        otherQuery: i
      }
    }, t.prototype.filter = function (e, r) {
      var n = this.eventInfo;
      if (!n) return !0;
      var i = n.targetEl,
        a = n.packedEvent,
        o = n.model,
        s = n.view;
      if (!o || !s) return !0;
      var l = r.cptQuery,
        u = r.dataQuery;
      return f(l, o, "mainType") && f(l, o, "subType") && f(l, o, "index", "componentIndex") && f(l, o, "name") && f(l, o, "id") && f(u, a, "name") && f(u, a, "dataIndex") && f(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(e, r.otherQuery, i, a));

      function f(c, h, v, d) {
        return c[v] == null || h[d || v] === c[v]
      }
    }, t.prototype.afterTrigger = function () {
      this.eventInfo = null
    }, t
  }(),
  rh = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"],
  py = rh.concat(["symbolKeepAspect"]),
  OL = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (t, e) {
      var r = t.getData();
      if (t.legendIcon && r.setVisual("legendIcon", t.legendIcon), !t.hasSymbolVisual) return;
      for (var n = {}, i = {}, a = !1, o = 0; o < rh.length; o++) {
        var s = rh[o],
          l = t.get(s);
        dt(l) ? (a = !0, i[s] = l) : n[s] = l
      }
      if (n.symbol = n.symbol || t.defaultSymbol, r.setVisual(q({
          legendIcon: t.legendIcon || n.symbol,
          symbolKeepAspect: t.get("symbolKeepAspect")
        }, n)), e.isSeriesFiltered(t)) return;
      var u = Vt(i);

      function f(c, h) {
        for (var v = t.getRawValue(h), d = t.getDataParams(h), y = 0; y < u.length; y++) {
          var g = u[y];
          c.setItemVisual(h, g, i[g](v, d))
        }
      }
      return {
        dataEach: a ? f : null
      }
    }
  },
  kL = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (t, e) {
      if (!t.hasSymbolVisual || e.isSeriesFiltered(t)) return;
      var r = t.getData();

      function n(i, a) {
        for (var o = i.getItemModel(a), s = 0; s < py.length; s++) {
          var l = py[s],
            u = o.getShallow(l, !0);
          u != null && i.setItemVisual(a, l, u)
        }
      }
      return {
        dataEach: r.hasItemOption ? n : null
      }
    }
  };

function BL(t, e, r) {
  switch (r) {
    case "color":
      var n = t.getItemVisual(e, "style");
      return n[t.getVisual("drawType")];
    case "opacity":
      return t.getItemVisual(e, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return t.getItemVisual(e, r)
  }
}

function NL(t, e) {
  switch (e) {
    case "color":
      var r = t.getVisual("style");
      return r[t.getVisual("drawType")];
    case "opacity":
      return t.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return t.getVisual(e)
  }
}

function Li(t, e, r, n, i) {
  var a = t + e;
  r.isSilent(a) || n.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function (o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = i.selected, f = 0; f < u.length; f++)
      if (u[f].seriesIndex === s) {
        var c = o.getData(),
          h = ui(c, i.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: et(h) ? c.getName(h[0]) : c.getName(h),
          selected: nt(l) ? l : q({}, l)
        })
      }
  })
}

function FL(t, e, r) {
  t.on("selectchanged", function (n) {
    var i = r.getModel();
    n.isFromClick ? (Li("map", "selectchanged", e, i, n), Li("pie", "selectchanged", e, i, n)) : n.fromAction === "select" ? (Li("map", "selected", e, i, n), Li("pie", "selected", e, i, n)) : n.fromAction === "unselect" && (Li("map", "unselected", e, i, n), Li("pie", "unselected", e, i, n))
  })
}

function Ja(t, e, r) {
  for (var n; t && !(e(t) && (n = t, r));) t = t.__hostTarget || t.parent;
  return n
}
var zL = Math.round(Math.random() * 9),
  HL = typeof Object.defineProperty == "function",
  VL = function () {
    function t() {
      this._id = "__ec_inner_" + zL++
    }
    return t.prototype.get = function (e) {
      return this._guard(e)[this._id]
    }, t.prototype.set = function (e, r) {
      var n = this._guard(e);
      return HL ? Object.defineProperty(n, this._id, {
        value: r,
        enumerable: !1,
        configurable: !0
      }) : n[this._id] = r, this
    }, t.prototype.delete = function (e) {
      return this.has(e) ? (delete this._guard(e)[this._id], !0) : !1
    }, t.prototype.has = function (e) {
      return !!this._guard(e)[this._id]
    }, t.prototype._guard = function (e) {
      if (e !== Object(e)) throw TypeError("Value of WeakMap is not a non-null object.");
      return e
    }, t
  }(),
  $L = VL,
  GL = kt.extend({
    type: "triangle",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var r = e.cx,
        n = e.cy,
        i = e.width / 2,
        a = e.height / 2;
      t.moveTo(r, n - a), t.lineTo(r + i, n + a), t.lineTo(r - i, n + a), t.closePath()
    }
  }),
  WL = kt.extend({
    type: "diamond",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var r = e.cx,
        n = e.cy,
        i = e.width / 2,
        a = e.height / 2;
      t.moveTo(r, n - a), t.lineTo(r + i, n), t.lineTo(r, n + a), t.lineTo(r - i, n), t.closePath()
    }
  }),
  UL = kt.extend({
    type: "pin",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var r = e.x,
        n = e.y,
        i = e.width / 5 * 3,
        a = Math.max(i, e.height),
        o = i / 2,
        s = o * o / (a - o),
        l = n - a + o + s,
        u = Math.asin(s / o),
        f = Math.cos(u) * o,
        c = Math.sin(u),
        h = Math.cos(u),
        v = o * .6,
        d = o * .7;
      t.moveTo(r - f, l + s), t.arc(r, l, o, Math.PI - u, Math.PI * 2 + u), t.bezierCurveTo(r + f - c * v, l + s + h * v, r, n - d, r, n), t.bezierCurveTo(r, n - d, r - f + c * v, l + s + h * v, r - f, l + s), t.closePath()
    }
  }),
  YL = kt.extend({
    type: "arrow",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function (t, e) {
      var r = e.height,
        n = e.width,
        i = e.x,
        a = e.y,
        o = n / 3 * 2;
      t.moveTo(i, a), t.lineTo(i + o, a + r), t.lineTo(i, a + r / 4 * 3), t.lineTo(i - o, a + r), t.lineTo(i, a), t.closePath()
    }
  }),
  XL = {
    line: ci,
    rect: Qt,
    roundRect: Qt,
    square: Qt,
    circle: xv,
    diamond: WL,
    pin: UL,
    arrow: YL,
    triangle: GL
  },
  qL = {
    line: function (t, e, r, n, i) {
      i.x1 = t, i.y1 = e + n / 2, i.x2 = t + r, i.y2 = e + n / 2
    },
    rect: function (t, e, r, n, i) {
      i.x = t, i.y = e, i.width = r, i.height = n
    },
    roundRect: function (t, e, r, n, i) {
      i.x = t, i.y = e, i.width = r, i.height = n, i.r = Math.min(r, n) / 4
    },
    square: function (t, e, r, n, i) {
      var a = Math.min(r, n);
      i.x = t, i.y = e, i.width = a, i.height = a
    },
    circle: function (t, e, r, n, i) {
      i.cx = t + r / 2, i.cy = e + n / 2, i.r = Math.min(r, n) / 2
    },
    diamond: function (t, e, r, n, i) {
      i.cx = t + r / 2, i.cy = e + n / 2, i.width = r, i.height = n
    },
    pin: function (t, e, r, n, i) {
      i.x = t + r / 2, i.y = e + n / 2, i.width = r, i.height = n
    },
    arrow: function (t, e, r, n, i) {
      i.x = t + r / 2, i.y = e + n / 2, i.width = r, i.height = n
    },
    triangle: function (t, e, r, n, i) {
      i.cx = t + r / 2, i.cy = e + n / 2, i.width = r, i.height = n
    }
  },
  nh = {};
P(XL, function (t, e) {
  nh[e] = new t
});
var KL = kt.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function (t, e, r) {
    var n = I_(t, e, r),
      i = this.shape;
    return i && i.symbolType === "pin" && e.position === "inside" && (n.y = r.y + r.height * .4), n
  },
  buildPath: function (t, e, r) {
    var n = e.symbolType;
    if (n !== "none") {
      var i = nh[n];
      i || (n = "rect", i = nh[n]), qL[n](e.x, e.y, e.width, e.height, i.shape), i.buildPath(t, i.shape, r)
    }
  }
});

function ZL(t, e) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = t, r.fill = e || "#fff", r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = t : r.fill = t, this.markRedraw()
  }
}

function ua(t, e, r, n, i, a, o) {
  var s = t.indexOf("empty") === 0;
  s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
  var l;
  return t.indexOf("image://") === 0 ? l = O1(t.slice(8), new Ot(e, r, n, i), o ? "center" : "cover") : t.indexOf("path://") === 0 ? l = Dv(t.slice(7), {}, new Ot(e, r, n, i), o ? "center" : "cover") : l = new KL({
    shape: {
      symbolType: t,
      x: e,
      y: r,
      width: n,
      height: i
    }
  }), l.__isEmptyBrush = s, l.setColor = ZL, a && l.setColor(a), l
}

function jL(t) {
  return et(t) || (t = [+t, +t]), [t[0] || 0, t[1] || 0]
}

function Fw(t, e) {
  if (t != null) return et(t) || (t = [t, t]), [ue(t[0], e[0]) || 0, ue(Mt(t[1], t[0]), e[1]) || 0]
}

function QL(t, e, r) {
  var n = e.x == null ? 0 : e.x,
    i = e.x2 == null ? 1 : e.x2,
    a = e.y == null ? 0 : e.y,
    o = e.y2 == null ? 0 : e.y2;
  e.global || (n = n * r.width + r.x, i = i * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), n = isNaN(n) ? 0 : n, i = isNaN(i) ? 1 : i, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o;
  var s = t.createLinearGradient(n, a, i, o);
  return s
}

function JL(t, e, r) {
  var n = r.width,
    i = r.height,
    a = Math.min(n, i),
    o = e.x == null ? .5 : e.x,
    s = e.y == null ? .5 : e.y,
    l = e.r == null ? .5 : e.r;
  e.global || (o = o * n + r.x, s = s * i + r.y, l = l * a);
  var u = t.createRadialGradient(o, s, 0, o, s, l);
  return u
}

function ih(t, e, r) {
  for (var n = e.type === "radial" ? JL(t, e, r) : QL(t, e, r), i = e.colorStops, a = 0; a < i.length; a++) n.addColorStop(i[a].offset, i[a].color);
  return n
}

function tR(t, e) {
  if (t === e || !t && !e) return !1;
  if (!t || !e || t.length !== e.length) return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r] !== e[r]) return !0;
  return !1
}

function Rs(t) {
  return parseInt(t, 10)
}

function Os(t, e, r) {
  var n = ["width", "height"][e],
    i = ["clientWidth", "clientHeight"][e],
    a = ["paddingLeft", "paddingTop"][e],
    o = ["paddingRight", "paddingBottom"][e];
  if (r[n] != null && r[n] !== "auto") return parseFloat(r[n]);
  var s = document.defaultView.getComputedStyle(t);
  return (t[i] || Rs(s[n]) || Rs(t.style[n])) - (Rs(s[a]) || 0) - (Rs(s[o]) || 0) | 0
}

function eR(t, e) {
  return !t || t === "solid" || !(e > 0) ? null : t === "dashed" ? [4 * e, 2 * e] : t === "dotted" ? [e] : $t(t) ? [t] : et(t) ? t : null
}

function zw(t) {
  var e = t.style,
    r = e.lineDash && e.lineWidth > 0 && eR(e.lineDash, e.lineWidth),
    n = e.lineDashOffset;
  if (r) {
    var i = e.strokeNoScale && t.getLineScale ? t.getLineScale() : 1;
    i && i !== 1 && (r = ct(r, function (a) {
      return a / i
    }), n /= i)
  }
  return [r, n]
}
var rR = new fi(!0);

function Fl(t) {
  var e = t.stroke;
  return !(e == null || e === "none" || !(t.lineWidth > 0))
}

function gy(t) {
  return typeof t == "string" && t !== "none"
}

function zl(t) {
  var e = t.fill;
  return e != null && e !== "none"
}

function yy(t, e) {
  if (e.fillOpacity != null && e.fillOpacity !== 1) {
    var r = t.globalAlpha;
    t.globalAlpha = e.fillOpacity * e.opacity, t.fill(), t.globalAlpha = r
  } else t.fill()
}

function my(t, e) {
  if (e.strokeOpacity != null && e.strokeOpacity !== 1) {
    var r = t.globalAlpha;
    t.globalAlpha = e.strokeOpacity * e.opacity, t.stroke(), t.globalAlpha = r
  } else t.stroke()
}

function ah(t, e, r) {
  var n = U_(e.image, e.__image, r);
  if (au(n)) {
    var i = t.createPattern(n, e.repeat || "repeat");
    if (typeof DOMMatrix == "function" && i && i.setTransform) {
      var a = new DOMMatrix;
      a.translateSelf(e.x || 0, e.y || 0), a.rotateSelf(0, 0, (e.rotation || 0) * nM), a.scaleSelf(e.scaleX || 1, e.scaleY || 1), i.setTransform(a)
    }
    return i
  }
}

function nR(t, e, r, n) {
  var i, a = Fl(r),
    o = zl(r),
    s = r.strokePercent,
    l = s < 1,
    u = !e.path;
  (!e.silent || l) && u && e.createPathProxy();
  var f = e.path || rR,
    c = e.__dirty;
  if (!n) {
    var h = r.fill,
      v = r.stroke,
      d = o && !!h.colorStops,
      y = a && !!v.colorStops,
      g = o && !!h.image,
      p = a && !!v.image,
      m = void 0,
      _ = void 0,
      w = void 0,
      b = void 0,
      S = void 0;
    (d || y) && (S = e.getBoundingRect()), d && (m = c ? ih(t, h, S) : e.__canvasFillGradient, e.__canvasFillGradient = m), y && (_ = c ? ih(t, v, S) : e.__canvasStrokeGradient, e.__canvasStrokeGradient = _), g && (w = c || !e.__canvasFillPattern ? ah(t, h, e) : e.__canvasFillPattern, e.__canvasFillPattern = w), p && (b = c || !e.__canvasStrokePattern ? ah(t, v, e) : e.__canvasStrokePattern, e.__canvasStrokePattern = w), d ? t.fillStyle = m : g && (w ? t.fillStyle = w : o = !1), y ? t.strokeStyle = _ : p && (b ? t.strokeStyle = b : a = !1)
  }
  var x = e.getGlobalScale();
  f.setScale(x[0], x[1], e.segmentIgnoreThreshold);
  var T, M;
  t.setLineDash && r.lineDash && (i = zw(e), T = i[0], M = i[1]);
  var D = !0;
  (u || c & zi) && (f.setDPR(t.dpr), l ? f.setContext(null) : (f.setContext(t), D = !1), f.reset(), e.buildPath(f, e.shape, n), f.toStatic(), e.pathUpdated()), D && f.rebuildPath(t, l ? s : 1), T && (t.setLineDash(T), t.lineDashOffset = M), n || (r.strokeFirst ? (a && my(t, r), o && yy(t, r)) : (o && yy(t, r), a && my(t, r))), T && t.setLineDash([])
}

function iR(t, e, r) {
  var n = e.__image = U_(r.image, e.__image, e, e.onload);
  if (!(!n || !au(n))) {
    var i = r.x || 0,
      a = r.y || 0,
      o = e.getWidth(),
      s = e.getHeight(),
      l = n.width / n.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = n.width, s = n.height), r.sWidth && r.sHeight) {
      var u = r.sx || 0,
        f = r.sy || 0;
      t.drawImage(n, u, f, r.sWidth, r.sHeight, i, a, o, s)
    } else if (r.sx && r.sy) {
      var u = r.sx,
        f = r.sy,
        c = o - u,
        h = s - f;
      t.drawImage(n, u, f, c, h, i, a, o, s)
    } else t.drawImage(n, i, a, o, s)
  }
}

function aR(t, e, r) {
  var n, i = r.text;
  if (i != null && (i += ""), i) {
    t.font = r.font || si, t.textAlign = r.textAlign, t.textBaseline = r.textBaseline;
    var a = void 0,
      o = void 0;
    t.setLineDash && r.lineDash && (n = zw(e), a = n[0], o = n[1]), a && (t.setLineDash(a), t.lineDashOffset = o), r.strokeFirst ? (Fl(r) && t.strokeText(i, r.x, r.y), zl(r) && t.fillText(i, r.x, r.y)) : (zl(r) && t.fillText(i, r.x, r.y), Fl(r) && t.strokeText(i, r.x, r.y)), a && t.setLineDash([])
  }
}
var _y = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"],
  wy = [
    ["lineCap", "butt"],
    ["lineJoin", "miter"],
    ["miterLimit", 10]
  ];

function Hw(t, e, r, n, i) {
  var a = !1;
  if (!n && (r = r || {}, e === r)) return !1;
  if (n || e.opacity !== r.opacity) {
    me(t, i), a = !0;
    var o = Math.max(Math.min(e.opacity, 1), 0);
    t.globalAlpha = isNaN(o) ? ri.opacity : o
  }(n || e.blend !== r.blend) && (a || (me(t, i), a = !0), t.globalCompositeOperation = e.blend || ri.blend);
  for (var s = 0; s < _y.length; s++) {
    var l = _y[s];
    (n || e[l] !== r[l]) && (a || (me(t, i), a = !0), t[l] = t.dpr * (e[l] || 0))
  }
  return (n || e.shadowColor !== r.shadowColor) && (a || (me(t, i), a = !0), t.shadowColor = e.shadowColor || ri.shadowColor), a
}

function Sy(t, e, r, n, i) {
  var a = Go(e, i.inHover),
    o = n ? null : r && Go(r, i.inHover) || {};
  if (a === o) return !1;
  var s = Hw(t, a, o, n, i);
  if ((n || a.fill !== o.fill) && (s || (me(t, i), s = !0), gy(a.fill) && (t.fillStyle = a.fill)), (n || a.stroke !== o.stroke) && (s || (me(t, i), s = !0), gy(a.stroke) && (t.strokeStyle = a.stroke)), (n || a.opacity !== o.opacity) && (s || (me(t, i), s = !0), t.globalAlpha = a.opacity == null ? 1 : a.opacity), e.hasStroke()) {
    var l = a.lineWidth,
      u = l / (a.strokeNoScale && e.getLineScale ? e.getLineScale() : 1);
    t.lineWidth !== u && (s || (me(t, i), s = !0), t.lineWidth = u)
  }
  for (var f = 0; f < wy.length; f++) {
    var c = wy[f],
      h = c[0];
    (n || a[h] !== o[h]) && (s || (me(t, i), s = !0), t[h] = a[h] || c[1])
  }
  return s
}

function oR(t, e, r, n, i) {
  return Hw(t, Go(e, i.inHover), r && Go(r, i.inHover), n, i)
}

function Vw(t, e) {
  var r = e.transform,
    n = t.dpr || 1;
  r ? t.setTransform(n * r[0], n * r[1], n * r[2], n * r[3], n * r[4], n * r[5]) : t.setTransform(n, 0, 0, n, 0, 0)
}

function sR(t, e, r) {
  for (var n = !1, i = 0; i < t.length; i++) {
    var a = t[i];
    n = n || a.isZeroArea(), Vw(e, a), e.beginPath(), a.buildPath(e, a.shape), e.clip()
  }
  r.allClipped = n
}

function lR(t, e) {
  return t && e ? t[0] !== e[0] || t[1] !== e[1] || t[2] !== e[2] || t[3] !== e[3] || t[4] !== e[4] || t[5] !== e[5] : !(!t && !e)
}
var by = 1,
  xy = 2,
  Cy = 3,
  Ty = 4;

function uR(t) {
  var e = zl(t),
    r = Fl(t);
  return !(t.lineDash || !(+e ^ +r) || e && typeof t.fill != "string" || r && typeof t.stroke != "string" || t.strokePercent < 1 || t.strokeOpacity < 1 || t.fillOpacity < 1)
}

function me(t, e) {
  e.batchFill && t.fill(), e.batchStroke && t.stroke(), e.batchFill = "", e.batchStroke = ""
}

function Go(t, e) {
  return e && t.__hoverStyle || t.style
}

function $w(t, e) {
  ti(t, e, {
    inHover: !1,
    viewWidth: 0,
    viewHeight: 0
  }, !0)
}

function ti(t, e, r, n) {
  var i = e.transform;
  if (!e.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    e.__dirty &= ~Te, e.__isRendered = !1;
    return
  }
  var a = e.__clipPaths,
    o = r.prevElClipPaths,
    s = !1,
    l = !1;
  if ((!o || tR(a, o)) && (o && o.length && (me(t, r), t.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), a && a.length && (me(t, r), t.save(), sR(a, t, r), s = !0), r.prevElClipPaths = a), r.allClipped) {
    e.__isRendered = !1;
    return
  }
  e.beforeBrush && e.beforeBrush(), e.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var f = e instanceof kt && e.autoBatch && uR(e.style);
  s || lR(i, u.transform) ? (me(t, r), Vw(t, e)) : f || me(t, r);
  var c = Go(e, r.inHover);
  e instanceof kt ? (r.lastDrawType !== by && (l = !0, r.lastDrawType = by), Sy(t, e, u, l, r), (!f || !r.batchFill && !r.batchStroke) && t.beginPath(), nR(t, e, c, f), f && (r.batchFill = c.fill || "", r.batchStroke = c.stroke || "")) : e instanceof Hc ? (r.lastDrawType !== Cy && (l = !0, r.lastDrawType = Cy), Sy(t, e, u, l, r), aR(t, e, c)) : e instanceof pi ? (r.lastDrawType !== xy && (l = !0, r.lastDrawType = xy), oR(t, e, u, l, r), iR(t, e, c)) : e.getTemporalDisplayables && (r.lastDrawType !== Ty && (l = !0, r.lastDrawType = Ty), fR(t, e, r)), f && n && me(t, r), e.innerAfterBrush(), e.afterBrush && e.afterBrush(), r.prevEl = e, e.__dirty = 0, e.__isRendered = !0
}

function fR(t, e, r) {
  var n = e.getDisplayables(),
    i = e.getTemporalDisplayables();
  t.save();
  var a = {
      prevElClipPaths: null,
      prevEl: null,
      allClipped: !1,
      viewWidth: r.viewWidth,
      viewHeight: r.viewHeight,
      inHover: r.inHover
    },
    o, s;
  for (o = e.getCursor(), s = n.length; o < s; o++) {
    var l = n[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), ti(t, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l
  }
  for (var u = 0, f = i.length; u < f; u++) {
    var l = i[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), ti(t, l, a, u === f - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l
  }
  e.clearTemporalDisplayables(), e.notClear = !0, t.restore()
}
var Af = new $L,
  My = new Ko(100),
  Dy = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];

function Ay(t, e) {
  if (t === "none") return null;
  var r = e.getDevicePixelRatio(),
    n = e.getZr(),
    i = n.painter.type === "svg";
  t.dirty && Af.delete(t);
  var a = Af.get(t);
  if (a) return a;
  var o = Dt(t, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  var s = {
    repeat: "repeat"
  };
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = i ? 1 : 1 / r, Af.set(t, s), t.dirty = !1, s;

  function l(u) {
    for (var f = [r], c = !0, h = 0; h < Dy.length; ++h) {
      var v = o[Dy[h]];
      if (v != null && !et(v) && !nt(v) && !$t(v) && typeof v != "boolean") {
        c = !1;
        break
      }
      f.push(v)
    }
    var d;
    if (c) {
      d = f.join(",") + (i ? "-svg" : "");
      var y = My.get(d);
      y && (i ? u.svgElement = y : u.image = y)
    }
    var g = Ww(o.dashArrayX),
      p = cR(o.dashArrayY),
      m = Gw(o.symbol),
      _ = hR(g),
      w = Uw(p),
      b = !i && di.createCanvas(),
      S = i && {
        tag: "g",
        attrs: {},
        key: "dcl",
        children: []
      },
      x = M(),
      T;
    b && (b.width = x.width * r, b.height = x.height * r, T = b.getContext("2d")), D(), c && My.put(d, b || S), u.image = b, u.svgElement = S, u.svgWidth = x.width, u.svgHeight = x.height;

    function M() {
      for (var I = 1, A = 0, L = _.length; A < L; ++A) I = Bp(I, _[A]);
      for (var O = 1, A = 0, L = m.length; A < L; ++A) O = Bp(O, m[A].length);
      I *= O;
      var H = w * _.length * m.length;
      return {
        width: Math.max(1, Math.min(I, o.maxTileWidth)),
        height: Math.max(1, Math.min(H, o.maxTileHeight))
      }
    }

    function D() {
      T && (T.clearRect(0, 0, b.width, b.height), o.backgroundColor && (T.fillStyle = o.backgroundColor, T.fillRect(0, 0, b.width, b.height)));
      for (var I = 0, A = 0; A < p.length; ++A) I += p[A];
      if (I <= 0) return;
      for (var L = -w, O = 0, H = 0, B = 0; L < x.height;) {
        if (O % 2 === 0) {
          for (var Q = H / 2 % m.length, G = 0, Z = 0, lt = 0; G < x.width * 2;) {
            for (var _t = 0, A = 0; A < g[B].length; ++A) _t += g[B][A];
            if (_t <= 0) break;
            if (Z % 2 === 0) {
              var yt = (1 - o.symbolSize) * .5,
                pt = G + g[B][Z] * yt,
                At = L + p[O] * yt,
                k = g[B][Z] * o.symbolSize,
                W = p[O] * o.symbolSize,
                V = lt / 2 % m[Q].length;
              tt(pt, At, k, W, m[Q][V])
            }
            G += g[B][Z], ++lt, ++Z, Z === g[B].length && (Z = 0)
          }++B, B === g.length && (B = 0)
        }
        L += p[O], ++H, ++O, O === p.length && (O = 0)
      }

      function tt(vt, ut, Y, K, C) {
        var E = i ? 1 : r,
          R = ua(C, vt * E, ut * E, Y * E, K * E, o.color, o.symbolKeepAspect);
        if (i) {
          var N = n.painter.renderOneToVNode(R);
          N && S.children.push(N)
        } else $w(T, R)
      }
    }
  }
}

function Gw(t) {
  if (!t || t.length === 0) return [
    ["rect"]
  ];
  if (nt(t)) return [
    [t]
  ];
  for (var e = !0, r = 0; r < t.length; ++r)
    if (!nt(t[r])) {
      e = !1;
      break
    } if (e) return Gw([t]);
  for (var n = [], r = 0; r < t.length; ++r) nt(t[r]) ? n.push([t[r]]) : n.push(t[r]);
  return n
}

function Ww(t) {
  if (!t || t.length === 0) return [
    [0, 0]
  ];
  if ($t(t)) {
    var e = Math.ceil(t);
    return [
      [e, e]
    ]
  }
  for (var r = !0, n = 0; n < t.length; ++n)
    if (!$t(t[n])) {
      r = !1;
      break
    } if (r) return Ww([t]);
  for (var i = [], n = 0; n < t.length; ++n)
    if ($t(t[n])) {
      var e = Math.ceil(t[n]);
      i.push([e, e])
    } else {
      var e = ct(t[n], function (s) {
        return Math.ceil(s)
      });
      e.length % 2 === 1 ? i.push(e.concat(e)) : i.push(e)
    } return i
}

function cR(t) {
  if (!t || typeof t == "object" && t.length === 0) return [0, 0];
  if ($t(t)) {
    var e = Math.ceil(t);
    return [e, e]
  }
  var r = ct(t, function (n) {
    return Math.ceil(n)
  });
  return t.length % 2 ? r.concat(r) : r
}

function hR(t) {
  return ct(t, function (e) {
    return Uw(e)
  })
}

function Uw(t) {
  for (var e = 0, r = 0; r < t.length; ++r) e += t[r];
  return t.length % 2 === 1 ? e * 2 : e
}

function vR(t, e) {
  t.eachRawSeries(function (r) {
    if (!t.isSeriesFiltered(r)) {
      var n = r.getData();
      n.hasItemVisual() && n.each(function (o) {
        var s = n.getItemVisual(o, "decal");
        if (s) {
          var l = n.ensureUniqueItemVisual(o, "style");
          l.decal = Ay(s, e)
        }
      });
      var i = n.getVisual("decal");
      if (i) {
        var a = n.getVisual("style");
        a.decal = Ay(i, e)
      }
    }
  })
}
var dR = new _r,
  Qe = dR,
  Yw = {};

function pR(t, e) {
  Yw[t] = e
}

function gR(t) {
  return Yw[t]
}
var yR = typeof window != "undefined",
  mR = 1,
  _R = 800,
  wR = 900,
  SR = 1e3,
  bR = 2e3,
  xR = 5e3,
  Xw = 1e3,
  CR = 1100,
  qv = 2e3,
  qw = 3e3,
  TR = 4e3,
  bu = 4500,
  MR = 4600,
  DR = 5e3,
  AR = 6e3,
  Kw = 7e3,
  PR = {
    PROCESSOR: {
      FILTER: SR,
      SERIES_FILTER: _R,
      STATISTIC: xR
    },
    VISUAL: {
      LAYOUT: Xw,
      PROGRESSIVE_LAYOUT: CR,
      GLOBAL: qv,
      CHART: qw,
      POST_CHART_LAYOUT: MR,
      COMPONENT: TR,
      BRUSH: DR,
      CHART_ITEM: bu,
      ARIA: AR,
      DECAL: Kw
    }
  },
  ee = "__flagInMainProcess",
  de = "__pendingUpdate",
  Pf = "__needsUpdateStatus",
  Py = /^[a-zA-Z0-9_]+$/,
  If = "__connectUpdateStatus",
  Iy = 0,
  IR = 1,
  ER = 2;

function Zw(t) {
  return function () {
    for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return
    }
    return Qw(this, t, e)
  }
}

function jw(t) {
  return function () {
    for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
    return Qw(this, t, e)
  }
}

function Qw(t, e, r) {
  return r[0] = r[0] && r[0].toLowerCase(), _r.prototype[e].apply(t, r)
}
var Jw = function (t) {
    J(e, t);

    function e() {
      return t !== null && t.apply(this, arguments) || this
    }
    return e
  }(_r),
  tS = Jw.prototype;
tS.on = jw("on");
tS.off = jw("off");
var Ri, Ef, ks, Kr, Lf, Rf, Of, Na, Fa, Ey, Ly, kf, Ry, Bs, Oy, eS, Le, ky, rS = function (t) {
    J(e, t);

    function e(r, n, i) {
      var a = t.call(this, new RL) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], i = i || {}, nt(n) && (n = nS[n]), a._dom = r;
      var o = "canvas",
        s = !1,
        l = a._zr = Rp(r, {
          renderer: i.renderer || o,
          devicePixelRatio: i.devicePixelRatio,
          width: i.width,
          height: i.height,
          ssr: i.ssr,
          useDirtyRect: i.useDirtyRect == null ? s : i.useDirtyRect
        });
      a._ssr = i.ssr, a._throttledZrFlush = Pw(Ht(l.flush, l), 17), n = St(n), n && cw(n, !0), a._theme = n, a._locale = OI(i.locale || $1), a._coordSysMgr = new Vv;
      var u = a._api = Oy(a);

      function f(c, h) {
        return c.__prio - h.__prio
      }
      return js(Vl, f), js(oh, f), a._scheduler = new Bw(a, u, oh, Vl), a._messageCenter = new Jw, a._initEvents(), a.resize = Ht(a.resize, a), l.animation.on("frame", a._onframe, a), Ey(l, a), Ly(l, a), wc(a), a
    }
    return e.prototype._onframe = function () {
      if (!this._disposed) {
        ky(this);
        var r = this._scheduler;
        if (this[de]) {
          var n = this[de].silent;
          this[ee] = !0;
          try {
            Ri(this), Kr.update.call(this, null, this[de].updateParams)
          } catch (l) {
            throw this[ee] = !1, this[de] = null, l
          }
          this._zr.flush(), this[ee] = !1, this[de] = null, Na.call(this, n), Fa.call(this, n)
        } else if (r.unfinished) {
          var i = mR,
            a = this._model,
            o = this._api;
          r.unfinished = !1;
          do {
            var s = +new Date;
            r.performSeriesTasks(a), r.performDataProcessorTasks(a), Rf(this, a), r.performVisualTasks(a), Bs(this, this._model, o, "remain", {}), i -= +new Date - s
          } while (i > 0 && r.unfinished);
          r.unfinished || this._zr.flush()
        }
      }
    }, e.prototype.getDom = function () {
      return this._dom
    }, e.prototype.getId = function () {
      return this.id
    }, e.prototype.getZr = function () {
      return this._zr
    }, e.prototype.isSSR = function () {
      return this._ssr
    }, e.prototype.setOption = function (r, n, i) {
      if (!this[ee]) {
        if (this._disposed) {
          this.id;
          return
        }
        var a, o, s;
        if (st(n) && (i = n.lazyUpdate, a = n.silent, o = n.replaceMerge, s = n.transition, n = n.notMerge), this[ee] = !0, !this._model || n) {
          var l = new gE(this._api),
            u = this._theme,
            f = this._model = new lw;
          f.scheduler = this._scheduler, f.ssr = this._ssr, f.init(null, null, null, u, this._locale, l)
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, sh);
        var c = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (i) this[de] = {
          silent: a,
          updateParams: c
        }, this[ee] = !1, this.getZr().wakeUp();
        else {
          try {
            Ri(this), Kr.update.call(this, null, c)
          } catch (h) {
            throw this[de] = null, this[ee] = !1, h
          }
          this._ssr || this._zr.flush(), this[de] = null, this[ee] = !1, Na.call(this, a), Fa.call(this, a)
        }
      }
    }, e.prototype.setTheme = function () {}, e.prototype.getModel = function () {
      return this._model
    }, e.prototype.getOption = function () {
      return this._model && this._model.getOption()
    }, e.prototype.getWidth = function () {
      return this._zr.getWidth()
    }, e.prototype.getHeight = function () {
      return this._zr.getHeight()
    }, e.prototype.getDevicePixelRatio = function () {
      return this._zr.painter.dpr || yR && window.devicePixelRatio || 1
    }, e.prototype.getRenderedCanvas = function (r) {
      return this.renderToCanvas(r)
    }, e.prototype.renderToCanvas = function (r) {
      r = r || {};
      var n = this._zr.painter;
      return n.getRenderedCanvas({
        backgroundColor: r.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: r.pixelRatio || this.getDevicePixelRatio()
      })
    }, e.prototype.renderToSVGString = function (r) {
      r = r || {};
      var n = this._zr.painter;
      return n.renderToString({
        useViewBox: r.useViewBox
      })
    }, e.prototype.getSvgDataURL = function () {
      if (!!mt.svgSupported) {
        var r = this._zr,
          n = r.storage.getDisplayList();
        return P(n, function (i) {
          i.stopAnimation(null, !0)
        }), r.painter.toDataURL()
      }
    }, e.prototype.getDataURL = function (r) {
      if (this._disposed) {
        this.id;
        return
      }
      r = r || {};
      var n = r.excludeComponents,
        i = this._model,
        a = [],
        o = this;
      P(n, function (l) {
        i.eachComponent({
          mainType: l
        }, function (u) {
          var f = o._componentsMap[u.__viewId];
          f.group.ignore || (a.push(f), f.group.ignore = !0)
        })
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(r).toDataURL("image/" + (r && r.type || "png"));
      return P(a, function (l) {
        l.group.ignore = !1
      }), s
    }, e.prototype.getConnectedDataURL = function (r) {
      if (this._disposed) {
        this.id;
        return
      }
      var n = r.type === "svg",
        i = this.group,
        a = Math.min,
        o = Math.max,
        s = 1 / 0;
      if (By[i]) {
        var l = s,
          u = s,
          f = -s,
          c = -s,
          h = [],
          v = r && r.pixelRatio || this.getDevicePixelRatio();
        P(_o, function (_, w) {
          if (_.group === i) {
            var b = n ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(St(r)),
              S = _.getDom().getBoundingClientRect();
            l = a(S.left, l), u = a(S.top, u), f = o(S.right, f), c = o(S.bottom, c), h.push({
              dom: b,
              left: S.left,
              top: S.top
            })
          }
        }), l *= v, u *= v, f *= v, c *= v;
        var d = f - l,
          y = c - u,
          g = di.createCanvas(),
          p = Rp(g, {
            renderer: n ? "svg" : "canvas"
          });
        if (p.resize({
            width: d,
            height: y
          }), n) {
          var m = "";
          return P(h, function (_) {
            var w = _.left - l,
              b = _.top - u;
            m += '<g transform="translate(' + w + "," + b + ')">' + _.dom + "</g>"
          }), p.painter.getSvgRoot().innerHTML = m, r.connectedBackgroundColor && p.painter.setBackgroundColor(r.connectedBackgroundColor), p.refreshImmediately(), p.painter.toDataURL()
        } else return r.connectedBackgroundColor && p.add(new Qt({
          shape: {
            x: 0,
            y: 0,
            width: d,
            height: y
          },
          style: {
            fill: r.connectedBackgroundColor
          }
        })), P(h, function (_) {
          var w = new pi({
            style: {
              x: _.left * v - l,
              y: _.top * v - u,
              image: _.dom
            }
          });
          p.add(w)
        }), p.refreshImmediately(), g.toDataURL("image/" + (r && r.type || "png"))
      } else return this.getDataURL(r)
    }, e.prototype.convertToPixel = function (r, n) {
      return Lf(this, "convertToPixel", r, n)
    }, e.prototype.convertFromPixel = function (r, n) {
      return Lf(this, "convertFromPixel", r, n)
    }, e.prototype.containPixel = function (r, n) {
      if (this._disposed) {
        this.id;
        return
      }
      var i = this._model,
        a, o = tf(i, r);
      return P(o, function (s, l) {
        l.indexOf("Models") >= 0 && P(s, function (u) {
          var f = u.coordinateSystem;
          if (f && f.containPoint) a = a || !!f.containPoint(n);
          else if (l === "seriesModels") {
            var c = this._chartsMap[u.__viewId];
            c && c.containPoint && (a = a || c.containPoint(n, u))
          }
        }, this)
      }, this), !!a
    }, e.prototype.getVisual = function (r, n) {
      var i = this._model,
        a = tf(i, r, {
          defaultMainType: "series"
        }),
        o = a.seriesModel,
        s = o.getData(),
        l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? BL(s, l, n) : NL(s, n)
    }, e.prototype.getViewOfComponentModel = function (r) {
      return this._componentsMap[r.__viewId]
    }, e.prototype.getViewOfSeriesModel = function (r) {
      return this._chartsMap[r.__viewId]
    }, e.prototype._initEvents = function () {
      var r = this;
      P(LR, function (n) {
        var i = function (a) {
          var o = r.getModel(),
            s = a.target,
            l, u = n === "globalout";
          if (u ? l = {} : s && Ja(s, function (d) {
              var y = Bt(d);
              if (y && y.dataIndex != null) {
                var g = y.dataModel || o.getSeriesByIndex(y.seriesIndex);
                return l = g && g.getDataParams(y.dataIndex, y.dataType) || {}, !0
              } else if (y.eventData) return l = q({}, y.eventData), !0
            }, !0), l) {
            var f = l.componentType,
              c = l.componentIndex;
            (f === "markLine" || f === "markPoint" || f === "markArea") && (f = "series", c = l.seriesIndex);
            var h = f && c != null && o.getComponent(f, c),
              v = h && r[h.mainType === "series" ? "_chartsMap" : "_componentsMap"][h.__viewId];
            l.event = a, l.type = n, r._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: h,
              view: v
            }, r.trigger(n, l)
          }
        };
        i.zrEventfulCallAtLast = !0, r._zr.on(n, i, r)
      }), P(mo, function (n, i) {
        r._messageCenter.on(i, function (a) {
          this.trigger(i, a)
        }, r)
      }), P(["selectchanged"], function (n) {
        r._messageCenter.on(n, function (i) {
          this.trigger(n, i)
        }, r)
      }), FL(this._messageCenter, this, this._api)
    }, e.prototype.isDisposed = function () {
      return this._disposed
    }, e.prototype.clear = function () {
      if (this._disposed) {
        this.id;
        return
      }
      this.setOption({
        series: []
      }, !0)
    }, e.prototype.dispose = function () {
      if (this._disposed) {
        this.id;
        return
      }
      this._disposed = !0;
      var r = this.getDom();
      r && $_(this.getDom(), Zv, "");
      var n = this,
        i = n._api,
        a = n._model;
      P(n._componentsViews, function (o) {
        o.dispose(a, i)
      }), P(n._chartsViews, function (o) {
        o.dispose(a, i)
      }), n._zr.dispose(), n._dom = n._model = n._chartsMap = n._componentsMap = n._chartsViews = n._componentsViews = n._scheduler = n._api = n._zr = n._throttledZrFlush = n._theme = n._coordSysMgr = n._messageCenter = null, delete _o[n.id]
    }, e.prototype.resize = function (r) {
      if (!this[ee]) {
        if (this._disposed) {
          this.id;
          return
        }
        this._zr.resize(r);
        var n = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!n) {
          var i = n.resetOption("media"),
            a = r && r.silent;
          this[de] && (a == null && (a = this[de].silent), i = !0, this[de] = null), this[ee] = !0;
          try {
            i && Ri(this), Kr.update.call(this, {
              type: "resize",
              animation: q({
                duration: 0
              }, r && r.animation)
            })
          } catch (o) {
            throw this[ee] = !1, o
          }
          this[ee] = !1, Na.call(this, a), Fa.call(this, a)
        }
      }
    }, e.prototype.showLoading = function (r, n) {
      if (this._disposed) {
        this.id;
        return
      }
      if (st(r) && (n = r, r = ""), r = r || "default", this.hideLoading(), !!lh[r]) {
        var i = lh[r](this._api, n),
          a = this._zr;
        this._loadingFX = i, a.add(i)
      }
    }, e.prototype.hideLoading = function () {
      if (this._disposed) {
        this.id;
        return
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null
    }, e.prototype.makeActionFromEvent = function (r) {
      var n = q({}, r);
      return n.type = mo[r.type], n
    }, e.prototype.dispatchAction = function (r, n) {
      if (this._disposed) {
        this.id;
        return
      }
      if (st(n) || (n = {
          silent: !!n
        }), !!Hl[r.type] && !!this._model) {
        if (this[ee]) {
          this._pendingActions.push(r);
          return
        }
        var i = n.silent;
        Of.call(this, r, i);
        var a = n.flush;
        a ? this._zr.flush() : a !== !1 && mt.browser.weChat && this._throttledZrFlush(), Na.call(this, i), Fa.call(this, i)
      }
    }, e.prototype.updateLabelLayout = function () {
      Qe.trigger("series:layoutlabels", this._model, this._api, {
        updatedSeries: []
      })
    }, e.prototype.appendData = function (r) {
      if (this._disposed) {
        this.id;
        return
      }
      var n = r.seriesIndex,
        i = this.getModel(),
        a = i.getSeriesByIndex(n);
      a.appendData(r), this._scheduler.unfinished = !0, this.getZr().wakeUp()
    }, e.internalField = function () {
      Ri = function (c) {
        var h = c._scheduler;
        h.restorePipelines(c._model), h.prepareStageTasks(), Ef(c, !0), Ef(c, !1), h.plan()
      }, Ef = function (c, h) {
        for (var v = c._model, d = c._scheduler, y = h ? c._componentsViews : c._chartsViews, g = h ? c._componentsMap : c._chartsMap, p = c._zr, m = c._api, _ = 0; _ < y.length; _++) y[_].__alive = !1;
        h ? v.eachComponent(function (S, x) {
          S !== "series" && w(x)
        }) : v.eachSeries(w);

        function w(S) {
          var x = S.__requireNewView;
          S.__requireNewView = !1;
          var T = "_ec_" + S.id + "_" + S.type,
            M = !x && g[T];
          if (!M) {
            var D = dr(S.type),
              I = h ? Br.getClass(D.main, D.sub) : gn.getClass(D.sub);
            M = new I, M.init(v, m), g[T] = M, y.push(M), p.add(M.group)
          }
          S.__viewId = M.__id = T, M.__alive = !0, M.__model = S, M.group.__ecComponentInfo = {
            mainType: S.mainType,
            index: S.componentIndex
          }, !h && d.prepareView(M, S, v, m)
        }
        for (var _ = 0; _ < y.length;) {
          var b = y[_];
          b.__alive ? _++ : (!h && b.renderTask.dispose(), p.remove(b.group), b.dispose(v, m), y.splice(_, 1), g[b.__id] === b && delete g[b.__id], b.__id = b.group.__ecComponentInfo = null)
        }
      }, ks = function (c, h, v, d, y) {
        var g = c._model;
        if (g.setUpdatePayload(v), !d) {
          P([].concat(c._componentsViews).concat(c._chartsViews), b);
          return
        }
        var p = {};
        p[d + "Id"] = v[d + "Id"], p[d + "Index"] = v[d + "Index"], p[d + "Name"] = v[d + "Name"];
        var m = {
          mainType: d,
          query: p
        };
        y && (m.subType = y);
        var _ = v.excludeSeriesId,
          w;
        _ != null && (w = gt(), P(fe(_), function (S) {
          var x = pr(S, null);
          x != null && w.set(x, !0)
        })), g && g.eachComponent(m, function (S) {
          var x = w && w.get(S.id) !== null;
          if (!x)
            if (dg(v))
              if (S instanceof Vo) v.type === ni && !v.notBlur && !S.get(["emphasis", "disabled"]) && sP(S, v, c._api);
              else {
                var T = bv(S.mainType, S.componentIndex, v.name, c._api),
                  M = T.focusSelf,
                  D = T.dispatchers;
                v.type === ni && M && !v.notBlur && $c(S.mainType, S.componentIndex, c._api), D && P(D, function (I) {
                  v.type === ni ? Pl(I) : Il(I)
                })
              }
          else Yc(v) && S instanceof Vo && (fP(S, v, c._api), cg(S), Le(c))
        }, c), g && g.eachComponent(m, function (S) {
          var x = w && w.get(S.id) !== null;
          x || b(c[d === "series" ? "_chartsMap" : "_componentsMap"][S.__viewId])
        }, c);

        function b(S) {
          S && S.__alive && S[h] && S[h](S.__model, g, c._api, v)
        }
      }, Kr = {
        prepareAndUpdate: function (c) {
          Ri(this), Kr.update.call(this, c, {
            optionChanged: c.newOption != null
          })
        },
        update: function (c, h) {
          var v = this._model,
            d = this._api,
            y = this._zr,
            g = this._coordSysMgr,
            p = this._scheduler;
          if (!!v) {
            v.setUpdatePayload(c), p.restoreData(v, c), p.performSeriesTasks(v), g.create(v, d), p.performDataProcessorTasks(v, c), Rf(this, v), g.update(v, d), r(v), p.performVisualTasks(v, c), kf(this, v, d, c, h);
            var m = v.get("backgroundColor") || "transparent",
              _ = v.get("darkMode");
            y.setBackgroundColor(m), _ != null && _ !== "auto" && y.setDarkMode(_), Qe.trigger("afterupdate", v, d)
          }
        },
        updateTransform: function (c) {
          var h = this,
            v = this._model,
            d = this._api;
          if (!!v) {
            v.setUpdatePayload(c);
            var y = [];
            v.eachComponent(function (p, m) {
              if (p !== "series") {
                var _ = h.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var w = _.updateTransform(m, v, d, c);
                    w && w.update && y.push(_)
                  } else y.push(_)
              }
            });
            var g = gt();
            v.eachSeries(function (p) {
              var m = h._chartsMap[p.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(p, v, d, c);
                _ && _.update && g.set(p.uid, 1)
              } else g.set(p.uid, 1)
            }), r(v), this._scheduler.performVisualTasks(v, c, {
              setDirty: !0,
              dirtyMap: g
            }), Bs(this, v, d, c, {}, g), Qe.trigger("afterupdate", v, d)
          }
        },
        updateView: function (c) {
          var h = this._model;
          !h || (h.setUpdatePayload(c), gn.markUpdateMethod(c, "updateView"), r(h), this._scheduler.performVisualTasks(h, c, {
            setDirty: !0
          }), kf(this, h, this._api, c, {}), Qe.trigger("afterupdate", h, this._api))
        },
        updateVisual: function (c) {
          var h = this,
            v = this._model;
          !v || (v.setUpdatePayload(c), v.eachSeries(function (d) {
            d.getData().clearAllVisual()
          }), gn.markUpdateMethod(c, "updateVisual"), r(v), this._scheduler.performVisualTasks(v, c, {
            visualType: "visual",
            setDirty: !0
          }), v.eachComponent(function (d, y) {
            if (d !== "series") {
              var g = h.getViewOfComponentModel(y);
              g && g.__alive && g.updateVisual(y, v, h._api, c)
            }
          }), v.eachSeries(function (d) {
            var y = h._chartsMap[d.__viewId];
            y.updateVisual(d, v, h._api, c)
          }), Qe.trigger("afterupdate", v, this._api))
        },
        updateLayout: function (c) {
          Kr.update.call(this, c)
        }
      }, Lf = function (c, h, v, d) {
        if (c._disposed) {
          c.id;
          return
        }
        for (var y = c._model, g = c._coordSysMgr.getCoordinateSystems(), p, m = tf(y, v), _ = 0; _ < g.length; _++) {
          var w = g[_];
          if (w[h] && (p = w[h](y, m, d)) != null) return p
        }
      }, Rf = function (c, h) {
        var v = c._chartsMap,
          d = c._scheduler;
        h.eachSeries(function (y) {
          d.updateStreamModes(y, v[y.__viewId])
        })
      }, Of = function (c, h) {
        var v = this,
          d = this.getModel(),
          y = c.type,
          g = c.escapeConnect,
          p = Hl[y],
          m = p.actionInfo,
          _ = (m.update || "update").split(":"),
          w = _.pop(),
          b = _[0] != null && dr(_[0]);
        this[ee] = !0;
        var S = [c],
          x = !1;
        c.batch && (x = !0, S = ct(c.batch, function (O) {
          return O = Dt(q({}, O), c), O.batch = null, O
        }));
        var T = [],
          M, D = Yc(c),
          I = dg(c);
        if (I && c1(this._api), P(S, function (O) {
            if (M = p.action(O, v._model, v._api), M = M || q({}, O), M.type = m.event || M.type, T.push(M), I) {
              var H = yv(c),
                B = H.queryOptionMap,
                Q = H.mainTypeSpecified,
                G = Q ? B.keys()[0] : "series";
              ks(v, w, O, G), Le(v)
            } else D ? (ks(v, w, O, "series"), Le(v)) : b && ks(v, w, O, b.main, b.sub)
          }), w !== "none" && !I && !D && !b) try {
          this[de] ? (Ri(this), Kr.update.call(this, c), this[de] = null) : Kr[w].call(this, c)
        } catch (O) {
          throw this[ee] = !1, O
        }
        if (x ? M = {
            type: m.event || y,
            escapeConnect: g,
            batch: T
          } : M = T[0], this[ee] = !1, !h) {
          var A = this._messageCenter;
          if (A.trigger(M.type, M), D) {
            var L = {
              type: "selectchanged",
              escapeConnect: g,
              selected: cP(d),
              isFromClick: c.isFromClick || !1,
              fromAction: c.type,
              fromActionPayload: c
            };
            A.trigger(L.type, L)
          }
        }
      }, Na = function (c) {
        for (var h = this._pendingActions; h.length;) {
          var v = h.shift();
          Of.call(this, v, c)
        }
      }, Fa = function (c) {
        !c && this.trigger("updated")
      }, Ey = function (c, h) {
        c.on("rendered", function (v) {
          h.trigger("rendered", v), c.animation.isFinished() && !h[de] && !h._scheduler.unfinished && !h._pendingActions.length && h.trigger("finished")
        })
      }, Ly = function (c, h) {
        c.on("mouseover", function (v) {
          var d = v.target,
            y = Ja(d, Uc);
          y && (lP(y, v, h._api), Le(h))
        }).on("mouseout", function (v) {
          var d = v.target,
            y = Ja(d, Uc);
          y && (uP(y, v, h._api), Le(h))
        }).on("click", function (v) {
          var d = v.target,
            y = Ja(d, function (m) {
              return Bt(m).dataIndex != null
            }, !0);
          if (y) {
            var g = y.selected ? "unselect" : "select",
              p = Bt(y);
            h._api.dispatchAction({
              type: g,
              dataType: p.dataType,
              dataIndexInside: p.dataIndex,
              seriesIndex: p.seriesIndex,
              isFromClick: !0
            })
          }
        })
      };

      function r(c) {
        c.clearColorPalette(), c.eachSeries(function (h) {
          h.clearColorPalette()
        })
      }

      function n(c) {
        var h = [],
          v = [],
          d = !1;
        if (c.eachComponent(function (m, _) {
            var w = _.get("zlevel") || 0,
              b = _.get("z") || 0,
              S = _.getZLevelKey();
            d = d || !!S, (m === "series" ? v : h).push({
              zlevel: w,
              z: b,
              idx: _.componentIndex,
              type: m,
              key: S
            })
          }), d) {
          var y = h.concat(v),
            g, p;
          js(y, function (m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel
          }), P(y, function (m) {
            var _ = c.getComponent(m.type, m.idx),
              w = m.zlevel,
              b = m.key;
            g != null && (w = Math.max(g, w)), b ? (w === g && b !== p && w++, p = b) : p && (w === g && w++, p = ""), g = w, _.setZLevel(w)
          })
        }
      }
      kf = function (c, h, v, d, y) {
        n(h), Ry(c, h, v, d, y), P(c._chartsViews, function (g) {
          g.__alive = !1
        }), Bs(c, h, v, d, y), P(c._chartsViews, function (g) {
          g.__alive || g.remove(h, v)
        })
      }, Ry = function (c, h, v, d, y, g) {
        P(g || c._componentsViews, function (p) {
          var m = p.__model;
          u(m, p), p.render(m, h, v, d), s(m, p), f(m, p)
        })
      }, Bs = function (c, h, v, d, y, g) {
        var p = c._scheduler;
        y = q(y || {}, {
          updatedSeries: h.getSeries()
        }), Qe.trigger("series:beforeupdate", h, v, y);
        var m = !1;
        h.eachSeries(function (_) {
          var w = c._chartsMap[_.__viewId];
          w.__alive = !0;
          var b = w.renderTask;
          p.updatePayload(b, d), u(_, w), g && g.get(_.uid) && b.dirty(), b.perform(p.getPerformArgs(b)) && (m = !0), w.group.silent = !!_.get("silent"), o(_, w), cg(_)
        }), p.unfinished = m || p.unfinished, Qe.trigger("series:layoutlabels", h, v, y), Qe.trigger("series:transition", h, v, y), h.eachSeries(function (_) {
          var w = c._chartsMap[_.__viewId];
          s(_, w), f(_, w)
        }), a(c, h), Qe.trigger("series:afterupdate", h, v, y)
      }, Le = function (c) {
        c[Pf] = !0, c.getZr().wakeUp()
      }, ky = function (c) {
        !c[Pf] || (c.getZr().storage.traverse(function (h) {
          vo(h) || i(h)
        }), c[Pf] = !1)
      };

      function i(c) {
        for (var h = [], v = c.currentStates, d = 0; d < v.length; d++) {
          var y = v[d];
          y === "emphasis" || y === "blur" || y === "select" || h.push(y)
        }
        c.selected && c.states.select && h.push("select"), c.hoverState === lu && c.states.emphasis ? h.push("emphasis") : c.hoverState === su && c.states.blur && h.push("blur"), c.useStates(h)
      }

      function a(c, h) {
        var v = c._zr,
          d = v.storage,
          y = 0;
        d.traverse(function (g) {
          g.isGroup || y++
        }), y > h.get("hoverLayerThreshold") && !mt.node && !mt.worker && h.eachSeries(function (g) {
          if (!g.preventUsingHoverLayer) {
            var p = c._chartsMap[g.__viewId];
            p.__alive && p.eachRendered(function (m) {
              m.states.emphasis && (m.states.emphasis.hoverLayer = !0)
            })
          }
        })
      }

      function o(c, h) {
        var v = c.get("blendMode") || null;
        h.eachRendered(function (d) {
          d.isGroup || (d.style.blend = v)
        })
      }

      function s(c, h) {
        if (!c.preventAutoZ) {
          var v = c.get("z") || 0,
            d = c.get("zlevel") || 0;
          h.eachRendered(function (y) {
            return l(y, v, d, -1 / 0), !0
          })
        }
      }

      function l(c, h, v, d) {
        var y = c.getTextContent(),
          g = c.getTextGuideLine(),
          p = c.isGroup;
        if (p)
          for (var m = c.childrenRef(), _ = 0; _ < m.length; _++) d = Math.max(l(m[_], h, v, d), d);
        else c.z = h, c.zlevel = v, d = Math.max(c.z2, d);
        if (y && (y.z = h, y.zlevel = v, isFinite(d) && (y.z2 = d + 2)), g) {
          var w = c.textGuideLineConfig;
          g.z = h, g.zlevel = v, isFinite(d) && (g.z2 = d + (w && w.showAbove ? 1 : -1))
        }
        return d
      }

      function u(c, h) {
        h.eachRendered(function (v) {
          if (!vo(v)) {
            var d = v.getTextContent(),
              y = v.getTextGuideLine();
            v.stateTransition && (v.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), y && y.stateTransition && (y.stateTransition = null), v.hasState() ? (v.prevStates = v.currentStates, v.clearStates()) : v.prevStates && (v.prevStates = null)
          }
        })
      }

      function f(c, h) {
        var v = c.getModel("stateAnimation"),
          d = c.isAnimationEnabled(),
          y = v.get("duration"),
          g = y > 0 ? {
            duration: y,
            delay: v.get("delay"),
            easing: v.get("easing")
          } : null;
        h.eachRendered(function (p) {
          if (p.states && p.states.emphasis) {
            if (vo(p)) return;
            if (p instanceof kt && gP(p), p.__dirty) {
              var m = p.prevStates;
              m && p.useStates(m)
            }
            if (d) {
              p.stateTransition = g;
              var _ = p.getTextContent(),
                w = p.getTextGuideLine();
              _ && (_.stateTransition = g), w && (w.stateTransition = g)
            }
            p.__dirty && i(p)
          }
        })
      }
      Oy = function (c) {
        return new(function (h) {
          J(v, h);

          function v() {
            return h !== null && h.apply(this, arguments) || this
          }
          return v.prototype.getCoordinateSystems = function () {
            return c._coordSysMgr.getCoordinateSystems()
          }, v.prototype.getComponentByElement = function (d) {
            for (; d;) {
              var y = d.__ecComponentInfo;
              if (y != null) return c._model.getComponent(y.mainType, y.index);
              d = d.parent
            }
          }, v.prototype.enterEmphasis = function (d, y) {
            Pl(d, y), Le(c)
          }, v.prototype.leaveEmphasis = function (d, y) {
            Il(d, y), Le(c)
          }, v.prototype.enterBlur = function (d) {
            oP(d), Le(c)
          }, v.prototype.leaveBlur = function (d) {
            s1(d), Le(c)
          }, v.prototype.enterSelect = function (d) {
            l1(d), Le(c)
          }, v.prototype.leaveSelect = function (d) {
            u1(d), Le(c)
          }, v.prototype.getModel = function () {
            return c.getModel()
          }, v.prototype.getViewOfComponentModel = function (d) {
            return c.getViewOfComponentModel(d)
          }, v.prototype.getViewOfSeriesModel = function (d) {
            return c.getViewOfSeriesModel(d)
          }, v
        }(uw))(c)
      }, eS = function (c) {
        function h(v, d) {
          for (var y = 0; y < v.length; y++) {
            var g = v[y];
            g[If] = d
          }
        }
        P(mo, function (v, d) {
          c._messageCenter.on(d, function (y) {
            if (By[c.group] && c[If] !== Iy) {
              if (y && y.escapeConnect) return;
              var g = c.makeActionFromEvent(y),
                p = [];
              P(_o, function (m) {
                m !== c && m.group === c.group && p.push(m)
              }), h(p, Iy), P(p, function (m) {
                m[If] !== IR && m.dispatchAction(g)
              }), h(p, ER)
            }
          })
        })
      }
    }(), e
  }(_r),
  Kv = rS.prototype;
Kv.on = Zw("on");
Kv.off = Zw("off");
Kv.one = function (t, e, r) {
  var n = this;

  function i() {
    for (var a = [], o = 0; o < arguments.length; o++) a[o] = arguments[o];
    e && e.apply && e.apply(this, a), n.off(t, i)
  }
  this.on.call(this, t, i, r)
};
var LR = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var Hl = {},
  mo = {},
  oh = [],
  sh = [],
  Vl = [],
  nS = {},
  lh = {},
  _o = {},
  By = {},
  RR = +new Date - 0,
  Zv = "_echarts_instance_";

function wN(t, e, r) {
  var n = !(r && r.ssr);
  if (n) {
    var i = OR(t);
    if (i) return i
  }
  var a = new rS(t, e, r);
  return a.id = "ec_" + RR++, _o[a.id] = a, n && $_(t, Zv, a.id), eS(a), Qe.trigger("afterinit", a), a
}

function OR(t) {
  return _o[YD(t, Zv)]
}

function iS(t, e) {
  nS[t] = e
}

function aS(t) {
  Pt(sh, t) < 0 && sh.push(t)
}

function oS(t, e) {
  Qv(oh, t, e, bR)
}

function kR(t) {
  jv("afterinit", t)
}

function BR(t) {
  jv("afterupdate", t)
}

function jv(t, e) {
  Qe.on(t, e)
}

function wa(t, e, r) {
  dt(e) && (r = e, e = "");
  var n = st(t) ? t.type : [t, t = {
    event: e
  }][0];
  t.event = (t.event || n).toLowerCase(), e = t.event, !mo[e] && (Or(Py.test(n) && Py.test(e)), Hl[n] || (Hl[n] = {
    action: r,
    actionInfo: t
  }), mo[e] = n)
}

function NR(t, e) {
  Vv.register(t, e)
}

function FR(t, e) {
  Qv(Vl, t, e, Xw, "layout")
}

function yi(t, e) {
  Qv(Vl, t, e, qw, "visual")
}
var Ny = [];

function Qv(t, e, r, n, i) {
  if ((dt(e) || st(e)) && (r = e, e = n), !(Pt(Ny, r) >= 0)) {
    Ny.push(r);
    var a = Bw.wrapStageHandler(r, i);
    a.__prio = e, a.__raw = r, t.push(a)
  }
}

function sS(t, e) {
  lh[t] = e
}

function zR(t, e, r) {
  var n = gR("registerMap");
  n && n(t, e, r)
}
var HR = $E;
yi(qv, yL);
yi(bu, mL);
yi(bu, _L);
yi(qv, OL);
yi(bu, kL);
yi(Kw, vR);
aS(cw);
oS(wR, CE);
sS("default", wL);
wa({
  type: ni,
  event: ni,
  update: ni
}, _e);
wa({
  type: il,
  event: il,
  update: il
}, _e);
wa({
  type: fo,
  event: fo,
  update: fo
}, _e);
wa({
  type: al,
  event: al,
  update: al
}, _e);
wa({
  type: co,
  event: co,
  update: co
}, _e);
iS("light", EL);
iS("dark", LL);

function za(t) {
  return t == null ? 0 : t.length || 1
}

function Fy(t) {
  return t
}
var VR = function () {
    function t(e, r, n, i, a, o) {
      this._old = e, this._new = r, this._oldKeyGetter = n || Fy, this._newKeyGetter = i || Fy, this.context = a, this._diffModeMultiple = o === "multiple"
    }
    return t.prototype.add = function (e) {
      return this._add = e, this
    }, t.prototype.update = function (e) {
      return this._update = e, this
    }, t.prototype.updateManyToOne = function (e) {
      return this._updateManyToOne = e, this
    }, t.prototype.updateOneToMany = function (e) {
      return this._updateOneToMany = e, this
    }, t.prototype.updateManyToMany = function (e) {
      return this._updateManyToMany = e, this
    }, t.prototype.remove = function (e) {
      return this._remove = e, this
    }, t.prototype.execute = function () {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]()
    }, t.prototype._executeOneToOne = function () {
      var e = this._old,
        r = this._new,
        n = {},
        i = new Array(e.length),
        a = new Array(r.length);
      this._initIndexMap(e, null, i, "_oldKeyGetter"), this._initIndexMap(r, n, a, "_newKeyGetter");
      for (var o = 0; o < e.length; o++) {
        var s = i[o],
          l = n[s],
          u = za(l);
        if (u > 1) {
          var f = l.shift();
          l.length === 1 && (n[s] = l[0]), this._update && this._update(f, o)
        } else u === 1 ? (n[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o)
      }
      this._performRestAdd(a, n)
    }, t.prototype._executeMultiple = function () {
      var e = this._old,
        r = this._new,
        n = {},
        i = {},
        a = [],
        o = [];
      this._initIndexMap(e, n, a, "_oldKeyGetter"), this._initIndexMap(r, i, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s],
          u = n[l],
          f = i[l],
          c = za(u),
          h = za(f);
        if (c > 1 && h === 1) this._updateManyToOne && this._updateManyToOne(f, u), i[l] = null;
        else if (c === 1 && h > 1) this._updateOneToMany && this._updateOneToMany(f, u), i[l] = null;
        else if (c === 1 && h === 1) this._update && this._update(f, u), i[l] = null;
        else if (c > 1 && h > 1) this._updateManyToMany && this._updateManyToMany(f, u), i[l] = null;
        else if (c > 1)
          for (var v = 0; v < c; v++) this._remove && this._remove(u[v]);
        else this._remove && this._remove(u)
      }
      this._performRestAdd(o, i)
    }, t.prototype._performRestAdd = function (e, r) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n],
          a = r[i],
          o = za(a);
        if (o > 1)
          for (var s = 0; s < o; s++) this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        r[i] = null
      }
    }, t.prototype._initIndexMap = function (e, r, n, i) {
      for (var a = this._diffModeMultiple, o = 0; o < e.length; o++) {
        var s = "_ec_" + this[i](e[o], o);
        if (a || (n[o] = s), !!r) {
          var l = r[s],
            u = za(l);
          u === 0 ? (r[s] = o, a && n.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o)
        }
      }
    }, t
  }(),
  $R = VR,
  GR = function () {
    function t(e, r) {
      this._encode = e, this._schema = r
    }
    return t.prototype.get = function () {
      return {
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      }
    }, t.prototype._getFullDimensionNames = function () {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames
    }, t
  }();

function WR(t, e) {
  var r = {},
    n = r.encode = {},
    i = gt(),
    a = [],
    o = [],
    s = {};
  P(t.dimensions, function (h) {
    var v = t.getDimensionInfo(h),
      d = v.coordDim;
    if (d) {
      var y = v.coordDimIndex;
      Bf(n, d)[y] = h, v.isExtraCoord || (i.set(d, 1), YR(v.type) && (a[0] = h), Bf(s, d)[y] = t.getDimensionIndex(v.name)), v.defaultTooltip && o.push(h)
    }
    rw.each(function (g, p) {
      var m = Bf(n, p),
        _ = v.otherDims[p];
      _ != null && _ !== !1 && (m[_] = v.name)
    })
  });
  var l = [],
    u = {};
  i.each(function (h, v) {
    var d = n[v];
    u[v] = d[0], l = l.concat(d)
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = ct(l, function (h) {
    return t.getDimensionInfo(h).storeDimIndex
  }), r.encodeFirstDimNotExtra = u;
  var f = n.label;
  f && f.length && (a = f.slice());
  var c = n.tooltip;
  return c && c.length ? o = c.slice() : o.length || (o = a.slice()), n.defaultedLabel = a, n.defaultedTooltip = o, r.userOutput = new GR(s, e), r
}

function Bf(t, e) {
  return t.hasOwnProperty(e) || (t[e] = []), t[e]
}

function UR(t) {
  return t === "category" ? "ordinal" : t === "time" ? "time" : "float"
}

function YR(t) {
  return !(t === "ordinal" || t === "time")
}
var XR = function () {
    function t(e) {
      this.otherDims = {}, e != null && q(this, e)
    }
    return t
  }(),
  ul = XR,
  qR = Kt(),
  KR = {
    float: "f",
    int: "i",
    ordinal: "o",
    number: "n",
    time: "t"
  },
  lS = function () {
    function t(e) {
      this.dimensions = e.dimensions, this._dimOmitted = e.dimensionOmitted, this.source = e.source, this._fullDimCount = e.fullDimensionCount, this._updateDimOmitted(e.dimensionOmitted)
    }
    return t.prototype.isDimensionOmitted = function () {
      return this._dimOmitted
    }, t.prototype._updateDimOmitted = function (e) {
      this._dimOmitted = e, e && (this._dimNameMap || (this._dimNameMap = cS(this.source)))
    }, t.prototype.getSourceDimensionIndex = function (e) {
      return Mt(this._dimNameMap.get(e), -1)
    }, t.prototype.getSourceDimension = function (e) {
      var r = this.source.dimensionsDefine;
      if (r) return r[e]
    }, t.prototype.makeStoreSchema = function () {
      for (var e = this._fullDimCount, r = vw(this.source), n = !hS(e), i = "", a = [], o = 0, s = 0; o < e; o++) {
        var l = void 0,
          u = void 0,
          f = void 0,
          c = this.dimensions[s];
        if (c && c.storeDimIndex === o) l = r ? c.name : null, u = c.type, f = c.ordinalMeta, s++;
        else {
          var h = this.getSourceDimension(o);
          h && (l = r ? h.name : null, u = h.type)
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: f
        }), r && l != null && (!c || !c.isCalculationCoord) && (i += n ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), i += "$", i += KR[u] || "f", f && (i += f.uid), i += "$"
      }
      var v = this.source,
        d = [v.seriesLayoutBy, v.startIndex, i].join("$$");
      return {
        dimensions: a,
        hash: d
      }
    }, t.prototype.makeOutputDimensionNames = function () {
      for (var e = [], r = 0, n = 0; r < this._fullDimCount; r++) {
        var i = void 0,
          a = this.dimensions[n];
        if (a && a.storeDimIndex === r) a.isCalculationCoord || (i = a.name), n++;
        else {
          var o = this.getSourceDimension(r);
          o && (i = o.name)
        }
        e.push(i)
      }
      return e
    }, t.prototype.appendCalculationDimension = function (e) {
      this.dimensions.push(e), e.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0)
    }, t
  }();

function uS(t) {
  return t instanceof lS
}

function fS(t) {
  for (var e = gt(), r = 0; r < (t || []).length; r++) {
    var n = t[r],
      i = st(n) ? n.name : n;
    i != null && e.get(i) == null && e.set(i, r)
  }
  return e
}

function cS(t) {
  var e = qR(t);
  return e.dimNameMap || (e.dimNameMap = fS(t.dimensionsDefine))
}

function hS(t) {
  return t > 30
}
var Ha = st,
  Zr = ct,
  ZR = typeof Int32Array == "undefined" ? Array : Int32Array,
  jR = "e\0\0",
  zy = -1,
  QR = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"],
  JR = ["_approximateExtent"],
  Hy, Ns, Va, $a, Nf, Fs, Ff, t2 = function () {
    function t(e, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "lttbDownSample"];
      var n, i = !1;
      uS(e) ? (n = e.dimensions, this._dimOmitted = e.isDimensionOmitted(), this._schema = e) : (i = !0, n = e), n = n || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, f = 0; f < n.length; f++) {
        var c = n[f],
          h = nt(c) ? new ul({
            name: c
          }) : c instanceof ul ? c : new ul(c),
          v = h.name;
        h.type = h.type || "float", h.coordDim || (h.coordDim = v, h.coordDimIndex = 0);
        var d = h.otherDims = h.otherDims || {};
        o.push(v), a[v] = h, u[v] != null && (l = !0), h.createInvertedIndices && (s[v] = []), d.itemName === 0 && (this._nameDimIdx = f), d.itemId === 0 && (this._idDimIdx = f), i && (h.storeDimIndex = f)
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = r, this._invertedIndicesMap = s, this._dimOmitted) {
        var y = this._dimIdxToName = gt();
        P(o, function (g) {
          y.set(a[g].storeDimIndex, g)
        })
      }
    }
    return t.prototype.getDimension = function (e) {
      var r = this._recognizeDimIndex(e);
      if (r == null) return e;
      if (r = e, !this._dimOmitted) return this.dimensions[r];
      var n = this._dimIdxToName.get(r);
      if (n != null) return n;
      var i = this._schema.getSourceDimension(r);
      if (i) return i.name
    }, t.prototype.getDimensionIndex = function (e) {
      var r = this._recognizeDimIndex(e);
      if (r != null) return r;
      if (e == null) return -1;
      var n = this._getDimInfo(e);
      return n ? n.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(e) : -1
    }, t.prototype._recognizeDimIndex = function (e) {
      if ($t(e) || e != null && !isNaN(e) && !this._getDimInfo(e) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(e) < 0)) return +e
    }, t.prototype._getStoreDimIndex = function (e) {
      var r = this.getDimensionIndex(e);
      return r
    }, t.prototype.getDimensionInfo = function (e) {
      return this._getDimInfo(this.getDimension(e))
    }, t.prototype._initGetDimensionInfo = function (e) {
      var r = this._dimInfos;
      this._getDimInfo = e ? function (n) {
        return r.hasOwnProperty(n) ? r[n] : void 0
      } : function (n) {
        return r[n]
      }
    }, t.prototype.getDimensionsOnCoord = function () {
      return this._dimSummary.dataDimsOnCoord.slice()
    }, t.prototype.mapDimension = function (e, r) {
      var n = this._dimSummary;
      if (r == null) return n.encodeFirstDimNotExtra[e];
      var i = n.encode[e];
      return i ? i[r] : null
    }, t.prototype.mapDimensionsAll = function (e) {
      var r = this._dimSummary,
        n = r.encode[e];
      return (n || []).slice()
    }, t.prototype.getStore = function () {
      return this._store
    }, t.prototype.initData = function (e, r, n) {
      var i = this,
        a;
      if (e instanceof jc && (a = e), !a) {
        var o = this.dimensions,
          s = $v(e) || we(e) ? new dw(e, o.length) : e;
        a = new jc;
        var l = Zr(o, function (u) {
          return {
            type: i._dimInfos[u].type,
            property: u
          }
        });
        a.initData(s, l, n)
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = WR(this, this._schema), this.userOutput = this._dimSummary.userOutput
    }, t.prototype.appendData = function (e) {
      var r = this._store.appendData(e);
      this._doInit(r[0], r[1])
    }, t.prototype.appendValues = function (e, r) {
      var n = this._store.appendValues(e, r.length),
        i = n.start,
        a = n.end,
        o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = i; s < a; s++) {
          var l = s - i;
          this._nameList[s] = r[l], o && Ff(this, s)
        }
    }, t.prototype._updateOrdinalMeta = function () {
      for (var e = this._store, r = this.dimensions, n = 0; n < r.length; n++) {
        var i = this._dimInfos[r[n]];
        i.ordinalMeta && e.collectOrdinalMeta(i.storeDimIndex, i.ordinalMeta)
      }
    }, t.prototype._shouldMakeIdFromName = function () {
      var e = this._store.getProvider();
      return this._idDimIdx == null && e.getSource().sourceFormat !== pn && !e.fillStorage
    }, t.prototype._doInit = function (e, r) {
      if (!(e >= r)) {
        var n = this._store,
          i = n.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList,
          o = this._idList,
          s = i.getSource().sourceFormat,
          l = s === Xe;
        if (l && !i.pure)
          for (var u = [], f = e; f < r; f++) {
            var c = i.getItem(f, u);
            if (!this.hasItemOption && kD(c) && (this.hasItemOption = !0), c) {
              var h = c.name;
              a[f] == null && h != null && (a[f] = pr(h, null));
              var v = c.id;
              o[f] == null && v != null && (o[f] = pr(v, null))
            }
          }
        if (this._shouldMakeIdFromName())
          for (var f = e; f < r; f++) Ff(this, f);
        Hy(this)
      }
    }, t.prototype.getApproximateExtent = function (e) {
      return this._approximateExtent[e] || this._store.getDataExtent(this._getStoreDimIndex(e))
    }, t.prototype.setApproximateExtent = function (e, r) {
      r = this.getDimension(r), this._approximateExtent[r] = e.slice()
    }, t.prototype.getCalculationInfo = function (e) {
      return this._calculationInfo[e]
    }, t.prototype.setCalculationInfo = function (e, r) {
      Ha(e) ? q(this._calculationInfo, e) : this._calculationInfo[e] = r
    }, t.prototype.getName = function (e) {
      var r = this.getRawIndex(e),
        n = this._nameList[r];
      return n == null && this._nameDimIdx != null && (n = Va(this, this._nameDimIdx, r)), n == null && (n = ""), n
    }, t.prototype._getCategory = function (e, r) {
      var n = this._store.get(e, r),
        i = this._store.getOrdinalMeta(e);
      return i ? i.categories[n] : n
    }, t.prototype.getId = function (e) {
      return Ns(this, this.getRawIndex(e))
    }, t.prototype.count = function () {
      return this._store.count()
    }, t.prototype.get = function (e, r) {
      var n = this._store,
        i = this._dimInfos[e];
      if (i) return n.get(i.storeDimIndex, r)
    }, t.prototype.getByRawIndex = function (e, r) {
      var n = this._store,
        i = this._dimInfos[e];
      if (i) return n.getByRawIndex(i.storeDimIndex, r)
    }, t.prototype.getIndices = function () {
      return this._store.getIndices()
    }, t.prototype.getDataExtent = function (e) {
      return this._store.getDataExtent(this._getStoreDimIndex(e))
    }, t.prototype.getSum = function (e) {
      return this._store.getSum(this._getStoreDimIndex(e))
    }, t.prototype.getMedian = function (e) {
      return this._store.getMedian(this._getStoreDimIndex(e))
    }, t.prototype.getValues = function (e, r) {
      var n = this,
        i = this._store;
      return et(e) ? i.getValues(Zr(e, function (a) {
        return n._getStoreDimIndex(a)
      }), r) : i.getValues(e)
    }, t.prototype.hasValue = function (e) {
      for (var r = this._dimSummary.dataDimIndicesOnCoord, n = 0, i = r.length; n < i; n++)
        if (isNaN(this._store.get(r[n], e))) return !1;
      return !0
    }, t.prototype.indexOfName = function (e) {
      for (var r = 0, n = this._store.count(); r < n; r++)
        if (this.getName(r) === e) return r;
      return -1
    }, t.prototype.getRawIndex = function (e) {
      return this._store.getRawIndex(e)
    }, t.prototype.indexOfRawIndex = function (e) {
      return this._store.indexOfRawIndex(e)
    }, t.prototype.rawIndexOf = function (e, r) {
      var n = e && this._invertedIndicesMap[e],
        i = n[r];
      return i == null || isNaN(i) ? zy : i
    }, t.prototype.indicesOfNearest = function (e, r, n) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(e), r, n)
    }, t.prototype.each = function (e, r, n) {
      dt(e) && (n = r, r = e, e = []);
      var i = n || this,
        a = Zr($a(e), this._getStoreDimIndex, this);
      this._store.each(a, i ? Ht(r, i) : r)
    }, t.prototype.filterSelf = function (e, r, n) {
      dt(e) && (n = r, r = e, e = []);
      var i = n || this,
        a = Zr($a(e), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, i ? Ht(r, i) : r), this
    }, t.prototype.selectRange = function (e) {
      var r = this,
        n = {},
        i = Vt(e);
      return P(i, function (a) {
        var o = r._getStoreDimIndex(a);
        n[o] = e[a]
      }), this._store = this._store.selectRange(n), this
    }, t.prototype.mapArray = function (e, r, n) {
      dt(e) && (n = r, r = e, e = []), n = n || this;
      var i = [];
      return this.each(e, function () {
        i.push(r && r.apply(this, arguments))
      }, n), i
    }, t.prototype.map = function (e, r, n, i) {
      var a = n || i || this,
        o = Zr($a(e), this._getStoreDimIndex, this),
        s = Fs(this);
      return s._store = this._store.map(o, a ? Ht(r, a) : r), s
    }, t.prototype.modify = function (e, r, n, i) {
      var a = n || i || this,
        o = Zr($a(e), this._getStoreDimIndex, this);
      this._store.modify(o, a ? Ht(r, a) : r)
    }, t.prototype.downSample = function (e, r, n, i) {
      var a = Fs(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(e), r, n, i), a
    }, t.prototype.lttbDownSample = function (e, r) {
      var n = Fs(this);
      return n._store = this._store.lttbDownSample(this._getStoreDimIndex(e), r), n
    }, t.prototype.getRawDataItem = function (e) {
      return this._store.getRawDataItem(e)
    }, t.prototype.getItemModel = function (e) {
      var r = this.hostModel,
        n = this.getRawDataItem(e);
      return new ae(n, r, r && r.ecModel)
    }, t.prototype.diff = function (e) {
      var r = this;
      return new $R(e ? e.getStore().getIndices() : [], this.getStore().getIndices(), function (n) {
        return Ns(e, n)
      }, function (n) {
        return Ns(r, n)
      })
    }, t.prototype.getVisual = function (e) {
      var r = this._visual;
      return r && r[e]
    }, t.prototype.setVisual = function (e, r) {
      this._visual = this._visual || {}, Ha(e) ? q(this._visual, e) : this._visual[e] = r
    }, t.prototype.getItemVisual = function (e, r) {
      var n = this._itemVisuals[e],
        i = n && n[r];
      return i == null ? this.getVisual(r) : i
    }, t.prototype.hasItemVisual = function () {
      return this._itemVisuals.length > 0
    }, t.prototype.ensureUniqueItemVisual = function (e, r) {
      var n = this._itemVisuals,
        i = n[e];
      i || (i = n[e] = {});
      var a = i[r];
      return a == null && (a = this.getVisual(r), et(a) ? a = a.slice() : Ha(a) && (a = q({}, a)), i[r] = a), a
    }, t.prototype.setItemVisual = function (e, r, n) {
      var i = this._itemVisuals[e] || {};
      this._itemVisuals[e] = i, Ha(r) ? q(i, r) : i[r] = n
    }, t.prototype.clearAllVisual = function () {
      this._visual = {}, this._itemVisuals = []
    }, t.prototype.setLayout = function (e, r) {
      Ha(e) ? q(this._layout, e) : this._layout[e] = r
    }, t.prototype.getLayout = function (e) {
      return this._layout[e]
    }, t.prototype.getItemLayout = function (e) {
      return this._itemLayouts[e]
    }, t.prototype.setItemLayout = function (e, r, n) {
      this._itemLayouts[e] = n ? q(this._itemLayouts[e] || {}, r) : r
    }, t.prototype.clearItemLayouts = function () {
      this._itemLayouts.length = 0
    }, t.prototype.setItemGraphicEl = function (e, r) {
      var n = this.hostModel && this.hostModel.seriesIndex;
      ZA(n, this.dataType, e, r), this._graphicEls[e] = r
    }, t.prototype.getItemGraphicEl = function (e) {
      return this._graphicEls[e]
    }, t.prototype.eachItemGraphicEl = function (e, r) {
      P(this._graphicEls, function (n, i) {
        n && e && e.call(r, n, i)
      })
    }, t.prototype.cloneShallow = function (e) {
      return e || (e = new t(this._schema ? this._schema : Zr(this.dimensions, this._getDimInfo, this), this.hostModel)), Nf(e, this), e._store = this._store, e
    }, t.prototype.wrapMethod = function (e, r) {
      var n = this[e];
      !dt(n) || (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(e), this[e] = function () {
        var i = n.apply(this, arguments);
        return r.apply(this, [i].concat(av(arguments)))
      })
    }, t.internalField = function () {
      Hy = function (e) {
        var r = e._invertedIndicesMap;
        P(r, function (n, i) {
          var a = e._dimInfos[i],
            o = a.ordinalMeta,
            s = e._store;
          if (o) {
            n = r[i] = new ZR(o.categories.length);
            for (var l = 0; l < n.length; l++) n[l] = zy;
            for (var l = 0; l < s.count(); l++) n[s.get(a.storeDimIndex, l)] = l
          }
        })
      }, Va = function (e, r, n) {
        return pr(e._getCategory(r, n), null)
      }, Ns = function (e, r) {
        var n = e._idList[r];
        return n == null && e._idDimIdx != null && (n = Va(e, e._idDimIdx, r)), n == null && (n = jR + r), n
      }, $a = function (e) {
        return et(e) || (e = e != null ? [e] : []), e
      }, Fs = function (e) {
        var r = new t(e._schema ? e._schema : Zr(e.dimensions, e._getDimInfo, e), e.hostModel);
        return Nf(r, e), r
      }, Nf = function (e, r) {
        P(QR.concat(r.__wrappedMethods || []), function (n) {
          r.hasOwnProperty(n) && (e[n] = r[n])
        }), e.__wrappedMethods = r.__wrappedMethods, P(JR, function (n) {
          e[n] = St(r[n])
        }), e._calculationInfo = q({}, r._calculationInfo)
      }, Ff = function (e, r) {
        var n = e._nameList,
          i = e._idList,
          a = e._nameDimIdx,
          o = e._idDimIdx,
          s = n[r],
          l = i[r];
        if (s == null && a != null && (n[r] = s = Va(e, a, r)), l == null && o != null && (i[r] = l = Va(e, o, r)), l == null && s != null) {
          var u = e._nameRepeatCount,
            f = u[s] = (u[s] || 0) + 1;
          l = s, f > 1 && (l += "__ec__" + f), i[r] = l
        }
      }
    }(), t
  }(),
  e2 = t2;

function r2(t, e) {
  $v(t) || (t = Gv(t)), e = e || {};
  var r = e.coordDimensions || [],
    n = e.dimensionsDefine || t.dimensionsDefine || [],
    i = gt(),
    a = [],
    o = i2(t, r, n, e.dimensionsCount),
    s = e.canOmitUnusedDimensions && hS(o),
    l = n === t.dimensionsDefine,
    u = l ? cS(t) : fS(n),
    f = e.encodeDefine;
  !f && e.encodeDefaulter && (f = e.encodeDefaulter(t, o));
  for (var c = gt(f), h = new _w(o), v = 0; v < h.length; v++) h[v] = -1;

  function d(M) {
    var D = h[M];
    if (D < 0) {
      var I = n[M],
        A = st(I) ? I : {
          name: I
        },
        L = new ul,
        O = A.name;
      O != null && u.get(O) != null && (L.name = L.displayName = O), A.type != null && (L.type = A.type), A.displayName != null && (L.displayName = A.displayName);
      var H = a.length;
      return h[M] = H, L.storeDimIndex = M, a.push(L), L
    }
    return a[D]
  }
  if (!s)
    for (var v = 0; v < o; v++) d(v);
  c.each(function (M, D) {
    var I = fe(M).slice();
    if (I.length === 1 && !nt(I[0]) && I[0] < 0) {
      c.set(D, !1);
      return
    }
    var A = c.set(D, []);
    P(I, function (L, O) {
      var H = nt(L) ? u.get(L) : L;
      H != null && H < o && (A[O] = H, g(d(H), D, O))
    })
  });
  var y = 0;
  P(r, function (M) {
    var D, I, A, L;
    if (nt(M)) D = M, L = {};
    else {
      L = M, D = L.name;
      var O = L.ordinalMeta;
      L.ordinalMeta = null, L = q({}, L), L.ordinalMeta = O, I = L.dimsDef, A = L.otherDims, L.name = L.coordDim = L.coordDimIndex = L.dimsDef = L.otherDims = null
    }
    var H = c.get(D);
    if (H !== !1) {
      if (H = fe(H), !H.length)
        for (var B = 0; B < (I && I.length || 1); B++) {
          for (; y < o && d(y).coordDim != null;) y++;
          y < o && H.push(y++)
        }
      P(H, function (Q, G) {
        var Z = d(Q);
        if (l && L.type != null && (Z.type = L.type), g(Dt(Z, L), D, G), Z.name == null && I) {
          var lt = I[G];
          !st(lt) && (lt = {
            name: lt
          }), Z.name = Z.displayName = lt.name, Z.defaultTooltip = lt.defaultTooltip
        }
        A && Dt(Z.otherDims, A)
      })
    }
  });

  function g(M, D, I) {
    rw.get(D) != null ? M.otherDims[D] = I : (M.coordDim = D, M.coordDimIndex = I, i.set(D, !0))
  }
  var p = e.generateCoord,
    m = e.generateCoordCount,
    _ = m != null;
  m = p ? m || 1 : 0;
  var w = p || "value";

  function b(M) {
    M.name == null && (M.name = M.coordDim)
  }
  if (s) P(a, function (M) {
    b(M)
  }), a.sort(function (M, D) {
    return M.storeDimIndex - D.storeDimIndex
  });
  else
    for (var S = 0; S < o; S++) {
      var x = d(S),
        T = x.coordDim;
      T == null && (x.coordDim = a2(w, i, _), x.coordDimIndex = 0, (!p || m <= 0) && (x.isExtraCoord = !0), m--), b(x), x.type == null && (ow(t, S) === xe.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal")
    }
  return n2(a), new lS({
    source: t,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  })
}

function n2(t) {
  for (var e = gt(), r = 0; r < t.length; r++) {
    var n = t[r],
      i = n.name,
      a = e.get(i) || 0;
    a > 0 && (n.name = i + (a - 1)), a++, e.set(i, a)
  }
}

function i2(t, e, r, n) {
  var i = Math.max(t.dimensionsDetectedCount || 1, e.length, r.length, n || 0);
  return P(e, function (a) {
    var o;
    st(a) && (o = a.dimsDef) && (i = Math.max(i, o.length))
  }), i
}

function a2(t, e, r) {
  var n = e.data;
  if (r || n.hasOwnProperty(t)) {
    for (var i = 0; n.hasOwnProperty(t + i);) i++;
    t += i
  }
  return e.set(t, !0), t
}
var o2 = function () {
  function t(e) {
    this.coordSysDims = [], this.axisMap = gt(), this.categoryAxisMap = gt(), this.coordSysName = e
  }
  return t
}();

function s2(t) {
  var e = t.get("coordinateSystem"),
    r = new o2(e),
    n = l2[e];
  if (n) return n(t, r, r.axisMap, r.categoryAxisMap), r
}
var l2 = {
  cartesian2d: function (t, e, r, n) {
    var i = t.getReferringComponents("xAxis", er).models[0],
      a = t.getReferringComponents("yAxis", er).models[0];
    e.coordSysDims = ["x", "y"], r.set("x", i), r.set("y", a), Oi(i) && (n.set("x", i), e.firstCategoryDimIndex = 0), Oi(a) && (n.set("y", a), e.firstCategoryDimIndex == null && (e.firstCategoryDimIndex = 1))
  },
  singleAxis: function (t, e, r, n) {
    var i = t.getReferringComponents("singleAxis", er).models[0];
    e.coordSysDims = ["single"], r.set("single", i), Oi(i) && (n.set("single", i), e.firstCategoryDimIndex = 0)
  },
  polar: function (t, e, r, n) {
    var i = t.getReferringComponents("polar", er).models[0],
      a = i.findAxisModel("radiusAxis"),
      o = i.findAxisModel("angleAxis");
    e.coordSysDims = ["radius", "angle"], r.set("radius", a), r.set("angle", o), Oi(a) && (n.set("radius", a), e.firstCategoryDimIndex = 0), Oi(o) && (n.set("angle", o), e.firstCategoryDimIndex == null && (e.firstCategoryDimIndex = 1))
  },
  geo: function (t, e, r, n) {
    e.coordSysDims = ["lng", "lat"]
  },
  parallel: function (t, e, r, n) {
    var i = t.ecModel,
      a = i.getComponent("parallel", t.get("parallelIndex")),
      o = e.coordSysDims = a.dimensions.slice();
    P(a.parallelAxisIndex, function (s, l) {
      var u = i.getComponent("parallelAxis", s),
        f = o[l];
      r.set(f, u), Oi(u) && (n.set(f, u), e.firstCategoryDimIndex == null && (e.firstCategoryDimIndex = l))
    })
  }
};

function Oi(t) {
  return t.get("type") === "category"
}

function u2(t, e, r) {
  r = r || {};
  var n = r.byIndex,
    i = r.stackedCoordDimension,
    a, o, s;
  f2(e) ? a = e : (o = e.schema, a = o.dimensions, s = e.store);
  var l = !!(t && t.get("stack")),
    u, f, c, h;
  if (P(a, function (m, _) {
      nt(m) && (a[_] = m = {
        name: m
      }), l && !m.isExtraCoord && (!n && !u && m.ordinalMeta && (u = m), !f && m.type !== "ordinal" && m.type !== "time" && (!i || i === m.coordDim) && (f = m))
    }), f && !n && !u && (n = !0), f) {
    c = "__\0ecstackresult_" + t.id, h = "__\0ecstackedover_" + t.id, u && (u.createInvertedIndices = !0);
    var v = f.coordDim,
      d = f.type,
      y = 0;
    P(a, function (m) {
      m.coordDim === v && y++
    });
    var g = {
        name: c,
        coordDim: v,
        coordDimIndex: y,
        type: d,
        isExtraCoord: !0,
        isCalculationCoord: !0,
        storeDimIndex: a.length
      },
      p = {
        name: h,
        coordDim: h,
        coordDimIndex: y + 1,
        type: d,
        isExtraCoord: !0,
        isCalculationCoord: !0,
        storeDimIndex: a.length + 1
      };
    o ? (s && (g.storeDimIndex = s.ensureCalculationDimension(h, d), p.storeDimIndex = s.ensureCalculationDimension(c, d)), o.appendCalculationDimension(g), o.appendCalculationDimension(p)) : (a.push(g), a.push(p))
  }
  return {
    stackedDimension: f && f.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: n,
    stackedOverDimension: h,
    stackResultDimension: c
  }
}

function f2(t) {
  return !uS(t.schema)
}

function Wo(t, e) {
  return !!e && e === t.getCalculationInfo("stackedDimension")
}

function c2(t, e) {
  return Wo(t, e) ? t.getCalculationInfo("stackResultDimension") : e
}

function h2(t, e) {
  var r = t.get("coordinateSystem"),
    n = Vv.get(r),
    i;
  return e && e.coordSysDims && (i = ct(e.coordSysDims, function (a) {
    var o = {
        name: a
      },
      s = e.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = UR(l)
    }
    return o
  })), i || (i = n && (n.getDimensionsInfo ? n.getDimensionsInfo() : n.dimensions.slice()) || ["x", "y"]), i
}

function v2(t, e, r) {
  var n, i;
  return r && P(t, function (a, o) {
    var s = a.coordDim,
      l = r.categoryAxisMap.get(s);
    l && (n == null && (n = o), a.ordinalMeta = l.getOrdinalMeta(), e && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (i = !0)
  }), !i && n != null && (t[n].otherDims.itemName = 0), n
}

function d2(t, e, r) {
  r = r || {};
  var n = e.getSourceManager(),
    i, a = !1;
  t ? (a = !0, i = Gv(t)) : (i = n.getSource(), a = i.sourceFormat === Xe);
  var o = s2(e),
    s = h2(e, o),
    l = r.useEncodeDefaulter,
    u = dt(l) ? l : l ? jt(ZI, s, e) : null,
    f = {
      coordDimensions: s,
      generateCoord: r.generateCoord,
      encodeDefine: e.getEncode(),
      encodeDefaulter: u,
      canOmitUnusedDimensions: !a
    },
    c = r2(i, f),
    h = v2(c.dimensions, r.createInvertedIndices, o),
    v = a ? null : n.getSharedDataStore(c),
    d = u2(e, {
      schema: c,
      store: v
    }),
    y = new e2(c, e);
  y.setCalculationInfo(d);
  var g = h != null && p2(i) ? function (p, m, _, w) {
    return w === h ? _ : this.defaultDimValueGetter(p, m, _, w)
  } : null;
  return y.hasItemOption = !1, y.initData(a ? i : v, null, g), y
}

function p2(t) {
  if (t.sourceFormat === Xe) {
    var e = g2(t.data || []);
    return !et(Zo(e))
  }
}

function g2(t) {
  for (var e = 0; e < t.length && t[e] == null;) e++;
  return t[e]
}
var vS = function () {
  function t(e) {
    this._setting = e || {}, this._extent = [1 / 0, -1 / 0]
  }
  return t.prototype.getSetting = function (e) {
    return this._setting[e]
  }, t.prototype.unionExtent = function (e) {
    var r = this._extent;
    e[0] < r[0] && (r[0] = e[0]), e[1] > r[1] && (r[1] = e[1])
  }, t.prototype.unionExtentFromData = function (e, r) {
    this.unionExtent(e.getApproximateExtent(r))
  }, t.prototype.getExtent = function () {
    return this._extent.slice()
  }, t.prototype.setExtent = function (e, r) {
    var n = this._extent;
    isNaN(e) || (n[0] = e), isNaN(r) || (n[1] = r)
  }, t.prototype.isInExtentRange = function (e) {
    return this._extent[0] <= e && this._extent[1] >= e
  }, t.prototype.isBlank = function () {
    return this._isBlank
  }, t.prototype.setBlank = function (e) {
    this._isBlank = e
  }, t
}();
iu(vS);
var Hr = vS,
  y2 = 0,
  m2 = function () {
    function t(e) {
      this.categories = e.categories || [], this._needCollect = e.needCollect, this._deduplication = e.deduplication, this.uid = ++y2
    }
    return t.createByAxisModel = function (e) {
      var r = e.option,
        n = r.data,
        i = n && ct(n, _2);
      return new t({
        categories: i,
        needCollect: !i,
        deduplication: r.dedplication !== !1
      })
    }, t.prototype.getOrdinal = function (e) {
      return this._getOrCreateMap().get(e)
    }, t.prototype.parseAndCollect = function (e) {
      var r, n = this._needCollect;
      if (!nt(e) && !n) return e;
      if (n && !this._deduplication) return r = this.categories.length, this.categories[r] = e, r;
      var i = this._getOrCreateMap();
      return r = i.get(e), r == null && (n ? (r = this.categories.length, this.categories[r] = e, i.set(e, r)) : r = NaN), r
    }, t.prototype._getOrCreateMap = function () {
      return this._map || (this._map = gt(this.categories))
    }, t
  }();

function _2(t) {
  return st(t) && t.value != null ? t.value : t + ""
}
var uh = m2;

function fh(t) {
  return t.type === "interval" || t.type === "log"
}

function w2(t, e, r, n) {
  var i = {},
    a = t[1] - t[0],
    o = i.interval = N_(a / e, !0);
  r != null && o < r && (o = i.interval = r), n != null && o > n && (o = i.interval = n);
  var s = i.intervalPrecision = dS(o),
    l = i.niceTickExtent = [Yt(Math.ceil(t[0] / o) * o, s), Yt(Math.floor(t[1] / o) * o, s)];
  return S2(l, t), i
}

function zf(t) {
  var e = Math.pow(10, pv(t)),
    r = t / e;
  return r ? r === 2 ? r = 3 : r === 3 ? r = 5 : r *= 2 : r = 1, Yt(r * e)
}

function dS(t) {
  return Ar(t) + 2
}

function Vy(t, e, r) {
  t[e] = Math.max(Math.min(t[e], r[1]), r[0])
}

function S2(t, e) {
  !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), Vy(t, 0, e), Vy(t, 1, e), t[0] > t[1] && (t[0] = t[1])
}

function xu(t, e) {
  return t >= e[0] && t <= e[1]
}

function Cu(t, e) {
  return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0])
}

function Tu(t, e) {
  return t * (e[1] - e[0]) + e[0]
}
var pS = function (t) {
  J(e, t);

  function e(r) {
    var n = t.call(this, r) || this;
    n.type = "ordinal";
    var i = n.getSetting("ordinalMeta");
    return i || (i = new uh({})), et(i) && (i = new uh({
      categories: ct(i, function (a) {
        return st(a) ? a.value : a
      })
    })), n._ordinalMeta = i, n._extent = n.getSetting("extent") || [0, i.categories.length - 1], n
  }
  return e.prototype.parse = function (r) {
    return nt(r) ? this._ordinalMeta.getOrdinal(r) : Math.round(r)
  }, e.prototype.contain = function (r) {
    return r = this.parse(r), xu(r, this._extent) && this._ordinalMeta.categories[r] != null
  }, e.prototype.normalize = function (r) {
    return r = this._getTickNumber(this.parse(r)), Cu(r, this._extent)
  }, e.prototype.scale = function (r) {
    return r = Math.round(Tu(r, this._extent)), this.getRawOrdinalNumber(r)
  }, e.prototype.getTicks = function () {
    for (var r = [], n = this._extent, i = n[0]; i <= n[1];) r.push({
      value: i
    }), i++;
    return r
  }, e.prototype.getMinorTicks = function (r) {}, e.prototype.setSortInfo = function (r) {
    if (r == null) {
      this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
      return
    }
    for (var n = r.ordinalNumbers, i = this._ordinalNumbersByTick = [], a = this._ticksByOrdinalNumber = [], o = 0, s = this._ordinalMeta.categories.length, l = Math.min(s, n.length); o < l; ++o) {
      var u = n[o];
      i[o] = u, a[u] = o
    }
    for (var f = 0; o < s; ++o) {
      for (; a[f] != null;) f++;
      i.push(f), a[f] = o
    }
  }, e.prototype._getTickNumber = function (r) {
    var n = this._ticksByOrdinalNumber;
    return n && r >= 0 && r < n.length ? n[r] : r
  }, e.prototype.getRawOrdinalNumber = function (r) {
    var n = this._ordinalNumbersByTick;
    return n && r >= 0 && r < n.length ? n[r] : r
  }, e.prototype.getLabel = function (r) {
    if (!this.isBlank()) {
      var n = this.getRawOrdinalNumber(r.value),
        i = this._ordinalMeta.categories[n];
      return i == null ? "" : i + ""
    }
  }, e.prototype.count = function () {
    return this._extent[1] - this._extent[0] + 1
  }, e.prototype.unionExtentFromData = function (r, n) {
    this.unionExtent(r.getApproximateExtent(n))
  }, e.prototype.isInExtentRange = function (r) {
    return r = this._getTickNumber(r), this._extent[0] <= r && this._extent[1] >= r
  }, e.prototype.getOrdinalMeta = function () {
    return this._ordinalMeta
  }, e.prototype.calcNiceTicks = function () {}, e.prototype.calcNiceExtent = function () {}, e.type = "ordinal", e
}(Hr);
Hr.registerClass(pS);
var gS = pS,
  Yn = Yt,
  yS = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = "interval", r._interval = 0, r._intervalPrecision = 2, r
    }
    return e.prototype.parse = function (r) {
      return r
    }, e.prototype.contain = function (r) {
      return xu(r, this._extent)
    }, e.prototype.normalize = function (r) {
      return Cu(r, this._extent)
    }, e.prototype.scale = function (r) {
      return Tu(r, this._extent)
    }, e.prototype.setExtent = function (r, n) {
      var i = this._extent;
      isNaN(r) || (i[0] = parseFloat(r)), isNaN(n) || (i[1] = parseFloat(n))
    }, e.prototype.unionExtent = function (r) {
      var n = this._extent;
      r[0] < n[0] && (n[0] = r[0]), r[1] > n[1] && (n[1] = r[1]), this.setExtent(n[0], n[1])
    }, e.prototype.getInterval = function () {
      return this._interval
    }, e.prototype.setInterval = function (r) {
      this._interval = r, this._niceExtent = this._extent.slice(), this._intervalPrecision = dS(r)
    }, e.prototype.getTicks = function (r) {
      var n = this._interval,
        i = this._extent,
        a = this._niceExtent,
        o = this._intervalPrecision,
        s = [];
      if (!n) return s;
      var l = 1e4;
      i[0] < a[0] && (r ? s.push({
        value: Yn(a[0] - n, o)
      }) : s.push({
        value: i[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
          value: u
        }), u = Yn(u + n, o), u !== s[s.length - 1].value);)
        if (s.length > l) return [];
      var f = s.length ? s[s.length - 1].value : a[1];
      return i[1] > f && (r ? s.push({
        value: Yn(f + n, o)
      }) : s.push({
        value: i[1]
      })), s
    }, e.prototype.getMinorTicks = function (r) {
      for (var n = this.getTicks(!0), i = [], a = this.getExtent(), o = 1; o < n.length; o++) {
        for (var s = n[o], l = n[o - 1], u = 0, f = [], c = s.value - l.value, h = c / r; u < r - 1;) {
          var v = Yn(l.value + (u + 1) * h);
          v > a[0] && v < a[1] && f.push(v), u++
        }
        i.push(f)
      }
      return i
    }, e.prototype.getLabel = function (r, n) {
      if (r == null) return "";
      var i = n && n.precision;
      i == null ? i = Ar(r.value) || 0 : i === "auto" && (i = this._intervalPrecision);
      var a = Yn(r.value, i, !0);
      return Q1(a)
    }, e.prototype.calcNiceTicks = function (r, n, i) {
      r = r || 5;
      var a = this._extent,
        o = a[1] - a[0];
      if (!!isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = w2(a, r, n, i);
        this._intervalPrecision = s.intervalPrecision, this._interval = s.interval, this._niceExtent = s.niceTickExtent
      }
    }, e.prototype.calcNiceExtent = function (r) {
      var n = this._extent;
      if (n[0] === n[1])
        if (n[0] !== 0) {
          var i = n[0];
          r.fixMax || (n[1] += i / 2), n[0] -= i / 2
        } else n[1] = 1;
      var a = n[1] - n[0];
      isFinite(a) || (n[0] = 0, n[1] = 1), this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval);
      var o = this._interval;
      r.fixMin || (n[0] = Yn(Math.floor(n[0] / o) * o)), r.fixMax || (n[1] = Yn(Math.ceil(n[1] / o) * o))
    }, e.prototype.setNiceExtent = function (r, n) {
      this._niceExtent = [r, n]
    }, e.type = "interval", e
  }(Hr);
Hr.registerClass(yS);
var ts = yS,
  mS = typeof Float32Array != "undefined",
  b2 = mS ? Float32Array : Array;

function Ui(t) {
  return et(t) ? mS ? new Float32Array(t) : t : new b2(t)
}
var x2 = "__ec_stack_";

function _S(t) {
  return t.get("stack") || x2 + t.seriesIndex
}

function wS(t) {
  return t.dim + t.index
}

function C2(t, e) {
  var r = [];
  return e.eachSeriesByType(t, function (n) {
    P2(n) && r.push(n)
  }), r
}

function T2(t) {
  var e = {};
  P(t, function (l) {
    var u = l.coordinateSystem,
      f = u.getBaseAxis();
    if (!(f.type !== "time" && f.type !== "value"))
      for (var c = l.getData(), h = f.dim + "_" + f.index, v = c.getDimensionIndex(c.mapDimension(f.dim)), d = c.getStore(), y = 0, g = d.count(); y < g; ++y) {
        var p = d.get(v, y);
        e[h] ? e[h].push(p) : e[h] = [p]
      }
  });
  var r = {};
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      var i = e[n];
      if (i) {
        i.sort(function (l, u) {
          return l - u
        });
        for (var a = null, o = 1; o < i.length; ++o) {
          var s = i[o] - i[o - 1];
          s > 0 && (a = a === null ? s : Math.min(a, s))
        }
        r[n] = a
      }
    } return r
}

function M2(t) {
  var e = T2(t),
    r = [];
  return P(t, function (n) {
    var i = n.coordinateSystem,
      a = i.getBaseAxis(),
      o = a.getExtent(),
      s;
    if (a.type === "category") s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index,
        u = e[l],
        f = Math.abs(o[1] - o[0]),
        c = a.scale.getExtent(),
        h = Math.abs(c[1] - c[0]);
      s = u ? f / h * u : f
    } else {
      var v = n.getData();
      s = Math.abs(o[1] - o[0]) / v.count()
    }
    var d = ue(n.get("barWidth"), s),
      y = ue(n.get("barMaxWidth"), s),
      g = ue(n.get("barMinWidth") || (I2(n) ? .5 : 1), s),
      p = n.get("barGap"),
      m = n.get("barCategoryGap");
    r.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: y,
      barMinWidth: g,
      barGap: p,
      barCategoryGap: m,
      axisKey: wS(a),
      stackId: _S(n)
    })
  }), D2(r)
}

function D2(t) {
  var e = {};
  P(t, function (n, i) {
    var a = n.axisKey,
      o = n.bandWidth,
      s = e[a] || {
        bandWidth: o,
        remainedWidth: o,
        autoWidthCount: 0,
        categoryGap: null,
        gap: "20%",
        stacks: {}
      },
      l = s.stacks;
    e[a] = s;
    var u = n.stackId;
    l[u] || s.autoWidthCount++, l[u] = l[u] || {
      width: 0,
      maxWidth: 0
    };
    var f = n.barWidth;
    f && !l[u].width && (l[u].width = f, f = Math.min(s.remainedWidth, f), s.remainedWidth -= f);
    var c = n.barMaxWidth;
    c && (l[u].maxWidth = c);
    var h = n.barMinWidth;
    h && (l[u].minWidth = h);
    var v = n.barGap;
    v != null && (s.gap = v);
    var d = n.barCategoryGap;
    d != null && (s.categoryGap = d)
  });
  var r = {};
  return P(e, function (n, i) {
    r[i] = {};
    var a = n.stacks,
      o = n.bandWidth,
      s = n.categoryGap;
    if (s == null) {
      var l = Vt(a).length;
      s = Math.max(35 - l * 4, 15) + "%"
    }
    var u = ue(s, o),
      f = ue(n.gap, 1),
      c = n.remainedWidth,
      h = n.autoWidthCount,
      v = (c - u) / (h + (h - 1) * f);
    v = Math.max(v, 0), P(a, function (p) {
      var m = p.maxWidth,
        _ = p.minWidth;
      if (p.width) {
        var w = p.width;
        m && (w = Math.min(w, m)), _ && (w = Math.max(w, _)), p.width = w, c -= w + f * w, h--
      } else {
        var w = v;
        m && m < w && (w = Math.min(m, c)), _ && _ > w && (w = _), w !== v && (p.width = w, c -= w + f * w, h--)
      }
    }), v = (c - u) / (h + (h - 1) * f), v = Math.max(v, 0);
    var d = 0,
      y;
    P(a, function (p, m) {
      p.width || (p.width = v), y = p, d += p.width * (1 + f)
    }), y && (d -= y.width * f);
    var g = -d / 2;
    P(a, function (p, m) {
      r[i][m] = r[i][m] || {
        bandWidth: o,
        offset: g,
        width: p.width
      }, g += p.width * (1 + f)
    })
  }), r
}

function A2(t, e, r) {
  if (t && e) {
    var n = t[wS(e)];
    return n != null && r != null ? n[_S(r)] : n
  }
}

function P2(t) {
  return t.coordinateSystem && t.coordinateSystem.type === "cartesian2d"
}

function I2(t) {
  return t.pipelineContext && t.pipelineContext.large
}
var E2 = function (t, e, r, n) {
    for (; r < n;) {
      var i = r + n >>> 1;
      t[i][1] < e ? r = i + 1 : n = i
    }
    return r
  },
  SS = function (t) {
    J(e, t);

    function e(r) {
      var n = t.call(this, r) || this;
      return n.type = "time", n
    }
    return e.prototype.getLabel = function (r) {
      var n = this.getSetting("useUTC");
      return hu(r.value, Eg[FI(Qi(this._minLevelUnit))] || Eg.second, n, this.getSetting("locale"))
    }, e.prototype.getFormattedLabel = function (r, n, i) {
      var a = this.getSetting("useUTC"),
        o = this.getSetting("locale");
      return zI(r, n, i, o, a)
    }, e.prototype.getTicks = function () {
      var r = this._interval,
        n = this._extent,
        i = [];
      if (!r) return i;
      i.push({
        value: n[0],
        level: 0
      });
      var a = this.getSetting("useUTC"),
        o = F2(this._minLevelUnit, this._approxInterval, a, n);
      return i = i.concat(o), i.push({
        value: n[1],
        level: 0
      }), i
    }, e.prototype.calcNiceExtent = function (r) {
      var n = this._extent;
      if (n[0] === n[1] && (n[0] -= We, n[1] += We), n[1] === -1 / 0 && n[0] === 1 / 0) {
        var i = new Date;
        n[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), n[0] = n[1] - We
      }
      this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval)
    }, e.prototype.calcNiceTicks = function (r, n, i) {
      r = r || 10;
      var a = this._extent,
        o = a[1] - a[0];
      this._approxInterval = o / r, n != null && this._approxInterval < n && (this._approxInterval = n), i != null && this._approxInterval > i && (this._approxInterval = i);
      var s = zs.length,
        l = Math.min(E2(zs, this._approxInterval, 0, s), s - 1);
      this._interval = zs[l][1], this._minLevelUnit = zs[Math.max(l - 1, 0)][0]
    }, e.prototype.parse = function (r) {
      return $t(r) ? r : +kr(r)
    }, e.prototype.contain = function (r) {
      return xu(this.parse(r), this._extent)
    }, e.prototype.normalize = function (r) {
      return Cu(this.parse(r), this._extent)
    }, e.prototype.scale = function (r) {
      return Tu(r, this._extent)
    }, e.type = "time", e
  }(ts),
  zs = [
    ["second", Bv],
    ["minute", Nv],
    ["hour", po],
    ["quarter-day", po * 6],
    ["half-day", po * 12],
    ["day", We * 1.2],
    ["half-week", We * 3.5],
    ["week", We * 7],
    ["month", We * 31],
    ["quarter", We * 95],
    ["half-year", Ig / 2],
    ["year", Ig]
  ];

function L2(t, e, r, n) {
  var i = kr(e),
    a = kr(r),
    o = function (d) {
      return Lg(i, d, n) === Lg(a, d, n)
    },
    s = function () {
      return o("year")
    },
    l = function () {
      return s() && o("month")
    },
    u = function () {
      return l() && o("day")
    },
    f = function () {
      return u() && o("hour")
    },
    c = function () {
      return f() && o("minute")
    },
    h = function () {
      return c() && o("second")
    },
    v = function () {
      return h() && o("millisecond")
    };
  switch (t) {
    case "year":
      return s();
    case "month":
      return l();
    case "day":
      return u();
    case "hour":
      return f();
    case "minute":
      return c();
    case "second":
      return h();
    case "millisecond":
      return v()
  }
}

function R2(t, e) {
  return t /= We, t > 16 ? 16 : t > 7.5 ? 7 : t > 3.5 ? 4 : t > 1.5 ? 2 : 1
}

function O2(t) {
  var e = 30 * We;
  return t /= e, t > 6 ? 6 : t > 3 ? 3 : t > 2 ? 2 : 1
}

function k2(t) {
  return t /= po, t > 12 ? 12 : t > 6 ? 6 : t > 3.5 ? 4 : t > 2 ? 2 : 1
}

function $y(t, e) {
  return t /= e ? Nv : Bv, t > 30 ? 30 : t > 20 ? 20 : t > 15 ? 15 : t > 10 ? 10 : t > 5 ? 5 : t > 2 ? 2 : 1
}

function B2(t) {
  return N_(t, !0)
}

function N2(t, e, r) {
  var n = new Date(t);
  switch (Qi(e)) {
    case "year":
    case "month":
      n[Y1(r)](0);
    case "day":
      n[X1(r)](1);
    case "hour":
      n[q1(r)](0);
    case "minute":
      n[K1(r)](0);
    case "second":
      n[Z1(r)](0), n[j1(r)](0)
  }
  return n.getTime()
}

function F2(t, e, r, n) {
  var i = 1e4,
    a = W1,
    o = 0;

  function s(D, I, A, L, O, H, B) {
    for (var Q = new Date(I), G = I, Z = Q[L](); G < A && G <= n[1];) B.push({
      value: G
    }), Z += D, Q[O](Z), G = Q.getTime();
    B.push({
      value: G,
      notAdd: !0
    })
  }

  function l(D, I, A) {
    var L = [],
      O = !I.length;
    if (!L2(Qi(D), n[0], n[1], r)) {
      O && (I = [{
        value: N2(new Date(n[0]), D, r)
      }, {
        value: n[1]
      }]);
      for (var H = 0; H < I.length - 1; H++) {
        var B = I[H].value,
          Q = I[H + 1].value;
        if (B !== Q) {
          var G = void 0,
            Z = void 0,
            lt = void 0,
            _t = !1;
          switch (D) {
            case "year":
              G = Math.max(1, Math.round(e / We / 365)), Z = Fv(r), lt = HI(r);
              break;
            case "half-year":
            case "quarter":
            case "month":
              G = O2(e), Z = Ji(r), lt = Y1(r);
              break;
            case "week":
            case "half-week":
            case "day":
              G = R2(e), Z = vu(r), lt = X1(r), _t = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              G = k2(e), Z = Bo(r), lt = q1(r);
              break;
            case "minute":
              G = $y(e, !0), Z = du(r), lt = K1(r);
              break;
            case "second":
              G = $y(e, !1), Z = pu(r), lt = Z1(r);
              break;
            case "millisecond":
              G = B2(e), Z = gu(r), lt = j1(r);
              break
          }
          s(G, B, Q, Z, lt, _t, L), D === "year" && A.length > 1 && H === 0 && A.unshift({
            value: A[0].value - G
          })
        }
      }
      for (var H = 0; H < L.length; H++) A.push(L[H]);
      return L
    }
  }
  for (var u = [], f = [], c = 0, h = 0, v = 0; v < a.length && o++ < i; ++v) {
    var d = Qi(a[v]);
    if (!!NI(a[v])) {
      l(a[v], u[u.length - 1] || [], f);
      var y = a[v + 1] ? Qi(a[v + 1]) : null;
      if (d !== y) {
        if (f.length) {
          h = c, f.sort(function (D, I) {
            return D.value - I.value
          });
          for (var g = [], p = 0; p < f.length; ++p) {
            var m = f[p].value;
            (p === 0 || f[p - 1].value !== m) && (g.push(f[p]), m >= n[0] && m <= n[1] && c++)
          }
          var _ = (n[1] - n[0]) / e;
          if (c > _ * 1.5 && h > _ / 1.5 || (u.push(g), c > _ || t === a[v])) break
        }
        f = []
      }
    }
  }
  for (var w = ge(ct(u, function (D) {
      return ge(D, function (I) {
        return I.value >= n[0] && I.value <= n[1] && !I.notAdd
      })
    }), function (D) {
      return D.length > 0
    }), b = [], S = w.length - 1, v = 0; v < w.length; ++v)
    for (var x = w[v], T = 0; T < x.length; ++T) b.push({
      value: x[T].value,
      level: S - v
    });
  b.sort(function (D, I) {
    return D.value - I.value
  });
  for (var M = [], v = 0; v < b.length; ++v)(v === 0 || b[v].value !== b[v - 1].value) && M.push(b[v]);
  return M
}
Hr.registerClass(SS);
var z2 = SS,
  Gy = Hr.prototype,
  wo = ts.prototype,
  H2 = Yt,
  V2 = Math.floor,
  $2 = Math.ceil,
  Hs = Math.pow,
  Re = Math.log,
  Jv = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = "log", r.base = 10, r._originalScale = new ts, r._interval = 0, r
    }
    return e.prototype.getTicks = function (r) {
      var n = this._originalScale,
        i = this._extent,
        a = n.getExtent(),
        o = wo.getTicks.call(this, r);
      return ct(o, function (s) {
        var l = s.value,
          u = Yt(Hs(this.base, l));
        return u = l === i[0] && this._fixMin ? Vs(u, a[0]) : u, u = l === i[1] && this._fixMax ? Vs(u, a[1]) : u, {
          value: u
        }
      }, this)
    }, e.prototype.setExtent = function (r, n) {
      var i = this.base;
      r = Re(r) / Re(i), n = Re(n) / Re(i), wo.setExtent.call(this, r, n)
    }, e.prototype.getExtent = function () {
      var r = this.base,
        n = Gy.getExtent.call(this);
      n[0] = Hs(r, n[0]), n[1] = Hs(r, n[1]);
      var i = this._originalScale,
        a = i.getExtent();
      return this._fixMin && (n[0] = Vs(n[0], a[0])), this._fixMax && (n[1] = Vs(n[1], a[1])), n
    }, e.prototype.unionExtent = function (r) {
      this._originalScale.unionExtent(r);
      var n = this.base;
      r[0] = Re(r[0]) / Re(n), r[1] = Re(r[1]) / Re(n), Gy.unionExtent.call(this, r)
    }, e.prototype.unionExtentFromData = function (r, n) {
      this.unionExtent(r.getApproximateExtent(n))
    }, e.prototype.calcNiceTicks = function (r) {
      r = r || 10;
      var n = this._extent,
        i = n[1] - n[0];
      if (!(i === 1 / 0 || i <= 0)) {
        var a = LD(i),
          o = r / i * a;
        for (o <= .5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0;) a *= 10;
        var s = [Yt($2(n[0] / a) * a), Yt(V2(n[1] / a) * a)];
        this._interval = a, this._niceExtent = s
      }
    }, e.prototype.calcNiceExtent = function (r) {
      wo.calcNiceExtent.call(this, r), this._fixMin = r.fixMin, this._fixMax = r.fixMax
    }, e.prototype.parse = function (r) {
      return r
    }, e.prototype.contain = function (r) {
      return r = Re(r) / Re(this.base), xu(r, this._extent)
    }, e.prototype.normalize = function (r) {
      return r = Re(r) / Re(this.base), Cu(r, this._extent)
    }, e.prototype.scale = function (r) {
      return r = Tu(r, this._extent), Hs(this.base, r)
    }, e.type = "log", e
  }(Hr),
  bS = Jv.prototype;
bS.getMinorTicks = wo.getMinorTicks;
bS.getLabel = wo.getLabel;

function Vs(t, e) {
  return H2(t, Ar(e))
}
Hr.registerClass(Jv);
var G2 = Jv,
  W2 = function () {
    function t(e, r, n) {
      this._prepareParams(e, r, n)
    }
    return t.prototype._prepareParams = function (e, r, n) {
      n[1] < n[0] && (n = [NaN, NaN]), this._dataMin = n[0], this._dataMax = n[1];
      var i = this._isOrdinal = e.type === "ordinal";
      this._needCrossZero = e.type === "interval" && r.getNeedCrossZero && r.getNeedCrossZero();
      var a = this._modelMinRaw = r.get("min", !0);
      dt(a) ? this._modelMinNum = $s(e, a({
        min: n[0],
        max: n[1]
      })) : a !== "dataMin" && (this._modelMinNum = $s(e, a));
      var o = this._modelMaxRaw = r.get("max", !0);
      if (dt(o) ? this._modelMaxNum = $s(e, o({
          min: n[0],
          max: n[1]
        })) : o !== "dataMax" && (this._modelMaxNum = $s(e, o)), i) this._axisDataLen = r.getCategories().length;
      else {
        var s = r.get("boundaryGap"),
          l = et(s) ? s : [s || 0, s || 0];
        typeof l[0] == "boolean" || typeof l[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [li(l[0], 1), li(l[1], 1)]
      }
    }, t.prototype.calculate = function () {
      var e = this._isOrdinal,
        r = this._dataMin,
        n = this._dataMax,
        i = this._axisDataLen,
        a = this._boundaryGapInner,
        o = e ? null : n - r || Math.abs(r),
        s = this._modelMinRaw === "dataMin" ? r : this._modelMinNum,
        l = this._modelMaxRaw === "dataMax" ? n : this._modelMaxNum,
        u = s != null,
        f = l != null;
      s == null && (s = e ? i ? 0 : NaN : r - a[0] * o), l == null && (l = e ? i ? i - 1 : NaN : n + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var c = _l(s) || _l(l) || e && !i;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !f && (l = 0));
      var h = this._determinedMin,
        v = this._determinedMax;
      return h != null && (s = h, u = !0), v != null && (l = v, f = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: f,
        isBlank: c
      }
    }, t.prototype.modifyDataMinMax = function (e, r) {
      this[Y2[e]] = r
    }, t.prototype.setDeterminedMinMax = function (e, r) {
      var n = U2[e];
      this[n] = r
    }, t.prototype.freeze = function () {
      this.frozen = !0
    }, t
  }(),
  U2 = {
    min: "_determinedMin",
    max: "_determinedMax"
  },
  Y2 = {
    min: "_dataMin",
    max: "_dataMax"
  };

function X2(t, e, r) {
  var n = t.rawExtentInfo;
  return n || (n = new W2(t, e, r), t.rawExtentInfo = n, n)
}

function $s(t, e) {
  return e == null ? null : _l(e) ? NaN : t.parse(e)
}

function xS(t, e) {
  var r = t.type,
    n = X2(t, e, t.getExtent()).calculate();
  t.setBlank(n.isBlank);
  var i = n.min,
    a = n.max,
    o = e.ecModel;
  if (o && r === "time") {
    var s = C2("bar", o),
      l = !1;
    if (P(s, function (c) {
        l = l || c.getBaseAxis() === e.axis
      }), l) {
      var u = M2(s),
        f = q2(i, a, e, u);
      i = f.min, a = f.max
    }
  }
  return {
    extent: [i, a],
    fixMin: n.minFixed,
    fixMax: n.maxFixed
  }
}

function q2(t, e, r, n) {
  var i = r.axis.getExtent(),
    a = i[1] - i[0],
    o = A2(n, r.axis);
  if (o === void 0) return {
    min: t,
    max: e
  };
  var s = 1 / 0;
  P(o, function (v) {
    s = Math.min(v.offset, s)
  });
  var l = -1 / 0;
  P(o, function (v) {
    l = Math.max(v.offset + v.width, l)
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l,
    f = e - t,
    c = 1 - (s + l) / a,
    h = f / c - f;
  return e += h * (l / u), t -= h * (s / u), {
    min: t,
    max: e
  }
}

function Wy(t, e) {
  var r = e,
    n = xS(t, r),
    i = n.extent,
    a = r.get("splitNumber");
  t instanceof G2 && (t.base = r.get("logBase"));
  var o = t.type,
    s = r.get("interval"),
    l = o === "interval" || o === "time";
  t.setExtent(i[0], i[1]), t.calcNiceExtent({
    splitNumber: a,
    fixMin: n.fixMin,
    fixMax: n.fixMax,
    minInterval: l ? r.get("minInterval") : null,
    maxInterval: l ? r.get("maxInterval") : null
  }), s != null && t.setInterval && t.setInterval(s)
}

function K2(t, e) {
  if (e = e || t.get("type"), e) switch (e) {
    case "category":
      return new gS({
        ordinalMeta: t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(),
        extent: [1 / 0, -1 / 0]
      });
    case "time":
      return new z2({
        locale: t.ecModel.getLocaleModel(),
        useUTC: t.ecModel.get("useUTC")
      });
    default:
      return new(Hr.getClass(e) || ts)
  }
}

function Z2(t) {
  var e = t.scale.getExtent(),
    r = e[0],
    n = e[1];
  return !(r > 0 && n > 0 || r < 0 && n < 0)
}

function es(t) {
  var e = t.getLabelModel().get("formatter"),
    r = t.type === "category" ? t.scale.getExtent()[0] : null;
  return t.scale.type === "time" ? function (n) {
    return function (i, a) {
      return t.scale.getFormattedLabel(i, a, n)
    }
  }(e) : nt(e) ? function (n) {
    return function (i) {
      var a = t.scale.getLabel(i),
        o = n.replace("{value}", a != null ? a : "");
      return o
    }
  }(e) : dt(e) ? function (n) {
    return function (i, a) {
      return r != null && (a = i.value - r), n(td(t, i), a, i.level != null ? {
        level: i.level
      } : null)
    }
  }(e) : function (n) {
    return t.scale.getLabel(n)
  }
}

function td(t, e) {
  return t.type === "category" ? t.scale.getLabel(e) : e.value
}

function j2(t) {
  var e = t.model,
    r = t.scale;
  if (!(!e.get(["axisLabel", "show"]) || r.isBlank())) {
    var n, i, a = r.getExtent();
    r instanceof gS ? i = r.count() : (n = r.getTicks(), i = n.length);
    var o = t.getLabelModel(),
      s = es(t),
      l, u = 1;
    i > 40 && (u = Math.ceil(i / 40));
    for (var f = 0; f < i; f += u) {
      var c = n ? n[f] : {
          value: a[0] + f
        },
        h = s(c, f),
        v = o.getTextRect(h),
        d = Q2(v, o.get("rotate") || 0);
      l ? l.union(d) : l = d
    }
    return l
  }
}

function Q2(t, e) {
  var r = e * Math.PI / 180,
    n = t.width,
    i = t.height,
    a = n * Math.abs(Math.cos(r)) + Math.abs(i * Math.sin(r)),
    o = n * Math.abs(Math.sin(r)) + Math.abs(i * Math.cos(r)),
    s = new Ot(t.x, t.y, a, o);
  return s
}

function ed(t) {
  var e = t.get("interval");
  return e == null ? "auto" : e
}

function CS(t) {
  return t.type === "category" && ed(t.getLabelModel()) === 0
}

function J2(t, e) {
  var r = {};
  return P(t.mapDimensionsAll(e), function (n) {
    r[c2(t, n)] = !0
  }), Vt(r)
}
var tO = function () {
    function t() {}
    return t.prototype.getNeedCrossZero = function () {
      var e = this.option;
      return !e.scale
    }, t.prototype.getCoordSysModel = function () {}, t
  }(),
  Uy = [],
  eO = {
    registerPreprocessor: aS,
    registerProcessor: oS,
    registerPostInit: kR,
    registerPostUpdate: BR,
    registerUpdateLifecycle: jv,
    registerAction: wa,
    registerCoordinateSystem: NR,
    registerLayout: FR,
    registerVisual: yi,
    registerTransform: HR,
    registerLoading: sS,
    registerMap: zR,
    registerImpl: pR,
    PRIORITY: PR,
    ComponentModel: zt,
    ComponentView: Br,
    SeriesModel: Vo,
    ChartView: gn,
    registerComponentModel: function (t) {
      zt.registerClass(t)
    },
    registerComponentView: function (t) {
      Br.registerClass(t)
    },
    registerSeriesModel: function (t) {
      Vo.registerClass(t)
    },
    registerChartView: function (t) {
      gn.registerClass(t)
    },
    registerSubTypeDefaulter: function (t, e) {
      zt.registerSubTypeDefaulter(t, e)
    },
    registerPainter: function (t, e) {
      MD(t, e)
    }
  };

function vi(t) {
  if (et(t)) {
    P(t, function (e) {
      vi(e)
    });
    return
  }
  Pt(Uy, t) >= 0 || (Uy.push(t), dt(t) && (t = {
    install: t
  }), t.install(eO))
}
var Uo = Kt();

function rO(t) {
  return t.type === "category" ? iO(t) : oO(t)
}

function nO(t, e) {
  return t.type === "category" ? aO(t, e) : {
    ticks: ct(t.scale.getTicks(), function (r) {
      return r.value
    })
  }
}

function iO(t) {
  var e = t.getLabelModel(),
    r = TS(t, e);
  return !e.get("show") || t.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: r.labelCategoryInterval
  } : r
}

function TS(t, e) {
  var r = MS(t, "labels"),
    n = ed(e),
    i = DS(r, n);
  if (i) return i;
  var a, o;
  return dt(n) ? a = IS(t, n) : (o = n === "auto" ? sO(t) : n, a = PS(t, o)), AS(r, n, {
    labels: a,
    labelCategoryInterval: o
  })
}

function aO(t, e) {
  var r = MS(t, "ticks"),
    n = ed(e),
    i = DS(r, n);
  if (i) return i;
  var a, o;
  if ((!e.get("show") || t.scale.isBlank()) && (a = []), dt(n)) a = IS(t, n, !0);
  else if (n === "auto") {
    var s = TS(t, t.getLabelModel());
    o = s.labelCategoryInterval, a = ct(s.labels, function (l) {
      return l.tickValue
    })
  } else o = n, a = PS(t, o, !0);
  return AS(r, n, {
    ticks: a,
    tickCategoryInterval: o
  })
}

function oO(t) {
  var e = t.scale.getTicks(),
    r = es(t);
  return {
    labels: ct(e, function (n, i) {
      return {
        level: n.level,
        formattedLabel: r(n, i),
        rawLabel: t.scale.getLabel(n),
        tickValue: n.value
      }
    })
  }
}

function MS(t, e) {
  return Uo(t)[e] || (Uo(t)[e] = [])
}

function DS(t, e) {
  for (var r = 0; r < t.length; r++)
    if (t[r].key === e) return t[r].value
}

function AS(t, e, r) {
  return t.push({
    key: e,
    value: r
  }), r
}

function sO(t) {
  var e = Uo(t).autoInterval;
  return e != null ? e : Uo(t).autoInterval = t.calculateCategoryInterval()
}

function lO(t) {
  var e = uO(t),
    r = es(t),
    n = (e.axisRotate - e.labelRotate) / 180 * Math.PI,
    i = t.scale,
    a = i.getExtent(),
    o = i.count();
  if (a[1] - a[0] < 1) return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), f = Math.abs(u * Math.cos(n)), c = Math.abs(u * Math.sin(n)), h = 0, v = 0; l <= a[1]; l += s) {
    var d = 0,
      y = 0,
      g = hv(r({
        value: l
      }), e.font, "center", "top");
    d = g.width * 1.3, y = g.height * 1.3, h = Math.max(h, d, 7), v = Math.max(v, y, 7)
  }
  var p = h / f,
    m = v / c;
  isNaN(p) && (p = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(p, m))),
    w = Uo(t.model),
    b = t.getExtent(),
    S = w.lastAutoInterval,
    x = w.lastTickCount;
  return S != null && x != null && Math.abs(S - _) <= 1 && Math.abs(x - o) <= 1 && S > _ && w.axisExtent0 === b[0] && w.axisExtent1 === b[1] ? _ = S : (w.lastTickCount = o, w.lastAutoInterval = _, w.axisExtent0 = b[0], w.axisExtent1 = b[1]), _
}

function uO(t) {
  var e = t.getLabelModel();
  return {
    axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
    labelRotate: e.get("rotate") || 0,
    font: e.getFont()
  }
}

function PS(t, e, r) {
  var n = es(t),
    i = t.scale,
    a = i.getExtent(),
    o = t.getLabelModel(),
    s = [],
    l = Math.max((e || 0) + 1, 1),
    u = a[0],
    f = i.count();
  u !== 0 && l > 1 && f / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var c = CS(t),
    h = o.get("showMinLabel") || c,
    v = o.get("showMaxLabel") || c;
  h && u !== a[0] && y(a[0]);
  for (var d = u; d <= a[1]; d += l) y(d);
  v && d - l !== a[1] && y(a[1]);

  function y(g) {
    var p = {
      value: g
    };
    s.push(r ? g : {
      formattedLabel: n(p),
      rawLabel: i.getLabel(p),
      tickValue: g
    })
  }
  return s
}

function IS(t, e, r) {
  var n = t.scale,
    i = es(t),
    a = [];
  return P(n.getTicks(), function (o) {
    var s = n.getLabel(o),
      l = o.value;
    e(o.value, s) && a.push(r ? l : {
      formattedLabel: i(o),
      rawLabel: s,
      tickValue: l
    })
  }), a
}
var Yy = [0, 1],
  fO = function () {
    function t(e, r, n) {
      this.onBand = !1, this.inverse = !1, this.dim = e, this.scale = r, this._extent = n || [0, 0]
    }
    return t.prototype.contain = function (e) {
      var r = this._extent,
        n = Math.min(r[0], r[1]),
        i = Math.max(r[0], r[1]);
      return e >= n && e <= i
    }, t.prototype.containData = function (e) {
      return this.scale.contain(e)
    }, t.prototype.getExtent = function () {
      return this._extent.slice()
    }, t.prototype.getPixelPrecision = function (e) {
      return PD(e || this.scale.getExtent(), this._extent)
    }, t.prototype.setExtent = function (e, r) {
      var n = this._extent;
      n[0] = e, n[1] = r
    }, t.prototype.dataToCoord = function (e, r) {
      var n = this._extent,
        i = this.scale;
      return e = i.normalize(e), this.onBand && i.type === "ordinal" && (n = n.slice(), Xy(n, i.count())), kp(e, Yy, n, r)
    }, t.prototype.coordToData = function (e, r) {
      var n = this._extent,
        i = this.scale;
      this.onBand && i.type === "ordinal" && (n = n.slice(), Xy(n, i.count()));
      var a = kp(e, n, Yy, r);
      return this.scale.scale(a)
    }, t.prototype.pointToData = function (e, r) {}, t.prototype.getTicksCoords = function (e) {
      e = e || {};
      var r = e.tickModel || this.getTickModel(),
        n = nO(this, r),
        i = n.ticks,
        a = ct(i, function (s) {
          return {
            coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
            tickValue: s
          }
        }, this),
        o = r.get("alignWithLabel");
      return cO(this, a, o, e.clamp), a
    }, t.prototype.getMinorTicksCoords = function () {
      if (this.scale.type === "ordinal") return [];
      var e = this.model.getModel("minorTick"),
        r = e.get("splitNumber");
      r > 0 && r < 100 || (r = 5);
      var n = this.scale.getMinorTicks(r),
        i = ct(n, function (a) {
          return ct(a, function (o) {
            return {
              coord: this.dataToCoord(o),
              tickValue: o
            }
          }, this)
        }, this);
      return i
    }, t.prototype.getViewLabels = function () {
      return rO(this).labels
    }, t.prototype.getLabelModel = function () {
      return this.model.getModel("axisLabel")
    }, t.prototype.getTickModel = function () {
      return this.model.getModel("axisTick")
    }, t.prototype.getBandWidth = function () {
      var e = this._extent,
        r = this.scale.getExtent(),
        n = r[1] - r[0] + (this.onBand ? 1 : 0);
      n === 0 && (n = 1);
      var i = Math.abs(e[1] - e[0]);
      return Math.abs(i) / n
    }, t.prototype.calculateCategoryInterval = function () {
      return lO(this)
    }, t
  }();

function Xy(t, e) {
  var r = t[1] - t[0],
    n = e,
    i = r / n / 2;
  t[0] += i, t[1] -= i
}

function cO(t, e, r, n) {
  var i = e.length;
  if (!t.onBand || r || !i) return;
  var a = t.getExtent(),
    o, s;
  if (i === 1) e[0].coord = a[0], o = e[1] = {
    coord: a[0]
  };
  else {
    var l = e[i - 1].tickValue - e[0].tickValue,
      u = (e[i - 1].coord - e[0].coord) / l;
    P(e, function (v) {
      v.coord -= u / 2
    });
    var f = t.scale.getExtent();
    s = 1 + f[1] - e[i - 1].tickValue, o = {
      coord: e[i - 1].coord + u * s
    }, e.push(o)
  }
  var c = a[0] > a[1];
  h(e[0].coord, a[0]) && (n ? e[0].coord = a[0] : e.shift()), n && h(a[0], e[0].coord) && e.unshift({
    coord: a[0]
  }), h(a[1], o.coord) && (n ? o.coord = a[1] : e.pop()), n && h(o.coord, a[1]) && e.push({
    coord: a[1]
  });

  function h(v, d) {
    return v = Yt(v), d = Yt(d), c ? v > d : v < d
  }
}
var hO = fO;

function vO(t) {
  for (var e = [], r = 0; r < t.length; r++) {
    var n = t[r];
    if (!n.defaultAttr.ignore) {
      var i = n.label,
        a = i.getComputedTransform(),
        o = i.getBoundingRect(),
        s = !a || a[1] < 1e-5 && a[2] < 1e-5,
        l = i.style.margin || 0,
        u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var f = s ? new El(o, a) : null;
      e.push({
        label: i,
        labelLine: n.labelLine,
        rect: u,
        localRect: o,
        obb: f,
        priority: n.priority,
        defaultAttr: n.defaultAttr,
        layoutOption: n.computedLayoutOption,
        axisAligned: s,
        transform: a
      })
    }
  }
  return e
}

function dO(t) {
  var e = [];
  t.sort(function (y, g) {
    return g.priority - y.priority
  });
  var r = new Ot(0, 0, 0, 0);

  function n(y) {
    if (!y.ignore) {
      var g = y.ensureState("emphasis");
      g.ignore == null && (g.ignore = !1)
    }
    y.ignore = !0
  }
  for (var i = 0; i < t.length; i++) {
    var a = t[i],
      o = a.axisAligned,
      s = a.localRect,
      l = a.transform,
      u = a.label,
      f = a.labelLine;
    r.copy(a.rect), r.width -= .1, r.height -= .1, r.x += .05, r.y += .05;
    for (var c = a.obb, h = !1, v = 0; v < e.length; v++) {
      var d = e[v];
      if (!!r.intersect(d.rect)) {
        if (o && d.axisAligned) {
          h = !0;
          break
        }
        if (d.obb || (d.obb = new El(d.localRect, d.transform)), c || (c = new El(s, l)), c.intersect(d.obb)) {
          h = !0;
          break
        }
      }
    }
    h ? (n(u), f && n(f)) : (u.attr("ignore", a.defaultAttr.ignore), f && f.attr("ignore", a.defaultAttr.labelGuideIgnore), e.push(a))
  }
}
var pO = function (t) {
    J(e, t);

    function e() {
      return t !== null && t.apply(this, arguments) || this
    }
    return e.type = "grid", e.dependencies = ["xAxis", "yAxis"], e.layoutMode = "box", e.defaultOption = {
      show: !1,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 70,
      containLabel: !1,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    }, e
  }(zt),
  gO = pO,
  ch = function (t) {
    J(e, t);

    function e() {
      return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.getCoordSysModel = function () {
      return this.getReferringComponents("grid", er).models[0]
    }, e.type = "cartesian2dAxis", e
  }(zt);
mr(ch, tO);
var ES = {
    show: !0,
    z: 0,
    inverse: !1,
    name: "",
    nameLocation: "end",
    nameRotate: null,
    nameTruncate: {
      maxWidth: null,
      ellipsis: "...",
      placeholder: "."
    },
    nameTextStyle: {},
    nameGap: 15,
    silent: !1,
    triggerEvent: !1,
    tooltip: {
      show: !1
    },
    axisPointer: {},
    axisLine: {
      show: !0,
      onZero: !0,
      onZeroAxisIndex: null,
      lineStyle: {
        color: "#6E7079",
        width: 1,
        type: "solid"
      },
      symbol: ["none", "none"],
      symbolSize: [10, 15]
    },
    axisTick: {
      show: !0,
      inside: !1,
      length: 5,
      lineStyle: {
        width: 1
      }
    },
    axisLabel: {
      show: !0,
      inside: !1,
      rotate: 0,
      showMinLabel: null,
      showMaxLabel: null,
      margin: 8,
      fontSize: 12
    },
    splitLine: {
      show: !0,
      lineStyle: {
        color: ["#E0E6F1"],
        width: 1,
        type: "solid"
      }
    },
    splitArea: {
      show: !1,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
      }
    }
  },
  yO = Tt({
    boundaryGap: !0,
    deduplication: null,
    splitLine: {
      show: !1
    },
    axisTick: {
      alignWithLabel: !1,
      interval: "auto"
    },
    axisLabel: {
      interval: "auto"
    }
  }, ES),
  rd = Tt({
    boundaryGap: [0, 0],
    axisLine: {
      show: "auto"
    },
    axisTick: {
      show: "auto"
    },
    splitNumber: 5,
    minorTick: {
      show: !1,
      splitNumber: 5,
      length: 3,
      lineStyle: {}
    },
    minorSplitLine: {
      show: !1,
      lineStyle: {
        color: "#F4F7FD",
        width: 1
      }
    }
  }, ES),
  mO = Tt({
    splitNumber: 6,
    axisLabel: {
      showMinLabel: !1,
      showMaxLabel: !1,
      rich: {
        primary: {
          fontWeight: "bold"
        }
      }
    },
    splitLine: {
      show: !1
    }
  }, rd),
  _O = Dt({
    logBase: 10
  }, rd),
  wO = {
    category: yO,
    value: rd,
    time: mO,
    log: _O
  },
  SO = {
    value: 1,
    category: 1,
    time: 1,
    log: 1
  };

function qy(t, e, r, n) {
  P(SO, function (i, a) {
    var o = Tt(Tt({}, wO[a], !0), n, !0),
      s = function (l) {
        J(u, l);

        function u() {
          var f = l !== null && l.apply(this, arguments) || this;
          return f.type = e + "Axis." + a, f
        }
        return u.prototype.mergeDefaultAndTheme = function (f, c) {
          var h = Fo(this),
            v = h ? mu(f) : {},
            d = c.getTheme();
          Tt(f, d.get(a + "Axis")), Tt(f, this.getDefaultOption()), f.type = Ky(f), h && sa(f, v, h)
        }, u.prototype.optionUpdated = function () {
          var f = this.option;
          f.type === "category" && (this.__ordinalMeta = uh.createByAxisModel(this))
        }, u.prototype.getCategories = function (f) {
          var c = this.option;
          if (c.type === "category") return f ? c.data : this.__ordinalMeta.categories
        }, u.prototype.getOrdinalMeta = function () {
          return this.__ordinalMeta
        }, u.type = e + "Axis." + a, u.defaultOption = o, u
      }(r);
    t.registerComponentModel(s)
  }), t.registerSubTypeDefaulter(e + "Axis", Ky)
}

function Ky(t) {
  return t.type || (t.data ? "category" : "value")
}
var bO = function () {
    function t(e) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = e || ""
    }
    return t.prototype.getAxis = function (e) {
      return this._axes[e]
    }, t.prototype.getAxes = function () {
      return ct(this._dimList, function (e) {
        return this._axes[e]
      }, this)
    }, t.prototype.getAxesByScale = function (e) {
      return e = e.toLowerCase(), ge(this.getAxes(), function (r) {
        return r.scale.type === e
      })
    }, t.prototype.addAxis = function (e) {
      var r = e.dim;
      this._axes[r] = e, this._dimList.push(r)
    }, t
  }(),
  xO = bO,
  hh = ["x", "y"];

function Zy(t) {
  return t.type === "interval" || t.type === "time"
}
var CO = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = "cartesian2d", r.dimensions = hh, r
    }
    return e.prototype.calcAffineTransform = function () {
      this._transform = this._invTransform = null;
      var r = this.getAxis("x").scale,
        n = this.getAxis("y").scale;
      if (!(!Zy(r) || !Zy(n))) {
        var i = r.getExtent(),
          a = n.getExtent(),
          o = this.dataToPoint([i[0], a[0]]),
          s = this.dataToPoint([i[1], a[1]]),
          l = i[1] - i[0],
          u = a[1] - a[0];
        if (!(!l || !u)) {
          var f = (s[0] - o[0]) / l,
            c = (s[1] - o[1]) / u,
            h = o[0] - i[0] * f,
            v = o[1] - a[0] * c,
            d = this._transform = [f, 0, 0, c, h, v];
          this._invTransform = fv([], d)
        }
      }
    }, e.prototype.getBaseAxis = function () {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
    }, e.prototype.containPoint = function (r) {
      var n = this.getAxis("x"),
        i = this.getAxis("y");
      return n.contain(n.toLocalCoord(r[0])) && i.contain(i.toLocalCoord(r[1]))
    }, e.prototype.containData = function (r) {
      return this.getAxis("x").containData(r[0]) && this.getAxis("y").containData(r[1])
    }, e.prototype.dataToPoint = function (r, n, i) {
      i = i || [];
      var a = r[0],
        o = r[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o)) return Ye(i, r, this._transform);
      var s = this.getAxis("x"),
        l = this.getAxis("y");
      return i[0] = s.toGlobalCoord(s.dataToCoord(a, n)), i[1] = l.toGlobalCoord(l.dataToCoord(o, n)), i
    }, e.prototype.clampData = function (r, n) {
      var i = this.getAxis("x").scale,
        a = this.getAxis("y").scale,
        o = i.getExtent(),
        s = a.getExtent(),
        l = i.parse(r[0]),
        u = a.parse(r[1]);
      return n = n || [], n[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), n[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), n
    }, e.prototype.pointToData = function (r, n) {
      var i = [];
      if (this._invTransform) return Ye(i, r, this._invTransform);
      var a = this.getAxis("x"),
        o = this.getAxis("y");
      return i[0] = a.coordToData(a.toLocalCoord(r[0]), n), i[1] = o.coordToData(o.toLocalCoord(r[1]), n), i
    }, e.prototype.getOtherAxis = function (r) {
      return this.getAxis(r.dim === "x" ? "y" : "x")
    }, e.prototype.getArea = function () {
      var r = this.getAxis("x").getGlobalExtent(),
        n = this.getAxis("y").getGlobalExtent(),
        i = Math.min(r[0], r[1]),
        a = Math.min(n[0], n[1]),
        o = Math.max(r[0], r[1]) - i,
        s = Math.max(n[0], n[1]) - a;
      return new Ot(i, a, o, s)
    }, e
  }(xO),
  TO = CO,
  MO = function (t) {
    J(e, t);

    function e(r, n, i, a, o) {
      var s = t.call(this, r, n, i) || this;
      return s.index = 0, s.type = a || "value", s.position = o || "bottom", s
    }
    return e.prototype.isHorizontal = function () {
      var r = this.position;
      return r === "top" || r === "bottom"
    }, e.prototype.getGlobalExtent = function (r) {
      var n = this.getExtent();
      return n[0] = this.toGlobalCoord(n[0]), n[1] = this.toGlobalCoord(n[1]), r && n[0] > n[1] && n.reverse(), n
    }, e.prototype.pointToData = function (r, n) {
      return this.coordToData(this.toLocalCoord(r[this.dim === "x" ? 0 : 1]), n)
    }, e.prototype.setCategorySortInfo = function (r) {
      if (this.type !== "category") return !1;
      this.model.option.categorySortInfo = r, this.scale.setSortInfo(r)
    }, e
  }(hO),
  DO = MO;

function vh(t, e, r) {
  r = r || {};
  var n = t.coordinateSystem,
    i = e.axis,
    a = {},
    o = i.getAxesOnZeroOf()[0],
    s = i.position,
    l = o ? "onZero" : s,
    u = i.dim,
    f = n.getRect(),
    c = [f.x, f.x + f.width, f.y, f.y + f.height],
    h = {
      left: 0,
      right: 1,
      top: 0,
      bottom: 1,
      onZero: 2
    },
    v = e.get("offset") || 0,
    d = u === "x" ? [c[2] - v, c[3] + v] : [c[0] - v, c[1] + v];
  if (o) {
    var y = o.toGlobalCoord(o.dataToCoord(0));
    d[h.onZero] = Math.max(Math.min(y, d[1]), d[0])
  }
  a.position = [u === "y" ? d[h[l]] : c[0], u === "x" ? d[h[l]] : c[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var g = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = g[s], a.labelOffset = o ? d[h[s]] - d[h.onZero] : 0, e.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), Io(r.labelInside, e.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var p = e.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -p : p, a.z2 = 1, a
}

function jy(t) {
  return t.get("coordinateSystem") === "cartesian2d"
}

function Qy(t) {
  var e = {
    xAxisModel: null,
    yAxisModel: null
  };
  return P(e, function (r, n) {
    var i = n.replace(/Model$/, ""),
      a = t.getReferringComponents(i, er).models[0];
    e[n] = a
  }), e
}
var Hf = Math.log;

function AO(t, e, r) {
  var n = ts.prototype,
    i = n.getTicks.call(r),
    a = n.getTicks.call(r, !0),
    o = i.length - 1,
    s = n.getInterval.call(r),
    l = xS(t, e),
    u = l.extent,
    f = l.fixMin,
    c = l.fixMax;
  if (t.type === "log") {
    var h = Hf(t.base);
    u = [Hf(u[0]) / h, Hf(u[1]) / h]
  }
  t.setExtent(u[0], u[1]), t.calcNiceExtent({
    splitNumber: o,
    fixMin: f,
    fixMax: c
  });
  var v = n.getExtent.call(t);
  f && (u[0] = v[0]), c && (u[1] = v[1]);
  var d = n.getInterval.call(t),
    y = u[0],
    g = u[1];
  if (f && c) d = (g - y) / o;
  else if (f)
    for (g = u[0] + d * o; g < u[1] && isFinite(g) && isFinite(u[1]);) d = zf(d), g = u[0] + d * o;
  else if (c)
    for (y = u[1] - d * o; y > u[0] && isFinite(y) && isFinite(u[0]);) d = zf(d), y = u[1] - d * o;
  else {
    var p = t.getTicks().length - 1;
    p > o && (d = zf(d));
    var m = d * o;
    g = Math.ceil(u[1] / d) * d, y = Yt(g - m), y < 0 && u[0] >= 0 ? (y = 0, g = Yt(m)) : g > 0 && u[1] <= 0 && (g = 0, y = -Yt(m))
  }
  var _ = (i[0].value - a[0].value) / s,
    w = (i[o].value - a[o].value) / s;
  n.setExtent.call(t, y + d * _, g + d * w), n.setInterval.call(t, d), (_ || w) && n.setNiceExtent.call(t, y + d, g - d)
}
var PO = function () {
  function t(e, r, n) {
    this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = hh, this._initCartesian(e, r, n), this.model = e
  }
  return t.prototype.getRect = function () {
    return this._rect
  }, t.prototype.update = function (e, r) {
    var n = this._axesMap;
    this._updateScale(e, this.model);

    function i(o) {
      var s, l = Vt(o),
        u = l.length;
      if (!!u) {
        for (var f = [], c = u - 1; c >= 0; c--) {
          var h = +l[c],
            v = o[h],
            d = v.model,
            y = v.scale;
          fh(y) && d.get("alignTicks") && d.get("interval") == null ? f.push(v) : (Wy(y, d), fh(y) && (s = v))
        }
        f.length && (s || (s = f.pop(), Wy(s.scale, s.model)), P(f, function (g) {
          AO(g.scale, g.model, s.scale)
        }))
      }
    }
    i(n.x), i(n.y);
    var a = {};
    P(n.x, function (o) {
      Jy(n, "y", o, a)
    }), P(n.y, function (o) {
      Jy(n, "x", o, a)
    }), this.resize(this.model, r)
  }, t.prototype.resize = function (e, r, n) {
    var i = e.getBoxLayoutParams(),
      a = !n && e.get("containLabel"),
      o = No(i, {
        width: r.getWidth(),
        height: r.getHeight()
      });
    this._rect = o;
    var s = this._axesList;
    l(), a && (P(s, function (u) {
      if (!u.model.get(["axisLabel", "inside"])) {
        var f = j2(u);
        if (f) {
          var c = u.isHorizontal() ? "height" : "width",
            h = u.model.get(["axisLabel", "margin"]);
          o[c] -= f[c] + h, u.position === "top" ? o.y += f.height + h : u.position === "left" && (o.x += f.width + h)
        }
      }
    }), l()), P(this._coordsList, function (u) {
      u.calcAffineTransform()
    });

    function l() {
      P(s, function (u) {
        var f = u.isHorizontal(),
          c = f ? [0, o.width] : [0, o.height],
          h = u.inverse ? 1 : 0;
        u.setExtent(c[h], c[1 - h]), IO(u, f ? o.x : o.y)
      })
    }
  }, t.prototype.getAxis = function (e, r) {
    var n = this._axesMap[e];
    if (n != null) return n[r || 0]
  }, t.prototype.getAxes = function () {
    return this._axesList.slice()
  }, t.prototype.getCartesian = function (e, r) {
    if (e != null && r != null) {
      var n = "x" + e + "y" + r;
      return this._coordsMap[n]
    }
    st(e) && (r = e.yAxisIndex, e = e.xAxisIndex);
    for (var i = 0, a = this._coordsList; i < a.length; i++)
      if (a[i].getAxis("x").index === e || a[i].getAxis("y").index === r) return a[i]
  }, t.prototype.getCartesians = function () {
    return this._coordsList.slice()
  }, t.prototype.convertToPixel = function (e, r, n) {
    var i = this._findConvertTarget(r);
    return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null
  }, t.prototype.convertFromPixel = function (e, r, n) {
    var i = this._findConvertTarget(r);
    return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null
  }, t.prototype._findConvertTarget = function (e) {
    var r = e.seriesModel,
      n = e.xAxisModel || r && r.getReferringComponents("xAxis", er).models[0],
      i = e.yAxisModel || r && r.getReferringComponents("yAxis", er).models[0],
      a = e.gridModel,
      o = this._coordsList,
      s, l;
    if (r) s = r.coordinateSystem, Pt(o, s) < 0 && (s = null);
    else if (n && i) s = this.getCartesian(n.componentIndex, i.componentIndex);
    else if (n) l = this.getAxis("x", n.componentIndex);
    else if (i) l = this.getAxis("y", i.componentIndex);
    else if (a) {
      var u = a.coordinateSystem;
      u === this && (s = this._coordsList[0])
    }
    return {
      cartesian: s,
      axis: l
    }
  }, t.prototype.containPoint = function (e) {
    var r = this._coordsList[0];
    if (r) return r.containPoint(e)
  }, t.prototype._initCartesian = function (e, r, n) {
    var i = this,
      a = this,
      o = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      },
      s = {
        x: {},
        y: {}
      },
      l = {
        x: 0,
        y: 0
      };
    if (r.eachComponent("xAxis", u("x"), this), r.eachComponent("yAxis", u("y"), this), !l.x || !l.y) {
      this._axesMap = {}, this._axesList = [];
      return
    }
    this._axesMap = s, P(s.x, function (f, c) {
      P(s.y, function (h, v) {
        var d = "x" + c + "y" + v,
          y = new TO(d);
        y.master = i, y.model = e, i._coordsMap[d] = y, i._coordsList.push(y), y.addAxis(f), y.addAxis(h)
      })
    });

    function u(f) {
      return function (c, h) {
        if (!!Vf(c, e)) {
          var v = c.get("position");
          f === "x" ? v !== "top" && v !== "bottom" && (v = o.bottom ? "top" : "bottom") : v !== "left" && v !== "right" && (v = o.left ? "right" : "left"), o[v] = !0;
          var d = new DO(f, K2(c), [0, 0], c.get("type"), v),
            y = d.type === "category";
          d.onBand = y && c.get("boundaryGap"), d.inverse = c.get("inverse"), c.axis = d, d.model = c, d.grid = a, d.index = h, a._axesList.push(d), s[f][h] = d, l[f]++
        }
      }
    }
  }, t.prototype._updateScale = function (e, r) {
    P(this._axesList, function (i) {
      if (i.scale.setExtent(1 / 0, -1 / 0), i.type === "category") {
        var a = i.model.get("categorySortInfo");
        i.scale.setSortInfo(a)
      }
    }), e.eachSeries(function (i) {
      if (jy(i)) {
        var a = Qy(i),
          o = a.xAxisModel,
          s = a.yAxisModel;
        if (!Vf(o, r) || !Vf(s, r)) return;
        var l = this.getCartesian(o.componentIndex, s.componentIndex),
          u = i.getData(),
          f = l.getAxis("x"),
          c = l.getAxis("y");
        n(u, f), n(u, c)
      }
    }, this);

    function n(i, a) {
      P(J2(i, a.dim), function (o) {
        a.scale.unionExtentFromData(i, o)
      })
    }
  }, t.prototype.getTooltipAxes = function (e) {
    var r = [],
      n = [];
    return P(this.getCartesians(), function (i) {
      var a = e != null && e !== "auto" ? i.getAxis(e) : i.getBaseAxis(),
        o = i.getOtherAxis(a);
      Pt(r, a) < 0 && r.push(a), Pt(n, o) < 0 && n.push(o)
    }), {
      baseAxes: r,
      otherAxes: n
    }
  }, t.create = function (e, r) {
    var n = [];
    return e.eachComponent("grid", function (i, a) {
      var o = new t(i, e, r);
      o.name = "grid_" + a, o.resize(i, r, !0), i.coordinateSystem = o, n.push(o)
    }), e.eachSeries(function (i) {
      if (!!jy(i)) {
        var a = Qy(i),
          o = a.xAxisModel,
          s = a.yAxisModel,
          l = o.getCoordSysModel(),
          u = l.coordinateSystem;
        i.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex)
      }
    }), n
  }, t.dimensions = hh, t
}();

function Vf(t, e) {
  return t.getCoordSysModel() === e
}

function Jy(t, e, r, n) {
  r.getAxesOnZeroOf = function () {
    return a ? [a] : []
  };
  var i = t[e],
    a, o = r.model,
    s = o.get(["axisLine", "onZero"]),
    l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s) return;
  if (l != null) tm(i[l]) && (a = i[l]);
  else
    for (var u in i)
      if (i.hasOwnProperty(u) && tm(i[u]) && !n[f(i[u])]) {
        a = i[u];
        break
      } a && (n[f(a)] = !0);

  function f(c) {
    return c.dim + "_" + c.index
  }
}

function tm(t) {
  return t && t.type !== "category" && t.type !== "time" && Z2(t)
}

function IO(t, e) {
  var r = t.getExtent(),
    n = r[0] + r[1];
  t.toGlobalCoord = t.dim === "x" ? function (i) {
    return i + e
  } : function (i) {
    return n - i + e
  }, t.toLocalCoord = t.dim === "x" ? function (i) {
    return i - e
  } : function (i) {
    return n - i + e
  }
}
var EO = PO,
  sn = Math.PI,
  ii = function () {
    function t(e, r) {
      this.group = new ce, this.opt = r, this.axisModel = e, Dt(r, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function () {
          return !0
        }
      });
      var n = new ce({
        x: r.position[0],
        y: r.position[1],
        rotation: r.rotation
      });
      n.updateTransform(), this._transformGroup = n
    }
    return t.prototype.hasBuilder = function (e) {
      return !!em[e]
    }, t.prototype.add = function (e) {
      em[e](this.opt, this.axisModel, this.group, this._transformGroup)
    }, t.prototype.getGroup = function () {
      return this.group
    }, t.innerTextLayout = function (e, r, n) {
      var i = B_(r - e),
        a, o;
      return Dl(i) ? (o = n > 0 ? "top" : "bottom", a = "center") : Dl(i - sn) ? (o = n > 0 ? "bottom" : "top", a = "center") : (o = "middle", i > 0 && i < sn ? a = n > 0 ? "right" : "left" : a = n > 0 ? "left" : "right"), {
        rotation: i,
        textAlign: a,
        textVerticalAlign: o
      }
    }, t.makeAxisEventDataBase = function (e) {
      var r = {
        componentType: e.mainType,
        componentIndex: e.componentIndex
      };
      return r[e.mainType + "Index"] = e.componentIndex, r
    }, t.isLabelSilent = function (e) {
      var r = e.get("tooltip");
      return e.get("silent") || !(e.get("triggerEvent") || r && r.show)
    }, t
  }(),
  em = {
    axisLine: function (t, e, r, n) {
      var i = e.get(["axisLine", "show"]);
      if (i === "auto" && t.handleAutoShown && (i = t.handleAutoShown("axisLine")), !!i) {
        var a = e.axis.getExtent(),
          o = n.transform,
          s = [a[0], 0],
          l = [a[1], 0];
        o && (Ye(s, s, o), Ye(l, l, o));
        var u = q({
            lineCap: "round"
          }, e.getModel(["axisLine", "lineStyle"]).getLineStyle()),
          f = new ci({
            subPixelOptimize: !0,
            shape: {
              x1: s[0],
              y1: s[1],
              x2: l[0],
              y2: l[1]
            },
            style: u,
            strokeContainThreshold: t.strokeContainThreshold || 5,
            silent: !0,
            z2: 1
          });
        f.anid = "line", r.add(f);
        var c = e.get(["axisLine", "symbol"]);
        if (c != null) {
          var h = e.get(["axisLine", "symbolSize"]);
          nt(c) && (c = [c, c]), (nt(h) || $t(h)) && (h = [h, h]);
          var v = Fw(e.get(["axisLine", "symbolOffset"]) || 0, h),
            d = h[0],
            y = h[1];
          P([{
            rotate: t.rotation + Math.PI / 2,
            offset: v[0],
            r: 0
          }, {
            rotate: t.rotation - Math.PI / 2,
            offset: v[1],
            r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
          }], function (g, p) {
            if (c[p] !== "none" && c[p] != null) {
              var m = ua(c[p], -d / 2, -y / 2, d, y, u.stroke, !0),
                _ = g.r + g.offset;
              m.attr({
                rotation: g.rotate,
                x: s[0] + _ * Math.cos(t.rotation),
                y: s[1] - _ * Math.sin(t.rotation),
                silent: !0,
                z2: 11
              }), r.add(m)
            }
          })
        }
      }
    },
    axisTickLabel: function (t, e, r, n) {
      var i = OO(r, n, e, t),
        a = BO(r, n, e, t);
      if (RO(e, a, i), kO(r, n, e, t.tickDirection), e.get(["axisLabel", "hideOverlap"])) {
        var o = vO(ct(a, function (s) {
          return {
            label: s,
            priority: s.z2,
            defaultAttr: {
              ignore: s.ignore
            }
          }
        }));
        dO(o)
      }
    },
    axisName: function (t, e, r, n) {
      var i = Io(t.axisName, e.get("name"));
      if (!!i) {
        var a = e.get("nameLocation"),
          o = t.nameDirection,
          s = e.getModel("nameTextStyle"),
          l = e.get("nameGap") || 0,
          u = e.axis.getExtent(),
          f = u[0] > u[1] ? -1 : 1,
          c = [a === "start" ? u[0] - f * l : a === "end" ? u[1] + f * l : (u[0] + u[1]) / 2, nm(a) ? t.labelOffset + o * l : 0],
          h, v = e.get("nameRotate");
        v != null && (v = v * sn / 180);
        var d;
        nm(a) ? h = ii.innerTextLayout(t.rotation, v != null ? v : t.rotation, o) : (h = LO(t.rotation, a, v || 0, u), d = t.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(h.rotation)), !isFinite(d) && (d = null)));
        var y = s.getFont(),
          g = e.get("nameTruncate", !0) || {},
          p = g.ellipsis,
          m = Io(t.nameTruncateMaxWidth, g.maxWidth, d),
          _ = new he({
            x: c[0],
            y: c[1],
            rotation: h.rotation,
            silent: ii.isLabelSilent(e),
            style: Sn(s, {
              text: i,
              font: y,
              overflow: "truncate",
              width: m,
              ellipsis: p,
              fill: s.getTextColor() || e.get(["axisLine", "lineStyle", "color"]),
              align: s.get("align") || h.textAlign,
              verticalAlign: s.get("verticalAlign") || h.textVerticalAlign
            }),
            z2: 1
          });
        if (Iv({
            el: _,
            componentModel: e,
            itemName: i
          }), _.__fullText = i, _.anid = "name", e.get("triggerEvent")) {
          var w = ii.makeAxisEventDataBase(e);
          w.targetType = "axisName", w.name = i, Bt(_).eventData = w
        }
        n.add(_), _.updateTransform(), r.add(_), _.decomposeTransform()
      }
    }
  };

function LO(t, e, r, n) {
  var i = B_(r - t),
    a, o, s = n[0] > n[1],
    l = e === "start" && !s || e !== "start" && s;
  return Dl(i - sn / 2) ? (o = l ? "bottom" : "top", a = "center") : Dl(i - sn * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", i < sn * 1.5 && i > sn / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: i,
    textAlign: a,
    textVerticalAlign: o
  }
}

function RO(t, e, r) {
  if (!CS(t.axis)) {
    var n = t.get(["axisLabel", "showMinLabel"]),
      i = t.get(["axisLabel", "showMaxLabel"]);
    e = e || [], r = r || [];
    var a = e[0],
      o = e[1],
      s = e[e.length - 1],
      l = e[e.length - 2],
      u = r[0],
      f = r[1],
      c = r[r.length - 1],
      h = r[r.length - 2];
    n === !1 ? (Oe(a), Oe(u)) : rm(a, o) && (n ? (Oe(o), Oe(f)) : (Oe(a), Oe(u))), i === !1 ? (Oe(s), Oe(c)) : rm(l, s) && (i ? (Oe(l), Oe(h)) : (Oe(s), Oe(c)))
  }
}

function Oe(t) {
  t && (t.ignore = !0)
}

function rm(t, e) {
  var r = t && t.getBoundingRect().clone(),
    n = e && e.getBoundingRect().clone();
  if (!(!r || !n)) {
    var i = lv([]);
    return uv(i, i, -t.rotation), r.applyTransform(ji([], i, t.getLocalTransform())), n.applyTransform(ji([], i, e.getLocalTransform())), r.intersect(n)
  }
}

function nm(t) {
  return t === "middle" || t === "center"
}

function LS(t, e, r, n, i) {
  for (var a = [], o = [], s = [], l = 0; l < t.length; l++) {
    var u = t[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, e && (Ye(o, o, e), Ye(s, s, e));
    var f = new ci({
      subPixelOptimize: !0,
      shape: {
        x1: o[0],
        y1: o[1],
        x2: s[0],
        y2: s[1]
      },
      style: n,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    f.anid = i + "_" + t[l].tickValue, a.push(f)
  }
  return a
}

function OO(t, e, r, n) {
  var i = r.axis,
    a = r.getModel("axisTick"),
    o = a.get("show");
  if (o === "auto" && n.handleAutoShown && (o = n.handleAutoShown("axisTick")), !(!o || i.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = n.tickDirection * a.get("length"), u = i.getTicksCoords(), f = LS(u, e.transform, l, Dt(s.getLineStyle(), {
        stroke: r.get(["axisLine", "lineStyle", "color"])
      }), "ticks"), c = 0; c < f.length; c++) t.add(f[c]);
    return f
  }
}

function kO(t, e, r, n) {
  var i = r.axis,
    a = r.getModel("minorTick");
  if (!(!a.get("show") || i.scale.isBlank())) {
    var o = i.getMinorTicksCoords();
    if (!!o.length)
      for (var s = a.getModel("lineStyle"), l = n * a.get("length"), u = Dt(s.getLineStyle(), Dt(r.getModel("axisTick").getLineStyle(), {
          stroke: r.get(["axisLine", "lineStyle", "color"])
        })), f = 0; f < o.length; f++)
        for (var c = LS(o[f], e.transform, l, u, "minorticks_" + f), h = 0; h < c.length; h++) t.add(c[h])
  }
}

function BO(t, e, r, n) {
  var i = r.axis,
    a = Io(n.axisLabelShow, r.get(["axisLabel", "show"]));
  if (!(!a || i.scale.isBlank())) {
    var o = r.getModel("axisLabel"),
      s = o.get("margin"),
      l = i.getViewLabels(),
      u = (Io(n.labelRotate, o.get("rotate")) || 0) * sn / 180,
      f = ii.innerTextLayout(n.rotation, u, n.labelDirection),
      c = r.getCategories && r.getCategories(!0),
      h = [],
      v = ii.isLabelSilent(r),
      d = r.get("triggerEvent");
    return P(l, function (y, g) {
      var p = i.scale.type === "ordinal" ? i.scale.getRawOrdinalNumber(y.tickValue) : y.tickValue,
        m = y.formattedLabel,
        _ = y.rawLabel,
        w = o;
      if (c && c[p]) {
        var b = c[p];
        st(b) && b.textStyle && (w = new ae(b.textStyle, o, r.ecModel))
      }
      var S = w.getTextColor() || r.get(["axisLine", "lineStyle", "color"]),
        x = i.dataToCoord(p),
        T = new he({
          x,
          y: n.labelOffset + n.labelDirection * s,
          rotation: f.rotation,
          silent: v,
          z2: 10 + (y.level || 0),
          style: Sn(w, {
            text: m,
            align: w.getShallow("align", !0) || f.textAlign,
            verticalAlign: w.getShallow("verticalAlign", !0) || w.getShallow("baseline", !0) || f.textVerticalAlign,
            fill: dt(S) ? S(i.type === "category" ? _ : i.type === "value" ? p + "" : p, g) : S
          })
        });
      if (T.anid = "label_" + p, d) {
        var M = ii.makeAxisEventDataBase(r);
        M.targetType = "axisLabel", M.value = _, M.tickIndex = g, i.type === "category" && (M.dataIndex = p), Bt(T).eventData = M
      }
      e.add(T), T.updateTransform(), h.push(T), t.add(T), T.decomposeTransform()
    }), h
  }
}
var RS = ii;

function NO(t, e) {
  var r = {
    axesInfo: {},
    seriesInvolved: !1,
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  return FO(r, t, e), r.seriesInvolved && HO(r, t), r
}

function FO(t, e, r) {
  var n = e.getComponent("tooltip"),
    i = e.getComponent("axisPointer"),
    a = i.get("link", !0) || [],
    o = [];
  P(r.getCoordinateSystems(), function (s) {
    if (!s.axisPointerEnabled) return;
    var l = Yo(s.model),
      u = t.coordSysAxesInfo[l] = {};
    t.coordSysMap[l] = s;
    var f = s.model,
      c = f.getModel("tooltip", n);
    if (P(s.getAxes(), jt(y, !1, null)), s.getTooltipAxes && n && c.get("show")) {
      var h = c.get("trigger") === "axis",
        v = c.get(["axisPointer", "type"]) === "cross",
        d = s.getTooltipAxes(c.get(["axisPointer", "axis"]));
      (h || v) && P(d.baseAxes, jt(y, v ? "cross" : !0, h)), v && P(d.otherAxes, jt(y, "cross", !1))
    }

    function y(g, p, m) {
      var _ = m.model.getModel("axisPointer", i),
        w = _.get("show");
      if (!(!w || w === "auto" && !g && !dh(_))) {
        p == null && (p = _.get("triggerTooltip")), _ = g ? zO(m, c, i, e, g, p) : _;
        var b = _.get("snap"),
          S = Yo(m.model),
          x = p || b || m.type === "category",
          T = t.axesInfo[S] = {
            key: S,
            axis: m,
            coordSys: s,
            axisPointerModel: _,
            triggerTooltip: p,
            involveSeries: x,
            snap: b,
            useHandle: dh(_),
            seriesModels: [],
            linkGroup: null
          };
        u[S] = T, t.seriesInvolved = t.seriesInvolved || x;
        var M = VO(a, m);
        if (M != null) {
          var D = o[M] || (o[M] = {
            axesInfo: {}
          });
          D.axesInfo[S] = T, D.mapper = a[M].mapper, T.linkGroup = D
        }
      }
    }
  })
}

function zO(t, e, r, n, i, a) {
  var o = e.getModel("axisPointer"),
    s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"],
    l = {};
  P(s, function (h) {
    l[h] = St(o.get(h))
  }), l.snap = t.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), i === "cross") {
    var f = o.get(["label", "show"]);
    if (u.show = f != null ? f : !0, !a) {
      var c = l.lineStyle = o.get("crossStyle");
      c && Dt(u, c.textStyle)
    }
  }
  return t.model.getModel("axisPointer", new ae(l, r, n))
}

function HO(t, e) {
  e.eachSeries(function (r) {
    var n = r.coordinateSystem,
      i = r.get(["tooltip", "trigger"], !0),
      a = r.get(["tooltip", "show"], !0);
    !n || i === "none" || i === !1 || i === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || P(t.coordSysAxesInfo[Yo(n.model)], function (o) {
      var s = o.axis;
      n.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count())
    })
  })
}

function VO(t, e) {
  for (var r = e.model, n = e.dim, i = 0; i < t.length; i++) {
    var a = t[i] || {};
    if ($f(a[n + "AxisId"], r.id) || $f(a[n + "AxisIndex"], r.componentIndex) || $f(a[n + "AxisName"], r.name)) return i
  }
}

function $f(t, e) {
  return t === "all" || et(t) && Pt(t, e) >= 0 || t === e
}

function $O(t) {
  var e = nd(t);
  if (!!e) {
    var r = e.axisPointerModel,
      n = e.axis.scale,
      i = r.option,
      a = r.get("status"),
      o = r.get("value");
    o != null && (o = n.parse(o));
    var s = dh(r);
    a == null && (i.status = s ? "show" : "hide");
    var l = n.getExtent().slice();
    l[0] > l[1] && l.reverse(), (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), i.value = o, s && (i.status = e.axis.scale.isBlank() ? "hide" : "show")
  }
}

function nd(t) {
  var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return e && e.axesInfo[Yo(t)]
}

function GO(t) {
  var e = nd(t);
  return e && e.axisPointerModel
}

function dh(t) {
  return !!t.get(["handle", "show"])
}

function Yo(t) {
  return t.type + "||" + t.id
}
var im = {},
  WO = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r
    }
    return e.prototype.render = function (r, n, i, a) {
      this.axisPointerClass && $O(r), t.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, i, !0)
    }, e.prototype.updateAxisPointer = function (r, n, i, a) {
      this._doUpdateAxisPointerClass(r, i, !1)
    }, e.prototype.remove = function (r, n) {
      var i = this._axisPointer;
      i && i.remove(n)
    }, e.prototype.dispose = function (r, n) {
      this._disposeAxisPointer(n), t.prototype.dispose.apply(this, arguments)
    }, e.prototype._doUpdateAxisPointerClass = function (r, n, i) {
      var a = e.getAxisPointerClass(this.axisPointerClass);
      if (!!a) {
        var o = GO(r);
        o ? (this._axisPointer || (this._axisPointer = new a)).render(r, o, n, i) : this._disposeAxisPointer(n)
      }
    }, e.prototype._disposeAxisPointer = function (r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null
    }, e.registerAxisPointerClass = function (r, n) {
      im[r] = n
    }, e.getAxisPointerClass = function (r) {
      return r && im[r]
    }, e.type = "axis", e
  }(Br),
  OS = WO,
  ph = Kt();

function UO(t, e, r, n) {
  var i = r.axis;
  if (!i.scale.isBlank()) {
    var a = r.getModel("splitArea"),
      o = a.getModel("areaStyle"),
      s = o.get("color"),
      l = n.coordinateSystem.getRect(),
      u = i.getTicksCoords({
        tickModel: a,
        clamp: !0
      });
    if (!!u.length) {
      var f = s.length,
        c = ph(t).splitAreaColors,
        h = gt(),
        v = 0;
      if (c)
        for (var d = 0; d < u.length; d++) {
          var y = c.get(u[d].tickValue);
          if (y != null) {
            v = (y + (f - 1) * d) % f;
            break
          }
        }
      var g = i.toGlobalCoord(u[0].coord),
        p = o.getAreaStyle();
      s = et(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var m = i.toGlobalCoord(u[d].coord),
          _ = void 0,
          w = void 0,
          b = void 0,
          S = void 0;
        i.isHorizontal() ? (_ = g, w = l.y, b = m - _, S = l.height, g = _ + b) : (_ = l.x, w = g, b = l.width, S = m - w, g = w + S);
        var x = u[d - 1].tickValue;
        x != null && h.set(x, v), e.add(new Qt({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: w,
            width: b,
            height: S
          },
          style: Dt({
            fill: s[v]
          }, p),
          autoBatch: !0,
          silent: !0
        })), v = (v + 1) % f
      }
      ph(t).splitAreaColors = h
    }
  }
}

function YO(t) {
  ph(t).splitAreaColors = null
}
var XO = ["axisLine", "axisTickLabel", "axisName"],
  qO = ["splitArea", "splitLine", "minorSplitLine"],
  kS = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.axisPointerClass = "CartesianAxisPointer", r
    }
    return e.prototype.render = function (r, n, i, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new ce, this.group.add(this._axisGroup), !!r.get("show")) {
        var s = r.getCoordSysModel(),
          l = vh(s, r),
          u = new RS(r, q({
            handleAutoShown: function (c) {
              for (var h = s.coordinateSystem.getCartesians(), v = 0; v < h.length; v++)
                if (fh(h[v].getOtherAxis(r.axis).scale)) return !0;
              return !1
            }
          }, l));
        P(XO, u.add, u), this._axisGroup.add(u.getGroup()), P(qO, function (c) {
          r.get([c, "show"]) && KO[c](this, this._axisGroup, r, s)
        }, this);
        var f = a && a.type === "changeAxisOrder" && a.isInitSort;
        f || N1(o, this._axisGroup, r), t.prototype.render.call(this, r, n, i, a)
      }
    }, e.prototype.remove = function () {
      YO(this)
    }, e.type = "cartesianAxis", e
  }(OS),
  KO = {
    splitLine: function (t, e, r, n) {
      var i = r.axis;
      if (!i.scale.isBlank()) {
        var a = r.getModel("splitLine"),
          o = a.getModel("lineStyle"),
          s = o.get("color");
        s = et(s) ? s : [s];
        for (var l = n.coordinateSystem.getRect(), u = i.isHorizontal(), f = 0, c = i.getTicksCoords({
            tickModel: a
          }), h = [], v = [], d = o.getLineStyle(), y = 0; y < c.length; y++) {
          var g = i.toGlobalCoord(c[y].coord);
          u ? (h[0] = g, h[1] = l.y, v[0] = g, v[1] = l.y + l.height) : (h[0] = l.x, h[1] = g, v[0] = l.x + l.width, v[1] = g);
          var p = f++ % s.length,
            m = c[y].tickValue;
          e.add(new ci({
            anid: m != null ? "line_" + c[y].tickValue : null,
            subPixelOptimize: !0,
            autoBatch: !0,
            shape: {
              x1: h[0],
              y1: h[1],
              x2: v[0],
              y2: v[1]
            },
            style: Dt({
              stroke: s[p]
            }, d),
            silent: !0
          }))
        }
      }
    },
    minorSplitLine: function (t, e, r, n) {
      var i = r.axis,
        a = r.getModel("minorSplitLine"),
        o = a.getModel("lineStyle"),
        s = n.coordinateSystem.getRect(),
        l = i.isHorizontal(),
        u = i.getMinorTicksCoords();
      if (!!u.length)
        for (var f = [], c = [], h = o.getLineStyle(), v = 0; v < u.length; v++)
          for (var d = 0; d < u[v].length; d++) {
            var y = i.toGlobalCoord(u[v][d].coord);
            l ? (f[0] = y, f[1] = s.y, c[0] = y, c[1] = s.y + s.height) : (f[0] = s.x, f[1] = y, c[0] = s.x + s.width, c[1] = y), e.add(new ci({
              anid: "minor_line_" + u[v][d].tickValue,
              subPixelOptimize: !0,
              autoBatch: !0,
              shape: {
                x1: f[0],
                y1: f[1],
                x2: c[0],
                y2: c[1]
              },
              style: h,
              silent: !0
            }))
          }
    },
    splitArea: function (t, e, r, n) {
      UO(t, e, r, n)
    }
  },
  BS = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r
    }
    return e.type = "xAxis", e
  }(kS),
  ZO = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = BS.type, r
    }
    return e.type = "yAxis", e
  }(kS),
  jO = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = "grid", r
    }
    return e.prototype.render = function (r, n) {
      this.group.removeAll(), r.get("show") && this.group.add(new Qt({
        shape: r.coordinateSystem.getRect(),
        style: Dt({
          fill: r.get("backgroundColor")
        }, r.getItemStyle()),
        silent: !0,
        z2: -1
      }))
    }, e.type = "grid", e
  }(Br),
  am = {
    offset: 0
  };

function QO(t) {
  t.registerComponentView(jO), t.registerComponentModel(gO), t.registerCoordinateSystem("cartesian2d", EO), qy(t, "x", ch, am), qy(t, "y", ch, am), t.registerComponentView(BS), t.registerComponentView(ZO), t.registerPreprocessor(function (e) {
    e.xAxis && e.yAxis && !e.grid && (e.grid = {})
  })
}
var jn = Kt(),
  om = St,
  Gf = Ht,
  JO = function () {
    function t() {
      this._dragging = !1, this.animationThreshold = 15
    }
    return t.prototype.render = function (e, r, n, i) {
      var a = r.get("value"),
        o = r.get("status");
      if (this._axisModel = e, this._axisPointerModel = r, this._api = n, !(!i && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group,
          l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, e, r, n);
        var f = u.graphicKey;
        f !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = f;
        var c = this._moveAnimation = this.determineAnimation(e, r);
        if (!s) s = this._group = new ce, this.createPointerEl(s, u, e, r), this.createLabelEl(s, u, e, r), n.getZr().add(s);
        else {
          var h = jt(sm, r, c);
          this.updatePointerEl(s, u, h), this.updateLabelEl(s, u, h, r)
        }
        um(s, r, !0), this._renderHandle(a)
      }
    }, t.prototype.remove = function (e) {
      this.clear(e)
    }, t.prototype.dispose = function (e) {
      this.clear(e)
    }, t.prototype.determineAnimation = function (e, r) {
      var n = r.get("animation"),
        i = e.axis,
        a = i.type === "category",
        o = r.get("snap");
      if (!o && !a) return !1;
      if (n === "auto" || n == null) {
        var s = this.animationThreshold;
        if (a && i.getBandWidth() > s) return !0;
        if (o) {
          var l = nd(e).seriesDataCount,
            u = i.getExtent();
          return Math.abs(u[0] - u[1]) / l > s
        }
        return !1
      }
      return n === !0
    }, t.prototype.makeElOption = function (e, r, n, i, a) {}, t.prototype.createPointerEl = function (e, r, n, i) {
      var a = r.pointer;
      if (a) {
        var o = jn(e).pointerEl = new gI[a.type](om(r.pointer));
        e.add(o)
      }
    }, t.prototype.createLabelEl = function (e, r, n, i) {
      if (r.label) {
        var a = jn(e).labelEl = new he(om(r.label));
        e.add(a), lm(a, i)
      }
    }, t.prototype.updatePointerEl = function (e, r, n) {
      var i = jn(e).pointerEl;
      i && r.pointer && (i.setStyle(r.pointer.style), n(i, {
        shape: r.pointer.shape
      }))
    }, t.prototype.updateLabelEl = function (e, r, n, i) {
      var a = jn(e).labelEl;
      a && (a.setStyle(r.label.style), n(a, {
        x: r.label.x,
        y: r.label.y
      }), lm(a, i))
    }, t.prototype._renderHandle = function (e) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel,
          n = this._api.getZr(),
          i = this._handle,
          a = r.getModel("handle"),
          o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          i && n.remove(i), this._handle = null;
          return
        }
        var s;
        this._handle || (s = !0, i = this._handle = Pv(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function (u) {
            v_(u.event)
          },
          onmousedown: Gf(this._onHandleDragMove, this, 0, 0),
          drift: Gf(this._onHandleDragMove, this),
          ondragend: Gf(this._onHandleDragEnd, this)
        }), n.add(i)), um(i, r, !1), i.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        et(l) || (l = [l, l]), i.scaleX = l[0] / 2, i.scaleY = l[1] / 2, Iw(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(e, s)
      }
    }, t.prototype._moveHandleToValue = function (e, r) {
      sm(this._axisPointerModel, !r && this._moveAnimation, this._handle, Wf(this.getHandleTransform(e, this._axisModel, this._axisPointerModel)))
    }, t.prototype._onHandleDragMove = function (e, r) {
      var n = this._handle;
      if (!!n) {
        this._dragging = !0;
        var i = this.updateHandleTransform(Wf(n), [e, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = i, n.stopAnimation(), n.attr(Wf(i)), jn(n).lastProp = null, this._doDispatchAxisPointer()
      }
    }, t.prototype._doDispatchAxisPointer = function () {
      var e = this._handle;
      if (!!e) {
        var r = this._payloadInfo,
          n = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: r.cursorPoint[0],
          y: r.cursorPoint[1],
          tooltipOption: r.tooltipOption,
          axesInfo: [{
            axisDim: n.axis.dim,
            axisIndex: n.componentIndex
          }]
        })
      }
    }, t.prototype._onHandleDragEnd = function () {
      this._dragging = !1;
      var e = this._handle;
      if (!!e) {
        var r = this._axisPointerModel.get("value");
        this._moveHandleToValue(r), this._api.dispatchAction({
          type: "hideTip"
        })
      }
    }, t.prototype.clear = function (e) {
      this._lastValue = null, this._lastStatus = null;
      var r = e.getZr(),
        n = this._group,
        i = this._handle;
      r && n && (this._lastGraphicKey = null, n && r.remove(n), i && r.remove(i), this._group = null, this._handle = null, this._payloadInfo = null), eh(this, "_doDispatchAxisPointer")
    }, t.prototype.doClear = function () {}, t.prototype.buildLabel = function (e, r, n) {
      return n = n || 0, {
        x: e[n],
        y: e[1 - n],
        width: r[n],
        height: r[1 - n]
      }
    }, t
  }();

function sm(t, e, r, n) {
  NS(jn(r).lastProp, n) || (jn(r).lastProp = n, e ? wn(r, n, t) : (r.stopAnimation(), r.attr(n)))
}

function NS(t, e) {
  if (st(t) && st(e)) {
    var r = !0;
    return P(e, function (n, i) {
      r = r && NS(t[i], n)
    }), !!r
  } else return t === e
}

function lm(t, e) {
  t[e.get(["label", "show"]) ? "show" : "hide"]()
}

function Wf(t) {
  return {
    x: t.x || 0,
    y: t.y || 0,
    rotation: t.rotation || 0
  }
}

function um(t, e, r) {
  var n = e.get("z"),
    i = e.get("zlevel");
  t && t.traverse(function (a) {
    a.type !== "group" && (n != null && (a.z = n), i != null && (a.zlevel = i), a.silent = r)
  })
}
var tk = JO;

function ek(t) {
  var e = t.get("type"),
    r = t.getModel(e + "Style"),
    n;
  return e === "line" ? (n = r.getLineStyle(), n.fill = null) : e === "shadow" && (n = r.getAreaStyle(), n.stroke = null), n
}

function rk(t, e, r, n, i) {
  var a = r.get("value"),
    o = FS(a, e.axis, e.ecModel, r.get("seriesDataIndices"), {
      precision: r.get(["label", "precision"]),
      formatter: r.get(["label", "formatter"])
    }),
    s = r.getModel("label"),
    l = yu(s.get("padding") || 0),
    u = s.getFont(),
    f = hv(o, u),
    c = i.position,
    h = f.width + l[1] + l[3],
    v = f.height + l[0] + l[2],
    d = i.align;
  d === "right" && (c[0] -= h), d === "center" && (c[0] -= h / 2);
  var y = i.verticalAlign;
  y === "bottom" && (c[1] -= v), y === "middle" && (c[1] -= v / 2), nk(c, h, v, n);
  var g = s.get("backgroundColor");
  (!g || g === "auto") && (g = e.get(["axisLine", "lineStyle", "color"])), t.label = {
    x: c[0],
    y: c[1],
    style: Sn(s, {
      text: o,
      font: u,
      fill: s.getTextColor(),
      padding: l,
      backgroundColor: g
    }),
    z2: 10
  }
}

function nk(t, e, r, n) {
  var i = n.getWidth(),
    a = n.getHeight();
  t[0] = Math.min(t[0] + e, i) - e, t[1] = Math.min(t[1] + r, a) - r, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1], 0)
}

function FS(t, e, r, n, i) {
  t = e.scale.parse(t);
  var a = e.scale.getLabel({
      value: t
    }, {
      precision: i.precision
    }),
    o = i.formatter;
  if (o) {
    var s = {
      value: td(e, {
        value: t
      }),
      axisDimension: e.dim,
      axisIndex: e.index,
      seriesData: []
    };
    P(n, function (l) {
      var u = r.getSeriesByIndex(l.seriesIndex),
        f = l.dataIndexInside,
        c = u && u.getDataParams(f);
      c && s.seriesData.push(c)
    }), nt(o) ? a = o.replace("{value}", a) : dt(o) && (a = o(s))
  }
  return a
}

function zS(t, e, r) {
  var n = Eo();
  return uv(n, n, r.rotation), Bc(n, n, r.position), Av([t.dataToCoord(e), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], n)
}

function ik(t, e, r, n, i, a) {
  var o = RS.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = i.get(["label", "margin"]), rk(e, n, i, a, {
    position: zS(n.axis, t, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  })
}

function ak(t, e, r) {
  return r = r || 0, {
    x1: t[r],
    y1: t[1 - r],
    x2: e[r],
    y2: e[1 - r]
  }
}

function ok(t, e, r) {
  return r = r || 0, {
    x: t[r],
    y: t[1 - r],
    width: e[r],
    height: e[1 - r]
  }
}
var sk = function (t) {
  J(e, t);

  function e() {
    return t !== null && t.apply(this, arguments) || this
  }
  return e.prototype.makeElOption = function (r, n, i, a, o) {
    var s = i.axis,
      l = s.grid,
      u = a.get("type"),
      f = fm(l, s).getOtherAxis(s).getGlobalExtent(),
      c = s.toGlobalCoord(s.dataToCoord(n, !0));
    if (u && u !== "none") {
      var h = ek(a),
        v = lk[u](s, c, f);
      v.style = h, r.graphicKey = v.type, r.pointer = v
    }
    var d = vh(l.model, i);
    ik(n, r, d, i, a, o)
  }, e.prototype.getHandleTransform = function (r, n, i) {
    var a = vh(n.axis.grid.model, n, {
      labelInside: !1
    });
    a.labelMargin = i.get(["handle", "margin"]);
    var o = zS(n.axis, r, a);
    return {
      x: o[0],
      y: o[1],
      rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
    }
  }, e.prototype.updateHandleTransform = function (r, n, i, a) {
    var o = i.axis,
      s = o.grid,
      l = o.getGlobalExtent(!0),
      u = fm(s, o).getOtherAxis(o).getGlobalExtent(),
      f = o.dim === "x" ? 0 : 1,
      c = [r.x, r.y];
    c[f] += n[f], c[f] = Math.min(l[1], c[f]), c[f] = Math.max(l[0], c[f]);
    var h = (u[1] + u[0]) / 2,
      v = [h, h];
    v[f] = c[f];
    var d = [{
      verticalAlign: "middle"
    }, {
      align: "center"
    }];
    return {
      x: c[0],
      y: c[1],
      rotation: r.rotation,
      cursorPoint: v,
      tooltipOption: d[f]
    }
  }, e
}(tk);

function fm(t, e) {
  var r = {};
  return r[e.dim + "AxisIndex"] = e.index, t.getCartesian(r)
}
var lk = {
  line: function (t, e, r) {
    var n = ak([e, r[0]], [e, r[1]], cm(t));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: n
    }
  },
  shadow: function (t, e, r) {
    var n = Math.max(1, t.getBandWidth()),
      i = r[1] - r[0];
    return {
      type: "Rect",
      shape: ok([e - n / 2, r[0]], [n, i], cm(t))
    }
  }
};

function cm(t) {
  return t.dim === "x" ? 0 : 1
}
var uk = sk,
  fk = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r
    }
    return e.type = "axisPointer", e.defaultOption = {
      show: "auto",
      z: 50,
      type: "line",
      snap: !1,
      triggerTooltip: !0,
      value: null,
      status: null,
      link: [],
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: "#B9BEC9",
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: "rgba(210,219,238,0.2)"
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: "#fff",
        padding: [5, 7, 5, 7],
        backgroundColor: "auto",
        borderColor: null,
        borderWidth: 0,
        borderRadius: 3
      },
      handle: {
        show: !1,
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        margin: 50,
        color: "#333",
        shadowBlur: 3,
        shadowColor: "#aaa",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        throttle: 40
      }
    }, e
  }(zt),
  ck = fk,
  Pr = Kt(),
  hk = P;

function HS(t, e, r) {
  if (!mt.node) {
    var n = e.getZr();
    Pr(n).records || (Pr(n).records = {}), vk(n, e);
    var i = Pr(n).records[t] || (Pr(n).records[t] = {});
    i.handler = r
  }
}

function vk(t, e) {
  if (Pr(t).initialized) return;
  Pr(t).initialized = !0, r("click", jt(hm, "click")), r("mousemove", jt(hm, "mousemove")), r("globalout", pk);

  function r(n, i) {
    t.on(n, function (a) {
      var o = gk(e);
      hk(Pr(t).records, function (s) {
        s && i(s, a, o.dispatchAction)
      }), dk(o.pendings, e)
    })
  }
}

function dk(t, e) {
  var r = t.showTip.length,
    n = t.hideTip.length,
    i;
  r ? i = t.showTip[r - 1] : n && (i = t.hideTip[n - 1]), i && (i.dispatchAction = null, e.dispatchAction(i))
}

function pk(t, e, r) {
  t.handler("leave", null, r)
}

function hm(t, e, r, n) {
  e.handler(t, r, n)
}

function gk(t) {
  var e = {
      showTip: [],
      hideTip: []
    },
    r = function (n) {
      var i = e[n.type];
      i ? i.push(n) : (n.dispatchAction = r, t.dispatchAction(n))
    };
  return {
    dispatchAction: r,
    pendings: e
  }
}

function gh(t, e) {
  if (!mt.node) {
    var r = e.getZr(),
      n = (Pr(r).records || {})[t];
    n && (Pr(r).records[t] = null)
  }
}
var yk = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r
    }
    return e.prototype.render = function (r, n, i) {
      var a = n.getComponent("tooltip"),
        o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      HS("axisPointer", i, function (s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        })
      })
    }, e.prototype.remove = function (r, n) {
      gh("axisPointer", n)
    }, e.prototype.dispose = function (r, n) {
      gh("axisPointer", n)
    }, e.type = "axisPointer", e
  }(Br),
  mk = yk;

function VS(t, e) {
  var r = [],
    n = t.seriesIndex,
    i;
  if (n == null || !(i = e.getSeriesByIndex(n))) return {
    point: []
  };
  var a = i.getData(),
    o = ui(a, t);
  if (o == null || o < 0 || et(o)) return {
    point: []
  };
  var s = a.getItemGraphicEl(o),
    l = i.coordinateSystem;
  if (i.getTooltipPosition) r = i.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (t.isStacked) {
      var u = l.getBaseAxis(),
        f = l.getOtherAxis(u),
        c = f.dim,
        h = u.dim,
        v = c === "x" || c === "radius" ? 1 : 0,
        d = a.mapDimension(h),
        y = [];
      y[v] = a.get(d, o), y[1 - v] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(y) || []
    } else r = l.dataToPoint(a.getValues(ct(l.dimensions, function (p) {
      return a.mapDimension(p)
    }), o)) || [];
  else if (s) {
    var g = s.getBoundingRect().clone();
    g.applyTransform(s.transform), r = [g.x + g.width / 2, g.y + g.height / 2]
  }
  return {
    point: r,
    el: s
  }
}
var vm = Kt();

function _k(t, e, r) {
  var n = t.currTrigger,
    i = [t.x, t.y],
    a = t,
    o = t.dispatchAction || Ht(r.dispatchAction, r),
    s = e.getComponent("axisPointer").coordSysAxesInfo;
  if (!!s) {
    fl(i) && (i = VS({
      seriesIndex: a.seriesIndex,
      dataIndex: a.dataIndex
    }, e).point);
    var l = fl(i),
      u = a.axesInfo,
      f = s.axesInfo,
      c = n === "leave" || fl(i),
      h = {},
      v = {},
      d = {
        list: [],
        map: {}
      },
      y = {
        showPointer: jt(Sk, v),
        showTooltip: jt(bk, d)
      };
    P(s.coordSysMap, function (p, m) {
      var _ = l || p.containPoint(i);
      P(s.coordSysAxesInfo[m], function (w, b) {
        var S = w.axis,
          x = Mk(u, w);
        if (!c && _ && (!u || x)) {
          var T = x && x.value;
          T == null && !l && (T = S.pointToData(i)), T != null && dm(w, T, y, !1, h)
        }
      })
    });
    var g = {};
    return P(f, function (p, m) {
      var _ = p.linkGroup;
      _ && !v[m] && P(_.axesInfo, function (w, b) {
        var S = v[b];
        if (w !== p && S) {
          var x = S.value;
          _.mapper && (x = p.axis.scale.parse(_.mapper(x, pm(w), pm(p)))), g[p.key] = x
        }
      })
    }), P(g, function (p, m) {
      dm(f[m], p, y, !0, h)
    }), xk(v, f, h), Ck(d, i, t, o), Tk(f, o, r), h
  }
}

function dm(t, e, r, n, i) {
  var a = t.axis;
  if (!(a.scale.isBlank() || !a.containData(e))) {
    if (!t.involveSeries) {
      r.showPointer(t, e);
      return
    }
    var o = wk(e, t),
      s = o.payloadBatch,
      l = o.snapToValue;
    s[0] && i.seriesIndex == null && q(i, s[0]), !n && t.snap && a.containData(l) && l != null && (e = l), r.showPointer(t, e, s), r.showTooltip(t, o, l)
  }
}

function wk(t, e) {
  var r = e.axis,
    n = r.dim,
    i = t,
    a = [],
    o = Number.MAX_VALUE,
    s = -1;
  return P(e.seriesModels, function (l, u) {
    var f = l.getData().mapDimensionsAll(n),
      c, h;
    if (l.getAxisTooltipData) {
      var v = l.getAxisTooltipData(f, t, r);
      h = v.dataIndices, c = v.nestestValue
    } else {
      if (h = l.getData().indicesOfNearest(f[0], t, r.type === "category" ? .5 : null), !h.length) return;
      c = l.getData().get(f[0], h[0])
    }
    if (!(c == null || !isFinite(c))) {
      var d = t - c,
        y = Math.abs(d);
      y <= o && ((y < o || d >= 0 && s < 0) && (o = y, s = d, i = c, a.length = 0), P(h, function (g) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: g,
          dataIndex: l.getData().getRawIndex(g)
        })
      }))
    }
  }), {
    payloadBatch: a,
    snapToValue: i
  }
}

function Sk(t, e, r, n) {
  t[e.key] = {
    value: r,
    payloadBatch: n
  }
}

function bk(t, e, r, n) {
  var i = r.payloadBatch,
    a = e.axis,
    o = a.model,
    s = e.axisPointerModel;
  if (!(!e.triggerTooltip || !i.length)) {
    var l = e.coordSys.model,
      u = Yo(l),
      f = t.map[u];
    f || (f = t.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, t.list.push(f)), f.dataByAxis.push({
      axisDim: a.dim,
      axisIndex: o.componentIndex,
      axisType: o.type,
      axisId: o.id,
      value: n,
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: i.slice()
    })
  }
}

function xk(t, e, r) {
  var n = r.axesInfo = [];
  P(e, function (i, a) {
    var o = i.axisPointerModel.option,
      s = t[a];
    s ? (!i.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !i.useHandle && (o.status = "hide"), o.status === "show" && n.push({
      axisDim: i.axis.dim,
      axisIndex: i.axis.model.componentIndex,
      value: o.value
    })
  })
}

function Ck(t, e, r, n) {
  if (fl(e) || !t.list.length) {
    n({
      type: "hideTip"
    });
    return
  }
  var i = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  n({
    type: "showTip",
    escapeConnect: !0,
    x: e[0],
    y: e[1],
    tooltipOption: r.tooltipOption,
    position: r.position,
    dataIndexInside: i.dataIndexInside,
    dataIndex: i.dataIndex,
    seriesIndex: i.seriesIndex,
    dataByCoordSys: t.list
  })
}

function Tk(t, e, r) {
  var n = r.getZr(),
    i = "axisPointerLastHighlights",
    a = vm(n)[i] || {},
    o = vm(n)[i] = {};
  P(t, function (u, f) {
    var c = u.axisPointerModel.option;
    c.status === "show" && P(c.seriesDataIndices, function (h) {
      var v = h.seriesIndex + " | " + h.dataIndex;
      o[v] = h
    })
  });
  var s = [],
    l = [];
  P(a, function (u, f) {
    !o[f] && l.push(u)
  }), P(o, function (u, f) {
    !a[f] && s.push(u)
  }), l.length && r.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    notBlur: !0,
    batch: l
  }), s.length && r.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    notBlur: !0,
    batch: s
  })
}

function Mk(t, e) {
  for (var r = 0; r < (t || []).length; r++) {
    var n = t[r];
    if (e.axis.dim === n.axisDim && e.axis.model.componentIndex === n.axisIndex) return n
  }
}

function pm(t) {
  var e = t.axis.model,
    r = {},
    n = r.axisDim = t.axis.dim;
  return r.axisIndex = r[n + "AxisIndex"] = e.componentIndex, r.axisName = r[n + "AxisName"] = e.name, r.axisId = r[n + "AxisId"] = e.id, r
}

function fl(t) {
  return !t || t[0] == null || isNaN(t[0]) || t[1] == null || isNaN(t[1])
}

function $S(t) {
  OS.registerAxisPointerClass("CartesianAxisPointer", uk), t.registerComponentModel(ck), t.registerComponentView(mk), t.registerPreprocessor(function (e) {
    if (e) {
      (!e.axisPointer || e.axisPointer.length === 0) && (e.axisPointer = {});
      var r = e.axisPointer.link;
      r && !et(r) && (e.axisPointer.link = [r])
    }
  }), t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, function (e, r) {
    e.getComponent("axisPointer").coordSysAxesInfo = NO(e, r)
  }), t.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, _k)
}

function SN(t) {
  vi(QO), vi($S)
}

function Dk(t, e) {
  var r = yu(e.get("padding")),
    n = e.getItemStyle(["color", "opacity"]);
  return n.fill = e.get("backgroundColor"), t = new Qt({
    shape: {
      x: t.x - r[3],
      y: t.y - r[0],
      width: t.width + r[1] + r[3],
      height: t.height + r[0] + r[2],
      r: e.get("borderRadius")
    },
    style: n,
    silent: !0,
    z2: -1
  }), t
}
var Ak = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r
    }
    return e.type = "tooltip", e.dependencies = ["axisPointer"], e.defaultOption = {
      z: 60,
      show: !0,
      showContent: !0,
      trigger: "item",
      triggerOn: "mousemove|click",
      alwaysShowContent: !1,
      displayMode: "single",
      renderMode: "auto",
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      transitionDuration: .4,
      enterable: !1,
      backgroundColor: "#fff",
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      borderRadius: 4,
      borderWidth: 1,
      padding: null,
      extraCssText: "",
      axisPointer: {
        type: "line",
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: "#999",
          width: 1,
          type: "dashed",
          textStyle: {}
        }
      },
      textStyle: {
        color: "#666",
        fontSize: 14
      }
    }, e
  }(zt),
  Pk = Ak;

function GS(t) {
  var e = t.get("confine");
  return e != null ? !!e : t.get("renderMode") === "richText"
}

function WS(t) {
  if (!!mt.domSupported) {
    for (var e = document.documentElement.style, r = 0, n = t.length; r < n; r++)
      if (t[r] in e) return t[r]
  }
}
var US = WS(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]),
  Ik = WS(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);

function YS(t, e) {
  if (!t) return e;
  e = J1(e, !0);
  var r = t.indexOf(e);
  return t = r === -1 ? e : "-" + t.slice(0, r) + "-" + e, t.toLowerCase()
}

function Ek(t, e) {
  var r = t.currentStyle || document.defaultView && document.defaultView.getComputedStyle(t);
  return r ? e ? r[e] : r : null
}
var Lk = YS(Ik, "transition"),
  id = YS(US, "transform"),
  Rk = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (mt.transform3dSupported ? "will-change:transform;" : "");

function Ok(t) {
  return t = t === "left" ? "right" : t === "right" ? "left" : t === "top" ? "bottom" : "top", t
}

function kk(t, e, r) {
  if (!nt(r) || r === "inside") return "";
  var n = t.get("backgroundColor"),
    i = t.get("borderWidth");
  e = hi(e);
  var a = Ok(r),
    o = Math.max(Math.round(i) * 1.5, 6),
    s = "",
    l = id + ":",
    u;
  Pt(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var f = u * Math.PI / 180,
    c = o + i,
    h = c * Math.abs(Math.cos(f)) + c * Math.abs(Math.sin(f)),
    v = Math.round(((h - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (h - c) / 2) * 100) / 100;
  s += ";" + a + ":-" + v + "px";
  var d = e + " solid " + i + "px;",
    y = ["position:absolute;width:" + o + "px;height:" + o + "px;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + n + ";"];
  return '<div style="' + y.join("") + '"></div>'
}

function Bk(t, e) {
  var r = "cubic-bezier(0.23,1,0.32,1)",
    n = " " + t / 2 + "s " + r,
    i = "opacity" + n + ",visibility" + n;
  return e || (n = " " + t + "s " + r, i += mt.transformSupported ? "," + id + n : ",left" + n + ",top" + n), Lk + ":" + i
}

function gm(t, e, r) {
  var n = t.toFixed(0) + "px",
    i = e.toFixed(0) + "px";
  if (!mt.transformSupported) return r ? "top:" + i + ";left:" + n + ";" : [
    ["top", i],
    ["left", n]
  ];
  var a = mt.transform3dSupported,
    o = "translate" + (a ? "3d" : "") + "(" + n + "," + i + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + id + ":" + o + ";" : [
    ["top", 0],
    ["left", 0],
    [US, o]
  ]
}

function Nk(t) {
  var e = [],
    r = t.get("fontSize"),
    n = t.getTextColor();
  n && e.push("color:" + n), e.push("font:" + t.getFont()), r && e.push("line-height:" + Math.round(r * 3 / 2) + "px");
  var i = t.get("textShadowColor"),
    a = t.get("textShadowBlur") || 0,
    o = t.get("textShadowOffsetX") || 0,
    s = t.get("textShadowOffsetY") || 0;
  return i && a && e.push("text-shadow:" + o + "px " + s + "px " + a + "px " + i), P(["decoration", "align"], function (l) {
    var u = t.get(l);
    u && e.push("text-" + l + ":" + u)
  }), e.join(";")
}

function Fk(t, e, r) {
  var n = [],
    i = t.get("transitionDuration"),
    a = t.get("backgroundColor"),
    o = t.get("shadowBlur"),
    s = t.get("shadowColor"),
    l = t.get("shadowOffsetX"),
    u = t.get("shadowOffsetY"),
    f = t.getModel("textStyle"),
    c = Mw(t, "html"),
    h = l + "px " + u + "px " + o + "px " + s;
  return n.push("box-shadow:" + h), e && i && n.push(Bk(i, r)), a && n.push("background-color:" + a), P(["width", "color", "radius"], function (v) {
    var d = "border-" + v,
      y = J1(d),
      g = t.get(y);
    g != null && n.push(d + ":" + g + (v === "color" ? "" : "px"))
  }), n.push(Nk(f)), c != null && n.push("padding:" + yu(c).join("px ") + "px"), n.join(";") + ";"
}

function ym(t, e, r, n, i) {
  var a = e && e.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && pM(t, o, document.body, n, i)
  } else {
    t[0] = n, t[1] = i;
    var s = a && a.getViewportRootOffset();
    s && (t[0] += s.offsetLeft, t[1] += s.offsetTop)
  }
  t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight()
}
var zk = function () {
    function t(e, r, n) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._firstShow = !0, this._longHide = !0, mt.wxa) return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var a = this._zr = r.getZr(),
        o = this._appendToBody = n && n.appendToBody;
      ym(this._styleCoord, a, o, r.getWidth() / 2, r.getHeight() / 2), o ? document.body.appendChild(i) : e.appendChild(i), this._container = e;
      var s = this;
      i.onmouseenter = function () {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0
      }, i.onmousemove = function (l) {
        if (l = l || window.event, !s._enterable) {
          var u = a.handler,
            f = a.painter.getViewportRoot();
          Be(f, l, !0), u.dispatch("mousemove", l)
        }
      }, i.onmouseleave = function () {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay)
      }
    }
    return t.prototype.update = function (e) {
      var r = this._container,
        n = Ek(r, "position"),
        i = r.style;
      i.position !== "absolute" && n !== "absolute" && (i.position = "relative");
      var a = e.get("alwaysShowContent");
      a && this._moveIfResized(), this.el.className = e.get("className") || ""
    }, t.prototype.show = function (e, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var n = this.el,
        i = n.style,
        a = this._styleCoord;
      n.innerHTML ? i.cssText = Rk + Fk(e, !this._firstShow, this._longHide) + gm(a[0], a[1], !0) + ("border-color:" + hi(r) + ";") + (e.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : i.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1
    }, t.prototype.setContent = function (e, r, n, i, a) {
      var o = this.el;
      if (e == null) {
        o.innerHTML = "";
        return
      }
      var s = "";
      if (nt(a) && n.get("trigger") === "item" && !GS(n) && (s = kk(n, i, a)), nt(e)) o.innerHTML = e + s;
      else if (e) {
        o.innerHTML = "", et(e) || (e = [e]);
        for (var l = 0; l < e.length; l++) ml(e[l]) && e[l].parentNode !== o && o.appendChild(e[l]);
        if (s && o.childNodes.length) {
          var u = document.createElement("div");
          u.innerHTML = s, o.appendChild(u)
        }
      }
    }, t.prototype.setEnterable = function (e) {
      this._enterable = e
    }, t.prototype.getSize = function () {
      var e = this.el;
      return [e.offsetWidth, e.offsetHeight]
    }, t.prototype.moveTo = function (e, r) {
      var n = this._styleCoord;
      if (ym(n, this._zr, this._appendToBody, e, r), n[0] != null && n[1] != null) {
        var i = this.el.style,
          a = gm(n[0], n[1]);
        P(a, function (o) {
          i[o[0]] = o[1]
        })
      }
    }, t.prototype._moveIfResized = function () {
      var e = this._styleCoord[2],
        r = this._styleCoord[3];
      this.moveTo(e * this._zr.getWidth(), r * this._zr.getHeight())
    }, t.prototype.hide = function () {
      var e = this,
        r = this.el.style;
      r.visibility = "hidden", r.opacity = "0", mt.transform3dSupported && (r.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function () {
        return e._longHide = !0
      }, 500)
    }, t.prototype.hideLater = function (e) {
      this._show && !(this._inContent && this._enterable) && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(Ht(this.hide, this), e)) : this.hide())
    }, t.prototype.isShow = function () {
      return this._show
    }, t.prototype.dispose = function () {
      this.el.parentNode.removeChild(this.el)
    }, t
  }(),
  Hk = zk,
  Vk = function () {
    function t(e) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._zr = e.getZr(), _m(this._styleCoord, this._zr, e.getWidth() / 2, e.getHeight() / 2)
    }
    return t.prototype.update = function (e) {
      var r = e.get("alwaysShowContent");
      r && this._moveIfResized()
    }, t.prototype.show = function () {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0
    }, t.prototype.setContent = function (e, r, n, i, a) {
      var o = this;
      st(e) && ye(""), this.el && this._zr.remove(this.el);
      var s = n.getModel("textStyle");
      this.el = new he({
        style: {
          rich: r.richTextStyles,
          text: e,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: i,
          textShadowColor: s.get("textShadowColor"),
          fill: n.get(["textStyle", "color"]),
          padding: Mw(n, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: n.get("z")
      }), P(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function (u) {
        o.el.style[u] = n.get(u)
      }), P(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function (u) {
        o.el.style[u] = s.get(u) || 0
      }), this._zr.add(this.el);
      var l = this;
      this.el.on("mouseover", function () {
        l._enterable && (clearTimeout(l._hideTimeout), l._show = !0), l._inContent = !0
      }), this.el.on("mouseout", function () {
        l._enterable && l._show && l.hideLater(l._hideDelay), l._inContent = !1
      })
    }, t.prototype.setEnterable = function (e) {
      this._enterable = e
    }, t.prototype.getSize = function () {
      var e = this.el,
        r = this.el.getBoundingRect(),
        n = mm(e.style);
      return [r.width + n.left + n.right, r.height + n.top + n.bottom]
    }, t.prototype.moveTo = function (e, r) {
      var n = this.el;
      if (n) {
        var i = this._styleCoord;
        _m(i, this._zr, e, r), e = i[0], r = i[1];
        var a = n.style,
          o = rn(a.borderWidth || 0),
          s = mm(a);
        n.x = e + o + s.left, n.y = r + o + s.top, n.markRedraw()
      }
    }, t.prototype._moveIfResized = function () {
      var e = this._styleCoord[2],
        r = this._styleCoord[3];
      this.moveTo(e * this._zr.getWidth(), r * this._zr.getHeight())
    }, t.prototype.hide = function () {
      this.el && this.el.hide(), this._show = !1
    }, t.prototype.hideLater = function (e) {
      this._show && !(this._inContent && this._enterable) && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(Ht(this.hide, this), e)) : this.hide())
    }, t.prototype.isShow = function () {
      return this._show
    }, t.prototype.dispose = function () {
      this._zr.remove(this.el)
    }, t
  }();

function rn(t) {
  return Math.max(0, t)
}

function mm(t) {
  var e = rn(t.shadowBlur || 0),
    r = rn(t.shadowOffsetX || 0),
    n = rn(t.shadowOffsetY || 0);
  return {
    left: rn(e - r),
    right: rn(e + r),
    top: rn(e - n),
    bottom: rn(e + n)
  }
}

function _m(t, e, r, n) {
  t[0] = r, t[1] = n, t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight()
}
var $k = Vk,
  Gk = new Qt({
    shape: {
      x: -1,
      y: -1,
      width: 2,
      height: 2
    }
  }),
  Wk = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r
    }
    return e.prototype.init = function (r, n) {
      if (!(mt.node || !n.getDom())) {
        var i = r.getComponent("tooltip"),
          a = this._renderMode = XD(i.get("renderMode"));
        this._tooltipContent = a === "richText" ? new $k(n) : new Hk(n.getDom(), n, {
          appendToBody: i.get("appendToBody", !0)
        })
      }
    }, e.prototype.render = function (r, n, i) {
      if (!(mt.node || !i.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = n, this._api = i, this._alwaysShowContent = r.get("alwaysShowContent");
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? Iw(this, "_updatePosition", 50, "fixRate") : eh(this, "_updatePosition")
      }
    }, e.prototype._initGlobalListener = function () {
      var r = this._tooltipModel,
        n = r.get("triggerOn");
      HS("itemTooltip", this._api, Ht(function (i, a, o) {
        n !== "none" && (n.indexOf(i) >= 0 ? this._tryShow(a, o) : i === "leave" && this._hide(o))
      }, this))
    }, e.prototype._keepShow = function () {
      var r = this._tooltipModel,
        n = this._ecModel,
        i = this._api;
      if (this._lastX != null && this._lastY != null && r.get("triggerOn") !== "none") {
        var a = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function () {
          !i.isDisposed() && a.manuallyShowTip(r, n, i, {
            x: a._lastX,
            y: a._lastY,
            dataByCoordSys: a._lastDataByCoordSys
          })
        })
      }
    }, e.prototype.manuallyShowTip = function (r, n, i, a) {
      if (!(a.from === this.uid || mt.node || !i.getDom())) {
        var o = wm(a, i);
        this._ticket = "";
        var s = a.dataByCoordSys,
          l = qk(a, n, i);
        if (l) {
          var u = l.el.getBoundingRect().clone();
          u.applyTransform(l.el.transform), this._tryShow({
            offsetX: u.x + u.width / 2,
            offsetY: u.y + u.height / 2,
            target: l.el,
            position: a.position,
            positionDefault: "bottom"
          }, o)
        } else if (a.tooltip && a.x != null && a.y != null) {
          var f = Gk;
          f.x = a.x, f.y = a.y, f.update(), Bt(f).tooltipConfig = {
            name: null,
            option: a.tooltip
          }, this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            target: f
          }, o)
        } else if (s) this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          dataByCoordSys: s,
          tooltipOption: a.tooltipOption
        }, o);
        else if (a.seriesIndex != null) {
          if (this._manuallyAxisShowTip(r, n, i, a)) return;
          var c = VS(a, n),
            h = c.point[0],
            v = c.point[1];
          h != null && v != null && this._tryShow({
            offsetX: h,
            offsetY: v,
            target: c.el,
            position: a.position,
            positionDefault: "bottom"
          }, o)
        } else a.x != null && a.y != null && (i.dispatchAction({
          type: "updateAxisPointer",
          x: a.x,
          y: a.y
        }), this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          target: i.getZr().findHover(a.x, a.y).target
        }, o))
      }
    }, e.prototype.manuallyHideTip = function (r, n, i, a) {
      var o = this._tooltipContent;
      !this._alwaysShowContent && this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(wm(a, i))
    }, e.prototype._manuallyAxisShowTip = function (r, n, i, a) {
      var o = a.seriesIndex,
        s = a.dataIndex,
        l = n.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = n.getSeriesByIndex(o);
        if (!!u) {
          var f = u.getData(),
            c = Ga([f.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (c.get("trigger") === "axis") return i.dispatchAction({
            type: "updateAxisPointer",
            seriesIndex: o,
            dataIndex: s,
            position: a.position
          }), !0
        }
      }
    }, e.prototype._tryShow = function (r, n) {
      var i = r.target,
        a = this._tooltipModel;
      if (!!a) {
        this._lastX = r.offsetX, this._lastY = r.offsetY;
        var o = r.dataByCoordSys;
        if (o && o.length) this._showAxisTooltip(o, r);
        else if (i) {
          this._lastDataByCoordSys = null;
          var s, l;
          Ja(i, function (u) {
            if (Bt(u).dataIndex != null) return s = u, !0;
            if (Bt(u).tooltipConfig != null) return l = u, !0
          }, !0), s ? this._showSeriesItemTooltip(r, s, n) : l ? this._showComponentItemTooltip(r, l, n) : this._hide(n)
        } else this._lastDataByCoordSys = null, this._hide(n)
      }
    }, e.prototype._showOrMove = function (r, n) {
      var i = r.get("showDelay");
      n = Ht(n, this), clearTimeout(this._showTimout), i > 0 ? this._showTimout = setTimeout(n, i) : n()
    }, e.prototype._showAxisTooltip = function (r, n) {
      var i = this._ecModel,
        a = this._tooltipModel,
        o = [n.offsetX, n.offsetY],
        s = Ga([n.tooltipOption], a),
        l = this._renderMode,
        u = [],
        f = Ho("section", {
          blocks: [],
          noHeader: !0
        }),
        c = [],
        h = new Df;
      P(r, function (m) {
        P(m.dataByAxis, function (_) {
          var w = i.getComponent(_.axisDim + "Axis", _.axisIndex),
            b = _.value;
          if (!(!w || b == null)) {
            var S = FS(b, w.axis, i, _.seriesDataIndices, _.valueLabelOpt),
              x = Ho("section", {
                header: S,
                noHeader: !vr(S),
                sortBlocks: !0,
                blocks: []
              });
            f.blocks.push(x), P(_.seriesDataIndices, function (T) {
              var M = i.getSeriesByIndex(T.seriesIndex),
                D = T.dataIndexInside,
                I = M.getDataParams(D);
              if (!(I.dataIndex < 0)) {
                I.axisDim = _.axisDim, I.axisIndex = _.axisIndex, I.axisType = _.axisType, I.axisId = _.axisId, I.axisValue = td(w.axis, {
                  value: b
                }), I.axisValueLabel = S, I.marker = h.makeTooltipMarker("item", hi(I.color), l);
                var A = Qg(M.formatTooltip(D, !0, null)),
                  L = A.frag;
                if (L) {
                  var O = Ga([M], a).get("valueFormatter");
                  x.blocks.push(O ? q({
                    valueFormatter: O
                  }, L) : L)
                }
                A.text && c.push(A.text), u.push(I)
              }
            })
          }
        })
      }), f.blocks.reverse(), c.reverse();
      var v = n.position,
        d = s.get("order"),
        y = ny(f, h, l, d, i.get("useUTC"), s.get("textStyle"));
      y && c.unshift(y);
      var g = l === "richText" ? `

` : "<br/>",
        p = c.join(g);
      this._showOrMove(s, function () {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, v, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, p, u, Math.random() + "", o[0], o[1], v, null, h)
      })
    }, e.prototype._showSeriesItemTooltip = function (r, n, i) {
      var a = this._ecModel,
        o = Bt(n),
        s = o.seriesIndex,
        l = a.getSeriesByIndex(s),
        u = o.dataModel || l,
        f = o.dataIndex,
        c = o.dataType,
        h = u.getData(c),
        v = this._renderMode,
        d = r.positionDefault,
        y = Ga([h.getItemModel(f), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
          position: d
        } : null),
        g = y.get("trigger");
      if (!(g != null && g !== "item")) {
        var p = u.getDataParams(f, c),
          m = new Df;
        p.marker = m.makeTooltipMarker("item", hi(p.color), v);
        var _ = Qg(u.formatTooltip(f, !1, c)),
          w = y.get("order"),
          b = y.get("valueFormatter"),
          S = _.frag,
          x = S ? ny(b ? q({
            valueFormatter: b
          }, S) : S, m, v, w, a.get("useUTC"), y.get("textStyle")) : _.text,
          T = "item_" + u.name + "_" + f;
        this._showOrMove(y, function () {
          this._showTooltipContent(y, x, p, T, r.offsetX, r.offsetY, r.position, r.target, m)
        }), i({
          type: "showTip",
          dataIndexInside: f,
          dataIndex: h.getRawIndex(f),
          seriesIndex: s,
          from: this.uid
        })
      }
    }, e.prototype._showComponentItemTooltip = function (r, n, i) {
      var a = Bt(n),
        o = a.tooltipConfig,
        s = o.option || {};
      if (nt(s)) {
        var l = s;
        s = {
          content: l,
          formatter: l
        }
      }
      var u = [s],
        f = this._ecModel.getComponent(a.componentMainType, a.componentIndex);
      f && u.push(f), u.push({
        formatter: s.content
      });
      var c = r.positionDefault,
        h = Ga(u, this._tooltipModel, c ? {
          position: c
        } : null),
        v = h.get("content"),
        d = Math.random() + "",
        y = new Df;
      this._showOrMove(h, function () {
        var g = St(h.get("formatterParams") || {});
        this._showTooltipContent(h, v, g, d, r.offsetX, r.offsetY, r.position, n, y)
      }), i({
        type: "showTip",
        from: this.uid
      })
    }, e.prototype._showTooltipContent = function (r, n, i, a, o, s, l, u, f) {
      if (this._ticket = "", !(!r.get("showContent") || !r.get("show"))) {
        var c = this._tooltipContent;
        c.setEnterable(r.get("enterable"));
        var h = r.get("formatter");
        l = l || r.get("position");
        var v = n,
          d = this._getNearestPoint([o, s], i, r.get("trigger"), r.get("borderColor")),
          y = d.color;
        if (h)
          if (nt(h)) {
            var g = r.ecModel.get("useUTC"),
              p = et(i) ? i[0] : i,
              m = p && p.axisType && p.axisType.indexOf("time") >= 0;
            v = h, m && (v = hu(p.axisValue, v, g)), v = tw(v, i, !0)
          } else if (dt(h)) {
          var _ = Ht(function (w, b) {
            w === this._ticket && (c.setContent(b, f, r, y, l), this._updatePosition(r, l, o, s, c, i, u))
          }, this);
          this._ticket = a, v = h(i, a, _)
        } else v = h;
        c.setContent(v, f, r, y, l), c.show(r, y), this._updatePosition(r, l, o, s, c, i, u)
      }
    }, e.prototype._getNearestPoint = function (r, n, i, a) {
      if (i === "axis" || et(n)) return {
        color: a || (this._renderMode === "html" ? "#fff" : "none")
      };
      if (!et(n)) return {
        color: a || n.color || n.borderColor
      }
    }, e.prototype._updatePosition = function (r, n, i, a, o, s, l) {
      var u = this._api.getWidth(),
        f = this._api.getHeight();
      n = n || r.get("position");
      var c = o.getSize(),
        h = r.get("align"),
        v = r.get("verticalAlign"),
        d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), dt(n) && (n = n([i, a], s, o.el, d, {
          viewSize: [u, f],
          contentSize: c.slice()
        })), et(n)) i = ue(n[0], u), a = ue(n[1], f);
      else if (st(n)) {
        var y = n;
        y.width = c[0], y.height = c[1];
        var g = No(y, {
          width: u,
          height: f
        });
        i = g.x, a = g.y, h = null, v = null
      } else if (nt(n) && l) {
        var p = Xk(n, d, c, r.get("borderWidth"));
        i = p[0], a = p[1]
      } else {
        var p = Uk(i, a, o, u, f, h ? null : 20, v ? null : 20);
        i = p[0], a = p[1]
      }
      if (h && (i -= Sm(h) ? c[0] / 2 : h === "right" ? c[0] : 0), v && (a -= Sm(v) ? c[1] / 2 : v === "bottom" ? c[1] : 0), GS(r)) {
        var p = Yk(i, a, o, u, f);
        i = p[0], a = p[1]
      }
      o.moveTo(i, a)
    }, e.prototype._updateContentNotChangedOnAxis = function (r, n) {
      var i = this._lastDataByCoordSys,
        a = this._cbParamsList,
        o = !!i && i.length === r.length;
      return o && P(i, function (s, l) {
        var u = s.dataByAxis || [],
          f = r[l] || {},
          c = f.dataByAxis || [];
        o = o && u.length === c.length, o && P(u, function (h, v) {
          var d = c[v] || {},
            y = h.seriesDataIndices || [],
            g = d.seriesDataIndices || [];
          o = o && h.value === d.value && h.axisType === d.axisType && h.axisId === d.axisId && y.length === g.length, o && P(y, function (p, m) {
            var _ = g[m];
            o = o && p.seriesIndex === _.seriesIndex && p.dataIndex === _.dataIndex
          }), a && P(h.seriesDataIndices, function (p) {
            var m = p.seriesIndex,
              _ = n[m],
              w = a[m];
            _ && w && w.data !== _.data && (o = !1)
          })
        })
      }), this._lastDataByCoordSys = r, this._cbParamsList = n, !!o
    }, e.prototype._hide = function (r) {
      this._lastDataByCoordSys = null, r({
        type: "hideTip",
        from: this.uid
      })
    }, e.prototype.dispose = function (r, n) {
      mt.node || !n.getDom() || (eh(this, "_updatePosition"), this._tooltipContent.dispose(), gh("itemTooltip", n))
    }, e.type = "tooltip", e
  }(Br);

function Ga(t, e, r) {
  var n = e.ecModel,
    i;
  r ? (i = new ae(r, n, n), i = new ae(e.option, i, n)) : i = e;
  for (var a = t.length - 1; a >= 0; a--) {
    var o = t[a];
    o && (o instanceof ae && (o = o.get("tooltip", !0)), nt(o) && (o = {
      formatter: o
    }), o && (i = new ae(o, i, n)))
  }
  return i
}

function wm(t, e) {
  return t.dispatchAction || Ht(e.dispatchAction, e)
}

function Uk(t, e, r, n, i, a, o) {
  var s = r.getSize(),
    l = s[0],
    u = s[1];
  return a != null && (t + l + a + 2 > n ? t -= l + a : t += a), o != null && (e + u + o > i ? e -= u + o : e += o), [t, e]
}

function Yk(t, e, r, n, i) {
  var a = r.getSize(),
    o = a[0],
    s = a[1];
  return t = Math.min(t + o, n) - o, e = Math.min(e + s, i) - s, t = Math.max(t, 0), e = Math.max(e, 0), [t, e]
}

function Xk(t, e, r, n) {
  var i = r[0],
    a = r[1],
    o = Math.ceil(Math.SQRT2 * n) + 8,
    s = 0,
    l = 0,
    u = e.width,
    f = e.height;
  switch (t) {
    case "inside":
      s = e.x + u / 2 - i / 2, l = e.y + f / 2 - a / 2;
      break;
    case "top":
      s = e.x + u / 2 - i / 2, l = e.y - a - o;
      break;
    case "bottom":
      s = e.x + u / 2 - i / 2, l = e.y + f + o;
      break;
    case "left":
      s = e.x - i - o, l = e.y + f / 2 - a / 2;
      break;
    case "right":
      s = e.x + u + o, l = e.y + f / 2 - a / 2
  }
  return [s, l]
}

function Sm(t) {
  return t === "center" || t === "middle"
}

function qk(t, e, r) {
  var n = yv(t).queryOptionMap,
    i = n.keys()[0];
  if (!(!i || i === "series")) {
    var a = jo(e, i, n.get(i), {
        useDefault: !1,
        enableAll: !1,
        enableNone: !1
      }),
      o = a.models[0];
    if (!!o) {
      var s = r.getViewOfComponentModel(o),
        l;
      if (s.group.traverse(function (u) {
          var f = Bt(u).tooltipConfig;
          if (f && f.name === t.name) return l = u, !0
        }), l) return {
        componentMainType: i,
        componentIndex: o.componentIndex,
        el: l
      }
    }
  }
}
var Kk = Wk;

function bN(t) {
  vi($S), t.registerComponentModel(Pk), t.registerComponentView(Kk), t.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, _e), t.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, _e)
}
var Zk = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.layoutMode = {
        type: "box",
        ignoreSize: !0
      }, r
    }
    return e.type = "title", e.defaultOption = {
      z: 6,
      show: !0,
      text: "",
      target: "blank",
      subtext: "",
      subtarget: "blank",
      left: 0,
      top: 0,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#464646"
      },
      subtextStyle: {
        fontSize: 12,
        color: "#6E7079"
      }
    }, e
  }(zt),
  jk = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r
    }
    return e.prototype.render = function (r, n, i) {
      if (this.group.removeAll(), !!r.get("show")) {
        var a = this.group,
          o = r.getModel("textStyle"),
          s = r.getModel("subtextStyle"),
          l = r.get("textAlign"),
          u = Mt(r.get("textBaseline"), r.get("textVerticalAlign")),
          f = new he({
            style: Sn(o, {
              text: r.get("text"),
              fill: o.getTextColor()
            }, {
              disableBox: !0
            }),
            z2: 10
          }),
          c = f.getBoundingRect(),
          h = r.get("subtext"),
          v = new he({
            style: Sn(s, {
              text: h,
              fill: s.getTextColor(),
              y: c.height + r.get("itemGap"),
              verticalAlign: "top"
            }, {
              disableBox: !0
            }),
            z2: 10
          }),
          d = r.get("link"),
          y = r.get("sublink"),
          g = r.get("triggerEvent", !0);
        f.silent = !d && !g, v.silent = !y && !g, d && f.on("click", function () {
          Og(d, "_" + r.get("target"))
        }), y && v.on("click", function () {
          Og(y, "_" + r.get("subtarget"))
        }), Bt(f).eventData = Bt(v).eventData = g ? {
          componentType: "title",
          componentIndex: r.componentIndex
        } : null, a.add(f), h && a.add(v);
        var p = a.getBoundingRect(),
          m = r.getBoxLayoutParams();
        m.width = p.width, m.height = p.height;
        var _ = No(m, {
          width: i.getWidth(),
          height: i.getHeight()
        }, r.get("padding"));
        l || (l = r.get("left") || r.get("right"), l === "middle" && (l = "center"), l === "right" ? _.x += _.width : l === "center" && (_.x += _.width / 2)), u || (u = r.get("top") || r.get("bottom"), u === "center" && (u = "middle"), u === "bottom" ? _.y += _.height : u === "middle" && (_.y += _.height / 2), u = u || "top"), a.x = _.x, a.y = _.y, a.markRedraw();
        var w = {
          align: l,
          verticalAlign: u
        };
        f.setStyle(w), v.setStyle(w), p = a.getBoundingRect();
        var b = _.margin,
          S = r.getItemStyle(["color", "opacity"]);
        S.fill = r.get("backgroundColor");
        var x = new Qt({
          shape: {
            x: p.x - b[3],
            y: p.y - b[0],
            width: p.width + b[1] + b[3],
            height: p.height + b[0] + b[2],
            r: r.get("borderRadius")
          },
          style: S,
          subPixelOptimize: !0,
          silent: !0
        });
        a.add(x)
      }
    }, e.type = "title", e
  }(Br);

function xN(t) {
  t.registerComponentModel(Zk), t.registerComponentView(jk)
}

function XS(t, e) {
  var r = t.mapDimensionsAll("defaultedLabel"),
    n = r.length;
  if (n === 1) {
    var i = la(t, e, r[0]);
    return i != null ? i + "" : null
  } else if (n) {
    for (var a = [], o = 0; o < r.length; o++) a.push(la(t, e, r[o]));
    return a.join(" ")
  }
}

function Qk(t, e) {
  var r = t.mapDimensionsAll("defaultedLabel");
  if (!et(e)) return e + "";
  for (var n = [], i = 0; i < r.length; i++) {
    var a = t.getDimensionIndex(r[i]);
    a >= 0 && n.push(e[a])
  }
  return n.join(" ")
}
var Jk = function (t) {
  J(e, t);

  function e(r, n, i, a) {
    var o = t.call(this) || this;
    return o.updateData(r, n, i, a), o
  }
  return e.prototype._createSymbol = function (r, n, i, a, o) {
    this.removeAll();
    var s = ua(r, -1, -1, 2, 2, null, o);
    s.attr({
      z2: 100,
      culling: !0,
      scaleX: a[0] / 2,
      scaleY: a[1] / 2
    }), s.drift = tB, this._symbolType = r, this.add(s)
  }, e.prototype.stopSymbolAnimation = function (r) {
    this.childAt(0).stopAnimation(null, r)
  }, e.prototype.getSymbolType = function () {
    return this._symbolType
  }, e.prototype.getSymbolPath = function () {
    return this.childAt(0)
  }, e.prototype.highlight = function () {
    Pl(this.childAt(0))
  }, e.prototype.downplay = function () {
    Il(this.childAt(0))
  }, e.prototype.setZ = function (r, n) {
    var i = this.childAt(0);
    i.zlevel = r, i.z = n
  }, e.prototype.setDraggable = function (r) {
    var n = this.childAt(0);
    n.draggable = r, n.cursor = r ? "move" : n.cursor
  }, e.prototype.updateData = function (r, n, i, a) {
    this.silent = !1;
    var o = r.getItemVisual(n, "symbol") || "circle",
      s = r.hostModel,
      l = e.getSymbolSize(r, n),
      u = o !== this._symbolType,
      f = a && a.disableAnimation;
    if (u) {
      var c = r.getItemVisual(n, "symbolKeepAspect");
      this._createSymbol(o, r, n, l, c)
    } else {
      var h = this.childAt(0);
      h.silent = !1;
      var v = {
        scaleX: l[0] / 2,
        scaleY: l[1] / 2
      };
      f ? h.attr(v) : wn(h, v, s, n), tI(h)
    }
    if (this._updateCommon(r, n, l, i, a), u) {
      var h = this.childAt(0);
      if (!f) {
        var v = {
          scaleX: this._sizeX,
          scaleY: this._sizeY,
          style: {
            opacity: h.style.opacity
          }
        };
        h.scaleX = h.scaleY = 0, h.style.opacity = 0, Jo(h, v, s, n)
      }
    }
    f && this.childAt(0).stopAnimation("leave")
  }, e.prototype._updateCommon = function (r, n, i, a, o) {
    var s = this.childAt(0),
      l = r.hostModel,
      u, f, c, h, v, d, y, g, p;
    if (a && (u = a.emphasisItemStyle, f = a.blurItemStyle, c = a.selectItemStyle, h = a.focus, v = a.blurScope, y = a.labelStatesModels, g = a.hoverScale, p = a.cursorStyle, d = a.emphasisDisabled), !a || r.hasItemOption) {
      var m = a && a.itemModel ? a.itemModel : r.getItemModel(n),
        _ = m.getModel("emphasis");
      u = _.getModel("itemStyle").getItemStyle(), c = m.getModel(["select", "itemStyle"]).getItemStyle(), f = m.getModel(["blur", "itemStyle"]).getItemStyle(), h = _.get("focus"), v = _.get("blurScope"), d = _.get("disabled"), y = Rv(m), g = _.getShallow("scale"), p = m.getShallow("cursor")
    }
    var w = r.getItemVisual(n, "symbolRotate");
    s.attr("rotation", (w || 0) * Math.PI / 180 || 0);
    var b = Fw(r.getItemVisual(n, "symbolOffset"), i);
    b && (s.x = b[0], s.y = b[1]), p && s.attr("cursor", p);
    var S = r.getItemVisual(n, "style"),
      x = S.fill;
    if (s instanceof pi) {
      var T = s.style;
      s.useStyle(q({
        image: T.image,
        x: T.x,
        y: T.y,
        width: T.width,
        height: T.height
      }, S))
    } else s.__isEmptyBrush ? s.useStyle(q({}, S)) : s.useStyle(S), s.style.decal = null, s.setColor(x, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
    var M = r.getItemVisual(n, "liftZ"),
      D = this._z2;
    M != null ? D == null && (this._z2 = s.z2, s.z2 += M) : D != null && (s.z2 = D, this._z2 = null);
    var I = o && o.useNameLabel;
    Lv(s, y, {
      labelFetcher: l,
      labelDataIndex: n,
      defaultText: A,
      inheritColor: x,
      defaultOpacity: S.opacity
    });

    function A(H) {
      return I ? r.getName(H) : XS(r, H)
    }
    this._sizeX = i[0] / 2, this._sizeY = i[1] / 2;
    var L = s.ensureState("emphasis");
    if (L.style = u, s.ensureState("select").style = c, s.ensureState("blur").style = f, g) {
      var O = Math.max(1.1, 3 / this._sizeY);
      L.scaleX = this._sizeX * O, L.scaleY = this._sizeY * O
    }
    this.setSymbolScale(1), Wc(this, h, v, d)
  }, e.prototype.setSymbolScale = function (r) {
    this.scaleX = this.scaleY = r
  }, e.prototype.fadeOut = function (r, n, i) {
    var a = this.childAt(0),
      o = Bt(this).dataIndex,
      s = i && i.animation;
    if (this.silent = a.silent = !0, i && i.fadeLabel) {
      var l = a.getTextContent();
      l && Ll(l, {
        style: {
          opacity: 0
        }
      }, n, {
        dataIndex: o,
        removeOpt: s,
        cb: function () {
          a.removeTextContent()
        }
      })
    } else a.removeTextContent();
    Ll(a, {
      style: {
        opacity: 0
      },
      scaleX: 0,
      scaleY: 0
    }, n, {
      dataIndex: o,
      cb: r,
      removeOpt: s
    })
  }, e.getSymbolSize = function (r, n) {
    return jL(r.getItemVisual(n, "symbolSize"))
  }, e
}(ce);

function tB(t, e) {
  this.parent.drift(t, e)
}
var ad = Jk;

function Uf(t, e, r, n) {
  return e && !isNaN(e[0]) && !isNaN(e[1]) && !(n.isIgnore && n.isIgnore(r)) && !(n.clipShape && !n.clipShape.contain(e[0], e[1])) && t.getItemVisual(r, "symbol") !== "none"
}

function bm(t) {
  return t != null && !st(t) && (t = {
    isIgnore: t
  }), t || {}
}

function xm(t) {
  var e = t.hostModel,
    r = e.getModel("emphasis");
  return {
    emphasisItemStyle: r.getModel("itemStyle").getItemStyle(),
    blurItemStyle: e.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: e.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: r.get("focus"),
    blurScope: r.get("blurScope"),
    emphasisDisabled: r.get("disabled"),
    hoverScale: r.get("scale"),
    labelStatesModels: Rv(e),
    cursorStyle: e.get("cursor")
  }
}
var eB = function () {
    function t(e) {
      this.group = new ce, this._SymbolCtor = e || ad
    }
    return t.prototype.updateData = function (e, r) {
      this._progressiveEls = null, r = bm(r);
      var n = this.group,
        i = e.hostModel,
        a = this._data,
        o = this._SymbolCtor,
        s = r.disableAnimation,
        l = xm(e),
        u = {
          disableAnimation: s
        },
        f = r.getSymbolPoint || function (c) {
          return e.getItemLayout(c)
        };
      a || n.removeAll(), e.diff(a).add(function (c) {
        var h = f(c);
        if (Uf(e, h, c, r)) {
          var v = new o(e, c, l, u);
          v.setPosition(h), e.setItemGraphicEl(c, v), n.add(v)
        }
      }).update(function (c, h) {
        var v = a.getItemGraphicEl(h),
          d = f(c);
        if (!Uf(e, d, c, r)) {
          n.remove(v);
          return
        }
        var y = e.getItemVisual(c, "symbol") || "circle",
          g = v && v.getSymbolType && v.getSymbolType();
        if (!v || g && g !== y) n.remove(v), v = new o(e, c, l, u), v.setPosition(d);
        else {
          v.updateData(e, c, l, u);
          var p = {
            x: d[0],
            y: d[1]
          };
          s ? v.attr(p) : wn(v, p, i)
        }
        n.add(v), e.setItemGraphicEl(c, v)
      }).remove(function (c) {
        var h = a.getItemGraphicEl(c);
        h && h.fadeOut(function () {
          n.remove(h)
        }, i)
      }).execute(), this._getSymbolPoint = f, this._data = e
    }, t.prototype.updateLayout = function () {
      var e = this,
        r = this._data;
      r && r.eachItemGraphicEl(function (n, i) {
        var a = e._getSymbolPoint(i);
        n.setPosition(a), n.markRedraw()
      })
    }, t.prototype.incrementalPrepareUpdate = function (e) {
      this._seriesScope = xm(e), this._data = null, this.group.removeAll()
    }, t.prototype.incrementalUpdate = function (e, r, n) {
      this._progressiveEls = [], n = bm(n);

      function i(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0)
      }
      for (var a = e.start; a < e.end; a++) {
        var o = r.getItemLayout(a);
        if (Uf(r, o, a, n)) {
          var s = new this._SymbolCtor(r, a, this._seriesScope);
          s.traverse(i), s.setPosition(o), this.group.add(s), r.setItemGraphicEl(a, s), this._progressiveEls.push(s)
        }
      }
    }, t.prototype.eachRendered = function (e) {
      Ev(this._progressiveEls || this.group, e)
    }, t.prototype.remove = function (e) {
      var r = this.group,
        n = this._data;
      n && e ? n.eachItemGraphicEl(function (i) {
        i.fadeOut(function () {
          r.remove(i)
        }, n.hostModel)
      }) : r.removeAll()
    }, t
  }(),
  rB = eB;

function nB(t, e) {
  return t.type === e
}
var iB = function (t, e) {
    if (e === "all") return {
      type: "all",
      title: t.getLocaleModel().get(["legend", "selector", "all"])
    };
    if (e === "inverse") return {
      type: "inverse",
      title: t.getLocaleModel().get(["legend", "selector", "inverse"])
    }
  },
  aB = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.layoutMode = {
        type: "box",
        ignoreSize: !0
      }, r
    }
    return e.prototype.init = function (r, n, i) {
      this.mergeDefaultAndTheme(r, i), r.selected = r.selected || {}, this._updateSelector(r)
    }, e.prototype.mergeOption = function (r, n) {
      t.prototype.mergeOption.call(this, r, n), this._updateSelector(r)
    }, e.prototype._updateSelector = function (r) {
      var n = r.selector,
        i = this.ecModel;
      n === !0 && (n = r.selector = ["all", "inverse"]), et(n) && P(n, function (a, o) {
        nt(a) && (a = {
          type: a
        }), n[o] = Tt(a, iB(i, a.type))
      })
    }, e.prototype.optionUpdated = function () {
      this._updateData(this.ecModel);
      var r = this._data;
      if (r[0] && this.get("selectedMode") === "single") {
        for (var n = !1, i = 0; i < r.length; i++) {
          var a = r[i].get("name");
          if (this.isSelected(a)) {
            this.select(a), n = !0;
            break
          }
        }!n && this.select(r[0].get("name"))
      }
    }, e.prototype._updateData = function (r) {
      var n = [],
        i = [];
      r.eachRawSeries(function (s) {
        var l = s.name;
        i.push(l);
        var u;
        if (s.legendVisualProvider) {
          var f = s.legendVisualProvider,
            c = f.getAllNames();
          r.isSeriesFiltered(s) || (i = i.concat(c)), c.length ? n = n.concat(c) : u = !0
        } else u = !0;
        u && gv(s) && n.push(s.name)
      }), this._availableNames = i;
      var a = this.get("data") || n,
        o = ct(a, function (s) {
          return (nt(s) || $t(s)) && (s = {
            name: s
          }), new ae(s, this, this.ecModel)
        }, this);
      this._data = o
    }, e.prototype.getData = function () {
      return this._data
    }, e.prototype.select = function (r) {
      var n = this.option.selected,
        i = this.get("selectedMode");
      if (i === "single") {
        var a = this._data;
        P(a, function (o) {
          n[o.get("name")] = !1
        })
      }
      n[r] = !0
    }, e.prototype.unSelect = function (r) {
      this.get("selectedMode") !== "single" && (this.option.selected[r] = !1)
    }, e.prototype.toggleSelected = function (r) {
      var n = this.option.selected;
      n.hasOwnProperty(r) || (n[r] = !0), this[n[r] ? "unSelect" : "select"](r)
    }, e.prototype.allSelect = function () {
      var r = this._data,
        n = this.option.selected;
      P(r, function (i) {
        n[i.get("name", !0)] = !0
      })
    }, e.prototype.inverseSelect = function () {
      var r = this._data,
        n = this.option.selected;
      P(r, function (i) {
        var a = i.get("name", !0);
        n.hasOwnProperty(a) || (n[a] = !0), n[a] = !n[a]
      })
    }, e.prototype.isSelected = function (r) {
      var n = this.option.selected;
      return !(n.hasOwnProperty(r) && !n[r]) && Pt(this._availableNames, r) >= 0
    }, e.prototype.getOrient = function () {
      return this.get("orient") === "vertical" ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      }
    }, e.type = "legend.plain", e.dependencies = ["series"], e.defaultOption = {
      z: 4,
      show: !0,
      orient: "horizontal",
      left: "center",
      top: 0,
      align: "auto",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      symbolRotate: "inherit",
      symbolKeepAspect: !0,
      inactiveColor: "#ccc",
      inactiveBorderColor: "#ccc",
      inactiveBorderWidth: "auto",
      itemStyle: {
        color: "inherit",
        opacity: "inherit",
        borderColor: "inherit",
        borderWidth: "auto",
        borderCap: "inherit",
        borderJoin: "inherit",
        borderDashOffset: "inherit",
        borderMiterLimit: "inherit"
      },
      lineStyle: {
        width: "auto",
        color: "inherit",
        inactiveColor: "#ccc",
        inactiveWidth: 2,
        opacity: "inherit",
        type: "inherit",
        cap: "inherit",
        join: "inherit",
        dashOffset: "inherit",
        miterLimit: "inherit"
      },
      textStyle: {
        color: "#333"
      },
      selectedMode: !0,
      selector: !1,
      selectorLabel: {
        show: !0,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#666",
        borderWidth: 1,
        borderColor: "#666"
      },
      emphasis: {
        selectorLabel: {
          show: !0,
          color: "#eee",
          backgroundColor: "#666"
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: !1
      }
    }, e
  }(zt),
  yh = aB,
  ki = jt,
  mh = P,
  Gs = ce,
  oB = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.newlineDisabled = !1, r
    }
    return e.prototype.init = function () {
      this.group.add(this._contentGroup = new Gs), this.group.add(this._selectorGroup = new Gs), this._isFirstRender = !0
    }, e.prototype.getContentGroup = function () {
      return this._contentGroup
    }, e.prototype.getSelectorGroup = function () {
      return this._selectorGroup
    }, e.prototype.render = function (r, n, i) {
      var a = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), !!r.get("show", !0)) {
        var o = r.get("align"),
          s = r.get("orient");
        (!o || o === "auto") && (o = r.get("left") === "right" && s === "vertical" ? "right" : "left");
        var l = r.get("selector", !0),
          u = r.get("selectorPosition", !0);
        l && (!u || u === "auto") && (u = s === "horizontal" ? "end" : "start"), this.renderInner(o, r, n, i, l, s, u);
        var f = r.getBoxLayoutParams(),
          c = {
            width: i.getWidth(),
            height: i.getHeight()
          },
          h = r.get("padding"),
          v = No(f, c, h),
          d = this.layoutInner(r, o, v, a, l, u),
          y = No(Dt({
            width: d.width,
            height: d.height
          }, f), c, h);
        this.group.x = y.x - d.x, this.group.y = y.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = Dk(d, r))
      }
    }, e.prototype.resetInner = function () {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll()
    }, e.prototype.renderInner = function (r, n, i, a, o, s, l) {
      var u = this.getContentGroup(),
        f = gt(),
        c = n.get("selectedMode"),
        h = [];
      i.eachRawSeries(function (v) {
        !v.get("legendHoverLink") && h.push(v.id)
      }), mh(n.getData(), function (v, d) {
        var y = v.get("name");
        if (!this.newlineDisabled && (y === "" || y === `
`)) {
          var g = new Gs;
          g.newline = !0, u.add(g);
          return
        }
        var p = i.getSeriesByName(y)[0];
        if (!f.get(y))
          if (p) {
            var m = p.getData(),
              _ = m.getVisual("legendLineStyle") || {},
              w = m.getVisual("legendIcon"),
              b = m.getVisual("style"),
              S = this._createItem(p, y, d, v, n, r, _, b, w, c);
            S.on("click", ki(Cm, y, null, a, h)).on("mouseover", ki(_h, p.name, null, a, h)).on("mouseout", ki(wh, p.name, null, a, h)), f.set(y, !0)
          } else i.eachRawSeries(function (x) {
            if (!f.get(y) && x.legendVisualProvider) {
              var T = x.legendVisualProvider;
              if (!T.containName(y)) return;
              var M = T.indexOfName(y),
                D = T.getItemVisual(M, "style"),
                I = T.getItemVisual(M, "legendIcon"),
                A = Er(D.fill);
              A && A[3] === 0 && (A[3] = .2, D = q(q({}, D), {
                fill: nu(A, "rgba")
              }));
              var L = this._createItem(x, y, d, v, n, r, {}, D, I, c);
              L.on("click", ki(Cm, null, y, a, h)).on("mouseover", ki(_h, null, y, a, h)).on("mouseout", ki(wh, null, y, a, h)), f.set(y, !0)
            }
          }, this)
      }, this), o && this._createSelector(o, n, a, s, l)
    }, e.prototype._createSelector = function (r, n, i, a, o) {
      var s = this.getSelectorGroup();
      mh(r, function (u) {
        var f = u.type,
          c = new he({
            style: {
              x: 0,
              y: 0,
              align: "center",
              verticalAlign: "middle"
            },
            onclick: function () {
              i.dispatchAction({
                type: f === "all" ? "legendAllSelect" : "legendInverseSelect"
              })
            }
          });
        s.add(c);
        var h = n.getModel("selectorLabel"),
          v = n.getModel(["emphasis", "selectorLabel"]);
        Lv(c, {
          normal: h,
          emphasis: v
        }, {
          defaultText: u.title
        }), Gc(c)
      })
    }, e.prototype._createItem = function (r, n, i, a, o, s, l, u, f, c) {
      var h = r.visualDrawType,
        v = o.get("itemWidth"),
        d = o.get("itemHeight"),
        y = o.isSelected(n),
        g = a.get("symbolRotate"),
        p = a.get("symbolKeepAspect"),
        m = a.get("icon");
      f = m || f || "roundRect";
      var _ = sB(f, a, l, u, h, y),
        w = new Gs,
        b = a.getModel("textStyle");
      if (dt(r.getLegendIcon) && (!m || m === "inherit")) w.add(r.getLegendIcon({
        itemWidth: v,
        itemHeight: d,
        icon: f,
        iconRotate: g,
        itemStyle: _.itemStyle,
        lineStyle: _.lineStyle,
        symbolKeepAspect: p
      }));
      else {
        var S = m === "inherit" && r.getData().getVisual("symbol") ? g === "inherit" ? r.getData().getVisual("symbolRotate") : g : 0;
        w.add(lB({
          itemWidth: v,
          itemHeight: d,
          icon: f,
          iconRotate: S,
          itemStyle: _.itemStyle,
          lineStyle: _.lineStyle,
          symbolKeepAspect: p
        }))
      }
      var x = s === "left" ? v + 5 : -5,
        T = s,
        M = o.get("formatter"),
        D = n;
      nt(M) && M ? D = M.replace("{name}", n != null ? n : "") : dt(M) && (D = M(n));
      var I = a.get("inactiveColor");
      w.add(new he({
        style: Sn(b, {
          text: D,
          x,
          y: d / 2,
          fill: y ? b.getTextColor() : I,
          align: T,
          verticalAlign: "middle"
        })
      }));
      var A = new Qt({
          shape: w.getBoundingRect(),
          invisible: !0
        }),
        L = a.getModel("tooltip");
      return L.get("show") && Iv({
        el: A,
        componentModel: o,
        itemName: n,
        itemTooltipOption: L.option
      }), w.add(A), w.eachChild(function (O) {
        O.silent = !0
      }), A.silent = !c, this.getContentGroup().add(w), Gc(w), w.__legendDataIndex = i, w
    }, e.prototype.layoutInner = function (r, n, i, a, o, s) {
      var l = this.getContentGroup(),
        u = this.getSelectorGroup();
      go(r.get("orient"), l, r.get("itemGap"), i.width, i.height);
      var f = l.getBoundingRect(),
        c = [-f.x, -f.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        go("horizontal", u, r.get("selectorItemGap", !0));
        var h = u.getBoundingRect(),
          v = [-h.x, -h.y],
          d = r.get("selectorButtonGap", !0),
          y = r.getOrient().index,
          g = y === 0 ? "width" : "height",
          p = y === 0 ? "height" : "width",
          m = y === 0 ? "y" : "x";
        s === "end" ? v[y] += f[g] + d : c[y] += h[g] + d, v[1 - y] += f[p] / 2 - h[p] / 2, u.x = v[0], u.y = v[1], l.x = c[0], l.y = c[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[g] = f[g] + d + h[g], _[p] = Math.max(f[p], h[p]), _[m] = Math.min(0, h[m] + v[1 - y]), _
      } else return l.x = c[0], l.y = c[1], this.group.getBoundingRect()
    }, e.prototype.remove = function () {
      this.getContentGroup().removeAll(), this._isFirstRender = !0
    }, e.type = "legend.plain", e
  }(Br);

function sB(t, e, r, n, i, a) {
  function o(d, y) {
    d.lineWidth === "auto" && (d.lineWidth = y.lineWidth > 0 ? 2 : 0), mh(d, function (g, p) {
      d[p] === "inherit" && (d[p] = y[p])
    })
  }
  var s = e.getModel("itemStyle"),
    l = s.getItemStyle(),
    u = t.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke";
  l.decal = n.decal, l.fill === "inherit" && (l.fill = n[i]), l.stroke === "inherit" && (l.stroke = n[u]), l.opacity === "inherit" && (l.opacity = (i === "fill" ? n : r).opacity), o(l, n);
  var f = e.getModel("lineStyle"),
    c = f.getLineStyle();
  if (o(c, r), l.fill === "auto" && (l.fill = n.fill), l.stroke === "auto" && (l.stroke = n.fill), c.stroke === "auto" && (c.stroke = n.fill), !a) {
    var h = e.get("inactiveBorderWidth"),
      v = l[u];
    l.lineWidth = h === "auto" ? n.lineWidth > 0 && v ? 2 : 0 : l.lineWidth, l.fill = e.get("inactiveColor"), l.stroke = e.get("inactiveBorderColor"), c.stroke = f.get("inactiveColor"), c.lineWidth = f.get("inactiveWidth")
  }
  return {
    itemStyle: l,
    lineStyle: c
  }
}

function lB(t) {
  var e = t.icon || "roundRect",
    r = ua(e, 0, 0, t.itemWidth, t.itemHeight, t.itemStyle.fill, t.symbolKeepAspect);
  return r.setStyle(t.itemStyle), r.rotation = (t.iconRotate || 0) * Math.PI / 180, r.setOrigin([t.itemWidth / 2, t.itemHeight / 2]), e.indexOf("empty") > -1 && (r.style.stroke = r.style.fill, r.style.fill = "#fff", r.style.lineWidth = 2), r
}

function Cm(t, e, r, n) {
  wh(t, e, r, n), r.dispatchAction({
    type: "legendToggleSelect",
    name: t != null ? t : e
  }), _h(t, e, r, n)
}

function qS(t) {
  for (var e = t.getZr().storage.getDisplayList(), r, n = 0, i = e.length; n < i && !(r = e[n].states.emphasis);) n++;
  return r && r.hoverLayer
}

function _h(t, e, r, n) {
  qS(r) || r.dispatchAction({
    type: "highlight",
    seriesName: t,
    name: e,
    excludeSeriesId: n
  })
}

function wh(t, e, r, n) {
  qS(r) || r.dispatchAction({
    type: "downplay",
    seriesName: t,
    name: e,
    excludeSeriesId: n
  })
}
var KS = oB;

function uB(t) {
  var e = t.findComponents({
    mainType: "legend"
  });
  e && e.length && t.filterSeries(function (r) {
    for (var n = 0; n < e.length; n++)
      if (!e[n].isSelected(r.name)) return !1;
    return !0
  })
}

function Wa(t, e, r) {
  var n = {},
    i = t === "toggleSelected",
    a;
  return r.eachComponent("legend", function (o) {
    i && a != null ? o[a ? "select" : "unSelect"](e.name) : t === "allSelect" || t === "inverseSelect" ? o[t]() : (o[t](e.name), a = o.isSelected(e.name));
    var s = o.getData();
    P(s, function (l) {
      var u = l.get("name");
      if (!(u === `
` || u === "")) {
        var f = o.isSelected(u);
        n.hasOwnProperty(u) ? n[u] = n[u] && f : n[u] = f
      }
    })
  }), t === "allSelect" || t === "inverseSelect" ? {
    selected: n
  } : {
    name: e.name,
    selected: n
  }
}

function fB(t) {
  t.registerAction("legendToggleSelect", "legendselectchanged", jt(Wa, "toggleSelected")), t.registerAction("legendAllSelect", "legendselectall", jt(Wa, "allSelect")), t.registerAction("legendInverseSelect", "legendinverseselect", jt(Wa, "inverseSelect")), t.registerAction("legendSelect", "legendselected", jt(Wa, "select")), t.registerAction("legendUnSelect", "legendunselected", jt(Wa, "unSelect"))
}

function ZS(t) {
  t.registerComponentModel(yh), t.registerComponentView(KS), t.registerProcessor(t.PRIORITY.PROCESSOR.SERIES_FILTER, uB), t.registerSubTypeDefaulter("legend", function () {
    return "plain"
  }), fB(t)
}
var cB = function (t) {
  J(e, t);

  function e() {
    var r = t !== null && t.apply(this, arguments) || this;
    return r.type = e.type, r
  }
  return e.prototype.setScrollDataIndex = function (r) {
    this.option.scrollDataIndex = r
  }, e.prototype.init = function (r, n, i) {
    var a = mu(r);
    t.prototype.init.call(this, r, n, i), Tm(this, r, a)
  }, e.prototype.mergeOption = function (r, n) {
    t.prototype.mergeOption.call(this, r, n), Tm(this, this.option, r)
  }, e.type = "legend.scroll", e.defaultOption = EI(yh.defaultOption, {
    scrollDataIndex: 0,
    pageButtonItemGap: 5,
    pageButtonGap: null,
    pageButtonPosition: "end",
    pageFormatter: "{current}/{total}",
    pageIcons: {
      horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
      vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
    },
    pageIconColor: "#2f4554",
    pageIconInactiveColor: "#aaa",
    pageIconSize: 15,
    pageTextStyle: {
      color: "#333"
    },
    animationDurationUpdate: 800
  }), e
}(yh);

function Tm(t, e, r) {
  var n = t.getOrient(),
    i = [1, 1];
  i[n.index] = 0, sa(e, r, {
    type: "box",
    ignoreSize: !!i
  })
}
var hB = cB,
  Mm = ce,
  Yf = ["width", "height"],
  Xf = ["x", "y"],
  vB = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.newlineDisabled = !0, r._currentIndex = 0, r
    }
    return e.prototype.init = function () {
      t.prototype.init.call(this), this.group.add(this._containerGroup = new Mm), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Mm)
    }, e.prototype.resetInner = function () {
      t.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null
    }, e.prototype.renderInner = function (r, n, i, a, o, s, l) {
      var u = this;
      t.prototype.renderInner.call(this, r, n, i, a, o, s, l);
      var f = this._controllerGroup,
        c = n.get("pageIconSize", !0),
        h = et(c) ? c : [c, c];
      d("pagePrev", 0);
      var v = n.getModel("pageTextStyle");
      f.add(new he({
        name: "pageText",
        style: {
          text: "xx/xx",
          fill: v.getTextColor(),
          font: v.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), d("pageNext", 1);

      function d(y, g) {
        var p = y + "DataIndex",
          m = Pv(n.get("pageIcons", !0)[n.getOrient().name][g], {
            onclick: Ht(u._pageGo, u, p, n, a)
          }, {
            x: -h[0] / 2,
            y: -h[1] / 2,
            width: h[0],
            height: h[1]
          });
        m.name = y, f.add(m)
      }
    }, e.prototype.layoutInner = function (r, n, i, a, o, s) {
      var l = this.getSelectorGroup(),
        u = r.getOrient().index,
        f = Yf[u],
        c = Xf[u],
        h = Yf[1 - u],
        v = Xf[1 - u];
      o && go("horizontal", l, r.get("selectorItemGap", !0));
      var d = r.get("selectorButtonGap", !0),
        y = l.getBoundingRect(),
        g = [-y.x, -y.y],
        p = St(i);
      o && (p[f] = i[f] - y[f] - d);
      var m = this._layoutContentAndController(r, a, p, u, f, h, v, c);
      if (o) {
        if (s === "end") g[u] += m[f] + d;
        else {
          var _ = y[f] + d;
          g[u] -= _, m[c] -= _
        }
        m[f] += y[f] + d, g[1 - u] += m[v] + m[h] / 2 - y[h] / 2, m[h] = Math.max(m[h], y[h]), m[v] = Math.min(m[v], y[v] + g[1 - u]), l.x = g[0], l.y = g[1], l.markRedraw()
      }
      return m
    }, e.prototype._layoutContentAndController = function (r, n, i, a, o, s, l, u) {
      var f = this.getContentGroup(),
        c = this._containerGroup,
        h = this._controllerGroup;
      go(r.get("orient"), f, r.get("itemGap"), a ? i.width : null, a ? null : i.height), go("horizontal", h, r.get("pageButtonItemGap", !0));
      var v = f.getBoundingRect(),
        d = h.getBoundingRect(),
        y = this._showController = v[o] > i[o],
        g = [-v.x, -v.y];
      n || (g[a] = f[u]);
      var p = [0, 0],
        m = [-d.x, -d.y],
        _ = Mt(r.get("pageButtonGap", !0), r.get("itemGap", !0));
      if (y) {
        var w = r.get("pageButtonPosition", !0);
        w === "end" ? m[a] += i[o] - d[o] : p[a] += d[o] + _
      }
      m[1 - a] += v[s] / 2 - d[s] / 2, f.setPosition(g), c.setPosition(p), h.setPosition(m);
      var b = {
        x: 0,
        y: 0
      };
      if (b[o] = y ? i[o] : v[o], b[s] = Math.max(v[s], d[s]), b[l] = Math.min(0, d[l] + m[1 - a]), c.__rectSize = i[o], y) {
        var S = {
          x: 0,
          y: 0
        };
        S[o] = Math.max(i[o] - d[o] - _, 0), S[s] = b[s], c.setClipPath(new Qt({
          shape: S
        })), c.__rectSize = S[o]
      } else h.eachChild(function (T) {
        T.attr({
          invisible: !0,
          silent: !0
        })
      });
      var x = this._getPageInfo(r);
      return x.pageIndex != null && wn(f, {
        x: x.contentPosition[0],
        y: x.contentPosition[1]
      }, y ? r : null), this._updatePageInfoView(r, x), b
    }, e.prototype._pageGo = function (r, n, i) {
      var a = this._getPageInfo(n)[r];
      a != null && i.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: n.id
      })
    }, e.prototype._updatePageInfoView = function (r, n) {
      var i = this._controllerGroup;
      P(["pagePrev", "pageNext"], function (f) {
        var c = f + "DataIndex",
          h = n[c] != null,
          v = i.childOfName(f);
        v && (v.setStyle("fill", h ? r.get("pageIconColor", !0) : r.get("pageIconInactiveColor", !0)), v.cursor = h ? "pointer" : "default")
      });
      var a = i.childOfName("pageText"),
        o = r.get("pageFormatter"),
        s = n.pageIndex,
        l = s != null ? s + 1 : 0,
        u = n.pageCount;
      a && o && a.setStyle("text", nt(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }))
    }, e.prototype._getPageInfo = function (r) {
      var n = r.get("scrollDataIndex", !0),
        i = this.getContentGroup(),
        a = this._containerGroup.__rectSize,
        o = r.getOrient().index,
        s = Yf[o],
        l = Xf[o],
        u = this._findTargetItemIndex(n),
        f = i.children(),
        c = f[u],
        h = f.length,
        v = h ? 1 : 0,
        d = {
          contentPosition: [i.x, i.y],
          pageCount: v,
          pageIndex: v - 1,
          pagePrevDataIndex: null,
          pageNextDataIndex: null
        };
      if (!c) return d;
      var y = w(c);
      d.contentPosition[o] = -y.s;
      for (var g = u + 1, p = y, m = y, _ = null; g <= h; ++g) _ = w(f[g]), (!_ && m.e > p.s + a || _ && !b(_, p.s)) && (m.i > p.i ? p = m : p = _, p && (d.pageNextDataIndex == null && (d.pageNextDataIndex = p.i), ++d.pageCount)), m = _;
      for (var g = u - 1, p = y, m = y, _ = null; g >= -1; --g) _ = w(f[g]), (!_ || !b(m, _.s)) && p.i < m.i && (m = p, d.pagePrevDataIndex == null && (d.pagePrevDataIndex = p.i), ++d.pageCount, ++d.pageIndex), p = _;
      return d;

      function w(S) {
        if (S) {
          var x = S.getBoundingRect(),
            T = x[l] + S[l];
          return {
            s: T,
            e: T + x[s],
            i: S.__legendDataIndex
          }
        }
      }

      function b(S, x) {
        return S.e >= x && S.s <= x + a
      }
    }, e.prototype._findTargetItemIndex = function (r) {
      if (!this._showController) return 0;
      var n, i = this.getContentGroup(),
        a;
      return i.eachChild(function (o, s) {
        var l = o.__legendDataIndex;
        a == null && l != null && (a = s), l === r && (n = s)
      }), n != null ? n : a
    }, e.type = "legend.scroll", e
  }(KS),
  dB = vB;

function pB(t) {
  t.registerAction("legendScroll", "legendscroll", function (e, r) {
    var n = e.scrollDataIndex;
    n != null && r.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: e
    }, function (i) {
      i.setScrollDataIndex(n)
    })
  })
}

function gB(t) {
  vi(ZS), t.registerComponentModel(hB), t.registerComponentView(dB), pB(t)
}

function CN(t) {
  vi(ZS), vi(gB)
}
var yB = function (t) {
    J(e, t);

    function e() {
      var r = t !== null && t.apply(this, arguments) || this;
      return r.type = e.type, r.hasSymbolVisual = !0, r
    }
    return e.prototype.getInitialData = function (r) {
      return d2(null, this, {
        useEncodeDefaulter: !0
      })
    }, e.prototype.getLegendIcon = function (r) {
      var n = new ce,
        i = ua("line", 0, r.itemHeight / 2, r.itemWidth, 0, r.lineStyle.stroke, !1);
      n.add(i), i.setStyle(r.lineStyle);
      var a = this.getData().getVisual("symbol"),
        o = this.getData().getVisual("symbolRotate"),
        s = a === "none" ? "circle" : a,
        l = r.itemHeight * .8,
        u = ua(s, (r.itemWidth - l) / 2, (r.itemHeight - l) / 2, l, l, r.itemStyle.fill);
      n.add(u), u.setStyle(r.itemStyle);
      var f = r.iconRotate === "inherit" ? o : r.iconRotate || 0;
      return u.rotation = f * Math.PI / 180, u.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), n
    }, e.type = "series.line", e.dependencies = ["grid", "polar"], e.defaultOption = {
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      clip: !0,
      label: {
        position: "top"
      },
      endLabel: {
        show: !1,
        valueAnimation: !0,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: !0
      },
      step: !1,
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: !0,
      showAllSymbol: "auto",
      connectNulls: !1,
      sampling: "none",
      animationEasing: "linear",
      progressive: 0,
      hoverLayerThreshold: 1 / 0,
      universalTransition: {
        divideShape: "clone"
      },
      triggerLineEvent: !1
    }, e
  }(Vo),
  mB = yB;

function jS(t, e, r) {
  var n = t.getBaseAxis(),
    i = t.getOtherAxis(n),
    a = _B(i, r),
    o = n.dim,
    s = i.dim,
    l = e.mapDimension(s),
    u = e.mapDimension(o),
    f = s === "x" || s === "radius" ? 1 : 0,
    c = ct(t.dimensions, function (d) {
      return e.mapDimension(d)
    }),
    h = !1,
    v = e.getCalculationInfo("stackResultDimension");
  return Wo(e, c[0]) && (h = !0, c[0] = v), Wo(e, c[1]) && (h = !0, c[1] = v), {
    dataDimsForPoint: c,
    valueStart: a,
    valueAxisDim: s,
    baseAxisDim: o,
    stacked: !!h,
    valueDim: l,
    baseDim: u,
    baseDataOffset: f,
    stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
  }
}

function _B(t, e) {
  var r = 0,
    n = t.scale.getExtent();
  return e === "start" ? r = n[0] : e === "end" ? r = n[1] : n[0] > 0 ? r = n[0] : n[1] < 0 && (r = n[1]), r
}

function QS(t, e, r, n) {
  var i = NaN;
  t.stacked && (i = r.get(r.getCalculationInfo("stackedOverDimension"), n)), isNaN(i) && (i = t.valueStart);
  var a = t.baseDataOffset,
    o = [];
  return o[a] = r.get(t.baseDim, n), o[1 - a] = i, e.dataToPoint(o)
}

function wB(t, e) {
  var r = [];
  return e.diff(t).add(function (n) {
    r.push({
      cmd: "+",
      idx: n
    })
  }).update(function (n, i) {
    r.push({
      cmd: "=",
      idx: i,
      idx1: n
    })
  }).remove(function (n) {
    r.push({
      cmd: "-",
      idx: n
    })
  }).execute(), r
}

function SB(t, e, r, n, i, a, o, s) {
  for (var l = wB(t, e), u = [], f = [], c = [], h = [], v = [], d = [], y = [], g = jS(i, e, o), p = t.getLayout("points") || [], m = e.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var w = l[_],
      b = !0,
      S = void 0,
      x = void 0;
    switch (w.cmd) {
      case "=":
        S = w.idx * 2, x = w.idx1 * 2;
        var T = p[S],
          M = p[S + 1],
          D = m[x],
          I = m[x + 1];
        (isNaN(T) || isNaN(M)) && (T = D, M = I), u.push(T, M), f.push(D, I), c.push(r[S], r[S + 1]), h.push(n[x], n[x + 1]), y.push(e.getRawIndex(w.idx1));
        break;
      case "+":
        var A = w.idx,
          L = g.dataDimsForPoint,
          O = i.dataToPoint([e.get(L[0], A), e.get(L[1], A)]);
        x = A * 2, u.push(O[0], O[1]), f.push(m[x], m[x + 1]);
        var H = QS(g, i, e, A);
        c.push(H[0], H[1]), h.push(n[x], n[x + 1]), y.push(e.getRawIndex(A));
        break;
      case "-":
        b = !1
    }
    b && (v.push(w), d.push(d.length))
  }
  d.sort(function (k, W) {
    return y[k] - y[W]
  });
  for (var B = u.length, Q = Ui(B), G = Ui(B), Z = Ui(B), lt = Ui(B), _t = [], _ = 0; _ < d.length; _++) {
    var yt = d[_],
      pt = _ * 2,
      At = yt * 2;
    Q[pt] = u[At], Q[pt + 1] = u[At + 1], G[pt] = f[At], G[pt + 1] = f[At + 1], Z[pt] = c[At], Z[pt + 1] = c[At + 1], lt[pt] = h[At], lt[pt + 1] = h[At + 1], _t[_] = v[yt]
  }
  return {
    current: Q,
    next: G,
    stackedOnCurrent: Z,
    stackedOnNext: lt,
    status: _t
  }
}
var jr = Math.min,
  Qr = Math.max;

function ai(t, e) {
  return isNaN(t) || isNaN(e)
}

function Sh(t, e, r, n, i, a, o, s, l) {
  for (var u, f, c, h, v, d, y = r, g = 0; g < n; g++) {
    var p = e[y * 2],
      m = e[y * 2 + 1];
    if (y >= i || y < 0) break;
    if (ai(p, m)) {
      if (l) {
        y += a;
        continue
      }
      break
    }
    if (y === r) t[a > 0 ? "moveTo" : "lineTo"](p, m), c = p, h = m;
    else {
      var _ = p - u,
        w = m - f;
      if (_ * _ + w * w < .5) {
        y += a;
        continue
      }
      if (o > 0) {
        for (var b = y + a, S = e[b * 2], x = e[b * 2 + 1]; S === p && x === m && g < n;) g++, b += a, y += a, S = e[b * 2], x = e[b * 2 + 1], p = e[y * 2], m = e[y * 2 + 1], _ = p - u, w = m - f;
        var T = g + 1;
        if (l)
          for (; ai(S, x) && T < n;) T++, b += a, S = e[b * 2], x = e[b * 2 + 1];
        var M = .5,
          D = 0,
          I = 0,
          A = void 0,
          L = void 0;
        if (T >= n || ai(S, x)) v = p, d = m;
        else {
          D = S - u, I = x - f;
          var O = p - u,
            H = S - p,
            B = m - f,
            Q = x - m,
            G = void 0,
            Z = void 0;
          if (s === "x") {
            G = Math.abs(O), Z = Math.abs(H);
            var lt = D > 0 ? 1 : -1;
            v = p - lt * G * o, d = m, A = p + lt * Z * o, L = m
          } else if (s === "y") {
            G = Math.abs(B), Z = Math.abs(Q);
            var _t = I > 0 ? 1 : -1;
            v = p, d = m - _t * G * o, A = p, L = m + _t * Z * o
          } else G = Math.sqrt(O * O + B * B), Z = Math.sqrt(H * H + Q * Q), M = Z / (Z + G), v = p - D * o * (1 - M), d = m - I * o * (1 - M), A = p + D * o * M, L = m + I * o * M, A = jr(A, Qr(S, p)), L = jr(L, Qr(x, m)), A = Qr(A, jr(S, p)), L = Qr(L, jr(x, m)), D = A - p, I = L - m, v = p - D * G / Z, d = m - I * G / Z, v = jr(v, Qr(u, p)), d = jr(d, Qr(f, m)), v = Qr(v, jr(u, p)), d = Qr(d, jr(f, m)), D = p - v, I = m - d, A = p + D * Z / G, L = m + I * Z / G
        }
        t.bezierCurveTo(c, h, v, d, p, m), c = A, h = L
      } else t.lineTo(p, m)
    }
    u = p, f = m, y += a
  }
  return g
}
var JS = function () {
    function t() {
      this.smooth = 0, this.smoothConstraint = !0
    }
    return t
  }(),
  bB = function (t) {
    J(e, t);

    function e(r) {
      var n = t.call(this, r) || this;
      return n.type = "ec-polyline", n
    }
    return e.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      }
    }, e.prototype.getDefaultShape = function () {
      return new JS
    }, e.prototype.buildPath = function (r, n) {
      var i = n.points,
        a = 0,
        o = i.length / 2;
      if (n.connectNulls) {
        for (; o > 0 && ai(i[o * 2 - 2], i[o * 2 - 1]); o--);
        for (; a < o && ai(i[a * 2], i[a * 2 + 1]); a++);
      }
      for (; a < o;) a += Sh(r, i, a, o, o, 1, n.smooth, n.smoothMonotone, n.connectNulls) + 1
    }, e.prototype.getPointOn = function (r, n) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var i = this.path, a = i.data, o = fi.CMD, s, l, u = n === "x", f = [], c = 0; c < a.length;) {
        var h = a[c++],
          v = void 0,
          d = void 0,
          y = void 0,
          g = void 0,
          p = void 0,
          m = void 0,
          _ = void 0;
        switch (h) {
          case o.M:
            s = a[c++], l = a[c++];
            break;
          case o.L:
            if (v = a[c++], d = a[c++], _ = u ? (r - s) / (v - s) : (r - l) / (d - l), _ <= 1 && _ >= 0) {
              var w = u ? (d - l) * _ + l : (v - s) * _ + s;
              return u ? [r, w] : [w, r]
            }
            s = v, l = d;
            break;
          case o.C:
            v = a[c++], d = a[c++], y = a[c++], g = a[c++], p = a[c++], m = a[c++];
            var b = u ? Sl(s, v, y, p, r, f) : Sl(l, d, g, m, r, f);
            if (b > 0)
              for (var S = 0; S < b; S++) {
                var x = f[S];
                if (x <= 1 && x >= 0) {
                  var w = u ? Xt(l, d, g, m, x) : Xt(s, v, y, p, x);
                  return u ? [r, w] : [w, r]
                }
              }
            s = p, l = m;
            break
        }
      }
    }, e
  }(kt),
  xB = function (t) {
    J(e, t);

    function e() {
      return t !== null && t.apply(this, arguments) || this
    }
    return e
  }(JS),
  CB = function (t) {
    J(e, t);

    function e(r) {
      var n = t.call(this, r) || this;
      return n.type = "ec-polygon", n
    }
    return e.prototype.getDefaultShape = function () {
      return new xB
    }, e.prototype.buildPath = function (r, n) {
      var i = n.points,
        a = n.stackedOnPoints,
        o = 0,
        s = i.length / 2,
        l = n.smoothMonotone;
      if (n.connectNulls) {
        for (; s > 0 && ai(i[s * 2 - 2], i[s * 2 - 1]); s--);
        for (; o < s && ai(i[o * 2], i[o * 2 + 1]); o++);
      }
      for (; o < s;) {
        var u = Sh(r, i, o, s, s, 1, n.smooth, l, n.connectNulls);
        Sh(r, a, o + u - 1, u, s, -1, n.stackedOnSmooth, l, n.connectNulls), o += u + 1, r.closePath()
      }
    }, e
  }(kt);

function TB(t, e, r, n, i) {
  var a = t.getArea(),
    o = a.x,
    s = a.y,
    l = a.width,
    u = a.height,
    f = r.get(["lineStyle", "width"]) || 2;
  o -= f / 2, s -= f / 2, l += f, u += f, o = Math.floor(o), l = Math.round(l);
  var c = new Qt({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (e) {
    var h = t.getBaseAxis(),
      v = h.isHorizontal(),
      d = h.inverse;
    v ? (d && (c.shape.x += l), c.shape.width = 0) : (d || (c.shape.y += u), c.shape.height = 0);
    var y = dt(i) ? function (g) {
      i(g, c)
    } : null;
    Jo(c, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, r, null, n, y)
  }
  return c
}

function MB(t, e, r) {
  var n = t.getArea(),
    i = Yt(n.r0, 1),
    a = Yt(n.r, 1),
    o = new Cv({
      shape: {
        cx: Yt(t.cx, 1),
        cy: Yt(t.cy, 1),
        r0: i,
        r: a,
        startAngle: n.startAngle,
        endAngle: n.endAngle,
        clockwise: n.clockwise
      }
    });
  if (e) {
    var s = t.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = n.startAngle : o.shape.r = i, Jo(o, {
      shape: {
        endAngle: n.endAngle,
        r: a
      }
    }, r)
  }
  return o
}

function Dm(t, e) {
  if (t.length === e.length) {
    for (var r = 0; r < t.length; r++)
      if (t[r] !== e[r]) return;
    return !0
  }
}

function Am(t) {
  for (var e = 1 / 0, r = 1 / 0, n = -1 / 0, i = -1 / 0, a = 0; a < t.length;) {
    var o = t[a++],
      s = t[a++];
    isNaN(o) || (e = Math.min(o, e), n = Math.max(o, n)), isNaN(s) || (r = Math.min(s, r), i = Math.max(s, i))
  }
  return [
    [e, r],
    [n, i]
  ]
}

function Pm(t, e) {
  var r = Am(t),
    n = r[0],
    i = r[1],
    a = Am(e),
    o = a[0],
    s = a[1];
  return Math.max(Math.abs(n[0] - o[0]), Math.abs(n[1] - o[1]), Math.abs(i[0] - s[0]), Math.abs(i[1] - s[1]))
}

function Im(t) {
  return $t(t) ? t : t ? .5 : 0
}

function DB(t, e, r) {
  if (!r.valueDim) return [];
  for (var n = e.count(), i = Ui(n * 2), a = 0; a < n; a++) {
    var o = QS(r, t, e, a);
    i[a * 2] = o[0], i[a * 2 + 1] = o[1]
  }
  return i
}

function Jr(t, e, r, n) {
  var i = e.getBaseAxis(),
    a = i.dim === "x" || i.dim === "radius" ? 0 : 1,
    o = [],
    s = 0,
    l = [],
    u = [],
    f = [],
    c = [];
  if (n) {
    for (s = 0; s < t.length; s += 2) !isNaN(t[s]) && !isNaN(t[s + 1]) && c.push(t[s], t[s + 1]);
    t = c
  }
  for (s = 0; s < t.length - 2; s += 2) switch (f[0] = t[s + 2], f[1] = t[s + 3], u[0] = t[s], u[1] = t[s + 1], o.push(u[0], u[1]), r) {
    case "end":
      l[a] = f[a], l[1 - a] = u[1 - a], o.push(l[0], l[1]);
      break;
    case "middle":
      var h = (u[a] + f[a]) / 2,
        v = [];
      l[a] = v[a] = h, l[1 - a] = u[1 - a], v[1 - a] = f[1 - a], o.push(l[0], l[1]), o.push(v[0], v[1]);
      break;
    default:
      l[a] = u[a], l[1 - a] = f[1 - a], o.push(l[0], l[1])
  }
  return o.push(t[s++], t[s++]), o
}

function AB(t, e) {
  var r = [],
    n = t.length,
    i, a;

  function o(f, c, h) {
    var v = f.coord,
      d = (h - v) / (c.coord - v),
      y = YM(d, [f.color, c.color]);
    return {
      coord: h,
      color: y
    }
  }
  for (var s = 0; s < n; s++) {
    var l = t[s],
      u = l.coord;
    if (u < 0) i = l;
    else if (u > e) {
      a ? r.push(o(a, l, e)) : i && r.push(o(i, l, 0), o(i, l, e));
      break
    } else i && (r.push(o(i, l, 0)), i = null), r.push(l), a = l
  }
  return r
}

function PB(t, e, r) {
  var n = t.getVisual("visualMeta");
  if (!(!n || !n.length || !t.count()) && e.type === "cartesian2d") {
    for (var i, a, o = n.length - 1; o >= 0; o--) {
      var s = t.getDimensionInfo(n[o].dimension);
      if (i = s && s.coordDim, i === "x" || i === "y") {
        a = n[o];
        break
      }
    }
    if (!!a) {
      var l = e.getAxis(i),
        u = ct(a.stops, function (_) {
          return {
            coord: l.toGlobalCoord(l.dataToCoord(_.value)),
            color: _.color
          }
        }),
        f = u.length,
        c = a.outerColors.slice();
      f && u[0].coord > u[f - 1].coord && (u.reverse(), c.reverse());
      var h = AB(u, i === "x" ? r.getWidth() : r.getHeight()),
        v = h.length;
      if (!v && f) return u[0].coord < 0 ? c[1] ? c[1] : u[f - 1].color : c[0] ? c[0] : u[0].color;
      var d = 10,
        y = h[0].coord - d,
        g = h[v - 1].coord + d,
        p = g - y;
      if (p < .001) return "transparent";
      P(h, function (_) {
        _.offset = (_.coord - y) / p
      }), h.push({
        offset: v ? h[v - 1].offset : .5,
        color: c[1] || "transparent"
      }), h.unshift({
        offset: v ? h[0].offset : .5,
        color: c[0] || "transparent"
      });
      var m = new R1(0, 0, 0, 0, h, !0);
      return m[i] = y, m[i + "2"] = g, m
    }
  }
}

function IB(t, e, r) {
  var n = t.get("showAllSymbol"),
    i = n === "auto";
  if (!(n && !i)) {
    var a = r.getAxesByScale("ordinal")[0];
    if (!!a && !(i && EB(a, e))) {
      var o = e.mapDimension(a.dim),
        s = {};
      return P(a.getViewLabels(), function (l) {
          var u = a.scale.getRawOrdinalNumber(l.tickValue);
          s[u] = 1
        }),
        function (l) {
          return !s.hasOwnProperty(e.get(o, l))
        }
    }
  }
}

function EB(t, e) {
  var r = t.getExtent(),
    n = Math.abs(r[1] - r[0]) / t.scale.count();
  isNaN(n) && (n = 0);
  for (var i = e.count(), a = Math.max(1, Math.round(i / 5)), o = 0; o < i; o += a)
    if (ad.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] * 1.5 > n) return !1;
  return !0
}

function LB(t, e) {
  return isNaN(t) || isNaN(e)
}

function RB(t) {
  for (var e = t.length / 2; e > 0 && LB(t[e * 2 - 2], t[e * 2 - 1]); e--);
  return e - 1
}

function Em(t, e) {
  return [t[e * 2], t[e * 2 + 1]]
}

function OB(t, e, r) {
  for (var n = t.length / 2, i = r === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0; u < n; u++)
    if (o = t[u * 2 + i], !(isNaN(o) || isNaN(t[u * 2 + 1 - i]))) {
      if (u === 0) {
        a = o;
        continue
      }
      if (a <= e && o >= e || a >= e && o <= e) {
        l = u;
        break
      }
      s = u, a = o
    } return {
    range: [s, l],
    t: (e - a) / (o - a)
  }
}

function tb(t) {
  if (t.get(["endLabel", "show"])) return !0;
  for (var e = 0; e < yr.length; e++)
    if (t.get([yr[e], "endLabel", "show"])) return !0;
  return !1
}

function qf(t, e, r, n) {
  if (nB(e, "cartesian2d")) {
    var i = n.getModel("endLabel"),
      a = i.get("valueAnimation"),
      o = n.getData(),
      s = {
        lastFrameIndex: 0
      },
      l = tb(n) ? function (v, d) {
        t._endLabelOnDuring(v, d, o, s, a, i, e)
      } : null,
      u = e.getBaseAxis().isHorizontal(),
      f = TB(e, r, n, function () {
        var v = t._endLabel;
        v && r && s.originalX != null && v.attr({
          x: s.originalX,
          y: s.originalY
        })
      }, l);
    if (!n.get("clip", !0)) {
      var c = f.shape,
        h = Math.max(c.width, c.height);
      u ? (c.y -= h, c.height += h * 2) : (c.x -= h, c.width += h * 2)
    }
    return l && l(1, f), f
  } else return MB(e, r, n)
}

function kB(t, e) {
  var r = e.getBaseAxis(),
    n = r.isHorizontal(),
    i = r.inverse,
    a = n ? i ? "right" : "left" : "center",
    o = n ? "middle" : i ? "top" : "bottom";
  return {
    normal: {
      align: t.get("align") || a,
      verticalAlign: t.get("verticalAlign") || o
    }
  }
}
var BB = function (t) {
    J(e, t);

    function e() {
      return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.init = function () {
      var r = new ce,
        n = new rB;
      this.group.add(n.group), this._symbolDraw = n, this._lineGroup = r
    }, e.prototype.render = function (r, n, i) {
      var a = this,
        o = r.coordinateSystem,
        s = this.group,
        l = r.getData(),
        u = r.getModel("lineStyle"),
        f = r.getModel("areaStyle"),
        c = l.getLayout("points") || [],
        h = o.type === "polar",
        v = this._coordSys,
        d = this._symbolDraw,
        y = this._polyline,
        g = this._polygon,
        p = this._lineGroup,
        m = r.get("animation"),
        _ = !f.isEmpty(),
        w = f.get("origin"),
        b = jS(o, l, w),
        S = _ && DB(o, l, b),
        x = r.get("showSymbol"),
        T = r.get("connectNulls"),
        M = x && !h && IB(r, l, o),
        D = this._data;
      D && D.eachItemGraphicEl(function (W, V) {
        W.__temp && (s.remove(W), D.setItemGraphicEl(V, null))
      }), x || d.remove(), s.add(p);
      var I = h ? !1 : r.get("step"),
        A;
      o && o.getArea && r.get("clip", !0) && (A = o.getArea(), A.width != null ? (A.x -= .1, A.y -= .1, A.width += .2, A.height += .2) : A.r0 && (A.r0 -= .5, A.r += .5)), this._clipShapeForSymbol = A;
      var L = PB(l, o, i) || l.getVisual("style")[l.getVisual("drawType")];
      if (!(y && v.type === o.type && I === this._step)) x && d.updateData(l, {
        isIgnore: M,
        clipShape: A,
        disableAnimation: !0,
        getSymbolPoint: function (W) {
          return [c[W * 2], c[W * 2 + 1]]
        }
      }), m && this._initSymbolLabelAnimation(l, o, A), I && (c = Jr(c, o, I, T), S && (S = Jr(S, o, I, T))), y = this._newPolyline(c), _ && (g = this._newPolygon(c, S)), h || this._initOrUpdateEndLabel(r, o, hi(L)), p.setClipPath(qf(this, o, !0, r));
      else {
        _ && !g ? g = this._newPolygon(c, S) : g && !_ && (p.remove(g), g = this._polygon = null), h || this._initOrUpdateEndLabel(r, o, hi(L));
        var O = p.getClipPath();
        if (O) {
          var H = qf(this, o, !1, r);
          Jo(O, {
            shape: H.shape
          }, r)
        } else p.setClipPath(qf(this, o, !0, r));
        x && d.updateData(l, {
          isIgnore: M,
          clipShape: A,
          disableAnimation: !0,
          getSymbolPoint: function (W) {
            return [c[W * 2], c[W * 2 + 1]]
          }
        }), (!Dm(this._stackedOnPoints, S) || !Dm(this._points, c)) && (m ? this._doUpdateAnimation(l, S, o, i, I, w, T) : (I && (c = Jr(c, o, I, T), S && (S = Jr(S, o, I, T))), y.setShape({
          points: c
        }), g && g.setShape({
          points: c,
          stackedOnPoints: S
        })))
      }
      var B = r.getModel("emphasis"),
        Q = B.get("focus"),
        G = B.get("blurScope"),
        Z = B.get("disabled");
      if (y.useStyle(Dt(u.getLineStyle(), {
          fill: "none",
          stroke: L,
          lineJoin: "bevel"
        })), vg(y, r, "lineStyle"), y.style.lineWidth > 0 && r.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var lt = y.getState("emphasis").style;
        lt.lineWidth = +y.style.lineWidth + 1
      }
      Bt(y).seriesIndex = r.seriesIndex, Wc(y, Q, G, Z);
      var _t = Im(r.get("smooth")),
        yt = r.get("smoothMonotone");
      if (y.setShape({
          smooth: _t,
          smoothMonotone: yt,
          connectNulls: T
        }), g) {
        var pt = l.getCalculationInfo("stackedOnSeries"),
          At = 0;
        g.useStyle(Dt(f.getAreaStyle(), {
          fill: L,
          opacity: .7,
          lineJoin: "bevel",
          decal: l.getVisual("style").decal
        })), pt && (At = Im(pt.get("smooth"))), g.setShape({
          smooth: _t,
          stackedOnSmooth: At,
          smoothMonotone: yt,
          connectNulls: T
        }), vg(g, r, "areaStyle"), Bt(g).seriesIndex = r.seriesIndex, Wc(g, Q, G, Z)
      }
      var k = function (W) {
        a._changePolyState(W)
      };
      l.eachItemGraphicEl(function (W) {
        W && (W.onHoverStateChange = k)
      }), this._polyline.onHoverStateChange = k, this._data = l, this._coordSys = o, this._stackedOnPoints = S, this._points = c, this._step = I, this._valueOrigin = w, r.get("triggerLineEvent") && (this.packEventData(r, y), g && this.packEventData(r, g))
    }, e.prototype.packEventData = function (r, n) {
      Bt(n).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: r.componentIndex,
        seriesIndex: r.seriesIndex,
        seriesName: r.name,
        seriesType: "line"
      }
    }, e.prototype.highlight = function (r, n, i, a) {
      var o = r.getData(),
        s = ui(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"),
          u = o.getItemGraphicEl(s);
        if (!u) {
          var f = l[s * 2],
            c = l[s * 2 + 1];
          if (isNaN(f) || isNaN(c) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(f, c)) return;
          var h = r.get("zlevel"),
            v = r.get("z");
          u = new ad(o, s), u.x = f, u.y = c, u.setZ(h, v);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = h, d.z = v, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u)
        }
        u.highlight()
      } else gn.prototype.highlight.call(this, r, n, i, a)
    }, e.prototype.downplay = function (r, n, i, a) {
      var o = r.getData(),
        s = ui(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay())
      } else gn.prototype.downplay.call(this, r, n, i, a)
    }, e.prototype._changePolyState = function (r) {
      var n = this._polygon;
      lg(this._polyline, r), n && lg(n, r)
    }, e.prototype._newPolyline = function (r) {
      var n = this._polyline;
      return n && this._lineGroup.remove(n), n = new bB({
        shape: {
          points: r
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(n), this._polyline = n, n
    }, e.prototype._newPolygon = function (r, n) {
      var i = this._polygon;
      return i && this._lineGroup.remove(i), i = new CB({
        shape: {
          points: r,
          stackedOnPoints: n
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(i), this._polygon = i, i
    }, e.prototype._initSymbolLabelAnimation = function (r, n, i) {
      var a, o, s = n.getBaseAxis(),
        l = s.inverse;
      n.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : n.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = r.hostModel,
        f = u.get("animationDuration");
      dt(f) && (f = f(null));
      var c = u.get("animationDelay") || 0,
        h = dt(c) ? c(null) : c;
      r.eachItemGraphicEl(function (v, d) {
        var y = v;
        if (y) {
          var g = [v.x, v.y],
            p = void 0,
            m = void 0,
            _ = void 0;
          if (i)
            if (o) {
              var w = i,
                b = n.pointToCoord(g);
              a ? (p = w.startAngle, m = w.endAngle, _ = -b[1] / 180 * Math.PI) : (p = w.r0, m = w.r, _ = b[0])
            } else {
              var S = i;
              a ? (p = S.x, m = S.x + S.width, _ = v.x) : (p = S.y + S.height, m = S.y, _ = v.y)
            } var x = m === p ? 0 : (_ - p) / (m - p);
          l && (x = 1 - x);
          var T = dt(c) ? c(d) : f * x + h,
            M = y.getSymbolPath(),
            D = M.getTextContent();
          y.attr({
            scaleX: 0,
            scaleY: 0
          }), y.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: T
          }), D && D.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: T
          }), M.disableLabelAnimation = !0
        }
      })
    }, e.prototype._initOrUpdateEndLabel = function (r, n, i) {
      var a = r.getModel("endLabel");
      if (tb(r)) {
        var o = r.getData(),
          s = this._polyline,
          l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new he({
          z2: 200
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var f = RB(l);
        f >= 0 && (Lv(s, Rv(r, "endLabel"), {
          inheritColor: i,
          labelFetcher: r,
          labelDataIndex: f,
          defaultText: function (c, h, v) {
            return v != null ? Qk(o, v) : XS(o, c)
          },
          enableTextSetter: !0
        }, kB(a, n)), s.textConfig.position = null)
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null)
    }, e.prototype._endLabelOnDuring = function (r, n, i, a, o, s, l) {
      var u = this._endLabel,
        f = this._polyline;
      if (u) {
        r < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var c = i.getLayout("points"),
          h = i.hostModel,
          v = h.get("connectNulls"),
          d = s.get("precision"),
          y = s.get("distance") || 0,
          g = l.getBaseAxis(),
          p = g.isHorizontal(),
          m = g.inverse,
          _ = n.shape,
          w = m ? p ? _.x : _.y + _.height : p ? _.x + _.width : _.y,
          b = (p ? y : 0) * (m ? -1 : 1),
          S = (p ? 0 : -y) * (m ? -1 : 1),
          x = p ? "x" : "y",
          T = OB(c, w, x),
          M = T.range,
          D = M[1] - M[0],
          I = void 0;
        if (D >= 1) {
          if (D > 1 && !v) {
            var A = Em(c, M[0]);
            u.attr({
              x: A[0] + b,
              y: A[1] + S
            }), o && (I = h.getRawValue(M[0]))
          } else {
            var A = f.getPointOn(w, x);
            A && u.attr({
              x: A[0] + b,
              y: A[1] + S
            });
            var L = h.getRawValue(M[0]),
              O = h.getRawValue(M[1]);
            o && (I = qD(i, d, L, O, T.t))
          }
          a.lastFrameIndex = M[0]
        } else {
          var H = r === 1 || a.lastFrameIndex > 0 ? M[0] : 0,
            A = Em(c, H);
          o && (I = h.getRawValue(H)), u.attr({
            x: A[0] + b,
            y: A[1] + S
          })
        }
        o && z1(u).setLabelText(I)
      }
    }, e.prototype._doUpdateAnimation = function (r, n, i, a, o, s, l) {
      var u = this._polyline,
        f = this._polygon,
        c = r.hostModel,
        h = SB(this._data, r, this._stackedOnPoints, n, this._coordSys, i, this._valueOrigin),
        v = h.current,
        d = h.stackedOnCurrent,
        y = h.next,
        g = h.stackedOnNext;
      if (o && (v = Jr(h.current, i, o, l), d = Jr(h.stackedOnCurrent, i, o, l), y = Jr(h.next, i, o, l), g = Jr(h.stackedOnNext, i, o, l)), Pm(v, y) > 3e3 || f && Pm(d, g) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: y
        }), f && (f.stopAnimation(), f.setShape({
          points: y,
          stackedOnPoints: g
        }));
        return
      }
      u.shape.__points = h.current, u.shape.points = v;
      var p = {
        shape: {
          points: y
        }
      };
      h.current !== v && (p.shape.__points = h.next), u.stopAnimation(), wn(u, p, c), f && (f.setShape({
        points: v,
        stackedOnPoints: d
      }), f.stopAnimation(), wn(f, {
        shape: {
          stackedOnPoints: g
        }
      }, c), u.shape.points !== f.shape.points && (f.shape.points = u.shape.points));
      for (var m = [], _ = h.status, w = 0; w < _.length; w++) {
        var b = _[w].cmd;
        if (b === "=") {
          var S = r.getItemGraphicEl(_[w].idx1);
          S && m.push({
            el: S,
            ptIdx: w
          })
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function () {
        f && f.dirtyShape();
        for (var x = u.shape.__points, T = 0; T < m.length; T++) {
          var M = m[T].el,
            D = m[T].ptIdx * 2;
          M.x = x[D], M.y = x[D + 1], M.markRedraw()
        }
      })
    }, e.prototype.remove = function (r) {
      var n = this.group,
        i = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), i && i.eachItemGraphicEl(function (a, o) {
        a.__temp && (n.remove(a), i.setItemGraphicEl(o, null))
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null
    }, e.type = "line", e
  }(gn),
  NB = BB;

function FB(t, e) {
  return {
    seriesType: t,
    plan: Dw(),
    reset: function (r) {
      var n = r.getData(),
        i = r.coordinateSystem,
        a = r.pipelineContext,
        o = e || a.large;
      if (!!i) {
        var s = ct(i.dimensions, function (v) {
            return n.mapDimension(v)
          }).slice(0, 2),
          l = s.length,
          u = n.getCalculationInfo("stackResultDimension");
        Wo(n, s[0]) && (s[0] = u), Wo(n, s[1]) && (s[1] = u);
        var f = n.getStore(),
          c = n.getDimensionIndex(s[0]),
          h = n.getDimensionIndex(s[1]);
        return l && {
          progress: function (v, d) {
            for (var y = v.end - v.start, g = o && Ui(y * l), p = [], m = [], _ = v.start, w = 0; _ < v.end; _++) {
              var b = void 0;
              if (l === 1) {
                var S = f.get(c, _);
                b = i.dataToPoint(S, null, m)
              } else p[0] = f.get(c, _), p[1] = f.get(h, _), b = i.dataToPoint(p, null, m);
              o ? (g[w++] = b[0], g[w++] = b[1]) : d.setItemLayout(_, b.slice())
            }
            o && d.setLayout("points", g)
          }
        }
      }
    }
  }
}
var zB = {
    average: function (t) {
      for (var e = 0, r = 0, n = 0; n < t.length; n++) isNaN(t[n]) || (e += t[n], r++);
      return r === 0 ? NaN : e / r
    },
    sum: function (t) {
      for (var e = 0, r = 0; r < t.length; r++) e += t[r] || 0;
      return e
    },
    max: function (t) {
      for (var e = -1 / 0, r = 0; r < t.length; r++) t[r] > e && (e = t[r]);
      return isFinite(e) ? e : NaN
    },
    min: function (t) {
      for (var e = 1 / 0, r = 0; r < t.length; r++) t[r] < e && (e = t[r]);
      return isFinite(e) ? e : NaN
    },
    nearest: function (t) {
      return t[0]
    }
  },
  HB = function (t) {
    return Math.round(t.length / 2)
  };

function VB(t) {
  return {
    seriesType: t,
    reset: function (e, r, n) {
      var i = e.getData(),
        a = e.get("sampling"),
        o = e.coordinateSystem,
        s = i.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(),
          u = o.getOtherAxis(l),
          f = l.getExtent(),
          c = n.getDevicePixelRatio(),
          h = Math.abs(f[1] - f[0]) * (c || 1),
          v = Math.round(s / h);
        if (isFinite(v) && v > 1) {
          a === "lttb" && e.setData(i.lttbDownSample(i.mapDimension(u.dim), 1 / v));
          var d = void 0;
          nt(a) ? d = zB[a] : dt(a) && (d = a), d && e.setData(i.downSample(i.mapDimension(u.dim), 1 / v, d, HB))
        }
      }
    }
  }
}

function TN(t) {
  t.registerChartView(NB), t.registerSeriesModel(mB), t.registerLayout(FB("line", !0)), t.registerVisual({
    seriesType: "line",
    reset: function (e) {
      var r = e.getData(),
        n = e.getModel("lineStyle").getLineStyle();
      n && !n.stroke && (n.stroke = r.getVisual("style").fill), r.setVisual("legendLineStyle", n)
    }
  }), t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, VB("line"))
}

function Lm(t, e, r) {
  var n = di.createCanvas(),
    i = e.getWidth(),
    a = e.getHeight(),
    o = n.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = i + "px", o.height = a + "px", n.setAttribute("data-zr-dom-id", t)), n.width = i * r, n.height = a * r, n
}
var $B = function (t) {
    J(e, t);

    function e(r, n, i) {
      var a = t.call(this) || this;
      a.motionBlur = !1, a.lastFrameAlpha = .7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
      var o;
      i = i || Ml, typeof r == "string" ? o = Lm(r, n, i) : st(r) && (o = r, r = o.id), a.id = r, a.dom = o;
      var s = o.style;
      return s && (c_(o), o.onselectstart = function () {
        return !1
      }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = n, a.dpr = i, a
    }
    return e.prototype.getElementCount = function () {
      return this.__endIndex - this.__startIndex
    }, e.prototype.afterBrush = function () {
      this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex
    }, e.prototype.initContext = function () {
      this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
    }, e.prototype.setUnpainted = function () {
      this.__firstTimePaint = !0
    }, e.prototype.createBackBuffer = function () {
      var r = this.dpr;
      this.domBack = Lm("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r)
    }, e.prototype.createRepaintRects = function (r, n, i, a) {
      if (this.__firstTimePaint) return this.__firstTimePaint = !1, null;
      var o = [],
        s = this.maxRepaintRectCount,
        l = !1,
        u = new Ot(0, 0, 0, 0);

      function f(m) {
        if (!(!m.isFinite() || m.isZero()))
          if (o.length === 0) {
            var _ = new Ot(0, 0, 0, 0);
            _.copy(m), o.push(_)
          } else {
            for (var w = !1, b = 1 / 0, S = 0, x = 0; x < o.length; ++x) {
              var T = o[x];
              if (T.intersect(m)) {
                var M = new Ot(0, 0, 0, 0);
                M.copy(T), M.union(m), o[x] = M, w = !0;
                break
              } else if (l) {
                u.copy(m), u.union(T);
                var D = m.width * m.height,
                  I = T.width * T.height,
                  A = u.width * u.height,
                  L = A - D - I;
                L < b && (b = L, S = x)
              }
            }
            if (l && (o[S].union(m), w = !0), !w) {
              var _ = new Ot(0, 0, 0, 0);
              _.copy(m), o.push(_)
            }
            l || (l = o.length >= s)
          }
      }
      for (var c = this.__startIndex; c < this.__endIndex; ++c) {
        var h = r[c];
        if (h) {
          var v = h.shouldBePainted(i, a, !0, !0),
            d = h.__isRendered && (h.__dirty & Te || !v) ? h.getPrevPaintRect() : null;
          d && f(d);
          var y = v && (h.__dirty & Te || !h.__isRendered) ? h.getPaintRect() : null;
          y && f(y)
        }
      }
      for (var c = this.__prevStartIndex; c < this.__prevEndIndex; ++c) {
        var h = n[c],
          v = h.shouldBePainted(i, a, !0, !0);
        if (h && (!v || !h.__zr) && h.__isRendered) {
          var d = h.getPrevPaintRect();
          d && f(d)
        }
      }
      var g;
      do {
        g = !1;
        for (var c = 0; c < o.length;) {
          if (o[c].isZero()) {
            o.splice(c, 1);
            continue
          }
          for (var p = c + 1; p < o.length;) o[c].intersect(o[p]) ? (g = !0, o[c].union(o[p]), o.splice(p, 1)) : p++;
          c++
        }
      } while (g);
      return this._paintRects = o, o
    }, e.prototype.debugGetPaintRects = function () {
      return (this._paintRects || []).slice()
    }, e.prototype.resize = function (r, n) {
      var i = this.dpr,
        a = this.dom,
        o = a.style,
        s = this.domBack;
      o && (o.width = r + "px", o.height = n + "px"), a.width = r * i, a.height = n * i, s && (s.width = r * i, s.height = n * i, i !== 1 && this.ctxBack.scale(i, i))
    }, e.prototype.clear = function (r, n, i) {
      var a = this.dom,
        o = this.ctx,
        s = a.width,
        l = a.height;
      n = n || this.clearColor;
      var u = this.motionBlur && !r,
        f = this.lastFrameAlpha,
        c = this.dpr,
        h = this;
      u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / c, l / c));
      var v = this.domBack;

      function d(y, g, p, m) {
        if (o.clearRect(y, g, p, m), n && n !== "transparent") {
          var _ = void 0;
          eu(n) ? (_ = n.__canvasGradient || ih(o, n, {
            x: 0,
            y: 0,
            width: p,
            height: m
          }), n.__canvasGradient = _) : tM(n) && (_ = ah(o, n, {
            dirty: function () {
              h.setUnpainted(), h.__painter.refresh()
            }
          })), o.save(), o.fillStyle = _ || n, o.fillRect(y, g, p, m), o.restore()
        }
        u && (o.save(), o.globalAlpha = f, o.drawImage(v, y, g, p, m), o.restore())
      }!i || u ? d(0, 0, s, l) : i.length && P(i, function (y) {
        d(y.x * c, y.y * c, y.width * c, y.height * c)
      })
    }, e
  }(_r),
  Kf = $B,
  Rm = 1e5,
  Xn = 314159,
  Ws = .01,
  GB = .001;

function WB(t) {
  return t ? t.__builtin__ ? !0 : !(typeof t.resize != "function" || typeof t.refresh != "function") : !1
}

function UB(t, e) {
  var r = document.createElement("div");
  return r.style.cssText = ["position:relative", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", r
}
var YB = function () {
    function t(e, r, n, i) {
      this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
      var a = !e.nodeName || e.nodeName.toUpperCase() === "CANVAS";
      this._opts = n = q({}, n || {}), this.dpr = n.devicePixelRatio || Ml, this._singleCanvas = a, this.root = e;
      var o = e.style;
      o && (c_(e), e.innerHTML = ""), this.storage = r;
      var s = this._zlevelList;
      this._prevDisplayList = [];
      var l = this._layers;
      if (a) {
        var f = e,
          c = f.width,
          h = f.height;
        n.width != null && (c = n.width), n.height != null && (h = n.height), this.dpr = n.devicePixelRatio || 1, f.width = c * this.dpr, f.height = h * this.dpr, this._width = c, this._height = h;
        var v = new Kf(f, this, this.dpr);
        v.__builtin__ = !0, v.initContext(), l[Xn] = v, v.zlevel = Xn, s.push(Xn), this._domRoot = e
      } else {
        this._width = Os(e, 0, n), this._height = Os(e, 1, n);
        var u = this._domRoot = UB(this._width, this._height);
        e.appendChild(u)
      }
    }
    return t.prototype.getType = function () {
      return "canvas"
    }, t.prototype.isSingleCanvas = function () {
      return this._singleCanvas
    }, t.prototype.getViewportRoot = function () {
      return this._domRoot
    }, t.prototype.getViewportRootOffset = function () {
      var e = this.getViewportRoot();
      if (e) return {
        offsetLeft: e.offsetLeft || 0,
        offsetTop: e.offsetTop || 0
      }
    }, t.prototype.refresh = function (e) {
      var r = this.storage.getDisplayList(!0),
        n = this._prevDisplayList,
        i = this._zlevelList;
      this._redrawId = Math.random(), this._paintList(r, n, e, this._redrawId);
      for (var a = 0; a < i.length; a++) {
        var o = i[a],
          s = this._layers[o];
        if (!s.__builtin__ && s.refresh) {
          var l = a === 0 ? this._backgroundColor : null;
          s.refresh(l)
        }
      }
      return this._opts.useDirtyRect && (this._prevDisplayList = r.slice()), this
    }, t.prototype.refreshHover = function () {
      this._paintHoverList(this.storage.getDisplayList(!1))
    }, t.prototype._paintHoverList = function (e) {
      var r = e.length,
        n = this._hoverlayer;
      if (n && n.clear(), !!r) {
        for (var i = {
            inHover: !0,
            viewWidth: this._width,
            viewHeight: this._height
          }, a, o = 0; o < r; o++) {
          var s = e[o];
          s.__inHover && (n || (n = this._hoverlayer = this.getLayer(Rm)), a || (a = n.ctx, a.save()), ti(a, s, i, o === r - 1))
        }
        a && a.restore()
      }
    }, t.prototype.getHoverLayer = function () {
      return this.getLayer(Rm)
    }, t.prototype.paintOne = function (e, r) {
      $w(e, r)
    }, t.prototype._paintList = function (e, r, n, i) {
      if (this._redrawId === i) {
        n = n || !1, this._updateLayerStatus(e);
        var a = this._doPaintList(e, r, n),
          o = a.finished,
          s = a.needsRefreshHover;
        if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(e), o) this.eachLayer(function (u) {
          u.afterBrush && u.afterBrush()
        });
        else {
          var l = this;
          Tc(function () {
            l._paintList(e, r, n, i)
          })
        }
      }
    }, t.prototype._compositeManually = function () {
      var e = this.getLayer(Xn).ctx,
        r = this._domRoot.width,
        n = this._domRoot.height;
      e.clearRect(0, 0, r, n), this.eachBuiltinLayer(function (i) {
        i.virtual && e.drawImage(i.dom, 0, 0, r, n)
      })
    }, t.prototype._doPaintList = function (e, r, n) {
      for (var i = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
        var l = this._zlevelList[s],
          u = this._layers[l];
        u.__builtin__ && u !== this._hoverlayer && (u.__dirty || n) && a.push(u)
      }
      for (var f = !0, c = !1, h = function (y) {
          var g = a[y],
            p = g.ctx,
            m = o && g.createRepaintRects(e, r, v._width, v._height),
            _ = n ? g.__startIndex : g.__drawIndex,
            w = !n && g.incremental && Date.now,
            b = w && Date.now(),
            S = g.zlevel === v._zlevelList[0] ? v._backgroundColor : null;
          if (g.__startIndex === g.__endIndex) g.clear(!1, S, m);
          else if (_ === g.__startIndex) {
            var x = e[_];
            (!x.incremental || !x.notClear || n) && g.clear(!1, S, m)
          }
          _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = g.__startIndex);
          var T, M = function (L) {
            var O = {
              inHover: !1,
              allClipped: !1,
              prevEl: null,
              viewWidth: i._width,
              viewHeight: i._height
            };
            for (T = _; T < g.__endIndex; T++) {
              var H = e[T];
              if (H.__inHover && (c = !0), i._doPaintEl(H, g, o, L, O, T === g.__endIndex - 1), w) {
                var B = Date.now() - b;
                if (B > 15) break
              }
            }
            O.prevElClipPaths && p.restore()
          };
          if (m)
            if (m.length === 0) T = g.__endIndex;
            else
              for (var D = v.dpr, I = 0; I < m.length; ++I) {
                var A = m[I];
                p.save(), p.beginPath(), p.rect(A.x * D, A.y * D, A.width * D, A.height * D), p.clip(), M(A), p.restore()
              } else p.save(), M(), p.restore();
          g.__drawIndex = T, g.__drawIndex < g.__endIndex && (f = !1)
        }, v = this, d = 0; d < a.length; d++) h(d);
      return mt.wxa && P(this._layers, function (y) {
        y && y.ctx && y.ctx.draw && y.ctx.draw()
      }), {
        finished: f,
        needsRefreshHover: c
      }
    }, t.prototype._doPaintEl = function (e, r, n, i, a, o) {
      var s = r.ctx;
      if (n) {
        var l = e.getPaintRect();
        (!i || l && l.intersect(i)) && (ti(s, e, a, o), e.setPrevPaintRect(l))
      } else ti(s, e, a, o)
    }, t.prototype.getLayer = function (e, r) {
      this._singleCanvas && !this._needsManuallyCompositing && (e = Xn);
      var n = this._layers[e];
      return n || (n = new Kf("zr_" + e, this, this.dpr), n.zlevel = e, n.__builtin__ = !0, this._layerConfig[e] ? Tt(n, this._layerConfig[e], !0) : this._layerConfig[e - Ws] && Tt(n, this._layerConfig[e - Ws], !0), r && (n.virtual = r), this.insertLayer(e, n), n.initContext()), n
    }, t.prototype.insertLayer = function (e, r) {
      var n = this._layers,
        i = this._zlevelList,
        a = i.length,
        o = this._domRoot,
        s = null,
        l = -1;
      if (!n[e] && !!WB(r)) {
        if (a > 0 && e > i[0]) {
          for (l = 0; l < a - 1 && !(i[l] < e && i[l + 1] > e); l++);
          s = n[i[l]]
        }
        if (i.splice(l + 1, 0, e), n[e] = r, !r.virtual)
          if (s) {
            var u = s.dom;
            u.nextSibling ? o.insertBefore(r.dom, u.nextSibling) : o.appendChild(r.dom)
          } else o.firstChild ? o.insertBefore(r.dom, o.firstChild) : o.appendChild(r.dom);
        r.__painter = this
      }
    }, t.prototype.eachLayer = function (e, r) {
      for (var n = this._zlevelList, i = 0; i < n.length; i++) {
        var a = n[i];
        e.call(r, this._layers[a], a)
      }
    }, t.prototype.eachBuiltinLayer = function (e, r) {
      for (var n = this._zlevelList, i = 0; i < n.length; i++) {
        var a = n[i],
          o = this._layers[a];
        o.__builtin__ && e.call(r, o, a)
      }
    }, t.prototype.eachOtherLayer = function (e, r) {
      for (var n = this._zlevelList, i = 0; i < n.length; i++) {
        var a = n[i],
          o = this._layers[a];
        o.__builtin__ || e.call(r, o, a)
      }
    }, t.prototype.getLayers = function () {
      return this._layers
    }, t.prototype._updateLayerStatus = function (e) {
      this.eachBuiltinLayer(function (c, h) {
        c.__dirty = c.__used = !1
      });

      function r(c) {
        a && (a.__endIndex !== c && (a.__dirty = !0), a.__endIndex = c)
      }
      if (this._singleCanvas)
        for (var n = 1; n < e.length; n++) {
          var i = e[n];
          if (i.zlevel !== e[n - 1].zlevel || i.incremental) {
            this._needsManuallyCompositing = !0;
            break
          }
        }
      var a = null,
        o = 0,
        s, l;
      for (l = 0; l < e.length; l++) {
        var i = e[l],
          u = i.zlevel,
          f = void 0;
        s !== u && (s = u, o = 0), i.incremental ? (f = this.getLayer(u + GB, this._needsManuallyCompositing), f.incremental = !0, o = 1) : f = this.getLayer(u + (o > 0 ? Ws : 0), this._needsManuallyCompositing), f.__builtin__ || iv("ZLevel " + u + " has been used by unkown layer " + f.id), f !== a && (f.__used = !0, f.__startIndex !== l && (f.__dirty = !0), f.__startIndex = l, f.incremental ? f.__drawIndex = -1 : f.__drawIndex = l, r(l), a = f), i.__dirty & Te && !i.__inHover && (f.__dirty = !0, f.incremental && f.__drawIndex < 0 && (f.__drawIndex = l))
      }
      r(l), this.eachBuiltinLayer(function (c, h) {
        !c.__used && c.getElementCount() > 0 && (c.__dirty = !0, c.__startIndex = c.__endIndex = c.__drawIndex = 0), c.__dirty && c.__drawIndex < 0 && (c.__drawIndex = c.__startIndex)
      })
    }, t.prototype.clear = function () {
      return this.eachBuiltinLayer(this._clearLayer), this
    }, t.prototype._clearLayer = function (e) {
      e.clear()
    }, t.prototype.setBackgroundColor = function (e) {
      this._backgroundColor = e, P(this._layers, function (r) {
        r.setUnpainted()
      })
    }, t.prototype.configLayer = function (e, r) {
      if (r) {
        var n = this._layerConfig;
        n[e] ? Tt(n[e], r, !0) : n[e] = r;
        for (var i = 0; i < this._zlevelList.length; i++) {
          var a = this._zlevelList[i];
          if (a === e || a === e + Ws) {
            var o = this._layers[a];
            Tt(o, n[e], !0)
          }
        }
      }
    }, t.prototype.delLayer = function (e) {
      var r = this._layers,
        n = this._zlevelList,
        i = r[e];
      !i || (i.dom.parentNode.removeChild(i.dom), delete r[e], n.splice(Pt(n, e), 1))
    }, t.prototype.resize = function (e, r) {
      if (this._domRoot.style) {
        var n = this._domRoot;
        n.style.display = "none";
        var i = this._opts,
          a = this.root;
        if (e != null && (i.width = e), r != null && (i.height = r), e = Os(a, 0, i), r = Os(a, 1, i), n.style.display = "", this._width !== e || r !== this._height) {
          n.style.width = e + "px", n.style.height = r + "px";
          for (var o in this._layers) this._layers.hasOwnProperty(o) && this._layers[o].resize(e, r);
          this.refresh(!0)
        }
        this._width = e, this._height = r
      } else {
        if (e == null || r == null) return;
        this._width = e, this._height = r, this.getLayer(Xn).resize(e, r)
      }
      return this
    }, t.prototype.clearLayer = function (e) {
      var r = this._layers[e];
      r && r.clear()
    }, t.prototype.dispose = function () {
      this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
    }, t.prototype.getRenderedCanvas = function (e) {
      if (e = e || {}, this._singleCanvas && !this._compositeManually) return this._layers[Xn].dom;
      var r = new Kf("image", this, e.pixelRatio || this.dpr);
      r.initContext(), r.clear(!1, e.backgroundColor || this._backgroundColor);
      var n = r.ctx;
      if (e.pixelRatio <= this.dpr) {
        this.refresh();
        var i = r.dom.width,
          a = r.dom.height;
        this.eachLayer(function (c) {
          c.__builtin__ ? n.drawImage(c.dom, 0, 0, i, a) : c.renderToCanvas && (n.save(), c.renderToCanvas(n), n.restore())
        })
      } else
        for (var o = {
            inHover: !1,
            viewWidth: this._width,
            viewHeight: this._height
          }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
          var f = s[l];
          ti(n, f, o, l === u - 1)
        }
      return r.dom
    }, t.prototype.getWidth = function () {
      return this._width
    }, t.prototype.getHeight = function () {
      return this._height
    }, t
  }(),
  XB = YB;

function MN(t) {
  t.registerPainter("canvas", XB)
}
var qB = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
  eb = {
    exports: {}
  };
(function (t) {
  (function (e) {
    const r = "(0?\\d+|0x[a-f0-9]+)",
      n = {
        fourOctet: new RegExp(`^${r}\\.${r}\\.${r}\\.${r}$`, "i"),
        threeOctet: new RegExp(`^${r}\\.${r}\\.${r}$`, "i"),
        twoOctet: new RegExp(`^${r}\\.${r}$`, "i"),
        longValue: new RegExp(`^${r}$`, "i")
      },
      i = new RegExp("^0[0-7]+$", "i"),
      a = new RegExp("^0x[a-f0-9]+$", "i"),
      o = "%[0-9a-z]{1,}",
      s = "(?:[0-9a-f]+::?)+",
      l = {
        zoneIndex: new RegExp(o, "i"),
        native: new RegExp(`^(::)?(${s})?([0-9a-f]+)?(::)?(${o})?$`, "i"),
        deprecatedTransitional: new RegExp(`^(?:::)(${r}\\.${r}\\.${r}\\.${r}(${o})?)$`, "i"),
        transitional: new RegExp(`^((?:${s})|(?:::)(?:${s})?)${r}\\.${r}\\.${r}\\.${r}(${o})?$`, "i")
      };

    function u(d, y) {
      if (d.indexOf("::") !== d.lastIndexOf("::")) return null;
      let g = 0,
        p = -1,
        m = (d.match(l.zoneIndex) || [])[0],
        _, w;
      for (m && (m = m.substring(1), d = d.replace(/%.+$/, ""));
        (p = d.indexOf(":", p + 1)) >= 0;) g++;
      if (d.substr(0, 2) === "::" && g--, d.substr(-2, 2) === "::" && g--, g > y) return null;
      for (w = y - g, _ = ":"; w--;) _ += "0:";
      return d = d.replace("::", _), d[0] === ":" && (d = d.slice(1)), d[d.length - 1] === ":" && (d = d.slice(0, -1)), y = function () {
        const b = d.split(":"),
          S = [];
        for (let x = 0; x < b.length; x++) S.push(parseInt(b[x], 16));
        return S
      }(), {
        parts: y,
        zoneId: m
      }
    }

    function f(d, y, g, p) {
      if (d.length !== y.length) throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
      let m = 0,
        _;
      for (; p > 0;) {
        if (_ = g - p, _ < 0 && (_ = 0), d[m] >> _ !== y[m] >> _) return !1;
        p -= g, m += 1
      }
      return !0
    }

    function c(d) {
      if (a.test(d)) return parseInt(d, 16);
      if (d[0] === "0" && !isNaN(parseInt(d[1], 10))) {
        if (i.test(d)) return parseInt(d, 8);
        throw new Error(`ipaddr: cannot parse ${d} as octal`)
      }
      return parseInt(d, 10)
    }

    function h(d, y) {
      for (; d.length < y;) d = `0${d}`;
      return d
    }
    const v = {};
    v.IPv4 = function () {
      function d(y) {
        if (y.length !== 4) throw new Error("ipaddr: ipv4 octet count should be 4");
        let g, p;
        for (g = 0; g < y.length; g++)
          if (p = y[g], !(0 <= p && p <= 255)) throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
        this.octets = y
      }
      return d.prototype.SpecialRanges = {
        unspecified: [
          [new d([0, 0, 0, 0]), 8]
        ],
        broadcast: [
          [new d([255, 255, 255, 255]), 32]
        ],
        multicast: [
          [new d([224, 0, 0, 0]), 4]
        ],
        linkLocal: [
          [new d([169, 254, 0, 0]), 16]
        ],
        loopback: [
          [new d([127, 0, 0, 0]), 8]
        ],
        carrierGradeNat: [
          [new d([100, 64, 0, 0]), 10]
        ],
        private: [
          [new d([10, 0, 0, 0]), 8],
          [new d([172, 16, 0, 0]), 12],
          [new d([192, 168, 0, 0]), 16]
        ],
        reserved: [
          [new d([192, 0, 0, 0]), 24],
          [new d([192, 0, 2, 0]), 24],
          [new d([192, 88, 99, 0]), 24],
          [new d([198, 51, 100, 0]), 24],
          [new d([203, 0, 113, 0]), 24],
          [new d([240, 0, 0, 0]), 4]
        ]
      }, d.prototype.kind = function () {
        return "ipv4"
      }, d.prototype.match = function (y, g) {
        let p;
        if (g === void 0 && (p = y, y = p[0], g = p[1]), y.kind() !== "ipv4") throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
        return f(this.octets, y.octets, 8, g)
      }, d.prototype.prefixLengthFromSubnetMask = function () {
        let y = 0,
          g = !1;
        const p = {
          0: 8,
          128: 7,
          192: 6,
          224: 5,
          240: 4,
          248: 3,
          252: 2,
          254: 1,
          255: 0
        };
        let m, _, w;
        for (m = 3; m >= 0; m -= 1)
          if (_ = this.octets[m], _ in p) {
            if (w = p[_], g && w !== 0) return null;
            w !== 8 && (g = !0), y += w
          } else return null;
        return 32 - y
      }, d.prototype.range = function () {
        return v.subnetMatch(this, this.SpecialRanges)
      }, d.prototype.toByteArray = function () {
        return this.octets.slice(0)
      }, d.prototype.toIPv4MappedAddress = function () {
        return v.IPv6.parse(`::ffff:${this.toString()}`)
      }, d.prototype.toNormalizedString = function () {
        return this.toString()
      }, d.prototype.toString = function () {
        return this.octets.join(".")
      }, d
    }(), v.IPv4.broadcastAddressFromCIDR = function (d) {
      try {
        const y = this.parseCIDR(d),
          g = y[0].toByteArray(),
          p = this.subnetMaskFromPrefixLength(y[1]).toByteArray(),
          m = [];
        let _ = 0;
        for (; _ < 4;) m.push(parseInt(g[_], 10) | parseInt(p[_], 10) ^ 255), _++;
        return new this(m)
      } catch (y) {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format")
      }
    }, v.IPv4.isIPv4 = function (d) {
      return this.parser(d) !== null
    }, v.IPv4.isValid = function (d) {
      try {
        return new this(this.parser(d)), !0
      } catch (y) {
        return !1
      }
    }, v.IPv4.isValidFourPartDecimal = function (d) {
      return !!(v.IPv4.isValid(d) && d.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))
    }, v.IPv4.networkAddressFromCIDR = function (d) {
      let y, g, p, m, _;
      try {
        for (y = this.parseCIDR(d), p = y[0].toByteArray(), _ = this.subnetMaskFromPrefixLength(y[1]).toByteArray(), m = [], g = 0; g < 4;) m.push(parseInt(p[g], 10) & parseInt(_[g], 10)), g++;
        return new this(m)
      } catch (w) {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format")
      }
    }, v.IPv4.parse = function (d) {
      const y = this.parser(d);
      if (y === null) throw new Error("ipaddr: string is not formatted like an IPv4 Address");
      return new this(y)
    }, v.IPv4.parseCIDR = function (d) {
      let y;
      if (y = d.match(/^(.+)\/(\d+)$/)) {
        const g = parseInt(y[2]);
        if (g >= 0 && g <= 32) {
          const p = [this.parse(y[1]), g];
          return Object.defineProperty(p, "toString", {
            value: function () {
              return this.join("/")
            }
          }), p
        }
      }
      throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")
    }, v.IPv4.parser = function (d) {
      let y, g, p;
      if (y = d.match(n.fourOctet)) return function () {
        const m = y.slice(1, 6),
          _ = [];
        for (let w = 0; w < m.length; w++) g = m[w], _.push(c(g));
        return _
      }();
      if (y = d.match(n.longValue)) {
        if (p = c(y[1]), p > 4294967295 || p < 0) throw new Error("ipaddr: address outside defined range");
        return function () {
          const m = [];
          let _;
          for (_ = 0; _ <= 24; _ += 8) m.push(p >> _ & 255);
          return m
        }().reverse()
      } else return (y = d.match(n.twoOctet)) ? function () {
        const m = y.slice(1, 4),
          _ = [];
        if (p = c(m[1]), p > 16777215 || p < 0) throw new Error("ipaddr: address outside defined range");
        return _.push(c(m[0])), _.push(p >> 16 & 255), _.push(p >> 8 & 255), _.push(p & 255), _
      }() : (y = d.match(n.threeOctet)) ? function () {
        const m = y.slice(1, 5),
          _ = [];
        if (p = c(m[2]), p > 65535 || p < 0) throw new Error("ipaddr: address outside defined range");
        return _.push(c(m[0])), _.push(c(m[1])), _.push(p >> 8 & 255), _.push(p & 255), _
      }() : null
    }, v.IPv4.subnetMaskFromPrefixLength = function (d) {
      if (d = parseInt(d), d < 0 || d > 32) throw new Error("ipaddr: invalid IPv4 prefix length");
      const y = [0, 0, 0, 0];
      let g = 0;
      const p = Math.floor(d / 8);
      for (; g < p;) y[g] = 255, g++;
      return p < 4 && (y[p] = Math.pow(2, d % 8) - 1 << 8 - d % 8), new this(y)
    }, v.IPv6 = function () {
      function d(y, g) {
        let p, m;
        if (y.length === 16)
          for (this.parts = [], p = 0; p <= 14; p += 2) this.parts.push(y[p] << 8 | y[p + 1]);
        else if (y.length === 8) this.parts = y;
        else throw new Error("ipaddr: ipv6 part count should be 8 or 16");
        for (p = 0; p < this.parts.length; p++)
          if (m = this.parts[p], !(0 <= m && m <= 65535)) throw new Error("ipaddr: ipv6 part should fit in 16 bits");
        g && (this.zoneId = g)
      }
      return d.prototype.SpecialRanges = {
        unspecified: [new d([0, 0, 0, 0, 0, 0, 0, 0]), 128],
        linkLocal: [new d([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
        multicast: [new d([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
        loopback: [new d([0, 0, 0, 0, 0, 0, 0, 1]), 128],
        uniqueLocal: [new d([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
        ipv4Mapped: [new d([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
        rfc6145: [new d([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
        rfc6052: [new d([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
        "6to4": [new d([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
        teredo: [new d([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
        reserved: [
          [new d([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]
        ]
      }, d.prototype.isIPv4MappedAddress = function () {
        return this.range() === "ipv4Mapped"
      }, d.prototype.kind = function () {
        return "ipv6"
      }, d.prototype.match = function (y, g) {
        let p;
        if (g === void 0 && (p = y, y = p[0], g = p[1]), y.kind() !== "ipv6") throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
        return f(this.parts, y.parts, 16, g)
      }, d.prototype.prefixLengthFromSubnetMask = function () {
        let y = 0,
          g = !1;
        const p = {
          0: 16,
          32768: 15,
          49152: 14,
          57344: 13,
          61440: 12,
          63488: 11,
          64512: 10,
          65024: 9,
          65280: 8,
          65408: 7,
          65472: 6,
          65504: 5,
          65520: 4,
          65528: 3,
          65532: 2,
          65534: 1,
          65535: 0
        };
        let m, _;
        for (let w = 7; w >= 0; w -= 1)
          if (m = this.parts[w], m in p) {
            if (_ = p[m], g && _ !== 0) return null;
            _ !== 16 && (g = !0), y += _
          } else return null;
        return 128 - y
      }, d.prototype.range = function () {
        return v.subnetMatch(this, this.SpecialRanges)
      }, d.prototype.toByteArray = function () {
        let y;
        const g = [],
          p = this.parts;
        for (let m = 0; m < p.length; m++) y = p[m], g.push(y >> 8), g.push(y & 255);
        return g
      }, d.prototype.toFixedLengthString = function () {
        const y = function () {
          const p = [];
          for (let m = 0; m < this.parts.length; m++) p.push(h(this.parts[m].toString(16), 4));
          return p
        }.call(this).join(":");
        let g = "";
        return this.zoneId && (g = `%${this.zoneId}`), y + g
      }, d.prototype.toIPv4Address = function () {
        if (!this.isIPv4MappedAddress()) throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
        const y = this.parts.slice(-2),
          g = y[0],
          p = y[1];
        return new v.IPv4([g >> 8, g & 255, p >> 8, p & 255])
      }, d.prototype.toNormalizedString = function () {
        const y = function () {
          const p = [];
          for (let m = 0; m < this.parts.length; m++) p.push(this.parts[m].toString(16));
          return p
        }.call(this).join(":");
        let g = "";
        return this.zoneId && (g = `%${this.zoneId}`), y + g
      }, d.prototype.toRFC5952String = function () {
        const y = /((^|:)(0(:|$)){2,})/g,
          g = this.toNormalizedString();
        let p = 0,
          m = -1,
          _;
        for (; _ = y.exec(g);) _[0].length > m && (p = _.index, m = _[0].length);
        return m < 0 ? g : `${g.substring(0,p)}::${g.substring(p+m)}`
      }, d.prototype.toString = function () {
        return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/, "::")
      }, d
    }(), v.IPv6.broadcastAddressFromCIDR = function (d) {
      try {
        const y = this.parseCIDR(d),
          g = y[0].toByteArray(),
          p = this.subnetMaskFromPrefixLength(y[1]).toByteArray(),
          m = [];
        let _ = 0;
        for (; _ < 16;) m.push(parseInt(g[_], 10) | parseInt(p[_], 10) ^ 255), _++;
        return new this(m)
      } catch (y) {
        throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${y})`)
      }
    }, v.IPv6.isIPv6 = function (d) {
      return this.parser(d) !== null
    }, v.IPv6.isValid = function (d) {
      if (typeof d == "string" && d.indexOf(":") === -1) return !1;
      try {
        const y = this.parser(d);
        return new this(y.parts, y.zoneId), !0
      } catch (y) {
        return !1
      }
    }, v.IPv6.networkAddressFromCIDR = function (d) {
      let y, g, p, m, _;
      try {
        for (y = this.parseCIDR(d), p = y[0].toByteArray(), _ = this.subnetMaskFromPrefixLength(y[1]).toByteArray(), m = [], g = 0; g < 16;) m.push(parseInt(p[g], 10) & parseInt(_[g], 10)), g++;
        return new this(m)
      } catch (w) {
        throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${w})`)
      }
    }, v.IPv6.parse = function (d) {
      const y = this.parser(d);
      if (y.parts === null) throw new Error("ipaddr: string is not formatted like an IPv6 Address");
      return new this(y.parts, y.zoneId)
    }, v.IPv6.parseCIDR = function (d) {
      let y, g, p;
      if ((g = d.match(/^(.+)\/(\d+)$/)) && (y = parseInt(g[2]), y >= 0 && y <= 128)) return p = [this.parse(g[1]), y], Object.defineProperty(p, "toString", {
        value: function () {
          return this.join("/")
        }
      }), p;
      throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")
    }, v.IPv6.parser = function (d) {
      let y, g, p, m, _, w;
      if (p = d.match(l.deprecatedTransitional)) return this.parser(`::ffff:${p[1]}`);
      if (l.native.test(d)) return u(d, 8);
      if ((p = d.match(l.transitional)) && (w = p[6] || "", y = u(p[1].slice(0, -1) + w, 6), y.parts)) {
        for (_ = [parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), parseInt(p[5])], g = 0; g < _.length; g++)
          if (m = _[g], !(0 <= m && m <= 255)) return null;
        return y.parts.push(_[0] << 8 | _[1]), y.parts.push(_[2] << 8 | _[3]), {
          parts: y.parts,
          zoneId: y.zoneId
        }
      }
      return null
    }, v.IPv6.subnetMaskFromPrefixLength = function (d) {
      if (d = parseInt(d), d < 0 || d > 128) throw new Error("ipaddr: invalid IPv6 prefix length");
      const y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let g = 0;
      const p = Math.floor(d / 8);
      for (; g < p;) y[g] = 255, g++;
      return p < 16 && (y[p] = Math.pow(2, d % 8) - 1 << 8 - d % 8), new this(y)
    }, v.fromByteArray = function (d) {
      const y = d.length;
      if (y === 4) return new v.IPv4(d);
      if (y === 16) return new v.IPv6(d);
      throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address")
    }, v.isValid = function (d) {
      return v.IPv6.isValid(d) || v.IPv4.isValid(d)
    }, v.parse = function (d) {
      if (v.IPv6.isValid(d)) return v.IPv6.parse(d);
      if (v.IPv4.isValid(d)) return v.IPv4.parse(d);
      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")
    }, v.parseCIDR = function (d) {
      try {
        return v.IPv6.parseCIDR(d)
      } catch (y) {
        try {
          return v.IPv4.parseCIDR(d)
        } catch (g) {
          throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")
        }
      }
    }, v.process = function (d) {
      const y = this.parse(d);
      return y.kind() === "ipv6" && y.isIPv4MappedAddress() ? y.toIPv4Address() : y
    }, v.subnetMatch = function (d, y, g) {
      let p, m, _, w;
      g == null && (g = "unicast");
      for (m in y)
        if (Object.prototype.hasOwnProperty.call(y, m)) {
          for (_ = y[m], _[0] && !(_[0] instanceof Array) && (_ = [_]), p = 0; p < _.length; p++)
            if (w = _[p], d.kind() === w[0].kind() && d.match.apply(d, w)) return m
        } return g
    }, t.exports ? t.exports = v : e.ipaddr = v
  })(qB)
})(eb);
var DN = eb.exports;
export {
  mN as $, jB as A, nN as B, vi as C, Uh as D, xN as E, ze as F, SN as G, TN as H, MN as I, bN as J, CN as K, wN as L, hN as M, pN as N, Hh as O, da as P, vN as Q, Ux as R, fN as S, H0 as T, DN as U, _0 as V, QB as W, eN as X, dN as Y, sN as Z, _N as _, g0 as a, gN as a0, rN as b, tr as c, yN as d, k0 as e, iN as f, ie as g, Ch as h, oN as i, Gt as j, R0 as k, ex as l, Fh as m, xh as n, Kh as o, no as p, m0 as q, tN as r, cN as s, KB as t, to as u, uN as v, JB as w, aN as x, lN as y, ZB as z
};