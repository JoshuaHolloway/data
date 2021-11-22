(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  const useWorldAtlas = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      d3.json(jsonUrl).then(topology => {
        const { countries, land } = topology.objects;
        setData({
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        });
      });
    }, []);

    return data;
  };

  const csvUrl =
    'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

  const row = d => {
    d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
    d['Total Dead and Missing'] = + d['Total Dead and Missing'];
    d['Reported Date'] = new Date(d['Reported Date']);
    return d;
  };

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      d3.csv(csvUrl, row).then(setData);
    }, []);

    return data;
  };

  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  const Marks = ({
    worldAtlas: { land, interiors },
    data,
    sizeScale,
    sizeValue
  }) => (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path({ type: 'Sphere' }) }),
      React.createElement( 'path', { className: "graticules", d: path(graticule()) }),
      land.features.map(feature => (
        React.createElement( 'path', { className: "land", d: path(feature) })
      )),
      React.createElement( 'path', { className: "interiors", d: path(interiors) }),
      data.map(d => {
        const [x, y] = projection(d.coords);
        return React.createElement( 'circle', { cx: x, cy: y, r: sizeScale(sizeValue(d)) });
      })
    )
  );

  const sizeValue = d => d['Total Dead and Missing'];

  const BubbleMap = ({ data, worldAtlas }) => {
    const maxRadius = 15;

    const sizeScale = d3.scaleSqrt()
      .domain([0, d3.max(data, sizeValue)])
      .range([0, maxRadius]);

    return (
      React$1__default.createElement( Marks, {
        worldAtlas: worldAtlas, data: data, sizeScale: sizeScale, sizeValue: sizeValue })
    );
  };

  const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks().map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks().map(tickValue => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ));

  const Marks$1 = ({
    binnedData,
    xScale,
    yScale,
    tooltipFormat,
    innerHeight
  }) =>
    binnedData.map(d => (
      React.createElement( 'rect', {
        className: "mark", x: xScale(d.x0), y: yScale(d.y), width: xScale(d.x1) - xScale(d.x0), height: innerHeight - yScale(d.y) },
        React.createElement( 'title', null, tooltipFormat(d.y) )
      )
    ));

  const margin = { top: 0, right: 30, bottom: 20, left: 45 };
  const xAxisLabelOffset = 54;
  const yAxisLabelOffset = 30;

  const DateHistogram = ({
    data,
    width,
    height,
    setBrushExtent,
    xValue
  }) => {
    const xAxisLabel = 'Time';

    const yValue = d => d['Total Dead and Missing'];
    const yAxisLabel = 'Total Dead and Missing';

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xAxisTickFormat = d3.timeFormat('%m/%d/%Y');

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const [start, stop] = xScale.domain();

    const binnedData = d3.histogram()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(d3.timeMonths(start, stop))(data)
      .map(array => ({
        y: d3.sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      }));

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(binnedData, d => d.y)])
      .range([innerHeight, 0]);

    const brushRef = React$1.useRef();

    React$1.useEffect(() => {
      const brush = d3.brushX().extent([[0, 0], [innerWidth, innerHeight]]);
      brush(d3.select(brushRef.current));
      brush.on('brush end', () => {
        setBrushExtent(d3.event.selection && d3.event.selection.map(xScale.invert));
      });
    }, [innerWidth, innerHeight]);

    return (
      React.createElement( React.Fragment, null,
        React.createElement( 'rect', { width: width, height: height, fill: "white" }),
        React.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
          React.createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 5 }),
          React.createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)` },
            yAxisLabel
          ),
          React.createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: 5 }),
          React.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
            xAxisLabel
          ),
          React.createElement( Marks$1, {
            binnedData: binnedData, xScale: xScale, yScale: yScale, tooltipFormat: d => d, circleRadius: 2, innerHeight: innerHeight }),
          React.createElement( 'g', { ref: brushRef })
        )
      )
    );
  };

  const width = 960;
  const height = 500;
  const dateHistogramSize = 0.2;

  const xValue = d => d['Reported Date'];

  const App = () => {
    const worldAtlas = useWorldAtlas();
    const data = useData();
    const [brushExtent, setBrushExtent] = React$1.useState();
    
    if (!worldAtlas || !data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }
    
    const filteredData = brushExtent ? data.filter(d => {
      const date = xValue(d);
      return date > brushExtent[0] && date < brushExtent[1];
    }) : data;

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( BubbleMap, { data: filteredData, worldAtlas: worldAtlas }),
        React$1__default.createElement( 'g', { transform: `translate(0, ${height - dateHistogramSize * height})` },
          React$1__default.createElement( DateHistogram, {
            data: data, width: width, height: dateHistogramSize * height, setBrushExtent: setBrushExtent, xValue: xValue })
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZVdvcmxkQXRsYXMuanMiLCJ1c2VEYXRhLmpzIiwiQnViYmxlTWFwL01hcmtzLmpzIiwiQnViYmxlTWFwL2luZGV4LmpzIiwiRGF0ZUhpc3RvZ3JhbS9BeGlzQm90dG9tLmpzIiwiRGF0ZUhpc3RvZ3JhbS9BeGlzTGVmdC5qcyIsIkRhdGVIaXN0b2dyYW0vTWFya3MuanMiLCJEYXRlSGlzdG9ncmFtL2luZGV4LmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc29uIH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgZmVhdHVyZSwgbWVzaCB9IGZyb20gJ3RvcG9qc29uJztcblxuY29uc3QganNvblVybCA9ICdodHRwczovL3VucGtnLmNvbS93b3JsZC1hdGxhc0AyLjAuMi9jb3VudHJpZXMtNTBtLmpzb24nO1xuXG5leHBvcnQgY29uc3QgdXNlV29ybGRBdGxhcyA9ICgpID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBqc29uKGpzb25VcmwpLnRoZW4odG9wb2xvZ3kgPT4ge1xuICAgICAgY29uc3QgeyBjb3VudHJpZXMsIGxhbmQgfSA9IHRvcG9sb2d5Lm9iamVjdHM7XG4gICAgICBzZXREYXRhKHtcbiAgICAgICAgbGFuZDogZmVhdHVyZSh0b3BvbG9neSwgbGFuZCksXG4gICAgICAgIGludGVyaW9yczogbWVzaCh0b3BvbG9neSwgY291bnRyaWVzLCAoYSwgYikgPT4gYSAhPT0gYilcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzdiB9IGZyb20gJ2QzJztcblxuY29uc3QgY3N2VXJsID1cbiAgJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vY3VycmFuL2E5NjU2ZDcxMWE4YWQzMWQ4MTJiOGY5OTYzYWM0NDFjL3Jhdy9jMjIxNDQwNjI1NjZkZTkxMWJhMzI1MDk2MTNjODRhZjJhOTllOGUyL01pc3NpbmdNaWdyYW50cy1HbG9iYWwtMjAxOS0xMC0wOFQwOS00Ny0xNC1zdWJzZXQuY3N2JztcblxuY29uc3Qgcm93ID0gZCA9PiB7XG4gIGQuY29vcmRzID0gZFsnTG9jYXRpb24gQ29vcmRpbmF0ZXMnXS5zcGxpdCgnLCcpLm1hcChkID0+ICtkKS5yZXZlcnNlKCk7XG4gIGRbJ1RvdGFsIERlYWQgYW5kIE1pc3NpbmcnXSA9ICsgZFsnVG90YWwgRGVhZCBhbmQgTWlzc2luZyddO1xuICBkWydSZXBvcnRlZCBEYXRlJ10gPSBuZXcgRGF0ZShkWydSZXBvcnRlZCBEYXRlJ10pO1xuICByZXR1cm4gZDtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VEYXRhID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNzdihjc3ZVcmwsIHJvdykudGhlbihzZXREYXRhKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsImltcG9ydCB7IGdlb05hdHVyYWxFYXJ0aDEsIGdlb1BhdGgsIGdlb0dyYXRpY3VsZSB9IGZyb20gJ2QzJztcblxuY29uc3QgcHJvamVjdGlvbiA9IGdlb05hdHVyYWxFYXJ0aDEoKTtcbmNvbnN0IHBhdGggPSBnZW9QYXRoKHByb2plY3Rpb24pO1xuY29uc3QgZ3JhdGljdWxlID0gZ2VvR3JhdGljdWxlKCk7XG5cbmV4cG9ydCBjb25zdCBNYXJrcyA9ICh7XG4gIHdvcmxkQXRsYXM6IHsgbGFuZCwgaW50ZXJpb3JzIH0sXG4gIGRhdGEsXG4gIHNpemVTY2FsZSxcbiAgc2l6ZVZhbHVlXG59KSA9PiAoXG4gIDxnIGNsYXNzTmFtZT1cIm1hcmtzXCI+XG4gICAgPHBhdGggY2xhc3NOYW1lPVwic3BoZXJlXCIgZD17cGF0aCh7IHR5cGU6ICdTcGhlcmUnIH0pfSAvPlxuICAgIDxwYXRoIGNsYXNzTmFtZT1cImdyYXRpY3VsZXNcIiBkPXtwYXRoKGdyYXRpY3VsZSgpKX0gLz5cbiAgICB7bGFuZC5mZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiAoXG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJsYW5kXCIgZD17cGF0aChmZWF0dXJlKX0gLz5cbiAgICApKX1cbiAgICA8cGF0aCBjbGFzc05hbWU9XCJpbnRlcmlvcnNcIiBkPXtwYXRoKGludGVyaW9ycyl9IC8+XG4gICAge2RhdGEubWFwKGQgPT4ge1xuICAgICAgY29uc3QgW3gsIHldID0gcHJvamVjdGlvbihkLmNvb3Jkcyk7XG4gICAgICByZXR1cm4gPGNpcmNsZSBjeD17eH0gY3k9e3l9IHI9e3NpemVTY2FsZShzaXplVmFsdWUoZCkpfSAvPjtcbiAgICB9KX1cbiAgPC9nPlxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzY2FsZVNxcnQsIG1heCB9IGZyb20gJ2QzJztcbmltcG9ydCB7IE1hcmtzIH0gZnJvbSAnLi9NYXJrcyc7XG5cbmNvbnN0IHNpemVWYWx1ZSA9IGQgPT4gZFsnVG90YWwgRGVhZCBhbmQgTWlzc2luZyddO1xuXG5leHBvcnQgY29uc3QgQnViYmxlTWFwID0gKHsgZGF0YSwgd29ybGRBdGxhcyB9KSA9PiB7XG4gIGNvbnN0IG1heFJhZGl1cyA9IDE1O1xuXG4gIGNvbnN0IHNpemVTY2FsZSA9IHNjYWxlU3FydCgpXG4gICAgLmRvbWFpbihbMCwgbWF4KGRhdGEsIHNpemVWYWx1ZSldKVxuICAgIC5yYW5nZShbMCwgbWF4UmFkaXVzXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TWFya3NcbiAgICAgIHdvcmxkQXRsYXM9e3dvcmxkQXRsYXN9XG4gICAgICBkYXRhPXtkYXRhfVxuICAgICAgc2l6ZVNjYWxlPXtzaXplU2NhbGV9XG4gICAgICBzaXplVmFsdWU9e3NpemVWYWx1ZX1cbiAgICAvPlxuICApO1xufTtcbiIsImV4cG9ydCBjb25zdCBBeGlzQm90dG9tID0gKHsgeFNjYWxlLCBpbm5lckhlaWdodCwgdGlja0Zvcm1hdCwgdGlja09mZnNldCA9IDMgfSkgPT5cbiAgeFNjYWxlLnRpY2tzKCkubWFwKHRpY2tWYWx1ZSA9PiAoXG4gICAgPGdcbiAgICAgIGNsYXNzTmFtZT1cInRpY2tcIlxuICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4U2NhbGUodGlja1ZhbHVlKX0sMClgfVxuICAgID5cbiAgICAgIDxsaW5lIHkyPXtpbm5lckhlaWdodH0gLz5cbiAgICAgIDx0ZXh0IHN0eWxlPXt7IHRleHRBbmNob3I6ICdtaWRkbGUnIH19IGR5PVwiLjcxZW1cIiB5PXtpbm5lckhlaWdodCArIHRpY2tPZmZzZXR9PlxuICAgICAgICB7dGlja0Zvcm1hdCh0aWNrVmFsdWUpfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJleHBvcnQgY29uc3QgQXhpc0xlZnQgPSAoeyB5U2NhbGUsIGlubmVyV2lkdGgsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHlTY2FsZS50aWNrcygpLm1hcCh0aWNrVmFsdWUgPT4gKFxuICAgIDxnIGNsYXNzTmFtZT1cInRpY2tcIiB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMCwke3lTY2FsZSh0aWNrVmFsdWUpfSlgfT5cbiAgICAgIDxsaW5lIHgyPXtpbm5lcldpZHRofSAvPlxuICAgICAgPHRleHRcbiAgICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICAgIHN0eWxlPXt7IHRleHRBbmNob3I6ICdlbmQnIH19XG4gICAgICAgIHg9ey10aWNrT2Zmc2V0fVxuICAgICAgICBkeT1cIi4zMmVtXCJcbiAgICAgID5cbiAgICAgICAge3RpY2tWYWx1ZX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IE1hcmtzID0gKHtcbiAgYmlubmVkRGF0YSxcbiAgeFNjYWxlLFxuICB5U2NhbGUsXG4gIHRvb2x0aXBGb3JtYXQsXG4gIGlubmVySGVpZ2h0XG59KSA9PlxuICBiaW5uZWREYXRhLm1hcChkID0+IChcbiAgICA8cmVjdFxuICAgICAgY2xhc3NOYW1lPVwibWFya1wiXG4gICAgICB4PXt4U2NhbGUoZC54MCl9XG4gICAgICB5PXt5U2NhbGUoZC55KX1cbiAgICAgIHdpZHRoPXt4U2NhbGUoZC54MSkgLSB4U2NhbGUoZC54MCl9XG4gICAgICBoZWlnaHQ9e2lubmVySGVpZ2h0IC0geVNjYWxlKGQueSl9XG4gICAgPlxuICAgICAgPHRpdGxlPnt0b29sdGlwRm9ybWF0KGQueSl9PC90aXRsZT5cbiAgICA8L3JlY3Q+XG4gICkpO1xuIiwiaW1wb3J0IHtcbiAgc2NhbGVMaW5lYXIsXG4gIHNjYWxlVGltZSxcbiAgbWF4LFxuICB0aW1lRm9ybWF0LFxuICBleHRlbnQsXG4gIGhpc3RvZ3JhbSBhcyBiaW4sXG4gIHRpbWVNb250aHMsXG4gIHN1bSxcbiAgYnJ1c2hYLFxuICBzZWxlY3QsXG4gIGV2ZW50XG59IGZyb20gJ2QzJztcbmltcG9ydCB7IHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXhpc0JvdHRvbSB9IGZyb20gJy4vQXhpc0JvdHRvbSc7XG5pbXBvcnQgeyBBeGlzTGVmdCB9IGZyb20gJy4vQXhpc0xlZnQnO1xuaW1wb3J0IHsgTWFya3MgfSBmcm9tICcuL01hcmtzJztcblxuY29uc3QgbWFyZ2luID0geyB0b3A6IDAsIHJpZ2h0OiAzMCwgYm90dG9tOiAyMCwgbGVmdDogNDUgfTtcbmNvbnN0IHhBeGlzTGFiZWxPZmZzZXQgPSA1NDtcbmNvbnN0IHlBeGlzTGFiZWxPZmZzZXQgPSAzMDtcblxuZXhwb3J0IGNvbnN0IERhdGVIaXN0b2dyYW0gPSAoe1xuICBkYXRhLFxuICB3aWR0aCxcbiAgaGVpZ2h0LFxuICBzZXRCcnVzaEV4dGVudCxcbiAgeFZhbHVlXG59KSA9PiB7XG4gIGNvbnN0IHhBeGlzTGFiZWwgPSAnVGltZSc7XG5cbiAgY29uc3QgeVZhbHVlID0gZCA9PiBkWydUb3RhbCBEZWFkIGFuZCBNaXNzaW5nJ107XG4gIGNvbnN0IHlBeGlzTGFiZWwgPSAnVG90YWwgRGVhZCBhbmQgTWlzc2luZyc7XG5cbiAgY29uc3QgaW5uZXJIZWlnaHQgPSBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgY29uc3QgaW5uZXJXaWR0aCA9IHdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG5cbiAgY29uc3QgeEF4aXNUaWNrRm9ybWF0ID0gdGltZUZvcm1hdCgnJW0vJWQvJVknKTtcblxuICBjb25zdCB4U2NhbGUgPSBzY2FsZVRpbWUoKVxuICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHhWYWx1ZSkpXG4gICAgLnJhbmdlKFswLCBpbm5lcldpZHRoXSlcbiAgICAubmljZSgpO1xuXG4gIGNvbnN0IFtzdGFydCwgc3RvcF0gPSB4U2NhbGUuZG9tYWluKCk7XG5cbiAgY29uc3QgYmlubmVkRGF0YSA9IGJpbigpXG4gICAgLnZhbHVlKHhWYWx1ZSlcbiAgICAuZG9tYWluKHhTY2FsZS5kb21haW4oKSlcbiAgICAudGhyZXNob2xkcyh0aW1lTW9udGhzKHN0YXJ0LCBzdG9wKSkoZGF0YSlcbiAgICAubWFwKGFycmF5ID0+ICh7XG4gICAgICB5OiBzdW0oYXJyYXksIHlWYWx1ZSksXG4gICAgICB4MDogYXJyYXkueDAsXG4gICAgICB4MTogYXJyYXkueDFcbiAgICB9KSk7XG5cbiAgY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heChiaW5uZWREYXRhLCBkID0+IGQueSldKVxuICAgIC5yYW5nZShbaW5uZXJIZWlnaHQsIDBdKTtcblxuICBjb25zdCBicnVzaFJlZiA9IHVzZVJlZigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgYnJ1c2ggPSBicnVzaFgoKS5leHRlbnQoW1swLCAwXSwgW2lubmVyV2lkdGgsIGlubmVySGVpZ2h0XV0pO1xuICAgIGJydXNoKHNlbGVjdChicnVzaFJlZi5jdXJyZW50KSk7XG4gICAgYnJ1c2gub24oJ2JydXNoIGVuZCcsICgpID0+IHtcbiAgICAgIHNldEJydXNoRXh0ZW50KGV2ZW50LnNlbGVjdGlvbiAmJiBldmVudC5zZWxlY3Rpb24ubWFwKHhTY2FsZS5pbnZlcnQpKTtcbiAgICB9KTtcbiAgfSwgW2lubmVyV2lkdGgsIGlubmVySGVpZ2h0XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHJlY3Qgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZmlsbD1cIndoaXRlXCIgLz5cbiAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWB9PlxuICAgICAgICA8QXhpc0JvdHRvbVxuICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgIGlubmVySGVpZ2h0PXtpbm5lckhlaWdodH1cbiAgICAgICAgICB0aWNrRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgdGlja09mZnNldD17NX1cbiAgICAgICAgLz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHsteUF4aXNMYWJlbE9mZnNldH0sJHtpbm5lckhlaWdodCAvXG4gICAgICAgICAgICAyfSkgcm90YXRlKC05MClgfVxuICAgICAgICA+XG4gICAgICAgICAge3lBeGlzTGFiZWx9XG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPEF4aXNMZWZ0IHlTY2FsZT17eVNjYWxlfSBpbm5lcldpZHRoPXtpbm5lcldpZHRofSB0aWNrT2Zmc2V0PXs1fSAvPlxuICAgICAgICA8dGV4dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICAgIHg9e2lubmVyV2lkdGggLyAyfVxuICAgICAgICAgIHk9e2lubmVySGVpZ2h0ICsgeEF4aXNMYWJlbE9mZnNldH1cbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt4QXhpc0xhYmVsfVxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDxNYXJrc1xuICAgICAgICAgIGJpbm5lZERhdGE9e2Jpbm5lZERhdGF9XG4gICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgeVNjYWxlPXt5U2NhbGV9XG4gICAgICAgICAgdG9vbHRpcEZvcm1hdD17ZCA9PiBkfVxuICAgICAgICAgIGNpcmNsZVJhZGl1cz17Mn1cbiAgICAgICAgICBpbm5lckhlaWdodD17aW5uZXJIZWlnaHR9XG4gICAgICAgIC8+XG4gICAgICAgIDxnIHJlZj17YnJ1c2hSZWZ9IC8+XG4gICAgICA8L2c+XG4gICAgPC8+XG4gICk7XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyB1c2VXb3JsZEF0bGFzIH0gZnJvbSAnLi91c2VXb3JsZEF0bGFzJztcbmltcG9ydCB7IHVzZURhdGEgfSBmcm9tICcuL3VzZURhdGEnO1xuaW1wb3J0IHsgQnViYmxlTWFwIH0gZnJvbSAnLi9CdWJibGVNYXAvaW5kZXguanMnO1xuaW1wb3J0IHsgRGF0ZUhpc3RvZ3JhbSB9IGZyb20gJy4vRGF0ZUhpc3RvZ3JhbS9pbmRleC5qcyc7XG5cbmNvbnN0IHdpZHRoID0gOTYwO1xuY29uc3QgaGVpZ2h0ID0gNTAwO1xuY29uc3QgZGF0ZUhpc3RvZ3JhbVNpemUgPSAwLjI7XG5cbmNvbnN0IHhWYWx1ZSA9IGQgPT4gZFsnUmVwb3J0ZWQgRGF0ZSddO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IHdvcmxkQXRsYXMgPSB1c2VXb3JsZEF0bGFzKCk7XG4gIGNvbnN0IGRhdGEgPSB1c2VEYXRhKCk7XG4gIGNvbnN0IFticnVzaEV4dGVudCwgc2V0QnJ1c2hFeHRlbnRdID0gdXNlU3RhdGUoKTtcbiAgXG4gIGlmICghd29ybGRBdGxhcyB8fCAhZGF0YSkge1xuICAgIHJldHVybiA8cHJlPkxvYWRpbmcuLi48L3ByZT47XG4gIH1cbiAgXG4gIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGJydXNoRXh0ZW50ID8gZGF0YS5maWx0ZXIoZCA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IHhWYWx1ZShkKTtcbiAgICByZXR1cm4gZGF0ZSA+IGJydXNoRXh0ZW50WzBdICYmIGRhdGUgPCBicnVzaEV4dGVudFsxXTtcbiAgfSkgOiBkYXRhO1xuXG4gIHJldHVybiAoXG4gICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cbiAgICAgIDxCdWJibGVNYXAgZGF0YT17ZmlsdGVyZWREYXRhfSB3b3JsZEF0bGFzPXt3b3JsZEF0bGFzfSAvPlxuICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsICR7aGVpZ2h0IC0gZGF0ZUhpc3RvZ3JhbVNpemUgKiBoZWlnaHR9KWB9PlxuICAgICAgICA8RGF0ZUhpc3RvZ3JhbVxuICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIGhlaWdodD17ZGF0ZUhpc3RvZ3JhbVNpemUgKiBoZWlnaHR9XG4gICAgICAgICAgc2V0QnJ1c2hFeHRlbnQ9e3NldEJydXNoRXh0ZW50fVxuICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAvPlxuICAgICAgPC9nPlxuICAgIDwvc3ZnPlxuICApO1xufTtcbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKTtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCByb290RWxlbWVudCk7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJqc29uIiwiZmVhdHVyZSIsIm1lc2giLCJjc3YiLCJnZW9OYXR1cmFsRWFydGgxIiwiZ2VvUGF0aCIsImdlb0dyYXRpY3VsZSIsInNjYWxlU3FydCIsIm1heCIsIlJlYWN0IiwiTWFya3MiLCJ0aW1lRm9ybWF0Iiwic2NhbGVUaW1lIiwiZXh0ZW50IiwiYmluIiwidGltZU1vbnRocyIsInN1bSIsInNjYWxlTGluZWFyIiwidXNlUmVmIiwiYnJ1c2hYIiwic2VsZWN0IiwiZXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUlBLE1BQU0sT0FBTyxHQUFHLHdEQUF3RCxDQUFDOztFQUVsRSxNQUFNLGFBQWEsR0FBRyxNQUFNO0lBQ2pDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUdBLGdCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBRXZDQyxpQkFBUyxDQUFDLE1BQU07TUFDZEMsT0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUk7UUFDN0IsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzdDLE9BQU8sQ0FBQztVQUNOLElBQUksRUFBRUMsZ0JBQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO1VBQzdCLFNBQVMsRUFBRUMsYUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEQsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0osRUFBRSxFQUFFLENBQUMsQ0FBQzs7SUFFUCxPQUFPLElBQUksQ0FBQztHQUNiOztFQ2pCRCxNQUFNLE1BQU07SUFDViwrS0FBK0ssQ0FBQzs7RUFFbEwsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJO0lBQ2YsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9B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