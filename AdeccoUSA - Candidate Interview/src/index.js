import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import Header from "./Components/Header/Header"
import Form from "./Components/Form/Form"
import Success from "./Components/Success/Success"
import NotFound from "./Components/NotFound/NotFound"

ReactDOM.render(
  <main className="main">
    <Header />
    <BrowserRouter>
      <Switch>
        <Route path="/schedule-an-interview/" component={Form} exact />
        <Route path="/success" component={Success} />
        <Route component={NotFound} />
      </Switch>
      {/* <Link to="/">Form</Link> | <Link to="/success">Success</Link> */}
    </BrowserRouter>
  </main>,
  document.getElementById('root')
);