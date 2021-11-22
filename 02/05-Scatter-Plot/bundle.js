(function (React$1, ReactDOM, d3) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      const row = d => {
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

  const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius
  }) =>
    data.map(d => (
      React.createElement( 'circle', {
        className: "mark", cx: xScale(xValue(d)), cy: yScale(yValue(d)), r: circleRadius },
        React.createElement( 'title', null, tooltipFormat(xValue(d)) )
      )
    ));

  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 65, left: 90 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 45;

  const App = () => {
    const data = useData();

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.petal_length;
    const xAxisLabel = 'Petal Length';

    const yValue = d => d.sepal_width;
    const yAxisLabel = 'Sepal Width';

    const siFormat = d3.format('.2s');
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight]);

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
          React$1__default.createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 5 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)` },
            yAxisLabel
          ),
          React$1__default.createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: 5 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
            xAxisLabel
          ),
          React$1__default.createElement( Marks, {
            data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat, circleRadius: 7 })
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZURhdGEuanMiLCJBeGlzQm90dG9tLmpzIiwiQXhpc0xlZnQuanMiLCJNYXJrcy5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3N2IH0gZnJvbSAnZDMnO1xuXG5jb25zdCBjc3ZVcmwgPVxuICAnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jdXJyYW4vYTA4YTEwODBiODgzNDRiMGM4YTcvcmF3LzYzOTM4OGMyY2JjMjEyMGExNGRjZjQ2NmU4NTczMGViOGJlNDk4YmIvaXJpcy5jc3YnO1xuXG5leHBvcnQgY29uc3QgdXNlRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCByb3cgPSBkID0+IHtcbiAgICAgIGQuc2VwYWxfbGVuZ3RoID0gK2Quc2VwYWxfbGVuZ3RoO1xuICAgICAgZC5zZXBhbF93aWR0aCA9ICtkLnNlcGFsX3dpZHRoO1xuICAgICAgZC5wZXRhbF9sZW5ndGggPSArZC5wZXRhbF9sZW5ndGg7XG4gICAgICBkLnBldGFsX3dpZHRoID0gK2QucGV0YWxfd2lkdGg7XG4gICAgICByZXR1cm4gZDtcbiAgICB9O1xuICAgIGNzdihjc3ZVcmwsIHJvdykudGhlbihzZXREYXRhKTtcbiAgfSwgW10pO1xuICBcbiAgcmV0dXJuIGRhdGE7XG59OyIsImV4cG9ydCBjb25zdCBBeGlzQm90dG9tID0gKHsgeFNjYWxlLCBpbm5lckhlaWdodCwgdGlja0Zvcm1hdCwgdGlja09mZnNldCA9IDMgfSkgPT5cbiAgeFNjYWxlLnRpY2tzKCkubWFwKHRpY2tWYWx1ZSA9PiAoXG4gICAgPGdcbiAgICAgIGNsYXNzTmFtZT1cInRpY2tcIlxuICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4U2NhbGUodGlja1ZhbHVlKX0sMClgfVxuICAgID5cbiAgICAgIDxsaW5lIHkyPXtpbm5lckhlaWdodH0gLz5cbiAgICAgIDx0ZXh0IHN0eWxlPXt7IHRleHRBbmNob3I6ICdtaWRkbGUnIH19IGR5PVwiLjcxZW1cIiB5PXtpbm5lckhlaWdodCArIHRpY2tPZmZzZXR9PlxuICAgICAgICB7dGlja0Zvcm1hdCh0aWNrVmFsdWUpfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJleHBvcnQgY29uc3QgQXhpc0xlZnQgPSAoeyB5U2NhbGUsIGlubmVyV2lkdGgsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHlTY2FsZS50aWNrcygpLm1hcCh0aWNrVmFsdWUgPT4gKFxuICAgIDxnIGNsYXNzTmFtZT1cInRpY2tcIiB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMCwke3lTY2FsZSh0aWNrVmFsdWUpfSlgfT5cbiAgICAgIDxsaW5lIHgyPXtpbm5lcldpZHRofSAvPlxuICAgICAgPHRleHRcbiAgICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICAgIHN0eWxlPXt7IHRleHRBbmNob3I6ICdlbmQnIH19XG4gICAgICAgIHg9ey10aWNrT2Zmc2V0fVxuICAgICAgICBkeT1cIi4zMmVtXCJcbiAgICAgID5cbiAgICAgICAge3RpY2tWYWx1ZX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IE1hcmtzID0gKHtcbiAgZGF0YSxcbiAgeFNjYWxlLFxuICB5U2NhbGUsXG4gIHhWYWx1ZSxcbiAgeVZhbHVlLFxuICB0b29sdGlwRm9ybWF0LFxuICBjaXJjbGVSYWRpdXNcbn0pID0+XG4gIGRhdGEubWFwKGQgPT4gKFxuICAgIDxjaXJjbGVcbiAgICAgIGNsYXNzTmFtZT1cIm1hcmtcIlxuICAgICAgY3g9e3hTY2FsZSh4VmFsdWUoZCkpfVxuICAgICAgY3k9e3lTY2FsZSh5VmFsdWUoZCkpfVxuICAgICAgcj17Y2lyY2xlUmFkaXVzfVxuICAgID5cbiAgICAgIDx0aXRsZT57dG9vbHRpcEZvcm1hdCh4VmFsdWUoZCkpfTwvdGl0bGU+XG4gICAgPC9jaXJjbGU+XG4gICkpO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjc3YsIHNjYWxlTGluZWFyLCBtYXgsIGZvcm1hdCwgZXh0ZW50IH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgdXNlRGF0YSB9IGZyb20gJy4vdXNlRGF0YSc7XG5pbXBvcnQgeyBBeGlzQm90dG9tIH0gZnJvbSAnLi9BeGlzQm90dG9tJztcbmltcG9ydCB7IEF4aXNMZWZ0IH0gZnJvbSAnLi9BeGlzTGVmdCc7XG5pbXBvcnQgeyBNYXJrcyB9IGZyb20gJy4vTWFya3MnO1xuXG5jb25zdCB3aWR0aCA9IDk2MDtcbmNvbnN0IGhlaWdodCA9IDUwMDtcbmNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDMwLCBib3R0b206IDY1LCBsZWZ0OiA5MCB9O1xuY29uc3QgeEF4aXNMYWJlbE9mZnNldCA9IDUwO1xuY29uc3QgeUF4aXNMYWJlbE9mZnNldCA9IDQ1O1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB1c2VEYXRhKCk7XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIDxwcmU+TG9hZGluZy4uLjwvcHJlPjtcbiAgfVxuXG4gIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuXG4gIGNvbnN0IHhWYWx1ZSA9IGQgPT4gZC5wZXRhbF9sZW5ndGg7XG4gIGNvbnN0IHhBeGlzTGFiZWwgPSAnUGV0YWwgTGVuZ3RoJztcblxuICBjb25zdCB5VmFsdWUgPSBkID0+IGQuc2VwYWxfd2lkdGg7XG4gIGNvbnN0IHlBeGlzTGFiZWwgPSAnU2VwYWwgV2lkdGgnO1xuXG4gIGNvbnN0IHNpRm9ybWF0ID0gZm9ybWF0KCcuMnMnKTtcbiAgY29uc3QgeEF4aXNUaWNrRm9ybWF0ID0gdGlja1ZhbHVlID0+IHNpRm9ybWF0KHRpY2tWYWx1ZSkucmVwbGFjZSgnRycsICdCJyk7XG5cbiAgY29uc3QgeFNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHhWYWx1ZSkpXG4gICAgLnJhbmdlKFswLCBpbm5lcldpZHRoXSlcbiAgICAubmljZSgpO1xuXG4gIGNvbnN0IHlTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB5VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJIZWlnaHRdKTtcblxuICByZXR1cm4gKFxuICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgfT5cbiAgICAgICAgPEF4aXNCb3R0b21cbiAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICBpbm5lckhlaWdodD17aW5uZXJIZWlnaHR9XG4gICAgICAgICAgdGlja0Zvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgIHRpY2tPZmZzZXQ9ezV9XG4gICAgICAgIC8+XG4gICAgICAgIDx0ZXh0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LXlBeGlzTGFiZWxPZmZzZXR9LCR7aW5uZXJIZWlnaHQgL1xuICAgICAgICAgICAgMn0pIHJvdGF0ZSgtOTApYH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5QXhpc0xhYmVsfVxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDxBeGlzTGVmdCB5U2NhbGU9e3lTY2FsZX0gaW5uZXJXaWR0aD17aW5uZXJXaWR0aH0gdGlja09mZnNldD17NX0gLz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICB4PXtpbm5lcldpZHRoIC8gMn1cbiAgICAgICAgICB5PXtpbm5lckhlaWdodCArIHhBeGlzTGFiZWxPZmZzZXR9XG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eEF4aXNMYWJlbH1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8TWFya3NcbiAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgIHlTY2FsZT17eVNjYWxlfVxuICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAgIHlWYWx1ZT17eVZhbHVlfVxuICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICBjaXJjbGVSYWRpdXM9ezd9XG4gICAgICAgIC8+XG4gICAgICA8L2c+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3RFbGVtZW50KTtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImNzdiIsIlJlYWN0IiwiZm9ybWF0Iiwic2NhbGVMaW5lYXIiLCJleHRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUdBLE1BQU0sTUFBTTtJQUNWLHNIQUFzSCxDQUFDOztBQUV6SCxFQUFPLE1BQU0sT0FBTyxHQUFHLE1BQU07SUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBR0EsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7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