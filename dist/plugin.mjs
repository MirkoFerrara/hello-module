var cw = Object.defineProperty;
var i = (e, t) => cw(e, "name", { value: t, configurable: !0 });
/**
 * @license Angular v17.3.12
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function zm(e, t) {
  return Object.is(e, t);
}
i(zm, "defaultEquals");
let Te = null, gi = !1, aa = 1;
const pt = /* @__PURE__ */ Symbol("SIGNAL");
function B(e) {
  const t = Te;
  return Te = e, t;
}
i(B, "setActiveConsumer");
function Gm() {
  return Te;
}
i(Gm, "getActiveConsumer");
function lw() {
  return gi;
}
i(lw, "isInNotificationPhase");
const au = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: /* @__PURE__ */ i(() => !1, "producerMustRecompute"),
  producerRecomputeValue: /* @__PURE__ */ i(() => {
  }, "producerRecomputeValue"),
  consumerMarkedDirty: /* @__PURE__ */ i(() => {
  }, "consumerMarkedDirty"),
  consumerOnSignalRead: /* @__PURE__ */ i(() => {
  }, "consumerOnSignalRead")
};
function uu(e) {
  if (gi)
    throw new Error(typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : "");
  if (Te === null)
    return;
  Te.consumerOnSignalRead(e);
  const t = Te.nextProducerIndex++;
  if (go(Te), t < Te.producerNode.length && Te.producerNode[t] !== e && Fi(Te)) {
    const n = Te.producerNode[t];
    cu(n, Te.producerIndexOfThis[t]);
  }
  Te.producerNode[t] !== e && (Te.producerNode[t] = e, Te.producerIndexOfThis[t] = Fi(Te) ? Km(e, Te, t) : 0), Te.producerLastReadVersion[t] = e.version;
}
i(uu, "producerAccessed");
function dw() {
  aa++;
}
i(dw, "producerIncrementEpoch");
function Wm(e) {
  if (!(Fi(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === aa)) {
    if (!e.producerMustRecompute(e) && !vd(e)) {
      e.dirty = !1, e.lastCleanEpoch = aa;
      return;
    }
    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = aa;
  }
}
i(Wm, "producerUpdateValueVersion");
function qm(e) {
  if (e.liveConsumerNode === void 0)
    return;
  const t = gi;
  gi = !0;
  try {
    for (const n of e.liveConsumerNode)
      n.dirty || Zm(n);
  } finally {
    gi = t;
  }
}
i(qm, "producerNotifyConsumers");
function Qm() {
  return Te?.consumerAllowSignalWrites !== !1;
}
i(Qm, "producerUpdatesAllowed");
function Zm(e) {
  e.dirty = !0, qm(e), e.consumerMarkedDirty?.(e);
}
i(Zm, "consumerMarkDirty");
function yd(e) {
  return e && (e.nextProducerIndex = 0), B(e);
}
i(yd, "consumerBeforeComputation");
function Dd(e, t) {
  if (B(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (Fi(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        cu(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
i(Dd, "consumerAfterComputation");
function vd(e) {
  go(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    const n = e.producerNode[t], r = e.producerLastReadVersion[t];
    if (r !== n.version || (Wm(n), r !== n.version))
      return !0;
  }
  return !1;
}
i(vd, "consumerPollProducersForChange");
function Ym(e) {
  if (go(e), Fi(e))
    for (let t = 0; t < e.producerNode.length; t++)
      cu(e.producerNode[t], e.producerIndexOfThis[t]);
  e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
i(Ym, "consumerDestroy");
function Km(e, t, n) {
  if (Jm(e), go(e), e.liveConsumerNode.length === 0)
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = Km(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
i(Km, "producerAddLiveConsumer");
function cu(e, t) {
  if (Jm(e), go(e), typeof ngDevMode < "u" && ngDevMode && t >= e.liveConsumerNode.length)
    throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);
  if (e.liveConsumerNode.length === 1)
    for (let r = 0; r < e.producerNode.length; r++)
      cu(e.producerNode[r], e.producerIndexOfThis[r]);
  const n = e.liveConsumerNode.length - 1;
  if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
    const r = e.liveConsumerIndexOfThis[t], o = e.liveConsumerNode[t];
    go(o), o.producerIndexOfThis[r] = t;
  }
}
i(cu, "producerRemoveLiveConsumerAtIndex");
function Fi(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
i(Fi, "consumerIsLive");
function go(e) {
  e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= [];
}
i(go, "assertConsumerNode");
function Jm(e) {
  e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= [];
}
i(Jm, "assertProducerNode");
function Xm(e) {
  const t = Object.create(fw);
  t.computation = e;
  const n = /* @__PURE__ */ i(() => {
    if (Wm(t), uu(t), t.value === ua)
      throw t.error;
    return t.value;
  }, "computed");
  return n[pt] = t, n;
}
i(Xm, "createComputed");
const Cc = /* @__PURE__ */ Symbol("UNSET"), Ec = /* @__PURE__ */ Symbol("COMPUTING"), ua = /* @__PURE__ */ Symbol("ERRORED"), fw = {
  ...au,
  value: Cc,
  dirty: !0,
  error: null,
  equal: zm,
  producerMustRecompute(e) {
    return e.value === Cc || e.value === Ec;
  },
  producerRecomputeValue(e) {
    if (e.value === Ec)
      throw new Error("Detected cycle in computations.");
    const t = e.value;
    e.value = Ec;
    const n = yd(e);
    let r;
    try {
      r = e.computation();
    } catch (o) {
      r = ua, e.error = o;
    } finally {
      Dd(e, n);
    }
    if (t !== Cc && t !== ua && r !== ua && e.equal(t, r)) {
      e.value = t;
      return;
    }
    e.value = r, e.version++;
  }
};
function hw() {
  throw new Error();
}
i(hw, "defaultThrowError");
let ey = hw;
function ty() {
  ey();
}
i(ty, "throwInvalidWriteToSignalError");
function pw(e) {
  ey = e;
}
i(pw, "setThrowInvalidWriteToSignalError");
function gw(e) {
  const t = Object.create(ny);
  t.value = e;
  const n = /* @__PURE__ */ i(() => (uu(t), t.value), "getter");
  return n[pt] = t, n;
}
i(gw, "createSignal");
function lu(e, t) {
  Qm() || ty(), e.equal(e.value, t) || (e.value = t, yw(e));
}
i(lu, "signalSetFn");
function mw(e, t) {
  Qm() || ty(), lu(e, t(e.value));
}
i(mw, "signalUpdateFn");
const ny = {
  ...au,
  equal: zm,
  value: void 0
};
function yw(e) {
  e.version++, dw(), qm(e);
}
i(yw, "signalValueChanged");
function Dw(e, t, n) {
  const r = Object.create(vw);
  n && (r.consumerAllowSignalWrites = !0), r.fn = e, r.schedule = t;
  const o = /* @__PURE__ */ i((c) => {
    r.cleanupFn = c;
  }, "registerOnCleanup");
  function s(c) {
    return c.fn === null && c.schedule === null;
  }
  i(s, "isWatchNodeDestroyed");
  function a(c) {
    s(c) || (Ym(c), c.cleanupFn(), c.fn = null, c.schedule = null, c.cleanupFn = nl);
  }
  i(a, "destroyWatchNode");
  const u = /* @__PURE__ */ i(() => {
    if (r.fn === null)
      return;
    if (lw())
      throw new Error("Schedulers cannot synchronously execute watches while scheduling.");
    if (r.dirty = !1, r.hasRun && !vd(r))
      return;
    r.hasRun = !0;
    const c = yd(r);
    try {
      r.cleanupFn(), r.cleanupFn = nl, r.fn(o);
    } finally {
      Dd(r, c);
    }
  }, "run");
  return r.ref = {
    notify: /* @__PURE__ */ i(() => Zm(r), "notify"),
    run: u,
    cleanup: /* @__PURE__ */ i(() => r.cleanupFn(), "cleanup"),
    destroy: /* @__PURE__ */ i(() => a(r), "destroy"),
    [pt]: r
  }, r.ref;
}
i(Dw, "createWatch");
const nl = /* @__PURE__ */ i(() => {
}, "NOOP_CLEANUP_FN"), vw = {
  ...au,
  consumerIsAlwaysLive: !0,
  consumerAllowSignalWrites: !1,
  consumerMarkedDirty: /* @__PURE__ */ i((e) => {
    e.schedule !== null && e.schedule(e.ref);
  }, "consumerMarkedDirty"),
  hasRun: !1,
  cleanupFn: nl
};
var rl = /* @__PURE__ */ i(function(e, t) {
  return rl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
  }, rl(e, t);
}, "extendStatics");
function ko(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  rl(e, t);
  function n() {
    this.constructor = e;
  }
  i(n, "__"), e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
i(ko, "__extends");
function ol(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return {
    next: /* @__PURE__ */ i(function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }, "next")
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
i(ol, "__values");
function il(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), o, s = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; ) s.push(o.value);
  } catch (u) {
    a = { error: u };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (a) throw a.error;
    }
  }
  return s;
}
i(il, "__read");
function sl(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
i(sl, "__spreadArray");
function Zt(e) {
  return typeof e == "function";
}
i(Zt, "isFunction");
function Id(e) {
  var t = /* @__PURE__ */ i(function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, "_super"), n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
i(Id, "createErrorClass");
var bc = Id(function(e) {
  return /* @__PURE__ */ i(function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, o) {
      return o + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  }, "UnsubscriptionErrorImpl");
});
function al(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
i(al, "arrRemove");
var Ro = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return i(e, "Subscription"), e.prototype.unsubscribe = function() {
    var t, n, r, o, s;
    if (!this.closed) {
      this.closed = !0;
      var a = this._parentage;
      if (a)
        if (this._parentage = null, Array.isArray(a))
          try {
            for (var u = ol(a), c = u.next(); !c.done; c = u.next()) {
              var l = c.value;
              l.remove(this);
            }
          } catch (m) {
            t = { error: m };
          } finally {
            try {
              c && !c.done && (n = u.return) && n.call(u);
            } finally {
              if (t) throw t.error;
            }
          }
        else
          a.remove(this);
      var d = this.initialTeardown;
      if (Zt(d))
        try {
          d();
        } catch (m) {
          s = m instanceof bc ? m.errors : [m];
        }
      var f = this._finalizers;
      if (f) {
        this._finalizers = null;
        try {
          for (var h = ol(f), p = h.next(); !p.done; p = h.next()) {
            var g = p.value;
            try {
              kp(g);
            } catch (m) {
              s = s ?? [], m instanceof bc ? s = sl(sl([], il(s)), il(m.errors)) : s.push(m);
            }
          }
        } catch (m) {
          r = { error: m };
        } finally {
          try {
            p && !p.done && (o = h.return) && o.call(h);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (s)
        throw new bc(s);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this)
      if (this.closed)
        kp(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var n = this._parentage;
    return n === t || Array.isArray(n) && n.includes(t);
  }, e.prototype._addParent = function(t) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }, e.prototype._removeParent = function(t) {
    var n = this._parentage;
    n === t ? this._parentage = null : Array.isArray(n) && al(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && al(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), ry = Ro.EMPTY;
function oy(e) {
  return e instanceof Ro || e && "closed" in e && Zt(e.remove) && Zt(e.add) && Zt(e.unsubscribe);
}
i(oy, "isSubscription");
function kp(e) {
  Zt(e) ? e() : e.unsubscribe();
}
i(kp, "execFinalizer");
var Iw = {
  Promise: void 0
}, Cw = {
  setTimeout: /* @__PURE__ */ i(function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, sl([e, t], il(n)));
  }, "setTimeout"),
  clearTimeout: /* @__PURE__ */ i(function(e) {
    return clearTimeout(e);
  }, "clearTimeout"),
  delegate: void 0
};
function Ew(e) {
  Cw.setTimeout(function() {
    throw e;
  });
}
i(Ew, "reportUnhandledError");
function Rp() {
}
i(Rp, "noop$1");
function ca(e) {
  e();
}
i(ca, "errorContext");
var Cd = function(e) {
  ko(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, oy(n) && n.add(r)) : r.destination = Mw, r;
  }
  return i(t, "Subscriber"), t.create = function(n, r, o) {
    return new ul(n, r, o);
  }, t.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, t.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(n) {
    this.destination.next(n);
  }, t.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(Ro), bw = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return i(e, "ConsumerObserver"), e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(t);
      } catch (r) {
        Vs(r);
      }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(t);
      } catch (r) {
        Vs(r);
      }
    else
      Vs(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (n) {
        Vs(n);
      }
  }, e;
}(), ul = function(e) {
  ko(t, e);
  function t(n, r, o) {
    var s = e.call(this) || this, a;
    return Zt(n) || !n ? a = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: o ?? void 0
    } : a = n, s.destination = new bw(a), s;
  }
  return i(t, "SafeSubscriber"), t;
}(Cd);
function Vs(e) {
  Ew(e);
}
i(Vs, "handleUnhandledError");
function ww(e) {
  throw e;
}
i(ww, "defaultErrorHandler");
var Mw = {
  closed: !0,
  next: Rp,
  error: ww,
  complete: Rp
}, _w = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function iy(e) {
  return e;
}
i(iy, "identity");
function Sw(e) {
  return e.length === 0 ? iy : e.length === 1 ? e[0] : /* @__PURE__ */ i(function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  }, "piped");
}
i(Sw, "pipeFromArray");
var cl = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return i(e, "Observable"), e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, r) {
    var o = this, s = Aw(t) ? t : new ul(t, n, r);
    return ca(function() {
      var a = o, u = a.operator, c = a.source;
      s.add(u ? u.call(s, c) : c ? o._subscribe(s) : o._trySubscribe(s));
    }), s;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var r = this;
    return n = xp(n), new n(function(o, s) {
      var a = new ul({
        next: /* @__PURE__ */ i(function(u) {
          try {
            t(u);
          } catch (c) {
            s(c), a.unsubscribe();
          }
        }, "next"),
        error: s,
        complete: o
      });
      r.subscribe(a);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[_w] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    return Sw(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = xp(t), new t(function(r, o) {
      var s;
      n.subscribe(function(a) {
        return s = a;
      }, function(a) {
        return o(a);
      }, function() {
        return r(s);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function xp(e) {
  var t;
  return (t = e ?? Iw.Promise) !== null && t !== void 0 ? t : Promise;
}
i(xp, "getPromiseCtor");
function Tw(e) {
  return e && Zt(e.next) && Zt(e.error) && Zt(e.complete);
}
i(Tw, "isObserver");
function Aw(e) {
  return e && e instanceof Cd || Tw(e) && oy(e);
}
i(Aw, "isSubscriber");
function Ow(e) {
  return Zt(e?.lift);
}
i(Ow, "hasLift");
function is(e) {
  return function(t) {
    if (Ow(t))
      return t.lift(function(n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
i(is, "operate");
function ss(e, t, n, r, o) {
  return new Fw(e, t, n, r, o);
}
i(ss, "createOperatorSubscriber");
var Fw = function(e) {
  ko(t, e);
  function t(n, r, o, s, a, u) {
    var c = e.call(this, n) || this;
    return c.onFinalize = a, c.shouldUnsubscribe = u, c._next = r ? function(l) {
      try {
        r(l);
      } catch (d) {
        n.error(d);
      }
    } : e.prototype._next, c._error = s ? function(l) {
      try {
        s(l);
      } catch (d) {
        n.error(d);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, c._complete = o ? function() {
      try {
        o();
      } catch (l) {
        n.error(l);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, c;
  }
  return i(t, "OperatorSubscriber"), t.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      e.prototype.unsubscribe.call(this), !r && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, t;
}(Cd), Nw = Id(function(e) {
  return /* @__PURE__ */ i(function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  }, "ObjectUnsubscribedErrorImpl");
}), Ni = function(e) {
  ko(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return i(t, "Subject"), t.prototype.lift = function(n) {
    var r = new Pp(this, this);
    return r.operator = n, r;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Nw();
  }, t.prototype.next = function(n) {
    var r = this;
    ca(function() {
      var o, s;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var a = ol(r.currentObservers), u = a.next(); !u.done; u = a.next()) {
            var c = u.value;
            c.next(n);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            u && !u.done && (s = a.return) && s.call(a);
          } finally {
            if (o) throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var r = this;
    ca(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var o = r.observers; o.length; )
          o.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    ca(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var r = n.observers; r.length; )
          r.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: /* @__PURE__ */ i(function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    }, "get"),
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
  }, t.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, t.prototype._innerSubscribe = function(n) {
    var r = this, o = this, s = o.hasError, a = o.isStopped, u = o.observers;
    return s || a ? ry : (this.currentObservers = null, u.push(n), new Ro(function() {
      r.currentObservers = null, al(u, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var r = this, o = r.hasError, s = r.thrownError, a = r.isStopped;
    o ? n.error(s) : a && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new cl();
    return n.source = this, n;
  }, t.create = function(n, r) {
    return new Pp(n, r);
  }, t;
}(cl), Pp = function(e) {
  ko(t, e);
  function t(n, r) {
    var o = e.call(this) || this;
    return o.destination = n, o.source = r, o;
  }
  return i(t, "AnonymousSubject"), t.prototype.next = function(n) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || o === void 0 || o.call(r, n);
  }, t.prototype.error = function(n) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || o === void 0 || o.call(r, n);
  }, t.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, t.prototype._subscribe = function(n) {
    var r, o;
    return (o = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && o !== void 0 ? o : ry;
  }, t;
}(Ni), kw = function(e) {
  ko(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r._value = n, r;
  }
  return i(t, "BehaviorSubject"), Object.defineProperty(t.prototype, "value", {
    get: /* @__PURE__ */ i(function() {
      return this.getValue();
    }, "get"),
    enumerable: !1,
    configurable: !0
  }), t.prototype._subscribe = function(n) {
    var r = e.prototype._subscribe.call(this, n);
    return !r.closed && n.next(this._value), r;
  }, t.prototype.getValue = function() {
    var n = this, r = n.hasError, o = n.thrownError, s = n._value;
    if (r)
      throw o;
    return this._throwIfClosed(), s;
  }, t.prototype.next = function(n) {
    e.prototype.next.call(this, this._value = n);
  }, t;
}(Ni), Rw = new cl(function(e) {
  return e.complete();
}), sy = Id(function(e) {
  return /* @__PURE__ */ i(function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  }, "EmptyErrorImpl");
});
function xw(e, t) {
  return is(function(n, r) {
    var o = 0;
    n.subscribe(ss(r, function(s) {
      r.next(e.call(t, s, o++));
    }));
  });
}
i(xw, "map");
function Pw(e, t) {
  return is(function(n, r) {
    var o = 0;
    n.subscribe(ss(r, function(s) {
      return e.call(t, s, o++) && r.next(s);
    }));
  });
}
i(Pw, "filter");
function Lw(e) {
  return is(function(t, n) {
    var r = !1;
    t.subscribe(ss(n, function(o) {
      r = !0, n.next(o);
    }, function() {
      r || n.next(e), n.complete();
    }));
  });
}
i(Lw, "defaultIfEmpty");
function jw(e) {
  return e <= 0 ? function() {
    return Rw;
  } : is(function(t, n) {
    var r = 0;
    t.subscribe(ss(n, function(o) {
      ++r <= e && (n.next(o), e <= r && n.complete());
    }));
  });
}
i(jw, "take");
function $w(e) {
  return e === void 0 && (e = Bw), is(function(t, n) {
    var r = !1;
    t.subscribe(ss(n, function(o) {
      r = !0, n.next(o);
    }, function() {
      return r ? n.complete() : n.error(e());
    }));
  });
}
i($w, "throwIfEmpty");
function Bw() {
  return new sy();
}
i(Bw, "defaultErrorFactory");
function Hw(e, t) {
  var n = arguments.length >= 2;
  return function(r) {
    return r.pipe(e ? Pw(function(o, s) {
      return e(o, s, r);
    }) : iy, jw(1), n ? Lw(t) : $w(function() {
      return new sy();
    }));
  };
}
i(Hw, "first");
/**
 * @license Angular v17.3.12
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
const Vw = "https://angular.io/errors", jr = "https://g.co/ng/security#xss";
class I extends Error {
  static {
    i(this, "RuntimeError");
  }
  constructor(t, n) {
    super(ye(t, n)), this.code = t;
  }
}
function ye(e, t) {
  const n = `NG0${Math.abs(e)}`;
  let r = `${n}${t ? ": " + t : ""}`;
  if (ngDevMode && e < 0) {
    const s = !r.match(/[.,;!?\n]$/) ? "." : "";
    r = `${r}${s} Find more at ${Vw}/${n}`;
  }
  return r;
}
i(ye, "formatRuntimeError");
const du = /* @__PURE__ */ Symbol("InputSignalNode#UNSET"), ay = {
  ...ny,
  transformFn: void 0,
  applyValueToInputSignal(e, t) {
    lu(e, t);
  }
}, Uw = /* @__PURE__ */ Symbol();
function uy(e, t) {
  const n = Object.create(ay);
  n.value = e, n.transformFn = t?.transform;
  function r() {
    if (uu(n), n.value === du)
      throw new I(-950, ngDevMode && "Input is required but no value is available yet.");
    return n.value;
  }
  return i(r, "inputValueFn"), r[pt] = n, ngDevMode && (r.toString = () => `[Input Signal: ${r()}]`), r;
}
i(uy, "createInputSignal");
function tn(e) {
  return { toString: e }.toString();
}
i(tn, "noSideEffects");
const qr = "__annotations__", Qr = "__parameters__", Zr = "__prop__metadata__";
function as(e, t, n, r, o) {
  return tn(() => {
    const s = Ed(t);
    function a(...u) {
      if (this instanceof a)
        return s.call(this, ...u), this;
      const c = new a(...u);
      return /* @__PURE__ */ i(function(d) {
        return o && o(d, ...u), (d.hasOwnProperty(qr) ? d[qr] : Object.defineProperty(d, qr, { value: [] })[qr]).push(c), d;
      }, "TypeDecorator");
    }
    return i(a, "DecoratorFactory"), n && (a.prototype = Object.create(n.prototype)), a.prototype.ngMetadataName = e, a.annotationCls = a, a;
  });
}
i(as, "makeDecorator");
function Ed(e) {
  return /* @__PURE__ */ i(function(...n) {
    if (e) {
      const r = e(...n);
      for (const o in r)
        this[o] = r[o];
    }
  }, "ctor");
}
i(Ed, "makeMetadataCtor");
function xo(e, t, n) {
  return tn(() => {
    const r = Ed(t);
    function o(...s) {
      if (this instanceof o)
        return r.apply(this, s), this;
      const a = new o(...s);
      return u.annotation = a, u;
      function u(c, l, d) {
        const f = c.hasOwnProperty(Qr) ? c[Qr] : Object.defineProperty(c, Qr, { value: [] })[Qr];
        for (; f.length <= d; )
          f.push(null);
        return (f[d] = f[d] || []).push(a), c;
      }
      i(u, "ParamDecorator");
    }
    return i(o, "ParamDecoratorFactory"), o.prototype.ngMetadataName = e, o.annotationCls = o, o;
  });
}
i(xo, "makeParamDecorator");
function er(e, t, n, r) {
  return tn(() => {
    const o = Ed(t);
    function s(...a) {
      if (this instanceof s)
        return o.apply(this, a), this;
      const u = new s(...a);
      function c(l, d) {
        if (l === void 0)
          throw new Error("Standard Angular field decorators are not supported in JIT mode.");
        const f = l.constructor, h = f.hasOwnProperty(Zr) ? f[Zr] : Object.defineProperty(f, Zr, { value: {} })[Zr];
        h[d] = h.hasOwnProperty(d) && h[d] || [], h[d].unshift(u);
      }
      return i(c, "PropDecorator"), c;
    }
    return i(s, "PropDecoratorFactory"), n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = e, s.annotationCls = s, s;
  });
}
i(er, "makePropDecorator");
const pe = globalThis;
function zw() {
  const e = typeof location < "u" ? location.toString() : "", t = {
    namedConstructors: e.indexOf("ngDevMode=namedConstructors") != -1,
    firstCreatePass: 0,
    tNode: 0,
    tView: 0,
    rendererCreateTextNode: 0,
    rendererSetText: 0,
    rendererCreateElement: 0,
    rendererAddEventListener: 0,
    rendererSetAttribute: 0,
    rendererRemoveAttribute: 0,
    rendererSetProperty: 0,
    rendererSetClassName: 0,
    rendererAddClass: 0,
    rendererRemoveClass: 0,
    rendererSetStyle: 0,
    rendererRemoveStyle: 0,
    rendererDestroy: 0,
    rendererDestroyNode: 0,
    rendererMoveNode: 0,
    rendererRemoveNode: 0,
    rendererAppendChild: 0,
    rendererInsertBefore: 0,
    rendererCreateComment: 0,
    hydratedNodes: 0,
    hydratedComponents: 0,
    dehydratedViewsRemoved: 0,
    dehydratedViewsCleanupRuns: 0,
    componentsSkippedHydration: 0
  };
  return e.indexOf("ngDevMode=false") === -1 ? (typeof pe.ngDevMode != "object" && (pe.ngDevMode = {}), Object.assign(pe.ngDevMode, t)) : pe.ngDevMode = !1, t;
}
i(zw, "ngDevModeResetPerfCounters");
function bd() {
  return typeof ngDevMode > "u" || ngDevMode ? ((typeof ngDevMode != "object" || Object.keys(ngDevMode).length === 0) && zw(), typeof ngDevMode < "u" && !!ngDevMode) : !1;
}
i(bd, "initNgDevMode");
function te(e) {
  for (let t in e)
    if (e[t] === te)
      return t;
  throw Error("Could not find renamed property on target object.");
}
i(te, "getClosureSafeProperty");
function Gw(e, t) {
  for (const n in t)
    t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
i(Gw, "fillProperties");
function Z(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e))
    return "[" + e.map(Z).join(", ") + "]";
  if (e == null)
    return "" + e;
  if (e.overriddenName)
    return `${e.overriddenName}`;
  if (e.name)
    return `${e.name}`;
  const t = e.toString();
  if (t == null)
    return "" + t;
  const n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
i(Z, "stringify");
function ll(e, t) {
  return e == null || e === "" ? t === null ? "" : t : t == null || t === "" ? e : e + " " + t;
}
i(ll, "concatStringsWithSpace");
function Ww(e, t = 100) {
  if (!e || t < 1 || e.length <= t)
    return e;
  if (t == 1)
    return e.substring(0, 1) + "...";
  const n = Math.round(t / 2);
  return e.substring(0, n) + "..." + e.substring(e.length - n);
}
i(Ww, "truncateMiddle");
const qw = te({ __forward_ref__: te });
function fu(e) {
  return e.__forward_ref__ = fu, e.toString = function() {
    return Z(this());
  }, e;
}
i(fu, "forwardRef");
function x(e) {
  return hu(e) ? e() : e;
}
i(x, "resolveForwardRef");
function hu(e) {
  return typeof e == "function" && e.hasOwnProperty(qw) && e.__forward_ref__ === fu;
}
i(hu, "isForwardRef");
function X(e, t) {
  typeof e != "number" && T(t, typeof e, "number", "===");
}
i(X, "assertNumber");
function ki(e, t, n) {
  X(e, "Expected a number"), dy(e, n, "Expected number to be less than or equal to"), wn(e, t, "Expected number to be greater than or equal to");
}
i(ki, "assertNumberInRange");
function Po(e, t) {
  typeof e != "string" && T(t, e === null ? "null" : typeof e, "string", "===");
}
i(Po, "assertString");
function cy(e, t) {
  typeof e != "function" && T(t, e === null ? "null" : typeof e, "function", "===");
}
i(cy, "assertFunction");
function O(e, t, n) {
  e != t && T(n, e, t, "==");
}
i(O, "assertEqual");
function $t(e, t, n) {
  e == t && T(n, e, t, "!=");
}
i($t, "assertNotEqual");
function ly(e, t, n) {
  e !== t && T(n, e, t, "===");
}
i(ly, "assertSame");
function $r(e, t, n) {
  e === t && T(n, e, t, "!==");
}
i($r, "assertNotSame");
function Zn(e, t, n) {
  e < t || T(n, e, t, "<");
}
i(Zn, "assertLessThan");
function dy(e, t, n) {
  e <= t || T(n, e, t, "<=");
}
i(dy, "assertLessThanOrEqual");
function tr(e, t, n) {
  e > t || T(n, e, t, ">");
}
i(tr, "assertGreaterThan");
function wn(e, t, n) {
  e >= t || T(n, e, t, ">=");
}
i(wn, "assertGreaterThanOrEqual");
function b(e, t) {
  e == null && T(t, e, null, "!=");
}
i(b, "assertDefined");
function T(e, t, n, r) {
  throw new Error(`ASSERTION ERROR: ${e}` + (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`));
}
i(T, "throwError");
function On(e) {
  e instanceof Node || T(`The provided value must be an instance of a DOM Node but got ${Z(e)}`);
}
i(On, "assertDomNode");
function Qw(e) {
  e instanceof Element || T(`The provided value must be an element but got ${Z(e)}`);
}
i(Qw, "assertElement");
function be(e, t) {
  b(e, "Array must be defined.");
  const n = e.length;
  (t < 0 || t >= n) && T(`Index expected to be less than ${n} but got ${t}`);
}
i(be, "assertIndexInRange");
function Zw(e, ...t) {
  if (t.indexOf(e) !== -1)
    return !0;
  T(`Expected value to be one of ${JSON.stringify(t)} but was ${JSON.stringify(e)}.`);
}
i(Zw, "assertOneOf");
function wd(e) {
  Gm() !== null && T(`${e}() should never be called in a reactive context.`);
}
i(wd, "assertNotReactive");
function ne(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0
  };
}
i(ne, "ɵɵdefineInjectable");
const Yw = ne;
function pu(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
i(pu, "ɵɵdefineInjector");
function us(e) {
  return Lp(e, Ri) || Lp(e, fy);
}
i(us, "getInjectableDef");
function Kw(e) {
  return us(e) !== null;
}
i(Kw, "isInjectable");
function Lp(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
i(Lp, "getOwnDefinition");
function Jw(e) {
  const t = e && (e[Ri] || e[fy]);
  return t ? (ngDevMode && console.warn(`DEPRECATED: DI is instantiating a token "${e.name}" that inherits its @Injectable decorator but does not provide one itself.
This will become an error in a future version of Angular. Please add @Injectable() to the "${e.name}" class.`), t) : null;
}
i(Jw, "getInheritedInjectableDef");
function Ea(e) {
  return e && (e.hasOwnProperty(ba) || e.hasOwnProperty(Xw)) ? e[ba] : null;
}
i(Ea, "getInjectorDef");
const Ri = te({ ɵprov: te }), ba = te({ ɵinj: te }), fy = te({ ngInjectableDef: te }), Xw = te({ ngInjectorDef: te });
class $ {
  static {
    i(this, "InjectionToken");
  }
  /**
   * @param _desc   Description for the token,
   *                used only for debugging purposes,
   *                it should but does not need to be unique
   * @param options Options for the token's usage, as described above
   */
  constructor(t, n) {
    this._desc = t, this.ngMetadataName = "InjectionToken", this.ɵprov = void 0, typeof n == "number" ? ((typeof ngDevMode > "u" || ngDevMode) && Zn(n, 0, "Only negative numbers are supported here"), this.__NG_ELEMENT_ID__ = n) : n !== void 0 && (this.ɵprov = ne({
      token: this,
      providedIn: n.providedIn || "root",
      factory: n.factory
    }));
  }
  /**
   * @internal
   */
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
}
let dl;
function Md() {
  return !ngDevMode && T("getInjectorProfilerContext should never be called in production mode"), dl;
}
i(Md, "getInjectorProfilerContext");
function We(e) {
  !ngDevMode && T("setInjectorProfilerContext should never be called in production mode");
  const t = dl;
  return dl = e, t;
}
i(We, "setInjectorProfilerContext");
let fl = null;
const eM = /* @__PURE__ */ i((e) => {
  !ngDevMode && T("setInjectorProfiler should never be called in production mode"), fl = e;
}, "setInjectorProfiler");
function _d(e) {
  !ngDevMode && T("Injector profiler should never be called in production mode"), fl?.(e);
}
i(_d, "injectorProfiler");
function hl(e, t = !1) {
  !ngDevMode && T("Injector profiler should never be called in production mode");
  let n;
  typeof e == "function" || e instanceof $ ? n = e : n = x(e.provide);
  let r = e;
  e instanceof $ && (r = e.ɵprov || e), _d({
    type: 2,
    context: Md(),
    providerRecord: { token: n, provider: r, isViewProvider: t }
  });
}
i(hl, "emitProviderConfiguredEvent");
function wa(e) {
  !ngDevMode && T("Injector profiler should never be called in production mode"), _d({
    type: 1,
    context: Md(),
    instance: { value: e }
  });
}
i(wa, "emitInstanceCreatedByInjectorEvent");
function hy(e, t, n) {
  !ngDevMode && T("Injector profiler should never be called in production mode"), _d({
    type: 0,
    context: Md(),
    service: { token: e, value: t, flags: n }
  });
}
i(hy, "emitInjectEvent");
function mi(e, t, n) {
  !ngDevMode && T("runInInjectorProfilerContext should never be called in production mode");
  const r = We({ injector: e, token: t });
  try {
    n();
  } finally {
    We(r);
  }
}
i(mi, "runInInjectorProfilerContext");
function cs(e) {
  return e && !!e.ɵproviders;
}
i(cs, "isEnvironmentProviders");
const Lo = te({ ɵcmp: te }), gu = te({ ɵdir: te }), mu = te({ ɵpipe: te }), Sd = te({ ɵmod: te }), mn = te({ ɵfac: te }), to = te({ __NG_ELEMENT_ID__: te }), jp = te({ __NG_ENV_ID__: te });
function j(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
i(j, "renderStringify");
function z(e) {
  return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : j(e);
}
i(z, "stringifyForError");
function tM(e) {
  let t = e[Lo] || null;
  return t !== null && t.debugInfo ? nM(t.debugInfo) : z(e);
}
i(tM, "debugStringifyTypeForError");
function nM(e) {
  return !e.filePath || !e.lineNumber ? e.className : `${e.className} (at ${e.filePath}:${e.lineNumber})`;
}
i(nM, "stringifyTypeFromDebugInfo");
function Td(e, t) {
  const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new I(-200, ngDevMode ? `Circular dependency in DI detected for ${e}${n}` : e);
}
i(Td, "throwCyclicDependencyError");
function $p() {
  throw new Error("Cannot mix multi providers and regular providers");
}
i($p, "throwMixedMultiProviderError");
function pl(e, t, n) {
  if (e && t) {
    const r = t.map((o) => o == n ? "?" + n + "?" : "...");
    throw new Error(`Invalid provider for the NgModule '${Z(e)}' - only instances of Provider and Type are allowed, got: [${r.join(", ")}]`);
  } else throw cs(n) ? n.ɵfromNgModule ? new I(207, "Invalid providers from 'importProvidersFrom' present in a non-environment injector. 'importProvidersFrom' can't be used for component providers.") : new I(207, "Invalid providers present in a non-environment injector. 'EnvironmentProviders' can't be used for component providers.") : new Error("Invalid provider");
}
i(pl, "throwInvalidProviderError");
function Ad(e, t) {
  const n = ngDevMode && `No provider for ${z(e)} found${t ? ` in ${t}` : ""}`;
  throw new I(-201, n);
}
i(Ad, "throwProviderNotFoundError");
var G;
(function(e) {
  e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional";
})(G || (G = {}));
let Ma;
function py() {
  return Ma;
}
i(py, "getInjectImplementation");
function tt(e) {
  const t = Ma;
  return Ma = e, t;
}
i(tt, "setInjectImplementation");
function gy(e, t, n) {
  const r = us(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? r.value = r.factory() : r.value;
  if (n & G.Optional)
    return null;
  if (t !== void 0)
    return t;
  Ad(e, "Injector");
}
i(gy, "injectRootLimpMode");
function rM(e) {
  ngDevMode && $t(Ma, e, "Calling ɵɵinject would cause infinite recursion");
}
i(rM, "assertInjectImplementationNotEqual");
const oM = {}, xi = oM, gl = "__NG_DI_FLAG__", _a = "ngTempTokenPath", iM = "ngTokenPath", sM = /\n/gm, aM = "ɵ", Bp = "__source";
let no;
function uM() {
  return no;
}
i(uM, "getCurrentInjector");
function dn(e) {
  const t = no;
  return no = e, t;
}
i(dn, "setCurrentInjector");
function cM(e, t = G.Default) {
  if (no === void 0)
    throw new I(-203, ngDevMode && "inject() must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`.");
  if (no === null)
    return gy(e, void 0, t);
  {
    const n = no.get(e, t & G.Optional ? null : void 0, t);
    return ngDevMode && hy(e, n, t), n;
  }
}
i(cM, "injectInjectorOnly");
function ke(e, t = G.Default) {
  return (py() || cM)(x(e), t);
}
i(ke, "ɵɵinject");
function Od(e) {
  throw new I(202, ngDevMode && `This constructor is not compatible with Angular Dependency Injection because its dependency at index ${e} of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index ${e} is correct and 2) the correct Angular decorators are defined for this class and its ancestors.`);
}
i(Od, "ɵɵinvalidFactoryDep");
function M(e, t = G.Default) {
  return ke(e, ls(t));
}
i(M, "inject");
function ls(e) {
  return typeof e > "u" || typeof e == "number" ? e : 0 | // comment to force a line break in the formatter
  (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
i(ls, "convertToBitFlags");
function ml(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const r = x(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0)
        throw new I(900, ngDevMode && "Arguments array must have arguments.");
      let o, s = G.Default;
      for (let a = 0; a < r.length; a++) {
        const u = r[a], c = lM(u);
        typeof c == "number" ? c === -1 ? o = u.token : s |= c : o = u;
      }
      t.push(ke(o, s));
    } else
      t.push(ke(r));
  }
  return t;
}
i(ml, "injectArgs");
function ds(e, t) {
  return e[gl] = t, e.prototype[gl] = t, e;
}
i(ds, "attachInjectFlag");
function lM(e) {
  return e[gl];
}
i(lM, "getInjectFlag");
function dM(e, t, n, r) {
  const o = e[_a];
  throw t[Bp] && o.unshift(t[Bp]), e.message = fM(`
` + e.message, o, n, r), e[iM] = o, e[_a] = null, e;
}
i(dM, "catchInjectorError");
function fM(e, t, n, r = null) {
  e = e && e.charAt(0) === `
` && e.charAt(1) == aM ? e.slice(2) : e;
  let o = Z(t);
  if (Array.isArray(t))
    o = t.map(Z).join(" -> ");
  else if (typeof t == "object") {
    let s = [];
    for (let a in t)
      if (t.hasOwnProperty(a)) {
        let u = t[a];
        s.push(a + ":" + (typeof u == "string" ? JSON.stringify(u) : Z(u)));
      }
    o = `{${s.join(", ")}}`;
  }
  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(sM, `
  `)}`;
}
i(fM, "formatError");
const ht = ds(
  // Disable tslint because `DecoratorFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  xo("Inject", (e) => ({ token: e })),
  -1
  /* DecoratorFlags.Inject */
), Kt = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ds(
    xo("Optional"),
    8
    /* InternalInjectFlags.Optional */
  )
), my = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ds(
    xo("Self"),
    2
    /* InternalInjectFlags.Self */
  )
), yu = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ds(
    xo("SkipSelf"),
    4
    /* InternalInjectFlags.SkipSelf */
  )
), fs = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ds(
    xo("Host"),
    1
    /* InternalInjectFlags.Host */
  )
);
function lr(e, t) {
  const n = e.hasOwnProperty(mn);
  if (!n && t === !0 && ngDevMode)
    throw new Error(`Type ${Z(e)} does not have 'ɵfac' property.`);
  return n ? e[mn] : null;
}
i(lr, "getFactoryDef");
function hM(e, t, n) {
  if (e.length !== t.length)
    return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r], s = t[r];
    if (n && (o = n(o), s = n(s)), s !== o)
      return !1;
  }
  return !0;
}
i(hM, "arrayEquals");
function nt(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
i(nt, "flatten");
function mo(e, t) {
  e.forEach((n) => Array.isArray(n) ? mo(n, t) : t(n));
}
i(mo, "deepForEach$1");
function yy(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
i(yy, "addToArray");
function Sa(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
i(Sa, "removeFromArray");
function yi(e, t) {
  const n = [];
  for (let r = 0; r < e; r++)
    n.push(t);
  return n;
}
i(yi, "newArray");
function Hp(e, t, n) {
  const r = e.length - n;
  for (; t < r; )
    e[t] = e[t + n], t++;
  for (; n--; )
    e.pop();
}
i(Hp, "arraySplice");
function Dy(e, t, n, r) {
  ngDevMode && dy(t, e.length, "Can't insert past array end.");
  let o = e.length;
  if (o == t)
    e.push(n, r);
  else if (o === 1)
    e.push(r, e[0]), e[0] = n;
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      const s = o - 2;
      e[o] = e[s], o--;
    }
    e[t] = n, e[t + 1] = r;
  }
}
i(Dy, "arrayInsert2");
function Dt(e, t, n) {
  let r = hs(e, t);
  return r >= 0 ? e[r | 1] = n : (r = ~r, Dy(e, r, t, n)), r;
}
i(Dt, "keyValueArraySet");
function wc(e, t) {
  const n = hs(e, t);
  if (n >= 0)
    return e[n | 1];
}
i(wc, "keyValueArrayGet");
function hs(e, t) {
  return pM(e, t, 1);
}
i(hs, "keyValueArrayIndexOf");
function pM(e, t, n) {
  ngDevMode && O(Array.isArray(e), !0, "Expecting an array");
  let r = 0, o = e.length >> n;
  for (; o !== r; ) {
    const s = r + (o - r >> 1), a = e[s << n];
    if (t === a)
      return s << n;
    a > t ? o = s : r = s + 1;
  }
  return ~(o << n);
}
i(pM, "_arrayIndexOfSorted");
const Pt = {}, Q = [];
(typeof ngDevMode > "u" || ngDevMode) && bd() && (Object.freeze(Pt), Object.freeze(Q));
const dr = new $(ngDevMode ? "ENVIRONMENT_INITIALIZER" : ""), Fd = new $(
  ngDevMode ? "INJECTOR" : "",
  // Disable tslint because this is const enum which gets inlined not top level prop access.
  // tslint:disable-next-line: no-toplevel-property-access
  -1
  /* InjectorMarkers.Injector */
), Nd = new $(ngDevMode ? "INJECTOR_DEF_TYPES" : "");
class Du {
  static {
    i(this, "NullInjector");
  }
  get(t, n = xi) {
    if (n === xi) {
      const r = new Error(`NullInjectorError: No provider for ${Z(t)}!`);
      throw r.name = "NullInjectorError", r;
    }
    return n;
  }
}
var fr;
(function(e) {
  e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default";
})(fr || (fr = {}));
var yn;
(function(e) {
  e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom";
})(yn || (yn = {}));
var Dn;
(function(e) {
  e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform";
})(Dn || (Dn = {}));
function gM(e, t, n) {
  ngDevMode && $t(t, "", 'can not look for "" string.');
  let r = e.length;
  for (; ; ) {
    const o = e.indexOf(t, n);
    if (o === -1)
      return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      const s = t.length;
      if (o + s === r || e.charCodeAt(o + s) <= 32)
        return o;
    }
    n = o + 1;
  }
}
i(gM, "classIndexOf");
function yl(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    const o = n[r];
    if (typeof o == "number") {
      if (o !== 0)
        break;
      r++;
      const s = n[r++], a = n[r++], u = n[r++];
      ngDevMode && ngDevMode.rendererSetAttribute++, e.setAttribute(t, a, u, s);
    } else {
      const s = o, a = n[++r];
      ngDevMode && ngDevMode.rendererSetAttribute++, Iy(s) ? e.setProperty(t, s, a) : e.setAttribute(t, s, a), r++;
    }
  }
  return r;
}
i(yl, "setUpAttributes");
function vy(e) {
  return e === 3 || e === 4 || e === 6;
}
i(vy, "isNameOnlyAttributeMarker");
function Iy(e) {
  return e.charCodeAt(0) === 64;
}
i(Iy, "isAnimationProp");
function Pi(e, t) {
  if (!(t === null || t.length === 0)) if (e === null || e.length === 0)
    e = t.slice();
  else {
    let n = -1;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? Vp(e, n, o, null, t[++r]) : Vp(e, n, o, null, null));
    }
  }
  return e;
}
i(Pi, "mergeHostAttrs");
function Vp(e, t, n, r, o) {
  let s = 0, a = e.length;
  if (t === -1)
    a = -1;
  else
    for (; s < e.length; ) {
      const u = e[s++];
      if (typeof u == "number") {
        if (u === t) {
          a = -1;
          break;
        } else if (u > t) {
          a = s - 1;
          break;
        }
      }
    }
  for (; s < e.length; ) {
    const u = e[s];
    if (typeof u == "number")
      break;
    if (u === n) {
      o !== null && (e[s + 1] = o);
      return;
    }
    s++, o !== null && s++;
  }
  a !== -1 && (e.splice(a, 0, t), s = a + 1), e.splice(s++, 0, n), o !== null && e.splice(s++, 0, o);
}
i(Vp, "mergeHostAttribute");
const Cy = "ng-template";
function mM(e, t, n, r) {
  ngDevMode && O(n, n.toLowerCase(), "Class name expected to be lowercase.");
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
      if (t[o] === "class" && gM(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (kd(e))
    return !1;
  if (o = t.indexOf(1, o), o > -1) {
    let s;
    for (; ++o < t.length && typeof (s = t[o]) == "string"; )
      if (s.toLowerCase() === n)
        return !0;
  }
  return !1;
}
i(mM, "isCssClassMatching");
function kd(e) {
  return e.type === 4 && e.value !== Cy;
}
i(kd, "isInlineTemplate");
function yM(e, t, n) {
  const r = e.type === 4 && !n ? Cy : e.value;
  return t === r;
}
i(yM, "hasTagAndTypeMatch");
function DM(e, t, n) {
  ngDevMode && b(t[0], "Selector should have a tag name");
  let r = 4;
  const o = e.attrs, s = o !== null ? CM(o) : 0;
  let a = !1;
  for (let u = 0; u < t.length; u++) {
    const c = t[u];
    if (typeof c == "number") {
      if (!a && !Tt(r) && !Tt(c))
        return !1;
      if (a && Tt(c))
        continue;
      a = !1, r = c | r & 1;
      continue;
    }
    if (!a)
      if (r & 4) {
        if (r = 2 | r & 1, c !== "" && !yM(e, c, n) || c === "" && t.length === 1) {
          if (Tt(r))
            return !1;
          a = !0;
        }
      } else if (r & 8) {
        if (o === null || !mM(e, o, c, n)) {
          if (Tt(r))
            return !1;
          a = !0;
        }
      } else {
        const l = t[++u], d = vM(c, o, kd(e), n);
        if (d === -1) {
          if (Tt(r))
            return !1;
          a = !0;
          continue;
        }
        if (l !== "") {
          let f;
          if (d > s ? f = "" : (ngDevMode && $t(o[d], 0, "We do not match directives on namespaced attributes"), f = o[d + 1].toLowerCase()), r & 2 && l !== f) {
            if (Tt(r))
              return !1;
            a = !0;
          }
        }
      }
  }
  return Tt(r) || a;
}
i(DM, "isNodeMatchingSelector");
function Tt(e) {
  return (e & 1) === 0;
}
i(Tt, "isPositive");
function vM(e, t, n, r) {
  if (t === null)
    return -1;
  let o = 0;
  if (r || !n) {
    let s = !1;
    for (; o < t.length; ) {
      const a = t[o];
      if (a === e)
        return o;
      if (a === 3 || a === 6)
        s = !0;
      else if (a === 1 || a === 2) {
        let u = t[++o];
        for (; typeof u == "string"; )
          u = t[++o];
        continue;
      } else {
        if (a === 4)
          break;
        if (a === 0) {
          o += 4;
          continue;
        }
      }
      o += s ? 1 : 2;
    }
    return -1;
  } else
    return EM(t, e);
}
i(vM, "findAttrIndexInNode");
function Ey(e, t, n = !1) {
  for (let r = 0; r < t.length; r++)
    if (DM(e, t[r], n))
      return !0;
  return !1;
}
i(Ey, "isNodeMatchingSelectorList");
function IM(e) {
  const t = e.attrs;
  if (t != null) {
    const n = t.indexOf(
      5
      /* AttributeMarker.ProjectAs */
    );
    if (!(n & 1))
      return t[n + 1];
  }
  return null;
}
i(IM, "getProjectAsAttrValue");
function CM(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (vy(n))
      return t;
  }
  return e.length;
}
i(CM, "getNameOnlyMarkerIndex");
function EM(e, t) {
  let n = e.indexOf(
    4
    /* AttributeMarker.Template */
  );
  if (n > -1)
    for (n++; n < e.length; ) {
      const r = e[n];
      if (typeof r == "number")
        return -1;
      if (r === t)
        return n;
      n++;
    }
  return -1;
}
i(EM, "matchTemplateAttribute");
function bM(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++)
        if (e[o] !== r[o])
          continue e;
      return !0;
    }
  }
  return !1;
}
i(bM, "isSelectorInSelectorList");
function Up(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
i(Up, "maybeWrapInNotSelector");
function wM(e) {
  let t = e[0], n = 1, r = 2, o = "", s = !1;
  for (; n < e.length; ) {
    let a = e[n];
    if (typeof a == "string")
      if (r & 2) {
        const u = e[++n];
        o += "[" + a + (u.length > 0 ? '="' + u + '"' : "") + "]";
      } else r & 8 ? o += "." + a : r & 4 && (o += " " + a);
    else
      o !== "" && !Tt(a) && (t += Up(s, o), o = ""), r = a, s = s || !Tt(r);
    n++;
  }
  return o !== "" && (t += Up(s, o)), t;
}
i(wM, "stringifyCSSSelector");
function by(e) {
  return e.map(wM).join(",");
}
i(by, "stringifyCSSSelectorList");
function MM(e) {
  const t = [], n = [];
  let r = 1, o = 2;
  for (; r < e.length; ) {
    let s = e[r];
    if (typeof s == "string")
      o === 2 ? s !== "" && t.push(s, e[++r]) : o === 8 && n.push(s);
    else {
      if (!Tt(o))
        break;
      o = s;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
i(MM, "extractAttrsAndClassesFromSelector");
function wy(e) {
  return tn(() => {
    (typeof ngDevMode > "u" || ngDevMode) && bd();
    const t = Sy(e), n = {
      ...t,
      decls: e.decls,
      vars: e.vars,
      template: e.template,
      consts: e.consts || null,
      ngContentSelectors: e.ngContentSelectors,
      onPush: e.changeDetection === fr.OnPush,
      directiveDefs: null,
      // assigned in noSideEffects
      pipeDefs: null,
      // assigned in noSideEffects
      dependencies: t.standalone && e.dependencies || null,
      getStandaloneInjector: null,
      signals: e.signals ?? !1,
      data: e.data || {},
      encapsulation: e.encapsulation || yn.Emulated,
      styles: e.styles || Q,
      _: null,
      schemas: e.schemas || null,
      tView: null,
      id: ""
    };
    Ty(n);
    const r = e.dependencies;
    return n.directiveDefs = Ta(
      r,
      /* pipeDef */
      !1
    ), n.pipeDefs = Ta(
      r,
      /* pipeDef */
      !0
    ), n.id = TM(n), n;
  });
}
i(wy, "ɵɵdefineComponent");
function _M(e) {
  return U(e) || Ne(e);
}
i(_M, "extractDirectiveDef");
function SM(e) {
  return e !== null;
}
i(SM, "nonNull");
function Rd(e) {
  return tn(() => ({
    type: e.type,
    bootstrap: e.bootstrap || Q,
    declarations: e.declarations || Q,
    imports: e.imports || Q,
    exports: e.exports || Q,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null
  }));
}
i(Rd, "ɵɵdefineNgModule");
function zp(e, t) {
  if (e == null)
    return Pt;
  const n = {};
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      const o = e[r];
      let s, a, u = Dn.None;
      Array.isArray(o) ? (u = o[0], s = o[1], a = o[2] ?? s) : (s = o, a = o), t ? (n[s] = u !== Dn.None ? [r, u] : r, t[s] = a) : n[s] = r;
    }
  return n;
}
i(zp, "parseAndConvertBindingsForDefinition");
function My(e) {
  return tn(() => {
    const t = Sy(e);
    return Ty(t), t;
  });
}
i(My, "ɵɵdefineDirective");
function _y(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone === !0,
    onDestroy: e.type.prototype.ngOnDestroy || null
  };
}
i(_y, "ɵɵdefinePipe");
function U(e) {
  return e[Lo] || null;
}
i(U, "getComponentDef");
function Ne(e) {
  return e[gu] || null;
}
i(Ne, "getDirectiveDef");
function ft(e) {
  return e[mu] || null;
}
i(ft, "getPipeDef$1");
function Fn(e) {
  const t = U(e) || Ne(e) || ft(e);
  return t !== null ? t.standalone : !1;
}
i(Fn, "isStandalone");
function gt(e, t) {
  const n = e[Sd] || null;
  if (!n && t === !0)
    throw new Error(`Type ${Z(e)} does not have 'ɵmod' property.`);
  return n;
}
i(gt, "getNgModuleDef");
function Sy(e) {
  const t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || Pt,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || Q,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: zp(e.inputs, t),
    outputs: zp(e.outputs),
    debugInfo: null
  };
}
i(Sy, "getNgDirectiveDef");
function Ty(e) {
  e.features?.forEach((t) => t(e));
}
i(Ty, "initFeatures");
function Ta(e, t) {
  if (!e)
    return null;
  const n = t ? ft : _M;
  return () => (typeof e == "function" ? e() : e).map((r) => n(r)).filter(SM);
}
i(Ta, "extractDefListOrFactory");
const la = /* @__PURE__ */ new Map();
function TM(e) {
  let t = 0;
  const n = [
    e.selectors,
    e.ngContentSelectors,
    e.hostVars,
    e.hostAttrs,
    e.consts,
    e.vars,
    e.decls,
    e.encapsulation,
    e.standalone,
    e.signals,
    e.exportAs,
    JSON.stringify(e.inputs),
    JSON.stringify(e.outputs),
    // We cannot use 'componentDef.type.name' as the name of the symbol will change and will not
    // match in the server and browser bundles.
    Object.getOwnPropertyNames(e.type.prototype),
    !!e.contentQueries,
    !!e.viewQuery
  ].join("|");
  for (const o of n)
    t = Math.imul(31, t) + o.charCodeAt(0) << 0;
  t += 2147483648;
  const r = "c" + t;
  if (typeof ngDevMode > "u" || ngDevMode)
    if (la.has(r)) {
      const o = la.get(r);
      o !== e.type && console.warn(ye(-912, `Component ID generation collision detected. Components '${o.name}' and '${e.type.name}' with selector '${by(e.selectors)}' generated the same component ID. To fix this, you can change the selector of one of those components or add an extra host attribute to force a different ID.`));
    } else
      la.set(r, e.type);
  return r;
}
i(TM, "getComponentId");
function ps(e) {
  return {
    ɵproviders: e
  };
}
i(ps, "makeEnvironmentProviders");
function Ay(...e) {
  return {
    ɵproviders: xd(!0, e),
    ɵfromNgModule: !0
  };
}
i(Ay, "importProvidersFrom");
function xd(e, ...t) {
  const n = [], r = /* @__PURE__ */ new Set();
  let o;
  const s = /* @__PURE__ */ i((a) => {
    n.push(a);
  }, "collectProviders");
  return mo(t, (a) => {
    if ((typeof ngDevMode > "u" || ngDevMode) && e && U(a)?.standalone)
      throw new I(800, `Importing providers supports NgModule or ModuleWithProviders but got a standalone component "${z(a)}"`);
    const u = a;
    Aa(u, s, [], r) && (o ||= [], o.push(u));
  }), o !== void 0 && Oy(o, s), n;
}
i(xd, "internalImportProvidersFrom");
function Oy(e, t) {
  for (let n = 0; n < e.length; n++) {
    const { ngModule: r, providers: o } = e[n];
    Pd(o, (s) => {
      ngDevMode && Fy(s, o || Q, r), t(s, r);
    });
  }
}
i(Oy, "processInjectorTypesWithProviders");
function Aa(e, t, n, r) {
  if (e = x(e), !e)
    return !1;
  let o = null, s = Ea(e);
  const a = !s && U(e);
  if (!s && !a) {
    const c = e.ngModule;
    if (s = Ea(c), s)
      o = c;
    else
      return !1;
  } else {
    if (a && !a.standalone)
      return !1;
    o = e;
  }
  if (ngDevMode && n.indexOf(o) !== -1) {
    const c = Z(o), l = n.map(Z);
    Td(c, l);
  }
  const u = r.has(o);
  if (a) {
    if (u)
      return !1;
    if (r.add(o), a.dependencies) {
      const c = typeof a.dependencies == "function" ? a.dependencies() : a.dependencies;
      for (const l of c)
        Aa(l, t, n, r);
    }
  } else if (s) {
    if (s.imports != null && !u) {
      ngDevMode && n.push(o), r.add(o);
      let l;
      try {
        mo(s.imports, (d) => {
          Aa(d, t, n, r) && (l ||= [], l.push(d));
        });
      } finally {
        ngDevMode && n.pop();
      }
      l !== void 0 && Oy(l, t);
    }
    if (!u) {
      const l = lr(o) || (() => new o());
      t({ provide: o, useFactory: l, deps: Q }, o), t({ provide: Nd, useValue: o, multi: !0 }, o), t({ provide: dr, useValue: /* @__PURE__ */ i(() => ke(o), "useValue"), multi: !0 }, o);
    }
    const c = s.providers;
    if (c != null && !u) {
      const l = e;
      Pd(c, (d) => {
        ngDevMode && Fy(d, c, l), t(d, l);
      });
    }
  } else
    return !1;
  return o !== e && e.providers !== void 0;
}
i(Aa, "walkProviderTree");
function Fy(e, t, n) {
  if (hr(e) || vu(e) || ky(e) || Ny(e))
    return;
  x(e && (e.useClass || e.provide)) || pl(n, t, e);
}
i(Fy, "validateProvider");
function Pd(e, t) {
  for (let n of e)
    cs(n) && (n = n.ɵproviders), Array.isArray(n) ? Pd(n, t) : t(n);
}
i(Pd, "deepForEachProvider");
const AM = te({ provide: String, useValue: te });
function vu(e) {
  return e !== null && typeof e == "object" && AM in e;
}
i(vu, "isValueProvider");
function Ny(e) {
  return !!(e && e.useExisting);
}
i(Ny, "isExistingProvider");
function ky(e) {
  return !!(e && e.useFactory);
}
i(ky, "isFactoryProvider");
function hr(e) {
  return typeof e == "function";
}
i(hr, "isTypeProvider");
function OM(e) {
  return !!e.useClass;
}
i(OM, "isClassProvider");
const Ld = new $(ngDevMode ? "Set Injector scope." : ""), da = {}, Gp = {};
let Mc;
function Iu() {
  return Mc === void 0 && (Mc = new Du()), Mc;
}
i(Iu, "getNullInjector");
class Lt {
  static {
    i(this, "EnvironmentInjector");
  }
}
class jo extends Lt {
  static {
    i(this, "R3Injector");
  }
  /**
   * Flag indicating that this injector was previously destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  constructor(t, n, r, o) {
    super(), this.parent = n, this.source = r, this.scopes = o, this.records = /* @__PURE__ */ new Map(), this._ngOnDestroyHooks = /* @__PURE__ */ new Set(), this._onDestroyHooks = [], this._destroyed = !1, vl(t, (a) => this.processProvider(a)), this.records.set(Fd, Yr(void 0, this)), o.has("environment") && this.records.set(Lt, Yr(void 0, this));
    const s = this.records.get(Ld);
    s != null && typeof s.value == "string" && this.scopes.add(s.value), this.injectorDefTypes = new Set(this.get(Nd, Q, G.Self));
  }
  /**
   * Destroy the injector and release references to every instance or provider associated with it.
   *
   * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
   * hook was found.
   */
  destroy() {
    this.assertNotDestroyed(), this._destroyed = !0;
    const t = B(null);
    try {
      for (const r of this._ngOnDestroyHooks)
        r.ngOnDestroy();
      const n = this._onDestroyHooks;
      this._onDestroyHooks = [];
      for (const r of n)
        r();
    } finally {
      this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), B(t);
    }
  }
  onDestroy(t) {
    return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t);
  }
  runInContext(t) {
    this.assertNotDestroyed();
    const n = dn(this), r = tt(void 0);
    let o;
    ngDevMode && (o = We({ injector: this, token: null }));
    try {
      return t();
    } finally {
      dn(n), tt(r), ngDevMode && We(o);
    }
  }
  get(t, n = xi, r = G.Default) {
    if (this.assertNotDestroyed(), t.hasOwnProperty(jp))
      return t[jp](this);
    r = ls(r);
    let o;
    ngDevMode && (o = We({ injector: this, token: t }));
    const s = dn(this), a = tt(void 0);
    try {
      if (!(r & G.SkipSelf)) {
        let c = this.records.get(t);
        if (c === void 0) {
          const l = xM(t) && us(t);
          l && this.injectableDefInScope(l) ? (ngDevMode && mi(this, t, () => {
            hl(t);
          }), c = Yr(Dl(t), da)) : c = null, this.records.set(t, c);
        }
        if (c != null)
          return this.hydrate(t, c);
      }
      const u = r & G.Self ? Iu() : this.parent;
      return n = r & G.Optional && n === xi ? null : n, u.get(t, n);
    } catch (u) {
      if (u.name === "NullInjectorError") {
        if ((u[_a] = u[_a] || []).unshift(Z(t)), s)
          throw u;
        return dM(u, t, "R3InjectorError", this.source);
      } else
        throw u;
    } finally {
      tt(a), dn(s), ngDevMode && We(o);
    }
  }
  /** @internal */
  resolveInjectorInitializers() {
    const t = B(null), n = dn(this), r = tt(void 0);
    let o;
    ngDevMode && (o = We({ injector: this, token: null }));
    try {
      const s = this.get(dr, Q, G.Self);
      if (ngDevMode && !Array.isArray(s))
        throw new I(-209, `Unexpected type of the \`ENVIRONMENT_INITIALIZER\` token value (expected an array, but got ${typeof s}). Please check that the \`ENVIRONMENT_INITIALIZER\` token is configured as a \`multi: true\` provider.`);
      for (const a of s)
        a();
    } finally {
      dn(n), tt(r), ngDevMode && We(o), B(t);
    }
  }
  toString() {
    const t = [], n = this.records;
    for (const r of n.keys())
      t.push(Z(r));
    return `R3Injector[${t.join(", ")}]`;
  }
  assertNotDestroyed() {
    if (this._destroyed)
      throw new I(205, ngDevMode && "Injector has already been destroyed.");
  }
  /**
   * Process a `SingleProvider` and add it.
   */
  processProvider(t) {
    t = x(t);
    let n = hr(t) ? t : x(t && t.provide);
    const r = NM(t);
    if (ngDevMode && mi(this, n, () => {
      vu(t) && wa(t.useValue), hl(t);
    }), !hr(t) && t.multi === !0) {
      let o = this.records.get(n);
      o ? ngDevMode && o.multi === void 0 && $p() : (o = Yr(void 0, da, !0), o.factory = () => ml(o.multi), this.records.set(n, o)), n = t, o.multi.push(t);
    } else if (ngDevMode) {
      const o = this.records.get(n);
      o && o.multi !== void 0 && $p();
    }
    this.records.set(n, r);
  }
  hydrate(t, n) {
    const r = B(null);
    try {
      return ngDevMode && n.value === Gp ? Td(Z(t)) : n.value === da && (n.value = Gp, ngDevMode ? mi(this, t, () => {
        n.value = n.factory(), wa(n.value);
      }) : n.value = n.factory()), typeof n.value == "object" && n.value && RM(n.value) && this._ngOnDestroyHooks.add(n.value), n.value;
    } finally {
      B(r);
    }
  }
  injectableDefInScope(t) {
    if (!t.providedIn)
      return !1;
    const n = x(t.providedIn);
    return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n);
  }
  removeOnDestroy(t) {
    const n = this._onDestroyHooks.indexOf(t);
    n !== -1 && this._onDestroyHooks.splice(n, 1);
  }
}
function Dl(e) {
  const t = us(e), n = t !== null ? t.factory : lr(e);
  if (n !== null)
    return n;
  if (e instanceof $)
    throw new I(204, ngDevMode && `Token ${Z(e)} is missing a ɵprov definition.`);
  if (e instanceof Function)
    return FM(e);
  throw new I(204, ngDevMode && "unreachable");
}
i(Dl, "injectableDefOrInjectorDefFactory");
function FM(e) {
  const t = e.length;
  if (t > 0)
    throw new I(204, ngDevMode && `Can't resolve all parameters for ${Z(e)}: (${yi(t, "?").join(", ")}).`);
  const n = Jw(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
i(FM, "getUndecoratedInjectableFactory");
function NM(e) {
  if (vu(e))
    return Yr(void 0, e.useValue);
  {
    const t = Ry(e);
    return Yr(t, da);
  }
}
i(NM, "providerToRecord");
function Ry(e, t, n) {
  let r;
  if (ngDevMode && cs(e) && pl(void 0, n, e), hr(e)) {
    const o = x(e);
    return lr(o) || Dl(o);
  } else if (vu(e))
    r = /* @__PURE__ */ i(() => x(e.useValue), "factory");
  else if (ky(e))
    r = /* @__PURE__ */ i(() => e.useFactory(...ml(e.deps || [])), "factory");
  else if (Ny(e))
    r = /* @__PURE__ */ i(() => ke(x(e.useExisting)), "factory");
  else {
    const o = x(e && (e.useClass || e.provide));
    if (ngDevMode && !o && pl(t, n, e), kM(e))
      r = /* @__PURE__ */ i(() => new o(...ml(e.deps)), "factory");
    else
      return lr(o) || Dl(o);
  }
  return r;
}
i(Ry, "providerToFactory");
function Yr(e, t, n = !1) {
  return {
    factory: e,
    value: t,
    multi: n ? [] : void 0
  };
}
i(Yr, "makeRecord");
function kM(e) {
  return !!e.deps;
}
i(kM, "hasDeps");
function RM(e) {
  return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function";
}
i(RM, "hasOnDestroy");
function xM(e) {
  return typeof e == "function" || typeof e == "object" && e instanceof $;
}
i(xM, "couldBeInjectableType");
function vl(e, t) {
  for (const n of e)
    Array.isArray(n) ? vl(n, t) : n && cs(n) ? vl(n.ɵproviders, t) : t(n);
}
i(vl, "forEachSingleProvider");
function jd(e, t) {
  e instanceof jo && e.assertNotDestroyed();
  let n;
  ngDevMode && (n = We({ injector: e, token: null }));
  const r = dn(e), o = tt(void 0);
  try {
    return t();
  } finally {
    dn(r), ngDevMode && We(n), tt(o);
  }
}
i(jd, "runInInjectionContext");
function xy() {
  return py() !== void 0 || uM() != null;
}
i(xy, "isInInjectionContext");
function Ye(e) {
  if (!xy())
    throw new I(-203, ngDevMode && e.name + "() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`");
}
i(Ye, "assertInInjectionContext");
var L;
(function(e) {
  e[e.Directive = 0] = "Directive", e[e.Component = 1] = "Component", e[e.Injectable = 2] = "Injectable", e[e.Pipe = 3] = "Pipe", e[e.NgModule = 4] = "NgModule";
})(L || (L = {}));
var Wp;
(function(e) {
  e[e.Directive = 0] = "Directive", e[e.Pipe = 1] = "Pipe", e[e.NgModule = 2] = "NgModule";
})(Wp || (Wp = {}));
var qp;
(function(e) {
  e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom";
})(qp || (qp = {}));
function Oe(e) {
  const t = pe.ng;
  if (t && t.ɵcompilerFacade)
    return t.ɵcompilerFacade;
  if (typeof ngDevMode > "u" || ngDevMode) {
    console.error(`JIT compilation failed for ${e.kind}`, e.type);
    let n = `The ${e.kind} '${e.type.name}' needs to be compiled using the JIT compiler, but '@angular/compiler' is not available.

`;
    throw e.usage === 1 ? (n += `The ${e.kind} is part of a library that has been partially compiled.
`, n += `However, the Angular Linker has not processed the library such that JIT compilation is used as fallback.
`, n += `
`, n += `Ideally, the library is processed using the Angular Linker to become fully AOT compiled.
`) : n += `JIT compilation is discouraged for production use-cases! Consider using AOT mode instead.
`, n += `Alternatively, the JIT compiler should be loaded by bootstrapping using '@angular/platform-browser-dynamic' or '@angular/platform-server',
`, n += `or manually provide the compiler with 'import "@angular/compiler";' before bootstrapping.`, new Error(n);
  } else
    throw new Error("JIT compiler unavailable");
}
i(Oe, "getCompilerFacade");
const Qp = {
  ɵɵdefineInjectable: ne,
  ɵɵdefineInjector: pu,
  ɵɵinject: ke,
  ɵɵinvalidFactoryDep: Od,
  resolveForwardRef: x
}, Py = Function;
function fi(e) {
  return typeof e == "function";
}
i(fi, "isType");
const PM = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*(arguments|(?:[^()]+\(\[\],)?[^()]+\(arguments\).*)\)/, LM = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/, jM = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/, $M = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{[^}]*super\(\.\.\.arguments\)/;
function BM(e) {
  return PM.test(e) || $M.test(e) || LM.test(e) && !jM.test(e);
}
i(BM, "isDelegateCtor");
class Ly {
  static {
    i(this, "ReflectionCapabilities");
  }
  constructor(t) {
    this._reflect = t || pe.Reflect;
  }
  factory(t) {
    return (...n) => new t(...n);
  }
  /** @internal */
  _zipTypesAndAnnotations(t, n) {
    let r;
    typeof t > "u" ? r = yi(n.length) : r = yi(t.length);
    for (let o = 0; o < r.length; o++)
      typeof t > "u" ? r[o] = [] : t[o] && t[o] != Object ? r[o] = [t[o]] : r[o] = [], n && n[o] != null && (r[o] = r[o].concat(n[o]));
    return r;
  }
  _ownParameters(t, n) {
    const r = t.toString();
    if (BM(r))
      return null;
    if (t.parameters && t.parameters !== n.parameters)
      return t.parameters;
    const o = t.ctorParameters;
    if (o && o !== n.ctorParameters) {
      const u = typeof o == "function" ? o() : o, c = u.map((d) => d && d.type), l = u.map((d) => d && _c(d.decorators));
      return this._zipTypesAndAnnotations(c, l);
    }
    const s = t.hasOwnProperty(Qr) && t[Qr], a = this._reflect && this._reflect.getOwnMetadata && this._reflect.getOwnMetadata("design:paramtypes", t);
    return a || s ? this._zipTypesAndAnnotations(a, s) : yi(t.length);
  }
  parameters(t) {
    if (!fi(t))
      return [];
    const n = Us(t);
    let r = this._ownParameters(t, n);
    return !r && n !== Object && (r = this.parameters(n)), r || [];
  }
  _ownAnnotations(t, n) {
    if (t.annotations && t.annotations !== n.annotations) {
      let r = t.annotations;
      return typeof r == "function" && r.annotations && (r = r.annotations), r;
    }
    return t.decorators && t.decorators !== n.decorators ? _c(t.decorators) : t.hasOwnProperty(qr) ? t[qr] : null;
  }
  annotations(t) {
    if (!fi(t))
      return [];
    const n = Us(t), r = this._ownAnnotations(t, n) || [];
    return (n !== Object ? this.annotations(n) : []).concat(r);
  }
  _ownPropMetadata(t, n) {
    if (t.propMetadata && t.propMetadata !== n.propMetadata) {
      let r = t.propMetadata;
      return typeof r == "function" && r.propMetadata && (r = r.propMetadata), r;
    }
    if (t.propDecorators && t.propDecorators !== n.propDecorators) {
      const r = t.propDecorators, o = {};
      return Object.keys(r).forEach((s) => {
        o[s] = _c(r[s]);
      }), o;
    }
    return t.hasOwnProperty(Zr) ? t[Zr] : null;
  }
  propMetadata(t) {
    if (!fi(t))
      return {};
    const n = Us(t), r = {};
    if (n !== Object) {
      const s = this.propMetadata(n);
      Object.keys(s).forEach((a) => {
        r[a] = s[a];
      });
    }
    const o = this._ownPropMetadata(t, n);
    return o && Object.keys(o).forEach((s) => {
      const a = [];
      r.hasOwnProperty(s) && a.push(...r[s]), a.push(...o[s]), r[s] = a;
    }), r;
  }
  ownPropMetadata(t) {
    return fi(t) ? this._ownPropMetadata(t, Us(t)) || {} : {};
  }
  hasLifecycleHook(t, n) {
    return t instanceof Py && n in t.prototype;
  }
}
function _c(e) {
  return e ? e.map((t) => {
    const r = t.type.annotationCls, o = t.args ? t.args : [];
    return new r(...o);
  }) : [];
}
i(_c, "convertTsickleDecoratorIntoMetadata");
function Us(e) {
  const t = e.prototype ? Object.getPrototypeOf(e.prototype) : null;
  return (t ? t.constructor : null) || Object;
}
i(Us, "getParentCtor");
const fe = 0, E = 1, S = 2, Ee = 3, kt = 4, Be = 5, mt = 6, yo = 7, se = 8, Se = 9, bt = 10, N = 11, Li = 12, Zp = 13, Yn = 14, ve = 15, gs = 16, Kr = 17, Rt = 18, pr = 19, jy = 20, Nn = 21, fa = 22, gr = 23, A = 25, $d = 1, ji = 6, Jt = 7, Oa = 8, mr = 9, me = 10;
var Fa;
(function(e) {
  e[e.None = 0] = "None", e[e.HasTransplantedViews = 2] = "HasTransplantedViews";
})(Fa || (Fa = {}));
function je(e) {
  return Array.isArray(e) && typeof e[$d] == "object";
}
i(je, "isLView");
function Re(e) {
  return Array.isArray(e) && e[$d] === !0;
}
i(Re, "isLContainer");
function Bd(e) {
  return (e.flags & 4) !== 0;
}
i(Bd, "isContentQueryHost");
function nr(e) {
  return e.componentOffset > -1;
}
i(nr, "isComponentHost");
function Cu(e) {
  return (e.flags & 1) === 1;
}
i(Cu, "isDirectiveHost");
function wt(e) {
  return !!e.template;
}
i(wt, "isComponentDef");
function Hd(e) {
  return (e[S] & 512) !== 0;
}
i(Hd, "isRootView");
function HM(e) {
  return (e.type & 16) === 16;
}
i(HM, "isProjectionTNode");
function VM(e) {
  return (e[S] & 32) === 32;
}
i(VM, "hasI18n");
function Il(e) {
  return (e[S] & 256) === 256;
}
i(Il, "isDestroyed");
function Ke(e, t) {
  $o(e, t[E]);
}
i(Ke, "assertTNodeForLView");
function $o(e, t) {
  Do(e);
  const n = t.data;
  for (let r = A; r < n.length; r++)
    if (n[r] === e)
      return;
  T("This TNode does not belong to this TView.");
}
i($o, "assertTNodeForTView");
function Do(e) {
  b(e, "TNode must be defined"), e && typeof e == "object" && e.hasOwnProperty("directiveStylingLast") || T("Not of type TNode, got: " + e);
}
i(Do, "assertTNode");
function Vd(e) {
  b(e, "Expected TIcu to be defined"), typeof e.currentCaseLViewIndex != "number" && T("Object is not of TIcu type.");
}
i(Vd, "assertTIcu");
function UM(e, t = "Type passed in is not ComponentType, it does not have 'ɵcmp' property.") {
  U(e) || T(t);
}
i(UM, "assertComponentType");
function zM(e, t = "Type passed in is not NgModuleType, it does not have 'ɵmod' property.") {
  gt(e) || T(t);
}
i(zM, "assertNgModuleType");
function $y(e) {
  b(e, "currentTNode should exist!"), b(e.parent, "currentTNode should have a parent");
}
i($y, "assertHasParent");
function it(e) {
  b(e, "LContainer must be defined"), O(Re(e), !0, "Expecting LContainer");
}
i(it, "assertLContainer");
function By(e) {
  e && O(je(e), !0, "Expecting LView or undefined or null");
}
i(By, "assertLViewOrUndefined");
function nn(e) {
  b(e, "LView must be defined"), O(je(e), !0, "Expecting LView");
}
i(nn, "assertLView");
function st(e, t) {
  O(e.firstCreatePass, !0, t || "Should only be called in first create pass.");
}
i(st, "assertFirstCreatePass");
function Ud(e, t) {
  O(e.firstUpdatePass, !0, "Should only be called in first update pass.");
}
i(Ud, "assertFirstUpdatePass");
function GM(e) {
  (e.type === void 0 || e.selectors == null || e.inputs === void 0) && T("Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.");
}
i(GM, "assertDirectiveDef");
function ms(e, t) {
  Hy(A, e.bindingStartIndex, t);
}
i(ms, "assertIndexInDeclRange");
function Na(e, t) {
  const n = e[1];
  Hy(n.expandoStartIndex, e.length, t);
}
i(Na, "assertIndexInExpandoRange");
function Hy(e, t, n) {
  e <= n && n < t || T(`Index out of range (expecting ${e} <= ${n} < ${t})`);
}
i(Hy, "assertBetween");
function WM(e, t) {
  b(e[ve], "Component views should exist."), b(e[ve][Be].projection, "Components with projection nodes (<ng-content>) must have projection slots defined.");
}
i(WM, "assertProjectionSlots");
function Vy(e, t) {
  b(e, "Component views should always have a parent view (component's host view)");
}
i(Vy, "assertParentView");
function Uy(e) {
  if (e.length < 2)
    return;
  const t = /* @__PURE__ */ new Set();
  for (const n of e) {
    if (t.has(n))
      throw new I(309, `Directive ${n.type.name} matches multiple times on the same element. Directives can only match an element once.`);
    t.add(n);
  }
}
i(Uy, "assertNoDuplicateDirectives");
function zy(e, t) {
  Na(e, t), Na(
    e,
    t + 8
    /* NodeInjectorOffset.PARENT */
  ), X(e[t + 0], "injectorIndex should point to a bloom filter"), X(e[t + 1], "injectorIndex should point to a bloom filter"), X(e[t + 2], "injectorIndex should point to a bloom filter"), X(e[t + 3], "injectorIndex should point to a bloom filter"), X(e[t + 4], "injectorIndex should point to a bloom filter"), X(e[t + 5], "injectorIndex should point to a bloom filter"), X(e[t + 6], "injectorIndex should point to a bloom filter"), X(e[t + 7], "injectorIndex should point to a bloom filter"), X(e[
    t + 8
    /* NodeInjectorOffset.PARENT */
  ], "injectorIndex should point to parent injector");
}
i(zy, "assertNodeInjector");
class Gy {
  static {
    i(this, "SimpleChange");
  }
  constructor(t, n, r) {
    this.previousValue = t, this.currentValue = n, this.firstChange = r;
  }
  /**
   * Check whether the new value is the first value assigned.
   */
  isFirstChange() {
    return this.firstChange;
  }
}
function Wy(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : e[n] = r;
}
i(Wy, "applyValueToInputField");
function zd() {
  return qy;
}
i(zd, "ɵɵNgOnChangesFeature");
function qy(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = QM), qM;
}
i(qy, "NgOnChangesFeatureImpl");
zd.ngInherit = !0;
function qM() {
  const e = Zy(this), t = e?.current;
  if (t) {
    const n = e.previous;
    if (n === Pt)
      e.previous = t;
    else
      for (let r in t)
        n[r] = t[r];
    e.current = null, this.ngOnChanges(t);
  }
}
i(qM, "rememberChangeHistoryAndInvokeOnChangesHook");
function QM(e, t, n, r, o) {
  const s = this.declaredInputs[r];
  ngDevMode && Po(s, "Name of input in ngOnChanges has to be a string");
  const a = Zy(e) || ZM(e, { previous: Pt, current: null }), u = a.current || (a.current = {}), c = a.previous, l = c[s];
  u[s] = new Gy(l && l.currentValue, n, c === Pt), Wy(e, t, o, n);
}
i(QM, "ngOnChangesSetInput");
const Qy = "__ngSimpleChanges__";
function Zy(e) {
  return e[Qy] || null;
}
i(Zy, "getSimpleChangesStore");
function ZM(e, t) {
  return e[Qy] = t;
}
i(ZM, "setSimpleChangesStore");
let Cl = null;
const YM = /* @__PURE__ */ i((e) => {
  Cl = e;
}, "setProfiler"), Gt = /* @__PURE__ */ i(function(e, t, n) {
  Cl?.(e, t, n);
}, "profiler"), Yy = "svg", Ky = "math";
let Jy = !1;
function Xy() {
  return Jy;
}
i(Xy, "getEnsureDirtyViewsAreAlwaysReachable");
function KM(e) {
  Jy = e;
}
i(KM, "setEnsureDirtyViewsAreAlwaysReachable");
function oe(e) {
  for (; Array.isArray(e); )
    e = e[fe];
  return e;
}
i(oe, "unwrapRNode");
function Gd(e) {
  for (; Array.isArray(e); ) {
    if (typeof e[$d] == "object")
      return e;
    e = e[fe];
  }
  return null;
}
i(Gd, "unwrapLView");
function ys(e, t) {
  return ngDevMode && be(t, e), ngDevMode && wn(e, A, "Expected to be past HEADER_OFFSET"), oe(t[e]);
}
i(ys, "getNativeByIndex");
function He(e, t) {
  return ngDevMode && Ke(e, t), ngDevMode && be(t, e.index), oe(t[e.index]);
}
i(He, "getNativeByTNode");
function JM(e, t) {
  const n = e === null ? -1 : e.index;
  return n !== -1 ? (ngDevMode && Ke(e, t), oe(t[n])) : null;
}
i(JM, "getNativeByTNodeOrNull");
function Ds(e, t) {
  ngDevMode && tr(t, -1, "wrong index for TNode"), ngDevMode && Zn(t, e.data.length, "wrong index for TNode");
  const n = e.data[t];
  return ngDevMode && n !== null && Do(n), n;
}
i(Ds, "getTNode");
function Bo(e, t) {
  return ngDevMode && be(e, t), e[t];
}
i(Bo, "load");
function yt(e, t) {
  ngDevMode && be(t, e);
  const n = t[e];
  return je(n) ? n : n[fe];
}
i(yt, "getComponentLViewByIndex");
function vs(e) {
  return (e[S] & 4) === 4;
}
i(vs, "isCreationMode");
function Wd(e) {
  return (e[S] & 128) === 128;
}
i(Wd, "viewAttachedToChangeDetector");
function XM(e) {
  return Re(e[Ee]);
}
i(XM, "viewAttachedToContainer");
function Xt(e, t) {
  return t == null ? null : (ngDevMode && be(e, t), e[t]);
}
i(Xt, "getConstant");
function eD(e) {
  e[Kr] = 0;
}
i(eD, "resetPreOrderHookFlags");
function e_(e) {
  e[S] & 1024 || (e[S] |= 1024, Wd(e) && $i(e));
}
i(e_, "markViewForRefresh");
function tD(e, t) {
  for (; e > 0; )
    ngDevMode && b(t[Yn], "Declaration view should be defined if nesting level is greater than 0."), t = t[Yn], e--;
  return t;
}
i(tD, "walkUpViews");
function qd(e) {
  return !!(e[S] & 9216 || e[gr]?.dirty);
}
i(qd, "requiresRefreshOrTraversal");
function El(e) {
  e[bt].changeDetectionScheduler?.notify(
    1
    /* NotificationType.AfterRenderHooks */
  ), qd(e) ? $i(e) : e[S] & 64 && (Xy() ? (e[S] |= 1024, $i(e)) : e[bt].changeDetectionScheduler?.notify());
}
i(El, "updateAncestorTraversalFlagsOnAttach");
function $i(e) {
  e[bt].changeDetectionScheduler?.notify();
  let t = yr(e);
  for (; t !== null && !(t[S] & 8192 || (t[S] |= 8192, !Wd(t))); )
    t = yr(t);
}
i($i, "markAncestorsForTraversal");
function Eu(e, t) {
  if ((e[S] & 256) === 256)
    throw new I(911, ngDevMode && "View has already been destroyed.");
  e[Nn] === null && (e[Nn] = []), e[Nn].push(t);
}
i(Eu, "storeLViewOnDestroy");
function Qd(e, t) {
  if (e[Nn] === null)
    return;
  const n = e[Nn].indexOf(t);
  n !== -1 && e[Nn].splice(n, 1);
}
i(Qd, "removeLViewOnDestroy");
function yr(e) {
  ngDevMode && nn(e);
  const t = e[Ee];
  return Re(t) ? t[Ee] : t;
}
i(yr, "getLViewParent");
const k = {
  lFrame: hD(null),
  bindingsEnabled: !0,
  skipHydrationRootTNode: null
};
let nD = !1;
function t_() {
  return k.lFrame.elementDepthCount;
}
i(t_, "getElementDepthCount");
function n_() {
  k.lFrame.elementDepthCount++;
}
i(n_, "increaseElementDepthCount");
function r_() {
  k.lFrame.elementDepthCount--;
}
i(r_, "decreaseElementDepthCount");
function rD() {
  return k.bindingsEnabled;
}
i(rD, "getBindingsEnabled");
function Ho() {
  return k.skipHydrationRootTNode !== null;
}
i(Ho, "isInSkipHydrationBlock$1");
function o_(e) {
  return k.skipHydrationRootTNode === e;
}
i(o_, "isSkipHydrationRootTNode");
function oD() {
  k.bindingsEnabled = !0;
}
i(oD, "ɵɵenableBindings");
function i_(e) {
  k.skipHydrationRootTNode = e;
}
i(i_, "enterSkipHydrationBlock");
function iD() {
  k.bindingsEnabled = !1;
}
i(iD, "ɵɵdisableBindings");
function s_() {
  k.skipHydrationRootTNode = null;
}
i(s_, "leaveSkipHydrationBlock");
function y() {
  return k.lFrame.lView;
}
i(y, "getLView");
function P() {
  return k.lFrame.tView;
}
i(P, "getTView");
function sD(e) {
  return k.lFrame.contextLView = e, e[se];
}
i(sD, "ɵɵrestoreView");
function aD(e) {
  return k.lFrame.contextLView = null, e;
}
i(aD, "ɵɵresetView");
function J() {
  let e = uD();
  for (; e !== null && e.type === 64; )
    e = e.parent;
  return e;
}
i(J, "getCurrentTNode");
function uD() {
  return k.lFrame.currentTNode;
}
i(uD, "getCurrentTNodePlaceholderOk");
function Bi() {
  const e = k.lFrame, t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
i(Bi, "getCurrentParentTNode");
function en(e, t) {
  ngDevMode && e && $o(e, k.lFrame.tView);
  const n = k.lFrame;
  n.currentTNode = e, n.isParent = t;
}
i(en, "setCurrentTNode");
function Zd() {
  return k.lFrame.isParent;
}
i(Zd, "isCurrentTNodeParent");
function Yd() {
  k.lFrame.isParent = !1;
}
i(Yd, "setCurrentTNodeAsNotParent");
function a_() {
  const e = k.lFrame.contextLView;
  return ngDevMode && b(e, "contextLView must be defined."), e;
}
i(a_, "getContextLView");
function Br() {
  return !ngDevMode && T("Must never be called in production mode"), nD;
}
i(Br, "isInCheckNoChangesMode");
function Yp(e) {
  !ngDevMode && T("Must never be called in production mode"), nD = e;
}
i(Yp, "setIsInCheckNoChangesMode");
function Je() {
  const e = k.lFrame;
  let t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
i(Je, "getBindingRoot");
function ee() {
  return k.lFrame.bindingIndex;
}
i(ee, "getBindingIndex");
function cD(e) {
  return k.lFrame.bindingIndex = e;
}
i(cD, "setBindingIndex");
function Bt() {
  return k.lFrame.bindingIndex++;
}
i(Bt, "nextBindingIndex");
function Mn(e) {
  const t = k.lFrame, n = t.bindingIndex;
  return t.bindingIndex = t.bindingIndex + e, n;
}
i(Mn, "incrementBindingIndex");
function u_() {
  return k.lFrame.inI18n;
}
i(u_, "isInI18nBlock");
function lD(e) {
  k.lFrame.inI18n = e;
}
i(lD, "setInI18nBlock");
function c_(e, t) {
  const n = k.lFrame;
  n.bindingIndex = n.bindingRootIndex = e, bl(t);
}
i(c_, "setBindingRootForHostBindings");
function l_() {
  return k.lFrame.currentDirectiveIndex;
}
i(l_, "getCurrentDirectiveIndex");
function bl(e) {
  k.lFrame.currentDirectiveIndex = e;
}
i(bl, "setCurrentDirectiveIndex");
function Kd(e) {
  const t = k.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
i(Kd, "getCurrentDirectiveDef");
function Jd() {
  return k.lFrame.currentQueryIndex;
}
i(Jd, "getCurrentQueryIndex");
function bu(e) {
  k.lFrame.currentQueryIndex = e;
}
i(bu, "setCurrentQueryIndex");
function d_(e) {
  const t = e[E];
  return t.type === 2 ? (ngDevMode && b(t.declTNode, "Embedded TNodes should have declaration parents."), t.declTNode) : t.type === 1 ? e[Be] : null;
}
i(d_, "getDeclarationTNode");
function dD(e, t, n) {
  if (ngDevMode && By(e), n & G.SkipSelf) {
    ngDevMode && $o(t, e[E]);
    let o = t, s = e;
    for (; ngDevMode && b(o, "Parent TNode should be defined"), o = o.parent, o === null && !(n & G.Host); )
      if (o = d_(s), o === null || (ngDevMode && b(s, "Parent LView should be defined"), s = s[Yn], o.type & 10))
        break;
    if (o === null)
      return !1;
    t = o, e = s;
  }
  ngDevMode && Ke(t, e);
  const r = k.lFrame = fD();
  return r.currentTNode = t, r.lView = e, !0;
}
i(dD, "enterDI");
function Xd(e) {
  ngDevMode && $t(e[0], e[1], "????"), ngDevMode && By(e);
  const t = fD();
  ngDevMode && (O(t.isParent, !0, "Expected clean LFrame"), O(t.lView, null, "Expected clean LFrame"), O(t.tView, null, "Expected clean LFrame"), O(t.selectedIndex, -1, "Expected clean LFrame"), O(t.elementDepthCount, 0, "Expected clean LFrame"), O(t.currentDirectiveIndex, -1, "Expected clean LFrame"), O(t.currentNamespace, null, "Expected clean LFrame"), O(t.bindingRootIndex, -1, "Expected clean LFrame"), O(t.currentQueryIndex, 0, "Expected clean LFrame"));
  const n = e[E];
  k.lFrame = t, ngDevMode && n.firstChild && $o(n.firstChild, n), t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1;
}
i(Xd, "enterView");
function fD() {
  const e = k.lFrame, t = e === null ? null : e.child;
  return t === null ? hD(e) : t;
}
i(fD, "allocLFrame");
function hD(e) {
  const t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1
  };
  return e !== null && (e.child = t), t;
}
i(hD, "createLFrame");
function pD() {
  const e = k.lFrame;
  return k.lFrame = e.parent, e.currentTNode = null, e.lView = null, e;
}
i(pD, "leaveViewLight");
const gD = pD;
function ef() {
  const e = pD();
  e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0;
}
i(ef, "leaveView");
function f_(e) {
  return (k.lFrame.contextLView = tD(e, k.lFrame.contextLView))[se];
}
i(f_, "nextContextImpl");
function Ve() {
  return k.lFrame.selectedIndex;
}
i(Ve, "getSelectedIndex");
function Dr(e) {
  ngDevMode && e !== -1 && wn(e, A, "Index must be past HEADER_OFFSET (or -1)."), ngDevMode && Zn(e, k.lFrame.lView.length, "Can't set index passed end of LView"), k.lFrame.selectedIndex = e;
}
i(Dr, "setSelectedIndex");
function ce() {
  const e = k.lFrame;
  return Ds(e.tView, e.selectedIndex);
}
i(ce, "getSelectedTNode");
function mD() {
  k.lFrame.currentNamespace = Yy;
}
i(mD, "ɵɵnamespaceSVG");
function yD() {
  k.lFrame.currentNamespace = Ky;
}
i(yD, "ɵɵnamespaceMathML");
function DD() {
  h_();
}
i(DD, "ɵɵnamespaceHTML");
function h_() {
  k.lFrame.currentNamespace = null;
}
i(h_, "namespaceHTMLInternal");
function vD() {
  return k.lFrame.currentNamespace;
}
i(vD, "getNamespace$1");
let ID = !0;
function Is() {
  return ID;
}
i(Is, "wasLastNodeCreated");
function rn(e) {
  ID = e;
}
i(rn, "lastNodeWasCreated");
function p_(e, t, n) {
  ngDevMode && st(n);
  const { ngOnChanges: r, ngOnInit: o, ngDoCheck: s } = t.type.prototype;
  if (r) {
    const a = qy(t);
    (n.preOrderHooks ??= []).push(e, a), (n.preOrderCheckHooks ??= []).push(e, a);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o), s && ((n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s));
}
i(p_, "registerPreOrderHooks");
function wu(e, t) {
  ngDevMode && st(e);
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    const o = e.data[n];
    ngDevMode && b(o, "Expecting DirectiveDef");
    const s = o.type.prototype, { ngAfterContentInit: a, ngAfterContentChecked: u, ngAfterViewInit: c, ngAfterViewChecked: l, ngOnDestroy: d } = s;
    a && (e.contentHooks ??= []).push(-n, a), u && ((e.contentHooks ??= []).push(n, u), (e.contentCheckHooks ??= []).push(n, u)), c && (e.viewHooks ??= []).push(-n, c), l && ((e.viewHooks ??= []).push(n, l), (e.viewCheckHooks ??= []).push(n, l)), d != null && (e.destroyHooks ??= []).push(n, d);
  }
}
i(wu, "registerPostOrderHooks");
function ha(e, t, n) {
  CD(e, t, 3, n);
}
i(ha, "executeCheckHooks");
function pa(e, t, n, r) {
  ngDevMode && $t(n, 3, "Init pre-order hooks should not be called more than once"), (e[S] & 3) === n && CD(e, t, n, r);
}
i(pa, "executeInitAndCheckHooks");
function Sc(e, t) {
  ngDevMode && $t(t, 3, "Init hooks phase should not be incremented after all init hooks have been run.");
  let n = e[S];
  (n & 3) === t && (n &= 16383, n += 1, e[S] = n);
}
i(Sc, "incrementInitPhaseFlags");
function CD(e, t, n, r) {
  ngDevMode && O(Br(), !1, "Hooks should never be run when in check no changes mode.");
  const o = r !== void 0 ? e[Kr] & 65535 : 0, s = r ?? -1, a = t.length - 1;
  let u = 0;
  for (let c = o; c < a; c++)
    if (typeof t[c + 1] == "number") {
      if (u = t[c], r != null && u >= r)
        break;
    } else
      t[c] < 0 && (e[Kr] += 65536), (u < s || s == -1) && (g_(e, n, t, c), e[Kr] = (e[Kr] & 4294901760) + c + 2), c++;
}
i(CD, "callHooks");
function Kp(e, t) {
  Gt(4, e, t);
  const n = B(null);
  try {
    t.call(e);
  } finally {
    B(n), Gt(5, e, t);
  }
}
i(Kp, "callHookInternal");
function g_(e, t, n, r) {
  const o = n[r] < 0, s = n[r + 1], a = o ? -n[r] : n[r], u = e[a];
  o ? e[S] >> 14 < e[Kr] >> 16 && (e[S] & 3) === t && (e[S] += 16384, Kp(u, s)) : Kp(u, s);
}
i(g_, "callHook");
const ro = -1;
class Cs {
  static {
    i(this, "NodeInjectorFactory");
  }
  constructor(t, n, r) {
    this.factory = t, this.resolving = !1, ngDevMode && b(t, "Factory not specified"), ngDevMode && O(typeof t, "function", "Expected factory function."), this.canSeeViewProviders = n, this.injectImpl = r;
  }
}
function m_(e) {
  return e instanceof Cs;
}
i(m_, "isFactory");
function wl(e) {
  let t = "";
  return e & 1 && (t += "|Text"), e & 2 && (t += "|Element"), e & 4 && (t += "|Container"), e & 8 && (t += "|ElementContainer"), e & 16 && (t += "|Projection"), e & 32 && (t += "|IcuContainer"), e & 64 && (t += "|Placeholder"), t.length > 0 ? t.substring(1) : t;
}
i(wl, "toTNodeTypeAsString");
function y_(e) {
  return e != null && typeof e == "object" && (e.insertBeforeIndex === null || typeof e.insertBeforeIndex == "number" || Array.isArray(e.insertBeforeIndex));
}
i(y_, "isTNodeShape");
function D_(e) {
  return (e.flags & 8) !== 0;
}
i(D_, "hasClassInput");
function v_(e) {
  return (e.flags & 16) !== 0;
}
i(v_, "hasStyleInput");
function $e(e, t, n) {
  b(e, "should be called with a TNode"), e.type & t || T(n || `Expected [${wl(t)}] but got ${wl(e.type)}.`);
}
i($e, "assertTNodeType");
function I_(e) {
  e === 2 || //
  e === 1 || //
  e === 4 || //
  e === 8 || //
  e === 32 || //
  e === 16 || //
  e === 64 || T(`Expected TNodeType to have only a single type selected, but got ${wl(e)}.`);
}
i(I_, "assertPureTNodeType");
function tf(e) {
  return e !== ro;
}
i(tf, "hasParentInjector");
function Hi(e) {
  if (ngDevMode) {
    X(e, "Number expected"), $t(e, -1, "Not a valid state.");
    const t = e & 32767;
    tr(t, A, "Parent injector must be pointing past HEADER_OFFSET.");
  }
  return e & 32767;
}
i(Hi, "getParentInjectorIndex");
function C_(e) {
  return e >> 16;
}
i(C_, "getParentInjectorViewOffset");
function Vi(e, t) {
  let n = C_(e), r = t;
  for (; n > 0; )
    r = r[Yn], n--;
  return r;
}
i(Vi, "getParentInjectorView");
let Ml = !0;
function ka(e) {
  const t = Ml;
  return Ml = e, t;
}
i(ka, "setIncludeViewProviders");
const E_ = 256, ED = E_ - 1, bD = 5;
let b_ = 0;
const Wt = {};
function w_(e, t, n) {
  ngDevMode && O(t.firstCreatePass, !0, "expected firstCreatePass to be true");
  let r;
  typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(to) && (r = n[to]), r == null && (r = n[to] = b_++);
  const o = r & ED, s = 1 << o;
  t.data[e + (o >> bD)] |= s;
}
i(w_, "bloomAdd");
function Ra(e, t) {
  const n = wD(e, t);
  if (n !== -1)
    return n;
  const r = t[E];
  r.firstCreatePass && (e.injectorIndex = t.length, Tc(r.data, e), Tc(t, null), Tc(r.blueprint, null));
  const o = Mu(e, t), s = e.injectorIndex;
  if (tf(o)) {
    const a = Hi(o), u = Vi(o, t), c = u[E].data;
    for (let l = 0; l < 8; l++)
      t[s + l] = u[a + l] | c[a + l];
  }
  return t[
    s + 8
    /* NodeInjectorOffset.PARENT */
  ] = o, s;
}
i(Ra, "getOrCreateNodeInjectorForNode");
function Tc(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
i(Tc, "insertBloom");
function wD(e, t) {
  return e.injectorIndex === -1 || // If the injector index is the same as its parent's injector index, then the index has been
  // copied down from the parent node. No injector has been created yet on this node.
  e.parent && e.parent.injectorIndex === e.injectorIndex || // After the first template pass, the injector index might exist but the parent values
  // might not have been calculated yet for this instance
  t[
    e.injectorIndex + 8
    /* NodeInjectorOffset.PARENT */
  ] === null ? -1 : (ngDevMode && be(t, e.injectorIndex), e.injectorIndex);
}
i(wD, "getInjectorIndex");
function Mu(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1)
    return e.parent.injectorIndex;
  let n = 0, r = null, o = t;
  for (; o !== null; ) {
    if (r = OD(o), r === null)
      return ro;
    if (ngDevMode && r && Ke(r, o[Yn]), n++, o = o[Yn], r.injectorIndex !== -1)
      return r.injectorIndex | n << 16;
  }
  return ro;
}
i(Mu, "getParentInjectorLocation");
function _l(e, t, n) {
  w_(e, t, n);
}
i(_l, "diPublicInInjector");
function M_(e, t) {
  if (ngDevMode && $e(
    e,
    15
    /* TNodeType.AnyRNode */
  ), ngDevMode && b(e, "expecting tNode"), t === "class")
    return e.classes;
  if (t === "style")
    return e.styles;
  const n = e.attrs;
  if (n) {
    const r = n.length;
    let o = 0;
    for (; o < r; ) {
      const s = n[o];
      if (vy(s))
        break;
      if (s === 0)
        o = o + 2;
      else if (typeof s == "number")
        for (o++; o < r && typeof n[o] == "string"; )
          o++;
      else {
        if (s === t)
          return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
i(M_, "injectAttributeImpl");
function MD(e, t, n) {
  if (n & G.Optional || e !== void 0)
    return e;
  Ad(t, "NodeInjector");
}
i(MD, "notFoundValueOrThrow");
function _D(e, t, n, r) {
  if (n & G.Optional && r === void 0 && (r = null), !(n & (G.Self | G.Host))) {
    const o = e[Se], s = tt(void 0);
    try {
      return o ? o.get(t, r, n & G.Optional) : gy(t, r, n & G.Optional);
    } finally {
      tt(s);
    }
  }
  return MD(r, t, n);
}
i(_D, "lookupTokenUsingModuleInjector");
function SD(e, t, n, r = G.Default, o) {
  if (e !== null) {
    if (t[S] & 2048 && // The token must be present on the current node injector when the `Self`
    // flag is set, so the lookup on embedded view injector(s) can be skipped.
    !(r & G.Self)) {
      const a = A_(e, t, n, r, Wt);
      if (a !== Wt)
        return a;
    }
    const s = TD(e, t, n, r, Wt);
    if (s !== Wt)
      return s;
  }
  return _D(t, n, r, o);
}
i(SD, "getOrCreateInjectable");
function TD(e, t, n, r, o) {
  const s = S_(n);
  if (typeof s == "function") {
    if (!dD(t, e, r))
      return r & G.Host ? MD(o, n, r) : _D(t, n, r, o);
    try {
      let a;
      if (ngDevMode ? mi(new De(J(), y()), n, () => {
        a = s(r), a != null && wa(a);
      }) : a = s(r), a == null && !(r & G.Optional))
        Ad(n);
      else
        return a;
    } finally {
      gD();
    }
  } else if (typeof s == "number") {
    let a = null, u = wD(e, t), c = ro, l = r & G.Host ? t[ve][Be] : null;
    for ((u === -1 || r & G.SkipSelf) && (c = u === -1 ? Mu(e, t) : t[
      u + 8
      /* NodeInjectorOffset.PARENT */
    ], c === ro || !Xp(r, !1) ? u = -1 : (a = t[E], u = Hi(c), t = Vi(c, t))); u !== -1; ) {
      ngDevMode && zy(t, u);
      const d = t[E];
      if (ngDevMode && Ke(d.data[
        u + 8
        /* NodeInjectorOffset.TNODE */
      ], t), Jp(s, u, d.data)) {
        const f = __(u, t, n, a, r, l);
        if (f !== Wt)
          return f;
      }
      c = t[
        u + 8
        /* NodeInjectorOffset.PARENT */
      ], c !== ro && Xp(r, t[E].data[
        u + 8
        /* NodeInjectorOffset.TNODE */
      ] === l) && Jp(s, u, t) ? (a = d, u = Hi(c), t = Vi(c, t)) : u = -1;
    }
  }
  return o;
}
i(TD, "lookupTokenUsingNodeInjector");
function __(e, t, n, r, o, s) {
  const a = t[E], u = a.data[
    e + 8
    /* NodeInjectorOffset.TNODE */
  ], c = r == null ? (
    // 1) This is the first invocation `previousTView == null` which means that we are at the
    // `TNode` of where injector is starting to look. In such a case the only time we are allowed
    // to look into the ViewProviders is if:
    // - we are on a component
    // - AND the injector set `includeViewProviders` to true (implying that the token can see
    // ViewProviders because it is the Component or a Service which itself was declared in
    // ViewProviders)
    nr(u) && Ml
  ) : (
    // 2) `previousTView != null` which means that we are now walking across the parent nodes.
    // In such a case we are only allowed to look into the ViewProviders if:
    // - We just crossed from child View to Parent View `previousTView != currentTView`
    // - AND the parent TNode is an Element.
    // This means that we just came from the Component's View and therefore are allowed to see
    // into the ViewProviders.
    r != a && (u.type & 3) !== 0
  ), l = o & G.Host && s === u, d = ga(u, a, n, c, l);
  return d !== null ? vr(t, a, d, u) : Wt;
}
i(__, "searchTokensOnInjector");
function ga(e, t, n, r, o) {
  const s = e.providerIndexes, a = t.data, u = s & 1048575, c = e.directiveStart, l = e.directiveEnd, d = s >> 20, f = r ? u : u + d, h = o ? u + d : l;
  for (let p = f; p < h; p++) {
    const g = a[p];
    if (p < c && n === g || p >= c && g.type === n)
      return p;
  }
  if (o) {
    const p = a[c];
    if (p && wt(p) && p.type === n)
      return c;
  }
  return null;
}
i(ga, "locateDirectiveOrProvider");
function vr(e, t, n, r) {
  let o = e[n];
  const s = t.data;
  if (m_(o)) {
    const a = o;
    a.resolving && Td(z(s[n]));
    const u = ka(a.canSeeViewProviders);
    a.resolving = !0;
    let c;
    if (ngDevMode) {
      const f = s[n].type || s[n], h = new De(r, e);
      c = We({ injector: h, token: f });
    }
    const l = a.injectImpl ? tt(a.injectImpl) : null, d = dD(e, r, G.Default);
    ngDevMode && O(d, !0, "Because flags do not contain `SkipSelf' we expect this to always succeed.");
    try {
      o = e[n] = a.factory(void 0, s, e, r), ngDevMode && wa(o), t.firstCreatePass && n >= r.directiveStart && (ngDevMode && GM(s[n]), p_(n, s[n], t));
    } finally {
      ngDevMode && We(c), l !== null && tt(l), ka(u), a.resolving = !1, gD();
    }
  }
  return o;
}
i(vr, "getNodeInjectable");
function S_(e) {
  if (ngDevMode && b(e, "token must be defined"), typeof e == "string")
    return e.charCodeAt(0) || 0;
  const t = (
    // First check with `hasOwnProperty` so we don't get an inherited ID.
    e.hasOwnProperty(to) ? e[to] : void 0
  );
  return typeof t == "number" ? t >= 0 ? t & ED : (ngDevMode && O(t, -1, "Expecting to get Special Injector Id"), T_) : t;
}
i(S_, "bloomHashBitOrFactory");
function Jp(e, t, n) {
  const r = 1 << e;
  return !!(n[t + (e >> bD)] & r);
}
i(Jp, "bloomHasToken");
function Xp(e, t) {
  return !(e & G.Self) && !(e & G.Host && t);
}
i(Xp, "shouldSearchParent");
function Vo(e) {
  return e._lView;
}
i(Vo, "getNodeInjectorLView");
function Uo(e) {
  return e._tNode;
}
i(Uo, "getNodeInjectorTNode");
class De {
  static {
    i(this, "NodeInjector");
  }
  constructor(t, n) {
    this._tNode = t, this._lView = n;
  }
  get(t, n, r) {
    return SD(this._tNode, this._lView, t, ls(r), n);
  }
}
function T_() {
  return new De(J(), y());
}
i(T_, "createNodeInjector");
function AD(e) {
  return tn(() => {
    const t = e.prototype.constructor, n = t[mn] || Sl(t), r = Object.prototype;
    let o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      const s = o[mn] || Sl(o);
      if (s && s !== n)
        return s;
      o = Object.getPrototypeOf(o);
    }
    return (s) => new s();
  });
}
i(AD, "ɵɵgetInheritedFactory");
function Sl(e) {
  return hu(e) ? () => {
    const t = Sl(x(e));
    return t && t();
  } : lr(e);
}
i(Sl, "getFactoryOf");
function A_(e, t, n, r, o) {
  let s = e, a = t;
  for (; s !== null && a !== null && a[S] & 2048 && !(a[S] & 512); ) {
    ngDevMode && Ke(s, a);
    const u = TD(s, a, n, r | G.Self, Wt);
    if (u !== Wt)
      return u;
    let c = s.parent;
    if (!c) {
      const l = a[jy];
      if (l) {
        const d = l.get(n, Wt, r);
        if (d !== Wt)
          return d;
      }
      c = OD(a), a = a[Yn];
    }
    s = c;
  }
  return o;
}
i(A_, "lookupTokenUsingEmbeddedInjector");
function OD(e) {
  const t = e[E], n = t.type;
  return n === 2 ? (ngDevMode && b(t.declTNode, "Embedded TNodes should have declaration parents."), t.declTNode) : n === 1 ? e[Be] : null;
}
i(OD, "getTNodeFromLView");
function _u(e) {
  return M_(J(), e);
}
i(_u, "ɵɵinjectAttribute");
const nf = xo("Attribute", (e) => ({ attributeName: e, __NG_ELEMENT_ID__: /* @__PURE__ */ i(() => _u(e), "__NG_ELEMENT_ID__") }));
let eg = null;
function rf() {
  return eg = eg || new Ly();
}
i(rf, "getReflect");
function Su(e) {
  return FD(rf().parameters(e));
}
i(Su, "reflectDependencies");
function FD(e) {
  return e.map((t) => O_(t));
}
i(FD, "convertDependencies");
function O_(e) {
  const t = {
    token: null,
    attribute: null,
    host: !1,
    optional: !1,
    self: !1,
    skipSelf: !1
  };
  if (Array.isArray(e) && e.length > 0)
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (r === void 0)
        continue;
      const o = Object.getPrototypeOf(r);
      if (r instanceof Kt || o.ngMetadataName === "Optional")
        t.optional = !0;
      else if (r instanceof yu || o.ngMetadataName === "SkipSelf")
        t.skipSelf = !0;
      else if (r instanceof my || o.ngMetadataName === "Self")
        t.self = !0;
      else if (r instanceof fs || o.ngMetadataName === "Host")
        t.host = !0;
      else if (r instanceof ht)
        t.token = r.token;
      else if (r instanceof nf) {
        if (r.attributeName === void 0)
          throw new I(204, ngDevMode && "Attribute name must be defined.");
        t.attribute = r.attributeName;
      } else
        t.token = r;
    }
  else e === void 0 || Array.isArray(e) && e.length === 0 ? t.token = null : t.token = e;
  return t;
}
i(O_, "reflectDependency");
function F_(e, t) {
  let n = null, r = null;
  e.hasOwnProperty(Ri) || Object.defineProperty(e, Ri, {
    get: /* @__PURE__ */ i(() => (n === null && (n = Oe({ usage: 0, kind: "injectable", type: e }).compileInjectable(Qp, `ng:///${e.name}/ɵprov.js`, x_(e, t))), n), "get")
  }), e.hasOwnProperty(mn) || Object.defineProperty(e, mn, {
    get: /* @__PURE__ */ i(() => {
      if (r === null) {
        const o = Oe({ usage: 0, kind: "injectable", type: e });
        r = o.compileFactory(Qp, `ng:///${e.name}/ɵfac.js`, {
          name: e.name,
          type: e,
          typeArgumentCount: 0,
          // In JIT mode types are not available nor used.
          deps: Su(e),
          target: o.FactoryTarget.Injectable
        });
      }
      return r;
    }, "get"),
    // Leave this configurable so that the factories from directives or pipes can take precedence.
    configurable: !0
  });
}
i(F_, "compileInjectable");
const N_ = te({ provide: String, useValue: te });
function tg(e) {
  return e.useClass !== void 0;
}
i(tg, "isUseClassProvider");
function k_(e) {
  return N_ in e;
}
i(k_, "isUseValueProvider");
function ng(e) {
  return e.useFactory !== void 0;
}
i(ng, "isUseFactoryProvider");
function R_(e) {
  return e.useExisting !== void 0;
}
i(R_, "isUseExistingProvider");
function x_(e, t) {
  const n = t || { providedIn: null }, r = {
    name: e.name,
    type: e,
    typeArgumentCount: 0,
    providedIn: n.providedIn
  };
  return (tg(n) || ng(n)) && n.deps !== void 0 && (r.deps = FD(n.deps)), tg(n) ? r.useClass = n.useClass : k_(n) ? r.useValue = n.useValue : ng(n) ? r.useFactory = n.useFactory : R_(n) && (r.useExisting = n.useExisting), r;
}
i(x_, "getInjectableMetadata");
const he = as("Injectable", void 0, void 0, void 0, (e, t) => F_(e, t));
function Tl(e, t = null, n = null, r) {
  const o = ND(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
i(Tl, "createInjector");
function ND(e, t = null, n = null, r, o = /* @__PURE__ */ new Set()) {
  const s = [
    n || Q,
    Ay(e)
  ];
  return r = r || (typeof e == "object" ? void 0 : Z(e)), new jo(s, t || Iu(), r || null, o);
}
i(ND, "createInjectorWithoutInjectorInstances");
class xe {
  static {
    i(this, "Injector");
  }
  static {
    this.THROW_IF_NOT_FOUND = xi;
  }
  static {
    this.NULL = /* @__PURE__ */ new Du();
  }
  static create(t, n) {
    if (Array.isArray(t))
      return Tl({ name: "" }, n, t, "");
    {
      const r = t.name ?? "";
      return Tl({ name: r }, t.parent, t.providers, r);
    }
  }
  static {
    this.ɵprov = ne({
      token: xe,
      providedIn: "any",
      factory: /* @__PURE__ */ i(() => ke(Fd), "factory")
    });
  }
  static {
    this.__NG_ELEMENT_ID__ = -1;
  }
}
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class P_ {
  static {
    i(this, "HostAttributeToken");
  }
  constructor(t) {
    this.attributeName = t, this.__NG_ELEMENT_ID__ = () => _u(this.attributeName);
  }
  toString() {
    return `HostAttributeToken ${this.attributeName}`;
  }
}
const L_ = "ngOriginalError";
function Ac(e) {
  return e[L_];
}
i(Ac, "getOriginalError");
class _n {
  static {
    i(this, "ErrorHandler");
  }
  constructor() {
    this._console = console;
  }
  handleError(t) {
    const n = this._findOriginalError(t);
    this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n);
  }
  /** @internal */
  _findOriginalError(t) {
    let n = t && Ac(t);
    for (; n && Ac(n); )
      n = Ac(n);
    return n || null;
  }
}
const kD = new $(typeof ngDevMode > "u" || ngDevMode ? "internal error handler" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => M(_n).handleError.bind(void 0), "factory")
});
class Hr {
  static {
    i(this, "DestroyRef");
  }
  static {
    this.__NG_ELEMENT_ID__ = $_;
  }
  static {
    this.__NG_ENV_ID__ = (t) => t;
  }
}
class j_ extends Hr {
  static {
    i(this, "NodeInjectorDestroyRef");
  }
  constructor(t) {
    super(), this._lView = t;
  }
  onDestroy(t) {
    return Eu(this._lView, t), () => Qd(this._lView, t);
  }
}
function $_() {
  return new j_(y());
}
i($_, "injectDestroyRef");
class of {
  static {
    i(this, "OutputEmitterRef");
  }
  constructor() {
    this.destroyed = !1, this.listeners = null, this.errorHandler = M(_n, { optional: !0 }), this.destroyRef = M(Hr), this.destroyRef.onDestroy(() => {
      this.destroyed = !0, this.listeners = null;
    });
  }
  subscribe(t) {
    if (this.destroyed)
      throw new I(953, ngDevMode && "Unexpected subscription to destroyed `OutputRef`. The owning directive/component is destroyed.");
    return (this.listeners ??= []).push(t), {
      unsubscribe: /* @__PURE__ */ i(() => {
        const n = this.listeners?.indexOf(t);
        n !== void 0 && n !== -1 && this.listeners?.splice(n, 1);
      }, "unsubscribe")
    };
  }
  /** Emits a new value to the output. */
  emit(t) {
    if (this.destroyed)
      throw new I(953, ngDevMode && "Unexpected emit for destroyed `OutputRef`. The owning directive/component is destroyed.");
    if (this.listeners === null)
      return;
    const n = B(null);
    try {
      for (const r of this.listeners)
        try {
          r(t);
        } catch (o) {
          this.errorHandler?.handleError(o);
        }
    } finally {
      B(n);
    }
  }
}
function B_(e) {
  return e.destroyRef;
}
i(B_, "getOutputDestroyRef");
function RD(e) {
  return ngDevMode && Ye(RD), new of();
}
i(RD, "output");
function rg(e, t) {
  return ngDevMode && Ye(sf), uy(e, t);
}
i(rg, "inputFunction");
function H_(e) {
  return ngDevMode && Ye(sf), uy(du, e);
}
i(H_, "inputRequiredFunction");
const sf = (rg.required = H_, rg);
function V_() {
  return zo(J(), y());
}
i(V_, "injectElementRef");
function zo(e, t) {
  return new on(He(e, t));
}
i(zo, "createElementRef");
class on {
  static {
    i(this, "ElementRef");
  }
  constructor(t) {
    this.nativeElement = t;
  }
  static {
    this.__NG_ELEMENT_ID__ = V_;
  }
}
function xD(e) {
  return e instanceof on ? e.nativeElement : e;
}
i(xD, "unwrapElementRef");
class U_ extends Ni {
  static {
    i(this, "EventEmitter_");
  }
  constructor(t = !1) {
    super(), this.destroyRef = void 0, this.__isAsync = t, xy() && (this.destroyRef = M(Hr, { optional: !0 }) ?? void 0);
  }
  emit(t) {
    const n = B(null);
    try {
      super.next(t);
    } finally {
      B(n);
    }
  }
  subscribe(t, n, r) {
    let o = t, s = n || (() => null), a = r;
    if (t && typeof t == "object") {
      const c = t;
      o = c.next?.bind(c), s = c.error?.bind(c), a = c.complete?.bind(c);
    }
    this.__isAsync && (s = Oc(s), o && (o = Oc(o)), a && (a = Oc(a)));
    const u = super.subscribe({ next: o, error: s, complete: a });
    return t instanceof Ro && t.add(u), u;
  }
}
function Oc(e) {
  return (t) => {
    setTimeout(e, void 0, t);
  };
}
i(Oc, "_wrapInTimeout");
const Ft = U_;
function z_() {
  return this._results[Symbol.iterator]();
}
i(z_, "symbolIterator");
class Tu {
  static {
    i(this, "QueryList");
  }
  /**
   * Returns `Observable` of `QueryList` notifying the subscriber of changes.
   */
  get changes() {
    return this._changes ??= new Ft();
  }
  /**
   * @param emitDistinctChangesOnly Whether `QueryList.changes` should fire only when actual change
   *     has occurred. Or if it should fire when query is recomputed. (recomputing could resolve in
   *     the same result)
   */
  constructor(t = !1) {
    this._emitDistinctChangesOnly = t, this.dirty = !0, this._onDirty = void 0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
    const n = Tu.prototype;
    n[Symbol.iterator] || (n[Symbol.iterator] = z_);
  }
  /**
   * Returns the QueryList entry at `index`.
   */
  get(t) {
    return this._results[t];
  }
  /**
   * See
   * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
   */
  map(t) {
    return this._results.map(t);
  }
  filter(t) {
    return this._results.filter(t);
  }
  /**
   * See
   * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   */
  find(t) {
    return this._results.find(t);
  }
  /**
   * See
   * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
   */
  reduce(t, n) {
    return this._results.reduce(t, n);
  }
  /**
   * See
   * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
   */
  forEach(t) {
    this._results.forEach(t);
  }
  /**
   * See
   * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
   */
  some(t) {
    return this._results.some(t);
  }
  /**
   * Returns a copy of the internal results list as an Array.
   */
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  /**
   * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
   * on change detection, it will not notify of changes to the queries, unless a new change
   * occurs.
   *
   * @param resultsTree The query results to store
   * @param identityAccessor Optional function for extracting stable object identity from a value
   *    in the array. This function is executed for each element of the query result list while
   *    comparing current query list with the new one (provided as a first argument of the `reset`
   *    function) to detect if the lists are different. If the function is not provided, elements
   *    are compared as is (without any pre-processing).
   */
  reset(t, n) {
    this.dirty = !1;
    const r = nt(t);
    (this._changesDetected = !hM(this._results, r, n)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0]);
  }
  /**
   * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
   */
  notifyOnChanges() {
    this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
  }
  /** @internal */
  onDirty(t) {
    this._onDirty = t;
  }
  /** internal */
  setDirty() {
    this.dirty = !0, this._onDirty?.();
  }
  /** internal */
  destroy() {
    this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe());
  }
}
const Ui = "ngSkipHydration", G_ = "ngskiphydration";
function PD(e) {
  const t = e.mergedAttrs;
  if (t === null)
    return !1;
  for (let n = 0; n < t.length; n += 2) {
    const r = t[n];
    if (typeof r == "number")
      return !1;
    if (typeof r == "string" && r.toLowerCase() === G_)
      return !0;
  }
  return !1;
}
i(PD, "hasSkipHydrationAttrOnTNode");
function LD(e) {
  return e.hasAttribute(Ui);
}
i(LD, "hasSkipHydrationAttrOnRElement");
function xa(e) {
  return (e.flags & 128) === 128;
}
i(xa, "hasInSkipHydrationBlockFlag");
function Pa(e) {
  if (xa(e))
    return !0;
  let t = e.parent;
  for (; t; ) {
    if (xa(e) || PD(t))
      return !0;
    t = t.parent;
  }
  return !1;
}
i(Pa, "isInSkipHydrationBlock");
const af = /* @__PURE__ */ new Map();
let W_ = 0;
function q_() {
  return W_++;
}
i(q_, "getUniqueLViewId");
function Q_(e) {
  ngDevMode && X(e[pr], "LView must have an ID in order to be registered"), af.set(e[pr], e);
}
i(Q_, "registerLView");
function jD(e) {
  return ngDevMode && X(e, "ID used for LView lookup must be a number"), af.get(e) || null;
}
i(jD, "getLViewById");
function Z_(e) {
  ngDevMode && X(e[pr], "Cannot stop tracking an LView that does not have an ID"), af.delete(e[pr]);
}
i(Z_, "unregisterLView");
class $D {
  static {
    i(this, "LContext");
  }
  /** Component's parent view data. */
  get lView() {
    return jD(this.lViewId);
  }
  constructor(t, n, r) {
    this.lViewId = t, this.nodeIndex = n, this.native = r;
  }
}
function rt(e) {
  let t = Di(e);
  if (t) {
    if (je(t)) {
      const n = t;
      let r, o, s;
      if (VD(e)) {
        if (r = UD(n, e), r == -1)
          throw new Error("The provided component was not found in the application");
        o = e;
      } else if (Y_(e)) {
        if (r = J_(n, e), r == -1)
          throw new Error("The provided directive was not found in the application");
        s = zD(r, n);
      } else if (r = og(n, e), r == -1)
        return null;
      const a = oe(n[r]), u = Di(a), c = u && !Array.isArray(u) ? u : Al(n, r, a);
      if (o && c.component === void 0 && (c.component = o, Le(c.component, c)), s && c.directives === void 0) {
        c.directives = s;
        for (let l = 0; l < s.length; l++)
          Le(s[l], c);
      }
      Le(c.native, c), t = c;
    }
  } else {
    const n = e;
    ngDevMode && On(n);
    let r = n;
    for (; r = r.parentNode; ) {
      const o = Di(r);
      if (o) {
        const s = Array.isArray(o) ? o : o.lView;
        if (!s)
          return null;
        const a = og(s, n);
        if (a >= 0) {
          const u = oe(s[a]), c = Al(s, a, u);
          Le(u, c), t = c;
          break;
        }
      }
    }
  }
  return t || null;
}
i(rt, "getLContext");
function Al(e, t, n) {
  return new $D(e[pr], t, n);
}
i(Al, "createLContext");
function BD(e) {
  let t = Di(e), n;
  if (je(t)) {
    const r = t, o = UD(r, e);
    n = yt(o, r);
    const s = Al(r, o, n[fe]);
    s.component = e, Le(e, s), Le(s.native, s);
  } else {
    const r = t, o = r.lView;
    ngDevMode && nn(o), n = yt(r.nodeIndex, o);
  }
  return n;
}
i(BD, "getComponentViewByInstance");
const Ol = "__ngContext__";
function Le(e, t) {
  ngDevMode && b(e, "Target expected"), je(t) ? (e[Ol] = t[pr], Q_(t)) : e[Ol] = t;
}
i(Le, "attachPatchData");
function Di(e) {
  ngDevMode && b(e, "Target expected");
  const t = e[Ol];
  return typeof t == "number" ? jD(t) : t || null;
}
i(Di, "readPatchedData");
function HD(e) {
  const t = Di(e);
  return t ? je(t) ? t : t.lView : null;
}
i(HD, "readPatchedLView");
function VD(e) {
  return e && e.constructor && e.constructor.ɵcmp;
}
i(VD, "isComponentInstance");
function Y_(e) {
  return e && e.constructor && e.constructor.ɵdir;
}
i(Y_, "isDirectiveInstance");
function og(e, t) {
  const n = e[E];
  for (let r = A; r < n.bindingStartIndex; r++)
    if (oe(e[r]) === t)
      return r;
  return -1;
}
i(og, "findViaNativeElement");
function K_(e) {
  if (e.child)
    return e.child;
  if (e.next)
    return e.next;
  for (; e.parent && !e.parent.next; )
    e = e.parent;
  return e.parent && e.parent.next;
}
i(K_, "traverseNextElement");
function UD(e, t) {
  const n = e[E].components;
  if (n)
    for (let r = 0; r < n.length; r++) {
      const o = n[r];
      if (yt(o, e)[se] === t)
        return o;
    }
  else if (yt(A, e)[se] === t)
    return A;
  return -1;
}
i(UD, "findViaComponent");
function J_(e, t) {
  let n = e[E].firstChild;
  for (; n; ) {
    const r = n.directiveStart, o = n.directiveEnd;
    for (let s = r; s < o; s++)
      if (e[s] === t)
        return n.index;
    n = K_(n);
  }
  return -1;
}
i(J_, "findViaDirective");
function zD(e, t) {
  const n = t[E].data[e];
  if (n.directiveStart === 0)
    return Q;
  const r = [];
  for (let o = n.directiveStart; o < n.directiveEnd; o++) {
    const s = t[o];
    VD(s) || r.push(s);
  }
  return r;
}
i(zD, "getDirectivesAtNodeIndex");
function X_(e, t) {
  const n = t[E].data[e], { directiveStart: r, componentOffset: o } = n;
  return o > -1 ? t[r + o] : null;
}
i(X_, "getComponentAtNodeIndex");
function eS(e, t) {
  const n = e[E].data[t];
  if (n && n.localNames) {
    const r = {};
    let o = n.index + 1;
    for (let s = 0; s < n.localNames.length; s += 2)
      r[n.localNames[s]] = e[o], o++;
    return r;
  }
  return null;
}
i(eS, "discoverLocalRefs");
function tS(e) {
  ngDevMode && b(e, "component");
  let t = je(e) ? e : HD(e);
  for (; t && !(t[S] & 512); )
    t = yr(t);
  return ngDevMode && nn(t), t;
}
i(tS, "getRootView");
function nS(e) {
  const t = tS(e);
  return ngDevMode && b(t[se], "Root view has no context. Perhaps it is disconnected?"), t[se];
}
i(nS, "getRootContext");
function GD(e) {
  return qD(e[Li]);
}
i(GD, "getFirstLContainer");
function WD(e) {
  return qD(e[kt]);
}
i(WD, "getNextLContainer");
function qD(e) {
  for (; e !== null && !Re(e); )
    e = e[kt];
  return e;
}
i(qD, "getNearestLContainer");
function La(e) {
  ngDevMode && uf(e);
  const t = rt(e);
  if (t === null)
    return null;
  if (t.component === void 0) {
    const n = t.lView;
    if (n === null)
      return null;
    t.component = X_(t.nodeIndex, n);
  }
  return t.component;
}
i(La, "getComponent$1");
function QD(e) {
  uf(e);
  const t = rt(e), n = t ? t.lView : null;
  return n === null ? null : n[se];
}
i(QD, "getContext");
function ZD(e) {
  const t = rt(e);
  let n = t ? t.lView : null;
  if (n === null)
    return null;
  let r;
  for (; n[E].type === 2 && (r = yr(n)); )
    n = r;
  return n[S] & 512 ? null : n[se];
}
i(ZD, "getOwningComponent");
function YD(e) {
  const t = HD(e);
  return t !== null ? [nS(t)] : [];
}
i(YD, "getRootComponents");
function KD(e) {
  const t = rt(e), n = t ? t.lView : null;
  if (n === null)
    return xe.NULL;
  const r = n[E].data[t.nodeIndex];
  return new De(r, n);
}
i(KD, "getInjector");
function rS(e) {
  const t = rt(e), n = t ? t.lView : null;
  if (n === null)
    return [];
  const r = n[E], o = r.data[t.nodeIndex], s = [], a = o.providerIndexes & 1048575, u = o.directiveEnd;
  for (let c = a; c < u; c++) {
    let l = r.data[c];
    aS(l) && (l = l.type), s.push(l);
  }
  return s;
}
i(rS, "getInjectionTokens");
function JD(e) {
  if (e instanceof Text)
    return [];
  const t = rt(e), n = t ? t.lView : null;
  if (n === null)
    return [];
  const r = n[E], o = t.nodeIndex;
  return r?.data[o] ? (t.directives === void 0 && (t.directives = zD(o, n)), t.directives === null ? [] : [...t.directives]) : [];
}
i(JD, "getDirectives");
function oS(e) {
  const { constructor: t } = e;
  if (!t)
    throw new Error("Unable to find the instance constructor");
  const n = U(t);
  if (n)
    return {
      inputs: ig(n.inputs),
      outputs: n.outputs,
      encapsulation: n.encapsulation,
      changeDetection: n.onPush ? fr.OnPush : fr.Default
    };
  const r = Ne(t);
  return r ? { inputs: ig(r.inputs), outputs: r.outputs } : null;
}
i(oS, "getDirectiveMetadata$1");
function iS(e) {
  const t = rt(e);
  if (t === null)
    return {};
  if (t.localRefs === void 0) {
    const n = t.lView;
    if (n === null)
      return {};
    t.localRefs = eS(n, t.nodeIndex);
  }
  return t.localRefs || {};
}
i(iS, "getLocalRefs");
function XD(e) {
  return rt(e).native;
}
i(XD, "getHostElement");
function ev(e) {
  ngDevMode && uf(e);
  const t = rt(e), n = t === null ? null : t.lView;
  if (n === null)
    return [];
  const r = n[E], o = n[yo], s = r.cleanup, a = [];
  if (s && o)
    for (let u = 0; u < s.length; ) {
      const c = s[u++], l = s[u++];
      if (typeof c == "string") {
        const d = c, f = oe(n[l]), h = o[s[u++]], p = s[u++], g = typeof p == "boolean" || p >= 0 ? "dom" : "output", m = typeof p == "boolean" ? p : !1;
        e == f && a.push({ element: e, name: d, callback: h, useCapture: m, type: g });
      }
    }
  return a.sort(sS), a;
}
i(ev, "getListeners");
function sS(e, t) {
  return e.name == t.name ? 0 : e.name < t.name ? -1 : 1;
}
i(sS, "sortListeners");
function aS(e) {
  return e.type !== void 0 && e.declaredInputs !== void 0 && e.findHostDirectiveDefs !== void 0;
}
i(aS, "isDirectiveDefHack");
function uf(e) {
  if (typeof Element < "u" && !(e instanceof Element))
    throw new Error("Expecting instance of DOM Element");
}
i(uf, "assertDomElement");
function ig(e) {
  const t = {};
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const r = e[n];
    if (r === void 0)
      continue;
    let o;
    Array.isArray(r) ? o = r[0] : o = r, t[n] = o;
  }
  return t;
}
i(ig, "extractInputDebugMetadata");
let Fl;
function uS(e) {
  Fl = e;
}
i(uS, "setDocument");
function Kn() {
  if (Fl !== void 0)
    return Fl;
  if (typeof document < "u")
    return document;
  throw new I(210, (typeof ngDevMode > "u" || ngDevMode) && "The document object is not available in this context. Make sure the DOCUMENT injection token is provided.");
}
i(Kn, "getDocument");
const tv = new $(ngDevMode ? "AppId" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => cS, "factory")
}), cS = "ng", nv = new $(ngDevMode ? "Platform Initializer" : ""), Es = new $(ngDevMode ? "Platform ID" : "", {
  providedIn: "platform",
  factory: /* @__PURE__ */ i(() => "unknown", "factory")
  // set a default platform name, when none set explicitly
}), lS = new $(ngDevMode ? "Application Packages Root URL" : ""), dS = new $(ngDevMode ? "AnimationModuleType" : ""), fS = new $(ngDevMode ? "CSP nonce" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => Kn().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null, "factory")
}), cf = {
  breakpoints: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  placeholderResolution: 30,
  disableImageSizeWarning: !1,
  disableImageLazyLoadWarning: !1
}, lf = new $(ngDevMode ? "ImageConfig" : "", { providedIn: "root", factory: /* @__PURE__ */ i(() => cf, "factory") });
function hS(e) {
  return e;
}
i(hS, "makeStateKey");
function pS() {
  const e = new Vr();
  return M(Es) === "browser" && (e.store = gS(Kn(), M(tv))), e;
}
i(pS, "initTransferState");
class Vr {
  static {
    i(this, "TransferState");
  }
  constructor() {
    this.store = {}, this.onSerializeCallbacks = {};
  }
  static {
    this.ɵprov = /** @pureOrBreakMyCode */
    ne({
      token: Vr,
      providedIn: "root",
      factory: pS
    });
  }
  /**
   * Get the value corresponding to a key. Return `defaultValue` if key is not found.
   */
  get(t, n) {
    return this.store[t] !== void 0 ? this.store[t] : n;
  }
  /**
   * Set the value corresponding to a key.
   */
  set(t, n) {
    this.store[t] = n;
  }
  /**
   * Remove a key from the store.
   */
  remove(t) {
    delete this.store[t];
  }
  /**
   * Test whether a key exists in the store.
   */
  hasKey(t) {
    return this.store.hasOwnProperty(t);
  }
  /**
   * Indicates whether the state is empty.
   */
  get isEmpty() {
    return Object.keys(this.store).length === 0;
  }
  /**
   * Register a callback to provide the value for a key when `toJson` is called.
   */
  onSerialize(t, n) {
    this.onSerializeCallbacks[t] = n;
  }
  /**
   * Serialize the current state of the store to JSON.
   */
  toJson() {
    for (const t in this.onSerializeCallbacks)
      if (this.onSerializeCallbacks.hasOwnProperty(t))
        try {
          this.store[t] = this.onSerializeCallbacks[t]();
        } catch (n) {
          console.warn("Exception in onSerialize callback: ", n);
        }
    return JSON.stringify(this.store).replace(/</g, "\\u003C");
  }
}
function gS(e, t) {
  const n = e.getElementById(t + "-state");
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn("Exception while restoring TransferState for app " + t, r);
    }
  return {};
}
i(gS, "retrieveTransferredState");
const df = "h", ff = "b";
var Ir;
(function(e) {
  e.FirstChild = "f", e.NextSibling = "n";
})(Ir || (Ir = {}));
const Nl = "e", kl = "t", zi = "c", ja = "x", vo = "r", Rl = "i", xl = "n", ma = "d", mS = "__nghData__", hf = mS, vi = "ngh", rv = "nghm";
let ov = /* @__PURE__ */ i(() => null, "_retrieveHydrationInfoImpl");
function yS(e, t, n = !1) {
  let r = e.getAttribute(vi);
  if (r == null)
    return null;
  const [o, s] = r.split("|");
  if (r = n ? s : o, !r)
    return null;
  const a = s ? `|${s}` : "", u = n ? o : a;
  let c = {};
  if (r !== "") {
    const d = t.get(Vr, null, { optional: !0 });
    d !== null && (c = d.get(hf, [])[Number(r)], ngDevMode && b(c, "Unable to retrieve hydration info from the TransferState."));
  }
  const l = {
    data: c,
    firstChild: e.firstChild ?? null
  };
  return n && (l.firstChild = e, Au(l, 0, e.nextSibling)), u ? e.setAttribute(vi, u) : e.removeAttribute(vi), ngDevMode && Go(
    e,
    /* checkIfAlreadyClaimed */
    !1
  ), ngDevMode && ngDevMode.hydratedComponents++, l;
}
i(yS, "retrieveHydrationInfoImpl");
function DS() {
  ov = yS;
}
i(DS, "enableRetrieveHydrationInfoImpl");
function pf(e, t, n = !1) {
  return ov(e, t, n);
}
i(pf, "retrieveHydrationInfo");
function iv(e) {
  let t = e._lView;
  return t[E].type === 2 ? null : (Hd(t) && (t = t[A]), t);
}
i(iv, "getLNodeForHydration");
function vS(e) {
  return e.textContent?.replace(/\s/gm, "");
}
i(vS, "getTextNodeContent");
function IS(e) {
  const t = Kn(), n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, {
    acceptNode(s) {
      const a = vS(s);
      return a === "ngetn" || a === "ngtns" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  let r;
  const o = [];
  for (; r = n.nextNode(); )
    o.push(r);
  for (const s of o)
    s.textContent === "ngetn" ? s.replaceWith(t.createTextNode("")) : s.remove();
}
i(IS, "processTextNodeMarkersBeforeHydration");
var Io;
(function(e) {
  e.Hydrated = "hydrated", e.Skipped = "skipped", e.Mismatched = "mismatched";
})(Io || (Io = {}));
const sv = "__ngDebugHydrationInfo__";
function gf(e, t) {
  e[sv] = t;
}
i(gf, "patchHydrationInfo");
function av(e) {
  return e[sv] ?? null;
}
i(av, "readHydrationInfo");
function Go(e, t = !0) {
  if (!ngDevMode)
    throw new Error("Calling `markRNodeAsClaimedByHydration` in prod mode is not supported and likely a mistake.");
  if (t && ES(e))
    throw new Error("Trying to claim a node, which was claimed already.");
  gf(e, { status: Io.Hydrated }), ngDevMode.hydratedNodes++;
}
i(Go, "markRNodeAsClaimedByHydration");
function CS(e) {
  if (!ngDevMode)
    throw new Error("Calling `markRNodeAsSkippedByHydration` in prod mode is not supported and likely a mistake.");
  gf(e, { status: Io.Skipped }), ngDevMode.componentsSkippedHydration++;
}
i(CS, "markRNodeAsSkippedByHydration");
function Gi(e, t = null, n = null) {
  if (!ngDevMode)
    throw new Error("Calling `markRNodeAsMismatchedByHydration` in prod mode is not supported and likely a mistake.");
  for (; e && !La(e); )
    e = e?.parentNode;
  e && gf(e, {
    status: Io.Mismatched,
    expectedNodeDetails: t,
    actualNodeDetails: n
  });
}
i(Gi, "markRNodeAsHavingHydrationMismatch");
function ES(e) {
  return av(e)?.status === Io.Hydrated;
}
i(ES, "isRNodeClaimedForHydration");
function Au(e, t, n) {
  e.segmentHeads ??= {}, e.segmentHeads[t] = n;
}
i(Au, "setSegmentHead");
function Pl(e, t) {
  return e.segmentHeads?.[t] ?? null;
}
i(Pl, "getSegmentHead");
function bS(e, t) {
  const n = e.data;
  let r = n[Nl]?.[t] ?? null;
  return r === null && n[zi]?.[t] && (r = mf(e, t)), r;
}
i(bS, "getNgContainerSize");
function uv(e, t) {
  return e.data[zi]?.[t] ?? null;
}
i(uv, "getSerializedContainerViews");
function mf(e, t) {
  const n = uv(e, t) ?? [];
  let r = 0;
  for (let o of n)
    r += o[vo] * (o[ja] ?? 1);
  return r;
}
i(mf, "calcSerializedContainerSize");
function Ou(e, t) {
  if (typeof e.disconnectedNodes > "u") {
    const n = e.data[ma];
    e.disconnectedNodes = n ? new Set(n) : null;
  }
  return !!e.disconnectedNodes?.has(t);
}
i(Ou, "isDisconnectedNode$1");
const hi = new $(typeof ngDevMode > "u" || ngDevMode ? "IS_HYDRATION_DOM_REUSE_ENABLED" : ""), cv = !1, lv = new $(typeof ngDevMode > "u" || ngDevMode ? "PRESERVE_HOST_CONTENT" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => cv, "factory")
}), dv = new $(typeof ngDevMode > "u" || ngDevMode ? "IS_I18N_HYDRATION_ENABLED" : "");
let zs;
function fv() {
  if (zs === void 0 && (zs = null, pe.trustedTypes))
    try {
      zs = pe.trustedTypes.createPolicy("angular", {
        createHTML: /* @__PURE__ */ i((e) => e, "createHTML"),
        createScript: /* @__PURE__ */ i((e) => e, "createScript"),
        createScriptURL: /* @__PURE__ */ i((e) => e, "createScriptURL")
      });
    } catch {
    }
  return zs;
}
i(fv, "getPolicy$1");
function Wo(e) {
  return fv()?.createHTML(e) || e;
}
i(Wo, "trustedHTMLFromString");
function wS(e) {
  return fv()?.createScriptURL(e) || e;
}
i(wS, "trustedScriptURLFromString");
let Gs;
function yf() {
  if (Gs === void 0 && (Gs = null, pe.trustedTypes))
    try {
      Gs = pe.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: /* @__PURE__ */ i((e) => e, "createHTML"),
        createScript: /* @__PURE__ */ i((e) => e, "createScript"),
        createScriptURL: /* @__PURE__ */ i((e) => e, "createScriptURL")
      });
    } catch {
    }
  return Gs;
}
i(yf, "getPolicy");
function sg(e) {
  return yf()?.createHTML(e) || e;
}
i(sg, "trustedHTMLFromStringBypass");
function ag(e) {
  return yf()?.createScript(e) || e;
}
i(ag, "trustedScriptFromStringBypass");
function ug(e) {
  return yf()?.createScriptURL(e) || e;
}
i(ug, "trustedScriptURLFromStringBypass");
class Ur {
  static {
    i(this, "SafeValueImpl");
  }
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${jr})`;
  }
}
class MS extends Ur {
  static {
    i(this, "SafeHtmlImpl");
  }
  getTypeName() {
    return "HTML";
  }
}
class _S extends Ur {
  static {
    i(this, "SafeStyleImpl");
  }
  getTypeName() {
    return "Style";
  }
}
class SS extends Ur {
  static {
    i(this, "SafeScriptImpl");
  }
  getTypeName() {
    return "Script";
  }
}
class TS extends Ur {
  static {
    i(this, "SafeUrlImpl");
  }
  getTypeName() {
    return "URL";
  }
}
class AS extends Ur {
  static {
    i(this, "SafeResourceUrlImpl");
  }
  getTypeName() {
    return "ResourceURL";
  }
}
function sn(e) {
  return e instanceof Ur ? e.changingThisBreaksApplicationSecurity : e;
}
i(sn, "unwrapSafeValue");
function qo(e, t) {
  const n = hv(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL")
      return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${jr})`);
  }
  return n === t;
}
i(qo, "allowSanitizationBypassAndThrow");
function hv(e) {
  return e instanceof Ur && e.getTypeName() || null;
}
i(hv, "getSanitizationBypassType");
function OS(e) {
  return new MS(e);
}
i(OS, "bypassSanitizationTrustHtml");
function FS(e) {
  return new _S(e);
}
i(FS, "bypassSanitizationTrustStyle");
function NS(e) {
  return new SS(e);
}
i(NS, "bypassSanitizationTrustScript");
function kS(e) {
  return new TS(e);
}
i(kS, "bypassSanitizationTrustUrl");
function RS(e) {
  return new AS(e);
}
i(RS, "bypassSanitizationTrustResourceUrl");
function pv(e) {
  const t = new PS(e);
  return LS() ? new xS(t) : t;
}
i(pv, "getInertBodyHelper");
class xS {
  static {
    i(this, "DOMParserHelper");
  }
  constructor(t) {
    this.inertDocumentHelper = t;
  }
  getInertBodyElement(t) {
    t = "<body><remove></remove>" + t;
    try {
      const n = new window.DOMParser().parseFromString(Wo(t), "text/html").body;
      return n === null ? this.inertDocumentHelper.getInertBodyElement(t) : (n.removeChild(n.firstChild), n);
    } catch {
      return null;
    }
  }
}
class PS {
  static {
    i(this, "InertDocumentHelper");
  }
  constructor(t) {
    this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");
  }
  getInertBodyElement(t) {
    const n = this.inertDocument.createElement("template");
    return n.innerHTML = Wo(t), n;
  }
}
function LS() {
  try {
    return !!new window.DOMParser().parseFromString(Wo(""), "text/html");
  } catch {
    return !1;
  }
}
i(LS, "isDOMParserAvailable");
const jS = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Fu(e) {
  return e = String(e), e.match(jS) ? e : ((typeof ngDevMode > "u" || ngDevMode) && console.warn(`WARNING: sanitizing unsafe URL value ${e} (see ${jr})`), "unsafe:" + e);
}
i(Fu, "_sanitizeUrl");
function Sn(e) {
  const t = {};
  for (const n of e.split(","))
    t[n] = !0;
  return t;
}
i(Sn, "tagSet");
function bs(...e) {
  const t = {};
  for (const n of e)
    for (const r in n)
      n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
i(bs, "merge");
const gv = Sn("area,br,col,hr,img,wbr"), mv = Sn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), yv = Sn("rp,rt"), $S = bs(yv, mv), BS = bs(mv, Sn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), HS = bs(yv, Sn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), Ll = bs(gv, BS, HS, $S), Df = Sn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), VS = Sn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), US = Sn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"), Dv = bs(Df, VS, US), zS = Sn("script,style,template");
class GS {
  static {
    i(this, "SanitizingHtmlSerializer");
  }
  constructor() {
    this.sanitizedSomething = !1, this.buf = [];
  }
  sanitizeChildren(t) {
    let n = t.firstChild, r = !0, o = [];
    for (; n; ) {
      if (n.nodeType === Node.ELEMENT_NODE ? r = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, r && n.firstChild) {
        o.push(n), n = QS(n);
        continue;
      }
      for (; n; ) {
        n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
        let s = qS(n);
        if (s) {
          n = s;
          break;
        }
        n = o.pop();
      }
    }
    return this.buf.join("");
  }
  /**
   * Sanitizes an opening element tag (if valid) and returns whether the element's contents should
   * be traversed. Element content must always be traversed (even if the element itself is not
   * valid/safe), unless the element is one of `SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS`.
   *
   * @param element The element to sanitize.
   * @return True if the element's contents should be traversed.
   */
  startElement(t) {
    const n = cg(t).toLowerCase();
    if (!Ll.hasOwnProperty(n))
      return this.sanitizedSomething = !0, !zS.hasOwnProperty(n);
    this.buf.push("<"), this.buf.push(n);
    const r = t.attributes;
    for (let o = 0; o < r.length; o++) {
      const s = r.item(o), a = s.name, u = a.toLowerCase();
      if (!Dv.hasOwnProperty(u)) {
        this.sanitizedSomething = !0;
        continue;
      }
      let c = s.value;
      Df[u] && (c = Fu(c)), this.buf.push(" ", a, '="', lg(c), '"');
    }
    return this.buf.push(">"), !0;
  }
  endElement(t) {
    const n = cg(t).toLowerCase();
    Ll.hasOwnProperty(n) && !gv.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
  }
  chars(t) {
    this.buf.push(lg(t));
  }
}
function WS(e, t) {
  return (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY;
}
i(WS, "isClobberedElement");
function qS(e) {
  const t = e.nextSibling;
  if (t && e !== t.previousSibling)
    throw vv(t);
  return t;
}
i(qS, "getNextSibling");
function QS(e) {
  const t = e.firstChild;
  if (t && WS(e, t))
    throw vv(t);
  return t;
}
i(QS, "getFirstChild");
function cg(e) {
  const t = e.nodeName;
  return typeof t == "string" ? t : "FORM";
}
i(cg, "getNodeName");
function vv(e) {
  return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
}
i(vv, "clobberedElementError");
const ZS = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, YS = /([^\#-~ |!])/g;
function lg(e) {
  return e.replace(/&/g, "&amp;").replace(ZS, function(t) {
    const n = t.charCodeAt(0), r = t.charCodeAt(1);
    return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";";
  }).replace(YS, function(t) {
    return "&#" + t.charCodeAt(0) + ";";
  }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
i(lg, "encodeEntities");
let Ws;
function Iv(e, t) {
  let n = null;
  try {
    Ws = Ws || pv(e);
    let r = t ? String(t) : "";
    n = Ws.getInertBodyElement(r);
    let o = 5, s = r;
    do {
      if (o === 0)
        throw new Error("Failed to sanitize html because the input is unstable");
      o--, r = s, s = n.innerHTML, n = Ws.getInertBodyElement(r);
    } while (r !== s);
    const a = new GS(), u = a.sanitizeChildren(jl(n) || n);
    return (typeof ngDevMode > "u" || ngDevMode) && a.sanitizedSomething && console.warn(`WARNING: sanitizing HTML stripped some content, see ${jr}`), Wo(u);
  } finally {
    if (n) {
      const r = jl(n) || n;
      for (; r.firstChild; )
        r.removeChild(r.firstChild);
    }
  }
}
i(Iv, "_sanitizeHtml");
function jl(e) {
  return "content" in e && KS(e) ? e.content : null;
}
i(jl, "getTemplateContent");
function KS(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
}
i(KS, "isTemplateElement");
var Jn;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL";
})(Jn || (Jn = {}));
function Cv(e) {
  const t = ws();
  return t ? sg(t.sanitize(Jn.HTML, e) || "") : qo(
    e,
    "HTML"
    /* BypassType.Html */
  ) ? sg(sn(e)) : Iv(Kn(), j(e));
}
i(Cv, "ɵɵsanitizeHtml");
function Ev(e) {
  const t = ws();
  return t ? t.sanitize(Jn.STYLE, e) || "" : qo(
    e,
    "Style"
    /* BypassType.Style */
  ) ? sn(e) : j(e);
}
i(Ev, "ɵɵsanitizeStyle");
function vf(e) {
  const t = ws();
  return t ? t.sanitize(Jn.URL, e) || "" : qo(
    e,
    "URL"
    /* BypassType.Url */
  ) ? sn(e) : Fu(j(e));
}
i(vf, "ɵɵsanitizeUrl");
function If(e) {
  const t = ws();
  if (t)
    return ug(t.sanitize(Jn.RESOURCE_URL, e) || "");
  if (qo(
    e,
    "ResourceURL"
    /* BypassType.ResourceUrl */
  ))
    return ug(sn(e));
  throw new I(904, ngDevMode && `unsafe value used in a resource URL context (see ${jr})`);
}
i(If, "ɵɵsanitizeResourceUrl");
function bv(e) {
  const t = ws();
  if (t)
    return ag(t.sanitize(Jn.SCRIPT, e) || "");
  if (qo(
    e,
    "Script"
    /* BypassType.Script */
  ))
    return ag(sn(e));
  throw new I(905, ngDevMode && "unsafe value used in a script context");
}
i(bv, "ɵɵsanitizeScript");
function wv(e) {
  if (ngDevMode && (!Array.isArray(e) || !Array.isArray(e.raw) || e.length !== 1))
    throw new Error(`Unexpected interpolation in trusted HTML constant: ${e.join("?")}`);
  return Wo(e[0]);
}
i(wv, "ɵɵtrustConstantHtml");
function Mv(e) {
  if (ngDevMode && (!Array.isArray(e) || !Array.isArray(e.raw) || e.length !== 1))
    throw new Error(`Unexpected interpolation in trusted URL constant: ${e.join("?")}`);
  return wS(e[0]);
}
i(Mv, "ɵɵtrustConstantResourceUrl");
function JS(e, t) {
  return t === "src" && (e === "embed" || e === "frame" || e === "iframe" || e === "media" || e === "script") || t === "href" && (e === "base" || e === "link") ? If : vf;
}
i(JS, "getUrlSanitizer");
function _v(e, t, n) {
  return JS(t, n)(e);
}
i(_v, "ɵɵsanitizeUrlOrResourceUrl");
function XS(e) {
  if (e.toLowerCase().startsWith("on")) {
    const t = `Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...
If '${e}' is a directive input, make sure the directive is imported by the current module.`;
    throw new I(306, t);
  }
}
i(XS, "validateAgainstEventProperties");
function eT(e) {
  if (e.toLowerCase().startsWith("on")) {
    const t = `Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...`;
    throw new I(306, t);
  }
}
i(eT, "validateAgainstEventAttributes");
function ws() {
  const e = y();
  return e && e[bt].sanitizer;
}
i(ws, "getSanitizer");
const tT = /^>|^->|<!--|-->|--!>|<!-$/g, nT = /(<|>)/g, rT = "​$1​";
function Sv(e) {
  return e.replace(tT, (t) => t.replace(nT, rT));
}
i(Sv, "escapeCommentText");
function oT(e) {
  return e = sT(e.replace(/[$@]/g, "_")), `ng-reflect-${e}`;
}
i(oT, "normalizeDebugBindingName");
const iT = /([A-Z])/g;
function sT(e) {
  return e.replace(iT, (...t) => "-" + t[1].toLowerCase());
}
i(sT, "camelCaseToDashCase");
function aT(e) {
  try {
    return e != null ? e.toString().slice(0, 30) : e;
  } catch {
    return "[ERROR] Exception while trying to serialize the value";
  }
}
i(aT, "normalizeDebugBindingValue");
const Tv = {
  name: "custom-elements"
}, Av = {
  name: "no-errors-schema"
};
let Cf = !1;
function uT(e) {
  Cf = e;
}
i(uT, "ɵsetUnknownElementStrictMode");
function cT() {
  return Cf;
}
i(cT, "ɵgetUnknownElementStrictMode");
let Ef = !1;
function lT(e) {
  Ef = e;
}
i(lT, "ɵsetUnknownPropertyStrictMode");
function dT() {
  return Ef;
}
i(dT, "ɵgetUnknownPropertyStrictMode");
function fT(e, t, n, r, o) {
  if (r !== null && !o && n !== null && // Note that we can't check for `typeof HTMLUnknownElement === 'function'` because
  // Domino doesn't expose HTMLUnknownElement globally.
  (typeof HTMLUnknownElement < "u" && HTMLUnknownElement && e instanceof HTMLUnknownElement || typeof customElements < "u" && n.indexOf("-") > -1 && !customElements.get(n)) && !bf(r, n)) {
    const a = ku(t), u = Ru(t), c = `'${a ? "@Component" : "@NgModule"}.schemas'`;
    let l = `'${n}' is not a known element${u}:
`;
    if (l += `1. If '${n}' is an Angular component, then verify that it is ${a ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared"}.
`, n && n.indexOf("-") > -1 ? l += `2. If '${n}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${c} of this component to suppress this message.` : l += `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${c} of this component.`, Cf)
      throw new I(304, l);
    console.error(ye(304, l));
  }
}
i(fT, "validateElementIsKnown");
function hT(e, t, n, r) {
  return r === null || bf(r, n) || t in e || Iy(t) ? !0 : typeof Node > "u" || Node === null || !(e instanceof Node);
}
i(hT, "isPropertyValid");
function dg(e, t, n, r) {
  !t && n === 4 && (t = "ng-template");
  const o = ku(r), s = Ru(r);
  let a = `Can't bind to '${e}' since it isn't a known property of '${t}'${s}.`;
  const u = `'${o ? "@Component" : "@NgModule"}.schemas'`, c = o ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared";
  if (fg.has(e)) {
    const l = fg.get(e);
    a += `
If the '${e}' is an Angular control flow directive, please make sure that either the '${l}' directive or the 'CommonModule' is ${c}.`;
  } else
    a += `
1. If '${t}' is an Angular component and it has the '${e}' input, then verify that it is ${c}.`, t && t.indexOf("-") > -1 ? (a += `
2. If '${t}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${u} of this component to suppress this message.`, a += `
3. To allow any property add 'NO_ERRORS_SCHEMA' to the ${u} of this component.`) : a += `
2. To allow any property add 'NO_ERRORS_SCHEMA' to the ${u} of this component.`;
  Ov(a);
}
i(dg, "handleUnknownPropertyError");
function Ov(e) {
  if (Ef)
    throw new I(303, e);
  console.error(ye(303, e));
}
i(Ov, "reportUnknownPropertyError");
function Nu(e) {
  !ngDevMode && T("Must never be called in production mode");
  const n = e[ve][se];
  return n && n.constructor ? U(n.constructor) : null;
}
i(Nu, "getDeclarationComponentDef");
function ku(e) {
  return !ngDevMode && T("Must never be called in production mode"), !!Nu(e)?.standalone;
}
i(ku, "isHostComponentStandalone");
function Ru(e) {
  !ngDevMode && T("Must never be called in production mode");
  const n = Nu(e)?.type?.name;
  return n ? ` (used in the '${n}' component template)` : "";
}
i(Ru, "getTemplateLocationDetails");
const fg = /* @__PURE__ */ new Map([
  ["ngIf", "NgIf"],
  ["ngFor", "NgFor"],
  ["ngSwitchCase", "NgSwitchCase"],
  ["ngSwitchDefault", "NgSwitchDefault"]
]);
function bf(e, t) {
  if (e !== null)
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (r === Av || r === Tv && t && t.indexOf("-") > -1)
        return !0;
    }
  return !1;
}
i(bf, "matchingSchemas");
function Fv(e) {
  return e.ownerDocument.defaultView;
}
i(Fv, "ɵɵresolveWindow");
function Nv(e) {
  return e.ownerDocument;
}
i(Nv, "ɵɵresolveDocument");
function wf(e) {
  return e.ownerDocument.body;
}
i(wf, "ɵɵresolveBody");
const Co = "�";
function qt(e) {
  return e instanceof Function ? e() : e;
}
i(qt, "maybeUnwrapFn");
function Nt(e) {
  return (e ?? M(xe)).get(Es) === "browser";
}
i(Nt, "isPlatformBrowser$1");
const hg = 200;
function pT(e) {
  if (kv(e), !U(e).standalone)
    throw new I(907, `The ${z(e)} component is not marked as standalone, but Angular expects to have a standalone component here. Please make sure the ${z(e)} component has the \`standalone: true\` flag in the decorator.`);
}
i(pT, "assertStandaloneComponentType");
function kv(e) {
  if (!U(e))
    throw new I(906, `The ${z(e)} is not an Angular component, make sure it has the \`@Component\` decorator.`);
}
i(kv, "assertComponentDef");
function gT(e, t, n) {
  throw new I(-300, `Multiple components match node with tagname ${e.value}: ${z(t)} and ${z(n)}`);
}
i(gT, "throwMultipleComponentError");
function mT(e, t, n, r, o) {
  const a = Nu(o)?.type?.name;
  let c = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value${r ? ` for '${r}'` : ""}: '${pg(t)}'. Current value: '${pg(n)}'.${a ? ` Expression location: ${a} component` : ""}`;
  throw e && (c += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook?"), new I(-100, c);
}
i(mT, "throwErrorIfNoChangesMode");
function pg(e) {
  let t = String(e);
  try {
    (Array.isArray(e) || t === "[object Object]") && (t = JSON.stringify(e));
  } catch {
  }
  return t.length > hg ? t.substring(0, hg) + "…" : t;
}
i(pg, "formatValue");
function gg(e, t, n, r, o) {
  const [s, a, ...u] = r.split(Co);
  let c = a, l = a;
  for (let d = 0; d < u.length; d++) {
    const f = t + d;
    c += `${e[f]}${u[d]}`, l += `${f === n ? o : e[f]}${u[d]}`;
  }
  return { propName: s, oldValue: c, newValue: l };
}
i(gg, "constructDetailsForInterpolation");
function yT(e, t, n, r) {
  const o = e[E].data, s = o[t];
  if (typeof s == "string")
    return s.indexOf(Co) > -1 ? gg(e, t, t, s, r) : { propName: s, oldValue: n, newValue: r };
  if (s === null) {
    let a = t - 1;
    for (; typeof o[a] != "string" && o[a + 1] === null; )
      a--;
    const u = o[a];
    if (typeof u == "string") {
      const c = u.match(new RegExp(Co, "g"));
      if (c && c.length - 1 > t - a)
        return gg(e, a, t, u, r);
    }
  }
  return { propName: void 0, oldValue: n, newValue: r };
}
i(yT, "getExpressionChangedErrorDetails");
var Eo;
(function(e) {
  e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase";
})(Eo || (Eo = {}));
let $l;
function Mf(e, t) {
  return $l(e, t);
}
i(Mf, "icuContainerIterate");
function DT(e) {
  $l === void 0 && ($l = e());
}
i(DT, "ensureIcuContainerVisitorLoaded");
function Jr(e, t, n, r, o) {
  if (r != null) {
    let s, a = !1;
    Re(r) ? s = r : je(r) && (a = !0, ngDevMode && b(r[fe], "HOST must be defined for a component LView"), r = r[fe]);
    const u = oe(r);
    e === 0 && n !== null ? o == null ? Bv(t, n, u) : Cr(t, n, u, o || null, !0) : e === 1 && n !== null ? Cr(t, n, u, o || null, !0) : e === 2 ? Ms(t, u, a) : e === 3 && (ngDevMode && ngDevMode.rendererDestroyNode++, t.destroyNode(u)), s != null && ST(t, e, s, n, o);
  }
}
i(Jr, "applyToElementOrContainer");
function _f(e, t) {
  return ngDevMode && ngDevMode.rendererCreateTextNode++, ngDevMode && ngDevMode.rendererSetText++, e.createText(t);
}
i(_f, "createTextNode");
function Rv(e, t, n) {
  ngDevMode && ngDevMode.rendererSetText++, e.setValue(t, n);
}
i(Rv, "updateTextNode");
function Sf(e, t) {
  return ngDevMode && ngDevMode.rendererCreateComment++, e.createComment(Sv(t));
}
i(Sf, "createCommentNode");
function xu(e, t, n) {
  return ngDevMode && ngDevMode.rendererCreateElement++, e.createElement(t, n);
}
i(xu, "createElementNode");
function vT(e, t) {
  xv(e, t), t[fe] = null, t[Be] = null;
}
i(vT, "removeViewFromDOM");
function IT(e, t, n, r, o, s) {
  r[fe] = o, r[Be] = t, $u(e, r, n, 1, o, s);
}
i(IT, "addViewToDOM");
function xv(e, t) {
  t[bt].changeDetectionScheduler?.notify(
    1
    /* NotificationType.AfterRenderHooks */
  ), $u(e, t, t[N], 2, null, null);
}
i(xv, "detachViewFromDOM");
function CT(e) {
  let t = e[Li];
  if (!t)
    return Fc(e[E], e);
  for (; t; ) {
    let n = null;
    if (je(t))
      n = t[Li];
    else {
      ngDevMode && it(t);
      const r = t[me];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[kt] && t !== e; )
        je(t) && Fc(t[E], t), t = t[Ee];
      t === null && (t = e), je(t) && Fc(t[E], t), n = t && t[kt];
    }
    t = n;
  }
}
i(CT, "destroyViewTree");
function ET(e, t, n, r) {
  ngDevMode && nn(t), ngDevMode && it(n);
  const o = me + r, s = n.length;
  r > 0 && (n[o - 1][kt] = t), r < s - me ? (t[kt] = n[o], yy(n, me + r, t)) : (n.push(t), t[kt] = null), t[Ee] = n;
  const a = t[gs];
  a !== null && n !== a && bT(a, t);
  const u = t[Rt];
  u !== null && u.insertView(e), El(t), t[S] |= 128;
}
i(ET, "insertView");
function bT(e, t) {
  ngDevMode && b(t, "LView required"), ngDevMode && it(e);
  const n = e[mr], r = t[Ee];
  ngDevMode && it(r);
  const o = r[Ee][ve];
  ngDevMode && b(o, "Missing insertedComponentLView");
  const s = t[ve];
  ngDevMode && b(s, "Missing declaredComponentLView"), s !== o && (e[S] |= Fa.HasTransplantedViews), n === null ? e[mr] = [t] : n.push(t);
}
i(bT, "trackMovedView");
function Pv(e, t) {
  ngDevMode && it(e), ngDevMode && b(e[mr], "A projected view should belong to a non-empty projected views collection");
  const n = e[mr], r = n.indexOf(t);
  ngDevMode && it(t[Ee]), n.splice(r, 1);
}
i(Pv, "detachMovedView");
function Wi(e, t) {
  if (e.length <= me)
    return;
  const n = me + t, r = e[n];
  if (r) {
    const o = r[gs];
    o !== null && o !== e && Pv(o, r), t > 0 && (e[n - 1][kt] = r[kt]);
    const s = Sa(e, me + t);
    vT(r[E], r);
    const a = s[Rt];
    a !== null && a.detachView(s[E]), r[Ee] = null, r[kt] = null, r[S] &= -129;
  }
  return r;
}
i(Wi, "detachView");
function Pu(e, t) {
  if (!(t[S] & 256)) {
    const n = t[N];
    n.destroyNode && $u(e, t, n, 3, null, null), CT(t);
  }
}
i(Pu, "destroyLView");
function Fc(e, t) {
  if (t[S] & 256)
    return;
  const n = B(null);
  try {
    t[S] &= -129, t[S] |= 256, t[gr] && Ym(t[gr]), jv(e, t), Lv(e, t), t[E].type === 1 && (ngDevMode && ngDevMode.rendererDestroy++, t[N].destroy());
    const r = t[gs];
    if (r !== null && Re(t[Ee])) {
      r !== t[Ee] && Pv(r, t);
      const o = t[Rt];
      o !== null && o.detachView(e);
    }
    Z_(t);
  } finally {
    B(n);
  }
}
i(Fc, "cleanUpView");
function Lv(e, t) {
  ngDevMode && wd(Lv.name);
  const n = e.cleanup, r = t[yo];
  if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
      if (typeof n[s] == "string") {
        const a = n[s + 3];
        ngDevMode && X(a, "cleanup target must be a number"), a >= 0 ? r[a]() : r[-a].unsubscribe(), s += 2;
      } else {
        const a = r[n[s + 1]];
        n[s].call(a);
      }
  r !== null && (t[yo] = null);
  const o = t[Nn];
  if (o !== null) {
    t[Nn] = null;
    for (let s = 0; s < o.length; s++) {
      const a = o[s];
      ngDevMode && cy(a, "Expecting destroy hook to be a function."), a();
    }
  }
}
i(Lv, "processCleanups");
function jv(e, t) {
  ngDevMode && wd(jv.name);
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      const o = t[n[r]];
      if (!(o instanceof Cs)) {
        const s = n[r + 1];
        if (Array.isArray(s))
          for (let a = 0; a < s.length; a += 2) {
            const u = o[s[a]], c = s[a + 1];
            Gt(4, u, c);
            try {
              c.call(u);
            } finally {
              Gt(5, u, c);
            }
          }
        else {
          Gt(4, o, s);
          try {
            s.call(o);
          } finally {
            Gt(5, o, s);
          }
        }
      }
    }
}
i(jv, "executeOnDestroys");
function Tf(e, t, n) {
  return $v(e, t.parent, n);
}
i(Tf, "getParentRElement");
function $v(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 40; )
    t = r, r = t.parent;
  if (r === null)
    return n[fe];
  {
    ngDevMode && $e(
      r,
      7
      /* TNodeType.Container */
    );
    const { componentOffset: o } = r;
    if (o > -1) {
      ngDevMode && Ke(r, n);
      const { encapsulation: s } = e.data[r.directiveStart + o];
      if (s === yn.None || s === yn.Emulated)
        return null;
    }
    return He(r, n);
  }
}
i($v, "getClosestRElement");
function Cr(e, t, n, r, o) {
  ngDevMode && ngDevMode.rendererInsertBefore++, e.insertBefore(t, n, r, o);
}
i(Cr, "nativeInsertBefore");
function Bv(e, t, n) {
  ngDevMode && ngDevMode.rendererAppendChild++, ngDevMode && b(t, "parent node must be defined"), e.appendChild(t, n);
}
i(Bv, "nativeAppendChild");
function mg(e, t, n, r, o) {
  r !== null ? Cr(e, t, n, r, o) : Bv(e, t, n);
}
i(mg, "nativeAppendOrInsertBefore");
function wT(e, t, n, r) {
  e.removeChild(t, n, r);
}
i(wT, "nativeRemoveChild");
function Lu(e, t) {
  return e.parentNode(t);
}
i(Lu, "nativeParentNode");
function MT(e, t) {
  return e.nextSibling(t);
}
i(MT, "nativeNextSibling");
function Hv(e, t, n) {
  return Uv(e, t, n);
}
i(Hv, "getInsertInFrontOfRNode");
function Vv(e, t, n) {
  return e.type & 40 ? He(e, n) : null;
}
i(Vv, "getInsertInFrontOfRNodeWithNoI18n");
let Uv = Vv, Bl;
function zv(e, t) {
  Uv = e, Bl = t;
}
i(zv, "setI18nHandling");
function ju(e, t, n, r) {
  const o = Tf(e, r, t), s = t[N], a = r.parent || t[Be], u = Hv(a, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++)
        mg(s, o, n[c], u, !1);
    else
      mg(s, o, n, u, !1);
  Bl !== void 0 && Bl(s, r, t, n, o);
}
i(ju, "appendChild");
function Ii(e, t) {
  if (t !== null) {
    ngDevMode && $e(
      t,
      63
      /* TNodeType.Projection */
    );
    const n = t.type;
    if (n & 3)
      return He(t, e);
    if (n & 4)
      return Hl(-1, e[t.index]);
    if (n & 8) {
      const r = t.child;
      if (r !== null)
        return Ii(e, r);
      {
        const o = e[t.index];
        return Re(o) ? Hl(-1, o) : oe(o);
      }
    } else {
      if (n & 32)
        return Mf(t, e)() || oe(e[t.index]);
      {
        const r = Gv(e, t);
        if (r !== null) {
          if (Array.isArray(r))
            return r[0];
          const o = yr(e[ve]);
          return ngDevMode && Vy(o), Ii(o, r);
        } else
          return Ii(e, t.next);
      }
    }
  }
  return null;
}
i(Ii, "getFirstNativeNode");
function Gv(e, t) {
  if (t !== null) {
    const r = e[ve][Be], o = t.projection;
    return ngDevMode && WM(e), r.projection[o];
  }
  return null;
}
i(Gv, "getProjectionNodes");
function Hl(e, t) {
  const n = me + e + 1;
  if (n < t.length) {
    const r = t[n], o = r[E].firstChild;
    if (o !== null)
      return Ii(r, o);
  }
  return t[Jt];
}
i(Hl, "getBeforeNodeForView");
function Ms(e, t, n) {
  ngDevMode && ngDevMode.rendererRemoveNode++;
  const r = Lu(e, t);
  r && wT(e, r, t, n);
}
i(Ms, "nativeRemoveNode");
function Wv(e) {
  e.textContent = "";
}
i(Wv, "clearElementContents");
function Af(e, t, n, r, o, s, a) {
  for (; n != null; ) {
    ngDevMode && Ke(n, r), ngDevMode && $e(
      n,
      63
      /* TNodeType.Icu */
    );
    const u = r[n.index], c = n.type;
    if (a && t === 0 && (u && Le(oe(u), r), n.flags |= 2), (n.flags & 32) !== 32)
      if (c & 8)
        Af(e, t, n.child, r, o, s, !1), Jr(t, e, o, u, s);
      else if (c & 32) {
        const l = Mf(n, r);
        let d;
        for (; d = l(); )
          Jr(t, e, o, d, s);
        Jr(t, e, o, u, s);
      } else c & 16 ? qv(e, t, r, n, o, s) : (ngDevMode && $e(
        n,
        7
        /* TNodeType.Container */
      ), Jr(t, e, o, u, s));
    n = a ? n.projectionNext : n.next;
  }
}
i(Af, "applyNodes");
function $u(e, t, n, r, o, s) {
  Af(n, r, e.firstChild, t, o, s, !1);
}
i($u, "applyView");
function _T(e, t, n) {
  const r = t[N], o = Tf(e, n, t), s = n.parent || t[Be];
  let a = Hv(s, n, t);
  qv(r, 0, t, n, o, a);
}
i(_T, "applyProjection");
function qv(e, t, n, r, o, s) {
  const a = n[ve], u = a[Be];
  ngDevMode && O(typeof r.projection, "number", "expecting projection index");
  const c = u.projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      const d = c[l];
      Jr(t, e, o, d, s);
    }
  else {
    let l = c;
    const d = a[Ee];
    xa(r) && (l.flags |= 128), Af(e, t, l, d, o, s, !0);
  }
}
i(qv, "applyProjectionRecursive");
function ST(e, t, n, r, o) {
  ngDevMode && it(n);
  const s = n[Jt], a = oe(n);
  s !== a && Jr(t, e, r, s, o);
  for (let u = me; u < n.length; u++) {
    const c = n[u];
    $u(c[E], c, e, t, r, s);
  }
}
i(ST, "applyContainer");
function TT(e, t, n, r, o) {
  if (t)
    o ? (ngDevMode && ngDevMode.rendererAddClass++, e.addClass(n, r)) : (ngDevMode && ngDevMode.rendererRemoveClass++, e.removeClass(n, r));
  else {
    let s = r.indexOf("-") === -1 ? void 0 : Eo.DashCase;
    o == null ? (ngDevMode && ngDevMode.rendererRemoveStyle++, e.removeStyle(n, r, s)) : (typeof o == "string" && o.endsWith("!important") && (o = o.slice(0, -10), s |= Eo.Important), ngDevMode && ngDevMode.rendererSetStyle++, e.setStyle(n, r, o, s));
  }
}
i(TT, "applyStyling");
function AT(e, t, n) {
  ngDevMode && Po(n, "'newValue' should be a string"), e.setAttribute(t, "style", n), ngDevMode && ngDevMode.rendererSetStyle++;
}
i(AT, "writeDirectStyle");
function Qv(e, t, n) {
  ngDevMode && Po(n, "'newValue' should be a string"), n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n), ngDevMode && ngDevMode.rendererSetClassName++;
}
i(Qv, "writeDirectClass");
function Zv(e, t, n) {
  const { mergedAttrs: r, classes: o, styles: s } = n;
  r !== null && yl(e, t, r), o !== null && Qv(e, t, o), s !== null && AT(e, t, s);
}
i(Zv, "setupStaticAttributes");
const F = typeof ngDevMode > "u" || ngDevMode ? { __brand__: "NO_CHANGE" } : {};
function Yv(e = 1) {
  ngDevMode && tr(e, 0, "Can only advance forward"), Kv(P(), y(), Ve() + e, !!ngDevMode && Br());
}
i(Yv, "ɵɵadvance");
function Kv(e, t, n, r) {
  if (ngDevMode && ms(t[E], n), !r)
    if ((t[S] & 3) === 3) {
      const s = e.preOrderCheckHooks;
      s !== null && ha(t, s, n);
    } else {
      const s = e.preOrderHooks;
      s !== null && pa(t, s, 0, n);
    }
  Dr(n);
}
i(Kv, "selectIndexInternal");
function zr(e, t = G.Default) {
  const n = y();
  if (n === null)
    return ngDevMode && rM(zr), ke(e, t);
  const r = J(), o = SD(r, n, x(e), t);
  return ngDevMode && hy(e, o, t), o;
}
i(zr, "ɵɵdirectiveInject");
function Jv() {
  const e = ngDevMode ? "This constructor was not compatible with Dependency Injection." : "invalid";
  throw new Error(e);
}
i(Jv, "ɵɵinvalidFactory");
function Xv(e, t, n, r, o, s) {
  const a = B(null);
  try {
    let u = null;
    o & Dn.SignalBased && (u = t[r][pt]), u !== null && u.transformFn !== void 0 && (s = u.transformFn(s)), o & Dn.HasDecoratorInputTransform && (s = e.inputTransforms[r].call(t, s)), e.setInput !== null ? e.setInput(t, u, s, n, r) : Wy(t, u, r, s);
  } finally {
    B(a);
  }
}
i(Xv, "writeToDirectiveInput");
function OT(e, t) {
  const n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        const o = n[r];
        if (o < 0)
          Dr(~o);
        else {
          const s = o, a = n[++r], u = n[++r];
          c_(a, s);
          const c = t[s];
          u(2, c);
        }
      }
    } finally {
      Dr(-1);
    }
}
i(OT, "processHostBindingOpCodes");
function Bu(e, t, n, r, o, s, a, u, c, l, d) {
  const f = t.blueprint.slice();
  return f[fe] = o, f[S] = r | 4 | 128 | 8 | 64, (l !== null || e && e[S] & 2048) && (f[S] |= 2048), eD(f), ngDevMode && t.declTNode && e && Ke(t.declTNode, e), f[Ee] = f[Yn] = e, f[se] = n, f[bt] = a || e && e[bt], ngDevMode && b(f[bt], "LViewEnvironment is required"), f[N] = u || e && e[N], ngDevMode && b(f[N], "Renderer is required"), f[Se] = c || e && e[Se] || null, f[Be] = s, f[pr] = q_(), f[mt] = d, f[jy] = l, ngDevMode && O(t.type == 2 ? e !== null : !0, !0, "Embedded views must have parentLView"), f[ve] = t.type == 2 ? e[ve] : f, f;
}
i(Bu, "createLView");
function Qo(e, t, n, r, o) {
  ngDevMode && t !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
  // `view_engine_compatibility` for additional context.
  wn(t, A, "TNodes can't be in the LView header."), ngDevMode && I_(n);
  let s = e.data[t];
  if (s === null)
    s = Of(e, t, n, r, o), u_() && (s.flags |= 32);
  else if (s.type & 64) {
    s.type = n, s.value = r, s.attrs = o;
    const a = Bi();
    s.injectorIndex = a === null ? -1 : a.injectorIndex, ngDevMode && $o(s, e), ngDevMode && O(t, s.index, "Expecting same index");
  }
  return en(s, !0), s;
}
i(Qo, "getOrCreateTNode");
function Of(e, t, n, r, o) {
  const s = uD(), a = Zd(), u = a ? s : s && s.parent, c = e.data[t] = LT(e, u, n, t, r, o);
  return e.firstChild === null && (e.firstChild = c), s !== null && (a ? s.child == null && c.parent !== null && (s.child = c) : s.next === null && (s.next = c, c.prev = s)), c;
}
i(Of, "createTNodeAtIndex");
function _s(e, t, n, r) {
  if (n === 0)
    return -1;
  ngDevMode && (st(e), ly(e, t[E], "`LView` must be associated with `TView`!"), O(e.data.length, t.length, "Expecting LView to be same size as TView"), O(e.data.length, e.blueprint.length, "Expecting Blueprint to be same size as TView"), Ud(e));
  const o = t.length;
  for (let s = 0; s < n; s++)
    t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
i(_s, "allocExpando");
function eI(e, t, n, r, o) {
  const s = Ve(), a = r & 2;
  try {
    Dr(-1), a && t.length > A && Kv(e, t, A, !!ngDevMode && Br()), Gt(a ? 2 : 0, o), n(r, o);
  } finally {
    Dr(s), Gt(a ? 3 : 1, o);
  }
}
i(eI, "executeTemplate");
function Ff(e, t, n) {
  if (Bd(t)) {
    const r = B(null);
    try {
      const o = t.directiveStart, s = t.directiveEnd;
      for (let a = o; a < s; a++) {
        const u = e.data[a];
        if (u.contentQueries) {
          const c = n[a];
          ngDevMode && b(a, "Incorrect reference to a directive defining a content query"), u.contentQueries(1, c, a);
        }
      }
    } finally {
      B(r);
    }
  }
}
i(Ff, "executeContentQueries");
function Nf(e, t, n) {
  rD() && (zT(e, t, n, He(n, t)), (n.flags & 64) === 64 && iI(e, t, n));
}
i(Nf, "createDirectivesInstances");
function kf(e, t, n = He) {
  const r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let s = 0; s < r.length; s += 2) {
      const a = r[s + 1], u = a === -1 ? n(t, e) : e[a];
      e[o++] = u;
    }
  }
}
i(kf, "saveResolvedLocalsInData");
function tI(e) {
  const t = e.tView;
  return t === null || t.incompleteFirstPass ? e.tView = Rf(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t;
}
i(tI, "getOrCreateComponentTView");
function Rf(e, t, n, r, o, s, a, u, c, l, d) {
  ngDevMode && ngDevMode.tView++;
  const f = A + r, h = f + o, p = FT(f, h), g = typeof l == "function" ? l() : l, m = p[E] = {
    type: e,
    blueprint: p,
    template: n,
    queries: null,
    viewQuery: u,
    declTNode: t,
    data: p.slice().fill(null, f),
    bindingStartIndex: f,
    expandoStartIndex: h,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof s == "function" ? s() : s,
    pipeRegistry: typeof a == "function" ? a() : a,
    firstChild: null,
    schemas: c,
    consts: g,
    incompleteFirstPass: !1,
    ssrId: d
  };
  return ngDevMode && Object.seal(m), m;
}
i(Rf, "createTView");
function FT(e, t) {
  const n = [];
  for (let r = 0; r < t; r++)
    n.push(r < e ? null : F);
  return n;
}
i(FT, "createViewBlueprint");
function NT(e, t, n, r) {
  const s = r.get(lv, cv) || n === yn.ShadowDom, a = e.selectRootElement(t, s);
  return kT(a), a;
}
i(NT, "locateHostElement");
function kT(e) {
  nI(e);
}
i(kT, "applyRootElementTransform");
let nI = /* @__PURE__ */ i(() => null, "_applyRootElementTransformImpl");
function RT(e) {
  LD(e) ? Wv(e) : IS(e);
}
i(RT, "applyRootElementTransformImpl");
function xT() {
  nI = RT;
}
i(xT, "enableApplyRootElementTransformImpl");
function PT(e, t, n, r) {
  const o = uI(t);
  ngDevMode && b(n, "Cleanup context is mandatory when registering framework-level destroy hooks"), o.push(n), e.firstCreatePass ? zl(e).push(r, o.length - 1) : ngDevMode && Object.freeze(zl(e));
}
i(PT, "storeCleanupWithContext");
function LT(e, t, n, r, o, s) {
  ngDevMode && r !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
  // `view_engine_compatibility` for additional context.
  wn(r, A, "TNodes can't be in the LView header."), ngDevMode && $r(s, void 0, "'undefined' is not valid value for 'attrs'"), ngDevMode && ngDevMode.tNode++, ngDevMode && t && $o(t, e);
  let a = t ? t.injectorIndex : -1, u = 0;
  Ho() && (u |= 128);
  const c = {
    type: n,
    index: r,
    insertBeforeIndex: null,
    injectorIndex: a,
    directiveStart: -1,
    directiveEnd: -1,
    directiveStylingLast: -1,
    componentOffset: -1,
    propertyBindings: null,
    flags: u,
    providerIndexes: 0,
    value: o,
    attrs: s,
    mergedAttrs: null,
    localNames: null,
    initialInputs: void 0,
    inputs: null,
    outputs: null,
    tView: null,
    next: null,
    prev: null,
    projectionNext: null,
    child: null,
    parent: t,
    projection: null,
    styles: null,
    stylesWithoutHost: null,
    residualStyles: void 0,
    classes: null,
    classesWithoutHost: null,
    residualClasses: void 0,
    classBindings: 0,
    styleBindings: 0
  };
  return ngDevMode && Object.seal(c), c;
}
i(LT, "createTNode");
function yg(e, t, n, r, o) {
  for (let s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const a = t[s];
    if (a === void 0)
      continue;
    r ??= {};
    let u, c = Dn.None;
    Array.isArray(a) ? (u = a[0], c = a[1]) : u = a;
    let l = s;
    if (o !== null) {
      if (!o.hasOwnProperty(s))
        continue;
      l = o[s];
    }
    e === 0 ? Dg(r, n, l, u, c) : Dg(r, n, l, u);
  }
  return r;
}
i(yg, "captureNodeBindings");
function Dg(e, t, n, r, o) {
  let s;
  e.hasOwnProperty(n) ? (s = e[n]).push(t, r) : s = e[n] = [t, r], o !== void 0 && s.push(o);
}
i(Dg, "addPropertyBinding");
function jT(e, t, n) {
  ngDevMode && st(e);
  const r = t.directiveStart, o = t.directiveEnd, s = e.data, a = t.attrs, u = [];
  let c = null, l = null;
  for (let d = r; d < o; d++) {
    const f = s[d], h = n ? n.get(f) : null, p = h ? h.inputs : null, g = h ? h.outputs : null;
    c = yg(0, f.inputs, d, c, p), l = yg(1, f.outputs, d, l, g);
    const m = c !== null && a !== null && !kd(t) ? XT(c, d, a) : null;
    u.push(m);
  }
  c !== null && (c.hasOwnProperty("class") && (t.flags |= 8), c.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = u, t.inputs = c, t.outputs = l;
}
i(jT, "initializeInputAndOutputAliases");
function $T(e) {
  return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e;
}
i($T, "mapPropName");
function at(e, t, n, r, o, s, a, u) {
  ngDevMode && $r(o, F, "Incoming value should never be NO_CHANGE.");
  const c = He(t, n);
  let l = t.inputs, d;
  !u && l != null && (d = l[r]) ? (Lf(e, n, d, r, o), nr(t) && BT(n, t.index), ngDevMode && HT(n, c, t.type, d, o)) : t.type & 3 ? (r = $T(r), ngDevMode && (XS(r), hT(c, r, t.value, e.schemas) || dg(r, t.value, t.type, n), ngDevMode.rendererSetProperty++), o = a != null ? a(o, t.value || "", r) : o, s.setProperty(c, r, o)) : t.type & 12 && ngDevMode && !bf(e.schemas, t.value) && dg(r, t.value, t.type, n);
}
i(at, "elementPropertyInternal");
function BT(e, t) {
  ngDevMode && nn(e);
  const n = yt(t, e);
  n[S] & 16 || (n[S] |= 64);
}
i(BT, "markDirtyIfOnPush");
function rI(e, t, n, r, o) {
  const s = e[N];
  r = oT(r);
  const a = aT(o);
  if (n & 3)
    o == null ? s.removeAttribute(t, r) : s.setAttribute(t, r, a);
  else {
    const u = Sv(`bindings=${JSON.stringify({ [r]: a }, null, 2)}`);
    s.setValue(t, u);
  }
}
i(rI, "setNgReflectProperty");
function HT(e, t, n, r, o) {
  if (n & 7)
    for (let s = 0; s < r.length; s += 3)
      rI(e, t, n, r[s + 1], o);
}
i(HT, "setNgReflectProperties");
function xf(e, t, n, r) {
  if (ngDevMode && st(e), rD()) {
    const o = r === null ? null : { "": -1 }, s = WT(e, n);
    let a, u;
    s === null ? a = u = null : [a, u] = s, a !== null && oI(e, t, n, a, o, u), o && qT(n, r, o);
  }
  n.mergedAttrs = Pi(n.mergedAttrs, n.attrs);
}
i(xf, "resolveDirectives");
function oI(e, t, n, r, o, s) {
  ngDevMode && st(e);
  for (let l = 0; l < r.length; l++)
    _l(Ra(n, t), e, r[l].type);
  ZT(n, e.data.length, r.length);
  for (let l = 0; l < r.length; l++) {
    const d = r[l];
    d.providersResolver && d.providersResolver(d);
  }
  let a = !1, u = !1, c = _s(e, t, r.length, null);
  ngDevMode && ly(c, n.directiveStart, "TNode.directiveStart should point to just allocated space");
  for (let l = 0; l < r.length; l++) {
    const d = r[l];
    n.mergedAttrs = Pi(n.mergedAttrs, d.hostAttrs), YT(e, n, t, c, d), QT(c, d, o), d.contentQueries !== null && (n.flags |= 4), (d.hostBindings !== null || d.hostAttrs !== null || d.hostVars !== 0) && (n.flags |= 64);
    const f = d.type.prototype;
    !a && (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), a = !0), !u && (f.ngOnChanges || f.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), u = !0), c++;
  }
  jT(e, n, s);
}
i(oI, "initializeDirectives");
function VT(e, t, n, r, o) {
  ngDevMode && st(e);
  const s = o.hostBindings;
  if (s) {
    let a = e.hostBindingOpCodes;
    a === null && (a = e.hostBindingOpCodes = []);
    const u = ~t.index;
    UT(a) != u && a.push(u), a.push(n, r, s);
  }
}
i(VT, "registerHostBindingOpCodes");
function UT(e) {
  let t = e.length;
  for (; t > 0; ) {
    const n = e[--t];
    if (typeof n == "number" && n < 0)
      return n;
  }
  return 0;
}
i(UT, "lastSelectedElementIdx");
function zT(e, t, n, r) {
  const o = n.directiveStart, s = n.directiveEnd;
  nr(n) && (ngDevMode && $e(
    n,
    3
    /* TNodeType.AnyRNode */
  ), KT(t, n, e.data[o + n.componentOffset])), e.firstCreatePass || Ra(n, t), Le(r, t);
  const a = n.initialInputs;
  for (let u = o; u < s; u++) {
    const c = e.data[u], l = vr(t, e, u, n);
    if (Le(l, t), a !== null && JT(t, u - o, l, c, n, a), wt(c)) {
      const d = yt(n.index, t);
      d[se] = vr(t, e, u, n);
    }
  }
}
i(zT, "instantiateAllDirectives");
function iI(e, t, n) {
  const r = n.directiveStart, o = n.directiveEnd, s = n.index, a = l_();
  try {
    Dr(s);
    for (let u = r; u < o; u++) {
      const c = e.data[u], l = t[u];
      bl(u), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && GT(c, l);
    }
  } finally {
    Dr(-1), bl(a);
  }
}
i(iI, "invokeDirectivesHostBindings");
function GT(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
i(GT, "invokeHostBindingsInCreationMode");
function WT(e, t) {
  ngDevMode && st(e), ngDevMode && $e(
    t,
    15
    /* TNodeType.AnyContainer */
  );
  const n = e.directiveRegistry;
  let r = null, o = null;
  if (n)
    for (let s = 0; s < n.length; s++) {
      const a = n[s];
      if (Ey(
        t,
        a.selectors,
        /* isProjectionMode */
        !1
      ))
        if (r || (r = []), wt(a))
          if (ngDevMode && ($e(t, 2, `"${t.value}" tags cannot be used as component hosts. Please use a different tag to activate the ${Z(a.type)} component.`), nr(t) && gT(t, r.find(wt).type, a.type)), a.findHostDirectiveDefs !== null) {
            const u = [];
            o = o || /* @__PURE__ */ new Map(), a.findHostDirectiveDefs(a, u, o), r.unshift(...u, a);
            const c = u.length;
            Vl(e, t, c);
          } else
            r.unshift(a), Vl(e, t, 0);
        else
          o = o || /* @__PURE__ */ new Map(), a.findHostDirectiveDefs?.(a, r, o), r.push(a);
    }
  return ngDevMode && r !== null && Uy(r), r === null ? null : [r, o];
}
i(WT, "findDirectiveDefMatches");
function Vl(e, t, n) {
  ngDevMode && st(e), ngDevMode && tr(n, -1, "componentOffset must be great than -1"), t.componentOffset = n, (e.components ??= []).push(t.index);
}
i(Vl, "markAsComponentHost");
function qT(e, t, n) {
  if (t) {
    const r = e.localNames = [];
    for (let o = 0; o < t.length; o += 2) {
      const s = n[t[o + 1]];
      if (s == null)
        throw new I(-301, ngDevMode && `Export of name '${t[o + 1]}' not found!`);
      r.push(t[o], s);
    }
  }
}
i(qT, "cacheMatchingLocalNames");
function QT(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++)
        n[t.exportAs[r]] = e;
    wt(t) && (n[""] = e);
  }
}
i(QT, "saveNameToExportMap");
function ZT(e, t, n) {
  ngDevMode && $t(n, e.directiveEnd - e.directiveStart, "Reached the max number of directives"), e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t;
}
i(ZT, "initTNodeFlags");
function YT(e, t, n, r, o) {
  ngDevMode && wn(r, A, "Must be in Expando section"), e.data[r] = o;
  const s = o.factory || (o.factory = lr(o.type, !0)), a = new Cs(s, wt(o), zr);
  e.blueprint[r] = a, n[r] = a, VT(e, t, r, _s(e, n, o.hostVars, F), o);
}
i(YT, "configureViewWithDirective");
function KT(e, t, n) {
  const r = He(t, e), o = tI(n), s = e[bt].rendererFactory;
  let a = 16;
  n.signals ? a = 4096 : n.onPush && (a = 64);
  const u = Hu(e, Bu(e, o, null, a, r, t, null, s.createRenderer(r, n), null, null, null));
  e[t.index] = u;
}
i(KT, "addComponentLogic");
function an(e, t, n, r, o, s) {
  ngDevMode && ($r(r, F, "Incoming value should never be NO_CHANGE."), eT(n), $e(e, 2, `Attempted to set attribute \`${n}\` on a container node. Host bindings are not valid on ng-container or ng-template.`));
  const a = He(e, t);
  Pf(t[N], a, s, e.value, n, r, o);
}
i(an, "elementAttributeInternal");
function Pf(e, t, n, r, o, s, a) {
  if (s == null)
    ngDevMode && ngDevMode.rendererRemoveAttribute++, e.removeAttribute(t, o, n);
  else {
    ngDevMode && ngDevMode.rendererSetAttribute++;
    const u = a == null ? j(s) : a(s, r || "", o);
    e.setAttribute(t, o, u, n);
  }
}
i(Pf, "setElementAttribute");
function JT(e, t, n, r, o, s) {
  const a = s[t];
  if (a !== null)
    for (let u = 0; u < a.length; ) {
      const c = a[u++], l = a[u++], d = a[u++], f = a[u++];
      if (Xv(r, n, c, l, d, f), ngDevMode) {
        const h = He(o, e);
        rI(e, h, o.type, l, f);
      }
    }
}
i(JT, "setInputsFromAttrs");
function XT(e, t, n) {
  let r = null, o = 0;
  for (; o < n.length; ) {
    const s = n[o];
    if (s === 0) {
      o += 4;
      continue;
    } else if (s === 5) {
      o += 2;
      continue;
    }
    if (typeof s == "number")
      break;
    if (e.hasOwnProperty(s)) {
      r === null && (r = []);
      const a = e[s];
      for (let u = 0; u < a.length; u += 3)
        if (a[u] === t) {
          r.push(s, a[u + 1], a[u + 2], n[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return r;
}
i(XT, "generateInitialInputs");
function sI(e, t, n, r) {
  ngDevMode && nn(t);
  const o = [
    e,
    // host native
    !0,
    // Boolean `true` in this position signifies that this is an `LContainer`
    0,
    // flags
    t,
    // parent
    null,
    // next
    r,
    // t_host
    null,
    // dehydrated views
    n,
    // native,
    null,
    // view refs
    null
    // moved views
  ];
  return ngDevMode && O(o.length, me, "Should allocate correct number of slots for LContainer header."), o;
}
i(sI, "createLContainer");
function aI(e, t) {
  const n = e.contentQueries;
  if (n !== null) {
    const r = B(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        const s = n[o], a = n[o + 1];
        if (a !== -1) {
          const u = e.data[a];
          ngDevMode && b(u, "DirectiveDef not found."), ngDevMode && b(u.contentQueries, "contentQueries function should be defined"), bu(s), u.contentQueries(2, t[a], a);
        }
      }
    } finally {
      B(r);
    }
  }
}
i(aI, "refreshContentQueries");
function Hu(e, t) {
  return e[Li] ? e[Zp][kt] = t : e[Li] = t, e[Zp] = t, t;
}
i(Hu, "addToViewTree");
function Ul(e, t, n) {
  ngDevMode && b(t, "View queries function to execute must be defined."), bu(0);
  const r = B(null);
  try {
    t(e, n);
  } finally {
    B(r);
  }
}
i(Ul, "executeViewQueryFn");
function Ie(e, t, n, r, ...o) {
  if (e[r] === null && (t.inputs == null || !t.inputs[n])) {
    (t.propertyBindings || (t.propertyBindings = [])).push(r);
    let a = n;
    o.length > 0 && (a += Co + o.join(Co)), e[r] = a;
  }
}
i(Ie, "storePropertyBindingMetadata");
function uI(e) {
  return e[yo] || (e[yo] = []);
}
i(uI, "getOrCreateLViewCleanup");
function zl(e) {
  return e.cleanup || (e.cleanup = []);
}
i(zl, "getOrCreateTViewCleanup");
function cI(e, t, n) {
  return (e === null || wt(e)) && (n = Gd(n[t.index])), n[N];
}
i(cI, "loadComponentRenderer");
function Vu(e, t) {
  const n = e[Se], r = n ? n.get(_n, null) : null;
  r && r.handleError(t);
}
i(Vu, "handleError");
function Lf(e, t, n, r, o) {
  for (let s = 0; s < n.length; ) {
    const a = n[s++], u = n[s++], c = n[s++], l = t[a];
    ngDevMode && be(t, a);
    const d = e.data[a];
    Xv(d, l, r, u, c, o);
  }
}
i(Lf, "setInputsForProperty");
function Tn(e, t, n) {
  ngDevMode && Po(n, "Value should be a string"), ngDevMode && $r(n, F, "value should not be NO_CHANGE"), ngDevMode && be(e, t);
  const r = ys(t, e);
  ngDevMode && b(r, "native element should exist"), Rv(e[N], r, n);
}
i(Tn, "textBindingInternal");
function eA(e, t) {
  ngDevMode && O(vs(e), !0, "Should be run in creation mode");
  const n = yt(t, e), r = n[E];
  tA(r, n);
  const o = n[fe];
  o !== null && n[mt] === null && (n[mt] = pf(o, n[Se])), Uu(r, n, n[se]);
}
i(eA, "renderComponent");
function tA(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++)
    t.push(e.blueprint[n]);
}
i(tA, "syncViewWithBlueprint");
function Uu(e, t, n) {
  ngDevMode && O(vs(t), !0, "Should be run in creation mode"), ngDevMode && wd(Uu.name), Xd(t);
  try {
    const r = e.viewQuery;
    r !== null && Ul(1, r, n);
    const o = e.template;
    o !== null && eI(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[Rt]?.finishViewCreation(e), e.staticContentQueries && aI(e, t), e.staticViewQueries && Ul(2, e.viewQuery, n);
    const s = e.components;
    s !== null && nA(t, s);
  } catch (r) {
    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r;
  } finally {
    t[S] &= -5, ef();
  }
}
i(Uu, "renderView");
function nA(e, t) {
  for (let n = 0; n < t.length; n++)
    eA(e, t[n]);
}
i(nA, "renderChildComponents");
function Ss(e, t, n, r) {
  const o = B(null);
  try {
    const s = t.tView;
    ngDevMode && b(s, "TView must be defined for a template node."), ngDevMode && Ke(t, e);
    const u = e[S] & 4096 ? 4096 : 16, c = Bu(e, s, n, u, null, t, null, null, r?.injector ?? null, r?.embeddedViewInjector ?? null, r?.dehydratedView ?? null), l = e[t.index];
    ngDevMode && it(l), c[gs] = l;
    const d = e[Rt];
    return d !== null && (c[Rt] = d.createEmbeddedView(s)), Uu(s, c, n), c;
  } finally {
    B(o);
  }
}
i(Ss, "createAndRenderEmbeddedLView");
function lI(e, t) {
  const n = me + t;
  if (n < e.length) {
    const r = e[n];
    return ngDevMode && nn(r), r;
  }
}
i(lI, "getLViewFromLContainer");
function bo(e, t) {
  return !t || t.firstChild === null || xa(e);
}
i(bo, "shouldAddViewToDom");
function Ts(e, t, n, r = !0) {
  const o = t[E];
  if (ET(o, t, e, n), r) {
    const a = Hl(n, e), u = t[N], c = Lu(u, e[Jt]);
    c !== null && IT(o, e[Be], u, t, c, a);
  }
  const s = t[mt];
  s !== null && s.firstChild !== null && (s.firstChild = null);
}
i(Ts, "addLViewToLContainer");
function jf(e, t) {
  const n = Wi(e, t);
  return n !== void 0 && Pu(n[E], n), n;
}
i(jf, "removeLViewFromLContainer");
function qi(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    ngDevMode && $e(
      n,
      63
      /* TNodeType.Icu */
    );
    const s = t[n.index];
    s !== null && r.push(oe(s)), Re(s) && dI(s, r);
    const a = n.type;
    if (a & 8)
      qi(e, t, n.child, r);
    else if (a & 32) {
      const u = Mf(n, t);
      let c;
      for (; c = u(); )
        r.push(c);
    } else if (a & 16) {
      const u = Gv(t, n);
      if (Array.isArray(u))
        r.push(...u);
      else {
        const c = yr(t[ve]);
        ngDevMode && Vy(c), qi(c[E], c, u, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
i(qi, "collectNativeNodes");
function dI(e, t) {
  for (let n = me; n < e.length; n++) {
    const r = e[n], o = r[E].firstChild;
    o !== null && qi(r[E], r, o, t);
  }
  e[Jt] !== e[fe] && t.push(e[Jt]);
}
i(dI, "collectNativeNodesInLContainer");
let fI = [];
function rA(e) {
  return e[gr] ?? oA(e);
}
i(rA, "getOrBorrowReactiveLViewConsumer");
function oA(e) {
  const t = fI.pop() ?? Object.create(sA);
  return t.lView = e, t;
}
i(oA, "borrowReactiveLViewConsumer");
function iA(e) {
  e.lView[gr] !== e && (e.lView = null, fI.push(e));
}
i(iA, "maybeReturnReactiveLViewConsumer");
const sA = {
  ...au,
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: /* @__PURE__ */ i((e) => {
    $i(e.lView);
  }, "consumerMarkedDirty"),
  consumerOnSignalRead() {
    this.lView[gr] = this;
  }
}, hI = 100;
function zu(e, t = !0, n = 0) {
  const r = e[bt], o = r.rendererFactory, s = !!ngDevMode && Br();
  s || o.begin?.();
  try {
    aA(e, n);
  } catch (a) {
    throw t && Vu(e, a), a;
  } finally {
    s || (o.end?.(), r.inlineEffectRunner?.flush());
  }
}
i(zu, "detectChangesInternal");
function aA(e, t) {
  Gl(e, t);
  let n = 0;
  for (; qd(e); ) {
    if (n === hI)
      throw new I(103, ngDevMode && "Infinite change detection while trying to refresh views. There may be components which each cause the other to require a refresh, causing an infinite loop.");
    n++, Gl(
      e,
      1
      /* ChangeDetectionMode.Targeted */
    );
  }
}
i(aA, "detectChangesInViewWhileDirty");
function uA(e, t = !0) {
  Yp(!0);
  try {
    zu(e, t);
  } finally {
    Yp(!1);
  }
}
i(uA, "checkNoChangesInternal");
function cA(e, t, n, r) {
  ngDevMode && O(vs(t), !1, "Should be run in update mode");
  const o = t[S];
  if ((o & 256) === 256)
    return;
  const s = ngDevMode && Br();
  !s && t[bt].inlineEffectRunner?.flush(), Xd(t);
  let a = null, u = null;
  !s && lA(e) && (u = rA(t), a = yd(u));
  try {
    eD(t), cD(e.bindingStartIndex), n !== null && eI(e, t, n, 2, r);
    const c = (o & 3) === 3;
    if (!s)
      if (c) {
        const f = e.preOrderCheckHooks;
        f !== null && ha(t, f, null);
      } else {
        const f = e.preOrderHooks;
        f !== null && pa(t, f, 0, null), Sc(
          t,
          0
          /* InitPhaseState.OnInitHooksToBeRun */
        );
      }
    if (dA(t), pI(
      t,
      0
      /* ChangeDetectionMode.Global */
    ), e.contentQueries !== null && aI(e, t), !s)
      if (c) {
        const f = e.contentCheckHooks;
        f !== null && ha(t, f);
      } else {
        const f = e.contentHooks;
        f !== null && pa(
          t,
          f,
          1
          /* InitPhaseState.AfterContentInitHooksToBeRun */
        ), Sc(
          t,
          1
          /* InitPhaseState.AfterContentInitHooksToBeRun */
        );
      }
    OT(e, t);
    const l = e.components;
    l !== null && mI(
      t,
      l,
      0
      /* ChangeDetectionMode.Global */
    );
    const d = e.viewQuery;
    if (d !== null && Ul(2, d, r), !s)
      if (c) {
        const f = e.viewCheckHooks;
        f !== null && ha(t, f);
      } else {
        const f = e.viewHooks;
        f !== null && pa(
          t,
          f,
          2
          /* InitPhaseState.AfterViewInitHooksToBeRun */
        ), Sc(
          t,
          2
          /* InitPhaseState.AfterViewInitHooksToBeRun */
        );
      }
    if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[fa]) {
      for (const f of t[fa])
        f();
      t[fa] = null;
    }
    s || (t[S] &= -73);
  } catch (c) {
    throw $i(t), c;
  } finally {
    u !== null && (Dd(u, a), iA(u)), ef();
  }
}
i(cA, "refreshView");
function lA(e) {
  return e.type !== 2;
}
i(lA, "viewShouldHaveReactiveConsumer");
function pI(e, t) {
  for (let n = GD(e); n !== null; n = WD(n))
    for (let r = me; r < n.length; r++) {
      const o = n[r];
      gI(o, t);
    }
}
i(pI, "detectChangesInEmbeddedViews");
function dA(e) {
  for (let t = GD(e); t !== null; t = WD(t)) {
    if (!(t[S] & Fa.HasTransplantedViews))
      continue;
    const n = t[mr];
    ngDevMode && b(n, "Transplanted View flags set but missing MOVED_VIEWS");
    for (let r = 0; r < n.length; r++) {
      const o = n[r], s = o[Ee];
      ngDevMode && it(s), e_(o);
    }
  }
}
i(dA, "markTransplantedViewsForRefresh");
function fA(e, t, n) {
  ngDevMode && O(vs(e), !1, "Should be run in update mode");
  const r = yt(t, e);
  gI(r, n);
}
i(fA, "detectChangesInComponent");
function gI(e, t) {
  Wd(e) && Gl(e, t);
}
i(gI, "detectChangesInViewIfAttached");
function Gl(e, t) {
  const n = ngDevMode && Br(), r = e[E], o = e[S], s = e[gr];
  let a = !!(t === 0 && o & 16);
  if (a ||= !!(o & 64 && t === 0 && !n), a ||= !!(o & 1024), a ||= !!(s?.dirty && vd(s)), s && (s.dirty = !1), e[S] &= -9217, a)
    cA(r, e, r.template, e[se]);
  else if (o & 8192) {
    pI(
      e,
      1
      /* ChangeDetectionMode.Targeted */
    );
    const u = r.components;
    u !== null && mI(
      e,
      u,
      1
      /* ChangeDetectionMode.Targeted */
    );
  }
}
i(Gl, "detectChangesInView$1");
function mI(e, t, n) {
  for (let r = 0; r < t.length; r++)
    fA(e, t[r], n);
}
i(mI, "detectChangesInChildComponents");
function As(e) {
  for (e[bt].changeDetectionScheduler?.notify(); e; ) {
    e[S] |= 64;
    const t = yr(e);
    if (Hd(e) && !t)
      return e;
    e = t;
  }
  return null;
}
i(As, "markViewDirty");
class wo {
  static {
    i(this, "ViewRef$1");
  }
  get rootNodes() {
    const t = this._lView, n = t[E];
    return qi(n, t, n.firstChild, []);
  }
  constructor(t, n, r = !0) {
    this._lView = t, this._cdRefInjectingView = n, this.notifyErrorHandler = r, this._appRef = null, this._attachedToViewContainer = !1;
  }
  get context() {
    return this._lView[se];
  }
  /**
   * @deprecated Replacing the full context object is not supported. Modify the context
   *   directly, or consider using a `Proxy` if you need to replace the full object.
   * // TODO(devversion): Remove this.
   */
  set context(t) {
    ngDevMode && console.warn("Angular: Replacing the `context` object of an `EmbeddedViewRef` is deprecated."), this._lView[se] = t;
  }
  get destroyed() {
    return (this._lView[S] & 256) === 256;
  }
  destroy() {
    if (this._appRef)
      this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      const t = this._lView[Ee];
      if (Re(t)) {
        const n = t[Oa], r = n ? n.indexOf(this) : -1;
        r > -1 && (ngDevMode && O(r, t.indexOf(this._lView) - me, "An attached view should be in the same position within its container as its ViewRef in the VIEW_REFS array."), Wi(t, r), Sa(n, r));
      }
      this._attachedToViewContainer = !1;
    }
    Pu(this._lView[E], this._lView);
  }
  onDestroy(t) {
    Eu(this._lView, t);
  }
  /**
   * Marks a view and all of its ancestors dirty.
   *
   * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush} component is
   * checked when it needs to be re-rendered but the two normal triggers haven't marked it
   * dirty (i.e. inputs haven't changed and events haven't fired in the view).
   *
   * <!-- TODO: Add a link to a chapter on OnPush components -->
   *
   * @usageNotes
   * ### Example
   *
   * ```typescript
   * @Component({
   *   selector: 'app-root',
   *   template: `Number of ticks: {{numberOfTicks}}`
   *   changeDetection: ChangeDetectionStrategy.OnPush,
   * })
   * class AppComponent {
   *   numberOfTicks = 0;
   *
   *   constructor(private ref: ChangeDetectorRef) {
   *     setInterval(() => {
   *       this.numberOfTicks++;
   *       // the following is required, otherwise the view will not be updated
   *       this.ref.markForCheck();
   *     }, 1000);
   *   }
   * }
   * ```
   */
  markForCheck() {
    As(this._cdRefInjectingView || this._lView);
  }
  /**
   * Detaches the view from the change detection tree.
   *
   * Detached views will not be checked during change detection runs until they are
   * re-attached, even if they are dirty. `detach` can be used in combination with
   * {@link ChangeDetectorRef#detectChanges} to implement local change
   * detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds. We can do that by detaching
   * the component's change detector and doing a local check every five seconds.
   *
   * ```typescript
   * class DataProvider {
   *   // in a real application the returned data will be different every time
   *   get data() {
   *     return [1,2,3,4,5];
   *   }
   * }
   *
   * @Component({
   *   selector: 'giant-list',
   *   template: `
   *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
   *   `,
   * })
   * class GiantList {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
   *     ref.detach();
   *     setInterval(() => {
   *       this.ref.detectChanges();
   *     }, 5000);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   providers: [DataProvider],
   *   template: `
   *     <giant-list><giant-list>
   *   `,
   * })
   * class App {
   * }
   * ```
   */
  detach() {
    this._lView[S] &= -129;
  }
  /**
   * Re-attaches a view to the change detection tree.
   *
   * This can be used to re-attach views that were previously detached from the tree
   * using {@link ChangeDetectorRef#detach}. Views are attached to the tree by default.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example creates a component displaying `live` data. The component will detach
   * its change detector from the main change detector tree when the component's live property
   * is set to false.
   *
   * ```typescript
   * class DataProvider {
   *   data = 1;
   *
   *   constructor() {
   *     setInterval(() => {
   *       this.data = this.data * 2;
   *     }, 500);
   *   }
   * }
   *
   * @Component({
   *   selector: 'live-data',
   *   inputs: ['live'],
   *   template: 'Data: {{dataProvider.data}}'
   * })
   * class LiveData {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
   *
   *   set live(value) {
   *     if (value) {
   *       this.ref.reattach();
   *     } else {
   *       this.ref.detach();
   *     }
   *   }
   * }
   *
   * @Component({
   *   selector: 'app-root',
   *   providers: [DataProvider],
   *   template: `
   *     Live Update: <input type="checkbox" [(ngModel)]="live">
   *     <live-data [live]="live"><live-data>
   *   `,
   * })
   * class AppComponent {
   *   live = true;
   * }
   * ```
   */
  reattach() {
    El(this._lView), this._lView[S] |= 128;
  }
  /**
   * Checks the view and its children.
   *
   * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement
   * local change detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine, the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds.
   *
   * We can do that by detaching the component's change detector and doing a local change detection
   * check every five seconds.
   *
   * See {@link ChangeDetectorRef#detach} for more information.
   */
  detectChanges() {
    this._lView[S] |= 1024, zu(this._lView, this.notifyErrorHandler);
  }
  /**
   * Checks the change detector and its children, and throws if any changes are detected.
   *
   * This is used in development mode to verify that running change detection doesn't
   * introduce other changes.
   */
  checkNoChanges() {
    ngDevMode && uA(this._lView, this.notifyErrorHandler);
  }
  attachToViewContainerRef() {
    if (this._appRef)
      throw new I(902, ngDevMode && "This view is already attached directly to the ApplicationRef!");
    this._attachedToViewContainer = !0;
  }
  detachFromAppRef() {
    this._appRef = null, xv(this._lView[E], this._lView);
  }
  attachToAppRef(t) {
    if (this._attachedToViewContainer)
      throw new I(902, ngDevMode && "This view is already attached to a ViewContainer!");
    this._appRef = t, El(this._lView);
  }
}
class Ze {
  static {
    i(this, "TemplateRef");
  }
  static {
    this.__NG_ELEMENT_ID__ = gA;
  }
}
const hA = Ze, pA = class extends hA {
  static {
    i(this, "TemplateRef");
  }
  constructor(t, n, r) {
    super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r;
  }
  /**
   * Returns an `ssrId` associated with a TView, which was used to
   * create this instance of the `TemplateRef`.
   *
   * @internal
   */
  get ssrId() {
    return this._declarationTContainer.tView?.ssrId || null;
  }
  createEmbeddedView(t, n) {
    return this.createEmbeddedViewImpl(t, n);
  }
  /**
   * @internal
   */
  createEmbeddedViewImpl(t, n, r) {
    const o = Ss(this._declarationLView, this._declarationTContainer, t, { embeddedViewInjector: n, dehydratedView: r });
    return new wo(o);
  }
};
function gA() {
  return Gu(J(), y());
}
i(gA, "injectTemplateRef");
function Gu(e, t) {
  return e.type & 4 ? (ngDevMode && b(e.tView, "TView must be allocated"), new pA(t, e, zo(e, t))) : null;
}
i(Gu, "createTemplateRef");
const Wl = "<-- AT THIS LOCATION";
function mA(e) {
  switch (e) {
    case 4:
      return "view container";
    case 2:
      return "element";
    case 8:
      return "ng-container";
    case 32:
      return "icu";
    case 64:
      return "i18n";
    case 16:
      return "projection";
    case 1:
      return "text";
    default:
      return "<unknown>";
  }
}
i(mA, "getFriendlyStringFromTNodeType");
function Os(e, t, n, r, o, s = !1) {
  if (!e || e.nodeType !== t || e.nodeType === Node.ELEMENT_NODE && e.tagName.toLowerCase() !== n?.toLowerCase()) {
    let u = `During hydration Angular expected ${Ig(t, n, null)} but `;
    const l = Nu(r)?.type?.name, d = $f(r, o, s), f = `Angular expected this DOM:

${d}

`;
    let h = "";
    const p = oe(r[fe]);
    if (!e)
      u += `the node was not found.

`, Gi(p, d);
    else {
      const v = Ig(e.nodeType, e.tagName ?? null, e.textContent ?? null);
      u += `found ${v}.

`;
      const C = qu(e);
      h = `Actual DOM is:

${C}

`, Gi(p, d, C);
    }
    const g = Fs(l), m = u + f + h + DI() + g;
    throw new I(-500, m);
  }
}
i(Os, "validateMatchingNode");
function yI(e) {
  if (Wu(e), !e.nextSibling) {
    const t = `During hydration Angular expected more sibling nodes to be present.

`, n = `Actual DOM is:

${qu(e)}

`, r = Fs(), o = t + n + r;
    throw Gi(e, "", n), new I(-501, o);
  }
}
i(yI, "validateSiblingNodeExists");
function Wu(e, t = null, n = null) {
  if (!e) {
    const r = `During hydration, Angular expected an element to be present at this location.

`;
    let o = "", s = "";
    throw t !== null && n !== null && (o = $f(t, n, !1), s = Fs(), Gi(oe(t[fe]), o, "")), new I(-502, `${r}${o}

${s}`);
  }
}
i(Wu, "validateNodeExists");
function yA(e, t) {
  const n = `During serialization, Angular was unable to find an element in the DOM:

`, r = `${$f(e, t, !1)}

`, o = Fs();
  throw new I(-502, n + r + o);
}
i(yA, "nodeNotFoundError");
function vg(e, t) {
  const n = `During hydration Angular was unable to locate a node using the "${t}" path, starting from the ${Ci(e)} node.

`, r = Fs();
  throw Gi(e), new I(-502, n + r);
}
i(vg, "nodeNotFoundAtPathError");
function DA(e) {
  const t = "During serialization, Angular detected DOM nodes that were created outside of Angular context and provided as projectable nodes (likely via `ViewContainerRef.createComponent` or `createComponent` APIs). Hydration is not supported for such cases, consider refactoring the code to avoid this pattern or using `ngSkipHydration` on the host element of the component.\n\n", n = `${qu(e)}

`, r = t + n + DI();
  return new I(-503, r);
}
i(DA, "unsupportedProjectionOfDomNodes");
function vA(e) {
  const t = "The `ngSkipHydration` flag is applied on a node that doesn't act as a component host. Hydration can be skipped only on per-component basis.\n\n", n = `${qu(e)}

`, o = t + n + "Please move the `ngSkipHydration` attribute to the component host element.\n\n";
  return new I(-504, o);
}
i(vA, "invalidSkipHydrationHost");
function IA(e) {
  const t = [];
  if (e.attrs)
    for (let n = 0; n < e.attrs.length; ) {
      const r = e.attrs[n++];
      if (typeof r == "number")
        break;
      const o = e.attrs[n++];
      t.push(`${r}="${Qi(o)}"`);
    }
  return t.join(" ");
}
i(IA, "stringifyTNodeAttrs");
const CA = /* @__PURE__ */ new Set(["ngh", "ng-version", "ng-server-context"]);
function EA(e) {
  const t = [];
  for (let n = 0; n < e.attributes.length; n++) {
    const r = e.attributes[n];
    CA.has(r.name) || t.push(`${r.name}="${Qi(r.value)}"`);
  }
  return t.join(" ");
}
i(EA, "stringifyRNodeAttrs");
function Nc(e, t = "…") {
  switch (e.type) {
    case 1:
      return `#text${e.value ? `(${e.value})` : ""}`;
    case 2:
      const r = IA(e), o = e.value.toLowerCase();
      return `<${o}${r ? " " + r : ""}>${t}</${o}>`;
    case 8:
      return "<!-- ng-container -->";
    case 4:
      return "<!-- container -->";
    default:
      return `#node(${mA(e.type)})`;
  }
}
i(Nc, "describeTNode");
function Ci(e, t = "…") {
  const n = e;
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
      const r = n.tagName.toLowerCase(), o = EA(n);
      return `<${r}${o ? " " + o : ""}>${t}</${r}>`;
    case Node.TEXT_NODE:
      const s = n.textContent ? Qi(n.textContent) : "";
      return `#text${s ? `(${s})` : ""}`;
    case Node.COMMENT_NODE:
      return `<!-- ${Qi(n.textContent ?? "")} -->`;
    default:
      return `#node(${n.nodeType})`;
  }
}
i(Ci, "describeRNode");
function $f(e, t, n) {
  const r = "  ";
  let o = "";
  t.prev ? (o += r + `…
`, o += r + Nc(t.prev) + `
`) : t.type && t.type & 12 && (o += r + `…
`), n ? (o += r + Nc(t) + `
`, o += r + `<!-- container -->  ${Wl}
`) : o += r + Nc(t) + `  ${Wl}
`, o += r + `…
`;
  const s = t.type ? Tf(e[E], t, e) : null;
  return s && (o = Ci(s, `
` + o)), o;
}
i($f, "describeExpectedDom");
function qu(e) {
  const t = "  ";
  let n = "";
  const r = e;
  return r.previousSibling && (n += t + `…
`, n += t + Ci(r.previousSibling) + `
`), n += t + Ci(r) + `  ${Wl}
`, e.nextSibling && (n += t + `…
`), e.parentNode && (n = Ci(r.parentNode, `
` + n)), n;
}
i(qu, "describeDomFromNode");
function Ig(e, t, n) {
  switch (e) {
    case Node.ELEMENT_NODE:
      return `<${t.toLowerCase()}>`;
    case Node.TEXT_NODE:
      return `a text node${n ? ` (with the "${Qi(n)}" content)` : ""}`;
    case Node.COMMENT_NODE:
      return "a comment node";
    default:
      return `#node(nodeType=${e})`;
  }
}
i(Ig, "shortRNodeDescription");
function Fs(e) {
  return `To fix this problem:
  * check ${e ? `the "${e}"` : "corresponding"} component for hydration-related issues
  * check to see if your template has valid HTML structure
  * or skip hydration by adding the \`ngSkipHydration\` attribute to its host node in a template

`;
}
i(Fs, "getHydrationErrorFooter");
function DI() {
  return `Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

`;
}
i(DI, "getHydrationAttributeNote");
function bA(e) {
  return e.replace(/\s+/gm, "");
}
i(bA, "stripNewlines");
function Qi(e, t = 50) {
  return e ? (e = bA(e), e.length > t ? `${e.substring(0, t - 1)}…` : e) : "";
}
i(Qi, "shorten");
function vI(e) {
  const t = e[ji] ?? [], r = e[Ee][N];
  for (const o of t)
    wA(o, r), ngDevMode && ngDevMode.dehydratedViewsRemoved++;
  e[ji] = Q;
}
i(vI, "removeDehydratedViews");
function wA(e, t) {
  let n = 0, r = e.firstChild;
  if (r) {
    const o = e.data[vo];
    for (; n < o; ) {
      ngDevMode && yI(r);
      const s = r.nextSibling;
      Ms(t, r, !1), r = s, n++;
    }
  }
}
i(wA, "removeDehydratedView");
function II(e) {
  vI(e);
  for (let t = me; t < e.length; t++)
    $a(e[t]);
}
i(II, "cleanupLContainer");
function MA(e) {
  const t = e[mt]?.i18nNodes;
  if (t) {
    const n = e[N];
    for (const r of t.values())
      Ms(n, r, !1);
    e[mt].i18nNodes = void 0;
  }
}
i(MA, "cleanupDehydratedI18nNodes");
function $a(e) {
  MA(e);
  const t = e[E];
  for (let n = A; n < t.bindingStartIndex; n++)
    if (Re(e[n])) {
      const r = e[n];
      II(r);
    } else je(e[n]) && $a(e[n]);
}
i($a, "cleanupLView");
function _A(e) {
  const t = e._views;
  for (const n of t) {
    const r = iv(n);
    if (r !== null && r[fe] !== null) {
      if (je(r))
        $a(r);
      else {
        const o = r[fe];
        $a(o), II(r);
      }
      ngDevMode && ngDevMode.dehydratedViewsCleanupRuns++;
    }
  }
}
i(_A, "cleanupDehydratedViews");
const SA = new RegExp(`^(\\d+)*(${ff}|${df})*(.*)`);
function TA(e, t) {
  const n = [e];
  for (const r of t) {
    const o = n.length - 1;
    if (o > 0 && n[o - 1] === r) {
      const s = n[o] || 1;
      n[o] = s + 1;
    } else
      n.push(r, "");
  }
  return n.join("");
}
i(TA, "compressNodeLocation");
function AA(e) {
  const t = e.match(SA), [n, r, o, s] = t, a = r ? parseInt(r, 10) : o, u = [];
  for (const [c, l, d] of s.matchAll(/(f|n)(\d*)/g)) {
    const f = parseInt(d, 10) || 1;
    u.push(l, f);
  }
  return [a, ...u];
}
i(AA, "decompressNodeLocation");
function OA(e) {
  return !e.prev && e.parent?.type === 8;
}
i(OA, "isFirstElementInNgContainer");
function kc(e) {
  return e.index - A;
}
i(kc, "getNoOffsetIndex");
function Zi(e, t) {
  return !(e.type & 16) && !!t[e.index] && !oe(t[e.index])?.isConnected;
}
i(Zi, "isDisconnectedNode");
function FA(e, t) {
  const n = e.i18nNodes;
  if (n) {
    const r = n.get(t);
    return r && n.delete(t), r;
  }
  return null;
}
i(FA, "locateI18nRNodeByIndex");
function Qu(e, t, n, r) {
  const o = kc(r);
  let s = FA(e, o);
  if (!s) {
    const a = e.data[xl];
    if (a?.[o])
      s = kA(a[o], n);
    else if (t.firstChild === r)
      s = e.firstChild;
    else {
      const u = r.prev === null, c = r.prev ?? r.parent;
      if (ngDevMode && b(c, "Unexpected state: current TNode does not have a connection to the previous node or a parent node."), OA(r)) {
        const l = kc(r.parent);
        s = Pl(e, l);
      } else {
        let l = He(c, n);
        if (u)
          s = l.firstChild;
        else {
          const d = kc(c), f = Pl(e, d);
          if (c.type === 2 && f) {
            const p = mf(e, d) + 1;
            s = Zu(p, f);
          } else
            s = l.nextSibling;
        }
      }
    }
  }
  return s;
}
i(Qu, "locateNextRNode");
function Zu(e, t) {
  let n = t;
  for (let r = 0; r < e; r++)
    ngDevMode && yI(n), n = n.nextSibling;
  return n;
}
i(Zu, "siblingAfter");
function Cg(e) {
  const t = [];
  for (let n = 0; n < e.length; n += 2) {
    const r = e[n], o = e[n + 1];
    for (let s = 0; s < o; s++)
      t.push(r === Ir.FirstChild ? "firstChild" : "nextSibling");
  }
  return t.join(".");
}
i(Cg, "stringifyNavigationInstructions");
function NA(e, t) {
  let n = e;
  for (let r = 0; r < t.length; r += 2) {
    const o = t[r], s = t[r + 1];
    for (let a = 0; a < s; a++) {
      if (ngDevMode && !n)
        throw vg(e, Cg(t));
      switch (o) {
        case Ir.FirstChild:
          n = n.firstChild;
          break;
        case Ir.NextSibling:
          n = n.nextSibling;
          break;
      }
    }
  }
  if (ngDevMode && !n)
    throw vg(e, Cg(t));
  return n;
}
i(NA, "navigateToNode");
function kA(e, t) {
  const [n, ...r] = AA(e);
  let o;
  if (n === df)
    o = t[ve][fe];
  else if (n === ff)
    o = wf(t[ve][fe]);
  else {
    const s = Number(n);
    o = oe(t[s + A]);
  }
  return NA(o, r);
}
i(kA, "locateRNodeByPath");
function ql(e, t) {
  if (e === t)
    return [];
  if (e.parentElement == null || t.parentElement == null)
    return null;
  if (e.parentElement === t.parentElement)
    return RA(e, t);
  {
    const n = t.parentElement, r = ql(e, n), o = ql(n.firstChild, t);
    return !r || !o ? null : [
      // First navigate to `finish`'s parent
      ...r,
      // Then to its first child.
      Ir.FirstChild,
      // And finally from that node to `finish` (maybe a no-op if we're already there).
      ...o
    ];
  }
}
i(ql, "navigateBetween");
function RA(e, t) {
  const n = [];
  let r = null;
  for (r = e; r != null && r !== t; r = r.nextSibling)
    n.push(Ir.NextSibling);
  return r == null ? null : n;
}
i(RA, "navigateBetweenSiblings");
function Eg(e, t, n) {
  const r = ql(e, t);
  return r === null ? null : TA(n, r);
}
i(Eg, "calcPathBetween");
function xA(e, t) {
  let n = e.parent, r, o, s;
  for (; n !== null && Zi(n, t); )
    n = n.parent;
  n === null || !(n.type & 3) ? (r = s = df, o = t[ve][fe]) : (r = n.index, o = oe(t[r]), s = j(r - A));
  let a = oe(t[e.index]);
  if (e.type & 12) {
    const c = Ii(t, e);
    c && (a = c);
  }
  let u = Eg(o, a, s);
  if (u === null && o !== a) {
    const c = o.ownerDocument.body;
    if (u = Eg(c, a, ff), u === null)
      throw yA(t, e);
  }
  return u;
}
i(xA, "calcPathForNode");
function PA(e, t) {
  const n = [];
  for (const r of t)
    for (let o = 0; o < (r[ja] ?? 1); o++) {
      const s = {
        data: r,
        firstChild: null
      };
      r[vo] > 0 && (s.firstChild = e, e = Zu(r[vo], e)), n.push(s);
    }
  return [e, n];
}
i(PA, "locateDehydratedViewsInContainer");
let CI = /* @__PURE__ */ i(() => null, "_findMatchingDehydratedViewImpl");
function LA(e, t) {
  const n = e[ji];
  return !t || n === null || n.length === 0 ? null : n[0].data[Rl] === t ? n.shift() : (vI(e), null);
}
i(LA, "findMatchingDehydratedViewImpl");
function jA() {
  CI = LA;
}
i(jA, "enableFindMatchingDehydratedViewImpl");
function Mo(e, t) {
  return CI(e, t);
}
i(Mo, "findMatchingDehydratedView");
class Yu {
  static {
    i(this, "ChangeDetectionScheduler");
  }
}
class EI {
  static {
    i(this, "ComponentRef$1");
  }
}
class Ba {
  static {
    i(this, "ComponentFactory$1");
  }
}
function $A(e) {
  const t = Error(`No component factory found for ${Z(e)}.`);
  return t[BA] = e, t;
}
i($A, "noComponentFactoryError");
const BA = "ngComponent";
class HA {
  static {
    i(this, "_NullComponentFactoryResolver");
  }
  resolveComponentFactory(t) {
    throw $A(t);
  }
}
class Ns {
  static {
    i(this, "ComponentFactoryResolver$1");
  }
  static {
    this.NULL = /* @__PURE__ */ new HA();
  }
}
class bI {
  static {
    i(this, "RendererFactory2");
  }
}
class Zo {
  static {
    i(this, "Renderer2");
  }
  constructor() {
    this.destroyNode = null;
  }
  static {
    this.__NG_ELEMENT_ID__ = () => VA();
  }
}
function VA() {
  const e = y(), t = J(), n = yt(t.index, e);
  return (je(n) ? n : e)[N];
}
i(VA, "injectRenderer2");
class Ku {
  static {
    i(this, "Sanitizer");
  }
  static {
    this.ɵprov = ne({
      token: Ku,
      providedIn: "root",
      factory: /* @__PURE__ */ i(() => null, "factory")
    });
  }
}
const ya = {};
function Bf(e, t) {
  if (Gm() !== null)
    throw new I(-602, ngDevMode && `${e.name}() cannot be called from within a reactive context.${t ? ` ${t}` : ""}`);
}
i(Bf, "assertNotInReactiveContext");
const bg = /* @__PURE__ */ new Set();
function St(e) {
  bg.has(e) || (bg.add(e), performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
i(St, "performanceMarkFeature");
function wg(...e) {
}
i(wg, "noop");
function UA() {
  const e = typeof pe.requestAnimationFrame == "function";
  let t = pe[e ? "requestAnimationFrame" : "setTimeout"], n = pe[e ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && t && n) {
    const r = t[Zone.__symbol__("OriginalDelegate")];
    r && (t = r);
    const o = n[Zone.__symbol__("OriginalDelegate")];
    o && (n = o);
  }
  return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n };
}
i(UA, "getNativeRequestAnimationFrame");
class zA {
  static {
    i(this, "AsyncStackTaggingZoneSpec");
  }
  constructor(t, n = console) {
    this.name = "asyncStackTagging for " + t, this.createTask = n?.createTask ?? (() => null);
  }
  onScheduleTask(t, n, r, o) {
    return o.consoleTask = this.createTask(`Zone - ${o.source || o.type}`), t.scheduleTask(r, o);
  }
  onInvokeTask(t, n, r, o, s, a) {
    let u;
    return o.consoleTask ? u = o.consoleTask.run(() => t.invokeTask(r, o, s, a)) : u = t.invokeTask(r, o, s, a), u;
  }
}
class de {
  static {
    i(this, "NgZone");
  }
  constructor({ enableLongStackTrace: t = !1, shouldCoalesceEventChangeDetection: n = !1, shouldCoalesceRunChangeDetection: r = !1 }) {
    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Ft(!1), this.onMicrotaskEmpty = new Ft(!1), this.onStable = new Ft(!1), this.onError = new Ft(!1), typeof Zone > "u")
      throw new I(908, ngDevMode && "In this configuration Angular requires Zone.js");
    Zone.assertZonePatched();
    const o = this;
    o._nesting = 0, o._outer = o._inner = Zone.current, ngDevMode && (o._inner = o._inner.fork(new zA("Angular"))), Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())), t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && n, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = UA().nativeRequestAnimationFrame, qA(o);
  }
  /**
    This method checks whether the method call happens within an Angular Zone instance.
  */
  static isInAngularZone() {
    return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0;
  }
  /**
    Assures that the method is called within the Angular Zone, otherwise throws an error.
  */
  static assertInAngularZone() {
    if (!de.isInAngularZone())
      throw new I(909, ngDevMode && "Expected to be in Angular Zone, but it is not!");
  }
  /**
    Assures that the method is called outside of the Angular Zone, otherwise throws an error.
  */
  static assertNotInAngularZone() {
    if (de.isInAngularZone())
      throw new I(909, ngDevMode && "Expected to not be in Angular Zone, but it is!");
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone and returns value returned by
   * the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  run(t, n, r) {
    return this._inner.run(t, n, r);
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone as a task and returns value
   * returned by the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  runTask(t, n, r, o) {
    const s = this._inner, a = s.scheduleEventTask("NgZoneEvent: " + o, t, GA, wg, wg);
    try {
      return s.runTask(a, n, r);
    } finally {
      s.cancelTask(a);
    }
  }
  /**
   * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
   * rethrown.
   */
  runGuarded(t, n, r) {
    return this._inner.runGuarded(t, n, r);
  }
  /**
   * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
   * the function.
   *
   * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
   * work that
   * doesn't trigger Angular change-detection or is subject to Angular's error handling.
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * outside of the Angular zone.
   *
   * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
   */
  runOutsideAngular(t) {
    return this._outer.run(t);
  }
}
const GA = {};
function Hf(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if (e._nesting--, !e.hasPendingMicrotasks)
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
i(Hf, "checkStable");
function WA(e) {
  e.isCheckStableRunning || e.lastRequestAnimationFrameId !== -1 || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(pe, () => {
    e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
      e.lastRequestAnimationFrameId = -1, Ql(e), e.isCheckStableRunning = !0, Hf(e), e.isCheckStableRunning = !1;
    }, void 0, () => {
    }, () => {
    })), e.fakeTopEventTask.invoke();
  }), Ql(e));
}
i(WA, "delayChangeDetectionForEvents");
function qA(e) {
  const t = /* @__PURE__ */ i(() => {
    WA(e);
  }, "delayChangeDetectionForEventsDelegate");
  e._inner = e._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: /* @__PURE__ */ i((n, r, o, s, a, u) => {
      if (QA(u))
        return n.invokeTask(o, s, a, u);
      try {
        return Mg(e), n.invokeTask(o, s, a, u);
      } finally {
        (e.shouldCoalesceEventChangeDetection && s.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), _g(e);
      }
    }, "onInvokeTask"),
    onInvoke: /* @__PURE__ */ i((n, r, o, s, a, u, c) => {
      try {
        return Mg(e), n.invoke(o, s, a, u, c);
      } finally {
        e.shouldCoalesceRunChangeDetection && t(), _g(e);
      }
    }, "onInvoke"),
    onHasTask: /* @__PURE__ */ i((n, r, o, s) => {
      n.hasTask(o, s), r === o && (s.change == "microTask" ? (e._hasPendingMicrotasks = s.microTask, Ql(e), Hf(e)) : s.change == "macroTask" && (e.hasPendingMacrotasks = s.macroTask));
    }, "onHasTask"),
    onHandleError: /* @__PURE__ */ i((n, r, o, s) => (n.handleError(o, s), e.runOutsideAngular(() => e.onError.emit(s)), !1), "onHandleError")
  });
}
i(qA, "forkInnerZoneWithAngularBehavior");
function Ql(e) {
  e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.lastRequestAnimationFrameId !== -1 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1;
}
i(Ql, "updateMicroTaskStatus");
function Mg(e) {
  e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null));
}
i(Mg, "onEnter");
function _g(e) {
  e._nesting--, Hf(e);
}
i(_g, "onLeave");
class Vf {
  static {
    i(this, "NoopNgZone");
  }
  constructor() {
    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Ft(), this.onMicrotaskEmpty = new Ft(), this.onStable = new Ft(), this.onError = new Ft();
  }
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
}
function QA(e) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0].data?.__ignore_ng_zone__ === !0;
}
i(QA, "shouldBeIgnoredByZone");
function ZA(e = "zone.js", t) {
  return e === "noop" ? new Vf() : e === "zone.js" ? new de(t) : e;
}
i(ZA, "getNgZone");
var fn;
(function(e) {
  e[e.EarlyRead = 0] = "EarlyRead", e[e.Write = 1] = "Write", e[e.MixedReadWrite = 2] = "MixedReadWrite", e[e.Read = 3] = "Read";
})(fn || (fn = {}));
const wI = {
  destroy() {
  }
};
function Ha(e, t) {
  const n = t?.injector ?? M(xe);
  if (!t?.runOnServer && !Nt(n))
    return;
  n.get(vn).internalCallbacks.push(e);
}
i(Ha, "internalAfterNextRender");
function Zl(e, t) {
  ngDevMode && Bf(Zl, "Call `afterRender` outside of a reactive context. For example, schedule the render callback inside the component constructor`."), !t && Ye(Zl);
  const n = t?.injector ?? M(xe);
  if (!Nt(n))
    return wI;
  St("NgAfterRender");
  const r = n.get(vn), o = r.handler ??= new SI(), s = t?.phase ?? fn.MixedReadWrite, a = /* @__PURE__ */ i(() => {
    o.unregister(c), u();
  }, "destroy"), u = n.get(Hr).onDestroy(a), c = jd(n, () => new _I(s, e));
  return o.register(c), { destroy: a };
}
i(Zl, "afterRender");
function MI(e, t) {
  !t && Ye(MI);
  const n = t?.injector ?? M(xe);
  if (!Nt(n))
    return wI;
  St("NgAfterNextRender");
  const r = n.get(vn), o = r.handler ??= new SI(), s = t?.phase ?? fn.MixedReadWrite, a = /* @__PURE__ */ i(() => {
    o.unregister(c), u();
  }, "destroy"), u = n.get(Hr).onDestroy(a), c = jd(n, () => new _I(s, () => {
    a(), e();
  }));
  return o.register(c), { destroy: a };
}
i(MI, "afterNextRender");
class _I {
  static {
    i(this, "AfterRenderCallback");
  }
  constructor(t, n) {
    this.phase = t, this.callbackFn = n, this.zone = M(de), this.errorHandler = M(_n, { optional: !0 }), M(Yu, { optional: !0 })?.notify(
      1
      /* NotificationType.AfterRenderHooks */
    );
  }
  invoke() {
    try {
      this.zone.runOutsideAngular(this.callbackFn);
    } catch (t) {
      this.errorHandler?.handleError(t);
    }
  }
}
class SI {
  static {
    i(this, "AfterRenderCallbackHandlerImpl");
  }
  constructor() {
    this.executingCallbacks = !1, this.buckets = {
      // Note: the order of these keys controls the order the phases are run.
      [fn.EarlyRead]: /* @__PURE__ */ new Set(),
      [fn.Write]: /* @__PURE__ */ new Set(),
      [fn.MixedReadWrite]: /* @__PURE__ */ new Set(),
      [fn.Read]: /* @__PURE__ */ new Set()
    }, this.deferredCallbacks = /* @__PURE__ */ new Set();
  }
  register(t) {
    (this.executingCallbacks ? this.deferredCallbacks : this.buckets[t.phase]).add(t);
  }
  unregister(t) {
    this.buckets[t.phase].delete(t), this.deferredCallbacks.delete(t);
  }
  execute() {
    this.executingCallbacks = !0;
    for (const t of Object.values(this.buckets))
      for (const n of t)
        n.invoke();
    this.executingCallbacks = !1;
    for (const t of this.deferredCallbacks)
      this.buckets[t.phase].add(t);
    this.deferredCallbacks.clear();
  }
  destroy() {
    for (const t of Object.values(this.buckets))
      t.clear();
    this.deferredCallbacks.clear();
  }
}
class vn {
  static {
    i(this, "AfterRenderEventManager");
  }
  constructor() {
    this.handler = null, this.internalCallbacks = [];
  }
  /**
   * Executes internal and user-provided callbacks.
   */
  execute() {
    this.executeInternalCallbacks(), this.handler?.execute();
  }
  executeInternalCallbacks() {
    const t = [...this.internalCallbacks];
    this.internalCallbacks.length = 0;
    for (const n of t)
      n();
  }
  ngOnDestroy() {
    this.handler?.destroy(), this.handler = null, this.internalCallbacks.length = 0;
  }
  static {
    this.ɵprov = ne({
      token: vn,
      providedIn: "root",
      factory: /* @__PURE__ */ i(() => new vn(), "factory")
    });
  }
}
function Uf(e) {
  return e.ngModule !== void 0;
}
i(Uf, "isModuleWithProviders");
function sr(e) {
  return !!gt(e);
}
i(sr, "isNgModule");
function qs(e) {
  return !!ft(e);
}
i(qs, "isPipe");
function Sg(e) {
  return !!Ne(e);
}
i(Sg, "isDirective");
function Ei(e) {
  return !!U(e);
}
i(Ei, "isComponent");
function YA(e) {
  return U(e) ? "component" : Ne(e) ? "directive" : ft(e) ? "pipe" : "type";
}
i(YA, "getDependencyTypeForError");
function Yl(e, t) {
  if (hu(e) && (e = x(e), !e))
    throw new Error(`Expected forwardRef function, imported from "${z(t)}", to return a standalone entity or NgModule but got "${z(e) || e}".`);
  if (gt(e) == null) {
    const n = U(e) || Ne(e) || ft(e);
    if (n != null) {
      if (!n.standalone)
        throw new Error(`The "${z(e)}" ${YA(e)}, imported from "${z(t)}", is not standalone. Did you forget to add the standalone: true flag?`);
    } else
      throw Uf(e) ? new Error(`A module with providers was imported from "${z(t)}". Modules with providers are not supported in standalone components imports.`) : new Error(`The "${z(e)}" type, imported from "${z(t)}", must be a standalone component / directive / pipe or an NgModule. Did you forget to add the required @Component / @Directive / @Pipe or @NgModule annotation?`);
  }
}
i(Yl, "verifyStandaloneImport");
const KA = !0;
class JA {
  static {
    i(this, "DepsTracker");
  }
  constructor() {
    this.ownerNgModule = /* @__PURE__ */ new Map(), this.ngModulesWithSomeUnresolvedDecls = /* @__PURE__ */ new Set(), this.ngModulesScopeCache = /* @__PURE__ */ new Map(), this.standaloneComponentsScopeCache = /* @__PURE__ */ new Map();
  }
  /**
   * Attempts to resolve ng module's forward ref declarations as much as possible and add them to
   * the `ownerNgModule` map. This method normally should be called after the initial parsing when
   * all the forward refs are resolved (e.g., when trying to render a component)
   */
  resolveNgModulesDecls() {
    if (this.ngModulesWithSomeUnresolvedDecls.size !== 0) {
      for (const t of this.ngModulesWithSomeUnresolvedDecls) {
        const n = gt(t);
        if (n?.declarations)
          for (const r of qt(n.declarations))
            Ei(r) && this.ownerNgModule.set(r, t);
      }
      this.ngModulesWithSomeUnresolvedDecls.clear();
    }
  }
  /** @override */
  getComponentDependencies(t, n) {
    this.resolveNgModulesDecls();
    const r = U(t);
    if (r === null)
      throw new Error(`Attempting to get component dependencies for a type that is not a component: ${t}`);
    if (r.standalone) {
      const o = this.getStandaloneComponentScope(t, n);
      return o.compilation.isPoisoned ? { dependencies: [] } : {
        dependencies: [
          ...o.compilation.directives,
          ...o.compilation.pipes,
          ...o.compilation.ngModules
        ]
      };
    } else {
      if (!this.ownerNgModule.has(t))
        return { dependencies: [] };
      const o = this.getNgModuleScope(this.ownerNgModule.get(t));
      return o.compilation.isPoisoned ? { dependencies: [] } : {
        dependencies: [
          ...o.compilation.directives,
          ...o.compilation.pipes
        ]
      };
    }
  }
  /**
   * @override
   * This implementation does not make use of param scopeInfo since it assumes the scope info is
   * already added to the type itself through methods like {@link ɵɵsetNgModuleScope}
   */
  registerNgModule(t, n) {
    if (!sr(t))
      throw new Error(`Attempting to register a Type which is not NgModule as NgModule: ${t}`);
    this.ngModulesWithSomeUnresolvedDecls.add(t);
  }
  /** @override */
  clearScopeCacheFor(t) {
    this.ngModulesScopeCache.delete(t), this.standaloneComponentsScopeCache.delete(t);
  }
  /** @override */
  getNgModuleScope(t) {
    if (this.ngModulesScopeCache.has(t))
      return this.ngModulesScopeCache.get(t);
    const n = this.computeNgModuleScope(t);
    return this.ngModulesScopeCache.set(t, n), n;
  }
  /** Compute NgModule scope afresh. */
  computeNgModuleScope(t) {
    const n = gt(t, !0), r = {
      exported: { directives: /* @__PURE__ */ new Set(), pipes: /* @__PURE__ */ new Set() },
      compilation: { directives: /* @__PURE__ */ new Set(), pipes: /* @__PURE__ */ new Set() }
    };
    for (const o of qt(n.imports))
      if (sr(o)) {
        const s = this.getNgModuleScope(o);
        An(s.exported.directives, r.compilation.directives), An(s.exported.pipes, r.compilation.pipes);
      } else if (Fn(o))
        if (Sg(o) || Ei(o))
          r.compilation.directives.add(o);
        else if (qs(o))
          r.compilation.pipes.add(o);
        else
          throw new I(1e3, "The standalone imported type is neither a component nor a directive nor a pipe");
      else {
        r.compilation.isPoisoned = !0;
        break;
      }
    if (!r.compilation.isPoisoned)
      for (const o of qt(n.declarations)) {
        if (sr(o) || Fn(o)) {
          r.compilation.isPoisoned = !0;
          break;
        }
        qs(o) ? r.compilation.pipes.add(o) : r.compilation.directives.add(o);
      }
    for (const o of qt(n.exports))
      if (sr(o)) {
        const s = this.getNgModuleScope(o);
        An(s.exported.directives, r.exported.directives), An(s.exported.pipes, r.exported.pipes), An(s.exported.directives, r.compilation.directives), An(s.exported.pipes, r.compilation.pipes);
      } else qs(o) ? r.exported.pipes.add(o) : r.exported.directives.add(o);
    return r;
  }
  /** @override */
  getStandaloneComponentScope(t, n) {
    if (this.standaloneComponentsScopeCache.has(t))
      return this.standaloneComponentsScopeCache.get(t);
    const r = this.computeStandaloneComponentScope(t, n);
    return this.standaloneComponentsScopeCache.set(t, r), r;
  }
  computeStandaloneComponentScope(t, n) {
    const r = {
      compilation: {
        // Standalone components are always able to self-reference.
        directives: /* @__PURE__ */ new Set([t]),
        pipes: /* @__PURE__ */ new Set(),
        ngModules: /* @__PURE__ */ new Set()
      }
    };
    for (const o of nt(n ?? [])) {
      const s = x(o);
      try {
        Yl(s, t);
      } catch {
        return r.compilation.isPoisoned = !0, r;
      }
      if (sr(s)) {
        r.compilation.ngModules.add(s);
        const a = this.getNgModuleScope(s);
        if (a.exported.isPoisoned)
          return r.compilation.isPoisoned = !0, r;
        An(a.exported.directives, r.compilation.directives), An(a.exported.pipes, r.compilation.pipes);
      } else if (qs(s))
        r.compilation.pipes.add(s);
      else if (Sg(s) || Ei(s))
        r.compilation.directives.add(s);
      else
        return r.compilation.isPoisoned = !0, r;
    }
    return r;
  }
  /** @override */
  isOrphanComponent(t) {
    const n = U(t);
    return !n || n.standalone ? !1 : (this.resolveNgModulesDecls(), !this.ownerNgModule.has(t));
  }
}
function An(e, t) {
  for (const n of e)
    t.add(n);
}
i(An, "addSet");
const Er = new JA();
function Va(e, t, n) {
  ngDevMode && st(P(), "Expecting to be called in first template pass only");
  let r = n ? e.styles : null, o = n ? e.classes : null, s = 0;
  if (t !== null)
    for (let a = 0; a < t.length; a++) {
      const u = t[a];
      if (typeof u == "number")
        s = u;
      else if (s == 1)
        o = ll(o, u);
      else if (s == 2) {
        const c = u, l = t[++a];
        r = ll(r, c + ": " + l + ";");
      }
    }
  n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o;
}
i(Va, "computeStaticStyling");
class TI extends Ns {
  static {
    i(this, "ComponentFactoryResolver");
  }
  /**
   * @param ngModule The NgModuleRef to which all resolved factories are bound.
   */
  constructor(t) {
    super(), this.ngModule = t;
  }
  resolveComponentFactory(t) {
    ngDevMode && UM(t);
    const n = U(t);
    return new Yo(n, this.ngModule);
  }
}
function Tg(e) {
  const t = [];
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const r = e[n];
    r !== void 0 && t.push({
      propName: Array.isArray(r) ? r[0] : r,
      templateName: n
    });
  }
  return t;
}
i(Tg, "toRefArray");
function XA(e) {
  const t = e.toLowerCase();
  return t === "svg" ? Yy : t === "math" ? Ky : null;
}
i(XA, "getNamespace");
class Ju {
  static {
    i(this, "ChainedInjector");
  }
  constructor(t, n) {
    this.injector = t, this.parentInjector = n;
  }
  get(t, n, r) {
    r = ls(r);
    const o = this.injector.get(t, ya, r);
    return o !== ya || n === ya ? o : this.parentInjector.get(t, n, r);
  }
}
class Yo extends Ba {
  static {
    i(this, "ComponentFactory");
  }
  get inputs() {
    const t = this.componentDef, n = t.inputTransforms, r = Tg(t.inputs);
    if (n !== null)
      for (const o of r)
        n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
    return r;
  }
  get outputs() {
    return Tg(this.componentDef.outputs);
  }
  /**
   * @param componentDef The component definition.
   * @param ngModule The NgModuleRef to which the factory is bound.
   */
  constructor(t, n) {
    super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = by(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n;
  }
  create(t, n, r, o) {
    const s = B(null);
    try {
      if (ngDevMode && (typeof ngJitMode > "u" || ngJitMode) && this.componentDef.debugInfo?.forbidOrphanRendering && Er.isOrphanComponent(this.componentType))
        throw new I(1001, `Orphan component found! Trying to render the component ${tM(this.componentType)} without first loading the NgModule that declares it. It is recommended to make this component standalone in order to avoid this error. If this is not possible now, import the component's NgModule in the appropriate NgModule, or the standalone component in which you are trying to render this component. If this is a lazy import, load the NgModule lazily as well and use its module injector.`);
      o = o || this.ngModule;
      let a = o instanceof Lt ? o : o?.injector;
      a && this.componentDef.getStandaloneInjector !== null && (a = this.componentDef.getStandaloneInjector(a) || a);
      const u = a ? new Ju(t, a) : t, c = u.get(bI, null);
      if (c === null)
        throw new I(407, ngDevMode && "Angular was not able to inject a renderer (RendererFactory2). Likely this is due to a broken DI hierarchy. Make sure that any injector used to create this component has a correct parent.");
      const l = u.get(Ku, null), d = u.get(vn, null), f = u.get(Yu, null), h = {
        rendererFactory: c,
        sanitizer: l,
        // We don't use inline effects (yet).
        inlineEffectRunner: null,
        afterRenderEventManager: d,
        changeDetectionScheduler: f
      }, p = c.createRenderer(null, this.componentDef), g = this.componentDef.selectors[0][0] || "div", m = r ? NT(p, r, this.componentDef.encapsulation, u) : xu(p, g, XA(g));
      let v = 512;
      this.componentDef.signals ? v |= 4096 : this.componentDef.onPush || (v |= 16);
      let C = null;
      m !== null && (C = pf(
        m,
        u,
        !0
        /* isRootView */
      ));
      const D = Rf(0, null, null, 1, 0, null, null, null, null, null, null), _ = Bu(null, D, null, v, null, null, h, p, u, null, C);
      Xd(_);
      let R, W;
      try {
        const le = this.componentDef;
        let Ge, or = null;
        le.findHostDirectiveDefs ? (Ge = [], or = /* @__PURE__ */ new Map(), le.findHostDirectiveDefs(le, Ge, or), Ge.push(le), ngDevMode && Uy(Ge)) : Ge = [le];
        const Np = e1(_, m), uw = t1(Np, m, le, Ge, _, h, p);
        W = Ds(D, A), m && o1(p, le, m, r), n !== void 0 && i1(W, this.ngContentSelectors, n), R = r1(uw, le, Ge, or, _, [OI]), Uu(D, _, null);
      } finally {
        ef();
      }
      return new AI(this.componentType, R, zo(W, _), _, W);
    } finally {
      B(s);
    }
  }
}
class AI extends EI {
  static {
    i(this, "ComponentRef");
  }
  constructor(t, n, r, o, s) {
    super(), this.location = r, this._rootLView = o, this._tNode = s, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new wo(
      o,
      void 0,
      /* _cdRefInjectingView */
      !1
    ), this.componentType = t;
  }
  setInput(t, n) {
    const r = this._tNode.inputs;
    let o;
    if (r !== null && (o = r[t])) {
      if (this.previousInputValues ??= /* @__PURE__ */ new Map(), this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
        return;
      const s = this._rootLView;
      Lf(s[E], s, o, t, n), this.previousInputValues.set(t, n);
      const a = yt(this._tNode.index, s);
      As(a);
    } else if (ngDevMode) {
      const s = z(this.componentType);
      let a = `Can't set value of the '${t}' input on the '${s}' component. `;
      a += `Make sure that the '${t}' property is annotated with @Input() or a mapped @Input('${t}') exists.`, Ov(a);
    }
  }
  get injector() {
    return new De(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(t) {
    this.hostView.onDestroy(t);
  }
}
function e1(e, t) {
  const n = e[E], r = A;
  return ngDevMode && be(e, r), e[r] = t, Qo(n, r, 2, "#host", null);
}
i(e1, "createRootComponentTNode");
function t1(e, t, n, r, o, s, a) {
  const u = o[E];
  n1(r, e, t, a);
  let c = null;
  t !== null && (c = pf(t, o[Se]));
  const l = s.rendererFactory.createRenderer(t, n);
  let d = 16;
  n.signals ? d = 4096 : n.onPush && (d = 64);
  const f = Bu(o, tI(n), null, d, o[e.index], e, s, l, null, null, c);
  return u.firstCreatePass && Vl(u, e, r.length - 1), Hu(o, f), o[e.index] = f;
}
i(t1, "createRootComponentView");
function n1(e, t, n, r) {
  for (const o of e)
    t.mergedAttrs = Pi(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null && (Va(t, t.mergedAttrs, !0), n !== null && Zv(r, n, t));
}
i(n1, "applyRootComponentStyling");
function r1(e, t, n, r, o, s) {
  const a = J();
  ngDevMode && b(a, "tNode should have been already created");
  const u = o[E], c = He(a, o);
  oI(u, o, a, n, null, r);
  for (let d = 0; d < n.length; d++) {
    const f = a.directiveStart + d, h = vr(o, u, f, a);
    Le(h, o);
  }
  iI(u, o, a), c && Le(c, o), ngDevMode && tr(a.componentOffset, -1, "componentOffset must be great than -1");
  const l = vr(o, u, a.directiveStart + a.componentOffset, a);
  if (e[se] = o[se] = l, s !== null)
    for (const d of s)
      d(l, t);
  return Ff(u, a, o), l;
}
i(r1, "createRootComponent");
function o1(e, t, n, r) {
  if (r)
    yl(e, n, ["ng-version", "17.3.12"]);
  else {
    const { attrs: o, classes: s } = MM(t.selectors[0]);
    o && yl(e, n, o), s && s.length > 0 && Qv(e, n, s.join(" "));
  }
}
i(o1, "setRootNodeAttributes");
function i1(e, t, n) {
  const r = e.projection = [];
  for (let o = 0; o < t.length; o++) {
    const s = n[o];
    r.push(s != null ? Array.from(s) : null);
  }
}
i(i1, "projectNodes");
function OI() {
  const e = J();
  ngDevMode && b(e, "TNode is required"), wu(y()[E], e);
}
i(OI, "LifecycleHooksFeature");
class Fe {
  static {
    i(this, "ViewContainerRef");
  }
  static {
    this.__NG_ELEMENT_ID__ = s1;
  }
}
function s1() {
  const e = J();
  return NI(e, y());
}
i(s1, "injectViewContainerRef");
const a1 = Fe, FI = class extends a1 {
  static {
    i(this, "ViewContainerRef");
  }
  constructor(t, n, r) {
    super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r;
  }
  get element() {
    return zo(this._hostTNode, this._hostLView);
  }
  get injector() {
    return new De(this._hostTNode, this._hostLView);
  }
  /** @deprecated No replacement */
  get parentInjector() {
    const t = Mu(this._hostTNode, this._hostLView);
    if (tf(t)) {
      const n = Vi(t, this._hostLView), r = Hi(t);
      ngDevMode && zy(n, r);
      const o = n[E].data[
        r + 8
        /* NodeInjectorOffset.TNODE */
      ];
      return new De(o, n);
    } else
      return new De(null, this._hostLView);
  }
  clear() {
    for (; this.length > 0; )
      this.remove(this.length - 1);
  }
  get(t) {
    const n = Ag(this._lContainer);
    return n !== null && n[t] || null;
  }
  get length() {
    return this._lContainer.length - me;
  }
  createEmbeddedView(t, n, r) {
    let o, s;
    typeof r == "number" ? o = r : r != null && (o = r.index, s = r.injector);
    const a = Mo(this._lContainer, t.ssrId), u = t.createEmbeddedViewImpl(n || {}, s, a);
    return this.insertImpl(u, o, bo(this._hostTNode, a)), u;
  }
  createComponent(t, n, r, o, s) {
    const a = t && !fi(t);
    let u;
    if (a)
      ngDevMode && O(typeof n != "object", !0, "It looks like Component factory was provided as the first argument and an options object as the second argument. This combination of arguments is incompatible. You can either change the first argument to provide Component type or change the second argument to be a number (representing an index at which to insert the new component's host view into this container)"), u = n;
    else {
      ngDevMode && (b(U(t), "Provided Component class doesn't contain Component definition. Please check whether provided class has @Component decorator."), O(typeof n != "number", !0, "It looks like Component type was provided as the first argument and a number (representing an index at which to insert the new component's host view into this container as the second argument. This combination of arguments is incompatible. Please use an object as the second argument instead."));
      const g = n || {};
      ngDevMode && g.environmentInjector && g.ngModuleRef && T("Cannot pass both environmentInjector and ngModuleRef options to createComponent()."), u = g.index, r = g.injector, o = g.projectableNodes, s = g.environmentInjector || g.ngModuleRef;
    }
    const c = a ? t : new Yo(U(t)), l = r || this.parentInjector;
    if (!s && c.ngModule == null) {
      const m = (a ? l : this.parentInjector).get(Lt, null);
      m && (s = m);
    }
    const d = U(c.componentType ?? {}), f = Mo(this._lContainer, d?.id ?? null), h = f?.firstChild ?? null, p = c.create(l, o, h, s);
    return this.insertImpl(p.hostView, u, bo(this._hostTNode, f)), p;
  }
  insert(t, n) {
    return this.insertImpl(t, n, !0);
  }
  insertImpl(t, n, r) {
    const o = t._lView;
    if (ngDevMode && t.destroyed)
      throw new Error("Cannot insert a destroyed View in a ViewContainer!");
    if (XM(o)) {
      const u = this.indexOf(t);
      if (u !== -1)
        this.detach(u);
      else {
        const c = o[Ee];
        ngDevMode && O(Re(c), !0, "An attached view should have its PARENT point to a container.");
        const l = new FI(c, c[Be], c[Ee]);
        l.detach(l.indexOf(t));
      }
    }
    const s = this._adjustIndex(n), a = this._lContainer;
    return Ts(a, o, s, r), t.attachToViewContainerRef(), yy(Rc(a), s, t), t;
  }
  move(t, n) {
    if (ngDevMode && t.destroyed)
      throw new Error("Cannot move a destroyed View in a ViewContainer!");
    return this.insert(t, n);
  }
  indexOf(t) {
    const n = Ag(this._lContainer);
    return n !== null ? n.indexOf(t) : -1;
  }
  remove(t) {
    const n = this._adjustIndex(t, -1), r = Wi(this._lContainer, n);
    r && (Sa(Rc(this._lContainer), n), Pu(r[E], r));
  }
  detach(t) {
    const n = this._adjustIndex(t, -1), r = Wi(this._lContainer, n);
    return r && Sa(Rc(this._lContainer), n) != null ? new wo(r) : null;
  }
  _adjustIndex(t, n = 0) {
    return t == null ? this.length + n : (ngDevMode && (tr(t, -1, `ViewRef index must be positive, got ${t}`), Zn(t, this.length + 1 + n, "index")), t);
  }
};
function Ag(e) {
  return e[Oa];
}
i(Ag, "getViewRefs");
function Rc(e) {
  return e[Oa] || (e[Oa] = []);
}
i(Rc, "getOrCreateViewRefs");
function NI(e, t) {
  ngDevMode && $e(
    e,
    15
    /* TNodeType.AnyRNode */
  );
  let n;
  const r = t[e.index];
  return Re(r) ? n = r : (n = sI(r, t, null, e), t[e.index] = n, Hu(t, n)), kI(n, t, e, r), new FI(n, e, t);
}
i(NI, "createContainerRef");
function u1(e, t) {
  const n = e[N];
  ngDevMode && ngDevMode.rendererCreateComment++;
  const r = n.createComment(ngDevMode ? "container" : ""), o = He(t, e), s = Lu(n, o);
  return Cr(n, s, r, MT(n, o), !1), r;
}
i(u1, "insertAnchorNode");
let kI = xI, zf = /* @__PURE__ */ i(() => !1, "_populateDehydratedViewsInLContainer");
function RI(e, t, n) {
  return zf(e, t, n);
}
i(RI, "populateDehydratedViewsInLContainer");
function xI(e, t, n, r) {
  if (e[Jt])
    return;
  let o;
  n.type & 8 ? o = oe(r) : o = u1(t, n), e[Jt] = o;
}
i(xI, "createAnchorNode");
function c1(e, t, n) {
  if (e[Jt] && e[ji])
    return !0;
  const r = n[mt], o = t.index - A;
  if (!r || Pa(t) || Ou(r, o))
    return !1;
  const a = Pl(r, o), u = r.data[zi]?.[o];
  ngDevMode && b(u, "Unexpected state: no hydration info available for a given TNode, which represents a view container.");
  const [c, l] = PA(a, u);
  return ngDevMode && (Os(c, Node.COMMENT_NODE, null, n, t, !0), Go(c, !1)), e[Jt] = c, e[ji] = l, !0;
}
i(c1, "populateDehydratedViewsInLContainerImpl");
function l1(e, t, n, r) {
  zf(e, n, t) || xI(e, t, n, r);
}
i(l1, "locateOrCreateAnchorNode");
function d1() {
  kI = l1, zf = c1;
}
i(d1, "enableLocateOrCreateContainerRefImpl");
class Gf {
  static {
    i(this, "LQuery_");
  }
  constructor(t) {
    this.queryList = t, this.matches = null;
  }
  clone() {
    return new Gf(this.queryList);
  }
  setDirty() {
    this.queryList.setDirty();
  }
}
class Wf {
  static {
    i(this, "LQueries_");
  }
  constructor(t = []) {
    this.queries = t;
  }
  createEmbeddedView(t) {
    const n = t.queries;
    if (n !== null) {
      const r = t.contentQueries !== null ? t.contentQueries[0] : n.length, o = [];
      for (let s = 0; s < r; s++) {
        const a = n.getByIndex(s), u = this.queries[a.indexInDeclarationView];
        o.push(u.clone());
      }
      return new Wf(o);
    }
    return null;
  }
  insertView(t) {
    this.dirtyQueriesWithMatches(t);
  }
  detachView(t) {
    this.dirtyQueriesWithMatches(t);
  }
  finishViewCreation(t) {
    this.dirtyQueriesWithMatches(t);
  }
  dirtyQueriesWithMatches(t) {
    for (let n = 0; n < this.queries.length; n++)
      Yf(t, n).matches !== null && this.queries[n].setDirty();
  }
}
class PI {
  static {
    i(this, "TQueryMetadata_");
  }
  constructor(t, n, r = null) {
    this.flags = n, this.read = r, typeof t == "string" ? this.predicate = m1(t) : this.predicate = t;
  }
}
class qf {
  static {
    i(this, "TQueries_");
  }
  constructor(t = []) {
    this.queries = t;
  }
  elementStart(t, n) {
    ngDevMode && st(t, "Queries should collect results on the first template pass only");
    for (let r = 0; r < this.queries.length; r++)
      this.queries[r].elementStart(t, n);
  }
  elementEnd(t) {
    for (let n = 0; n < this.queries.length; n++)
      this.queries[n].elementEnd(t);
  }
  embeddedTView(t) {
    let n = null;
    for (let r = 0; r < this.length; r++) {
      const o = n !== null ? n.length : 0, s = this.getByIndex(r).embeddedTView(t, o);
      s && (s.indexInDeclarationView = r, n !== null ? n.push(s) : n = [s]);
    }
    return n !== null ? new qf(n) : null;
  }
  template(t, n) {
    ngDevMode && st(t, "Queries should collect results on the first template pass only");
    for (let r = 0; r < this.queries.length; r++)
      this.queries[r].template(t, n);
  }
  getByIndex(t) {
    return ngDevMode && be(this.queries, t), this.queries[t];
  }
  get length() {
    return this.queries.length;
  }
  track(t) {
    this.queries.push(t);
  }
}
class Qf {
  static {
    i(this, "TQuery_");
  }
  constructor(t, n = -1) {
    this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n;
  }
  elementStart(t, n) {
    this.isApplyingToNode(n) && this.matchTNode(t, n);
  }
  elementEnd(t) {
    this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
  }
  template(t, n) {
    this.elementStart(t, n);
  }
  embeddedTView(t, n) {
    return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new Qf(this.metadata)) : null;
  }
  isApplyingToNode(t) {
    if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
      const n = this._declarationNodeIndex;
      let r = t.parent;
      for (; r !== null && r.type & 8 && r.index !== n; )
        r = r.parent;
      return n === (r !== null ? r.index : -1);
    }
    return this._appliesToNextNode;
  }
  matchTNode(t, n) {
    const r = this.metadata.predicate;
    if (Array.isArray(r))
      for (let o = 0; o < r.length; o++) {
        const s = r[o];
        this.matchTNodeWithReadOption(t, n, f1(n, s)), this.matchTNodeWithReadOption(t, n, ga(n, t, s, !1, !1));
      }
    else
      r === Ze ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, ga(n, t, r, !1, !1));
  }
  matchTNodeWithReadOption(t, n, r) {
    if (r !== null) {
      const o = this.metadata.read;
      if (o !== null)
        if (o === on || o === Fe || o === Ze && n.type & 4)
          this.addMatch(n.index, -2);
        else {
          const s = ga(n, t, o, !1, !1);
          s !== null && this.addMatch(n.index, s);
        }
      else
        this.addMatch(n.index, r);
    }
  }
  addMatch(t, n) {
    this.matches === null ? this.matches = [t, n] : this.matches.push(t, n);
  }
}
function f1(e, t) {
  const n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2)
      if (n[r] === t)
        return n[r + 1];
  }
  return null;
}
i(f1, "getIdxOfMatchingSelector");
function h1(e, t) {
  return e.type & 11 ? zo(e, t) : e.type & 4 ? Gu(e, t) : null;
}
i(h1, "createResultByTNodeType");
function p1(e, t, n, r) {
  return n === -1 ? h1(t, e) : n === -2 ? g1(e, t, r) : vr(e, e[E], n, t);
}
i(p1, "createResultForNode");
function g1(e, t, n) {
  if (n === on)
    return zo(t, e);
  if (n === Ze)
    return Gu(t, e);
  if (n === Fe)
    return ngDevMode && $e(
      t,
      15
      /* TNodeType.AnyContainer */
    ), NI(t, e);
  ngDevMode && T(`Special token to read should be one of ElementRef, TemplateRef or ViewContainerRef but got ${Z(n)}.`);
}
i(g1, "createSpecialToken");
function LI(e, t, n, r) {
  const o = t[Rt].queries[r];
  if (o.matches === null) {
    const s = e.data, a = n.matches, u = [];
    for (let c = 0; a !== null && c < a.length; c += 2) {
      const l = a[c];
      if (l < 0)
        u.push(null);
      else {
        ngDevMode && be(s, l);
        const d = s[l];
        u.push(p1(t, d, a[c + 1], n.metadata.read));
      }
    }
    o.matches = u;
  }
  return o.matches;
}
i(LI, "materializeViewResults");
function Kl(e, t, n, r) {
  const o = e.queries.getByIndex(n), s = o.matches;
  if (s !== null) {
    const a = LI(e, t, o, n);
    for (let u = 0; u < s.length; u += 2) {
      const c = s[u];
      if (c > 0)
        r.push(a[u / 2]);
      else {
        const l = s[u + 1], d = t[-c];
        ngDevMode && it(d);
        for (let f = me; f < d.length; f++) {
          const h = d[f];
          h[gs] === h[Ee] && Kl(h[E], h, l, r);
        }
        if (d[mr] !== null) {
          const f = d[mr];
          for (let h = 0; h < f.length; h++) {
            const p = f[h];
            Kl(p[E], p, l, r);
          }
        }
      }
    }
  }
  return r;
}
i(Kl, "collectQueryResults");
function Zf(e, t) {
  return ngDevMode && b(e[Rt], "LQueries should be defined when trying to load a query"), ngDevMode && be(e[Rt].queries, t), e[Rt].queries[t].queryList;
}
i(Zf, "loadQueryInternal");
function jI(e, t, n) {
  const r = new Tu(
    (n & 4) === 4
    /* QueryFlags.emitDistinctChangesOnly */
  );
  return PT(e, t, r, r.destroy), (t[Rt] ??= new Wf()).queries.push(new Gf(r)) - 1;
}
i(jI, "createLQuery");
function $I(e, t, n) {
  ngDevMode && X(t, "Expecting flags");
  const r = P();
  return r.firstCreatePass && (HI(r, new PI(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)), jI(r, y(), t);
}
i($I, "createViewQuery");
function BI(e, t, n, r) {
  ngDevMode && X(n, "Expecting flags");
  const o = P();
  if (o.firstCreatePass) {
    const s = J();
    HI(o, new PI(t, n, r), s.index), y1(o, e), (n & 2) === 2 && (o.staticContentQueries = !0);
  }
  return jI(o, y(), n);
}
i(BI, "createContentQuery");
function m1(e) {
  return e.split(",").map((t) => t.trim());
}
i(m1, "splitQueryMultiSelectors");
function HI(e, t, n) {
  e.queries === null && (e.queries = new qf()), e.queries.track(new Qf(t, n));
}
i(HI, "createTQuery");
function y1(e, t) {
  const n = e.contentQueries || (e.contentQueries = []), r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
i(y1, "saveContentQueryAndDirectiveIndex");
function Yf(e, t) {
  return ngDevMode && b(e.queries, "TQueries must be defined to retrieve a TQuery"), e.queries.getByIndex(t);
}
i(Yf, "getTQuery");
function VI(e, t) {
  const n = e[E], r = Yf(n, t);
  return r.crossesNgTemplate ? Kl(n, e, t, []) : LI(n, e, r, t);
}
i(VI, "getQueryResults");
function Kf(e) {
  return typeof e == "function" && e[pt] !== void 0;
}
i(Kf, "isSignal");
function D1(e) {
  return null;
}
i(D1, "ɵunwrapWritableSignal");
function UI(e, t) {
  St("NgSignals");
  const n = gw(e), r = n[pt];
  return t?.equal && (r.equal = t.equal), n.set = (o) => lu(r, o), n.update = (o) => mw(r, o), n.asReadonly = zI.bind(n), ngDevMode && (n.toString = () => `[Signal: ${n()}]`), n;
}
i(UI, "signal");
function zI() {
  const e = this[pt];
  if (e.readonlyFn === void 0) {
    const t = /* @__PURE__ */ i(() => this(), "readonlyFn");
    t[pt] = e, e.readonlyFn = t;
  }
  return e.readonlyFn;
}
i(zI, "signalAsReadonlyFn");
function GI(e) {
  return Kf(e) && typeof e.set == "function";
}
i(GI, "isWritableSignal");
function Jf(e, t) {
  let n;
  const r = Xm(() => {
    n._dirtyCounter();
    const o = v1(n, e);
    if (t && o === void 0)
      throw new I(-951, ngDevMode && "Child query result is required but no value is available.");
    return o;
  });
  return n = r[pt], n._dirtyCounter = UI(0), n._flatValue = void 0, ngDevMode && (r.toString = () => "[Query Signal]"), r;
}
i(Jf, "createQuerySignalFn");
function WI() {
  return Jf(
    /* firstOnly */
    !0,
    /* required */
    !1
  );
}
i(WI, "createSingleResultOptionalQuerySignalFn");
function qI() {
  return Jf(
    /* firstOnly */
    !0,
    /* required */
    !0
  );
}
i(qI, "createSingleResultRequiredQuerySignalFn");
function QI() {
  return Jf(
    /* firstOnly */
    !1,
    /* required */
    !1
  );
}
i(QI, "createMultiResultQuerySignalFn");
function ZI(e, t) {
  const n = e[pt];
  n._lView = y(), n._queryIndex = t, n._queryList = Zf(n._lView, t), n._queryList.onDirty(() => n._dirtyCounter.update((r) => r + 1));
}
i(ZI, "bindQueryToSignal");
function v1(e, t) {
  const n = e._lView, r = e._queryIndex;
  if (n === void 0 || r === void 0 || n[S] & 4)
    return t ? void 0 : Q;
  const o = Zf(n, r), s = VI(n, r);
  return o.reset(s, xD), t ? o.first : o._changesDetected || e._flatValue === void 0 ? e._flatValue = o.toArray() : e._flatValue;
}
i(v1, "refreshSignalQuery");
function Og(e, t) {
  return ngDevMode && Ye(Xf), WI();
}
i(Og, "viewChildFn");
function I1(e, t) {
  return ngDevMode && Ye(Xf), qI();
}
i(I1, "viewChildRequiredFn");
const Xf = (Og.required = I1, Og);
function YI(e, t) {
  return ngDevMode && Ye(YI), QI();
}
i(YI, "viewChildren");
function Fg(e, t) {
  return ngDevMode && Ye(KI), WI();
}
i(Fg, "contentChildFn");
function C1(e, t) {
  return ngDevMode && Ye(JI), qI();
}
i(C1, "contentChildRequiredFn");
const KI = (Fg.required = C1, Fg);
function JI(e, t) {
  return QI();
}
i(JI, "contentChildren");
function XI(e) {
  const t = Object.create(ay), n = new of();
  t.value = e;
  function r() {
    return uu(t), Ng(t.value), t.value;
  }
  return i(r, "getter"), r[pt] = t, r.asReadonly = zI.bind(r), r.set = (o) => {
    t.equal(t.value, o) || (lu(t, o), n.emit(o));
  }, r.update = (o) => {
    Ng(t.value), r.set(o(t.value));
  }, r.subscribe = n.subscribe.bind(n), r.destroyRef = n.destroyRef, ngDevMode && (r.toString = () => `[Model Signal: ${r()}]`), r;
}
i(XI, "createModelSignal");
function Ng(e) {
  if (e === du)
    throw new I(-952, ngDevMode && "Model is required but no value is available yet.");
}
i(Ng, "assertModelSet");
function kg(e) {
  return ngDevMode && Ye(eh), XI(e);
}
i(kg, "modelFunction");
function E1() {
  return ngDevMode && Ye(eh), XI(du);
}
i(E1, "modelRequiredFunction");
const eh = (kg.required = E1, kg), eC = !0;
class ks {
  static {
    i(this, "Query");
  }
}
const b1 = er("ContentChildren", (e, t = {}) => ({
  selector: e,
  first: !1,
  isViewQuery: !1,
  descendants: !1,
  emitDistinctChangesOnly: eC,
  ...t
}), ks), w1 = er("ContentChild", (e, t = {}) => ({ selector: e, first: !0, isViewQuery: !1, descendants: !0, ...t }), ks), M1 = er("ViewChildren", (e, t = {}) => ({
  selector: e,
  first: !1,
  isViewQuery: !0,
  descendants: !0,
  emitDistinctChangesOnly: eC,
  ...t
}), ks), _1 = er("ViewChild", (e, t) => ({ selector: e, first: !0, isViewQuery: !0, descendants: !0, ...t }), ks);
function tC(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  function r(o) {
    let s = n.get(o);
    if (!s) {
      const a = e(o);
      n.set(o, s = a.then(F1));
    }
    return s;
  }
  return i(r, "cachedResourceResolve"), _o.forEach((o, s) => {
    const a = [];
    o.templateUrl && a.push(r(o.templateUrl).then((l) => {
      o.template = l;
    }));
    const u = typeof o.styles == "string" ? [o.styles] : o.styles || [];
    if (o.styles = u, o.styleUrl && o.styleUrls?.length)
      throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");
    if (o.styleUrls?.length) {
      const l = o.styles.length, d = o.styleUrls;
      o.styleUrls.forEach((f, h) => {
        u.push(""), a.push(r(f).then((p) => {
          u[l + h] = p, d.splice(d.indexOf(f), 1), d.length == 0 && (o.styleUrls = void 0);
        }));
      });
    } else o.styleUrl && a.push(r(o.styleUrl).then((l) => {
      u.push(l), o.styleUrl = void 0;
    }));
    const c = Promise.all(a).then(() => N1(s));
    t.push(c);
  }), rC(), Promise.all(t).then(() => {
  });
}
i(tC, "resolveComponentResources");
let _o = /* @__PURE__ */ new Map();
const Yi = /* @__PURE__ */ new Set();
function S1(e, t) {
  nC(t) && (_o.set(e, t), Yi.add(e));
}
i(S1, "maybeQueueResolutionOfComponentResources");
function T1(e) {
  return Yi.has(e);
}
i(T1, "isComponentDefPendingResolution");
function nC(e) {
  return !!(e.templateUrl && !e.hasOwnProperty("template") || e.styleUrls && e.styleUrls.length || e.styleUrl);
}
i(nC, "componentNeedsResolution");
function rC() {
  const e = _o;
  return _o = /* @__PURE__ */ new Map(), e;
}
i(rC, "clearResolutionOfComponentResourcesQueue");
function A1(e) {
  Yi.clear(), e.forEach((t, n) => Yi.add(n)), _o = e;
}
i(A1, "restoreComponentResolutionQueue");
function O1() {
  return _o.size === 0;
}
i(O1, "isComponentResourceResolutionQueueEmpty");
function F1(e) {
  return typeof e == "string" ? e : e.text();
}
i(F1, "unwrapResponse");
function N1(e) {
  Yi.delete(e);
}
i(N1, "componentDefResolved");
const Jl = /* @__PURE__ */ new Map();
let oC = !0;
function k1(e, t, n) {
  if (t && t !== n && oC)
    throw new Error(`Duplicate module registered for ${e} - ${Z(t)} vs ${Z(t.name)}`);
}
i(k1, "assertSameOrNotExisting");
function th(e, t) {
  const n = Jl.get(t) || null;
  k1(t, n, e), Jl.set(t, e);
}
i(th, "registerNgModuleType");
function iC(e) {
  return Jl.get(e);
}
i(iC, "getRegisteredNgModuleType");
function R1(e) {
  oC = !e;
}
i(R1, "setAllowDuplicateNgModuleIdsForTest");
function sC(e, t, n) {
  const r = y(), o = ce(), s = He(o, r);
  if (o.type === 2 && t.toLowerCase() === "iframe") {
    const a = s;
    a.src = "", a.srcdoc = Wo(""), Ms(r[N], a);
    const u = ngDevMode && `Angular has detected that the \`${n}\` was applied as a binding to an <iframe>${Ru(r)}. For security reasons, the \`${n}\` can be set on an <iframe> as a static attribute only. 
To fix this, switch the \`${n}\` binding to a static attribute in a template or in host bindings section.`;
    throw new I(-910, u);
  }
  return e;
}
i(sC, "ɵɵvalidateIframeAttribute");
function aC(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
i(aC, "getSuperType");
function nh(e) {
  let t = aC(e.type), n = !0;
  const r = [e];
  for (; t; ) {
    let o;
    if (wt(e))
      o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp)
        throw new I(903, ngDevMode && `Directives cannot inherit Components. Directive ${z(e.type)} is attempting to extend component ${z(t)}`);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        const a = e;
        a.inputs = Qs(e.inputs), a.inputTransforms = Qs(e.inputTransforms), a.declaredInputs = Qs(e.declaredInputs), a.outputs = Qs(e.outputs);
        const u = o.hostBindings;
        u && $1(e, u);
        const c = o.viewQuery, l = o.contentQueries;
        if (c && L1(e, c), l && j1(e, l), x1(e, o), Gw(e.outputs, o.outputs), wt(o) && o.data.animation) {
          const d = e.data;
          d.animation = (d.animation || []).concat(o.data.animation);
        }
      }
      const s = o.features;
      if (s)
        for (let a = 0; a < s.length; a++) {
          const u = s[a];
          u && u.ngInherit && u(e), u === nh && (n = !1);
        }
    }
    t = Object.getPrototypeOf(t);
  }
  P1(r);
}
i(nh, "ɵɵInheritDefinitionFeature");
function x1(e, t) {
  for (const n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n))
      continue;
    const r = t.inputs[n];
    if (r !== void 0 && (e.inputs[n] = r, e.declaredInputs[n] = t.declaredInputs[n], t.inputTransforms !== null)) {
      const o = Array.isArray(r) ? r[0] : r;
      if (!t.inputTransforms.hasOwnProperty(o))
        continue;
      e.inputTransforms ??= {}, e.inputTransforms[o] = t.inputTransforms[o];
    }
  }
}
i(x1, "mergeInputsWithTransforms");
function P1(e) {
  let t = 0, n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    o.hostVars = t += o.hostVars, o.hostAttrs = Pi(o.hostAttrs, n = Pi(n, o.hostAttrs));
  }
}
i(P1, "mergeHostAttrsAcrossInheritance");
function Qs(e) {
  return e === Pt ? {} : e === Q ? [] : e;
}
i(Qs, "maybeUnwrapEmpty");
function L1(e, t) {
  const n = e.viewQuery;
  n ? e.viewQuery = (r, o) => {
    t(r, o), n(r, o);
  } : e.viewQuery = t;
}
i(L1, "inheritViewQuery");
function j1(e, t) {
  const n = e.contentQueries;
  n ? e.contentQueries = (r, o, s) => {
    t(r, o, s), n(r, o, s);
  } : e.contentQueries = t;
}
i(j1, "inheritContentQueries");
function $1(e, t) {
  const n = e.hostBindings;
  n ? e.hostBindings = (r, o) => {
    t(r, o), n(r, o);
  } : e.hostBindings = t;
}
i($1, "inheritHostBindings");
const B1 = [
  // The child class should use the providers of its parent.
  "providersResolver"
  // Not listed here are any fields which are handled by the `ɵɵInheritDefinitionFeature`, such
  // as inputs, outputs, and host binding functions.
], H1 = [
  // The child class should use the template function of its parent, including all template
  // semantics.
  "template",
  "decls",
  "consts",
  "vars",
  "onPush",
  "ngContentSelectors",
  // The child class should use the CSS styles of its parent, including all styling semantics.
  "styles",
  "encapsulation",
  // The child class should be checked by the runtime in the same way as its parent.
  "schemas"
];
function uC(e) {
  let t = aC(e.type), n;
  wt(e) ? n = t.ɵcmp : n = t.ɵdir;
  const r = e;
  for (const o of B1)
    r[o] = n[o];
  if (wt(n))
    for (const o of H1)
      r[o] = n[o];
}
i(uC, "ɵɵCopyDefinitionFeature");
function cC(e) {
  const t = /* @__PURE__ */ i((n) => {
    const r = (Array.isArray(e) ? e : e()).map((o) => typeof o == "function" ? { directive: x(o), inputs: Pt, outputs: Pt } : {
      directive: x(o.directive),
      inputs: Rg(o.inputs),
      outputs: Rg(o.outputs)
    });
    n.hostDirectives === null ? (n.findHostDirectiveDefs = lC, n.hostDirectives = r) : n.hostDirectives.unshift(...r);
  }, "feature");
  return t.ngInherit = !0, t;
}
i(cC, "ɵɵHostDirectivesFeature");
function lC(e, t, n) {
  if (e.hostDirectives !== null)
    for (const r of e.hostDirectives) {
      const o = Ne(r.directive);
      (typeof ngDevMode > "u" || ngDevMode) && U1(r, o), V1(o.declaredInputs, r.inputs), lC(o, t, n), n.set(o, r), t.push(o);
    }
}
i(lC, "findHostDirectiveDefs");
function Rg(e) {
  if (e === void 0 || e.length === 0)
    return Pt;
  const t = {};
  for (let n = 0; n < e.length; n += 2)
    t[e[n]] = e[n + 1];
  return t;
}
i(Rg, "bindingArrayToMap");
function V1(e, t) {
  for (const n in t)
    if (t.hasOwnProperty(n)) {
      const r = t[n], o = e[n];
      (typeof ngDevMode > "u" || ngDevMode) && e.hasOwnProperty(r) && O(e[r], e[n], `Conflicting host directive input alias ${n}.`), e[r] = o;
    }
}
i(V1, "patchDeclaredInputs");
function U1(e, t) {
  const n = e.directive;
  if (t === null)
    throw U(n) !== null ? new I(310, `Host directive ${n.name} cannot be a component.`) : new I(307, `Could not resolve metadata for host directive ${n.name}. Make sure that the ${n.name} class is annotated with an @Directive decorator.`);
  if (!t.standalone)
    throw new I(308, `Host directive ${t.type.name} must be standalone.`);
  xg("input", t, e.inputs), xg("output", t, e.outputs);
}
i(U1, "validateHostDirective");
function xg(e, t, n) {
  const r = t.type.name, o = e === "input" ? t.inputs : t.outputs;
  for (const s in n)
    if (n.hasOwnProperty(s)) {
      if (!o.hasOwnProperty(s))
        throw new I(311, `Directive ${r} does not have an ${e} with a public name of ${s}.`);
      const a = n[s];
      if (o.hasOwnProperty(a) && a !== s)
        throw new I(312, `Cannot alias ${e} ${s} of host directive ${r} to ${a}, because it already has a different ${e} with the same public name.`);
    }
}
i(xg, "validateMappings");
function dC(e) {
  const t = e.inputConfig, n = {};
  for (const r in t)
    if (t.hasOwnProperty(r)) {
      const o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
i(dC, "ɵɵInputTransformsFeature");
class Xn {
  static {
    i(this, "NgModuleRef$1");
  }
}
class fC {
  static {
    i(this, "NgModuleFactory$1");
  }
}
function rh(e, t) {
  return new Xu(e, t ?? null, []);
}
i(rh, "createNgModule");
const z1 = rh;
class Xu extends Xn {
  static {
    i(this, "NgModuleRef");
  }
  constructor(t, n, r) {
    super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new TI(this);
    const o = gt(t);
    ngDevMode && b(o, `NgModule '${Z(t)}' is not a subtype of 'NgModuleType'.`), this._bootstrapComponents = qt(o.bootstrap), this._r3Injector = ND(t, n, [
      { provide: Xn, useValue: this },
      {
        provide: Ns,
        useValue: this.componentFactoryResolver
      },
      ...r
    ], Z(t), /* @__PURE__ */ new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(t);
  }
  get injector() {
    return this._r3Injector;
  }
  destroy() {
    ngDevMode && b(this.destroyCbs, "NgModule already destroyed");
    const t = this._r3Injector;
    !t.destroyed && t.destroy(), this.destroyCbs.forEach((n) => n()), this.destroyCbs = null;
  }
  onDestroy(t) {
    ngDevMode && b(this.destroyCbs, "NgModule already destroyed"), this.destroyCbs.push(t);
  }
}
class ec extends fC {
  static {
    i(this, "NgModuleFactory");
  }
  constructor(t) {
    super(), this.moduleType = t;
  }
  create(t) {
    return new Xu(this.moduleType, t, []);
  }
}
function G1(e, t, n) {
  return new Xu(e, t, n);
}
i(G1, "createNgModuleRefWithProviders");
class hC extends Xn {
  static {
    i(this, "EnvironmentNgModuleRefAdapter");
  }
  constructor(t) {
    super(), this.componentFactoryResolver = new TI(this), this.instance = null;
    const n = new jo([
      ...t.providers,
      { provide: Xn, useValue: this },
      { provide: Ns, useValue: this.componentFactoryResolver }
    ], t.parent || Iu(), t.debugName, /* @__PURE__ */ new Set(["environment"]));
    this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
}
function oh(e, t, n = null) {
  return new hC({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 }).injector;
}
i(oh, "createEnvironmentInjector");
class Ua {
  static {
    i(this, "CachedInjectorService");
  }
  constructor() {
    this.cachedInjectors = /* @__PURE__ */ new Map();
  }
  getOrCreateInjector(t, n, r, o) {
    if (!this.cachedInjectors.has(t)) {
      const s = r.length > 0 ? oh(r, n, o) : null;
      this.cachedInjectors.set(t, s);
    }
    return this.cachedInjectors.get(t);
  }
  ngOnDestroy() {
    try {
      for (const t of this.cachedInjectors.values())
        t !== null && t.destroy();
    } finally {
      this.cachedInjectors.clear();
    }
  }
  static {
    this.ɵprov = ne({
      token: Ua,
      providedIn: "environment",
      factory: /* @__PURE__ */ i(() => new Ua(), "factory")
    });
  }
}
const Da = "__ngAsyncComponentMetadataFn__";
function W1(e) {
  return e[Da] ?? null;
}
i(W1, "getAsyncClassMetadataFn");
function q1(e, t, n) {
  const r = e;
  return r[Da] = () => Promise.all(t()).then((o) => (n(...o), r[Da] = null, o)), r[Da];
}
i(q1, "setClassMetadataAsync");
function Xe(e, t, n, r) {
  return tn(() => {
    const o = e;
    t !== null && (o.hasOwnProperty("decorators") && o.decorators !== void 0 ? o.decorators.push(...t) : o.decorators = t), n !== null && (o.ctorParameters = n), r !== null && (o.hasOwnProperty("propDecorators") && o.propDecorators !== void 0 ? o.propDecorators = { ...o.propDecorators, ...r } : o.propDecorators = r);
  });
}
i(Xe, "setClassMetadata");
class xt {
  static {
    i(this, "PendingTasks");
  }
  constructor() {
    this.taskId = 0, this.pendingTasks = /* @__PURE__ */ new Set(), this.hasPendingTasks = new kw(!1);
  }
  get _hasPendingTasks() {
    return this.hasPendingTasks.value;
  }
  add() {
    this._hasPendingTasks || this.hasPendingTasks.next(!0);
    const t = this.taskId++;
    return this.pendingTasks.add(t), t;
  }
  remove(t) {
    this.pendingTasks.delete(t), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1);
  }
  ngOnDestroy() {
    this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1);
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || xt)();
    }, "PendingTasks_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: xt, factory: xt.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(xt, [{
  type: he,
  args: [{ providedIn: "root" }]
}], null, null);
function za(e) {
  return ih(e) ? Array.isArray(e) || !(e instanceof Map) && // JS Map are iterables but return entries as [k, v]
  Symbol.iterator in e : !1;
}
i(za, "isListLikeIterable");
function Q1(e, t, n) {
  const r = e[Symbol.iterator](), o = t[Symbol.iterator]();
  for (; ; ) {
    const s = r.next(), a = o.next();
    if (s.done && a.done)
      return !0;
    if (s.done || a.done || !n(s.value, a.value))
      return !1;
  }
}
i(Q1, "areIterablesEqual");
function Z1(e, t) {
  if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      t(e[n]);
  else {
    const n = e[Symbol.iterator]();
    let r;
    for (; !(r = n.next()).done; )
      t(r.value);
  }
}
i(Z1, "iterateListLike");
function ih(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
i(ih, "isJsObject");
function sh(e, t) {
  const n = za(e), r = za(t);
  return n && r ? Q1(e, t, sh) : !n && (e && (typeof e == "object" || typeof e == "function")) && !r && (t && (typeof t == "object" || typeof t == "function")) ? !0 : Object.is(e, t);
}
i(sh, "devModeEqual");
function un(e, t, n) {
  return e[t] = n;
}
i(un, "updateBinding");
function Rs(e, t) {
  return ngDevMode && be(e, t), ngDevMode && $r(e[t], F, "Stored value should never be NO_CHANGE."), e[t];
}
i(Rs, "getBinding");
function we(e, t, n) {
  ngDevMode && $r(n, F, "Incoming value should never be NO_CHANGE."), ngDevMode && Zn(t, e.length, "Slot should have been initialized to NO_CHANGE");
  const r = e[t];
  if (Object.is(r, n))
    return !1;
  if (ngDevMode && Br()) {
    const o = r !== F ? r : void 0;
    if (!sh(o, n)) {
      const s = yT(e, t, o, n);
      mT(r === F, s.oldValue, s.newValue, s.propName, e);
    }
    return !1;
  }
  return e[t] = n, !0;
}
i(we, "bindingUpdated");
function br(e, t, n, r) {
  const o = we(e, t, n);
  return we(e, t + 1, r) || o;
}
i(br, "bindingUpdated2");
function tc(e, t, n, r, o) {
  const s = br(e, t, n, r);
  return we(e, t + 2, o) || s;
}
i(tc, "bindingUpdated3");
function Mt(e, t, n, r, o, s) {
  const a = br(e, t, n, r);
  return br(e, t + 2, o, s) || a;
}
i(Mt, "bindingUpdated4");
function xs(e) {
  return (e.flags & 32) === 32;
}
i(xs, "isDetachedByI18n");
function Y1(e, t, n, r, o, s, a, u, c) {
  ngDevMode && st(t), ngDevMode && ngDevMode.firstCreatePass++;
  const l = t.consts, d = Qo(t, e, 4, a || null, Xt(l, u));
  xf(t, n, d, Xt(l, c)), wu(t, d);
  const f = d.tView = Rf(
    2,
    d,
    r,
    o,
    s,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    l,
    null
    /* ssrId */
  );
  return t.queries !== null && (t.queries.template(t, d), f.queries = t.queries.embeddedTView(d)), d;
}
i(Y1, "templateFirstCreatePass");
function So(e, t, n, r, o, s, a, u) {
  const c = y(), l = P(), d = e + A, f = l.firstCreatePass ? Y1(d, l, c, t, n, r, o, s, a) : l.data[d];
  en(f, !1);
  const h = pC(l, c, f, e);
  Is() && ju(l, c, h, f), Le(h, c);
  const p = sI(h, c, h, f);
  return c[d] = p, Hu(c, p), RI(p, f, c), Cu(f) && Nf(l, c, f), a != null && kf(c, f, u), So;
}
i(So, "ɵɵtemplate");
let pC = gC;
function gC(e, t, n, r) {
  return rn(!0), t[N].createComment(ngDevMode ? "container" : "");
}
i(gC, "createContainerAnchorImpl");
function K1(e, t, n, r) {
  const o = t[mt], s = !o || Ho() || xs(n) || Ou(o, r);
  if (rn(s), s)
    return gC(e, t);
  const a = o.data[kl]?.[r] ?? null;
  a !== null && n.tView !== null && (n.tView.ssrId === null ? n.tView.ssrId = a : ngDevMode && O(n.tView.ssrId, a, "Unexpected value of the `ssrId` for this TView"));
  const u = Qu(o, e, t, n);
  ngDevMode && Wu(u, t, n), Au(o, r, u);
  const c = mf(o, r), l = Zu(c, u);
  return ngDevMode && (Os(l, Node.COMMENT_NODE, null, t, n), Go(l)), l;
}
i(K1, "locateOrCreateContainerAnchorImpl");
function J1() {
  pC = K1;
}
i(J1, "enableLocateOrCreateContainerAnchorImpl");
var Ce;
(function(e) {
  e[e.NOT_STARTED = 0] = "NOT_STARTED", e[e.IN_PROGRESS = 1] = "IN_PROGRESS", e[e.COMPLETE = 2] = "COMPLETE", e[e.FAILED = 3] = "FAILED";
})(Ce || (Ce = {}));
const Pg = 0, X1 = 1;
var ge;
(function(e) {
  e[e.Placeholder = 0] = "Placeholder", e[e.Loading = 1] = "Loading", e[e.Complete = 2] = "Complete", e[e.Error = 3] = "Error";
})(ge || (ge = {}));
var To;
(function(e) {
  e[e.Initial = -1] = "Initial";
})(To || (To = {}));
const oo = 0, Ps = 1, pi = 2, Zs = 3, mC = 4, yC = 5;
var Ga;
(function(e) {
  e[e.Manual = 0] = "Manual", e[e.Playthrough = 1] = "Playthrough";
})(Ga || (Ga = {}));
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function nc(e, t, n) {
  const r = e === 1 ? yC : mC;
  t[r] === null && (t[r] = []), t[r].push(n);
}
i(nc, "storeTriggerCleanupFn");
function Xl(e, t) {
  const n = e === 1 ? yC : mC, r = t[n];
  if (r !== null) {
    for (const o of r)
      o();
    t[n] = null;
  }
}
i(Xl, "invokeTriggerCleanupFns");
function DC(e) {
  Xl(1, e), Xl(0, e);
}
i(DC, "invokeAllTriggerCleanupFns");
function rc(e) {
  return e + 1;
}
i(rc, "getDeferBlockDataIndex");
function rr(e, t) {
  const n = e[E], r = rc(t.index);
  return ngDevMode && ms(n, r), e[r];
}
i(rr, "getLDeferBlockDetails");
function eO(e, t, n) {
  const r = e[E], o = rc(t);
  ngDevMode && ms(r, o), e[o] = n;
}
i(eO, "setLDeferBlockDetails");
function vt(e, t) {
  const n = rc(t.index);
  return ngDevMode && ms(e, n), e.data[n];
}
i(vt, "getTDeferBlockDetails");
function tO(e, t, n) {
  const r = rc(t);
  ngDevMode && ms(e, r), e.data[r] = n;
}
i(tO, "setTDeferBlockDetails");
function nO(e, t, n) {
  const r = t[E], o = vt(r, n);
  switch (e) {
    case ge.Complete:
      return o.primaryTmplIndex;
    case ge.Loading:
      return o.loadingTmplIndex;
    case ge.Error:
      return o.errorTmplIndex;
    case ge.Placeholder:
      return o.placeholderTmplIndex;
    default:
      return ngDevMode && T(`Unexpected defer block state: ${e}`), null;
  }
}
i(nO, "getTemplateIndexForState");
function ed(e, t) {
  return t === ge.Placeholder ? e.placeholderBlockConfig?.[Pg] ?? null : t === ge.Loading ? e.loadingBlockConfig?.[Pg] ?? null : null;
}
i(ed, "getMinimumDurationForState");
function vC(e) {
  return e.loadingBlockConfig?.[X1] ?? null;
}
i(vC, "getLoadingBlockAfter");
function Lg(e, t) {
  if (!e || e.length === 0)
    return t;
  const n = new Set(e);
  for (const r of t)
    n.add(r);
  return e.length === n.size ? e : Array.from(n);
}
i(Lg, "addDepsToRegistry");
function rO(e, t) {
  const n = t.primaryTmplIndex + A;
  return Ds(e, n);
}
i(rO, "getPrimaryBlockTNode");
function IC(e) {
  O(e.loadingState, Ce.COMPLETE, "Expecting all deferred dependencies to be loaded.");
}
i(IC, "assertDeferredDependenciesLoaded");
function oO(e) {
  return e !== null && typeof e == "object" && typeof e.primaryTmplIndex == "number";
}
i(oO, "isTDeferBlockDetails");
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Wa = {
  passive: !0,
  capture: !0
}, xc = /* @__PURE__ */ new WeakMap(), Pc = /* @__PURE__ */ new WeakMap(), Gr = /* @__PURE__ */ new WeakMap(), jg = ["click", "keydown"], $g = ["mouseenter", "focusin"];
let Wr = null, Lc = 0;
class ah {
  static {
    i(this, "DeferEventEntry");
  }
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.listener = () => {
      for (const t of this.callbacks)
        t();
    };
  }
}
function CC(e, t) {
  let n = Pc.get(e);
  if (!n) {
    n = new ah(), Pc.set(e, n);
    for (const r of jg)
      e.addEventListener(r, n.listener, Wa);
  }
  return n.callbacks.add(t), () => {
    const { callbacks: r, listener: o } = n;
    if (r.delete(t), r.size === 0) {
      Pc.delete(e);
      for (const s of jg)
        e.removeEventListener(s, o, Wa);
    }
  };
}
i(CC, "onInteraction");
function EC(e, t) {
  let n = xc.get(e);
  if (!n) {
    n = new ah(), xc.set(e, n);
    for (const r of $g)
      e.addEventListener(r, n.listener, Wa);
  }
  return n.callbacks.add(t), () => {
    const { callbacks: r, listener: o } = n;
    if (r.delete(t), r.size === 0) {
      for (const s of $g)
        e.removeEventListener(s, o, Wa);
      xc.delete(e);
    }
  };
}
i(EC, "onHover");
function bC(e, t, n) {
  const r = n.get(de);
  let o = Gr.get(e);
  return Wr = Wr || r.runOutsideAngular(() => new IntersectionObserver((s) => {
    for (const a of s)
      a.isIntersecting && Gr.has(a.target) && r.run(Gr.get(a.target).listener);
  })), o || (o = new ah(), r.runOutsideAngular(() => Wr.observe(e)), Gr.set(e, o), Lc++), o.callbacks.add(t), () => {
    Gr.has(e) && (o.callbacks.delete(t), o.callbacks.size === 0 && (Wr?.unobserve(e), Gr.delete(e), Lc--), Lc === 0 && (Wr?.disconnect(), Wr = null));
  };
}
i(bC, "onViewport");
function iO(e, t, n) {
  if (n == null)
    return e;
  if (n >= 0)
    return tD(n, e);
  const r = e[t.index];
  ngDevMode && it(r);
  const o = r[me] ?? null;
  if (ngDevMode && o !== null) {
    const a = rr(e, t)[Ps];
    O(a, ge.Placeholder, "Expected a placeholder to be rendered in this defer block."), nn(o);
  }
  return o;
}
i(iO, "getTriggerLView");
function sO(e, t) {
  const n = ys(A + t, e);
  return ngDevMode && Qw(n), n;
}
i(sO, "getTriggerElement");
function Ko(e, t, n, r, o, s, a) {
  const u = e[Se];
  function c() {
    if (Il(e))
      return;
    const l = rr(e, t), d = l[Ps];
    if (d !== To.Initial && d !== ge.Placeholder)
      return;
    const f = iO(e, t, r);
    if (!f) {
      Ha(c, { injector: u });
      return;
    }
    if (Il(f))
      return;
    const h = sO(f, n), p = o(h, () => {
      e !== f && Qd(f, p), s();
    }, u);
    e !== f && Eu(f, p), nc(a, l, p);
  }
  i(c, "pollDomTrigger"), Ha(c, { injector: u });
}
i(Ko, "registerDomTrigger");
function wC(e, t) {
  const r = t[Se].get(qa), o = /* @__PURE__ */ i(() => r.remove(e), "cleanupFn");
  return r.add(e), o;
}
i(wC, "onIdle");
const aO = /* @__PURE__ */ i(() => typeof requestIdleCallback < "u" ? requestIdleCallback : setTimeout, "_requestIdleCallback"), uO = /* @__PURE__ */ i(() => typeof requestIdleCallback < "u" ? cancelIdleCallback : clearTimeout, "_cancelIdleCallback");
class qa {
  static {
    i(this, "IdleScheduler");
  }
  constructor() {
    this.executingCallbacks = !1, this.idleId = null, this.current = /* @__PURE__ */ new Set(), this.deferred = /* @__PURE__ */ new Set(), this.ngZone = M(de), this.requestIdleCallbackFn = aO().bind(globalThis), this.cancelIdleCallbackFn = uO().bind(globalThis);
  }
  add(t) {
    (this.executingCallbacks ? this.deferred : this.current).add(t), this.idleId === null && this.scheduleIdleCallback();
  }
  remove(t) {
    const { current: n, deferred: r } = this;
    n.delete(t), r.delete(t), n.size === 0 && r.size === 0 && this.cancelIdleCallback();
  }
  scheduleIdleCallback() {
    const t = /* @__PURE__ */ i(() => {
      this.cancelIdleCallback(), this.executingCallbacks = !0;
      for (const n of this.current)
        n();
      if (this.current.clear(), this.executingCallbacks = !1, this.deferred.size > 0) {
        for (const n of this.deferred)
          this.current.add(n);
        this.deferred.clear(), this.scheduleIdleCallback();
      }
    }, "callback");
    this.idleId = this.requestIdleCallbackFn(() => this.ngZone.run(t));
  }
  cancelIdleCallback() {
    this.idleId !== null && (this.cancelIdleCallbackFn(this.idleId), this.idleId = null);
  }
  ngOnDestroy() {
    this.cancelIdleCallback(), this.current.clear(), this.deferred.clear();
  }
  static {
    this.ɵprov = ne({
      token: qa,
      providedIn: "root",
      factory: /* @__PURE__ */ i(() => new qa(), "factory")
    });
  }
}
function MC(e) {
  return (t, n) => _C(e, t, n);
}
i(MC, "onTimer");
function _C(e, t, n) {
  const o = n[Se].get(Qa), s = /* @__PURE__ */ i(() => o.remove(t), "cleanupFn");
  return o.add(e, t), s;
}
i(_C, "scheduleTimerTrigger");
class Qa {
  static {
    i(this, "TimerScheduler");
  }
  constructor() {
    this.executingCallbacks = !1, this.timeoutId = null, this.invokeTimerAt = null, this.current = [], this.deferred = [];
  }
  add(t, n) {
    const r = this.executingCallbacks ? this.deferred : this.current;
    this.addToQueue(r, Date.now() + t, n), this.scheduleTimer();
  }
  remove(t) {
    const { current: n, deferred: r } = this;
    this.removeFromQueue(n, t) === -1 && this.removeFromQueue(r, t), n.length === 0 && r.length === 0 && this.clearTimeout();
  }
  addToQueue(t, n, r) {
    let o = t.length;
    for (let s = 0; s < t.length; s += 2)
      if (t[s] > n) {
        o = s;
        break;
      }
    Dy(t, o, n, r);
  }
  removeFromQueue(t, n) {
    let r = -1;
    for (let o = 0; o < t.length; o += 2)
      if (t[o + 1] === n) {
        r = o;
        break;
      }
    return r > -1 && Hp(t, r, 2), r;
  }
  scheduleTimer() {
    const t = /* @__PURE__ */ i(() => {
      this.clearTimeout(), this.executingCallbacks = !0;
      const r = [...this.current], o = Date.now();
      for (let a = 0; a < r.length; a += 2) {
        const u = r[a], c = r[a + 1];
        if (u <= o)
          c();
        else
          break;
      }
      let s = -1;
      for (let a = 0; a < this.current.length && this.current[a] <= o; a += 2)
        s = a + 1;
      if (s >= 0 && Hp(this.current, 0, s + 1), this.executingCallbacks = !1, this.deferred.length > 0) {
        for (let a = 0; a < this.deferred.length; a += 2) {
          const u = this.deferred[a], c = this.deferred[a + 1];
          this.addToQueue(this.current, u, c);
        }
        this.deferred.length = 0;
      }
      this.scheduleTimer();
    }, "callback"), n = 16;
    if (this.current.length > 0) {
      const r = Date.now(), o = this.current[0];
      if (this.timeoutId === null || // Reschedule a timer in case a queue contains an item with
      // an earlier timestamp and the delta is more than an average
      // frame duration.
      this.invokeTimerAt && this.invokeTimerAt - o > n) {
        this.clearTimeout();
        const s = Math.max(o - r, n);
        this.invokeTimerAt = o, this.timeoutId = setTimeout(t, s);
      }
    }
  }
  clearTimeout() {
    this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  ngOnDestroy() {
    this.clearTimeout(), this.current.length = 0, this.deferred.length = 0;
  }
  static {
    this.ɵprov = ne({
      token: Qa,
      providedIn: "root",
      factory: /* @__PURE__ */ i(() => new Qa(), "factory")
    });
  }
}
const SC = new $("DEFER_BLOCK_DEPENDENCY_INTERCEPTOR"), TC = new $(ngDevMode ? "DEFER_BLOCK_CONFIG" : "");
function uh(e) {
  return e.get(TC, null, { optional: !0 })?.behavior === Ga.Manual ? !1 : Nt(e);
}
i(uh, "shouldTriggerDeferBlock");
let Za = null;
function AC(e, t, n, r) {
  const o = e.consts;
  n != null && (t.placeholderBlockConfig = Xt(o, n)), r != null && (t.loadingBlockConfig = Xt(o, r)), Za === null && (Za = dO);
}
i(AC, "ɵɵdeferEnableTimerScheduling");
function OC(e, t, n, r, o, s, a, u, c) {
  const l = y(), d = P(), f = e + A;
  if (So(e, null, 0, 0), d.firstCreatePass) {
    St("NgDefer");
    const v = {
      primaryTmplIndex: t,
      loadingTmplIndex: r ?? null,
      placeholderTmplIndex: o ?? null,
      errorTmplIndex: s ?? null,
      placeholderBlockConfig: null,
      loadingBlockConfig: null,
      dependencyResolverFn: n ?? null,
      loadingState: Ce.NOT_STARTED,
      loadingPromise: null,
      providers: null
    };
    c?.(d, v, u, a), tO(d, f, v);
  }
  const h = J(), p = l[f];
  RI(p, h, l);
  const g = [
    null,
    // NEXT_DEFER_BLOCK_STATE
    To.Initial,
    // DEFER_BLOCK_STATE
    null,
    // STATE_IS_FROZEN_UNTIL
    null,
    // LOADING_AFTER_CLEANUP_FN
    null,
    // TRIGGER_CLEANUP_FNS
    null
    // PREFETCH_TRIGGER_CLEANUP_FNS
  ];
  eO(l, f, g);
  const m = /* @__PURE__ */ i(() => DC(g), "cleanupTriggersFn");
  nc(0, g, () => Qd(l, m)), Eu(l, m);
}
i(OC, "ɵɵdefer");
function FC(e) {
  const t = y(), n = Bt();
  if (we(t, n, e)) {
    const r = B(null);
    try {
      const o = !!e, s = ce(), u = rr(t, s)[Ps];
      o === !1 && u === To.Initial ? Jo(t, s) : o === !0 && (u === To.Initial || u === ge.Placeholder) && Xo(t, s);
    } finally {
      B(r);
    }
  }
}
i(FC, "ɵɵdeferWhen");
function NC(e) {
  const t = y(), n = Bt();
  if (we(t, n, e)) {
    const r = B(null);
    try {
      const o = !!e, s = t[E], a = ce(), u = vt(s, a);
      o === !0 && u.loadingState === Ce.NOT_STARTED && Ls(u, t, a);
    } finally {
      B(r);
    }
  }
}
i(NC, "ɵɵdeferPrefetchWhen");
function kC() {
  GC(wC);
}
i(kC, "ɵɵdeferOnIdle");
function RC() {
  WC(wC);
}
i(RC, "ɵɵdeferPrefetchOnIdle");
function xC() {
  const e = y(), t = J(), n = e[E], r = e[Se], o = vt(n, t);
  (!uh(r) || o.loadingTmplIndex === null) && Jo(e, t), Xo(e, t);
}
i(xC, "ɵɵdeferOnImmediate");
function PC() {
  const e = y(), t = J(), n = e[E], r = vt(n, t);
  r.loadingState === Ce.NOT_STARTED && oc(r, e, t);
}
i(PC, "ɵɵdeferPrefetchOnImmediate");
function LC(e) {
  GC(MC(e));
}
i(LC, "ɵɵdeferOnTimer");
function jC(e) {
  WC(MC(e));
}
i(jC, "ɵɵdeferPrefetchOnTimer");
function $C(e, t) {
  const n = y(), r = J();
  Jo(n, r), Ko(
    n,
    r,
    e,
    t,
    EC,
    () => Xo(n, r),
    0
    /* TriggerType.Regular */
  );
}
i($C, "ɵɵdeferOnHover");
function BC(e, t) {
  const n = y(), r = J(), o = n[E], s = vt(o, r);
  s.loadingState === Ce.NOT_STARTED && Ko(
    n,
    r,
    e,
    t,
    EC,
    () => Ls(s, n, r),
    1
    /* TriggerType.Prefetch */
  );
}
i(BC, "ɵɵdeferPrefetchOnHover");
function HC(e, t) {
  const n = y(), r = J();
  Jo(n, r), Ko(
    n,
    r,
    e,
    t,
    CC,
    () => Xo(n, r),
    0
    /* TriggerType.Regular */
  );
}
i(HC, "ɵɵdeferOnInteraction");
function VC(e, t) {
  const n = y(), r = J(), o = n[E], s = vt(o, r);
  s.loadingState === Ce.NOT_STARTED && Ko(
    n,
    r,
    e,
    t,
    CC,
    () => Ls(s, n, r),
    1
    /* TriggerType.Prefetch */
  );
}
i(VC, "ɵɵdeferPrefetchOnInteraction");
function UC(e, t) {
  const n = y(), r = J();
  Jo(n, r), Ko(
    n,
    r,
    e,
    t,
    bC,
    () => Xo(n, r),
    0
    /* TriggerType.Regular */
  );
}
i(UC, "ɵɵdeferOnViewport");
function zC(e, t) {
  const n = y(), r = J(), o = n[E], s = vt(o, r);
  s.loadingState === Ce.NOT_STARTED && Ko(
    n,
    r,
    e,
    t,
    bC,
    () => Ls(s, n, r),
    1
    /* TriggerType.Prefetch */
  );
}
i(zC, "ɵɵdeferPrefetchOnViewport");
function GC(e) {
  const t = y(), n = J();
  if (Jo(t, n), Nt(t[Se])) {
    const r = e(() => Xo(t, n), t), o = rr(t, n);
    nc(0, o, r);
  }
}
i(GC, "scheduleDelayedTrigger");
function WC(e) {
  const t = y();
  if (Nt(t[Se])) {
    const n = J(), r = t[E], o = vt(r, n);
    if (o.loadingState === Ce.NOT_STARTED) {
      const s = rr(t, n), u = e(/* @__PURE__ */ i(() => Ls(o, t, n), "prefetch"), t);
      nc(1, s, u);
    }
  }
}
i(WC, "scheduleDelayedPrefetching");
function hn(e, t, n, r = !1) {
  const o = n[Ee], s = o[E];
  if (Il(o))
    return;
  ngDevMode && Ke(t, o);
  const a = rr(o, t);
  ngDevMode && b(a, "Expected a defer block state defined");
  const u = a[Ps];
  if (Hg(u, e) && Hg(a[oo] ?? -1, e)) {
    const c = o[Se], l = vt(s, t), d = !r && Nt(c) && (vC(l) !== null || ed(l, ge.Loading) !== null || ed(l, ge.Placeholder));
    ngDevMode && d && b(Za, "Expected scheduling function to be defined");
    const f = d ? Za : qC;
    try {
      f(e, a, n, t, o);
    } catch (h) {
      Vu(o, h);
    }
  }
}
i(hn, "renderDeferBlockState");
function cO(e) {
  return e instanceof Ju && typeof e.injector.__ngOutletInjector == "function";
}
i(cO, "isRouterOutletInjector");
function lO(e, t) {
  return e.injector.__ngOutletInjector(t);
}
i(lO, "createRouterOutletInjector");
function qC(e, t, n, r, o) {
  const s = nO(e, o, r);
  if (s !== null) {
    t[Ps] = e;
    const a = o[E], u = s + A, c = Ds(a, u), l = 0;
    jf(n, l);
    let d;
    if (e === ge.Complete) {
      const p = vt(a, r), g = p.providers;
      if (g && g.length > 0) {
        const m = o[Se], v = cO(m), C = v ? m : m.get(Lt);
        d = C.get(Ua).getOrCreateInjector(p, C, g, ngDevMode ? "DeferBlock Injector" : ""), v && (d = lO(m, d));
      }
    }
    const f = Mo(n, c.tView.ssrId), h = Ss(o, c, null, { dehydratedView: f, injector: d });
    Ts(n, h, l, bo(c, f)), As(h);
  }
}
i(qC, "applyDeferBlockState");
function dO(e, t, n, r, o) {
  const s = Date.now(), a = o[E], u = vt(a, r);
  if (t[pi] === null || t[pi] <= s) {
    t[pi] = null;
    const c = vC(u), l = t[Zs] !== null;
    if (e === ge.Loading && c !== null && !l) {
      t[oo] = e;
      const d = Bg(c, t, r, n, o);
      t[Zs] = d;
    } else {
      e > ge.Loading && l && (t[Zs](), t[Zs] = null, t[oo] = null), qC(e, t, n, r, o);
      const d = ed(u, e);
      d !== null && (t[pi] = s + d, Bg(d, t, r, n, o));
    }
  } else
    t[oo] = e;
}
i(dO, "applyDeferBlockStateWithScheduling");
function Bg(e, t, n, r, o) {
  return _C(e, /* @__PURE__ */ i(() => {
    const a = t[oo];
    t[pi] = null, t[oo] = null, a !== null && hn(a, n, r);
  }, "callback"), o);
}
i(Bg, "scheduleDeferBlockUpdate");
function Hg(e, t) {
  return e < t;
}
i(Hg, "isValidStateChange");
function Ls(e, t, n) {
  t[Se] && uh(t[Se]) && oc(e, t, n);
}
i(Ls, "triggerPrefetching");
function oc(e, t, n) {
  const r = t[Se], o = t[E];
  if (e.loadingState !== Ce.NOT_STARTED)
    return e.loadingPromise ?? Promise.resolve();
  const s = rr(t, n), a = rO(o, e);
  e.loadingState = Ce.IN_PROGRESS, Xl(1, s);
  let u = e.dependencyResolverFn;
  if (ngDevMode) {
    const d = r.get(SC, null, { optional: !0 });
    d && (u = d.intercept(u));
  }
  const c = r.get(xt), l = c.add();
  return u ? (e.loadingPromise = Promise.allSettled(u()).then((d) => {
    let f = !1;
    const h = [], p = [];
    for (const g of d)
      if (g.status === "fulfilled") {
        const m = g.value, v = U(m) || Ne(m);
        if (v)
          h.push(v);
        else {
          const C = ft(m);
          C && p.push(C);
        }
      } else {
        f = !0;
        break;
      }
    if (e.loadingPromise = null, c.remove(l), f) {
      if (e.loadingState = Ce.FAILED, e.errorTmplIndex === null) {
        const g = Ru(t), m = new I(750, ngDevMode && `Loading dependencies for \`@defer\` block failed, but no \`@error\` block was configured${g}. Consider using the \`@error\` block to render an error state.`);
        Vu(t, m);
      }
    } else {
      e.loadingState = Ce.COMPLETE;
      const g = a.tView;
      if (h.length > 0) {
        g.directiveRegistry = Lg(g.directiveRegistry, h);
        const m = h.map((C) => C.type), v = xd(!1, ...m);
        e.providers = v;
      }
      p.length > 0 && (g.pipeRegistry = Lg(g.pipeRegistry, p));
    }
  }), e.loadingPromise) : (e.loadingPromise = Promise.resolve().then(() => {
    e.loadingPromise = null, e.loadingState = Ce.COMPLETE, c.remove(l);
  }), e.loadingPromise);
}
i(oc, "triggerResourceLoading");
function Jo(e, t) {
  const n = e[t.index];
  ngDevMode && it(n), hn(ge.Placeholder, t, n);
}
i(Jo, "renderPlaceholder");
function Vg(e, t, n) {
  ngDevMode && b(e.loadingPromise, "Expected loading Promise to exist on this defer block"), e.loadingPromise.then(() => {
    e.loadingState === Ce.COMPLETE ? (ngDevMode && IC(e), hn(ge.Complete, t, n)) : e.loadingState === Ce.FAILED && hn(ge.Error, t, n);
  });
}
i(Vg, "renderDeferStateAfterResourceLoading");
function Xo(e, t) {
  const n = e[E], r = e[t.index], o = e[Se];
  if (ngDevMode && it(r), !uh(o))
    return;
  const s = rr(e, t), a = vt(n, t);
  switch (DC(s), a.loadingState) {
    case Ce.NOT_STARTED:
      hn(ge.Loading, t, r), oc(a, e, t), a.loadingState === Ce.IN_PROGRESS && Vg(a, t, r);
      break;
    case Ce.IN_PROGRESS:
      hn(ge.Loading, t, r), Vg(a, t, r);
      break;
    case Ce.COMPLETE:
      ngDevMode && IC(a), hn(ge.Complete, t, r);
      break;
    case Ce.FAILED:
      hn(ge.Error, t, r);
      break;
    default:
      ngDevMode && T("Unknown defer block state");
  }
}
i(Xo, "triggerDeferBlock");
function ch(e, t, n, r) {
  const o = y(), s = Bt();
  if (we(o, s, t)) {
    const a = P(), u = ce();
    an(u, o, e, t, n, r), ngDevMode && Ie(a.data, u, "attr." + e, s);
  }
  return ch;
}
i(ch, "ɵɵattribute");
function ei(e, t) {
  ngDevMode && Zn(2, t.length, "should have at least 3 values"), ngDevMode && O(t.length % 2, 1, "should have an odd number of values");
  let n = !1, r = ee();
  for (let s = 1; s < t.length; s += 2)
    n = we(e, r++, t[s]) || n;
  if (cD(r), !n)
    return F;
  let o = t[0];
  for (let s = 1; s < t.length; s += 2)
    o += j(t[s]) + t[s + 1];
  return o;
}
i(ei, "interpolationV");
function ti(e, t, n, r) {
  return we(e, Bt(), n) ? t + j(n) + r : F;
}
i(ti, "interpolation1");
function ni(e, t, n, r, o, s) {
  const a = ee(), u = br(e, a, n, o);
  return Mn(2), u ? t + j(n) + r + j(o) + s : F;
}
i(ni, "interpolation2");
function ri(e, t, n, r, o, s, a, u) {
  const c = ee(), l = tc(e, c, n, o, a);
  return Mn(3), l ? t + j(n) + r + j(o) + s + j(a) + u : F;
}
i(ri, "interpolation3");
function oi(e, t, n, r, o, s, a, u, c, l) {
  const d = ee(), f = Mt(e, d, n, o, a, c);
  return Mn(4), f ? t + j(n) + r + j(o) + s + j(a) + u + j(c) + l : F;
}
i(oi, "interpolation4");
function ii(e, t, n, r, o, s, a, u, c, l, d, f) {
  const h = ee();
  let p = Mt(e, h, n, o, a, c);
  return p = we(e, h + 4, d) || p, Mn(5), p ? t + j(n) + r + j(o) + s + j(a) + u + j(c) + l + j(d) + f : F;
}
i(ii, "interpolation5");
function si(e, t, n, r, o, s, a, u, c, l, d, f, h, p) {
  const g = ee();
  let m = Mt(e, g, n, o, a, c);
  return m = br(e, g + 4, d, h) || m, Mn(6), m ? t + j(n) + r + j(o) + s + j(a) + u + j(c) + l + j(d) + f + j(h) + p : F;
}
i(si, "interpolation6");
function ai(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m) {
  const v = ee();
  let C = Mt(e, v, n, o, a, c);
  return C = tc(e, v + 4, d, h, g) || C, Mn(7), C ? t + j(n) + r + j(o) + s + j(a) + u + j(c) + l + j(d) + f + j(h) + p + j(g) + m : F;
}
i(ai, "interpolation7");
function ui(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C) {
  const D = ee();
  let _ = Mt(e, D, n, o, a, c);
  return _ = Mt(e, D + 4, d, h, g, v) || _, Mn(8), _ ? t + j(n) + r + j(o) + s + j(a) + u + j(c) + l + j(d) + f + j(h) + p + j(g) + m + j(v) + C : F;
}
i(ui, "interpolation8");
function lh(e, t, n, r, o, s) {
  const a = y(), u = ti(a, t, n, r);
  if (u !== F) {
    const c = ce();
    an(c, a, e, u, o, s), ngDevMode && Ie(P().data, c, "attr." + e, ee() - 1, t, r);
  }
  return lh;
}
i(lh, "ɵɵattributeInterpolate1");
function dh(e, t, n, r, o, s, a, u) {
  const c = y(), l = ni(c, t, n, r, o, s);
  if (l !== F) {
    const d = ce();
    an(d, c, e, l, a, u), ngDevMode && Ie(P().data, d, "attr." + e, ee() - 2, t, r, s);
  }
  return dh;
}
i(dh, "ɵɵattributeInterpolate2");
function fh(e, t, n, r, o, s, a, u, c, l) {
  const d = y(), f = ri(d, t, n, r, o, s, a, u);
  if (f !== F) {
    const h = ce();
    an(h, d, e, f, c, l), ngDevMode && Ie(P().data, h, "attr." + e, ee() - 3, t, r, s, u);
  }
  return fh;
}
i(fh, "ɵɵattributeInterpolate3");
function hh(e, t, n, r, o, s, a, u, c, l, d, f) {
  const h = y(), p = oi(h, t, n, r, o, s, a, u, c, l);
  if (p !== F) {
    const g = ce();
    an(g, h, e, p, d, f), ngDevMode && Ie(P().data, g, "attr." + e, ee() - 4, t, r, s, u, l);
  }
  return hh;
}
i(hh, "ɵɵattributeInterpolate4");
function ph(e, t, n, r, o, s, a, u, c, l, d, f, h, p) {
  const g = y(), m = ii(g, t, n, r, o, s, a, u, c, l, d, f);
  if (m !== F) {
    const v = ce();
    an(v, g, e, m, h, p), ngDevMode && Ie(P().data, v, "attr." + e, ee() - 5, t, r, s, u, l, f);
  }
  return ph;
}
i(ph, "ɵɵattributeInterpolate5");
function gh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m) {
  const v = y(), C = si(v, t, n, r, o, s, a, u, c, l, d, f, h, p);
  if (C !== F) {
    const D = ce();
    an(D, v, e, C, g, m), ngDevMode && Ie(P().data, D, "attr." + e, ee() - 6, t, r, s, u, l, f, p);
  }
  return gh;
}
i(gh, "ɵɵattributeInterpolate6");
function mh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C) {
  const D = y(), _ = ai(D, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m);
  if (_ !== F) {
    const R = ce();
    an(R, D, e, _, v, C), ngDevMode && Ie(P().data, R, "attr." + e, ee() - 7, t, r, s, u, l, f, p, m);
  }
  return mh;
}
i(mh, "ɵɵattributeInterpolate7");
function yh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C, D, _) {
  const R = y(), W = ui(R, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C);
  if (W !== F) {
    const le = ce();
    an(le, R, e, W, D, _), ngDevMode && Ie(P().data, le, "attr." + e, ee() - 8, t, r, s, u, l, f, p, m, C);
  }
  return yh;
}
i(yh, "ɵɵattributeInterpolate8");
function Dh(e, t, n, r) {
  const o = y(), s = ei(o, t);
  if (s !== F) {
    const a = ce();
    if (an(a, o, e, s, n, r), ngDevMode) {
      const u = [t[0]];
      for (let c = 2; c < t.length; c += 2)
        u.push(t[c]);
      Ie(P().data, a, "attr." + e, ee() - u.length + 1, ...u);
    }
  }
  return Dh;
}
i(Dh, "ɵɵattributeInterpolateV");
function Ys(e, t) {
  return ngDevMode && ki(
    e,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), ngDevMode && ki(
    t,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), e << 17 | t << 2;
}
i(Ys, "toTStylingRange");
function wr(e) {
  return ngDevMode && X(e, "expected number"), e >> 17 & 32767;
}
i(wr, "getTStylingRangePrev");
function fO(e) {
  return ngDevMode && X(e, "expected number"), (e & 2) == 2;
}
i(fO, "getTStylingRangePrevDuplicate");
function hO(e, t) {
  return ngDevMode && X(e, "expected number"), ngDevMode && ki(
    t,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), e & 131071 | t << 17;
}
i(hO, "setTStylingRangePrev");
function td(e) {
  return ngDevMode && X(e, "expected number"), e | 2;
}
i(td, "setTStylingRangePrevDuplicate");
function Mr(e) {
  return ngDevMode && X(e, "expected number"), (e & 131068) >> 2;
}
i(Mr, "getTStylingRangeNext");
function jc(e, t) {
  return ngDevMode && X(e, "expected number"), ngDevMode && ki(
    t,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), e & -131069 | //
  t << 2;
}
i(jc, "setTStylingRangeNext");
function pO(e) {
  return ngDevMode && X(e, "expected number"), (e & 1) === 1;
}
i(pO, "getTStylingRangeNextDuplicate");
function nd(e) {
  return ngDevMode && X(e, "expected number"), e | 1;
}
i(nd, "setTStylingRangeNextDuplicate");
function gO(e, t, n, r, o, s) {
  ngDevMode && Ud(P());
  let a = s ? t.classBindings : t.styleBindings, u = wr(a), c = Mr(a);
  e[r] = n;
  let l = !1, d;
  if (Array.isArray(n)) {
    const f = n;
    d = f[1], (d === null || hs(f, d) > 0) && (l = !0);
  } else
    d = n;
  if (o)
    if (c !== 0) {
      const h = wr(e[u + 1]);
      e[r + 1] = Ys(h, u), h !== 0 && (e[h + 1] = jc(e[h + 1], r)), e[u + 1] = hO(e[u + 1], r);
    } else
      e[r + 1] = Ys(u, 0), u !== 0 && (e[u + 1] = jc(e[u + 1], r)), u = r;
  else
    e[r + 1] = Ys(c, 0), ngDevMode && O(u !== 0 && c === 0, !1, "Adding template bindings after hostBindings is not allowed."), u === 0 ? u = r : e[c + 1] = jc(e[c + 1], r), c = r;
  l && (e[r + 1] = td(e[r + 1])), Ug(e, d, r, !0), Ug(e, d, r, !1), mO(t, d, e, r, s), a = Ys(u, c), s ? t.classBindings = a : t.styleBindings = a;
}
i(gO, "insertTStylingBinding");
function mO(e, t, n, r, o) {
  const s = o ? e.residualClasses : e.residualStyles;
  s != null && typeof t == "string" && hs(s, t) >= 0 && (n[r + 1] = nd(n[r + 1]));
}
i(mO, "markDuplicateOfResidualStyling");
function Ug(e, t, n, r) {
  const o = e[n + 1], s = t === null;
  let a = r ? wr(o) : Mr(o), u = !1;
  for (; a !== 0 && (u === !1 || s); ) {
    ngDevMode && be(e, a);
    const c = e[a], l = e[a + 1];
    yO(c, t) && (u = !0, e[a + 1] = r ? nd(l) : td(l)), a = r ? wr(l) : Mr(l);
  }
  u && (e[n + 1] = r ? td(o) : nd(o));
}
i(Ug, "markDuplicates");
function yO(e, t) {
  return ngDevMode && $t(Array.isArray(t), !0, "Expected that 'tStylingKey' has been unwrapped"), e === null || // If the cursor is `null` it means that we have map at that
  // location so we must assume that we have a match.
  t == null || // If `tStylingKey` is `null` then it is a map therefor assume that it
  // contains a match.
  (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? hs(e, t) >= 0 : !1;
}
i(yO, "isStylingMatch");
const Ae = {
  textEnd: 0,
  key: 0,
  keyEnd: 0,
  value: 0,
  valueEnd: 0
};
function QC(e) {
  return e.substring(Ae.key, Ae.keyEnd);
}
i(QC, "getLastParsedKey");
function DO(e) {
  return e.substring(Ae.value, Ae.valueEnd);
}
i(DO, "getLastParsedValue");
function vO(e) {
  return KC(e), ZC(e, Ao(e, 0, Ae.textEnd));
}
i(vO, "parseClassName");
function ZC(e, t) {
  const n = Ae.textEnd;
  return n === t ? -1 : (t = Ae.keyEnd = CO(e, Ae.key = t, n), Ao(e, t, n));
}
i(ZC, "parseClassNameNext");
function IO(e) {
  return KC(e), YC(e, Ao(e, 0, Ae.textEnd));
}
i(IO, "parseStyle");
function YC(e, t) {
  const n = Ae.textEnd;
  let r = Ae.key = Ao(e, t, n);
  return n === r ? -1 : (r = Ae.keyEnd = EO(e, r, n), r = zg(
    e,
    r,
    n,
    58
    /* CharCode.COLON */
  ), r = Ae.value = Ao(e, r, n), r = Ae.valueEnd = bO(e, r, n), zg(
    e,
    r,
    n,
    59
    /* CharCode.SEMI_COLON */
  ));
}
i(YC, "parseStyleNext");
function KC(e) {
  Ae.key = 0, Ae.keyEnd = 0, Ae.value = 0, Ae.valueEnd = 0, Ae.textEnd = e.length;
}
i(KC, "resetParserState");
function Ao(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; )
    t++;
  return t;
}
i(Ao, "consumeWhitespace");
function CO(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; )
    t++;
  return t;
}
i(CO, "consumeClassToken");
function EO(e, t, n) {
  let r;
  for (; t < n && ((r = e.charCodeAt(t)) === 45 || r === 95 || (r & -33) >= 65 && (r & -33) <= 90 || r >= 48 && r <= 57); )
    t++;
  return t;
}
i(EO, "consumeStyleKey");
function zg(e, t, n, r) {
  return t = Ao(e, t, n), t < n && (ngDevMode && e.charCodeAt(t) !== r && JC(e, String.fromCharCode(r), t), t++), t;
}
i(zg, "consumeSeparator");
function bO(e, t, n) {
  let r = -1, o = -1, s = -1, a = t, u = a;
  for (; a < n; ) {
    const c = e.charCodeAt(a++);
    if (c === 59)
      return u;
    c === 34 || c === 39 ? u = a = Gg(e, c, a, n) : t === a - 4 && // We have seen only 4 characters so far "URL(" (Ignore "foo_URL()")
    s === 85 && o === 82 && r === 76 && c === 40 ? u = a = Gg(e, 41, a, n) : c > 32 && (u = a), s = o, o = r, r = c & -33;
  }
  return u;
}
i(bO, "consumeStyleValue");
function Gg(e, t, n, r) {
  let o = -1, s = n;
  for (; s < r; ) {
    const a = e.charCodeAt(s++);
    if (a == t && o !== 92)
      return s;
    a == 92 && o === 92 ? o = 0 : o = a;
  }
  throw ngDevMode ? JC(e, String.fromCharCode(t), r) : new Error();
}
i(Gg, "consumeQuotedText");
function JC(e, t, n) {
  throw ngDevMode && O(typeof e == "string", !0, "String expected here"), T(`Malformed style at location ${n} in string '` + e.substring(0, n) + "[>>" + e.substring(n, n + 1) + "<<]" + e.slice(n + 1) + `'. Expecting '${t}'.`);
}
i(JC, "malformedStyleError");
function vh(e, t, n) {
  const r = y(), o = Bt();
  if (we(r, o, t)) {
    const s = P(), a = ce();
    at(s, a, r, e, t, r[N], n, !1), ngDevMode && Ie(s.data, a, e, o);
  }
  return vh;
}
i(vh, "ɵɵproperty");
function rd(e, t, n, r, o) {
  const s = t.inputs, a = o ? "class" : "style";
  Lf(e, n, s[a], a, r);
}
i(rd, "setDirectiveInputsWhichShadowsStyling");
function Ih(e, t, n) {
  return Vt(e, t, n, !1), Ih;
}
i(Ih, "ɵɵstyleProp");
function Ch(e, t) {
  return Vt(e, t, null, !0), Ch;
}
i(Ch, "ɵɵclassProp");
function Ht(e) {
  Ut(nE, wO, e, !1);
}
i(Ht, "ɵɵstyleMap");
function wO(e, t) {
  for (let n = IO(t); n >= 0; n = YC(t, n))
    nE(e, QC(t), DO(t));
}
i(wO, "styleStringParser");
function XC(e) {
  Ut(OO, cn, e, !0);
}
i(XC, "ɵɵclassMap");
function cn(e, t) {
  for (let n = vO(t); n >= 0; n = ZC(t, n))
    Dt(e, QC(t), !0);
}
i(cn, "classStringParser");
function Vt(e, t, n, r) {
  const o = y(), s = P(), a = Mn(2);
  if (s.firstUpdatePass && tE(s, e, a, r), t !== F && we(o, a, t)) {
    const u = s.data[Ve()];
    rE(s, u, o, o[N], e, o[a + 1] = NO(t, n), r, a);
  }
}
i(Vt, "checkStylingProperty");
function Ut(e, t, n, r) {
  const o = P(), s = Mn(2);
  o.firstUpdatePass && tE(o, null, s, r);
  const a = y();
  if (n !== F && we(a, s, n)) {
    const u = o.data[Ve()];
    if (oE(u, r) && !eE(o, s)) {
      if (ngDevMode) {
        const l = o.data[s];
        O(Array.isArray(l) ? l[1] : l, !1, "Styling linked list shadow input should be marked as 'false'");
      }
      let c = r ? u.classesWithoutHost : u.stylesWithoutHost;
      ngDevMode && r === !1 && c !== null && O(c.endsWith(";"), !0, "Expecting static portion to end with ';'"), c !== null && (n = ll(c, n || "")), rd(o, u, a, n, r);
    } else
      FO(o, u, a, a[N], a[s + 1], a[s + 1] = AO(e, t, n), r, s);
  }
}
i(Ut, "checkStylingMap");
function eE(e, t) {
  return t >= e.expandoStartIndex;
}
i(eE, "isInHostBindings");
function tE(e, t, n, r) {
  ngDevMode && Ud(e);
  const o = e.data;
  if (o[n + 1] === null) {
    const s = o[Ve()];
    ngDevMode && b(s, "TNode expected");
    const a = eE(e, n);
    oE(s, r) && t === null && !a && (t = !1), t = MO(o, s, t, r), gO(o, s, t, n, a, r);
  }
}
i(tE, "stylingFirstUpdatePass");
function MO(e, t, n, r) {
  const o = Kd(e);
  let s = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 && (n = $c(null, e, t, n, r), n = Ki(n, t.attrs, r), s = null);
  else {
    const a = t.directiveStylingLast;
    if (a === -1 || e[a] !== o)
      if (n = $c(o, e, t, n, r), s === null) {
        let c = _O(e, t, r);
        c !== void 0 && Array.isArray(c) && (c = $c(null, e, t, c[1], r), c = Ki(c, t.attrs, r), SO(e, t, r, c));
      } else
        s = TO(e, t, r);
  }
  return s !== void 0 && (r ? t.residualClasses = s : t.residualStyles = s), n;
}
i(MO, "wrapInStaticStylingKey");
function _O(e, t, n) {
  const r = n ? t.classBindings : t.styleBindings;
  if (Mr(r) !== 0)
    return e[wr(r)];
}
i(_O, "getTemplateHeadTStylingKey");
function SO(e, t, n, r) {
  const o = n ? t.classBindings : t.styleBindings;
  ngDevMode && $t(Mr(o), 0, "Expecting to have at least one template styling binding."), e[wr(o)] = r;
}
i(SO, "setTemplateHeadTStylingKey");
function TO(e, t, n) {
  let r;
  const o = t.directiveEnd;
  ngDevMode && $t(t.directiveStylingLast, -1, "By the time this function gets called at least one hostBindings-node styling instruction must have executed.");
  for (let s = 1 + t.directiveStylingLast; s < o; s++) {
    const a = e[s].hostAttrs;
    r = Ki(r, a, n);
  }
  return Ki(r, t.attrs, n);
}
i(TO, "collectResidual");
function $c(e, t, n, r, o) {
  let s = null;
  const a = n.directiveEnd;
  let u = n.directiveStylingLast;
  for (u === -1 ? u = n.directiveStart : u++; u < a && (s = t[u], ngDevMode && b(s, "expected to be defined"), r = Ki(r, s.hostAttrs, o), s !== e); )
    u++;
  return e !== null && (n.directiveStylingLast = u), r;
}
i($c, "collectStylingFromDirectives");
function Ki(e, t, n) {
  const r = n ? 1 : 2;
  let o = -1;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      const a = t[s];
      typeof a == "number" ? o = a : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), Dt(e, a, n ? !0 : t[++s]));
    }
  return e === void 0 ? null : e;
}
i(Ki, "collectStylingFromTAttrs");
function AO(e, t, n) {
  if (n == null || n === "")
    return Q;
  const r = [], o = sn(n);
  if (Array.isArray(o))
    for (let s = 0; s < o.length; s++)
      e(r, o[s], !0);
  else if (typeof o == "object")
    for (const s in o)
      o.hasOwnProperty(s) && e(r, s, o[s]);
  else typeof o == "string" ? t(r, o) : ngDevMode && T("Unsupported styling type " + typeof o + ": " + o);
  return r;
}
i(AO, "toStylingKeyValueArray");
function nE(e, t, n) {
  Dt(e, t, sn(n));
}
i(nE, "styleKeyValueArraySet");
function OO(e, t, n) {
  const r = String(t);
  r !== "" && !r.includes(" ") && Dt(e, r, n);
}
i(OO, "classKeyValueArraySet");
function FO(e, t, n, r, o, s, a, u) {
  o === F && (o = Q);
  let c = 0, l = 0, d = 0 < o.length ? o[0] : null, f = 0 < s.length ? s[0] : null;
  for (; d !== null || f !== null; ) {
    ngDevMode && Zn(c, 999, "Are we stuck in infinite loop?"), ngDevMode && Zn(l, 999, "Are we stuck in infinite loop?");
    const h = c < o.length ? o[c + 1] : void 0, p = l < s.length ? s[l + 1] : void 0;
    let g = null, m;
    d === f ? (c += 2, l += 2, h !== p && (g = f, m = p)) : f === null || d !== null && d < f ? (c += 2, g = d) : (ngDevMode && b(f, "Expecting to have a valid key"), l += 2, g = f, m = p), g !== null && rE(e, t, n, r, g, m, a, u), d = c < o.length ? o[c] : null, f = l < s.length ? s[l] : null;
  }
}
i(FO, "updateStylingMap");
function rE(e, t, n, r, o, s, a, u) {
  if (!(t.type & 3))
    return;
  const c = e.data, l = c[u + 1], d = pO(l) ? Wg(c, t, n, o, Mr(l), a) : void 0;
  if (!Ya(d)) {
    Ya(s) || fO(l) && (s = Wg(c, null, n, o, u, a));
    const f = ys(Ve(), n);
    TT(r, a, f, o, s);
  }
}
i(rE, "updateStyling");
function Wg(e, t, n, r, o, s) {
  const a = t === null;
  let u;
  for (; o > 0; ) {
    const c = e[o], l = Array.isArray(c), d = l ? c[1] : c, f = d === null;
    let h = n[o + 1];
    h === F && (h = f ? Q : void 0);
    let p = f ? wc(h, r) : d === r ? h : void 0;
    if (l && !Ya(p) && (p = wc(c, r)), Ya(p) && (u = p, a))
      return u;
    const g = e[o + 1];
    o = a ? wr(g) : Mr(g);
  }
  if (t !== null) {
    let c = s ? t.residualClasses : t.residualStyles;
    c != null && (u = wc(c, r));
  }
  return u;
}
i(Wg, "findStylingValue");
function Ya(e) {
  return e !== void 0;
}
i(Ya, "isStylingValuePresent");
function NO(e, t) {
  return e == null || e === "" || (typeof t == "string" ? e = e + t : typeof e == "object" && (e = Z(sn(e)))), e;
}
i(NO, "normalizeSuffix");
function oE(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
i(oE, "hasStylingInputShadow");
function iE(e, t, n) {
  const r = y(), o = ti(r, e, t, n);
  Ut(Dt, cn, o, !0);
}
i(iE, "ɵɵclassMapInterpolate1");
function sE(e, t, n, r, o) {
  const s = y(), a = ni(s, e, t, n, r, o);
  Ut(Dt, cn, a, !0);
}
i(sE, "ɵɵclassMapInterpolate2");
function aE(e, t, n, r, o, s, a) {
  const u = y(), c = ri(u, e, t, n, r, o, s, a);
  Ut(Dt, cn, c, !0);
}
i(aE, "ɵɵclassMapInterpolate3");
function uE(e, t, n, r, o, s, a, u, c) {
  const l = y(), d = oi(l, e, t, n, r, o, s, a, u, c);
  Ut(Dt, cn, d, !0);
}
i(uE, "ɵɵclassMapInterpolate4");
function cE(e, t, n, r, o, s, a, u, c, l, d) {
  const f = y(), h = ii(f, e, t, n, r, o, s, a, u, c, l, d);
  Ut(Dt, cn, h, !0);
}
i(cE, "ɵɵclassMapInterpolate5");
function lE(e, t, n, r, o, s, a, u, c, l, d, f, h) {
  const p = y(), g = si(p, e, t, n, r, o, s, a, u, c, l, d, f, h);
  Ut(Dt, cn, g, !0);
}
i(lE, "ɵɵclassMapInterpolate6");
function dE(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g) {
  const m = y(), v = ai(m, e, t, n, r, o, s, a, u, c, l, d, f, h, p, g);
  Ut(Dt, cn, v, !0);
}
i(dE, "ɵɵclassMapInterpolate7");
function fE(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v) {
  const C = y(), D = ui(C, e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v);
  Ut(Dt, cn, D, !0);
}
i(fE, "ɵɵclassMapInterpolate8");
function hE(e) {
  const t = y(), n = ei(t, e);
  Ut(Dt, cn, n, !0);
}
i(hE, "ɵɵclassMapInterpolateV");
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function pE() {
  const e = y()[ve][se];
  return ngDevMode && b(e, "Expected component instance to be defined"), e;
}
i(pE, "ɵɵcomponentInstance");
class kO {
  static {
    i(this, "LiveCollection");
  }
  destroy(t) {
  }
  updateValue(t, n) {
  }
  // operations below could be implemented on top of the operations defined so far, but having
  // them explicitly allow clear expression of intent and potentially more performant
  // implementations
  swap(t, n) {
    const r = Math.min(t, n), o = Math.max(t, n), s = this.detach(o);
    if (o - r > 1) {
      const a = this.detach(r);
      this.attach(r, s), this.attach(o, a);
    } else
      this.attach(r, s);
  }
  move(t, n) {
    this.attach(n, this.detach(t));
  }
}
function Bc(e, t, n, r, o) {
  return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0;
}
i(Bc, "valuesMatching");
function RO(e, t, n) {
  let r, o, s = 0, a = e.length - 1;
  if (Array.isArray(t)) {
    let u = t.length - 1;
    for (; s <= a && s <= u; ) {
      const c = e.at(s), l = t[s], d = Bc(s, c, s, l, n);
      if (d !== 0) {
        d < 0 && e.updateValue(s, l), s++;
        continue;
      }
      const f = e.at(a), h = t[u], p = Bc(a, f, u, h, n);
      if (p !== 0) {
        p < 0 && e.updateValue(a, h), a--, u--;
        continue;
      }
      const g = n(s, c), m = n(a, f), v = n(s, l);
      if (Object.is(v, m)) {
        const C = n(u, h);
        Object.is(C, g) ? (e.swap(s, a), e.updateValue(a, h), u--, a--) : e.move(a, s), e.updateValue(s, l), s++;
        continue;
      }
      if (r ??= new Zg(), o ??= Qg(e, s, a, n), od(e, r, s, v))
        e.updateValue(s, l), s++, a++;
      else if (o.has(v))
        r.set(g, e.detach(s)), a--;
      else {
        const C = e.create(s, t[s]);
        e.attach(s, C), s++, a++;
      }
    }
    for (; s <= u; )
      qg(e, r, n, s, t[s]), s++;
  } else if (t != null) {
    const u = t[Symbol.iterator]();
    let c = u.next();
    for (; !c.done && s <= a; ) {
      const l = e.at(s), d = c.value, f = Bc(s, l, s, d, n);
      if (f !== 0)
        f < 0 && e.updateValue(s, d), s++, c = u.next();
      else {
        r ??= new Zg(), o ??= Qg(e, s, a, n);
        const h = n(s, d);
        if (od(e, r, s, h))
          e.updateValue(s, d), s++, a++, c = u.next();
        else if (!o.has(h))
          e.attach(s, e.create(s, d)), s++, a++, c = u.next();
        else {
          const p = n(s, l);
          r.set(p, e.detach(s)), a--;
        }
      }
    }
    for (; !c.done; )
      qg(e, r, n, e.length, c.value), c = u.next();
  }
  for (; s <= a; )
    e.destroy(e.detach(a--));
  r?.forEach((u) => {
    e.destroy(u);
  });
}
i(RO, "reconcile");
function od(e, t, n, r) {
  return t !== void 0 && t.has(r) ? (e.attach(n, t.get(r)), t.delete(r), !0) : !1;
}
i(od, "attachPreviouslyDetached");
function qg(e, t, n, r, o) {
  if (od(e, t, r, n(r, o)))
    e.updateValue(r, o);
  else {
    const s = e.create(r, o);
    e.attach(r, s);
  }
}
i(qg, "createOrAttach");
function Qg(e, t, n, r) {
  const o = /* @__PURE__ */ new Set();
  for (let s = t; s <= n; s++)
    o.add(r(s, e.at(s)));
  return o;
}
i(Qg, "initLiveItemsInTheFuture");
class Zg {
  static {
    i(this, "UniqueValueMultiKeyMap");
  }
  constructor() {
    this.kvMap = /* @__PURE__ */ new Map(), this._vMap = void 0;
  }
  has(t) {
    return this.kvMap.has(t);
  }
  delete(t) {
    if (!this.has(t))
      return !1;
    const n = this.kvMap.get(t);
    return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(t), !0;
  }
  get(t) {
    return this.kvMap.get(t);
  }
  set(t, n) {
    if (this.kvMap.has(t)) {
      let r = this.kvMap.get(t);
      ngDevMode && $r(r, n, `Detected a duplicated value ${n} for the key ${t}`), this._vMap === void 0 && (this._vMap = /* @__PURE__ */ new Map());
      const o = this._vMap;
      for (; o.has(r); )
        r = o.get(r);
      o.set(r, n);
    } else
      this.kvMap.set(t, n);
  }
  forEach(t) {
    for (let [n, r] of this.kvMap)
      if (t(r, n), this._vMap !== void 0) {
        const o = this._vMap;
        for (; o.has(r); )
          r = o.get(r), t(r, n);
      }
  }
}
function gE(e, t, n) {
  St("NgControlFlow");
  const r = y(), o = Bt(), s = id(r, A + e), a = 0;
  if (we(r, o, t)) {
    const u = B(null);
    try {
      if (jf(s, a), t !== -1) {
        const c = sd(r[E], A + t), l = Mo(s, c.tView.ssrId), d = Ss(r, c, n, { dehydratedView: l });
        Ts(s, d, a, bo(c, l));
      }
    } finally {
      B(u);
    }
  } else {
    const u = lI(s, a);
    u !== void 0 && (u[se] = n);
  }
}
i(gE, "ɵɵconditional");
class xO {
  static {
    i(this, "RepeaterContext");
  }
  constructor(t, n, r) {
    this.lContainer = t, this.$implicit = n, this.$index = r;
  }
  get $count() {
    return this.lContainer.length - me;
  }
}
function mE(e) {
  return e;
}
i(mE, "ɵɵrepeaterTrackByIndex");
function yE(e, t) {
  return t;
}
i(yE, "ɵɵrepeaterTrackByIdentity");
class PO {
  static {
    i(this, "RepeaterMetadata");
  }
  constructor(t, n, r) {
    this.hasEmptyBlock = t, this.trackByFn = n, this.liveCollection = r;
  }
}
function DE(e, t, n, r, o, s, a, u, c, l, d, f, h) {
  St("NgControlFlow"), ngDevMode && cy(a, `A track expression must be a function, was ${typeof a} instead.`);
  const p = c !== void 0, g = y(), m = u ? (
    // We only want to bind when necessary, because it produces a
    // new function. For pure functions it's not necessary.
    a.bind(g[ve][se])
  ) : a, v = new PO(p, m);
  g[A + e] = v, So(e + 1, t, n, r, o, s), p && (ngDevMode && b(l, "Missing number of declarations for the empty repeater block."), ngDevMode && b(d, "Missing number of bindings for the empty repeater block."), So(e + 2, c, l, d, f, h));
}
i(DE, "ɵɵrepeaterCreate");
class LO extends kO {
  static {
    i(this, "LiveCollectionLContainerImpl");
  }
  constructor(t, n, r) {
    super(), this.lContainer = t, this.hostLView = n, this.templateTNode = r, this.needsIndexUpdate = !1;
  }
  get length() {
    return this.lContainer.length - me;
  }
  at(t) {
    return this.getLView(t)[se].$implicit;
  }
  attach(t, n) {
    const r = n[mt];
    this.needsIndexUpdate ||= t !== this.length, Ts(this.lContainer, n, t, bo(this.templateTNode, r));
  }
  detach(t) {
    return this.needsIndexUpdate ||= t !== this.length - 1, jO(this.lContainer, t);
  }
  create(t, n) {
    const r = Mo(this.lContainer, this.templateTNode.tView.ssrId);
    return Ss(this.hostLView, this.templateTNode, new xO(this.lContainer, n, t), { dehydratedView: r });
  }
  destroy(t) {
    Pu(t[E], t);
  }
  updateValue(t, n) {
    this.getLView(t)[se].$implicit = n;
  }
  reset() {
    this.needsIndexUpdate = !1;
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let t = 0; t < this.length; t++)
        this.getLView(t)[se].$index = t;
  }
  getLView(t) {
    return $O(this.lContainer, t);
  }
}
function vE(e) {
  const t = B(null), n = Ve();
  try {
    const r = y(), o = r[E], s = r[n];
    if (s.liveCollection === void 0) {
      const u = n + 1, c = id(r, u), l = sd(o, u);
      s.liveCollection = new LO(c, r, l);
    } else
      s.liveCollection.reset();
    const a = s.liveCollection;
    if (RO(a, e, s.trackByFn), a.updateIndexes(), s.hasEmptyBlock) {
      const u = Bt(), c = a.length === 0;
      if (we(r, u, c)) {
        const l = n + 2, d = id(r, l);
        if (c) {
          const f = sd(o, l), h = Mo(d, f.tView.ssrId), p = Ss(r, f, void 0, { dehydratedView: h });
          Ts(d, p, 0, bo(f, h));
        } else
          jf(d, 0);
      }
    }
  } finally {
    B(t);
  }
}
i(vE, "ɵɵrepeater");
function id(e, t) {
  const n = e[t];
  return ngDevMode && it(n), n;
}
i(id, "getLContainer");
function jO(e, t) {
  const n = Wi(e, t);
  return ngDevMode && nn(n), n;
}
i(jO, "detachExistingView");
function $O(e, t) {
  const n = lI(e, t);
  return ngDevMode && nn(n), n;
}
i($O, "getExistingLViewFromLContainer");
function sd(e, t) {
  const n = Ds(e, t);
  return ngDevMode && Do(n), n;
}
i(sd, "getExistingTNode");
function BO(e, t, n, r, o, s) {
  ngDevMode && st(t), ngDevMode && ngDevMode.firstCreatePass++;
  const a = t.consts, u = Xt(a, o), c = Qo(t, e, 2, r, u);
  return xf(t, n, c, Xt(a, s)), c.attrs !== null && Va(c, c.attrs, !1), c.mergedAttrs !== null && Va(c, c.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, c), c;
}
i(BO, "elementStartFirstCreatePass");
function ic(e, t, n, r) {
  const o = y(), s = P(), a = A + e;
  ngDevMode && O(ee(), s.bindingStartIndex, "elements should be created before any bindings"), ngDevMode && be(o, a);
  const u = o[N], c = s.firstCreatePass ? BO(a, s, o, t, n, r) : s.data[a], l = IE(s, o, c, u, t, e);
  o[a] = l;
  const d = Cu(c);
  return ngDevMode && s.firstCreatePass && fT(l, o, c.value, s.schemas, d), en(c, !0), Zv(u, l, c), !xs(c) && Is() && ju(s, o, l, c), t_() === 0 && Le(l, o), n_(), d && (Nf(s, o, c), Ff(s, c, o)), r !== null && kf(o, c), ic;
}
i(ic, "ɵɵelementStart");
function sc() {
  let e = J();
  ngDevMode && b(e, "No parent node to close."), Zd() ? Yd() : (ngDevMode && $y(J()), e = e.parent, en(e, !1));
  const t = e;
  ngDevMode && $e(
    t,
    3
    /* TNodeType.AnyRNode */
  ), o_(t) && s_(), r_();
  const n = P();
  return n.firstCreatePass && (wu(n, e), Bd(e) && n.queries.elementEnd(e)), t.classesWithoutHost != null && D_(t) && rd(n, t, y(), t.classesWithoutHost, !0), t.stylesWithoutHost != null && v_(t) && rd(n, t, y(), t.stylesWithoutHost, !1), sc;
}
i(sc, "ɵɵelementEnd");
function Eh(e, t, n, r) {
  return ic(e, t, n, r), sc(), Eh;
}
i(Eh, "ɵɵelement");
let IE = /* @__PURE__ */ i((e, t, n, r, o, s) => (rn(!0), xu(r, o, vD())), "_locateOrCreateElementNode");
function HO(e, t, n, r, o, s) {
  const a = t[mt], u = !a || Ho() || xs(n) || Ou(a, s);
  if (rn(u), u)
    return xu(r, o, vD());
  const c = Qu(a, e, t, n);
  if (ngDevMode && Os(c, Node.ELEMENT_NODE, o, t, n), ngDevMode && Go(c), uv(a, s) && (ngDevMode && Wu(c.nextSibling, t, n), Au(a, s, c.nextSibling)), a && (PD(n) || LD(c))) {
    if (nr(n))
      i_(n), Wv(c), ngDevMode && CS(c);
    else if (ngDevMode)
      throw vA(c);
  }
  return c;
}
i(HO, "locateOrCreateElementNodeImpl");
function VO() {
  IE = HO;
}
i(VO, "enableLocateOrCreateElementNodeImpl");
function UO(e, t, n, r, o) {
  ngDevMode && ngDevMode.firstCreatePass++;
  const s = t.consts, a = Xt(s, r), u = Qo(t, e, 8, "ng-container", a);
  a !== null && Va(u, a, !0);
  const c = Xt(s, o);
  return xf(t, n, u, c), t.queries !== null && t.queries.elementStart(t, u), u;
}
i(UO, "elementContainerStartFirstCreatePass");
function ac(e, t, n) {
  const r = y(), o = P(), s = e + A;
  ngDevMode && be(r, s), ngDevMode && O(ee(), o.bindingStartIndex, "element containers should be created before any bindings");
  const a = o.firstCreatePass ? UO(s, o, r, t, n) : o.data[s];
  en(a, !0);
  const u = CE(o, r, a, e);
  return r[s] = u, Is() && ju(o, r, u, a), Le(u, r), Cu(a) && (Nf(o, r, a), Ff(o, a, r)), n != null && kf(r, a), ac;
}
i(ac, "ɵɵelementContainerStart");
function uc() {
  let e = J();
  const t = P();
  return Zd() ? Yd() : (ngDevMode && $y(e), e = e.parent, en(e, !1)), ngDevMode && $e(
    e,
    8
    /* TNodeType.ElementContainer */
  ), t.firstCreatePass && (wu(t, e), Bd(e) && t.queries.elementEnd(e)), uc;
}
i(uc, "ɵɵelementContainerEnd");
function bh(e, t, n) {
  return ac(e, t, n), uc(), bh;
}
i(bh, "ɵɵelementContainer");
let CE = /* @__PURE__ */ i((e, t, n, r) => (rn(!0), Sf(t[N], ngDevMode ? "ng-container" : "")), "_locateOrCreateElementContainerNode");
function zO(e, t, n, r) {
  let o;
  const s = t[mt], a = !s || Ho() || xs(n);
  if (rn(a), a)
    return Sf(t[N], ngDevMode ? "ng-container" : "");
  const u = Qu(s, e, t, n);
  ngDevMode && Wu(u, t, n);
  const c = bS(s, r);
  return ngDevMode && X(c, "Unexpected state: hydrating an <ng-container>, but no hydration info is available."), Au(s, r, u), o = Zu(c, u), ngDevMode && (Os(o, Node.COMMENT_NODE, null, t, n), Go(o)), o;
}
i(zO, "locateOrCreateElementContainerNode");
function GO() {
  CE = zO;
}
i(GO, "enableLocateOrCreateElementContainerNodeImpl");
function EE() {
  return y();
}
i(EE, "ɵɵgetCurrentView");
function wh(e, t, n) {
  const r = y(), o = Bt();
  if (we(r, o, t)) {
    const s = P(), a = ce();
    at(s, a, r, e, t, r[N], n, !0), ngDevMode && Ie(s.data, a, e, o);
  }
  return wh;
}
i(wh, "ɵɵhostProperty");
function Mh(e, t, n) {
  const r = y(), o = Bt();
  if (we(r, o, t)) {
    const s = P(), a = ce(), u = Kd(s.data), c = cI(u, a, r);
    at(s, a, r, e, t, c, n, !0), ngDevMode && Ie(s.data, a, e, o);
  }
  return Mh;
}
i(Mh, "ɵɵsyntheticHostProperty");
typeof ngI18nClosureMode > "u" && function() {
  pe.ngI18nClosureMode = // TODO(FW-1250): validate that this actually, you know, works.
  // tslint:disable-next-line:no-toplevel-property-access
  typeof goog < "u" && typeof goog.getMsg == "function";
}();
const ir = void 0;
function WO(e) {
  const t = Math.floor(Math.abs(e)), n = e.toString().replace(/^[^.]*\.?/, "").length;
  return t === 1 && n === 0 ? 1 : 5;
}
i(WO, "plural");
var qO = ["en", [["a", "p"], ["AM", "PM"], ir], [["AM", "PM"], ir, ir], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], ir, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], ir, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", ir, "{1} 'at' {0}", ir], [".", ",", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0%", "¤#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", WO];
let io = {};
function QO(e, t, n) {
  typeof t != "string" && (n = t, t = e[ie.LocaleId]), t = t.toLowerCase().replace(/_/g, "-"), io[t] = e, n && (io[t][ie.ExtraData] = n);
}
i(QO, "registerLocaleData");
function Ue(e) {
  const t = KO(e);
  let n = Yg(t);
  if (n)
    return n;
  const r = t.split("-")[0];
  if (n = Yg(r), n)
    return n;
  if (r === "en")
    return qO;
  throw new I(701, ngDevMode && `Missing locale data for the locale "${e}".`);
}
i(Ue, "findLocaleData");
function ZO(e) {
  return Ue(e)[ie.CurrencyCode] || null;
}
i(ZO, "getLocaleCurrencyCode");
function _h(e) {
  return Ue(e)[ie.PluralCase];
}
i(_h, "getLocalePluralCase$1");
function Yg(e) {
  return e in io || (io[e] = pe.ng && pe.ng.common && pe.ng.common.locales && pe.ng.common.locales[e]), io[e];
}
i(Yg, "getLocaleData");
function YO() {
  io = {};
}
i(YO, "unregisterAllLocaleData");
var ie;
(function(e) {
  e[e.LocaleId = 0] = "LocaleId", e[e.DayPeriodsFormat = 1] = "DayPeriodsFormat", e[e.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", e[e.DaysFormat = 3] = "DaysFormat", e[e.DaysStandalone = 4] = "DaysStandalone", e[e.MonthsFormat = 5] = "MonthsFormat", e[e.MonthsStandalone = 6] = "MonthsStandalone", e[e.Eras = 7] = "Eras", e[e.FirstDayOfWeek = 8] = "FirstDayOfWeek", e[e.WeekendRange = 9] = "WeekendRange", e[e.DateFormat = 10] = "DateFormat", e[e.TimeFormat = 11] = "TimeFormat", e[e.DateTimeFormat = 12] = "DateTimeFormat", e[e.NumberSymbols = 13] = "NumberSymbols", e[e.NumberFormats = 14] = "NumberFormats", e[e.CurrencyCode = 15] = "CurrencyCode", e[e.CurrencySymbol = 16] = "CurrencySymbol", e[e.CurrencyName = 17] = "CurrencyName", e[e.Currencies = 18] = "Currencies", e[e.Directionality = 19] = "Directionality", e[e.PluralCase = 20] = "PluralCase", e[e.ExtraData = 21] = "ExtraData";
})(ie || (ie = {}));
function KO(e) {
  return e.toLowerCase().replace(/_/g, "-");
}
i(KO, "normalizeLocale");
const JO = ["zero", "one", "two", "few", "many"];
function XO(e, t) {
  const n = _h(t)(parseInt(e, 10)), r = JO[n];
  return r !== void 0 ? r : "other";
}
i(XO, "getPluralCase");
const _r = "en-US", eF = "USD", cc = {
  marker: "element"
}, lc = {
  marker: "ICU"
};
var qe;
(function(e) {
  e[e.SHIFT = 2] = "SHIFT", e[e.APPEND_EAGERLY = 1] = "APPEND_EAGERLY", e[e.COMMENT = 2] = "COMMENT";
})(qe || (qe = {}));
let bE = _r;
function Sh(e) {
  ngDevMode && b(e, "Expected localeId to be defined"), typeof e == "string" && (bE = e.toLowerCase().replace(/_/g, "-"));
}
i(Sh, "setLocaleId");
function tF() {
  return bE;
}
i(tF, "getLocaleId$1");
function wE(e, t, n) {
  const r = t.insertBeforeIndex, o = Array.isArray(r) ? r[0] : r;
  return o === null ? Vv(e, t, n) : (ngDevMode && be(n, o), oe(n[o]));
}
i(wE, "getInsertInFrontOfRNodeWithI18n");
function ME(e, t, n, r, o) {
  const s = t.insertBeforeIndex;
  if (Array.isArray(s)) {
    ngDevMode && On(r);
    let a = r, u = null;
    if (t.type & 3 || (u = a, a = o), a !== null && t.componentOffset === -1)
      for (let c = 1; c < s.length; c++) {
        const l = n[s[c]];
        Cr(e, a, l, u, !1);
      }
  }
}
i(ME, "processI18nInsertBefore");
function _E(e, t) {
  if (ngDevMode && O(t.insertBeforeIndex, null, "We expect that insertBeforeIndex is not set"), e.push(t), e.length > 1)
    for (let n = e.length - 2; n >= 0; n--) {
      const r = e[n];
      SE(r) || nF(r, t) && rF(r) === null && oF(r, t.index);
    }
}
i(_E, "addTNodeAndUpdateInsertBeforeIndex");
function SE(e) {
  return !(e.type & 64);
}
i(SE, "isI18nText");
function nF(e, t) {
  return SE(t) || e.index > t.index;
}
i(nF, "isNewTNodeCreatedBefore");
function rF(e) {
  const t = e.insertBeforeIndex;
  return Array.isArray(t) ? t[0] : t;
}
i(rF, "getInsertBeforeIndex");
function oF(e, t) {
  const n = e.insertBeforeIndex;
  Array.isArray(n) ? n[0] = t : (zv(wE, ME), e.insertBeforeIndex = t);
}
i(oF, "setInsertBeforeIndex");
function bi(e, t) {
  const n = e.data[t];
  if (n === null || typeof n == "string")
    return null;
  ngDevMode && !(n.hasOwnProperty("tView") || n.hasOwnProperty("currentCaseLViewIndex")) && T("We expect to get 'null'|'TIcu'|'TIcuContainer', but got: " + n);
  const r = n.hasOwnProperty("currentCaseLViewIndex") ? n : n.value;
  return ngDevMode && Vd(r), r;
}
i(bi, "getTIcu");
function iF(e, t, n) {
  const r = e.data[t];
  ngDevMode && O(r === null || r.hasOwnProperty("tView"), !0, "We expect to get 'null'|'TIcuContainer'"), r === null ? e.data[t] = n : (ngDevMode && $e(
    r,
    32
    /* TNodeType.Icu */
  ), r.value = n);
}
i(iF, "setTIcu");
function sF(e, t) {
  ngDevMode && Do(e);
  let n = e.insertBeforeIndex;
  n === null ? (zv(wE, ME), n = e.insertBeforeIndex = [null, t]) : (O(Array.isArray(n), !0, "Expecting array here"), n.push(t));
}
i(sF, "setTNodeInsertBeforeIndex");
function aF(e, t, n) {
  const r = Of(e, n, 64, null, null);
  return _E(t, r), r;
}
i(aF, "createTNodePlaceholder");
function dc(e, t) {
  const n = t[e.currentCaseLViewIndex];
  return n === null ? n : n < 0 ? ~n : n;
}
i(dc, "getCurrentICUCaseIndex");
function TE(e) {
  return e >>> 17;
}
i(TE, "getParentFromIcuCreateOpCode");
function AE(e) {
  return (e & 131070) >>> 1;
}
i(AE, "getRefFromIcuCreateOpCode");
function Kg(e) {
  return e & 1;
}
i(Kg, "getInstructionFromIcuCreateOpCode");
function uF(e, t, n) {
  return ngDevMode && wn(t, 0, "Missing parent index"), ngDevMode && tr(n, 0, "Missing ref index"), e | t << 17 | n << 1;
}
i(uF, "icuCreateOpCode");
let Ji = 0, wi = 0;
function cF(e) {
  e && (Ji = Ji | 1 << Math.min(wi, 31)), wi++;
}
i(cF, "setMaskBit");
function lF(e, t, n) {
  if (wi > 0) {
    ngDevMode && b(e, "tView should be defined");
    const r = e.data[n], o = Array.isArray(r) ? r : r.update, s = ee() - wi - 1;
    NE(e, t, o, s, Ji);
  }
  Ji = 0, wi = 0;
}
i(lF, "applyI18n");
function OE(e, t, n) {
  const r = e[N];
  switch (n) {
    case Node.COMMENT_NODE:
      return Sf(r, t);
    case Node.TEXT_NODE:
      return _f(r, t);
    case Node.ELEMENT_NODE:
      return xu(r, t, null);
  }
}
i(OE, "createNodeWithoutHydration");
let Mi = /* @__PURE__ */ i((e, t, n, r) => (rn(!0), OE(e, n, r)), "_locateOrCreateNode");
function dF(e, t, n, r) {
  return rn(!0), OE(e, n, r);
}
i(dF, "locateOrCreateNodeImpl");
function fF() {
  Mi = dF;
}
i(fF, "enableLocateOrCreateI18nNodeImpl");
function hF(e, t, n, r) {
  const o = e[N];
  for (let s = 0; s < t.length; s++) {
    const a = t[s++], u = t[s], c = (a & qe.COMMENT) === qe.COMMENT, l = (a & qe.APPEND_EAGERLY) === qe.APPEND_EAGERLY, d = a >>> qe.SHIFT;
    let f = e[d], h = !1;
    f === null && (f = e[d] = Mi(e, d, u, c ? Node.COMMENT_NODE : Node.TEXT_NODE), h = Is()), l && n !== null && h && Cr(o, n, f, r, !1);
  }
}
i(hF, "applyCreateOpCodes");
function FE(e, t, n, r) {
  ngDevMode && On(r);
  const o = n[N];
  let s = null, a;
  for (let u = 0; u < t.length; u++) {
    const c = t[u];
    if (typeof c == "string") {
      const l = t[++u];
      n[l] === null && (ngDevMode && ngDevMode.rendererCreateTextNode++, ngDevMode && be(n, l), n[l] = Mi(n, l, c, Node.TEXT_NODE));
    } else if (typeof c == "number")
      switch (c & 1) {
        case 0:
          const l = TE(c);
          s === null && (s = l, a = Lu(o, r));
          let d, f;
          if (l === s ? (d = r, f = a) : (d = null, f = oe(n[l])), f !== null) {
            ngDevMode && On(f);
            const m = AE(c);
            ngDevMode && tr(m, A, "Missing ref");
            const v = n[m];
            ngDevMode && On(v), Cr(o, f, v, d, !1);
            const C = bi(e, m);
            if (C !== null && typeof C == "object") {
              ngDevMode && Vd(C);
              const D = dc(C, n);
              D !== null && FE(e, C.create[D], n, n[C.anchorIdx]);
            }
          }
          break;
        case 1:
          const h = c >>> 1, p = t[++u], g = t[++u];
          Pf(o, ys(h, n), null, null, p, g, null);
          break;
        default:
          if (ngDevMode)
            throw new I(700, `Unable to determine the type of mutate operation for "${c}"`);
      }
    else
      switch (c) {
        case lc:
          const l = t[++u], d = t[++u];
          if (n[d] === null) {
            ngDevMode && O(typeof l, "string", `Expected "${l}" to be a comment node value`), ngDevMode && ngDevMode.rendererCreateComment++, ngDevMode && Na(n, d);
            const p = n[d] = Mi(n, d, l, Node.COMMENT_NODE);
            Le(p, n);
          }
          break;
        case cc:
          const f = t[++u], h = t[++u];
          if (n[h] === null) {
            ngDevMode && O(typeof f, "string", `Expected "${f}" to be an element node tag name`), ngDevMode && ngDevMode.rendererCreateElement++, ngDevMode && Na(n, h);
            const p = n[h] = Mi(n, h, f, Node.ELEMENT_NODE);
            Le(p, n);
          }
          break;
        default:
          ngDevMode && T(`Unable to determine the type of mutate operation for "${c}"`);
      }
  }
}
i(FE, "applyMutableOpCodes");
function NE(e, t, n, r, o) {
  for (let s = 0; s < n.length; s++) {
    const a = n[s], u = n[++s];
    if (a & o) {
      let c = "";
      for (let l = s + 1; l <= s + u; l++) {
        const d = n[l];
        if (typeof d == "string")
          c += d;
        else if (typeof d == "number")
          if (d < 0)
            c += j(t[r - d]);
          else {
            const f = d >>> 2;
            switch (d & 3) {
              case 1:
                const h = n[++l], p = n[++l], g = e.data[f];
                ngDevMode && b(g, "Experting TNode or string"), typeof g == "string" ? Pf(t[N], t[f], null, g, h, c, p) : at(e, g, t, h, c, t[N], p, !1);
                break;
              case 0:
                const m = t[f];
                m !== null && Rv(t[N], m, c);
                break;
              case 2:
                pF(e, bi(e, f), t, c);
                break;
              case 3:
                Jg(e, bi(e, f), r, t);
                break;
            }
          }
      }
    } else {
      const c = n[s + 1];
      if (c > 0 && (c & 3) === 3) {
        const l = c >>> 2, d = bi(e, l);
        t[d.currentCaseLViewIndex] < 0 && Jg(e, d, r, t);
      }
    }
    s += u;
  }
}
i(NE, "applyUpdateOpCodes");
function Jg(e, t, n, r) {
  ngDevMode && be(r, t.currentCaseLViewIndex);
  let o = r[t.currentCaseLViewIndex];
  if (o !== null) {
    let s = Ji;
    o < 0 && (o = r[t.currentCaseLViewIndex] = ~o, s = -1), NE(e, r, t.update[o], n, s);
  }
}
i(Jg, "applyIcuUpdateCase");
function pF(e, t, n, r) {
  const o = gF(t, r);
  if (dc(t, n) !== o && (kE(e, t, n), n[t.currentCaseLViewIndex] = o === null ? null : ~o, o !== null)) {
    const a = n[t.anchorIdx];
    a && (ngDevMode && On(a), FE(e, t.create[o], n, a));
  }
}
i(pF, "applyIcuSwitchCase");
function kE(e, t, n) {
  let r = dc(t, n);
  if (r !== null) {
    const o = t.remove[r];
    for (let s = 0; s < o.length; s++) {
      const a = o[s];
      if (a > 0) {
        const u = ys(a, n);
        u !== null && Ms(n[N], u);
      } else
        kE(e, bi(e, ~a), n);
    }
  }
}
i(kE, "applyIcuSwitchCaseRemove");
function gF(e, t) {
  let n = e.cases.indexOf(t);
  if (n === -1)
    switch (e.type) {
      case 1: {
        const r = XO(t, tF());
        n = e.cases.indexOf(r), n === -1 && r !== "other" && (n = e.cases.indexOf("other"));
        break;
      }
      case 0: {
        n = e.cases.indexOf("other");
        break;
      }
    }
  return n === -1 ? null : n;
}
i(gF, "getCaseIndex");
function mF() {
  const e = [];
  let t = -1, n, r;
  function o(u, c) {
    for (n = c; e.length; )
      e.pop();
    return ngDevMode && Ke(u, c), s(u.value, c), a;
  }
  i(o, "icuContainerIteratorStart");
  function s(u, c) {
    t = 0;
    const l = dc(u, c);
    l !== null ? (ngDevMode && ki(l, 0, u.cases.length - 1), r = u.remove[l]) : r = Q;
  }
  i(s, "enterIcu");
  function a() {
    if (t < r.length) {
      const u = r[t++];
      if (ngDevMode && X(u, "Expecting OpCode number"), u > 0) {
        const c = n[u];
        return ngDevMode && On(c), c;
      } else {
        e.push(t, r);
        const c = ~u, l = n[E].data[c];
        return ngDevMode && Vd(l), s(l, n), a();
      }
    } else
      return e.length === 0 ? null : (r = e.pop(), t = e.pop(), a());
  }
  return i(a, "icuContainerIteratorNext"), o;
}
i(mF, "loadIcuContainerVisitor");
function yF(e) {
  const t = e || (Array.isArray(this) ? this : []);
  let n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r++], s = t[r], a = (o & qe.COMMENT) === qe.COMMENT, u = (o & qe.APPEND_EAGERLY) === qe.APPEND_EAGERLY, c = o >>> qe.SHIFT;
    n.push(`lView[${c}] = document.${a ? "createComment" : "createText"}(${JSON.stringify(s)});`), u && n.push(`parent.appendChild(lView[${c}]);`);
  }
  return n;
}
i(yF, "i18nCreateOpCodesToString");
function fc(e) {
  const t = new RE(e || (Array.isArray(this) ? this : []));
  let n = [];
  function r(o) {
    const s = o >>> 2;
    switch (o & 3) {
      case 0:
        return `(lView[${s}] as Text).textContent = $$$`;
      case 1:
        const u = t.consumeString(), c = t.consumeFunction(), l = c ? `(${c})($$$)` : "$$$";
        return `(lView[${s}] as Element).setAttribute('${u}', ${l})`;
      case 2:
        return `icuSwitchCase(${s}, $$$)`;
      case 3:
        return `icuUpdateCase(${s})`;
    }
    throw new Error("unexpected OpCode");
  }
  for (i(r, "consumeOpCode"); t.hasMore(); ) {
    let o = t.consumeNumber(), s = t.consumeNumber();
    const a = t.i + s, u = [];
    let c = "";
    for (; t.i < a; ) {
      let l = t.consumeNumberOrString();
      if (typeof l == "string")
        c += l;
      else if (l < 0)
        c += "${lView[i" + l + "]}";
      else {
        const d = r(l);
        u.push(d.replace("$$$", "`" + c + "`") + ";"), c = "";
      }
    }
    n.push(`if (mask & 0b${o.toString(2)}) { ${u.join(" ")} }`);
  }
  return n;
}
i(fc, "i18nUpdateOpCodesToString");
function DF(e) {
  const t = new RE(e || (Array.isArray(this) ? this : []));
  let n = [];
  function r(s) {
    const a = TE(s), u = AE(s);
    switch (Kg(s)) {
      case 0:
        return `(lView[${a}] as Element).appendChild(lView[${o}])`;
      case 1:
        return `(lView[${u}] as Element).setAttribute("${t.consumeString()}", "${t.consumeString()}")`;
    }
    throw new Error("Unexpected OpCode: " + Kg(s));
  }
  i(r, "consumeOpCode");
  let o = -1;
  for (; t.hasMore(); ) {
    let s = t.consumeNumberStringOrMarker();
    if (s === lc) {
      const a = t.consumeString();
      o = t.consumeNumber(), n.push(`lView[${o}] = document.createComment("${a}")`);
    } else if (s === cc) {
      const a = t.consumeString();
      o = t.consumeNumber(), n.push(`lView[${o}] = document.createElement("${a}")`);
    } else if (typeof s == "string")
      o = t.consumeNumber(), n.push(`lView[${o}] = document.createTextNode("${s}")`);
    else if (typeof s == "number") {
      const a = r(s);
      a && n.push(a);
    } else
      throw new Error("Unexpected value");
  }
  return n;
}
i(DF, "icuCreateOpCodesToString");
function vF(e) {
  const t = e || (Array.isArray(this) ? this : []);
  let n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    o > 0 ? n.push(`remove(lView[${o}])`) : n.push(`removeNestedICU(${~o})`);
  }
  return n;
}
i(vF, "i18nRemoveOpCodesToString");
class RE {
  static {
    i(this, "OpCodeParser");
  }
  constructor(t) {
    this.i = 0, this.codes = t;
  }
  hasMore() {
    return this.i < this.codes.length;
  }
  consumeNumber() {
    let t = this.codes[this.i++];
    return X(t, "expecting number in OpCode"), t;
  }
  consumeString() {
    let t = this.codes[this.i++];
    return Po(t, "expecting string in OpCode"), t;
  }
  consumeFunction() {
    let t = this.codes[this.i++];
    if (t === null || typeof t == "function")
      return t;
    throw new Error("expecting function in OpCode");
  }
  consumeNumberOrString() {
    let t = this.codes[this.i++];
    return typeof t == "string" || X(t, "expecting number or string in OpCode"), t;
  }
  consumeNumberStringOrMarker() {
    let t = this.codes[this.i++];
    return typeof t == "string" || typeof t == "number" || t == lc || t == cc || X(t, "expecting number, string, ICU_MARKER or ELEMENT_MARKER in OpCode"), t;
  }
}
const Ka = /�(\d+):?\d*�/gi, IF = /({\s*�\d+:?\d*�\s*,\s*\S{6}\s*,[\s\S]*})/gi, CF = /�(\d+)�/, xE = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/, _i = "�", EF = /�\/?\*(\d+:\d+)�/gi, bF = /�(\/?[#*]\d+):?\d*�/gi, wF = /\uE500/g;
function MF(e) {
  return e.replace(wF, " ");
}
i(MF, "replaceNgsp");
function cr(e, t) {
  if (ngDevMode)
    Object.defineProperty(e, "debug", { get: t, enumerable: !1 });
  else
    throw new Error("This method should be guarded with `ngDevMode` so that it can be tree shaken in production!");
}
i(cr, "attachDebugGetter");
function _F(e, t, n, r, o, s) {
  const a = Bi(), u = [], c = [], l = [[]], d = [[]];
  ngDevMode && (cr(u, yF), cr(c, fc)), o = FF(o, s);
  const f = MF(o).split(bF);
  for (let h = 0; h < f.length; h++) {
    let p = f[h];
    if (h & 1) {
      const g = p.charCodeAt(0) === 47, m = p.charCodeAt(g ? 1 : 0);
      ngDevMode && Zw(
        m,
        42,
        35
        /* CharCode.HASH */
      );
      const v = A + Number.parseInt(p.substring(g ? 2 : 1));
      if (g)
        l.shift(), d.shift(), en(Bi(), !1);
      else {
        const C = aF(e, l[0], v);
        l.unshift([]), en(C, !0);
        const D = {
          kind: 2,
          index: v,
          children: [],
          type: m === 35 ? 0 : 1
        };
        d[0].push(D), d.unshift(D.children);
      }
    } else {
      const g = ad(p);
      for (let m = 0; m < g.length; m++) {
        let v = g[m];
        if (m & 1) {
          const C = v;
          if (typeof C != "object")
            throw new Error(`Unable to parse ICU expression in "${o}" message.`);
          const _ = PE(e, a, l[0], n, u, ngDevMode ? `ICU ${r}:${C.mainBinding}` : "", !0).index;
          ngDevMode && wn(_, A, "Index must be in absolute LView offset"), jE(d[0], e, n, c, t, C, _);
        } else {
          const C = v;
          ngDevMode && Po(C, "Parsed ICU part should be string"), C !== "" && SF(d[0], e, a, l[0], u, c, n, C);
        }
      }
    }
  }
  e.data[r] = {
    create: u,
    update: c,
    ast: d[0]
  };
}
i(_F, "i18nStartFirstCreatePass");
function PE(e, t, n, r, o, s, a) {
  const u = _s(e, r, 1, null);
  let c = u << qe.SHIFT, l = Bi();
  t === l && (l = null), l === null && (c |= qe.APPEND_EAGERLY), a && (c |= qe.COMMENT, DT(mF)), o.push(c, s === null ? "" : s);
  const d = Of(e, u, a ? 32 : 1, s === null ? ngDevMode ? "{{?}}" : "" : s, null);
  _E(n, d);
  const f = d.index;
  return en(
    d,
    !1
    /* Text nodes are self closing */
  ), l !== null && t !== l && sF(l, f), d;
}
i(PE, "createTNodeAndAddOpCode");
function SF(e, t, n, r, o, s, a, u) {
  const c = u.match(Ka), d = PE(t, n, r, a, o, c ? null : u, !1).index;
  c && Si(s, u, d, null, 0, null), e.push({ kind: 0, index: d });
}
i(SF, "i18nStartFirstCreatePassProcessTextNode");
function TF(e, t, n) {
  const o = J().index, s = [];
  if (ngDevMode && cr(s, fc), e.firstCreatePass && e.data[t] === null) {
    for (let a = 0; a < n.length; a += 2) {
      const u = n[a], c = n[a + 1];
      if (c !== "") {
        if (IF.test(c))
          throw new Error(`ICU expressions are not supported in attributes. Message: "${c}".`);
        Si(s, c, o, u, AF(s), null);
      }
    }
    e.data[t] = s;
  }
}
i(TF, "i18nAttributesFirstPass");
function Si(e, t, n, r, o, s) {
  ngDevMode && wn(n, A, "Index must be in absolute LView offset");
  const a = e.length, u = a + 1;
  e.push(null, null);
  const c = a + 2;
  ngDevMode && cr(e, fc);
  const l = t.split(Ka);
  let d = 0;
  for (let f = 0; f < l.length; f++) {
    const h = l[f];
    if (f & 1) {
      const p = o + parseInt(h, 10);
      e.push(-1 - p), d = d | LE(p);
    } else h !== "" && e.push(h);
  }
  return e.push(n << 2 | (r ? 1 : 0)), r && e.push(r, s), e[a] = d, e[u] = e.length - c, d;
}
i(Si, "generateBindingUpdateOpCodes");
function AF(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    typeof r == "number" && r < 0 && t++;
  }
  return t;
}
i(AF, "countBindings");
function LE(e) {
  return 1 << Math.min(e, 31);
}
i(LE, "toMaskBit");
function OF(e) {
  return e === -1;
}
i(OF, "isRootTemplateMessage");
function Xg(e) {
  let t, n = "", r = 0, o = !1, s;
  for (; (t = EF.exec(e)) !== null; )
    o ? t[0] === `${_i}/*${s}${_i}` && (r = t.index, o = !1) : (n += e.substring(r, t.index + t[0].length), s = t[1], o = !0);
  return ngDevMode && O(o, !1, `Tag mismatch: unable to find the end of the sub-template in the translation "${e}"`), n += e.slice(r), n;
}
i(Xg, "removeInnerTemplateTranslation");
function FF(e, t) {
  if (OF(t))
    return Xg(e);
  {
    const n = e.indexOf(`:${t}${_i}`) + 2 + t.toString().length, r = e.search(new RegExp(`${_i}\\/\\*\\d+:${t}${_i}`));
    return Xg(e.substring(n, r));
  }
}
i(FF, "getTranslationForTemplate");
function jE(e, t, n, r, o, s, a) {
  ngDevMode && b(s, "ICU expression must be defined");
  let u = 0;
  const c = {
    type: s.type,
    currentCaseLViewIndex: _s(t, n, 1, null),
    anchorIdx: a,
    cases: [],
    create: [],
    remove: [],
    update: []
  };
  xF(r, s, a), iF(t, a, c);
  const l = s.values, d = [];
  for (let f = 0; f < l.length; f++) {
    const h = l[f], p = [];
    for (let m = 0; m < h.length; m++) {
      const v = h[m];
      if (typeof v != "string") {
        const C = p.push(v) - 1;
        h[m] = `<!--�${C}�-->`;
      }
    }
    const g = [];
    d.push(g), u = kF(g, t, c, n, r, o, s.cases[f], h.join(""), p) | u;
  }
  u && PF(r, u, a), e.push({
    kind: 3,
    index: a,
    cases: d,
    currentCaseLViewIndex: c.currentCaseLViewIndex
  });
}
i(jE, "icuStart");
function NF(e) {
  const t = [], n = [];
  let r = 1, o = 0;
  e = e.replace(xE, function(a, u, c) {
    return c === "select" ? r = 0 : r = 1, o = parseInt(u.slice(1), 10), "";
  });
  const s = ad(e);
  for (let a = 0; a < s.length; ) {
    let u = s[a++].trim();
    r === 1 && (u = u.replace(/\s*(?:=)?(\w+)\s*/, "$1")), u.length && t.push(u);
    const c = ad(s[a++]);
    t.length > n.length && n.push(c);
  }
  return { type: r, mainBinding: o, cases: t, values: n };
}
i(NF, "parseICUBlock");
function ad(e) {
  if (!e)
    return [];
  let t = 0;
  const n = [], r = [], o = /[{}]/g;
  o.lastIndex = 0;
  let s;
  for (; s = o.exec(e); ) {
    const u = s.index;
    if (s[0] == "}") {
      if (n.pop(), n.length == 0) {
        const c = e.substring(t, u);
        xE.test(c) ? r.push(NF(c)) : r.push(c), t = u + 1;
      }
    } else {
      if (n.length == 0) {
        const c = e.substring(t, u);
        r.push(c), t = u + 1;
      }
      n.push("{");
    }
  }
  const a = e.substring(t);
  return r.push(a), r;
}
i(ad, "i18nParseTextIntoPartsAndICU");
function kF(e, t, n, r, o, s, a, u, c) {
  const l = [], d = [], f = [];
  ngDevMode && (cr(l, DF), cr(d, vF), cr(f, fc)), n.cases.push(a), n.create.push(l), n.remove.push(d), n.update.push(f);
  const p = pv(Kn()).getInertBodyElement(u);
  ngDevMode && b(p, "Unable to generate inert body element");
  const g = jl(p) || p;
  return g ? $E(e, t, n, r, o, l, d, f, g, s, c, 0) : 0;
}
i(kF, "parseIcuCase");
function $E(e, t, n, r, o, s, a, u, c, l, d, f) {
  let h = 0, p = c.firstChild;
  for (; p; ) {
    const g = _s(t, r, 1, null);
    switch (p.nodeType) {
      case Node.ELEMENT_NODE:
        const m = p, v = m.tagName.toLowerCase();
        if (Ll.hasOwnProperty(v)) {
          Hc(s, cc, v, l, g), t.data[g] = v;
          const R = m.attributes;
          for (let le = 0; le < R.length; le++) {
            const Ge = R.item(le), or = Ge.name.toLowerCase();
            !!Ge.value.match(Ka) ? Dv.hasOwnProperty(or) ? Df[or] ? Si(u, Ge.value, g, Ge.name, 0, Fu) : Si(u, Ge.value, g, Ge.name, 0, null) : ngDevMode && console.warn(`WARNING: ignoring unsafe attribute value ${or} on element ${v} (see ${jr})`) : LF(s, g, Ge);
          }
          const W = {
            kind: 1,
            index: g,
            children: []
          };
          e.push(W), h = $E(W.children, t, n, r, o, s, a, u, p, g, d, f + 1) | h, em(a, g, f);
        }
        break;
      case Node.TEXT_NODE:
        const C = p.textContent || "", D = C.match(Ka);
        Hc(s, null, D ? "" : C, l, g), em(a, g, f), D && (h = Si(u, C, g, null, 0, null) | h), e.push({
          kind: 0,
          index: g
        });
        break;
      case Node.COMMENT_NODE:
        const _ = CF.exec(p.textContent || "");
        if (_) {
          const R = parseInt(_[1], 10), W = d[R];
          Hc(s, lc, ngDevMode ? `nested ICU ${R}` : "", l, g), jE(e, t, r, o, l, W, g), RF(a, g, f);
        }
        break;
    }
    p = p.nextSibling;
  }
  return h;
}
i($E, "walkIcuTree");
function em(e, t, n) {
  n === 0 && e.push(t);
}
i(em, "addRemoveNode");
function RF(e, t, n) {
  n === 0 && (e.push(~t), e.push(t));
}
i(RF, "addRemoveNestedIcu");
function xF(e, t, n) {
  e.push(
    LE(t.mainBinding),
    2,
    -1 - t.mainBinding,
    n << 2 | 2
    /* I18nUpdateOpCode.IcuSwitch */
  );
}
i(xF, "addUpdateIcuSwitch");
function PF(e, t, n) {
  e.push(
    t,
    1,
    n << 2 | 3
    /* I18nUpdateOpCode.IcuUpdate */
  );
}
i(PF, "addUpdateIcuUpdate");
function Hc(e, t, n, r, o) {
  t !== null && e.push(t), e.push(n, o, uF(0, r, o));
}
i(Hc, "addCreateNodeAndAppend");
function LF(e, t, n) {
  e.push(t << 1 | 1, n.name, n.value);
}
i(LF, "addCreateAttribute");
const tm = 0, jF = /\[(�.+?�?)\]/, $F = /\[(�.+?�?)\]|(�\/?\*\d+:\d+�)/g, BF = /({\s*)(VAR_(PLURAL|SELECT)(_\d+)?)(\s*,)/g, HF = /{([A-Z0-9_]+)}/g, VF = /�I18N_EXP_(ICU(_\d+)?)�/g, UF = /\/\*/, zF = /\d+\:(\d+)/;
function GF(e, t = {}) {
  let n = e;
  if (jF.test(e)) {
    const r = {}, o = [tm];
    n = n.replace($F, (s, a, u) => {
      const c = a || u, l = r[c] || [];
      if (l.length || (c.split("|").forEach((m) => {
        const v = m.match(zF), C = v ? parseInt(v[1], 10) : tm, D = UF.test(m);
        l.push([C, D, m]);
      }), r[c] = l), !l.length)
        throw new Error(`i18n postprocess: unmatched placeholder - ${c}`);
      const d = o[o.length - 1];
      let f = 0;
      for (let m = 0; m < l.length; m++)
        if (l[m][0] === d) {
          f = m;
          break;
        }
      const [h, p, g] = l[f];
      return p ? o.pop() : d !== h && o.push(h), l.splice(f, 1), g;
    });
  }
  return Object.keys(t).length && (n = n.replace(BF, (r, o, s, a, u, c) => t.hasOwnProperty(s) ? `${o}${t[s]}${c}` : r), n = n.replace(HF, (r, o) => t.hasOwnProperty(o) ? t[o] : r), n = n.replace(VF, (r, o) => {
    if (t.hasOwnProperty(o)) {
      const s = t[o];
      if (!s.length)
        throw new Error(`i18n postprocess: unmatched ICU - ${r} with key: ${o}`);
      return s.shift();
    }
    return r;
  })), n;
}
i(GF, "i18nPostprocess");
function Th(e, t, n = -1) {
  const r = P(), o = y(), s = A + e;
  ngDevMode && b(r, "tView should be defined");
  const a = Xt(r.consts, t), u = Bi();
  if (r.firstCreatePass && _F(r, u === null ? 0 : u.index, o, s, a, n), r.type === 2) {
    const h = o[ve];
    h[S] |= 32;
  } else
    o[S] |= 32;
  const c = r.data[s], l = u === o[Be] ? null : u, d = $v(r, l, o), f = u && u.type & 8 ? o[u.index] : null;
  hF(o, c.create, d, f), lD(!0);
}
i(Th, "ɵɵi18nStart");
function Ah() {
  lD(!1);
}
i(Ah, "ɵɵi18nEnd");
function BE(e, t, n) {
  Th(e, t, n), Ah();
}
i(BE, "ɵɵi18n");
function HE(e, t) {
  const n = P();
  ngDevMode && b(n, "tView should be defined");
  const r = Xt(n.consts, t);
  TF(n, e + A, r);
}
i(HE, "ɵɵi18nAttributes");
function Oh(e) {
  const t = y();
  return cF(we(t, Bt(), e)), Oh;
}
i(Oh, "ɵɵi18nExp");
function VE(e) {
  lF(P(), y(), e + A);
}
i(VE, "ɵɵi18nApply");
function UE(e, t = {}) {
  return GF(e, t);
}
i(UE, "ɵɵi18nPostprocess");
function Fh(e, t, n, r) {
  const o = y(), s = P(), a = J();
  return kh(s, o, o[N], a, e, t, r), Fh;
}
i(Fh, "ɵɵlistener");
function Nh(e, t) {
  const n = J(), r = y(), o = P(), s = Kd(o.data), a = cI(s, n, r);
  return kh(o, r, a, n, e, t), Nh;
}
i(Nh, "ɵɵsyntheticHostListener");
function WF(e, t, n, r) {
  const o = e.cleanup;
  if (o != null)
    for (let s = 0; s < o.length - 1; s += 2) {
      const a = o[s];
      if (a === n && o[s + 1] === r) {
        const u = t[yo], c = o[s + 2];
        return u.length > c ? u[c] : null;
      }
      typeof a == "string" && (s += 2);
    }
  return null;
}
i(WF, "findExistingListener");
function kh(e, t, n, r, o, s, a) {
  const u = Cu(r), l = e.firstCreatePass && zl(e), d = t[se], f = uI(t);
  ngDevMode && $e(
    r,
    15
    /* TNodeType.AnyContainer */
  );
  let h = !0;
  if (r.type & 3 || a) {
    const m = He(r, t), v = a ? a(m) : m, C = f.length, D = a ? (R) => a(oe(R[r.index])) : r.index;
    let _ = null;
    if (!a && u && (_ = WF(e, t, o, r.index)), _ !== null) {
      const R = _.__ngLastListenerFn__ || _;
      R.__ngNextListenerFn__ = s, _.__ngLastListenerFn__ = s, h = !1;
    } else {
      s = rm(r, t, d, s);
      const R = n.listen(v, o, s);
      ngDevMode && ngDevMode.rendererAddEventListener++, f.push(s, R), l && l.push(o, D, C, C + 1);
    }
  } else
    s = rm(r, t, d, s);
  const p = r.outputs;
  let g;
  if (h && p !== null && (g = p[o])) {
    const m = g.length;
    if (m)
      for (let v = 0; v < m; v += 2) {
        const C = g[v];
        ngDevMode && be(t, C);
        const D = g[v + 1], _ = t[C], R = _[D];
        if (ngDevMode && !qF(R))
          throw new Error(`@Output ${D} not initialized in '${_.constructor.name}'.`);
        const W = R.subscribe(s), le = f.length;
        f.push(s, W), l && l.push(o, r.index, le, -(le + 1));
      }
  }
}
i(kh, "listenerInternal");
function nm(e, t, n, r) {
  const o = B(null);
  try {
    return Gt(6, t, n), n(r) !== !1;
  } catch (s) {
    return Vu(e, s), !1;
  } finally {
    Gt(7, t, n), B(o);
  }
}
i(nm, "executeListenerWithErrorHandling");
function rm(e, t, n, r, o) {
  return /* @__PURE__ */ i(function s(a) {
    if (a === Function)
      return r;
    const u = e.componentOffset > -1 ? yt(e.index, t) : t;
    As(u);
    let c = nm(t, n, r, a), l = s.__ngNextListenerFn__;
    for (; l; )
      c = nm(t, n, l, a) && c, l = l.__ngNextListenerFn__;
    return c;
  }, "wrapListenerIn_markDirtyAndPreventDefault");
}
i(rm, "wrapListener");
function qF(e) {
  return e != null && typeof e.subscribe == "function";
}
i(qF, "isOutputSubscribable");
function zE(e = 1) {
  return f_(e);
}
i(zE, "ɵɵnextContext");
function QF(e, t) {
  let n = null;
  const r = IM(e);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    if (s === "*") {
      n = o;
      continue;
    }
    if (r === null ? Ey(
      e,
      s,
      /* isProjectionMode */
      !0
    ) : bM(r, s))
      return o;
  }
  return n;
}
i(QF, "matchingProjectionSlotIndex");
function GE(e) {
  const t = y()[ve][Be];
  if (!t.projection) {
    const n = e ? e.length : 1, r = t.projection = yi(n, null), o = r.slice();
    let s = t.child;
    for (; s !== null; ) {
      const a = e ? QF(s, e) : 0;
      a !== null && (o[a] ? o[a].projectionNext = s : r[a] = s, o[a] = s), s = s.next;
    }
  }
}
i(GE, "ɵɵprojectionDef");
function WE(e, t = 0, n) {
  const r = y(), o = P(), s = Qo(o, A + e, 16, null, n || null);
  s.projection === null && (s.projection = t), Yd(), (!r[mt] || Ho()) && (s.flags & 32) !== 32 && _T(o, r, s);
}
i(WE, "ɵɵprojection");
function Rh(e, t, n) {
  return hc(e, "", t, "", n), Rh;
}
i(Rh, "ɵɵpropertyInterpolate");
function hc(e, t, n, r, o) {
  const s = y(), a = ti(s, t, n, r);
  if (a !== F) {
    const u = P(), c = ce();
    at(u, c, s, e, a, s[N], o, !1), ngDevMode && Ie(u.data, c, e, ee() - 1, t, r);
  }
  return hc;
}
i(hc, "ɵɵpropertyInterpolate1");
function xh(e, t, n, r, o, s, a) {
  const u = y(), c = ni(u, t, n, r, o, s);
  if (c !== F) {
    const l = P(), d = ce();
    at(l, d, u, e, c, u[N], a, !1), ngDevMode && Ie(l.data, d, e, ee() - 2, t, r, s);
  }
  return xh;
}
i(xh, "ɵɵpropertyInterpolate2");
function Ph(e, t, n, r, o, s, a, u, c) {
  const l = y(), d = ri(l, t, n, r, o, s, a, u);
  if (d !== F) {
    const f = P(), h = ce();
    at(f, h, l, e, d, l[N], c, !1), ngDevMode && Ie(f.data, h, e, ee() - 3, t, r, s, u);
  }
  return Ph;
}
i(Ph, "ɵɵpropertyInterpolate3");
function Lh(e, t, n, r, o, s, a, u, c, l, d) {
  const f = y(), h = oi(f, t, n, r, o, s, a, u, c, l);
  if (h !== F) {
    const p = P(), g = ce();
    at(p, g, f, e, h, f[N], d, !1), ngDevMode && Ie(p.data, g, e, ee() - 4, t, r, s, u, l);
  }
  return Lh;
}
i(Lh, "ɵɵpropertyInterpolate4");
function jh(e, t, n, r, o, s, a, u, c, l, d, f, h) {
  const p = y(), g = ii(p, t, n, r, o, s, a, u, c, l, d, f);
  if (g !== F) {
    const m = P(), v = ce();
    at(m, v, p, e, g, p[N], h, !1), ngDevMode && Ie(m.data, v, e, ee() - 5, t, r, s, u, l, f);
  }
  return jh;
}
i(jh, "ɵɵpropertyInterpolate5");
function $h(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g) {
  const m = y(), v = si(m, t, n, r, o, s, a, u, c, l, d, f, h, p);
  if (v !== F) {
    const C = P(), D = ce();
    at(C, D, m, e, v, m[N], g, !1), ngDevMode && Ie(C.data, D, e, ee() - 6, t, r, s, u, l, f, p);
  }
  return $h;
}
i($h, "ɵɵpropertyInterpolate6");
function Bh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v) {
  const C = y(), D = ai(C, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m);
  if (D !== F) {
    const _ = P(), R = ce();
    at(_, R, C, e, D, C[N], v, !1), ngDevMode && Ie(_.data, R, e, ee() - 7, t, r, s, u, l, f, p, m);
  }
  return Bh;
}
i(Bh, "ɵɵpropertyInterpolate7");
function Hh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C, D) {
  const _ = y(), R = ui(_, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C);
  if (R !== F) {
    const W = P(), le = ce();
    at(W, le, _, e, R, _[N], D, !1), ngDevMode && Ie(W.data, le, e, ee() - 8, t, r, s, u, l, f, p, m, C);
  }
  return Hh;
}
i(Hh, "ɵɵpropertyInterpolate8");
function Vh(e, t, n) {
  const r = y(), o = ei(r, t);
  if (o !== F) {
    const s = P(), a = ce();
    if (at(s, a, r, e, o, r[N], n, !1), ngDevMode) {
      const u = [t[0]];
      for (let c = 2; c < t.length; c += 2)
        u.push(t[c]);
      Ie(s.data, a, e, ee() - u.length + 1, ...u);
    }
  }
  return Vh;
}
i(Vh, "ɵɵpropertyInterpolateV");
function qE(e, t, n, r) {
  BI(e, t, n, r);
}
i(qE, "ɵɵcontentQuery");
function QE(e, t, n) {
  $I(e, t, n);
}
i(QE, "ɵɵviewQuery");
function ZE(e) {
  const t = y(), n = P(), r = Jd();
  bu(r + 1);
  const o = Yf(n, r);
  if (e.dirty && vs(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null)
      e.reset([]);
    else {
      const s = VI(t, r);
      e.reset(s, xD), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
i(ZE, "ɵɵqueryRefresh");
function YE() {
  return Zf(y(), Jd());
}
i(YE, "ɵɵloadQuery");
function KE(e, t, n, r, o) {
  ZI(t, BI(e, n, r, o));
}
i(KE, "ɵɵcontentQuerySignal");
function JE(e, t, n, r) {
  ZI(e, $I(t, n, r));
}
i(JE, "ɵɵviewQuerySignal");
function XE(e = 1) {
  bu(Jd() + e);
}
i(XE, "ɵɵqueryAdvance");
function e0(e, t, n, r) {
  n >= e.data.length && (e.data[n] = null, e.blueprint[n] = null), t[n] = r;
}
i(e0, "store");
function t0(e) {
  const t = a_();
  return Bo(t, A + e);
}
i(t0, "ɵɵreference");
function n0(e, t, n) {
  const r = y(), o = ti(r, e, t, n);
  Ht(o);
}
i(n0, "ɵɵstyleMapInterpolate1");
function r0(e, t, n, r, o) {
  const s = y(), a = ni(s, e, t, n, r, o);
  Ht(a);
}
i(r0, "ɵɵstyleMapInterpolate2");
function o0(e, t, n, r, o, s, a) {
  const u = y(), c = ri(u, e, t, n, r, o, s, a);
  Ht(c);
}
i(o0, "ɵɵstyleMapInterpolate3");
function i0(e, t, n, r, o, s, a, u, c) {
  const l = y(), d = oi(l, e, t, n, r, o, s, a, u, c);
  Ht(d);
}
i(i0, "ɵɵstyleMapInterpolate4");
function s0(e, t, n, r, o, s, a, u, c, l, d) {
  const f = y(), h = ii(f, e, t, n, r, o, s, a, u, c, l, d);
  Ht(h);
}
i(s0, "ɵɵstyleMapInterpolate5");
function a0(e, t, n, r, o, s, a, u, c, l, d, f, h) {
  const p = y(), g = si(p, e, t, n, r, o, s, a, u, c, l, d, f, h);
  Ht(g);
}
i(a0, "ɵɵstyleMapInterpolate6");
function u0(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g) {
  const m = y(), v = ai(m, e, t, n, r, o, s, a, u, c, l, d, f, h, p, g);
  Ht(v);
}
i(u0, "ɵɵstyleMapInterpolate7");
function c0(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v) {
  const C = y(), D = ui(C, e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v);
  Ht(D);
}
i(c0, "ɵɵstyleMapInterpolate8");
function l0(e) {
  const t = y(), n = ei(t, e);
  Ht(n);
}
i(l0, "ɵɵstyleMapInterpolateV");
function Uh(e, t, n, r, o) {
  const s = y(), a = ti(s, t, n, r);
  return Vt(e, a, o, !1), Uh;
}
i(Uh, "ɵɵstylePropInterpolate1");
function zh(e, t, n, r, o, s, a) {
  const u = y(), c = ni(u, t, n, r, o, s);
  return Vt(e, c, a, !1), zh;
}
i(zh, "ɵɵstylePropInterpolate2");
function Gh(e, t, n, r, o, s, a, u, c) {
  const l = y(), d = ri(l, t, n, r, o, s, a, u);
  return Vt(e, d, c, !1), Gh;
}
i(Gh, "ɵɵstylePropInterpolate3");
function Wh(e, t, n, r, o, s, a, u, c, l, d) {
  const f = y(), h = oi(f, t, n, r, o, s, a, u, c, l);
  return Vt(e, h, d, !1), Wh;
}
i(Wh, "ɵɵstylePropInterpolate4");
function qh(e, t, n, r, o, s, a, u, c, l, d, f, h) {
  const p = y(), g = ii(p, t, n, r, o, s, a, u, c, l, d, f);
  return Vt(e, g, h, !1), qh;
}
i(qh, "ɵɵstylePropInterpolate5");
function Qh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g) {
  const m = y(), v = si(m, t, n, r, o, s, a, u, c, l, d, f, h, p);
  return Vt(e, v, g, !1), Qh;
}
i(Qh, "ɵɵstylePropInterpolate6");
function Zh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v) {
  const C = y(), D = ai(C, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m);
  return Vt(e, D, v, !1), Zh;
}
i(Zh, "ɵɵstylePropInterpolate7");
function Yh(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C, D) {
  const _ = y(), R = ui(_, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v, C);
  return Vt(e, R, D, !1), Yh;
}
i(Yh, "ɵɵstylePropInterpolate8");
function Kh(e, t, n) {
  const r = y(), o = ei(r, t);
  return Vt(e, o, n, !1), Kh;
}
i(Kh, "ɵɵstylePropInterpolateV");
function d0(e, t = "") {
  const n = y(), r = P(), o = e + A;
  ngDevMode && O(ee(), r.bindingStartIndex, "text nodes should be created before any bindings"), ngDevMode && be(n, o);
  const s = r.firstCreatePass ? Qo(r, o, 1, t, null) : r.data[o], a = f0(r, n, s, t, e);
  n[o] = a, Is() && ju(r, n, a, s), en(s, !1);
}
i(d0, "ɵɵtext");
let f0 = /* @__PURE__ */ i((e, t, n, r, o) => (rn(!0), _f(t[N], r)), "_locateOrCreateTextNode");
function ZF(e, t, n, r, o) {
  const s = t[mt], a = !s || Ho() || xs(n) || Ou(s, o);
  if (rn(a), a)
    return _f(t[N], r);
  const u = Qu(s, e, t, n);
  return ngDevMode && Os(u, Node.TEXT_NODE, null, t, n), ngDevMode && Go(u), u;
}
i(ZF, "locateOrCreateTextNodeImpl");
function YF() {
  f0 = ZF;
}
i(YF, "enableLocateOrCreateTextNodeImpl");
function Jh(e) {
  return pc("", e, ""), Jh;
}
i(Jh, "ɵɵtextInterpolate");
function pc(e, t, n) {
  const r = y(), o = ti(r, e, t, n);
  return o !== F && Tn(r, Ve(), o), pc;
}
i(pc, "ɵɵtextInterpolate1");
function Xh(e, t, n, r, o) {
  const s = y(), a = ni(s, e, t, n, r, o);
  return a !== F && Tn(s, Ve(), a), Xh;
}
i(Xh, "ɵɵtextInterpolate2");
function ep(e, t, n, r, o, s, a) {
  const u = y(), c = ri(u, e, t, n, r, o, s, a);
  return c !== F && Tn(u, Ve(), c), ep;
}
i(ep, "ɵɵtextInterpolate3");
function tp(e, t, n, r, o, s, a, u, c) {
  const l = y(), d = oi(l, e, t, n, r, o, s, a, u, c);
  return d !== F && Tn(l, Ve(), d), tp;
}
i(tp, "ɵɵtextInterpolate4");
function np(e, t, n, r, o, s, a, u, c, l, d) {
  const f = y(), h = ii(f, e, t, n, r, o, s, a, u, c, l, d);
  return h !== F && Tn(f, Ve(), h), np;
}
i(np, "ɵɵtextInterpolate5");
function rp(e, t, n, r, o, s, a, u, c, l, d, f, h) {
  const p = y(), g = si(p, e, t, n, r, o, s, a, u, c, l, d, f, h);
  return g !== F && Tn(p, Ve(), g), rp;
}
i(rp, "ɵɵtextInterpolate6");
function op(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g) {
  const m = y(), v = ai(m, e, t, n, r, o, s, a, u, c, l, d, f, h, p, g);
  return v !== F && Tn(m, Ve(), v), op;
}
i(op, "ɵɵtextInterpolate7");
function ip(e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v) {
  const C = y(), D = ui(C, e, t, n, r, o, s, a, u, c, l, d, f, h, p, g, m, v);
  return D !== F && Tn(C, Ve(), D), ip;
}
i(ip, "ɵɵtextInterpolate8");
function sp(e) {
  const t = y(), n = ei(t, e);
  return n !== F && Tn(t, Ve(), n), sp;
}
i(sp, "ɵɵtextInterpolateV");
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ap(e, t, n) {
  GI(t) && (t = t());
  const r = y(), o = Bt();
  if (we(r, o, t)) {
    const s = P(), a = ce();
    at(s, a, r, e, t, r[N], n, !1), ngDevMode && Ie(s.data, a, e, o);
  }
  return ap;
}
i(ap, "ɵɵtwoWayProperty");
function h0(e, t) {
  const n = GI(e);
  return n && e.set(t), n;
}
i(h0, "ɵɵtwoWayBindingSet");
function up(e, t) {
  const n = y(), r = P(), o = J();
  return kh(r, n, n[N], o, e, t), up;
}
i(up, "ɵɵtwoWayListener");
function KF(e, t, n) {
  const r = P();
  if (r.firstCreatePass) {
    const o = wt(e);
    ud(n, r.data, r.blueprint, o, !0), ud(t, r.data, r.blueprint, o, !1);
  }
}
i(KF, "providersResolver");
function ud(e, t, n, r, o) {
  if (e = x(e), Array.isArray(e))
    for (let s = 0; s < e.length; s++)
      ud(e[s], t, n, r, o);
  else {
    const s = P(), a = y(), u = J();
    let c = hr(e) ? e : x(e.provide);
    const l = Ry(e);
    if (ngDevMode) {
      const p = new De(u, a);
      mi(p, c, () => {
        hl(e, o);
      });
    }
    const d = u.providerIndexes & 1048575, f = u.directiveStart, h = u.providerIndexes >> 20;
    if (hr(e) || !e.multi) {
      const p = new Cs(l, o, zr), g = Uc(c, t, o ? d : d + h, f);
      g === -1 ? (_l(Ra(u, a), s, c), Vc(s, e, t.length), t.push(c), u.directiveStart++, u.directiveEnd++, o && (u.providerIndexes += 1048576), n.push(p), a.push(p)) : (n[g] = p, a[g] = p);
    } else {
      const p = Uc(c, t, d + h, f), g = Uc(c, t, d, d + h), m = p >= 0 && n[p], v = g >= 0 && n[g];
      if (o && !v || !o && !m) {
        _l(Ra(u, a), s, c);
        const C = eN(o ? XF : JF, n.length, o, r, l);
        !o && v && (n[g].providerFactory = C), Vc(s, e, t.length, 0), t.push(c), u.directiveStart++, u.directiveEnd++, o && (u.providerIndexes += 1048576), n.push(C), a.push(C);
      } else {
        const C = p0(n[o ? g : p], l, !o && r);
        Vc(s, e, p > -1 ? p : g, C);
      }
      !o && r && v && n[g].componentProviders++;
    }
  }
}
i(ud, "resolveProvider");
function Vc(e, t, n, r) {
  const o = hr(t), s = OM(t);
  if (o || s) {
    const c = (s ? x(t.useClass) : t).prototype.ngOnDestroy;
    if (c) {
      const l = e.destroyHooks || (e.destroyHooks = []);
      if (!o && t.multi) {
        ngDevMode && b(r, "indexInFactory when registering multi factory destroy hook");
        const d = l.indexOf(n);
        d === -1 ? l.push(n, [r, c]) : l[d + 1].push(r, c);
      } else
        l.push(n, c);
    }
  }
}
i(Vc, "registerDestroyHooksIfSupported");
function p0(e, t, n) {
  return n && e.componentProviders++, e.multi.push(t) - 1;
}
i(p0, "multiFactoryAdd");
function Uc(e, t, n, r) {
  for (let o = n; o < r; o++)
    if (t[o] === e)
      return o;
  return -1;
}
i(Uc, "indexOf");
function JF(e, t, n, r) {
  return cd(this.multi, []);
}
i(JF, "multiProvidersFactoryResolver");
function XF(e, t, n, r) {
  const o = this.multi;
  let s;
  if (this.providerFactory) {
    const a = this.providerFactory.componentProviders, u = vr(n, n[E], this.providerFactory.index, r);
    s = u.slice(0, a), cd(o, s);
    for (let c = a; c < u.length; c++)
      s.push(u[c]);
  } else
    s = [], cd(o, s);
  return s;
}
i(XF, "multiViewProvidersFactoryResolver");
function cd(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t.push(r());
  }
  return t;
}
i(cd, "multiResolve");
function eN(e, t, n, r, o) {
  const s = new Cs(e, n, zr);
  return s.multi = [], s.index = t, s.componentProviders = 0, p0(s, o, r && !n), s;
}
i(eN, "multiFactory");
function g0(e, t = []) {
  return (n) => {
    n.providersResolver = (r, o) => KF(
      r,
      //
      o ? o(e) : e,
      //
      t
    );
  };
}
i(g0, "ɵɵProvidersFeature");
class Ja {
  static {
    i(this, "StandaloneService");
  }
  constructor(t) {
    this._injector = t, this.cachedInjectors = /* @__PURE__ */ new Map();
  }
  getOrCreateStandaloneInjector(t) {
    if (!t.standalone)
      return null;
    if (!this.cachedInjectors.has(t)) {
      const n = xd(!1, t.type), r = n.length > 0 ? oh([n], this._injector, `Standalone[${t.type.name}]`) : null;
      this.cachedInjectors.set(t, r);
    }
    return this.cachedInjectors.get(t);
  }
  ngOnDestroy() {
    try {
      for (const t of this.cachedInjectors.values())
        t !== null && t.destroy();
    } finally {
      this.cachedInjectors.clear();
    }
  }
  static {
    this.ɵprov = ne({
      token: Ja,
      providedIn: "environment",
      factory: /* @__PURE__ */ i(() => new Ja(ke(Lt)), "factory")
    });
  }
}
function m0(e) {
  St("NgStandalone"), e.getStandaloneInjector = (t) => t.get(Ja).getOrCreateStandaloneInjector(e);
}
i(m0, "ɵɵStandaloneFeature");
function y0(e, t, n) {
  const r = e.ɵcmp;
  r.directiveDefs = Ta(
    t,
    /* pipeDef */
    !1
  ), r.pipeDefs = Ta(
    n,
    /* pipeDef */
    !0
  );
}
i(y0, "ɵɵsetComponentScope");
function D0(e, t) {
  return tn(() => {
    const n = gt(e, !0);
    n.declarations = Ks(t.declarations || Q), n.imports = Ks(t.imports || Q), n.exports = Ks(t.exports || Q), t.bootstrap && (n.bootstrap = Ks(t.bootstrap)), Er.registerNgModule(e, t);
  });
}
i(D0, "ɵɵsetNgModuleScope");
function Ks(e) {
  if (typeof e == "function")
    return e;
  const t = nt(e);
  return t.some(hu) ? () => t.map(x).map(om) : t.map(om);
}
i(Ks, "convertToTypeArray");
function om(e) {
  return Uf(e) ? e.ngModule : e;
}
i(om, "maybeUnwrapModuleWithProviders");
function v0(e, t, n) {
  const r = Je() + e, o = y();
  return o[r] === F ? un(o, r, n ? t.call(n) : t()) : Rs(o, r);
}
i(v0, "ɵɵpureFunction0");
function I0(e, t, n, r) {
  return A0(y(), Je(), e, t, n, r);
}
i(I0, "ɵɵpureFunction1");
function C0(e, t, n, r, o) {
  return O0(y(), Je(), e, t, n, r, o);
}
i(C0, "ɵɵpureFunction2");
function E0(e, t, n, r, o, s) {
  return F0(y(), Je(), e, t, n, r, o, s);
}
i(E0, "ɵɵpureFunction3");
function b0(e, t, n, r, o, s, a) {
  return N0(y(), Je(), e, t, n, r, o, s, a);
}
i(b0, "ɵɵpureFunction4");
function w0(e, t, n, r, o, s, a, u) {
  const c = Je() + e, l = y(), d = Mt(l, c, n, r, o, s);
  return we(l, c + 4, a) || d ? un(l, c + 5, u ? t.call(u, n, r, o, s, a) : t(n, r, o, s, a)) : Rs(l, c + 5);
}
i(w0, "ɵɵpureFunction5");
function M0(e, t, n, r, o, s, a, u, c) {
  const l = Je() + e, d = y(), f = Mt(d, l, n, r, o, s);
  return br(d, l + 4, a, u) || f ? un(d, l + 6, c ? t.call(c, n, r, o, s, a, u) : t(n, r, o, s, a, u)) : Rs(d, l + 6);
}
i(M0, "ɵɵpureFunction6");
function _0(e, t, n, r, o, s, a, u, c, l) {
  const d = Je() + e, f = y();
  let h = Mt(f, d, n, r, o, s);
  return tc(f, d + 4, a, u, c) || h ? un(f, d + 7, l ? t.call(l, n, r, o, s, a, u, c) : t(n, r, o, s, a, u, c)) : Rs(f, d + 7);
}
i(_0, "ɵɵpureFunction7");
function S0(e, t, n, r, o, s, a, u, c, l, d) {
  const f = Je() + e, h = y(), p = Mt(h, f, n, r, o, s);
  return Mt(h, f + 4, a, u, c, l) || p ? un(h, f + 8, d ? t.call(d, n, r, o, s, a, u, c, l) : t(n, r, o, s, a, u, c, l)) : Rs(h, f + 8);
}
i(S0, "ɵɵpureFunction8");
function T0(e, t, n, r) {
  return k0(y(), Je(), e, t, n, r);
}
i(T0, "ɵɵpureFunctionV");
function js(e, t) {
  ngDevMode && be(e, t);
  const n = e[t];
  return n === F ? void 0 : n;
}
i(js, "getPureFunctionReturnValue");
function A0(e, t, n, r, o, s) {
  const a = t + n;
  return we(e, a, o) ? un(e, a + 1, s ? r.call(s, o) : r(o)) : js(e, a + 1);
}
i(A0, "pureFunction1Internal");
function O0(e, t, n, r, o, s, a) {
  const u = t + n;
  return br(e, u, o, s) ? un(e, u + 2, a ? r.call(a, o, s) : r(o, s)) : js(e, u + 2);
}
i(O0, "pureFunction2Internal");
function F0(e, t, n, r, o, s, a, u) {
  const c = t + n;
  return tc(e, c, o, s, a) ? un(e, c + 3, u ? r.call(u, o, s, a) : r(o, s, a)) : js(e, c + 3);
}
i(F0, "pureFunction3Internal");
function N0(e, t, n, r, o, s, a, u, c) {
  const l = t + n;
  return Mt(e, l, o, s, a, u) ? un(e, l + 4, c ? r.call(c, o, s, a, u) : r(o, s, a, u)) : js(e, l + 4);
}
i(N0, "pureFunction4Internal");
function k0(e, t, n, r, o, s) {
  let a = t + n, u = !1;
  for (let c = 0; c < o.length; c++)
    we(e, a++, o[c]) && (u = !0);
  return u ? un(e, a, r.apply(s, o)) : js(e, a);
}
i(k0, "pureFunctionVInternal");
function R0(e, t) {
  const n = P();
  let r;
  const o = e + A;
  n.firstCreatePass ? (r = tN(t, n.pipeRegistry), n.data[o] = r, r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy)) : r = n.data[o];
  const s = r.factory || (r.factory = lr(r.type, !0));
  let a;
  ngDevMode && (a = We({
    injector: new De(J(), y()),
    token: r.type
  }));
  const u = tt(zr);
  try {
    const c = ka(!1), l = s();
    return ka(c), e0(n, y(), o, l), l;
  } finally {
    tt(u), ngDevMode && We(a);
  }
}
i(R0, "ɵɵpipe");
function tN(e, t) {
  if (t) {
    ngDevMode && t.filter((r) => r.name === e).length > 1 && console.warn(ye(313, nN(e)));
    for (let n = t.length - 1; n >= 0; n--) {
      const r = t[n];
      if (e === r.name)
        return r;
    }
  }
  if (ngDevMode)
    throw new I(-302, rN(e));
}
i(tN, "getPipeDef");
function nN(e) {
  const t = y(), r = t[ve][se], o = ku(t), s = r ? ` in the '${r.constructor.name}' component` : "";
  return `Multiple pipes match the name \`${e}\`${s}. ${`check ${o ? "'@Component.imports' of this component" : "the imports of this module"}`}`;
}
i(nN, "getMultipleMatchingPipesMessage");
function rN(e) {
  const t = y(), r = t[ve][se], o = ku(t), s = r ? ` in the '${r.constructor.name}' component` : "";
  return `The pipe '${e}' could not be found${s}. ${`Verify that it is ${o ? "included in the '@Component.imports' of this component" : "declared or imported in this module"}`}`;
}
i(rN, "getPipeNotFoundErrorMessage");
function x0(e, t, n) {
  const r = e + A, o = y(), s = Bo(o, r);
  return $s(o, r) ? A0(o, Je(), t, s.transform, n, s) : s.transform(n);
}
i(x0, "ɵɵpipeBind1");
function P0(e, t, n, r) {
  const o = e + A, s = y(), a = Bo(s, o);
  return $s(s, o) ? O0(s, Je(), t, a.transform, n, r, a) : a.transform(n, r);
}
i(P0, "ɵɵpipeBind2");
function L0(e, t, n, r, o) {
  const s = e + A, a = y(), u = Bo(a, s);
  return $s(a, s) ? F0(a, Je(), t, u.transform, n, r, o, u) : u.transform(n, r, o);
}
i(L0, "ɵɵpipeBind3");
function j0(e, t, n, r, o, s) {
  const a = e + A, u = y(), c = Bo(u, a);
  return $s(u, a) ? N0(u, Je(), t, c.transform, n, r, o, s, c) : c.transform(n, r, o, s);
}
i(j0, "ɵɵpipeBind4");
function $0(e, t, n) {
  const r = e + A, o = y(), s = Bo(o, r);
  return $s(o, r) ? k0(o, Je(), t, s.transform, n, s) : s.transform.apply(s, n);
}
i($0, "ɵɵpipeBindV");
function $s(e, t) {
  return e[E].data[t].pure;
}
i($s, "isPure");
function B0(e, t) {
  return Gu(e, t);
}
i(B0, "ɵɵtemplateRefExtractor");
function H0(e, t) {
  return () => {
    try {
      return Er.getComponentDependencies(e, t).dependencies;
    } catch (n) {
      throw console.error(`Computing dependencies in local compilation mode for the component "${e.name}" failed with the exception:`, n), n;
    }
  };
}
i(H0, "ɵɵgetComponentDepsFactory");
function V0(e, t) {
  const n = U(e);
  n !== null && (n.debugInfo = t);
}
i(V0, "ɵsetClassDebugInfo");
const Qe = {
  ɵɵattribute: ch,
  ɵɵattributeInterpolate1: lh,
  ɵɵattributeInterpolate2: dh,
  ɵɵattributeInterpolate3: fh,
  ɵɵattributeInterpolate4: hh,
  ɵɵattributeInterpolate5: ph,
  ɵɵattributeInterpolate6: gh,
  ɵɵattributeInterpolate7: mh,
  ɵɵattributeInterpolate8: yh,
  ɵɵattributeInterpolateV: Dh,
  ɵɵdefineComponent: wy,
  ɵɵdefineDirective: My,
  ɵɵdefineInjectable: ne,
  ɵɵdefineInjector: pu,
  ɵɵdefineNgModule: Rd,
  ɵɵdefinePipe: _y,
  ɵɵdirectiveInject: zr,
  ɵɵgetInheritedFactory: AD,
  ɵɵinject: ke,
  ɵɵinjectAttribute: _u,
  ɵɵinvalidFactory: Jv,
  ɵɵinvalidFactoryDep: Od,
  ɵɵtemplateRefExtractor: B0,
  ɵɵresetView: aD,
  ɵɵHostDirectivesFeature: cC,
  ɵɵNgOnChangesFeature: zd,
  ɵɵProvidersFeature: g0,
  ɵɵCopyDefinitionFeature: uC,
  ɵɵInheritDefinitionFeature: nh,
  ɵɵInputTransformsFeature: dC,
  ɵɵStandaloneFeature: m0,
  ɵɵnextContext: zE,
  ɵɵnamespaceHTML: DD,
  ɵɵnamespaceMathML: yD,
  ɵɵnamespaceSVG: mD,
  ɵɵenableBindings: oD,
  ɵɵdisableBindings: iD,
  ɵɵelementStart: ic,
  ɵɵelementEnd: sc,
  ɵɵelement: Eh,
  ɵɵelementContainerStart: ac,
  ɵɵelementContainerEnd: uc,
  ɵɵelementContainer: bh,
  ɵɵpureFunction0: v0,
  ɵɵpureFunction1: I0,
  ɵɵpureFunction2: C0,
  ɵɵpureFunction3: E0,
  ɵɵpureFunction4: b0,
  ɵɵpureFunction5: w0,
  ɵɵpureFunction6: M0,
  ɵɵpureFunction7: _0,
  ɵɵpureFunction8: S0,
  ɵɵpureFunctionV: T0,
  ɵɵgetCurrentView: EE,
  ɵɵrestoreView: sD,
  ɵɵlistener: Fh,
  ɵɵprojection: WE,
  ɵɵsyntheticHostProperty: Mh,
  ɵɵsyntheticHostListener: Nh,
  ɵɵpipeBind1: x0,
  ɵɵpipeBind2: P0,
  ɵɵpipeBind3: L0,
  ɵɵpipeBind4: j0,
  ɵɵpipeBindV: $0,
  ɵɵprojectionDef: GE,
  ɵɵhostProperty: wh,
  ɵɵproperty: vh,
  ɵɵpropertyInterpolate: Rh,
  ɵɵpropertyInterpolate1: hc,
  ɵɵpropertyInterpolate2: xh,
  ɵɵpropertyInterpolate3: Ph,
  ɵɵpropertyInterpolate4: Lh,
  ɵɵpropertyInterpolate5: jh,
  ɵɵpropertyInterpolate6: $h,
  ɵɵpropertyInterpolate7: Bh,
  ɵɵpropertyInterpolate8: Hh,
  ɵɵpropertyInterpolateV: Vh,
  ɵɵpipe: R0,
  ɵɵqueryRefresh: ZE,
  ɵɵqueryAdvance: XE,
  ɵɵviewQuery: QE,
  ɵɵviewQuerySignal: JE,
  ɵɵloadQuery: YE,
  ɵɵcontentQuery: qE,
  ɵɵcontentQuerySignal: KE,
  ɵɵreference: t0,
  ɵɵclassMap: XC,
  ɵɵclassMapInterpolate1: iE,
  ɵɵclassMapInterpolate2: sE,
  ɵɵclassMapInterpolate3: aE,
  ɵɵclassMapInterpolate4: uE,
  ɵɵclassMapInterpolate5: cE,
  ɵɵclassMapInterpolate6: lE,
  ɵɵclassMapInterpolate7: dE,
  ɵɵclassMapInterpolate8: fE,
  ɵɵclassMapInterpolateV: hE,
  ɵɵstyleMap: Ht,
  ɵɵstyleMapInterpolate1: n0,
  ɵɵstyleMapInterpolate2: r0,
  ɵɵstyleMapInterpolate3: o0,
  ɵɵstyleMapInterpolate4: i0,
  ɵɵstyleMapInterpolate5: s0,
  ɵɵstyleMapInterpolate6: a0,
  ɵɵstyleMapInterpolate7: u0,
  ɵɵstyleMapInterpolate8: c0,
  ɵɵstyleMapInterpolateV: l0,
  ɵɵstyleProp: Ih,
  ɵɵstylePropInterpolate1: Uh,
  ɵɵstylePropInterpolate2: zh,
  ɵɵstylePropInterpolate3: Gh,
  ɵɵstylePropInterpolate4: Wh,
  ɵɵstylePropInterpolate5: qh,
  ɵɵstylePropInterpolate6: Qh,
  ɵɵstylePropInterpolate7: Zh,
  ɵɵstylePropInterpolate8: Yh,
  ɵɵstylePropInterpolateV: Kh,
  ɵɵclassProp: Ch,
  ɵɵadvance: Yv,
  ɵɵtemplate: So,
  ɵɵconditional: gE,
  ɵɵdefer: OC,
  ɵɵdeferWhen: FC,
  ɵɵdeferOnIdle: kC,
  ɵɵdeferOnImmediate: xC,
  ɵɵdeferOnTimer: LC,
  ɵɵdeferOnHover: $C,
  ɵɵdeferOnInteraction: HC,
  ɵɵdeferOnViewport: UC,
  ɵɵdeferPrefetchWhen: NC,
  ɵɵdeferPrefetchOnIdle: RC,
  ɵɵdeferPrefetchOnImmediate: PC,
  ɵɵdeferPrefetchOnTimer: jC,
  ɵɵdeferPrefetchOnHover: BC,
  ɵɵdeferPrefetchOnInteraction: VC,
  ɵɵdeferPrefetchOnViewport: zC,
  ɵɵdeferEnableTimerScheduling: AC,
  ɵɵrepeater: vE,
  ɵɵrepeaterCreate: DE,
  ɵɵrepeaterTrackByIndex: mE,
  ɵɵrepeaterTrackByIdentity: yE,
  ɵɵcomponentInstance: pE,
  ɵɵtext: d0,
  ɵɵtextInterpolate: Jh,
  ɵɵtextInterpolate1: pc,
  ɵɵtextInterpolate2: Xh,
  ɵɵtextInterpolate3: ep,
  ɵɵtextInterpolate4: tp,
  ɵɵtextInterpolate5: np,
  ɵɵtextInterpolate6: rp,
  ɵɵtextInterpolate7: op,
  ɵɵtextInterpolate8: ip,
  ɵɵtextInterpolateV: sp,
  ɵɵi18n: BE,
  ɵɵi18nAttributes: HE,
  ɵɵi18nExp: Oh,
  ɵɵi18nStart: Th,
  ɵɵi18nEnd: Ah,
  ɵɵi18nApply: VE,
  ɵɵi18nPostprocess: UE,
  ɵɵresolveWindow: Fv,
  ɵɵresolveDocument: Nv,
  ɵɵresolveBody: wf,
  ɵɵsetComponentScope: y0,
  ɵɵsetNgModuleScope: D0,
  ɵɵregisterNgModuleType: th,
  ɵɵgetComponentDepsFactory: H0,
  ɵsetClassDebugInfo: V0,
  ɵɵsanitizeHtml: Cv,
  ɵɵsanitizeStyle: Ev,
  ɵɵsanitizeResourceUrl: If,
  ɵɵsanitizeScript: bv,
  ɵɵsanitizeUrl: vf,
  ɵɵsanitizeUrlOrResourceUrl: _v,
  ɵɵtrustConstantHtml: wv,
  ɵɵtrustConstantResourceUrl: Mv,
  ɵɵvalidateIframeAttribute: sC,
  forwardRef: fu,
  resolveForwardRef: x,
  ɵɵtwoWayProperty: ap,
  ɵɵtwoWayBindingSet: h0,
  ɵɵtwoWayListener: up,
  ɵɵInputFlags: Dn
};
let Xr = null;
function oN(e) {
  if (Xr !== null) {
    if (e.defaultEncapsulation !== Xr.defaultEncapsulation) {
      ngDevMode && console.error("Provided value for `defaultEncapsulation` can not be changed once it has been set.");
      return;
    }
    if (e.preserveWhitespaces !== Xr.preserveWhitespaces) {
      ngDevMode && console.error("Provided value for `preserveWhitespaces` can not be changed once it has been set.");
      return;
    }
  }
  Xr = e;
}
i(oN, "setJitOptions");
function iN() {
  return Xr;
}
i(iN, "getJitOptions");
function sN() {
  Xr = null;
}
i(sN, "resetJitOptions");
const Ti = [];
function aN(e, t) {
  Ti.push({ moduleType: e, ngModule: t });
}
i(aN, "enqueueModuleForDelayedScoping");
let zc = !1;
function U0() {
  if (!zc) {
    zc = !0;
    try {
      for (let e = Ti.length - 1; e >= 0; e--) {
        const { moduleType: t, ngModule: n } = Ti[e];
        n.declarations && n.declarations.every(z0) && (Ti.splice(e, 1), lN(t, n));
      }
    } finally {
      zc = !1;
    }
  }
}
i(U0, "flushModuleScopingQueueAsMuchAsPossible");
function z0(e) {
  return Array.isArray(e) ? e.every(z0) : !!x(e);
}
i(z0, "isResolvedDeclaration");
function G0(e, t = {}) {
  W0(e, t), t.id !== void 0 && th(e, t.id), aN(e, t);
}
i(G0, "compileNgModule");
function W0(e, t, n = !1) {
  ngDevMode && b(e, "Required value moduleType"), ngDevMode && b(t, "Required value ngModule");
  const r = nt(t.declarations || Q);
  let o = null;
  Object.defineProperty(e, Sd, {
    configurable: !0,
    get: /* @__PURE__ */ i(() => {
      if (o === null) {
        if (ngDevMode && t.imports && t.imports.indexOf(e) > -1)
          throw new Error(`'${z(e)}' module can't import itself`);
        o = Oe({ usage: 0, kind: "NgModule", type: e }).compileNgModule(Qe, `ng:///${e.name}/ɵmod.js`, {
          type: e,
          bootstrap: nt(t.bootstrap || Q).map(x),
          declarations: r.map(x),
          imports: nt(t.imports || Q).map(x).map(sm),
          exports: nt(t.exports || Q).map(x).map(sm),
          schemas: t.schemas ? nt(t.schemas) : null,
          id: t.id || null
        }), o.schemas || (o.schemas = []);
      }
      return o;
    }, "get")
  });
  let s = null;
  Object.defineProperty(e, mn, {
    get: /* @__PURE__ */ i(() => {
      if (s === null) {
        const u = Oe({ usage: 0, kind: "NgModule", type: e });
        s = u.compileFactory(Qe, `ng:///${e.name}/ɵfac.js`, {
          name: e.name,
          type: e,
          deps: Su(e),
          target: u.FactoryTarget.NgModule,
          typeArgumentCount: 0
        });
      }
      return s;
    }, "get"),
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
  let a = null;
  Object.defineProperty(e, ba, {
    get: /* @__PURE__ */ i(() => {
      if (a === null) {
        ngDevMode && Xa(e, n);
        const u = {
          name: e.name,
          type: e,
          providers: t.providers || Q,
          imports: [
            (t.imports || Q).map(x),
            (t.exports || Q).map(x)
          ]
        };
        a = Oe({ usage: 0, kind: "NgModule", type: e }).compileInjector(Qe, `ng:///${e.name}/ɵinj.js`, u);
      }
      return a;
    }, "get"),
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
i(W0, "compileNgModuleDefs");
function q0(e, t) {
  const n = `Unexpected "${z(e)}" found in the "declarations" array of the`, r = `"${z(e)}" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`;
  return `${n} ${t}, ${r}`;
}
i(q0, "generateStandaloneInDeclarationsError");
function Xa(e, t, n) {
  if (ld.get(e) || Fn(e))
    return;
  ld.set(e, !0), e = x(e);
  let r;
  if (n) {
    if (r = gt(e), !r)
      throw new Error(`Unexpected value '${e.name}' imported by the module '${n.name}'. Please add an @NgModule annotation.`);
  } else
    r = gt(e, !0);
  const o = [], s = qt(r.declarations), a = qt(r.imports);
  nt(a).map(im).forEach((D) => {
    C(D, e), Xa(D, !1, e);
  });
  const u = qt(r.exports);
  s.forEach(d), s.forEach(f), s.forEach((D) => h(D, e));
  const c = [
    ...s.map(x),
    ...nt(a.map(Q0)).map(x)
  ];
  u.forEach(p), s.forEach((D) => g(D, t));
  const l = uN(e, "NgModule");
  if (l && (l.imports && nt(l.imports).map(im).forEach((D) => {
    C(D, e), Xa(D, !1, e);
  }), l.bootstrap && mo(l.bootstrap, v), l.bootstrap && mo(l.bootstrap, m)), o.length)
    throw new Error(o.join(`
`));
  function d(D) {
    D = x(D), U(D) || Ne(D) || ft(D) || o.push(`Unexpected value '${z(D)}' declared by the module '${z(e)}'. Please add a @Pipe/@Directive/@Component annotation.`);
  }
  i(d, "verifyDeclarationsHaveDefinitions");
  function f(D) {
    D = x(D);
    const _ = Ne(D);
    !U(D) && _ && _.selectors.length == 0 && o.push(`Directive ${z(D)} has no selector, please add it!`);
  }
  i(f, "verifyDirectivesHaveSelector");
  function h(D, _) {
    if (D = x(D), (U(D) || Ne(D) || ft(D))?.standalone) {
      const W = `"${z(_)}" NgModule`;
      o.push(q0(D, W));
    }
  }
  i(h, "verifyNotStandalone");
  function p(D) {
    D = x(D);
    const _ = U(D) && "component" || Ne(D) && "directive" || ft(D) && "pipe";
    _ && c.lastIndexOf(D) === -1 && o.push(`Can't export ${_} ${z(D)} from ${z(e)} as it was neither declared nor imported!`);
  }
  i(p, "verifyExportsAreDeclaredOrReExported");
  function g(D, _) {
    D = x(D);
    const R = va.get(D);
    if (R && R !== e) {
      if (!_) {
        const W = [R, e].map(z).sort();
        o.push(`Type ${z(D)} is part of the declarations of 2 modules: ${W[0]} and ${W[1]}! Please consider moving ${z(D)} to a higher module that imports ${W[0]} and ${W[1]}. You can also create a new NgModule that exports and includes ${z(D)} then import that NgModule in ${W[0]} and ${W[1]}.`);
      }
    } else
      va.set(D, e);
  }
  i(g, "verifyDeclarationIsUnique");
  function m(D) {
    D = x(D), !va.get(D) && !Fn(D) && o.push(`Component ${z(D)} is not part of any NgModule or the module has not been imported into your module.`);
  }
  i(m, "verifyComponentIsPartOfNgModule");
  function v(D) {
    D = x(D), U(D) || o.push(`${z(D)} cannot be used as an entry component.`), Fn(D) && o.push(`The \`${z(D)}\` class is a standalone component, which can not be used in the \`@NgModule.bootstrap\` array. Use the \`bootstrapApplication\` function for bootstrap instead.`);
  }
  i(v, "verifyCorrectBootstrapType");
  function C(D, _) {
    D = x(D);
    const R = U(D) || Ne(D);
    if (R !== null && !R.standalone)
      throw new Error(`Unexpected directive '${D.name}' imported by the module '${_.name}'. Please add an @NgModule annotation.`);
    const W = ft(D);
    if (W !== null && !W.standalone)
      throw new Error(`Unexpected pipe '${D.name}' imported by the module '${_.name}'. Please add an @NgModule annotation.`);
  }
  i(C, "verifySemanticsOfNgModuleImport");
}
i(Xa, "verifySemanticsOfNgModuleDef");
function im(e) {
  return e = x(e), e.ngModule || e;
}
i(im, "unwrapModuleWithProvidersImports");
function uN(e, t) {
  let n = null;
  return r(e.__annotations__), r(e.decorators), n;
  function r(s) {
    s && s.forEach(o);
  }
  i(r, "collect");
  function o(s) {
    n || (Object.getPrototypeOf(s).ngMetadataName == t ? n = s : s.type && Object.getPrototypeOf(s.type).ngMetadataName == t && (n = s.args[0]));
  }
  i(o, "readAnnotation");
}
i(uN, "getAnnotation");
let va = /* @__PURE__ */ new WeakMap(), ld = /* @__PURE__ */ new WeakMap();
function cN() {
  va = /* @__PURE__ */ new WeakMap(), ld = /* @__PURE__ */ new WeakMap(), Ti.length = 0, la.clear();
}
i(cN, "resetCompiledComponents");
function Q0(e) {
  e = x(e);
  const t = gt(e);
  return t === null ? [e] : nt(qt(t.exports).map((n) => gt(n) ? (Xa(n, !1), Q0(n)) : n));
}
i(Q0, "computeCombinedExports");
function lN(e, t) {
  const n = nt(t.declarations || Q), r = lp(e);
  n.forEach((o) => {
    if (o = x(o), o.hasOwnProperty(Lo)) {
      const a = U(o);
      cp(a, r);
    } else !o.hasOwnProperty(gu) && !o.hasOwnProperty(mu) && (o.ngSelectorScope = e);
  });
}
i(lN, "setScopeOnDeclaredComponents");
function cp(e, t) {
  e.directiveDefs = () => Array.from(t.compilation.directives).map((n) => n.hasOwnProperty(Lo) ? U(n) : Ne(n)).filter((n) => !!n), e.pipeDefs = () => Array.from(t.compilation.pipes).map((n) => ft(n)), e.schemas = t.schemas, e.tView = null;
}
i(cp, "patchComponentDefWithScope");
function lp(e) {
  if (sr(e)) {
    const t = Er.getNgModuleScope(e);
    return {
      schemas: gt(e, !0).schemas || null,
      ...t
    };
  } else if (Fn(e)) {
    if ((U(e) || Ne(e)) !== null)
      return {
        schemas: null,
        compilation: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set()
        },
        exported: {
          directives: /* @__PURE__ */ new Set([e]),
          pipes: /* @__PURE__ */ new Set()
        }
      };
    if (ft(e) !== null)
      return {
        schemas: null,
        compilation: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set()
        },
        exported: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set([e])
        }
      };
  }
  throw new Error(`${e.name} does not have a module def (ɵmod property)`);
}
i(lp, "transitiveScopesFor");
function sm(e) {
  return Uf(e) ? e.ngModule : e;
}
i(sm, "expandModuleWithProviders");
let Gc = 0;
function Z0(e, t) {
  (typeof ngDevMode > "u" || ngDevMode) && bd();
  let n = null;
  S1(e, t), K0(e, t), Object.defineProperty(e, Lo, {
    get: /* @__PURE__ */ i(() => {
      if (n === null) {
        const r = Oe({ usage: 0, kind: "component", type: e });
        if (nC(t)) {
          const l = [`Component '${e.name}' is not resolved:`];
          throw t.templateUrl && l.push(` - templateUrl: ${t.templateUrl}`), t.styleUrls && t.styleUrls.length && l.push(` - styleUrls: ${JSON.stringify(t.styleUrls)}`), t.styleUrl && l.push(` - styleUrl: ${t.styleUrl}`), l.push("Did you run and wait for 'resolveComponentResources()'?"), new Error(l.join(`
`));
        }
        const o = iN();
        let s = t.preserveWhitespaces;
        s === void 0 && (o !== null && o.preserveWhitespaces !== void 0 ? s = o.preserveWhitespaces : s = !1);
        let a = t.encapsulation;
        a === void 0 && (o !== null && o.defaultEncapsulation !== void 0 ? a = o.defaultEncapsulation : a = yn.Emulated);
        const u = t.templateUrl || `ng:///${e.name}/template.html`, c = {
          ...J0(e, t),
          typeSourceSpan: r.createParseSourceSpan("Component", e.name, u),
          template: t.template || "",
          preserveWhitespaces: s,
          styles: typeof t.styles == "string" ? [t.styles] : t.styles || Q,
          animations: t.animations,
          // JIT components are always compiled against an empty set of `declarations`. Instead, the
          // `directiveDefs` and `pipeDefs` are updated at a later point:
          //  * for NgModule-based components, they're set when the NgModule which declares the
          //    component resolves in the module scoping queue
          //  * for standalone components, they're set just below, after `compileComponent`.
          declarations: [],
          changeDetection: t.changeDetection,
          encapsulation: a,
          interpolation: t.interpolation,
          viewProviders: t.viewProviders || null
        };
        Gc++;
        try {
          if (c.usesInheritance && X0(e), n = r.compileComponent(Qe, u, c), t.standalone) {
            const l = nt(t.imports || Q), { directiveDefs: d, pipeDefs: f } = dN(e, l);
            n.directiveDefs = d, n.pipeDefs = f, n.dependencies = () => l.map(x);
          }
        } finally {
          Gc--;
        }
        if (Gc === 0 && U0(), fN(e)) {
          const l = lp(e.ngSelectorScope);
          cp(n, l);
        }
        if (t.schemas)
          if (t.standalone)
            n.schemas = t.schemas;
          else
            throw new Error(`The 'schemas' was specified for the ${z(e)} but is only valid on a component that is standalone.`);
        else t.standalone && (n.schemas = []);
      }
      return n;
    }, "get"),
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
i(Z0, "compileComponent");
function dN(e, t) {
  return {
    directiveDefs: /* @__PURE__ */ i(() => {
      {
        if (ngDevMode)
          for (const s of t)
            Yl(s, e);
        return Ei(e) ? [...Er.getStandaloneComponentScope(e, t).compilation.directives].map((s) => U(s) || Ne(s)).filter((s) => s !== null) : [];
      }
    }, "directiveDefs"),
    pipeDefs: /* @__PURE__ */ i(() => {
      {
        if (ngDevMode)
          for (const s of t)
            Yl(s, e);
        return Ei(e) ? [...Er.getStandaloneComponentScope(e, t).compilation.pipes].map((s) => ft(s)).filter((s) => s !== null) : [];
      }
    }, "pipeDefs")
  };
}
i(dN, "getStandaloneDefFunctions");
function fN(e) {
  return e.ngSelectorScope !== void 0;
}
i(fN, "hasSelectorScope");
function dp(e, t) {
  let n = null;
  K0(e, t || {}), Object.defineProperty(e, gu, {
    get: /* @__PURE__ */ i(() => {
      if (n === null) {
        const r = Y0(e, t || {});
        n = Oe({ usage: 0, kind: "directive", type: e }).compileDirective(Qe, r.sourceMapUrl, r.metadata);
      }
      return n;
    }, "get"),
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
i(dp, "compileDirective");
function Y0(e, t) {
  const n = e && e.name, r = `ng:///${n}/ɵdir.js`, o = Oe({ usage: 0, kind: "directive", type: e }), s = J0(e, t);
  return s.typeSourceSpan = o.createParseSourceSpan("Directive", n, r), s.usesInheritance && X0(e), { metadata: s, sourceMapUrl: r };
}
i(Y0, "getDirectiveMetadata");
function K0(e, t) {
  let n = null;
  Object.defineProperty(e, mn, {
    get: /* @__PURE__ */ i(() => {
      if (n === null) {
        const r = Y0(e, t), o = Oe({ usage: 0, kind: "directive", type: e });
        n = o.compileFactory(Qe, `ng:///${e.name}/ɵfac.js`, {
          name: r.metadata.name,
          type: r.metadata.type,
          typeArgumentCount: 0,
          deps: Su(e),
          target: o.FactoryTarget.Directive
        });
      }
      return n;
    }, "get"),
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
i(K0, "addDirectiveFactoryDef");
function hN(e) {
  return Object.getPrototypeOf(e.prototype) === Object.prototype;
}
i(hN, "extendsDirectlyFromObject");
function J0(e, t) {
  const n = rf(), r = n.ownPropMetadata(e);
  return {
    name: e.name,
    type: e,
    selector: t.selector !== void 0 ? t.selector : null,
    host: t.host || Pt,
    propMetadata: r,
    inputs: t.inputs || Q,
    outputs: t.outputs || Q,
    queries: am(e, r, eb),
    lifecycle: { usesOnChanges: n.hasLifecycleHook(e, "ngOnChanges") },
    typeSourceSpan: null,
    usesInheritance: !hN(e),
    exportAs: mN(t.exportAs),
    providers: t.providers || null,
    viewQueries: am(e, r, tb),
    isStandalone: !!t.standalone,
    isSignal: !!t.signals,
    hostDirectives: t.hostDirectives?.map((o) => typeof o == "function" ? { directive: o } : o) || null
  };
}
i(J0, "directiveMetadata");
function X0(e) {
  const t = Object.prototype;
  let n = Object.getPrototypeOf(e.prototype).constructor;
  for (; n && n !== t; )
    !Ne(n) && !U(n) && DN(n) && dp(n, null), n = Object.getPrototypeOf(n);
}
i(X0, "addDirectiveDefToUndecoratedParents");
function pN(e) {
  return typeof e == "string" ? rb(e) : x(e);
}
i(pN, "convertToR3QueryPredicate");
function gN(e, t) {
  return {
    propertyName: e,
    predicate: pN(t.selector),
    descendants: t.descendants,
    first: t.first,
    read: t.read ? t.read : null,
    static: !!t.static,
    emitDistinctChangesOnly: !!t.emitDistinctChangesOnly,
    isSignal: !!t.isSignal
  };
}
i(gN, "convertToR3QueryMetadata");
function am(e, t, n) {
  const r = [];
  for (const o in t)
    if (t.hasOwnProperty(o)) {
      const s = t[o];
      s.forEach((a) => {
        if (n(a)) {
          if (!a.selector)
            throw new Error(`Can't construct a query for the property "${o}" of "${z(e)}" since the query selector wasn't defined.`);
          if (s.some(nb))
            throw new Error("Cannot combine @Input decorators with query decorators");
          r.push(gN(o, a));
        }
      });
    }
  return r;
}
i(am, "extractQueriesMetadata");
function mN(e) {
  return e === void 0 ? null : rb(e);
}
i(mN, "extractExportAs");
function eb(e) {
  const t = e.ngMetadataName;
  return t === "ContentChild" || t === "ContentChildren";
}
i(eb, "isContentQuery");
function tb(e) {
  const t = e.ngMetadataName;
  return t === "ViewChild" || t === "ViewChildren";
}
i(tb, "isViewQuery");
function nb(e) {
  return e.ngMetadataName === "Input";
}
i(nb, "isInputAnnotation");
function rb(e) {
  return e.split(",").map((t) => t.trim());
}
i(rb, "splitByComma");
const yN = [
  "ngOnChanges",
  "ngOnInit",
  "ngOnDestroy",
  "ngDoCheck",
  "ngAfterViewInit",
  "ngAfterViewChecked",
  "ngAfterContentInit",
  "ngAfterContentChecked"
];
function DN(e) {
  const t = rf();
  if (yN.some((r) => t.hasLifecycleHook(e, r)))
    return !0;
  const n = t.propMetadata(e);
  for (const r in n) {
    const o = n[r];
    for (let s = 0; s < o.length; s++) {
      const a = o[s], u = a.ngMetadataName;
      if (nb(a) || eb(a) || tb(a) || u === "Output" || u === "HostBinding" || u === "HostListener")
        return !0;
    }
  }
  return !1;
}
i(DN, "shouldAddAbstractDirective");
function ob(e, t) {
  let n = null, r = null;
  Object.defineProperty(e, mn, {
    get: /* @__PURE__ */ i(() => {
      if (r === null) {
        const o = um(e, t), s = Oe({ usage: 0, kind: "pipe", type: o.type });
        r = s.compileFactory(Qe, `ng:///${o.name}/ɵfac.js`, {
          name: o.name,
          type: o.type,
          typeArgumentCount: 0,
          deps: Su(e),
          target: s.FactoryTarget.Pipe
        });
      }
      return r;
    }, "get"),
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  }), Object.defineProperty(e, mu, {
    get: /* @__PURE__ */ i(() => {
      if (n === null) {
        const o = um(e, t);
        n = Oe({ usage: 0, kind: "pipe", type: o.type }).compilePipe(Qe, `ng:///${o.name}/ɵpipe.js`, o);
      }
      return n;
    }, "get"),
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
i(ob, "compilePipe");
function um(e, t) {
  return {
    type: e,
    name: e.name,
    pipeName: t.name,
    pure: t.pure !== void 0 ? t.pure : !0,
    isStandalone: !!t.standalone
  };
}
i(um, "getPipeMetadata");
const ut = as("Directive", (e = {}) => e, void 0, void 0, (e, t) => dp(e, t)), ib = as("Component", (e = {}) => ({ changeDetection: fr.Default, ...e }), ut, void 0, (e, t) => Z0(e, t)), ct = as("Pipe", (e) => ({ pure: !0, ...e }), void 0, void 0, (e, t) => ob(e, t)), q = er("Input", (e) => e ? typeof e == "string" ? { alias: e } : e : {}), vN = er("Output", (e) => ({ alias: e })), IN = er("HostBinding", (e) => ({ hostPropertyName: e })), CN = er("HostListener", (e, t) => ({ eventName: e, args: t })), fp = as(
  "NgModule",
  (e) => e,
  void 0,
  void 0,
  /**
   * Decorator that marks the following class as an NgModule, and supplies
   * configuration metadata for it.
   *
   * * The `declarations` option configures the compiler
   * with information about what belongs to the NgModule.
   * * The `providers` options configures the NgModule's injector to provide
   * dependencies the NgModule members.
   * * The `imports` and `exports` options bring in members from other modules, and make
   * this module's members available to others.
   */
  (e, t) => G0(e, t)
);
class hp {
  static {
    i(this, "Version");
  }
  constructor(t) {
    this.full = t;
    const n = t.split(".");
    this.major = n[0], this.minor = n[1], this.patch = n.slice(2).join(".");
  }
}
const EN = new hp("17.3.12");
class Yt {
  static {
    i(this, "Console");
  }
  log(t) {
    console.log(t);
  }
  // Note: for reporting errors use `DOM.logError()` as it is platform specific
  warn(t) {
    console.warn(t);
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || Yt)();
    }, "Console_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: Yt, factory: Yt.ɵfac, providedIn: "platform" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(Yt, [{
  type: he,
  args: [{ providedIn: "platform" }]
}], null, null);
class bN {
  static {
    i(this, "DIDebugData");
  }
  constructor() {
    this.resolverToTokenToDependencies = /* @__PURE__ */ new WeakMap(), this.resolverToProviders = /* @__PURE__ */ new WeakMap(), this.standaloneInjectorToComponent = /* @__PURE__ */ new WeakMap();
  }
  reset() {
    this.resolverToTokenToDependencies = /* @__PURE__ */ new WeakMap(), this.resolverToProviders = /* @__PURE__ */ new WeakMap(), this.standaloneInjectorToComponent = /* @__PURE__ */ new WeakMap();
  }
}
let Bs = new bN();
function gc() {
  return Bs;
}
i(gc, "getFrameworkDIDebugData");
function wN() {
  Bs.reset(), eM((e) => MN(e));
}
i(wN, "setupFrameworkInjectorProfiler");
function MN(e) {
  const { context: t, type: n } = e;
  n === 0 ? _N(t, e.service) : n === 1 ? TN(t, e.instance) : n === 2 && ON(t, e.providerRecord);
}
i(MN, "handleInjectorProfilerEvent");
function _N(e, t) {
  const n = sb(e.injector);
  n === null && T("An Inject event must be run within an injection context.");
  const r = Bs.resolverToTokenToDependencies;
  if (r.has(n) || r.set(n, /* @__PURE__ */ new WeakMap()), !FN(e.token))
    return;
  const o = r.get(n);
  o.has(e.token) || o.set(e.token, []);
  const { token: s, value: a, flags: u } = t;
  b(e.token, "Injector profiler context token is undefined.");
  const c = o.get(e.token);
  b(c, "Could not resolve dependencies for token."), e.injector instanceof De ? c.push({ token: s, value: a, flags: u, injectedIn: SN(e.injector) }) : c.push({ token: s, value: a, flags: u });
}
i(_N, "handleInjectEvent");
function SN(e) {
  e instanceof De || T("getNodeInjectorContext must be called with a NodeInjector");
  const t = Vo(e), n = Uo(e);
  if (n !== null)
    return Ke(n, t), { lView: t, tNode: n };
}
i(SN, "getNodeInjectorContext");
function TN(e, t) {
  const { value: n } = t;
  sb(e.injector) === null && T("An InjectorCreatedInstance event must be run within an injection context.");
  let r;
  if (typeof n == "object" && (r = n?.constructor), r === void 0 || !AN(r))
    return;
  const o = e.injector.get(Lt, null, { optional: !0 });
  if (o === null)
    return;
  const { standaloneInjectorToComponent: s } = Bs;
  s.has(o) || s.set(o, r);
}
i(TN, "handleInstanceCreatedByInjectorEvent");
function AN(e) {
  return !!U(e)?.standalone;
}
i(AN, "isStandaloneComponent");
function ON(e, t) {
  const { resolverToProviders: n } = Bs;
  let r;
  e?.injector instanceof De ? r = Uo(e.injector) : r = e.injector, r === null && T("A ProviderConfigured event must be run within an injection context."), n.has(r) || n.set(r, []), n.get(r).push(t);
}
i(ON, "handleProviderConfiguredEvent");
function sb(e) {
  let t = null;
  return e === void 0 || (e instanceof De ? t = Vo(e) : t = e), t;
}
i(sb, "getDIResolver");
function FN(e) {
  return e !== null && (typeof e == "object" || typeof e == "function" || typeof e == "symbol");
}
i(FN, "canBeHeldWeakly");
function NN(e) {
  ngDevMode && b(e, "component"), As(BD(e)), YD(e).forEach((t) => kN(t));
}
i(NN, "applyChanges");
function kN(e) {
  const t = BD(e);
  t[S] |= 1024, zu(t);
}
i(kN, "detectChanges");
function RN(e, t) {
  const n = e.get(t, null, { self: !0, optional: !0 });
  if (n === null)
    throw new Error(`Unable to determine instance of ${t} in given injector`);
  const r = xN(t, e), o = ab(e), s = r.map((a) => {
    const u = {
      value: a.value
    }, c = a.flags;
    u.flags = {
      optional: (8 & c) === 8,
      host: (1 & c) === 1,
      self: (2 & c) === 2,
      skipSelf: (4 & c) === 4
    };
    for (let l = 0; l < o.length; l++) {
      const d = o[l];
      if (l === 0 && u.flags.skipSelf)
        continue;
      if (u.flags.host && d instanceof Lt)
        break;
      if (d.get(a.token, null, { self: !0, optional: !0 }) !== null) {
        if (u.flags.host) {
          o[0].get(a.token, null, { ...u.flags, optional: !0 }) !== null && (u.providedIn = d);
          break;
        }
        u.providedIn = d;
        break;
      }
      if (l === 0 && u.flags.self)
        break;
    }
    return a.token && (u.token = a.token), u;
  });
  return { instance: n, dependencies: s };
}
i(RN, "getDependenciesFromInjectable");
function xN(e, t) {
  const { resolverToTokenToDependencies: n } = gc();
  if (!(t instanceof De))
    return n.get(t)?.get?.(e) ?? [];
  const r = Vo(t);
  return (n.get(r)?.get(e) ?? []).filter((a) => {
    const u = a.injectedIn?.tNode;
    if (u === void 0)
      return !1;
    const c = Uo(t);
    return Do(u), Do(c), u === c;
  });
}
i(xN, "getDependenciesForTokenInInjector");
function PN(e) {
  const { standaloneInjectorToComponent: t } = gc();
  if (t.has(e))
    return t.get(e);
  const n = e.get(Xn, null, { self: !0, optional: !0 });
  return n === null || n.instance === null ? null : n.instance.constructor;
}
i(PN, "getProviderImportsContainer");
function LN(e) {
  const t = Uo(e), { resolverToProviders: n } = gc();
  return n.get(t) ?? [];
}
i(LN, "getNodeInjectorProviders");
function jN(e) {
  const t = /* @__PURE__ */ new Map(), r = $N(t, /* @__PURE__ */ new Set());
  return Aa(e, r, [], /* @__PURE__ */ new Set()), t;
}
i(jN, "getProviderImportPaths");
function $N(e, t) {
  return (n, r) => {
    if (e.has(n) || e.set(n, [r]), !t.has(r))
      for (const o of e.keys()) {
        const s = e.get(o);
        let a = Ea(r);
        if (!a) {
          const l = r.ngModule;
          a = Ea(l);
        }
        if (!a)
          return;
        const u = s[0];
        let c = !1;
        mo(a.imports, (l) => {
          c || (c = l.ngModule === u || l === u, c && e.get(o)?.unshift(r));
        });
      }
    t.add(r);
  };
}
i($N, "walkProviderTreeToDiscoverImportPaths");
function BN(e) {
  const t = gc().resolverToProviders.get(e) ?? [];
  if (HN(e))
    return t;
  const n = PN(e);
  if (n === null)
    return t;
  const r = jN(n), o = [];
  for (const s of t) {
    const a = s.provider, u = a.provide;
    if (u === dr || u === Nd)
      continue;
    let c = r.get(a) ?? [];
    !!U(n)?.standalone && (c = [n, ...c]), o.push({ ...s, importPath: c });
  }
  return o;
}
i(BN, "getEnvironmentInjectorProviders");
function HN(e) {
  return e instanceof jo && e.scopes.has("platform");
}
i(HN, "isPlatformInjector");
function VN(e) {
  if (e instanceof De)
    return LN(e);
  if (e instanceof Lt)
    return BN(e);
  T("getInjectorProviders only supports NodeInjector and EnvironmentInjector");
}
i(VN, "getInjectorProviders");
function UN(e) {
  if (e instanceof De) {
    const t = Vo(e), n = Uo(e);
    return Ke(n, t), { type: "element", source: He(n, t) };
  }
  return e instanceof jo ? { type: "environment", source: e.source ?? null } : e instanceof Du ? { type: "null", source: null } : null;
}
i(UN, "getInjectorMetadata");
function ab(e) {
  const t = [e];
  return dd(e, t), t;
}
i(ab, "getInjectorResolutionPath");
function dd(e, t) {
  const n = zN(e);
  if (n === null) {
    if (e instanceof De) {
      const r = t[0];
      if (r instanceof De) {
        const o = GN(r);
        o === null && T("NodeInjector must have some connection to the module injector tree"), t.push(o), dd(o, t);
      }
      return t;
    }
  } else
    t.push(n), dd(n, t);
  return t;
}
i(dd, "getInjectorResolutionPathHelper");
function zN(e) {
  if (e instanceof jo)
    return e.parent;
  let t, n;
  if (e instanceof De)
    t = Uo(e), n = Vo(e);
  else {
    if (e instanceof Du)
      return null;
    if (e instanceof Ju)
      return e.parentInjector;
    T("getInjectorParent only support injectors of type R3Injector, NodeInjector, NullInjector, ChainedInjector");
  }
  const r = Mu(t, n);
  if (tf(r)) {
    const o = Hi(r), s = Vi(r, n), u = s[E].data[
      o + 8
      /* NodeInjectorOffset.TNODE */
    ];
    return new De(u, s);
  } else {
    const s = n[Se].injector?.parent;
    if (s instanceof De)
      return s;
  }
  return null;
}
i(zN, "getInjectorParent");
function GN(e) {
  let t;
  e instanceof De ? t = Vo(e) : T("getModuleInjectorOfNodeInjector must be called with a NodeInjector");
  const n = t[Se], r = n instanceof Ju ? n.parentInjector : n.parent;
  return r || T("NodeInjector must have some connection to the module injector tree"), r;
}
i(GN, "getModuleInjectorOfNodeInjector");
const cm = "ng", WN = {
  /**
   * Warning: functions that start with `ɵ` are considered *INTERNAL* and should not be relied upon
   * in application's code. The contract of those functions might be changed in any release and/or a
   * function can be removed completely.
   */
  ɵgetDependenciesFromInjectable: RN,
  ɵgetInjectorProviders: VN,
  ɵgetInjectorResolutionPath: ab,
  ɵgetInjectorMetadata: UN,
  ɵsetProfiler: YM,
  getDirectiveMetadata: oS,
  getComponent: La,
  getContext: QD,
  getListeners: ev,
  getOwningComponent: ZD,
  getHostElement: XD,
  getInjector: KD,
  getRootComponents: YD,
  getDirectives: JD,
  applyChanges: NN,
  isSignal: Kf
};
let lm = !1;
function qN() {
  if (!lm) {
    lm = !0, typeof window < "u" && wN();
    for (const [e, t] of Object.entries(WN))
      QN(e, t);
  }
}
i(qN, "publishDefaultGlobalUtils$1");
function QN(e, t) {
  if (typeof COMPILED > "u" || !COMPILED) {
    const n = pe;
    ngDevMode && b(t, "function not defined"), n[cm] ??= {}, n[cm][e] = t;
  }
}
i(QN, "publishGlobalUtil");
const ub = new $(""), pp = new $("");
class so {
  static {
    i(this, "Testability");
  }
  constructor(t, n, r) {
    this._ngZone = t, this.registry = n, this._pendingCount = 0, this._isZoneStable = !0, this._callbacks = [], this.taskTrackingZone = null, gp || (cb(r), r.addToWindow(n)), this._watchAngularEvents(), t.run(() => {
      this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
    });
  }
  _watchAngularEvents() {
    this._ngZone.onUnstable.subscribe({
      next: /* @__PURE__ */ i(() => {
        this._isZoneStable = !1;
      }, "next")
    }), this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.subscribe({
        next: /* @__PURE__ */ i(() => {
          de.assertNotInAngularZone(), queueMicrotask(() => {
            this._isZoneStable = !0, this._runCallbacksIfReady();
          });
        }, "next")
      });
    });
  }
  /**
   * Increases the number of pending request
   * @deprecated pending requests are now tracked with zones.
   */
  increasePendingRequestCount() {
    return this._pendingCount += 1, this._pendingCount;
  }
  /**
   * Decreases the number of pending request
   * @deprecated pending requests are now tracked with zones
   */
  decreasePendingRequestCount() {
    if (this._pendingCount -= 1, this._pendingCount < 0)
      throw new Error("pending async requests below zero");
    return this._runCallbacksIfReady(), this._pendingCount;
  }
  /**
   * Whether an associated application is stable
   */
  isStable() {
    return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks;
  }
  _runCallbacksIfReady() {
    if (this.isStable())
      queueMicrotask(() => {
        for (; this._callbacks.length !== 0; ) {
          let t = this._callbacks.pop();
          clearTimeout(t.timeoutId), t.doneCb();
        }
      });
    else {
      let t = this.getPendingTasks();
      this._callbacks = this._callbacks.filter((n) => n.updateCb && n.updateCb(t) ? (clearTimeout(n.timeoutId), !1) : !0);
    }
  }
  getPendingTasks() {
    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map((t) => ({
      source: t.source,
      // From TaskTrackingZone:
      // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
      creationLocation: t.creationLocation,
      data: t.data
    })) : [];
  }
  addCallback(t, n, r) {
    let o = -1;
    n && n > 0 && (o = setTimeout(() => {
      this._callbacks = this._callbacks.filter((s) => s.timeoutId !== o), t();
    }, n)), this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: r });
  }
  /**
   * Wait for the application to be stable with a timeout. If the timeout is reached before that
   * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
   *
   * @param doneCb The callback to invoke when Angular is stable or the timeout expires
   *    whichever comes first.
   * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
   *    specified, whenStable() will wait forever.
   * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
   *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
   *    and no further updates will be issued.
   */
  whenStable(t, n, r) {
    if (r && !this.taskTrackingZone)
      throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
    this.addCallback(t, n, r), this._runCallbacksIfReady();
  }
  /**
   * Get the number of pending requests
   * @deprecated pending requests are now tracked with zones
   */
  getPendingRequestCount() {
    return this._pendingCount;
  }
  /**
   * Registers an application with a testability hook so that it can be tracked.
   * @param token token of application, root element
   *
   * @internal
   */
  registerApplication(t) {
    this.registry.registerApplication(t, this);
  }
  /**
   * Unregisters an application.
   * @param token token of application, root element
   *
   * @internal
   */
  unregisterApplication(t) {
    this.registry.unregisterApplication(t);
  }
  /**
   * Find providers by name
   * @param using The root element to search from
   * @param provider The name of binding variable
   * @param exactMatch Whether using exactMatch
   */
  findProviders(t, n, r) {
    return [];
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || so)(ke(de), ke(kn), ke(pp));
    }, "Testability_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: so, factory: so.ɵfac });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(so, [{
  type: he
}], () => [{ type: de }, { type: kn }, { type: void 0, decorators: [{
  type: ht,
  args: [pp]
}] }], null);
class kn {
  static {
    i(this, "TestabilityRegistry");
  }
  constructor() {
    this._applications = /* @__PURE__ */ new Map();
  }
  /**
   * Registers an application with a testability hook so that it can be tracked
   * @param token token of application, root element
   * @param testability Testability hook
   */
  registerApplication(t, n) {
    this._applications.set(t, n);
  }
  /**
   * Unregisters an application.
   * @param token token of application, root element
   */
  unregisterApplication(t) {
    this._applications.delete(t);
  }
  /**
   * Unregisters all applications
   */
  unregisterAllApplications() {
    this._applications.clear();
  }
  /**
   * Get a testability hook associated with the application
   * @param elem root element
   */
  getTestability(t) {
    return this._applications.get(t) || null;
  }
  /**
   * Get all registered testabilities
   */
  getAllTestabilities() {
    return Array.from(this._applications.values());
  }
  /**
   * Get all registered applications(root elements)
   */
  getAllRootElements() {
    return Array.from(this._applications.keys());
  }
  /**
   * Find testability of a node in the Tree
   * @param elem node
   * @param findInAncestors whether finding testability in ancestors if testability was not found in
   * current node
   */
  findTestabilityInTree(t, n = !0) {
    return gp?.findTestabilityInTree(this, t, n) ?? null;
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || kn)();
    }, "TestabilityRegistry_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: kn, factory: kn.ɵfac, providedIn: "platform" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(kn, [{
  type: he,
  args: [{ providedIn: "platform" }]
}], null, null);
function cb(e) {
  gp = e;
}
i(cb, "setTestabilityGetter");
let gp;
function mc(e) {
  return !!e && typeof e.then == "function";
}
i(mc, "isPromise");
function mp(e) {
  return !!e && typeof e.subscribe == "function";
}
i(mp, "isSubscribable");
const lb = new $(ngDevMode ? "Application Initializer" : "");
class gn {
  static {
    i(this, "ApplicationInitStatus");
  }
  constructor() {
    if (this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, n) => {
      this.resolve = t, this.reject = n;
    }), this.appInits = M(lb, { optional: !0 }) ?? [], (typeof ngDevMode > "u" || ngDevMode) && !Array.isArray(this.appInits))
      throw new I(-209, `Unexpected type of the \`APP_INITIALIZER\` token value (expected an array, but got ${typeof this.appInits}). Please check that the \`APP_INITIALIZER\` token is configured as a \`multi: true\` provider.`);
  }
  /** @internal */
  runInitializers() {
    if (this.initialized)
      return;
    const t = [];
    for (const r of this.appInits) {
      const o = r();
      if (mc(o))
        t.push(o);
      else if (mp(o)) {
        const s = new Promise((a, u) => {
          o.subscribe({ complete: a, error: u });
        });
        t.push(s);
      }
    }
    const n = /* @__PURE__ */ i(() => {
      this.done = !0, this.resolve();
    }, "complete");
    Promise.all(t).then(() => {
      n();
    }).catch((r) => {
      this.reject(r);
    }), t.length === 0 && n(), this.initialized = !0;
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || gn)();
    }, "ApplicationInitStatus_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: gn, factory: gn.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(gn, [{
  type: he,
  args: [{ providedIn: "root" }]
}], () => [], null);
const yp = new $(ngDevMode ? "appBootstrapListener" : "");
function db() {
  ngDevMode && qN();
}
i(db, "publishDefaultGlobalUtils");
function fb() {
  pw(() => {
    throw new I(600, ngDevMode && "Writing to signals is not allowed in a `computed` or an `effect` by default. Use `allowSignalWrites` in the `CreateEffectOptions` to enable this inside effects.");
  });
}
i(fb, "publishSignalConfiguration");
function hb(e) {
  return e.isBoundToModule;
}
i(hb, "isBoundToModule");
class ZN {
  static {
    i(this, "NgProbeToken");
  }
  constructor(t, n) {
    this.name = t, this.token = n;
  }
}
function pb(e, t, n) {
  try {
    const r = n();
    return mc(r) ? r.catch((o) => {
      throw t.runOutsideAngular(() => e.handleError(o)), o;
    }) : r;
  } catch (r) {
    throw t.runOutsideAngular(() => e.handleError(r)), r;
  }
}
i(pb, "_callAndReportToErrorHandler");
function gb(e, t) {
  return Array.isArray(t) ? t.reduce(gb, e) : { ...e, ...t };
}
i(gb, "optionsReducer");
class ot {
  static {
    i(this, "ApplicationRef");
  }
  constructor() {
    this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = M(kD), this.afterRenderEffectManager = M(vn), this.externalTestViews = /* @__PURE__ */ new Set(), this.beforeRender = new Ni(), this.afterTick = new Ni(), this.componentTypes = [], this.components = [], this.isStable = M(xt).hasPendingTasks.pipe(xw((t) => !t)), this._injector = M(Lt);
  }
  /**
   * Indicates whether this instance was destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  /**
   * The `EnvironmentInjector` used to create this application.
   */
  get injector() {
    return this._injector;
  }
  /**
   * Bootstrap a component onto the element identified by its selector or, optionally, to a
   * specified element.
   *
   * @usageNotes
   * ### Bootstrap process
   *
   * When bootstrapping a component, Angular mounts it onto a target DOM element
   * and kicks off automatic change detection. The target DOM element can be
   * provided using the `rootSelectorOrNode` argument.
   *
   * If the target DOM element is not provided, Angular tries to find one on a page
   * using the `selector` of the component that is being bootstrapped
   * (first matched element is used).
   *
   * ### Example
   *
   * Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
   * but it requires us to know the component while writing the application code.
   *
   * Imagine a situation where we have to wait for an API call to decide about the component to
   * bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
   * dynamically bootstrap a component.
   *
   * {@example core/ts/platform/platform.ts region='componentSelector'}
   *
   * Optionally, a component can be mounted onto a DOM element that does not match the
   * selector of the bootstrapped component.
   *
   * In the following example, we are providing a CSS selector to match the target element.
   *
   * {@example core/ts/platform/platform.ts region='cssSelector'}
   *
   * While in this example, we are providing reference to a DOM node.
   *
   * {@example core/ts/platform/platform.ts region='domNode'}
   */
  bootstrap(t, n) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const r = t instanceof Ba;
    if (!this._injector.get(gn).done) {
      const f = !r && Fn(t), h = (typeof ngDevMode > "u" || ngDevMode) && "Cannot bootstrap as there are still asynchronous initializers running." + (f ? "" : " Bootstrap components in the `ngDoBootstrap` method of the root module.");
      throw new I(405, h);
    }
    let s;
    r ? s = t : s = this._injector.get(Ns).resolveComponentFactory(t), this.componentTypes.push(s.componentType);
    const a = hb(s) ? void 0 : this._injector.get(Xn), u = n || s.selector, c = s.create(xe.NULL, [], u, a), l = c.location.nativeElement, d = c.injector.get(ub, null);
    return d?.registerApplication(l), c.onDestroy(() => {
      this.detachView(c.hostView), Ia(this.components, c), d?.unregisterApplication(l);
    }), this._loadComponent(c), (typeof ngDevMode > "u" || ngDevMode) && this._injector.get(Yt).log("Angular is running in development mode."), c;
  }
  /**
   * Invoke this method to explicitly process change detection and its side-effects.
   *
   * In development mode, `tick()` also performs a second change detection cycle to ensure that no
   * further changes are detected. If additional changes are picked up during this second cycle,
   * bindings in the app have side-effects that cannot be resolved in a single change detection
   * pass.
   * In this case, Angular throws an error, since an Angular application can only have one change
   * detection pass during which all change detection must complete.
   */
  tick() {
    this._tick(!0);
  }
  /** @internal */
  _tick(t) {
    if ((typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed(), this._runningTick)
      throw new I(101, ngDevMode && "ApplicationRef.tick is called recursively");
    const n = B(null);
    try {
      if (this._runningTick = !0, this.detectChangesInAttachedViews(t), typeof ngDevMode > "u" || ngDevMode)
        for (let r of this._views)
          r.checkNoChanges();
    } catch (r) {
      this.internalErrorHandler(r);
    } finally {
      this.afterTick.next(), this._runningTick = !1, B(n);
    }
  }
  detectChangesInAttachedViews(t) {
    let n = 0;
    const r = this.afterRenderEffectManager;
    for (; ; ) {
      if (n === hI)
        throw new I(103, ngDevMode && "Infinite change detection while refreshing application views. Ensure afterRender or queueStateUpdate hooks are not continuously causing updates.");
      if (t) {
        const o = n === 0;
        this.beforeRender.next(o);
        for (let { _lView: s, notifyErrorHandler: a } of this._views)
          yb(s, o, a);
      }
      if (n++, r.executeInternalCallbacks(), ![...this.externalTestViews.keys(), ...this._views].some(({ _lView: o }) => fd(o)) && (r.execute(), ![...this.externalTestViews.keys(), ...this._views].some(({ _lView: o }) => fd(o))))
        break;
    }
  }
  /**
   * Attaches a view so that it will be dirty checked.
   * The view will be automatically detached when it is destroyed.
   * This will throw if the view is already attached to a ViewContainer.
   */
  attachView(t) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const n = t;
    this._views.push(n), n.attachToAppRef(this);
  }
  /**
   * Detaches a view from dirty checking again.
   */
  detachView(t) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const n = t;
    Ia(this._views, n), n.detachFromAppRef();
  }
  _loadComponent(t) {
    this.attachView(t.hostView), this.tick(), this.components.push(t);
    const n = this._injector.get(yp, []);
    if (ngDevMode && !Array.isArray(n))
      throw new I(-209, `Unexpected type of the \`APP_BOOTSTRAP_LISTENER\` token value (expected an array, but got ${typeof n}). Please check that the \`APP_BOOTSTRAP_LISTENER\` token is configured as a \`multi: true\` provider.`);
    [...this._bootstrapListeners, ...n].forEach((r) => r(t));
  }
  /** @internal */
  ngOnDestroy() {
    if (!this._destroyed)
      try {
        this._destroyListeners.forEach((t) => t()), this._views.slice().forEach((t) => t.destroy());
      } finally {
        this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = [];
      }
  }
  /**
   * Registers a listener to be called when an instance is destroyed.
   *
   * @param callback A callback function to add as a listener.
   * @returns A function which unregisters a listener.
   */
  onDestroy(t) {
    return (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed(), this._destroyListeners.push(t), () => Ia(this._destroyListeners, t);
  }
  /**
   * Destroys an Angular application represented by this `ApplicationRef`. Calling this function
   * will destroy the associated environment injectors as well as all the bootstrapped components
   * with their views.
   */
  destroy() {
    if (this._destroyed)
      throw new I(406, ngDevMode && "This instance of the `ApplicationRef` has already been destroyed.");
    const t = this._injector;
    t.destroy && !t.destroyed && t.destroy();
  }
  /**
   * Returns the number of attached views.
   */
  get viewCount() {
    return this._views.length;
  }
  warnIfDestroyed() {
    (typeof ngDevMode > "u" || ngDevMode) && this._destroyed && console.warn(ye(406, "This instance of the `ApplicationRef` has already been destroyed."));
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || ot)();
    }, "ApplicationRef_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: ot, factory: ot.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(ot, [{
  type: he,
  args: [{ providedIn: "root" }]
}], null, null);
function Ia(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
i(Ia, "remove");
let Js;
function mb(e) {
  Js ??= /* @__PURE__ */ new WeakMap();
  const t = Js.get(e);
  if (t)
    return t;
  const n = e.isStable.pipe(Hw((r) => r)).toPromise().then(() => {
  });
  return Js.set(e, n), e.onDestroy(() => Js?.delete(e)), n;
}
i(mb, "whenStable");
function yb(e, t, n) {
  !t && !fd(e) || YN(e, n, t);
}
i(yb, "detectChangesInViewIfRequired");
function fd(e) {
  return qd(e);
}
i(fd, "shouldRecheckView");
function YN(e, t, n) {
  let r;
  n ? (r = 0, e[S] |= 1024) : e[S] & 64 ? r = 0 : r = 1, zu(e, t, r);
}
i(YN, "detectChangesInView");
class Db {
  static {
    i(this, "ModuleWithComponentFactories");
  }
  constructor(t, n) {
    this.ngModuleFactory = t, this.componentFactories = n;
  }
}
class ao {
  static {
    i(this, "Compiler");
  }
  /**
   * Compiles the given NgModule and all of its components. All templates of the components
   * have to be inlined.
   */
  compileModuleSync(t) {
    return new ec(t);
  }
  /**
   * Compiles the given NgModule and all of its components
   */
  compileModuleAsync(t) {
    return Promise.resolve(this.compileModuleSync(t));
  }
  /**
   * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
   */
  compileModuleAndAllComponentsSync(t) {
    const n = this.compileModuleSync(t), r = gt(t), o = qt(r.declarations).reduce((s, a) => {
      const u = U(a);
      return u && s.push(new Yo(u)), s;
    }, []);
    return new Db(n, o);
  }
  /**
   * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
   */
  compileModuleAndAllComponentsAsync(t) {
    return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
  }
  /**
   * Clears all caches.
   */
  clearCache() {
  }
  /**
   * Clears the cache for the given component/ngModule.
   */
  clearCacheFor(t) {
  }
  /**
   * Returns the id for a given NgModule, if one is defined and known to the compiler.
   */
  getModuleId(t) {
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || ao)();
    }, "Compiler_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: ao, factory: ao.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(ao, [{
  type: he,
  args: [{ providedIn: "root" }]
}], null, null);
const vb = new $(ngDevMode ? "compilerOptions" : "");
class KN {
  static {
    i(this, "CompilerFactory");
  }
}
function Ib(e, t, n) {
  ngDevMode && zM(n);
  const r = new ec(n);
  if (typeof ngJitMode < "u" && !ngJitMode)
    return Promise.resolve(r);
  const o = e.get(vb, []).concat(t);
  if (oN({
    defaultEncapsulation: dm(o.map((l) => l.defaultEncapsulation)),
    preserveWhitespaces: dm(o.map((l) => l.preserveWhitespaces))
  }), O1())
    return Promise.resolve(r);
  const s = o.flatMap((l) => l.providers ?? []);
  if (s.length === 0)
    return Promise.resolve(r);
  const a = Oe({
    usage: 0,
    kind: "NgModule",
    type: n
  }), c = xe.create({ providers: s }).get(a.ResourceLoader);
  return tC((l) => Promise.resolve(c.get(l))).then(() => r);
}
i(Ib, "compileNgModuleFactory");
function dm(e) {
  for (let t = e.length - 1; t >= 0; t--)
    if (e[t] !== void 0)
      return e[t];
}
i(dm, "_lastDefined");
class uo {
  static {
    i(this, "NgZoneChangeDetectionScheduler");
  }
  constructor() {
    this.zone = M(de), this.applicationRef = M(ot);
  }
  initialize() {
    this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
      next: /* @__PURE__ */ i(() => {
        this.zone.run(() => {
          this.applicationRef.tick();
        });
      }, "next")
    }));
  }
  ngOnDestroy() {
    this._onMicrotaskEmptySubscription?.unsubscribe();
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || uo)();
    }, "NgZoneChangeDetectionScheduler_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: uo, factory: uo.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(uo, [{
  type: he,
  args: [{ providedIn: "root" }]
}], null, null);
const Cb = new $(typeof ngDevMode > "u" || ngDevMode ? "provideZoneChangeDetection token" : "");
function Eb(e) {
  return [
    { provide: de, useFactory: e },
    {
      provide: dr,
      multi: !0,
      useFactory: /* @__PURE__ */ i(() => {
        const t = M(uo, { optional: !0 });
        if ((typeof ngDevMode > "u" || ngDevMode) && t === null)
          throw new I(402, "A required Injectable was not found in the dependency injection tree. If you are bootstrapping an NgModule, make sure that the `BrowserModule` is imported.");
        return () => t.initialize();
      }, "useFactory")
    },
    {
      provide: dr,
      multi: !0,
      useFactory: /* @__PURE__ */ i(() => {
        const t = M(co);
        return () => {
          t.initialize();
        };
      }, "useFactory")
    },
    { provide: kD, useFactory: JN }
  ];
}
i(Eb, "internalProvideZoneChangeDetection");
function JN() {
  const e = M(de), t = M(_n);
  return (n) => e.runOutsideAngular(() => t.handleError(n));
}
i(JN, "ngZoneApplicationErrorHandlerFactory");
function bb(e) {
  const t = Eb(() => new de(wb(e)));
  return ps([
    typeof ngDevMode > "u" || ngDevMode ? { provide: Cb, useValue: !0 } : [],
    t
  ]);
}
i(bb, "provideZoneChangeDetection");
function wb(e) {
  return {
    enableLongStackTrace: typeof ngDevMode > "u" ? !1 : !!ngDevMode,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
  };
}
i(wb, "getNgZoneOptions");
class co {
  static {
    i(this, "ZoneStablePendingTask");
  }
  constructor() {
    this.subscription = new Ro(), this.initialized = !1, this.zone = M(de), this.pendingTasks = M(xt);
  }
  initialize() {
    if (this.initialized)
      return;
    this.initialized = !0;
    let t = null;
    !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (t = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
      this.subscription.add(this.zone.onStable.subscribe(() => {
        de.assertNotInAngularZone(), queueMicrotask(() => {
          t !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(t), t = null);
        });
      }));
    }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
      de.assertInAngularZone(), t ??= this.pendingTasks.add();
    }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || co)();
    }, "ZoneStablePendingTask_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: co, factory: co.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(co, [{
  type: he,
  args: [{ providedIn: "root" }]
}], null, null);
function XN() {
  return typeof ngI18nClosureMode < "u" && ngI18nClosureMode && typeof goog < "u" && goog.LOCALE !== "en" ? goog.LOCALE : typeof $localize < "u" && $localize.locale || _r;
}
i(XN, "getGlobalLocale");
const ze = new $(ngDevMode ? "LocaleId" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => M(ze, G.Optional | G.SkipSelf) || XN(), "factory")
}), Dp = new $(ngDevMode ? "DefaultCurrencyCode" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => eF, "factory")
}), ek = new $(ngDevMode ? "Translations" : ""), tk = new $(ngDevMode ? "TranslationsFormat" : "");
var hd;
(function(e) {
  e[e.Error = 0] = "Error", e[e.Warning = 1] = "Warning", e[e.Ignore = 2] = "Ignore";
})(hd || (hd = {}));
const vp = new $(ngDevMode ? "PlatformDestroyListeners" : "");
class Rn {
  static {
    i(this, "PlatformRef");
  }
  /** @internal */
  constructor(t) {
    this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
  }
  /**
   * Creates an instance of an `@NgModule` for the given platform.
   *
   * @deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
   *     argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.
   */
  bootstrapModuleFactory(t, n) {
    const r = ZA(n?.ngZone, wb({
      eventCoalescing: n?.ngZoneEventCoalescing,
      runCoalescing: n?.ngZoneRunCoalescing
    }));
    return r.run(() => {
      const o = G1(t.moduleType, this.injector, Eb(() => r));
      if ((typeof ngDevMode > "u" || ngDevMode) && o.injector.get(Cb, null) !== null)
        throw new I(207, "`bootstrapModule` does not support `provideZoneChangeDetection`. Use `BootstrapOptions` instead.");
      const s = o.injector.get(_n, null);
      if ((typeof ngDevMode > "u" || ngDevMode) && s === null)
        throw new I(402, "No ErrorHandler. Is platform module (BrowserModule) included?");
      return r.runOutsideAngular(() => {
        const a = r.onError.subscribe({
          next: /* @__PURE__ */ i((u) => {
            s.handleError(u);
          }, "next")
        });
        o.onDestroy(() => {
          Ia(this._modules, o), a.unsubscribe();
        });
      }), pb(s, r, () => {
        const a = o.injector.get(gn);
        return a.runInitializers(), a.donePromise.then(() => {
          const u = o.injector.get(ze, _r);
          return Sh(u || _r), this._moduleDoBootstrap(o), o;
        });
      });
    });
  }
  /**
   * Creates an instance of an `@NgModule` for a given platform.
   *
   * @usageNotes
   * ### Simple Example
   *
   * ```typescript
   * @NgModule({
   *   imports: [BrowserModule]
   * })
   * class MyModule {}
   *
   * let moduleRef = platformBrowser().bootstrapModule(MyModule);
   * ```
   *
   */
  bootstrapModule(t, n = []) {
    const r = gb({}, n);
    return Ib(this.injector, r, t).then((o) => this.bootstrapModuleFactory(o, r));
  }
  _moduleDoBootstrap(t) {
    const n = t.injector.get(ot);
    if (t._bootstrapComponents.length > 0)
      t._bootstrapComponents.forEach((r) => n.bootstrap(r));
    else if (t.instance.ngDoBootstrap)
      t.instance.ngDoBootstrap(n);
    else
      throw new I(-403, ngDevMode && `The module ${Z(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
    this._modules.push(t);
  }
  /**
   * Registers a listener to be called when the platform is destroyed.
   */
  onDestroy(t) {
    this._destroyListeners.push(t);
  }
  /**
   * Retrieves the platform {@link Injector}, which is the parent injector for
   * every Angular application on the page and provides singleton providers.
   */
  get injector() {
    return this._injector;
  }
  /**
   * Destroys the current Angular platform and all Angular applications on the page.
   * Destroys all modules and listeners registered with the platform.
   */
  destroy() {
    if (this._destroyed)
      throw new I(404, ngDevMode && "The platform has already been destroyed!");
    this._modules.slice().forEach((n) => n.destroy()), this._destroyListeners.forEach((n) => n());
    const t = this._injector.get(vp, null);
    t && (t.forEach((n) => n()), t.clear()), this._destroyed = !0;
  }
  /**
   * Indicates whether this instance was destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || Rn)(ke(xe));
    }, "PlatformRef_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: Rn, factory: Rn.ɵfac, providedIn: "platform" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(Rn, [{
  type: he,
  args: [{ providedIn: "platform" }]
}], () => [{ type: xe }], null);
let xn = null;
const Ip = new $(ngDevMode ? "AllowMultipleToken" : "");
function Mb(e) {
  if (xn && !xn.get(Ip, !1))
    throw new I(400, ngDevMode && "There can be only one platform. Destroy the previous one to create a new one.");
  db(), fb(), xn = e;
  const t = e.get(Rn);
  return Ab(e), t;
}
i(Mb, "createPlatform");
function _b(e, t, n = []) {
  const r = `Platform: ${t}`, o = new $(r);
  return (s = []) => {
    let a = yc();
    if (!a || a.injector.get(Ip, !1)) {
      const u = [...n, ...s, { provide: o, useValue: !0 }];
      e ? e(u) : Mb(Sb(u, r));
    }
    return Tb(o);
  };
}
i(_b, "createPlatformFactory");
function Sb(e = [], t) {
  return xe.create({
    name: t,
    providers: [
      { provide: Ld, useValue: "platform" },
      { provide: vp, useValue: /* @__PURE__ */ new Set([() => xn = null]) },
      ...e
    ]
  });
}
i(Sb, "createPlatformInjector");
function Tb(e) {
  const t = yc();
  if (!t)
    throw new I(401, ngDevMode && "No platform exists!");
  if ((typeof ngDevMode > "u" || ngDevMode) && !t.injector.get(e, null))
    throw new I(400, "A platform with a different configuration has been created. Please destroy it first.");
  return t;
}
i(Tb, "assertPlatform");
function yc() {
  return xn?.get(Rn) ?? null;
}
i(yc, "getPlatform");
function nk() {
  yc()?.destroy();
}
i(nk, "destroyPlatform");
function rk(e = []) {
  if (xn)
    return xn;
  db();
  const t = Sb(e);
  return xn = t, fb(), Ab(t), t;
}
i(rk, "createOrReusePlatformInjector");
function Ab(e) {
  e.get(nv, null)?.forEach((n) => n());
}
i(Ab, "runPlatformInitializers");
function ok() {
  return typeof ngDevMode > "u" || !!ngDevMode;
}
i(ok, "isDevMode");
function ik() {
  (typeof ngDevMode > "u" || ngDevMode) && (pe.ngDevMode = !1);
}
i(ik, "enableProdMode");
function sk(e) {
  const t = iC(e);
  if (!t)
    throw Ob(e);
  return new ec(t);
}
i(sk, "getModuleFactory");
function ak(e) {
  const t = iC(e);
  if (!t)
    throw Ob(e);
  return t;
}
i(ak, "getNgModuleById");
function Ob(e) {
  return new Error(`No module with ID ${e} loaded`);
}
i(Ob, "noModuleError");
class ci {
  static {
    i(this, "ChangeDetectorRef");
  }
  static {
    this.__NG_ELEMENT_ID__ = Fb;
  }
}
function Fb(e) {
  return uk(
    J(),
    y(),
    (e & 16) === 16
    /* InternalInjectFlags.ForPipe */
  );
}
i(Fb, "injectChangeDetectorRef");
function uk(e, t, n) {
  if (nr(e) && !n) {
    const r = yt(e.index, t);
    return new wo(r, r);
  } else if (e.type & 47) {
    const r = t[ve];
    return new wo(r, t);
  }
  return null;
}
i(uk, "createViewRef");
class Nb extends ci {
  static {
    i(this, "ViewRef");
  }
}
class ck extends Nb {
  static {
    i(this, "EmbeddedViewRef");
  }
}
class lk {
  static {
    i(this, "DebugEventListener");
  }
  constructor(t, n) {
    this.name = t, this.callback = n;
  }
}
function dk(e) {
  return e.map((t) => t.nativeElement);
}
i(dk, "asNativeElements");
class Cp {
  static {
    i(this, "DebugNode");
  }
  constructor(t) {
    this.nativeNode = t;
  }
  /**
   * The `DebugElement` parent. Will be `null` if this is the root element.
   */
  get parent() {
    const t = this.nativeNode.parentNode;
    return t ? new Hs(t) : null;
  }
  /**
   * The host dependency injector. For example, the root element's component instance injector.
   */
  get injector() {
    return KD(this.nativeNode);
  }
  /**
   * The element's own component instance, if it has one.
   */
  get componentInstance() {
    const t = this.nativeNode;
    return t && (La(t) || ZD(t));
  }
  /**
   * An object that provides parent context for this element. Often an ancestor component instance
   * that governs this element.
   *
   * When an element is repeated within *ngFor, the context is an `NgForOf` whose `$implicit`
   * property is the value of the row instance value. For example, the `hero` in `*ngFor="let hero
   * of heroes"`.
   */
  get context() {
    return La(this.nativeNode) || QD(this.nativeNode);
  }
  /**
   * The callbacks attached to the component's @Output properties and/or the element's event
   * properties.
   */
  get listeners() {
    return ev(this.nativeNode).filter((t) => t.type === "dom");
  }
  /**
   * Dictionary of objects associated with template local variables (e.g. #foo), keyed by the local
   * variable name.
   */
  get references() {
    return iS(this.nativeNode);
  }
  /**
   * This component's injector lookup tokens. Includes the component itself plus the tokens that the
   * component lists in its providers metadata.
   */
  get providerTokens() {
    return rS(this.nativeNode);
  }
}
class Hs extends Cp {
  static {
    i(this, "DebugElement");
  }
  constructor(t) {
    ngDevMode && On(t), super(t);
  }
  /**
   * The underlying DOM element at the root of the component.
   */
  get nativeElement() {
    return this.nativeNode.nodeType == Node.ELEMENT_NODE ? this.nativeNode : null;
  }
  /**
   * The element tag name, if it is an element.
   */
  get name() {
    const t = rt(this.nativeNode), n = t ? t.lView : null;
    return n !== null ? n[E].data[t.nodeIndex].value : this.nativeNode.nodeName;
  }
  /**
   *  Gets a map of property names to property values for an element.
   *
   *  This map includes:
   *  - Regular property bindings (e.g. `[id]="id"`)
   *  - Host property bindings (e.g. `host: { '[id]': "id" }`)
   *  - Interpolated property bindings (e.g. `id="{{ value }}")
   *
   *  It does not include:
   *  - input property bindings (e.g. `[myCustomInput]="value"`)
   *  - attribute bindings (e.g. `[attr.role]="menu"`)
   */
  get properties() {
    const t = rt(this.nativeNode), n = t ? t.lView : null;
    if (n === null)
      return {};
    const r = n[E].data, o = r[t.nodeIndex], s = {};
    return fk(this.nativeElement, s), pk(s, o, n, r), s;
  }
  /**
   *  A map of attribute names to attribute values for an element.
   */
  // TODO: replace null by undefined in the return type
  get attributes() {
    const t = {}, n = this.nativeElement;
    if (!n)
      return t;
    const r = rt(n), o = r ? r.lView : null;
    if (o === null)
      return {};
    const s = o[E].data[r.nodeIndex].attrs, a = [];
    if (s) {
      let u = 0;
      for (; u < s.length; ) {
        const c = s[u];
        if (typeof c != "string")
          break;
        const l = s[u + 1];
        t[c] = l, a.push(c.toLowerCase()), u += 2;
      }
    }
    for (const u of n.attributes)
      a.includes(u.name) || (t[u.name] = u.value);
    return t;
  }
  /**
   * The inline styles of the DOM element.
   */
  // TODO: replace null by undefined in the return type
  get styles() {
    return this.nativeElement?.style ?? {};
  }
  /**
   * A map containing the class names on the element as keys.
   *
   * This map is derived from the `className` property of the DOM element.
   *
   * Note: The values of this object will always be `true`. The class key will not appear in the KV
   * object if it does not exist on the element.
   *
   * @see [Element.className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)
   */
  get classes() {
    const t = {}, r = this.nativeElement.className;
    return (typeof r != "string" ? r.baseVal.split(" ") : r.split(" ")).forEach((s) => t[s] = !0), t;
  }
  /**
   * The `childNodes` of the DOM element as a `DebugNode` array.
   *
   * @see [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
   */
  get childNodes() {
    const t = this.nativeNode.childNodes, n = [];
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      n.push(Oo(o));
    }
    return n;
  }
  /**
   * The immediate `DebugElement` children. Walk the tree by descending through `children`.
   */
  get children() {
    const t = this.nativeElement;
    if (!t)
      return [];
    const n = t.children, r = [];
    for (let o = 0; o < n.length; o++) {
      const s = n[o];
      r.push(Oo(s));
    }
    return r;
  }
  /**
   * @returns the first `DebugElement` that matches the predicate at any depth in the subtree.
   */
  query(t) {
    return this.queryAll(t)[0] || null;
  }
  /**
   * @returns All `DebugElement` matches for the predicate at any depth in the subtree.
   */
  queryAll(t) {
    const n = [];
    return fm(this, t, n, !0), n;
  }
  /**
   * @returns All `DebugNode` matches for the predicate at any depth in the subtree.
   */
  queryAllNodes(t) {
    const n = [];
    return fm(this, t, n, !1), n;
  }
  /**
   * Triggers the event by its name if there is a corresponding listener in the element's
   * `listeners` collection.
   *
   * If the event lacks a listener or there's some other problem, consider
   * calling `nativeElement.dispatchEvent(eventObject)`.
   *
   * @param eventName The name of the event to trigger
   * @param eventObj The _event object_ expected by the handler
   *
   * @see [Testing components scenarios](guide/testing-components-scenarios#trigger-event-handler)
   */
  triggerEventHandler(t, n) {
    const r = this.nativeNode, o = [];
    this.listeners.forEach((s) => {
      if (s.name === t) {
        const a = s.callback;
        a.call(r, n), o.push(a);
      }
    }), typeof r.eventListeners == "function" && r.eventListeners(t).forEach((s) => {
      if (s.toString().indexOf("__ngUnwrap__") !== -1) {
        const a = s("__ngUnwrap__");
        return o.indexOf(a) === -1 && a.call(r, n);
      }
    });
  }
}
function fk(e, t) {
  if (e) {
    let n = Object.getPrototypeOf(e);
    const r = Node.prototype;
    for (; n !== null && n !== r; ) {
      const o = Object.getOwnPropertyDescriptors(n);
      for (let s in o)
        if (!s.startsWith("__") && !s.startsWith("on")) {
          const a = e[s];
          hk(a) && (t[s] = a);
        }
      n = Object.getPrototypeOf(n);
    }
  }
}
i(fk, "copyDomProperties");
function hk(e) {
  return typeof e == "string" || typeof e == "boolean" || typeof e == "number" || e === null;
}
i(hk, "isPrimitiveValue");
function fm(e, t, n, r) {
  const o = rt(e.nativeNode), s = o ? o.lView : null;
  if (s !== null) {
    const a = s[E].data[o.nodeIndex];
    ar(a, s, t, n, r, e.nativeNode);
  } else
    Ep(e.nativeNode, t, n, r);
}
i(fm, "_queryAll");
function ar(e, t, n, r, o, s) {
  ngDevMode && Ke(e, t);
  const a = JM(e, t);
  if (e.type & 11) {
    if (Wc(a, n, r, o, s), nr(e)) {
      const c = yt(e.index, t);
      c && c[E].firstChild && ar(c[E].firstChild, c, n, r, o, s);
    } else
      e.child && ar(e.child, t, n, r, o, s), a && Ep(a, n, r, o);
    const u = t[e.index];
    Re(u) && hm(u, n, r, o, s);
  } else if (e.type & 4) {
    const u = t[e.index];
    Wc(u[Jt], n, r, o, s), hm(u, n, r, o, s);
  } else if (e.type & 16) {
    const u = t[ve], l = u[Be].projection[e.projection];
    if (Array.isArray(l))
      for (let d of l)
        Wc(d, n, r, o, s);
    else if (l) {
      const d = u[Ee], f = d[E].data[l.index];
      ar(f, d, n, r, o, s);
    }
  } else e.child && ar(e.child, t, n, r, o, s);
  if (s !== a) {
    const u = e.flags & 2 ? e.projectionNext : e.next;
    u && ar(u, t, n, r, o, s);
  }
}
i(ar, "_queryNodeChildren");
function hm(e, t, n, r, o) {
  for (let s = me; s < e.length; s++) {
    const a = e[s], u = a[E].firstChild;
    u && ar(u, a, t, n, r, o);
  }
}
i(hm, "_queryNodeChildrenInContainer");
function Wc(e, t, n, r, o) {
  if (o !== e) {
    const s = Oo(e);
    if (!s)
      return;
    (r && s instanceof Hs && t(s) && n.indexOf(s) === -1 || !r && t(s) && n.indexOf(s) === -1) && n.push(s);
  }
}
i(Wc, "_addQueryMatch");
function Ep(e, t, n, r) {
  const o = e.childNodes, s = o.length;
  for (let a = 0; a < s; a++) {
    const u = o[a], c = Oo(u);
    c && ((r && c instanceof Hs && t(c) && n.indexOf(c) === -1 || !r && t(c) && n.indexOf(c) === -1) && n.push(c), Ep(u, t, n, r));
  }
}
i(Ep, "_queryNativeNodeDescendants");
function pk(e, t, n, r) {
  let o = t.propertyBindings;
  if (o !== null)
    for (let s = 0; s < o.length; s++) {
      const a = o[s], c = r[a].split(Co), l = c[0];
      if (c.length > 1) {
        let d = c[1];
        for (let f = 1; f < c.length - 1; f++)
          d += j(n[a + f - 1]) + c[f + 1];
        e[l] = d;
      } else
        e[l] = n[a];
    }
}
i(pk, "collectPropertyBindings");
const qc = "__ng_debug__";
function Oo(e) {
  return e instanceof Node ? (e.hasOwnProperty(qc) || (e[qc] = e.nodeType == Node.ELEMENT_NODE ? new Hs(e) : new Cp(e)), e[qc]) : null;
}
i(Oo, "getDebugNode");
class kb {
  static {
    i(this, "DefaultIterableDifferFactory");
  }
  constructor() {
  }
  supports(t) {
    return za(t);
  }
  create(t) {
    return new Rb(t);
  }
}
const gk = /* @__PURE__ */ i((e, t) => t, "trackByIdentity");
class Rb {
  static {
    i(this, "DefaultIterableDiffer");
  }
  constructor(t) {
    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || gk;
  }
  forEachItem(t) {
    let n;
    for (n = this._itHead; n !== null; n = n._next)
      t(n);
  }
  forEachOperation(t) {
    let n = this._itHead, r = this._removalsHead, o = 0, s = null;
    for (; n || r; ) {
      const a = !r || n && n.currentIndex < gm(r, o, s) ? n : r, u = gm(a, o, s), c = a.currentIndex;
      if (a === r)
        o--, r = r._nextRemoved;
      else if (n = n._next, a.previousIndex == null)
        o++;
      else {
        s || (s = []);
        const l = u - o, d = c - o;
        if (l != d) {
          for (let h = 0; h < l; h++) {
            const p = h < s.length ? s[h] : s[h] = 0, g = p + h;
            d <= g && g < l && (s[h] = p + 1);
          }
          const f = a.previousIndex;
          s[f] = d - l;
        }
      }
      u !== c && t(a, u, c);
    }
  }
  forEachPreviousItem(t) {
    let n;
    for (n = this._previousItHead; n !== null; n = n._nextPrevious)
      t(n);
  }
  forEachAddedItem(t) {
    let n;
    for (n = this._additionsHead; n !== null; n = n._nextAdded)
      t(n);
  }
  forEachMovedItem(t) {
    let n;
    for (n = this._movesHead; n !== null; n = n._nextMoved)
      t(n);
  }
  forEachRemovedItem(t) {
    let n;
    for (n = this._removalsHead; n !== null; n = n._nextRemoved)
      t(n);
  }
  forEachIdentityChange(t) {
    let n;
    for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange)
      t(n);
  }
  diff(t) {
    if (t == null && (t = []), !za(t))
      throw new I(900, ngDevMode && `Error trying to diff '${Z(t)}'. Only arrays and iterables are allowed`);
    return this.check(t) ? this : null;
  }
  onDestroy() {
  }
  check(t) {
    this._reset();
    let n = this._itHead, r = !1, o, s, a;
    if (Array.isArray(t)) {
      this.length = t.length;
      for (let u = 0; u < this.length; u++)
        s = t[u], a = this._trackByFn(u, s), n === null || !Object.is(n.trackById, a) ? (n = this._mismatch(n, s, a, u), r = !0) : (r && (n = this._verifyReinsertion(n, s, a, u)), Object.is(n.item, s) || this._addIdentityChange(n, s)), n = n._next;
    } else
      o = 0, Z1(t, (u) => {
        a = this._trackByFn(o, u), n === null || !Object.is(n.trackById, a) ? (n = this._mismatch(n, u, a, o), r = !0) : (r && (n = this._verifyReinsertion(n, u, a, o)), Object.is(n.item, u) || this._addIdentityChange(n, u)), n = n._next, o++;
      }), this.length = o;
    return this._truncate(n), this.collection = t, this.isDirty;
  }
  /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
   * changes.
   */
  get isDirty() {
    return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null;
  }
  /**
   * Reset the state of the change objects to show no changes. This means set previousKey to
   * currentKey, and clear all of the queues (additions, moves, removals).
   * Set the previousIndexes of moved and added items to their currentIndexes
   * Reset the list of additions, moves and removals
   *
   * @internal
   */
  _reset() {
    if (this.isDirty) {
      let t;
      for (t = this._previousItHead = this._itHead; t !== null; t = t._next)
        t._nextPrevious = t._next;
      for (t = this._additionsHead; t !== null; t = t._nextAdded)
        t.previousIndex = t.currentIndex;
      for (this._additionsHead = this._additionsTail = null, t = this._movesHead; t !== null; t = t._nextMoved)
        t.previousIndex = t.currentIndex;
      this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null;
    }
  }
  /**
   * This is the core function which handles differences between collections.
   *
   * - `record` is the record which we saw at this position last time. If null then it is a new
   *   item.
   * - `item` is the current item in the collection
   * - `index` is the position of the item in the collection
   *
   * @internal
   */
  _mismatch(t, n, r, o) {
    let s;
    return t === null ? s = this._itTail : (s = t._prev, this._remove(t)), t = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, s, o)) : (t = this._linkedRecords === null ? null : this._linkedRecords.get(r, o), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, s, o)) : t = this._addAfter(new mk(n, r), s, o)), t;
  }
  /**
   * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
   *
   * Use case: `[a, a]` => `[b, a, a]`
   *
   * If we did not have this check then the insertion of `b` would:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) leave `a` at index `1` as is. <-- this is wrong!
   *   3) reinsert `a` at index 2. <-- this is wrong!
   *
   * The correct behavior is:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) reinsert `a` at index 1.
   *   3) move `a` at from `1` to `2`.
   *
   *
   * Double check that we have not evicted a duplicate item. We need to check if the item type may
   * have already been removed:
   * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
   * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
   * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
   * at the end.
   *
   * @internal
   */
  _verifyReinsertion(t, n, r, o) {
    let s = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null);
    return s !== null ? t = this._reinsertAfter(s, t._prev, o) : t.currentIndex != o && (t.currentIndex = o, this._addToMoves(t, o)), t;
  }
  /**
   * Get rid of any excess {@link IterableChangeRecord_}s from the previous collection
   *
   * - `record` The first excess {@link IterableChangeRecord_}.
   *
   * @internal
   */
  _truncate(t) {
    for (; t !== null; ) {
      const n = t._next;
      this._addToRemovals(this._unlink(t)), t = n;
    }
    this._unlinkedRecords !== null && this._unlinkedRecords.clear(), this._additionsTail !== null && (this._additionsTail._nextAdded = null), this._movesTail !== null && (this._movesTail._nextMoved = null), this._itTail !== null && (this._itTail._next = null), this._removalsTail !== null && (this._removalsTail._nextRemoved = null), this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null);
  }
  /** @internal */
  _reinsertAfter(t, n, r) {
    this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
    const o = t._prevRemoved, s = t._nextRemoved;
    return o === null ? this._removalsHead = s : o._nextRemoved = s, s === null ? this._removalsTail = o : s._prevRemoved = o, this._insertAfter(t, n, r), this._addToMoves(t, r), t;
  }
  /** @internal */
  _moveAfter(t, n, r) {
    return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t;
  }
  /** @internal */
  _addAfter(t, n, r) {
    return this._insertAfter(t, n, r), this._additionsTail === null ? this._additionsTail = this._additionsHead = t : this._additionsTail = this._additionsTail._nextAdded = t, t;
  }
  /** @internal */
  _insertAfter(t, n, r) {
    const o = n === null ? this._itHead : n._next;
    return t._next = o, t._prev = n, o === null ? this._itTail = t : o._prev = t, n === null ? this._itHead = t : n._next = t, this._linkedRecords === null && (this._linkedRecords = new pm()), this._linkedRecords.put(t), t.currentIndex = r, t;
  }
  /** @internal */
  _remove(t) {
    return this._addToRemovals(this._unlink(t));
  }
  /** @internal */
  _unlink(t) {
    this._linkedRecords !== null && this._linkedRecords.remove(t);
    const n = t._prev, r = t._next;
    return n === null ? this._itHead = r : n._next = r, r === null ? this._itTail = n : r._prev = n, t;
  }
  /** @internal */
  _addToMoves(t, n) {
    return t.previousIndex === n || (this._movesTail === null ? this._movesTail = this._movesHead = t : this._movesTail = this._movesTail._nextMoved = t), t;
  }
  _addToRemovals(t) {
    return this._unlinkedRecords === null && (this._unlinkedRecords = new pm()), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, this._removalsTail === null ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t;
  }
  /** @internal */
  _addIdentityChange(t, n) {
    return t.item = n, this._identityChangesTail === null ? this._identityChangesTail = this._identityChangesHead = t : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = t, t;
  }
}
class mk {
  static {
    i(this, "IterableChangeRecord_");
  }
  constructor(t, n) {
    this.item = t, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null;
  }
}
class yk {
  static {
    i(this, "_DuplicateItemRecordList");
  }
  constructor() {
    this._head = null, this._tail = null;
  }
  /**
   * Append the record to the list of duplicates.
   *
   * Note: by design all records in the list of duplicates hold the same value in record.item.
   */
  add(t) {
    this._head === null ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t);
  }
  // Returns a IterableChangeRecord_ having IterableChangeRecord_.trackById == trackById and
  // IterableChangeRecord_.currentIndex >= atOrAfterIndex
  get(t, n) {
    let r;
    for (r = this._head; r !== null; r = r._nextDup)
      if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t))
        return r;
    return null;
  }
  /**
   * Remove one {@link IterableChangeRecord_} from the list of duplicates.
   *
   * Returns whether the list of duplicates is empty.
   */
  remove(t) {
    const n = t._prevDup, r = t._nextDup;
    return n === null ? this._head = r : n._nextDup = r, r === null ? this._tail = n : r._prevDup = n, this._head === null;
  }
}
class pm {
  static {
    i(this, "_DuplicateMap");
  }
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  put(t) {
    const n = t.trackById;
    let r = this.map.get(n);
    r || (r = new yk(), this.map.set(n, r)), r.add(t);
  }
  /**
   * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
   * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
   *
   * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
   * have any more `a`s needs to return the second `a`.
   */
  get(t, n) {
    const r = t, o = this.map.get(r);
    return o ? o.get(t, n) : null;
  }
  /**
   * Removes a {@link IterableChangeRecord_} from the list of duplicates.
   *
   * The list of duplicates also is removed from the map if it gets empty.
   */
  remove(t) {
    const n = t.trackById;
    return this.map.get(n).remove(t) && this.map.delete(n), t;
  }
  get isEmpty() {
    return this.map.size === 0;
  }
  clear() {
    this.map.clear();
  }
}
function gm(e, t, n) {
  const r = e.previousIndex;
  if (r === null)
    return r;
  let o = 0;
  return n && r < n.length && (o = n[r]), r + t + o;
}
i(gm, "getPreviousIndex");
class xb {
  static {
    i(this, "DefaultKeyValueDifferFactory");
  }
  constructor() {
  }
  supports(t) {
    return t instanceof Map || ih(t);
  }
  create() {
    return new Dk();
  }
}
class Dk {
  static {
    i(this, "DefaultKeyValueDiffer");
  }
  constructor() {
    this._records = /* @__PURE__ */ new Map(), this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null;
  }
  get isDirty() {
    return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
  }
  forEachItem(t) {
    let n;
    for (n = this._mapHead; n !== null; n = n._next)
      t(n);
  }
  forEachPreviousItem(t) {
    let n;
    for (n = this._previousMapHead; n !== null; n = n._nextPrevious)
      t(n);
  }
  forEachChangedItem(t) {
    let n;
    for (n = this._changesHead; n !== null; n = n._nextChanged)
      t(n);
  }
  forEachAddedItem(t) {
    let n;
    for (n = this._additionsHead; n !== null; n = n._nextAdded)
      t(n);
  }
  forEachRemovedItem(t) {
    let n;
    for (n = this._removalsHead; n !== null; n = n._nextRemoved)
      t(n);
  }
  diff(t) {
    if (!t)
      t = /* @__PURE__ */ new Map();
    else if (!(t instanceof Map || ih(t)))
      throw new I(900, ngDevMode && `Error trying to diff '${Z(t)}'. Only maps and objects are allowed`);
    return this.check(t) ? this : null;
  }
  onDestroy() {
  }
  /**
   * Check the current state of the map vs the previous.
   * The algorithm is optimised for when the keys do no change.
   */
  check(t) {
    this._reset();
    let n = this._mapHead;
    if (this._appendAfter = null, this._forEach(t, (r, o) => {
      if (n && n.key === o)
        this._maybeAddToChanges(n, r), this._appendAfter = n, n = n._next;
      else {
        const s = this._getOrCreateRecordForKey(o, r);
        n = this._insertBeforeOrAppend(n, s);
      }
    }), n) {
      n._prev && (n._prev._next = null), this._removalsHead = n;
      for (let r = n; r !== null; r = r._nextRemoved)
        r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null;
    }
    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty;
  }
  /**
   * Inserts a record before `before` or append at the end of the list when `before` is null.
   *
   * Notes:
   * - This method appends at `this._appendAfter`,
   * - This method updates `this._appendAfter`,
   * - The return value is the new value for the insertion pointer.
   */
  _insertBeforeOrAppend(t, n) {
    if (t) {
      const r = t._prev;
      return n._next = t, n._prev = r, t._prev = n, r && (r._next = n), t === this._mapHead && (this._mapHead = n), this._appendAfter = t, t;
    }
    return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null;
  }
  _getOrCreateRecordForKey(t, n) {
    if (this._records.has(t)) {
      const o = this._records.get(t);
      this._maybeAddToChanges(o, n);
      const s = o._prev, a = o._next;
      return s && (s._next = a), a && (a._prev = s), o._next = null, o._prev = null, o;
    }
    const r = new vk(t);
    return this._records.set(t, r), r.currentValue = n, this._addToAdditions(r), r;
  }
  /** @internal */
  _reset() {
    if (this.isDirty) {
      let t;
      for (this._previousMapHead = this._mapHead, t = this._previousMapHead; t !== null; t = t._next)
        t._nextPrevious = t._next;
      for (t = this._changesHead; t !== null; t = t._nextChanged)
        t.previousValue = t.currentValue;
      for (t = this._additionsHead; t != null; t = t._nextAdded)
        t.previousValue = t.currentValue;
      this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null;
    }
  }
  // Add the record or a given key to the list of changes only when the value has actually changed
  _maybeAddToChanges(t, n) {
    Object.is(n, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = n, this._addToChanges(t));
  }
  _addToAdditions(t) {
    this._additionsHead === null ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t);
  }
  _addToChanges(t) {
    this._changesHead === null ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t);
  }
  /** @internal */
  _forEach(t, n) {
    t instanceof Map ? t.forEach(n) : Object.keys(t).forEach((r) => n(t[r], r));
  }
}
class vk {
  static {
    i(this, "KeyValueChangeRecord_");
  }
  constructor(t) {
    this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null;
  }
}
function mm() {
  return new Ot([new kb()]);
}
i(mm, "defaultIterableDiffersFactory");
class Ot {
  static {
    i(this, "IterableDiffers");
  }
  static {
    this.ɵprov = ne({ token: Ot, providedIn: "root", factory: mm });
  }
  constructor(t) {
    this.factories = t;
  }
  static create(t, n) {
    if (n != null) {
      const r = n.factories.slice();
      t = t.concat(r);
    }
    return new Ot(t);
  }
  /**
   * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
   * inherited {@link IterableDiffers} instance with the provided factories and return a new
   * {@link IterableDiffers} instance.
   *
   * @usageNotes
   * ### Example
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link IterableDiffer} available.
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     IterableDiffers.extend([new ImmutableListDiffer()])
   *   ]
   * })
   * ```
   */
  static extend(t) {
    return {
      provide: Ot,
      useFactory: /* @__PURE__ */ i((n) => Ot.create(t, n || mm()), "useFactory"),
      // Dependency technically isn't optional, but we can provide a better error message this way.
      deps: [[Ot, new yu(), new Kt()]]
    };
  }
  find(t) {
    const n = this.factories.find((r) => r.supports(t));
    if (n != null)
      return n;
    throw new I(901, ngDevMode && `Cannot find a differ supporting object '${t}' of type '${Ik(t)}'`);
  }
}
function Ik(e) {
  return e.name || typeof e;
}
i(Ik, "getTypeNameForDebugging");
function ym() {
  return new dt([new xb()]);
}
i(ym, "defaultKeyValueDiffersFactory");
class dt {
  static {
    i(this, "KeyValueDiffers");
  }
  static {
    this.ɵprov = ne({ token: dt, providedIn: "root", factory: ym });
  }
  constructor(t) {
    this.factories = t;
  }
  static create(t, n) {
    if (n) {
      const r = n.factories.slice();
      t = t.concat(r);
    }
    return new dt(t);
  }
  /**
   * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
   * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
   * {@link KeyValueDiffers} instance.
   *
   * @usageNotes
   * ### Example
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link KeyValueDiffer} available.
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
   *   ]
   * })
   * ```
   */
  static extend(t) {
    return {
      provide: dt,
      useFactory: /* @__PURE__ */ i((n) => dt.create(t, n || ym()), "useFactory"),
      // Dependency technically isn't optional, but we can provide a better error message this way.
      deps: [[dt, new yu(), new Kt()]]
    };
  }
  find(t) {
    const n = this.factories.find((r) => r.supports(t));
    if (n)
      return n;
    throw new I(901, ngDevMode && `Cannot find a differ supporting object '${t}'`);
  }
}
const Ck = [new xb()], Ek = [new kb()], bk = new Ot(Ek), wk = new dt(Ck), Mk = _b(null, "core", []);
class Xi {
  static {
    i(this, "ApplicationModule");
  }
  // Inject ApplicationRef to make it eager...
  constructor(t) {
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || Xi)(ke(ot));
    }, "ApplicationModule_Factory");
  }
  static {
    this.ɵmod = /* @__PURE__ */ Rd({ type: Xi });
  }
  static {
    this.ɵinj = /* @__PURE__ */ pu({});
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(Xi, [{
  type: fp
}], () => [{ type: ot }], null);
function _k(e) {
}
i(_k, "setAlternateWeakRefImpl");
const Sk = 200, Dm = 1200;
class lo {
  static {
    i(this, "ImagePerformanceWarning");
  }
  constructor() {
    this.window = null, this.observer = null, this.options = M(lf), this.ngZone = M(de);
  }
  start() {
    if (typeof PerformanceObserver > "u" || this.options?.disableImageSizeWarning && this.options?.disableImageLazyLoadWarning)
      return;
    this.observer = this.initPerformanceObserver();
    const t = Kn(), n = t.defaultView;
    if (typeof n < "u") {
      this.window = n;
      const r = /* @__PURE__ */ i(() => {
        setTimeout(this.scanImages.bind(this), Sk);
      }, "waitToScan");
      this.ngZone.runOutsideAngular(() => {
        t.readyState === "complete" ? r() : this.window?.addEventListener("load", r, { once: !0 });
      });
    }
  }
  ngOnDestroy() {
    this.observer?.disconnect();
  }
  initPerformanceObserver() {
    if (typeof PerformanceObserver > "u")
      return null;
    const t = new PerformanceObserver((n) => {
      const r = n.getEntries();
      if (r.length === 0)
        return;
      const s = r[r.length - 1].element?.src ?? "";
      s.startsWith("data:") || s.startsWith("blob:") || (this.lcpImageUrl = s);
    });
    return t.observe({ type: "largest-contentful-paint", buffered: !0 }), t;
  }
  scanImages() {
    const t = Kn().querySelectorAll("img");
    let n, r = !1;
    t.forEach((o) => {
      if (!this.options?.disableImageSizeWarning)
        for (const s of t)
          !s.getAttribute("ng-img") && this.isOversized(s) && Ak(s.src);
      !this.options?.disableImageLazyLoadWarning && this.lcpImageUrl && o.src === this.lcpImageUrl && (n = !0, (o.loading !== "lazy" || o.getAttribute("ng-img")) && (r = !0));
    }), n && !r && this.lcpImageUrl && !this.options?.disableImageLazyLoadWarning && Tk(this.lcpImageUrl);
  }
  isOversized(t) {
    if (!this.window)
      return !1;
    const n = this.window.getComputedStyle(t);
    let r = parseFloat(n.getPropertyValue("width")), o = parseFloat(n.getPropertyValue("height"));
    const s = n.getPropertyValue("box-sizing");
    if (n.getPropertyValue("object-fit") === "cover")
      return !1;
    if (s === "border-box") {
      const p = n.getPropertyValue("padding-top"), g = n.getPropertyValue("padding-right"), m = n.getPropertyValue("padding-bottom"), v = n.getPropertyValue("padding-left");
      r -= parseFloat(g) + parseFloat(v), o -= parseFloat(p) + parseFloat(m);
    }
    const u = t.naturalWidth, c = t.naturalHeight, l = this.window.devicePixelRatio * r, d = this.window.devicePixelRatio * o, f = u - l >= Dm, h = c - d >= Dm;
    return f || h;
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || lo)();
    }, "ImagePerformanceWarning_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: lo, factory: lo.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(lo, [{
  type: he,
  args: [{ providedIn: "root" }]
}], null, null);
function Tk(e) {
  console.warn(ye(-913, `An image with src ${e} is the Largest Contentful Paint (LCP) element but was given a "loading" value of "lazy", which can negatively impact application loading performance. This warning can be addressed by changing the loading value of the LCP image to "eager", or by using the NgOptimizedImage directive's prioritization utilities. For more information about addressing or disabling this warning, see https://angular.io/errors/NG0913`));
}
i(Tk, "logLazyLCPWarning");
function Ak(e) {
  console.warn(ye(-913, `An image with src ${e} has intrinsic file dimensions much larger than its rendered size. This can negatively impact application loading performance. For more information about addressing or disabling this warning, see https://angular.io/errors/NG0913`));
}
i(Ak, "logOversizedImageWarning");
function Ok(e) {
  try {
    const { rootComponent: t, appProviders: n, platformProviders: r } = e;
    (typeof ngDevMode > "u" || ngDevMode) && t !== void 0 && pT(t);
    const o = rk(r), s = [
      bb(),
      ...n || []
    ], u = new hC({
      providers: s,
      parent: o,
      debugName: typeof ngDevMode > "u" || ngDevMode ? "Environment Injector" : "",
      // We skip environment initializers because we need to run them inside the NgZone, which
      // happens after we get the NgZone instance from the Injector.
      runEnvironmentInitializers: !1
    }).injector, c = u.get(de);
    return c.run(() => {
      u.resolveInjectorInitializers();
      const l = u.get(_n, null);
      if ((typeof ngDevMode > "u" || ngDevMode) && !l)
        throw new I(402, "No `ErrorHandler` found in the Dependency Injection tree.");
      let d;
      c.runOutsideAngular(() => {
        d = c.onError.subscribe({
          next: /* @__PURE__ */ i((p) => {
            l.handleError(p);
          }, "next")
        });
      });
      const f = /* @__PURE__ */ i(() => u.destroy(), "destroyListener"), h = o.get(vp);
      return h.add(f), u.onDestroy(() => {
        d.unsubscribe(), h.delete(f);
      }), pb(l, c, () => {
        const p = u.get(gn);
        return p.runInitializers(), p.donePromise.then(() => {
          const g = u.get(ze, _r);
          Sh(g || _r);
          const m = u.get(ot);
          return t !== void 0 && m.bootstrap(t), (typeof ngDevMode > "u" || ngDevMode) && u.get(lo).start(), m;
        });
      });
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
i(Ok, "internalCreateApplication");
class fo {
  static {
    i(this, "ChangeDetectionSchedulerImpl");
  }
  constructor() {
    this.appRef = M(ot), this.taskService = M(xt), this.pendingRenderTaskId = null, this.shouldRefreshViews = !1;
  }
  notify(t = 0) {
    this.shouldRefreshViews ||= t === 0, this.pendingRenderTaskId === null && (this.pendingRenderTaskId = this.taskService.add(), this.raceTimeoutAndRequestAnimationFrame());
  }
  /**
   * Run change detection after the first of setTimeout and requestAnimationFrame resolves.
   *
   * - `requestAnimationFrame` ensures that change detection runs ahead of a browser repaint.
   * This ensures that the create and update passes of a change detection always happen
   * in the same frame.
   * - When the browser is resource-starved, `rAF` can execute _before_ a `setTimeout` because
   * rendering is a very high priority process. This means that `setTimeout` cannot guarantee
   * same-frame create and update pass, when `setTimeout` is used to schedule the update phase.
   * - While `rAF` gives us the desirable same-frame updates, it has two limitations that
   * prevent it from being used alone. First, it does not run in background tabs, which would
   * prevent Angular from initializing an application when opened in a new tab (for example).
   * Second, repeated calls to requestAnimationFrame will execute at the refresh rate of the
   * hardware (~16ms for a 60Hz display). This would cause significant slowdown of tests that
   * are written with several updates and asserts in the form of "update; await stable; assert;".
   * - Both `setTimeout` and `rAF` are able to "coalesce" several events from a single user
   * interaction into a single change detection. Importantly, this reduces view tree traversals when
   * compared to an alternative timing mechanism like `queueMicrotask`, where change detection would
   * then be interleaves between each event.
   *
   * By running change detection after the first of `setTimeout` and `rAF` to execute, we get the
   * best of both worlds.
   */
  async raceTimeoutAndRequestAnimationFrame() {
    const t = new Promise((r) => setTimeout(r)), n = typeof pe.requestAnimationFrame == "function" ? new Promise((r) => requestAnimationFrame(() => r())) : null;
    await Promise.race([t, n]), this.tick();
  }
  tick() {
    try {
      this.appRef.destroyed || this.appRef._tick(this.shouldRefreshViews);
    } finally {
      this.shouldRefreshViews = !1;
      const t = this.pendingRenderTaskId;
      this.pendingRenderTaskId = null, this.taskService.remove(t);
    }
  }
  static {
    this.ɵfac = /* @__PURE__ */ i(function(n) {
      return new (n || fo)();
    }, "ChangeDetectionSchedulerImpl_Factory");
  }
  static {
    this.ɵprov = /* @__PURE__ */ ne({ token: fo, factory: fo.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Xe(fo, [{
  type: he,
  args: [{ providedIn: "root" }]
}], null, null);
function Fk() {
  return ps([
    { provide: Yu, useExisting: fo },
    { provide: de, useClass: Vf }
  ]);
}
i(Fk, "provideZonelessChangeDetection");
function pd(e, t) {
  const n = e[E];
  for (let r = A; r < n.bindingStartIndex; r++)
    if (Re(e[r])) {
      const o = e[r];
      if (!(r === n.bindingStartIndex - 1)) {
        const a = n.data[r], u = vt(n, a);
        if (oO(u)) {
          t.push({ lContainer: o, lView: e, tNode: a, tDetails: u });
          continue;
        }
      }
      for (let a = me; a < o.length; a++)
        pd(o[a], t);
    } else je(e[r]) && pd(e[r], t);
}
i(pd, "getDeferBlocks");
let vm = !1, Pb = !1;
const Nk = 1e4;
function kk() {
  vm || (vm = !0, DS(), VO(), YF(), GO(), J1(), d1(), jA(), xT(), fF());
}
i(kk, "enableHydrationRuntimeSupport");
function Rk(e) {
  const t = e.get(Yt), n = `Angular hydrated ${ngDevMode.hydratedComponents} component(s) and ${ngDevMode.hydratedNodes} node(s), ${ngDevMode.componentsSkippedHydration} component(s) were skipped. Learn more at https://angular.io/guide/hydration.`;
  t.log(n);
}
i(Rk, "printHydrationStats");
function xk(e, t) {
  const n = mb(e);
  if (typeof ngDevMode < "u" && ngDevMode) {
    const r = Nk, o = t.get(Yt), a = t.get(de).runOutsideAngular(() => setTimeout(() => $k(r, o), r));
    n.finally(() => clearTimeout(a));
  }
  return n;
}
i(xk, "whenStableWithTimeout");
function Pk() {
  return ps([
    {
      provide: hi,
      useFactory: /* @__PURE__ */ i(() => {
        let e = !0;
        if (Nt() && (e = !!M(Vr, { optional: !0 })?.get(hf, null), !e && typeof ngDevMode < "u" && ngDevMode)) {
          const n = M(Yt), r = ye(-505, "Angular hydration was requested on the client, but there was no serialized information present in the server response, thus hydration was not enabled. Make sure the `provideClientHydration()` is included into the list of providers in the server part of the application configuration.");
          n.warn(r);
        }
        return e && St("NgHydration"), e;
      }, "useFactory")
    },
    {
      provide: dr,
      useValue: /* @__PURE__ */ i(() => {
        Pb = !!M(dv, { optional: !0 }), Nt() && M(hi) && (Bk(), kk());
      }, "useValue"),
      multi: !0
    },
    {
      provide: lv,
      useFactory: /* @__PURE__ */ i(() => Nt() && M(hi), "useFactory")
    },
    {
      provide: yp,
      useFactory: /* @__PURE__ */ i(() => {
        if (Nt() && M(hi)) {
          const e = M(ot), t = M(xe);
          return () => {
            xk(e, t).then(() => {
              _A(e), typeof ngDevMode < "u" && ngDevMode && Rk(t);
            });
          };
        }
        return () => {
        };
      }, "useFactory"),
      multi: !0
    }
  ]);
}
i(Pk, "withDomHydration");
function Lk() {
  return ps([
    {
      provide: dv,
      useValue: !0
    }
  ]);
}
i(Lk, "withI18nHydration");
function jk() {
  return Pb;
}
i(jk, "isI18nHydrationSupportEnabled");
function $k(e, t) {
  const n = `Angular hydration expected the ApplicationRef.isStable() to emit \`true\`, but it didn't happen within ${e}ms. Angular hydration logic depends on the application becoming stable as a signal to complete hydration process.`;
  t.warn(ye(-506, n));
}
i($k, "logWarningOnStableTimedout");
function Bk() {
  const e = Kn();
  let t;
  for (const n of e.body.childNodes)
    if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === rv) {
      t = n;
      break;
    }
  if (!t)
    throw new I(-507, typeof ngDevMode < "u" && ngDevMode && "Angular hydration logic detected that HTML content of this page was modified after it was produced during server side rendering. Make sure that there are no optimizations that remove comment nodes from HTML enabled on your CDN. Angular hydration relies on HTML produced by the server, including whitespaces and comment nodes.");
}
i(Bk, "verifySsrContentsIntegrity");
class Hk {
  static {
    i(this, "SerializedViewCollection");
  }
  constructor() {
    this.views = [], this.indexByContent = /* @__PURE__ */ new Map();
  }
  add(t) {
    const n = JSON.stringify(t);
    if (!this.indexByContent.has(n)) {
      const r = this.views.length;
      return this.views.push(t), this.indexByContent.set(n, r), r;
    }
    return this.indexByContent.get(n);
  }
  getAll() {
    return this.views;
  }
}
let Vk = 0;
function Lb(e) {
  return e.ssrId || (e.ssrId = `t${Vk++}`), e.ssrId;
}
i(Lb, "getSsrId");
function jb(e, t, n) {
  const r = [];
  return qi(e, t, n, r), r.length;
}
i(jb, "calcNumRootNodes");
function Uk(e) {
  const t = [];
  return dI(e, t), t.length;
}
i(Uk, "calcNumRootNodesInLContainer");
function $b(e, t) {
  const n = e[fe];
  return n && !n.hasAttribute(Ui) ? tu(n, e, t) : null;
}
i($b, "annotateComponentLViewForHydration");
function Bb(e, t) {
  const n = Gd(e[fe]), r = $b(n, t), o = oe(n[fe]), s = e[Ee], a = tu(o, s, t), u = n[N], c = `${r}|${a}`;
  u.setAttribute(o, vi, c);
}
i(Bb, "annotateLContainerForHydration");
function zk(e, t) {
  const n = new Hk(), r = /* @__PURE__ */ new Map(), o = e._views;
  for (const u of o) {
    const c = iv(u);
    if (c !== null) {
      const l = {
        serializedViewCollection: n,
        corruptedTextNodes: r
      };
      Re(c) ? Bb(c, l) : $b(c, l), Qk(r, t);
    }
  }
  const s = n.getAll();
  e.injector.get(Vr).set(hf, s);
}
i(zk, "annotateForHydration");
function Gk(e, t) {
  const n = [];
  let r = "";
  for (let o = me; o < e.length; o++) {
    let s = e[o], a, u, c;
    if (Hd(s) && (s = s[A], Re(s))) {
      u = Uk(s) + 1, Bb(s, t);
      const d = Gd(s[fe]);
      c = {
        [Rl]: d[E].ssrId,
        [vo]: u
      };
    }
    if (!c) {
      const d = s[E];
      d.type === 1 ? (a = d.ssrId, u = 1) : (a = Lb(d), u = jb(d, s, d.firstChild)), c = {
        [Rl]: a,
        [vo]: u,
        ...Hb(e[o], t)
      };
    }
    const l = JSON.stringify(c);
    if (n.length > 0 && l === r) {
      const d = n[n.length - 1];
      d[ja] ??= 1, d[ja]++;
    } else
      r = l, n.push(c);
  }
  return n;
}
i(Gk, "serializeLContainer");
function eu(e, t, n) {
  const r = t.index - A;
  e[xl] ??= {}, e[xl][r] = xA(t, n);
}
i(eu, "appendSerializedNodePath");
function Im(e, t) {
  const n = t.index - A;
  e[ma] ??= [], e[ma].includes(n) || e[ma].push(n);
}
i(Im, "appendDisconnectedNodeIndex");
function Hb(e, t) {
  const n = {}, r = e[E];
  for (let o = A; o < r.bindingStartIndex; o++) {
    const s = r.data[o], a = o - A;
    if (y_(s)) {
      if (Zi(s, e) && Zk(s)) {
        Im(n, s);
        continue;
      }
      if (Array.isArray(s.projection)) {
        for (const u of s.projection)
          if (u)
            if (!Array.isArray(u))
              !HM(u) && !Pa(u) && (Zi(u, e) ? Im(n, u) : eu(n, u, e));
            else
              throw DA(oe(e[o]));
      }
      if (Wk(n, s, e), Re(e[o])) {
        const u = s.tView;
        u !== null && (n[kl] ??= {}, n[kl][a] = Lb(u));
        const c = e[o][fe];
        if (Array.isArray(c)) {
          const l = oe(c);
          l.hasAttribute(Ui) || tu(l, c, t);
        }
        n[zi] ??= {}, n[zi][a] = Gk(e[o], t);
      } else if (Array.isArray(e[o])) {
        const u = oe(e[o][fe]);
        u.hasAttribute(Ui) || tu(u, e[o], t);
      } else if (s.type & 8)
        n[Nl] ??= {}, n[Nl][a] = jb(r, e, s.child);
      else if (s.type & 16) {
        let u = s.next;
        for (; u !== null && u.type & 16; )
          u = u.next;
        u && !Pa(u) && eu(n, u, e);
      } else if (s.type & 1) {
        const u = oe(e[o]);
        u.textContent === "" ? t.corruptedTextNodes.set(
          u,
          "ngetn"
          /* TextNodeMarker.EmptyNode */
        ) : u.nextSibling?.nodeType === Node.TEXT_NODE && t.corruptedTextNodes.set(
          u,
          "ngtns"
          /* TextNodeMarker.Separator */
        );
      }
    }
  }
  return n;
}
i(Hb, "serializeLView");
function Wk(e, t, n) {
  t.projectionNext && t.projectionNext !== t.next && !Pa(t.projectionNext) && eu(e, t.projectionNext, n), t.prev === null && t.parent !== null && Zi(t.parent, n) && !Zi(t, n) && eu(e, t, n);
}
i(Wk, "conditionallyAnnotateNodePath");
function qk(e) {
  const t = e[se];
  return t?.constructor ? U(t.constructor)?.encapsulation === yn.ShadowDom : !1;
}
i(qk, "componentUsesShadowDomEncapsulation");
function tu(e, t, n) {
  const r = t[N];
  if (VM(t) && !jk() || qk(t))
    return r.setAttribute(e, Ui, ""), null;
  {
    const o = Hb(t, n), s = n.serializedViewCollection.add(o);
    return r.setAttribute(e, vi, s.toString()), s;
  }
}
i(tu, "annotateHostElementForHydration");
function Qk(e, t) {
  for (const [n, r] of e)
    n.after(t.createComment(r));
}
i(Qk, "insertCorruptedTextNodeMarkers");
function Zk(e) {
  let t = e;
  for (; t != null; ) {
    if (nr(t))
      return !0;
    t = t.parent;
  }
  return !1;
}
i(Zk, "isContentProjectedNode");
function Vb(e, t) {
  !t && Ye(Vb);
  const n = t?.injector ?? M(xe), r = n.get(ot);
  let o = !1;
  const s = /* @__PURE__ */ i(() => {
    o || r.destroyed || (o = !0, e());
  }, "runCallbackOnce");
  Ha(s, { injector: n, runOnServer: !0 }), queueMicrotask(s);
}
i(Vb, "queueStateUpdate");
function Pn(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
i(Pn, "booleanAttribute");
function es(e, t = NaN) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
i(es, "numberAttribute");
function It(e) {
  return Oe({ usage: 1, kind: "directive", type: e.type }).compileDirectiveDeclaration(Qe, `ng:///${e.type.name}/ɵfac.js`, e);
}
i(It, "ɵɵngDeclareDirective");
function H(e) {
  Xe(e.type, e.decorators, e.ctorParameters ?? null, e.propDecorators ?? null);
}
i(H, "ɵɵngDeclareClassMetadata");
function Yk(e) {
  return Oe({ usage: 1, kind: "component", type: e.type }).compileComponentDeclaration(Qe, `ng:///${e.type.name}/ɵcmp.js`, e);
}
i(Yk, "ɵɵngDeclareComponent");
function V(e) {
  return Oe({
    usage: 1,
    kind: Kk(e.target),
    type: e.type
  }).compileFactoryDeclaration(Qe, `ng:///${e.type.name}/ɵfac.js`, e);
}
i(V, "ɵɵngDeclareFactory");
function Kk(e) {
  switch (e) {
    case L.Directive:
      return "directive";
    case L.Component:
      return "component";
    case L.Injectable:
      return "injectable";
    case L.Pipe:
      return "pipe";
    case L.NgModule:
      return "NgModule";
  }
}
i(Kk, "getFactoryKind");
function Ct(e) {
  return Oe({ usage: 1, kind: "injectable", type: e.type }).compileInjectableDeclaration(Qe, `ng:///${e.type.name}/ɵprov.js`, e);
}
i(Ct, "ɵɵngDeclareInjectable");
function Ub(e) {
  return Oe({ usage: 1, kind: "NgModule", type: e.type }).compileInjectorDeclaration(Qe, `ng:///${e.type.name}/ɵinj.js`, e);
}
i(Ub, "ɵɵngDeclareInjector");
function zb(e) {
  return Oe({ usage: 1, kind: "NgModule", type: e.type }).compileNgModuleDeclaration(Qe, `ng:///${e.type.name}/ɵmod.js`, e);
}
i(zb, "ɵɵngDeclareNgModule");
function lt(e) {
  return Oe({ usage: 1, kind: "pipe", type: e.type }).compilePipeDeclaration(Qe, `ng:///${e.type.name}/ɵpipe.js`, e);
}
i(lt, "ɵɵngDeclarePipe");
function Jk(e, t) {
  St("NgSignals");
  const n = Xm(e);
  return t?.equal && (n[pt].equal = t.equal), ngDevMode && (n.toString = () => `[Computed: ${n()}]`), n;
}
i(Jk, "computed");
function gd(e) {
  const t = B(null);
  try {
    return e();
  } finally {
    B(t);
  }
}
i(gd, "untracked");
const Xk = new $("", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => M(Dc), "factory")
});
class Dc {
  static {
    i(this, "EffectScheduler");
  }
  static {
    this.ɵprov = ne({
      token: Dc,
      providedIn: "root",
      factory: /* @__PURE__ */ i(() => new eR(), "factory")
    });
  }
}
class eR {
  static {
    i(this, "ZoneAwareEffectScheduler");
  }
  constructor() {
    this.queuedEffectCount = 0, this.queues = /* @__PURE__ */ new Map(), this.pendingTasks = M(xt), this.taskId = null;
  }
  scheduleEffect(t) {
    if (this.enqueue(t), this.taskId === null) {
      const n = this.taskId = this.pendingTasks.add();
      queueMicrotask(() => {
        this.flush(), this.pendingTasks.remove(n), this.taskId = null;
      });
    }
  }
  enqueue(t) {
    const n = t.creationZone;
    this.queues.has(n) || this.queues.set(n, /* @__PURE__ */ new Set());
    const r = this.queues.get(n);
    r.has(t) || (this.queuedEffectCount++, r.add(t));
  }
  /**
   * Run all scheduled effects.
   *
   * Execution order of effects within the same zone is guaranteed to be FIFO, but there is no
   * ordering guarantee between effects scheduled in different zones.
   */
  flush() {
    for (; this.queuedEffectCount > 0; )
      for (const [t, n] of this.queues)
        t === null ? this.flushQueue(n) : t.run(() => this.flushQueue(n));
  }
  flushQueue(t) {
    for (const n of t)
      t.delete(n), this.queuedEffectCount--, n.run();
  }
}
class tR {
  static {
    i(this, "EffectHandle");
  }
  constructor(t, n, r, o, s, a) {
    this.scheduler = t, this.effectFn = n, this.creationZone = r, this.injector = s, this.watcher = Dw((u) => this.runEffect(u), () => this.schedule(), a), this.unregisterOnDestroy = o?.onDestroy(() => this.destroy());
  }
  runEffect(t) {
    try {
      this.effectFn(t);
    } catch (n) {
      this.injector.get(_n, null, { optional: !0 })?.handleError(n);
    }
  }
  run() {
    this.watcher.run();
  }
  schedule() {
    this.scheduler.scheduleEffect(this);
  }
  destroy() {
    this.watcher.destroy(), this.unregisterOnDestroy?.();
  }
}
function md(e, t) {
  St("NgSignals"), ngDevMode && Bf(md, "Call `effect` outside of a reactive context. For example, schedule the effect inside the component constructor."), !t?.injector && Ye(md);
  const n = t?.injector ?? M(xe), r = t?.manualCleanup !== !0 ? n.get(Hr) : null, o = new tR(n.get(Xk), e, typeof Zone > "u" ? null : Zone.current, r, n, t?.allowSignalWrites ?? !1), s = n.get(ci, null, { optional: !0 });
  return !s || !(s._lView[S] & 8) ? o.watcher.notify() : (s._lView[fa] ??= []).push(o.watcher.notify), o;
}
i(md, "effect");
function nR(e, t) {
  ngDevMode && kv(e);
  const n = U(e), r = t.elementInjector || Iu();
  return new Yo(n).create(r, t.projectableNodes, t.hostElement, t.environmentInjector);
}
i(nR, "createComponent");
function rR(e) {
  const t = U(e);
  if (!t)
    return null;
  const n = new Yo(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    }
  };
}
i(rR, "reflectComponentType");
function oR(...e) {
  return e.reduce((t, n) => Object.assign(t, n, { providers: [...t.providers, ...n.providers] }), { providers: [] });
}
i(oR, "mergeApplicationConfig");
typeof ngDevMode < "u" && ngDevMode && (pe.$localize ??= function() {
  throw new Error("It looks like your application or one of its dependencies is using i18n.\nAngular 9 introduced a global `$localize()` function that needs to be loaded.\nPlease run `ng add @angular/localize` from the Angular CLI.\n(For non-CLI projects, add `import '@angular/localize/init';` to your `polyfills.ts` file.\nFor server-side rendering applications add the import to your `main.server.ts` file.)");
});
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANIMATION_MODULE_TYPE: dS,
  APP_BOOTSTRAP_LISTENER: yp,
  APP_ID: tv,
  APP_INITIALIZER: lb,
  get AfterRenderPhase() {
    return fn;
  },
  ApplicationInitStatus: gn,
  ApplicationModule: Xi,
  ApplicationRef: ot,
  Attribute: nf,
  COMPILER_OPTIONS: vb,
  CSP_NONCE: fS,
  CUSTOM_ELEMENTS_SCHEMA: Tv,
  get ChangeDetectionStrategy() {
    return fr;
  },
  ChangeDetectorRef: ci,
  Compiler: ao,
  CompilerFactory: KN,
  Component: ib,
  ComponentFactory: Ba,
  ComponentFactoryResolver: Ns,
  ComponentRef: EI,
  ContentChild: w1,
  ContentChildren: b1,
  DEFAULT_CURRENCY_CODE: Dp,
  DebugElement: Hs,
  DebugEventListener: lk,
  DebugNode: Cp,
  DefaultIterableDiffer: Rb,
  DestroyRef: Hr,
  Directive: ut,
  ENVIRONMENT_INITIALIZER: dr,
  ElementRef: on,
  EmbeddedViewRef: ck,
  EnvironmentInjector: Lt,
  ErrorHandler: _n,
  EventEmitter: Ft,
  Host: fs,
  HostAttributeToken: P_,
  HostBinding: IN,
  HostListener: CN,
  INJECTOR: Fd,
  Inject: ht,
  get InjectFlags() {
    return G;
  },
  Injectable: he,
  InjectionToken: $,
  Injector: xe,
  Input: q,
  IterableDiffers: Ot,
  KeyValueDiffers: dt,
  LOCALE_ID: ze,
  get MissingTranslationStrategy() {
    return hd;
  },
  ModuleWithComponentFactories: Db,
  NO_ERRORS_SCHEMA: Av,
  NgModule: fp,
  NgModuleFactory: fC,
  NgModuleRef: Xn,
  NgProbeToken: ZN,
  NgZone: de,
  Optional: Kt,
  Output: vN,
  OutputEmitterRef: of,
  PACKAGE_ROOT_URL: lS,
  PLATFORM_ID: Es,
  PLATFORM_INITIALIZER: nv,
  Pipe: ct,
  PlatformRef: Rn,
  Query: ks,
  QueryList: Tu,
  Renderer2: Zo,
  RendererFactory2: bI,
  get RendererStyleFlags2() {
    return Eo;
  },
  Sanitizer: Ku,
  get SecurityContext() {
    return Jn;
  },
  Self: my,
  SimpleChange: Gy,
  SkipSelf: yu,
  TRANSLATIONS: ek,
  TRANSLATIONS_FORMAT: tk,
  TemplateRef: Ze,
  Testability: so,
  TestabilityRegistry: kn,
  TransferState: Vr,
  Type: Py,
  VERSION: EN,
  Version: hp,
  ViewChild: _1,
  ViewChildren: M1,
  ViewContainerRef: Fe,
  get ViewEncapsulation() {
    return yn;
  },
  ViewRef: Nb,
  afterNextRender: MI,
  afterRender: Zl,
  asNativeElements: dk,
  assertInInjectionContext: Ye,
  assertNotInReactiveContext: Bf,
  assertPlatform: Tb,
  booleanAttribute: Pn,
  computed: Jk,
  contentChild: KI,
  contentChildren: JI,
  createComponent: nR,
  createEnvironmentInjector: oh,
  createNgModule: rh,
  createNgModuleRef: z1,
  createPlatform: Mb,
  createPlatformFactory: _b,
  defineInjectable: Yw,
  destroyPlatform: nk,
  effect: md,
  enableProdMode: ik,
  forwardRef: fu,
  getDebugNode: Oo,
  getModuleFactory: sk,
  getNgModuleById: ak,
  getPlatform: yc,
  importProvidersFrom: Ay,
  inject: M,
  input: sf,
  isDevMode: ok,
  isSignal: Kf,
  isStandalone: Fn,
  makeEnvironmentProviders: ps,
  makeStateKey: hS,
  mergeApplicationConfig: oR,
  model: eh,
  numberAttribute: es,
  output: RD,
  platformCore: Mk,
  provideZoneChangeDetection: bb,
  reflectComponentType: rR,
  resolveForwardRef: x,
  runInInjectionContext: jd,
  setTestabilityGetter: cb,
  signal: UI,
  untracked: gd,
  viewChild: Xf,
  viewChildren: YI,
  ɵALLOW_MULTIPLE_PLATFORMS: Ip,
  ɵAfterRenderEventManager: vn,
  ɵCONTAINER_HEADER_OFFSET: me,
  ɵChangeDetectionScheduler: Yu,
  ɵComponentFactory: Ba,
  ɵConsole: Yt,
  ɵDEFAULT_LOCALE_ID: _r,
  ɵDEFER_BLOCK_CONFIG: TC,
  ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR: SC,
  get ɵDeferBlockBehavior() {
    return Ga;
  },
  get ɵDeferBlockState() {
    return ge;
  },
  ɵEffectScheduler: Dc,
  ɵIMAGE_CONFIG: lf,
  ɵIMAGE_CONFIG_DEFAULTS: cf,
  ɵINJECTOR_SCOPE: Ld,
  ɵINPUT_SIGNAL_BRAND_WRITE_TYPE: Uw,
  ɵIS_HYDRATION_DOM_REUSE_ENABLED: hi,
  ɵLContext: $D,
  ɵLifecycleHooksFeature: OI,
  get ɵLocaleDataIndex() {
    return ie;
  },
  ɵNG_COMP_DEF: Lo,
  ɵNG_DIR_DEF: gu,
  ɵNG_ELEMENT_ID: to,
  ɵNG_INJ_DEF: ba,
  ɵNG_MOD_DEF: Sd,
  ɵNG_PIPE_DEF: mu,
  ɵNG_PROV_DEF: Ri,
  ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR: ya,
  ɵNO_CHANGE: F,
  ɵNgModuleFactory: ec,
  ɵNoopNgZone: Vf,
  ɵPendingTasks: xt,
  ɵReflectionCapabilities: Ly,
  ɵRender3ComponentFactory: Yo,
  ɵRender3ComponentRef: AI,
  ɵRender3NgModuleRef: Xu,
  ɵRuntimeError: I,
  ɵSSR_CONTENT_INTEGRITY_MARKER: rv,
  ɵTESTABILITY: ub,
  ɵTESTABILITY_GETTER: pp,
  ɵUSE_RUNTIME_DEPS_TRACKER_FOR_JIT: KA,
  ɵViewRef: wo,
  ɵXSS_SECURITY_URL: jr,
  ɵ_sanitizeHtml: Iv,
  ɵ_sanitizeUrl: Fu,
  ɵallowSanitizationBypassAndThrow: qo,
  ɵannotateForHydration: zk,
  ɵbypassSanitizationTrustHtml: OS,
  ɵbypassSanitizationTrustResourceUrl: RS,
  ɵbypassSanitizationTrustScript: NS,
  ɵbypassSanitizationTrustStyle: FS,
  ɵbypassSanitizationTrustUrl: kS,
  ɵclearResolutionOfComponentResourcesQueue: rC,
  ɵcompileComponent: Z0,
  ɵcompileDirective: dp,
  ɵcompileNgModule: G0,
  ɵcompileNgModuleDefs: W0,
  ɵcompileNgModuleFactory: Ib,
  ɵcompilePipe: ob,
  ɵconvertToBitFlags: ls,
  ɵcreateInjector: Tl,
  ɵdefaultIterableDiffers: bk,
  ɵdefaultKeyValueDiffers: wk,
  ɵdepsTracker: Er,
  ɵdetectChangesInViewIfRequired: yb,
  ɵdevModeEqual: sh,
  ɵfindLocaleData: Ue,
  ɵflushModuleScopingQueueAsMuchAsPossible: U0,
  ɵformatRuntimeError: ye,
  ɵgenerateStandaloneInDeclarationsError: q0,
  ɵgetAsyncClassMetadataFn: W1,
  ɵgetDebugNode: Oo,
  ɵgetDeferBlocks: pd,
  ɵgetDirectives: JD,
  ɵgetEnsureDirtyViewsAreAlwaysReachable: Xy,
  ɵgetHostElement: XD,
  ɵgetInjectableDef: us,
  ɵgetLContext: rt,
  ɵgetLocaleCurrencyCode: ZO,
  ɵgetLocalePluralCase: _h,
  ɵgetOutputDestroyRef: B_,
  ɵgetSanitizationBypassType: hv,
  ɵgetUnknownElementStrictMode: cT,
  ɵgetUnknownPropertyStrictMode: dT,
  ɵglobal: pe,
  ɵinjectChangeDetectorRef: Fb,
  ɵinternalAfterNextRender: Ha,
  ɵinternalCreateApplication: Ok,
  ɵisBoundToModule: hb,
  ɵisComponentDefPendingResolution: T1,
  ɵisEnvironmentProviders: cs,
  ɵisInjectable: Kw,
  ɵisNgModule: sr,
  ɵisPromise: mc,
  ɵisSubscribable: mp,
  ɵnoSideEffects: tn,
  ɵpatchComponentDefWithScope: cp,
  ɵperformanceMarkFeature: St,
  ɵprovideZonelessChangeDetection: Fk,
  ɵqueueStateUpdate: Vb,
  ɵreadHydrationInfo: av,
  ɵregisterLocaleData: QO,
  ɵrenderDeferBlockState: hn,
  ɵresetCompiledComponents: cN,
  ɵresetJitOptions: sN,
  ɵresolveComponentResources: tC,
  ɵrestoreComponentResolutionQueue: A1,
  ɵsetAllowDuplicateNgModuleIdsForTest: R1,
  ɵsetAlternateWeakRefImpl: _k,
  ɵsetClassDebugInfo: V0,
  ɵsetClassMetadata: Xe,
  ɵsetClassMetadataAsync: q1,
  ɵsetCurrentInjector: dn,
  ɵsetDocument: uS,
  ɵsetEnsureDirtyViewsAreAlwaysReachable: KM,
  ɵsetInjectorProfilerContext: We,
  ɵsetLocaleId: Sh,
  ɵsetUnknownElementStrictMode: uT,
  ɵsetUnknownPropertyStrictMode: lT,
  ɵstore: e0,
  ɵstringify: Z,
  ɵtransitiveScopesFor: lp,
  ɵtriggerResourceLoading: oc,
  ɵtruncateMiddle: Ww,
  ɵunregisterLocaleData: YO,
  ɵunwrapSafeValue: sn,
  ɵunwrapWritableSignal: D1,
  ɵwhenStable: mb,
  ɵwithDomHydration: Pk,
  ɵwithI18nHydration: Lk,
  ɵɵCopyDefinitionFeature: uC,
  get ɵɵFactoryTarget() {
    return L;
  },
  ɵɵHostDirectivesFeature: cC,
  ɵɵInheritDefinitionFeature: nh,
  get ɵɵInputFlags() {
    return Dn;
  },
  ɵɵInputTransformsFeature: dC,
  ɵɵNgOnChangesFeature: zd,
  ɵɵProvidersFeature: g0,
  ɵɵStandaloneFeature: m0,
  ɵɵadvance: Yv,
  ɵɵattribute: ch,
  ɵɵattributeInterpolate1: lh,
  ɵɵattributeInterpolate2: dh,
  ɵɵattributeInterpolate3: fh,
  ɵɵattributeInterpolate4: hh,
  ɵɵattributeInterpolate5: ph,
  ɵɵattributeInterpolate6: gh,
  ɵɵattributeInterpolate7: mh,
  ɵɵattributeInterpolate8: yh,
  ɵɵattributeInterpolateV: Dh,
  ɵɵclassMap: XC,
  ɵɵclassMapInterpolate1: iE,
  ɵɵclassMapInterpolate2: sE,
  ɵɵclassMapInterpolate3: aE,
  ɵɵclassMapInterpolate4: uE,
  ɵɵclassMapInterpolate5: cE,
  ɵɵclassMapInterpolate6: lE,
  ɵɵclassMapInterpolate7: dE,
  ɵɵclassMapInterpolate8: fE,
  ɵɵclassMapInterpolateV: hE,
  ɵɵclassProp: Ch,
  ɵɵcomponentInstance: pE,
  ɵɵconditional: gE,
  ɵɵcontentQuery: qE,
  ɵɵcontentQuerySignal: KE,
  ɵɵdefer: OC,
  ɵɵdeferEnableTimerScheduling: AC,
  ɵɵdeferOnHover: $C,
  ɵɵdeferOnIdle: kC,
  ɵɵdeferOnImmediate: xC,
  ɵɵdeferOnInteraction: HC,
  ɵɵdeferOnTimer: LC,
  ɵɵdeferOnViewport: UC,
  ɵɵdeferPrefetchOnHover: BC,
  ɵɵdeferPrefetchOnIdle: RC,
  ɵɵdeferPrefetchOnImmediate: PC,
  ɵɵdeferPrefetchOnInteraction: VC,
  ɵɵdeferPrefetchOnTimer: jC,
  ɵɵdeferPrefetchOnViewport: zC,
  ɵɵdeferPrefetchWhen: NC,
  ɵɵdeferWhen: FC,
  ɵɵdefineComponent: wy,
  ɵɵdefineDirective: My,
  ɵɵdefineInjectable: ne,
  ɵɵdefineInjector: pu,
  ɵɵdefineNgModule: Rd,
  ɵɵdefinePipe: _y,
  ɵɵdirectiveInject: zr,
  ɵɵdisableBindings: iD,
  ɵɵelement: Eh,
  ɵɵelementContainer: bh,
  ɵɵelementContainerEnd: uc,
  ɵɵelementContainerStart: ac,
  ɵɵelementEnd: sc,
  ɵɵelementStart: ic,
  ɵɵenableBindings: oD,
  ɵɵgetComponentDepsFactory: H0,
  ɵɵgetCurrentView: EE,
  ɵɵgetInheritedFactory: AD,
  ɵɵhostProperty: wh,
  ɵɵi18n: BE,
  ɵɵi18nApply: VE,
  ɵɵi18nAttributes: HE,
  ɵɵi18nEnd: Ah,
  ɵɵi18nExp: Oh,
  ɵɵi18nPostprocess: UE,
  ɵɵi18nStart: Th,
  ɵɵinject: ke,
  ɵɵinjectAttribute: _u,
  ɵɵinvalidFactory: Jv,
  ɵɵinvalidFactoryDep: Od,
  ɵɵlistener: Fh,
  ɵɵloadQuery: YE,
  ɵɵnamespaceHTML: DD,
  ɵɵnamespaceMathML: yD,
  ɵɵnamespaceSVG: mD,
  ɵɵnextContext: zE,
  ɵɵngDeclareClassMetadata: H,
  ɵɵngDeclareComponent: Yk,
  ɵɵngDeclareDirective: It,
  ɵɵngDeclareFactory: V,
  ɵɵngDeclareInjectable: Ct,
  ɵɵngDeclareInjector: Ub,
  ɵɵngDeclareNgModule: zb,
  ɵɵngDeclarePipe: lt,
  ɵɵpipe: R0,
  ɵɵpipeBind1: x0,
  ɵɵpipeBind2: P0,
  ɵɵpipeBind3: L0,
  ɵɵpipeBind4: j0,
  ɵɵpipeBindV: $0,
  ɵɵprojection: WE,
  ɵɵprojectionDef: GE,
  ɵɵproperty: vh,
  ɵɵpropertyInterpolate: Rh,
  ɵɵpropertyInterpolate1: hc,
  ɵɵpropertyInterpolate2: xh,
  ɵɵpropertyInterpolate3: Ph,
  ɵɵpropertyInterpolate4: Lh,
  ɵɵpropertyInterpolate5: jh,
  ɵɵpropertyInterpolate6: $h,
  ɵɵpropertyInterpolate7: Bh,
  ɵɵpropertyInterpolate8: Hh,
  ɵɵpropertyInterpolateV: Vh,
  ɵɵpureFunction0: v0,
  ɵɵpureFunction1: I0,
  ɵɵpureFunction2: C0,
  ɵɵpureFunction3: E0,
  ɵɵpureFunction4: b0,
  ɵɵpureFunction5: w0,
  ɵɵpureFunction6: M0,
  ɵɵpureFunction7: _0,
  ɵɵpureFunction8: S0,
  ɵɵpureFunctionV: T0,
  ɵɵqueryAdvance: XE,
  ɵɵqueryRefresh: ZE,
  ɵɵreference: t0,
  ɵɵregisterNgModuleType: th,
  ɵɵrepeater: vE,
  ɵɵrepeaterCreate: DE,
  ɵɵrepeaterTrackByIdentity: yE,
  ɵɵrepeaterTrackByIndex: mE,
  ɵɵresetView: aD,
  ɵɵresolveBody: wf,
  ɵɵresolveDocument: Nv,
  ɵɵresolveWindow: Fv,
  ɵɵrestoreView: sD,
  ɵɵsanitizeHtml: Cv,
  ɵɵsanitizeResourceUrl: If,
  ɵɵsanitizeScript: bv,
  ɵɵsanitizeStyle: Ev,
  ɵɵsanitizeUrl: vf,
  ɵɵsanitizeUrlOrResourceUrl: _v,
  ɵɵsetComponentScope: y0,
  ɵɵsetNgModuleScope: D0,
  ɵɵstyleMap: Ht,
  ɵɵstyleMapInterpolate1: n0,
  ɵɵstyleMapInterpolate2: r0,
  ɵɵstyleMapInterpolate3: o0,
  ɵɵstyleMapInterpolate4: i0,
  ɵɵstyleMapInterpolate5: s0,
  ɵɵstyleMapInterpolate6: a0,
  ɵɵstyleMapInterpolate7: u0,
  ɵɵstyleMapInterpolate8: c0,
  ɵɵstyleMapInterpolateV: l0,
  ɵɵstyleProp: Ih,
  ɵɵstylePropInterpolate1: Uh,
  ɵɵstylePropInterpolate2: zh,
  ɵɵstylePropInterpolate3: Gh,
  ɵɵstylePropInterpolate4: Wh,
  ɵɵstylePropInterpolate5: qh,
  ɵɵstylePropInterpolate6: Qh,
  ɵɵstylePropInterpolate7: Zh,
  ɵɵstylePropInterpolate8: Yh,
  ɵɵstylePropInterpolateV: Kh,
  ɵɵsyntheticHostListener: Nh,
  ɵɵsyntheticHostProperty: Mh,
  ɵɵtemplate: So,
  ɵɵtemplateRefExtractor: B0,
  ɵɵtext: d0,
  ɵɵtextInterpolate: Jh,
  ɵɵtextInterpolate1: pc,
  ɵɵtextInterpolate2: Xh,
  ɵɵtextInterpolate3: ep,
  ɵɵtextInterpolate4: tp,
  ɵɵtextInterpolate5: np,
  ɵɵtextInterpolate6: rp,
  ɵɵtextInterpolate7: op,
  ɵɵtextInterpolate8: ip,
  ɵɵtextInterpolateV: sp,
  ɵɵtrustConstantHtml: wv,
  ɵɵtrustConstantResourceUrl: Mv,
  ɵɵtwoWayBindingSet: h0,
  ɵɵtwoWayListener: up,
  ɵɵtwoWayProperty: ap,
  ɵɵvalidateIframeAttribute: sC,
  ɵɵviewQuery: QE,
  ɵɵviewQuerySignal: JE
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license Angular v17.3.12
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
let iR = null;
function Qc() {
  return iR;
}
i(Qc, "getDOM");
class nu {
  static {
    i(this, "PlatformNavigation");
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: nu, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: nu, providedIn: "platform", useFactory: /* @__PURE__ */ i(() => window.navigation, "useFactory") });
  }
}
H({ type: nu, decorators: [{
  type: he,
  args: [{ providedIn: "platform", useFactory: /* @__PURE__ */ i(() => window.navigation, "useFactory") }]
}] });
const li = new $(ngDevMode ? "DocumentToken" : "");
class In {
  static {
    i(this, "PlatformLocation");
  }
  historyGo(t) {
    throw new Error(ngDevMode ? "Not implemented" : "");
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: In, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: In, providedIn: "platform", useFactory: /* @__PURE__ */ i(() => M(Ln), "useFactory") });
  }
}
H({ type: In, decorators: [{
  type: he,
  args: [{ providedIn: "platform", useFactory: /* @__PURE__ */ i(() => M(Ln), "useFactory") }]
}] });
new $(ngDevMode ? "Location Initialized" : "");
class Ln extends In {
  static {
    i(this, "BrowserPlatformLocation");
  }
  constructor() {
    super(), this._doc = M(li), this._location = window.location, this._history = window.history;
  }
  getBaseHrefFromDOM() {
    return Qc().getBaseHref(this._doc);
  }
  onPopState(t) {
    const n = Qc().getGlobalEventTarget(this._doc, "window");
    return n.addEventListener("popstate", t, !1), () => n.removeEventListener("popstate", t);
  }
  onHashChange(t) {
    const n = Qc().getGlobalEventTarget(this._doc, "window");
    return n.addEventListener("hashchange", t, !1), () => n.removeEventListener("hashchange", t);
  }
  get href() {
    return this._location.href;
  }
  get protocol() {
    return this._location.protocol;
  }
  get hostname() {
    return this._location.hostname;
  }
  get port() {
    return this._location.port;
  }
  get pathname() {
    return this._location.pathname;
  }
  get search() {
    return this._location.search;
  }
  get hash() {
    return this._location.hash;
  }
  set pathname(t) {
    this._location.pathname = t;
  }
  pushState(t, n, r) {
    this._history.pushState(t, n, r);
  }
  replaceState(t, n, r) {
    this._history.replaceState(t, n, r);
  }
  forward() {
    this._history.forward();
  }
  back() {
    this._history.back();
  }
  historyGo(t = 0) {
    this._history.go(t);
  }
  getState() {
    return this._history.state;
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Ln, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Ln, providedIn: "platform", useFactory: /* @__PURE__ */ i(() => new Ln(), "useFactory") });
  }
}
H({ type: Ln, decorators: [{
  type: he,
  args: [{
    providedIn: "platform",
    useFactory: /* @__PURE__ */ i(() => new Ln(), "useFactory")
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [], "ctorParameters") });
function bp(e, t) {
  if (e.length == 0)
    return t;
  if (t.length == 0)
    return e;
  let n = 0;
  return e.endsWith("/") && n++, t.startsWith("/") && n++, n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t;
}
i(bp, "joinWithSlash");
function Cm(e) {
  const t = e.match(/#|\?|$/), n = t && t.index || e.length, r = n - (e[n - 1] === "/" ? 1 : 0);
  return e.slice(0, r) + e.slice(n);
}
i(Cm, "stripTrailingSlash");
function pn(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
i(pn, "normalizeQueryParams");
class Cn {
  static {
    i(this, "LocationStrategy");
  }
  historyGo(t) {
    throw new Error(ngDevMode ? "Not implemented" : "");
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Cn, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Cn, providedIn: "root", useFactory: /* @__PURE__ */ i(() => M(Fo), "useFactory") });
  }
}
H({ type: Cn, decorators: [{
  type: he,
  args: [{ providedIn: "root", useFactory: /* @__PURE__ */ i(() => M(Fo), "useFactory") }]
}] });
const vc = new $(ngDevMode ? "appBaseHref" : "");
class Fo extends Cn {
  static {
    i(this, "PathLocationStrategy");
  }
  constructor(t, n) {
    super(), this._platformLocation = t, this._removeListenerFns = [], this._baseHref = n ?? this._platformLocation.getBaseHrefFromDOM() ?? M(li).location?.origin ?? "";
  }
  /** @nodoc */
  ngOnDestroy() {
    for (; this._removeListenerFns.length; )
      this._removeListenerFns.pop()();
  }
  onPopState(t) {
    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t));
  }
  getBaseHref() {
    return this._baseHref;
  }
  prepareExternalUrl(t) {
    return bp(this._baseHref, t);
  }
  path(t = !1) {
    const n = this._platformLocation.pathname + pn(this._platformLocation.search), r = this._platformLocation.hash;
    return r && t ? `${n}${r}` : n;
  }
  pushState(t, n, r, o) {
    const s = this.prepareExternalUrl(r + pn(o));
    this._platformLocation.pushState(t, n, s);
  }
  replaceState(t, n, r, o) {
    const s = this.prepareExternalUrl(r + pn(o));
    this._platformLocation.replaceState(t, n, s);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(t = 0) {
    this._platformLocation.historyGo?.(t);
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Fo, deps: [{ token: In }, { token: vc, optional: !0 }], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Fo, providedIn: "root" });
  }
}
H({ type: Fo, decorators: [{
  type: he,
  args: [{ providedIn: "root" }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: In }, { type: void 0, decorators: [{
  type: Kt
}, {
  type: ht,
  args: [vc]
}] }], "ctorParameters") });
class ru extends Cn {
  static {
    i(this, "HashLocationStrategy");
  }
  constructor(t, n) {
    super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], n != null && (this._baseHref = n);
  }
  /** @nodoc */
  ngOnDestroy() {
    for (; this._removeListenerFns.length; )
      this._removeListenerFns.pop()();
  }
  onPopState(t) {
    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t));
  }
  getBaseHref() {
    return this._baseHref;
  }
  path(t = !1) {
    const n = this._platformLocation.hash ?? "#";
    return n.length > 0 ? n.substring(1) : n;
  }
  prepareExternalUrl(t) {
    const n = bp(this._baseHref, t);
    return n.length > 0 ? "#" + n : n;
  }
  pushState(t, n, r, o) {
    let s = this.prepareExternalUrl(r + pn(o));
    s.length == 0 && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, n, s);
  }
  replaceState(t, n, r, o) {
    let s = this.prepareExternalUrl(r + pn(o));
    s.length == 0 && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, n, s);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(t = 0) {
    this._platformLocation.historyGo?.(t);
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: ru, deps: [{ token: In }, { token: vc, optional: !0 }], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: ru });
  }
}
H({ type: ru, decorators: [{
  type: he
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: In }, { type: void 0, decorators: [{
  type: Kt
}, {
  type: ht,
  args: [vc]
}] }], "ctorParameters") });
class ho {
  static {
    i(this, "Location");
  }
  constructor(t) {
    this._subject = new Ft(), this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = t;
    const n = this._locationStrategy.getBaseHref();
    this._basePath = aR(Cm(Em(n))), this._locationStrategy.onPopState((r) => {
      this._subject.emit({
        url: this.path(!0),
        pop: !0,
        state: r.state,
        type: r.type
      });
    });
  }
  /** @nodoc */
  ngOnDestroy() {
    this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = [];
  }
  /**
   * Normalizes the URL path for this location.
   *
   * @param includeHash True to include an anchor fragment in the path.
   *
   * @returns The normalized URL path.
   */
  // TODO: vsavkin. Remove the boolean flag and always include hash once the deprecated router is
  // removed.
  path(t = !1) {
    return this.normalize(this._locationStrategy.path(t));
  }
  /**
   * Reports the current state of the location history.
   * @returns The current value of the `history.state` object.
   */
  getState() {
    return this._locationStrategy.getState();
  }
  /**
   * Normalizes the given path and compares to the current normalized path.
   *
   * @param path The given URL path.
   * @param query Query parameters.
   *
   * @returns True if the given URL path is equal to the current normalized path, false
   * otherwise.
   */
  isCurrentPathEqualTo(t, n = "") {
    return this.path() == this.normalize(t + pn(n));
  }
  /**
   * Normalizes a URL path by stripping any trailing slashes.
   *
   * @param url String representing a URL.
   *
   * @returns The normalized URL string.
   */
  normalize(t) {
    return ho.stripTrailingSlash(sR(this._basePath, Em(t)));
  }
  /**
   * Normalizes an external URL path.
   * If the given URL doesn't begin with a leading slash (`'/'`), adds one
   * before normalizing. Adds a hash if `HashLocationStrategy` is
   * in use, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
   *
   * @param url String representing a URL.
   *
   * @returns  A normalized platform-specific URL.
   */
  prepareExternalUrl(t) {
    return t && t[0] !== "/" && (t = "/" + t), this._locationStrategy.prepareExternalUrl(t);
  }
  // TODO: rename this method to pushState
  /**
   * Changes the browser's URL to a normalized version of a given URL, and pushes a
   * new item onto the platform's history.
   *
   * @param path  URL path to normalize.
   * @param query Query parameters.
   * @param state Location history state.
   *
   */
  go(t, n = "", r = null) {
    this._locationStrategy.pushState(r, "", t, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + pn(n)), r);
  }
  /**
   * Changes the browser's URL to a normalized version of the given URL, and replaces
   * the top item on the platform's history stack.
   *
   * @param path  URL path to normalize.
   * @param query Query parameters.
   * @param state Location history state.
   */
  replaceState(t, n = "", r = null) {
    this._locationStrategy.replaceState(r, "", t, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + pn(n)), r);
  }
  /**
   * Navigates forward in the platform's history.
   */
  forward() {
    this._locationStrategy.forward();
  }
  /**
   * Navigates back in the platform's history.
   */
  back() {
    this._locationStrategy.back();
  }
  /**
   * Navigate to a specific page from session history, identified by its relative position to the
   * current page.
   *
   * @param relativePosition  Position of the target page in the history relative to the current
   *     page.
   * A negative value moves backwards, a positive value moves forwards, e.g. `location.historyGo(2)`
   * moves forward two pages and `location.historyGo(-2)` moves back two pages. When we try to go
   * beyond what's stored in the history session, we stay in the current page. Same behaviour occurs
   * when `relativePosition` equals 0.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/History_API#Moving_to_a_specific_point_in_history
   */
  historyGo(t = 0) {
    this._locationStrategy.historyGo?.(t);
  }
  /**
   * Registers a URL change listener. Use to catch updates performed by the Angular
   * framework that are not detectible through "popstate" or "hashchange" events.
   *
   * @param fn The change handler function, which take a URL and a location history state.
   * @returns A function that, when executed, unregisters a URL change listener.
   */
  onUrlChange(t) {
    return this._urlChangeListeners.push(t), this._urlChangeSubscription ??= this.subscribe((n) => {
      this._notifyUrlChangeListeners(n.url, n.state);
    }), () => {
      const n = this._urlChangeListeners.indexOf(t);
      this._urlChangeListeners.splice(n, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null);
    };
  }
  /** @internal */
  _notifyUrlChangeListeners(t = "", n) {
    this._urlChangeListeners.forEach((r) => r(t, n));
  }
  /**
   * Subscribes to the platform's `popState` events.
   *
   * Note: `Location.go()` does not trigger the `popState` event in the browser. Use
   * `Location.onUrlChange()` to subscribe to URL changes instead.
   *
   * @param value Event that is triggered when the state history changes.
   * @param exception The exception to throw.
   *
   * @see [onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)
   *
   * @returns Subscribed events.
   */
  subscribe(t, n, r) {
    return this._subject.subscribe({ next: t, error: n, complete: r });
  }
  static {
    this.normalizeQueryParams = pn;
  }
  static {
    this.joinWithSlash = bp;
  }
  static {
    this.stripTrailingSlash = Cm;
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: ho, deps: [{ token: Cn }], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: ho, providedIn: "root", useFactory: Gb });
  }
}
H({ type: ho, decorators: [{
  type: he,
  args: [{
    providedIn: "root",
    // See #23917
    useFactory: Gb
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: Cn }], "ctorParameters") });
function Gb() {
  return new ho(ke(Cn));
}
i(Gb, "createLocation");
function sR(e, t) {
  if (!e || !t.startsWith(e))
    return t;
  const n = t.substring(e.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
}
i(sR, "_stripBasePath");
function Em(e) {
  return e.replace(/\/index.html$/, "");
}
i(Em, "_stripIndexHtml");
function aR(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    const [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
i(aR, "_stripOrigin");
const Wb = { ADP: [void 0, void 0, 0], AFN: [void 0, "؋", 0], ALL: [void 0, void 0, 0], AMD: [void 0, "֏", 2], AOA: [void 0, "Kz"], ARS: [void 0, "$"], AUD: ["A$", "$"], AZN: [void 0, "₼"], BAM: [void 0, "KM"], BBD: [void 0, "$"], BDT: [void 0, "৳"], BHD: [void 0, void 0, 3], BIF: [void 0, void 0, 0], BMD: [void 0, "$"], BND: [void 0, "$"], BOB: [void 0, "Bs"], BRL: ["R$"], BSD: [void 0, "$"], BWP: [void 0, "P"], BYN: [void 0, void 0, 2], BYR: [void 0, void 0, 0], BZD: [void 0, "$"], CAD: ["CA$", "$", 2], CHF: [void 0, void 0, 2], CLF: [void 0, void 0, 4], CLP: [void 0, "$", 0], CNY: ["CN¥", "¥"], COP: [void 0, "$", 2], CRC: [void 0, "₡", 2], CUC: [void 0, "$"], CUP: [void 0, "$"], CZK: [void 0, "Kč", 2], DJF: [void 0, void 0, 0], DKK: [void 0, "kr", 2], DOP: [void 0, "$"], EGP: [void 0, "E£"], ESP: [void 0, "₧", 0], EUR: ["€"], FJD: [void 0, "$"], FKP: [void 0, "£"], GBP: ["£"], GEL: [void 0, "₾"], GHS: [void 0, "GH₵"], GIP: [void 0, "£"], GNF: [void 0, "FG", 0], GTQ: [void 0, "Q"], GYD: [void 0, "$", 2], HKD: ["HK$", "$"], HNL: [void 0, "L"], HRK: [void 0, "kn"], HUF: [void 0, "Ft", 2], IDR: [void 0, "Rp", 2], ILS: ["₪"], INR: ["₹"], IQD: [void 0, void 0, 0], IRR: [void 0, void 0, 0], ISK: [void 0, "kr", 0], ITL: [void 0, void 0, 0], JMD: [void 0, "$"], JOD: [void 0, void 0, 3], JPY: ["¥", void 0, 0], KHR: [void 0, "៛"], KMF: [void 0, "CF", 0], KPW: [void 0, "₩", 0], KRW: ["₩", void 0, 0], KWD: [void 0, void 0, 3], KYD: [void 0, "$"], KZT: [void 0, "₸"], LAK: [void 0, "₭", 0], LBP: [void 0, "L£", 0], LKR: [void 0, "Rs"], LRD: [void 0, "$"], LTL: [void 0, "Lt"], LUF: [void 0, void 0, 0], LVL: [void 0, "Ls"], LYD: [void 0, void 0, 3], MGA: [void 0, "Ar", 0], MGF: [void 0, void 0, 0], MMK: [void 0, "K", 0], MNT: [void 0, "₮", 2], MRO: [void 0, void 0, 0], MUR: [void 0, "Rs", 2], MXN: ["MX$", "$"], MYR: [void 0, "RM"], NAD: [void 0, "$"], NGN: [void 0, "₦"], NIO: [void 0, "C$"], NOK: [void 0, "kr", 2], NPR: [void 0, "Rs"], NZD: ["NZ$", "$"], OMR: [void 0, void 0, 3], PHP: ["₱"], PKR: [void 0, "Rs", 2], PLN: [void 0, "zł"], PYG: [void 0, "₲", 0], RON: [void 0, "lei"], RSD: [void 0, void 0, 0], RUB: [void 0, "₽"], RWF: [void 0, "RF", 0], SBD: [void 0, "$"], SEK: [void 0, "kr", 2], SGD: [void 0, "$"], SHP: [void 0, "£"], SLE: [void 0, void 0, 2], SLL: [void 0, void 0, 0], SOS: [void 0, void 0, 0], SRD: [void 0, "$"], SSP: [void 0, "£"], STD: [void 0, void 0, 0], STN: [void 0, "Db"], SYP: [void 0, "£", 0], THB: [void 0, "฿"], TMM: [void 0, void 0, 0], TND: [void 0, void 0, 3], TOP: [void 0, "T$"], TRL: [void 0, void 0, 0], TRY: [void 0, "₺"], TTD: [void 0, "$"], TWD: ["NT$", "$", 2], TZS: [void 0, void 0, 2], UAH: [void 0, "₴"], UGX: [void 0, void 0, 0], USD: ["$"], UYI: [void 0, void 0, 0], UYU: [void 0, "$"], UYW: [void 0, void 0, 4], UZS: [void 0, void 0, 2], VEF: [void 0, "Bs", 2], VND: ["₫", void 0, 0], VUV: [void 0, void 0, 0], XAF: ["FCFA", void 0, 0], XCD: ["EC$", "$"], XOF: ["F CFA", void 0, 0], XPF: ["CFPF", void 0, 0], XXX: ["¤"], YER: [void 0, void 0, 0], ZAR: [void 0, "R"], ZMK: [void 0, void 0, 0], ZMW: [void 0, "ZK"], ZWD: [void 0, void 0, 0] };
var ts;
(function(e) {
  e[e.Decimal = 0] = "Decimal", e[e.Percent = 1] = "Percent", e[e.Currency = 2] = "Currency", e[e.Scientific = 3] = "Scientific";
})(ts || (ts = {}));
var ur;
(function(e) {
  e[e.Zero = 0] = "Zero", e[e.One = 1] = "One", e[e.Two = 2] = "Two", e[e.Few = 3] = "Few", e[e.Many = 4] = "Many", e[e.Other = 5] = "Other";
})(ur || (ur = {}));
var Pe;
(function(e) {
  e[e.Format = 0] = "Format", e[e.Standalone = 1] = "Standalone";
})(Pe || (Pe = {}));
var re;
(function(e) {
  e[e.Narrow = 0] = "Narrow", e[e.Abbreviated = 1] = "Abbreviated", e[e.Wide = 2] = "Wide", e[e.Short = 3] = "Short";
})(re || (re = {}));
var et;
(function(e) {
  e[e.Short = 0] = "Short", e[e.Medium = 1] = "Medium", e[e.Long = 2] = "Long", e[e.Full = 3] = "Full";
})(et || (et = {}));
const _e = {
  /**
   * Decimal separator.
   * For `en-US`, the dot character.
   * Example: 2,345`.`67
   */
  Decimal: 0,
  /**
   * Grouping separator, typically for thousands.
   * For `en-US`, the comma character.
   * Example: 2`,`345.67
   */
  Group: 1,
  /**
   * Sign for percentage (out of 100).
   * Example: 23.4%
   */
  PercentSign: 3,
  /**
   * Sign for negative numbers.
   * Example: -23
   */
  MinusSign: 5,
  /**
   * Computer notation for exponential value (n times a power of 10).
   * Example: 1.2E3
   */
  Exponential: 6,
  /**
   * Infinity, can be used with plus and minus.
   * Example: ∞, +∞, -∞
   */
  Infinity: 9,
  /**
   * Decimal separator for currency values (fallback to `Decimal`).
   * Example: $2,345.67
   */
  CurrencyDecimal: 12,
  /**
   * Group separator for currency values (fallback to `Group`).
   * Example: $2,345.67
   */
  CurrencyGroup: 13
};
var bm;
(function(e) {
  e[e.Sunday = 0] = "Sunday", e[e.Monday = 1] = "Monday", e[e.Tuesday = 2] = "Tuesday", e[e.Wednesday = 3] = "Wednesday", e[e.Thursday = 4] = "Thursday", e[e.Friday = 5] = "Friday", e[e.Saturday = 6] = "Saturday";
})(bm || (bm = {}));
function uR(e) {
  return Ue(e)[ie.LocaleId];
}
i(uR, "getLocaleId");
function cR(e, t, n) {
  const r = Ue(e), o = [
    r[ie.DayPeriodsFormat],
    r[ie.DayPeriodsStandalone]
  ], s = _t(o, t);
  return _t(s, n);
}
i(cR, "getLocaleDayPeriods");
function lR(e, t, n) {
  const r = Ue(e), o = [
    r[ie.DaysFormat],
    r[ie.DaysStandalone]
  ], s = _t(o, t);
  return _t(s, n);
}
i(lR, "getLocaleDayNames");
function dR(e, t, n) {
  const r = Ue(e), o = [
    r[ie.MonthsFormat],
    r[ie.MonthsStandalone]
  ], s = _t(o, t);
  return _t(s, n);
}
i(dR, "getLocaleMonthNames");
function fR(e, t) {
  const r = Ue(e)[ie.Eras];
  return _t(r, t);
}
i(fR, "getLocaleEraNames");
function Xs(e, t) {
  const n = Ue(e);
  return _t(n[ie.DateFormat], t);
}
i(Xs, "getLocaleDateFormat");
function ea(e, t) {
  const n = Ue(e);
  return _t(n[ie.TimeFormat], t);
}
i(ea, "getLocaleTimeFormat");
function ta(e, t) {
  const r = Ue(e)[ie.DateTimeFormat];
  return _t(r, t);
}
i(ta, "getLocaleDateTimeFormat");
function Et(e, t) {
  const n = Ue(e), r = n[ie.NumberSymbols][t];
  if (typeof r > "u") {
    if (t === _e.CurrencyDecimal)
      return n[ie.NumberSymbols][_e.Decimal];
    if (t === _e.CurrencyGroup)
      return n[ie.NumberSymbols][_e.Group];
  }
  return r;
}
i(Et, "getLocaleNumberSymbol");
function wp(e, t) {
  return Ue(e)[ie.NumberFormats][t];
}
i(wp, "getLocaleNumberFormat");
function hR(e) {
  return Ue(e)[ie.Currencies];
}
i(hR, "getLocaleCurrencies");
const pR = _h;
function qb(e) {
  if (!e[ie.ExtraData])
    throw new Error(`Missing extra locale data for the locale "${e[ie.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`);
}
i(qb, "checkFullData");
function gR(e) {
  const t = Ue(e);
  return qb(t), (t[ie.ExtraData][
    2
    /* ɵExtraLocaleDataIndex.ExtraDayPeriodsRules */
  ] || []).map((r) => typeof r == "string" ? Zc(r) : [Zc(r[0]), Zc(r[1])]);
}
i(gR, "getLocaleExtraDayPeriodRules");
function mR(e, t, n) {
  const r = Ue(e);
  qb(r);
  const o = [
    r[ie.ExtraData][
      0
      /* ɵExtraLocaleDataIndex.ExtraDayPeriodFormats */
    ],
    r[ie.ExtraData][
      1
      /* ɵExtraLocaleDataIndex.ExtraDayPeriodStandalone */
    ]
  ], s = _t(o, t) || [];
  return _t(s, n) || [];
}
i(mR, "getLocaleExtraDayPeriods");
function _t(e, t) {
  for (let n = t; n > -1; n--)
    if (typeof e[n] < "u")
      return e[n];
  throw new Error("Locale data API: locale data undefined");
}
i(_t, "getLastDefinedValue");
function Zc(e) {
  const [t, n] = e.split(":");
  return { hours: +t, minutes: +n };
}
i(Zc, "extractTime");
function yR(e, t, n = "en") {
  const r = hR(n)[e] || Wb[e] || [], o = r[
    1
    /* ɵCurrencyIndex.SymbolNarrow */
  ];
  return t === "narrow" && typeof o == "string" ? o : r[
    0
    /* ɵCurrencyIndex.Symbol */
  ] || e;
}
i(yR, "getCurrencySymbol");
const DR = 2;
function vR(e) {
  let t;
  const n = Wb[e];
  return n && (t = n[
    2
    /* ɵCurrencyIndex.NbOfDigits */
  ]), typeof t == "number" ? t : DR;
}
i(vR, "getNumberOfCurrencyDigits");
const IR = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/, na = {}, CR = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
var Qt;
(function(e) {
  e[e.Short = 0] = "Short", e[e.ShortGMT = 1] = "ShortGMT", e[e.Long = 2] = "Long", e[e.Extended = 3] = "Extended";
})(Qt || (Qt = {}));
var K;
(function(e) {
  e[e.FullYear = 0] = "FullYear", e[e.Month = 1] = "Month", e[e.Date = 2] = "Date", e[e.Hours = 3] = "Hours", e[e.Minutes = 4] = "Minutes", e[e.Seconds = 5] = "Seconds", e[e.FractionalSeconds = 6] = "FractionalSeconds", e[e.Day = 7] = "Day";
})(K || (K = {}));
var Y;
(function(e) {
  e[e.DayPeriods = 0] = "DayPeriods", e[e.Days = 1] = "Days", e[e.Months = 2] = "Months", e[e.Eras = 3] = "Eras";
})(Y || (Y = {}));
function ER(e, t, n, r) {
  let o = FR(e);
  t = ln(n, t) || t;
  let a = [], u;
  for (; t; )
    if (u = CR.exec(t), u) {
      a = a.concat(u.slice(1));
      const d = a.pop();
      if (!d)
        break;
      t = d;
    } else {
      a.push(t);
      break;
    }
  let c = o.getTimezoneOffset();
  r && (c = Zb(r, c), o = OR(o, r));
  let l = "";
  return a.forEach((d) => {
    const f = TR(d);
    l += f ? f(o, n, c) : d === "''" ? "'" : d.replace(/(^'|'$)/g, "").replace(/''/g, "'");
  }), l;
}
i(ER, "formatDate");
function ou(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r;
}
i(ou, "createDate");
function ln(e, t) {
  const n = uR(e);
  if (na[n] ??= {}, na[n][t])
    return na[n][t];
  let r = "";
  switch (t) {
    case "shortDate":
      r = Xs(e, et.Short);
      break;
    case "mediumDate":
      r = Xs(e, et.Medium);
      break;
    case "longDate":
      r = Xs(e, et.Long);
      break;
    case "fullDate":
      r = Xs(e, et.Full);
      break;
    case "shortTime":
      r = ea(e, et.Short);
      break;
    case "mediumTime":
      r = ea(e, et.Medium);
      break;
    case "longTime":
      r = ea(e, et.Long);
      break;
    case "fullTime":
      r = ea(e, et.Full);
      break;
    case "short":
      const o = ln(e, "shortTime"), s = ln(e, "shortDate");
      r = ra(ta(e, et.Short), [
        o,
        s
      ]);
      break;
    case "medium":
      const a = ln(e, "mediumTime"), u = ln(e, "mediumDate");
      r = ra(ta(e, et.Medium), [
        a,
        u
      ]);
      break;
    case "long":
      const c = ln(e, "longTime"), l = ln(e, "longDate");
      r = ra(ta(e, et.Long), [
        c,
        l
      ]);
      break;
    case "full":
      const d = ln(e, "fullTime"), f = ln(e, "fullDate");
      r = ra(ta(e, et.Full), [
        d,
        f
      ]);
      break;
  }
  return r && (na[n][t] = r), r;
}
i(ln, "getNamedFormat");
function ra(e, t) {
  return t && (e = e.replace(/\{([^}]+)}/g, function(n, r) {
    return t != null && r in t ? t[r] : n;
  })), e;
}
i(ra, "formatDateTime");
function At(e, t, n = "-", r, o) {
  let s = "";
  (e < 0 || o && e <= 0) && (o ? e = -e + 1 : (e = -e, s = n));
  let a = String(e);
  for (; a.length < t; )
    a = "0" + a;
  return r && (a = a.slice(a.length - t)), s + a;
}
i(At, "padNumber");
function bR(e, t) {
  return At(e, 3).substring(0, t);
}
i(bR, "formatFractionalSeconds");
function Me(e, t, n = 0, r = !1, o = !1) {
  return function(s, a) {
    let u = wR(e, s);
    if ((n > 0 || u > -n) && (u += n), e === K.Hours)
      u === 0 && n === -12 && (u = 12);
    else if (e === K.FractionalSeconds)
      return bR(u, t);
    const c = Et(a, _e.MinusSign);
    return At(u, t, c, r, o);
  };
}
i(Me, "dateGetter");
function wR(e, t) {
  switch (e) {
    case K.FullYear:
      return t.getFullYear();
    case K.Month:
      return t.getMonth();
    case K.Date:
      return t.getDate();
    case K.Hours:
      return t.getHours();
    case K.Minutes:
      return t.getMinutes();
    case K.Seconds:
      return t.getSeconds();
    case K.FractionalSeconds:
      return t.getMilliseconds();
    case K.Day:
      return t.getDay();
    default:
      throw new Error(`Unknown DateType value "${e}".`);
  }
}
i(wR, "getDatePart");
function ue(e, t, n = Pe.Format, r = !1) {
  return function(o, s) {
    return MR(o, s, e, t, n, r);
  };
}
i(ue, "dateStrGetter");
function MR(e, t, n, r, o, s) {
  switch (n) {
    case Y.Months:
      return dR(t, o, r)[e.getMonth()];
    case Y.Days:
      return lR(t, o, r)[e.getDay()];
    case Y.DayPeriods:
      const a = e.getHours(), u = e.getMinutes();
      if (s) {
        const l = gR(t), d = mR(t, o, r), f = l.findIndex((h) => {
          if (Array.isArray(h)) {
            const [p, g] = h, m = a >= p.hours && u >= p.minutes, v = a < g.hours || a === g.hours && u < g.minutes;
            if (p.hours < g.hours) {
              if (m && v)
                return !0;
            } else if (m || v)
              return !0;
          } else if (h.hours === a && h.minutes === u)
            return !0;
          return !1;
        });
        if (f !== -1)
          return d[f];
      }
      return cR(t, o, r)[a < 12 ? 0 : 1];
    case Y.Eras:
      return fR(t, r)[e.getFullYear() <= 0 ? 0 : 1];
    default:
      const c = n;
      throw new Error(`unexpected translation type ${c}`);
  }
}
i(MR, "getDateTranslation");
function oa(e) {
  return function(t, n, r) {
    const o = -1 * r, s = Et(n, _e.MinusSign), a = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
    switch (e) {
      case Qt.Short:
        return (o >= 0 ? "+" : "") + At(a, 2, s) + At(Math.abs(o % 60), 2, s);
      case Qt.ShortGMT:
        return "GMT" + (o >= 0 ? "+" : "") + At(a, 1, s);
      case Qt.Long:
        return "GMT" + (o >= 0 ? "+" : "") + At(a, 2, s) + ":" + At(Math.abs(o % 60), 2, s);
      case Qt.Extended:
        return r === 0 ? "Z" : (o >= 0 ? "+" : "") + At(a, 2, s) + ":" + At(Math.abs(o % 60), 2, s);
      default:
        throw new Error(`Unknown zone width "${e}"`);
    }
  };
}
i(oa, "timeZoneGetter");
const _R = 0, Ca = 4;
function SR(e) {
  const t = ou(e, _R, 1).getDay();
  return ou(e, 0, 1 + (t <= Ca ? Ca : Ca + 7) - t);
}
i(SR, "getFirstThursdayOfYear");
function Qb(e) {
  const t = e.getDay(), n = t === 0 ? -3 : Ca - t;
  return ou(e.getFullYear(), e.getMonth(), e.getDate() + n);
}
i(Qb, "getThursdayThisIsoWeek");
function Yc(e, t = !1) {
  return function(n, r) {
    let o;
    if (t) {
      const s = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1, a = n.getDate();
      o = 1 + Math.floor((a + s) / 7);
    } else {
      const s = Qb(n), a = SR(s.getFullYear()), u = s.getTime() - a.getTime();
      o = 1 + Math.round(u / 6048e5);
    }
    return At(o, e, Et(r, _e.MinusSign));
  };
}
i(Yc, "weekGetter");
function ia(e, t = !1) {
  return function(n, r) {
    const s = Qb(n).getFullYear();
    return At(s, e, Et(r, _e.MinusSign), t);
  };
}
i(ia, "weekNumberingYearGetter");
const Kc = {};
function TR(e) {
  if (Kc[e])
    return Kc[e];
  let t;
  switch (e) {
    case "G":
    case "GG":
    case "GGG":
      t = ue(Y.Eras, re.Abbreviated);
      break;
    case "GGGG":
      t = ue(Y.Eras, re.Wide);
      break;
    case "GGGGG":
      t = ue(Y.Eras, re.Narrow);
      break;
    case "y":
      t = Me(K.FullYear, 1, 0, !1, !0);
      break;
    case "yy":
      t = Me(K.FullYear, 2, 0, !0, !0);
      break;
    case "yyy":
      t = Me(K.FullYear, 3, 0, !1, !0);
      break;
    case "yyyy":
      t = Me(K.FullYear, 4, 0, !1, !0);
      break;
    case "Y":
      t = ia(1);
      break;
    case "YY":
      t = ia(2, !0);
      break;
    case "YYY":
      t = ia(3);
      break;
    case "YYYY":
      t = ia(4);
      break;
    case "M":
    case "L":
      t = Me(K.Month, 1, 1);
      break;
    case "MM":
    case "LL":
      t = Me(K.Month, 2, 1);
      break;
    case "MMM":
      t = ue(Y.Months, re.Abbreviated);
      break;
    case "MMMM":
      t = ue(Y.Months, re.Wide);
      break;
    case "MMMMM":
      t = ue(Y.Months, re.Narrow);
      break;
    case "LLL":
      t = ue(Y.Months, re.Abbreviated, Pe.Standalone);
      break;
    case "LLLL":
      t = ue(Y.Months, re.Wide, Pe.Standalone);
      break;
    case "LLLLL":
      t = ue(Y.Months, re.Narrow, Pe.Standalone);
      break;
    case "w":
      t = Yc(1);
      break;
    case "ww":
      t = Yc(2);
      break;
    case "W":
      t = Yc(1, !0);
      break;
    case "d":
      t = Me(K.Date, 1);
      break;
    case "dd":
      t = Me(K.Date, 2);
      break;
    case "c":
    case "cc":
      t = Me(K.Day, 1);
      break;
    case "ccc":
      t = ue(Y.Days, re.Abbreviated, Pe.Standalone);
      break;
    case "cccc":
      t = ue(Y.Days, re.Wide, Pe.Standalone);
      break;
    case "ccccc":
      t = ue(Y.Days, re.Narrow, Pe.Standalone);
      break;
    case "cccccc":
      t = ue(Y.Days, re.Short, Pe.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      t = ue(Y.Days, re.Abbreviated);
      break;
    case "EEEE":
      t = ue(Y.Days, re.Wide);
      break;
    case "EEEEE":
      t = ue(Y.Days, re.Narrow);
      break;
    case "EEEEEE":
      t = ue(Y.Days, re.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      t = ue(Y.DayPeriods, re.Abbreviated);
      break;
    case "aaaa":
      t = ue(Y.DayPeriods, re.Wide);
      break;
    case "aaaaa":
      t = ue(Y.DayPeriods, re.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      t = ue(Y.DayPeriods, re.Abbreviated, Pe.Standalone, !0);
      break;
    case "bbbb":
      t = ue(Y.DayPeriods, re.Wide, Pe.Standalone, !0);
      break;
    case "bbbbb":
      t = ue(Y.DayPeriods, re.Narrow, Pe.Standalone, !0);
      break;
    case "B":
    case "BB":
    case "BBB":
      t = ue(Y.DayPeriods, re.Abbreviated, Pe.Format, !0);
      break;
    case "BBBB":
      t = ue(Y.DayPeriods, re.Wide, Pe.Format, !0);
      break;
    case "BBBBB":
      t = ue(Y.DayPeriods, re.Narrow, Pe.Format, !0);
      break;
    case "h":
      t = Me(K.Hours, 1, -12);
      break;
    case "hh":
      t = Me(K.Hours, 2, -12);
      break;
    case "H":
      t = Me(K.Hours, 1);
      break;
    case "HH":
      t = Me(K.Hours, 2);
      break;
    case "m":
      t = Me(K.Minutes, 1);
      break;
    case "mm":
      t = Me(K.Minutes, 2);
      break;
    case "s":
      t = Me(K.Seconds, 1);
      break;
    case "ss":
      t = Me(K.Seconds, 2);
      break;
    case "S":
      t = Me(K.FractionalSeconds, 1);
      break;
    case "SS":
      t = Me(K.FractionalSeconds, 2);
      break;
    case "SSS":
      t = Me(K.FractionalSeconds, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      t = oa(Qt.Short);
      break;
    case "ZZZZZ":
      t = oa(Qt.Extended);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      t = oa(Qt.ShortGMT);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      t = oa(Qt.Long);
      break;
    default:
      return null;
  }
  return Kc[e] = t, t;
}
i(TR, "getDateFormatter");
function Zb(e, t) {
  e = e.replace(/:/g, "");
  const n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
  return isNaN(n) ? t : n;
}
i(Zb, "timezoneToOffset");
function AR(e, t) {
  return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e;
}
i(AR, "addDateMinutes");
function OR(e, t, n) {
  const o = e.getTimezoneOffset(), s = Zb(t, o);
  return AR(e, -1 * (s - o));
}
i(OR, "convertTimezoneToLocal");
function FR(e) {
  if (wm(e))
    return e;
  if (typeof e == "number" && !isNaN(e))
    return new Date(e);
  if (typeof e == "string") {
    if (e = e.trim(), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)) {
      const [o, s = 1, a = 1] = e.split("-").map((u) => +u);
      return ou(o, s - 1, a);
    }
    const n = parseFloat(e);
    if (!isNaN(e - n))
      return new Date(n);
    let r;
    if (r = e.match(IR))
      return NR(r);
  }
  const t = new Date(e);
  if (!wm(t))
    throw new Error(`Unable to convert "${e}" into a date`);
  return t;
}
i(FR, "toDate");
function NR(e) {
  const t = /* @__PURE__ */ new Date(0);
  let n = 0, r = 0;
  const o = e[8] ? t.setUTCFullYear : t.setFullYear, s = e[8] ? t.setUTCHours : t.setHours;
  e[9] && (n = Number(e[9] + e[10]), r = Number(e[9] + e[11])), o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
  const a = Number(e[4] || 0) - n, u = Number(e[5] || 0) - r, c = Number(e[6] || 0), l = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
  return s.call(t, a, u, c, l), t;
}
i(NR, "isoStringToDate");
function wm(e) {
  return e instanceof Date && !isNaN(e.valueOf());
}
i(wm, "isDate");
const kR = /^(\d+)?\.((\d+)(-(\d+))?)?$/, Mm = 22, iu = ".", Ai = "0", RR = ";", xR = ",", Jc = "#", _m = "¤", PR = "%";
function Mp(e, t, n, r, o, s, a = !1) {
  let u = "", c = !1;
  if (!isFinite(e))
    u = Et(n, _e.Infinity);
  else {
    let l = HR(e);
    a && (l = BR(l));
    let d = t.minInt, f = t.minFrac, h = t.maxFrac;
    if (s) {
      const D = s.match(kR);
      if (D === null)
        throw new Error(`${s} is not a valid digit info`);
      const _ = D[1], R = D[3], W = D[5];
      _ != null && (d = Xc(_)), R != null && (f = Xc(R)), W != null ? h = Xc(W) : R != null && f > h && (h = f);
    }
    VR(l, f, h);
    let p = l.digits, g = l.integerLen;
    const m = l.exponent;
    let v = [];
    for (c = p.every((D) => !D); g < d; g++)
      p.unshift(0);
    for (; g < 0; g++)
      p.unshift(0);
    g > 0 ? v = p.splice(g, p.length) : (v = p, p = [0]);
    const C = [];
    for (p.length >= t.lgSize && C.unshift(p.splice(-t.lgSize, p.length).join("")); p.length > t.gSize; )
      C.unshift(p.splice(-t.gSize, p.length).join(""));
    p.length && C.unshift(p.join("")), u = C.join(Et(n, r)), v.length && (u += Et(n, o) + v.join("")), m && (u += Et(n, _e.Exponential) + "+" + m);
  }
  return e < 0 && !c ? u = t.negPre + u + t.negSuf : u = t.posPre + u + t.posSuf, u;
}
i(Mp, "formatNumberToLocaleString");
function LR(e, t, n, r, o) {
  const s = wp(t, ts.Currency), a = _p(s, Et(t, _e.MinusSign));
  return a.minFrac = vR(r), a.maxFrac = a.minFrac, Mp(e, a, t, _e.CurrencyGroup, _e.CurrencyDecimal, o).replace(_m, n).replace(_m, "").trim();
}
i(LR, "formatCurrency");
function jR(e, t, n) {
  const r = wp(t, ts.Percent), o = _p(r, Et(t, _e.MinusSign));
  return Mp(e, o, t, _e.Group, _e.Decimal, n, !0).replace(new RegExp(PR, "g"), Et(t, _e.PercentSign));
}
i(jR, "formatPercent");
function $R(e, t, n) {
  const r = wp(t, ts.Decimal), o = _p(r, Et(t, _e.MinusSign));
  return Mp(e, o, t, _e.Group, _e.Decimal, n);
}
i($R, "formatNumber");
function _p(e, t = "-") {
  const n = {
    minInt: 1,
    minFrac: 0,
    maxFrac: 0,
    posPre: "",
    posSuf: "",
    negPre: "",
    negSuf: "",
    gSize: 0,
    lgSize: 0
  }, r = e.split(RR), o = r[0], s = r[1], a = o.indexOf(iu) !== -1 ? o.split(iu) : [
    o.substring(0, o.lastIndexOf(Ai) + 1),
    o.substring(o.lastIndexOf(Ai) + 1)
  ], u = a[0], c = a[1] || "";
  n.posPre = u.substring(0, u.indexOf(Jc));
  for (let d = 0; d < c.length; d++) {
    const f = c.charAt(d);
    f === Ai ? n.minFrac = n.maxFrac = d + 1 : f === Jc ? n.maxFrac = d + 1 : n.posSuf += f;
  }
  const l = u.split(xR);
  if (n.gSize = l[1] ? l[1].length : 0, n.lgSize = l[2] || l[1] ? (l[2] || l[1]).length : 0, s) {
    const d = o.length - n.posPre.length - n.posSuf.length, f = s.indexOf(Jc);
    n.negPre = s.substring(0, f).replace(/'/g, ""), n.negSuf = s.slice(f + d).replace(/'/g, "");
  } else
    n.negPre = t + n.posPre, n.negSuf = n.posSuf;
  return n;
}
i(_p, "parseNumberFormat");
function BR(e) {
  if (e.digits[0] === 0)
    return e;
  const t = e.digits.length - e.integerLen;
  return e.exponent ? e.exponent += 2 : (t === 0 ? e.digits.push(0, 0) : t === 1 && e.digits.push(0), e.integerLen += 2), e;
}
i(BR, "toPercent");
function HR(e) {
  let t = Math.abs(e) + "", n = 0, r, o, s, a, u;
  for ((o = t.indexOf(iu)) > -1 && (t = t.replace(iu, "")), (s = t.search(/e/i)) > 0 ? (o < 0 && (o = s), o += +t.slice(s + 1), t = t.substring(0, s)) : o < 0 && (o = t.length), s = 0; t.charAt(s) === Ai; s++)
    ;
  if (s === (u = t.length))
    r = [0], o = 1;
  else {
    for (u--; t.charAt(u) === Ai; )
      u--;
    for (o -= s, r = [], a = 0; s <= u; s++, a++)
      r[a] = Number(t.charAt(s));
  }
  return o > Mm && (r = r.splice(0, Mm - 1), n = o - 1, o = 1), { digits: r, exponent: n, integerLen: o };
}
i(HR, "parseNumber");
function VR(e, t, n) {
  if (t > n)
    throw new Error(`The minimum number of digits after fraction (${t}) is higher than the maximum (${n}).`);
  let r = e.digits, o = r.length - e.integerLen;
  const s = Math.min(Math.max(t, o), n);
  let a = s + e.integerLen, u = r[a];
  if (a > 0) {
    r.splice(Math.max(e.integerLen, a));
    for (let f = a; f < r.length; f++)
      r[f] = 0;
  } else {
    o = Math.max(0, o), e.integerLen = 1, r.length = Math.max(1, a = s + 1), r[0] = 0;
    for (let f = 1; f < a; f++)
      r[f] = 0;
  }
  if (u >= 5)
    if (a - 1 < 0) {
      for (let f = 0; f > a; f--)
        r.unshift(0), e.integerLen++;
      r.unshift(1), e.integerLen++;
    } else
      r[a - 1]++;
  for (; o < Math.max(0, s); o++)
    r.push(0);
  let c = s !== 0;
  const l = t + e.integerLen, d = r.reduceRight(function(f, h, p, g) {
    return h = h + f, g[p] = h < 10 ? h : h - 10, c && (g[p] === 0 && p >= l ? g.pop() : c = !1), h >= 10 ? 1 : 0;
  }, 0);
  d && (r.unshift(d), e.integerLen++);
}
i(VR, "roundNumber");
function Xc(e) {
  const t = parseInt(e);
  if (isNaN(t))
    throw new Error("Invalid integer literal when parsing " + e);
  return t;
}
i(Xc, "parseIntAutoRadix");
class En {
  static {
    i(this, "NgLocalization");
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: En, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: En, providedIn: "root", useFactory: /* @__PURE__ */ i((t) => new No(t), "useFactory"), deps: [{ token: ze }] });
  }
}
H({ type: En, decorators: [{
  type: he,
  args: [{
    providedIn: "root",
    useFactory: /* @__PURE__ */ i((e) => new No(e), "useFactory"),
    deps: [ze]
  }]
}] });
function Yb(e, t, n, r) {
  let o = `=${e}`;
  if (t.indexOf(o) > -1 || (o = n.getPluralCategory(e, r), t.indexOf(o) > -1))
    return o;
  if (t.indexOf("other") > -1)
    return "other";
  throw new Error(`No plural message found for value "${e}"`);
}
i(Yb, "getPluralCategory");
class No extends En {
  static {
    i(this, "NgLocaleLocalization");
  }
  constructor(t) {
    super(), this.locale = t;
  }
  getPluralCategory(t, n) {
    switch (pR(n || this.locale)(t)) {
      case ur.Zero:
        return "zero";
      case ur.One:
        return "one";
      case ur.Two:
        return "two";
      case ur.Few:
        return "few";
      case ur.Many:
        return "many";
      default:
        return "other";
    }
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: No, deps: [{ token: ze }], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: No });
  }
}
H({ type: No, decorators: [{
  type: he
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: void 0, decorators: [{
  type: ht,
  args: [ze]
}] }], "ctorParameters") });
const el = /\s+/, Sm = [];
class Sr {
  static {
    i(this, "NgClass");
  }
  constructor(t, n) {
    this._ngEl = t, this._renderer = n, this.initialClasses = Sm, this.stateMap = /* @__PURE__ */ new Map();
  }
  set klass(t) {
    this.initialClasses = t != null ? t.trim().split(el) : Sm;
  }
  set ngClass(t) {
    this.rawClass = typeof t == "string" ? t.trim().split(el) : t;
  }
  /*
    The NgClass directive uses the custom change detection algorithm for its inputs. The custom
    algorithm is necessary since inputs are represented as complex object or arrays that need to be
    deeply-compared.
  
    This algorithm is perf-sensitive since NgClass is used very frequently and its poor performance
    might negatively impact runtime performance of the entire change detection cycle. The design of
    this algorithm is making sure that:
    - there is no unnecessary DOM manipulation (CSS classes are added / removed from the DOM only when
    needed), even if references to bound objects change;
    - there is no memory allocation if nothing changes (even relatively modest memory allocation
    during the change detection cycle can result in GC pauses for some of the CD cycles).
  
    The algorithm works by iterating over the set of bound classes, staring with [class] binding and
    then going over [ngClass] binding. For each CSS class name:
    - check if it was seen before (this information is tracked in the state map) and if its value
    changed;
    - mark it as "touched" - names that are not marked are not present in the latest set of binding
    and we can remove such class name from the internal data structures;
  
    After iteration over all the CSS class names we've got data structure with all the information
    necessary to synchronize changes to the DOM - it is enough to iterate over the state map, flush
    changes to the DOM and reset internal data structures so those are ready for the next change
    detection cycle.
     */
  ngDoCheck() {
    for (const n of this.initialClasses)
      this._updateState(n, !0);
    const t = this.rawClass;
    if (Array.isArray(t) || t instanceof Set)
      for (const n of t)
        this._updateState(n, !0);
    else if (t != null)
      for (const n of Object.keys(t))
        this._updateState(n, !!t[n]);
    this._applyStateDiff();
  }
  _updateState(t, n) {
    const r = this.stateMap.get(t);
    r !== void 0 ? (r.enabled !== n && (r.changed = !0, r.enabled = n), r.touched = !0) : this.stateMap.set(t, { enabled: n, changed: !0, touched: !0 });
  }
  _applyStateDiff() {
    for (const t of this.stateMap) {
      const n = t[0], r = t[1];
      r.changed ? (this._toggleClass(n, r.enabled), r.changed = !1) : r.touched || (r.enabled && this._toggleClass(n, !1), this.stateMap.delete(n)), r.touched = !1;
    }
  }
  _toggleClass(t, n) {
    if (ngDevMode && typeof t != "string")
      throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${Z(t)}`);
    t = t.trim(), t.length > 0 && t.split(el).forEach((r) => {
      n ? this._renderer.addClass(this._ngEl.nativeElement, r) : this._renderer.removeClass(this._ngEl.nativeElement, r);
    });
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Sr, deps: [{ token: on }, { token: Zo }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: Sr, isStandalone: !0, selector: "[ngClass]", inputs: { klass: ["class", "klass"], ngClass: "ngClass" }, ngImport: w });
  }
}
H({ type: Sr, decorators: [{
  type: ut,
  args: [{
    selector: "[ngClass]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: on }, { type: Zo }], "ctorParameters"), propDecorators: { klass: [{
  type: q,
  args: ["class"]
}], ngClass: [{
  type: q,
  args: ["ngClass"]
}] } });
class Tr {
  static {
    i(this, "NgComponentOutlet");
  }
  constructor(t) {
    this._viewContainerRef = t, this.ngComponentOutlet = null, this._inputsUsed = /* @__PURE__ */ new Map();
  }
  _needToReCreateNgModuleInstance(t) {
    return t.ngComponentOutletNgModule !== void 0 || t.ngComponentOutletNgModuleFactory !== void 0;
  }
  _needToReCreateComponentInstance(t) {
    return t.ngComponentOutlet !== void 0 || t.ngComponentOutletContent !== void 0 || t.ngComponentOutletInjector !== void 0 || this._needToReCreateNgModuleInstance(t);
  }
  /** @nodoc */
  ngOnChanges(t) {
    if (this._needToReCreateComponentInstance(t) && (this._viewContainerRef.clear(), this._inputsUsed.clear(), this._componentRef = void 0, this.ngComponentOutlet)) {
      const n = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
      this._needToReCreateNgModuleInstance(t) && (this._moduleRef?.destroy(), this.ngComponentOutletNgModule ? this._moduleRef = rh(this.ngComponentOutletNgModule, Tm(n)) : this.ngComponentOutletNgModuleFactory ? this._moduleRef = this.ngComponentOutletNgModuleFactory.create(Tm(n)) : this._moduleRef = void 0), this._componentRef = this._viewContainerRef.createComponent(this.ngComponentOutlet, {
        injector: n,
        ngModuleRef: this._moduleRef,
        projectableNodes: this.ngComponentOutletContent
      });
    }
  }
  /** @nodoc */
  ngDoCheck() {
    if (this._componentRef) {
      if (this.ngComponentOutletInputs)
        for (const t of Object.keys(this.ngComponentOutletInputs))
          this._inputsUsed.set(t, !0);
      this._applyInputStateDiff(this._componentRef);
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    this._moduleRef?.destroy();
  }
  _applyInputStateDiff(t) {
    for (const [n, r] of this._inputsUsed)
      r ? (t.setInput(n, this.ngComponentOutletInputs[n]), this._inputsUsed.set(n, !1)) : (t.setInput(n, void 0), this._inputsUsed.delete(n));
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Tr, deps: [{ token: Fe }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: Tr, isStandalone: !0, selector: "[ngComponentOutlet]", inputs: { ngComponentOutlet: "ngComponentOutlet", ngComponentOutletInputs: "ngComponentOutletInputs", ngComponentOutletInjector: "ngComponentOutletInjector", ngComponentOutletContent: "ngComponentOutletContent", ngComponentOutletNgModule: "ngComponentOutletNgModule", ngComponentOutletNgModuleFactory: "ngComponentOutletNgModuleFactory" }, usesOnChanges: !0, ngImport: w });
  }
}
H({ type: Tr, decorators: [{
  type: ut,
  args: [{
    selector: "[ngComponentOutlet]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: Fe }], "ctorParameters"), propDecorators: { ngComponentOutlet: [{
  type: q
}], ngComponentOutletInputs: [{
  type: q
}], ngComponentOutletInjector: [{
  type: q
}], ngComponentOutletContent: [{
  type: q
}], ngComponentOutletNgModule: [{
  type: q
}], ngComponentOutletNgModuleFactory: [{
  type: q
}] } });
function Tm(e) {
  return e.get(Xn).injector;
}
i(Tm, "getParentInjector");
class UR {
  static {
    i(this, "NgForOfContext");
  }
  constructor(t, n, r, o) {
    this.$implicit = t, this.ngForOf = n, this.index = r, this.count = o;
  }
  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.count - 1;
  }
  get even() {
    return this.index % 2 === 0;
  }
  get odd() {
    return !this.even;
  }
}
class Ar {
  static {
    i(this, "NgForOf");
  }
  /**
   * The value of the iterable expression, which can be used as a
   * [template input variable](guide/structural-directives#shorthand).
   */
  set ngForOf(t) {
    this._ngForOf = t, this._ngForOfDirty = !0;
  }
  /**
   * Specifies a custom `TrackByFunction` to compute the identity of items in an iterable.
   *
   * If a custom `TrackByFunction` is not provided, `NgForOf` will use the item's [object
   * identity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
   * as the key.
   *
   * `NgForOf` uses the computed key to associate items in an iterable with DOM elements
   * it produces for these items.
   *
   * A custom `TrackByFunction` is useful to provide good user experience in cases when items in an
   * iterable rendered using `NgForOf` have a natural identifier (for example, custom ID or a
   * primary key), and this iterable could be updated with new object instances that still
   * represent the same underlying entity (for example, when data is re-fetched from the server,
   * and the iterable is recreated and re-rendered, but most of the data is still the same).
   *
   * @see {@link TrackByFunction}
   */
  set ngForTrackBy(t) {
    (typeof ngDevMode > "u" || ngDevMode) && t != null && typeof t != "function" && console.warn(`trackBy must be a function, but received ${JSON.stringify(t)}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`), this._trackByFn = t;
  }
  get ngForTrackBy() {
    return this._trackByFn;
  }
  constructor(t, n, r) {
    this._viewContainer = t, this._template = n, this._differs = r, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null;
  }
  /**
   * A reference to the template that is stamped out for each item in the iterable.
   * @see [template reference variable](guide/template-reference-variables)
   */
  set ngForTemplate(t) {
    t && (this._template = t);
  }
  /**
   * Applies the changes when needed.
   * @nodoc
   */
  ngDoCheck() {
    if (this._ngForOfDirty) {
      this._ngForOfDirty = !1;
      const t = this._ngForOf;
      if (!this._differ && t)
        if (typeof ngDevMode > "u" || ngDevMode)
          try {
            this._differ = this._differs.find(t).create(this.ngForTrackBy);
          } catch {
            let n = `Cannot find a differ supporting object '${t}' of type '${zR(t)}'. NgFor only supports binding to Iterables, such as Arrays.`;
            throw typeof t == "object" && (n += " Did you mean to use the keyvalue pipe?"), new I(-2200, n);
          }
        else
          this._differ = this._differs.find(t).create(this.ngForTrackBy);
    }
    if (this._differ) {
      const t = this._differ.diff(this._ngForOf);
      t && this._applyChanges(t);
    }
  }
  _applyChanges(t) {
    const n = this._viewContainer;
    t.forEachOperation((r, o, s) => {
      if (r.previousIndex == null)
        n.createEmbeddedView(this._template, new UR(r.item, this._ngForOf, -1, -1), s === null ? void 0 : s);
      else if (s == null)
        n.remove(o === null ? void 0 : o);
      else if (o !== null) {
        const a = n.get(o);
        n.move(a, s), Am(a, r);
      }
    });
    for (let r = 0, o = n.length; r < o; r++) {
      const a = n.get(r).context;
      a.index = r, a.count = o, a.ngForOf = this._ngForOf;
    }
    t.forEachIdentityChange((r) => {
      const o = n.get(r.currentIndex);
      Am(o, r);
    });
  }
  /**
   * Asserts the correct type of the context for the template that `NgForOf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgForOf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard(t, n) {
    return !0;
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Ar, deps: [{ token: Fe }, { token: Ze }, { token: Ot }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: Ar, isStandalone: !0, selector: "[ngFor][ngForOf]", inputs: { ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate" }, ngImport: w });
  }
}
H({ type: Ar, decorators: [{
  type: ut,
  args: [{
    selector: "[ngFor][ngForOf]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: Fe }, { type: Ze }, { type: Ot }], "ctorParameters"), propDecorators: { ngForOf: [{
  type: q
}], ngForTrackBy: [{
  type: q
}], ngForTemplate: [{
  type: q
}] } });
function Am(e, t) {
  e.context.$implicit = t.item;
}
i(Am, "applyViewChange");
function zR(e) {
  return e.name || typeof e;
}
i(zR, "getTypeName");
class Or {
  static {
    i(this, "NgIf");
  }
  constructor(t, n) {
    this._viewContainer = t, this._context = new GR(), this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = n;
  }
  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  set ngIf(t) {
    this._context.$implicit = this._context.ngIf = t, this._updateView();
  }
  /**
   * A template to show if the condition expression evaluates to true.
   */
  set ngIfThen(t) {
    Om("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView();
  }
  /**
   * A template to show if the condition expression evaluates to false.
   */
  set ngIfElse(t) {
    Om("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView();
  }
  _updateView() {
    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
  }
  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard(t, n) {
    return !0;
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Or, deps: [{ token: Fe }, { token: Ze }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: Or, isStandalone: !0, selector: "[ngIf]", inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" }, ngImport: w });
  }
}
H({ type: Or, decorators: [{
  type: ut,
  args: [{
    selector: "[ngIf]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: Fe }, { type: Ze }], "ctorParameters"), propDecorators: { ngIf: [{
  type: q
}], ngIfThen: [{
  type: q
}], ngIfElse: [{
  type: q
}] } });
class GR {
  static {
    i(this, "NgIfContext");
  }
  constructor() {
    this.$implicit = null, this.ngIf = null;
  }
}
function Om(e, t) {
  if (!!!(!t || t.createEmbeddedView))
    throw new Error(`${e} must be a TemplateRef, but received '${Z(t)}'.`);
}
i(Om, "assertTemplate");
class Sp {
  static {
    i(this, "SwitchView");
  }
  constructor(t, n) {
    this._viewContainerRef = t, this._templateRef = n, this._created = !1;
  }
  create() {
    this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef);
  }
  destroy() {
    this._created = !1, this._viewContainerRef.clear();
  }
  enforceState(t) {
    t && !this._created ? this.create() : !t && this._created && this.destroy();
  }
}
class jt {
  static {
    i(this, "NgSwitch");
  }
  constructor() {
    this._defaultViews = [], this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1;
  }
  set ngSwitch(t) {
    this._ngSwitch = t, this._caseCount === 0 && this._updateDefaultCases(!0);
  }
  /** @internal */
  _addCase() {
    return this._caseCount++;
  }
  /** @internal */
  _addDefault(t) {
    this._defaultViews.push(t);
  }
  /** @internal */
  _matchCase(t) {
    const n = t === this._ngSwitch;
    return (typeof ngDevMode > "u" || ngDevMode) && n !== (t == this._ngSwitch) && console.warn(ye(2001, `As of Angular v17 the NgSwitch directive uses strict equality comparison === instead of == to match different cases. Previously the case value "${Fm(t)}" matched switch expression value "${Fm(this._ngSwitch)}", but this is no longer the case with the stricter equality check. Your comparison results return different results using === vs. == and you should adjust your ngSwitch expression and / or values to conform with the strict equality requirements.`)), this._lastCasesMatched ||= n, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), n;
  }
  _updateDefaultCases(t) {
    if (this._defaultViews.length > 0 && t !== this._defaultUsed) {
      this._defaultUsed = t;
      for (const n of this._defaultViews)
        n.enforceState(t);
    }
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: jt, deps: [], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: jt, isStandalone: !0, selector: "[ngSwitch]", inputs: { ngSwitch: "ngSwitch" }, ngImport: w });
  }
}
H({ type: jt, decorators: [{
  type: ut,
  args: [{
    selector: "[ngSwitch]",
    standalone: !0
  }]
}], propDecorators: { ngSwitch: [{
  type: q
}] } });
class Fr {
  static {
    i(this, "NgSwitchCase");
  }
  constructor(t, n, r) {
    this.ngSwitch = r, (typeof ngDevMode > "u" || ngDevMode) && !r && Kb("ngSwitchCase", "NgSwitchCase"), r._addCase(), this._view = new Sp(t, n);
  }
  /**
   * Performs case matching. For internal use only.
   * @nodoc
   */
  ngDoCheck() {
    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Fr, deps: [{ token: Fe }, { token: Ze }, { token: jt, host: !0, optional: !0 }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: Fr, isStandalone: !0, selector: "[ngSwitchCase]", inputs: { ngSwitchCase: "ngSwitchCase" }, ngImport: w });
  }
}
H({ type: Fr, decorators: [{
  type: ut,
  args: [{
    selector: "[ngSwitchCase]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: Fe }, { type: Ze }, { type: jt, decorators: [{
  type: Kt
}, {
  type: fs
}] }], "ctorParameters"), propDecorators: { ngSwitchCase: [{
  type: q
}] } });
class Nr {
  static {
    i(this, "NgSwitchDefault");
  }
  constructor(t, n, r) {
    (typeof ngDevMode > "u" || ngDevMode) && !r && Kb("ngSwitchDefault", "NgSwitchDefault"), r._addDefault(new Sp(t, n));
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Nr, deps: [{ token: Fe }, { token: Ze }, { token: jt, host: !0, optional: !0 }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: Nr, isStandalone: !0, selector: "[ngSwitchDefault]", ngImport: w });
  }
}
H({ type: Nr, decorators: [{
  type: ut,
  args: [{
    selector: "[ngSwitchDefault]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: Fe }, { type: Ze }, { type: jt, decorators: [{
  type: Kt
}, {
  type: fs
}] }], "ctorParameters") });
function Kb(e, t) {
  throw new I(2e3, `An element with the "${e}" attribute (matching the "${t}" directive) must be located inside an element with the "ngSwitch" attribute (matching "NgSwitch" directive)`);
}
i(Kb, "throwNgSwitchProviderNotFoundError");
function Fm(e) {
  return typeof e == "string" ? `'${e}'` : String(e);
}
i(Fm, "stringifyValue");
class bn {
  static {
    i(this, "NgPlural");
  }
  constructor(t) {
    this._localization = t, this._caseViews = {};
  }
  set ngPlural(t) {
    this._updateView(t);
  }
  addCase(t, n) {
    this._caseViews[t] = n;
  }
  _updateView(t) {
    this._clearViews();
    const n = Object.keys(this._caseViews), r = Yb(t, n, this._localization);
    this._activateView(this._caseViews[r]);
  }
  _clearViews() {
    this._activeView && this._activeView.destroy();
  }
  _activateView(t) {
    t && (this._activeView = t, this._activeView.create());
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: bn, deps: [{ token: En }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: bn, isStandalone: !0, selector: "[ngPlural]", inputs: { ngPlural: "ngPlural" }, ngImport: w });
  }
}
H({ type: bn, decorators: [{
  type: ut,
  args: [{
    selector: "[ngPlural]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: En }], "ctorParameters"), propDecorators: { ngPlural: [{
  type: q
}] } });
class kr {
  static {
    i(this, "NgPluralCase");
  }
  constructor(t, n, r, o) {
    this.value = t;
    const s = !isNaN(Number(t));
    o.addCase(s ? `=${t}` : t, new Sp(r, n));
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: kr, deps: [{ token: "ngPluralCase", attribute: !0 }, { token: Ze }, { token: Fe }, { token: bn, host: !0 }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: kr, isStandalone: !0, selector: "[ngPluralCase]", ngImport: w });
  }
}
H({ type: kr, decorators: [{
  type: ut,
  args: [{
    selector: "[ngPluralCase]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: void 0, decorators: [{
  type: nf,
  args: ["ngPluralCase"]
}] }, { type: Ze }, { type: Fe }, { type: bn, decorators: [{
  type: fs
}] }], "ctorParameters") });
class Rr {
  static {
    i(this, "NgStyle");
  }
  constructor(t, n, r) {
    this._ngEl = t, this._differs = n, this._renderer = r, this._ngStyle = null, this._differ = null;
  }
  set ngStyle(t) {
    this._ngStyle = t, !this._differ && t && (this._differ = this._differs.find(t).create());
  }
  ngDoCheck() {
    if (this._differ) {
      const t = this._differ.diff(this._ngStyle);
      t && this._applyChanges(t);
    }
  }
  _setStyle(t, n) {
    const [r, o] = t.split("."), s = r.indexOf("-") === -1 ? void 0 : Eo.DashCase;
    n != null ? this._renderer.setStyle(this._ngEl.nativeElement, r, o ? `${n}${o}` : n, s) : this._renderer.removeStyle(this._ngEl.nativeElement, r, s);
  }
  _applyChanges(t) {
    t.forEachRemovedItem((n) => this._setStyle(n.key, null)), t.forEachAddedItem((n) => this._setStyle(n.key, n.currentValue)), t.forEachChangedItem((n) => this._setStyle(n.key, n.currentValue));
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Rr, deps: [{ token: on }, { token: dt }, { token: Zo }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: Rr, isStandalone: !0, selector: "[ngStyle]", inputs: { ngStyle: "ngStyle" }, ngImport: w });
  }
}
H({ type: Rr, decorators: [{
  type: ut,
  args: [{
    selector: "[ngStyle]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: on }, { type: dt }, { type: Zo }], "ctorParameters"), propDecorators: { ngStyle: [{
  type: q,
  args: ["ngStyle"]
}] } });
class xr {
  static {
    i(this, "NgTemplateOutlet");
  }
  constructor(t) {
    this._viewContainerRef = t, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null;
  }
  ngOnChanges(t) {
    if (this._shouldRecreateView(t)) {
      const n = this._viewContainerRef;
      if (this._viewRef && n.remove(n.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
        this._viewRef = null;
        return;
      }
      const r = this._createContextForwardProxy();
      this._viewRef = n.createEmbeddedView(this.ngTemplateOutlet, r, {
        injector: this.ngTemplateOutletInjector ?? void 0
      });
    }
  }
  /**
   * We need to re-create existing embedded view if either is true:
   * - the outlet changed.
   * - the injector changed.
   */
  _shouldRecreateView(t) {
    return !!t.ngTemplateOutlet || !!t.ngTemplateOutletInjector;
  }
  /**
   * For a given outlet instance, we create a proxy object that delegates
   * to the user-specified context. This allows changing, or swapping out
   * the context object completely without having to destroy/re-create the view.
   */
  _createContextForwardProxy() {
    return new Proxy({}, {
      set: /* @__PURE__ */ i((t, n, r) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, n, r) : !1, "set"),
      get: /* @__PURE__ */ i((t, n, r) => {
        if (this.ngTemplateOutletContext)
          return Reflect.get(this.ngTemplateOutletContext, n, r);
      }, "get")
    });
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: xr, deps: [{ token: Fe }], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "14.0.0", version: "17.3.12", type: xr, isStandalone: !0, selector: "[ngTemplateOutlet]", inputs: { ngTemplateOutletContext: "ngTemplateOutletContext", ngTemplateOutlet: "ngTemplateOutlet", ngTemplateOutletInjector: "ngTemplateOutletInjector" }, usesOnChanges: !0, ngImport: w });
  }
}
H({ type: xr, decorators: [{
  type: ut,
  args: [{
    selector: "[ngTemplateOutlet]",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: Fe }], "ctorParameters"), propDecorators: { ngTemplateOutletContext: [{
  type: q
}], ngTemplateOutlet: [{
  type: q
}], ngTemplateOutletInjector: [{
  type: q
}] } });
const Nm = [
  Sr,
  Tr,
  Ar,
  Or,
  xr,
  Rr,
  jt,
  Fr,
  Nr,
  bn,
  kr
];
function zt(e, t) {
  return new I(2100, ngDevMode && `InvalidPipeArgument: '${t}' for pipe '${Z(e)}'`);
}
i(zt, "invalidPipeArgumentError");
class WR {
  static {
    i(this, "SubscribableStrategy");
  }
  createSubscription(t, n) {
    return gd(() => t.subscribe({
      next: n,
      error: /* @__PURE__ */ i((r) => {
        throw r;
      }, "error")
    }));
  }
  dispose(t) {
    gd(() => t.unsubscribe());
  }
}
class qR {
  static {
    i(this, "PromiseStrategy");
  }
  createSubscription(t, n) {
    return t.then(n, (r) => {
      throw r;
    });
  }
  dispose(t) {
  }
}
const QR = new qR(), ZR = new WR();
class jn {
  static {
    i(this, "AsyncPipe");
  }
  constructor(t) {
    this._latestValue = null, this.markForCheckOnValueUpdate = !0, this._subscription = null, this._obj = null, this._strategy = null, this._ref = t;
  }
  ngOnDestroy() {
    this._subscription && this._dispose(), this._ref = null;
  }
  transform(t) {
    if (!this._obj) {
      if (t)
        try {
          this.markForCheckOnValueUpdate = !1, this._subscribe(t);
        } finally {
          this.markForCheckOnValueUpdate = !0;
        }
      return this._latestValue;
    }
    return t !== this._obj ? (this._dispose(), this.transform(t)) : this._latestValue;
  }
  _subscribe(t) {
    this._obj = t, this._strategy = this._selectStrategy(t), this._subscription = this._strategy.createSubscription(t, (n) => this._updateLatestValue(t, n));
  }
  _selectStrategy(t) {
    if (mc(t))
      return QR;
    if (mp(t))
      return ZR;
    throw zt(jn, t);
  }
  _dispose() {
    this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null;
  }
  _updateLatestValue(t, n) {
    t === this._obj && (this._latestValue = n, this.markForCheckOnValueUpdate && this._ref?.markForCheck());
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: jn, deps: [{ token: ci }], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: jn, isStandalone: !0, name: "async", pure: !1 });
  }
}
H({ type: jn, decorators: [{
  type: ct,
  args: [{
    name: "async",
    pure: !1,
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: ci }], "ctorParameters") });
class $n {
  static {
    i(this, "LowerCasePipe");
  }
  transform(t) {
    if (t == null)
      return null;
    if (typeof t != "string")
      throw zt($n, t);
    return t.toLowerCase();
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: $n, deps: [], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: $n, isStandalone: !0, name: "lowercase" });
  }
}
H({ type: $n, decorators: [{
  type: ct,
  args: [{
    name: "lowercase",
    standalone: !0
  }]
}] });
const YR = /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
class Bn {
  static {
    i(this, "TitleCasePipe");
  }
  transform(t) {
    if (t == null)
      return null;
    if (typeof t != "string")
      throw zt(Bn, t);
    return t.replace(YR, (n) => n[0].toUpperCase() + n.slice(1).toLowerCase());
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Bn, deps: [], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Bn, isStandalone: !0, name: "titlecase" });
  }
}
H({ type: Bn, decorators: [{
  type: ct,
  args: [{
    name: "titlecase",
    standalone: !0
  }]
}] });
class Hn {
  static {
    i(this, "UpperCasePipe");
  }
  transform(t) {
    if (t == null)
      return null;
    if (typeof t != "string")
      throw zt(Hn, t);
    return t.toUpperCase();
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Hn, deps: [], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Hn, isStandalone: !0, name: "uppercase" });
  }
}
H({ type: Hn, decorators: [{
  type: ct,
  args: [{
    name: "uppercase",
    standalone: !0
  }]
}] });
const KR = "mediumDate", Jb = new $(ngDevMode ? "DATE_PIPE_DEFAULT_TIMEZONE" : ""), Xb = new $(ngDevMode ? "DATE_PIPE_DEFAULT_OPTIONS" : "");
class Vn {
  static {
    i(this, "DatePipe");
  }
  constructor(t, n, r) {
    this.locale = t, this.defaultTimezone = n, this.defaultOptions = r;
  }
  transform(t, n, r, o) {
    if (t == null || t === "" || t !== t)
      return null;
    try {
      const s = n ?? this.defaultOptions?.dateFormat ?? KR, a = r ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? void 0;
      return ER(t, s, o || this.locale, a);
    } catch (s) {
      throw zt(Vn, s.message);
    }
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Vn, deps: [{ token: ze }, { token: Jb, optional: !0 }, { token: Xb, optional: !0 }], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Vn, isStandalone: !0, name: "date" });
  }
}
H({ type: Vn, decorators: [{
  type: ct,
  args: [{
    name: "date",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: void 0, decorators: [{
  type: ht,
  args: [ze]
}] }, { type: void 0, decorators: [{
  type: ht,
  args: [Jb]
}, {
  type: Kt
}] }, { type: void 0, decorators: [{
  type: ht,
  args: [Xb]
}, {
  type: Kt
}] }], "ctorParameters") });
const JR = /#/g;
class Un {
  static {
    i(this, "I18nPluralPipe");
  }
  constructor(t) {
    this._localization = t;
  }
  /**
   * @param value the number to be formatted
   * @param pluralMap an object that mimics the ICU format, see
   * https://unicode-org.github.io/icu/userguide/format_parse/messages/.
   * @param locale a `string` defining the locale to use (uses the current {@link LOCALE_ID} by
   * default).
   */
  transform(t, n, r) {
    if (t == null)
      return "";
    if (typeof n != "object" || n === null)
      throw zt(Un, n);
    const o = Yb(t, Object.keys(n), this._localization, r);
    return n[o].replace(JR, t.toString());
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Un, deps: [{ token: En }], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Un, isStandalone: !0, name: "i18nPlural" });
  }
}
H({ type: Un, decorators: [{
  type: ct,
  args: [{
    name: "i18nPlural",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: En }], "ctorParameters") });
class zn {
  static {
    i(this, "I18nSelectPipe");
  }
  /**
   * @param value a string to be internationalized.
   * @param mapping an object that indicates the text that should be displayed
   * for different values of the provided `value`.
   */
  transform(t, n) {
    if (t == null)
      return "";
    if (typeof n != "object" || typeof t != "string")
      throw zt(zn, n);
    return n.hasOwnProperty(t) ? n[t] : n.hasOwnProperty("other") ? n.other : "";
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: zn, deps: [], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: zn, isStandalone: !0, name: "i18nSelect" });
  }
}
H({ type: zn, decorators: [{
  type: ct,
  args: [{
    name: "i18nSelect",
    standalone: !0
  }]
}] });
class Pr {
  static {
    i(this, "JsonPipe");
  }
  /**
   * @param value A value of any type to convert into a JSON-format string.
   */
  transform(t) {
    return JSON.stringify(t, null, 2);
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Pr, deps: [], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Pr, isStandalone: !0, name: "json", pure: !1 });
  }
}
H({ type: Pr, decorators: [{
  type: ct,
  args: [{
    name: "json",
    pure: !1,
    standalone: !0
  }]
}] });
function XR(e, t) {
  return { key: e, value: t };
}
i(XR, "makeKeyValuePair");
class Lr {
  static {
    i(this, "KeyValuePipe");
  }
  constructor(t) {
    this.differs = t, this.keyValues = [], this.compareFn = km;
  }
  transform(t, n = km) {
    if (!t || !(t instanceof Map) && typeof t != "object")
      return null;
    this.differ ??= this.differs.find(t).create();
    const r = this.differ.diff(t), o = n !== this.compareFn;
    return r && (this.keyValues = [], r.forEachItem((s) => {
      this.keyValues.push(XR(s.key, s.currentValue));
    })), (r || o) && (this.keyValues.sort(n), this.compareFn = n), this.keyValues;
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Lr, deps: [{ token: dt }], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Lr, isStandalone: !0, name: "keyvalue", pure: !1 });
  }
}
H({ type: Lr, decorators: [{
  type: ct,
  args: [{
    name: "keyvalue",
    pure: !1,
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: dt }], "ctorParameters") });
function km(e, t) {
  const n = e.key, r = t.key;
  if (n === r)
    return 0;
  if (n === void 0)
    return 1;
  if (r === void 0)
    return -1;
  if (n === null)
    return 1;
  if (r === null)
    return -1;
  if (typeof n == "string" && typeof r == "string")
    return n < r ? -1 : 1;
  if (typeof n == "number" && typeof r == "number")
    return n - r;
  if (typeof n == "boolean" && typeof r == "boolean")
    return n < r ? -1 : 1;
  const o = String(n), s = String(r);
  return o == s ? 0 : o < s ? -1 : 1;
}
i(km, "defaultComparator");
class Gn {
  static {
    i(this, "DecimalPipe");
  }
  constructor(t) {
    this._locale = t;
  }
  /**
   * @param value The value to be formatted.
   * @param digitsInfo Sets digit and decimal representation.
   * [See more](#digitsinfo).
   * @param locale Specifies what locale format rules to use.
   * [See more](#locale).
   */
  transform(t, n, r) {
    if (!Tp(t))
      return null;
    r ||= this._locale;
    try {
      const o = Ap(t);
      return $R(o, r, n);
    } catch (o) {
      throw zt(Gn, o.message);
    }
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Gn, deps: [{ token: ze }], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Gn, isStandalone: !0, name: "number" });
  }
}
H({ type: Gn, decorators: [{
  type: ct,
  args: [{
    name: "number",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: void 0, decorators: [{
  type: ht,
  args: [ze]
}] }], "ctorParameters") });
class Wn {
  static {
    i(this, "PercentPipe");
  }
  constructor(t) {
    this._locale = t;
  }
  /**
   *
   * @param value The number to be formatted as a percentage.
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `0`.
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `0`.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n-common-locale-id).
   */
  transform(t, n, r) {
    if (!Tp(t))
      return null;
    r ||= this._locale;
    try {
      const o = Ap(t);
      return jR(o, r, n);
    } catch (o) {
      throw zt(Wn, o.message);
    }
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Wn, deps: [{ token: ze }], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Wn, isStandalone: !0, name: "percent" });
  }
}
H({ type: Wn, decorators: [{
  type: ct,
  args: [{
    name: "percent",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: void 0, decorators: [{
  type: ht,
  args: [ze]
}] }], "ctorParameters") });
class qn {
  static {
    i(this, "CurrencyPipe");
  }
  constructor(t, n = "USD") {
    this._locale = t, this._defaultCurrencyCode = n;
  }
  /**
   *
   * @param value The number to be formatted as currency.
   * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code,
   * such as `USD` for the US dollar and `EUR` for the euro. The default currency code can be
   * configured using the `DEFAULT_CURRENCY_CODE` injection token.
   * @param display The format for the currency indicator. One of the following:
   *   - `code`: Show the code (such as `USD`).
   *   - `symbol`(default): Show the symbol (such as `$`).
   *   - `symbol-narrow`: Use the narrow symbol for locales that have two symbols for their
   * currency.
   * For example, the Canadian dollar CAD has the symbol `CA$` and the symbol-narrow `$`. If the
   * locale has no narrow symbol, uses the standard symbol for the locale.
   *   - String: Use the given string value instead of a code or a symbol.
   * For example, an empty string will suppress the currency & symbol.
   *   - Boolean (marked deprecated in v5): `true` for symbol and false for `code`.
   *
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `2`.
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `2`.
   * If not provided, the number will be formatted with the proper amount of digits,
   * depending on what the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) specifies.
   * For example, the Canadian dollar has 2 digits, whereas the Chilean peso has none.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n-common-locale-id).
   */
  transform(t, n = this._defaultCurrencyCode, r = "symbol", o, s) {
    if (!Tp(t))
      return null;
    s ||= this._locale, typeof r == "boolean" && ((typeof ngDevMode > "u" || ngDevMode) && console && console.warn && console.warn('Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".'), r = r ? "symbol" : "code");
    let a = n || this._defaultCurrencyCode;
    r !== "code" && (r === "symbol" || r === "symbol-narrow" ? a = yR(a, r === "symbol" ? "wide" : "narrow", s) : a = r);
    try {
      const u = Ap(t);
      return LR(u, s, a, n, o);
    } catch (u) {
      throw zt(qn, u.message);
    }
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: qn, deps: [{ token: ze }, { token: Dp }], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: qn, isStandalone: !0, name: "currency" });
  }
}
H({ type: qn, decorators: [{
  type: ct,
  args: [{
    name: "currency",
    standalone: !0
  }]
}], ctorParameters: /* @__PURE__ */ i(() => [{ type: void 0, decorators: [{
  type: ht,
  args: [ze]
}] }, { type: void 0, decorators: [{
  type: ht,
  args: [Dp]
}] }], "ctorParameters") });
function Tp(e) {
  return !(e == null || e === "" || e !== e);
}
i(Tp, "isValue");
function Ap(e) {
  if (typeof e == "string" && !isNaN(Number(e) - parseFloat(e)))
    return Number(e);
  if (typeof e != "number")
    throw new Error(`${e} is not a number`);
  return e;
}
i(Ap, "strToNumber");
class Qn {
  static {
    i(this, "SlicePipe");
  }
  transform(t, n, r) {
    if (t == null)
      return null;
    if (!this.supports(t))
      throw zt(Qn, t);
    return t.slice(n, r);
  }
  supports(t) {
    return typeof t == "string" || Array.isArray(t);
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: Qn, deps: [], target: L.Pipe });
  }
  static {
    this.ɵpipe = lt({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: Qn, isStandalone: !0, name: "slice", pure: !1 });
  }
}
H({ type: Qn, decorators: [{
  type: ct,
  args: [{
    name: "slice",
    pure: !1,
    standalone: !0
  }]
}] });
const Rm = [
  jn,
  Hn,
  $n,
  Pr,
  Qn,
  Gn,
  Wn,
  Bn,
  qn,
  Vn,
  Un,
  zn,
  Lr
];
class po {
  static {
    i(this, "CommonModule");
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: po, deps: [], target: L.NgModule });
  }
  static {
    this.ɵmod = zb({ minVersion: "14.0.0", version: "17.3.12", ngImport: w, type: po, imports: [Sr, Tr, Ar, Or, xr, Rr, jt, Fr, Nr, bn, kr, jn, Hn, $n, Pr, Qn, Gn, Wn, Bn, qn, Vn, Un, zn, Lr], exports: [Sr, Tr, Ar, Or, xr, Rr, jt, Fr, Nr, bn, kr, jn, Hn, $n, Pr, Qn, Gn, Wn, Bn, qn, Vn, Un, zn, Lr] });
  }
  static {
    this.ɵinj = Ub({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: po });
  }
}
H({ type: po, decorators: [{
  type: fp,
  args: [{
    imports: [Nm, Rm],
    exports: [Nm, Rm]
  }]
}] });
const ex = "browser", tx = "server";
function nx(e) {
  return e === ex;
}
i(nx, "isPlatformBrowser");
function rx(e) {
  return e === tx;
}
i(rx, "isPlatformServer");
new hp("17.3.12");
class ew {
  static {
    i(this, "ViewportScroller");
  }
  static {
    this.ɵprov = ne({
      token: ew,
      providedIn: "root",
      factory: /* @__PURE__ */ i(() => nx(M(Es)) ? new ox(M(li), window) : new sx(), "factory")
    });
  }
}
class ox {
  static {
    i(this, "BrowserViewportScroller");
  }
  constructor(t, n) {
    this.document = t, this.window = n, this.offset = () => [0, 0];
  }
  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   */
  setOffset(t) {
    Array.isArray(t) ? this.offset = () => t : this.offset = t;
  }
  /**
   * Retrieves the current scroll position.
   * @returns The position in screen coordinates.
   */
  getScrollPosition() {
    return [this.window.scrollX, this.window.scrollY];
  }
  /**
   * Sets the scroll position.
   * @param position The new position in screen coordinates.
   */
  scrollToPosition(t) {
    this.window.scrollTo(t[0], t[1]);
  }
  /**
   * Scrolls to an element and attempts to focus the element.
   *
   * Note that the function name here is misleading in that the target string may be an ID for a
   * non-anchor element.
   *
   * @param target The ID of an element or name of the anchor.
   *
   * @see https://html.spec.whatwg.org/#the-indicated-part-of-the-document
   * @see https://html.spec.whatwg.org/#scroll-to-fragid
   */
  scrollToAnchor(t) {
    const n = ix(this.document, t);
    n && (this.scrollToElement(n), n.focus());
  }
  /**
   * Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(t) {
    this.window.history.scrollRestoration = t;
  }
  /**
   * Scrolls to an element using the native offset and the specified offset set on this scroller.
   *
   * The offset can be used when we know that there is a floating header and scrolling naively to an
   * element (ex: `scrollIntoView`) leaves the element hidden behind the floating header.
   */
  scrollToElement(t) {
    const n = t.getBoundingClientRect(), r = n.left + this.window.pageXOffset, o = n.top + this.window.pageYOffset, s = this.offset();
    this.window.scrollTo(r - s[0], o - s[1]);
  }
}
function ix(e, t) {
  const n = e.getElementById(t) || e.getElementsByName(t)[0];
  if (n)
    return n;
  if (typeof e.createTreeWalker == "function" && e.body && typeof e.body.attachShadow == "function") {
    const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
    let o = r.currentNode;
    for (; o; ) {
      const s = o.shadowRoot;
      if (s) {
        const a = s.getElementById(t) || s.querySelector(`[name="${t}"]`);
        if (a)
          return a;
      }
      o = r.nextNode();
    }
  }
  return null;
}
i(ix, "findAnchorFromDocument");
class sx {
  static {
    i(this, "NullViewportScroller");
  }
  /**
   * Empty implementation
   */
  setOffset(t) {
  }
  /**
   * Empty implementation
   */
  getScrollPosition() {
    return [0, 0];
  }
  /**
   * Empty implementation
   */
  scrollToPosition(t) {
  }
  /**
   * Empty implementation
   */
  scrollToAnchor(t) {
  }
  /**
   * Empty implementation
   */
  setHistoryScrollRestoration(t) {
  }
}
const Op = "20";
function eo(e, t) {
  return Fp(e) ? new URL(e) : new URL(e, t.location.href);
}
i(eo, "getUrl");
function Fp(e) {
  return /^https?:\/\//.test(e);
}
i(Fp, "isAbsoluteUrl");
function xm(e) {
  return Fp(e) ? new URL(e).hostname : e;
}
i(xm, "extractHostname");
function ax(e) {
  if (!(typeof e == "string") || e.trim() === "")
    return !1;
  try {
    const n = new URL(e);
    return !0;
  } catch {
    return !1;
  }
}
i(ax, "isValidPath");
function ux(e) {
  return e.endsWith("/") ? e.slice(0, -1) : e;
}
i(ux, "normalizePath");
function cx(e) {
  return e.startsWith("/") ? e.slice(1) : e;
}
i(cx, "normalizeSrc");
const di = /* @__PURE__ */ i((e) => e.src, "noopImageLoader"), tw = new $(ngDevMode ? "ImageLoader" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => di, "factory")
});
function Ic(e, t) {
  return /* @__PURE__ */ i(function(r) {
    return ax(r) || lx(r, t || []), r = ux(r), [{ provide: tw, useValue: /* @__PURE__ */ i((a) => (Fp(a.src) && dx(r, a.src), e(r, { ...a, src: cx(a.src) })), "loaderFn") }];
  }, "provideImageLoader");
}
i(Ic, "createImageLoader");
function lx(e, t) {
  throw new I(2959, ngDevMode && `Image loader has detected an invalid path (\`${e}\`). To fix this, supply a path using one of the following formats: ${t.join(" or ")}`);
}
i(lx, "throwInvalidPathError");
function dx(e, t) {
  throw new I(2959, ngDevMode && `Image loader has detected a \`<img>\` tag with an invalid \`ngSrc\` attribute: ${t}. This image loader expects \`ngSrc\` to be a relative URL - however the provided value is an absolute URL. To fix this, provide \`ngSrc\` as a path relative to the base URL configured for this loader (\`${e}\`).`);
}
i(dx, "throwUnexpectedAbsoluteUrlError");
Ic(fx, ngDevMode ? ["https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>"] : void 0);
function fx(e, t) {
  let n = "format=auto";
  return t.width && (n += `,width=${t.width}`), t.isPlaceholder && (n += `,quality=${Op}`), `${e}/cdn-cgi/image/${n}/${t.src}`;
}
i(fx, "createCloudflareUrl");
const hx = {
  name: "Cloudinary",
  testUrl: gx
}, px = /https?\:\/\/[^\/]+\.cloudinary\.com\/.+/;
function gx(e) {
  return px.test(e);
}
i(gx, "isCloudinaryUrl");
Ic(mx, ngDevMode ? [
  "https://res.cloudinary.com/mysite",
  "https://mysite.cloudinary.com",
  "https://subdomain.mysite.com"
] : void 0);
function mx(e, t) {
  let r = `f_auto,${t.isPlaceholder ? "q_auto:low" : "q_auto"}`;
  return t.width && (r += `,w_${t.width}`), `${e}/image/upload/${r}/${t.src}`;
}
i(mx, "createCloudinaryUrl");
const yx = {
  name: "ImageKit",
  testUrl: vx
}, Dx = /https?\:\/\/[^\/]+\.imagekit\.io\/.+/;
function vx(e) {
  return Dx.test(e);
}
i(vx, "isImageKitUrl");
Ic(Ix, ngDevMode ? ["https://ik.imagekit.io/mysite", "https://subdomain.mysite.com"] : void 0);
function Ix(e, t) {
  const { src: n, width: r } = t, o = [];
  r && o.push(`w-${r}`), t.isPlaceholder && o.push(`q-${Op}`);
  const s = o.length ? [e, `tr:${o.join(",")}`, n] : [e, n];
  return new URL(s.join("/")).href;
}
i(Ix, "createImagekitUrl");
const Cx = {
  name: "Imgix",
  testUrl: bx
}, Ex = /https?\:\/\/[^\/]+\.imgix\.net\/.+/;
function bx(e) {
  return Ex.test(e);
}
i(bx, "isImgixUrl");
Ic(wx, ngDevMode ? ["https://somepath.imgix.net/"] : void 0);
function wx(e, t) {
  const n = new URL(`${e}/${t.src}`);
  return n.searchParams.set("auto", "format"), t.width && n.searchParams.set("w", t.width.toString()), t.isPlaceholder && n.searchParams.set("q", Op), n.href;
}
i(wx, "createImgixUrl");
const Mx = {
  name: "Netlify",
  testUrl: Sx
}, _x = /https?\:\/\/[^\/]+\.netlify\.app\/.+/;
function Sx(e) {
  return _x.test(e);
}
i(Sx, "isNetlifyUrl");
function ae(e, t = !0) {
  return `The NgOptimizedImage directive ${t ? `(activated on an <img> element with the \`ngSrc="${e}"\`) ` : ""}has detected that`;
}
i(ae, "imgDirectiveDetails");
function nw(e) {
  if (!ngDevMode)
    throw new I(2958, `Unexpected invocation of the ${e} in the prod mode. Please make sure that the prod mode is enabled for production builds.`);
}
i(nw, "assertDevMode");
class ns {
  static {
    i(this, "LCPImageObserver");
  }
  constructor() {
    this.images = /* @__PURE__ */ new Map(), this.window = null, this.observer = null, nw("LCP checker");
    const t = M(li).defaultView;
    typeof t < "u" && typeof PerformanceObserver < "u" && (this.window = t, this.observer = this.initPerformanceObserver());
  }
  /**
   * Inits PerformanceObserver and subscribes to LCP events.
   * Based on https://web.dev/lcp/#measure-lcp-in-javascript
   */
  initPerformanceObserver() {
    const t = new PerformanceObserver((n) => {
      const r = n.getEntries();
      if (r.length === 0)
        return;
      const s = r[r.length - 1].element?.src ?? "";
      if (s.startsWith("data:") || s.startsWith("blob:"))
        return;
      const a = this.images.get(s);
      a && (!a.priority && !a.alreadyWarnedPriority && (a.alreadyWarnedPriority = !0, Tx(s)), a.modified && !a.alreadyWarnedModified && (a.alreadyWarnedModified = !0, Ax(s)));
    });
    return t.observe({ type: "largest-contentful-paint", buffered: !0 }), t;
  }
  registerImage(t, n, r) {
    if (!this.observer)
      return;
    const o = {
      priority: r,
      modified: !1,
      alreadyWarnedModified: !1,
      alreadyWarnedPriority: !1
    };
    this.images.set(eo(t, this.window).href, o);
  }
  unregisterImage(t) {
    this.observer && this.images.delete(eo(t, this.window).href);
  }
  updateImage(t, n) {
    const r = eo(t, this.window).href, o = this.images.get(r);
    o && (o.modified = !0, this.images.set(eo(n, this.window).href, o), this.images.delete(r));
  }
  ngOnDestroy() {
    this.observer && (this.observer.disconnect(), this.images.clear());
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: ns, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: ns, providedIn: "root" });
  }
}
H({ type: ns, decorators: [{
  type: he,
  args: [{ providedIn: "root" }]
}], ctorParameters: /* @__PURE__ */ i(() => [], "ctorParameters") });
function Tx(e) {
  const t = ae(e);
  console.error(ye(2955, `${t} this image is the Largest Contentful Paint (LCP) element but was not marked "priority". This image should be marked "priority" in order to prioritize its loading. To fix this, add the "priority" attribute.`));
}
i(Tx, "logMissingPriorityError");
function Ax(e) {
  const t = ae(e);
  console.warn(ye(2964, `${t} this image is the Largest Contentful Paint (LCP) element and has had its "ngSrc" attribute modified. This can cause slower loading performance. It is recommended not to modify the "ngSrc" property on any image which could be the LCP element.`));
}
i(Ax, "logModifiedWarning");
const Ox = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "0.0.0.0"]), Fx = new $(ngDevMode ? "PRECONNECT_CHECK_BLOCKLIST" : "");
class rs {
  static {
    i(this, "PreconnectLinkChecker");
  }
  constructor() {
    this.document = M(li), this.preconnectLinks = null, this.alreadySeen = /* @__PURE__ */ new Set(), this.window = null, this.blocklist = new Set(Ox), nw("preconnect link checker");
    const t = this.document.defaultView;
    typeof t < "u" && (this.window = t);
    const n = M(Fx, { optional: !0 });
    n && this.populateBlocklist(n);
  }
  populateBlocklist(t) {
    Array.isArray(t) ? rw(t, (n) => {
      this.blocklist.add(xm(n));
    }) : this.blocklist.add(xm(t));
  }
  /**
   * Checks that a preconnect resource hint exists in the head for the
   * given src.
   *
   * @param rewrittenSrc src formatted with loader
   * @param originalNgSrc ngSrc value
   */
  assertPreconnect(t, n) {
    if (!this.window)
      return;
    const r = eo(t, this.window);
    this.blocklist.has(r.hostname) || this.alreadySeen.has(r.origin) || (this.alreadySeen.add(r.origin), this.preconnectLinks ??= this.queryPreconnectLinks(), this.preconnectLinks.has(r.origin) || console.warn(ye(2956, `${ae(n)} there is no preconnect tag present for this image. Preconnecting to the origin(s) that serve priority images ensures that these images are delivered as soon as possible. To fix this, please add the following element into the <head> of the document:
  <link rel="preconnect" href="${r.origin}">`)));
  }
  queryPreconnectLinks() {
    const t = /* @__PURE__ */ new Set(), r = Array.from(this.document.querySelectorAll("link[rel=preconnect]"));
    for (let o of r) {
      const s = eo(o.href, this.window);
      t.add(s.origin);
    }
    return t;
  }
  ngOnDestroy() {
    this.preconnectLinks?.clear(), this.alreadySeen.clear();
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: rs, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: rs, providedIn: "root" });
  }
}
H({ type: rs, decorators: [{
  type: he,
  args: [{ providedIn: "root" }]
}], ctorParameters: /* @__PURE__ */ i(() => [], "ctorParameters") });
function rw(e, t) {
  for (let n of e)
    Array.isArray(n) ? rw(n, t) : t(n);
}
i(rw, "deepForEach");
const Pm = 5, Nx = new $("NG_OPTIMIZED_PRELOADED_IMAGES", {
  providedIn: "root",
  factory: /* @__PURE__ */ i(() => /* @__PURE__ */ new Set(), "factory")
});
class os {
  static {
    i(this, "PreloadLinkCreator");
  }
  constructor() {
    this.preloadedImages = M(Nx), this.document = M(li);
  }
  /**
   * @description Add a preload `<link>` to the `<head>` of the `index.html` that is served from the
   * server while using Angular Universal and SSR to kick off image loads for high priority images.
   *
   * The `sizes` (passed in from the user) and `srcset` (parsed and formatted from `ngSrcset`)
   * properties used to set the corresponding attributes, `imagesizes` and `imagesrcset`
   * respectively, on the preload `<link>` tag so that the correctly sized image is preloaded from
   * the CDN.
   *
   * {@link https://web.dev/preload-responsive-images/#imagesrcset-and-imagesizes}
   *
   * @param renderer The `Renderer2` passed in from the directive
   * @param src The original src of the image that is set on the `ngSrc` input.
   * @param srcset The parsed and formatted srcset created from the `ngSrcset` input
   * @param sizes The value of the `sizes` attribute passed in to the `<img>` tag
   */
  createPreloadLinkTag(t, n, r, o) {
    if (ngDevMode && this.preloadedImages.size >= Pm)
      throw new I(2961, ngDevMode && `The \`NgOptimizedImage\` directive has detected that more than ${Pm} images were marked as priority. This might negatively affect an overall performance of the page. To fix this, remove the "priority" attribute from images with less priority.`);
    if (this.preloadedImages.has(n))
      return;
    this.preloadedImages.add(n);
    const s = t.createElement("link");
    t.setAttribute(s, "as", "image"), t.setAttribute(s, "href", n), t.setAttribute(s, "rel", "preload"), t.setAttribute(s, "fetchpriority", "high"), o && t.setAttribute(s, "imageSizes", o), r && t.setAttribute(s, "imageSrcset", r), t.appendChild(this.document.head, s);
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: os, deps: [], target: L.Injectable });
  }
  static {
    this.ɵprov = Ct({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: os, providedIn: "root" });
  }
}
H({ type: os, decorators: [{
  type: he,
  args: [{ providedIn: "root" }]
}] });
const Lm = 50, ow = /^((\s*\d+w\s*(,|$)){1,})$/, kx = /^((\s*\d+(\.\d+)?x\s*(,|$)){1,})$/, tl = 3, Oi = 2, Rx = [1, 2], xx = 640, jm = 0.1, $m = 1e3, Px = 1920, Lx = 1080, jx = 15, Bm = 4e3, Hm = 1e4, $x = [
  Cx,
  yx,
  hx,
  Mx
];
class su {
  static {
    i(this, "NgOptimizedImage");
  }
  constructor() {
    this.imageLoader = M(tw), this.config = Bx(M(lf)), this.renderer = M(Zo), this.imgElement = M(on).nativeElement, this.injector = M(xe), this.isServer = rx(M(Es)), this.preloadLinkCreator = M(os), this.lcpObserver = ngDevMode ? this.injector.get(ns) : null, this._renderedSrc = null, this.priority = !1, this.disableOptimizedSrcset = !1, this.fill = !1;
  }
  /** @nodoc */
  ngOnInit() {
    if (St("NgOptimizedImage"), ngDevMode) {
      const t = this.injector.get(de);
      iw(this, "ngSrc", this.ngSrc), Yx(this, this.ngSrcset), Hx(this), this.ngSrcset && Vx(this), Ux(this), Zx(this), this.fill ? (nP(this), t.runOutsideAngular(() => rP(this, this.imgElement, this.renderer))) : (tP(this), this.height !== void 0 && Vm(this, this.height, "height"), this.width !== void 0 && Vm(this, this.width, "width"), t.runOutsideAngular(() => eP(this, this.imgElement, this.renderer))), oP(this), this.ngSrcset || zx(this), Gx(this, this.imageLoader), iP(this.ngSrc, this.imageLoader), sP(this, this.imageLoader), aP(this, this.imageLoader), this.lcpObserver !== null && this.injector.get(de).runOutsideAngular(() => {
        this.lcpObserver.registerImage(this.getRewrittenSrc(), this.ngSrc, this.priority);
      }), this.priority && this.injector.get(rs).assertPreconnect(this.getRewrittenSrc(), this.ngSrc);
    }
    this.placeholder && this.removePlaceholderOnLoad(this.imgElement), this.setHostAttributes();
  }
  setHostAttributes() {
    this.fill ? this.sizes ||= "100vw" : (this.setHostAttribute("width", this.width.toString()), this.setHostAttribute("height", this.height.toString())), this.setHostAttribute("loading", this.getLoadingBehavior()), this.setHostAttribute("fetchpriority", this.getFetchPriority()), this.setHostAttribute("ng-img", "true");
    const t = this.updateSrcAndSrcset();
    this.sizes && this.setHostAttribute("sizes", this.sizes), this.isServer && this.priority && this.preloadLinkCreator.createPreloadLinkTag(this.renderer, this.getRewrittenSrc(), t, this.sizes);
  }
  /** @nodoc */
  ngOnChanges(t) {
    if (ngDevMode && Xx(this, t, [
      "ngSrcset",
      "width",
      "height",
      "priority",
      "fill",
      "loading",
      "sizes",
      "loaderParams",
      "disableOptimizedSrcset"
    ]), t.ngSrc && !t.ngSrc.isFirstChange()) {
      const n = this._renderedSrc;
      this.updateSrcAndSrcset(!0);
      const r = this._renderedSrc;
      this.lcpObserver !== null && n && r && n !== r && this.injector.get(de).runOutsideAngular(() => {
        this.lcpObserver?.updateImage(n, r);
      });
    }
  }
  callImageLoader(t) {
    let n = t;
    return this.loaderParams && (n.loaderParams = this.loaderParams), this.imageLoader(n);
  }
  getLoadingBehavior() {
    return !this.priority && this.loading !== void 0 ? this.loading : this.priority ? "eager" : "lazy";
  }
  getFetchPriority() {
    return this.priority ? "high" : "auto";
  }
  getRewrittenSrc() {
    if (!this._renderedSrc) {
      const t = { src: this.ngSrc };
      this._renderedSrc = this.callImageLoader(t);
    }
    return this._renderedSrc;
  }
  getRewrittenSrcset() {
    const t = ow.test(this.ngSrcset);
    return this.ngSrcset.split(",").filter((r) => r !== "").map((r) => {
      r = r.trim();
      const o = t ? parseFloat(r) : parseFloat(r) * this.width;
      return `${this.callImageLoader({ src: this.ngSrc, width: o })} ${r}`;
    }).join(", ");
  }
  getAutomaticSrcset() {
    return this.sizes ? this.getResponsiveSrcset() : this.getFixedSrcset();
  }
  getResponsiveSrcset() {
    const { breakpoints: t } = this.config;
    let n = t;
    return this.sizes?.trim() === "100vw" && (n = t.filter((o) => o >= xx)), n.map((o) => `${this.callImageLoader({ src: this.ngSrc, width: o })} ${o}w`).join(", ");
  }
  updateSrcAndSrcset(t = !1) {
    t && (this._renderedSrc = null);
    const n = this.getRewrittenSrc();
    this.setHostAttribute("src", n);
    let r;
    return this.ngSrcset ? r = this.getRewrittenSrcset() : this.shouldGenerateAutomaticSrcset() && (r = this.getAutomaticSrcset()), r && this.setHostAttribute("srcset", r), r;
  }
  getFixedSrcset() {
    return Rx.map((n) => `${this.callImageLoader({
      src: this.ngSrc,
      width: this.width * n
    })} ${n}x`).join(", ");
  }
  shouldGenerateAutomaticSrcset() {
    let t = !1;
    return this.sizes || (t = this.width > Px || this.height > Lx), !this.disableOptimizedSrcset && !this.srcset && this.imageLoader !== di && !t;
  }
  /**
   * Returns an image url formatted for use with the CSS background-image property. Expects one of:
   * * A base64 encoded image, which is wrapped and passed through.
   * * A boolean. If true, calls the image loader to generate a small placeholder url.
   */
  generatePlaceholder(t) {
    const { placeholderResolution: n } = this.config;
    return t === !0 ? `url(${this.callImageLoader({
      src: this.ngSrc,
      width: n,
      isPlaceholder: !0
    })})` : typeof t == "string" && t.startsWith("data:") ? `url(${t})` : null;
  }
  /**
   * Determines if blur should be applied, based on an optional boolean
   * property `blur` within the optional configuration object `placeholderConfig`.
   */
  shouldBlurPlaceholder(t) {
    return !t || !t.hasOwnProperty("blur") ? !0 : !!t.blur;
  }
  removePlaceholderOnLoad(t) {
    const n = /* @__PURE__ */ i(() => {
      const s = this.injector.get(ci);
      r(), o(), this.placeholder = !1, s.markForCheck();
    }, "callback"), r = this.renderer.listen(t, "load", n), o = this.renderer.listen(t, "error", n);
  }
  /** @nodoc */
  ngOnDestroy() {
    ngDevMode && !this.priority && this._renderedSrc !== null && this.lcpObserver !== null && this.lcpObserver.unregisterImage(this._renderedSrc);
  }
  setHostAttribute(t, n) {
    this.renderer.setAttribute(this.imgElement, t, n);
  }
  static {
    this.ɵfac = V({ minVersion: "12.0.0", version: "17.3.12", ngImport: w, type: su, deps: [], target: L.Directive });
  }
  static {
    this.ɵdir = It({ minVersion: "16.1.0", version: "17.3.12", type: su, isStandalone: !0, selector: "img[ngSrc]", inputs: { ngSrc: ["ngSrc", "ngSrc", sw], ngSrcset: "ngSrcset", sizes: "sizes", width: ["width", "width", es], height: ["height", "height", es], loading: "loading", priority: ["priority", "priority", Pn], loaderParams: "loaderParams", disableOptimizedSrcset: ["disableOptimizedSrcset", "disableOptimizedSrcset", Pn], fill: ["fill", "fill", Pn], placeholder: ["placeholder", "placeholder", aw], placeholderConfig: "placeholderConfig", src: "src", srcset: "srcset" }, host: { properties: { "style.position": 'fill ? "absolute" : null', "style.width": 'fill ? "100%" : null', "style.height": 'fill ? "100%" : null', "style.inset": 'fill ? "0" : null', "style.background-size": 'placeholder ? "cover" : null', "style.background-position": 'placeholder ? "50% 50%" : null', "style.background-repeat": 'placeholder ? "no-repeat" : null', "style.background-image": "placeholder ? generatePlaceholder(placeholder) : null", "style.filter": 'placeholder && shouldBlurPlaceholder(placeholderConfig) ? "blur(15px)" : null' } }, usesOnChanges: !0, ngImport: w });
  }
}
H({ type: su, decorators: [{
  type: ut,
  args: [{
    standalone: !0,
    selector: "img[ngSrc]",
    host: {
      "[style.position]": 'fill ? "absolute" : null',
      "[style.width]": 'fill ? "100%" : null',
      "[style.height]": 'fill ? "100%" : null',
      "[style.inset]": 'fill ? "0" : null',
      "[style.background-size]": 'placeholder ? "cover" : null',
      "[style.background-position]": 'placeholder ? "50% 50%" : null',
      "[style.background-repeat]": 'placeholder ? "no-repeat" : null',
      "[style.background-image]": "placeholder ? generatePlaceholder(placeholder) : null",
      "[style.filter]": `placeholder && shouldBlurPlaceholder(placeholderConfig) ? "blur(${jx}px)" : null`
    }
  }]
}], propDecorators: { ngSrc: [{
  type: q,
  args: [{ required: !0, transform: sw }]
}], ngSrcset: [{
  type: q
}], sizes: [{
  type: q
}], width: [{
  type: q,
  args: [{ transform: es }]
}], height: [{
  type: q,
  args: [{ transform: es }]
}], loading: [{
  type: q
}], priority: [{
  type: q,
  args: [{ transform: Pn }]
}], loaderParams: [{
  type: q
}], disableOptimizedSrcset: [{
  type: q,
  args: [{ transform: Pn }]
}], fill: [{
  type: q,
  args: [{ transform: Pn }]
}], placeholder: [{
  type: q,
  args: [{ transform: aw }]
}], placeholderConfig: [{
  type: q
}], src: [{
  type: q
}], srcset: [{
  type: q
}] } });
function Bx(e) {
  let t = {};
  return e.breakpoints && (t.breakpoints = e.breakpoints.sort((n, r) => n - r)), Object.assign({}, cf, e, t);
}
i(Bx, "processConfig");
function Hx(e) {
  if (e.src)
    throw new I(2950, `${ae(e.ngSrc)} both \`src\` and \`ngSrc\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`src\` itself based on the value of \`ngSrc\`. To fix this, please remove the \`src\` attribute.`);
}
i(Hx, "assertNoConflictingSrc");
function Vx(e) {
  if (e.srcset)
    throw new I(2951, `${ae(e.ngSrc)} both \`srcset\` and \`ngSrcset\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`srcset\` itself based on the value of \`ngSrcset\`. To fix this, please remove the \`srcset\` attribute.`);
}
i(Vx, "assertNoConflictingSrcset");
function Ux(e) {
  let t = e.ngSrc.trim();
  if (t.startsWith("data:"))
    throw t.length > Lm && (t = t.substring(0, Lm) + "..."), new I(2952, `${ae(e.ngSrc, !1)} \`ngSrc\` is a Base64-encoded string (${t}). NgOptimizedImage does not support Base64-encoded strings. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a standard \`src\` attribute instead.`);
}
i(Ux, "assertNotBase64Image");
function zx(e) {
  if (e.sizes?.match(/((\)|,)\s|^)\d+px/))
    throw new I(2952, `${ae(e.ngSrc, !1)} \`sizes\` was set to a string including pixel values. For automatic \`srcset\` generation, \`sizes\` must only include responsive values, such as \`sizes="50vw"\` or \`sizes="(min-width: 768px) 50vw, 100vw"\`. To fix this, modify the \`sizes\` attribute, or provide your own \`ngSrcset\` value directly.`);
}
i(zx, "assertNoComplexSizes");
function Gx(e, t) {
  Wx(e), qx(e, t), Qx(e);
}
i(Gx, "assertValidPlaceholder");
function Wx(e) {
  if (e.placeholderConfig && !e.placeholder)
    throw new I(2952, `${ae(e.ngSrc, !1)} \`placeholderConfig\` options were provided for an image that does not use the \`placeholder\` attribute, and will have no effect.`);
}
i(Wx, "assertNoPlaceholderConfigWithoutPlaceholder");
function qx(e, t) {
  if (e.placeholder === !0 && t === di)
    throw new I(2963, `${ae(e.ngSrc)} the \`placeholder\` attribute is set to true but no image loader is configured (i.e. the default one is being used), which would result in the same image being used for the primary image and its placeholder. To fix this, provide a loader or remove the \`placeholder\` attribute from the image.`);
}
i(qx, "assertNoRelativePlaceholderWithoutLoader");
function Qx(e) {
  if (e.placeholder && typeof e.placeholder == "string" && e.placeholder.startsWith("data:")) {
    if (e.placeholder.length > Hm)
      throw new I(2965, `${ae(e.ngSrc)} the \`placeholder\` attribute is set to a data URL which is longer than ${Hm} characters. This is strongly discouraged, as large inline placeholders directly increase the bundle size of Angular and hurt page load performance. To fix this, generate a smaller data URL placeholder.`);
    e.placeholder.length > Bm && console.warn(ye(2965, `${ae(e.ngSrc)} the \`placeholder\` attribute is set to a data URL which is longer than ${Bm} characters. This is discouraged, as large inline placeholders directly increase the bundle size of Angular and hurt page load performance. For better loading performance, generate a smaller data URL placeholder.`));
  }
}
i(Qx, "assertNoOversizedDataUrl");
function Zx(e) {
  const t = e.ngSrc.trim();
  if (t.startsWith("blob:"))
    throw new I(2952, `${ae(e.ngSrc)} \`ngSrc\` was set to a blob URL (${t}). Blob URLs are not supported by the NgOptimizedImage directive. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a regular \`src\` attribute instead.`);
}
i(Zx, "assertNotBlobUrl");
function iw(e, t, n) {
  const r = typeof n == "string", o = r && n.trim() === "";
  if (!r || o)
    throw new I(2952, `${ae(e.ngSrc)} \`${t}\` has an invalid value (\`${n}\`). To fix this, change the value to a non-empty string.`);
}
i(iw, "assertNonEmptyInput");
function Yx(e, t) {
  if (t == null)
    return;
  iw(e, "ngSrcset", t);
  const n = t, r = ow.test(n), o = kx.test(n);
  if (o && Kx(e, n), !(r || o))
    throw new I(2952, `${ae(e.ngSrc)} \`ngSrcset\` has an invalid value (\`${t}\`). To fix this, supply \`ngSrcset\` using a comma-separated list of one or more width descriptors (e.g. "100w, 200w") or density descriptors (e.g. "1x, 2x").`);
}
i(Yx, "assertValidNgSrcset");
function Kx(e, t) {
  if (!t.split(",").every((r) => r === "" || parseFloat(r) <= tl))
    throw new I(2952, `${ae(e.ngSrc)} the \`ngSrcset\` contains an unsupported image density:\`${t}\`. NgOptimizedImage generally recommends a max image density of ${Oi}x but supports image densities up to ${tl}x. The human eye cannot distinguish between image densities greater than ${Oi}x - which makes them unnecessary for most use cases. Images that will be pinch-zoomed are typically the primary use case for ${tl}x images. Please remove the high density descriptor and try again.`);
}
i(Kx, "assertUnderDensityCap");
function Jx(e, t) {
  let n;
  return t === "width" || t === "height" ? n = `Changing \`${t}\` may result in different attribute value applied to the underlying image element and cause layout shifts on a page.` : n = `Changing the \`${t}\` would have no effect on the underlying image element, because the resource loading has already occurred.`, new I(2953, `${ae(e.ngSrc)} \`${t}\` was updated after initialization. The NgOptimizedImage directive will not react to this input change. ${n} To fix this, either switch \`${t}\` to a static value or wrap the image element in an *ngIf that is gated on the necessary value.`);
}
i(Jx, "postInitInputChangeError");
function Xx(e, t, n) {
  n.forEach((r) => {
    if (t.hasOwnProperty(r) && !t[r].isFirstChange())
      throw r === "ngSrc" && (e = { ngSrc: t[r].previousValue }), Jx(e, r);
  });
}
i(Xx, "assertNoPostInitInputChange");
function Vm(e, t, n) {
  const r = typeof t == "number" && t > 0, o = typeof t == "string" && /^\d+$/.test(t.trim()) && parseInt(t) > 0;
  if (!r && !o)
    throw new I(2952, `${ae(e.ngSrc)} \`${n}\` has an invalid value. To fix this, provide \`${n}\` as a number greater than 0.`);
}
i(Vm, "assertGreaterThanZero");
function eP(e, t, n) {
  const r = n.listen(t, "load", () => {
    r(), o();
    const s = window.getComputedStyle(t);
    let a = parseFloat(s.getPropertyValue("width")), u = parseFloat(s.getPropertyValue("height"));
    if (s.getPropertyValue("box-sizing") === "border-box") {
      const _ = s.getPropertyValue("padding-top"), R = s.getPropertyValue("padding-right"), W = s.getPropertyValue("padding-bottom"), le = s.getPropertyValue("padding-left");
      a -= parseFloat(R) + parseFloat(le), u -= parseFloat(_) + parseFloat(W);
    }
    const l = a / u, d = a !== 0 && u !== 0, f = t.naturalWidth, h = t.naturalHeight, p = f / h, g = e.width, m = e.height, v = g / m, C = Math.abs(v - p) > jm, D = d && Math.abs(p - l) > jm;
    if (C)
      console.warn(ye(2952, `${ae(e.ngSrc)} the aspect ratio of the image does not match the aspect ratio indicated by the width and height attributes. 
Intrinsic image size: ${f}w x ${h}h (aspect-ratio: ${sa(p)}). 
Supplied width and height attributes: ${g}w x ${m}h (aspect-ratio: ${sa(v)}). 
To fix this, update the width and height attributes.`));
    else if (D)
      console.warn(ye(2952, `${ae(e.ngSrc)} the aspect ratio of the rendered image does not match the image's intrinsic aspect ratio. 
Intrinsic image size: ${f}w x ${h}h (aspect-ratio: ${sa(p)}). 
Rendered image size: ${a}w x ${u}h (aspect-ratio: ${sa(l)}). 
This issue can occur if "width" and "height" attributes are added to an image without updating the corresponding image styling. To fix this, adjust image styling. In most cases, adding "height: auto" or "width: auto" to the image styling will fix this issue.`));
    else if (!e.ngSrcset && d) {
      const _ = Oi * a, R = Oi * u, W = f - _ >= $m, le = h - R >= $m;
      (W || le) && console.warn(ye(2960, `${ae(e.ngSrc)} the intrinsic image is significantly larger than necessary. 
Rendered image size: ${a}w x ${u}h. 
Intrinsic image size: ${f}w x ${h}h. 
Recommended intrinsic image size: ${_}w x ${R}h. 
Note: Recommended intrinsic image size is calculated assuming a maximum DPR of ${Oi}. To improve loading time, resize the image or consider using the "ngSrcset" and "sizes" attributes.`));
    }
  }), o = n.listen(t, "error", () => {
    r(), o();
  });
}
i(eP, "assertNoImageDistortion");
function tP(e) {
  let t = [];
  if (e.width === void 0 && t.push("width"), e.height === void 0 && t.push("height"), t.length > 0)
    throw new I(2954, `${ae(e.ngSrc)} these required attributes are missing: ${t.map((n) => `"${n}"`).join(", ")}. Including "width" and "height" attributes will prevent image-related layout shifts. To fix this, include "width" and "height" attributes on the image tag or turn on "fill" mode with the \`fill\` attribute.`);
}
i(tP, "assertNonEmptyWidthAndHeight");
function nP(e) {
  if (e.width || e.height)
    throw new I(2952, `${ae(e.ngSrc)} the attributes \`height\` and/or \`width\` are present along with the \`fill\` attribute. Because \`fill\` mode causes an image to fill its containing element, the size attributes have no effect and should be removed.`);
}
i(nP, "assertEmptyWidthAndHeight");
function rP(e, t, n) {
  const r = n.listen(t, "load", () => {
    r(), o();
    const s = t.clientHeight;
    e.fill && s === 0 && console.warn(ye(2952, `${ae(e.ngSrc)} the height of the fill-mode image is zero. This is likely because the containing element does not have the CSS 'position' property set to one of the following: "relative", "fixed", or "absolute". To fix this problem, make sure the container element has the CSS 'position' property defined and the height of the element is not zero.`));
  }), o = n.listen(t, "error", () => {
    r(), o();
  });
}
i(rP, "assertNonZeroRenderedHeight");
function oP(e) {
  if (e.loading && e.priority)
    throw new I(2952, `${ae(e.ngSrc)} the \`loading\` attribute was used on an image that was marked "priority". Setting \`loading\` on priority images is not allowed because these images will always be eagerly loaded. To fix this, remove the “loading” attribute from the priority image.`);
  const t = ["auto", "eager", "lazy"];
  if (typeof e.loading == "string" && !t.includes(e.loading))
    throw new I(2952, `${ae(e.ngSrc)} the \`loading\` attribute has an invalid value (\`${e.loading}\`). To fix this, provide a valid value ("lazy", "eager", or "auto").`);
}
i(oP, "assertValidLoadingInput");
function iP(e, t) {
  if (t === di) {
    let n = "";
    for (const r of $x)
      if (r.testUrl(e)) {
        n = r.name;
        break;
      }
    n && console.warn(ye(2962, `NgOptimizedImage: It looks like your images may be hosted on the ${n} CDN, but your app is not using Angular's built-in loader for that CDN. We recommend switching to use the built-in by calling \`provide${n}Loader()\` in your \`providers\` and passing it your instance's base URL. If you don't want to use the built-in loader, define a custom loader function using IMAGE_LOADER to silence this warning.`));
  }
}
i(iP, "assertNotMissingBuiltInLoader");
function sP(e, t) {
  e.ngSrcset && t === di && console.warn(ye(2963, `${ae(e.ngSrc)} the \`ngSrcset\` attribute is present but no image loader is configured (i.e. the default one is being used), which would result in the same image being used for all configured sizes. To fix this, provide a loader or remove the \`ngSrcset\` attribute from the image.`));
}
i(sP, "assertNoNgSrcsetWithoutLoader");
function aP(e, t) {
  e.loaderParams && t === di && console.warn(ye(2963, `${ae(e.ngSrc)} the \`loaderParams\` attribute is present but no image loader is configured (i.e. the default one is being used), which means that the loaderParams data will not be consumed and will not affect the URL. To fix this, provide a custom loader or remove the \`loaderParams\` attribute from the image.`));
}
i(aP, "assertNoLoaderParamsWithoutLoader");
function sa(e) {
  return Number.isInteger(e) ? e : e.toFixed(2);
}
i(sa, "round");
function sw(e) {
  return typeof e == "string" ? e : sn(e);
}
i(sw, "unwrapSafeUrl");
function aw(e) {
  return typeof e == "string" && e.startsWith("data:") ? e : Pn(e);
}
i(aw, "booleanOrDataUrlAttribute");
var uP = Object.getOwnPropertyDescriptor, cP = /* @__PURE__ */ i((e, t, n, r) => {
  for (var o = r > 1 ? void 0 : r ? uP(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(o) || o);
  return o;
}, "__decorateClass");
let Um = class {
  static {
    i(this, "HelloComponent");
  }
  constructor() {
    this.counter = 0;
  }
};
Um = cP([
  ib({
    selector: "hello-module",
    standalone: !0,
    imports: [po],
    template: `
    <div class="hello-module-container">
      <h1>🎉 Hello from Hello Module!</h1>
      <p>This is a <strong>standalone component</strong> loaded dynamically at runtime!</p>
      <p>Module version: <code>2.0.0</code></p>
      <button (click)="counter = counter + 1">
        Clicked {{ counter }} times
      </button>
    </div>
  `,
    styles: [`
    .hello-module-container {
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    
    .hello-module-container h1 {
      margin: 0 0 1rem 0;
      font-size: 2rem;
    }
    
    .hello-module-container p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .hello-module-container code {
      background: rgba(255,255,255,0.2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    
    .hello-module-container button {
      margin-top: 1.5rem;
      padding: 0.8rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .hello-module-container button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
  `]
  })
], Um);
export {
  Um as default
};
//# sourceMappingURL=plugin.mjs.map
