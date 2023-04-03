import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Singup from './pages/signup/Singup';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
              <Home />
          </Route>  
          <Route path="/login">
              <Login />
          </Route>  
          <Route path="/signup">
              <Singup />
          </Route>  
        </Switch>
      
    </div>
  );
}

export default App;