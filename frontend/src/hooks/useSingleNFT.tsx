import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TNFTItem } from '../../types/TNFTItem';
import { loadSingleNFT } from '../../pages/api/contracts/loadSingleNFT';


const useSingleNFT = () => {
    const router = useRouter();
    const { id, nftId } = router.query;
    console.log('router id is', id);
    console.log('nftId is', nftId);
    const [NFTItem, setNFTItem] = useState<TNFTItem>();

    const loadItem = async () => {
        if (id) {
            const item = await loadSingleNFT(Number(id), Number(nftId));
            console.log('item', item);
            setNFTItem(item);
        }
    }

    useEffect(() => {
        if (NFTItem) {
            return;
        }
        loadItem();
    }, [NFTItem])

    return NFTItem;
}

export default useSingleNFT;