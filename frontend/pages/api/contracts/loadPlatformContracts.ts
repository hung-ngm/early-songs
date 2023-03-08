import { ethers } from 'ethers';
import axios from 'axios';
import { earlySongsPlatformAddress } from '../../../utils/addresses';
import EarlySongsPlatform from '../../../abis/EarlySongsPlatform.json';
import SharableSong from '../../../abis/ShareableSong.json';
import { TPlatformItem } from '../../../types/TPlatformItem';

export const loadPlatformContracts = async () : Promise<TPlatformItem[]> => {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.fantom.network");
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
        }
        return item;
    }))

    
    return items;
}