import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import ProjectManagementABI from "./artifacts/ProjectManagement.json";
import { useHistory } from "react-router-dom";


const OWNER_ADDRESS = "0xBaE58D3Df9CA2A604EAfD0DE37497cfc8472f571";


function AssignRoles() {
    const history = useHistory();
    const [currentAccount, setCurrentAccount] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

    
    const [loader, setLoader] = useState(true);
    const [ProjectManagement, setProjectManagement] = useState();
    const [genConName, setGenConName] = useState("");
    const [subConName, setSubConName] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [genConAddress, setGenConAddress] = useState("");
    const [subConAddress, setSubConAddress] = useState("");
    const [supplierAddress, setSupplierAddress] = useState("");
    const [classifiedUsers, setClassifiedUsers] = useState({
        subcontractors: [],
        suppliers: [],
        generalContractors: []
    });

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
        setIsAuthorized(accounts[0].toLowerCase() === OWNER_ADDRESS.toLowerCase());
        const networkId = await web3.eth.net.getId();
        const networkData = ProjectManagementABI.networks[networkId];
        if (networkData) {
            const projectManagement = new web3.eth.Contract(ProjectManagementABI.abi, networkData.address);
            setProjectManagement(projectManagement);
            setLoader(false);
        } else {
            window.alert('The smart contract is not deployed to the current network');
        }
    };
    
    if (!isAuthorized) {
        return <div>You are not authorized to view this page.</div>;
    }

    const handleAddGeneralContractor = async (event) => {
        event.preventDefault();
        try {
            await ProjectManagement.methods.addGeneralContractor(genConName, genConAddress).send({ from: currentAccount });
        } catch (error) {
            console.error("Error adding general contractor: ", error);
        }
    };

    const handleAddSubContractor = async (event) => {
        event.preventDefault();
        try {
            await ProjectManagement.methods.addSubContractor(subConName, subConAddress).send({ from: currentAccount });
        } catch (error) {
            console.error("Error adding subcontractor: ", error);
        }
    };

    const handleAddSupplier = async (event) => {
        event.preventDefault();
        try {
            await ProjectManagement.methods.addSupplier(supplierName, supplierAddress).send({ from: currentAccount });
        } catch (error) {
            console.error("Error adding supplier: ", error);
        }
    };

    const classifyUsers = async () => {
        setLoader(true);
        const subcontractors = await Promise.all(
            Array(parseInt(await ProjectManagement.methods.subConCount().call()))
                .fill()
                .map((element, index) => ProjectManagement.methods.subContractors(index + 1).call())
        );

        const suppliers = await Promise.all(
            Array(parseInt(await ProjectManagement.methods.supplierCount().call()))
                .fill()
                .map((element, index) => ProjectManagement.methods.suppliers(index + 1).call())
        );

        const generalContractors = await Promise.all(
            Array(parseInt(await ProjectManagement.methods.genConCount().call()))
                .fill()
                .map((element, index) => ProjectManagement.methods.generalContractors(index + 1).call())
        );

        setClassifiedUsers({ subcontractors, suppliers, generalContractors });
        setLoader(false);
    };

    return (
        <div className="assign-roles">
            <div className="current-account">
                <span><b>Current Account Address:</b> {currentAccount}</span>
                <button onClick={() => history.push('/')} className="btn btn-outline-danger btn-sm">HOME</button>
            </div>

            <div className="add-general-contractor">
                <h4>General Contractors:</h4>
                <form onSubmit={handleAddGeneralContractor}>
                    <input type="text" placeholder="Name" value={genConName} onChange={(e) => setGenConName(e.target.value)} required />
                    <input type="text" placeholder="Address" value={genConAddress} onChange={(e) => setGenConAddress(e.target.value)} required />
                    <button type="submit">Add General Contractor</button>
                </form>
            </div>

            <div className="add-subcontractor">
                <h4>Subcontractors:</h4>
                <form onSubmit={handleAddSubContractor}>
                    <input type="text" placeholder="Name" value={subConName} onChange={(e) => setSubConName(e.target.value)} required />
                    <input type="text" placeholder="Address" value={subConAddress} onChange={(e) => setSubConAddress(e.target.value)} required />
                    <button type="submit">Add Subcontractor</button>
                </form>
            </div>

            <div className="classify-display-users">
                <button onClick={classifyUsers} className="btn btn-outline-primary btn-sm">Classify and Display Users</button>
                {!loader && (
                    <div className="classified-users">
                        <div className="subcontractors">
                            <h3>Subcontractors</h3>
                            <ul>
                                {classifiedUsers.subcontractors.map((sub, index) => (
                                    <li key={index}>{sub.name} - {sub.account}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="general-contractors">
                            <h3>General Contractors</h3>
                            <ul>
                                {classifiedUsers.generalContractors.map((gen, index) => (
                                    <li key={index}>{gen.name} - {gen.account}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AssignRoles;

