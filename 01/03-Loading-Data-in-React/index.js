import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';
import { message } from './message';

const csvUrl =
  'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  return <pre>{data ? message(data) : 'Loading...'}</pre>;
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
