import SessionsPage from './pages/sessionsPage';
import MapPage from './pages/mapPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <main className="idance">
          <Hero  />
          <Router>
        <Switch>
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/" component={SessionsPage} />
          <Route path="*">
            <h2>Nope!</h2>
            <img src="/oops.jpg" width="100" alt='' />
          </Route>
        </Switch>
    </Router>
    <Footer />
    </main>
  );
}

export default App;
