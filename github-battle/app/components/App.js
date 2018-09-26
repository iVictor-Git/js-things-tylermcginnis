var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');

class App extends React.Component {
  render() {
    return (
      <Router>
        <main className="container">
          <Nav />
          <Route path="/popular" component={Popular} />
        </main>
      </Router>
    );
  }
}

module.exports = App;
