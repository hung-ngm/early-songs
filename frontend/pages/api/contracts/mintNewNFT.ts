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
        const resTx = await tx.wait();

        // Get the tokenId returned from the events
        const [transferEvent] = resTx.events;
        const { newTokenId } = transferEvent.args;
        console.log('New tokenId created: ', newTokenId);
        return newTokenId.toNumber();
    
    } catch (err) {
        console.log(err);
        return -1;
    }
}