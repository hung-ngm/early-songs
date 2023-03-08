import type { NextPage } from 'next'
import { Layout } from '../src/components/layout';
import usePlatformContracts from '../src/hooks/usePlatformContracts';
import { Explore } from '../src/components/templates/explore';

const ExplorePage: NextPage = () => {
  const platformItems = usePlatformContracts();
  console.log('platformItems', platformItems);

  return (
    <Layout>
        <Explore platformItems={platformItems} />
    </Layout>
  )
}

export default ExplorePage;