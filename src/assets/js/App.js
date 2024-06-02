import React from 'react';
import './App.css';
import ManageUsers from './ManageUsers'; 
import Home from './Home';  
import AddProjectEntry from './AddProjectEntry'; 
import SubcontractorDashboard from './SubcontractorDashboard';
import Matching from './Matching'; // Import the Matching component
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/manage-users" component={ManageUsers} />
          <Route path="/add-project-entry" component={AddProjectEntry} />
          <Route path="/subcontractor-dashboard" component={SubcontractorDashboard} />
          <Route path="/matching" component={Matching} /> {/* New route for Matching */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
