/*
SpiderGL Computer Graphics Library
Copyright (c) 2010, Marco Di Benedetto - Visual Computing Lab, ISTI - CNR
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of SpiderGL nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var SpiderGL = {
  TAG: 0,
  openNamespace: function(e) {
      e = SpiderGL.Utility.getDefaultObject({
          globalObject: SpiderGL.openNamespace.DEFAULT_GLOBAL_OBJECT,
          constantPrefix: SpiderGL.openNamespace.DEFAULT_CONSTANT_PREFIX,
          functionPrefix: SpiderGL.openNamespace.DEFAULT_FUNCTION_PREFIX,
          classPrefix: SpiderGL.openNamespace.DEFAULT_CLASS_PREFIX
      }, e);
      var t = new RegExp("^(([_$0-9A-Z])+)$");

      function r(e) {
          return t.test(e)
      }
      var i = new RegExp("^([A-Z])");
      var n = new RegExp("^(([a-z])+([_$0-9A-Za-z])*)$");

      function a(e) {
          return e.substr(0, 1).toUpperCase() + e.substr(1)
      }
      var s = {},
          o = {},
          u = {};

      function d(e) {
          var t, a;
          if (e)
              for (var d in e)
                  if ("_" != d.substr(0, 1)) {
                      var p = e[d];
                      a = d, i.test(a) && !r(a) ? s[d] = p : (t = d, n.test(t) ? o[d] = p : r(d) && (u[d] = p))
                  }
      }
      var p = ["Core", "DOM", "IO", "Math", "Mesh", "Model", "Semantic", "Space", "Type", "UserInterface", "Utility", "Version", "WebGL"];
      for (var h in p) d(SpiderGL[p[h]]);
      for (var h in s) {
          var _ = e.classPrefix + a(h);
          e.globalObject[_] = s[h]
      }
      for (var h in o) {
          _ = e.functionPrefix + a(h);
          e.globalObject[_] = o[h]
      }
      for (var h in u) {
          _ = e.constantPrefix + a(h);
          e.globalObject[_] = u[h]
      }
  }
};
SpiderGL.openNamespace.DEFAULT_GLOBAL_OBJECT = window, SpiderGL.openNamespace.DEFAULT_CONSTANT_PREFIX = "SGL_", SpiderGL.openNamespace.DEFAULT_FUNCTION_PREFIX = "sgl", SpiderGL.openNamespace.DEFAULT_CLASS_PREFIX = "Sgl", SpiderGL.Version = {}, SpiderGL.Version.VERSION_MAJOR = 0, SpiderGL.Version.VERSION_MINOR = 2, SpiderGL.Version.VERSION_REVISION = 1, SpiderGL.Version.VERSION_STRING = SpiderGL.Version.VERSION_MAJOR + "." + SpiderGL.Version.VERSION_MINOR + "." + SpiderGL.Version.VERSION_REVISION, SpiderGL.Core = {}, SpiderGL.Core.DEFAULT = {}, SpiderGL.Core.DONT_CARE = {}, SpiderGL.Core.EMPTY_STRING = "", SpiderGL.Core.EMPTY_OBJECT = {}, SpiderGL.Core.EMPTY_ARRAY = [], SpiderGL.Core.EMPTY_FUNCTION = function() {}, SpiderGL.Core.generateUID = function() {
  return SpiderGL.Core.generateUID._lastUID++, SpiderGL.Core.generateUID._lastUID
}, SpiderGL.Core.generateUID._lastUID = 0, SpiderGL.Core.ObjectBase = function() {
  this._uid = SpiderGL.Core.generateUID()
}, SpiderGL.Core.ObjectBase.prototype = {
  get uid() {
      return this._uid
  }
}, SpiderGL.Type = {}, SpiderGL.Type.LITTLE_ENDIAN = function() {
  var e = new Uint8Array([18, 52]);
  return 13330 == new Uint16Array(e.buffer)[0]
}(), SpiderGL.Type.BIG_ENDIAN = !SpiderGL.Type.BIG_ENDIAN, SpiderGL.Type.NO_TYPE = 0, SpiderGL.Type.INT8 = 1, SpiderGL.Type.UINT8 = 2, SpiderGL.Type.INT16 = 3, SpiderGL.Type.UINT16 = 4, SpiderGL.Type.INT32 = 5, SpiderGL.Type.UINT32 = 6, SpiderGL.Type.FLOAT32 = 7, SpiderGL.Type.SIZEOF_INT8 = Int8Array.BYTES_PER_ELEMENT, SpiderGL.Type.SIZEOF_UINT8 = Uint8Array.BYTES_PER_ELEMENT, SpiderGL.Type.SIZEOF_INT16 = Int16Array.BYTES_PER_ELEMENT, SpiderGL.Type.SIZEOF_UINT16 = Uint16Array.BYTES_PER_ELEMENT, SpiderGL.Type.SIZEOF_INT32 = Int32Array.BYTES_PER_ELEMENT, SpiderGL.Type.SIZEOF_UINT32 = Uint32Array.BYTES_PER_ELEMENT, SpiderGL.Type.SIZEOF_FLOAT32 = Float32Array.BYTES_PER_ELEMENT, SpiderGL.Type.typeSize = function() {
  var e = {};
  return e[SpiderGL.Type.NO_TYPE] = 0, e[SpiderGL.Type.INT8] = SpiderGL.Type.SIZEOF_INT8, e[SpiderGL.Type.UINT8] = SpiderGL.Type.SIZEOF_UINT8, e[SpiderGL.Type.INT16] = SpiderGL.Type.SIZEOF_INT16, e[SpiderGL.Type.UINT16] = SpiderGL.Type.SIZEOF_UINT16, e[SpiderGL.Type.INT32] = SpiderGL.Type.SIZEOF_INT32, e[SpiderGL.Type.UINT32] = SpiderGL.Type.SIZEOF_UINT32, e[SpiderGL.Type.FLOAT32] = SpiderGL.Type.SIZEOF_FLOAT32,
      function(t) {
          return e[t]
      }
}(), SpiderGL.Type.typeToGL = function() {
  var e = {};
  return e[SpiderGL.Type.NO_TYPE] = WebGLRenderingContext.prototype.NONE, e[SpiderGL.Type.INT8] = WebGLRenderingContext.prototype.BYTE, e[SpiderGL.Type.UINT8] = WebGLRenderingContext.prototype.UNSIGNED_BYTE, e[SpiderGL.Type.INT16] = WebGLRenderingContext.prototype.SHORT, e[SpiderGL.Type.UINT16] = WebGLRenderingContext.prototype.UNSIGNED_SHORT, e[SpiderGL.Type.INT32] = WebGLRenderingContext.prototype.INT, e[SpiderGL.Type.UINT32] = WebGLRenderingContext.prototype.UNSIGNED_INT, e[SpiderGL.Type.FLOAT32] = WebGLRenderingContext.prototype.FLOAT,
      function(t) {
          return e[t]
      }
}(), SpiderGL.Type.typeFromGL = function() {
  var e = {};
  return e[WebGLRenderingContext.prototype.NONE] = SpiderGL.Type.NO_TYPE, e[WebGLRenderingContext.prototype.BYTE] = SpiderGL.Type.INT8, e[WebGLRenderingContext.prototype.UNSIGNED_BYTE] = SpiderGL.Type.UINT8, e[WebGLRenderingContext.prototype.SHORT] = SpiderGL.Type.INT16, e[WebGLRenderingContext.prototype.UNSIGNED_SHORT] = SpiderGL.Type.UINT16, e[WebGLRenderingContext.prototype.INT] = SpiderGL.Type.INT32, e[WebGLRenderingContext.prototype.UNSIGNED_INT] = SpiderGL.Type.UINT32, e[WebGLRenderingContext.prototype.FLOAT] = SpiderGL.Type.FLOAT32,
      function(t) {
          return e[t]
      }
}(), SpiderGL.Type.typeSizeFromGL = function(e) {
  var t = SpiderGL.Type.typeFromGL(e);
  return SpiderGL.Type.typeSize(t)
}, SpiderGL.Type.typeToTypedArrayConstructor = function() {
  var e = {};
  return e[SpiderGL.Type.NO_TYPE] = ArrayBuffer, e[SpiderGL.Type.INT8] = Int8Array, e[SpiderGL.Type.UINT8] = Uint8Array, e[SpiderGL.Type.INT16] = Int16Array, e[SpiderGL.Type.UINT16] = Uint16Array, e[SpiderGL.Type.INT32] = Int32Array, e[SpiderGL.Type.UINT32] = Uint32Array, e[SpiderGL.Type.FLOAT32] = Float32Array,
      function(t) {
          return e[t]
      }
}(), SpiderGL.Type.POINTS = 0, SpiderGL.Type.LINES = 1, SpiderGL.Type.LINE_LOOP = 2, SpiderGL.Type.LINE_STRIP = 3, SpiderGL.Type.TRIANGLES = 4, SpiderGL.Type.TRIANGLE_FAN = 5, SpiderGL.Type.TRIANGLE_STRIP = 6, SpiderGL.Type.primitiveToGL = function() {
  var e = {};
  return e[SpiderGL.Type.POINTS] = WebGLRenderingContext.prototype.POINTS, e[SpiderGL.Type.LINES] = WebGLRenderingContext.prototype.LINES, e[SpiderGL.Type.LINE_LOOP] = WebGLRenderingContext.prototype.LINE_LOOP, e[SpiderGL.Type.LINE_STRIP] = WebGLRenderingContext.prototype.LINE_STRIP, e[SpiderGL.Type.TRIANGLES] = WebGLRenderingContext.prototype.TRIANGLES, e[SpiderGL.Type.TRIANGLE_FAN] = WebGLRenderingContext.prototype.TRIANGLE_FAN, e[SpiderGL.Type.TRIANGLE_STRIP] = WebGLRenderingContext.prototype.TRIANGLE_STRIP,
      function(t) {
          return e[t]
      }
}(), SpiderGL.Type.instanceOf = function(e, t) {
  return e instanceof t
}, SpiderGL.Type.isNumber = function(e) {
  return "number" == typeof e
}, SpiderGL.Type.isString = function(e) {
  return "string" == typeof e
}, SpiderGL.Type.isFunction = function(e) {
  return "function" == typeof e
}, SpiderGL.Type.isArray = function(e) {
  return e && e.constructor === Array
}, SpiderGL.Type.isTypedArray = function(e) {
  return e && void 0 !== e.buffer && e.buffer instanceof ArrayBuffer
}, SpiderGL.Type.extend = function(e, t) {
  function r() {}
  r.prototype = t.prototype;
  var i = e.prototype,
      n = new r;
  n.constructor = e;
  var a = null,
      s = null;
  for (var o in i)(a = i.__lookupGetter__(o)) && n.__defineGetter__(o, a), (s = i.__lookupSetter__(o)) && n.__defineSetter__(o, s), a || s || (n[o] = i[o]);
  e.prototype = n
}, SpiderGL.Type.defineClassGetter = function(e, t, r) {
  e.prototype.__defineGetter__(t, r)
}, SpiderGL.Type.defineClassSetter = function(e, t, r) {
  e.prototype.__defineSetter__(t, r)
}, SpiderGL.Type.defineObjectGetter = function(e, t, r) {
  e.__defineGetter__(t, r)
}, SpiderGL.Type.defineObjectSetter = function(e, t, r) {
  e.__defineSetter__(t, r)
}, SpiderGL.Utility = {}, SpiderGL.Utility.getDefaultValue = function(e, t) {
  return void 0 === e || e === SpiderGL.Core.DEFAULT ? t : e
}, SpiderGL.Utility.getDefaultObject = function(e, t) {
  if (t) {
      var r = SpiderGL.Core.DEFAULT;
      for (var i in t) t[i] != r && (e[i] = t[i])
  }
  return e
}, SpiderGL.Utility.setDefaultValues = function(e, t) {
  if (!t) return e;
  var r = SpiderGL.Core.DEFAULT;
  for (var i in t) t[i] == r && void 0 !== e[i] && (t[i] = e[i]);
  for (var i in e) void 0 === t[i] && (t[i] = e[i]);
  return t
}, SpiderGL.Utility.getAttrib4fv = function(e) {
  return SpiderGL.Type.isNumber(e) ? [e, 0, 0, 1] : e ? [null != e[0] ? e[0] : 0, null != e[1] ? e[1] : 0, null != e[2] ? e[2] : 0, null != e[3] ? e[3] : 1] : [0, 0, 0, 1]
}, SpiderGL.Utility.getTime = function() {
  return (new Date).getTime()
}, SpiderGL.Utility.Timer = function() {
  this._tStart = -1, this._tElapsed = 0
}, SpiderGL.Utility.Timer.prototype = {
  _accumElapsed: function() {
      this._tElapsed += this.now - this._tStart
  },
  get now() {
      return Date.now()
  },
  start: function() {
      this.isStarted || this.isPaused || (this._tStart = this.now, this._tElapsed = 0)
  },
  restart: function() {
      var e = this.elapsed;
      return this._tStart = this.now, this._tElapsed = 0, e
  },
  stop: function() {
      this.isStarted && (this.isPaused || (this._accumElapsed(), this._tStart = -1))
  },
  get isStarted() {
      return this._tStart >= 0
  },
  pause: function() {
      this.isStarted && (this.isPaused || (this._accumElapsed(), this._tStart = -2))
  },
  resume: function() {
      this.isStarted && this.isPaused && (this._tStart = this.now)
  },
  get isPaused() {
      return -2 == this._tStart
  },
  get elapsed() {
      return this.isStarted ? this._tElapsed + (this.now - this._tStart) : this._tElapsed
  }
}, SpiderGL.Utility.Browser = function() {}, SpiderGL.Utility.Browser.prototype = {
  get isOpera() {
      return !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0
  },
  get isFirefox() {
      return "undefined" != typeof InstallTrigger || navigator.userAgent.toLowerCase().indexOf("fxios") > -1
  },
  get isSafari() {
      return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) || /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || "undefined" != typeof safari && safari.pushNotification).toString()
  },
  get isIE() {
      return !!document.documentMode
  },
  get isEdge() {
      return !this.isIE && !!window.StyleMedia
  },
  get isChrome() {
      return !!window.chrome && !!window.chrome.webstore
  }
}, SpiderGL.DOM = {}, SpiderGL.DOM.getElementById = function(e) {
  return document.getElementById(e)
}, SpiderGL.DOM.getElementText = function(e) {
  var t = document.getElementById(e);
  if (!t) return null;
  var r = "";
  for (t = t.firstChild; t;) 3 == t.nodeType && (r += t.textContent), t = t.nextSibling;
  return r
}, SpiderGL.IO = {}, SpiderGL.IO.Request = function(e, t) {
  SpiderGL.Core.ObjectBase.call(this), t = SpiderGL.Utility.getDefaultObject({
      async: SpiderGL.IO.Request.DEFAULT_ASYNC,
      send: SpiderGL.IO.Request.DEFAULT_SEND,
      onProgress: null,
      onCancel: null,
      onError: null,
      onSuccess: null,
      onFinish: null
  }, t), this._url = e, this._async = t.async, this._status = SpiderGL.IO.Request.NONE, this._sent = !1, this._aborted = !1, this._data = null, this._loaded = 0, this._total = 0, this._events = {
      progress: {
          main: null,
          listeners: []
      },
      cancel: {
          main: null,
          listeners: []
      },
      error: {
          main: null,
          listeners: []
      },
      success: {
          main: null,
          listeners: []
      },
      finish: {
          main: null,
          listeners: []
      }
  }, this.onProgress = t.onProgress, this.onCancel = t.onCancel, this.onError = t.onError, this.onSuccess = t.onSuccess, this.onFinish = t.onFinish
}, SpiderGL.IO.Request.NONE = 0, SpiderGL.IO.Request.ONGOING = 1, SpiderGL.IO.Request.CANCELLED = 2, SpiderGL.IO.Request.FAILED = 3, SpiderGL.IO.Request.SUCCEEDED = 4, SpiderGL.IO.Request.DEFAULT_ASYNC = !0, SpiderGL.IO.Request.DEFAULT_SEND = !0, SpiderGL.IO.Request.prototype = {
  _indexOf: function(e, t) {
      for (var r = 0, i = e.length; r < i; ++r)
          if (e[r] == t) return r;
      return -1
  },
  _setMainListener: function(e, t) {
      var r = this._events[e];
      r && r.main != t && (t ? this.addEventListener(e, t) : this.removeEventListener(e, t), r.main = t)
  },
  _dispatch: function() {
      var e = arguments[0],
          t = this._events[e];
      if (t) {
          var r = Array.prototype.slice.call(arguments, 1);
          r.push(this);
          for (var i = t.listeners, n = 0, a = i.length; n < a; ++n) i[n].apply(null, r)
      }
  },
  _doPostProgress: function() {},
  _doPostCancel: function() {},
  _doPostError: function() {},
  _doPostSuccess: function() {},
  _doPostFinish: function() {},
  _doOnProgress: function(e, t) {
      this._aborted || (this._loaded = e, this._total = t, this._doPostProgress(), this._dispatch("progress", this._loaded, this._total))
  },
  _doOnCancel: function() {
      this._aborted || (this._status = SpiderGL.IO.Request.CANCELLED, this._finishTime = SpiderGL.Utility.getTime(), this._doPostCancel(), this._dispatch("cancel"))
  },
  _doOnError: function() {
      this._aborted || (this._status = SpiderGL.IO.Request.FAILED, this._finishTime = SpiderGL.Utility.getTime(), this._doPostError(), this._dispatch("error"))
  },
  _doOnSuccess: function() {
      this._aborted || (this._status = SpiderGL.IO.Request.SUCCEEDED, this._finishTime = SpiderGL.Utility.getTime(), this._doPostSuccess(), this._dispatch("success"))
  },
  _doOnFinish: function() {
      this._doPostFinish(), this._dispatch("finish")
  },
  _doSend: function() {
      return !1
  },
  _doCancel: function() {
      return !1
  },
  get canSend() {
      return this._url && !this._sent
  },
  get url() {
      return this._url
  },
  set url(e) {
      this.cancel(), this._url = e
  },
  get status() {
      return this._status
  },
  get data() {
      return this._data
  },
  get bytesLoaded() {
      return this._loaded
  },
  get bytesTotal() {
      return this._total
  },
  get sent() {
      return this._sent
  },
  get ongoing() {
      return this._status == SpiderGL.IO.Request.ONGOING
  },
  get cancelled() {
      return this._status == SpiderGL.IO.Request.CANCELLED
  },
  get failed() {
      return this._status == SpiderGL.IO.Request.FAILED
  },
  get succeeded() {
      return this._status == SpiderGL.IO.Request.SUCCEEDED
  },
  get finished() {
      return this.succeeded || this.failed || this.cancelled
  },
  get startTime() {
      return this._startTime
  },
  get finishTime() {
      return this._finishTime
  },
  get elapsedTime() {
      return this._startTime < 0 ? 0 : this._finishTime < 0 ? SpiderGL.Utility.getTime() - this._startTime : this._finishTime - this._startTime
  },
  addEventListener: function(e, t) {
      if (t) {
          var r = this._events[e];
          if (r) this._indexOf(r.listeners, t) >= 0 || r.listeners.push(t)
      }
  },
  removeEventListener: function(e, t) {
      var r = this._events[e];
      if (r) {
          var i = this._indexOf(r.listeners, t);
          i < 0 || r.listeners.splice(i, 1)
      }
  },
  get onProgress() {
      return this._events.progress.main
  },
  set onProgress(e) {
      this._setMainListener("progress", e)
  },
  get onCancel() {
      return this._events.cancel.main
  },
  set onCancel(e) {
      this._setMainListener("cancel", e)
  },
  get onError() {
      return this._events.error.main
  },
  set onError(e) {
      this._setMainListener("error", e)
  },
  get onSuccess() {
      return this._events.success.main
  },
  set onSuccess(e) {
      this._setMainListener("success", e)
  },
  get onFinish() {
      return this._events.finish.main
  },
  set onFinish(e) {
      this._setMainListener("finish", e)
  },
  cancel: function() {
      if (!this.ongoing) return !1;
      this._status = SpiderGL.IO.Request.CANCELLED, this._aborted = !0;
      var e = this._doCancel();
      return this._finishTime = SpiderGL.Utility.getTime(), e
  },
  send: function() {
      if (!this.canSend) return !1;
      this._data = null, this._status = SpiderGL.IO.Request.ONGOING, this._aborted = !1, this._sent = !0, this._finishTime = -1, this._startTime = SpiderGL.Utility.getTime();
      var e = this._doSend();
      return e || (this._startTime = -1, this._status = SpiderGL.IO.Request.NONE, this._sent = !1), e
  }
}, SpiderGL.Type.extend(SpiderGL.IO.Request, SpiderGL.Core.ObjectBase), SpiderGL.IO.XHRRequestBase = function(e, t) {
  t = t || {}, SpiderGL.IO.Request.call(this, e, t);
  var r = this,
      i = new XMLHttpRequest;
  if (this._xhr = i, i.onprogress = function(e) {
          r._xhrOnProgress(e)
      }, i.onabort = function() {
          r._doOnCancel(), r._doOnFinish()
      }, i.onerror = function() {
          r._doOnError(), r._doOnFinish()
      }, i.onload = function() {
          var e = i.status;
          0 === e || 200 === e || r._range && 206 == e ? r._doOnSuccess() : r._doOnError(), r._doOnFinish()
      }, this._range = null, this._xhr.open("GET", this._url, this._async), "range" in t) {
      this._range = [t.range[0], t.range[1]];
      var n = "bytes=" + t.range[0] + "-" + t.range[1];
      i.setRequestHeader("Range", n)
  }
  this._prepareXHR(), SpiderGL.Utility.getDefaultValue(t.send, SpiderGL.IO.Request.DEFAULT_SEND) && this.send()
}, SpiderGL.IO.XHRRequestBase.prototype = {
  _prepareXHR: function() {},
  _doCancel: function() {
      return this._xhr.abort(), this._xhr = new XMLHttpRequest, this._xhr.open("GET", this._url, this._async), this._prepareXHR(), !0
  },
  _doSend: function() {
      return this._xhr.send(), !0
  },
  _xhrOnProgress: function(e) {
      var t = 0,
          r = 0;
      e && e.lengthComputable && (t = e.loaded, r = e.total), this._doOnProgress(t, r)
  }
}, SpiderGL.Type.extend(SpiderGL.IO.XHRRequestBase, SpiderGL.IO.Request), SpiderGL.IO.XHRRequest = function(e, t) {
  SpiderGL.IO.XHRRequestBase.call(this, e, t)
}, SpiderGL.IO.XHRRequest.prototype = {
  _doPostSuccess: function() {
      this._data = this._xhr.responseText
  },
  get xhr() {
      return this._xhr
  },
  get response() {
      return this.data
  }
}, SpiderGL.Type.extend(SpiderGL.IO.XHRRequest, SpiderGL.IO.XHRRequestBase), SpiderGL.IO.TextRequest = function(e, t) {
  SpiderGL.IO.XHRRequestBase.call(this, e, t)
}, SpiderGL.IO.TextRequest.prototype = {
  _doPostSuccess: function() {
      this._data = this._xhr.responseText
  },
  get text() {
      return this.data
  }
}, SpiderGL.Type.extend(SpiderGL.IO.TextRequest, SpiderGL.IO.XHRRequestBase), SpiderGL.IO.readText = function(e) {
  return new SpiderGL.IO.TextRequest(e, {
      async: !1
  }).text
}, SpiderGL.IO.requestText = function(e, t) {
  return (t = SpiderGL.Utility.getDefaultObject({}, t)).async = !0, t.send = !0, new SpiderGL.IO.TextRequest(e, t)
}, SpiderGL.IO.JSONRequest = function(e, t) {
  SpiderGL.IO.XHRRequestBase.call(this, e, t)
}, SpiderGL.IO.JSONRequest.prototype = {
  _doPostSuccess: function() {
      this._data = JSON.parse(this._xhr.responseText)
  },
  get text() {
      return this._xhr.responseText
  },
  get json() {
      return this.data
  }
}, SpiderGL.Type.extend(SpiderGL.IO.JSONRequest, SpiderGL.IO.XHRRequestBase), SpiderGL.IO.readJSON = function(e) {
  return new SpiderGL.IO.JSONRequest(e, {
      async: !1
  }).json
}, SpiderGL.IO.requestJSON = function(e, t) {
  return (t = SpiderGL.Utility.getDefaultObject({}, t)).async = !0, t.send = !0, new SpiderGL.IO.JSONRequest(e, t)
}, SpiderGL.IO.BinaryRequest = function(e, t) {
  SpiderGL.IO.XHRRequestBase.call(this, e, t)
}, SpiderGL.IO.BinaryRequest.prototype = {
  _prepareXHR: function() {
      var e = this._xhr;
      e.responseType = "arraybuffer"
  },
  _setArrayBuffer: function() {
      var e = this._xhr;
      if ("arraybuffer" == e.responseType) this._data = e.response;
      else if (null != e.mozResponseArrayBuffer) this._data = e.mozResponseArrayBuffer;
      else if (null != e.responseText) {
          for (var t = new String(e.responseText), r = new Array(t.length), i = 0, n = t.length; i < n; ++i) r[i] = 255 & t.charCodeAt(i);
          this._data = new Uint8Array(r).buffer
      } else this._data = null
  },
  _doPostSuccess: function() {
      this._setArrayBuffer()
  },
  get data() {
      return this.ongoing && this._setArrayBuffer(), this._data
  },
  get buffer() {
      return this.data
  }
}, SpiderGL.Type.extend(SpiderGL.IO.BinaryRequest, SpiderGL.IO.XHRRequestBase), SpiderGL.IO.readBinary = function(e) {
  return new SpiderGL.IO.BinaryRequest(e, {
      async: !1
  }).buffer
}, SpiderGL.IO.requestBinary = function(e, t) {
  return (t = SpiderGL.Utility.getDefaultObject({}, t)).async = !0, t.send = !0, new SpiderGL.IO.BinaryRequest(e, t)
}, SpiderGL.IO.ImageRequest = function(e, t) {
  t = t || {}, SpiderGL.IO.Request.call(this, e, t);
  var r = this,
      i = new Image;
  this._img = i, this._data = i, i.onabort = function() {
      r._doOnCancel(), r._doOnFinish()
  }, i.onerror = function() {
      r._doOnError(), r._doOnFinish()
  }, i.onload = function() {
      r._doOnSuccess(), r._doOnFinish()
  }, void 0 !== i.onprogress && (i.onprogress = function(e) {
      r._imgOnProgress(e)
  }), SpiderGL.Utility.getDefaultValue(t.send, SpiderGL.IO.Request.DEFAULT_SEND) && this.send()
}, SpiderGL.IO.ImageRequest.prototype = {
  _doPostSuccess: function() {
      this._data = this._img
  },
  _doCancel: function() {
      return this._img.src = null, this._img = new Image, !0
  },
  _doSend: function() {
      return this._img.src = this._url, !0
  },
  _imgOnProgress: function(e) {
      var t = 0,
          r = 0;
      e && e.lengthComputable && (t = e.loaded, r = e.total), this._doOnProgress(t, r)
  },
  get image() {
      return this.data
  }
}, SpiderGL.Type.extend(SpiderGL.IO.ImageRequest, SpiderGL.IO.Request), SpiderGL.IO.requestImage = function(e, t) {
  return (t = SpiderGL.Utility.getDefaultObject({}, t)).async = !0, t.send = !0, new SpiderGL.IO.ImageRequest(e, t)
}, SpiderGL.IO.AggregateRequest = function(e) {
  e = e || {}, SpiderGL.IO.Request.call(this, "*", e);
  var t = this;
  this._proxyOnProgress = function(e, r, i) {
      t._reqOnProgress(e, r, i)
  }, this._proxyOnCancel = function(e) {
      t._reqOnCancel(e)
  }, this._proxyOnError = function(e) {
      t._reqOnError(e)
  }, this._proxyOnSuccess = function(e) {
      t._reqOnSuccess(e)
  }, this._proxyOnFinish = function(e) {
      t._reqOnFinish(e)
  }, this._aggrStartTime = -1, this._aggrFinishTime = -1, this._eventReq = null, this._cancelledReqs = 0, this._failedReqs = 0, this._succeededReqs = 0, this._requests = [];
  var r = e.requests;
  if (r)
      for (var i = 0, n = r.length; i < n; ++i) {
          var a = r[i];
          a && !a.sent && (this._installProxies(a), this.addRequest(a))
      }
  SpiderGL.Utility.getDefaultValue(e.send, SpiderGL.IO.Request.DEFAULT_SEND) && this.send()
}, SpiderGL.IO.AggregateRequest.prototype = {
  _doPostCancel: function() {
      this._requestsFinished || (this._status = SpiderGL.IO.Request.ONGOING)
  },
  _doPostError: function() {
      this._requestsFinished || (this._status = SpiderGL.IO.Request.ONGOING)
  },
  _doPostSuccess: function() {
      this._requestsFinished || (this._status = SpiderGL.IO.Request.ONGOING)
  },
  _doCancel: function() {
      for (var e = this._requests, t = 0, r = e.length; t < r; ++t) e[t].cancel();
      this._aggrFinishTime = SpiderGL.Utility.getTime()
  },
  _doSend: function() {
      this._aggrStartTime = SpiderGL.Utility.getTime();
      for (var e = this._requests, t = 0, r = e.length; t < r; ++t) e[t].send()
  },
  get _requestsFinished() {
      return this._cancelledReqs + this._failedReqs + this._succeededReqs == this._requests.length
  },
  _installProxies: function(e) {
      e.addEventListener("progress", this._proxyOnProgress), e.addEventListener("cancel", this._proxyOnCancel), e.addEventListener("error", this._proxyOnError), e.addEventListener("success", this._proxyOnSuccess), e.addEventListener("finish", this._proxyOnFinish)
  },
  _uninstallProxies: function(e) {
      e.removeEventListener("progress", this._proxyOnProgress), e.removeEventListener("cancel", this._proxyOnCancel), e.removeEventListener("error", this._proxyOnError), e.removeEventListener("success", this._proxyOnSuccess), e.removeEventListener("finish", this._proxyOnFinish)
  },
  _reqOnProgress: function(e, t, r) {
      this._indexOf(this._requests, r) < 0 || (this._eventReq = r, this._doOnProgress(e, t), this._eventReq = null)
  },
  _reqOnCancel: function(e) {
      this._indexOf(this._requests, e) < 0 || (this._eventReq = e, this._cancelledReqs++, this._requestsFinished && (this._aggrFinishTime = SpiderGL.Utility.getTime(), this._cancelledReqs == this._requests.length && (this._eventReq = this, this._doOnCancel())), this._eventReq = null)
  },
  _reqOnError: function(e) {
      this._indexOf(this._requests, e) < 0 || (this._eventReq = e, this._failedReqs++, this._requestsFinished && (this._aggrFinishTime = SpiderGL.Utility.getTime(), this._eventReq = this, this._doOnError()), this._eventReq = null)
  },
  _reqOnSuccess: function(e) {
      this._indexOf(this._requests, e) < 0 || (this._eventReq = e, this._succeededReqs++, this._requestsFinished && (this._aggrFinishTime = SpiderGL.Utility.getTime(), this._eventReq = this, this._failedReqs > 0 ? this._doOnError() : this._doOnSuccess()), this._eventReq = null)
  },
  _reqOnFinish: function(e) {
      this._indexOf(this._requests, e) < 0 || (this._uninstallProxies(e), this._eventReq = e, this._requestsFinished && (this._eventReq = this, this._doOnFinish()), this._eventReq = null)
  },
  get eventSenderRequest() {
      return this._eventReq
  },
  get requests() {
      return this._requests.slice()
  },
  get requests$() {
      return this._requests
  },
  get startTime() {
      return this._aggrStartTime
  },
  get finishTime() {
      return this._aggrFinishTime
  },
  get elapsedTime() {
      return this._aggrStartTime < 0 ? 0 : this._aggrFinishTime < 0 ? SpiderGL.Utility.getTime() - this._aggrStartTime : this._aggrFinishTime - this._aggrStartTime
  },
  addRequest: function(e) {
      e && !this._sent && (this._indexOf(this._requests, e) >= 0 || this._requests.push(e))
  },
  removeRequest: function(e) {
      if (e && !this._sent) {
          var t = this._indexOf(this._requests, e);
          t < 0 || this._requests.splice(t, 1)
      }
  }
}, SpiderGL.Type.extend(SpiderGL.IO.AggregateRequest, SpiderGL.IO.Request), SpiderGL.Math = {}, SpiderGL.Math.DEG_TO_RAD = Math.PI / 180, SpiderGL.Math.E = Math.E, SpiderGL.Math.LN2 = Math.LN2, SpiderGL.Math.LN10 = Math.LN10, SpiderGL.Math.LOG2E = Math.LOG2E, SpiderGL.Math.LOG10E = Math.LOG10E, SpiderGL.Math.PI = Math.PI, SpiderGL.Math.RAD_TO_DEG = 180 / Math.PI, SpiderGL.Math.SQRT2 = Math.SQRT2, SpiderGL.Math.MAX_VALUE = Number.MAX_VALUE, SpiderGL.Math.MIN_VALUE = Number.MIN_VALUE, SpiderGL.Math.MAX_NUMBER = SpiderGL.Math.MAX_VALUE, SpiderGL.Math.MIN_NUMBER = -SpiderGL.Math.MAX_VALUE, SpiderGL.Math.NAN = Number.NaN, SpiderGL.Math.INFINITY = 1 / 0, SpiderGL.Math.abs = function(e) {
  return Math.abs(e)
}, SpiderGL.Math.acos = function(e) {
  return Math.acos(e)
}, SpiderGL.Math.asin = function(e) {
  return Math.asin(e)
}, SpiderGL.Math.atan = function(e) {
  return Math.atan(e)
}, SpiderGL.Math.atan2 = function(e, t) {
  return Math.atan2(e, t)
}, SpiderGL.Math.ceil = function(e) {
  return Math.ceil(e)
}, SpiderGL.Math.clamp = function(e, t, r) {
  return e <= t ? t : e >= r ? r : e
}, SpiderGL.Math.cos = function(e) {
  return Math.cos(e)
}, SpiderGL.Math.degToRad = function(e) {
  return e * SpiderGL.Math.DEG_TO_RAD
}, SpiderGL.Math.exp = function(e) {
  return Math.exp(e)
}, SpiderGL.Math.floor = function(e) {
  return Math.floor(e)
}, SpiderGL.Math.lerp = function(e, t, r) {
  return e + r * (t - e)
}, SpiderGL.Math.ln = function(e) {
  return Math.log(e)
}, SpiderGL.Math.log = function(e) {
  return Math.log(e)
}, SpiderGL.Math.log2 = function(e) {
  return SpiderGL.Math.log(e) / SpiderGL.Math.LN2
}, SpiderGL.Math.log10 = function(e) {
  return SpiderGL.Math.log(e) / SpiderGL.Math.LN10
}, SpiderGL.Math.max = function(e) {
  return Math.max.apply(Math, arguments)
}, SpiderGL.Math.min = function(e) {
  return Math.min.apply(Math, arguments)
}, SpiderGL.Math.pow = function(e, t) {
  return Math.pow(e, t)
}, SpiderGL.Math.radToDeg = function(e) {
  return e * SpiderGL.Math.RAD_TO_DEG
}, SpiderGL.Math.random = function() {
  return Math.random()
}, SpiderGL.Math.random01 = function() {
  return SpiderGL.Math.random()
}, SpiderGL.Math.random11 = function() {
  return 2 * SpiderGL.Math.random() - 1
}, SpiderGL.Math.randomRange = function(e, t) {
  return e + SpiderGL.Math.random() * (t - e)
}, SpiderGL.Math.round = function(e) {
  return Math.sqrt(e)
}, SpiderGL.Math.sin = function(e) {
  return Math.sin(e)
}, SpiderGL.Math.sqrt = function(e) {
  return Math.sqrt(e)
}, SpiderGL.Math.tan = function(e) {
  return Math.tan(e)
}, SpiderGL.Math.Vec2 = {}, SpiderGL.Math.Vec2.dup = function(e) {
  return e.slice(0, 2)
}, SpiderGL.Math.Vec2.scalar = function(e) {
  return [e, e]
}, SpiderGL.Math.Vec2.zero = function() {
  return [0, 0]
}, SpiderGL.Math.Vec2.one = function() {
  return [1, 1]
}, SpiderGL.Math.Vec2.maxNumber = function() {
  return [SpiderGL.Math.MAX_NUMBER, SpiderGL.Math.MAX_NUMBER]
}, SpiderGL.Math.Vec2.minNumber = function() {
  return [SpiderGL.Math.MIN_NUMBER, SpiderGL.Math.MIN_NUMBER]
}, SpiderGL.Math.Vec2.to3 = function(e, t) {
  return [e[0], e[1], null != t ? t : 0]
}, SpiderGL.Math.Vec2.to4 = function(e, t, r) {
  return [e[0], e[1], e[2], null != t ? t : 0, null != r ? r : 1]
}, SpiderGL.Math.Vec2.neg = function(e) {
  return [-e[0], -e[1]]
}, SpiderGL.Math.Vec2.add = function(e, t) {
  return [e[0] + t[0], e[1] + t[1]]
}, SpiderGL.Math.Vec2.adds = function(e, t) {
  return [e[0] + t, e[1] + t]
}, SpiderGL.Math.Vec2.sub = function(e, t) {
  return [e[0] - t[0], e[1] - t[1]]
}, SpiderGL.Math.Vec2.subs = function(e, t) {
  return [e[0] - t, e[1] - t]
}, SpiderGL.Math.Vec2.ssub = function(e, t) {
  return [e - t[0], e - t[1]]
}, SpiderGL.Math.Vec2.mul = function(e, t) {
  return [e[0] * t[0], e[1] * t[1]]
}, SpiderGL.Math.Vec2.muls = function(e, t) {
  return [e[0] * t, e[1] * t]
}, SpiderGL.Math.Vec2.div = function(e, t) {
  return [e[0] / t[0], e[1] / t[1]]
}, SpiderGL.Math.Vec2.divs = function(e, t) {
  return [e[0] / t, e[1] / t]
}, SpiderGL.Math.Vec2.sdiv = function(e, t) {
  return [e / t[0], e / t[1]]
}, SpiderGL.Math.Vec2.rcp = function(e) {
  return [1 / e[0], 1 / e[1]]
}, SpiderGL.Math.Vec2.dot = function(e, t) {
  return e[0] * t[0] + e[1] * t[1]
}, SpiderGL.Math.Vec2.cross = function(e, t) {
  return e[0] * t[1] - e[1] * t[0]
}, SpiderGL.Math.Vec2.perp = function(e) {
  return [e[1], -e[0]]
}, SpiderGL.Math.Vec2.sqLength = function(e) {
  return SpiderGL.Math.Vec2.dot(e, e)
}, SpiderGL.Math.Vec2.length = function(e) {
  return SpiderGL.Math.sqrt(SpiderGL.Math.Vec2.sqLength(e))
}, SpiderGL.Math.Vec2.normalize = function(e) {
  var t = 1 / SpiderGL.Math.Vec2.length(e);
  return SpiderGL.Math.Vec2.muls(e, t)
}, SpiderGL.Math.Vec2.abs = function(e) {
  return [SpiderGL.Math.abs(e[0]), SpiderGL.Math.abs(e[1])]
}, SpiderGL.Math.Vec2.acos = function(e) {
  return [SpiderGL.Math.acos(e[0]), SpiderGL.Math.acos(e[1])]
}, SpiderGL.Math.Vec2.asin = function(e) {
  return [SpiderGL.Math.asin(e[0]), SpiderGL.Math.asin(e[1])]
}, SpiderGL.Math.Vec2.atan = function(e) {
  return [SpiderGL.Math.atan(e[0]), SpiderGL.Math.atan(e[1])]
}, SpiderGL.Math.Vec2.atan2 = function(e, t) {
  return [SpiderGL.Math.atan2(e[0], t[0]), SpiderGL.Math.atan2(e[1], t[1])]
}, SpiderGL.Math.Vec2.ceil = function(e) {
  return [SpiderGL.Math.ceil(e[0]), SpiderGL.Math.ceil(e[1])]
}, SpiderGL.Math.Vec2.clamp = function(e, t, r) {
  return [SpiderGL.Math.clamp(e[0], t[0], r[0]), SpiderGL.Math.clamp(e[1], t[1], r[1])]
}, SpiderGL.Math.Vec2.cos = function(e) {
  return [SpiderGL.Math.cos(e[0]), SpiderGL.Math.cos(e[1])]
}, SpiderGL.Math.Vec2.degToRad = function(e) {
  return [SpiderGL.Math.degToRad(e[0]), SpiderGL.Math.degToRad(e[1])]
}, SpiderGL.Math.Vec2.exp = function(e) {
  return [SpiderGL.Math.exp(e[0]), SpiderGL.Math.exp(e[1])]
}, SpiderGL.Math.Vec2.floor = function(e) {
  return [SpiderGL.Math.floor(e[0]), SpiderGL.Math.floor(e[1])]
}, SpiderGL.Math.Vec2.lerp = function(e, t, r) {
  return [SpiderGL.Math.lerp(e[0], t[0], r), SpiderGL.Math.lerp(e[1], t[1], r)]
}, SpiderGL.Math.Vec2.ln = function(e) {
  return [SpiderGL.Math.ln(e[0]), SpiderGL.Math.ln(e[1])]
}, SpiderGL.Math.Vec2.log = function(e) {
  return [SpiderGL.Math.log(e[0]), SpiderGL.Math.log(e[1])]
}, SpiderGL.Math.Vec2.log2 = function(e) {
  return [SpiderGL.Math.log2(e[0]), SpiderGL.Math.log2(e[1])]
}, SpiderGL.Math.Vec2.log10 = function(e) {
  return [SpiderGL.Math.log10(e[0]), SpiderGL.Math.log10(e[1])]
}, SpiderGL.Math.Vec2.max = function(e, t) {
  return [SpiderGL.Math.max(e[0], t[0]), SpiderGL.Math.max(e[1], t[1])]
}, SpiderGL.Math.Vec2.min = function(e, t) {
  return [SpiderGL.Math.min(e[0], t[0]), SpiderGL.Math.min(e[1], t[1])]
}, SpiderGL.Math.Vec2.pow = function(e, t) {
  return [SpiderGL.Math.pow(e[0], t[0]), SpiderGL.Math.pow(e[1], t[1])]
}, SpiderGL.Math.Vec2.radToDeg = function(e) {
  return [SpiderGL.Math.radToDeg(e[0]), SpiderGL.Math.radToDeg(e[1])]
}, SpiderGL.Math.Vec2.random = function() {
  return [SpiderGL.Math.random(), SpiderGL.Math.random()]
}, SpiderGL.Math.Vec2.random01 = function() {
  return [SpiderGL.Math.random01(), SpiderGL.Math.random01()]
}, SpiderGL.Math.Vec2.random11 = function() {
  return [SpiderGL.Math.random11(), SpiderGL.Math.random11()]
}, SpiderGL.Math.Vec2.randomRange = function(e, t) {
  return [SpiderGL.Math.randomRange(e[0], t[0]), SpiderGL.Math.randomRange(e[1], t[1])]
}, SpiderGL.Math.Vec2.round = function(e) {
  return [SpiderGL.Math.round(e[0]), SpiderGL.Math.round(e[1])]
}, SpiderGL.Math.Vec2.sin = function(e) {
  return [SpiderGL.Math.sin(e[0]), SpiderGL.Math.sin(e[1])]
}, SpiderGL.Math.Vec2.sqrt = function(e) {
  return [SpiderGL.Math.sqrt(e[0]), SpiderGL.Math.sqrt(e[1])]
}, SpiderGL.Math.Vec2.tan = function(e) {
  return [SpiderGL.Math.tan(e[0]), SpiderGL.Math.tan(e[1])]
}, SpiderGL.Math.Vec2.copy$ = function(e, t) {
  return e[0] = t[0], e[1] = t[1], e
}, SpiderGL.Math.Vec2.neg$ = function(e) {
  return e[0] = -e[0], e[1] = -e[1], e
}, SpiderGL.Math.Vec2.add$ = function(e, t) {
  return e[0] += t[0], e[1] += t[1], e
}, SpiderGL.Math.Vec2.adds$ = function(e, t) {
  return e[0] += t, e[1] += t, e
}, SpiderGL.Math.Vec2.sub$ = function(e, t) {
  return e[0] -= t[0], e[1] -= t[1], e
}, SpiderGL.Math.Vec2.subs$ = function(e, t) {
  return e[0] -= t, e[1] -= t, e
}, SpiderGL.Math.Vec2.ssub$ = function(e, t) {
  return t[0] = e - t[0], t[1] = e - t[1], t
}, SpiderGL.Math.Vec2.mul$ = function(e, t) {
  return e[0] *= t[0], e[1] *= t[1], e
}, SpiderGL.Math.Vec2.muls$ = function(e, t) {
  return e[0] *= t, e[1] *= t, e
}, SpiderGL.Math.Vec2.div$ = function(e, t) {
  return e[0] /= t[0], e[1] /= t[1], e
}, SpiderGL.Math.Vec2.divs$ = function(e, t) {
  return e[0] /= t, e[1] /= t, e
}, SpiderGL.Math.Vec2.sdiv$ = function(e, t) {
  return e[0] = t / e[0], e[1] = t / e[1], e
}, SpiderGL.Math.Vec2.perp$ = function(e) {
  var t = e[0];
  return e[0] = e[1], e[1] = -t, e
}, SpiderGL.Math.Vec2.normalize$ = function(e) {
  var t = 1 / SpiderGL.Math.Vec2.length(e);
  return SpiderGL.Math.Vec2.muls$(e, t)
}, SpiderGL.Math.Vec3 = {}, SpiderGL.Math.Vec3.dup = function(e) {
  return e.slice(0, 3)
}, SpiderGL.Math.Vec3.scalar = function(e) {
  return [e, e, e]
}, SpiderGL.Math.Vec3.zero = function() {
  return [0, 0, 0]
}, SpiderGL.Math.Vec3.one = function() {
  return [1, 1, 1]
}, SpiderGL.Math.Vec3.maxNumber = function() {
  return [SpiderGL.Math.MAX_NUMBER, SpiderGL.Math.MAX_NUMBER, SpiderGL.Math.MAX_NUMBER]
}, SpiderGL.Math.Vec3.minNumber = function() {
  return [SpiderGL.Math.MIN_NUMBER, SpiderGL.Math.MIN_NUMBER, SpiderGL.Math.MIN_NUMBER]
}, SpiderGL.Math.Vec3.to2 = function(e) {
  return [e[0], e[1]]
}, SpiderGL.Math.Vec3.to4 = function(e, t) {
  return [e[0], e[1], e[2], null != t ? t : 1]
}, SpiderGL.Math.Vec3.neg = function(e) {
  return [-e[0], -e[1], -e[2]]
}, SpiderGL.Math.Vec3.add = function(e, t) {
  return [e[0] + t[0], e[1] + t[1], e[2] + t[2]]
}, SpiderGL.Math.Vec3.adds = function(e, t) {
  return [e[0] + t, e[1] + t, e[2] + t]
}, SpiderGL.Math.Vec3.sub = function(e, t) {
  return [e[0] - t[0], e[1] - t[1], e[2] - t[2]]
}, SpiderGL.Math.Vec3.subs = function(e, t) {
  return [e[0] - t, e[1] - t, e[2] - t]
}, SpiderGL.Math.Vec3.ssub = function(e, t) {
  return [e - t[0], e - t[1], e - t[2]]
}, SpiderGL.Math.Vec3.mul = function(e, t) {
  return [e[0] * t[0], e[1] * t[1], e[2] * t[2]]
}, SpiderGL.Math.Vec3.muls = function(e, t) {
  return [e[0] * t, e[1] * t, e[2] * t]
}, SpiderGL.Math.Vec3.div = function(e, t) {
  return [e[0] / t[0], e[1] / t[1], e[2] / t[2]]
}, SpiderGL.Math.Vec3.divs = function(e, t) {
  return [e[0] / t, e[1] / t, e[2] / t]
}, SpiderGL.Math.Vec3.sdiv = function(e, t) {
  return [e / t[0], e / t[1], e / t[2]]
}, SpiderGL.Math.Vec3.rcp = function(e) {
  return [1 / e[0], 1 / e[1], 1 / e[2]]
}, SpiderGL.Math.Vec3.dot = function(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
}, SpiderGL.Math.Vec3.cross = function(e, t) {
  return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]]
}, SpiderGL.Math.Vec3.sqLength = function(e) {
  return SpiderGL.Math.Vec3.dot(e, e)
}, SpiderGL.Math.Vec3.length = function(e) {
  return SpiderGL.Math.sqrt(SpiderGL.Math.Vec3.sqLength(e))
}, SpiderGL.Math.Vec3.normalize = function(e) {
  var t = 1 / SpiderGL.Math.Vec3.length(e);
  return SpiderGL.Math.Vec3.muls(e, t)
}, SpiderGL.Math.Vec3.abs = function(e) {
  return [SpiderGL.Math.abs(e[0]), SpiderGL.Math.abs(e[1]), SpiderGL.Math.abs(e[2])]
}, SpiderGL.Math.Vec3.acos = function(e) {
  return [SpiderGL.Math.acos(e[0]), SpiderGL.Math.acos(e[1]), SpiderGL.Math.acos(e[2])]
}, SpiderGL.Math.Vec3.asin = function(e) {
  return [SpiderGL.Math.asin(e[0]), SpiderGL.Math.asin(e[1]), SpiderGL.Math.asin(e[2])]
}, SpiderGL.Math.Vec3.atan = function(e) {
  return [SpiderGL.Math.atan(e[0]), SpiderGL.Math.atan(e[1]), SpiderGL.Math.atan(e[2])]
}, SpiderGL.Math.Vec3.atan2 = function(e, t) {
  return [SpiderGL.Math.atan2(e[0], t[0]), SpiderGL.Math.atan2(e[1], t[1]), SpiderGL.Math.atan2(e[2], t[2])]
}, SpiderGL.Math.Vec3.ceil = function(e) {
  return [SpiderGL.Math.ceil(e[0]), SpiderGL.Math.ceil(e[1]), SpiderGL.Math.ceil(e[2])]
}, SpiderGL.Math.Vec3.clamp = function(e, t, r) {
  return [SpiderGL.Math.clamp(e[0], t[0], r[0]), SpiderGL.Math.clamp(e[1], t[1], r[1]), SpiderGL.Math.clamp(e[2], t[2], r[2])]
}, SpiderGL.Math.Vec3.cos = function(e) {
  return [SpiderGL.Math.cos(e[0]), SpiderGL.Math.cos(e[1]), SpiderGL.Math.cos(e[2])]
}, SpiderGL.Math.Vec3.degToRad = function(e) {
  return [SpiderGL.Math.degToRad(e[0]), SpiderGL.Math.degToRad(e[1]), SpiderGL.Math.degToRad(e[2])]
}, SpiderGL.Math.Vec3.exp = function(e) {
  return [SpiderGL.Math.exp(e[0]), SpiderGL.Math.exp(e[1]), SpiderGL.Math.exp(e[2])]
}, SpiderGL.Math.Vec3.floor = function(e) {
  return [SpiderGL.Math.floor(e[0]), SpiderGL.Math.floor(e[1]), SpiderGL.Math.floor(e[2])]
}, SpiderGL.Math.Vec3.lerp = function(e, t, r) {
  return [SpiderGL.Math.lerp(e[0], t[0], r), SpiderGL.Math.lerp(e[1], t[1], r), SpiderGL.Math.lerp(e[2], t[2], r)]
}, SpiderGL.Math.Vec3.ln = function(e) {
  return [SpiderGL.Math.ln(e[0]), SpiderGL.Math.ln(e[1]), SpiderGL.Math.ln(e[2])]
}, SpiderGL.Math.Vec3.log = function(e) {
  return [SpiderGL.Math.log(e[0]), SpiderGL.Math.log(e[1]), SpiderGL.Math.log(e[2])]
}, SpiderGL.Math.Vec3.log2 = function(e) {
  return [SpiderGL.Math.log2(e[0]), SpiderGL.Math.log2(e[1]), SpiderGL.Math.log2(e[2])]
}, SpiderGL.Math.Vec3.log10 = function(e) {
  return [SpiderGL.Math.log10(e[0]), SpiderGL.Math.log10(e[1]), SpiderGL.Math.log10(e[2])]
}, SpiderGL.Math.Vec3.max = function(e, t) {
  return [SpiderGL.Math.max(e[0], t[0]), SpiderGL.Math.max(e[1], t[1]), SpiderGL.Math.max(e[2], t[2])]
}, SpiderGL.Math.Vec3.min = function(e, t) {
  return [SpiderGL.Math.min(e[0], t[0]), SpiderGL.Math.min(e[1], t[1]), SpiderGL.Math.min(e[2], t[2])]
}, SpiderGL.Math.Vec3.pow = function(e, t) {
  return [SpiderGL.Math.pow(e[0], t[0]), SpiderGL.Math.pow(e[1], t[1]), SpiderGL.Math.pow(e[2], t[2])]
}, SpiderGL.Math.Vec3.radToDeg = function(e) {
  return [SpiderGL.Math.radToDeg(e[0]), SpiderGL.Math.radToDeg(e[1]), SpiderGL.Math.radToDeg(e[2])]
}, SpiderGL.Math.Vec3.random = function() {
  return [SpiderGL.Math.random(), SpiderGL.Math.random(), SpiderGL.Math.random()]
}, SpiderGL.Math.Vec3.random01 = function() {
  return [SpiderGL.Math.random01(), SpiderGL.Math.random01(), SpiderGL.Math.random01()]
}, SpiderGL.Math.Vec3.random11 = function() {
  return [SpiderGL.Math.random11(), SpiderGL.Math.random11(), SpiderGL.Math.random11()]
}, SpiderGL.Math.Vec3.randomRange = function(e, t) {
  return [SpiderGL.Math.randomRange(e[0], t[0]), SpiderGL.Math.randomRange(e[1], t[1]), SpiderGL.Math.randomRange(e[2], t[2])]
}, SpiderGL.Math.Vec3.round = function(e) {
  return [SpiderGL.Math.round(e[0]), SpiderGL.Math.round(e[1]), SpiderGL.Math.round(e[2])]
}, SpiderGL.Math.Vec3.sin = function(e) {
  return [SpiderGL.Math.sin(e[0]), SpiderGL.Math.sin(e[1]), SpiderGL.Math.sin(e[2])]
}, SpiderGL.Math.Vec3.sqrt = function(e) {
  return [SpiderGL.Math.sqrt(e[0]), SpiderGL.Math.sqrt(e[1]), SpiderGL.Math.sqrt(e[2])]
}, SpiderGL.Math.Vec3.tan = function(e) {
  return [SpiderGL.Math.tan(e[0]), SpiderGL.Math.tan(e[1]), SpiderGL.Math.tan(e[2])]
}, SpiderGL.Math.Vec3.copy$ = function(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
}, SpiderGL.Math.Vec3.neg$ = function(e) {
  return e[0] = -e[0], e[1] = -e[1], e[2] = -e[2], e
}, SpiderGL.Math.Vec3.add$ = function(e, t) {
  return e[0] += t[0], e[1] += t[1], e[2] += t[2], e
}, SpiderGL.Math.Vec3.adds$ = function(e, t) {
  return e[0] += t, e[1] += t, e[2] += t, e
}, SpiderGL.Math.Vec3.sub$ = function(e, t) {
  return e[0] -= t[0], e[1] -= t[1], e[2] -= t[2], e
}, SpiderGL.Math.Vec3.subs$ = function(e, t) {
  return e[0] -= t, e[1] -= t, e[2] -= t, e
}, SpiderGL.Math.Vec3.ssub$ = function(e, t) {
  return t[0] = e - t[0], t[1] = e - t[1], t[2] = e - t[2], t
}, SpiderGL.Math.Vec3.mul$ = function(e, t) {
  return e[0] *= t[0], e[1] *= t[1], e[2] *= t[2], e
}, SpiderGL.Math.Vec3.muls$ = function(e, t) {
  return e[0] *= t, e[1] *= t, e[2] *= t, e
}, SpiderGL.Math.Vec3.div$ = function(e, t) {
  return e[0] /= t[0], e[1] /= t[1], e[2] /= t[2], e
}, SpiderGL.Math.Vec3.divs$ = function(e, t) {
  return e[0] /= t, e[1] /= t, e[2] /= t, e
}, SpiderGL.Math.Vec3.sdiv$ = function(e, t) {
  return e[0] = t / e[0], e[1] = t / e[1], e[2] = t / e[2], e
}, SpiderGL.Math.Vec3.normalize$ = function(e) {
  var t = 1 / SpiderGL.Math.Vec3.length(e);
  return SpiderGL.Math.Vec3.muls$(e, t)
}, SpiderGL.Math.Vec4 = {}, SpiderGL.Math.Vec4.dup = function(e) {
  return e.slice(0, 4)
}, SpiderGL.Math.Vec4.scalar = function(e) {
  return [e, e, e, e]
}, SpiderGL.Math.Vec4.zero = function() {
  return [0, 0, 0, 0]
}, SpiderGL.Math.Vec4.one = function() {
  return [1, 1, 1, 1]
}, SpiderGL.Math.Vec4.maxNumber = function() {
  return [SpiderGL.Math.MAX_NUMBER, SpiderGL.Math.MAX_NUMBER, SpiderGL.Math.MAX_NUMBER, SpiderGL.Math.MAX_NUMBER]
}, SpiderGL.Math.Vec4.minNumber = function() {
  return [SpiderGL.Math.MIN_NUMBER, SpiderGL.Math.MIN_NUMBER, SpiderGL.Math.MIN_NUMBER, SpiderGL.Math.MIN_NUMBER]
}, SpiderGL.Math.Vec4.to2 = function(e) {
  return [e[0], e[1]]
}, SpiderGL.Math.Vec4.to3 = function(e) {
  return [e[0], e[1], e[2]]
}, SpiderGL.Math.Vec4.neg = function(e) {
  return [-e[0], -e[1], -e[2], -e[3]]
}, SpiderGL.Math.Vec4.add = function(e, t) {
  return [e[0] + t[0], e[1] + t[1], e[2] + t[2], e[3] + t[3]]
}, SpiderGL.Math.Vec4.adds = function(e, t) {
  return [e[0] + t, e[1] + t, e[2] + t, e[3] + t]
}, SpiderGL.Math.Vec4.sub = function(e, t) {
  return [e[0] - t[0], e[1] - t[1], e[2] - t[2], e[3] - t[3]]
}, SpiderGL.Math.Vec4.subs = function(e, t) {
  return [e[0] - t, e[1] - t, e[2] - t, e[3] - t]
}, SpiderGL.Math.Vec4.ssub = function(e, t) {
  return [e - t[0], e - t[1], e - t[2], e - t[3]]
}, SpiderGL.Math.Vec4.mul = function(e, t) {
  return [e[0] * t[0], e[1] * t[1], e[2] * t[2], e[3] * t[3]]
}, SpiderGL.Math.Vec4.muls = function(e, t) {
  return [e[0] * t, e[1] * t, e[2] * t, e[3] * t]
}, SpiderGL.Math.Vec4.div = function(e, t) {
  return [e[0] / t[0], e[1] / t[1], e[2] / t[2], e[3] / t[3]]
}, SpiderGL.Math.Vec4.divs = function(e, t) {
  return [e[0] / t, e[1] / t, e[2] / t, e[3] / t]
}, SpiderGL.Math.Vec4.sdiv = function(e, t) {
  return [e / t[0], e / t[1], e / t[2], e / t[3]]
}, SpiderGL.Math.Vec4.rcp = function(e) {
  return [1 / e[0], 1 / e[1], 1 / e[2], 1 / e[3]]
}, SpiderGL.Math.Vec4.dot = function(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
}, SpiderGL.Math.Vec4.cross = function(e, t, r) {
  var i = t[0] * r[1] - t[1] * r[0],
      n = t[0] * r[2] - t[2] * r[0],
      a = t[0] * r[3] - t[3] * r[0],
      s = t[1] * r[2] - t[2] * r[1],
      o = t[1] * r[3] - t[3] * r[1],
      u = t[2] * r[3] - t[3] * r[2];
  return [e[1] * u - e[2] * o + e[3] * s, e[0] * u + e[2] * a - e[3] * n, e[0] * o - e[1] * a + e[3] * i, e[0] * s + e[1] * n - e[2] * i]
}, SpiderGL.Math.Vec4.sqLength = function(e) {
  return SpiderGL.Math.Vec4.dot(e, e)
}, SpiderGL.Math.Vec4.length = function(e) {
  return SpiderGL.Math.sqrt(SpiderGL.Math.Vec4.sqLength(e))
}, SpiderGL.Math.Vec4.normalize = function(e) {
  var t = 1 / SpiderGL.Math.Vec4.length(e);
  return SpiderGL.Math.Vec4.muls(e, t)
}, SpiderGL.Math.Vec4.project = function(e) {
  var t = 1 / e[3];
  return [e[0] * t, e[1] * t, e[2] * t, 1]
}, SpiderGL.Math.Vec4.abs = function(e) {
  return [SpiderGL.Math.abs(e[0]), SpiderGL.Math.abs(e[1]), SpiderGL.Math.abs(e[2]), SpiderGL.Math.abs(e[3])]
}, SpiderGL.Math.Vec4.acos = function(e) {
  return [SpiderGL.Math.acos(e[0]), SpiderGL.Math.acos(e[1]), SpiderGL.Math.acos(e[2]), SpiderGL.Math.acos(e[3])]
}, SpiderGL.Math.Vec4.asin = function(e) {
  return [SpiderGL.Math.asin(e[0]), SpiderGL.Math.asin(e[1]), SpiderGL.Math.asin(e[2]), SpiderGL.Math.asin(e[3])]
}, SpiderGL.Math.Vec4.atan = function(e) {
  return [SpiderGL.Math.atan(e[0]), SpiderGL.Math.atan(e[1]), SpiderGL.Math.atan(e[2]), SpiderGL.Math.atan(e[3])]
}, SpiderGL.Math.Vec4.atan2 = function(e, t) {
  return [SpiderGL.Math.atan2(e[0], t[0]), SpiderGL.Math.atan2(e[1], t[1]), SpiderGL.Math.atan2(e[2], t[2]), SpiderGL.Math.atan2(e[3], t[3])]
}, SpiderGL.Math.Vec4.ceil = function(e) {
  return [SpiderGL.Math.ceil(e[0]), SpiderGL.Math.ceil(e[1]), SpiderGL.Math.ceil(e[2]), SpiderGL.Math.ceil(e[3])]
}, SpiderGL.Math.Vec4.clamp = function(e, t, r) {
  return [SpiderGL.Math.clamp(e[0], t[0], r[0]), SpiderGL.Math.clamp(e[1], t[1], r[1]), SpiderGL.Math.clamp(e[2], t[2], r[2]), SpiderGL.Math.clamp(e[3], t[3], r[3])]
}, SpiderGL.Math.Vec4.cos = function(e) {
  return [SpiderGL.Math.cos(e[0]), SpiderGL.Math.cos(e[1]), SpiderGL.Math.cos(e[2]), SpiderGL.Math.cos(e[3])]
}, SpiderGL.Math.Vec4.degToRad = function(e) {
  return [SpiderGL.Math.degToRad(e[0]), SpiderGL.Math.degToRad(e[1]), SpiderGL.Math.degToRad(e[2]), SpiderGL.Math.degToRad(e[3])]
}, SpiderGL.Math.Vec4.exp = function(e) {
  return [SpiderGL.Math.exp(e[0]), SpiderGL.Math.exp(e[1]), SpiderGL.Math.exp(e[2]), SpiderGL.Math.exp(e[3])]
}, SpiderGL.Math.Vec4.floor = function(e) {
  return [SpiderGL.Math.floor(e[0]), SpiderGL.Math.floor(e[1]), SpiderGL.Math.floor(e[2]), SpiderGL.Math.floor(e[3])]
}, SpiderGL.Math.Vec4.lerp = function(e, t, r) {
  return [SpiderGL.Math.lerp(e[0], t[0], r), SpiderGL.Math.lerp(e[1], t[1], r), SpiderGL.Math.lerp(e[2], t[2], r), SpiderGL.Math.lerp(e[3], t[3], r)]
}, SpiderGL.Math.Vec4.ln = function(e) {
  return [SpiderGL.Math.ln(e[0]), SpiderGL.Math.ln(e[1]), SpiderGL.Math.ln(e[2]), SpiderGL.Math.ln(e[3])]
}, SpiderGL.Math.Vec4.log = function(e) {
  return [SpiderGL.Math.log(e[0]), SpiderGL.Math.log(e[1]), SpiderGL.Math.log(e[2]), SpiderGL.Math.log(e[3])]
}, SpiderGL.Math.Vec4.log2 = function(e) {
  return [SpiderGL.Math.log2(e[0]), SpiderGL.Math.log2(e[1]), SpiderGL.Math.log2(e[2]), SpiderGL.Math.log2(e[3])]
}, SpiderGL.Math.Vec4.log10 = function(e) {
  return [SpiderGL.Math.log10(e[0]), SpiderGL.Math.log10(e[1]), SpiderGL.Math.log10(e[2]), SpiderGL.Math.log10(e[3])]
}, SpiderGL.Math.Vec4.max = function(e, t) {
  return [SpiderGL.Math.max(e[0], t[0]), SpiderGL.Math.max(e[1], t[1]), SpiderGL.Math.max(e[2], t[2]), SpiderGL.Math.max(e[3], t[3])]
}, SpiderGL.Math.Vec4.min = function(e, t) {
  return [SpiderGL.Math.min(e[0], t[0]), SpiderGL.Math.min(e[1], t[1]), SpiderGL.Math.min(e[2], t[2]), SpiderGL.Math.min(e[3], t[3])]
}, SpiderGL.Math.Vec4.pow = function(e, t) {
  return [SpiderGL.Math.pow(e[0], t[0]), SpiderGL.Math.pow(e[1], t[1]), SpiderGL.Math.pow(e[2], t[2]), SpiderGL.Math.pow(e[3], t[3])]
}, SpiderGL.Math.Vec4.radToDeg = function(e) {
  return [SpiderGL.Math.radToDeg(e[0]), SpiderGL.Math.radToDeg(e[1]), SpiderGL.Math.radToDeg(e[2]), SpiderGL.Math.radToDeg(e[3])]
}, SpiderGL.Math.Vec4.random = function() {
  return [SpiderGL.Math.random(), SpiderGL.Math.random(), SpiderGL.Math.random(), SpiderGL.Math.random()]
}, SpiderGL.Math.Vec4.random01 = function() {
  return [SpiderGL.Math.random01(), SpiderGL.Math.random01(), SpiderGL.Math.random01(), SpiderGL.Math.random01()]
}, SpiderGL.Math.Vec4.random11 = function() {
  return [SpiderGL.Math.random11(), SpiderGL.Math.random11(), SpiderGL.Math.random11(), SpiderGL.Math.random11()]
}, SpiderGL.Math.Vec4.randomRange = function(e, t) {
  return [SpiderGL.Math.randomRange(e[0], t[0]), SpiderGL.Math.randomRange(e[1], t[1]), SpiderGL.Math.randomRange(e[2], t[2]), SpiderGL.Math.randomRange(e[3], t[3])]
}, SpiderGL.Math.Vec4.round = function(e) {
  return [SpiderGL.Math.round(e[0]), SpiderGL.Math.round(e[1]), SpiderGL.Math.round(e[2]), SpiderGL.Math.round(e[3])]
}, SpiderGL.Math.Vec4.sin = function(e) {
  return [SpiderGL.Math.sin(e[0]), SpiderGL.Math.sin(e[1]), SpiderGL.Math.sin(e[2]), SpiderGL.Math.sin(e[3])]
}, SpiderGL.Math.Vec4.sqrt = function(e) {
  return [SpiderGL.Math.sqrt(e[0]), SpiderGL.Math.sqrt(e[1]), SpiderGL.Math.sqrt(e[2]), SpiderGL.Math.sqrt(e[3])]
}, SpiderGL.Math.Vec4.tan = function(e) {
  return [SpiderGL.Math.tan(e[0]), SpiderGL.Math.tan(e[1]), SpiderGL.Math.tan(e[2]), SpiderGL.Math.tan(e[3])]
}, SpiderGL.Math.Vec4.copy$ = function(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
}, SpiderGL.Math.Vec4.neg$ = function(e) {
  return e[0] = -e[0], e[1] = -e[1], e[2] = -e[2], e[3] = -e[3], e
}, SpiderGL.Math.Vec4.add$ = function(e, t) {
  return e[0] += t[0], e[1] += t[1], e[2] += t[2], e[3] += t[3], e
}, SpiderGL.Math.Vec4.adds$ = function(e, t) {
  return e[0] += t, e[1] += t, e[2] += t, e[3] += t, e
}, SpiderGL.Math.Vec4.sub$ = function(e, t) {
  return e[0] -= t[0], e[1] -= t[1], e[2] -= t[2], e[3] -= t[3], e
}, SpiderGL.Math.Vec4.subs$ = function(e, t) {
  return e[0] -= t, e[1] -= t, e[2] -= t, e[3] -= t, e
}, SpiderGL.Math.Vec4.ssub$ = function(e, t) {
  return t[0] = e - t[0], t[1] = e - t[1], t[2] = e - t[2], t[3] = e - t[3], t
}, SpiderGL.Math.Vec4.mul$ = function(e, t) {
  return e[0] *= t[0], e[1] *= t[1], e[2] *= t[2], e[3] *= t[3], e
}, SpiderGL.Math.Vec4.muls$ = function(e, t) {
  return e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= t, e
}, SpiderGL.Math.Vec4.div$ = function(e, t) {
  return e[0] /= t[0], e[1] /= t[1], e[2] /= t[2], e[3] /= t[3], e
}, SpiderGL.Math.Vec4.divs$ = function(e, t) {
  return e[0] /= t, e[1] /= t, e[2] /= t, e[3] /= t, e
}, SpiderGL.Math.Vec4.sdiv$ = function(e, t) {
  return e[0] = t / e[0], e[1] = t / e[1], e[2] = t / e[2], e[3] = t / e[3], e
}, SpiderGL.Math.Vec4.normalize$ = function(e) {
  var t = 1 / SpiderGL.Math.Vec4.length(e);
  return SpiderGL.Math.Vec4.muls$(e, t)
}, SpiderGL.Math.Mat3 = {}, SpiderGL.Math.Mat3.dup = function(e) {
  return e.slice(0, 9)
}, SpiderGL.Math.Mat3.scalar = function(e) {
  return [e, e, e, e, e, e, e, e, e]
}, SpiderGL.Math.Mat3.zero = function() {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0]
}, SpiderGL.Math.Mat3.one = function() {
  return [1, 1, 1, 1, 1, 1, 1, 1, 1]
}, SpiderGL.Math.Mat3.diag = function(e) {
  return [e[0], 0, 0, 0, e[0], 0, 0, 0, e[0]]
}, SpiderGL.Math.Mat3.identity = function() {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1]
}, SpiderGL.Math.Mat3.to44 = function(e) {
  return [e[0], e[1], e[2], 0, e[3], e[4], e[5], 0, e[6], e[7], e[8], 0, 0, 0, 0, 1]
}, SpiderGL.Math.Mat3.mul2 = function(e, t, r) {
  return r = null == r ? 0 : r, [e[0] * t[0] + e[3] * t[1] + e[6] * r, e[1] * t[0] + e[4] * t[1] + e[7] * r]
}, SpiderGL.Math.Mat3.mul3 = function(e, t) {
  return [e[0] * t[0] + e[3] * t[1] + e[6] * t[2], e[1] * t[0] + e[4] * t[1] + e[7] * t[2], e[2] * t[0] + e[5] * t[1] + e[8] * t[2]]
}, SpiderGL.Math.Mat3.transpose = function(e) {
  return [e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]]
}, SpiderGL.Math.Mat4 = {}, SpiderGL.Math.Mat4.dup = function(e) {
  return e.slice(0, 16)
}, SpiderGL.Math.Mat4.scalar = function(e) {
  return [e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e]
}, SpiderGL.Math.Mat4.zero = function() {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, SpiderGL.Math.Mat4.one = function() {
  return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}, SpiderGL.Math.Mat4.diag = function(e) {
  return [e[0], 0, 0, 0, 0, e[0], 0, 0, 0, 0, e[0], 0, 0, 0, 0, e[0]]
}, SpiderGL.Math.Mat4.identity = function() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}, SpiderGL.Math.Mat4.to33 = function(e) {
  return [e[0], e[1], e[2], e[4], e[5], e[6], e[8], e[9], e[10]]
}, SpiderGL.Math.Mat4.elem = function(e, t, r) {
  return e[t + 4 * r]
}, SpiderGL.Math.Mat4.elem$ = function(e, t, r, i) {
  e[t + 4 * r] = i
}, SpiderGL.Math.Mat4.row = function(e, t) {
  return [e[t + 0], e[t + 4], e[t + 8], e[t + 12]]
}, SpiderGL.Math.Mat4.row$ = function(e, t, r) {
  e[t + 0] = r[0], e[t + 4] = r[1], e[t + 8] = r[2], e[t + 12] = r[3]
}, SpiderGL.Math.Mat4.col = function(e, t) {
  var r = 4 * t;
  return [e[r + 0], e[r + 1], e[r + 2], e[r + 3]]
}, SpiderGL.Math.Mat4.col$ = function(e, t, r) {
  var i = 4 * t;
  e[i + 0] = r[0], e[i + 1] = r[1], e[i + 2] = r[2], e[i + 3] = r[3]
}, SpiderGL.Math.Mat4.isIdentity = function(e) {
  return 1 === e[0] && 0 === e[1] && 0 === e[2] && 0 === e[3] && 0 === e[4] && 1 === e[5] && 0 === e[6] && 0 === e[7] && 0 === e[8] && 0 === e[9] && 1 === e[10] && 0 === e[11] && 0 === e[12] && 0 === e[13] && 0 === e[14] && 1 === e[15]
}, SpiderGL.Math.Mat4.neg = function(e) {
  return [-e[0], -e[1], -e[2], -e[3], -e[4], -e[5], -e[6], -e[7], -e[8], -e[9], -e[10], -e[11], -e[12], -e[13], -e[14], -e[15]]
}, SpiderGL.Math.Mat4.add = function(e, t) {
  return [e[0] + t[0], e[1] + t[1], e[2] + t[2], e[3] + t[3], e[4] + t[4], e[5] + t[5], e[6] + t[6], e[7] + t[7], e[8] + t[8], e[9] + t[9], e[10] + t[10], e[11] + t[11], e[12] + t[12], e[13] + t[13], e[14] + t[14], e[15] + t[15]]
}, SpiderGL.Math.Mat4.sub = function(e, t) {
  return [e[0] - t[0], e[1] - t[1], e[2] - t[2], e[3] - t[3], e[4] - t[4], e[5] - t[5], e[6] - t[6], e[7] - t[7], e[8] - t[8], e[9] - t[9], e[10] - t[10], e[11] - t[11], e[12] - t[12], e[13] - t[13], e[14] - t[14], e[15] - t[15]]
}, SpiderGL.Math.Mat4.mul = function(e, t) {
  var r = e[0],
      i = e[1],
      n = e[2],
      a = e[3],
      s = e[4],
      o = e[5],
      u = e[6],
      d = e[7],
      p = e[8],
      h = e[9],
      _ = e[10],
      f = e[11],
      l = e[12],
      c = e[13],
      L = e[14],
      S = e[15],
      g = t[0],
      G = t[1],
      m = t[2],
      T = t[3],
      M = t[4],
      E = t[5],
      b = t[6],
      v = t[7],
      x = t[8],
      y = t[9],
      A = t[10],
      R = t[11],
      P = t[12],
      I = t[13],
      D = t[14],
      F = t[15];
  return [r * g + s * G + p * m + l * T, i * g + o * G + h * m + c * T, n * g + u * G + _ * m + L * T, a * g + d * G + f * m + S * T, r * M + s * E + p * b + l * v, i * M + o * E + h * b + c * v, n * M + u * E + _ * b + L * v, a * M + d * E + f * b + S * v, r * x + s * y + p * A + l * R, i * x + o * y + h * A + c * R, n * x + u * y + _ * A + L * R, a * x + d * y + f * A + S * R, r * P + s * I + p * D + l * F, i * P + o * I + h * D + c * F, n * P + u * I + _ * D + L * F, a * P + d * I + f * D + S * F]
}, SpiderGL.Math.Mat4.muls = function(e, t) {
  return [e[0] * t, e[1] * t, e[2] * t, e[3] * t, e[4] * t, e[5] * t, e[6] * t, e[7] * t, e[8] * t, e[9] * t, e[10] * t, e[11] * t, e[12] * t, e[13] * t, e[14] * t, e[15] * t]
}, SpiderGL.Math.Mat4.mul3 = function(e, t, r) {
  return r = null == r ? 1 : r, [e[0] * t[0] + e[4] * t[1] + e[8] * t[2] + e[12] * r, e[1] * t[0] + e[5] * t[1] + e[9] * t[2] + e[13] * r, e[2] * t[0] + e[6] * t[1] + e[10] * t[2] + e[14] * r]
}, SpiderGL.Math.Mat4.mul4 = function(e, t) {
  return [e[0] * t[0] + e[4] * t[1] + e[8] * t[2] + e[12] * t[3], e[1] * t[0] + e[5] * t[1] + e[9] * t[2] + e[13] * t[3], e[2] * t[0] + e[6] * t[1] + e[10] * t[2] + e[14] * t[3], e[3] * t[0] + e[7] * t[1] + e[11] * t[2] + e[15] * t[3]]
}, SpiderGL.Math.Mat4.rcp = function(e) {
  return [1 / e[0], 1 / e[1], 1 / e[2], 1 / e[3], 1 / e[4], 1 / e[5], 1 / e[6], 1 / e[7], 1 / e[8], 1 / e[9], 1 / e[10], 1 / e[11], 1 / e[12], 1 / e[13], 1 / e[14], 1 / e[15]]
}, SpiderGL.Math.Mat4.compMul = function(e, t) {
  return [e[0] * t[0], e[1] * t[1], e[2] * t[2], e[3] * t[3], e[4] * t[4], e[5] * t[5], e[6] * t[6], e[7] * t[7], e[8] * t[8], e[9] * t[9], e[10] * t[10], e[11] * t[11], e[12] * t[12], e[13] * t[13], e[14] * t[14], e[15] * t[15]]
}, SpiderGL.Math.Mat4.compDiv = function(e, t) {
  return [e[0] / t[0], e[1] / t[1], e[2] / t[2], e[3] / t[3], e[4] / t[4], e[5] / t[5], e[6] / t[6], e[7] / t[7], e[8] / t[8], e[9] / t[9], e[10] / t[10], e[11] / t[11], e[12] / t[12], e[13] / t[13], e[14] / t[14], e[15] / t[15]]
}, SpiderGL.Math.Mat4.transpose = function(e) {
  return [e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]]
}, SpiderGL.Math.Mat4.determinant = function(e) {
  var t = e[0],
      r = e[1],
      i = e[2],
      n = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      u = e[7],
      d = e[8],
      p = e[9],
      h = e[10],
      _ = e[11],
      f = e[12],
      l = e[13],
      c = e[14],
      L = e[15];
  return f * p * o * n - d * l * o * n - f * s * h * n + a * l * h * n + d * s * c * n - a * p * c * n - f * p * i * u + d * l * i * u + f * r * h * u - t * l * h * u - d * r * c * u + t * p * c * u + f * s * i * _ - a * l * i * _ - f * r * o * _ + t * l * o * _ + a * r * c * _ - t * s * c * _ - d * s * i * L + a * p * i * L + d * r * o * L - t * p * o * L - a * r * h * L + t * s * h * L
}, SpiderGL.Math.Mat4.inverse = function(e) {
  var t = e[0],
      r = e[1],
      i = e[2],
      n = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      u = e[7],
      d = e[8],
      p = e[9],
      h = e[10],
      _ = e[11],
      f = e[12],
      l = e[13],
      c = e[14],
      L = e[15],
      S = 1 / (f * p * o * n - d * l * o * n - f * s * h * n + a * l * h * n + d * s * c * n - a * p * c * n - f * p * i * u + d * l * i * u + f * r * h * u - t * l * h * u - d * r * c * u + t * p * c * u + f * s * i * _ - a * l * i * _ - f * r * o * _ + t * l * o * _ + a * r * c * _ - t * s * c * _ - d * s * i * L + a * p * i * L + d * r * o * L - t * p * o * L - a * r * h * L + t * s * h * L);
  return [S * (p * c * u - l * h * u + l * o * _ - s * c * _ - p * o * L + s * h * L), S * (l * h * n - p * c * n - l * i * _ + r * c * _ + p * i * L - r * h * L), S * (s * c * n - l * o * n + l * i * u - r * c * u - s * i * L + r * o * L), S * (p * o * n - s * h * n - p * i * u + r * h * u + s * i * _ - r * o * _), S * (f * h * u - d * c * u - f * o * _ + a * c * _ + d * o * L - a * h * L), S * (d * c * n - f * h * n + f * i * _ - t * c * _ - d * i * L + t * h * L), S * (f * o * n - a * c * n - f * i * u + t * c * u + a * i * L - t * o * L), S * (a * h * n - d * o * n + d * i * u - t * h * u - a * i * _ + t * o * _), S * (d * l * u - f * p * u + f * s * _ - a * l * _ - d * s * L + a * p * L), S * (f * p * n - d * l * n - f * r * _ + t * l * _ + d * r * L - t * p * L), S * (a * l * n - f * s * n + f * r * u - t * l * u - a * r * L + t * s * L), S * (d * s * n - a * p * n - d * r * u + t * p * u + a * r * _ - t * s * _), S * (f * p * o - d * l * o - f * s * h + a * l * h + d * s * c - a * p * c), S * (d * l * i - f * p * i + f * r * h - t * l * h - d * r * c + t * p * c), S * (f * s * i - a * l * i - f * r * o + t * l * o + a * r * c - t * s * c), S * (a * p * i - d * s * i + d * r * o - t * p * o - a * r * h + t * s * h)]
}, SpiderGL.Math.Mat4.inverseTranspose33 = function(e) {
  var t = e[0],
      r = e[1],
      i = e[2],
      n = e[4],
      a = e[5],
      s = e[6],
      o = e[8],
      u = e[9],
      d = e[10],
      p = 1 / (t * (d * a - s * u) - r * (d * n - s * o) + i * (u * n - a * o));
  return [p * (d * a - s * u), p * (s * o - d * n), p * (u * n - a * o), p * (i * u - d * r), p * (d * t - i * o), p * (r * o - u * t), p * (s * r - i * a), p * (i * n - s * t), p * (a * t - r * n)]
}, SpiderGL.Math.Mat4.trace = function(e) {
  return e[0] + e[5] + e[10] + e[15]
}, SpiderGL.Math.Mat4.translation = function(e) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e[0], e[1], e[2], 1]
}, SpiderGL.Math.Mat4.rotationAngleAxis = function(e, t) {
  var r, i, n, a, s, o, u = SpiderGL.Math.Vec3.normalize(t),
      d = SpiderGL.Math.sin(e),
      p = SpiderGL.Math.cos(e),
      h = 1 - p,
      _ = u[0],
      f = u[1],
      l = u[2];
  return [h * (_ * _) + p, h * (r = _ * f) + (o = l * d), h * (n = l * _) - (s = f * d), 0, h * r - o, h * (f * f) + p, h * (i = f * l) + (a = _ * d), 0, h * n + s, h * i - a, h * (l * l) + p, 0, 0, 0, 0, 1]
}, SpiderGL.Math.Mat4.scaling = function(e) {
  return [e[0], 0, 0, 0, 0, e[1], 0, 0, 0, 0, e[2], 0, 0, 0, 0, 1]
}, SpiderGL.Math.Mat4.lookAt = function(e, t, r) {
  var i = SpiderGL.Math.Vec3.normalize(SpiderGL.Math.Vec3.sub(t, e)),
      n = SpiderGL.Math.Vec3.normalize(r),
      a = SpiderGL.Math.Vec3.normalize(SpiderGL.Math.Vec3.cross(i, n));
  n = SpiderGL.Math.Vec3.cross(a, i);
  var s = [a[0], n[0], -i[0], 0, a[1], n[1], -i[1], 0, a[2], n[2], -i[2], 0, 0, 0, 0, 1];
  return SpiderGL.Math.Mat4.translate$(s, SpiderGL.Math.Vec3.neg(e))
}, SpiderGL.Math.Mat4.ortho = function(e, t) {
  var r = SpiderGL.Math.Vec3.add(t, e),
      i = SpiderGL.Math.Vec3.sub(t, e);
  return [2 / i[0], 0, 0, 0, 0, 2 / i[1], 0, 0, 0, 0, -2 / i[2], 0, -r[0] / i[0], -r[1] / i[1], -r[2] / i[2], 1]
}, SpiderGL.Math.Mat4.frustum = function(e, t) {
  var r = SpiderGL.Math.Vec3.add(t, e),
      i = SpiderGL.Math.Vec3.sub(t, e),
      n = 2 * e[2];
  return [n / i[0], 0, 0, 0, 0, n / i[1], 0, 0, r[0] / i[0], r[1] / i[1], -r[2] / i[2], -1, 0, 0, -n * t[2] / i[2], 0]
}, SpiderGL.Math.Mat4.perspective = function(e, t, r, i) {
  var n = r * SpiderGL.Math.tan(e / 2),
      a = n * t;
  return SpiderGL.Math.Mat4.frustum([-a, -n, r], [a, n, i])
}, SpiderGL.Math.Mat4.copy$ = function(e, t) {
  for (var r = 0; r < 16; ++r) e[r] = t[r];
  return e
}, SpiderGL.Math.Mat4.identity$ = function(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
}, SpiderGL.Math.Mat4.neg$ = function(e) {
  for (var t = 0; t < 16; ++t) e[t] = -e[t];
  return e
}, SpiderGL.Math.Mat4.add$ = function(e, t) {
  for (var r = 0; r < 16; ++r) e[r] += t[r];
  return e
}, SpiderGL.Math.Mat4.sub$ = function(e, t) {
  for (var r = 0; r < 16; ++r) e[r] -= t[r];
  return e
}, SpiderGL.Math.Mat4.mul$ = function(e, t) {
  var r = e[0],
      i = e[1],
      n = e[2],
      a = e[3],
      s = e[4],
      o = e[5],
      u = e[6],
      d = e[7],
      p = e[8],
      h = e[9],
      _ = e[10],
      f = e[11],
      l = e[12],
      c = e[13],
      L = e[14],
      S = e[15],
      g = t[0],
      G = t[1],
      m = t[2],
      T = t[3],
      M = t[4],
      E = t[5],
      b = t[6],
      v = t[7],
      x = t[8],
      y = t[9],
      A = t[10],
      R = t[11],
      P = t[12],
      I = t[13],
      D = t[14],
      F = t[15];
  return e[0] = r * g + s * G + p * m + l * T, e[1] = i * g + o * G + h * m + c * T, e[2] = n * g + u * G + _ * m + L * T, e[3] = a * g + d * G + f * m + S * T, e[4] = r * M + s * E + p * b + l * v, e[5] = i * M + o * E + h * b + c * v, e[6] = n * M + u * E + _ * b + L * v, e[7] = a * M + d * E + f * b + S * v, e[8] = r * x + s * y + p * A + l * R, e[9] = i * x + o * y + h * A + c * R, e[10] = n * x + u * y + _ * A + L * R, e[11] = a * x + d * y + f * A + S * R, e[12] = r * P + s * I + p * D + l * F, e[13] = i * P + o * I + h * D + c * F, e[14] = n * P + u * I + _ * D + L * F, e[15] = a * P + d * I + f * D + S * F, e
}, SpiderGL.Math.Mat4.muls$ = function(e, t) {
  for (var r = 0; r < 16; ++r) e[r] *= t;
  return e
}, SpiderGL.Math.Mat4.compMul$ = function(e, t) {
  for (var r = 0; r < 16; ++r) e[r] *= t[r];
  return e
}, SpiderGL.Math.Mat4.compDiv$ = function(e, t) {
  for (var r = 0; r < 16; ++r) e[r] /= t[r];
  return e
}, SpiderGL.Math.Mat4.transpose$ = function(e) {
  var t;
  return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, e
}, SpiderGL.Math.Mat4.invert$ = function(e) {
  var t = e[0],
      r = e[1],
      i = e[2],
      n = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      u = e[7],
      d = e[8],
      p = e[9],
      h = e[10],
      _ = e[11],
      f = e[12],
      l = e[13],
      c = e[14],
      L = e[15],
      S = 1 / (f * p * o * n - d * l * o * n - f * s * h * n + a * l * h * n + d * s * c * n - a * p * c * n - f * p * i * u + d * l * i * u + f * r * h * u - t * l * h * u - d * r * c * u + t * p * c * u + f * s * i * _ - a * l * i * _ - f * r * o * _ + t * l * o * _ + a * r * c * _ - t * s * c * _ - d * s * i * L + a * p * i * L + d * r * o * L - t * p * o * L - a * r * h * L + t * s * h * L);
  return e[0] = S * (p * c * u - l * h * u + l * o * _ - s * c * _ - p * o * L + s * h * L), e[1] = S * (l * h * n - p * c * n - l * i * _ + r * c * _ + p * i * L - r * h * L), e[2] = S * (s * c * n - l * o * n + l * i * u - r * c * u - s * i * L + r * o * L), e[3] = S * (p * o * n - s * h * n - p * i * u + r * h * u + s * i * _ - r * o * _), e[4] = S * (f * h * u - d * c * u - f * o * _ + a * c * _ + d * o * L - a * h * L), e[5] = S * (d * c * n - f * h * n + f * i * _ - t * c * _ - d * i * L + t * h * L), e[6] = S * (f * o * n - a * c * n - f * i * u + t * c * u + a * i * L - t * o * L), e[7] = S * (a * h * n - d * o * n + d * i * u - t * h * u - a * i * _ + t * o * _), e[8] = S * (d * l * u - f * p * u + f * s * _ - a * l * _ - d * s * L + a * p * L), e[9] = S * (f * p * n - d * l * n - f * r * _ + t * l * _ + d * r * L - t * p * L), e[10] = S * (a * l * n - f * s * n + f * r * u - t * l * u - a * r * L + t * s * L), e[11] = S * (d * s * n - a * p * n - d * r * u + t * p * u + a * r * _ - t * s * _), e[12] = S * (f * p * o - d * l * o - f * s * h + a * l * h + d * s * c - a * p * c), e[13] = S * (d * l * i - f * p * i + f * r * h - t * l * h - d * r * c + t * p * c), e[14] = S * (f * s * i - a * l * i - f * r * o + t * l * o + a * r * c - t * s * c), e[15] = S * (a * p * i - d * s * i + d * r * o - t * p * o - a * r * h + t * s * h), e
}, SpiderGL.Math.Mat4.translate$ = function(e, t) {
  var r = t[0],
      i = t[1],
      n = t[2];
  return e[12] = e[0] * r + e[4] * i + e[8] * n + e[12], e[13] = e[1] * r + e[5] * i + e[9] * n + e[13], e[14] = e[2] * r + e[6] * i + e[10] * n + e[14], e[15] = e[3] * r + e[7] * i + e[11] * n + e[15], e
}, SpiderGL.Math.Mat4.rotateAngleAxis$ = function(e, t, r) {
  var i = SpiderGL.Math.Mat4.rotationAngleAxis(t, r);
  return SpiderGL.Math.Mat4.mul$(e, i)
}, SpiderGL.Math.Mat4.scale$ = function(e, t) {
  var r = t[0],
      i = t[1],
      n = t[2];
  return e[0] *= r, e[1] *= r, e[2] *= r, e[3] *= r, e[4] *= i, e[5] *= i, e[6] *= i, e[7] *= i, e[8] *= n, e[9] *= n, e[10] *= n, e[11] *= n, e
}, SpiderGL.Math.Quat = {}, SpiderGL.Math.Quat.dup = function(e) {
  return e.slice(0, 4)
}, SpiderGL.Math.Quat.identity = function() {
  return [0, 0, 0, 1]
}, SpiderGL.Math.Quat.inverse = function(e) {
  return [-e[0], -e[1], -e[2], e[3]]
}, SpiderGL.Math.Quat.mul = function(e, t) {
  var r = e[0],
      i = e[1],
      n = e[2],
      a = e[3],
      s = t[0],
      o = t[1],
      u = t[2],
      d = t[3];
  return [r * d + a * s + n * o - i * u, i * d + a * o + r * u - n * s, n * d + a * u + i * s - r * o, a * d - r * s - i * o - n * u]
}, SpiderGL.Math.Quat.muls = function(e, t) {
  return [e[0] * t, e[1] * t, e[2] * t, e[3] * t]
}, SpiderGL.Math.Quat.normalize = function(e) {
  var t = 1 / SpiderGL.Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2] + e[3] * e[3]);
  return SpiderGL.Math.Quat.muls(e, t)
}, SpiderGL.Math.Quat.from33 = function(e) {
  var t, r = e[0],
      i = e[1],
      n = e[2],
      a = e[3],
      s = e[4],
      o = e[5],
      u = e[6],
      d = e[7],
      p = e[8],
      h = r + s + p;
  return h > 0 ? (h += 1, [(o - d) * (t = .5 / SpiderGL.Math.sqrt(h)), (u - n) * t, (i - a) * t, h * t]) : r > s && r > p ? [(h = r - s - p + 1) * (t = .5 / SpiderGL.Math.sqrt(h)), (i + a) * t, (u + n) * t, (o - d) * t] : s > p ? (h = -r + s - p + 1, [(i + a) * (t = .5 / SpiderGL.Math.sqrt(h)), h * t, (o + d) * t, (u - n) * t]) : (h = -r - s + p + 1, [(u + n) * (t = .5 / SpiderGL.Math.sqrt(h)), (o + d) * t, h * t, (i - a) * t])
}, SpiderGL.Math.Quat.to33 = function(e) {
  var t = e[0],
      r = e[1],
      i = e[2],
      n = e[3],
      a = t * t,
      s = t * r,
      o = t * i,
      u = t * n,
      d = r * r,
      p = r * i,
      h = r * n,
      _ = i * i,
      f = i * n;
  return [1 - 2 * (d + _), 2 * (s + f), 2 * (o - h), 2 * (s - f), 1 - 2 * (a + _), 2 * (p + u), 2 * (o + h), 2 * (p - u), 1 - 2 * (a + d)]
}, SpiderGL.Math.Quat.from44 = function(e) {
  return SpiderGL.Math.Quat.from33(SpiderGL.Math.Mat4.to33(e))
}, SpiderGL.Math.Quat.to44 = function(e) {
  return SpiderGL.Math.Mat3.to44(SpiderGL.Math.Quat.to33(e))
}, SpiderGL.Math.Quat.fromAngleAxis = function(e, t) {
  return [0, 0, 0, 1]
}, SpiderGL.Math.Quat.toAngleAxis = function(e) {
  return [0, 0, 0, 1]
}, SpiderGL.Math.Quat.fromEulerAngles = function(e, t, r) {
  return [0, 0, 0, 1]
}, SpiderGL.Math.Quat.toEulerAngles = function(e) {
  return [0, 0, 0, 1]
}, SpiderGL.Math.Quat.copy$ = function(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
}, SpiderGL.Math.Quat.identity$ = function(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
}, SpiderGL.Math.Quat.invert$ = function(e) {
  return e[0] = -e[0], e[1] = -e[1], e[2] = -e[2], e
}, SpiderGL.Math.Quat.mul$ = function(e) {
  var t = p[0],
      r = p[1],
      i = p[2],
      n = p[3],
      a = e[0],
      s = e[1],
      o = e[2],
      u = e[3];
  return e[0] = t * u + n * a + i * s - r * o, e[1] = r * u + n * s + t * o - i * a, e[2] = i * u + n * o + r * a - t * s, e[3] = n * u - t * a - r * s - i * o, e
}, SpiderGL.Math.Quat.muls$ = function(e, t) {
  return e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= t, e
}, SpiderGL.Math.Quat.normalize$ = function(e) {
  var t = 1 / SpiderGL.Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2] + e[3] * e[3]);
  return SpiderGL.Math.Quat.muls$(e, t)
}, SpiderGL.Math.project = function(e, t, r, i) {
  var n = SpiderGL.Math.Vec3,
      a = SpiderGL.Math.Mat4.mul4(t, e),
      s = 1 / a[3];
  return a[3] = s, n.muls$(a, s / 2), n.adds$(a, .5), n.mul$(a, [r[2], r[3], i[1] - i[0]]), n.add$(a, [r[0], r[1], i[0]]), a
}, SpiderGL.Math.unproject = function(e, t, r, i) {
  var n = SpiderGL.Math.Vec3,
      a = SpiderGL.Math.Mat4,
      s = n.to4(e, 1);
  n.sub$(s, [r[0], r[1], i[0]]), n.div$(s, [r[2], r[3], i[1] - i[0]]), n.muls$(s, 2), n.subs$(s, 1);
  var o = 1 / (s = a.mul4(t, s))[3];
  return s[3] = o, n.muls$(s, o), s
}, SpiderGL.Space = {}, SpiderGL.Space.MatrixStack = function(e) {
  SpiderGL.Core.ObjectBase.call(this), this._onChange = null, this.reset(), this._onChange = e
}, SpiderGL.Space.MatrixStack.prototype = {
  _invalidate: function() {
      this._i = null, this._t = null, this._it = null, this._onChange && this._onChange(this)
  },
  reset: function() {
      var e = SpiderGL.Math.Mat4.identity();
      this._s = [e], this._l = 1, this._m = e, this._i = e, this._t = e, this._it = e, this._onChange && this._onChange(this)
  },
  get onChange() {
      return this._onChange
  },
  set onChange(e) {
      this._onChange = e
  },
  get size() {
      return this._l
  },
  get matrix$() {
      return this._m
  },
  get matrix() {
      return SpiderGL.Math.Mat4.dup(this.matrix$)
  },
  get top$() {
      return this.matrix$
  },
  get top() {
      return this.matrix
  },
  get inverse$() {
      return this._i || (this._i = SpiderGL.Math.Mat4.inverse(this._m))
  },
  get inverse() {
      return SpiderGL.Math.Mat4.dup(this.inverse$)
  },
  get transpose$() {
      return this._t || (this._t = SpiderGL.Math.Mat4.transpose(this._m))
  },
  get transpose() {
      return SpiderGL.Math.Mat4.dup(this.transpose$)
  },
  get inverseTranspose$() {
      return this._it || (this._it = SpiderGL.Math.Mat4.transpose(this.inverse$))
  },
  get inverseTranspose() {
      return SpiderGL.Math.Mat4.dup(this.inverseTranspose$)
  },
  push: function() {
      var e = SpiderGL.Math.Mat4.dup(this._m);
      this._s.push(e), this._l++, this._m = e
  },
  pop: function() {
      this._l <= 1 || (this._s.pop(), this._l--, this._m = this._s[this._l - 1], this._invalidate())
  },
  load: function(e) {
      e = SpiderGL.Math.Mat4.dup(e), this._s[this._l - 1] = e, this._m = e, this._invalidate()
  },
  loadIdentity: function() {
      var e = SpiderGL.Math.Mat4.identity$(this._m);
      this._i = e, this._t = e, this._it = e
  },
  multiply: function(e) {
      SpiderGL.Math.Mat4.mul$(this._m, e), this._invalidate()
  },
  ortho: function(e, t) {
      SpiderGL.Math.Mat4.mul$(this._m, SpiderGL.Math.Mat4.ortho(e, t)), this._invalidate()
  },
  frustum: function(e, t) {
      SpiderGL.Math.Mat4.mul$(this._m, SpiderGL.Math.Mat4.frustum(e, t)), this._invalidate()
  },
  perspective: function(e, t, r, i) {
      SpiderGL.Math.Mat4.mul$(this._m, SpiderGL.Math.Mat4.perspective(e, t, r, i)), this._invalidate()
  },
  lookAt: function(e, t, r) {
      SpiderGL.Math.Mat4.mul$(this._m, SpiderGL.Math.Mat4.lookAt(e, t, r)), this._invalidate()
  },
  translate: function(e) {
      SpiderGL.Math.Mat4.translate$(this._m, e), this._invalidate()
  },
  rotate: function(e, t) {
      SpiderGL.Math.Mat4.rotateAngleAxis$(this._m, e, t), this._invalidate()
  },
  scale: function(e) {
      SpiderGL.Math.Mat4.scale$(this._m, e), this._invalidate()
  }
}, SpiderGL.Type.extend(SpiderGL.Space.MatrixStack, SpiderGL.Core.ObjectBase), SpiderGL.Space.ViewportStack = function(e) {
  SpiderGL.Core.ObjectBase.call(this), this._onChange = null, this.reset(), this._onChange = e
}, SpiderGL.Space.ViewportStack.prototype = {
  _invalidate: function() {
      this._onChange && this._onChange(this)
  },
  reset: function() {
      var e = [0, 0, 1, 1];
      this._s = [e], this._l = 1, this._r = e, this._onChange && this._onChange(this)
  },
  get onChange() {
      return this._onChange
  },
  set onChange(e) {
      this._onChange = e
  },
  get size() {
      return this._l
  },
  get rect$() {
      return this._r
  },
  get rect() {
      return this.rect$.slice(0, 4)
  },
  get top$() {
      return this.rect$
  },
  get top() {
      return this.rect
  },
  push: function() {
      var e = this._r.slice(0, 4);
      this._s.push(e), this._l++, this._r = e
  },
  pop: function() {
      this._l <= 1 || (this._s.pop(), this._l--, this._r = this._s[this._l - 1], this._invalidate())
  },
  load: function(e) {
      e = e.slice(0, 4), this._s[this._l - 1] = e, this._r = e, this._invalidate()
  },
  loadIdentity: function() {
      this._r = [0, 0, 1, 1]
  },
  inner: function(e) {
      this._r[0] += e[0], this._r[1] += e[1], this._r[2] = e[2], this._r[3] = e[3], this._invalidate()
  }
}, SpiderGL.Type.extend(SpiderGL.Space.ViewportStack, SpiderGL.Core.ObjectBase), SpiderGL.Space.DepthRangeStack = function(e) {
  SpiderGL.Core.ObjectBase.call(this), this._onChange = null, this.reset(), this._onChange = e
}, SpiderGL.Space.DepthRangeStack.prototype = {
  _invalidate: function() {
      this._onChange && this._onChange(this)
  },
  reset: function() {
      var e = [0, 1];
      this._s = [e], this._l = 1, this._r = e, this._onChange && this._onChange(this)
  },
  get onChange() {
      return this._onChange
  },
  set onChange(e) {
      this._onChange = e
  },
  get size() {
      return this._l
  },
  get range$() {
      return this._r
  },
  get range() {
      return this.range$.slice(0, 2)
  },
  get top$() {
      return this.range$
  },
  get top() {
      return this.range
  },
  push: function() {
      var e = this._r.slice(0, 2);
      this._s.push(e), this._l++, this._r = e
  },
  pop: function() {
      this._l <= 1 || (this._s.pop(), this._l--, this._r = this._s[this._l - 1], this._invalidate())
  },
  load: function(e) {
      e = e.slice(0, 2), this._s[this._l - 1] = e, this._r = e, this._invalidate()
  },
  loadIdentity: function() {
      this._r = [0, 1]
  },
  inner: function(e) {
      this._r[0] += e[0], this._r[1] = e[1], this._invalidate()
  }
}, SpiderGL.Type.extend(SpiderGL.Space.DepthRangeStack, SpiderGL.Core.ObjectBase), SpiderGL.Space.TransformationStack = function() {
  SpiderGL.Core.ObjectBase.call(this);
  var e = this;
  this._mv = {}, this._vp = {}, this._mvp = {}, this._n = {}, this._c = {}, this._m = new SpiderGL.Space.MatrixStack(function() {
      e._mv = {}, e._mvp = {}, e._n = {}, e._c = {}
  }), this._v = new SpiderGL.Space.MatrixStack(function() {
      e._mv = {}, e._vp = {}, e._mvp = {}, e._n = {}, e._c = {}
  }), this._p = new SpiderGL.Space.MatrixStack(function() {
      e._vp = {}, e._mvp = {}
  }), this._viewport = new SpiderGL.Space.ViewportStack(function() {}), this._depth = new SpiderGL.Space.DepthRangeStack(function() {})
}, SpiderGL.Space.TransformationStack.prototype = {
  reset: function() {
      this._m.reset(), this._v.reset(), this._p.reset()
  },
  get viewport() {
      return this._viewport
  },
  get viewportRect$() {
      return this._viewport.rect$
  },
  get viewportRect() {
      return this._viewport.rect
  },
  get depth() {
      return this._depth
  },
  get depthRange$() {
      return this._depth.range$
  },
  get depthRange() {
      return this._depth.range
  },
  get model() {
      return this._m
  },
  get modelMatrix$() {
      return this._m.matrix$
  },
  get modelMatrix() {
      return this._m.matrix
  },
  get modelMatrixInverse$() {
      return this._m.inverse$
  },
  get modelMatrixInverse() {
      return this._m.inverse
  },
  get modelMatrixTranspose$() {
      return this._m.transpose$
  },
  get modelMatrixTranspose() {
      return this._m.transpose
  },
  get modelMatrixInverseTranspose$() {
      return this._m.inverseTranspose$
  },
  get modelMatrixInverseTranspose() {
      return this._m.inverseTranspose
  },
  get view() {
      return this._v
  },
  get viewMatrix$() {
      return this._v.matrix$
  },
  get viewMatrix() {
      return this._v.matrix
  },
  get viewMatrixInverse$() {
      return this._v.inverse$
  },
  get viewMatrixInverse() {
      return this._v.inverse
  },
  get viewMatrixTranspose$() {
      return this._v.transpose$
  },
  get viewMatrixTranspose() {
      return this._v.transpose
  },
  get viewMatrixInverseTranspose$() {
      return this._v.inverseTranspose$
  },
  get viewMatrixInverseTranspose() {
      return this._v.inverseTranspose
  },
  get projection() {
      return this._p
  },
  get projectionMatrix$() {
      return this._p.matrix$
  },
  get projectionMatrix() {
      return this._p.matrix
  },
  get projectionMatrixInverse$() {
      return this._p.inverse$
  },
  get projectionMatrixInverse() {
      return this._p.inverse
  },
  get projectionMatrixTranspose$() {
      return this._p.transpose$
  },
  get projectionMatrixTranspose() {
      return this._p.transpose
  },
  get projectionMatrixInverseTranspose$() {
      return this._p.inverseTranspose$
  },
  get projectionMatrixInverseTranspose() {
      return this._p.inverseTranspose
  },
  get modelViewMatrix$() {
      return this._mv.m || (this._mv.m = SpiderGL.Math.Mat4.mul(this.viewMatrix$, this.modelMatrix$))
  },
  get modelViewMatrix() {
      return SpiderGL.Math.Mat4.dup(this.modelViewMatrix$)
  },
  get modelViewMatrixInverse$() {
      return this._mv.i || (this._mv.i = SpiderGL.Math.Mat4.mul(this.modelMatrixInverse$, this.viewMatrixInverse$))
  },
  get modelViewMatrixInverse() {
      return SpiderGL.Math.Mat4.dup(this.modelViewMatrixInverse$)
  },
  get modelViewMatrixTranspose$() {
      return this._mv.t || (this._mv.t = SpiderGL.Math.Mat4.transpose(this.modelViewMatrix$))
  },
  get modelViewMatrixTranspose() {
      return SpiderGL.Math.Mat4.dup(this.modelViewMatrixTranspose$)
  },
  get modelViewMatrixInverseTranspose$() {
      return this._mv.it || (this._mv.it = SpiderGL.Math.Mat4.transpose(this.modelViewMatrixInverse$))
  },
  get modelViewMatrixInverseTranspose() {
      return SpiderGL.Math.Mat4.dup(this.modelViewMatrixInverseTranspose$)
  },
  get viewProjectionMatrix$() {
      return this._vp.m || (this._vp.m = SpiderGL.Math.Mat4.mul(this.projectionMatrix$, this.viewMatrix$))
  },
  get viewProjectionMatrix() {
      return SpiderGL.Math.Mat4.dup(this.viewProjectionMatrix$)
  },
  get viewProjectionMatrixInverse$() {
      return this._vp.i || (this._vp.i = SpiderGL.Math.Mat4.mul(this.viewMatrixInverse$, this.projectionMatrixInverse$))
  },
  get viewProjectionMatrixInverse() {
      return SpiderGL.Math.Mat4.dup(this.viewProjectionMatrixInverse$)
  },
  get viewProjectionMatrixTranspose$() {
      return this._vp.t || (this._vp.t = SpiderGL.Math.Mat4.transpose(this.viewProjectionMatrix$))
  },
  get viewProjectionMatrixTranspose() {
      return SpiderGL.Math.Mat4.dup(this.viewProjectionMatrixTranspose$)
  },
  get viewProjectionMatrixInverseTranspose$() {
      return this._vp.it || (this._vp.it = SpiderGL.Math.Mat4.transpose(this.viewProjectionMatrixInverse$))
  },
  get viewProjectionMatrixInverseTranspose() {
      return SpiderGL.Math.Mat4.dup(this.viewProjectionMatrixInverseTranspose$)
  },
  get modelViewProjectionMatrix$() {
      return this._mvp.m || (this._mvp.m = SpiderGL.Math.Mat4.mul(this.viewProjectionMatrix$, this.modelMatrix$))
  },
  get modelViewProjectionMatrix() {
      return SpiderGL.Math.Mat4.dup(this.modelViewProjectionMatrix$)
  },
  get modelViewProjectionMatrixInverse$() {
      return this._mvp.i || (this._mvp.i = SpiderGL.Math.Mat4.inverse(this.modelViewProjectionMatrix$))
  },
  get modelViewProjectionMatrixInverse() {
      return SpiderGL.Math.Mat4.dup(this.modelViewProjectionMatrixInverse$)
  },
  get modelViewProjectionMatrixTranspose$() {
      return this._mvp.t || (this._mvp.t = SpiderGL.Math.Mat4.transpose(this.modelViewProjectionMatrix$))
  },
  get modelViewProjectionMatrixTranspose() {
      return SpiderGL.Math.Mat4.dup(this.modelViewProjectionMatrixTranspose$)
  },
  get modelViewProjectionMatrixInverseTranspose$() {
      return this._mvp.it || (this._mvp.it = SpiderGL.Math.Mat4.transpose(this.modelViewProjectionMatrixInverse$))
  },
  get modelViewProjectionMatrixInverseTranspose() {
      return SpiderGL.Math.Mat4.dup(this.modelViewProjectionMatrixInverseTranspose$)
  },
  get worldSpaceNormalMatrix$() {
      return this._n.m || (this._n.m = SpiderGL.Math.Mat4.inverseTranspose33(this.modelMatrix$))
  },
  get worldSpaceNormalMatrix() {
      return SpiderGL.Math.Mat4.dup(this.worldSpaceNormalMatrix$)
  },
  get viewSpaceNormalMatrix$() {
      return this._n.v || (this._n.v = SpiderGL.Math.Mat4.inverseTranspose33(this.modelViewMatrix$))
  },
  get viewSpaceNormalMatrix() {
      return SpiderGL.Math.Mat4.dup(this.viewSpaceNormalMatrix$)
  },
  get modelSpaceViewerPosition$() {
      return this._c.mp || (this._c.mp = SpiderGL.Math.Vec4.to3(SpiderGL.Math.Mat4.col(this.modelViewMatrixInverse$, 3)))
  },
  get modelSpaceViewerPosition() {
      return SpiderGL.Math.Vec3.dup(this.modelSpaceViewerPosition$)
  },
  get worldSpaceViewerPosition$() {
      return this._c.wp || (this._c.wp = SpiderGL.Math.Vec4.to3(SpiderGL.Math.Mat4.col(this.viewMatrixInverse$, 3)))
  },
  get worldSpaceViewerPosition() {
      return SpiderGL.Math.Vec3.dup(this.worldSpaceViewerPosition$)
  },
  get modelSpaceViewDirection$() {
      return this._c.md || (this._c.md = SpiderGL.Math.Vec3.normalize$(SpiderGL.Math.Vec3.neg$(SpiderGL.Math.Vec4.to3(SpiderGL.Math.Mat4.row(this.modelViewMatrixInverse$, 2)))))
  },
  get modelSpaceViewDirection() {
      return SpiderGL.Math.Vec3.dup(this.modelSpaceViewDirection$)
  },
  get worldSpaceViewDirection$() {
      return this._c.wd || (this._c.wd = SpiderGL.Math.Vec3.normalize$(SpiderGL.Math.Vec3.neg$(SpiderGL.Math.Vec4.to3(SpiderGL.Math.Mat4.row(this.viewMatrixInverse$, 2)))))
  },
  get worldSpaceViewDirection() {
      return SpiderGL.Math.Vec3.dup(this.worldSpaceViewDirection$)
  },
  project: function(e) {
      return SpiderGL.Math.project(e, this.modelViewProjectionMatrix$, this.viewportRect$, this.depthRange$)
  },
  unproject: function(e) {
      return SpiderGL.Math.unproject(e, this.modelViewProjectionMatrixInverse$, this.viewportRect$, this.depthRange$)
  }
}, SpiderGL.Type.extend(SpiderGL.Space.TransformationStack, SpiderGL.Core.ObjectBase), SpiderGL.WebGL = {}, SpiderGL.WebGL.Context = {}, SpiderGL.WebGL.Context.WEBGL_STRING = "experimental-webgl", SpiderGL.WebGL.Context.DEFAULT_UNPACK_FLIP_Y = !0, SpiderGL.WebGL.Context.DEFAULT_UNPACK_PREMULTIPLY_ALPHA = !1, SpiderGL.WebGL.Context.DEFAULT_UNPACK_COLORSPACE_CONVERSION = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.Context.get = function(e, t) {
  var r = e;
  return SpiderGL.Type.isString(r) && (r = SpiderGL.DOM.getElementById(r)), SpiderGL.Type.instanceOf(r, HTMLCanvasElement) ? r.getContext(SpiderGL.WebGL.Context.WEBGL_STRING, t) : null
}, SpiderGL.WebGL.Context._prepareContex = function(e) {
  if (e) {
      var t = e._spidergl;
      if (!t) {
          t = {}, e._spidergl = t, t.TAG = 0, t.gl = e;
          var r = {};
          for (var i in t.glFunctions = r, e) {
              var n = e[n];
              "function" == typeof n && (r[i] = n)
          }
      }
  }
}, SpiderGL.WebGL.Context._addExtension = function(e, t, r, i) {
  if (e) {
      var n = e.getExtension;
      e.getExtension = function(a) {
          if (a == t) {
              var s = this._spidergl;
              if (!s) return null;
              var o = s[r];
              if (!o) {
                  (o = {}).TAG = 0;
                  var u = {};
                  o._ext = u, u[r] = o, u.sgl = s, u.gl = e;
                  if (u.glFunctions = {}, !i(e, o)) return null;
                  s[r] = o
              }
              return o
          }
          return n.call(this, a)
      }
  }
}, SpiderGL.WebGL.Context._setup_SGL_current_binding = function(e, t) {
  if (!e) return !1;
  if (!t) return !1;
  if (!e._spidergl) return !1;
  if (e._spidergl.cb) return !1;
  var r = t,
      i = r._ext,
      n = i.glFunctions;
  i.currentBuffer = {}, i.currentBuffer[e.ARRAY_BUFFER] = e.getParameter(e.ARRAY_BUFFER_BINDING), i.currentBuffer[e.ELEMENT_ARRAY_BUFFER] = e.getParameter(e.ELEMENT_ARRAY_BUFFER_BINDING), i.bufferStack = {}, i.bufferStack[e.ARRAY_BUFFER] = [], i.bufferStack[e.ELEMENT_ARRAY_BUFFER] = [], n.bindBuffer = e.bindBuffer, e.bindBuffer = function(e, t) {
      var r = this._spidergl.cb._ext;
      r.currentBuffer[e] != t && (r.currentBuffer[e] = t, r.glFunctions.bindBuffer.call(this, e, t))
  }, r.getCurrentBuffer = function(e) {
      return this._ext.currentBuffer[e]
  }, r.pushBuffer = function(e) {
      var t = this._ext,
          r = t.bufferStack[e],
          i = t.currentBuffer[e];
      r.push(i)
  }, r.popBuffer = function(e) {
      var t = this._ext,
          r = t.bufferStack[e];
      if (!(r.length <= 0)) {
          var i = r.pop();
          t.gl.bindBuffer(e, i)
      }
  }, i.currentFramebuffer = {}, i.currentFramebuffer[e.FRAMEBUFFER] = e.getParameter(e.FRAMEBUFFER_BINDING), i.framebufferStack = {}, i.framebufferStack[e.FRAMEBUFFER] = [], n.bindFramebuffer = e.bindFramebuffer, e.bindFramebuffer = function(e, t) {
      var r = this._spidergl.cb._ext;
      r.currentFramebuffer[e] != t && (r.currentFramebuffer[e] = t, r.glFunctions.bindFramebuffer.call(this, e, t))
  }, r.getCurrentFramebuffer = function(e) {
      return this._ext.currentFramebuffer[e]
  }, r.pushFramebuffer = function(e) {
      var t = this._ext,
          r = t.framebufferStack[e],
          i = t.currentFramebuffer[e];
      r.push(i)
  }, r.popFramebuffer = function(e) {
      var t = this._ext,
          r = t.framebufferStack[e];
      if (!(r.length <= 0)) {
          var i = r.pop();
          t.gl.bindFramebuffer(e, i)
      }
  }, i.currentProgram = e.getParameter(e.CURRENT_PROGRAM), i.programStack = [], n.useProgram = e.useProgram, e.useProgram = function(e) {
      var t = this._spidergl.cb._ext;
      t.currentProgram != e && (t.currentProgram = e, t.glFunctions.useProgram.call(this, e))
  }, r.getCurrentProgram = function() {
      return this._ext.currentProgram
  }, r.pushProgram = function() {
      var e = this._ext,
          t = e.programStack,
          r = e.currentProgram;
      t.push(r)
  }, r.popProgram = function() {
      var e = this._ext,
          t = e.programStack;
      if (!(t.length <= 0)) {
          var r = t.pop();
          e.gl.useProgram(r)
      }
  }, i.currentRenderbuffer = {}, i.currentRenderbuffer[e.RENDERBUFFER] = e.getParameter(e.RENDERBUFFER_BINDING), i.renderbufferStack = {}, i.renderbufferStack[e.RENDERBUFFER] = [], n.bindRenderbuffer = e.bindRenderbuffer, e.bindRenderbuffer = function(e, t) {
      var r = this._spidergl.cb._ext;
      r.currentRenderbuffer[e] != t && (r.currentRenderbuffer[e] = t, r.glFunctions.bindRenderbuffer.call(this, e, t))
  }, r.getCurrentRenderbuffer = function(e) {
      return this._ext.currentRenderbuffer[e]
  }, r.pushRenderbuffer = function(e) {
      var t = this._ext,
          r = t.renderbufferStack[e],
          i = t.currentRenderbuffer[e];
      r.push(i)
  }, r.popRenderbuffer = function(e) {
      var t = this._ext,
          r = t.renderbufferStack[e];
      if (!(r.length <= 0)) {
          var i = r.pop();
          t.gl.bindRenderbuffer(e, i)
      }
  }, i.currentShader = {}, i.currentShader[e.VERTEX_SHADER] = null, i.currentShader[e.FRAGMENT_SHADER] = null, i.shaderStack = {}, i.shaderStack[e.VERTEX_SHADER] = [], i.shaderStack[e.FRAGMENT_SHADER] = [], i.glFunctions.bindShader = function(e, t) {}, r.bindShader = function(e, t) {
      var r = this._ext;
      r.currentShader[e] != t && (r.currentShader[e] = t, r.glFunctions.bindShader.call(r.gl, e, t))
  }, r.getCurrentShader = function(e) {
      return this._ext.currentShader[e]
  }, r.pushShader = function(e) {
      var t = this._ext,
          r = t.shaderStack[e],
          i = t.currentShader[e];
      r.push(i)
  }, r.popShader = function(e) {
      var t = this._ext,
          r = t.shaderStack[e];
      if (!(r.length <= 0)) {
          var i = r.pop();
          t.gl.bindShader(e, i)
      }
  }, i.currentTexture = {};
  var a = e.getParameter(e.ACTIVE_TEXTURE),
      s = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
  i.currentTexture = {}, i.textureStack = {}, i.textureUnitStack = [];
  for (var o = 0; o < s; ++o) {
      var u = e.TEXTURE0 + o;
      e.activeTexture(u);
      var d = {};
      d[e.TEXTURE_2D] = e.getParameter(e.TEXTURE_BINDING_2D), d[e.TEXTURE_CUBE_MAP] = e.getParameter(e.TEXTURE_BINDING_CUBE_MAP), i.currentTexture[u] = d;
      var p = {};
      p[e.TEXTURE_2D] = [], p[e.TEXTURE_CUBE_MAP] = [], i.textureStack[u] = p
  }
  return e.activeTexture(a), i.currentTextureUnit = a, n.activeTexture = e.activeTexture, e.activeTexture = function(e) {
      var t = this._spidergl.cb._ext;
      t.currentTextureUnit != e && (t.currentTextureUnit = e, t.glFunctions.activeTexture.call(this, e))
  }, r.getCurrentTextureUnit = function() {
      return this._ext.currentTextureUnit
  }, r.pushTextureUnit = function() {
      var e = this._ext,
          t = e.textureUnitStack,
          r = e.currentTextureUnit;
      t.push(r)
  }, r.popTextureUnit = function() {
      var e = this._ext,
          t = e.textureUnitStack;
      if (!(t.length <= 0)) {
          var r = t.pop();
          e.gl.activeTexture(r)
      }
  }, n.bindTexture = e.bindTexture, e.bindTexture = function(e, t) {
      var r = this._spidergl.cb._ext,
          i = r.currentTextureUnit;
      r.currentTexture[i][e] != t && (r.currentTexture[i][e] = t, r.glFunctions.bindTexture.call(this, e, t))
  }, r.getCurrentTexture = function(e) {
      var t = this._ext,
          r = t.currentTextureUnit;
      return t.currentTexture[r][e]
  }, r.pushTexture = function(e) {
      var t = this._ext,
          r = t.currentTextureUnit,
          i = t.textureStack[r][e],
          n = t.currentTexture[r][e];
      i.push(n)
  }, r.popTexture = function(e) {
      var t = this._ext,
          r = t.currentTextureUnit,
          i = t.textureStack[r][e];
      if (!(i.length <= 0)) {
          var n = i.pop();
          t.gl.bindTexture(e, n)
      }
  }, !0
}, SpiderGL.WebGL.Context._setup_SGL_wrapper_notify = function(e, t) {
  if (!e) return !1;
  if (!t) return !1;
  if (!e._spidergl) return !1;
  if (e._spidergl.wn) return !1;
  var r = t._ext,
      i = r.glFunctions;
  return r.cb = e.getExtension("SGL_current_binding"), !!r.cb && (i.deleteBuffer = e.deleteBuffer, e.deleteBuffer = function(e) {
      this._spidergl.wn._ext.glFunctions.deleteBuffer.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_deleteBuffer.apply(t._spidergl, arguments)
  }, i.isBuffer = e.isBuffer, e.isBuffer = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.isBuffer.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_isBuffer.apply(r._spidergl, arguments), t
  }, i.bindBuffer = e.bindBuffer, e.bindBuffer = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.bindBuffer.apply(this, arguments);
      var r = t.cb.getCurrentBuffer(e);
      r && r._spidergl && r._spidergl._gl_bindBuffer.apply(r._spidergl, arguments)
  }, i.getBufferParameter = e.getBufferParameter, e.getBufferParameter = function(e) {
      var t = this._spidergl.wn._ext,
          r = t.glFunctions.getBufferParameter.apply(this, arguments),
          i = t.cb.getCurrentBuffer(e);
      return i && i._spidergl && i._spidergl._gl_getBufferParameter.apply(i._spidergl, arguments), r
  }, i.bufferData = e.bufferData, e.bufferData = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.bufferData.apply(this, arguments);
      var r = t.cb.getCurrentBuffer(e);
      r && r._spidergl && r._spidergl._gl_bufferData.apply(r._spidergl, arguments)
  }, i.bufferSubData = e.bufferSubData, e.bufferSubData = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.bufferSubData.apply(this, arguments);
      var r = t.cb.getCurrentBuffer(e);
      r && r._spidergl && r._spidergl._gl_bufferSubData.apply(r._spidergl, arguments)
  }, i.vertexAttribPointer = e.vertexAttribPointer, e.vertexAttribPointer = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.vertexAttribPointer.apply(this, arguments);
      var t = this.ARRAY_BUFFER,
          r = e.cb.getCurrentBuffer(t);
      r && r._spidergl && r._spidergl._gl_vertexAttribPointer.apply(r._spidergl, arguments)
  }, i.drawElements = e.drawElements, e.drawElements = function(e, t, r, i, n) {
      var a = this._spidergl.wn._ext;
      a.glFunctions.drawElements.apply(this, arguments);
      var s = this.ELEMENT_ARRAY_BUFFER,
          o = a.cb.getCurrentBuffer(s);
      o && o._spidergl && o._spidergl._gl_drawElements.apply(o._spidergl, arguments)
  }, i.deleteFramebuffer = e.deleteFramebuffer, e.deleteFramebuffer = function(e) {
      this._spidergl.wn._ext.glFunctions.deleteFramebuffer.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_deleteFramebuffer.apply(t._spidergl, arguments)
  }, i.isFramebuffer = e.isFramebuffer, e.isFramebuffer = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.isFramebuffer.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_isFramebuffer.apply(r._spidergl, arguments), t
  }, i.bindFramebuffer = e.bindFramebuffer, e.bindFramebuffer = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.bindFramebuffer.apply(this, arguments);
      var r = t.cb.getCurrentFramebuffer(e);
      r && r._spidergl && r._spidergl._gl_bindFramebuffer.apply(r._spidergl, arguments)
  }, i.checkFramebufferStatus = e.checkFramebufferStatus, e.checkFramebufferStatus = function(e) {
      var t = this._spidergl.wn._ext,
          r = t.glFunctions.checkFramebufferStatus.apply(this, arguments),
          i = t.cb.getCurrentFramebuffer(e);
      return i && i._spidergl && i._spidergl._gl_checkFramebufferStatus.apply(i._spidergl, arguments), r
  }, i.getFramebufferAttachmentParameter = e.getFramebufferAttachmentParameter, e.getFramebufferAttachmentParameter = function(e) {
      var t = this._spidergl.wn._ext,
          r = t.glFunctions.getFramebufferAttachmentParameter.apply(this, arguments),
          i = t.cb.getCurrentFramebuffer(e);
      return i && i._spidergl && i._spidergl._gl_getFramebufferAttachmentParameter.apply(i._spidergl, arguments), r
  }, i.framebufferRenderbuffer = e.framebufferRenderbuffer, e.framebufferRenderbuffer = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.framebufferRenderbuffer.apply(this, arguments);
      var r = t.cb.getCurrentFramebuffer(e);
      r && r._spidergl && r._spidergl._gl_framebufferRenderbuffer.apply(r._spidergl, arguments)
  }, i.framebufferTexture2D = e.framebufferTexture2D, e.framebufferTexture2D = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.framebufferTexture2D.apply(this, arguments);
      var r = t.cb.getCurrentFramebuffer(e);
      r && r._spidergl && r._spidergl._gl_framebufferTexture2D.apply(r._spidergl, arguments)
  }, i.clear = e.clear, e.clear = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.clear.apply(this, arguments);
      var t = this.FRAMEBUFFER,
          r = e.cb.getCurrentFramebuffer(t);
      r && r._spidergl && r._spidergl._gl_clear.apply(r._spidergl, arguments)
  }, i.readPixels = e.readPixels, e.readPixels = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.readPixels.apply(this, arguments);
      var t = this.FRAMEBUFFER,
          r = e.cb.getCurrentFramebuffer(t);
      r && r._spidergl && r._spidergl._gl_readPixels.apply(r._spidergl, arguments)
  }, i.deleteProgram = e.deleteProgram, e.deleteProgram = function(e) {
      this._spidergl.wn._ext.glFunctions.deleteProgram.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_deleteProgram.apply(t._spidergl, arguments)
  }, i.isProgram = e.isProgram, e.isProgram = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.isProgram.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_isProgram.apply(r._spidergl, arguments), t
  }, i.useProgram = e.useProgram, e.useProgram = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.useProgram.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_useProgram.apply(t._spidergl, arguments)
  }, i.getActiveAttrib = e.getActiveAttrib, e.getActiveAttrib = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getActiveAttrib.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getActiveAttrib.apply(r._spidergl, arguments), t
  }, i.getActiveUniform = e.getActiveUniform, e.getActiveUniform = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getActiveUniform.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getActiveUniform.apply(r._spidergl, arguments), t
  }, i.getAttachedShaders = e.getAttachedShaders, e.getAttachedShaders = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getAttachedShaders.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getAttachedShaders.apply(r._spidergl, arguments), t
  }, i.getAttribLocation = e.getAttribLocation, e.getAttribLocation = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getAttribLocation.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getAttribLocation.apply(r._spidergl, arguments), t
  }, i.getProgramParameter = e.getProgramParameter, e.getProgramParameter = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getProgramParameter.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getProgramParameter.apply(r._spidergl, arguments), t
  }, i.getProgramInfoLog = e.getProgramInfoLog, e.getProgramInfoLog = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getProgramInfoLog.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getProgramInfoLog.apply(r._spidergl, arguments), t
  }, i.getUniform = e.getUniform, e.getUniform = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getUniform.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getUniform.apply(r._spidergl, arguments), t
  }, i.getUniformLocation = e.getUniformLocation, e.getUniformLocation = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getUniformLocation.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getUniformLocation.apply(r._spidergl, arguments), t
  }, i.attachShader = e.attachShader, e.attachShader = function(e) {
      this._spidergl.wn._ext.glFunctions.attachShader.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_attachShader.apply(t._spidergl, arguments)
  }, i.bindAttribLocation = e.bindAttribLocation, e.bindAttribLocation = function(e) {
      this._spidergl.wn._ext.glFunctions.bindAttribLocation.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_bindAttribLocation.apply(t._spidergl, arguments)
  }, i.detachShader = e.detachShader, e.detachShader = function(e) {
      this._spidergl.wn._ext.glFunctions.detachShader.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_detachShader.apply(t._spidergl, arguments)
  }, i.linkProgram = e.linkProgram, e.linkProgram = function(e) {
      this._spidergl.wn._ext.glFunctions.linkProgram.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_linkProgram.apply(t._spidergl, arguments)
  }, i.uniform1f = e.uniform1f, e.uniform1f = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform1f.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform1f.apply(t._spidergl, arguments)
  }, i.uniform1fv = e.uniform1fv, e.uniform1fv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform1fv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform1fv.apply(t._spidergl, arguments)
  }, i.uniform1i = e.uniform1i, e.uniform1i = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform1i.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform1i.apply(t._spidergl, arguments)
  }, i.uniform1iv = e.uniform1iv, e.uniform1iv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform1iv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform1iv.apply(t._spidergl, arguments)
  }, i.uniform2f = e.uniform2f, e.uniform2f = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform2f.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform2f.apply(t._spidergl, arguments)
  }, i.uniform2fv = e.uniform2fv, e.uniform2fv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform2fv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform2fv.apply(t._spidergl, arguments)
  }, i.uniform2i = e.uniform2i, e.uniform2i = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform2i.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform2i.apply(t._spidergl, arguments)
  }, i.uniform2iv = e.uniform2iv, e.uniform2iv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform2iv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform2iv.apply(t._spidergl, arguments)
  }, i.uniform3f = e.uniform3f, e.uniform3f = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform3f.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform3f.apply(t._spidergl, arguments)
  }, i.uniform3fv = e.uniform3fv, e.uniform3fv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform3fv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform3fv.apply(t._spidergl, arguments)
  }, i.uniform3i = e.uniform3i, e.uniform3i = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform3i.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform3i.apply(t._spidergl, arguments)
  }, i.uniform3iv = e.uniform3iv, e.uniform3iv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform3iv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform3iv.apply(t._spidergl, arguments)
  }, i.uniform4f = e.uniform4f, e.uniform4f = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform4f.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform4f.apply(t._spidergl, arguments)
  }, i.uniform4fv = e.uniform4fv, e.uniform4fv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform4fv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform4fv.apply(t._spidergl, arguments)
  }, i.uniform4i = e.uniform4i, e.uniform4i = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform4i.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform4i.apply(t._spidergl, arguments)
  }, i.uniform4iv = e.uniform4iv, e.uniform4iv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniform4iv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniform4iv.apply(t._spidergl, arguments)
  }, i.uniformMatrix2fv = e.uniformMatrix2fv, e.uniformMatrix2fv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniformMatrix2fv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniformMatrix2fv.apply(t._spidergl, arguments)
  }, i.uniformMatrix3fv = e.uniformMatrix3fv, e.uniformMatrix3fv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniformMatrix3fv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniformMatrix3fv.apply(t._spidergl, arguments)
  }, i.uniformMatrix4fv = e.uniformMatrix4fv, e.uniformMatrix4fv = function() {
      var e = this._spidergl.wn._ext;
      e.glFunctions.uniformMatrix4fv.apply(this, arguments);
      var t = e.cb.getCurrentProgram();
      t && t._spidergl && t._spidergl._gl_uniformMatrix4fv.apply(t._spidergl, arguments)
  }, i.validateProgram = e.validateProgram, e.validateProgram = function(e) {
      this._spidergl.wn._ext.glFunctions.validateProgram.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_validateProgram.apply(t._spidergl, arguments)
  }, i.deleteRenderbuffer = e.deleteRenderbuffer, e.deleteRenderbuffer = function(e) {
      this._spidergl.wn._ext.glFunctions.deleteRenderbuffer.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_deleteRenderbuffer.apply(t._spidergl, arguments)
  }, i.isRenderbuffer = e.isRenderbuffer, e.isRenderbuffer = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.isRenderbuffer.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_isRenderbuffer.apply(r._spidergl, arguments), t
  }, i.bindRenderbuffer = e.bindRenderbuffer, e.bindRenderbuffer = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.bindRenderbuffer.apply(this, arguments);
      var r = t.cb.getCurrentRenderbuffer(e);
      r && r._spidergl && r._spidergl._gl_bindRenderbuffer.apply(r._spidergl, arguments)
  }, i.getRenderbufferParameter = e.getRenderbufferParameter, e.getRenderbufferParameter = function(e) {
      var t = this._spidergl.wn._ext,
          r = t.glFunctions.getRenderbufferParameter.apply(this, arguments),
          i = t.cb.getCurrentRenderbuffer(e);
      return i && i._spidergl && i._spidergl._gl_getRenderbufferParameter.apply(i._spidergl, arguments), r
  }, i.renderbufferStorage = e.renderbufferStorage, e.renderbufferStorage = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.renderbufferStorage.apply(this, arguments);
      var r = t.cb.getCurrentRenderbuffer(e);
      r && r._spidergl && r._spidergl._gl_renderbufferStorage.apply(r._spidergl, arguments)
  }, i.deleteShader = e.deleteShader, e.deleteShader = function(e) {
      this._spidergl.wn._ext.glFunctions.deleteShader.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_deleteShader.apply(t._spidergl, arguments)
  }, i.isShader = e.isShader, e.isShader = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.isShader.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_isShader.apply(r._spidergl, arguments), t
  }, i.getShaderParameter = e.getShaderParameter, e.getShaderParameter = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getShaderParameter.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getShaderParameter.apply(r._spidergl, arguments), t
  }, i.getShaderInfoLog = e.getShaderInfoLog, e.getShaderInfoLog = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getShaderInfoLog.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getShaderInfoLog.apply(r._spidergl, arguments), t
  }, i.getShaderSource = e.getShaderSource, e.getShaderSource = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.getShaderSource.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_getShaderSource.apply(r._spidergl, arguments), t
  }, i.compileShader = e.compileShader, e.compileShader = function(e) {
      this._spidergl.wn._ext.glFunctions.compileShader.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_compileShader.apply(t._spidergl, arguments)
  }, i.shaderSource = e.shaderSource, e.shaderSource = function(e) {
      this._spidergl.wn._ext.glFunctions.shaderSource.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_shaderSource.apply(t._spidergl, arguments)
  }, r.textureTargetMap = {}, r.textureTargetMap[e.TEXTURE_2D] = e.TEXTURE_2D, r.textureTargetMap[e.TEXTURE_CUBE_MAP] = e.TEXTURE_CUBE_MAP, r.textureTargetMap[e.TEXTURE_CUBE_MAP_POSITIVE_X] = e.TEXTURE_CUBE_MAP, r.textureTargetMap[e.TEXTURE_CUBE_MAP_NEGATIVE_X] = e.TEXTURE_CUBE_MAP, r.textureTargetMap[e.TEXTURE_CUBE_MAP_POSITIVE_Y] = e.TEXTURE_CUBE_MAP, r.textureTargetMap[e.TEXTURE_CUBE_MAP_NEGATIVE_Y] = e.TEXTURE_CUBE_MAP, r.textureTargetMap[e.TEXTURE_CUBE_MAP_POSITIVE_Z] = e.TEXTURE_CUBE_MAP, r.textureTargetMap[e.TEXTURE_CUBE_MAP_NEGATIVE_Z] = e.TEXTURE_CUBE_MAP, i.deleteTexture = e.deleteTexture, e.deleteTexture = function(e) {
      this._spidergl.wn._ext.glFunctions.deleteTexture.apply(this, arguments);
      var t = e;
      t && t._spidergl && t._spidergl._gl_deleteTexture.apply(t._spidergl, arguments)
  }, i.isTexture = e.isTexture, e.isTexture = function(e) {
      var t = this._spidergl.wn._ext.glFunctions.isTexture.apply(this, arguments),
          r = e;
      return r && r._spidergl && r._spidergl._gl_isTexture.apply(r._spidergl, arguments), t
  }, i.bindTexture = e.bindTexture, e.bindTexture = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.bindTexture.apply(this, arguments);
      var r = t.cb.getCurrentTexture(e);
      r && r._spidergl && r._spidergl._gl_bindTexture.apply(r._spidergl, arguments)
  }, i.getTexParameter = e.getTexParameter, e.getTexParameter = function(e) {
      var t = this._spidergl.wn._ext,
          r = t.glFunctions.getTexParameter.apply(this, arguments),
          i = t.cb.getCurrentTexture(e);
      return i && i._spidergl && i._spidergl._gl_getTexParameter.apply(i._spidergl, arguments), r
  }, i.copyTexImage2D = e.copyTexImage2D, e.copyTexImage2D = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.copyTexImage2D.apply(this, arguments);
      var r = t.textureTargetMap[e],
          i = t.cb.getCurrentTexture(r);
      i && i._spidergl && i._spidergl._gl_copyTexImage2D.apply(i._spidergl, arguments)
  }, i.copyTexSubImage2D = e.copyTexSubImage2D, e.copyTexSubImage2D = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.copyTexSubImage2D.apply(this, arguments);
      var r = t.textureTargetMap[e],
          i = t.cb.getCurrentTexture(r);
      i && i._spidergl && i._spidergl._gl_copyTexSubImage2D.apply(i._spidergl, arguments)
  }, i.generateMipmap = e.generateMipmap, e.generateMipmap = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.generateMipmap.apply(this, arguments);
      var r = t.cb.getCurrentTexture(e);
      r && r._spidergl && r._spidergl._gl_generateMipmap.apply(r._spidergl, arguments)
  }, i.texImage2D = e.texImage2D, e.texImage2D = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.texImage2D.apply(this, arguments);
      var r = t.textureTargetMap[e],
          i = t.cb.getCurrentTexture(r);
      i && i._spidergl && i._spidergl._gl_texImage2D.apply(i._spidergl, arguments)
  }, i.texParameterf = e.texParameterf, e.texParameterf = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.texParameterf.apply(this, arguments);
      var r = t.cb.getCurrentTexture(e);
      r && r._spidergl && r._spidergl._gl_texParameterf.apply(r._spidergl, arguments)
  }, i.texParameteri = e.texParameteri, e.texParameteri = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.texParameteri.apply(this, arguments);
      var r = t.cb.getCurrentTexture(e);
      r && r._spidergl && r._spidergl._gl_texParameteri.apply(r._spidergl, arguments)
  }, i.texSubImage2D = e.texSubImage2D, e.texSubImage2D = function(e) {
      var t = this._spidergl.wn._ext;
      t.glFunctions.texSubImage2D.apply(this, arguments);
      var r = t.textureTargetMap[e],
          i = t.cb.getCurrentTexture(r);
      i && i._spidergl && i._spidergl._gl_texSubImage2D.apply(i._spidergl, arguments)
  }, !0)
}, SpiderGL.WebGL.Context._setup_SGL_direct_state_access = function(e, t) {
  if (!e) return !1;
  if (!t) return !1;
  if (!e._spidergl) return !1;
  if (e._spidergl.dsa) return !1;
  var r = t,
      i = r._ext;
  i.glFunctions;
  return i.cb = e.getExtension("SGL_current_binding"), !!i.cb && (r.getBufferParameter = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentBuffer(t);
      a != e && n.bindBuffer(t, e);
      var s = n.getBufferParameter(t, r);
      return a != e && n.bindBuffer(t, a), s
  }, r.bufferData = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentBuffer(t);
      s != e && a.bindBuffer(t, e), a.bufferData(t, r, i), s != e && a.bindBuffer(t, s)
  }, r.bufferSubData = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentBuffer(t);
      s != e && a.bindBuffer(t, e), a.bufferSubData(t, r, i), s != e && a.bindBuffer(t, s)
  }, r.vertexAttribPointer = function(e, t, r, i, n, a, s) {
      var o = this._ext,
          u = o.gl,
          d = u.ARRAY_BUFFER,
          p = o.cb.getCurrentBuffer(d);
      p != e && u.bindBuffer(d, e), u.vertexAttribPointer(t, r, i, n, a, s), p != e && u.bindBuffer(d, p)
  }, r.drawElements = function(e, t, r, i, n) {
      var a = this._ext,
          s = a.gl,
          o = s.ELEMENT_ARRAY_BUFFER,
          u = a.cb.getCurrentBuffer(o);
      u != e && s.bindBuffer(o, e), s.drawElements(t, r, i, n), u != e && s.bindBuffer(o, u)
  }, r.checkFramebufferStatus = function(e, t) {
      var r = this._ext,
          i = r.gl,
          n = r.cb.getCurrentFramebuffer(t);
      n != e && i.bindFramebuffer(t, e);
      var a = i.checkFramebufferStatus(t);
      return n != e && i.bindFramebuffer(t, n), a
  }, r.getFramebufferAttachmentParameter = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentFramebuffer(t);
      s != e && a.bindFramebuffer(t, e);
      var o = a.getFramebufferAttachmentParameter(t, r, i);
      return s != e && a.bindFramebuffer(t, s), o
  }, r.framebufferRenderbuffer = function(e, t, r, i, n) {
      var a = this._ext,
          s = a.gl,
          o = a.cb.getCurrentFramebuffer(t);
      o != e && s.bindFramebuffer(t, e), s.framebufferRenderbuffer(t, r, i, n), o != e && s.bindFramebuffer(t, o)
  }, r.framebufferTexture2D = function(e, t, r, i, n, a) {
      var s = this._ext,
          o = s.gl,
          u = s.cb.getCurrentFramebuffer(t);
      u != e && o.bindFramebuffer(t, e), o.framebufferTexture2D(t, r, i, n, a), u != e && o.bindFramebuffer(t, u)
  }, r.clear = function(e, t) {
      var r = this._ext,
          i = r.gl,
          n = i.FRAMEBUFFER,
          a = r.cb.getCurrentFramebuffer(n);
      a != e && i.bindFramebuffer(n, e), i.clear(t), a != e && i.bindFramebuffer(n, a)
  }, r.readPixels = function(e, t, r, i, n, a, s, o) {
      var u = this._ext,
          d = u.gl,
          p = d.FRAMEBUFFER,
          h = u.cb.getCurrentFramebuffer(p);
      h != e && d.bindFramebuffer(p, e), d.readPixels(t, r, i, n, a, s, o), h != e && d.bindFramebuffer(p, h)
  }, r.uniform1f = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform1f(t, r), a != e && n.useProgram(a)
  }, r.uniform1fv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform1fv(t, r), a != e && n.useProgram(a)
  }, r.uniform1i = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform1i(t, r), a != e && n.useProgram(a)
  }, r.uniform1iv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform1iv(t, r), a != e && n.useProgram(a)
  }, r.uniform2f = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentProgram();
      s != e && a.useProgram(e), a.uniform2f(t, r, i), s != e && a.useProgram(s)
  }, r.uniform2fv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform2fv(t, r), a != e && n.useProgram(a)
  }, r.uniform2i = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentProgram();
      s != e && a.useProgram(e), a.uniform2i(t, r, i), s != e && a.useProgram(s)
  }, r.uniform2iv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform2iv(t, r), a != e && n.useProgram(a)
  }, r.uniform3f = function(e, t, r, i, n) {
      var a = this._ext,
          s = a.gl,
          o = a.cb.getCurrentProgram();
      o != e && s.useProgram(e), s.uniform3f(t, r, i, n), o != e && s.useProgram(o)
  }, r.uniform3fv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform3fv(t, r), a != e && n.useProgram(a)
  }, r.uniform3i = function(e, t, r, i, n) {
      var a = this._ext,
          s = a.gl,
          o = a.cb.getCurrentProgram();
      o != e && s.useProgram(e), s.uniform3i(t, r, i, n), o != e && s.useProgram(o)
  }, r.uniform3iv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform3iv(t, r), a != e && n.useProgram(a)
  }, r.uniform4f = function(e, t, r, i, n, a) {
      var s = this._ext,
          o = s.gl,
          u = s.cb.getCurrentProgram();
      u != e && o.useProgram(e), o.uniform4f(t, r, i, n, a), u != e && o.useProgram(u)
  }, r.uniform4fv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform4fv(t, r), a != e && n.useProgram(a)
  }, r.uniform4i = function(e, t, r, i, n, a) {
      var s = this._ext,
          o = s.gl,
          u = s.cb.getCurrentProgram();
      u != e && o.useProgram(e), o.uniform4i(t, r, i, n, a), u != e && o.useProgram(u)
  }, r.uniform4iv = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentProgram();
      a != e && n.useProgram(e), n.uniform4iv(t, r), a != e && n.useProgram(a)
  }, r.uniformMatrix2fv = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentProgram();
      s != e && a.useProgram(e), a.uniformMatrix2fv(t, r, i), s != e && a.useProgram(s)
  }, r.uniformMatrix3fv = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentProgram();
      s != e && a.useProgram(e), a.uniformMatrix3fv(t, r, i), s != e && a.useProgram(s)
  }, r.uniformMatrix4fv = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentProgram();
      s != e && a.useProgram(e), a.uniformMatrix4fv(t, r, i), s != e && a.useProgram(s)
  }, r.getRenderbufferParameter = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentRenderbuffer(t);
      a != e && n.bindRenderbuffer(t, e);
      var s = n.getRenderbufferParameter.call(n, t, r);
      return a != e && n.bindRenderbuffer(t, a), s
  }, r.renderbufferStorage = function(e, t, r, i, n) {
      var a = this._ext,
          s = a.gl,
          o = a.cb.getCurrentRenderbuffer(t);
      o != e && s.bindRenderbuffer(t, e), s.renderbufferStorage(t, r, i, n), o != e && s.bindRenderbuffer(t, o)
  }, r.shaderIsNull = function(e) {
      return null == e
  }, i.textureTargetMap = {}, i.textureTargetMap[e.TEXTURE_2D] = e.TEXTURE_2D, i.textureTargetMap[e.TEXTURE_CUBE_MAP] = e.TEXTURE_CUBE_MAP, i.textureTargetMap[e.TEXTURE_CUBE_MAP_POSITIVE_X] = e.TEXTURE_CUBE_MAP, i.textureTargetMap[e.TEXTURE_CUBE_MAP_NEGATIVE_X] = e.TEXTURE_CUBE_MAP, i.textureTargetMap[e.TEXTURE_CUBE_MAP_POSITIVE_Y] = e.TEXTURE_CUBE_MAP, i.textureTargetMap[e.TEXTURE_CUBE_MAP_NEGATIVE_Y] = e.TEXTURE_CUBE_MAP, i.textureTargetMap[e.TEXTURE_CUBE_MAP_POSITIVE_Z] = e.TEXTURE_CUBE_MAP, i.textureTargetMap[e.TEXTURE_CUBE_MAP_NEGATIVE_Z] = e.TEXTURE_CUBE_MAP, r.getTexParameter = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentTexture(t);
      a != e && n.bindTexture(t, e);
      var s = n.getTexParameter(t, r);
      return a != e && n.bindTexture(t, a), s
  }, r.copyTexImage2D = function(e, t, r, i, n, a, s, o, u) {
      var d = this._ext,
          p = d.gl,
          h = d.textureTargetMap[t],
          _ = d.cb.getCurrentTexture(h);
      _ != e && p.bindTexture(h, e), p.copyTexImage2D(t, r, i, n, a, s, o, u), _ != e && p.bindTexture(h, _)
  }, r.copyTexSubImage2D = function(e, t, r, i, n, a, s, o, u, d) {
      var p = this._ext,
          h = p.gl,
          _ = p.textureTargetMap[t],
          f = p.cb.getCurrentTexture(_);
      f != e && h.bindTexture(_, e), h.copyTexSubImage2D(t, r, i, n, a, s, o, u, d), f != e && h.bindTexture(_, f)
  }, r.generateMipmap = function(e, t) {
      var r = this._ext,
          i = r.gl,
          n = r.cb.getCurrentTexture(t);
      n != e && i.bindTexture(t, e), i.generateMipmap(t), n != e && i.bindTexture(t, n)
  }, r.texImage2D = function(e, t) {
      var r = this._ext,
          i = r.gl,
          n = r.textureTargetMap[t],
          a = r.cb.getCurrentTexture(n);
      a != e && i.bindTexture(n, e);
      var s = Array.prototype.slice.call(arguments, 1);
      i.texImage2D.apply(i, s), a != e && i.bindTexture(n, a)
  }, r.texParameterf = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentTexture(t);
      s != e && a.bindTexture(t, e), a.texParameterf(t, r, i), s != e && a.bindTexture(t, s)
  }, r.texParameteri = function(e, t, r, i) {
      var n = this._ext,
          a = n.gl,
          s = n.cb.getCurrentTexture(t);
      s != e && a.bindTexture(t, e), a.texParameteri(t, r, i), s != e && a.bindTexture(t, s)
  }, r.texSubImage2D = function(e, t) {
      var r = this._ext,
          i = r.gl,
          n = r.textureTargetMap[t],
          a = r.cb.getCurrentTexture(n);
      a != e && i.bindTexture(n, e);
      var s = Array.prototype.slice.call(arguments, 1);
      i.texSubImage2D.apply(i, s), a != e && i.bindTexture(n, a)
  }, r.bindTexture = function(e, t, r) {
      var i = this._ext,
          n = i.gl,
          a = i.cb.getCurrentTextureUnit();
      a != e && n.activeTexture(e), n.bindTexture(t, r), a != e && n.activeTexture(a)
  }, !0)
}, SpiderGL.WebGL.Context.hijack = function(e) {
  if (e._spidergl) return !1;
  SpiderGL.WebGL.Context._prepareContex(e), SpiderGL.WebGL.Context._addExtension(e, "SGL_current_binding", "cb", SpiderGL.WebGL.Context._setup_SGL_current_binding), SpiderGL.WebGL.Context._addExtension(e, "SGL_wrapper_notify", "wn", SpiderGL.WebGL.Context._setup_SGL_wrapper_notify), SpiderGL.WebGL.Context._addExtension(e, "SGL_direct_state_access", "dsa", SpiderGL.WebGL.Context._setup_SGL_direct_state_access);
  var t = e.getExtension("SGL_current_binding"),
      r = e.getExtension("SGL_wrapper_notify"),
      i = e.getExtension("SGL_direct_state_access");
  return !!t && !!r && !!i
}, SpiderGL.WebGL.Context.isHijacked = function(e) {
  return !!e && !!e._spidergl
}, SpiderGL.WebGL.Context.getHijacked = function(e, t) {
  var r = SpiderGL.WebGL.Context.get(e, t);
  return SpiderGL.WebGL.Context.hijack(r), r
}, SpiderGL.WebGL.Context.setStandardGLUnpack = function(e) {
  e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, WebGLRenderingContext.prototype.NONE)
}, SpiderGL.WebGL.ObjectGL = function(e, t, r) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  r = SpiderGL.Utility.getDefaultObject({
      handle: null
  }, r), SpiderGL.Core.ObjectBase.call(this);
  e.getExtension("SGL_wrapper_notify");
  this._gl = e, this._cb = e.getExtension("SGL_current_binding"), this._dsa = e.getExtension("SGL_direct_state_access"), this._h = r.handle, this._t = t
}, SpiderGL.WebGL.ObjectGL.TARGET = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.ObjectGL.unbind = function(e) {}, SpiderGL.WebGL.ObjectGL.prototype = {
  get gl() {
      return this._gl
  },
  get handle() {
      return this._h
  },
  get target() {
      return this._t
  },
  get isValid() {
      return null != this._h
  },
  get isReady() {
      return !1
  },
  destroy: function() {},
  bind: function() {},
  unbind: function() {}
}, SpiderGL.Type.extend(SpiderGL.WebGL.ObjectGL, SpiderGL.Core.ObjectBase), SpiderGL.WebGL.Buffer = function(e, t, r) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  if (SpiderGL.Type.instanceOf(r, WebGLBuffer) ? r = {
          handle: r
      } : SpiderGL.Type.instanceOf(r, ArrayBuffer) || SpiderGL.Type.isTypedArray(r) ? r = {
          data: r
      } : SpiderGL.Type.isNumber(r) && (r = {
          size: r
      }), r = SpiderGL.Utility.getDefaultObject({
          handle: null,
          data: null,
          size: 0,
          usage: SpiderGL.WebGL.Buffer.DEFAULT_USAGE
      }, r), SpiderGL.WebGL.ObjectGL.call(this, e, t, r), this._h && this._h._spidergl && this._h._spidergl != this) return this._h._spidergl;
  e = this._gl;
  var i = this._cb,
      n = (this._dsa, this._t),
      a = this._h;
  i.pushBuffer(n), a ? (e.bindBuffer(n, a), r.size = e.getBufferParameter(n, e.BUFFER_SIZE), r.usage = e.getBufferParameter(n, e.BUFFER_USAGE)) : (a = e.createBuffer(), e.bindBuffer(n, a), this._h = a), i.popBuffer(n), a._spidergl = this, this._size = r.size, this._usage = r.usage, r.data ? this.setData(r.data, r.usage) : r.size && this.setSize(r.size, r.usage)
}, SpiderGL.WebGL.Buffer.TARGET = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.Buffer.DEFAULT_USAGE = WebGLRenderingContext.prototype.STATIC_DRAW, SpiderGL.WebGL.Buffer.DEFAULT_SUB_DATA_OFFSET = 0, SpiderGL.WebGL.Buffer.unbind = function(e) {}, SpiderGL.WebGL.Buffer.prototype = {
  _gl_deleteBuffer: function() {
      this._h = null
  },
  _gl_isBuffer: function() {},
  _gl_bindBuffer: function() {},
  _gl_getBufferParameter: function() {},
  _gl_bufferData: function() {
      var e = arguments[1],
          t = arguments[2];
      this._size = SpiderGL.Type.isNumber(e) ? e : e.byteLength, this._usage = t
  },
  _gl_bufferSubData: function() {},
  _gl_vertexAttribPointer: function() {},
  _gl_drawElements: function() {},
  get isReady() {
      return this._size > 0
  },
  get size() {
      return this._size
  },
  get usage() {
      return this._usage
  },
  setSize: function(e, t) {
      t = SpiderGL.Utility.getDefaultValue(t, SpiderGL.WebGL.Buffer.DEFAULT_USAGE), this._dsa.bufferData(this._h, this._t, e, t)
  },
  setData: function(e, t) {
      t = SpiderGL.Utility.getDefaultValue(t, SpiderGL.WebGL.Buffer.DEFAULT_USAGE), this._dsa.bufferData(this._h, this._t, e, t)
  },
  setSubData: function(e, t) {
      t = SpiderGL.Utility.getDefaultValue(t, SpiderGL.WebGL.Buffer.DEFAULT_SUB_DATA_OFFSET), this._dsa.bufferSubData(this._h, this._t, t, e)
  },
  destroy: function() {
      this._gl.deleteBuffer(this._h)
  },
  bind: function() {
      this._gl.bindBuffer(this._t, this._h)
  },
  unbind: function() {
      this._gl.bindBuffer(this._t, null)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.Buffer, SpiderGL.WebGL.ObjectGL), SpiderGL.WebGL.VertexBuffer = function(e, t) {
  return SpiderGL.WebGL.Context.isHijacked(e) ? (SpiderGL.WebGL.Buffer.call(this, e, SpiderGL.WebGL.VertexBuffer.TARGET, t), this._h && this._h._spidergl && this._h._spidergl != this ? this._h._spidergl : void 0) : null
}, SpiderGL.WebGL.VertexBuffer.TARGET = WebGLRenderingContext.prototype.ARRAY_BUFFER, SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_INDEX = 0, SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_SIZE = 3, SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_TYPE = WebGLRenderingContext.prototype.FLOAT, SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_NORMALIZED = !1, SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_STRIDE = 0, SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_OFFSET = 0, SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_ENABLE = !0, SpiderGL.WebGL.VertexBuffer.unbind = function(e) {
  e.bindBuffer(SpiderGL.WebGL.VertexBuffer.TARGET, null)
}, SpiderGL.WebGL.VertexBuffer.prototype = {
  vertexAttribPointer: function(e) {
      e = SpiderGL.Utility.getDefaultObject({
          index: SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_INDEX,
          size: SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_SIZE,
          glType: SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_TYPE,
          normalized: SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_NORMALIZED,
          stride: SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_STRIDE,
          offset: SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_OFFSET,
          enable: SpiderGL.WebGL.VertexBuffer.DEFAULT_ATTRIBUTE_ENABLE
      }, e), this._dsa.vertexAttribPointer(this._h, e.index, e.size, e.glType, e.normalized, e.stride, e.offset), e.enable && this._gl.enableVertexAttribArray(e.index)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.VertexBuffer, SpiderGL.WebGL.Buffer), SpiderGL.WebGL.IndexBuffer = function(e, t) {
  return SpiderGL.WebGL.Context.isHijacked(e) ? (SpiderGL.WebGL.Buffer.call(this, e, SpiderGL.WebGL.IndexBuffer.TARGET, t), this._h && this._h._spidergl && this._h._spidergl != this ? this._h._spidergl : void 0) : null
}, SpiderGL.WebGL.IndexBuffer.TARGET = WebGLRenderingContext.prototype.ELEMENT_ARRAY_BUFFER, SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_MODE = WebGLRenderingContext.prototype.TRIANGLES, SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_COUNT = -1, SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_TYPE = WebGLRenderingContext.prototype.UNSIGNED_SHORT, SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_OFFSET = 0, SpiderGL.WebGL.IndexBuffer.unbind = function(e) {
  e.bindBuffer(SpiderGL.WebGL.IndexBuffer.TARGET, null)
}, SpiderGL.WebGL.IndexBuffer.prototype = {
  drawElements: function(e) {
      if ((e = SpiderGL.Utility.getDefaultObject({
              glMode: SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_MODE,
              count: SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_COUNT,
              glType: SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_TYPE,
              offset: SpiderGL.WebGL.IndexBuffer.DEFAULT_DRAW_ELEMENTS_OFFSET
          }, e)).count < 1) {
          var t = SpiderGL.Type.typeSizeFromGL(e.glType);
          e.count = (this._size - e.offset) / t
      }
      this._dsa.drawElements(this._h, e.glMode, e.count, e.glType, e.offset)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.IndexBuffer, SpiderGL.WebGL.Buffer), SpiderGL.WebGL.Framebuffer = function(e, t) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  SpiderGL.Type.instanceOf(t, WebGLFramebuffer) && (t = {
      handle: t
  }), t = SpiderGL.Utility.getDefaultObject({
      handle: null,
      autoViewport: SpiderGL.WebGL.Framebuffer.DEFAULT_AUTO_VIEWPORT
  }, t);
  SpiderGL.WebGL.ObjectGL.call(this, e, SpiderGL.WebGL.Framebuffer.TARGET, t);
  if (this._h && this._h._spidergl && this._h._spidergl != this) return this._h._spidergl;
  e = this._gl;
  var r = this._cb,
      i = (this._dsa, this._t),
      n = this._h,
      a = !1;
  if (n ? a = !0 : (n = e.createFramebuffer(), this._h = n), n._spidergl = this, this._attachments = {}, this._status = 0, this._autoViewport = t.autoViewport, this._viewport = [0, 0, 1, 1], r.pushFramebuffer(i), e.bindFramebuffer(i, n), a) {
      var s = null,
          o = 0,
          u = 0;
      for (var d in SpiderGL.WebGL.Framebuffer._attachmentName) switch (s = e.getFramebufferAttachmentParameter(i, att, e.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME), e.getFramebufferAttachmentParameter(i, att, e.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE)) {
          case e.RENDERBUFFER:
              u = e.RENDERBUFFER, this._importRenderbuffer(i, d, u, s);
              break;
          case e.TEXTURE:
              o = e.getFramebufferAttachmentParameter(i, att, e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL), 0 == (u = e.getFramebufferAttachmentParameter(i, att, e.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE)) && (u = e.TEXTURE_2D), this._importTexture(i, d, u, s, o)
      }
  }
  this._status = e.checkFramebufferStatus(i), r.popFramebuffer(i), this.setAttachments(t)
}, SpiderGL.WebGL.Framebuffer.TARGET = WebGLRenderingContext.prototype.FRAMEBUFFER, SpiderGL.WebGL.Framebuffer.DEFAULT_AUTO_VIEWPORT = !0, SpiderGL.WebGL.Framebuffer.DEFAULT_ATTACHMENT_TEXTURE_LEVEL = 0, SpiderGL.WebGL.Framebuffer.DEFAULT_ATTACHMENT_CUBE_MAP_FACE = WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_X, SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_X = 0, SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_Y = 0, SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_WIDTH = -1, SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_HEIGHT = -1, SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_FORMAT = WebGLRenderingContext.prototype.RGBA, SpiderGL.WebGL.Framebuffer.DEFAULT_CLEAR_MASK = WebGLRenderingContext.prototype.COLOR_BUFFER_BIT | WebGLRenderingContext.prototype.DEPTH_BUFFER_BIT | WebGLRenderingContext.prototype.STENCIL_BUFFER_BIT, SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_TYPE = WebGLRenderingContext.UNSIGNED_BYTE, SpiderGL.WebGL.Framebuffer.unbind = function(e) {
  e.bindFramebuffer(SpiderGL.WebGL.Framebuffer.TARGET, null)
}, SpiderGL.WebGL.Framebuffer._attachmentName = {}, SpiderGL.WebGL.Framebuffer._attachmentName[WebGLRenderingContext.prototype.COLOR_ATTACHMENT0] = "color", SpiderGL.WebGL.Framebuffer._attachmentName[WebGLRenderingContext.prototype.DEPTH_ATTACHMENT] = "depth", SpiderGL.WebGL.Framebuffer._attachmentName[WebGLRenderingContext.prototype.STENCIL_ATTACHMENT] = "stencil", SpiderGL.WebGL.Framebuffer._attachmentName[WebGLRenderingContext.prototype.DEPTH_STENCIL_ATTACHMENT] = "depthStencil", SpiderGL.WebGL.Framebuffer.prototype = {
  _gl_deleteFramebuffer: function(e) {
      this._h = null
  },
  _gl_isFramebuffer: function(e) {},
  _gl_bindFramebuffer: function(e, t) {},
  _gl_checkFramebufferStatus: function(e) {},
  _gl_getFramebufferAttachmentParameter: function(e, t, r) {},
  _gl_framebufferRenderbuffer: function(e, t, r, i) {
      this._importRenderbuffer.apply(this, arguments), this._status = this._gl.checkFramebufferStatus(this._t)
  },
  _gl_framebufferTexture2D: function(e, t, r, i, n) {
      this._importTexture.apply(this, arguments), this._status = this._gl.checkFramebufferStatus(this._t)
  },
  _gl_clear: function(e) {},
  _gl_readPixels: function(e, t, r, i, n, a, s) {},
  _importTexture: function(e, t, r, i, n) {
      var a = SpiderGL.WebGL.Framebuffer._attachmentName[t];
      if (a)
          if (i) {
              var s = this._gl,
                  o = {
                      attachment: t,
                      resource: null,
                      target: r,
                      level: n,
                      face: s.NONE
                  };
              this._attachments[a] = o, r == s.TEXTURE_2D ? o.resource = new SpiderGL.WebGL.Texture2D(s, {
                  handle: i
              }) : (o.resource = new SpiderGL.WebGL.TextureCubeMap(s, {
                  handle: i
              }), o.face = r), this._viewport = [0, 0, SpiderGL.Math.max(o.resource.width, 1), SpiderGL.Math.max(o.resource.height, 1)]
          } else delete this._attachments[a]
  },
  _importRenderbuffer: function(e, t, r, i) {
      var n = SpiderGL.WebGL.Framebuffer._attachmentName[t];
      if (n)
          if (i) {
              var a = this._gl,
                  s = {
                      attachment: t,
                      resource: null,
                      target: r,
                      level: 0,
                      face: a.NONE
                  };
              this._attachments[n] = s, s.resource = new SpiderGL.WebGL.Renderbuffer(a, {
                  handle: i
              }), this._viewport = [0, 0, SpiderGL.Math.max(s.resource.width, 1), SpiderGL.Math.max(s.resource.height, 1)]
          } else delete this._attachments[n]
  },
  _setAttachment: function(e, t) {
      var r = SpiderGL.WebGL.Framebuffer._attachmentName[e];
      if (!r) return !1;
      var i = this._gl;
      if (!(!t || "resource" in t && !t.resource)) {
          var n = i.NONE;
          SpiderGL.Type.instanceOf(t, WebGLTexture) ? (t = {
              resource: t
          }, n = i.TEXTURE) : SpiderGL.Type.instanceOf(t, WebGLRenderbuffer) ? (t = {
              resource: t
          }, n = i.RENDERBUFFER) : SpiderGL.Type.instanceOf(t, SpiderGL.WebGL.Texture) ? (t = {
              resource: t.handle
          }, n = i.TEXTURE) : SpiderGL.Type.instanceOf(t, SpiderGL.WebGL.Renderbuffer) && (t = {
              resource: t.handle
          }, n = i.RENDERBUFFER);
          var a = !!t && void 0 !== t.face;
          t = SpiderGL.Utility.getDefaultObject({
              resource: null,
              level: SpiderGL.WebGL.Framebuffer.DEFAULT_ATTACHMENT_TEXTURE_LEVEL,
              face: SpiderGL.WebGL.Framebuffer.DEFAULT_ATTACHMENT_CUBE_MAP_FACE
          }, t);
          var s = this._t;
          switch (n) {
              case i.TEXTURE:
                  var o = SpiderGL.Type.instanceOf(t, SpiderGL.WebGL.TextureCubeMap) || a ? t.face : i.TEXTURE_2D;
                  i.framebufferTexture2D(s, e, o, t.resource, t.level);
                  break;
              case i.RENDERBUFFER:
                  i.framebufferRenderbuffer(s, e, i.RENDERBUFFER, t.resource)
          }
          return !0
      }
      var u = this._attachments[r];
      u && (u.target === i.RENDERBUFFER ? i.framebufferRenderbuffer(s, u.attachment, i.RENDERBUFFER, null) : i.framebufferTexture2D(s, u.attachment, i.TEXTURE_2D, null, 0))
  },
  get isReady() {
      return this.isComplete
  },
  get status() {
      return this._status
  },
  get isComplete() {
      return this._status === this._gl.FRAMEBUFFER_COMPLETE
  },
  get viewport() {
      return this._viewport.slice()
  },
  get width() {
      return this._viewport[2]
  },
  get height() {
      return this._viewport[3]
  },
  get autoViewport() {
      return this._autoViewport
  },
  set autoViewport(e) {
      this._autoViewport = !!e
  },
  setAttachments: function(e) {
      e = e || {};
      var t = this._gl,
          r = this._cb,
          i = this._t,
          n = this._h;
      return r.pushFramebuffer(i), t.bindFramebuffer(i, n), "color" in e && this._setAttachment(t.COLOR_ATTACHMENT0, e.color), "depthStencil" in e ? (this._setAttachment(t.DEPTH_ATTACHMENT, null), this._setAttachment(t.STENCIL_ATTACHMENT, null), this._setAttachment(t.DEPTH_STENCIL_ATTACHMENT, e.depthStencil)) : "depth" in e ? (this._setAttachment(t.DEPTH_STENCIL_ATTACHMENT, null), this._setAttachment(t.STENCIL_ATTACHMENT, null), this._setAttachment(t.DEPTH_ATTACHMENT, e.depth)) : "stencil" in e && (this._setAttachment(t.DEPTH_STENCIL_ATTACHMENT, null), this._setAttachment(t.DEPTH_ATTACHMENT, null), this._setAttachment(t.STENCIL_ATTACHMENT, e.stencil)), this._status = t.checkFramebufferStatus(i), r.popFramebuffer(i), this.isComplete
  },
  getAttachments: function() {
      var e = {},
          t = null;
      for (var r in this._attachments) t = this._attachments[r], e[r] = {
          attachment: t.attachment,
          resource: t.resource,
          target: t.target,
          level: t.level
      };
      return e
  },
  detachAll: function() {
      this.setAttachments({
          color: null,
          depthStencil: null
      })
  },
  get colorTarget() {
      var e = this._attachments.color;
      return e ? e.resource : null
  },
  set colorTarget(e) {
      this.setAttachments({
          color: e
      })
  },
  get depthTarget() {
      var e = this._attachments.depth;
      return e ? e.resource : null
  },
  set depthTarget(e) {
      this.setAttachments({
          depth: e
      })
  },
  get stencilTarget() {
      var e = this._attachments.stencil;
      return e ? e.resource : null
  },
  set stencilTarget(e) {
      this.setAttachments({
          stencil: e
      })
  },
  get depthStencilTarget() {
      var e = this._attachments.depthStencil;
      return e ? e.resource : null
  },
  set depthStencilTarget(e) {
      this.setAttachments({
          depthStencil: e
      })
  },
  clear: function(e) {
      e = SpiderGL.Utility.getDefaultValue(e, SpiderGL.WebGL.Framebuffer.DEFAULT_CLEAR_MASK), this._dsa.clear(this._h, e)
  },
  readPixels: function(e, t) {
      (t = SpiderGL.Utility.getDefaultObject({
          x: SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_X,
          y: SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_Y,
          width: SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_WIDTH,
          height: SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_HEIGHT,
          format: SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_FORMAT,
          type: SpiderGL.WebGL.Framebuffer.DEFAULT_READ_PIXELS_TYPE
      }, t)).width < 0 && (t.width = this._viewport[2]), t.height < 0 && (t.height = this._viewport[3]), this._dsa.readPixels(this._h, t.x, t.y, t.width, t.height, t.format, t.type, e)
  },
  applyViewport: function() {
      var e = this._gl,
          t = this._viewport;
      e.viewport(t[0], t[1], t[2], t[3])
  },
  destroy: function() {
      this._gl.deleteFramebuffer(this._h)
  },
  bind: function(e) {
      var t = this._gl;
      if (t.bindFramebuffer(this._t, this._h), SpiderGL.Utility.getDefaultValue(e, this._autoViewport)) {
          var r = this._viewport;
          t.viewport(r[0], r[1], r[2], r[3])
      }
  },
  unbind: function() {
      this._gl.bindFramebuffer(this._t, null)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.Framebuffer, SpiderGL.WebGL.ObjectGL), SpiderGL.WebGL.Program = function(e, t) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  if (SpiderGL.Type.instanceOf(t, WebGLProgram) && (t = {
          handle: t
      }), t = SpiderGL.Utility.getDefaultObject({
          handle: null,
          autoLink: SpiderGL.WebGL.Program.DEFAULT_AUTO_LINK
      }, t), SpiderGL.WebGL.ObjectGL.call(this, e, SpiderGL.WebGL.Program.TARGET, t), this._h && this._h._spidergl && this._h._spidergl != this) return this._h._spidergl;
  e = this._gl, this._cb, this._dsa;
  var r = this._h,
      i = !1,
      n = "",
      a = !1;
  if (r ? (a = !0, i = !!e.getProgramParameter(r, e.LINK_STATUS), (n = e.getProgramInfoLog(r)) || (n = "")) : (r = e.createProgram(), this._h = r), r._spidergl = this, this._shaders = [], this._linked = i, this._log = n, this._autoLink = t.autoLink, this._attributes = {}, this._uniforms = {}, a)
      for (var s = e.getAttachedShaders(r), o = 0, u = s.length; o < u; ++o) this._importShader(s[o]);
  var d = !1;
  this._addShaders(t.shaders) && (d = !0), this._setAttributes(t.attributes) && (d = !0), d && this._autoLink ? this.link() : a && this._postLink(), this.setUniforms(t.uniforms)
}, SpiderGL.WebGL.Program.TARGET = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.Program.DEFAULT_AUTO_LINK = !0, SpiderGL.WebGL.Program.unbind = function(e) {
  e.useProgram(null)
}, SpiderGL.WebGL.Program._uniformSetFunctions = {}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.BOOL] = function(e, t, r) {
  e.uniform1i(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.BOOL_VEC2] = function(e, t, r) {
  e.uniform2iv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.BOOL_VEC3] = function(e, t, r) {
  e.uniform3iv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.BOOL_VEC4] = function(e, t, r) {
  e.uniform4iv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.INT] = function(e, t, r) {
  e.uniform1i(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.INT_VEC2] = function(e, t, r) {
  e.uniform2iv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.INT_VEC3] = function(e, t, r) {
  e.uniform3iv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.INT_VEC4] = function(e, t, r) {
  e.uniform4iv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.FLOAT] = function(e, t, r) {
  e.uniform1f(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.FLOAT_VEC2] = function(e, t, r) {
  e.uniform2fv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.FLOAT_VEC3] = function(e, t, r) {
  e.uniform3fv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.FLOAT_VEC4] = function(e, t, r) {
  e.uniform4fv(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.FLOAT_MAT2] = function(e, t, r) {
  e.uniformMatrix2fv(t, this.location, !1, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.FLOAT_MAT3] = function(e, t, r) {
  e.uniformMatrix3fv(t, this.location, !1, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.FLOAT_MAT4] = function(e, t, r) {
  e.uniformMatrix4fv(t, this.location, !1, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.SAMPLER_2D] = function(e, t, r) {
  e.uniform1i(t, this.location, r)
}, SpiderGL.WebGL.Program._uniformSetFunctions[WebGLRenderingContext.prototype.SAMPLER_CUBE] = function(e, t, r) {
  e.uniform1i(t, this.location, r)
}, SpiderGL.WebGL.Program.prototype = {
  _gl_deleteProgram: function(e) {
      this._h = null
  },
  _gl_isProgram: function(e) {},
  _gl_useProgram: function(e) {},
  _gl_getActiveAttrib: function(e, t) {},
  _gl_getActiveUniform: function(e, t) {},
  _gl_getAttachedShaders: function(e) {},
  _gl_getAttribLocation: function(e, t) {},
  _gl_getProgramParameter: function(e, t) {},
  _gl_getProgramInfoLog: function(e) {},
  _gl_getUniform: function(e, t) {},
  _gl_getUniformLocation: function(e, t) {},
  _gl_attachShader: function(e, t) {
      this._importShader(t)
  },
  _gl_bindAttribLocation: function(e, t, r) {},
  _gl_detachShader: function(e, t) {
      if (t) {
          var r = this._shaderHandleIndex(t);
          r < 0 || this._shaders.splice(r, 1)
      }
  },
  _gl_linkProgram: function(e) {
      this._postLink()
  },
  _gl_uniform1f: function(e, t) {},
  _gl_uniform1fv: function(e, t) {},
  _gl_uniform1i: function(e, t) {},
  _gl_uniform1iv: function(e, t) {},
  _gl_uniform2f: function(e, t, r) {},
  _gl_uniform2fv: function(e, t) {},
  _gl_uniform2i: function(e, t, r) {},
  _gl_uniform2iv: function(e, t) {},
  _gl_uniform3f: function(e, t, r, i) {},
  _gl_uniform3fv: function(e, t) {},
  _gl_uniform3i: function(e, t, r, i) {},
  _gl_uniform3iv: function(e, t) {},
  _gl_uniform4f: function(e, t, r, i, n) {},
  _gl_uniform4fv: function(e, t) {},
  _gl_uniform4i: function(e, t, r, i, n) {},
  _gl_uniform4iv: function(e, t) {},
  _gl_uniformMatrix2fv: function(e, t, r) {},
  _gl_uniformMatrix3fv: function(e, t, r) {},
  _gl_uniformMatrix4fv: function(e, t, r) {},
  _gl_validateProgram: function(e) {},
  _shaderHandleIndex: function(e) {
      for (var t = 0, r = this._shaders.length; t < r; ++t)
          if (this._shaders[t].handle === e) return t;
      return -1
  },
  _shaderIndex: function(e) {
      if (this._shaders.indexOf) return this._shaders.indexOf(e);
      for (var t = 0, r = this._shaders.length; t < r; ++t)
          if (this._shaders[t] === e) return t;
      return -1
  },
  _importShader: function(e) {
      if (e && !(this._shaderHandleIndex(e) >= 0)) {
          var t = this._gl,
              r = e._spidergl;
          if (!r) switch (t.getShaderParameter(e, t.SHADER_TYPE)) {
              case t.VERTEX_SHADER:
                  r = new SpiderGL.WebGL.VertexShader(t, {
                      handle: e
                  });
                  break;
              case t.FRAGMENT_SHADER:
                  r = new SpiderGL.WebGL.FragmentShader(t, {
                      handle: e
                  });
                  break;
              default:
                  return
          }
          this._shaders.push(r)
      }
  },
  _updateActiveInfo: function() {
      var e = this._gl,
          t = this._h,
          r = 0,
          i = null,
          n = null,
          a = null,
          s = {};
      r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
      for (var o = 0; o < r; ++o) n = (i = e.getActiveAttrib(t, o)).name, a = e.getAttribLocation(t, n), s[n] = {
          index: o,
          name: n,
          size: i.size,
          type: i.type,
          location: a
      };
      var u = {};
      r = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
      for (o = 0; o < r; ++o)
          if (n = (i = e.getActiveUniform(t, o)).name, a = e.getUniformLocation(t, n), u[n] = {
                  index: o,
                  name: n,
                  size: i.size,
                  type: i.type,
                  location: a,
                  setValue: SpiderGL.WebGL.Program._uniformSetFunctions[i.type]
              }, i.size > 1) {
              var d = n.lastIndexOf("[0]");
              if (d == n.length - 3)
                  for (var p = n.slice(0, d), h = 1; h < i.size; ++h) {
                      var _ = p + "[" + h + "]";
                      a = e.getUniformLocation(t, _), u[_] = {
                          index: o,
                          name: _,
                          size: i.size,
                          type: i.type,
                          location: a,
                          setValue: SpiderGL.WebGL.Program._uniformSetFunctions[i.type]
                      }
                  }
          } this._attributes = s, this._uniforms = u
  },
  _postLink: function() {
      var e = this._gl,
          t = this._h;
      this._linked = !!e.getProgramParameter(t, e.LINK_STATUS), this._log = e.getProgramInfoLog(t), this._log || (this._log = ""), this._updateActiveInfo()
  },
  _addShaders: function(e) {
      if (!e) return !1;
      for (var t = this._gl, r = this._h, i = null, n = null, a = 0, s = e.length; a < s; ++a) i = e[a], n = null, SpiderGL.Type.instanceOf(i, SpiderGL.WebGL.Shader) && (n = i.handle), SpiderGL.Type.instanceOf(i, WebGLShader) && (n = i), n && t.attachShader(r, n);
      return !0
  },
  _removeShaders: function(e) {
      if (!e) return !1;
      for (var t = this._gl, r = this._h, i = null, n = null, a = 0, s = e.length; a < s; ++a) i = e[a], n = null, SpiderGL.Type.instanceOf(i, SpiderGL.WebGL.Shader) && (n = i.handle), SpiderGL.Type.instanceOf(i, SpiderGL.WebGL.Shader) && (n = i), n && t.detachShader(r, n);
      return !0
  },
  _setAttributes: function(e) {
      if (!e) return !1;
      var t = this._gl,
          r = this._h;
      for (var i in e) t.bindAttribLocation(r, e[i], i);
      return !0
  },
  get isReady() {
      return this.isLinked
  },
  get isLinked() {
      return this._linked
  },
  get log() {
      return this._log
  },
  get autoLink() {
      return this._autoLink
  },
  set autoLink(e) {
      this._autoLink = !!e
  },
  addShaders: function(e, t) {
      var r = this._addShaders(e);
      return !r || (!(r = SpiderGL.Utility.getDefaultValue(t, this._autoLink)) || this.link())
  },
  removeShaders: function(e, t) {
      var r = this._removeShaders(e);
      return !r || (!(r = SpiderGL.Utility.getDefaultValue(t, this._autoLink)) || this.link())
  },
  hasShader: function(e) {
      return this._shaderIndex(e) >= 0
  },
  getShaders: function() {
      return this._shaders.slice()
  },
  link: function() {
      return this._gl.linkProgram(this._h), this._linked
  },
  validate: function() {
      var e = this._gl,
          t = this._h;
      return e.validateProgram(t), !!e.getProgramParameter(t, e.VALIDATE_STATUS)
  },
  setAttributes: function(e) {
      return !!this._setAttributes(e) && (!this._autoLink || this.link())
  },
  getAttributesNames: function() {
      var e = this._attributes,
          t = [];
      for (var r in e) t.push(e[r].name);
      return t
  },
  getAttributesIndices: function() {
      var e = this._attributes,
          t = {};
      for (var r in e) t[r] = e[r].location;
      return t
  },
  getAttributesInfo: function() {
      var e = this._attributes,
          t = null,
          r = {};
      for (var i in e) t = e[i], r[i] = {
          index: t.index,
          name: t.name,
          size: t.size,
          type: t.type,
          location: t.location
      };
      return r
  },
  setUniforms: function(e) {
      if (!e) return !1;
      var t = this._gl,
          r = this._cb,
          i = this._dsa,
          n = this._h;
      r.pushProgram(), t.useProgram(n);
      var a = this._uniforms,
          s = null;
      for (var o in e)(s = a[o]) && s.setValue(i, n, e[o]);
      return r.popProgram(), !0
  },
  getUniformsNames: function() {
      var e = this._uniforms,
          t = [];
      for (var r in e) t.push(e[r].name);
      return t
  },
  getUniformsValues: function() {
      var e = this._gl,
          t = this._h,
          r = this._uniforms,
          i = {};
      for (var n in r) i[n] = e.getUniform(t, r[n].location);
      return i
  },
  getUniformsInfo: function() {
      var e = this._uniforms,
          t = null,
          r = {};
      for (var i in e) t = e[i], r[i] = {
          index: t.index,
          name: t.name,
          size: t.size,
          type: t.type,
          location: t.location
      };
      return r
  },
  destroy: function() {
      this._gl.deleteProgram(this._h)
  },
  bind: function() {
      this._gl.useProgram(this._h)
  },
  unbind: function() {
      this._gl.useProgram(null)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.Program, SpiderGL.WebGL.ObjectGL), SpiderGL.WebGL.Renderbuffer = function(e, t) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  if (SpiderGL.Type.instanceOf(n, WebGLRenderbuffer) && (t = {
          handle: t
      }), t = SpiderGL.Utility.getDefaultObject({
          handle: null
      }, t), SpiderGL.WebGL.ObjectGL.call(this, e, SpiderGL.WebGL.Renderbuffer.TARGET, t), this._h && this._h._spidergl && this._h._spidergl != this) return this._h._spidergl;
  e = this._gl;
  var r = this._cb,
      i = (this._dsa, this._t),
      n = this._h,
      a = e.NONE,
      s = 0,
      o = 0;
  n ? (r.pushRenderbuffer(i), e.bindRenderbuffer(i, n), a = e.getRenderbufferParameter(i, e.RENDERBUFFER_INTERNAL_FORMAT), s = e.getRenderbufferParameter(i, e.RENDERBUFFER_WIDTH), o = e.getRenderbufferParameter(i, e.RENDERBUFFER_HEIGHT), r.popRenderbuffer(i)) : (n = e.createRenderbuffer(), this._h = n), n._spidergl = this, this._width = s, this._height = o, this._format = a, SpiderGL.Type.isNumber(t.internalFormat) && SpiderGL.Type.isNumber(t.width) && SpiderGL.Type.isNumber(t.height) && this.setStorage(t.internalFormat, t.width, t.height, t.format)
}, SpiderGL.WebGL.Renderbuffer.TARGET = WebGLRenderingContext.prototype.RENDERBUFFER, SpiderGL.WebGL.Renderbuffer.unbind = function(e) {
  e.bindRenderbuffer(SpiderGL.WebGL.Renderbuffer.TARGET, null)
}, SpiderGL.WebGL.Renderbuffer.prototype = {
  _gl_deleteRenderbuffer: function(e) {
      this._h = null
  },
  _gl_isRenderbuffer: function(e) {},
  _gl_bindRenderbuffer: function(e, t) {},
  _gl_getRenderbufferParameter: function(e, t) {},
  _gl_renderbufferStorage: function(e, t, r, i) {
      this._format = t, this._width = r, this._height = i
  },
  get isReady() {
      return this._width > 0 && this._height > 0
  },
  get format() {
      return this._format
  },
  get width() {
      return this._width
  },
  get height() {
      return this._height
  },
  setStorage: function(e, t, r) {
      this._dsa.renderbufferStorage(this._h, this._t, e, t, r)
  },
  destroy: function() {
      this._gl.deleteRenderbuffer(this._h)
  },
  bind: function() {
      this._gl.bindRenderbuffer(this._t, this._h)
  },
  unbind: function() {
      this._gl.bindRenderbuffer(this._t, null)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.Renderbuffer, SpiderGL.WebGL.ObjectGL), SpiderGL.WebGL.Shader = function(e, t, r, i) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  if (SpiderGL.Type.instanceOf(i, WebGLShader) ? i = {
          handle: i
      } : SpiderGL.Type.isString(i) && (i = {
          source: i
      }), i = SpiderGL.Utility.getDefaultObject({
          handle: null,
          source: null,
          autoCompile: SpiderGL.WebGL.Shader.DEFAULT_AUTO_COMPILE
      }, i), SpiderGL.WebGL.ObjectGL.call(this, e, t, i), this._h && this._h._spidergl && this._h._spidergl != this) return this._h._spidergl;
  e = this._gl, this._cb, this._dsa;
  var n = "",
      a = !1,
      s = "",
      o = this._h;
  o ? ((n = e.getShaderSource(o)) || (n = ""), a = !!e.getShaderParameter(o, e.COMPILE_STATUS), !!e.getShaderParameter(o, e.DELETE_STATUS), (s = e.getShaderInfoLog(o)) || (s = "")) : (o = e.createShader(r), this._h = o), o._spidergl = this, this._source = n, this._compiled = a, this._log = s, this._autoCompile = i.autoCompile, i.source && this.setSource(i.source)
}, SpiderGL.WebGL.Shader.TARGET = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.Shader.DEFAULT_AUTO_COMPILE = !0, SpiderGL.WebGL.Shader.unbind = function(e) {}, SpiderGL.WebGL.Shader.prototype = {
  _gl_deleteShader: function(e) {
      this._h = null
  },
  _gl_isShader: function(e) {},
  _gl_getShaderParameter: function(e, t) {},
  _gl_getShaderInfoLog: function(e) {},
  _gl_getShaderSource: function(e) {},
  _gl_compileShader: function(e) {
      this._postCompile()
  },
  _gl_shaderSource: function(e, t) {
      this._source = t, this._source || (this._source = "")
  },
  _postCompile: function() {
      var e = this._gl,
          t = this._h;
      this._compiled = !!e.getShaderParameter(t, e.COMPILE_STATUS), this._log = e.getShaderInfoLog(t), this._log || (this._log = "")
  },
  get isReady() {
      return this.isCompiled
  },
  get isCompiled() {
      return this._compiled
  },
  get log() {
      return this._log
  },
  get autoCompile() {
      return this._autoCompile
  },
  set autoCompile(e) {
      this._autoCompile = !!e
  },
  setSource: function(e, t) {
      var r = this._gl,
          i = this._h;
      r.shaderSource(i, e);
      SpiderGL.Utility.getDefaultValue(t, this._autoCompile);
      return this.compile()
  },
  get source() {
      return this._source
  },
  set source(e) {
      this.setSource(e)
  },
  compile: function() {
      return this._gl.compileShader(this._h), this._compiled
  },
  destroy: function() {
      this._gl.deleteShader(this._h)
  },
  bind: function() {},
  unbind: function() {}
}, SpiderGL.Type.extend(SpiderGL.WebGL.Shader, SpiderGL.WebGL.ObjectGL), SpiderGL.WebGL.VertexShader = function(e, t) {
  return SpiderGL.WebGL.Context.isHijacked(e) ? (SpiderGL.WebGL.Shader.call(this, e, SpiderGL.WebGL.VertexShader.TARGET, e.VERTEX_SHADER, t), this._h && this._h._spidergl && this._h._spidergl != this ? this._h._spidergl : void 0) : null
}, SpiderGL.WebGL.VertexShader.TARGET = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.VertexShader.unbind = function(e) {}, SpiderGL.WebGL.VertexShader.prototype = {}, SpiderGL.Type.extend(SpiderGL.WebGL.VertexShader, SpiderGL.WebGL.Shader), SpiderGL.WebGL.FragmentShader = function(e, t) {
  return SpiderGL.WebGL.Context.isHijacked(e) ? (SpiderGL.WebGL.Shader.call(this, e, SpiderGL.WebGL.FragmentShader.TARGET, e.FRAGMENT_SHADER, t), this._h && this._h._spidergl && this._h._spidergl != this ? this._h._spidergl : void 0) : null
}, SpiderGL.WebGL.FragmentShader.TARGET = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.FragmentShader.unbind = function(e) {}, SpiderGL.WebGL.FragmentShader.prototype = {}, SpiderGL.Type.extend(SpiderGL.WebGL.FragmentShader, SpiderGL.WebGL.Shader), SpiderGL.WebGL.Texture = function(e, t, r) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  if (SpiderGL.Type.instanceOf(r, WebGLTexture) ? r = {
          handle: r
      } : SpiderGL.Type.isString(r) && (r = {
          url: r
      }), r = SpiderGL.Utility.getDefaultObject({
          handle: null,
          magFilter: SpiderGL.WebGL.Texture.DEFAULT_MAG_FILTER,
          minFilter: SpiderGL.WebGL.Texture.DEFAULT_MIN_FILTER,
          wrapS: SpiderGL.WebGL.Texture.DEFAULT_WRAP_S,
          wrapT: SpiderGL.WebGL.Texture.DEFAULT_WRAP_T,
          flipYPolicy: SpiderGL.WebGL.Context.DEFAULT_UNPACK_FLIP_Y,
          premultiplyAlphaPolicy: SpiderGL.WebGL.Context.DEFAULT_UNPACK_PREMULTIPLY_ALPHA,
          colorspaceConversionPolicy: SpiderGL.WebGL.Context.DEFAULT_UNPACK_COLORSPACE_CONVERSION,
          autoMipmap: SpiderGL.WebGL.Texture.DEFAULT_AUTO_GENERATE_MIPMAP,
          format: e.NONE,
          width: 0,
          height: 0
      }, r), SpiderGL.WebGL.ObjectGL.call(this, e, t, r), this._h && this._h._spidergl && this._h._spidergl != this) return this._h._spidergl;
  e = this._gl;
  var i = this._cb,
      n = (this._dsa, this._t),
      a = this._h;
  a || (a = e.createTexture(), this._h = a), i.pushTexture(n), e.bindTexture(n, a), this._magFilter = e.getTexParameter(n, e.TEXTURE_MAG_FILTER), this._minFilter = e.getTexParameter(n, e.TEXTURE_MIN_FILTER), this._wrapS = e.getTexParameter(n, e.TEXTURE_WRAP_S), this._wrapT = e.getTexParameter(n, e.TEXTURE_WRAP_T), i.popTexture(n), a._spidergl = this, this._format = r.format, this._width = r.width, this._height = r.height, this._flipY = r.flipYPolicy, this._premultiplyAlpha = r.premultiplyAlphaPolicy, this._colorspaceConversion = r.colorspaceConversionPolicy, this._autoMipmap = r.autoMipmap, this._missingFaces = SpiderGL.WebGL.Texture._FACE_ALL_BITS, this.setSampler(r)
}, SpiderGL.WebGL.Texture.TARGET = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.Texture.DEFAULT_BORDER = 0, SpiderGL.WebGL.Texture.DEFAULT_FORMAT = WebGLRenderingContext.prototype.RGBA, SpiderGL.WebGL.Texture.DEFAULT_AUTO_GENERATE_MIPMAP = !1, SpiderGL.WebGL.Texture.DEFAULT_INTERNAL_FORMAT = WebGLRenderingContext.prototype.RGBA, SpiderGL.WebGL.Texture.DEFAULT_LEVEL = 0, SpiderGL.WebGL.Texture.DEFAULT_MAG_FILTER = WebGLRenderingContext.prototype.LINEAR, SpiderGL.WebGL.Texture.DEFAULT_MIN_FILTER = WebGLRenderingContext.prototype.LINEAR, SpiderGL.WebGL.Texture.DEFAULT_TYPE = WebGLRenderingContext.prototype.UNSIGNED_BYTE, SpiderGL.WebGL.Texture.DEFAULT_WRAP_S = WebGLRenderingContext.prototype.REPEAT, SpiderGL.WebGL.Texture.DEFAULT_WRAP_T = WebGLRenderingContext.prototype.REPEAT, SpiderGL.WebGL.Texture.DEFAULT_X_OFFSET = 0, SpiderGL.WebGL.Texture.DEFAULT_Y_OFFSET = 0, SpiderGL.WebGL.Texture.DEFAULT_UNPACK_FLIP_Y = !0, SpiderGL.WebGL.Texture.DEFAULT_UNPACK_PREMULTIPLY_ALPHA = !1, SpiderGL.WebGL.Texture.DEFAULT_UNPACK_COLORSPACE_CONVERSION = WebGLRenderingContext.prototype.NONE, SpiderGL.WebGL.Texture.unbind = function(e) {}, SpiderGL.WebGL.Texture._FACE_POSITIVE_X_BIT = 1, SpiderGL.WebGL.Texture._FACE_NEGATIVE_X_BIT = 2, SpiderGL.WebGL.Texture._FACE_POSITIVE_Y_BIT = 4, SpiderGL.WebGL.Texture._FACE_NEGATIVE_Y_BIT = 8, SpiderGL.WebGL.Texture._FACE_POSITIVE_Z_BIT = 16, SpiderGL.WebGL.Texture._FACE_NEGATIVE_Z_BIT = 32, SpiderGL.WebGL.Texture._FACE_ALL_BITS = SpiderGL.WebGL.Texture._FACE_POSITIVE_X_BIT | SpiderGL.WebGL.Texture._FACE_NEGATIVE_X_BIT | SpiderGL.WebGL.Texture._FACE_POSITIVE_Y_BIT | SpiderGL.WebGL.Texture._FACE_NEGATIVE_Y_BIT | SpiderGL.WebGL.Texture._FACE_POSITIVE_Z_BIT | SpiderGL.WebGL.Texture._FACE_NEGATIVE_Z_BIT, SpiderGL.WebGL.Texture._faceBits = {}, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_2D] = SpiderGL.WebGL.Texture._FACE_ALL_BITS, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP] = SpiderGL.WebGL.Texture._FACE_ALL_BITS, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_X] = SpiderGL.WebGL.Texture._FACE_POSITIVE_X_BIT, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_X] = SpiderGL.WebGL.Texture._FACE_NEGATIVE_X_BIT, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Y] = SpiderGL.WebGL.Texture._FACE_POSITIVE_Y_BIT, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Y] = SpiderGL.WebGL.Texture._FACE_NEGATIVE_Y_BIT, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Z] = SpiderGL.WebGL.Texture._FACE_POSITIVE_Z_BIT, SpiderGL.WebGL.Texture._faceBits[WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Z] = SpiderGL.WebGL.Texture._FACE_NEGATIVE_Z_BIT, SpiderGL.WebGL.Texture.prototype = {
  _gl_deleteTexture: function(e) {
      this._h = null
  },
  _gl_isTexture: function(e) {},
  _gl_bindTexture: function(e, t) {},
  _gl_getTexParameter: function(e, t) {},
  _gl_copyTexImage2D: function(e, t, r, i, n, a, s, o) {
      0 == t && (this._format = r, this._width = a, this._height = s)
  },
  _gl_copyTexSubImage2D: function(e, t, r, i, n, a, s, o, u) {},
  _gl_generateMipmap: function(e) {},
  _gl_texImage2D: function(e) {
      var t = arguments.length;
      6 === t ? 0 === arguments[1] && (this._format = arguments[2], this._width = arguments[5].width, this._height = arguments[5].height) : 9 === t && 0 === arguments[1] && (this._format = arguments[2], this._width = arguments[3], this._height = arguments[4])
  },
  _gl_texParameterf: function(e, t, r) {
      this._setTexParameter(t, r)
  },
  _gl_texParameteri: function(e, t, r) {
      this._setTexParameter(t, r)
  },
  _gl_texSubImage2D: function(e) {},
  _setTexParameter: function(e, t) {
      var r = this._gl;
      switch (e) {
          case r.TEXTURE_MAG_FILTER:
              this._magFilter = t;
              break;
          case r.TEXTURE_MIN_FILTER:
              this._minFilter = t;
              break;
          case r.TEXTURE_WRAP_S:
              this._wrapS = t;
              break;
          case r.TEXTURE_WRAP_T:
              this._wrapT = t
      }
  },
  _setImageData: function(e, t, r) {
      var i = !!(r = SpiderGL.Utility.getDefaultObject({
              internalFormat: SpiderGL.WebGL.Texture.DEFAULT_INTERNAL_FORMAT,
              border: SpiderGL.WebGL.Texture.DEFAULT_BORDER,
              xoffset: SpiderGL.WebGL.Texture.DEFAULT_X_OFFSET,
              yoffset: SpiderGL.WebGL.Texture.DEFAULT_Y_OFFSET,
              level: SpiderGL.WebGL.Texture.DEFAULT_LEVEL,
              format: SpiderGL.WebGL.Texture.DEFAULT_FORMAT,
              type: SpiderGL.WebGL.Texture.DEFAULT_TYPE,
              width: 0,
              height: 0,
              generateMipmap: this._autoMipmap,
              flipY: this._flipY,
              premultiplyAlpha: this._premultiplyAlpha,
              colorspaceConversion: this._colorspaceConversion,
              data: null,
              url: null,
              onCancel: null,
              onError: null,
              onProgress: null,
              onSuccess: null
          }, r)).url,
          n = !1;
      i || (n = !r.data || SpiderGL.Type.isTypedArray(r.data));
      var a = !1;
      i || n || (a = SpiderGL.Type.instanceOf(r.data, HTMLImageElement) || SpiderGL.Type.instanceOf(r.data, HTMLCanvasElement) || SpiderGL.Type.instanceOf(r.data, HTMLVideoElement)) || "undefined" != typeof ImageData && (a = SpiderGL.Type.instanceOf(r.data, ImageData));
      var s = this._gl,
          o = (this._cb, this._dsa),
          u = t,
          d = this._h,
          p = -1,
          h = -1,
          _ = -1,
          f = -1,
          l = -1,
          c = -1;
      (n || a) && ((p = r.flipY) != SpiderGL.Core.DONT_CARE && (p == (h = s.getParameter(s.UNPACK_FLIP_Y_WEBGL)) ? h = -1 : s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, p)), (_ = r.premultiplyAlpha) != SpiderGL.Core.DONT_CARE && (_ == (f = s.getParameter(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL)) ? f = -1 : s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _)), (l = r.colorspaceConversion) != SpiderGL.Core.DONT_CARE && (l == (c = s.getParameter(s.UNPACK_COLORSPACE_CONVERSION_WEBGL)) ? c = -1 : s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, l)));
      var L = !1;
      if (i) {
          var S = {
                  internalFormat: r.internalFormat,
                  border: r.border,
                  xoffset: r.xoffset,
                  yoffset: r.yoffset,
                  level: r.level,
                  format: r.format,
                  type: r.type,
                  generateMipmap: r.generateMipmap,
                  flipY: r.flipY,
                  premultiplyAlpha: r.premultiplyAlpha,
                  colorspaceConversion: r.colorspaceConversion,
                  data: null
              },
              g = this,
              G = r.onSuccess,
              m = new SpiderGL.IO.ImageRequest(r.url, {
                  onCancel: r.onCancel,
                  onError: r.onError,
                  onProgress: r.onProgress,
                  onSuccess: function() {
                      S.data = m.image, e ? g._setImage(t, S) : g._setSubImage(t, S), G && G()
                  },
                  send: !0
              });
          return !0
      }
      if (n) {
          if (r.width <= 0 || r.height <= 0) return !1;
          e ? (o.texImage2D(d, u, r.level, r.internalFormat, r.width, r.height, r.border, r.format, r.type, r.data), L = !0) : o.texSubImage2D(d, u, r.level, r.xoffset, r.yoffset, r.width, r.height, r.format, r.type, r.data)
      } else {
          if (!a) return !1;
          e ? (o.texImage2D(d, u, r.level, r.internalFormat, r.format, r.type, r.data), L = !0) : o.texSubImage2D(d, u, r.level, r.xoffset, r.yoffset, r.format, r.type, r.data)
      }
      return L && (this._missingFaces &= ~SpiderGL.WebGL.Texture._faceBits[u]), (n || a) && (-1 != h && s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, h), -1 != f && s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, f), -1 != c && s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, c)), r.generateMipmap && this.generateMipmap(), !0
  },
  _setImage: function(e, t) {
      return this._setImageData(!0, e, t)
  },
  _setSubImage: function(e, t) {
      return this._setImageData(!1, e, t)
  },
  get isReady() {
      return 0 == this._missingFaces && this._width > 0 && this._height > 0
  },
  get flipYPolicy() {
      return this._flipY
  },
  set flipYPolicy(e) {
      this._flipY = SpiderGL.Utility.getDefaultValue(e, SpiderGL.WebGL.Context.DEFAULT_UNPACK_FLIP_Y)
  },
  get premultuplyAlphaPolicy() {
      return this._premultuplyAlpha
  },
  set premultuplyAlphaPolicy(e) {
      this._premultuplyAlpha = SpiderGL.Utility.getDefaultValue(e, SpiderGL.WebGL.Context.DEFAULT_UNPACK_PREMULTIPLY_ALPHA)
  },
  get colorspaceConversionPolicy() {
      return this._colorspaceConversion
  },
  set colorspaceConversionPolicy(e) {
      this._colorspaceConversion = SpiderGL.Utility.getDefaultValue(e, SpiderGL.WebGL.Context.DEFAULT_UNPACK_COLORSPACE_CONVERSION)
  },
  get autoMipmap() {
      return this._autoMipmap
  },
  set autoMipmap(e) {
      this._autoMipmap = e
  },
  get format() {
      return this._format
  },
  get width() {
      return this._width
  },
  get height() {
      return this._height
  },
  get magFilter() {
      return this._magFilter
  },
  set magFilter(e) {
      e = SpiderGL.Utility.getDefaultValue(w, SpiderGL.WebGL.Texture.DEFAULT_MAG_FILTER), this._dsa.texParameteri(this._h, this._t, gl.TEXTURE_MAG_FILTER, e)
  },
  get minFilter() {
      return this._minFilter
  },
  set minFilter(e) {
      e = SpiderGL.Utility.getDefaultValue(w, SpiderGL.WebGL.Texture.DEFAULT_MIN_FILTER), this._dsa.texParameteri(this._h, this._t, gl.TEXTURE_MIN_FILTER, e)
  },
  get wrapS() {
      return this._wrapS
  },
  set wrapS(e) {
      e = SpiderGL.Utility.getDefaultValue(e, SpiderGL.WebGL.Texture.DEFAULT_WRAP_S), this._dsa.texParameteri(this._h, this._t, gl.TEXTURE_WRAP_S, e)
  },
  get wrapT() {
      return this._wrapT
  },
  set wrapT(e) {
      e = SpiderGL.Utility.getDefaultValue(e, SpiderGL.WebGL.Texture.DEFAULT_WRAP_T), this._dsa.texParameteri(this._h, this._t, gl.TEXTURE_WRAP_T, e)
  },
  setSampler: function(e) {
      if (!e) return !1;
      var t = this._gl,
          r = this._cb,
          i = (this._dsa, this._t),
          n = this._h;
      r.pushTexture(i), t.bindTexture(i, n);
      var a = 0;
      return "magFilter" in e && (a = SpiderGL.Utility.getDefaultValue(e.magFilter, SpiderGL.WebGL.Texture.DEFAULT_MAG_FILTER), t.texParameteri(i, t.TEXTURE_MAG_FILTER, a)), "minFilter" in e && (a = SpiderGL.Utility.getDefaultValue(e.minFilter, SpiderGL.WebGL.Texture.DEFAULT_MIN_FILTER), t.texParameteri(i, t.TEXTURE_MIN_FILTER, a)), "wrapS" in e && (a = SpiderGL.Utility.getDefaultValue(e.wrapS, SpiderGL.WebGL.Texture.DEFAULT_WRAP_S), t.texParameteri(i, t.TEXTURE_WRAP_S, a)), "wrapT" in e && (a = SpiderGL.Utility.getDefaultValue(e.wrapT, SpiderGL.WebGL.Texture.DEFAULT_WRAP_T), t.texParameteri(i, t.TEXTURE_WRAP_T, a)), r.popTexture(i), !0
  },
  getSampler: function() {
      return {
          magFilter: this._magFilter,
          minFilter: this._minFilter,
          wrapS: this._wrapS,
          wrapT: this._wrapT
      }
  },
  generateMipmap: function() {
      0 == this._missingFaces && this._dsa.generateMipmap(this._h, this._t)
  },
  destroy: function() {
      this._gl.deleteTexture(this._h)
  },
  bind: function(e) {
      var t = this._gl,
          r = (this._cb, this._dsa);
      void 0 === e ? t.bindTexture(this._t, this._h) : r.bindTexture(t.TEXTURE0 + e, this._t, this._h)
  },
  unbind: function(e) {
      var t = this._gl,
          r = (this._cb, this._dsa);
      void 0 === e ? t.bindTexture(this._t, null) : r.bindTexture(t.TEXTURE0 + e, this._t, null)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.Texture, SpiderGL.WebGL.ObjectGL), SpiderGL.WebGL.Texture2D = function(e, t) {
  return SpiderGL.WebGL.Context.isHijacked(e) ? (SpiderGL.WebGL.Texture.call(this, e, SpiderGL.WebGL.Texture2D.TARGET, t), this._h && this._h._spidergl && this._h._spidergl != this ? this._h._spidergl : (t = t || {}, SpiderGL.Type.instanceOf(t, WebGLTexture) ? t = {
      handle: t
  } : SpiderGL.Type.isString(t) && (t = {
      url: t
  }), void(("url" in t || "data" in t || "width" in t && "height" in t) && this.setImage(t)))) : null
}, SpiderGL.WebGL.Texture2D.TARGET = WebGLRenderingContext.prototype.TEXTURE_2D, SpiderGL.WebGL.Texture2D.unbind = function(e, t) {
  e.getExtension("SGL_current_binding");
  var r = e.getExtension("SGL_direct_state_access");
  void 0 === t ? e.bindTexture(SpiderGL.WebGL.Texture2D.TARGET, null) : r.bindTexture(e.TEXTURE0 + t, SpiderGL.WebGL.Texture2D.TARGET, null)
}, SpiderGL.WebGL.Texture2D.prototype = {
  setImage: function(e) {
      return this._setImage(this._t, e)
  },
  setSubImage: function(e) {
      return this._setSubImage(this._t, e)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.Texture2D, SpiderGL.WebGL.Texture), SpiderGL.WebGL.TextureCubeMap = function(e, t) {
  if (!SpiderGL.WebGL.Context.isHijacked(e)) return null;
  if (SpiderGL.WebGL.Texture.call(this, e, SpiderGL.WebGL.TextureCubeMap.TARGET, t), this._h && this._h._spidergl && this._h._spidergl != this) return this._h._spidergl;
  t = t || {}, SpiderGL.Type.instanceOf(t, WebGLTexture) ? t = {
      handle: t
  } : SpiderGL.Type.isString(t) && (t = {
      url: t
  });
  var r, i = SpiderGL.WebGL.TextureCubeMap._faceTargets;
  if (t.url) {
      var n = t.url,
          a = t.onSuccess;
      a && (t.onSuccess = (r = 6, function() {
          0 == --r && a.apply(t, null)
      }));
      for (var s = 0; s < 6; ++s) t.url = n[s], this.setImage(i[s], t);
      t.onSuccess = a
  } else if (t.data) {
      var o = t.data;
      for (s = 0; s < 6; ++s) t.data = o[s], this.setImage(i[s], t)
  } else if (t.width > 0 && t.height > 0)
      for (s = 0; s < 6; ++s) this.setImage(i[s], t)
}, SpiderGL.WebGL.TextureCubeMap.TARGET = WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP, SpiderGL.WebGL.TextureCubeMap.unbind = function(e, t) {
  e.getExtension("SGL_current_binding");
  var r = e.getExtension("SGL_direct_state_access");
  void 0 === t ? e.bindTexture(SpiderGL.WebGL.TextureCubeMap.TARGET, null) : r.bindTexture(e.TEXTURE0 + t, SpiderGL.WebGL.TextureCubeMap.TARGET, null)
}, SpiderGL.WebGL.TextureCubeMap._faceTargets = [WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_X, WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_X, WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Y, WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Y, WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Z, WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Z], SpiderGL.WebGL.TextureCubeMap.prototype = {
  setImage: function(e, t) {
      return this._setImage(e, t)
  },
  setSubImage: function(e, t) {
      return this._setSubImage(e, t)
  }
}, SpiderGL.Type.extend(SpiderGL.WebGL.TextureCubeMap, SpiderGL.WebGL.Texture), SpiderGL.Model = {}, SpiderGL.Model.Model = function(e, t, r) {
  SpiderGL.Core.ObjectBase.call(this), r = SpiderGL.Utility.getDefaultObject({}, r), t && "vertices" in t && (t = SpiderGL.Model.Model._createSimpleDescriptor(t)), this._descriptor = SpiderGL.Model.Model._fixDescriptor(t), this._gl = null, this._renderData = {}, e && (this.updateGL(e, r), this.updateRenderData())
}, SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_SIZE = 3, SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_TYPE = SpiderGL.Type.FLOAT32, SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_NORMALIZED = !1, SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_STRIDE = 0, SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_OFFSET = 0, SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_MODE = SpiderGL.Type.TRIANGLES, SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_FIRST = 0, SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_COUNT = -1, SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_TYPE = SpiderGL.Type.UINT16, SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_OFFSET = 0, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP = {}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP.position = {
  size: 3,
  type: SpiderGL.Type.FLOAT32,
  normalized: !1,
  semantic: "POSITION",
  index: 0,
  value: [0, 0, 0, 1]
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP.normal = {
  size: 3,
  type: SpiderGL.Type.FLOAT32,
  normalized: !1,
  semantic: "NORMAL",
  index: 0,
  value: [0, 0, 1, 0]
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP.color = {
  size: 4,
  type: SpiderGL.Type.UINT8,
  normalized: !0,
  semantic: "COLOR",
  index: 0,
  value: [0, 0, 0, 255]
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP.texcoord = {
  size: 2,
  type: SpiderGL.Type.FLOAT32,
  normalized: !1,
  semantic: "TEXCOORD",
  index: 0,
  value: [0, 0, 0, 1]
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP.user = {
  size: 3,
  type: SpiderGL.Type.FLOAT32,
  normalized: !1,
  semantic: "USER",
  index: 0,
  value: [0, 0, 0, 1]
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP = {}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.triangles = {
  mode: SpiderGL.Type.TRIANGLES,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "FILL"
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.triangleStrip = {
  mode: SpiderGL.Type.TRIANGLE_STRIP,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "FILL"
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.triangleFan = {
  mode: SpiderGL.Type.TRIANGLE_FAN,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "FILL"
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.lines = {
  mode: SpiderGL.Type.LINES,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "LINE"
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.lineStrip = {
  mode: SpiderGL.Type.LINE_STRIP,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "LINE"
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.lineLoop = {
  mode: SpiderGL.Type.LINE_LOOP,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "LINE"
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.points = {
  mode: SpiderGL.Type.POINTS,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "POINT"
}, SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.user = {
  mode: SpiderGL.Type.TRIANGLES,
  type: SpiderGL.Type.UINT16,
  count: -1,
  semantic: "FILL"
}, SpiderGL.Model.Model._fixDescriptor = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      version: "0.0.0.1 EXP",
      meta: null,
      data: null,
      access: null,
      semantic: null,
      logic: null
  }, e)).meta = SpiderGL.Model.Model._fixDescriptorMeta(e.meta), e.data = SpiderGL.Model.Model._fixDescriptorData(e.data), e.access = SpiderGL.Model.Model._fixDescriptorAccess(e.access), e.semantic = SpiderGL.Model.Model._fixDescriptorSemantic(e.semantic), e.logic = SpiderGL.Model.Model._fixDescriptorLogic(e.logic), e
}, SpiderGL.Model.Model._fixDescriptorMeta = function(e) {
  return e = SpiderGL.Utility.getDefaultObject({
      author: null,
      date: null,
      description: null
  }, e)
}, SpiderGL.Model.Model._fixDescriptorData = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      vertexBuffers: null,
      indexBuffers: null
  }, e)).vertexBuffers = SpiderGL.Model.Model._fixDescriptorDataVertexBuffers(e.vertexBuffers), e.indexBuffers = SpiderGL.Model.Model._fixDescriptorDataIndexBuffers(e.indexBuffers), e
}, SpiderGL.Model.Model._fixDescriptorDataVertexBuffers = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorDataVertexBuffer(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorDataVertexBuffer = function(e) {
  return SpiderGL.Model.Model._fixDescriptorDataBuffer(e)
}, SpiderGL.Model.Model._fixDescriptorDataIndexBuffers = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorDataIndexBuffer(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorDataIndexBuffer = function(e) {
  return SpiderGL.Model.Model._fixDescriptorDataBuffer(e)
}, SpiderGL.Model.Model._fixDescriptorDataBuffer = function(e) {
  return e = SpiderGL.Utility.getDefaultObject({
      type: SpiderGL.Type.NO_TYPE,
      glType: WebGLRenderingContext.prototype.NONE,
      untypedArray: null,
      typedArray: null,
      glBuffer: null
  }, e)
}, SpiderGL.Model.Model._fixDescriptorAccess = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      vertexStreams: null,
      primitiveStreams: null
  }, e)).vertexStreams = SpiderGL.Model.Model._fixDescriptorAccessVertexStreams(e.vertexStreams), e.primitiveStreams = SpiderGL.Model.Model._fixDescriptorAccessPrimitiveStreams(e.primitiveStreams), e
}, SpiderGL.Model.Model._fixDescriptorAccessVertexStreams = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorAccessVertexStream(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorAccessVertexStream = function(e) {
  return e = SpiderGL.Utility.getDefaultObject({
      buffer: null,
      size: SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_SIZE,
      type: SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_TYPE,
      glType: SpiderGL.Type.typeToGL(SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_TYPE),
      normalized: SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_NORMALIZED,
      stride: SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_STRIDE,
      offset: SpiderGL.Model.Model.DEFAULT_VERTEX_STREAM_OFFSET
  }, e)
}, SpiderGL.Model.Model._fixDescriptorAccessPrimitiveStreams = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorAccessPrimitiveStream(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorAccessPrimitiveStream = function(e) {
  return e = SpiderGL.Utility.getDefaultObject({
      buffer: null,
      mode: SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_MODE,
      first: SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_FIRST,
      count: SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_COUNT,
      type: SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_TYPE,
      glType: SpiderGL.Type.typeToGL(SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_TYPE),
      offset: SpiderGL.Model.Model.DEFAULT_PRIMITIVE_STREAM_OFFSET
  }, e)
}, SpiderGL.Model.Model._fixDescriptorSemantic = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      bindings: null,
      chunks: null
  }, e)).bindings = SpiderGL.Model.Model._fixDescriptorSemanticBindings(e.bindings), e.chunks = SpiderGL.Model.Model._fixDescriptorSemanticChunks(e.chunks), e
}, SpiderGL.Model.Model._fixDescriptorSemanticBindings = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorSemanticBinding(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorSemanticBinding = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      vertexStreams: null,
      primitiveStreams: null
  }, e)).vertexStreams = SpiderGL.Model.Model._fixDescriptorSemanticBindingVertexStreams(e.vertexStreams), e.primitiveStreams = SpiderGL.Model.Model._fixDescriptorSemanticBindingPrimitiveStreams(e.primitiveStreams), e
}, SpiderGL.Model.Model._fixDescriptorSemanticBindingVertexStreams = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorSemanticBindingVertexStream(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorSemanticBindingVertexStream = function(e) {
  return e ? SpiderGL.Type.isArray(e) ? e.slice() : [e] : null
}, SpiderGL.Model.Model._fixDescriptorSemanticBindingPrimitiveStreams = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorSemanticBindingPrimitiveStream(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorSemanticBindingPrimitiveStream = function(e) {
  return e ? SpiderGL.Type.isArray(e) ? e.slice() : [e] : null
}, SpiderGL.Model.Model._fixDescriptorSemanticChunks = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorSemanticChunk(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorSemanticChunk = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      techniques: null
  }, e)).techniques = SpiderGL.Model.Model._fixDescriptorSemanticChunkTechniques(e.techniques), e
}, SpiderGL.Model.Model._fixDescriptorSemanticChunkTechniques = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorSemanticChunkTechnique(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorSemanticChunkTechnique = function(e) {
  return e = SpiderGL.Utility.getDefaultObject({
      binding: null
  }, e)
}, SpiderGL.Model.Model._fixDescriptorLogic = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      parts: null
  }, e)).parts = SpiderGL.Model.Model._fixDescriptorLogicParts(e.parts), e
}, SpiderGL.Model.Model._fixDescriptorLogicParts = function(e) {
  for (var t in e = SpiderGL.Utility.getDefaultObject({}, e)) e[t] = SpiderGL.Model.Model._fixDescriptorLogicPart(e[t]);
  return e
}, SpiderGL.Model.Model._fixDescriptorLogicPart = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      chunks: null
  }, e)).chunks = SpiderGL.Model.Model._fixDescriptorLogicPartChunks(e.chunks), e
}, SpiderGL.Model.Model._fixDescriptorLogicPartChunks = function(e) {
  return e ? SpiderGL.Type.isArray(e) ? e.slice() : [e] : null
}, SpiderGL.Model.Model._createSimpleDescriptor = function(e) {
  e = SpiderGL.Utility.getDefaultObject({
      vertices: null,
      primitives: null,
      options: null
  }, e);
  var t = "mainBinding",
      r = "mainChunk",
      i = {
          data: {
              vertexBuffers: {},
              indexBuffers: {}
          },
          access: {
              vertexStreams: {},
              primitiveStreams: {}
          },
          semantic: {
              bindings: {},
              chunks: {}
          },
          logic: {
              parts: {}
          }
      },
      n = {
          vertexStreams: {},
          primitiveStreams: {}
      };
  i.semantic.bindings[t] = n;
  var a = {
      techniques: {
          common: {
              binding: t
          }
      }
  };
  i.semantic.chunks[r] = a;
  var s = {
      chunks: [r]
  };
  i.logic.parts.mainPart = s;
  var o = -1,
      u = !1,
      d = !1;
  for (var p in e.vertices) {
      if (E = e.vertices[p]) {
          (SpiderGL.Type.isArray(E) || SpiderGL.Type.isTypedArray(E) || SpiderGL.Type.instanceOf(E, ArrayBuffer)) && (E = {
              data: E
          });
          var h = null;
          (b = SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP[p]) ? h = b.semantic: (b = SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_VERTEX_MAP.user, h = p.toUpperCase());
          var _ = {
              buffer: null,
              size: (v = SpiderGL.Utility.getDefaultObject({
                  size: b.size,
                  type: b.type,
                  normalized: b.normalized,
                  semantic: h,
                  index: b.index,
                  data: null,
                  value: b.value.slice()
              }, E)).size,
              type: v.type,
              normalized: v.normalized,
              stride: 0,
              offset: 0,
              value: v.value.slice()
          };
          if (v.data) {
              var f = {
                      type: v.type
                  },
                  l = 0;
              if (SpiderGL.Type.isArray(v.data)) f.untypedArray = v.data, l = f.untypedArray.length / _.size;
              else {
                  if (!SpiderGL.Type.isTypedArray(E) && !SpiderGL.Type.instanceOf(E, ArrayBuffer)) continue;
                  f.typedArray = v.data, l = (f.typedArray.byteLength - _.offset) / (_.size * SpiderGL.Type.typeSize(_.type))
              }
              l = SpiderGL.Math.floor(l), u = !0, o = o >= 0 ? SpiderGL.Math.min(o, l) : l;
              var c = p + "VertexBuffer";
              i.data.vertexBuffers[c] = f, _.buffer = c
          } else d = !0;
          var L = p;
          i.access.vertexStreams[L] = _, (x = new Array(v.index + 1))[v.index] = L, n.vertexStreams[v.semantic] = x
      }
  }
  var S = 0;
  u ? S = o : d && (S = 1);
  var g = e.primitives;
  if (SpiderGL.Type.isString(g) && (g = [g]), SpiderGL.Type.isArray(g)) {
      var G = g;
      g = {};
      for (var m = 0, T = G.length; m < T; ++m) {
          var M = G[m];
          SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP[M] && (g[M] = {})
      }
  }
  for (var p in g) {
      var E;
      if (E = g[p]) {
          var b;
          (SpiderGL.Type.isArray(E) || SpiderGL.Type.isTypedArray(E) || SpiderGL.Type.instanceOf(E, ArrayBuffer)) && (E = {
              data: E
          }), (b = SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP[p]) || (b = SpiderGL.Model.Model.DEFAULT_SIMPLE_MODEL_PRIMITIVE_MAP.user);
          var v;
          _ = {
              buffer: null,
              mode: (v = SpiderGL.Utility.getDefaultObject({
                  mode: b.mode,
                  type: b.type,
                  count: b.count >= 0 ? b.count : S,
                  semantic: b.semantic
              }, E)).mode,
              first: 0,
              count: v.count,
              type: v.type,
              offset: 0
          };
          if (v.data) {
              f = {
                  type: v.type
              }, l = 0;
              if (SpiderGL.Type.isArray(v.data)) f.untypedArray = v.data, l = f.untypedArray.length;
              else {
                  if (!SpiderGL.Type.isTypedArray(E) && !SpiderGL.Type.instanceOf(E, ArrayBuffer)) continue;
                  f.typedArray = v.data, l = (f.typedArray.byteLength - _.offset) / SpiderGL.Type.typeSize(_.type)
              }
              l = SpiderGL.Math.floor(l);
              c = p + "IndexBuffer";
              i.data.indexBuffers[c] = f, _.buffer = c, _.count = l
          }
          var x;
          L = p;
          i.access.primitiveStreams[L] = _, (x = new Array(1))[0] = L, n.primitiveStreams[v.semantic] = x
      }
  }
  return i
}, SpiderGL.Model.Model.prototype = {
  get descriptor() {
      return this._descriptor
  },
  get isReady() {
      return !!this._descriptor
  },
  get gl() {
      return this._gl
  },
  get renderData() {
      return this._renderData
  },
  updateTypedArrays: function() {
      var e = this._descriptor;
      if (!e) return !1;
      var t = null,
          r = null,
          i = e.data.vertexBuffers;
      for (var n in i)(t = i[n]).untypedArray && (r = SpiderGL.Type.typeToTypedArrayConstructor(t.type), t.typedArray = new r(t.untypedArray));
      var a = e.data.indexBuffers;
      for (var n in a)(t = a[n]).untypedArray && (r = SpiderGL.Type.typeToTypedArrayConstructor(t.type), t.typedArray = new r(t.untypedArray));
      return !0
  },
  updateGL: function(e, t) {
      if (!e) return !1;
      var r = this._descriptor;
      if (!r) return !1;
      this._gl = e;
      var i = null,
          n = null,
          a = SpiderGL.Utility.getDefaultObject({
              data: null,
              usage: SpiderGL.Core.DEFAULT
          }, t);
      for (var s in a.data = null, r.data.vertexBuffers) i = r.data.vertexBuffers[s], a.data = i.typedArray, a.data || (n = SpiderGL.Type.typeToTypedArrayConstructor(i.type), a.data = new n(i.untypedArray)), i.glBuffer && (i.glBuffer.destroy(), i.glBuffer = null), i.glBuffer = new SpiderGL.WebGL.VertexBuffer(e, a);
      for (var s in r.data.indexBuffers) i = r.data.indexBuffers[s], a.data = i.typedArray, a.data || (n = SpiderGL.Type.typeToTypedArrayConstructor(i.type), a.data = new n(i.untypedArray)), i.glBuffer && (i.glBuffer.destroy(), i.glBuffer = null), i.glBuffer = new SpiderGL.WebGL.IndexBuffer(e, a);
      var o = null;
      for (var s in r.access.vertexStreams)(o = r.access.vertexStreams[s]).glType = SpiderGL.Type.typeToGL(o.type);
      for (var s in r.access.primitiveStreams)(o = r.access.primitiveStreams[s]).glMode = SpiderGL.Type.primitiveToGL(o.mode), o.glType = SpiderGL.Type.typeToGL(o.type);
      return !0
  },
  destroyGL: function() {
      var e = this._descriptor;
      if (!e) return !1;
      var t = null;
      for (var r in e.data.vertexBuffers)(t = e.data.vertexBuffers[r]).glBuffer && (t.glBuffer.destroy(), t.glBuffer = null);
      for (var r in e.data.indexBuffers)(t = e.data.indexBuffers[r]).glBuffer && (t.glBuffer.destroy(), t.glBuffer = null)
  },
  updateRenderData: function() {
      var e = this._descriptor;
      if (!e) return !1;
      var t = {
          partMap: {}
      };
      for (var r in e.logic.parts) {
          var i = e.logic.parts[r].chunks,
              n = {};
          t.partMap[r] = n;
          for (var a = 0, s = i.length; a < s; ++a) {
              var o = i[a],
                  u = e.semantic.chunks[o],
                  d = {};
              n[o] = d;
              var p = u.techniques;
              for (var h in p) {
                  var _ = p[h],
                      f = {
                          vertexStreams: {
                              buffered: [],
                              constant: []
                          },
                          primitiveStreams: {}
                      };
                  d[h] = f;
                  var l = e.semantic.bindings[_.binding],
                      c = l.vertexStreams,
                      L = {};
                  for (var S in c)
                      for (var g = 0, G = (v = c[S]).length; g < G; ++g) {
                          var m = v[g],
                              T = {
                                  semantic: S,
                                  index: g,
                                  stream: x = e.access.vertexStreams[m]
                              };
                          (M = x.buffer) ? (L[M] = L[M] || [], L[M].push(T)) : f.vertexStreams.constant.push(T)
                      }
                  for (var M in L) {
                      var E = {
                          buffer: e.data.vertexBuffers[M],
                          streams: L[M].slice()
                      };
                      f.vertexStreams.buffered.push(E)
                  }
                  c = l.primitiveStreams;
                  for (var S in c) {
                      L = {};
                      var b = {
                          buffered: [],
                          array: []
                      };
                      f.primitiveStreams[S] = b;
                      var v;
                      for (g = 0, G = (v = c[S]).length; g < G; ++g) {
                          var x;
                          m = v[g];
                          (M = (x = e.access.primitiveStreams[m]).buffer) ? (L[M] = L[M] || [], L[M].push(x)) : b.array.push(x)
                      }
                      for (var M in L) {
                          E = {
                              buffer: e.data.indexBuffers[M],
                              streams: L[M].slice()
                          };
                          b.buffered.push(E)
                      }
                  }
              }
          }
      }
      this._renderData = t
  }
}, SpiderGL.Type.extend(SpiderGL.Model.Model, SpiderGL.Core.ObjectBase), SpiderGL.Model.Technique = function(e, t, r) {
  SpiderGL.Core.ObjectBase.call(this), r = SpiderGL.Utility.getDefaultObject({}, r), t && "vertexShader" in t && "fragmentShader" in t && (t = SpiderGL.Model.Technique._createSimpleDescriptor(e, t)), this._descriptor = SpiderGL.Model.Technique._fixDescriptor(t), this._gl = this._descriptor.program.gl, this._renderData = {}, e && this.updateRenderData()
}, SpiderGL.Model.Technique._fixDescriptor = function(e) {
  return (e = SpiderGL.Utility.getDefaultObject({
      name: "common",
      program: null,
      semantic: {}
  }, e)).vertexStreams && (e.semantic.vertexStreams = e.vertexStreams, delete e.vertexStreams), e.globals && (e.semantic.globals = e.globals, delete e.globals), e.semantic = SpiderGL.Model.Technique._fixSemantic(e.program, e.semantic), e
}, SpiderGL.Model.Technique._fixSemantic = function(e, t) {
  return (t = SpiderGL.Utility.getDefaultObject({
      vertexStreams: null,
      globals: null
  }, t)).vertexStreams = SpiderGL.Model.Technique._fixVertexStreams(e, t.vertexStreams), t.globals = SpiderGL.Model.Technique._fixGlobals(e, t.globals), t
}, SpiderGL.Model.Technique._fixVertexStreams = function(e, t) {
  for (var r = e.getAttributesNames(), i = {}, n = 0, a = r.length; n < a; ++n) {
      for (var s = r[n], o = "", u = "", d = s.length - 1; d >= 0; --d) {
          var p = s.charAt(d);
          if (-1 == "0123456789".indexOf(p, 0)) {
              o = s.substring(0, d + 1);
              break
          }
          u = p + u
      }
      var h = u.length > 0 ? parseInt(u) : 0,
          _ = o.length;
      if (_ >= 2)
          if ("a" == o.charAt(0)) "_" == (p = o.charAt(1)) && _ > 2 ? o = o.substring(2) : p == o.charAt(1).toUpperCase() && (o = o.substring(1));
      var f = o.toUpperCase();
      i[s] = {
          semantic: f,
          index: h,
          value: [0, 0, 0, 1]
      }
  }
  var l = {};
  for (var c in t) {
      var L = i[c];
      if (L) {
          var S = t[c];
          SpiderGL.Type.isString(S) ? S = {
              semantic: S
          } : SpiderGL.Type.isArray(S) || SpiderGL.Type.isTypedArray(S) ? S = {
              value: S
          } : SpiderGL.Type.isNumber(S) && (S = {
              value: [S, S, S, S]
          }), l[c] = SpiderGL.Utility.getDefaultObject({
              semantic: L.semantic,
              index: L.index,
              value: L.value
          }, S)
      }
  }
  return t = SpiderGL.Utility.getDefaultObject(i, l)
}, SpiderGL.Model.Technique._fixGlobals = function(e, t) {
  var r = e.getUniformsValues(),
      i = {};
  for (var n in r) {
      var a = n,
          s = a.length;
      if (s >= 2 && "u" == a.charAt(0)) {
          var o = a.charAt(1);
          "_" == o && s > 2 ? a = a.substring(2) : o == a.charAt(1).toUpperCase() && (a = a.substring(1))
      }
      var u = a.toUpperCase();
      i[n] = {
          semantic: u,
          value: r[n]
      }
  }
  return t = SpiderGL.Utility.getDefaultObject(i, t)
}, SpiderGL.Model.Technique._createSimpleDescriptor = function(e, t) {
  (t = SpiderGL.Utility.getDefaultObject({
      name: "common",
      vertexShader: null,
      fragmentShader: null,
      attributes: null,
      uniforms: null,
      semantic: {},
      vertexStreams: null,
      globals: null,
      options: null
  }, t)).vertexStreams && (t.semantic.vertexStreams = t.vertexStreams, delete t.vertexStreams), t.globals && (t.semantic.globals = t.globals, delete t.globals);
  var r = {
      name: t.name,
      program: null,
      semantic: t.semantic
  };
  if (!e) return r;
  var i = t.vertexShader,
      n = t.fragmentShader;
  if (!i || !n) return r;
  if (SpiderGL.Type.isString(i)) i = new SpiderGL.WebGL.VertexShader(e, i);
  else if (!SpiderGL.Type.instanceOf(i, SpiderGL.WebGL.VertexShader)) return r;
  if (SpiderGL.Type.isString(n)) n = new SpiderGL.WebGL.FragmentShader(e, n);
  else if (!SpiderGL.Type.instanceOf(n, SpiderGL.WebGL.FragmentShader)) return r;
  var a = new SpiderGL.WebGL.Program(e, {
      shaders: [i, n],
      attributes: t.attributes,
      uniforms: t.uniforms
  });
  return r.program = a, r
}, SpiderGL.Model.Technique.prototype = {
  get descriptor() {
      return this._descriptor
  },
  get isReady() {
      return !!this._descriptor
  },
  get gl() {
      return this._gl
  },
  get name() {
      return this._descriptor.name
  },
  get renderData() {
      return this._renderData
  },
  get program() {
      return this._descriptor.program
  },
  setUniforms: function(e) {
      this._descriptor.program.setUniforms(e)
  },
  updateRenderData: function() {
      var e = this._descriptor,
          t = {};
      this._renderData = t;
      var r = {};
      t.attributesMap = r;
      var i = e.program.getAttributesIndices();
      for (var n in e.semantic.vertexStreams) {
          var a = (d = e.semantic.vertexStreams[n]).semantic,
              s = r[a];
          s || (s = [], r[a] = s), s[d.index] = {
              index: i[n],
              value: d.value
          }
      }
      var o = {};
      for (var u in t.globalsMap = o, e.semantic.globals) {
          var d;
          o[(d = e.semantic.globals[u]).semantic] = {
              name: u,
              value: d.value
          }
      }
  }
}, SpiderGL.Model.ModelRenderer = function(e) {
  this._gl = e, this._vertexAttributesCount = e.getParameter(e.MAX_VERTEX_ATTRIBS), this._textureUnitsCount = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), this._internalFramebuffer = new SpiderGL.WebGL.Framebuffer(e), this._reset()
}, SpiderGL.Model.ModelRenderer.prototype = {
  _reset: function() {
      this._technique = null, this._model = null, this._partName = null, this._chunkName = null, this._primMode = null, this._framebuffer = null, this._inBegin = !1, this._enabledArrays = [], this._boundTextures = [], this._attribValues = [], this._primitiveStreams = [], this._techniqueDirty = !0, this._modelDirty = !0, this._modelPartDirty = !0, this._modelChunkDirty = !0, this._primModeDirty = !0, this._framebufferDirty = !0, this._viewportDirty = !0, this._dirty = !0
  },
  _resetContext: function() {
      for (var e = this._gl, t = 0, r = this._vertexAttributesCount; t < r; ++t) e.disableVertexAttribArray(t);
      for (t = this._textureUnitsCount - 1; t >= 0; --t) e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, null), e.bindTexture(e.TEXTURE_CUBE_MAP, null);
      SpiderGL.WebGL.VertexBuffer.unbind(e), SpiderGL.WebGL.IndexBuffer.unbind(e), SpiderGL.WebGL.Program.unbind(e), SpiderGL.WebGL.Framebuffer.unbind(e)
  },
  _update: function() {
      if (!this._dirty) return !0;
      var e = this._gl;
      if (this._techniqueDirty) {
          if (!(p = this._technique)) return !1;
          var t = (h = p.renderData).attributesMap,
              r = [];
          for (var i in t) {
              var n = t[i];
              for (var a in n) {
                  var s = n[a],
                      o = null;
                  s && (o = {
                      index: s.index,
                      value: s.value
                  }), r.push(o)
              }
          }
          this._attribValues = r, p.program.bind(), this._techniqueDirty = !1
      }
      if (this._modelDirty) {
          var u = this._model;
          if (!u) return !1;
          a = 0;
          for (var d = (r = this._attribValues).length; a < d; ++a) {
              (o = r[a]) && e.vertexAttrib4fv(o.index, o.value)
          }
          var p, h, _ = u.renderData;
          if (!(p = this._technique)) return !1;
          if (!(h = p.renderData)) return !1;
          t = h.attributesMap;
          if (this._modelPartDirty) {
              if (!this._partName) return !1;
              this._modelPartDirty = !1
          }
          if (this._modelChunkDirty) {
              var f = this._chunkName;
              if (!f) return !1;
              if (!(b = _.partMap[this._partName])) return !1;
              if (!(v = b[f])) return !1;
              if ((x = v[p.name]) || (x = v.common), !x) return !1;
              var l = this._enabledArrays;
              for (a = 0, d = l.length; a < d; ++a) e.disableVertexAttribArray(l[a]);
              l = [];
              var c = x.vertexStreams.buffered;
              for (a = 0, d = c.length; a < d; ++a) {
                  var L = c[a],
                      S = L.buffer.glBuffer;
                  S.bind();
                  for (var g = 0, G = (T = L.streams).length; g < G; ++g) {
                      if (t[(M = T[g]).semantic] && t[M.semantic][M.index]) {
                          var m = t[M.semantic][M.index].index;
                          (E = M.stream).index = m, l.push(m), S.vertexAttribPointer(E)
                      }
                  }
              }
              this._enabledArrays = l;
              var T;
              for (g = 0, d = (T = x.vertexStreams.constant).length; g < d; ++g) {
                  var M;
                  if (t[(M = T[g]).semantic] && t[M.semantic][M.index]) {
                      m = t[M.semantic][M.index].index;
                      var E = M.stream;
                      e.vertexAttrib4fv(m, E.value)
                  }
              }
              this._modelChunkDirty = !1
          }
          if (this._primModeDirty) {
              var b, v, x, y = this._primMode;
              if (!y) return !1;
              if (!(b = _.partMap[this._partName])) return !1;
              if (!(v = b[this._chunkName])) return !1;
              if ((x = v[p.name]) || (x = v.common), !x) return !1;
              var A = x.primitiveStreams[y];
              if (!A) return !1;
              this._primitiveStreams = A, this._primModeDirty = !1
          }
          this._modelDirty = !1
      }
      return this._framebufferDirty && (this._framebuffer ? this._framebuffer.bind() : SpiderGL.WebGL.Framebuffer.unbind(e), this._framebufferDirty = !1), this._viewportDirty && (this._framebuffer && this._framebuffer.autoViewport && this._framebuffer.applyViewport(), this._viewportDirty = !1), this._dirty = !1, !0
  },
  get gl() {
      return this._gl
  },
  get isValid() {
      return !!this._gl
  },
  destroy: function() {
      this.end(), this._internalFramebuffer.destroy(), this._internalFramebuffer = null, this._gl = null
  },
  begin: function() {
      this._inBegin || (this._resetContext(), this._inBegin = !0)
  },
  end: function() {
      if (this._inBegin) {
          this._inBegin = !1;
          for (var e = this._gl, t = this._enabledArrays, r = 0, i = t.length; r < i; ++r) e.disableVertexAttribArray(t[r]);
          var n = this._boundTextures;
          for (r = 0, i = n.length; r < i; ++r) {
              var a = n[r];
              a && (a.target == e.TEXTURE_2D ? SpiderGL.WebGL.Texture2D.unbind(e, a.unit) : a.target == e.TEXTURE_CUBE_MAP && SpiderGL.WebGL.TextureCubeMap.unbind(e, a.unit))
          }
          this._framebuffer && SpiderGL.WebGL.Framebuffer.unbind(this._gl), this._internalFramebuffer.detachAll(), this._reset(), this._resetContext()
      }
  },
  get isInBegin() {
      return this._inBegin
  },
  setTechnique: function(e) {
      this._inBegin && this._technique != e && (this._technique = e, this._techniqueDirty = !0, this._dirty = !0, e || SpiderGL.WebGL.Program.unbind(this._gl))
  },
  get technique() {
      return this._technique
  },
  setModel: function(e) {
      this._inBegin && this._model != e && (this._model = e, this._modelDirty = !0, this._modelPartDirty = !0, this._modelChunkDirty = !0, this._dirty = !0)
  },
  get model() {
      return this._model
  },
  setPart: function(e) {
      this._inBegin && this._part != e && (this._partName = e, this._modelPartDirty = !0, this._modelDirty = !0, this._dirty = !0)
  },
  get part() {
      return this._partName
  },
  setChunk: function(e) {
      this._inBegin && this._chunk != e && (this._chunkName = e, this._modelDirty = !0, this._modelChunkDirty = !0, this._primModeDirty = !0, this._dirty = !0)
  },
  get chunk() {
      return this._chunkName
  },
  setPrimitiveMode: function(e) {
      this._inBegin && this._primMode != e && (this._primMode = e, this._primModeDirty = !0, this._modelDirty = !0, this._dirty = !0)
  },
  get primitiveMode() {
      return this._primMode
  },
  setUniforms: function(e) {
      this._inBegin && this._technique && this._technique.program.setUniforms(e)
  },
  setDefaultGlobals: function() {
      if (this._inBegin) {
          var e = this._technique;
          if (e) {
              var t = e.renderData.globalsMap,
                  r = {};
              for (var i in t) {
                  var n = t[i].name,
                      a = t[i].value;
                  r[n] = a
              }
              e.program.setUniforms(r)
          }
      }
  },
  setGlobals: function(e) {
      if (this._inBegin && e) {
          var t = this._technique;
          if (t) {
              var r = t.renderData.globalsMap,
                  i = {};
              for (var n in e)
                  if (r[n]) {
                      var a = r[n].name,
                          s = e[n];
                      i[a] = s
                  } t.program.setUniforms(i)
          }
      }
  },
  setFramebuffer: function(e) {
      this._inBegin && this._framebuffer != e && (this._framebuffer = e, this._framebufferDirty = !0, this._viewportDirty = !0, this._dirty = !0, e ? e.bind() : SpiderGL.WebGL.Framebuffer.unbind(this._gl))
  },
  activateOffScreenFramebuffer: function() {
      this.setFramebuffer(this._internalFramebuffer)
  },
  activateMainFramebuffer: function() {
      return this.setFramebuffer(null)
  },
  setFramebufferAttachments: function(e) {
      this._inBegin && this._framebuffer && (this._framebuffer.setAttachments(e), this._framebufferDirty = !0, this._viewportDirty = !0)
  },
  setColorRenderTarget: function(e) {
      this._inBegin && this._framebuffer && (this._framebuffer.colorTarget = e, this._viewportDirty = !0, this._dirty = !0)
  },
  setDepthRenderTarget: function(e) {
      this._inBegin && this._framebuffer && (this._framebuffer.depthTarget = e, this._viewportDirty = !0, this._dirty = !0)
  },
  setStencilRenderTarget: function(e) {
      this._inBegin && this._framebuffer && (this._framebuffer.stencilTarget = e, this._viewportDirty = !0, this._dirty = !0)
  },
  setDepthStencilRenderTarget: function(e) {
      this._inBegin && this._framebuffer && (this._framebuffer.depthStencilTarget = e, this._viewportDirty = !0, this._dirty = !0)
  },
  clearFramebuffer: function(e) {
      if (this._inBegin && e) {
          var t = this._gl,
              r = 0;
          if (SpiderGL.Type.isNumber(e)) r = e;
          else {
              if ("color" in e) {
                  var i = e.color;
                  i && t.clearColor(i[0], i[1], i[2], i[3]), r |= t.COLOR_BUFFER_BIT
              }
              if ("depth" in e) {
                  var n = e.depth;
                  SpiderGL.Type.isNumber(n) && t.clearDepth(n), r |= t.DEPTH_BUFFER_BIT
              }
              if ("stencil" in e) {
                  var a = e.stencil;
                  SpiderGL.Type.isNumber(a) && t.clearStencil(a), r |= t.Stencil_BUFFER_BIT
              }
          }
          if (r) {
              var s = this._framebuffer;
              s ? s.clear(r) : t.clear(r)
          }
      }
  },
  setViewport: function(e, t, r, i) {
      this._inBegin && this._gl.viewport(e, t, r, i)
  },
  setTexture: function(e, t) {
      if (t) t.bind(e);
      else {
          var r = this._gl;
          SpiderGL.WebGL.Texture2D.unbind(r, e), SpiderGL.WebGL.TextureCubeMap.unbind(r, e)
      }
  },
  get canRender() {
      return !!(this._inBegin && this._technique && this._model && this._partName && this._chunkName && this._primMode)
  },
  render: function() {
      if (this.canRender && this._update()) {
          for (var e = this._gl, t = this._primitiveStreams, r = t.buffered, i = t.array, n = 0, a = r.length; n < a; ++n) {
              var s = r[n],
                  o = s.buffer.glBuffer;
              o.bind();
              for (var u = s.streams, d = 0, p = u.length; d < p; ++d) {
                  var h = u[d];
                  o.drawElements(h)
              }
          }
          for (d = 0, a = i.length; d < a; ++d) {
              h = i[d];
              e.drawArrays(h.glMode, h.first, h.count)
          }
      }
  },
  renderModelPart: function(e) {
      var t = this.model.descriptor.logic.parts[e];
      for (var r in this.setPart(e), t.chunks) {
          var i = t.chunks[r];
          this.setChunk(i), this.render()
      }
  },
  renderModel: function() {
      var e = this.model.descriptor.logic.parts;
      for (var t in e) {
          var r = e[t];
          for (var i in this.setPart(t), r.chunks) {
              var n = r.chunks[i];
              this.setChunk(n), this.render()
          }
      }
  }
}, SpiderGL.UserInterface = {}, SpiderGL.UserInterface.CanvasHandler = function(e, t, r) {
  SpiderGL.Core.ObjectBase.call(this), r = r || {};
  var i = this,
      n = e.canvas;
  this._gl = e, this._canvas = n, this._handler = t, this._ignoreKeyRepeat = SpiderGL.Utility.getDefaultValue(r.ignoreKeyRepeat, SpiderGL.UserInterface.CanvasHandler.DEFAULT_IGNORE_KEY_REPEAT), this._keysDown = {}, this._mouseButtonsDown = [!1, !1, !1], this._dragging = [!1, !1, !1], this._dragStartPos = [
      [0, 0],
      [0, 0],
      [0, 0]
  ], this._dragEndPos = [
      [0, 0],
      [0, 0],
      [0, 0]
  ], this._dragDeltaPos = [
      [0, 0],
      [0, 0],
      [0, 0]
  ], this._cursorPos = [0, 0, !0, 0], this._cursorPrevPos = [0, 0, !0, 0], this._cursorDeltaPos = [0, 0], this._cursorDeltaTime = 0, this._cursorIncrPos = 0, this._cursorIncrTime = 0, this._clickPos = [0, 0, !0, 0], this._clickPrevPos = [0, 0, !0, 0], this._touches = [], this._touchZoomDelta = 0, this._touchPanResolved = !1, this._drawEventPending = !1, this._drawEventHandler = function() {
      i._onDraw()
  }, this._postDrawEventFunction = function() {
      i._postDrawEvent()
  }, this._animateTime = Date.now(), this._animatePrevTime = this._animateTime, this._animateDeltaTime = 0, this._animateRate = 0, this._animateID = null, this._animateEventHandler = function() {
      i._onAnimate()
  }, this._animateMS = -1, this._animateWithTimeout = !1, this._fastAnimate = !1, this._fpsUpdateMS = 1e3, this._fpsTime = 0, this._fpsCount = 0, this._fps = 0, this._delegateDraw = function(e) {
      i._onDraw(e)
  };
  window.addEventListener("message", function(e) {
      e.source == window && (e.data == SpiderGL.UserInterface.CanvasHandler._FAST_ANIMATE_MESSAGE_NAME ? (e.stopPropagation(), i._onAnimate()) : e.data == SpiderGL.UserInterface.CanvasHandler._FAST_DRAW_MESSAGE_NAME && (e.stopPropagation(), i._onDraw()))
  }, !0), n.tabIndex = 0, n.addEventListener("unload", function(e) {
      i._onTerminate(e)
  }, !1), n.addEventListener("keydown", function(e) {
      i._onKeyDown(e)
  }, !1), n.addEventListener("keyup", function(e) {
      i._onKeyUp(e)
  }, !1), n.addEventListener("keypress", function(e) {
      i._onKeyPress(e)
  }, !1), n.addEventListener("mousedown", function(e) {
      i._onMouseButtonDown(e)
  }, !1), n.addEventListener("mouseup", function(e) {
      i._onMouseButtonUp(e)
  }, !1), n.addEventListener("mousemove", function(e) {
      i._onMouseMove(e)
  }, !1), n.addEventListener("mouseout", function(e) {
      i._onMouseOut(e)
  }, !1), n.addEventListener("click", function(e) {
      i._onClick(e)
  }, !1), n.addEventListener("dblclick", function(e) {
      i._onDoubleClick(e)
  }, !1), n.addEventListener("resize", function(e) {
      i._onResize(e)
  }, !1), n.addEventListener("DOMMouseScroll", function(e) {
      i._onMouseWheel(e)
  }, !1), n.addEventListener("mousewheel", function(e) {
      i._onMouseWheel(e)
  }, !1), n.addEventListener("blur", function(e) {
      i._onBlur(e)
  }, !1);
  var a = new SglBrowser;
  a.isIE || a.isEdge ? (n.addEventListener("pointerdown", function(e) {
      "touch" == e.pointerType && i._onTouchStart(e)
  }, !1), n.addEventListener("pointerup", function(e) {
      "touch" == e.pointerType && i._onTouchEnd(e)
  }, !1), n.addEventListener("pointermove", function(e) {
      "touch" == e.pointerType && i._onTouchMove(e)
  }, !1), window.addEventListener("pointerup", function(e) {
      "touch" == e.pointerType && i._onTouchEnd(e)
  }, !1), window.addEventListener("pointermove", function(e) {
      "touch" == e.pointerType && i._onTouchMove(e)
  }, !1)) : (n.addEventListener("touchstart", function(e) {
      i._onTouchStart(e)
  }, !1), n.addEventListener("touchend", function(e) {
      i._onTouchEnd(e)
  }, !1), n.addEventListener("touchmove", function(e) {
      i._onTouchMove(e)
  }, !1)), window.addEventListener("mouseup", function(e) {
      i._onWindowMouseButtonUp(e)
  }, !1), window.addEventListener("mousemove", function(e) {
      i._onWindowMouseMove(e)
  }, !1), window.addEventListener("resize", function(e) {
      i._onWindowResize(e)
  }, !1), SpiderGL.Utility.getDefaultValue(r.standardGLUnpack, SpiderGL.UserInterface.CanvasHandler.DEFAULT_STANDARD_GL_UNPACK) && SpiderGL.WebGL.Context.setStandardGLUnpack(e), this.animateRate = SpiderGL.Utility.getDefaultValue(r.animateRate, SpiderGL.UserInterface.CanvasHandler.DEFAULT_ANIMATE_RATE)
}, SpiderGL.UserInterface.CanvasHandler._FAST_DRAW_MESSAGE_NAME = "spidergl-fast-draw-message", SpiderGL.UserInterface.CanvasHandler._FAST_ANIMATE_MESSAGE_NAME = "spidergl-fast-animate-message", SpiderGL.UserInterface.CanvasHandler.DEFAULT_ANIMATE_RATE = 0, SpiderGL.UserInterface.CanvasHandler.DEFAULT_IGNORE_KEY_REPEAT = !0, SpiderGL.UserInterface.CanvasHandler.DEFAULT_STANDARD_GL_UNPACK = !0, SpiderGL.UserInterface.CanvasHandler.DEFAULT_PROPERTY_NAME = "ui", SpiderGL.UserInterface.CanvasHandler.prototype = {
  _firstNotify: function() {
      this._onInitialize(), this._animateRate > 0 && this._onAnimate(), this.postDrawEvent()
  },
  _dispatch: function() {
      var e = arguments[0],
          t = this._handler,
          r = t[e];
      if (r) {
          var i = Array.prototype.slice.call(arguments, 1);
          r.apply(t, i)
      }
  },
  _postDrawEvent: function() {
      this._postDrawCount = 5, this._drawEventPending || (this._drawEventPending = !0, requestAnimationFrame(this._delegateDraw))
  },
  _getMouseClientPos: function(e) {
      var t, r, i = this._canvas.getBoundingClientRect(),
          n = this._canvas.width,
          a = this._canvas.height;
      return [t = e.changedTouches ? e.changedTouches[0].clientX - i.left : e.clientX - i.left, r = e.changedTouches ? a - (e.changedTouches[0].clientY - i.top) : a - (e.clientY - i.top), t < 0 || t >= n || r < 0 || r >= a, e.timeStamp]
  },
  _onInitialize: function() {
      this._dispatch("onInitialize")
  },
  _onTerminate: function() {
      this._dispatch("onTerminate")
  },
  _onBlur: function(e) {
      this._gl;
      var t = this._keysDown;
      for (var r in t) t[r] && (t[r] = !1, this._dispatch("onKeyUp", r, null))
  },
  _onKeyDown: function(e) {
      var t = e.keyCode;
      t >= 48 && t <= 90 && (t = String.fromCharCode(t).toUpperCase());
      var r = this._keysDown[t];
      this._keysDown[t] = !0, r && this._ignoreKeyRepeat || this._dispatch("onKeyDown", t, e)
  },
  _onKeyUp: function(e) {
      var t = e.keyCode;
      t >= 48 && t <= 90 && (t = String.fromCharCode(t).toUpperCase());
      this._keysDown[t] = !1, this._dispatch("onKeyUp", t, e)
  },
  _onKeyPress: function(e) {
      var t = e.keyCode;
      t >= 48 && t <= 90 && (t = String.fromCharCode(t).toUpperCase());
      this._dispatch("onKeyPress", t, e)
  },
  _onTouchStart: function(e) {
      var t;
      if (this._canvas.focus(), e.changedTouches) t = e.targetTouches;
      else {
          var r = {
              id: e.pointerId,
              evt: e
          };
          for (i = 0; i < this._touches.length; i++)
              if (this._touches[i].id == r.id) return e.preventDefault && e.preventDefault(), void e.stopPropagation();
          this._touches.push(r), t = this._touches
      }
      if (1 == t.length) {
          var n, a = this._getMouseClientPos(e);
          this._cursorPos = a, n = e.button ? e.button : 0, this._mouseButtonsDown[n] = !0, this._dragStartPos[n] = [a[0], a[1]], this._dispatch("onMouseButtonDown", n, a[0], a[1], e)
      }
      var s = new SglBrowser;
      (s.isIE || s.isEdge) && e.preventDefault && e.preventDefault(), e.stopPropagation()
  },
  _onTouchEnd: function(e) {
      var t;
      if (e.changedTouches) t = e.targetTouches;
      else {
          var r = !1;
          for (i = 0; i < this._touches.length; i++)
              if (this._touches[i].id == e.pointerId) {
                  this._touches.splice(i, 1), r = !0;
                  break
              } if (!r) return e.preventDefault && e.preventDefault(), void e.stopPropagation();
          t = this._touches
      }
      if (0 == t.length) {
          var n, a = this._getMouseClientPos(e);
          if (this._cursorPos = a, n = e.button ? e.button : 0, this._dispatch("onMouseButtonUp", n, a[0], a[1], e), this._mouseButtonsDown[1] && (n = 1), this._mouseButtonsDown = [!1, !1, !1], this._dragging[n]) {
              this._dragging[n] = !1;
              var s = this._dragStartPos[n],
                  o = [a[0], a[1]];
              this._dragEndPos[n] = o, this._dragDeltaPos[n] = [o[0] - s[0], o[1] - s[1]], this._dispatch("onDragEnd", n, o[0], o[1])
          }
          this._touchPanResolved = !1, this._cursorIncrPos = this._cursorIncrTime = 0
      }
      var u = new SglBrowser;
      (u.isIE || u.isEdge) && e.preventDefault && e.preventDefault(), e.stopPropagation()
  },
  _onTouchMove: function(e) {
      var t;
      if (e.changedTouches) t = e.targetTouches;
      else {
          var r = !1;
          for (n = 0; n < Math.min(this._touches.length, 2); n++)
              if (this._touches[n].id == e.pointerId) {
                  this._touches[n].evt = e, r = !0;
                  break
              } if (!r) return e.preventDefault && e.preventDefault(), void e.stopPropagation();
          t = this._touches
      }
      if (t.length > 1 && this._resolveTouchZoom(e), 1 == t.length) {
          this._cursorPrevPos = this._cursorPos;
          var i = this._getMouseClientPos(e);
          if (this._cursorPos = i, this._cursorDeltaPos = [this._cursorPos[0] - this._cursorPrevPos[0], this._cursorPos[1] - this._cursorPrevPos[1]], this._cursorDeltaTime = this._cursorPos[3] - this._cursorPrevPos[3], this._cursorDeltaPos[0] > 0 ? this._cursorDeltaPos[0] = Math.floor(this._cursorDeltaPos[0]) : this._cursorDeltaPos[0] = Math.ceil(this._cursorDeltaPos[0]), this._cursorDeltaPos[1] > 0 ? this._cursorDeltaPos[1] = Math.floor(this._cursorDeltaPos[1]) : this._cursorDeltaPos[1] = Math.ceil(this._cursorDeltaPos[1]), this._touchPanResolved || (this._cursorIncrPos += SpiderGL.Math.Vec2.length(this._cursorDeltaPos), this._cursorIncrTime += this._cursorDeltaTime, this._resolveTouchPan(e)), 0 != this._cursorDeltaPos[0] || 0 != this._cursorDeltaPos[1]) {
              for (var n = 0; n < 3; ++n)
                  if (this._mouseButtonsDown[n]) {
                      var a = this._dragStartPos[n],
                          s = [i[0], i[1]];
                      this._dragEndPos[n] = s, this._dragDeltaPos[n] = [s[0] - a[0], s[1] - a[1]], this._dragging[n] ? this._dispatch("onDrag", n, s[0], s[1]) : (this._dragging[n] = !0, this._dispatch("onDragStart", n, a[0], a[1]))
                  } this._dispatch("onMouseMove", i[0], i[1], e)
          }
      }
      e.preventDefault && e.preventDefault(), e.stopPropagation()
  },
  _resolveTouchZoom: function(e) {
      var t;
      t = e.changedTouches ? e.targetTouches : [this._touches[0].evt, this._touches[1].evt];
      var r = Math.sqrt(Math.pow(t[0].clientX - t[1].clientX, 2) + Math.pow(t[0].clientY - t[1].clientY, 2)),
          i = r - this._touchZoomDelta;
      this._touchZoomDelta = r, i > -.995 && i < .995 || (i = i > 0 ? 1 : -1, this._dispatch("onMouseWheel", i))
  },
  _resolveTouchPan: function(e) {
      var t = 25,
          r = new SglBrowser;
      if ((r.isIE || r.isEdge) && (t = 5), this._cursorIncrPos < t) {
          if (this._cursorIncrTime < 500) return;
          if (this._mouseButtonsDown[0] = !1, this._dragging[0]) {
              this._dragging[0] = !1;
              var i = this._dragStartPos[0],
                  n = [this._cursorPos[0], this._cursorPos[1]];
              this._dragEndPos[0] = n, this._dragDeltaPos[0] = [n[0] - i[0], n[1] - i[1]], this._dispatch("onDragEnd", 0, n[0], n[1])
          }
          this._mouseButtonsDown[1] = !0, this._dragStartPos[1] = [this._cursorPos[0], this._cursorPos[1]]
      }
      this._touchPanResolved = !0
  },
  _onMouseButtonDown: function(e) {
      this._canvas.focus();
      var t = this._getMouseClientPos(e);
      this._cursorPos = t;
      var r = e.button;
      this._mouseButtonsDown[r] = !0, this._dragStartPos[r] = [t[0], t[1]], this._dispatch("onMouseButtonDown", r, t[0], t[1], e), e.stopPropagation()
  },
  _onMouseButtonUp: function(e) {
      var t = this._getMouseClientPos(e);
      this._cursorPos = t;
      var r = e.button;
      if (this._mouseButtonsDown[r] = !1, this._dispatch("onMouseButtonUp", r, t[0], t[1], e), this._dragging[r]) {
          this._dragging[r] = !1;
          var i = this._dragStartPos[r],
              n = [t[0], t[1]];
          this._dragEndPos[r] = n, this._dragDeltaPos[r] = [n[0] - i[0], n[1] - i[1]], this._dispatch("onDragEnd", r, n[0], n[1])
      }
      e.stopPropagation()
  },
  _onWindowMouseButtonUp: function(e) {
      var t = this._getMouseClientPos(e);
      this._cursorPos = t;
      var r = e.button;
      if (this._mouseButtonsDown[r]) {
          if (this._mouseButtonsDown[r] = !1, this._dispatch("onMouseButtonUp", r, t[0], t[1], e), this._dragging[r]) {
              this._dragging[r] = !1;
              var i = this._dragStartPos[r],
                  n = [t[0], t[1]];
              this._dragEndPos[r] = n, this._dragDeltaPos[r] = [n[0] - i[0], n[1] - i[1]], this._dispatch("onDragEnd", r, n[0], n[1])
          }
          e.stopPropagation()
      }
  },
  _onMouseMove: function(e) {
      this._cursorPrevPos = this._cursorPos;
      var t = this._getMouseClientPos(e);
      if (this._cursorPos = t, this._cursorDeltaPos = [this._cursorPos[0] - this._cursorPrevPos[0], this._cursorPos[1] - this._cursorPrevPos[1]], 0 != this._cursorDeltaPos[0] || 0 != this._cursorDeltaPos[1]) {
          for (var r = 0; r < 3; ++r)
              if (this._mouseButtonsDown[r]) {
                  var i = this._dragStartPos[r],
                      n = [t[0], t[1]];
                  this._dragEndPos[r] = n, this._dragDeltaPos[r] = [n[0] - i[0], n[1] - i[1]], this._dragging[r] ? this._dispatch("onDrag", r, n[0], n[1]) : (this._dragging[r] = !0, this._dispatch("onDragStart", r, i[0], i[1]))
              } this._dispatch("onMouseMove", t[0], t[1], e)
      }
      e.stopPropagation()
  },
  _onWindowMouseMove: function(e) {
      this._cursorPrevPos = this._cursorPos;
      var t = this._getMouseClientPos(e);
      if (this._cursorPos = t, this._cursorDeltaPos = [this._cursorPos[0] - this._cursorPrevPos[0], this._cursorPos[1] - this._cursorPrevPos[1]], 0 != this._cursorDeltaPos[0] || 0 != this._cursorDeltaPos[1]) {
          for (var r = 0; r < 3; ++r)
              if (this._dragging[r]) {
                  var i = this._dragStartPos[r],
                      n = [t[0], t[1]];
                  this._dragEndPos[r] = n, this._dragDeltaPos[r] = [n[0] - i[0], n[1] - i[1]], this._dispatch("onDrag", r, n[0], n[1])
              } t[2] || this._dispatch("onMouseMove", t[0], t[1], e)
      }
      e.stopPropagation()
  },
  _onWindowResize: function(e) {
      var t;
      this._mouseButtonsDown[0] ? t = 0 : this._mouseButtonsDown[1] && (t = 1), this._touches.pop();
      var r = this._cursorPos;
      if (this._mouseButtonsDown = [!1, !1, !1], this._dispatch("onMouseButtonUp", t, r[0], r[1], e), this._dragging[t]) {
          this._dragging[t] = !1;
          var i = this._dragStartPos[t],
              n = [r[0], r[1]];
          this._dragEndPos[t] = n, this._dragDeltaPos[t] = [n[0] - i[0], n[1] - i[1]], this._dispatch("onDragEnd", t, n[0], n[1])
      }
      this._touchPanResolved = !1, this._cursorIncrPos = this._cursorIncrTime = 0, e.stopPropagation()
  },
  _onMouseWheel: function(e) {
      var t = this._getMouseClientPos(e),
          r = 0;
      e || (e = window.event), e.wheelDelta ? r = e.wheelDelta / 120 : e.detail && (r = -e.detail / 3), r && this._dispatch("onMouseWheel", r, t[0], t[1], e), e.preventDefault && e.preventDefault(), e.stopPropagation()
  },
  _onMouseOut: function(e) {
      var t = this._getMouseClientPos(e);
      this._cursorPos = t, this._dispatch("onMouseOut", t[0], t[1], e)
  },
  _onClick: function(e) {
      var t = this._getMouseClientPos(e);
      this._dispatch("onClick", e.button, t[0], t[1], e)
  },
  _onDoubleClick: function(e) {
      var t = this._getMouseClientPos(e);
      this._dispatch("onDoubleClick", e.button, t[0], t[1], e)
  },
  _onResize: function(e) {
      this._dispatch("onResize", this._canvas.width, this._canvas.height, e)
  },
  _onAnimate: function() {
      this._animatePrevTime = this._animateTime, this._animateTime = Date.now(), this._animateDeltaTime = this._animateTime - this._animatePrevTime, this._dispatch("onAnimate", this._animateDeltaTime / 1e3), this._animateMS >= 0 ? this._animateWithTimeout && setTimeout(this._animateEventHandler, this._animateMS) : this._fastAnimate && window.postMessage(SpiderGL.UserInterface.CanvasHandler._FAST_ANIMATE_MESSAGE_NAME, "*")
  },
  _onDraw: function(e) {
      if (this._drawEventPending = !1, this._fpsTime && 5 != this.postDrawCount) {
          this._fpsCount++;
          var t = e - this._fpsTime;
          this._fps = .8 * this._fps + 1e3 / t * .2
      } else this._fpsCount = 0;
      this._fpsTime = e, this._dispatch("onDraw"), this._postDrawCount-- > 0 && (this._drawEventPending = !0, requestAnimationFrame(this._delegateDraw))
  },
  get gl() {
      return this._gl
  },
  get canvas() {
      return this._canvas
  },
  get width() {
      return this._canvas.width
  },
  get height() {
      return this._canvas.height
  },
  get postDrawEvent() {
      return this._postDrawEventFunction
  },
  get animateTime() {
      return this._animateTime
  },
  get animatePrevTime() {
      return this._animatePrevTime
  },
  get animateDeltaTime() {
      return this._animateDeltaTime
  },
  get animateRate() {
      return this._animateRate
  },
  set animateRate(e) {
      e = SpiderGL.Utility.getDefaultValue(e, SpiderGL.UserInterface.CanvasHandler.DEFAULT_ANIMATE_RATE), this._animateRate !== e && (this._fastAnimate = !1, this._animateMS = -1, this._animateTime = Date.now(), this._animatePrevTime = this._animateTime, this._animateDeltaTime = 0, this._animateID && (clearInterval(this._animateID), this._animateID = null), this._animateRate = e, e > 0 ? (this._animateMS = SpiderGL.Math.floor(1e3 / e), this._animateWithTimeout ? setTimeout(this._animateEventHandler, this._animateMS) : this._animateID = setInterval(this._animateEventHandler, this._animateMS)) : e < 0 && (this._fastAnimate = !0, window.postMessage(SpiderGL.UserInterface.CanvasHandler._FAST_ANIMATE_MESSAGE_NAME, "*")))
  },
  get framesPerSecond() {
      return this._fps
  },
  get ignoreKeyRepeat() {
      return this._ignoreKeyRepeat
  },
  set ignoreKeyRepeat(e) {
      this._ignoreKeyRepeat = SpiderGL.Utility.getDefaultValue(e, SpiderGL.UserInterface.CanvasHandler.DEFAULT_IGNORE_KEY_REPEAT)
  },
  isKeyDown: function(e) {
      return e.toUpperCase && (e = e.toUpperCase()), this._keysDown[e]
  },
  isMouseButtonDown: function(e) {
      return this._mouseButtonsDown[e]
  },
  isDragging: function(e) {
      return this._dragging[e]
  },
  dragStartX: function(e) {
      return this._dragStartPos[e][0]
  },
  dragStartY: function(e) {
      return this._dragStartPos[e][1]
  },
  dragEndX: function(e) {
      return this._dragEndPos[e][0]
  },
  dragEndY: function(e) {
      return this._dragEndPos[e][1]
  },
  dragDeltaX: function(e) {
      return this._dragDeltaPos[e][0]
  },
  dragDeltaY: function(e) {
      return this._dragDeltaPos[e][1]
  },
  get cursorX() {
      return this._cursorPos[0]
  },
  get cursorY() {
      return this._cursorPos[1]
  },
  get cursorPrevX() {
      return this._cursorPrevPos[0]
  },
  get cursorPrevY() {
      return this._cursorPrevPos[1]
  },
  get cursorDeltaX() {
      return this._cursorDeltaPos[0]
  },
  get cursorDeltaY() {
      return this._cursorDeltaPos[1]
  },
  draw: function() {
      this._onDraw()
  }
}, SpiderGL.Type.extend(SpiderGL.UserInterface.CanvasHandler, SpiderGL.Core.ObjectBase), SpiderGL.UserInterface.handleCanvas = function(e, t, r) {
  if (!e || !t) return !1;
  r = r || {};
  var i = SpiderGL.WebGL.Context.getHijacked(e, r);
  if (!i) return !1;
  var n = new SpiderGL.UserInterface.CanvasHandler(i, t, r);
  return !!n && (t[SpiderGL.Utility.getDefaultValue(r.uiName, SpiderGL.UserInterface.CanvasHandler.DEFAULT_PROPERTY_NAME)] = n, n._firstNotify(), !0)
}, SpiderGL.UserInterface.handleCanvasOnLoad = function(e, t, r) {
  if (!e || !t) return !1;
  r = r || {};
  var i = SpiderGL.Utility.getDefaultValue(r.onLoad, null);
  return window.addEventListener("load", function() {
      SpiderGL.UserInterface.handleCanvas(e, t, r), i && i()
  }, !1), !0
};