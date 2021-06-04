import { AuthProvider } from "./firebase/AuthContext";
import Welcome from './login_components/Welcome';
import Home from './general_components/Home'
import { HashRouter, Route, Redirect } from "react-router-dom";
import TopBar from './general_components/TopBar';
import CrosswordWrapper from './general_components/CrosswordWrapper';
import AuthRoute from "./general_components/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <TopBar></TopBar>
        
        <Route exact path="/">
          <Redirect to="login"></Redirect>
        </Route>

        <Route path="/login">
          <Welcome />
        </Route>

        <AuthRoute
          path="/home"
          component={Home}
        ></AuthRoute>

        <AuthRoute 
          path="/play"
          component={CrosswordWrapper}
        ></AuthRoute>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
