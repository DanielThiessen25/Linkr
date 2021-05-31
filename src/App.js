import {BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/utils/GlobalStyle';
import MyPosts from "./components/MyPosts.js";
import Header from "./components/utils/Header";


export default function App() {
  return (
   <BrowserRouter>
    <GlobalStyle/>
    <Header></Header>
    <Switch>
      <Route path="/myposts" exact={true} component={MyPosts} />
    </Switch>
   </BrowserRouter>
  );
}
