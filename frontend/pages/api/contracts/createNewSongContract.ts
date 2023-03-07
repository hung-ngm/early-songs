import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { earlySongsPlatformAddress } from '../../../utils/addresses';
import ShareableSong from '../../../abis/ShareableSong.json';

export const createNewSongContract = async (
    metadata: string,
    timestamp: number,
    maxSupply: number,
) : Promise<string> => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const factory = new ethers.ContractFactory(
            ShareableSong.abi,
            ShareableSong.bytecode,
            signer
        );

        // Deploy the contract for the new released song
        const songContract = await factory.deploy(
            metadata,
            timestamp,
            maxSupply,
            earlySongsPlatformAddress
        )
        await songContract.deployed();
        console.log('Song contract deployed to address', songContract.address);

        return songContract.address;

    } catch (err) {
        console.log(err);
        return "";
    }

}