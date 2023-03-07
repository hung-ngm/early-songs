import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { earlySongsPlatformAddress } from '../../../utils/addresses';
import EarlySongsPlatform from '../../../abis/EarlySongsPlatform.json';

export const listSongContract = async (
    nftContract: string,
    mintPrice: number
): Promise<boolean> => {
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

        const tx = await earlySongsPlatform.createPlatformItem(
            nftContract,
            mintPrice,
            {
                gasLimit: 20000000,
                gasPrice: ethers.utils.parseUnits("50", "gwei"),
                value: ethers.utils.parseEther("0.001"),
            }
        )
        const res = await tx.wait();
        console.log('res is', res);
        
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }

}