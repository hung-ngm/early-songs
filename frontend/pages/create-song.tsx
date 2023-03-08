import type { NextPage } from 'next'
import { Layout } from '../src/components/layout';
import { CreateSong } from '../src/components/templates/create-song';

const CreateSongPage: NextPage = () => {
  return (
    <Layout>
        <CreateSong />
    </Layout>
  )
}

export default CreateSongPage