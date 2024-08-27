import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Lending from "../components/Lending";
import Borrowing from "../components/Borrowing";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/lending" component={Lending} />
        <Route path="/borrowing" component={Borrowing} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
