import Login from './components/Login'
import SignUp from './components/SignUp'

import {BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/utils/GlobalStyle';
import { useState } from 'react'
import UserContext from './components/contexts/UserContext'


export default function App() {
  const [ userInformation, setUserInformation ] = useState(null)

  return (
    <UserContext.Provider value={{userInformation, setUserInformation}}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact >
            <Login/>
          </Route>
          <Route path="/sign-up" exact >
            <SignUp/>
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

