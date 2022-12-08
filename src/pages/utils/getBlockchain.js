import {ethers,Contract} from 'ethers';
import Voting from './Voting.json';
import detectEthereumProvider from '@metamask/detect-provider';

const GetBlockchain = () => {
    new Promise( async (resolve,reject) => {
        let provider = await detectEthereumProvider();
        if(provider) {
            await provider.request({methos:'eth_requestAccounts'});
            const networkId = await provider.request({method:'net_version'});
            provider = new ethers.providers.Web3Provider(provider);
            const signer = provider.getSigner();
            const simpleStorage = new Contract(
                Voting.networks[networkId].address,
                Voting.abi,
                signer
            );
            resolve({simpleStorage});
                return;
        }
        reject('Install Metamask');
    });
}

export default GetBlockchain
