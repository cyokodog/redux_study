// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import DiseContainer from './pages/dise/Container';

// ReactDOM.render(<DiseContainer />, document.getElementById('root'));




// import React from 'react';
// import ReactDOM from 'react-dom';
// import DiseContainer from './pages/dise/';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from './pages/dise/reducers';

// const store = createStore(reducer);

// ReactDOM.render(
//   <Provider store={ store }>
//     <DiseContainer />
//   </Provider>,
//   document.getElementById('root')
// );




import thunk from 'redux-thunk'
import React from 'react';
import ReactDOM from 'react-dom';
import DiseContainer from './pages/dise/';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './pages/dise/reducers';

// const store = createStore(reducer);
const store = createStore(reducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={ store }>
    <DiseContainer />
  </Provider>,
  document.getElementById('root')
);
