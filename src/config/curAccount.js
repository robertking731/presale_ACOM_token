import web3 from "./web3";

let curAccount;
await web3.eth.getAccounts().then(res => curAccount = res[0]);

export default curAccount;