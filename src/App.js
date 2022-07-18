import React , { useEffect } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,Redirect
} from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import Scrollbar from "react-perfect-scrollbar";
import { Theme } from "./theme";

import "react-perfect-scrollbar/dist/css/styles.css";
import GlobalCss from "./styles/jss/GlobalCss";

import Landing1 from "./home/Landing1";
import Register from "./home/Register";
import DepopInfoForm from "./home/DepopInfoForm";
import ChoosePlan from "./home/ChoosePlan";
import Success from "./home/Success";
import ReactGA from 'react-ga';
const TRACKING_ID = process.env.TRACKING_ID ; // OUR_TRACKING_ID
ReactGA.initialize('UA-234432486-1');

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <GlobalCss>
        <Scrollbar
          className="h-full-screen scrollable-content"
          option={{ suppressScrollX: true }}
        >
           <Router basename="/">
            <Switch>
              <Route path="/get-started/info" component={Register} exact />
              <Route path="/get-started/depop" component={DepopInfoForm} exact />
              <Route path="/get-started/plan" component={ChoosePlan}  exact />
              <Route path="/get-started/success" component={Success}  exact />
              <Route path="/" component={Landing1} exact />

            </Switch>
          </Router>
        </Scrollbar>
      </GlobalCss>
    </ThemeProvider>
  );
}

export default App;
