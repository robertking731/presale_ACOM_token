import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import { useCSVReader, formatFileSize } from "react-papaparse";
import ProjectManagementABI from "./artifacts/ProjectManagement.json";

function AddProjectEntry() {
    const history = useHistory();
    const [currentAccount, setCurrentAccount] = useState("");
    const [ProjectManagement, setProjectManagement] = useState();
    const [id, setID] = useState('');
    const [workSchedule, setWorkSchedule] = useState('');
    const [location, setLocation] = useState('');
    const [workType, setWorkType] = useState('');
    const [projectData, setProjectData] = useState(null); 
    const [materialUnitCost, setMaterialUnitCost] = useState('');
    const [laborUnitCost, setLaborUnitCost] = useState('');
    const [totalConstructionCost, setTotalConstructionCost] = useState('');
    const { CSVReader } = useCSVReader();

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

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
        if (accounts.length === 0) {
            window.alert("No accounts found. Please ensure you're logged in with MetaMask.");
            return;
        }
        setCurrentAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = ProjectManagementABI.networks[networkId];
        if (networkData) {
            const ProjectManagement = new web3.eth.Contract(ProjectManagementABI.abi, networkData.address);
            setProjectManagement(ProjectManagement);
        } else {
            window.alert('The smart contract is not deployed to the connected network.');
        }
    };

    const createProject = async () => {
        if (!id || !workSchedule || !location || !workType || !materialUnitCost || !laborUnitCost || !totalConstructionCost) {
            alert("Please fill in all the required fields.");
            return;
        }
        await ProjectManagement.methods.addProject(
            id, workSchedule, location, workType, materialUnitCost, laborUnitCost, totalConstructionCost
        ).send({ from: currentAccount });
        alert("Project created successfully!");
        redirectToHome();
    };
    
    const fetchProjectData = async () => {
        const data = await ProjectManagement.methods.fetchProjectData(id).call();
        setProjectData(data);
    };

    const redirectToHome = () => {
        history.push('/');
    };

    if (!ProjectManagement) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <CSVReader
                onUploadAccepted={(results: any) => {
                    console.log(results);                    
                }}
                config={{ worker: true }}
                noDrag
            >
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                    Remove,
                }: any) => (
                    <>
                        <div {...getRootProps()}>
                            {acceptedFile ? (
                                <>
                                    <div className="info-container">
                                        <div>
                                            <p>{acceptedFile.name}</p>
                                            <span>{formatFileSize(acceptedFile.size)}</span>
                                        </div>
                                        <div className="info__progress">
                                            <ProgressBar />
                                        </div>
                                        <div {...getRemoveFileProps()} className="info__remove">
                                            <Remove color={"red"} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <button>Upload CSV File</button>
                            )}
                        </div>
                    </>
                )}
            </CSVReader>
            <input type="number" placeholder="ID" value={id} onChange={(e) => setID(e.target.value)} />
            <input type="text" placeholder="Work Schedule" value={workSchedule} onChange={(e) => setWorkSchedule(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="text" placeholder="Work Type" value={workType} onChange={(e) => setWorkType(e.target.value)} />
            <input type="number" placeholder="Material Unit Cost" value={materialUnitCost} onChange={(e) => setMaterialUnitCost(e.target.value)} />
            <input type="number" placeholder="Labor Unit Cost" value={laborUnitCost} onChange={(e) => setLaborUnitCost(e.target.value)} />
            <input type="number" placeholder="Total Construction Cost" value={totalConstructionCost} onChange={(e) => setTotalConstructionCost(e.target.value)} />
            <button onClick={createProject} disabled={!ProjectManagement}>Create Project</button>
            <button onClick={fetchProjectData} disabled={!ProjectManagement || !id}>Get Entries</button>
            {projectData && (
                <div>
                    <p>Work Schedule: {projectData.workSchedule}</p>
                    <p>Location: {projectData.location}</p>
                    <p>Work Type: {projectData.worktype}</p>
                    <p>Material Unit Cost: {projectData.materialUnitCost}</p>
                    <p>Labor Unit Cost: {projectData.laborUnitCost}</p>
                    <p>Total Construction Cost: {projectData.totalConstructionCost}</p>
                </div>
            )}
        </div>
    );
}

export default AddProjectEntry






