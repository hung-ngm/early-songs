import { ethers } from 'ethers';
import SharableSong from '../../../abis/ShareableSong.json';
import { loadPlatformContracts } from './loadPlatformContracts';
import { TNFTItem } from '../../../types/TNFTItem';

export const loadUserNFTs = async (
    address: string
) : Promise<TNFTItem[]> => {
    const provider = new ethers.providers.JsonRpcProvider("https://fantom-testnet.public.blastapi.io");
    const platformContracts = await loadPlatformContracts();
    
    // Convert platformContracts to json array
    const platformContractsJson = JSON.parse(JSON.stringify(platformContracts));
    
    const myNFTs: TNFTItem[] = []

    // Loop through all platform contracts
    for (let i = 0; i < platformContractsJson.length; i++) {
        const songContract = new ethers.Contract(
            platformContractsJson[i].nftContract,
            SharableSong.abi,
            provider
        );
        const numTokens = await songContract.getCurrentTokenId();
        for (let j = 0; j < numTokens; j++) {
            const owner = await songContract.ownerOf(j);
            if (owner.toLowerCase() === address.toLowerCase()) {
                const nft = {
                    tokenId: j,
                    nftContract: platformContractsJson[i].nftContract,
                    artist: platformContractsJson[i].artist,
                    mintPrice: platformContractsJson[i].mintPrice,
                    songUrl: platformContractsJson[i].songUrl,
                    thumbnailUrl: platformContractsJson[i].thumbnailUrl,
                    songName: platformContractsJson[i].songName,
                    description: platformContractsJson[i].description,
                    availableDay: platformContractsJson[i].availableDay,
                    genres: platformContractsJson[i].genres,
                }
                myNFTs.push(nft);
            }
        }
    }
    return myNFTs;
    
}