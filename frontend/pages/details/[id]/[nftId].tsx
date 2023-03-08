import type { NextPage } from 'next'
import { Layout } from '../../../src/components/layout';
import useSingleNFT from '../../../src/hooks/useSingleNFT';
import { NFTDetails } from '../../../src/components/templates/nft-details';

const NFTDetailsPage: NextPage = () => {
    const singleNFT = useSingleNFT();
    console.log('singleNFT', singleNFT);
    
    return (
        <Layout>
            {singleNFT && <NFTDetails item={singleNFT} />}
        </Layout>
    )
}

export default NFTDetailsPage;