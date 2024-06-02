const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "addGeneralContractor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_workSchedulefrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_workScheduleto",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_worktype",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_materialUnitCost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_laborUnitCost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalquantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalConstructionCost",
				"type": "uint256"
			}
		],
		"name": "addProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "addSubContractor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_subcontractorAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_availableFrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_availableTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_worktypeSub",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_materialsCostPerSqm",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_laborCostPerSqm",
				"type": "uint256"
			}
		],
		"name": "addSubcontractorData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_subcontractorAddress",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_conformityToCost",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_conformityToTime",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_conformityToQuality",
				"type": "uint8"
			}
		],
		"name": "setTrustFactor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "ProjectAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "subcontractorAddress",
				"type": "address"
			}
		],
		"name": "calculateTrustFactor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "fetchProjectData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "workSchedulefrom",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "workScheduleto",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "worktype",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "materialUnitCost",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "laborUnitCost",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalquantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalConstructionCost",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectManagement.Project",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "findMatchingSubcontractors",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "genConCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "generalContractors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "getSortedMatchesWithGC",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_subcontractorAddress",
				"type": "address"
			}
		],
		"name": "getSubcontractorData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "availableFrom",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "availableTo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "worktypesub",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "materialsCostPerSqm",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "laborCostPerSqm",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectManagement.SubcontractorData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "projectCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "workSchedulefrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "workScheduleto",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "worktype",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "materialUnitCost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "laborUnitCost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalquantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalConstructionCost",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subConCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "subcontractorData",
		"outputs": [
			{
				"internalType": "string",
				"name": "availableFrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "availableTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "worktypesub",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "materialsCostPerSqm",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "laborCostPerSqm",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "subContractors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "trustFactors",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "conformityToCost",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "conformityToTime",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "conformityToQuality",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default ABI;