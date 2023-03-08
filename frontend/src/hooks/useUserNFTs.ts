import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TNFTItem } from '../../types/TNFTItem';
import { loadUserNFTs } from '../../pages/api/contracts/loadUserNFTs';

const useUserNFTs = () => {
    const router = useRouter();
    const { address } = router.query;
    console.log('router address is', address);
    const [userNFTs, setUserNFTs] = useState<TNFTItem[]>();

    const loadNFTs = async () => {
        if (address) {
            const items = await loadUserNFTs(address as string);
            console.log('items', items);
            setUserNFTs(items);
        }
    }

    useEffect(() => {
        if (userNFTs) {
            return;
        }
        loadNFTs();
    }, [userNFTs])

    return userNFTs;
}

export default useUserNFTs;