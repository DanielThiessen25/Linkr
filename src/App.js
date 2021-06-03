import Login from './components/Login'
import SignUp from './components/SignUp'
import Timeline from './components/Timeline'
import MyPosts from './components/MyPosts'
import MyLikes from './components/MyLikes'


import {BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/utils/GlobalStyle';
import { useState } from 'react'
import UserContext from './components/contexts/UserContext'

export default function App() {
  const [ userInformation, setUserInformation ] = useState(null)
  const [ showMenu, setShowMenu ] = useState(false)

  return (
    <UserContext.Provider value={{userInformation, setUserInformation, showMenu, setShowMenu}}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact >
            <Login/>
          </Route>
          <Route path="/sign-up" exact >
            <SignUp/>
          </Route>
          <Route path="/timeline" exact >
            <Timeline/>
          </Route>
          <Route path="/my-posts" exact={true}>
            <MyPosts/>
          </Route>
          <Route path="/my-likes" exact={true}>
            <MyLikes/>
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

