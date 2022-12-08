import React,{useEffect,useState} from "react";
import { ethers } from 'ethers';

import {contractABI,contractAddress} from '../utils/constants';
import Voting from '../utils/Voting.json';
import web3 from 'web3';

export const VotingContext = React.createContext();

const {ethereum} = window;

export const VotingProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('');

    const checkIfWalletConnect = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
    console.log(accounts);
    if(accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);
    
            }else {
                console.log("No accounts found");
            } 
        } catch (error) {
            console.log(error);
        }

    };

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch(error){
            console.log(error);

            throw new Error("No ethereum object.")
        }
    };
    const handleVote = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts",[]);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        await contract.vote(data.get("voteTo"));
      };

    const handleAddCandidate = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts",[]);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        const candidateName = data.get("candidatename");
        const candidateName_bytes32 = web3.utils.asciiToHex(candidateName)
        await contract.add_candidate(data.get(candidateName_bytes32));
      };

      const handlesubmit = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts",[]);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        const address = await contract.commissioner();
        console.log(address);
      }
    

    useEffect(() => {
        checkIfWalletConnect();
    },[]);

    return(
        <VotingContext.Provider value={{connectWallet,currentAccount,contractABI,handleVote,handleAddCandidate,handlesubmit}}>
            {children}
        </VotingContext.Provider>
    );
}