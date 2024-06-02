import React from 'react';
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();

    const redirectToRegisterEntry = () => {
        history.push('/add-project-entry');
    };

    const redirectToManageEntries = () => {
        history.push('/manage-users');
    };

    const redirectToSubDashboard = () => {
        history.push('/subcontractor-dashboard');
    };

    // Adding redirection to the Matching dashboard
    const redirectToMatching = () => {
        history.push('/matching');
    };

    return (
        <div>
            <h3>Subcontractor Project Management</h3>
            <br />
            <h5>GC: Register a new project entry</h5>
            <button onClick={redirectToRegisterEntry} className="btn btn-outline-primary btn-sm">Register Entry</button>
            <br />
            <h5>Manage Users</h5>
            <button onClick={redirectToManageEntries} className="btn btn-outline-primary btn-sm">Manage Users</button>
            <br />
            <h5>Subcontractor Dashboard</h5>
            <button onClick={redirectToSubDashboard} className="btn btn-outline-primary btn-sm">Sub Dashboard</button>
            <br />
            <h5>Matching Dashboard</h5>
            <button onClick={redirectToMatching} className="btn btn-outline-primary btn-sm">Matching Dashboard</button>
        </div>
    );
}

export default Home;
