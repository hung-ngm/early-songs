import { Web3Storage } from 'web3.storage';

const WEB3STORAGE_API_KEY = process.env.NEXT_PUBLIC_WEB3STORAGE_API_KEY || "";

const makeStorageClient =  () => {
  return new Web3Storage({ token: WEB3STORAGE_API_KEY })
}

const storeWithProgress = async (files: any) => {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid: string) => {
      console.log('uploading files with cid:', cid)
    }
  
    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map((f: File) => f.size).reduce((a: number, b: number) => a + b, 0)
    let uploaded = 0
  
    const onStoredChunk = (size: number) => {
      uploaded += size
      const pct = 100 * (uploaded / totalSize)
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }
  
    // makeStorageClient returns an authorized web3.storage client instance
    const client = makeStorageClient()
  
    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { name: 'audio.mp3', onRootCidReady, onStoredChunk })
}

export const uploadSong = async (e: any) => {
    const file = e.target.files[0]
    const files = [file]
    const fileName = file.name;
    const cid = await storeWithProgress(files)
    const songUrl = `https://${cid}.ipfs.w3s.link/${fileName}`;
    return songUrl;
}