import { ethers } from 'ethers';
import axios from 'axios';
import { earlySongsPlatformAddress } from '../../../utils/addresses';
import EarlySongsPlatform from '../../../abis/EarlySongsPlatform.json';
import SharableSong from '../../../abis/ShareableSong.json';
import { TPlatformItem } from '../../../types/TPlatformItem';

const FANTOM_TESTNET_URL = process.env.NEXT_PUBLIC_FANTOM_TESTNET_URL || ""

export const loadPlatformContracts = async () : Promise<TPlatformItem[]> => {
    const provider = new ethers.providers.JsonRpcProvider(FANTOM_TESTNET_URL);
    const platformContract = new ethers.Contract(
        earlySongsPlatformAddress,
        EarlySongsPlatform.abi,
        provider
    );
    const data = await platformContract.fetchPlatformItems();
    console.log('data', data);
    const items = await Promise.all(data.map(async (i: any) => {
        const songContract = new ethers.Contract(
            i.nftContract,
            SharableSong.abi,
            provider
        );
        
        const metadataUrl = await songContract.getMetadata();
        const wei = ethers.utils.formatUnits(i.mintPrice.toString(), 'wei');
        const metadata = await axios.get(metadataUrl);

        const alreadyMinted = await songContract.getCurrentTokenId();
        const numAlreadyMinted = ethers.utils.formatUnits(alreadyMinted.toString(), 'wei');
        const maxSupply = await songContract.getMaxSupply();
        const numMaxSupply = ethers.utils.formatUnits(maxSupply.toString(), 'wei');
        
        // Metadata should include:
        
        // songUrl: string
        // thumbnailUrl: string

        // songName: string
        // description: string
        // available day: string
        // genres: array of string
        // fileSize: number
  
        const item = {
            itemId: Number(i.itemId),
            nftContract: i.nftContract,
            artist: i.artist,
            mintPrice: (Number(wei)).toString(),
            songUrl: metadata.data.songUrl,
            thumbnailUrl: metadata.data.thumbnailUrl,
            songName: metadata.data.songName,
            description: metadata.data.description,
            availableDay: metadata.data.availableDay,
            genres: metadata.data.genres,
            fileSize: metadata.data.fileSize,
            alreadyMinted: numAlreadyMinted,
            maxSupply: numMaxSupply,
        }
        return item;
    }))

    
    return items;
}