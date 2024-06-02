import "./App.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
import 'bootstrap/dist/css/bootstrap.min.css';
import abi from "./utils/abi";
import ConnectButton from "../components/ConnectButton";
import TimeInfoCard from "../components/TimeInforCard";
import DePayWidgets from '@depay/widgets';
// import {BASE_ACOM_TOKEN_CONTRACT_ADDRESS, BASE_USDC_ADDRESS, REICEVER_WALLET_ADDRESS} from "./utils/config";
const BASE_RPC_URL = "https://base-sepolia.blockpi.network/v1/rpc/public";
const BASE_ACOM_TOKEN_CONTRACT_ADDRESS = "0xa8618657a6d405e29d745d6b4e50d98f3a46454d";
// const Ganache_TOKEN_CONTRACT_ADDRESS = "0xEfe42df531dC802F03Aa7ae89F8512C71B64A391";

let time;
let web3;
let _web3;

function Home() {
  const [amountToBuy, setAmountToBuy] = useState(0);
  const [tokenPrice, setTokenPrice] = useState();
  const [round, setRound] = useState();
  const [myTokenAmount, setMyTokenAmount] = useState();
  const [mainContract, setMainContract] = useState(null);
  const [timeRemained, setTimeRemained] = useState(1);
  const [daysRemained, setDaysRemained] = useState(0);
  const [hoursRemained, setHoursRemained] = useState(0);
  const [minutesRemained, setMinutesRemained] = useState(0);
  const [secondsRemained, setSecondRemained] = useState(0);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      web3 = new Web3(BASE_RPC_URL);
      _web3 = new Web3(window.ethereum);
      setInterval(dispTime, 1000);
      setMainContract(new web3.eth.Contract(abi, BASE_ACOM_TOKEN_CONTRACT_ADDRESS));
    } else {
      alert('UnInstall Wallet');
    }


  }, [])

  useEffect(() => {
    if (mainContract) {
      mainContract.methods.getTokenPrice().call().then((price) => {
        setTokenPrice(Number(price) / 1000000000);
      });
      // mainContract.methods.getRound().call().then((round) => {
      //   setRound(round)
      // });
      mainContract.methods.calculateRemainingTime().call()
        .then((res) => {
          setTimeRemained(Number(res));
        })
        .catch((err) => console.log(err));
    }
  }, [mainContract]);


  useEffect(() => {
    setDaysRemained(parseInt(Number(timeRemained) / (60 * 60 * 24)));
    setHoursRemained(parseInt((Number(timeRemained) % (60 * 60 * 24)) / (60 * 60)));
    setMinutesRemained(parseInt((Number(timeRemained) % (60 * 60)) / 60));
    setSecondRemained(parseInt(Number(timeRemained) % 60));
  }, [timeRemained]);


  const dispTime = () => {
    setTimeRemained(time => time - 1);
  }

  const connectMetaMaskWallet = async (evt) => {
    evt.preventDefault();
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(res => {
        _web3.eth.getAccounts().then(res => {
          setWalletAddress(res[0]);
        }).catch(err => alert('disconnect wallet'));
      }).catch(err => alert('disconnect wallet'));
    }

  }


  // const getCurrentTokenAmount = async (evt) => {
  //   evt.preventDefault();
  //   let price = await mainContract.methods.getBalance().call();
  //   setCurTokenPrice(price);
  // }

  const buyTokenWithETH = () => {
    if (window.ethereum) {
      if (parseInt(amountToBuy) <= 0 || amountToBuy == null) {
        alert('Invalid Amount Value');
      } else {
        if (walletAddress) {
          mainContract.methods.buyToken((parseInt(amountToBuy))).send({ from: walletAddress })
            .then(res => alert('Success Purchased!!!'))
            .catch(err => { return; })
        } else {
          alert("You have to Connect wallet!");
        }
      }
    }
  }

  const getBalance = (evt) => {
    mainContract.methods.getBalance().call().then(res => {
      alert(res);
    })

  }
  const changeAmount = (evt) => {
    evt.preventDefault();
    setAmountToBuy(evt.target.value);
  }


  return (
    <div className="App">
      <div className="container-fluid">
        <nav className="navbar">
          <div className="container-fluid page-container">
            <h1 className="text-danger">ACOM</h1>
            <div onClick={connectMetaMaskWallet} className="text-white" style={{ cursor: 'pointer' }} >
              MY wallet: {walletAddress}
              <img src="images/howto_1.png" width={50} alt="" />
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-8 text-center p-10">
            <h4 className="text-warning">PreSale Started </h4>
            <div className="row">
              <TimeInfoCard className='col' value={daysRemained} unit={`days`} />
              <TimeInfoCard className='col' value={hoursRemained} unit={`hours`} />
              <TimeInfoCard className='col' value={minutesRemained} unit={`minutes`} />
              <TimeInfoCard className='col' value={secondsRemained} unit={`seconds`} />
            </div>
            <div className="row">
              <p className="text-white m-3">1 ACOM = ${tokenPrice}</p>
            </div>
            <div className="row align-items-center">
              <img className="col-md-3" src='images/howto_22.png' style={{ width: "100px", maxWidth: "100px" }} />
              <input className="col-md-9 p-3" onChange={changeAmount} placeholder="Input token count for presale" />
            </div>
            <button className="col btn btn-primary" onClick={buyTokenWithETH}>Buy now</button>
            <button className="btn btn-danger m-3" onClick={getBalance}>getbalance</button>
          </div>
          <div className="col-md-4">
            <img src="/images/shiba.png" className="rounded-circle" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
