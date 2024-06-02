// // web3modal-config.js
// import { Web3Modal } from '@web3modal/react';
// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
// import { configureChains, createClient } from 'wagmi';
// import { mainnet, polygon, avalanche } from 'wagmi/chains';

// const chains = [mainnet, polygon, avalanche];

// const { provider } = configureChains(chains, [w3mProvider({ projectId: '6a934de2e5d64f7982264f22981d5f2b' })]);
// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId: '6a934de2e5d64f7982264f22981d5f2b', version: 1, chains }),
//   provider
// });

// export const ethereumClient = new EthereumClient(wagmiClient, chains);
// export const web3Modal = new Web3Modal({
//   projectId: '6a934de2e5d64f7982264f22981d5f2b',
//   ethereumClient
// });
