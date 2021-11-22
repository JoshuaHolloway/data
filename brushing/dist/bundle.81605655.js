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

(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  var jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  var useWorldAtlas = function useWorldAtlas() {
    var _React$1$useState = React$1.useState(null),
        _React$1$useState2 = _slicedToArray(_React$1$useState, 2),
        data = _React$1$useState2[0],
        setData = _React$1$useState2[1];

    React$1.useEffect(function () {
      d3.json(jsonUrl).then(function (topology) {
        var _topology$objects = topology.objects,
            countries = _topology$objects.countries,
            land = _topology$objects.land;
        setData({
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, function (a, b) {
            return a !== b;
          })
        });
      });
    }, []);
    return data;
  };

  var csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

  var row = function row(d) {
    d.coords = d['Location Coordinates'].split(',').map(function (d) {
      return +d;
    }).reverse();
    d['Total Dead and Missing'] = +d['Total Dead and Missing'];
    d['Reported Date'] = new Date(d['Reported Date']);
    return d;
  };

  var useData = function useData() {
    var _React$1$useState3 = React$1.useState(null),
        _React$1$useState4 = _slicedToArray(_React$1$useState3, 2),
        data = _React$1$useState4[0],
        setData = _React$1$useState4[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl, row).then(setData);
    }, []);
    return data;
  };

  var projection = d3.geoNaturalEarth1();
  var path = d3.geoPath(projection);
  var graticule = d3.geoGraticule();

  var Marks = function Marks(_ref) {
    var _ref$worldAtlas = _ref.worldAtlas,
        land = _ref$worldAtlas.land,
        interiors = _ref$worldAtlas.interiors,
        data = _ref.data,
        sizeScale = _ref.sizeScale,
        sizeValue = _ref.sizeValue;
    return React.createElement('g', {
      className: "marks"
    }, React.createElement('path', {
      className: "sphere",
      d: path({
        type: 'Sphere'
      })
    }), React.createElement('path', {
      className: "graticules",
      d: path(graticule())
    }), land.features.map(function (feature) {
      return React.createElement('path', {
        className: "land",
        d: path(feature)
      });
    }), React.createElement('path', {
      className: "interiors",
      d: path(interiors)
    }), data.map(function (d) {
      var _projection = projection(d.coords),
          _projection2 = _slicedToArray(_projection, 2),
          x = _projection2[0],
          y = _projection2[1];

      return React.createElement('circle', {
        cx: x,
        cy: y,
        r: sizeScale(sizeValue(d))
      });
    }));
  };

  var sizeValue = function sizeValue(d) {
    return d['Total Dead and Missing'];
  };

  var BubbleMap = function BubbleMap(_ref2) {
    var data = _ref2.data,
        worldAtlas = _ref2.worldAtlas;
    var maxRadius = 15;
    var sizeScale = d3.scaleSqrt().domain([0, d3.max(data, sizeValue)]).range([0, maxRadius]);
    return React$1__default.createElement(Marks, {
      worldAtlas: worldAtlas,
      data: data,
      sizeScale: sizeScale,
      sizeValue: sizeValue
    });
  };

  var AxisBottom = function AxisBottom(_ref3) {
    var xScale = _ref3.xScale,
        innerHeight = _ref3.innerHeight,
        tickFormat = _ref3.tickFormat,
        _ref3$tickOffset = _ref3.tickOffset,
        tickOffset = _ref3$tickOffset === void 0 ? 3 : _ref3$tickOffset;
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

  var AxisLeft = function AxisLeft(_ref4) {
    var yScale = _ref4.yScale,
        innerWidth = _ref4.innerWidth,
        _ref4$tickOffset = _ref4.tickOffset,
        tickOffset = _ref4$tickOffset === void 0 ? 3 : _ref4$tickOffset;
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

  var Marks$1 = function Marks$1(_ref5) {
    var binnedData = _ref5.binnedData,
        xScale = _ref5.xScale,
        yScale = _ref5.yScale,
        tooltipFormat = _ref5.tooltipFormat,
        innerHeight = _ref5.innerHeight;
    return binnedData.map(function (d) {
      return React.createElement('rect', {
        className: "mark",
        x: xScale(d.x0),
        y: yScale(d.y),
        width: xScale(d.x1) - xScale(d.x0),
        height: innerHeight - yScale(d.y)
      }, React.createElement('title', null, tooltipFormat(d.y)));
    });
  };

  var margin = {
    top: 0,
    right: 30,
    bottom: 20,
    left: 45
  };
  var xAxisLabelOffset = 54;
  var yAxisLabelOffset = 30;

  var DateHistogram = function DateHistogram(_ref6) {
    var data = _ref6.data,
        width = _ref6.width,
        height = _ref6.height,
        setBrushExtent = _ref6.setBrushExtent,
        xValue = _ref6.xValue;
    var xAxisLabel = 'Time';

    var yValue = function yValue(d) {
      return d['Total Dead and Missing'];
    };

    var yAxisLabel = 'Total Dead and Missing';
    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.left - margin.right;
    var xAxisTickFormat = d3.timeFormat('%m/%d/%Y');
    var xScale = d3.scaleTime().domain(d3.extent(data, xValue)).range([0, innerWidth]).nice();

    var _xScale$domain = xScale.domain(),
        _xScale$domain2 = _slicedToArray(_xScale$domain, 2),
        start = _xScale$domain2[0],
        stop = _xScale$domain2[1];

    var binnedData = d3.histogram().value(xValue).domain(xScale.domain()).thresholds(d3.timeMonths(start, stop))(data).map(function (array) {
      return {
        y: d3.sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      };
    });
    var yScale = d3.scaleLinear().domain([0, d3.max(binnedData, function (d) {
      return d.y;
    })]).range([innerHeight, 0]);
    var brushRef = React$1.useRef();
    React$1.useEffect(function () {
      var brush = d3.brushX().extent([[0, 0], [innerWidth, innerHeight]]);
      brush(d3.select(brushRef.current));
      brush.on('brush end', function () {
        setBrushExtent(d3.event.selection && d3.event.selection.map(xScale.invert));
      });
    }, [innerWidth, innerHeight]);
    return React.createElement(React.Fragment, null, React.createElement('rect', {
      width: width,
      height: height,
      fill: "white"
    }), React.createElement('g', {
      transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
    }, React.createElement(AxisBottom, {
      xScale: xScale,
      innerHeight: innerHeight,
      tickFormat: xAxisTickFormat,
      tickOffset: 5
    }), React.createElement('text', {
      className: "axis-label",
      textAnchor: "middle",
      transform: "translate(".concat(-yAxisLabelOffset, ",").concat(innerHeight / 2, ") rotate(-90)")
    }, yAxisLabel), React.createElement(AxisLeft, {
      yScale: yScale,
      innerWidth: innerWidth,
      tickOffset: 5
    }), React.createElement('text', {
      className: "axis-label",
      x: innerWidth / 2,
      y: innerHeight + xAxisLabelOffset,
      textAnchor: "middle"
    }, xAxisLabel), React.createElement(Marks$1, {
      binnedData: binnedData,
      xScale: xScale,
      yScale: yScale,
      tooltipFormat: function tooltipFormat(d) {
        return d;
      },
      circleRadius: 2,
      innerHeight: innerHeight
    }), React.createElement('g', {
      ref: brushRef
    })));
  };

  var width = 960;
  var height = 500;
  var dateHistogramSize = 0.2;

  var xValue = function xValue(d) {
    return d['Reported Date'];
  };

  var App = function App() {
    var worldAtlas = useWorldAtlas();
    var data = useData();

    var _React$1$useState5 = React$1.useState(),
        _React$1$useState6 = _slicedToArray(_React$1$useState5, 2),
        brushExtent = _React$1$useState6[0],
        setBrushExtent = _React$1$useState6[1];

    if (!worldAtlas || !data) {
      return React$1__default.createElement('pre', null, "Loading...");
    }

    var filteredData = brushExtent ? data.filter(function (d) {
      var date = xValue(d);
      return date > brushExtent[0] && date < brushExtent[1];
    }) : data;
    return React$1__default.createElement('svg', {
      width: width,
      height: height
    }, React$1__default.createElement(BubbleMap, {
      data: filteredData,
      worldAtlas: worldAtlas
    }), React$1__default.createElement('g', {
      transform: "translate(0, ".concat(height - dateHistogramSize * height, ")")
    }, React$1__default.createElement(DateHistogram, {
      data: data,
      width: width,
      height: dateHistogramSize * height,
      setBrushExtent: setBrushExtent,
      xValue: xValue
    })));
  };

  var rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement(App, null), rootElement);
})(React, ReactDOM, d3, topojson);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51681" + '/');

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