import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProjectManagementABI from './artifacts/ProjectManagement.json';

function Matching() {
    const [currentAccount, setCurrentAccount] = useState('');
    const [matches, setMatches] = useState([]);
    const [subContractors, setSubContractors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [projectId, setProjectId] = useState(1); // default project ID or could be set by user input

    useEffect(() => {
        loadWeb3().then(() => {
            loadSubContractors();
            loadMatches();
        });
    }, [projectId]); // Re-load matches when projectId changes

    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    async function loadSubContractors() {
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const networkData = ProjectManagementABI.networks[networkId];
        if (networkData) {
            const projectManagement = new web3.eth.Contract(ProjectManagementABI.abi, networkData.address);
            const count = await projectManagement.methods.subConCount().call();
            const subcontractors = {};
            for (let i = 1; i <= count; i++) {
                const contractor = await projectManagement.methods.subContractors(i).call();
                subcontractors[contractor.id] = contractor;
            }
            setSubContractors(subcontractors);
        }
    }

    async function loadMatches() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = ProjectManagementABI.networks[networkId];
        if (networkData) {
            const projectManagement = new web3.eth.Contract(ProjectManagementABI.abi, networkData.address);
            const subcontractorMatches = await projectManagement.methods.findMatchingSubcontractors(projectId).call({ from: currentAccount });
            const detailedMatches = subcontractorMatches.map(id => ({
                ...subContractors[id],
                account: subContractors[id].account,
            }));
            setMatches(detailedMatches);
        } else {
            alert('The smart contract is not deployed to the current network');
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return <div>Loading matches...</div>;
    }

    return (
        <div>
            <h2>Matching Subcontractors for Project ID: {projectId}</h2>
            {matches.length > 0 ? (
                <ul>
                    {matches.map((match, index) => (
                        <li key={index}>
                            {match.name} ({match.account})
                        </li>
                    ))}
                </ul>
            ) : <p>No matches found.</p>}
        </div>
    );
}

export default Matching;
