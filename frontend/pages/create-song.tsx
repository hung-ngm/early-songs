import type { NextPage } from 'next'
import { Layout } from '../src/components/layout';
import { CreateSong } from '../src/components/templates/create-song';
import usePlatformContracts from '../src/hooks/usePlatformContracts';

const CreateSongPage: NextPage = () => {
  const platformItems = usePlatformContracts();
  console.log('platformItems', platformItems);

  return (
    <Layout>
        <CreateSong />
    </Layout>
  )
}

export default CreateSongPage