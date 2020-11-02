import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import InstrumentsList from "./components/instruments-list.component";
import EditInstrument from "./components/edit-instrument.component";
import CreateInstrument from "./components/create-instrument.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
      <Router>
          <Navbar />
          <br/>
          <Route path="/" exact component={InstrumentsList} />
          <Route path="/edit/:id" exact component={EditInstrument} />
          <Route path="/create" exact component={CreateInstrument} />
          <Route path="/user" exact component={CreateUser} />
      </Router>
  );
}

export default App;
