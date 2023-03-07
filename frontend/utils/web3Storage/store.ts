import { Web3Storage } from 'web3.storage';
import { SelectOption } from '../../src/components/templates/create-song/types';

const WEB3STORAGE_API_KEY = process.env.NEXT_PUBLIC_WEB3STORAGE_API_KEY || "";

const makeStorageClient =  () => {
  return new Web3Storage({ token: WEB3STORAGE_API_KEY })
}

const makeFileObjects = (
    name: string,
    context: string,
    contains: string,
    sources: string,
    tags: SelectOption[],
    thumbnailUrl: string,
    fileName: string,
    fileSize: number,
) => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    if (!name || !context || !contains || !sources || !tags) return;
    
    const tagsArr = tags.map((tag) => tag.label);
    
    const obj = { 
        name: name,
        context: context,
        contains: contains,
        sources: sources,
        tags: tagsArr,
        thumbnailUrl: thumbnailUrl,
        fileName: fileName,
        fileSize: fileSize,
    }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  
    const files = [
      new File([blob], 'metadata.json')
    ]
    return files
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
    return client.put(files, { onRootCidReady, onStoredChunk })
}

export const storeMetadata = async (
    name: string,
    context: string,
    contains: string,
    sources: string,
    tags: SelectOption[],
    thumbnailUrl: string,
    fileName: string,
    fileSize: number,
) => {
    if (!name || !context || !contains || !sources || !tags) return;
    const files = makeFileObjects(name, context, contains, sources, tags, thumbnailUrl, fileName, fileSize);
    const cid = await storeWithProgress(files);
    console.log('Stored files with cid', cid);
    
    const metadataUrl = `https://${cid}.ipfs.w3s.link/metadata.json`;
    return metadataUrl;
}

export const storeSongThumbnail = async (e: any) => {
    const imageFile = e.target.files[0];  
    const files = [imageFile];
    const cid = await storeWithProgress(files);
    console.log('Stored files with cid', cid);
    const fileName = imageFile.name;
    
    const thumbnailUrl = `https://${cid}.ipfs.w3s.link/${fileName}`;
    return thumbnailUrl;
}