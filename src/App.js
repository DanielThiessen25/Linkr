import Login from './components/Login'
import SignUp from './components/SignUp'
import Timeline from './components/Timeline'
import MyPosts from './components/MyPosts'

import {BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/utils/GlobalStyle';
import { useState } from 'react'
import UserContext from './components/contexts/UserContext'
import HashtagPage from './components/Hashtags/HashtagPage';

export default function App() {
  const [ userInformation, setUserInformation ] = useState(null)
  const [ showMenu, setShowMenu ] = useState(false)
  const [followingUsers, setFollowingUsers] = useState([]);

  return (
    <UserContext.Provider value={{userInformation, setUserInformation, showMenu, setShowMenu, followingUsers, setFollowingUsers}}>
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
          <Route path="/hashtag/:hashtag" exact>
            <HashtagPage/>
          </Route>
          <Route path="/my-posts" exact={true}>
            <MyPosts/>
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

