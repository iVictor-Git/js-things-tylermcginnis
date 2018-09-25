var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

// state
// lifecycle events -> allows to you to hook into specific moments of components
// UI

class App extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
