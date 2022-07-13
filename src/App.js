import React , { useEffect } from "react";
import {
  Route,
  Switch,
  HashRouter as Router,Redirect
} from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import Scrollbar from "react-perfect-scrollbar";
import { Theme } from "./theme";

import "react-perfect-scrollbar/dist/css/styles.css";
import GlobalCss from "./styles/jss/GlobalCss";

import Landing1 from "./home/Landing1";
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
              <Route path="/" component={Landing1} exact />
            </Switch>
          </Router>
        </Scrollbar>
      </GlobalCss>
    </ThemeProvider>
  );
}

export default App;
