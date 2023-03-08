import type { NextPage } from 'next'
import { Layout } from '../../../src/components/layout';
import useSingleContract from '../../../src/hooks/useSingleContract';
import { Details } from '../../../src/components/templates/details';

const DetailsPage: NextPage = () => {
    const singlePlatformItem = useSingleContract();
    console.log('singlePlatformItem', singlePlatformItem);
    return (
        <Layout>
            {singlePlatformItem && <Details item={singlePlatformItem} />}
        </Layout>
    )
}

export default DetailsPage;