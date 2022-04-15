import sessionsPage from './pages/sessionsPage';
import mapPage from './pages/mapPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <main className="idance">
          <Router>
        <Switch>
          <Route exact path="/map" component={mapPage} />
          <Route exact path="/" component={sessionsPage} />
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
