import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MainPage, RejectPage, FaultPage, SuccessPage } from "./pages";
import CircularPercentLoader from "./components/CircularPercentLoader";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/success/:businessKey"
          component={(props: any) => (
            <SuccessPage businessKey={props.match.params.businessKey} />
          )}
        />
        <Route
          path="/reject/:businessKey"
          component={(props: any) => (
            <RejectPage businessKey={props.match.params.businessKey} />
          )}
        />
        <Route
          path="/fault/:businessKey"
          component={(props: any) => (
            <FaultPage businessKey={props.match.params.businessKey} />
          )}
        />
        <Route
          path="/loader/:businessKey"
          component={(props: any) => (
            <CircularPercentLoader
              frequency={6000}
              frequencyCheckStatus={15000}
              businesskey={props.match.params.businessKey}
            />
          )}
        />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
