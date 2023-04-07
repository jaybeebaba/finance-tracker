import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Singup';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext()
  return (

    <div className="App">
      {
        authIsReady && (
          <>
            <Navbar />
            <Switch>
              <Route path="/" exact>
                {!user ? <Redirect to="/login"/> : <Home />}
              </Route>
              <Route path="/login">
                {user ? <Redirect to="/"/> : <Login />}
              </Route>
              <Route path="/signup">
                {user ? <Redirect to="/"/> : <Signup />}
              </Route>
            </Switch>
          </>
        )
      }


    </div>
  );
}

export default App;