import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { earlySongsPlatformAddress } from '../../../utils/addresses';
import EarlySongsPlatform from '../../../abis/EarlySongsPlatform.json';

export const mintNewNFT = async (
    itemId: number
): Promise<number> => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const earlySongsPlatform = new ethers.Contract(
            earlySongsPlatformAddress,
            EarlySongsPlatform.abi,
            signer
        )

        const tx = await earlySongsPlatform.mintNewNFT(itemId);
        const receipt = await tx.wait();
        
        console.log('receipt', receipt);
        return 1;
    
    } catch (err) {
        console.log(err);
        return -1;
    }
}