// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"bundle.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function (React$1, ReactDOM, d3) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  var csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';

  var useData = function useData() {
    var _React$1$useState = React$1.useState(null),
        _React$1$useState2 = _slicedToArray(_React$1$useState, 2),
        data = _React$1$useState2[0],
        setData = _React$1$useState2[1];

    React$1.useEffect(function () {
      var row = function row(d) {
        d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
        return d;
      };

      d3.csv(csvUrl, row).then(setData);
    }, []);
    return data;
  };

  var AxisBottom = function AxisBottom(_ref) {
    var xScale = _ref.xScale,
        innerHeight = _ref.innerHeight,
        tickFormat = _ref.tickFormat,
        _ref$tickOffset = _ref.tickOffset,
        tickOffset = _ref$tickOffset === void 0 ? 3 : _ref$tickOffset;
    return xScale.ticks().map(function (tickValue) {
      return React.createElement('g', {
        className: "tick",
        key: tickValue,
        transform: "translate(".concat(xScale(tickValue), ",0)")
      }, React.createElement('line', {
        y2: innerHeight
      }), React.createElement('text', {
        style: {
          textAnchor: 'middle'
        },
        dy: ".71em",
        y: innerHeight + tickOffset
      }, tickFormat(tickValue)));
    });
  };

  var AxisLeft = function AxisLeft(_ref2) {
    var yScale = _ref2.yScale,
        innerWidth = _ref2.innerWidth,
        _ref2$tickOffset = _ref2.tickOffset,
        tickOffset = _ref2$tickOffset === void 0 ? 3 : _ref2$tickOffset;
    return yScale.ticks().map(function (tickValue) {
      return React.createElement('g', {
        className: "tick",
        transform: "translate(0,".concat(yScale(tickValue), ")")
      }, React.createElement('line', {
        x2: innerWidth
      }), React.createElement('text', {
        key: tickValue,
        style: {
          textAnchor: 'end'
        },
        x: -tickOffset,
        dy: ".32em"
      }, tickValue));
    });
  };

  var Marks = function Marks(_ref3) {
    var data = _ref3.data,
        xScale = _ref3.xScale,
        yScale = _ref3.yScale,
        xValue = _ref3.xValue,
        yValue = _ref3.yValue,
        tooltipFormat = _ref3.tooltipFormat,
        circleRadius = _ref3.circleRadius;
    return data.map(function (d) {
      return React.createElement('circle', {
        className: "mark",
        cx: xScale(xValue(d)),
        cy: yScale(yValue(d)),
        r: circleRadius
      }, React.createElement('title', null, tooltipFormat(xValue(d))));
    });
  };

  var Dropdown = function Dropdown(_ref4) {
    var options = _ref4.options,
        id = _ref4.id,
        selectedValue = _ref4.selectedValue,
        onSelectedValueChange = _ref4.onSelectedValueChange;
    return React$1__default.createElement('select', {
      id: id,
      onChange: function onChange(event) {
        return onSelectedValueChange(event.target.value);
      }
    }, options.map(function (_ref5) {
      var value = _ref5.value,
          label = _ref5.label;
      return React$1__default.createElement('option', {
        value: value,
        selected: value === selectedValue
      }, label);
    }));
  };

  var width = 960;
  var menuHeight = 75;
  var height = 500 - menuHeight;
  var margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 90
  };
  var xAxisLabelOffset = 50;
  var yAxisLabelOffset = 45;
  var attributes = [{
    value: 'sepal_length',
    label: 'Sepal Length'
  }, {
    value: 'sepal_width',
    label: 'Sepal Width'
  }, {
    value: 'petal_length',
    label: 'Petal Length'
  }, {
    value: 'petal_width',
    label: 'Petal Width'
  }, {
    value: 'species',
    label: 'Species'
  }];

  var getLabel = function getLabel(value) {
    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].value === value) {
        return attributes[i].label;
      }
    }
  };

  var App = function App() {
    var data = useData();
    var initialXAttribute = 'petal_length';

    var _React$1$useState3 = React$1.useState(initialXAttribute),
        _React$1$useState4 = _slicedToArray(_React$1$useState3, 2),
        xAttribute = _React$1$useState4[0],
        setXAttribute = _React$1$useState4[1];

    var xValue = function xValue(d) {
      return d[xAttribute];
    };

    var xAxisLabel = getLabel(xAttribute);
    var initialYAttribute = 'sepal_width';

    var _React$1$useState5 = React$1.useState(initialYAttribute),
        _React$1$useState6 = _slicedToArray(_React$1$useState5, 2),
        yAttribute = _React$1$useState6[0],
        setYAttribute = _React$1$useState6[1];

    var yValue = function yValue(d) {
      return d[yAttribute];
    };

    var yAxisLabel = getLabel(yAttribute);

    if (!data) {
      return React$1__default.createElement('pre', null, "Loading...");
    }

    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.left - margin.right;
    var siFormat = d3.format('.2s');

    var xAxisTickFormat = function xAxisTickFormat(tickValue) {
      return siFormat(tickValue).replace('G', 'B');
    };

    var xScale = d3.scaleLinear().domain(d3.extent(data, xValue)).range([0, innerWidth]).nice();
    var yScale = d3.scaleLinear().domain(d3.extent(data, yValue)).range([0, innerHeight]);
    return React$1__default.createElement(React$1__default.Fragment, null, React$1__default.createElement('label', {
      for: "x-select"
    }, "X:"), React$1__default.createElement(Dropdown, {
      options: attributes,
      id: "x-select",
      selectedValue: xAttribute,
      onSelectedValueChange: setXAttribute
    }), React$1__default.createElement('label', {
      for: "y-select"
    }, "Y:"), React$1__default.createElement(Dropdown, {
      options: attributes,
      id: "y-select",
      selectedValue: yAttribute,
      onSelectedValueChange: setYAttribute
    }), React$1__default.createElement('svg', {
      width: width,
      height: height
    }, React$1__default.createElement('g', {
      transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
    }, React$1__default.createElement(AxisBottom, {
      xScale: xScale,
      innerHeight: innerHeight,
      tickFormat: xAxisTickFormat,
      tickOffset: 5
    }), React$1__default.createElement('text', {
      className: "axis-label",
      textAnchor: "middle",
      transform: "translate(".concat(-yAxisLabelOffset, ",").concat(innerHeight / 2, ") rotate(-90)")
    }, yAxisLabel), React$1__default.createElement(AxisLeft, {
      yScale: yScale,
      innerWidth: innerWidth,
      tickOffset: 5
    }), React$1__default.createElement('text', {
      className: "axis-label",
      x: innerWidth / 2,
      y: innerHeight + xAxisLabelOffset,
      textAnchor: "middle"
    }, xAxisLabel), React$1__default.createElement(Marks, {
      data: data,
      xScale: xScale,
      yScale: yScale,
      xValue: xValue,
      yValue: yValue,
      tooltipFormat: xAxisTickFormat,
      circleRadius: 7
    }))));
  };

  var rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement(App, null), rootElement);
})(React, ReactDOM, d3);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49694" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bundle.js"], null)
//# sourceMappingURL=/bundle.81605655.js.map