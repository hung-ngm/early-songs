import { ethers } from 'ethers';
import axios from 'axios';
import { earlySongsPlatformAddress } from '../../../utils/addresses';
import EarlySongsPlatform from '../../../abis/EarlySongsPlatform.json';
import SharableSong from '../../../abis/ShareableSong.json';
import { TNFTItem } from '../../../types/TNFTItem';
import { loadSingleContract } from './loadSingleContract';

const FANTOM_TESTNET_URL = process.env.NEXT_PUBLIC_FANTOM_TESTNET_URL || ""

export const loadSingleNFT = async (
    contractId: number,
    nftTokenId: number,
) : Promise<TNFTItem> => {
    const contractItem = await loadSingleContract(contractId);
    const provider = new ethers.providers.JsonRpcProvider(FANTOM_TESTNET_URL);
    const songContract = new ethers.Contract(
        contractItem.nftContract,
        SharableSong.abi,
        provider
    )
    const metadataUrl = await songContract.getMetadata();
    const metadata = await axios.get(metadataUrl);
    const nftItem = {
        tokenId: nftTokenId,
        nftContract: contractItem.nftContract,
        artist: contractItem.artist,
        mintPrice: contractItem.mintPrice,
        songUrl: metadata.data.songUrl,
        thumbnailUrl: metadata.data.thumbnailUrl,
        songName: metadata.data.songName,
        description: metadata.data.description,
        availableDay: metadata.data.availableDay,
        genres: metadata.data.genres,
        contractItemId: contractItem.itemId
    }

    return nftItem;
    
}