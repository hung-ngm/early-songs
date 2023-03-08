import type { NextPage } from 'next'
import { Layout } from '../../src/components/layout';
import useUserNFTs from '../../src/hooks/useUserNFTs';
import { User } from '../../src/components/templates/user';

const UserPage: NextPage = () => {
    const userNFTs = useUserNFTs();
    console.log('userNFTs', userNFTs);
    return (
        <Layout>
            <User nftItems={userNFTs} />
        </Layout>
    )
}

export default UserPage;