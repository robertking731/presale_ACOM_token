// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { web3Modal } from '../config/index';

// function ConnectButton() {
//   // const [provider, setProvider] = useState(null);
//   const [account, setAccount] = useState('');

//   // const connectWallet = async () => {
//   //   try {
//   //     const instance = await web3Modal.openModal();
//   //     const web3Provider = new ethers.providers.Web3Provider(instance);
//   //     setProvider(web3Provider);
//   //     const accounts = await web3Provider.listAccounts();
//   //     setAccount(accounts[0]);
//   //   } catch (error) {
//   //     console.error('Failed to connect wallet:', error);
//   //   }
//   // };

//   // const disconnectWallet = async () => {
//   //   if (provider && provider.provider && provider.provider.disconnect) {
//   //     await provider.provider.disconnect();
//   //   }
//   //   setProvider(null);
//   //   setAccount(null);
//   //   web3Modal.closeModal();
//   // };

//   return (
//       account ? (
//           <button className="btn btn-primary" onClick={disconnectWallet}>Disconnect Wallet</button>
//       ) : (
//         <button className="btn btn-primary" onClick={connectWallet}>Connect Wallet</button>
//       )
//   );
// }

// export default ConnectButton;
