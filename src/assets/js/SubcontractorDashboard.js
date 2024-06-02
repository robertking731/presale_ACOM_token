import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProjectManagementABI from './artifacts/ProjectManagement.json';

function SubcontractorDashboard() {
    const [currentAccount, setCurrentAccount] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [projectManagement, setProjectManagement] = useState(null);
    const [location, setLocation] = useState('');
    const [workTypes, setWorkTypes] = useState('');
    const [availableFrom, setavailableDatefrom] = useState('');
    const [availableTo, setavailableDateto] = useState('');
    const [zok, setZok] = useState('');
    const [liath, setLiath] = useState('');
    const [enteredData, setEnteredData] = useState(null);
    const [matchStatus, setMatchStatus] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        loadWeb3().then(loadBlockchainData);
    }, []);

    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    async function loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentAccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = ProjectManagementABI.networks[networkId];
        if (networkData) {
            const projectManagement = new web3.eth.Contract(ProjectManagementABI.abi, networkData.address);
            setProjectManagement(projectManagement);
            setIsLoading(false);
        } else {
            window.alert('The smart contract is not deployed to the current network');
            setIsLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await projectManagement.methods.addSubcontractorData(currentAccount, availableFrom, availableTo, location, workTypes, zok, liath).send({ from: currentAccount });
            setFeedback('Data submitted successfully!');
            setIsLoading(false);
        } catch (error) {
            console.error('Error submitting data: ', error);
            setFeedback('Failed to submit data. Check console for details.');
            setIsLoading(false);
        }
    }
    async function handleFetchData() {
        setIsLoading(true);
        try {
            const data = await projectManagement.methods.getSubcontractorData(currentAccount).call();
            setEnteredData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setFeedback('Failed to fetch data. Check console for details.');
            setIsLoading(false);
        }
    }
    

    async function handleViewStatus() {
        setIsLoading(true);
        try {
            // Fetch the subcontractor data based on the current account address
            const data = await projectManagement.methods.getSubcontractorData(currentAccount).call();
            // Accessing the data fields correctly according to the structure
            // Assuming 'materialsCostPerSqm' corresponds to what you previously referred to as 'budget'
            const materialsCostPerSqm = parseInt(data.materialsCostPerSqm);
    
            // Compare the 'materialsCostPerSqm' to a threshold value to determine match status
            const status = materialsCostPerSqm > 500 ? 'Matched' : 'Not Matched';
            setMatchStatus(status);
            setIsLoading(false);
        } catch (error) {
            console.error('Error viewing status: ', error);
            setFeedback('Failed to view status. Check console for details.');
            setIsLoading(false);
        }
    }
    
    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Subcontractor Dashboard</h2>
            <p>Ethereum Address: {currentAccount}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Available Date From:
                        <input type="text" value={availableFrom} onChange={(e) => setavailableDatefrom(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Available Date to:
                        <input type="text" value={availableTo} onChange={(e) => setavailableDateto(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </label>
                </div>
                <label>
                        WorkTypes:
                        <input type="text" value={workTypes} onChange={(e) => setWorkTypes(e.target.value)} required />
                    </label>
                    <div>
                    <label>
                    materialsCostPerSqm:
                        <input type="text" value={zok} onChange={(e) => setZok(e.target.value)} required />
                    </label><p>
                    <label>
                    laborCostPerSqm
                        <input type="text" value={liath} onChange={(e) => setLiath(e.target.value)} required />
                    </label></p>
                </div>

                <button type="submit">Submit</button>
            </form>
            <button onClick={handleFetchData}>View Entered Information</button>
            <button onClick={handleViewStatus}>View Status</button>
            {enteredData && (
                <div>
                    <h3>Entered Data:</h3>
                    <p>Date available from: {enteredData[0]}</p>
                    <p>date available to: {enteredData[1]}</p>
                    <p>location: {enteredData[2]}</p>
                    <p>worktypes: {enteredData[3]}</p>
                    <p>materialsCostPerSqm: {enteredData[4]}</p>
                    <p>laborCostPerSqm: {enteredData[5]}</p>
                </div>
            )}
            {matchStatus != null && (
                <div>
                    <h3>Match Status:</h3>
                    <p>{matchStatus.toString()}</p>
                </div>
            )}
            {feedback && <p>{feedback}</p>}
        </div>
    );
}

export default SubcontractorDashboard;

