import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./theme";
import Chat from "./components/Chat";
import Join from "./components/Join";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Route path='/' exact component={Join} />
        <Route path='/chat' component={Chat} />
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
