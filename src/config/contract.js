import React from "react";
import ABI from "./abi";
import web3 from "./web3";

const contractAddress = '0x9089d70CE8F244066eC9CDF67130FDC53a370A76';
const mainContract = new web3.eth.Contract(ABI, contractAddress);

export default mainContract;