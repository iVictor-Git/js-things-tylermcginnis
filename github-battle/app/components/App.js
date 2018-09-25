var React = require('react');
var Popular = require('./Popular');

class App extends React.Component {
  render() {
    return (
      <main className='container'>
        <Popular />
      </main>
    );
  }
}

module.exports = App;
