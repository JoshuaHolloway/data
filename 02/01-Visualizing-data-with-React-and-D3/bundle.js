(function (React,ReactDOM,d3) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv';

  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  const pieArc = d3.arc()
    .innerRadius(0)
    .outerRadius(width);

  const App = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      d3.csv(csvUrl).then(setData);
    }, []);

    if (!data) {
      return React__default.createElement( 'pre', null, "Loading..." );
    }

    const colorPie = d3.pie().value(1);

    return (
      React__default.createElement( 'svg', { width: width, height: height },
        React__default.createElement( 'g', { transform: `translate(${centerX},${centerY})` },
          colorPie(data).map(d => (
            React__default.createElement( 'path', { fill: d.data['RGB hex value'], d: pieArc(d) })
          ))
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React__default.createElement( App, null ), rootElement);

  // To compute the arcs manually (without d3.pie):
  // data.map((d, i) => (
  //   <path
  //     fill={d['RGB hex value']}
  //     d={pieArc({
  //       startAngle: (i / data.length) * 2 * Math.PI,
  //       endAngle: ((i + 1) / data.length) * 2 * Math.PI
  //     })}
  //   />
  // ))

}(React,ReactDOM,d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgY3N2LCBhcmMsIHBpZSB9IGZyb20gJ2QzJztcblxuY29uc3QgY3N2VXJsID1cbiAgJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vY3VycmFuL2IyMzY5OTAwODFhMjQ3NjFmNzAwMDU2NzA5NDkxNGUwL3Jhdy9jc3NOYW1lZENvbG9ycy5jc3YnO1xuXG5jb25zdCB3aWR0aCA9IDk2MDtcbmNvbnN0IGhlaWdodCA9IDUwMDtcbmNvbnN0IGNlbnRlclggPSB3aWR0aCAvIDI7XG5jb25zdCBjZW50ZXJZID0gaGVpZ2h0IC8gMjtcblxuY29uc3QgcGllQXJjID0gYXJjKClcbiAgLmlubmVyUmFkaXVzKDApXG4gIC5vdXRlclJhZGl1cyh3aWR0aCk7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjc3YoY3N2VXJsKS50aGVuKHNldERhdGEpO1xuICB9LCBbXSk7XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIDxwcmU+TG9hZGluZy4uLjwvcHJlPjtcbiAgfVxuXG4gIGNvbnN0IGNvbG9yUGllID0gcGllKCkudmFsdWUoMSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7Y2VudGVyWH0sJHtjZW50ZXJZfSlgfT5cbiAgICAgICAge2NvbG9yUGllKGRhdGEpLm1hcChkID0+IChcbiAgICAgICAgICA8cGF0aCBmaWxsPXtkLmRhdGFbJ1JHQiBoZXggdmFsdWUnXX0gZD17cGllQXJjKGQpfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvZz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgcm9vdEVsZW1lbnQpO1xuXG4vLyBUbyBjb21wdXRlIHRoZSBhcmNzIG1hbnVhbGx5ICh3aXRob3V0IGQzLnBpZSk6XG4vLyBkYXRhLm1hcCgoZCwgaSkgPT4gKFxuLy8gICA8cGF0aFxuLy8gICAgIGZpbGw9e2RbJ1JHQiBoZXggdmFsdWUnXX1cbi8vICAgICBkPXtwaWVBcmMoe1xuLy8gICAgICAgc3RhcnRBbmdsZTogKGkgLyBkYXRhLmxlbmd0aCkgKiAyICogTWF0aC5QSSxcbi8vICAgICAgIGVuZEFuZ2xlOiAoKGkgKyAxKSAvIGRhdGEubGVuZ3RoKSAqIDIgKiBNYXRoLlBJXG4vLyAgICAgfSl9XG4vLyAgIC8+XG4vLyApKVxuIl0sIm5hbWVzIjpbImFyYyIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiY3N2IiwiUmVhY3QiLCJwaWUiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUlBLE1BQU0sTUFBTTtJQUNWLG1HQUFtRyxDQUFDOztFQUV0RyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7RUFDbEIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0VBQ25CLE1BQU0sT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDMUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQzs7RUFFM0IsTUFBTSxNQUFNLEdBQUdBLE1BQUcsRUFBRTtLQUNqQixXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQ2QsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztFQUV0QixNQUFNLEdBQUcsR0FBRyxNQUFNO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFFdkNDLGVBQVMsQ0FBQyxNQUFNO01BQ2RDLE1BQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0IsRUFBRSxFQUFFLENBQUMsQ0FBQzs7SUFFUCxJQUFJLENBQUMsSUFBSSxFQUFFO01BQ1QsT0FBT0MsMkNBQUssWUFBVSxFQUFNLENBQUM7S0FDOUI7O0lBRUQsTUFBTSxRQUFRLEdBQUdDLE1BQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFaEM7TUFDRUQsdUNBQUssT0FBTyxLQUFLLEVBQUUsUUFBUSxNQUFNO1FBQy9CQSxxQ0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztVQUM5QyxRQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkJBLHdDQUFNLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUUsRUFBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFHO1dBQ3RELENBQUM7U0FDQTtPQUNBO01BQ047R0FDSCxDQUFDO0VBQ0YsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNwRCxRQUFRLENBQUMsTUFBTSxDQUFDQSw4QkFBQyxTQUFHLEVBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OyJ9