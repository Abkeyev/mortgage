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
          path="/success/:processInstanceId"
          component={(props: any) => (
            <SuccessPage
              processInstanceId={props.match.params.processInstanceId}
            />
          )}
        />
        <Route
          path="/reject/:processInstanceId"
          component={(props: any) => (
            <RejectPage
              processInstanceId={props.match.params.processInstanceId}
            />
          )}
        />
        <Route
          path="/fault/:processInstanceId"
          component={(props: any) => (
            <FaultPage
              processInstanceId={props.match.params.processInstanceId}
            />
          )}
        />
        <Route
          path="/loader/:processInstanceId"
          component={(props: any) => (
            <CircularPercentLoader
              frequency={6000}
              frequencyCheckStatus={15000}
              processInstanceId={props.match.params.processInstanceId}
            />
          )}
        />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
