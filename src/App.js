import {BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './components/utils/GlobalStyle';
import TimeLine from './components/TimeLine/TimeLine';

export default function App() {
  return (
   <BrowserRouter>
    <GlobalStyle/>
   
    <Switch>
      <Route path="/timeline" exact>
        <TimeLine/>
      </Route>
    </Switch>
   </BrowserRouter>
  );
}
