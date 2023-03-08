import { useState, useEffect } from 'react';
import { loadPlatformContracts } from '../../pages/api/contracts/loadPlatformContracts';
import { TPlatformItem } from '../../types/TPlatformItem';

const usePlatformContracts = () => {
    const [platformItems, setPlatformItems] = useState<any[]>();

    const loadPlatformItems = async () => {
        const items = await loadPlatformContracts();
        console.log('items', items);
        setPlatformItems(items);
    }

    useEffect(() => {
        if (platformItems) {
            return;
        }
        loadPlatformItems();
    }, [platformItems])

    return platformItems;
}

export default usePlatformContracts;