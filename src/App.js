import SessionsPage from './pages/sessionsPage';
import MapPage from './pages/mapPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <main className="idance">
          <Router>
        <Switch>
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/" component={SessionsPage} />
          <Route path="*">
            <h2>Nope!</h2>
            <img src="/oops.jpg" width="100" />
          </Route>
        </Switch>
    </Router>
    </main>
  );
}

export default App;
