import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { loadSingleContract } from './loadSingleContract';
import SharableSong from '../../../abis/ShareableSong.json';


export const shareNFT = async (
    itemId: number,
    nftTokenId: number,
    addressSharedWith: string,
): Promise<number> => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contractItem = await loadSingleContract(itemId);
        const songContract = new ethers.Contract(
            contractItem.nftContract,
            SharableSong.abi,
            signer
        )

        const tx = await songContract.share(addressSharedWith, nftTokenId);
        const receipt = await tx.wait();
        console.log('receipt', receipt);
        return 1;
    
    } catch (err) {
        console.log(err);
        return -1;
    }
}