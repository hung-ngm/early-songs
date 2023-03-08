import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TPlatformItem } from '../../types/TPlatformItem';
import { loadSingleContract } from '../../pages/api/contracts/loadSingleContract';

const useSingleContract = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log('router id is', id);
    const [contractItem, setContractItem] = useState<TPlatformItem>();

    const loadItem = async () => {
        if (id) {
            const item = await loadSingleContract(Number(id));
            console.log('item', item);
            setContractItem(item);
        }
    }

    useEffect(() => {
        if (contractItem) {
            return;
        }
        loadItem();
    }, [contractItem])

    return contractItem;
}

export default useSingleContract;